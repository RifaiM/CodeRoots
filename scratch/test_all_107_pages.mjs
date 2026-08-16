import fs from 'fs';
import path from 'path';

console.log('🚀 Running Exhaustive Test across ALL 107 Web Pages in dist/ & src/...\n');

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
    if (condition) {
        passedTests++;
    } else {
        failedTests++;
        console.error(`❌ FAIL: ${message}`);
    }
}

// 1. Check all built HTML files in dist/
function getAllDistHtml(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllDistHtml(fullPath));
        } else if (file.endsWith('.html')) {
            results.push(fullPath);
        }
    }
    return results;
}

const htmlFiles = getAllDistHtml('dist');
console.log(`Found ${htmlFiles.length} built HTML pages in dist/ to test.`);

assert(htmlFiles.length >= 107, `Expected at least 107 built pages, found ${htmlFiles.length}`);

// 2. Validate Every HTML Page
htmlFiles.forEach(file => {
    const rel = path.relative('dist', file).replace(/\\/g, '/');
    const html = fs.readFileSync(file, 'utf-8');

    // Test A: DOCTYPE and HTML structure
    assert(html.includes('<!DOCTYPE html>') || html.includes('<!doctype html>'), `[${rel}] Missing <!DOCTYPE html>`);
    assert(html.includes('<html'), `[${rel}] Missing <html> tag`);
    assert(html.includes('</html>'), `[${rel}] Missing </html> closing tag`);
    assert(html.includes('<head>') || html.includes('<head '), `[${rel}] Missing <head> tag`);
    assert(html.includes('</head>'), `[${rel}] Missing </head> tag`);
    assert(html.includes('<body'), `[${rel}] Missing <body> tag`);
    assert(html.includes('</body>'), `[${rel}] Missing </body> tag`);

    // Test B: Title tag presence
    assert(html.includes('<title>') && html.includes('</title>'), `[${rel}] Missing valid <title> tag`);

    // Test C: Meta viewport
    assert(html.includes('name="viewport"') || html.includes("name='viewport'"), `[${rel}] Missing viewport meta tag`);

    // Test D: No raw unrendered template placeholders like '[object Object]' or 'undefined' in titles
    assert(!html.includes('<title>undefined</title>'), `[${rel}] Title is undefined`);
    assert(!html.includes('[object Object]'), `[${rel}] Unrendered [object Object] found`);

    // Test E: If it's a Certificate page, check generator buttons
    if (rel.includes('certificate.html')) {
        assert(html.includes('id="generateCertBtn"'), `[${rel}] Missing #generateCertBtn`);
        assert(html.includes('id="downloadCertBtn"'), `[${rel}] Missing #downloadCertBtn`);
        assert(html.includes('id="printCertBtn"'), `[${rel}] Missing #printCertBtn`);
        assert(html.includes('id="certRecipientName"'), `[${rel}] Missing #certRecipientName`);
        assert(html.includes('id="certIssueDate"'), `[${rel}] Missing #certIssueDate`);
    }

    // Test F: If it's a Hub page, check hero buttons and progress
    if (rel.includes('hub.html')) {
        assert(html.includes('hero-title') || html.includes('hub-hero') || html.includes('hero-header') || html.includes('hub-title'), `[${rel}] Missing hero section`);
        assert(html.includes('typewriter') || html.includes('data-phrases'), `[${rel}] Missing typewriter on hub`);
    }

    // Test G: If it's foundations.html, check tab buttons and quiz submit button
    if (rel === 'foundations.html') {
        assert(html.includes('id="submitQuizBtn"'), `[${rel}] Missing #submitQuizBtn on foundations page`);
        assert(html.includes('id="heroAnalogyBox"'), `[${rel}] Missing #heroAnalogyBox`);
        assert(html.includes('id="glossaryCardsContainer"'), `[${rel}] Missing #glossaryCardsContainer`);
        assert(html.includes('id="sandboxPreviewIframe"'), `[${rel}] Missing #sandboxPreviewIframe`);
        assert(html.includes('id="quizQuestionsContainer"'), `[${rel}] Missing #quizQuestionsContainer`);
    }

    // Test H: If it's a Lesson page, check editor and checklist
    if (rel.includes('lesson') && rel.includes('_remake.html')) {
        assert(html.includes('ide-container') || html.includes('dojo-workspace') || html.includes('code-editor-wrap') || html.includes('editor'), `[${rel}] Missing code workspace`);
        assert(html.includes('checkAnswerBtn') || html.includes('checkBtn') || html.includes('verify-code-btn') || html.includes('check-btn'), `[${rel}] Missing check/verify button`);
        assert(html.includes('nextLessonBtn') || html.includes('next-action-btn') || html.includes('next-lesson-btn'), `[${rel}] Missing next lesson button`);
    }
});

// 3. Test All 11 Foundations Data Modules
console.log('\nTesting all 11 Foundations Data Modules...');
const dataFiles = fs.readdirSync('public/data').filter(f => f.startsWith('level'));
assert(dataFiles.length === 11, `Expected 11 foundation data modules, found ${dataFiles.length}`);

dataFiles.forEach(df => {
    const filePath = path.join('public/data', df);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Evaluate in sandbox
    const sandbox = { window: {} };
    try {
        new Function('window', content)(sandbox.window);
        const dataKey = Object.keys(sandbox.window)[0];
        const data = sandbox.window[dataKey];

        assert(data && typeof data === 'object', `[${df}] Failed to export data object to window`);
        assert(data.title && data.title.length > 5, `[${df}] Missing valid title`);
        assert(data.subtitle && data.subtitle.length > 5, `[${df}] Missing valid subtitle`);
        assert(typeof data.xpReward === 'number' && data.xpReward > 0, `[${df}] Invalid or missing xpReward`);
        assert(data.trackKey && data.trackKey.length > 0, `[${df}] Missing trackKey`);
        assert(data.nextTrackUrl && data.nextTrackUrl.length > 0, `[${df}] Missing nextTrackUrl`);
        assert(data.nextTrackName && data.nextTrackName.length > 0, `[${df}] Missing nextTrackName`);
        assert(data.concepts && Array.isArray(data.concepts.sections), `[${df}] Missing concept sections`);
        assert(Array.isArray(data.glossary) && data.glossary.length >= 4, `[${df}] Missing glossary terms`);
        assert(data.sandbox && data.sandbox.initialHTML, `[${df}] Missing sandbox initialHTML`);
        assert(Array.isArray(data.quizzes) && data.quizzes.length === 3, `[${df}] Expected exactly 3 quiz questions, found ${data.quizzes ? data.quizzes.length : 0}`);

        // Verify every quiz question has valid correctIndex
        data.quizzes.forEach((q, idx) => {
            assert(q.id && q.question, `[${df}] Quiz Q#${idx + 1} missing id or question text`);
            assert(Array.isArray(q.options) && q.options.length >= 3, `[${df}] Quiz Q#${idx + 1} has less than 3 options`);
            assert(typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < q.options.length, `[${df}] Quiz Q#${idx + 1} correctIndex out of bounds`);
            assert(q.explanation && q.explanation.length > 10, `[${df}] Quiz Q#${idx + 1} missing explanation`);
        });

    } catch (e) {
        assert(false, `[${df}] Threw error during execution: ${e.message}`);
    }
});

console.log(`\n========================================`);
console.log(`🏆 ALL 107 PAGES & 11 DATA MODULES TEST SUMMARY:`);
console.log(`Passed Assertions: ${passedTests}`);
console.log(`Failed Assertions: ${failedTests}`);
console.log(`========================================\n`);

if (failedTests === 0) {
    console.log('🎉 100% CLEAN! Zero errors across all 107 web pages!');
} else {
    process.exit(1);
}
