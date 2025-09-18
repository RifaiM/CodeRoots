// Undo/Redo system variables - must be declared at the top
let undoStack = [];
let redoStack = [];
let lastValue = '';
let isUndoRedo = false;
const MAX_UNDO_STACK = 50; // Limit stack size to prevent memory issues

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

${demoCode.value}
</style>
</head>
<body>
<h1>🌟 Welcome to CSS Styling</h1>
<p>This webpage demonstrates how CSS transforms plain HTML into visually appealing content with colors, fonts, spacing, and interactive effects.</p>

<div class="highlight">
<strong>🎨 Highlighted Section</strong><br>
This section uses CSS classes to create a distinct visual appearance with background colors, padding, and borders.
</div>

<p>CSS allows you to control every aspect of your webpage's appearance, from colors and fonts to layout and animations.</p>

<button class="button">Click Me! 🚀</button>

<p><strong>Key Benefits:</strong> Better user experience, professional appearance, and easier maintenance.</p>
</body>
</html>`;
}

// Task functionality
const taskEditor = document.getElementById('task-code');
const taskPreview = document.getElementById('task-preview');

// Undo/Redo system functions
function saveState(textarea = null) {
  if (isUndoRedo) return;

  const editor = textarea || taskEditor;
  if (!editor) return;

  const currentValue = editor.value;

  // Only save if content actually changed
  if (currentValue !== lastValue) {
    // Add current state to undo stack
    undoStack.push({
      value: lastValue,
      selectionStart: editor.selectionStart || 0,
      selectionEnd: editor.selectionEnd || 0
    });

    // Limit stack size
    if (undoStack.length > MAX_UNDO_STACK) {
      undoStack.shift();
    }

    // Clear redo stack when new changes are made
    redoStack = [];

    lastValue = currentValue;
  }
}

function undo(textarea = null) {
  const editor = textarea || taskEditor;
  if (!editor || undoStack.length === 0) return;

  isUndoRedo = true;

  // Save current state to redo stack before undoing
  redoStack.push({
    value: editor.value,
    selectionStart: editor.selectionStart,
    selectionEnd: editor.selectionEnd
  });

  // Get previous state
  const previousState = undoStack.pop();

  // Restore previous state
  editor.value = previousState.value;
  editor.selectionStart = previousState.selectionStart;
  editor.selectionEnd = previousState.selectionEnd;

  lastValue = previousState.value;

  // Trigger input event to update preview
  editor.dispatchEvent(new Event('input', {
    bubbles: true
  }));

  isUndoRedo = false;
}

function redo(textarea = null) {
  const editor = textarea || taskEditor;
  if (!editor || redoStack.length === 0) return;

  isUndoRedo = true;

  // Save current state to undo stack before redoing
  undoStack.push({
    value: editor.value,
    selectionStart: editor.selectionStart,
    selectionEnd: editor.selectionEnd
  });

  // Get next state
  const nextState = redoStack.pop();

  // Restore next state
  editor.value = nextState.value;
  editor.selectionStart = nextState.selectionStart;
  editor.selectionEnd = nextState.selectionEnd;

  lastValue = nextState.value;

  // Trigger input event to update preview
  editor.dispatchEvent(new Event('input', {
    bubbles: true
  }));

  isUndoRedo = false;
}

// Cursor position tracking variables
let currentLine = null;
let currentCol = null;

// Function to update cursor position display
function updateCursorPosition(textarea) {
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

// Enhanced textarea functionality for code editing
function enhanceTextareaForCoding(textarea) {
  const INDENT_SIZE = 2;
  const INDENT_CHAR = ' '.repeat(INDENT_SIZE);

  // Initialize undo system
  lastValue = textarea.value;
  saveState(textarea);

  // Add cursor position tracking - BUT AVOID DUPLICATES
  textarea.addEventListener('keyup', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key)) {
      updateCursorPosition(textarea);
    }
  });

  textarea.addEventListener('click', () => updateCursorPosition(textarea));

  // Use input event for most updates, but debounce it slightly
  let updateTimeout;
  textarea.addEventListener('input', () => {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => updateCursorPosition(textarea), 1);
  });

  textarea.addEventListener('keydown', function(e) {
    // Handle Ctrl+Z (Undo) and Ctrl+Y (Redo)
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo(textarea);
        return;
      } else if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
        e.preventDefault();
        redo(textarea);
        return;
      }
    }

    // Save state before potentially destructive operations
    if (!e.ctrlKey && !e.metaKey && !e.altKey) {
      if (e.key.length === 1 || ['Enter', 'Backspace', 'Delete', 'Tab'].includes(e.key)) {
        saveState(textarea);
      }
    }

    // Handle Tab key
    if (e.key === 'Tab') {
      e.preventDefault();

      const start = this.selectionStart;
      const end = this.selectionEnd;
      const value = this.value;

      if (e.shiftKey) {
        // Shift+Tab: Remove indentation
        const lineStart = value.lastIndexOf('\n', start - 1) + 1;
        const lineEnd = value.indexOf('\n', end);
        const actualLineEnd = lineEnd === -1 ? value.length : lineEnd;

        const beforeCursor = value.substring(0, lineStart);
        const selectedLines = value.substring(lineStart, actualLineEnd);
        const afterCursor = value.substring(actualLineEnd);

        const unindentedLines = selectedLines.split('\n').map(line => {
          if (line.startsWith(INDENT_CHAR)) {
            return line.substring(INDENT_SIZE);
          } else if (line.startsWith('\t')) {
            return line.substring(1);
          } else if (line.startsWith(' ')) {
            let spacesToRemove = 0;
            for (let i = 0; i < Math.min(INDENT_SIZE, line.length); i++) {
              if (line[i] === ' ') spacesToRemove++;
              else break;
            }
            return line.substring(spacesToRemove);
          }
          return line;
        }).join('\n');

        this.value = beforeCursor + unindentedLines + afterCursor;

        const removedChars = selectedLines.length - unindentedLines.length;
        this.selectionStart = Math.max(lineStart, start - Math.min(removedChars, start - lineStart));
        this.selectionEnd = Math.max(lineStart, end - removedChars);

      } else {
        // Regular Tab: Add indentation
        if (start === end) {
          this.value = value.substring(0, start) + INDENT_CHAR + value.substring(end);
          this.selectionStart = this.selectionEnd = start + INDENT_SIZE;
        } else {
          const lineStart = value.lastIndexOf('\n', start - 1) + 1;
          const lineEnd = value.indexOf('\n', end);
          const actualLineEnd = lineEnd === -1 ? value.length : lineEnd;

          const beforeCursor = value.substring(0, lineStart);
          const selectedLines = value.substring(lineStart, actualLineEnd);
          const afterCursor = value.substring(actualLineEnd);

          const indentedLines = selectedLines.split('\n').map(line => INDENT_CHAR + line).join('\n');

          this.value = beforeCursor + indentedLines + afterCursor;

          const addedChars = indentedLines.length - selectedLines.length;
          this.selectionStart = start + INDENT_SIZE;
          this.selectionEnd = end + addedChars;
        }
      }

      this.dispatchEvent(new Event('input', {
        bubbles: true
      }));
    }

    // Handle Enter key for auto-indentation
    else if (e.key === 'Enter') {
      const start = this.selectionStart;
      const value = this.value;

      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const currentLine = value.substring(lineStart, start);

      const leadingWhitespace = currentLine.match(/^[\t ]*/)[0];
      let indentLevel = 0;

      for (let i = 0; i < leadingWhitespace.length; i++) {
        if (leadingWhitespace[i] === '\t') {
          indentLevel += 1;
        } else if (leadingWhitespace[i] === ' ') {
          indentLevel += (1 / INDENT_SIZE);
        }
      }

      indentLevel = Math.round(indentLevel);

      const needsExtraIndent = /[{([]$/.test(currentLine.trim()) ||
        /<[^>]*>$/.test(currentLine.trim());

      if (needsExtraIndent) {
        indentLevel += 1;
      }

      const newIndent = INDENT_CHAR.repeat(indentLevel);

      e.preventDefault();
      const newValue = value.substring(0, start) + '\n' + newIndent + value.substring(this.selectionEnd);
      this.value = newValue;
      this.selectionStart = this.selectionEnd = start + 1 + newIndent.length;

      this.dispatchEvent(new Event('input', {
        bubbles: true
      }));
    }
  });

  // Save state on regular input (for normal typing)
  textarea.addEventListener('input', function(e) {
    if (!isUndoRedo) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = setTimeout(() => {
        if (textarea.value !== lastValue) {
          lastValue = textarea.value;
        }
      }, 500);
    }
  });

  // Styling
  textarea.style.fontFamily = 'Consolas, Monaco, "Courier New", monospace';
  textarea.style.fontSize = '14px';
  textarea.style.lineHeight = '1.5';
  textarea.style.tabSize = '2';

  // Initialize cursor position
  updateCursorPosition(textarea);
}

// task editor
document.addEventListener('DOMContentLoaded', function() {
  currentLine = document.getElementById('current-line');
  currentCol = document.getElementById('current-col');

  const taskEditor = document.getElementById('task-code');
  if (taskEditor) {
    enhanceTextareaForCoding(taskEditor);
  }

  // Also apply to demo editor if it exists
  const demoEditor = document.getElementById('demo-code');
  if (demoEditor) {
    enhanceTextareaForCoding(demoEditor);
  }
});

// Alternative simpler version if you just want basic Tab functionality:
function simpleTabSupport(textarea) {
  textarea.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = this.selectionStart;
      const end = this.selectionEnd;

      // Insert tab character at cursor position
      this.value = this.value.substring(0, start) + '\t' + this.value.substring(end);
      this.selectionStart = this.selectionEnd = start + 1;

      // Trigger input event for any listeners
      this.dispatchEvent(new Event('input', {
        bubbles: true
      }));
    }
  });
}

function renderTask() {
  const code = taskEditor.value;
  // Clean code by removing live server scripts
  let cleanCode = code.replace(/<script[^>]*>[\s\S]*?Live reload enabled[\s\S]*?<\/script>/gi, '');
  cleanCode = cleanCode.replace(/<script[^>]*>[\s\S]*?websocket[\s\S]*?<\/script>/gi, '');
  cleanCode = cleanCode.replace(/<!--[\s\S]*?Live reload[\s\S]*?-->/gi, '');

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
<h2>✏️ Start Creating Your CSS!</h2>
<p>Write your HTML with CSS styling in the editor...</p>
</div>
</body>
</html>`;
}

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

renderTask();

// Interactive functions
function highlightCSSType(element, type) {
  // Remove previous highlights
  document.querySelectorAll('.css-type-card').forEach(el => {
    el.style.background = 'linear-gradient(135deg, #f8f9ff 0%, #f3e5f5 100%)';
    el.style.borderColor = 'var(--border)';
  });

  // Highlight clicked card
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

function showPropertyDemo(element, property) {
  const demos = {
    color: "🎨 The color property changes text color:\n\n• color: red;\n• color: #007BFF;\n• color: rgb(255, 0, 0);\n• color: rgba(0, 123, 255, 0.8);\n\n💡 Tips:\n- Use hex codes (#FF0000) for precision\n- Use named colors (red, blue) for simplicity\n- Use rgba() for transparency effects",
    background: "🌈 Background adds color/image behind content:\n\n• background: yellow;\n• background: #f8f9ff;\n• background: linear-gradient(blue, red);\n• background: url('image.jpg');\n• background-color: lightblue;\n\n💡 Tips:\n- background is shorthand for multiple properties\n- Use gradients for modern effects\n- background-color for solid colors only",
    'font-family': "🔤 Font-family changes the text font:\n\n• font-family: Arial;\n• font-family: 'Times New Roman';\n• font-family: Arial, sans-serif;\n• font-family: 'Georgia', serif;\n\n💡 Tips:\n- Always provide fallbacks (Arial, sans-serif)\n- Use quotes for multi-word fonts\n- Web-safe fonts work everywhere",
    'font-size': "📏 Font-size controls text size:\n\n• font-size: 16px; (pixels)\n• font-size: 1.2rem; (relative to root)\n• font-size: 1.2em; (relative to parent)\n• font-size: large; (keyword)\n\n💡 Tips:\n- px for precise control\n- rem for responsive design\n- em for nested scaling",
    padding: "📦 Padding adds space inside elements:\n\n• padding: 20px; (all sides)\n• padding: 10px 15px; (vertical horizontal)\n• padding: 5px 10px 15px 20px; (top right bottom left)\n• padding-top: 10px; (specific side)\n\n💡 Tips:\n- Creates breathing room inside elements\n- Affects element's total size\n- Use shorthand for efficiency",
    margin: "🎯 Margin adds space outside elements:\n\n• margin: 20px; (all sides)\n• margin: 10px auto; (center horizontally)\n• margin: 0 0 15px 0; (bottom only)\n• margin-bottom: 20px; (specific side)\n\n💡 Tips:\n- Creates space between elements\n- margin: auto centers elements\n- Margins can collapse vertically",
    border: "🖼️ Border adds lines around elements:\n\n• border: 1px solid black;\n• border: 2px dashed red;\n• border: 3px double blue;\n• border-top: 1px solid #ccc;\n\n💡 Tips:\n- Format: width style color\n- Many styles: solid, dashed, dotted\n- Can target individual sides",
    'border-radius': "⭕ Border-radius makes rounded corners:\n\n• border-radius: 5px; (all corners)\n• border-radius: 50%; (circle)\n• border-radius: 10px 0 10px 0; (alternating)\n• border-top-left-radius: 15px;\n\n💡 Tips:\n- 50% creates perfect circles/ovals\n- Great for modern button designs\n- Can target individual corners"
  };

  // Highlight property
  document.querySelectorAll('.property-card').forEach(el => {
    el.style.background = 'var(--property-bg)';
  });
  element.style.background = 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)';

  // Show popup instead of alert
  showPropertyPopup(property.replace('-', '-').toUpperCase(), demos[property]);
}

function showPropertyPopup(title, content) {
  // Remove existing popup if any
  const existingPopup = document.querySelector('.property-popup');
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create popup elements
  const popup = document.createElement('div');
  popup.className = 'property-popup';
  popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-header">
                <h3>${title}</h3>
                <button class="popup-close">&times;</button>
            </div>
            <div class="popup-body">
                <pre>${content}</pre>
            </div>
        </div>
    `;

  document.body.appendChild(popup);

  // Add close functionality
  popup.querySelector('.popup-close').addEventListener('click', () => {
    popup.remove();
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.remove();
    }
  });

  // Show with animation
  setTimeout(() => {
    popup.classList.add('show');
  }, 10);
}

function highlightSelector(element, type) {
  // Remove previous highlights
  document.querySelectorAll('.selector-card').forEach(el => {
    el.style.background = 'linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)';
    el.style.borderColor = '#4caf50';
  });

  // Highlight clicked card
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

  setTimeout(() => sparkle.remove(), 1000);
}

function showBenefitInfo(element, benefit) {
  const info = {
    visual: "🌈 Visual Appeal: CSS transforms boring black text on white backgrounds into engaging, colorful designs with fonts, images, animations, and interactive effects that capture user attention.",
    separation: "🗂️ Separation of Concerns: CSS keeps your content (HTML) separate from styling, making code cleaner, more organized, and easier for teams to work on simultaneously.",
    responsive: "📱 Responsive Design: CSS media queries and flexible layouts automatically adapt your website to look great on phones, tablets, desktops, and any screen size.",
    maintenance: "🔧 Easy Maintenance: Change one CSS file and update styling across hundreds of pages instantly. No more hunting through HTML files to update colors or fonts!"
  };

  // Highlight the clicked benefit
  document.querySelectorAll('.benefit-item').forEach(el => {
    el.style.background = 'linear-gradient(135deg, #f2f6ff 0%, #e3f2fd 100%)';
  });
  element.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';

  // Create info popup similar to property popup
  const popup = document.createElement('div');
  popup.className = 'property-popup';
  popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-header">
                <h3>CSS Benefits</h3>
                <button class="popup-close">&times;</button>
            </div>
            <div class="popup-body">
                <div style="font-size: 1.1em; margin-bottom: 15px; line-height: 1.5;">
                    ${info[benefit]}
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(popup);

  // Add close functionality
  popup.querySelector('.popup-close').addEventListener('click', () => {
    popup.remove();
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.remove();
    }
  });

  // Show with animation
  setTimeout(() => {
    popup.classList.add('show');
  }, 10);
}

function showHint() {
  const hints = [
    "🎨 Start with basic HTML structure: &lt;html&gt;, &lt;head&gt;, &lt;body&gt;",
    "📝 Add &lt;style&gt; tags inside the &lt;head&gt; section",
    "🎯 Use element selectors like h1, p, body for basic styling",
    "🎪 Create class selectors with .classname and use them in HTML",
    "🌈 Don't forget the required properties: color, font-family, background",
    "✨ Remember CSS syntax: selector { property: value; }",
    "📝 Check for missing closing tags like &lt;/html&gt; or &lt;/body&gt;",
    "⚙️ Don't forget semicolons after each CSS property value"
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

// Enhanced HTML/CSS validation functions
function validateHTMLStructure(code) {
  const errors = [];
  const warnings = [];

  // Check for basic HTML structure
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

  // Check for unclosed tags (common HTML tags)
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

  // Check for incomplete closing tags
  const incompleteClose = /<\/[a-zA-Z][^>]*[^>]$/gm;
  if (incompleteClose.test(code)) {
    errors.push('Some closing tags are incomplete or missing &gt;');
  }

  return {
    errors,
    warnings
  };
}

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

  let cssCode = styleMatch[1];
  
  // FIXED: Remove all CSS comments before validation to avoid false positives
  // Remove single-line comments /* comment */
  cssCode = cssCode.replace(/\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\//g, '');
  
  // Remove multi-line comments /* 
  // comment 
  // */
  cssCode = cssCode.replace(/\/\*[\s\S]*?\*\//g, '');

  // Check for missing semicolons
  const cssRules = cssCode.match(/[^{}]+\{[^{}]*\}/g) || [];
  cssRules.forEach((rule, index) => {
    const propertySection = rule.match(/\{([^}]*)\}/);
    if (propertySection && propertySection[1]) {
      // FIXED: Better filtering of CSS properties vs comments/empty lines
      const properties = propertySection[1]
        .split('\n')
        .map(line => line.trim())
        .filter(line => {
          // Skip empty lines
          if (!line) return false;
          // Skip lines that don't contain CSS properties (no colon)
          if (!line.includes(':')) return false;
          // Skip remaining comment fragments (shouldn't happen after comment removal above)
          if (line.startsWith('/*') || line.endsWith('*/')) return false;
          return true;
        });
        
      properties.forEach(prop => {
        const trimmedProp = prop.trim();
        if (trimmedProp && trimmedProp.includes(':') && !trimmedProp.endsWith(';')) {
          errors.push(`Missing semicolon after CSS property: "${trimmedProp}"`);
        }
      });
    }
  });

  // Check for unclosed CSS blocks
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

function checkAnswer() {
  const code = taskEditor.value.trim();

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
                        <strong>💡 Get started:</strong> Create an HTML page with CSS styling in the editor above.
                    </div>
                </div>
            </div>
        `;
    feedback.className = 'feedback error';
    return;
  }

  // Clean code by removing live server scripts
  let cleanCode = code.replace(/<script[^>]*>[\s\S]*?Live reload enabled[\s\S]*?<\/script>/gi, '');
  cleanCode = cleanCode.replace(/<script[^>]*>[\s\S]*?websocket[\s\S]*?<\/script>/gi, '');
  cleanCode = cleanCode.replace(/<!--[\s\S]*?Live reload[\s\S]*?-->/gi, '');

  // Validate HTML and CSS structure first
  const htmlValidation = validateHTMLStructure(cleanCode);
  const cssValidation = validateCSSStructure(cleanCode);

  // If there are structural errors, show them first
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

  const codeClean = cleanCode.toLowerCase().replace(/\s+/g, ' ').trim();

  // Check for required CSS properties
  const hasColor = /color\s*:\s*[^;]+/i.test(cleanCode);
  const hasFontFamily = /font-family\s*:\s*[^;]+/i.test(cleanCode);
  const hasBackground = /background(-color)?\s*:\s*[^;]+/i.test(cleanCode);

  // Check for CSS syntax structure
  const hasSelector = /[a-z#.][a-z0-9#.-]*\s*{[^}]*}/i.test(cleanCode);
  const hasValidCSSSyntax = /[^{}]*{\s*[^{}]*:\s*[^{}]*;[^{}]*}/i.test(cleanCode);

  // Check for HTML structure
  const hasHtml = /<html[^>]*>[\s\S]*<\/html>/i.test(cleanCode) || /<body[^>]*>[\s\S]*<\/body>/i.test(cleanCode);
  const hasHead = /<head[^>]*>[\s\S]*<\/head>/i.test(cleanCode);
  const hasStyleTag = /<style[^>]*>[\s\S]*<\/style>/i.test(cleanCode);

  // Check for content in body
  const hasBodyContent = /<body[^>]*>[\s\S]*?<[^>]*>[\s\S]*?<\/[^>]*>[\s\S]*?<\/body>/i.test(cleanCode) ||
    /<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/i.test(cleanCode) ||
    /<p[^>]*>[\s\S]*?<\/p>/i.test(cleanCode);

  // Check for class usage (good practice)
  const hasClassSelector = /\.[a-z][a-z0-9-]*\s*{/i.test(cleanCode);
  const hasClassAttribute = /class\s*=\s*['""][^'""]*['"]/i.test(cleanCode);

  // Check for element selectors
  const hasElementSelector = /^[a-z][a-z0-9]*\s*{/im.test(cleanCode) ||
    /}\s*[a-z][a-z0-9]*\s*{/im.test(cleanCode) ||
    />\s*[a-z][a-z0-9]*\s*{/im.test(cleanCode);

  let errorMessages = [];
  let successMessages = [];
  let warningMessages = [];

  // Check basic HTML structure
  if (!hasHtml || !hasBodyContent) {
    errorMessages.push('Create a complete HTML page with content in the body.');
  } else {
    successMessages.push('✅ Has HTML structure with content');
  }

  // Check for style implementation
  if (!hasStyleTag && !hasSelector) {
    errorMessages.push('Add CSS styling using &lt;style&gt; tags in the &lt;head&gt; section.');
  } else if (hasStyleTag) {
    successMessages.push('✅ Uses &lt;style&gt; tags for CSS');
  }

  // Check CSS syntax
  if (!hasValidCSSSyntax && hasStyleTag) {
    errorMessages.push('Check your CSS syntax: selector { property: value; }');
  } else if (hasValidCSSSyntax) {
    successMessages.push('✅ Proper CSS syntax structure');
  }

  // Check required properties
  if (!hasColor) {
    errorMessages.push('Missing "color" property. Add color styling to an element.');
  } else {
    successMessages.push('✅ Uses color property');
  }

  if (!hasFontFamily) {
    errorMessages.push('Missing "font-family" property. Set the font for your text.');
  } else {
    successMessages.push('✅ Uses font-family property');
  }

  if (!hasBackground) {
    errorMessages.push('Missing "background" or "background-color" property. Add background styling.');
  } else {
    successMessages.push('✅ Uses background property');
  }

  // Check selectors
  if (!hasElementSelector && hasValidCSSSyntax) {
    warningMessages.push('Consider using element selectors like h1, p, body, etc.');
  } else if (hasElementSelector) {
    successMessages.push('✅ Uses element selectors');
  }

  if (hasClassSelector && hasClassAttribute) {
    successMessages.push('✅ Great! Uses class selectors and attributes');
  } else if (hasClassSelector && !hasClassAttribute) {
    warningMessages.push('You have CSS class selectors but no HTML elements using those classes.');
  } else if (!hasClassSelector) {
    warningMessages.push('Try adding a class selector (.classname) for better styling control.');
  }

  // Check for common CSS best practices
  if (codeClean.includes('style=')) {
    warningMessages.push('Avoid inline styles. Use &lt;style&gt; tags or external CSS instead.');
  }

  // Display feedback
  const feedback = document.getElementById('feedback');
  const nextBtn = document.getElementById('nextLessonBtn');
  const stepsElements = document.querySelectorAll('.step');

  if (errorMessages.length === 0) {
    let feedbackContent = `
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <span style="font-size: 2em;">🎉</span>
                <div style="flex: 1;">
                    <div style="font-size: 1.2em; margin-bottom: 8px;">
                        <strong>Perfect CSS Styling!</strong>
                    </div>
                    <div style="margin-bottom: 12px;">
                        ${successMessages.join('<br>')}
                    </div>`;

    if (warningMessages.length > 0) {
      feedbackContent += `<div style="margin-bottom: 12px;">
                <strong>💡 Tips for improvement:</strong><br>${warningMessages.join('<br>')}
            </div>`;
    }

    feedbackContent += `
            <div style="opacity: 0.9; background: rgba(39,174,96,0.1); padding: 8px 12px; border-radius: 6px; font-size: 0.95em;">
                🚀 Excellent! You've successfully transformed HTML with CSS styling!
            </div>
        </div>
    </div>
        `;

    feedback.innerHTML = feedbackContent;
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
    localStorage.setItem('partB_lesson6_remake_complete', 'true');
    markCurrentLessonComplete();

    // Trigger celebration animation
    createCelebration();

  } else {
    const mainSuggestion = errorMessages.length > 0 ? errorMessages[0] : 'Check your HTML structure carefully';

    feedback.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <span style="font-size: 1.8em;">🤔</span>
                <div style="flex: 1;">
                    <div style="font-size: 1.1em; margin-bottom: 10px;">
                        <strong>Let's improve your CSS styling:</strong>
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
    stepsElements[1].classList.add('active');
    stepsElements[2].classList.remove('active');

    // Keep next lesson button disabled
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.5';
    nextBtn.style.cursor = 'not-allowed';
    nextBtn.style.animation = 'none';
  }
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
    alert('🎉 Congratulations! You\'ve completed Lesson 6 - CSS Basics!\n\nYou\'ve learned how to style HTML with colors, fonts, backgrounds, and selectors. You\'re now ready to create beautiful web pages!');

    window.location.href = '/2. partB/lesson7/lesson7_remake.html';
  }
});

// Ensure next lesson button starts disabled
document.getElementById('nextLessonBtn').disabled = true;

// Check if lesson is already completed
if (localStorage.getItem('lesson6_remake_complete') === 'true') {
  const nextBtn = document.getElementById('nextLessonBtn');
  nextBtn.disabled = false;
  nextBtn.style.opacity = '1';
  nextBtn.style.cursor = 'pointer';

  // Update progress steps
  const stepsElements = document.querySelectorAll('.step');
  stepsElements[1].classList.add('active');
  stepsElements[2].classList.add('active');
}

/**
 * Check if lesson was previously completed and restore UI state
 * This runs when the page loads to handle returning users
 */
function checkAndRestoreCompletion() {
  // Wait a bit to ensure DOM is ready
  setTimeout(() => {
    const isCompleted = localStorage.getItem('partB_lesson6_remake_complete') === 'true';

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