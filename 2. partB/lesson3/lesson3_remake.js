// Get references to demo elements
const demoCode = document.getElementById('demo-code');
const demoPreview = document.getElementById('demo-preview');

/**
 * Updates the demo preview iframe with styled HTML content
 * Shows a complete example of links and images in action
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
                border-bottom: 3px solid #007BFF; 
                padding-bottom: 10px; 
                margin-bottom: 20px;
            }
            h2 { 
                color: #34495e; 
                border-left: 4px solid #007BFF; 
                padding-left: 15px;
            }
            h3 { 
                color: #7f8c8d; 
                font-size: 1.25rem;
            }
            img { 
                border: 3px solid #28a745; 
                border-radius: 12px; 
                display: block; 
                margin: 15px 0; 
                transition: transform 0.3s ease;
            }
            img:hover { 
                transform: scale(1.05); 
            }
            p { 
                background: white; 
                padding: 15px; 
                border-radius: 8px; 
                border-left: 4px solid #e3f2fd; 
                margin: 15px 0;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            a {
                color: #007BFF;
                text-decoration: none;
                background: #e3f2fd;
                padding: 6px 12px;
                border-radius: 20px;
                border: 2px solid #007BFF;
                font-weight: 600;
                transition: all 0.3s ease;
                display: inline-block;
                margin: 2px;
            }
            a:hover {
                background: #007BFF;
                color: white;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,123,255,0.3);
            }
            strong {
                color: #e74c3c;
                background: #fef9e7;
                padding: 2px 4px;
                border-radius: 3px;
            }
        </style>
    </head>
    <body style="display: flex; flex-direction: column;">
        <h1>Welcome to My Portfolio</h1>
        <img src="https://via.placeholder.com/150/28a745/FFFFFF?text=Me" alt="Profile photo of John Doe" width="150">
        <h2>About Me</h2>
        <p>Hi! I'm a <strong>web developer</strong> who loves creating amazing websites.</p>
        <h3>My Favorite Resources</h3>
        <p>Check out these awesome sites:</p>
        <a href="https://developer.mozilla.org" target="_blank">MDN Web Docs</a> | 
        <a href="https://github.com" target="_blank">My GitHub</a> | 
        <a href="mailto:contact@example.com">Email Me</a>
        <p>Download my <a href="javascript:void(0)">resume</a> or view my <a href="javascript:void(0)">portfolio</a>!</p>
    </body>
    </html>`;
}

// ===========================
// TASK FUNCTIONALITY
// ===========================

// Get references to task elements
const taskEditor = document.getElementById('task-code');
const taskPreview = document.getElementById('task-preview');

/**
 * Renders the student's HTML code in the preview iframe
 * Updates in real-time as they type
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
                border-bottom: 3px solid #007BFF; 
                padding-bottom: 10px; 
                font-size: 2rem;
            }
            h2 { 
                border-left: 4px solid #007BFF; 
                padding-left: 15px;
                font-size: 1.5rem;
            }
            img { 
                border: 3px solid #28a745; 
                border-radius: 12px; 
                display: block; 
                margin: 15px 0; 
                transition: transform 0.3s ease;
                max-width: 100%;
                height: auto;
            }
            img:hover { 
                transform: scale(1.05) rotate(1deg); 
                box-shadow: 0 8px 25px rgba(40,167,69,0.3);
            }
            p { 
                background: white; 
                padding: 15px; 
                border-radius: 8px; 
                border-left: 4px solid #e3f2fd; 
                margin: 15px 0;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            a {
                color: #007BFF;
                text-decoration: none;
                background: #e3f2fd;
                padding: 8px 16px;
                border-radius: 25px;
                border: 2px solid #007BFF;
                font-weight: 600;
                transition: all 0.3s ease;
                display: inline-block;
                margin: 4px 2px;
            }
            a:hover {
                background: #007BFF;
                color: white;
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(0,123,255,0.4);
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
        </style>
    </head>
    <body>
        ${code}
    </body>
    </html>`;
}

// Set up real-time preview updates
taskEditor.addEventListener('input', renderTask);
renderTask(); // Initial render

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

        // Insert tab character (or spaces if you prefer)
        const tabChar = '  '; // Using 2 spaces

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

/**
 * Animates feature cards when clicked and shows educational info
 * @param {HTMLElement} element - The clicked feature card
 * @param {string} type - The type of feature ('links', 'images', 'paths')
 */
function animateFeature(element, type) {
  // Apply animation styles
  element.style.transform = 'translateY(-8px) scale(1.05) rotate(2deg)';
  element.style.boxShadow = '0 12px 30px rgba(0,123,255,0.4)';

  // Add sparkle effect
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '✨';
  sparkle.style.position = 'absolute';
  sparkle.style.top = '10px';
  sparkle.style.right = '15px';
  sparkle.style.animation = 'sparkle 1.5s ease-out';
  sparkle.style.fontSize = '1.5em';
  sparkle.style.zIndex = '10';
  element.style.position = 'relative';
  element.appendChild(sparkle);

  // Educational messages for each feature type
  const messages = {
    links: "🔗 Links connect your page to the entire web! Use href attribute to specify destinations.",
    images: "🖼️ Images make your page visually appealing! Always include alt text for accessibility.",
    paths: "📁 Paths tell browsers where to find your files - absolute (full URL) or relative (local path)."
  };

  // Show educational popup
  showInfoPopup(messages[type]);

  // Reset animation after delay
  setTimeout(() => {
    element.style.transform = '';
    element.style.boxShadow = '';
    if (sparkle.parentElement) sparkle.remove();
  }, 1500);
}

/**
 * Animates the demo image when clicked
 * @param {HTMLImageElement} img - The image element to animate
 */
function animateImage(img) {
  // Apply animation effects
  img.style.transform = 'scale(1.2) rotate(5deg)';
  img.style.filter = 'brightness(1.2) contrast(1.1)';

  // Reset after animation
  setTimeout(() => {
    img.style.transform = '';
    img.style.filter = '';
  }, 800);

  // Show educational message
  showInfoPopup("🎨 Images can be interactive! Add hover effects and click handlers for engaging experiences.");
}

/**
 * Shows information based on the type of demo link clicked
 * @param {string} type - The type of link information to show
 */
function showInfo(type) {
  const messages = {
    internal: "📄 Internal links navigate within your website using relative paths like 'about.html' or '#section'!"
  };

  showInfoPopup(messages[type]);
}

/**
 * Displays an informational popup with educational content
 * @param {string} message - The message to display in the popup
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
            padding: 25px 30px;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            border: 3px solid var(--brand);
            max-width: 450px;
            z-index: 10000;
            animation: popIn 0.3s ease-out;
            text-align: center;
        ">
            <div style="font-size: 1.1em; margin-bottom: 20px; line-height: 1.5;">
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
            " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                Got it! ✅
            </button>
        </div>
    `;

  document.body.appendChild(popup);

  // Auto-remove popup after delay
  setTimeout(() => {
    if (popup.parentElement) {
      popup.style.animation = 'fadeOut 0.4s ease-out forwards';
      setTimeout(() => popup.remove(), 400);
    }
  }, 4500);
}

/**
 * Shows a random helpful hint to guide students
 */
function showHint() {
  const hints = [
    "🔗 Start with &lt;h1&gt;Your Name&lt;/h1&gt; for your main heading!",
    "🖼️ Add an image: &lt;img src='url' alt='description' width='200'&gt;",
    "📝 Use &lt;p&gt; tags for paragraphs about yourself",
    "🌐 Create links: &lt;a href='https://example.com'&gt;Link text&lt;/a&gt;",
    "✅ Don't forget the alt attribute for images - it's required!",
    "🎯 Try placeholder images: https://via.placeholder.com/200",
    "💡 Use target='_blank' to open links in new tabs"
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
            padding: 20px 28px;
            border-radius: 30px;
            box-shadow: 0 10px 25px rgba(255,193,7,0.5);
            z-index: 10000;
            animation: slideInRight 0.6s ease-out;
            font-weight: 600;
            max-width: 380px;
            border: 3px solid rgba(255,255,255,0.4);
        ">
            ${randomHint}
        </div>
    `;

  document.body.appendChild(hintPopup);

  // Auto-remove hint after delay
  setTimeout(() => {
    hintPopup.firstElementChild.style.animation = 'slideOutRight 0.6s ease-out';
    setTimeout(() => hintPopup.remove(), 600);
  }, 4000);
}

// ===========================
// ANSWER VALIDATION
// ===========================

/**
 * Validates the student's HTML code and provides feedback
 * Checks for required elements and proper structure
 */
/**
 * FIXED VERSION - Key changes to make the next button work properly
 */

function checkAnswer() {
  const code = taskEditor.value.trim();
  const codeLower = code.toLowerCase();

  // Check if code is empty
  if (!code || code.replace(/\s/g, '') === '') {
    showError('🤨', 'Your code is empty!', 'Please write some HTML code in the editor above.');
    return;
  }

  // Check if any HTML tags exist
  const hasAnyHTMLTags = /<[^>]+>/.test(code);
  if (!hasAnyHTMLTags) {
    showError('😕', 'No HTML tags found!', 'HTML uses tags like &lt;h1&gt;, &lt;img&gt;, &lt;p&gt;, and &lt;a&gt;. Try adding some tags!');
    return;
  }

  // Enhanced validation checks
  const hasH1 = /<h1[^>]*>[\s\S]*?<\/h1>/i.test(code);
  const hasImg = /<img[^>]*>/i.test(code);
  const hasAlt = /<img[^>]*alt\s*=\s*["'][^"']*["']/i.test(code);
  const hasLink = /<a[^>]*href\s*=\s*["'][^"']*["'][^>]*>[\s\S]*?<\/a>/i.test(code);
  const hasP = /<p[^>]*>[\s\S]*?<\/p>/i.test(code);

  // Count elements
  const imgCount = (code.match(/<img[^>]*>/gi) || []).length;
  const linkCount = (code.match(/<a[^>]*href[^>]*>[\s\S]*?<\/a>/gi) || []).length;

  let errorMessages = [];
  let successMessages = [];

  // Validate each required element
  if (!hasH1) {
    errorMessages.push('Missing &lt;h1&gt; heading tag');
  } else {
    successMessages.push('✅ Has main heading');
  }

  if (!hasImg) {
    errorMessages.push('Missing &lt;img&gt; image tag');
  } else if (imgCount !== 1) {
    errorMessages.push(`Must have exactly 1 image, found ${imgCount}`);
  } else {
    successMessages.push('✅ Has 1 image');
  }

  if (hasImg && !hasAlt) {
    errorMessages.push('Image is missing required alt attribute');
  } else if (hasImg && hasAlt) {
    successMessages.push('✅ Image has alt text');
  }

  if (!hasLink) {
    errorMessages.push('Missing &lt;a&gt; link tag with href attribute');
  } else if (linkCount < 1) {
    errorMessages.push('Must have at least 1 working link');
  } else {
    successMessages.push('✅ Has link(s)');
  }

  if (!hasP) {
    errorMessages.push('Missing &lt;p&gt; paragraph tag');
  } else {
    successMessages.push('✅ Has paragraph');
  }

  // Get UI elements for feedback
  const feedback = document.getElementById('feedback');
  const nextBtn = document.getElementById('nextLessonBtn');
  const steps = document.querySelectorAll('.step');

  // Display results
  if (errorMessages.length === 0) {
    // Success - all requirements met
    feedback.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <span style="font-size: 2em;">🎉</span>
                <div>
                    <div style="font-size: 1.2em; margin-bottom: 6px;">
                        <strong>Outstanding work! Your Links & Images page is perfect!</strong>
                    </div>
                    <div style="opacity: 0.85; line-height: 1.4;">
                        ${successMessages.join(' • ')}
                        <br>You've mastered HTML links and images! Ready for lists and navigation?
                    </div>
                </div>
            </div>
        `;
    feedback.className = 'feedback success';

    // FIXED: Enable next lesson button properly
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1'; // Remove the opacity override
    nextBtn.style.cursor = 'pointer'; // Make it clearly clickable
    nextBtn.style.animation = 'pulse 1.5s infinite';

    // Update progress tracker
    steps[1].classList.add('active');
    steps[2].classList.add('active');

    // Store completion in localStorage
    localStorage.setItem('partB_lesson3_remake_complete', 'true');

    // FIXED: Make sure markCurrentLessonComplete exists or remove it
    if (typeof markCurrentLessonComplete === 'function') {
      markCurrentLessonComplete();
    }

    // Trigger celebration animation
    createCelebration();

  } else {
    // Errors found - show what needs fixing
    feedback.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <span style="font-size: 1.8em;">🛠️</span>
                <div style="flex: 1;">
                    <div style="font-size: 1.1em; margin-bottom: 10px;">
                        <strong>Let's fix these items:</strong>
                    </div>
                    <ul style="margin: 0; padding-left: 20px; list-style-type: none;">
                        ${errorMessages.map(error => `<li style="margin: 6px 0; padding: 10px 0; border-left: 4px solid #e74c3c; padding-left: 15px; background: rgba(231,76,60,0.1); border-radius: 6px;">❌ ${error}</li>`).join('')}
                    </ul>
                    ${successMessages.length > 0 ? `
                        <div style="margin-top: 15px; padding: 15px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px;">
                            <strong>✨ Great progress:</strong> ${successMessages.join(' • ')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    feedback.className = 'feedback error';
    steps[1].classList.add('active');

    // FIXED: Make sure button stays disabled on errors
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.5';
    nextBtn.style.cursor = 'not-allowed';
    nextBtn.style.animation = 'none';
  }
}

/**
 * Shows an error message in the feedback area
 * @param {string} emoji - Emoji to display with the error
 * @param {string} title - Error title
 * @param {string} message - Detailed error message
 */
function showError(emoji, title, message) {
  const feedback = document.getElementById('feedback');
  const steps = document.querySelectorAll('.step');

  feedback.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <span style="font-size: 1.8em;">${emoji}</span>
            <div>
                <div style="font-size: 1.1em; margin-bottom: 6px;">
                    <strong>${title}</strong>
                </div>
                <div style="opacity: 0.9; line-height: 1.4;">
                    ${message}
                </div>
            </div>
        </div>
    `;
  feedback.className = 'feedback error';

  // Reset progress tracker
  steps[1].classList.remove('active');
  steps[2].classList.remove('active');
}

// ===========================
// CELEBRATION EFFECTS
// ===========================

/**
 * Creates a confetti celebration animation for successful completion
 */
function createCelebration() {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];

  // Generate confetti particles
  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
            position: fixed;
            width: ${8 + Math.random() * 6}px;
            height: ${8 + Math.random() * 6}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -20px;
            z-index: 10000;
            pointer-events: none;
            animation: confetti-fall ${2.5 + Math.random() * 3}s linear forwards;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        `;

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 6000);
  }
}

// ===========================
// CSS ANIMATIONS
// ===========================

// Add required CSS animations to the page
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideInRight {
        0% { opacity: 0; transform: translateX(120px); }
        100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOutRight {
        0% { opacity: 1; transform: translateX(0); }
        100% { opacity: 0; transform: translateX(120px); }
    }
    @keyframes fadeOut {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    }
    @keyframes sparkle {
        0% { opacity: 1; transform: scale(1) rotate(0deg); }
        50% { opacity: 0.7; transform: scale(1.3) rotate(180deg); }
        100% { opacity: 0; transform: scale(0.8) rotate(360deg); }
    }
    @keyframes confetti-fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(animationStyles);

// ===========================
// NAVIGATION & INITIALIZATION
// ===========================

/**
 * Check if lesson was previously completed and restore UI state
 * This runs when the page loads to handle returning users
 */
function checkAndRestoreCompletion() {
  // Wait for DOM to be ready
  setTimeout(() => {
    const isCompleted = localStorage.getItem('partB_lesson3_remake_complete') === 'true';

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

// ===========================
// EVENT LISTENERS & INITIALIZATION
// ===========================

// Initialize demo on page load
updateDemo();

// Set up next lesson navigation
document.getElementById('nextLessonBtn').addEventListener('click', function() {
  if (!this.disabled) {
    window.location.href = '/2. partB/lesson4/lesson4_remake.html';
  }
});

// Initialize lesson state on page load
document.addEventListener('DOMContentLoaded', function() {
  const nextBtn = document.getElementById('nextLessonBtn');
  // Always start disabled - force user to complete the exercise
  nextBtn.disabled = true;
  nextBtn.style.opacity = '0.5';
  nextBtn.style.cursor = 'not-allowed';

  // Check for previous completion
  checkAndRestoreCompletion();
});

// Multiple ways to ensure completion check runs after everything is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkAndRestoreCompletion);
} else {
  checkAndRestoreCompletion();
}

// Backup completion check with delay
setTimeout(checkAndRestoreCompletion, 500);

/* Pass checked_1 */