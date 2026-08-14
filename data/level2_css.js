/**
 * NoviCodes - Level 2: CSS Foundations Data Module
 * Enriched with Deep Visual Analogies & Interactive Architectures
 */
window.LEVEL2_CSS_DATA = {
    id: "level2_css",
    title: "Level 2: CSS Foundations",
    subtitle: "Styling, Architecture, Box Model & Modern Flexbox Layouts",
    badgeIcon: "🎨",
    xpReward: 300,
    trackKey: "css",
    nextTrackUrl: "./foundations.html?track=js",
    nextTrackName: "Level 3: JavaScript Foundations",

    // 1. Deep Concept Explanation & Analogy
    concepts: {
        heroAnalogy: {
            title: "CSS is Like Interior Design, Architecture & Styling",
            description: "If HTML builds the raw structural wood frame of a house, CSS (Cascading Style Sheets) is the interior designer and architect. CSS paints the walls, selects typography, defines responsive fluid layouts (Flexbox & Grid), and creates delightful micro-interactions and smooth animations that make web apps feel alive.",
            icon: "🎨",
            hasInteractiveDemo: true,
            demoType: "css_styler"
        },
        sections: [
            {
                title: "1. The CSS Box Model: The 4 Protective Layers",
                content: `
                    <p>Every HTML element on a webpage is considered a rectangular box consisting of 4 nested layers. Hover over each layer below to see how it works in real-time:</p>
                    
                    <div class="concept-interactive-container" id="cssBoxModelWidget">
                        <div class="box-model-interactive-canvas">
                            <div class="box-model-visual-frame" id="bmMarginLayer" data-layer="margin">
                                MARGIN (Outer Buffer Space between Elements)
                                <div class="bm-layer-border" id="bmBorderLayer" data-layer="border">
                                    BORDER (Visible Decorative Frame Line)
                                    <div class="bm-layer-padding" id="bmPaddingLayer" data-layer="padding">
                                        PADDING (Inner Breathing Space around Content)
                                        <div class="bm-layer-content" id="bmContentLayer" data-layer="content">
                                            CONTENT (Text, Images, Icons)
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="box-model-readout" id="boxModelReadout">
                                <strong>💡 Hover over any Box Model layer above</strong> to see its purpose and computed spacing!
                            </div>
                        </div>
                    </div>
                `
            },
            {
                title: "2. CSS Selectors & Specificity: Who Wins the Styling Battle?",
                content: `
                    <p>When multiple CSS rules target the same element, the browser uses a scoring system called <strong>Specificity</strong> to decide which style takes priority:</p>
                    <div class="code-explain-box">
                        <pre><code>/* 1. Element Selector (Lowest Priority - Score: 1) */
p { color: #333333; }

/* 2. Class Selector (Medium Priority - Score: 10) */
.highlight-text { color: #2563eb; font-weight: bold; }

/* 3. ID Selector (High Priority - Score: 100) */
#hero-headline { color: #db2777; font-size: 2.5rem; }

/* 4. Inline Style (Highest Priority - Score: 1000) */
&lt;p style="color: #10b981;"&gt;Inline Green Text&lt;/p&gt;</code></pre>
                    </div>
                    <p><strong>💡 Pro Tip:</strong> Always prefer <strong>Class Selectors (<code>.classname</code>)</strong> for reusable UI components, and avoid overusing IDs or <code>!important</code>!</p>
                `
            },
            {
                title: "3. Flexbox Engine: Instant 1-Dimensional Alignment",
                content: `
                    <p>Flexbox revolutionized web layouts by making horizontal and vertical alignment frictionless. Test the live alignment controls below:</p>
                    
                    <div class="concept-interactive-container" id="cssFlexboxWidget">
                        <div class="interactive-control-bar">
                            <button class="concept-toggle-btn active" data-flex-dir="row">↔️ Row</button>
                            <button class="concept-toggle-btn" data-flex-dir="column">↕️ Column</button>
                            <button class="concept-toggle-btn" data-flex-justify="center">🎯 Center</button>
                            <button class="concept-toggle-btn" data-flex-justify="space-between">↔️ Space Between</button>
                        </div>
                        <div class="flex-sandbox-viewport" id="flexSandboxViewport">
                            <div class="flex-item-block">1</div>
                            <div class="flex-item-block">2</div>
                            <div class="flex-item-block">3</div>
                        </div>
                    </div>
                `
            }
        ]
    },

    // 2. Interactive Terms & Glossary Bank
    glossary: [
        {
            term: "CSS (Cascading Style Sheets)",
            category: "Core Concept",
            definition: "The style sheet language used to describe the presentation, colors, fonts, and layout of an HTML document.",
            analogy: "The paint, upholstery, lighting, and interior decoration of a building.",
            codeSnippet: "body { background: #f8fafc; color: #0f172a; }"
        },
        {
            term: "Box Model",
            category: "Layout Engine",
            definition: "The fundamental concept that every HTML element consists of Margin, Border, Padding, and Content.",
            analogy: "A framed picture: Content is photo, Padding is white mat border, Border is wood frame, Margin is wall space around the frame.",
            codeSnippet: ".card { margin: 16px; padding: 20px; border: 1px solid #ccc; }"
        },
        {
            term: "Flexbox (Flexible Box Layout)",
            category: "Layout Engine",
            definition: "A 1-dimensional layout model providing powerful alignment and space distribution among items in a container.",
            analogy: "A dynamic conveyor belt that stretches and positions products neatly in a row.",
            codeSnippet: ".container { display: flex; justify-content: center; align-items: center; }"
        },
        {
            term: "Specificity",
            category: "Core Concept",
            definition: "The algorithm browsers use to determine which CSS rule applies when multiple rules match the same element.",
            analogy: "A hierarchy of authority: Specific orders from a manager override general guidelines.",
            codeSnippet: "/* ID (#) beats Class (.) which beats Tag (p) */\n#header { color: blue; }"
        },
        {
            term: "CSS Variables (Custom Properties)",
            category: "Modern Architecture",
            definition: "Entities defined by CSS authors that contain specific values to be reused throughout a document (e.g. var(--brand-color)).",
            analogy: "Named paint swatches at a store: change the swatch once, and all painted rooms update automatically.",
            codeSnippet: ":root { --brand: #2563eb; }\nbutton { background: var(--brand); }"
        }
    ],

    // 3. Code Sandbox Exercises
    sandbox: {
        title: "CSS Live Design Studio",
        starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #f8fafc;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .profile-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s ease;
      max-width: 300px;
    }
    .profile-card:hover {
      transform: translateY(-4px);
    }
    .badge {
      background: #eff6ff;
      color: #2563eb;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="profile-card">
    <div style="font-size: 2.5rem; margin-bottom: 8px;">🚀</div>
    <span class="badge">CSS Master</span>
    <h2 style="margin: 12px 0 6px 0; color: #0f172a;">Developer Alex</h2>
    <p style="color: #64748b; font-size: 0.9rem; margin: 0;">Level 2 CSS Graduate crafting beautiful user experiences!</p>
  </div>
</body>
</html>`,
        tasks: [
            "Change the background color of .profile-card to a dark theme (#0f172a)",
            "Change the text color of the <h2> and <p> elements to match",
            "Experiment with increasing the border-radius and box-shadow"
        ]
    },

    // 4. Quiz & Verification
    quiz: {
        title: "Level 2: CSS Verification Challenge",
        questions: [
            {
                q: "Which property in the CSS Box Model creates transparent space OUTSIDE the border?",
                options: [
                    { text: "Margin", correct: true },
                    { text: "Padding", correct: false },
                    { text: "Content", correct: false }
                ],
                explanation: "Margin provides space outside the border separating the element from other elements on the page."
            },
            {
                q: "How do you select an HTML element with class='highlight' in CSS?",
                options: [
                    { text: ".highlight", correct: true },
                    { text: "#highlight", correct: false },
                    { text: "highlight", correct: false }
                ],
                explanation: "Class selectors in CSS begin with a period (.) followed by the class name."
            },
            {
                q: "Which Flexbox property aligns items along the primary horizontal main axis?",
                options: [
                    { text: "justify-content", correct: true },
                    { text: "align-items", correct: false },
                    { text: "flex-direction", correct: false }
                ],
                explanation: "justify-content aligns flex items along the main axis (horizontal in row mode)."
            }
        ]
    }
};
