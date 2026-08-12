/**
 * DojoLinter — Shared Intelligent Code Inspector Engine
 * Level 5+ | DevDojo / CodeRoots
 *
 * Usage (any lesson):
 *   DojoLinter.init('codeEditor', 'dojoLintPanel', { mode: 'jsx' | 'js' });
 *
 * Requires: @babel/standalone (already loaded on all Level 5 lessons)
 */
(function () {
    'use strict';

    // ── Inject shared CSS ──────────────────────────────────────────────────────
    (function injectStyles() {
        if (document.getElementById('dojo-linter-styles')) return;
        var style = document.createElement('style');
        style.id = 'dojo-linter-styles';
        style.textContent = [
            /* Panel wrapper */
            '.dojo-lint-panel-wrap {',
            '  font-family: "Plus Jakarta Sans", "Segoe UI", sans-serif;',
            '  font-size: 0.82rem;',
            '  height: 100%;',
            '  overflow-y: auto;',
            '}',

            /* Error panel */
            '.dojo-lint-panel--error {',
            '  background: linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%);',
            '  border: 1px solid #fca5a5;',
            '  border-left: 4px solid #ef4444;',
            '  border-radius: 10px;',
            '  padding: 16px 18px;',
            '  margin: 12px;',
            '  animation: dojoLintSlideIn 0.15s ease;',
            '}',

            /* Success panel — not used (we just show the iframe) */

            /* Error header row */
            '.dojo-lint-header {',
            '  display: flex;',
            '  align-items: center;',
            '  gap: 8px;',
            '  flex-wrap: wrap;',
            '  margin-bottom: 7px;',
            '}',

            '.dojo-lint-icon { font-size: 1rem; flex-shrink: 0; }',

            '.dojo-lint-title {',
            '  font-weight: 800;',
            '  color: #7f1d1d;',
            '  font-size: 0.85rem;',
            '}',

            '.dojo-lint-location {',
            '  background: #fee2e2;',
            '  color: #dc2626;',
            '  font-family: "Fira Code", monospace;',
            '  font-size: 0.73rem;',
            '  font-weight: 700;',
            '  padding: 2px 8px;',
            '  border-radius: 20px;',
            '  margin-left: auto;',
            '  white-space: nowrap;',
            '}',

            /* Hint */
            '.dojo-lint-hint {',
            '  color: #92400e;',
            '  font-size: 0.80rem;',
            '  line-height: 1.5;',
            '  margin-bottom: 8px;',
            '  background: rgba(255,255,255,0.6);',
            '  border-radius: 6px;',
            '  padding: 6px 10px;',
            '}',

            /* Raw message */
            '.dojo-lint-raw {',
            '  font-family: "Fira Code", monospace;',
            '  font-size: 0.72rem;',
            '  color: #b91c1c;',
            '  background: #fff;',
            '  border: 1px solid #fecaca;',
            '  border-radius: 6px;',
            '  padding: 6px 10px;',
            '  overflow-x: auto;',
            '  white-space: pre-wrap;',
            '  word-break: break-word;',
            '}',

            /* Textarea states */
            'textarea.dojo-lint-error {',
            '  border-left: 3px solid #ef4444 !important;',
            '}',

            'textarea.dojo-lint-success {',
            '  border-left: 3px solid #22c55e !important;',
            '}',

            /* Slide-in animation */
            '@keyframes dojoLintSlideIn {',
            '  from { opacity: 0; transform: translateY(-4px); }',
            '  to   { opacity: 1; transform: translateY(0); }',
            '}'
        ].join('\n');
        document.head.appendChild(style);
    })();

    // ── Error translation table ────────────────────────────────────────────────
    var ERROR_MAP = [
        {
            test: /Adjacent JSX elements must be wrapped/i,
            title: 'Multiple Root Elements',
            hint: 'In JSX you can only return ONE root element. Wrap everything inside a single <code>&lt;div&gt;&hellip;&lt;/div&gt;</code> or a fragment <code>&lt;&gt;&hellip;&lt;/&gt;</code>.'
        },
        {
            test: /Expected corresponding JSX closing tag for &lt;(\w+)&gt;/i,
            title: 'Unclosed JSX Tag',
            hint: function (m) { return 'Your <code>&lt;' + (m[1] || 'Tag') + '&gt;</code> tag was opened but never closed. Add <code>&lt;/' + (m[1] || 'Tag') + '&gt;</code> after its contents.'; }
        },
        {
            test: /Expected corresponding JSX closing tag for <(\w+)>/i,
            title: 'Unclosed JSX Tag',
            hint: function (m) { return 'Your <code>&lt;' + (m[1] || 'Tag') + '&gt;</code> tag was opened but never closed. Add <code>&lt;/' + (m[1] || 'Tag') + '&gt;</code> after its contents.'; }
        },
        {
            test: /Unterminated JSX contents/i,
            title: 'Unclosed JSX Block',
            hint: 'You opened a JSX element but never closed it. Every <code>&lt;tag&gt;</code> needs a matching <code>&lt;/tag&gt;</code>, and self-closing tags like <code>&lt;img&gt;</code> need a slash: <code>&lt;img /&gt;</code>.'
        },
        {
            test: /Unterminated string constant|Unterminated string literal/i,
            title: 'Unclosed String',
            hint: 'You opened a quote (<code>"</code> or <code>\'</code>) but forgot to close it. Every string needs matching open and close quotes.'
        },
        {
            test: /Unexpected token '}'|Unexpected token \}/i,
            title: 'Extra Closing Brace',
            hint: 'Found a <code>}</code> with no matching opening <code>{</code>. Check that your curly braces are properly paired.'
        },
        {
            test: /Unexpected token '\)'|Unexpected token \)/i,
            title: 'Extra Closing Parenthesis',
            hint: 'Found a <code>)</code> with no matching opening <code>(</code>. Check that your parentheses are properly paired.'
        },
        {
            test: /Unexpected token ']'|Unexpected token \]/i,
            title: 'Extra Closing Bracket',
            hint: 'Found a <code>]</code> with no matching opening <code>[</code>. Check that your square brackets are properly paired.'
        },
        {
            test: /Unexpected token '<'/i,
            title: 'Unexpected JSX Tag',
            hint: 'Found a <code>&lt;</code> where JavaScript wasn\'t expecting one. Make sure JSX is inside a return statement or variable assignment.'
        },
        {
            test: /Identifier '(.+)' has already been declared/i,
            title: 'Duplicate Variable Declaration',
            hint: function (m) { return 'The variable <code>' + (m[1] || 'variable') + '</code> was declared more than once with <code>const</code> or <code>let</code>. Remove one of the duplicate declarations.'; }
        },
        {
            test: /(.+) is not defined/i,
            title: 'Undefined Variable or Function',
            hint: function (m) { return '<code>' + (m[1] || 'Something') + '</code> is being used but hasn\'t been declared yet. Check for spelling typos or make sure you declared it first.'; }
        },
        {
            test: /Cannot use import statement/i,
            title: 'ES Module Import Not Allowed',
            hint: 'Remove <code>import</code> statements — this editor uses CDN globals (<code>React</code>, <code>ReactDOM</code>) which are already available for you.'
        },
        {
            test: /Unexpected token/i,
            title: 'Unexpected Character',
            hint: 'The parser hit something it didn\'t expect. Common causes: an extra comma, missing bracket, or typo. Check the line number carefully.'
        },
        {
            test: /Missing semicolon/i,
            title: 'Missing Semicolon',
            hint: 'Add a semicolon <code>;</code> at the end of the statement on the indicated line.'
        }
    ];

    function translateError(rawMessage) {
        var clean = (rawMessage || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        for (var i = 0; i < ERROR_MAP.length; i++) {
            var entry = ERROR_MAP[i];
            var match = rawMessage.match(entry.test);
            if (match) {
                return {
                    title: entry.title,
                    hint: typeof entry.hint === 'function' ? entry.hint(match) : entry.hint,
                    rawDisplay: clean
                };
            }
        }
        return {
            title: 'Syntax Error',
            hint: 'Check your code carefully for missing brackets <code>{}</code> <code>()</code> <code>[]</code>, unclosed strings, or mismatched tags.',
            rawDisplay: clean
        };
    }

    // ── Public API ─────────────────────────────────────────────────────────────
    window.DojoLinter = {
        _iframeEl: null,
        _editorEl: null,
        _panelEl: null,
        _mode: 'jsx',
        _timer: null,

        /**
         * Attach the linter to an editor textarea and a panel div.
         * @param {string} editorId   - id of the <textarea>
         * @param {string} panelId    - id of the panel container div
         * @param {object} options    - { mode: 'js' | 'jsx' }
         */
        init: function (editorId, panelId, options) {
            this._editorEl = document.getElementById(editorId);
            this._panelEl  = document.getElementById(panelId);
            this._iframeEl = options && options.iframeId
                ? document.getElementById(options.iframeId)
                : document.getElementById('previewFrame');
            this._mode     = (options && options.mode) || 'jsx';

            if (!this._editorEl || !this._panelEl) return;

            var self = this;

            // Hook input with debounce
            this._editorEl.addEventListener('input', function () {
                clearTimeout(self._timer);
                self._timer = setTimeout(function () {
                    self.check(self._editorEl.value);
                }, 300);
            });

            // Initial check after page settles
            setTimeout(function () {
                if (self._editorEl && self._editorEl.value.trim()) {
                    self.check(self._editorEl.value);
                }
            }, 600);
        },

        /**
         * Run a syntax check on the given code string.
         * @returns {{ hasError: boolean, line?: number, col?: number }}
         */
        check: function (code) {
            if (!code || !code.trim()) {
                this.clear();
                return { hasError: false };
            }

            if (typeof Babel === 'undefined') {
                this.clear();
                return { hasError: false };
            }

            // Strip import lines before parsing (they're not supported in script mode)
            var cleanCode = code.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/gi, '');

            var presets = this._mode === 'jsx'
                ? [['react', { runtime: 'classic' }]]
                : [];

            try {
                Babel.transform(cleanCode, { presets: presets, sourceType: 'script' });
                this._renderSuccess();
                return { hasError: false };
            } catch (err) {
                var line = err.loc ? err.loc.line : null;
                var col  = err.loc ? err.loc.column : null;
                var t    = translateError(err.message || '');
                this._renderError({ line: line, col: col, title: t.title, hint: t.hint, rawDisplay: t.rawDisplay });
                return { hasError: true, line: line, col: col, message: err.message };
            }
        },

        /** Clear all lint state */
        clear: function () {
            if (this._panelEl) this._panelEl.innerHTML = '';
            if (this._editorEl) {
                this._editorEl.classList.remove('dojo-lint-error', 'dojo-lint-success');
            }
            // Show iframe again
            if (this._iframeEl) this._iframeEl.style.display = '';

            // Clear error line highlight
            var lineNumberEl = document.getElementById('lineNumbers');
            if (lineNumberEl && this._editorEl) {
                var count = this._editorEl.value.split('\n').length;
                var html = '';
                for (var i = 1; i <= count; i++) html += '<span>' + i + '</span>';
                lineNumberEl.innerHTML = html;
            }
        },

        _renderError: function (opts) {
            if (!this._panelEl) return;
            var loc = opts.line ? ('Line ' + opts.line + (opts.col != null ? ', Col ' + (opts.col + 1) : '')) : '';
            this._panelEl.innerHTML =
                '<div class="dojo-lint-panel-wrap">' +
                  '<div class="dojo-lint-panel--error">' +
                    '<div class="dojo-lint-header">' +
                      '<span class="dojo-lint-icon">⚠️</span>' +
                      '<span class="dojo-lint-title">' + opts.title + '</span>' +
                      (loc ? '<span class="dojo-lint-location">📍 ' + loc + '</span>' : '') +
                    '</div>' +
                    '<div class="dojo-lint-hint">💡 ' + opts.hint + '</div>' +
                    '<div class="dojo-lint-raw">' + opts.rawDisplay + '</div>' +
                  '</div>' +
                '</div>';
            // Hide iframe, show error panel in preview area instead
            if (this._iframeEl) this._iframeEl.style.display = 'none';
            if (this._editorEl) {
                this._editorEl.classList.add('dojo-lint-error');
                this._editorEl.classList.remove('dojo-lint-success');
            }

            // Highlight the error line in the gutter
            var lineNumberEl = document.getElementById('lineNumbers');
            if (lineNumberEl && this._editorEl && opts.line) {
                var count = this._editorEl.value.split('\n').length;
                var html = '';
                for (var i = 1; i <= count; i++) {
                    var cls = (i === opts.line) ? ' class="ln-error"' : '';
                    html += '<span' + cls + '>' + i + '</span>';
                }
                lineNumberEl.innerHTML = html;
                lineNumberEl.scrollTop = this._editorEl.scrollTop;
            }
        },

        _renderSuccess: function () {
            // Clear the panel and restore iframe — the rendered output IS the success state
            if (this._panelEl) this._panelEl.innerHTML = '';
            if (this._iframeEl) this._iframeEl.style.display = '';
            if (this._editorEl) {
                this._editorEl.classList.add('dojo-lint-success');
                this._editorEl.classList.remove('dojo-lint-error');
            }

            // Clear error line highlight
            var lineNumberEl = document.getElementById('lineNumbers');
            if (lineNumberEl && this._editorEl) {
                var count = this._editorEl.value.split('\n').length;
                var html = '';
                for (var i = 1; i <= count; i++) html += '<span>' + i + '</span>';
                lineNumberEl.innerHTML = html;
            }
        }
    };
})();
