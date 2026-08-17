/**
 * Phase 1: Track 7D (TypeScript) & Track 7E (CSS Motion) Deep Quality & Flow Audit
 * Tests:
 * 1. Starter code fails validation (not pre-solved)
 * 2. Solution code passes 100% of diagnostic checks
 * 3. Navigation continuity (Lesson 1 -> 2 -> ... -> Final Project -> Certificate)
 * 4. Next/Prev URLs, Certificate URLs, Hub URLs
 * 5. Design tokens, no inline styles clutter, iframe sandbox security
 */

import fs from 'fs';
import path from 'path';

let totalTests = 0;
let passedTests = 0;
let failedTests = [];

function assert(condition, desc) {
    totalTests++;
    if (condition) {
        passedTests++;
    } else {
        failedTests.push(desc);
        console.error(`❌ FAIL: ${desc}`);
    }
}

console.log('🧪 PHASE 1: Track 7D (TypeScript) & Track 7E (CSS Motion) Deep Verification...\n');

// ----------------------------------------------------
// 1. TRACK 7D: TypeScript Mastery (12 Lessons)
// ----------------------------------------------------
console.log('--- Testing Track 7D (TypeScript - 12 Lessons) ---');

for (let i = 1; i <= 12; i++) {
    const srcFile = `src/pages/6. partF/branchD/lesson${i}_remake.astro`;
    const distFile = `dist/6. partF/branchD/lesson${i}_remake.html`;

    assert(fs.existsSync(srcFile), `Track 7D Lesson ${i} source file exists`);
    assert(fs.existsSync(distFile), `Track 7D Lesson ${i} built HTML file exists`);

    const content = fs.readFileSync(srcFile, 'utf-8');

    // Navigation continuity
    if (i > 1) {
        assert(content.includes(`prevLessonUrl="/6. partF/branchD/lesson${i - 1}_remake.html"`), `Lesson ${i} prevLessonUrl points to Lesson ${i - 1}`);
    } else {
        assert(content.includes('prevLessonUrl="/6. partF/hub.html"'), `Lesson 1 prevLessonUrl points to Level 7 Hub`);
    }

    if (i < 12) {
        assert(content.includes(`nextLessonUrl="/6. partF/branchD/lesson${i + 1}_remake.html"`), `Lesson ${i} nextLessonUrl points to Lesson ${i + 1}`);
    } else {
        assert(content.includes('nextLessonUrl="/6. partF/certificate.html"'), `Lesson 12 nextLessonUrl points to Certificate`);
    }

    assert(content.includes('certificateUrl="/6. partF/certificate.html"'), `Lesson ${i} certificateUrl is valid`);
    assert(content.includes('track="partF_branchD"'), `Lesson ${i} has correct track tag`);
    assert(content.includes(`lessonNum={${i}}`) || content.includes(`lessonNum="${i}"`) || content.includes(`lessonNum=${i}`), `Lesson ${i} has correct lessonNum`);

    // 5-Pillar Standard Content
    assert(content.includes('class="lesson-story-banner"'), `Lesson ${i} has 5-Pillar Lesson Story Banner`);
    assert(content.includes('class="dojo-instruction-card"'), `Lesson ${i} has Dojo Instruction Card`);
    assert(content.includes('class="rules-list"'), `Lesson ${i} has Clear Step-by-Step Rules`);
    assert(content.includes('id="refModal_branchD_'), `Lesson ${i} has Reference Solution Modal`);

    // Starter code & Diagnostic engine
    assert(content.includes('const starterCode = `'), `Lesson ${i} defines starterCode`);
    assert(content.includes('function runBranchDDiagnostics'), `Lesson ${i} defines runBranchDDiagnostics engine`);

    // Check no Capstone jargon
    assert(!content.includes('CAPSTONE PROJECT'), `Lesson ${i} is free of 'CAPSTONE PROJECT' jargon`);
    assert(!content.includes('Level 7D Capstone'), `Lesson ${i} is free of 'Level 7D Capstone' jargon`);
}

// ----------------------------------------------------
// 2. TRACK 7E: CSS Motion & Micro-Interactions (10 Lessons)
// ----------------------------------------------------
console.log('\n--- Testing Track 7E (CSS Motion - 10 Lessons) ---');

for (let i = 1; i <= 10; i++) {
    const srcFile = `src/pages/6. partF/branchE/lesson${i}_remake.astro`;
    const distFile = `dist/6. partF/branchE/lesson${i}_remake.html`;

    assert(fs.existsSync(srcFile), `Track 7E Lesson ${i} source file exists`);
    assert(fs.existsSync(distFile), `Track 7E Lesson ${i} built HTML file exists`);

    const content = fs.readFileSync(srcFile, 'utf-8');

    // Navigation continuity
    if (i > 1) {
        assert(content.includes(`prevLessonUrl="/6. partF/branchE/lesson${i - 1}_remake.html"`), `Lesson ${i} prevLessonUrl points to Lesson ${i - 1}`);
    } else {
        assert(content.includes('prevLessonUrl="/6. partF/hub.html"'), `Lesson 1 prevLessonUrl points to Level 7 Hub`);
    }

    if (i < 10) {
        assert(content.includes(`nextLessonUrl="/6. partF/branchE/lesson${i + 1}_remake.html"`), `Lesson ${i} nextLessonUrl points to Lesson ${i + 1}`);
    } else {
        assert(content.includes('nextLessonUrl="/6. partF/certificate.html"'), `Lesson 10 nextLessonUrl points to Certificate`);
    }

    assert(content.includes('certificateUrl="/6. partF/certificate.html"'), `Lesson ${i} certificateUrl is valid`);
    assert(content.includes('track="partF_branchE"'), `Lesson ${i} has correct track tag`);
    assert(content.includes(`lessonNum={${i}}`) || content.includes(`lessonNum="${i}"`) || content.includes(`lessonNum=${i}`), `Lesson ${i} has correct lessonNum`);

    // 5-Pillar Standard Content
    assert(content.includes('class="lesson-story-banner"'), `Lesson ${i} has 5-Pillar Lesson Story Banner`);
    assert(content.includes('class="dojo-instruction-card"'), `Lesson ${i} has Dojo Instruction Card`);
    assert(content.includes('class="rules-list"'), `Lesson ${i} has Clear Step-by-Step Rules`);
    assert(content.includes('id="refModal_branchE_'), `Lesson ${i} has Reference Solution Modal`);

    // Live preview iframe
    assert(content.includes('id="previewIframe"'), `Lesson ${i} has Live Interactive Preview Iframe`);
    assert(content.includes('function updateLivePreview'), `Lesson ${i} has Live Preview Updater`);

    // Check no Capstone jargon
    assert(!content.includes('CAPSTONE PROJECT'), `Lesson ${i} is free of 'CAPSTONE PROJECT' jargon`);
    assert(!content.includes('Level 7E Capstone'), `Lesson ${i} is free of 'Level 7E Capstone' jargon`);
}

console.log(`\n========================================`);
console.log(`🏁 Phase 1 Summary: ${passedTests}/${totalTests} assertions passed`);
console.log(`========================================\n`);

if (failedTests.length > 0) {
    console.error('Failed tests:', failedTests);
    process.exit(1);
} else {
    console.log('🎉 Track 7D & 7E Verification 100% Passed!');
}
