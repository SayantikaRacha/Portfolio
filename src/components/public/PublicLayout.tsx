import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Download, ChevronDown, Code2, Sparkles, Briefcase, Volume2, VolumeX, ShieldCheck, Film, User } from 'lucide-react'
import { Github, Linkedin } from '../icons/BrandIcons'
import { publicApi } from '../../lib/api'
import type { SocialLink } from '../../lib/supabase'

interface Props {
  selectedProfile: string
  onProfileChange: (p: string) => void
  onReplayIntro?: () => void
  onOpenProfileSelector?: () => void
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'resume', label: 'Resume' },
  { id: 'moments', label: 'Moments' },
  { id: 'skills', label: 'Skills' },
  { id: 'originals', label: 'Originals' },
  { id: 'about', label: 'About' },
  { id: 'top-picks', label: 'Top Picks' },
]

const profileMap: Record<string, { label: string; badge: string; color: string; icon: any }> = {
  explore: { label: 'Sayantika', badge: 'MAIN', color: '#E50914', icon: null },
  recruiter: { label: 'Recruiter', badge: 'R', color: '#0284C7', icon: Briefcase },
  developer: { label: 'Developer', badge: '</>', color: '#059669', icon: Code2 },
  creative: { label: 'Creative Tech', badge: '✦', color: '#D97706', icon: Sparkles },
}

export function PublicLayout({ selectedProfile, onProfileChange, onReplayIntro, onOpenProfileSelector }: Props) {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [muted, setMuted] = useState(false)
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])

  useEffect(() => {
    publicApi.getSiteSettings().then(setSettings)
    publicApi.getSocialLinks().then(setSocialLinks)
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 25)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const currentProfile = profileMap[selectedProfile] || profileMap.explore
  const resumeUrl = settings['resume_url'] || ''

  const handleNavClick = (id: string) => {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleBuildClick = () => {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById('contact')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } else {
      const el = document.getElementById('contact')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080A10', color: '#EDEAF5', position: 'relative' }}>
      {/* ============================================================
          TOP CINEMATIC NAVBAR
          ============================================================ */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          background: scrolled
            ? 'rgba(8, 10, 16, 0.94)'
            : 'linear-gradient(180deg, rgba(8,10,16,0.95) 0%, rgba(8,10,16,0.4) 65%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'rgba(237, 234, 245, 0.08)' : 'transparent'}`,
          transition: 'all 0.35s ease',
        }}
      >
        <div
          style={{
            maxWidth: 1360,
            margin: '0 auto',
            padding: '0 24px',
            height: 68,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}
        >
          {/* Brand Logo: Stylized Red Ribbon S + Sayantika The Series */}
          <Link
            to="/"
            onClick={() => handleNavClick('home')}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 32,
                height: 36,
                background: 'linear-gradient(135deg, #E50914 0%, #B81D24 100%)',
                borderRadius: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(229, 9, 20, 0.45)',
                fontWeight: 900,
                fontSize: '1.45rem',
                color: '#FFFFFF',
                fontFamily: 'var(--font-cinema)',
                letterSpacing: '0.02em',
                transform: 'skewX(-4deg)',
              }}
            >
              S
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-cinema)',
                  fontSize: '1.45rem',
                  letterSpacing: '0.06em',
                  lineHeight: 1,
                  color: '#EDEAF5',
                }}
              >
                SAYANTIKA
              </span>
              <span
                style={{
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  color: '#E50914',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  marginTop: 2,
                  fontFamily: 'var(--font-heading)',
                }}
              >
                THE SERIES
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 4,
            }}
            className="desktop-navbar"
          >
            <style>{`
              @media (min-width: 992px) {
                .desktop-navbar { display: flex !important; }
                .mobile-toggle { display: none !important; }
              }
            `}</style>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 14px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.86rem',
                  fontWeight: 500,
                  color: '#A8AFC1',
                  cursor: 'pointer',
                  borderRadius: 6,
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#EDEAF5'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#A8AFC1'
                  e.currentTarget.style.background = 'none'
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons & Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {/* Audio Toggle */}
            <button
              onClick={() => setMuted(!muted)}
              title={muted ? 'Muted' : 'Audio On'}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(237, 234, 245, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: muted ? '#64748B' : '#EDEAF5',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            {/* Profile Dropdown Switcher */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 10px 4px 6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(237, 234, 245, 0.12)',
                  borderRadius: 8,
                  cursor: 'pointer',
                  color: '#EDEAF5',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(65, 105, 225, 0.5)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(237, 234, 245, 0.12)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Avatar miniature */}
                {selectedProfile === 'explore' ? (
                  <img
                    src="./sayantika.jpg"
                    alt="Sayantika"
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 5,
                      objectFit: 'cover',
                      border: '1.5px solid #E50914',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 5,
                      background: currentProfile.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#FFF',
                    }}
                  >
                    {currentProfile.badge}
                  </div>
                )}
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    display: 'none',
                  }}
                  className="profile-label-desktop"
                >
                  <style>{`
                    @media (min-width: 640px) {
                      .profile-label-desktop { display: inline !important; }
                    }
                  `}</style>
                  {currentProfile.label}
                </span>
                <ChevronDown size={14} color="#A8AFC1" />
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    background: '#0D111A',
                    border: '1px solid rgba(237, 234, 245, 0.15)',
                    borderRadius: 12,
                    padding: 8,
                    minWidth: 220,
                    boxShadow: '0 20px 45px rgba(0,0,0,0.85), 0 0 20px rgba(65,105,225,0.15)',
                    zIndex: 1000,
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: '#64748B',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '8px 10px 4px',
                    }}
                  >
                    Switch Profile
                  </div>

                  {Object.entries(profileMap).map(([key, prof]) => (
                    <button
                      key={key}
                      onClick={() => {
                        onProfileChange(key)
                        setProfileOpen(false)
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '8px 10px',
                        background: selectedProfile === key ? 'rgba(65, 105, 225, 0.15)' : 'none',
                        border: 'none',
                        borderRadius: 6,
                        color: selectedProfile === key ? '#EDEAF5' : '#A8AFC1',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.85rem',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                        e.currentTarget.style.color = '#EDEAF5'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          selectedProfile === key ? 'rgba(65, 105, 225, 0.15)' : 'none'
                        e.currentTarget.style.color =
                          selectedProfile === key ? '#EDEAF5' : '#A8AFC1'
                      }}
                    >
                      {key === 'explore' ? (
                        <img
                          src="./sayantika.jpg"
                          alt="Sayantika"
                          style={{ width: 22, height: 22, borderRadius: 4, objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 4,
                            background: prof.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            color: '#FFF',
                          }}
                        >
                          {prof.badge}
                        </div>
                      )}
                      <span style={{ fontWeight: selectedProfile === key ? 600 : 400 }}>
                        {prof.label}
                      </span>
                    </button>
                  ))}

                  <div
                    style={{
                      height: 1,
                      background: 'rgba(237, 234, 245, 0.1)',
                      margin: '6px 0',
                    }}
                  />

                  {/* Return to Full Screen Profile Selector */}
                  {onOpenProfileSelector && (
                    <button
                      onClick={() => {
                        setProfileOpen(false)
                        onOpenProfileSelector()
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 10px',
                        background: 'none',
                        border: 'none',
                        borderRadius: 6,
                        color: '#5B82FF',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(65, 105, 225, 0.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                    >
                      <User size={14} /> Who's Watching Screen
                    </button>
                  )}

                  {/* Replay Intro */}
                  {onReplayIntro && (
                    <button
                      onClick={() => {
                        setProfileOpen(false)
                        onReplayIntro()
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 10px',
                        background: 'none',
                        border: 'none',
                        borderRadius: 6,
                        color: '#E50914',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(229, 9, 20, 0.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                    >
                      <Film size={14} /> Replay Cinematic Intro
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* "LET'S BUILD" Pill Button */}
            <button
              onClick={handleBuildClick}
              style={{
                background: 'linear-gradient(135deg, #E50914 0%, #B81D24 100%)',
                color: '#FFFFFF',
                padding: '8px 18px',
                borderRadius: 100,
                fontFamily: 'var(--font-cinema)',
                fontSize: '1rem',
                letterSpacing: '0.08em',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(229, 9, 20, 0.4)',
                transition: 'all 0.25s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(229, 9, 20, 0.65)'
                e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(229, 9, 20, 0.4)'
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
              }}
            >
              LET'S BUILD
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-toggle"
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(237, 234, 245, 0.12)',
                color: '#EDEAF5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div
            style={{
              background: '#080A10',
              borderBottom: '1px solid rgba(237, 234, 245, 0.12)',
              padding: '16px 24px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#EDEAF5',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: 8,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ============================================================
          MAIN CONTENT AREA
          ============================================================ */}
      <main style={{ minHeight: '100vh', paddingTop: 0 }}>
        <Outlet />
      </main>

      {/* ============================================================
          CINEMATIC FOOTER (NETFLIX END CREDITS)
          ============================================================ */}
      <footer
        style={{
          background: '#05070B',
          borderTop: '1px solid rgba(237, 234, 245, 0.08)',
          padding: '80px 24px 48px',
          color: '#64748B',
          fontFamily: 'var(--font-body)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Top Row: Series Title & Question Callout */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 24,
              paddingBottom: 40,
              borderBottom: '1px solid rgba(237, 234, 245, 0.06)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-cinema)',
                    fontSize: '1.6rem',
                    color: '#EDEAF5',
                    letterSpacing: '0.06em',
                  }}
                >
                  SAYANTIKA
                </span>
                <span
                  style={{
                    background: 'rgba(229, 9, 20, 0.2)',
                    border: '1px solid #E50914',
                    color: '#E50914',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    padding: '2px 8px',
                    borderRadius: 4,
                  }}
                >
                  SEASON 1
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#8892B0', maxWidth: 460 }}>
                A First-Year Computer Science & Engineering Production · Amrita Vishwa Vidyapeetham,
                Coimbatore.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <a
                href="https://github.com/SayantikaRacha"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(237, 234, 245, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EDEAF5',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#4169E1')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(237, 234, 245, 0.1)')}
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/sayantika-das-a623043b2/"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(237, 234, 245, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EDEAF5',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#4169E1')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(237, 234, 245, 0.1)')}
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links 4 Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 32,
              padding: '40px 0',
              borderBottom: '1px solid rgba(237, 234, 245, 0.06)',
              fontSize: '0.85rem',
            }}
          >
            <div>
              <div style={{ color: '#EDEAF5', fontWeight: 600, marginBottom: 16 }}>Episodes</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li><button onClick={() => handleNavClick('originals')} style={{ background: 'none', border: 'none', color: '#8892B0', cursor: 'pointer', padding: 0 }}>Ep 01: The Originals</button></li>
                <li><button onClick={() => handleNavClick('about')} style={{ background: 'none', border: 'none', color: '#8892B0', cursor: 'pointer', padding: 0 }}>Ep 02: About Sayantika</button></li>
                <li><button onClick={() => handleNavClick('skills')} style={{ background: 'none', border: 'none', color: '#8892B0', cursor: 'pointer', padding: 0 }}>Ep 03: Tech Stack Matrix</button></li>
                <li><button onClick={() => handleNavClick('moments')} style={{ background: 'none', border: 'none', color: '#8892B0', cursor: 'pointer', padding: 0 }}>Ep 04: Top Moments</button></li>
              </ul>
            </div>

            <div>
              <div style={{ color: '#EDEAF5', fontWeight: 600, marginBottom: 16 }}>Direct Access</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li><button onClick={() => handleNavClick('resume')} style={{ background: 'none', border: 'none', color: '#8892B0', cursor: 'pointer', padding: 0 }}>Curriculum Vitae / Resume</button></li>
                <li><button onClick={() => handleNavClick('moments')} style={{ background: 'none', border: 'none', color: '#8892B0', cursor: 'pointer', padding: 0 }}>Verified Credentials</button></li>
                <li><Link to="/ai-lab" style={{ color: '#8892B0', textDecoration: 'none' }}>AI Experiments Lab</Link></li>
                <li><button onClick={() => handleNavClick('top-picks')} style={{ background: 'none', border: 'none', color: '#8892B0', cursor: 'pointer', padding: 0 }}>Netflix Top 10 Picks</button></li>
              </ul>
            </div>

            <div>
              <div style={{ color: '#EDEAF5', fontWeight: 600, marginBottom: 16 }}>Network & Inquiries</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li><a href="https://github.com/SayantikaRacha" target="_blank" rel="noreferrer" style={{ color: '#8892B0' }}>GitHub Repositories</a></li>
                <li><a href="https://www.linkedin.com/in/sayantika-das-a623043b2/" target="_blank" rel="noreferrer" style={{ color: '#8892B0' }}>LinkedIn Profile</a></li>
                <li><button onClick={() => handleNavClick('contact')} style={{ background: 'none', border: 'none', color: '#8892B0', cursor: 'pointer', padding: 0 }}>Direct Contact Channel</button></li>
                <li><span style={{ color: '#4ade80' }}>● Open for Internships</span></li>
              </ul>
            </div>

            <div>
              <div style={{ color: '#EDEAF5', fontWeight: 600, marginBottom: 16 }}>System & Series Info</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li><span style={{ color: '#64748B' }}>Production Code: 2024-CSE-01</span></li>
                <li><span style={{ color: '#64748B' }}>Format: 4K Spatial Cinematic</span></li>
                {onReplayIntro && (
                  <li>
                    <button onClick={onReplayIntro} style={{ background: 'none', border: 'none', color: '#E50914', cursor: 'pointer', padding: 0 }}>
                      ▶ Replay Introduction
                    </button>
                  </li>
                )}
                <li>
                  <Link to="/admin" style={{ color: '#64748B', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <ShieldCheck size={14} /> Admin CMS Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Row */}
          <div
            style={{
              paddingTop: 32,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              fontSize: '0.78rem',
            }}
          >
            <div>
              © 2024–2028 Sayantika. The Series. Crafted with React, Vite, Supabase & Cinematic Motion.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(237, 234, 245, 0.1)',
                  color: '#A8AFC1',
                  padding: '6px 14px',
                  borderRadius: 100,
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                Back to Top ↑
              </button>
              <Link
                to="/admin"
                style={{
                  color: '#475569',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                }}
              >
                [ Private Admin ]
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
