import fs from 'fs';

// 1. UPDATE index.astro FAQ text & branding
let indexContent = fs.readFileSync('src/pages/index.astro', 'utf-8');

indexContent = indexContent.replace(
    /Everything You Need to Know About NoviCodes/,
    'Everything You Need to Know About NoviCodes'
);

indexContent = indexContent.replace(
    /<span class="faq-q-text">💰 Is NoviCodes really 100% free and open-source forever\?<\/span>/,
    '<span class="faq-q-text">💰 Is NoviCodes really 100% free and open-source forever?</span>'
);

indexContent = indexContent.replace(
    /<p><strong>Yes, absolutely!<\/strong> NoviCodes is licensed under the open-source MIT License\. There are zero paywalls, zero premium tiers, no credit cards required, and no locked lessons\. Everything from Level 0 Web Concepts to Level 7 Fullstack Specializations is 100% free for all learners worldwide\.<\/p>/,
    '<p><strong>Yes, absolutely!</strong> NoviCodes is licensed under the open-source MIT License. There are zero paywalls, zero premium tiers, no credit cards required, and no locked lessons. Everything from Level 0 Web Concepts to Level 10 SaaS Architecture is 100% free for all learners worldwide.</p>'
);

indexContent = indexContent.replace(
    /NoviCodes gives you the flight simulator training to pilot AI tools effectively\./,
    'NoviCodes gives you the flight simulator training to pilot AI tools effectively.'
);

indexContent = indexContent.replace(
    /When you complete any Level 4, 5, 6, or Level 7 specialization branch, the platform cryptographically generates an official Certificate of Completion/,
    'When you complete any Level 4 through Level 10 track, the platform generates an official Certificate of Completion'
);

fs.writeFileSync('src/pages/index.astro', indexContent, 'utf-8');
console.log('✅ Updated index.astro FAQ copywriting & branding');


// 2. UPDATE src/styles/dashboard.css & public/styles/dashboard.css
function fixFaqCss(filePath) {
    let css = fs.readFileSync(filePath, 'utf-8');

    // Remove border-top and add smooth opacity + will-change
    css = css.replace(
        /\.faq-answer-panel\s*\{\s*max-height:\s*0;\s*overflow:\s*hidden;\s*transition:\s*max-height\s*0\.35s\s*cubic-bezier\(0\.4,\s*0,\s*0\.2,\s*1\);\s*\}/g,
        `.faq-answer-panel {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.25s ease;
    will-change: max-height, opacity;
}

.faq-item.active .faq-answer-panel {
    opacity: 1;
}`
    );

    css = css.replace(/border-top:\s*1px\s*solid\s*#f8fafc;/g, 'border-top: none;');

    // Add outline-none on focus
    css = css.replace(
        /\.faq-question-btn:hover\s*\{\s*color:\s*#2563eb;\s*\}/g,
        `.faq-question-btn:hover {
    color: #2563eb;
}

.faq-question-btn:focus {
    outline: none;
}

.faq-question-btn:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: -2px;
    border-radius: 12px;
}`
    );

    fs.writeFileSync(filePath, css, 'utf-8');
    console.log(`✅ Fixed FAQ accordion animation & borders in: ${filePath}`);
}

fixFaqCss('src/styles/dashboard.css');
fixFaqCss('public/styles/dashboard.css');
