// Initialize demos
const demoCode = document.getElementById('demo-code');
const demoPreview = document.getElementById('demo-preview');

function updateDemo() {
  demoPreview.srcdoc = `<!DOCTYPE html>
<html>
<head>
<style>
body { 
    font-family: 'Nunito', sans-serif; 
    margin: 20px; 
    line-height: 1.6;
    background: #f9f9f9;
}
h2 { 
    color: #007BFF; 
    border-bottom: 3px solid #007BFF; 
    padding-bottom: 8px;
    margin-bottom: 16px;
}

/* Unordered list styling */
ul:not(nav ul) { 
    background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
    border: 2px solid #ffc107;
    border-radius: 10px;
    padding: 20px 20px 20px 40px;
    margin: 16px 0;
    position: relative;
}

ul:not(nav ul)::before {
    content: "📋 Unordered List";
    position: absolute;
    top: -10px;
    left: 15px;
    background: #ffc107;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;
}

/* Ordered list styling */
ol { 
    background: linear-gradient(135deg, #d5f4e6 0%, #a8e6cf 100%);
    border: 2px solid #27ae60;
    border-radius: 10px;
    padding: 20px 20px 20px 40px;
    margin: 16px 0;
    position: relative;
}

ol::before {
    content: "🔢 Ordered List";
    position: absolute;
    top: -10px;
    left: 15px;
    background: #27ae60;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;
}

/* List items */
li:not(nav li) {
    margin: 8px 0;
    padding: 4px 0;
    font-weight: 500;
}

/* Navigation styling */
nav { 
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border: 3px solid #007BFF;
    border-radius: 12px;
    padding: 20px;
    margin: 20px 0;
    position: relative;
}

nav::before {
    content: "🧭 Navigation Menu";
    position: absolute;
    top: -10px;
    left: 15px;
    background: #007BFF;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;
}

nav ul { 
    background: rgba(255,255,255,0.8);
    border: 2px dashed #007BFF;
    list-style: none;
    padding: 15px;
    margin: 0;
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    border-radius: 8px;
}

nav li { 
    background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%);
    color: white;
    padding: 10px 15px;
    border-radius: 20px;
    margin: 0;
    box-shadow: 0 4px 8px rgba(0,123,255,0.3);
    transition: all 0.3s ease;
}

nav li:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,123,255,0.4);
}

nav a { 
    color: white;
    text-decoration: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 5px;
}

nav a:hover { 
    text-decoration: none;
}
</style>
</head>
<body>
<h2>🍕 My Favorite Foods</h2>
<ul>
<li>Pizza</li>
<li>Pasta</li>
<li>Ice Cream</li>
</ul>

<h2>☕ How to Make Coffee</h2>
<ol>
<li>Boil water</li>
<li>Add coffee grounds</li>
<li>Pour and enjoy!</li>
</ol>

<nav>
<ul>
    <li><a href="javascript:void(0);">🏠 Home</a></li>
    <li><a href="javascript:void(0);">🍽️ Menu</a></li>
    <li><a href="javascript:void(0);">📞 Contact</a></li>
</ul>
</nav>
</body>
</html>`;
}

// Task functionality
const taskEditor = document.getElementById('task-code');
const taskPreview = document.getElementById('task-preview');

function renderTask() {
  const code = taskEditor.value;
  taskPreview.srcdoc = `<!DOCTYPE html>
<html>
<head>
<style>
body { 
    font-family: 'Nunito', sans-serif; 
    margin: 20px; 
    line-height: 1.6;
    background: #f9f9f9;
}

/* Navigation styling */
nav { 
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border: 3px solid #007BFF;
    border-radius: 12px;
    padding: 20px;
    margin: 20px 0;
    position: relative;
}

nav::before {
    content: "🧭 Your Navigation";
    position: absolute;
    top: -10px;
    left: 15px;
    background: #007BFF;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;
}

nav ul { 
    background: rgba(255,255,255,0.8);
    border: 2px dashed #007BFF;
    list-style: none;
    padding: 15px;
    margin: 0;
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    border-radius: 8px;
}

nav li { 
    background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%);
    color: white;
    padding: 10px 15px;
    border-radius: 20px;
    margin: 0;
    box-shadow: 0 4px 8px rgba(0,123,255,0.3);
    transition: all 0.3s ease;
}

nav li:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,123,255,0.4);
}

nav a { 
    color: white;
    text-decoration: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 5px;
}

nav a:hover { 
    text-decoration: none;
}

/* If no nav structure, style basic elements */
ul:not(nav ul) { 
    background: #f8f9ff;
    border: 2px solid #dde7ff;
    border-radius: 8px;
    padding: 15px 15px 15px 35px;
    margin: 16px 0;
}

li:not(nav li) {
    margin: 6px 0;
    padding: 3px 0;
}

a:not(nav a) {
    color: #007BFF;
    text-decoration: underline;
}

/* Empty state */
body:empty::before {
    content: "✏️ Start typing your HTML code in the editor...";
    color: #999;
    font-style: italic;
    display: block;
    text-align: center;
    padding: 40px 20px;
}
</style>
</head>
<body>
${code || ''}
</body>
</html>`;
}

// Replace the section after "taskEditor.addEventListener('input', renderTask);"
// and before "// Helper function to check for unclosed tags"
// with this enhanced version:

taskEditor.addEventListener('input', renderTask);
renderTask();

// ===========================
// ENHANCED CODE EDITOR FUNCTIONALITY
// ===========================

// Enhanced code editor functionality for better user experience
document.addEventListener('DOMContentLoaded', function() {
  const textarea = document.getElementById('task-code');
  const lineNumbers = document.getElementById('line-numbers');
  const currentLineSpan = document.getElementById('current-line');
  const currentColSpan = document.getElementById('current-col');

  // Only proceed if elements exist (some pages might not have line numbers)
  if (textarea) {
    function updateLineNumbers() {
      if (lineNumbers) {
        const lines = textarea.value.split('\n');
        const lineNumbersText = lines.map((_, index) => index + 1).join('\n');
        lineNumbers.textContent = lineNumbersText;
      }
    }

    function updateCursorPosition() {
      if (currentLineSpan && currentColSpan) {
        const cursorPosition = textarea.selectionStart;
        const textBeforeCursor = textarea.value.substring(0, cursorPosition);
        const lines = textBeforeCursor.split('\n');

        currentLineSpan.textContent = lines.length;
        currentColSpan.textContent = lines[lines.length - 1].length + 1;
      }
    }

    // Handle Tab key in textarea to insert tabs instead of changing focus
    textarea.addEventListener('keydown', function(e) {
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault(); // Prevent default tab behavior (focus change)

        // Get cursor position
        const start = this.selectionStart;
        const end = this.selectionEnd;

        // Insert tab character (using 2 spaces for smaller indentation)
        const tabChar = '  '; // Using 2 spaces for navigation HTML

        // Replace selected text with tab character
        this.value = this.value.substring(0, start) + tabChar + this.value.substring(end);

        // Move cursor to after the inserted tab
        this.selectionStart = this.selectionEnd = start + tabChar.length;

        // Update line numbers and preview
        updateLineNumbers();
        updateCursorPosition();
        renderTask(); // Update the preview
      }

      // Handle Shift+Tab for outdent (remove indentation)
      if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();

        const start = this.selectionStart;
        const end = this.selectionEnd;

        // Get the line start position
        const beforeCursor = this.value.substring(0, start);
        const lineStart = beforeCursor.lastIndexOf('\n') + 1;

        // Check if there's spaces at the beginning of the line
        const lineContent = this.value.substring(lineStart);

        if (lineContent.startsWith('  ')) {
          // Remove 2 spaces
          this.value = this.value.substring(0, lineStart) +
            this.value.substring(lineStart + 2);
          this.selectionStart = this.selectionEnd = Math.max(lineStart, start - 2);

          updateLineNumbers();
          updateCursorPosition();
          renderTask();
        } else if (lineContent.startsWith('\t')) {
          // Remove one tab character (if any exist)
          this.value = this.value.substring(0, lineStart) +
            this.value.substring(lineStart + 1);
          this.selectionStart = this.selectionEnd = Math.max(lineStart, start - 1);

          updateLineNumbers();
          updateCursorPosition();
          renderTask();
        }
      }
    });

    // Auto-indent on Enter key
    textarea.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const start = this.selectionStart;
        const beforeCursor = this.value.substring(0, start);

        // Find the current line
        const currentLineStart = beforeCursor.lastIndexOf('\n') + 1;
        const currentLine = this.value.substring(currentLineStart, start);

        // Count leading whitespace (tabs and spaces)
        const leadingWhitespace = currentLine.match(/^[\t ]*/)[0];

        // Auto-indent: add the same indentation to the new line
        if (leadingWhitespace.length > 0) {
          e.preventDefault();

          const newLineWithIndent = '\n' + leadingWhitespace;
          this.value = this.value.substring(0, start) +
            newLineWithIndent +
            this.value.substring(this.selectionEnd);

          // Move cursor to end of inserted text
          this.selectionStart = this.selectionEnd = start + newLineWithIndent.length;

          updateLineNumbers();
          updateCursorPosition();
          renderTask();
        }
      }
    });

    // Update line numbers and cursor position on input
    textarea.addEventListener('input', function() {
      updateLineNumbers();
      updateCursorPosition();
    });

    textarea.addEventListener('click', updateCursorPosition);
    textarea.addEventListener('keyup', updateCursorPosition);
    textarea.addEventListener('focus', updateCursorPosition);

    // Sync scroll between textarea and line numbers
    if (lineNumbers) {
      textarea.addEventListener('scroll', function() {
        lineNumbers.scrollTop = textarea.scrollTop;
      });
    }

    // Initialize
    updateLineNumbers();
    updateCursorPosition();
  }
});

// Helper function to check for unclosed tags
function checkClosingTags(code) {
  const closingTagErrors = [];

  // Define required tags and their patterns
  const tagChecks = [{
      name: 'nav',
      openPattern: /<nav[^>]*>/gi,
      closePattern: /<\/nav>/gi,
      displayName: '&lt;nav&gt;'
    },
    {
      name: 'ul',
      openPattern: /<ul[^>]*>/gi,
      closePattern: /<\/ul>/gi,
      displayName: '&lt;ul&gt;'
    },
    {
      name: 'li',
      openPattern: /<li[^>]*>/gi,
      closePattern: /<\/li>/gi,
      displayName: '&lt;li&gt;'
    },
    {
      name: 'a',
      openPattern: /<a[^>]*>/gi,
      closePattern: /<\/a>/gi,
      displayName: '&lt;a&gt;'
    }
  ];

  tagChecks.forEach(tag => {
    const openTags = (code.match(tag.openPattern) || []).length;
    const closeTags = (code.match(tag.closePattern) || []).length;

    if (openTags > 0 && closeTags === 0) {
      closingTagErrors.push(`Missing closing tag ${tag.displayName.replace('<', '&lt;/').replace('>', '&gt;')} - you opened ${openTags} ${tag.displayName} tag${openTags > 1 ? 's' : ''} but didn't close any`);
    } else if (openTags > closeTags) {
      const missing = openTags - closeTags;
      closingTagErrors.push(`Missing ${missing} closing ${tag.displayName.replace('<', '&lt;/').replace('>', '&gt;')} tag${missing > 1 ? 's' : ''}`);
    } else if (closeTags > openTags && openTags > 0) {
      const extra = closeTags - openTags;
      closingTagErrors.push(`Too many closing ${tag.displayName.replace('<', '&lt;/').replace('>', '&gt;')} tags - found ${extra} extra`);
    }
  });

  return closingTagErrors;
}

// Interactive functions
function highlightListType(element, type) {
  // Remove previous highlights
  document.querySelectorAll('.list-type-card').forEach(el => {
    el.style.background = '#f8f9ff';
    el.style.borderColor = 'var(--border)';
  });

  // Highlight clicked example
  element.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
  element.style.borderColor = 'var(--brand)';

  // Add sparkle effect
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '✨';
  sparkle.style.position = 'absolute';
  sparkle.style.top = '10px';
  sparkle.style.right = '10px';
  sparkle.style.animation = 'sparkle 1s ease-out';
  element.style.position = 'relative';
  element.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 1000);
}

function showNavInfo(concept) {
  const info = {
    semantic: "🎯 Semantic HTML: The  &lt;nav&gt; element tells browsers and assistive technologies that this section contains navigation links. It's like a signpost that says 'these are the important links to move around the site!'",
    accessibility: "♿ Accessibility: Screen readers can jump directly to navigation sections, making it easier for users with disabilities to navigate your site. The &lt;nav&gt; element creates landmarks that assistive technology can recognize.",
    structure: "🏗️ Clean Structure: The nav → ul → li → a pattern creates a logical hierarchy. The &lt;nav&gt; provides meaning, &lt;ul&gt; groups the links, &lt;li&gt; contains each item, and &lt;a&gt; provides the actual links."
  };

  // Create a temporary info popup
  const popup = document.createElement('div');
  popup.className = 'info-popup';
  popup.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 12px 32px rgba(0,0,0,0.2);
            border: 2px solid var(--brand);
            max-width: 450px;
            z-index: 10000;
            animation: popIn 0.3s ease-out;
        ">
            <div style="font-size: 1.1em; margin-bottom: 15px; line-height: 1.5;">
                ${info[concept]}
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: var(--brand);
                display: block;
                margin: 0 auto;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                Got it! ✅
            </button>
        </div>
    `;

  document.body.appendChild(popup);

  // Auto close after 8 seconds
  setTimeout(() => {
    if (popup.parentElement) popup.remove();
  }, 8000);
}

function showHint() {
  const hints = [
    "💡 Start with &lt;nav&gt; to wrap your entire navigation!",
    "🎯 Inside &lt;nav&gt;, add a &lt;ul&gt; to create your list structure",
    "📝 Add exactly 3 &lt;li&gt; elements inside the &lt;ul&gt;",
    "🔗 Put an &lt;a&gt; tag inside each &lt;li&gt; for your links",
    "✨ Try adding emojis to make your links more fun!",
    "🚨 Don't forget closing tags! Every &lt;nav&gt; needs &lt;/nav&gt;, every &lt;ul&gt; needs &lt;/ul&gt;, etc."
  ];

  const randomHint = hints[Math.floor(Math.random() * hints.length)];

  // Create animated hint popup
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
    hintPopup.firstElementChild.style.animation = 'slideOutRight 0.5s ease-out';
    setTimeout(() => hintPopup.remove(), 500);
  }, 6000);
}

function checkAnswer() {
  const code = taskEditor.value.trim();
  const codeLower = code.toLowerCase();

  // Check if code is empty
  if (!code || code.replace(/\s/g, '') === '') {
    showError('🤨', 'Your navigation is empty!', 'Please create a navigation menu with &lt;nav&gt;, &lt;ul&gt;, and &lt;li&gt; elements.');
    return;
  }

  // Check for HTML tags
  const hasAnyHTMLTags = /<[^>]+>/.test(code);
  if (!hasAnyHTMLTags) {
    showError('😕', 'No HTML tags found!', 'Navigation requires HTML tags like &lt;nav&gt;, &lt;ul&gt;, and &lt;li&gt;. Try adding some structure to your code.');
    return;
  }

  // **NEW: Check for closing tag issues FIRST**
  const closingTagErrors = checkClosingTags(code);
  if (closingTagErrors.length > 0) {
    const feedback = document.getElementById('feedback');
    const steps = document.querySelectorAll('.step');

    feedback.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <span style="font-size: 1.8em;">🚨</span>
                <div style="flex: 1;">
                    <div style="font-size: 1.2em; margin-bottom: 10px;">
                        <strong>Missing Closing Tags!</strong>
                    </div>
                    <div style="margin-bottom: 12px;">
                        HTML tags must be properly closed. Here's what needs fixing:
                    </div>
                    <div style="margin-bottom: 12px;">
                        ${closingTagErrors.map(error => `
                            <div style="margin: 8px 0; padding: 10px 12px; border-left: 4px solid #e74c3c; background: rgba(231,76,60,0.1); border-radius: 4px; font-family: monospace; font-size: 0.9em;">
                                ❌ ${error}
                            </div>
                        `).join('')}
                    </div>
                    <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 12px; font-size: 0.95em;">
                        <strong>💡 Remember:</strong> Every opening tag needs a closing tag!<br>
                        <code>&lt;nav&gt;</code> → <code>&lt;/nav&gt;</code><br>
                        <code>&lt;ul&gt;</code> → <code>&lt;/ul&gt;</code><br>
                        <code>&lt;li&gt;</code> → <code>&lt;/li&gt;</code><br>
                        <code>&lt;a&gt;</code> → <code>&lt;/a&gt;</code>
                    </div>
                </div>
            </div>
        `;
    feedback.className = 'feedback error';

    // Reset progress
    steps[1].classList.remove('active');
    steps[2].classList.remove('active');
    return;
  }

  // Continue with existing validation logic...
  const hasNav = /<nav[^>]*>[\s\S]*?<\/nav>/i.test(code);
  const hasUl = /<ul[^>]*>[\s\S]*?<\/ul>/i.test(code);
  const hasLi = /<li[^>]*>[\s\S]*?<\/li>/i.test(code);

  // Count list items
  const liMatches = code.match(/<li[^>]*>[\s\S]*?<\/li>/gi) || [];
  const liCount = liMatches.length;

  // Check proper nesting
  const navContainsUl = /<nav[^>]*>[\s\S]*?<ul[^>]*>[\s\S]*?<\/ul>[\s\S]*?<\/nav>/i.test(code);
  const ulContainsLi = /<ul[^>]*>[\s\S]*?<li[^>]*>[\s\S]*?<\/li>[\s\S]*?<\/ul>/i.test(code);

  // Check for links in navigation
  const liWithLinks = (code.match(/<li[^>]*>[\s\S]*?<a[^>]*href[\s\S]*?<\/a>[\s\S]*?<\/li>/gi) || []).length;

  let errorMessages = [];
  let successMessages = [];
  let suggestions = [];

  // Check nav element
  if (!hasNav) {
    errorMessages.push('Missing &lt;nav&gt; element');
    suggestions.push('Start with &lt;nav&gt; to wrap your navigation menu');
  } else {
    successMessages.push('✅ Has &lt;nav&gt; element');
  }

  // Check ul element
  if (!hasUl) {
    errorMessages.push('Missing &lt;ul&gt; element');
    suggestions.push('Add &lt;ul&gt; inside your &lt;nav&gt; element');
  } else {
    successMessages.push('✅ Has &lt;ul&gt; element');
  }

  // Check li elements
  if (!hasLi) {
    errorMessages.push('Missing &lt;li&gt; elements');
    suggestions.push('Add &lt;li&gt; elements inside your &lt;ul&gt;');
  } else if (liCount !== 3) {
    errorMessages.push(`Need exactly 3 &lt;li&gt; elements, found ${liCount}`);
    if (liCount < 3) {
      suggestions.push(`Add ${3 - liCount} more &lt;li&gt; element${3 - liCount > 1 ? 's' : ''}`);
    } else {
      suggestions.push(`Remove ${liCount - 3} &lt;li&gt; element${liCount - 3 > 1 ? 's' : ''} (keep only 3)`);
    }
  } else {
    successMessages.push('✅ Has exactly 3 &lt;li&gt; elements');
  }

  // Check proper nesting
  if (hasNav && hasUl && !navContainsUl) {
    errorMessages.push('&lt;ul&gt; must be inside &lt;nav&gt;');
    suggestions.push('Move your &lt;ul&gt; inside the &lt;nav&gt; tags');
  } else if (hasNav && hasUl && navContainsUl) {
    successMessages.push('✅ Correct &lt;nav&gt; and &lt;ul&gt; nesting');
  }

  if (hasUl && hasLi && !ulContainsLi) {
    errorMessages.push('&lt;li&gt; elements must be inside &lt;ul&gt;');
    suggestions.push('Move your &lt;li&gt; elements inside the &lt;ul&gt; tags');
  } else if (hasUl && hasLi && ulContainsLi) {
    successMessages.push('✅ Correct &lt;ul&gt; and &lt;li&gt; nesting');
  }

  // Bonus for links
  if (liCount === 3 && liWithLinks >= 1) {
    successMessages.push('✅ Great! You included navigation links');
  }

  // Display feedback
  const feedback = document.getElementById('feedback');
  const nextBtn = document.getElementById('nextLessonBtn');
  const steps = document.querySelectorAll('.step');

  if (errorMessages.length === 0 && liCount === 3) {
    feedback.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <span style="font-size: 2em;">🎉</span>
                <div style="flex: 1;">
                    <div style="font-size: 1.2em; margin-bottom: 8px;">
                        <strong>Perfect Navigation Menu!</strong>
                    </div>
                    <div style="margin-bottom: 12px;">
                        ${successMessages.join('<br>')}
                    </div>
                    <div style="opacity: 0.9; background: rgba(39,174,96,0.1); padding: 8px 12px; border-radius: 6px; font-size: 0.95em;">
                        🚀 You've mastered semantic navigation structure! Ready for more advanced HTML?
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

    // Update progress
    steps[1].classList.add('active');
    steps[2].classList.add('active');

    // Store completion in localStorage
    localStorage.setItem('partB_lesson4_remake_complete', 'true');
    markCurrentLessonComplete(); // Add this line

    // Trigger celebration animation
    createCelebration();

  } else {
    const mainSuggestion = suggestions.length > 0 ? suggestions[0] : 'Check your HTML structure carefully';

    feedback.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <span style="font-size: 1.8em;">🤔</span>
                <div style="flex: 1;">
                    <div style="font-size: 1.1em; margin-bottom: 10px;">
                        <strong>Let's fix your navigation:</strong>
                    </div>
                    ${errorMessages.length > 0 ? `
                        <div style="margin-bottom: 12px;">
                            <strong>Issues to fix:</strong>
                            <ul style="margin: 6px 0; padding-left: 20px; list-style-type: none;">
                                ${errorMessages.map(error => `<li style="margin: 4px 0; padding: 6px 8px; border-left: 3px solid #e74c3c; background: rgba(231,76,60,0.1); border-radius: 4px;">❌ ${error}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    ${successMessages.length > 0 ? `
                        <div style="margin-bottom: 12px;">
                            <strong>What's working well:</strong><br>
                            ${successMessages.join('<br>')}
                        </div>
                    ` : ''}
                    <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 10px; font-size: 0.95em;">
                        <strong>💡 Next step:</strong> ${mainSuggestion}
                    </div>
                </div>
            </div>
        `;
    feedback.className = 'feedback error';

    // Update progress to practice step
    steps[1].classList.add('active');
    steps[2].classList.remove('active');
  }
}

function showError(emoji, title, message) {
  const feedback = document.getElementById('feedback');
  const steps = document.querySelectorAll('.step');

  feedback.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 1.5em;">${emoji}</span>
            <div>
                <div style="font-size: 1.1em; margin-bottom: 4px;">
                    <strong>${title}</strong>
                </div>
                <div style="opacity: 0.9; line-height: 1.4;">
                    ${message}
                </div>
            </div>
        </div>
    `;
  feedback.className = 'feedback error';

  // Reset progress
  steps[1].classList.remove('active');
  steps[2].classList.remove('active');
}

function createCelebration() {
  // Create confetti effect
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];

  for (let i = 0; i < 60; i++) {
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

// Initialize demos
updateDemo();

// Next lesson functionality
document.getElementById('nextLessonBtn').addEventListener('click', function() {
  if (!this.disabled) {
    window.location.href = '/2. partB/lesson5_remake.html';
  }
});

// Add required animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes sparkle {
        0% { opacity: 1; transform: scale(1) rotate(0deg); }
        50% { opacity: 0.7; transform: scale(1.2) rotate(180deg); }
        100% { opacity: 0; transform: scale(0.8) rotate(360deg); }
    }
    
    @keyframes popIn {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes slideInRight {
        0% { opacity: 0; transform: translateX(100px); }
        100% { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slideOutRight {
        0% { opacity: 1; transform: translateX(0); }
        100% { opacity: 0; transform: translateX(100px); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes confetti-fall {
        0% {
            transform: translateY(-15px) rotateZ(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyles);

/**
 * Check if lesson was previously completed and restore UI state
 * This runs when the page loads to handle returning users
 */
function checkAndRestoreCompletion() {
  // Wait a bit to ensure DOM is ready
  setTimeout(() => {
    const isCompleted = localStorage.getItem('partB_lesson4_remake_complete') === 'true';

    console.log('Checking completion:', isCompleted); // Debug log

    if (isCompleted) {
      const feedback = document.getElementById('feedback');
      const nextBtn = document.getElementById('nextLessonBtn');
      const steps = document.querySelectorAll('.step');

      console.log('Elements found:', {
        feedback,
        nextBtn,
        steps: steps.length
      }); // Debug log

      if (feedback && nextBtn && steps.length > 0) {
        // Show completion message
        feedback.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 1.5em;">✅</span>
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

        // Update progress tracker
        if (steps[1]) steps[1].classList.add('active');
        if (steps[2]) steps[2].classList.add('active');

        console.log('UI restored for completed lesson'); // Debug log
      }
    }
  }, 100); // Wait 100ms for DOM to be ready
}

// Multiple ways to ensure this runs after everything is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkAndRestoreCompletion);
} else {
  checkAndRestoreCompletion();
}

// Also run after a small delay as backup
setTimeout(checkAndRestoreCompletion, 500);

/* Pass checked_1 */