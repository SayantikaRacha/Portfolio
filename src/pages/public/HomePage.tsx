import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Download,
  Info,
  ChevronRight,
  Award,
  ExternalLink,
  Code2,
  Sparkles,
  Briefcase,
  Star,
  CheckCircle,
  Mail,
  MapPin,
  GraduationCap,
  X,
  Send,
  Flame,
  Layers,
  Terminal,
  Cpu,
  Database,
  Compass,
} from 'lucide-react'
import { Github, Linkedin } from '../../components/icons/BrandIcons'
import { publicApi, defaultProjects } from '../../lib/api'
import type { Project, Skill, Profile, Certificate, Achievement, Experience, Education } from '../../lib/supabase'

interface Props {
  selectedProfile: string
  onReplayIntro?: () => void
}

export function HomePage({ selectedProfile, onReplayIntro }: Props) {
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<{ category: any; skills: Skill[] }[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [contactStatus, setContactStatus] = useState<string | null>(null)
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' })

  useEffect(() => {
    Promise.all([
      publicApi.getPublishedProjects(),
      publicApi.getSkills(),
      publicApi.getProfile(),
      publicApi.getCertificates(),
      publicApi.getAchievements(),
      publicApi.getExperiences(),
      publicApi.getEducation(),
      publicApi.getSiteSettings(),
    ]).then(([proj, sk, prof, certs, achs, exps, edu, sets]) => {
      setProjects(proj.length > 0 ? proj : defaultProjects)
      setSkills(sk)
      setProfile(prof)
      setCertificates(certs)
      setAchievements(achs)
      setExperiences(exps)
      setEducation(edu)
      setSettings(sets)
    })
  }, [])

  const resumeUrl = settings['resume_url'] || './Sayantika_Resume.pdf'

  // Dynamic profile bio based on active profile view
  const profileDetails: Record<
    string,
    { title: string; subtitle: string; synopsis: string; badge: string; color: string }
  > = {
    explore: {
      title: 'SAYANTIKA',
      subtitle: 'THE SERIES',
      synopsis:
        'Follow the journey of a First-Year Computer Science Engineering student at Amrita Vishwa Vidyapeetham, bridging foundational algorithms, artificial intelligence prototypes, and human-centric design. Driven by curiosity, engineering discipline, and a passion for building scalable software.',
      badge: '#1 IN TECH & AI TODAY',
      color: '#E50914',
    },
    recruiter: {
      title: 'SAYANTIKA',
      subtitle: 'RECRUITER CUT',
      synopsis:
        'B.Tech CSE Core undergraduate with proven problem-solving, team leadership at GENESIS\'26 Ideathon, rigorous coursework in C & Python, and self-directed full-stack projects. Actively seeking Summer 2025/2026 software engineering and developer internships.',
      badge: 'TOP RECRUITER MATCH',
      color: '#0284C7',
    },
    developer: {
      title: 'SAYANTIKA',
      subtitle: 'DEV LOGS',
      synopsis:
        'Deep dive into code architecture, algorithmic problem solving, modern TypeScript/React applications, and full-stack PostgreSQL/Supabase systems. Explore the repositories, CLI tools, and production deployments.',
      badge: 'SYSTEMS & CODE EDITION',
      color: '#059669',
    },
    creative: {
      title: 'SAYANTIKA',
      subtitle: 'CREATIVE ARC',
      synopsis:
        'A unique synthesis of 7+ years self-taught visual storytelling, editorial design, and modern front-end web engineering. Creator of Lumière, an aesthetic digital platform combining visual craft with deployed software.',
      badge: 'CREATIVE TECH FOCUS',
      color: '#D97706',
    },
  }

  const currentView = profileDetails[selectedProfile] || profileDetails.explore

  // Filter projects by category
  const projectCategories = ['All', 'AI & Machine Learning', 'Full-Stack', 'Creative Web', 'Python & Tools']
  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'All') return true
    const cat = (p.category || '').toLowerCase()
    if (activeCategory === 'AI & Machine Learning')
      return cat.includes('ai') || p.technologies.some((t) => t.toLowerCase().includes('ai'))
    if (activeCategory === 'Full-Stack')
      return cat.includes('full') || p.technologies.some((t) => t.toLowerCase().includes('react') || t.toLowerCase().includes('typescript'))
    if (activeCategory === 'Creative Web')
      return cat.includes('creative') || p.title.toLowerCase().includes('lumi')
    if (activeCategory === 'Python & Tools')
      return p.technologies.some((t) => t.toLowerCase().includes('python')) || p.title.toLowerCase().includes('python')
    return true
  })

  // Top 10 Picks List
  const topPicks = [
    {
      num: 1,
      title: 'Python & Algorithmic Foundations',
      category: 'Core Computer Science',
      desc: 'Object-oriented programming, data structures, recursion, file systems, and competitive problem solving.',
      tags: ['Python 3', 'OOP', 'Algorithms'],
      icon: Terminal,
    },
    {
      num: 2,
      title: 'Artificial Intelligence & LLMs',
      category: 'AI & Prompt Architecture',
      desc: 'Generative model workflows, structured chain reasoning, system instructions, and educational interception models.',
      tags: ['Generative AI', 'Prompt Eng', 'CogniGuard'],
      icon: Cpu,
    },
    {
      num: 3,
      title: 'Modern Full-Stack Development',
      category: 'Software Engineering',
      desc: 'Responsive web apps, TypeScript architecture, component systems, and state management.',
      tags: ['React', 'TypeScript', 'Vite'],
      icon: Code2,
    },
    {
      num: 4,
      title: 'Database Architecture & Supabase',
      category: 'Cloud & Data Systems',
      desc: 'PostgreSQL schema modeling, Row Level Security (RLS) policies, authentication flows, and real-time APIs.',
      tags: ['PostgreSQL', 'Supabase', 'RLS'],
      icon: Database,
    },
    {
      num: 5,
      title: 'Creative Technology & Visual Craft',
      category: 'Design & Aesthetics',
      desc: '7+ years self-taught visual storytelling, pacing, editorial typography, Canva, and CapCut motion design.',
      tags: ['Video Editing', 'Figma', 'Aesthetics'],
      icon: Sparkles,
    },
    {
      num: 6,
      title: 'Ideation & Team Leadership',
      category: 'Hackathons & Collaboration',
      desc: 'Team Leader at GENESIS\'26 Amrita Ideathon (Team of 4), leading concept definition and rapid prototyping.',
      tags: ['Leadership', 'Ideathons', 'Git Collaboration'],
      icon: Award,
    },
  ]

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setContactStatus('Message dispatched successfully! Sayantika will reply shortly.')
    setContactForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setContactStatus(null), 6000)
  }

  return (
    <div style={{ background: '#080A10', color: '#EDEAF5', overflowX: 'hidden' }}>
      {/* ============================================================
          SECTION 1: HERO — THE SHOW BANNER (frame_006_6s.png & frame_020_20s.png)
          ============================================================ */}
      <section
        id="home"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          paddingTop: 100,
          paddingBottom: 60,
          background:
            'radial-gradient(circle at 75% 40%, rgba(65, 105, 225, 0.16) 0%, transparent 55%), radial-gradient(circle at 25% 70%, rgba(229, 9, 20, 0.12) 0%, transparent 60%), #080A10',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1360,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
            gap: 40,
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          <style>{`
            @media (max-width: 960px) {
              .hero-grid {
                grid-template-columns: 1fr !important;
                text-align: center;
              }
              .hero-left {
                align-items: center !important;
                display: flex !important;
                flex-direction: column !important;
              }
              .hero-meta-row {
                justify-content: center !important;
              }
              .hero-actions-row {
                justify-content: center !important;
              }
            }
          `}</style>

          {/* Left Column: Netflix Show Details */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ zIndex: 10 }}
          >
            {/* Top Badge: A SAYANTIKA ORIGINAL */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 25,
                  background: 'linear-gradient(135deg, #E50914 0%, #B81D24 100%)',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-cinema)',
                  transform: 'skewX(-4deg)',
                }}
              >
                S
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  color: 'rgba(237, 234, 245, 0.85)',
                  textTransform: 'uppercase',
                }}
              >
                A SAYANTIKA ORIGINAL
              </span>
            </div>

            {/* Main Giant Title: SAYANTIKA */}
            <h1
              style={{
                fontFamily: 'var(--font-cinema)',
                fontSize: 'clamp(4.2rem, 9.5vw, 8.2rem)',
                lineHeight: 0.9,
                fontWeight: 900,
                letterSpacing: '0.04em',
                margin: '0 0 8px 0',
                color: '#EDEAF5',
                textShadow: '0 4px 30px rgba(0, 0, 0, 0.8)',
              }}
            >
              {currentView.title}
            </h1>

            {/* Subtitle: THE SERIES */}
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1rem, 2.2vw, 1.6rem)',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: currentView.color,
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              {currentView.subtitle}
            </div>

            {/* Metadata Tags Row */}
            <div
              className="hero-meta-row"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 12,
                marginBottom: 24,
                fontSize: '0.82rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
              }}
            >
              {/* TOP 10 Badge */}
              <div
                style={{
                  background: '#E50914',
                  color: '#FFF',
                  padding: '3px 8px',
                  borderRadius: 4,
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                }}
              >
                TOP 10
              </div>

              {/* 99% Match */}
              <span style={{ color: '#46D369', fontWeight: 700 }}>99% Match</span>

              {/* Year */}
              <span style={{ color: '#A8AFC1' }}>2024–2028</span>

              {/* Branch Pill */}
              <span
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(237, 234, 245, 0.15)',
                  padding: '2px 8px',
                  borderRadius: 4,
                  color: '#EDEAF5',
                }}
              >
                B.Tech CSE Core
              </span>

              {/* Amrita Pill */}
              <span
                style={{
                  background: 'rgba(65, 105, 225, 0.15)',
                  border: '1px solid rgba(65, 105, 225, 0.3)',
                  padding: '2px 8px',
                  borderRadius: 4,
                  color: '#5B82FF',
                }}
              >
                Amrita Coimbatore
              </span>

              {/* Ultra HD */}
              <span
                style={{
                  border: '1px solid rgba(237, 234, 245, 0.25)',
                  padding: '1px 6px',
                  borderRadius: 3,
                  fontSize: '0.7rem',
                  color: '#A8AFC1',
                }}
              >
                4K Ultra HD
              </span>

              {/* 5.1 Audio */}
              <span
                style={{
                  border: '1px solid rgba(237, 234, 245, 0.25)',
                  padding: '1px 6px',
                  borderRadius: 3,
                  fontSize: '0.7rem',
                  color: '#A8AFC1',
                }}
              >
                5.1
              </span>
            </div>

            {/* Role Tagline */}
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#EDEAF5',
                marginBottom: 14,
                letterSpacing: '0.02em',
              }}
            >
              Computer Science Student · Aspiring Developer · Creative Technologist
            </div>

            {/* Synopsis Paragraph */}
            <p
              style={{
                fontSize: 'clamp(0.92rem, 1.3vw, 1.05rem)',
                color: '#A8AFC1',
                lineHeight: 1.7,
                maxWidth: 620,
                marginBottom: 32,
              }}
            >
              {currentView.synopsis}
            </p>

            {/* Action Buttons Row */}
            <div
              className="hero-actions-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                flexWrap: 'wrap',
              }}
            >
              {/* Play Button (White solid pill) */}
              <button
                onClick={() => {
                  if (onReplayIntro) onReplayIntro()
                  else {
                    const el = document.getElementById('originals')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#FFFFFF',
                  color: '#080A10',
                  padding: '14px 28px',
                  borderRadius: 100,
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 6px 25px rgba(255, 255, 255, 0.25)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.04)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 6px 25px rgba(255, 255, 255, 0.25)'
                }}
              >
                <Play size={18} fill="#080A10" />
                Play Intro
              </button>

              {/* View Resume Button (Glass pill) */}
              <a
                href={resumeUrl}
                download="Sayantika_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(237, 234, 245, 0.25)',
                  color: '#EDEAF5',
                  padding: '14px 26px',
                  borderRadius: 100,
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)'
                  e.currentTarget.style.transform = 'scale(1.04)'
                  e.currentTarget.style.borderColor = '#4169E1'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.borderColor = 'rgba(237, 234, 245, 0.25)'
                }}
              >
                <Download size={18} />
                View Resume
              </a>

              {/* More Info Circle Button */}
              <button
                onClick={() => setInfoModalOpen(true)}
                title="Series Synopsis & Academic Background"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(237, 234, 245, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EDEAF5',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)'
                  e.currentTarget.style.transform = 'scale(1.08)'
                  e.currentTarget.style.borderColor = '#5B82FF'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.borderColor = 'rgba(237, 234, 245, 0.2)'
                }}
              >
                <Info size={22} />
              </button>
            </div>
          </motion.div>

          {/* Right Column: High Production Portrait with Atmospheric Radial Halo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 0',
            }}
          >
            {/* Cinematic Halo Glow behind Portrait */}
            <div
              className="cinematic-glow"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '115%',
                height: '115%',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(229, 9, 20, 0.35) 0%, rgba(65, 105, 225, 0.28) 45%, transparent 75%)',
                pointerEvents: 'none',
                filter: 'blur(45px)',
                zIndex: 1,
              }}
            />

            {/* Portrait Frame Container */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                maxWidth: 440,
                aspectRatio: '3 / 4',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow:
                  '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(65, 105, 225, 0.25)',
                border: '1px solid rgba(237, 234, 245, 0.15)',
              }}
            >
              <img
                src="./sayantika.jpg"
                alt="Sayantika Portrait"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  transition: 'transform 0.5s ease',
                }}
              />

              {/* Gradient Vignette over portrait */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, transparent 40%, rgba(8,10,16,0.3) 70%, rgba(8,10,16,0.95) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Bottom Caption Overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 20,
                  left: 20,
                  right: 20,
                  zIndex: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: '#EDEAF5',
                    }}
                  >
                    Sayantika
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: '#46D369',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                    }}
                  >
                    ● Available for Internships
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(229, 9, 20, 0.85)',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-cinema)',
                    letterSpacing: '0.08em',
                  }}
                >
                  SEASON 1
                </div>
              </div>
            </div>

            {/* Floating Glassmorphic Badges */}
            {/* Badge 1: Top Right */}
            <div
              className="float-badge-1"
              style={{
                position: 'absolute',
                top: '6%',
                right: '-6%',
                zIndex: 10,
                background: 'rgba(13, 17, 26, 0.85)',
                border: '1px solid rgba(65, 105, 225, 0.35)',
                borderRadius: 100,
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
                backdropFilter: 'blur(12px)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                color: '#EDEAF5',
                whiteSpace: 'nowrap',
              }}
            >
              <GraduationCap size={16} color="#5B82FF" />
              B.Tech CSE Core · Amrita
            </div>

            {/* Badge 2: Bottom Left */}
            <div
              className="float-badge-2"
              style={{
                position: 'absolute',
                bottom: '12%',
                left: '-8%',
                zIndex: 10,
                background: 'rgba(13, 17, 26, 0.85)',
                border: '1px solid rgba(229, 9, 20, 0.35)',
                borderRadius: 100,
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
                backdropFilter: 'blur(12px)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                color: '#EDEAF5',
                whiteSpace: 'nowrap',
              }}
            >
              <Flame size={16} color="#E50914" />
              Ideathon Finalist & Lead
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: CONTINUE EXPLORING (EPISODE CARDS ROW) (frame_008_8s.png)
          ============================================================ */}
      <section
        style={{
          padding: '60px 0 80px',
          background: 'linear-gradient(180deg, #080A10 0%, #0D111A 100%)',
          borderTop: '1px solid rgba(237, 234, 245, 0.05)',
        }}
      >
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
          {/* Row Header */}
          <div style={{ marginBottom: 28, display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: '#EDEAF5',
                margin: 0,
              }}
            >
              Continue Exploring
            </h2>
            <span style={{ color: '#64748B', fontSize: '0.9rem', fontWeight: 500 }}>
              Episodes & Core Chapters
            </span>
          </div>

          {/* Episode Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {[
              {
                ep: 'EPISODE 01',
                title: 'THE ORIGINALS',
                desc: 'Production software systems, AI edtech layers & creative platforms.',
                duration: '45m',
                progress: 88,
                targetId: 'originals',
                tag: 'Featured Works',
                gradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
              },
              {
                ep: 'EPISODE 02',
                title: 'ABOUT SAYANTIKA',
                desc: 'Curiosity, academic foundation in CSE Core at Amrita, and development journey.',
                duration: '32m',
                progress: 65,
                targetId: 'about',
                tag: 'Biography',
                gradient: 'linear-gradient(135deg, #064E3B 0%, #047857 100%)',
              },
              {
                ep: 'EPISODE 03',
                title: 'TECH STACK MATRIX',
                desc: 'Python, C, TypeScript, React, PostgreSQL, AI Prompt Engineering & Media editing.',
                duration: '28m',
                progress: 92,
                targetId: 'skills',
                tag: 'Competencies',
                gradient: 'linear-gradient(135deg, #701A75 0%, #4C1D95 100%)',
              },
              {
                ep: 'EPISODE 04',
                title: 'TOP MOMENTS',
                desc: 'GENESIS\'26 Ideathon leadership, copywriting internship, and credentials.',
                duration: '38m',
                progress: 50,
                targetId: 'moments',
                tag: 'Honors & Awards',
                gradient: 'linear-gradient(135deg, #78350F 0%, #92400E 100%)',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="cinematic-card"
                onClick={() => {
                  const el = document.getElementById(item.targetId)
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                style={{
                  background: '#141923',
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: '1px solid rgba(237, 234, 245, 0.1)',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Simulated Thumbnail Header */}
                <div
                  style={{
                    height: 140,
                    background: item.gradient,
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        background: 'rgba(0, 0, 0, 0.6)',
                        padding: '3px 8px',
                        borderRadius: 4,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#EDEAF5',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {item.ep}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'rgba(237, 234, 245, 0.75)',
                        fontWeight: 600,
                      }}
                    >
                      {item.duration}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                      }}
                    >
                      <Play size={14} fill="#080A10" color="#080A10" />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-cinema)',
                        fontSize: '1.25rem',
                        letterSpacing: '0.05em',
                        color: '#FFF',
                      }}
                    >
                      {item.title}
                    </span>
                  </div>

                  {/* Red Netflix-style Progress Bar */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: 'rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <div
                      className="netflix-progress-fill"
                      style={{
                        width: `${item.progress}%`,
                        height: '100%',
                      }}
                    />
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '0.86rem', color: '#A8AFC1', margin: '0 0 14px 0', lineHeight: 1.55 }}>
                    {item.desc}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                    <span style={{ color: '#4169E1', fontWeight: 600 }}>{item.tag}</span>
                    <span style={{ color: '#EDEAF5', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                      Resume Episode <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: TOP MOMENTS & AWARDS (frame_010_10s.png)
          ============================================================ */}
      <section
        id="moments"
        style={{
          padding: '90px 0',
          background: '#080A10',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
          {/* Header with Golden Laurel Wreath */}
          <div style={{ textAlign: 'center', marginBottom: 54 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: '#FBBF24',
                marginBottom: 8,
              }}
            >
              <Award size={24} className="laurel-gold" />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                CRITICAL ACCLAIM & MILESTONES
              </span>
              <Award size={24} className="laurel-gold" />
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-cinema)',
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                letterSpacing: '0.04em',
                color: '#EDEAF5',
                margin: '0 0 10px 0',
              }}
            >
              TOP MOMENTS
            </h2>
            <p style={{ color: '#8892B0', fontSize: '1rem', maxWidth: 600, margin: '0 auto' }}>
              Recognitions, leadership roles, and academic achievements during my computer science journey.
            </p>
          </div>

          {/* Golden Laurel Wreath Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
              marginBottom: 50,
            }}
          >
            {/* Moment 1 */}
            <div
              className="cinematic-card"
              style={{
                background: 'linear-gradient(135deg, rgba(23, 29, 42, 0.8) 0%, rgba(13, 17, 26, 0.95) 100%)',
                border: '1px solid rgba(251, 191, 36, 0.25)',
                borderRadius: 16,
                padding: 28,
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'rgba(251, 191, 36, 0.12)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FBBF24',
                    flexShrink: 0,
                  }}
                >
                  <Award size={24} />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: '#FBBF24',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    TEAM LEADER · 4-MEMBER TEAM
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#EDEAF5',
                      margin: '4px 0',
                    }}
                  >
                    GENESIS'26 — Amrita Ideathon
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    Amrita Vishwa Vidyapeetham · Oct 2026
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#A8AFC1', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                Led a 4-person team in conceptualizing, designing, and building the concept prototype for{' '}
                <strong style={{ color: '#EDEAF5' }}>CogniGuard</strong> under the competitive theme{' '}
                <em>"Where Ideas Become Impact"</em>. Developed the guided-learning architecture to combat
                excessive AI delegation.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Leadership', 'Rapid Prototyping', 'EdTech Concept', 'Pitch Presentation'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: 'rgba(251, 191, 36, 0.08)',
                      border: '1px solid rgba(251, 191, 36, 0.2)',
                      color: '#FBBF24',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: '0.72rem',
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Moment 2 */}
            <div
              className="cinematic-card"
              style={{
                background: 'linear-gradient(135deg, rgba(23, 29, 42, 0.8) 0%, rgba(13, 17, 26, 0.95) 100%)',
                border: '1px solid rgba(65, 105, 225, 0.25)',
                borderRadius: 16,
                padding: 28,
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'rgba(65, 105, 225, 0.12)',
                    border: '1px solid rgba(65, 105, 225, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#5B82FF',
                    flexShrink: 0,
                  }}
                >
                  <Briefcase size={24} />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: '#5B82FF',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    PROFESSIONAL EXPERIENCE
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#EDEAF5',
                      margin: '4px 0',
                    }}
                  >
                    Copywriting Intern
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    In-Amigos Foundation
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#A8AFC1', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                Completed an editorial copywriting internship, producing high-impact written materials,
                refining narrative tone, and aligning outreach communications with organizational mission
                objectives.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Written Communication', 'Narrative Design', 'Audience Engagement', 'Editorial Rigor'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: 'rgba(65, 105, 225, 0.08)',
                      border: '1px solid rgba(65, 105, 225, 0.2)',
                      color: '#5B82FF',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: '0.72rem',
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Moment 3 */}
            <div
              className="cinematic-card"
              style={{
                background: 'linear-gradient(135deg, rgba(23, 29, 42, 0.8) 0%, rgba(13, 17, 26, 0.95) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: 16,
                padding: 28,
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#34D399',
                    flexShrink: 0,
                  }}
                >
                  <GraduationCap size={24} />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: '#34D399',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    ACADEMIC FOUNDATION
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#EDEAF5',
                      margin: '4px 0',
                    }}
                  >
                    B.Tech CSE Core Admissions
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    Amrita Vishwa Vidyapeetham, Coimbatore
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#A8AFC1', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                Enrolled in the flagship Computer Science & Engineering Core undergraduate program at
                Amrita Coimbatore. Currently navigating Semester 1 coursework in structured programming,
                discrete mathematics, and algorithmic problem solving.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['CSE Core', 'Problem Solving', 'Data Structures', 'C Programming'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      color: '#34D399',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: '0.72rem',
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sub-row: Certified • Credentials (frame_010_10s.png) */}
          <div style={{ marginTop: 60 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                  fontWeight: 700,
                  color: '#EDEAF5',
                  margin: 0,
                }}
              >
                Certified • Credentials
              </h3>
              <span style={{ color: '#64748B', fontSize: '0.85rem' }}>
                Verified technical badges & certificates
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 16,
              }}
            >
              {[
                {
                  title: 'Python for Beginners & Data Structures',
                  issuer: 'Online Learning Platform',
                  year: '2024',
                  credentialId: 'VERIFIED-PY-01',
                  tags: ['Python', 'Control Flow', 'Functions'],
                },
                {
                  title: 'Generative AI & Prompt Engineering Fundamentals',
                  issuer: 'DeepLearning.AI / Coursera',
                  year: '2024',
                  credentialId: 'VERIFIED-AI-02',
                  tags: ['Prompt Design', 'LLMs', 'System Prompts'],
                },
                {
                  title: 'Problem Solving (Basic & Intermediate)',
                  issuer: 'HackerRank Verified',
                  year: '2024',
                  credentialId: 'VERIFIED-HR-03',
                  tags: ['Algorithms', 'Logic', 'Time Complexity'],
                },
                {
                  title: 'Amrita Academic Excellence in Computing',
                  issuer: 'Amrita Vishwa Vidyapeetham',
                  year: '2024',
                  credentialId: 'AMRITA-CSE-2024',
                  tags: ['Academic Rigor', 'CSE Core', 'Lab Prototyping'],
                },
              ].map((cert, idx) => (
                <div
                  key={idx}
                  className="cinematic-card"
                  style={{
                    background: '#141923',
                    border: '1px solid rgba(237, 234, 245, 0.08)',
                    borderRadius: 12,
                    padding: 18,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ color: '#4169E1', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em' }}>
                        {cert.issuer}
                      </span>
                      <span style={{ color: '#64748B', fontSize: '0.72rem' }}>{cert.year}</span>
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#EDEAF5', marginBottom: 12 }}>
                      {cert.title}
                    </h4>
                  </div>

                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                      {cert.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(237, 234, 245, 0.1)',
                            borderRadius: 4,
                            padding: '1px 6px',
                            fontSize: '0.7rem',
                            color: '#A8AFC1',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#46D369', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CheckCircle size={12} /> Verified Credential
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: THE ORIGINALS — PROJECT MOVIE POSTERS (frame_014_14s.png)
          ============================================================ */}
      <section
        id="originals"
        style={{
          padding: '90px 0',
          background: 'linear-gradient(180deg, #080A10 0%, #0E131E 50%, #080A10 100%)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: 20,
              marginBottom: 36,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div
                  style={{
                    width: 24,
                    height: 28,
                    background: '#E50914',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF',
                    fontWeight: 900,
                    fontFamily: 'var(--font-cinema)',
                    fontSize: '1.1rem',
                  }}
                >
                  S
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#E50914',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  ORIGINALS
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-cinema)',
                  fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                  letterSpacing: '0.04em',
                  color: '#EDEAF5',
                  margin: 0,
                }}
              >
                FEATURED PRODUCTIONS
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 100,
                    background: activeCategory === cat ? '#E50914' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${
                      activeCategory === cat ? '#E50914' : 'rgba(237, 234, 245, 0.12)'
                    }`,
                    color: activeCategory === cat ? '#FFFFFF' : '#A8AFC1',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-heading)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.color = '#EDEAF5'
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.color = '#A8AFC1'
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cinematic Project Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: 26,
            }}
          >
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="cinematic-card"
                style={{
                  background: '#141923',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid rgba(237, 234, 245, 0.12)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                {/* Poster Thumbnail Area */}
                <div
                  style={{
                    height: 200,
                    position: 'relative',
                    background:
                      proj.title.includes('Lumi')
                        ? 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 50%, #6366F1 100%)'
                        : proj.title.includes('Cogni')
                        ? 'linear-gradient(135deg, #14532D 0%, #15803D 50%, #22C55E 100%)'
                        : proj.title.includes('Orbit')
                        ? 'linear-gradient(135deg, #581C87 0%, #7E22CE 50%, #A855F7 100%)'
                        : 'linear-gradient(135deg, #7C2D12 0%, #C2410C 50%, #EA580C 100%)',
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Top Badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        background: '#E50914',
                        color: '#FFF',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: 4,
                        letterSpacing: '0.08em',
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      ORIGINAL
                    </span>

                    {proj.is_featured && (
                      <span
                        style={{
                          background: 'rgba(0, 0, 0, 0.6)',
                          backdropFilter: 'blur(8px)',
                          color: '#FBBF24',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <Star size={12} fill="#FBBF24" /> FEATURED
                      </span>
                    )}
                  </div>

                  {/* Poster Title Big Overlay */}
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-cinema)',
                        fontSize: '2.2rem',
                        letterSpacing: '0.04em',
                        color: '#FFFFFF',
                        margin: 0,
                        textShadow: '0 2px 16px rgba(0,0,0,0.8)',
                      }}
                    >
                      {proj.title}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                      {proj.category}
                    </div>
                  </div>

                  {/* Bottom Vignette */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 40,
                      background: 'linear-gradient(180deg, transparent 0%, #141923 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Card Content */}
                <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: '#A8AFC1',
                        lineHeight: 1.6,
                        margin: '0 0 16px 0',
                      }}
                    >
                      {proj.short_description}
                    </p>

                    {/* Tech Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                      {proj.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          style={{
                            background: 'rgba(65, 105, 225, 0.1)',
                            border: '1px solid rgba(65, 105, 225, 0.25)',
                            color: '#5B82FF',
                            padding: '3px 8px',
                            borderRadius: 6,
                            fontSize: '0.72rem',
                            fontWeight: 600,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 12,
                      borderTop: '1px solid rgba(237, 234, 245, 0.08)',
                    }}
                  >
                    <button
                      onClick={() => setSelectedProject(proj)}
                      style={{
                        background: '#FFFFFF',
                        color: '#080A10',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: 100,
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <Play size={13} fill="#080A10" /> Details
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {proj.github_url && (
                        <a
                          href={proj.github_url}
                          target="_blank"
                          rel="noreferrer"
                          title="View GitHub Repository"
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(237, 234, 245, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#EDEAF5',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#4169E1')}
                          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(237, 234, 245, 0.15)')}
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {proj.live_demo_url && (
                        <a
                          href={proj.live_demo_url}
                          target="_blank"
                          rel="noreferrer"
                          title="View Live Demo"
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            background: 'rgba(65, 105, 225, 0.2)',
                            border: '1px solid #4169E1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#5B82FF',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = '#4169E1')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(65, 105, 225, 0.2)')}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: SAYANTIKA'S TOP PICKS (NETFLIX TOP 10) (frame_018_18s.png)
          ============================================================ */}
      <section
        id="top-picks"
        style={{
          padding: '90px 0',
          background: '#080A10',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span
                style={{
                  background: '#E50914',
                  color: '#FFF',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: 4,
                  letterSpacing: '0.06em',
                }}
              >
                TOP 10
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: '#8892B0',
                  textTransform: 'uppercase',
                }}
              >
                STREAMING TODAY
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-cinema)',
                fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
                letterSpacing: '0.04em',
                color: '#EDEAF5',
                margin: '0 0 10px 0',
              }}
            >
              SAYANTIKA'S TOP PICKS
            </h2>
            <p style={{ color: '#8892B0', fontSize: '1rem', margin: 0 }}>
              The signature technical disciplines, tools, and paradigms powering my work.
            </p>
          </div>

          {/* Top 10 Styled Row with Giant Outlined Numbers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: 28,
            }}
          >
            {topPicks.map((pick) => {
              const IconComp = pick.icon
              return (
                <div
                  key={pick.num}
                  className="netflix-top-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#111622',
                    borderRadius: 16,
                    border: '1px solid rgba(237, 234, 245, 0.1)',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  {/* Giant Netflix Number */}
                  <div
                    style={{
                      width: 110,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span className="netflix-number">{pick.num}</span>
                  </div>

                  {/* Pick Information */}
                  <div style={{ padding: '20px 20px 20px 0', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <IconComp size={15} color="#4169E1" />
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: '#4169E1',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {pick.category}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: '#EDEAF5',
                        margin: '0 0 6px 0',
                      }}
                    >
                      {pick.title}
                    </h3>

                    <p style={{ fontSize: '0.82rem', color: '#8892B0', margin: '0 0 10px 0', lineHeight: 1.5 }}>
                      {pick.desc}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {pick.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '2px 7px',
                            borderRadius: 4,
                            fontSize: '0.7rem',
                            color: '#A8AFC1',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: ABOUT SAYANTIKA — THE ORIGIN STORY
          ============================================================ */}
      <section
        id="about"
        style={{
          padding: '100px 0',
          background: 'linear-gradient(180deg, #080A10 0%, #0E131E 100%)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
              gap: 48,
              alignItems: 'center',
            }}
            className="about-grid"
          >
            <style>{`
              @media (max-width: 860px) {
                .about-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>

            {/* Left: Framed Portrait */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'relative',
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '1px solid rgba(237, 234, 245, 0.15)',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.7)',
                  aspectRatio: '4 / 5',
                }}
              >
                <img
                  src="./sayantika.jpg"
                  alt="Sayantika in Coimbatore"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Stat card on top of image */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -20,
                  right: -10,
                  background: '#171D2A',
                  border: '1px solid rgba(65, 105, 225, 0.35)',
                  borderRadius: 14,
                  padding: '14px 20px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: 'rgba(65, 105, 225, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#5B82FF',
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>CAMPUS LOCATION</div>
                  <div style={{ fontSize: '0.9rem', color: '#EDEAF5', fontWeight: 700 }}>Coimbatore, Tamil Nadu</div>
                </div>
              </div>
            </div>

            {/* Right: Documentary Narrative */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span
                  style={{
                    color: '#E50914',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  EPISODE 02: ORIGIN
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-cinema)',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  letterSpacing: '0.04em',
                  color: '#EDEAF5',
                  margin: '0 0 16px 0',
                }}
              >
                ABOUT SAYANTIKA
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontStyle: 'italic',
                  fontSize: '1.25rem',
                  color: '#5B82FF',
                  marginBottom: 20,
                  lineHeight: 1.5,
                }}
              >
                "I turn curiosity into things I can build."
              </p>

              <p style={{ color: '#A8AFC1', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 16 }}>
                I am an undergraduate Computer Science and Engineering (CSE Core) student at Amrita
                Vishwa Vidyapeetham, Coimbatore. My journey is defined by a synthesis of rigorous
                foundational computer science—structured programming in C, algorithms, and logic
                building—alongside seven years of self-taught visual storytelling and creative design.
              </p>

              <p style={{ color: '#A8AFC1', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 24 }}>
                Whether architecting <strong style={{ color: '#EDEAF5' }}>CogniGuard</strong> to challenge
                excessive AI dependency at the GENESIS'26 Ideathon, or designing the aesthetic invitation
                framework in <strong style={{ color: '#EDEAF5' }}>Lumière</strong>, I believe in building
                software that is computationally sound, beautifully engineered, and human-centric.
              </p>

              {/* Stats Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 16,
                  padding: '20px 0',
                  borderTop: '1px solid rgba(237, 234, 245, 0.08)',
                  borderBottom: '1px solid rgba(237, 234, 245, 0.08)',
                  marginBottom: 28,
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-cinema)', fontSize: '1.8rem', color: '#EDEAF5' }}>
                    SEM 01
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Current Status</div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-cinema)', fontSize: '1.8rem', color: '#E50914' }}>
                    10+
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Projects & Prototypes</div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-cinema)', fontSize: '1.8rem', color: '#46D369' }}>
                    OPEN
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>For Internships</div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a
                  href={resumeUrl}
                  download="Sayantika_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#4169E1',
                    color: '#FFF',
                    padding: '12px 24px',
                    borderRadius: 100,
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <Download size={16} /> Download Full CV
                </a>

                <Link
                  to="/ai-lab"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(237, 234, 245, 0.15)',
                    color: '#EDEAF5',
                    padding: '12px 24px',
                    borderRadius: 100,
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <Sparkles size={16} color="#5B82FF" /> Explore AI Lab
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 7: RESUME / CV BANNER
          ============================================================ */}
      <section
        id="resume"
        style={{
          padding: '80px 0',
          background: '#0B0F17',
          borderTop: '1px solid rgba(237, 234, 245, 0.08)',
          borderBottom: '1px solid rgba(237, 234, 245, 0.08)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(23, 29, 42, 0.9) 0%, rgba(13, 17, 26, 0.95) 100%)',
              border: '1px solid rgba(65, 105, 225, 0.3)',
              borderRadius: 20,
              padding: '40px 36px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 24,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#4169E1',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                OFFICIAL DOCUMENT
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: 700,
                  color: '#EDEAF5',
                  margin: '0 0 8px 0',
                }}
              >
                Curriculum Vitae / Resume
              </h3>
              <p style={{ color: '#8892B0', fontSize: '0.92rem', maxWidth: 520, margin: 0 }}>
                Review academic credentials, technical proficiencies, project milestones, and internship
                history formatted for engineering teams and recruiters.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 14 }}>
              <a
                href={resumeUrl}
                download="Sayantika_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'linear-gradient(135deg, #E50914 0%, #B81D24 100%)',
                  color: '#FFF',
                  padding: '14px 28px',
                  borderRadius: 100,
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(229, 9, 20, 0.4)',
                }}
              >
                <Download size={18} /> Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 8: TO BE CONTINUED... (FINALE & CONTACT) (frame_018_18s.png)
          ============================================================ */}
      <section
        id="contact"
        style={{
          padding: '100px 0 120px',
          background: 'radial-gradient(circle at 50% 30%, rgba(229, 9, 20, 0.12) 0%, transparent 60%), #080A10',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
          {/* Cinematic Callout Box */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: 50,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: '#E50914',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 10,
              }}
            >
              TO BE CONTINUED...
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-cinema)',
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                letterSpacing: '0.04em',
                color: '#EDEAF5',
                lineHeight: 1,
                margin: '0 0 16px 0',
              }}
            >
              NEXT EPISODE: COLLABORATING WITH YOU
            </h2>

            <p
              style={{
                fontSize: '1.05rem',
                color: '#A8AFC1',
                maxWidth: 620,
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Available for software engineering internships, open-source projects, and creative
              collaborations. Let's build something extraordinary together.
            </p>
          </div>

          {/* Contact Interactive Form Card */}
          <div
            style={{
              background: '#141923',
              border: '1px solid rgba(237, 234, 245, 0.12)',
              borderRadius: 20,
              padding: '40px 32px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
            }}
          >
            {contactStatus && (
              <div
                style={{
                  background: 'rgba(70, 211, 105, 0.15)',
                  border: '1px solid #46D369',
                  color: '#46D369',
                  padding: '12px 18px',
                  borderRadius: 8,
                  marginBottom: 24,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <CheckCircle size={18} />
                {contactStatus}
              </div>
            )}

            <form onSubmit={handleContactSubmit}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 20,
                  marginBottom: 20,
                }}
              >
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#A8AFC1',
                      marginBottom: 8,
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Jane Doe"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(8, 10, 16, 0.8)',
                      border: '1px solid rgba(237, 234, 245, 0.15)',
                      borderRadius: 8,
                      color: '#EDEAF5',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#A8AFC1',
                      marginBottom: 8,
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="jane@company.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(8, 10, 16, 0.8)',
                      border: '1px solid rgba(237, 234, 245, 0.15)',
                      borderRadius: 8,
                      color: '#EDEAF5',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#A8AFC1',
                    marginBottom: 8,
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  placeholder="Internship Opportunity / Project Collaboration"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(8, 10, 16, 0.8)',
                    border: '1px solid rgba(237, 234, 245, 0.15)',
                    borderRadius: 8,
                    color: '#EDEAF5',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#A8AFC1',
                    marginBottom: 8,
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Hi Sayantika, I came across your portfolio and would love to discuss..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(8, 10, 16, 0.8)',
                    border: '1px solid rgba(237, 234, 245, 0.15)',
                    borderRadius: 8,
                    color: '#EDEAF5',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <a
                    href="mailto:sayantikadas2024@gmail.com"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      color: '#A8AFC1',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                    }}
                  >
                    <Mail size={16} /> Direct: sayantikadas2024@gmail.com
                  </a>
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #E50914 0%, #B81D24 100%)',
                    color: '#FFFFFF',
                    padding: '12px 30px',
                    borderRadius: 100,
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 18px rgba(229, 9, 20, 0.4)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <Send size={16} /> Dispatch Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ============================================================
          INTERACTIVE CINEMATIC PROJECT DETAIL MODAL
          ============================================================ */}
      <AnimatePresence>
        {selectedProject && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(4, 5, 8, 0.88)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: 720,
                maxHeight: '90vh',
                overflowY: 'auto',
                background: '#111622',
                border: '1px solid rgba(237, 234, 245, 0.15)',
                borderRadius: 20,
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
                position: 'relative',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: 18,
                  right: 18,
                  zIndex: 20,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>

              {/* Modal Banner Header */}
              <div
                style={{
                  height: 200,
                  background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  position: 'relative',
                }}
              >
                <div style={{ zIndex: 2 }}>
                  <span
                    style={{
                      background: '#E50914',
                      color: '#FFF',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: 3,
                      letterSpacing: '0.08em',
                      display: 'inline-block',
                      marginBottom: 6,
                    }}
                  >
                    SAYANTIKA ORIGINAL
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-cinema)',
                      fontSize: '2.5rem',
                      color: '#FFF',
                      margin: 0,
                    }}
                  >
                    {selectedProject.title}
                  </h2>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 30%, #111622 100%)',
                  }}
                />
              </div>

              {/* Modal Body */}
              <div style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ color: '#46D369', fontWeight: 700, fontSize: '0.85rem' }}>98% Match</span>
                  <span style={{ color: '#A8AFC1', fontSize: '0.85rem' }}>{selectedProject.category}</span>
                  <span
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      padding: '2px 6px',
                      borderRadius: 4,
                      fontSize: '0.75rem',
                      color: '#EDEAF5',
                    }}
                  >
                    HD
                  </span>
                </div>

                <p style={{ color: '#EDEAF5', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: 20 }}>
                  {selectedProject.full_description || selectedProject.short_description}
                </p>

                {selectedProject.problem_statement && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
                      Problem Statement
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#A8AFC1', margin: 0 }}>
                      {selectedProject.problem_statement}
                    </p>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
                    Technologies & Architecture
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {selectedProject.technologies.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: 'rgba(65, 105, 225, 0.12)',
                          border: '1px solid rgba(65, 105, 225, 0.3)',
                          color: '#5B82FF',
                          padding: '4px 10px',
                          borderRadius: 6,
                          fontSize: '0.78rem',
                          fontWeight: 600,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div style={{ display: 'flex', gap: 12, borderTop: '1px solid rgba(237, 234, 245, 0.1)', paddingTop: 18 }}>
                  {selectedProject.github_url && (
                    <a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        background: '#FFFFFF',
                        color: '#080A10',
                        padding: '10px 20px',
                        borderRadius: 8,
                        fontWeight: 700,
                        textDecoration: 'none',
                        fontSize: '0.88rem',
                      }}
                    >
                      <Github size={16} /> GitHub Repository
                    </a>
                  )}

                  {selectedProject.live_demo_url && (
                    <a
                      href={selectedProject.live_demo_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        background: '#4169E1',
                        color: '#FFF',
                        padding: '10px 20px',
                        borderRadius: 8,
                        fontWeight: 700,
                        textDecoration: 'none',
                        fontSize: '0.88rem',
                      }}
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================
          INTERACTIVE MORE INFO MODAL (SHOW OVERVIEW)
          ============================================================ */}
      <AnimatePresence>
        {infoModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(4, 5, 8, 0.88)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}
            onClick={() => setInfoModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: 680,
                maxHeight: '90vh',
                overflowY: 'auto',
                background: '#111622',
                border: '1px solid rgba(237, 234, 245, 0.15)',
                borderRadius: 20,
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
                position: 'relative',
                padding: '32px 30px',
              }}
            >
              <button
                onClick={() => setInfoModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div
                  style={{
                    width: 24,
                    height: 28,
                    background: '#E50914',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF',
                    fontWeight: 900,
                    fontFamily: 'var(--font-cinema)',
                    fontSize: '1.1rem',
                  }}
                >
                  S
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#E50914',
                    letterSpacing: '0.2em',
                  }}
                >
                  SERIES SYNOPSIS
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-cinema)',
                  fontSize: '2.4rem',
                  color: '#EDEAF5',
                  margin: '0 0 16px 0',
                }}
              >
                SAYANTIKA: THE SERIES (SEASON 1)
              </h2>

              <p style={{ color: '#A8AFC1', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 20 }}>
                This portfolio represents a digital, dynamic archive of Sayantika's undergraduate computer
                science trajectory at Amrita Vishwa Vidyapeetham, Coimbatore. It documents software
                systems, research experiments, hackathon leadership, and creative ventures.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 16,
                  background: 'rgba(8, 10, 16, 0.6)',
                  padding: 20,
                  borderRadius: 12,
                  marginBottom: 24,
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>STARRING</div>
                  <div style={{ fontSize: '0.9rem', color: '#EDEAF5', fontWeight: 700 }}>Sayantika</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>INSTITUTION</div>
                  <div style={{ fontSize: '0.9rem', color: '#EDEAF5', fontWeight: 700 }}>Amrita Vishwa Vidyapeetham</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>BRANCH</div>
                  <div style={{ fontSize: '0.9rem', color: '#EDEAF5', fontWeight: 700 }}>B.Tech CSE (Core)</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>AVAILABILITY</div>
                  <div style={{ fontSize: '0.9rem', color: '#46D369', fontWeight: 700 }}>Open for Internships</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button
                  onClick={() => setInfoModalOpen(false)}
                  style={{
                    background: '#FFFFFF',
                    color: '#080A10',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: 100,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Close Synopsis
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
