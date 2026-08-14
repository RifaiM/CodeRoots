/**
 * NoviCodes - Level 2: CSS Foundations Data Module
 */
window.LEVEL2_CSS_DATA = {
    "id": "level2_css",
    "title": "Level 2: CSS Foundations",
    "subtitle": "Styling, Architecture, Box Model & Modern Flexbox Layouts",
    "badgeIcon": "🎨",
    "xpReward": 300,
    "trackKey": "css",
    "nextTrackUrl": "./foundations.html?track=js",
    "nextTrackName": "Level 3: JavaScript Foundations",
    "concepts": {
        "heroAnalogy": {
            "title": "CSS is Like Interior Design, Architecture & Styling",
            "description": "If HTML builds the raw structural wood frame of a house, CSS (Cascading Style Sheets) is the interior designer and architect. CSS paints the walls, selects typography, defines responsive fluid layouts (Flexbox & Grid), and creates delightful micro-interactions and smooth animations that make web apps feel alive.",
            "icon": "🎨",
            "hasInteractiveDemo": true,
            "demoType": "css_styler"
        },
        "sections": [
            {
                "title": "1. The CSS Box Model: The 4 Protective Layers",
                "content": "\n                    <p>Every HTML element on a webpage is considered a rectangular box consisting of 4 nested layers. Hover over each layer below to see how it works in real-time:</p>\n                    \n                    <div class=\"concept-interactive-container\" id=\"cssBoxModelWidget\">\n                        <div class=\"box-model-interactive-canvas\">\n                            <div class=\"box-model-visual-frame\" id=\"bmMarginLayer\" data-layer=\"margin\">\n                                MARGIN (Outer Buffer Space between Elements)\n                                <div class=\"bm-layer-border\" id=\"bmBorderLayer\" data-layer=\"border\">\n                                    BORDER (Visible Decorative Frame Line)\n                                    <div class=\"bm-layer-padding\" id=\"bmPaddingLayer\" data-layer=\"padding\">\n                                        PADDING (Inner Breathing Space around Content)\n                                        <div class=\"bm-layer-content\" id=\"bmContentLayer\" data-layer=\"content\">\n                                            CONTENT (Text, Images, Icons)\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"box-model-readout\" id=\"boxModelReadout\">\n                                <strong>💡 Hover over any Box Model layer above</strong> to see its purpose and computed spacing!\n                            </div>\n                        </div>\n                    </div>\n                "
            },
            {
                "title": "2. CSS Selectors & Specificity: Who Wins the Styling Battle?",
                "content": "\n                    <p>When multiple CSS rules target the same element, the browser uses a scoring system called <strong>Specificity</strong> to decide which style takes priority:</p>\n                    <div class=\"code-explain-box\">\n                        <pre><code>/* 1. Element Selector (Lowest Priority - Score: 1) */\np { color: #333333; }\n\n/* 2. Class Selector (Medium Priority - Score: 10) */\n.highlight-text { color: #2563eb; font-weight: bold; }\n\n/* 3. ID Selector (High Priority - Score: 100) */\n#hero-headline { color: #db2777; font-size: 2.5rem; }\n\n/* 4. Inline Style (Highest Priority - Score: 1000) */\n&lt;p style=\"color: #10b981;\"&gt;Inline Green Text&lt;/p&gt;</code></pre>\n                    </div>\n                    <p><strong>💡 Pro Tip:</strong> Always prefer <strong>Class Selectors (<code>.classname</code>)</strong> for reusable UI components, and avoid overusing IDs or <code>!important</code>!</p>\n                "
            },
            {
                "title": "3. Flexbox Engine: Instant 1-Dimensional Alignment",
                "content": "\n                    <p>Flexbox revolutionized web layouts by making horizontal and vertical alignment frictionless. Test the live alignment controls below:</p>\n                    \n                    <div class=\"concept-interactive-container\" id=\"cssFlexboxWidget\">\n                        <div class=\"interactive-control-bar\">\n                            <button class=\"concept-toggle-btn active\" data-flex-dir=\"row\">↔️ Row</button>\n                            <button class=\"concept-toggle-btn\" data-flex-dir=\"column\">↕️ Column</button>\n                            <button class=\"concept-toggle-btn\" data-flex-justify=\"center\">🎯 Center</button>\n                            <button class=\"concept-toggle-btn\" data-flex-justify=\"space-between\">↔️ Space Between</button>\n                        </div>\n                        <div class=\"flex-sandbox-viewport\" id=\"flexSandboxViewport\">\n                            <div class=\"flex-item-block\">1</div>\n                            <div class=\"flex-item-block\">2</div>\n                            <div class=\"flex-item-block\">3</div>\n                        </div>\n                    </div>\n                "
            }
        ]
    },
    "glossary": [
        {
            "term": "CSS (Cascading Style Sheets)",
            "category": "Core Concept",
            "definition": "The style sheet language used to specify document presentation, colors, layout, fonts, and responsiveness.",
            "analogy": "Paint, wallpaper, lighting, and interior design of a house.",
            "codeSnippet": "body { background: #f8fafc; color: #0f172a; }"
        },
        {
            "term": "Box Model",
            "category": "Layout Engine",
            "definition": "The foundational design rule where every element consists of Content, Padding, Border, and Margin.",
            "analogy": "A framed picture: Picture (Content), White matting (Padding), Wood frame (Border), Space to next picture (Margin).",
            "codeSnippet": "* { box-sizing: border-box; }"
        },
        {
            "term": "Flexbox",
            "category": "Layout Engine",
            "definition": "A 1-dimensional layout module that provides space distribution and alignment capabilities among items in a container.",
            "analogy": "Organizing books neatly side-by-side on a shelf.",
            "codeSnippet": "display: flex;\njustify-content: center;\nalign-items: center;"
        },
        {
            "term": "CSS Selector",
            "category": "Syntax",
            "definition": "A pattern used to select the HTML elements you want to style.",
            "analogy": "Calling out someone by name ('John') vs calling out a role ('Students').",
            "codeSnippet": ".button-primary { background: #2563eb; }"
        },
        {
            "term": "Media Query (@media)",
            "category": "Responsiveness",
            "definition": "A CSS technique used to apply styles conditionally based on device viewport width or features.",
            "analogy": "Wearing a winter coat when it snows vs shorts when sunny.",
            "codeSnippet": "@media (max-width: 768px) {\n  .nav-menu { display: none; }\n}"
        },
        {
            "term": "CSS Specificity & The Cascade",
            "category": "Core Concept",
            "definition": "The scoring algorithm browsers use to decide which CSS property value is applied to an element when multiple rules conflict (!important > inline style > #id > .class > tag).",
            "analogy": "Rank authority in an organization: CEO order > Director order > Manager order.",
            "codeSnippet": "/* ID (#card) beats Class (.card) */\n#mainCard { background: red; }\n.card { background: blue; }"
        },
        {
            "term": "CSS Positioning (relative, absolute, fixed, sticky)",
            "category": "Layout Engine",
            "definition": "Defines how an element is positioned in the document flow: relative (offset from self), absolute (offset from positioned parent), fixed (locked to screen viewport), sticky (hybrid scroll lock).",
            "analogy": "Fixed: A tattoo on your arm. Sticky: A magnetic memo on your fridge that slides until it hits the top.",
            "codeSnippet": ".modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}"
        },
        {
            "term": "CSS Grid (2D Layout)",
            "category": "Layout Engine",
            "definition": "A powerful 2-dimensional layout system that manages both columns and rows simultaneously.",
            "analogy": "A multi-column grid layout in a newspaper or chessboard.",
            "codeSnippet": ".grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}"
        },
        {
            "term": "CSS Variables (Custom Properties)",
            "category": "Architecture",
            "definition": "Entities defined by CSS authors that contain specific values to be reused throughout a document using var().",
            "analogy": "Setting master paint buckets in a house project: 'Primary Color = Navy Blue'.",
            "codeSnippet": ":root {\n  --primary-color: #2563eb;\n}\n.btn { background: var(--primary-color); }"
        },
        {
            "term": "Z-Index & Stacking Contexts",
            "category": "Layout Engine",
            "definition": "Controls the vertical stacking order of elements that overlap along the z-axis (depth). Only works on positioned elements (relative, absolute, fixed).",
            "analogy": "Arranging playing cards in a stack; higher z-index sits on top.",
            "codeSnippet": ".dropdown {\n  position: absolute;\n  z-index: 9999;\n}"
        },
        {
            "term": "Transitions & Micro-Animations",
            "category": "Interactivity",
            "definition": "Smooth property changes over a specified duration when states change (e.g. :hover, :focus).",
            "analogy": "A door gently swinging open slowly instead of instantly teleporting.",
            "codeSnippet": ".btn {\n  transition: all 0.2s ease;\n}\n.btn:hover {\n  transform: translateY(-2px);\n}"
        },
        {
            "term": "Pseudo-Classes & Pseudo-Elements",
            "category": "Syntax",
            "definition": "Pseudo-classes (:hover, :focus, :nth-child) style elements based on user state. Pseudo-elements (::before, ::after) insert decorative content.",
            "analogy": "Pseudo-class: Highlights when touched. Pseudo-element: Automatic quotation marks added before a quote.",
            "codeSnippet": "button:hover { background: #1d4ed8; }\n.card::before { content: '★ '; }"
        }
    ],
    "sandbox": {
        "initialHTML": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <style>\n    body {\n      font-family: 'Plus Jakarta Sans', sans-serif;\n      margin: 0;\n      padding: 20px;\n      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);\n      color: #0f172a;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      min-height: 100vh;\n      box-sizing: border-box;\n    }\n    .hero-card {\n      background: #ffffff;\n      padding: 24px;\n      border-radius: 16px;\n      border: 2px solid #bfdbfe;\n      box-shadow: 0 10px 25px rgba(37, 99, 235, 0.1);\n      max-width: 480px;\n      width: 100%;\n      box-sizing: border-box;\n    }\n    .gradient-title {\n      background: linear-gradient(135deg, #2563eb 0%, #059669 100%);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      font-size: 1.8rem;\n      margin-top: 0;\n    }\n    .flex-row {\n      display: flex;\n      gap: 10px;\n      margin-top: 16px;\n    }\n    .btn {\n      background: #2563eb;\n      color: white;\n      border: none;\n      padding: 10px 18px;\n      border-radius: 8px;\n      font-weight: 700;\n      cursor: pointer;\n      transition: transform 0.2s ease;\n    }\n    .btn:hover {\n      transform: translateY(-2px);\n    }\n  </style>\n</head>\n<body>\n\n  <div class=\"hero-card\">\n    <h1 class=\"gradient-title\">Level 2 CSS Styling</h1>\n    <p>CSS transforms raw HTML into beautiful, modern web user interfaces!</p>\n    <div class=\"flex-row\">\n      <button class=\"btn\">Primary Button</button>\n      <button class=\"btn\" style=\"background:#059669;\">Emerald Button</button>\n    </div>\n  </div>\n\n</body>\n</html>",
        "instructions": "Experiment with CSS properties! Try changing `.hero-card` border-radius, gradient colors, or button hover effects in the editor."
    },
    "quizzes": [
        {
            "id": "q1",
            "question": "Which layer of the CSS Box Model represents the space INSIDE the element between content and border?",
            "options": [
                "Margin",
                "Padding",
                "Border",
                "Outline"
            ],
            "correctIndex": 1,
            "explanation": "Padding is the space inside an element between its content and its border. Margin is the space outside the border."
        },
        {
            "id": "q2",
            "question": "Which CSS property activates Flexbox layout on a container?",
            "options": [
                "display: flex;",
                "layout: flexbox;",
                "position: flex;",
                "align: flex;"
            ],
            "correctIndex": 0,
            "explanation": "Setting 'display: flex;' on a parent container turns it into a flex container, aligning all direct child elements."
        },
        {
            "id": "q3",
            "question": "How do you target an HTML element with class='card' in CSS?",
            "options": [
                "#card",
                ".card",
                "card",
                "*card"
            ],
            "correctIndex": 1,
            "explanation": "Class selectors in CSS are prefixed with a dot (.card). ID selectors are prefixed with a hash (#card)."
        }
    ]
};
