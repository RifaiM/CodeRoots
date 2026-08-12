// Level 5 - Lesson 14: DOM Access & useRef Hook Engine
(function() {
    'use strict';

    const defaultCode = `// 🎯 Lesson 14: DOM Access & useRef Hook (Direct DOM & Silent References)!

function RefCommandStudio() {
  // 1. Declare Ref object for direct DOM access
  const inputRef = React.useRef(null);
  
  // 2. Declare Ref object for silent mutable tracker (does NOT trigger re-render)
  const commandHistoryCount = React.useRef(0);

  const [lastCommand, setLastCommand] = React.useState("System initialized");
  const [logs, setLogs] = React.useState(["[SYS]: Ready for developer commands"]);

  // Handler for direct DOM focus action
  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.borderColor = "#2563eb";
      inputRef.current.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.25)";
    }
  };

  // Handler for submitting command using ref value
  const handleExecuteCommand = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      const cmdText = inputRef.current.value.trim();
      
      // Increment silent mutable ref counter
      commandHistoryCount.current++;

      setLastCommand(cmdText);
      setLogs((prev) => [\`[CMD #\${commandHistoryCount.current}]: \${cmdText}\`, ...prev]);

      // Clear input DOM element directly using ref
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', background: '#f8fafc', borderRadius: '16px' }}>
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '16px', marginBottom: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 12px 0', color: '#0f172a', fontSize: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>🎯 DOM Ref Command Studio</span>
          <span style={{ fontSize: '0.72rem', background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '10px' }}>
            useRef Active
          </span>
        </h3>

        {/* Input attached to inputRef */}
        <div style={{ marginBottom: '10px' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type terminal command..."
            onKeyDown={(e) => e.key === 'Enter' && handleExecuteCommand()}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '0.85rem', outline: 'none', transition: 'all 0.2s ease' }}
          />
        </div>

        {/* Command Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleFocusInput}
            style={{ flex: 1, background: '#334155', color: 'white', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: '700' }}
          >
            🔍 Focus Input (ref.focus)
          </button>
          <button
            onClick={handleExecuteCommand}
            style={{ flex: 1, background: '#2563eb', color: 'white', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: '700' }}
          >
            ⚡ Execute Command
          </button>
        </div>
      </div>

      {/* Terminal Log Window */}
      <div style={{ background: '#0f172a', borderRadius: '14px', padding: '16px', color: '#f8fafc' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h4 style={{ margin: 0, color: '#38bdf8', fontSize: '0.9rem' }}>💻 Execution Terminal</h4>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            Total Executions (Ref): <strong>{commandHistoryCount.current}</strong>
          </span>
        </div>

        <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', background: '#090d16', padding: '12px', borderRadius: '8px', minHeight: '100px', maxHeight: '140px', overflowY: 'auto' }}>
          {logs.map((log, idx) => (
            <div key={idx} style={{ color: idx === 0 ? '#4ade80' : '#94a3b8', marginBottom: '4px' }}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Render Root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RefCommandStudio />);`;

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
        const req1 = /useRef\s*\(/i.test(code);
        const req2 = /ref\s*=\s*\{/i.test(code);
        const req3 = /\.current/i.test(code);
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

    function initLesson14() {
        const editor = document.getElementById('codeEditor');
        const preview = document.getElementById('previewFrame');
        const runBtn = document.getElementById('runCodeBtn');
        const resetBtn = document.getElementById('resetCodeBtn');
        const submitBtn = document.getElementById('submitProjectBtn');

        if (!editor || !preview) return;

        // Auto-restore draft from localStorage
        const savedDraft = localStorage.getItem('partC_lesson14_remake_draft');
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
                            text: 'Please write your useRef code before running preview! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                }
                return;
            }

            // Save draft
            localStorage.setItem('partC_lesson14_remake_draft', userCode);

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
                            localStorage.removeItem('partC_lesson14_remake_draft');
                            runCode(false);
                            Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                        }
                    });
                } else {
                    editor.value = defaultCode;
                    localStorage.removeItem('partC_lesson14_remake_draft');
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
                            text: 'Please write your useRef code before submitting! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                    return;
                }

                if (validateRequirements(userCode)) {
                    localStorage.setItem('partC_lesson14_remake_complete', 'true');
                    if (window.showLessonCompletionModal) {
                        window.showLessonCompletionModal(
                            14,
                            "DOM Access & useRef Hook",
                            "You've mastered useRef, direct DOM manipulation, and silent mutable references!",
                            "/3. partC/lesson15/lesson15_remake.html"
                        );
                    } else {
                        if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                icon: 'success',
                                title: '🎉 Lesson 14 Complete!',
                                text: "Fantastic work! You've mastered React useRef and direct DOM access!",
                                confirmButtonColor: '#2563eb',
                                confirmButtonText: 'Continue to Capstone Project (Lesson 15)'
                            }).then(() => {
                                window.location.href = '/3. partC/lesson15/lesson15_remake.html';
                            });
                        } else {
                            alert("🎉 Lesson 14 Complete!");
                        }
                    }
                }
            });
        }

        // Initial compile
        runCode(false);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLesson14);
    } else {
        initLesson14();
    }
})();
