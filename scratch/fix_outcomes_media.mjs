import fs from 'fs';

let css = fs.readFileSync('public/styles/dashboard.css', 'utf-8');

// Remove ALL the incorrectly-inserted .outcomes-grid blocks inside media queries
// They were inserted after every .logo-tag block across 4 breakpoints
const badBlock = /\n\n  \.outcomes-grid \{\n    grid-template-columns: 1fr;\n    gap: 12px;\n    margin: 20px 0 28px;\n  \}\n/g;
const matches = [...css.matchAll(badBlock)].length;
console.log(`Found ${matches} bad .outcomes-grid blocks to remove`);

css = css.replace(badBlock, '\n');

// Now add ONE correct responsive rule inside the @media (max-width: 768px) block only
// Find the 768px block and add outcomes-grid there after .logo-tag
const target768 = `@media (max-width: 768px) {\n  .platform-header {`;
const replacement768 = `@media (max-width: 768px) {\n  .outcomes-grid {\n    grid-template-columns: 1fr;\n    gap: 12px;\n    margin: 20px 0 28px;\n  }\n\n  .platform-header {`;

css = css.replace(target768, replacement768);

fs.writeFileSync('public/styles/dashboard.css', css);
console.log('Done — outcomes-grid responsive rule inserted cleanly into @media (max-width: 768px) only');
