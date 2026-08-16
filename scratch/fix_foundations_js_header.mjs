import fs from 'fs';

let content = fs.readFileSync('public/foundations.js', 'utf-8');

// Find where window.getUserXPAndRank starts
const cutIndex = content.indexOf('/**\n * Calculates XP and rank badge');

const newHeader = `/**
 * NoviCodes - Master Foundations Controller Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initGlobalBackToTop();

    // 1. Determine Active Track from Query Parameter (?track=html | css | js | react | python | cloud | sql | nextjs | async | auth | saas)
    const urlParams = new URLSearchParams(window.location.search);
    const rawTrackParam = urlParams.get('track');
    const validTracks = ['html', 'css', 'js', 'react', 'python', 'cloud', 'sql', 'nextjs', 'async', 'auth', 'saas'];

    if (rawTrackParam && !validTracks.includes(rawTrackParam.toLowerCase())) {
        render404TrackPage(rawTrackParam);
        return;
    }

    const trackKey = (rawTrackParam || 'html').toLowerCase();

    const trackMap = {
        html: window.LEVEL1_HTML_DATA,
        css: window.LEVEL2_CSS_DATA,
        js: window.LEVEL3_JS_DATA,
        react: window.LEVEL5_REACT_DATA,
        python: window.LEVEL6_PYTHON_DATA,
        cloud: window.LEVEL7A_CLOUD_DATA,
        sql: window.LEVEL7B_SQL_DATA,
        nextjs: window.LEVEL7C_NEXTJS_DATA,
        async: window.LEVEL8_ASYNC_DATA,
        auth: window.LEVEL9_AUTH_DATA,
        saas: window.LEVEL10_SAAS_DATA
    };

    let trackData = trackMap[trackKey] || window.LEVEL1_HTML_DATA;

    // 2. Hydrate Page Header & Hero Details
    document.title = \`NoviCodes - \${trackData.title}\`;
    
    const trackBadgePill = document.getElementById('trackBadgePill');
    const trackTitle = document.getElementById('trackTitle');
    const trackSubtitle = document.getElementById('trackSubtitle');
    const headerLogoTag = document.getElementById('headerLogoTag');

    if (trackBadgePill) trackBadgePill.textContent = \`\${trackData.badgeIcon} \${trackData.title}\`;
    if (trackTitle) trackTitle.textContent = trackData.title;
    if (trackSubtitle) trackSubtitle.textContent = trackData.subtitle;
    if (headerLogoTag && trackData) {
        headerLogoTag.textContent = trackData.title;
    }

    // Calculate User Stats from LocalStorage
    updateHeaderStats();

    // 3. Initialize Tab Navigation Engine
    initTabNavigation();

    // 4. Hydrate 1. Concepts Panel
    hydrateConceptsPanel(trackData.concepts, trackKey);

    // 5. Hydrate 2. Glossary Panel
    hydrateGlossaryPanel(trackData.glossary);

    // 6. Hydrate 3. Code Sandbox Engine
    initSandboxEngine(trackData.sandbox);

    // 7. Hydrate 4. Quiz & Verification Engine
    initQuizEngine(trackData);
});

`;

const restOfFile = content.slice(cutIndex);
const fullFile = newHeader + restOfFile;

fs.writeFileSync('public/foundations.js', fullFile, 'utf-8');
console.log('✅ Correctly structured public/foundations.js with 11 tracks!');
