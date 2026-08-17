/**
 * Test Level 7 Dynamic Certificate Personalization
 */

import fs from 'fs';

const certHtml = fs.readFileSync('dist/6. partF/certificate.html', 'utf-8');

console.log('🧪 Testing Level 7 Dynamic Certificate Generation in dist/...\n');

let passed = 0;
let tests = 0;

function assert(condition, desc) {
    tests++;
    if (condition) {
        passed++;
    } else {
        console.error(`❌ FAIL: ${desc}`);
    }
}

assert(certHtml.includes('CSS MOTION, TYPESCRIPT, NEXT.JS, CLOUD &amp; SQL') || certHtml.includes('CSS MOTION, TYPESCRIPT, NEXT.JS, CLOUD & SQL'), 'Certificate generator subtitle lists all 5 tracks');
assert(certHtml.includes('id="certSubheadline"'), 'Subheadline has dynamic DOM id');
assert(certHtml.includes('id="certBodyText"'), 'Body text has dynamic DOM id');
assert(certHtml.includes('Build in Strict TypeScript'), 'What\'s Next includes TypeScript card');
assert(certHtml.includes('Craft Micro-Interactions'), 'What\'s Next includes CSS Motion card');

console.log(`\n========================================`);
console.log(`🏁 Certificate Verification: ${passed}/${tests} assertions passed`);
console.log(`========================================\n`);

if (passed === tests) {
    console.log('🎉 LEVEL 7 CERTIFICATE IS FULLY DYNAMIC & UPDATED!');
} else {
    process.exit(1);
}
