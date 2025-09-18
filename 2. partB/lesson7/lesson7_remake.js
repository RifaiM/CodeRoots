// ============================================================================
// HYBRID APPROACH - Tab Support + Browser Native Undo
// ============================================================================

let currentLine = null;
let currentCol = null;

document.addEventListener('DOMContentLoaded', function() {
  // Initialize cursor position elements
  currentLine = document.getElementById('current-line');
  currentCol = document.getElementById('current-col');

  // Set up real-time preview updates
  const taskCode = document.getElementById('task-code');
  if (taskCode) {
    taskCode.addEventListener('input', renderTask); // Use renderTask, not updatePreview

    // Cursor position tracking - using the same approach as lesson 6
    taskCode.addEventListener('keyup', (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key)) {
        updateCursorPosition(taskCode);
      }
    });

    taskCode.addEventListener('click', () => updateCursorPosition(taskCode));

    // Use input event for most updates, but debounce it slightly
    let updateTimeout;
    taskCode.addEventListener('input', () => {
      clearTimeout(updateTimeout);
      updateTimeout = setTimeout(() => updateCursorPosition(taskCode), 1);
    });

    // Initialize cursor position
    setTimeout(() => updateCursorPosition(taskCode), 200);
  }
});

// Function to update cursor position display
function updateCursorPosition(textarea) {
  if (!textarea) return;

  const value = textarea.value;
  const cursorPos = textarea.selectionStart;

  // Calculate line and column
  const beforeCursor = value.substring(0, cursorPos);
  const lines = beforeCursor.split('\n');
  const line = lines.length;
  const col = lines[lines.length - 1].length + 1;

  // Update display elements if they exist
  if (currentLine) currentLine.textContent = line;
  if (currentCol) currentCol.textContent = col;
}

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
      this.dispatchEvent(new Event('input', {
        bubbles: true
      }));
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

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHybridSystem);
} else {
  initHybridSystem();
}

setTimeout(initHybridSystem, 100);

// ============================================================================
// DEMO INITIALIZATION AND PREVIEW FUNCTIONALITY
// ============================================================================

// Get references to demo elements
const demoCode = document.getElementById('demo-code');
const demoPreview = document.getElementById('demo-preview');

/**
 * Updates the demo preview iframe with the current demo code
 * Shows a professional box model demonstration with header, card, buttons, and info box
 */
function updateDemo() {
  demoPreview.srcdoc = `<!DOCTYPE html>
<html>
<head>
<style>
body { 
    font-family: 'Nunito', sans-serif; 
    margin: 15px; 
    line-height: 1.6;
    background: #f4f8ff;
}

${demoCode.value}
</style>
</head>
<body>
<div class="header">
    <h1>🌟 Box Model Demonstration</h1>
</div>

<div class="card">
    <h2>📦 Box Model Card</h2>
    <p>This card demonstrates padding (inner space), margin (outer space), and border styling working together to create professional layouts.</p>

    <div class="button">Click Me! 🚀</div>
    <div class="button">Another Button</div>
</div>

<div class="info-box">
    <strong>🎯 Key Insight:</strong> Notice how margin creates space between elements, padding creates breathing room inside elements, and borders add visual definition!
</div>
</body>
</html>`;
}

// ============================================================================
// TASK EDITOR AND PREVIEW FUNCTIONALITY  
// ============================================================================

// Get references to task elements
const taskEditor = document.getElementById('task-code');
const taskPreview = document.getElementById('task-preview');

/**
 * Renders the user's task code in the preview iframe
 * Includes cleaning of live server scripts and placeholder content
 */
function renderTask() {
  const code = taskEditor.value;

  // Clean code by removing any live server scripts that might be injected
  let cleanCode = code.replace(/<script[^>]*>[\s\S]*?Live reload enabled[\s\S]*?<\/script>/gi, '');
  cleanCode = cleanCode.replace(/<script[^>]*>[\s\S]*?websocket[\s\S]*?<\/script>/gi, '');
  cleanCode = cleanCode.replace(/<!--[\s\S]*?Live reload[\s\S]*?-->/gi, '');

  // Show user code or placeholder if empty
  taskPreview.srcdoc = cleanCode || `<!DOCTYPE html>
<html>
<head>
<style>
body {
    font-family: Arial, sans-serif;
    padding: 40px;
    text-align: center;
    background: #f8f9ff;
    color: #666;
}
.placeholder {
    border: 2px dashed #dde7ff;
    padding: 40px;
    border-radius: 10px;
    background: #f2f6ff;
}

@media (max-width: 480px) {
    body {
        padding: 10px;
    }
    
    .placeholder {
        padding: 10px;
    }
}
</style>
</head>
<body>
<div class="placeholder">
    <h2>✏️ Start Creating Your Box Model Demo!</h2>
    <p>Write your HTML with box model styling in the editor...</p>
</div>
</body>
</html>`;
}

/**
 * Event listener for task editor input
 * Filters out live server scripts and updates preview
 */
taskEditor.addEventListener('input', function() {
  // Filter out any injected live server scripts
  let value = this.value;
  if (value.includes('Live reload enabled') || value.includes('websocket')) {
    value = value.replace(/<script[^>]*>[\s\S]*?Live reload enabled[\s\S]*?<\/script>/gi, '');
    value = value.replace(/<script[^>]*>[\s\S]*?websocket[\s\S]*?<\/script>/gi, '');
    value = value.replace(/<!--[\s\S]*?Live reload[\s\S]*?-->/gi, '');
    this.value = value;
  }
  renderTask();
});

// Initialize task preview
renderTask();

// ============================================================================
// INTERACTIVE UI EFFECTS AND ANIMATIONS
// ============================================================================

/**
 * Highlights the interactive box model diagram when clicked
 * Adds pulse animation and sparkle effect
 * @param {HTMLElement} element - The box model element to highlight
 */
function highlightBoxModel(element) {
  element.style.animation = 'pulse 0.5s ease-out';

  // Add sparkle effect
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '✨';
  sparkle.style.position = 'absolute';
  sparkle.style.top = '10px';
  sparkle.style.right = '10px';
  sparkle.style.animation = 'sparkle 1s ease-out';
  sparkle.style.zIndex = '10';
  element.style.position = 'relative';
  element.appendChild(sparkle);

  // Remove effects after animation
  setTimeout(() => {
    element.style.animation = '';
    sparkle.remove();
  }, 1000);
}

/**
 * Shows detailed information about a box model component
 * Creates an informational popup with component details
 * @param {HTMLElement} element - The clicked component card
 * @param {string} component - The component type (content, padding, border, margin)
 */
function showComponentInfo(element, component) {
  // Component information database
  const info = {
    content: "📄 Content Area: This is where your actual content lives - text, images, videos, and other elements. The width and height properties control the size of this area. Everything you see on a webpage - paragraphs, headings, images - sits in the content area of their respective elements.",
    padding: "🛡️ Padding: Creates space inside the element, between the content and the border. Perfect for making text more readable and elements less cramped. Use padding for breathing room! Think of it as the cushioning inside a box that keeps your content from touching the walls.",
    border: "🖼️ Border: The visible outline around your element. Can be solid, dashed, dotted, or even invisible. Borders help define element boundaries and add visual structure. They're like picture frames that give definition to your content areas.",
    margin: "🌌 Margin: Creates space outside the element, pushing other elements away. Use margin to control spacing between elements and create clean, organized layouts. It's the invisible force field that keeps elements from crowding each other."
  };

  // Highlight the selected component
  document.querySelectorAll('.component-card').forEach(el => {
    el.style.background = 'linear-gradient(135deg, #f3e5f5 0%, #e8eaf6 100%)';
  });
  element.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';

  // Create information popup
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
            max-width: 500px;
            z-index: 10000;
            animation: popIn 0.3s ease-out;
        ">
            <div style="font-size: 1.1em; margin-bottom: 15px; line-height: 1.5;">
                ${info[component]}
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: var(--brand);
                display: block;
                margin: 0 auto;
                color: white;
                border: none;
                padding: 10px 18px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                Got it! ✅
            </button>
        </div>
    `;

  document.body.appendChild(popup);

  // Auto close popup after 10 seconds
  setTimeout(() => {
    if (popup.parentElement) popup.remove();
  }, 10000);

  // Reset background after popup closes
  setTimeout(() => {
    element.style.background = 'linear-gradient(135deg, #f3e5f5 0%, #e8eaf6 100%)';
  }, 2000);
}

/**
 * Highlights a CSS property demonstration when clicked
 * Shows visual feedback for margin/padding property examples
 * @param {HTMLElement} element - The property demo element
 * @param {string} property - The property type (margin or padding)
 */
function highlightProperty(element, property) {
  // Remove previous highlights from all property demos
  document.querySelectorAll('.property-demo').forEach(el => {
    el.style.background = 'linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)';
    el.style.borderColor = '#4caf50';
  });

  // Highlight the clicked property
  element.style.background = 'linear-gradient(135deg, #c8e6c9 0%, #dcedc8 100%)';
  element.style.borderColor = '#2e7d32';

  // Add sparkle effect
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '⭐';
  sparkle.style.position = 'absolute';
  sparkle.style.top = '10px';
  sparkle.style.right = '10px';
  sparkle.style.animation = 'sparkle 1s ease-out';
  element.style.position = 'relative';
  element.appendChild(sparkle);

  // Remove sparkle after animation
  setTimeout(() => sparkle.remove(), 1000);
}

/**
 * Highlights a border style example when clicked
 * Adds scale and shadow effects to demonstrate different border types
 * @param {HTMLElement} element - The border example element
 * @param {string} type - The border type (solid, dashed, dotted, rounded)
 */
function highlightBorder(element, type) {
  // Add special highlight effect
  element.style.transform = 'scale(1.05)';
  element.style.boxShadow = '0 8px 20px rgba(0,123,255,0.3)';

  // Add sparkle effect
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '✨';
  sparkle.style.position = 'absolute';
  sparkle.style.top = '5px';
  sparkle.style.right = '5px';
  sparkle.style.animation = 'sparkle 1s ease-out';
  element.style.position = 'relative';
  element.appendChild(sparkle);

  // Reset effects after animation
  setTimeout(() => {
    element.style.transform = '';
    element.style.boxShadow = '';
    sparkle.remove();
  }, 1000);
}

/**
 * Shows information about box model benefits when clicked
 * Creates popup with detailed explanation of each benefit
 * @param {HTMLElement} element - The clicked benefit item
 * @param {string} benefit - The benefit type (precision, layout, responsive, visual)
 */
function showBenefitInfo(element, benefit) {
  // Benefit information database
  const info = {
    precision: "🎯 Precise Control: The box model gives you pixel-perfect control over spacing and sizing. No more guessing - you can exactly control how much space is inside and outside every element! This precision is what separates professional designs from amateur layouts.",
    layout: "🏗️ Layout Foundation: Professional layouts require understanding how elements relate to each other in space. The box model is the foundation of all CSS layout techniques like Flexbox and Grid. Master this, and complex layouts become manageable.",
    responsive: "📱 Responsive Design: Box model properties work seamlessly with responsive design. You can use relative units (em, %, vw) for spacing that adapts to different screen sizes automatically. Your designs will look great on any device!",
    visual: "✨ Visual Hierarchy: Strategic use of margin and padding guides the user's eye through your content. More space = more importance. Less space = related content. This creates intuitive user experiences that feel natural to navigate."
  };

  // Highlight the clicked benefit
  document.querySelectorAll('.benefit-item').forEach(el => {
    el.style.background = 'linear-gradient(135deg, #f2f6ff 0%, #e3f2fd 100%)';
  });
  element.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';

  // Create information popup
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

  document.body.appendChild(popup);

  // Auto close popup after 8 seconds
  setTimeout(() => {
    if (popup.parentElement) popup.remove();
  }, 8000);

  // Reset background after popup closes
  setTimeout(() => {
    element.style.background = 'linear-gradient(135deg, #f2f6ff 0%, #e3f2fd 100%)';
  }, 2000);
}

// ============================================================================
// HINT SYSTEM
// ============================================================================

/**
 * Shows a random helpful hint to the user
 * Displays an animated hint popup with coding tips
 */
function showHint() {
  // Array of helpful hints for box model implementation
  const hints = [
    "📦 Start with basic HTML structure: &lt;html&gt;, &lt;head&gt;, &lt;body&gt;",
    "🎨 Add &lt;style&gt; tags inside the &lt;head&gt; section",
    "🎯 Create at least 3 different elements &#40;div, p, etc.&#41;",
    "🌌 Use margin to create space BETWEEN elements",
    "🛡️ Use padding to create space INSIDE elements",
    "🖼️ Add borders to see element boundaries clearly",
    "🎨 Use background colors to visualize the spacing",
    "⚙️ Try different values: margin: 20px; padding: 15px;",
    "🔧 Remember CSS syntax: selector &#123; property: value; &#125;"
  ];

  // Select a random hint
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
            max-width: 350px;
        ">
            ${randomHint}
        </div>
    `;

  document.body.appendChild(hintPopup);

  // Auto-hide hint after 6 seconds with slide-out animation
  setTimeout(() => {
    hintPopup.firstElementChild.style.animation = 'slideOutRight 0.5s ease-out';
    setTimeout(() => hintPopup.remove(), 500);
  }, 6000);
}

// ============================================================================
// CODE VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validates HTML structure for proper syntax and tag closure
 * @param {string} code - The HTML code to validate
 * @returns {Object} Object containing arrays of errors and warnings
 */
function validateHTMLStructure(code) {
  const errors = [];
  const warnings = [];

  // Check for basic HTML structure requirements
  if (!/<html[^>]*>/i.test(code)) {
    errors.push('Missing opening &lt;html&gt; tag');
  }
  if (!/<\/html>/i.test(code)) {
    errors.push('Missing closing &lt;/html&gt; tag');
  }
  if (!/<head[^>]*>/i.test(code)) {
    errors.push('Missing opening &lt;head&gt; tag');
  }
  if (!/<\/head>/i.test(code)) {
    errors.push('Missing closing &lt;/head&gt; tag');
  }
  if (!/<body[^>]*>/i.test(code)) {
    errors.push('Missing opening &lt;body&gt; tag');
  }
  if (!/<\/body>/i.test(code)) {
    errors.push('Missing closing &lt;/body&gt; tag');
  }

  // Check for properly closed common HTML tags
  const commonTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span', 'style', 'title'];
  commonTags.forEach(tag => {
    const openRegex = new RegExp(`<${tag}[^>]*>`, 'gi');
    const closeRegex = new RegExp(`</${tag}>`, 'gi');
    const openMatches = (code.match(openRegex) || []).length;
    const closeMatches = (code.match(closeRegex) || []).length;

    if (openMatches > closeMatches) {
      errors.push(`Missing closing &lt;/${tag}&gt; tag`);
    }
  });

  return {
    errors,
    warnings
  };
}

/**
 * Validates CSS structure for proper syntax
 * @param {string} code - The HTML code containing CSS to validate
 * @returns {Object} Object containing arrays of errors and warnings
 */
function validateCSSStructure(code) {
  const errors = [];
  const warnings = [];

  // Extract CSS from style tags
  const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  if (!styleMatch) {
    return {
      errors: ['No CSS found in &lt;style&gt; tags'],
      warnings
    };
  }

  const cssCode = styleMatch[1];

  // Check for missing semicolons in CSS properties
  const cssRules = cssCode.match(/[^{}]+\{[^{}]*\}/g) || [];
  cssRules.forEach((rule, index) => {
    const propertySection = rule.match(/\{([^}]*)\}/);
    if (propertySection && propertySection[1]) {
      const properties = propertySection[1].split('\n').filter(line => line.trim() && !line.trim().startsWith('/*'));
      properties.forEach(prop => {
        const trimmedProp = prop.trim();
        if (trimmedProp && trimmedProp.includes(':') && !trimmedProp.endsWith(';')) {
          errors.push(`Missing semicolon after CSS property: "${trimmedProp}"`);
        }
      });
    }
  });

  // Check for balanced CSS curly braces
  const openBraces = (cssCode.match(/\{/g) || []).length;
  const closeBraces = (cssCode.match(/\}/g) || []).length;
  if (openBraces > closeBraces) {
    errors.push('CSS has unclosed curly braces { }');
  } else if (closeBraces > openBraces) {
    errors.push('CSS has extra closing curly braces }');
  }

  return {
    errors,
    warnings
  };
}

// ============================================================================
// MAIN ANSWER CHECKING FUNCTION
// ============================================================================

/**
 * Main function to check the user's box model implementation
 * Validates code structure and box model requirements
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
                        <strong>💡 Get started:</strong> Create an HTML page with box model styling in the editor above.
                    </div>
                </div>
            </div>
        `;
    feedback.className = 'feedback error';
    return;
  }

  // Clean code by removing any live server scripts
  let cleanCode = code.replace(/<script[^>]*>[\s\S]*?Live reload enabled[\s\S]*?<\/script>/gi, '');
  cleanCode = cleanCode.replace(/<script[^>]*>[\s\S]*?websocket[\s\S]*?<\/script>/gi, '');
  cleanCode = cleanCode.replace(/<!--[\s\S]*?Live reload[\s\S]*?-->/gi, '');

  // Validate HTML and CSS structure first
  const htmlValidation = validateHTMLStructure(cleanCode);
  const cssValidation = validateCSSStructure(cleanCode);

  // Show structural errors first if any exist
  if (htmlValidation.errors.length > 0 || cssValidation.errors.length > 0) {
    const allErrors = [...htmlValidation.errors, ...cssValidation.errors];
    const feedback = document.getElementById('feedback');

    feedback.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <span style="font-size: 1.8em;">⚠️</span>
                <div style="flex: 1;">
                    <div style="font-size: 1.1em; margin-bottom: 10px;">
                        <strong>Code Structure Issues Found:</strong>
                    </div>
                    <div style="margin-bottom: 12px;">
                        <strong>Please fix these errors:</strong>
                        <ul style="margin: 6px 0; padding-left: 20px; list-style-type: none;">
                            ${allErrors.map(error => `<li style="margin: 4px 0; padding: 6px 8px; border-left: 3px solid #e74c3c; background: rgba(231,76,60,0.1); border-radius: 4px;">❌ ${error}</li>`).join('')}
                        </ul>
                    </div>
                    <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 10px; font-size: 0.95em;">
                        <strong>💡 Fix these issues first:</strong> Make sure all HTML tags are properly closed and CSS properties end with semicolons.
                    </div>
                </div>
            </div>
        `;
    feedback.className = 'feedback error';

    // Update progress to practice step
    const stepsElements = document.querySelectorAll('.step');
    stepsElements[1].classList.add('active');
    stepsElements[2].classList.remove('active');
    return;
  }

  // Prepare code for content analysis (normalize spacing and case)
  const codeClean = cleanCode.toLowerCase().replace(/\s+/g, ' ').trim();

  // Check for required CSS box model properties
  const hasMargin = /margin(-top|-right|-bottom|-left)?\s*:\s*[^;]+/i.test(cleanCode);
  const hasPadding = /padding(-top|-right|-bottom|-left)?\s*:\s*[^;]+/i.test(cleanCode);
  const hasBorder = /border(-top|-right|-bottom|-left|-width|-style|-color)?\s*:\s*[^;]+/i.test(cleanCode);

  // Check for proper CSS structure
  const hasSelector = /[a-z#.][a-z0-9#.-]*\s*{[^}]*}/i.test(cleanCode);
  const hasValidCSSSyntax = /[^{}]*{\s*[^{}]*:\s*[^{}]*;[^{}]*}/i.test(cleanCode);

  // Check for background colors (helps visualize box model)
  const hasBackground = /background(-color)?\s*:\s*[^;]+/i.test(cleanCode);

  // Count different HTML elements (requirement: at least 3)
  const elementCount = (cleanCode.match(/<(div|p|h[1-6]|span|section|article)[^>]*>/gi) || []).length;

  // Count CSS rules (should style different elements)
  const cssRules = (cleanCode.match(/[^{}]+\{[^{}]*\}/g) || []).length;

  // Arrays to collect validation results
  let errorMessages = [];
  let successMessages = [];
  let suggestions = [];

  // Validate each requirement and provide feedback
  if (!hasValidCSSSyntax) {
    errorMessages.push('No valid CSS found - need CSS rules with properties');
    suggestions.push('Add CSS inside <style> tags with proper syntax: selector { property: value; }');
  } else {
    successMessages.push('✅ Has valid CSS syntax');
  }

  if (!hasMargin) {
    errorMessages.push('Missing margin properties');
    suggestions.push('Add margin properties to create space between elements');
  } else {
    successMessages.push('✅ Uses margin properties');
  }

  if (!hasPadding) {
    errorMessages.push('Missing padding properties');
    suggestions.push('Add padding properties to create space inside elements');
  } else {
    successMessages.push('✅ Uses padding properties');
  }

  if (!hasBorder) {
    errorMessages.push('Missing border properties');
    suggestions.push('Add border properties to define element boundaries');
  } else {
    successMessages.push('✅ Uses border properties');
  }

  if (!hasBackground) {
    errorMessages.push('Missing background colors');
    suggestions.push('Add background colors to visualize the box model layers');
  } else {
    successMessages.push('✅ Uses background colors');
  }

  if (elementCount < 3) {
    errorMessages.push(`Only ${elementCount} elements found - need at least 3`);
    suggestions.push('Create at least 3 different elements (div, p, h1, etc.)');
  } else {
    successMessages.push(`✅ Has ${elementCount} elements`);
  }

  if (cssRules < 2) {
    errorMessages.push('Need styling for multiple elements');
    suggestions.push('Add CSS rules for different elements to show varied spacing');
  } else {
    successMessages.push(`✅ Has ${cssRules} CSS rules`);
  }

  // Get UI elements for feedback display
  const feedback = document.getElementById('feedback');
  const nextBtn = document.getElementById('nextLessonBtn');
  const stepsElements = document.querySelectorAll('.step');

  // Check if all requirements are met
  const allRequirementsMet = hasValidCSSSyntax && hasMargin && hasPadding && hasBorder && hasBackground && elementCount >= 3 && cssRules >= 2;

  // Display appropriate feedback based on validation results
  if (allRequirementsMet && errorMessages.length === 0) {
    // SUCCESS: All requirements met
    feedback.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <span style="font-size: 2em;">🎉</span>
                <div style="flex: 1;">
                    <div style="font-size: 1.2em; margin-bottom: 8px;">
                        <strong>Perfect Box Model Demonstration!</strong>
                    </div>
                    <div style="margin-bottom: 12px;">
                        ${successMessages.join('<br>')}
                    </div>
                    <div style="opacity: 0.9; background: rgba(39,174,96,0.1); padding: 8px 12px; border-radius: 6px; font-size: 0.95em;">
                        🚀 Outstanding! You've mastered the CSS box model with proper margin, padding, and border usage. Your layout demonstrates professional spacing control!
                    </div>
                </div>
            </div>
        `;
    feedback.className = 'feedback success';

    // Enable next lesson button with visual feedback
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
    nextBtn.style.cursor = 'pointer';
    nextBtn.style.animation = 'pulse 1.5s infinite';

    // Update progress tracker to show completion
    stepsElements[1].classList.add('active');
    stepsElements[2].classList.add('active');

    // Store completion in localStorage for persistence
    localStorage.setItem('partB_lesson7_remake_complete', 'true');
    markCurrentLessonComplete();

    // Trigger celebration animation
    createCelebration();

  } else {
    // NEEDS IMPROVEMENT: Show what's missing and what's working
    const mainSuggestion = suggestions.length > 0 ? suggestions[0] : 'Add the missing box model properties';

    feedback.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <span style="font-size: 1.8em;">🤔</span>
                <div style="flex: 1;">
                    <div style="font-size: 1.1em; margin-bottom: 10px;">
                        <strong>Let's improve your box model demo:</strong>
                    </div>
                    ${errorMessages.length > 0 ? `
                        <div style="margin-bottom: 12px;">
                            <strong>Missing requirements:</strong>
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

// ============================================================================
// CELEBRATION ANIMATION
// ============================================================================

/**
 * Creates a confetti celebration animation for successful completion
 * Generates colorful animated particles across the screen
 */
function createCelebration() {
  // Array of celebration colors
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];

  // Create 60 confetti particles
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
    // Clean up confetti after animation completes
    setTimeout(() => confetti.remove(), 6000);
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Initialize the demo and task previews when page loads
updateDemo();
renderTask();

// ============================================================================
// NEXT LESSON NAVIGATION
// ============================================================================

/**
 * Handle next lesson button click
 * Shows completion message and navigates to next lesson
 */
document.getElementById('nextLessonBtn').addEventListener('click', function() {
  if (!this.disabled) {
    alert('🎉 Congratulations! You\'ve completed Lesson 7 - CSS Box Model!\n\nYou\'ve mastered margin, padding, and border properties - the foundation of professional web layouts. Great job!');

    // Navigate to next lesson (uncomment and modify as needed)
    window.location.href = '/2. partB/lesson8_remake.html';
  }
});

// ============================================================================
// LESSON COMPLETION PERSISTENCE
// ============================================================================

/**
 * Check if lesson was previously completed and restore UI state
 * This function runs when the page loads to handle returning users
 * Restores completion status, enables next button, and updates progress
 */
function checkAndRestoreCompletion() {
  // Wait for DOM to be ready before checking completion status
  setTimeout(() => {
    const isCompleted = localStorage.getItem('partB_lesson7_remake_complete') === 'true';

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
// PAGE LOAD HANDLERS
// ============================================================================

// Multiple initialization methods to ensure completion check runs
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkAndRestoreCompletion);
} else {
  checkAndRestoreCompletion();
}

// Backup initialization with delay
setTimeout(checkAndRestoreCompletion, 500);

/* Pass checked_1 */