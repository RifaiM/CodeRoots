// Level 5 - Lesson 15: Capstone Framework Web App Engine & Graduation
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

    const defaultCode = `// 🏆 Lesson 15: Level 5 Capstone - Production-Grade Developer Productivity App!

// 1. Create Global App Context
const AppContext = React.createContext(null);

// 2. Custom Hook: useLocalStorage for persistent state
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
      console.error(err);
    }
  }, [key, value]);

  return [value, setValue];
}

// 3. Provider Component managing Capstone state
function CapstoneProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("capstone_tasks", [
    { id: 1, text: "Master ES6 & React Mental Model", category: "core", completed: true },
    { id: 2, text: "Build Custom Hooks & Context API", category: "advanced", completed: true },
    { id: 3, text: "Deploy Level 5 Capstone App", category: "project", completed: false }
  ]);
  const [theme, setTheme] = useLocalStorage("capstone_theme", "dark");
  const [searchQuery, setSearchQuery] = React.useState("");

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  const addTask = (text, category) => {
    const newTask = { id: Date.now(), text, category: category || "general", completed: false };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Performance Optimization: useMemo for memoized filtering
  const filteredTasks = React.useMemo(() => {
    return tasks.filter(t => t.text.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tasks, searchQuery]);

  return (
    <AppContext.Provider value={{
      tasks: filteredTasks,
      totalCount: tasks.length,
      completedCount: tasks.filter(t => t.completed).length,
      theme,
      toggleTheme,
      searchQuery,
      setSearchQuery,
      addTask,
      toggleTask,
      deleteTask
    }}>
      {children}
    </AppContext.Provider>
  );
}

// 4. Component Component: TaskInputForm (uses useRef for focus)
function TaskInputForm() {
  const { addTask } = React.useContext(AppContext);
  const [text, setText] = React.useState("");
  const [category, setCategory] = React.useState("general");
  const inputRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text.trim(), category);
    setText("");
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: '12px', marginBottom: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter new developer task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', background: 'white' }}
        >
          <option value="general">General</option>
          <option value="core">Core React</option>
          <option value="advanced">Advanced</option>
          <option value="project">Project</option>
        </select>
      </div>
      <button
        type="submit"
        style={{ width: '100%', background: '#2563eb', color: 'white', border: 'none', padding: '8px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }}
      >
        + Add Developer Task (useRef Focus)
      </button>
    </form>
  );
}

// 5. Component: TaskListDisplay
function TaskListDisplay() {
  const { tasks, toggleTask, deleteTask, searchQuery, setSearchQuery } = React.useContext(AppContext);

  return (
    <div>
      <input
        type="text"
        placeholder="🔍 Search tasks (useMemo active)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '0.82rem', marginBottom: '12px' }}
      />

      {tasks.length === 0 ? (
        <p style={{ fontSize: '0.82rem', opacity: 0.7, textAlign: 'center' }}>No tasks found matching your filter.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tasks.map(t => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.08)', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" checked={t.completed} onChange={() => toggleTask(t.id)} />
                <span style={{ textDecoration: t.completed ? 'line-through' : 'none', opacity: t.completed ? 0.6 : 1, fontSize: '0.85rem' }}>
                  {t.text} <small style={{ opacity: 0.6 }}>({t.category})</small>
                </span>
              </div>
              <button onClick={() => deleteTask(t.id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.72rem' }}>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 6. Main Dashboard Component
function DevDashboardApp() {
  const { theme, toggleTheme, totalCount, completedCount } = React.useContext(AppContext);

  const isDark = theme === "dark";

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'sans-serif',
      maxWidth: '480px',
      margin: '0 auto',
      background: isDark ? '#0f172a' : '#f8fafc',
      color: isDark ? '#f8fafc' : '#0f172a',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem' }}>🏆 React Dev Workspace</h3>
        <button
          onClick={toggleTheme}
          style={{ background: isDark ? '#38bdf8' : '#0f172a', color: isDark ? '#0f172a' : '#ffffff', border: 'none', padding: '4px 10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}
        >
          {isDark ? "☀️ Light" : "🌙 Dark"} Mode
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <div style={{ flex: 1, background: isDark ? '#1e293b' : '#ffffff', border: '1px solid #cbd5e1', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontWeight: '800', fontSize: '1rem', color: '#2563eb' }}>{completedCount}/{totalCount}</div>
          <div style={{ fontSize: '0.72rem', opacity: 0.7 }}>Tasks Done</div>
        </div>
        <div style={{ flex: 1, background: isDark ? '#1e293b' : '#ffffff', border: '1px solid #cbd5e1', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontWeight: '800', fontSize: '1rem', color: '#10b981' }}>Level 5</div>
          <div style={{ fontSize: '0.72rem', opacity: 0.7 }}>React Mastery</div>
        </div>
      </div>

      <TaskInputForm />
      <TaskListDisplay />
    </div>
  );
}

// 7. Root App Wrapper
function CapstoneRoot() {
  return (
    <CapstoneProvider>
      <DevDashboardApp />
    </CapstoneProvider>
  );
}

// Render Root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CapstoneRoot />);`;

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
        const req1 = /createContext/i.test(code) && /Provider/i.test(code);
        const req2 = /useState|useEffect|useLocalStorage/i.test(code);
        const req3 = /useMemo/i.test(code);
        const req4 = /useRef/i.test(code);

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

    function initLesson15() {
        const editor = document.getElementById('codeEditor');
        const lineNumberEl = document.getElementById('lineNumbers');
        const preview = document.getElementById('previewFrame');
        const runBtn = document.getElementById('runCodeBtn');
        const resetBtn = document.getElementById('resetCodeBtn');
        const submitBtn = document.getElementById('submitProjectBtn');

        if (!editor || !preview) return;

        // Auto-restore draft from localStorage
        const savedDraft = localStorage.getItem('partC_lesson15_remake_draft');
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
                            text: 'Please write your Capstone React code before running preview! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                }
                return;
            }

            // Save draft
            localStorage.setItem('partC_lesson15_remake_draft', userCode);

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
                            localStorage.removeItem('partC_lesson15_remake_draft');
                            runCode(false);
                            Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                        }
                    });
                } else {
                    editor.value = defaultCode;
                        buildLineNumbers(lineNumberEl, editor);
                    localStorage.removeItem('partC_lesson15_remake_draft');
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
                            text: 'Please write your Capstone React code before submitting! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                    return;
                }

                if (validateRequirements(userCode)) {
                    localStorage.setItem('partC_lesson15_remake_complete', 'true');
                    if (window.showLessonCompletionModal) {
                        window.showLessonCompletionModal(
                            15,
                            "🏆 Capstone Framework Web App",
                            "Congratulations! You've mastered React & Modern Frontend Engineering and completed Level 5!",
                            "/3. partC/certificate.html"
                        );
                    } else {
                        if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                icon: 'success',
                                title: '🎓 Level 5 Completed!',
                                text: "Congratulations! You've mastered React & Modern Frontend Engineering! Claim your official Level 5 Certificate now 📜",
                                confirmButtonColor: '#2563eb',
                                confirmButtonText: 'Claim Level 5 Certificate 📜'
                            }).then(() => {
                                window.location.href = '/3. partC/certificate.html';
                            });
                        } else {
                            alert("🎓 Level 5 Completed!");
                        }
                    }
                }
            });
        }

        // Initial compile
        runCode(false);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLesson15);
    } else {
        initLesson15();
    }
})();
