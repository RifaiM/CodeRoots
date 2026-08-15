# 📜 Engineering Rules & Quality Standards — NoviCodes

> **Version:** 2.0.0  
> **Target:** Core Platform, Dojo Lessons, Diagnostics, and Component Architecture  

---

## 1. Core Development Philosophy

1. **Analogy-First Pedagogy:** Always introduce concepts with physical, intuitive mental models before diving into syntax.
2. **Zero Paywall & Zero Data Tracking:** Never introduce authentication barriers, user tracking pixels, or invasive telemetry.
3. **100% Client-Side Privacy:** All user data, XP, code drafts, and progress must remain strictly inside browser `localStorage`.
4. **Resilience & Fault Tolerance:** Malformed code, empty strings, or unclosed tags must never cause uncaught exceptions in the editor, linter, or checklist evaluators.

---

## 2. Lesson Scaffolding & Checklist Standards

Every Dojo lesson (Levels 4 through 10) must strictly adhere to the following template structure:

### 2.1 Left Lane (Instructional Hierarchy)
- **Level Tag & Bounty:** Display standard level tag (e.g. `Level 8 • API Bridge`) and XP bounty (e.g. `⚡ +250 XP Bounty`).
- **Mission Card (Top):** Must feature a Progate-style `#taskChecklist` container with live counter `#checklistCounter` (`0 / N`).
- **Target Expected Output:** Must display a visual preview block showing learners exactly what their rendered output should look like.
- **Reference Code Widget:** Must include a collapsible or bordered reference code snippet with a working copy-to-clipboard button.

### 2.2 Right Lane (IDE Workspace & Diagnostics)
- **Monospace Textarea Editor:** `#lessonEditor` with synchronized `#ideLineNumbersInner`.
- **Live Preview / Terminal:**
  - Web/React: `<iframe id="livePreviewIframe" sandbox="allow-scripts allow-modals allow-same-origin">`.
  - Python/CLI: `<div id="terminalScreen" class="ide-terminal-screen">`.
- **Real-Time Linting:** Must invoke `DojoEngine.lint(editor.value, mode)` on every `input` event.
- **Real-Time Checklist Evaluation:** Must invoke `DojoEngine.runChecklist(editor.value)` on every `input` event.

### 2.3 🚨 Critical Checklist Rule: Comment Stripping
**Rule:** Checklist evaluation functions `fn(code)` MUST NEVER evaluate comments as completed code. Always strip comments before running regex or pattern matchers:

```javascript
// HTML Lessons
const cleanCode = code.replace(/<!--[\s\S]*?-->/g, '');

// JS / React / Python Lessons
const cleanCode = code
    .replace(/\/\*[\s\S]*?\*\//g, '')     // Strip multi-line comments
    .replace(/(?<!:)\/\/[^\r\n]*/g, '')   // Strip single-line JS comments (avoid stripping http://)
    .replace(/(?<!['"])#[^\r\n]*/g, '')   // Strip Python comments
    .replace(/<!--[\s\S]*?-->/g, '');     // Strip embedded HTML comments
```

---

## 3. Sequential Access & Anti-Tampering Standards

1. Every lesson must use `LessonLayout.astro` with `trackPrefix` and `lessonNum` attributes.
2. Direct navigation to uncompleted lessons must trigger `checkLessonAccessAndRenderOverlay(...)` and block user interaction.
3. Every certificate page (`certificate.astro`) must verify `isCertificateAccessible(track)` on page load and redirect to the corresponding Hub if unfinished.
4. DevKit unlock/lock triggers (`Ctrl+Alt+D` and 5 rapid logo clicks) are reserved for developer testing and must be declared globally via `UserProfileModal.astro`.

---

## 4. UI Design & Mobile Responsiveness Rules

1. **5-Tier Responsive Breakpoints:**
   - Desktop: $\ge 1200\text{px}$ (Dual 50/50 lane layout).
   - Tablet: $768\text{px} - 1024\text{px}$ (Fluid stacking).
   - Mobile Large: $425\text{px}$ (Single-column layout, compact typography).
   - Mobile Medium: $375\text{px}$ (iPhone SE / Standard, 12px paddings).
   - Mobile Small: $320\text{px}$ (Minimum supported screen, zero horizontal scroll, auto-wrapping badges).
2. **Forbidden Cliché Tropes:**
   - ❌ No purple fonts on dark theme backgrounds.
   - ❌ No glowing neon border outlines.
   - ❌ No icon-stuffed bento boxes without clear utility.
   - ❌ No grid line / particle mesh overlays.

---

## 5. Development & Astro Workflow Conventions

Follow Astro background server conventions per `AGENTS.md`:

```bash
# Start Astro dev server in background
astro dev --background

# Check status and logs
astro dev status
astro dev logs

# Stop dev server
astro dev stop

# Production validation build
npm run build
```
