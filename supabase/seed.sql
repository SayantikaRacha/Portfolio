-- ============================================================
-- SIA PORTFOLIO — INITIAL SEED DATA
-- ============================================================
-- Run AFTER schema.sql in the Supabase SQL Editor.
-- This contains the initial portfolio content.
-- No secrets or credentials are included.
-- ============================================================

-- ============================================================
-- SITE SETTINGS
-- ============================================================
INSERT INTO site_settings (key, value) VALUES
  ('site_title', 'Sia | Computer Science Student & Developer'),
  ('site_description', 'Explore Sia''s projects, development journey, creative technology experiments, certificates, and interests in computer science and AI.'),
  ('hero_heading', 'Hi, I''m Sia.'),
  ('hero_subheading', 'I turn curiosity into things I can build.'),
  ('hero_intro', 'A Computer Science student exploring software development, artificial intelligence, and the intersection of technology and creativity.'),
  ('footer_text', '© 2026 Sayantika. Built with curiosity.'),
  ('show_section_projects', 'true'),
  ('show_section_skills', 'true'),
  ('show_section_certificates', 'true'),
  ('show_section_ailab', 'true'),
  ('show_section_experience', 'true'),
  ('show_section_education', 'true'),
  ('show_section_achievements', 'true'),
  ('show_section_contact', 'true'),
  ('resume_url', ''),
  ('og_image_url', '')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- PROFILE
-- ============================================================
INSERT INTO profiles (
  display_name,
  professional_title,
  short_intro,
  biography,
  institution,
  degree,
  academic_status,
  professional_interests,
  availability_status
) VALUES (
  'Sayantika',
  'Computer Science Student | Aspiring Developer | Creative Technologist',
  'I turn curiosity into things I can build.',
  'I''m a Computer Science student driven by curiosity, experimentation, and the desire to understand how technology can solve real problems.

My interests span software development, artificial intelligence, and creative technology. I enjoy turning ideas into practical experiments, learning through projects, and exploring the possibilities that emerge when technical thinking meets creativity.',
  'Amrita Vishwa Vidyapeetham, Coimbatore',
  'Bachelor of Technology in Computer Science and Engineering (CSE Core)',
  'Semester 1',
  ARRAY['Software Development', 'Artificial Intelligence', 'Creative Technology', 'Prompt Engineering'],
  'Open to internship opportunities'
);

-- ============================================================
-- SKILL CATEGORIES
-- ============================================================
INSERT INTO skill_categories (name, display_order) VALUES
  ('Programming & Technical', 1),
  ('AI & Technology', 2),
  ('Creative', 3),
  ('Development Tools', 4);

-- ============================================================
-- SKILLS (confirmed personal skills only)
-- ============================================================
INSERT INTO skills (name, category_id, proficiency_label, display_order, is_visible)
SELECT 'Python', id, 'Intermediate', 1, true FROM skill_categories WHERE name = 'Programming & Technical';

INSERT INTO skills (name, category_id, proficiency_label, display_order, is_visible)
SELECT 'C', id, 'Introductory', 2, true FROM skill_categories WHERE name = 'Programming & Technical';

INSERT INTO skills (name, category_id, proficiency_label, display_order, is_visible)
SELECT 'MySQL', id, 'Foundational', 3, true FROM skill_categories WHERE name = 'Programming & Technical';

INSERT INTO skills (name, category_id, proficiency_label, description, display_order, is_visible)
SELECT 'Generative AI', id, 'Intermediate', 'Working knowledge of generative AI tools and their applications.', 1, true FROM skill_categories WHERE name = 'AI & Technology';

INSERT INTO skills (name, category_id, proficiency_label, display_order, is_visible)
SELECT 'Prompt Engineering', id, 'Intermediate', 2, true FROM skill_categories WHERE name = 'AI & Technology';

INSERT INTO skills (name, category_id, proficiency_label, display_order, is_visible)
SELECT 'AI-Assisted Workflows', id, 'Familiar with', 3, true FROM skill_categories WHERE name = 'AI & Technology';

INSERT INTO skills (name, category_id, proficiency_label, display_order, is_visible)
SELECT 'Microsoft Copilot', id, 'Familiar with', 4, true FROM skill_categories WHERE name = 'AI & Technology';

INSERT INTO skills (name, category_id, proficiency_label, description, display_order, is_visible)
SELECT 'Video Editing', id, 'Advanced', 'Self-taught across approximately seven years, proficient in storytelling, timing, and visual rhythm.', 1, true FROM skill_categories WHERE name = 'Creative';

INSERT INTO skills (name, category_id, proficiency_label, display_order, is_visible)
SELECT 'Image Editing', id, 'Intermediate', 2, true FROM skill_categories WHERE name = 'Creative';

INSERT INTO skills (name, category_id, proficiency_label, display_order, is_visible)
SELECT 'Canva', id, 'Intermediate', 3, true FROM skill_categories WHERE name = 'Creative';

INSERT INTO skills (name, category_id, proficiency_label, display_order, is_visible)
SELECT 'CapCut', id, 'Intermediate', 4, true FROM skill_categories WHERE name = 'Creative';

INSERT INTO skills (name, category_id, proficiency_label, display_order, is_visible)
SELECT 'GitHub', id, 'Foundational', 1, true FROM skill_categories WHERE name = 'Development Tools';

INSERT INTO skills (name, category_id, proficiency_label, display_order, is_visible)
SELECT 'VS Code', id, 'Familiar with', 2, true FROM skill_categories WHERE name = 'Development Tools';

-- ============================================================
-- PROJECTS
-- ============================================================

-- LUMIÈRE
INSERT INTO projects (
  title, slug, short_description, full_description,
  problem_statement, motivation, approach,
  features_implemented, technologies,
  category, current_status,
  limitations, future_scope,
  github_url, live_demo_url,
  is_featured, display_order, visibility
) VALUES (
  'Lumière',
  'lumiere',
  'A creative digital platform for aesthetic digital invitations, visual edits, and customised minimal designs.',
  'Lumière is a creative digital platform focused on aesthetic digital invitations, visual edits, and customised minimal designs. It began as a creative project and evolved into a web development experience combining visual design with frontend and backend development.',
  'There is a gap between purely technical portfolios and creative design work. Lumière explores what happens when both disciplines meet intentionally.',
  'The motivation for Lumière was to combine a creative sensibility with actual web development skills — to build something that felt as polished as it was functional.',
  'Starting from layout concepts developed in Figma and informed by AI-assisted design workflows, the project evolved into a web application with a frontend interface and a deployed backend.',
  ARRAY[
    'Custom digital invitation templates',
    'Minimal aesthetic landing pages',
    'Visual design components',
    'Frontend and backend deployment'
  ],
  ARRAY['HTML5', 'CSS3', 'JavaScript', 'Figma', 'AI-assisted design workflow'],
  'Creative Web Development',
  'Completed — Nearly ready for public release',
  'Some advanced customisation features are still being refined. Full public launch is pending final review.',
  'Planned expansion to include interactive invitation templates, a client-facing customisation interface, and an expanded gallery of design styles.',
  'https://github.com/SayantikaRacha/Lumiere',
  'https://sayantikaracha.github.io/Lumiere/',
  true, 1, 'published'
);

-- COGNIGUARD
INSERT INTO projects (
  title, slug, short_description, full_description,
  problem_statement, motivation, approach,
  features_implemented, technologies,
  category, current_status,
  limitations, future_scope,
  is_featured, display_order, visibility
) VALUES (
  'CogniGuard',
  'cogniguard',
  'An ideation concept exploring the problem of cognitive delegation to AI tools during learning — presented at GENESIS''26 Amrita Ideathon.',
  'CogniGuard explores the problem of excessive cognitive delegation to AI tools during learning. The concept proposes a guided-learning layer that encourages students to think independently instead of immediately relying on direct AI-generated answers.

This project was developed as part of GENESIS''26, the Amrita Ideathon, under the theme "Where Ideas Become Impact." It was presented as a team project with four members.',
  'Students increasingly rely on AI tools to generate complete answers without engaging in genuine thinking. This cognitive delegation undermines learning depth, problem-solving skill development, and intellectual independence.',
  'The growing availability of powerful AI tools creates a real risk of shortcutting the learning process. CogniGuard asks: what if AI could actively support thinking rather than replace it?',
  'The team developed a concept and working prototype that demonstrates the core idea — a guided-learning layer that intercepts direct AI answer requests and instead offers progressive hints, challenges, and reflective prompts.',
  ARRAY[
    'Concept: Guided Learning Mode',
    'Concept: Progressive Hint System',
    'Concept: Independent Challenge Mode',
    'Concept: Learning Session Summary',
    'Concept: AI Mode vs Guided Mode comparison',
    'Working prototype demonstrating the core idea'
  ],
  ARRAY['Python', 'HTML', 'CSS', 'JavaScript', 'AI-assisted design'],
  'AI / EdTech / Ideation and Prototyping',
  'Working concept-demonstration prototype',
  'The current version is a prototype designed to illustrate the concept, not a fully functional learning platform. All listed features are conceptual proposals. User data persistence, full AI integration, and production-level reliability are not yet implemented.',
  'Full platform development with real AI integration, student progress tracking, institutional adoption pathways, and research validation of the guided-learning hypothesis.',
  true, 2, 'published'
);

-- ORBIT
INSERT INTO projects (
  title, slug, short_description, full_description,
  problem_statement, motivation, approach,
  features_implemented, technologies,
  category, current_status,
  limitations, future_scope,
  github_url,
  is_featured, display_order, visibility
) VALUES (
  'Orbit',
  'orbit',
  'An academic planning platform concept designed to help university students organise their academic progress, goals, and study activities.',
  'Orbit is an academic planning platform concept designed to help university students organise their academic progress, goals, and study activities. The current version is a locally runnable prototype with a TypeScript-based interface and several planning modules.',
  'University students often lack a centralised, student-focused tool for managing their academic goals, curriculum progress, and study activities alongside GPA tracking.',
  'As a first-semester student, the challenge of organising academic life across multiple subjects, goals, and activities was immediately apparent. Orbit is a first attempt to build a solution.',
  'Built as a TypeScript-based frontend prototype, Orbit demonstrates the core user interface concepts — a dashboard, curriculum explorer, GPA calculator, and goal planner — using sample data to simulate interactions.',
  ARRAY[
    'Academic dashboard interface',
    'Curriculum exploration module',
    'GPA calculation logic',
    'Goal-planning interface',
    'Study-planning workflows',
    'Sample data and simulated interactions'
  ],
  ARRAY['TypeScript', 'HTML', 'CSS', 'Supabase (schema defined)'],
  'Software Development / Academic Technology',
  'Locally runnable prototype — functionality under development',
  'The current version runs locally only. User-input handling and persistent data functionality are incomplete. The application uses sample data rather than real user data. It is not publicly deployed.',
  'Full deployment with Supabase integration, real user authentication, persistent academic data, curriculum data sourced from actual university records, and mobile-responsive design.',
  'https://github.com/SayantikaRacha/orbit-amrita-planner',
  true, 3, 'published'
);

-- PYTHON DIARY APP
INSERT INTO projects (
  title, slug, short_description, full_description,
  problem_statement, features_implemented, technologies,
  category, current_status,
  github_url,
  is_featured, display_order, visibility
) VALUES (
  'Python Diary App',
  'python-diary',
  'A simple command-line diary application built with Python — an early practical programming project.',
  'A simple command-line diary application developed using Python. It allows users to add, view, and delete diary entries through a menu-driven interface. This was an early practical programming project that applied core Python concepts to a real, usable tool.',
  'Learning programming through theory alone is insufficient. The diary app was built as a practical first project to apply Python fundamentals to something genuinely usable.',
  ARRAY[
    'Add diary entries',
    'View all entries',
    'Delete entries',
    'File-based storage using diary.txt',
    'Menu-driven command-line interaction'
  ],
  ARRAY['Python', 'File handling', 'Object-oriented programming concepts'],
  'Python / Beginner Software Development',
  'Completed',
  'https://github.com/SayantikaRacha/python-diary-app',
  false, 4, 'published'
);

-- ============================================================
-- EDUCATION
-- ============================================================
INSERT INTO education (
  institution, degree, branch,
  start_year, expected_graduation_year, current_semester,
  description, is_current, display_order
) VALUES (
  'Amrita Vishwa Vidyapeetham, Coimbatore',
  'Bachelor of Technology',
  'Computer Science and Engineering — Core',
  2026, 2030, 1,
  'Currently pursuing a four-year undergraduate degree in Computer Science and Engineering at Amrita Vishwa Vidyapeetham, Coimbatore. Engaged in core CSE curriculum alongside self-directed learning through personal projects and experiments.',
  true, 1
);

-- ============================================================
-- EXPERIENCE
-- ============================================================
INSERT INTO experiences (
  organisation, role, experience_type,
  description, is_current, is_visible, display_order
) VALUES (
  'In-Amigos Foundation',
  'Copywriting Intern',
  'Internship',
  'Completed a copywriting internship with In-Amigos Foundation.',
  false, true, 1
);

-- ============================================================
-- ACHIEVEMENTS
-- ============================================================
INSERT INTO achievements (
  title, organisation, event_date,
  description, role, achievement_type,
  is_visible, display_order
) VALUES (
  'GENESIS''26 — Amrita Ideathon Participant',
  'Amrita Vishwa Vidyapeetham',
  '2026-10-10',
  'Participated in GENESIS''26, the Amrita Ideathon, under the theme "Where Ideas Become Impact." Led a team of four in developing and presenting the CogniGuard concept — an AI-guided learning system designed to address cognitive delegation in student learning.',
  'Team Leader',
  'Hackathon/Ideathon',
  true, 1
);

-- ============================================================
-- SOCIAL LINKS
-- ============================================================
INSERT INTO social_links (platform, display_name, url, icon_name, is_visible, display_order) VALUES
  ('GitHub', 'SayantikaRacha', 'https://github.com/SayantikaRacha', 'github', true, 1),
  ('LinkedIn', 'Sayantika Das', 'https://www.linkedin.com/in/sayantika-das-a623043b2/', 'linkedin', true, 2);
