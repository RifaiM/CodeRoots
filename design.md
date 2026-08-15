# 🎨 Design System & UI Specifications — NoviCodes

> **Version:** 2.0.0  
> **Aesthetic Philosophy:** Premium, Function-Driven, Fluidly Responsive, Zero Cliché  
> **CSS Engine:** Vanilla CSS3 with Harmonious HSL/HEX Design Tokens  

---

## 1. Color Palette Tokens & Visual Hierarchy

```
Primary Brand (Blue):
  --primary-blue:        #2563eb (Action Buttons, Main CTA, Active Highlights)
  --primary-dark:        #1d4ed8 (Hover State, Focused Borders)
  --primary-light:       #eff6ff (Subtle Surface Fills, Active Badges)

Track Theme Palettes:
  --color-level0-gold:   #f59e0b (Web History & Pillars)
  --color-level4-blue:   #3b82f6 (Level 4 DOM Dojo)
  --color-level5-cyan:   #0284c7 (Level 5 React Framework Dojo)
  --color-level6-green:  #10b981 (Level 6 Python Backend Dojo)
  --color-level7-purple: #9333ea (Level 7 Specialization Hub)
  --color-level8-sky:    #0284c7 (Level 8 API Bridge Dojo)
  --color-level9-indigo: #4f46e5 (Level 9 Fullstack Auth & Database)
  --color-level10-amber: #f59e0b (Level 10 Apex SaaS Capstone)

Neutral & Surface Scales:
  --bg-dark:             #090d16 (Deep Matrix Space Background)
  --surface-dark:        #0f172a (IDE Windows, Terminal Background, Cards)
  --surface-light:       #ffffff (Main Content Cards, Modals)
  --surface-subtle:      #f8fafc (Widget Backgrounds, Code Snippet Boxes)
  --border-subtle:       #e2e8f0 (Card Outlines, Dividers)
  --text-main:           #0f172a (Headings, Primary Text)
  --text-muted:          #64748b (Subtitles, Meta Descriptions)
```

---

## 2. Typography Hierarchy & Google Fonts

1. **Heading & UI Font:** `'Plus Jakarta Sans', sans-serif`
   - Weight 800/900: Main Headings (`h1`, `h2`), Hero Titles, Rank Titles.
   - Weight 700: Card Titles, Action Buttons, Section Badges.
   - Weight 500/600: Subtitles, Navigation Items.
2. **Body Font:** `'Nunito', sans-serif` / `'Plus Jakarta Sans'`
   - Weight 400/600: Explanatory copy, analogy paragraphs, instructional text.
3. **Monospace & Code Font:** `'Fira Code', 'Cascadia Code', monospace`
   - Editor textarea, line numbers, terminal screens, verification IDs.

---

## 3. 5-Tier Mobile Breakpoint & Fluid Sizing Matrix

```
Viewport Width (px)
├── >= 1200px (Desktop Large)  ── Dual 50/50 lane layout, 14px line heights
├── 768px - 1024px (Tablet)   ── Natural column stacking, 1.4rem headers
├── <= 425px (Mobile Large)   ── Compact cards, full-width action buttons
├── <= 375px (Mobile Medium)  ── 1.02rem hero title, 8px padding, wrapped badges
└── <= 320px (Mobile Small)   ── 0.94rem hero title, 6px padding, zero h-overflow
```

### 3.1 Mobile Sizing Calibration Rules

| Component | $\ge 1200\text{px}$ (Desktop) | $\le 425\text{px}$ (Large Mobile) | $\le 375\text{px}$ (Standard Mobile) | $\le 320\text{px}$ (Smallest Phone) |
| :--- | :---: | :---: | :---: | :---: |
| **Hero Title** | `2.20rem` | `1.15rem` | `1.02rem` | `0.94rem` |
| **Mission Card Title** | `1.05rem` | `0.88rem` | `0.82rem` | `0.78rem` |
| **Checklist Item Text** | `0.86rem` | `0.78rem` | `0.74rem` | `0.68rem` |
| **Target Preview Code** | `0.82rem` | `0.74rem` | `0.70rem` | `0.65rem` |
| **Terminal Screen Height**| `240px` | `100px` | `90px` | `80px` |
| **Terminal Font Size** | `0.82rem` | `0.70rem` | `0.65rem` | `0.60rem` |
| **Certificate Main Title**| `1.90rem` | `1.15rem` | `1.02rem` | `0.92rem` |
| **Cert Student Name** | `2.20rem` | `1.30rem` | `1.15rem` | `1.02rem` |

---

## 4. UI Component Architecture

### 4.1 Mission Card & Real-Time Checklist
- **Container:** Rounded `#f8fafc` card with left accent border corresponding to the level theme color.
- **Counter Badge:** `#checklistCounter` (`X / Y`) pills that dynamically update background from neutral gray to green (`#10b981`) when all tasks are complete.
- **Checklist Item:** Interactive SVG checkmark circle transitioning from gray outline to filled green check upon rule satisfaction.

### 4.2 IDE Workspace & Line Number Synchronization
- Textarea with `white-space: pre-wrap; word-break: break-word;` eliminating horizontal scrollbars on mobile viewports.
- Line numbers container with `translateY(-${editor.scrollTop}px)` sync ensuring exact line-by-line parity during vertical scrolling.

### 4.3 High-Resolution Canvas Proof-of-Work Certificates
- Frame rendered with double borders (`14px` dark slate outer, `3px` themed inner).
- Scaled for high-DPI export: `1200x800px` rendering canvas exporting crisp 300 DPI PNG graphics.

### 4.4 SweetAlert2 Modals Design Token
- **Backdrop:** `rgba(15, 23, 42, 0.75)` with `backdrop-filter: blur(12px)`.
- **Card Background:** `#ffffff` with `border-radius: 20px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);`.
- **Confirm Buttons:** `border-radius: 12px; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif;`.
