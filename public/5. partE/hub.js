/**
 * Level 6: Python & Backend Dojo Landing Hub Controller
 * Manages dynamic syllabus rendering, live lesson statuses, and smart resume CTA.
 */

(function() {
    'use strict';

    const level6Lessons = [
        // Chapter 1: Python Core Foundations & Control Flow
        { id: 1, chapter: 1, title: 'Python Essentials & Syntax', xp: 200, topic: 'Python Syntax' },
        { id: 2, chapter: 1, title: 'Control Flow & Logic Engines', xp: 200, topic: 'Control Flow' },
        { id: 3, chapter: 1, title: 'Functions, Scope & Lambdas', xp: 200, topic: 'Functions' },
        { id: 4, chapter: 1, title: 'Data Structures & List Comprehensions', xp: 200, topic: 'Data Structures' },

        // Chapter 2: Object-Oriented Design & System Modules
        { id: 5, chapter: 2, title: 'Object-Oriented Programming (OOP)', xp: 200, topic: 'OOP Classes' },
        { id: 6, chapter: 2, title: 'OOP Inheritance & Polymorphism', xp: 200, topic: 'Inheritance' },
        { id: 7, chapter: 2, title: 'Error & Exception Handling', xp: 200, topic: 'Exceptions' },
        { id: 8, chapter: 2, title: 'Modules, Packages & Standard Library', xp: 200, topic: 'Modules' },

        // Chapter 3: Persistence, Async & Modern Web APIs with FastAPI
        { id: 9, chapter: 3, title: 'File I/O & Data Persistence', xp: 200, topic: 'File I/O' },
        { id: 10, chapter: 3, title: 'Asynchronous Python & Asyncio', xp: 200, topic: 'Asyncio' },
        { id: 11, chapter: 3, title: 'Databases & SQL ORM Integration', xp: 200, topic: 'SQLite & ORM' },
        { id: 12, chapter: 3, title: 'RESTful Web APIs with FastAPI', xp: 200, topic: 'FastAPI' },

        // Chapter 4: Backend Security, Auth & Final Project
        { id: 13, chapter: 4, title: 'Authentication & Security Basics', xp: 200, topic: 'Security & Auth' },
        { id: 14, chapter: 4, title: 'Guided Mini Project: Task Manager API', xp: 200, topic: 'Mini API Project' },
        { id: 15, chapter: 4, title: '🏆 Final Project: Python API Logic Service', xp: 200, topic: 'Production Capstone' }
    ];

    function isLessonCompleted(id) {
        return localStorage.getItem(`partE_lesson${id}_remake_complete`) === 'true';
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

        level6Lessons.forEach(lesson => {
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
                                confirmButtonColor: '#059669'
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
        const total = level6Lessons.length;
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
                resumeBtn.innerHTML = '<span>🚀 Start Lesson 1: Python Essentials ➔</span>';
            } else {
                const nextLessonObj = level6Lessons.find(l => l.id === nextAccessibleLesson) || level6Lessons[0];
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
                certBtn.innerHTML = '<span>🏆 Claim Certificate ➔</span>';
                certDesc.textContent = 'Congratulations! You completed all 15 Python Backend projects. Download your official certificate.';
            } else {
                certBtn.className = 'cert-action-btn locked';
                certBtn.href = 'javascript:void(0)';
                certBtn.innerHTML = '<span>🔒 Complete All 15 First</span>';
                certDesc.textContent = `Finish all 15 Python and FastAPI backend projects to unlock your official Backend Architect certificate (${completedCount}/15 completed).`;
            }
        }
    }

    document.addEventListener('DOMContentLoaded', initHub);
})();
