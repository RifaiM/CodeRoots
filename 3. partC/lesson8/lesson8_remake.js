// Level 5 - Lesson 8: Component Composition & props.children Engine
(function() {
    'use strict';

    const defaultCode = `// 🖼️ Lesson 8: Component Composition & props.children!

// 1. Generic Container Component accepting props.children
function CardShell({ title, badgeColor, children }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #cbd5e1',
      borderRadius: '14px',
      padding: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      marginBottom: '14px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h4 style={{ margin: 0, color: '#0f172a', fontSize: '0.95rem' }}>{title}</h4>
        <span style={{ background: badgeColor || '#2563eb', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: '700' }}>
          Widget
        </span>
      </div>

      {/* Render nested children JSX passed between opening & closing tags */}
      <div style={{ color: '#475569', fontSize: '0.85rem' }}>
        {children}
      </div>
    </div>
  );
}

// 2. Parent App Composing Multiple Card Shells with Custom Children
function DevDashboard() {
  const [likes, setLikes] = React.useState(128);

  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', background: '#f8fafc', borderRadius: '16px' }}>
      <h2 style={{ margin: '0 0 16px 0', color: '#0f172a', fontSize: '1.2rem', textAlign: 'center' }}>
        📊 Developer Dashboard (Component Composition)
      </h2>

      {/* Card 1: User Analytics Shell */}
      <CardShell title="📈 User Engagement" badgeColor="#0d9488">
        <p style={{ margin: '0 0 8px 0' }}>Total Project Likes: <strong style={{ color: '#0d9488' }}>{likes}</strong></p>
        <button
          onClick={() => setLikes(likes + 1)}
          style={{ background: '#0d9488', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.78rem' }}
        >
          ❤️ Give Like
        </button>
      </CardShell>

      {/* Card 2: Server Health Shell */}
      <CardShell title="🖥️ Server Infrastructure" badgeColor="#8b5cf6">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ background: '#f3e8ff', color: '#6b21a8', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>
            🟢 API Server: Online
          </span>
          <span style={{ background: '#ecfdf5', color: '#047857', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>
            ⚡ Response: 42ms
          </span>
        </div>
      </CardShell>
    </div>
  );
}

// 3. Render Root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DevDashboard />);`;

    function renderBabelErrorInFrame(preview, cleanMsg) {
        if (!preview) return;
        preview.srcdoc = `<!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: monospace; padding: 20px; background: #fff5f5; color: #b91c1c; margin: 0; }
                .err-card { background: white; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                h3 { margin-top: 0; color: #dc2626; font-size: 1.1rem; }
                pre { background: #fef2f2; padding: 12px; border-radius: 6px; overflow-x: auto; white-space: pre-wrap; font-size: 0.82rem; }
            </style>
        </head>
        <body>
            <div class="err-card">
                <h3>⚠️ Babel JSX Syntax Error</h3>
                <pre>${cleanMsg}</pre>
            </div>
        </body>
        </html>`;
    }

    function validateRequirements(code) {
        const req1 = /children/i.test(code);
        const req2 = /\{[a-zA-Z0-9_.]*children\}/.test(code);
        const req3 = /<([A-Z][a-zA-Z0-9_]*)[^>]*>[\s\S]*?<\/ \1>|<([A-Z][a-zA-Z0-9_]*)[^>]*>[\s\S]*?<\/\2>/i.test(code);
        const req4 = /ReactDOM\.createRoot/i.test(code);

        const updateReq = (id, isValid) => {
            const el = document.getElementById(id);
            if (el) {
                if (isValid) el.classList.add('completed');
                else el.classList.remove('completed');
            }
        };

        updateReq('req1', req1);
        updateReq('req2', req2);
        updateReq('req3', req3);
        updateReq('req4', req4);

        const allPassed = req1 && req2 && req3 && req4;
        const submitBtn = document.getElementById('submitProjectBtn');
        if (submitBtn) {
            submitBtn.disabled = !allPassed;
        }

        return allPassed;
    }

    function initLesson8() {
        const editor = document.getElementById('codeEditor');
        const lineNumberEl = document.getElementById('lineNumbers');
        const preview = document.getElementById('previewFrame');
        const runBtn = document.getElementById('runCodeBtn');
        const resetBtn = document.getElementById('resetCodeBtn');
        const submitBtn = document.getElementById('submitProjectBtn');

        if (!editor || !preview) return;

        // Auto-restore draft from localStorage
        const savedDraft = localStorage.getItem('partC_lesson8_remake_draft');
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

        function runCode(isExplicit = false) {
            const userCode = editor.value || '';

            if (!userCode.trim()) {
                validateRequirements('');
                preview.srcdoc = '';
                if (isExplicit) {
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Code Editor is Empty!',
                            text: 'Please write your React composition code before running preview! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                }
                return;
            }

            // Save draft
            localStorage.setItem('partC_lesson8_remake_draft', userCode);

            let cleanCode = userCode.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/gi, '');

            let compiledJS = cleanCode;
            if (typeof Babel !== 'undefined') {
                try {
                    const result = Babel.transform(cleanCode, { presets: [['react', { runtime: 'classic' }]], sourceType: 'script' });
                    compiledJS = result.code;
                } catch (babelErr) {
                    const cleanMsg = (babelErr.message || 'Syntax Error').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    renderBabelErrorInFrame(preview, cleanMsg);
                    validateRequirements(userCode);
                    return;
                }
            }

            const htmlDoc = [
                '<!DOCTYPE html>',
                '<html>',
                '<head>',
                '  <meta charset="utf-8">',
                '  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>',
                '  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>',
                '  <style>',
                '    body { margin: 0; padding: 12px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #ffffff; }',
                '    * { box-sizing: border-box; }',
                '  </style>',
                '</head>',
                '<body>',
                '  <div id="root"></div>',
                '  <script>',
                '    window.onerror = function(msg, url, line) {',
                '      document.getElementById("root").innerHTML = "<div style=\\"color: #b91c1c; background: #fff5f5; padding: 16px; border-radius: 8px; font-family: monospace; border: 1px solid #fecaca;\\">⚠️ Runtime Error: " + msg + " (Line " + line + ")</div>";',
                '    };',
                '    try {',
                compiledJS,
                '    } catch(err) {',
                '      document.getElementById("root").innerHTML = "<div style=\\"color: #b91c1c; background: #fff5f5; padding: 16px; border-radius: 8px; font-family: monospace; border: 1px solid #fecaca;\\">⚠️ Execution Error: " + err.message + "</div>";',
                '    }',
                '  </script>',
                '</body>',
                '</html>'
            ].join('\n');

            preview.srcdoc = htmlDoc;
            validateRequirements(userCode);
        }

        // Live code auto-compile on input with debounce
        let runTimer = null;
        editor.addEventListener('input', () => {
                buildLineNumbers(lineNumberEl, editor);
            clearTimeout(runTimer);
            runTimer = setTimeout(() => runCode(false), 400);
        });

            editor.addEventListener('scroll', () => {
                if (lineNumberEl) lineNumberEl.scrollTop = editor.scrollTop;
            });

        if (runBtn) runBtn.addEventListener('click', () => runCode(true));

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
                            localStorage.removeItem('partC_lesson8_remake_draft');
                            runCode(false);
                            Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                        }
                    });
                } else {
                    editor.value = defaultCode;
                        buildLineNumbers(lineNumberEl, editor);
                    localStorage.removeItem('partC_lesson8_remake_draft');
                    runCode(false);
                }
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                const userCode = editor.value || '';
                if (!userCode.trim()) {
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Code Editor is Empty!',
                            text: 'Please write your React composition code before submitting! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                    return;
                }

                if (validateRequirements(userCode)) {
                    localStorage.setItem('partC_lesson8_remake_complete', 'true');
                    if (window.showLessonCompletionModal) {
                        window.showLessonCompletionModal(
                            8,
                            "Component Composition & props.children",
                            "You've mastered component composition, props.children, and custom layout slots!",
                            "/3. partC/lesson9/lesson9_remake.html"
                        );
                    } else {
                        if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                icon: 'success',
                                title: '🎉 Lesson 8 Complete!',
                                text: "Fantastic work! You've mastered React component composition and props.children!",
                                confirmButtonColor: '#2563eb',
                                confirmButtonText: 'Continue to Lesson 9'
                            }).then(() => {
                                window.location.href = '/3. partC/lesson9/lesson9_remake.html';
                            });
                        } else {
                            alert("🎉 Lesson 8 Complete!");
                        }
                    }
                }
            });
        }

        // Initial compile
        runCode(false);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLesson8);
    } else {
        initLesson8();
    }
})();
