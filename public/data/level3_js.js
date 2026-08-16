/**
 * NoviCodes - Level 3: JavaScript Foundations Data Module
 */
window.LEVEL3_JS_DATA = {
    "id": "level3_js",
    "title": "Level 3: Modern JavaScript (ES6+) Foundations",
    "subtitle": "Variables, Functions, DOM Manipulation & Event Handlers",
    "badgeIcon": "⚡",
    "xpReward": 400,
    "trackKey": "js",
    "nextTrackUrl": "../2. partB/hub.html",
    "nextTrackName": "Level 4: Interactive DOM Dojo",
    "concepts": {
        "heroAnalogy": {
            "title": "JavaScript is Like the Brain, Muscles & Electricity of a Website",
            "description": "If HTML is the physical brick building and CSS is the paint and interior design, JavaScript is the electrical computer, automated smart doors, and interactive machinery. JavaScript listens when a user clicks a button, calculates game scores and XP, updates the screen without reloading, and talks to cloud databases in real-time.",
            "icon": "⚡"
        },
        "sections": [
            {
                "title": "1. The Web Triad: How HTML, CSS & JavaScript Work Together",
                "content": "\n                <p>Every website you visit is built from 3 team players working in harmony. Toggle the checkboxes below to see what happens when you turn one off:</p>\n                \n                <div class=\"concept-interactive-container\" id=\"jsTriadWidget\">\n                    <div class=\"triad-toggle-bar\">\n                        <label class=\"triad-pill-checkbox checked\" id=\"checkHtml\">\n                            <input type=\"checkbox\" checked style=\"display:none;\"> 🧱 1. HTML (Bones & Structure)\n                        </label>\n                        <label class=\"triad-pill-checkbox checked\" id=\"checkCss\">\n                            <input type=\"checkbox\" checked style=\"display:none;\"> 🎨 2. CSS (Clothes & Styling)\n                        </label>\n                        <label class=\"triad-pill-checkbox checked\" id=\"checkJs\">\n                            <input type=\"checkbox\" checked style=\"display:none;\"> ⚡ 3. JavaScript (Brain & Action)\n                        </label>\n                    </div>\n                    <div class=\"triad-preview-screen\" id=\"triadPreviewScreen\">\n                        <!-- Hydrated by JS -->\n                    </div>\n                </div>\n            "
            },
            {
                "title": "2. Event Listeners: Like a Smart Doorbell Sensor 🔔",
                "content": "\n                <p>JavaScript programs are <strong>Event-Driven</strong>. Think of an <strong>Event Listener</strong> like a smart doorbell sensor on a house. The doorbell waits quietly. When a human presses the button (Click Event) or walks past the motion camera (Hover Event), the sensor instantly triggers an action!</p>\n                \n                <div class=\"concept-interactive-container\" id=\"jsEventReactorWidget\">\n                    <div class=\"event-reactor-grid\">\n                        <div class=\"event-action-buttons\">\n                            <button class=\"reactor-btn\" id=\"eventBtnClick\">\n                                <span>🖱️</span> 1. Click Me (Click Event)\n                            </button>\n                            <button class=\"reactor-btn\" id=\"eventBtnHover\">\n                                <span>👀</span> 2. Hover Over Me (Mouseenter Event)\n                            </button>\n                            <button class=\"reactor-btn\" id=\"eventBtnTimer\">\n                                <span>⏱️</span> 3. Run 2-Second Timer (setTimeout)\n                            </button>\n                            \n                            <div style=\"background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 12px; margin-top: 4px;\">\n                                <label style=\"font-size: 0.78rem; font-weight: 800; color: #475569; display: block; margin-bottom: 6px;\">\n                                    ⌨️ 4. Live Typing Event (Type your name below):\n                                </label>\n                                <input type=\"text\" id=\"eventInputMirror\" placeholder=\"e.g. Alex Developer\" style=\"width: 100%; box-sizing: border-box; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.86rem; outline: none; font-family: inherit;\">\n                                <div style=\"margin-top: 8px; font-size: 0.82rem; color: #0f172a; font-weight: 700; background: #eff6ff; padding: 6px 10px; border-radius: 6px; border: 1px solid #bfdbfe;\">\n                                    🏷️ Live Greeting: <span id=\"eventMirrorOutput\" style=\"color: #2563eb;\">(Waiting for input...)</span>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"event-live-log-box\" id=\"eventLiveLogBox\">\n                            <div style=\"color: #94a3b8; font-style: italic;\">// JavaScript Console Execution Log:</div>\n                            <div>&gt; Event sensor initialized and waiting for user action...</div>\n                        </div>\n                    </div>\n                </div>\n            "
            },
            {
                "title": "3. Variables: Permanent Sharpie (const) vs Dry-Erase Whiteboard (let)",
                "content": "\n                <p>When your program runs, it needs to remember things (like user score, game status, or app name). JavaScript gives you two types of labeled memory storage boxes:</p>\n                <ul>\n                    <li>🔒 <strong><code>const</code> (Permanent Sharpie)</strong>: Use this for values that should <strong>NEVER change</strong> while your app is running (like your App Name <code>\"NoviCodes\"</code> or Math Pi <code>3.14159</code>). If someone tries to change it, JavaScript blocks them with an error!</li>\n                    <li>✏️ <strong><code>let</code> (Dry-Erase Whiteboard)</strong>: Use this for values that <strong>change and update</strong> as users play your game or use your app (like user score, coins, learner XP, or whether a player is ready <code>true / false</code>).</li>\n                </ul>\n                \n                <div class=\"concept-interactive-container\" id=\"jsMemoryWidget\">\n                    <div style=\"text-align: center; margin-bottom: 12px; font-weight: 800; font-size: 0.9rem; color: #1e293b;\">\n                        🧠 Interactive Variable Memory Boxes (Test const vs let below):\n                    </div>\n                    \n                    <div class=\"memory-slots-row\">\n                        <div class=\"memory-slot-card\" style=\"border-top: 3px solid #ef4444;\">\n                            <span class=\"slot-type-badge slot-const\">🔒 const (Permanent Sharpie)</span>\n                            <div class=\"slot-var-name\">const appName =</div>\n                            <div class=\"slot-var-val\" id=\"memAppNameVal\">\"NoviCodes\"</div>\n                            <button class=\"reactor-btn\" id=\"btnTryBreakConst\" style=\"margin-top: 10px; width: 100%; justify-content: center; font-size: 0.78rem; background: #fee2e2; border-color: #fca5a5; color: #991b1b;\">\n                                🚫 Try Changing appName\n                            </button>\n                        </div>\n                        \n                        <div class=\"memory-slot-card\" style=\"border-top: 3px solid #3b82f6;\">\n                            <span class=\"slot-type-badge slot-let\">✏️ let (Dry-Erase Whiteboard)</span>\n                            <div class=\"slot-var-name\">let learnerXP =</div>\n                            <div class=\"slot-var-val\" id=\"memXpVal\">400</div>\n                            <button class=\"reactor-btn\" id=\"btnIncrementMemory\" style=\"margin-top: 10px; width: 100%; justify-content: center; font-size: 0.78rem; background: #dbeafe; border-color: #93c5fd; color: #1e40af;\">\n                                ➕ Add +50 XP\n                            </button>\n                        </div>\n                        \n                        <div class=\"memory-slot-card\" style=\"border-top: 3px solid #10b981;\">\n                            <span class=\"slot-type-badge slot-let\">✏️ let (Dry-Erase Whiteboard)</span>\n                            <div class=\"slot-var-name\">let isReady =</div>\n                            <div class=\"slot-var-val\" id=\"memReadyVal\" style=\"color: #16a34a;\">true</div>\n                            <button class=\"reactor-btn\" id=\"btnToggleReady\" style=\"margin-top: 10px; width: 100%; justify-content: center; font-size: 0.78rem; background: #d1fae5; border-color: #6ee7b7; color: #065f46;\">\n                                🔄 Toggle (true ↔ false)\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            "
            }
        ]
    },
    "glossary": [
        {
            "term": "JavaScript (JS)",
            "category": "Core Concept",
            "definition": "The programming language of the web that adds dynamic interactivity, logic, and data handling to web pages.",
            "analogy": "The engine, wiring, and computer system of a modern car.",
            "codeSnippet": "console.log('Hello World!');"
        },
        {
            "term": "Variable (const / let)",
            "category": "Syntax",
            "definition": "A named memory container used to store data values for later use. Use const for values that do not reassign, let for mutable variables.",
            "analogy": "A labeled storage box holding items inside a closet.",
            "codeSnippet": "const score = 100;\nlet lives = 3;"
        },
        {
            "term": "Function",
            "category": "Core Concept",
            "definition": "A self-contained block of code designed to perform a particular task when invoked.",
            "analogy": "A recipe on a card that you can cook whenever you want.",
            "codeSnippet": "function greet(name) {\n  return 'Hello ' + name;\n}"
        },
        {
            "term": "Event Listener",
            "category": "DOM & Interactivity",
            "definition": "A procedure in JavaScript that waits for an event to occur (such as a click or keypress) before executing code.",
            "analogy": "A doorbell waiting for a visitor to press it before ringing.",
            "codeSnippet": "btn.addEventListener('click', handleClick);"
        },
        {
            "term": "Conditionals (if / else)",
            "category": "Logic",
            "definition": "Statements used to perform different actions based on whether a condition is true or false.",
            "analogy": "If it is raining, take an umbrella; else wear sunglasses.",
            "codeSnippet": "if (xp >= 1000) {\n  unlockBadge();\n} else {\n  keepLearning();\n}"
        },
        {
            "term": "Asynchronous JS (async / await / Promises)",
            "category": "Async & APIs",
            "definition": "Handling time-consuming operations (like fetching network APIs or database records) without freezing the user interface.",
            "analogy": "Ordering coffee at a cafe: receiving a buzzer (Promise) while waiting so you can talk to friends.",
            "codeSnippet": "async function fetchUser() {\n  const res = await fetch('/api/user');\n  const data = await res.json();\n}"
        },
        {
            "term": "Array Methods (.map, .filter, .reduce)",
            "category": "Data Manipulation",
            "definition": "Higher-order functions used to transform (.map), filter (.filter), or summarize (.reduce) collections of data functionally.",
            "analogy": ".filter is a coffee filter straining grounds; .map is painting every car in a parking lot a new color.",
            "codeSnippet": "const admins = users.filter(u => u.role === 'admin');\nconst names = users.map(u => u.name);"
        },
        {
            "term": "DOM Traversal & Selection",
            "category": "DOM & Interactivity",
            "definition": "Finding HTML elements on the page (querySelector) or navigating parent/child chains (closest, parentElement).",
            "analogy": "Finding a specific apartment by building number and floor.",
            "codeSnippet": "const card = btn.closest('.card');\nconst title = card.querySelector('h2');"
        },
        {
            "term": "Event Bubbling & e.preventDefault()",
            "category": "DOM & Interactivity",
            "definition": "Events trigger on target elements and bubble up through parents. e.preventDefault() cancels browser default actions (like page reload on form submit).",
            "analogy": "Submitting a form paper directly to a clerk instead of mailing it out.",
            "codeSnippet": "form.addEventListener('submit', (e) => {\n  e.preventDefault();\n  submitData();\n});"
        },
        {
            "term": "LocalStorage & Web Storage",
            "category": "Data Persistence",
            "definition": "A browser-based key-value store that persists data across page refreshes and browser sessions.",
            "analogy": "A notepad saved on your desk that stays there even when you turn off the lights.",
            "codeSnippet": "localStorage.setItem('user', JSON.stringify({ name: 'Alex' }));\nconst user = JSON.parse(localStorage.getItem('user'));"
        },
        {
            "term": "Scope & Lexical Closures",
            "category": "Architecture",
            "definition": "Scope controls variable accessibility. A closure is a function that remembers and accesses variables from its outer lexical environment even after outer function returns.",
            "analogy": "A backpack you keep carrying containing tools from your old room.",
            "codeSnippet": "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}"
        },
        {
            "term": "ES6 Destructuring & Spread Operator",
            "category": "Syntax",
            "definition": "Destructuring extracts properties from objects/arrays into distinct variables. The spread operator (...) unpacks items or merges objects.",
            "analogy": "Unpacking items from a box onto your desk individually.",
            "codeSnippet": "const { name, role } = user;\nconst updatedUser = { ...user, active: true };"
        },
        {
            "term": "Arrow Functions & Lexical 'this'",
            "category": "Syntax",
            "definition": "Concise syntax for writing function expressions (() => {}). Arrow functions do not bind their own 'this', inheriting 'this' lexically.",
            "analogy": "A handheld walkie-talkie borrowing the frequency of the base station.",
            "codeSnippet": "const add = (a, b) => a + b;"
        }
    ],
    "sandbox": {
        "initialHTML": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <style>\n    body {\n      font-family: 'Plus Jakarta Sans', sans-serif;\n      margin: 0;\n      padding: 20px;\n      background: #f8fafc;\n      color: #0f172a;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      min-height: 100vh;\n      box-sizing: border-box;\n    }\n    .counter-card {\n      background: #ffffff;\n      padding: 24px;\n      border-radius: 16px;\n      box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);\n      max-width: 400px;\n      width: 100%;\n      text-align: center;\n      box-sizing: border-box;\n    }\n    .xp-display {\n      font-size: 2.5rem;\n      font-weight: 800;\n      color: #2563eb;\n      margin: 16px 0;\n    }\n    .btn-action {\n      background: #2563eb;\n      color: white;\n      border: none;\n      padding: 10px 20px;\n      border-radius: 20px;\n      font-size: 1rem;\n      font-weight: 700;\n      cursor: pointer;\n      margin: 4px;\n    }\n  </style>\n</head>\n<body>\n\n  <div class=\"counter-card\">\n    <h2>Level 3 JavaScript Engine</h2>\n    <div class=\"xp-display\" id=\"xpCount\">0 XP</div>\n    \n    <button class=\"btn-action\" onclick=\"addXP()\">⚡ Add +50 XP</button>\n    <button class=\"btn-action\" onclick=\"resetXP()\" style=\"background:#ef4444;\">🔄 Reset</button>\n  </div>\n\n  <script>\n    let currentXP = 0;\n    function addXP() {\n      currentXP += 50;\n      document.getElementById('xpCount').textContent = currentXP + ' XP';\n    }\n    function resetXP() {\n      currentXP = 0;\n      document.getElementById('xpCount').textContent = '0 XP';\n    }\n  </script>\n\n</body>\n</html>",
        "instructions": "Try modifying the JavaScript code! Change the XP increment from +50 to +100 inside `addXP()` or change the button styling."
    },
    "quizzes": [
        {
            "id": "q1",
            "question": "Which JavaScript keyword is used to declare a variable whose value cannot be reassigned?",
            "options": [
                "var",
                "let",
                "const",
                "static"
            ],
            "correctIndex": 2,
            "explanation": "'const' creates a read-only reference to a value. Use 'let' if you intend to reassign the variable later."
        },
        {
            "id": "q2",
            "question": "What method is used to attach a click event handler to a DOM element in JavaScript?",
            "options": [
                "element.attachClick()",
                "element.addEventListener('click', fn)",
                "element.on('click')",
                "element.listen('click')"
            ],
            "correctIndex": 1,
            "explanation": "addEventListener('click', callback) is the standard method for registering event listeners on DOM elements."
        },
        {
            "id": "q3",
            "question": "What is the output of '10' + 5 in JavaScript?",
            "options": [
                "15",
                "'105'",
                "Error",
                "NaN"
            ],
            "correctIndex": 1,
            "explanation": "When adding a string ('10') and a number (5), JavaScript performs string concatenation, resulting in the string '105'."
        }
    ]
};
