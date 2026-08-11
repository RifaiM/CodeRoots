// NoviCodes DevType Dojo - Code Typing Speedrun Logic Engine
(function() {
    'use strict';

    const codeSnippets = {
        html: [
            `<div class="card">\n  <h2>Hello World</h2>\n  <p>Building web apps is awesome!</p>\n</div>`,
            `<form action="/submit" method="POST">\n  <label for="email">Email Address</label>\n  <input type="email" id="email" required />\n  <button type="submit">Submit</button>\n</form>`,
            `<header class="navbar">\n  <a href="/home" class="logo">DevDojo</a>\n  <nav>\n    <a href="/about">About</a>\n    <a href="/contact">Contact</a>\n  </nav>\n</header>`
        ],
        css: [
            `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n  padding: 24px;\n}`,
            `.btn-primary {\n  background: linear-gradient(135deg, #007bff, #0056b3);\n  color: #ffffff;\n  border-radius: 20px;\n  cursor: pointer;\n}`,
            `@media (max-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n}`
        ],
        js: [
            `const calculateTotal = (items) => {\n  return items.reduce((acc, item) => acc + item.price, 0);\n};`,
            `const fetchUserData = async (userId) => {\n  const response = await fetch(\`/api/user/\${userId}\`);\n  return await response.json();\n};`,
            `const user = { name: "Rifai", role: "Dev" };\nconst { name, role } = user;\nconst updated = { ...user, xp: 1500 };`
        ],
        react: [
            `const [count, setCount] = useState(0);\nconst increment = () => setCount(prev => prev + 1);`,
            `useEffect(() => {\n  document.title = \`Count: \${count}\`;\n}, [count]);`,
            `function UserCard({ name, role }) {\n  return (\n    <div className="card">\n      <h3>{name}</h3>\n      <p>{role}</p>\n    </div>\n  );\n}`
        ]
    };

    class DevTypeEngine {
        constructor() {
            this.currentMode = 'js';
            this.currentText = '';
            this.charIndex = 0;
            this.mistakes = 0;
            this.startTime = null;
            this.timer = null;
            this.isPlaying = false;

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
            this.highScoreEl = document.getElementById('highScoreVal');
            this.restartBtn = document.getElementById('restartBtn');

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
                    this.loadMode(e.currentTarget.dataset.mode);
                });
            });

            // Focus hidden input when clicking anywhere on code display card
            const card = document.querySelector('.typing-area-card');
            if (card) {
                card.addEventListener('click', () => {
                    if (this.hiddenInput) this.hiddenInput.focus();
                });
            }

            if (this.hiddenInput) {
                this.hiddenInput.addEventListener('input', (e) => this.handleInput(e));
                this.hiddenInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        this.restart();
                    }
                });
            }

            if (this.restartBtn) {
                this.restartBtn.addEventListener('click', () => this.restart());
            }

            // Keyboard shortcut Tab for restart
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.restart();
                }
            });
        }

        loadHighScore() {
            const saved = localStorage.getItem('devtype_highscore_wpm');
            if (this.highScoreEl) {
                this.highScoreEl.textContent = saved ? saved : '0';
            }
        }

        loadMode(mode) {
            this.currentMode = mode;
            const pool = codeSnippets[mode] || codeSnippets.js;
            this.currentText = pool[Math.floor(Math.random() * pool.length)];
            this.resetState();
            this.renderText();
        }

        resetState() {
            this.charIndex = 0;
            this.mistakes = 0;
            this.startTime = null;
            this.isPlaying = false;
            if (this.timer) clearInterval(this.timer);
            this.timer = null;

            if (this.hiddenInput) this.hiddenInput.value = '';
            if (this.wpmEl) this.wpmEl.textContent = '0';
            if (this.cpmEl) this.cpmEl.textContent = '0';
            if (this.accuracyEl) this.accuracyEl.textContent = '100%';
        }

        renderText() {
            if (!this.codeDisplay) return;
            this.codeDisplay.innerHTML = '';

            this.currentText.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.className = 'char';
                if (index === 0) span.classList.add('current');
                span.textContent = char;
                this.codeDisplay.appendChild(span);
            });

            if (this.hiddenInput) this.hiddenInput.focus();
        }

        handleInput(e) {
            if (!this.isPlaying) {
                this.isPlaying = true;
                this.startTime = new Date();
                this.timer = setInterval(() => this.updateStats(), 100);
            }

            const val = this.hiddenInput.value;
            const chars = this.codeDisplay.querySelectorAll('.char');

            this.charIndex = val.length;

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

            // Count mistakes
            let currentErrors = 0;
            for (let i = 0; i < val.length; i++) {
                if (val[i] !== this.currentText[i]) currentErrors++;
            }
            this.mistakes = currentErrors;

            // Check if finished
            if (val.length >= this.currentText.length) {
                this.finishSpeedrun();
            }
        }

        updateStats() {
            if (!this.startTime) return;
            const now = new Date();
            const elapsedSeconds = (now - this.startTime) / 1000;
            const elapsedMinutes = elapsedSeconds / 60;

            if (elapsedSeconds <= 0) return;

            const typedChars = this.hiddenInput.value.length;
            const correctChars = Math.max(0, typedChars - this.mistakes);

            // Standard WPM = (correct chars / 5) / minutes
            const wpm = Math.round((correctChars / 5) / elapsedMinutes) || 0;
            const cpm = Math.round(correctChars / elapsedMinutes) || 0;
            const accuracy = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 100;

            if (this.wpmEl) this.wpmEl.textContent = wpm;
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
                if (this.highScoreEl) this.highScoreEl.textContent = finalWpm.toString();
                isNewRecord = true;
            }

            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success',
                    title: isNewRecord ? '🎉 NEW HIGH SCORE RECORD!' : '⚡ Speedrun Complete!',
                    html: `
                        <div style="font-size: 1.1rem; color: #1e293b; line-height: 1.6;">
                            <p style="margin: 6px 0;">🚀 <strong>Speed:</strong> ${finalWpm} WPM</p>
                            <p style="margin: 6px 0;">🎯 <strong>Accuracy:</strong> ${finalAccuracy}</p>
                            ${isNewRecord ? '<p style="color: #10b981; font-weight: 800;">🏆 You set a new personal record!</p>' : ''}
                        </div>
                    `,
                    confirmButtonColor: '#2563eb',
                    confirmButtonText: '⚡ Try Another Snippet'
                }).then(() => {
                    this.loadMode(this.currentMode);
                });
            }
        }

        restart() {
            this.loadMode(this.currentMode);
        }
    }

    new DevTypeEngine();
})();
