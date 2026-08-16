import fs from 'fs';

let content = fs.readFileSync('public/foundations.js', 'utf-8');

// Replace validTracks and track loading
const oldTrackLogic = `    // 1. Determine Active Track from Query Parameter (?track=html | css | js)
    const urlParams = new URLSearchParams(window.location.search);
    const rawTrackParam = urlParams.get('track');
    const validTracks = ['html', 'css', 'js'];

    if (rawTrackParam && !validTracks.includes(rawTrackParam.toLowerCase())) {
        render404TrackPage(rawTrackParam);
        return;
    }

    const trackKey = (rawTrackParam || 'html').toLowerCase();

    let trackData = window.LEVEL1_HTML_DATA;
    if (trackKey === 'css') {
        trackData = window.LEVEL2_CSS_DATA;
    } else if (trackKey === 'js') {
        trackData = window.LEVEL3_JS_DATA;
    }`;

const newTrackLogic = `    // 1. Determine Active Track from Query Parameter (?track=html | css | js | react | python | cloud | sql | nextjs | async | auth | saas)
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

    let trackData = trackMap[trackKey] || window.LEVEL1_HTML_DATA;`;

content = content.replace(oldTrackLogic, newTrackLogic);

// Replace headerLogoTag text
content = content.replace(
    /if \(headerLogoTag\) \{\s*if \(trackKey === 'css'\) headerLogoTag\.textContent = 'Level 2 • CSS Foundations';\s*else if \(trackKey === 'js'\) headerLogoTag\.textContent = 'Level 3 • JS Foundations';\s*else headerLogoTag\.textContent = 'Level 1 • HTML Foundations';\s*\}/,
    `if (headerLogoTag && trackData) {
        headerLogoTag.textContent = trackData.title;
    }`
);

// Update render404TrackPage pills
content = content.replace(
    /<div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">[\s\S]*?<\/div>/,
    `<div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; max-width: 600px; margin: 0 auto;">
                <a href="./foundations.html?track=html" style="background: #2563eb; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">🧱 HTML</a>
                <a href="./foundations.html?track=css" style="background: #2563eb; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">🎨 CSS</a>
                <a href="./foundations.html?track=js" style="background: #2563eb; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">⚡ JS</a>
                <a href="./foundations.html?track=react" style="background: #0284c7; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">⚛️ React</a>
                <a href="./foundations.html?track=python" style="background: #059669; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">🐍 Python</a>
                <a href="./foundations.html?track=cloud" style="background: #7c3aed; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">☁️ Cloud</a>
                <a href="./foundations.html?track=sql" style="background: #4f46e5; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">🛢️ SQL</a>
                <a href="./foundations.html?track=nextjs" style="background: #09090b; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem; border: 1px solid #3f3f46;">⚡ Next.js</a>
                <a href="./foundations.html?track=async" style="background: #0284c7; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">🌉 Async UI</a>
                <a href="./foundations.html?track=auth" style="background: #4338ca; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">🛡️ Auth</a>
                <a href="./foundations.html?track=saas" style="background: #d97706; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem;">🏆 SaaS</a>
                <a href="./index.html#roadmap" style="background: #f1f5f9; color: #0f172a; padding: 8px 14px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.82rem; border: 1px solid #cbd5e1;">🗺️ Skill Tree</a>
            </div>`
);

fs.writeFileSync('public/foundations.js', content, 'utf-8');
console.log('✅ Updated public/foundations.js with 11 Foundation Tracks!');
