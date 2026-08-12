// Level 6: Python & Backend Dojo — Comprehensive Python Linter & Sandbox Engine
// Covers all 15 lessons: Variables → Control Flow → Functions → OOP → Async → FastAPI
(function () {
    'use strict';

    // ─────────────────────────────────────────────────────────────────────────────
    // PYTHON ERROR RULES
    // Each rule has:
    //   test   : RegExp | function(code: string) => boolean
    //   title  : Short error title
    //   hint   : HTML hint string shown to learner
    //   lessons: (optional) array of lesson numbers this most commonly applies to
    // ─────────────────────────────────────────────────────────────────────────────
    const PYTHON_ERROR_RULES = [

        // ── UNCLOSED STRINGS (all lessons) ────────────────────────────────────────
        {
            test: (code) => code.split('\n').some(line => {
                const noComment = line.split('#')[0];
                // Skip triple-quote lines
                if (noComment.includes('"""') || noComment.includes("'''")) return false;
                const dq = (noComment.match(/"/g) || []).length;
                const sq = (noComment.match(/'/g) || []).length;
                return (dq % 2 !== 0) || (sq % 2 !== 0);
            }),
            title: 'Unclosed String',
            hint: 'Found an unclosed quote. Every opening <code>"</code> or <code>\'</code> needs a matching closing quote on the same line.'
        },

        // ── TYPO: prin( instead of print( ─────────────────────────────────────────
        {
            test: /\bprin(?!t)\s*\(/i,
            title: "Typo: 'prin(' — did you mean 'print('?",
            hint: 'The built-in output function is <code>print(...)</code>.'
        },

        // ── MISSING COLON ON CONTROL FLOW (lessons 2–15) ─────────────────────────
        {
            // if x > 0  (no colon) — but NOT lines that already have `:` or are just `else`/`elif`
            test: /^\s*(?:if|elif)\b[^:\n#]+$/m,
            title: "Missing colon ':' on if/elif statement",
            hint: 'Python <code>if</code> / <code>elif</code> lines must end with a colon: <code>if x &gt; 0:</code>'
        },
        {
            test: /^\s*else\s*[^:\n#]+$/m,
            title: "Missing colon ':' on else statement",
            hint: '<code>else</code> must be followed by a colon: <code>else:</code>'
        },
        {
            test: /^\s*for\b[^:\n#]+$/m,
            title: "Missing colon ':' on for loop",
            hint: 'Python <code>for</code> loops need a colon: <code>for item in list:</code>'
        },
        {
            test: /^\s*while\b[^:\n#]+$/m,
            title: "Missing colon ':' on while loop",
            hint: 'Python <code>while</code> loops need a colon: <code>while x &gt; 0:</code>'
        },

        // ── MISSING COLON ON FUNCTIONS / CLASSES (lessons 3–6) ───────────────────
        {
            test: /^\s*def\s+\w+\s*\([^)]*\)\s*$/m,
            title: "Missing colon ':' on function definition",
            hint: 'Function definitions need a colon at the end: <code>def my_func():</code>'
        },
        {
            test: /^\s*class\s+\w+[^:\n#]*$/m,
            title: "Missing colon ':' on class definition",
            hint: 'Class definitions need a colon at the end: <code>class MyClass:</code>'
        },

        // ── MISSING COLON ON EXCEPTION HANDLING (lesson 7) ───────────────────────
        {
            test: /^\s*try\s*[^:\n#]+$/m,
            title: "Missing colon ':' on try block",
            hint: '<code>try</code> must be followed by a colon: <code>try:</code>'
        },
        {
            test: /^\s*except\b[^:\n#]*[^:]\s*$/m,
            title: "Missing colon ':' on except clause",
            hint: '<code>except</code> clauses need a colon: <code>except ValueError:</code>'
        },
        {
            test: /^\s*finally\s*[^:\n#]+$/m,
            title: "Missing colon ':' on finally block",
            hint: '<code>finally</code> must be followed by a colon: <code>finally:</code>'
        },

        // ── MISSING COLON ON ASYNC/WITH (lessons 9–10) ───────────────────────────
        {
            test: /^\s*async\s+def\s+\w+\s*\([^)]*\)\s*$/m,
            title: "Missing colon ':' on async function",
            hint: 'Async functions need a colon: <code>async def my_func():</code>'
        },
        {
            test: /^\s*with\b[^:\n#]+$/m,
            title: "Missing colon ':' on with statement",
            hint: '<code>with</code> statements need a colon: <code>with open("file.txt") as f:</code>'
        },

        // ── COMMON TYPOS & WRONG KEYWORDS ─────────────────────────────────────────
        {
            test: /\bimprot\b/i,
            title: "Typo: 'improt' — did you mean 'import'?",
            hint: 'The correct keyword is <code>import</code>. Example: <code>import os</code>'
        },
        {
            test: /\bfomr\b|\bform\s+import\b/i,
            title: "Typo: 'fomr' or 'form' — did you mean 'from'?",
            hint: 'The correct keyword is <code>from</code>. Example: <code>from os import path</code>'
        },
        {
            test: /\bpassed\s*=\s*True\b|\bpased\b/i,
            title: "Typo: 'pased' or 'passed' — did you mean 'passed'?",
            hint: "Check your variable names for spelling mistakes."
        },
        {
            test: /\bretun\b|\bretrun\b/i,
            title: "Typo: 'retun'/'retrun' — did you mean 'return'?",
            hint: 'The correct keyword is <code>return</code>. Example: <code>return result</code>'
        },
        {
            test: /\bprnt\s*\(/i,
            title: "Typo: 'prnt(' — did you mean 'print('?",
            hint: 'The correct function is <code>print(...)</code>.'
        },
        {
            test: /\blamnda\b|\blambda\s*[^:\w\s]/i,
            title: "Typo: 'lamnda' — did you mean 'lambda'?",
            hint: 'The correct keyword is <code>lambda</code>. Example: <code>square = lambda x: x ** 2</code>'
        },
        {
            test: /\bawit\b/i,
            title: "Typo: 'awit' — did you mean 'await'?",
            hint: 'The correct keyword is <code>await</code>. Example: <code>result = await fetch_data()</code>'
        },
        {
            test: /\basnyc\b|\basync(?!\s+def|\s+for|\s+with)/i,
            title: "Typo: 'asnyc' — did you mean 'async'?",
            hint: 'The correct keyword is <code>async</code>. Example: <code>async def handler():</code>'
        },

        // ── COMMON LOGIC ERRORS ────────────────────────────────────────────────────
        {
            // Assignment inside condition: `if x = 5:` (should be `==`)
            test: /^\s*(?:if|elif|while)\b[^=\n]*=[^=\n]*:/m,
            title: "Assignment '=' inside condition — did you mean '=='?",
            hint: 'Use <code>==</code> for comparison in conditions, not <code>=</code>. Example: <code>if x == 5:</code>'
        },
        {
            // Missing self in method call: `def method(name)` inside a class (no self)
            // This is tricky to detect reliably, so we skip it to avoid false positives
            // We only flag obvious ones — left out for now
            test: /(?:^|\n)(\s+)def\s+__init__\s*\(\s*\)/,
            title: "Missing 'self' parameter in __init__",
            hint: 'The <code>__init__</code> method must accept <code>self</code> as its first parameter: <code>def __init__(self):</code>'
        },

        // ── DECORATOR SYNTAX (lessons 12–13 FastAPI) ──────────────────────────────
        {
            // @app.get without a route string
            test: /^@app\.\w+\s*\(\s*\)/m,
            title: "FastAPI route missing path string",
            hint: 'FastAPI decorators need a route path: <code>@app.get("/users")</code>'
        },

        // ── FILE I/O (lesson 9) ────────────────────────────────────────────────────
        {
            // open() call not in a with statement — not an error per se but warn
            // Actually skip this — too many false positives in other contexts
            // Instead detect wrong file modes
            test: /open\s*\([^)]+,\s*["'](?!r|w|a|rb|wb|ab|r\+|w\+|a\+)[^"']+["']/,
            title: "Invalid file open mode",
            hint: 'Valid file modes are <code>"r"</code>, <code>"w"</code>, <code>"a"</code>, <code>"rb"</code>, <code>"wb"</code>. Example: <code>open("file.txt", "r")</code>'
        },

        // ── INDENTATION INDICATOR ─────────────────────────────────────────────────
        {
            // Detect mixing tabs and spaces (a common Python beginner mistake)
            test: (code) => {
                const lines = code.split('\n');
                return lines.some(line => /^ +/.test(line) && /\t/.test(line));
            },
            title: 'Mixed tabs and spaces in indentation',
            hint: 'Python requires consistent indentation. Use only spaces (2 or 4 per level) — never mix tabs and spaces.'
        },

        // ── PRINT WITHOUT PARENTHESES (Python 2 style) ───────────────────────────
        {
            test: /^\s*print\s+(?!["'(])(?!\()/m,
            title: "Python 2 'print' syntax — use print() in Python 3",
            hint: 'In Python 3, <code>print</code> is a function: <code>print("Hello")</code> not <code>print "Hello"</code>.'
        },

        // ── RAISE WITHOUT EXCEPTION CLASS (lesson 7) ─────────────────────────────
        {
            // raise without an exception type or re-raise
            test: /^\s*raise\s+[a-z_]\w*(?!\s*[:(])/m,
            title: "raise — possible missing exception type",
            hint: 'Use a built-in exception: <code>raise ValueError("message")</code> or <code>raise TypeError("...")</code>.'
        }
    ];

    // ─────────────────────────────────────────────────────────────────────────────
    // ERROR PANEL HTML  (matches Level 5 dojo-linter style exactly)
    // ─────────────────────────────────────────────────────────────────────────────
    function errorPanelHTML(icon, title, hint, raw, lineNum) {
        const locBadge = lineNum
            ? `<span class="dojo-lint-location">📍 Line ${lineNum}</span>`
            : '';
        return `<div class="dojo-lint-panel-wrap">
          <div class="dojo-lint-panel--error">
            <div class="dojo-lint-header">
              <span class="dojo-lint-icon">${icon}</span>
              <span class="dojo-lint-title">${title}</span>
              ${locBadge}
            </div>
            <div class="dojo-lint-hint">💡 ${hint}</div>
            <div class="dojo-lint-raw">${raw}</div>
          </div>
        </div>`;
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // MAIN LINTER CLASS
    // ─────────────────────────────────────────────────────────────────────────────
    class PythonDojoLinter {
        constructor() {
            this.lessonNum    = this.detectLesson();
            this.debounceTimer = null;
            this.editor       = null;
            this.terminal     = null;
            this.initialCode  = '';

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
            this.editor        = document.getElementById('pyCode');
            this.terminal      = document.getElementById('terminalScreen');
            this.lineNumberEl  = document.getElementById('lineNumbers');
            this.editorWrapper = this.editor ? this.editor.closest('.editor-with-lines') : null;
            if (!this.editor || !this.terminal) return;

            // ── localStorage draft key (unique per lesson, same convention as Level 5)
            this.draftKey = `partE_lesson${this.lessonNum}_remake_draft`;

            this.initialCode = this.editor.value;

            // ── Restore saved draft (only if non-empty — first-time users see starter code)
            const savedDraft = localStorage.getItem(this.draftKey);
            if (savedDraft !== null && savedDraft.trim() !== '') {
                this.editor.value = savedDraft;
            }

            // Build initial line numbers (after possible draft restore)
            this.buildLineNumbers();

            // Tab → 2 spaces
            this.editor.addEventListener('keydown', e => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const s = this.editor.selectionStart;
                    const v = this.editor.value;
                    this.editor.value = v.slice(0, s) + '  ' + v.slice(this.editor.selectionEnd);
                    this.editor.selectionStart = this.editor.selectionEnd = s + 2;
                }
            });

            // Live lint + line numbers + draft save on every keystroke
            this.editor.addEventListener('input', () => {
                localStorage.setItem(this.draftKey, this.editor.value); // instant — no debounce
                this.buildLineNumbers();
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => this.lintCode(), 300);
            });

            // Sync scroll of gutter with textarea
            this.editor.addEventListener('scroll', () => {
                if (this.lineNumberEl) {
                    this.lineNumberEl.scrollTop = this.editor.scrollTop;
                }
            });

            // Buttons
            const runBtn    = document.getElementById('runCode');
            const resetBtn  = document.getElementById('resetCode');
            const submitBtn = document.getElementById('submitProject');
            if (runBtn)    runBtn.addEventListener('click',    () => this.handleRun());
            if (resetBtn)  resetBtn.addEventListener('click',  () => this.handleReset());
            if (submitBtn) submitBtn.addEventListener('click', () => this.handleSubmit());

            // Auto-evaluate on page load
            setTimeout(() => this.lintCode(), 350);
        }

        // ── LINE NUMBERS ─────────────────────────────────────────────────────────
        buildLineNumbers(errorLine = null) {
            if (!this.lineNumberEl || !this.editor) return;
            const count = this.editor.value.split('\n').length;
            let html = '';
            for (let i = 1; i <= count; i++) {
                const cls = (i === errorLine) ? ' class="ln-error"' : '';
                html += `<span${cls}>${i}</span>`;
            }
            this.lineNumberEl.innerHTML = html;
            // Keep gutter scroll in sync
            this.lineNumberEl.scrollTop = this.editor.scrollTop;
        }

        highlightErrorLine(lineNum) {
            this.buildLineNumbers(lineNum);
        }

        clearErrorHighlight() {
            this.buildLineNumbers(null);
        }

        // ── LINT (called on every input + page load) ─────────────────────────────
        lintCode() {
            if (!this.editor || !this.terminal) return;
            const code = this.editor.value;
            const wrap = this.editorWrapper;

            // Always re-evaluate checklist in real time
            this.validateChecklist(code);

            if (!code.trim()) {
                if (wrap) wrap.classList.remove('dojo-lint-error', 'dojo-lint-success');
                this.clearErrorHighlight();
                this.setTerminalPrompt('> Terminal ready. Click ▶ Run Code to execute main.py');
                return;
            }

            const result = this.findError(code);
            if (result) {
                const { rule, lineNum } = result;
                if (wrap) {
                    wrap.classList.add('dojo-lint-error');
                    wrap.classList.remove('dojo-lint-success');
                }
                this.highlightErrorLine(lineNum);   // 📕 turns that line number red
                this.terminal.innerHTML = errorPanelHTML(
                    '⚠️', rule.title, rule.hint,
                    'Fix the issue above, then run your code again.',
                    lineNum
                );
            } else {
                // ✅ Error fixed — immediately restore terminal + clear red highlight
                if (wrap) {
                    wrap.classList.remove('dojo-lint-error');
                    wrap.classList.add('dojo-lint-success');
                }
                this.clearErrorHighlight();
                if (this.terminal.querySelector('.dojo-lint-panel--error')) {
                    this.setTerminalPrompt('> ✅ Looks good! Click ▶ Run Code to execute main.py');
                }
            }
        }

        // Supports both RegExp rules and function rules.
        // Returns { rule, lineNum } or null.
        findError(code) {
            for (const rule of PYTHON_ERROR_RULES) {
                let hit, lineNum = null;

                if (typeof rule.test === 'function') {
                    // Function-based rule: run custom logic
                    // For the unclosed-string rule, also find which line
                    hit = rule.test(code);
                    if (hit) {
                        // Try to find the first line that triggered it
                        const lines = code.split('\n');
                        for (let i = 0; i < lines.length; i++) {
                            const noComment = lines[i].split('#')[0];
                            if (noComment.includes('"""') || noComment.includes("'''")) continue;
                            const dq = (noComment.match(/"/g) || []).length;
                            const sq = (noComment.match(/'/g) || []).length;
                            if ((dq % 2 !== 0) || (sq % 2 !== 0)) {
                                lineNum = i + 1;
                                break;
                            }
                        }
                    }
                } else {
                    // RegExp-based rule: reset lastIndex, then exec to get position
                    rule.test.lastIndex = 0;
                    const m = rule.test.exec(code);
                    hit = m !== null;
                    if (hit && m.index != null) {
                        // Count newlines before match index to get line number
                        lineNum = code.slice(0, m.index).split('\n').length;
                    }
                    rule.test.lastIndex = 0; // always reset after exec
                }

                if (hit) return { rule, lineNum };
            }
            return null;
        }

        // ── RUN BUTTON ────────────────────────────────────────────────────────────
        handleRun() {
            const code = (this.editor?.value || '').trim();
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
            const wrap = this.editorWrapper;

            const result = this.findError(code);
            if (result) {
                const { rule, lineNum } = result;
                if (wrap) {
                    wrap.classList.add('dojo-lint-error');
                    wrap.classList.remove('dojo-lint-success');
                }
                this.highlightErrorLine(lineNum);
                this.terminal.innerHTML = errorPanelHTML(
                    '❌', rule.title, rule.hint,
                    `Python SyntaxError: ${rule.title}`,
                    lineNum
                );
                return;
            }

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

            this.validateChecklist(code);

            const items   = document.querySelectorAll('.task-checklist li');
            const allDone = items.length > 0 && Array.from(items).every(i => i.classList.contains('completed'));
            if (allDone) {
                const msg = document.createElement('div');
                msg.className = 'terminal-success-line';
                msg.textContent = '🎉 All tasks complete! Click "Complete Lesson" to claim your XP.';
                this.terminal.appendChild(msg);
            }
        }

        // ── SIMULATE print() OUTPUT ───────────────────────────────────────────────
        simulatePrint(code) {
            // Build a variable map from simple assignments
            const varMap = {};
            const assignRe = /^\s*(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([\d.]+)|(\[.*?\])|(\{.*?\}))/gm;
            let m;
            while ((m = assignRe.exec(code)) !== null) {
                varMap[m[1]] = m[2] ?? m[3] ?? m[4] ?? m[5] ?? m[6] ?? '';
            }

            const logs = [];
            const printRe = /print\(([^)]*)\)/g;
            while ((m = printRe.exec(code)) !== null) {
                let inner = m[1].trim();

                // Plain string: "hello" or 'hello'
                if (/^["'].*["']$/.test(inner)) {
                    logs.push(inner.slice(1, -1));
                    continue;
                }

                // f-string: f"..." or f'...'
                if (/^f["']/.test(inner)) {
                    const raw = inner.slice(2, -1);
                    const resolved = raw.replace(/\{(\w+)(?:[^}]*)?\}/g, (_, name) =>
                        varMap[name] !== undefined ? varMap[name] : `{${name}}`
                    );
                    logs.push(resolved);
                    continue;
                }

                // Bare variable name
                if (/^\w+$/.test(inner) && varMap[inner] !== undefined) {
                    logs.push(String(varMap[inner]));
                    continue;
                }

                // Comma-separated args: print(a, b)
                if (inner.includes(',')) {
                    const parts = inner.split(',').map(p => {
                        p = p.trim();
                        if (/^["'].*["']$/.test(p)) return p.slice(1, -1);
                        if (varMap[p] !== undefined) return varMap[p];
                        return p;
                    });
                    logs.push(parts.join(' '));
                    continue;
                }

                logs.push(inner);
            }
            return logs;
        }

        // ── RESET BUTTON ──────────────────────────────────────────────────────────
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
                // Clear saved draft — user is intentionally going back to starter code
                if (this.draftKey) localStorage.removeItem(this.draftKey);
                if (this.editorWrapper) {
                    this.editorWrapper.classList.remove('dojo-lint-error', 'dojo-lint-success');
                }
                this.buildLineNumbers();
            }
            this.setTerminalPrompt('> Terminal reset. Click ▶ Run Code to execute main.py');
            this.lintCode();
        }

        // ── CHECKLIST VALIDATION ──────────────────────────────────────────────────
        validateChecklist(code) {
            document.querySelectorAll('.task-checklist li').forEach(item => {
                const rule = item.dataset.task || item.dataset.rule || '';
                item.classList.toggle('completed', this.checkRule(rule, code));
            });
        }

        checkRule(rule, code) {
            const c = code.replace(/#.*$/gm, ''); // strip comments for checks
            switch (rule) {
                // ── Lesson 1: Essentials ─────────────────────────────────────────
                case 'variable':
                case 'variables':
                    return /^\s*\w+\s*=\s*.+/m.test(c);
                case 'print':
                case 'output':
                    return /print\s*\(/.test(c);
                case 'fstring':
                    return /f["']/.test(c);

                // ── Lesson 2: Control Flow ───────────────────────────────────────
                case 'if':
                case 'conditional':
                    return /\bif\b.+:/.test(c);
                case 'loop':
                case 'for':
                    return /\bfor\b.+:/.test(c);
                case 'while':
                    return /\bwhile\b.+:/.test(c);
                case 'comparison':
                    return /[=!<>]=|<[^=]|>[^=]/.test(c);
                case 'boolean':
                    return /\bTrue\b|\bFalse\b|\band\b|\bor\b|\bnot\b/.test(c);

                // ── Lesson 3: Functions ──────────────────────────────────────────
                case 'function':
                case 'def':
                    return /\bdef\s+\w+/.test(c);
                case 'return':
                    return /\breturn\b/.test(c);
                case 'lambda':
                    return /\blambda\b/.test(c);
                case 'args':
                case 'parameters':
                    return /\bdef\s+\w+\s*\([^)]+\)/.test(c);
                case 'default_args':
                    return /\bdef\s+\w+\s*\([^)]*=\s*[^)]+\)/.test(c);

                // ── Lesson 4: Data Structures ────────────────────────────────────
                case 'list':
                    return /\[.+\]/.test(c) || /\blist\s*\(/.test(c);
                case 'dict':
                    return /\{[^}]*:\s*[^}]+\}/.test(c) || /\bdict\s*\(/.test(c);
                case 'tuple':
                    return /\(.+,/.test(c) || /\btuple\s*\(/.test(c);
                case 'set':
                    return /\bset\s*\(/.test(c) || /\{[^:{}]+\}/.test(c);
                case 'comprehension':
                case 'list_comprehension':
                    return /\[.+\bfor\b.+\bin\b.+\]/.test(c);
                case 'dict_comprehension':
                    return /\{.+:\s*.+\bfor\b.+\bin\b.+\}/.test(c);

                // ── Lesson 5: OOP ────────────────────────────────────────────────
                case 'class':
                    return /\bclass\s+\w+/.test(c);
                case 'init':
                case '__init__':
                    return /\bdef\s+__init__\s*\(/.test(c);
                case 'self':
                    return /\bself\b/.test(c);
                case 'method':
                case 'methods':
                    return /\bdef\s+\w+\s*\(\s*self/.test(c);
                case 'instance':
                    return /\w+\s*=\s*\w+\s*\(/.test(c);

                // ── Lesson 6: Inheritance ────────────────────────────────────────
                case 'inheritance':
                    return /\bclass\s+\w+\s*\(\s*\w+\s*\)/.test(c);
                case 'super':
                    return /\bsuper\s*\(/.test(c);
                case 'override':
                    return /\bdef\s+\w+\s*\(/.test(c) && /\bsuper\s*\(/.test(c);

                // ── Lesson 7: Error Handling ─────────────────────────────────────
                case 'try':
                case 'try_except':
                    return /\btry\s*:/.test(c) && /\bexcept\b/.test(c);
                case 'except':
                    return /\bexcept\b/.test(c);
                case 'finally':
                    return /\bfinally\s*:/.test(c);
                case 'raise':
                    return /\braise\b/.test(c);
                case 'custom_exception':
                    return /\bclass\s+\w+\s*\(\s*\w*Error\w*\s*\)/.test(c);

                // ── Lesson 8: Modules ────────────────────────────────────────────
                case 'import':
                    return /\bimport\b/.test(c);
                case 'from_import':
                    return /\bfrom\b.+\bimport\b/.test(c);

                // ── Lesson 9: File I/O ───────────────────────────────────────────
                case 'file':
                case 'file_io':
                    return /\bopen\s*\(/.test(c);
                case 'with':
                case 'context_manager':
                    return /\bwith\b.+\bas\b/.test(c);
                case 'read':
                    return /\.read\s*\(/.test(c) || /\.readlines\s*\(/.test(c);
                case 'write':
                    return /\.write\s*\(/.test(c);

                // ── Lesson 10: Async ─────────────────────────────────────────────
                case 'async':
                case 'async_def':
                    return /\basync\s+def\b/.test(c);
                case 'await':
                    return /\bawait\b/.test(c);
                case 'asyncio':
                    return /\basyncio\b/.test(c);

                // ── Lesson 11: Databases ─────────────────────────────────────────
                case 'sqlite':
                case 'database':
                    return /\bsqlite3\b/.test(c);
                case 'cursor':
                    return /\.cursor\s*\(/.test(c);
                case 'execute':
                case 'query':
                    return /\.execute\s*\(/.test(c);
                case 'commit':
                    return /\.commit\s*\(/.test(c);

                // ── Lesson 12: FastAPI ───────────────────────────────────────────
                case 'fastapi':
                    return /\bFastAPI\s*\(/.test(c);
                case 'route':
                case 'endpoint':
                    return /@app\.\w+\s*\(/.test(c);
                case 'decorator':
                    return /@\w+/.test(c);
                case 'response':
                    return /\breturn\b/.test(c) && /@app\.\w+/.test(c);

                // ── Lesson 13: Auth & Security ───────────────────────────────────
                case 'hash':
                case 'hashing':
                    return /\bhashlib\b|\bbcrypt\b|\bpasslib\b/.test(c);
                case 'jwt':
                    return /\bjwt\b|\bJWT\b/.test(c);
                case 'token':
                    return /\btoken\b/i.test(c);

                // ── Lessons 14–15: Mini Project / Capstone ───────────────────────
                case 'crud':
                    return /\bdef\s+(?:get|post|put|delete|create|read|update)\b/.test(c) ||
                           /@app\.(?:get|post|put|delete)\s*\(/.test(c);
                case 'api':
                    return /\bFastAPI\b|\bFlask\b|\bDjango\b/.test(c);
                case 'model':
                    return /\bclass\s+\w+\s*\(/.test(c);

                default:
                    // No rule → pass if there's meaningful non-comment code
                    return c.replace(/^\s*$/gm, '').trim().length > 10;
            }
        }

        // ── SUBMIT BUTTON ─────────────────────────────────────────────────────────
        handleSubmit() {
            const code = (this.editor?.value || '').trim();
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

            const items   = document.querySelectorAll('.task-checklist li');
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
            // Clear the draft — lesson done, next visit should show fresh starter code
            if (this.draftKey) localStorage.removeItem(this.draftKey);

            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success',
                    title: `🎉 Lesson ${this.lessonNum} Complete!`,
                    text: `You earned +200 XP and unlocked Lesson ${this.lessonNum + 1}!`,
                    confirmButtonColor: '#2563eb',
                    confirmButtonText: '🚀 Next Lesson'
                }).then(() => {
                    const next = this.lessonNum + 1;
                    if (next <= 15) {
                        window.location.href = `../lesson${next}/lesson${next}_remake.html`;
                    } else {
                        window.location.href = '../certificate.html';
                    }
                });
            }
        }

        // ── UTIL ──────────────────────────────────────────────────────────────────
        setTerminalPrompt(text) {
            if (this.terminal) {
                this.terminal.innerHTML = `<div class="terminal-prompt">${text}</div>`;
            }
        }
    }

    new PythonDojoLinter();
})();
