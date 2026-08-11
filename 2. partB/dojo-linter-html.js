/**
 * DojoLinterHTML — Shared Intelligent HTML & CSS Code Inspector Engine
 * Level 4 (partB) | DevDojo / CodeRoots
 *
 * Usage:
 *   DojoLinterHTML.init('task-code', 'dojoLintPanel', { iframeId: 'task-preview' });
 */
(function () {
    'use strict';

    // ── Inject shared CSS ──────────────────────────────────────────────────────
    (function injectStyles() {
        if (document.getElementById('dojo-linter-html-styles')) return;
        var style = document.createElement('style');
        style.id = 'dojo-linter-html-styles';
        style.textContent = [
            /* Panel wrapper */
            '.dojo-lint-panel-wrap {',
            '  font-family: "Nunito", "Plus Jakarta Sans", "Segoe UI", sans-serif;',
            '  font-size: 0.85rem;',
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

            /* Error header row */
            '.dojo-lint-header {',
            '  display: flex;',
            '  align-items: center;',
            '  gap: 8px;',
            '  flex-wrap: wrap;',
            '  margin-bottom: 8px;',
            '}',

            '.dojo-lint-icon { font-size: 1.1rem; flex-shrink: 0; }',

            '.dojo-lint-title {',
            '  font-weight: 800;',
            '  color: #7f1d1d;',
            '  font-size: 0.9rem;',
            '}',

            '.dojo-lint-location {',
            '  background: #fee2e2;',
            '  color: #dc2626;',
            '  font-family: "Fira Code", monospace;',
            '  font-size: 0.75rem;',
            '  font-weight: 700;',
            '  padding: 2px 8px;',
            '  border-radius: 20px;',
            '  margin-left: auto;',
            '  white-space: nowrap;',
            '}',

            /* Hint */
            '.dojo-lint-hint {',
            '  color: #92400e;',
            '  font-size: 0.82rem;',
            '  line-height: 1.5;',
            '  margin-bottom: 8px;',
            '  background: rgba(255,255,255,0.7);',
            '  border-radius: 6px;',
            '  padding: 8px 10px;',
            '}',

            /* Raw code snippet */
            '.dojo-lint-raw {',
            '  font-family: "Fira Code", monospace;',
            '  font-size: 0.75rem;',
            '  color: #b91c1c;',
            '  background: #fff;',
            '  border: 1px solid #fecaca;',
            '  border-radius: 6px;',
            '  padding: 6px 10px;',
            '  overflow-x: auto;',
            '  white-space: pre-wrap;',
            '  word-break: break-word;',
            '}',

            /* Textarea state borders - NO background overrides */
            'textarea.dojo-lint-error {',
            '  border-left: 4px solid #ef4444 !important;',
            '}',

            'textarea.dojo-lint-success {',
            '  border-left: 4px solid #22c55e !important;',
            '}',

            /* Slide-in animation */
            '@keyframes dojoLintSlideIn {',
            '  from { opacity: 0; transform: translateY(-4px); }',
            '  to   { opacity: 1; transform: translateY(0); }',
            '}'
        ].join('\n');
        document.head.appendChild(style);
    })();

    // ── Void HTML Elements (Self-closing / no closing tag required) ────────────
    var VOID_TAGS = {
        'img': true, 'br': true, 'hr': true, 'input': true, 'meta': true,
        'link': true, 'source': true, 'area': true, 'base': true, 'col': true,
        'embed': true, 'param': true, 'track': true, 'wbr': true, '!doctype': true
    };

    // Common Tag Misspellings Dictionary
    var TAG_TYPOS = {
        'diiv': 'div', 'dv': 'div', 'dvi': 'div',
        'spna': 'span', 'sapn': 'span',
        'heade': 'header', 'headr': 'header', 'hedar': 'header',
        'botton': 'button', 'buttn': 'button', 'btn': 'button',
        'imgg': 'img', 'imagen': 'img',
        'anchr': 'a', 'anchro': 'a',
        'paragraph': 'p', 'prg': 'p',
        'footr': 'footer', 'fotr': 'footer',
        'secton': 'section', 'seciton': 'section',
        'artcle': 'article', 'artical': 'article',
        'navgation': 'nav', 'navibar': 'nav'
    };

    // Helper: calculate Line & Column from character index
    function getLoc(code, index) {
        if (index == null || index < 0) return { line: null, col: null };
        var sub = code.substring(0, index);
        var lines = sub.split('\n');
        var line = lines.length;
        var col = lines[lines.length - 1].length + 1;
        return { line: line, col: col };
    }

    // ── Core HTML Syntax Parser ────────────────────────────────────────────────
    function parseHTML(code) {
        if (!code || !code.trim()) return null;

        // 1. Check for unclosed HTML comments <!-- ... -->
        var commentStart = code.indexOf('<!--');
        while (commentStart !== -1) {
            var commentEnd = code.indexOf('-->', commentStart + 4);
            if (commentEnd === -1) {
                var loc = getLoc(code, commentStart);
                return {
                    title: 'Unclosed HTML Comment',
                    line: loc.line,
                    col: loc.col,
                    hint: 'You opened an HTML comment <code>&lt;!--</code> but never closed it. Add <code>--&gt;</code> to close the comment.',
                    rawDisplay: '<!-- ... (missing -->)'
                };
            }
            commentStart = code.indexOf('<!--', commentEnd + 3);
        }

        // 2. Check for unclosed <style> or <script> tags
        var styleRegex = /<style\b[^>]*>/gi;
        var styleMatch;
        while ((styleMatch = styleRegex.exec(code)) !== null) {
            var styleEnd = code.toLowerCase().indexOf('</style>', styleMatch.index);
            if (styleEnd === -1) {
                var loc = getLoc(code, styleMatch.index);
                return {
                    title: 'Unclosed <style> Tag',
                    line: loc.line,
                    col: loc.col,
                    hint: 'You opened a <code>&lt;style&gt;</code> block but never closed it. Add <code>&lt;/style&gt;</code>.',
                    rawDisplay: styleMatch[0] + ' ...'
                };
            }
        }

        var scriptRegex = /<script\b[^>]*>/gi;
        var scriptMatch;
        while ((scriptMatch = scriptRegex.exec(code)) !== null) {
            var scriptEnd = code.toLowerCase().indexOf('</script>', scriptMatch.index);
            if (scriptEnd === -1) {
                var loc = getLoc(code, scriptMatch.index);
                return {
                    title: 'Unclosed <script> Tag',
                    line: loc.line,
                    col: loc.col,
                    hint: 'You opened a <code>&lt;script&gt;</code> block but never closed it. Add <code>&lt;/script&gt;</code>.',
                    rawDisplay: scriptMatch[0] + ' ...'
                };
            }
        }

        // 3. Scan HTML tags and check quotes, closing brackets, tag stack, typos
        var tagRegex = /<(\/)?([a-zA-Z0-9!-]+)([^>]*)>/g;
        var stack = [];
        var match;

        // Also check if there's an unclosed bracket '<' near end or before another '<'
        var openBracketRegex = /<([a-zA-Z0-9!-]+)[^>]*$/g;
        var openBracketMatch = openBracketRegex.exec(code);
        if (openBracketMatch) {
            // Only report if user has stopped typing (code length isn't actively changing mid-tag)
            var tagName = openBracketMatch[1].toLowerCase();
            if (!VOID_TAGS[tagName] && openBracketMatch[0].length > 15) {
                var loc = getLoc(code, openBracketMatch.index);
                return {
                    title: 'Unclosed Tag Bracket',
                    line: loc.line,
                    col: loc.col,
                    hint: 'Your <code>&lt;' + tagName + '</code> tag is missing its closing <code>&gt;</code> bracket.',
                    rawDisplay: openBracketMatch[0]
                };
            }
        }

        while ((match = tagRegex.exec(code)) !== null) {
            var isClosing = Boolean(match[1]);
            var rawTagName = match[2];
            var tagName = rawTagName.toLowerCase();
            var attributesStr = match[3] || '';
            var index = match.index;

            // Check for unclosed attribute quote inside this tag
            var inSingle = false;
            var inDouble = false;
            for (var i = 0; i < attributesStr.length; i++) {
                var ch = attributesStr[i];
                if (ch === '"' && !inSingle) inDouble = !inDouble;
                else if (ch === "'" && !inDouble) inSingle = !inSingle;
            }
            if (inDouble || inSingle) {
                var quoteChar = inDouble ? '"' : "'";
                var loc = getLoc(code, index);
                return {
                    title: 'Unclosed Quote in Attribute',
                    line: loc.line,
                    col: loc.col,
                    hint: 'You opened an attribute quote <code>' + quoteChar + '</code> in <code>&lt;' + rawTagName + '&gt;</code> but forgot to close it.',
                    rawDisplay: match[0]
                };
            }

            // Check for misspelled tag names
            if (TAG_TYPOS[tagName]) {
                var correctTag = TAG_TYPOS[tagName];
                var loc = getLoc(code, index);
                return {
                    title: 'Misspelled HTML Tag',
                    line: loc.line,
                    col: loc.col,
                    hint: 'Did you mean <code>&lt;' + correctTag + '&gt;</code> instead of <code>&lt;' + rawTagName + '&gt;</code>?',
                    rawDisplay: match[0]
                };
            }

            // Skip void tags (e.g. <img>, <br>, <hr>, <input>, <!doctype>)
            if (VOID_TAGS[tagName] || attributesStr.trim().endsWith('/')) {
                continue;
            }

            if (isClosing) {
                if (stack.length === 0) {
                    var loc = getLoc(code, index);
                    return {
                        title: 'Unexpected Closing Tag',
                        line: loc.line,
                        col: loc.col,
                        hint: 'Found a closing <code>&lt;/' + rawTagName + '&gt;</code> tag with no matching open tag.',
                        rawDisplay: match[0]
                    };
                }

                var top = stack.pop();
                if (top.name !== tagName) {
                    var loc = getLoc(code, index);
                    return {
                        title: 'Mismatched Closing Tag',
                        line: loc.line,
                        col: loc.col,
                        hint: 'Opened <code>&lt;' + top.rawName + '&gt;</code> at line ' + top.loc.line + ', but closed with <code>&lt;/' + rawTagName + '&gt;</code>.',
                        rawDisplay: match[0] + ' (expected </' + top.rawName + '>) '
                    };
                }
            } else {
                // Open tag -> push onto stack
                stack.push({
                    name: tagName,
                    rawName: rawTagName,
                    index: index,
                    loc: getLoc(code, index)
                });
            }
        }

        // 4. Check for any unclosed tags remaining on the stack
        if (stack.length > 0) {
            // Pick the deepest unclosed tag
            var unclosed = stack[stack.length - 1];
            return {
                title: 'Unclosed HTML Tag',
                line: unclosed.loc.line,
                col: unclosed.loc.col,
                hint: 'Your <code>&lt;' + unclosed.rawName + '&gt;</code> tag was opened but never closed. Add <code>&lt;/' + unclosed.rawName + '&gt;</code>.',
                rawDisplay: '<' + unclosed.rawName + ' ...> (missing </' + unclosed.rawName + '>)'
            };
        }

        return null; // All clean!
    }

    // ── Public API ─────────────────────────────────────────────────────────────
    window.DojoLinterHTML = {
        _iframeEl: null,
        _editorEl: null,
        _panelEl: null,
        _timer: null,

        /**
         * Initialize DojoLinterHTML for a given editor & panel
         * @param {string} editorId
         * @param {string} panelId
         * @param {object} [options] - { iframeId: 'task-preview' }
         */
        init: function (editorId, panelId, options) {
            this._editorEl = document.getElementById(editorId);
            this._panelEl  = document.getElementById(panelId);

            var defaultIframeId = (options && options.iframeId) || 'task-preview';
            this._iframeEl = document.getElementById(defaultIframeId) ||
                             document.getElementById('task-output') ||
                             document.getElementById('preview-frame') ||
                             document.getElementById('previewFrame');

            if (!this._editorEl) return;

            var self = this;

            // Hook input event with debounce
            this._editorEl.addEventListener('input', function () {
                clearTimeout(self._timer);
                self._timer = setTimeout(function () {
                    self.check(self._editorEl.value);
                }, 350);
            });

            // Initial check
            setTimeout(function () {
                if (self._editorEl && self._editorEl.value.trim()) {
                    self.check(self._editorEl.value);
                }
            }, 600);
        },

        /**
         * Check HTML syntax
         */
        check: function (code) {
            if (!code || !code.trim()) {
                this.clear();
                return { hasError: false };
            }

            var error = parseHTML(code);
            if (error) {
                this._renderError(error);
                return { hasError: true, line: error.line, col: error.col, message: error.title };
            } else {
                this._renderSuccess();
                return { hasError: false };
            }
        },

        /** Clear all linter state */
        clear: function () {
            if (this._panelEl) this._panelEl.innerHTML = '';
            if (this._editorEl) {
                this._editorEl.classList.remove('dojo-lint-error', 'dojo-lint-success');
            }
            if (this._iframeEl) this._iframeEl.style.display = '';
        },

        _renderError: function (opts) {
            if (this._panelEl) {
                var loc = opts.line ? ('Line ' + opts.line + (opts.col != null ? ', Col ' + opts.col : '')) : '';
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
            }

            // Hide iframe so error panel in preview area takes over
            if (this._iframeEl) this._iframeEl.style.display = 'none';

            if (this._editorEl) {
                this._editorEl.classList.add('dojo-lint-error');
                this._editorEl.classList.remove('dojo-lint-success');
            }
        },

        _renderSuccess: function () {
            if (this._panelEl) this._panelEl.innerHTML = '';
            if (this._iframeEl) this._iframeEl.style.display = '';
            if (this._editorEl) {
                this._editorEl.classList.add('dojo-lint-success');
                this._editorEl.classList.remove('dojo-lint-error');
            }
        }
    };
})();
