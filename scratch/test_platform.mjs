import fs from 'fs';
import path from 'path';

console.log('=== NoviCodes Platform Health & Field Journal Audit ===\n');

// 1. Check CSS Tokens in root.css and dashboard.css
const rootCss = fs.readFileSync('src/styles/root.css', 'utf-8');
const dashboardCss = fs.readFileSync('src/styles/dashboard.css', 'utf-8');

const requiredTokens = [
    '--canvas-base',
    '--card-elevated',
    '--text-title',
    '--text-body',
    '--text-muted',
    '--accent-oxide',
    '--accent-industrial',
    '--border-subtle'
];

let missingTokens = [];
for (const token of requiredTokens) {
    if (!rootCss.includes(token)) {
        missingTokens.push(token);
    }
}

if (missingTokens.length === 0) {
    console.log('✅ 1. CSS Design Tokens: All Field Journal tokens present in root.css');
} else {
    console.error('❌ 1. CSS Design Tokens: Missing tokens:', missingTokens);
}

// 2. Check sync between src/styles/dashboard.css and public/styles/dashboard.css
const publicDashboardCss = fs.readFileSync('public/styles/dashboard.css', 'utf-8');
if (dashboardCss === publicDashboardCss) {
    console.log('✅ 2. CSS Synchronization: src/styles/dashboard.css and public/styles/dashboard.css are 100% identical');
} else {
    console.warn('⚠️ 2. CSS Synchronization: src and public dashboard.css differ');
}

// 3. Scan for em-dashes (—) across all Astro files in src/pages
function getAllAstroFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllAstroFiles(fullPath));
        } else if (file.endsWith('.astro')) {
            results.push(fullPath);
        }
    });
    return results;
}

const astroFiles = getAllAstroFiles('src');
let emDashCount = 0;
let emDashFiles = [];

for (const file of astroFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes('—')) {
        emDashCount++;
        emDashFiles.push(file);
    }
}

if (emDashCount === 0) {
    console.log(`✅ 3. Editorial Integrity: 0 em-dashes found across ${astroFiles.length} Astro files`);
} else {
    console.log(`ℹ️ 3. Editorial Integrity: Found em-dashes in ${emDashCount} files:`, emDashFiles.slice(0, 5));
}

// 4. Verify Key Platform Pages exist
const requiredPages = [
    'src/pages/index.astro',
    'src/pages/privacy.astro',
    'src/pages/terms.astro',
    'src/pages/disclaimer.astro',
    'src/pages/foundations.astro',
    'src/pages/1. partA/hub.astro',
    'src/layouts/BaseLayout.astro',
    'src/layouts/LessonLayout.astro',
    'src/components/PlatformHeader.astro',
    'src/components/PlatformFooter.astro'
];

let allPagesExist = true;
for (const p of requiredPages) {
    if (!fs.existsSync(p)) {
        console.error('❌ Missing page:', p);
        allPagesExist = false;
    }
}

if (allPagesExist) {
    console.log(`✅ 4. Architecture & Routing: All ${requiredPages.length} core pages & layouts verified on disk`);
}

console.log('\n=== All Platform Health Checks Complete ===');
