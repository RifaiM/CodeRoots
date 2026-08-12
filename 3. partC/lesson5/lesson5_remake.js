// Level 5 - Lesson 5: React State & Interactive Events Engine (useState)
(function() {
    'use strict';

    const defaultCode = `// ⚡ Lesson 5: React State (useState) & Interactive Events!

function DojoCounterApp() {
  // 1. Declare state variables using React.useState()
  const [likes, setLikes] = React.useState(0);
  const [isFavorited, setIsFavorited] = React.useState(false);

  // 2. Component Event Handlers
  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => setLikes(likes > 0 ? likes - 1 : 0);
  const handleReset = () => setLikes(0);
  const toggleFavorite = () => setIsFavorited(!isFavorited);

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '420px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>⚡ DevDojo Like Booster</h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Interactive UI powered by React useState!</p>

        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', margin: '20px 0' }}>
          ❤️ {likes} Likes
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
          <button onClick={handleLike} style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>
            👍 Like
          </button>
          <button onClick={handleDislike} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>
            👎 Dislike
          </button>
          <button onClick={handleReset} style={{ background: '#64748b', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>
            🔄 Reset
          </button>
        </div>

        <button onClick={toggleFavorite} style={{ background: isFavorited ? '#f59e0b' : '#e2e8f0', color: isFavorited ? 'white' : '#475569', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: '700' }}>
          {isFavorited ? '⭐ Favorited' : '☆ Add to Favorites'}
        </button>
      </div>
    </div>
  );
}

// 3. Render Component Tree
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DojoCounterApp />);`;

    // Show SweetAlert error modal
    function showError(icon, title, message) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'warning',
                title: `${icon} ${title}`,
                text: message,
                confirmButtonColor: '#f59e0b',
                confirmButtonText: 'Got It!'
            });
        }
    }

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
        const req1 = /useState\s*\(/i.test(code);
        const req2 = /\{[a-zA-Z0-9_\s.()?:]+\}/.test(code);
        const req3 = /onClick\s*=\s*\{/i.test(code);
        const req4 = /set[A-Z][a-zA-Z0-9_]*\s*\(/i.test(code);

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

    function initLesson5() {
        const editor = document.getElementById('codeEditor');
        const preview = document.getElementById('previewFrame');
        const runBtn = document.getElementById('runCodeBtn');
        const resetBtn = document.getElementById('resetCodeBtn');
        const submitBtn = document.getElementById('submitProjectBtn');

        if (!editor || !preview) return;

        // Auto-restore draft from localStorage
        const savedDraft = localStorage.getItem('partC_lesson5_remake_draft');
        if (savedDraft !== null) {
            editor.value = savedDraft;
        } else {
            editor.value = defaultCode;
        }

        // Activate Dojo Linter (JSX mode)
        if (typeof DojoLinter !== 'undefined') {
            DojoLinter.init('codeEditor', 'dojoLintPanel', { mode: 'jsx' });
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
                            text: 'Please write your React state code before running preview! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                }
                return;
            }

            // Save draft
            localStorage.setItem('partC_lesson5_remake_draft', userCode);

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
            clearTimeout(runTimer);
            runTimer = setTimeout(() => runCode(false), 400);
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
                            localStorage.removeItem('partC_lesson5_remake_draft');
                            runCode(false);
                            Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                        }
                    });
                } else {
                    editor.value = defaultCode;
                    localStorage.removeItem('partC_lesson5_remake_draft');
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
                            text: 'Please write your React state code before submitting! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                    return;
                }

                if (validateRequirements(userCode)) {
                    localStorage.setItem('partC_lesson5_remake_complete', 'true');
                    if (window.showLessonCompletionModal) {
                        window.showLessonCompletionModal(
                            5,
                            "React State & Interactive Events (useState)",
                            "You've mastered React useState hooks, event handlers, and component re-rendering!",
                            "/3. partC/lesson6/lesson6_remake.html"
                        );
                    } else {
                        if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                icon: 'success',
                                title: '🎉 Lesson 5 Complete!',
                                text: "Great job! You've mastered React useState hooks and event handling!",
                                confirmButtonColor: '#10b981',
                                confirmButtonText: 'Continue to Lesson 6'
                            }).then(() => {
                                window.location.href = '/3. partC/lesson6/lesson6_remake.html';
                            });
                        } else {
                            alert("🎉 Lesson 5 Complete!");
                        }
                    }
                }
            });
        }

        // Initial compile
        runCode();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLesson5);
    } else {
        initLesson5();
    }
})();
