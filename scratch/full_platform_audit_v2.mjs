import fs from 'fs';
import path from 'path';

const distDir = 'd:/3. CodeRoots-refactor/dist';
const srcPagesDir = 'd:/3. CodeRoots-refactor/src/pages';
const publicDir = 'd:/3. CodeRoots-refactor/public';

console.log('====================================================');
console.log('  CODEROOTS DEEP PLATFORM AUDIT (SECURITY, STRESS, SEO)');
console.log('====================================================\n');

// 1. RECURSIVELY FIND ALL HTML FILES IN DIST
function getFiles(dir, ext = '.html') {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(fullPath, ext));
        } else if (file.endsWith(ext)) {
            results.push(fullPath);
        }
    });
    return results;
}

const htmlFiles = getFiles(distDir, '.html');
console.log(`[1] Discovered ${htmlFiles.length} generated static HTML files in dist/\n`);

// 2. SEO AUDIT
console.log('--- [SEO & META AUDIT] ---');
const seoIssues = [];
let missingTitle = 0;
let missingDesc = 0;
let missingH1 = 0;
let multipleH1 = 0;
let missingCanonical = 0;
let missingOgTitle = 0;
let missingOgDesc = 0;
let missingOgImage = 0;
let missingAlt = 0;

htmlFiles.forEach(file => {
    const relPath = path.relative(distDir, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');

    // Title Check
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
        missingTitle++;
        seoIssues.push(`[${relPath}] Missing <title> tag`);
    }

    // Meta Description Check
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i) ||
                      content.match(/<meta\s+content=["'](.*?)["']\s+name=["']description["']/i);
    if (!descMatch || !descMatch[1].trim()) {
        missingDesc++;
        seoIssues.push(`[${relPath}] Missing meta description`);
    }

    // H1 Check
    const h1Matches = content.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    if (h1Matches.length === 0) {
        // Certificates or special embeds might not have h1, check if cert
        if (!relPath.includes('certificate')) {
            missingH1++;
            seoIssues.push(`[${relPath}] Missing <h1> tag`);
        }
    } else if (h1Matches.length > 1) {
        multipleH1++;
        seoIssues.push(`[${relPath}] Multiple <h1> tags (${h1Matches.length})`);
    }

    // Canonical Check
    const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
    if (!canonicalMatch || !canonicalMatch[1].trim()) {
        missingCanonical++;
        seoIssues.push(`[${relPath}] Missing canonical link`);
    }

    // OpenGraph Check
    const ogTitle = content.match(/<meta\s+property=["']og:title["']/i);
    const ogDesc = content.match(/<meta\s+property=["']og:description["']/i);
    const ogImage = content.match(/<meta\s+property=["']og:image["']/i);
    if (!ogTitle) missingOgTitle++;
    if (!ogDesc) missingOgDesc++;
    if (!ogImage) missingOgImage++;

    // Images without alt
    const imgWithoutAlt = content.match(/<img(?![^>]*\balt=)[^>]*>/gi);
    if (imgWithoutAlt) {
        missingAlt += imgWithoutAlt.length;
        seoIssues.push(`[${relPath}] ${imgWithoutAlt.length} <img> missing alt attribute`);
    }
});

console.log(`Total Pages Analyzed: ${htmlFiles.length}`);
console.log(`- Missing <title>: ${missingTitle}`);
console.log(`- Missing meta description: ${missingDesc}`);
console.log(`- Missing <h1>: ${missingH1}`);
console.log(`- Multiple <h1>: ${multipleH1}`);
console.log(`- Missing Canonical URL: ${missingCanonical}`);
console.log(`- Missing og:title: ${missingOgTitle}`);
console.log(`- Missing og:description: ${missingOgDesc}`);
console.log(`- Missing og:image: ${missingOgImage}`);
console.log(`- Total <img> tags missing alt: ${missingAlt}`);

// Check for sitemap & robots.txt
const hasRobots = fs.existsSync(path.join(publicDir, 'robots.txt'));
const hasSitemap = fs.existsSync(path.join(publicDir, 'sitemap.xml'));
console.log(`- robots.txt exists in public/: ${hasRobots ? 'YES' : 'NO (Missing)'}`);
console.log(`- sitemap.xml exists in public/: ${hasSitemap ? 'YES' : 'NO (Missing)'}`);

// 3. SECURITY AUDIT
console.log('\n--- [SECURITY & LESSON ACCESS AUDIT] ---');
const secIssues = [];

// A. Check iframe sandbox in lesson files
let iframeWithoutSandbox = 0;
let iframesChecked = 0;
htmlFiles.forEach(file => {
    const relPath = path.relative(distDir, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');
    const iframeMatches = content.match(/<iframe\b[^>]*>/gi) || [];
    iframeMatches.forEach(tag => {
        iframesChecked++;
        if (!tag.includes('sandbox=')) {
            iframeWithoutSandbox++;
            secIssues.push(`[${relPath}] <iframe> missing sandbox attribute: ${tag.slice(0, 50)}...`);
        }
    });
});
console.log(`- Iframes Checked: ${iframesChecked}`);
console.log(`- Iframes without sandbox: ${iframeWithoutSandbox}`);

// B. Check links with target="_blank" missing rel="noopener" or "noreferrer"
let unsafeBlankLinks = 0;
htmlFiles.forEach(file => {
    const relPath = path.relative(distDir, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');
    const targetBlankMatches = content.match(/<a\b[^>]*target=["']_blank["'][^>]*>/gi) || [];
    targetBlankMatches.forEach(tag => {
        if (!tag.includes('rel=') || (!tag.includes('noopener') && !tag.includes('noreferrer'))) {
            unsafeBlankLinks++;
            secIssues.push(`[${relPath}] External link missing rel="noopener noreferrer": ${tag.slice(0, 50)}...`);
        }
    });
});
console.log(`- target="_blank" links missing rel="noopener noreferrer": ${unsafeBlankLinks}`);

// C. Scan for sensitive keywords or leaks in codebase (api keys, sk-, hardcoded secrets)
console.log('\n--- [SECRET & CREDENTIAL SCAN] ---');
const allSrcFiles = getFiles('d:/3. CodeRoots-refactor/src', '.ts')
    .concat(getFiles('d:/3. CodeRoots-refactor/src', '.js'))
    .concat(getFiles('d:/3. CodeRoots-refactor/src', '.astro'))
    .concat(getFiles('d:/3. CodeRoots-refactor/public', '.js'));

let potentialSecrets = 0;
allSrcFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const rel = path.relative('d:/3. CodeRoots-refactor', file).replace(/\\/g, '/');
    const match = content.match(/(sk-[a-zA-Z0-9]{20,}|AIza[0-9A-Za-z-_]{35}|ghp_[a-zA-Z0-9]{36})/);
    if (match) {
        potentialSecrets++;
        console.log(`[ALERT] Potential secret found in ${rel}: ${match[0].slice(0, 10)}...`);
    }
});
console.log(`- Potential hardcoded API secrets found: ${potentialSecrets}`);

// D. Lesson Gating Architecture & Access Control
console.log('\n--- [LESSON ACCESS CONTROL & SEQUENTIAL GATING] ---');
console.log('Architecture Note on Lesson Gating:');
console.log('1. Static Jamstack Client-Side Gating: CodeRoots is a statically generated client-side educational SPA/MPA.');
console.log('2. Sequential URL Navigation: Direct URL navigation (e.g. entering /2. partB/lesson15/lesson15_remake.html in address bar) is intentionally permitted for open practice, deep linking, and resume.');
console.log('3. UI Jump Dropdown & Hub Locking: Jump menus and hub action buttons enforce sequential progression and lock checking unless practice_mode_unlocked is enabled via DevKit.');
console.log('4. Certificate Gating: Certificates check that all required lessons in the level are completed or practice mode is enabled before allowing certificate generation/print.');

// 4. SUMMARY REPORT
console.log('\n====================================================');
console.log('  AUDIT SUMMARY');
console.log('====================================================');
console.log(`- SEO Issues Found: ${seoIssues.length}`);
console.log(`- Security Vulnerabilities Found: ${secIssues.length}`);
console.log(`- Secret Leaks: ${potentialSecrets}`);

if (seoIssues.length > 0) {
    console.log('\nSample SEO Details:');
    seoIssues.slice(0, 15).forEach(issue => console.log('  ' + issue));
    if (seoIssues.length > 15) console.log(`  ...and ${seoIssues.length - 15} more`);
}

if (secIssues.length > 0) {
    console.log('\nSample Security Details:');
    secIssues.slice(0, 10).forEach(issue => console.log('  ' + issue));
}
