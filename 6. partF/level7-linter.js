/**
 * Level 7 Dojo Inspector — Multi-mode Code Linter & Validation Engine
 * NoviCodes Platform | Track 7A (DevOps) · 7B (Python/SQL/Auth) · 7C (Next.js)
 *
 * Capabilities:
 *   - Real-time syntax inspection across 5 languages (Python, SQL, Next.js, YAML, Bash)
 *   - Dynamic task checklist with live ⬜ / ✅ transitions on user input
 *   - Supports single textarea editors or multi-input forms
 *   - Comprehensive diagnostic feedback with actionable hints for terminal display
 *   - SweetAlert diagnostic modals for incomplete tasks
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
            '.l7-checklist li{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;background:#0f172a;border:1px solid rgba(255,255,255,0.1);border-radius:10px;font-size:.86rem;color:#94a3b8;font-weight:600;transition:all .2s ease}',
            '.l7-checklist li .l7-check-icon{font-size:1.05rem;flex-shrink:0;margin-top:1px;transition:transform .2s ease}',
            '.l7-checklist li.l7-done{background:rgba(16,185,129,0.12);border-color:rgba(16,185,129,0.35);color:#34d399}',
            '.l7-checklist li.l7-done .l7-check-icon{transform:scale(1.1)}',
            '.l7-checklist li code{background:rgba(255,255,255,0.08);color:#e2e8f0;padding:2px 6px;border-radius:5px;font-family:"Fira Code",monospace;font-size:.78rem}',
            '.l7-checklist li.l7-done code{background:rgba(16,185,129,0.2);color:#a7f3d0}',
            /* Slide-in keyframe */
            '@keyframes l7SlideIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}'
        ].join('');
        document.head.appendChild(s);
    })();

    // ─── Utility ──────────────────────────────────────────────────────────────

    function stripLineComments(code, commentChar) {
        var pattern = commentChar === '#'  ? /#[^\n]*/g
                    : commentChar === '--' ? /--[^\n]*/g
                    :                        /\/\/[^\n]*/g;
        return code.replace(pattern, '');
    }

    // ─── ERROR RULE BANKS ─────────────────────────────────────────────────────

    var PYTHON_RULES = [
        { test: /\bprin(?!t)\s*\(/i,          title: "Typo: 'prin(' — did you mean 'print('?",   hint: 'The output function in Python is <code>print(...)</code>.' },
        { test: /^\s*def\s+\w+\s*\([^)]*\)\s*$/m,  title: "Missing colon on <code>def</code>",   hint: 'Function definitions must end with a colon: <code>def my_func():</code>' },
        { test: /^\s*class\s+\w+[^:\n#]*$/m,   title: "Missing colon on <code>class</code>",     hint: 'Class definitions must end with a colon: <code>class MyClass:</code>' },
        { test: /^\s*(?:if|elif)\b[^:\n#]+$/m, title: "Missing colon on <code>if/elif</code>",   hint: 'Conditionals need a colon: <code>if x > 0:</code>' },
        { test: /^\s*else\s*[^:\n#]+$/m,       title: "Missing colon on <code>else</code>",      hint: '<code>else</code> must be followed by a colon: <code>else:</code>' },
        { test: /^\s*for\b[^:\n#]+$/m,         title: "Missing colon on <code>for</code>",       hint: 'For loops need a colon: <code>for item in items:</code>' },
        { test: /^\s*while\b[^:\n#]+$/m,       title: "Missing colon on <code>while</code>",     hint: 'While loops need a colon: <code>while x > 0:</code>' },
        { test: /^\s*try\s*[^:\n#]+$/m,        title: "Missing colon on <code>try</code>",       hint: '<code>try</code> must be followed by a colon: <code>try:</code>' },
        { test: /^\s*except[^:\n#]*$/m,        title: "Missing colon on <code>except</code>",    hint: '<code>except</code> must be followed by a colon: <code>except Exception as e:</code>' },
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
            hint: 'Every opening quote must have a matching closing quote on the same line.'
        },
        { test: /\bimport\s+\*\s+from\b/,      title: "Python doesn't use <code>import * from</code>", hint: 'Use <code>from module import something</code> or <code>import module</code>' },
    ];

    var SQL_RULES = [
        { test: /\bSELCT\b/i,   title: "Typo: 'SELCT' — did you mean 'SELECT'?", hint: 'SQL keyword is <code>SELECT</code>.' },
        { test: /\bFORM\b/i,    title: "Typo: 'FORM' — did you mean 'FROM'?",   hint: 'SQL keyword is <code>FROM</code>.' },
        { test: /\bWHER\b(?!E)/i,  title: "Typo: 'WHER' — did you mean 'WHERE'?", hint: 'SQL keyword is <code>WHERE</code>.' },
        { test: /\bINSERT\s+INTO\b(?![\s\S]*VALUES\b)/i, title: "INSERT INTO is missing VALUES", hint: '<code>INSERT INTO table (...) VALUES (...);</code>' },
        {
            test: function(code) {
                var opens = (code.match(/\(/g) || []).length;
                var closes = (code.match(/\)/g) || []).length;
                return opens !== closes;
            },
            title: 'Unmatched parentheses in SQL',
            hint: 'Check that every opening <code>(</code> has a matching closing <code>)</code>.'
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
            hint: 'React hooks require the <code>\'use client\'</code> directive at the very top of the file.'
        },
        {
            test: function(code) {
                var hasServerAction = /export\s+async\s+function/.test(code) && !/^\s*['"]use server['"]/m.test(code) && !/^\s*['"]use client['"]/m.test(code);
                return hasServerAction && /\b(revalidatePath|revalidateTag|redirect|cookies|headers)\s*\(/.test(code);
            },
            title: "Missing <code>'use server'</code> directive for Server Action",
            hint: 'Server Actions require <code>\'use server\'</code> at the top of the file.'
        }
    ];

    var YAML_RULES = [
        {
            test: function(code) {
                return code.split('\n').some(function(line) {
                    return /^\t/.test(line);
                });
            },
            title: 'YAML uses spaces, not tabs for indentation',
            hint: 'YAML is indentation-sensitive and requires spaces (2 or 4). Replace tab characters with spaces.'
        }
    ];

    var BASH_RULES = [
        { test: /git\s+init\s+\./,           title: "Incorrect: <code>git init .</code>",   hint: 'The correct command is just <code>git init</code> (no dot).' },
        { test: /git\s+commit\s+['"][^'"]+['"]/i, title: "Missing <code>-m</code> flag on git commit", hint: 'Use <code>git commit -m "your message"</code>' }
    ];

    var RULE_BANKS = {
        python: PYTHON_RULES,
        sql:    SQL_RULES,
        nextjs: NEXTJS_RULES,
        yaml:   YAML_RULES,
        bash:   BASH_RULES,
        toml:   []
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
            if (editorEl) editorEl.classList.remove('l7-lint-error-border', 'l7-lint-ok-border');
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

        panelEl.innerHTML = '';
        if (editorEl) {
            editorEl.classList.remove('l7-lint-error-border');
            editorEl.classList.add('l7-lint-ok-border');
        }
        return true;
    }

    // ─── Checklist Engine ─────────────────────────────────────────────────────

    var _tasks         = [];
    var _submitBtnId   = null;
    var _onAllPassed   = null;
    var _getCodeFn     = null;
    var _checklistContId = null;

    function getCurrentCode() {
        if (typeof _getCodeFn === 'function') return _getCodeFn();
        if (_editorId) {
            var el = document.getElementById(_editorId);
            if (el) return el.value || '';
        }
        return '';
    }

    function cleanAllComments(code) {
        if (!code) return '';
        var lines = code.split('\n');
        var cleaned = lines.map(function (line) {
            var inSingle = false;
            var inDouble = false;
            var inBacktick = false;
            var res = '';
            for (var i = 0; i < line.length; i++) {
                var ch = line[i];
                var prev = line[i - 1];
                if (ch === "'" && !inDouble && !inBacktick && prev !== '\\') {
                    inSingle = !inSingle;
                } else if (ch === '"' && !inSingle && !inBacktick && prev !== '\\') {
                    inDouble = !inDouble;
                } else if (ch === '`' && !inSingle && !inDouble && prev !== '\\') {
                    inBacktick = !inBacktick;
                } else if (!inSingle && !inDouble && !inBacktick) {
                    if (ch === '#' || (ch === '/' && line[i + 1] === '/') || (ch === '-' && line[i + 1] === '-')) {
                        break;
                    }
                }
                res += ch;
            }
            return res;
        });
        return cleaned.join('\n').replace(/\/\*[\s\S]*?\*\//g, '');
    }

    function evaluateTasks(code) {
        var str = (code !== undefined && code !== null) ? String(code) : getCurrentCode();
        // Clean all comments so comments can NEVER fulfill checklist rules
        var stripped = cleanAllComments(str);

        var passedTasks = [];
        var failedTasks = [];

        _tasks.forEach(function (task) {
            var isPass = false;
            if (typeof task.fn === 'function') {
                try {
                    isPass = !!task.fn(str, stripped);
                } catch (e) {
                    isPass = false;
                }
            } else if (task.regex) {
                // Strictly test against stripped code (not comments)
                isPass = task.regex.test(stripped);
            }

            var itemObj = {
                id: task.id,
                label: task.label,
                hint: task.hint || '',
                passed: isPass
            };

            if (isPass) {
                passedTasks.push(itemObj);
            } else {
                failedTasks.push(itemObj);
            }

            // Live DOM update if element exists
            var li = document.querySelector('.l7-checklist [data-task="' + task.id + '"]');
            if (li) {
                if (isPass) {
                    li.classList.add('l7-done');
                    var icon = li.querySelector('.l7-check-icon');
                    if (icon) icon.textContent = '✅';
                } else {
                    li.classList.remove('l7-done');
                    var icon2 = li.querySelector('.l7-check-icon');
                    if (icon2) icon2.textContent = '⬜';
                }
            }
        });

        var allPassed = failedTasks.length === 0 && _tasks.length > 0;

        var submitBtn = document.getElementById(_submitBtnId);
        if (submitBtn) {
            submitBtn.disabled = !allPassed;
            submitBtn.style.opacity = allPassed ? '1' : '0.5';
            submitBtn.style.cursor = allPassed ? 'pointer' : 'not-allowed';
        }

        if (allPassed && typeof _onAllPassed === 'function') {
            _onAllPassed();
        }

        return {
            allPassed: allPassed,
            passedCount: passedTasks.length,
            totalCount: _tasks.length,
            passedTasks: passedTasks,
            failedTasks: failedTasks
        };
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
         * @param {object} opts      - { mode: 'python'|'sql'|'nextjs'|'yaml'|'bash'|'toml' }
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
                    if (_tasks.length > 0) evaluateTasks(editorEl.value);
                }, 200);
            });

            // Initial evaluation on load
            setTimeout(function() {
                checkCode(editorEl.value);
                if (_tasks.length > 0) evaluateTasks(editorEl.value);
            }, 100);
        },

        /**
         * Initialize the live task checklist
         * @param {Array}  tasks - [{ id, label, hint?, regex?, fn? }, ...]
         * @param {object} opts  - { containerId, submitBtnId, inputIds?: Array, getCodeFn?: Function, onAllPassed? }
         */
        initChecklist: function(tasks, opts) {
            _tasks           = tasks || [];
            _submitBtnId     = opts && opts.submitBtnId;
            _onAllPassed     = opts && opts.onAllPassed;
            _getCodeFn       = opts && opts.getCodeFn;
            _checklistContId = opts && opts.containerId;

            var container = _checklistContId && document.getElementById(_checklistContId);
            if (container && _tasks.length > 0) {
                container.innerHTML = buildChecklistHTML(_tasks);
            }

            // Bind to multi-input forms if provided
            if (opts && opts.inputIds && Array.isArray(opts.inputIds)) {
                opts.inputIds.forEach(function(id) {
                    var el = document.getElementById(id);
                    if (el) {
                        el.addEventListener('input', function() {
                            evaluateTasks();
                        });
                    }
                });
            }

            // Run initial evaluation
            setTimeout(function() {
                evaluateTasks();
            }, 100);
        },

        /**
         * Evaluate tasks against code and update UI
         * @param {string} [code]
         * @returns {object} { allPassed, passedCount, totalCount, passedTasks, failedTasks }
         */
        evaluate: function(code) {
            return evaluateTasks(code);
        },

        /**
         * Compatibility runner (returns true if all tasks passed)
         * @param {string} [code]
         * @returns {boolean}
         */
        runChecklist: function(code) {
            var res = evaluateTasks(code);
            return res.allPassed;
        },

        /**
         * Format diagnostic feedback for the terminal screen when tasks are incomplete
         * @param {object} result - result from Level7Linter.evaluate()
         * @returns {string}
         */
        formatFeedback: function(result) {
            if (!result || result.allPassed) return '';

            var lines = [
                '❌ [TASK REQUIREMENTS INCOMPLETE: ' + result.passedCount + '/' + result.totalCount + ' PASSED]',
                '────────────────────────────────────────────────────────'
            ];

            if (result.passedTasks && result.passedTasks.length > 0) {
                result.passedTasks.forEach(function(t) {
                    var cleanLabel = t.label.replace(/<[^>]+>/g, '');
                    lines.push('  ✅ ' + cleanLabel);
                });
            }

            if (result.failedTasks && result.failedTasks.length > 0) {
                result.failedTasks.forEach(function(t) {
                    var cleanLabel = t.label.replace(/<[^>]+>/g, '');
                    lines.push('  ⬜ ' + cleanLabel);
                    if (t.hint) {
                        lines.push('     💡 Hint: ' + t.hint);
                    }
                });
            }

            lines.push('────────────────────────────────────────────────────────');
            lines.push('👉 Edit your code to complete the missing tasks, then click Run again!');
            return lines.join('\n');
        },

        /**
         * Show an informative modal/toast when user clicks Run with incomplete tasks
         * @param {object} result
         */
        showIncompleteModal: function(result) {
            if (typeof Swal === 'undefined') return;
            var missing = (result && result.failedTasks) ? result.failedTasks.length : 0;
            Swal.fire({
                icon: 'warning',
                title: 'Task Requirements Incomplete (' + result.passedCount + '/' + result.totalCount + ')',
                html: '<p style="color:#64748b;font-size:0.92rem;margin:0 0 10px 0;">You have <strong>' + missing + ' task' + (missing > 1 ? 's' : '') + '</strong> remaining to pass this lesson.</p><p style="color:#475569;font-size:0.85rem;margin:0;">Check the 📋 <strong>Task Checklist</strong> and terminal logs for helpful hints!</p>',
                confirmButtonColor: '#0ea5e9',
                confirmButtonText: 'Let me fix it! 🛠️'
            });
        },

        /**
         * Run manual lint check
         */
        check: function(code) {
            checkCode(code);
            evaluateTasks(code);
        },

        modes: ['python', 'sql', 'nextjs', 'yaml', 'bash', 'toml']
    };

})();
