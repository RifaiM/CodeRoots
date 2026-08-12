// Enhanced Lesson Navigation System with Certificate Integration
class LessonNavigation {
    constructor() {
        this.lessons = [
            { id: 1, title: "Interactive HTML Page Structure", path: "/2. partB/lesson1/lesson1_remake.html" },
            { id: 2, title: "Typography & Heading Hierarchy", path: "/2. partB/lesson2/lesson2_remake.html" },
            { id: 3, title: "Interactive Links & Dynamic Media", path: "/2. partB/lesson3/lesson3_remake.html" },
            { id: 4, title: "Lists & Dropdown Drawer Navigation", path: "/2. partB/lesson4/lesson4_remake.html" },
            { id: 5, title: "Semantic HTML Web Architecture", path: "/2. partB/lesson5/lesson5_remake.html" },
            { id: 6, title: "CSS Styling & Theme Engine", path: "/2. partB/lesson6/lesson6_remake.html" },
            { id: 7, title: "CSS Box Model & Element Bounds", path: "/2. partB/lesson7/lesson7_remake.html" },
            { id: 8, title: "Flexbox Layout & Alignment Engine", path: "/2. partB/lesson8/lesson8_remake.html" },
            { id: 9, title: "CSS Positioning & Floating Modals", path: "/2. partB/lesson9/lesson9_remake.html" },
            { id: 10, title: "JavaScript Logic & State Variables", path: "/2. partB/lesson10/lesson10_remake.html" },
            { id: 11, title: "Live DOM Manipulation & Queries", path: "/2. partB/lesson11/lesson11_remake.html" },
            { id: 12, title: "Event Listeners & User Interactions", path: "/2. partB/lesson12/lesson12_remake.html" },
            { id: 13, title: "Controlled Forms & Live Input Validation", path: "/2. partB/lesson13/lesson13_remake.html" },
            { id: 14, title: "Guided Dashboard Mini Application", path: "/2. partB/lesson14/lesson14_remake.html" },
            { id: 15, title: "🏆 Capstone Practical Web Application", path: "/2. partB/lesson15/lesson15_remake.html" }
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
                        <button class="nav-close" id="navCloseBtn">&times;</button>
                    </div>
                    <div class="nav-content">
                        ${this.generateLessonListHTML()}
                        ${this.generateCertificateSection()}
                    </div>
                </div>
            </div>
        `;
    }

    generateLessonListHTML() {
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

            const hrefAttr = canAccess ? `href="../lesson${lesson.id}/lesson${lesson.id}_remake.html"` : 'href="javascript:void(0)"';
            const clickAttr = !canAccess ? `onclick="alert('🔒 Complete Lesson ${lesson.id - 1} to unlock Lesson ${lesson.id}!')"` : '';

            return `
                <a class="${className}" ${hrefAttr} ${clickAttr}>
                    <span class="lesson-status">${statusIcon}</span>
                    <span class="lesson-info">
                        <span class="lesson-number">Lesson ${lesson.id}</span>
                        <span class="lesson-title">${lesson.title}</span>
                    </span>
                </a>
            `;
        }).join('');
    }

    generateCertificateSection() {
        const completedCount = this.getCompletedCount();
        const isCourseCompleted = this.isCourseCompleted() || completedCount === 15;
        const isLesson15Completed = this.isLessonCompleted(15);
        
        let sectionHTML = '';
        
        if (isCourseCompleted || isLesson15Completed) {
            sectionHTML = `
                <div class="nav-section-divider">
                    <span class="divider-text">Course Complete!</span>
                </div>
                <a class="nav-lesson-item certificate-item completed" href="../certificate.html" role="button" aria-label="Download your official course certificate">
                    <span class="lesson-status">🏆</span>
                    <span class="lesson-info">
                        <span class="lesson-number certificate-label">Certificate</span>
                        <span class="lesson-title">Download Your Certificate</span>
                    </span>
                </a>
            `;
        } else if (this.canAccessLesson(15)) {
            sectionHTML = `
                <div class="nav-section-divider">
                    <span class="divider-text">Almost There!</span>
                </div>
                <a class="nav-lesson-item certificate-item available" href="../lesson15/lesson15_remake.html" role="button" aria-label="Complete final capstone project">
                    <span class="lesson-status">🎯</span>
                    <span class="lesson-info">
                        <span class="lesson-number certificate-label">Final Step</span>
                        <span class="lesson-title">Complete Capstone Project</span>
                    </span>
                </a>
            `;
        } else {
            sectionHTML = `
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
        
        return sectionHTML;
    }

    getCompletedCount() {
        let count = 0;
        for (let i = 1; i <= 15; i++) {
            if (this.isLessonCompleted(i)) count++;
        }
        return count;
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.mount());
        } else {
            this.mount();
        }
    }

    mount() {
        const header = document.querySelector('header.lesson-header');
        if (!header) return;

        // Create navigation elements
        const navContainer = document.createElement('div');
        navContainer.innerHTML = this.createNavigationHTML();
        
        // Append to header
        const navElement = navContainer.firstElementChild;
        header.appendChild(navElement);

        // Bind events
        this.bindEvents(navElement);
    }

    bindEvents(navElement) {
        const btn = navElement.querySelector('#lessonNavBtn');
        const dropdown = navElement.querySelector('#lessonNavDropdown');
        const closeBtn = navElement.querySelector('#navCloseBtn');

        if (!btn || !dropdown) return;

        const toggleDropdown = (e) => {
            if (e) e.stopPropagation();
            const isOpen = dropdown.classList.contains('show');
            if (isOpen) {
                this.closeDropdown(btn, dropdown);
            } else {
                this.openDropdown(btn, dropdown);
            }
        };

        btn.addEventListener('click', toggleDropdown);

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeDropdown(btn, dropdown);
            });
        }

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!navElement.contains(e.target)) {
                this.closeDropdown(btn, dropdown);
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDropdown(btn, dropdown);
            }
        });
    }

    openDropdown(btn, dropdown) {
        btn.classList.add('active');
        dropdown.classList.add('show');
    }

    closeDropdown(btn, dropdown) {
        btn.classList.remove('active');
        dropdown.classList.remove('show');
    }
}

// Auto-initialize
new LessonNavigation();