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
        console.log('✅ Hybrid system: Tab support + native undo/paste');
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

// Enhanced Lesson 12 JavaScript - Interactive Events & Listeners Learning

// Initialize task elements
const taskEditor = document.getElementById('code-editor');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next-lesson');
const progressFill = document.getElementById('progress-fill');

// Track completion status
let completionStatus = {
    html: false,
    ids: false,
    listeners: false,
    click: false,
    hover: false
};

// Initialize interactive demonstrations when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveDemos();
    initializeLearningExamples();
    initializePracticalExamples();
    
    // Check if lesson is already completed
    if (localStorage.getItem('lesson12_remake_complete') === 'true') {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
    }
    
    // Initialize code editor with better template
    if (!taskEditor.value.trim()) {
        setDefaultTemplate();
    }
});

// Initialize the interactive demo in the intro section
function initializeInteractiveDemos() {
    const demoColorBtn = document.getElementById('demo-color-btn');
    const demoHoverBox = document.getElementById('demo-hover-box');
    const demoFeedback = document.getElementById('demo-feedback');
    
    if (demoColorBtn && demoHoverBox && demoFeedback) {
        // Demo button click event
        demoColorBtn.addEventListener('click', function() {
            const colors = ['#ffecb3', '#e1f5fe', '#f3e5f5', '#e8f5e8', '#fce4ec'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.backgroundColor = randomColor;
            demoFeedback.innerHTML = '🎉 You changed the background color! Events in action!';
            demoFeedback.style.backgroundColor = '#4caf50';
            
            // Add a sparkle effect
            createSparkleEffect(demoColorBtn);
        });
        
        // Demo hover events
        demoHoverBox.addEventListener('mouseover', function() {
            this.style.background = '#fff3e0';
            this.style.borderColor = '#ff9800';
            this.style.color = '#e65100';
            this.innerHTML = '✨ Hover magic activated!';
            demoFeedback.innerHTML = '👆 Perfect! You triggered a hover event!';
            demoFeedback.style.backgroundColor = '#ff9800';
        });
        
        demoHoverBox.addEventListener('mouseout', function() {
            this.style.background = '#e3f2fd';
            this.style.borderColor = '#2196f3';
            this.style.color = '#1976d2';
            this.innerHTML = 'Hover Over Me!';
            demoFeedback.innerHTML = '💫 Hover events make websites feel alive!';
            demoFeedback.style.backgroundColor = '#2196f3';
        });
    }
}

// Initialize learning examples in each step
function initializeLearningExamples() {
    // Step 1: addEventListener example
    const step1Btn = document.getElementById('step1-btn');
    if (step1Btn) {
        step1Btn.addEventListener('click', function() {
            const colors = ['lightblue', 'lightgreen', 'lightyellow', 'lightpink', 'lightcoral'];
            const currentColor = this.style.backgroundColor;
            const availableColors = colors.filter(color => color !== currentColor);
            const newColor = availableColors[Math.floor(Math.random() * availableColors.length)];
            
            this.style.backgroundColor = newColor;
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // Step 2: Click demo buttons
    const colorDemoBtn = document.getElementById('color-demo-btn');
    const textDemoBtn = document.getElementById('text-demo-btn');
    const sizeDemoBtn = document.getElementById('size-demo-btn');
    const demoTarget = document.getElementById('demo-target');
    
    if (colorDemoBtn && textDemoBtn && sizeDemoBtn && demoTarget) {
        // Store original state
        const originalState = {
            backgroundColor: demoTarget.style.backgroundColor || '',
            innerHTML: demoTarget.innerHTML,
            fontWeight: demoTarget.style.fontWeight || '',
            transform: demoTarget.style.transform || 'scale(1)'
        };
    
        colorDemoBtn.addEventListener('click', function() {
            const colors = ['#ffcdd2', '#f8bbd9', '#e1bee7', '#d1c4e9', '#c5cae9'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            demoTarget.style.backgroundColor = randomColor;
            demoTarget.innerHTML = '🎨 My background color changed!';
            
            // Reset after 5 seconds
            setTimeout(() => {
                demoTarget.style.backgroundColor = originalState.backgroundColor;
                demoTarget.innerHTML = originalState.innerHTML;
                demoTarget.style.fontWeight = originalState.fontWeight;
            }, 5000);
        });
        
        textDemoBtn.addEventListener('click', function() {
            const messages = [
                '📝 Text changed successfully!',
                '✨ Dynamic content update!',
                '🔄 JavaScript in action!',
                '💫 Interactive web magic!'
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            demoTarget.innerHTML = randomMessage;
            demoTarget.style.fontWeight = 'bold';
            
            // Reset after 5 seconds
            setTimeout(() => {
                demoTarget.innerHTML = originalState.innerHTML;
                demoTarget.style.fontWeight = originalState.fontWeight;
                demoTarget.style.backgroundColor = originalState.backgroundColor;
            }, 5000);
        });
        
        sizeDemoBtn.addEventListener('click', function() {
            const currentScale = demoTarget.style.transform || 'scale(1)';
            const isScaled = currentScale.includes('1.2');
            
            if (isScaled) {
                demoTarget.style.transform = 'scale(1)';
                demoTarget.innerHTML = '📏 Back to normal size!';
            } else {
                demoTarget.style.transform = 'scale(1.2)';
                demoTarget.innerHTML = '📈 I grew bigger!';
            }
            
            // Reset after 5 seconds
            setTimeout(() => {
                demoTarget.style.transform = originalState.transform;
                demoTarget.innerHTML = originalState.innerHTML;
                demoTarget.style.fontWeight = originalState.fontWeight;
                demoTarget.style.backgroundColor = originalState.backgroundColor;
            }, 3000);
        });
    }
    
    // Step 3: Hover cards
    const hoverCards = ['hover-card-1', 'hover-card-2', 'hover-card-3'];
    hoverCards.forEach((cardId, index) => {
        const card = document.getElementById(cardId);
        if (card) {
            const colors = ['#e3f2fd', '#f3e5f5', '#e8f5e8'];
            const hoverColors = ['#1976d2', '#7b1fa2', '#388e3c'];
            
            card.addEventListener('mouseover', function() {
                this.style.backgroundColor = colors[index];
                this.style.borderColor = hoverColors[index];
                this.style.color = hoverColors[index];
                this.querySelector('p').innerHTML = 'Hovering! 🎯';
            });
            
            card.addEventListener('mouseout', function() {
                this.style.backgroundColor = '';
                this.style.borderColor = '#dde7ff';
                this.style.color = '';
                this.querySelector('p').innerHTML = index === 0 ? 'Watch me change!' : 
                                                  index === 1 ? "I'm different!" : 'Try me too!';
            });
        }
    });
    
    // Step 4: Multi-event demo
    const multiDemoBox = document.getElementById('multi-demo-box');
    const eventLog = document.getElementById('event-log');
    
    if (multiDemoBox && eventLog) {
        let eventCount = 0;
        
        multiDemoBox.addEventListener('click', function() {
            eventCount++;
            const colors = ['#e57373', '#f06292', '#ba68c8', '#9575cd'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.borderColor = randomColor;
            eventLog.innerHTML = `Click event #${eventCount} detected! Border color changed.`;
        });
        
        multiDemoBox.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 12px 30px rgba(33, 150, 243, 0.4)';
            eventLog.innerHTML = 'Mouseover event detected! Element scaled and glowing.';
        });
        
        multiDemoBox.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
            eventLog.innerHTML = 'Mouseout event detected! Effects removed.';
        });
        
        multiDemoBox.addEventListener('dblclick', function() {
            this.style.borderColor = '#dde7ff';
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
            eventLog.innerHTML = 'Double-click event detected! Everything reset!';
        });
    }
}

// Initialize practical examples
function initializePracticalExamples() {
    const miniDemoBtns = document.querySelectorAll('.mini-demo-btn');
    const miniDemoArea = document.getElementById('mini-demo-area');
    
    if (miniDemoBtns && miniDemoArea) {
        miniDemoBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const demoType = this.getAttribute('data-demo');
                showMiniDemo(demoType, miniDemoArea);
            });
        });
    }
}

// Show mini demo based on type
function showMiniDemo(type, container) {
    container.innerHTML = '';
    container.classList.add('active');
    
    let demoHTML = '';
    
    switch(type) {
        case 'shopping':
            demoHTML = `
                <h4>🛒 E-commerce Demo</h4>
                <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;" class="e-comm">
                    <div style="border: 2px solid #ddd; padding: 15px; border-radius: 10px; text-align: center;">
                        <div style="width: 80px; height: 80px; background: #f0f0f0; margin: 0 auto 10px; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 2rem;">📱</div>
                        <p>Product Image</p>
                        <button id="cart-btn" style="background: #4caf50; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">Add to Cart</button>
                    </div>
                    <div id="cart-status" style="padding: 15px; background: #f0f8ff; border-radius: 10px; flex: 1; min-width: 200px;">
                        <p>Hover over the product image and click the button!</p>
                    </div>
                </div>
            `;
            break;
            
        case 'social':
            demoHTML = `
                <h4>📱 Social Media Demo</h4>
                <div style="border: 2px solid #ddd; padding: 20px; border-radius: 10px; max-width: 400px; margin: 0 auto;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <div style="width: 40px; height: 40px; background: #3498db; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">U</div>
                        <div>
                            <div style="font-weight: bold;">User Post</div>
                            <div style="color: #666; font-size: 0.8rem;">2 hours ago</div>
                        </div>
                    </div>
                    <p>This is an example social media post with interactive elements!</p>
                    <div style="display: flex; gap: 15px; margin-top: 15px;" class="social-med">
                        <button id="like-btn" style="background: none; border: none; cursor: pointer; padding: 5px 10px; border-radius: 20px; transition: all 0.3s;">❤️ <span id="like-count">0</span></button>
                        <button id="comment-btn" style="background: none; border: none; cursor: pointer; padding: 5px 10px; border-radius: 20px;">💬 Comment</button>
                    </div>
                    <div id="comment-box" style="display: none; margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                        <input type="text" placeholder="Write a comment..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                </div>
            `;
            break;
            
        case 'game':
            demoHTML = `
                <h4>🎮 Simple Game Demo</h4>
                <div style="text-align: center;" class="game-dem">
                    <div id="game-area" style="width: 300px; height: 200px; border: 2px solid #333; margin: 0 auto 15px; position: relative; background: #e8f5e8; border-radius: 10px; overflow: hidden;">
                        <div id="player" style="width: 30px; height: 30px; background: #3498db; border-radius: 50%; position: absolute; top: 85px; left: 20px; transition: all 0.3s; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">😊</div>
                        <div id="target" style="width: 25px; height: 25px; background: #e74c3c; border-radius: 50%; position: absolute; top: 87px; right: 20px;">🎯</div>
                    </div>
                    <p>Click anywhere in the game area to move the player!</p>
                    <p id="game-status">Click to play!</p>
                </div>
            `;
            break;
            
        case 'form':
            demoHTML = `
                <h4>📋 Form Validation Demo</h4>
                <div style="max-width: 400px; margin: 0 auto;">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Email:</label>
                        <input type="email" id="demo-email" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 5px;" placeholder="Enter your email">
                        <div id="email-feedback" style="margin-top: 5px; font-size: 0.8rem;"></div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Password:</label>
                        <input type="password" id="demo-password" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 5px;" placeholder="Enter password">
                        <div id="password-feedback" style="margin-top: 5px; font-size: 0.8rem;"></div>
                    </div>
                    <button id="demo-submit" style="width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;" disabled>Submit</button>
                </div>
            `;
            break;
    }
    
    container.innerHTML = demoHTML;
    
    // Add specific event listeners for each demo
    setTimeout(() => {
        addMiniDemoListeners(type);
    }, 100);
}

// Add event listeners for mini demos
function addMiniDemoListeners(type) {
    switch(type) {
        case 'shopping':
            const cartBtn = document.getElementById('cart-btn');
            const cartStatus = document.getElementById('cart-status');
            // Fix: More reliable way to select the product image
            const productImg = document.querySelector('#mini-demo-area .demo-area div[style*="width: 80px"]') || 
                              cartBtn?.closest('div').querySelector('div[style*="width: 80px"]') ||
                              cartBtn?.parentElement.querySelector('div');
            
            if (cartBtn && cartStatus) {
                // Add hover effects to product image if found
                if (productImg) {
                    productImg.addEventListener('mouseover', function() {
                        this.style.transform = 'scale(1.1)';
                        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                        this.style.transition = 'all 0.3s ease';
                        // Update status to show hover is working
                        cartStatus.innerHTML = '<p style="color: #007bff; font-weight: bold;">📱 Hovering over product! Try clicking "Add to Cart"</p>';
                    });
                    
                    productImg.addEventListener('mouseout', function() {
                        this.style.transform = 'scale(1)';
                        this.style.boxShadow = 'none';
                        // Reset status
                        cartStatus.innerHTML = '<p>Hover over the product image and click the button!</p>';
                    });
                } else {
                    // If product image isn't found, update the status to inform user
                    cartStatus.innerHTML = '<p style="color: #856404;">⚠️ Product image not found for hover effects, but cart button works!</p>';
                }
                
                cartBtn.addEventListener('click', function() {
                    cartStatus.innerHTML = '<p style="color: #4caf50; font-weight: bold;">✅ Item added to cart! Event listeners made this possible.</p>';
                    this.style.background = '#45a049';
                    this.innerHTML = 'Added!';
                    
                    // Add a small celebration effect
                    this.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 200);
                    
                    setTimeout(() => {
                        this.innerHTML = 'Add to Cart';
                        this.style.background = '#4caf50';
                        cartStatus.innerHTML = '<p>Click "Add to Cart" again to test the interaction!</p>';
                    }, 2000);
                });
            }
            break;
            
        case 'social':
            const likeBtn = document.getElementById('like-btn');
            const likeCount = document.getElementById('like-count');
            const commentBtn = document.getElementById('comment-btn');
            const commentBox = document.getElementById('comment-box');
            
            if (likeBtn && likeCount) {
                let likes = 0;
                let isLiked = false;
                
                likeBtn.addEventListener('click', function() {
                    if (!isLiked) {
                        likes++;
                        this.style.background = '#ffebee';
                        this.style.color = '#e91e63';
                        isLiked = true;
                    } else {
                        likes--;
                        this.style.background = 'none';
                        this.style.color = 'inherit';
                        isLiked = false;
                    }
                    likeCount.textContent = likes;
                });
            }
            
            if (commentBtn && commentBox) {
                let commentBoxVisible = false;
                
                commentBtn.addEventListener('click', function() {
                    if (!commentBoxVisible) {
                        commentBox.style.display = 'block';
                        this.style.background = '#e3f2fd';
                        this.style.color = '#1976d2';
                        this.innerHTML = '💬 Hide Comments';
                        commentBoxVisible = true;
                    } else {
                        commentBox.style.display = 'none';
                        this.style.background = 'none';
                        this.style.color = 'inherit';
                        this.innerHTML = '💬 Comment';
                        commentBoxVisible = false;
                    }
                });
            }
            
        case 'game':
            const gameArea = document.getElementById('game-area');
            const player = document.getElementById('player');
            const gameStatus = document.getElementById('game-status');
            
            if (gameArea && player && gameStatus) {
                gameArea.addEventListener('click', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left - 15; // Center the player
                    const y = e.clientY - rect.top - 15;
                    
                    // Keep player within bounds
                    const maxX = this.offsetWidth - 30;
                    const maxY = this.offsetHeight - 30;
                    const newX = Math.max(0, Math.min(x, maxX));
                    const newY = Math.max(0, Math.min(y, maxY));
                    
                    player.style.left = newX + 'px';
                    player.style.top = newY + 'px';
                    
                    gameStatus.innerHTML = `Player moved to (${Math.round(newX)}, ${Math.round(newY)})`;
                    
                    // Check if player reached target
                    const target = document.getElementById('target');
                    if (target) {
                        const targetRect = target.getBoundingClientRect();
                        const playerRect = player.getBoundingClientRect();
                        const distance = Math.sqrt(
                            Math.pow(playerRect.left - targetRect.left, 2) + 
                            Math.pow(playerRect.top - targetRect.top, 2)
                        );
                        
                        if (distance < 40) {
                            gameStatus.innerHTML = '🎉 You reached the target! Click event mastery!';
                            player.innerHTML = '🎉';
                            setTimeout(() => {
                                player.innerHTML = '😊';
                            }, 2000);
                        }
                    }
                });
            }
            break;
            
        case 'form':
            const emailInput = document.getElementById('demo-email');
            const passwordInput = document.getElementById('demo-password');
            const emailFeedback = document.getElementById('email-feedback');
            const passwordFeedback = document.getElementById('password-feedback');
            const submitBtn = document.getElementById('demo-submit');
            
            function validateForm() {
                let isValid = true;
                
                // Email validation
                const emailValue = emailInput.value;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailValue === '') {
                    emailFeedback.innerHTML = '';
                    emailInput.style.borderColor = '#ddd';
                } else if (emailRegex.test(emailValue)) {
                    emailFeedback.innerHTML = '<span style="color: #4caf50;">✅ Valid email</span>';
                    emailInput.style.borderColor = '#4caf50';
                } else {
                    emailFeedback.innerHTML = '<span style="color: #e74c3c;">❌ Invalid email format</span>';
                    emailInput.style.borderColor = '#e74c3c';
                    isValid = false;
                }
                
                // Password validation
                const passwordValue = passwordInput.value;
                if (passwordValue === '') {
                    passwordFeedback.innerHTML = '';
                    passwordInput.style.borderColor = '#ddd';
                } else if (passwordValue.length >= 6) {
                    passwordFeedback.innerHTML = '<span style="color: #4caf50;">✅ Password length OK</span>';
                    passwordInput.style.borderColor = '#4caf50';
                } else {
                    passwordFeedback.innerHTML = '<span style="color: #e74c3c;">❌ Password too short</span>';
                    passwordInput.style.borderColor = '#e74c3c';
                    isValid = false;
                }
                
                // Enable/disable submit button
                submitBtn.disabled = !isValid || emailValue === '' || passwordValue === '';
                submitBtn.style.opacity = submitBtn.disabled ? '0.5' : '1';
            }
            
            if (emailInput && passwordInput) {
                emailInput.addEventListener('input', validateForm);
                passwordInput.addEventListener('input', validateForm);
                
                if (submitBtn) {
                    submitBtn.addEventListener('click', function() {
                        alert('Form submitted! Event listeners handled validation and submission.');
                    });
                }
            }
            break;
    }
}

// Create sparkle effect
function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
        sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.fontSize = '1.2rem';
        document.body.appendChild(sparkle);
        
        // Animate and remove
        setTimeout(() => {
            sparkle.style.transition = 'all 1s ease-out';
            sparkle.style.transform = 'translateY(-50px)';
            sparkle.style.opacity = '0';
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }, 10);
    }
}

// Set default template
function setDefaultTemplate() {
    const template = ``;
    
    taskEditor.value = template;
    ;

    const test = `<!DOCTYPE html>
    <html lang='en'>
    <head>
        <title>My Interactive Page</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                transition: background-color 0.3s; 
                padding: 20px;
            }
            button { 
                padding: 10px 20px; 
                font-size: 16px; 
                cursor: pointer;
                margin: 10px 5px;
                border: none;
                border-radius: 5px;
                background: #007bff;
                color: white;
            }
            button:hover {
                background: #0056b3;
            }
            .hover-box { 
                padding: 20px; 
                border: 2px solid #333; 
                margin: 20px 0;
                border-radius: 10px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }
        </style>
    </head>
    <body>
        <h1>My Interactive Webpage</h1>
        <button id='colorButton'>Change Background Color</button>
        <div id='hoverBox' class='hover-box'>Hover over me to see magic!</div>
    
        <script>
            // Your event listeners go here!
            // Example:
            let colorBtn = document.getElementById('colorButton');
            colorBtn.addEventListener('click', function() {
                document.body.style.backgroundColor = 'lightblue';
            });
    
            // Add your hover event listener here:
            let hoverBox = document.getElementById('hoverBox');
            hoverBox.addEventListener('mouseover', function() {
                this.style.backgroundColor = 'yellow';
                this.innerHTML = 'Mouse is over me!';
            });
            
            hoverBox.addEventListener('mouseout', function() {
                this.style.backgroundColor = 'white';
                this.innerHTML = 'Hover over me to see magic!';
            });
        </script>
    </body>
    </html>`;
}

// Update progress indicator
function updateProgress() {
    const completed = Object.values(completionStatus).filter(Boolean).length;
    const total = Object.keys(completionStatus).length;
    const percentage = (completed / total) * 100;
    
    progressFill.style.width = percentage + '%';
    
    // Update requirement items
    const requirements = {
        'req-html': completionStatus.html,
        'req-ids': completionStatus.ids,
        'req-listeners': completionStatus.listeners,
        'req-click': completionStatus.click,
        'req-hover': completionStatus.hover
    };
    
    Object.keys(requirements).forEach(reqId => {
        const reqElement = document.getElementById(reqId);
        if (reqElement) {
            if (requirements[reqId]) {
                reqElement.classList.add('completed');
            } else {
                reqElement.classList.remove('completed');
            }
        }
    });
}

// Show hint function
document.getElementById('show-hint').addEventListener('click', function() {
    const hintHTML = `
        <div style="background: linear-gradient(135deg, #fff3cd, #ffeeba); border: 2px solid #ffc107; border-radius: 15px; padding: 20px; margin: 15px 0;">
            <h4 style="color: #856404; margin-top: 0;">💡 Helpful Hints for Success!</h4>
            
            <div style="background: white; border-radius: 10px; padding: 15px; margin: 15px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <h5 style="color: #007bff; margin-top: 0;">🏗️ HTML Structure:</h5>
                <pre style="background: #f8f9fa; padding: 10px; border-radius: 5px; font-size: 0.9rem;"><code>&lt;button id="myButton"&gt;Click Me&lt;/button&gt;
&lt;div id="hoverBox"&gt;Hover over me!&lt;/div&gt;</code></pre>
            </div>
            
            <div style="background: white; border-radius: 10px; padding: 15px; margin: 15px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <h5 style="color: #007bff; margin-top: 0;">👂 Event Listeners:</h5>
                <pre style="background: #f8f9fa; padding: 10px; border-radius: 5px; font-size: 0.9rem;"><code>let button = document.getElementById('myButton');

button.addEventListener('click', function() {
    document.body.style.backgroundColor = 'lightblue';
});</code></pre>
            </div>
            
            <div style="background: white; border-radius: 10px; padding: 15px; margin: 15px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <h5 style="color: #007bff; margin-top: 0;">🏃 Hover Events:</h5>
                <pre style="background: #f8f9fa; padding: 10px; border-radius: 5px; font-size: 0.9rem;"><code>hoverBox.addEventListener('mouseover', function() {
    this.style.backgroundColor = 'yellow';
});

hoverBox.addEventListener('mouseout', function() {
    this.style.backgroundColor = 'white';
});</code></pre>
            </div>
            
            <p style="color: #856404; font-weight: bold; text-align: center; margin-bottom: 0;">
                🎯 Remember: Use addEventListener(), not onclick!
            </p>
        </div>
    `;
    
    // Create modal-like display for hint
    const hintModal = document.createElement('div');
    hintModal.style.position = 'fixed';
    hintModal.style.top = '0';
    hintModal.style.left = '0';
    hintModal.style.width = '100%';
    hintModal.style.height = '100%';
    hintModal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    hintModal.style.zIndex = '10000';
    hintModal.style.display = 'flex';
    hintModal.style.alignItems = 'center';
    hintModal.style.justifyContent = 'center';
    hintModal.style.padding = '20px';
    
    const hintContent = document.createElement('div');
    hintContent.style.backgroundColor = 'white';
    hintContent.style.borderRadius = '15px';
    hintContent.style.maxWidth = '600px';
    hintContent.style.maxHeight = '80vh';
    hintContent.style.overflow = 'auto';
    hintContent.style.position = 'relative';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕ Close';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.style.background = '#dc3545';
    closeBtn.style.color = 'white';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '20px';
    closeBtn.style.padding = '8px 15px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontSize = '0.9rem';
    closeBtn.style.fontWeight = 'bold';
    
    hintContent.innerHTML = hintHTML;
    hintContent.appendChild(closeBtn);
    hintModal.appendChild(hintContent);
    document.body.appendChild(hintModal);
    
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(hintModal);
    });
    
    hintModal.addEventListener('click', function(e) {
        if (e.target === hintModal) {
            document.body.removeChild(hintModal);
        }
    });
});

// Reset code function
document.getElementById('reset-code').addEventListener('click', function() {
    if (confirm('Are you sure you want to reset the textarea? This will erase all of your current code.')) {
        setDefaultTemplate();
        feedback.innerHTML = '';
        completionStatus = {
            html: false,
            ids: false,
            listeners: false,
            click: false,
            hover: false
        };
        updateProgress();
        
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.5';
        nextBtn.style.cursor = 'not-allowed';
    }
});

// Simple result preview function
function showCodeResult(code) {
    let cleanCode = code.replace(/<script[^>]*>[\s\S]*?Live reload enabled[\s\S]*?<\/script>/gi, '');
    cleanCode = cleanCode.replace(/<script[^>]*>[\s\S]*?websocket[\s\S]*?<\/script>/gi, '');
    cleanCode = cleanCode.replace(/<!--[\s\S]*?Live reload[\s\S]*?-->/gi, '');
    
    const resultWindow = window.open('', 'Event_Result', 'width=700,height=500,scrollbars=yes,resizable=yes');
    
    if (resultWindow) {
        const resultHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Events & Listeners Result</title>
    <style>
        body {
            font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: #f8f9ff;
            color: #333;
            transition: background-color 0.3s ease;
        }
        .header {
            background: linear-gradient(135deg, #007BFF, #4dabf7);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            text-align: center;
        }
        .content {
            background: white;
            border: 2px solid #dde7ff;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        h1, h3 {
            color: #007BFF;
            margin-top: 0;
        }
        h2 {
            color: white;
        }
        button {
            background: #007BFF;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s ease;
            margin: 5px;
            min-height: 44px;
        }
        button:hover {
            background: #0056b3;
            transform: translateY(-1px);
        }
        div {
            transition: all 0.3s ease;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>🎯 Events & Listeners Demo Result</h2>
        <p>This window shows your interactive code in action! Try all the interactive elements.</p>
    </div>
    <div class="content">
        ${cleanCode}
    </div>
</body>
</html>`;
        
        resultWindow.document.write(resultHTML);
        resultWindow.document.close();
        resultWindow.focus();
    } else {
        alert('Pop-up blocked! Please allow pop-ups to see your code result.\n\nAlternatively, copy your code to a new HTML file to test it.');
    }
}

/**
 * Comprehensive syntax validation function
 * Checks for missing closing tags, semicolons, and other common syntax errors
 */
function validateSyntax(code) {
    const errors = [];
    const warnings = [];
    
    // Clean the code first (remove comments and strings for some checks)
    const cleanCode = code
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
        .replace(/\/\/.*$/gm, '') // Remove line comments
        .replace(/"[^"\\]*(?:\\.[^"\\]*)*"/g, '""') // Replace strings with empty strings
        .replace(/'[^'\\]*(?:\\.[^'\\]*)*'/g, "''"); // Replace single-quoted strings
    
    // 1. Check for missing closing HTML tags
    const htmlTagMatches = code.match(/<(\w+)[^>]*>/g);
    const selfClosingTags = ['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr'];
    
    if (htmlTagMatches) {
        const tagStack = [];
        const tagPattern = /<(\/?)([\w-]+)[^>]*>/g;
        let match;
        
        while ((match = tagPattern.exec(code)) !== null) {
            const isClosing = match[1] === '/';
            const tagName = match[2].toLowerCase();
            
            if (selfClosingTags.includes(tagName)) continue;
            
            if (isClosing) {
                if (tagStack.length === 0) {
                    errors.push(`Unexpected closing tag &lt;/${tagName}&gt; - no matching opening tag found`);
                } else {
                    const lastTag = tagStack.pop();
                    if (lastTag !== tagName) {
                        errors.push(`Mismatched tags: expected &lt;/${lastTag}&gt; but found </${tagName}>`);
                    }
                }
            } else {
                tagStack.push(tagName);
            }
        }
        
        // Check for unclosed tags
        if (tagStack.length > 0) {
            tagStack.forEach(tag => {
                errors.push(`Missing closing tag: &lt;/${tag}&gt;`);
            });
        }
    }
    
    // 2. Check for missing semicolons in JavaScript
    const scriptContent = extractJavaScript(code);
    if (scriptContent) {
        checkJavaScriptSemicolons(scriptContent, errors, warnings);
    }
    
    // 3. Check for common JavaScript syntax errors
    if (scriptContent) {
        checkJavaScriptSyntax(scriptContent, errors, warnings);
    }
    
    // 4. Check for missing quotes in HTML attributes
    checkHTMLAttributes(code, errors, warnings);
    
    // 5. Check for proper DOCTYPE and basic HTML structure
    checkHTMLStructure(code, warnings);
    
    return { errors, warnings };
}

/**
 * Extract JavaScript content from HTML
 */
function extractJavaScript(code) {
    const scriptMatches = code.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
    if (!scriptMatches) return '';
    
    return scriptMatches.map(match => {
        const content = match.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        return content ? content[1] : '';
    }).join('\n');
}

function checkAllSemicolons(code) {
    const errors = [];
    const warnings = [];
    
    // Check JavaScript semicolons
    const jsResults = checkJavaScriptSemicolons(code);
    errors.push(...jsResults.errors);
    warnings.push(...jsResults.warnings);
    
    // Check CSS semicolons
    const cssResults = checkCSSSemicolons(code);
    errors.push(...cssResults.errors);
    warnings.push(...cssResults.warnings);
    
    return { errors, warnings };
}

/**
 * Check for missing semicolons in JavaScript
 */
function checkJavaScriptSemicolons(code) {
    const errors = [];
    const warnings = [];
    
    // Extract JavaScript from script tags
    const scriptMatches = code.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
    if (!scriptMatches) return { errors, warnings };
    
    let jsCode = '';
    scriptMatches.forEach(match => {
        const content = match.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        if (content && content[1]) {
            jsCode += content[1] + '\n';
        }
    });
    
    if (!jsCode.trim()) return { errors, warnings };
    
    const lines = jsCode.split('\n');
    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        const lineNumber = index + 1;
        
        // Skip empty lines, comments, and structural elements
        if (!trimmedLine || 
            trimmedLine.startsWith('//') || 
            trimmedLine.startsWith('/*') ||
            trimmedLine.endsWith('*/') ||
            trimmedLine.endsWith('{') || 
            trimmedLine === '}' ||
            /^(if|else|for|while|function|try|catch|finally|switch)\s*[\(\{]/.test(trimmedLine)) {
            return;
        }
        
        // Patterns that need semicolons
        const needsSemicolonPatterns = [
            /^(let|const|var)\s+\w/,              // Variable declarations
            /^\w+\s*\(/,                          // Function calls
            /^\w+\.\w+.*\(/,                      // Method calls
            /^\w+\.\w+\s*=/,                      // Property assignments
            /^\s*\}\s*\)/,                        // Closing function calls });
            /getElementById/,                      // getElementById calls
            /addEventListener/,                    // addEventListener calls  
            /\.style\.\w+\s*=/,                   // Style changes
            /^console\./,                         // Console calls
            /^alert\s*\(/,                       // Alert calls
            /^return\s/,                         // Return statements
            /^\w+\s*=\s*[^=]/,                   // Basic assignments
            /^this\.style/,                       // this.style changes
            /^document\.body/                     // document.body changes
        ];
        
        const needsSemicolon = needsSemicolonPatterns.some(pattern => pattern.test(trimmedLine));
        
        if (needsSemicolon && !trimmedLine.endsWith(';')) {
            const errorMessage = `JavaScript Line ${lineNumber}: Missing semicolon - "${trimmedLine}"`;
            
            // Important statements become critical errors
            if (/getElementById|addEventListener|\.style\.|^(let|const|var)\s+\w|\}\s*\)/.test(trimmedLine)) {
                errors.push(errorMessage);
            } else {
                warnings.push(errorMessage);
            }
        }
    });
    
    return { errors, warnings };
}

/**
 * Check for common JavaScript syntax errors
 */
function checkJavaScriptSyntax(jsCode, errors, warnings) {
    // Check for unmatched parentheses, brackets, and braces
    checkMatchingDelimiters(jsCode, '(', ')', 'parentheses', errors);
    checkMatchingDelimiters(jsCode, '[', ']', 'square brackets', errors);
    checkMatchingDelimiters(jsCode, '{', '}', 'curly braces', errors);
    
    // Check for common variable declaration errors
    if (/\b(let|const|var)\s+\d/.test(jsCode)) {
        errors.push('Variable names cannot start with a number');
    }
    
    // Check for missing quotes in strings
    const stringPatterns = [
        /getElementById\s*\(\s*[^"'`\)]+\s*\)/g,
        /addEventListener\s*\(\s*[^"'`,]+\s*,/g
    ];
    
    stringPatterns.forEach(pattern => {
        const matches = jsCode.match(pattern);
        if (matches) {
            matches.forEach(match => {
                warnings.push(`Potential missing quotes in: ${match}`);
            });
        }
    });
    
    // Check for common typos in method names
    const commonTypos = {
        'getElementByid': 'getElementById',
        'addEventListner': 'addEventListener',
        'addEventListenr': 'addEventListener',
        'documnet': 'document',
        'elemetn': 'element'
    };
    
    Object.keys(commonTypos).forEach(typo => {
        if (jsCode.includes(typo)) {
            errors.push(`Typo detected: "${typo}" should be "${commonTypos[typo]}"`);
        }
    });
}

// Check CSS semicolons
function checkCSSSemicolons(code) {
    const errors = [];
    const warnings = [];
    
    // Extract CSS from style tags
    const styleMatches = code.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    if (!styleMatches) return { errors, warnings };
    
    let cssCode = '';
    styleMatches.forEach(match => {
        const content = match.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
        if (content && content[1]) {
            cssCode += content[1] + '\n';
        }
    });
    
    if (!cssCode.trim()) return { errors, warnings };
    
    const lines = cssCode.split('\n');
    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        const lineNumber = index + 1;
        
        // Skip empty lines, comments, and structural elements
        if (!trimmedLine || 
            trimmedLine.startsWith('/*') || 
            trimmedLine.endsWith('*/') ||
            trimmedLine.endsWith('{') ||
            trimmedLine === '}' ||
            trimmedLine.startsWith('}')) {
            return;
        }
        
        // Check for CSS property declarations
        const cssPropertyPattern = /^\s*[\w-]+\s*:\s*.+/;
        
        if (cssPropertyPattern.test(trimmedLine) && !trimmedLine.endsWith(';')) {
            const errorMessage = `CSS Line ${lineNumber}: Missing semicolon - "${trimmedLine}"`;
            warnings.push(errorMessage);
        }
    });
    
    return { errors, warnings };
}

/**
 * Check for matching delimiters
 */
function checkMatchingDelimiters(code, open, close, name, errors) {
    const stack = [];
    const chars = code.split('');
    
    chars.forEach((char, index) => {
        if (char === open) {
            stack.push({ char, index });
        } else if (char === close) {
            if (stack.length === 0) {
                errors.push(`Unmatched closing ${name} at position ${index}`);
            } else {
                stack.pop();
            }
        }
    });
    
    if (stack.length > 0) {
        stack.forEach(item => {
            errors.push(`Unmatched opening ${name} at position ${item.index}`);
        });
    }
}

/**
 * Check HTML attributes for missing quotes
 */
function checkHTMLAttributes(code, errors, warnings) {
    // Look for attributes without quotes
    const unquotedAttrPattern = /(\w+)\s*=\s*([^"'\s>][^>\s]*)/g;
    let match;
    
    while ((match = unquotedAttrPattern.exec(code)) !== null) {
        const attrName = match[1];
        const attrValue = match[2];
        
        // Skip if it looks like a number or boolean
        if (!/^\d+$/.test(attrValue) && attrValue !== 'true' && attrValue !== 'false') {
            warnings.push(`Attribute "${attrName}" should have quoted value: ${attrName}="${attrValue}"`);
        }
    }
}

/**
 * Check basic HTML structure
 */
function checkHTMLStructure(code, warnings) {
    if (!/<!DOCTYPE\s+html>/i.test(code)) {
        warnings.push('Missing DOCTYPE declaration - consider adding &lt;!DOCTYPE html&gt;');
    }
    
    if (/<html[^>]*>/i.test(code) && !/<\/html>/i.test(code)) {
        // This will be caught by the tag matching, but we can add a specific message
    }
    
    if (/<head[^>]*>/i.test(code) && !/<title[^>]*>/i.test(code)) {
        warnings.push('Consider adding a <title> element inside <head>');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addTestButton, 1000);
});

// Fixed function that checks both JavaScript and CSS semicolons
function checkAllSemicolons(code) {
    const errors = [];
    const warnings = [];
    
    console.log('=== CHECKING ALL SEMICOLONS (JS + CSS) ===');
    
    // Check JavaScript semicolons
    const jsResults = checkJavaScriptSemicolons(code);
    errors.push(...jsResults.errors);
    warnings.push(...jsResults.warnings);
    
    // Check CSS semicolons
    const cssResults = checkCSSSemicolons(code);
    errors.push(...cssResults.errors);
    warnings.push(...cssResults.warnings);
    
    console.log('=== TOTAL SEMICOLON CHECK COMPLETE ===');
    console.log('Total errors:', errors);
    console.log('Total warnings:', warnings);
    
    return { errors, warnings };
}

// Comprehensive answer checking

document.getElementById('check-answer').addEventListener('click', function() {
    if (!taskEditor.value.trim()) {
        feedback.innerHTML = `
            <div style="color: #e74c3c; background: linear-gradient(135deg, #fadbd8, #f8d7da); border: 2px solid #e74c3c; padding: 20px; border-radius: 10px;">
                <strong>📝 Your code editor is empty!</strong><br><br>
                Please write some code first.
            </div>
        `;
        return;
    }

    const code = taskEditor.value;
    
    // Run syntax validation with improved semicolon checking
    const syntaxIssues = validateCodeSyntax(code);
    
    // Show syntax errors/warnings if any exist
    if (syntaxIssues.criticalErrors.length > 0 || syntaxIssues.warnings.length > 0) {
        showSyntaxErrors(syntaxIssues);
        return;
    }
    
    console.log('No syntax issues found, continuing with lesson validation');
    
    // Continue with existing lesson validation...
    // Clean code
    let cleanCode = code.replace(/<script[^>]*>[\s\S]*?Live reload enabled[\s\S]*?<\/script>/gi, '');
    cleanCode = cleanCode.replace(/<script[^>]*>[\s\S]*?websocket[\s\S]*?<\/script>/gi, '');
    cleanCode = cleanCode.replace(/<!--[\s\S]*?Live reload[\s\S]*?-->/gi, '');
    
    // Extract JavaScript content
    let jsContent = cleanCode;
    const scriptMatches = cleanCode.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
    if (scriptMatches) {
        jsContent = scriptMatches.map(match => {
            const content = match.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
            return content ? content[1] : '';
        }).join('\n');
    }
    
    // Existing validation checks...
    const hasGetElementById = /document\.getElementById\s*\(\s*["'`][^"'`]*["'`]\s*\)/i.test(jsContent);
    const getElementByIdCount = (jsContent.match(/document\.getElementById\s*\(/gi) || []).length;
    
    const hasAddEventListener = /\.addEventListener\s*\(\s*["'`][^"'`]*["'`]\s*,/i.test(jsContent);
    const addEventListenerCount = (jsContent.match(/\.addEventListener\s*\(/gi) || []).length;
    
    const hasClickEvent = /addEventListener\s*\(\s*["'`]click["'`]/i.test(jsContent);
    const hasHoverEvent = /addEventListener\s*\(\s*["'`](mouseover|mouseout|mouseenter|mouseleave)["'`]/i.test(jsContent);
    
    const hasBackgroundChange = /\.style\.backgroundColor\s*=|document\.body\.style\.backgroundColor\s*=/i.test(jsContent);
    const hasButton = /<button[^>]*>/i.test(cleanCode);
    const hasDiv = /<div[^>]*>/i.test(cleanCode);
    const hasIds = /id\s*=\s*["'`][^"'`]+["'`]/i.test(cleanCode);
    const idCount = (cleanCode.match(/id\s*=\s*["'`][^"'`]+["'`]/gi) || []).length;
    const hasHTMLStructure = /<html[^>]*>[\s\S]*<\/html>/i.test(cleanCode) || 
                             /<body[^>]*>[\s\S]*<\/body>/i.test(cleanCode) ||
                             (hasButton && hasDiv);
    const hasDescriptiveNames = /let\s+[a-zA-Z_$][a-zA-Z0-9_$]{3,}\s*=/.test(jsContent) ||
                               /const\s+[a-zA-Z_$][a-zA-Z0-9_$]{3,}\s*=/.test(jsContent);
    
    completionStatus.html = hasHTMLStructure && hasButton && hasDiv;
    completionStatus.ids = hasIds && idCount >= 2;
    completionStatus.listeners = hasAddEventListener && addEventListenerCount >= 2;
    completionStatus.click = hasClickEvent;
    completionStatus.hover = hasHoverEvent;
    
    updateProgress();
    
    let errorMessages = [];
    let successMessages = [];
    let warningMessages = [];
    
    if (!hasHTMLStructure) {
        errorMessages.push('Missing proper HTML structure. Include HTML elements or at least button and div tags.');
    } else {
        successMessages.push('✅ Has proper HTML structure');
    }
    
    if (!hasButton) {
        errorMessages.push('Missing button element. Include at least one &lt;button&gt; element.');
    } else {
        successMessages.push('✅ Has button element');
    }
    
    if (!hasDiv) {
        errorMessages.push('Missing div element. Include at least one &lt;div&gt; element for hover interaction.');
    } else {
        successMessages.push('✅ Has div element');
    }
    
    if (!hasIds) {
        errorMessages.push('Missing ID attributes. Add id="..." to elements you want to interact with.');
    } else if (idCount < 2) {
        errorMessages.push(`Need at least 2 elements with ID attributes. Found ${idCount} ID(s).`);
    } else {
        successMessages.push(`✅ Has ${idCount} element(s) with ID attributes`);
    }
    
    if (!hasGetElementById) {
        errorMessages.push('Missing document.getElementById(). Use it to select HTML elements.');
    } else if (getElementByIdCount < 2) {
        errorMessages.push(`Need at least 2 getElementById() calls. Found ${getElementByIdCount} call(s).`);
    } else {
        successMessages.push(`✅ Uses getElementById (${getElementByIdCount} calls)`);
    }
    
    if (!hasAddEventListener) {
        errorMessages.push('Missing addEventListener(). Use element.addEventListener("event", function) to handle events.');
    } else if (addEventListenerCount < 2) {
        errorMessages.push(`Need at least 2 addEventListener() calls. Found ${addEventListenerCount} calls.`);
    } else {
        successMessages.push(`✅ Uses addEventListener (${addEventListenerCount} calls)`);
    }
    
    if (!hasClickEvent) {
        errorMessages.push('Missing click event handler. Use addEventListener("click", function) for button clicks.');
    } else {
        successMessages.push('✅ Has click event handling');
    }
    
    if (!hasHoverEvent) {
        errorMessages.push('Missing hover event handler. Use addEventListener("mouseover", function) or addEventListener("mouseout", function).');
    } else {
        successMessages.push('✅ Has hover event handling');
    }
    
    if (!hasBackgroundChange) {
        warningMessages.push('Consider adding background color changes for better visual feedback.');
    } else {
        successMessages.push('✅ Changes background color');
    }
    
    if (!hasDescriptiveNames && jsContent.includes('let ')) {
        warningMessages.push('Use descriptive variable names (e.g., "colorButton" instead of "btn").');
    } else if (hasDescriptiveNames) {
        successMessages.push('✅ Uses descriptive variable names');
    }
    
    // Display results
    if (errorMessages.length === 0) {
        showSuccessWithWarnings(successMessages, warningMessages);
    } else {
        showErrorsWithWarnings(errorMessages, successMessages, warningMessages);
    }
});

function extractJavaScriptCode(code) {
    const scriptMatches = code.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
    if (!scriptMatches) return '';
    
    return scriptMatches.map(match => {
        const content = match.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        return content ? content[1] : '';
    }).join('\n');
}

// Enhanced syntax validation function
function validateCodeSyntax(code) {
    const criticalErrors = [];
    const warnings = [];
    
    // Check HTML tags
    const htmlErrors = checkHTMLTagsFixed(code);
    criticalErrors.push(...htmlErrors);
    
    // Check all semicolons (JS + CSS)
    const semicolonResults = checkAllSemicolons(code);
    criticalErrors.push(...semicolonResults.errors);
    warnings.push(...semicolonResults.warnings);
    
    // Check JavaScript brackets/braces
    const jsCode = extractJavaScriptCode(code);
    if (jsCode) {
        const bracketErrors = checkMatchingDelimitersFixed(jsCode);
        criticalErrors.push(...bracketErrors);
        
        const typoErrors = checkCommonTypos(jsCode);
        criticalErrors.push(...typoErrors);
    }
    
    return { criticalErrors, warnings };
}

// Fixed JavaScript syntax checking with better semicolon detection
function checkJavaScriptSyntaxFixed(code) {
    const errors = [];
    const warnings = [];
    
    console.log('=== SEMICOLON CHECK STARTING ===');
    console.log('Full code received:', code);
    
    // Extract JavaScript from script tags
    const scriptMatches = code.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
    
    if (!scriptMatches || scriptMatches.length === 0) {
        console.log('No <script> tags found in code');
        return { errors, warnings };
    }
    
    console.log('Found', scriptMatches.length, 'script tags');
    
    // Extract all JavaScript content
    let jsCode = '';
    scriptMatches.forEach((match, index) => {
        const content = match.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        if (content && content[1]) {
            jsCode += content[1] + '\n';
            console.log(`Script ${index + 1} content:`, content[1]);
        }
    });
    
    if (!jsCode.trim()) {
        console.log('No JavaScript content found inside script tags');
        return { errors, warnings };
    }
    
    console.log('Combined JavaScript code:', jsCode);
    
    // Split into lines and check each one
    const lines = jsCode.split('\n');
    console.log('Checking', lines.length, 'lines for semicolons');
    
    lines.forEach((line, index) => {
        const originalLine = line;
        const trimmedLine = line.trim();
        const lineNumber = index + 1;
        
        console.log(`Line ${lineNumber}: "${originalLine}" -> trimmed: "${trimmedLine}"`);
        
        // Skip empty lines and comments
        if (!trimmedLine || 
            trimmedLine.startsWith('//') || 
            trimmedLine.startsWith('/*') ||
            trimmedLine.endsWith('*/')) {
            console.log(`Line ${lineNumber}: Skipped (empty or comment)`);
            return;
        }
        
        // Skip lines that don't need semicolons
        if (trimmedLine.endsWith('{') || 
            trimmedLine === '}' ||
            trimmedLine.startsWith('}') ||
            /^(if|else|for|while|function|try|catch|finally|switch)\s*[\(\{]/.test(trimmedLine)) {
            console.log(`Line ${lineNumber}: Skipped (control structure)`);
            return;
        }
        
        // Check for specific patterns that NEED semicolons
        const needsSemicolonPatterns = [
            // Variable declarations
            /^(let|const|var)\s+\w/,
            // Function calls
            /^\w+\s*\(/,
            // Method calls
            /^\w+\.\w+\s*\(/,
            // Property assignments
            /^\w+\.\w+\s*=/,
            // getElementById calls
            /getElementById\s*\(/,
            // addEventListener calls  
            /addEventListener\s*\(/,
            // Style changes
            /\.style\.\w+\s*=/,
            // Console calls
            /^console\./,
            // Alert calls
            /^alert\s*\(/,
            // Return statements
            /^return\s/,
            // Basic assignments
            /^\w+\s*=\s*[^=]/
        ];
        
        const needsSemicolon = needsSemicolonPatterns.some(pattern => {
            const matches = pattern.test(trimmedLine);
            if (matches) {
                console.log(`Line ${lineNumber}: Matches pattern ${pattern}`);
            }
            return matches;
        });
        
        if (needsSemicolon) {
            const hasSemicolon = trimmedLine.endsWith(';');
            console.log(`Line ${lineNumber}: Needs semicolon: ${needsSemicolon}, Has semicolon: ${hasSemicolon}`);
            
            if (!hasSemicolon) {
                const errorMessage = `Line ${lineNumber}: Missing semicolon - "${trimmedLine}"`;
                
                // Treat important JavaScript statements as critical errors
                if (/getElementById|addEventListener|\.style\.|^(let|const|var)\s+\w/.test(trimmedLine)) {
                    errors.push(errorMessage);
                    console.log(`Line ${lineNumber}: Added as CRITICAL ERROR`);
                } else {
                    warnings.push(errorMessage);
                    console.log(`Line ${lineNumber}: Added as WARNING`);
                }
            }
        } else {
            console.log(`Line ${lineNumber}: Does not need semicolon`);
        }
    });
    
    console.log('=== SEMICOLON CHECK COMPLETE ===');
    console.log('Errors found:', errors);
    console.log('Warnings found:', warnings);
    
    return { errors, warnings };
}

function testSemicolonChecker() {
    const testCode = `
    <script>
        let btn = document.getElementById('test')
        btn.addEventListener('click', function() {
            console.log('clicked');
        })
        document.body.style.backgroundColor = 'red'
    </script>
    `;
    
    console.log('=== TESTING SEMICOLON CHECKER ===');
    const result = checkJavaScriptSyntaxFixed(testCode);
    console.log('Test result:', result);
    return result;
}

// Fixed delimiter checking
function checkMatchingDelimitersFixed(code) {
    const errors = [];
    const pairs = [
        { open: '(', close: ')', name: 'parentheses' },
        { open: '[', close: ']', name: 'square brackets' },
        { open: '{', close: '}', name: 'curly braces' }
    ];
    
    pairs.forEach(({ open, close, name }) => {
        let count = 0;
        let inString = false;
        let stringChar = '';
        
        for (let i = 0; i < code.length; i++) {
            const char = code[i];
            const prevChar = i > 0 ? code[i - 1] : '';
            
            // Handle strings
            if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
                if (!inString) {
                    inString = true;
                    stringChar = char;
                } else if (char === stringChar) {
                    inString = false;
                    stringChar = '';
                }
            }
            
            if (!inString) {
                if (char === open) count++;
                if (char === close) count--;
                
                if (count < 0) {
                    errors.push(`Unmatched closing ${name} at position ${i}`);
                    return;
                }
            }
        }
        
        if (count > 0) {
            errors.push(`Unmatched opening ${name} (missing ${count} closing ${name})`);
        }
    });
    
    return errors;
}

// Check for common typos
function checkCommonTypos(jsCode) {
    const errors = [];
    const typos = {
        'getElementByid': 'getElementById',
        'addEventListner': 'addEventListener',
        'addEventListenr': 'addEventListener',
        'documnet': 'document',
        'elemetn': 'element'
    };
    
    Object.keys(typos).forEach(typo => {
        if (jsCode.includes(typo)) {
            errors.push(`Typo detected: "${typo}" should be "${typos[typo]}"`);
        }
    });
    
    return errors;
}

// Fixed HTML tag checking
function checkHTMLTagsFixed(code) {
    const errors = [];
    const tagStack = [];
    const selfClosingTags = ['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr'];
    
    // Split code into lines for line number tracking
    const lines = code.split('\n');
    
    // Find all HTML tags with better regex and track line numbers
    const tagPattern = /<(\/?)([\w-]+)(?:\s[^>]*)?\s*>/g;
    let match;
    
    // Convert position to line number
    function getLineNumber(position) {
        let currentPos = 0;
        for (let i = 0; i < lines.length; i++) {
            currentPos += lines[i].length + 1; // +1 for newline character
            if (currentPos > position) {
                return i + 1; // Line numbers start from 1
            }
        }
        return lines.length;
    }
    
    while ((match = tagPattern.exec(code)) !== null) {
        const isClosing = match[1] === '/';
        const tagName = match[2].toLowerCase();
        const lineNumber = getLineNumber(match.index);
        
        // Skip self-closing tags
        if (selfClosingTags.includes(tagName)) continue;
        
        if (isClosing) {
            if (tagStack.length === 0) {
                errors.push(`Unexpected closing tag &lt;${tag.tagName}&gt; on line ${lineNumber}`);
            } else {
                const lastOpenTag = tagStack[tagStack.length - 1];
                if (lastOpenTag.tagName === tagName) {
                    tagStack.pop(); // Matching pair found
                } else {
                    // Look for the matching opening tag in the stack
                    let found = false;
                    for (let i = tagStack.length - 1; i >= 0; i--) {
                        if (tagStack[i].tagName === tagName) {
                            // Found matching opening tag, but there are unclosed tags in between
                            const unmatched = tagStack.slice(i + 1);
                            unmatched.forEach(tag => {
                                errors.push(`Missing closing tag for &lt;${tag.tagName}&gt; (opened on line ${tag.lineNumber})`);
                            });
                            tagStack.splice(i); // Remove all from this point
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        errors.push(`Closing tag &lt;${tag.tagName}&gt; on line ${lineNumber} has no matching opening tag`);
                    }
                }
            }
        } else {
            tagStack.push({ tagName, lineNumber });
        }
    }
    
    // Check for remaining unclosed tags
    tagStack.forEach(tag => {
        errors.push(`Missing closing tag for &lt;${tag.tagName}&gt; (opened on line ${tag.lineNumber})`);
    });
    
    console.log('HTML tag check results:', errors); // Debug log
    return errors;
}

// Check JavaScript syntax with improved semicolon detection
function checkJavaScriptSyntax(code) {
    const errors = [];
    const warnings = [];
    
    // Extract JavaScript from script tags
    const scriptMatches = code.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
    if (!scriptMatches) return { errors, warnings };
    
    const jsCode = scriptMatches.map(match => {
        const content = match.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        return content ? content[1] : '';
    }).join('\n');
    
    // Check for missing semicolons - TREAT AS ERRORS for better visibility
    const lines = jsCode.split('\n');
    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        
        // Skip empty lines, comments, and lines that don't need semicolons
        if (!trimmedLine || 
            trimmedLine.startsWith('//') || 
            trimmedLine.startsWith('/*') ||
            trimmedLine.endsWith('*/') ||
            trimmedLine.endsWith('{') ||
            trimmedLine === '}' ||
            /^(if|else|for|while|function|try|catch|finally|switch)\s*\(/.test(trimmedLine) ||
            /^}(\s*else|\s*catch|\s*finally)?/.test(trimmedLine)) {
            return;
        }
        
        // More specific patterns that MUST end with semicolons
        const criticalSemicolonPatterns = [
            /^(let|const|var)\s+\w+\s*=\s*document\.getElementById/,  // Variable assignments with getElementById
            /^\w+\.addEventListener\s*\(/,  // addEventListener calls
            /^document\.body\.style\./,     // Direct style changes
            /^this\.style\./,              // this.style changes
        ];
        
        // Regular patterns that should have semicolons (warnings)
        const regularSemicolonPatterns = [
            /^(let|const|var)\s+\w+\s*=/,  // Other variable declarations
            /^console\./,                   // console calls
            /^alert\s*\(/,                 // alert calls
            /^return\s+/,                  // return statements
            /^\w+\.\w+\s*=/,              // Property assignments
        ];
        
        const isCriticalMissingSemicolon = criticalSemicolonPatterns.some(pattern => pattern.test(trimmedLine));
        const isRegularMissingSemicolon = regularSemicolonPatterns.some(pattern => pattern.test(trimmedLine));
        
        if ((isCriticalMissingSemicolon || isRegularMissingSemicolon) && 
            !trimmedLine.endsWith(';') && 
            !trimmedLine.endsWith('{') &&
            !trimmedLine.endsWith(')')) {
            
            if (isCriticalMissingSemicolon) {
                // Treat key statements as errors for immediate attention
                errors.push(`Line ${index + 1}: Missing semicolon on important statement: "${trimmedLine}"`);
            } else {
                warnings.push(`Line ${index + 1}: Missing semicolon: "${trimmedLine}"`);
            }
        }
    });
    
    // Check for unmatched braces, parentheses, brackets
    checkMatchingDelimiters(jsCode, '(', ')', 'parentheses', errors);
    checkMatchingDelimiters(jsCode, '[', ']', 'square brackets', errors);
    checkMatchingDelimiters(jsCode, '{', '}', 'curly braces', errors);
    
    // Check for common typos
    const commonTypos = {
        'getElementByid': 'getElementById',
        'addEventListner': 'addEventListener',
        'addEventListenr': 'addEventListener',
        'documnet': 'document'
    };
    
    Object.keys(commonTypos).forEach(typo => {
        if (jsCode.includes(typo)) {
            errors.push(`Typo detected: "${typo}" should be "${commonTypos[typo]}"`);
        }
    });
    
    return { errors, warnings };
}

// Check matching delimiters
function checkMatchingDelimiters(code, open, close, name, errors) {
    let count = 0;
    for (let char of code) {
        if (char === open) count++;
        if (char === close) count--;
        if (count < 0) {
            errors.push(`Unmatched closing ${name}`);
            return;
        }
    }
    if (count > 0) {
        errors.push(`Unmatched opening ${name} (missing ${count} closing ${name})`);
    }
}

// Show syntax errors
function showSyntaxErrors(syntaxIssues) {
    console.log('Showing syntax errors:', syntaxIssues); // Debug log
    
    let syntaxFeedback = `
        <div style="color: #e74c3c; background: linear-gradient(135deg, #fadbd8, #f8d7da); border: 2px solid #e74c3c; padding: 20px; border-radius: 15px;">
    `;
    
    if (syntaxIssues.criticalErrors.length > 0) {
        syntaxFeedback += `
            <div style="text-align: center; margin-bottom: 15px;">
                <div style="font-size: 2.5rem; margin-bottom: 10px;">⚠️</div>
                <strong style="font-size: 1.2rem;">Critical Syntax Errors Found!</strong>
            </div>
            
            <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; margin: 15px 0;">
                <strong>🔧 Critical errors to fix:</strong><br>
                ${syntaxIssues.criticalErrors.map(error => `• ${error}`).join('<br>')}
            </div>
        `;
    }
    
    if (syntaxIssues.warnings.length > 0) {
        if (syntaxIssues.criticalErrors.length === 0) {
            syntaxFeedback += `
                <div style="text-align: center; margin-bottom: 15px;">
                    <div style="font-size: 2.5rem; margin-bottom: 10px;">⚠️</div>
                    <strong style="font-size: 1.2rem;">Syntax Issues Detected!</strong>
                </div>
            `;
        }
        
        syntaxFeedback += `
            <div style="background: rgba(255,193,7,0.3); border-radius: 10px; padding: 15px; margin: 15px 0;">
                <strong>💡 Issues to fix:</strong><br>
                ${syntaxIssues.warnings.map(warning => `• ${warning}`).join('<br>')}
            </div>
        `;
    }
    
    syntaxFeedback += `
            <div style="background: rgba(0,123,255,0.1); border-radius: 10px; padding: 15px; margin: 15px 0;">
                <strong>📚 Quick fixes:</strong><br>
                • Make sure every opening HTML tag has a closing tag<br>
                • End JavaScript statements with semicolons (;)<br>
                • Check for typos in method names like getElementById<br>
                • Make sure all parentheses, brackets, and braces match
            </div>
            
            <div style="text-align: center; margin-top: 15px;">
                <p style="font-weight: bold; color: #856404;">
                    💪 Fix these syntax issues first, then try again!
                </p>
            </div>
        </div>
    `;
    
    feedback.innerHTML = syntaxFeedback;
    
    // Keep next button disabled
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.5';
    nextBtn.style.cursor = 'not-allowed';
}

// Show success with warnings
function showSuccessWithWarnings(successMessages, warningMessages) {
    let feedbackContent = `
        <div style="color: #27ae60; background: linear-gradient(135deg, #d5f4e6, #d1eddb); border: 2px solid #27ae60; padding: 20px; border-radius: 15px;">
            <div style="text-align: center; margin-bottom: 15px;">
                <div style="font-size: 3rem; margin-bottom: 10px;">🎉</div>
                <strong style="font-size: 1.3rem;">Outstanding Event Handling!</strong>
            </div>
            
            <div style="background: rgba(255,255,255,0.8); border-radius: 10px; padding: 15px; margin: 15px 0;">
                <strong>🎯 What you've mastered:</strong><br>
                ${successMessages.join('<br>')}
            </div>
    `;
    
    if (warningMessages.length > 0) {
        feedbackContent += `
            <div style="background: rgba(255,193,7,0.2); border-radius: 10px; padding: 15px; margin: 15px 0;">
                <strong>💡 Tips for cleaner code:</strong><br>
                ${warningMessages.join('<br>')}
            </div>
        `;
    }
    
    feedbackContent += `
        <div style="text-align: center; margin: 20px 0;">
            <p style="margin: 10px 0; font-size: 1.1rem;">
                🚀 <strong>You've successfully created interactive event listeners!</strong><br>
                This is the foundation of modern web interactivity.
            </p>
            
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-top: 20px;">
                <button id="view-result-btn"
                        style="background: linear-gradient(135deg, #007BFF, #4dabf7); color: white; border: none; padding: 12px 20px; border-radius: 25px; cursor: pointer; font-weight: 600; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(0,123,255,0.3); transition: all 0.3s ease;"
                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,123,255,0.4)'"
                        onmouseout="this.style.transform='translateY(0px)'; this.style.boxShadow='0 4px 15px rgba(0,123,255,0.3)'">
                    🚀 View Your Interactive Result
                </button>
            </div>
        </div>
    `;
    
    feedback.innerHTML = feedbackContent;

    // Add event listener for the result button
    setTimeout(() => {
        const viewResultBtn = document.getElementById('view-result-btn');
        if (viewResultBtn) {
            viewResultBtn.addEventListener('click', function() {
                showCodeResult(code);
            });
        }
    }, 100);
    
    // Enable next button
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
    nextBtn.style.cursor = 'pointer';
    
    // Store completion
    localStorage.setItem('partB_lesson12_remake_complete', 'true');
    
    // Add celebration effect
    setTimeout(() => {
        createSparkleEffect(nextBtn);
    }, 500);
}

// Show errors with warnings
function showErrorsWithWarnings(errorMessages, successMessages, warningMessages) {
    let feedbackContent = `
        <div style="color: #e74c3c; background: linear-gradient(135deg, #fadbd8, #f8d7da); border: 2px solid #e74c3c; padding: 20px; border-radius: 15px;">
            <div style="text-align: center; margin-bottom: 15px;">
                <div style="font-size: 2.5rem; margin-bottom: 10px;">⚠️</div>
                <strong style="font-size: 1.2rem;">Almost There! Let's Fix These Issues</strong>
            </div>
            
            <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; margin: 15px 0;">
                <strong>🔧 Issues to fix:</strong><br>
                ${errorMessages.join('<br>')}
            </div>
    `;
    
    if (successMessages.length > 0) {
        feedbackContent += `
            <div style="background: rgba(40,167,69,0.2); border-radius: 10px; padding: 15px; margin: 15px 0;">
                <strong>✅ What's working well:</strong><br>
                ${successMessages.join('<br>')}
            </div>
        `;
    }
    
    if (warningMessages.length > 0) {
        feedbackContent += `
            <div style="background: rgba(255,193,7,0.2); border-radius: 10px; padding: 15px; margin: 15px 0;">
                <strong>💡 Suggestions:</strong><br>
                ${warningMessages.join('<br>')}
            </div>
        `;
    }
    
    feedbackContent += `
        <div style="background: rgba(0,123,255,0.1); border-radius: 10px; padding: 15px; margin: 15px 0;">
            <strong>📋 Quick Requirements Recap:</strong><br>
            • HTML structure with at least one &lt;button&gt; and one &lt;div&gt;<br>
            • Unique ID attributes for interactive elements<br>
            • JavaScript using getElementById to select elements<br>
            • addEventListener method (not onclick)<br>
            • Click event that changes the page background color<br>
            • At least one hover event (mouseover/mouseout)
        </div>
    `;
    
    feedback.innerHTML = feedbackContent;
    
    // Keep next button disabled
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.5';
    nextBtn.style.cursor = 'not-allowed';
}

// Next lesson button
document.getElementById('next-lesson').addEventListener('click', function() {
    if (!this.disabled) {
        window.location.href = '/2. partB/lesson13_remake.html';
    }
});

// Use consistent localStorage key
const LESSON_STORAGE_KEY = 'partB_lesson12_remake_complete';

/**
 * Check if lesson was previously completed and restore UI state
 * This runs when the page loads to handle returning users
 */
// Fixed version of the completion check function
function checkAndRestoreCompletion() {
    setTimeout(() => {
        try {
            const isCompleted = localStorage.getItem('partB_lesson12_remake_complete') === 'true';
            
            console.log('Checking completion:', isCompleted);
            
            if (isCompleted) {
                const feedback = document.getElementById('feedback');
                const nextBtn = document.getElementById('next-lesson');
                // Fixed: Remove the steps query since it doesn't exist in your HTML
                
                console.log('Elements found:', { feedback, nextBtn });
                
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
                    
                    console.log('UI restored for completed lesson');
                } else {
                    console.log('Missing DOM elements for restoration:', { feedback: !!feedback, nextBtn: !!nextBtn });
                }
            }
        } catch (e) {
            console.log('Error checking completion status:', e);
        }
    }, 100);
}

// Also fix the initialization to be more reliable
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveDemos();
    initializeLearningExamples();
    initializePracticalExamples();
    
    // Check completion after all other initialization
    checkAndRestoreCompletion();
    
    // Initialize code editor with better template
    if (!taskEditor.value.trim()) {
        setDefaultTemplate();
    }
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