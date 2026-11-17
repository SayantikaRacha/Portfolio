import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, User, FolderOpen, Zap, Award, Briefcase,
  GraduationCap, FlaskConical, Trophy, Share2, FileText,
  Settings, LogOut, ExternalLink, Zap as Lightning, Menu, X
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface NavItem {
  to: string
  label: string
  icon: React.ComponentType<any>
  exact?: boolean
}

interface NavSection {
  label: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    label: 'Overview',
    items: [
      { to: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
    ]
  },
  {
    label: 'Content',
    items: [
      { to: '/admin/profile', label: 'Profile', icon: User },
      { to: '/admin/projects', label: 'Projects', icon: FolderOpen },
      { to: '/admin/skills', label: 'Skills', icon: Zap },
      { to: '/admin/certificates', label: 'Certificates', icon: Award },
      { to: '/admin/experience', label: 'Experience', icon: Briefcase },
      { to: '/admin/education', label: 'Education', icon: GraduationCap },
      { to: '/admin/ai-lab', label: 'AI Lab', icon: FlaskConical },
      { to: '/admin/achievements', label: 'Achievements', icon: Trophy },
    ]
  },
  {
    label: 'Manage',
    items: [
      { to: '/admin/social-links', label: 'Social Links', icon: Share2 },
      { to: '/admin/files', label: 'Resume & Files', icon: FileText },
      { to: '/admin/settings', label: 'Settings', icon: Settings },
    ]
  }
]

export function AdminLayout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const SidebarContent = () => (
    <>
      <div className="admin-sidebar-header">
        <div className="admin-sidebar-logo">
          <div style={{
            width: 32, height: 32,
            background: 'rgba(65,105,225,0.15)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Lightning size={18} color="#4169E1" />
          </div>
          <div>
            <div style={{ color: '#EDEAF5', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1 }}>Sia CMS</div>
            <span style={{ fontSize: '0.65rem', color: '#4169E1', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginTop: 2 }}>Content Manager</span>
          </div>
        </div>
      </div>

      <nav className="admin-nav">
        {navSections.map(section => (
          <div key={section.label}>
            <div className="admin-nav-section">{section.label}</div>
            {section.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact ?? false}
                className={({ isActive }) => `admin-nav-item${isActive ? ' active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div style={{
        padding: '16px 12px',
        borderTop: '1px solid rgba(237,234,245,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}>
        <a
          href="/#/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-nav-item"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <ExternalLink size={16} />
          View Portfolio
        </a>
        <button
          onClick={handleSignOut}
          className="admin-nav-item"
          style={{ color: '#f87171' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(220,38,38,0.08)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '' }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </>
  )

  return (
    <div className="admin-layout">
      {/* Desktop sidebar */}
      <aside className="admin-sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
        <SidebarContent />
      </aside>

      {/* Mobile header */}
      <div style={{
        display: 'none',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: '#111622',
        borderBottom: '1px solid rgba(237,234,245,0.08)',
        padding: '12px 16px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }} className="mobile-admin-header">
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#EDEAF5' }}>Sia CMS</div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: '#EDEAF5', cursor: 'pointer' }}>
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 300 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: 260,
        background: '#111622',
        borderRight: '1px solid rgba(237,234,245,0.08)',
        zIndex: 400,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }} className="mobile-sidebar">
        <SidebarContent />
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
