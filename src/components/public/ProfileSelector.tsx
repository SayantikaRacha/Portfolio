import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Sparkles, Briefcase, Volume2 } from 'lucide-react'

interface Props {
  onSelect: (profile: string) => void
}

const profiles = [
  {
    id: 'explore',
    title: 'Sayantika',
    subtitle: 'The full series, in order',
    hasBadge: 'MAIN',
    badgeColor: '#E50914',
    bgGradient: 'linear-gradient(135deg, #1E3A8A 0%, #E50914 100%)',
    type: 'image',
    photo: './sayantika.jpg',
  },
  {
    id: 'recruiter',
    title: 'Recruiter',
    subtitle: 'Resume, achievements & skills first',
    bgGradient: 'linear-gradient(135deg, #0284C7 0%, #06B6D4 100%)',
    type: 'letter',
    letter: 'R',
    icon: Briefcase,
  },
  {
    id: 'developer',
    title: 'Developer',
    subtitle: 'Projects, stack & GitHub first',
    bgGradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    type: 'code',
    icon: Code2,
  },
  {
    id: 'creative',
    title: 'Creative Tech',
    subtitle: 'The creative arc & visual edits first',
    bgGradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
    type: 'sparkle',
    icon: Sparkles,
  },
]

export function ProfileSelector({ onSelect }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9990,
        background: '#080A10',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: 48 }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 600,
            color: '#EDEAF5',
            letterSpacing: '-0.02em',
            margin: '0 0 10px 0',
          }}
        >
          Who's watching?
        </h1>
        <p
          style={{
            color: '#A8AFC1',
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
            letterSpacing: '0.02em',
            margin: 0,
          }}
        >
          Select a profile to customize your experience
        </p>
      </motion.div>

      {/* Profiles Row */}
      <div
        style={{
          display: 'flex',
          gap: 'clamp(16px, 2.8vw, 32px)',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: 1040,
          margin: '0 auto 48px',
        }}
      >
        {profiles.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
            whileHover={{ scale: 1.07, y: -6 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(p.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 'clamp(140px, 18vw, 180px)',
              cursor: 'pointer',
              textAlign: 'center',
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'inherit',
            }}
          >
            {/* Square Avatar Tile */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: 16,
                background: p.bgGradient,
                border: '2px solid transparent',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FFFFFF'
                e.currentTarget.style.boxShadow =
                  '0 0 35px rgba(255, 255, 255, 0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.6)'
              }}
            >
              {p.hasBadge && (
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: p.badgeColor,
                    color: '#FFFFFF',
                    fontSize: '0.62rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    padding: '3px 7px',
                    borderRadius: 4,
                    zIndex: 2,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                  }}
                >
                  {p.hasBadge}
                </div>
              )}

              {p.type === 'image' && (
                <img
                  src={p.photo}
                  alt={p.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}

              {p.type === 'letter' && (
                <span
                  style={{
                    fontFamily: 'var(--font-cinema)',
                    fontSize: 'clamp(3.5rem, 6vw, 4.8rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1,
                  }}
                >
                  {p.letter}
                </span>
              )}

              {p.type === 'code' && (
                <span
                  style={{
                    fontFamily: 'var(--font-cinema)',
                    fontSize: 'clamp(2.8rem, 5vw, 4rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1,
                  }}
                >
                  &lt;/&gt;
                </span>
              )}

              {p.type === 'sparkle' && (
                <Sparkles size={54} color="#FFFFFF" strokeWidth={2.2} />
              )}
            </div>

            {/* Profile Label */}
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#EDEAF5',
                margin: '14px 0 4px 0',
                transition: 'color 0.2s',
              }}
            >
              {p.title}
            </h3>

            {/* Profile Subtitle */}
            <p
              style={{
                color: '#A8AFC1',
                fontSize: '0.78rem',
                lineHeight: 1.35,
                margin: 0,
              }}
            >
              {p.subtitle}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Bottom Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
          color: 'rgba(168, 175, 193, 0.65)',
          textAlign: 'center',
          maxWidth: 620,
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        Every profile watches the same true story of Sayantika — it only changes what plays first.
      </motion.p>

      {/* Floating Bottom Right Sound / Play Icon */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          right: 36,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: '#E50914',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(229, 9, 20, 0.4)',
          cursor: 'pointer',
        }}
        title="Interactive Audio Cue"
        onClick={() => onSelect('explore')}
      >
        <Volume2 size={20} color="#FFFFFF" />
      </div>
    </div>
  )
}
