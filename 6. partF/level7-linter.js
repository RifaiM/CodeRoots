/**
 * Level 7 Dojo Inspector — Multi-mode Code Linter & Validation Engine
 * NoviCodes Platform | Track 7A (DevOps) · 7B (Python/SQL/Auth) · 7C (Next.js)
 *
 * Usage in any Level 7 lesson:
 *   Level7Linter.init('editorId', 'lintPanelId', { mode: 'python' | 'sql' | 'nextjs' | 'yaml' | 'bash' });
 *   Level7Linter.check(codeString);
 *
 * Checklist Engine:
 *   Level7Linter.initChecklist(tasks, { editorId, submitBtnId, onAllPassed });
 *   Level7Linter.runChecklist(codeString);
 */
(function () {
    'use strict';

    // ─── Shared Style Injection ────────────────────────────────────────────────
    (function injectStyles() {
        if (document.getElementById('l7-linter-styles')) return;
        var s = document.createElement('style');
        s.id = 'l7-linter-styles';
        s.textContent = [
            /* Lint error panel */
            '.l7-lint-error{background:linear-gradient(135deg,#fef2f2,#fff5f5);border:1px solid #fca5a5;border-left:4px solid #ef4444;border-radius:10px;padding:14px 16px;margin:10px 0;animation:l7SlideIn .15s ease}',
            /* Lint warning panel */
            '.l7-lint-warn{background:linear-gradient(135deg,#fffbeb,#fefce8);border:1px solid #fcd34d;border-left:4px solid #f59e0b;border-radius:10px;padding:14px 16px;margin:10px 0;animation:l7SlideIn .15s ease}',
            /* Lint success panel */
            '.l7-lint-ok{background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid #86efac;border-left:4px solid #22c55e;border-radius:10px;padding:12px 16px;margin:10px 0;animation:l7SlideIn .15s ease}',
            '.l7-lint-header{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px}',
            '.l7-lint-icon{font-size:.95rem;flex-shrink:0}',
            '.l7-lint-title{font-weight:800;font-size:.83rem}',
            '.l7-lint-error .l7-lint-title{color:#7f1d1d}',
            '.l7-lint-warn .l7-lint-title{color:#92400e}',
            '.l7-lint-badge{font-size:.70rem;font-weight:700;padding:2px 8px;border-radius:20px;margin-left:auto;white-space:nowrap}',
            '.l7-lint-error .l7-lint-badge{background:#fee2e2;color:#dc2626;font-family:"Fira Code",monospace}',
            '.l7-lint-warn .l7-lint-badge{background:#fef3c7;color:#b45309;font-family:"Fira Code",monospace}',
            '.l7-lint-hint{font-size:.80rem;line-height:1.55;color:#92400e;background:rgba(255,255,255,.65);border-radius:6px;padding:6px 10px;margin-top:6px}',
            '.l7-lint-error .l7-lint-hint{color:#991b1b}',
            /* Textarea border states */
            'textarea.l7-lint-error-border{border-left:3px solid #ef4444!important}',
            'textarea.l7-lint-ok-border{border-left:3px solid #22c55e!important}',
            /* Checklist styles */
            '.l7-checklist{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px}',
            '.l7-checklist li{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;font-size:.88rem;color:#475569;font-weight:600;transition:all .25s ease}',
            '.l7-checklist li .l7-check-icon{font-size:1.1rem;flex-shrink:0;margin-top:1px;transition:transform .2s ease}',
            '.l7-checklist li.l7-done{background:#f0fdf4;border-color:#86efac;color:#166534}',
            '.l7-checklist li.l7-done .l7-check-icon{transform:scale(1.15)}',
            '.l7-checklist li code{background:#e2e8f0;padding:1px 6px;border-radius:5px;font-family:"Fira Code",monospace;font-size:.78rem}',
            '.l7-checklist li.l7-done code{background:#dcfce7;color:#166534}',
            /* Slide-in keyframe */
            '@keyframes l7SlideIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}'
        ].join('');
        document.head.appendChild(s);
    })();

    // ─── Utility ──────────────────────────────────────────────────────────────

    function stripLineComments(code, commentChar) {
        // Strip single-line comments (# for Python, -- for SQL, // for JS)
        var pattern = commentChar === '#'  ? /#[^\n]*/g
                    : commentChar === '--' ? /--[^\n]*/g
                    :                       /\/\/[^\n]*/g;
        return code.replace(pattern, '');
    }

    function countChar(str, ch) {
        return (str.match(new RegExp('\\' + ch, 'g')) || []).length;
    }

    // ─── ERROR RULE BANKS ─────────────────────────────────────────────────────

    var PYTHON_RULES = [
        { test: /\bprin(?!t)\s*\(/i,         title: "Typo: 'prin(' — did you mean 'print('?",   hint: 'The output function in Python is <code>print(...)</code>.' },
        { test: /^\s*def\s+\w+\s*\([^)]*\)\s*$/m, title: "Missing colon on <code>def</code>",   hint: 'Function definitions must end with a colon: <code>def my_func():</code>' },
        { test: /^\s*class\s+\w+[^:\n#]*$/m,  title: "Missing colon on <code>class</code>",     hint: 'Class definitions must end with a colon: <code>class MyClass:</code>' },
        { test: /^\s*(?:if|elif)\b[^:\n#]+$/m,title: "Missing colon on <code>if/elif</code>",   hint: 'Conditionals need a colon: <code>if x > 0:</code>' },
        { test: /^\s*else\s*[^:\n#]+$/m,      title: "Missing colon on <code>else</code>",      hint: '<code>else</code> must be followed by a colon: <code>else:</code>' },
        { test: /^\s*for\b[^:\n#]+$/m,        title: "Missing colon on <code>for</code>",       hint: 'For loops need a colon: <code>for item in items:</code>' },
        { test: /^\s*while\b[^:\n#]+$/m,      title: "Missing colon on <code>while</code>",     hint: 'While loops need a colon: <code>while x > 0:</code>' },
        { test: /^\s*try\s*[^:\n#]+$/m,       title: "Missing colon on <code>try</code>",       hint: '<code>try</code> must be followed by a colon: <code>try:</code>' },
        { test: /^\s*except[^:\n#]*$/m,       title: "Missing colon on <code>except</code>",    hint: '<code>except</code> must be followed by a colon: <code>except Exception as e:</code>' },
        {
            test: function(code) {
                return code.split('\n').some(function(line) {
                    var c = stripLineComments(line, '#');
                    if (c.includes('"""') || c.includes("'''")) return false;
                    var dq = (c.match(/"/g) || []).length;
                    var sq = (c.match(/'/g) || []).length;
                    return (dq % 2 !== 0) || (sq % 2 !== 0);
                });
            },
            title: 'Unclosed String Detected',
            hint: 'Every opening <code>"</code> or <code>\'</code> must have a matching closing quote on the same line.'
        },
        { test: /\bimport\s+\*\s+from\b/,     title: "Python doesn't use <code>import * from</code>", hint: 'Python import syntax is: <code>from module import something</code> or <code>import module</code>' },
    ];

    var SQL_RULES = [
        { test: /\bSELCT\b/i,  title: "Typo: 'SELCT' — did you mean 'SELECT'?", hint: 'SQL keyword is <code>SELECT</code>.' },
        { test: /\bFORM\b/i,   title: "Typo: 'FORM' — did you mean 'FROM'?",   hint: 'SQL keyword is <code>FROM</code>.' },
        { test: /\bWHER\b(?!E)/i, title: "Typo: 'WHER' — did you mean 'WHERE'?", hint: 'SQL keyword is <code>WHERE</code>.' },
        { test: /\bINSERT\s+INTO\b(?![\s\S]*VALUES\b)/i, title: "INSERT INTO is missing VALUES", hint: '<code>INSERT INTO table (...) VALUES (...);</code>' },
        {
            test: function(code) {
                var stripped = stripLineComments(code, '--').trim();
                // If there's meaningful SQL content (SELECT/INSERT/UPDATE/CREATE/DELETE), it should end with ;
                if (/\b(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\b/i.test(stripped)) {
                    return !/;\s*$/.test(stripped);
                }
                return false;
            },
            title: 'SQL statement may be missing a semicolon <code>;</code>',
            hint: 'Most SQL statements should end with a semicolon: <code>SELECT * FROM users;</code>'
        },
        {
            test: function(code) {
                var opens = (code.match(/\(/g) || []).length;
                var closes = (code.match(/\)/g) || []).length;
                return opens !== closes;
            },
            title: 'Unmatched parentheses',
            hint: 'Check that every <code>(</code> has a matching <code>)</code>.'
        },
    ];

    var NEXTJS_RULES = [
        {
            test: function(code) {
                var hasHooks = /\b(useState|useEffect|useRef|useCallback|useMemo|useContext)\s*\(/.test(code);
                var hasDirective = /^\s*['"]use client['"]/m.test(code);
                return hasHooks && !hasDirective;
            },
            title: "Missing <code>'use client'</code> directive",
            hint: 'React hooks like <code>useState</code> and <code>useEffect</code> require the <code>\'use client\'</code> directive at the very top of the file.'
        },
        {
            test: function(code) {
                var hasServerAction = /export\s+async\s+function/.test(code) && !/^\s*['"]use server['"]/m.test(code) && !/^\s*['"]use client['"]/m.test(code);
                // Only flag if code looks like a server action file (has revalidatePath, redirect, db calls)
                return hasServerAction && /\b(revalidatePath|revalidateTag|redirect|cookies|headers)\s*\(/.test(code);
            },
            title: "Missing <code>'use server'</code> directive for Server Action",
            hint: 'Server Actions require <code>\'use server\'</code> at the top of the file or function. Example: <code>\'use server\'\\nexport async function myAction() { ... }</code>'
        },
        {
            test: function(code) {
                // Check for basic unmatched JSX tags (very simple check)
                var opens = (code.match(/<[A-Z][A-Za-z]*\b[^/]*>/g) || []).length;
                var selfClose = (code.match(/<[A-Z][A-Za-z]*\b[^>]*\/>/g) || []).length;
                var closes = (code.match(/<\/[A-Z][A-Za-z]*>/g) || []).length;
                return (opens - selfClose) > closes + 2; // allow some tolerance
            },
            title: 'Possible unmatched JSX component tags',
            hint: 'Make sure every JSX component opening tag like <code>&lt;MyComponent&gt;</code> has a matching closing tag <code>&lt;/MyComponent&gt;</code> or is self-closing <code>&lt;MyComponent /&gt;</code>.'
        },
        {
            test: /\bexport default async function\s+\w+\s*\(\s*\)\s*\{[^}]*\breturn\b[^}]*\}/,
            title: "Async Server Components can't use hooks directly",
            hint: 'Async Server Components (<code>async function Page()</code>) cannot use React hooks. Move hook logic into a separate Client Component with <code>\'use client\'</code>.'
        },
    ];

    var YAML_RULES = [
        {
            test: function(code) {
                return code.split('\n').some(function(line) {
                    // Detect tab indentation (YAML uses spaces)
                    return /^\t/.test(line);
                });
            },
            title: 'YAML uses spaces, not tabs for indentation',
            hint: 'YAML is indentation-sensitive and requires <strong>spaces</strong> (not tabs). Check your editor settings and replace any tab characters with 2 or 4 spaces.'
        },
        {
            test: /:\s*\n\s*-\s*\n/,
            title: 'Possible empty YAML list item',
            hint: 'A YAML list item under a key should have a value: <code>- name: my-step</code>'
        },
    ];

    var BASH_RULES = [
        { test: /git\s+init\s+\./,          title: "Incorrect: <code>git init .</code>",   hint: 'The correct command is just <code>git init</code> (no dot). The dot is used with other commands like <code>git add .</code>' },
        { test: /git\s+commit\s+['"][^'"]+['"]/i, title: "Missing <code>-m</code> flag on git commit", hint: 'To add a commit message, use: <code>git commit -m "your message"</code>' },
    ];

    var RULE_BANKS = {
        python: PYTHON_RULES,
        sql:    SQL_RULES,
        nextjs: NEXTJS_RULES,
        yaml:   YAML_RULES,
        bash:   BASH_RULES,
    };

    // ─── Linter Core ──────────────────────────────────────────────────────────

    var _editorId  = null;
    var _panelId   = null;
    var _mode      = 'python';
    var _debounceTimer = null;

    function renderPanel(panelEl, type, title, hint, badge) {
        panelEl.innerHTML = [
            '<div class="l7-lint-' + type + '">',
            '  <div class="l7-lint-header">',
            '    <span class="l7-lint-icon">' + (type === 'error' ? '⚠️' : type === 'warn' ? '💡' : '✅') + '</span>',
            '    <span class="l7-lint-title">' + title + '</span>',
            badge ? '<span class="l7-lint-badge">' + badge + '</span>' : '',
            '  </div>',
            hint ? '<div class="l7-lint-hint">💡 <strong>How to fix:</strong> ' + hint + '</div>' : '',
            '</div>'
        ].join('');
    }

    function checkCode(code) {
        var panelEl = document.getElementById(_panelId);
        var editorEl = document.getElementById(_editorId);
        if (!panelEl) return true;

        var rules = RULE_BANKS[_mode] || [];
        var trimmed = (code || '').trim();

        if (!trimmed) {
            panelEl.innerHTML = '';
            if (editorEl) {
                editorEl.classList.remove('l7-lint-error-border', 'l7-lint-ok-border');
            }
            return true;
        }

        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            var matched = (typeof rule.test === 'function') ? rule.test(trimmed) : rule.test.test(trimmed);
            if (matched) {
                renderPanel(panelEl, 'error', rule.title, rule.hint, _mode.toUpperCase() + ' Inspector');
                if (editorEl) {
                    editorEl.classList.add('l7-lint-error-border');
                    editorEl.classList.remove('l7-lint-ok-border');
                }
                return false;
            }
        }

        // All rules passed
        panelEl.innerHTML = '';
        if (editorEl) {
            editorEl.classList.remove('l7-lint-error-border');
            editorEl.classList.add('l7-lint-ok-border');
        }
        return true;
    }

    // ─── Checklist Engine ─────────────────────────────────────────────────────

    var _tasks       = [];
    var _submitBtnId = null;
    var _onAllPassed = null;
    var _checkEditorId = null;

    function runChecklist(code) {
        var allPassed = true;
        var stripped = (code || '').replace(/\/\/.*/g, '').replace(/#.*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');

        _tasks.forEach(function(task) {
            var passed = false;
            if (typeof task.fn === 'function') {
                passed = task.fn(code, stripped);
            } else if (task.regex) {
                passed = task.regex.test(stripped) || task.regex.test(code);
            }

            var li = document.querySelector('.l7-checklist [data-task="' + task.id + '"]');
            if (li) {
                if (passed) {
                    li.classList.add('l7-done');
                    li.querySelector('.l7-check-icon').textContent = '✅';
                } else {
                    li.classList.remove('l7-done');
                    li.querySelector('.l7-check-icon').textContent = '⬜';
                    allPassed = false;
                }
            } else {
                if (!passed) allPassed = false;
            }
        });

        var submitBtn = document.getElementById(_submitBtnId);
        if (submitBtn) {
            submitBtn.disabled = !allPassed;
            submitBtn.style.opacity = allPassed ? '1' : '0.5';
            submitBtn.style.cursor = allPassed ? 'pointer' : 'not-allowed';
        }

        if (allPassed && typeof _onAllPassed === 'function') {
            _onAllPassed();
        }
    }

    function buildChecklistHTML(tasks) {
        return '<ul class="l7-checklist">' + tasks.map(function(task) {
            return '<li data-task="' + task.id + '"><span class="l7-check-icon">⬜</span><span>' + task.label + '</span></li>';
        }).join('') + '</ul>';
    }

    // ─── Public API ───────────────────────────────────────────────────────────

    window.Level7Linter = {
        /**
         * Initialize the linter for an editor textarea
         * @param {string} editorId  - ID of the <textarea> element
         * @param {string} panelId   - ID of the lint panel container div
         * @param {object} opts      - { mode: 'python'|'sql'|'nextjs'|'yaml'|'bash' }
         */
        init: function(editorId, panelId, opts) {
            _editorId = editorId;
            _panelId  = panelId;
            _mode     = (opts && opts.mode) || 'python';

            var editorEl = document.getElementById(editorId);
            if (!editorEl) return;

            editorEl.addEventListener('input', function() {
                clearTimeout(_debounceTimer);
                _debounceTimer = setTimeout(function() {
                    checkCode(editorEl.value);
                    if (_tasks.length > 0) runChecklist(editorEl.value);
                }, 350);
            });

            // Initial check
            setTimeout(function() {
                if (editorEl.value) {
                    checkCode(editorEl.value);
                    if (_tasks.length > 0) runChecklist(editorEl.value);
                }
            }, 200);
        },

        /**
         * Run a manual lint check (call after setting editor value)
         * @param {string} code
         */
        check: function(code) {
            checkCode(code);
            if (_tasks.length > 0) runChecklist(code);
        },

        /**
         * Initialize the live task checklist
         * @param {Array}  tasks       - [{ id, label, regex?, fn? }, ...]
         * @param {object} opts        - { containerId, submitBtnId, onAllPassed? }
         */
        initChecklist: function(tasks, opts) {
            _tasks       = tasks || [];
            _submitBtnId = opts && opts.submitBtnId;
            _onAllPassed = opts && opts.onAllPassed;

            var container = opts && opts.containerId && document.getElementById(opts.containerId);
            if (container && _tasks.length > 0) {
                container.innerHTML = buildChecklistHTML(_tasks);
            }
        },

        /**
         * Manually trigger checklist evaluation
         * @param {string} code
         */
        runChecklist: function(code) {
            runChecklist(code);
        },

        /**
         * Get available modes
         */
        modes: ['python', 'sql', 'nextjs', 'yaml', 'bash'],
    };

})();
