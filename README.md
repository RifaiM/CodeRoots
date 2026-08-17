# 🌲 CodeRoots (NoviCodes)

> **Master Fullstack Web Development by Doing, Not Just Watching.**  
> 100% Client-Side, Browser-Native Coding Academy with 103 Hands-On Challenges, 13 Foundations Tracks, and 7 Verified Proof-of-Work Certificates.

---

## 🌟 Platform Highlights

- ⚡ **Zero Setup & Installation:** Code, lint, execute, and preview in real-time right inside your browser. No terminal, bundler, or Docker configuration required.
- 🔓 **100% Free & Open:** No paywalls, subscription fees, or account lockouts. All progress and code drafts persist safely in your browser via `localStorage`.
- 🧠 **Analogy-First Pedagogy:** Every lesson pairs abstract programming concepts with intuitive real-world metaphors, step-by-step checklist missions, and visual target outputs.
- 📜 **Verified Proof-of-Work Certificates:** Earn 7 cryptographic-style, high-resolution Canvas certificates with verified hashes and printable landscape formatting.
- 🎮 **Gamified Developer Journey:** Earn XP bounties, maintain daily coding streaks, and rank up from *Web Explorer* to *Master Web Developer*.

---

## 🗺️ Curriculum Overview (Levels 0 through 10)

```
[ Level 0: Web History & Concepts ] ──► [ Levels 1-3: HTML/CSS/JS Foundations ] ──► [ Level 4: DOM Widget Dojo (15 Projects) ]
                                                                                               │
[ Level 6: Python Backend Dojo (15 Projects) ] ◄── [ Level 5: React Component Dojo (15 Projects) ] ◄┘
         │
         ▼
[ Level 7: Specialization Hub (40 Projects across 5 Specialization Tracks) ]
  ├── ☁️ Track 7A: Cloud Systems & DevOps (6 Projects)
  ├── 🛢️ Track 7B: PostgreSQL & Database Architecture (6 Projects)
  ├── ⚡ Track 7C: Next.js App Router & Server Components (6 Projects)
  ├── 🔷 Track 7D: TypeScript Mastery (12 Projects)
  └── 🎨 Track 7E: CSS Motion & Micro-Interactions (10 Projects)
         │
         ▼
[ Level 8: Async UI & Error Boundaries Dojo (6 Projects) ]
         │
         ▼
[ Level 9: Authentication & Security Architecture Dojo (6 Projects) ]
         │
         ▼
[ Level 10: Apex SaaS Fullstack Production Capstone (6 Enterprise Milestones) ]
```

---

## 💻 Tech Stack & Architecture

- **Core Framework:** [Astro 5](https://astro.build/) (Static Site Generation • 129 Production Pages)
- **Language & Runtime:** TypeScript 5.x / Modern ES2022 JavaScript
- **Styling Engine:** Vanilla CSS3 with Harmonious HSL/HEX Design Tokens (Zero Tailwind dependency)
- **IDE Engine (`src/scripts/dojo/`):**
  - **Checklist Engine:** Real-time DOM & syntax validation with live reactive progress pills.
  - **Diagnostic Linters:** AST parsing, syntax validation, and regex error pinpointing for HTML, CSS, JS, React, Python, SQL, and TypeScript.
  - **Editor Persistence:** Automatic draft persistence on every keystroke with full `Ctrl+Z` (Undo), `Ctrl+Y` (Redo), and `Tab` indentation.
  - **Safety Features:** Reset confirmation dialogs, universal code snippet copy with visual feedback, and anti-farming idempotent XP awards.
- **UI & Celebrations:** SweetAlert2, Canvas-Confetti, GSAP Micro-animations.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation & Commands

```bash
# 1. Install dependencies
npm install

# 2. Start Astro development server (in background mode as per AGENTS.md)
astro dev --background

# 3. View development server status or logs
astro dev status
astro dev logs

# 4. Stop development server
astro dev stop

# 5. Build for production (compiles all 129 static pages into dist/)
npm run build

# 6. Preview production build locally
npm run preview
```

---

## 🧪 Comprehensive Quality & Test Suites

NoviCodes includes an exhaustive, multi-phase automated test runner:

```bash
# Run full platform stress, link integrity, and security audit
node scratch/run_full_stress_and_security_suite.mjs
```

### Verified Test Matrix:
- **Phase 1:** Track 7D (TypeScript) & Track 7E (CSS Motion) Deep Verification (452 assertions).
- **Phase 2:** Exhaustive Platform Link Crawler across all 129 pages (4,741 internal links verified with 0 broken links).
- **Phase 3:** Gamification, Streak & LocalStorage Stress Engine (20 edge-case tests).
- **Phase 4:** Security, Certificate Injection & Hardcoded Secret Scan (729 checks).
- **Master Suite:** 129 HTML Pages DOM & 13 Foundations Data Modules (2,085 assertions).

---

## 📁 Repository Structure

```text
CodeRoots/
├── public/                     # Static assets, track data, and shared scripts
│   ├── assets/                 # Favicons, logo, social graph images
│   ├── data/                   # 13 Foundations curriculum data modules
│   ├── foundations.css         # Foundations Academy & Sandbox stylesheet
│   ├── foundations.js          # Foundations tab navigation & search engine
│   └── scripts/dashboard.js    # Homepage interactive modal hub & DevKit
├── src/
│   ├── components/             # Reusable Astro UI components
│   │   ├── PlatformHeader.astro# Global Navigation Bar & Jump Menu
│   │   ├── PlatformFooter.astro# Global Platform Footer
│   │   └── UserProfileModal.astro # Rank, Quests, DevKit & Reset Hub
│   ├── layouts/                # Base & Lesson Layouts
│   │   ├── BaseLayout.astro    # Universal Root Layout & Global CSS
│   │   └── LessonLayout.astro  # 50/50 Dual-Lane IDE Workspace Layout
│   ├── pages/                  # 129 File-Based Routes
│   │   ├── index.astro         # Main Skill Tree Dashboard
│   │   ├── foundations.astro   # 13-Track Interactive Foundations Reference
│   │   ├── 1. partA/           # Level 0 Web History & Pillars (6 pages)
│   │   ├── 2. partB/           # Level 4 DOM Dojo (15 Lessons + Cert)
│   │   ├── 3. partC/           # Level 5 React Dojo (15 Lessons + Cert)
│   │   ├── 4. partD/           # DevType Dojo Arcade Speedrun
│   │   ├── 5. partE/           # Level 6 Python Dojo (15 Lessons + Cert)
│   │   ├── 6. partF/           # Level 7 Specialization (40 Lessons + Cert)
│   │   ├── 7. partG/           # Level 8 Async UI Dojo (6 Lessons + Cert)
│   │   ├── 8. partH/           # Level 9 Auth & Security Dojo (6 Lessons + Cert)
│   │   ├── 9. partI/           # Level 10 Apex SaaS Capstone (6 Lessons + Diploma)
│   │   ├── 404.astro           # Smart Heuristic 404 Recovery Engine
│   │   ├── privacy.astro       # Zero-Data Tracking Privacy Policy
│   │   └── terms.astro         # Terms of Service
│   ├── scripts/dojo/           # Core Dojo Engine Architecture (TypeScript)
│   │   ├── index.ts            # Public API aggregator
│   │   ├── core/               # Engine modules (checklist, persistence, progress, protection)
│   │   └── linters/            # Language diagnostics (HTML, CSS, JS, React, Python, SQL, TS)
│   └── styles/                 # Global CSS tokens and styles
│       ├── root.css            # Base tokens, fonts, resets, SweetAlert
│       ├── dashboard.css       # Roadmap, cards, mobile segmented controls
│       └── lesson.css          # Dual-lane IDE, terminal, checklists, mobile breakpoints
├── astro.config.mjs            # Astro configuration
└── package.json                # Project dependencies and build scripts
```

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.
