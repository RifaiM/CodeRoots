/**
 * Comprehensive SEO Audit across all 129 HTML pages in dist/
 */

import fs from 'fs';
import path from 'path';

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllHtmlFiles(fullPath, arrayOfFiles);
        } else if (file.endsWith('.html')) {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

const htmlFiles = getAllHtmlFiles('dist');
console.log(`🚀 Auditing SEO across ${htmlFiles.length} HTML pages in dist/...\n`);

let totalChecks = 0;
let passedChecks = 0;
const issues = [];

htmlFiles.forEach(file => {
    const relPath = path.relative('dist', file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf-8');

    function check(condition, desc) {
        totalChecks++;
        if (condition) {
            passedChecks++;
        } else {
            issues.push({ page: relPath, issue: desc });
            console.error(`❌ [${relPath}] ${desc}`);
        }
    }

    // 1. Title Tag
    const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    check(!!titleMatch && titleMatch[1].trim().length > 5, 'Has descriptive <title> tag');

    // 2. Meta Description
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
                      content.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
    check(!!descMatch && descMatch[1].trim().length >= 20, 'Has descriptive <meta name="description"> (>= 20 chars)');

    // 3. Viewport & Charset
    check(content.includes('<meta charset="UTF-8"') || content.includes('<meta charset="utf-8"'), 'Has <meta charset="UTF-8">');
    check(content.includes('name="viewport"'), 'Has <meta name="viewport">');

    // 4. Lang Attribute
    check(/<html[^>]+lang=["']en["']/i.test(content), 'Has <html lang="en">');

    // 5. OpenGraph Tags
    check(content.includes('property="og:title"'), 'Has og:title');
    check(content.includes('property="og:description"'), 'Has og:description');
    check(content.includes('property="og:type"'), 'Has og:type');

    // 6. Twitter Card Tags
    check(content.includes('name="twitter:card"'), 'Has twitter:card');
    check(content.includes('name="twitter:title"'), 'Has twitter:title');

    // 7. Canonical Tag
    check(content.includes('rel="canonical"'), 'Has <link rel="canonical">');

    // 8. H1 Heading (Exactly 1 H1 per page for optimal SEO hierarchy)
    const h1Matches = content.match(/<h1[\s>]/gi) || [];
    check(h1Matches.length === 1, `Has exactly ONE <h1> heading (found ${h1Matches.length})`);

    // 9. Image Alt Attributes
    const imgMatches = content.match(/<img[^>]+>/gi) || [];
    imgMatches.forEach(img => {
        const hasAlt = /alt=["'][^"']*["']/i.test(img);
        check(hasAlt, `Image has alt attribute: ${img.substring(0, 50)}...`);
    });
});

console.log(`\n========================================`);
console.log(`🏁 SEO AUDIT SUMMARY: ${passedChecks}/${totalChecks} checks passed`);
console.log(`========================================\n`);

if (issues.length > 0) {
    console.error(`Total SEO Issues Found: ${issues.length}`);
    const grouped = {};
    issues.forEach(i => {
        grouped[i.issue] = (grouped[i.issue] || 0) + 1;
    });
    console.table(grouped);
} else {
    console.log('🎉 100% PERFECT SEO HEALTH ACROSS ALL 129 PAGES!');
}
