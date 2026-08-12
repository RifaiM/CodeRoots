// Level 5 - Lesson 13: Context API & Global State Management Engine
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

    const defaultCode = `// 📡 Lesson 13: Context API & Global State Management (createContext & useContext)!

// 1. Create Global Context Object
const AppContext = React.createContext(null);

// 2. Custom Provider Component to manage global state
function AppProvider({ children }) {
  const [user, setUser] = React.useState({ name: "Alex Dev", role: "Frontend Lead", isLoggedIn: true });
  const [theme, setTheme] = React.useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const logout = () => {
    setUser({ name: "Guest User", role: "Visitor", isLoggedIn: false });
  };

  const login = () => {
    setUser({ name: "Alex Dev", role: "Frontend Lead", isLoggedIn: true });
  };

  return (
    <AppContext.Provider value={{ user, theme, toggleTheme, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

// 3. Deep Nested Child Component A: UserProfileCard (Consumes Context Directly!)
function UserProfileCard() {
  // Plug directly into global context using useContext!
  const { user, login, logout } = React.useContext(AppContext);

  return (
    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '14px', marginBottom: '12px', color: '#f8fafc' }}>
      <h4 style={{ margin: '0 0 8px 0', color: '#38bdf8', fontSize: '0.9rem' }}>👤 User Auth Context Status</h4>
      <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem' }}>
        Status: <strong>{user.isLoggedIn ? \`🟢 \${user.name} (\${user.role})\` : "🔴 Logged Out (Guest)"}</strong>
      </p>
      {user.isLoggedIn ? (
        <button
          onClick={logout}
          style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: '700' }}
        >
          Logout
        </button>
      ) : (
        <button
          onClick={login}
          style={{ background: '#10b981', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: '700' }}
        >
          Login as Alex
        </button>
      )}
    </div>
  );
}

// 4. Deep Nested Child Component B: ThemeSwitcherButton (Consumes Theme Context!)
function ThemeSwitcherButton() {
  const { theme, toggleTheme } = React.useContext(AppContext);

  return (
    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '14px', color: '#f8fafc' }}>
      <h4 style={{ margin: '0 0 8px 0', color: '#a855f7', fontSize: '0.9rem' }}>🎨 Global Theme Context</h4>
      <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem' }}>
        Active Theme: <strong>{theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}</strong>
      </p>
      <button
        onClick={toggleTheme}
        style={{ background: '#a855f7', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: '700' }}
      >
        Toggle Global Theme
      </button>
    </div>
  );
}

// 5. App Layout (Intermediate Component - NO PROP DRILLING!)
function AppLayout() {
  const { theme } = React.useContext(AppContext);

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'sans-serif',
      maxWidth: '480px',
      margin: '0 auto',
      background: theme === "dark" ? "#0f172a" : "#f8fafc",
      color: theme === "dark" ? "#f8fafc" : "#0f172a",
      borderRadius: '16px',
      transition: 'all 0.3s ease'
    }}>
      <h3 style={{ margin: '0 0 16px 0', textAlign: 'center', fontSize: '1.1rem' }}>
        📡 Global App Context Portal
      </h3>

      {/* Deep Nested Components consuming global state cleanly */}
      <UserProfileCard />
      <ThemeSwitcherButton />
    </div>
  );
}

// 6. Top Level App wrapped with Provider
function RootApp() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}

// Render Root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootApp />);`;

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
        const req1 = /createContext\s*\(/i.test(code);
        const req2 = /<[a-zA-Z0-9_]*Context\.Provider[^>]*value\s*=\s*\{/i.test(code) || /Provider/i.test(code);
        const req3 = /useContext\s*\(/i.test(code);
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

    function initLesson13() {
        const editor = document.getElementById('codeEditor');
        const lineNumberEl = document.getElementById('lineNumbers');
        const preview = document.getElementById('previewFrame');
        const runBtn = document.getElementById('runCodeBtn');
        const resetBtn = document.getElementById('resetCodeBtn');
        const submitBtn = document.getElementById('submitProjectBtn');

        if (!editor || !preview) return;

        // Auto-restore draft from localStorage
        const savedDraft = localStorage.getItem('partC_lesson13_remake_draft');
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
                            text: 'Please write your React Context code before running preview! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                }
                return;
            }

            // Save draft
            localStorage.setItem('partC_lesson13_remake_draft', userCode);

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
                            localStorage.removeItem('partC_lesson13_remake_draft');
                            runCode(false);
                            Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                        }
                    });
                } else {
                    editor.value = defaultCode;
                        if (typeof DojoLinter !== 'undefined') DojoLinter.check(editor.value);
                        buildLineNumbers(lineNumberEl, editor);
                    localStorage.removeItem('partC_lesson13_remake_draft');
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
                            text: 'Please write your React Context code before submitting! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                    return;
                }

                if (validateRequirements(userCode)) {
                    localStorage.setItem('partC_lesson13_remake_complete', 'true');
                    if (window.showLessonCompletionModal) {
                        window.showLessonCompletionModal(
                            13,
                            "Context API & Global State Management",
                            "You've mastered createContext, useContext, and global state management without prop drilling!",
                            "/3. partC/lesson14/lesson14_remake.html"
                        );
                    } else {
                        if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                icon: 'success',
                                title: '🎉 Lesson 13 Complete!',
                                text: "Fantastic work! You've mastered React Context API and global state!",
                                confirmButtonColor: '#2563eb',
                                confirmButtonText: 'Continue to Lesson 14'
                            }).then(() => {
                                window.location.href = '/3. partC/lesson14/lesson14_remake.html';
                            });
                        } else {
                            alert("🎉 Lesson 13 Complete!");
                        }
                    }
                }
            });
        }

        // Initial compile
        runCode(false);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLesson13);
    } else {
        initLesson13();
    }
})();
