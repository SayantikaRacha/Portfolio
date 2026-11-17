import React, { useEffect, useState, useCallback } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, X, ExternalLink } from 'lucide-react'
import { adminApi } from '../../lib/api'
import type { SocialLink } from '../../lib/supabase'
import { useToast } from '../../components/admin/Toast'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'

const platformOptions = ['GitHub', 'LinkedIn', 'Instagram', 'YouTube', 'Twitter/X', 'Portfolio', 'Email', 'Other']
const iconOptions = ['github', 'linkedin', 'instagram', 'youtube', 'twitter', 'globe', 'mail', 'link']

export function AdminSocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<SocialLink> | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const { showSuccess, showError } = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    const data = await adminApi.getAllSocialLinks()
    setLinks(data)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleSave = async () => {
    if (!editing?.platform) { showError('Platform is required.'); return }
    if (!editing?.url) { showError('URL is required.'); return }
    setSaving(true)
    const { error } = await adminApi.upsertSocialLink(editing)
    setSaving(false)
    if (error) { showError(`Failed: ${error.message}`); return }
    showSuccess('Social link saved!')
    setEditing(null)
    load()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const { error } = await adminApi.deleteSocialLink(deleteId)
    if (error) { showError(`Delete failed: ${error.message}`); return }
    showSuccess('Deleted.')
    setDeleteId(null)
    load()
  }

  const toggleVisibility = async (link: SocialLink) => {
    await adminApi.upsertSocialLink({ ...link, is_visible: !link.is_visible })
    load()
  }

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Social Links</h1>
          <p className="admin-page-subtitle">Manage your social media and external profile links.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setEditing({ platform: 'GitHub', is_visible: true, display_order: links.length + 1 })}><Plus size={16} /> Add Link</button>
      </div>

      {loading ? <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div> : (
        <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 12, overflow: 'auto' }}>
          <table className="admin-table">
            <thead><tr><th>Platform</th><th>Display Name</th><th>URL</th><th>Order</th><th>Visible</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
            <tbody>
              {links.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: '#A8AFC1', padding: 40 }}>No social links yet.</td></tr>}
              {links.map(link => (
                <tr key={link.id}>
                  <td style={{ color: '#EDEAF5', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>{link.platform}</td>
                  <td style={{ color: '#A8AFC1' }}>{link.display_name || '—'}</td>
                  <td><a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#4169E1', textDecoration: 'none', fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: 4 }}><ExternalLink size={12} />{link.url.substring(0, 40)}{link.url.length > 40 ? '...' : ''}</a></td>
                  <td style={{ color: '#A8AFC1' }}>{link.display_order}</td>
                  <td><button onClick={() => toggleVisibility(link)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: link.is_visible ? '#4ade80' : '#A8AFC1', display: 'flex', alignItems: 'center' }}>{link.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}</button></td>
                  <td><div className="admin-actions" style={{ justifyContent: 'flex-end' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setEditing({ ...link })}><Edit2 size={14} /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(link.id)}><Trash2 size={14} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="dialog-overlay">
          <div style={{ background: '#111622', border: '1px solid rgba(237,234,245,0.1)', borderRadius: 20, width: '100%', maxWidth: 480, margin: 24, padding: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#EDEAF5' }}>{editing.id ? 'Edit' : 'Add'} Social Link</h2>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A8AFC1', display: 'flex' }}><X size={20} /></button>
            </div>
            <div className="form-group">
              <label className="form-label">Platform *</label>
              <select className="form-select" value={editing.platform || ''} onChange={e => setEditing(p => ({ ...p, platform: e.target.value }))}>
                {platformOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Display Name</label>
              <input className="form-input" value={editing.display_name || ''} onChange={e => setEditing(p => ({ ...p, display_name: e.target.value }))} placeholder="e.g. SayantikaRacha" />
            </div>
            <div className="form-group">
              <label className="form-label">URL *</label>
              <input className="form-input" type="url" value={editing.url || ''} onChange={e => setEditing(p => ({ ...p, url: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="form-group">
              <label className="form-label">Icon Name</label>
              <select className="form-select" value={editing.icon_name || ''} onChange={e => setEditing(p => ({ ...p, icon_name: e.target.value }))}>
                <option value="">Auto-detect</option>
                {iconOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Display Order</label>
                <input className="form-input" type="number" value={editing.display_order || 0} onChange={e => setEditing(p => ({ ...p, display_order: parseInt(e.target.value) }))} />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', color: '#EDEAF5' }}>
                  <input type="checkbox" checked={editing.is_visible !== false} onChange={e => setEditing(p => ({ ...p, is_visible: e.target.checked }))} style={{ width: 18, height: 18, accentColor: '#4169E1' }} />
                  Visible
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

      {deleteId && <ConfirmDialog title="Delete Link" message="Delete this social link?" confirmLabel="Delete" dangerous onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  )
}
