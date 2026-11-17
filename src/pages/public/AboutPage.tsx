import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Briefcase, Sparkles, User } from 'lucide-react'
import { publicApi } from '../../lib/api'
import type { Profile, Education, Experience } from '../../lib/supabase'

export function AboutPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [education, setEducation] = useState<Education[]>([])
  const [experience, setExperience] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      publicApi.getProfile(),
      publicApi.getEducation(),
      publicApi.getExperiences(),
    ]).then(([prof, edu, exp]) => {
      setProfile(prof)
      setEducation(edu)
      setExperience(exp)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>

  const profileImg = profile?.profile_image_url || '/sayantika.jpg'

  return (
    <div style={{ padding: '80px 24px 100px', maxWidth: 1100, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 64 }}>
        <span className="section-label">About</span>
        <h1 className="section-title">About Sia</h1>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: 64, alignItems: 'start' }}>
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 20, padding: 32, textAlign: 'center', marginBottom: 24 }}>
            {profileImg ? (
              <img
                src={profileImg}
                alt={profile?.display_name || 'Sayantika'}
                style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 20px', border: '3px solid rgba(65,105,225,0.35)', display: 'block' }}
                onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
              />
            ) : (
              <div style={{ width: 140, height: 140, borderRadius: '50%', background: 'rgba(65,105,225,0.08)', border: '3px solid rgba(65,105,225,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <User size={56} color="rgba(65,105,225,0.4)" />
              </div>
            )}
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.4rem', color: '#EDEAF5', marginBottom: 6 }}>
              {profile?.display_name || 'Sayantika'}
            </h2>
            <p style={{ color: '#4169E1', fontSize: '0.875rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, marginBottom: 16 }}>
              {profile?.professional_title || 'Computer Science Student'}
            </p>
            {profile?.availability_status && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 100, padding: '5px 14px', fontSize: '0.75rem', color: '#4ade80', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>
                <span style={{ width: 6, height: 6, background: '#4ade80', borderRadius: '50%' }} />
                {profile.availability_status}
              </div>
            )}
          </div>

          <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {profile?.institution && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <GraduationCap size={18} color="#4169E1" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ color: '#EDEAF5', fontSize: '0.875rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>{profile.institution}</p>
                  <p style={{ color: '#A8AFC1', fontSize: '0.775rem' }}>{profile.degree}</p>
                  {profile.academic_status && <p style={{ color: '#A8AFC1', fontSize: '0.775rem' }}>{profile.academic_status}</p>}
                </div>
              </div>
            )}
            {profile?.location && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <MapPin size={18} color="#A8AFC1" />
                <span style={{ color: '#A8AFC1', fontSize: '0.875rem' }}>{profile.location}</span>
              </div>
            )}
            {profile?.contact_email && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ color: '#A8AFC1', fontSize: '0.875rem' }}>📧 {profile.contact_email}</span>
              </div>
            )}
          </div>

          {profile?.professional_interests && profile.professional_interests.length > 0 && (
            <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 16, padding: 24, marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <Sparkles size={16} color="#4169E1" />
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.8rem', color: '#EDEAF5', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Interests</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {profile.professional_interests.map(interest => (
                  <span key={interest} className="badge badge-muted">{interest}</span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 20 }}>The Story So Far</h2>
            <div style={{ color: '#A8AFC1', fontSize: '1.05rem', lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>
              {profile?.biography || "I'm a Computer Science student driven by curiosity, experimentation, and the desire to understand how technology can solve real problems.\n\nMy interests span software development, artificial intelligence, and creative technology. I enjoy turning ideas into practical experiments, learning through projects, and exploring the possibilities that emerge when technical thinking meets creativity."}
            </div>
          </section>

          {education.length > 0 && (
            <section style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <GraduationCap size={20} color="#4169E1" />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.3rem', fontWeight: 600, color: '#EDEAF5' }}>Education</h2>
              </div>
              {education.map(edu => (
                <div key={edu.id} style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 14, padding: '22px 26px', marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 8 }}>
                    <div>
                      <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#EDEAF5', marginBottom: 4 }}>{edu.institution}</h3>
                      <p style={{ color: '#4169E1', fontSize: '0.875rem', fontFamily: 'Space Grotesk, sans-serif' }}>{[edu.degree, edu.branch].filter(Boolean).join(' · ')}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {edu.start_year && <p style={{ color: '#A8AFC1', fontSize: '0.825rem' }}>{edu.start_year} — {edu.is_current ? 'Present' : edu.expected_graduation_year}</p>}
                      {edu.current_semester && <p style={{ color: '#4169E1', fontSize: '0.775rem', fontFamily: 'Space Grotesk, sans-serif' }}>Semester {edu.current_semester}</p>}
                    </div>
                  </div>
                  {edu.description && <p style={{ color: '#A8AFC1', fontSize: '0.875rem', lineHeight: 1.65 }}>{edu.description}</p>}
                  {edu.relevant_coursework?.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                      <p style={{ color: '#A8AFC1', fontSize: '0.775rem', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Relevant Coursework</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {edu.relevant_coursework.map(c => <span key={c} className="badge badge-muted" style={{ fontSize: '0.72rem' }}>{c}</span>)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <Briefcase size={20} color="#4169E1" />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.3rem', fontWeight: 600, color: '#EDEAF5' }}>Experience</h2>
              </div>
              {experience.map(exp => (
                <div key={exp.id} style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 14, padding: '22px 26px', marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                    <div>
                      <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#EDEAF5', marginBottom: 4 }}>{exp.role}</h3>
                      <p style={{ color: '#4169E1', fontSize: '0.875rem', fontFamily: 'Space Grotesk, sans-serif' }}>{exp.organisation}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-muted">{exp.experience_type}</span>
                      {exp.start_date && (
                        <p style={{ color: '#A8AFC1', fontSize: '0.775rem', marginTop: 6 }}>
                          {new Date(exp.start_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}
                          {' — '}
                          {exp.is_current ? 'Present' : (exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' }) : '')}
                        </p>
                      )}
                    </div>
                  </div>
                  {exp.description && <p style={{ color: '#A8AFC1', fontSize: '0.875rem', lineHeight: 1.65, marginTop: 10 }}>{exp.description}</p>}
                </div>
              ))}
            </section>
          )}
        </motion.div>
      </div>
    </div>
  )
}
