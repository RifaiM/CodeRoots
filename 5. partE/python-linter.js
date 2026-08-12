// Level 6: Python & Backend Dojo - Intelligent Linter & IDE Sandbox Engine
// 100% Uniform with Level 5 (SweetAlert Modals for Empty & Reset, Clean Live Preview)
(function() {
    'use strict';

    const PYTHON_ERROR_RULES = [
        {
            test: /\bprin\s*\(/i,
            title: "Typo: 'prin(' instead of 'print('",
            hint: "Did you mean <code>print(...)</code>? In Python, printing output requires <code>print(...)</code>."
        },
        {
            test: /\bdef\s+[\w_]+\s*\([^)]*\)\s*$/m,
            title: "Missing Colon ':' on Function Definition",
            hint: "Function definitions in Python require a colon <code>:</code> at the end of the line (e.g., <code>def my_func():</code>)."
        },
        {
            test: /\b(?:if|elif|else|for|while|class)\b[^:\n]+$/m,
            title: "Missing Colon ':'",
            hint: "Python block statements require a colon <code>:</code> at the end of the line."
        }
    ];

    class PythonDojoLinter {
        constructor() {
            this.currentLesson = this.getCurrentLessonNumber();
            this.debounceTimer = null;
            this.init();
        }

        getCurrentLessonNumber() {
            const path = window.location.pathname;
            const match = path.match(/lesson(\d+)/i);
            return match ? parseInt(match[1], 10) : 1;
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }

        setup() {
            this.pyEditor = document.getElementById('pyCode');
            this.runBtn = document.getElementById('runCode');
            this.resetBtn = document.getElementById('resetCode');
            this.submitBtn = document.getElementById('submitProject');
            this.terminalScreen = document.getElementById('terminalScreen');
            this.checklistItems = document.querySelectorAll('.task-checklist li');

            if (this.pyEditor) {
                this.initialCode = this.pyEditor.value;

                // VS Code Tab Key Handler (Insert 2 spaces)
                this.pyEditor.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        const start = this.pyEditor.selectionStart;
                        const end = this.pyEditor.selectionEnd;
                        const val = this.pyEditor.value;

                        this.pyEditor.value = val.substring(0, start) + "  " + val.substring(end);
                        this.pyEditor.selectionStart = this.pyEditor.selectionEnd = start + 2;
                    }
                });

                // Live Preview Input Debounce Linter (300ms) matching Level 5
                this.pyEditor.addEventListener('input', () => {
                    clearTimeout(this.debounceTimer);
                    this.debounceTimer = setTimeout(() => this.lintLiveCode(), 300);
                });

                // Initial Linter & Task Checklist Evaluation on Page Settlement
                setTimeout(() => {
                    this.lintLiveCode();
                }, 400);
            }

            if (this.runBtn) {
                this.runBtn.addEventListener('click', () => this.executePython());
            }

            if (this.resetBtn) {
                this.resetBtn.addEventListener('click', () => this.confirmReset());
            }

            if (this.submitBtn) {
                this.submitBtn.addEventListener('click', () => this.handleSubmit());
            }
        }

        confirmReset() {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: '🔄 Reset Code?',
                    text: 'Are you sure you want to reset the editor to the starter code?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#2563eb',
                    cancelButtonColor: '#64748b',
                    confirmButtonText: 'Yes, Reset',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.resetEditor();
                    }
                });
            } else {
                this.resetEditor();
            }
        }

        resetEditor() {
            if (this.pyEditor && this.initialCode !== undefined) {
                this.pyEditor.value = this.initialCode;
                this.pyEditor.classList.remove('dojo-lint-error', 'dojo-lint-success');
            }
            if (this.terminalScreen) {
                this.terminalScreen.innerHTML = '<div class="terminal-prompt">> Terminal reset. Click ▶ Run Code to execute main.py</div>';
            }
            this.lintLiveCode();
        }

        lintLiveCode() {
            if (!this.pyEditor || !this.terminalScreen) return;
            const code = this.pyEditor.value;

            // Evaluate Task Checklist Requirements Live
            this.validateChecklist(code, []);

            // If empty, clear linter state cleanly matching Level 5
            if (!code.trim()) {
                this.pyEditor.classList.remove('dojo-lint-error', 'dojo-lint-success');
                this.terminalScreen.innerHTML = '<div class="terminal-prompt">> Terminal ready. Click ▶ Run Code to execute main.py</div>';
                return;
            }      }

            // Check against live syntax linter rules
            let foundError = null;
            for (let i = 0; i < PYTHON_ERROR_RULES.length; i++) {
                const rule = PYTHON_ERROR_RULES[i];
                if (rule.test.test(code)) {
                    foundError = rule;
                    break;
                }
            }

            if (foundError) {
                this.pyEditor.classList.add('dojo-lint-error');
                this.pyEditor.classList.remove('dojo-lint-success');
                this.terminalScreen.innerHTML = `
                    <div class="dojo-lint-panel-wrap">
                        <div class="dojo-lint-panel--error">
                            <div class="dojo-lint-header">
                                <span style="font-size: 1.1rem;">⚠️</span>
                                <span class="dojo-lint-title">${foundError.title}</span>
                            </div>
                            <div class="dojo-lint-hint">💡 ${foundError.hint}</div>
                            <div class="dojo-lint-raw">Python Syntax Error detected. Please review your code above.</div>
                        </div>
                    </div>
                `;
            } else {
                this.pyEditor.classList.remove('dojo-lint-error');
                this.pyEditor.classList.add('dojo-lint-success');
            }
        }

        executePython() {
            if (!this.pyEditor || !this.terminalScreen) return;

            const code = this.pyEditor.value.trim();

            // 1. Empty Code Check -> Show Warning Modal matching Level 5
            if (!code) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: '⚠️ Code Required',
                        text: 'Please write your Python code in the editor before running!',
                        icon: 'warning',
                        confirmButtonColor: '#2563eb',
                        confirmButtonText: 'Got It'
                    });
                }
                this.terminalScreen.innerHTML = '<div class="terminal-prompt">> Terminal ready. Click ▶ Run Code to execute main.py</div>';
                return;
            }

            this.terminalScreen.innerHTML = '<div class="terminal-prompt">> Running main.py...</div>';

            const logs = [];
            let syntaxErrorFound = null;

            // Linter syntax check
            for (let i = 0; i < PYTHON_ERROR_RULES.length; i++) {
                const rule = PYTHON_ERROR_RULES[i];
                if (rule.test.test(code)) {
                    syntaxErrorFound = rule;
                    break;
                }
            }

            if (syntaxErrorFound) {
                this.pyEditor.classList.add('dojo-lint-error');
                this.pyEditor.classList.remove('dojo-lint-success');
                this.terminalScreen.innerHTML = `
                    <div class="dojo-lint-panel-wrap">
                        <div class="dojo-lint-panel--error">
                            <div class="dojo-lint-header">
                                <span style="font-size: 1.1rem;">❌</span>
                                <span class="dojo-lint-title">${syntaxErrorFound.title}</span>
                            </div>
                            <div class="dojo-lint-hint">💡 ${syntaxErrorFound.hint}</div>
                            <div class="dojo-lint-raw">Python SyntaxError: ${syntaxErrorFound.title}</div>
                        </div>
                    </div>
                `;
                return;
            }

            try {
                const lines = code.split('\n');
                lines.forEach(line => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
                        const inner = trimmed.substring(6, trimmed.length - 1);
                        try {
                            if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
                                logs.push(inner.substring(1, inner.length - 1));
                            } else if (inner.startsWith('f"') || inner.startsWith("f'")) {
                                const formatted = inner.substring(2, inner.length - 1).replace(/\{(\w+)\}/g, (match, varName) => {
                                    const varRegex = new RegExp(`\\b${varName}\\s*=\\s*(?:"([^"]+)"|'([^']+)'|(\\d+))`);
                                    const m = code.match(varRegex);
                                    return m ? (m[1] || m[2] || m[3]) : match;
                                });
                                logs.push(formatted);
                            } else {
                                logs.push(inner);
                            }
                        } catch (e) {
                            logs.push(inner);
                        }
                    }
                });

                if (logs.length > 0) {
                    logs.forEach(log => {
                        const lineEl = document.createElement('div');
                        lineEl.className = 'terminal-output-line';
                        lineEl.textContent = `> ${log}`;
                        this.terminalScreen.appendChild(lineEl);
                    });
                } else {
                    const lineEl = document.createElement('div');
                    lineEl.className = 'terminal-output-line';
                    lineEl.textContent = '> [Code executed successfully with zero errors]';
                    this.terminalScreen.appendChild(lineEl);
                }

                // Evaluate Task Checklist Requirements
                this.validateChecklist(code, logs);

            } catch (err) {
                const errEl = document.createElement('div');
                errEl.className = 'terminal-error-line';
                errEl.textContent = `❌ Python SyntaxError: ${err.message}`;
                this.terminalScreen.appendChild(errEl);
            }
        }

        validateChecklist(code, logs) {
            let completedCount = 0;
            const totalTasks = this.checklistItems.length;

            this.checklistItems.forEach(item => {
                const reqRule = item.dataset.task || item.dataset.rule;
                let passed = false;

                if (reqRule) {
                    if ((reqRule === 'variable' || reqRule === 'variables') && (code.includes('=') && !code.trim().startsWith('#'))) passed = true;
                    if ((reqRule === 'print' || reqRule === 'output') && code.includes('print(')) passed = true;
                    if (reqRule === 'function' && code.includes('def ')) passed = true;
                    if (reqRule === 'list' && (code.includes('[') && code.includes(']'))) passed = true;
                    if (reqRule === 'dict' && (code.includes('{') && code.includes('}'))) passed = true;
                    if (reqRule === 'loop' && (code.includes('for ') || code.includes('while '))) passed = true;
                    if (reqRule === 'class' && code.includes('class ')) passed = true;
                    if (reqRule === 'try' && code.includes('try:') && code.includes('except')) passed = true;
                } else {
                    passed = code.length > 20;
                }

                if (passed) {
                    item.classList.add('completed');
                    completedCount++;
                } else {
                    item.classList.remove('completed');
                }
            });

            if (completedCount >= totalTasks && totalTasks > 0) {
                const successMsg = document.createElement('div');
                successMsg.className = 'terminal-success-line';
                successMsg.textContent = '🎉 All Task Requirements Passed! Click Complete Lesson below to claim +200 XP.';
                this.terminalScreen.appendChild(successMsg);
            }
        }

        handleSubmit() {
            this.executePython();
            const uncompleted = Array.from(this.checklistItems).some(item => !item.classList.contains('completed'));

            if (uncompleted) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: '⚠️ Unfinished Requirements',
                        text: 'Please complete all task criteria above before submitting!',
                        icon: 'warning',
                        confirmButtonColor: '#2563eb'
                    });
                }
            } else {
                this.markLessonComplete();
            }
        }

        markLessonComplete() {
            const key = `partE_lesson${this.currentLesson}_remake_complete`;
            if (localStorage.getItem(key) !== 'true') {
                localStorage.setItem(key, 'true');

                if (typeof Swal !== 'undefined') {
                    setTimeout(() => {
                        Swal.fire({
                            title: '🎉 Lesson Complete!',
                            text: `You have successfully completed Level 6 Lesson ${this.currentLesson} and earned +200 XP!`,
                            icon: 'success',
                            confirmButtonColor: '#2563eb',
                            confirmButtonText: 'Continue Training'
                        });
                    }, 400);
                }
            }
        }
    }

    new PythonDojoLinter();
})();
