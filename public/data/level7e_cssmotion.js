/**
 * NoviCodes - Level 7E: CSS Motion & Micro-Interactions Foundations Data Module
 */
window.LEVEL7E_CSSMOTION_DATA = {
    "id": "level7e_cssmotion",
    "title": "Level 7E: CSS Motion & Micro-Interactions Foundations",
    "subtitle": "Hardware-Accelerated Transforms, Keyframes, Spring Physics & SVG",
    "badgeIcon": "🎨",
    "xpReward": 300,
    "trackKey": "cssmotion",
    "nextTrackUrl": "/6. partF/branchE/lesson1_remake.html",
    "nextTrackName": "Level 7E: CSS Motion Dojo",
    "concepts": {
        "heroAnalogy": {
            "title": "CSS Motion is Like Smooth Puppetry on a Hardware-Accelerated Stage",
            "description": "Most websites feel like frozen, static paper: clicking a button makes it instantly teleport to another state with zero visual feedback. Poor animations animate properties like 'top', 'left', or 'width', causing the browser to recalculate the entire page layout 60 times a second (called layout thrashing or jank), making mobile devices stutter. Hardware-accelerated CSS animations use dedicated GPU layers (transform and opacity) to glide elements smoothly at 60 FPS without making the browser repaint the rest of the screen!",
            "icon": "🎨"
        },
        "sections": [
            {
                "title": "1. CSS Transitions vs Keyframe Animations",
                "content": `
                <p>Modern CSS gives you two primary ways to create motion:</p>
                <div class="code-explain-box">
                    <pre><code>/* 1. CSS Transition: Smoothly changes from State A to State B on user action */
.btn {
  background-color: #0284c7;
  transform: scale(1);
  transition: transform 0.2s ease, background-color 0.2s ease;
}
.btn:hover {
  background-color: #0369a1;
  transform: scale(1.05); /* Smooth 5% zoom */
}

/* 2. Keyframe Animation: Multi-step looping or auto-playing sequences */
@keyframes pulseGlow {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.7; }
}
.live-indicator {
  animation: pulseGlow 2s infinite ease-in-out;
}</code></pre>
                </div>
                <p>Use <strong>Transitions</strong> for interactive responses (hover, active click, toggle switch) and <strong>Keyframe Animations</strong> for loading spinners, entrance fades, and attention badges.</p>
                `
            },
            {
                "title": "2. The 4 Cheap GPU Properties (Avoiding Layout Jank)",
                "content": `
                <p>The browser renders in three steps: <strong>Layout (Reflow)</strong> $\\rightarrow$ <strong>Paint</strong> $\\rightarrow$ <strong>Composite</strong>. Calculating layout geometry is the slowest operation in the browser engine.</p>
                <div class="tip-box" style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 12px 16px; border-radius: 8px; margin: 12px 0;">
                    <strong style="color: #065f46;">🟢 The 4 Hardware-Accelerated Properties:</strong>
                    <ul style="margin: 6px 0 0 18px; color: #047857;">
                        <li><code>transform: translate(x, y)</code> &mdash; Moves elements without moving surrounding neighbors</li>
                        <li><code>transform: scale(n)</code> &mdash; Zooms elements up or down</li>
                        <li><code>transform: rotate(deg)</code> &mdash; Spins elements around an origin point</li>
                        <li><code>opacity: 0 to 1</code> &mdash; Fades elements in or out</li>
                    </ul>
                </div>
                <p><strong>Never animate:</strong> <code>top</code>, <code>left</code>, <code>width</code>, <code>height</code>, or <code>margin</code>. They force the entire page to re-layout on every single frame, causing stutter and lag!</p>
                `
            },
            {
                "title": "3. Easing Curves & Spring Physics (Natural Motion)",
                "content": `
                <p>Real-world objects never start and stop at constant robotic speeds (<code>linear</code>). Cars accelerate gradually and brake before coming to a complete stop.</p>
                <div class="code-explain-box">
                    <pre><code>/* 🏎️ ease-out: Fast start, gentle deceleration (Best for UI entrances) */
transition: transform 0.25s ease-out;

/* 🚀 ease-in: Slow start, fast exit (Best for elements leaving screen) */
transition: transform 0.2s ease-in;

/* 🎯 Custom Cubic-Bézier Spring: Elastic overshoot and bounce */
transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);</code></pre>
                </div>
                <p>Values above <code>1.0</code> in cubic-bezier curves create a tactile spring effect, where the element slightly overshoots its target size and snaps back naturally like rubber.</p>
                `
            },
            {
                "title": "4. Micro-Interactions: Tactile Buttons & Skeleton Shimmers",
                "content": `
                <p>Micro-interactions are small, delightful moments that confirm a user's action:</p>
                <div class="code-explain-box">
                    <pre><code>/* Tactile 3D Button Press */
.action-btn {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
.action-btn:active {
  transform: translateY(1px) scale(0.98); /* Physical mechanical click sensation */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}</code></pre>
                </div>
                `
            },
            {
                "title": "5. Accessibility: Respecting prefers-reduced-motion",
                "content": `
                <p>Some users experience dizziness, vertigo, or nausea when screen elements move or zoom rapidly due to vestibular system sensitivities. Always include an accessible fallback:</p>
                <div class="code-explain-box">
                    <pre><code>@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}</code></pre>
                </div>
                <p>This single media query guarantees that your animations never cause physical discomfort for users who requested minimal motion in their operating system accessibility settings.</p>
                `
            }
        ]
    },
    "glossary": [
        {
            "term": "CSS Transition",
            "category": "State Animation",
            "definition": "A CSS feature that smoothly interpolates between two property states when triggered by pseudo-classes like :hover or :active.",
            "analogy": "A dimmer switch smoothly gliding room lights from bright to dim instead of an abrupt flip.",
            "codeSnippet": "transition: transform 0.3s ease, background-color 0.3s ease;"
        },
        {
            "term": "@keyframes",
            "category": "Keyframe Timing",
            "definition": "A CSS at-rule that defines multi-step intermediate keyframe percentages (0% to 100%) for continuous animation sequences.",
            "analogy": "An animation flipbook where each page illustrates the character at a specific percent of the jump.",
            "codeSnippet": "@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.2); } }"
        },
        {
            "term": "GPU Compositing",
            "category": "Performance",
            "definition": "Rendering visual transformations (transform, opacity) directly on graphics hardware without triggering layout reflow or repaint.",
            "analogy": "Moving physical puppets on clear glass layers instead of tearing down and rebuilding the entire stage wall.",
            "codeSnippet": "transform: translateY(-8px) scale(1.04);"
        },
        {
            "term": "Cubic-Bézier",
            "category": "Physics & Easing",
            "definition": "A mathematical curve controlling acceleration, deceleration, and elastic spring bounce over the animation duration.",
            "analogy": "A stretched rubber band pulling an object past its target before settling into place.",
            "codeSnippet": "transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);"
        },
        {
            "term": "Micro-Interaction",
            "category": "Tactile UI",
            "definition": "A small, focused visual response that provides instant physical feedback when users interact with buttons, toggles, or cards.",
            "analogy": "The satisfying mechanical click and physical depression of an arcade button.",
            "codeSnippet": ".btn:active { transform: translateY(2px); box-shadow: 0 1px 0 #334155; }"
        },
        {
            "term": "prefers-reduced-motion",
            "category": "Accessibility (A11y)",
            "definition": "A CSS media query that detects if the user requested minimal motion in their operating system accessibility preferences.",
            "analogy": "A sensitivity mode that stops flashing lights and motion rides for passengers with vestibular dizziness.",
            "codeSnippet": "@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; } }"
        }
    ],
    "sandbox": {
        "title": "Interactive CSS Motion Playground",
        "description": "Experiment with hardware-accelerated transforms, spring easing, and hover elevation in real-time:",
        "initialHTML": `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 240px;
    background: #0f172a;
    color: #f8fafc;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
  }
  .card {
    background: #1e293b;
    border: 1px solid #334155;
    padding: 24px 28px;
    border-radius: 16px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
    text-align: center;
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease, border-color 0.35s ease;
    cursor: pointer;
  }
  .card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 16px 32px rgba(244, 63, 94, 0.25);
    border-color: #f43f5e;
  }
  .card:active {
    transform: translateY(-2px) scale(0.98);
  }
  .badge {
    display: inline-block;
    background: linear-gradient(135deg, #f43f5e, #e11d48);
    color: #ffffff;
    font-size: 0.72rem;
    font-weight: 800;
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
</style>
</head>
<body>
  <div class="card">
    <span class="badge">Hover &amp; Click Me</span>
    <h3 style="margin: 0 0 6px 0; font-size: 1.1rem;">Tactile Spring Card</h3>
    <p style="margin: 0; color: #94a3b8; font-size: 0.85rem;">GPU accelerated with custom cubic-bezier spring physics!</p>
  </div>
</body>
</html>`
    },
    "quizzes": [
        {
            "id": "q1",
            "question": "Which of the following CSS properties can the browser animate smoothly on the GPU without triggering expensive page reflows?",
            "options": [
                "top and left offsets",
                "width and height",
                "transform and opacity",
                "margin-left and padding"
            ],
            "correctIndex": 2,
            "explanation": "transform (translate, scale, rotate) and opacity are computed on dedicated GPU compositor layers without forcing layout recalculation (reflow)."
        },
        {
            "id": "q2",
            "question": "What is the primary difference between a CSS Transition and a CSS @keyframes Animation?",
            "options": [
                "Transitions only work on mobile devices",
                "Transitions require user interaction (A to B), while @keyframes can run automatically and loop across multiple steps",
                "@keyframes cannot change colors, only positions",
                "Transitions run on the GPU while @keyframes run on the CPU"
            ],
            "correctIndex": 1,
            "explanation": "Transitions smoothly interpolate between two states when triggered (e.g. on hover), whereas @keyframes can loop continuously and define multi-stage animation sequences."
        },
        {
            "id": "q3",
            "question": "Why should every production website support the @media (prefers-reduced-motion: reduce) media query?",
            "options": [
                "It speeds up JavaScript execution time by 50%",
                "It is required to make CSS transitions work on iOS Safari",
                "It respects users with vestibular motion sensitivities who may experience dizziness or nausea from large motion effects",
                "It forces the browser to convert SVG animations to WebP"
            ],
            "correctIndex": 2,
            "explanation": "Vestibular disorders cause physical discomfort when screen elements spin or slide rapidly. Respecting prefers-reduced-motion ensures your website is accessible and comfortable for all users."
        }
    ]
};
