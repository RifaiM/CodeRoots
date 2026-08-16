import fs from 'fs';
import path from 'path';

// 1. UPDATE index.astro hero headline & subtitle
let indexContent = fs.readFileSync('src/pages/index.astro', 'utf-8');
indexContent = indexContent.replace(
    /<h1 class="hero-title">[\s\S]*?<\/h1>/,
    `<h1 class="hero-title">
                    Learn Web Development by Actually Building Things
                </h1>`
);
indexContent = indexContent.replace(
    /<p class="hero-subtitle">[\s\S]*?<\/p>/,
    `<p class="hero-subtitle">
                    Master HTML, CSS, JavaScript, Python, React, and modern SaaS architecture by building 81 interactive projects directly in your browser. Zero setup, zero paywalls, and 7 verifiable proof-of-work certificates from Day 1.
                </p>`
);
fs.writeFileSync('src/pages/index.astro', indexContent, 'utf-8');
console.log('✅ Updated index.astro hero headline and subtitle');


// 2. UPDATE PlatformFooter.astro
let footerContent = fs.readFileSync('src/components/PlatformFooter.astro', 'utf-8');
footerContent = footerContent.replace(
    /<li><a href="\/7\. partG\/hub\.html">Level 8 • Fullstack API Bridge<\/a><\/li>/,
    '<li><a href="/7. partG/hub.html">Level 8 • Async UI Architecture</a></li>'
);
footerContent = footerContent.replace(
    /<li><a href="\/8\. partH\/hub\.html">Level 9 • Fullstack Auth &amp; DB<\/a><\/li>/,
    '<li><a href="/8. partH/hub.html">Level 9 • React Auth &amp; Access Control</a></li>'
);
footerContent = footerContent.replace(
    /<li><a href="\/9\. partI\/hub\.html">Level 10 • Apex SaaS Capstone<\/a><\/li>/,
    '<li><a href="/9. partI/hub.html">Level 10 • SaaS UI &amp; Design Systems</a></li>'
);
footerContent = footerContent.replace(
    /brandName = 'NoviCodes'/,
    "brandName = 'CodeRoots'"
);
footerContent = footerContent.replace(
    /<span class="title-novi">Novi<\/span><span class="title-codes">Codes<\/span>/g,
    '<span class="title-novi">Code</span><span class="title-codes">Roots</span>'
);
fs.writeFileSync('src/components/PlatformFooter.astro', footerContent, 'utf-8');
console.log('✅ Updated PlatformFooter.astro links and brand names');


// 3. UPDATE UserProfileModal.astro
let modalContent = fs.readFileSync('src/components/UserProfileModal.astro', 'utf-8');
modalContent = modalContent.replace(
    /Fullstack Auth & DB Architect/g,
    'React Auth Specialist'
);
modalContent = modalContent.replace(
    /Fullstack API Specialist/g,
    'Async UI Specialist'
);
modalContent = modalContent.replace(
    /'🌉 Level 8: Fullstack API Bridge Dojo'/g,
    "'🌉 Level 8: Async UI & Live Data Dojo'"
);
modalContent = modalContent.replace(
    /'🛡️ Level 9: Fullstack Auth & DB Dojo'/g,
    "'🛡️ Level 9: React Auth & Access Control Dojo'"
);
modalContent = modalContent.replace(
    /'🏆 Level 10: Apex SaaS Capstone Dojo'/g,
    "'🏆 Level 10: SaaS UI & Design Systems Dojo'"
);
fs.writeFileSync('src/components/UserProfileModal.astro', modalContent, 'utf-8');
console.log('✅ Updated UserProfileModal.astro rank titles and dojo list');


// 4. UPDATE 404.astro
let notFoundContent = fs.readFileSync('src/pages/404.astro', 'utf-8');
notFoundContent = notFoundContent.replace(
    /title="Level 8 • Fullstack API Bridge"/g,
    'title="Level 8 • Async UI Architecture"'
);
notFoundContent = notFoundContent.replace(
    /title="Level 9 • Fullstack Auth & DB"/g,
    'title="Level 9 • React Auth & Access Control"'
);
notFoundContent = notFoundContent.replace(
    /title="Level 10 • Apex SaaS Capstone"/g,
    'title="Level 10 • SaaS UI Architecture"'
);
notFoundContent = notFoundContent.replace(
    /targetName = 'Level 8 • Fullstack API Bridge Dojo Hub';/g,
    "targetName = 'Level 8 • Async UI & Live Data Hub';"
);
notFoundContent = notFoundContent.replace(
    /targetName = 'Level 9 • Fullstack Auth & DB Dojo Hub';/g,
    "targetName = 'Level 9 • React Auth & Access Control Hub';"
);
notFoundContent = notFoundContent.replace(
    /targetName = 'Level 10 • Apex SaaS Capstone Hub';/g,
    "targetName = 'Level 10 • SaaS UI & Design Systems Hub';"
);
fs.writeFileSync('src/pages/404.astro', notFoundContent, 'utf-8');
console.log('✅ Updated 404.astro fast-track pills and router labels');


// 5. UPDATE xpEngine.ts
let xpEngineContent = fs.readFileSync('src/scripts/xpEngine.ts', 'utf-8');
xpEngineContent = xpEngineContent.replace(
    /rankTitle = 'Fullstack Auth & DB Architect';/g,
    "rankTitle = 'React Auth Specialist';"
);
xpEngineContent = xpEngineContent.replace(
    /rankTitle = 'Fullstack API Specialist';/g,
    "rankTitle = 'Async UI Specialist';"
);
xpEngineContent = xpEngineContent.replace(
    /rankTitle = 'Apex SaaS Challenger';/g,
    "rankTitle = 'SaaS UI Architect';"
);
fs.writeFileSync('src/scripts/xpEngine.ts', xpEngineContent, 'utf-8');
console.log('✅ Updated xpEngine.ts rank titles');
