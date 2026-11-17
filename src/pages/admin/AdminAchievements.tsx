import React, { useEffect, useState, useCallback } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Trophy, Calendar } from 'lucide-react'
import { adminApi } from '../../lib/api'
import type { Achievement } from '../../lib/supabase'
import { useToast } from '../../components/admin/Toast'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'

const typeOptions = ['Hackathon/Ideathon', 'Competition', 'Award', 'Workshop', 'Conference', 'Academic Activity', 'Other']

export function AdminAchievements() {
  const [items, setItems] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<Achievement> | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const { showSuccess, showError } = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    const data = await adminApi.getAllAchievements()
    setItems(data)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleSave = async () => {
    if (!editing?.title) { showError('Title is required.'); return }
    setSaving(true)
    const { error } = await adminApi.upsertAchievement(editing)
    setSaving(false)
    if (error) { showError(`Failed: ${error.message}`); return }
    showSuccess('Achievement saved!')
    setEditing(null)
    load()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const { error } = await adminApi.deleteAchievement(deleteId)
    if (error) { showError(`Delete failed: ${error.message}`); return }
    showSuccess('Deleted.')
    setDeleteId(null)
    load()
  }

  const toggleVis = async (item: Achievement) => {
    await adminApi.upsertAchievement({ ...item, is_visible: !item.is_visible })
    load()
  }

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Achievements</h1>
          <p className="admin-page-subtitle">Hackathons, ideathons, awards, workshops and competitions. Only add real achievements.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setEditing({ title: '', achievement_type: 'Hackathon/Ideathon', is_visible: true, display_order: items.length + 1, image_urls: [] })}><Plus size={16} /> Add Achievement</button>
      </div>

      {loading ? <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {items.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60, color: '#A8AFC1', fontFamily: 'Space Grotesk, sans-serif' }}>
              <Trophy size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              No achievements yet.
            </div>
          )}
          {items.map(item => (
            <div key={item.id} style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 14, padding: '20px 24px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, background: 'rgba(65,105,225,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Trophy size={22} color="#4169E1" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#EDEAF5', fontSize: '1rem' }}>{item.title}</h3>
                  <span className="badge badge-muted">{item.achievement_type}</span>
                  {item.is_visible ? <span className="badge badge-green">Published</span> : <span className="badge badge-yellow">Draft</span>}
                </div>
                {item.organisation && <p style={{ color: '#A8AFC1', fontSize: '0.825rem', marginBottom: 4 }}>{item.organisation}</p>}
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                  {item.event_date && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#A8AFC1', fontSize: '0.775rem' }}>
                      <Calendar size={12} />
                      {new Date(item.event_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  )}
                  {item.role && <span style={{ color: '#5B82FF', fontSize: '0.775rem', fontFamily: 'Space Grotesk, sans-serif' }}>{item.role}</span>}
                  {item.result && <span style={{ color: '#4ade80', fontSize: '0.775rem' }}>{item.result}</span>}
                </div>
              </div>
              <div className="admin-actions">
                <button onClick={() => toggleVis(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: item.is_visible ? '#4ade80' : '#A8AFC1', display: 'flex', alignItems: 'center' }}>{item.is_visible ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setEditing({ ...item })}><Edit2 size={14} /></button>
                <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(item.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="dialog-overlay">
          <div style={{ background: '#111622', border: '1px solid rgba(237,234,245,0.1)', borderRadius: 20, width: '100%', maxWidth: 580, maxHeight: '90vh', overflow: 'auto', margin: 24, padding: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#EDEAF5' }}>{editing.id ? 'Edit' : 'Add'} Achievement</h2>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A8AFC1', display: 'flex' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Title *</label>
                <input className="form-input" value={editing.title || ''} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} placeholder="e.g. GENESIS'26 — Amrita Ideathon" />
              </div>
              <div className="form-group">
                <label className="form-label">Organisation</label>
                <input className="form-input" value={editing.organisation || ''} onChange={e => setEditing(p => ({ ...p, organisation: e.target.value }))} placeholder="e.g. Amrita Vishwa Vidyapeetham" />
              </div>
              <div className="form-group">
                <label className="form-label">Achievement Type</label>
                <select className="form-select" value={editing.achievement_type || 'Hackathon/Ideathon'} onChange={e => setEditing(p => ({ ...p, achievement_type: e.target.value }))}>
                  {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Event Date</label>
                <input className="form-input" type="date" value={editing.event_date || ''} onChange={e => setEditing(p => ({ ...p, event_date: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <input className="form-input" value={editing.role || ''} onChange={e => setEditing(p => ({ ...p, role: e.target.value }))} placeholder="e.g. Team Leader, Participant" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Result (optional)</label>
                <input className="form-input" value={editing.result || ''} onChange={e => setEditing(p => ({ ...p, result: e.target.value }))} placeholder="e.g. Finalist, Winner, Participant" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Description</label>
                <textarea className="form-textarea" value={editing.description || ''} onChange={e => setEditing(p => ({ ...p, description: e.target.value }))} placeholder="Describe the achievement, your role, and what you learned..." />
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

      {deleteId && <ConfirmDialog title="Delete Achievement" message="Delete this achievement?" confirmLabel="Delete" dangerous onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  )
}
