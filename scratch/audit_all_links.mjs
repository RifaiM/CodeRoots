import fs from 'fs';
import path from 'path';

// 1. Build the dist directory first if not present, then scan all generated HTML files for link integrity
const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
    console.error('❌ dist/ directory does not exist! Please run npm run build first.');
    process.exit(1);
}

// Recursively find all HTML files in dist/
function getAllHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllHtmlFiles(fullPath));
        } else if (file.endsWith('.html')) {
            results.push(fullPath);
        }
    }
    return results;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`🔍 Found ${htmlFiles.length} HTML files in dist/ to audit.`);

// Extract all href and src links from HTML files
let totalLinksChecked = 0;
let deadLinks = [];
let externalLinks = [];

const hrefRegex = /href=["']([^"']+)["']/g;
const srcRegex = /src=["']([^"']+)["']/g;

for (const filePath of htmlFiles) {
    const relHtmlPath = path.relative(distDir, filePath).replace(/\\/g, '/');
    const content = fs.readFileSync(filePath, 'utf-8');

    let match;
    const linksInFile = [];

    while ((match = hrefRegex.exec(content)) !== null) {
        linksInFile.push({ type: 'href', url: match[1] });
    }
    while ((match = srcRegex.exec(content)) !== null) {
        linksInFile.push({ type: 'src', url: match[1] });
    }

    for (const { type, url } of linksInFile) {
        totalLinksChecked++;

        // Ignore javascript:, mailto:, tel:, #hash, CDN URLs (http://, https://, //)
        if (
            url.startsWith('javascript:') ||
            url.startsWith('mailto:') ||
            url.startsWith('tel:') ||
            url.startsWith('#') ||
            url === ''
        ) {
            continue;
        }

        if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) {
            externalLinks.push({ from: relHtmlPath, url });
            continue;
        }

        // Clean query strings and hashes
        const cleanUrl = url.split('?')[0].split('#')[0];
        if (!cleanUrl) continue;

        // Resolve internal link against dist/
        let targetPath;
        if (cleanUrl.startsWith('/')) {
            targetPath = path.join(distDir, cleanUrl.slice(1));
        } else {
            targetPath = path.join(path.dirname(filePath), cleanUrl);
        }

        // If target doesn't have extension and might be directory or .html
        let exists = fs.existsSync(targetPath);
        if (!exists) {
            if (fs.existsSync(targetPath + '.html')) exists = true;
            else if (fs.existsSync(path.join(targetPath, 'index.html'))) exists = true;
        }

        // Decode URI component check (for folders with spaces like '1. partA')
        if (!exists) {
            const decodedTarget = decodeURIComponent(targetPath);
            if (fs.existsSync(decodedTarget)) exists = true;
            else if (fs.existsSync(decodedTarget + '.html')) exists = true;
            else if (fs.existsSync(path.join(decodedTarget, 'index.html'))) exists = true;
        }

        if (!exists) {
            deadLinks.push({
                from: relHtmlPath,
                type,
                rawUrl: url,
                resolvedPath: path.relative(distDir, targetPath).replace(/\\/g, '/')
            });
        }
    }
}

console.log(`\n================ LINK AUDIT RESULTS ================`);
console.log(`Total Links Checked: ${totalLinksChecked}`);
console.log(`External Links: ${externalLinks.length}`);
console.log(`Dead / Unresolved Links: ${deadLinks.length}`);

if (deadLinks.length > 0) {
    console.log('\n❌ DEAD LINKS FOUND:');
    deadLinks.slice(0, 30).forEach((dl, i) => {
        console.log(`${i + 1}. [${dl.from}] -> (${dl.type}) "${dl.rawUrl}" -> NOT FOUND: dist/${dl.resolvedPath}`);
    });
} else {
    console.log('🎉 ZERO DEAD LINKS FOUND ACROSS ALL BUILT HTML PAGES!');
}
