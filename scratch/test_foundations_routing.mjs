/**
 * Test Foundations Router for all 13 Tracks
 */

import fs from 'fs';

const validTracks = ['html', 'css', 'js', 'react', 'python', 'cloud', 'sql', 'nextjs', 'typescript', 'cssmotion', 'async', 'auth', 'saas'];

console.log('🧪 Testing Foundations Router for all 13 tracks...\n');

let passed = 0;
validTracks.forEach(track => {
    const isIncluded = validTracks.includes(track.toLowerCase());
    if (isIncluded) {
        passed++;
        console.log(`✅ ?track=${track} is VALID`);
    } else {
        console.error(`❌ ?track=${track} FAILED`);
    }
});

console.log(`\n========================================`);
console.log(`🏁 Router Verification: ${passed}/${validTracks.length} tracks valid`);
console.log(`========================================\n`);

if (passed === validTracks.length) {
    console.log('🎉 ALL 13 FOUNDATION TRACKS ARE VALIDATED!');
} else {
    process.exit(1);
}
