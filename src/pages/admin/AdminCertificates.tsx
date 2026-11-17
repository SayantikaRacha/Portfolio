import React, { useEffect, useState, useCallback } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Award, ExternalLink, FileText, Calendar } from 'lucide-react'
import { adminApi, storageApi } from '../../lib/api'
import type { Certificate } from '../../lib/supabase'
import { useToast } from '../../components/admin/Toast'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'
import { FileUpload } from '../../components/admin/FileUpload'

export function AdminCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCert, setEditingCert] = useState<Partial<Certificate> | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [relatedSkillsText, setRelatedSkillsText] = useState('')
  const { showSuccess, showError } = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    const data = await adminApi.getAllCertificates()
    setCertificates(data)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openEdit = (cert?: Certificate) => {
    if (cert) {
      setEditingCert({ ...cert })
      setRelatedSkillsText((cert.related_skills || []).join(', '))
    } else {
      setEditingCert({ title: '', issuing_organisation: '', is_visible: false, display_order: certificates.length + 1, related_skills: [] })
      setRelatedSkillsText('')
    }
  }

  const handleFileUpload = async (file: File) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      showError('Unsupported file type. Use PNG, JPG, WebP, or PDF.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      showError('File too large. Maximum 10MB.')
      return
    }
    setUploadProgress(10)
    const path = `certificates/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    setUploadProgress(50)
    const { url, error } = await storageApi.uploadFile('certificates', path, file)
    setUploadProgress(100)
    if (error) { showError(`Upload failed: ${error.message}`); setUploadProgress(0); return }
    setEditingCert(prev => ({ ...prev, file_url: url || '' }))
    showSuccess('File uploaded!')
    setTimeout(() => setUploadProgress(0), 1500)
  }

  const handleSave = async () => {
    if (!editingCert?.title) { showError('Certificate title is required.'); return }
    if (!editingCert?.issuing_organisation) { showError('Issuing organisation is required.'); return }
    setSaving(true)
    const certToSave = {
      ...editingCert,
      related_skills: relatedSkillsText.split(',').map(s => s.trim()).filter(Boolean)
    }
    const { error } = await adminApi.upsertCertificate(certToSave)
    setSaving(false)
    if (error) { showError(`Failed to save: ${error.message}`); return }
    showSuccess(editingCert.id ? 'Certificate updated!' : 'Certificate added!')
    setEditingCert(null)
    load()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const { error } = await adminApi.deleteCertificate(deleteId)
    if (error) { showError(`Delete failed: ${error.message}`); return }
    showSuccess('Certificate deleted.')
    setDeleteId(null)
    load()
  }

  const toggleVisibility = async (cert: Certificate) => {
    const { error } = await adminApi.upsertCertificate({ ...cert, is_visible: !cert.is_visible })
    if (error) { showError('Failed to update visibility.'); return }
    load()
  }

  const isImage = (url: string) => /\.(jpg|jpeg|png|webp|gif)$/i.test(url)

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Certificates</h1>
          <p className="admin-page-subtitle">Upload and manage your certificates and credentials. Published certificates appear on your portfolio.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openEdit()}>
          <Plus size={16} /> Add Certificate
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {certificates.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 80, color: '#A8AFC1', fontFamily: 'Space Grotesk, sans-serif' }}>
              <Award size={48} color="#A8AFC1" style={{ margin: '0 auto 16px', opacity: 0.4 }} />
              <p>No certificates yet. Upload your first certificate!</p>
            </div>
          )}
          {certificates.map(cert => (
            <div key={cert.id} style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s' }}>
              {/* Preview area */}
              <div style={{
                height: 140,
                background: cert.file_url && isImage(cert.file_url)
                  ? `url(${cert.thumbnail_url || cert.file_url}) center/cover`
                  : 'linear-gradient(135deg, rgba(65,105,225,0.12) 0%, rgba(104,74,158,0.08) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative'
              }}>
                {(!cert.file_url || !isImage(cert.file_url)) && (
                  <Award size={40} color="rgba(65,105,225,0.4)" />
                )}
                <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6 }}>
                  {cert.is_visible
                    ? <span style={{ background: 'rgba(74,222,128,0.2)', color: '#4ade80', fontSize: '0.65rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, padding: '3px 8px', borderRadius: 4 }}>Published</span>
                    : <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', fontSize: '0.65rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, padding: '3px 8px', borderRadius: 4 }}>Draft</span>
                  }
                </div>
              </div>

              <div style={{ padding: '16px 18px' }}>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.95rem', color: '#EDEAF5', marginBottom: 4, lineHeight: 1.3 }}>
                  {cert.title}
                </h3>
                <p style={{ color: '#A8AFC1', fontSize: '0.8rem', marginBottom: 8 }}>{cert.issuing_organisation}</p>
                {cert.issue_date && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#A8AFC1', fontSize: '0.75rem', marginBottom: 12 }}>
                    <Calendar size={12} />
                    {new Date(cert.issue_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {cert.file_url && (
                    <a href={cert.file_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{ padding: '5px 10px', fontSize: '0.75rem' }} title="Preview">
                      <ExternalLink size={12} /> Preview
                    </a>
                  )}
                  <button className="btn btn-ghost btn-sm" style={{ padding: '5px 10px', fontSize: '0.75rem' }} onClick={() => toggleVisibility(cert)} title={cert.is_visible ? 'Unpublish' : 'Publish'}>
                    {cert.is_visible ? <EyeOff size={12} /> : <Eye size={12} />}
                    {cert.is_visible ? 'Unpublish' : 'Publish'}
                  </button>
                  <button className="btn btn-ghost btn-sm" style={{ padding: '5px 10px', fontSize: '0.75rem' }} onClick={() => openEdit(cert)}><Edit2 size={12} /></button>
                  <button className="btn btn-danger btn-sm" style={{ padding: '5px 10px', fontSize: '0.75rem' }} onClick={() => setDeleteId(cert.id)}><Trash2 size={12} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Add Dialog */}
      {editingCert && (
        <div className="dialog-overlay">
          <div style={{ background: '#111622', border: '1px solid rgba(237,234,245,0.1)', borderRadius: 20, width: '100%', maxWidth: 600, maxHeight: '90vh', overflow: 'auto', margin: 24, padding: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#EDEAF5' }}>
                {editingCert.id ? 'Edit Certificate' : 'Add Certificate'}
              </h2>
              <button onClick={() => setEditingCert(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A8AFC1', display: 'flex', alignItems: 'center' }}><X size={20} /></button>
            </div>

            <div className="form-group">
              <label className="form-label">Certificate Title *</label>
              <input className="form-input" value={editingCert.title || ''} onChange={e => setEditingCert(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Python for Everybody" />
            </div>

            <div className="form-group">
              <label className="form-label">Issuing Organisation *</label>
              <input className="form-input" value={editingCert.issuing_organisation || ''} onChange={e => setEditingCert(p => ({ ...p, issuing_organisation: e.target.value }))} placeholder="e.g. Coursera, NPTEL, Google" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Issue Date</label>
                <input className="form-input" type="date" value={editingCert.issue_date || ''} onChange={e => setEditingCert(p => ({ ...p, issue_date: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Expiry Date</label>
                <input className="form-input" type="date" value={editingCert.expiry_date || ''} onChange={e => setEditingCert(p => ({ ...p, expiry_date: e.target.value }))} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Credential ID</label>
              <input className="form-input" value={editingCert.credential_id || ''} onChange={e => setEditingCert(p => ({ ...p, credential_id: e.target.value }))} placeholder="Optional credential ID" />
            </div>

            <div className="form-group">
              <label className="form-label">Verification URL</label>
              <input className="form-input" type="url" value={editingCert.credential_url || ''} onChange={e => setEditingCert(p => ({ ...p, credential_url: e.target.value }))} placeholder="https://..." />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" style={{ minHeight: 70 }} value={editingCert.description || ''} onChange={e => setEditingCert(p => ({ ...p, description: e.target.value }))} placeholder="Brief description of what this certificate covers..." />
            </div>

            <div className="form-group">
              <label className="form-label">Related Skills</label>
              <input className="form-input" value={relatedSkillsText} onChange={e => setRelatedSkillsText(e.target.value)} placeholder="e.g. Python, Machine Learning, Data Analysis" />
              <p className="form-hint">Comma-separated list of related skills.</p>
            </div>

            <div className="form-group">
              <label className="form-label">Certificate File</label>
              <FileUpload
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                maxSizeMB={10}
                onFile={handleFileUpload}
                label="Upload Certificate (PDF, PNG, JPG, WebP)"
                hint="Max 10MB. PDF or image."
                preview={editingCert.file_url || undefined}
                progress={uploadProgress}
              />
              {editingCert.file_url && (
                <a href={editingCert.file_url} target="_blank" rel="noopener noreferrer" style={{ color: '#4169E1', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8, textDecoration: 'none' }}>
                  <ExternalLink size={12} /> Preview current file
                </a>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Display Order</label>
                <input className="form-input" type="number" value={editingCert.display_order || 0} onChange={e => setEditingCert(p => ({ ...p, display_order: parseInt(e.target.value) }))} />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', color: '#EDEAF5' }}>
                  <input type="checkbox" checked={editingCert.is_visible || false} onChange={e => setEditingCert(p => ({ ...p, is_visible: e.target.checked }))} style={{ width: 18, height: 18, accentColor: '#4169E1' }} />
                  Publish (visible on portfolio)
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setEditingCert(null)} disabled={saving}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : editingCert.id ? 'Update Certificate' : 'Add Certificate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <ConfirmDialog
          title="Delete Certificate"
          message="Are you sure you want to delete this certificate?"
          confirmLabel="Delete"
          dangerous
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  )
}
