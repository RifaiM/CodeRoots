// Level 5 - Lesson 7: Component Lifecycle & Side Effects (useEffect) Engine
(function() {
    'use strict';

    
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

    const defaultCode = `// 🔄 Lesson 7: Component Lifecycle & Side Effects with useEffect!

function DevNewsFetcher() {
  // 1. Component State
  const [category, setCategory] = React.useState("react");
  const [articles, setArticles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // 2. Side Effect: Fetch dev news whenever category changes!
  React.useEffect(() => {
    setIsLoading(true);

    // Simulated API response delay
    const timer = setTimeout(() => {
      const mockDatabase = {
        react: [
          { id: 1, title: "React 19 Features Overview", author: "Dan Abramov", likes: 340 },
          { id: 2, title: "Mastering useEffect & Custom Hooks", author: "Sophie Alpert", likes: 215 },
          { id: 3, title: "Building Fast Web Apps with React & Vite", author: "Ryan Florence", likes: 180 }
        ],
        javascript: [
          { id: 4, title: "ES2026 Features Every Dev Should Know", author: "TC39 Team", likes: 450 },
          { id: 5, title: "Deep Dive into JS Event Loop & Promises", author: "Addy Osmani", likes: 310 }
        ],
        css: [
          { id: 6, title: "Modern CSS Grid & Flexbox Techniques", author: "Rachel Andrew", likes: 290 },
          { id: 7, title: "Building Glassmorphic UIs with CSS", author: "Sarah Drasner", likes: 195 }
        ]
      };

      setArticles(mockDatabase[category] || []);
      setIsLoading(false);
    }, 600);

    // Cleanup timer on unmount / category change
    return () => clearTimeout(timer);
  }, [category]); // 3. Dependency Array: re-run effect when category changes!

  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto' }}>
      <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', color: '#0f172a', fontSize: '1rem' }}>
          📡 Select Tech Category (Triggers useEffect)
        </h3>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['react', 'javascript', 'css'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: category === cat ? '#2563eb' : '#ffffff',
                color: category === cat ? '#ffffff' : '#334155',
                fontWeight: '700',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Live Data Render Canvas */}
      <div style={{ background: '#0f172a', borderRadius: '16px', padding: '20px', color: 'white' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#38bdf8', fontSize: '0.95rem' }}>
          📰 Live {category.toUpperCase()} News Stream:
        </h4>

        {isLoading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
            ⌛ Fetching latest articles via useEffect...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {articles.map((item) => (
              <div key={item.id} style={{ background: '#1e293b', padding: '12px 14px', borderRadius: '10px', border: '1px solid #334155' }}>
                <h5 style={{ margin: '0 0 4px 0', color: '#f8fafc', fontSize: '0.9rem' }}>{item.title}</h5>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8' }}>
                  <span>✍️ {item.author}</span>
                  <span>❤️ {item.likes} likes</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 4. Render Root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DevNewsFetcher />);`;

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
        const req1 = /useEffect\s*\(/i.test(code);
        const req2 = /,\s*\[\s*[a-zA-Z0-9_,\s.]*\]\s*\)/i.test(code);
        const req3 = /set[A-Z][a-zA-Z0-9_]*\s*\(/i.test(code);
        const req4 = /\{[a-zA-Z0-9_\s.()?:]+\}/.test(code);

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

    function initLesson7() {
        const editor = document.getElementById('codeEditor');
        const lineNumberEl = document.getElementById('lineNumbers');
        const preview = document.getElementById('previewFrame');
        const runBtn = document.getElementById('runCodeBtn');
        const resetBtn = document.getElementById('resetCodeBtn');
        const submitBtn = document.getElementById('submitProjectBtn');

        if (!editor || !preview) return;

        // Auto-restore draft from localStorage
        const savedDraft = localStorage.getItem('partC_lesson7_remake_draft');
        if (savedDraft !== null) {
            editor.value = savedDraft;
        } else {
            editor.value = defaultCode;
                        if (typeof DojoLinter !== 'undefined') DojoLinter.check(editor.value);
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
                            text: 'Please write your React useEffect code before running preview! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                }
                return;
            }

            // Save draft
            localStorage.setItem('partC_lesson7_remake_draft', userCode);

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
                        if (typeof DojoLinter !== 'undefined') DojoLinter.check(editor.value);
                        buildLineNumbers(lineNumberEl, editor);
                            localStorage.removeItem('partC_lesson7_remake_draft');
                            runCode(false);
                            Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                        }
                    });
                } else {
                    editor.value = defaultCode;
                        if (typeof DojoLinter !== 'undefined') DojoLinter.check(editor.value);
                        buildLineNumbers(lineNumberEl, editor);
                    localStorage.removeItem('partC_lesson7_remake_draft');
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
                            text: 'Please write your React useEffect code before submitting! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                    return;
                }

                if (validateRequirements(userCode)) {
                    localStorage.setItem('partC_lesson7_remake_complete', 'true');
                    if (window.showLessonCompletionModal) {
                        window.showLessonCompletionModal(
                            7,
                            "Component Lifecycle & Side Effects (useEffect)",
                            "You've mastered useEffect, side effects, component mounting, and dependency arrays!",
                            "/3. partC/lesson8/lesson8_remake.html"
                        );
                    } else {
                        if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                icon: 'success',
                                title: '🎉 Lesson 7 Complete!',
                                text: "Fantastic work! You've mastered React component lifecycle and useEffect side effects!",
                                confirmButtonColor: '#2563eb',
                                confirmButtonText: 'Continue to Lesson 8'
                            }).then(() => {
                                window.location.href = '/3. partC/lesson8/lesson8_remake.html';
                            });
                        } else {
                            alert("🎉 Lesson 7 Complete!");
                        }
                    }
                }
            });
        }

        // Initial compile
        runCode(false);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLesson7);
    } else {
        initLesson7();
    }
})();
