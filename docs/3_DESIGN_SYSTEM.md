# NoviCodes - Master Design System & UX Tokens

**Version**: 3.0  
**Status**: Production-Ready  
**Design Philosophy**: Crafted, modern editorial aesthetic. Built with a soft light palette designed for zero eye-strain, high-contrast dark code IDE panels, and responsive layouts down to 320px viewports.

---

## 🎨 1. Color Palette Tokens & Hierarchy

| Token Name | Hex Value | Role & Usage | Contrast Ratio |
|---|---|---|---|
| `--color-bg-app` | `#f8fafc` | Main page canvas background | Baseline |
| `--color-bg-card` | `#ffffff` | Content cards, containers, panels | High Contrast |
| `--color-border-subtle` | `#e2e8f0` | 1px clean container borders | Soft Accent |
| `--color-text-heading` | `#0f172a` | Primary titles & headings (Deep Slate) | **15.8:1** (AAA) |
| `--color-text-body` | `#1e293b` | Main body text | **12.4:1** (AAA) |
| `--color-text-muted` | `#475569` | Secondary subtext & metadata | **7.1:1** (AAA) |
| `--color-brand-primary` | `#2563eb` | Primary CTA buttons & active badges | **4.6:1** (AA) |
| `--color-brand-gradient`| `linear-gradient(135deg, #1e3a8a, #2563eb)` | Header bars & milestone badges | High Contrast |
| `--color-editor-bg` | `#0d1117` | Dark code editor container | High Contrast |
| `--color-editor-header` | `#161b22` | Header bar above code editor | Pure White Text |

---

## 🔤 2. Typography Standard

NoviCodes utilizes a 3-font hierarchy loaded via Google Fonts CDN:

1. **Brand & UI Headings**: `Plus Jakarta Sans` (`wght@400;500;600;700;800`)
   - Clean, modern geometric sans-serif prioritizing legibility and visual weight.
2. **Editorial & Body Text**: `Nunito` (`wght@400;600;700;800`)
   - Soft, readable humanist sans-serif optimized for long-form reading without eye strain.
3. **Monospace & Code**: `Fira Code` (`wght@400;500;600`)
   - Monospace font with programming ligatures for code editors and terminal simulations.

---

## 🏷️ 3. Dynamic Card Badges & States

Track cards dynamically reflect the learner's journey:

- **Locked (`🔒 Locked`)**: Light slate background (`#f1f5f9`), muted border, requires prerequisite completion.
- **In-Progress (`⚡ Continue [X/Y]`)**: Vibrant blue gradient with active pulse indicator and progress counter.
- **Mastered (`✅ Completed`)**: Emerald green pill (`#dcfce7`) with checkmark icon.
- **Dev Mode / Unlocked (`⭐ Unlocked`)**: Gold badge indicating Developer Mode access.

---

## 📱 4. Mobile Architecture (320px & 375px Viewports)

### 4.1 Preventing the "Vertical Death Scroll"
Traditional responsive web design converts multi-column desktop layouts into a single, 10,000px tall vertical column on mobile. NoviCodes explicitly prohibits this fallback.

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

---

## ✍️ 5. Copywriting & Pedagogical Tone Specification

| Rule | Incorrect (Jargon-Heavy) | Correct (Analogy-First) |
|---|---|---|
| **HTML** | "HTML is a markup language defining DOM node trees." | "HTML is the wooden framing of a house—it holds the walls and doors." |
| **CSS** | "CSS applies cascading style rules to matched elements." | "CSS is the paint, wallpaper, and interior design of your webpage." |
| **JavaScript** | "JavaScript is an ECMAScript event-driven language." | "JavaScript is the electrical wiring—it turns on lights when you flip a switch." |
| **APIs** | "APIs expose REST endpoints for JSON serialization." | "An API is like a waiter in a restaurant taking your order to the kitchen." |
| **Databases** | "Relational DBMS executing ACID transactions." | "A database is like a digital filing cabinet where every customer gets an organized folder." |

