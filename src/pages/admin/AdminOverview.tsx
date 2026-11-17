import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderOpen, Award, Zap, Briefcase, Plus, Upload, User, Settings, Clock, FileText } from 'lucide-react'
import { adminApi } from '../../lib/api'
import { useAuth } from '../../contexts/AuthContext'

export function AdminOverview() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState<any>(null)
  const [activity, setActivity] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      adminApi.getDashboardStats(),
      adminApi.getRecentActivity(10)
    ]).then(([s, a]) => {
      setStats(s)
      setActivity(a)
      setLoading(false)
    })
  }, [])

  const statCards = stats ? [
    { label: 'Total Projects', value: stats.totalProjects, icon: FolderOpen, color: '#4169E1' },
    { label: 'Published', value: stats.publishedProjects, icon: FolderOpen, color: '#4ade80' },
    { label: 'Drafts', value: stats.draftProjects, icon: FileText, color: '#fbbf24' },
    { label: 'Certificates', value: stats.totalCertificates, icon: Award, color: '#a78bfa' },
    { label: 'Skills', value: stats.totalSkills, icon: Zap, color: '#4169E1' },
    { label: 'Experience', value: stats.totalExperiences, icon: Briefcase, color: '#5B82FF' },
  ] : []

  const quickActions = [
    { label: 'Add Project', icon: Plus, to: '/admin/projects', color: '#4169E1' },
    { label: 'Upload Certificate', icon: Upload, to: '/admin/certificates', color: '#a78bfa' },
    { label: 'Add Skill', icon: Zap, to: '/admin/skills', color: '#4ade80' },
    { label: 'Update Profile', icon: User, to: '/admin/profile', color: '#5B82FF' },
    { label: 'Website Settings', icon: Settings, to: '/admin/settings', color: '#fbbf24' },
  ]

  function timeAgo(date: string) {
    const diff = Date.now() - new Date(date).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Overview</h1>
        <p className="admin-page-subtitle">
          Welcome back, {user?.email?.split('@')[0]}. Here's your portfolio at a glance.
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>
      ) : (
        <>
          {/* Stats */}
          <div className="admin-stat-grid" style={{ marginBottom: 40 }}>
            {statCards.map(card => (
              <div key={card.label} className="admin-stat-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{
                    width: 36, height: 36,
                    background: `rgba(${
                      card.color === '#4169E1' ? '65,105,225' :
                      card.color === '#4ade80' ? '74,222,128' :
                      card.color === '#fbbf24' ? '251,191,36' :
                      card.color === '#a78bfa' ? '167,139,250' :
                      '91,130,255'
                    },0.12)`,
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <card.icon size={18} color={card.color} />
                  </div>
                </div>
                <div className="admin-stat-value">{card.value}</div>
                <div className="admin-stat-label">{card.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {/* Quick actions */}
            <div>
              <h2 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#EDEAF5',
                marginBottom: 20,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                Quick Actions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {quickActions.map(action => (
                  <button
                    key={action.label}
                    onClick={() => navigate(action.to)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      background: '#171D2A',
                      border: '1px solid rgba(237,234,245,0.08)',
                      borderRadius: 12,
                      padding: '14px 18px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left',
                      fontFamily: 'Space Grotesk, sans-serif'
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(65,105,225,0.3)'
                      ;(e.currentTarget as HTMLElement).style.background = '#1D2436'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(237,234,245,0.08)'
                      ;(e.currentTarget as HTMLElement).style.background = '#171D2A'
                    }}
                  >
                    <div style={{
                      width: 36, height: 36,
                      background: 'rgba(65,105,225,0.1)',
                      borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <action.icon size={16} color={action.color} />
                    </div>
                    <span style={{ color: '#EDEAF5', fontSize: '0.9rem', fontWeight: 500 }}>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div>
              <h2 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#EDEAF5',
                marginBottom: 20,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                Recent Activity
              </h2>
              <div style={{
                background: '#171D2A',
                border: '1px solid rgba(237,234,245,0.08)',
                borderRadius: 12,
                overflow: 'hidden'
              }}>
                {activity.length === 0 ? (
                  <div style={{ padding: '32px 24px', textAlign: 'center', color: '#A8AFC1', fontSize: '0.875rem' }}>
                    No activity yet. Start adding content!
                  </div>
                ) : (
                  activity.map((log, i) => (
                    <div key={log.id} style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '12px 18px',
                      borderBottom: i < activity.length - 1 ? '1px solid rgba(237,234,245,0.06)' : 'none'
                    }}>
                      <div style={{
                        width: 32, height: 32,
                        background: 'rgba(65,105,225,0.08)',
                        borderRadius: 8,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Clock size={14} color="#4169E1" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          color: '#EDEAF5',
                          fontSize: '0.825rem',
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontWeight: 500
                        }}>
                          {log.action} {log.entity_type}{log.entity_name ? `: ${log.entity_name}` : ''}
                        </p>
                      </div>
                      <span style={{ color: '#A8AFC1', fontSize: '0.75rem', flexShrink: 0 }}>
                        {timeAgo(log.created_at)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
