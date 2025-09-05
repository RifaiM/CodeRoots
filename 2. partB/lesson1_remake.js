// Fixed HTMLCodeEditor with working Ctrl+Z
// Simplified HTMLCodeEditor - back to working basics
class HTMLCodeEditor {
    constructor(textareaId, lineNumbersId) {
      this.textarea = document.getElementById(textareaId);
      this.lineNumbers = document.getElementById(lineNumbersId);
      this.currentLine = document.getElementById('current-line');
      this.currentCol = document.getElementById('current-col');
      this.init();
    }
  
    init() {
      // Handle special keys
      this.textarea.addEventListener('keydown', (e) => this.handleKeyDown(e));
      // Update line numbers and cursor position
      this.textarea.addEventListener('input', () => this.updateEditor());
      this.textarea.addEventListener('keyup', () => this.updateCursorPosition());
      this.textarea.addEventListener('click', () => this.updateCursorPosition());
      // Simple scroll synchronization
      this.textarea.addEventListener('scroll', () => this.syncLineNumbers());
      // Initialize editor
      this.updateEditor();
      this.updateCursorPosition();
    }
  
    updateLineNumbers() {
      if (!this.lineNumbers) return;
      const lines = this.textarea.value.split('\n');
      const lineCount = Math.max(lines.length, 1);
      const numbers = [];
      for (let i = 1; i <= lineCount; i++) {
        numbers.push(i.toString());
      }
      this.lineNumbers.textContent = numbers.join('\n');
  
  
      const maxDigits = lineCount.toString().length;
      if (maxDigits >= 4) {
        this.lineNumbers.style.width = '60px';
        this.lineNumbers.style.minWidth = '60px';
      } else if (maxDigits >= 3) {
        this.lineNumbers.style.width = '55px';
        this.lineNumbers.style.minWidth = '55px';
      } else {
        this.lineNumbers.style.width = '50px';
        this.lineNumbers.style.minWidth = '50px';
      }
    }
  
    syncLineNumbers() {
      if (this.lineNumbers) this.lineNumbers.scrollTop = this.textarea.scrollTop;
    }
  
    updateEditor() {
      this.updateLineNumbers();
      this.updateCursorPosition();
      this.syncLineNumbers();
      if (window.renderTask) window.renderTask();
    }
  
    updateCursorPosition() {
      const textarea = this.textarea;
      const value = textarea.value;
      const cursorPos = textarea.selectionStart;
      const beforeCursor = value.substring(0, cursorPos);
      const lines = beforeCursor.split('\n');
      const line = lines.length;
      const col = lines[lines.length - 1].length + 1;
      if (this.currentLine) this.currentLine.textContent = line;
      if (this.currentCol) this.currentCol.textContent = col;
    }
  
    // Keep all your existing methods for key handling, etc.
    handleKeyDown(e) {
      const textarea = this.textarea;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      if (e.ctrlKey || e.metaKey) return;
      switch (e.key) {
        case 'Tab':
          e.preventDefault();
          if (e.shiftKey) {
            this.addIndentationUndoFriendly(start, end, true);
          } else {
            this.addIndentationUndoFriendly(start, end, false);
          }
          break;
        case 'Enter':
          const shouldAddIndent = this.shouldAddSmartIndent(start, value);
          if (shouldAddIndent) {
            e.preventDefault();
            this.handleSmartEnter(start, value);
          }
          break;
        case '>':
          setTimeout(() => this.handleAutoClose(start, value), 0);
          break;
      }
    }
  
    shouldAddSmartIndent(start, value) {
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const currentLine = value.substring(lineStart, start);
      const trimmedLine = currentLine.trim();
      return trimmedLine.includes('<') && trimmedLine.includes('>') &&
        !trimmedLine.includes('</') && !trimmedLine.endsWith('/>');
    }
  
    addIndentationUndoFriendly(start, end, isDeindent) {
      const textarea = this.textarea;
      const value = textarea.value;
      const indent = '  ';
      if (start !== end) {
        const beforeSelection = value.substring(0, start);
        const selection = value.substring(start, end);
        const afterSelection = value.substring(end);
        const lines = selection.split('\n');
        const processedLines = lines.map(line => {
          if (isDeindent) {
            return line.startsWith(indent) ? line.substring(indent.length) : line;
          } else {
            return indent + line;
          }
        });
        const newSelection = processedLines.join('\n');
        if (document.execCommand) {
          textarea.focus();
          textarea.setSelectionRange(start, end);
          document.execCommand('insertText', false, newSelection);
        } else {
          textarea.setRangeText(newSelection, start, end, 'select');
        }
      } else {
        if (isDeindent) {
          const lineStart = value.lastIndexOf('\n', start - 1) + 1;
          const lineEnd = value.indexOf('\n', start);
          const actualLineEnd = lineEnd === -1 ? value.length : lineEnd;
          const line = value.substring(lineStart, actualLineEnd);
          if (line.startsWith(indent)) {
            const newLine = line.substring(indent.length);
            textarea.setRangeText(newLine, lineStart, actualLineEnd, 'end');
            textarea.setSelectionRange(start - indent.length, start - indent.length);
          }
        } else {
          if (document.execCommand) {
            textarea.focus();
            textarea.setSelectionRange(start, start);
            document.execCommand('insertText', false, indent);
          } else {
            textarea.setRangeText(indent, start, start, 'end');
          }
        }
      }
      this.updateEditor();
    }
  
    handleSmartEnter(start, value) {
      const textarea = this.textarea;
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const currentLine = value.substring(lineStart, start);
      const indentMatch = currentLine.match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1] : '';
      const extraIndent = '  ';
      const newContent = '\n' + currentIndent + extraIndent;
      if (document.execCommand) {
        textarea.focus();
        textarea.setSelectionRange(start, start);
        document.execCommand('insertText', false, newContent);
      } else {
        textarea.setRangeText(newContent, start, start, 'end');
      }
      this.updateEditor();
    }
  
    handleAutoClose(start, value) {
      const textarea = this.textarea;
      const beforeCursor = value.substring(0, start + 1);
      const tagMatch = beforeCursor.match(/<(\w+)[^>]*>$/);
      if (tagMatch) {
        const tagName = tagMatch[1].toLowerCase();
        const selfClosing = ['img', 'br', 'hr', 'input', 'meta', 'link'];
        if (!selfClosing.includes(tagName)) {
          const closingTag = `</${tagName}>`;
          const currentPos = textarea.selectionStart;
          if (document.execCommand) {
            textarea.focus();
            textarea.setSelectionRange(currentPos, currentPos);
            document.execCommand('insertText', false, closingTag);
            textarea.setSelectionRange(currentPos, currentPos);
          } else {
            textarea.setRangeText(closingTag, currentPos, currentPos, 'start');
          }
        }
      }
    }
  
    insertText(text) {
      const textarea = this.textarea;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      if (document.execCommand) {
        textarea.focus();
        textarea.setSelectionRange(start, end);
        document.execCommand('insertText', false, text);
      } else {
        textarea.setRangeText(text, start, end, 'end');
      }
      this.updateEditor();
    }
  
    formatCode() {
      const currentValue = this.textarea.value;
      let formatted = currentValue
        .replace(/>\s*</g, '><')
        .replace(/^\s+/gm, '')
        .split('\n')
        .filter(line => line.trim())
        .join('\n');
      const lines = formatted.split('\n');
      let indentLevel = 0;
      const indentedLines = lines.map(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('</')) indentLevel = Math.max(0, indentLevel - 1);
        const indentedLine = ' '.repeat(indentLevel) + trimmedLine;
        if (trimmedLine.includes('<') && trimmedLine.includes('>') &&
          !trimmedLine.includes('</') && !trimmedLine.endsWith('/>') &&
          !trimmedLine.includes('<!DOCTYPE')) indentLevel++;
        return indentedLine;
      });
      const formattedCode = indentedLines.join('\n');
      if (document.execCommand) {
        this.textarea.focus();
        this.textarea.select();
        document.execCommand('insertText', false, formattedCode);
      } else {
        this.textarea.value = formattedCode;
      }
      this.updateEditor();
    }
  }
  
  // Initialize demos
  const demoCode = document.getElementById('demo-code');
  const demoPreview = document.getElementById('demo-preview');
  
  // Initialize demos
  function updateDemo() {
    const demoPreview = document.getElementById('demo-preview');
    if (!demoPreview) return;
    demoPreview.srcdoc = `<!DOCTYPE html><html><head><style>body{font-family:'Nunito',sans-serif;margin:20px;line-height:1.6;}h1{color:#007BFF;border-bottom:2px solid #007BFF;padding-bottom:8px;}p{background:#f8f9ff;padding:12px;border-radius:6px;border-left:4px solid #007BFF;}</style></head><body><h1>Hello, World!</h1><p>This is my first webpage. Isn't HTML amazing?</p><p>I can create multiple paragraphs!</p></body></html>`;
  }
  
  // Structure preview
  function initStructurePreview() {
    const structurePreview = document.getElementById('structure-preview');
    if (!structurePreview) return;
    structurePreview.srcdoc = `<!DOCTYPE html><html><head><style>body{font-family:'Nunito',sans-serif;margin:0;line-height:1.6;}header{background:linear-gradient(135deg,#007BFF,#0056b3);color:white;padding:15px;text-align:center;font-weight:bold;}nav{background:#f8f9ff;padding:12px;text-align:center;border-bottom:1px solid #dde7ff;}main{padding:20px;background:white;}section{background:#f2f6ff;padding:20px;border-radius:8px;border:1px solid #dde7ff;}h1{color:#007BFF;margin-top:0;}footer{background:#eef4ff;padding:15px;text-align:center;border-top:1px solid #dde7ff;color:#666;}</style></head><body><header>🏠 My Awesome Website</header><nav>🧭 Home | About | Contact</nav><main><section><h1>📄 Welcome!</h1><p>📝 This is the main content area where all your important information goes.</p></section></main><footer>📜 © 2024 My Website</footer></body></html>`;
  }
  
  // Initialize enhanced code editor
  let codeEditor;
  
  // Task functionality
  function renderTask() {
    const taskEditor = document.getElementById('task-code');
    const taskPreview = document.getElementById('task-preview');
    if (!taskEditor || !taskPreview) return;
    const code = taskEditor.value;
    taskPreview.srcdoc = `<!DOCTYPE html><html><head><style>body{font-family:'Nunito',sans-serif;margin:20px;line-height:1.6;}h1,h2,h3,h4,h5,h6{color:#007BFF;border-bottom:2px solid #007BFF;padding-bottom:8px;}p{background:#f8f9ff;padding:12px;border-radius:6px;border-left:4px solid #007BFF;margin:10px 0;}</style></head><body>${code}</body></html>`;
  }
  
  // Interactive functions
  function highlightExample(element) {
    // Remove previous highlights
    document.querySelectorAll('.tag-example').forEach(el => {
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
  
  function showElementInfo(elementType) {
    const info = {
      header: "🏠 Header: Contains the site title, logo, and main branding. Usually appears at the top of every page.",
      nav: "🧭 Navigation: Contains links to different pages or sections. Helps users move around your site.",
      main: "📄 Main Content: The primary content of the page. Should contain the most important information.",
      section: "📦 Section: Groups related content together. Like chapters in a book.",
      article: "📰 Article: Self-contained content like blog posts, news articles, or comments.",
      footer: "📜 Footer: Contains site-wide information like copyright, contact details, and secondary links."
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
              padding: 20px;
              border-radius: 12px;
              box-shadow: 0 8px 24px rgba(0,0,0,0.2);
              border: 2px solid var(--brand);
              max-width: 400px;
              z-index: 10000;
              animation: popIn 0.3s ease-out;
          ">
              <div style="font-size: 1.1em; margin-bottom: 10px;">
                  ${info[elementType]}
              </div>
              <button onclick="this.parentElement.parentElement.remove()" style="
                  background: var(--brand);
                  color: white;
                  border: none;
                  padding: 8px 16px;
                  border-radius: 6px;
                  cursor: pointer;
                  font-weight: 600;
                  display: block;
                  margin: 0 auto;
              ">Got it! ✅</button>
          </div>
      `;
  
    // Add animation styles if not already added
    if (!document.getElementById('popup-animations')) {
      const style = document.createElement('style');
      style.id = 'popup-animations';
      style.textContent = `
              @keyframes popIn {
                  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                  100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
              }
          `;
      document.head.appendChild(style);
    }
  
    document.body.appendChild(popup);
  
    // Auto close after 5 seconds
    setTimeout(() => {
      if (popup.parentElement) popup.remove();
    }, 5000);
  }
  
  function showHint() {
    const hints = [
      "💡 Start with &lt;h1&gt; for your heading!",
      "🎯 Remember: &lt;h1&gt;My First Webpage&lt;/h1&gt;",
      "📝 Then add &lt;p&gt;Your text here&lt;/p&gt; for a paragraph",
      "✨ Don't forget closing tags like &lt;/h1&gt; and &lt;/p&gt;!",
      "⌨️ Use Tab to indent your code like a pro!",
      "🔧 Try pressing Ctrl+Shift+F to format your code!"
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
              padding: 15px 20px;
              border-radius: 25px;
              box-shadow: 0 6px 16px rgba(255,193,7,0.4);
              z-index: 10000;
              animation: slideInRight 0.5s ease-out;
              font-weight: 600;
              max-width: 300px;
          ">
              ${randomHint}
          </div>
      `;
  
    // Add hint animation styles if not already added
    if (!document.getElementById('hint-animations')) {
      const hintStyle = document.createElement('style');
      hintStyle.id = 'hint-animations';
      hintStyle.textContent = `
              @keyframes slideInRight {
                  0% { opacity: 0; transform: translateX(100px); }
                  100% { opacity: 1; transform: translateX(0); }
              }
              @keyframes slideOutRight {
                  0% { opacity: 1; transform: translateX(0); }
                  100% { opacity: 0; transform: translateX(100px); }
              }
          `;
      document.head.appendChild(hintStyle);
    }
  
    document.body.appendChild(hintPopup);
  
    setTimeout(() => {
      hintPopup.firstElementChild.style.animation = 'slideOutRight 0.5s ease-out';
      setTimeout(() => hintPopup.remove(), 500);
    }, 5000);
  }
  
  function checkAnswer() {
    const taskEditor = document.getElementById('task-code');
    if (!taskEditor) return;
  
    const code = taskEditor.value.trim();
    const codeLower = code.toLowerCase();
  
    // Check if code is empty or contains only whitespace/invalid characters
    if (!code || code.replace(/\s/g, '') === '') {
      showError('🤨', 'Your code is empty!', 'Please write some HTML code in the editor above.');
      return;
    }
  
    // Check for random characters without proper HTML structure
    const hasAnyHTMLTags = /<[^>]+>/.test(code);
    if (!hasAnyHTMLTags) {
      showError('😕', 'No HTML tags found!', 'HTML uses tags like &lt;h1&gt; and &lt;p&gt;. Try adding some tags to your code.');
      return;
    }
  
    // Enhanced HTML structure validation - including title tag
    const structuralTags = {
      html: {
        opening: /<html[^>]*>/i,
        closing: /<\/html>/i,
        name: 'html'
      },
      head: {
        opening: /<head[^>]*>/i,
        closing: /<\/head>/i,
        name: 'head'
      },
      body: {
        opening: /<body[^>]*>/i,
        closing: /<\/body>/i,
        name: 'body'
      },
      title: {
        opening: /<title[^>]*>/i,
        closing: /<\/title>/i,
        name: 'title'
      }
    };
  
    // Detailed tag analysis (existing)
    const hasOpeningH1 = codeLower.includes('<h1>');
    const hasClosingH1 = codeLower.includes('</h1>');
    const hasOpeningP = codeLower.includes('<p>');
    const hasClosingP = codeLower.includes('</p>');
    const hasCorrectTitle = codeLower.match(/<h1[^>]*>\s*my first webpage\s*<\/h1>/);
  
    let errorMessages = [];
    let suggestions = [];
    let structuralErrors = [];
    let structuralSuggestions = [];
  
    // Check structural HTML tags including title
    for (const [tagName, patterns] of Object.entries(structuralTags)) {
      const hasOpening = patterns.opening.test(code);
      const hasClosing = patterns.closing.test(code);
  
      if (!hasOpening && !hasClosing) {
        structuralErrors.push(`Missing &lt;${tagName}&gt; tags`);
        if (tagName === 'title') {
          structuralSuggestions.push(`Add &lt;${tagName}&gt;Your Page Title&lt;/${tagName}&gt; inside the head section`);
        } else {
          structuralSuggestions.push(`Add &lt;${tagName}&gt;&lt;/${tagName}&gt; tags to create proper HTML structure`);
        }
      } else if (hasOpening && !hasClosing) {
        structuralErrors.push(`Missing closing &lt;/${tagName}&gt; tag`);
        structuralSuggestions.push(`Every &lt;${tagName}&gt; needs a closing &lt;/${tagName}&gt; tag`);
      } else if (!hasOpening && hasClosing) {
        structuralErrors.push(`Found &lt;/${tagName}&gt; but missing opening &lt;${tagName}&gt; tag`);
        structuralSuggestions.push(`Add an opening &lt;${tagName}&gt; tag before the closing one`);
      }
    }
  
    // Check for DOCTYPE declaration
    const hasDoctype = /<!doctype\s+html>/i.test(code);
    if (!hasDoctype) {
      structuralErrors.push('Missing DOCTYPE declaration');
      structuralSuggestions.push('Add &lt;!DOCTYPE html&gt; at the very beginning of your document');
    }
  
    // Check h1 tags (existing logic)
    if (!hasOpeningH1 && !hasClosingH1) {
      errorMessages.push('Missing &lt;h1&gt; heading tag');
      suggestions.push('Add &lt;h1&gt;My First Webpage&lt;/h1&gt; for your heading');
    } else if (hasOpeningH1 && !hasClosingH1) {
      errorMessages.push('Missing closing &lt;/h1&gt; tag');
      suggestions.push('Every opening &lt;h1&gt; needs a closing &lt;/h1&gt;');
    } else if (!hasOpeningH1 && hasClosingH1) {
      errorMessages.push('Found &lt;/h1&gt; but missing opening &lt;h1&gt; tag');
      suggestions.push('Add an opening &lt;h1&gt; tag before the closing one');
    }
  
    // Check p tags (existing logic)
    if (!hasOpeningP && !hasClosingP) {
      errorMessages.push('Missing &lt;p&gt; paragraph tag');
      suggestions.push('Add &lt;p&gt;Your text here&lt;/p&gt; for your paragraph');
    } else if (hasOpeningP && !hasClosingP) {
      errorMessages.push('Missing closing &lt;/p&gt; tag');
      suggestions.push('Every opening &lt;p&gt; needs a closing &lt;/p&gt;');
    } else if (!hasOpeningP && hasClosingP) {
      errorMessages.push('Found &lt;/p&gt; but missing opening &lt;p&gt; tag');
      suggestions.push('Add an opening &lt;p&gt; tag before the closing one');
    }
  
    // Check heading content (existing logic)
    if (hasOpeningH1 && hasClosingH1 && !hasCorrectTitle) {
      errorMessages.push('Heading content is incorrect');
      suggestions.push('Your heading should contain exactly "My First Webpage"');
    }
  
    // Check for common mistakes (existing logic)
    const commonMistakes = [];
    if (code.includes('<h1') && !code.includes('</h1>')) {
      commonMistakes.push('Don\'t forget to close your &lt;h1&gt; tag with &lt;/h1&gt;');
    }
    if (code.includes('<p') && !code.includes('</p>')) {
      commonMistakes.push('Don\'t forget to close your &lt;p&gt; tag with &lt;/p&gt;');
    }
    if (code.includes('<title') && !code.includes('</title>')) {
      commonMistakes.push('Don\'t forget to close your &lt;title&gt; tag with &lt;/title&gt;');
    }
    if (code.includes('< h1') || code.includes('< p') || code.includes('< title')) {
      commonMistakes.push('Remove spaces inside your tags (use &lt;h1&gt; not &lt; h1&gt;)');
    }
  
    // Advanced tag nesting validation
    const nestingErrors = validateTagNesting(code);
    if (nestingErrors.length > 0) {
      structuralErrors.push(...nestingErrors);
    }
  
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('nextLessonBtn');
    const steps = document.querySelectorAll('.step');
  
    // Combine all error categories
    const allContentErrors = [...errorMessages, ...commonMistakes];
    const hasContentErrors = allContentErrors.length > 0;
    const hasStructuralErrors = structuralErrors.length > 0;
  
    if (!hasContentErrors && !hasStructuralErrors) {
      feedback.innerHTML = `
              <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 1.5em;">🎉</span>
                  <div>
                      <div style="font-size: 1.1em; margin-bottom: 4px;">
                          <strong>Congratulations! Perfect HTML!</strong>
                      </div>
                      <div style="opacity: 0.8;">
                          You've mastered the basics with proper HTML structure. Ready for the next challenge?
                      </div>
                  </div>
              </div>
          `;
      feedback.className = 'feedback success';
  
      // Enable next lesson button with animation
      nextBtn.disabled = false;
      nextBtn.style.opacity = '1';
      nextBtn.style.cursor = 'pointer';
      nextBtn.style.animation = 'pulse 1s infinite';
  
      // Update progress
      steps[1].classList.add('active');
      steps[2].classList.add('active');
  
      // Store completion
      localStorage.setItem('partB_lesson1_remake_complete', 'true');
      markCurrentLessonComplete();
  
      // Celebration animation
      createCelebration();
    } else {
      // Prioritize structural errors as they're more fundamental
      let primaryErrors = hasStructuralErrors ? structuralErrors : allContentErrors;
      let primarySuggestions = hasStructuralErrors ? structuralSuggestions : suggestions;
  
      // Create sections for different types of errors
      let errorContent = '';
  
      if (hasStructuralErrors) {
        errorContent += `
                  <div style="margin-bottom: 15px;">
                      <div style="font-size: 1em; margin-bottom: 8px; color: #d73527;">
                          <strong>🏗️ HTML Structure Issues:</strong>
                      </div>
                      <ul style="margin: 0; padding-left: 20px; list-style-type: none;">
                          ${structuralErrors.map(error => `<li style="margin: 4px 0; padding: 4px 0; border-left: 3px solid #d73527; padding-left: 10px; background: rgba(215,53,39,0.1); border-radius: 4px;">⚠️ ${error}</li>`).join('')}
                      </ul>
                  </div>
              `;
      }
  
      if (hasContentErrors) {
        errorContent += `
                  <div style="margin-bottom: 10px;">
                      <div style="font-size: 1em; margin-bottom: 8px; color: #e74c3c;">
                          <strong>📝 Content Issues:</strong>
                      </div>
                      <ul style="margin: 0; padding-left: 20px; list-style-type: none;">
                          ${allContentErrors.map(issue => `<li style="margin: 4px 0; padding: 4px 0; border-left: 3px solid #e74c3c; padding-left: 10px; background: rgba(231,76,60,0.1); border-radius: 4px;">❌ ${issue}</li>`).join('')}
                      </ul>
                  </div>
              `;
      }
  
      // Show the most relevant suggestion
      const mainSuggestion = hasStructuralErrors && structuralSuggestions.length > 0 ?
        structuralSuggestions[0] :
        (suggestions.length > 0 ? suggestions[0] : 'Check your HTML syntax carefully');
  
      feedback.innerHTML = `
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <span style="font-size: 1.5em;">🔧</span>
                  <div style="flex: 1;">
                      <div style="font-size: 1.1em; margin-bottom: 10px;">
                          <strong>Let's fix these HTML issues:</strong>
                      </div>
                      ${errorContent}
                      ${(structuralSuggestions.length > 0 || suggestions.length > 0) ? `
                          <div style="margin-top: 12px; padding: 10px 14px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; font-size: 0.95em;">
                              <strong>💡 Priority Fix:</strong> ${mainSuggestion}
                          </div>
                      ` : ''}
                      ${hasStructuralErrors ? `
                          <div style="margin-top: 10px; padding: 8px 12px; background: #e8f4fd; border: 1px solid #b3d9ff; border-radius: 6px; font-size: 0.9em;">
                              <strong>📚 Remember:</strong> A complete HTML document needs DOCTYPE, html, head, title, and body tags for proper structure.
                          </div>
                      ` : ''}
                  </div>
              </div>
          `;
      feedback.className = 'feedback error';
  
      // Update progress to practice step
      steps[1].classList.add('active');
    }
  
    // Add pulse animation style if not already added
    if (!document.getElementById('pulse-animation')) {
      const pulseStyle = document.createElement('style');
      pulseStyle.id = 'pulse-animation';
      pulseStyle.textContent = `
              @keyframes pulse {
                  0% { transform: scale(1); }
                  50% { transform: scale(1.05); }
                  100% { transform: scale(1); }
              }
          `;
      document.head.appendChild(pulseStyle);
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
  
    // Reset progress to first step
    steps[1].classList.remove('active');
    steps[2].classList.remove('active');
  }
  
  // Enhanced function to validate tag nesting and structure including title validation
  function validateTagNesting(code) {
    const errors = [];
  
    // Check if h1 and p tags are inside body (simplified check)
    const hasBody = /<body[^>]*>/i.test(code) && /<\/body>/i.test(code);
    const hasH1 = /<h1[^>]*>/i.test(code);
    const hasP = /<p[^>]*>/i.test(code);
  
    if (hasBody && (hasH1 || hasP)) {
      // Extract body content
      const bodyMatch = code.match(/<body[^>]*>([\s\S]*)<\/body>/i);
      if (bodyMatch) {
        const bodyContent = bodyMatch[1];
  
        // Check if h1 and p are actually inside body
        if (hasH1 && !/<h1[^>]*>/i.test(bodyContent)) {
          errors.push('&lt;h1&gt; tag should be inside &lt;body&gt; section');
        }
        if (hasP && !/<p[^>]*>/i.test(bodyContent)) {
          errors.push('&lt;p&gt; tag should be inside &lt;body&gt; section');
        }
      }
    }
  
    // Enhanced head and title relationship validation
    const hasHead = /<head[^>]*>/i.test(code) && /<\/head>/i.test(code);
    const hasTitle = /<title[^>]*>/i.test(code);
  
    if (hasHead && hasTitle) {
      // Check if title is actually inside head
      const headMatch = code.match(/<head[^>]*>([\s\S]*)<\/head>/i);
      if (headMatch) {
        const headContent = headMatch[1];
        if (!/<title[^>]*>/i.test(headContent)) {
          errors.push('&lt;title&gt; tag should be inside &lt;head&gt; section');
        }
      }
    }
  
    // Check for common title tag mistakes
    if (hasTitle) {
      const titleMatch = code.match(/<title[^>]*>(.*?)<\/title>/is);
      if (titleMatch && titleMatch[1].trim() === '') {
        errors.push('&lt;title&gt; tag should contain some text');
      }
    }
  
    // Check if title exists outside of head (common mistake)
    if (hasTitle && !hasHead) {
      errors.push('&lt;title&gt; tag should be inside &lt;head&gt; section');
    }
  
    return errors;
  }
  
  function createCelebration() {
    // Create confetti effect
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
  
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
  
      setTimeout(() => confetti.remove(), 5000);
    }
  
    // Add confetti animation if not already added
    if (!document.getElementById('confetti-animation')) {
      const confettiStyle = document.createElement('style');
      confettiStyle.id = 'confetti-animation';
      confettiStyle.textContent = `
              @keyframes confetti-fall {
                  0% {
                      transform: translateY(-10px) rotateZ(0deg);
                      opacity: 1;
                  }
                  100% {
                      transform: translateY(100vh) rotateZ(720deg);
                      opacity: 0;
                  }
              }
          `;
      document.head.appendChild(confettiStyle);
    }
  }
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+F: Format code
    if (e.ctrlKey && e.shiftKey && e.key === 'F') {
      e.preventDefault();
      if (codeEditor) {
        codeEditor.formatCode();
      }
    }
  
    // Ctrl+S: Save notification (visual feedback only)
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      showSaveNotification();
    }
  });
  
  function showSaveNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = `
          <div style="
              position: fixed;
              top: 20px;
              left: 50%;
              transform: translateX(-50%);
              background: #4ade80;
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 0.9em;
              font-weight: 600;
              z-index: 10000;
              animation: slideDown 0.3s ease-out;
          ">
              💾 Code auto-saved!
          </div>
      `;
  
    if (!document.getElementById('save-animations')) {
      const style = document.createElement('style');
      style.id = 'save-animations';
      style.textContent = `
              @keyframes slideDown {
                  0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                  100% { opacity: 1; transform: translateX(-50%) translateY(0); }
              }
          `;
      document.head.appendChild(style);
    }
  
    document.body.appendChild(notification);
  
    setTimeout(() => notification.remove(), 2000);
  }
  
  // Add the missing markCurrentLessonComplete function
  function markCurrentLessonComplete() {
    // This function would typically be in lesson-navigation.js
    console.log('Lesson marked as complete');
  
    const currentLesson = getCurrentLessonNumber();
    localStorage.setItem(`partB_lesson${currentLesson}_complete`, 'true');
  }
  
  function getCurrentLessonNumber() {
    const path = window.location.pathname;
    const match = path.match(/lesson(\d+)/);
    return match ? parseInt(match[1]) : 1;
  }
  
  // Enhanced code editor helper functions
  function insertHTMLTemplate() {
    if (codeEditor) {
      const template = `<!DOCTYPE html>
  <html>
  <head>
    <title>My First Webpage</title>
  </head>
  <body>
    <h1>My First Webpage</h1>
    <p>Welcome to my website!</p>
  </body>
  </html>`;
      codeEditor.textarea.value = template;
      codeEditor.updateEditor();
    }
  }
  
  function clearEditor() {
    if (codeEditor) {
      codeEditor.textarea.value = '';
      codeEditor.updateEditor();
    }
  }
  
  // Add helpful keyboard shortcut notifications
  function showKeyboardShortcuts() {
    const shortcuts = document.createElement('div');
    shortcuts.innerHTML = `
          <div style="
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: #2d2d30;
              color: #cccccc;
              padding: 20px;
              border-radius: 12px;
              box-shadow: 0 8px 24px rgba(0,0,0,0.3);
              z-index: 10000;
              font-family: 'Consolas', monospace;
              font-size: 0.9em;
              min-width: 300px;
          ">
              <h3 style="color: #007acc; margin-top: 0;">⌨️ Editor Shortcuts</h3>
              <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 8px; margin: 15px 0;">
                  <span>Tab</span><span>→ Indent code</span>
                  <span>Shift+Tab</span><span>→ Remove indent</span>
                  <span>Enter</span><span>→ Smart new line</span>
                  <span>Ctrl+S</span><span>→ Save feedback</span>
                  <span>Ctrl+Shift+F</span><span>→ Format code</span>
              </div>
              <button onclick="this.parentElement.remove()" style="
                  background: #007acc;
                  color: white;
                  border: none;
                  padding: 8px 16px;
                  border-radius: 6px;
                  cursor: pointer;
                  font-weight: 600;
                  display: block;
                  margin: 15px auto 0;
              ">Got it!</button>
          </div>
      `;
  
    document.body.appendChild(shortcuts);
  }
  
  // Attach navigation to Next Lesson button
  document.addEventListener('DOMContentLoaded', () => {
    updateDemo();
    initStructurePreview();
    renderTask();
  
  
    // Initialize code editor
    codeEditor = new HTMLCodeEditor('task-code', 'line-numbers');
  
  
    // Fix Next Lesson button navigation
    const nextBtn = document.getElementById('nextLessonBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const nextLesson = getCurrentLessonNumber() + 1;
        window.location.href = `/2. partB/lesson${nextLesson}_remake.html`;
      });
    }
  });
  
  // Add sparkle animation
  const sparkleStyle = document.createElement('style');
  sparkleStyle.textContent = `
      @keyframes sparkle {
          0% { opacity: 1; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.7; transform: scale(1.2) rotate(180deg); }
          100% { opacity: 0; transform: scale(0.8) rotate(360deg); }
      }
  `;
  document.head.appendChild(sparkleStyle);
  
  /**
   * Check if lesson was previously completed and restore UI state
   * This runs when the page loads to handle returning users
   */
  function checkAndRestoreCompletion() {
    setTimeout(() => {
      const isCompleted = localStorage.getItem('partB_lesson1_remake_complete') === 'true';
  
      console.log('Checking completion:', isCompleted);
  
      if (isCompleted) {
        const feedback = document.getElementById('feedback');
        const nextBtn = document.getElementById('nextLessonBtn');
        const steps = document.querySelectorAll('.step');
  
        console.log('Elements found:', {
          feedback,
          nextBtn,
          steps: steps.length
        });
  
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
  
          console.log('UI restored for completed lesson');
        }
      }
    }, 100);
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