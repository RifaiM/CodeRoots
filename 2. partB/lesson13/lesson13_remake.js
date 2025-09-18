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

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHybridSystem);
} else {
  initHybridSystem();
}

setTimeout(initHybridSystem, 100);

// Validation info data
const validationData = {
    capture: {
      title: "📋 Input Capture with .value",
      description: "The .value property gets the current content of form input elements. Every time a user types, we can access what they've entered and check if it meets our requirements.",
      step: "capture"
    },
    check: {
      title: "✅ Validation Check with Conditions", 
      description: "Use JavaScript conditions to check if input meets requirements like minimum length, format, or required fields. This is where we apply our validation rules.",
      step: "check"
    },
    feedback: {
      title: "💬 User Feedback Display",
      description: "Show specific error messages or success feedback to guide users in fixing their input. Good feedback tells users exactly what needs to be corrected.",
      step: "feedback"
    },
    control: {
      title: "🎛️ Form Submission Control",
      description: "Use event.preventDefault() to stop forms from submitting when validation fails, keeping users on the page to fix errors before proceeding.",
      step: "control"
    }
  };
  
  // Concept demonstrations
  const conceptDemos = {
    input: {
      title: "📋 Getting Input Values",
      content: `
        <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #dde7ff;">
          <h4>Try typing in this input field:</h4>
          <input type="text" id="demo-input" placeholder="Type something..." style="width: 100%; padding: 10px; margin: 10px 0; border: 2px solid #dde7ff; border-radius: 4px;">
          <p><strong>JavaScript code:</strong></p>
          <code style="display: block; background: #f2f6ff; padding: 10px; border-radius: 4px;">
            let value = document.getElementById("demo-input").value;<br>

          </code>
          <div id="input-output" style="margin-top: 10px; font-weight: 600; color: #007BFF;">
            Current value: <span id="current-value">(nothing typed yet)</span>
          </div>
        </div>
      `
    },
    validation: {
      title: "✅ Validation Logic",
      content: `
        <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #dde7ff;">
          <h4>Username validation example:</h4>
          <input type="text" id="validation-input" placeholder="Try different lengths..." style="width: 100%; padding: 10px; margin: 10px 0; border: 2px solid #dde7ff; border-radius: 4px;">
          <p><strong>Validation rules:</strong> Must be at least 3 characters</p>
          <code style="display: block; background: #f2f6ff; padding: 10px; border-radius: 4px; margin: 10px 0;">
            if (input.value.length < 3) {<br>
            &nbsp;&nbsp;return "Too short!";<br>
            } else {<br>
            &nbsp;&nbsp;return "Valid!";<br>
            }
          </code>
          <div id="validation-result" style="margin-top: 10px; font-weight: 600; padding: 8px; border-radius: 4px;">
            Type in the field above to see validation in action!
          </div>
        </div>
      `
    },
    prevent: {
      title: "🛑 Preventing Form Submission",
      content: `
        <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #dde7ff;">
          <h4>Try submitting this form with empty input:</h4>
          <form id="prevent-demo-form" style="margin: 15px 0;">
            <input type="text" id="prevent-input" placeholder="Leave empty and try to submit" style="width: 100%; padding: 10px; margin: 10px 0; border: 2px solid #dde7ff; border-radius: 4px;">
            <button type="submit" style="background: #007BFF; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Submit Form</button>
          </form>
          <p><strong>JavaScript code:</strong></p>
          <code style="display: block; background: #f2f6ff; padding: 10px; border-radius: 4px;">
            form.addEventListener('submit', function(event) {<br>
            &nbsp;&nbsp;if (input.value.trim() === '') {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;event.preventDefault(); // Stops submission!<br>
            &nbsp;&nbsp;&nbsp;&nbsp;alert("Please fill the field!");<br>
            &nbsp;&nbsp;}<br>
            });
          </code>
          <div id="prevent-result" style="margin-top: 10px; font-weight: 600; color: #666;">
            Form submission status will appear here
          </div>
        </div>
      `
    },
    feedback: {
      title: "💬 User Feedback Messages",
      content: `
        <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #dde7ff;">
          <h4>See how feedback changes based on input:</h4>
          <input type="email" id="feedback-input" placeholder="Try valid/invalid email formats" style="width: 100%; padding: 10px; margin: 10px 0; border: 2px solid #dde7ff; border-radius: 4px;">
          <p><strong>JavaScript code:</strong></p>
          <code style="display: block; background: #f2f6ff; padding: 10px; border-radius: 4px; margin: 10px 0;">
            if (!email.includes("@")) {<br>
            &nbsp;&nbsp;feedbackElement.innerHTML = "❌ Missing @ symbol!";<br>
            &nbsp;&nbsp;feedbackElement.style.color = "red";<br>
            } else {<br>
            &nbsp;&nbsp;feedbackElement.innerHTML = "✅ Email looks good!";<br>
            &nbsp;&nbsp;feedbackElement.style.color = "green";<br>
            }
          </code>
          <div id="feedback-result" style="margin-top: 10px; font-weight: 600; padding: 8px; border-radius: 4px; background: #f8f9ff;">
            Start typing an email to see feedback messages!
          </div>
        </div>
      `
    }
  };
  
  // Initialize interactive playground
  function initValidationPlayground() {
    const buttons = document.querySelectorAll('.validation-btn');
    const validationInfo = document.getElementById('validation-info');
    const demoForm = document.getElementById('demo-form');
    const demoUsernameInput = document.getElementById('demo-username');
    const demoEmailInput = document.getElementById('demo-email');
    const demoFeedback = document.getElementById('demo-feedback');
  
    // Button controls
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const step = button.dataset.step;
        
        // Update active button
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update info panel
        const info = validationData[step];
        validationInfo.innerHTML = `
          <h4>${info.title}</h4>
          <p>${info.description}</p>
        `;
        validationInfo.classList.add('animate');
        
        // Highlight corresponding flow step
        const flowSteps = document.querySelectorAll('.flow-step');
        flowSteps.forEach(step => step.classList.remove('active'));
        const currentStep = document.querySelector(`[data-step="${info.step}"]`);
        if (currentStep) currentStep.classList.add('active');
        
        setTimeout(() => {
          validationInfo.classList.remove('animate');
        }, 500);
      });
    });
  
    // Real-time validation for demo form
    function updateValidationFlow(step, detail, isActive = true) {
      const stepElement = document.querySelector(`[data-step="${step}"]`);
      const detailElement = document.getElementById(`${step}-detail`);
      
      if (stepElement && isActive) {
        stepElement.classList.add('active');
      }
      if (detailElement) {
        detailElement.textContent = detail;
      }
    }
  
    function validateDemoInput(input, type) {
      const value = input.value.trim();
      
      // Update capture step
      updateValidationFlow('capture', value ? `"${value}"` : 'Waiting for input...');
      
      let isValid = false;
      let message = '';
      
      if (type === 'username') {
        if (value.length === 0) {
          message = 'Username is required!';
          updateValidationFlow('check', 'Empty check: FAIL');
        } else if (value.length < 3) {
          message = 'Username must be at least 3 characters!';
          updateValidationFlow('check', 'Length check: FAIL');
        } else {
          message = '✅ Username looks good!';
          updateValidationFlow('check', 'Length check: PASS');
          isValid = true;
        }
      } else if (type === 'email') {
        if (value.length === 0) {
          message = 'Email is required!';
          updateValidationFlow('check', 'Empty check: FAIL');
        } else if (!value.includes('@') || !value.includes('.')) {
          message = 'Please enter a valid email address!';
          updateValidationFlow('check', 'Format check: FAIL');
        } else {
          message = '✅ Email format is valid!';
          updateValidationFlow('check', 'Format check: PASS');
          isValid = true;
        }
      }
      
      // Update feedback step
      updateValidationFlow('feedback', isValid ? 'Success message' : 'Error message');
      
      // Update control step
      updateValidationFlow('control', isValid ? 'Allow submission' : 'Prevent submission');
      
      // Update input styling and feedback
      input.className = isValid ? 'success' : (value.length > 0 ? 'error' : '');
      demoFeedback.innerHTML = message;
      demoFeedback.className = `demo-feedback ${isValid ? 'success' : 'error'}`;
      
      return isValid;
    }
  
    // Add event listeners for real-time validation
    demoUsernameInput.addEventListener('input', () => validateDemoInput(demoUsernameInput, 'username'));
    demoEmailInput.addEventListener('input', () => validateDemoInput(demoEmailInput, 'email'));
  
    // Form submission handler
    demoForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const usernameValid = validateDemoInput(demoUsernameInput, 'username');
      const emailValid = validateDemoInput(demoEmailInput, 'email');
      
      if (usernameValid && emailValid) {
        demoFeedback.innerHTML = '🎉 Form would be submitted! All validation passed.';
        demoFeedback.className = 'demo-feedback success';
        updateValidationFlow('control', 'Submission allowed');
      } else {
        demoFeedback.innerHTML = '⚠️ Form submission prevented! Please fix the errors above.';
        demoFeedback.className = 'demo-feedback error';
        updateValidationFlow('control', 'Submission prevented');
      }
    });
  }
  
  // Highlight validation function
  function highlightValidation(type) {
    const button = document.querySelector(`[data-step="${type}"]`);
    if (button) {
      button.click();
    }
    
    // Add visual feedback
    const card = document.querySelector(`.${type}-card`);
    if (card) {
      card.style.transform = 'scale(1.05)';
      card.style.boxShadow = '0 12px 28px rgba(0,123,255,0.3)';
      
      setTimeout(() => {
        card.style.transform = '';
        card.style.boxShadow = '';
      }, 300);
    }
  }
  
  // Demonstrate concepts function
  function demonstrateConcept(concept) {
    const demoArea = document.getElementById('concept-demo');
    const demo = conceptDemos[concept];
    
    if (demo) {
      demoArea.innerHTML = `
        <h4>${demo.title}</h4>
        ${demo.content}
      `;
      
      // Add interactive functionality based on concept
      setTimeout(() => {
        if (concept === 'input') {
          const input = document.getElementById('demo-input');
          const output = document.getElementById('current-value');
          
          input.addEventListener('input', function() {
            const value = this.value;
            output.textContent = value || '(nothing typed yet)';
          });
        }
        
        if (concept === 'validation') {
          const input = document.getElementById('validation-input');
          const result = document.getElementById('validation-result');
          
          input.addEventListener('input', function() {
            const value = this.value;
            if (value.length === 0) {
              result.innerHTML = 'Type something to see validation...';
              result.style.background = '#f8f9ff';
              result.style.color = '#666';
            } else if (value.length < 3) {
              result.innerHTML = '❌ Too short! Must be at least 3 characters.';
              result.style.background = 'rgba(231, 76, 60, 0.1)';
              result.style.color = '#e74c3c';
            } else {
              result.innerHTML = '✅ Valid! Length requirement met.';
              result.style.background = 'rgba(39, 174, 96, 0.1)';
              result.style.color = '#27ae60';
            }
          });
        }
        
        if (concept === 'prevent') {
          const form = document.getElementById('prevent-demo-form');
          const input = document.getElementById('prevent-input');
          const result = document.getElementById('prevent-result');
          
          form.addEventListener('submit', function(event) {
            if (input.value.trim() === '') {
              event.preventDefault();
              result.innerHTML = '🛑 Form submission prevented! Field was empty.';
              result.style.color = '#e74c3c';
              alert('Please fill in the field before submitting!');
            } else {
              event.preventDefault(); // Prevent actual submission in demo
              result.innerHTML = '✅ Form would submit! Field has content.';
              result.style.color = '#27ae60';
              alert('Form would be submitted successfully!');
            }
          });
        }
        
        if (concept === 'feedback') {
          const input = document.getElementById('feedback-input');
          const result = document.getElementById('feedback-result');
          
          input.addEventListener('input', function() {
            const value = this.value.trim();
            if (value.length === 0) {
              result.innerHTML = 'Start typing an email...';
              result.style.background = '#f8f9ff';
              result.style.color = '#666';
            } else if (!value.includes('@')) {
              result.innerHTML = '❌ Missing @ symbol!';
              result.style.background = 'rgba(231, 76, 60, 0.1)';
              result.style.color = '#e74c3c';
            } else if (!value.includes('.')) {
              result.innerHTML = '⚠️ Missing domain extension (like .com)!';
              result.style.background = 'rgba(255, 193, 7, 0.1)';
              result.style.color = '#ffc107';
            } else {
              result.innerHTML = '✅ Email format looks good!';
              result.style.background = 'rgba(39, 174, 96, 0.1)';
              result.style.color = '#27ae60';
            }
          });
        }
      }, 100);
      
      // Scroll to demo area
      demoArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  
  // Initialize example demo
  const exampleCode = document.getElementById('example-code');
  const examplePreview = document.getElementById('example-preview');
  
  function updateExampleDemo() {
    if (examplePreview) {
      examplePreview.srcdoc = exampleCode.value;
    }
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
        padding: 5px;
      }
      
      .placeholder {
        padding: 5px;
      }
    }
  </style>
  </head>
  <body>
  <div class="placeholder">
    <h2>✏️ Start Creating Your Form Validation!</h2>
    <p>Your form will appear here as you type...</p>
  </div>
  </body>
  </html>`;
    }
  }
  
  taskEditor.addEventListener('input', renderTask);
  renderTask();
  
  function showHint() {
    const hints = [
      "💡 Start with a complete HTML structure including &lt;!DOCTYPE html&gt;, &lt;head&gt;, and &lt;body&gt;",
      "🎯 Your form needs at least 3 different input fields (name, email, message, etc.)",
      "🔍 Use .value to get input content: document.getElementById('name').value",
      "🚫 Use event.preventDefault() to stop submission when validation fails",
      "💬 Show specific error messages: element.innerHTML = 'Name is required!'",
      "✅ Add success styling with CSS classes like .success and .error",
      "⚡ Try real-time validation with input event listeners for better UX",
      "🎨 Style your form with CSS to make it look professional"
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
        line-height: 1.4;
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
  
  function checkAnswer() {
    const code = taskEditor.value.trim();
    
    // Check if code is empty
    if (!code || code.replace(/\s/g, '') === '') {
      showError('🤨', 'Your code is empty!', 'Please create a form with HTML structure, CSS styling, and JavaScript validation.');
      return;
    }
    
    // Check for HTML structure
    const hasHtml = /<html[^>]*>[\s\S]*<\/html>/i.test(code) || /<body[^>]*>[\s\S]*<\/body>/i.test(code);
    const hasStyle = /<style[^>]*>[\s\S]*<\/style>/i.test(code) || /style\s*=\s*["'][^"']*["']/i.test(code);
    const hasForm = /<form[^>]*>[\s\S]*<\/form>/i.test(code);
    
    // Check for required form elements (at least 3 inputs)
    const inputMatches = code.match(/<input[^>]*>/gi) || [];
    const textareaMatches = code.match(/<textarea[^>]*>/gi) || [];
    const totalInputs = inputMatches.length + textareaMatches.length;
    
    // Check for submit button
    const hasSubmitButton = /<button[^>]*type\s*=\s*["'`]submit["'`][^>]*>|<input[^>]*type\s*=\s*["'`]submit["'`][^>]*>/i.test(code) || 
                          /<button[^>]*>[^<]*submit[^<]*<\/button>/i.test(code);
    
    // Check for ID attributes
    const hasIds = /id\s*=\s*["'`][^"'`]+["'`]/i.test(code);
    const idCount = (code.match(/id\s*=\s*["'`][^"'`]+["'`]/gi) || []).length;
    
    // Extract JavaScript content
    let jsContent = code;
    const scriptMatches = code.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
    if (scriptMatches) {
      jsContent = scriptMatches.map(match => {
        const content = match.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        return content ? content[1] : '';
      }).join('\n');
    }
    
    // Check for JavaScript validation elements
    const hasValueAccess = /\.value/i.test(jsContent);
    const valueAccessCount = (jsContent.match(/\.value/gi) || []).length;
    
    // Check for preventDefault usage
    const hasPreventDefault = /preventDefault\s*\(\s*\)/i.test(jsContent);
    
    // Check for form submission handling
    const hasFormSubmission = /addEventListener\s*\(\s*["'`]submit["'`]|onsubmit\s*=/i.test(jsContent);
    
    // Check for validation logic
    const hasValidationLogic = /if\s*\(.*\.value|\.value.*===|\.length|\.includes|\.trim/i.test(jsContent);
    
    // Check for user feedback
    const hasFeedback = /innerHTML\s*=|textContent\s*=|\.style\./i.test(jsContent);
    
    // Check for CSS styling
    const hasFormStyling = /input\s*{|\.error|\.success|\.feedback|border|padding|margin/i.test(code);
    
    let errorMessages = [];
    let successMessages = [];
    let warningMessages = [];
    
    // Validate requirements
    if (!hasHtml) {
      errorMessages.push('Missing complete HTML structure with &lt;html&gt; and &lt;body&gt; tags');
    } else {
      successMessages.push('✅ Has complete HTML structure');
    }
    
    if (!hasForm) {
      errorMessages.push('Missing &lt;form&gt; element');
    } else {
      successMessages.push('✅ Has form element');
    }
    
    if (totalInputs < 3) {
      errorMessages.push(`Need at least 3 input fields. Found ${totalInputs} input(s)`);
    } else {
      successMessages.push(`✅ Has ${totalInputs} input field(s)`);
    }
    
    if (!hasSubmitButton) {
      errorMessages.push('Missing submit button');
    } else {
      successMessages.push('✅ Has submit button');
    }
    
    if (!hasIds || idCount < 3) {
      errorMessages.push('Need unique ID attributes for form elements (at least 3)');
    } else {
      successMessages.push(`✅ Has ${idCount} element(s) with ID attributes`);
    }
    
    if (!hasValueAccess) {
      errorMessages.push('Missing .value usage to get input content');
    } else {
      successMessages.push(`✅ Uses .value (${valueAccessCount} usage(s))`);
    }
    
    if (!hasFormSubmission) {
      errorMessages.push('Missing form submission handler (addEventListener or onsubmit)');
    } else {
      successMessages.push('✅ Has form submission handler');
    }
    
    if (!hasPreventDefault) {
      errorMessages.push('Missing event.preventDefault() to control form submission');
    } else {
      successMessages.push('✅ Uses preventDefault()');
    }
    
    if (!hasValidationLogic) {
      errorMessages.push('Missing validation logic (checking input values with conditions)');
    } else {
      successMessages.push('✅ Has validation logic');
    }
    
    if (!hasFeedback) {
      errorMessages.push('Missing user feedback (showing error/success messages)');
    } else {
      successMessages.push('✅ Has user feedback');
    }
    
    if (!hasStyle || !hasFormStyling) {
      warningMessages.push('Consider adding CSS styling to make your form look professional');
    } else {
      successMessages.push('✅ Has CSS styling');
    }
    
    // Display feedback
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('nextLessonBtn');
    const steps = document.querySelectorAll('.step');
    
    if (errorMessages.length === 0) {
      feedback.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 15px;">
          <span style="font-size: 2em;">🎉</span>
          <div style="flex: 1;">
            <div style="font-size: 1.2em; margin-bottom: 8px;">
              <strong>Outstanding Form Validation!</strong>
            </div>
            <div style="margin-bottom: 12px;">
              ${successMessages.join('<br>')}
            </div>
            ${warningMessages.length > 0 ? `
              <div style="margin-bottom: 12px; opacity: 0.9;">
                <strong>💡 Enhancement suggestions:</strong><br>
                ${warningMessages.join('<br>')}
              </div>
            ` : ''}
            <div style="opacity: 0.9; background: rgba(39,174,96,0.1); padding: 8px 12px; border-radius: 6px; font-size: 0.95em;">
              🚀 Excellent work! You've mastered form validation fundamentals and created a professional contact form.
            </div>
          </div>
        </div>
      `;
      feedback.className = 'feedback success';
      
      // Enable next lesson button
      nextBtn.disabled = false;
      nextBtn.style.opacity = '1';
      nextBtn.style.cursor = 'pointer';
      nextBtn.style.animation = 'pulse 1.5s infinite';
      
      // Update progress
      steps[1].classList.add('active');
      steps[2].classList.add('active');
      
      // Store completion
      localStorage.setItem('partB_lesson13_remake_complete', 'true');
      markCurrentLessonComplete();
      
      // Celebration animation
      createCelebration();
    } else {
      feedback.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 15px;">
          <span style="font-size: 1.8em;">🤔</span>
          <div style="flex: 1;">
            <div style="font-size: 1.1em; margin-bottom: 10px;">
              <strong>Let's fix these form validation issues:</strong>
            </div>
            <div style="margin-bottom: 12px;">
              <strong>Issues to resolve:</strong>
              <ul style="margin: 6px 0; padding-left: 20px; list-style-type: none;">
                ${errorMessages.map(error => `<li style="margin: 4px 0; padding: 6px 8px; border-left: 3px solid #e74c3c; background: rgba(231,76,60,0.1); border-radius: 4px;">❌ ${error}</li>`).join('')}
              </ul>
            </div>
            ${successMessages.length > 0 ? `
              <div style="margin-bottom: 12px;">
                <strong>What's working well:</strong><br>
                ${successMessages.join('<br>')}
              </div>
            ` : ''}
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 10px; font-size: 0.95em;">
              <strong>💡 Remember:</strong> You need a complete form with validation logic, preventDefault(), and user feedback
            </div>
          </div>
        </div>
      `;
      feedback.className = 'feedback error';
      
      // Update progress to practice step
      steps[1].classList.add('active');
      steps[2].classList.remove('active');
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
  
  // Initialize everything
  document.addEventListener('DOMContentLoaded', function() {
    initValidationPlayground();
    updateExampleDemo();
    
    // Check if lesson is already completed
    if (localStorage.getItem('lesson13_remake_complete') === 'true') {
      const nextBtn = document.getElementById('nextLessonBtn');
      nextBtn.disabled = false;
      nextBtn.style.opacity = '1';
      nextBtn.style.cursor = 'pointer';
    }
  });
  
  // Next lesson functionality
  document.getElementById('nextLessonBtn').addEventListener('click', function() {
    if (!this.disabled) {
      window.location.href = '/2. partB/lesson14/lesson14_remake.html';
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

  // Use consistent localStorage key
const LESSON_STORAGE_KEY = 'partB_lesson13_remake_complete';

/**
 * Check if lesson was previously completed and restore UI state
 * This runs when the page loads to handle returning users
 */
// Fixed version of the completion check function
function checkAndRestoreCompletion() {
    setTimeout(() => {
        try {
            const isCompleted = localStorage.getItem('partB_lesson13_remake_complete') === 'true';

            if (isCompleted) {
                const feedback = document.getElementById('feedback');
                const nextBtn = document.getElementById('nextLessonBtn');
                // Fixed: Remove the steps query since it doesn't exist in your HTML

                // Fixed: Remove the steps.length condition
                if (feedback && nextBtn) {
                    // Show completion message
                    feedback.innerHTML = `
                        <div class="feedback success" style="color: #27ae60; background: linear-gradient(135deg, #d5f4e6, #d1eddb); border: 2px solid #27ae60; padding: 20px; border-radius: 15px;">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="font-size: 2em;">✅</span>
                                <div>
                                    <div style="font-size: 1.2em; margin-bottom: 8px;">
                                        <strong>Lesson Already Completed!</strong>
                                    </div>
                                    <div style="opacity: 0.9; line-height: 1.5;">
                                        Great work! You've mastered events and listeners. You can continue to the next lesson or practice more here.
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    // Enable next lesson button
                    nextBtn.disabled = false;
                    nextBtn.style.opacity = '1';
                    nextBtn.style.cursor = 'pointer';
                    
                    // Update all requirement items to completed
                    const requirementItems = document.querySelectorAll('.requirement-item');
                    requirementItems.forEach(item => {
                        item.classList.add('completed');
                    });
                    
                    // Set progress to 100%
                    const progressFill = document.getElementById('progress-fill');
                    if (progressFill) {
                        progressFill.style.width = '100%';
                    }
                    
                    // Update completion status
                    completionStatus = {
                        html: true,
                        ids: true,
                        listeners: true,
                        click: true,
                        hover: true
                    };

                } else {

                }
            }
        } catch (e) {

        }
    }, 100);
}

// Also fix the initialization to be more reliable
document.addEventListener('DOMContentLoaded', function() {
    
    
    // Check completion after all other initialization
    checkAndRestoreCompletion();
    
});

// Backup checks to ensure it runs
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndRestoreCompletion);
} else {
    // Document is already loaded
    checkAndRestoreCompletion();
}

// Final backup with longer delay
setTimeout(checkAndRestoreCompletion, 1000);