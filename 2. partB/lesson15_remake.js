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

// Lesson 15 JavaScript - Final Project Challenge
class FinalChallenge {
    constructor() {
      this.hintsUsed = 0;
      this.maxHints = 1;
      this.startTime = null;
      this.isCompleted = false;
      this.challengeStarted = false;
  
      this.requiredElements = {
        html: [
          'header', 'nav', 'main', 'section', 'footer',
          'h1', 'h2', 'button', 'form', 'input', 'textarea'
        ],
        css: [
          'display: flex', 'grid', 'transition', 'hover',
          '@media', 'transform', 'box-shadow'
        ],
        javascript: [
          'addEventListener', 'getElementById', 'querySelector',
          'innerHTML', 'classList', 'preventDefault'
        ]
      };
  
      this.init();
    }
  
    init() {
      this.attachEventListeners();
      this.updateUI();
      this.startChallengeTimer();
      this.addInspirationalMessages();
      this.checkCompletionStatus();
    }

    checkForCertificateGeneration() {
      // Check if course is completed and certificate hasn't been generated yet
      const isCompleted = localStorage.getItem('partB_course_complete') === 'true';
      const certificateData = localStorage.getItem('certificateData');
      
      if (isCompleted && !certificateData) {
        // Show certificate option after a delay
        setTimeout(() => {
          this.showCertificateOption();
        }, 2000);
      }
    }

    checkCompletionStatus() {
      const isCompleted = localStorage.getItem('partB_lesson15_remake_complete') === 'true';
      const finalScore = localStorage.getItem('final_project_score');
      const completedDate = localStorage.getItem('partB_course_completed_date');
  
      if (isCompleted) {
        this.displayCompletionStatus(finalScore, completedDate);
        this.updateUIForCompletedLesson();
      }
    }

    showCertificateOption() {
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
          You've successfully completed all 15 lessons and mastered web development. 
          Would you like to generate your official certificate of completion?
        </p>
        <div style="display: flex; gap: 15px; justify-content: center;">
          <button onclick="window.generateCertificate()" style="
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
          Your certificate will include your completion date, final score, and can be downloaded as PDF
        </p>
      `;
    
      // Add slide-in animation
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
    
      document.body.appendChild(certificatePrompt);
    }
  
    displayCompletionStatus(score, completedDate) {
      // Create completion banner
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
  
      const formattedDate = completedDate ? new Date(completedDate).toLocaleDateString() : 'Recently';
      const scoreText = score ? ` with a score of ${score}/100` : '';
  
      completionBanner.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
              <div style="font-size: 2rem;">🎉</div>
              <div style="flex: 1; min-width: 300px;">
                  <div style="font-size: 1.2rem; font-weight: 700; margin-bottom: 4px;">
                      Lesson Already Completed!
                  </div>
                  <div style="font-size: 0.9rem; opacity: 0.9;">
                      You mastered this final challenge on ${formattedDate}${scoreText}
                  </div>
              </div>
              <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                  <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
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
                  <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" style="
                      background: #fff;
                      color: #27ae60;
                      border: none;
                      padding: 8px 16px;
                      border-radius: 20px;
                      cursor: pointer;
                      font-size: 0.9rem;
                      font-weight: 700;
                      transition: all 0.3s ease;
                  " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                      Review Lesson
                  </button>
              </div>
          </div>
      `;
  
      // Add animation styles
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
  
      // Auto-dismiss after 10 seconds if user doesn't interact
      setTimeout(() => {
        if (document.getElementById('completion-status')) {
          completionBanner.style.animation = 'slideUpFromBottom 0.5s ease reverse';
          setTimeout(() => {
            if (completionBanner.parentNode) {
              completionBanner.remove();
            }
          }, 500);
        }
      }, 10000);
    }
  
    updateUIForCompletedLesson() {
      // Update the Complete Course button to show it's already done
      const completeBtn = document.getElementById('complete-course');
      if (completeBtn) {
        completeBtn.innerHTML = '✅ Already Completed';
        completeBtn.disabled = false;
        completeBtn.style.background = '#27ae60';
        completeBtn.onclick = () => {
          this.showMessage('You already completed this course! Well done! 🎉', 'success');
        };
      }
  
      // Add completion badge to the header
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
        badge.textContent = '✓ COMPLETED';
  
        // existing challenge badge or create new container
        const challengeBadge = header.querySelector('.challenge-badge');
        if (challengeBadge) {
          challengeBadge.parentNode.insertBefore(badge, challengeBadge.nextSibling);
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
  
      // Update stats to show completion
      const statsItems = document.querySelectorAll('.stat-item');
      if (statsItems.length >= 4) {
        const potentialStat = statsItems[3];
        const statNumber = potentialStat.querySelector('.stat-number');
        const statLabel = potentialStat.querySelector('.stat-label');
        if (statNumber && statLabel) {
          statNumber.textContent = '✓';
          statNumber.style.color = '#27ae60';
          statLabel.textContent = 'Completed';
          potentialStat.style.background = 'rgba(39, 174, 96, 0.1)';
          potentialStat.style.border = '2px solid #27ae60';
        }
      }
    }
  
    attachEventListeners() {
      const checkBtn = document.getElementById('check-answer');
      const hintBtn = document.getElementById('show-hint');
      const completeBtn = document.getElementById('complete-course');
      const editor = document.getElementById('code-editor');
  
      if (checkBtn) {
        checkBtn.addEventListener('click', () => this.checkProject());
      }
  
      if (hintBtn) {
        hintBtn.addEventListener('click', () => this.showHint());
      }
  
      if (completeBtn) {
        completeBtn.addEventListener('click', () => this.completeCourse());
      }
  
      if (editor) {
        editor.addEventListener('input', () => this.onCodeChange());
        editor.addEventListener('focus', () => this.startChallenge());
      }
    }
  
    startChallenge() {
      if (!this.challengeStarted) {
        this.challengeStarted = true;
        this.startTime = new Date();
        this.showMessage('🔥 Challenge started! You got this!', 'info');
        this.updateTimer();
      }
    }
  
    startChallengeTimer() {
      setInterval(() => {
        if (this.challengeStarted && !this.isCompleted) {
          this.updateTimer();
        }
      }, 1000);
    }
  
    updateTimer() {
      const timerElement = document.getElementById('challenge-timer');
      if (timerElement && this.startTime) {
        const elapsed = Math.floor((new Date() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timerElement.textContent = `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    }
  
    onCodeChange() {
      const editor = document.getElementById('code-editor');
      const code = editor.value.toLowerCase();
  
      // Real-time encouragement based on progress
      if (code.includes('<!doctype html') && code.includes('<header>') && code.length > 200) {
        this.showProgressMessage('💪 Great start! Keep building!');
      }
  
      if (code.includes('<style>') && code.includes('flexbox') && code.includes('hover')) {
        this.showProgressMessage('🎨 Your CSS skills are showing!');
      }
  
      if (code.includes('<script>') && code.includes('addeventlistener')) {
        this.showProgressMessage('⚡ JavaScript magic incoming!');
      }
    }
  
    showProgressMessage(message) {
      // Only show each message once
      if (!this.shownMessages) {
        this.shownMessages = new Set();
      }
  
      if (!this.shownMessages.has(message)) {
        this.shownMessages.add(message);
        this.showTempMessage(message, 2000);
      }
    }
  
    showTempMessage(message, duration = 3000) {
      const messageEl = document.createElement('div');
      messageEl.textContent = message;
      messageEl.style.cssText = `
              position: fixed;
              top: 20px;
              right: 20px;
              background: linear-gradient(135deg, #6b46c1, #007BFF);
              color: white;
              padding: 12px 20px;
              border-radius: 25px;
              font-weight: 600;
              z-index: 1000;
              animation: slideIn 0.5s ease, slideOut 0.5s ease ${duration - 500}ms forwards;
              box-shadow: 0 4px 12px rgba(107, 70, 193, 0.3);
          `;
  
      // Add animation keyframes
      if (!document.getElementById('temp-message-styles')) {
        const style = document.createElement('style');
        style.id = 'temp-message-styles';
        style.textContent = `
                  @keyframes slideIn {
                      from { transform: translateX(100%); opacity: 0; }
                      to { transform: translateX(0); opacity: 1; }
                  }
                  @keyframes slideOut {
                      from { transform: translateX(0); opacity: 1; }
                      to { transform: translateX(100%); opacity: 0; }
                  }
              `;
        document.head.appendChild(style);
      }
  
      document.body.appendChild(messageEl);
  
      setTimeout(() => {
        if (messageEl.parentNode) {
          messageEl.parentNode.removeChild(messageEl);
        }
      }, duration);
    }
  
    checkProject() {
      const editor = document.getElementById('code-editor');
      const code = editor.value;
  
      if (!code.trim()) {
        this.showMessage('🤔 Your code editor is empty! Start building your creative agency website.', 'warning');
        return;
      }
  
      const analysis = this.analyzeCode(code);
      const score = this.calculateScore(analysis);
  
      this.displayResults(analysis, score);
  
      if (score >= 90) {
        this.projectPassed(score);
      } else if (score >= 70) {
        this.showMessage(`🌟 Great progress! Score: ${score}/100. You're close to mastery - keep refining!`, 'warning');
      } else {
        this.showMessage(`🎯 Score: ${score}/100. Don't give up! ${this.hintsUsed === 0 ? 'Consider using your hint.' : 'Review the requirements and keep improving.'}`, 'error');
      }
    }
  
    analyzeCode(code) {
      const lowerCode = code.toLowerCase();
      const analysis = {
        structure: this.checkStructure(lowerCode),
        styling: this.checkStyling(lowerCode),
        interactivity: this.checkInteractivity(lowerCode),
        responsiveness: this.checkResponsiveness(lowerCode),
        creativity: this.checkCreativity(lowerCode),
        completeness: this.checkCompleteness(lowerCode)
      };
  
      return analysis;
    }
  
    checkStructure(code) {
      const requiredSections = [
        '<!doctype html',
        '<header>',
        '<nav>',
        '<main>',
        '<section',
        '<footer>',
        'id="hero"',
        'id="services"',
        'id="portfolio"',
        'id="team"',
        'id="contact"'
      ];
  
      const found = requiredSections.filter(section => code.includes(section));
      const score = Math.round((found.length / requiredSections.length) * 100);
  
      return {
        score,
        found,
        missing: requiredSections.filter(section => !code.includes(section)),
        details: 'HTML structure with semantic elements and required sections'
      };
    }
  
    checkStyling(code) {
      const cssFeatures = [
        'display: flex',
        'display: grid',
        '@media',
        'transition:',
        'transform:',
        'hover',
        'box-shadow',
        'border-radius',
        'linear-gradient',
        'keyframes'
      ];
  
      const found = cssFeatures.filter(feature => code.includes(feature));
      const score = Math.round((found.length / cssFeatures.length) * 100);
  
      return {
        score,
        found,
        missing: cssFeatures.filter(feature => !code.includes(feature)),
        details: 'Modern CSS with layouts, animations, and responsive design'
      };
    }
  
    checkInteractivity(code) {
      const jsFeatures = [
        'addeventlistener',
        'getelementbyid',
        'queryselector',
        'preventdefault',
        'classlist',
        'innerhtml',
        'onclick',
        'function',
        'const ',
        'let '
      ];
  
      const found = jsFeatures.filter(feature => code.includes(feature));
      const score = Math.round((found.length / jsFeatures.length) * 100);
  
      return {
        score,
        found,
        missing: jsFeatures.filter(feature => !code.includes(feature)),
        details: 'Interactive JavaScript features and DOM manipulation'
      };
    }
  
    checkResponsiveness(code) {
      const responsiveFeatures = [
        '@media',
        'max-width',
        'min-width',
        'viewport',
        'flex-wrap',
        'grid-template-columns',
        'clamp(',
        '%',
        'vh',
        'vw'
      ];
  
      const found = responsiveFeatures.filter(feature => code.includes(feature));
      const score = Math.round((found.length / responsiveFeatures.length) * 100);
  
      return {
        score,
        found,
        missing: responsiveFeatures.filter(feature => !code.includes(feature)),
        details: 'Responsive design for mobile and desktop'
      };
    }
  
    checkCreativity(code) {
      const creativityPoints = [
        'animation',
        'keyframes',
        'transform',
        'gradient',
        'box-shadow',
        'border-radius',
        'opacity',
        'filter',
        'backdrop-filter',
        'clip-path'
      ];
  
      const found = creativityPoints.filter(point => code.includes(point));
      const score = Math.round((found.length / creativityPoints.length) * 100);
  
      return {
        score,
        found,
        missing: creativityPoints.filter(point => !code.includes(point)),
        details: 'Creative visual effects and animations'
      };
    }
  
    checkCompleteness(code) {
      const completenessChecks = [
        code.includes('<form') && code.includes('input'),
        code.includes('portfolio') || code.includes('gallery'),
        code.includes('team') || code.includes('about'),
        code.includes('contact'),
        code.includes('<style>') || code.includes('.css'),
        code.includes('<script>') || code.includes('.js'),
        code.length > 2000, // Minimum code length
        code.includes('nav') && code.includes('menu'),
        code.includes('footer'),
        code.includes('header')
      ];
  
      const passedChecks = completenessChecks.filter(check => check).length;
      const score = Math.round((passedChecks / completenessChecks.length) * 100);
  
      return {
        score,
        passed: passedChecks,
        total: completenessChecks.length,
        details: 'Overall project completeness and functionality'
      };
    }
  
    calculateScore(analysis) {
      const weights = {
        structure: 25,
        styling: 20,
        interactivity: 20,
        responsiveness: 15,
        creativity: 10,
        completeness: 10
      };
  
      let totalScore = 0;
      let totalWeight = 0;
  
      for (const [category, weight] of Object.entries(weights)) {
        totalScore += (analysis[category].score * weight) / 100;
        totalWeight += weight;
      }
  
      return Math.round((totalScore / totalWeight) * 100);
    }
  
    // Fixed version of displayResults method
    displayResults(analysis, score) {
      const feedback = document.getElementById('feedback');
  
      let html = `
          <div style="background: linear-gradient(135deg, #f8f9ff, #e3f2fd); border: 2px solid ${score >= 90 ? '#27ae60' : score >= 70 ? '#f39c12' : '#e74c3c'}; border-radius: 16px; padding: 20px; margin-top: 16px;">
              <div style="text-align: center; margin-bottom: 20px;">
                  <div style="font-size: 3rem; margin-bottom: 8px;">
                      ${score >= 90 ? '🏆' : score >= 70 ? '🌟' : '🎯'}
                  </div>
                  <h3 style="margin: 0; color: ${score >= 90 ? '#27ae60' : score >= 70 ? '#f39c12' : '#e74c3c'}; font-size: 1.5rem;">
                      Final Score: ${score}/100
                  </h3>
                  <p style="margin: 8px 0 0 0; font-size: 1.1rem; color: #666;">
                      ${this.getScoreMessage(score)}
                  </p>
                  
                  <!-- ADD: Sticky results notice -->
                  <div style="background: rgba(103, 110, 234, 0.1); border: 1px solid #667eea; border-radius: 8px; padding: 12px; margin: 16px 0;">
                      <p style="margin: 0; font-size: 0.9rem; color: #667eea; font-weight: 600;">
                          📌 These detailed results will stay visible - scroll down to review all categories
                      </p>
                  </div>
              </div>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 20px 0;">
                  ${this.renderAnalysisCard('Structure', analysis.structure)}
                  ${this.renderAnalysisCard('Styling', analysis.styling)}
                  ${this.renderAnalysisCard('Interactivity', analysis.interactivity)}
                  ${this.renderAnalysisCard('Responsiveness', analysis.responsiveness)}
                  ${this.renderAnalysisCard('Creativity', analysis.creativity)}
                  ${this.renderAnalysisCard('Completeness', analysis.completeness)}
              </div>
              
              ${score < 90 ? this.renderImprovementTips(analysis) : ''}
              
              <!-- ADD: Action buttons within results -->
              ${score >= 90 ? `
                  <div style="text-align: center; margin-top: 24px; padding: 20px; background: rgba(39, 174, 96, 0.1); border-radius: 12px;">
                      <h4 style="color: #27ae60; margin: 0 0 12px 0;">🎉 Congratulations! You've mastered the final challenge!</h4>
                      <p style="margin: 0 0 16px 0; color: #666;">You can now complete the course and claim your victory!</p>
                      <button onclick="document.getElementById('complete-course').scrollIntoView({behavior: 'smooth'}); document.getElementById('complete-course').focus();" 
                              style="background: #27ae60; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                          Click here to Complete Course Button
                      </button>
                  </div>
              ` : `
                  <div style="text-align: center; margin-top: 24px; padding: 20px; background: rgba(243, 156, 18, 0.1); border-radius: 12px;">
                      <h4 style="color: #f39c12; margin: 0 0 12px 0;">Keep Going! You're Making Progress!</h4>
                      <p style="margin: 0 0 16px 0; color: #666;">Review the improvement tips above and keep refining your code.</p>
                      ${this.hintsUsed === 0 ? `
                          <button onclick="document.getElementById('show-hint').click();" 
                                  style="background: #f39c12; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; margin-right: 12px;">
                              Use Your Hint
                          </button>
                      ` : ''}
                      <button onclick="document.getElementById('code-editor').focus();" 
                              style="background: #007BFF; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                          Back to Code Editor
                      </button>
                  </div>
              `}
          </div>
      `;
  
      feedback.innerHTML = html;
  
      // CHANGED: More gentle scrolling that doesn't hide results
      setTimeout(() => {
        feedback.scrollIntoView({
          behavior: 'smooth',
          block: 'start' // Changed from 'nearest' to 'start'
        });
      }, 100);
    }
  
    renderAnalysisCard(title, data) {
      const color = data.score >= 80 ? '#27ae60' : data.score >= 60 ? '#f39c12' : '#e74c3c';
      const icon = data.score >= 80 ? '✅' : data.score >= 60 ? '⚠️' : '❌';
  
      return `
              <div style="background: white; border-radius: 12px; padding: 16px; border-left: 4px solid ${color}; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                      <span style="font-size: 1.2rem;">${icon}</span>
                      <h4 style="margin: 0; color: ${color}; font-size: 0.95rem;">${title}</h4>
                  </div>
                  <div style="font-size: 1.5rem; font-weight: 700; color: ${color}; margin-bottom: 4px;">
                      ${data.score}%
                  </div>
                  <p style="margin: 0; font-size: 0.8rem; color: #666; line-height: 1.3;">
                      ${data.details}
                  </p>
              </div>
          `;
    }
  
    renderImprovementTips(analysis) {
      const lowScoreCategories = Object.entries(analysis)
        .filter(([_, data]) => data.score < 80)
        .sort(([_, a], [__, b]) => a.score - b.score);
  
      if (lowScoreCategories.length === 0) return '';
  
      const tips = lowScoreCategories.slice(0, 3).map(([category, data]) => {
        return this.getImprovementTip(category, data);
      }).join('');
  
      return `
              <div style="background: rgba(243, 156, 18, 0.1); border: 1px solid #f39c12; border-radius: 12px; padding: 16px; margin-top: 20px;">
                  <h4 style="color: #f39c12; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
                      💡 <span>Key Improvements Needed</span>
                  </h4>
                  ${tips}
              </div>
          `;
    }
  
    getImprovementTip(category, data) {
      const tips = {
        structure: 'Add missing HTML sections like header, main, footer, and required IDs (hero, services, portfolio, team, contact).',
        styling: 'Include modern CSS features: flexbox/grid layouts, hover effects, transitions, media queries, and animations.',
        interactivity: 'Add JavaScript functionality: event listeners, DOM manipulation, form validation, and interactive features.',
        responsiveness: 'Make your design mobile-friendly with media queries, flexible layouts, and responsive units.',
        creativity: 'Add visual flair with animations, gradients, shadows, transforms, and creative effects.',
        completeness: 'Ensure all required sections are present and functional: navigation, portfolio, team, contact form.'
      };
  
      return `
              <div style="background: white; border-radius: 8px; padding: 12px; margin-bottom: 8px; border-left: 3px solid #f39c12;">
                  <h5 style="margin: 0 0 6px 0; color: #333; font-size: 0.9rem;">
                      ${category.charAt(0).toUpperCase() + category.slice(1)} (${data.score}%)
                  </h5>
                  <p style="margin: 0; font-size: 0.85rem; color: #666; line-height: 1.4;">
                      ${tips[category]}
                  </p>
              </div>
          `;
    }
  
    getScoreMessage(score) {
      if (score >= 95) return "🚀 MASTERPIECE! This is portfolio-worthy work!";
      if (score >= 90) return "🌟 EXCELLENT! You've mastered web development!";
      if (score >= 80) return "💪 GREAT JOB! You're very close to mastery!";
      if (score >= 70) return "👍 GOOD PROGRESS! Keep refining your skills!";
      if (score >= 60) return "🎯 GETTING THERE! Focus on the key areas!";
      return "💪 KEEP GOING! Every expert was once a beginner!";
    }
  
    // Fixed version of projectPassed method
    projectPassed(score) {
      this.isCompleted = true;
      const completeBtn = document.getElementById('complete-course');
  
      if (completeBtn) {
        completeBtn.disabled = false;
        completeBtn.innerHTML = '🎉 Claim Your Victory!';
        completeBtn.classList.add('victory-button');
      }
  
      // Mark lesson as complete
      localStorage.setItem('partB_lesson15_remake_complete', 'true');
      markCurrentLessonComplete();
      localStorage.setItem('partB_course_complete', 'true');
      localStorage.setItem('final_project_score', score.toString());
  
      // CHANGED: Delay celebration to let user read results first
      setTimeout(() => {
        this.triggerCelebration();
      }, 2000); // Give 2 seconds to read results
  
      // CHANGED: Show persistent success message instead of temporary
      setTimeout(() => {
        this.showPersistentSuccessMessage(score);
      }, 3000);
    }
  
    // NEW: Add persistent success message method
    showPersistentSuccessMessage(score) {
      const successMessage = document.createElement('div');
      successMessage.id = 'persistent-success';
      successMessage.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          left: 20px;
          background: linear-gradient(135deg, #27ae60, #2ecc71);
          color: white;
          padding: 16px 20px;
          border-radius: 12px;
          font-weight: 600;
          z-index: 1000;
          box-shadow: 0 8px 24px rgba(39, 174, 96, 0.3);
          animation: slideInFromTop 0.5s ease;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
      `;
  
  
    }
  
    triggerCelebration() {
      // Create celebration particles
      const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
  
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          this.createParticle(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 50);
      }
  
      // Add victory styles
      const style = document.createElement('style');
      style.textContent = `
              .victory-button {
                  background: linear-gradient(135deg, #ffd700, #ffb347) !important;
                  color: #333 !important;
                  animation: victoryPulse 1s infinite !important;
                  box-shadow: 0 0 30px rgba(255, 215, 0, 0.6) !important;
              }
              
              @keyframes victoryPulse {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.05); }
              }
          `;
      document.head.appendChild(style);
    }
  
  
    showHint() {
      if (this.hintsUsed >= this.maxHints) {
        this.showMessage('⚠️ You\'ve already used your one hint! You got this - keep pushing forward! 💪', 'warning');
        return;
      }
  
      this.hintsUsed++;
      this.updateUI();
  
      const hint = this.generateContextualHint();
      this.displayHint(hint);
  
      // Disable hint button
      const hintBtn = document.getElementById('show-hint');
      if (hintBtn) {
        hintBtn.disabled = true;
        hintBtn.innerHTML = '💡 Hint Used (0/1 left)';
      }
    }
  
    generateContextualHint() {
      const editor = document.getElementById('code-editor');
      const code = editor.value.toLowerCase();
  
      // Analyze what they have and what they're missing
      if (!code.includes('<!doctype html')) {
        return this.getStructureHint();
      } else if (!code.includes('<style>') || !code.includes('display: flex')) {
        return this.getStylingHint();
      } else if (!code.includes('<script>') || !code.includes('addeventlistener')) {
        return this.getJavaScriptHint();
      } else {
        return this.getAdvancedHint();
      }
    }
  
    getStructureHint() {
      return {
        title: '🏗️ HTML Structure Foundation',
        content: `
                  <h4>Start with this solid foundation:</h4>
                  <pre style="background: #2d3748; color: #fff; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 0.85rem;">
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PixelForge Creative Agency</title>
      <style>
          /* Your CSS here */
      </style>
  </head>
  <body>
      <header>
          <nav>
              <div class="logo">PixelForge</div>
              <ul>
                  <li><a href="#hero">Home</a></li>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#portfolio">Portfolio</a></li>
                  <li><a href="#team">Team</a></li>
                  <li><a href="#contact">Contact</a></li>
              </ul>
          </nav>
      </header>
  
      <main>
          <section id="hero">
              <h1>Crafting Digital Experiences That Inspire</h1>
              <p>We help businesses tell their story through design</p>
              <button class="cta-button">Start Your Project</button>
          </section>
  
          <section id="services">
              <h2>Our Services</h2>
              <!-- Add your services here -->
          </section>
  
          <section id="portfolio">
              <h2>Our Work</h2>
              <!-- Add portfolio items here -->
          </section>
  
          <section id="team">
              <h2>Meet Our Team</h2>
              <!-- Add team members here -->
          </section>
  
          <section id="contact">
              <h2>Get In Touch</h2>
              <form id="contactForm">
                  <input type="text" placeholder="Your Name" required>
                  <input type="email" placeholder="Your Email" required>
                  <textarea placeholder="Your Message" required></textarea>
                  <button type="submit">Send Message</button>
              </form>
          </section>
      </main>
  
      <footer>
          <p>© 2024 PixelForge Creative. All rights reserved.</p>
      </footer>
  
      <script>
          // Your JavaScript here
      </script>
  </body>
  </html></pre>
                  <p><strong>💡 Pro tip:</strong> This gives you the complete structure. Now add content, styling, and interactivity!</p>
              `
      };
    }
  
    getStylingHint() {
      return {
        title: '🎨 Professional CSS Styling',
        content: `
                  <h4>Add this modern CSS to make it look amazing:</h4>
                  <pre style="background: #2d3748; color: #fff; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 0.85rem;">
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }
  
  body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
  }
  
  header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem 0;
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 1000;
  }
  
  nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
  }
  
  nav ul {
      display: flex;
      list-style: none;
      gap: 2rem;
  }
  
  nav a {
      color: white;
      text-decoration: none;
      transition: color 0.3s ease;
  }
  
  nav a:hover {
      color: #ffd700;
  }
  
  #hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 150px 2rem 100px;
      margin-top: 80px;
  }
  
  #hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      animation: fadeInUp 1s ease;
  }
  
  .cta-button {
      background: #ffd700;
      color: #333;
      padding: 15px 30px;
      border: none;
      border-radius: 25px;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
  
  section {
      padding: 80px 2rem;
      max-width: 1200px;
      margin: 0 auto;
  }
  
  @keyframes fadeInUp {
      from {
          opacity: 0;
          transform: translateY(30px);
      }
      to {
          opacity: 1;
          transform: translateY(0);
      }
  }
  
  @media (max-width: 768px) {
      nav {
          flex-direction: column;
          gap: 1rem;
      }
      
      nav ul {
          flex-direction: column;
          gap: 1rem;
      }
      
      #hero h1 {
          font-size: 2rem;
      }
  }</pre>
                  <p><strong>💡 Pro tip:</strong> This creates a professional look with animations and responsive design!</p>
              `
      };
    }
  
    getJavaScriptHint() {
      return {
        title: '⚡ Interactive JavaScript Features',
        content: `
                  <h4>Add these interactive features:</h4>
                  <pre style="background: #2d3748; color: #fff; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 0.85rem;">
  // Smooth scrolling navigation
  document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function(e) {
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
  
  // Portfolio filter functionality
  const portfolioItems = [
      { title: 'E-commerce Store', category: 'web', image: '🛍️' },
      { title: 'Restaurant Website', category: 'web', image: '🍕' },
      { title: 'Tech Startup', category: 'startup', image: '🚀' },
      { title: 'Non-profit Site', category: 'nonprofit', image: '🌱' }
  ];
  
  function createPortfolio() {
      const portfolioSection = document.getElementById('portfolio');
      const portfolioHTML = \`
          <div class="filter-buttons">
              <button onclick="filterPortfolio('all')" class="filter-btn active">All</button>
              <button onclick="filterPortfolio('web')" class="filter-btn">Web</button>
              <button onclick="filterPortfolio('startup')" class="filter-btn">Startup</button>
              <button onclick="filterPortfolio('nonprofit')" class="filter-btn">Non-profit</button>
          </div>
          <div class="portfolio-grid" id="portfolioGrid">
              \${portfolioItems.map(item => \`
                  <div class="portfolio-item" data-category="\${item.category}">
                      <div class="portfolio-image">\${item.image}</div>
                      <h3>\${item.title}</h3>
                  </div>
              \`).join('')}
          </div>
      \`;
      portfolioSection.innerHTML += portfolioHTML;
  }
  
  function filterPortfolio(category) {
      const items = document.querySelectorAll('.portfolio-item');
      const buttons = document.querySelectorAll('.filter-btn');
      
      buttons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      
      items.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
              item.style.display = 'block';
              item.style.animation = 'fadeInUp 0.5s ease';
          } else {
              item.style.display = 'none';
          }
      });
  }
  
  // Team member interactions
  function createTeam() {
      const teamMembers = [
          { name: 'Sarah Johnson', role: 'Creative Director', bio: 'Leading creative vision' },
          { name: 'Alex Chen', role: 'Lead Developer', bio: 'Building amazing experiences' },
          { name: 'Maria Rodriguez', role: 'UX Designer', bio: 'Crafting user journeys' },
          { name: 'David Kim', role: 'Brand Strategist', bio: 'Telling brand stories' }
      ];
      
      const teamSection = document.getElementById('team');
      const teamHTML = \`
          <div class="team-grid">
              \${teamMembers.map(member => \`
                  <div class="team-card" onclick="showMemberDetail('\${member.name}')">
                      <div class="team-avatar">👤</div>
                      <h3>\${member.name}</h3>
                      <p>\${member.role}</p>
                  </div>
              \`).join('')}
          </div>
      \`;
      teamSection.innerHTML += teamHTML;
  }
  
  // Form validation
  document.addEventListener('DOMContentLoaded', function() {
      createPortfolio();
      createTeam();
      
      const form = document.getElementById('contactForm');
      if (form) {
          form.addEventListener('submit', function(e) {
              e.preventDefault();
              
              const inputs = form.querySelectorAll('input, textarea');
              let isValid = true;
              
              inputs.forEach(input => {
                  if (!input.value.trim()) {
                      input.style.border = '2px solid #e74c3c';
                      isValid = false;
                  } else {
                      input.style.border = '2px solid #27ae60';
                  }
              });
              
              if (isValid) {
                  alert('Thank you! Your message has been sent.');
                  form.reset();
              } else {
                  alert('Please fill in all fields.');
              }
          });
      }
  });</pre>
                  <p><strong>💡 Pro tip:</strong> This adds smooth scrolling, portfolio filtering, team interactions, and form validation!</p>
              `
      };
    }
  
    getAdvancedHint() {
      return {
        title: '🚀 Advanced Polish & Effects',
        content: `
                  <h4>Add these advanced touches for maximum impact:</h4>
                  <pre style="background: #2d3748; color: #fff; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 0.85rem;">
  /* Advanced CSS for extra polish */
  .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
  }
  
  .portfolio-item {
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
  }
  
  .portfolio-item:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  }
  
  .portfolio-image {
      font-size: 3rem;
      margin-bottom: 1rem;
  }
  
  .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
  }
  
  .team-card {
      background: white;
      border-radius: 15px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      cursor: pointer;
  }
  
  .team-card:hover {
      transform: scale(1.05);
      box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  }
  
  .team-avatar {
      font-size: 4rem;
      margin-bottom: 1rem;
  }
  
  .filter-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
  }
  
  .filter-btn {
      padding: 10px 20px;
      border: 2px solid #667eea;
      background: transparent;
      color: #667eea;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
  }
  
  .filter-btn.active,
  .filter-btn:hover {
      background: #667eea;
      color: white;
      transform: translateY(-2px);
  }
  
  /* Contact form styling */
  #contactForm {
      max-width: 600px;
      margin: 2rem auto;
  }
  
  #contactForm input,
  #contactForm textarea {
      width: 100%;
      padding: 15px;
      margin-bottom: 1rem;
      border: 2px solid #ddd;
      border-radius: 10px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
  }
  
  #contactForm input:focus,
  #contactForm textarea:focus {
      outline: none;
      border-color: #667eea;
  }
  
  #contactForm button {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.3s ease;
  }
  
  #contactForm button:hover {
      transform: translateY(-2px);
  }</pre>
                  <p><strong>💡 Pro tip:</strong> These advanced styles create a truly professional, interactive experience!</p>
              `
      };
    }
  
    displayHint(hint) {
      const feedback = document.getElementById('feedback');
  
      const hintHtml = `
              <div style="background: linear-gradient(135deg, #fff3e0, #ffe0b2); border: 2px solid #f39c12; border-radius: 16px; padding: 20px; margin-top: 16px; animation: hintReveal 0.5s ease;">
                  <div style="text-align: center; margin-bottom: 16px;">
                      <div style="font-size: 2rem; margin-bottom: 8px;">💡</div>
                      <h3 style="margin: 0; color: #f39c12; font-size: 1.3rem;">
                          ${hint.title}
                      </h3>
                      <p style="margin: 8px 0 0 0; color: #e65100; font-weight: 600;">
                          🔥 Your ONE hint - use it wisely!
                      </p>
                  </div>
                  
                  <div style="background: rgba(255,255,255,0.8); border-radius: 12px; padding: 16px;">
                      ${hint.content}
                  </div>
                  
                  <div style="text-align: center; margin-top: 16px; padding: 12px; background: rgba(230, 81, 0, 0.1); border-radius: 8px;">
                      <p style="margin: 0; color: #e65100; font-weight: 600; font-size: 0.9rem;">
                          ⚠️ Remember: This is your final hint! Make it count and push through to victory! 🏆
                      </p>
                  </div>
              </div>
          `;
  
      // Add hint reveal animation
      if (!document.getElementById('hint-styles')) {
        const style = document.createElement('style');
        style.id = 'hint-styles';
        style.textContent = `
                  @keyframes hintReveal {
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
  
      feedback.innerHTML = hintHtml;
      feedback.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
  
      // Show encouraging message
      setTimeout(() => {
        this.showTempMessage('💪 You got this! Use the hint to build something amazing!', 4000);
      }, 500);
    }
  
    completeCourse() {
      if (!this.isCompleted) {
        this.showMessage('🎯 Complete the final project first to unlock this achievement!', 'warning');
        return;
      }
    
      // Show completion ceremony
      this.showCompletionCeremony();
    
      // Mark course as completed
      localStorage.setItem('partB_course_completed_date', new Date().toISOString());
      
      // NEW: Trigger certificate generation after ceremony
      setTimeout(() => {
        this.showCertificateOption();
      }, 4000);
    
      setTimeout(() => {
        // Redirect to completion page or show final message
        this.showFinalMessage();
      }, 3000);
    }
  
    showCompletionCeremony() {
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
                  -webkit-overflow-scrolling: touch;
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
                      <div style="
                          text-align: center; 
                          animation: ceremonySlideUp 1s ease;
                          max-width: 800px;
                          width: 100%;
                      ">
                          <div style="font-size: clamp(3rem, 10vw, 6rem); margin-bottom: 2rem; animation: trophySpin 2s ease;">🏆</div>
                          <h1 style="
                              font-size: clamp(2rem, 6vw, 3rem); 
                              margin-bottom: 1rem; 
                              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                          ">
                              COURSE COMPLETED!
                          </h1>
                          <h2 style="
                              font-size: clamp(1.2rem, 4vw, 1.5rem); 
                              margin-bottom: 2rem; 
                              opacity: 0.9; 
                              color: white;
                          ">
                              You've Mastered Web Development!
                          </h2>
                          
                          <div style="
                              background: rgba(255,255,255,0.1); 
                              padding: clamp(1rem, 4vw, 2rem); 
                              border-radius: 16px; 
                              backdrop-filter: blur(10px); 
                              margin: 2rem 0;
                          ">
                              <h3 style="margin-bottom: 1rem; color: #ffd700; font-size: clamp(1rem, 3vw, 1.2rem);">🌟 Your Achievements</h3>
                              <div style="
                                  display: grid; 
                                  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); 
                                  gap: 1rem; 
                                  margin: 1rem 0;
                              ">
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
                                      <div style="font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600;">Skills Unlocked</div>
                                      <div style="font-size: clamp(0.8rem, 2vw, 0.9rem); opacity: 0.8;">HTML, CSS, JS</div>
                                  </div>
                                  <div style="padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 8px;">
                                      <div style="font-size: clamp(1.5rem, 4vw, 2rem); margin-bottom: 0.5rem;">🚀</div>
                                      <div style="font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600;">Ready to Build</div>
                                      <div style="font-size: clamp(0.8rem, 2vw, 0.9rem); opacity: 0.8;">Amazing Websites</div>
                                  </div>
                              </div>
                          </div>
                          
                          <p style="
                              font-size: clamp(1rem, 3vw, 1.2rem); 
                              margin-bottom: 2rem; 
                              max-width: 600px; 
                              line-height: 1.6;
                              margin-left: auto;
                              margin-right: auto;
                          ">
                              You started as a beginner and now you're a web developer! You have the skills to build amazing websites and bring your ideas to life.
                          </p>
                          
                          <div style="
                              display: flex; 
                              gap: 1rem; 
                              flex-wrap: wrap; 
                              justify-content: center;
                              margin-bottom: 2rem;
                          ">
                              <button onclick="window.celebrateSuccess()" style="
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
      const style = document.createElement('style');
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
  
      // More celebration particles
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          this.createParticle(['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'][Math.floor(Math.random() * 5)]);
        }, i * 30);
      }
    }
  
    showFinalMessage() {
      this.showMessage(`
              🎊 CONGRATULATIONS! You've completed the entire web development course! 
              You're now ready to build amazing websites and continue your journey as a developer. 
              Keep practicing, keep building, and never stop learning! 🚀
          `, 'success');
    }
  
    updateUI() {
      const hintCounter = document.getElementById('hint-count');
      if (hintCounter) {
        hintCounter.textContent = this.maxHints - this.hintsUsed;
      }
    }
  
    // Fixed version of showMessage method - make important messages persistent
    showMessage(message, type = 'info') {
      const feedback = document.getElementById('feedback');
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
  
      const color = colors[type];
  
      // CHANGED: Don't replace detailed results, add message above them
      const existingContent = feedback.innerHTML;
      const isDetailedResults = existingContent.includes('Final Score:');
  
      if (isDetailedResults && type === 'success') {
        // For success messages, don't replace detailed results
        return;
      }
  
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
  
      // CHANGED: Don't auto-scroll for simple messages if detailed results were showing
      if (!isDetailedResults) {
        feedback.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  
    addInspirationalMessages() {
      const messages = [
        "🌟 Every expert was once a beginner!",
        "💪 You're building something amazing!",
        "🚀 Your coding journey is just beginning!",
        "🎯 Focus on progress, not perfection!",
        "⭐ You've got the skills to succeed!"
      ];
  
      let messageIndex = 0;
  
      setInterval(() => {
        if (this.challengeStarted && !this.isCompleted) {
          const timerEl = document.getElementById('challenge-timer');
          if (timerEl && Math.random() < 0.1) { // 10% chance every interval
            const originalText = timerEl.textContent;
            timerEl.textContent = messages[messageIndex];
            timerEl.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            timerEl.style.color = 'white';
  
            setTimeout(() => {
              timerEl.textContent = originalText;
              timerEl.style.background = '';
              timerEl.style.color = '';
            }, 2000);
  
            messageIndex = (messageIndex + 1) % messages.length;
          }
        }
      }, 10000); // Check every 10 seconds
    }
  }
  
  // Initialize the Final Challenge
  document.addEventListener('DOMContentLoaded', function () {
    new FinalChallenge();
  });
  
  window.celebrateSuccess = function () {
    // Create celebration particles
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
  
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
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
                  animation: explode 2s ease-out forwards;
              `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
      }, i * 20);
    }
  
    // Show celebration message
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
      `;
    msg.innerHTML = '🎊 YOU DID IT! 🎊<br><small>Welcome to the developer community!</small>';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 4000);
  };

  window.generateCertificate = function() {
    // Get student name
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
  
    // Get completion data
    const completionDate = localStorage.getItem('partB_course_completed_date');
    const finalScore = localStorage.getItem('final_project_score') || '100';
  
    // Create certificate data
    const certificateData = {
      studentName: studentName,
      completionDate: completionDate ? new Date(completionDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      finalScore: finalScore,
      generatedAt: new Date().toISOString()
    };
  
    // Save certificate data
    localStorage.setItem('certificateData', JSON.stringify(certificateData));
  
    // Open certificate page
    const certificateWindow = window.open('', '_blank', 'width=1000,height=700');
    
    // Generate the certificate HTML
    const certificateHTML = `
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
                  background: linear-gradient(45deg, 
                      #667eea 0px, #667eea 10px, transparent 10px, transparent 20px,
                      #667eea 20px, #667eea 30px, transparent 30px, transparent 40px);
                  background-size: 40px 40px;
                  opacity: 0.1;
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
  
              .course-details {
                  background: rgba(102, 126, 234, 0.1);
                  border: 2px solid #667eea;
                  border-radius: 15px;
                  padding: 20px;
                  margin: 20px 0;
                  display: grid;
                  grid-template-columns: repeat(4, 1fr);
                  gap: 15px;
              }
  
              .detail-item {
                  text-align: center;
              }
  
              .detail-label {
                  font-size: 0.8rem;
                  color: #667eea;
                  font-weight: 600;
                  margin-bottom: 5px;
                  text-transform: uppercase;
              }
  
              .detail-value {
                  font-size: 1.1rem;
                  color: #333;
                  font-weight: 700;
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
                  opacity: 0.9;
              }
  
              .achievement-badge {
                  position: absolute;
                  top: 20px;
                  left: 20px;
                  background: linear-gradient(135deg, #27ae60, #2ecc71);
                  color: white;
                  padding: 10px 15px;
                  border-radius: 25px;
                  font-weight: 700;
                  font-size: 0.9rem;
                  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
                  z-index: 3;
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
              <div class="achievement-badge">
                  Course Successfully Completed!
              </div>
              
              <div class="certificate">
                  <div class="certificate-header">
                      <h1 class="certificate-title">Certificate of Completion</h1>
                      <p class="certificate-subtitle">Web Development Mastery Course</p>
                  </div>
  
                  <div class="certificate-body">
                      <p class="awarded-to">This certificate is proudly awarded to</p>
                      <h2 class="student-name">${studentName}</h2>
                      
                      <p class="completion-text">
                          For successfully completing all 15 lessons of the comprehensive Web Development course,
                          demonstrating proficiency in HTML5, CSS3, and JavaScript, and creating professional-quality
                          web applications that showcase modern development skills and best practices.
                      </p>
  
                      <div class="course-details">
                          <div class="detail-item">
                              <div class="detail-label">Lessons Completed</div>
                              <div class="detail-value">15/15</div>
                          </div>
                          <div class="detail-item">
                              <div class="detail-label">Technologies Mastered</div>
                              <div class="detail-value">HTML, CSS, JS</div>
                          </div>
                          <div class="detail-item">
                              <div class="detail-label">Final Project Score</div>
                              <div class="detail-value">${finalScore}%</div>
                          </div>
                          <div class="detail-item">
                              <div class="detail-label">Course Level</div>
                              <div class="detail-value">Beginner to Intermediate</div>
                          </div>
                      </div>
                  </div>
  
                  <div class="certificate-footer">
                      <div class="signature-section">
                          <div class="signature-line"></div>
                          <p class="signature-label">Course Instructor</p>
                      </div>
                      
                      <div class="signature-section">
                          <div class="signature-line"></div>
                          <p class="signature-label">Date: ${new Date(certificateData.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
  
    // Write the HTML to the new window
    certificateWindow.document.write(certificateHTML);
    certificateWindow.document.close();
  
    // Focus the new window
    certificateWindow.focus();
  
    // Remove the prompt
    const prompt = document.getElementById('certificate-prompt');
    if (prompt) {
      prompt.remove();
    }
  
    // Show success message
    setTimeout(() => {
      alert('Certificate generated! You can now download it as PDF using the Print function.');
    }, 1000);
  };