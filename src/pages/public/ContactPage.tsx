import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Mail, ExternalLink, MessageCircle } from 'lucide-react'
import { Github, Linkedin, Instagram, Youtube } from '../../components/icons/BrandIcons'
import { publicApi } from '../../lib/api'
import type { Profile, SocialLink } from '../../lib/supabase'

const iconMap: Record<string, React.ComponentType<any>> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  globe: Globe,
  mail: Mail,
}

export function ContactPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([publicApi.getProfile(), publicApi.getSocialLinks()]).then(([prof, links]) => {
      setProfile(prof)
      setSocialLinks(links)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>

  return (
    <div style={{ padding: '80px 24px 100px', maxWidth: 800, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 64 }}>
        <span className="section-label">Get in Touch</span>
        <h1 className="section-title">Contact</h1>
        <p className="section-subtitle">
          I'm open to interesting conversations, collaborations, and opportunities. The best way to reach me is through my social profiles or email.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 48 }}>
        {socialLinks.map((link, i) => {
          const Icon = iconMap[link.icon_name || ''] || ExternalLink
          return (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: '#171D2A',
                border: '1px solid rgba(237,234,245,0.08)',
                borderRadius: 14,
                padding: '18px 22px',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              whileHover={{ y: -3, borderColor: 'rgba(65,105,225,0.4)' }}
            >
              <div style={{ width: 44, height: 44, background: 'rgba(65,105,225,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={22} color="#4169E1" />
              </div>
              <div>
                <p style={{ color: '#EDEAF5', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.95rem', marginBottom: 2 }}>{link.platform}</p>
                <p style={{ color: '#A8AFC1', fontSize: '0.775rem' }}>{link.display_name || 'Visit →'}</p>
              </div>
            </motion.a>
          )
        })}

        {socialLinks.length === 0 && (
          <>
            <a href="https://github.com/SayantikaRacha" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 14, padding: '18px 22px', textDecoration: 'none' }}>
              <div style={{ width: 44, height: 44, background: 'rgba(65,105,225,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Github size={22} color="#4169E1" /></div>
              <div><p style={{ color: '#EDEAF5', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>GitHub</p><p style={{ color: '#A8AFC1', fontSize: '0.775rem' }}>SayantikaRacha</p></div>
            </a>
            <a href="https://www.linkedin.com/in/sayantika-das-a623043b2/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 14, padding: '18px 22px', textDecoration: 'none' }}>
              <div style={{ width: 44, height: 44, background: 'rgba(65,105,225,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Linkedin size={22} color="#4169E1" /></div>
              <div><p style={{ color: '#EDEAF5', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>LinkedIn</p><p style={{ color: '#A8AFC1', fontSize: '0.775rem' }}>Sayantika Das</p></div>
            </a>
          </>
        )}
      </div>

      {profile?.contact_email ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 20, padding: 36, textAlign: 'center' }}>
          <Mail size={32} color="#4169E1" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#EDEAF5', marginBottom: 10 }}>Email</h3>
          <a href={`mailto:${profile.contact_email}`} style={{ color: '#4169E1', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>{profile.contact_email}</a>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 20, padding: 36, textAlign: 'center' }}>
          <MessageCircle size={32} color="#4169E1" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#EDEAF5', marginBottom: 10 }}>Let's Connect</h3>
          <p style={{ color: '#A8AFC1' }}>Find me on GitHub or LinkedIn to connect and start a conversation.</p>
        </motion.div>
      )}
    </div>
  )
}
