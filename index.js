// Enhanced browser timeline data
const browsers = [
    {
        year: 1990,
        name: "WorldWideWeb",
        icon: "🌍",
        description: "The very first web browser, created by Tim Berners-Lee. It could both browse and edit web pages!",
        impact: "Birth of the Web"
    },
    {
        year: 1993,
        name: "Mosaic",
        icon: "🖼️",
        description: "First browser to display images inline with text. Made the web visual and accessible to everyone.",
        impact: "Visual Revolution"
    },
    {
        year: 1994,
        name: "Netscape Navigator",
        icon: "🧭",
        description: "Dominated the early web with 90% market share. Introduced JavaScript and many web standards.",
        impact: "Web Goes Mainstream"
    },
    {
        year: 1995,
        name: "Internet Explorer",
        icon: "💷",
        description: "Microsoft's browser that came with Windows. Started the first 'Browser War' with Netscape.",
        impact: "Browser Wars Begin"
    },
    {
        year: 2003,
        name: "Safari",
        icon: "🧭",
        description: "Apple's sleek browser that pioneered many mobile web features and web standards.",
        impact: "Mobile Web Pioneer"
    },
    {
        year: 2004,
        name: "Firefox",
        icon: "🦊",
        description: "Open-source champion that introduced tabbed browsing, extensions, and challenged IE's dominance.",
        impact: "Innovation Returns"
    },
    {
        year: 2008,
        name: "Chrome",
        icon: "🌟",
        description: "Google's speed-focused browser that revolutionized web apps and now leads the market.",
        impact: "Speed & Standards"
    },
    {
        year: 2015,
        name: "Edge",
        icon: "💎",
        description: "Microsoft's modern replacement for IE, built for today's web standards and security needs.",
        impact: "Modern Microsoft"
    }
];

let currentBrowserIndex = 0;
let isMobile = false;
let autoPlayTimer = null;
let isProgrammaticScroll = false;
let programmaticScrollTimeout = null;

const timelineContainer = document.getElementById('timelineContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Detect mobile devices
function detectMobile() {
    const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return mobileMediaQuery.matches || touchDevice;
}

// Start auto-play carousel
function startAutoPlayTimeline() {
    stopAutoPlayTimeline();
    autoPlayTimer = setInterval(() => {
        currentBrowserIndex = (currentBrowserIndex + 1) % browsers.length;
        updateTimeline();
    }, 3200);
}

// Stop auto-play carousel
function stopAutoPlayTimeline() {
    if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }
}

// Initialize timeline
function initTimeline() {
    isMobile = detectMobile();
    
    browsers.forEach((browser, index) => {
        const card = document.createElement('div');
        card.className = `timeline-card ${index === 0 ? 'active' : ''}`;
        card.innerHTML = `
            <div class="browser-icon">${browser.icon}</div>
            <div class="timeline-year">${browser.year}</div>
            <div class="timeline-title">${browser.name}</div>
            <div class="timeline-description">${browser.description}</div>
            <div style="margin-top: 15px; font-weight: 600; color: var(--brand); font-size: 0.9rem;">
                ${browser.impact}
            </div>
        `;
        
        // Add click handler to select card & restart auto-play delay
        card.addEventListener('click', () => handleCardClick(index));
        
        timelineContainer.appendChild(card);
    });

    // Pause on hover or touch
    timelineContainer.addEventListener('mouseenter', stopAutoPlayTimeline);
    timelineContainer.addEventListener('mouseleave', startAutoPlayTimeline);
    timelineContainer.addEventListener('touchstart', stopAutoPlayTimeline, { passive: true });
    timelineContainer.addEventListener('touchend', () => {
        setTimeout(startAutoPlayTimeline, 2000);
    }, { passive: true });

    // Start initial auto-play loop
    startAutoPlayTimeline();
}

// Handle card click to make it active
function handleCardClick(index) {
    currentBrowserIndex = index;
    updateTimeline();
    // Reset timer when manually clicked
    startAutoPlayTimeline();
}

// Timeline navigation with smooth auto-play scrolling
function updateTimeline() {
    const cards = timelineContainer.querySelectorAll('.timeline-card');
    cards.forEach((card, index) => {
        card.classList.toggle('active', index === currentBrowserIndex);
    });
    
    // Smooth scroll to active card
    const activeCard = cards[currentBrowserIndex];
    if (activeCard) {
        const containerWidth = timelineContainer.offsetWidth;
        const cardWidth = activeCard.offsetWidth;
        const scrollPosition = activeCard.offsetLeft - (containerWidth - cardWidth) / 2;
        
        isProgrammaticScroll = true;
        if (programmaticScrollTimeout) clearTimeout(programmaticScrollTimeout);

        timelineContainer.scrollTo({
            left: Math.max(0, scrollPosition),
            behavior: 'smooth'
        });

        programmaticScrollTimeout = setTimeout(() => {
            isProgrammaticScroll = false;
        }, 800);
    }
    
    // Update button states if buttons exist
    if (prevBtn) prevBtn.disabled = currentBrowserIndex === 0;
    if (nextBtn) nextBtn.disabled = currentBrowserIndex === browsers.length - 1;
}

// Quiz functionality
const quizQuestions = [
    {
        question: "Which browser was the first to introduce tabbed browsing as a standard feature?",
        options: [
            { text: "Internet Explorer", correct: false },
            { text: "Netscape Navigator", correct: false },
            { text: "Firefox", correct: true },
            { text: "Safari", correct: false }
        ],
        explanation: "Firefox (originally Phoenix/Firebird) popularized tabbed browsing in 2004, though some earlier browsers had experimental versions."
    },
    {
        question: "What was revolutionary about the Mosaic browser?",
        options: [
            { text: "It was the first browser", correct: false },
            { text: "It displayed images inline with text", correct: true },
            { text: "It introduced JavaScript", correct: false },
            { text: "It was mobile-friendly", correct: false }
        ],
        explanation: "Mosaic was the first browser to display images alongside text, making the web visual and much more appealing to users."
    },
    {
        question: "Which company created the first web browser?",
        options: [
            { text: "Microsoft", correct: false },
            { text: "Google", correct: false },
            { text: "CERN", correct: true },
            { text: "Netscape", correct: false }
        ],
        explanation: "Tim Berners-Lee created the first web browser 'WorldWideWeb' while working at CERN in 1990."
    }
];

let currentQuizIndex = 0;
let quizAnswered = false;

function loadQuiz() {
    const quiz = quizQuestions[currentQuizIndex];
    document.getElementById('quizQuestion').textContent = quiz.question;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    quiz.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option.text;
        button.dataset.answer = option.correct;
        button.addEventListener('click', handleQuizAnswer);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('quizFeedback').classList.remove('show');
    quizAnswered = false;
}

function handleQuizAnswer(e) {
    if (quizAnswered) return;
    
    quizAnswered = true;
    const options = document.querySelectorAll('.quiz-option');
    const isCorrect = e.target.dataset.answer === 'true';
    const quiz = quizQuestions[currentQuizIndex];
    
    options.forEach(option => {
        if (option.dataset.answer === 'true') {
            option.classList.add('correct');
        } else if (option === e.target && !isCorrect) {
            option.classList.add('incorrect');
        }
        option.style.pointerEvents = 'none';
    });
    
    const feedback = document.getElementById('quizFeedback');
    feedback.innerHTML = `
        <div style="font-size: 1.3rem; margin-bottom: 10px;">
            ${isCorrect ? '🎉 Excellent!' : '🤔 Not quite!'}
        </div>
        <div>${quiz.explanation}</div>
    `;
    feedback.classList.add('show');
    
    // Auto-advance to next question after 3 seconds
    setTimeout(() => {
        currentQuizIndex = (currentQuizIndex + 1) % quizQuestions.length;
        loadQuiz();
    }, 3000);
}

// Progress tracking function
function updateProgress() {
    
    const topics = ['website', 'html', 'css', 'javascript'];
    let completedCount = 0;
    
    // Fixed key mapping - these must match exactly what each concept page stores
    const keyMap = {
        website: 'readWebsite',
        html: 'readHTML',
        css: 'readCSS',
        javascript: 'readJavaScript'
    };
    
    topics.forEach(topic => {
        const storageKey = keyMap[topic];
        const isCompleted = localStorage.getItem(storageKey) === 'true';
        
        if (isCompleted) {
            completedCount++;
            const card = document.querySelector(`.concept-card[data-concept="${topic}"]`);
            if (card) {
                // Remove existing badge first
                const existingBadge = card.querySelector('.completed-badge');
                if (existingBadge) existingBadge.remove();
                
                // Add completed badge
                const badge = document.createElement('div');
                badge.className = 'completed-badge';
                badge.innerHTML = '✅';
                card.appendChild(badge);
                card.classList.add('completed');
            }
        }
    });
    
    // Update progress display
    document.getElementById('progressCount').textContent = completedCount;
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = (completedCount / 4) * 100 + '%';
    
    // Enable/disable next button
    const nextBtn = document.getElementById('nextBtnPartB');
    if (nextBtn) {
        if (completedCount === 4) {
            nextBtn.classList.remove('disabled');
            nextBtn.innerHTML = '✅ Complete Level 0 & Return to Dashboard';
            nextBtn.onclick = handleLevel0Completion;
        } else {
            nextBtn.classList.add('disabled');
            nextBtn.innerHTML = `🚀 Explore ${4 - completedCount} more concept card${(4 - completedCount) > 1 ? 's' : ''} to complete Level 0`;
            nextBtn.onclick = null;
        }
    }
}

// Handle Level 0 Completion & Return to Dashboard (Smooth instant redirect)
function handleLevel0Completion() {
    localStorage.setItem('level0_completed', 'true');
    window.location.href = './dashboard.html';
}

// Handle concept card clicks with enhanced feedback
function handleConceptClick(e) {
    const card = e.currentTarget;
    const concept = card.dataset.concept;
    
    // Add click animation
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
    
    // Store click time for analytics (optional)
    localStorage.setItem(`${concept}ClickTime`, Date.now().toString());
}

// Manual Progress Reset Function
function resetPartAProgress() {
    const doReset = () => {
        ['readWebsite', 'readHTML', 'readCSS', 'readJavaScript'].forEach(key => {
            localStorage.removeItem(key);
        });
        
        // Remove badges & completed styling
        document.querySelectorAll('.concept-card').forEach(card => {
            card.classList.remove('completed');
            const badge = card.querySelector('.completed-badge');
            if (badge) badge.remove();
        });
        
        updateProgress();
    };

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Reset Learning Progress?',
            text: 'Are you sure you want to reset your Part A learning progress?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#007BFF',
            confirmButtonText: 'Yes, reset progress!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                doReset();
                Swal.fire({
                    title: 'Reset Complete!',
                    text: 'Your learning progress has been reset.',
                    icon: 'success',
                    confirmButtonColor: '#007BFF'
                });
            }
        });
    } else {
        doReset();
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components (Progress is preserved across reloads!)
    initTimeline();
    updateTimeline();
    loadQuiz();
    updateProgress();
    setupTouchHandlers();

    // Bind manual reset progress button
    const resetBtn = document.getElementById('resetProgressBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetPartAProgress);
    }

    // Responsive behavior updates
    function handleResize() {
        const wasMobile = isMobile;
        isMobile = detectMobile();
        
        // If switching between mobile/desktop, update timeline display
        if (wasMobile !== isMobile) {
            updateTimeline();
        }
    }

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    // Add concept card click handlers
    document.querySelectorAll('.concept-card').forEach(card => {
        card.addEventListener('click', handleConceptClick);
    });
    
    // Animate elements on scroll
    document.querySelectorAll('.section, .concept-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initial animation for hero elements
    setTimeout(() => {
        document.querySelectorAll('.section').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 300);

    // Add keyboard navigation for timeline
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentBrowserIndex = (currentBrowserIndex - 1 + browsers.length) % browsers.length;
            updateTimeline();
            startAutoPlayTimeline();
        } else if (e.key === 'ArrowRight') {
            currentBrowserIndex = (currentBrowserIndex + 1) % browsers.length;
            updateTimeline();
            startAutoPlayTimeline();
        }
    });

    // Enhanced touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTime = 0;
    let isScrolling = false;

    function setupTouchHandlers() {
        timelineContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
        timelineContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
        timelineContainer.addEventListener('touchend', handleTouchEnd, { passive: false });
        
        // Handle scroll snapping
        timelineContainer.addEventListener('scroll', handleScroll);
    }

    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        touchStartTime = Date.now();
        isScrolling = false;
    }

    function handleTouchMove(e) {
        if (!touchStartX) return;
        
        const touchCurrentX = e.touches[0].clientX;
        const diff = touchStartX - touchCurrentX;
        
        // Determine if user is scrolling horizontally
        if (Math.abs(diff) > 10) {
            isScrolling = true;
        }
    }

    function handleTouchEnd(e) {
        if (!touchStartX) return;
        
        touchEndX = e.changedTouches[0].clientX;
        const touchDuration = Date.now() - touchStartTime;
        
        // Only handle swipe if it was quick and not a scroll
        if (touchDuration < 300 && !isScrolling) {
            handleSwipe();
        }
        
        // Reset values
        touchStartX = 0;
        touchEndX = 0;
        touchStartTime = 0;
        isScrolling = false;
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentBrowserIndex < browsers.length - 1) {
                // Swipe left - next
                currentBrowserIndex++;
                updateTimeline();
            } else if (diff < 0 && currentBrowserIndex > 0) {
                // Swipe right - previous
                currentBrowserIndex--;
                updateTimeline();
            }
        }
    }

    function handleScroll() {
        if (isProgrammaticScroll) return; // Ignore scroll events generated during smooth programmatic auto-play

        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            if (isProgrammaticScroll) return;

            const cards = timelineContainer.querySelectorAll('.timeline-card');
            const containerCenter = timelineContainer.scrollLeft + timelineContainer.offsetWidth / 2;
            let closestIndex = 0;
            let closestDistance = Infinity;
            
            cards.forEach((card, index) => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const distance = Math.abs(containerCenter - cardCenter);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });
            
            if (closestIndex !== currentBrowserIndex) {
                currentBrowserIndex = closestIndex;
                // Update without scrolling to avoid infinite loop
                const cards = timelineContainer.querySelectorAll('.timeline-card');
                cards.forEach((card, index) => {
                    card.classList.toggle('active', index === currentBrowserIndex);
                });
            }
        }, 150);
    }

    // Button event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentBrowserIndex > 0) {
                currentBrowserIndex--;
                updateTimeline();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentBrowserIndex < browsers.length - 1) {
                currentBrowserIndex++;
                updateTimeline();
            }
        });
    }

    // Listen for storage changes to update progress when user comes back from concept pages
    window.addEventListener('storage', function(e) {
        if (e.key && e.key.startsWith('read')) {
            updateProgress();
        }
    });
    
    // Also check for progress updates when page gains focus (user comes back)
    window.addEventListener('focus', function() {
        updateProgress();
    });
});

// Handle next button click
document.getElementById('nextBtnPartB').addEventListener('click', function() {
    if (!this.classList.contains('disabled')) {
        // Add celebration animation
        this.innerHTML = '🎉 Loading your coding adventure...';
        this.style.background = 'var(--success)';
        
        setTimeout(() => {
            window.location.href = '/2. partB/lesson1/lesson1_remake.html';
        }, 1000);
    } else {
        // Shake animation for disabled button
        this.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
        
        // Highlight incomplete concepts
        document.querySelectorAll('.concept-card:not(.completed)').forEach(card => {
            card.style.border = '3px solid var(--warning)';
            card.style.animation = 'pulse 1s ease-in-out 2';
            setTimeout(() => {
                card.style.border = '';
                card.style.animation = '';
            }, 2000);
        });
    }
});

// Universal Back to Top Button Auto-Initializer
function initBackToTopButton() {
    if (document.getElementById('globalBackToTopBtn')) return;

    const btn = document.createElement('button');
    btn.id = 'globalBackToTopBtn';
    btn.className = 'back-to-top-btn';
    btn.setAttribute('aria-label', 'Scroll back to top of page');
    btn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(btn);

    const toggleVisibility = () => {
        if (window.scrollY > 250) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackToTopButton);
} else {
    initBackToTopButton();
}