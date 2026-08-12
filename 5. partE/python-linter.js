// Level 6: Python & Backend Dojo — Linter & Sandbox Engine
// Mirrors Level 5 lesson1_remake.js pattern exactly
(function () {
    'use strict';

    // ── Python Syntax Error Rules ───────────────────────────────────────────────
    // Keep rules TIGHT to avoid false positives on normal string edits.
    // `test` can be a RegExp OR a function(code) => boolean.
    const PYTHON_ERROR_RULES = [
        {
            // Only flag "prin(" — not "print(" and not "principal" etc.
            test: /\bprin(?!t)\s*\(/i,
            title: "Typo: 'prin(' — did you mean 'print('?",
            hint: "In Python, the built-in output function is <code>print(...)</code>."
        },
        {
            // Unclosed string: any line with an odd number of " or ' (excluding triple-quotes & comments)
            test: (code) => code.split('\n').some(line => {
                // Strip inline comment
                const noComment = line.split('#')[0];
                // Skip triple-quote lines (multi-line string openers) — 3 quotes = odd but valid
                if (noComment.includes('"""') || noComment.includes("'''")) return false;
                const dq = (noComment.match(/"/g) || []).length;
                const sq = (noComment.match(/'/g) || []).length;
                return (dq % 2 !== 0) || (sq % 2 !== 0);
            }),
            title: "Unclosed String",
            hint: "Found an unclosed quote character. Make sure every <code>\"</code> or <code>'</code> has a matching closing quote on the same line."
        },
        {
            // Flag  def foo()  with no colon at end of line (no colon before newline/EOF)
            test: /^\s*def\s+\w+\s*\([^)]*\)\s*$/m,
            title: "Missing colon ':' on function definition",
            hint: "Function definitions require a colon at the end: <code>def my_func():</code>"
        },
        {
            // Flag  if / for / while / class  with content but no colon before newline
            test: /^\s*(?:if|elif|else|for|while|class)\b[^:\n#]+$/m,
            title: "Missing colon ':' on block statement",
            hint: "Python control statements need a colon at the end: <code>if x &gt; 0:</code>"
        }
    ];

    // ── Default / starter code per lesson ───────────────────────────────────────
    // (The HTML textarea already holds the starter code; we read it on setup.)

    // ── Helpers ──────────────────────────────────────────────────────────────────
    function errorPanelHTML(icon, title, hint, raw) {
        return `<div class="dojo-lint-panel-wrap">
          <div class="dojo-lint-panel--error">
            <div class="dojo-lint-header">
              <span style="font-size:1.1rem">${icon}</span>
              <span class="dojo-lint-title">${title}</span>
            </div>
            <div class="dojo-lint-hint">💡 ${hint}</div>
            <div class="dojo-lint-raw">${raw}</div>
          </div>
        </div>`;
    }

    // ── Main class ───────────────────────────────────────────────────────────────
    class PythonDojoLinter {
        constructor() {
            this.lessonNum = this.detectLesson();
            this.debounceTimer = null;
            // Elements — resolved in setup()
            this.editor = null;
            this.terminal = null;
            this.initialCode = '';

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }

        detectLesson() {
            const m = window.location.pathname.match(/lesson(\d+)/i);
            return m ? parseInt(m[1], 10) : 1;
        }

        setup() {
            this.editor   = document.getElementById('pyCode');
            this.terminal = document.getElementById('terminalScreen');

            if (!this.editor || !this.terminal) return;

            this.initialCode = this.editor.value;

            // Tab → 2 spaces (like a real IDE)
            this.editor.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const s = this.editor.selectionStart;
                    const v = this.editor.value;
                    this.editor.value = v.slice(0, s) + '  ' + v.slice(this.editor.selectionEnd);
                    this.editor.selectionStart = this.editor.selectionEnd = s + 2;
                }
            });

            // Live lint on every keystroke (300 ms debounce)
            this.editor.addEventListener('input', () => {
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => this.lintCode(), 300);
            });

            // Button wiring
            const runBtn    = document.getElementById('runCode');
            const resetBtn  = document.getElementById('resetCode');
            const submitBtn = document.getElementById('submitProject');

            if (runBtn)    runBtn.addEventListener('click',    () => this.handleRun());
            if (resetBtn)  resetBtn.addEventListener('click',  () => this.handleReset());
            if (submitBtn) submitBtn.addEventListener('click', () => this.handleSubmit());

            // Auto-evaluate checklist + lint on page load
            setTimeout(() => this.lintCode(), 350);
        }

        // ── Lint (live, on input) ─────────────────────────────────────────────────
        lintCode() {
            if (!this.editor || !this.terminal) return;
            const code = this.editor.value;

            // Always re-evaluate checklist immediately
            this.validateChecklist(code);

            // Empty editor — clear state, leave terminal clean
            if (!code.trim()) {
                this.editor.classList.remove('dojo-lint-error', 'dojo-lint-success');
                this.setTerminalPrompt('> Terminal ready. Click ▶ Run Code to execute main.py');
                return;
            }

            // Run syntax rules
            const err = this.findError(code);
            if (err) {
                this.editor.classList.add('dojo-lint-error');
                this.editor.classList.remove('dojo-lint-success');
                this.terminal.innerHTML = errorPanelHTML(
                    '⚠️', err.title, err.hint,
                    'Fix the issue above and run again.'
                );
            } else {
                this.editor.classList.remove('dojo-lint-error');
                this.editor.classList.add('dojo-lint-success');
            }
        }

        findError(code) {
            for (const rule of PYTHON_ERROR_RULES) {
                // Support both RegExp and function-based test rules
                const matched = typeof rule.test === 'function'
                    ? rule.test(code)
                    : rule.test.test(code);
                if (matched) return rule;
            }
            return null;
        }

        // ── Run button ────────────────────────────────────────────────────────────
        handleRun() {
            const code = (this.editor ? this.editor.value : '').trim();

            // Empty → SweetAlert warning (no text in terminal)
            if (!code) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Code Editor is Empty!',
                        text: 'Please write your Python code before running! 🐍',
                        confirmButtonColor: '#2563eb'
                    });
                }
                return;
            }

            this.executePython(code);
        }

        executePython(code) {
            this.terminal.innerHTML = '<div class="terminal-prompt">> Running main.py…</div>';

            // Syntax check first
            const err = this.findError(code);
            if (err) {
                this.editor.classList.add('dojo-lint-error');
                this.editor.classList.remove('dojo-lint-success');
                this.terminal.innerHTML = errorPanelHTML(
                    '❌', err.title, err.hint,
                    `Python SyntaxError: ${err.title}`
                );
                return;
            }

            // Simulate Python print() output
            const logs = this.simulatePrint(code);

            if (logs.length > 0) {
                logs.forEach(line => {
                    const el = document.createElement('div');
                    el.className = 'terminal-output-line';
                    el.textContent = '> ' + line;
                    this.terminal.appendChild(el);
                });
            } else {
                const el = document.createElement('div');
                el.className = 'terminal-output-line';
                el.textContent = '> [Code ran with no print() output]';
                this.terminal.appendChild(el);
            }

            // Re-evaluate checklist after run
            this.validateChecklist(code);

            // Check if all done
            const items = document.querySelectorAll('.task-checklist li');
            const allDone = items.length > 0 && Array.from(items).every(i => i.classList.contains('completed'));
            if (allDone) {
                const msg = document.createElement('div');
                msg.className = 'terminal-success-line';
                msg.textContent = '🎉 All tasks complete! Click "Complete Lesson" to claim your XP.';
                this.terminal.appendChild(msg);
            }
        }

        simulatePrint(code) {
            // Resolve variable values from simple `name = "value"` or `name = 123` assignments
            const varMap = {};
            const assignRe = /^\s*(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([\d.]+))/gm;
            let m;
            while ((m = assignRe.exec(code)) !== null) {
                varMap[m[1]] = m[2] !== undefined ? m[2]
                             : m[3] !== undefined ? m[3]
                             : m[4];
            }

            const logs = [];
            // Match print(...) calls — handles multi-line gracefully
            const printRe = /print\(([^)]*)\)/g;
            while ((m = printRe.exec(code)) !== null) {
                let inner = m[1].trim();

                // Strip outer quotes for plain strings
                if (/^["'].*["']$/.test(inner)) {
                    logs.push(inner.slice(1, -1));
                    continue;
                }

                // f-string: f"..." or f'...'
                if (/^f["']/.test(inner)) {
                    const raw = inner.slice(2, -1);
                    const resolved = raw.replace(/\{(\w+)\}/g, (_, name) =>
                        varMap[name] !== undefined ? varMap[name] : `{${name}}`
                    );
                    logs.push(resolved);
                    continue;
                }

                // Bare variable name
                if (/^\w+$/.test(inner) && varMap[inner] !== undefined) {
                    logs.push(varMap[inner]);
                    continue;
                }

                // Fallback — show raw
                logs.push(inner);
            }
            return logs;
        }

        // ── Reset button ──────────────────────────────────────────────────────────
        handleReset() {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Reset Code?',
                    text: 'Are you sure you want to reset the editor to the starter code?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#ef4444',
                    cancelButtonColor: '#64748b',
                    confirmButtonText: 'Yes, reset!'
                }).then(result => {
                    if (result.isConfirmed) {
                        this.doReset();
                        Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                    }
                });
            } else {
                this.doReset();
            }
        }

        doReset() {
            if (this.editor) {
                this.editor.value = this.initialCode;
                this.editor.classList.remove('dojo-lint-error', 'dojo-lint-success');
            }
            this.setTerminalPrompt('> Terminal reset. Click ▶ Run Code to execute main.py');
            this.lintCode();
        }

        // ── Checklist ─────────────────────────────────────────────────────────────
        validateChecklist(code) {
            const items = document.querySelectorAll('.task-checklist li');
            items.forEach(item => {
                const rule = item.dataset.task || item.dataset.rule || '';
                const passed = this.checkRule(rule, code);
                if (passed) {
                    item.classList.add('completed');
                } else {
                    item.classList.remove('completed');
                }
            });
        }

        checkRule(rule, code) {
            switch (rule) {
                case 'variable':
                case 'variables':
                    // Has at least one  name = value  assignment (not inside a comment)
                    return /^\s*\w+\s*=\s*.+/m.test(code.replace(/#.*/g, ''));
                case 'print':
                case 'output':
                    return code.includes('print(');
                case 'fstring':
                    return /f["']/.test(code);
                case 'function':
                    return /\bdef\s+\w+/.test(code);
                case 'list':
                    return /\[.*\]/.test(code);
                case 'dict':
                    return /\{.*\}/.test(code);
                case 'loop':
                    return /\bfor\b|\bwhile\b/.test(code);
                case 'class':
                    return /\bclass\s+\w+/.test(code);
                case 'try':
                    return /\btry\s*:/.test(code) && /\bexcept\b/.test(code);
                default:
                    // No rule → pass if there's meaningful code
                    return code.replace(/#.*$/gm, '').trim().length > 10;
            }
        }

        // ── Submit button ─────────────────────────────────────────────────────────
        handleSubmit() {
            const code = (this.editor ? this.editor.value : '').trim();

            if (!code) {
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

            this.validateChecklist(code);

            const items  = document.querySelectorAll('.task-checklist li');
            const allDone = items.length > 0 && Array.from(items).every(i => i.classList.contains('completed'));

            if (!allDone) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Requirements Not Met!',
                        text: 'Complete all task criteria above before submitting!',
                        confirmButtonColor: '#ef4444'
                    });
                }
                return;
            }

            this.markComplete();
        }

        markComplete() {
            const key = `partE_lesson${this.lessonNum}_remake_complete`;
            localStorage.setItem(key, 'true');

            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success',
                    title: `🎉 Lesson ${this.lessonNum} Complete!`,
                    text: `You earned +200 XP and unlocked Lesson ${this.lessonNum + 1}!`,
                    confirmButtonColor: '#2563eb',
                    confirmButtonText: '🚀 Next Lesson'
                }).then(() => {
                    const next = this.lessonNum + 1;
                    window.location.href = `../lesson${next}/lesson${next}_remake.html`;
                });
            }
        }

        // ── Util ──────────────────────────────────────────────────────────────────
        setTerminalPrompt(text) {
            if (this.terminal) {
                this.terminal.innerHTML = `<div class="terminal-prompt">${text}</div>`;
            }
        }
    }

    new PythonDojoLinter();
})();
