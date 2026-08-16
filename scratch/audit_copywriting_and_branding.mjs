import fs from 'fs';
import path from 'path';

console.log('✍️ Starting Copywriting, Branding & Quality Audit...');

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

const sourceFiles = scanDir(path.resolve('src'), f => f.endsWith('.astro') || f.endsWith('.ts') || f.endsWith('.js'));
const publicFiles = scanDir(path.resolve('public'), f => f.endsWith('.js') || f.endsWith('.html'));
const allFiles = [...sourceFiles, ...publicFiles];

console.log(`Scanning ${allFiles.length} files for copywriting issues...`);

const issues = [];

const placeholderPatterns = [
    { name: 'Lorem Ipsum', regex: /lorem\s+ipsum/i },
    { name: 'Unresolved Template Variable', regex: /\{\s*undefined\s*\}|\{\s*NaN\s*\}|undefined\s+XP|NaN\s+XP/i },
    { name: 'TODO / FIXME Comment in UI text', regex: /(?:TODO|FIXME|TBD|PLACEHOLDER)\s*[:=]/i },
    { name: 'Broken Escaped Dollar in Text', regex: /\\\$[a-zA-Z0-9_]+/ }
];

for (const file of allFiles) {
    const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf-8');

    // 1. Check for old branding "NoviCodes" in visible UI
    if (content.includes('NoviCodes') || content.includes('novicodes')) {
        // Find line numbers
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
            if (line.includes('NoviCodes') || line.includes('novicodes')) {
                // Ignore canonical URL or author credits if intended
                issues.push({
                    file: rel,
                    line: idx + 1,
                    type: 'Branding',
                    detail: `Found "NoviCodes": ${line.trim().slice(0, 80)}`
                });
            }
        });
    }

    // 2. Check for placeholder text
    for (const p of placeholderPatterns) {
        const match = content.match(p.regex);
        if (match) {
            issues.push({
                file: rel,
                type: 'Placeholder',
                detail: `Found ${p.name}: "${match[0]}"`
            });
        }
    }
}

console.log(`\n================ COPYWRITING & BRANDING REPORT ================`);
console.log(`Total Files Checked: ${allFiles.length}`);
console.log(`Total Findings: ${issues.length}`);

if (issues.length > 0) {
    issues.slice(0, 40).forEach((iss, i) => {
        console.log(`${i + 1}. [${iss.type}] ${iss.file}${iss.line ? ':' + iss.line : ''} -> ${iss.detail}`);
    });
} else {
    console.log('🎉 ZERO COPYWRITING OR BRANDING INCONSISTENCIES FOUND!');
}
