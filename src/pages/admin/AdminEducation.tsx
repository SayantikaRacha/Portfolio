import React, { useEffect, useState, useCallback } from 'react'
import { Plus, Edit2, Trash2, X, GraduationCap } from 'lucide-react'
import { adminApi } from '../../lib/api'
import type { Education } from '../../lib/supabase'
import { useToast } from '../../components/admin/Toast'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'

export function AdminEducation() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<Education> | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [courseText, setCourseText] = useState('')
  const [achText, setAchText] = useState('')
  const { showSuccess, showError } = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    const data = await adminApi.getAllEducation()
    setEducation(data)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openEdit = (edu?: Education) => {
    if (edu) {
      setEditing({ ...edu })
      setCourseText((edu.relevant_coursework || []).join('\n'))
      setAchText((edu.academic_achievements || []).join('\n'))
    } else {
      setEditing({ institution: '', is_current: true, display_order: education.length + 1, relevant_coursework: [], academic_achievements: [] })
      setCourseText('')
      setAchText('')
    }
  }

  const handleSave = async () => {
    if (!editing?.institution) { showError('Institution is required.'); return }
    setSaving(true)
    const toSave = { ...editing, relevant_coursework: courseText.split('\n').filter(Boolean), academic_achievements: achText.split('\n').filter(Boolean) }
    const { error } = await adminApi.upsertEducation(toSave)
    setSaving(false)
    if (error) { showError(`Failed: ${error.message}`); return }
    showSuccess('Education saved!')
    setEditing(null)
    load()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const { error } = await adminApi.deleteEducation(deleteId)
    if (error) { showError(`Delete failed: ${error.message}`); return }
    showSuccess('Deleted.')
    setDeleteId(null)
    load()
  }

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Education</h1>
          <p className="admin-page-subtitle">Manage your academic education records. Do not add fabricated details.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openEdit()}><Plus size={16} /> Add Education</button>
      </div>

      {loading ? <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {education.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60, color: '#A8AFC1', fontFamily: 'Space Grotesk, sans-serif' }}>
              <GraduationCap size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              No education records yet.
            </div>
          )}
          {education.map(edu => (
            <div key={edu.id} style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 14, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#EDEAF5', marginBottom: 4 }}>{edu.institution}</h3>
                <p style={{ color: '#4169E1', fontSize: '0.875rem', marginBottom: 4 }}>{[edu.degree, edu.branch].filter(Boolean).join(' · ')}</p>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {edu.start_year && <span style={{ color: '#A8AFC1', fontSize: '0.8rem' }}>{edu.start_year} — {edu.is_current ? 'Present' : edu.expected_graduation_year}</span>}
                  {edu.current_semester && <span className="badge badge-accent">Semester {edu.current_semester}</span>}
                  {edu.is_current && <span className="badge badge-green">Current</span>}
                </div>
              </div>
              <div className="admin-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => openEdit(edu)}><Edit2 size={14} /></button>
                <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(edu.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="dialog-overlay">
          <div style={{ background: '#111622', border: '1px solid rgba(237,234,245,0.1)', borderRadius: 20, width: '100%', maxWidth: 600, maxHeight: '90vh', overflow: 'auto', margin: 24, padding: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#EDEAF5' }}>{editing.id ? 'Edit' : 'Add'} Education</h2>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A8AFC1', display: 'flex' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Institution *</label>
                <input className="form-input" value={editing.institution || ''} onChange={e => setEditing(p => ({ ...p, institution: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Degree</label>
                <input className="form-input" value={editing.degree || ''} onChange={e => setEditing(p => ({ ...p, degree: e.target.value }))} placeholder="B.Tech" />
              </div>
              <div className="form-group">
                <label className="form-label">Branch / Specialisation</label>
                <input className="form-input" value={editing.branch || ''} onChange={e => setEditing(p => ({ ...p, branch: e.target.value }))} placeholder="Computer Science and Engineering" />
              </div>
              <div className="form-group">
                <label className="form-label">Start Year</label>
                <input className="form-input" type="number" value={editing.start_year || ''} onChange={e => setEditing(p => ({ ...p, start_year: parseInt(e.target.value) }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Expected Graduation Year</label>
                <input className="form-input" type="number" value={editing.expected_graduation_year || ''} onChange={e => setEditing(p => ({ ...p, expected_graduation_year: parseInt(e.target.value) }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Current Semester</label>
                <input className="form-input" type="number" value={editing.current_semester || ''} onChange={e => setEditing(p => ({ ...p, current_semester: parseInt(e.target.value) }))} />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', color: '#EDEAF5' }}>
                  <input type="checkbox" checked={editing.is_current !== false} onChange={e => setEditing(p => ({ ...p, is_current: e.target.checked }))} style={{ width: 18, height: 18, accentColor: '#4169E1' }} />
                  Currently enrolled
                </label>
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Description (optional)</label>
                <textarea className="form-textarea" value={editing.description || ''} onChange={e => setEditing(p => ({ ...p, description: e.target.value }))} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Relevant Coursework (one per line)</label>
                <textarea className="form-textarea" value={courseText} onChange={e => setCourseText(e.target.value)} placeholder="Data Structures and Algorithms&#10;Object Oriented Programming" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setEditing(null)} disabled={saving}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && <ConfirmDialog title="Delete Education" message="Delete this education record?" confirmLabel="Delete" dangerous onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  )
}
