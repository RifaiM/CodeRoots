/**
 * Phase 1: Track 7D (TypeScript) & Track 7E (CSS Motion) Deep Quality & Flow Audit
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

    assert(fs.existsSync(srcFile), `Track 7D Lesson ${i} source file exists`);

    const content = fs.readFileSync(srcFile, 'utf-8');

    // Layout Props
    assert(content.includes(`lessonNum={${i}}`), `Lesson ${i} has correct lessonNum prop`);
    assert(content.includes('trackPrefix="partF_branchD"'), `Lesson ${i} has trackPrefix="partF_branchD"`);
    assert(content.includes(`completionKey="partF_branchD_lesson${i}_complete"`), `Lesson ${i} has correct completionKey`);
    assert(content.includes('xpAmount={150}'), `Lesson ${i} awards 150 XP`);
    assert(content.includes('hubUrl="/6. partF/hub.html"'), `Lesson ${i} has hubUrl`);
    assert(content.includes('certificateUrl="/6. partF/certificate.html"'), `Lesson ${i} has certificateUrl`);

    // Next Lesson Navigation
    if (i < 12) {
        assert(content.includes(`nextLessonUrl="/6. partF/branchD/lesson${i + 1}_remake.html"`), `Lesson ${i} nextLessonUrl points to Lesson ${i + 1}`);
    } else {
        assert(content.includes('nextLessonUrl="/6. partF/certificate.html"'), `Lesson 12 nextLessonUrl points to Certificate`);
    }

    // 5-Pillar Standard Content
    assert(content.includes('class="concept-card mission-card"'), `Lesson ${i} has Progate-style Mission Card`);
    assert(content.includes('id="checklistCounter"'), `Lesson ${i} has Checklist Counter`);
    assert(content.includes('id="taskChecklist"'), `Lesson ${i} has Task Checklist container`);
    assert(content.includes('The Real-World JavaScript Problem'), `Lesson ${i} has The Real-World JavaScript Problem section`);
    assert(content.includes('Core Architecture &amp; Mental Model') || content.includes('Core Architecture & Mental Model'), `Lesson ${i} has Mental Model Analogy`);
    assert(content.includes('Syntax &amp; Anatomy Breakdown') || content.includes('Syntax & Anatomy Breakdown'), `Lesson ${i} has Syntax Anatomy Breakdown`);
    assert(content.includes('The VS Code Beginner Trap') || content.includes('Beginner Trap'), `Lesson ${i} has Beginner Trap section`);
    assert(content.includes('Reference Pattern'), `Lesson ${i} has Reference Pattern section`);

    // Interactive Engine & Drafts
    assert(content.includes(`novicodes_draft_partF_branchD_lesson${i}`), `Lesson ${i} uses correct draft storage key`);
    assert(content.includes('checkAnswerBtn'), `Lesson ${i} has Check Answer button binding`);
    assert(content.includes('resetEditorBtn'), `Lesson ${i} has Reset Editor button binding`);

    // No Capstone Jargon
    assert(!content.includes('CAPSTONE PROJECT'), `Lesson ${i} is free of 'CAPSTONE PROJECT' jargon`);
    assert(!content.includes('Level 7D Capstone'), `Lesson ${i} is free of 'Level 7D Capstone' jargon`);
}

// ----------------------------------------------------
// 2. TRACK 7E: CSS Motion & Micro-Interactions (10 Lessons)
// ----------------------------------------------------
console.log('\n--- Testing Track 7E (CSS Motion - 10 Lessons) ---');

for (let i = 1; i <= 10; i++) {
    const srcFile = `src/pages/6. partF/branchE/lesson${i}_remake.astro`;

    assert(fs.existsSync(srcFile), `Track 7E Lesson ${i} source file exists`);

    const content = fs.readFileSync(srcFile, 'utf-8');

    // Layout Props
    assert(content.includes(`lessonNum={${i}}`), `Lesson ${i} has correct lessonNum prop`);
    assert(content.includes('trackPrefix="partF_branchE"'), `Lesson ${i} has trackPrefix="partF_branchE"`);
    assert(content.includes(`completionKey="partF_branchE_lesson${i}_complete"`), `Lesson ${i} has correct completionKey`);
    assert(content.includes('xpAmount={150}'), `Lesson ${i} awards 150 XP`);
    assert(content.includes('hubUrl="/6. partF/hub.html"'), `Lesson ${i} has hubUrl`);
    assert(content.includes('certificateUrl="/6. partF/certificate.html"'), `Lesson ${i} has certificateUrl`);
    assert(content.includes('mode="html"'), `Lesson ${i} has mode="html" for live preview`);

    // Next Lesson Navigation
    if (i < 10) {
        assert(content.includes(`nextLessonUrl="/6. partF/branchE/lesson${i + 1}_remake.html"`), `Lesson ${i} nextLessonUrl points to Lesson ${i + 1}`);
    } else {
        assert(content.includes('nextLessonUrl="/6. partF/certificate.html"'), `Lesson 10 nextLessonUrl points to Certificate`);
    }

    // 5-Pillar Standard Content
    assert(content.includes('class="concept-card mission-card"'), `Lesson ${i} has Progate-style Mission Card`);
    assert(content.includes('id="checklistCounter"'), `Lesson ${i} has Checklist Counter`);
    assert(content.includes('id="taskChecklist"'), `Lesson ${i} has Task Checklist container`);
    assert(content.includes('The Real-World Problem') || content.includes('The Real-World CSS Problem'), `Lesson ${i} has Problem Statement`);
    assert(content.includes('Core Architecture &amp; Mental Model') || content.includes('Core Architecture'), `Lesson ${i} has Mental Model Analogy`);
    assert(content.includes('Syntax &amp; Anatomy Breakdown') || content.includes('Syntax & Anatomy Breakdown'), `Lesson ${i} has Syntax Anatomy Breakdown`);
    assert(content.includes('Beginner Trap'), `Lesson ${i} has Beginner Trap warning`);
    assert(content.includes('Reference Pattern'), `Lesson ${i} has Reference Pattern section`);

    // Live preview & draft integration
    assert(content.includes(`novicodes_draft_partF_branchE_lesson${i}`), `Lesson ${i} uses correct draft storage key`);

    // No Capstone Jargon
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
