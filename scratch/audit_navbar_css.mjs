import fs from 'fs';
import path from 'path';

function findFiles(dir, ext) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            results = results.concat(findFiles(fullPath, ext));
        } else if (file.endsWith(ext)) {
            results.push(fullPath);
        }
    });
    return results;
}

const cssFiles = [...findFiles('src', '.css'), ...findFiles('public', '.css')];
console.log(`Checking ${cssFiles.length} CSS files for navbar rules...`);

cssFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const matches = [];
    if (content.includes('.platform-header')) matches.push('.platform-header');
    if (content.includes('.platform-logo')) matches.push('.platform-logo');
    if (content.includes('.header-nav-links')) matches.push('.header-nav-links');
    if (content.includes('.stat-badge')) matches.push('.stat-badge');
    if (content.includes('.title-codes')) matches.push('.title-codes');
    
    if (matches.length > 0) {
        console.log(`\nFile: ${file}`);
        console.log(`  Matches: ${matches.join(', ')}`);
        
        // Check specific color tokens
        if (content.includes('#2563eb') && matches.includes('.title-codes')) {
            console.log(`  [ALERT] Uses legacy blue #2563eb for title-codes!`);
        }
        if (content.includes('height: 64px') && matches.includes('.platform-header')) {
            console.log(`  [ALERT] Uses legacy height: 64px instead of 58px!`);
        }
        if (content.includes('border-radius: 20px') && matches.includes('.stat-badge')) {
            console.log(`  [ALERT] Uses pill radius (20px) instead of 2px!`);
        }
    }
});
