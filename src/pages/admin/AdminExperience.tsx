import React, { useEffect, useState, useCallback } from 'react'
import { Plus, Edit2, Trash2, X } from 'lucide-react'
import { adminApi } from '../../lib/api'
import type { Experience } from '../../lib/supabase'
import { useToast } from '../../components/admin/Toast'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'

export function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<Experience> | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [respText, setRespText] = useState('')
  const [achText, setAchText] = useState('')
  const { showSuccess, showError } = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    const data = await adminApi.getAllExperiences()
    setExperiences(data)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openEdit = (exp?: Experience) => {
    if (exp) {
      setEditing({ ...exp })
      setRespText((exp.responsibilities || []).join('\n'))
      setAchText((exp.achievements || []).join('\n'))
    } else {
      setEditing({ organisation: '', role: '', experience_type: 'Internship', is_current: false, is_visible: true, display_order: experiences.length + 1, responsibilities: [], achievements: [] })
      setRespText('')
      setAchText('')
    }
  }

  const handleSave = async () => {
    if (!editing?.organisation) { showError('Organisation is required.'); return }
    if (!editing?.role) { showError('Role is required.'); return }
    setSaving(true)
    const toSave = { ...editing, responsibilities: respText.split('\n').filter(Boolean), achievements: achText.split('\n').filter(Boolean) }
    const { error } = await adminApi.upsertExperience(toSave)
    setSaving(false)
    if (error) { showError(`Failed: ${error.message}`); return }
    showSuccess(editing.id ? 'Experience updated!' : 'Experience added!')
    setEditing(null)
    load()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const { error } = await adminApi.deleteExperience(deleteId)
    if (error) { showError(`Delete failed: ${error.message}`); return }
    showSuccess('Deleted.')
    setDeleteId(null)
    load()
  }

  const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' }) : '—'

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Experience</h1>
          <p className="admin-page-subtitle">Manage your work and internship experience. Only add real experience.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openEdit()}><Plus size={16} /> Add Experience</button>
      </div>

      {loading ? <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div> : (
        <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 12, overflow: 'auto' }}>
          <table className="admin-table">
            <thead><tr><th>Organisation</th><th>Role</th><th>Type</th><th>Period</th><th>Visible</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
            <tbody>
              {experiences.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: '#A8AFC1', padding: 40 }}>No experience entries yet.</td></tr>}
              {experiences.map(exp => (
                <tr key={exp.id}>
                  <td style={{ color: '#EDEAF5', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>{exp.organisation}</td>
                  <td style={{ color: '#A8AFC1' }}>{exp.role}</td>
                  <td><span className="badge badge-muted">{exp.experience_type}</span></td>
                  <td style={{ color: '#A8AFC1', fontSize: '0.825rem' }}>
                    {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : formatDate(exp.end_date)}
                  </td>
                  <td><span style={{ color: exp.is_visible ? '#4ade80' : '#A8AFC1' }}>{exp.is_visible ? '✓' : '✗'}</span></td>
                  <td><div className="admin-actions" style={{ justifyContent: 'flex-end' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(exp)}><Edit2 size={14} /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(exp.id)}><Trash2 size={14} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="dialog-overlay">
          <div style={{ background: '#111622', border: '1px solid rgba(237,234,245,0.1)', borderRadius: 20, width: '100%', maxWidth: 600, maxHeight: '90vh', overflow: 'auto', margin: 24, padding: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#EDEAF5' }}>{editing.id ? 'Edit' : 'Add'} Experience</h2>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A8AFC1', display: 'flex' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Organisation *</label>
                <input className="form-input" value={editing.organisation || ''} onChange={e => setEditing(p => ({ ...p, organisation: e.target.value }))} placeholder="e.g. In-Amigos Foundation" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Role *</label>
                <input className="form-input" value={editing.role || ''} onChange={e => setEditing(p => ({ ...p, role: e.target.value }))} placeholder="e.g. Copywriting Intern" />
              </div>
              <div className="form-group">
                <label className="form-label">Experience Type</label>
                <select className="form-select" value={editing.experience_type || 'Internship'} onChange={e => setEditing(p => ({ ...p, experience_type: e.target.value }))}>
                  {['Internship', 'Part-time', 'Full-time', 'Freelance', 'Volunteer', 'Research', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={editing.is_current || false} onChange={e => setEditing(p => ({ ...p, is_current: e.target.checked }))} style={{ accentColor: '#4169E1' }} />
                  Currently working here
                </label>
              </div>
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input className="form-input" type="date" value={editing.start_date || ''} onChange={e => setEditing(p => ({ ...p, start_date: e.target.value }))} />
              </div>
              {!editing.is_current && (
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input className="form-input" type="date" value={editing.end_date || ''} onChange={e => setEditing(p => ({ ...p, end_date: e.target.value }))} />
                </div>
              )}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Description</label>
                <textarea className="form-textarea" value={editing.description || ''} onChange={e => setEditing(p => ({ ...p, description: e.target.value }))} placeholder="Brief description of your role..." />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Responsibilities (one per line)</label>
                <textarea className="form-textarea" value={respText} onChange={e => setRespText(e.target.value)} placeholder="Key responsibilities..." />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Achievements (one per line)</label>
                <textarea className="form-textarea" value={achText} onChange={e => setAchText(e.target.value)} placeholder="Notable achievements..." />
              </div>
              <div className="form-group">
                <label className="form-label">Display Order</label>
                <input className="form-input" type="number" value={editing.display_order || 0} onChange={e => setEditing(p => ({ ...p, display_order: parseInt(e.target.value) }))} />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', color: '#EDEAF5' }}>
                  <input type="checkbox" checked={editing.is_visible !== false} onChange={e => setEditing(p => ({ ...p, is_visible: e.target.checked }))} style={{ width: 18, height: 18, accentColor: '#4169E1' }} />
                  Visible on portfolio
                </label>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setEditing(null)} disabled={saving}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && <ConfirmDialog title="Delete Experience" message="Delete this experience entry?" confirmLabel="Delete" dangerous onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  )
}
