// ============================================================================
// LESSON 15 - PART 1: TAB SUPPORT & INITIALIZATION
// ============================================================================

// HYBRID APPROACH - Tab Support + Browser Native Undo
function addTabSupportWithNativeUndo(textarea) {
  // Configuration
  const INDENT_SIZE = 2; // Changed from 1 to 2 spaces for better readability
  const INDENT_CHAR = ' '.repeat(INDENT_SIZE);
  
  textarea.addEventListener('keydown', function(e) {
      // Handle Tab key ONLY - let browser handle all other keys including Ctrl+Z
      if (e.key === 'Tab') {
          e.preventDefault();
          
          const start = this.selectionStart;
          const end = this.selectionEnd;
          const value = this.value;
          
          // Use execCommand to preserve native undo history (fallback for older browsers)
          if (document.execCommand && typeof document.execCommand === 'function') {
              try {
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
              } catch (error) {
                  // Fallback to manual method
                  handleTabManually();
              }
          } else {
              // Modern browser fallback
              handleTabManually();
          }
          
          function handleTabManually() {
              if (e.shiftKey) {
                  // Shift+Tab: Remove indentation
                  const lineStart = value.lastIndexOf('\n', start - 1) + 1;
                  const beforeLine = value.substring(0, lineStart);
                  const currentLine = value.substring(lineStart, start);
                  const afterCursor = value.substring(start);
                  
                  if (currentLine.endsWith(INDENT_CHAR)) {
                      const newLine = currentLine.substring(0, currentLine.length - INDENT_SIZE);
                      textarea.value = beforeLine + newLine + afterCursor;
                      textarea.selectionStart = textarea.selectionEnd = start - INDENT_SIZE;
                  }
              } else {
                  // Regular Tab: Insert spaces
                  textarea.value = value.substring(0, start) + INDENT_CHAR + value.substring(end);
                  textarea.selectionStart = textarea.selectionEnd = start + INDENT_SIZE;
              }
          }
          
          // Trigger input event for preview update
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
      
      // Let all other keys (including Ctrl+Z) work normally
  });
  
  // Set visual tab size
  textarea.style.tabSize = '2';
  textarea.style.MozTabSize = '2';
}

// INITIALIZE HYBRID SYSTEM
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

// Initialize with proper error handling
function safeInit() {
  try {
      if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initHybridSystem);
      } else {
          initHybridSystem();
      }
      
      // Backup initialization
      setTimeout(initHybridSystem, 100);
  } catch (error) {
      console.error('Failed to initialize hybrid system:', error);
  }
}

// Start initialization
safeInit();

// ============================================================================
// LESSON 15 - PART 2: FINALCHALLENGE CLASS FOUNDATION
// ============================================================================

class FinalChallenge {
  constructor() {
      this.hintsUsed = 0;
      this.maxHints = 1;
      this.projectPassed = false;
      this.startTime = null;
      this.challengeStarted = false;
      this.shownHints = new Set(); // Track shown progress hints

      this.init();
  }

  init() {
      try {
          this.attachEventListeners();
          this.updateUI();
          this.checkCompletionStatus();
          this.startEncouragement();
      } catch (error) {
          console.error('Failed to initialize FinalChallenge:', error);
      }
  }

  checkCompletionStatus() {
      const isCompleted = localStorage.getItem('partB_lesson15_remake_complete') === 'true';
      
      if (isCompleted) {
          this.displayCompletionStatus();
          this.updateUIForCompletedLesson();
      }
  }

  displayCompletionStatus() {
      // Remove existing completion banner
      const existing = document.getElementById('completion-status');
      if (existing) {
          existing.remove();
      }

      const completionBanner = document.createElement('div');
      completionBanner.id = 'completion-status';
      completionBanner.style.cssText = `
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, #27ae60, #2ecc71);
          color: white;
          padding: 16px 20px;
          text-align: center;
          box-shadow: 0 -4px 20px rgba(39, 174, 96, 0.3);
          z-index: 1000;
          animation: slideUpFromBottom 0.8s ease;
          font-family: inherit;
          border-top: 3px solid #fff;
      `;

      completionBanner.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
              <div style="font-size: 2rem;">🎉</div>
              <div style="flex: 1; min-width: 300px;">
                  <div style="font-size: 1.2rem; font-weight: 700; margin-bottom: 4px;">
                      Course Already Completed!
                  </div>
                  <div style="font-size: 0.9rem; opacity: 0.9;">
                      You've mastered all 15 lessons and become a web developer!
                  </div>
              </div>
              <button onclick="this.parentElement.parentElement.remove()" style="
                  background: rgba(255,255,255,0.2);
                  color: white;
                  border: 1px solid rgba(255,255,255,0.3);
                  padding: 8px 16px;
                  border-radius: 20px;
                  cursor: pointer;
                  font-size: 0.9rem;
                  font-weight: 600;
                  transition: all 0.3s ease;
              " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                  Dismiss
              </button>
          </div>
      `;

      // Add animation styles if not already present
      if (!document.getElementById('completion-banner-styles')) {
          const style = document.createElement('style');
          style.id = 'completion-banner-styles';
          style.textContent = `
              @keyframes slideUpFromBottom {
                  from {
                      transform: translateY(100%);
                      opacity: 0;
                  }
                  to {
                      transform: translateY(0);
                      opacity: 1;
                  }
              }
          `;
          document.head.appendChild(style);
      }

      document.body.appendChild(completionBanner);

      // Auto-dismiss after 8 seconds
      setTimeout(() => {
          if (document.getElementById('completion-status')) {
              completionBanner.style.animation = 'slideUpFromBottom 0.5s ease reverse';
              setTimeout(() => {
                  if (completionBanner.parentNode) {
                      completionBanner.remove();
                  }
              }, 500);
          }
      }, 8000);
  }

  updateUIForCompletedLesson() {
      const completeBtn = document.getElementById('complete-course');
      if (completeBtn) {
          completeBtn.innerHTML = '✅ Already Completed';
          completeBtn.disabled = false;
          completeBtn.style.background = '#27ae60';
          completeBtn.onclick = () => {
              this.showMessage('You already completed this course! Well done! 🎉', 'success');
          };
      }

      // Update header to show completion
      const header = document.querySelector('.lesson-header');
      if (header && !header.querySelector('.completion-badge')) {
          const badge = document.createElement('div');
          badge.className = 'completion-badge';
          badge.style.cssText = `
              display: inline-block;
              background: #27ae60;
              color: white;
              padding: 6px 16px;
              border-radius: 20px;
              font-size: 0.85rem;
              font-weight: 700;
              margin-left: 12px;
              animation: pulseGreen 2s infinite;
              box-shadow: 0 4px 8px rgba(39, 174, 96, 0.3);
          `;
          badge.textContent = '✅ COMPLETED';

          const challengeBadge = header.querySelector('.challenge-badge');
          if (challengeBadge) {
              challengeBadge.parentNode.insertBefore(badge, challengeBadge.nextSibling);
          } else {
              header.appendChild(badge);
          }

          // Add green pulse animation
          if (!document.getElementById('green-pulse-styles')) {
              const style = document.createElement('style');
              style.id = 'green-pulse-styles';
              style.textContent = `
                  @keyframes pulseGreen {
                      0%, 100% {
                          box-shadow: 0 4px 8px rgba(39, 174, 96, 0.3);
                          transform: scale(1);
                      }
                      50% {
                          box-shadow: 0 6px 16px rgba(39, 174, 96, 0.5);
                          transform: scale(1.05);
                      }
                  }
              `;
              document.head.appendChild(style);
          }
      }
  }

  attachEventListeners() {
      const checkBtn = document.getElementById('check-answer');
      const previewBtn = document.getElementById('show-preview');
      const hintBtn = document.getElementById('show-hint');
      const completeBtn = document.getElementById('complete-course');
      const editor = document.getElementById('code-editor');

      if (checkBtn) {
          checkBtn.addEventListener('click', () => this.checkProject());
      }

      if (previewBtn) {
          previewBtn.addEventListener('click', () => this.showPreview());
      }

      if (hintBtn) {
          hintBtn.addEventListener('click', () => this.showHint());
      }

      if (completeBtn) {
          completeBtn.addEventListener('click', () => this.completeCourse());
      }

      if (editor) {
          editor.addEventListener('focus', () => this.startChallenge());
          editor.addEventListener('input', () => this.onCodeChange());
      }

      // Preview modal event listeners
      this.setupPreviewModalListeners();
  }

  startChallenge() {
      if (!this.challengeStarted) {
          this.challengeStarted = true;
          this.startTime = new Date();
          this.showTempMessage('🔥 Final challenge started! Show what you\'ve learned!');
      }
  }

  onCodeChange() {
      // Auto-save functionality
      const editor = document.getElementById('code-editor');
      if (editor) {
          localStorage.setItem('lesson15_work_in_progress', editor.value);
      }

      // Optional: Real-time encouragement based on progress
      const code = editor.value.toLowerCase();
      if (code.length > 500 && code.includes('<html') && code.includes('<style>')) {
          this.showProgressHint('🎨 Looking good! Keep adding those interactive features!');
      }
  }

  showProgressHint(message) {
      // Only show each message once
      if (!this.shownHints.has(message)) {
          this.shownHints.add(message);
          this.showTempMessage(message, 2500);
      }
  }

  checkProject() {
      const editor = document.getElementById('code-editor');
      if (!editor) {
          this.showMessage('❌ Code editor not found!', 'error');
          return;
      }

      const code = editor.value;

      if (!code.trim()) {
          this.showMessage('🤔 Your code editor is empty! Start building your portfolio website.', 'warning');
          return;
      }

      try {
          const analysis = this.analyzeCode(code);
          this.displayDetailedResults(analysis);
      } catch (error) {
          console.error('Error analyzing code:', error);
          this.showMessage('❌ Error analyzing your code. Please try again.', 'error');
      }
  }
}

// ============================================================================
// LESSON 15 - PART 3: CODE ANALYSIS & CHECKING
// ============================================================================

FinalChallenge.prototype.setupPreviewModalListeners = function() {
  const closeBtn = document.getElementById('close-preview');
  const fullscreenBtn = document.getElementById('fullscreen-preview');
  const modal = document.getElementById('preview-modal');

  if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hidePreview());
  }

  if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => this.openFullscreenPreview());
  }

  if (modal) {
      // Close on overlay click
      modal.addEventListener('click', (e) => {
          if (e.target === modal || e.target.classList.contains('preview-overlay')) {
              this.hidePreview();
          }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modal.style.display !== 'none') {
              this.hidePreview();
          }
      });
  }
};

// ============================================================================
// LESSON 15 - PREVIEW FUNCTIONALITY METHODS
// ============================================================================

FinalChallenge.prototype.showPreview = function() {
  const editor = document.getElementById('code-editor');
  const modal = document.getElementById('preview-modal');
  const frame = document.getElementById('preview-frame');

  if (!editor) {
      this.showMessage('Code editor not found!', 'error');
      return;
  }

  const code = editor.value.trim();

  if (!code) {
      this.showMessage('Your code editor is empty! Write some HTML code first, then preview it.', 'warning');
      return;
  }

  // Show modal
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling

  // Show loading state
  this.showPreviewLoading();

  try {
      // Clean and prepare the code
      const cleanCode = this.prepareCodeForPreview(code);
      
      // Create blob URL for the iframe
      const blob = new Blob([cleanCode], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      
      // Load the code in iframe
      frame.onload = () => {
          this.hidePreviewLoading();
          URL.revokeObjectURL(blobUrl); // Clean up blob URL
      };
      
      frame.onerror = () => {
          this.showPreviewError('Failed to load preview');
          URL.revokeObjectURL(blobUrl);
      };

      frame.src = blobUrl;

      // Show success message
      this.showTempMessage('Preview opened! See your website in action.', 3000);

  } catch (error) {
      console.error('Preview error:', error);
      this.showPreviewError('Error creating preview');
      this.hidePreviewLoading();
  }
};

FinalChallenge.prototype.prepareCodeForPreview = function(code) {
  // Basic HTML structure check
  if (!code.toLowerCase().includes('<!doctype html')) {
      // If it's not a complete HTML document, wrap it
      if (code.toLowerCase().includes('<html') || code.toLowerCase().includes('<head') || code.toLowerCase().includes('<body')) {
          return code; // Assume it's a complete document
      } else {
          // Wrap partial code in basic HTML structure
          return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
</head>
<body>
  ${code}
</body>
</html>`;
      }
  }

  // Add security measures and enhancements
  let enhancedCode = code;

  // Ensure viewport meta tag exists
  if (!enhancedCode.toLowerCase().includes('viewport')) {
      enhancedCode = enhancedCode.replace(
          /<head[^>]*>/i,
          '$&\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">'
      );
  }

  // Add base styling if no CSS found
  if (!enhancedCode.toLowerCase().includes('<style>') && !enhancedCode.toLowerCase().includes('.css')) {
      const baseStyles = `
  <style>
      body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          margin: 0; 
          padding: 20px; 
          background: #f9f9f9;
      }
      * { box-sizing: border-box; }
  </style>`;
      
      enhancedCode = enhancedCode.replace(
          /<\/head>/i,
          baseStyles + '\n</head>'
      );
  }

  return enhancedCode;
};

FinalChallenge.prototype.showPreviewLoading = function() {
  const frame = document.getElementById('preview-frame');
  if (frame) {
      frame.style.display = 'none';
  }

  const container = document.querySelector('.preview-container');
  if (container && !container.querySelector('.preview-loading')) {
      const loading = document.createElement('div');
      loading.className = 'preview-loading';
      loading.innerHTML = `
          <div class="preview-loading-spinner"></div>
          <p>Loading your website preview...</p>
      `;
      container.insertBefore(loading, container.querySelector('.preview-footer'));
  }
};

FinalChallenge.prototype.hidePreviewLoading = function() {
  const loading = document.querySelector('.preview-loading');
  if (loading) {
      loading.remove();
  }

  const frame = document.getElementById('preview-frame');
  if (frame) {
      frame.style.display = 'block';
  }
};

FinalChallenge.prototype.showPreviewError = function(errorMessage) {
  const frame = document.getElementById('preview-frame');
  if (frame) {
      frame.style.display = 'none';
  }

  const container = document.querySelector('.preview-container');
  const existingError = container.querySelector('.preview-error');
  
  if (existingError) {
      existingError.remove();
  }

  if (container) {
      const error = document.createElement('div');
      error.className = 'preview-error';
      error.innerHTML = `
          <h4>Preview Error</h4>
          <p>${errorMessage}</p>
          <p>Check your HTML syntax and try again.</p>
      `;
      container.insertBefore(error, container.querySelector('.preview-footer'));
  }
};

FinalChallenge.prototype.hidePreview = function() {
  const modal = document.getElementById('preview-modal');
  const frame = document.getElementById('preview-frame');
  
  if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = ''; // Restore scrolling
  }

  if (frame) {
      frame.src = 'about:blank'; // Clear iframe content
  }

  // Clean up loading/error states
  const loading = document.querySelector('.preview-loading');
  const error = document.querySelector('.preview-error');
  
  if (loading) loading.remove();
  if (error) error.remove();
};

FinalChallenge.prototype.openFullscreenPreview = function() {
  const editor = document.getElementById('code-editor');
  
  if (!editor) {
      this.showMessage('Code editor not found!', 'error');
      return;
  }

  const code = editor.value.trim();

  if (!code) {
      this.showMessage('Your code editor is empty! Write some HTML code first.', 'warning');
      return;
  }

  try {
      const cleanCode = this.prepareCodeForPreview(code);
      const newWindow = window.open('', '_blank', 'width=1200,height=800');
      
      if (!newWindow) {
          this.showMessage('Please allow pop-ups to open fullscreen preview.', 'warning');
          return;
      }

      newWindow.document.write(cleanCode);
      newWindow.document.close();
      newWindow.focus();

      this.showTempMessage('Fullscreen preview opened in new tab!', 3000);
      
      // Close the modal
      this.hidePreview();

  } catch (error) {
      console.error('Fullscreen preview error:', error);
      this.showMessage('Error opening fullscreen preview. Check your code syntax.', 'error');
  }
};

FinalChallenge.prototype.analyzeCode = function(code) {
  const lowerCode = code.toLowerCase();
  let totalScore = 0;
  let maxScore = 0;
  const results = {};

  try {
      // HTML Structure (30 points)
      const htmlScore = this.checkHTMLStructure(lowerCode);
      results.html = htmlScore;
      totalScore += htmlScore.score;
      maxScore += 30;

      // CSS Styling (25 points)
      const cssScore = this.checkCSSFeatures(lowerCode);
      results.css = cssScore;
      totalScore += cssScore.score;
      maxScore += 25;

      // JavaScript Functionality (25 points)
      const jsScore = this.checkJavaScriptFeatures(lowerCode);
      results.js = jsScore;
      totalScore += jsScore.score;
      maxScore += 25;

      // Integration & Polish (20 points)
      const integrationScore = this.checkIntegration(lowerCode, code);
      results.integration = integrationScore;
      totalScore += integrationScore.score;
      maxScore += 20;

      const finalScore = Math.round((totalScore / maxScore) * 100);

      localStorage.setItem('partB_lesson15_project_score', finalScore);

      return {
          score: finalScore,
          details: results,
          passed: finalScore >= 80
      };
  } catch (error) {
      console.error('Error in code analysis:', error);
      return {
          score: 0,
          details: {},
          passed: false,
          error: 'Analysis failed'
      };
  }
};

FinalChallenge.prototype.checkHTMLStructure = function(code) {
  let score = 0;
  const feedback = [];

  // Basic HTML structure (10 points)
  if (code.includes('<!doctype html') && code.includes('<html') && code.includes('<head') && code.includes('<body')) {
      score += 10;
      feedback.push('✅ Proper HTML document structure');
  } else {
      feedback.push('❌ Missing proper DOCTYPE or basic HTML structure');
  }

  // Semantic elements (10 points)
  if (code.includes('<header') && code.includes('<main') && code.includes('<footer')) {
      score += 10;
      feedback.push('✅ Great use of semantic HTML elements');
  } else if (code.includes('<header') || code.includes('<footer')) {
      score += 5;
      feedback.push('⚠️ Some semantic elements used, try adding more');
  } else {
      feedback.push('❌ Missing semantic elements (header, main, footer)');
  }

  // Navigation (5 points)
  if (code.includes('<nav') && code.includes('<ul') && code.includes('<a href')) {
      score += 5;
      feedback.push('✅ Navigation menu implemented');
  } else {
      feedback.push('❌ Missing navigation with links');
  }

  // Content elements (5 points)
  if (code.includes('<img') && code.includes('alt=')) {
      score += 3;
      feedback.push('✅ Images with alt attributes');
  }
  if (code.includes('<h1') || code.includes('<h2')) {
      score += 2;
      feedback.push('✅ Proper heading structure');
  }

  return { score, feedback, category: 'HTML Structure' };
};

FinalChallenge.prototype.checkCSSFeatures = function(code) {
  let score = 0;
  const feedback = [];

  // CSS present (5 points)
  if (code.includes('<style>') || code.includes('rel="stylesheet"')) {
      score += 5;
      feedback.push('✅ CSS styling included');
  } else {
      feedback.push('❌ No CSS styling found');
      return { score, feedback, category: 'CSS Styling' };
  }

  // Colors and typography (5 points)
  if (code.includes('color:') && code.includes('font-family')) {
      score += 5;
      feedback.push('✅ Colors and typography applied');
  } else if (code.includes('color:') || code.includes('background')) {
      score += 3;
      feedback.push('⚠️ Some styling applied, add more colors/fonts');
  }

  // Box model (5 points)
  if (code.includes('margin') && code.includes('padding')) {
      score += 5;
      feedback.push('✅ Box model properties used');
  } else if (code.includes('margin') || code.includes('padding')) {
      score += 2;
      feedback.push('⚠️ Some spacing applied');
  }

  // Layout (5 points)
  if (code.includes('display: flex') || code.includes('display:flex') || code.includes('flexbox')) {
      score += 5;
      feedback.push('✅ Flexbox layout implemented');
  } else if (code.includes('display: grid') || code.includes('grid-template')) {
      score += 5;
      feedback.push('✅ Grid layout implemented');
  } else {
      feedback.push('❌ Try using flexbox or grid for better layouts');
  }

  // Responsive design (5 points)
  if (code.includes('@media') || code.includes('viewport')) {
      score += 5;
      feedback.push('✅ Responsive design considerations');
  } else {
      feedback.push('❌ Consider adding mobile-friendly design');
  }

  return { score, feedback, category: 'CSS Styling' };
};

FinalChallenge.prototype.checkJavaScriptFeatures = function(code) {
  let score = 0;
  const feedback = [];

  // JavaScript present (5 points)
  if (code.includes('<script>') || code.includes('.js')) {
      score += 5;
      feedback.push('✅ JavaScript code included');
  } else {
      feedback.push('❌ No JavaScript functionality found');
      return { score, feedback, category: 'JavaScript Features' };
  }

  // Event listeners (8 points)
  if (code.includes('addeventlistener')) {
      score += 8;
      feedback.push('✅ Event listeners implemented');
  } else if (code.includes('onclick')) {
      score += 4;
      feedback.push('⚠️ Basic click events - try addEventListener');
  } else {
      feedback.push('❌ No interactive events found');
  }

  // DOM manipulation (7 points)
  if (code.includes('getelementbyid') || code.includes('queryselector')) {
      score += 4;
      feedback.push('✅ DOM element selection');
  }
  if (code.includes('innerhtml') || code.includes('textcontent') || code.includes('style.')) {
      score += 3;
      feedback.push('✅ DOM content manipulation');
  }

  // Form/input validation or interaction (5 points)
  if (code.includes('preventdefault') && (code.includes('.value') || code.includes('form'))) {
      score += 5;
      feedback.push('✅ Form validation implemented');
  } else if (code.includes('.value')) {
      score += 2;
      feedback.push('⚠️ Input handling present');
  }

  return { score, feedback, category: 'JavaScript Features' };
};

FinalChallenge.prototype.checkIntegration = function(lowerCode, originalCode) {
  let score = 0;
  const feedback = [];

  // Code length/completeness (5 points)
  if (originalCode.length > 1500) {
      score += 5;
      feedback.push('✅ Comprehensive code implementation');
  } else if (originalCode.length > 800) {
      score += 3;
      feedback.push('⚠️ Good code length, could be more detailed');
  } else {
      feedback.push('❌ Code seems incomplete, add more content');
  }

  // Multiple sections (5 points)
  if (lowerCode.includes('section') || (lowerCode.includes('id=') && lowerCode.split('id=').length > 3)) {
      score += 5;
      feedback.push('✅ Multiple content sections');
  } else {
      feedback.push('❌ Add multiple sections to your page');
  }

  // Clean structure (5 points)
  const hasTitle = lowerCode.includes('<title>') && !lowerCode.includes('<title></title>');
  const hasViewport = lowerCode.includes('viewport');
  if (hasTitle && hasViewport) {
      score += 5;
      feedback.push('✅ Professional page setup');
  } else if (hasTitle || hasViewport) {
      score += 2;
      feedback.push('⚠️ Some professional touches');
  } else {
      feedback.push('❌ Missing page title or viewport meta tag');
  }

  // Integration check (5 points)
  const hasHTML = lowerCode.includes('<html');
  const hasCSS = lowerCode.includes('<style>');
  const hasJS = lowerCode.includes('<script>');
  if (hasHTML && hasCSS && hasJS) {
      score += 5;
      feedback.push('✅ HTML, CSS, and JavaScript integrated');
  } else {
      const missing = [];
      if (!hasHTML) missing.push('HTML');
      if (!hasCSS) missing.push('CSS');
      if (!hasJS) missing.push('JavaScript');
      feedback.push(`❌ Missing integration: ${missing.join(', ')}`);
  }

  return { score, feedback, category: 'Integration & Polish' };
};

// Utility functions for scoring feedback
FinalChallenge.prototype.getScoreMessage = function(score) {
  if (score >= 90) return "🚀 Exceptional! You've mastered web development!";
  if (score >= 80) return "🌟 Excellent work! You're ready to graduate!";
  if (score >= 70) return "👍 Great progress! You're very close!";
  if (score >= 60) return "💪 Good start! Keep building on what you have!";
  return "🎯 Keep going! Every expert started as a beginner!";
};

FinalChallenge.prototype.getImprovementTip = function(category) {
  const tips = {
      'HTML Structure': 'Make sure you have proper DOCTYPE, semantic elements like <header>, <main>, <footer>, and a working navigation menu.',
      'CSS Styling': 'Add more visual styling - colors, fonts, spacing with margin/padding, and try using flexbox for layouts.',
      'JavaScript Features': 'Add interactive elements with addEventListener, DOM manipulation to change content, and form validation.',
      'Integration & Polish': 'Make sure all parts work together smoothly and your code is well-organized and complete.'
  };
  return tips[category] || 'Review the requirements and keep improving!';
};

// ============================================================================
// LESSON 15 - PART 4: RESULTS DISPLAY & HINT SYSTEM
// ============================================================================

// Results display methods for FinalChallenge class

FinalChallenge.prototype.displayDetailedResults = function(analysis) {
  const feedback = document.getElementById('feedback');
  if (!feedback) {
      console.error('Feedback element not found');
      return;
  }

  const { score, details, passed } = analysis;

  let html = `
      <div style="background: linear-gradient(135deg, #f8f9ff, #e3f2fd); border: 2px solid ${passed ? '#27ae60' : score >= 60 ? '#f39c12' : '#e74c3c'}; border-radius: 16px; padding: 24px; margin-top: 20px; animation: resultsSlideIn 0.5s ease;">
          <div style="text-align: center; margin-bottom: 24px;">
              <div style="font-size: 3rem; margin-bottom: 12px;">
                  ${passed ? '🏆' : score >= 60 ? '🌟' : '💪'}
              </div>
              <h3 style="margin: 0; color: ${passed ? '#27ae60' : score >= 60 ? '#f39c12' : '#e74c3c'}; font-size: 1.8rem;">
                  Final Score: ${score}/100
              </h3>
              <p style="margin: 8px 0 0 0; font-size: 1.2rem; color: #666; font-weight: 600;">
                  ${this.getScoreMessage(score)}
              </p>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin: 24px 0;">
              ${this.renderCategoryCard(details.html)}
              ${this.renderCategoryCard(details.css)}
              ${this.renderCategoryCard(details.js)}
              ${this.renderCategoryCard(details.integration)}
          </div>
          
          ${passed ? this.renderSuccessSection() : this.renderImprovementSection(details)}
      </div>
  `;

  feedback.innerHTML = html;
  
  // Scroll to feedback with error handling
  try {
      feedback.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
      feedback.scrollIntoView();
  }

  if (passed && !this.projectPassed) {
      this.projectPassed = true;
      setTimeout(() => this.enableCompletionButton(), 1000);
  }

  // Add animation styles if not already present
  this.addResultsAnimationStyles();
};

FinalChallenge.prototype.addResultsAnimationStyles = function() {
  if (!document.getElementById('results-animation-styles')) {
      const style = document.createElement('style');
      style.id = 'results-animation-styles';
      style.textContent = `
          @keyframes resultsSlideIn {
              from { 
                  opacity: 0;
                  transform: translateY(20px) scale(0.95);
              }
              to { 
                  opacity: 1;
                  transform: translateY(0) scale(1);
              }
          }
      `;
      document.head.appendChild(style);
  }
};

FinalChallenge.prototype.renderCategoryCard = function(categoryData) {
  if (!categoryData) {
      return '<div>Error loading category data</div>';
  }

  const { score, feedback, category } = categoryData;
  const maxScore = this.getMaxScoreForCategory(category);
  const percentage = Math.round((score / maxScore) * 100);
  const color = percentage >= 80 ? '#27ae60' : percentage >= 60 ? '#f39c12' : '#e74c3c';

  return `
      <div style="background: white; border-radius: 12px; padding: 20px; border-left: 5px solid ${color}; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
              <h4 style="margin: 0; color: ${color}; font-size: 1.1rem;">${category}</h4>
              <span style="font-size: 1.4rem; font-weight: 700; color: ${color};">${percentage}%</span>
          </div>
          <div style="font-size: 0.85rem; color: #666;">
              ${feedback.map(item => `<div style="margin: 4px 0;">${item}</div>`).join('')}
          </div>
      </div>
  `;
};

FinalChallenge.prototype.getMaxScoreForCategory = function(category) {
  const maxScores = {
      'HTML Structure': 30,
      'CSS Styling': 25,
      'JavaScript Features': 25,
      'Integration & Polish': 20
  };
  return maxScores[category] || 25;
};

FinalChallenge.prototype.renderSuccessSection = function() {
  return `
      <div style="text-align: center; margin-top: 24px; padding: 24px; background: rgba(39, 174, 96, 0.1); border-radius: 12px; border: 2px solid #27ae60;">
          <h4 style="color: #27ae60; margin: 0 0 12px 0; font-size: 1.3rem;">🎉 Outstanding Work!</h4>
          <p style="margin: 0 0 16px 0; color: #666; font-size: 1.1rem;">
              You've successfully demonstrated mastery of web development fundamentals!
          </p>
          <p style="margin: 0 0 20px 0; color: #27ae60; font-weight: 600;">
              You're ready to complete the course and call yourself a web developer!
          </p>
          <button onclick="document.getElementById('complete-course').scrollIntoView({behavior: 'smooth'}); document.getElementById('complete-course').focus();" 
                  style="background: #27ae60; color: white; padding: 12px 24px; border: none; border-radius: 25px; font-weight: 700; cursor: pointer; font-size: 1rem; transition: transform 0.3s ease;"
                  onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              🏆 Complete the Course!
          </button>
      </div>
  `;
};

FinalChallenge.prototype.renderImprovementSection = function(details) {
  const lowestCategories = Object.values(details)
      .filter(cat => {
          const maxScore = this.getMaxScoreForCategory(cat.category);
          return cat.score < (maxScore * 0.8); // Less than 80%
      })
      .sort((a, b) => a.score - b.score)
      .slice(0, 2);

  if (lowestCategories.length === 0) {
      return `
          <div style="text-align: center; margin-top: 24px; padding: 20px; background: rgba(243, 156, 18, 0.1); border-radius: 12px;">
              <h4 style="color: #f39c12; margin: 0 0 12px 0;">Almost There! 🌟</h4>
              <p style="margin: 0; color: #666;">Just a few more points and you'll reach mastery level!</p>
          </div>
      `;
  }

  return `
      <div style="background: rgba(243, 156, 18, 0.1); border: 2px solid #f39c12; border-radius: 12px; padding: 20px; margin-top: 20px;">
          <h4 style="color: #f39c12; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
              💡 Key Areas to Improve
          </h4>
          ${lowestCategories.map(cat => `
              <div style="background: white; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
                  <h5 style="margin: 0 0 8px 0; color: #f39c12;">${cat.category}</h5>
                  <p style="margin: 0; font-size: 0.9rem; color: #666;">${this.getImprovementTip(cat.category)}</p>
              </div>
          `).join('')}
          <div style="text-align: center; margin-top: 16px;">
              ${this.hintsUsed === 0 ? `
                  <button onclick="document.getElementById('show-hint').click();" 
                          style="background: #f39c12; color: white; padding: 10px 20px; border: none; border-radius: 20px; font-weight: 600; cursor: pointer; margin-right: 12px;">
                      💡 Use Your Hint
                  </button>
              ` : ''}
              <button onclick="document.getElementById('code-editor').focus();" 
                      style="background: #667eea; color: white; padding: 10px 20px; border: none; border-radius: 20px; font-weight: 600; cursor: pointer;">
                  ✏️ Back to Editor
              </button>
          </div>
      </div>
  `;
};

FinalChallenge.prototype.enableCompletionButton = function() {
  const completeBtn = document.getElementById('complete-course');
  if (completeBtn) {
      completeBtn.disabled = false;
      completeBtn.innerHTML = '🎉 Complete Course!';
      completeBtn.style.background = '#27ae60';
      this.showTempMessage('🏆 You can now complete the course! Congratulations!', 4000);
  }
};

FinalChallenge.prototype.showHint = function() {
  if (this.hintsUsed >= this.maxHints) {
      this.showMessage('⚠️ You already used your one hint! Keep pushing forward! 💪', 'warning');
      return;
  }

  this.hintsUsed++;
  this.updateUI();

  const hintHtml = `
      <div style="background: linear-gradient(135deg, #fff3e0, #ffe0b2); border: 2px solid #f39c12; border-radius: 16px; padding: 24px; margin-top: 20px; animation: hintSlideIn 0.5s ease;">
          <div style="text-align: center; margin-bottom: 20px;">
              <div style="font-size: 2.5rem; margin-bottom: 8px;">💡</div>
              <h3 style="margin: 0; color: #f39c12; font-size: 1.4rem;">Your Final Hint</h3>
              <p style="margin: 8px 0 0 0; color: #e65100; font-weight: 600;">
                  🔥 Your one and only hint - use it wisely!
              </p>
          </div>
          
          <div style="background: rgba(255,255,255,0.8); border-radius: 12px; padding: 20px;">
              <h4 style="color: #f39c12; margin: 0 0 16px 0;">Focus on What You've Already Learned</h4>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                  <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #e67e22;">
                      <h5 style="margin: 0 0 8px 0; color: #e67e22;">HTML Structure</h5>
                      <p style="margin: 0; font-size: 0.85rem; color: #666;">Start with DOCTYPE, add header/nav, main content sections, and footer. Use semantic elements!</p>
                  </div>
                  
                  <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #3498db;">
                      <h5 style="margin: 0 0 8px 0; color: #3498db;">CSS Styling</h5>
                      <p style="margin: 0; font-size: 0.85rem; color: #666;">Add colors, fonts, spacing. Use flexbox for navigation. Don't forget mobile design!</p>
                  </div>
                  
                  <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #f1c40f;">
                      <h5 style="margin: 0 0 8px 0; color: #f1c40f;">JavaScript Magic</h5>
                      <p style="margin: 0; font-size: 0.85rem; color: #666;">Make buttons interactive with addEventListener. Change colors, text, or validate forms!</p>
                  </div>
              </div>
              
              <div style="background: rgba(39, 174, 96, 0.1); border-radius: 8px; padding: 16px; margin-top: 16px;">
                  <p style="margin: 0; color: #27ae60; font-weight: 600; text-align: center;">
                      Remember: You've learned everything you need in lessons 1-14. This is just combining it all together!
                  </p>
              </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 16px; background: rgba(230, 81, 0, 0.1); border-radius: 8px;">
              <p style="margin: 0; color: #e65100; font-weight: 600; font-size: 0.95rem;">
                  ⚠️ That's your final hint! Now show what you can do!
              </p>
          </div>
      </div>
  `;

  const feedback = document.getElementById('feedback');
  if (feedback) {
      feedback.innerHTML = hintHtml;
      try {
          feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } catch (error) {
          feedback.scrollIntoView();
      }
  }

  // Disable hint button
  const hintBtn = document.getElementById('show-hint');
  if (hintBtn) {
      hintBtn.disabled = true;
      hintBtn.innerHTML = '💡 Hint Used (0/1 left)';
  }

  // Add hint animation
  this.addHintAnimationStyles();

  this.showTempMessage('💪 Use this hint wisely - it\'s your last one!', 3000);
};

FinalChallenge.prototype.addHintAnimationStyles = function() {
  if (!document.getElementById('hint-animation-styles')) {
      const style = document.createElement('style');
      style.id = 'hint-animation-styles';
      style.textContent = `
          @keyframes hintSlideIn {
              from { 
                  opacity: 0;
                  transform: translateY(20px) scale(0.95);
              }
              to { 
                  opacity: 1;
                  transform: translateY(0) scale(1);
              }
          }
      `;
      document.head.appendChild(style);
  }
};

// ============================================================================
// LESSON 15 - PART 5: COMPLETION, CERTIFICATE & UTILITIES
// ============================================================================

// Course completion methods for FinalChallenge class

FinalChallenge.prototype.completeCourse = function() {
  if (!this.projectPassed) {
      this.showMessage('🎯 Complete the project successfully first to unlock this achievement!', 'warning');
      return;
  }

  // Mark completion
  localStorage.setItem('partB_lesson15_remake_complete', 'true');
  localStorage.setItem('partB_course_complete', 'true');
  localStorage.setItem('partB_course_completed_date', new Date().toISOString());

  // Show completion ceremony
  this.showCompletionCeremony();

  // Check if certificate should be offered
  setTimeout(() => {
      this.checkForCertificateGeneration();
  }, 4000);
};

FinalChallenge.prototype.checkForCertificateGeneration = function() {
  const certificateData = localStorage.getItem('certificateData');
  
  if (!certificateData) {
      setTimeout(() => {
          this.showCertificateOption();
      }, 2000);
  }
};

FinalChallenge.prototype.showCertificateOption = function() {
  // Remove existing certificate prompt
  const existing = document.getElementById('certificate-prompt');
  if (existing) {
      existing.remove();
  }

  const certificatePrompt = document.createElement('div');
  certificatePrompt.id = 'certificate-prompt';
  certificatePrompt.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #fff, #f8f9ff);
      border: 3px solid #667eea;
      border-radius: 20px;
      padding: 30px;
      max-width: 500px;
      width: 90%;
      text-align: center;
      z-index: 10001;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      animation: certificateSlideIn 0.5s ease;
  `;

  certificatePrompt.innerHTML = `
      <div style="font-size: 3rem; margin-bottom: 20px;">🏆</div>
      <h2 style="color: #667eea; margin-bottom: 15px; font-size: 1.5rem;">
          Congratulations! You've Earned Your Certificate!
      </h2>
      <p style="color: #666; margin-bottom: 25px; line-height: 1.6;">
          You've successfully completed all 15 lessons and mastered web development fundamentals. 
          Would you like to generate your official certificate of completion?
      </p>
      <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
          <button onclick="generateCertificate()" style="
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              border: none;
              padding: 15px 25px;
              border-radius: 25px;
              font-weight: 700;
              cursor: pointer;
              font-size: 1rem;
              transition: transform 0.3s ease;
          " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              🎓 Generate My Certificate
          </button>
          <button onclick="this.parentElement.parentElement.remove()" style="
              background: rgba(102, 126, 234, 0.1);
              color: #667eea;
              border: 2px solid #667eea;
              padding: 15px 25px;
              border-radius: 25px;
              font-weight: 700;
              cursor: pointer;
              font-size: 1rem;
              transition: all 0.3s ease;
          " onmouseover="this.style.background='rgba(102, 126, 234, 0.2)'" onmouseout="this.style.background='rgba(102, 126, 234, 0.1)'">
              Maybe Later
          </button>
      </div>
      <p style="font-size: 0.85rem; color: #888; margin-top: 20px;">
          Your certificate will include your completion date and can be downloaded as PDF
      </p>
  `;

  // Add certificate animation styles
  this.addCertificateAnimationStyles();

  document.body.appendChild(certificatePrompt);
};

FinalChallenge.prototype.addCertificateAnimationStyles = function() {
  if (!document.getElementById('certificate-animation-styles')) {
      const style = document.createElement('style');
      style.id = 'certificate-animation-styles';
      style.textContent = `
          @keyframes certificateSlideIn {
              from {
                  opacity: 0;
                  transform: translate(-50%, -50%) scale(0.8);
              }
              to {
                  opacity: 1;
                  transform: translate(-50%, -50%) scale(1);
              }
          }
      `;
      document.head.appendChild(style);
  }
};

FinalChallenge.prototype.showCompletionCeremony = function() {
  // Remove existing ceremony
  const existing = document.getElementById('completion-ceremony');
  if (existing) {
      existing.remove();
  }

  const ceremonyHtml = `
      <div id="completion-ceremony" style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          z-index: 10000;
          animation: ceremonyFadeIn 0.5s ease;
          overflow-y: auto;
      ">
          <div style="
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 20px;
              box-sizing: border-box;
          ">
              <div style="text-align: center; animation: ceremonySlideUp 1s ease; max-width: 800px; width: 100%;">
                  <div style="font-size: clamp(3rem, 10vw, 6rem); margin-bottom: 2rem; animation: trophySpin 2s ease;">🏆</div>
                  <h1 style="font-size: clamp(2rem, 6vw, 3rem); margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                      COURSE COMPLETED!
                  </h1>
                  <h2 style="font-size: clamp(1.2rem, 4vw, 1.5rem); margin-bottom: 2rem; opacity: 0.9; color: white;">
                      You're Now a Web Developer!
                  </h2>
                  
                  <div style="background: rgba(255,255,255,0.1); padding: clamp(1rem, 4vw, 2rem); border-radius: 16px; backdrop-filter: blur(10px); margin: 2rem 0;">
                      <h3 style="margin-bottom: 1rem; color: #ffd700; font-size: clamp(1rem, 3vw, 1.2rem);">🌟 Your Journey Complete</h3>
                      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 1rem 0;">
                          <div style="padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 8px;">
                              <div style="font-size: clamp(1.5rem, 4vw, 2rem); margin-bottom: 0.5rem;">📚</div>
                              <div style="font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600;">15 Lessons</div>
                              <div style="font-size: clamp(0.8rem, 2vw, 0.9rem); opacity: 0.8;">Completed</div>
                          </div>
                          <div style="padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 8px;">
                              <div style="font-size: clamp(1.5rem, 4vw, 2rem); margin-bottom: 0.5rem;">🎯</div>
                              <div style="font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600;">Final Project</div>
                              <div style="font-size: clamp(0.8rem, 2vw, 0.9rem); opacity: 0.8;">Mastered</div>
                          </div>
                          <div style="padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 8px;">
                              <div style="font-size: clamp(1.5rem, 4vw, 2rem); margin-bottom: 0.5rem;">⚡</div>
                              <div style="font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600;">Skills Mastered</div>
                              <div style="font-size: clamp(0.8rem, 2vw, 0.9rem); opacity: 0.8;">HTML, CSS, JS</div>
                          </div>
                      </div>
                  </div>
                  
                  <p style="font-size: clamp(1rem, 3vw, 1.2rem); margin-bottom: 2rem; max-width: 600px; line-height: 1.6; margin-left: auto; margin-right: auto;">
                      From beginner to developer - you've built the foundation to create amazing websites and bring your ideas to life on the web!
                  </p>
                  
                  <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-bottom: 2rem;">
                      <button onclick="celebrateSuccess()" style="
                          background: #ffd700;
                          color: #333;
                          padding: 15px 30px;
                          border: none;
                          border-radius: 25px;
                          font-size: clamp(1rem, 2.5vw, 1.1rem);
                          font-weight: 700;
                          cursor: pointer;
                          transition: transform 0.3s ease;
                          min-width: 200px;
                      " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                          🎉 Celebrate Success!
                      </button>
                      <button onclick="document.getElementById('completion-ceremony').remove()" style="
                          background: rgba(255,255,255,0.2);
                          color: white;
                          padding: 15px 30px;
                          border: 2px solid rgba(255,255,255,0.3);
                          border-radius: 25px;
                          font-size: clamp(1rem, 2.5vw, 1.1rem);
                          font-weight: 700;
                          cursor: pointer;
                          transition: all 0.3s ease;
                          min-width: 120px;
                      " onmouseover="this.style.background='rgba(255,255,255,0.3)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='translateY(0)'">
                          ✕ Close
                      </button>
                  </div>
              </div>
          </div>
      </div>
  `;

  document.body.insertAdjacentHTML('beforeend', ceremonyHtml);

  // Add ceremony animations
  this.addCeremonyAnimationStyles();

  // Celebration particles
  setTimeout(() => {
      for (let i = 0; i < 50; i++) {
          setTimeout(() => {
              this.createParticle(['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'][Math.floor(Math.random() * 4)]);
          }, i * 50);
      }
  }, 500);
};

FinalChallenge.prototype.addCeremonyAnimationStyles = function() {
  if (!document.getElementById('ceremony-animation-styles')) {
      const style = document.createElement('style');
      style.id = 'ceremony-animation-styles';
      style.textContent = `
          @keyframes ceremonyFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
          }
          
          @keyframes ceremonySlideUp {
              from { 
                  opacity: 0;
                  transform: translateY(50px);
              }
              to { 
                  opacity: 1;
                  transform: translateY(0);
              }
          }
          
          @keyframes trophySpin {
              from { transform: rotate(0deg) scale(0.8); }
              to { transform: rotate(360deg) scale(1); }
          }
      `;
      document.head.appendChild(style);
  }
};

FinalChallenge.prototype.createParticle = function(color) {
  const particle = document.createElement('div');
  particle.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      width: 6px;
      height: 6px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: explode 2s ease-out forwards;
  `;
};

// ============================================================================
// LESSON 15 - PART 6: UTILITY FUNCTIONS & GLOBAL INITIALIZATION
// ============================================================================

// Add remaining methods to FinalChallenge class

FinalChallenge.prototype.updateUI = function() {
  const hintCounter = document.getElementById('hint-count');
  if (hintCounter) {
      hintCounter.textContent = this.maxHints - this.hintsUsed;
  }

  const hintBtn = document.getElementById('show-hint');
  if (hintBtn && this.hintsUsed >= this.maxHints) {
      hintBtn.disabled = true;
      hintBtn.innerHTML = '💡 Hint Used (0/1 left)';
  }
};

FinalChallenge.prototype.showMessage = function(message, type = 'info') {
  const feedback = document.getElementById('feedback');
  if (!feedback) {
      console.warn('Feedback element not found');
      return;
  }

  const colors = {
      success: {
          bg: '#d4edda',
          border: '#27ae60',
          text: '#155724'
      },
      error: {
          bg: '#f8d7da',
          border: '#e74c3c',
          text: '#721c24'
      },
      warning: {
          bg: '#fff3cd',
          border: '#f39c12',
          text: '#856404'
      },
      info: {
          bg: '#d1ecf1',
          border: '#17a2b8',
          text: '#0c5460'
      }
  };

  const color = colors[type] || colors.info;

  feedback.style.cssText = `
      background: ${color.bg};
      border: 2px solid ${color.border};
      color: ${color.text};
      padding: 16px;
      border-radius: 12px;
      margin-top: 16px;
      font-weight: 600;
      line-height: 1.5;
      animation: messageSlideIn 0.3s ease;
  `;

  feedback.innerHTML = message;
  
  try {
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (error) {
      feedback.scrollIntoView();
  }
};

FinalChallenge.prototype.showTempMessage = function(message, duration = 3000) {
  const messageEl = document.createElement('div');
  messageEl.textContent = message;
  messageEl.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 12px 20px;
      border-radius: 25px;
      font-weight: 600;
      z-index: 1000;
      animation: tempSlideIn 0.5s ease, tempSlideOut 0.5s ease ${duration - 500}ms forwards;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      max-width: 300px;
      word-wrap: break-word;
  `;

  this.addTempMessageStyles();

  document.body.appendChild(messageEl);
  setTimeout(() => {
      if (messageEl.parentNode) {
          messageEl.parentNode.removeChild(messageEl);
      }
  }, duration);
};

FinalChallenge.prototype.addTempMessageStyles = function() {
  if (!document.getElementById('temp-message-styles')) {
      const style = document.createElement('style');
      style.id = 'temp-message-styles';
      style.textContent = `
          @keyframes tempSlideIn {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
          }
          @keyframes tempSlideOut {
              from { transform: translateX(0); opacity: 1; }
              to { transform: translateX(100%); opacity: 0; }
          }
          @keyframes messageSlideIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
          }
      `;
      document.head.appendChild(style);
  }
};

FinalChallenge.prototype.startEncouragement = function() {
  // Load any saved work
  const savedWork = localStorage.getItem('lesson15_work_in_progress');
  if (savedWork) {
      const editor = document.getElementById('code-editor');
      if (editor && !editor.value.trim()) {
          editor.value = savedWork;
      }
  }

  // Periodic encouragement
  const messages = [
      "You've got all the skills you need!",
      "Every expert was once a beginner!",
      "Show what you've learned!",
      "One step at a time!",
      "You're closer than you think!"
  ];

  let messageIndex = 0;
  setInterval(() => {
      if (this.challengeStarted && !this.projectPassed && Math.random() < 0.1) {
          this.showTempMessage(messages[messageIndex], 2500);
          messageIndex = (messageIndex + 1) % messages.length;
      }
  }, 15000);
};

// ============================================================================
// GLOBAL FUNCTIONS & CERTIFICATE GENERATION
// ============================================================================

// Global function for certificate generation
window.generateCertificate = function() {
  const savedName = localStorage.getItem('student_name');
  let studentName = savedName;
  
  if (!studentName) {
      studentName = prompt('Please enter your name for the certificate:');
      if (!studentName) {
          alert('Name is required to generate certificate');
          return;
      }
      localStorage.setItem('student_name', studentName);
  }

  const completionDate = localStorage.getItem('partB_course_completed_date');
  const certificateData = {
      studentName: studentName,
      completionDate: completionDate ? new Date(completionDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      generatedAt: new Date().toISOString()
  };

  localStorage.setItem('certificateData', JSON.stringify(certificateData));

  try {
      const certificateWindow = window.open('', '_blank', 'width=1000,height=700');
      
      if (!certificateWindow) {
          alert('Please allow pop-ups to generate your certificate');
          return;
      }
      
      const certificateHTML = generateCertificateHTML(certificateData);
      certificateWindow.document.write(certificateHTML);
      certificateWindow.document.close();
      certificateWindow.focus();

      const prompt = document.getElementById('certificate-prompt');
      if (prompt) {
          prompt.remove();
      }

      setTimeout(() => {
          alert('Certificate generated! You can download it as PDF using the Print function.');
      }, 1000);
  } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Error generating certificate. Please try again.');
  }
};

// Certificate HTML generation function
function generateCertificateHTML(certificateData) {
  const { studentName, completionDate } = certificateData;
  const formattedDate = new Date(completionDate).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
  });

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Web Development Certificate - ${studentName}</title>
          <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              
              body {
                  font-family: 'Arial', sans-serif;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 20px;
              }

              .certificate-container {
                  background: white;
                  width: 100%;
                  max-width: 900px;
                  aspect-ratio: 4/3;
                  border-radius: 20px;
                  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                  position: relative;
                  overflow: hidden;
              }

              .certificate {
                  width: 100%;
                  height: 100%;
                  padding: 60px;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  background: 
                      radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
                      linear-gradient(135deg, #f8f9ff 0%, #fff 100%);
                  position: relative;
              }

              .certificate::before {
                  content: '';
                  position: absolute;
                  top: 20px;
                  left: 20px;
                  right: 20px;
                  bottom: 20px;
                  border: 3px solid #667eea;
                  border-radius: 15px;
              }

              .certificate-header {
                  text-align: center;
                  position: relative;
                  z-index: 2;
              }

              .certificate-title {
                  font-size: 3rem;
                  color: #667eea;
                  font-weight: 700;
                  margin-bottom: 10px;
                  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
              }

              .certificate-subtitle {
                  font-size: 1.5rem;
                  color: #764ba2;
                  font-weight: 600;
                  margin-bottom: 30px;
              }

              .certificate-body {
                  text-align: center;
                  flex-grow: 1;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  position: relative;
                  z-index: 2;
              }

              .awarded-to {
                  font-size: 1.2rem;
                  color: #555;
                  margin-bottom: 20px;
                  font-weight: 500;
              }

              .student-name {
                  font-size: 3rem;
                  color: #333;
                  font-weight: 700;
                  margin-bottom: 30px;
                  border-bottom: 3px solid #667eea;
                  padding-bottom: 10px;
                  display: inline-block;
                  min-width: 300px;
              }

              .completion-text {
                  font-size: 1.1rem;
                  color: #666;
                  line-height: 1.6;
                  margin-bottom: 20px;
                  max-width: 600px;
                  margin-left: auto;
                  margin-right: auto;
              }

              .certificate-footer {
                  display: flex;
                  justify-content: space-between;
                  align-items: end;
                  position: relative;
                  z-index: 2;
              }

              .signature-section {
                  text-align: center;
                  flex: 1;
              }

              .signature-line {
                  border-bottom: 2px solid #333;
                  width: 200px;
                  margin-bottom: 10px;
              }

              .signature-label {
                  font-size: 0.9rem;
                  color: #666;
                  font-weight: 600;
              }

              .seal {
                  position: absolute;
                  top: 50%;
                  right: 40px;
                  transform: translateY(-50%);
                  width: 120px;
                  height: 120px;
                  border: 8px solid #667eea;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: linear-gradient(135deg, #667eea, #764ba2);
                  color: white;
                  font-weight: 700;
                  font-size: 0.8rem;
                  text-align: center;
                  box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
              }

              .download-controls {
                  position: fixed;
                  bottom: 20px;
                  right: 20px;
                  z-index: 1000;
              }

              .download-btn {
                  background: linear-gradient(135deg, #667eea, #764ba2);
                  color: white;
                  border: none;
                  padding: 15px 25px;
                  border-radius: 25px;
                  font-weight: 700;
                  cursor: pointer;
                  font-size: 1rem;
                  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
                  transition: transform 0.3s ease;
              }

              .download-btn:hover {
                  transform: translateY(-2px);
              }

              @media print {
                  body { background: white; padding: 0; margin: 0; }
                  .download-controls { display: none; }
                  .certificate-container { box-shadow: none; border-radius: 0; }
              }
          </style>
      </head>
      <body>
          <div class="download-controls">
              <button class="download-btn" onclick="window.print()">
                  Download Certificate
              </button>
          </div>

          <div class="certificate-container">
              <div class="certificate">
                  <div class="certificate-header">
                      <h1 class="certificate-title">Certificate of Completion</h1>
                      <p class="certificate-subtitle">Web Development Fundamentals Course</p>
                  </div>

                  <div class="certificate-body">
                      <p class="awarded-to">This certificate is proudly awarded to</p>
                      <h2 class="student-name">${studentName}</h2>
                      
                      <p class="completion-text">
                          For successfully completing all 15 lessons of the Web Development Fundamentals course,
                          demonstrating proficiency in HTML5, CSS3, and JavaScript, and creating a complete
                          web application that showcases modern development skills and best practices.
                      </p>
                  </div>

                  <div class="certificate-footer">
                      <div class="signature-section">
                          <div class="signature-line"></div>
                          <p class="signature-label">Course Instructor</p>
                      </div>
                      
                      <div class="signature-section">
                          <div class="signature-line"></div>
                          <p class="signature-label">Date: ${formattedDate}</p>
                      </div>
                  </div>

                  <div class="seal">
                      <div>
                          CERTIFIED<br>
                          WEB<br>
                          DEVELOPER
                      </div>
                  </div>
              </div>
          </div>
      </body>
      </html>
  `;
}

// Global celebration function
window.celebrateSuccess = function() {
  const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];

  for (let i = 0; i < 100; i++) {
      setTimeout(() => {
          const particle = document.createElement('div');
          const randomX = (Math.random() - 0.5) * 400;
          const randomY = (Math.random() - 0.5) * 400;
          
          particle.style.cssText = `
              position: fixed;
              top: 50%;
              left: 50%;
              width: 8px;
              height: 8px;
              background: ${colors[Math.floor(Math.random() * colors.length)]};
              border-radius: 50%;
              pointer-events: none;
              z-index: 9999;
              animation: explodeSuccess 2s ease-out forwards;
              --random-x: ${randomX}px;
              --random-y: ${randomY}px;
          `;
          
          document.body.appendChild(particle);
          setTimeout(() => {
              if (particle.parentNode) {
                  particle.remove();
              }
          }, 2000);
      }, i * 20);
  }

  // Add success animation
  if (!document.getElementById('success-animation-styles')) {
      const style = document.createElement('style');
      style.id = 'success-animation-styles';
      style.textContent = `
          @keyframes explodeSuccess {
              0% {
                  opacity: 1;
                  transform: translate(-50%, -50%) scale(1);
              }
              100% {
                  opacity: 0;
                  transform: translate(calc(-50% + var(--random-x)), calc(-50% + var(--random-y))) scale(0);
              }
          }
      `;
      document.head.appendChild(style);
  }

  const msg = document.createElement('div');
  msg.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #ffd700, #ffb347);
      color: #333;
      padding: 30px 40px;
      border-radius: 20px;
      font-size: 1.5rem;
      font-weight: 700;
      z-index: 10001;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  `;
  msg.innerHTML = 'You Did It!<br><small style="font-size: 1rem;">Welcome to the developer community!</small>';
  document.body.appendChild(msg);
  setTimeout(() => {
      if (msg.parentNode) {
          msg.remove();
      }
  }, 4000);
};

// ============================================================================
// UTILITY FUNCTIONS & INITIALIZATION
// ============================================================================

// Initialize the Final Challenge when DOM is ready
function initializeFinalChallenge() {
  try {
      new FinalChallenge();
  } catch (error) {
      console.error('Failed to initialize FinalChallenge:', error);
      // Fallback initialization
      setTimeout(() => {
          try {
              new FinalChallenge();
          } catch (retryError) {
              console.error('Retry failed:', retryError);
          }
      }, 1000);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFinalChallenge);
} else {
  initializeFinalChallenge();
}

// Auto-save functionality for work in progress
function setupAutoSave() {
  const editor = document.getElementById('code-editor');
  if (editor) {
      const savedWork = localStorage.getItem('lesson15_work_in_progress');
      if (savedWork && !editor.value.trim()) {
          editor.value = savedWork;
      }
      
      // Auto-save every 30 seconds
      setInterval(() => {
          if (editor.value.trim()) {
              localStorage.setItem('lesson15_work_in_progress', editor.value);
          }
      }, 30000);
      
      // Save on page unload
      window.addEventListener('beforeunload', () => {
          if (editor.value.trim()) {
              localStorage.setItem('lesson15_work_in_progress', editor.value);
          }
      });
  }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl+Enter to check answer
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      const checkBtn = document.getElementById('check-answer');
      if (checkBtn && !checkBtn.disabled) {
          checkBtn.click();
      }
  }
  
  // Ctrl+H for hint
  if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
      e.preventDefault();
      const hintBtn = document.getElementById('show-hint');
      if (hintBtn && !hintBtn.disabled) {
          hintBtn.click();
      }
  }
});

// Performance optimization: Clean up old localStorage entries
function cleanupOldData() {
  if (localStorage.getItem('partB_lesson15_remake_complete') === 'true') {
      localStorage.removeItem('lesson15_work_in_progress');
  }
  
  const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
  const keysToRemove = [];
  
  for (let key in localStorage) {
      if (key.startsWith('temp_') || key.startsWith('old_')) {
          try {
              const data = JSON.parse(localStorage.getItem(key));
              if (data && data.timestamp && data.timestamp < weekAgo) {
                  keysToRemove.push(key);
              }
          } catch (e) {
              keysToRemove.push(key);
          }
      }
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
}

// Enhanced error handling
window.addEventListener('error', function(e) {
  console.error('Lesson 15 Error:', e.error);
  
  if (e.error && e.error.message) {
      const feedback = document.getElementById('feedback');
      if (feedback) {
          feedback.innerHTML = `
              <div style="background: #f8d7da; border: 2px solid #e74c3c; border-radius: 12px; padding: 16px; color: #721c24;">
                  <h4>Oops! Something went wrong</h4>
                  <p>Don't worry - your code is safe. Try refreshing the page if issues persist.</p>
                  <details style="margin-top: 8px;">
                      <summary>Technical details</summary>
                      <code style="font-size: 0.8rem;">${e.error.message}</code>
                  </details>
              </div>
          `;
          try {
              feedback.scrollIntoView({ behavior: 'smooth' });
          } catch (scrollError) {
              feedback.scrollIntoView();
          }
      }
  }
});

// Mobile touch improvements
if ('ontouchstart' in window) {
  document.addEventListener('DOMContentLoaded', function() {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(btn => {
          btn.style.minHeight = '44px';
          btn.style.minWidth = '44px';
      });
  });
}

// Initialize all systems
document.addEventListener('DOMContentLoaded', function() {
  setupAutoSave();
  cleanupOldData();
});