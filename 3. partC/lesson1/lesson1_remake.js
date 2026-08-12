// Level 5 - Lesson 1: ES6+ Superpowers Logic & Validation Engine with Dojo Code Inspector & Import Polyfill
(function() {
    'use strict';

    function formatDojoError(err) {
        const msg = err.message || String(err);
        let friendlyTitle = 'Syntax Error Detected';
        let friendlyHint = 'Check your code syntax for missing brackets, quotes, or keywords.';

        if (/Unexpected token/i.test(msg)) {
            friendlyTitle = 'Unexpected Token Syntax Error';
            friendlyHint = 'Look out for extra or missing characters like commas, semicolons, or unmatched brackets <code>()</code> / <code>{}</code>.';
        } else if (/is not defined/i.test(msg)) {
            friendlyTitle = 'Undefined Variable or Function';
            friendlyHint = 'You referenced a variable or function that hasn\'t been declared yet. Check for spelling typos!';
        }

        const cleanMsg = msg.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        return `
        <div style="background: #fef2f2; border: 1px solid #fca5a5; border-left: 4px solid #ef4444; border-radius: 14px; padding: 18px; color: #991b1b; font-family: 'Segoe UI', Tahoma, Geneva, sans-serif; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15); margin: 10px;">
            <div style="display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 0.95rem; margin-bottom: 8px; color: #7f1d1d;">
                <span>⚠️ Dojo Code Inspector</span>
                <span style="background: #fee2e2; color: #dc2626; padding: 2px 8px; border-radius: 10px; font-size: 0.75rem;">${friendlyTitle}</span>
            </div>
            <div style="font-size: 0.85rem; line-height: 1.5; color: #7f1d1d; margin-bottom: 10px;">
                💡 <strong>Helpful Hint:</strong> ${friendlyHint}
            </div>
            <div style="background: #ffffff; border: 1px solid #fecaca; border-radius: 8px; padding: 8px 12px; font-family: monospace; font-size: 0.78rem; color: #b91c1c; overflow-x: auto; white-space: pre-wrap;">
        </div>`;
    }

    function buildLineNumbers(lineNumberEl, editorEl, errorLine = null) {
        if (!lineNumberEl || !editorEl) return;
        const count = editorEl.value.split('\n').length;
        let html = '';
        for (let i = 1; i <= count; i++) {
            const cls = (i === errorLine) ? ' class="ln-error"' : '';
            html += `<span${cls}>${i}</span>`;
        }
        lineNumberEl.innerHTML = html;
        lineNumberEl.scrollTop = editorEl.scrollTop;
    }

    function highlightErrorLine(lineNumberEl, editorEl, lineNum) {
        buildLineNumbers(lineNumberEl, editorEl, lineNum);
    }

    function clearErrorHighlight(lineNumberEl, editorEl) {
        buildLineNumbers(lineNumberEl, editorEl, null);
    }

    const defaultCode = `// 🛠️ Level 5 Lesson 1 Practice Task:

// 1. Create a user object:
const developer = {
    name: "Alex",
    role: "Frontend Developer",
    skills: ["HTML5", "CSS3", "JavaScript"]
};

// 2. Use Spread Operator (...) to create an immutable copy:
const updatedDev = { ...developer, level: "Level 5 Master" };

// 3. Use Object Destructuring to extract data:
const { name, role, skills, level } = updatedDev;

// 4. Use an Arrow Function to render UI:
const renderProfile = () => {
    // 5. Use .map() to format skills into badges:
    const skillBadges = skills.map(skill => \`<span style="background:#2563eb; color:white; padding:4px 10px; border-radius:12px; margin-right:6px; font-size:12px;">\${skill}</span>\`).join('');

    return \`
        <div style="font-family: sans-serif; padding: 20px; border-radius: 16px; background: #f8fafc; border: 1px solid #cbd5e1; max-width: 380px;">
            <h2 style="margin: 0 0 6px 0; color: #0f172a;">👤 \${name}</h2>
            <p style="margin: 0 0 8px 0; color: #64748b; font-weight: 600;">💻 \${role}</p>
            <p style="margin: 0 0 14px 0; color: #10b981; font-weight: 700; font-size: 13px;">🏆 \${level}</p>
            <div>\${skillBadges}</div>
        </div>
    \`;
};

// Render output to screen
document.getElementById('output').innerHTML = renderProfile();`;

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

            if (runBtn) runBtn.addEventListener('click', () => {
                const val = (document.getElementById('jsCode')?.value || '').trim();
                if (!val) {
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Code Editor is Empty!',
                            text: 'Please write your ES6+ code before running the preview! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                    return;
                }
                this.runCode();
            });
            if (resetBtn) resetBtn.addEventListener('click', () => this.resetCode());
            if (submitBtn) submitBtn.addEventListener('click', () => this.submitLesson());

            const lineNumberEl = document.getElementById('lineNumbers');

            // Auto-restore draft from localStorage if available (only if non-empty)
            const savedDraft = localStorage.getItem('partC_lesson1_remake_draft');
            if (savedDraft !== null && savedDraft.trim() !== '' && editor) {
                editor.value = savedDraft;
            }

            // Build initial line numbers
            buildLineNumbers(lineNumberEl, editor);

            if (editor) {
                let inputTimeout;
                editor.addEventListener('input', () => {
                    buildLineNumbers(lineNumberEl, editor);
                    localStorage.setItem('partC_lesson1_remake_draft', editor.value);
                    clearTimeout(inputTimeout);
                    inputTimeout = setTimeout(() => this.runCode(), 200);
                });

                // Sync gutter scroll with textarea scroll
                editor.addEventListener('scroll', () => {
                    if (lineNumberEl) lineNumberEl.scrollTop = editor.scrollTop;
                });
            }

            // Auto-run initial code on page load
            setTimeout(() => this.runCode(), 300);

            // Activate Dojo Linter (JS mode — no JSX)
            if (typeof DojoLinter !== 'undefined') {
                DojoLinter.init('jsCode', 'dojoLintPanel', { mode: 'js' });
            }
        }

        runCode() {
            const rawJs = (document.getElementById('jsCode')?.value || '').trim();

            if (!rawJs) {
                this.validateRequirements('');
                const iframe = document.getElementById('previewFrame');
                if (iframe) iframe.srcdoc = '';
                return;
            }

            // Convert import statements into global assignments to avoid ESM SyntaxError in script tags
            let cleanJs = rawJs.replace(/import\s+.*?from\s+['"][^'"]+['"];?/g, '');

            const iframe = document.getElementById('previewFrame');
            if (iframe) {
                // Build srcdoc via string concatenation (NOT template literals)
                // so backticks in user ES6 code (template literals) never break the outer string
                var htmlHead = [
                    '<!DOCTYPE html><html><head><meta charset="UTF-8">',
                    '<style>body { font-family: "Segoe UI", Tahoma, Geneva, sans-serif; padding: 16px; background: #ffffff; color: #0f172a; margin: 0; }</style>',
                    '</head><body>',
                    '<div id="output"></div>',
                    '<script>',
                    'window.require = function(mod) { return window[mod] || {}; };',
                    'try {'
                ].join('\n');

                var htmlTail = [
                    '} catch (e) {',
                    '  var msg = String(e.message).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");',
                    '  document.getElementById("output").innerHTML = "<div style=\'padding:16px;color:#991b1b;font-family:sans-serif\'><strong>\u26a0\ufe0f Dojo Inspector: </strong>" + msg + "</div>";',
                    '}',
                    '<\/script>',
                    '</body></html>'
                ].join('\n');

                iframe.srcdoc = htmlHead + '\n' + cleanJs + '\n' + htmlTail;
            }

            // Evaluate checklist requirements
            this.validateRequirements(rawJs);
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
                        const lineNumberEl = document.getElementById('lineNumbers');
                        if (editor) editor.value = defaultCode;
                        buildLineNumbers(lineNumberEl, editor);

                        // Clear draft from localStorage
                        localStorage.removeItem('partC_lesson1_remake_draft');

                        this.runCode();

                        Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                    }
                });
            } else {
                const editor = document.getElementById('jsCode');
                const lineNumberEl = document.getElementById('lineNumbers');
                if (editor) editor.value = defaultCode;
                buildLineNumbers(lineNumberEl, editor);
                localStorage.removeItem('partC_lesson1_remake_draft');
                this.runCode();
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
