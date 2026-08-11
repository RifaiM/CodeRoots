// Level 5 - Lesson 1: ES6+ Superpowers Logic & Validation Engine
(function() {
    'use strict';

    class Lesson1Manager {
        constructor() {
            this.init();
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.bindEvents());
            } else {
                this.bindEvents();
            }
        }

        bindEvents() {
            const runBtn = document.getElementById('runCode');
            const resetBtn = document.getElementById('resetCode');
            const submitBtn = document.getElementById('submitProject');

            if (runBtn) runBtn.addEventListener('click', () => this.runCode());
            if (resetBtn) resetBtn.addEventListener('click', () => this.resetCode());
            if (submitBtn) submitBtn.addEventListener('click', () => this.submitLesson());

            // Auto-run initial code on page load
            setTimeout(() => this.runCode(), 300);
        }

        runCode() {
            const jsVal = (document.getElementById('jsCode')?.value || '').trim();

            if (!jsVal) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Code Editor is Empty!',
                        text: 'Please write your modern ES6+ code before running preview! ⚡',
                        confirmButtonColor: '#2563eb'
                    });
                }
                return;
            }

            const iframe = document.getElementById('previewFrame');
            if (iframe) {
                const combined = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <style>
                            body { font-family: 'Plus Jakarta Sans', sans-serif; padding: 20px; background: #ffffff; color: #0f172a; margin: 0; }
                        </style>
                    </head>
                    <body>
                        <script>
                            try {
                                ${jsVal}
                            } catch (e) {
                                document.body.innerHTML = '<div style="color: #ef4444; background: #fef2f2; padding: 14px; border-radius: 10px; font-family: monospace;">⚠️ JavaScript Error: ' + e.message + '</div>';
                            }
                        </script>
                    </body>
                    </html>
                `;
                iframe.srcdoc = combined;
            }

            // Evaluate checklist requirements
            this.validateRequirements(jsVal);
        }

        resetCode() {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Reset Code?',
                    text: 'Are you sure you want to clear your code in the editor?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#ef4444',
                    cancelButtonColor: '#64748b',
                    confirmButtonText: 'Yes, reset code!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const editor = document.getElementById('jsCode');
                        if (editor) editor.value = '';
                        const iframe = document.getElementById('previewFrame');
                        if (iframe) iframe.srcdoc = '';
                        Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                    }
                });
            }
        }

        validateRequirements(jsCode) {
            const hasArrow = /=>/g.test(jsCode);
            const hasDestructuring = /const\s*\{[^}]+\}\s*=/g.test(jsCode) || /let\s*\{[^}]+\}\s*=/g.test(jsCode);
            const hasSpread = /\.\.\./g.test(jsCode);
            const hasMap = /\.map\s*\(/g.test(jsCode);

            this.updateChecklistItem('arrow', hasArrow);
            this.updateChecklistItem('destructuring', hasDestructuring);
            this.updateChecklistItem('spread', hasSpread);
            this.updateChecklistItem('map', hasMap);

            return hasArrow && hasDestructuring && hasMap;
        }

        updateChecklistItem(taskKey, isCompleted) {
            const el = document.querySelector(`[data-task="${taskKey}"]`);
            if (el) {
                if (isCompleted) {
                    el.classList.add('completed');
                } else {
                    el.classList.remove('completed');
                }
            }
        }

        submitLesson() {
            const jsVal = (document.getElementById('jsCode')?.value || '').trim();

            if (!jsVal) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Code Editor is Empty!',
                        text: 'Please write your code before submitting!',
                        confirmButtonColor: '#2563eb'
                    });
                }
                return;
            }

            const isValid = this.validateRequirements(jsVal);

            if (isValid) {
                // Save Level 5 Lesson 1 Completion
                localStorage.setItem('partC_lesson1_remake_complete', 'true');

                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Lesson 1 Passed! 🎉',
                        text: 'Awesome job! You mastered ES6+ Arrow Functions, Destructuring & .map()!',
                        confirmButtonColor: '#10b981',
                        confirmButtonText: 'Next: Lesson 2 🚀'
                    }).then(() => {
                        window.location.href = '../lesson2/lesson2_remake.html';
                    });
                }
            } else {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'info',
                        title: 'Almost There!',
                        text: 'Please make sure your code uses an arrow function () => {}, destructuring { name }, and .map()!',
                        confirmButtonColor: '#2563eb'
                    });
                }
            }
        }
    }

    new Lesson1Manager();
})();
