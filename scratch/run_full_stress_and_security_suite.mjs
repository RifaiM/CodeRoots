/**
 * Ultimate Master Platform Stress & Security Verification Runner
 * Runs:
 * - Phase 1: Track 7D & 7E Deep Verification (452 assertions)
 * - Phase 2: Link & Routing Crawler (4,381 links across 129 HTML pages)
 * - Phase 3: Gamification & XP Calculation Stress Engine (20 assertions & 100 DevKit cycles)
 * - Phase 4: Security & Injection Vulnerability Audit (729 checks)
 * - Master Suite: 129 Page DOM Validation & 13 Foundations Data Modules (2,085 assertions)
 */

import { execSync } from 'child_process';

console.log('🚀 ================================================================');
console.log('👑 NOVICODES FULL PLATFORM STRESS, EDGE-CASE & SECURITY AUDIT');
console.log('================================================================\n');

const suites = [
    { name: 'Phase 1: Track 7D & 7E Deep Verification', script: 'scratch/test_phase1_tracks7d_7e_deep.mjs' },
    { name: 'Phase 2: Platform Link & Routing Crawler', script: 'scratch/test_phase2_all_links_and_routing.mjs' },
    { name: 'Phase 3: Gamification & XP Stress Engine', script: 'scratch/test_phase3_gamification_and_edgecases.mjs' },
    { name: 'Phase 4: Security & Injection Vulnerability Audit', script: 'scratch/test_phase4_security_audit.mjs' },
    { name: 'Master Suite: 129 Pages DOM & 13 Data Modules', script: 'scratch/test_all_107_pages.mjs' }
];

let totalPassed = 0;

suites.forEach(suite => {
    console.log(`▶ Running ${suite.name}...`);
    try {
        const output = execSync(`node ${suite.script}`, { encoding: 'utf-8' });
        console.log(output);
        console.log(`✅ ${suite.name} PASSED!\n----------------------------------------------------------------\n`);
    } catch (err) {
        console.error(`❌ ${suite.name} FAILED!`);
        console.error(err.stdout || err.message);
        process.exit(1);
    }
});

console.log('🎉 ================================================================');
console.log('🏆 ALL 5 COMPREHENSIVE PLATFORM AUDIT SUITES PASSED WITH 0 ERRORS!');
console.log('================================================================\n');
