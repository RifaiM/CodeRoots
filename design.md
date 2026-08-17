# 🎨 Design System & UI Specifications — NoviCodes

> **Version:** 2.5.0  
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
  --color-level7d-ts:    #3178c6 (Level 7D TypeScript Track)
  --color-level7e-motion:#ec4899 (Level 7E CSS Motion Track)
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

## 4. UI Component Specifications

### 4.1 2-Tier Stacked Foundations Refresher Bar (`.foundations-ref-box`)
- **Row 1:** Direct label (`📖 Concept Refresher:`) with `0.82rem` font weight 700.
- **Row 2:** Full-width select control (`flex: 1`, `min-width: 0`, `text-overflow: ellipsis`) + Open Guide button (`flex-shrink: 0`, `height: 36px`, `font-weight: 800`).
- **Mobile Calibration:** Retains 13–14px typography and native OS picker trigger without horizontal squash.

### 4.2 Foundations Instant Search & Track Switcher
- **Search Input:** Dual-state focus with `rgba(37, 99, 235, 0.12)` halo ring and circular `✕` clear button.
- **Track Switcher:** Stable desktop wrapper (`max-width: 520px`) preventing width jumps across track selections.

### 4.3 Reference Code Snippet & Copy Action
- **Positioning:** Top-right anchored inside code blocks with dark-mode contrast.
- **State Feedback:** Instant transition to emerald green (`#10b981`) with `✅ Copied!` text and `scale(1.04)` micro-animation.

### 4.4 Mission Card & Real-Time Checklist
- **Container:** Rounded `#f8fafc` card with left accent border corresponding to the level theme color.
- **Counter Badge:** `#checklistCounter` (`X / Y`) pills that dynamically update background from neutral gray to green (`#10b981`) when all tasks are complete.
- **Checklist Item:** Interactive SVG checkmark circle transitioning from gray outline to filled green check upon rule satisfaction.

### 4.5 High-Resolution Canvas Proof-of-Work Certificates
- Frame rendered with double borders (`14px` dark slate outer, `3px` themed inner).
- Scaled for high-DPI export: `1200x800px` rendering canvas exporting crisp 300 DPI PNG graphics and `@media print` landscape layouts.

