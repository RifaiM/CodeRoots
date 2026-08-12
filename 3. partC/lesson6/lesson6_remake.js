// Level 5 - Lesson 6: React Controlled Form Inputs & Two-Way Binding Engine
(function() {
    'use strict';

    const defaultCode = `// 📝 Lesson 6: React Controlled Form Inputs & Two-Way Data Binding!

function ProfileBadgeGenerator() {
  // 1. Declare state variables for controlled form inputs
  const [developerName, setDeveloperName] = React.useState("Alex Rivera");
  const [specialty, setSpecialty] = React.useState("Frontend Architect");
  const [bio, setBio] = React.useState("Building interactive React web applications!");
  const [isAvailable, setIsAvailable] = React.useState(true);

  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto' }}>
      <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '18px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 14px 0', color: '#0f172a', fontSize: '1rem' }}>
          📝 Form Controls (Controlled State)
        </h3>

        {/* Controlled Input 1: Developer Name */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
            Full Name:
          </label>
          <input 
            type="text" 
            value={developerName} 
            onChange={(e) => setDeveloperName(e.target.value)} 
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '0.85rem' }}
          />
        </div>

        {/* Controlled Input 2: Specialty Select Dropdown */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
            Specialty Role:
          </label>
          <select 
            value={specialty} 
            onChange={(e) => setSpecialty(e.target.value)} 
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '0.85rem' }}
          >
            <option value="Frontend Architect">Frontend Architect</option>
            <option value="React Specialist">React Specialist</option>
            <option value="Full-Stack Ninja">Full-Stack Ninja</option>
            <option value="UI/UX Engineer">UI/UX Engineer</option>
          </select>
        </div>

        {/* Controlled Input 3: Short Bio Textarea */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
            Short Bio:
          </label>
          <textarea 
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', height: '54px', resize: 'none', fontSize: '0.85rem' }}
          />
        </div>

        {/* Controlled Toggle: Availability */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#334155', fontWeight: '600', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={isAvailable} 
            onChange={(e) => setIsAvailable(e.target.checked)} 
          />
          Open for Freelance Projects
        </label>
      </div>

      {/* Live Badge Preview */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '16px', padding: '20px', color: 'white', boxShadow: '0 12px 28px rgba(15,23,42,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ background: '#0d9488', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700' }}>
            {specialty}
          </span>
          <span style={{ fontSize: '0.78rem', color: isAvailable ? '#4ade80' : '#f87171', fontWeight: '700' }}>
            {isAvailable ? '🟢 Available' : '🔴 Busy'}
          </span>
        </div>

        <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem' }}>{developerName || 'Anonymous Developer'}</h3>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>{bio || 'No bio provided yet.'}</p>
      </div>
    </div>
  );
}

// 3. Render Component Tree
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProfileBadgeGenerator />);`;

    // Show SweetAlert error modal
    function showError(icon, title, message) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'warning',
                title: `${icon} ${title}`,
                text: message,
                confirmButtonColor: '#0d9488',
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
        const req2 = /value\s*=\s*\{[a-zA-Z0-9_\s.]+\}/i.test(code);
        const req3 = /onChange\s*=\s*\{/i.test(code) && /e\.target\.(value|checked)/i.test(code);
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

    function initLesson6() {
        const editor = document.getElementById('codeEditor');
        const preview = document.getElementById('previewFrame');
        const runBtn = document.getElementById('runCodeBtn');
        const resetBtn = document.getElementById('resetCodeBtn');
        const submitBtn = document.getElementById('submitProjectBtn');

        if (!editor || !preview) return;

        // Auto-restore draft from localStorage
        const savedDraft = localStorage.getItem('partC_lesson6_remake_draft');
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
                            text: 'Please write your React controlled form code before running preview! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                }
                return;
            }

            // Save draft
            localStorage.setItem('partC_lesson6_remake_draft', userCode);

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
                            localStorage.removeItem('partC_lesson6_remake_draft');
                            runCode(false);
                            Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                        }
                    });
                } else {
                    editor.value = defaultCode;
                    localStorage.removeItem('partC_lesson6_remake_draft');
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
                            text: 'Please write your React controlled form code before submitting! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                    return;
                }

                if (validateRequirements(userCode)) {
                    localStorage.setItem('partC_lesson6_remake_complete', 'true');
                    if (window.showLessonCompletionModal) {
                        window.showLessonCompletionModal(
                            6,
                            "React Controlled Form Inputs & Two-Way Binding",
                            "You've mastered controlled components, value binding, and e.target.value event handling!",
                            "/3. partC/lesson7/lesson7_remake.html"
                        );
                    } else {
                        if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                icon: 'success',
                                title: '🎉 Lesson 6 Complete!',
                                text: "Great job! You've mastered React controlled inputs and two-way form data binding!",
                                confirmButtonColor: '#0d9488',
                                confirmButtonText: 'Continue to Lesson 7'
                            }).then(() => {
                                window.location.href = '/3. partC/lesson7/lesson7_remake.html';
                            });
                        } else {
                            alert("🎉 Lesson 6 Complete!");
                        }
                    }
                }
            });
        }

        // Initial compile
        runCode(false);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLesson6);
    } else {
        initLesson6();
    }
})();
