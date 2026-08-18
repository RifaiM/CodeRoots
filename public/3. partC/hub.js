/**
 * Level 5: React & Component Dojo Landing Hub Controller
 * Manages dynamic syllabus rendering, live lesson statuses, and smart resume CTA.
 */

(function() {
    'use strict';

    const level5Lessons = [
        // Chapter 1: Modern JS & Component Fundamentals
        { id: 1, chapter: 1, title: 'ES6+ Syntax & Component Trees', xp: 150, topic: 'ES6+ & JSX' },
        { id: 2, chapter: 1, title: 'JSX Structure & Virtual DOM', xp: 150, topic: 'JSX & VDOM' },
        { id: 3, chapter: 1, title: 'Dynamic Props & Component Reusability', xp: 150, topic: 'Props' },
        { id: 4, chapter: 1, title: 'Conditional Rendering & List Mapping', xp: 150, topic: 'Lists & Keys' },

        // Chapter 2: State Management & Reactive UI with Hooks
        { id: 5, chapter: 2, title: 'Interactive State with useState()', xp: 150, topic: 'useState' },
        { id: 6, chapter: 2, title: 'Form Inputs & Controlled Components', xp: 150, topic: 'Forms & State' },
        { id: 7, chapter: 2, title: 'Side Effects & API Data with useEffect()', xp: 150, topic: 'useEffect' },
        { id: 8, chapter: 2, title: 'Lifting State Up & Prop Drilling', xp: 150, topic: 'State Architecture' },

        // Chapter 3: Advanced Hooks & Application Architecture
        { id: 9, chapter: 3, title: 'Global State with React Context API', xp: 150, topic: 'Context API' },
        { id: 10, chapter: 3, title: 'Complex State with useReducer()', xp: 150, topic: 'useReducer' },
        { id: 11, chapter: 2, title: 'Custom Reusable React Hooks', xp: 150, topic: 'Custom Hooks' },
        { id: 12, chapter: 3, title: 'Performance: useMemo() & useCallback()', xp: 150, topic: 'Performance' },

        // Chapter 4: Guided Applications & Production Projects
        { id: 13, chapter: 4, title: 'Single Page Routing with React Router', xp: 150, topic: 'SPA Routing' },
        { id: 14, chapter: 4, title: 'Guided Mini App: Real-Time Task Tracker', xp: 150, topic: 'Mini Project' },
        { id: 15, chapter: 4, title: 'Final Project: Production Component Showcase', xp: 150, topic: 'Final Project' }
    ];

    function isLessonCompleted(id) {
        return localStorage.getItem(`partC_lesson${id}_remake_complete`) === 'true';
    }

    function canAccessLesson(id) {
        if (id === 1) return true;
        if (localStorage.getItem('practice_mode_unlocked') === 'true') return true;
        for (let i = 1; i < id; i++) {
            if (!isLessonCompleted(i)) return false;
        }
        return true;
    }

    function initHub() {
        let completedCount = 0;
        let nextAccessibleLesson = 1;
        let foundNext = false;

        level5Lessons.forEach(lesson => {
            const completed = isLessonCompleted(lesson.id);
            const accessible = canAccessLesson(lesson.id);

            if (completed) {
                completedCount++;
            } else if (accessible && !foundNext) {
                nextAccessibleLesson = lesson.id;
                foundNext = true;
            }

            // Update Card Element if exists in DOM
            const card = document.getElementById(`lessonCard${lesson.id}`);
            const statusPill = document.getElementById(`statusPill${lesson.id}`);
            const actionText = document.getElementById(`actionText${lesson.id}`);

            if (card && statusPill && actionText) {
                if (completed) {
                    card.className = 'lesson-card completed';
                    card.href = `./lesson${lesson.id}/lesson${lesson.id}_remake.html`;
                    statusPill.className = 'lesson-status-pill completed';
                    statusPill.textContent = 'COMPLETED';
                    actionText.innerHTML = 'Review ➔';
                } else if (accessible) {
                    card.className = 'lesson-card available';
                    card.href = `./lesson${lesson.id}/lesson${lesson.id}_remake.html`;
                    statusPill.className = 'lesson-status-pill available';
                    statusPill.textContent = 'UP NEXT';
                    actionText.innerHTML = 'Start Project ➔';
                } else {
                    card.className = 'lesson-card locked';
                    card.href = 'javascript:void(0)';
                    card.onclick = (e) => {
                        e.preventDefault();
                        if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                icon: 'info',
                                title: 'Lesson Locked',
                                text: `Please complete Lesson ${lesson.id - 1} before accessing Lesson ${lesson.id}.`,
                                confirmButtonColor: '#A33B24'
                            });
                        }
                    };
                    statusPill.className = 'lesson-status-pill locked';
                    statusPill.textContent = 'LOCKED';
                    actionText.innerHTML = 'Locked';
                }
            }
        });

        // Update Progress Bar & Percentage
        const total = level5Lessons.length;
        const pct = Math.round((completedCount / total) * 100);

        const progressFill = document.getElementById('heroProgressFill');
        const progressText = document.getElementById('heroProgressText');
        const completedStat = document.getElementById('statCompletedProjects');

        if (progressFill) progressFill.style.width = `${pct}%`;
        if (progressText) progressText.textContent = `${completedCount} of ${total} Projects Completed (${pct}%)`;
        if (completedStat) completedStat.textContent = `${completedCount} / ${total}`;

        // Update Smart Resume CTA Button
        const resumeBtn = document.getElementById('heroResumeBtn');
        if (resumeBtn) {
            if (completedCount === total || isLessonCompleted(15)) {
                resumeBtn.href = './certificate.html';
                resumeBtn.innerHTML = '<span>View Official Certificate ➔</span>';
            } else if (completedCount === 0) {
                resumeBtn.href = './lesson1/lesson1_remake.html';
                resumeBtn.innerHTML = '<span>Start Lesson 1: ES6+ Superpowers ➔</span>';
            } else {
                const nextLessonObj = level5Lessons.find(l => l.id === nextAccessibleLesson) || level5Lessons[0];
                resumeBtn.href = `./lesson${nextLessonObj.id}/lesson${nextLessonObj.id}_remake.html`;
                resumeBtn.innerHTML = `<span>Continue Lesson ${nextLessonObj.id}: ${nextLessonObj.title} ➔</span>`;
            }
        }

        // Update Certificate Card at bottom
        const certBtn = document.getElementById('certActionBtn');
        const certDesc = document.getElementById('certDescText');
        if (certBtn && certDesc) {
            if (completedCount === total || isLessonCompleted(15)) {
                certBtn.className = 'cert-action-btn unlocked';
                certBtn.href = './certificate.html';
                certBtn.onclick = null;
                certBtn.innerHTML = '<span>Claim Certificate ➔</span>';
                certDesc.textContent = 'Congratulations! You completed all 15 React Dojo exercises. Download your official Level 5 Certificate.';
            } else {
                certBtn.className = 'cert-action-btn locked';
                certBtn.href = 'javascript:void(0)';
                certBtn.onclick = null;
                certBtn.innerHTML = '<span>Complete All 15 First</span>';
                certDesc.textContent = `Finish all 15 interactive React exercises to unlock your official Level 5 Certificate (${completedCount}/15 completed).`;
            }
        }
    }

    document.addEventListener('DOMContentLoaded', initHub);
    window.addEventListener('novicodes:xp_updated', initHub);
    window.addEventListener('storage', initHub);
    window.addEventListener('pageshow', initHub);
})();
