import fs from 'fs';

// 1. Clean public/1. partA/web_history.js
let webH = fs.readFileSync('public/1. partA/web_history.js', 'utf-8');
const linesH = webH.split(/\r?\n/);
let startH = -1;
let endH = -1;

for (let i = 0; i < linesH.length; i++) {
    if (startH === -1 && linesH[i].includes('window.openUserProfileModal = function() {')) {
        startH = i;
    } else if (startH !== -1 && linesH[i].includes('/* ==========================================================================')) {
        endH = i;
        break;
    }
}

if (startH !== -1 && endH !== -1) {
    linesH.splice(startH, endH - startH);
    fs.writeFileSync('public/1. partA/web_history.js', linesH.join('\n'), 'utf-8');
    console.log(`✅ Cleaned web_history.js (lines ${startH + 1} to ${endH})`);
}

// 2. Clean duplicate window.NoviCodes and devkit shortcuts from public/scripts/dashboard.js
let dash = fs.readFileSync('public/scripts/dashboard.js', 'utf-8');
const linesD = dash.split(/\r?\n/);
let startD = -1;
let endD = -1;

for (let i = 0; i < linesD.length; i++) {
    if (startD === -1 && linesD[i].includes('2.5 NoviCodes Developer Toolkit')) {
        startD = i;
    } else if (startD !== -1 && linesD[i].includes('3. GSAP Animation Engine')) {
        endD = i;
        break;
    }
}

if (startD !== -1 && endD !== -1) {
    linesD.splice(startD, endD - startD);
    fs.writeFileSync('public/scripts/dashboard.js', linesD.join('\n'), 'utf-8');
    console.log(`✅ Cleaned dashboard.js DevKit block (lines ${startD + 1} to ${endD})`);
}
