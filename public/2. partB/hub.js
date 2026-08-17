/**
 * Level 4: DOM Dojo Landing Hub Controller
 * Manages dynamic syllabus rendering, live lesson statuses, and smart resume CTA.
 */

(function() {
    'use strict';

    const level4Lessons = [
        // Chapter 1: HTML & Web Architecture
        { id: 1, chapter: 1, title: "Interactive HTML Page Structure", xp: 100, topic: "DOM Foundations" },
        { id: 2, chapter: 1, title: "Typography & Heading Hierarchy", xp: 100, topic: "Typography" },
        { id: 3, chapter: 1, title: "Interactive Links & Dynamic Media", xp: 100, topic: "Media Elements" },
        { id: 4, chapter: 1, title: "Lists & Dropdown Drawer Navigation", xp: 100, topic: "Drawer UI" },
        { id: 5, chapter: 1, title: "Semantic HTML Web Architecture", xp: 100, topic: "Semantic Tags" },

        // Chapter 2: Modern Styling & Layout Engines
        { id: 6, chapter: 2, title: "CSS Styling & Theme Engine", xp: 100, topic: "CSS Variables" },
        { id: 7, chapter: 2, title: "CSS Box Model & Element Bounds", xp: 100, topic: "Box Model" },
        { id: 8, chapter: 2, title: "Flexbox Layout & Alignment Engine", xp: 100, topic: "Flexbox" },
        { id: 9, chapter: 2, title: "CSS Positioning & Floating Modals", xp: 100, topic: "Positioning" },

        // Chapter 3: JavaScript DOM Interactivity & Events
        { id: 10, chapter: 3, title: "JavaScript Logic & State Variables", xp: 100, topic: "State & Logic" },
        { id: 11, chapter: 3, title: "Live DOM Manipulation & Queries", xp: 100, topic: "DOM Queries" },
        { id: 12, chapter: 3, title: "Event Listeners & User Interactions", xp: 100, topic: "Event Engine" },
        { id: 13, chapter: 3, title: "Controlled Forms & Live Input Validation", xp: 100, topic: "Form Validation" },

        // Chapter 4: Guided Applications & Final Projects
        { id: 14, chapter: 4, title: "Guided Dashboard Mini Application", xp: 100, topic: "Mini Project" },
        { id: 15, chapter: 4, title: "🏆 Final Project: Practical Web Widget", xp: 100, topic: "Final Project" }
    ];

    function isLessonCompleted(id) {
        return localStorage.getItem(`partB_lesson${id}_remake_complete`) === 'true';
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

        level4Lessons.forEach(lesson => {
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
                                confirmButtonColor: '#2563eb'
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
        const total = level4Lessons.length;
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
                resumeBtn.innerHTML = '<span>🚀 Start Lesson 1: Page Structure ➔</span>';
            } else {
                const nextLessonObj = level4Lessons.find(l => l.id === nextAccessibleLesson) || level4Lessons[0];
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
                certDesc.textContent = 'Congratulations! You completed all 15 DOM Dojo exercises. Download your official Level 4 Certificate.';
            } else {
                certBtn.className = 'cert-action-btn locked';
                certBtn.href = 'javascript:void(0)';
                certBtn.onclick = null;
                certBtn.innerHTML = '<span>🔒 Complete All 15 First</span>';
                certDesc.textContent = `Finish all 15 interactive JavaScript exercises to unlock your official Level 4 Certificate (${completedCount}/15 completed).`;
            }
        }
    }

    document.addEventListener('DOMContentLoaded', initHub);
})();
