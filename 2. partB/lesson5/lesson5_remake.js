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
    margin: 15px; 
    line-height: 1.6;
    background: #f9f9f9;
}

/* Header styling with visual indicator */
header {
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border: 3px solid #007BFF;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 15px;
    position: relative;
}

header::before {
    content: "🎯 Header Element";
    position: absolute;
    top: -12px;
    left: 15px;
    background: #007BFF;
    color: white;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

header h1 {
    margin: 0 0 15px 0;
    color: #0d47a1;
    font-size: 1.6rem;
    text-align: center;
}

/* Navigation styling */
nav {
    background: rgba(255,255,255,0.7);
    border-radius: 8px;
    padding: 10px;
}

nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
}

nav li {
    background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%);
    border-radius: 20px;
    padding: 8px 16px;
    box-shadow: 0 2px 4px rgba(0,123,255,0.3);
    transition: all 0.3s ease;
}

nav li:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.4);
}

nav a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
}

/* Main content layout */
main {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
}

/* Section styling */
section {
    flex: 2;
    background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
    border: 3px solid #ffc107;
    border-radius: 12px;
    padding: 20px;
    position: relative;
}

section::before {
    content: "📋 Section Element";
    position: absolute;
    top: -12px;
    left: 15px;
    background: #ffc107;
    color: #856404;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

section h2 {
    margin: 0 0 15px 0;
    color: #856404;
    font-size: 1.4rem;
}

/* Article styling */
article {
    background: linear-gradient(135deg, #d5f4e6 0%, #a8e6cf 100%);
    border: 2px solid #28a745;
    border-radius: 10px;
    padding: 18px;
    position: relative;
    margin-top: 12px;
}

article::before {
    content: "📄 Article Element";
    position: absolute;
    top: -10px;
    left: 12px;
    background: #28a745;
    color: white;
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

article h3 {
    margin: 0 0 10px 0;
    color: #155724;
    font-size: 1.2rem;
}

article p {
    margin: 0;
    color: #155724;
    line-height: 1.5;
}

/* Aside styling */
aside {
    flex: 1;
    background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
    border: 3px solid #dc3545;
    border-radius: 12px;
    padding: 18px;
    position: relative;
    min-height: fit-content;
}

aside::before {
    content: "📌 Aside Element";
    position: absolute;
    top: -12px;
    left: 15px;
    background: #dc3545;
    color: white;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

aside h3 {
    margin: 0 0 12px 0;
    color: #721c24;
    font-size: 1.1rem;
}

aside ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

aside li {
    background: #dc3545;
    color: white;
    padding: 6px 12px;
    margin: 6px 0;
    border-radius: 15px;
    font-size: 14px;
    text-align: center;
}

/* Footer styling */
footer {
    background: linear-gradient(135deg, #e2e3e5 0%, #d6d8db 100%);
    border: 3px solid #6c757d;
    border-radius: 12px;
    padding: 18px;
    text-align: center;
    position: relative;
}

footer::before {
    content: "🦶 Footer Element";
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: #6c757d;
    color: white;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

footer p {
    margin: 0;
    color: #495057;
    font-size: 14px;
    font-weight: 500;
}

/* Mobile responsive */
@media (max-width: 768px) {
    main {
        flex-direction: column;
    }
    
    aside {
        order: 2;
        margin-top: 15px;
    }
    
    section {
        order: 1;
    }
    
    nav ul {
        flex-direction: column;
        align-items: center;
    }
}
</style>
</head>
<body>
${demoCode.value}
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
    margin: 15px; 
    line-height: 1.6;
    background: #f9f9f9;
}

/* Header styling */
header {
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border: 3px solid #007BFF;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 15px;
    position: relative;
}

header::before {
    content: "🎯 Header Element";
    position: absolute;
    top: -12px;
    left: 15px;
    background: #007BFF;
    color: white;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: bold;
}

header h1 {
    margin: 0;
    color: #0d47a1;
    font-size: 1.5rem;
}

/* Main styling */
main {
    background: linear-gradient(135deg, #f0f4f8 0%, #e8f4f8 100%);
    border: 3px solid #17a2b8;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 15px;
    position: relative;
}

main::before {
    content: "🎯 Main Element";
    position: absolute;
    top: -12px;
    left: 15px;
    background: #17a2b8;
    color: white;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: bold;
}

/* Section styling */
section {
    background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
    border: 2px solid #ffc107;
    border-radius: 10px;
    padding: 18px;
    position: relative;
    margin-bottom: 15px;
}

section::before {
    content: "📋 Section Element";
    position: absolute;
    top: -10px;
    left: 12px;
    background: #ffc107;
    color: #856404;
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: bold;
}

/* Article styling */
article {
    background: linear-gradient(135deg, #d5f4e6 0%, #a8e6cf 100%);
    border: 2px solid #28a745;
    border-radius: 8px;
    padding: 16px;
    position: relative;
}

article::before {
    content: "📄 Article Element";
    position: absolute;
    top: -8px;
    left: 10px;
    background: #28a745;
    color: white;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 10px;
    font-weight: bold;
}

/* Footer styling */
footer {
    background: linear-gradient(135deg, #e2e3e5 0%, #d6d8db 100%);
    border: 3px solid #6c757d;
    border-radius: 12px;
    padding: 18px;
    text-align: center;
    position: relative;
}

footer::before {
    content: "🦶 Footer Element";
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: #6c757d;
    color: white;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: bold;
}

/* Generic styling for non-semantic elements */
h1, h2, h3 { 
    color: var(--text, #333); 
    margin-bottom: 10px; 
}

p { 
    margin-bottom: 8px; 
}

/* Empty state */
body:empty::before {
    content: "✏️ Start building your semantic structure...";
    color: #999;
    font-style: italic;
    display: block;
    text-align: center;
    padding: 40px 20px;
    background: #f8f9ff;
    border: 2px dashed #dde7ff;
    border-radius: 10px;
    margin: 20px;
}
</style>
</head>
<body>
${code || ''}
</body>
</html>`;
}

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

// Interactive functions
function highlightElement(element, type) {
  // Remove previous highlights
  document.querySelectorAll('.semantic-card').forEach(el => {
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

function highlightTreeNode(node) {
  node.style.background = 'rgba(0,123,255,0.2)';
  node.style.color = 'var(--brand)';
  node.style.fontWeight = '600';
  node.style.transform = 'scale(1.02)';
}

function resetTreeNode(node) {
  node.style.background = '';
  node.style.color = '';
  node.style.fontWeight = '';
  node.style.transform = '';
}

function showBenefitInfo(element, benefit) {
  const info = {
    accessibility: "♿ Accessibility: Screen readers can jump between sections, understand content hierarchy, and provide navigation shortcuts. Users with disabilities can navigate your content more effectively when it has proper semantic structure.",
    seo: "🔍 SEO Benefits: Search engines use semantic elements to better understand your content structure and context. This can improve your search rankings and help your content appear in rich snippets and featured results.",
    maintenance: "👥 Team Collaboration: When other developers (or future you) work with your code, semantic HTML immediately communicates the purpose and structure. No guessing what each section does!",
    future: "🔮 Future-Proof: New browsers, assistive technologies, and web standards build upon semantic HTML. Your content will adapt to future innovations without major restructuring."
  };

  // Highlight the clicked benefit
  document.querySelectorAll('.benefit-card').forEach(el => {
    el.style.background = 'linear-gradient(135deg, #f2f6ff 0%, #e3f2fd 100%)';
  });
  element.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';

  // Create info popup
  const popup = document.createElement('div');
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
            max-width: 500px;
            z-index: 10000;
            animation: popIn 0.3s ease-out;
        ">
            <div style="font-size: 1.1em; margin-bottom: 15px; line-height: 1.5;">
                ${info[benefit]}
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: var(--brand);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
                display: block;
                margin: 0 auto;
            ">
                Got it! ✅
            </button>
        </div>
    `;

  document.body.appendChild(popup);
  setTimeout(() => {
    if (popup.parentElement) popup.remove();
  }, 10000);
}

function showHint() {
  const hints = [
    "🗂️ Start with the basic structure: &lt;header&gt;, &lt;main&gt;, &lt;footer&gt;",
    "🎯 Inside &lt;main&gt;, add a &lt;section&gt; to group your content",
    "📄 Inside &lt;section&gt;, add an &lt;article&gt; for the blog post",
    "🎯 Don't forget headings! Use &lt;h1&gt; in header, &lt;h2&gt; in section, &lt;h3&gt; in article",
    "✨ Add real content like 'My Blog', 'Latest Posts', 'My First Article'",
    "🔗 Remember to close all your tags properly!"
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
            max-width: 350px;
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

// Helper function to check for unclosed tags
function checkClosingTags(code) {
  const closingTagErrors = [];

  const tagChecks = [{
      name: 'header',
      openPattern: /<header[^>]*>/gi,
      closePattern: /<\/header>/gi,
      displayName: '&lt;header&gt;'
    },
    {
      name: 'main',
      openPattern: /<main[^>]*>/gi,
      closePattern: /<\/main>/gi,
      displayName: '&lt;main&gt;'
    },
    {
      name: 'section',
      openPattern: /<section[^>]*>/gi,
      closePattern: /<\/section>/gi,
      displayName: '&lt;section&gt;'
    },
    {
      name: 'article',
      openPattern: /<article[^>]*>/gi,
      closePattern: /<\/article>/gi,
      displayName: '&lt;article&gt;'
    },
    {
      name: 'footer',
      openPattern: /<footer[^>]*>/gi,
      closePattern: /<\/footer>/gi,
      displayName: '&lt;footer&gt;'
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

function checkAnswer() {
  const code = taskEditor.value.trim();

  // Check if code is empty
  if (!code || code.replace(/\s/g, '') === '') {
    showError('🤨', 'Your structure is empty!', 'Please create a semantic blog structure with header, main, section, article, and footer elements.');
    return;
  }

  // Check for basic HTML tags
  const hasAnyHTMLTags = /<[^>]+>/.test(code);
  if (!hasAnyHTMLTags) {
    showError('😕', 'No HTML tags found!', 'Semantic structure requires HTML tags. Try adding elements like &lt;header&gt;, &lt;main&gt;, etc.');
    return;
  }

  // Check for closing tag issues FIRST
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
                        <code>&lt;header&gt;</code> → <code>&lt;/header&gt;</code><br>
                        <code>&lt;main&gt;</code> → <code>&lt;/main&gt;</code><br>
                        <code>&lt;section&gt;</code> → <code>&lt;/section&gt;</code><br>
                        <code>&lt;article&gt;</code> → <code>&lt;/article&gt;</code><br>
                        <code>&lt;footer&gt;</code> → <code>&lt;/footer&gt;</code>
                    </div>
                </div>
            </div>
        `;
    feedback.className = 'feedback error';

    // Reset progress
    const progressSteps = document.querySelectorAll('.step');
    progressSteps[1].classList.remove('active');
    progressSteps[2].classList.remove('active');
    return;
  }

  // Check for required semantic elements
  const hasHeader = /<header[^>]*>[\s\S]*?<\/header>/i.test(code);
  const hasMain = /<main[^>]*>[\s\S]*?<\/main>/i.test(code);
  const hasSection = /<section[^>]*>[\s\S]*?<\/section>/i.test(code);
  const hasArticle = /<article[^>]*>[\s\S]*?<\/article>/i.test(code);
  const hasFooter = /<footer[^>]*>[\s\S]*?<\/footer>/i.test(code);

  // Check proper nesting
  const mainContainsSection = /<main[^>]*>[\s\S]*?<section[^>]*>[\s\S]*?<\/section>[\s\S]*?<\/main>/i.test(code);
  const sectionContainsArticle = /<section[^>]*>[\s\S]*?<article[^>]*>[\s\S]*?<\/article>[\s\S]*?<\/section>/i.test(code);

  // Check for content inside elements (headings or meaningful text)
  const headerHasContent = /<header[^>]*>[\s\S]*?<[hH][1-6][^>]*>[\s\S]*?<\/[hH][1-6]>[\s\S]*?<\/header>/i.test(code) ||
    /<header[^>]*>[^<]*\w+[^<]*<\/header>/i.test(code);

  const articleHasContent = /<article[^>]*>[\s\S]*?<[hH][1-6][^>]*>[\s\S]*?<\/[hH][1-6]>[\s\S]*?<\/article>/i.test(code) ||
    /<article[^>]*>[^<]*\w+[^<]*<\/article>/i.test(code);

  const footerHasContent = /<footer[^>]*>[^<]*\w+[^<]*<\/footer>/i.test(code);

  let errorMessages = [];
  let successMessages = [];
  let suggestions = [];

  // Check header element
  if (!hasHeader) {
    errorMessages.push('Missing &lt;header&gt; element');
    suggestions.push('Add a &lt;header&gt; element at the top of your page');
  } else {
    successMessages.push('✅ Has &lt;header&gt; element');
    if (!headerHasContent) {
      suggestions.push('Add a heading (like &lt;h1&gt;) or some content inside your header');
    }
  }

  // Check main element
  if (!hasMain) {
    errorMessages.push('Missing &lt;main&gt; element');
    suggestions.push('Add a &lt;main&gt; element to contain your primary content');
  } else {
    successMessages.push('✅ Has &lt;main&gt; element');
  }

  // Check section element
  if (!hasSection) {
    errorMessages.push('Missing &lt;section&gt; element');
    suggestions.push('Add a &lt;section&gt; element inside your &lt;main&gt;');
  } else {
    successMessages.push('✅ Has &lt;section&gt; element');
  }

  // Check article element
  if (!hasArticle) {
    errorMessages.push('Missing &lt;article&gt; element');
    suggestions.push('Add an &lt;article&gt; element inside your &lt;section&gt;');
  } else {
    successMessages.push('✅ Has &lt;article&gt; element');
    if (!articleHasContent) {
      suggestions.push('Add a heading and some content inside your article');
    }
  }

  // Check footer element
  if (!hasFooter) {
    errorMessages.push('Missing &lt;footer&gt; element');
    suggestions.push('Add a &lt;footer&gt; element at the bottom of your page');
  } else {
    successMessages.push('✅ Has &lt;footer&gt; element');
    if (!footerHasContent) {
      suggestions.push('Add some content to your footer (like copyright text)');
    }
  }

  // Check proper nesting
  if (hasMain && hasSection && !mainContainsSection) {
    errorMessages.push('&lt;section&gt; must be inside &lt;main&gt;');
    suggestions.push('Move your &lt;section&gt; inside the &lt;main&gt; element');
  } else if (hasMain && hasSection && mainContainsSection) {
    successMessages.push('✅ Correct &lt;main&gt; and &lt;section&gt; nesting');
  }

  if (hasSection && hasArticle && !sectionContainsArticle) {
    errorMessages.push('&lt;article&gt; must be inside &lt;section&gt;');
    suggestions.push('Move your &lt;article&gt; inside the &lt;section&gt; element');
  } else if (hasSection && hasArticle && sectionContainsArticle) {
    successMessages.push('✅ Correct &lt;section&gt; and &lt;article&gt; nesting');
  }

  // Display feedback
  const feedback = document.getElementById('feedback');
  const nextBtn = document.getElementById('nextLessonBtn');
  const stepsElements = document.querySelectorAll('.step');

  // Perfect score check
  const requiredElements = [hasHeader, hasMain, hasSection, hasArticle, hasFooter];
  const requiredNesting = [mainContainsSection, sectionContainsArticle];
  const allElementsPresent = requiredElements.every(el => el);
  const properNesting = !hasMain || !hasSection || mainContainsSection;
  const properArticleNesting = !hasSection || !hasArticle || sectionContainsArticle;

  if (allElementsPresent && properNesting && properArticleNesting && errorMessages.length === 0) {
    feedback.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <span style="font-size: 2em;">🎉</span>
                <div style="flex: 1;">
                    <div style="font-size: 1.2em; margin-bottom: 8px;">
                        <strong>Perfect Semantic Structure!</strong>
                    </div>
                    <div style="margin-bottom: 12px;">
                        ${successMessages.join('<br>')}
                    </div>
                    <div style="opacity: 0.9; background: rgba(39,174,96,0.1); padding: 8px 12px; border-radius: 6px; font-size: 0.95em;">
                        🚀 Excellent! You've created a proper semantic blog structure that's accessible, SEO-friendly, and maintainable!
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
    stepsElements[1].classList.add('active');
    stepsElements[2].classList.add('active');

    // Store completion in localStorage
    localStorage.setItem('partB_lesson5_remake_complete', 'true');
    markCurrentLessonComplete();

    // Trigger celebration animation
    createCelebration();

  } else {
    const mainSuggestion = suggestions.length > 0 ? suggestions[0] : 'Check your HTML structure carefully';

    feedback.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <span style="font-size: 1.8em;">🤔</span>
                <div style="flex: 1;">
                    <div style="font-size: 1.1em; margin-bottom: 10px;">
                        <strong>Let's improve your semantic structure:</strong>
                    </div>
                    ${errorMessages.length > 0 ? `
                        <div style="margin-bottom: 12px;">
                            <strong>Elements to add:</strong>
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
    stepsElements[1].classList.add('active');
    stepsElements[2].classList.remove('active');
  }
}

function showError(emoji, title, message) {
  const feedback = document.getElementById('feedback');
  const stepElements = document.querySelectorAll('.step');

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
  stepElements[1].classList.remove('active');
  stepElements[2].classList.remove('active');
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

// Initialize demos and task preview
updateDemo();
renderTask();

// Next lesson functionality
document.getElementById('nextLessonBtn').addEventListener('click', function() {
  if (!this.disabled) {
    alert('🎉 Congratulations! You\'ve completed Lesson 5 - Semantic HTML!\n\nYou\'ve learned how to create meaningful document structures that are accessible, SEO-friendly, and maintainable. Great job!');

    window.location.href = '/2. partB/lesson6/lesson6_remake.html';
  }
});

/**
 * Check if lesson was previously completed and restore UI state
 * This runs when the page loads to handle returning users
 */
function checkAndRestoreCompletion() {
  // Wait a bit to ensure DOM is ready
  setTimeout(() => {
    const isCompleted = localStorage.getItem('partB_lesson5_remake_complete') === 'true';

    if (isCompleted) {
      const feedback = document.getElementById('feedback');
      const nextBtn = document.getElementById('nextLessonBtn');
      const steps = document.querySelectorAll('.step');

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