import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { Zap, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export function AdminLogin() {
  const { user, isAdmin, isLoading, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (isLoading) return <div className="loading-screen"><div className="spinner" /></div>
  if (user && isAdmin) return <Navigate to="/admin" replace />

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const { error: err } = await signIn(email, password)
    if (err) {
      setError(err.message || 'Sign in failed. Please check your credentials.')
      setSubmitting(false)
      return
    }
    // Auth context will update; if not admin, show error
    setTimeout(() => {
      setSubmitting(false)
    }, 1500)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080A10',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'Space Grotesk, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 440,
        background: '#111622',
        border: '1px solid rgba(237,234,245,0.1)',
        borderRadius: 20,
        padding: '48px 40px'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 56, height: 56,
            background: 'rgba(65,105,225,0.12)',
            borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Zap size={28} color="#4169E1" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#EDEAF5', marginBottom: 8 }}>Sia CMS</h1>
          <p style={{ color: '#A8AFC1', fontSize: '0.9rem' }}>Sign in to manage your portfolio</p>
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            background: 'rgba(220,38,38,0.08)',
            border: '1px solid rgba(220,38,38,0.25)',
            borderRadius: 10,
            padding: '12px 14px',
            marginBottom: 24,
            color: '#f87171',
            fontSize: '0.875rem',
            lineHeight: 1.5
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
            {error}
          </div>
        )}

        {user && !isAdmin && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            background: 'rgba(220,38,38,0.08)',
            border: '1px solid rgba(220,38,38,0.25)',
            borderRadius: 10,
            padding: '12px 14px',
            marginBottom: 24,
            color: '#f87171',
            fontSize: '0.875rem'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            Access denied. This account is not authorised as an administrator.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#A8AFC1" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-input"
                style={{ paddingLeft: 38 }}
                placeholder="admin@example.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 32 }}>
            <label className="form-label" htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#A8AFC1" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: 38 }}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
          >
            {submitting ? (
              <>
                <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <a
            href="/#/"
            style={{ color: '#A8AFC1', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Space Grotesk, sans-serif', transition: 'color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EDEAF5' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#A8AFC1' }}
          >
            <ArrowLeft size={14} />
            Back to portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
