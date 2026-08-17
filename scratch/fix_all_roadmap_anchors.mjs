/**
 * Update all Skill Tree / Roadmap links to directly anchor to /#roadmap
 * and add scroll-margin-top to .roadmap-section so the sticky header never covers it.
 */

import fs from 'fs';

console.log('🚀 Fixing all Skill Tree / Roadmap anchor links across the codebase...\n');

// 1. src/pages/1. partA/hub.astro
let hubContent = fs.readFileSync('src/pages/1. partA/hub.astro', 'utf-8');
hubContent = hubContent.replace(/<a href="\/" class="gateway-btn secondary">/g, '<a href="/#roadmap" class="gateway-btn secondary">');
fs.writeFileSync('src/pages/1. partA/hub.astro', hubContent, 'utf-8');
console.log('✅ Updated src/pages/1. partA/hub.astro');

// 2. All 7 Certificate Pages
const certFiles = [
    'src/pages/2. partB/certificate.astro',
    'src/pages/3. partC/certificate.astro',
    'src/pages/5. partE/certificate.astro',
    'src/pages/6. partF/certificate.astro',
    'src/pages/7. partG/certificate.astro',
    'src/pages/8. partH/certificate.astro',
    'src/pages/9. partI/certificate.astro'
];

certFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/<a href="\/" class="whats-next-btn primary">← Back to Dashboard<\/a>/g, '<a href="/#roadmap" class="whats-next-btn primary">← Return to Skill Tree</a>');
    content = content.replace(/<a href="\/" class="whats-next-btn primary">← Back to Skill Tree<\/a>/g, '<a href="/#roadmap" class="whats-next-btn primary">← Return to Skill Tree</a>');
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`✅ Updated ${file}`);
});

// 3. src/pages/4. partD/devtype/devtype.astro
let devtypeContent = fs.readFileSync('src/pages/4. partD/devtype/devtype.astro', 'utf-8');
devtypeContent = devtypeContent.replace(/<a href="\/" class="nav-back-btn">/g, '<a href="/#roadmap" class="nav-back-btn">');
fs.writeFileSync('src/pages/4. partD/devtype/devtype.astro', devtypeContent, 'utf-8');
console.log('✅ Updated src/pages/4. partD/devtype/devtype.astro');

// 4. src/pages/404.astro
let notFoundContent = fs.readFileSync('src/pages/404.astro', 'utf-8');
notFoundContent = notFoundContent.replace(/<a href="\/" class="action-btn secondary-btn" id="dashboardLink">/g, '<a href="/#roadmap" class="action-btn secondary-btn" id="dashboardLink">');
notFoundContent = notFoundContent.replace(/let targetUrl = '\/';/g, "let targetUrl = '/#roadmap';");
fs.writeFileSync('src/pages/404.astro', notFoundContent, 'utf-8');
console.log('✅ Updated src/pages/404.astro');

// 5. src/scripts/dojo/core/protection.ts
let protectionContent = fs.readFileSync('src/scripts/dojo/core/protection.ts', 'utf-8');
protectionContent = protectionContent.replace(/<a href="\/" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:11px 20px;/g, '<a href="/#roadmap" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:11px 20px;');
fs.writeFileSync('src/scripts/dojo/core/protection.ts', protectionContent, 'utf-8');
console.log('✅ Updated src/scripts/dojo/core/protection.ts');

// 6. Add scroll-margin-top to .roadmap-section in dashboard.css
const cssFiles = ['src/styles/dashboard.css', 'public/styles/dashboard.css'];
cssFiles.forEach(file => {
    let css = fs.readFileSync(file, 'utf-8');
    if (!css.includes('scroll-margin-top: 90px;')) {
        css = css.replace(/\.roadmap-section\s*\{([^}]*)\}/g, (match, inner) => {
            if (!inner.includes('scroll-margin-top')) {
                return `.roadmap-section {${inner}\n  scroll-margin-top: 90px;\n}`;
            }
            return match;
        });
        fs.writeFileSync(file, css, 'utf-8');
        console.log(`✅ Added scroll-margin-top: 90px to ${file}`);
    }
});

console.log('\n🎉 ALL SKILL TREE & ROADMAP ANCHOR LINKS UPDATED SUCCESSFULLY!');
