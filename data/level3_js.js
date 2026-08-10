/**
 * NoviCodes - Level 3: JavaScript Foundations Data Module
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
            title: "JavaScript is Like the Electrical Wiring and Engine of a Car",
            description: "If HTML is the car chassis and CSS is the glossy paint job, JavaScript is the engine, steering wheel, and electrical computer under the hood. JavaScript responds when a user presses a button, fetches data from servers, updates the screen without reloading, and drives interactive web applications.",
            icon: "⚡"
        },
        sections: [
            {
                title: "1. Variables & Data Types: Storing Information",
                content: `
                    <p>JavaScript stores values inside <strong>variables</strong> declared using <code>const</code> (for values that don't change) or <code>let</code> (for values that can change):</p>
                    <div class="code-explain-box">
                        <pre><code>const userName = "Alice"; // String
let userXP = 250;         // Number
let isLevelUnlocked = true; // Boolean</code></pre>
                    </div>
                `
            },
            {
                title: "2. Functions: Reusable Blocks of Logic",
                content: `
                    <p>A <strong>function</strong> is a packaged set of instructions that performs a specific task whenever called:</p>
                    <div class="code-explain-box">
                        <pre><code>function addXP(points) {
  userXP += points;
  console.log("New XP Total: " + userXP);
}

// Execute the function
addXP(50); // Adds 50 points</code></pre>
                    </div>
                `
            },
            {
                title: "3. DOM Manipulation & Event Listeners",
                content: `
                    <p>JavaScript can select HTML elements on the page and listen for user actions (clicks, keypresses, scrolls):</p>
                    <div class="code-explain-box">
                        <pre><code>const myButton = document.querySelector("#btn");

myButton.addEventListener("click", function() {
  document.querySelector("#output").textContent = "Button Clicked!";
});</code></pre>
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
            definition: "The programming language of the web that adds dynamic interactivity, logic, and data handling to web pages.",
            analogy: "The engine, wiring, and computer system of a modern car.",
            codeSnippet: "console.log('Hello World!');"
        },
        {
            term: "Variable (const / let)",
            category: "Syntax",
            definition: "A named memory container used to store data values for later use.",
            analogy: "A labeled storage box holding items inside a closet.",
            codeSnippet: "const score = 100;\nlet lives = 3;"
        },
        {
            term: "Function",
            category: "Core Concept",
            definition: "A self-contained block of code designed to perform a particular task.",
            analogy: "A recipe on a card that you can cook whenever you want.",
            codeSnippet: "function greet(name) {\n  return 'Hello ' + name;\n}"
        },
        {
            term: "Event Listener",
            category: "DOM & Interactivity",
            definition: "A procedure in JavaScript that waits for an event to occur (such as a click or keypress) before executing code.",
            analogy: "A doorbell waiting for a visitor to press it before ringing.",
            codeSnippet: "btn.addEventListener('click', handleClick);"
        },
        {
            term: "Conditionals (if / else)",
            category: "Logic",
            definition: "Statements used to perform different actions based on whether a condition is true or false.",
            analogy: "If it is raining, take an umbrella; else wear sunglasses.",
            codeSnippet: "if (xp >= 1000) {\n  unlockBadge();\n}"
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
      background: #f8fafc;
      color: #0f172a;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .counter-card {
      background: #ffffff;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
      max-width: 400px;
      width: 100%;
      text-align: center;
      box-sizing: border-box;
    }
    .xp-display {
      font-size: 2.5rem;
      font-weight: 800;
      color: #2563eb;
      margin: 16px 0;
    }
    .btn-action {
      background: #2563eb;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 20px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      margin: 4px;
    }
  </style>
</head>
<body>

  <div class="counter-card">
    <h2>Level 3 JavaScript Engine</h2>
    <div class="xp-display" id="xpCount">0 XP</div>
    
    <button class="btn-action" onclick="addXP()">⚡ Add +50 XP</button>
    <button class="btn-action" onclick="resetXP()" style="background:#ef4444;">🔄 Reset</button>
  </div>

  <script>
    let currentXP = 0;
    function addXP() {
      currentXP += 50;
      document.getElementById('xpCount').textContent = currentXP + ' XP';
    }
    function resetXP() {
      currentXP = 0;
      document.getElementById('xpCount').textContent = '0 XP';
    }
  </script>

</body>
</html>`,
        instructions: "Try modifying the JavaScript code! Change the XP increment from +50 to +100 inside `addXP()` or change the button styling."
    },

    // 4. Knowledge Check Quizzes
    quizzes: [
        {
            id: "q1",
            question: "Which JavaScript keyword is used to declare a variable whose value cannot be reassigned?",
            options: [
                "var",
                "let",
                "const",
                "static"
            ],
            correctIndex: 2,
            explanation: "'const' creates a read-only reference to a value. Use 'let' if you intend to reassign the variable later."
        },
        {
            id: "q2",
            question: "What method is used to attach a click event handler to a DOM element in JavaScript?",
            options: [
                "element.attachClick()",
                "element.addEventListener('click', fn)",
                "element.on('click')",
                "element.listen('click')"
            ],
            correctIndex: 1,
            explanation: "addEventListener('click', callback) is the standard method for registering event listeners on DOM elements."
        },
        {
            id: "q3",
            question: "What is the output of '10' + 5 in JavaScript?",
            options: [
                "15",
                "'105'",
                "Error",
                "NaN"
            ],
            correctIndex: 1,
            explanation: "When adding a string ('10') and a number (5), JavaScript performs string concatenation, resulting in the string '105'."
        }
    ]
};
