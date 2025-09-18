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
   const playgroundCode = document.getElementById('playground-code');
   if (playgroundCode) {
       addTabSupportWithNativeUndo(playgroundCode);
   }
   
   const taskEditor = document.getElementById('task-editor');
   if (taskEditor) {
       addTabSupportWithNativeUndo(taskEditor);
   }
 }

// Global variables for tracking
let currentDemo = 'selection';
let lessonCompleted = false;
let buttonClickCount = 0;
let colorIndex = 0;

// Color arrays for demos
const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#e67e22'];
const buttonTexts = ['Click Me!', 'You clicked me!', 'Again!', 'One more!', 'Keep going!', 'Amazing!'];

// Concept info popup
function showConceptInfo(concept) {
   const info = {
      selection: "Element Selection lets you find and grab specific HTML elements using their ID. Think of it like having a remote control for any part of your webpage - you can point to exactly what you want to change!",
      content: "Content Modification allows you to change what's inside HTML elements. You can update text, add HTML tags, or completely replace content. It's like having a magic eraser and pen for your webpage!",
      events: "User Events let your webpage respond to interactions like clicks, hovers, and key presses. It's what makes websites feel alive and responsive to user actions!",
      dynamic: "Dynamic Updates happen instantly without refreshing the page. Your changes appear immediately, creating smooth, app-like experiences that feel fast and responsive!"
   };

   const popup = document.createElement('div');
   popup.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 500px;
            animation: popIn 0.3s ease-out;
            text-align: center;
        ">
            <h3 style="margin: 0 0 15px 0; font-size: 1.5em; color: white; text-decoration: underline;">${concept.charAt(0).toUpperCase() + concept.slice(1)} Selection</h3>
            <p style="margin: 0 0 20px 0; line-height: 1.6; font-size: 1.1em;">${info[concept]}</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: rgba(255,255,255,0.2);
                border: 2px solid white;
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='white'; this.style.color='#667eea'" onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.color='white'">Got it!</button>
        </div>
    `;
   document.body.appendChild(popup);
}

// Demo tab switching
function showDemo(demoType, clickedTab) {
   // Update tabs
   document.querySelectorAll('.demo-tab').forEach(tab => {
      tab.classList.remove('active');
   });

   // Find the clicked tab
   const targetTab = clickedTab || document.querySelector(`[data-demo="${demoType}"]`);
   if (targetTab) {
      targetTab.classList.add('active');
   }

   // Update content
   document.querySelectorAll('.demo-section').forEach(section => {
      section.classList.remove('active');
   });

   const targetSection = document.getElementById(`demo-${demoType}`);
   if (targetSection) {
      targetSection.classList.add('active');
   }

   currentDemo = demoType;
}

// Interactive demo functions
function demoElementSelection() {
   const demoElements = document.querySelectorAll('.demo-element');
   demoElements.forEach((element, index) => {
      setTimeout(() => {
         element.classList.add('selected');
         element.style.animation = 'pulse 0.5s ease-in-out';
      }, index * 200);
   });

   setTimeout(() => {
      updateProgressStep(2);
      showFeedbackMessage('Element selection demonstrated! You can now target any HTML element by its ID.', 'success');
   }, 1000);
}

function demoContentChange() {
   const title = document.getElementById('demo-title-content');
   const paragraph = document.getElementById('demo-paragraph');

   if (title && paragraph) {
      title.innerHTML = '🎉 Content Changed by JavaScript!';
      title.style.color = '#e74c3c';
      paragraph.innerHTML = '<strong>This text was updated using innerHTML!</strong> <em>Pretty cool, right?</em>';
      paragraph.style.color = '#2ecc71';

      showFeedbackMessage('Content successfully changed! innerHTML lets you update any element\'s content.', 'success');
      updateProgressStep(2);
   }
}

function resetContentDemo() {
   const title = document.getElementById('demo-title-content');
   const paragraph = document.getElementById('demo-paragraph');

   if (title && paragraph) {
      title.innerHTML = 'Welcome to My Site';
      title.style.color = '';
      paragraph.innerHTML = 'This is the original text.';
      paragraph.style.color = '';
   }
}

function resetEventDemo() {
   const colorBtn = document.getElementById('color-btn');
   const textBtn = document.getElementById('text-btn');
   const counterBtn = document.getElementById('counter-btn');

   if (colorBtn) {
      colorBtn.style.backgroundColor = '';
      colorBtn.innerHTML = 'Change My Color';
   }
   if (textBtn) {
      textBtn.innerHTML = 'Click Me!';
   }
   if (counterBtn) {
      counterBtn.innerHTML = 'Counter: 0';
      buttonClickCount = 0;
   }
}

// Style demo functions
function changeBoxColor() {
   const box = document.getElementById('style-demo-box');
   if (box) {
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      box.style.backgroundColor = newColor;
      box.style.color = 'white';
   }
}

function changeBoxSize() {
   const box = document.getElementById('style-demo-box');
   if (box) {
      const sizes = ['250px', '300px', '350px', '200px'];
      const newSize = sizes[Math.floor(Math.random() * sizes.length)];
      box.style.width = newSize;
      box.style.height = (parseInt(newSize) * 0.6) + 'px';
      box.style.transform = 'scale(1.1)';
      setTimeout(() => {
         box.style.transform = 'scale(1)';
      }, 300);
   }
}

function changeBoxBorder() {
   const box = document.getElementById('style-demo-box');
   if (box) {
      const borders = [
         '5px solid #e74c3c',
         '3px dashed #3498db',
         '8px dotted #2ecc71',
         '4px double #f39c12',
         '6px groove #9b59b6'
      ];
      const newBorder = borders[Math.floor(Math.random() * borders.length)];
      box.style.border = newBorder;
   }
}

function resetStyleDemo() {
   const box = document.getElementById('style-demo-box');
   if (box) {
      box.style.backgroundColor = '';
      box.style.color = '';
      box.style.width = '';
      box.style.height = '';
      box.style.border = '';
      box.style.transform = '';
   }
}

// Playground functions
function runPlaygroundCode() {
   const codeEditor = document.getElementById('playground-code');
   const output = document.getElementById('playground-output');

   if (!codeEditor || !output) return;

   const code = codeEditor.value;
   const htmlContent = createPlaygroundHTML(code);
   setIframeHTML(output, htmlContent);
}

function clearPlayground() {
   const codeEditor = document.getElementById('playground-code');
   const output = document.getElementById('playground-output');

   if (codeEditor) codeEditor.value = '';
   if (output) {
      try {
         output.srcdoc = '';
      } catch (e) {
         // Silent fallback if srcdoc is not available
      }
   }
}

function loadDOMExample() {
   const exampleCode = `<!DOCTYPE html>
<html>
<head>
    <title>DOM Magic Example</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            padding: 20px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }
        .container {
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        button { 
            padding: 12px 20px; 
            font-size: 16px; 
            margin: 10px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        #magicTitle { 
            font-size: 2.5rem;
            margin: 20px 0;
            transition: all 0.5s ease;
        }
        .fun-btn { background: #ff6b6b; color: white; }
        .color-btn { background: #4ecdc4; color: white; }
        .size-btn { background: #ffe66d; color: #333; }
    </style>
</head>
<body>
    <div class="container">
        <h1 id="magicTitle">âœ¨ DOM Magic Show âœ¨</h1>
        <p id="subtitle">Watch the magic happen!</p>
        
        <button id="changeTextBtn" class="fun-btn">Change Text</button>
        <button id="changeColorBtn" class="color-btn">Change Color</button>
        <button id="changeSizeBtn" class="size-btn">Change Size</button>
        <button id="surpriseBtn">ðŸŽ² Surprise Me!</button>
    </div>

    <script>
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        // Get our elements
        let title = document.getElementById('magicTitle');
        let subtitle = document.getElementById('subtitle');
        
        // Text change magic
        let changeTextBtn = document.getElementById('changeTextBtn');
        if (changeTextBtn) {
            changeTextBtn.onclick = function() {
                const texts = [
                    'DOM Manipulation Rocks!',
                    'JavaScript is Amazing!',
                    'You\\'re Learning Fast!',
                    'Perfect Practice!',
                    'Keep Exploring!'
                ];
                title.innerHTML = texts[Math.floor(Math.random() * texts.length)];
            };
        }
        
        // Color change magic
        let changeColorBtn = document.getElementById('changeColorBtn');
        if (changeColorBtn) {
            changeColorBtn.onclick = function() {
                const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'];
                title.style.color = colors[Math.floor(Math.random() * colors.length)];
            };
        }
        
        // Size change magic
        let changeSizeBtn = document.getElementById('changeSizeBtn');
        if (changeSizeBtn) {
            changeSizeBtn.onclick = function() {
                const sizes = ['1.5rem', '2rem', '2.5rem', '3rem', '3.5rem'];
                title.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];
            };
        }
        
        // Surprise magic
        let surpriseBtn = document.getElementById('surpriseBtn');
        if (surpriseBtn) {
            surpriseBtn.onclick = function() {
                title.style.transform = 'rotate(' + (Math.random() * 20 - 10) + 'deg) scale(' + (0.8 + Math.random() * 0.4) + ')';
                title.style.textShadow = '0 0 20px rgba(255,255,255,0.8)';
                subtitle.innerHTML = 'Magical transformation complete!';
                
                setTimeout(() => {
                    title.style.transform = '';
                    title.style.textShadow = '';
                }, 2000);
            };
        }
    });
</script>
</body>
</html>`;

   const codeEditor = document.getElementById('playground-code');
   if (codeEditor) {
      codeEditor.value = exampleCode;
      runPlaygroundCode();
   }
}

// Task functions
function updateTaskPreview() {
   const taskEditor = document.getElementById('task-editor');
   const output = document.getElementById('task-output');

   if (!taskEditor || !output) return;

   const code = taskEditor.value;
   const htmlContent = createPlaygroundHTML(code);
   setIframeHTML(output, htmlContent);
}

function createPlaygroundHTML(userCode) {
   // If user code looks like it already contains full HTML structure, use it as-is
   if (userCode.includes('<html') || userCode.includes('<HTML')) {
      return userCode;
   }

   // Otherwise, wrap in basic HTML structure
   return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM Practice</title>
    <style>
        body {
            font-family: 'Nunito', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: #f8f9ff;
            color: #333;
        }
        h1, h2, h3 { color: #007BFF; }
        button {
            background: #007BFF;
            color: white;
            border: none;
            padding: 10px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            margin: 5px;
            transition: all 0.3s ease;
        }
        button:hover { background: #0056b3; transform: translateY(-1px); }
    </style>
</head>
<body>
    ${userCode}
</body>
</html>`;
}

function setIframeHTML(iframe, html) {
   if (!iframe) return;

   try {
      if ('srcdoc' in iframe) {
         iframe.srcdoc = html;
         return;
      }

      const doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
      if (doc) {
         doc.open();
         doc.write(html);
         doc.close();
         return;
      }

      iframe.setAttribute('src', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
   } catch (e) {
      try {
         iframe.setAttribute('src', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
      } catch (err) {
         // Silent error handling for iframe rendering issues
      }
   }
}

function showDOMHint() {
   const hints = [
      "Start with basic HTML structure: <html><head><title>...</title></head><body>...</body></html>",
      "Create an element with an ID: <h1 id='myTitle'>Hello World</h1>",
      "Add a button with an ID: <button id='myButton'>Click Me</button>",
      "Use getElementById to select elements: let title = document.getElementById('myTitle');",
      "Add click functionality: button.onclick = function() { ... };",
      "Change content with innerHTML: title.innerHTML = 'New Text!';",
      "Put your JavaScript inside <script></script> tags",
      "Make sure element IDs match what you use in getElementById!"
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
            max-width: 320px;
        ">
            ${randomHint}
        </div>
    `;

   document.body.appendChild(hintPopup);

   setTimeout(() => {
      if (hintPopup.firstElementChild) {
         hintPopup.firstElementChild.style.animation = 'slideOutRight 0.5s ease-out';
      }
      setTimeout(() => hintPopup.remove(), 500);
   }, 6000);
}

// Enhanced checkDOMAnswer function with syntax validation
function checkDOMAnswer() {
   const taskEditor = document.getElementById('task-editor');
   if (!taskEditor) return;

   const code = taskEditor.value.trim();

   if (!code) {
      showFeedback('error', 'Code is Empty!',
         'Please write HTML and JavaScript code to complete the DOM manipulation challenge.<br><br>' +
         '<strong>Need help getting started?</strong><br>' +
         'â€¢ Click the "Need a Hint?" button for tips<br>' +
         'â€¢ Look at the playground examples above<br>' +
         'â€¢ Use the starter template in the text area'
      );
      return;
   }

   let errors = [];
   let warnings = [];
   let successes = [];
   let syntaxErrors = [];

   // Clean code for analysis (but preserve structure for syntax checking)
   const cleanCode = code.replace(/<!--[\s\S]*?-->/g, '');

   // ===== SYNTAX VALIDATION =====
   
   // 1. Check for missing closing HTML tags
   const htmlTagErrors = validateHTMLTags(cleanCode);
   if (htmlTagErrors.length > 0) {
      syntaxErrors.push(...htmlTagErrors);
   }

   // 2. Check for JavaScript syntax issues
   const jsErrors = validateJavaScriptSyntax(cleanCode);
   if (jsErrors.length > 0) {
      syntaxErrors.push(...jsErrors);
   }

   // If there are syntax errors, show them first
   if (syntaxErrors.length > 0) {
      let syntaxMessage = '<strong>Syntax Issues Found:</strong><br><br>';
      syntaxMessage += '<ol class="requirement-list">';
      syntaxErrors.forEach(error => {
         syntaxMessage += `<li>${error}</li>`;
      });
      syntaxMessage += '</ol>';
      syntaxMessage += '<br><strong>Fix these syntax issues first, then check your solution again!</strong>';
      
      showFeedback('error', `${syntaxErrors.length} Syntax Error${syntaxErrors.length > 1 ? 's' : ''}`, syntaxMessage);
      return;
   }

   // ===== EXISTING FUNCTIONAL VALIDATION =====
   
   // Clean code for functional analysis
   const functionalCode = cleanCode.replace(/\/\*[\s\S]*?\*\//g, '');

   // 1. Check for HTML structure
   const hasHTML = /<html[^>]*>/i.test(functionalCode) || /<body[^>]*>/i.test(functionalCode) || (/<h[1-6][^>]*>/i.test(functionalCode) && /<button[^>]*>/i.test(functionalCode));

   if (!hasHTML) {
      errors.push('Missing HTML structure - include HTML elements like headings and buttons');
   } else {
      successes.push('HTML structure detected');
   }

   // 2. Check for heading elements
   const hasHeading = /<h[1-6][^>]*>/i.test(functionalCode);
   if (!hasHeading) {
      errors.push('Missing heading element - include at least one <code>&lt;h1&gt;</code>, <code>&lt;h2&gt;</code>, etc.');
   } else {
      successes.push('Heading element found');
   }

   // 3. Check for button elements
   const hasButton = /<button[^>]*>/i.test(functionalCode);
   if (!hasButton) {
      errors.push('Missing button element - include at least one <code>&lt;button&gt;</code>');
   } else {
      successes.push('Button element found');
   }

   // 4. Check for ID attributes
   const idMatches = functionalCode.match(/id\s*=\s*["'][^"']+["']/gi) || [];
   if (idMatches.length < 2) {
      errors.push(`Need at least 2 elements with ID attributes (found ${idMatches.length})`);
   } else {
      successes.push(`${idMatches.length} elements with ID attributes found`);
   }

   // 5. Extract JavaScript content
   const scriptMatches = functionalCode.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
   let jsContent = '';
   if (scriptMatches) {
      jsContent = scriptMatches.map(match => {
         const content = match.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
         return content ? content[1] : '';
      }).join('\n');
   } else if (!functionalCode.includes('<html') && !functionalCode.includes('<HTML')) {
      jsContent = functionalCode;
   }

   // 6. Check getElementById usage
   const getElementByIdMatches = jsContent.match(/document\.getElementById\s*\(\s*["'][^"']+["']\s*\)/gi) || [];
   if (getElementByIdMatches.length < 2) {
      errors.push(`Need at least 2 <code>getElementById()</code> calls (found ${getElementByIdMatches.length})`);
   } else {
      successes.push(`${getElementByIdMatches.length} getElementById() calls found`);
   }

   // 7. Check innerHTML usage
   const hasInnerHTML = /\.innerHTML\s*=/i.test(jsContent);
   if (!hasInnerHTML) {
      errors.push('Missing innerHTML usage - use <code>element.innerHTML = "..."</code> to change content');
   } else {
      successes.push('innerHTML content modification found');
   }

   // 8. Check button click functionality
   const hasButtonClick = /\.onclick\s*=|addEventListener\s*\(\s*["']click["']/i.test(jsContent);
   if (!hasButtonClick) {
      errors.push('Missing button click functionality - use <code>button.onclick = function() {...}</code>');
   } else {
      successes.push('Button click event handling found');
   }

   // 9. Check for meaningful variable names
   const hasDescriptiveNames = /(?:let|const|var)\s+[a-zA-Z_$][a-zA-Z0-9_$]{3,}\s*=/.test(jsContent);
   if (!hasDescriptiveNames) {
      warnings.push('Consider using descriptive variable names (e.g., "titleElement" instead of "x")');
   } else {
      successes.push('Descriptive variable names used');
   }

   // Display results
   const nextBtn = document.getElementById('next-lesson');

   if (errors.length === 0) {
      let successMessage = '<strong>Excellent work! Your DOM manipulation is working perfectly!</strong><br><br>';

      if (successes.length > 0) {
         successMessage += '<strong>What you implemented successfully:</strong><br>';
         successMessage += '<ul class="feedback-list">';
         successes.forEach(success => {
            successMessage += `<li>${success}</li>`;
         });
         successMessage += '</ul>';
      }

      if (warnings.length > 0) {
         successMessage += '<br><strong>Suggestions for improvement:</strong><br>';
         successMessage += '<ul class="feedback-list">';
         warnings.forEach(warning => {
            successMessage += `<li>${warning}</li>`;
         });
         successMessage += '</ul>';
      }

      successMessage += '<br><strong>You\'ve mastered DOM manipulation! Ready for the next lesson!</strong>';

      showFeedback('success', 'DOM Challenge Completed!', successMessage);

      updateProgressStep(3);
      enableNextLesson();
      createCelebration();

      try {
         if (typeof Storage !== 'undefined') {
            localStorage.setItem('partB_lesson11_remake_complete', 'true');
            markCurrentLessonComplete();
         }
      } catch (e) {
         // Silent error handling for localStorage issues
      }
   } else {
      let errorMessage = `<strong>Please address these ${errors.length} requirement${errors.length > 1 ? 's' : ''}:</strong><br><br>`;

      errorMessage += '<ol class="requirement-list">';
      errors.forEach(error => {
         errorMessage += `<li>${error}</li>`;
      });
      errorMessage += '</ol>';

      if (successes.length > 0) {
         errorMessage += '<br><strong>What\'s working well:</strong><br>';
         errorMessage += '<ul class="feedback-list">';
         successes.forEach(success => {
            errorMessage += `<li>${success}</li>`;
         });
         errorMessage += '</ul>';
      }

      if (warnings.length > 0) {
         errorMessage += '<br><strong>Suggestions:</strong><br>';
         errorMessage += '<ul class="feedback-list">';
         warnings.forEach(warning => {
            errorMessage += `<li>${warning}</li>`;
         });
         errorMessage += '</ul>';
      }

      errorMessage += '<br><strong>Remember:</strong> You need HTML elements with IDs, JavaScript to select them, and button click functionality!<br><br>';
      errorMessage += '<strong>Need help?</strong> Click "Need a Hint?" or look at the examples above.';

      showFeedback('error', `${errors.length} Requirement${errors.length > 1 ? 's' : ''} Missing`, errorMessage);
      updateProgressStep(2);

      if (nextBtn) {
         nextBtn.disabled = true;
         nextBtn.style.opacity = '0.5';
      }
   }
}

// Validate HTML tag matching
function validateHTMLTags(code) {
   const errors = [];
   
   // Define self-closing tags that don't need closing tags
   const selfClosingTags = new Set([
      'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 
      'link', 'meta', 'param', 'source', 'track', 'wbr'
   ]);
   
   // Extract all HTML tags
   const tagPattern = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
   const tags = [];
   let match;
   
   while ((match = tagPattern.exec(code)) !== null) {
      const fullTag = match[0];
      const tagName = match[1].toLowerCase();
      const isClosing = fullTag.startsWith('</');
      const isSelfClosing = fullTag.endsWith('/>') || selfClosingTags.has(tagName);
      
      tags.push({
         name: tagName,
         isClosing: isClosing,
         isSelfClosing: isSelfClosing,
         fullTag: fullTag,
         index: match.index
      });
   }
   
   // Track open tags
   const openTags = [];
   
   for (const tag of tags) {
      if (tag.isClosing) {
         // This is a closing tag
         if (openTags.length === 0) {
            errors.push(`Found closing tag <code>&lt;/${tag.name}&gt;</code> without matching opening tag`);
         } else {
            const lastOpen = openTags[openTags.length - 1];
            if (lastOpen.name === tag.name) {
               openTags.pop(); // Matching pair found
            } else {
               errors.push(`Mismatched tags: <code>&lt;${lastOpen.name}&gt;</code> opened but <code>&lt;/${tag.name}&gt;</code> found instead of <code>&lt;/${lastOpen.name}&gt;</code>`);
            }
         }
      } else if (!tag.isSelfClosing) {
         // This is an opening tag that needs a closing tag
         openTags.push(tag);
      }
   }
   
   // Check for unclosed tags
   for (const openTag of openTags) {
      errors.push(`Missing closing tag <code>&lt;/${openTag.name}&gt;</code> for <code>&lt;${openTag.name}&gt;</code>`);
   }
   
   return errors;
}

// Validate JavaScript syntax
function validateJavaScriptSyntax(code) {
   const errors = [];
   
   // Extract JavaScript content from script tags
   const scriptMatches = code.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
   let jsContent = '';
   
   if (scriptMatches) {
      jsContent = scriptMatches.map(match => {
         const content = match.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
         return content ? content[1] : '';
      }).join('\n');
   } else if (!code.includes('<html') && !code.includes('<HTML')) {
      // If no HTML structure, treat entire code as JavaScript
      jsContent = code;
   }
   
   if (!jsContent.trim()) {
      return errors; // No JavaScript to validate
   }
   
   // Check for common semicolon issues
   const semicolonErrors = checkSemicolonUsage(jsContent);
   if (semicolonErrors.length > 0) {
      errors.push(...semicolonErrors);
   }
   
   // Check for bracket matching
   const bracketErrors = checkBracketMatching(jsContent);
   if (bracketErrors.length > 0) {
      errors.push(...bracketErrors);
   }
   
   // Check for quote matching
   const quoteErrors = checkQuoteMatching(jsContent);
   if (quoteErrors.length > 0) {
      errors.push(...quoteErrors);
   }
   
   // Check for function syntax
   const functionErrors = checkFunctionSyntax(jsContent);
   if (functionErrors.length > 0) {
      errors.push(...functionErrors);
   }
   
   return errors;
}

// Fixed semicolon validation that handles multi-line statements
function checkSemicolonUsage(jsCode) {
   const errors = [];
   
   // Remove comments first to avoid false positives
   let cleanCode = jsCode.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
   
   // Split into statements, not just lines
   const statements = parseJavaScriptStatements(cleanCode);
   
   for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      
      // Skip empty statements
      if (!statement) continue;
      
      // Skip statements that don't need semicolons
      if (shouldSkipSemicolonCheck(statement)) continue;
      
      // Check if this statement should end with a semicolon
      if (shouldHaveSemicolon(statement)) {
         if (!statement.endsWith(';')) {
            // Get the first line of the statement for error reporting
            const firstLine = statement.split('\n')[0].trim();
            errors.push(`Missing semicolon after statement: <code>${firstLine}${firstLine !== statement ? '...' : ''}</code>`);
         }
      }
   }
   
   return errors;
}

// Parse JavaScript into logical statements (handles multi-line constructs)
function parseJavaScriptStatements(code) {
   const statements = [];
   let current = '';
   let braceLevel = 0;
   let bracketLevel = 0;
   let parenLevel = 0;
   let inString = false;
   let stringChar = '';
   
   for (let i = 0; i < code.length; i++) {
      const char = code[i];
      const prevChar = i > 0 ? code[i - 1] : '';
      
      // Handle strings
      if ((char === '"' || char === "'") && prevChar !== '\\') {
         if (!inString) {
            inString = true;
            stringChar = char;
         } else if (char === stringChar) {
            inString = false;
            stringChar = '';
         }
      }
      
      if (inString) {
         current += char;
         continue;
      }
      
      // Track nesting levels
      if (char === '{') braceLevel++;
      else if (char === '}') braceLevel--;
      else if (char === '[') bracketLevel++;
      else if (char === ']') bracketLevel--;
      else if (char === '(') parenLevel++;
      else if (char === ')') parenLevel--;
      
      current += char;
      
      // If we hit a semicolon at the top level, that's the end of a statement
      if (char === ';' && braceLevel === 0 && bracketLevel === 0 && parenLevel === 0) {
         statements.push(current.trim());
         current = '';
      }
      // Also split on closing braces at top level (for function declarations, etc.)
      else if (char === '}' && braceLevel === 0 && bracketLevel === 0 && parenLevel === 0) {
         statements.push(current.trim());
         current = '';
      }
   }
   
   // Add any remaining content
   if (current.trim()) {
      statements.push(current.trim());
   }
   
   return statements;
}

// Check if a statement should be skipped for semicolon validation
function shouldSkipSemicolonCheck(statement) {
   const trimmed = statement.trim();
   
   // Skip empty statements
   if (!trimmed) return true;
   
   // Skip control structures
   if (/^(if|else|for|while|do|switch|try|catch|finally)\s*[\s\(]/.test(trimmed)) return true;
   
   // Skip function declarations
   if (/^function\s+\w+/.test(trimmed)) return true;
   
   // Skip statements that end with braces (already complete)
   if (trimmed.endsWith('}')) return true;
   
   // Skip block statements
   if (trimmed.endsWith('{')) return true;
   
   // Skip comments
   if (trimmed.startsWith('//') || trimmed.startsWith('/*')) return true;
   
   return false;
}

// Check if a statement should have a semicolon
function shouldHaveSemicolon(statement) {
   const trimmed = statement.trim();
   
   // Variable declarations
   if (/^(let|const|var)\s+/.test(trimmed)) return true;
   
   // Assignments
   if (/^\w+.*=/.test(trimmed) && !trimmed.includes('function')) return true;
   
   // Function calls
   if (/\w+\s*\([^)]*\)\s*$/.test(trimmed)) return true;
   
   // Method calls
   if (/\.\w+\s*\([^)]*\)\s*$/.test(trimmed)) return true;
   
   // Property assignments
   if (/\.\w+\s*=/.test(trimmed)) return true;
   
   // Return statements
   if (/^return(\s|$)/.test(trimmed)) return true;
   
   // Break and continue
   if (/^(break|continue)(\s|$)/.test(trimmed)) return true;
   
   // Throw statements
   if (/^throw\s/.test(trimmed)) return true;
   
   return false;
}

// Check bracket matching in JavaScript
function checkBracketMatching(jsCode) {
   const errors = [];
   const brackets = [];
   const bracketPairs = { '(': ')', '[': ']', '{': '}' };
   const openBrackets = Object.keys(bracketPairs);
   const closeBrackets = Object.values(bracketPairs);
   
   for (let i = 0; i < jsCode.length; i++) {
      const char = jsCode[i];
      
      if (openBrackets.includes(char)) {
         brackets.push({ type: char, index: i });
      } else if (closeBrackets.includes(char)) {
         if (brackets.length === 0) {
            errors.push(`Unexpected closing bracket <code>${char}</code> at position ${i + 1}`);
         } else {
            const lastBracket = brackets[brackets.length - 1];
            if (bracketPairs[lastBracket.type] === char) {
               brackets.pop();
            } else {
               errors.push(`Mismatched brackets: <code>${lastBracket.type}</code> opened but <code>${char}</code> found`);
            }
         }
      }
   }
   
   for (const bracket of brackets) {
      errors.push(`Unclosed <code>${bracket.type}</code> bracket`);
   }
   
   return errors;
}

// Check quote matching in JavaScript
function checkQuoteMatching(jsCode) {
   const errors = [];
   let inSingleQuote = false;
   let inDoubleQuote = false;
   let inComment = false;
   
   for (let i = 0; i < jsCode.length; i++) {
      const char = jsCode[i];
      const prevChar = i > 0 ? jsCode[i - 1] : '';
      const nextChar = i < jsCode.length - 1 ? jsCode[i + 1] : '';
      
      // Skip if in comment
      if (char === '/' && nextChar === '/') {
         inComment = true;
         continue;
      }
      
      if (char === '\n') {
         inComment = false;
         continue;
      }
      
      if (inComment) continue;
      
      // Handle quotes
      if (char === '"' && !inSingleQuote && prevChar !== '\\') {
         inDoubleQuote = !inDoubleQuote;
      } else if (char === "'" && !inDoubleQuote && prevChar !== '\\') {
         inSingleQuote = !inSingleQuote;
      }
   }
   
   if (inSingleQuote) {
      errors.push("Unclosed single quote (<code>'</code>) in JavaScript");
   }
   
   if (inDoubleQuote) {
      errors.push('Unclosed double quote (<code>"</code>) in JavaScript');
   }
   
   return errors;
}

// Check function syntax
function checkFunctionSyntax(jsCode) {
   const errors = [];
   
   // Check for function declarations/expressions
   const functionPattern = /function\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(/g;
   const anonymousFunctionPattern = /function\s*\(/g;
   const arrowFunctionPattern = /=>\s*{/g;
   
   let match;
   
   // Check function declarations
   while ((match = functionPattern.exec(jsCode)) !== null) {
      const startIndex = match.index;
      const remaining = jsCode.substring(startIndex);
      
      // Look for opening brace
      const braceIndex = remaining.indexOf('{');
      if (braceIndex === -1) {
         errors.push(`Function declaration missing opening brace <code>{</code>`);
      }
   }
   
   // Check for incomplete function assignments
   const assignmentPattern = /\.onclick\s*=\s*function\s*\(\s*\)/g;
   while ((match = assignmentPattern.exec(jsCode)) !== null) {
      const startIndex = match.index + match[0].length;
      const remaining = jsCode.substring(startIndex).trim();
      
      if (!remaining.startsWith('{')) {
         errors.push(`Function assignment missing opening brace <code>{</code> after <code>function()</code>`);
      }
   }
   
   return errors;
}

function showFeedback(type, title, message) {
   const feedback = document.getElementById('feedback');
   if (!feedback) return;

   // Clean up message formatting
   const cleanMessage = message.replace(/\n/g, '<br>');

   feedback.className = `feedback ${type}`;
   feedback.innerHTML = `
        <div class="feedback-title">${title}</div>
        <div class="feedback-content">${cleanMessage}</div>
    `;

   // Smooth scroll to feedback
   feedback.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
   });
}

function showFeedbackMessage(message, type = 'info') {
   const popup = document.createElement('div');
   popup.innerHTML = `
        <div style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#007BFF'};
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            max-width: 300px;
            font-weight: 600;
        ">
            ${message}
        </div>
    `;

   document.body.appendChild(popup);

   setTimeout(() => {
      if (popup.firstElementChild) {
         popup.firstElementChild.style.animation = 'slideOutRight 0.5s ease-out';
      }
      setTimeout(() => popup.remove(), 500);
   }, 4000);
}

function updateProgressStep(step) {
   const steps = document.querySelectorAll('.step');
   steps.forEach((s, index) => {
      if (index < step) {
         s.classList.add('active');
      } else {
         s.classList.remove('active');
      }
   });
}

function enableNextLesson() {
   const nextBtn = document.getElementById('next-lesson');
   if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.style.opacity = '1';
      nextBtn.style.cursor = 'pointer';
      nextBtn.style.animation = 'pulse 1.5s infinite';
      lessonCompleted = true;
   }
}

function nextLesson() {
   const nextBtn = document.getElementById('next-lesson');
   if (nextBtn && !nextBtn.disabled) {
      window.location.href = '/2. partB/lesson12_remake.html';
   }
}

function createCelebration() {
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

// Setup demo tabs
function setupDemoTabs() {
   const demoTabs = document.querySelector('.demo-tabs');
   if (demoTabs) {
      demoTabs.addEventListener('click', function (e) {
         if (e.target.classList.contains('demo-tab')) {
            const demoType = e.target.getAttribute('data-demo');
            if (demoType) {
               showDemo(demoType, e.target);
            }
         }
      });
   }
}

// Setup interactive demo buttons
function setupInteractiveDemos() {
   // Color changing button
   const colorBtn = document.getElementById('color-btn');
   if (colorBtn) {
      colorBtn.onclick = function () {
         colorIndex = (colorIndex + 1) % colors.length;
         this.style.backgroundColor = colors[colorIndex];
      };
   }

   // Text changing button
   const textBtn = document.getElementById('text-btn');
   if (textBtn) {
      let textIndex = 0;
      textBtn.onclick = function () {
         textIndex = (textIndex + 1) % buttonTexts.length;
         this.innerHTML = buttonTexts[textIndex];
      };
   }

   // Counter button
   const counterBtn = document.getElementById('counter-btn');
   if (counterBtn) {
      counterBtn.onclick = function () {
         buttonClickCount++;
         this.innerHTML = `Counter: ${buttonClickCount}`;
      };
   }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
   try {
      // Check if lesson is already completed
      if (typeof Storage !== 'undefined' && localStorage.getItem('partB_lesson11_remake_complete') === 'true') {
         const nextBtn = document.getElementById('next-lesson');
         if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
            lessonCompleted = true;
         }
      }
   } catch (e) {
      // Silent error handling for localStorage issues
   }

   // Setup demo tabs
   setupDemoTabs();

   // Setup interactive demo buttons
   setupInteractiveDemos();

   initHybridSystem();

   // Update task editor on input
   const taskEditor = document.getElementById('task-editor');
   if (taskEditor) {
      taskEditor.addEventListener('input', updateTaskPreview);
      updateTaskPreview();
   }

   // Auto-update playground
   const playgroundEditor = document.getElementById('playground-code');
   if (playgroundEditor) {
      playgroundEditor.addEventListener('input', function () {
         clearTimeout(this.autoRunTimer);
         this.autoRunTimer = setTimeout(() => {
            runPlaygroundCode();
         }, 1500);
      });
   }
});

// Change the color on DOM Manipulation in Action - Try It Live! -> Click Events Tab
function getRandomColor() {
   const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#e67e22'];
   return colors[Math.floor(Math.random() * colors.length)];
}

// Use consistent localStorage key
const LESSON_STORAGE_KEY = 'partB_lesson11_remake_complete';

/**
 * Check if lesson was previously completed and restore UI state
 * This runs when the page loads to handle returning users
 */
function checkAndRestoreCompletion() {
    // Wait a bit to ensure DOM is ready
    setTimeout(() => {
        try {
            const isCompleted = localStorage.getItem(LESSON_STORAGE_KEY) === 'true';
            
            if (isCompleted) {
                const feedback = document.getElementById('feedback');
                const nextBtn = document.getElementById('next-lesson'); // Fixed ID
                const steps = document.querySelectorAll('.step');
                
                if (feedback && nextBtn && steps.length > 0) {
                    // Show completion message
                    feedback.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <span style="font-size: 1.5em;">âœ…</span>
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
                    nextBtn.style.animation = 'pulse 1.5s infinite';
                    
                    // Update progress tracker
                    updateProgressStep(3);
                }
            }
        } catch (e) {
            // Silent error handling for localStorage issues
        }
    }, 100); // Wait 100ms for DOM to be ready
}

// Update the initialization code
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Check if lesson is already completed with consistent key
        if (typeof Storage !== 'undefined' && localStorage.getItem(LESSON_STORAGE_KEY) === 'true') {
            const nextBtn = document.getElementById('next-lesson'); // Fixed ID
            if (nextBtn) {
                nextBtn.disabled = false;
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
                nextBtn.style.animation = 'pulse 1.5s infinite';
                lessonCompleted = true;
            }
        }
    } catch (e) {
        // Silent error handling for localStorage issues
    }
});

// Multiple ways to ensure this runs after everything is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndRestoreCompletion);
} else {
    checkAndRestoreCompletion();
}

// Also run after a small delay as backup
setTimeout(checkAndRestoreCompletion, 500);