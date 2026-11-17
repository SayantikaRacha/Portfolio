import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, ChevronRight, Calendar, Tag } from 'lucide-react'
import { Github } from '../../components/icons/BrandIcons'
import { publicApi } from '../../lib/api'
import type { Project } from '../../lib/supabase'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])

  useEffect(() => {
    if (!slug) return
    publicApi.getProjectBySlug(slug).then(data => {
      if (!data) { setNotFound(true); setLoading(false); return }
      setProject(data)
      setLoading(false)
      // Load related projects (same category, exclude current)
      publicApi.getPublishedProjects().then(all => {
        setRelatedProjects(all.filter(p => p.slug !== slug && p.category === data.category).slice(0, 3))
      })
    })
  }, [slug])

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>

  if (notFound || !project) return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#EDEAF5', marginBottom: 12 }}>Project not found</h1>
      <p style={{ color: '#A8AFC1', marginBottom: 32 }}>This project doesn't exist or hasn't been published.</p>
      <Link to="/projects" className="btn btn-primary">Back to Projects</Link>
    </div>
  )

  return (
    <div>
      {/* Cover / Hero */}
      <div style={{
        height: 'clamp(280px, 40vh, 500px)',
        background: project.cover_image_url
          ? `linear-gradient(to bottom, rgba(8,10,16,0) 0%, rgba(8,10,16,0.8) 70%, #080A10 100%), url(${project.cover_image_url}) center/cover`
          : `linear-gradient(135deg, rgba(65,105,225,0.2) 0%, rgba(104,74,158,0.1) 50%, rgba(8,10,16,0.8) 100%)`,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0 24px 48px'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', color: '#A8AFC1' }}>
            <Link to="/" style={{ color: '#A8AFC1', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={12} />
            <Link to="/projects" style={{ color: '#A8AFC1', textDecoration: 'none' }}>Projects</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#EDEAF5' }}>{project.title}</span>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
            {project.category && <span className="badge badge-accent">{project.category}</span>}
            <span className="badge badge-muted">{project.current_status}</span>
          </div>

          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: '#EDEAF5',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr min(300px, 30%)', gap: 60, alignItems: 'start' }}>
          {/* Main content */}
          <div>
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'none', border: 'none', color: '#A8AFC1',
                cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.875rem',
                marginBottom: 36, padding: 0, transition: 'color 0.2s'
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EDEAF5' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#A8AFC1' }}
            >
              <ArrowLeft size={16} /> Back
            </button>

            {/* Short description */}
            {project.short_description && (
              <p style={{ fontSize: '1.15rem', color: '#A8AFC1', lineHeight: 1.75, marginBottom: 48, borderLeft: '3px solid #4169E1', paddingLeft: 20 }}>
                {project.short_description}
              </p>
            )}

            {/* Full description */}
            {project.full_description && (
              <section style={{ marginBottom: 48 }}>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 16 }}>Overview</h2>
                <div style={{ color: '#A8AFC1', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{project.full_description}</div>
              </section>
            )}

            {/* Problem statement */}
            {project.problem_statement && (
              <section style={{ marginBottom: 48 }}>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 16 }}>The Problem</h2>
                <p style={{ color: '#A8AFC1', lineHeight: 1.8 }}>{project.problem_statement}</p>
              </section>
            )}

            {/* Motivation */}
            {project.motivation && (
              <section style={{ marginBottom: 48 }}>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 16 }}>Motivation</h2>
                <p style={{ color: '#A8AFC1', lineHeight: 1.8 }}>{project.motivation}</p>
              </section>
            )}

            {/* Approach */}
            {project.approach && (
              <section style={{ marginBottom: 48 }}>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 16 }}>Approach</h2>
                <p style={{ color: '#A8AFC1', lineHeight: 1.8 }}>{project.approach}</p>
              </section>
            )}

            {/* Features */}
            {project.features_implemented?.length > 0 && (
              <section style={{ marginBottom: 48 }}>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 16 }}>Features</h2>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {project.features_implemented.map((f, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: '#A8AFC1', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      <span style={{ width: 6, height: 6, background: '#4169E1', borderRadius: '50%', marginTop: 8, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Gallery */}
            {project.project_images && project.project_images.length > 0 && (
              <section style={{ marginBottom: 48 }}>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 20 }}>Gallery</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                  {project.project_images.map((img) => (
                    <div key={img.id} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(237,234,245,0.08)' }}>
                      <img src={img.image_url} alt={img.caption || project.title} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
                      {img.caption && <p style={{ padding: '8px 12px', fontSize: '0.75rem', color: '#A8AFC1', background: '#171D2A' }}>{img.caption}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Limitations */}
            {project.limitations && (
              <section style={{ marginBottom: 48 }}>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 16 }}>Current Limitations</h2>
                <p style={{ color: '#A8AFC1', lineHeight: 1.8 }}>{project.limitations}</p>
              </section>
            )}

            {/* Future scope */}
            {project.future_scope && (
              <section style={{ marginBottom: 48 }}>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 16 }}>Future Scope</h2>
                <p style={{ color: '#A8AFC1', lineHeight: 1.8 }}>{project.future_scope}</p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 100 }}>
            {/* Links */}
            <div className="card card-body" style={{ marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" style={{ justifyContent: 'center' }}>
                    <Github size={15} /> GitHub Repository
                  </a>
                )}
                {project.live_demo_url && (
                  <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ justifyContent: 'center' }}>
                    <ExternalLink size={15} /> Live Demo
                  </a>
                )}
                {!project.github_url && !project.live_demo_url && (
                  <p style={{ color: '#A8AFC1', fontSize: '0.8rem' }}>No external links available.</p>
                )}
              </div>
            </div>

            {/* Technologies */}
            {project.technologies?.length > 0 && (
              <div className="card card-body" style={{ marginBottom: 20 }}>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Technologies</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {project.technologies.map(t => (
                    <span key={t} className="badge badge-muted" style={{ fontSize: '0.78rem' }}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Status */}
            <div className="card card-body">
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Status</h3>
              <span className="badge badge-accent">{project.current_status}</span>
            </div>
          </div>
        </div>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <section style={{ marginTop: 80 }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.6rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 32 }}>Related Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {relatedProjects.map(p => (
                <Link key={p.id} to={`/projects/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="card card-body">
                    <span className="badge badge-muted" style={{ fontSize: '0.7rem', marginBottom: 10, display: 'inline-block' }}>{p.category}</span>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ color: '#A8AFC1', fontSize: '0.825rem', lineHeight: 1.6 }}>{p.short_description?.substring(0, 100)}...</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
