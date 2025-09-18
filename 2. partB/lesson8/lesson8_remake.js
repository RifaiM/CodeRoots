// ============================================================================
// HYBRID APPROACH - Tab Support + Browser Native Undo
// ============================================================================

function addTabSupportWithNativeUndo(textarea) {
  // Configuration
  const INDENT_SIZE = 1; // 1 space per tab
  const INDENT_CHAR = ' '.repeat(INDENT_SIZE);
  
  textarea.addEventListener('keydown', function(e) {
      // Handle Tab key ONLY - let browser handle all other keys including Ctrl+Z
      if (e.key === 'Tab') {
          e.preventDefault();
          
          const start = this.selectionStart;
          const end = this.selectionEnd;
          const value = this.value;
          
          // Use execCommand to preserve native undo history
          if (document.execCommand) {
              if (e.shiftKey) {
                  // Shift+Tab: Simple unindent (remove spaces at cursor)
                  const lineStart = value.lastIndexOf('\n', start - 1) + 1;
                  const currentLine = value.substring(lineStart, start);
                  
                  if (currentLine.endsWith(INDENT_CHAR)) {
                      // Remove the indent
                      this.selectionStart = start - INDENT_SIZE;
                      this.selectionEnd = start;
                      document.execCommand('delete', false);
                  }
              } else {
                  // Regular Tab: Insert spaces
                  document.execCommand('insertText', false, INDENT_CHAR);
              }
          } else {
              // Fallback for newer browsers that don't support execCommand
              if (e.shiftKey) {
                  // Shift+Tab: Remove indentation
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
                  // Regular Tab: Insert spaces
                  this.value = value.substring(0, start) + INDENT_CHAR + value.substring(end);
                  this.selectionStart = this.selectionEnd = start + INDENT_SIZE;
              }
          }
          
          // Trigger input event for preview update
          this.dispatchEvent(new Event('input', { bubbles: true }));
      }
      
      // Let all other keys (including Ctrl+Z) work normally
  });
  
  // Just set visual tab size
  textarea.style.tabSize = '1';
  textarea.style.MozTabSize = '1';
}

// ============================================================================
// INITIALIZE HYBRID SYSTEM
// ============================================================================

function initHybridSystem() {
  const taskEditor = document.getElementById('task-code');
  if (taskEditor) {
      addTabSupportWithNativeUndo(taskEditor);
  }
  
  const demoCode = document.getElementById('demo-code');
  if (demoCode) {
      addTabSupportWithNativeUndo(demoCode);
  }
}

// Function to update cursor position display
function updateCursorPosition(textarea) {
  const currentLineEl = document.getElementById('current-line');
  const currentColEl = document.getElementById('current-col');
  
  if (!currentLineEl || !currentColEl) return;
  
  const position = textarea.selectionStart;
  const textBeforeCursor = textarea.value.substring(0, position);
  
  // Calculate line number (count newlines + 1)
  const lineNumber = (textBeforeCursor.match(/\n/g) || []).length + 1;
  
  // Calculate column number (characters after last newline + 1)
  const lastNewlineIndex = textBeforeCursor.lastIndexOf('\n');
  const columnNumber = lastNewlineIndex === -1 ? position + 1 : position - lastNewlineIndex;
  
  // Update display
  currentLineEl.textContent = lineNumber;
  currentColEl.textContent = columnNumber;
}

// Initialize cursor tracking
function initCursorTracking() {
  const textarea = document.getElementById('task-code');
  if (!textarea) return;
  
  // Events that can change cursor position
  const events = ['keyup', 'mouseup', 'focus', 'input', 'click', 'select'];
  
  events.forEach(eventType => {
      textarea.addEventListener(eventType, function() {
          updateCursorPosition(this);
      });
  });
  
  // Initial position update
  updateCursorPosition(textarea);
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHybridSystem);
} else {
  initHybridSystem();
}

setTimeout(initHybridSystem, 100);

// ============================================================================
// INTERACTIVE FLEXBOX PLAYGROUND
// ============================================================================

/**
 * Updates the interactive flexbox playground based on user control inputs
 * Applies flexbox properties dynamically and adjusts container dimensions
 */
function updatePlayground() {
  const container = document.getElementById('playground-container');
  const flexDirection = document.getElementById('flex-direction').value;
  const justifyContent = document.getElementById('justify-content').value;
  const alignItems = document.getElementById('align-items').value;
  const gap = document.getElementById('gap').value;
  
  // Apply flexbox properties to playground container
  container.style.flexDirection = flexDirection;
  container.style.justifyContent = justifyContent;
  container.style.alignItems = alignItems;
  container.style.gap = gap + 'px';
  
  // Update gap display value
  document.getElementById('gap-value').textContent = gap + 'px';
  
  // Adjust container height based on flex direction
  if (flexDirection.includes('column')) {
    container.style.minHeight = '200px';
  } else {
    container.style.minHeight = '150px';
  }
}

/**
 * Highlights a flex item when clicked and adds sparkle animation
 * @param {HTMLElement} element - The flex item that was clicked
 */
function highlightItem(element) {
  // Add pulse animation to clicked item
  element.style.animation = 'pulse 0.5s ease-out';
  
  // Create and add sparkle effect
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '✨';
  sparkle.style.position = 'absolute';
  sparkle.style.top = '5px';
  sparkle.style.right = '5px';
  sparkle.style.animation = 'sparkle 1s ease-out';
  sparkle.style.zIndex = '10';
  element.style.position = 'relative';
  element.appendChild(sparkle);
  
  // Remove effects after animation completes
  setTimeout(() => {
    element.style.animation = '';
    sparkle.remove();
  }, 1000);
}

// ============================================================================
// PROPERTY INFORMATION SYSTEM
// ============================================================================

/**
 * Shows detailed information about a specific flexbox property in a popup
 * @param {HTMLElement} element - The property card that was clicked
 * @param {string} property - The property key to look up information
 */
function showPropertyInfo(element, property) {
  // Property information database
  const info = {
    'display-flex': "📦 display: flex: This is the magic property that transforms any element into a flex container! All direct children become flex items that can be aligned and distributed using flexbox properties. It's the foundation of all flexbox layouts.",
    'justify-content': "↔️ justify-content: Controls how flex items are positioned along the main axis (horizontal by default). Use 'center' for centering, 'space-between' to spread items apart, or 'flex-start' for left alignment. Perfect for navigation bars!",
    'align-items': "↕️ align-items: Controls how flex items are positioned along the cross axis (vertical by default). Use 'center' for perfect vertical centering, 'stretch' to make items fill the container height, or 'flex-start' for top alignment.",
    'flex-direction': "🔄 flex-direction: Changes the main axis direction. 'row' (default) arranges items horizontally, 'column' arranges them vertically. You can also use 'row-reverse' or 'column-reverse' to flip the order.",
    'flex-wrap': "📋 flex-wrap: Controls whether flex items stay on one line or wrap to new lines. Use 'wrap' to allow wrapping for responsive layouts, or 'nowrap' (default) to keep everything on one line.",
    'gap': "📏 gap: The modern way to add consistent spacing between flex items. Much cleaner than using margins! Set gap: 20px to add 20 pixels of space between all items automatically."
  };
  
  // Reset all property cards to default styling
  document.querySelectorAll('.property-card').forEach(el => {
    el.style.background = 'linear-gradient(135deg, var(--property-bg) 0%, #e8eaf6 100%)';
    el.style.borderColor = 'var(--css-color)';
  });
  
  // Highlight the clicked property card
  element.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
  element.style.borderColor = 'var(--brand)';
  
  // Create and display information popup
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
        ${info[property]}
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
  
  // Add popup to page and set auto-removal
  document.body.appendChild(popup);
  setTimeout(() => { 
    if (popup.parentElement) popup.remove(); 
  }, 10000);
  
  // Reset card styling after delay
  setTimeout(() => {
    element.style.background = 'linear-gradient(135deg, var(--property-bg) 0%, #e8eaf6 100%)';
    element.style.borderColor = 'var(--css-color)';
  }, 2000);
}

// ============================================================================
// EXAMPLE SHOWCASE INTERACTIONS
// ============================================================================

/**
 * Highlights an example card when clicked and adds visual effects
 * @param {HTMLElement} element - The example card that was clicked
 * @param {string} type - The example type (for potential future use)
 */
function highlightExample(element, type) {
  // Reset all example cards to default styling
  document.querySelectorAll('.example-card').forEach(el => {
    el.style.background = '#f8f9ff';
  });
  
  // Highlight the clicked example card
  element.style.background = '#e3f2fd';
  element.style.transform = 'translateY(-4px)';
  element.style.boxShadow = '0 8px 20px rgba(0,123,255,0.3)';
  
  // Add sparkle effect
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '⭐';
  sparkle.style.position = 'absolute';
  sparkle.style.top = '8px';
  sparkle.style.right = '8px';
  sparkle.style.animation = 'sparkle 1s ease-out';
  element.style.position = 'relative';
  element.appendChild(sparkle);
  
  // Reset styling and remove sparkle after delay
  setTimeout(() => {
    element.style.background = '#f8f9ff';
    element.style.transform = '';
    element.style.boxShadow = '';
    sparkle.remove();
  }, 2000);
}

// ============================================================================
// BENEFIT INFORMATION SYSTEM
// ============================================================================

/**
 * Shows detailed information about a specific flexbox benefit in a popup
 * @param {HTMLElement} element - The benefit card that was clicked
 * @param {string} benefit - The benefit key to look up information
 */
function showBenefitInfo(element, benefit) {
  // Benefit information database
  const info = {
    alignment: "🎯 Perfect Alignment: Before Flexbox, centering elements (especially vertically) was notoriously difficult. Flexbox makes it trivial with just align-items: center and justify-content: center. No more complex positioning calculations!",
    responsive: "📱 Responsive by Default: Flex items automatically adapt to container size. Use flex-wrap: wrap for responsive layouts that stack on mobile. Flexbox handles the math for you, creating smooth responsive experiences.",
    efficient: "⚡ Replaces Complex Code: Flexbox eliminates the need for floats, clearfix hacks, and complex positioning. What used to take dozens of lines of CSS now takes just a few flexbox properties. Your code becomes cleaner and more maintainable.",
    flexible: "🔧 Flexible Control: Fine-tune layouts with properties like flex-grow, flex-shrink, and gap. Control how much space each item takes, how they shrink on small screens, and spacing between items. Ultimate layout control made simple."
  };
  
  // Reset all benefit cards to default styling
  document.querySelectorAll('.benefit-item').forEach(el => {
    el.style.background = 'linear-gradient(135deg, #f2f6ff 0%, #e3f2fd 100%)';
  });
  
  // Highlight the clicked benefit card
  element.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
  
  // Create and display information popup
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
  
  // Add popup to page and set auto-removal
  document.body.appendChild(popup);
  setTimeout(() => { 
    if (popup.parentElement) popup.remove(); 
  }, 8000);
  
  // Reset card styling after delay
  setTimeout(() => {
    element.style.background = 'linear-gradient(135deg, #f2f6ff 0%, #e3f2fd 100%)';
  }, 2000);
}

// ============================================================================
// DEMO FUNCTIONALITY
// ============================================================================

// Get demo elements
const demoCode = document.getElementById('demo-code');
const demoPreview = document.getElementById('demo-preview');

/**
 * Updates the demo preview iframe with the current demo code
 * Creates a complete HTML document with flexbox navigation example
 */
function updateDemo() {
  demoPreview.srcdoc = `<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  body { 
    font-family: 'Nunito', sans-serif; 
    margin: 0; 
    line-height: 1.6;
    background: #f8f9ff;
    color: #333;
  }
  
  ${demoCode.value}
</style>
</head>
<body>
<nav class="navbar">
  <div class="logo">Logo</div>
  <ul class="nav-links">
    <li><a href="javascript:void(0)">Home</a></li>
    <li><a href="javascript:void(0)">About</a></li>
    <li><a href="javascript:void(0)">Contact</a></li>
  </ul>
</nav>

<main style="padding: 30px 20px;">
  <h1 style="color: #007BFF; text-align: center; margin-bottom: 30px;">Flexbox Navigation Demo</h1>
  
  <div class="card-container">
    <div class="card">
      <h2 style="color: #007BFF; margin: 0 0 15px 0;">🎯 Perfect Alignment</h2>
      <p style="margin: 0; color: #666;">Items are perfectly centered and spaced using justify-content and align-items.</p>
    </div>
    
    <div class="card">
      <h2 style="color: #007BFF; margin: 0 0 15px 0;">📱 Responsive Design</h2>
      <p style="margin: 0; color: #666;">Flexbox automatically adapts to different screen sizes without media queries.</p>
    </div>
    
    <div class="card">
      <h2 style="color: #007BFF; margin: 0 0 15px 0;">⚡ Easy Layout</h2>
      <p style="margin: 0; color: #666;">No more floats or complex positioning - just simple, intuitive properties.</p>
    </div>
  </div>
</main>
</body>
</html>`; 
}

// ============================================================================
// TASK FUNCTIONALITY
// ============================================================================

// Get task elements
const taskEditor = document.getElementById('task-code');
const taskPreview = document.getElementById('task-preview');

/**
 * Renders the user's task code in the preview iframe
 * Cleans unwanted scripts and shows placeholder if empty
 */
function renderTask() { 
  const code = taskEditor.value;
  
  // Clean unwanted live reload scripts
  let cleanCode = code.replace(/<script[^>]*>[\s\S]*?Live reload enabled[\s\S]*?<\/script>/gi, '');
  cleanCode = cleanCode.replace(/<script[^>]*>[\s\S]*?websocket[\s\S]*?<\/script>/gi, '');
  cleanCode = cleanCode.replace(/<!--[\s\S]*?Live reload[\s\S]*?-->/gi, '');
  
  // Display user code or placeholder
  taskPreview.srcdoc = cleanCode || `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: Arial, sans-serif;
    padding: 10px;
    text-align: center;
    background: #f8f9ff;
    color: #666;
  }
  .placeholder {
    border: 2px dashed #dde7ff;
    padding: 5px;
    border-radius: 10px;
    background: #f2f6ff;
  }
</style>
</head>
<body>
<div class="placeholder">
  <h2>✏️ Start Creating Your Flexbox Navigation!</h2>
  <p>Write your HTML with flexbox styling in the editor...</p>
</div>
</body>
</html>`;
}

// Add event listener for task editor input
taskEditor.addEventListener('input', function() {
  let value = this.value;
  
  // Clean unwanted scripts from input
  if (value.includes('Live reload enabled') || value.includes('websocket')) {
    value = value.replace(/<script[^>]*>[\s\S]*?Live reload enabled[\s\S]*?<\/script>/gi, '');
    value = value.replace(/<script[^>]*>[\s\S]*?websocket[\s\S]*?<\/script>/gi, '');
    value = value.replace(/<!--[\s\S]*?Live reload[\s\S]*?-->/gi, '');
    this.value = value;
  }
  
  // Update preview
  renderTask();
});

// ============================================================================
// HTML TAG VALIDATION
// ============================================================================

/**
 * Checks for unclosed HTML tags in the provided code
 * @param {string} code - The HTML code to validate
 * @returns {Array} Array of error messages for unclosed tags
 */
function checkClosingTags(code) {
  const closingTagErrors = [];
  
  // Define required tags and their patterns
  const tagChecks = [
    {
      name: 'html',
      openPattern: /<html[^>]*>/gi,
      closePattern: /<\/html>/gi,
      displayName: '&lt;html&gt;'
    },
    {
      name: 'head',
      openPattern: /<head[^>]*>/gi,
      closePattern: /<\/head>/gi,
      displayName: '&lt;head&gt;'
    },
    {
      name: 'body',
      openPattern: /<body[^>]*>/gi,
      closePattern: /<\/body>/gi,
      displayName: '&lt;body&gt;'
    },
    {
      name: 'style',
      openPattern: /<style[^>]*>/gi,
      closePattern: /<\/style>/gi,
      displayName: '&lt;style&gt;'
    },
    {
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
    },
    {
      name: 'div',
      openPattern: /<div[^>]*>/gi,
      closePattern: /<\/div>/gi,
      displayName: '&lt;div&gt;'
    }
  ];
  
  // Check each tag type for proper closing
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

// ============================================================================
// HINT SYSTEM
// ============================================================================

/**
 * Shows a random helpful hint to the user
 * Displays as a sliding notification from the right side
 */
function showHint() {
  const hints = [
    "📦 Start with basic HTML structure: &lt;html&gt;, &lt;head&gt;, &lt;body&gt;",
    "🎨 Add &lt;style&gt; tags inside the &lt;head&gt; section",
    "🧭 Use &lt;nav&gt; element for semantic navigation structure",
    "🔧 Apply display: flex to the navbar container",
    "↔️ Use justify-content to align items (try space-between)",
    "↕️ Add align-items: center for vertical alignment",
    "📝 Include at least 3 navigation links in &lt;ul&gt; and &lt;li&gt; elements",
    "🏷️ Add a logo or site title element",
    "🎯 Remember CSS syntax: selector &#123; property: value; &#125;"
  ];
  
  // Select random hint
  const randomHint = hints[Math.floor(Math.random() * hints.length)];
  
  // Create and display hint popup
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
  
  // Remove hint after 6 seconds
  setTimeout(() => {
    hintPopup.firstElementChild.style.animation = 'slideOutRight 0.5s ease-out';
    setTimeout(() => hintPopup.remove(), 500);
  }, 6000);
}

// ============================================================================
// TASK VALIDATION AND FEEDBACK
// ============================================================================

/**
 * Comprehensive validation of user's flexbox navigation task
 * Checks HTML structure, CSS implementation, and flexbox usage
 * Provides detailed feedback and updates progress indicators
 */
function checkAnswer() {
  const code = taskEditor.value.trim();
  
  // Handle empty code submission
  if (!code) {
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 15px;">
        <span style="font-size: 1.8em;">🤨</span>
        <div style="flex: 1;">
          <div style="font-size: 1.1em; margin-bottom: 10px;">
            <strong>Your code is empty!</strong>
          </div>
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 10px; font-size: 0.95em;">
            <strong>💡 Get started:</strong> Create an HTML page with flexbox navigation in the editor above.
          </div>
        </div>
      </div>
    `;
    feedback.className = 'feedback error';
    return;
  }
  
  // Clean unwanted scripts from code
  let cleanCode = code.replace(/<script[^>]*>[\s\S]*?Live reload enabled[\s\S]*?<\/script>/gi, '');
  cleanCode = cleanCode.replace(/<script[^>]*>[\s\S]*?websocket[\s\S]*?<\/script>/gi, '');
  cleanCode = cleanCode.replace(/<!--[\s\S]*?Live reload[\s\S]*?-->/gi, '');
  
  const codeClean = cleanCode.toLowerCase().replace(/\s+/g, ' ').trim();
  
  // Check for required Flexbox properties
  const hasDisplayFlex = /display\s*:\s*flex/i.test(cleanCode);
  const hasJustifyContent = /justify-content\s*:\s*[^;]+/i.test(cleanCode);
  const hasAlignItems = /align-items\s*:\s*[^;]+/i.test(cleanCode);
  
  // Check for HTML structure
  const hasHtml = /<html[^>]*>[\s\S]*<\/html>/i.test(cleanCode) || /<body[^>]*>[\s\S]*<\/body>/i.test(cleanCode);
  const hasNav = /<nav[^>]*>[\s\S]*<\/nav>/i.test(cleanCode);
  const hasStyleTag = /<style[^>]*>[\s\S]*<\/style>/i.test(cleanCode);
  
  // Check for navigation elements (at least 3 links)
  const linkCount = (cleanCode.match(/<a[^>]*href[^>]*>/gi) || []).length;
  const hasUL = /<ul[^>]*>[\s\S]*<\/ul>/i.test(cleanCode);
  const hasLI = /<li[^>]*>[\s\S]*<\/li>/i.test(cleanCode);
  
  // Check for logo/title
  const hasLogo = /logo|brand|title|site/i.test(cleanCode) || /<h[1-6][^>]*>[\s\S]*<\/h[1-6]>/i.test(cleanCode);
  
  // Check CSS syntax structure
  const hasSelector = /[a-z#.][a-z0-9#.-]*\s*{[^}]*}/i.test(cleanCode);
  const hasValidCSSSyntax = /[^{}]*{\s*[^{}]*:\s*[^{}]*;[^{}]*}/i.test(cleanCode);
  
  // Check for proper navigation structure
  const hasNavStructure = hasNav && (hasUL || hasLI) && linkCount >= 3;
  
  // Check for content in body
  const hasBodyContent = /<body[^>]*>[\s\S]*?<[^>]*>[\s\S]*?<\/[^>]*>[\s\S]*?<\/body>/i.test(cleanCode) || 
                        /<nav[^>]*>[\s\S]*?<\/nav>/i.test(cleanCode);
  
  // Check for styling
  const hasBackgroundColor = /background(-color)?\s*:\s*[^;]+/i.test(cleanCode);
  const hasPadding = /padding\s*:\s*[^;]+/i.test(cleanCode);
  
  // Check for multiple flex containers
  const flexCount = (cleanCode.match(/display\s*:\s*flex/gi) || []).length;
  
  // Check for closing tag issues FIRST (highest priority)
  const closingTagErrors = checkClosingTags(cleanCode);
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
  
  // Initialize feedback message arrays
  let errorMessages = [];
  let successMessages = [];
  let warningMessages = [];
  
  // Validate basic HTML structure
  if (!hasHtml || !hasBodyContent) {
    errorMessages.push('Create a complete HTML page with content in the body.');
  } else {
    successMessages.push('✓ Has HTML structure with content');
  }
  
  // Validate style implementation
  if (!hasStyleTag && !hasSelector) {
    errorMessages.push('Add CSS styling using &lt;style&gt; tags in the <head> section.');
  } else if (hasStyleTag) {
    successMessages.push('✓ Uses &lt;style&gt; tags for CSS');
  }
  
  // Validate CSS syntax
  if (!hasValidCSSSyntax && hasStyleTag) {
    errorMessages.push('Check your CSS syntax: selector { property: value; }');
  } else if (hasValidCSSSyntax) {
    successMessages.push('✓ Proper CSS syntax structure');
  }
  
  // Validate navigation structure
  if (!hasNav) {
    errorMessages.push('Missing &lt;nav&gt; element. Use &lt;nav&gt; for the navigation bar.');
  } else {
    successMessages.push('✓ Uses &lt;nav&gt; element');
  }
  
  if (!hasNavStructure) {
    errorMessages.push('Navigation needs proper structure with &lt;ul&gt;, &lt;li&gt;, and at least 3 &lt;a&gt; links.');
  } else {
    successMessages.push(`✓ Proper navigation structure with ${linkCount} links`);
  }
  
  // Validate required Flexbox properties
  if (!hasDisplayFlex) {
    errorMessages.push('Missing "display: flex" property. This is required for Flexbox layout.');
  } else {
    successMessages.push('✓ Uses display: flex');
  }
  
  if (!hasJustifyContent) {
    errorMessages.push('Missing "justify-content" property. This controls alignment along the main axis.');
  } else {
    successMessages.push('✓ Uses justify-content property');
  }
  
  // Check align-items (recommended but not required)
  if (!hasAlignItems) {
    warningMessages.push('Consider adding "align-items" for better vertical alignment.');
  } else {
    successMessages.push('✓ Uses align-items property');
  }
  
  // Check for logo/title
  if (!hasLogo) {
    warningMessages.push('Add a logo or site title to the navigation.');
  } else {
    successMessages.push('✓ Includes logo/title element');
  }
  
  // Check styling
  if (!hasBackgroundColor) {
    warningMessages.push('Add background color to make the navigation bar more visible.');
  } else {
    successMessages.push('✓ Uses background color');
  }
  
  if (!hasPadding) {
    warningMessages.push('Add padding to improve spacing and appearance.');
  } else {
    successMessages.push('✓ Uses padding for spacing');
  }
  
  // Check for multiple flex containers
  if (flexCount > 1) {
    successMessages.push('✓ Excellent! Uses multiple flex containers');
  } else if (flexCount === 1) {
    warningMessages.push('Try using flexbox for both the navbar and nav-links containers.');
  }
  
  // Display feedback based on validation results
  const feedback = document.getElementById('feedback');
  const nextBtn = document.getElementById('nextLessonBtn');
  const stepsElements = document.querySelectorAll('.step');
  
  if (errorMessages.length === 0) {
    // Success case - all requirements met
    feedback.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 15px;">
        <span style="font-size: 2em;">🎉</span>
        <div style="flex: 1;">
          <div style="font-size: 1.2em; margin-bottom: 12px;">
            <strong>Perfect Flexbox Navigation Complete!</strong>
          </div>
          
          <div style="background: rgba(39,174,96,0.1); border-left: 4px solid #27ae60; padding: 12px; border-radius: 6px; margin-bottom: 15px;">
            <div style="font-weight: 600; margin-bottom: 8px; color: #27ae60;">All Requirements Successfully Met:</div>
            <div style="line-height: 1.6;">
              <div>• Has HTML structure with content</div>
              <div>• Uses style tags for CSS</div>
              <div>• Proper CSS syntax structure</div>
              <div>• Uses nav element</div>
              <div>• Proper navigation structure with links</div>
              <div>• Uses display: flex</div>
              <div>• Uses justify-content property</div>
            </div>
          </div>
          
          <div style="background: linear-gradient(135deg, rgba(39,174,96,0.15) 0%, rgba(46,204,113,0.1) 100%); padding: 15px; border-radius: 8px; border: 1px solid rgba(39,174,96,0.3);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
              <span style="font-size: 1.3em;">🚀</span>
              <strong style="color: #27ae60;">Excellent Work!</strong>
            </div>
            <div style="line-height: 1.5; color: #2c3e50;">
              You have successfully mastered Flexbox navigation! Your code demonstrates proper HTML structure, 
              semantic navigation elements, and effective use of Flexbox properties for modern web layouts.
            </div>
          </div>
        </div>
      </div>
    `;
    feedback.className = 'feedback success';
    
    // Enable next button
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
    nextBtn.style.cursor = 'pointer';
    nextBtn.style.animation = 'pulse 1.5s infinite';
    
    // Update progress
    stepsElements[1].classList.add('active');
    stepsElements[2].classList.add('active');
    
    // Store completion in localStorage for persistence
    localStorage.setItem('partB_lesson8_remake_complete', 'true');
    markCurrentLessonComplete();
                          
    // Trigger celebration animation
    createCelebration();
    
  } else {
    // Error case - requirements not met
    let feedbackContent = `
      <div style="display: flex; align-items: flex-start; gap: 15px;">
        <span style="font-size: 1.8em;">🤔</span>
        <div style="flex: 1;">
          <div style="font-size: 1.1em; margin-bottom: 10px;">
            <strong>Let's improve your flexbox navigation:</strong>
          </div>
          <div style="margin-bottom: 12px;">
            <strong>Missing requirements:</strong>
            <ul style="margin: 6px 0; padding-left: 20px; list-style-type: none;">
              ${errorMessages.map(error => `<li style="margin: 4px 0; padding: 6px 8px; border-left: 3px solid #e74c3c; background: rgba(231,76,60,0.1); border-radius: 4px;">❌ ${error}</li>`).join('')}
            </ul>
          </div>
    `;
    
    if (successMessages.length > 0) {
      feedbackContent += `<div style="margin-bottom: 12px;"><strong>What's working well:</strong><br>${successMessages.join('<br>')}</div>`;
    }
    
    if (warningMessages.length > 0) {
      feedbackContent += `<div style="margin-bottom: 12px;"><strong>💡 Suggestions:</strong><br>${warningMessages.join('<br>')}</div>`;
    }
    
    feedbackContent += `
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 10px; font-size: 0.95em;">
            <strong>🎯 Requirements recap:</strong><br>
            • Complete HTML page with &lt;nav&gt; element<br>
            • CSS using &lt;style&gt; tags in &lt;head&gt;<br>
            • Use display: flex on navigation container<br>
            • Include justify-content property<br>
            • At least 3 navigation links in proper structure<br>
            • Logo or site title element
          </div>
        </div>
      </div>
    `;
    
    feedback.innerHTML = feedbackContent;
    feedback.className = 'feedback error';
    
    // Update progress to practice step
    stepsElements[1].classList.add('active');
    stepsElements[2].classList.remove('active');
  }
}

// ============================================================================
// CELEBRATION ANIMATION
// ============================================================================

/**
 * Creates a confetti celebration animation when task is completed successfully
 * Spawns multiple colored particles that fall from the top of the screen
 */
function createCelebration() {
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

// ============================================================================
// NAVIGATION AND COMPLETION HANDLING
// ============================================================================

/**
 * Check if lesson was previously completed and restore UI state
 * This function runs when the page loads to handle returning users
 * Restores completion status, enables next button, and updates progress
 */
function checkAndRestoreCompletion() {
  // Wait for DOM to be ready before checking completion status
  setTimeout(() => {
    const isCompleted = localStorage.getItem('partB_lesson8_remake_complete') === 'true';
    
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
        
        // Update progress tracker to show completion
        if (steps[1]) steps[1].classList.add('active');
        if (steps[2]) steps[2].classList.add('active');
      }
    }
  }, 100); // Wait 100ms for DOM to be ready
}

// ============================================================================
// EVENT LISTENERS AND INITIALIZATION
// ============================================================================

// Initialize demos and task preview when page loads
updateDemo();
renderTask();

// Next lesson button functionality
document.getElementById('nextLessonBtn').addEventListener('click', function() {
  if (!this.disabled) {
    window.location.href = '/2. partB/lesson9_remake.html';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  initCursorTracking();
  const textarea = document.getElementById('task-code');
  const placeholder = document.getElementById('editor-placeholder');
  
  if (!textarea || !placeholder) return;
  
  // Simple placeholder visibility and scrolling
  function updatePlaceholder() {
      const isEmpty = textarea.value.length === 0;
      
      if (isEmpty) {
          placeholder.style.display = 'block';
          placeholder.style.pointerEvents = 'auto'; // Enable scrolling
      } else {
          placeholder.style.display = 'none';
          placeholder.style.pointerEvents = 'none';
      }
  }
  
  // Sync scrolling between textarea and placeholder
  textarea.addEventListener('scroll', function() {
      if (textarea.value.length === 0) {
          placeholder.scrollTop = textarea.scrollTop;
          placeholder.scrollLeft = textarea.scrollLeft;
      }
  });
  
  placeholder.addEventListener('scroll', function() {
      textarea.scrollTop = placeholder.scrollTop;
      textarea.scrollLeft = placeholder.scrollLeft;
  });
  
  // Focus textarea when clicking placeholder
  placeholder.addEventListener('click', function(e) {
      textarea.focus();
      e.preventDefault();
  });
  
  // Update on input
  textarea.addEventListener('input', updatePlaceholder);
  
  // Initial setup
  updatePlaceholder();
});

// Legacy completion check (for backwards compatibility)
document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('lesson8_remake_complete') === 'true') {
    const nextBtn = document.getElementById('nextLessonBtn');
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
    nextBtn.style.cursor = 'pointer';
  }
  
  updateDemo();
  renderTask();
});

// ============================================================================
// PAGE LOAD HANDLERS FOR COMPLETION RESTORATION
// ============================================================================

// Multiple initialization methods to ensure completion check runs reliably
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkAndRestoreCompletion);
} else {
  checkAndRestoreCompletion();
}

// Backup initialization with delay to ensure DOM is ready
setTimeout(checkAndRestoreCompletion, 500);