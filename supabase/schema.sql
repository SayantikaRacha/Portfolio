-- ============================================================
-- SIA PORTFOLIO — SUPABASE POSTGRESQL SCHEMA
-- Version 1.0
-- ============================================================
-- Run this entire file in your Supabase SQL Editor.
-- Go to: Supabase Dashboard > SQL Editor > New Query > Paste > Run
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: admin_users
-- Allowlist of authorised administrators
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: profiles
-- Public profile information
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  display_name TEXT NOT NULL DEFAULT 'Sia',
  professional_title TEXT DEFAULT 'Computer Science Student | Aspiring Developer | Creative Technologist',
  short_intro TEXT DEFAULT 'I turn curiosity into things I can build.',
  biography TEXT DEFAULT 'I''m a Computer Science student driven by curiosity, experimentation, and the desire to understand how technology can solve real problems. My interests span software development, artificial intelligence, and creative technology.',
  profile_image_url TEXT,
  location TEXT,
  academic_status TEXT DEFAULT 'Semester 1 — B.Tech CSE Core',
  institution TEXT DEFAULT 'Amrita Vishwa Vidyapeetham, Coimbatore',
  degree TEXT DEFAULT 'Bachelor of Technology in Computer Science and Engineering',
  professional_interests TEXT[] DEFAULT ARRAY['Software Development', 'Artificial Intelligence', 'Creative Technology'],
  contact_email TEXT,
  availability_status TEXT DEFAULT 'Open to opportunities',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: site_settings
-- Controls website-wide text and visibility settings
-- ============================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: skill_categories
-- Organise skills into groups
-- ============================================================
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: skills
-- Personal confirmed skills only
-- ============================================================
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category_id UUID REFERENCES skill_categories(id) ON DELETE SET NULL,
  proficiency_label TEXT DEFAULT 'Familiar with',
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: projects
-- Portfolio projects with full detail fields
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  full_description TEXT,
  problem_statement TEXT,
  motivation TEXT,
  approach TEXT,
  features_implemented TEXT[],
  technologies TEXT[],
  category TEXT,
  current_status TEXT DEFAULT 'In Progress',
  limitations TEXT,
  future_scope TEXT,
  github_url TEXT,
  live_demo_url TEXT,
  cover_image_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  visibility TEXT DEFAULT 'draft' CHECK (visibility IN ('draft', 'published', 'unlisted')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: project_images
-- Screenshot gallery for each project
-- ============================================================
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: certificates
-- Certificates and credentials
-- ============================================================
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  issuing_organisation TEXT NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  description TEXT,
  related_skills TEXT[],
  file_url TEXT,
  thumbnail_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: experiences
-- Work / internship / volunteer experience
-- ============================================================
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation TEXT NOT NULL,
  role TEXT NOT NULL,
  experience_type TEXT DEFAULT 'Internship',
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  description TEXT,
  responsibilities TEXT[],
  achievements TEXT[],
  logo_url TEXT,
  is_visible BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: education
-- Academic education records
-- ============================================================
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution TEXT NOT NULL,
  degree TEXT,
  branch TEXT,
  start_year INTEGER,
  expected_graduation_year INTEGER,
  current_semester INTEGER,
  description TEXT,
  relevant_coursework TEXT[],
  academic_achievements TEXT[],
  is_current BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: ai_lab_items
-- AI experiments and research explorations
-- ============================================================
CREATE TABLE IF NOT EXISTS ai_lab_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  tools TEXT[],
  project_links TEXT[],
  attachment_urls TEXT[],
  status TEXT DEFAULT 'Exploring' CHECK (status IN ('Completed', 'Ongoing', 'Idea', 'Exploring')),
  is_visible BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: achievements
-- Hackathons, competitions, awards, workshops
-- ============================================================
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  organisation TEXT,
  event_date DATE,
  description TEXT,
  role TEXT,
  result TEXT,
  certificate_url TEXT,
  image_urls TEXT[],
  achievement_type TEXT DEFAULT 'Event',
  is_visible BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: social_links
-- Social media and external profile links
-- ============================================================
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  display_name TEXT,
  url TEXT NOT NULL,
  icon_name TEXT,
  is_visible BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: activity_logs
-- Track admin activity for dashboard overview
-- ============================================================
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  entity_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_lab_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- HELPER FUNCTION: Check if current user is admin
-- ============================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- ============================================================
-- PUBLIC READ POLICIES (published content only)
-- ============================================================

-- Profiles: anyone can read
CREATE POLICY "Public can read profiles"
  ON profiles FOR SELECT USING (true);

-- Site settings: anyone can read
CREATE POLICY "Public can read site_settings"
  ON site_settings FOR SELECT USING (true);

-- Skill categories: public read
CREATE POLICY "Public can read skill_categories"
  ON skill_categories FOR SELECT USING (true);

-- Skills: public can read visible skills
CREATE POLICY "Public can read visible skills"
  ON skills FOR SELECT USING (is_visible = true);

-- Projects: public can read published projects
CREATE POLICY "Public can read published projects"
  ON projects FOR SELECT USING (visibility = 'published');

-- Project images: public can read images for published projects
CREATE POLICY "Public can read project images"
  ON project_images FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_images.project_id
      AND projects.visibility = 'published'
    )
  );

-- Certificates: public can read visible certificates
CREATE POLICY "Public can read visible certificates"
  ON certificates FOR SELECT USING (is_visible = true);

-- Experiences: public can read visible experiences
CREATE POLICY "Public can read visible experiences"
  ON experiences FOR SELECT USING (is_visible = true);

-- Education: public can read all education records
CREATE POLICY "Public can read education"
  ON education FOR SELECT USING (true);

-- AI Lab: public can read visible items
CREATE POLICY "Public can read visible ai_lab_items"
  ON ai_lab_items FOR SELECT USING (is_visible = true);

-- Achievements: public can read visible achievements
CREATE POLICY "Public can read visible achievements"
  ON achievements FOR SELECT USING (is_visible = true);

-- Social links: public can read visible links
CREATE POLICY "Public can read visible social_links"
  ON social_links FOR SELECT USING (is_visible = true);

-- ============================================================
-- ADMIN FULL ACCESS POLICIES
-- ============================================================

-- Admin users table: admins can read their own record
CREATE POLICY "Admins can read admin_users"
  ON admin_users FOR SELECT USING (is_admin());

-- Profiles: admins can do everything
CREATE POLICY "Admins can manage profiles"
  ON profiles FOR ALL USING (is_admin());

-- Site settings: admins can do everything
CREATE POLICY "Admins can manage site_settings"
  ON site_settings FOR ALL USING (is_admin());

-- Skill categories: admins can do everything
CREATE POLICY "Admins can manage skill_categories"
  ON skill_categories FOR ALL USING (is_admin());

-- Skills: admins can do everything (overrides public read)
CREATE POLICY "Admins can manage skills"
  ON skills FOR ALL USING (is_admin());

-- Projects: admins can do everything
CREATE POLICY "Admins can manage projects"
  ON projects FOR ALL USING (is_admin());

-- Project images: admins can do everything
CREATE POLICY "Admins can manage project_images"
  ON project_images FOR ALL USING (is_admin());

-- Certificates: admins can do everything
CREATE POLICY "Admins can manage certificates"
  ON certificates FOR ALL USING (is_admin());

-- Experiences: admins can do everything
CREATE POLICY "Admins can manage experiences"
  ON experiences FOR ALL USING (is_admin());

-- Education: admins can do everything
CREATE POLICY "Admins can manage education"
  ON education FOR ALL USING (is_admin());

-- AI Lab: admins can do everything
CREATE POLICY "Admins can manage ai_lab_items"
  ON ai_lab_items FOR ALL USING (is_admin());

-- Achievements: admins can do everything
CREATE POLICY "Admins can manage achievements"
  ON achievements FOR ALL USING (is_admin());

-- Social links: admins can do everything
CREATE POLICY "Admins can manage social_links"
  ON social_links FOR ALL USING (is_admin());

-- Activity logs: admins can read and insert
CREATE POLICY "Admins can manage activity_logs"
  ON activity_logs FOR ALL USING (is_admin());

-- ============================================================
-- TRIGGERS: auto-update updated_at timestamps
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON certificates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_ai_lab_items_updated_at BEFORE UPDATE ON ai_lab_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON achievements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
