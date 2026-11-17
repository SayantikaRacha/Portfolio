import React, { useEffect, useState } from 'react'
import { FileText, ExternalLink, Download, CheckCircle } from 'lucide-react'
import { adminApi, storageApi } from '../../lib/api'
import { FileUpload } from '../../components/admin/FileUpload'
import { useToast } from '../../components/admin/Toast'

export function AdminFiles() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [saving, setSaving] = useState(false)
  const [manualUrl, setManualUrl] = useState('')
  const { showSuccess, showError } = useToast()

  useEffect(() => {
    adminApi.getSiteSettings().then(s => {
      setSettings(s)
      setManualUrl(s['resume_url'] || '')
      setLoading(false)
    })
  }, [])

  const handleResumeUpload = async (file: File) => {
    if (file.type !== 'application/pdf') { showError('Please upload a PDF file.'); return }
    if (file.size > 10 * 1024 * 1024) { showError('File too large. Maximum 10MB.'); return }
    setUploading(true)
    setUploadProgress(20)
    const path = `resumes/resume-${Date.now()}.pdf`
    setUploadProgress(60)
    const { url, error } = await storageApi.uploadFile('resumes', path, file)
    setUploadProgress(100)
    if (error) { showError(`Upload failed: ${error.message}`); setUploading(false); setUploadProgress(0); return }
    const { error: saveErr } = await adminApi.updateSiteSetting('resume_url', url || '')
    setUploading(false)
    setUploadProgress(0)
    if (saveErr) { showError('File uploaded but failed to save URL.'); return }
    setSettings(prev => ({ ...prev, resume_url: url || '' }))
    setManualUrl(url || '')
    showSuccess('Resume uploaded and set as active!')
  }

  const handleSaveManualUrl = async () => {
    setSaving(true)
    const { error } = await adminApi.updateSiteSetting('resume_url', manualUrl)
    setSaving(false)
    if (error) { showError(`Failed: ${error.message}`); return }
    setSettings(prev => ({ ...prev, resume_url: manualUrl }))
    showSuccess('Resume URL saved!')
  }

  const currentResumeUrl = settings['resume_url']

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Resume & Files</h1>
        <p className="admin-page-subtitle">Upload and manage your resume. The active resume will appear on your public portfolio.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#EDEAF5', marginBottom: 24, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Upload Resume</h2>
          <FileUpload
            accept=".pdf"
            maxSizeMB={10}
            onFile={handleResumeUpload}
            label="Upload Resume PDF"
            hint="PDF only. Max 10MB. This will replace the current active resume."
            progress={uploadProgress}
          />
          {uploading && <p style={{ color: '#A8AFC1', fontSize: '0.8rem', marginTop: 10, fontFamily: 'Space Grotesk, sans-serif' }}>Uploading and saving...</p>}
        </div>

        <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#EDEAF5', marginBottom: 24, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Active Resume</h2>

          {currentResumeUrl ? (
            <div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'rgba(65,105,225,0.08)', border: '1px solid rgba(65,105,225,0.2)',
                borderRadius: 12, padding: '16px 20px', marginBottom: 20
              }}>
                <div style={{ width: 44, height: 44, background: 'rgba(65,105,225,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={22} color="#4169E1" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#EDEAF5', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, marginBottom: 4 }}>Resume active</p>
                  <p style={{ color: '#A8AFC1', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentResumeUrl}</p>
                </div>
                <CheckCircle size={20} color="#4ade80" />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <a href={currentResumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  <ExternalLink size={14} /> Preview
                </a>
                <a href={currentResumeUrl} download className="btn btn-primary btn-sm">
                  <Download size={14} /> Download
                </a>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#A8AFC1' }}>
              <FileText size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              <p style={{ fontFamily: 'Space Grotesk, sans-serif' }}>No resume uploaded yet.</p>
            </div>
          )}

          <div className="divider" />

          <div className="form-group">
            <label className="form-label">Or set resume URL manually</label>
            <input className="form-input" type="url" value={manualUrl} onChange={e => setManualUrl(e.target.value)} placeholder="https://..." />
            <p className="form-hint">If you host your resume externally, paste its URL here.</p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={handleSaveManualUrl} disabled={saving}>
            {saving ? 'Saving...' : 'Save URL'}
          </button>
        </div>
      </div>
    </div>
  )
}
