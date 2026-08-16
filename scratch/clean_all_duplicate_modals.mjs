import fs from 'fs';

function removeBlock(filePath, startRegex, endRegex, label) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split(/\r?\n/);
    let startIdx = -1;
    let endIdx = -1;

    for (let i = 0; i < lines.length; i++) {
        if (startIdx === -1 && startRegex.test(lines[i])) {
            startIdx = i;
        } else if (startIdx !== -1 && endRegex.test(lines[i])) {
            endIdx = i;
            break;
        }
    }

    if (startIdx !== -1 && endIdx !== -1) {
        lines.splice(startIdx, endIdx - startIdx);
        fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
        console.log(`✅ ${label}: removed lines ${startIdx + 1} to ${endIdx}`);
    } else {
        console.log(`⚠️ ${label}: startIdx=${startIdx}, endIdx=${endIdx}`);
    }
}

// 1. Clean public/scripts/dashboard.js
removeBlock(
    'public/scripts/dashboard.js',
    /8\. User Profile & XP Breakdown Modal/,
    /Hash Navigation Smooth Scroll/,
    'dashboard.js User Profile Modal'
);

removeBlock(
    'public/scripts/dashboard.js',
    /2\.5 NoviCodes Developer Toolkit/,
    /3\. Daily Quest Status Hydration/,
    'dashboard.js NoviCodes DevKit'
);

// 2. Clean public/foundations.js
removeBlock(
    'public/foundations.js',
    /window\.openUserProfileModal = function/,
    /Initializes 4-Tab Segmented Switcher/,
    'foundations.js User Profile Modal'
);

// 3. Clean public/1. partA/web_history.js
removeBlock(
    'public/1. partA/web_history.js',
    /window\.openUserProfileModal = function/,
    /Voice Narration State/,
    'web_history.js User Profile Modal'
);
