// Level 5 - Lesson 2: The Component Mental Model & Virtual DOM Engine with Real-Time Dojo Code Inspector & ESM Polyfills
(function() {
    'use strict';

    const defaultCode = `// 🍱 Lesson 2: Build a React Component Tree!

// 1. Sub-component: Header
function Header() {
  return (
    <header className="header-box">
      <h1>🍱 Component Dojo</h1>
      <p>Building UIs with reusable React components!</p>
    </header>
  );
}

// 2. Sub-component: Card
function Card({ title, desc }) {
  return (
    <div className="card-box">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

// 3. Parent Component: App (Assembles the Component Tree)
function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="grid">
        <Card title="🧩 Component Blueprint" desc="Independent reusable building blocks." />
        <Card title="⚡ Virtual DOM" desc="Diffs UI fast without manual DOM updates." />
      </div>
    </div>
  );
}

// 4. Render Component Tree to DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`;

    
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

    function formatDojoError(err) {
        const msg = err.message || String(err);
        let friendlyTitle = 'Syntax Error Detected';
        let friendlyHint = 'Check your JSX component syntax for missing brackets or tag spelling.';

        if (/Adjacent JSX elements must be wrapped/i.test(msg)) {
            friendlyTitle = 'Multiple Root Elements';
            friendlyHint = 'Adjacent JSX elements must be wrapped in a single parent tag! Wrap items inside a <code>&lt;div&gt;...&lt;/div&gt;</code> or <code>&lt;&gt;...&lt;/&gt;</code> fragment.';
        } else if (/Expected corresponding JSX closing tag for/i.test(msg)) {
            const match = msg.match(/Expected corresponding JSX closing tag for <([a-zA-Z0-9]+)>/i);
            const tag = match ? match[1] : 'element';
            friendlyTitle = 'Mismatched Closing Tag';
            friendlyHint = `You opened a <code>&lt;${tag}&gt;</code> tag, but tried to close it with a misspelled tag! Make sure your closing tag matches <code>&lt;/${tag}&gt;</code>.`;
        } else if (/Unterminated JSX contents/i.test(msg) || /Unterminated string/i.test(msg)) {
            friendlyTitle = 'Unclosed Tag or String';
            friendlyHint = 'You opened a tag or string, but forgot to close it. Remember: all tags in React JSX (like <code>&lt;img /&gt;</code> or <code>&lt;hr /&gt;</code>) MUST be closed!';
        } else if (/Objects are not valid as a React child/i.test(msg)) {
            friendlyTitle = 'Cannot Render Full Object';
            friendlyHint = 'You tried to render a full JavaScript Object directly inside JSX <code>{}</code>! Render specific properties instead, like <code>{user.name}</code>.';
        } else if (/Nothing was returned from render/i.test(msg)) {
            friendlyTitle = 'Component Missing Return';
            friendlyHint = 'Your component function returned nothing! Make sure your component includes a <code>return (...)</code> statement.';
        } else if (/Unexpected token/i.test(msg)) {
            friendlyTitle = 'Unexpected Token Syntax Error';
            friendlyHint = 'Look out for extra or missing characters like commas, semicolons, or unmatched brackets <code>()</code> / <code>{}</code>.';
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
                <code>${cleanMsg}</code>
            </div>
        </div>`;
    }

    function initLesson2() {
        const editor = document.getElementById('codeEditor');
        const lineNumberEl = document.getElementById('lineNumbers');
        const preview = document.getElementById('previewFrame');
        const runBtn = document.getElementById('runCodeBtn');
        const resetBtn = document.getElementById('resetCodeBtn');
        const submitBtn = document.getElementById('submitProjectBtn');

        if (!editor || !preview) return;

        // Auto-restore draft from localStorage if available
        const savedDraft = localStorage.getItem('partC_lesson2_remake_draft');
        if (savedDraft !== null) {
            editor.value = savedDraft;
        } else {
            editor.value = defaultCode;
                        buildLineNumbers(lineNumberEl, editor);
        }

        // Activate Dojo Linter (JSX mode)
        if (typeof DojoLinter !== 'undefined') {
            DojoLinter.init('codeEditor', 'dojoLintPanel', { mode: 'jsx' });
        buildLineNumbers(lineNumberEl, editor);
        }

        function runCode() {
            const userCode = editor.value || '';

            if (!userCode.trim()) {
                validateRequirements('');
                preview.srcdoc = '';
                return;
            }

            // Clean top-level ESM import statements to prevent script module errors
            let cleanCode = userCode.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/gi, '');

            let compiledJS = cleanCode;
            if (typeof Babel !== 'undefined') {
                try {
                    const result = Babel.transform(cleanCode, { presets: [['react', { runtime: 'classic' }]], sourceType: 'script' });
                    compiledJS = result.code;
                } catch (babelErr) {
                    // Catch JSX/Babel syntax errors in real-time
                    preview.srcdoc = '<!DOCTYPE html><html><head><meta charset="UTF-8" /></head>' +
                        '<body style="font-family: \'Segoe UI\', sans-serif; background: #f8fafc; padding: 12px; margin: 0;">' +
                        formatDojoError(babelErr) +
                        '</body></html>';
                    validateRequirements('');
                    return;
                }
            }

            // Strip any leftover CJS require/export wrappers
            compiledJS = compiledJS.replace(/var\s+_[a-zA-Z0-9_$]+\s*=\s*require\([^)]+\);?/g, '');

            // Generate iframe srcdoc with React 18 & pre-compiled JS
            var htmlParts = [
                '<!DOCTYPE html><html><head><meta charset="UTF-8" />',
                '<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin><\/script>',
                '<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin><\/script>',
                '<style>',
                'body {',
                '  font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;',
                '  background: #f8fafc;',
                '  color: #0f172a;',
                '  margin: 0;',
                '  padding: 16px;',
                '}',
                '.app-container {',
                '  max-width: 500px;',
                '  margin: 0 auto;',
                '}',
                '.header-box {',
                '  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);',
                '  color: #ffffff;',
                '  padding: 16px 20px;',
                '  border-radius: 14px;',
                '  text-align: center;',
                '  margin-bottom: 16px;',
                '  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);',
                '}',
                '.header-box h1 {',
                '  margin: 0 0 4px 0;',
                '  font-size: 1.25rem;',
                '}',
                '.header-box p {',
                '  margin: 0;',
                '  font-size: 0.82rem;',
                '  opacity: 0.9;',
                '}',
                '.grid {',
                '  display: grid;',
                '  grid-template-columns: 1fr 1fr;',
                '  gap: 12px;',
                '}',
                '.card-box {',
                '  background: #ffffff;',
                '  border: 1px solid #e2e8f0;',
                '  border-radius: 12px;',
                '  padding: 14px;',
                '  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);',
                '}',
                '.card-box h3 {',
                '  margin: 0 0 6px 0;',
                '  font-size: 0.92rem;',
                '  color: #1e293b;',
                '}',
                '.card-box p {',
                '  margin: 0;',
                '  font-size: 0.80rem;',
                '  color: #64748b;',
                '  line-height: 1.4;',
                '}',
                '</style>',
                '</head><body>',
                '<div id="root"></div>',
                '<script>',
                'window.require = function(mod) {',
                '  if (mod === "react") return window.React;',
                '  if (mod === "react-dom" || mod === "react-dom/client") return window.ReactDOM;',
                '  return window[mod] || {};',
                '};',
                'try {'
            ].join('\n');

            var htmlTail = [
                '} catch (err) {',
                '  document.getElementById("root").innerHTML = "<div style=\'padding:16px;color:#991b1b;font-family:sans-serif\'><strong>⚠️ Runtime Error:</strong> " + String(err.message).replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</div>";',
                '}',
                '<\/script>',
                '</body></html>'
            ].join('\n');

            preview.srcdoc = htmlParts + '\n' + compiledJS + '\n' + htmlTail;
            validateRequirements(userCode);
        }

        function validateRequirements(code) {
            const req1 = /function\s+Header\s*\(/i.test(code) || /const\s+Header\s*=/i.test(code);
            const req2 = /function\s+Card\s*\(/i.test(code) || /const\s+Card\s*=/i.test(code);
            const req3 = /<Header\s*\/>/i.test(code) && /<Card/i.test(code);
            const req4 = /ReactDOM\.createRoot/i.test(code) && /root\.render/i.test(code);

            updateChecklist('req1', req1);
            updateChecklist('req2', req2);
            updateChecklist('req3', req3);
            updateChecklist('req4', req4);

            if (submitBtn) {
                submitBtn.disabled = !(req1 && req2 && req3 && req4);
            }
        }

        function updateChecklist(id, isDone) {
            const el = document.getElementById(id);
            if (!el) return;
            if (isDone) {
                el.classList.add('completed');
            } else {
                el.classList.remove('completed');
            }
        }

        if (runBtn) {
            runBtn.addEventListener('click', () => {
                const userCode = (editor.value || '').trim();
                if (!userCode) {
                    validateRequirements('');
                    preview.srcdoc = '';
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Code Editor is Empty!',
                            text: 'Please write your React component code before running preview! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                    return;
                }
                runCode();
        validateRequirements(editor.value || '');
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
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
                            editor.value = defaultCode;
                        buildLineNumbers(lineNumberEl, editor);
                            localStorage.removeItem('partC_lesson2_remake_draft');
                            runCode();
                            Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                        }
                    });
                } else {
                    editor.value = defaultCode;
                        buildLineNumbers(lineNumberEl, editor);
                    localStorage.removeItem('partC_lesson2_remake_draft');
                    runCode();
                }
            });
        }

        if (editor) {
            let inputTimeout;
            editor.addEventListener('input', () => {
                buildLineNumbers(lineNumberEl, editor);
                localStorage.setItem('partC_lesson2_remake_draft', editor.value);
                clearTimeout(inputTimeout);
                inputTimeout = setTimeout(() => runCode(), 200);
            });

            editor.addEventListener('scroll', () => {
                if (lineNumberEl) lineNumberEl.scrollTop = editor.scrollTop;
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                localStorage.setItem('partC_lesson2_remake_complete', 'true');
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'success',
                        title: '🎉 Lesson 2 Complete!',
                        text: 'You have unlocked the Component Mental Model & Virtual DOM!',
                        confirmButtonColor: '#2563eb',
                        confirmButtonText: '🚀 Next Lesson: JSX Syntax'
                    }).then(() => {
                        window.location.href = '../lesson3/lesson3_remake.html';
                    });
                } else {
                    alert('🎉 Lesson 2 Complete!');
                    window.location.href = '../lesson3/lesson3_remake.html';
                }
            });
        }

        runCode();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLesson2);
    } else {
        initLesson2();
    }
})();
