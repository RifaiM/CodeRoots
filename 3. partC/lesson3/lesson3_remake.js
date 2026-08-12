// Level 5 - Lesson 3: JSX Syntax & Dynamic Rendering Engine with Real-Time Dojo Code Inspector & ESM Polyfills
(function() {
    'use strict';

    const defaultCode = `// ⚡ Lesson 3: Dynamic JSX Rendering & List Mapping!

function ProfileCard() {
  const userName = "Alex Developer";
  const userAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop";
  const skills = ["React 18", "TypeScript", "Tailwind CSS", "Next.js"];

  return (
    <div className="card">
      <img src={userAvatar} alt={userName} className="avatar" />
      <h2>{userName}</h2>
      <p className="subtitle">Frontend Developer & Open Source Contributor</p>
      <hr />
      <h3>🚀 Tech Stack:</h3>
      <ul className="skill-list">
        {skills.map((skill, index) => (
          <li key={index} className="badge">{skill}</li>
        ))}
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProfileCard />);`;

    
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

    function initLesson3() {
        const editor = document.getElementById('codeEditor');
        const lineNumberEl = document.getElementById('lineNumbers');
        const preview = document.getElementById('previewFrame');
        const runBtn = document.getElementById('runCodeBtn');
        const resetBtn = document.getElementById('resetCodeBtn');
        const submitBtn = document.getElementById('submitProjectBtn');

        if (!editor || !preview) return;

        // Auto-restore draft from localStorage if available
        const savedDraft = localStorage.getItem('partC_lesson3_remake_draft');
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
                '  display: flex;',
                '  justify-content: center;',
                '}',
                '.card {',
                '  background: #ffffff;',
                '  border: 1px solid #e2e8f0;',
                '  border-radius: 16px;',
                '  padding: 20px;',
                '  max-width: 380px;',
                '  width: 100%;',
                '  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);',
                '  text-align: center;',
                '}',
                '.avatar {',
                '  width: 72px;',
                '  height: 72px;',
                '  border-radius: 50%;',
                '  object-fit: cover;',
                '  border: 3px solid #2563eb;',
                '  margin-bottom: 12px;',
                '}',
                '.card h2 {',
                '  margin: 0 0 4px 0;',
                '  font-size: 1.2rem;',
                '  color: #0f172a;',
                '}',
                '.subtitle {',
                '  margin: 0 0 14px 0;',
                '  font-size: 0.82rem;',
                '  color: #64748b;',
                '}',
                'hr {',
                '  border: none;',
                '  border-top: 1px solid #f1f5f9;',
                '  margin: 14px 0;',
                '}',
                '.card h3 {',
                '  margin: 0 0 10px 0;',
                '  font-size: 0.90rem;',
                '  color: #1e293b;',
                '  text-align: left;',
                '}',
                '.skill-list {',
                '  list-style: none;',
                '  padding: 0;',
                '  margin: 0;',
                '  display: flex;',
                '  flex-wrap: wrap;',
                '  gap: 8px;',
                '}',
                '.badge {',
                '  background: #eff6ff;',
                '  color: #2563eb;',
                '  border: 1px solid #bfdbfe;',
                '  border-radius: 14px;',
                '  padding: 4px 12px;',
                '  font-size: 0.78rem;',
                '  font-weight: 700;',
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
            const req1 = /\{[^}\n]+\}/.test(code); // Curly brace dynamic JS expression
            const req2 = /className\s*=/.test(code); // Using className attribute
            const req3 = /<(img|hr|br|input|source|embed)\b[^>]*\/>/i.test(code); // Self closing HTML/JSX tag (img, hr, br, input)
            const req4 = /\.map\s*\(/i.test(code); // Dynamic array .map() rendering

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
                            text: 'Please write your React JSX code before running preview! ⚡',
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
                            localStorage.removeItem('partC_lesson3_remake_draft');
                            runCode();
                            Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                        }
                    });
                } else {
                    editor.value = defaultCode;
                        buildLineNumbers(lineNumberEl, editor);
                    localStorage.removeItem('partC_lesson3_remake_draft');
                    runCode();
                }
            });
        }

        if (editor) {
            let inputTimeout;
            editor.addEventListener('input', () => {
                buildLineNumbers(lineNumberEl, editor);
                localStorage.setItem('partC_lesson3_remake_draft', editor.value);
                clearTimeout(inputTimeout);
                inputTimeout = setTimeout(() => runCode(), 200);
            });

            editor.addEventListener('scroll', () => {
                if (lineNumberEl) lineNumberEl.scrollTop = editor.scrollTop;
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                localStorage.setItem('partC_lesson3_remake_complete', 'true');
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'success',
                        title: '🎉 Lesson 3 Complete!',
                        text: 'You have mastered JSX Syntax & Dynamic List Rendering!',
                        confirmButtonColor: '#2563eb',
                        confirmButtonText: '🚀 Next Lesson: React Props'
                    }).then(() => {
                        window.location.href = '../lesson4/lesson4_remake.html';
                    });
                } else {
                    alert('🎉 Lesson 3 Complete!');
                    window.location.href = '../lesson4/lesson4_remake.html';
                }
            });
        }

        runCode();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLesson3);
    } else {
        initLesson3();
    }
})();
