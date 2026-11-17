import { supabase } from './supabase'
import type {
  Profile, Skill, SkillCategory,
  Project, ProjectImage, Certificate, Experience,
  Education, AILabItem, Achievement, SocialLink
} from './supabase'

// ============================================================
// DEFAULT FALLBACK DATA (matches seed.sql)
// Ensures the public site is immediately rich, beautiful, and functional
// even before Supabase credentials are configured or in static preview.
// ============================================================

export const defaultProfile: Profile = {
  id: 'default-profile',
  display_name: 'Sayantika',
  professional_title: 'Computer Science Student | Aspiring Developer | Creative Technologist',
  short_intro: 'I turn curiosity into things I can build.',
  biography: `I'm a Computer Science student driven by curiosity, experimentation, and the desire to understand how technology can solve real problems.

My interests span software development, artificial intelligence, and creative technology. I enjoy turning ideas into practical experiments, learning through projects, and exploring the possibilities that emerge when technical thinking meets creativity.`,
  profile_image_url: './sayantika.jpg',
  location: 'Coimbatore, India',
  academic_status: 'Semester 1',
  institution: 'Amrita Vishwa Vidyapeetham, Coimbatore',
  degree: 'Bachelor of Technology in Computer Science and Engineering (CSE Core)',
  professional_interests: [
    'Software Development',
    'Artificial Intelligence',
    'Creative Technology',
    'Prompt Engineering'
  ],
  contact_email: null,
  availability_status: 'Open to opportunities',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

export const defaultSettings: Record<string, string> = {
  site_title: 'Sia | Computer Science Student & Developer',
  site_description: 'Explore Sia\'s projects, development journey, creative technology experiments, certificates, and interests in computer science and AI.',
  hero_heading: "Hi, I'm Sia.",
  hero_subheading: 'I turn curiosity into things I can build.',
  hero_intro: 'A Computer Science student exploring software development, artificial intelligence, and the intersection of technology and creativity.',
  footer_text: '© 2026 Sayantika. Built with curiosity.',
  show_section_projects: 'true',
  show_section_skills: 'true',
  show_section_certificates: 'true',
  show_section_ailab: 'true',
  show_section_experience: 'true',
  show_section_education: 'true',
  show_section_achievements: 'true',
  show_section_contact: 'true',
  resume_url: '',
}

export const defaultProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Lumière',
    slug: 'lumiere',
    short_description: 'A creative digital platform focused on aesthetic digital invitations, visual edits, and customised minimal designs combining visual design and web development.',
    full_description: `Lumière is a creative digital platform focused on aesthetic digital invitations, visual edits, and customised minimal designs. It began as a creative project and evolved into a web development experience combining visual design with frontend and backend development. Both frontend and backend are deployed according to the latest project update.`,
    problem_statement: 'Digital invitations and creative web designs often lack personal aesthetic refinement or require heavy, clumsy tools. Lumière bridges the gap between visual beauty and functional web engineering.',
    motivation: 'To combine seven years of self-taught creative design sensibilities with modern software engineering, creating a distinctive and polished digital experience.',
    approach: 'Began with design systems and layout planning in Figma, guided by AI-assisted design workflows, then built responsive frontend interfaces paired with a deployed backend.',
    features_implemented: [
      'Custom minimal invitation layouts',
      'Aesthetic typography and color schemes',
      'Interactive design previews',
      'Deployed frontend and backend infrastructure'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Figma', 'AI-assisted design workflow'],
    category: 'Creative Web Development',
    current_status: 'Completed — nearly ready for public release',
    limitations: 'Public release undergoing final refinements.',
    future_scope: 'Adding custom dynamic template editors and user dashboard.',
    github_url: 'https://github.com/SayantikaRacha/Lumiere',
    live_demo_url: 'https://sayantikaracha.github.io/Lumiere/',
    cover_image_url: null,
    is_featured: true,
    display_order: 1,
    visibility: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'proj-2',
    title: 'CogniGuard',
    slug: 'cogniguard',
    short_description: 'A concept-demonstration prototype exploring the problem of excessive cognitive delegation to AI tools during learning, presented at GENESIS\'26 Amrita Ideathon.',
    full_description: `CogniGuard explores the problem of excessive cognitive delegation to AI tools during learning. The concept proposes a guided-learning layer that encourages students to think independently instead of immediately relying on direct AI-generated answers.

Presented at GENESIS'26 — Amrita Ideathon under the theme "Where Ideas Become Impact". Led as Team Leader in a team of 4 (10–11 October 2026). The current prototype demonstrates the core concept and guided learning philosophy.`,
    problem_statement: 'Cognitive Delegation Crisis: Students frequently copy-paste solutions from AI tools without engaging critical thinking, leading to shallow learning and long-term skill atrophy.',
    motivation: 'To preserve genuine problem-solving and critical thinking while still harnessing the immense educational potential of artificial intelligence.',
    approach: 'Proposing an intelligent interception layer that offers progressive hints, active recall prompts, and guided questions rather than direct answers.',
    features_implemented: [
      'Concept: Guided Learning Mode',
      'Concept: Progressive Hint System',
      'Concept: Independent Challenge Layer',
      'Concept: Learning Session Summary',
      'Concept: AI vs Guided Mode comparison',
      'Interactive concept-demonstration prototype'
    ],
    technologies: ['Python', 'HTML', 'CSS', 'JavaScript', 'AI-assisted design'],
    category: 'AI / EdTech / Ideation & Prototyping',
    current_status: 'Working concept-demonstration prototype',
    limitations: 'Demonstration prototype illustrating the idea; user authentication and full production AI backend are part of future scope.',
    future_scope: 'Full browser extension and LMS plugin integration with adaptive hint calibration.',
    github_url: null,
    live_demo_url: null,
    cover_image_url: null,
    is_featured: true,
    display_order: 2,
    visibility: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'proj-3',
    title: 'Orbit',
    slug: 'orbit',
    short_description: 'An academic planning platform concept designed to help university students organise academic progress, goals, and study activities.',
    full_description: `Orbit is an academic planning platform concept designed to help university students organise their academic progress, goals, and study activities. The current version is a locally runnable prototype built with TypeScript.`,
    problem_statement: 'University students struggle to balance complex curricula, GPA tracking, attendance requirements, and study goals across multiple fragmented apps.',
    motivation: 'To build a unified, high-aesthetic command center tailored for engineering students.',
    approach: 'Engineered modular TypeScript architecture featuring GPA calculation algorithms, curriculum roadmaps, and goal management flows.',
    features_implemented: [
      'TypeScript-based interface',
      'Academic dashboard',
      'Curriculum exploration',
      'GPA calculation logic',
      'Goal-planning interface',
      'Study-planning workflows',
      'Sample data and simulated interactions'
    ],
    technologies: ['TypeScript', 'HTML', 'CSS', 'Supabase (schema defined)'],
    category: 'Software Development / Academic Technology',
    current_status: 'Locally runnable prototype — functionality under development',
    limitations: 'Runs locally; persistent data backend and dynamic user accounts are currently under active development.',
    future_scope: 'Cloud synchronization, university syllabus integration, and peer study group scheduling.',
    github_url: 'https://github.com/SayantikaRacha/orbit-amrita-planner',
    live_demo_url: null,
    cover_image_url: null,
    is_featured: true,
    display_order: 3,
    visibility: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'proj-4',
    title: 'Python Diary App',
    slug: 'python-diary',
    short_description: 'A simple command-line diary application developed in Python with menu-driven navigation and file-based persistence.',
    full_description: `A practical early programming project: a command-line diary application developed using Python. It allows users to add, view, and delete diary entries through a clean, menu-driven interface with persistent storage in diary.txt.`,
    problem_statement: 'Applying foundational Python syntax, file I/O, and OOP concepts into a practical and reliable terminal application.',
    motivation: 'Hands-on mastery of fundamental software construction principles.',
    approach: 'Object-oriented Python structure with safe file operations and robust input validation.',
    features_implemented: [
      'Add formatted diary entries',
      'View past diary logs',
      'Delete entries safely',
      'File-based storage using diary.txt',
      'Menu-driven terminal interaction'
    ],
    technologies: ['Python', 'File Handling', 'Object-Oriented Programming'],
    category: 'Python / Software Development',
    current_status: 'Completed',
    limitations: 'CLI terminal application.',
    future_scope: 'Adding cryptographic entry encryption and SQLite database option.',
    github_url: 'https://github.com/SayantikaRacha/python-diary-app',
    live_demo_url: null,
    cover_image_url: null,
    is_featured: false,
    display_order: 4,
    visibility: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export const defaultSkillGroups: { category: SkillCategory; skills: Skill[] }[] = [
  {
    category: { id: 'cat-1', name: 'Programming & Technical', display_order: 1, created_at: '' },
    skills: [
      { id: 's-1', name: 'Python', category_id: 'cat-1', proficiency_label: 'Intermediate', description: 'Core programming, CLI apps, logic building, data handling.', display_order: 1, is_visible: true, created_at: '', updated_at: '' },
      { id: 's-2', name: 'C', category_id: 'cat-1', proficiency_label: 'Introductory', description: 'Structured programming fundamentals, memory, pointers.', display_order: 2, is_visible: true, created_at: '', updated_at: '' },
      { id: 's-3', name: 'MySQL', category_id: 'cat-1', proficiency_label: 'Foundational', description: 'Relational database schema design and querying.', display_order: 3, is_visible: true, created_at: '', updated_at: '' },
    ]
  },
  {
    category: { id: 'cat-2', name: 'AI & Technology', display_order: 2, created_at: '' },
    skills: [
      { id: 's-4', name: 'Generative AI', category_id: 'cat-2', proficiency_label: 'Intermediate', description: 'Working knowledge of generative models and modern AI tooling.', display_order: 1, is_visible: true, created_at: '', updated_at: '' },
      { id: 's-5', name: 'Prompt Engineering', category_id: 'cat-2', proficiency_label: 'Intermediate', description: 'Structured prompt design, system instructions, and chain reasoning.', display_order: 2, is_visible: true, created_at: '', updated_at: '' },
      { id: 's-6', name: 'AI-Assisted Workflows', category_id: 'cat-2', proficiency_label: 'Familiar with', description: 'Accelerating software engineering and creative ideation.', display_order: 3, is_visible: true, created_at: '', updated_at: '' },
      { id: 's-7', name: 'Microsoft Copilot', category_id: 'cat-2', proficiency_label: 'Familiar with', description: 'Productivity acceleration and code assistance.', display_order: 4, is_visible: true, created_at: '', updated_at: '' },
    ]
  },
  {
    category: { id: 'cat-3', name: 'Creative', display_order: 3, created_at: '' },
    skills: [
      { id: 's-8', name: 'Video Editing', category_id: 'cat-3', proficiency_label: 'Advanced', description: 'Approximately seven years of self-taught storytelling, rhythm, and editing.', display_order: 1, is_visible: true, created_at: '', updated_at: '' },
      { id: 's-9', name: 'Image Editing', category_id: 'cat-3', proficiency_label: 'Intermediate', description: 'Visual adjustments, color grading, graphic composition.', display_order: 2, is_visible: true, created_at: '', updated_at: '' },
      { id: 's-10', name: 'Canva', category_id: 'cat-3', proficiency_label: 'Intermediate', description: 'Editorial assets, presentations, and visual identity.', display_order: 3, is_visible: true, created_at: '', updated_at: '' },
      { id: 's-11', name: 'CapCut', category_id: 'cat-3', proficiency_label: 'Intermediate', description: 'Short-form visual editing, pacing, and effects.', display_order: 4, is_visible: true, created_at: '', updated_at: '' },
    ]
  },
  {
    category: { id: 'cat-4', name: 'Development Tools', display_order: 4, created_at: '' },
    skills: [
      { id: 's-12', name: 'GitHub', category_id: 'cat-4', proficiency_label: 'Foundational', description: 'Version control, repositories, branches, and collaboration.', display_order: 1, is_visible: true, created_at: '', updated_at: '' },
      { id: 's-13', name: 'VS Code', category_id: 'cat-4', proficiency_label: 'Familiar with', description: 'Primary development environment with custom workflows.', display_order: 2, is_visible: true, created_at: '', updated_at: '' },
    ]
  }
]

export const defaultEducation: Education[] = [
  {
    id: 'edu-1',
    institution: 'Amrita Vishwa Vidyapeetham, Coimbatore',
    degree: 'Bachelor of Technology',
    branch: 'Computer Science and Engineering (CSE Core)',
    start_year: 2026,
    expected_graduation_year: 2030,
    current_semester: 1,
    description: 'Undergraduate study in Computer Science and Engineering Core, exploring algorithms, programming paradigms, and emerging technologies.',
    relevant_coursework: ['Problem Solving and Algorithmic Thinking', 'Computer Programming (C & Python)', 'Discrete Mathematics'],
    academic_achievements: [],
    is_current: true,
    display_order: 1,
    created_at: '',
    updated_at: ''
  }
]

export const defaultExperiences: Experience[] = [
  {
    id: 'exp-1',
    organisation: 'In-Amigos Foundation',
    role: 'Copywriting Intern',
    experience_type: 'Internship',
    start_date: null,
    end_date: null,
    is_current: false,
    description: 'Completed a copywriting internship with In-Amigos Foundation, crafting targeted content and editorial materials.',
    responsibilities: [
      'Drafting engaging written content',
      'Refining tone and narrative clarity for organizational communications'
    ],
    achievements: [],
    logo_url: null,
    is_visible: true,
    display_order: 1,
    created_at: '',
    updated_at: ''
  }
]

export const defaultAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'GENESIS\'26 — Amrita Ideathon',
    organisation: 'Amrita Vishwa Vidyapeetham',
    event_date: '2026-10-10',
    description: 'Led a team of 4 in ideating and presenting CogniGuard under the theme "Where Ideas Become Impact".',
    role: 'Team Leader (Team of 4)',
    result: 'Working concept-demonstration prototype presented',
    certificate_url: null,
    image_urls: [],
    achievement_type: 'Hackathon/Ideathon',
    is_visible: true,
    display_order: 1,
    created_at: '',
    updated_at: ''
  }
]

export const defaultSocialLinks: SocialLink[] = [
  {
    id: 'soc-1',
    platform: 'GitHub',
    display_name: 'SayantikaRacha',
    url: 'https://github.com/SayantikaRacha',
    icon_name: 'github',
    is_visible: true,
    display_order: 1,
    created_at: ''
  },
  {
    id: 'soc-2',
    platform: 'LinkedIn',
    display_name: 'Sayantika Das',
    url: 'https://www.linkedin.com/in/sayantika-das-a623043b2/',
    icon_name: 'linkedin',
    is_visible: true,
    display_order: 2,
    created_at: ''
  }
]

// ============================================================
// PUBLIC API — read-only, published content only
// Gracefully falls back to default content if Supabase is offline or empty
// ============================================================

export const publicApi = {
  async getProfile(): Promise<Profile | null> {
    try {
      const { data, error } = await supabase.from('profiles').select('*').limit(1).single()
      if (error || !data) return defaultProfile
      return data
    } catch {
      return defaultProfile
    }
  },

  async getSiteSettings(): Promise<Record<string, string>> {
    try {
      const { data, error } = await supabase.from('site_settings').select('key, value')
      if (error || !data || data.length === 0) return defaultSettings
      return { ...defaultSettings, ...Object.fromEntries(data.map(s => [s.key, s.value || ''])) }
    } catch {
      return defaultSettings
    }
  },

  async getSkills(): Promise<{ category: SkillCategory; skills: Skill[] }[]> {
    try {
      const { data: categories } = await supabase.from('skill_categories').select('*').order('display_order')
      const { data: skills } = await supabase.from('skills').select('*').eq('is_visible', true).order('display_order')
      if (!categories || !skills || categories.length === 0) return defaultSkillGroups
      const grouped = categories.map(cat => ({
        category: cat,
        skills: skills.filter(s => s.category_id === cat.id)
      })).filter(g => g.skills.length > 0)
      return grouped.length > 0 ? grouped : defaultSkillGroups
    } catch {
      return defaultSkillGroups
    }
  },

  async getPublishedProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase.from('projects').select('*, project_images(*)').eq('visibility', 'published').order('display_order')
      if (error || !data || data.length === 0) return defaultProjects
      return data
    } catch {
      return defaultProjects
    }
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    try {
      const { data, error } = await supabase.from('projects').select('*, project_images(*)').eq('slug', slug).eq('visibility', 'published').single()
      if (error || !data) {
        return defaultProjects.find(p => p.slug === slug) || null
      }
      return data
    } catch {
      return defaultProjects.find(p => p.slug === slug) || null
    }
  },

  async getFeaturedProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase.from('projects').select('*, project_images(*)').eq('visibility', 'published').eq('is_featured', true).order('display_order')
      if (error || !data || data.length === 0) return defaultProjects.filter(p => p.is_featured)
      return data
    } catch {
      return defaultProjects.filter(p => p.is_featured)
    }
  },

  async getCertificates(): Promise<Certificate[]> {
    try {
      const { data, error } = await supabase.from('certificates').select('*').eq('is_visible', true).order('display_order')
      if (error || !data) return []
      return data
    } catch {
      return []
    }
  },

  async getExperiences(): Promise<Experience[]> {
    try {
      const { data, error } = await supabase.from('experiences').select('*').eq('is_visible', true).order('display_order')
      if (error || !data || data.length === 0) return defaultExperiences
      return data
    } catch {
      return defaultExperiences
    }
  },

  async getEducation(): Promise<Education[]> {
    try {
      const { data, error } = await supabase.from('education').select('*').order('display_order')
      if (error || !data || data.length === 0) return defaultEducation
      return data
    } catch {
      return defaultEducation
    }
  },

  async getAILabItems(): Promise<AILabItem[]> {
    try {
      const { data, error } = await supabase.from('ai_lab_items').select('*').eq('is_visible', true).order('display_order')
      if (error || !data) return []
      return data
    } catch {
      return []
    }
  },

  async getAchievements(): Promise<Achievement[]> {
    try {
      const { data, error } = await supabase.from('achievements').select('*').eq('is_visible', true).order('display_order')
      if (error || !data || data.length === 0) return defaultAchievements
      return data
    } catch {
      return defaultAchievements
    }
  },

  async getSocialLinks(): Promise<SocialLink[]> {
    try {
      const { data, error } = await supabase.from('social_links').select('*').eq('is_visible', true).order('display_order')
      if (error || !data || data.length === 0) return defaultSocialLinks
      return data
    } catch {
      return defaultSocialLinks
    }
  },
}

// ============================================================
// ADMIN API — requires authenticated admin session
// ============================================================

export const adminApi = {
  // --- Projects ---
  async getAllProjects(): Promise<Project[]> {
    try {
      const { data } = await supabase.from('projects').select('*, project_images(*)').order('display_order')
      return (data && data.length > 0) ? data : defaultProjects
    } catch {
      return defaultProjects
    }
  },

  async upsertProject(project: Partial<Project>): Promise<{ data: Project | null; error: Error | null }> {
    const { data, error } = await supabase
      .from('projects')
      .upsert({ ...project, updated_at: new Date().toISOString() })
      .select()
      .single()
    if (!error) await logActivity('upserted', 'project', data?.id, data?.title)
    return { data, error }
  },

  async deleteProject(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (!error) await logActivity('deleted', 'project', id)
    return { error }
  },

  async addProjectImage(image: Partial<ProjectImage>): Promise<{ data: ProjectImage | null; error: Error | null }> {
    const { data, error } = await supabase.from('project_images').insert(image).select().single()
    return { data, error }
  },

  async deleteProjectImage(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase.from('project_images').delete().eq('id', id)
    return { error }
  },

  // --- Skills ---
  async getAllSkills(): Promise<Skill[]> {
    try {
      const { data } = await supabase.from('skills').select('*, skill_categories(*)').order('display_order')
      if (data && data.length > 0) return data
      return defaultSkillGroups.flatMap(g => g.skills)
    } catch {
      return defaultSkillGroups.flatMap(g => g.skills)
    }
  },

  async getSkillCategories(): Promise<SkillCategory[]> {
    try {
      const { data } = await supabase.from('skill_categories').select('*').order('display_order')
      if (data && data.length > 0) return data
      return defaultSkillGroups.map(g => g.category)
    } catch {
      return defaultSkillGroups.map(g => g.category)
    }
  },

  async upsertSkill(skill: Partial<Skill>): Promise<{ data: Skill | null; error: Error | null }> {
    const { data, error } = await supabase
      .from('skills')
      .upsert({ ...skill, updated_at: new Date().toISOString() })
      .select()
      .single()
    if (!error) await logActivity('upserted', 'skill', data?.id, data?.name)
    return { data, error }
  },

  async deleteSkill(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase.from('skills').delete().eq('id', id)
    if (!error) await logActivity('deleted', 'skill', id)
    return { error }
  },

  async upsertSkillCategory(cat: Partial<SkillCategory>): Promise<{ data: SkillCategory | null; error: Error | null }> {
    const { data, error } = await supabase.from('skill_categories').upsert(cat).select().single()
    return { data, error }
  },

  // --- Certificates ---
  async getAllCertificates(): Promise<Certificate[]> {
    try {
      const { data } = await supabase.from('certificates').select('*').order('display_order')
      return data || []
    } catch {
      return []
    }
  },

  async upsertCertificate(cert: Partial<Certificate>): Promise<{ data: Certificate | null; error: Error | null }> {
    const { data, error } = await supabase
      .from('certificates')
      .upsert({ ...cert, updated_at: new Date().toISOString() })
      .select()
      .single()
    if (!error) await logActivity('upserted', 'certificate', data?.id, data?.title)
    return { data, error }
  },

  async deleteCertificate(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase.from('certificates').delete().eq('id', id)
    if (!error) await logActivity('deleted', 'certificate', id)
    return { error }
  },

  // --- Experiences ---
  async getAllExperiences(): Promise<Experience[]> {
    try {
      const { data } = await supabase.from('experiences').select('*').order('display_order')
      if (data && data.length > 0) return data
      return defaultExperiences
    } catch {
      return defaultExperiences
    }
  },

  async upsertExperience(exp: Partial<Experience>): Promise<{ data: Experience | null; error: Error | null }> {
    const { data, error } = await supabase
      .from('experiences')
      .upsert({ ...exp, updated_at: new Date().toISOString() })
      .select()
      .single()
    if (!error) await logActivity('upserted', 'experience', data?.id, data?.role)
    return { data, error }
  },

  async deleteExperience(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase.from('experiences').delete().eq('id', id)
    return { error }
  },

  // --- Education ---
  async getAllEducation(): Promise<Education[]> {
    try {
      const { data } = await supabase.from('education').select('*').order('display_order')
      if (data && data.length > 0) return data
      return defaultEducation
    } catch {
      return defaultEducation
    }
  },

  async upsertEducation(edu: Partial<Education>): Promise<{ data: Education | null; error: Error | null }> {
    const { data, error } = await supabase
      .from('education')
      .upsert({ ...edu, updated_at: new Date().toISOString() })
      .select()
      .single()
    return { data, error }
  },

  async deleteEducation(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase.from('education').delete().eq('id', id)
    return { error }
  },

  // --- AI Lab ---
  async getAllAILabItems(): Promise<AILabItem[]> {
    try {
      const { data } = await supabase.from('ai_lab_items').select('*').order('display_order')
      return data || []
    } catch {
      return []
    }
  },

  async upsertAILabItem(item: Partial<AILabItem>): Promise<{ data: AILabItem | null; error: Error | null }> {
    const { data, error } = await supabase
      .from('ai_lab_items')
      .upsert({ ...item, updated_at: new Date().toISOString() })
      .select()
      .single()
    if (!error) await logActivity('upserted', 'ai_lab', data?.id, data?.title)
    return { data, error }
  },

  async deleteAILabItem(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase.from('ai_lab_items').delete().eq('id', id)
    return { error }
  },

  // --- Achievements ---
  async getAllAchievements(): Promise<Achievement[]> {
    try {
      const { data } = await supabase.from('achievements').select('*').order('display_order')
      if (data && data.length > 0) return data
      return defaultAchievements
    } catch {
      return defaultAchievements
    }
  },

  async upsertAchievement(ach: Partial<Achievement>): Promise<{ data: Achievement | null; error: Error | null }> {
    const { data, error } = await supabase
      .from('achievements')
      .upsert({ ...ach, updated_at: new Date().toISOString() })
      .select()
      .single()
    if (!error) await logActivity('upserted', 'achievement', data?.id, data?.title)
    return { data, error }
  },

  async deleteAchievement(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase.from('achievements').delete().eq('id', id)
    return { error }
  },

  // --- Social Links ---
  async getAllSocialLinks(): Promise<SocialLink[]> {
    try {
      const { data } = await supabase.from('social_links').select('*').order('display_order')
      if (data && data.length > 0) return data
      return defaultSocialLinks
    } catch {
      return defaultSocialLinks
    }
  },

  async upsertSocialLink(link: Partial<SocialLink>): Promise<{ data: SocialLink | null; error: Error | null }> {
    const { data, error } = await supabase.from('social_links').upsert(link).select().single()
    return { data, error }
  },

  async deleteSocialLink(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase.from('social_links').delete().eq('id', id)
    return { error }
  },

  // --- Profile ---
  async updateProfile(profile: Partial<Profile>): Promise<{ data: Profile | null; error: Error | null }> {
    const { data: existing } = await supabase.from('profiles').select('id').limit(1).single()
    let result
    if (existing) {
      result = await supabase
        .from('profiles')
        .update({ ...profile, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single()
    } else {
      result = await supabase
        .from('profiles')
        .insert({ ...profile, updated_at: new Date().toISOString() })
        .select()
        .single()
    }
    if (!result.error) await logActivity('updated', 'profile', result.data?.id, 'Profile')
    return result
  },

  // --- Site Settings ---
  async getSiteSettings(): Promise<Record<string, string>> {
    try {
      const { data } = await supabase.from('site_settings').select('key, value')
      if (!data || data.length === 0) return defaultSettings
      return { ...defaultSettings, ...Object.fromEntries(data.map(s => [s.key, s.value || ''])) }
    } catch {
      return defaultSettings
    }
  },

  async updateSiteSetting(key: string, value: string): Promise<{ error: Error | null }> {
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    return { error }
  },

  async updateSiteSettings(settings: Record<string, string>): Promise<{ error: Error | null }> {
    const rows = Object.entries(settings).map(([key, value]) => ({
      key, value, updated_at: new Date().toISOString()
    }))
    const { error } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' })
    if (!error) await logActivity('updated', 'site_settings', undefined, 'Website Settings')
    return { error }
  },

  // --- Activity Logs ---
  async getRecentActivity(limit = 10) {
    try {
      const { data } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)
      return data || []
    } catch {
      return []
    }
  },

  // --- Dashboard Stats ---
  async getDashboardStats() {
    try {
      const [projects, certs, skills, exp, edu, ai] = await Promise.all([
        supabase.from('projects').select('id, visibility', { count: 'exact' }),
        supabase.from('certificates').select('id', { count: 'exact' }),
        supabase.from('skills').select('id', { count: 'exact' }),
        supabase.from('experiences').select('id', { count: 'exact' }),
        supabase.from('education').select('id', { count: 'exact' }),
        supabase.from('ai_lab_items').select('id', { count: 'exact' }),
      ])

      const projectData = projects.data || []
      return {
        totalProjects: projectData.length || defaultProjects.length,
        publishedProjects: projectData.filter(p => p.visibility === 'published').length || defaultProjects.length,
        draftProjects: projectData.filter(p => p.visibility === 'draft').length || 0,
        totalCertificates: certs.count || 0,
        totalSkills: skills.count || defaultSkillGroups.flatMap(g => g.skills).length,
        totalExperiences: exp.count || defaultExperiences.length,
        totalEducation: edu.count || defaultEducation.length,
        totalAILab: ai.count || 0,
      }
    } catch {
      return {
        totalProjects: defaultProjects.length,
        publishedProjects: defaultProjects.length,
        draftProjects: 0,
        totalCertificates: 0,
        totalSkills: defaultSkillGroups.flatMap(g => g.skills).length,
        totalExperiences: defaultExperiences.length,
        totalEducation: defaultEducation.length,
        totalAILab: 0,
      }
    }
  },
}

// ============================================================
// FILE UPLOAD HELPERS
// ============================================================

export const storageApi = {
  async uploadFile(
    bucket: string,
    path: string,
    file: File
  ): Promise<{ url: string | null; error: Error | null }> {
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    })
    if (error) return { url: null, error }
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return { url: data.publicUrl, error: null }
  },

  async deleteFile(bucket: string, path: string): Promise<{ error: Error | null }> {
    const { error } = await supabase.storage.from(bucket).remove([path])
    return { error }
  },

  getPublicUrl(bucket: string, path: string): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  },
}

// ============================================================
// HELPER: Activity logger
// ============================================================
async function logActivity(
  action: string,
  entityType: string,
  entityId?: string,
  entityName?: string
) {
  try {
    await supabase.from('activity_logs').insert({
      action,
      entity_type: entityType,
      entity_id: entityId,
      entity_name: entityName,
    })
  } catch {
    // Ignore logging errors in demo mode
  }
}
