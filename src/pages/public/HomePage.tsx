import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Download, ChevronDown, ExternalLink } from 'lucide-react'
import { Github } from '../../components/icons/BrandIcons'
import { publicApi } from '../../lib/api'
import type { Project, Skill, Profile } from '../../lib/supabase'

interface Props { selectedProfile: string }

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export function HomePage({ selectedProfile }: Props) {
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<{ category: any; skills: Skill[] }[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      publicApi.getFeaturedProjects(),
      publicApi.getSkills(),
      publicApi.getProfile(),
      publicApi.getSiteSettings(),
    ]).then(([proj, sk, prof, sets]) => {
      setProjects(proj)
      setSkills(sk)
      setProfile(prof)
      setSettings(sets)
      setLoading(false)
    })
  }, [])

  const heroIntro = settings['hero_intro'] || 'A Computer Science student exploring software development, artificial intelligence, and the intersection of technology and creativity.'
  const resumeUrl = settings['resume_url'] || ''
  const allSkills = skills.flatMap(g => g.skills).slice(0, 8)

  const proficiencyColor: Record<string, string> = {
    'Advanced': '#4ade80',
    'Intermediate': '#4169E1',
    'Foundational': '#a78bfa',
    'Introductory': '#A8AFC1',
    'Familiar with': '#A8AFC1',
    'Exploring': '#fbbf24',
  }

  return (
    <div>
      {/* ===== HERO ===== */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '30%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(65,105,225,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: 800, width: '100%' }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(65,105,225,0.08)',
              border: '1px solid rgba(65,105,225,0.2)',
              borderRadius: 100,
              padding: '6px 16px',
              marginBottom: 32,
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.8rem',
              color: '#5B82FF',
              letterSpacing: '0.05em'
            }}
          >
            <span style={{ width: 6, height: 6, background: '#4169E1', borderRadius: '50%', display: 'inline-block' }} />
            Computer Science Student · Amrita Vishwa Vidyapeetham
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 700,
              color: '#EDEAF5',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: 20
            }}
          >
            Hi, I'm{' '}
            <span style={{ color: '#4169E1' }}>Sia.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              color: '#A8AFC1',
              marginBottom: 24,
              lineHeight: 1.5
            }}
          >
            I turn curiosity into things I can build.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{
              fontSize: '1.05rem',
              color: '#A8AFC1',
              lineHeight: 1.75,
              maxWidth: 600,
              margin: '0 auto 40px'
            }}
          >
            {heroIntro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/projects" className="btn btn-primary">
              Explore My Work
              <ArrowRight size={16} />
            </Link>
            {resumeUrl ? (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <Download size={16} />
                Get My Resume
              </a>
            ) : (
              <Link to="/about" className="btn btn-outline">
                About Me
                <ArrowRight size={16} />
              </Link>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            color: '#A8AFC1'
          }}
        >
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section style={{ padding: '100px 24px', background: '#080A10' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-label">Portfolio</span>
            <h2 className="section-title">Featured Work</h2>
            <p className="section-subtitle">Projects that reflect my learning journey and creative approach to technology.</p>
          </motion.div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
              <div className="spinner" />
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 24
            }}>
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card"
                  style={{ overflow: 'hidden' }}
                >
                  {/* Cover */}
                  <div style={{
                    height: 200,
                    background: project.cover_image_url
                      ? `url(${project.cover_image_url}) center/cover`
                      : `linear-gradient(135deg, rgba(65,105,225,0.2) 0%, rgba(104,74,158,0.15) 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    {!project.cover_image_url && (
                      <div style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        color: 'rgba(65,105,225,0.4)',
                        letterSpacing: '-0.03em'
                      }}>
                        {project.title.charAt(0)}
                      </div>
                    )}
                    {project.is_featured && (
                      <div style={{
                        position: 'absolute', top: 12, right: 12,
                        background: 'rgba(65,105,225,0.9)',
                        color: 'white',
                        fontSize: '0.65rem',
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        borderRadius: 4
                      }}>
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="card-body">
                    {project.category && (
                      <span className="badge badge-muted" style={{ marginBottom: 10, display: 'inline-block' }}>
                        {project.category}
                      </span>
                    )}
                    <h3 style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: '#EDEAF5',
                      marginBottom: 8,
                      lineHeight: 1.3
                    }}>
                      {project.title}
                    </h3>
                    <p style={{
                      color: '#A8AFC1',
                      fontSize: '0.875rem',
                      lineHeight: 1.65,
                      marginBottom: 20,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {project.short_description}
                    </p>

                    {/* Tech tags */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                        {project.technologies.slice(0, 4).map(tech => (
                          <span key={tech} className="badge badge-muted" style={{ fontSize: '0.7rem' }}>{tech}</span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="badge badge-muted" style={{ fontSize: '0.7rem' }}>+{project.technologies.length - 4}</span>
                        )}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <Link
                        to={`/projects/${project.slug}`}
                        style={{
                          color: '#4169E1',
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          transition: 'gap 0.2s ease'
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = '10px' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = '6px' }}
                      >
                        View Project <ArrowRight size={14} />
                      </Link>
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#A8AFC1', display: 'flex', alignItems: 'center', marginLeft: 'auto', textDecoration: 'none', transition: 'color 0.2s' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EDEAF5' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#A8AFC1' }}
                          title="GitHub Repository"
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && (
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link to="/projects" className="btn btn-outline">
                View All Projects
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ===== SKILLS PREVIEW ===== */}
      <section style={{ padding: '80px 24px', background: '#111622' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <span className="section-label">Capabilities</span>
            <h2 className="section-title">What I Work With</h2>
          </motion.div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {allSkills.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#171D2A',
                  border: '1px solid rgba(237,234,245,0.08)',
                  borderRadius: 100,
                  padding: '8px 20px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.875rem',
                  color: '#EDEAF5',
                  fontWeight: 500
                }}
              >
                <span style={{
                  width: 6, height: 6,
                  background: proficiencyColor[skill.proficiency_label] || '#A8AFC1',
                  borderRadius: '50%'
                }} />
                {skill.name}
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/skills" style={{ color: '#4169E1', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Explore All Skills <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SNIPPET ===== */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">About</span>
            <h2 className="section-title">The Person Behind the Projects</h2>
            <p style={{
              color: '#A8AFC1',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              marginBottom: 36
            }}>
              {profile?.biography
                ? profile.biography.split('\n')[0]
                : "I'm a Computer Science student driven by curiosity, experimentation, and the desire to understand how technology can solve real problems."
              }
            </p>
            <Link to="/about" className="btn btn-outline">
              Learn More <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
