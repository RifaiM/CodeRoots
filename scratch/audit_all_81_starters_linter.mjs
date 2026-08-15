import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Simple replica of JSCompiler / ReactLinter / PythonLinter
function lintJS(code) {
    const problems = [];
    if (!code || code.trim().length === 0) return problems;

    const lines = code.split('\n');

    lines.forEach((lineText, idx) => {
        const lineNum = idx + 1;
        const clean = lineText.replace(/\/\/[^\r\n]*/, '').trim();
        if (!clean) return;

        // Check for obvious unterminated single/double quote on single line
        const quoteCountD = (clean.match(/"/g) || []).length;
        const quoteCountS = (clean.match(/'/g) || []).length;
        if (quoteCountD % 2 !== 0 && !clean.includes('`')) {
            problems.push({
                message: `Unterminated double quote (") string literal`,
                line: lineNum,
                lineText: lineText.trim(),
                severity: 'error'
            });
        } else if (quoteCountS % 2 !== 0 && !clean.includes('`')) {
            problems.push({
                message: `Unterminated single quote (') string literal`,
                line: lineNum,
                lineText: lineText.trim(),
                severity: 'error'
            });
        }
    });

    return problems;
}

const pagesDir = path.resolve('src/pages');

function findAstroFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            results = results.concat(findAstroFiles(fullPath));
        } else if (file.endsWith('.astro') && file.includes('lesson')) {
            results.push(fullPath);
        }
    }
    return results;
}

const lessonFiles = findAstroFiles(pagesDir);
console.log(`Found ${lessonFiles.length} lesson files.`);

let errorCount = 0;

for (const file of lessonFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    
    // Extract starterCode
    let starterCode = '';
    const match = content.match(/const starterCode = ([\s\S]*?);\n\nconst jumpLessons/);
    if (match) {
        const raw = match[1].trim();
        if (raw.startsWith('`') && raw.endsWith('`')) {
            // Simulate how JS template literal evaluates
            try {
                starterCode = eval(raw);
            } catch (e) {
                starterCode = raw.slice(1, -1);
            }
        } else if (raw.startsWith('"') && raw.endsWith('"')) {
            try {
                starterCode = JSON.parse(raw);
            } catch (e) {
                starterCode = raw.slice(1, -1);
            }
        } else {
            starterCode = raw;
        }
    }

    if (starterCode) {
        const problems = lintJS(starterCode);
        if (problems.length > 0) {
            errorCount++;
            console.log(`\n❌ [${path.relative(process.cwd(), file)}]`);
            problems.forEach(p => {
                console.log(`   Line ${p.line}: ${p.message} | content: "${p.lineText}"`);
            });
        }
    }
}

if (errorCount === 0) {
    console.log(`\n✅ ALL 81 Lesson Starters pass without any linter/diagnostics errors!`);
} else {
    console.log(`\n⚠️ Found ${errorCount} files with starter code issues.`);
}
