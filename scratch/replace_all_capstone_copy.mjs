/**
 * Replace all "Capstone" copy across web pages with clean, friendly, honest terminology
 */

import fs from 'fs';
import path from 'path';

console.log('🚀 Replacing all "Capstone" occurrences across pages...\n');

// 1. src/pages/index.astro
let indexContent = fs.readFileSync('src/pages/index.astro', 'utf-8');
indexContent = indexContent.replace(/<span class="outcome-tag">Level 10 Capstone<\/span>/g, '<span class="outcome-tag">Level 10 Final Project</span>');
fs.writeFileSync('src/pages/index.astro', indexContent, 'utf-8');
console.log('✅ Updated src/pages/index.astro');

// 2. src/pages/6. partF/hub.astro
let hubFContent = fs.readFileSync('src/pages/6. partF/hub.astro', 'utf-8');
hubFContent = hubFContent.replace(/Capstone: Typed State Store/g, 'Final Project: Typed State Store');
hubFContent = hubFContent.replace(/Capstone: Production Motion UI/g, 'Final Project: Interactive Motion Showcase');
fs.writeFileSync('src/pages/6. partF/hub.astro', hubFContent, 'utf-8');
console.log('✅ Updated src/pages/6. partF/hub.astro');

// 3. src/pages/6. partF/branchD/ (Lessons 1 to 12)
for (let i = 1; i <= 12; i++) {
    const filePath = `src/pages/6. partF/branchD/lesson${i}_remake.astro`;
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        content = content.replace(/"title":\s*"Capstone: Typed State Store"/g, '"title": "Final Project: Typed State Store"');
        content = content.replace(/CAPSTONE PROJECT/g, 'FINAL PROJECT');
        content = content.replace(/Capstone: Typed State Store/g, 'Final Project: Typed State Store');
        content = content.replace(/Level 7D Capstone/g, 'Level 7D Final Project');
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`✅ Updated ${filePath}`);
    }
}

// 4. src/pages/6. partF/branchE/ (Lessons 1 to 10)
for (let i = 1; i <= 10; i++) {
    const filePath = `src/pages/6. partF/branchE/lesson${i}_remake.astro`;
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        content = content.replace(/"title":\s*"Capstone: Production Motion UI"/g, '"title": "Final Project: Interactive Motion Showcase"');
        content = content.replace(/"title":\s*"Capstone: Production Motion UI Suite"/g, '"title": "Final Project: Interactive Motion Showcase"');
        content = content.replace(/Capstone: Production Motion UI Suite/g, 'Final Project: Interactive Motion Showcase');
        content = content.replace(/Capstone: Production Motion UI/g, 'Final Project: Interactive Motion Showcase');
        content = content.replace(/Level 7E Capstone/g, 'Level 7E Final Project');
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`✅ Updated ${filePath}`);
    }
}

// 5. src/pages/6. partF/branchC/lesson6_remake.astro
const lesson6CPath = 'src/pages/6. partF/branchC/lesson6_remake.astro';
if (fs.existsSync(lesson6CPath)) {
    let content = fs.readFileSync(lesson6CPath, 'utf-8');
    content = content.replace(/CapstoneDashboard/g, 'ServiceDashboard');
    content = content.replace(/Implement the CapstoneDashboard/g, 'Implement the ServiceDashboard');
    fs.writeFileSync(lesson6CPath, content, 'utf-8');
    console.log(`✅ Updated ${lesson6CPath}`);
}

// 6. Hub JS files
const hubJsFiles = [
    { file: 'public/2. partB/hub.js', find: /& Capstone/g, replace: '& Final Projects' },
    { file: 'public/3. partC/hub.js', find: /& Capstone/g, replace: '& Final Projects' },
    { file: 'public/5. partE/hub.js', find: /Production Capstone/g, replace: 'Final Project' }
];

hubJsFiles.forEach(({ file, find, replace }) => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf-8');
        content = content.replace(find, replace);
        fs.writeFileSync(file, content, 'utf-8');
        console.log(`✅ Updated ${file}`);
    }
});

console.log('\n🎉 ALL "CAPSTONE" COPY REPLACED SUCCESSFULLY!');
