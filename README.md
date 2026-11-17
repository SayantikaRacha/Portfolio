# ✦ THE SIA EXPERIENCE — Personal Cinematic Portfolio & CMS
> **Codename: THE SIA EXPERIENCE**  
> A cinematic, Netflix-inspired personal portfolio powered by a secure Supabase backend and personal Admin CMS.

---

## 🌟 Overview

**Sayantika's Cinematic Portfolio** is a dual-tier web application:
1. **Public Portfolio**: A cinematic dark-mode experience featuring an intro curtain, perspective lenses (Developer, Creative Tech, Explore Everything), dynamic projects showcase, confirmed skills matrix, verified credentials & certificates viewer, AI research lab, academic journey, and contact hub.
2. **Private Admin Dashboard (`/#/admin`)**: A self-manageable personal Content Management System (CMS) enabling complete control over projects, certificates, resume, profile information, and website visibility toggles without editing source code or redeploying.

---

## 🎨 Design System

- **Primary Background**: `#080A10`
- **Secondary Background**: `#111622`
- **Card Background**: `#171D2A`
- **Primary Accent**: `#4169E1` (Royal Blue)
- **Accent Hover**: `#5B82FF`
- **Muted Violet**: `#684A9E`
- **Primary Text**: `#EDEAF5`
- **Secondary Text**: `#A8AFC1`
- **Typography**: Space Grotesk (Headings), Inter (Body), Playfair Display (Editorial accents)

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+ (tested with Node 20 & 26)
- npm or pnpm

### 2. Installation
```bash
cd sia-portfolio
npm install
```

### 3. Run Locally
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.  
The portfolio will immediately load with built-in default content matching Sayantika's projects and profile.

### 4. Build for Production
```bash
npm run build
```
Generates optimized static assets in `dist/`.

---

## 🔐 Supabase Backend Setup (Complete Guide)

Follow these steps to connect your live Supabase database and enable full Admin CMS persistence:

### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in or create a free account.
2. Click **New Project**.
3. Choose a name (e.g., `sia-portfolio`) and database password.
4. Select your preferred region (e.g., `ap-south-1` Mumbai or `ap-southeast-1` Singapore).

### Step 2: Run Database Schema & Migration
1. In your Supabase Dashboard, click on **SQL Editor** in the left sidebar.
2. Click **New query**.
3. Copy the contents of [`supabase/schema.sql`](./supabase/schema.sql) and paste into the editor.
4. Click **Run**.  
   *This creates all 14 tables, triggers, and Row Level Security (RLS) policies.*

### Step 3: Run Seed Data
1. In the SQL Editor, create another new query.
2. Copy the contents of [`supabase/seed.sql`](./supabase/seed.sql) and paste into the editor.
3. Click **Run**.  
   *This populates your database with initial data for Lumière, CogniGuard, Orbit, Python Diary, confirmed personal skills, Amrita education, and social links.*

### Step 4: Create Storage Buckets
In the Supabase Dashboard, go to **Storage** and create the following buckets (set to **Public** so assets can be viewed on your portfolio):
- `profile-images`
- `project-covers`
- `project-gallery`
- `certificates`
- `resumes`
- `experience-media`
- `ai-lab-media`

### Step 5: Configure Admin User Authentication
1. Go to **Authentication** > **Users** in your Supabase Dashboard.
2. Click **Add user** > **Create user**.
3. Enter your administrator email and a strong password.
4. Copy the newly created user's **User UID** (UUID).
5. Go back to the **SQL Editor** and run:
```sql
INSERT INTO admin_users (user_id, email)
VALUES ('<PASTE-YOUR-USER-UID-HERE>', '<YOUR-ADMIN-EMAIL-HERE>');
```
*This authorizes your account in the administrator allowlist.*

### Step 6: Set Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your credentials from **Project Settings** > **API**:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 🌐 Deploying to GitHub & GitHub Pages

### Option A: Automated GitHub Actions (Recommended)
1. Initialize git inside `sia-portfolio` (or your root repo):
```bash
git init
git add .
git commit -m "Initial release of THE SIA EXPERIENCE portfolio"
```
2. Create a new GitHub repository named `sia-portfolio` (or `portfolio`) on [github.com/new](https://github.com/new).
3. Link and push your repository:
```bash
git remote add origin https://github.com/SayantikaRacha/sia-portfolio.git
git branch -M main
git push -u origin main
```
4. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
   - (Optional) Under **Settings** > **Secrets and variables** > **Actions**, add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. The included workflow `.github/workflows/deploy.yml` will automatically build and deploy the portfolio to `https://SayantikaRacha.github.io/sia-portfolio/`!

### Option B: Deploying with `gh-pages`
```bash
npm install -D gh-pages
# Add "deploy": "gh-pages -d dist" to package.json scripts
npm run build
npm run deploy
```

---

## 🛡️ Admin Dashboard Features

Navigate to `/#/admin` to access the personal control center:

| Section | Capabilities |
|---|---|
| **Overview** | Real-time metric cards (total projects, drafts, certs, skills), quick actions, activity log |
| **Profile** | Name, title, biography, academic status, avatar upload with instant preview |
| **Projects** | Full CRUD, markdown description, problem/motivation/approach, multi-screenshot gallery, draft/published visibility toggle |
| **Skills** | Confirmed personal skills only; proficiency level tags (Intermediate, Foundational, etc.); dynamic categories |
| **Certificates** | PDF / PNG / JPG / WebP direct file upload, issuer verification links, public credential card |
| **Experience** | Internships and positions, responsibilities, date ranges |
| **Education** | University degree, coursework breakdown, graduation projections |
| **AI Lab** | AI experiments, prompt engineering explorations, live links |
| **Achievements** | Hackathons (GENESIS'26), ideathons, competitions, roles and outcomes |
| **Social Links** | GitHub, LinkedIn, custom platform link management |
| **Resume & Files** | Resume PDF upload, active resume assignment, auto-updating download buttons |
| **Settings** | Website title, hero copywriting, global section visibility toggles |

---

## 📁 Project Structure

```
sia-portfolio/
├── .github/workflows/deploy.yml  # Automated GitHub Pages CI/CD
├── public/
│   ├── favicon.svg               # Sleek royal-blue emblem
│   └── sayantika.jpg             # User portrait
├── src/
│   ├── assets/                   # Static assets
│   ├── components/
│   │   ├── admin/                # AdminLayout, ProtectedRoute, FileUpload, Toast, ConfirmDialog
│   │   ├── icons/                # Clean SVG Brand icons (Github, Linkedin, Instagram, Youtube)
│   │   └── public/               # IntroScreen, ProfileSelector, PublicLayout
│   ├── contexts/                 # AuthContext (Supabase authentication session)
│   ├── lib/
│   │   ├── api.ts                # Resilient data layer with Supabase + fallback defaults
│   │   └── supabase.ts           # Supabase client & strongly-typed schema models
│   ├── pages/
│   │   ├── admin/                # 11 Admin CMS control pages
│   │   └── public/               # 8 Cinematic public portfolio pages
│   ├── styles/
│   │   └── global.css            # Dark theme, royal-blue variables, animations
│   ├── App.tsx                   # HashRouter routing & perspective view state
│   └── main.tsx                  # Application entry point
├── supabase/
│   ├── schema.sql                # Complete PostgreSQL schema with RLS security
│   └── seed.sql                  # Seed data for projects, skills, education
├── .env.example                  # Environment variable template
└── package.json                  # Dependencies & build scripts
```

---

## 📄 License
Created with curiosity by Sayantika © 2026.
