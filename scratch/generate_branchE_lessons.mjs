/**
 * Generator script for Level 7 Track E: CSS Animations & Micro-Interactions (10 Lessons)
 * Adheres strictly to the 5-Pillar Standard, HTML live preview mode, JSX escaping, and Dojo verification.
 */

import fs from 'fs';
import path from 'path';

const targetDir = path.resolve('src/pages/6. partF/branchE');
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const branchLessons = [
    { id: 1, title: "Transitions 101 & Easing", url: "/6. partF/branchE/lesson1_remake.html" },
    { id: 2, title: "GPU 2D Transforms", url: "/6. partF/branchE/lesson2_remake.html" },
    { id: 3, title: "CSS Keyframes (@keyframes)", url: "/6. partF/branchE/lesson3_remake.html" },
    { id: 4, title: "Cubic-Bézier Spring Physics", url: "/6. partF/branchE/lesson4_remake.html" },
    { id: 5, title: "Tactile Hover & Active Clicks", url: "/6. partF/branchE/lesson5_remake.html" },
    { id: 6, title: "Animated Skeletons & Shimmer", url: "/6. partF/branchE/lesson6_remake.html" },
    { id: 7, title: "Staggered Entrance Cascades", url: "/6. partF/branchE/lesson7_remake.html" },
    { id: 8, title: "SVG Path Drawing Animations", url: "/6. partF/branchE/lesson8_remake.html" },
    { id: 9, title: "prefers-reduced-motion A11y", url: "/6. partF/branchE/lesson9_remake.html" },
    { id: 10, title: "Capstone: Production Motion UI", url: "/6. partF/branchE/lesson10_remake.html" }
];

const lessonsData = [
    // ----------------------------------------------------
    // LESSON 1: Transitions 101 & Easing
    // ----------------------------------------------------
    {
        num: 1,
        title: "Transitions 101 & Easing",
        desc: "Learn how to smoothly animate between two element states on hover using transition-property, transition-duration, and transition-timing-function.",
        painPoint: "Without CSS transitions, hovering or clicking an element causes instant, jarring pixel jumps. The UI feels like an unresponsive 1990s static document instead of a modern software application.",
        analogy: "Think of CSS transitions like a smooth dimmer switch on a light fixture. Instead of violently flicking the light switch ON and OFF instantly, the dimmer glides smoothly between brightness levels over a quarter of a second.",
        syntax: `<code>transition: background-color 0.25s ease, transform 0.25s ease;</code><br/>• <strong>transition-property</strong> → Which properties to animate (e.g. background-color, transform)<br/>• <strong>transition-duration</strong> → How long the interpolation takes (e.g. 0.25s or 250ms)<br/>• <strong>transition-timing-function</strong> → The acceleration curve (ease, ease-out, ease-in-out)`,
        vscodeTrap: "Never write 'transition: all 0.25s;'. It forces the browser to monitor all 300+ CSS properties on the element, leading to unintended animations (like height or borders snapping during page resize) and significant memory waste.",
        starterCode: `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    background: #0f172a;
    margin: 0;
  }
  .btn {
    background-color: #2563eb;
    color: #ffffff;
    padding: 12px 26px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    /* 👉 STEP 1: Add transition for background-color and transform over 0.25s ease */

  }
  .btn:hover {
    /* 👉 STEP 2: Change background-color to #1d4ed8 and transform: scale(1.06) on hover */

  }
</style>

<button class="btn">Launch Rocket 🚀</button>`,
        checklist: [
            { id: "transition", text: "Add <code>transition</code> with duration <code>0.25s</code> or <code>250ms</code> to <code>.btn</code>", test: "/\\.btn\\s*\\{[^}]*transition\\s*:[^}]*(0\\.25s|250ms)/i.test(code)" },
            { id: "hover-bg", text: "Change <code>background-color</code> to <code>#1d4ed8</code> inside <code>.btn:hover</code>", test: "/\\.btn:hover\\s*\\{[^}]*background(-color)?\\s*:\\s*#1d4ed8/i.test(code)" },
            { id: "hover-scale", text: "Add <code>transform: scale(1.06)</code> inside <code>.btn:hover</code>", test: "/\\.btn:hover\\s*\\{[^}]*transform\\s*:\\s*scale\\(\\s*1\\.06\\s*\\)/i.test(code)" }
        ]
    },

    // ----------------------------------------------------
    // LESSON 2: GPU 2D Transforms
    // ----------------------------------------------------
    {
        num: 2,
        title: "GPU 2D Transforms",
        desc: "Master hardware-accelerated transforms (translate, scale, rotate) that run directly on the graphics card without triggering costly page reflows.",
        painPoint: "Animating 'top', 'left', or 'margin-top' forces the browser CPU to recalculate the positions and geometry of every surrounding element on the page 60 times a second, causing noticeable stutter, battery drain, and frame drops.",
        analogy: "Think of an actor on a theater stage. Moving the actor across the stage (transform: translateY) is effortless. But pushing the entire stage wall 10 feet to the left (top / margin) forces the entire theater crew to rebuild the building while the play is happening.",
        syntax: `<code>transform: translateY(-6px) scale(1.02);</code><br/>• <strong>translateY(-6px)</strong> → Elevates the element 6px upwards on the Y-axis<br/>• <strong>scale(1.02)</strong> → Gently zooms element by 2% without affecting neighbors<br/>• <strong>box-shadow</strong> → Enhances depth perception to complete the 3D lift`,
        vscodeTrap: "Don't forget to set 'transition: transform 0.3s ease, box-shadow 0.3s ease;' on the base element! If you put the transition only inside ':hover', the card will snap back instantly and violently when the mouse leaves.",
        starterCode: `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 220px;
    background: #0f172a;
    margin: 0;
  }
  .feature-card {
    width: 260px;
    padding: 22px;
    background: #1e293b;
    color: #f8fafc;
    border-radius: 12px;
    border: 1px solid #334155;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    /* 👉 STEP 1: Add smooth transition for transform and box-shadow over 0.3s ease */

  }
  .feature-card:hover {
    /* 👉 STEP 2: Elevate with transform: translateY(-6px) */

    /* 👉 STEP 3: Add expanded glow box-shadow: 0 16px 28px rgba(0, 0, 0, 0.4) */

  }
</style>

<div class="feature-card">
  <h3 style="margin: 0 0 8px 0; color: #38bdf8;">GPU Accelerated</h3>
  <p style="margin: 0; color: #94a3b8; font-size: 0.9rem;">60 FPS elevation with zero layout reflow jank!</p>
</div>`,
        checklist: [
            { id: "card-transition", text: "Add <code>transition: transform 0.3s ease, box-shadow 0.3s ease;</code> on <code>.feature-card</code>", test: "/\\.feature-card\\s*\\{[^}]*transition\\s*:[^}]*transform[^}]*box-shadow/i.test(code)" },
            { id: "card-translate", text: "Add <code>transform: translateY(-6px)</code> on <code>.feature-card:hover</code>", test: "/\\.feature-card:hover\\s*\\{[^}]*transform\\s*:\\s*translateY\\(\\s*-6px\\s*\\)/i.test(code)" },
            { id: "card-shadow", text: "Add deep <code>box-shadow</code> to <code>.feature-card:hover</code>", test: "/\\.feature-card:hover\\s*\\{[^}]*box-shadow\\s*:\\s*0\\s+16px/i.test(code)" }
        ]
    },

    // ----------------------------------------------------
    // LESSON 3: CSS Keyframes (@keyframes)
    // ----------------------------------------------------
    {
        num: 3,
        title: "CSS Keyframes (@keyframes)",
        desc: "Create self-running, looping animations using @keyframes, animation-duration, iteration-count, and timing functions.",
        painPoint: "CSS transitions only trigger on user interactions like hover or focus. If you need a continuous pulsing server indicator, a spinning loading icon, or a badge that animates automatically on page load, transitions cannot do it.",
        analogy: "Think of @keyframes like a film director's storyboard. You draw key frames at 0%, 50%, and 100%, and the browser smoothly fills in all the in-between video frames in real time.",
        syntax: `@keyframes pulseGlow {<br/>&nbsp;&nbsp;0%, 100% { transform: scale(1); opacity: 1; }<br/>&nbsp;&nbsp;50% { transform: scale(1.2); opacity: 0.6; }<br/>}<br/><code>animation: pulseGlow 1.8s infinite ease-in-out;</code>`,
        vscodeTrap: "Never leave off 'infinite' if you want a looping animation! By default, CSS animations run exactly once and stop. If you want them to stay in their final frame after running once, use 'animation-fill-mode: forwards'.",
        starterCode: `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 180px;
    background: #0f172a;
    color: #f8fafc;
    margin: 0;
  }
  
  /* 👉 STEP 1: Define @keyframes pulseDot with 0%, 100% (scale 1, opacity 1) and 50% (scale 1.3, opacity 0.5) */

  .pulse-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #1e293b;
    padding: 10px 18px;
    border-radius: 999px;
    border: 1px solid #334155;
    font-weight: 700;
  }
  .dot {
    width: 12px;
    height: 12px;
    background-color: #10b981;
    border-radius: 50%;
    /* 👉 STEP 2: Apply animation: pulseDot 1.8s infinite ease-in-out */

  }
</style>

<div class="pulse-badge">
  <div class="dot"></div>
  <span>Live Cloud Cluster</span>
</div>`,
        checklist: [
            { id: "keyframes-def", text: "Define <code>@keyframes pulseDot</code> with <code>0%</code>, <code>50%</code>, and <code>100%</code> steps", test: "/@keyframes\\s+pulseDot/i.test(code) && /0%/i.test(code) && /50%/i.test(code) && /100%/i.test(code)" },
            { id: "keyframes-scale", text: "Animate <code>transform: scale(1.3)</code> and <code>opacity: 0.5</code> at 50%", test: "/50%[\\s\\S]*?scale\\(\\s*1\\.3\\s*\\)[\\s\\S]*?opacity\\s*:\\s*0\\.5/i.test(code)" },
            { id: "animation-apply", text: "Apply <code>animation: pulseDot 1.8s infinite ease-in-out;</code> to <code>.dot</code>", test: "/\\.dot\\s*\\{[^}]*animation\\s*:[^}]*pulseDot[^}]*1\\.8s[^}]*infinite/i.test(code)" }
        ]
    },

    // ----------------------------------------------------
    // LESSON 4: Cubic-Bézier Spring Physics
    // ----------------------------------------------------
    {
        num: 4,
        title: "Cubic-Bézier Spring Physics",
        desc: "Build natural physical bounce and spring damping into your UI buttons using custom 4-point cubic-bezier timing curves.",
        painPoint: "Standard linear and default ease curves feel robotic and lifeless. Modern interactive apps (like iOS or macOS UI) feel premium because elements have physical inertia, overshoot, and spring bounce.",
        analogy: "Think of cubic-bezier(0.34, 1.56, 0.64, 1) like a rubber band pulling a wooden block. When released, the block overshoots its target by a fraction of an inch (1.56) before snapping back into its resting position.",
        syntax: `<code>transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);</code><br/>• <strong>0.34, 1.56</strong> → Control point 1 (Y value 1.56 exceeds 1.0, creating physical overshoot)<br/>• <strong>0.64, 1</strong> → Control point 2 (Settles smoothly back down to target size 1.0)`,
        vscodeTrap: "Don't make your spring duration too long! A spring transition should be between 0.3s and 0.45s. Anything longer than 0.5s feels sluggish and annoys users trying to get work done quickly.",
        starterCode: `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    background: #0f172a;
    margin: 0;
  }
  .spring-btn {
    background: linear-gradient(135deg, #f43f5e, #e11d48);
    color: #ffffff;
    padding: 14px 28px;
    border: none;
    border-radius: 12px;
    font-size: 1.05rem;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(244, 63, 94, 0.3);
    /* 👉 STEP 1: Add transition for transform over 0.4s using cubic-bezier(0.34, 1.56, 0.64, 1) */

  }
  .spring-btn:hover {
    /* 👉 STEP 2: Scale up to 1.12 on hover to trigger the elastic spring bounce */

  }
</style>

<button class="spring-btn">Interactive Spring Button ⚡</button>`,
        checklist: [
            { id: "cubic-bezier", text: "Add <code>transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);</code> on <code>.spring-btn</code>", test: "/\\.spring-btn\\s*\\{[^}]*transition\\s*:[^}]*transform[^}]*0\\.4s[^}]*cubic-bezier\\(\\s*0\\.34\\s*,\\s*1\\.56\\s*,\\s*0\\.64\\s*,\\s*1\\s*\\)/i.test(code)" },
            { id: "hover-overshoot", text: "Add <code>transform: scale(1.12)</code> inside <code>.spring-btn:hover</code>", test: "/\\.spring-btn:hover\\s*\\{[^}]*transform\\s*:\\s*scale\\(\\s*1\\.12\\s*\\)/i.test(code)" }
        ]
    },

    // ----------------------------------------------------
    // LESSON 5: Tactile Hover & Active Micro-Interactions
    // ----------------------------------------------------
    {
        num: 5,
        title: "Tactile Hover & Active Micro-Interactions",
        desc: "Design tactile 3D mechanical button interactions using elevation lift on hover and realistic physical compression on active click.",
        painPoint: "When users click a flat digital button that has no :active state, their brain feels uncertainty about whether the click actually registered, leading to impatient double-clicks.",
        analogy: "Think of a mechanical keyboard key or an arcade push button. When you push down (:active), the plastic key physically sinks into the chassis and the shadow underneath disappears.",
        syntax: `<code>.btn:hover { transform: translateY(-2px); box-shadow: 0 6px 0 #4338ca; }</code><br/><code>.btn:active { transform: translateY(3px); box-shadow: 0 1px 0 #4338ca; }</code>`,
        vscodeTrap: "Always ensure the :active state transition duration is ultra-fast (e.g. 0.08s or 0.1s). If :active is slow, the button feels like it is stuck in sticky syrup rather than a crisp mechanical switch.",
        starterCode: `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    background: #0f172a;
    margin: 0;
  }
  .tactile-switch {
    background-color: #6366f1;
    color: #ffffff;
    padding: 14px 28px;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 4px 0 #4338ca;
    /* 👉 STEP 1: Add quick transition for transform 0.1s ease, box-shadow 0.1s ease */

  }
  .tactile-switch:hover {
    /* 👉 STEP 2: Lift up with transform: translateY(-2px) and deepen box-shadow: 0 6px 0 #4338ca */

  }
  .tactile-switch:active {
    /* 👉 STEP 3: Compress down with transform: translateY(3px) and collapse box-shadow: 0 1px 0 #4338ca */

  }
</style>

<button class="tactile-switch">Mechanical Switch Click</button>`,
        checklist: [
            { id: "quick-transition", text: "Add <code>transition: transform 0.1s ease, box-shadow 0.1s ease;</code> on <code>.tactile-switch</code>", test: "/\\.tactile-switch\\s*\\{[^}]*transition\\s*:[^}]*transform[^}]*0\\.1s[^}]*box-shadow/i.test(code)" },
            { id: "hover-lift", text: "Add <code>transform: translateY(-2px)</code> and <code>box-shadow: 0 6px 0 #4338ca</code> on <code>:hover</code>", test: "/\\.tactile-switch:hover\\s*\\{[^}]*translateY\\(\\s*-2px\\s*\\)[^}]*box-shadow\\s*:\\s*0\\s+6px\\s+0/i.test(code)" },
            { id: "active-press", text: "Add <code>transform: translateY(3px)</code> and <code>box-shadow: 0 1px 0 #4338ca</code> on <code>:active</code>", test: "/\\.tactile-switch:active\\s*\\{[^}]*translateY\\(\\s*3px\\s*\\)[^}]*box-shadow\\s*:\\s*0\\s+1px\\s+0/i.test(code)" }
        ]
    },

    // ----------------------------------------------------
    // LESSON 6: Animated Skeletons & Shimmer Waves
    // ----------------------------------------------------
    {
        num: 6,
        title: "Animated Skeletons & Shimmer Waves",
        desc: "Construct high-performance content loading skeletons with an infinite sliding gradient light wave.",
        painPoint: "Showing blank white screens or spinning wheels makes perceived load time feel 3x slower. Top companies (YouTube, LinkedIn, Stripe) use skeleton screens so users perceive the page as already loaded.",
        analogy: "Think of an airport baggage conveyor illuminated by a sweeping spotlight beam. Even if your luggage hasn't arrived yet, seeing the light moving across the carousel reassures you that the machine is actively working.",
        syntax: `@keyframes shimmerWave {<br/>&nbsp;&nbsp;0% { background-position: 200% 0; }<br/>&nbsp;&nbsp;100% { background-position: -200% 0; }<br/>}<br/><code>background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);</code><br/><code>background-size: 200% 100%;</code>`,
        vscodeTrap: "Make sure you set 'background-size: 200% 100%;'! If background-size is left at default 100%, the gradient will repeat rigidly instead of smoothly sliding across the element.",
        starterCode: `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 220px;
    background: #0f172a;
    margin: 0;
  }

  /* 👉 STEP 1: Define @keyframes shimmer with 0% (background-position: 200% 0) and 100% (background-position: -200% 0) */


  .skeleton-card {
    width: 280px;
    background: #0b1329;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #1e293b;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .skeleton-item {
    border-radius: 6px;
    background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);
    background-size: 200% 100%;
    /* 👉 STEP 2: Apply animation: shimmer 1.6s infinite linear */

  }
</style>

<div class="skeleton-card">
  <div class="skeleton-item" style="height: 100px; width: 100%;"></div>
  <div class="skeleton-item" style="height: 20px; width: 80%;"></div>
  <div class="skeleton-item" style="height: 20px; width: 50%;"></div>
</div>`,
        checklist: [
            { id: "shimmer-keyframes", text: "Define <code>@keyframes shimmer</code> with <code>background-position: 200% 0</code> to <code>-200% 0</code>", test: "/@keyframes\\s+shimmer[\\s\\S]*?0%[\\s\\S]*?background-position\\s*:\\s*200%[\\s\\S]*?100%[\\s\\S]*?background-position\\s*:\\s*-200%/i.test(code)" },
            { id: "shimmer-animation", text: "Apply <code>animation: shimmer 1.6s infinite linear;</code> to <code>.skeleton-item</code>", test: "/\\.skeleton-item\\s*\\{[^}]*animation\\s*:[^}]*shimmer[^}]*1\\.6s[^}]*infinite[^}]*linear/i.test(code)" }
        ]
    },

    // ----------------------------------------------------
    // LESSON 7: Staggered Entrance Cascades
    // ----------------------------------------------------
    {
        num: 7,
        title: "Staggered Entrance Cascades",
        desc: "Sequence cards and list items to slide and fade in one-by-one using CSS animation-delay and animation-fill-mode: both.",
        painPoint: "When 10 items pop onto the screen simultaneously, it overwhelms the user's visual attention. Cascading elements one after another guides the user's eye naturally down the page.",
        analogy: "Think of a row of falling dominoes. Instead of all tiles hitting the ground simultaneously, each tile triggers the next with a rhythmic, predictable 0.1-second delay.",
        syntax: `@keyframes slideFadeUp {<br/>&nbsp;&nbsp;from { opacity: 0; transform: translateY(18px); }<br/>&nbsp;&nbsp;to { opacity: 1; transform: translateY(0); }<br/>}<br/><code>animation: slideFadeUp 0.5s ease-out both;</code><br/><code>.item:nth-child(2) { animation-delay: 0.15s; }</code>`,
        vscodeTrap: "Always add 'both' or 'forwards' to animation-fill-mode! If omitted, elements will flash into visibility before their animation delay starts, ruining the entire staggered entrance.",
        starterCode: `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 240px;
    background: #0f172a;
    margin: 0;
  }

  /* 👉 STEP 1: Define @keyframes slideFadeUp from (opacity 0, translateY(18px)) to (opacity 1, translateY(0)) */


  .feed-container {
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .feed-card {
    background: #1e293b;
    color: #f8fafc;
    padding: 14px 18px;
    border-radius: 10px;
    border: 1px solid #334155;
    font-size: 0.9rem;
    font-weight: 600;
    /* 👉 STEP 2: Apply animation: slideFadeUp 0.5s ease-out both */

  }
  /* 👉 STEP 3: Add staggered animation-delay: 0.1s on :nth-child(2) and 0.2s on :nth-child(3) */
  .feed-card:nth-child(2) {

  }
  .feed-card:nth-child(3) {

  }
</style>

<div class="feed-container">
  <div class="feed-card">⚡ Project deployed to Vercel</div>
  <div class="feed-card">📦 Database backup completed</div>
  <div class="feed-card">🛡️ SSL certificate auto-renewed</div>
</div>`,
        checklist: [
            { id: "fade-keyframes", text: "Define <code>@keyframes slideFadeUp</code> with <code>from</code> (opacity 0, translateY) and <code>to</code> (opacity 1, translateY(0))", test: "/@keyframes\\s+slideFadeUp[\\s\\S]*?from[\\s\\S]*?opacity\\s*:\\s*0[\\s\\S]*?translateY[\\s\\S]*?to[\\s\\S]*?opacity\\s*:\\s*1/i.test(code)" },
            { id: "feed-animation", text: "Apply <code>animation: slideFadeUp 0.5s ease-out both;</code> to <code>.feed-card</code>", test: "/\\.feed-card\\s*\\{[^}]*animation\\s*:[^}]*slideFadeUp[^}]*0\\.5s[^}]*both/i.test(code)" },
            { id: "stagger-delays", text: "Add <code>animation-delay: 0.1s</code> on child 2 and <code>0.2s</code> on child 3", test: "/\\.feed-card:nth-child\\(2\\)\\s*\\{[^}]*animation-delay\\s*:\\s*0\\.1s/i.test(code) && /\\.feed-card:nth-child\\(3\\)\\s*\\{[^}]*animation-delay\\s*:\\s*0\\.2s/i.test(code)" }
        ]
    },

    // ----------------------------------------------------
    // LESSON 8: SVG Path Drawing Animations
    // ----------------------------------------------------
    {
        num: 8,
        title: "SVG Path Drawing Animations",
        desc: "Draw animated vector lines and checkmark icons dynamically using stroke-dasharray and stroke-dashoffset.",
        painPoint: "Static SVG icons feel ordinary. Animating the vector outline of a checkmark when a task completes gives the user a massive dopamine rush of achievement.",
        analogy: "Think of stroke-dasharray like drawing with a dashed pen where the dash is as long as the entire drawing (100px). By shifting the offset from 100px to 0px, the invisible dash glides into view, looking like a pen drawing the line in real-time.",
        syntax: `@keyframes drawPath {<br/>&nbsp;&nbsp;to { stroke-dashoffset: 0; }<br/>}<br/><code>stroke-dasharray: 100;</code><br/><code>stroke-dashoffset: 100;</code><br/><code>animation: drawPath 0.8s ease forwards;</code>`,
        vscodeTrap: "If your SVG path doesn't draw all the way, your 'stroke-dasharray' value was too small! Always set stroke-dasharray equal to or slightly greater than the total path length (e.g. 100).",
        starterCode: `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    background: #0f172a;
    margin: 0;
  }

  /* 👉 STEP 1: Define @keyframes drawCheck that animates stroke-dashoffset to 0 */


  .check-svg {
    filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.4));
  }
  .check-path {
    stroke-dasharray: 60;
    stroke-dashoffset: 60;
    /* 👉 STEP 2: Apply animation: drawCheck 0.8s ease-out forwards */

  }
</style>

<svg class="check-svg" width="90" height="90" viewBox="0 0 50 50">
  <circle cx="25" cy="25" r="21" fill="none" stroke="#10b981" stroke-width="4" />
  <path class="check-path" d="M14 26 L22 34 L36 18" fill="none" stroke="#10b981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
        checklist: [
            { id: "draw-keyframes", text: "Define <code>@keyframes drawCheck</code> animating <code>to { stroke-dashoffset: 0; }</code>", test: "/@keyframes\\s+drawCheck\\s*\\{[^}]*(to|100%)\\s*\\{[^}]*stroke-dashoffset\\s*:\\s*0/is.test(code)" },
            { id: "draw-animation", text: "Apply <code>animation: drawCheck 0.8s ease-out forwards;</code> to <code>.check-path</code>", test: "/\\.check-path\\s*\\{[^}]*animation\\s*:[^}]*drawCheck[^}]*0\\.8s[^}]*forwards/i.test(code)" }
        ]
    },

    // ----------------------------------------------------
    // LESSON 9: prefers-reduced-motion Accessibility
    // ----------------------------------------------------
    {
        num: 9,
        title: "prefers-reduced-motion Accessibility",
        desc: "Respect vestibular motion sensitivities by implementing accessible fallbacks with @media (prefers-reduced-motion: reduce).",
        painPoint: "Approximately 35% of adults over age 40 experience vestibular inner-ear sensitivities where rapid zooms or spinning animations trigger physical vertigo, nausea, or migraines.",
        analogy: "Think of an accessibility ramp beside a staircase. Healthy athletes can use the stairs (vibrant animation), but providing the ramp (reduced motion) ensures everyone can access the building safely and comfortably.",
        syntax: `@media (prefers-reduced-motion: reduce) {<br/>&nbsp;&nbsp;*, *::before, *::after {<br/>&nbsp;&nbsp;&nbsp;&nbsp;animation-duration: 0.01ms !important;<br/>&nbsp;&nbsp;&nbsp;&nbsp;transition-duration: 0.01ms !important;<br/>&nbsp;&nbsp;}<br/>}`,
        vscodeTrap: "Do NOT just set 'animation: none' because it can break state triggers that rely on animation events. Setting duration to '0.01ms !important' allows animations to trigger and finish instantly without visual disorientation.",
        starterCode: `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 220px;
    background: #0f172a;
    color: #f8fafc;
    margin: 0;
    gap: 16px;
  }
  @keyframes spinRing {
    100% { transform: rotate(360deg); }
  }
  .spinner {
    width: 44px;
    height: 44px;
    border: 4px solid #334155;
    border-top-color: #38bdf8;
    border-radius: 50%;
    animation: spinRing 1s linear infinite;
  }
  
  /* 👉 STEP 1: Add @media (prefers-reduced-motion: reduce) disabling animation-duration with 0.01ms !important */

</style>

<div class="spinner"></div>
<span style="font-size: 0.9rem; color: #94a3b8;">Processing secure payment...</span>`,
        checklist: [
            { id: "media-reduced", text: "Add <code>@media (prefers-reduced-motion: reduce)</code> rule", test: "/@media\\s*\\(\\s*prefers-reduced-motion\\s*:\\s*reduce\\s*\\)/i.test(code)" },
            { id: "zero-duration", text: "Set <code>animation-duration: 0.01ms !important;</code> or <code>animation: none !important;</code> inside media query", test: "/@media\\s*\\(\\s*prefers-reduced-motion\\s*:\\s*reduce\\s*\\)\\s*\\{[^}]*(animation-duration\\s*:\\s*0\\.01ms|animation\\s*:\\s*none)/is.test(code)" }
        ]
    },

    // ----------------------------------------------------
    // LESSON 10: Capstone: Production Motion UI Suite
    // ----------------------------------------------------
    {
        num: 10,
        title: "Capstone: Production Motion UI Suite",
        desc: "Build a complete production-grade feature card featuring glowing border shimmer, floating badge, tactile CTA, and spring animations.",
        painPoint: "Building individual isolated animations is easy, but combining multiple micro-interactions (hover elevation, spring physics, active feedback, accessibility) into a cohesive production design requires architectural discipline.",
        analogy: "Think of an orchestra symphony. The violins (hover lift), percussion (active click), and brass (border glow) must harmonize with precise timing curves without drowning each other out.",
        syntax: `<code>.card:hover { transform: translateY(-6px); }</code><br/><code>.cta-btn:hover { transform: scale(1.06); }</code><br/><code>.cta-btn:active { transform: scale(0.96); }</code>`,
        vscodeTrap: "Never mix CPU-heavy properties (like animating border-width or margin) with GPU transforms. Stick purely to transform, opacity, and box-shadow for flawless 60 FPS performance.",
        starterCode: `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 280px;
    background: #0f172a;
    margin: 0;
  }

  /* 👉 STEP 1: Configure .pro-card with smooth GPU transition for transform and box-shadow over 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) */
  .pro-card {
    width: 290px;
    background: #1e293b;
    color: #f8fafc;
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #334155;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    cursor: pointer;

  }
  /* 👉 STEP 2: Elevate .pro-card on :hover with translateY(-8px) and border-color: #f43f5e */
  .pro-card:hover {

  }

  /* 👉 STEP 3: Configure .pro-btn with spring transition over 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) */
  .pro-btn {
    width: 100%;
    margin-top: 16px;
    padding: 12px;
    background: linear-gradient(135deg, #f43f5e, #e11d48);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-weight: 800;
    cursor: pointer;

  }
  /* 👉 STEP 4: Add .pro-btn:hover (scale 1.04) and .pro-btn:active (scale 0.96) */
  .pro-btn:hover {

  }
  .pro-btn:active {

  }

  /* 👉 STEP 5: Add @media (prefers-reduced-motion: reduce) fallback */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>

<div class="pro-card">
  <span style="background: #f43f5e; color: white; font-size: 0.72rem; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">Premium UI</span>
  <h3 style="margin: 10px 0 6px 0;">Motion Design Suite</h3>
  <p style="margin: 0; color: #94a3b8; font-size: 0.85rem;">Hardware accelerated, tactile micro-interactions, and accessible.</p>
  <button class="pro-btn">Upgrade Workspace 🚀</button>
</div>`,
        checklist: [
            { id: "card-spring", text: "Add <code>transition: transform 0.3s cubic-bezier...</code> to <code>.pro-card</code>", test: "/\\.pro-card\\s*\\{[^}]*transition\\s*:[^}]*transform/i.test(code)" },
            { id: "card-hover-elevate", text: "Add <code>transform: translateY(-8px)</code> and <code>border-color: #f43f5e</code> on <code>.pro-card:hover</code>", test: "/\\.pro-card:hover\\s*\\{[^}]*translateY\\(\\s*-8px\\s*\\)[^}]*border-color/i.test(code)" },
            { id: "btn-spring", text: "Add <code>transition: transform 0.3s</code> to <code>.pro-btn</code>", test: "/\\.pro-btn\\s*\\{[^}]*transition\\s*:[^}]*transform/i.test(code)" },
            { id: "btn-hover-scale", text: "Add <code>transform: scale(1.04)</code> on <code>.pro-btn:hover</code>", test: "/\\.pro-btn:hover\\s*\\{[^}]*scale\\(\\s*1\\.04\\s*\\)/i.test(code)" },
            { id: "btn-active-press", text: "Add <code>transform: scale(0.96)</code> on <code>.pro-btn:active</code>", test: "/\\.pro-btn:active\\s*\\{[^}]*scale\\(\\s*0\\.96\\s*\\)/i.test(code)" },
            { id: "a11y-fallback", text: "Ensure <code>@media (prefers-reduced-motion: reduce)</code> is present", test: "/@media\\s*\\(\\s*prefers-reduced-motion\\s*:\\s*reduce\\s*\\)/i.test(code)" }
        ]
    }
];

function escapeAstroHtml(str, allowFormattingTags = false) {
    if (!str) return '';
    let s = str.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
    
    if (!allowFormattingTags) {
        return s.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    } else {
        s = s.replace(/<code>/g, '___CODE_OPEN___')
             .replace(/<\/code>/g, '___CODE_CLOSE___')
             .replace(/<br\s*\/?>/g, '___BR___')
             .replace(/<strong>/g, '___STRONG_OPEN___')
             .replace(/<\/strong>/g, '___STRONG_CLOSE___');
        
        s = s.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        s = s.replace(/___CODE_OPEN___/g, '<code>')
             .replace(/___CODE_CLOSE___/g, '</code>')
             .replace(/___BR___/g, '<br/>')
             .replace(/___STRONG_OPEN___/g, '<strong>')
             .replace(/___STRONG_CLOSE___/g, '</strong>');
        return s;
    }
}

// Generate each lesson file
for (const lesson of lessonsData) {
    const filePath = path.join(targetDir, `lesson${lesson.num}_remake.astro`);
    const nextUrl = lesson.num < 10 ? `/6. partF/branchE/lesson${lesson.num + 1}_remake.html` : `/6. partF/hub.html`;

    const content = `---
import LessonLayout from '../../../layouts/LessonLayout.astro';

const starterCode = \`${lesson.starterCode}\`;

const branchLessons = ${JSON.stringify(branchLessons, null, 4)};
---

<LessonLayout
    title="Milestone ${String(lesson.num).padStart(2, '0')}: ${lesson.title} | Level 7E • CSS Motion"
    description="${escapeAstroHtml(lesson.desc, false)}"
    levelTag="Level 7E • CSS Motion"
    lessonNum={${lesson.num}}
    lessonTitle="${lesson.title}"
    xpAmount={150}
    completionKey="partF_branchE_lesson${lesson.num}_complete"
    nextLessonUrl="${nextUrl}"
    hubUrl="/6. partF/hub.html"
    hubTitle="Level 7 Hub"
    hubIcon="🚀"
    fileTab="styles.css"
    starterCode={starterCode}
    mode="html"
    jumpLessons={branchLessons}
    certificateUrl="/6. partF/certificate.html"
    trackPrefix="partF_branchE"
>
    <!-- Intro Slot -->
    <p class="lesson-subtitle" slot="intro">
        ${escapeAstroHtml(lesson.desc, false)}
    </p>

    <!-- Concept Slot (Left Pane) -->
    <div slot="concept" style="display: flex; flex-direction: column; gap: 16px;">
        
        <!-- 🎯 PROGATE-STYLE TOP MISSION CARD: Immediately informs learner what to do -->
        <article class="concept-card mission-card">
            <div class="mission-header">
                <h3><span>🎯</span> Your Mission</h3>
                <span class="checklist-counter" id="checklistCounter">0 / ${lesson.checklist.length}</span>
            </div>
            <div class="target-output-preview" style="background: #f1f5f9; border-radius: 8px; padding: 10px 12px; margin: 8px 0 12px 0; border: 1px dashed #94a3b8; font-size: 0.82rem;">
                <strong style="color: #334155;">🖼️ Target Goal:</strong>
                <div style="color: #475569; margin-top: 3px;">Live Preview Verification: <code>Interactive CSS Motion &amp; 60 FPS Render</code></div>
            </div>
            <p class="mission-subtitle">Follow the step-by-step instructions below in the editor:</p>
            <div id="taskChecklist"></div>
        </article>
        
        <!-- The Real-World CSS Problem -->
        <article class="concept-card" style="background: #fff7ed; border-left: 4px solid #f97316;">
            <h3 style="color: #c2410c;"><span>🚨</span> The Real-World Problem</h3>
            <p style="color: #9a3412; font-size: 0.88rem; line-height: 1.6; margin: 0;">${escapeAstroHtml(lesson.painPoint, false)}</p>
        </article>

        <!-- Core Concept & Analogy -->
        <article class="concept-card">
            <h3><span>💡</span> Core Architecture &amp; Mental Model</h3>
            <div class="analogy-callout">
                <strong>Real-World Analogy:</strong> ${escapeAstroHtml(lesson.analogy, false)}
            </div>
        </article>

        <!-- Syntax & Anatomy Breakdown -->
        <article class="concept-card">
            <h3><span>🔬</span> Syntax &amp; Anatomy Breakdown</h3>
            <div style="font-size: 0.85rem; color: #334155; line-height: 1.7;">
                ${escapeAstroHtml(lesson.syntax, true)}
            </div>
        </article>

        <!-- The VS Code Beginner Trap -->
        <article class="concept-card" style="background: #fef2f2; border-left: 4px solid #ef4444;">
            <h3 style="color: #b91c1c;"><span>⚠️</span> The Browser &amp; CSS Beginner Trap</h3>
            <p style="color: #991b1b; font-size: 0.88rem; line-height: 1.6; margin: 0;">${escapeAstroHtml(lesson.vscodeTrap, false)}</p>
        </article>

        <!-- Reference Pattern / Starter Code -->
        <article class="concept-card">
            <h3><span>💻</span> Reference Pattern</h3>
            <p style="color: #475569; font-size: 0.88rem; margin: 0 0 8px 0;">CSS motion architectural specification:</p>
            <div class="code-snippet-box">
                <button class="snippet-copy-btn" type="button" aria-label="Copy code snippet">📋 Copy</button>
                <pre><code id="refCodeBox_branchE_${lesson.num}">${escapeAstroHtml(lesson.starterCode, false)}</code></pre>
            </div>
        </article>

    </div>
</LessonLayout>

<!-- Client-Side Scripts & Verification Engine -->
<script>
    import { DojoEngine } from '../../../scripts/dojo';

    function initLesson() {
        const editor = document.getElementById('lessonEditor') as HTMLTextAreaElement | null;
        const lineNumbers = document.getElementById('ideLineNumbers');
        const lineNumbersInner = document.getElementById('ideLineNumbersInner') || lineNumbers;
        const previewIframe = document.getElementById('livePreviewIframe') as HTMLIFrameElement | null;
        const checkBtn = document.getElementById('checkAnswerBtn');
        const resetBtn = document.getElementById('resetEditorBtn');

        if (!editor) return;

        const DRAFT_KEY = 'novicodes_draft_partF_branchE_lesson${lesson.num}';
        const DEFAULT_STARTER = \`${lesson.starterCode}\`;

        // 1. Initialize Real-Time Checklist
        DojoEngine.initChecklist([
            ${lesson.checklist.map(c => `{\n                id: "${c.id}",\n                label: ${JSON.stringify(c.text)},\n                fn: (code) => { try { return Boolean(${c.test}); } catch(e) { return false; } }\n            }`).join(',\n            ')}
        ], {
            containerId: 'taskChecklist',
            mode: 'html'
        });

        // 2. Line numbers & scroll sync
        function syncScroll() {
            if (lineNumbersInner && editor) {
                lineNumbersInner.style.transform = \`translateY(-\${editor.scrollTop}px)\`;
            }
        }

        function updateEditor() {
            if (!editor || !lineNumbersInner) return;
            const lines = editor.value.split('\\n');
            const lineCount = Math.max(lines.length, 1);
            lineNumbersInner.textContent = Array.from({ length: lineCount }, (_, i) => i + 1).join('\\n');
            syncScroll();

            // Real-Time Live Preview in Iframe
            if (previewIframe) {
                previewIframe.srcdoc = editor.value;
            }

            // Real-Time Checklist Verification
            DojoEngine.runChecklist(editor.value);
        }

        // 3. Draft Auto-Save & Crash Resilience
        DojoEngine.setupDraftPersistence(editor, DRAFT_KEY, DEFAULT_STARTER, updateEditor);

        editor.addEventListener('scroll', syncScroll);

        editor.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
                editor.selectionStart = editor.selectionEnd = start + 2;
                updateEditor();
            }
        });

        // 4. Safe Reset Button Handler
        if (resetBtn) {
            DojoEngine.setupResetButton(resetBtn, editor, DRAFT_KEY, DEFAULT_STARTER, () => {
                updateEditor();
            });
        }

        // 5. Check & Verify Code Action
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                DojoEngine.verifySubmission(editor.value, {
                    lessonTitle: ${JSON.stringify(lesson.title)},
                    xp: 150,
                    completionKey: 'partF_branchE_lesson${lesson.num}_complete',
                    nextUrl: '${nextUrl}',
                    mode: 'html'
                });
            });
        }

        // Initial render
        updateEditor();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLesson);
    } else {
        initLesson();
    }
</script>
`;

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Generated: ${filePath}`);
}

console.log('🎉 All 10 Level 7E CSS Motion lessons generated successfully!');
