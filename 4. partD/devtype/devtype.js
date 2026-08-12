// NoviCodes DevType Dojo - Expanded Snippets Engine with VS Code Tab Support
(function() {
    'use strict';

    const codeSnippets = {
        html: [
            `<div class="card">\n  <h2>Hello World</h2>\n  <p>Building web apps is awesome!</p>\n</div>`,
            `<form action="/submit" method="POST">\n  <label for="email">Email Address</label>\n  <input type="email" id="email" required />\n  <button type="submit">Submit</button>\n</form>`,
            `<header class="navbar">\n  <a href="/home" class="logo">DevDojo</a>\n  <nav>\n    <a href="/about">About</a>\n    <a href="/contact">Contact</a>\n  </nav>\n</header>`,
            `<main class="container">\n  <section class="hero">\n    <h1>Welcome to NoviCodes</h1>\n    <p>Zero barrier open source learning.</p>\n  </section>\n</main>`,
            `<ul class="features-list">\n  <li class="item active">Item One</li>\n  <li class="item">Item Two</li>\n  <li class="item">Item Three</li>\n</ul>`,
            `<article class="blog-post">\n  <img src="banner.jpg" alt="Banner" />\n  <h3>Modern Web Frameworks</h3>\n  <p>Learn React and component architecture.</p>\n</article>`,
            `<table class="data-table">\n  <thead>\n    <tr><th>ID</th><th>Name</th><th>Role</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>1</td><td>Rifai</td><td>Developer</td></tr>\n  </tbody>\n</table>`,
            `<div class="modal-overlay">\n  <div class="modal-content">\n    <h3>Settings</h3>\n    <button class="close-btn">&times;</button>\n  </div>\n</div>`,
            `<footer class="footer">\n  <p>&copy; 2026 CodeRoots DevDojo. All rights reserved.</p>\n</footer>`,
            `<div class="badge-container">\n  <span class="badge primary">Active</span>\n  <span class="badge success">Verified</span>\n</div>`,
            `<picture>\n  <source srcset="hero-dark.webp" media="(prefers-color-scheme: dark)" />\n  <img src="hero-light.png" alt="Hero Banner" />\n</picture>`,
            `<dialog id="favDialog">\n  <form method="dialog">\n    <h3>Confirm Action</h3>\n    <button value="cancel">Cancel</button>\n    <button value="confirm" class="btn-primary">Confirm</button>\n  </form>\n</dialog>`,
            `<details class="accordion-item">\n  <summary>What is React 19?</summary>\n  <p>React 19 introduces Actions and Server Components.</p>\n</details>`,
            `<nav class="pagination" aria-label="Page navigation">\n  <a href="?page=1" class="page-link">&laquo; Prev</a>\n  <span class="page-current">Page 2 of 10</span>\n  <a href="?page=3" class="page-link">Next &raquo;</a>\n</nav>`,
            `<div class="toast-notification success">\n  <span class="toast-icon">✅</span>\n  <div class="toast-message">Project saved successfully!</div>\n  <button class="toast-close">&times;</button>\n</div>`
        ],
        css: [
            `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n  padding: 24px;\n}`,
            `.btn-primary {\n  background: linear-gradient(135deg, #007bff, #0056b3);\n  color: #ffffff;\n  border-radius: 20px;\n  cursor: pointer;\n}`,
            `@media (max-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n}`,
            `.card-hero {\n  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);\n  backdrop-filter: blur(12px);\n  border: 1px solid #cbd5e1;\n}`,
            `.nav-item:hover {\n  background: #f1f5f9;\n  color: #2563eb;\n  transition: all 0.2s ease;\n}`,
            `.grid-layout {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 16px;\n}`,
            `.badge-status {\n  display: inline-flex;\n  align-items: center;\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 0.78rem;\n}`,
            `header.sticky-header {\n  position: sticky;\n  top: 0;\n  z-index: 9999;\n  background: rgba(15, 23, 42, 0.95);\n}`,
            `@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(-10px); }\n  to { opacity: 1; transform: translateY(0); }\n}`,
            `.tooltip {\n  position: relative;\n  cursor: help;\n  border-bottom: 1px dashed #64748b;\n}`,
            `.glassmorphic-card {\n  background: rgba(255, 255, 255, 0.15);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid rgba(255, 255, 255, 0.25);\n}`,
            `.hero-gradient-text {\n  background: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}`,
            `@supports (aspect-ratio: 16 / 9) {\n  .video-container {\n    aspect-ratio: 16 / 9;\n    width: 100%;\n    object-fit: cover;\n  }\n}`,
            `.container {\n  display: grid;\n  grid-template-areas:\n    "header header"\n    "sidebar content"\n    "footer footer";\n  grid-template-columns: 240px 1fr;\n}`,
            `:root {\n  --primary: #2563eb;\n  --surface: #0f172a;\n  --text-main: #f8fafc;\n  --border: rgba(255, 255, 255, 0.12);\n}`
        ],
        js: [
            `const calculateTotal = (items) => {\n  return items.reduce((acc, item) => acc + item.price, 0);\n};`,
            `const fetchUserData = async (userId) => {\n  const response = await fetch(\`/api/user/\${userId}\`);\n  return await response.json();\n};`,
            `const user = { name: "Rifai", role: "Dev" };\nconst { name, role } = user;\nconst updated = { ...user, xp: 1500 };`,
            `const skills = ["HTML", "CSS", "JS"];\nconst badges = skills.map(skill => \`<span class="badge">\${skill}</span>\`);`,
            `document.addEventListener("DOMContentLoaded", () => {\n  const btn = document.getElementById("submitBtn");\n  btn.addEventListener("click", handleSubmit);\n});`,
            `const filterActiveUsers = (users) => {\n  return users.filter(user => user.isActive && user.age >= 18);\n};`,
            `const debounce = (func, delay = 300) => {\n  let timeout;\n  return (...args) => {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func(...args), delay);\n  };\n};`,
            `const formatCurrency = (amount) => {\n  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);\n};`,
            `const getUniqueTags = (posts) => {\n  return [...new Set(posts.flatMap(post => post.tags))];\n};`,
            `const checkStatus = (code) => {\n  return code === 200 ? "OK" : "Error";\n};`,
            `const groupBy = (array, key) => {\n  return array.reduce((acc, obj) => {\n    (acc[obj[key]] = acc[obj[key]] || []).push(obj);\n    return acc;\n  }, {});\n};`,
            `const copyToClipboard = async (text) => {\n  try {\n    await navigator.clipboard.writeText(text);\n    return true;\n  } catch (err) {\n    console.error("Clipboard copy failed:", err);\n    return false;\n  }\n};`,
            `const toggleTheme = () => {\n  const current = document.documentElement.getAttribute("data-theme");\n  const next = current === "dark" ? "light" : "dark";\n  document.documentElement.setAttribute("data-theme", next);\n};`,
            `const createStore = (initialState) => {\n  let state = initialState;\n  const listeners = new Set();\n  return {\n    getState: () => state,\n    subscribe: (fn) => (listeners.add(fn), () => listeners.delete(fn))\n  };\n};`,
            `const parseQueryParams = (urlStr) => {\n  const params = new URLSearchParams(new URL(urlStr).search);\n  return Object.fromEntries(params.entries());\n};`
        ],
        react: [
            `const [count, setCount] = useState(0);\nconst increment = () => setCount(prev => prev + 1);`,
            `useEffect(() => {\n  document.title = \`Count: \${count}\`;\n}, [count]);`,
            `function UserCard({ name, role }) {\n  return (\n    <div className="card">\n      <h3>{name}</h3>\n      <p>{role}</p>\n    </div>\n  );\n}`,
            `const { data, loading, error } = useFetch("/api/data");\nif (loading) return <p>Loading...</p>;`,
            `const AuthContext = createContext(null);\nconst useAuth = () => useContext(AuthContext);`,
            `const memoizedValue = useMemo(() => {\n  return expensiveCalculation(data);\n}, [data]);`,
            `const handleToggle = useCallback(() => {\n  setIsOpen(prev => !prev);\n}, []);`,
            `function TodoItem({ item, onDelete }) {\n  return (\n    <li>\n      <span>{item.text}</span>\n      <button onClick={() => onDelete(item.id)}>Delete</button>\n    </li>\n  );\n}`,
            `const inputRef = useRef(null);\nconst focusInput = () => inputRef.current?.focus();`,
            `const [form, setForm] = useState({ name: "", email: "" });\nconst handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });`,
            `function SearchBar({ onSearch }) {\n  const [query, setQuery] = useState("");\n  const handleSubmit = e => {\n    e.preventDefault();\n    onSearch(query);\n  };\n  return <form onSubmit={handleSubmit}><input value={query} onChange={e => setQuery(e.target.value)} /></form>;\n}`,
            `function ProtectedRoute({ isAuth, children }) {\n  if (!isAuth) {\n    return <Navigate to="/login" replace />;\n  }\n  return children;\n}`,
            `const [optimisticLikes, addOptimisticLike] = useOptimistic(\n  likes,\n  (state, newLike) => [...state, newLike]\n);`,
            `function ModalPortal({ children, isOpen }) {\n  if (!isOpen) return null;\n  return createPortal(children, document.getElementById("modal-root"));\n}`,
            `const useLocalStorage = (key, initialValue) => {\n  const [value, setValue] = useState(() => {\n    return JSON.parse(localStorage.getItem(key)) ?? initialValue;\n  });\n  return [value, setValue];\n};`
        ]
    };

    class DevTypeEngine {
        constructor() {
            this.currentMode = 'js';
            this.timeLimit = 30; // seconds (0 = infinite snippet)
            this.timeRemaining = 30;
            this.currentSnippetIndex = 0;
            this.currentText = '';
            this.charIndex = 0;
            this.mistakes = 0;
            this.startTime = null;
            this.timer = null;
            this.isPlaying = false;

            // Accumulated Multi-Snippet Counters (Monkeytype Mode)
            this.accumulatedTypedChars = 0;
            this.accumulatedCorrectChars = 0;
            this.accumulatedMistakes = 0;

            this.init();
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }

        setup() {
            this.codeDisplay = document.getElementById('codeDisplay');
            this.hiddenInput = document.getElementById('hiddenInput');
            this.wpmEl = document.getElementById('wpmVal');
            this.cpmEl = document.getElementById('cpmVal');
            this.accuracyEl = document.getElementById('accuracyVal');
            this.timerLabelEl = document.getElementById('timerLabelVal');
            this.timerValEl = document.getElementById('timerVal');
            this.highScoreEl = document.getElementById('highScoreVal');

            this.retryBtn = document.getElementById('retryBtn');
            this.nextBtn = document.getElementById('nextBtn');

            this.loadHighScore();
            this.bindEvents();
            this.loadMode(this.currentMode);
        }

        bindEvents() {
            // Mode buttons
            document.querySelectorAll('.mode-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this.currentMode = e.currentTarget.dataset.mode;
                    this.loadMode(this.currentMode);
                });
            });

            // Timer buttons
            document.querySelectorAll('.timer-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.timer-btn').forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this.timeLimit = parseInt(e.currentTarget.dataset.time, 10);
                    this.resetSession();
                });
            });

            // Action Buttons
            if (this.retryBtn) this.retryBtn.addEventListener('click', () => this.retryCurrentSnippet());
            if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSnippet());

            // Typing & Focus Handling
            if (this.codeDisplay) {
                this.codeDisplay.addEventListener('click', () => this.focusInput());
            }

            if (this.hiddenInput) {
                this.hiddenInput.addEventListener('input', () => this.handleTyping());
                this.hiddenInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
            }

            // Keyboard Shortcuts (Esc to restart)
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.resetSession();
                }
            });
        }

        loadHighScore() {
            const saved = localStorage.getItem('devtype_highscore_wpm') || '0';
            if (this.highScoreEl) {
                this.highScoreEl.textContent = `${saved} WPM`;
            }
        }

        loadMode(mode) {
            const snippets = codeSnippets[mode] || codeSnippets.js;
            this.currentSnippetIndex = Math.floor(Math.random() * snippets.length);
            this.resetSession();
        }

        resetSession() {
            clearInterval(this.timer);
            this.isPlaying = false;
            this.startTime = null;
            this.timeRemaining = this.timeLimit > 0 ? this.timeLimit : 0;

            // Reset accumulated score pools
            this.accumulatedTypedChars = 0;
            this.accumulatedCorrectChars = 0;
            this.accumulatedMistakes = 0;

            if (this.timerValEl) {
                this.timerValEl.textContent = this.timeLimit > 0 ? `${this.timeRemaining}s` : '∞ Untimed';
            }

            if (this.wpmEl) this.wpmEl.textContent = '0 WPM';
            if (this.cpmEl) this.cpmEl.textContent = '0';
            if (this.accuracyEl) this.accuracyEl.textContent = '100%';

            this.loadSnippet(this.currentSnippetIndex);
        }

        loadSnippet(index) {
            const snippets = codeSnippets[this.currentMode] || codeSnippets.js;
            this.currentSnippetIndex = index % snippets.length;
            this.currentText = snippets[this.currentSnippetIndex];

            if (this.hiddenInput) this.hiddenInput.value = '';
            this.charIndex = 0;
            this.mistakes = 0;

            this.renderCodeDisplay();
            this.focusInput();
        }

        nextSnippet() {
            const snippets = codeSnippets[this.currentMode] || codeSnippets.js;
            let nextIndex = Math.floor(Math.random() * snippets.length);
            if (nextIndex === this.currentSnippetIndex && snippets.length > 1) {
                nextIndex = (this.currentSnippetIndex + 1) % snippets.length;
            }
            this.currentSnippetIndex = nextIndex;

            if (this.isPlaying) {
                // If mid-game, load snippet without resetting timer or score accumulator!
                this.loadSnippet(this.currentSnippetIndex);
            } else {
                this.resetSession();
            }
        }

        retryCurrentSnippet() {
            this.resetSession();
        }

        focusInput() {
            if (this.hiddenInput) this.hiddenInput.focus();
        }

        renderCodeDisplay() {
            if (!this.codeDisplay) return;
            this.codeDisplay.innerHTML = '';

            const fragment = document.createDocumentFragment();
            for (let i = 0; i < this.currentText.length; i++) {
                const char = this.currentText[i];
                const span = document.createElement('span');
                span.className = 'char';
                if (i === 0) span.classList.add('current');
                span.textContent = char;
                fragment.appendChild(span);
            }
            this.codeDisplay.appendChild(fragment);
        }

        handleKeyDown(e) {
            // VS Code Tab Key Support (Insert 2 spaces)
            if (e.key === 'Tab') {
                e.preventDefault();
                if (!this.hiddenInput) return;

                const start = this.hiddenInput.selectionStart;
                const val = this.hiddenInput.value;
                this.hiddenInput.value = val.substring(0, start) + '  ' + val.substring(start);
                this.hiddenInput.selectionStart = this.hiddenInput.selectionEnd = start + 2;

                this.handleTyping();
            }
        }

        handleTyping() {
            if (!this.isPlaying) {
                this.isPlaying = true;
                this.startTime = new Date();

                if (this.timeLimit > 0) {
                    this.timer = setInterval(() => this.tickTimer(), 1000);
                }
            }

            const val = this.hiddenInput.value;
            const chars = this.codeDisplay.querySelectorAll('.char');

            chars.forEach((span, index) => {
                const typedChar = val[index];
                const expectedChar = this.currentText[index];

                span.className = 'char';

                if (index < val.length) {
                    if (typedChar === expectedChar) {
                        span.classList.add('correct');
                    } else {
                        span.classList.add('incorrect');
                    }
                } else if (index === val.length) {
                    span.classList.add('current');
                }
            });

            // Count mistakes in current snippet
            let currentErrors = 0;
            for (let i = 0; i < val.length; i++) {
                if (val[i] !== this.currentText[i]) currentErrors++;
            }
            this.mistakes = currentErrors;

            this.updateStats();

            // Check if finished current snippet
            if (val.length >= this.currentText.length) {
                if (this.timeLimit > 0) {
                    // Timed Mode (15s/30s/60s): Accumulate current snippet stats & load next snippet seamlessly!
                    const currentTyped = val.length;
                    const currentCorrect = Math.max(0, currentTyped - this.mistakes);

                    this.accumulatedTypedChars += currentTyped;
                    this.accumulatedCorrectChars += currentCorrect;
                    this.accumulatedMistakes += this.mistakes;

                    this.nextSnippet();
                } else {
                    // Untimed Mode (0s): Finish run immediately on snippet completion!
                    const currentTyped = val.length;
                    const currentCorrect = Math.max(0, currentTyped - this.mistakes);

                    this.accumulatedTypedChars += currentTyped;
                    this.accumulatedCorrectChars += currentCorrect;
                    this.accumulatedMistakes += this.mistakes;

                    this.finishSpeedrun();
                }
            }
        }

        tickTimer() {
            this.timeRemaining--;
            if (this.timerValEl) this.timerValEl.textContent = `${this.timeRemaining}s`;

            this.updateStats();

            if (this.timeRemaining <= 0) {
                this.finishSpeedrun();
            }
        }

        updateStats() {
            if (!this.startTime) return;
            const now = new Date();
            const elapsedSeconds = Math.max(0.5, (now - this.startTime) / 1000);
            const elapsedMinutes = elapsedSeconds / 60;

            const currentVal = this.hiddenInput ? this.hiddenInput.value : '';
            const currentTyped = currentVal.length;
            const currentCorrect = Math.max(0, currentTyped - this.mistakes);

            const totalTypedChars = this.accumulatedTypedChars + currentTyped;
            const totalCorrectChars = this.accumulatedCorrectChars + currentCorrect;

            const wpm = Math.round((totalCorrectChars / 5) / elapsedMinutes) || 0;
            const cpm = Math.round(totalCorrectChars / elapsedMinutes) || 0;
            const accuracy = totalTypedChars > 0 ? Math.round((totalCorrectChars / totalTypedChars) * 100) : 100;

            if (this.wpmEl) this.wpmEl.textContent = `${wpm} WPM`;
            if (this.cpmEl) this.cpmEl.textContent = cpm;
            if (this.accuracyEl) this.accuracyEl.textContent = `${accuracy}%`;
        }

        finishSpeedrun() {
            clearInterval(this.timer);
            this.isPlaying = false;
            this.updateStats();

            const finalWpm = parseInt(this.wpmEl.textContent, 10) || 0;
            const finalAccuracy = this.accuracyEl.textContent;
            const currentHigh = parseInt(localStorage.getItem('devtype_highscore_wpm') || '0', 10);

            let isNewRecord = false;
            if (finalWpm > currentHigh) {
                localStorage.setItem('devtype_highscore_wpm', finalWpm.toString());
                if (this.highScoreEl) this.highScoreEl.textContent = `${finalWpm} WPM`;
                isNewRecord = true;
            }

            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: isNewRecord ? '🏆 NEW PERSONAL RECORD!' : '⏱️ Speedrun Complete!',
                    html: `
                        <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center; padding: 6px 0;">
                            <div style="display: flex; justify-content: center; gap: 20px; margin: 16px 0; background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0;">
                                <div>
                                    <div style="font-size: 0.76rem; color: #64748b; font-weight: 700;">SPEED</div>
                                    <div style="font-size: 1.8rem; font-weight: 800; color: #2563eb;">${finalWpm} <span style="font-size:0.9rem;">WPM</span></div>
                                </div>
                                <div style="border-right: 1px solid #cbd5e1;"></div>
                                <div>
                                    <div style="font-size: 0.76rem; color: #64748b; font-weight: 700;">ACCURACY</div>
                                    <div style="font-size: 1.8rem; font-weight: 800; color: #10b981;">${finalAccuracy}</div>
                                </div>
                            </div>
                            ${isNewRecord ? '<p style="color: #10b981; font-weight: 800;">🏆 You set a new personal typing speed record!</p>' : ''}
                        </div>
                    `,
                    showCancelButton: true,
                    confirmButtonColor: '#2563eb',
                    cancelButtonColor: '#64748b',
                    confirmButtonText: '⏭ Next Speedrun',
                    cancelButtonText: '🔄 Retry Session'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.nextSnippet();
                    } else {
                        this.retryCurrentSnippet();
                    }
                });
            }
        }

        restart() {
            this.retryCurrentSnippet();
        }
    }

    new DevTypeEngine();
})();

/**
 * Arcade Mode Help & Mode Explanation Modal
 */
window.showArcadeHelpModal = function() {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '🎮 How Arcade Mode Works',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: left; padding: 4px 0; font-size: 0.9rem; color: #475569;">
                    <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px; border-radius: 12px; margin-bottom: 12px;">
                        <strong style="color: #0f172a;">⏱️ Speedrun Timers (15s / 30s / 60s):</strong><br>
                        Race against the clock! Type as many code characters as you can before time expires to achieve your highest WPM & accuracy.
                    </div>
                    <div style="background: #f0f9ff; border: 1px solid #38bdf8; padding: 12px; border-radius: 12px; margin-bottom: 12px;">
                        <strong style="color: #0369a1;">∞ No Timer Mode:</strong><br>
                        No countdown timer! Type the full code snippet at your own comfortable pace to master syntax and muscle memory.
                    </div>
                    <div style="background: #f5f3ff; border: 1px solid #ddd6fe; padding: 12px; border-radius: 12px;">
                        <strong style="color: #6d28d9;">⌨️ VS Code Shortcut Keys:</strong><br>
                        • Press <kbd style="background:#e2e8f0; padding:2px 6px; border-radius:4px;">Tab</kbd> to insert 2-space indentation.<br>
                        • Press <kbd style="background:#e2e8f0; padding:2px 6px; border-radius:4px;">Esc</kbd> to restart current snippet instantly.
                    </div>
                </div>
            `,
            confirmButtonColor: '#8b5cf6',
            confirmButtonText: 'Got It, Let\'s Code!',
            showCloseButton: true
        });
    } else {
        alert('🎮 Speedrun Timers (15s/30s/60s): Race the clock.\n∞ Untimed Mode: Type full snippet at your own pace with no timer.');
    }
};
