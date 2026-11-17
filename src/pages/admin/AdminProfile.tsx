import React, { useEffect, useState } from 'react'
import { Save, User } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { adminApi, storageApi } from '../../lib/api'
import type { Profile } from '../../lib/supabase'
import { useToast } from '../../components/admin/Toast'
import { FileUpload } from '../../components/admin/FileUpload'

export function AdminProfile() {
  const [profile, setProfile] = useState<Partial<Profile>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [interestsText, setInterestsText] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const { showSuccess, showError } = useToast()

  useEffect(() => {
    supabase.from('profiles').select('*').limit(1).single().then(({ data }) => {
      if (data) {
        setProfile(data)
        setInterestsText((data.professional_interests || []).join(', '))
      }
      setLoading(false)
    })
  }, [])

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) { showError('Please upload an image file.'); return }
    setUploadProgress(30)
    const path = `profile-images/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const { url, error } = await storageApi.uploadFile('profile-images', path, file)
    setUploadProgress(100)
    if (error) { showError(`Upload failed: ${error.message}`); setUploadProgress(0); return }
    setProfile(p => ({ ...p, profile_image_url: url || '' }))
    showSuccess('Profile image uploaded!')
    setTimeout(() => setUploadProgress(0), 1500)
  }

  const handleSave = async () => {
    setSaving(true)
    const profileToSave = {
      ...profile,
      professional_interests: interestsText.split(',').map(s => s.trim()).filter(Boolean)
    }
    const { error } = await adminApi.updateProfile(profileToSave)
    setSaving(false)
    if (error) { showError(`Failed to save: ${error.message}`); return }
    showSuccess('Profile updated successfully!')
  }

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Profile</h1>
          <p className="admin-page-subtitle">Edit your public profile information. Changes are saved to the database.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr min(340px, 35%)', gap: 48, alignItems: 'start' }}>
        <div>
          <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 16, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 24, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Basic Information</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="form-group">
                <label className="form-label">Display Name</label>
                <input className="form-input" value={profile.display_name || ''} onChange={e => setProfile(p => ({ ...p, display_name: e.target.value }))} placeholder="Sayantika" />
              </div>
              <div className="form-group">
                <label className="form-label">Availability Status</label>
                <input className="form-input" value={profile.availability_status || ''} onChange={e => setProfile(p => ({ ...p, availability_status: e.target.value }))} placeholder="Open to opportunities" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Professional Title</label>
                <input className="form-input" value={profile.professional_title || ''} onChange={e => setProfile(p => ({ ...p, professional_title: e.target.value }))} placeholder="Computer Science Student | Aspiring Developer" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Short Introduction</label>
                <input className="form-input" value={profile.short_intro || ''} onChange={e => setProfile(p => ({ ...p, short_intro: e.target.value }))} placeholder="I turn curiosity into things I can build." />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Full Biography</label>
                <textarea className="form-textarea" style={{ minHeight: 160 }} value={profile.biography || ''} onChange={e => setProfile(p => ({ ...p, biography: e.target.value }))} placeholder="Your full biography..." />
              </div>
              <div className="form-group">
                <label className="form-label">Location (optional)</label>
                <input className="form-input" value={profile.location || ''} onChange={e => setProfile(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Coimbatore, India" />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Email (optional)</label>
                <input className="form-input" type="email" value={profile.contact_email || ''} onChange={e => setProfile(p => ({ ...p, contact_email: e.target.value }))} placeholder="your@email.com" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Professional Interests</label>
                <input className="form-input" value={interestsText} onChange={e => setInterestsText(e.target.value)} placeholder="Software Development, AI, Creative Technology" />
                <p className="form-hint">Comma-separated list.</p>
              </div>
            </div>
          </div>

          <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 16, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 24, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Academic Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Institution</label>
                <input className="form-input" value={profile.institution || ''} onChange={e => setProfile(p => ({ ...p, institution: e.target.value }))} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Degree</label>
                <input className="form-input" value={profile.degree || ''} onChange={e => setProfile(p => ({ ...p, degree: e.target.value }))} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Academic Status</label>
                <input className="form-input" value={profile.academic_status || ''} onChange={e => setProfile(p => ({ ...p, academic_status: e.target.value }))} placeholder="Semester 1" />
              </div>
            </div>
          </div>

          <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 16, padding: 32 }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 24, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Profile Image</h2>
            <FileUpload
              accept="image/*"
              maxSizeMB={5}
              onFile={handleImageUpload}
              label="Upload Profile Photo"
              hint="Recommended: square image, at least 400x400px. Max 5MB."
              preview={profile.profile_image_url || undefined}
              progress={uploadProgress}
            />
          </div>
        </div>

        <div style={{ position: 'sticky', top: 100 }}>
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#A8AFC1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Preview</h3>
          <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 16, padding: 24, textAlign: 'center' }}>
            {profile.profile_image_url ? (
              <img src={profile.profile_image_url} alt={profile.display_name} style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px', border: '2px solid rgba(65,105,225,0.3)', display: 'block' }} />
            ) : (
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(65,105,225,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '2px solid rgba(65,105,225,0.2)' }}>
                <User size={40} color="rgba(65,105,225,0.5)" />
              </div>
            )}
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#EDEAF5', marginBottom: 6 }}>{profile.display_name || 'Your Name'}</h3>
            <p style={{ color: '#4169E1', fontSize: '0.8rem', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 8 }}>{profile.professional_title || 'Your Title'}</p>
            <p style={{ color: '#A8AFC1', fontSize: '0.825rem', lineHeight: 1.6, marginBottom: 12 }}>{profile.short_intro || 'Your short introduction'}</p>
            <div style={{ display: 'inline-block', background: 'rgba(65,105,225,0.08)', border: '1px solid rgba(65,105,225,0.2)', borderRadius: 100, padding: '4px 12px', fontSize: '0.75rem', color: '#5B82FF', fontFamily: 'Space Grotesk, sans-serif' }}>
              {profile.availability_status || 'Available'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
