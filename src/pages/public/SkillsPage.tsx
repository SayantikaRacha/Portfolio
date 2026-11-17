import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { publicApi } from '../../lib/api'
import type { Skill, SkillCategory } from '../../lib/supabase'

const proficiencyColor: Record<string, string> = {
  'Advanced': '#4ade80',
  'Intermediate': '#4169E1',
  'Foundational': '#a78bfa',
  'Introductory': '#A8AFC1',
  'Familiar with': '#A8AFC1',
  'Exploring': '#fbbf24',
  'Beginner': '#A8AFC1',
}

const proficiencyBadgeClass: Record<string, string> = {
  'Advanced': 'badge-green',
  'Intermediate': 'badge-accent',
  'Foundational': 'badge-purple',
  'Introductory': 'badge-muted',
  'Familiar with': 'badge-muted',
  'Exploring': 'badge-yellow',
  'Beginner': 'badge-muted',
}

export function SkillsPage() {
  const [groups, setGroups] = useState<{ category: SkillCategory; skills: Skill[] }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    publicApi.getSkills().then(data => {
      setGroups(data)
      setLoading(false)
    })
  }, [])

  return (
    <div style={{ padding: '80px 24px 100px', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="section-header"
        style={{ marginBottom: 64 }}
      >
        <span className="section-label">Capabilities</span>
        <h1 className="section-title">Skills</h1>
        <p className="section-subtitle">
          A focused set of confirmed skills — things I've genuinely worked with and built on. Project technologies are listed separately on each project page.
        </p>
      </motion.div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
          {groups.map((group, gi) => (
            <motion.section
              key={group.category.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <div style={{ height: 1, flex: 1, background: 'rgba(237,234,245,0.08)' }} />
                <span style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#4169E1',
                  whiteSpace: 'nowrap'
                }}>
                  {group.category.name}
                </span>
                <div style={{ height: 1, flex: 1, background: 'rgba(237,234,245,0.08)' }} />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 16
              }}>
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: si * 0.06 }}
                    style={{
                      background: '#171D2A',
                      border: '1px solid rgba(237,234,245,0.08)',
                      borderRadius: 12,
                      padding: '20px 22px',
                      transition: 'border-color 0.2s, transform 0.2s',
                      cursor: 'default'
                    }}
                    whileHover={{ y: -2, borderColor: 'rgba(65,105,225,0.3)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10, gap: 10 }}>
                      <h3 style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: '#EDEAF5',
                        lineHeight: 1.3
                      }}>
                        {skill.name}
                      </h3>
                      <span className={`badge ${proficiencyBadgeClass[skill.proficiency_label] || 'badge-muted'}`} style={{ fontSize: '0.68rem', flexShrink: 0 }}>
                        {skill.proficiency_label}
                      </span>
                    </div>
                    {skill.description && (
                      <p style={{ color: '#A8AFC1', fontSize: '0.825rem', lineHeight: 1.6 }}>
                        {skill.description}
                      </p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
                      <span style={{ width: 6, height: 6, background: proficiencyColor[skill.proficiency_label] || '#A8AFC1', borderRadius: '50%' }} />
                      <span style={{ fontSize: '0.72rem', color: proficiencyColor[skill.proficiency_label] || '#A8AFC1', fontFamily: 'Space Grotesk, sans-serif' }}>
                        {skill.proficiency_label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}

          {groups.length === 0 && (
            <div style={{ textAlign: 'center', padding: 80, color: '#A8AFC1' }}>
              <p>Skills will appear here once added.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
