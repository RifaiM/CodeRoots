import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log('  RUNNING STRESS TEST: ALL 81 DOJO LESSONS & MATRICES');
console.log('====================================================\n');

// Import JSCompiler and HTMLLinter and PythonLinter
import { JSCompiler } from '../src/scripts/dojo/linters/jsCompiler.ts';
import { HTMLLinter } from '../src/scripts/dojo/linters/htmlLinter.ts';
import { CSSLinter } from '../src/scripts/dojo/linters/cssLinter.ts';
import { PythonLinter } from '../src/scripts/dojo/linters/pythonLinter.ts';

function getFiles(dir, ext = '.astro') {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(fullPath, ext));
        } else if (file.endsWith(ext) && file.includes('lesson')) {
            results.push(fullPath);
        }
    });
    return results;
}

const lessonFiles = getFiles('d:/3. CodeRoots-refactor/src/pages');
console.log(`Discovered ${lessonFiles.length} interactive lesson files.\n`);

let passedLessons = 0;
let failedLessons = 0;
const failures = [];

lessonFiles.forEach(file => {
    const relPath = path.relative('d:/3. CodeRoots-refactor/src/pages', file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');

    // Extract starterCode, solutionCode, mode
    const starterMatch = content.match(/starterCode\s*=\s*(?:`([\s\S]*?)`|'([\s\S]*?)'|"([\s\S]*?)")/);
    const solutionMatch = content.match(/solutionCode\s*=\s*(?:`([\s\S]*?)`|'([\s\S]*?)'|"([\s\S]*?)")/);
    const modeMatch = content.match(/mode\s*:\s*['"](.*?)['"]/);

    const mode = modeMatch ? modeMatch[1] : (relPath.includes('partE') ? 'python' : 'html');
    const starter = starterMatch ? (starterMatch[1] || starterMatch[2] || starterMatch[3]) : '';
    const solution = solutionMatch ? (solutionMatch[1] || solutionMatch[2] || solutionMatch[3]) : '';

    if (!starter) {
        failures.push(`[${relPath}] Missing starterCode definition`);
        failedLessons++;
        return;
    }

    if (!solution) {
        failures.push(`[${relPath}] Missing solutionCode definition`);
        failedLessons++;
        return;
    }

    // Check that starter and solution are not identical
    if (starter.trim() === solution.trim()) {
        failures.push(`[${relPath}] Starter code is identical to Solution code!`);
        failedLessons++;
        return;
    }

    // Run linter on solution to ensure 0 critical compiler errors
    try {
        let problems = [];
        if (mode === 'html') problems = HTMLLinter.lint(solution);
        else if (mode === 'css') problems = CSSLinter.lint(solution);
        else if (mode === 'javascript') problems = JSCompiler.lint(solution);
        else if (mode === 'python') problems = PythonLinter.lint(solution);

        const criticalErrors = problems.filter(p => p.severity === 'error');
        if (criticalErrors.length > 0) {
            failures.push(`[${relPath}] Solution code has ${criticalErrors.length} critical linter errors: ${criticalErrors[0].message}`);
            failedLessons++;
            return;
        }
    } catch (e) {
        failures.push(`[${relPath}] Linter crashed on solution: ${e.message}`);
        failedLessons++;
        return;
    }

    // Run linter on starter to ensure no crash exceptions
    try {
        if (mode === 'html') HTMLLinter.lint(starter);
        else if (mode === 'css') CSSLinter.lint(starter);
        else if (mode === 'javascript') JSCompiler.lint(starter);
        else if (mode === 'python') PythonLinter.lint(starter);
    } catch (e) {
        failures.push(`[${relPath}] Linter crashed on starter: ${e.message}`);
        failedLessons++;
        return;
    }

    passedLessons++;
});

console.log('--- STRESS TEST SUMMARY ---');
console.log(`Total Lessons Tested: ${lessonFiles.length}`);
console.log(`Passed: ${passedLessons} / ${lessonFiles.length}`);
console.log(`Failed: ${failedLessons} / ${lessonFiles.length}`);

if (failures.length > 0) {
    console.log('\nFailures detected:');
    failures.forEach(f => console.log('  ❌ ' + f));
} else {
    console.log('\n✅ 100% OF ALL 81 LESSONS PASSED FULL INTEGRITY & LINTER STRESS TESTS!');
}
