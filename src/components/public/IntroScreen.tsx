import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props { onComplete: () => void }

export function IntroScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500)
    const t2 = setTimeout(() => setPhase(2), 3000)
    const t3 = setTimeout(() => setPhase(3), 5000)
    const t4 = setTimeout(() => onComplete(), 5800)
    return () => [t1,t2,t3,t4].forEach(clearTimeout)
  }, [onComplete])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, rgba(65,105,225,0.06) 0%, #080A10 60%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Skip button */}
      <button
        onClick={onComplete}
        style={{
          position: 'absolute',
          top: 24,
          right: 32,
          background: 'none',
          border: '1px solid rgba(237,234,245,0.15)',
          color: '#A8AFC1',
          padding: '8px 20px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontFamily: 'Space Grotesk, sans-serif',
          letterSpacing: '0.05em',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={e => { (e.target as HTMLElement).style.color = '#EDEAF5'; (e.target as HTMLElement).style.borderColor = 'rgba(237,234,245,0.4)' }}
        onMouseLeave={e => { (e.target as HTMLElement).style.color = '#A8AFC1'; (e.target as HTMLElement).style.borderColor = 'rgba(237,234,245,0.15)' }}
      >
        Skip
      </button>

      <div style={{ textAlign: 'center', padding: '0 24px' }}>
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.p
              key="line1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.4rem, 4vw, 2.4rem)',
                color: '#EDEAF5',
                letterSpacing: '0.02em',
                lineHeight: 1.4
              }}
            >
              Every project begins with curiosity.
            </motion.p>
          )}
          {phase === 2 && (
            <motion.div
              key="line2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
                color: '#4169E1',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginBottom: 16
              }}>
                Welcome to
              </p>
              <h1 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                color: '#EDEAF5',
                letterSpacing: '-0.02em'
              }}>
                Sia's Digital Space.
              </h1>
            </motion.div>
          )}
          {phase >= 3 && (
            <motion.div
              key="dots"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'flex', gap: 8, justifyContent: 'center' }}
            >
              {[0,1,2].map(i => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                  style={{
                    width: 6, height: 6,
                    borderRadius: '50%',
                    background: '#4169E1',
                    display: 'block'
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
