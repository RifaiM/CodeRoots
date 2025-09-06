// lesson-protection.js - Add this as a new file and include it on every lesson page

class LessonProtection {
    constructor() {
        this.init();
    }

    init() {
        // Run protection check immediately
        this.validateAccess();
        
        // Also check on browser back/forward navigation
        window.addEventListener('popstate', () => this.validateAccess());
        
        // Prevent programmatic navigation to locked lessons
        this.protectNavigation();
    }

    getCurrentLessonNumber() {
        const path = window.location.pathname;
        const match = path.match(/lesson(\d+)/);
        return match ? parseInt(match[1]) : 1;
    }

    isLessonCompleted(lessonNumber) {
        return localStorage.getItem(`partB_lesson${lessonNumber}_remake_complete`) === 'true';
    }

    getHighestAccessibleLesson() {
        // Start from lesson 1 and find the first incomplete lesson
        for (let i = 1; i <= 15; i++) {
            if (!this.isLessonCompleted(i)) {
                return i; // This is the next lesson they should do
            }
        }
        return 15; // All lessons completed
    }

    canAccessLesson(lessonNumber) {
        // Always allow lesson 1
        if (lessonNumber === 1) return true;
        
        // Check if all previous lessons are completed
        for (let i = 1; i < lessonNumber; i++) {
            if (!this.isLessonCompleted(i)) {
                return false;
            }
        }
        return true;
    }

    validateAccess() {
        const currentLesson = this.getCurrentLessonNumber();
        
        if (!this.canAccessLesson(currentLesson)) {
            const highestAccessible = this.getHighestAccessibleLesson();
            const redirectPath = `/2. partB/lesson${highestAccessible}_remake.html`;
            
            // Show message before redirect
            const uncompletedLesson = currentLesson - 1;
            this.showAccessDeniedMessage(uncompletedLesson, currentLesson);
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.replace(redirectPath);
            }, 2000);
            
            return false;
        }
        return true;
    }

    showAccessDeniedMessage(requiredLesson, attemptedLesson) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            text-align: center;
            max-width: 450px;
            margin: 20px;
            animation: slideIn 0.3s ease;
        `;

        modal.innerHTML = `
            <div style="font-size: 3em; margin-bottom: 15px;">🔒</div>
            <h2 style="color: #e74c3c; margin: 0 0 15px 0; font-size: 1.4em;">
                Lesson Locked
            </h2>
            <p style="margin: 0 0 20px 0; line-height: 1.6; color: #555;">
                You need to complete <strong>Lesson ${requiredLesson}</strong> before accessing Lesson ${attemptedLesson}.
            </p>
            <p style="margin: 0 0 25px 0; font-size: 0.9em; color: #777;">
                Redirecting you to the correct lesson in <span id="countdown">2</span> seconds...
            </p>
            <button onclick="window.location.href='/2. partB/lesson${requiredLesson}_remake.html'" style="
                background: linear-gradient(135deg, #007BFF, #0056b3);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                font-size: 1em;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                Go to Lesson ${requiredLesson} Now
            </button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { opacity: 0; transform: scale(0.8) translateY(-20px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
        `;
        document.head.appendChild(style);

        // Countdown timer
        let countdown = 2;
        const countdownEl = document.getElementById('countdown');
        const timer = setInterval(() => {
            countdown--;
            if (countdownEl) countdownEl.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(timer);
            }
        }, 1000);
    }

    protectNavigation() {
        // Override history methods to validate navigation
        const originalPushState = history.pushState.bind(history);
        const originalReplaceState = history.replaceState.bind(history);

        history.pushState = (...args) => {
            const url = args[2];
            if (url && this.isLessonURL(url)) {
                const lessonNumber = this.extractLessonNumber(url);
                if (lessonNumber && !this.canAccessLesson(lessonNumber)) {
                    return; // Block the navigation
                }
            }
            return originalPushState(...args);
        };

        history.replaceState = (...args) => {
            const url = args[2];
            if (url && this.isLessonURL(url)) {
                const lessonNumber = this.extractLessonNumber(url);
                if (lessonNumber && !this.canAccessLesson(lessonNumber)) {
                    return; // Block the navigation
                }
            }
            return originalReplaceState(...args);
        };
    }

    isLessonURL(url) {
        return url && url.includes('lesson') && url.includes('_remake.html');
    }

    extractLessonNumber(url) {
        const match = url.match(/lesson(\d+)/);
        return match ? parseInt(match[1]) : null;
    }
}

// Initialize protection system immediately
const lessonProtection = new LessonProtection();

// Also add this function to be called when a lesson is completed
function markCurrentLessonComplete() {
    const currentLesson = lessonProtection.getCurrentLessonNumber();
    const storageKey = `partB_lesson${currentLesson}_remake_complete`;
    
    // Mark as complete
    localStorage.setItem(storageKey, 'true');
    
    // Show completion notification
    showCompletionNotification(currentLesson);
    
    console.log(`Lesson ${currentLesson} marked as complete`);
}

function showCompletionNotification(lessonNumber) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 6px 16px rgba(39, 174, 96, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        font-weight: 600;
        max-width: 300px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2em;">✅</span>
            <div>
                <div>Lesson ${lessonNumber} Complete!</div>
                <div style="font-size: 0.85em; opacity: 0.9; margin-top: 2px;">
                    Lesson ${lessonNumber + 1} is now unlocked
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.5s ease reverse';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}