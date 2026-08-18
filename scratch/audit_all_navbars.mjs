import fs from 'fs';
import path from 'path';

function findAstroFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            results = results.concat(findAstroFiles(fullPath));
        } else if (file.endsWith('.astro')) {
            results.push(fullPath);
        }
    });
    return results;
}

const astroFiles = findAstroFiles('src');
console.log(`Auditing ${astroFiles.length} Astro files for navbar configuration...`);

let issues = [];

astroFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    
    // Check if it uses PlatformHeader or has custom header
    const hasPlatformHeader = content.includes('<PlatformHeader');
    const hasCustomHeader = content.includes('<header class="platform-header"') && !file.includes('PlatformHeader.astro');
    
    // Check navLinks definition
    const navLinksMatch = content.match(/const navLinks\s*=\s*(\[[\s\S]*?\]);/);
    if (navLinksMatch) {
        try {
            const rawNav = navLinksMatch[1];
            // Check for missing icons or inconsistent labels
            if (!rawNav.includes('icon:')) {
                issues.push(`${file}: navLinks missing icons`);
            }
        } catch (e) {
            issues.push(`${file}: Error parsing navLinks`);
        }
    }
    
    if (hasCustomHeader) {
        issues.push(`${file}: Has hardcoded custom <header> instead of <PlatformHeader />`);
    }
});

console.log(`Found ${issues.length} issues:`);
issues.forEach(i => console.log(' - ' + i));
