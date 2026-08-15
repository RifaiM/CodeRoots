# 🏗️ Technical Architecture Document — NoviCodes

> **Version:** 2.0.0  
> **Status:** Production Active  
> **Framework:** Astro 4.x (Static Site Generation • 107 Pages)  
> **Language:** TypeScript 5.x / Modern ES2022 JavaScript  
> **Styling:** Vanilla CSS3 with Custom Token Engine  

---

## 1. System Architecture Overview

NoviCodes utilizes a **Decoupled Static Site Generation (SSG)** architecture powered by Astro, combining zero-runtime overhead with high-performance client-side interactive modules. All user state (XP, streaks, lesson progress, code drafts, certificate names) resides strictly in the client's **HTML5 Web Storage (`localStorage`)**.

```
+-----------------------------------------------------------------------+
|                           BROWSER RUNTIME                             |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  |                       PRESENTATION LAYER                        |  |
|  |   Astro SSG Templates • BaseLayout • LessonLayout • Header/Modals  |  |
|  +-----------------------------------------------------------------+  |
|                                  |                                    |
|  +-----------------------------------------------------------------+  |
|  |                       DOJO ENGINE LAYER                         |  |
|  |   src/scripts/dojo/                                             |  |
|  |   ├── engine.ts       (Master Coordinator & Verification Action)|  |
|  |   ├── checklist.ts    (Real-time Rule & Task State Evaluator)   |  |
|  |   ├── diagnostics.ts  (Intelligent AST/Syntax Error Highlighter)|  |
|  |   ├── protection.ts   (Anti-tampering & Access Gatekeeper)      |  |
|  |   └── state.ts        (Draft Persistence & Reset Controller)    |  |
|  +-----------------------------------------------------------------+  |
|                                  |                                    |
|  +-----------------------------------------------------------------+  |
|  |                      GAMIFICATION & XP LAYER                    |  |
|  |   src/scripts/xpEngine.ts • Rank Progression • Daily Quests       |  |
|  +-----------------------------------------------------------------+  |
|                                  |                                    |
|  +-----------------------------------------------------------------+  |
|  |                  CLIENT-SIDE STORAGE LAYER                     |  |
|  |   HTML5 localStorage • sessionStorage • Canvas 2D Rendering     |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

---

## 2. Directory Structure & Codebase Layout

```
3. CodeRoots-refactor/
├── public/                     # Static assets served at root
│   ├── assets/                 # Favicons, illustrations, icons
│   ├── 1. partA/               # Level 0 Web History & Pillars assets/scripts
│   ├── 2. partB/               # Level 4 DOM Dojo Hub styles
│   ├── foundations.js          # Levels 1-3 Foundations Academy client script
│   └── scripts/
│       └── dashboard.js        # Main Dashboard GSAP & DevKit script
├── src/
│   ├── components/             # Reusable Astro UI Components
│   │   ├── PlatformHeader.astro# Global Navigation Bar & Jump Menu
│   │   ├── PlatformFooter.astro# Global Platform Footer
│   │   └── UserProfileModal.astro # Universal Rank & Reset Modal Hub
│   ├── layouts/                # Core Astro Page Layouts
│   │   ├── BaseLayout.astro    # Universal Root Layout & Global CSS
│   │   └── LessonLayout.astro  # Sticky Dual-Lane IDE Workspace
│   ├── pages/                  # File-based Static Routes (107 Pages)
│   │   ├── index.astro         # Main Platform Dashboard
│   │   ├── foundations.astro   # Levels 1-3 Foundations Academy
│   │   ├── 1. partA/           # Level 0 Web History & Pillars
│   │   ├── 2. partB/           # Level 4 DOM Dojo (15 Lessons + Cert)
│   │   ├── 3. partC/           # Level 5 React Dojo (15 Lessons + Cert)
│   │   ├── 4. partD/           # DevType Dojo Speedrun Arcade
│   │   ├── 5. partE/           # Level 6 Python Dojo (15 Lessons + Cert)
│   │   ├── 6. partF/           # Level 7 Specialization (18 Lessons + Cert)
│   │   ├── 7. partG/           # Level 8 API Bridge (6 Lessons + Cert)
│   │   ├── 8. partH/           # Level 9 Auth & DB (6 Lessons + Cert)
│   │   ├── 9. partI/           # Level 10 Apex SaaS (6 Milestones + Diploma)
│   │   ├── 404.astro           # Heuristic 404 Recovery Engine
│   │   ├── privacy.astro       # Privacy Policy (Zero Tracking)
│   │   └── terms.astro         # Terms of Service
│   ├── scripts/                # Shared TypeScript Modules
│   │   ├── xpEngine.ts         # XP formulas, rank calculations, streak sync
│   │   └── dojo/               # Core Dojo Engine Architecture
│   │       ├── index.ts        # Entry point aggregator
│   │       ├── engine.ts       # Unified DojoEngine API
│   │       ├── checklist.ts    # Rule execution & checkbox UI
│   │       ├── diagnostics.ts  # Real-time and on-submit linting
│   │       ├── protection.ts   # Sequential access gating & overlay
│   │       └── state.ts        # Draft saving & reset helpers
│   └── styles/                 # Global Design System
│       ├── root.css            # CSS variables, typography, colors, resets
│       ├── dashboard.css       # Roadmap cards, grid layouts, animations
│       └── lesson.css          # Dual-lane IDE, terminal, checklists, mobile
├── astro.config.mjs            # Astro Build Configuration
├── tsconfig.json               # TypeScript Compiler Configuration
├── package.json                # NPM Scripts & Dependencies
└── [Documentation Files]       # prd.md, architecture.md, rules.md, schema.md, design.md
```

---

## 3. Core Engine Components

### 3.1 `src/scripts/dojo/engine.ts` (Master Facade)
Aggregates all dojo subsystems into a unified `DojoEngine` namespace:
- `DojoEngine.initChecklist(tasks, opts)`: Mounts task rules and renders checklist items.
- `DojoEngine.runChecklist(code)`: Real-time evaluator called on every editor keystroke.
- `DojoEngine.lint(code, mode)`: Real-time syntax and tag balance analyzer.
- `DojoEngine.verifySubmission(code, opts)`: Validates code, awards XP, triggers confetti, updates `localStorage`, and opens the graduation modal.
- `DojoEngine.setupDraftPersistence(...)`: Manages debounced local storage draft sync.
- `DojoEngine.setupResetButton(...)`: Safe code reset modal handler.

### 3.2 `src/scripts/dojo/protection.ts` (Sequential Access Control)
- `canAccessLesson(track, lessonNum)`: Verifies all prerequisite lessons $(1 \dots N-1)$ evaluate to `true` in `localStorage`.
- `checkLessonAccessAndRenderOverlay(opts)`: Client-side gatekeeper mounted on every lesson page. If a learner tampers with the URL, it mounts an unclosable full-screen overlay redirecting them to their highest unlocked lesson.
- `isCertificateAccessible(track)`: Verifies $100\%$ track completion before allowing access to certificate generators.

### 3.3 `src/scripts/xpEngine.ts` (Universal Gamification)
Calculates total XP from all sources:
$$\text{Total XP} = \text{L0 XP} + \text{L1-3 XP} + \text{L4 XP} + \text{L5 XP} + \text{L6 XP} + \text{L7 XP} + \text{L8 XP} + \text{L9 XP} + \text{L10 XP} + \text{Daily Quests} + \text{Streak Bonuses}$$
- Dispatches custom `novicodes:xp_updated` events for reactive zero-refresh badge hydration across all open tabs.

---

## 4. Live Preview & Sandboxing Architecture

For Web & React lessons (`partB`, `partC`, `partG`, `partH`, `partI`):
1. User input from `<textarea id="lessonEditor">` is compiled into a self-contained HTML document.
2. Injected into `<iframe id="livePreviewIframe" sandbox="allow-scripts allow-modals allow-same-origin">` via `.srcdoc`.
3. React lessons include CDN-loaded React 18, ReactDOM, and Babel Standalone in the iframe header for browser-native JSX transpilation.
4. Python lessons (`partE`) execute via simulated interactive backend runtimes capturing `stdout` and streaming directly to `#terminalScreen`.

---

## 5. Build & Deployment Architecture

- **Static Generation:** Built via `npm run build` (`astro build`).
- **Static Artifacts:** Outputs standard HTML, CSS, and JS to `dist/`.
- **Hosting Compatibility:** 100% serverless static deployment (Vercel, Cloudflare Pages, GitHub Pages, Netlify, AWS S3/CloudFront). Zero server-side runtime, zero database operational cost.
