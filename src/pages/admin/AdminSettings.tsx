import React, { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { adminApi } from '../../lib/api'
import { useToast } from '../../components/admin/Toast'

const sectionToggles = [
  { key: 'show_section_projects', label: 'Projects section' },
  { key: 'show_section_skills', label: 'Skills section' },
  { key: 'show_section_certificates', label: 'Certificates section' },
  { key: 'show_section_ailab', label: 'AI Lab section' },
  { key: 'show_section_experience', label: 'Experience section' },
  { key: 'show_section_education', label: 'Education section' },
  { key: 'show_section_achievements', label: 'Achievements section' },
  { key: 'show_section_contact', label: 'Contact section' },
]

export function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { showSuccess, showError } = useToast()

  useEffect(() => {
    adminApi.getSiteSettings().then(s => {
      setSettings(s)
      setLoading(false)
    })
  }, [])

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const toggleSection = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: prev[key] === 'false' ? 'true' : 'false' }))
  }

  const handleSave = async () => {
    setSaving(true)
    const { error } = await adminApi.updateSiteSettings(settings)
    setSaving(false)
    if (error) { showError(`Failed to save: ${error.message}`); return }
    showSuccess('Website settings saved!')
  }

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Website Settings</h1>
          <p className="admin-page-subtitle">Control website-wide content and visibility. Changes apply immediately after saving.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#EDEAF5', marginBottom: 24, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Website Content</h2>

          <div className="form-group">
            <label className="form-label">Site Title</label>
            <input className="form-input" value={settings['site_title'] || ''} onChange={e => updateSetting('site_title', e.target.value)} placeholder="Sia | Computer Science Student & Developer" />
            <p className="form-hint">Appears in browser tabs and search results.</p>
          </div>

          <div className="form-group">
            <label className="form-label">Site Description (SEO)</label>
            <textarea className="form-textarea" style={{ minHeight: 80 }} value={settings['site_description'] || ''} onChange={e => updateSetting('site_description', e.target.value)} placeholder="Explore Sia's projects..." />
            <p className="form-hint">Shown in search engine previews. Keep under 160 characters.</p>
          </div>

          <div className="form-group">
            <label className="form-label">Hero Heading</label>
            <input className="form-input" value={settings['hero_heading'] || ''} onChange={e => updateSetting('hero_heading', e.target.value)} placeholder="Hi, I'm Sia." />
          </div>

          <div className="form-group">
            <label className="form-label">Hero Subheading</label>
            <input className="form-input" value={settings['hero_subheading'] || ''} onChange={e => updateSetting('hero_subheading', e.target.value)} placeholder="I turn curiosity into things I can build." />
          </div>

          <div className="form-group">
            <label className="form-label">Hero Introduction</label>
            <textarea className="form-textarea" value={settings['hero_intro'] || ''} onChange={e => updateSetting('hero_intro', e.target.value)} placeholder="A Computer Science student exploring..." />
          </div>

          <div className="form-group">
            <label className="form-label">Footer Text</label>
            <input className="form-input" value={settings['footer_text'] || ''} onChange={e => updateSetting('footer_text', e.target.value)} placeholder="© 2026 Sayantika. Built with curiosity." />
          </div>
        </div>

        <div>
          <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 16, padding: 32 }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#EDEAF5', marginBottom: 24, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Section Visibility</h2>
            <p style={{ color: '#A8AFC1', fontSize: '0.825rem', marginBottom: 24, lineHeight: 1.6 }}>
              Toggle each section on or off. Disabled sections won't appear on the public portfolio.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {sectionToggles.map(({ key, label }) => {
                const isOn = settings[key] !== 'false'
                return (
                  <button
                    key={key}
                    onClick={() => toggleSection(key)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(237,234,245,0.06)',
                      cursor: 'pointer',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '0.9rem',
                      color: isOn ? '#EDEAF5' : '#A8AFC1',
                      transition: 'all 0.2s',
                      borderRadius: 6
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                  >
                    {label}
                    <div style={{
                      width: 44, height: 24,
                      background: isOn ? '#4169E1' : 'rgba(255,255,255,0.1)',
                      borderRadius: 12,
                      position: 'relative',
                      transition: 'background 0.2s',
                      flexShrink: 0
                    }}>
                      <div style={{
                        width: 18, height: 18,
                        background: 'white',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: 3,
                        left: isOn ? 23 : 3,
                        transition: 'left 0.2s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                      }} />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 16, padding: 32, marginTop: 24 }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#EDEAF5', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Important Notes</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Changes only go live after clicking Save Settings.',
                'Section visibility only affects the public portfolio, not the admin.',
                'The resume URL must be set in Resume & Files for the download button to appear.',
                'Profile content is managed separately in the Profile section.',
              ].map((note, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, color: '#A8AFC1', fontSize: '0.825rem', lineHeight: 1.5 }}>
                  <span style={{ width: 5, height: 5, background: '#4169E1', borderRadius: '50%', marginTop: 7, flexShrink: 0 }} />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
