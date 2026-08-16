import fs from 'fs';

// 1. UPDATE public/scripts/dashboard.js
let dashJs = fs.readFileSync('public/scripts/dashboard.js', 'utf-8');

// Replace card.querySelector('.track-btn') with precise selector
dashJs = dashJs.replace(
    /const btn = card\.querySelector\('\.track-btn'\);/g,
    `const btn = card.querySelector('.dojo-btn, .gold-btn, .primary-btn') || card.querySelector('.track-btn:last-of-type') || card.querySelector('.track-btn');`
);

fs.writeFileSync('public/scripts/dashboard.js', dashJs, 'utf-8');
console.log('✅ Updated public/scripts/dashboard.js');


// 2. UPDATE src/styles/dashboard.css & public/styles/dashboard.css
const primerCss = `
/* ── Foundations Primer Button Styles on Track Cards ── */
.primer-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    color: #334155;
    font-size: 0.84rem;
    font-weight: 700;
    padding: 8px 14px;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.primer-btn:hover {
    background: #f8fafc;
    color: #0f172a;
    border-color: #94a3b8;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.06);
}
.primer-pill-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #475569;
    font-size: 0.78rem;
    font-weight: 700;
    padding: 6px 10px;
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.2s ease;
}
.primer-pill-btn:hover {
    background: #ffffff;
    color: #0f172a;
    border-color: #cbd5e1;
    transform: translateY(-1px);
}
`;

let css1 = fs.readFileSync('src/styles/dashboard.css', 'utf-8');
if (!css1.includes('.primer-btn')) {
    css1 += primerCss;
    fs.writeFileSync('src/styles/dashboard.css', css1, 'utf-8');
}

let css2 = fs.readFileSync('public/styles/dashboard.css', 'utf-8');
if (!css2.includes('.primer-btn')) {
    css2 += primerCss;
    fs.writeFileSync('public/styles/dashboard.css', css2, 'utf-8');
}
console.log('✅ Updated dashboard.css files with .primer-btn styles');


// 3. UPDATE src/pages/index.astro
let index = fs.readFileSync('src/pages/index.astro', 'utf-8');

// Level 5 Card
index = index.replace(
    /<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">\s*<a href="\/foundations\.html\?track=react"[^>]*>[\s\S]*?<\/a>\s*<a href="\/3\. partC\/hub\.html"[^>]*>[\s\S]*?<\/a>\s*<\/div>/,
    `<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">
                        <a href="/foundations.html?track=react" class="primer-btn">
                            <span>📖 Read React Foundations</span>
                        </a>
                        <a href="/3. partC/hub.html" class="track-btn gold-btn dojo-btn">
                            <span>⚛️ Enter Level 5 Dojo</span>
                        </a>
                    </div>`
);

// Level 6 Card
index = index.replace(
    /<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">\s*<a href="\/foundations\.html\?track=python"[^>]*>[\s\S]*?<\/a>\s*<a href="\/5\. partE\/hub\.html"[^>]*>[\s\S]*?<\/a>\s*<\/div>/,
    `<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">
                        <a href="/foundations.html?track=python" class="primer-btn">
                            <span>📖 Read Python Foundations</span>
                        </a>
                        <a href="/5. partE/hub.html" class="track-btn gold-btn dojo-btn">
                            <span>🐍 Enter Level 6 Dojo</span>
                        </a>
                    </div>`
);

// Level 7 Card
index = index.replace(
    /<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">\s*<div style="display: flex; gap: 6px; flex-wrap: wrap;">\s*<a href="\/foundations\.html\?track=cloud"[\s\S]*?<\/div>\s*<a href="\/6\. partF\/hub\.html"[^>]*>[\s\S]*?<\/a>\s*<\/div>/,
    `<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">
                        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                            <a href="/foundations.html?track=cloud" class="primer-pill-btn" style="flex: 1; min-width: 70px;">☁️ Cloud</a>
                            <a href="/foundations.html?track=sql" class="primer-pill-btn" style="flex: 1; min-width: 70px;">🛢️ SQL</a>
                            <a href="/foundations.html?track=nextjs" class="primer-pill-btn" style="flex: 1; min-width: 70px;">⚡ Next.js</a>
                        </div>
                        <a href="/6. partF/hub.html" class="track-btn gold-btn dojo-btn">
                            <span>🚀 Enter Level 7 Hub</span>
                        </a>
                    </div>`
);

// Level 8 Card
index = index.replace(
    /<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">\s*<a href="\/foundations\.html\?track=async"[^>]*>[\s\S]*?<\/a>\s*<a href="\/7\. partG\/hub\.html"[^>]*>[\s\S]*?<\/a>\s*<\/div>/,
    `<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">
                        <a href="/foundations.html?track=async" class="primer-btn">
                            <span>📖 Read Async UI Foundations</span>
                        </a>
                        <a href="/7. partG/hub.html" class="track-btn gold-btn dojo-btn">
                            <span>🌉 Enter Level 8 Dojo</span>
                        </a>
                    </div>`
);

// Level 9 Card
index = index.replace(
    /<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">\s*<a href="\/foundations\.html\?track=auth"[^>]*>[\s\S]*?<\/a>\s*<a href="\/8\. partH\/hub\.html"[^>]*>[\s\S]*?<\/a>\s*<\/div>/,
    `<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">
                        <a href="/foundations.html?track=auth" class="primer-btn">
                            <span>📖 Read React Auth Foundations</span>
                        </a>
                        <a href="/8. partH/hub.html" class="track-btn gold-btn dojo-btn">
                            <span>🛡️ Enter Level 9 Dojo</span>
                        </a>
                    </div>`
);

// Level 10 Card
index = index.replace(
    /<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">\s*<a href="\/foundations\.html\?track=saas"[^>]*>[\s\S]*?<\/a>\s*<a href="\/9\. partI\/hub\.html"[^>]*>[\s\S]*?<\/a>\s*<\/div>/,
    `<div class="track-btn-group" style="display: flex; gap: 8px; flex-direction: column; width: 100%;">
                        <a href="/foundations.html?track=saas" class="primer-btn">
                            <span>📖 Read SaaS UI Foundations</span>
                        </a>
                        <a href="/9. partI/hub.html" class="track-btn primary-btn dojo-btn" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #0f172a; font-weight: 800; border-radius: 20px; box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35);">
                            <span>🏆 Launch Level 10 Capstone</span>
                        </a>
                    </div>`
);

fs.writeFileSync('src/pages/index.astro', index, 'utf-8');
console.log('✅ Updated src/pages/index.astro');
