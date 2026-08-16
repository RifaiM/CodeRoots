import fs from 'fs';

// 1. Update public/scripts/dashboard.js
let dashJs = fs.readFileSync('public/scripts/dashboard.js', 'utf-8');

// Update typewriter phrases
const oldPhrases = `    const phrases = [
        'Doing, Not Just Watching',
        'Building 81 Real Projects',
        'Mastering React & Python',
        'Writing Real Code in Browser',
        'Shipping Fullstack SaaS Apps'
    ];`;

const newPhrases = `    const phrases = [
        'Doing, Not Just Watching',
        'Building 81 Real Projects',
        'Mastering React & JavaScript',
        'Writing Real Code in Browser',
        'Building Modern Web Interfaces'
    ];`;

dashJs = dashJs.replace(oldPhrases, newPhrases);

// Update Level 10 track card dynamic labels
dashJs = dashJs.replace(/'Level 10 Apex SaaS Capstone'/g, "'Level 10 SaaS Dashboard UI'");
dashJs = dashJs.replace(/'✅ Apex Capstone Completed'/g, "'✅ Level 10 Completed'");
dashJs = dashJs.replace(/🏆 Launch Apex Capstone/g, '🏆 Launch Level 10 Dojo');
dashJs = dashJs.replace(/🏆 Launch Level 10 SaaS Capstone ➔/g, '🏆 Launch Level 10 SaaS Dojo ➔');
dashJs = dashJs.replace(/Apex Capstone/g, 'Level 10 SaaS Dojo');

fs.writeFileSync('public/scripts/dashboard.js', dashJs, 'utf-8');
console.log('✅ Updated public/scripts/dashboard.js');


// 2. Update src/scripts/xpEngine.ts
let xpEngine = fs.readFileSync('src/scripts/xpEngine.ts', 'utf-8');
xpEngine = xpEngine.replace(
    "rankTitle = 'Grand Master Fullstack Engineer';",
    "rankTitle = 'Master Web Developer';"
);
xpEngine = xpEngine.replace(
    "rankTitle = 'Fullstack Specialist';",
    "rankTitle = 'Advanced Web Specialist';"
);
xpEngine = xpEngine.replace(
    "rankTitle = 'Python Backend Architect';",
    "rankTitle = 'Python Logic Master';"
);
fs.writeFileSync('src/scripts/xpEngine.ts', xpEngine, 'utf-8');
console.log('✅ Updated src/scripts/xpEngine.ts');


// 3. Update src/components/UserProfileModal.astro
let userModal = fs.readFileSync('src/components/UserProfileModal.astro', 'utf-8');
userModal = userModal.replace(
    "{ title: 'Grand Master Fullstack Engineer', icon: '👑', level: 'Level 10 • Complete App Capstone' }",
    "{ title: 'Master Web Developer', icon: '👑', level: 'Level 10 • SaaS Dashboard UI' }"
);
userModal = userModal.replace(
    "(r.title === 'Grand Master Fullstack Engineer' && ['Grand Master Fullstack Engineer', 'Apex SaaS Challenger'].includes(currentRankTitle))",
    "(r.title === 'Master Web Developer' && ['Master Web Developer', 'SaaS UI Architect'].includes(currentRankTitle))"
);
userModal = userModal.replace(
    "Level 10: Complete App Capstone",
    "Level 10: SaaS Dashboard UI"
);
userModal = userModal.replace(
    "const l10Item = renderCertItem('🎓 Level 10 Graduation Diploma', 'Complete Web App Capstone', '/9. partI/certificate.html', isL10Earned, stats.l10Completed || 0, 6, 'background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border: 1.5px solid #f59e0b;', 'color: #78350f;', '#b45309');",
    "const l10Item = renderCertItem('🏆 Level 10 Certificate', 'Modern SaaS Dashboard UI', '/9. partI/certificate.html', isL10Earned, stats.l10Completed || 0, 6, 'background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border: 1.5px solid #f59e0b;', 'color: #78350f;', '#b45309');"
);
userModal = userModal.replace(
    "const itemL10 = renderDojoHubItem(isL10, '🏆 Level 10: Complete Web App Capstone Dojo', `6 Milestones • Active Milestone ${activeL10}`, '/9. partI/hub.html', 'background: #fffbeb', '#f59e0b', '#78350f', 'background: #fffbeb', '#fde68a', '#b45309');",
    "const itemL10 = renderDojoHubItem(isL10, '🏆 Level 10: SaaS Dashboard UI Dojo', `6 Lessons • Active Lesson ${activeL10}`, '/9. partI/hub.html', 'background: #fffbeb', '#f59e0b', '#78350f', 'background: #fffbeb', '#fde68a', '#b45309');"
);
userModal = userModal.replace(
    "'Level 10 (Apex SaaS)': `${stats.l10Completed || 0}/6 Milestones`",
    "'Level 10 (SaaS Dashboard UI)': `${stats.l10Completed || 0}/6 Lessons`"
);
fs.writeFileSync('src/components/UserProfileModal.astro', userModal, 'utf-8');
console.log('✅ Updated src/components/UserProfileModal.astro');


// 4. Update src/pages/index.astro
let indexAstro = fs.readFileSync('src/pages/index.astro', 'utf-8');
indexAstro = indexAstro.replace(
    '<span class="track-level-badge" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; font-weight: 800; text-transform: uppercase;">🏆 LEVEL 10 APEX</span>\n                        <span class="track-status-icon ready" style="color: #b45309; font-weight: 800;">🎓 Graduation Capstone</span>',
    '<span class="track-level-badge" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; font-weight: 800; text-transform: uppercase;">🏆 LEVEL 10</span>\n                        <span class="track-status-icon ready" style="color: #b45309; font-weight: 800;">⚡ Final Level</span>'
);
indexAstro = indexAstro.replace(
    '<h3 class="card-title" style="color: #78350f;">Complete Web App Capstone</h3>\n                    <p class="card-desc" style="color: #475569;">\n                        Your graduation milestone! Put everything together to build a complete dashboard interface: sidebar navigation shell, fast search filters, monthly/annual pricing tables, and an AI helper panel.\n                    </p>',
    '<h3 class="card-title" style="color: #78350f;">SaaS Dashboard UI & Widgets</h3>\n                    <p class="card-desc" style="color: #475569;">\n                        Put your frontend skills together to build modern interactive interface widgets: modular sidebar shell, debounced search filters, subscription pricing cards, and an AI chat helper panel.\n                    </p>'
);
indexAstro = indexAstro.replace(
    '<span>🏆 Launch Level 10 Capstone</span>',
    '<span>🏆 Launch Level 10 Dojo ➔</span>'
);
indexAstro = indexAstro.replace(
    '<p>Complete any Level 4 through 10 track to generate your official, verifiable proof-of-work certificates and Graduation Diploma.</p>',
    '<p>Complete any Level 4 through 10 track to generate your official, verifiable proof-of-work certificates.</p>'
);
indexAstro = indexAstro.replace(
    'Everything from Level 0 Web Concepts to Level 10 SaaS Architecture is 100% free for all learners worldwide.',
    'Everything from Level 0 Web Concepts to Level 10 SaaS UI is 100% free for all learners worldwide.'
);
fs.writeFileSync('src/pages/index.astro', indexAstro, 'utf-8');
console.log('✅ Updated src/pages/index.astro');


// 5. Update src/pages/9. partI/hub.astro
let hubI = fs.readFileSync('src/pages/9. partI/hub.astro', 'utf-8');
hubI = hubI.replace('title="SaaS UI & Design Systems (Level 10) | NoviCodes"', 'title="Level 10: SaaS UI & Dashboard Components | NoviCodes"');
hubI = hubI.replace('tagText="Level 10 • SaaS UI Architecture"', 'tagText="Level 10 • SaaS Dashboard UI"');
hubI = hubI.replace('<span class="hub-badge">🏆 Level 10 • Complete Web App Capstone</span>', '<span class="hub-badge">🏆 Level 10 • SaaS Dashboard UI</span>');
hubI = hubI.replace('<h1>Build a Complete, Polished Dashboard Application</h1>', '<h1>Build Modern SaaS Dashboard Interfaces</h1>');
hubI = hubI.replace(
    '<p>\n                Your graduation milestone! Put everything together to build a complete dashboard interface: sidebar navigation shell, snappy search filters, an interactive pricing & upgrade table, and a smart AI helper panel.\n            </p>',
    '<p>\n                Put your interactive frontend skills together to build modern UI components: sidebar navigation shell, debounced search filters, interactive pricing tables, and an AI chat helper panel.\n            </p>'
);
hubI = hubI.replace('Apex Bounty', 'Level 10 Reward');
hubI = hubI.replace(/Milestones/g, 'Lessons');
hubI = hubI.replace(/Milestone/g, 'Lesson');
hubI = hubI.replace(/milestones/g, 'lessons');
hubI = hubI.replace(/milestone/g, 'lesson');
hubI = hubI.replace('Claim Master Diploma ➔', 'Claim Level 10 Certificate ➔');
hubI = hubI.replace('View & Download Diploma ➔', 'View & Download Certificate ➔');
fs.writeFileSync('src/pages/9. partI/hub.astro', hubI, 'utf-8');
console.log('✅ Updated src/pages/9. partI/hub.astro');


// 6. Update src/pages/9. partI/certificate.astro
let certI = fs.readFileSync('src/pages/9. partI/certificate.astro', 'utf-8');
certI = certI.replace('GRAND MASTER DIPLOMA', 'CERTIFICATE OF MASTERY');
certI = certI.replace('Complete Web App Dashboard &amp; UI Architecture', 'SaaS Dashboard UI &amp; Component Architecture');
certI = certI.replace('Apex Fullstack Architect', 'Senior Web Developer');
certI = certI.replace('APEX MASTER', 'LEVEL 10');
certI = certI.replace(
    'has achieved the highest milestone on NoviCodes by successfully completing all 6 capstone exercises, demonstrating verified proficiency in building a complete web application interface featuring sidebar navigation, instant search filtering, pricing switcher tables, settings management, and an interactive AI helper panel.',
    'has successfully completed 6 interactive frontend exercises demonstrating practical proficiency in building modern web application interfaces, modular sidebar layouts, debounced search filters, subscription tier switchers, and interactive AI chat panels.'
);
certI = certI.replace('certName: \'Level 10: Complete SaaS Capstone\'', 'certName: \'Level 10: SaaS Dashboard UI\'');
fs.writeFileSync('src/pages/9. partI/certificate.astro', certI, 'utf-8');
console.log('✅ Updated src/pages/9. partI/certificate.astro');


// 7. Update public/2. partB/hub.js, public/3. partC/hub.js, public/5. partE/hub.js
let hubBJs = fs.readFileSync('public/2. partB/hub.js', 'utf-8');
hubBJs = hubBJs.replace('🏆 Capstone Practical Web Application', '🏆 Final Project: Practical Web Widget');
hubBJs = hubBJs.replace('Final Capstone', 'Final Project');
fs.writeFileSync('public/2. partB/hub.js', hubBJs, 'utf-8');

let hubCJs = fs.readFileSync('public/3. partC/hub.js', 'utf-8');
hubCJs = hubCJs.replace('🏆 Capstone Framework Web App', '🏆 Final Project: Dynamic React App');
hubCJs = hubCJs.replace('Final Capstone', 'Final Project');
fs.writeFileSync('public/3. partC/hub.js', hubCJs, 'utf-8');

let hubEJs = fs.readFileSync('public/5. partE/hub.js', 'utf-8');
hubEJs = hubEJs.replace('🏆 Capstone Python Backend Service', '🏆 Final Project: Python API Logic Service');
hubEJs = hubEJs.replace('Production Capstone', 'Final Project');
fs.writeFileSync('public/5. partE/hub.js', hubEJs, 'utf-8');
console.log('✅ Updated Hub B, C, E scripts');


// 8. Update PlatformFooter.astro and 404.astro
let footer = fs.readFileSync('src/components/PlatformFooter.astro', 'utf-8');
footer = footer.replace(/Level 10 • Apex SaaS Capstone/g, 'Level 10 • SaaS Dashboard UI');
footer = footer.replace(/Fullstack/g, 'Web');
fs.writeFileSync('src/components/PlatformFooter.astro', footer, 'utf-8');

let page404 = fs.readFileSync('src/pages/404.astro', 'utf-8');
page404 = page404.replace(/Apex SaaS Capstone/g, 'SaaS Dashboard UI');
page404 = page404.replace(/Fullstack/g, 'Web');
fs.writeFileSync('src/pages/404.astro', page404, 'utf-8');
console.log('✅ Updated PlatformFooter.astro and 404.astro');
