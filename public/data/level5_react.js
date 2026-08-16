/**
 * NoviCodes - Level 5: React & Modern Component Foundations Data Module
 */
window.LEVEL5_REACT_DATA = {
    "id": "level5_react",
    "title": "Level 5: React Foundations",
    "subtitle": "LEGO Bricks with Live Wires: Component Trees, Props & Reactive State",
    "badgeIcon": "⚛️",
    "xpReward": 300,
    "trackKey": "react",
    "nextTrackUrl": "./foundations.html?track=python",
    "nextTrackName": "Level 6: Python Foundations",
    "concepts": {
        "heroAnalogy": {
            "title": "React is Like Building with Smart, Electric LEGO Bricks",
            "description": "In traditional vanilla HTML, if you want to change a shopping cart total, you have to manually hunt down the element, calculate numbers, and modify the DOM. In React, you build custom reusable LEGO bricks (Components). Each brick has its own internal battery and memory (State). When the state changes, the brick automatically updates itself instantly without reloading the page!",
            "icon": "⚛️"
        },
        "sections": [
            {
                "title": "1. Components: Custom Reusable HTML Elements",
                "content": `
                <p>Imagine if HTML only gave you basic tags like <code>&lt;div&gt;</code> and <code>&lt;p&gt;</code>, but you needed a <strong>UserProfileCard</strong> with an avatar, badge, and follow button in 20 different places on your website.</p>
                <p>In React, a <strong>Component</strong> is simply a JavaScript function that returns HTML (called JSX). You write it once, and reuse it everywhere like a custom tag: <code>&lt;UserProfileCard /&gt;</code>!</p>
                <div class="code-explain-box">
                    <pre><code>// Define your reusable LEGO brick
function UserBadge() {
  return (
    &lt;div className="user-badge"&gt;
      &lt;span&gt;👑&lt;/span&gt;
      &lt;strong&gt;Alex Rivera&lt;/strong&gt;
    &lt;/div&gt;
  );
}

// Use it anywhere in your app!
&lt;UserBadge /&gt;
&lt;UserBadge /&gt;</code></pre>
                </div>
                <p><strong>💡 Beginner Rule:</strong> React component names MUST always start with a <strong>Capital Letter</strong> (e.g. <code>UserBadge</code>, not <code>userBadge</code>) so React knows it's a custom component and not a built-in HTML tag!</p>
                `
            },
            {
                "title": "2. Props vs State: The Luggage vs The Backpack",
                "content": `
                <p>Understanding the difference between <strong>Props</strong> and <strong>State</strong> is the #1 superpower in React:</p>
                <ul>
                    <li><strong>Props (Properties) = The Checked Luggage:</strong> Data passed down from a parent component to a child component. Props are read-only (immutable). A child cannot change the props it was handed.</li>
                    <li><strong>State = The Personal Backpack:</strong> Internal memory managed inside the component using <code>useState()</code>. When you put something new in your backpack (update state), React automatically re-renders the component to show the new value!</li>
                </ul>
                <div class="code-explain-box">
                    <pre><code>import { useState } from 'react';

function LikeButton(props) { // props.label passed from parent
  const [likes, setLikes] = useState(0); // Internal state

  return (
    &lt;button onClick={() =&gt; setLikes(likes + 1)}&gt;
      ❤️ {props.label}: {likes}
    &lt;/button&gt;
  );
}</code></pre>
                </div>
                `
            },
            {
                "title": "3. The Virtual DOM: The Lightning Fast Architect Blueprint",
                "content": `
                <p>Modifying the real browser DOM is like repainting an entire brick building every time someone changes a picture frame inside. It's heavy and slow.</p>
                <p>React solves this with the <strong>Virtual DOM</strong>. It keeps a lightweight blueprint of your page in computer memory:</p>
                <ol>
                    <li>When state changes, React creates a new virtual blueprint.</li>
                    <li>It compares the new blueprint with the old one (called <strong>Diffing</strong>).</li>
                    <li>It pinpoints the exact 1 millimeter that changed and updates ONLY that specific element in the real browser (called <strong>Reconciliation</strong>).</li>
                </ol>
                <p><strong>💡 Why It Matters:</strong> This is why React apps feel silky smooth and 60fps fast, even with thousands of dynamic elements!</p>
                `
            },
            {
                "title": "4. Side Effects & useEffect: Talking to the Outside World",
                "content": `
                <p>React components are meant to be pure calculation machines: give them props and state, and they return JSX. But what happens when you need to:</p>
                <ul>
                    <li>Fetch data from a backend server API?</li>
                    <li>Set an automatic 5-second countdown timer?</li>
                    <li>Listen for global keyboard presses?</li>
                </ul>
                <p>These actions touch the outside world and are called <strong>Side Effects</strong>. In React, you manage them safely using the <code>useEffect()</code> hook with a dependency array!</p>
                <div class="code-explain-box">
                    <pre><code>useEffect(() =&gt; {
  // 1. Setup: Runs when the component appears on screen
  const timer = setInterval(() =&gt; console.log("Tick!"), 1000);

  // 2. Cleanup: Runs when the component is removed (prevents memory leaks!)
  return () =&gt; clearInterval(timer);
}, []); // Empty array [] = Run once on mount</code></pre>
                </div>
                `
            }
        ]
    },
    "glossary": [
        {
            "term": "Component",
            "category": "Core Concept",
            "definition": "An independent, reusable piece of user interface (UI) written as a JavaScript function that returns JSX markup.",
            "analogy": "A single modular LEGO brick that can be snapped into place multiple times.",
            "codeSnippet": "function Button() { return <button>Click</button>; }"
        },
        {
            "term": "JSX (JavaScript XML)",
            "category": "Syntax",
            "definition": "A syntax extension for JavaScript that allows you to write HTML-like markup directly inside JavaScript files.",
            "analogy": "Speaking English and Spanish in the same sentence seamlessly.",
            "codeSnippet": "const element = <h1 className=\"title\">Hello React</h1>;"
        },
        {
            "term": "Props",
            "category": "Data Flow",
            "definition": "Read-only arguments passed from a parent component down to a child component to customize its display.",
            "analogy": "A delivery package handed to you with instructions inside that you cannot tamper with.",
            "codeSnippet": "<Avatar size=\"large\" username=\"Alex\" />"
        },
        {
            "term": "State (useState)",
            "category": "State Management",
            "definition": "A special React hook that allows a component to remember data between renders and trigger UI updates when changed.",
            "analogy": "A digital scoreboard at a basketball game that automatically updates the display when points change.",
            "codeSnippet": "const [count, setCount] = useState(0);"
        },
        {
            "term": "Virtual DOM",
            "category": "Architecture",
            "definition": "A lightweight in-memory representation of the real DOM tree used by React to calculate minimal updates.",
            "analogy": "An architect's digital blueprint compared against construction changes before pouring concrete.",
            "codeSnippet": "// Handled automatically by React fiber engine"
        },
        {
            "term": "Hook",
            "category": "React API",
            "definition": "Special functions starting with 'use' (like useState, useEffect, useContext) that let you hook into React features.",
            "analogy": "Power tools you plug into your component workbench when you need specific capabilities.",
            "codeSnippet": "import { useState, useEffect } from 'react';"
        },
        {
            "term": "Re-render",
            "category": "Lifecycle",
            "definition": "The process where React re-executes a component function to produce updated JSX when its state or props change.",
            "analogy": "Refreshing the canvas to paint the newest frame of a video game.",
            "codeSnippet": "setCount(prev => prev + 1); // Triggers re-render"
        },
        {
            "term": "Unidirectional Data Flow",
            "category": "Architecture",
            "definition": "The strict architectural rule in React where data flows in one direction: downwards from parent to child via props.",
            "analogy": "A waterfall where water only flows downhill, never backwards up the cliff.",
            "codeSnippet": "<Parent>\n  <Child message={data} />\n</Parent>"
        }
    ],
    "sandbox": {
        "instructions": "Edit the React component code below. Notice how changing the state with setCount automatically updates the button and counter badge!",
        "initialHTML": `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>React Live Sandbox</title>
  <!-- Load React & Babel Standalone from CDN -->
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8fafc;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      margin: 0;
    }
    .react-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 24px;
      max-width: 380px;
      width: 100%;
      text-align: center;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
    }
    .badge {
      display: inline-block;
      background: #e0f2fe;
      color: #0284c7;
      font-weight: 800;
      font-size: 0.8rem;
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 12px;
    }
    h2 { margin: 0 0 8px 0; color: #0f172a; font-size: 1.3rem; }
    p { color: #64748b; font-size: 0.9rem; margin-bottom: 20px; }
    .action-btn {
      background: #0284c7;
      color: #ffffff;
      border: none;
      padding: 12px 24px;
      font-size: 1rem;
      font-weight: 700;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
    }
    .action-btn:hover { background: #0369a1; transform: translateY(-1px); }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState } = React;

    function InteractiveCounterApp() {
      const [count, setCount] = useState(0);

      return (
        <div className="react-card">
          <span className="badge">⚛️ Live React Component</span>
          <h2>Interactive State Demo</h2>
          <p>Click the button to update component state in real time!</p>
          
          <button className="action-btn" onClick={() => setCount(count + 1)}>
            🚀 Clicks: {count}
          </button>
        </div>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<InteractiveCounterApp />);
  </script>
</body>
</html>`
    },
    "quizzes": [
        {
            "id": "react_q1",
            "question": "What is the primary difference between Props and State in React?",
            "options": [
                "Props are passed from parents and are read-only; State is managed internally and can be updated.",
                "Props can only hold strings, while State can only hold numbers.",
                "State is shared with all components automatically, while Props are private.",
                "There is no difference; Props and State are identical keywords."
            ],
            "correctIndex": 0,
            "explanation": "Props are immutable arguments passed down from parent components, while State is internal component memory managed with useState that triggers re-renders when updated."
        },
        {
            "id": "react_q2",
            "question": "Why does React use a Virtual DOM instead of directly manipulating the real browser DOM?",
            "options": [
                "Because web browsers do not have a real DOM anymore.",
                "To compare blueprints in memory and update only the exact elements that changed, making apps fast.",
                "To translate JavaScript into Python on the fly.",
                "Because Virtual DOM allows websites to work without CSS."
            ],
            "correctIndex": 1,
            "explanation": "The Virtual DOM allows React to perform fast in-memory diffing and update only the specific DOM nodes that changed, avoiding costly full-page DOM repaints."
        },
        {
            "id": "react_q3",
            "question": "What naming rule MUST every React custom component function follow?",
            "options": [
                "It must start with an underscore (_).",
                "It must be written completely in lowercase letters.",
                "It must start with a Capital Letter (e.g. MyComponent).",
                "It must end with the word 'Component'."
            ],
            "correctIndex": 2,
            "explanation": "React requires custom component names to start with a Capital Letter (PascalCase) so JSX can distinguish them from standard HTML tags like <div>, <button>, and <p>."
        }
    ]
};
