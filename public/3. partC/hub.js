/**
 * Level 5: React & Framework Dojo Landing Hub Controller
 * Manages dynamic syllabus rendering, live lesson statuses, and smart resume CTA.
 */

(function() {
    'use strict';

    const level5Lessons = [
        // Chapter 1: React Fundamentals & Component Trees
        { id: 1, chapter: 1, title: 'ES6+ Superpowers for Frameworks', xp: 150, topic: 'ES6 Syntax' },
        { id: 2, chapter: 1, title: 'The Component Mental Model', xp: 150, topic: 'Component Tree' },
        { id: 3, chapter: 1, title: 'JSX Syntax & Dynamic Rendering', xp: 150, topic: 'JSX Engine' },
        { id: 4, chapter: 1, title: 'Component Props & Composition', xp: 150, topic: 'Props' },

        // Chapter 2: State Hooks & Interactive UI
        { id: 5, chapter: 2, title: 'Interactivity with useState', xp: 150, topic: 'useState Hook' },
        { id: 6, chapter: 2, title: 'Complex & Nested State Management', xp: 150, topic: 'Nested State' },
        { id: 7, chapter: 2, title: 'Side Effects & useEffect Hook', xp: 150, topic: 'useEffect Hook' },
        { id: 8, chapter: 2, title: 'Fetching REST APIs in React', xp: 150, topic: 'API Fetching' },

        // Chapter 3: Controlled Inputs, Routing & DOM Access
        { id: 9, chapter: 3, title: 'Controlled Forms & Validation', xp: 150, topic: 'Controlled Forms' },
        { id: 10, chapter: 3, title: 'DOM Access & useRef Hook', xp: 150, topic: 'useRef Hook' },
        { id: 11, chapter: 3, title: 'Single Page Application Routing', xp: 150, topic: 'SPA Routing' },
        { id: 12, chapter: 3, title: 'Building Custom Hooks', xp: 150, topic: 'Custom Hooks' },

        // Chapter 4: Global State, Custom Hooks & Capstone
        { id: 13, chapter: 4, title: 'Context API & Global State', xp: 150, topic: 'Context API' },
        { id: 14, chapter: 4, title: 'Performance Optimization & Memo', xp: 150, topic: 'React.memo' },
        { id: 15, chapter: 4, title: '🏆 Capstone Framework Web App', xp: 150, topic: 'Final Capstone' }
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
                    statusPill.textContent = '✅ Completed';
                    actionText.innerHTML = 'Review ➔';
                } else if (accessible) {
                    card.className = 'lesson-card available';
                    card.href = `./lesson${lesson.id}/lesson${lesson.id}_remake.html`;
                    statusPill.className = 'lesson-status-pill available';
                    statusPill.textContent = '⚡ Up Next';
                    actionText.innerHTML = 'Start Project ➔';
                } else {
                    card.className = 'lesson-card locked';
                    card.href = 'javascript:void(0)';
                    card.onclick = (e) => {
                        e.preventDefault();
                        if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                icon: 'info',
                                title: '🔒 Lesson Locked',
                                text: `Please complete Lesson ${lesson.id - 1} before accessing Lesson ${lesson.id}.`,
                                confirmButtonColor: '#0284c7'
                            });
                        }
                    };
                    statusPill.className = 'lesson-status-pill locked';
                    statusPill.textContent = '🔒 Locked';
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
                resumeBtn.innerHTML = '<span>🏆 View Official Certificate ➔</span>';
            } else if (completedCount === 0) {
                resumeBtn.href = './lesson1/lesson1_remake.html';
                resumeBtn.innerHTML = '<span>🚀 Start Lesson 1: ES6+ Superpowers ➔</span>';
            } else {
                const nextLessonObj = level5Lessons.find(l => l.id === nextAccessibleLesson) || level5Lessons[0];
                resumeBtn.href = `./lesson${nextLessonObj.id}/lesson${nextLessonObj.id}_remake.html`;
                resumeBtn.innerHTML = `<span>⚡ Continue Lesson ${nextLessonObj.id}: ${nextLessonObj.title} ➔</span>`;
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
                certBtn.innerHTML = '<span>🏆 Claim Certificate ➔</span>';
                certDesc.textContent = 'Congratulations! You completed all 15 React Dojo projects. Download your official certificate.';
            } else {
                certBtn.className = 'cert-action-btn locked';
                certBtn.href = 'javascript:void(0)';
                certBtn.onclick = (e) => {
                    e.preventDefault();
                    if (typeof window.showCertLockWarning === 'function') {
                        window.showCertLockWarning('Level 5', completedCount, total);
                    } else if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'info',
                            title: 'Level 5 Certificate Locked 📜',
                            text: `You have completed ${completedCount} of ${total} projects. Finish all 15 to claim your official certificate!`,
                            confirmButtonColor: '#2563eb'
                        });
                    }
                };
                certBtn.innerHTML = '<span>🔒 Complete All 15 First</span>';
                certDesc.textContent = `Finish all 15 modern React framework projects to unlock your official React Specialist certificate (${completedCount}/15 completed).`;
            }
        }
    }

    document.addEventListener('DOMContentLoaded', initHub);
})();
