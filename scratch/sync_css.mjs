import fs from 'fs';

const srcCss = fs.readFileSync('src/styles/dashboard.css', 'utf-8');
fs.writeFileSync('public/styles/dashboard.css', srcCss, 'utf-8');
console.log('Successfully synced src/styles/dashboard.css to public/styles/dashboard.css (Bytes: ' + srcCss.length + ')');
