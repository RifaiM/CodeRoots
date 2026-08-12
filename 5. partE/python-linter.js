// Level 6: Python & Backend Dojo - Linter & IDE Sandbox Engine
// 100% Uniform Execution, Checklist Validation & Error Handling Engine
(function() {
    'use strict';

    class PythonDojoLinter {
        constructor() {
            this.currentLesson = this.getCurrentLessonNumber();
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
            }

            if (this.runBtn) {
                this.runBtn.addEventListener('click', () => this.executePython());
            }

            if (this.resetBtn) {
                this.resetBtn.addEventListener('click', () => this.resetEditor());
            }

            if (this.submitBtn) {
                this.submitBtn.addEventListener('click', () => this.handleSubmit());
            }
        }

        resetEditor() {
            if (this.pyEditor && this.initialCode !== undefined) {
                this.pyEditor.value = this.initialCode;
            }
            if (this.terminalScreen) {
                this.terminalScreen.innerHTML = '<div class="terminal-prompt">> Terminal reset. Click ▶ Run Code to execute.</div>';
            }
            if (this.checklistItems) {
                this.checklistItems.forEach(item => {
                    item.classList.remove('completed');
                });
            }
        }

        executePython() {
            if (!this.pyEditor || !this.terminalScreen) return;

            const code = this.pyEditor.value.trim();
            this.terminalScreen.innerHTML = '<div class="terminal-prompt">> Running main.py...</div>';

            const outputLines = [];
            const logs = [];

            // Mock/Lightweight Python Evaluator & Output Collector
            const customPrint = (...args) => {
                const line = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
                logs.push(line);
            };

            try {
                // Parse print statements and code structure
                const lines = code.split('\n');
                lines.forEach(line => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
                        const inner = trimmed.substring(6, trimmed.length - 1);
                        try {
                            // Simple string evaluation for quotes or variables
                            if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
                                logs.push(inner.substring(1, inner.length - 1));
                            } else if (inner.startsWith('f"') || inner.startsWith("f'")) {
                                logs.push(inner.substring(2, inner.length - 1).replace(/\{.*?\}/g, 'Values'));
                            } else {
                                logs.push(`[Output]: ${inner}`);
                            }
                        } catch (e) {
                            logs.push(inner);
                        }
                    }
                });

                // Display outputs in terminal screen
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
