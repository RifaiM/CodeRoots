// =====================================
// LESSON 2: HTML TEXT & HEADINGS - INTERACTIVE JAVASCRIPT
// =====================================

// Enhanced code editor functionality
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('task-code');
    const lineNumbers = document.getElementById('line-numbers');
    const currentLineSpan = document.getElementById('current-line');
    const currentColSpan = document.getElementById('current-col');
  
    function updateLineNumbers() {
      const lines = textarea.value.split('\n');
      const lineNumbersText = lines.map((_, index) => index + 1).join('\n');
      lineNumbers.textContent = lineNumbersText;
    }
  
    function updateCursorPosition() {
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = textarea.value.substring(0, cursorPosition);
      const lines = textBeforeCursor.split('\n');
  
      currentLineSpan.textContent = lines.length;
      currentColSpan.textContent = lines[lines.length - 1].length + 1;
    }
  
    textarea.addEventListener('input', function() {
      updateLineNumbers();
      updateCursorPosition();
      // Update preview if needed
      if (typeof updatePreview === 'function') {
        updatePreview();
      }
    });
  
    textarea.addEventListener('click', updateCursorPosition);
    textarea.addEventListener('keyup', updateCursorPosition);
    textarea.addEventListener('focus', updateCursorPosition);
  
    // Sync scroll between textarea and line numbers
    textarea.addEventListener('scroll', function() {
      lineNumbers.scrollTop = textarea.scrollTop;
    });

  
    // Handle Tab key in textarea to insert tabs instead of changing focus
    textarea.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        e.preventDefault(); // Prevent default tab behavior (focus change)
  
        // Get cursor position
        const start = this.selectionStart;
        const end = this.selectionEnd;
  
        // Insert tab character (or spaces if you prefer)
        const tabChar = '  '; // 2 spaces
  
        // Replace selected text with tab character
        this.value = this.value.substring(0, start) + tabChar + this.value.substring(end);
  
        // Move cursor to after the inserted tab
        this.selectionStart = this.selectionEnd = start + tabChar.length;
  
        // Update line numbers and preview
        updateLineNumbers();
        updateCursorPosition();
        if (typeof renderTask === 'function') {
          renderTask();
        }
      }
  
      // Optional: Handle Shift+Tab for outdent (remove indentation)
      if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
  
        const start = this.selectionStart;
        const end = this.selectionEnd;
  
        // Get the line start position
        const beforeCursor = this.value.substring(0, start);
        const lineStart = beforeCursor.lastIndexOf('\n') + 1;
  
        // Check if there's a tab or spaces at the beginning of the line
        const lineContent = this.value.substring(lineStart);
  
        if (lineContent.startsWith('\t')) {
          // Remove one tab character
          this.value = this.value.substring(0, lineStart) +
            this.value.substring(lineStart + 1);
          this.selectionStart = this.selectionEnd = Math.max(lineStart, start - 1);
        } else if (lineContent.startsWith('    ')) {
          // Remove 4 spaces (if using spaces instead of tabs)
          this.value = this.value.substring(0, lineStart) +
            this.value.substring(lineStart + 4);
          this.selectionStart = this.selectionEnd = Math.max(lineStart, start - 4);
        }
  
        updateLineNumbers();
        updateCursorPosition();
        if (typeof renderTask === 'function') {
          renderTask();
        }
      }
    });
  
    // Optional: Auto-indent on Enter key
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
          if (typeof renderTask === 'function') {
            renderTask();
          }
        }
      }
    });
  
    // Initialize
    updateLineNumbers();
    updateCursorPosition();
  });
  
  // =====================================
  // DEMO INITIALIZATION & PREVIEW UPDATES
  // =====================================
  
  // Get demo elements for live preview functionality
  const demoCode = document.getElementById('demo-code');
  const demoPreview = document.getElementById('demo-preview');
  
  /**
   * Updates the demo preview iframe with styled HTML content
   * Shows example of different heading levels and text formatting
   */
  function updateDemo() {
    demoPreview.srcdoc = `<!DOCTYPE html>
  <html>
  <head>
  <style>
  body { 
      font-family: 'Nunito', sans-serif; 
      margin: 20px; 
      line-height: 1.6; 
      background: #f8f9ff;
  }
  h1 { 
      color: #2c3e50; 
      border-bottom: 3px solid #3498db; 
      padding-bottom: 10px; 
      margin-bottom: 20px;
  }
  h2 { 
      color: #34495e; 
      border-left: 4px solid #3498db; 
      padding-left: 15px;
  }
  h3 { 
      color: #7f8c8d; 
      font-size: 1.25rem;
  }
  h4 { 
      color: #95a5a6; 
      font-size: 1.1rem;
  }
  p { 
      background: white; 
      padding: 15px; 
      border-radius: 8px; 
      border-left: 4px solid #e3f2fd; 
      margin: 15px 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  strong {
      color: #e74c3c;
      background: #fef9e7;
      padding: 2px 4px;
      border-radius: 3px;
  }
  em {
      color: #8e44ad;
      background: #f4ecf7;
      padding: 2px 4px;
      border-radius: 3px;
  }
  u {
      color: #27ae60;
      text-decoration-color: #27ae60;
  }
  </style>
  </head>
  <body>
  <h1>My Amazing Blog Post</h1>
  <h2>Introduction to Web Development</h2>
  <p>Learning HTML is the <strong>first step</strong> to becoming a web developer. It's <em>easier than you think</em>!</p>
  
  <h3>What You'll Learn</h3>
  <p>In this course, you'll discover how to create <u>beautiful</u> and <strong>functional</strong> websites.</p>
  
  <h4>Prerequisites</h4>
  <p>No prior experience needed! Just bring your <em>curiosity</em> and enthusiasm.</p>
  </body>
  </html>`;
  }
  
  // =====================================
  // STUDENT TASK FUNCTIONALITY
  // =====================================
  
  // Get task elements for student practice area
  const taskEditor = document.getElementById('task-code');
  const taskPreview = document.getElementById('task-preview');
  
  /**
   * Renders student's HTML code in the preview iframe
   * Updates in real-time as student types
   */
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
      background: #f8f9ff;
  }
  h1, h2, h3, h4, h5, h6 { 
      color: #2c3e50; 
      margin-bottom: 15px;
  }
  h1 { 
      border-bottom: 3px solid #3498db; 
      padding-bottom: 10px; 
      font-size: 2rem;
  }
  h2 { 
      border-left: 4px solid #3498db; 
      padding-left: 15px;
      font-size: 1.5rem;
  }
  h3 { 
      color: #7f8c8d; 
      font-size: 1.25rem;
  }
  h4 { 
      color: #95a5a6; 
      font-size: 1.1rem;
  }
  h5, h6 {
      color: #bdc3c7;
      font-size: 1rem;
  }
  p { 
      background: white; 
      padding: 15px; 
      border-radius: 8px; 
      border-left: 4px solid #e3f2fd; 
      margin: 15px 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  strong {
      color: #e74c3c;
      background: #fef9e7;
      padding: 2px 4px;
      border-radius: 3px;
      font-weight: bold;
  }
  em {
      color: #8e44ad;
      background: #f4ecf7;
      padding: 2px 4px;
      border-radius: 3px;
      font-style: italic;
  }
  u {
      color: #27ae60;
      text-decoration-color: #27ae60;
  }
  </style>
  </head>
  <body>
  ${code}
  </body>
  </html>`;
  }
  
  // Add event listener for real-time preview updates
  taskEditor.addEventListener('input', renderTask);
  renderTask(); // Initial render
  
  // =====================================
  // INTERACTIVE LEARNING FUNCTIONS
  // =====================================
  
  /**
   * Highlights and animates a clicked heading example
   * @param {HTMLElement} element - The clicked heading example element
   * @param {string} headingType - Type of heading (h1, h2, etc.)
   */
  function highlightHeading(element, headingType) {
    // Remove previous highlights from all examples
    document.querySelectorAll('.heading-example').forEach(el => {
      el.style.background = '';
      el.style.borderColor = 'transparent';
      el.style.transform = '';
    });
  
    // Highlight the clicked example with visual effects
    element.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
    element.style.borderColor = 'var(--brand)';
    element.style.transform = 'translateX(15px) scale(1.02)';
  
    // Add sparkle animation effect
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.top = '10px';
    sparkle.style.right = '15px';
    sparkle.style.animation = 'sparkle 1s ease-out';
    sparkle.style.fontSize = '1.2em';
    sparkle.style.zIndex = '10';
    element.style.position = 'relative';
    element.appendChild(sparkle);
  
    // Educational information for each heading type
    const info = {
      h1: "📊 H1: The most important heading - use only once per page for the main title",
      h2: "📋 H2: Section headings - perfect for major topics and sections",
      h3: "📄 H3: Subsection headings - great for breaking down H2 content",
      h4: "🔹 H4: Minor headings - for smaller subdivisions",
      h5: "🔸 H5: Small headings - rarely used, for fine details",
      h6: "• H6: Smallest heading - very rarely used"
    };
  
    // Show educational popup
    showInfoPopup(info[headingType]);
  
    // Clean up animation effects after 1 second
    setTimeout(() => {
      if (sparkle.parentElement) sparkle.remove();
      element.style.transform = '';
    }, 1000);
  }
  
  /**
   * Animates a text formatting example when clicked
   * @param {HTMLElement} element - The clicked format example element
   */
  function animateFormat(element) {
    // Apply hover animation effect
    element.style.transform = 'translateY(-8px) scale(1.05)';
    element.style.boxShadow = '0 12px 30px rgba(0,123,255,0.3)';
  
    // Create floating sparkle effect
    const floater = document.createElement('div');
    floater.innerHTML = '✨';
    floater.style.position = 'absolute';
    floater.style.top = '50%';
    floater.style.left = '50%';
    floater.style.transform = 'translate(-50%, -50%)';
    floater.style.fontSize = '1.5em';
    floater.style.pointerEvents = 'none';
    floater.style.animation = 'sparkle 1.2s ease-out';
    element.style.position = 'relative';
    element.appendChild(floater);
  
    // Reset animation after completion
    setTimeout(() => {
      element.style.transform = '';
      element.style.boxShadow = '';
      if (floater.parentElement) floater.remove();
    }, 1200);
  }
  
  /**
   * Creates and displays an educational popup message
   * @param {string} message - The educational message to display
   */
  function showInfoPopup(message) {
    const popup = document.createElement('div');
    popup.innerHTML = `
          <div style="
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: white;
              padding: 20px 25px;
              border-radius: 15px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.2);
              border: 2px solid var(--brand);
              max-width: 400px;
              z-index: 10000;
              animation: popIn 0.3s ease-out;
              text-align: center;
          ">
              <div style="font-size: 1.1em; margin-bottom: 15px; line-height: 1.4;">
                  ${message}
              </div>
              <button onclick="this.parentElement.parentElement.remove()" style="
                  background: var(--brand);
                  color: white;
                  border: none;
                  padding: 8px 16px;
                  border-radius: 6px;
                  cursor: pointer;
                  font-weight: 600;
                  transition: all 0.2s ease;
              " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                  Got it! ✅
              </button>
          </div>
      `;
  
    document.body.appendChild(popup);
  
    // Auto close popup after 4 seconds
    setTimeout(() => {
      if (popup.parentElement) {
        popup.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => popup.remove(), 300);
      }
    }, 4000);
  }
  
  // =====================================
  // HINT SYSTEM
  // =====================================
  
  /**
   * Shows a random helpful hint to guide student learning
   */
  function showHint() {
    const hints = [
      "💡 Start with &lt;h1&gt; for your main title!",
      "🎯 Add &lt;h2&gt; for a section heading",
      "📝 Use &lt;p&gt; tags for paragraphs",
      "✨ Try &lt;strong&gt; for important words",
      "🎨 Add &lt;em&gt; for emphasis",
      "🔧 Remember: every opening tag needs a closing tag!"
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
              padding: 18px 25px;
              border-radius: 25px;
              box-shadow: 0 8px 20px rgba(255,193,7,0.4);
              z-index: 10000;
              animation: slideInRight 0.5s ease-out;
              font-weight: 600;
              max-width: 350px;
              border: 2px solid rgba(255,255,255,0.3);
          ">
              ${randomHint}
          </div>
      `;
  
    document.body.appendChild(hintPopup);
  
    // Remove hint popup after 3.5 seconds
    setTimeout(() => {
      hintPopup.firstElementChild.style.animation = 'slideOutRight 0.5s ease-out';
      setTimeout(() => hintPopup.remove(), 500);
    }, 3500);
  }
  
  // =====================================
  // SIMPLIFIED VALIDATION SYSTEM
  // Focus on what's missing or needs fixing
  // =====================================
  
  /**
   * Simple validation focused on lesson requirements
   * @param {string} code - The HTML code to validate
   * @returns {Object} Validation results with clear, actionable feedback
   */
  function validateHTMLStructure(code) {
    const results = {
      isValid: true,
      errors: [],
      suggestions: []
    };
  
    const codeLower = code.toLowerCase();
  
    // 1. Check for required elements (what's missing)
    const requirements = [{
        check: () => !codeLower.includes('<h1>') || !codeLower.includes('</h1>'),
        message: 'Add a main heading with &lt;h1&gt;Your Title&lt;/h1&gt;'
      },
      {
        check: () => !codeLower.includes('<h2>') || !codeLower.includes('</h2>'),
        message: 'Add a section heading with &lt;h2&gt;Your Section&lt;/h2&gt;'
      },
      {
        check: () => !codeLower.includes('<p>') || !codeLower.includes('</p>'),
        message: 'Add a paragraph with &lt;p&gt;Your text here&lt;/p&gt;'
      }
    ];
  
    // Check what's missing
    requirements.forEach(req => {
      if (req.check()) {
        results.isValid = false;
        results.errors.push(req.message);
      }
    });
  
    // 2. Check for common syntax issues (what needs fixing)
    const syntaxIssues = checkSyntaxIssues(code);
    if (syntaxIssues.length > 0) {
      results.isValid = false;
      results.errors.push(...syntaxIssues);
    }
  
    // 3. Generate helpful next steps
    if (results.errors.length === 0) {
      results.suggestions.push('Perfect! Your HTML structure looks great!');
    } else if (results.errors.length === 1) {
      results.suggestions.push('Almost there! Just one more thing to add.');
    } else {
      results.suggestions.push('You\'re on the right track! Add these elements step by step.');
    }
  
    return results;
  }
  
  /**
   * Check for basic syntax issues that need fixing
   * @param {string} code - The HTML code to check
   * @returns {Array} Array of syntax issues found
   */
  function checkSyntaxIssues(code) {
    const issues = [];
  
    // Find unclosed tags (simplified approach)
    const openTags = findOpenTags(code);
    const closeTags = findCloseTags(code);
  
    // Check each tag type
    ['h1', 'h2', 'h3', 'p', 'strong', 'em'].forEach(tagName => {
      const opens = openTags.filter(tag => tag === tagName).length;
      const closes = closeTags.filter(tag => tag === tagName).length;
  
      if (opens > closes) {
        issues.push(`Close your &lt;${tagName}&gt; tag with &lt;/${tagName}&gt;`);
      } else if (closes > opens) {
        issues.push(`Add an opening &lt;${tagName}&gt; tag before &lt;/${tagName}&gt;`);
      }
    });
  
    // Check for missing angle brackets (simplified)
    if (hasMissingBrackets(code)) {
      issues.push('Make sure all tags have angle brackets: &lt; and &gt;');
    }
  
    return [...new Set(issues)]; // Remove duplicates
  }
  
  /**
   * Find opening tags in the code
   * @param {string} code - HTML code to analyze
   * @returns {Array} Array of opening tag names
   */
  function findOpenTags(code) {
    const openTagRegex = /<([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
    const tags = [];
    let match;
  
    while ((match = openTagRegex.exec(code)) !== null) {
      const tagName = match[1].toLowerCase();
      // Skip self-closing tags
      if (!['br', 'hr', 'img', 'input'].includes(tagName)) {
        tags.push(tagName);
      }
    }
  
    return tags;
  }
  
  /**
   * Find closing tags in the code
   * @param {string} code - HTML code to analyze
   * @returns {Array} Array of closing tag names
   */
  function findCloseTags(code) {
    const closeTagRegex = /<\/([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
    const tags = [];
    let match;
  
    while ((match = closeTagRegex.exec(code)) !== null) {
      tags.push(match[1].toLowerCase());
    }
  
    return tags;
  }
  
  /**
   * Check if code has missing angle brackets
   * @param {string} code - HTML code to check
   * @returns {boolean} True if missing brackets detected
   */
  function hasMissingBrackets(code) {
    // Look for common patterns that suggest missing brackets
    const suspiciousPatterns = [
      /\bh[1-6]\s/g, // "h1 " instead of "<h1>"
      /\bp\s/g, // "p " instead of "<p>"
      /\bstrong\s/g, // "strong " instead of "<strong>"
      /\bem\s/g // "em " instead of "<em>"
    ];
  
    return suspiciousPatterns.some(pattern => pattern.test(code));
  }
  
  /**
   * Format validation errors with simple, clear messages
   */
  function formatValidationErrors(results) {
    let html = `
          <div style="display: flex; align-items: flex-start; gap: 12px;">
              <span style="font-size: 1.5em;">📝</span>
              <div style="flex: 1;">
                  <div style="font-size: 1.1em; margin-bottom: 12px;">
                      <strong>Let's add these to your HTML:</strong>
                  </div>
      `;
  
    if (results.errors.length > 0) {
      html += `
                  <ul style="margin: 0; padding: 0; list-style: none;">
                      ${results.errors.map((error, index) => `
                          <li style="margin: 8px 0; padding: 12px 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 6px; font-size: 0.95em;">
                              <strong>${index + 1}.</strong> ${error}
                          </li>
                      `).join('')}
                  </ul>
          `;
    }
  
    if (results.suggestions.length > 0) {
      html += `
                  <div style="margin-top: 15px; padding: 12px 15px; background: #e7f3ff; border: 1px solid #b3d9ff; border-radius: 8px; font-size: 0.95em;">
                      <strong>💡 ${results.suggestions[0]}</strong>
                  </div>
          `;
    }
  
    html += `
              </div>
          </div>
      `;
  
    return html;
  }
  
  // =====================================
  // ANSWER VALIDATION SYSTEM
  // =====================================
  
  /**
   * Comprehensive validation of student's HTML code
   * Checks for required elements, proper syntax, and common mistakes
   */
  function checkAnswer() {
    const code = taskEditor.value.trim();
    const codeLower = code.toLowerCase();
  
    // Check if code is empty
    if (!code || code.replace(/\s/g, '') === '') {
      showError('🤨', 'Your code is empty!', 'Please write some HTML code in the editor above.');
      return;
    }
  
    // Check for basic HTML structure
    const hasAnyHTMLTags = /<[^>]+>/.test(code);
    if (!hasAnyHTMLTags) {
      showError('😕', 'No HTML tags found!', 'HTML uses tags like &lt;h1&gt;, &lt;h2&gt;, and &lt;p&gt;. Try adding some tags to your code.');
      return;
    }
  
    // Run comprehensive validation
    const validationResults = validateHTMLStructure(code);
  
    // Get UI elements for feedback display
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('nextLessonBtn');
    const steps = document.querySelectorAll('.step');
  
    // Process validation results
    if (validationResults.isValid) {
      // SUCCESS: All requirements met
      feedback.innerHTML = `
              <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 1.5em;">🎉</span>
                  <div>
                      <div style="font-size: 1.1em; margin-bottom: 4px;">
                          <strong>Excellent work! Your HTML text structure is perfect!</strong>
                      </div>
                      <div style="opacity: 0.8;">
                          You've mastered headings and paragraphs. Ready for the next adventure?
                      </div>
                  </div>
              </div>
          `;
      feedback.className = 'feedback success';
  
      // Enable next lesson button with animation
      nextBtn.disabled = false;
      nextBtn.style.animation = 'pulse 1s infinite';
  
      // Update progress tracker
      steps[1].classList.add('active');
      steps[2].classList.add('active');
  
      // Store completion
      localStorage.setItem('partB_lesson2_remake_complete', 'true');
      if (typeof markCurrentLessonComplete === 'function') {
        markCurrentLessonComplete();
      }
  
      // Trigger celebration animation
      createCelebration();
  
    } else {
      // ERROR: Show detailed feedback
      const errorHtml = formatValidationErrors(validationResults);
  
      feedback.innerHTML = errorHtml;
      feedback.className = 'feedback error';
  
      // Update progress to practice step
      steps[1].classList.add('active');
    }
  }
  
  /**
   * Displays simple, actionable error messages
   */
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
  
    // Reset progress to first step
    steps[1].classList.remove('active');
    steps[2].classList.remove('active');
  }
  
  // =====================================
  // CELEBRATION ANIMATIONS
  // =====================================
  
  /**
   * Creates falling confetti animation for successful completion
   */
  function createCelebration() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
  
    // Create 50 confetti pieces
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
              position: fixed;
              width: 10px;
              height: 10px;
              background: ${colors[Math.floor(Math.random() * colors.length)]};
              left: ${Math.random() * 100}vw;
              top: -10px;
              z-index: 10000;
              pointer-events: none;
              animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
          `;
  
      document.body.appendChild(confetti);
  
      // Remove confetti after animation
      setTimeout(() => confetti.remove(), 5000);
    }
  }
  
  // =====================================
  // CSS ANIMATIONS SETUP
  // =====================================
  
  // Add necessary CSS animations to the document
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
      @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
      }
      @keyframes confetti-fall {
          0% { transform: translateY(-10px) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(720deg); }
      }
      @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
      }
      @keyframes sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
      }
      @keyframes popIn {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      }
  `;
  document.head.appendChild(animationStyles);
  
  // =====================================
  // INITIALIZATION & EVENT LISTENERS
  // =====================================
  
  // Initialize demo preview on page load
  updateDemo();
  
  // Next lesson navigation functionality
  document.getElementById('nextLessonBtn').addEventListener('click', function() {
    if (!this.disabled) {
      window.location.href = '/2. partB/lesson3_remake.html';
    }
  });
  
  /**
   * Check if lesson was previously completed and restore UI state
   * This runs when the page loads to handle returning users
   */
  function checkAndRestoreCompletion() {
    // Wait a bit to ensure DOM is ready
    setTimeout(() => {
      const isCompleted = localStorage.getItem('partB_lesson2_remake_complete') === 'true';
  
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