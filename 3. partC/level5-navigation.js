// Level 5: React & Framework Dojo - Dropdown Navigation Engine
(function() {
    'use strict';

    const level5Lessons = [
        { id: 1, title: 'Lesson 1: ES6+ Superpowers' },
        { id: 2, title: 'Lesson 2: Component Mental Model' },
        { id: 3, title: 'Lesson 3: JSX Syntax & Rendering' },
        { id: 4, title: 'Lesson 4: Props & Composition' },
        { id: 5, title: 'Lesson 5: Interactivity with useState' },
        { id: 6, title: 'Lesson 6: Complex State Management' },
        { id: 7, title: 'Lesson 7: Side Effects & useEffect' },
        { id: 8, title: 'Lesson 8: Fetching REST APIs' },
        { id: 9, title: 'Lesson 9: Controlled Forms' },
        { id: 10, title: 'Lesson 10: DOM Access with useRef' },
        { id: 11, title: 'Lesson 11: SPA Routing' },
        { id: 12, title: 'Lesson 12: Building Custom Hooks' },
        { id: 13, title: 'Lesson 13: Context API & Global State' },
        { id: 14, title: 'Lesson 14: Performance Optimization' },
        { id: 15, title: 'Lesson 15: 🏆 Capstone Framework App' }
    ];

    function getCurrentLessonId() {
        const path = window.location.pathname;
        const match = path.match(/lesson(\d+)/i);
        return match ? parseInt(match[1], 10) : 1;
    }

    function isLessonUnlocked(lessonId) {
        if (lessonId <= 1) return true;
        return localStorage.getItem(`partC_lesson${lessonId - 1}_remake_complete`) === 'true';
    }

    function initLevel5Nav() {
        const header = document.querySelector('header.lesson-header');
        if (!header) return;

        const currentId = getCurrentLessonId();

        // Create Navigation Pill Container
        const container = document.createElement('div');
        container.className = 'lesson-nav-container';
        container.style.cssText = 'position: absolute; right: 16px; top: 50%; transform: translateY(-50%);';

        // Dropdown Toggle Button
        const btn = document.createElement('button');
        btn.className = 'lesson-nav-btn';
        btn.innerHTML = `📚 Jump to Lesson <span class="nav-arrow">▼</span>`;

        // Dropdown Menu
        const menu = document.createElement('div');
        menu.className = 'lesson-nav-dropdown';

        level5Lessons.forEach(lesson => {
            const unlocked = isLessonUnlocked(lesson.id);
            const item = document.createElement('a');
            item.className = `lesson-nav-item ${lesson.id === currentId ? 'active' : ''} ${!unlocked ? 'locked' : ''}`;
            
            if (unlocked) {
                item.href = `../lesson${lesson.id}/lesson${lesson.id}_remake.html`;
            } else {
                item.href = 'javascript:void(0)';
                item.onclick = () => alert(`🔒 Complete Lesson ${lesson.id - 1} to unlock ${lesson.title}!`);
            }

            item.innerHTML = `<span>${lesson.title}</span> <span>${unlocked ? (lesson.id === currentId ? '📌' : '✅') : '🔒'}</span>`;
            menu.appendChild(item);
        });

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('show');
        });

        document.addEventListener('click', () => menu.classList.remove('show'));

        container.appendChild(btn);
        container.appendChild(menu);
        header.appendChild(container);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLevel5Nav);
    } else {
        initLevel5Nav();
    }
})();
