import fs from 'fs';

// 1. UPDATE src/pages/index.astro with dual-action buttons on Skill Tree Cards
let index = fs.readFileSync('src/pages/index.astro', 'utf-8');

// Level 5 Card Button Group
index = index.replace(
    /<a href="\/3\. partC\/hub\.html" class="track-btn gold-btn">\s*<span>⚛️ Enter Level 5 Dojo<\/span>\s*<\/a>/,
    `<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">
                        <a href="/foundations.html?track=react" class="track-btn secondary-btn" style="border-radius: 12px; font-size: 0.85rem; padding: 8px 14px;">
                            <span>📖 Read React Foundations</span>
                        </a>
                        <a href="/3. partC/hub.html" class="track-btn gold-btn">
                            <span>⚛️ Enter Level 5 Dojo</span>
                        </a>
                    </div>`
);

// Level 6 Card Button Group
index = index.replace(
    /<a href="\/5\. partE\/hub\.html" class="track-btn gold-btn">\s*<span>🐍 Enter Level 6 Dojo<\/span>\s*<\/a>/,
    `<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">
                        <a href="/foundations.html?track=python" class="track-btn secondary-btn" style="border-radius: 12px; font-size: 0.85rem; padding: 8px 14px;">
                            <span>📖 Read Python Foundations</span>
                        </a>
                        <a href="/5. partE/hub.html" class="track-btn gold-btn">
                            <span>🐍 Enter Level 6 Dojo</span>
                        </a>
                    </div>`
);

// Level 7 Card Button Group
index = index.replace(
    /<a href="\/6\. partF\/hub\.html" class="track-btn gold-btn">\s*<span>🚀 Enter Level 7 Hub<\/span>\s*<\/a>/,
    `<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">
                        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                            <a href="/foundations.html?track=cloud" class="track-btn secondary-btn" style="flex: 1; min-width: 70px; border-radius: 10px; font-size: 0.78rem; padding: 6px 8px; text-align: center;">☁️ Cloud</a>
                            <a href="/foundations.html?track=sql" class="track-btn secondary-btn" style="flex: 1; min-width: 70px; border-radius: 10px; font-size: 0.78rem; padding: 6px 8px; text-align: center;">🛢️ SQL</a>
                            <a href="/foundations.html?track=nextjs" class="track-btn secondary-btn" style="flex: 1; min-width: 70px; border-radius: 10px; font-size: 0.78rem; padding: 6px 8px; text-align: center;">⚡ Next.js</a>
                        </div>
                        <a href="/6. partF/hub.html" class="track-btn gold-btn">
                            <span>🚀 Enter Level 7 Hub</span>
                        </a>
                    </div>`
);

// Level 8 Card Button Group
index = index.replace(
    /<a href="\/7\. partG\/hub\.html" class="track-btn gold-btn">\s*<span>🌉 Enter Level 8 Dojo<\/span>\s*<\/a>/,
    `<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">
                        <a href="/foundations.html?track=async" class="track-btn secondary-btn" style="border-radius: 12px; font-size: 0.85rem; padding: 8px 14px;">
                            <span>📖 Read Async UI Foundations</span>
                        </a>
                        <a href="/7. partG/hub.html" class="track-btn gold-btn">
                            <span>🌉 Enter Level 8 Dojo</span>
                        </a>
                    </div>`
);

// Level 9 Card Button Group
index = index.replace(
    /<a href="\/8\. partH\/hub\.html" class="track-btn gold-btn">\s*<span>🛡️ Enter Level 9 Dojo<\/span>\s*<\/a>/,
    `<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">
                        <a href="/foundations.html?track=auth" class="track-btn secondary-btn" style="border-radius: 12px; font-size: 0.85rem; padding: 8px 14px;">
                            <span>📖 Read React Auth Foundations</span>
                        </a>
                        <a href="/8. partH/hub.html" class="track-btn gold-btn">
                            <span>🛡️ Enter Level 9 Dojo</span>
                        </a>
                    </div>`
);

// Level 10 Card Button Group
index = index.replace(
    /<a href="\/9\. partI\/hub\.html" class="track-btn primary-btn"[^>]*>\s*<span>🏆 Launch Level 10 Capstone<\/span>\s*<\/a>/,
    `<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">
                        <a href="/foundations.html?track=saas" class="track-btn secondary-btn" style="border-radius: 12px; font-size: 0.85rem; padding: 8px 14px;">
                            <span>📖 Read SaaS UI Foundations</span>
                        </a>
                        <a href="/9. partI/hub.html" class="track-btn primary-btn" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #0f172a; font-weight: 800; border-radius: 20px; box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35);">
                            <span>🏆 Launch Level 10 Capstone</span>
                        </a>
                    </div>`
);

fs.writeFileSync('src/pages/index.astro', index, 'utf-8');
console.log('✅ Updated index.astro with dual-action Skill Tree cards');


// 2. UPDATE src/pages/1. partA/hub.astro to list all Foundations tracks
let hubA = fs.readFileSync('src/pages/1. partA/hub.astro', 'utf-8');
hubA = hubA.replace(
    /<div class="tracks-section-header">\s*<h2>Curriculum Roadmap \(Levels 0–3\)<\/h2>[\s\S]*?<\/div>\s*<div class="tracks-grid">([\s\S]*?)<\/div>\s*<\/section>/,
    `<div class="tracks-section-header">
                <h2>Foundations Curriculum (All Levels)</h2>
                <p>Master core mental models, searchable terms, and live sandboxes before entering the coding dojos.</p>
            </div>

            <!-- Core Web Foundations Grid -->
            <div style="margin-bottom: 24px;">
                <h3 style="font-size: 1.1rem; color: #1e293b; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                    <span>🧱</span> Core Web Foundations (Levels 0–3)
                </h3>
                <div class="tracks-grid">
                    $1
                </div>
            </div>

            <!-- Advanced Architecture Foundations Grid -->
            <div style="margin-top: 36px;">
                <h3 style="font-size: 1.1rem; color: #1e293b; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                    <span>🚀</span> Advanced Framework & Architecture Foundations (Levels 5–10)
                </h3>
                <div class="tracks-grid">
                    <!-- Track 5: React Foundations -->
                    <a href="/foundations.html?track=react" class="track-hub-card">
                        <div>
                            <div class="track-hub-header">
                                <div class="track-icon-badge" style="background: #e0f2fe; color: #0284c7;">⚛️</div>
                                <span class="track-status-pill available">⚡ Available</span>
                            </div>
                            <div class="track-card-level">Level 5 • Framework</div>
                            <h3 class="track-card-title">React & Modern UI Foundations</h3>
                            <p class="track-card-desc">LEGO bricks with live wires: Component trees, JSX syntax, props vs state, and useEffect lifecycle.</p>
                            <div class="track-module-list">
                                <span class="module-pill">Components</span>
                                <span class="module-pill">Props vs State</span>
                                <span class="module-pill">Virtual DOM</span>
                                <span class="module-pill">Hooks</span>
                            </div>
                        </div>
                        <div class="track-card-footer">
                            <span class="track-xp-badge">⚡ +300 XP</span>
                            <span class="track-btn-action">Start Track ➔</span>
                        </div>
                    </a>

                    <!-- Track 6: Python Foundations -->
                    <a href="/foundations.html?track=python" class="track-hub-card">
                        <div>
                            <div class="track-hub-header">
                                <div class="track-icon-badge" style="background: #ecfdf5; color: #059669;">🐍</div>
                                <span class="track-status-pill available">⚡ Available</span>
                            </div>
                            <div class="track-card-level">Level 6 • Backend</div>
                            <h3 class="track-card-title">Python & Server Logic Foundations</h3>
                            <p class="track-card-desc">The clean Swiss Army knife: Indentation, dictionaries, lists, OOP classes, and backend APIs.</p>
                            <div class="track-module-list">
                                <span class="module-pill">Indentation</span>
                                <span class="module-pill">Data Structures</span>
                                <span class="module-pill">OOP Classes</span>
                                <span class="module-pill">Backend APIs</span>
                            </div>
                        </div>
                        <div class="track-card-footer">
                            <span class="track-xp-badge">⚡ +300 XP</span>
                            <span class="track-btn-action">Start Track ➔</span>
                        </div>
                    </a>

                    <!-- Track 7A: Cloud & DevOps -->
                    <a href="/foundations.html?track=cloud" class="track-hub-card">
                        <div>
                            <div class="track-hub-header">
                                <div class="track-icon-badge" style="background: #faf5ff; color: #7e22ce;">☁️</div>
                                <span class="track-status-pill available">⚡ Available</span>
                            </div>
                            <div class="track-card-level">Level 7A • Cloud</div>
                            <h3 class="track-card-title">Cloud Systems & DevOps Foundations</h3>
                            <p class="track-card-desc">Standard shipping containers: Docker images vs containers, CI/CD automated assembly lines, and NGINX.</p>
                            <div class="track-module-list">
                                <span class="module-pill">Docker</span>
                                <span class="module-pill">CI/CD</span>
                                <span class="module-pill">NGINX</span>
                                <span class="module-pill">Cloud VMs</span>
                            </div>
                        </div>
                        <div class="track-card-footer">
                            <span class="track-xp-badge">⚡ +300 XP</span>
                            <span class="track-btn-action">Start Track ➔</span>
                        </div>
                    </a>

                    <!-- Track 7B: SQL Foundations -->
                    <a href="/foundations.html?track=sql" class="track-hub-card">
                        <div>
                            <div class="track-hub-header">
                                <div class="track-icon-badge" style="background: #eef2ff; color: #4338ca;">🛢️</div>
                                <span class="track-status-pill available">⚡ Available</span>
                            </div>
                            <div class="track-card-level">Level 7B • Databases</div>
                            <h3 class="track-card-title">PostgreSQL & Database Foundations</h3>
                            <p class="track-card-desc">The indexed filing cabinet: Relational tables, primary & foreign keys, SQL queries, and indexes.</p>
                            <div class="track-module-list">
                                <span class="module-pill">PostgreSQL</span>
                                <span class="module-pill">Keys & JOINs</span>
                                <span class="module-pill">SQL CRUD</span>
                                <span class="module-pill">B-Tree Indexes</span>
                            </div>
                        </div>
                        <div class="track-card-footer">
                            <span class="track-xp-badge">⚡ +300 XP</span>
                            <span class="track-btn-action">Start Track ➔</span>
                        </div>
                    </a>

                    <!-- Track 7C: Next.js Foundations -->
                    <a href="/foundations.html?track=nextjs" class="track-hub-card">
                        <div>
                            <div class="track-hub-header">
                                <div class="track-icon-badge" style="background: #f4f4f5; color: #18181b;">⚡</div>
                                <span class="track-status-pill available">⚡ Available</span>
                            </div>
                            <div class="track-card-level">Level 7C • Fullstack</div>
                            <h3 class="track-card-title">Next.js & SSR Foundations</h3>
                            <p class="track-card-desc">The hybrid restaurant: Server-side rendering, App Router file routes, and Server Components.</p>
                            <div class="track-module-list">
                                <span class="module-pill">SSR vs CSR</span>
                                <span class="module-pill">App Router</span>
                                <span class="module-pill">RSC</span>
                                <span class="module-pill">Server Actions</span>
                            </div>
                        </div>
                        <div class="track-card-footer">
                            <span class="track-xp-badge">⚡ +300 XP</span>
                            <span class="track-btn-action">Start Track ➔</span>
                        </div>
                    </a>

                    <!-- Track 8: Async UI Foundations -->
                    <a href="/foundations.html?track=async" class="track-hub-card">
                        <div>
                            <div class="track-hub-header">
                                <div class="track-icon-badge" style="background: #f0f9ff; color: #0284c7;">🌉</div>
                                <span class="track-status-pill available">⚡ Available</span>
                            </div>
                            <div class="track-card-level">Level 8 • Async UI</div>
                            <h3 class="track-card-title">Async UI & Live Data Foundations</h3>
                            <p class="track-card-desc">The frictionless drive-thru: Skeleton loaders, error retry screens, optimistic likes, and timer cleanup.</p>
                            <div class="track-module-list">
                                <span class="module-pill">Skeletons</span>
                                <span class="module-pill">Optimistic UI</span>
                                <span class="module-pill">Error States</span>
                                <span class="module-pill">Polling</span>
                            </div>
                        </div>
                        <div class="track-card-footer">
                            <span class="track-xp-badge">⚡ +300 XP</span>
                            <span class="track-btn-action">Start Track ➔</span>
                        </div>
                    </a>

                    <!-- Track 9: Auth Foundations -->
                    <a href="/foundations.html?track=auth" class="track-hub-card">
                        <div>
                            <div class="track-hub-header">
                                <div class="track-icon-badge" style="background: #f5f3ff; color: #4f46e5;">🛡️</div>
                                <span class="track-status-pill available">⚡ Available</span>
                            </div>
                            <div class="track-card-level">Level 9 • Security</div>
                            <h3 class="track-card-title">React Auth & Permissions Foundations</h3>
                            <p class="track-card-desc">The encrypted VIP wristband: AuthN vs AuthZ, JWT tokens, global AuthContext, and route guards.</p>
                            <div class="track-module-list">
                                <span class="module-pill">JWT Tokens</span>
                                <span class="module-pill">AuthContext</span>
                                <span class="module-pill">Route Guards</span>
                                <span class="module-pill">RBAC Roles</span>
                            </div>
                        </div>
                        <div class="track-card-footer">
                            <span class="track-xp-badge">⚡ +300 XP</span>
                            <span class="track-btn-action">Start Track ➔</span>
                        </div>
                    </a>

                    <!-- Track 10: SaaS UI Foundations -->
                    <a href="/foundations.html?track=saas" class="track-hub-card">
                        <div>
                            <div class="track-hub-header">
                                <div class="track-icon-badge" style="background: #fffbeb; color: #b45309;">🏆</div>
                                <span class="track-status-pill available">⚡ Available</span>
                            </div>
                            <div class="track-card-level">Level 10 • SaaS</div>
                            <h3 class="track-card-title">SaaS UI & Architecture Foundations</h3>
                            <p class="track-card-desc">The commercial skyscraper: App Shells, debounced live search, billing switchers, and AI copilot panels.</p>
                            <div class="track-module-list">
                                <span class="module-pill">App Shell</span>
                                <span class="module-pill">Debounce</span>
                                <span class="module-pill">Pricing Toggle</span>
                                <span class="module-pill">AI Copilot UI</span>
                            </div>
                        </div>
                        <div class="track-card-footer">
                            <span class="track-xp-badge">⚡ +500 XP</span>
                            <span class="track-btn-action">Start Track ➔</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>`
);

fs.writeFileSync('src/pages/1. partA/hub.astro', hubA, 'utf-8');
console.log('✅ Updated 1. partA/hub.astro with full Foundations breakdown');
