// ============================================================================
// HYBRID APPROACH - Tab Support + Browser Native Undo
// ============================================================================

const taskEditor = document.getElementById("task-editor");
const lineDisplay = document.getElementById("current-line");
const colDisplay = document.getElementById("current-col");

taskEditor.addEventListener("keyup", updateCursorPos);
taskEditor.addEventListener("click", updateCursorPos);

function updateCursorPos() {
  const text = taskEditor.value.substr(0, taskEditor.selectionStart);
  const lines = text.split("\n");
  const currentLine = lines.length;
  const currentCol = lines[lines.length - 1].length + 1; // +1 since col starts at 1
  lineDisplay.textContent = currentLine;
  colDisplay.textContent = currentCol;
}

function updateCursorPosition(textarea) {
    if (!textarea) return;
    
    const value = textarea.value;
    const cursorPos = textarea.selectionStart;
    const beforeCursor = value.substring(0, cursorPos);
    const lines = beforeCursor.split('\n');
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    
    // Update playground cursor position
    if (textarea.id === 'playground-code') {
        const currentLine = document.getElementById('playground-current-line');
        const currentCol = document.getElementById('playground-current-col');
        if (currentLine) currentLine.textContent = line;
        if (currentCol) currentCol.textContent = col;
    }
    
    // Update task editor cursor position
    if (textarea.id === 'task-editor') {
        const currentLine = document.getElementById('task-current-line');
        const currentCol = document.getElementById('task-current-col');
        if (currentLine) currentLine.textContent = line;
        if (currentCol) currentCol.textContent = col;
    }
}

function setupCursorTracking(textarea) {
    if (!textarea) return;
    
    // Create a throttled update function to prevent excessive calls
    let updateTimeout;
    const throttledUpdate = () => {
        if (updateTimeout) clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => updateCursorPosition(textarea), 10);
    };
    
    // Remove any existing listeners first
    const events = ['input', 'keyup', 'keydown', 'click', 'focus', 'blur', 'mouseup', 'touchend', 'paste', 'cut'];
    events.forEach(event => {
        textarea.removeEventListener(event, throttledUpdate);
    });
    
    // Add comprehensive event listeners
    events.forEach(event => {
        textarea.addEventListener(event, throttledUpdate, { passive: true });
    });
    
    // Special handling for selection changes using document-level event
    let isActiveTextarea = false;
    
    textarea.addEventListener('focus', () => {
        isActiveTextarea = true;
        updateCursorPosition(textarea);
    });
    
    textarea.addEventListener('blur', () => {
        isActiveTextarea = false;
    });
    
    // Document-level selection change handler
    const selectionHandler = () => {
        if (isActiveTextarea && document.activeElement === textarea) {
            updateCursorPosition(textarea);
        }
    };
    
    // Remove existing listener if any
    document.removeEventListener('selectionchange', selectionHandler);
    document.addEventListener('selectionchange', selectionHandler);
    
    // Initial cursor position update
    setTimeout(() => updateCursorPosition(textarea), 50);
}

function addTabSupportWithNativeUndo(textarea) {
    const INDENT_SIZE = 2;
    const INDENT_CHAR = ' '.repeat(INDENT_SIZE);
    
    textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            
            const start = this.selectionStart;
            const end = this.selectionEnd;
            const value = this.value;
            
            if (document.execCommand) {
                if (e.shiftKey) {
                    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
                    const currentLine = value.substring(lineStart, start);
                    
                    if (currentLine.endsWith(INDENT_CHAR)) {
                        this.selectionStart = start - INDENT_SIZE;
                        this.selectionEnd = start;
                        document.execCommand('delete', false);
                    }
                } else {
                    document.execCommand('insertText', false, INDENT_CHAR);
                }
            } else {
                if (e.shiftKey) {
                    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
                    const beforeLine = value.substring(0, lineStart);
                    const currentLine = value.substring(lineStart, start);
                    const afterCursor = value.substring(start);
                    
                    if (currentLine.endsWith(INDENT_CHAR)) {
                        const newLine = currentLine.substring(0, currentLine.length - INDENT_SIZE);
                        this.value = beforeLine + newLine + afterCursor;
                        this.selectionStart = this.selectionEnd = start - INDENT_SIZE;
                    }
                } else {
                    this.value = value.substring(0, start) + INDENT_CHAR + value.substring(end);
                    this.selectionStart = this.selectionEnd = start + INDENT_SIZE;
                }
            }
            
            // Update cursor position immediately after tab operation
            updateCursorPosition(this);
            
            // Trigger input event for preview update
            this.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });
    
    // Handle other navigation keys that might affect cursor position
    textarea.addEventListener('keydown', function(e) {
        const navigationKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'];
        if (navigationKeys.includes(e.key)) {
            // Update cursor position after the key event is processed
            setTimeout(() => updateCursorPosition(this), 0);
        }
    });
    
    textarea.style.tabSize = '1';
    textarea.style.MozTabSize = '1';
}
  
// ============================================================================
// INITIALIZE HYBRID SYSTEM
// ============================================================================
  
function initHybridSystem() {
    const playgroundCode = document.getElementById('playground-code');
    if (playgroundCode) {
        addTabSupportWithNativeUndo(playgroundCode);
        setupCursorTracking(playgroundCode);
    }
    
    const taskEditor = document.getElementById('task-editor');
    if (taskEditor) {
        addTabSupportWithNativeUndo(taskEditor);
        setupCursorTracking(taskEditor);
    }
}

// Global variables for tracking
let currentDemo = 'variables';
let lessonCompleted = false;

// Concept info popup
function showConceptInfo(concept) {
    const info = {
        variables: "Variables are like labeled boxes that store information. You can put different types of data in them (text, numbers, true/false) and change the contents later. Think of them as your program's memory!",
        operators: "Operators are symbols that tell JavaScript to perform actions on your data. + adds numbers or joins text, - subtracts, * multiplies, / divides, and comparison operators like === check if things are equal.",
        console: "console.log() is your window into what's happening in your code. It displays messages in the browser's developer console (press F12 to see it). It's essential for debugging and seeing your program's output!",
        functions: "Functions are reusable blocks of code that perform specific tasks. You can call them multiple times with different inputs. They help organize your code and avoid repetition. Think of them as custom commands!"
    };

    const popup = document.createElement('div');
    popup.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 500px;
            animation: popupSlideIn 0.3s ease-out;
            text-align: center;
        ">
            <h3 style="margin: 0 0 15px 0; font-size: 1.5em; color: white; text-decoration: underline;">${concept.charAt(0).toUpperCase() + concept.slice(1)}</h3>
            <p style="margin: 0 0 20px 0; line-height: 1.6; font-size: 1.1em;">${info[concept]}</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: rgba(255,255,255,0.2);
                border: 2px solid white;
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='white'; this.style.color='#667eea'" onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.color='white'">Got it!</button>
        </div>
    `;
    document.body.appendChild(popup);
}

// Demo tab switching
function showDemo(demoType, clickedTab) {
    // Update tabs
    document.querySelectorAll('.demo-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Find the clicked tab
    const targetTab = clickedTab || document.querySelector(`[data-demo="${demoType}"]`);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    // Update content
    document.querySelectorAll('.demo-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`demo-${demoType}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    currentDemo = demoType;
}

// Try example functions
function tryVariablesExample() {
    const exampleCode = `// Variables Example
let userName = "Alex";
let userAge = 25;
let isStudent = true;
let favoriteColors = ["blue", "green", "purple"];

console.log("User Info:");
console.log("Name:", userName);
console.log("Age:", userAge);
console.log("Is Student:", isStudent);
console.log("Favorite Colors:", favoriteColors);

// Update variables
userName = "Alexandra";
userAge = userAge + 1;

console.log("\\nUpdated Info:");
console.log("Name:", userName);
console.log("Age:", userAge);`;

    const codeEditor = document.getElementById('playground-code');
    if (codeEditor) {
        codeEditor.value = exampleCode;
        runPlaygroundCode();
        updateProgressStep(2);
        // Update cursor position after setting value
        setTimeout(() => updateCursorPosition(codeEditor), 0);
    }
}

function tryOperatorsExample() {
    const exampleCode = `// Operators Example
let price = 19.99;
let taxRate = 0.1;
let quantity = 3;

// Mathematical operations
let subtotal = price * quantity;
let tax = subtotal * taxRate;
let total = subtotal + tax;

console.log("Shopping Cart Calculation:");
console.log("Item Price: $" + price.toFixed(2));
console.log("Quantity:", quantity);
console.log("Subtotal: $" + subtotal.toFixed(2));
console.log("Tax (10%): $" + tax.toFixed(2));
console.log("Total: $" + total.toFixed(2));

// Comparison operations
let canAfford = total < 100;
let freeShipping = total > 50;

console.log("\\nChecking conditions:");
console.log("Can afford (under $100):", canAfford);
console.log("Qualifies for free shipping:", freeShipping);`;

    const codeEditor = document.getElementById('playground-code');
    if (codeEditor) {
        codeEditor.value = exampleCode;
        runPlaygroundCode();
        updateProgressStep(2);
        // Update cursor position after setting value
        setTimeout(() => updateCursorPosition(codeEditor), 0);
    }
}

function tryConsoleExample() {
    const exampleCode = `// Console Output Example
console.log("=== Welcome to JavaScript! ===");
console.log(""); // Empty line for spacing

let currentUser = "Developer";
let sessionTime = new Date().toLocaleTimeString();

console.log("Hello,", currentUser + "!");
console.log("Current time:", sessionTime);
console.log("You are in the JavaScript playground");

// Multiple data types in one log
console.log("Session stats:", {
    user: currentUser,
    time: sessionTime,
    lessons_completed: 9,
    current_lesson: "JavaScript Basics"
});

console.log(""); // Spacing
console.log("Tip: Open Developer Tools (F12) to see this output!");
console.log("Ready to write some JavaScript?");`;

    const codeEditor = document.getElementById('playground-code');
    if (codeEditor) {
        codeEditor.value = exampleCode;
        runPlaygroundCode();
        updateProgressStep(2);
        // Update cursor position after setting value
        setTimeout(() => updateCursorPosition(codeEditor), 0);
    }
}

function tryDatatypesExample() {
    const exampleCode = `// Data Types Example
// String (text)
let welcomeMessage = "Welcome to JavaScript!";
let userComment = 'This is awesome!';

// Numbers
let wholeNumber = 42;
let decimalNumber = 3.14159;
let negativeNumber = -10;

// Boolean (true/false)
let isLearning = true;
let hasFinished = false;

// Array (list of items)
let programmingLanguages = ["JavaScript", "Python", "Java"];
let luckyNumbers = [7, 13, 21, 42];

console.log("=== Data Types in Action ===");
console.log("Text:", welcomeMessage);
console.log("Comment:", userComment);
console.log("Whole number:", wholeNumber);
console.log("Decimal:", decimalNumber);
console.log("Is learning:", isLearning);
console.log("Programming languages:", programmingLanguages);
console.log("Lucky numbers:", luckyNumbers);

// Type checking
console.log("\\n=== Type Information ===");
console.log("Type of welcomeMessage:", typeof welcomeMessage);
console.log("Type of wholeNumber:", typeof wholeNumber);
console.log("Type of isLearning:", typeof isLearning);
console.log("programmingLanguages is Array:", Array.isArray(programmingLanguages));`;

    const codeEditor = document.getElementById('playground-code');
    if (codeEditor) {
        codeEditor.value = exampleCode;
        runPlaygroundCode();
        updateProgressStep(2);
        // Update cursor position after setting value
        setTimeout(() => updateCursorPosition(codeEditor), 0);
    }
}

// Playground functions
function setupPlayground() {
    const textarea = document.getElementById('playground-code');
    if (textarea) {
        textarea.addEventListener('input', function() {
            // Update cursor position immediately on input
            updateCursorPosition(this);
            
            // Auto-run code after a short delay
            clearTimeout(this.autoRunTimer);
            this.autoRunTimer = setTimeout(() => {
                runPlaygroundCode();
            }, 1000);
        });
    }
}

function runPlaygroundCode() {
    const codeEditor = document.getElementById('playground-code');
    const output = document.getElementById('playground-output');
    
    if (!codeEditor || !output) return;
    
    const code = codeEditor.value;
    const htmlContent = createEnhancedHTML(code);
    setIframeHTML(output, htmlContent);
}

function clearPlayground() {
    const codeEditor = document.getElementById('playground-code');
    const output = document.getElementById('playground-output');
    
    if (codeEditor) {
        codeEditor.value = '';
        // Update cursor position after clearing
        updateCursorPosition(codeEditor);
    }
    if (output) {
        try {
            output.srcdoc = '';
        } catch (e) {
            // Silent error handling
        }
    }
}

function loadExample() {
    const exampleCode = `// JavaScript Basics Example
let studentName = "Alex";
let currentGrade = 85;
let isPassingGrade = currentGrade >= 70;

// Calculations
let pointsToA = 90 - currentGrade;
let gradePercentage = (currentGrade / 100) * 100;

// Display information
console.log("=== Student Report ===");
console.log("Student:", studentName);
console.log("Current Grade:", currentGrade + "%");
console.log("Passing Grade:", isPassingGrade);
console.log("Points needed for A:", pointsToA);

// Conditional example
if (isPassingGrade) {
    console.log("Congratulations! You're passing!");
} else {
    console.log("Need to improve grade");
}

// Loop example
console.log("\\n=== Grade History ===");
let grades = [78, 82, 85, 88, 90];
for (let i = 0; i < grades.length; i++) {
    console.log("Week " + (i + 1) + ": " + grades[i] + "%");
}`;

    const codeEditor = document.getElementById('playground-code');
    if (codeEditor) {
        codeEditor.value = exampleCode;
        runPlaygroundCode();
        // Update cursor position after setting value
        setTimeout(() => updateCursorPosition(codeEditor), 0);
    }
}

// Task functions
function updateTaskPreview() {
    const taskEditor = document.getElementById('task-editor');
    const output = document.getElementById('task-output');
    
    if (!taskEditor || !output) return;
    
    // Update cursor position when preview updates
    updateCursorPosition(taskEditor);
    
    const code = taskEditor.value;
    const htmlContent = createEnhancedHTML(code);
    setIframeHTML(output, htmlContent);
}

function createEnhancedHTML(userCode) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Output</title>
    <style>
        body {
            font-family: 'Nunito', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: #f8f9ff;
            color: #333;
        }
        .console-output {
            background: #2d3748;
            color: #e2e8f0;
            padding: 16px;
            border-radius: 8px;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 14px;
            margin-top: 20px;
            border: 2px solid #4a5568;
            max-height: 300px;
            overflow-y: auto;
        }
        .console-header {
            color: #a0aec0;
            font-size: 12px;
            margin-bottom: 12px;
            border-bottom: 1px solid #4a5568;
            padding-bottom: 8px;
            font-weight: bold;
        }
        .console-line {
            margin: 4px 0;
            padding: 2px 0;
        }
        .console-line.log {
            color: #68d391;
        }
        .console-line.error {
            color: #feb2b2;
        }
        .console-line.warn {
            color: #f6e05e;
        }
        .info-message {
            background: white;
            border: 1px solid #dde7ff;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 16px;
            text-align: center;
            color: #007BFF;
        }
    </style>
</head>
<body>
    <div class="info-message">
        <strong>JavaScript Playground</strong><br>
        Your code output appears below. Open browser console (F12) to see more details!
    </div>
    
    <div class="console-output">
        <div class="console-header">Console Output</div>
        <div id="console-logs"></div>
    </div>
    
    <script>
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        const consoleDiv = document.getElementById('console-logs');
        let logCount = 0;
        
        function addToConsole(message, type) {
            const line = document.createElement('div');
            line.className = 'console-line ' + (type || 'log');
            line.textContent = '> ' + message;
            consoleDiv.appendChild(line);
            logCount++;
        }
        
        console.log = function() {
            const args = Array.from(arguments);
            const message = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            addToConsole(message, 'log');
            originalLog.apply(console, arguments);
        };
        
        console.error = function() {
            const args = Array.from(arguments);
            const message = args.map(arg => String(arg)).join(' ');
            addToConsole('ERROR: ' + message, 'error');
            originalError.apply(console, arguments);
        };
        
        console.warn = function() {
            const args = Array.from(arguments);
            const message = args.map(arg => String(arg)).join(' ');
            addToConsole('WARN: ' + message, 'warn');
            originalWarn.apply(console, arguments);
        };
        
        try {
            ${userCode}
            
            if (logCount === 0) {
                addToConsole('No console.log() output detected. Add console.log() statements to see results!', 'warn');
            }
        } catch (error) {
            addToConsole('JavaScript Error: ' + error.message, 'error');
        }
    </script>
</body>
</html>`;
}

function setIframeHTML(iframe, html) {
    if (!iframe) return;
    
    try {
        if ('srcdoc' in iframe) {
            iframe.srcdoc = html;
            return;
        }
        
        const doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
        if (doc) {
            doc.open();
            doc.write(html);
            doc.close();
            return;
        }
        
        iframe.setAttribute('src', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
    } catch (e) {
        try {
            iframe.setAttribute('src', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
        } catch (err) {
            // Silent error handling
        }
    }
}

function showHint() {
    const hints = [
        "Start with declaring variables using 'let' or 'const'",
        "Try creating a string variable: let name = 'YourName';",
        "Add a number variable: let age = 25;",
        "Include a boolean: let isStudent = true;",
        "Use operators like +, -, *, / for calculations",
        "Display results with console.log('message', variable);",
        "Make it personal - use your own name and data!",
        "Combine text and variables: 'Hello ' + name + '!'"
    ];

    const randomHint = hints[Math.floor(Math.random() * hints.length)];

    const hintPopup = document.createElement('div');
    hintPopup.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ffc107, #ffb300);
            color: white;
            padding: 16px 20px;
            border-radius: 25px;
            box-shadow: 0 8px 20px rgba(255,193,7,0.4);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            font-weight: 600;
            max-width: 320px;
        ">
            ${randomHint}
        </div>
    `;

    document.body.appendChild(hintPopup);

    setTimeout(() => {
        if (hintPopup.firstElementChild) {
            hintPopup.firstElementChild.style.animation = 'slideOutRight 0.5s ease-out';
        }
        setTimeout(() => hintPopup.remove(), 500);
    }, 6000);
}

function checkAnswer() {
    const taskEditor = document.getElementById('task-editor');
    if (!taskEditor) return;
    
    const code = taskEditor.value.trim();
    
    if (!code) {
        showFeedback('error', 'ðŸ¤" Your Code is Empty!', 'Please write some JavaScript code to complete the challenge.');
        return;
    }

    let errors = [];
    let warnings = [];
    let successes = [];

    // 1. Check for syntax errors first
    try {
        // Basic syntax validation
        new Function(code);
    } catch (syntaxError) {
        if (syntaxError.message.includes('Unexpected token')) {
            errors.push('Syntax Error: Unexpected character or symbol found. Check for typos, missing quotes, or incorrect punctuation.');
        } else if (syntaxError.message.includes('Unexpected end of input')) {
            errors.push('Syntax Error: Incomplete code - missing closing bracket }, parenthesis ), or quote mark.');
        } else if (syntaxError.message.includes('Unexpected identifier')) {
            errors.push('Syntax Error: Invalid variable name or missing keyword (let, const, var).');
        } else {
            errors.push('Syntax Error: ' + syntaxError.message);
        }
    }

    // 2. Check for missing semicolons (common beginner mistake)
    const lines = code.split('\n');
    const missingSemicolons = [];
    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (trimmed && 
            !trimmed.endsWith(';') && 
            !trimmed.endsWith('{') && 
            !trimmed.endsWith('}') && 
            !trimmed.startsWith('//') && 
            !trimmed.startsWith('if') && 
            !trimmed.startsWith('for') && 
            !trimmed.startsWith('while') && 
            !trimmed.startsWith('function') &&
            (trimmed.includes('=') || trimmed.includes('console.log'))) {
            missingSemicolons.push(index + 1);
        }
    });

    if (missingSemicolons.length > 0) {
        warnings.push(`Missing semicolons on lines: ${missingSemicolons.join(', ')}. While JavaScript can work without them, it's good practice to include semicolons.`);
    }

    // 3. Check console.log requirements
    const hasConsoleLog = /console\.log\s*\(/i.test(code);
    const consoleLogCount = (code.match(/console\.log\s*\(/gi) || []).length;
    
    if (!hasConsoleLog) {
        errors.push('Missing console.log() statements - you need these to display output.');
    } else if (consoleLogCount < 2) {
        errors.push(`Insufficient console.log() statements: need at least 2, found only ${consoleLogCount}.`);
    } else {
        successes.push(`Console output: ${consoleLogCount} console.log() statements found`);
    }

    // 4. Check variable declarations with specific feedback
    const letVariables = (code.match(/let\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*=/gi) || []).length;
    const constVariables = (code.match(/const\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*=/gi) || []).length;
    const varVariables = (code.match(/var\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*=/gi) || []).length;
    const totalVariables = letVariables + constVariables + varVariables;

    if (totalVariables === 0) {
        errors.push('No variable declarations found - use "let variableName = value;" to create variables.');
    } else if (totalVariables < 3) {
        errors.push(`Not enough variables: need at least 3, found only ${totalVariables}. Use "let" or "const" to declare more variables.`);
    } else {
        successes.push(`Variable declarations: ${totalVariables} variables found (${letVariables} let, ${constVariables} const, ${varVariables} var)`);
    }

    // 5. Check data types with specific examples
    const hasString = /["'`][^"'`]*["'`]/.test(code);
    const hasNumber = /=\s*\d+(\.\d+)?(?:[^a-zA-Z_$]|$)/.test(code);
    const hasBoolean = /=\s*(true|false)(?:[^a-zA-Z_$]|$)/.test(code);
    
    if (!hasString) {
        errors.push('Missing string variable - add text in quotes like: let name = "Your Name";');
    } else {
        successes.push('String data type: found text in quotes');
    }
    
    if (!hasNumber) {
        errors.push('Missing number variable - add a number like: let age = 25;');
    } else {
        successes.push('Number data type: found numeric values');
    }
    
    if (!hasBoolean) {
        errors.push('Missing boolean variable - add true/false like: let isStudent = true;');
    } else {
        successes.push('Boolean data type: found true/false values');
    }

    // 6. Check mathematical operations
    const mathOperators = code.match(/[\+\-\*\/\%]/g) || [];
    const meaningfulMath = (code.match(/[a-zA-Z_$][a-zA-Z0-9_$]*\s*[\+\-\*\/\%]\s*[a-zA-Z0-9_$]+/g) || []).length +
                          (code.match(/\d+\s*[\+\-\*\/\%]\s*\d+/g) || []).length;

    if (mathOperators.length === 0) {
        errors.push('No mathematical operations found - use operators like +, -, *, / between numbers or variables.');
    } else if (meaningfulMath < 2) {
        errors.push(`Insufficient calculations: need at least 2 mathematical operations, found ${meaningfulMath}. Try: let result = number1 + number2;`);
    } else {
        successes.push(`Mathematical operations: ${meaningfulMath} calculations found`);
    }

    // 7. Check for greeting message with variable
    const hasStringConcatenation = /console\.log\s*\([^)]*[\+]/.test(code);
    const hasGreetingWords = /console\.log\s*\([^)]*(?:hello|hi|welcome|greet|name)/i.test(code);
    
    if (!hasStringConcatenation && !hasGreetingWords) {
        errors.push('Missing greeting message - create a personal message using console.log() that includes a variable, like: console.log("Hello " + name + "!");');
    } else if (!hasStringConcatenation) {
        errors.push('Greeting found but missing variable concatenation - combine text with variables using the + operator.');
    } else {
        successes.push('Greeting message: found personal message with variable');
    }

    // 8. Check for descriptive variable names
    const variableNames = code.match(/(?:let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/gi);
    if (variableNames) {
        const poorNames = variableNames.filter(match => {
            const name = match.split(/\s+/)[1].toLowerCase();
            return ['a', 'b', 'c', 'x', 'y', 'z', 'temp', 'var1', 'var2', 'test'].includes(name);
        });
        
        if (poorNames.length > 0) {
            warnings.push(`Consider using more descriptive variable names instead of: ${poorNames.map(m => m.split(/\s+/)[1]).join(', ')}. Use names like "userName", "age", "totalPrice".`);
        } else {
            successes.push('Variable naming: uses descriptive variable names');
        }
    }

    // 9. Check for proper console.log usage
    const emptyConsoleLogs = /console\.log\s*\(\s*\)/.test(code);
    if (emptyConsoleLogs) {
        warnings.push('Found empty console.log() statements - make sure to include messages or variables to display.');
    }

    // 10. Check for calculation result display
    const hasCalculationDisplay = /console\.log\s*\([^)]*(?:\+|\-|\*|\/|\%)/.test(code) || 
                                 /let\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*=.*(?:\+|\-|\*|\/|\%)[^;]*;[\s\S]*console\.log/.test(code);
    
    if (!hasCalculationDisplay) {
        errors.push('Missing calculation result display - show the result of a mathematical operation using console.log().');
    } else {
        successes.push('Calculation display: shows mathematical results');
    }

    // 11. Try to execute code and catch runtime errors
    let runtimeErrors = [];
    try {
        // Create a safe execution environment
        const safeCode = code.replace(/console\.log/g, 'mockConsole.log');
        const mockConsole = { log: () => {} };
        const testFunction = new Function('mockConsole', safeCode);
        testFunction(mockConsole);
    } catch (runtimeError) {
        if (runtimeError.message.includes('is not defined')) {
            const variable = runtimeError.message.match(/(\w+) is not defined/);
            if (variable) {
                runtimeErrors.push(`Variable "${variable[1]}" is used but not declared. Add: let ${variable[1]} = someValue;`);
            } else {
                runtimeErrors.push('Using undefined variable - make sure to declare all variables with let, const, or var.');
            }
        } else if (runtimeError.message.includes('Unexpected token')) {
            runtimeErrors.push('Syntax error in your code - check for missing quotes, brackets, or semicolons.');
        } else {
            runtimeErrors.push('Runtime error: ' + runtimeError.message);
        }
    }

    // Combine all errors
    const allErrors = [...errors, ...runtimeErrors];

    // Display results with detailed feedback
    if (allErrors.length === 0) {
        let successMessage = successes.join('<br>');
        if (warnings.length > 0) {
            successMessage += '<br><br><strong>Suggestions for improvement:</strong><br>' + warnings.join('<br>');
        }
        successMessage += '<br><br><strong>Excellent work! You\'ve mastered JavaScript basics!</strong>';
        
        showFeedback('success', 'âœ… All Requirements Met!', successMessage);
        
        updateProgressStep(3);
        enableNextLesson();
        createCelebration();
        
        try {
            if (typeof Storage !== 'undefined') {
                localStorage.setItem('partB_lesson10_remake_complete', 'true');
            }
        } catch (e) {
            // Silent error handling
        }
    } else {
        let errorMessage = '<strong>Please fix these issues:</strong><br>';
        errorMessage += allErrors.map((error, index) => `${index + 1}. ${error}`).join('<br>');
        
        if (successes.length > 0) {
            errorMessage += '<br><br><strong>What\'s working correctly:</strong><br>' + successes.join('<br>');
        }
        
        if (warnings.length > 0) {
            errorMessage += '<br><br><strong>Suggestions:</strong><br>' + warnings.join('<br>');
        }

        errorMessage += '<br><br><strong>Hint:</strong> Check your syntax carefully, ensure all variables are declared, and include the required console.log() statements.';
        
        showFeedback('error', `âŒ ${allErrors.length} Issues Found`, errorMessage);
        updateProgressStep(2);
        
        // Prevent lesson completion
        const nextBtn = document.getElementById('next-lesson');
        if (nextBtn) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.5';
            nextBtn.style.animation = 'none';
        }
    }
}

function showFeedback(type, title, message) {
    const feedback = document.getElementById('feedback');
    if (!feedback) return;
    
    feedback.className = `feedback ${type}`;
    feedback.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 15px;">
            <div style="flex: 1;">
                <div style="font-size: 1.1em; margin-bottom: 8px;">
                    <strong>${title}</strong>
                </div>
                <div style="line-height: 1.5;">
                    ${message}
                </div>
            </div>
        </div>
    `;

}


function updateProgressStep(step) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((s, index) => {
        if (index < step) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
}

function enableNextLesson() {
    const nextBtn = document.getElementById('next-lesson');
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
        nextBtn.style.animation = 'pulse 1.5s infinite';
        lessonCompleted = true;
    }
}

function nextLesson() {
    const nextBtn = document.getElementById('next-lesson');
    if (nextBtn && !nextBtn.disabled) {
        window.location.href = '/2. partB/lesson11_remake.html';
    }
}

function createCelebration() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -15px;
            z-index: 10000;
            pointer-events: none;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confetti-fall ${2 + Math.random() * 4}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 6000);
    }
}


// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize with a slight delay to ensure DOM is fully ready
    setTimeout(() => {
        try {
            // Initialize playground and task editor
            setupPlayground();
            initHybridSystem();
            
            // Verify cursor tracking elements exist
            const playgroundLine = document.getElementById('playground-current-line');
            const playgroundCol = document.getElementById('playground-current-col');
            const taskLine = document.getElementById('task-current-line');
            const taskCol = document.getElementById('task-current-col');
            
            // Force initial update
            const playgroundCode = document.getElementById('playground-code');
            const taskEditor = document.getElementById('task-editor');
            
            if (playgroundCode) {
                updateCursorPosition(playgroundCode);
            }
            if (taskEditor) {
                updateCursorPosition(taskEditor);
            }
            
        } catch (e) {
            // Silent error handling
        }
    }, 100);
    
    const taskEditor = document.getElementById('task-editor');
    if (taskEditor) {
        taskEditor.addEventListener('input', updateTaskPreview);
        updateTaskPreview();
    }

    setupDemoTabs();
});

// Setup demo tabs
function setupDemoTabs() {
    const demoTabs = document.querySelector('.demo-tabs');
    if (demoTabs) {
        demoTabs.addEventListener('click', function(e) {
            if (e.target.classList.contains('demo-tab')) {
                const demoType = e.target.getAttribute('data-demo');
                if (demoType) {
                    showDemo(demoType, e.target);
                }
            }
        });
    }
}

// Use consistent localStorage key
const LESSON_STORAGE_KEY = 'partB_lesson10_remake_complete';

/**
 * Check if lesson was previously completed and restore UI state
 * This runs when the page loads to handle returning users
 */
function checkAndRestoreCompletion() {
    // Wait a bit to ensure DOM is ready
    setTimeout(() => {
        try {
            const isCompleted = localStorage.getItem(LESSON_STORAGE_KEY) === 'true';
            
            if (isCompleted) {
                const feedback = document.getElementById('feedback');
                const nextBtn = document.getElementById('next-lesson'); // Fixed ID
                const steps = document.querySelectorAll('.step');
                
                if (feedback && nextBtn && steps.length > 0) {
                    // Show completion message
                    feedback.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <span style="font-size: 1.5em;">âœ…</span>
                            <div>
                                <div style="font-size: 1.1em; margin-bottom: 4px;">
                                    <strong>Lesson Already Completed!</strong>
                                </div>
                                <div style="opacity: 0.8;">
                                    You can continue to the next lesson or practice more here.
                                </div>
                            </div>
                        </div>
                    `;
                    feedback.className = 'feedback success';
                    
                    // Enable next lesson button
                    nextBtn.disabled = false;
                    nextBtn.style.opacity = '1';
                    nextBtn.style.cursor = 'pointer';
                    nextBtn.style.animation = 'pulse 1.5s infinite';
                    
                    // Update progress tracker
                    updateProgressStep(3);
                }
            }
        } catch (e) {
            // Silent error handling
        }
    }, 100); // Wait 100ms for DOM to be ready
}

// Update the initialization code
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Check if lesson is already completed with consistent key
        if (typeof Storage !== 'undefined' && localStorage.getItem(LESSON_STORAGE_KEY) === 'true') {
            const nextBtn = document.getElementById('next-lesson'); // Fixed ID
            if (nextBtn) {
                nextBtn.disabled = false;
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
                nextBtn.style.animation = 'pulse 1.5s infinite';
                lessonCompleted = true;
            }
        }
    } catch (e) {
        // Silent error handling
    }
});

// Multiple ways to ensure this runs after everything is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndRestoreCompletion);
} else {
    checkAndRestoreCompletion();
}

// Also run after a small delay as backup
setTimeout(checkAndRestoreCompletion, 500);