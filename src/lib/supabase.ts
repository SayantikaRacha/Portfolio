import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Environment variables not configured. ' +
    'Copy .env.example to .env and fill in your Supabase credentials.'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

export type Database = {
  public: {
    Tables: {
      profiles: { Row: Profile }
      site_settings: { Row: SiteSetting }
      skill_categories: { Row: SkillCategory }
      skills: { Row: Skill }
      projects: { Row: Project }
      project_images: { Row: ProjectImage }
      certificates: { Row: Certificate }
      experiences: { Row: Experience }
      education: { Row: Education }
      ai_lab_items: { Row: AILabItem }
      achievements: { Row: Achievement }
      social_links: { Row: SocialLink }
      activity_logs: { Row: ActivityLog }
      admin_users: { Row: AdminUser }
    }
  }
}

export interface Profile {
  id: string
  display_name: string
  professional_title: string
  short_intro: string
  biography: string
  profile_image_url: string | null
  location: string | null
  academic_status: string
  institution: string
  degree: string
  professional_interests: string[]
  contact_email: string | null
  availability_status: string
  created_at: string
  updated_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: string | null
  updated_at: string
}

export interface SkillCategory {
  id: string
  name: string
  display_order: number
  created_at: string
}

export interface Skill {
  id: string
  name: string
  category_id: string | null
  proficiency_label: string
  description: string | null
  display_order: number
  is_visible: boolean
  created_at: string
  updated_at: string
  skill_categories?: SkillCategory
}

export interface Project {
  id: string
  title: string
  slug: string
  short_description: string | null
  full_description: string | null
  problem_statement: string | null
  motivation: string | null
  approach: string | null
  features_implemented: string[]
  technologies: string[]
  category: string | null
  current_status: string
  limitations: string | null
  future_scope: string | null
  github_url: string | null
  live_demo_url: string | null
  cover_image_url: string | null
  is_featured: boolean
  display_order: number
  visibility: 'draft' | 'published' | 'unlisted'
  created_at: string
  updated_at: string
  project_images?: ProjectImage[]
}

export interface ProjectImage {
  id: string
  project_id: string
  image_url: string
  caption: string | null
  display_order: number
  created_at: string
}

export interface Certificate {
  id: string
  title: string
  issuing_organisation: string
  issue_date: string | null
  expiry_date: string | null
  credential_id: string | null
  credential_url: string | null
  description: string | null
  related_skills: string[]
  file_url: string | null
  thumbnail_url: string | null
  display_order: number
  is_visible: boolean
  created_at: string
  updated_at: string
}

export interface Experience {
  id: string
  organisation: string
  role: string
  experience_type: string
  start_date: string | null
  end_date: string | null
  is_current: boolean
  description: string | null
  responsibilities: string[]
  achievements: string[]
  logo_url: string | null
  is_visible: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface Education {
  id: string
  institution: string
  degree: string | null
  branch: string | null
  start_year: number | null
  expected_graduation_year: number | null
  current_semester: number | null
  description: string | null
  relevant_coursework: string[]
  academic_achievements: string[]
  is_current: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface AILabItem {
  id: string
  title: string
  description: string | null
  category: string | null
  tools: string[]
  project_links: string[]
  attachment_urls: string[]
  status: 'Completed' | 'Ongoing' | 'Idea' | 'Exploring'
  is_visible: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: string
  title: string
  organisation: string | null
  event_date: string | null
  description: string | null
  role: string | null
  result: string | null
  certificate_url: string | null
  image_urls: string[]
  achievement_type: string
  is_visible: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface SocialLink {
  id: string
  platform: string
  display_name: string | null
  url: string
  icon_name: string | null
  is_visible: boolean
  display_order: number
  created_at: string
}

export interface ActivityLog {
  id: string
  action: string
  entity_type: string | null
  entity_id: string | null
  entity_name: string | null
  created_at: string
}

export interface AdminUser {
  id: string
  user_id: string
  email: string
  created_at: string
}
