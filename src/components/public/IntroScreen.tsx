import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'

interface Props {
  onComplete: () => void
}

export function IntroScreen({ onComplete }: Props) {
  const [stage, setStage] = useState<'brand' | 'titleCard'>('brand')

  useEffect(() => {
    // Stage 1: Brand curtain ("A SAYANTIKA ORIGINAL") for 2.2s
    const t1 = setTimeout(() => {
      setStage('titleCard')
    }, 2200)

    return () => clearTimeout(t1)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#080A10',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#EDEAF5',
        fontFamily: 'var(--font-body)',
        userSelect: 'none',
      }}
    >
      {/* Top Right Skip Button */}
      <button
        onClick={onComplete}
        style={{
          position: 'absolute',
          top: 32,
          right: 36,
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(237, 234, 245, 0.2)',
          color: '#EDEAF5',
          padding: '8px 20px',
          borderRadius: 100,
          cursor: 'pointer',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
          e.currentTarget.style.borderColor = 'rgba(65, 105, 225, 0.6)'
          e.currentTarget.style.transform = 'scale(1.04)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
          e.currentTarget.style.borderColor = 'rgba(237, 234, 245, 0.2)'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        Skip Intro
      </button>

      <AnimatePresence mode="wait">
        {stage === 'brand' ? (
          <motion.div
            key="brand"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <motion.p
              initial={{ letterSpacing: '0.2em', opacity: 0 }}
              animate={{ letterSpacing: '0.35em', opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.85rem, 1.8vw, 1.15rem)',
                fontWeight: 600,
                color: 'rgba(237, 234, 245, 0.85)',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              A SAYANTIKA ORIGINAL
            </motion.p>

            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#4169E1',
                boxShadow: '0 0 12px #4169E1',
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="titleCard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              maxWidth: 900,
              padding: '0 24px',
            }}
          >
            {/* Background Halo Glow behind Avatar */}
            <div
              style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 440,
                height: 440,
                background:
                  'radial-gradient(circle, rgba(65, 105, 225, 0.28) 0%, rgba(104, 74, 158, 0.12) 45%, transparent 70%)',
                pointerEvents: 'none',
                filter: 'blur(30px)',
              }}
            />

            {/* Giant Title */}
            <motion.h1
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-cinema)',
                fontSize: 'clamp(3.8rem, 11vw, 7.8rem)',
                fontWeight: 700,
                letterSpacing: '0.05em',
                lineHeight: 0.95,
                margin: '0 0 6px 0',
                color: '#EDEAF5',
                textTransform: 'uppercase',
                textShadow: '0 8px 32px rgba(0,0,0,0.8)',
              }}
            >
              SAYANTIKA
            </motion.h1>

            {/* Sub-series badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.75rem, 1.4vw, 0.95rem)',
                fontWeight: 700,
                color: '#4169E1',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                margin: '0 0 28px 0',
              }}
            >
              THE SERIES
            </motion.p>

            {/* Portrait Cutout with Cinematic Vignette */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                width: 'clamp(170px, 22vw, 220px)',
                height: 'clamp(170px, 22vw, 220px)',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 24px',
                border: '2px solid rgba(65, 105, 225, 0.4)',
                boxShadow: '0 0 50px rgba(65, 105, 225, 0.25), inset 0 0 20px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src="./sayantika.jpg"
                alt="Sayantika"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to bottom, transparent 65%, rgba(8, 10, 16, 0.85) 100%)',
                }}
              />
            </motion.div>

            {/* Roles metadata */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.72rem, 1.2vw, 0.85rem)',
                color: '#A8AFC1',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                margin: '0 0 32px 0',
                fontWeight: 500,
              }}
            >
              COMPUTER SCIENCE STUDENT • ASPIRING DEVELOPER • CREATIVE TECHNOLOGIST
            </motion.p>

            {/* Big White Pill PLAY Button */}
            <motion.button
              onClick={onComplete}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.06, boxShadow: '0 0 32px rgba(255, 255, 255, 0.4)' }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#FFFFFF',
                color: '#080A10',
                border: 'none',
                padding: '14px 44px',
                borderRadius: 100,
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                transition: 'all 0.2s ease',
              }}
            >
              <Play size={18} fill="#080A10" />
              PLAY
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
