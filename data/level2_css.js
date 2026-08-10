/**
 * NoviCodes - Level 2: CSS Foundations Data Module
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
            title: "CSS is Like Interior Design, Paint, and Architecture",
            description: "If HTML builds the raw wooden frame of a house, CSS (Cascading Style Sheets) is the interior designer. CSS paints the walls, selects carpet colors, arranges furniture layout (Flexbox & Grid), and ensures the house looks stunning on small mobile screens and giant desktop displays alike.",
            icon: "🎨"
        },
        sections: [
            {
                title: "1. Selectors & Properties: Styling Elements",
                content: `
                    <p>CSS works by selecting HTML elements and applying style rules (property-value pairs):</p>
                    <div class="code-explain-box">
                        <pre><code>/* Element Selector */
h1 {
  color: #2563eb;
  font-size: 2rem;
}

/* Class Selector (starts with .) */
.highlight-card {
  background-color: #eff6ff;
  border-radius: 12px;
  padding: 16px;
}</code></pre>
                    </div>
                    <p>Class selectors (<code>.classname</code>) allow you to apply the exact same styling rules across multiple elements on a web page!</p>
                `
            },
            {
                title: "2. The Box Model: Margin, Border, Padding",
                content: `
                    <p>Every HTML element on a webpage is considered a rectangular box consisting of four layers:</p>
                    <ul>
                        <li><strong>Content</strong>: The text or image inside the box.</li>
                        <li><strong>Padding</strong>: The space <em>inside</em> the box between content and border.</li>
                        <li><strong>Border</strong>: The line surrounding the padding and content.</li>
                        <li><strong>Margin</strong>: The space <em>outside</em> the border separating elements from neighbors.</li>
                    </ul>
                    <div class="code-explain-box">
                        <pre><code>.box {
  width: 200px;
  padding: 20px;   /* Inside spacing */
  border: 2px solid #2563eb;
  margin: 16px;    /* Outside spacing */
}</code></pre>
                    </div>
                `
            },
            {
                title: "3. Flexbox Layout: Alignment Made Simple",
                content: `
                    <p>Flexbox (Flexible Box Layout) makes it super easy to align items horizontally or vertically inside a container:</p>
                    <div class="code-explain-box">
                        <pre><code>.container {
  display: flex;
  justify-content: space-between; /* Horizontal alignment */
  align-items: center;            /* Vertical alignment */
  gap: 12px;
}</code></pre>
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
            definition: "The style sheet language used to specify document presentation, colors, layout, fonts, and responsiveness.",
            analogy: "Paint, wallpaper, lighting, and interior design of a house.",
            codeSnippet: "body { background: #f8fafc; color: #0f172a; }"
        },
        {
            term: "Box Model",
            category: "Layout Engine",
            definition: "The foundational design rule where every element consists of Content, Padding, Border, and Margin.",
            analogy: "A framed picture: Picture (Content), White matting (Padding), Wood frame (Border), Space to next picture (Margin).",
            codeSnippet: "box-sizing: border-box;"
        },
        {
            term: "Flexbox",
            category: "Layout Engine",
            definition: "A 1-dimensional layout module that provides space distribution and alignment capabilities among items in a container.",
            analogy: "Organizing books neatly side-by-side on a shelf.",
            codeSnippet: "display: flex;\njustify-content: center;\nalign-items: center;"
        },
        {
            term: "CSS Selector",
            category: "Syntax",
            definition: "A pattern used to select the HTML elements you want to style.",
            analogy: "Calling out someone by name ('John') vs calling out a role ('Students').",
            codeSnippet: ".button-primary { background: #2563eb; }"
        },
        {
            term: "Media Query (@media)",
            category: "Responsiveness",
            definition: "A CSS technique used to apply styles conditionally based on device viewport width or features.",
            analogy: "Wearing a winter coat when it snows vs shorts when sunny.",
            codeSnippet: "@media (max-width: 768px) {\n  .nav { display: none; }\n}"
        }
    ],

    // 3. Code Sandbox Starter Template
    sandbox: {
        initialHTML: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      color: #0f172a;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .hero-card {
      background: #ffffff;
      padding: 24px;
      border-radius: 16px;
      border: 2px solid #bfdbfe;
      box-shadow: 0 10px 25px rgba(37, 99, 235, 0.1);
      max-width: 480px;
      width: 100%;
      box-sizing: border-box;
    }
    .gradient-title {
      background: linear-gradient(135deg, #2563eb 0%, #059669 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 1.8rem;
      margin-top: 0;
    }
    .flex-row {
      display: flex;
      gap: 10px;
      margin-top: 16px;
    }
    .btn {
      background: #2563eb;
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .btn:hover {
      transform: translateY(-2px);
    }
  </style>
</head>
<body>

  <div class="hero-card">
    <h1 class="gradient-title">Level 2 CSS Styling</h1>
    <p>CSS transforms raw HTML into beautiful, modern web user interfaces!</p>
    <div class="flex-row">
      <button class="btn">Primary Button</button>
      <button class="btn" style="background:#059669;">Emerald Button</button>
    </div>
  </div>

</body>
</html>`,
        instructions: "Experiment with CSS properties! Try changing `.hero-card` border-radius, gradient colors, or button hover effects in the editor."
    },

    // 4. Knowledge Check Quizzes
    quizzes: [
        {
            id: "q1",
            question: "Which layer of the CSS Box Model represents the space INSIDE the element between content and border?",
            options: [
                "Margin",
                "Padding",
                "Border",
                "Outline"
            ],
            correctIndex: 1,
            explanation: "Padding is the space inside an element between its content and its border. Margin is the space outside the border."
        },
        {
            id: "q2",
            question: "Which CSS property activates Flexbox layout on a container?",
            options: [
                "display: flex;",
                "layout: flexbox;",
                "position: flex;",
                "align: flex;"
            ],
            correctIndex: 0,
            explanation: "Setting 'display: flex;' on a parent container turns it into a flex container, aligning all direct child elements."
        },
        {
            id: "q3",
            question: "How do you target an HTML element with class='card' in CSS?",
            options: [
                "#card",
                ".card",
                "card",
                "*card"
            ],
            correctIndex: 1,
            explanation: "Class selectors in CSS are prefixed with a dot (.card). ID selectors are prefixed with a hash (#card)."
        }
    ]
};
