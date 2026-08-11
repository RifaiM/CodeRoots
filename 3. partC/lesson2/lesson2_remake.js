// Level 5 - Lesson 2: The Component Mental Model & Virtual DOM Engine with Real-Time Auto-Save Drafts
(function() {
    'use strict';

    const defaultCode = `// 🍱 Lesson 2: Build a React Component Tree!

// 1. Sub-component: Header
function Header() {
  return (
    <header className="header-box">
      <h1>🍱 Component Dojo</h1>
      <p>Building UIs with reusable React components!</p>
    </header>
  );
}

// 2. Sub-component: Card
function Card({ title, desc }) {
  return (
    <div className="card-box">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

// 3. Parent Component: App (Assembles the Component Tree)
function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="grid">
        <Card title="🧩 Component Blueprint" desc="Independent reusable building blocks." />
        <Card title="⚡ Virtual DOM" desc="Diffs UI fast without manual DOM updates." />
      </div>
    </div>
  );
}

// 4. Render Component Tree to DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`;

    function initLesson2() {
        const editor = document.getElementById('codeEditor');
        const preview = document.getElementById('previewFrame');
        const runBtn = document.getElementById('runCodeBtn');
        const resetBtn = document.getElementById('resetCodeBtn');
        const submitBtn = document.getElementById('submitProjectBtn');

        if (!editor || !preview) return;

        // Auto-restore draft from localStorage if available
        const savedDraft = localStorage.getItem('partC_lesson2_remake_draft');
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
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Code Editor is Empty!',
                        text: 'Please write your React component code before running preview! ⚡',
                        confirmButtonColor: '#2563eb'
                    });
                }
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
        }

        .app-container {
            max-width: 500px;
            margin: 0 auto;
        }

        .header-box {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: #ffffff;
            padding: 16px 20px;
            border-radius: 14px;
            text-align: center;
            margin-bottom: 16px;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
        }

        .header-box h1 {
            margin: 0 0 4px 0;
            font-size: 1.25rem;
        }

        .header-box p {
            margin: 0;
            font-size: 0.82rem;
            opacity: 0.9;
        }

        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        .card-box {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 14px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .card-box h3 {
            margin: 0 0 6px 0;
            font-size: 0.92rem;
            color: #1e293b;
        }

        .card-box p {
            margin: 0;
            font-size: 0.80rem;
            color: #64748b;
            line-height: 1.4;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        try {
            ${userCode}
        } catch (err) {
            document.getElementById('root').innerHTML = '<div style="color: #ef4444; padding: 12px; background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; font-family: monospace; font-size: 0.82rem;">❌ Component Syntax Error: ' + err.message + '</div>';
        }
    </script>
</body>
</html>`;

            preview.srcdoc = htmlContent;
            validateRequirements(userCode);
        }

        function validateRequirements(code) {
            const req1 = /function\s+Header\s*\(/i.test(code) || /const\s+Header\s*=/i.test(code);
            const req2 = /function\s+Card\s*\(/i.test(code) || /const\s+Card\s*=/i.test(code);
            const req3 = /<Header\s*\/>/i.test(code) && /<Card/i.test(code);
            const req4 = /ReactDOM\.createRoot/i.test(code) && /root\.render/i.test(code);

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

        if (runBtn) runBtn.addEventListener('click', runCode);
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
                            localStorage.removeItem('partC_lesson2_remake_draft');
                            validateRequirements('');
                            Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                        }
                    });
                } else {
                    editor.value = '';
                    preview.srcdoc = '';
                    localStorage.removeItem('partC_lesson2_remake_draft');
                    validateRequirements('');
                }
            });
        }

        if (editor) {
            editor.addEventListener('input', () => {
                localStorage.setItem('partC_lesson2_remake_draft', editor.value);
                validateRequirements(editor.value);
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                localStorage.setItem('partC_lesson2_remake_complete', 'true');
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'success',
                        title: '🎉 Lesson 2 Complete!',
                        text: 'You have unlocked the Component Mental Model & Virtual DOM!',
                        confirmButtonColor: '#2563eb',
                        confirmButtonText: '🚀 Next Lesson: JSX Syntax'
                    }).then(() => {
                        window.location.href = '../lesson3/lesson3_remake.html';
                    });
                } else {
                    alert('🎉 Lesson 2 Complete!');
                    window.location.href = '../lesson3/lesson3_remake.html';
                }
            });
        }

        runCode();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLesson2);
    } else {
        initLesson2();
    }
})();
