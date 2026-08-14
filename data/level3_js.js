/**
 * NoviCodes - Level 3: JavaScript Foundations Data Module
 * Enriched with Deep Visual Analogies & Interactive Architectures
 */
window.LEVEL3_JS_DATA = {
    id: "level3_js",
    title: "Level 3: JavaScript Foundations",
    subtitle: "Programming Logic, DOM Manipulation & Web Interactivity",
    badgeIcon: "⚡",
    xpReward: 400,
    trackKey: "js",
    nextTrackUrl: "./2. partB/lesson1/lesson1_remake.html",
    nextTrackName: "Level 4: Integrated Dojo",

    // 1. Deep Concept Explanation & Analogy
    concepts: {
        heroAnalogy: {
            title: "JavaScript is Like the Electrical Engine & Brain of a Website",
            description: "If HTML is the physical brick house and CSS is the paint and interior design, JavaScript is the electrical grid, automated doors, lights, and smart home computer. JavaScript listens for user events (clicks, typing, gestures), calculates dynamic logic, updates screen content without reloading, and talks to remote cloud servers in real-time.",
            icon: "⚡",
            hasInteractiveDemo: true,
            demoType: "js_triad"
        },
        sections: [
            {
                title: "1. The Web Development Triad in Action",
                content: `
                    <p>Toggle the 3 core web technologies below to witness how HTML, CSS, and JS interact to build modern apps:</p>
                    
                    <div class="concept-interactive-container" id="jsTriadWidget">
                        <div class="triad-toggle-bar">
                            <label class="triad-pill-checkbox checked" id="checkHtml">
                                <input type="checkbox" checked style="display:none;"> 🧱 1. HTML (Structure)
                            </label>
                            <label class="triad-pill-checkbox checked" id="checkCss">
                                <input type="checkbox" checked style="display:none;"> 🎨 2. CSS (Styling)
                            </label>
                            <label class="triad-pill-checkbox checked" id="checkJs">
                                <input type="checkbox" checked style="display:none;"> ⚡ 3. JavaScript (Action)
                            </label>
                        </div>
                        <div class="triad-preview-screen" id="triadPreviewScreen">
                            <div id="triadContentBox" style="text-align: center;">
                                <h3 id="triadTitle" style="margin: 0 0 8px 0; color: #0f172a;">Live Interactive App</h3>
                                <p id="triadText" style="color: #64748b; font-size: 0.9rem; margin-bottom: 14px;">Click the button below to test interactivity:</p>
                                <button id="triadActionBtn" style="background: #2563eb; color: white; border: none; padding: 8px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: transform 0.2s ease;">⚡ Click Me (Count: <span id="triadCountDisplay">0</span>)</button>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                title: "2. Live Event Reactor: Listening and Reacting to Users",
                content: `
                    <p>JavaScript programs are <strong>Event-Driven</strong>. Click, hover, or type below to see JavaScript event listeners fire in real-time:</p>
                    
                    <div class="concept-interactive-container" id="jsEventReactorWidget">
                        <div class="event-reactor-grid">
                            <div class="event-action-buttons">
                                <button class="reactor-btn" id="eventBtnClick">
                                    <span>🖱️</span> Trigger Click Event
                                </button>
                                <button class="reactor-btn" id="eventBtnHover">
                                    <span>👀</span> Hover Over Me
                                </button>
                                <button class="reactor-btn" id="eventBtnTimer">
                                    <span>⏱️</span> Run 2-Second Timer (setTimeout)
                                </button>
                                <input type="text" id="eventInputMirror" placeholder="⌨️ Type here to fire input event..." style="padding: 10px 14px; border: 1px solid var(--border-subtle); border-radius: 10px; font-size: 0.86rem; outline: none;">
                            </div>
                            <div class="event-live-log-box" id="eventLiveLogBox">
                                <div style="color: #94a3b8; font-style: italic;">// JavaScript Console Execution Output:</div>
                                <div>&gt; Event engine initialized and listening...</div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                title: "3. Variables & Memory Allocation: const vs let",
                content: `
                    <p>Variables are named memory storage boxes. <code>const</code> locks the value permanently, while <code>let</code> allows dynamic updates:</p>
                    
                    <div class="concept-interactive-container" id="jsMemoryWidget">
                        <div class="memory-slots-row">
                            <div class="memory-slot-card">
                                <span class="slot-type-badge slot-const">const (Immutable)</span>
                                <div class="slot-var-name">appName</div>
                                <div class="slot-var-val">"NoviCodes"</div>
                            </div>
                            <div class="memory-slot-card">
                                <span class="slot-type-badge slot-let">let (Mutable)</span>
                                <div class="slot-var-name">learnerXP</div>
                                <div class="slot-var-val" id="memXpVal">400</div>
                            </div>
                            <div class="memory-slot-card">
                                <span class="slot-type-badge slot-let">let (Mutable)</span>
                                <div class="slot-var-name">isReady</div>
                                <div class="slot-var-val" id="memReadyVal">true</div>
                            </div>
                        </div>
                        <div style="text-align: center; margin-top: 10px;">
                            <button class="concept-toggle-btn" id="btnIncrementMemory" style="background: #2563eb; color: white;">
                                ➕ Execute: learnerXP += 50;
                            </button>
                        </div>
                    </div>
                `
            }
        ]
    },

    // 2. Interactive Terms & Glossary Bank
    glossary: [
        {
            term: "JavaScript (JS)",
            category: "Core Concept",
            definition: "The high-level, interpreted programming language that powers dynamic client-side and server-side behavior.",
            analogy: "The electrical wiring, sensors, and computer system of an automobile.",
            codeSnippet: "console.log('Hello, World!');"
        },
        {
            term: "Event Listener",
            category: "DOM Interactivity",
            definition: "A procedure in JavaScript that waits for an event to occur (e.g. click, scroll, submit) and executes a callback function.",
            analogy: "A doorbell waiting for a visitor to press the physical button before chiming.",
            codeSnippet: "btn.addEventListener('click', () => { alert('Clicked!'); });"
        },
        {
            term: "Variable (let & const)",
            category: "Language Syntax",
            definition: "Named containers for storing data values. 'const' cannot be reassigned, whereas 'let' can be modified.",
            analogy: "A labeled storage container in an office.",
            codeSnippet: "const maxXP = 12500;\nlet currentXP = 400;"
        },
        {
            term: "Function",
            category: "Language Syntax",
            definition: "A reusable block of code designed to perform a particular task when invoked.",
            analogy: "A kitchen blender recipe: put in ingredients (inputs/arguments), run the motor, get a smoothie (output/return).",
            codeSnippet: "function calculateXP(bonus) {\n  return 100 + bonus;\n}"
        },
        {
            term: "Async / Fetch API",
            category: "Web Networking",
            definition: "Asynchronous JavaScript methods allowing web pages to request data from servers in the background without refreshing the page.",
            analogy: "Ordering food at a restaurant: you place the order and keep talking with friends until the food arrives.",
            codeSnippet: "const res = await fetch('https://api.novicodes.dev/user');\nconst data = await res.json();"
        }
    ],

    // 3. Code Sandbox Exercises
    sandbox: {
        title: "JavaScript Live Interactivity Studio",
        starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; padding: 24px; text-align: center; background: #f8fafc; }
    .card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; max-width: 320px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    .counter { font-size: 3rem; font-weight: 800; color: #2563eb; margin: 12px 0; }
    button { background: #2563eb; color: white; border: none; padding: 10px 18px; border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 0.95rem; margin: 4px; }
  </style>
</head>
<body>
  <div class="card">
    <h2 style="margin: 0; color: #0f172a;">⚡ Power Counter</h2>
    <div class="counter" id="countDisplay">0</div>
    <button id="btnInc">➕ Add 1</button>
    <button id="btnReset" style="background: #e2e8f0; color: #0f172a;">🔄 Reset</button>
  </div>

  <script>
    let count = 0;
    const display = document.getElementById('countDisplay');
    
    document.getElementById('btnInc').addEventListener('click', () => {
      count++;
      display.textContent = count;
      display.style.transform = 'scale(1.15)';
      setTimeout(() => display.style.transform = 'scale(1)', 150);
    });

    document.getElementById('btnReset').addEventListener('click', () => {
      count = 0;
      display.textContent = count;
    });
  </script>
</body>
</html>`,
        tasks: [
            "Add a '➖ Minus 1' button that decrements the counter value",
            "Change the counter text color when count reaches 10 or higher",
            "Experiment with adding a prompt() to set a custom counter start value"
        ]
    },

    // 4. Quiz & Verification
    quiz: {
        title: "Level 3: JavaScript Verification Challenge",
        questions: [
            {
                q: "Which keyword should you use to declare a variable whose value will NEVER be reassigned?",
                options: [
                    { text: "const", correct: true },
                    { text: "let", correct: false },
                    { text: "var", correct: false }
                ],
                explanation: "const creates a block-scoped immutable variable binding that cannot be reassigned."
            },
            {
                q: "What method is used to attach a click event handler to an HTML button element?",
                options: [
                    { text: "element.addEventListener('click', callback)", correct: true },
                    { text: "element.attachClickEvent(callback)", correct: false },
                    { text: "element.listen('click')", correct: false }
                ],
                explanation: "addEventListener('click', callback) is the standard web API for handling events on DOM elements."
            },
            {
                q: "What does DOM stand for?",
                options: [
                    { text: "Document Object Model", correct: true },
                    { text: "Dynamic Object Manager", correct: false },
                    { text: "Digital Ordinance Markup", correct: false }
                ],
                explanation: "The Document Object Model (DOM) is the tree representation of an HTML document in browser memory."
            }
        ]
    }
};
