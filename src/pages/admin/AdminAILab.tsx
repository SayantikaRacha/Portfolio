import React, { useEffect, useState, useCallback } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, X, FlaskConical } from 'lucide-react'
import { adminApi } from '../../lib/api'
import type { AILabItem } from '../../lib/supabase'
import { useToast } from '../../components/admin/Toast'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'

const statusOptions = ['Completed', 'Ongoing', 'Exploring', 'Idea']
const statusColors: Record<string, string> = {
  Completed: 'badge-green', Ongoing: 'badge-accent', Exploring: 'badge-yellow', Idea: 'badge-muted'
}

export function AdminAILab() {
  const [items, setItems] = useState<AILabItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<AILabItem> | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [toolsText, setToolsText] = useState('')
  const [linksText, setLinksText] = useState('')
  const { showSuccess, showError } = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    const data = await adminApi.getAllAILabItems()
    setItems(data)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openEdit = (item?: AILabItem) => {
    if (item) {
      setEditing({ ...item })
      setToolsText((item.tools || []).join(', '))
      setLinksText((item.project_links || []).join('\n'))
    } else {
      setEditing({ title: '', status: 'Exploring', is_visible: false, display_order: items.length + 1, tools: [], project_links: [] })
      setToolsText('')
      setLinksText('')
    }
  }

  const handleSave = async () => {
    if (!editing?.title) { showError('Title is required.'); return }
    setSaving(true)
    const toSave = {
      ...editing,
      tools: toolsText.split(',').map(s => s.trim()).filter(Boolean),
      project_links: linksText.split('\n').filter(Boolean)
    }
    const { error } = await adminApi.upsertAILabItem(toSave)
    setSaving(false)
    if (error) { showError(`Failed: ${error.message}`); return }
    showSuccess('AI Lab item saved!')
    setEditing(null)
    load()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const { error } = await adminApi.deleteAILabItem(deleteId)
    if (error) { showError(`Delete failed: ${error.message}`); return }
    showSuccess('Deleted.')
    setDeleteId(null)
    load()
  }

  const toggleVis = async (item: AILabItem) => {
    await adminApi.upsertAILabItem({ ...item, is_visible: !item.is_visible })
    load()
  }

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">AI Lab</h1>
          <p className="admin-page-subtitle">Manage AI experiments, explorations, and prompt engineering projects.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openEdit()}><Plus size={16} /> Add Experiment</button>
      </div>

      {loading ? <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {items.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 60, color: '#A8AFC1', fontFamily: 'Space Grotesk, sans-serif' }}>
              <FlaskConical size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              No AI Lab entries yet.
            </div>
          )}
          {items.map(item => (
            <div key={item.id} style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 14, padding: '20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className={`badge ${statusColors[item.status] || 'badge-muted'}`}>{item.status}</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => toggleVis(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: item.is_visible ? '#4ade80' : '#A8AFC1', display: 'flex', alignItems: 'center', padding: 4 }}>{item.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}</button>
                  <button className="btn btn-ghost btn-sm" style={{ padding: 4 }} onClick={() => openEdit(item)}><Edit2 size={14} /></button>
                  <button className="btn btn-danger btn-sm" style={{ padding: 4 }} onClick={() => setDeleteId(item.id)}><Trash2 size={14} /></button>
                </div>
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#EDEAF5', marginBottom: 8, fontSize: '1rem' }}>{item.title}</h3>
              {item.category && <p style={{ color: '#4169E1', fontSize: '0.75rem', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 8 }}>{item.category}</p>}
              {item.description && <p style={{ color: '#A8AFC1', fontSize: '0.825rem', lineHeight: 1.6, marginBottom: 12 }}>{item.description.substring(0, 120)}{item.description.length > 120 ? '...' : ''}</p>}
              {item.tools?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {item.tools.map(t => <span key={t} className="badge badge-muted" style={{ fontSize: '0.68rem' }}>{t}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="dialog-overlay">
          <div style={{ background: '#111622', border: '1px solid rgba(237,234,245,0.1)', borderRadius: 20, width: '100%', maxWidth: 560, maxHeight: '90vh', overflow: 'auto', margin: 24, padding: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#EDEAF5' }}>{editing.id ? 'Edit' : 'Add'} AI Lab Item</h2>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A8AFC1', display: 'flex' }}><X size={20} /></button>
            </div>
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input className="form-input" value={editing.title || ''} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Prompt Engineering for Code Generation" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <input className="form-input" value={editing.category || ''} onChange={e => setEditing(p => ({ ...p, category: e.target.value }))} placeholder="e.g. Prompt Engineering" />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-select" value={editing.status || 'Exploring'} onChange={e => setEditing(p => ({ ...p, status: e.target.value as any }))}>
                  {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" value={editing.description || ''} onChange={e => setEditing(p => ({ ...p, description: e.target.value }))} placeholder="What is this experiment about?" />
            </div>
            <div className="form-group">
              <label className="form-label">Tools Used</label>
              <input className="form-input" value={toolsText} onChange={e => setToolsText(e.target.value)} placeholder="ChatGPT, Gemini, Claude, Copilot" />
              <p className="form-hint">Comma-separated.</p>
            </div>
            <div className="form-group">
              <label className="form-label">Project Links (one per line)</label>
              <textarea className="form-textarea" style={{ minHeight: 70 }} value={linksText} onChange={e => setLinksText(e.target.value)} placeholder="https://..." />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Display Order</label>
                <input className="form-input" type="number" value={editing.display_order || 0} onChange={e => setEditing(p => ({ ...p, display_order: parseInt(e.target.value) }))} />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', color: '#EDEAF5' }}>
                  <input type="checkbox" checked={editing.is_visible || false} onChange={e => setEditing(p => ({ ...p, is_visible: e.target.checked }))} style={{ width: 18, height: 18, accentColor: '#4169E1' }} />
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

      {deleteId && <ConfirmDialog title="Delete AI Lab Item" message="Delete this experiment?" confirmLabel="Delete" dangerous onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  )
}
