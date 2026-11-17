import React, { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { IntroScreen } from './components/public/IntroScreen'
import { ProfileSelector } from './components/public/ProfileSelector'
import { PublicLayout } from './components/public/PublicLayout'
import { HomePage } from './pages/public/HomePage'
import { ProjectsPage } from './pages/public/ProjectsPage'
import { ProjectDetailPage } from './pages/public/ProjectDetailPage'
import { SkillsPage } from './pages/public/SkillsPage'
import { CertificatesPage } from './pages/public/CertificatesPage'
import { AILabPage } from './pages/public/AILabPage'
import { AboutPage } from './pages/public/AboutPage'
import { ExperiencePage } from './pages/public/ExperiencePage'
import { ContactPage } from './pages/public/ContactPage'
import { AdminLogin } from './pages/admin/AdminLogin'
import { AdminLayout } from './components/admin/AdminLayout'
import { AdminOverview } from './pages/admin/AdminOverview'
import { AdminProfile } from './pages/admin/AdminProfile'
import { AdminProjects } from './pages/admin/AdminProjects'
import { AdminSkills } from './pages/admin/AdminSkills'
import { AdminCertificates } from './pages/admin/AdminCertificates'
import { AdminExperience } from './pages/admin/AdminExperience'
import { AdminEducation } from './pages/admin/AdminEducation'
import { AdminAILab } from './pages/admin/AdminAILab'
import { AdminAchievements } from './pages/admin/AdminAchievements'
import { AdminSocialLinks } from './pages/admin/AdminSocialLinks'
import { AdminFiles } from './pages/admin/AdminFiles'
import { AdminSettings } from './pages/admin/AdminSettings'
import { ProtectedRoute } from './components/admin/ProtectedRoute'
import './styles/global.css'

type AppState = 'intro' | 'profile-select' | 'portfolio'

function App() {
  const [appState, setAppState] = useState<AppState>('intro')
  const [selectedProfile, setSelectedProfile] = useState<string>('explore')
  const isAdminRoute = window.location.hash.startsWith('#/admin')

  useEffect(() => {
    if (isAdminRoute) setAppState('portfolio')
  }, [isAdminRoute])

  if (appState === 'intro' && !isAdminRoute) {
    return <IntroScreen onComplete={() => setAppState('profile-select')} />
  }

  if (appState === 'profile-select' && !isAdminRoute) {
    return (
      <ProfileSelector
        onSelect={(profile) => {
          setSelectedProfile(profile)
          setAppState('portfolio')
        }}
      />
    )
  }

  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route element={<PublicLayout selectedProfile={selectedProfile} onProfileChange={setSelectedProfile} />}>
            <Route index element={<HomePage selectedProfile={selectedProfile} />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/ai-lab" element={<AILabPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminOverview />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="certificates" element={<AdminCertificates />} />
            <Route path="experience" element={<AdminExperience />} />
            <Route path="education" element={<AdminEducation />} />
            <Route path="ai-lab" element={<AdminAILab />} />
            <Route path="achievements" element={<AdminAchievements />} />
            <Route path="social-links" element={<AdminSocialLinks />} />
            <Route path="files" element={<AdminFiles />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}

export default App
