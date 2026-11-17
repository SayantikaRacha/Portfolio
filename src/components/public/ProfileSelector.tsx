import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Palette, Sparkles } from 'lucide-react'

interface Props { onSelect: (profile: string) => void }

const profiles = [
  { id: 'developer', icon: Code2, title: 'Developer', subtitle: 'Building ideas through code', color: '#4169E1' },
  { id: 'creative', icon: Palette, title: 'Creative Tech', subtitle: 'Where technology meets creativity', color: '#684A9E' },
  { id: 'explore', icon: Sparkles, title: 'Explore Everything', subtitle: 'The complete Sia experience', color: '#4169E1' },
]

export function ProfileSelector({ onSelect }: Props) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#080A10',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      fontFamily: 'Space Grotesk, sans-serif'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 60 }}
      >
        <h1 style={{
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          fontWeight: 700,
          color: '#EDEAF5',
          marginBottom: 12,
          letterSpacing: '-0.02em'
        }}>
          Who's exploring today?
        </h1>
        <p style={{ color: '#A8AFC1', fontSize: '1rem' }}>
          Choose your lens into Sia's work.
        </p>
      </motion.div>

      <div style={{
        display: 'flex',
        gap: 28,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {profiles.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(p.id)}
            style={{
              width: 180,
              padding: '36px 24px',
              background: '#111622',
              border: '1px solid rgba(237,234,245,0.12)',
              borderRadius: 16,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              fontFamily: 'Space Grotesk, sans-serif'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(65,105,225,0.5)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(65,105,225,0.15)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(237,234,245,0.12)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            <div style={{
              width: 60,
              height: 60,
              borderRadius: 12,
              background: `rgba(${p.color === '#684A9E' ? '104,74,158' : '65,105,225'},0.12)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <p.icon size={28} color={p.color} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{
                color: '#EDEAF5',
                fontWeight: 600,
                fontSize: '1rem',
                marginBottom: 6
              }}>{p.title}</p>
              <p style={{
                color: '#A8AFC1',
                fontSize: '0.78rem',
                lineHeight: 1.4
              }}>{p.subtitle}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
