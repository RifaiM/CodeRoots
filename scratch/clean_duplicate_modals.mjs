import fs from 'fs';

// 1. CLEAN public/scripts/dashboard.js
let dash = fs.readFileSync('public/scripts/dashboard.js', 'utf-8');

// Remove duplicate window.NoviCodes from dashboard.js if present (UserProfileModal has master)
// Keep NoviCodes in UserProfileModal.astro as master source of truth.
// Remove duplicate window.openUserProfileModal and window.confirmResetProgress from dashboard.js
dash = dash.replace(/\/\*\*[\s\S]*?8\. User Profile & XP Breakdown Modal[\s\S]*?window\.openUserProfileModal = function\(\) \{[\s\S]*?window\.confirmResetProgress = function\(\) \{[\s\S]*?\n\};\n\n/g, '');

// Also remove duplicate NoviCodes in dashboard.js if it exists so UserProfileModal.astro is master
dash = dash.replace(/\/\*\*[\s\S]*?2\.5 NoviCodes Developer Toolkit[\s\S]*?window\.NoviCodes = \{[\s\S]*?\}\;\n\n/g, '');

fs.writeFileSync('public/scripts/dashboard.js', dash, 'utf-8');
console.log('✅ Cleaned duplicate modals & devkit from dashboard.js');


// 2. CLEAN public/foundations.js
let foundations = fs.readFileSync('public/foundations.js', 'utf-8');
foundations = foundations.replace(/window\.openUserProfileModal = function\(\) \{[\s\S]*?window\.confirmResetProgress = function\(\) \{[\s\S]*?\n\};\n\n/g, '');
foundations = foundations.replace(/window\.openUserProfileModal = function\(\) \{[\s\S]*?\n\};\n\n/g, '');
foundations = foundations.replace(/window\.confirmResetProgress = function\(\) \{[\s\S]*?\n\};\n\n/g, '');
fs.writeFileSync('public/foundations.js', foundations, 'utf-8');
console.log('✅ Cleaned duplicate modals from foundations.js');


// 3. CLEAN public/1. partA/web_history.js
let webHist = fs.readFileSync('public/1. partA/web_history.js', 'utf-8');
webHist = webHist.replace(/window\.openUserProfileModal = function\(\) \{[\s\S]*?window\.confirmResetProgress = function\(\) \{[\s\S]*?\n\};\n\n/g, '');
webHist = webHist.replace(/window\.openUserProfileModal = function\(\) \{[\s\S]*?\n\};\n\n/g, '');
webHist = webHist.replace(/window\.confirmResetProgress = function\(\) \{[\s\S]*?\n\};\n\n/g, '');
fs.writeFileSync('public/1. partA/web_history.js', webHist, 'utf-8');
console.log('✅ Cleaned duplicate modals from web_history.js');
