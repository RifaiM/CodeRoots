import fs from 'fs';

// 1. Level 5 Hub (3. partC/hub.astro)
let hub5 = fs.readFileSync('src/pages/3. partC/hub.astro', 'utf-8');
hub5 = hub5.replace(
    /(<a href="\/3\. partC\/lesson1\/lesson1_remake\.html" class="hero-cta-btn" id="heroResumeBtn">[\s\S]*?<\/a>)/,
    `$1
            <div style="margin-top: 14px; text-align: center;">
                <a href="/foundations.html?track=react" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.88rem; color: #0284c7; text-decoration: none; font-weight: 700; background: #e0f2fe; padding: 6px 16px; border-radius: 20px; transition: all 0.2s ease;">
                    <span>📖 New to React? Explore Level 5 Foundations & Analogy Bank ➔</span>
                </a>
            </div>`
);
fs.writeFileSync('src/pages/3. partC/hub.astro', hub5, 'utf-8');

// 2. Level 6 Hub (5. partE/hub.astro)
let hub6 = fs.readFileSync('src/pages/5. partE/hub.astro', 'utf-8');
hub6 = hub6.replace(
    /(<a href="\/5\. partE\/lesson1\/lesson1_remake\.html" class="hero-cta-btn" id="heroResumeBtn">[\s\S]*?<\/a>)/,
    `$1
            <div style="margin-top: 14px; text-align: center;">
                <a href="/foundations.html?track=python" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.88rem; color: #059669; text-decoration: none; font-weight: 700; background: #ecfdf5; padding: 6px 16px; border-radius: 20px; transition: all 0.2s ease;">
                    <span>📖 New to Python? Explore Level 6 Foundations & Server Concepts ➔</span>
                </a>
            </div>`
);
fs.writeFileSync('src/pages/5. partE/hub.astro', hub6, 'utf-8');

// 3. Level 7 Hub (6. partF/hub.astro)
let hub7 = fs.readFileSync('src/pages/6. partF/hub.astro', 'utf-8');
hub7 = hub7.replace(
    /(<a href="\/6\. partF\/branchA\/lesson1_remake\.html" class="hero-cta-btn" id="heroResumeBtn">[\s\S]*?<\/a>)/,
    `$1
            <div style="margin-top: 14px; display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
                <a href="/foundations.html?track=cloud" style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.82rem; color: #7e22ce; text-decoration: none; font-weight: 700; background: #faf5ff; padding: 6px 12px; border-radius: 20px;">
                    <span>☁️ Cloud Primer</span>
                </a>
                <a href="/foundations.html?track=sql" style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.82rem; color: #4338ca; text-decoration: none; font-weight: 700; background: #eef2ff; padding: 6px 12px; border-radius: 20px;">
                    <span>🛢️ SQL Primer</span>
                </a>
                <a href="/foundations.html?track=nextjs" style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.82rem; color: #18181b; text-decoration: none; font-weight: 700; background: #f4f4f5; padding: 6px 12px; border-radius: 20px;">
                    <span>⚡ Next.js Primer</span>
                </a>
            </div>`
);
fs.writeFileSync('src/pages/6. partF/hub.astro', hub7, 'utf-8');

// 4. Level 8 Hub (7. partG/hub.astro)
let hub8 = fs.readFileSync('src/pages/7. partG/hub.astro', 'utf-8');
hub8 = hub8.replace(
    /(<a href="\/7\. partG\/lesson1\/lesson1_remake\.html" class="hero-cta-btn" id="heroResumeBtn">[\s\S]*?<\/a>)/,
    `$1
            <div style="margin-top: 14px; text-align: center;">
                <a href="/foundations.html?track=async" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.88rem; color: #0284c7; text-decoration: none; font-weight: 700; background: #f0f9ff; padding: 6px 16px; border-radius: 20px; transition: all 0.2s ease;">
                    <span>📖 New to Async UI? Read the Level 8 Foundations Guide ➔</span>
                </a>
            </div>`
);
fs.writeFileSync('src/pages/7. partG/hub.astro', hub8, 'utf-8');

// 5. Level 9 Hub (8. partH/hub.astro)
let hub9 = fs.readFileSync('src/pages/8. partH/hub.astro', 'utf-8');
hub9 = hub9.replace(
    /(<a href="\/8\. partH\/lesson1\/lesson1_remake\.html" class="hero-cta-btn" id="heroResumeBtn">[\s\S]*?<\/a>)/,
    `$1
            <div style="margin-top: 14px; text-align: center;">
                <a href="/foundations.html?track=auth" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.88rem; color: #4338ca; text-decoration: none; font-weight: 700; background: #f5f3ff; padding: 6px 16px; border-radius: 20px; transition: all 0.2s ease;">
                    <span>📖 New to React Auth? Read the Level 9 Foundations Guide ➔</span>
                </a>
            </div>`
);
fs.writeFileSync('src/pages/8. partH/hub.astro', hub9, 'utf-8');

// 6. Level 10 Hub (9. partI/hub.astro)
let hub10 = fs.readFileSync('src/pages/9. partI/hub.astro', 'utf-8');
hub10 = hub10.replace(
    /(<a href="\/9\. partI\/lesson1\/lesson1_remake\.html" class="hero-cta-btn" id="heroResumeBtn">[\s\S]*?<\/a>)/,
    `$1
            <div style="margin-top: 14px; text-align: center;">
                <a href="/foundations.html?track=saas" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.88rem; color: #b45309; text-decoration: none; font-weight: 700; background: #fffbeb; padding: 6px 16px; border-radius: 20px; transition: all 0.2s ease;">
                    <span>📖 Read Level 10 SaaS Architecture Foundations ➔</span>
                </a>
            </div>`
);
fs.writeFileSync('src/pages/9. partI/hub.astro', hub10, 'utf-8');

console.log('✅ Added Foundations primer links to Hubs 5 through 10');
