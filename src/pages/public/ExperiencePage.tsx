import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Calendar } from 'lucide-react'
import { publicApi } from '../../lib/api'
import type { Experience, Education } from '../../lib/supabase'

export function ExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([publicApi.getExperiences(), publicApi.getEducation()]).then(([exp, edu]) => {
      setExperience(exp)
      setEducation(edu)
      setLoading(false)
    })
  }, [])

  const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' }) : ''

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>

  return (
    <div style={{ padding: '80px 24px 100px', maxWidth: 900, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="section-header" style={{ marginBottom: 64 }}>
        <span className="section-label">Journey</span>
        <h1 className="section-title">Experience & Education</h1>
        <p className="section-subtitle">The chapters of my journey — where I've studied, worked, and grown.</p>
      </motion.div>

      {experience.length > 0 && (
        <section style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
            <div style={{ width: 36, height: 36, background: 'rgba(65,105,225,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={18} color="#4169E1" />
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 600, color: '#EDEAF5' }}>Experience</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {experience.map((exp, i) => (
              <motion.div key={exp.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 16, padding: '24px 28px', borderLeft: '3px solid #4169E1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#EDEAF5', marginBottom: 4 }}>{exp.role}</h3>
                    <p style={{ color: '#4169E1', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>{exp.organisation}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-muted" style={{ marginBottom: 6, display: 'inline-block' }}>{exp.experience_type}</span>
                    {exp.start_date && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#A8AFC1', fontSize: '0.8rem', justifyContent: 'flex-end' }}>
                        <Calendar size={12} />
                        {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : formatDate(exp.end_date)}
                      </div>
                    )}
                  </div>
                </div>
                {exp.description && <p style={{ color: '#A8AFC1', fontSize: '0.9rem', lineHeight: 1.7 }}>{exp.description}</p>}
                {exp.responsibilities?.length > 0 && (
                  <div style={{ marginTop: 14 }}>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {exp.responsibilities.map((r, ri) => (
                        <li key={ri} style={{ display: 'flex', gap: 10, color: '#A8AFC1', fontSize: '0.875rem' }}>
                          <span style={{ width: 5, height: 5, background: '#4169E1', borderRadius: '50%', marginTop: 8, flexShrink: 0 }} />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
            <div style={{ width: 36, height: 36, background: 'rgba(104,74,158,0.12)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={18} color="#a78bfa" />
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 600, color: '#EDEAF5' }}>Education</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {education.map((edu, i) => (
              <motion.div key={edu.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 16, padding: '24px 28px', borderLeft: '3px solid #a78bfa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#EDEAF5', marginBottom: 4 }}>{edu.institution}</h3>
                    <p style={{ color: '#a78bfa', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: '0.9rem' }}>{[edu.degree, edu.branch].filter(Boolean).join(' · ')}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {edu.start_year && <p style={{ color: '#A8AFC1', fontSize: '0.825rem' }}>{edu.start_year} — {edu.is_current ? 'Present' : edu.expected_graduation_year}</p>}
                    {edu.current_semester && <p style={{ color: '#a78bfa', fontSize: '0.775rem', fontFamily: 'Space Grotesk, sans-serif' }}>Semester {edu.current_semester}</p>}
                  </div>
                </div>
                {edu.description && <p style={{ color: '#A8AFC1', fontSize: '0.875rem', lineHeight: 1.7, marginTop: 10 }}>{edu.description}</p>}
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
