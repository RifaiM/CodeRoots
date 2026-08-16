import fs from 'fs';
import path from 'path';

// Master branding cleanup script to standardize "NoviCodes" -> "NoviCodes" everywhere in UI and metadata

function scanDir(dir, filterFn) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'scratch') continue;
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(scanDir(fullPath, filterFn));
        } else if (filterFn(file)) {
            results.push(fullPath);
        }
    }
    return results;
}

const files = scanDir(path.resolve('.'), f => f.endsWith('.astro') || f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.html') || f.endsWith('.css'));

let filesModified = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    let original = content;

    // 1. Watermark & Brands in Certificates
    content = content.replace(/<div class="cert-watermark">NOVICODES<\/div>/g, '<div class="cert-watermark">NOVICODES</div>');
    content = content.replace(/<div class="cert-brand">NOVICODES PLATFORM<\/div>/g, '<div class="cert-brand">NOVICODES PLATFORM</div>');
    content = content.replace(/NoviCodes Academic Board/g, 'NoviCodes Academic Board');
    content = content.replace(/NoviCodes Core Team/g, 'NoviCodes Academic Board');
    content = content.replace(/NoviCodes Platform/g, 'NoviCodes Platform');
    content = content.replace(/NoviCodes Dashboard/g, 'NoviCodes Dashboard');

    // 2. Titles in Layouts & Guides
    content = content.replace(/\|\s*NoviCodes/g, '| NoviCodes');
    content = content.replace(/NoviCodes •/g, 'NoviCodes •');
    content = content.replace(/novicodes\.dev/g, 'novicodes.dev');
    content = content.replace(/Welcome to NoviCodes/g, 'Welcome to NoviCodes');

    // 3. Alt tags & aria labels
    content = content.replace(/alt="NoviCodes Logo"/g, 'alt="NoviCodes Logo"');
    content = content.replace(/aria-label="NoviCodes/g, 'aria-label="NoviCodes');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf-8');
        console.log(`✅ Standardized branding in: ${path.relative(process.cwd(), file).replace(/\\/g, '/')}`);
        filesModified++;
    }
}

console.log(`\n🎉 Standardized branding across ${filesModified} files.`);
