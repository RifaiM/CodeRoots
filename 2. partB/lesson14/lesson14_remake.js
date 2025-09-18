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
  const taskEditor = document.getElementById('code-editor');
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

// Enhanced Lesson 14 JavaScript - Interactive Mini Project

// Initialize elements
const codeEditor = document.getElementById('code-editor');
const previewFrame = document.getElementById('preview-frame');
const lineCounter = document.getElementById('line-counter');

// Project template for beginners
const projectTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <style>
        /* CSS Reset & Variables */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --primary: #007bff;
            --secondary: #6c757d;
            --success: #28a745;
            --text: #333;
            --bg: #f8f9fa;
            --light: #ffffff;
            --border: #dee2e6;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--text);
            background: var(--bg);
            padding-bottom: 60px; /* Space for footer */
        }
        
        /* Theme Support */
        body.dark-theme {
            --text: #f8f9fa;
            --bg: #343a40;
            --light: #495057;
            --border: #6c757d;
        }
        
        /* Header Styles */
        header {
            background: var(--primary);
            color: white;
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        nav {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        nav h1 {
            font-size: 1.5rem;
            margin: 0;
        }
        
        #themeToggle {
            background: rgba(255,255,255,0.2);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
        }
        
        #themeToggle:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }
        
        /* Main Content */
        main {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        section {
            background: var(--light);
            margin: 2rem 0;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        
        section:hover {
            transform: translateY(-5px);
        }
        
        h2 {
            color: var(--primary);
            margin-bottom: 1rem;
            font-size: 2rem;
        }
        
        /* Skills Section */
        .skill-item {
            margin: 1.5rem 0;
        }
        
        .skill-item h3 {
            margin-bottom: 0.5rem;
            color: var(--text);
        }
        
        .skill-bar {
            width: 100%;
            height: 25px;
            background: var(--border);
            border-radius: 15px;
            overflow: hidden;
            position: relative;
        }
        
        .skill-progress {
            height: 100%;
            background: linear-gradient(45deg, var(--primary), var(--success));
            width: 0;
            border-radius: 15px;
            transition: width 2s ease-in-out;
            position: relative;
        }
        
        .skill-progress::after {
            content: attr(data-skill) '%';
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            font-weight: bold;
            font-size: 0.8rem;
        }
        
        /* Contact Form */
        form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        input, textarea {
            padding: 1rem;
            border: 2px solid var(--border);
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
            background: var(--light);
            color: var(--text);
        }
        
        input:focus, textarea:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }
        
        button[type="submit"] {
            background: var(--primary);
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
        }
        
        button[type="submit"]:hover {
            background: #0056b3;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,123,255,0.3);
        }
        
        /* Footer */
        footer {
            background: var(--text);
            color: var(--light);
            text-align: center;
            padding: 2rem;
            position: fixed;
            bottom: 0;
            width: 100%;
            box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            nav {
                flex-direction: column;
                gap: 1rem;
                padding: 1rem;
            }
            
            main {
                padding: 1rem;
            }
            
            section {
                padding: 1.5rem;
            }
            
            h2 {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <!-- Header Section -->
    <header>
        <nav>
            <h1>Your Name Here</h1>
            <button id="themeToggle">🌙 Dark Mode</button>
        </nav>
    </header>
    
    <!-- Main Content -->
    <main>
        <!-- About Section -->
        <section id="about">
            <h2>About Me</h2>
            <p>Hello! I'm a passionate web developer learning HTML, CSS, and JavaScript. I love creating interactive and user-friendly websites that solve real problems.</p>
            <p>This portfolio showcases my journey in web development and the skills I've acquired along the way.</p>
        </section>
        
        <!-- Skills Section -->
        <section id="skills">
            <h2>My Skills</h2>
            
            <div class="skill-item">
                <h3>HTML</h3>
                <div class="skill-bar">
                    <div class="skill-progress" data-skill="90"></div>
                </div>
            </div>
            
            <div class="skill-item">
                <h3>CSS</h3>
                <div class="skill-bar">
                    <div class="skill-progress" data-skill="85"></div>
                </div>
            </div>
            
            <div class="skill-item">
                <h3>JavaScript</h3>
                <div class="skill-bar">
                    <div class="skill-progress" data-skill="75"></div>
                </div>
            </div>
            
            <div class="skill-item">
                <h3>Responsive Design</h3>
                <div class="skill-bar">
                    <div class="skill-progress" data-skill="80"></div>
                </div>
            </div>
        </section>
        
        <!-- Contact Section -->
        <section id="contact">
            <h2>Contact Me</h2>
            <form id="contactForm">
                <input type="text" id="name" name="name" placeholder="Your Name" required>
                <input type="email" id="email" name="email" placeholder="Your Email" required>
                <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
            <div id="formFeedback"></div>
        </section>
    </main>
    
    <!-- Footer -->
    <footer>
        <p>© 2024 Your Name Here. All rights reserved.</p>
        <p>Built with HTML, CSS, and JavaScript</p>
    </footer>
    
    <script>
        // Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            
            if (body.classList.contains('dark-theme')) {
                themeToggle.textContent = '☀️ Light Mode';
                themeToggle.style.background = 'rgba(0,0,0,0.2)';
            } else {
                themeToggle.textContent = '🌙 Dark Mode';
                themeToggle.style.background = 'rgba(255,255,255,0.2)';
            }
        });
        
        // Skill Progress Animation
        function animateSkills() {
            const skillBars = document.querySelectorAll('.skill-progress');
            
            skillBars.forEach(bar => {
                const skillLevel = bar.getAttribute('data-skill');
                setTimeout(() => {
                    bar.style.width = skillLevel + '%';
                }, 500);
            });
        }
        
        // Form Validation and Submission
        const contactForm = document.getElementById('contactForm');
        const formFeedback = document.getElementById('formFeedback');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Clear previous feedback
            formFeedback.innerHTML = '';
            
            // Basic validation
            if (!name || !email || !message) {
                showFormFeedback('Please fill in all fields!', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormFeedback('Please enter a valid email address!', 'error');
                return;
            }
            
            // Success
            showFormFeedback('Thank you! Your message has been sent successfully!', 'success');
            contactForm.reset();
        });
        
        function showFormFeedback(message, type) {
            formFeedback.innerHTML = \`<p style="color: \${type === 'error' ? '#dc3545' : '#28a745'}; font-weight: 600; margin-top: 1rem; padding: 1rem; background: \${type === 'error' ? '#f8d7da' : '#d4edda'}; border-radius: 8px;">\${message}</p>\`;
            
            if (type === 'success') {
                setTimeout(() => {
                    formFeedback.innerHTML = '';
                }, 5000);
            }
        }
        
        // Initialize animations when page loads
        window.addEventListener('load', function() {
            animateSkills();
        });
        
        // Smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</body>
</html>`;

// Interactive Component Tab System
class ComponentTabs {
  constructor() {
    this.tabs = document.querySelectorAll('.component-tab');
    this.panels = document.querySelectorAll('.content-panel');
    this.init();
  }

  init() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab));
    });
  }

  switchTab(activeTab) {
    const targetComponent = activeTab.dataset.component;

    // Update active tab
    this.tabs.forEach(tab => tab.classList.remove('active'));
    activeTab.classList.add('active');

    // Update active panel
    this.panels.forEach(panel => panel.classList.remove('active'));
    document.getElementById(`${targetComponent}-panel`).classList.add('active');

    // Add animation
    activeTab.style.animation = 'none';
    activeTab.offsetHeight; // Trigger reflow
    activeTab.style.animation = 'fadeInUp 0.3s ease-out';
  }
}

// Build Steps Accordion System
class BuildStepsAccordion {
  constructor() {
    this.steps = document.querySelectorAll('.build-step');
    this.init();
  }

  init() {
    this.steps.forEach(step => {
      const header = step.querySelector('.step-header');
      header.addEventListener('click', () => this.toggleStep(step));
    });
  }

  toggleStep(step) {
    const isExpanded = step.classList.contains('expanded');

    // Close all steps
    this.steps.forEach(s => s.classList.remove('expanded'));

    // Open clicked step if it wasn't expanded
    if (!isExpanded) {
      step.classList.add('expanded');
    }
  }
}

// Workspace Controls
class WorkspaceManager {
  constructor() {
    this.loadTemplateBtn = document.getElementById('load-template');
    this.clearCodeBtn = document.getElementById('clear-code');
    this.formatCodeBtn = document.getElementById('format-code');
    this.refreshPreviewBtn = document.getElementById('refresh-preview');
    this.fullscreenPreviewBtn = document.getElementById('fullscreen-preview');

    this.init();
  }

  init() {
    this.loadTemplateBtn?.addEventListener('click', () => this.loadTemplate());
    this.clearCodeBtn?.addEventListener('click', () => this.clearCode());
    this.formatCodeBtn?.addEventListener('click', () => this.formatCode());
    this.refreshPreviewBtn?.addEventListener('click', () => this.refreshPreview());
    this.fullscreenPreviewBtn?.addEventListener('click', () => this.fullscreenPreview());
  }

  loadTemplate() {
    if (confirm('This will replace your current code. Continue?')) {
      codeEditor.value = projectTemplate;
      this.updatePreview();
      this.updateLineCounter();
      this.showNotification('Template loaded successfully!', 'success');
    }
  }

  clearCode() {
    if (confirm('This will delete all your code. Are you sure?')) {
      codeEditor.value = '';
      this.updatePreview();
      this.updateLineCounter();
      this.showNotification('Code cleared', 'info');
    }
  }

  formatCode() {
    // Basic code formatting
    let code = codeEditor.value;

    // Simple HTML formatting
    code = code.replace(/></g, '>\n<');
    code = code.replace(/\s+</g, '\n<');
    code = code.replace(/>\s+/g, '>\n');

    // Fix indentation
    const lines = code.split('\n');
    let indentLevel = 0;
    const indentSize = 4;

    const formattedLines = lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';

      // Decrease indent for closing tags
      if (trimmed.startsWith('</') || trimmed.includes('</') && !trimmed.includes('</')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const indented = ' '.repeat(indentLevel * indentSize) + trimmed;

      // Increase indent for opening tags
      if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.includes('/>')) {
        indentLevel++;
      }

      return indented;
    });

    codeEditor.value = formattedLines.join('\n');
    this.updatePreview();
    this.showNotification('Code formatted!', 'success');
  }

  refreshPreview() {
    this.updatePreview();
    this.showNotification('Preview refreshed!', 'info');
  }

  fullscreenPreview() {
    const code = codeEditor.value || this.getEmptyPreview();
    const newWindow = window.open('', 'Preview', 'width=1024,height=768');
    if (newWindow) {
      newWindow.document.write(code);
      newWindow.document.close();
    } else {
      alert('Pop-up blocked! Please allow pop-ups to view fullscreen preview.');
    }
  }

  updatePreview() {
    const code = codeEditor.value || this.getEmptyPreview();
    previewFrame.srcdoc = code;
  }

  getEmptyPreview() {
    return `<!DOCTYPE html>
<html>
<head>
<style>
    body {
        font-family: Arial, sans-serif;
        padding: 40px;
        text-align: center;
        background: #f8f9ff;
        color: #666;
        margin: 0;
    }
    .placeholder {
        border: 2px dashed #dde7ff;
        padding: 40px;
        border-radius: 12px;
        background: #f2f6ff;
    }
    .icon { font-size: 3rem; margin-bottom: 20px; }
</style>
</head>
<body>
<div class="placeholder">
    <div class="icon">🚀</div>
    <h2>Start Building Your Portfolio!</h2>
    <p>Your code will appear here as you type</p>
</div>
</body>
</html>`;
  }

  updateLineCounter() {
    if (lineCounter) {
      const lines = codeEditor.value.split('\n').length;
      lineCounter.textContent = `Lines: ${lines}`;
    }
  }

  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
            border-radius: 8px;
            z-index: 10000;
            font-weight: 600;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
        `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Project Validation System
class ProjectValidator {
  constructor() {
    this.checkButton = document.getElementById('check-project');
    this.nextButton = document.getElementById('next-lesson');
    this.feedbackArea = document.getElementById('feedback');
    this.progressSteps = document.querySelectorAll('.step');

    this.init();
  }

  init() {
    this.checkButton?.addEventListener('click', () => this.validateProject());
  }

  validateProject() {
    // Check if lesson is already completed
    const isAlreadyCompleted = localStorage.getItem('partB_lesson14_remake_complete') === 'true';

    if (isAlreadyCompleted) {
      this.showAlreadyCompletedMessage();
      return;
    }

    const code = codeEditor.value.trim();

    if (!code) {
      this.showFeedback('empty');
      return;
    }

    const results = this.runValidationChecks(code);
    this.displayResults(results);
  }

  runValidationChecks(code) {
    const results = {
      html: this.checkHTML(code),
      css: this.checkCSS(code),
      javascript: this.checkJavaScript(code),
      integration: this.checkIntegration(code)
    };

    results.score = this.calculateScore(results);
    results.passed = results.score >= 80;

    return results;
  }

  checkHTML(code) {
    const checks = {
      hasDoctype: /<!DOCTYPE\s+html>/i.test(code),
      hasHtmlTags: /<html[^>]*>[\s\S]*<\/html>/i.test(code),
      hasHead: /<head[^>]*>[\s\S]*<\/head>/i.test(code),
      hasBody: /<body[^>]*>[\s\S]*<\/body>/i.test(code),
      hasTitle: /<title[^>]*>[\s\S]*?<\/title>/i.test(code),
      hasHeader: /<header[^>]*>[\s\S]*?<\/header>/i.test(code),
      hasMain: /<main[^>]*>[\s\S]*?<\/main>/i.test(code),
      hasFooter: /<footer[^>]*>[\s\S]*?<\/footer>/i.test(code),
      hasSections: (code.match(/<section[^>]*>/gi) || []).length >= 3,
      hasAbout: /id\s*=\s*["'`]about["'`]/i.test(code),
      hasSkills: /id\s*=\s*["'`]skills["'`]/i.test(code),
      hasContact: /id\s*=\s*["'`]contact["'`]/i.test(code),
      hasForm: /<form[^>]*>[\s\S]*?<\/form>/i.test(code),
      hasInputs: (code.match(/<input[^>]*>/gi) || []).length >= 2,
      hasTextarea: /<textarea[^>]*>[\s\S]*?<\/textarea>/i.test(code),
      hasSubmitButton: /<button[^>]*type\s*=\s*["'`]submit["'`]/i.test(code)
    };

    const passed = Object.values(checks).filter(Boolean).length;
    const total = Object.keys(checks).length;

    return {
      checks,
      score: Math.round((passed / total) * 100),
      passed: passed >= 12 // Minimum required checks
    };
  }

  checkCSS(code) {
    const cssContent = this.extractCSS(code);

    const checks = {
      hasStyles: /<style[^>]*>[\s\S]*?<\/style>/i.test(code),
      hasBoxSizing: /box-sizing\s*:\s*border-box/i.test(cssContent),
      hasFlexbox: /display\s*:\s*flex/i.test(cssContent),
      hasVariables: /--[a-zA-Z-]+\s*:/i.test(cssContent),
      hasHover: /:hover\s*\{/i.test(cssContent),
      hasTransitions: /transition\s*:/i.test(cssContent),
      hasMediaQueries: /@media[^{]*\{[\s\S]*?\}/i.test(cssContent),
      hasColorScheme: /color\s*:\s*[^;]+/i.test(cssContent),
      hasPadding: /padding\s*:/i.test(cssContent),
      hasMargin: /margin\s*:/i.test(cssContent),
      hasBorderRadius: /border-radius\s*:/i.test(cssContent),
      hasBackground: /background[^:]*:/i.test(cssContent)
    };

    const passed = Object.values(checks).filter(Boolean).length;
    const total = Object.keys(checks).length;

    return {
      checks,
      score: Math.round((passed / total) * 100),
      passed: passed >= 8 // Minimum required checks
    };
  }

  checkJavaScript(code) {
    const jsContent = this.extractJavaScript(code);

    const checks = {
      hasScript: /<script[^>]*>[\s\S]*?<\/script>/i.test(code),
      hasEventListeners: /addEventListener\s*\(/i.test(jsContent),
      hasGetElementById: /document\.getElementById/i.test(jsContent),
      hasDOMManipulation: /\.innerHTML|\.textContent|\.style\.|\.classList/i.test(jsContent),
      hasThemeToggle: /toggle|dark|light/i.test(jsContent) && /classList/i.test(jsContent),
      hasFormValidation: /preventDefault\s*\(\)|e\.preventDefault/i.test(jsContent),
      hasVariables: /(const|let|var)\s+\w+/i.test(jsContent),
      hasFunctions: /function\s+\w+|=>\s*{|\w+\s*=\s*function/i.test(jsContent),
      hasConditions: /if\s*\(/i.test(jsContent),
      hasQuerySelector: /querySelector|getElementById/i.test(jsContent)
    };

    const passed = Object.values(checks).filter(Boolean).length;
    const total = Object.keys(checks).length;

    return {
      checks,
      score: Math.round((passed / total) * 100),
      passed: passed >= 6 // Minimum required checks
    };
  }

  checkIntegration(code) {
    const checks = {
      themeToggleWorks: /themeToggle/.test(code) && /addEventListener/.test(code),
      formValidationExists: /form/.test(code) && /preventDefault/.test(code),
      skillsAnimated: /skill/.test(code) && (/width|progress/.test(code)),
      responsiveDesign: /@media/.test(code),
      consistentNaming: /id\s*=\s*["'`]\w+["'`]/.test(code),
      properStructure: code.includes('<!DOCTYPE') && code.includes('</html>')
    };

    const passed = Object.values(checks).filter(Boolean).length;
    const total = Object.keys(checks).length;

    return {
      checks,
      score: Math.round((passed / total) * 100),
      passed: passed >= 4
    };
  }

  extractCSS(code) {
    const styleMatches = code.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    return styleMatches ? styleMatches.join('\n') : '';
  }

  extractJavaScript(code) {
    const scriptMatches = code.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
    return scriptMatches ? scriptMatches.join('\n') : '';
  }

  calculateScore(results) {
    const weights = {
      html: 0.4,
      css: 0.3,
      javascript: 0.2,
      integration: 0.1
    };
    return Math.round(
      results.html.score * weights.html +
      results.css.score * weights.css +
      results.javascript.score * weights.javascript +
      results.integration.score * weights.integration
    );
  }

  displayResults(results) {
    if (results.passed) {
      this.showSuccessFeedback(results);
      this.enableNextLesson();
      this.updateProgress(3);
    } else {
      this.showImprovementFeedback(results);
      this.updateProgress(2);
    }
  }

  showSuccessFeedback(results) {
    this.feedbackArea.className = 'feedback-area success';
    this.feedbackArea.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 20px;">
                <div style="font-size: 3rem;">🎉</div>
                <div style="flex: 1;">
                    <h3 style="margin: 0 0 12px 0; color: #155724;">Outstanding Portfolio Project!</h3>
                    <div style="background: rgba(39,174,96,0.1); padding: 12px; border-radius: 8px; margin: 12px 0;">
                        <strong>Overall Score: ${results.score}%</strong>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 16px 0;">
                        <div>
                            <strong>HTML: ${results.html.score}%</strong>
                            <div style="font-size: 0.9em; color: #666;">Structure & Semantics</div>
                        </div>
                        <div>
                            <strong>CSS: ${results.css.score}%</strong>
                            <div style="font-size: 0.9em; color: #666;">Styling & Layout</div>
                        </div>
                        <div>
                            <strong>JavaScript: ${results.javascript.score}%</strong>
                            <div style="font-size: 0.9em; color: #666;">Interactivity</div>
                        </div>
                        <div>
                            <strong>Integration: ${results.integration.score}%</strong>
                            <div style="font-size: 0.9em; color: #666;">Everything Working</div>
                        </div>
                    </div>
                    <p style="margin: 16px 0;">You've successfully created a complete, professional portfolio website! You've mastered HTML structure, CSS styling, JavaScript interactivity, and brought it all together seamlessly.</p>
                    <div style="background: #e8f5e8; border-left: 4px solid #27ae60; padding: 12px; border-radius: 4px; margin: 12px 0;">
                        <strong>Ready for the Final Challenge!</strong> Your project demonstrates real-world web development skills.
                    </div>
                </div>
            </div>
        `;
  }

  // function to the ProjectValidator class, after the showSuccessFeedback method:

  showAlreadyCompletedMessage() {
    this.feedbackArea.className = 'feedback-area success';
    this.feedbackArea.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 20px;">
                <div style="font-size: 3rem;">🏆</div>
                <div style="flex: 1;">
                    <h3 style="margin: 0 0 12px 0; color: #155724;">Lesson Already Completed!</h3>
                    <div style="background: rgba(39,174,96,0.1); padding: 16px; border-radius: 8px; margin: 12px 0; border-left: 4px solid #27ae60;">
                        <strong>🎉 Congratulations!</strong> You've already successfully completed this mini project lesson.
                    </div>
                    <p style="margin: 16px 0; line-height: 1.6;">
                        Your portfolio project has been validated and meets all requirements. You can:
                    </p>
                    <div style="background: #e8f5e8; padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
                            <li><strong>Continue to the next lesson</strong> using the green button below</li>
                            <li><strong>Review and improve</strong> your existing project code</li>
                            <li><strong>Start a new variation</strong> of your portfolio project</li>
                            <li><strong>Help others</strong> by sharing your completed project</li>
                        </ul>
                    </div>
                    <div style="background: #d1ecf1; border: 1px solid #bee5eb; border-radius: 6px; padding: 12px; margin: 12px 0;">
                        <strong>💡 Pro Tip:</strong> Even though you've completed this lesson, you can always come back to refine your portfolio or try different design approaches!
                    </div>
                </div>
            </div>
        `;
  }

  showImprovementFeedback(results) {
    this.feedbackArea.className = 'feedback-area error';

    const improvements = [];

    if (!results.html.passed) {
      improvements.push("Complete HTML structure with all required sections");
    }
    if (!results.css.passed) {
      improvements.push("Add more CSS styling including flexbox and responsive design");
    }
    if (!results.javascript.passed) {
      improvements.push("Include more JavaScript functionality like theme toggle and form validation");
    }
    if (!results.integration.passed) {
      improvements.push("Ensure all components work together properly");
    }

    this.feedbackArea.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 20px;">
                <div style="font-size: 2.5rem;">🔧</div>
                <div style="flex: 1;">
                    <h3 style="margin: 0 0 12px 0; color: #721c24;">Keep Building - You're Making Progress!</h3>
                    <div style="background: rgba(231,76,60,0.1); padding: 12px; border-radius: 8px; margin: 12px 0;">
                        <strong>Current Score: ${results.score}% (Need 80% to pass)</strong>
                    </div>
                    <div style="margin: 16px 0;">
                        <strong>Areas to improve:</strong>
                        <ul style="margin: 8px 0; padding-left: 20px;">
                            ${improvements.map(item => `<li style="margin: 6px 0;">${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 16px 0;">
                        <div style="padding: 8px; background: ${results.html.passed ? '#e8f5e8' : '#fadbd8'}; border-radius: 6px;">
                            <strong>HTML: ${results.html.score}%</strong>
                            <div style="font-size: 0.9em; color: #666;">Structure & Semantics</div>
                        </div>
                        <div style="padding: 8px; background: ${results.css.passed ? '#e8f5e8' : '#fadbd8'}; border-radius: 6px;">
                            <strong>CSS: ${results.css.score}%</strong>
                            <div style="font-size: 0.9em; color: #666;">Styling & Layout</div>
                        </div>
                        <div style="padding: 8px; background: ${results.javascript.passed ? '#e8f5e8' : '#fadbd8'}; border-radius: 6px;">
                            <strong>JavaScript: ${results.javascript.score}%</strong>
                            <div style="font-size: 0.9em; color: #666;">Interactivity</div>
                        </div>
                        <div style="padding: 8px; background: ${results.integration.passed ? '#e8f5e8' : '#fadbd8'}; border-radius: 6px;">
                            <strong>Integration: ${results.integration.score}%</strong>
                            <div style="font-size: 0.9em; color: #666;">Everything Working</div>
                        </div>
                    </div>
                    <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 12px; margin: 12px 0;">
                        <strong>Need help?</strong> Click "Show Detailed Help" for step-by-step guidance and complete examples!
                    </div>
                </div>
            </div>
        `;
  }

  showFeedback(type) {
    this.feedbackArea.className = 'feedback-area error';

    if (type === 'empty') {
      this.feedbackArea.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="font-size: 2rem;">📝</div>
                    <div>
                        <h3 style="margin: 0 0 8px 0; color: #721c24;">Ready to Start Building?</h3>
                        <p style="margin: 0; line-height: 1.5;">Your workspace is empty! Click "Load Template" to get started with a complete example, or begin writing your own HTML, CSS, and JavaScript code.</p>
                    </div>
                </div>
            `;
    }
  }

  enableNextLesson() {
    this.nextButton.disabled = false;
    this.nextButton.style.opacity = '1';
    this.nextButton.style.cursor = 'pointer';

    // Store completion
    localStorage.setItem('partB_lesson14_remake_complete', 'true');
    markCurrentLessonComplete();
  }

  updateProgress(stepNumber) {
    this.progressSteps.forEach((step, index) => {
      if (index < stepNumber) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }
}

// Detailed Help System
class HelpSystem {
  constructor() {
    this.helpButton = document.getElementById('show-detailed-help');
    this.init();
  }

  init() {
    this.helpButton?.addEventListener('click', () => this.showDetailedHelp());
  }

  showDetailedHelp() {
    const helpContent = `
🚀 COMPLETE MINI PROJECT GUIDE

📋 STEP 1: HTML FOUNDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Start with this basic structure:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <style>
        /* CSS will go here */
    </style>
</head>
<body>
    <header>
        <nav>
            <h1>Your Name</h1>
            <button id="themeToggle">🌙 Toggle Theme</button>
        </nav>
    </header>
    
    <main>
        <section id="about">
            <h2>About Me</h2>
            <p>Write about yourself...</p>
        </section>
        
        <section id="skills">
            <h2>My Skills</h2>
            <!-- Skill bars will go here -->
        </section>
        
        <section id="contact">
            <h2>Contact</h2>
            <form id="contactForm">
                <input type="text" id="name" placeholder="Name" required>
                <input type="email" id="email" placeholder="Email" required>
                <textarea id="message" placeholder="Message" required></textarea>
                <button type="submit">Send</button>
            </form>
        </section>
    </main>
    
    <footer>
        <p>© 2024 Your Name</p>
    </footer>
    
    <script>
        /* JavaScript will go here */
    </script>
</body>
</html>

🎨 STEP 2: CSS STYLING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add these CSS rules inside <style> tags:

/* Reset & Variables */
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
    --primary: #007bff;
    --text: #333;
    --bg: #f8f9fa;
    --light: #ffffff;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: var(--text);
    background: var(--bg);
}

/* Dark theme support */
body.dark-theme {
    --text: #f8f9fa;
    --bg: #343a40;
    --light: #495057;
}

/* Header styling */
header {
    background: var(--primary);
    color: white;
    padding: 1rem 0;
    position: sticky;
    top: 0;
}

nav {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#themeToggle {
    background: rgba(255,255,255,0.2);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

#themeToggle:hover {
    background: rgba(255,255,255,0.3);
}

/* Main content */
main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

section {
    background: var(--light);
    margin: 2rem 0;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Form styling */
form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

input, textarea {
    padding: 1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    background: var(--light);
    color: var(--text);
}

input:focus, textarea:focus {
    outline: none;
    border-color: var(--primary);
}

button[type="submit"] {
    background: var(--primary);
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

/* Mobile responsive */
@media (max-width: 768px) {
    nav { flex-direction: column; gap: 1rem; }
    main { padding: 1rem; }
}

⚡ STEP 3: JAVASCRIPT FUNCTIONALITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add this JavaScript inside <script> tags:

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        themeToggle.textContent = '🌙 Dark Mode';
    }
});

// Form validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email!');
        return;
    }
    
    // Success
    alert('Thank you! Message sent successfully!');
    contactForm.reset();
});

🔧 STEP 4: TESTING CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ HTML Structure:
   - Complete DOCTYPE and HTML tags
   - Header with navigation
   - Main with sections (about, skills, contact)
   - Form with inputs and submit button
   - Footer

✅ CSS Styling:
   - CSS variables and reset
   - Flexbox layouts
   - Responsive design with media queries
   - Theme support
   - Professional styling

✅ JavaScript Features:
   - Theme toggle button works
   - Form validation prevents submission
   - Event listeners attached
   - DOM manipulation working

✅ Integration:
   - All components work together
   - No console errors
   - Mobile responsive
   - Professional appearance

💡 COMMON ISSUES & FIXES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Theme toggle not working:
   ✅ Check ID matches: id="themeToggle"
   ✅ Ensure JavaScript uses same ID
   ✅ Add dark-theme CSS class

❌ Form not validating:
   ✅ Add preventDefault() in event handler
   ✅ Check input IDs match JavaScript
   ✅ Include required validation

❌ Layout broken on mobile:
   ✅ Add viewport meta tag
   ✅ Include @media queries
   ✅ Use flexible units (rem, %)

❌ Styling not applied:
   ✅ CSS inside <style> tags in <head>
   ✅ Check CSS syntax and selectors
   ✅ Verify class names match

🚀 READY TO BUILD?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Click "Load Template" for complete working example
2. Or copy the code above step by step
3. Customize with your own content
4. Test on both desktop and mobile
5. Click "Check My Project" when ready!

Remember: This is YOUR portfolio - make it personal and unique!
        `;

    // Create help modal
    const modal = document.createElement('div');
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;

    const content = document.createElement('div');
    content.style.cssText = `
            background: white;
            border-radius: 12px;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        `;

    const header = document.createElement('div');
    header.style.cssText = `
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            color: white;
            padding: 20px;
            border-radius: 12px 12px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;

    const title = document.createElement('h2');
    title.textContent = 'Complete Project Guide';
    title.style.margin = '0';

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
            background: rgba(255,255,255,0.2);
            color: white;
            border: none;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

    const body = document.createElement('div');
    body.style.cssText = `
            padding: 30px;
            font-family: monospace;
            font-size: 13px;
            line-height: 1.5;
            white-space: pre-wrap;
            color: #333;
        `;
    body.textContent = helpContent;

    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });

    header.appendChild(title);
    header.appendChild(closeBtn);
    content.appendChild(header);
    content.appendChild(body);
    modal.appendChild(content);
    document.body.appendChild(modal);
  }
}

// Live preview updater
class LivePreview {
  constructor() {
    this.updatePreview();
    codeEditor.addEventListener('input', () => {
      this.updatePreview();
      this.updateLineCounter();
    });
  }

  updatePreview() {
    const code = codeEditor.value || this.getEmptyPreview();
    previewFrame.srcdoc = code;
  }

  updateLineCounter() {
    if (lineCounter) {
      const lines = codeEditor.value.split('\n').length;
      lineCounter.textContent = `Lines: ${lines}`;
    }
  }

  getEmptyPreview() {
    return `<!DOCTYPE html>
<html>
<head>
<style>
    body {
        font-family: Arial, sans-serif;
        padding: 40px;
        text-align: center;
        background: #f8f9ff;
        color: #666;
        margin: 0;
    }
    .placeholder {
        border: 2px dashed #dde7ff;
        padding: 40px;
        border-radius: 12px;
        background: #f2f6ff;
    }

    @media (max-width: 480px) {
      body {
        padding: 10px;
      }

      .placeholder {
        padding: 10px;
      }

      .placeholder .icon {
        font-size: 1.2rem;
      }

      .placeholder h2 {
        font-size: 1rem;
      }

      .placeholder p {
        font-size: 0.8rem;
      }
    }

    @media (max-width: 768px) {
      body {
        padding: 10px;
      }

      .placeholder {
        padding: 10px;
      }

      .placeholder .icon {
        font-size: 1.2rem;
      }

      .placeholder h2 {
        font-size: 1rem;
      }

      .placeholder p {
        font-size: 0.8rem;
      }
    }
    .icon { font-size: 3rem; margin-bottom: 20px; }
</style>
</head>
<body>
<div class="placeholder">
    <div class="icon">🚀</div>
    <h2>Start Building Your Portfolio!</h2>
    <p>Your code will appear here as you type</p>
</div>
</body>
</html>`;
  }
}

// Next lesson functionality
class NavigationManager {
  constructor() {
    const nextBtn = document.getElementById('next-lesson');
    nextBtn?.addEventListener('click', () => {
      if (!nextBtn.disabled) {
        window.location.href = '/2. partB/lesson15/lesson15_remake.html';
      }
    });
  }
}

// CSS animations
const animationCSS = `
@keyframes slideInRight {
    0% { opacity: 0; transform: translateX(100px); }
    100% { opacity: 1; transform: translateX(0); }
}

@keyframes slideOutRight {
    0% { opacity: 1; transform: translateX(0); }
    100% { opacity: 0; transform: translateX(100px); }
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
`;

// Initialize everything when DOM is loaded
// Update the DOMContentLoaded event listener to show completion message on page load:

document.addEventListener('DOMContentLoaded', function () {
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = animationCSS;
  document.head.appendChild(style);

  // Initialize all systems
  new ComponentTabs();
  new BuildStepsAccordion();
  const workspaceManager = new WorkspaceManager();
  const projectValidator = new ProjectValidator();
  new HelpSystem();
  new LivePreview();
  new NavigationManager();

  // Check if lesson is already completed and show message
  if (localStorage.getItem('partB_lesson14_remake_complete') === 'true') {
    const nextBtn = document.getElementById('next-lesson');
    const steps = document.querySelectorAll('.step');

    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.style.opacity = '1';
      nextBtn.style.cursor = 'pointer';
    }

    steps.forEach(step => step.classList.add('active'));

    // Show completion message immediately
    setTimeout(() => {
      projectValidator.showAlreadyCompletedMessage();
    }, 1000); // Delay to let page load animations complete
  }

  // Welcome animation
  setTimeout(() => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
    });
  }, 100);
});