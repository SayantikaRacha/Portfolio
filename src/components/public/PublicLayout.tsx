import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Menu, X, Download, ChevronDown, Code2, Palette, Sparkles, ExternalLink } from 'lucide-react'
import { Github, Linkedin } from '../icons/BrandIcons'
import { publicApi } from '../../lib/api'
import type { SocialLink } from '../../lib/supabase'

interface Props {
  selectedProfile: string
  onProfileChange: (p: string) => void
}

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/ai-lab', label: 'AI Lab' },
  { to: '/skills', label: 'Skills' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
]

const profileOptions = [
  { id: 'developer', label: 'Developer', Icon: Code2 },
  { id: 'creative', label: 'Creative Tech', Icon: Palette },
  { id: 'explore', label: 'Explore All', Icon: Sparkles },
]

export function PublicLayout({ selectedProfile, onProfileChange }: Props) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])

  useEffect(() => {
    publicApi.getSiteSettings().then(setSettings)
    publicApi.getSocialLinks().then(setSocialLinks)
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const currentProfile = profileOptions.find(p => p.id === selectedProfile) || profileOptions[2]
  const resumeUrl = settings['resume_url'] || ''

  const socialIconMap: Record<string, React.ComponentType<any>> = {
    github: Github,
    linkedin: Linkedin,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080A10' }}>
      {/* NAVBAR */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 500,
        background: scrolled ? 'rgba(8,10,16,0.95)' : 'rgba(8,10,16,0.7)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(237,234,245,0.08)' : 'transparent'}`,
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24
        }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#EDEAF5', lineHeight: 1 }}>Sia</div>
              <div style={{ fontSize: '0.6rem', color: '#4169E1', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Digital Space</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', flex: 1, justifyContent: 'center' }} className="desktop-nav">
            {navLinks.map(link => {
              const active = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to))
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: active ? '#4169E1' : '#A8AFC1',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={e => { if (!active) (e.target as HTMLElement).style.color = '#EDEAF5' }}
                  onMouseLeave={e => { if (!active) (e.target as HTMLElement).style.color = '#A8AFC1' }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            {/* Profile switcher */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(237,234,245,0.12)',
                  borderRadius: 6,
                  color: '#A8AFC1',
                  cursor: 'pointer',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap'
                }}
              >
                <currentProfile.Icon size={14} color="#4169E1" />
                <span style={{ display: 'none' }} className="label">{currentProfile.label}</span>
                <ChevronDown size={12} />
              </button>
              {profileOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: 8,
                  background: '#111622',
                  border: '1px solid rgba(237,234,245,0.12)',
                  borderRadius: 10,
                  overflow: 'hidden',
                  minWidth: 160,
                  zIndex: 600
                }}>
                  {profileOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => { onProfileChange(opt.id); setProfileOpen(false) }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        width: '100%',
                        padding: '10px 14px',
                        background: opt.id === selectedProfile ? 'rgba(65,105,225,0.1)' : 'transparent',
                        border: 'none',
                        color: opt.id === selectedProfile ? '#4169E1' : '#A8AFC1',
                        cursor: 'pointer',
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '0.875rem',
                        textAlign: 'left'
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = opt.id === selectedProfile ? 'rgba(65,105,225,0.1)' : 'transparent' }}
                    >
                      <opt.Icon size={14} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Resume button */}
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <Download size={14} />
                Resume
              </a>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: '#EDEAF5',
                cursor: 'pointer',
                padding: 4
              }}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div style={{
            background: '#111622',
            borderTop: '1px solid rgba(237,234,245,0.08)',
            padding: '16px 24px 24px'
          }}>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '10px 0',
                  color: location.pathname === link.to ? '#4169E1' : '#A8AFC1',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(237,234,245,0.06)'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Close profile dropdown on outside click */}
      {profileOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 400 }}
          onClick={() => setProfileOpen(false)}
        />
      )}

      {/* PAGE CONTENT */}
      <main style={{ paddingTop: 64 }}>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer style={{
        background: '#111622',
        borderTop: '1px solid rgba(237,234,245,0.08)',
        padding: '48px 24px'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          textAlign: 'center'
        }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#EDEAF5' }}>
            Sia's Digital Space
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {socialLinks.map(link => {
              const IconComp = socialIconMap[link.icon_name || '']
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.display_name || link.platform}
                  style={{
                    width: 40, height: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(237,234,245,0.12)',
                    borderRadius: 8,
                    color: '#A8AFC1',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(65,105,225,0.4)'
                    ;(e.currentTarget as HTMLElement).style.color = '#4169E1'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(237,234,245,0.12)'
                    ;(e.currentTarget as HTMLElement).style.color = '#A8AFC1'
                  }}
                >
                  {IconComp ? <IconComp size={18} /> : <ExternalLink size={18} />}
                </a>
              )
            })}
            {/* Fallback static links if no data */}
            {socialLinks.length === 0 && (
              <>
                <a href="https://github.com/SayantikaRacha" target="_blank" rel="noopener noreferrer" style={{ color: '#A8AFC1', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(237,234,245,0.12)', borderRadius: 8, textDecoration: 'none' }}>
                  <Github size={18} />
                </a>
                <a href="https://www.linkedin.com/in/sayantika-das-a623043b2/" target="_blank" rel="noopener noreferrer" style={{ color: '#A8AFC1', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(237,234,245,0.12)', borderRadius: 8, textDecoration: 'none' }}>
                  <Linkedin size={18} />
                </a>
              </>
            )}
          </div>
          <p style={{ color: '#A8AFC1', fontSize: '0.875rem' }}>
            {settings['footer_text'] || '© 2026 Sayantika. Built with curiosity.'}
          </p>
        </div>
      </footer>
    </div>
  )
}
