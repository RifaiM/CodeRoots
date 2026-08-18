import fs from 'fs';
import path from 'path';

// 1. Common Technical Field Journal Hub CSS Template
function generateFieldJournalHubCSS(hubTitle, accentHex = '#A33B24', accentSecondary = '#314C52') {
    return `/* ==========================================================================
   CodeRoots ${hubTitle} Stylesheet
   Direction 4: The Technical Field Journal (Archival Paper & Carbon Ink)
   ========================================================================== */

:root {
    --bg-page: #F1EEE7;
    --bg-card: #FFFFFF;
    --bg-card-elevated: #F8F6F1;
    --border-card: #D5D0C6;
    --border-dark: #BAB4A6;
    --border-hairline: #E5E1D8;
    --text-title: #20211F;
    --text-body: #20211F;
    --text-muted: #686760;
    --accent-color: ${accentHex};
    --accent-hover: #862E1A;
    --accent-light: #F6ECE9;
    --accent-border: #EAC9C0;
    --accent-secondary: ${accentSecondary};
    --success-green: #314C52;
    --success-light: #EBF0F1;
    --success-border: #C2CED0;
    
    --font-serif: 'Newsreader', Georgia, Cambria, serif;
    --font-sans: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
}

body {
    background-color: var(--bg-page) !important;
    background: var(--bg-page) !important;
    color: var(--text-body) !important;
    font-family: var(--font-sans);
    margin: 0;
    padding: 0;
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Container */
.hub-container {
    max-width: 1100px;
    margin: 24px auto 60px auto;
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;
    flex: 1;
}

/* 1. Hero Section */
.hub-hero {
    text-align: left;
    background: var(--bg-card-elevated);
    border: 1px solid var(--border-card);
    border-radius: 2px;
    padding: 32px 28px;
    margin-bottom: 24px;
    box-shadow: none !important;
    position: relative;
}

.hub-badge {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.74rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent-color);
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    padding: 3px 8px;
    border-radius: 2px;
    margin-bottom: 12px;
}

.hub-hero h1 {
    font-family: var(--font-serif);
    font-size: 2.1rem;
    font-weight: 500;
    color: var(--text-title);
    margin: 0 0 12px 0;
    line-height: 1.25;
    letter-spacing: -0.01em;
}

.hub-hero p {
    font-size: 0.95rem;
    color: var(--text-muted);
    max-width: 780px;
    margin: 0 0 20px 0;
    line-height: 1.55;
}

/* Typewriter Highlight */
.typewriter-wrap {
    color: var(--accent-color);
    border-bottom: 2px solid var(--accent-color);
    padding-bottom: 1px;
}

.typewriter-cursor {
    color: var(--accent-color);
    animation: blinkCursor 0.8s infinite;
}

@keyframes blinkCursor {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

/* Progress Wrap */
.hero-progress-wrap {
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 2px;
    padding: 14px 18px;
    margin-bottom: 20px;
    max-width: 600px;
}

.hero-progress-info {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 0.76rem;
    font-weight: 600;
    color: var(--text-title);
    margin-bottom: 8px;
    text-transform: uppercase;
}

.hero-progress-bar {
    height: 4px;
    background: var(--border-hairline);
    border-radius: 2px;
    overflow: hidden;
}

.hero-progress-fill {
    height: 100%;
    background: var(--accent-color);
    width: 0%;
    transition: width 0.4s ease;
}

/* CTA Button */
.hero-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--accent-color);
    color: #F8F6F1 !important;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 2px;
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    transition: background 0.15s ease;
    border: 1px solid var(--accent-color);
}

.hero-cta-btn:hover {
    background: var(--accent-hover);
    border-color: var(--accent-hover);
}

/* 2. Stats Grid */
.hub-stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 32px;
}

.hub-stat-card {
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 2px;
    padding: 14px 16px;
    text-align: left;
    box-shadow: none !important;
}

.hub-stat-val {
    font-family: var(--font-mono);
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--text-title);
    margin-bottom: 2px;
}

.hub-stat-lbl {
    font-family: var(--font-mono);
    font-size: 0.70rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

/* 3. Chapters & Lesson Cards */
.curriculum-section {
    display: flex;
    flex-direction: column;
    gap: 28px;
    margin-bottom: 40px;
}

.chapter-block {
    background: transparent;
}

.chapter-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-card);
    padding-bottom: 8px;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 8px;
}

.chapter-title-wrap {
    display: flex;
    align-items: baseline;
    gap: 10px;
}

.chapter-num {
    font-family: var(--font-mono);
    font-size: 0.74rem;
    font-weight: 600;
    color: var(--accent-color);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.chapter-title {
    font-family: var(--font-serif);
    font-size: 1.35rem;
    font-weight: 500;
    color: var(--text-title);
    margin: 0;
}

.chapter-badge {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-muted);
    text-transform: uppercase;
}

.lesson-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 14px;
}

.lesson-card {
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 2px;
    padding: 16px;
    text-decoration: none;
    color: var(--text-body);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 120px;
    transition: border-color 0.15s ease, background 0.15s ease;
    box-shadow: none !important;
}

.lesson-card:hover {
    border-color: var(--text-title);
    background: var(--bg-card-elevated);
}

.lesson-card.completed {
    border-color: var(--border-card);
    background: var(--bg-card);
}

.lesson-card.completed:hover {
    border-color: var(--text-title);
}

.card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
}

.lesson-idx {
    font-family: var(--font-mono);
    font-size: 0.70rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.lesson-status-pill {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.lesson-status-pill.available {
    background: var(--bg-page);
    color: var(--accent-color);
    border: 1px solid var(--border-card);
}

.lesson-status-pill.completed {
    background: var(--success-light);
    color: var(--success-green);
    border: 1px solid var(--success-border);
}

.lesson-status-pill.locked {
    background: var(--border-hairline);
    color: var(--text-muted);
}

.lesson-card-title {
    font-family: var(--font-sans);
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-title);
    margin: 0 0 12px 0;
    line-height: 1.4;
}

.card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 8px;
    border-top: 1px solid var(--border-hairline);
    margin-top: auto;
}

.xp-tag {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--text-muted);
}

.card-action-text {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--accent-color);
    text-transform: uppercase;
}

/* 4. Certificate Callout Section */
.cert-callout-card {
    background: var(--bg-card-elevated);
    border: 1px solid var(--border-card);
    border-radius: 2px;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    gap: 16px;
}

.cert-callout-info h3 {
    font-family: var(--font-serif);
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--text-title);
    margin: 0 0 6px 0;
}

.cert-callout-info p {
    font-size: 0.88rem;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.5;
}

.cert-callout-btn {
    display: inline-flex;
    align-items: center;
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    color: var(--text-title);
    padding: 8px 16px;
    border-radius: 2px;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
    transition: all 0.15s ease;
}

.cert-callout-btn:hover {
    background: var(--text-title);
    color: #F8F6F1;
    border-color: var(--text-title);
}

/* 5. Mobile Responsiveness */
@media (max-width: 900px) {
    .hub-stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 640px) {
    .hub-container {
        padding: 0 12px;
        margin: 16px auto 40px auto;
    }

    .hub-hero {
        padding: 20px 16px;
    }

    .hub-hero h1 {
        font-size: 1.55rem;
    }

    .hub-stats-grid {
        grid-template-columns: 1fr;
        gap: 8px;
    }

    .lesson-cards-grid {
        grid-template-columns: 1fr;
    }

    .cert-callout-card {
        flex-direction: column;
        align-items: flex-start;
        padding: 18px 14px;
    }
}
`;
}

// 2. Write updated stylesheets to public hub directories
const hubs = [
    { dir: '2. partB', title: 'DOM & Vanilla JS Dojo (Level 04)', accent: '#A33B24' },
    { dir: '3. partC', title: 'React Component Dojo (Level 05)', accent: '#314C52' },
    { dir: '5. partE', title: 'Python Backend Basics Dojo (Level 06)', accent: '#2E5A44' },
    { dir: '6. partF', title: 'Specialized Tracks Dojo (Level 07)', accent: '#5C3D6A' },
    { dir: '7. partG', title: 'Async UI & Skeletons Dojo (Level 08)', accent: '#314C52' },
    { dir: '8. partH', title: 'User Logins & Auth Dojo (Level 09)', accent: '#A33B24' },
    { dir: '9. partI', title: 'SaaS Dashboard UI Dojo (Level 10)', accent: '#8C5810' },
];

hubs.forEach(h => {
    const cssPath = path.resolve(`public/${h.dir}/hub.css`);
    const css = generateFieldJournalHubCSS(h.title, h.accent);
    fs.writeFileSync(cssPath, css, 'utf-8');
    console.log(`✅ Updated ${cssPath}`);
});

// 3. Clean navLinks and emoji clutter in hub.astro files
const astroHubPaths = [
    'src/pages/1. partA/hub.astro',
    'src/pages/2. partB/hub.astro',
    'src/pages/3. partC/hub.astro',
    'src/pages/5. partE/hub.astro',
    'src/pages/6. partF/hub.astro',
    'src/pages/7. partG/hub.astro',
    'src/pages/8. partH/hub.astro',
    'src/pages/9. partI/hub.astro'
];

astroHubPaths.forEach(ap => {
    const fullPath = path.resolve(ap);
    if (!fs.existsSync(fullPath)) return;
    let content = fs.readFileSync(fullPath, 'utf-8');

    // Remove emoji icons from navLinks
    content = content.replace(/icon:\s*['"][^'"]+['"],?\s*/g, '');
    
    // Clean emojis from status tags
    content = content.replace(/⚡\s*Up Next/g, 'UP NEXT');
    content = content.replace(/✅\s*Completed/g, 'COMPLETED');
    content = content.replace(/🔒\s*Locked/g, 'LOCKED');
    content = content.replace(/⚡\s*\+/g, '+');
    content = content.replace(/🚀\s*Start/g, 'Start');
    content = content.replace(/⚔️\s*/g, '');
    content = content.replace(/⚛️\s*/g, '');
    content = content.replace(/🐍\s*/g, '');
    content = content.replace(/👑\s*/g, '');
    content = content.replace(/🏆\s*/g, '');
    content = content.replace(/🌉\s*/g, '');
    content = content.replace(/🛡️\s*/g, '');

    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✅ Cleaned template in ${ap}`);
});
