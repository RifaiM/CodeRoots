# DevDojo - Master Design System & Mobile UX Specification

**Version**: 2.0  
**Status**: Approved  
**Design Philosophy**: Crafted, modern editorial aesthetic. Zero generic AI dark-mode templates. Built with a soft light palette designed for zero eye-strain and highly structured mobile layouts down to 320px viewports.

---

## 🎨 1. Color Palette Tokens (Soft Light Mode - Zero Eye Strain)

| Token Name | Hex Value | Role & Usage | Contrast Ratio |
|---|---|---|---|
| `--color-bg-app` | `#f8fafc` | Main page canvas background | Baseline |
| `--color-bg-card` | `#ffffff` | Content cards, containers, panels | High Contrast |
| `--color-border-subtle` | `#e2e8f0` | 1px clean container borders | Soft Accent |
| `--color-text-heading` | `#0f172a` | Primary titles & headings (Deep Slate) | **15.8:1** (AAA) |
| `--color-text-body` | `#1e293b` | Main body text | **12.4:1** (AAA) |
| `--color-text-muted` | `#475569` | Secondary subtext & metadata | **7.1:1** (AAA) |
| `--color-brand-primary` | `#2563eb` | Primary CTA buttons & active badges | **4.6:1** (AA) |
| `--color-brand-gradient`| `linear-gradient(135deg, #2563eb, #1d4ed8)` | Header bars & milestone badges | High Contrast |
| `--color-editor-bg` | `#1e293b` | Dark code editor container | High Contrast |
| `--color-editor-header` | `#0f172a` | Header bar above code editor | Pure White Text |

---

## 📱 2. Mobile Architecture (320px & 375px Viewports)

### 2.1 Preventing the "Vertical Death Scroll"
Traditional responsive web design converts multi-column desktop layouts into a single, 10,000px tall vertical column on mobile. DevDojo explicitly prohibits this fallback.

#### Mobile Workspace Solution (Segmented Tab Controller):
On screens ≤ 768px, the 3-panel workspace collapses into a **single active panel viewport** managed by a fixed 3-way Segmented Control:

```
+-------------------------------------------------+
|   [ 📖 Instructions ]  [ 💻 Code ]  [ 👁️ Preview ]│  <- Segmented View Switcher
+-------------------------------------------------+
|                                                 |
|   100% Height Active Panel Container            |
|   (Internal scrolling only, 0 page overflow)    |
|                                                 |
+-------------------------------------------------+
```

#### Mobile Navigation Solution (Horizontal Snap Lanes):
- Skill tree nodes and category selection cards do not stack vertically; they swipe horizontally using CSS scroll snapping (`overflow-x: auto; scroll-snap-type: x mandatory;`).

---

## ✨ 3. GSAP Animation & Micro-Interactions Standard

### 3.1 Core Principles
- **Subtle & Purposeful**: Animations must guide attention, not distract.
- **Performance First**: All GSAP animations must use hardware-accelerated CSS properties (`transform: translate3d()`, `opacity`).
- **Reduced Motion**: Automatically respect `prefers-reduced-motion` for accessibility.

### 3.2 Standard GSAP Preset Code Snippets

#### Smooth Entrance Sequence:
```javascript
gsap.from(".card-node", {
  duration: 0.6,
  y: 24,
  opacity: 0,
  stagger: 0.08,
  ease: "power2.out",
  clearProps: "all"
});
```

#### Interactive Progress Bar Fill:
```javascript
gsap.to("#progress-fill", {
  duration: 0.8,
  width: `${completionPercentage}%`,
  ease: "back.out(1.2)"
});
```

---

## ✍️ 4. Copywriting & Pedagogical Tone Specification

| Rule | Incorrect (Jargon-Heavy) | Correct (Analogy-First) |
|---|---|---|
| **HTML** | "HTML is a markup language defining DOM node trees." | "HTML is the wooden framing of a house—it holds the walls and doors." |
| **CSS** | "CSS applies cascading style rules to matched elements." | "CSS is the paint, wallpaper, and interior design of your webpage." |
| **JavaScript** | "JavaScript is an ECMAScript event-driven language." | "JavaScript is the electrical wiring—it turns on lights when you flip a switch." |
| **APIs** | "APIs expose REST endpoints for JSON serialization." | "An API is like a waiter in a restaurant taking your order to the kitchen." |
