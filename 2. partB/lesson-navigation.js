// Enhanced Lesson Navigation System with Certificate Integration
class LessonNavigation {
    constructor() {
        this.lessons = [
            { id: 1, title: "HTML Structure Basics", path: "/2. partB/lesson1/lesson1_remake.html" },
            { id: 2, title: "HTML Text & Headings", path: "/2. partB/lesson2/lesson2_remake.html" },
            { id: 3, title: "Links & Images", path: "/2. partB/lesson3/lesson3_remake.html" },
            { id: 4, title: "Lists & Navigation", path: "/2. partB/lesson4/lesson4_remake.html" },
            { id: 5, title: "Semantic HTML", path: "/2. partB/lesson5/lesson5_remake.html" },
            { id: 6, title: "CSS Basics", path: "/2. partB/lesson6/lesson6_remake.html" },
            { id: 7, title: "Box Model", path: "/2. partB/lesson7/lesson7_remake.html" },
            { id: 8, title: "Flexbox Layout", path: "/2. partB/lesson8/lesson8_remake.html" },
            { id: 9, title: "CSS Positioning", path: "/2. partB/lesson9/lesson9_remake.html" },
            { id: 10, title: "JavaScript Basics", path: "/2. partB/lesson10/lesson10_remake.html" },
            { id: 11, title: "DOM Manipulation", path: "/2. partB/lesson11/lesson11_remake.html" },
            { id: 12, title: "Events & Listeners", path: "/2. partB/lesson12/lesson12_remake.html" },
            { id: 13, title: "Forms & Validation", path: "/2. partB/lesson13/lesson13_remake.html" },
            { id: 14, title: "Guided Mini Project", path: "/2. partB/lesson14/lesson14_remake.html" },
            { id: 15, title: "Final Project Challenge", path: "/2. partB/lesson15/lesson15_remake.html" }
        ];
        this.currentLesson = this.getCurrentLessonId();
        this.init();
    }

    getCurrentLessonId() {
        // Extract lesson number from current URL
        const path = window.location.pathname;
        const match = path.match(/lesson(\d+)/);
        return match ? parseInt(match[1]) : 1;
    }

    isLessonCompleted(lessonId) {
        return localStorage.getItem(`partB_lesson${lessonId}_remake_complete`) === 'true';
    }

    isCourseCompleted() {
        return localStorage.getItem('partB_course_complete') === 'true';
    }

    canAccessLesson(lessonId) {
        // Can access current lesson or any completed lesson
        if (lessonId === this.currentLesson) return true;
        if (lessonId === 1) return true; // Always can access lesson 1
        
        // Can access if previous lesson is completed
        for (let i = 1; i < lessonId; i++) {
            if (!this.isLessonCompleted(i)) {
                return false;
            }
        }
        return true;
    }

    createNavigationHTML() {
        return `
            <div class="lesson-nav-container">
                <button class="lesson-nav-btn" id="lessonNavBtn">
                    <span class="nav-icon">📚</span>
                    <span class="nav-text">Jump to Lesson</span>
                    <span class="nav-arrow">▼</span>
                    <span class="nav-hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
                <div class="lesson-nav-dropdown" id="lessonNavDropdown">
                    <div class="nav-header">
                        <span class="nav-title">Course Navigation</span>
                        <button class="nav-close" id="navCloseBtn">×</button>
                    </div>
                    <div class="nav-content">
                        ${this.generateLessonList()}
                        ${this.generateCertificateSection()}
                    </div>
                </div>
            </div>
        `;
    }

    generateLessonList() {
        return this.lessons.map(lesson => {
            const isCompleted = this.isLessonCompleted(lesson.id);
            const canAccess = this.canAccessLesson(lesson.id);
            const isCurrent = lesson.id === this.currentLesson;
            
            let statusIcon = '';
            let className = 'nav-lesson-item';
            
            if (isCurrent) {
                statusIcon = '📍';
                className += ' current';
            } else if (isCompleted) {
                statusIcon = '✅';
                className += ' completed';
            } else if (canAccess) {
                statusIcon = '🔓';
                className += ' available';
            } else {
                statusIcon = '🔒';
                className += ' locked';
            }

            const clickHandler = canAccess ? `onclick="lessonNav.navigateToLesson(${lesson.id})"` : '';
            
            return `
                <div class="${className}" ${clickHandler} data-lesson="${lesson.id}">
                    <span class="lesson-status">${statusIcon}</span>
                    <span class="lesson-info">
                        <span class="lesson-number">Lesson ${lesson.id}</span>
                        <span class="lesson-title">${lesson.title}</span>
                    </span>
                </div>
            `;
        }).join('');
    }

    generateCertificateSection() {
        const isCourseCompleted = this.isCourseCompleted();
        const allLessonsCompleted = this.lessons.every(lesson => this.isLessonCompleted(lesson.id));
        const completedCount = this.lessons.filter(lesson => this.isLessonCompleted(lesson.id)).length;

        if (isCourseCompleted) {
            // Course is completed - show certificate link
            return `
                <div class="nav-section-divider">
                    <span class="divider-text">Course Complete!</span>
                </div>
                <div class="nav-lesson-item certificate-item completed" onclick="lessonNav.navigateToCertificate()">
                    <span class="lesson-status">🏆</span>
                    <span class="lesson-info">
                        <span class="lesson-number certificate-label">Certificate</span>
                        <span class="lesson-title">Download Your Certificate</span>
                    </span>
                </div>
            `;
        } else if (allLessonsCompleted) {
            // All lessons done but course not officially completed
            return `
                <div class="nav-section-divider">
                    <span class="divider-text">Almost There!</span>
                </div>
                <div class="nav-lesson-item certificate-item available" onclick="lessonNav.navigateToLesson(15)">
                    <span class="lesson-status">🎯</span>
                    <span class="lesson-info">
                        <span class="lesson-number certificate-label">Final Step</span>
                        <span class="lesson-title">Complete Final Project</span>
                    </span>
                </div>
            `;
        } else {
            // Still in progress
            return `
                <div class="nav-section-divider">
                    <span class="divider-text">Progress: ${completedCount}/15</span>
                </div>
                <div class="nav-lesson-item certificate-item locked">
                    <span class="lesson-status">🔒</span>
                    <span class="lesson-info">
                        <span class="lesson-number certificate-label">Certificate</span>
                        <span class="lesson-title">Complete all lessons first</span>
                    </span>
                </div>
            `;
        }
    }

    createNavigationCSS() {
        const css = `
            <style>
            .lesson-nav-container {
                position: fixed;
                top: 12px;
                right: 20px;
                z-index: 1000;
            }

            .lesson-nav-btn {
                background: var(--brand, #007BFF);
                color: white;
                border: none;
                border-radius: 25px;
                padding: 12px 16px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
                transition: all 0.3s ease;
                min-width: 160px;
                position: relative;
            }

            .lesson-nav-btn:hover {
                background: #0056b3;
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(0, 123, 255, 0.4);
            }

            .nav-icon {
                font-size: 16px;
            }

            .nav-text {
                flex: 1;
                text-align: left;
            }

            .nav-arrow {
                font-size: 12px;
                transition: transform 0.3s ease;
            }

            /* Hamburger menu - hidden by default */
            .nav-hamburger {
                display: none;
                flex-direction: column;
                gap: 3px;
                width: 18px;
                height: 14px;
            }

            .nav-hamburger span {
                display: block;
                height: 2px;
                width: 100%;
                background: white;
                border-radius: 1px;
                transition: all 0.3s ease;
            }

            .lesson-nav-btn.active .nav-arrow {
                transform: rotate(180deg);
            }

            /* Hamburger animation when active */
            .lesson-nav-btn.active .nav-hamburger span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }

            .lesson-nav-btn.active .nav-hamburger span:nth-child(2) {
                opacity: 0;
            }

            .lesson-nav-btn.active .nav-hamburger span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }

            .lesson-nav-dropdown {
                position: absolute;
                top: 100%;
                right: 0;
                width: 320px;
                max-height: 400px;
                background: white;
                border: 1px solid #dde7ff;
                border-radius: 10px;
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
                opacity: 0;
                visibility: hidden;
                transform: translateY(-8px);
                transition: all 0.25s ease;
                margin-top: 6px;
                overflow: hidden;
            }

            .lesson-nav-dropdown.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .nav-header {
                background: #f8f9ff;
                padding: 8px 12px;
                border-bottom: 1px solid #eef4ff;
                display: flex;
                justify-content: space-between;
                align-items: center;
                min-height: 36px;
            }

            .nav-title {
                font-weight: 600;
                color: var(--brand, #007BFF);
                font-size: 14px;
            }

            .nav-close {
                background: none;
                border: none;
                font-size: 16px;
                cursor: pointer;
                color: #666;
                padding: 2px;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 3px;
                transition: all 0.2s ease;
            }

            .nav-close:hover {
                background: #dde7ff;
                color: #333;
                transform: scale(1.1);
            }

            .nav-content {
                max-height: 340px;
                overflow-y: auto;
                padding: 6px 0;
            }

            .nav-lesson-item {
                padding: 10px 14px;
                display: flex;
                align-items: center;
                gap: 10px;
                transition: all 0.2s ease;
                border-left: 2px solid transparent;
                font-size: 13px;
            }

            .nav-lesson-item.available,
            .nav-lesson-item.completed,
            .nav-lesson-item.current {
                cursor: pointer;
            }

            .nav-lesson-item.current {
                background: #e3f2fd;
                border-left-color: var(--brand, #007BFF);
            }

            .nav-lesson-item.completed:hover {
                background: #f0f8ff;
            }

            .nav-lesson-item.available:hover {
                background: #f8f9ff;
            }

            .nav-lesson-item.locked {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .lesson-status {
                font-size: 16px;
                width: 20px;
                text-align: center;
            }

            .lesson-info {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 2px;
            }

            .lesson-number {
                font-size: 12px;
                font-weight: 600;
                color: var(--brand, #007BFF);
            }

            .lesson-title {
                font-size: 13px;
                color: #333;
                line-height: 1.3;
            }

            .nav-lesson-item.locked .lesson-title,
            .nav-lesson-item.locked .lesson-number {
                color: #999;
            }

            /* Certificate Section Styles */
            .nav-section-divider {
                padding: 8px 14px;
                border-top: 1px solid #eef4ff;
                margin-top: 4px;
            }

            .divider-text {
                font-size: 11px;
                font-weight: 600;
                color: #888;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .certificate-item {
                background: rgba(255, 215, 0, 0.1);
                border-left: 3px solid #ffd700;
                margin: 4px 8px;
                border-radius: 6px;
            }

            .certificate-item.completed {
                background: rgba(39, 174, 96, 0.1);
                border-left-color: #27ae60;
                animation: certificatePulse 2s infinite;
            }

            .certificate-item.completed:hover {
                background: rgba(39, 174, 96, 0.15);
                transform: translateX(2px);
            }

            .certificate-item.available {
                background: rgba(243, 156, 18, 0.1);
                border-left-color: #f39c12;
            }

            .certificate-item.available:hover {
                background: rgba(243, 156, 18, 0.15);
            }

            .certificate-label {
                color: #e67e22 !important;
                font-weight: 700 !important;
            }

            .certificate-item.completed .certificate-label {
                color: #27ae60 !important;
            }

            @keyframes certificatePulse {
                0%, 100% {
                    box-shadow: 0 0 0 0 rgba(39, 174, 96, 0.3);
                }
                50% {
                    box-shadow: 0 0 0 4px rgba(39, 174, 96, 0.1);
                }
            }

            /* Mobile adjustments */
            @media (max-width: 768px) {
                .lesson-nav-container {
                    top: 80px;
                    right: 15px;
                }
                
                .lesson-nav-btn {
                    padding: 8px 12px;
                    font-size: 12px;
                    min-width: auto;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    justify-content: center;
                    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
                }
                
                .lesson-nav-btn:hover {
                    transform: none;
                    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.4);
                }
                
                /* Hide text and arrow, show hamburger on mobile */
                .nav-text,
                .nav-arrow,
                .nav-icon {
                    display: none;
                }
                
                .nav-hamburger {
                    display: flex;
                }
                
                .lesson-nav-dropdown {
                    width: calc(100vw - 30px);
                    max-width: 320px;
                    right: 0;
                    transform-origin: top right;
                }
                
                .lesson-nav-dropdown.show {
                    transform: scale(1) translateY(0);
                }
                
                .lesson-nav-dropdown:not(.show) {
                    transform: scale(0.95) translateY(-10px);
                }
            }

            /* Extra small screens */
            @media (max-width: 480px) {
                .lesson-nav-container {
                    top: 80px;
                    right: 15px;
                }
                
                .lesson-nav-btn {
                    width: 40px;
                    height: 40px;
                    padding: 6px;
                }
                
                .nav-hamburger {
                    width: 16px;
                    height: 12px;
                    gap: 2px;
                }
                
                .nav-hamburger span {
                    height: 2px;
                }
                
                .lesson-nav-dropdown {
                    width: calc(100vw - 20px);
                    max-width: 300px;
                    max-height: 60vh;
                }
                
                .nav-content {
                    max-height: calc(60vh - 60px);
                }
            }

            /* Scrollbar styling for dropdown */
            .nav-content::-webkit-scrollbar {
                width: 6px;
            }

            .nav-content::-webkit-scrollbar-track {
                background: #f1f1f1;
            }

            .nav-content::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 3px;
            }

            .nav-content::-webkit-scrollbar-thumb:hover {
                background: #a1a1a1;
            }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', css);
    }

    init() {
        // Add CSS
        this.createNavigationCSS();
        
        // Add HTML after page loads
        document.addEventListener('DOMContentLoaded', () => {
            document.body.insertAdjacentHTML('beforeend', this.createNavigationHTML());
            this.attachEventListeners();
        });
    }

    attachEventListeners() {
        const navBtn = document.getElementById('lessonNavBtn');
        const dropdown = document.getElementById('lessonNavDropdown');
        const closeBtn = document.getElementById('navCloseBtn');

        // Toggle dropdown
        navBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        // Close dropdown
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeDropdown();
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.lesson-nav-container')) {
                this.closeDropdown();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDropdown();
            }
        });
    }

    toggleDropdown() {
        const dropdown = document.getElementById('lessonNavDropdown');
        const btn = document.getElementById('lessonNavBtn');
        
        if (dropdown.classList.contains('show')) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        const dropdown = document.getElementById('lessonNavDropdown');
        const btn = document.getElementById('lessonNavBtn');
        
        // Refresh lesson list to show current completion status
        const navContent = dropdown.querySelector('.nav-content');
        navContent.innerHTML = this.generateLessonList() + this.generateCertificateSection();
        
        dropdown.classList.add('show');
        btn.classList.add('active');
    }

    closeDropdown() {
        const dropdown = document.getElementById('lessonNavDropdown');
        const btn = document.getElementById('lessonNavBtn');
        
        dropdown.classList.remove('show');
        btn.classList.remove('active');
    }

    navigateToLesson(lessonId) {
        const lesson = this.lessons.find(l => l.id === lessonId);
        if (lesson && this.canAccessLesson(lessonId)) {
            this.closeDropdown();
            setTimeout(() => {
                window.location.href = lesson.path;
            }, 200);
        } else {
            // Show a better locked message
            this.showLockedLessonMessage(lessonId);
        }
    }

    navigateToCertificate() {
        this.closeDropdown();
        setTimeout(() => {
            window.location.href = '/2. partB/certificate.html';
        }, 200);
    }

    showLockedLessonMessage(lessonId) {
        const requiredLesson = lessonId - 1;

        // Create a nicer popup instead of alert()
        const popup = document.createElement('div');
        popup.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); z-index: 10001; display: flex; align-items: center; justify-content: center;">
                <div style="background: white; padding: 30px; border-radius: 15px; text-align: center; max-width: 400px; margin: 20px;">
                    <div style="font-size: 3em; margin-bottom: 15px;">🔒</div>
                    <h3 style="color: #e74c3c; margin: 0 0 15px 0;">Lesson ${lessonId} is Locked</h3>
                    <p style="margin: 0 0 20px 0; color: #555;">Complete Lesson ${requiredLesson} first to unlock this lesson.</p>
                    <button onclick="this.parentElement.parentElement.remove()" style="background: #007BFF; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600;">Got it!</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
    }
}

// Global function to mark current lesson as complete
function markCurrentLessonComplete() {
    const currentLesson = lessonNav.currentLesson;
    localStorage.setItem(`partB_lesson${currentLesson}_remake_complete`, 'true');
    
    // Refresh navigation dropdown if it's open
    const dropdown = document.getElementById('lessonNavDropdown');
    if (dropdown && dropdown.classList.contains('show')) {
        lessonNav.openDropdown();
    }
}

// Initialize navigation system
const lessonNav = new LessonNavigation();