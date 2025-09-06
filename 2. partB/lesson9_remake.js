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

function initHybridSystemWithLineCol() {
  const taskEditor = document.getElementById('task-code');
  if (taskEditor) {
    addTabSupportWithNativeUndo(taskEditor);
    updateLineColumnNumbers(taskEditor); // Add this line
    console.log('✅ Hybrid system: Tab support + native undo/paste + line/col tracking');
  }
  
  const demoCode = document.getElementById('demo-code');
  if (demoCode) {
    addTabSupportWithNativeUndo(demoCode);
    updateLineColumnNumbers(demoCode); // Add this line too if you want it for demo code
  }
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHybridSystemWithLineCol);
} else {
  initHybridSystemWithLineCol();
}

setTimeout(initHybridSystemWithLineCol, 100);

// Updated position info data with accurate descriptions
const positionData = {
  static: {
    title: "📄 Static Positioning (Default)",
    description: "Elements follow normal document flow, stacking vertically like paragraphs in a document. The top, right, bottom, and left properties have no effect. This is the default behavior for all elements.",
    demoClass: "static"
  },
  relative: {
    title: "📄 Relative Positioning", 
    description: "Element is offset from its normal position, but other elements still reserve space for it as if it hadn't moved. The element is moved visually but its original space remains occupied.",
    demoClass: "relative"
  },
  absolute: {
    title: "🎯 Absolute Positioning",
    description: "Element is removed from normal flow and positioned relative to its nearest positioned ancestor (the blue container in this demo). Other elements act as if this element doesn't exist.",
    demoClass: "absolute"
  },
  fixed: {
    title: "📌 Fixed Positioning",
    description: "Element is positioned relative to the viewport (your browser window) and stays in the same position even when you scroll. Notice how this box appears to 'stick' to your screen.",
    demoClass: "fixed"
  }
};

// Enhanced playground functionality with proper demo handling
function initPlayground() {
  const buttons = document.querySelectorAll('.position-btn');
  const demoBox = document.getElementById('demo-box');
  const positionInfo = document.getElementById('position-info');
  const playground = document.querySelector('.positioning-playground');
  const demoContainer = document.getElementById('demo-container');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const position = button.dataset.position;
      
      // Update active button
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Handle special case for fixed positioning
      if (position === 'fixed') {
        // Add scrollable content to demonstrate fixed positioning
        playground.classList.add('show-fixed');
        
        // Add scroll content if it doesn't exist
        if (!demoContainer.querySelector('.scroll-content')) {
          const scrollContent = document.createElement('div');
          scrollContent.className = 'scroll-content';
          demoContainer.appendChild(scrollContent);
        }
        
        // Update all demo boxes for fixed demonstration
        const allBoxes = demoContainer.querySelectorAll('.demo-box');
        allBoxes.forEach((box, index) => {
          if (index === 0) {
            box.className = `demo-box ${position} animate`;
            box.innerHTML = `Fixed Box<br><small>Stays in viewport</small>`;
          } else {
            box.style.display = 'none'; // Hide other boxes for clarity
          }
        });
      } else {
        // Remove fixed demo modifications
        playground.classList.remove('show-fixed');
        const scrollContent = demoContainer.querySelector('.scroll-content');
        if (scrollContent) scrollContent.remove();
        
        // Show all boxes and update first box
        const allBoxes = demoContainer.querySelectorAll('.demo-box');
        allBoxes.forEach((box, index) => {
          box.style.display = 'flex';
          if (index === 0) {
            box.className = `demo-box ${position} animate`;
            const labels = {
              static: { main: 'Static Box', sub: 'Normal flow' },
              relative: { main: 'Relative Box', sub: 'Offset position' },
              absolute: { main: 'Absolute Box', sub: 'Precise placement' }
            };
            const label = labels[position] || { main: 'Demo Box', sub: 'Positioned' };
            box.innerHTML = `${label.main}<br><small>${label.sub}</small>`;
          } else {
            box.className = `demo-box static`;
            box.innerHTML = `Box ${index + 1}<br><small>Static flow</small>`;
          }
        });
      }
      
      // Update info panel
      const info = positionData[position];
      positionInfo.innerHTML = `
        <h4>${info.title}</h4>
        <p>${info.description}</p>
        ${position === 'fixed' ? '<p><strong>💡 Tip:</strong> Scroll within this demo area to see how the fixed element behaves!</p>' : ''}
      `;
      positionInfo.classList.add('animate');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        const animatedBox = demoContainer.querySelector('.animate');
        if (animatedBox) animatedBox.classList.remove('animate');
        positionInfo.classList.remove('animate');
      }, 500);
    });
  });
}

// Enhanced highlight position function
function highlightPosition(position) {
  // Find the corresponding playground button and trigger it
  const button = document.querySelector(`[data-position="${position}"]`);
  if (button) {
    button.click();
  }
  
  // Add visual feedback with position-specific colors
  const card = document.querySelector(`.${position}-card`);
  const colors = {
    static: 'rgba(96, 125, 139, 0.3)',
    relative: 'rgba(255, 152, 0, 0.3)', 
    absolute: 'rgba(233, 30, 99, 0.3)',
    fixed: 'rgba(76, 175, 80, 0.3)'
  };
  
  card.style.transform = 'scale(1.05)';
  card.style.boxShadow = `0 12px 28px ${colors[position] || 'rgba(0,123,255,0.3)'}`;
  
  setTimeout(() => {
    card.style.transform = '';
    card.style.boxShadow = '';
  }, 300);
}

// Initialize demos
const demoCode = document.getElementById('demo-code');
const demoPreview = document.getElementById('demo-preview');

function updateDemo() {
  demoPreview.srcdoc = demoCode.value;
}

// Add this function to track cursor position in textarea
function updateLineColumnNumbers(textarea) {
  const currentLineSpan = document.getElementById('current-line');
  const currentColSpan = document.getElementById('current-col');
  
  if (!currentLineSpan || !currentColSpan || !textarea) {
    return;
  }
  
  function updatePosition() {
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    
    // Calculate line number (count newlines + 1)
    const lineNumber = textBeforeCursor.split('\n').length;
    
    // Calculate column number (characters after last newline + 1)
    const lastNewlineIndex = textBeforeCursor.lastIndexOf('\n');
    const columnNumber = lastNewlineIndex === -1 
      ? cursorPosition + 1 
      : cursorPosition - lastNewlineIndex;
    
    // Update the display
    currentLineSpan.textContent = lineNumber;
    currentColSpan.textContent = columnNumber;
  }
  
  // Add event listeners for various cursor position changes
  textarea.addEventListener('click', updatePosition);
  textarea.addEventListener('keyup', updatePosition);
  textarea.addEventListener('keydown', updatePosition);
  textarea.addEventListener('input', updatePosition);
  textarea.addEventListener('paste', () => {
    // Small delay to ensure paste content is processed
    setTimeout(updatePosition, 10);
  });
  textarea.addEventListener('cut', updatePosition);
  textarea.addEventListener('select', updatePosition);
  textarea.addEventListener('focus', updatePosition);
  
  // Initial update
  updatePosition();
}

// Task functionality
const taskEditor = document.getElementById('task-code');
const taskPreview = document.getElementById('task-preview');

function renderTask() { 
  if (taskEditor && taskPreview) {
    const code = taskEditor.value;
    taskPreview.srcdoc = code || `<!DOCTYPE html>
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
    padding: 10px;
    border-radius: 10px;
    background: #f2f6ff;
  }
</style>
</head>
<body>
<div class="placeholder">
  <h2>✏️ Start Creating Your CSS Positioning!</h2>
</div>
</body>
</html>`;
  }
}

function showHint() {
  const hints = [
    "💡 Start with a complete HTML structure including &lt;!DOCTYPE html&gt;, &lt;head&gt;, and &lt;body&gt;",
    "🎯 Your footer needs position: fixed, bottom: 0, and width: 100%",
    "📏 Add margin-bottom or padding-bottom to your content to prevent footer overlap",
    "🗿 Include a header with &lt;h1&gt;, main content with &lt;p&gt; tags, and a footer",
    "🎨 Try adding an element with position: absolute for extra credit!",
    "⚠️ Don't forget to add CSS styling inside &lt;style&gt; tags in the &lt;head&gt;"
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

/**
 * HTML encode for safe display
 */
function htmlEncode(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Get line number from character index
 */
function getLineFromIndex(code, index) {
  return code.substring(0, index).split('\n').length;
}

/**
 * Find line number helper
 */
function findLineNumber(code, pattern) {
  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (pattern.test(lines[i])) {
      return i + 1;
    }
  }
  return null;
}

// ============================================================================
// SIMPLIFIED ERROR DETECTION FUNCTIONS
// ============================================================================

/**
 * Simple validation for incomplete tags (missing > or < characters)
 */
function validateIncompleteTags(code, results) {
  const lines = code.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;
    
    // Check for tags missing closing >
    const incompleteTagPattern = /<([a-zA-Z!][a-zA-Z0-9]*)\s*[^>]*$/;
    const match = line.match(incompleteTagPattern);
    
    if (match && !line.includes('>')) {
      const tagName = match[1];
      results.html.errors.push({
        line: lineNumber,
        message: `Missing '&gt;' for &lt;${tagName} tag`
      });
      return;
    }
    
    // Check for malformed closing tags missing >
    const malformedClosingPattern = /<\/([a-zA-Z][a-zA-Z0-9]*)\s*[^>]*$/;
    const closingMatch = line.match(malformedClosingPattern);
    
    if (closingMatch && !line.includes('>')) {
      const tagName = closingMatch[1];
      results.html.errors.push({
        line: lineNumber,
        message: `Missing '&gt;' for &lt;/${tagName} closing tag`
      });
      return;
    }
    
    // Check for stray < without proper tag formation
    if (line.includes('<')) {
      const tagMatches = line.match(/<[^>]*>/g);
      const openAngleBrackets = (line.match(/</g) || []).length;
      const validTags = (tagMatches || []).length;
      
      if (openAngleBrackets > validTags) {
        results.html.errors.push({
          line: lineNumber,
          message: `Invalid '&lt;' character - check tag syntax`
        });
        return;
      }
    }
    
    // Check for stray > characters
    if (line.includes('>')) {
      const tagMatches = line.match(/<[^>]*>/g);
      const closeAngleBrackets = (line.match(/>/g) || []).length;
      const validTags = (tagMatches || []).length;
      
      if (closeAngleBrackets > validTags) {
        results.html.errors.push({
          line: lineNumber,
          message: `Invalid '&gt;' character - missing opening '&lt;'`
        });
        return;
      }
    }
  }
}

/**
 * Simple validation for missing closing tags in HTML
 */
function validateMissingClosingTags(code, results) {
  const selfClosingTags = ['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr', '!doctype'];
  const tagStack = [];
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/gi;
  let match;
  
  while ((match = tagRegex.exec(code)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const lineNumber = getLineFromIndex(code, match.index);
    
    // Skip self-closing tags and comments
    if (selfClosingTags.includes(tagName) || fullTag.startsWith('<!--')) {
      continue;
    }
    
    // Skip self-closed tags (ending with />)
    if (fullTag.endsWith('/>')) {
      continue;
    }
    
    if (fullTag.startsWith('</')) {
      // This is a closing tag
      if (tagStack.length === 0) {
        results.html.errors.push({
          line: lineNumber,
          message: `Unexpected closing tag &lt;/${tagName}&gt; - no matching opening tag`
        });
        return;
      } else {
        const lastOpenTag = tagStack.pop();
        if (lastOpenTag.name !== tagName) {
          results.html.errors.push({
            line: lineNumber,
            message: `Wrong closing tag: expected &lt;/${lastOpenTag.name}&gt; but found &lt;/${tagName}&gt;`
          });
          return;
        }
      }
    } else {
      // This is an opening tag
      tagStack.push({ name: tagName, line: lineNumber });
    }
  }
  
  // Check for unclosed opening tags
  if (tagStack.length > 0) {
    const unclosedTag = tagStack[tagStack.length - 1];
    results.html.errors.push({
      line: unclosedTag.line,
      message: `Missing closing tag for &lt;${unclosedTag.name}&gt;`
    });
  }
}

/**
 * Simple validation for missing opening tags  
 */
function validateMissingOpeningTags(code, results) {
  const selfClosingTags = ['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr'];
  const tagStack = [];
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/gi;
  let match;
  
  while ((match = tagRegex.exec(code)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const lineNumber = getLineFromIndex(code, match.index);
    
    // Skip self-closing tags
    if (selfClosingTags.includes(tagName) || fullTag.endsWith('/>')) {
      continue;
    }
    
    if (fullTag.startsWith('</')) {
      // Found a closing tag
      if (tagStack.length === 0) {
        results.html.errors.push({
          line: lineNumber,
          message: `Missing opening tag for &lt;${tagName}&gt;`
        });
        return;
      }
      
      const lastOpenTag = tagStack.pop();
      if (lastOpenTag.name !== tagName) {
        // The real issue is that the last opened tag wasn't closed
        results.html.errors.push({
          line: lastOpenTag.line,
          message: `Missing closing tag for &lt;${lastOpenTag.name}&gt;`
        });
        return;
      }
    } else {
      // Opening tag
      tagStack.push({ name: tagName, line: lineNumber });
    }
  }
}

/**
 * Simple validation function for missing semicolons in CSS
 */
function validateCSSSemicolons(cssCode, originalCode, results) {
  const lines = cssCode.split('\n');
  let braceCount = 0;
  let inRuleBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    const originalLine = line;
    const lineNumber = i + 1;
    
    if (!line) continue;
    
    // Handle comments
    line = line.replace(/\/\*.*?\*\//g, '').trim();
    if (line.includes('/*') && !line.includes('*/')) {
      // Multi-line comment starts, skip until it ends
      let j = i + 1;
      while (j < lines.length && !lines[j].includes('*/')) {
        j++;
      }
      i = j;
      continue;
    }
    
    if (!line) continue;
    
    // Track braces
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    
    braceCount += openBraces - closeBraces;
    
    if (openBraces > 0) inRuleBlock = true;
    if (closeBraces > 0 && braceCount === 0) inRuleBlock = false;
    
    // Check for CSS properties missing semicolons
    if (inRuleBlock && line.includes(':') && !line.includes('{') && !line.includes('}')) {
      // This looks like a CSS property declaration
      if (!line.endsWith(';')) {
        const actualLineNumber = findCSSLineInOriginal(originalCode, originalLine, lineNumber);
        results.css.errors.push({
          line: actualLineNumber,
          message: `Missing semicolon after CSS property: "${htmlEncode(line)}"`
        });
        return;
      }
    }
  }
}

/**
 * Simple JavaScript semicolon validation
 */
function validateJSSemicolons(jsCode, originalCode, results) {
  const lines = jsCode.split('\n');
  let inMultiLineComment = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    const originalLine = line;
    const lineNumber = i + 1;
    
    if (!line) continue;
    
    // Handle multi-line comments
    if (inMultiLineComment) {
      if (line.includes('*/')) {
        inMultiLineComment = false;
        line = line.split('*/').slice(1).join('*/').trim();
      } else {
        continue;
      }
    }
    
    if (line.includes('/*')) {
      if (!line.includes('*/')) {
        inMultiLineComment = true;
        line = line.split('/*')[0].trim();
      } else {
        line = line.replace(/\/\*.*?\*\//g, '').trim();
      }
    }
    
    // Skip single-line comments
    if (line.startsWith('//')) continue;
    
    // Remove inline comments
    if (line.includes('//')) {
      line = line.split('//')[0].trim();
    }
    
    if (!line) continue;
    
    // Check if this line needs a semicolon
    if (requiresSemicolon(line)) {
      const actualLineNumber = findJSLineInOriginal(originalCode, originalLine, lineNumber);
      results.javascript.errors.push({
        line: actualLineNumber,
        message: `Missing semicolon at end of statement: "${htmlEncode(line)}"`
      });
      return;
    }
  }
}

/**
 * Check if a JavaScript line requires a semicolon
 */
function requiresSemicolon(line) {
  // Already has semicolon
  if (line.endsWith(';')) return false;
  
  // Ends with braces, parentheses, or operators - no semicolon needed
  if (line.endsWith('{') || line.endsWith('}') || line.endsWith('(') || 
      line.endsWith(',') || line.endsWith('+') || line.endsWith('-') || 
      line.endsWith('*') || line.endsWith('/') || line.endsWith('=') ||
      line.endsWith('&&') || line.endsWith('||')) {
    return false;
  }
  
  // Control structures don't need semicolons
  const controlKeywords = /^(if|else|for|while|do|switch|case|default|function|try|catch|finally)\s*[\(\{]/;
  if (controlKeywords.test(line)) return false;
  
  // Just keywords or braces
  if (['else', 'try', 'finally', '}', ')', ']'].includes(line)) return false;
  
  // Patterns that DO need semicolons
  const needsSemicolonPatterns = [
    /^(var|let|const)\s+\w+/,           // Variable declarations
    /^\w+\s*[=]/,                       // Assignments
    /^return(\s|$)/,                    // Return statements
    /^\w+\(/,                           // Function calls
    /^(break|continue)(\s|$)/,          // Break/continue statements
    /^\+\+\w+/,                         // Pre-increment
    /^--\w+/,                           // Pre-decrement
    /^\w+\+\+/,                         // Post-increment
    /^\w+--/,                           // Post-decrement
    /^throw\s+/,                        // Throw statements
    /^delete\s+/,                       // Delete statements
    /^\w+\.\w+/,                        // Property access/method calls
    /^\d+/,                             // Numeric literals
    /^['"`]/,                           // String literals
    /^true|false|null|undefined$/       // Boolean/null literals
  ];
  
  return needsSemicolonPatterns.some(pattern => pattern.test(line));
}

/**
 * Helper function to extract CSS from HTML
 */
function extractCSSFromHTML(code) {
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let cssCode = '';
  let match;
  
  while ((match = styleRegex.exec(code)) !== null) {
    cssCode += match[1] + '\n';
  }
  
  return cssCode;
}

/**
 * Helper function to extract JavaScript from HTML
 */
function extractJSFromHTML(code) {
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let jsCode = '';
  let match;
  
  while ((match = scriptRegex.exec(code)) !== null) {
    jsCode += match[1] + '\n';
  }
  
  return jsCode;
}

// ============================================================================
// EXISTING VALIDATION FUNCTIONS (Simplified)
// ============================================================================

/**
 * Validate HTML attribute syntax - FIXED: Now properly detects missing equals signs
 */
function validateHTMLAttributes(code, results) {
  // Look for HTML tags with attributes
  const tagWithAttributesRegex = /<([a-zA-Z][a-zA-Z0-9]*)\s+([^>]+)>/g;
  let match;
  
  while ((match = tagWithAttributesRegex.exec(code)) !== null) {
    const tagName = match[1];
    const attributesString = match[2];
    const lineNumber = getLineFromIndex(code, match.index);
    
    // Check for common attribute syntax errors
    validateAttributeSyntax(attributesString, tagName, lineNumber, results);
    
    // Stop at first error to avoid cascading errors
    if (results.html.errors.length > 0) {
      break;
    }
  }
}

/**
 * Validate individual attribute syntax within a tag
 */
function validateAttributeSyntax(attributesString, tagName, lineNumber, results) {
  // Remove self-closing slash if present
  const cleanAttributes = attributesString.replace(/\s*\/\s*$/, '').trim();
  
  // Check for unmatched quotes - this is critical!
  validateQuoteMatching(cleanAttributes, lineNumber, results);
  
  // Check for attributes without equals signs (like class'value' instead of class='value')
  const invalidAttributePattern = /([a-zA-Z-]+)\s*(['"'][^'"]*['"])/g;
  let match;
  
  while ((match = invalidAttributePattern.exec(cleanAttributes)) !== null) {
    const attributeName = match[1];
    const attributeValue = match[2];
    
    // Check if there's an equals sign between them
    const fullMatch = match[0];
    if (!fullMatch.includes('=')) {
      results.html.errors.push({
        line: lineNumber,
        message: `Missing equals sign: "${htmlEncode(fullMatch)}" should be ${htmlEncode(attributeName)}=${attributeValue}`
      });
    }
  }
  
  // Check for attributes with equals but no quotes around values
  const missingQuotesPattern = /([a-zA-Z-]+)\s*=\s*([^'"\s>]+)/g;
  while ((match = missingQuotesPattern.exec(cleanAttributes)) !== null) {
    const attributeName = match[1];
    const attributeValue = match[2];
    
    // Skip if it's a boolean attribute or number
    if (!['true', 'false'].includes(attributeValue.toLowerCase()) && isNaN(attributeValue)) {
      results.html.errors.push({
        line: lineNumber,
        message: `Attribute value should be quoted: ${htmlEncode(attributeName)}="${htmlEncode(attributeValue)}"`
      });
    }
  }
  
  // Check for standalone quoted values (values without attribute names)
  const standaloneValuePattern = /(?:^|\s)(['"][^'"]*['"])(?=\s|$)/g;
  while ((match = standaloneValuePattern.exec(cleanAttributes)) !== null) {
    const standaloneValue = match[1];
    results.html.errors.push({
      line: lineNumber,
      message: `Found value ${htmlEncode(standaloneValue)} without an attribute name`
    });
  }
}

/**
 * Validate that quotes are properly matched in attributes
 */
function validateQuoteMatching(attributesString, lineNumber, results) {
  let singleQuoteCount = 0;
  let doubleQuoteCount = 0;
  let i = 0;
  
  while (i < attributesString.length) {
    const char = attributesString[i];
    
    if (char === "'") {
      singleQuoteCount++;
    } else if (char === '"') {
      doubleQuoteCount++;
    }
    
    i++;
  }
  
  // Check for unmatched single quotes
  if (singleQuoteCount % 2 !== 0) {
    results.html.errors.push({
      line: lineNumber,
      message: `Unmatched single quote (') in attributes`
    });
  }
  
  // Check for unmatched double quotes
  if (doubleQuoteCount % 2 !== 0) {
    results.html.errors.push({
      line: lineNumber,
      message: `Unmatched double quote (") in attributes`
    });
  }
}

/**
 * Simple HTML structure validation - only basic requirements
 */
function validateHTMLStructure(code, results) {
  // First check for basic syntax errors
  validateBasicHTMLSyntax(code, results);
  if (results.html.errors.length > 0) return; // Stop if syntax errors found
  
  validateHTMLQuotes(code, results);
  if (results.html.errors.length > 0) return; // Stop if quote errors found
  
  // Only check basic structure if syntax is okay
  if (!code.includes('<!DOCTYPE html>')) {
    results.html.errors.push({
      line: 1,
      message: 'Missing &lt;!DOCTYPE html&gt; at the beginning'
    });
    return;
  }
  
  if (!/<html[^>]*>/i.test(code)) {
    results.html.errors.push({
      line: 2,
      message: 'Missing &lt;html&gt; opening tag'
    });
    return;
  }
  
  if (!/<\/html>/i.test(code)) {
    results.html.errors.push({
      line: findLineNumber(code, /<\/html>/i) || code.split('\n').length,
      message: 'Missing &lt;/html&gt; closing tag'
    });
    return;
  }
  
  if (!/<head[^>]*>/i.test(code)) {
    results.html.errors.push({
      line: 3,
      message: 'Missing &lt;head&gt; opening tag'
    });
    return;
  }
  
  if (!/<\/head>/i.test(code)) {
    results.html.errors.push({
      line: findLineNumber(code, /<\/head>/i) || 4,
      message: 'Missing &lt;/head&gt; closing tag'
    });
    return;
  }
  
  if (!/<body[^>]*>/i.test(code)) {
    results.html.errors.push({
      line: findLineNumber(code, /<body/i) || 5,
      message: 'Missing &lt;body&gt; opening tag'
    });
    return;
  }
  
  if (!/<\/body>/i.test(code)) {
    results.html.errors.push({
      line: findLineNumber(code, /<\/body>/i) || code.split('\n').length - 1,
      message: 'Missing &lt;/body&gt; closing tag'
    });
    return;
  }
  
  if (results.html.errors.length > 0) {
    results.html.valid = false;
  }
}

/**
 * Simple CSS validation - catch major syntax errors first
 */
function validateCSSStructure(code, results) {
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let cssCode = '';
  let match;
  
  while ((match = styleRegex.exec(code)) !== null) {
    cssCode += match[1] + '\n';
  }
  
  if (!cssCode.trim()) {
    return; // No CSS is okay
  }
  
  // Use the more detailed CSS syntax validation
  validateCSSSyntax(cssCode, code, results);
}

/**
 * Validate CSS syntax with proper comment parsing
 */
function validateCSSSyntax(cssCode, originalCode, results) {
  const lines = cssCode.split('\n');
  let braceCount = 0;
  let inRuleBlock = false;
  let inMultiLineComment = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    const originalLine = line;
    const lineNumber = i + 1;
    
    // Skip empty lines
    if (!line) continue;
    
    // Handle multi-line comments
    if (inMultiLineComment) {
      if (line.includes('*/')) {
        inMultiLineComment = false;
        line = line.split('*/')[1] || '';
      } else {
        continue; // Skip this line, still in comment
      }
    }
    
    // Check for start of multi-line comment
    if (line.includes('/*')) {
      if (line.includes('*/')) {
        // Single line comment, remove it
        line = line.replace(/\/\*.*?\*\//g, '').trim();
      } else {
        // Multi-line comment starts
        inMultiLineComment = true;
        line = line.split('/*')[0].trim();
      }
    }
    
    // Skip if line is empty after comment removal
    if (!line) continue;
    
    // Count braces to track rule blocks
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    
    braceCount += openBraces - closeBraces;
    
    // Update rule block status
    if (openBraces > 0) {
      inRuleBlock = true;
    }
    if (closeBraces > 0 && braceCount === 0) {
      inRuleBlock = false;
    }
    
    // Validate CSS properties only when inside rule blocks
    if (inRuleBlock && line.includes(':') && !line.includes('{') && !line.includes('}')) {
      // This should be a CSS property declaration
      if (!line.endsWith(';')) {
        const actualLineNumber = findCSSLineInOriginal(originalCode, originalLine, lineNumber);
        results.css.errors.push({
          line: actualLineNumber,
          message: `Missing semicolon after CSS property: "${htmlEncode(line)}"`
        });
        return; // Stop at first error
      }
      
      // Validate CSS property syntax (property: value;)
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) {
        const actualLineNumber = findCSSLineInOriginal(originalCode, originalLine, lineNumber);
        results.css.errors.push({
          line: actualLineNumber,
          message: `Invalid CSS syntax - missing colon (:) in property declaration`
        });
        return;
      }
      
      const propName = line.substring(0, colonIndex).trim();
      const propValue = line.substring(colonIndex + 1).replace(';', '').trim();
      
      // Check for empty property name or value
      if (!propName) {
        const actualLineNumber = findCSSLineInOriginal(originalCode, originalLine, lineNumber);
        results.css.errors.push({
          line: actualLineNumber,
          message: 'CSS property is missing a name before the colon (:)'
        });
        return;
      }
      
      if (!propValue || propValue === ';' || propValue === '') {
        const actualLineNumber = findCSSLineInOriginal(originalCode, originalLine, lineNumber);
        results.css.errors.push({
          line: actualLineNumber,
          message: `CSS property "${htmlEncode(propName)}" is missing a value after the colon`
        });
      }
      
      // Validate CSS property name format (letters, numbers, hyphens only)
      if (!/^[a-zA-Z-][a-zA-Z0-9-]*$/.test(propName)) {
        const actualLineNumber = findCSSLineInOriginal(originalCode, originalLine, lineNumber);
        results.css.errors.push({
          line: actualLineNumber,
          message: `Invalid CSS property name: "${htmlEncode(propName)}" - use only letters, numbers, and hyphens`
        });
        return;
      }
    }
    
    // Check for negative brace count (extra closing braces)
    if (braceCount < 0) {
      const actualLineNumber = findCSSLineInOriginal(originalCode, originalLine, lineNumber);
      results.css.errors.push({
        line: actualLineNumber,
        message: `Extra closing brace '}' - no matching opening brace`
      });
      braceCount = 0; // Reset to prevent cascade errors
      return;
    }
  }
  
  // Check for unclosed braces
  if (braceCount > 0) {
    results.css.errors.push({
      line: lines.length,
      message: `${braceCount} unclosed CSS rule block(s) - missing closing brace '}'`
    });
  }
  
  if (results.css.errors.length > 0) {
    results.css.valid = false;
  }
}

/**
 * Simple JavaScript validation
 */
function validateJavaScriptStructure(code, results) {
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let jsCode = '';
  let match;
  
  while ((match = scriptRegex.exec(code)) !== null) {
    jsCode += match[1] + '\n';
  }
  
  if (!jsCode.trim()) {
    return; // No JavaScript is okay
  }
  
  const lines = jsCode.split('\n');
  let braceCount = 0;
  let parenCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line || line.startsWith('//') || line.startsWith('/*')) continue;
    
    const lineNumber = findJSLineInOriginal(code, line, i + 1);
    
    // Count brackets
    braceCount += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
    parenCount += (line.match(/\(/g) || []).length - (line.match(/\)/g) || []).length;
    
    // Check for missing semicolons (simplified)
    if (needsSemicolon(line)) {
      results.javascript.errors.push({
        line: lineNumber,
        message: `Missing semicolon after "${htmlEncode(line)}"`
      });
      return; // Stop at first JS error
    }
    
    // Check for extra closing symbols
    if (braceCount < 0) {
      results.javascript.errors.push({
        line: lineNumber,
        message: `Extra closing brace '}' - no matching opening brace`
      });
      return;
    }
    
    if (parenCount < 0) {
      results.javascript.errors.push({
        line: lineNumber,
        message: `Extra closing parenthesis ')' - no matching opening parenthesis`
      });
      return;
    }
  }
  
  // Check for unclosed symbols
  if (braceCount > 0) {
    results.javascript.errors.push({
      line: lines.length,
      message: `Missing ${braceCount} closing brace(s) '}'`
    });
    return;
  }
  
  if (parenCount > 0) {
    results.javascript.errors.push({
      line: lines.length,
      message: `Missing ${parenCount} closing parenthesis ')' `
    });
    return;
  }
  
  if (results.javascript.errors.length > 0) {
    results.javascript.valid = false;
  }
}

/**
 * Simple requirements validation
 */
function validateRequirements(code, results) {
  // Only check basic requirements, don't duplicate HTML errors
  
  // Check for footer element
  if (!/<footer[^>]*>[\s\S]*<\/footer>/i.test(code)) {
    results.requirements.errors.push({
      line: findLineNumber(code, /<body/i) || 1,
      message: 'Missing &lt;footer&gt; element'
    });
    return;
  }
  
  // Check for CSS positioning properties
  if (!code.includes('position:') && !code.includes('position :')) {
    results.requirements.errors.push({
      line: findLineNumber(code, /<style/i) || 1,
      message: 'Footer needs "position: fixed" in CSS'
    });
    return;
  }
  
  if (results.requirements.errors.length > 0) {
    results.requirements.valid = false;
  }
}

function validateCSSColons(cssCode, originalCode, results) {
  const lines = cssCode.split('\n');
  let braceCount = 0;
  let inRuleBlock = false;
  let inMultiLineComment = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    const originalLine = line;
    const lineNumber = i + 1;
    
    // Skip empty lines
    if (!line) continue;
    
    // Handle multi-line comments
    if (inMultiLineComment) {
      if (line.includes('*/')) {
        inMultiLineComment = false;
        line = line.split('*/')[1] || '';
      } else {
        continue;
      }
    }
    
    // Check for start of multi-line comment
    if (line.includes('/*')) {
      if (line.includes('*/')) {
        line = line.replace(/\/\*.*?\*\//g, '').trim();
      } else {
        inMultiLineComment = true;
        line = line.split('/*')[0].trim();
      }
    }
    
    if (!line) continue;
    
    // Count braces to track rule blocks
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    braceCount += openBraces - closeBraces;
    
    if (openBraces > 0) inRuleBlock = true;
    if (closeBraces > 0 && braceCount === 0) inRuleBlock = false;
    
    // Check for missing colons ONLY when inside rule blocks
    if (inRuleBlock && !line.includes('{') && !line.includes('}')) {
      // Pattern to catch: "property value;" where colon is missing
      const missingColonPattern = /^([a-zA-Z][a-zA-Z0-9-]*)\s+([^:;{}]+);?\s*$/;
      const match = line.match(missingColonPattern);
      
      if (match && !line.includes(':')) {
        const propertyName = match[1].trim();
        const potentialValue = match[2].replace(';', '').trim();
        
        // Check if it's a valid CSS property
        if (isValidCSSProperty(propertyName)) {
          const actualLineNumber = findCSSLineInOriginal(originalCode, originalLine, lineNumber);
          results.css.errors.push({
            line: actualLineNumber,
            message: `Missing colon (:) in CSS property: "${propertyName} ${potentialValue}" should be "${propertyName}: ${potentialValue}"`
          });
          return; // STOP AT FIRST ERROR - user fixes one at a time
        }
      }
    }
  }
}

function isValidCSSProperty(propertyName) {
  const props = [
    'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
    'background', 'background-color', 'background-image', 'background-size',
    'color', 'width', 'height', 'min-width', 'max-width', 'min-height', 'max-height',
    'position', 'top', 'right', 'bottom', 'left', 'z-index',
    'display', 'float', 'clear', 'overflow', 'visibility', 'opacity',
    'font', 'font-family', 'font-size', 'font-weight', 'font-style',
    'text-align', 'text-decoration', 'text-transform', 'line-height',
    'letter-spacing', 'word-spacing', 'white-space', 'vertical-align'
  ];
  
  return props.includes(propertyName.toLowerCase());
}

function isLikelyCSSValue(value) {
  // Common CSS value patterns
  const valuePatterns = [
    /^\d+(px|em|rem|%|vh|vw|pt|pc|in|cm|mm)$/i,  // Units
    /^#[0-9a-f]{3,6}$/i,                           // Hex colors
    /^rgb\(/i,                                     // RGB colors
    /^rgba\(/i,                                    // RGBA colors
    /^hsl\(/i,                                     // HSL colors
    /^\d+$/,                                       // Numbers
    /^(auto|none|inherit|initial|transparent|normal)$/i, // Common keywords
    /^(solid|dashed|dotted|double|groove|ridge|inset|outset)$/i, // Border styles
    /^(block|inline|flex|grid|none|inline-block)$/i, // Display values
    /^(static|relative|absolute|fixed|sticky)$/i,  // Position values
    /^(left|right|center|justify)$/i,              // Text alignment
    /^(bold|normal|lighter|bolder|\d+)$/i,         // Font weights
    /^[a-z]+$/i                                    // Simple color names
  ];
  
  return valuePatterns.some(pattern => pattern.test(value.trim()));
}


/**
 * Check for malformed HTML tags first (missing > or < or /)
 */
function validateBasicHTMLSyntax(code, results) {
  const lines = code.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;
    
    // Check for opening tag without closing >
    const incompleteOpenTag = line.match(/<([a-zA-Z][a-zA-Z0-9]*)\s*[^>]*$/);
    if (incompleteOpenTag && !line.includes('>')) {
      results.html.errors.push({
        line: lineNumber,
        message: `Missing '&gt;' for &lt;${incompleteOpenTag[1]} tag`
      });
      return; // Stop here - this is the root cause
    }
    
    // Check for malformed closing tags (missing > after </)
    const malformedClosing = line.match(/<\/([a-zA-Z][a-zA-Z0-9]*)\s*[^>]*$/);
    if (malformedClosing && !line.includes('>')) {
      results.html.errors.push({
        line: lineNumber,
        message: `Missing '&gt;' for &lt;/${malformedClosing[1]} closing tag`
      });
      return;
    }
    
    // Check for potential closing tags missing the / (more precise detection)
    const allTags = line.match(/<([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g);
    if (allTags) {
      for (const tag of allTags) {
        const tagNameMatch = tag.match(/<([a-zA-Z][a-zA-Z0-9]*)/);
        if (tagNameMatch) {
          const tagName = tagNameMatch[1].toLowerCase();
          
          // Skip if it's already a proper closing tag or self-closing or comment
          if (tag.startsWith('</') || tag.endsWith('/>') || tag.startsWith('<!--')) {
            continue;
          }
          
          // Check if this looks like it should be a closing tag
          // Look for structural tags that commonly appear at the end
          if (['html', 'body', 'head', 'main', 'footer', 'header', 'div', 'section'].includes(tagName)) {
            // Check position in file and context
            const totalLines = lines.length;
            const fileProgress = i / totalLines;
            
            // If we're in the second half of the file and see these structural tags
            if (fileProgress > 0.5) {
              // Look for earlier opening tag of the same type
              const openingPattern = new RegExp(`<${tagName}[^/>]*>`, 'i');
              const closingPattern = new RegExp(`</${tagName}>`, 'i');
              const codeBeforeThisLine = lines.slice(0, i).join('\n');
              
              // If there's an opening tag but no closing tag before this line
              if (openingPattern.test(codeBeforeThisLine) && !closingPattern.test(codeBeforeThisLine)) {
                results.html.errors.push({
                  line: lineNumber,
                  message: `Missing '/' in closing tag - should be &lt;/${tagName}&gt;`
                });
                return;
              }
            }
          }
        }
      }
    }
    
    // Check for stray < without proper tag formation
    if (line.includes('<') && !line.match(/<[!\/]?[a-zA-Z][a-zA-Z0-9]*[^>]*>/)) {
      results.html.errors.push({
        line: lineNumber,
        message: `Invalid '&lt;' character - check tag syntax`
      });
      return;
    }
  }
}

/**
 * Check for unmatched quotes in HTML attributes (simplified)
 */
function validateHTMLQuotes(code, results) {
  const lines = code.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;
    
    // Count quotes in HTML tags only
    const tagMatch = line.match(/<[^>]*>/);
    if (tagMatch) {
      const tagContent = tagMatch[0];
      const singleQuotes = (tagContent.match(/'/g) || []).length;
      const doubleQuotes = (tagContent.match(/"/g) || []).length;
      
      if (singleQuotes % 2 !== 0) {
        results.html.errors.push({
          line: lineNumber,
          message: `Unmatched single quote (') in tag`
        });
        return;
      }
      
      if (doubleQuotes % 2 !== 0) {
        results.html.errors.push({
          line: lineNumber,
          message: `Unmatched double quote (") in tag`
        });
        return;
      }
    }
  }
}

/**
 * Main validation function - simplified with better error messages
 */
function checkAnswer() {
  const code = taskEditor.value.trim();
  
  if (!code) {
    showError('🤨', 'Your code is empty!', 'Please create a webpage with HTML structure and CSS positioning.');
    return;
  }
  
  const validationResults = {
    html: { valid: true, errors: [] },
    css: { valid: true, errors: [] },
    javascript: { valid: true, errors: [] },
    requirements: { valid: true, errors: [] }
  };
  
  // Simple HTML validation - check incomplete tags first
  validateIncompleteTags(code, validationResults);
  if (validationResults.html.errors.length > 0) {
    displaySimpleError('HTML Syntax', validationResults.html.errors[0]);
    return;
  }

  validateCSSColons(extractCSSFromHTML(code), code, validationResults);
  if (validationResults.css.errors.length > 0) {
    displaySimpleError('CSS Syntax', validationResults.css.errors[0]);
    return;
  }

  validateHTMLAttributes(code, validationResults);
  if (validationResults.html.errors.length > 0) {
    displaySimpleError('HTML Syntax', validationResults.html.errors[0]);
    return;
  }
  
  // Check for missing opening/closing tags
  validateMissingOpeningTags(code, validationResults);
  if (validationResults.html.errors.length > 0) {
    displaySimpleError('HTML Structure', validationResults.html.errors[0]);
    return;
  }
  
  validateMissingClosingTags(code, validationResults);
  if (validationResults.html.errors.length > 0) {
    displaySimpleError('HTML Structure', validationResults.html.errors[0]);
    return;
  }
  
  // Continue with existing HTML validation
  validateHTMLStructure(code, validationResults);
  if (validationResults.html.errors.length > 0) {
    displaySimpleError('HTML Structure', validationResults.html.errors[0]);
    return;
  }
  
  // CSS validation sequence
validateCSSColons(extractCSSFromHTML(code), code, validationResults);
if (validationResults.css.errors.length > 0) {
  displaySimpleError('CSS Syntax', validationResults.css.errors[0]);
  return;
}

validateCSSSemicolons(extractCSSFromHTML(code), code, validationResults);
if (validationResults.css.errors.length > 0) {
  displaySimpleError('CSS Syntax', validationResults.css.errors[0]);
  return;
}

validateCSSStructure(code, validationResults);
if (validationResults.css.errors.length > 0) {
  displaySimpleError('CSS Syntax', validationResults.css.errors[0]);
  return;
}
  
  // Simple JavaScript validation - check semicolons specifically
  validateJSSemicolons(extractJSFromHTML(code), code, validationResults);
  if (validationResults.javascript.errors.length > 0) {
    displaySimpleError('JavaScript Syntax', validationResults.javascript.errors[0]);
    return;
  }
  
  validateJavaScriptStructure(code, validationResults);
  if (validationResults.javascript.errors.length > 0) {
    displaySimpleError('JavaScript Syntax', validationResults.javascript.errors[0]);
    return;
  }
  
  // Check requirements
  validateRequirements(code, validationResults);
  if (validationResults.requirements.errors.length > 0) {
    displaySimpleError('Requirements', validationResults.requirements.errors[0]);
    return;
  }
  
  // If we get here, everything is valid
  displaySuccess();
}

/**
 * Display a single, clear error message
 */
function displaySimpleError(errorType, error) {
  const feedback = document.getElementById('feedback');
  const steps = document.querySelectorAll('.step');
  
  feedback.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 1.5em;">🔧</span>
      <div>
        <div style="font-size: 1.1em; margin-bottom: 4px;">
          <strong>Line ${error.line}:</strong> ${error.message}
        </div>
        <div style="opacity: 0.8; font-size: 0.9em;">
          Fix this error and try again
        </div>
      </div>
    </div>
  `;
  feedback.className = 'feedback error';
  
  // Update progress
  steps[1].classList.add('active');
  steps[2].classList.remove('active');
}

/**
 * Display success message
 */
function displaySuccess() {
  const feedback = document.getElementById('feedback');
  const nextBtn = document.getElementById('nextLessonBtn');
  const steps = document.querySelectorAll('.step');
  
  feedback.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 1.8em;">🎉</span>
      <div>
        <div style="font-size: 1.2em; margin-bottom: 4px;">
          <strong>Perfect! All requirements met!</strong>
        </div>
        <div style="opacity: 0.9;">
          Your CSS positioning is working correctly
        </div>
      </div>
    </div>
  `;
  feedback.className = 'feedback success';
  
  // Enable next lesson
  nextBtn.disabled = false;
  nextBtn.style.opacity = '1';
  nextBtn.style.cursor = 'pointer';
  
  // Update progress
  steps[1].classList.add('active');
  steps[2].classList.add('active');
  
  // Store completion
  localStorage.setItem('partB_lesson9_remake_complete', 'true');
  createCelebration();
}

/**
 * Check if JS line needs semicolon (simplified)
 */
function needsSemicolon(line) {
  if (line.endsWith(';') || line.endsWith('{') || line.endsWith('}')) {
    return false;
  }
  
  // Simple patterns that need semicolons
  const patterns = [
    /^(var|let|const)\s+\w+/,     // Variable declarations
    /^\w+\s*=/,                   // Assignments
    /^return(\s|$)/,              // Return statements
    /^\w+\(/                      // Function calls
  ];
  
  return patterns.some(pattern => pattern.test(line));
}

/**
 * Helper function to find CSS line numbers in original document
 */
function findCSSLineInOriginal(originalCode, cssLine, cssLineNumber) {
  const lines = originalCode.split('\n');
  let inStyleBlock = false;
  let cssLineCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('<style')) {
      inStyleBlock = true;
      continue;
    }
    
    if (line.includes('</style>')) {
      inStyleBlock = false;
      continue;
    }
    
    if (inStyleBlock) {
      cssLineCount++;
      
      // Try to match the actual line content
      if (line.trim().includes(cssLine.trim())) {
        return i + 1;
      }
      
      // If we've reached the target CSS line number
      if (cssLineCount === cssLineNumber) {
        return i + 1;
      }
    }
  }
  
  // Fallback: find style tag and add offset
  const styleLineNumber = findLineNumber(originalCode, /<style/i);
  return styleLineNumber ? styleLineNumber + cssLineNumber : cssLineNumber;
}

/**
 * Find the actual line number of JavaScript in the original document
 */
function findJSLineInOriginal(originalCode, jsLine, jsLineNumber) {
  const lines = originalCode.split('\n');
  let inScriptBlock = false;
  let jsLineCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('<script')) {
      inScriptBlock = true;
      continue;
    }
    
    if (line.includes('</script>')) {
      inScriptBlock = false;
      continue;
    }
    
    if (inScriptBlock) {
      jsLineCount++;
      if (jsLineCount === jsLineNumber) {
        return i + 1;
      }
      // Also try to match the actual line content
      if (line.trim().includes(jsLine.trim().split('//')[0].trim())) {
        return i + 1;
      }
    }
  }
  
  return findLineNumber(originalCode, /<script/i) + jsLineNumber;
}

/**
 * Simple error display function
 */
function showError(emoji, title, message, lineNumber = null) {
  const feedback = document.getElementById('feedback');
  const steps = document.querySelectorAll('.step');
  
  const lineInfo = lineNumber ? `<div style="font-size: 0.9em; color: #666; margin-top: 4px;">📍 Check around line ${lineNumber}</div>` : '';
  
  feedback.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 1.5em;">${emoji}</span>
      <div style="flex: 1;">
        <div style="font-size: 1.1em; margin-bottom: 4px;">
          <strong>${title}</strong>
        </div>
        <div style="opacity: 0.9; line-height: 1.4;">
          ${message}
        </div>
        ${lineInfo}
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

// Event listeners
if (taskEditor) {
  taskEditor.addEventListener('input', renderTask);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  initPlayground();
  updateDemo();
  renderTask();
  
  // Check if lesson is already completed
  if (localStorage.getItem('lesson9_remake_complete') === 'true') {
    const nextBtn = document.getElementById('nextLessonBtn');
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.style.opacity = '1';
      nextBtn.style.cursor = 'pointer';
    }
  }
});

// Next lesson button functionality
document.addEventListener('DOMContentLoaded', function() {
  const nextBtn = document.getElementById('nextLessonBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (!this.disabled) {
        window.location.href = '/2. partB/lesson10_remake.html';
      }
    });
  }
});

// Add required animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
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
 */
function checkAndRestoreCompletion() {
  setTimeout(() => {
    const isCompleted = localStorage.getItem('partB_lesson9_remake_complete') === 'true';
    
    if (isCompleted) {
      const feedback = document.getElementById('feedback');
      const nextBtn = document.getElementById('nextLessonBtn');
      const steps = document.querySelectorAll('.step');
      
      if (feedback && nextBtn && steps.length > 0) {
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
        
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
        
        if (steps[1]) steps[1].classList.add('active');
        if (steps[2]) steps[2].classList.add('active');
      }
    }
  }, 100);
}

/**
 * Mark current lesson as complete in progress tracking
 */
function markCurrentLessonComplete() {
  console.log('Lesson 9 (CSS Positioning) completed!');
}

// Initialize completion check
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkAndRestoreCompletion);
} else {
  checkAndRestoreCompletion();
}

setTimeout(checkAndRestoreCompletion, 500);