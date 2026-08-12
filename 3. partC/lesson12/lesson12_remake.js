// Level 5 - Lesson 12: Building Custom React Hooks Engine
(function() {
    'use strict';

    const defaultCode = `// 🧰 Lesson 12: Building Custom React Hooks (useLocalStorage & useToggle)!

// 1. Custom Hook: useLocalStorage (Persists state to localStorage automatically)
function useLocalStorage(key, initialValue) {
  const [value, setValue] = React.useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("localStorage error:", err);
    }
  }, [key, value]);

  return [value, setValue];
}

// 2. Custom Hook: useToggle (Encapsulates boolean toggle logic)
function useToggle(initialState = false) {
  const [on, setOn] = React.useState(initialState);
  const toggle = React.useCallback(() => {
    setOn((prev) => !prev);
  }, []);
  return [on, toggle];
}

// 3. Main Component Consuming Custom Hooks
function DeveloperPreferencesApp() {
  // Consuming custom useLocalStorage hook
  const [username, setUsername] = useLocalStorage("dev_username", "Alex Programmer");
  const [accentColor, setAccentColor] = useLocalStorage("dev_accent", "#2563eb");

  // Consuming custom useToggle hook
  const [isDarkMode, toggleDarkMode] = useToggle(false);

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'sans-serif',
      maxWidth: '480px',
      margin: '0 auto',
      background: isDarkMode ? '#0f172a' : '#f8fafc',
      color: isDarkMode ? '#f8fafc' : '#0f172a',
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease'
    }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', textAlign: 'center' }}>
        🧰 Custom Hook Settings Manager
      </h3>

      {/* Theme Toggle Section */}
      <div style={{ background: isDarkMode ? '#1e293b' : '#ffffff', padding: '14px', borderRadius: '12px', marginBottom: '14px', border: '1px solid #cbd5e1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Theme Mode</div>
            <div style={{ fontSize: '0.78rem', color: isDarkMode ? '#94a3b8' : '#64748b' }}>
              Current: <strong>{isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}</strong>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            style={{
              background: accentColor,
              color: 'white',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '0.78rem'
            }}
          >
            Toggle Theme
          </button>
        </div>
      </div>

      {/* Persistent Username Section */}
      <div style={{ background: isDarkMode ? '#1e293b' : '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
        <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '6px' }}>
          Developer Username (Auto-Saved):
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            boxSizing: 'border-box',
            fontSize: '0.85rem',
            marginBottom: '10px'
          }}
        />
        <div style={{ fontSize: '0.75rem', color: isDarkMode ? '#38bdf8' : '#2563eb' }}>
          💾 Automatically synced to localStorage key: <code>"dev_username"</code>
        </div>
      </div>
    </div>
  );
}

// Render Root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DeveloperPreferencesApp />);`;

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
        const req1 = /function\s+use[A-Z][a-zA-Z0-9_]*/.test(code) || /const\s+use[A-Z][a-zA-Z0-9_]*\s*=/.test(code);
        const req2 = /useState|useEffect|useCallback|useMemo/i.test(code);
        const req3 = /return\s+\[[\s\S]*?\]|return\s+\{[\s\S]*?\}/.test(code);
        const req4 = /use[A-Z][a-zA-Z0-9_]*\s*\(/i.test(code);

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

    function initLesson12() {
        const editor = document.getElementById('codeEditor');
        const lineNumberEl = document.getElementById('lineNumbers');
        const preview = document.getElementById('previewFrame');
        const runBtn = document.getElementById('runCodeBtn');
        const resetBtn = document.getElementById('resetCodeBtn');
        const submitBtn = document.getElementById('submitProjectBtn');

        if (!editor || !preview) return;

        // Auto-restore draft from localStorage
        const savedDraft = localStorage.getItem('partC_lesson12_remake_draft');
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
                            text: 'Please write your custom hook code before running preview! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                }
                return;
            }

            // Save draft
            localStorage.setItem('partC_lesson12_remake_draft', userCode);

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
                            localStorage.removeItem('partC_lesson12_remake_draft');
                            runCode(false);
                            Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                        }
                    });
                } else {
                    editor.value = defaultCode;
                        buildLineNumbers(lineNumberEl, editor);
                    localStorage.removeItem('partC_lesson12_remake_draft');
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
                            text: 'Please write your custom hook code before submitting! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                    return;
                }

                if (validateRequirements(userCode)) {
                    localStorage.setItem('partC_lesson12_remake_complete', 'true');
                    if (window.showLessonCompletionModal) {
                        window.showLessonCompletionModal(
                            12,
                            "Building Custom React Hooks",
                            "You've mastered custom hooks, stateful logic encapsulation, and reusability!",
                            "/3. partC/lesson13/lesson13_remake.html"
                        );
                    } else {
                        if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                icon: 'success',
                                title: '🎉 Lesson 12 Complete!',
                                text: "Fantastic work! You've mastered custom React hooks!",
                                confirmButtonColor: '#2563eb',
                                confirmButtonText: 'Continue to Lesson 13'
                            }).then(() => {
                                window.location.href = '/3. partC/lesson13/lesson13_remake.html';
                            });
                        } else {
                            alert("🎉 Lesson 12 Complete!");
                        }
                    }
                }
            });
        }

        // Initial compile
        runCode(false);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLesson12);
    } else {
        initLesson12();
    }
})();
