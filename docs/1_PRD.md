# DevDojo - Master Product Requirements Document (PRD)

**Version**: 2.0  
**Status**: Approved  
**Product Vision**: A zero-barrier, interactive web development learning platform that takes beginners from complete zero to shipping fullstack applications—100% free, responsive down to 320px viewports, and built with zero eye-strain editorial design.

---

## 🎯 1. Target Audience & Core Personas

### 1.1 Non-Tech Beginners & Career Changers
- **Profile**: Zero prior coding experience, easily intimidated by command-line setups, environment variables, or complex framework jargon.
- **Goal**: Understand *how the web actually works* through visual analogies and instant hands-on practice without installing software.

### 1.2 Self-Taught Developers & AI-Era Learners
- **Profile**: Has tried using AI coding tools (Cursor, ChatGPT) but lacks deep structural understanding when code breaks or requires integration.
- **Goal**: Master underlying fundamentals (DOM, CSS Box Model, Async JS, APIs) so they can effectively inspect, debug, and architect software.

---

## 🗺️ 2. Core Curriculum Roadmap & Learning Tracks

DevDojo is structured into 8 progressive, expandable learning tracks:

```
[ Level 0: Web Concepts & Mental Models ]
  └── How Websites Work, Client/Server, DNS, HTTP [Part A]

[ Level 1: HTML5 Structural Mastery ]
  └── Elements, Semantic Layouts, Accessibility, Forms & Media

[ Level 2: Modern CSS3 & Utility Styling ]
  ├── 🎨 CSS Box Model, Flexbox & Grid Deep Dive
  └── ⚡ Advanced Styling Sub-tracks: Tailwind CSS | SASS/SCSS

[ Level 3: Modern JavaScript (ES6+) ]
  └── Variables, Functions, DOM Manipulation, Events, Fetch API & Async/Await

[ Level 4: Integrated Practical Dojo ]
  └── 🏆 15 Real-World Integrated HTML/CSS/JS Projects [Part B]

[ Level 5: Modern Frontend Frameworks ]
  ├── ⚛️ React.js Core (JSX, Components, Hooks, State)
  └── 🚀 Next.js (App Router, Server Components, SSR)

[ Level 6: Web Backend with Python ]
  └── 🐍 Python Syntax ──> Web APIs with Flask / FastAPI (WASM Executed)

[ Level 7: Cloud & Shipping Code ]
  └── ☁️ Git & GitHub Basics ──> Vercel / Netlify / Cloudflare Deployment
```

---

## ⚙️ 3. Core Functional Requirements

### 3.1 Instant In-Browser Execution Playground
- **Zero-Setup Execution**: Users write code and see live results instantly (<50ms delay).
- **Multi-Language Engine Support**:
  - HTML/CSS/JS ──> Native Sandboxed `<iframe>`
  - React/Vue ──> In-browser compilation (Sandpack/Babel)
  - Python ──> WebAssembly Pyodide engine

### 3.2 Dynamic Interactive Workspace
- **Split Workspace**: Instructions + Code Editor + Live Preview.
- **Mobile Viewport Segmented Control (320px/375px)**: Switches between `[ 📖 Guide | 💻 Code | 👁️ Preview ]` without vertical scrolling death spirals.
- **Instant Automated Code Validation**: Live feedback modal/banner testing user submissions against solution rules.

### 3.3 Progress Engine & Achievement System
- Skill tree visual progress map.
- LocalStorage progress saving (zero account required) + optional Supabase cloud sync.
- Downloadable high-resolution PDF course completion certificates.

---

## 🛡️ 4. Non-Functional Requirements & UX Constraints

| Requirement | Specification |
|---|---|
| **Operational Budget** | **$0.00 / month forever** (100% Free Stack). |
| **Mobile Responsiveness** | Flawless UX down to **320px & 375px viewports**; zero layout breaking. |
| **Page Performance** | Lighthouse Score ≥ 95 across Performance, Accessibility, and SEO. |
| **Visual Ergonomics** | Soft Light Mode Palette to prevent eye strain during long coding sessions. |
| **Copywriting Standard** | Analogy-first, jargon-free plain English accessible to all age groups. |
