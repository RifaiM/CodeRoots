# NoviCodes - Master Product Requirements Document (PRD)

**Version**: 3.0  
**Status**: Production-Ready  
**Product Vision**: A zero-barrier, interactive web development learning platform that takes beginners from complete zero to shipping fullstack applications—100% free, responsive down to 320px viewports, and built with zero eye-strain editorial design and real-time interactive feedback.

---

## 🎯 1. Target Audience & Core Personas

### 1.1 Non-Tech Beginners & Career Changers
- **Profile**: Zero prior coding experience, easily intimidated by command-line setups, environment variables, or complex framework jargon.
- **Goal**: Understand *how the web actually works* through visual analogies and instant hands-on practice without installing software.

### 1.2 Self-Taught Developers & AI-Era Learners
- **Profile**: Has tried using AI coding tools (Cursor, ChatGPT) but lacks deep structural understanding when code breaks or requires integration.
- **Goal**: Master underlying fundamentals (DOM, CSS Box Model, Async JS, APIs, SQL, Next.js, Cloud Deployment) so they can effectively inspect, debug, and architect software.

---

## 🗺️ 2. Core Curriculum Roadmap & Learning Tracks (79+ Lessons)

NoviCodes is structured into 8 progressive, sequential learning levels:

```
[ Level 0: Web Concepts & Mental Models ] (250 XP)
  └── Web History & Architecture, Client/Server, DNS, HTTP, 4 Core Pillars

[ Levels 1–3: Web Foundations ] (1,000 XP)
  ├── Level 1: HTML5 Structural Mastery (300 XP)
  ├── Level 2: Modern CSS3 & Utility Styling (300 XP)
  └── Level 3: Modern JavaScript & ES6+ (400 XP)

[ Level 4: DOM Dojo ] (1,500 XP)
  └── 🏆 15 Real-World Interactive DOM Projects (100 XP / lesson)

[ Level 5: Framework Dojo (React.js) ] (2,250 XP)
  └── ⚛️ 15 React Component & State Management Projects (150 XP / lesson)

[ Level 6: Backend Dojo (Python & FastAPI) ] (3,000 XP)
  └── 🐍 15 Python & Backend API Engineering Projects (200 XP / lesson)

[ Level 7: Fullstack Mastery Hub ] (4,500 XP)
  ├── ☁️ Track 7A: Cloud Shipping & Edge Deployments (6 Lessons · 250 XP each)
  ├── 🛢️ Track 7B: Cloud Databases, SQLAlchemy & Auth (6 Lessons · 250 XP each)
  └── ⚡ Track 7C: Next.js App Router & Fullstack (6 Lessons · 250 XP each)

[ Capstone Quizzes & Profile ]
  ├── 🎯 Developer Archetype Quiz (Part D)
  └── 🔥 Daily 2-Minute Quests & Streaks (50 XP / daily warmup)
```

---

## ⚙️ 3. Core Functional Requirements

### 3.1 Instant In-Browser Execution Playground
- **Zero-Setup Execution**: Users write code and see live results instantly (<50ms delay).
- **Multi-Language Engine Support**:
  - HTML/CSS/JS ──> Native Sandboxed `<iframe>`
  - React.js ──> Client-side reactive JSX evaluation
  - Python & Backend ──> In-browser Python AST validator & linter
  - SQL & Next.js ──> Real-time syntax inspection with multi-task checklist validation

### 3.2 Dynamic Interactive Workspace
- **Split Workspace**: Step-by-Step Instructions + Live Code Editor + Terminal/Preview Output.
- **Live Task Checklists**: Real-time checklist items transition from `⬜` to `✅` as the learner completes each coding requirement.
- **Mobile Viewport Segmented Control (320px/375px)**: Switches between `[ 📖 Guide | 💻 Code | 👁️ Preview ]` without vertical scrolling death spirals.

### 3.3 Access Protection & Progression Engine
- **Sequential Lesson Gating**: Lessons are strictly gated sequentially (Lesson N requires Lesson N-1 completion).
- **Dark-Glass Access Denied Modal**: Directs users to the highest accessible lesson or the dashboard if they attempt to bypass via URL editing.
- **Developer Toolkit (DevKit)**:
  - `Ctrl + Alt + D` or 5-click logo shortcut toggles Developer Mode (Unlock All $\leftrightarrow$ Lock All with true 0 XP reset).
  - Console API: `window.NoviCodes.unlockAll()`, `lockAll()`, `maxXP()`, `status()`.

### 3.4 Progress Engine & Achievement System
- **Gamified XP & Developer Rank Ladder**: 11 rank tiers from *Web Novice* 🌱 to *Principal Polymath* 👑 (Max 12,500+ XP).
- **Daily Retention Loop**: Daily 2-Minute Warmup Quests with streak tracking, bonus XP milestones, and streak freezes.
- **Learner Profile Modal**: Accessible on every page navbar showing live XP, Level-by-Level progress, and complete rank roadmap.
- **Reset Safety**: *"🔄 Reset Course Progress"* with warning confirmation to wipe progress and daily quest XP back to true 0 XP.

---

## 🛡️ 4. Non-Functional Requirements & UX Constraints

| Requirement | Specification |
|---|---|
| **Operational Budget** | **$0.00 / month forever** (100% Free Stack on Static CDN). |
| **Mobile Responsiveness** | Flawless UX down to **320px & 375px viewports**; zero layout breaking. |
| **Page Performance** | Lighthouse Score ≥ 95 across Performance, Accessibility, and SEO. |
| **Typography & Assets** | Google Fonts (*Plus Jakarta Sans*, *Nunito*, *Fira Code*) standardized across all 79 pages. |
| **Resilient Error Recovery** | Custom 404 page with 11-route auto-recovery suggestions and relative depth resolution. |
