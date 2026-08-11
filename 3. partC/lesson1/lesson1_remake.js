// Level 5 - Lesson 1: ES6+ Superpowers Logic & Validation Engine with Real-Time Auto-Save Drafts
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
            const editor = document.getElementById('jsCode');

            if (runBtn) runBtn.addEventListener('click', () => this.runCode());
            if (resetBtn) resetBtn.addEventListener('click', () => this.resetCode());
            if (submitBtn) submitBtn.addEventListener('click', () => this.submitLesson());

            // Auto-restore draft from localStorage if available
            const savedDraft = localStorage.getItem('partC_lesson1_remake_draft');
            if (savedDraft !== null && editor) {
                editor.value = savedDraft;
            }

            if (editor) {
                editor.addEventListener('input', () => {
                    localStorage.setItem('partC_lesson1_remake_draft', editor.value);
                    this.validateRequirements(editor.value);
                });
            }

            // Auto-run initial code on page load
            setTimeout(() => this.runCode(), 300);
        }

        runCode() {
            const jsVal = (document.getElementById('jsCode')?.value || '').trim();

            if (!jsVal) {
                this.validateRequirements('');
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

                        // Clear draft from localStorage
                        localStorage.removeItem('partC_lesson1_remake_draft');

                        // Instantly clear all green checkmarks
                        this.validateRequirements('');

                        Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                    }
                });
            } else {
                const editor = document.getElementById('jsCode');
                if (editor) editor.value = '';
                localStorage.removeItem('partC_lesson1_remake_draft');
                this.validateRequirements('');
            }
        }

        validateRequirements(jsCode) {
            const code = jsCode || '';
            const hasArrow = /=>/g.test(code);
            const hasDestructuring = /const\s*\{[^}]+\}\s*=/g.test(code) || /let\s*\{[^}]+\}\s*=/g.test(code);
            const hasSpread = /\.\.\./g.test(code);
            const hasMap = /\.map\s*\(/g.test(code);

            this.updateChecklistItem('arrow', hasArrow);
            this.updateChecklistItem('destructuring', hasDestructuring);
            this.updateChecklistItem('spread', hasSpread);
            this.updateChecklistItem('map', hasMap);

            const isAllValid = hasArrow && hasDestructuring && hasSpread && hasMap;
            const submitBtn = document.getElementById('submitProject');
            if (submitBtn) {
                submitBtn.disabled = !isAllValid;
            }

            return isAllValid;
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
                        title: '🎉 Lesson 1 Complete!',
                        text: 'You unlocked ES6+ Superpowers!',
                        confirmButtonColor: '#2563eb',
                        confirmButtonText: '🚀 Go to Lesson 2'
                    }).then(() => {
                        window.location.href = '../lesson2/lesson2_remake.html';
                    });
                } else {
                    alert('🎉 Lesson 1 Complete!');
                    window.location.href = '../lesson2/lesson2_remake.html';
                }
            } else {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Requirements Not Met!',
                        text: 'Please make sure all 4 ES6+ Superpowers are used in your code!',
                        confirmButtonColor: '#ef4444'
                    });
                }
            }
        }
    }

    new Lesson1Manager();
})();
