# 🏗️ Technical Architecture Document — NoviCodes

> **Version:** 2.5.0  
> **Status:** Production Active & Verified  
> **Framework:** Astro 5.x (Static Site Generation • 129 Production Pages)  
> **Language:** TypeScript 5.x / Modern ES2022 JavaScript  
> **Styling:** Vanilla CSS3 with Custom Token Engine (Zero CSS Framework Runtime)  

---

## 1. System Architecture Overview

NoviCodes utilizes a **Decoupled Static Site Generation (SSG)** architecture powered by Astro, combining zero-runtime server overhead with high-performance client-side interactive modules. All user state (XP, streaks, lesson progress, code drafts, certificate names) resides strictly in the client's **HTML5 Web Storage (`localStorage`)**.

```
+-----------------------------------------------------------------------------------------+
|                                    BROWSER RUNTIME                                      |
|                                                                                         |
|  +-----------------------------------------------------------------------------------+  |
|  |                               PRESENTATION LAYER                                  |  |
|  |     Astro 5 SSG (129 Pages) • BaseLayout • LessonLayout • PlatformHeader/Footer    |  |
|  |     UserProfileModal Hub • DailyQuests Modal • Certificate Canvas Generators       |  |
|  +-----------------------------------------------------------------------------------+  |
|                                            |                                            |
|  +-----------------------------------------------------------------------------------+  |
|  |                                DOJO ENGINE LAYER                                  |  |
|  |     src/scripts/dojo/                                                             |  |
|  |     ├── index.ts              (Unified DojoEngine Facade API)                     |  |
|  |     ├── core/                                                                     |  |
|  |     │   ├── checklist.ts      (Real-time Rule & Task State Evaluator)             |  |
|  |     │   ├── persistence.ts    (Keystroke Auto-Save, History Stack, Reset Safety)  |  |
|  |     │   ├── progress.ts       (Confetti, Idempotent XP Bounty, Next Unlocker)     |  |
|  |     │   └── protection.ts     (Anti-tampering Gatekeeper & Locked Overlay)        |  |
|  |     └── linters/                                                                  |  |
|  |         ├── html.ts           (HTML Tag Balance & Syntax Diagnostic Engine)       |  |
|  |         ├── css.ts            (CSS Curly Brace & Syntax Analyzer)                 |  |
|  |         ├── js.ts             (JavaScript AST & Syntax Validator)                 |  |
|  |         ├── react.ts          (JSX & React Component Linter)                      |  |
|  |         ├── python.ts         (Python Indentation & Syntax Validator)             |  |
|  |         └── sql.ts            (SQL Keyword & Query Structure Linter)              |  |
|  +-----------------------------------------------------------------------------------+  |
|                                            |                                            |
|  +-----------------------------------------------------------------------------------+  |
|  |                           FOUNDATIONS & REFERENCE ENGINE                          |  |
|  |     public/foundations.js • public/data/ (13 Track Data Modules)                  |  |
|  |     ├── Instant Real-Time Search & Keyword Filter Engine (Concepts & Glossary)    |  |
|  |     ├── Active Tab URL State Preservation Engine (?track=...&tab=...)             |  |
|  |     ├── Interactive Code Sandbox with SweetAlert Reset Protection                 |  |
|  |     └── 13 Hands-On Knowledge Check Quizzes with +300 XP Confetti Celebrations    |  |
|  +-----------------------------------------------------------------------------------+  |
|                                            |                                            |
|  +-----------------------------------------------------------------------------------+  |
|  |                           GAMIFICATION & XP ENGINE                                |  |
|  |     src/scripts/xpEngine.ts • Rank Progression Engine • Daily Quests Engine       |  |
|  |     Anti-Farming XP Protection • DevKit Master Switch Controller                  |  |
|  +-----------------------------------------------------------------------------------+  |
|                                            |                                            |
|  +-----------------------------------------------------------------------------------+  |
|  |                           CLIENT-SIDE STORAGE LAYER                               |  |
|  |     HTML5 localStorage • sessionStorage • High-DPI Canvas 2D Rendering           |  |
|  +-----------------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Directory Structure & Codebase Layout

```text
CodeRoots/
├── public/                     # Static assets served directly at root
│   ├── assets/                 # Favicons, brand logo, OpenGraph social card
│   ├── data/                   # 13 Foundations Curriculum Data Modules
│   │   ├── level1_html.js      # Level 1 HTML Structure Data
│   │   ├── level2_css.js       # Level 2 CSS Box Model & Flexbox Data
│   │   ├── level3_js.js        # Level 3 Modern JS ES6+ Data
│   │   ├── level5_react.js     # Level 5 React Framework Data
│   │   ├── level6_python.js    # Level 6 Python Backend Data
│   │   ├── level7a_cloud.js    # Level 7A Cloud & DevOps Data
│   │   ├── level7b_sql.js      # Level 7B PostgreSQL Database Data
│   │   ├── level7c_nextjs.js   # Level 7C Next.js App Router Data
│   │   ├── level7d_typescript.js # Level 7D TypeScript Data
│   │   ├── level7e_cssmotion.js # Level 7E CSS Motion Data
│   │   ├── level8_async.js     # Level 8 Async UI & Skeletons Data
│   │   ├── level9_auth.js      # Level 9 Auth & Security Data
│   │   └── level10_saas.js     # Level 10 SaaS Architecture Data
│   ├── foundations.css         # Foundations Academy & Sandbox Stylesheet
│   ├── foundations.js          # Foundations Tab, Search & Quiz Client Script
│   ├── daily-quests.js         # Daily Quests & Streak Rewards Controller
│   └── scripts/dashboard.js    # Homepage Modal Hub, DevKit & GSAP Animations
├── src/
│   ├── components/             # Reusable Astro UI Components
│   │   ├── PlatformHeader.astro# Global Navigation Bar & Adaptive Jump Menu
│   │   ├── PlatformFooter.astro# Global Platform Footer
│   │   └── UserProfileModal.astro # Universal Rank, Quests, DevKit & Reset Hub
│   ├── layouts/                # Core Astro Page Layouts
│   │   ├── BaseLayout.astro    # Universal Root Layout & Global CSS Injection
│   │   └── LessonLayout.astro  # 50/50 Dual-Lane IDE Workspace Layout
│   ├── pages/                  # 129 File-Based Static Routes
│   │   ├── index.astro         # Main Platform Skill Tree Dashboard
│   │   ├── foundations.astro   # 13-Track Interactive Foundations Academy
│   │   ├── 1. partA/           # Level 0 Web History & Pillars (6 Pages)
│   │   ├── 2. partB/           # Level 4 DOM Dojo (15 Lessons + Cert)
│   │   ├── 3. partC/           # Level 5 React Dojo (15 Lessons + Cert)
│   │   ├── 4. partD/           # DevType Dojo Speedrun Arcade
│   │   ├── 5. partE/           # Level 6 Python Dojo (15 Lessons + Cert)
│   │   ├── 6. partF/           # Level 7 Specialization (40 Lessons + Cert)
│   │   │   ├── branchA/        # 7A: Cloud & DevOps (6 Lessons)
│   │   │   ├── branchB/        # 7B: SQL & Databases (6 Lessons)
│   │   │   ├── branchC/        # 7C: Next.js (6 Lessons)
│   │   │   ├── branchD/        # 7D: TypeScript (12 Lessons)
│   │   │   └── branchE/        # 7E: CSS Motion (10 Lessons)
│   │   ├── 7. partG/           # Level 8 Async UI Dojo (6 Lessons + Cert)
│   │   ├── 8. partH/           # Level 9 Auth & Security Dojo (6 Lessons + Cert)
│   │   ├── 9. partI/           # Level 10 Apex SaaS Capstone (6 Lessons + Diploma)
│   │   ├── 404.astro           # Smart Heuristic 404 Recovery Engine
│   │   ├── privacy.astro       # Privacy Policy (Zero Tracking)
│   │   └── terms.astro         # Terms of Service
│   ├── scripts/                # Shared TypeScript Modules
│   │   ├── xpEngine.ts         # XP formulas, rank calculations, streak sync
│   │   └── dojo/               # Core Dojo Engine Subsystems
│   │       ├── index.ts        # Master DojoEngine Facade API
│   │       ├── types.ts        # TypeScript Interfaces & Diagnostic Types
│   │       ├── core/           # Core subsystems (checklist, persistence, progress, protection)
│   │       └── linters/        # Syntax & AST diagnostics (HTML, CSS, JS, React, Python, SQL)
│   └── styles/                 # Global Design System
│       ├── root.css            # CSS variables, typography, colors, resets
│       ├── dashboard.css       # Roadmap cards, grid layouts, mobile controls
│       └── lesson.css          # Dual-lane IDE, terminal, checklists, mobile breakpoints
├── astro.config.mjs            # Astro Build Configuration
├── tsconfig.json               # TypeScript Compiler Configuration
└── package.json                # NPM Scripts & Dependencies
```

---

## 3. Core Subsystems

### 3.1 `src/scripts/dojo/index.ts` (Master DojoEngine Facade)
Aggregates all dojo subsystems into a unified `DojoEngine` namespace:
- `DojoEngine.initChecklist(tasks, opts)`: Mounts task rules and renders checklist items with real-time feedback.
- `DojoEngine.runChecklist(code)`: Real-time evaluator called on every editor keystroke.
- `DojoEngine.lint(code, mode)`: Real-time syntax, tag balance, and compiler diagnostic analyzer.
- `DojoEngine.verifySubmission(code, opts)`: Validates code, awards idempotent XP, triggers confetti, updates `localStorage`, and opens the celebration modal.
- `DojoEngine.setupDraftPersistence(...)`: Manages debounced local storage draft sync with full Undo/Redo stack.
- `DojoEngine.setupResetButton(...)`: Safe code reset modal handler with SweetAlert2 confirmation.

### 3.2 `src/scripts/dojo/core/protection.ts` (Sequential Access Control)
- `canAccessLesson(track, lessonNum)`: Verifies all prerequisite lessons $(1 \dots N-1)$ evaluate to `true` in `localStorage`.
- `checkLessonAccessAndRenderOverlay(opts)`: Client-side gatekeeper mounted on every lesson page. If a learner tampers with the URL, it mounts an unclosable full-screen overlay redirecting them to their highest unlocked lesson.
- `isCertificateAccessible(track)`: Verifies $100\%$ track completion before allowing access to certificate generators.

### 3.3 `src/scripts/xpEngine.ts` (Universal Gamification)
Calculates total XP from all sources:
$$\text{Total XP} = \text{L0 XP} + \text{L1-3 XP} + \text{L4 XP} + \text{L5 XP} + \text{L6 XP} + \text{L7 XP} + \text{L8 XP} + \text{L9 XP} + \text{L10 XP} + \text{Daily Quests} + \text{Streak Bonuses}$$
- Dispatches custom `novicodes:xp_updated` events for reactive zero-refresh badge hydration across all open tabs.
- Includes idempotent bounty protection to prevent duplicate farming upon re-submitting solved challenges.

---

## 4. Live Preview & Sandboxing Architecture

For Web & React lessons (`partB`, `partC`, `partG`, `partH`, `partI`):
1. User input from `<textarea id="lessonEditor">` is compiled into a self-contained HTML document.
2. Injected into `<iframe id="livePreviewIframe" sandbox="allow-scripts allow-modals allow-same-origin">` via `.srcdoc`.
3. React lessons include React 18, ReactDOM, and Babel Standalone in the iframe header for browser-native JSX transpilation.
4. Python lessons (`partE`) execute via simulated interactive backend runtimes capturing `stdout` and streaming directly to `#terminalScreen`.

---

## 5. Build & Deployment Architecture

- **Static Generation:** Built via `npm run build` (`astro build`).
- **Static Artifacts:** Outputs 129 standard HTML, CSS, and JS files to `dist/`.
- **Hosting Compatibility:** 100% serverless static deployment (Vercel, Cloudflare Pages, GitHub Pages, Netlify, AWS S3/CloudFront). Zero server-side runtime, zero database operational cost.

