# NoviCodes - Master System Architecture & $0 Stack Blueprint

**Version**: 3.0  
**Status**: Production-Ready  
**Architectural Goal**: Build a high-performance, infinitely scalable interactive learning platform operating on a **100% Free Stack ($0/month)** using Client-Side Execution Engines, Static Edge CDN hosting, and zero backend compute requirements.

---

## 🏗️ 1. High-Level System Architecture

```
                               ┌─────────────────────────────────────────┐
                               │     NoviCodes Static App Shell          │
                               │   (Dashboard, Skill Tree, DevKit, Nav)  │
                               └────────────────────┬────────────────────┘
                                                    │
                 ┌──────────────────────────────────┼──────────────────────────────────┐
                 ▼                                  ▼                                  ▼
   ┌──────────────────────────┐       ┌──────────────────────────┐       ┌──────────────────────────┐
   │ HTML/CSS/DOM Dojo        │       │ React.js Framework Dojo  │       │ Python Backend Dojo      │
   │ (Sandboxed <iframe>)     │       │ (Client React Component) │       │ (Browser AST & Linter)   │
   └─────────────┬────────────┘       └─────────────┬────────────┘       └─────────────┬────────────┘
                 │                                  │                                  │
                 └──────────────────────────────────┼──────────────────────────────────┘
                                                    │
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │ Level 7 Multi-Branch Cloud Mastery Hub  │
                               │ ├── 7A: Cloud Deployments (Vercel/Fly)  │
                               │ ├── 7B: Neon DB, SQLAlchemy & Bcrypt    │
                               │ └── 7C: Next.js 14/15 App Router        │
                               └────────────────────┬────────────────────┘
                                                    │
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │  Client State & XP Progression Engine   │
                               │  (localStorage + DevKit API + Modals)   │
                               └─────────────────────────────────────────┘
```

---

## 🛠️ 2. The 100% Free Stack Component Mapping

| Domain | Selected Technology | Operational Cost | Rationale |
|---|---|---|---|
| **Hosting & Edge CDN** | **GitHub Pages / Cloudflare Pages / Vercel** | **$0.00** | Unlimited bandwidth on static SSG deployment; global edge routing. |
| **Styling Architecture** | **Vanilla CSS + CSS Custom Properties** | **$0.00** | Zero build step required; ultra-fast load time and maximum design fidelity. |
| **DOM Execution Sandbox** | Native Sandboxed `<iframe>` | **$0.00** | Zero server load; safe instant HTML/CSS/JS execution inside browser. |
| **Python AST Validator** | Client-Side Syntax & AST Inspector | **$0.00** | Instant evaluation of Python scripts and FastAPI routes without backend container overhead. |
| **Live Task Checklist** | Modular Character-Aware `Level7Linter` | **$0.00** | Quote-safe, comment-stripping regular expression & function checklist engine. |
| **Client-Side Persistence** | `localStorage` Storage Engine | **$0.00** | Instant zero-login offline-capable progress persistence. |
| **Developer Toolkit** | `window.NoviCodes` Global API | **$0.00** | Integrated test harness with `unlockAll`, `lockAll`, and `maxXP`. |

---

## 🔒 3. Access Protection & Gating Engine Lifecycle

```
[ Learner Requests Lesson URL (e.g. lesson5_remake.html) ]
                        │
                        ▼
      [ Navigation Engine Initializes in <head> ]
                        │
        ┌───────────────┴───────────────┐
        ▼                               ▼
[ Is practice_mode_unlocked = 'true'? ]  [ Is Lesson 1 or Lesson N-1 completed? ]
        │ YES                           │ YES
        ▼                               ▼
[ Grant Full Access & Mount IDE ]  [ Grant Full Access & Mount IDE ]
        │
        │ NO
        ▼
[ Mount Dark Glass Restricted Overlay to DOM ]
  ├── Hide Workspace Panels
  ├── Display Dual CTAs: [ Take Me to Highest Available Lesson ] & [ Return to Dashboard ]
  └── Terminate Execution (Prevent Editor Mounting)
```

---

## 💾 4. LocalStorage Schema & Key Registry

| Storage Key | Type | Description |
|---|---|---|
| `practice_mode_unlocked` | `string` ("true") | Developer Mode bypass flag (unlocks all 79 lessons & certs). |
| `level0_completed` | `string` ("true") | Level 0 Web History & Pillars completion. |
| `level[1-3]_completed` | `string` ("true") | Levels 1, 2, 3 Foundations completion. |
| `partB_lesson[1-15]_remake_complete` | `string` ("true") | Level 4 DOM Dojo lesson completion flags. |
| `partC_lesson[1-15]_remake_complete` | `string` ("true") | Level 5 React Dojo lesson completion flags. |
| `partE_lesson[1-15]_remake_complete` | `string` ("true") | Level 6 Python Dojo lesson completion flags. |
| `partF_branch[A,B,C]_lesson[1-6]_complete` | `string` ("true") | Level 7 Mastery Track lesson completion flags. |
| `novicodes_daily_quest_xp` | `string` (number) | Earned Daily Warmup Quest XP. |
| `novicodes_streak_count` | `string` (number) | Active consecutive daily quest streak counter. |

