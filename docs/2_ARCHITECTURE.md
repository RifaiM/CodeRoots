# DevDojo - Master System Architecture & $0 Stack Blueprint

**Version**: 2.0  
**Status**: Approved  
**Architectural Goal**: Build a high-performance, infinitely scalable interactive learning platform operating on a **100% Free Stack ($0/month)** using Client-Side Execution Engines and Edge Hosting.

---

## 🏗️ 1. High-Level System Architecture

```
                               ┌─────────────────────────────────────────┐
                               │   DevDojo Platform App Shell (Vite/Next)│
                               │   (Dashboard, Skill Tree, Auth, Router) │
                               └────────────────────┬────────────────────┘
                                                    │
                 ┌──────────────────────────────────┼──────────────────────────────────┐
                 ▼                                  ▼                                  ▼
   ┌──────────────────────────┐       ┌──────────────────────────┐       ┌──────────────────────────┐
   │ HTML/CSS/JS Engine       │       │ React / Framework Engine │       │ Python WASM Engine       │
   │ (Sandboxed <iframe>)     │       │ (Sandpack / WebWorker)   │       │ (Pyodide WebAssembly)    │
   └─────────────┬────────────┘       └─────────────┬────────────┘       └─────────────┬────────────┘
                 │                                  │                                  │
                 └──────────────────────────────────┼──────────────────────────────────┘
                                                    │
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │  State Persistence & Cloud Sync         │
                               │  (localStorage + Supabase Free Tier)    │
                               └─────────────────────────────────────────┘
```

---

## 🛠️ 2. The 100% Free Stack Component Mapping

| Domain | Selected Technology | Operational Cost | Rationale |
|---|---|---|---|
| **Hosting & Edge CDN** | **Cloudflare Pages** or **Vercel** | **$0.00** | Unlimited bandwidth on static SSG deployment; global edge routing. |
| **App Shell Framework** | **Vite + React / Next.js** (TypeScript) | **$0.00** | Strict typings for lesson schemas and progress engines. |
| **Code Editor Engine** | **Monaco Editor** / **CodeMirror 6** | **$0.00** | Full VS Code editing engine running 100% client-side. |
| **Web Execution** | Native `<iframe>` Sandboxing | **$0.00** | Zero server load; instant execution inside user browser. |
| **Framework Execution** | Babel Standalone / Sandpack | **$0.00** | Client-side JSX transpilation in WebWorkers. |
| **Python Execution** | **Pyodide** (WebAssembly) | **$0.00** | Full CPython engine running inside browser WASM. Zero backend Python server required. |
| **Database & Auth** | **Supabase Free Tier** + `localStorage` | **$0.00** | 50,000 MAU free tier for PostgreSQL DB and OAuth authentication. |
| **Certificates** | `html2canvas` + `jspdf` | **$0.00** | In-browser client-side PDF compilation. |

---

## 🔒 3. In-Browser Execution & Security Architecture

### 3.1 Sandboxed Web Preview (`<iframe>`)
To prevent malicious script execution from disrupting the main dashboard, all user HTML/CSS/JS code runs inside an isolated iframe with strict security policies:

```html
<iframe 
  id="sandbox-preview"
  sandbox="allow-scripts allow-modals"
  csp="default-src 'self' 'unsafe-inline' data: blob:;"
></iframe>
```

### 3.2 Client-Side Python WebAssembly Engine (Pyodide)
Python code is executed via the Pyodide WebAssembly bundle loaded on demand:

```
[ User Python Code ] ──> [ Pyodide WASM Runtime ] ──> [ Browser WebWorker ] ──> [ Captured Stdout Output ]
```

- **Zero Server Compute**: 100% executed on user GPU/CPU.
- **Package Support**: Supports standard Python libraries (`math`, `json`, `re`, `datetime`).

---

## 💾 4. Data Storage & Offline Capability

```
                        ┌───────────────────────────────┐
                        │   User Completes Lesson Step  │
                        └───────────────┬───────────────┘
                                        │
                                        ▼
                        ┌───────────────────────────────┐
                        │ Write to LocalStorage (Sync)  │
                        └───────────────┬───────────────┘
                                        │
                       ┌────────────────┴────────────────┐
                       │ Is User Logged In via Supabase? │
                       └────────────────┬────────────────┘
                                        │
                      ┌─────────────────┴─────────────────┐
                      YES                                 NO
                      │                                   │
                      ▼                                   ▼
          ┌───────────────────────┐           ┌───────────────────────┐
          │ Async Push to         │           │ Retain in Local       │
          │ Supabase Postgres DB  │           │ Storage (Offline Ok)  │
          └───────────────────────┘           └───────────────────────┘
```
