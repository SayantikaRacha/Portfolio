import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FlaskConical, ExternalLink } from 'lucide-react'
import { publicApi } from '../../lib/api'
import type { AILabItem } from '../../lib/supabase'

const statusColors: Record<string, string> = {
  Completed: 'badge-green',
  Ongoing: 'badge-accent',
  Exploring: 'badge-yellow',
  Idea: 'badge-muted',
}

export function AILabPage() {
  const [items, setItems] = useState<AILabItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    publicApi.getAILabItems().then(data => {
      setItems(data)
      setLoading(false)
    })
  }, [])

  return (
    <div style={{ padding: '80px 24px 100px', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="section-header" style={{ marginBottom: 64 }}>
        <span className="section-label">Experiments</span>
        <h1 className="section-title">AI Lab</h1>
        <p className="section-subtitle">Explorations at the intersection of artificial intelligence, creativity, and practical applications. A space for learning, experimentation, and curiosity.</p>
      </motion.div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 80 }}>
          <FlaskConical size={48} style={{ margin: '0 auto 16px', opacity: 0.3, color: '#A8AFC1' }} />
          <p style={{ color: '#A8AFC1', fontFamily: 'Space Grotesk, sans-serif' }}>AI experiments coming soon.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card card-body"
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ width: 42, height: 42, background: 'rgba(65,105,225,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FlaskConical size={22} color="#4169E1" />
                </div>
                <span className={`badge ${statusColors[item.status] || 'badge-muted'}`}>{item.status}</span>
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#EDEAF5', marginBottom: 6, fontSize: '1.05rem' }}>{item.title}</h3>
              {item.category && <p style={{ color: '#4169E1', fontSize: '0.775rem', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 10 }}>{item.category}</p>}
              {item.description && <p style={{ color: '#A8AFC1', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: 16 }}>{item.description}</p>}
              {item.tools?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {item.tools.map(t => <span key={t} className="badge badge-muted" style={{ fontSize: '0.7rem' }}>{t}</span>)}
                </div>
              )}
              {item.project_links?.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {item.project_links.map((link, li) => (
                    <a key={li} href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#4169E1', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none', fontFamily: 'Space Grotesk, sans-serif' }}>
                      <ExternalLink size={12} /> Link {li + 1}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
