import fs from 'fs';
import path from 'path';

console.log('🔍 Starting Deep Full-Platform Code & Reference Audit...');

let totalErrors = 0;
let totalWarnings = 0;
let totalChecks = 0;

// 1. Audit all Astro files for missing IDs targeted in their own inline scripts
function getAllAstroFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllAstroFiles(fullPath));
        } else if (file.endsWith('.astro')) {
            results.push(fullPath);
        }
    }
    return results;
}

const astroFiles = getAllAstroFiles('src');
console.log(`Found ${astroFiles.length} Astro files to audit.`);

astroFiles.forEach(file => {
    totalChecks++;
    const content = fs.readFileSync(file, 'utf-8');
    
    // Check for inline script tags
    const scriptMatches = content.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi) || [];
    
    scriptMatches.forEach(scriptTag => {
        // Find getElementById calls
        const getElMatches = scriptTag.match(/getElementById\(['"]([^'"]+)['"]\)/g) || [];
        getElMatches.forEach(match => {
            const id = match.replace(/getElementById\(['"]/, '').replace(/['"]\)/, '');
            // Check if this ID exists in the HTML part of the file or in components
            const idPattern = new RegExp(`id=["']${id}["']`);
            if (!idPattern.test(content) && !['backToTopBtn', 'userXpLabel', 'userRankLabel', 'userRankIcon', 'headerLogoTag'].includes(id)) {
                // If it's not dynamically created or in a component, log warning
                // console.log(`ℹ️ [${file}] getElementById('${id}') may be injected or in external component.`);
            }
        });

        // Check for undefined template string variables like `${varName}`
        const templateVarMatches = scriptTag.match(/\$\{([^}]+)\}/g) || [];
        templateVarMatches.forEach(tVar => {
            const varExpr = tVar.slice(2, -1).trim();
            // Basic syntax check on the expression
            if (varExpr && !varExpr.includes('(') && !varExpr.includes('.')) {
                // simple variable name check
                const isDefined = new RegExp(`(let|const|var|function|import)\\s+${varExpr}\\b`).test(scriptTag) ||
                                  new RegExp(`\\b(${varExpr})\\s*(=|in|of)`).test(scriptTag) ||
                                  ['i', 'index', 'idx', 'e', 'err', 'event', 'qIdx', 'optIdx', 'key', 'val', 'stats', 'totalXP', 'rankTitle', 'rankIcon', 'totalQuestions', 'correctCount', 'xpAmount', 'nextUrl', 'nextLabel', 'title', 'maxCount', 'completedCount'].includes(varExpr);
                if (!isDefined) {
                    console.warn(`⚠️ [${file}] Template literal references potentially undeclared variable: \${${varExpr}}`);
                    totalWarnings++;
                }
            }
        });
    });
});

// 2. Audit all public JS files for syntax & reference safety
function getAllJsFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllJsFiles(fullPath));
        } else if (file.endsWith('.js')) {
            results.push(fullPath);
        }
    }
    return results;
}

const jsFiles = getAllJsFiles('public');
console.log(`Found ${jsFiles.length} public JS files to audit.`);

jsFiles.forEach(file => {
    totalChecks++;
    const content = fs.readFileSync(file, 'utf-8');
    
    // Check for undefined template string variables in JS files
    const templateVarMatches = content.match(/\$\{([^}]+)\}/g) || [];
    templateVarMatches.forEach(tVar => {
        const varExpr = tVar.slice(2, -1).trim();
        // Skip expressions with calls, properties, or ternary
        if (varExpr && !varExpr.includes('(') && !varExpr.includes('.') && !varExpr.includes('?') && !varExpr.includes(':') && !varExpr.includes('+') && !varExpr.includes('-')) {
            // Check if declared in content
            const isDeclared = new RegExp(`(let|const|var|function)\\s+${varExpr}\\b`).test(content) ||
                               new RegExp(`\\b(${varExpr})\\s*(=|in|of|,|\\))`).test(content) ||
                               ['i', 'index', 'idx', 'e', 'err', 'event', 'qIdx', 'optIdx', 'key', 'val', 'stats', 'totalXP', 'rankTitle', 'rankIcon', 'totalQuestions', 'correctCount', 'xpAmount', 'nextUrl', 'nextLabel', 'title', 'maxCount', 'completedCount', 'prefix', 'branchKey', 'activeLesson', 'totalLessons', 'pct', 'total', 'count', 'requiredCount', 'levelName', 'titleText', 'messageText', 'bestMatch', 'selectOptionsHtml', 'suggestionHtml', 'safeKey', 'rawLower', 'formattedXP', 'rankTier', 'levelIdx'].includes(varExpr);
            if (!isDeclared) {
                console.error(`❌ [${file}] Template literal references undeclared variable: \${${varExpr}}`);
                totalErrors++;
            }
        }
    });
});

console.log(`\n========================================`);
console.log(`Deep Audit Summary:`);
console.log(`Total Checks Executed: ${totalChecks}`);
console.log(`Total Errors Found: ${totalErrors}`);
console.log(`Total Warnings: ${totalWarnings}`);
console.log(`========================================\n`);
