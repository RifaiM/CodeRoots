/**
 * Diagnostic Test Suite for Level 7 Track E: CSS Animations & Micro-Interactions
 * Tests all 10 lesson starter templates and reference solutions against their real-time checklist rules.
 */

import fs from 'fs';
import path from 'path';

const solutions = [
    // Lesson 1: Transitions 101 & Easing
    `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    background: #0f172a;
    margin: 0;
  }
  .btn {
    background-color: #2563eb;
    color: #ffffff;
    padding: 12px 26px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.25s ease, transform 0.25s ease;
  }
  .btn:hover {
    background-color: #1d4ed8;
    transform: scale(1.06);
  }
</style>
<button class="btn">Launch Rocket 🚀</button>`,

    // Lesson 2: GPU 2D Transforms
    `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 220px;
    background: #0f172a;
    margin: 0;
  }
  .feature-card {
    width: 260px;
    padding: 22px;
    background: #1e293b;
    color: #f8fafc;
    border-radius: 12px;
    border: 1px solid #334155;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .feature-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 28px rgba(0, 0, 0, 0.4);
  }
</style>
<div class="feature-card">
  <h3 style="margin: 0 0 8px 0; color: #38bdf8;">GPU Accelerated</h3>
  <p style="margin: 0; color: #94a3b8; font-size: 0.9rem;">60 FPS elevation with zero layout reflow jank!</p>
</div>`,

    // Lesson 3: CSS Keyframes (@keyframes)
    `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 180px;
    background: #0f172a;
    color: #f8fafc;
    margin: 0;
  }
  @keyframes pulseDot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.3); opacity: 0.5; }
  }
  .pulse-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #1e293b;
    padding: 10px 18px;
    border-radius: 999px;
    border: 1px solid #334155;
    font-weight: 700;
  }
  .dot {
    width: 12px;
    height: 12px;
    background-color: #10b981;
    border-radius: 50%;
    animation: pulseDot 1.8s infinite ease-in-out;
  }
</style>
<div class="pulse-badge">
  <div class="dot"></div>
  <span>Live Cloud Cluster</span>
</div>`,

    // Lesson 4: Cubic-Bézier Spring Physics
    `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    background: #0f172a;
    margin: 0;
  }
  .spring-btn {
    background: linear-gradient(135deg, #f43f5e, #e11d48);
    color: #ffffff;
    padding: 14px 28px;
    border: none;
    border-radius: 12px;
    font-size: 1.05rem;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(244, 63, 94, 0.3);
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .spring-btn:hover {
    transform: scale(1.12);
  }
</style>
<button class="spring-btn">Interactive Spring Button ⚡</button>`,

    // Lesson 5: Tactile Hover & Active Micro-Interactions
    `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    background: #0f172a;
    margin: 0;
  }
  .tactile-switch {
    background-color: #6366f1;
    color: #ffffff;
    padding: 14px 28px;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 4px 0 #4338ca;
    transition: transform 0.1s ease, box-shadow 0.1s ease;
  }
  .tactile-switch:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 0 #4338ca;
  }
  .tactile-switch:active {
    transform: translateY(3px);
    box-shadow: 0 1px 0 #4338ca;
  }
</style>
<button class="tactile-switch">Mechanical Switch Click</button>`,

    // Lesson 6: Animated Skeletons & Shimmer Waves
    `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 220px;
    background: #0f172a;
    margin: 0;
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .skeleton-card {
    width: 280px;
    background: #0b1329;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #1e293b;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .skeleton-item {
    border-radius: 6px;
    background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);
    background-size: 200% 100%;
    animation: shimmer 1.6s infinite linear;
  }
</style>
<div class="skeleton-card">
  <div class="skeleton-item" style="height: 100px; width: 100%;"></div>
  <div class="skeleton-item" style="height: 20px; width: 80%;"></div>
  <div class="skeleton-item" style="height: 20px; width: 50%;"></div>
</div>`,

    // Lesson 7: Staggered Entrance Cascades
    `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 240px;
    background: #0f172a;
    margin: 0;
  }
  @keyframes slideFadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .feed-container {
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .feed-card {
    background: #1e293b;
    color: #f8fafc;
    padding: 14px 18px;
    border-radius: 10px;
    border: 1px solid #334155;
    font-size: 0.9rem;
    font-weight: 600;
    animation: slideFadeUp 0.5s ease-out both;
  }
  .feed-card:nth-child(2) {
    animation-delay: 0.1s;
  }
  .feed-card:nth-child(3) {
    animation-delay: 0.2s;
  }
</style>
<div class="feed-container">
  <div class="feed-card">⚡ Project deployed to Vercel</div>
  <div class="feed-card">📦 Database backup completed</div>
  <div class="feed-card">🛡️ SSL certificate auto-renewed</div>
</div>`,

    // Lesson 8: SVG Path Drawing Animations
    `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    background: #0f172a;
    margin: 0;
  }
  @keyframes drawCheck {
    to { stroke-dashoffset: 0; }
  }
  .check-svg {
    filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.4));
  }
  .check-path {
    stroke-dasharray: 60;
    stroke-dashoffset: 60;
    animation: drawCheck 0.8s ease-out forwards;
  }
</style>
<svg class="check-svg" width="90" height="90" viewBox="0 0 50 50">
  <circle cx="25" cy="25" r="21" fill="none" stroke="#10b981" stroke-width="4" />
  <path class="check-path" d="M14 26 L22 34 L36 18" fill="none" stroke="#10b981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,

    // Lesson 9: prefers-reduced-motion Accessibility
    `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 220px;
    background: #0f172a;
    color: #f8fafc;
    margin: 0;
    gap: 16px;
  }
  @keyframes spinRing {
    100% { transform: rotate(360deg); }
  }
  .spinner {
    width: 44px;
    height: 44px;
    border: 4px solid #334155;
    border-top-color: #38bdf8;
    border-radius: 50%;
    animation: spinRing 1s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .spinner {
      animation-duration: 0.01ms !important;
    }
  }
</style>
<div class="spinner"></div>
<span style="font-size: 0.9rem; color: #94a3b8;">Processing secure payment...</span>`,

    // Lesson 10: Capstone: Production Motion UI Suite
    `<style>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 280px;
    background: #0f172a;
    margin: 0;
  }
  .pro-card {
    width: 290px;
    background: #1e293b;
    color: #f8fafc;
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #334155;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .pro-card:hover {
    transform: translateY(-8px);
    border-color: #f43f5e;
  }
  .pro-btn {
    width: 100%;
    margin-top: 16px;
    padding: 12px;
    background: linear-gradient(135deg, #f43f5e, #e11d48);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-weight: 800;
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .pro-btn:hover {
    transform: scale(1.04);
  }
  .pro-btn:active {
    transform: scale(0.96);
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
<div class="pro-card">
  <span style="background: #f43f5e; color: white; font-size: 0.72rem; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">Premium UI</span>
  <h3 style="margin: 10px 0 6px 0;">Motion Design Suite</h3>
  <p style="margin: 0; color: #94a3b8; font-size: 0.85rem;">Hardware accelerated, tactile micro-interactions, and accessible.</p>
  <button class="pro-btn">Upgrade Workspace 🚀</button>
</div>`
];

let totalTests = 0;
let passed = 0;

console.log('🧪 Testing Branch E (CSS Motion) Starter Codes & Checklists...\n');

for (let i = 1; i <= 10; i++) {
    const file = path.join('src/pages/6. partF/branchE', `lesson${i}_remake.astro`);
    const code = fs.readFileSync(file, 'utf-8');
    
    // Extract checklist tests
    const match = code.match(/DojoEngine\.initChecklist\(\[([\s\S]*?)\](?:,\s*\{[\s\S]*?\})?\);/);
    if (!match) {
        console.error(`❌ Lesson ${i}: Failed to find DojoEngine.initChecklist`);
        continue;
    }
    
    const checklistCode = `[${match[1]}]`;
    let checklist;
    try {
        checklist = eval(checklistCode);
    } catch (e) {
        console.error(`❌ Lesson ${i}: Failed to parse checklist: ${e.message}`);
        continue;
    }
    
    const sol = solutions[i - 1];
    let allPassed = true;
    checklist.forEach((item, idx) => {
        totalTests++;
        const testFn = item.fn || item.test;
        const res = testFn(sol);
        if (res) {
            passed++;
        } else {
            allPassed = false;
            console.error(`❌ Lesson ${i} Step ${idx + 1} (${item.id}) FAILED test on reference solution!`);
        }
    });

    if (allPassed) {
        console.log(`✅ Lesson ${i} (All ${checklist.length} checklist tests passed!)`);
    }
}

console.log(`\n========================================`);
console.log(`🏁 Branch E Solution Matrix Verification: ${passed}/${totalTests} tests passed`);
console.log(`========================================\n`);

if (passed === totalTests) {
    console.log('🎉 ALL 10 BRANCH E LESSONS & CHECKLIST TESTS ARE 100% OPERATIONAL!');
} else {
    process.exit(1);
}
