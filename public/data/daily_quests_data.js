/**
 * NoviCodes - 30 Curated Rotating Daily Quests Bank
 * Category Mix: 🔍 AI Bug Hunter | ⚡ JavaScript Logic | 🎨 CSS Styler | 🛡️ Web Best Practices
 */
window.DAILY_QUESTS_BANK = [
    {
        id: "quest_1",
        category: "🔍 AI Bug Hunter",
        title: "The Silent React State Mutation Bug",
        codeSnippet: `// An AI generated this code to add an item:
function addItem(list, newItem) {
    list.push(newItem); // ⚠️ Line 3
    return list;
}`,
        question: "Why does React fail to re-render the screen when using this function?",
        options: [
            "list.push() mutates the original array in place instead of creating a new copy, so React thinks state didn't change.",
            "JavaScript arrays cannot store new items with .push().",
            "Functions in React must always return a string, not an array.",
            "The function name should be called appendItem() instead."
        ],
        correctIndex: 0,
        explanation: "In modern frameworks like React, state must be treated as immutable. Mutating an array in-place with list.push() keeps the same memory reference, so React's shallow comparison thinks nothing changed! Use [...list, newItem] instead."
    },
    {
        id: "quest_2",
        category: "⚡ JavaScript Logic",
        title: "The String Coercion Trap",
        codeSnippet: `console.log(1 + "2" + 3);`,
        question: "What will the console output when this code executes?",
        options: [
            '"123"',
            '6',
            '"6"',
            'NaN'
        ],
        correctIndex: 0,
        explanation: 'JavaScript evaluates from left to right. 1 + "2" coerces 1 to string "1", producing "12". Then "12" + 3 coerces 3 to string, resulting in the final string "123".'
    },
    {
        id: "quest_3",
        category: "🎨 CSS Styler",
        title: "The Ultimate Center Alignment",
        codeSnippet: `.hero-card {
    display: flex;
    /* ??? Which properties center the child box completely? */
}`,
        question: "Which CSS property pair centers child elements both vertically and horizontally?",
        options: [
            "justify-content: center; align-items: center;",
            "text-align: center; vertical-align: middle;",
            "float: center; margin: auto;",
            "display: center; position: center;"
        ],
        correctIndex: 0,
        explanation: "In a flex container, justify-content: center aligns along the horizontal main axis, and align-items: center aligns along the vertical cross axis!"
    },
    {
        id: "quest_4",
        category: "🛡️ Web Best Practices",
        title: "Fast Image Loading",
        codeSnippet: `<img src="hero-banner.jpg" alt="DevDojo Mascot" ???>`,
        question: "Which native HTML attribute tells the browser to defer loading off-screen images until the user scrolls near them?",
        options: [
            'loading="lazy"',
            'defer="true"',
            'async="image"',
            'preload="scroll"'
        ],
        correctIndex: 0,
        explanation: 'loading="lazy" is the standard HTML5 native attribute that defers image loading until near the viewport, drastically boosting initial page load speed.'
    },
    {
        id: "quest_5",
        category: "🔍 AI Bug Hunter",
        title: "The Missing Await Promise Trap",
        codeSnippet: `// An AI wrote this API request function:
async function loadUserData() {
    const res = fetch('https://api.coderoots.dev/user');
    const data = res.json();
    return data.username;
}`,
        question: "What error will occur when calling this function?",
        options: [
            "TypeError: res.json is not a function (res is still a pending Promise because 'await' was omitted before fetch).",
            "The URL is missing an API key parameter.",
            "async functions cannot return objects.",
            "JSON cannot contain username properties."
        ],
        correctIndex: 0,
        explanation: "fetch() returns a Promise. Without 'await fetch(...)', 'res' is a Promise object rather than the HTTP Response, so res.json() will throw a TypeError!"
    },
    {
        id: "quest_6",
        category: "⚡ JavaScript Logic",
        title: "Equality: == vs ===",
        codeSnippet: `console.log(0 == false);
console.log(0 === false);`,
        question: "What will these two comparisons output in order?",
        options: [
            "true, false",
            "true, true",
            "false, false",
            "false, true"
        ],
        correctIndex: 0,
        explanation: "Loose equality (==) coerces both sides to numbers (0 == 0 -> true). Strict equality (===) checks both type and value without coercion (number vs boolean -> false)."
    },
    {
        id: "quest_7",
        category: "🎨 CSS Styler",
        title: "The CSS Specificity Ladder",
        codeSnippet: `/* CSS Rules */
p { color: red; }
.text-box p { color: blue; }
#intro p { color: green; }`,
        question: "If an element is `<div id='intro' class='text-box'><p>Hello</p></div>`, what color will the text be?",
        options: [
            "Green (ID selector has higher specificity)",
            "Blue (.text-box overrides IDs)",
            "Red (Last rule in stylesheet always wins)",
            "Black (Browser default)"
        ],
        correctIndex: 0,
        explanation: "An ID selector (#intro p) has a specificity weight of 100+1, which beats class selectors (.text-box p with weight 10+1) and tag selectors."
    },
    {
        id: "quest_8",
        category: "🛡️ Web Best Practices",
        title: "Safe External Links",
        codeSnippet: `<a href="https://external-site.com" target="_blank" rel="???">Visit Site</a>`,
        question: "What 'rel' attribute value is critical for security and performance when opening external links with target='_blank'?",
        options: [
            'rel="noopener noreferrer"',
            'rel="secure-link"',
            'rel="external-auth"',
            'rel="no-tracking"'
        ],
        correctIndex: 0,
        explanation: 'rel="noopener noreferrer" prevents the new tab from accessing window.opener (which could allow reverse tabnabbing phishing attacks) and improves performance.'
    },
    {
        id: "quest_9",
        category: "🔍 AI Bug Hunter",
        title: "Accidental Global Variable in JavaScript",
        codeSnippet: `function calculateScore(bonus) {
    totalPoints = 100 + bonus; // ⚠️ Missing keyword
    return totalPoints;
}`,
        question: "What critical bug occurs here because 'let' or 'const' was omitted?",
        options: [
            "totalPoints accidentally leaks into the global window scope as a global variable.",
            "The calculation will return NaN.",
            "JavaScript will refuse to run the function.",
            "The bonus parameter will be deleted."
        ],
        correctIndex: 0,
        explanation: "Assigning to an undeclared variable without 'let' or 'const' leaks it to the global window object, which can cause subtle overwrites and bugs across other scripts!"
    },
    {
        id: "quest_10",
        category: "⚡ JavaScript Logic",
        title: "Array Transformation with .map()",
        codeSnippet: `const numbers = [1, 2, 3];
const result = numbers.map(n => n * 2);`,
        question: "What is the value of 'result' and did 'numbers' change?",
        options: [
            "result is [2, 4, 6] and numbers remains [1, 2, 3] (immutable)",
            "result is [2, 4, 6] and numbers becomes [2, 4, 6]",
            "result is 6 (sum of numbers)",
            "result is undefined"
        ],
        correctIndex: 0,
        explanation: "Array.prototype.map() is a pure non-mutating method: it returns a brand new array with transformed elements without altering the original array."
    },
    {
        id: "quest_11",
        category: "🎨 CSS Styler",
        title: "Preventing Layout Shift on Mobile",
        codeSnippet: `* {
    box-sizing: border-box;
}`,
        question: "Why is `box-sizing: border-box` a mandatory best practice in modern CSS resets?",
        options: [
            "Padding and border are included inside the declared width/height, preventing elements from expanding and breaking layouts.",
            "It turns all elements into 3D boxes.",
            "It removes all margins from headings.",
            "It forces all fonts to bold."
        ],
        correctIndex: 0,
        explanation: "With content-box (default), adding 20px padding to a 100px wide box makes it 140px wide! border-box keeps it strictly 100px wide."
    },
    {
        id: "quest_12",
        category: "🛡️ Web Best Practices",
        title: "Accessible Button vs Anchor Link",
        codeSnippet: `<!-- Case A --> <button onclick="openModal()">Open</button>
<!-- Case B --> <a href="javascript:void(0)" onclick="openModal()">Open</a>`,
        question: "Why is Case A (<button>) far superior for web accessibility?",
        options: [
            "Native <button> elements automatically support keyboard focus (Tab key) and activation via Enter/Space for screen readers.",
            "<a> tags cannot run JavaScript.",
            "Buttons load faster from servers than links.",
            "<a> tags are not supported on mobile."
        ],
        correctIndex: 0,
        explanation: "Buttons are designed for in-page actions and have built-in keyboard accessibility (Space/Enter). Links are designed for URL navigation."
    },
    {
        id: "quest_13",
        category: "🔍 AI Bug Hunter",
        title: "React Dependency Array Infinite Loop",
        codeSnippet: `useEffect(() => {
    fetchData();
    // ⚠️ Missing dependency array!
});`,
        question: "What catastrophic bug happens when useEffect has no dependency array parameter?",
        options: [
            "The effect runs on EVERY single re-render, creating an infinite network fetch loop that crashes the app/server.",
            "The effect will never execute at all.",
            "React will throw a compile error.",
            "The browser will freeze immediately on load."
        ],
        correctIndex: 0,
        explanation: "Without a dependency array (like []), useEffect executes after every single render. If fetchData updates state, it triggers another render -> infinite loop!"
    },
    {
        id: "quest_14",
        category: "⚡ JavaScript Logic",
        title: "Logical Nullish Coalescing (??) vs OR (||)",
        codeSnippet: `const userScore = 0;
const displayScore = userScore ?? 100;`,
        question: "What is displayScore, and why did it not fallback to 100?",
        options: [
            "0, because ?? only falls back if the value is null or undefined (0 is a valid number).",
            "100, because 0 is falsy.",
            "NaN",
            "undefined"
        ],
        correctIndex: 0,
        explanation: "The Nullish Coalescing operator (??) only replaces null or undefined. Unlike || (which treats 0 or empty string as falsy), ?? treats 0 as a valid score!"
    },
    {
        id: "quest_15",
        category: "🎨 CSS Styler",
        title: "Z-Index Stacking Context",
        codeSnippet: `.modal {
    position: fixed;
    z-index: 9999;
}`,
        question: "Why might a z-index: 9999 element still get covered by another element?",
        options: [
            "If its parent container has a lower z-index or a CSS property like opacity/transform that creates a new stacking context.",
            "z-index values cannot exceed 1000.",
            "Fixed position elements do not support z-index.",
            "z-index only works on images."
        ],
        correctIndex: 0,
        explanation: "z-index is relative to the element's local stacking context. If a parent container has a lower stacking order, children cannot pierce through to the top!"
    },
    {
        id: "quest_16",
        category: "🛡️ Web Best Practices",
        title: "HTTPS vs HTTP",
        codeSnippet: `https://coderoots.dev vs http://coderoots.dev`,
        question: "What does the 'S' in HTTPS stand for, and what technology encrypts the connection?",
        options: [
            "Secure (TLS/SSL encryption preventing packet sniffing and man-in-the-middle attacks)",
            "Speed (Accelerated server routing)",
            "System (Operating system level handshake)",
            "Socket (WebSocket protocol)"
        ],
        correctIndex: 0,
        explanation: "HTTPS (HyperText Transfer Protocol Secure) uses TLS encryption so passwords and tokens cannot be intercepted by attackers on public Wi-Fi."
    },
    {
        id: "quest_17",
        category: "🔍 AI Bug Hunter",
        title: "The Async Event Loop Timing Trap",
        codeSnippet: `console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");`,
        question: "In what order will the letters print to the console?",
        options: [
            '"A", "C", "B"',
            '"A", "B", "C"',
            '"B", "A", "C"',
            '"C", "B", "A"'
        ],
        correctIndex: 0,
        explanation: "Synchronous code executes first (A, then C). Even with a 0ms delay, setTimeout pushes its callback to the MacroTask Queue, which only runs after the Call Stack is clear!"
    },
    {
        id: "quest_18",
        category: "⚡ JavaScript Logic",
        title: "Spread Operator for Objects",
        codeSnippet: `const user = { name: "Alex", score: 50 };
const updated = { ...user, score: 95 };`,
        question: "What does `updated` contain?",
        options: [
            '{ name: "Alex", score: 95 } (properties on the right overwrite earlier ones)',
            '{ score: 95 }',
            '{ name: "Alex", score: 50 }',
            'TypeError'
        ],
        correctIndex: 0,
        explanation: "The spread operator (...) shallow-copies all key-value pairs, and subsequent properties in the object literal overwrite earlier keys cleanly."
    },
    {
        id: "quest_19",
        category: "🎨 CSS Styler",
        title: "Responsive Clamp() Typography",
        codeSnippet: `h1 {
    font-size: clamp(1.5rem, 4vw, 3rem);
}`,
        question: "How does the CSS `clamp(min, preferred, max)` function behave?",
        options: [
            "It scales fluidly with viewport width (4vw) but never shrinks below 1.5rem or grows larger than 3rem.",
            "It randomly chooses one of the three font sizes.",
            "It cuts off overflowing text with an ellipsis.",
            "It only applies on mobile devices."
        ],
        correctIndex: 0,
        explanation: "clamp() provides fluid responsive typography without needing complex @media queries, setting a hard minimum, scalable middle, and hard maximum!"
    },
    {
        id: "quest_20",
        category: "🛡️ Web Best Practices",
        title: "SQL Injection Prevention",
        codeSnippet: `// Option A: "SELECT * FROM users WHERE id = " + userId
// Option B: "SELECT * FROM users WHERE id = $1", [userId]`,
        question: "Why is Option B (Parameterized Queries / Prepared Statements) essential for databases?",
        options: [
            "It treats user input strictly as data rather than executable SQL code, preventing SQL injection attacks.",
            "Option B runs 100x faster than Option A.",
            "Option A is invalid SQL syntax.",
            "Option B automatically encrypts the entire database."
        ],
        correctIndex: 0,
        explanation: "Parameterized queries separate the query structure from user inputs, rendering classic SQL Injection attacks (like ' OR '1'='1) completely harmless."
    },
    {
        id: "quest_21",
        category: "🔍 AI Bug Hunter",
        title: "DOM QuerySelector Null Reference Error",
        codeSnippet: `// Script in <head> without defer:
const btn = document.querySelector('#submitBtn');
btn.addEventListener('click', doWork); // ⚠️ Uncaught TypeError`,
        question: "Why did this code throw 'Cannot read properties of null (reading addEventListener)'?",
        options: [
            "The JavaScript ran before the browser finished parsing the HTML body where the button lives.",
            "document.querySelector cannot select elements by ID.",
            "addEventListener is not supported on buttons.",
            "The script tag was missing an alt attribute."
        ],
        correctIndex: 0,
        explanation: "If a script runs before the HTML DOM is parsed, document.querySelector returns null! Use <script defer> or put scripts at the bottom of <body>."
    },
    {
        id: "quest_22",
        category: "⚡ JavaScript Logic",
        title: "Destructuring Default Values",
        codeSnippet: `const { role = "Learner", xp = 0 } = { xp: 250 };`,
        question: "What are the values of 'role' and 'xp'?",
        options: [
            'role = "Learner", xp = 250',
            'role = undefined, xp = 250',
            'role = "Learner", xp = 0',
            'TypeError'
        ],
        correctIndex: 0,
        explanation: "Destructuring assigns the default value ('Learner') because 'role' was undefined in the source object, while preserving the existing 'xp: 250'."
    },
    {
        id: "quest_23",
        category: "🎨 CSS Styler",
        title: "Modern CSS Grid Template Columns",
        codeSnippet: `.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}`,
        question: "What superpower does this single CSS Grid rule provide?",
        options: [
            "It creates an automatically responsive multi-column grid that wraps cards to new rows without writing any media queries!",
            "It forces exactly 3 columns on all screen sizes.",
            "It turns cards into circles.",
            "It hides all cards on mobile screens."
        ],
        correctIndex: 0,
        explanation: "repeat(auto-fit, minmax(280px, 1fr)) is the holy grail of responsive grids: cards shrink to 280px, expand to fill space (1fr), and wrap automatically."
    },
    {
        id: "quest_24",
        category: "🛡️ Web Best Practices",
        title: "CORS (Cross-Origin Resource Sharing)",
        codeSnippet: `Access to fetch at 'https://api.domain.com' from origin 'https://my-app.com' has been blocked by CORS policy`,
        question: "Where must CORS headers (e.g. Access-Control-Allow-Origin) be configured to resolve this issue?",
        options: [
            "On the target API backend server, permitting the client's origin.",
            "In the client's HTML <meta> tags.",
            "Inside the client's CSS stylesheet.",
            "By clearing the user's browser cache."
        ],
        correctIndex: 0,
        explanation: "CORS is a browser security mechanism. The backend server hosting the API must respond with Access-Control-Allow-Origin headers permitting the client domain."
    },
    {
        id: "quest_25",
        category: "🔍 AI Bug Hunter",
        title: "The Unchecked Event Default in Forms",
        codeSnippet: `form.addEventListener('submit', (e) => {
    // ⚠️ Missing preventDefault()
    saveDataViaFetch();
});`,
        question: "What annoying behavior happens when e.preventDefault() is missing in a form submit handler?",
        options: [
            "The browser reloads the entire page and submits as a standard GET/POST request, cancelling the JavaScript fetch call.",
            "The form elements are permanently locked.",
            "The user's password is deleted.",
            "The submit event never fires."
        ],
        correctIndex: 0,
        explanation: "By default, submitting an HTML form refreshes the page! Calling e.preventDefault() stops the page reload so your single-page app can handle the submission smoothly."
    },
    {
        id: "quest_26",
        category: "⚡ JavaScript Logic",
        title: "Template Literals & Multiline Strings",
        codeSnippet: `const name = "DevDojo";
const msg = \`Welcome to \${name.toUpperCase()}!\`;`,
        question: "What is the exact string value of 'msg'?",
        options: [
            '"Welcome to DEVDOJO!"',
            '"Welcome to ${name.toUpperCase()}!"',
            '"Welcome to DevDojo!"',
            'TypeError'
        ],
        correctIndex: 0,
        explanation: "Template literals using backticks (`) evaluate expressions inside ${...} dynamically and convert them to string output seamlessly."
    },
    {
        id: "quest_27",
        category: "🎨 CSS Styler",
        title: "CSS Transitions & Transform",
        codeSnippet: `button {
    transition: transform 0.2s ease;
}
button:hover {
    transform: translateY(-2px);
}`,
        question: "Why is `transform: translateY(-2px)` preferred over `top: -2px` or `margin-top: -2px` for smooth hover animations?",
        options: [
            "Transform runs on the GPU (Compositor thread) without triggering expensive browser layout reflows, giving smooth 60fps animations.",
            "Transform works on Internet Explorer 6.",
            "Margin cannot have negative values in CSS.",
            "Top only works on text."
        ],
        correctIndex: 0,
        explanation: "CSS transforms and opacity are GPU-accelerated and do not trigger layout recalculations, delivering buttery-smooth 60fps/120fps micro-interactions."
    },
    {
        id: "quest_28",
        category: "🛡️ Web Best Practices",
        title: "XSS (Cross-Site Scripting) Defense",
        codeSnippet: `// Case A: element.innerHTML = userComment;
// Case B: element.textContent = userComment;`,
        question: "Why does Case B (textContent) protect your app from malicious hacker scripts?",
        options: [
            "textContent treats user input strictly as raw text and will NOT parse or execute malicious <script> tags.",
            "textContent automatically sends comments to a virus scanner.",
            "innerHTML only works in dark mode.",
            "textContent encrypts the database."
        ],
        correctIndex: 0,
        explanation: "Setting innerHTML with untrusted user input allows attackers to inject and run malicious scripts (XSS). textContent safely escapes all HTML markup!"
    },
    {
        id: "quest_29",
        category: "🔍 AI Bug Hunter",
        title: "Array Filter Returns Empty Array Trap",
        codeSnippet: `const users = [{ name: "Alex", active: true }, { name: "Sam", active: false }];
const activeUsers = users.filter(u => {
    u.active === true; // ⚠️ Missing return statement!
});`,
        question: "Why is activeUsers an empty array `[]`?",
        options: [
            "The arrow function uses curly braces `{ ... }` but forgot the `return` keyword, so it returned `undefined` (falsy) for every item.",
            "Array.filter() cannot check boolean properties.",
            "Objects in arrays cannot be filtered.",
            "u.active is invalid syntax."
        ],
        correctIndex: 0,
        explanation: "In arrow functions with block bodies `{ ... }`, you must explicitly write `return u.active;` (or omit the braces: `u => u.active`). Otherwise it returns undefined!"
    },
    {
        id: "quest_30",
        category: "⚡ JavaScript Logic",
        title: "Optional Chaining (?.) Operator",
        codeSnippet: `const profile = { user: null };
const avatar = profile.user?.avatar?.url;`,
        question: "What will `avatar` evaluate to, and will it crash with an error?",
        options: [
            "undefined (no crash, optional chaining safely short-circuits on null/undefined)",
            "null",
            "It will crash with Uncaught TypeError",
            '""'
        ],
        correctIndex: 0,
        explanation: "Optional chaining (?.) stops evaluation and safely returns undefined if the left-hand operand is null or undefined, preventing runtime TypeError crashes!"
    }
];
