// Level 5 - Lesson 3: JSX Syntax & Dynamic Rendering Engine with Real-Time Auto-Save Drafts
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

    function initLesson3() {
        const editor = document.getElementById('codeEditor');
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
        }

        function runCode() {
            const userCode = editor.value || '';

            if (!userCode.trim()) {
                validateRequirements('');
                preview.srcdoc = '';
                return;
            }

            // Generate iframe srcdoc with React 18, Babel standalone, and custom component styles
            const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f8fafc;
            color: #0f172a;
            margin: 0;
            padding: 16px;
            display: flex;
            justify-content: center;
        }

        .card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 20px;
            max-width: 380px;
            width: 100%;
            box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
            text-align: center;
        }

        .avatar {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #2563eb;
            margin-bottom: 12px;
        }

        .card h2 {
            margin: 0 0 4px 0;
            font-size: 1.2rem;
            color: #0f172a;
        }

        .subtitle {
            margin: 0 0 14px 0;
            font-size: 0.82rem;
            color: #64748b;
        }

        hr {
            border: none;
            border-top: 1px solid #f1f5f9;
            margin: 14px 0;
        }

        .card h3 {
            margin: 0 0 10px 0;
            font-size: 0.90rem;
            color: #1e293b;
            text-align: left;
        }

        .skill-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .badge {
            background: #eff6ff;
            color: #2563eb;
            border: 1px solid #bfdbfe;
            border-radius: 14px;
            padding: 4px 12px;
            font-size: 0.78rem;
            font-weight: 700;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        try {
            ${userCode}
        } catch (err) {
            document.getElementById('root').innerHTML = '<div style="color: #ef4444; padding: 12px; background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; font-family: monospace; font-size: 0.82rem;">❌ JSX Syntax Error: ' + err.message + '</div>';
        }
    </script>
</body>
</html>`;

            preview.srcdoc = htmlContent;
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
                            editor.value = '';
                            preview.srcdoc = '';
                            localStorage.removeItem('partC_lesson3_remake_draft');
                            validateRequirements('');
                            Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                        }
                    });
                } else {
                    editor.value = '';
                    preview.srcdoc = '';
                    localStorage.removeItem('partC_lesson3_remake_draft');
                    validateRequirements('');
                }
            });
        }

        if (editor) {
            editor.addEventListener('input', () => {
                localStorage.setItem('partC_lesson3_remake_draft', editor.value);
                runCode();
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
