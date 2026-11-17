import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ExternalLink, Filter } from 'lucide-react'
import { Github } from '../../components/icons/BrandIcons'
import { publicApi } from '../../lib/api'
import type { Project } from '../../lib/supabase'

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    publicApi.getPublishedProjects().then(data => {
      setProjects(data)
      setLoading(false)
    })
  }, [])

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean) as string[]))]
  const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory)

  return (
    <div style={{ padding: '80px 24px 100px', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="section-header"
        style={{ marginBottom: 48 }}
      >
        <span className="section-label">Portfolio</span>
        <h1 className="section-title">Projects</h1>
        <p className="section-subtitle">Every project is a chapter in my learning journey — an experiment, a problem, a creative exploration.</p>
      </motion.div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 48, justifyContent: 'center' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: 100,
              border: `1px solid ${activeCategory === cat ? 'rgba(65,105,225,0.5)' : 'rgba(237,234,245,0.12)'}`,
              background: activeCategory === cat ? 'rgba(65,105,225,0.12)' : 'transparent',
              color: activeCategory === cat ? '#5B82FF' : '#A8AFC1',
              cursor: 'pointer',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 28
          }}>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card"
              >
                <div style={{
                  height: 200,
                  background: project.cover_image_url
                    ? `url(${project.cover_image_url}) center/cover`
                    : `linear-gradient(135deg, rgba(65,105,225,0.18) 0%, rgba(104,74,158,0.12) 100%)`,
                  position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {!project.cover_image_url && (
                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: 'rgba(65,105,225,0.35)', letterSpacing: '-0.03em' }}>
                      {project.title.charAt(0)}
                    </span>
                  )}
                  <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                    <span className="badge badge-muted" style={{ fontSize: '0.7rem' }}>{project.current_status}</span>
                  </div>
                </div>

                <div className="card-body">
                  {project.category && <span className="badge badge-accent" style={{ marginBottom: 10, display: 'inline-block', fontSize: '0.7rem' }}>{project.category}</span>}
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.15rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 8 }}>
                    {project.title}
                  </h3>
                  <p style={{ color: '#A8AFC1', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: 18, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {project.short_description}
                  </p>
                  {project.technologies?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                      {project.technologies.slice(0, 4).map(t => <span key={t} className="badge badge-muted" style={{ fontSize: '0.68rem' }}>{t}</span>)}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Link
                      to={`/projects/${project.slug}`}
                      style={{ color: '#4169E1', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                      View Project <ArrowRight size={14} />
                    </Link>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
                      {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" style={{ color: '#A8AFC1', textDecoration: 'none', display: 'flex', alignItems: 'center' }} title="GitHub"><Github size={16} /></a>}
                      {project.live_demo_url && <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" style={{ color: '#A8AFC1', textDecoration: 'none', display: 'flex', alignItems: 'center' }} title="Live Demo"><ExternalLink size={16} /></a>}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 80, color: '#A8AFC1', fontFamily: 'Space Grotesk, sans-serif' }}>
          No projects in this category yet.
        </div>
      )}
    </div>
  )
}
