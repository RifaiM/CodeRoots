// Level 5 - Lesson 9: Lifting State Up & Cross-Component Communication Engine
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

    const defaultCode = `// 🎛️ Lesson 9: Lifting State Up & Cross-Component Communication!

// 1. Child Component A: ProductSelector (Fires callback when item selected)
function ProductSelector({ products, onAddToCart }) {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '14px', marginBottom: '14px' }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: '0.9rem' }}>🛍️ Product Catalog</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {products.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
              {item.name} (\${item.price})
            </span>
            <button
              onClick={() => onAddToCart(item)}
              style={{ background: '#2563eb', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: '700' }}
            >
              + Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. Child Component B: CartSummary (Receives shared cart state from parent)
function CartSummary({ cartItems, onClearCart }) {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ background: '#0f172a', borderRadius: '14px', padding: '16px', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h4 style={{ margin: 0, color: '#38bdf8', fontSize: '0.9rem' }}>🛒 Live Order Summary</h4>
        {cartItems.length > 0 && (
          <button
            onClick={onClearCart}
            style={{ background: '#ef4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: '700' }}
          >
            Clear
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.82rem' }}>Cart is empty. Click "+ Add to Cart" above!</p>
      ) : (
        <div>
          <ul style={{ margin: '0 0 10px 0', paddingLeft: '18px', fontSize: '0.82rem', color: '#e2e8f0' }}>
            {cartItems.map((item, idx) => (
              <li key={idx}>{item.name} — \${item.price}</li>
            ))}
          </ul>
          <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#4ade80', borderTop: '1px solid #334155', paddingTop: '8px' }}>
            Total Amount: \${totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

// 3. Parent Component: StoreApp (Lifts State Up & Passes Callback Props)
function TechStoreApp() {
  // Shared State lifted to Parent
  const [cart, setCart] = React.useState([]);

  const catalog = [
    { id: 1, name: "React Developer Desk Mat", price: 29.99 },
    { id: 2, name: "Wireless Coding Headset", price: 89.99 },
    { id: 3, name: "RGB Mechanical Keyboard", price: 119.99 }
  ];

  // Callback handler function
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', background: '#f1f5f9', borderRadius: '16px' }}>
      <h3 style={{ margin: '0 0 14px 0', color: '#0f172a', fontSize: '1.1rem', textAlign: 'center' }}>
        🏪 Tech Store (Lifting State Up)
      </h3>

      {/* Sibling A: Product Selector */}
      <ProductSelector products={catalog} onAddToCart={handleAddToCart} />

      {/* Sibling B: Cart Summary */}
      <CartSummary cartItems={cart} onClearCart={handleClearCart} />
    </div>
  );
}

// 4. Render Component Tree
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TechStoreApp />);`;

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
        const req2 = /on[A-Z][a-zA-Z0-9_]*\s*=\s*\{/i.test(code);
        const req3 = /on[A-Z][a-zA-Z0-9_]*\s*\(/i.test(code);
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

    function initLesson9() {
        const editor = document.getElementById('codeEditor');
        const lineNumberEl = document.getElementById('lineNumbers');
        const preview = document.getElementById('previewFrame');
        const runBtn = document.getElementById('runCodeBtn');
        const resetBtn = document.getElementById('resetCodeBtn');
        const submitBtn = document.getElementById('submitProjectBtn');

        if (!editor || !preview) return;

        // Auto-restore draft from localStorage
        const savedDraft = localStorage.getItem('partC_lesson9_remake_draft');
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
                            text: 'Please write your React lifting state code before running preview! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                }
                return;
            }

            // Save draft
            localStorage.setItem('partC_lesson9_remake_draft', userCode);

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
                            localStorage.removeItem('partC_lesson9_remake_draft');
                            runCode(false);
                            Swal.fire({ icon: 'success', title: 'Code Reset!', timer: 1200, showConfirmButton: false });
                        }
                    });
                } else {
                    editor.value = defaultCode;
                        if (typeof DojoLinter !== 'undefined') DojoLinter.check(editor.value);
                        buildLineNumbers(lineNumberEl, editor);
                    localStorage.removeItem('partC_lesson9_remake_draft');
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
                            text: 'Please write your React lifting state code before submitting! ⚡',
                            confirmButtonColor: '#2563eb'
                        });
                    }
                    return;
                }

                if (validateRequirements(userCode)) {
                    localStorage.setItem('partC_lesson9_remake_complete', 'true');
                    if (window.showLessonCompletionModal) {
                        window.showLessonCompletionModal(
                            9,
                            "Lifting State Up & Cross-Component Communication",
                            "You've mastered lifting state up, callback props, and cross-component communication!",
                            "/3. partC/lesson10/lesson10_remake.html"
                        );
                    } else {
                        if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                icon: 'success',
                                title: '🎉 Lesson 9 Complete!',
                                text: "Fantastic work! You've mastered React lifting state up and callback props!",
                                confirmButtonColor: '#2563eb',
                                confirmButtonText: 'Continue to Lesson 10'
                            }).then(() => {
                                window.location.href = '/3. partC/lesson10/lesson10_remake.html';
                            });
                        } else {
                            alert("🎉 Lesson 9 Complete!");
                        }
                    }
                }
            });
        }

        // Initial compile
        runCode(false);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLesson9);
    } else {
        initLesson9();
    }
})();
