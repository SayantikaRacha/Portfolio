import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Calendar, ExternalLink, CheckCircle } from 'lucide-react'
import { publicApi } from '../../lib/api'
import type { Certificate } from '../../lib/supabase'

export function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [filterOrg, setFilterOrg] = useState('All')

  useEffect(() => {
    publicApi.getCertificates().then(data => {
      setCertificates(data)
      setLoading(false)
    })
  }, [])

  const orgs = ['All', ...Array.from(new Set(certificates.map(c => c.issuing_organisation).filter(Boolean)))]
  const filtered = filterOrg === 'All' ? certificates : certificates.filter(c => c.issuing_organisation === filterOrg)
  const isImage = (url: string) => /\.(jpg|jpeg|png|webp|gif)$/i.test(url)

  return (
    <div style={{ padding: '80px 24px 100px', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="section-header"
        style={{ marginBottom: 48 }}
      >
        <span className="section-label">Credentials</span>
        <h1 className="section-title">Certificates</h1>
        <p className="section-subtitle">Courses, workshops, and credentials that have contributed to my learning journey.</p>
      </motion.div>

      {orgs.length > 2 && (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40, justifyContent: 'center' }}>
          {orgs.map(org => (
            <button
              key={org}
              onClick={() => setFilterOrg(org)}
              style={{
                padding: '7px 18px',
                borderRadius: 100,
                border: `1px solid ${filterOrg === org ? 'rgba(65,105,225,0.5)' : 'rgba(237,234,245,0.12)'}`,
                background: filterOrg === org ? 'rgba(65,105,225,0.12)' : 'transparent',
                color: filterOrg === org ? '#5B82FF' : '#A8AFC1',
                cursor: 'pointer',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.825rem',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}
            >
              {org}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 80 }}>
          <Award size={48} style={{ margin: '0 auto 16px', opacity: 0.3, color: '#A8AFC1' }} />
          <p style={{ color: '#A8AFC1', fontFamily: 'Space Grotesk, sans-serif' }}>No certificates have been published yet.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24
        }}>
          {filtered.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card"
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                height: 160,
                background: cert.file_url && isImage(cert.thumbnail_url || cert.file_url)
                  ? `url(${cert.thumbnail_url || cert.file_url}) center/cover`
                  : 'linear-gradient(135deg, rgba(65,105,225,0.15) 0%, rgba(104,74,158,0.1) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {(!cert.file_url || (!isImage(cert.thumbnail_url || '') && !isImage(cert.file_url))) && (
                  <Award size={48} color="rgba(65,105,225,0.4)" />
                )}
              </div>

              <div className="card-body">
                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600, fontSize: '1rem',
                  color: '#EDEAF5', marginBottom: 6, lineHeight: 1.3
                }}>
                  {cert.title}
                </h3>
                <p style={{ color: '#4169E1', fontSize: '0.825rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, marginBottom: 8 }}>
                  {cert.issuing_organisation}
                </p>

                {cert.issue_date && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#A8AFC1', fontSize: '0.775rem', marginBottom: 12 }}>
                    <Calendar size={12} />
                    {new Date(cert.issue_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
                    {cert.expiry_date && (
                      <span> — {new Date(cert.expiry_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}</span>
                    )}
                  </div>
                )}

                {cert.description && (
                  <p style={{ color: '#A8AFC1', fontSize: '0.825rem', lineHeight: 1.65, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {cert.description}
                  </p>
                )}

                {cert.related_skills?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {cert.related_skills.map(s => (
                      <span key={s} className="badge badge-muted" style={{ fontSize: '0.68rem' }}>{s}</span>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {cert.file_url && (
                    <a
                      href={cert.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <ExternalLink size={13} />
                      View Certificate
                    </a>
                  )}
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      style={{ justifyContent: 'center' }}
                      title="Verify credential"
                    >
                      <CheckCircle size={13} />
                      Verify
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
