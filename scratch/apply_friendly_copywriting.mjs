import fs from 'fs';
import path from 'path';

// =========================================================================
// 1. UPDATE DASHBOARD (src/pages/index.astro)
// =========================================================================

let indexAstro = fs.readFileSync('src/pages/index.astro', 'utf-8');

// Update SEO and Hero
indexAstro = indexAstro.replace(
    /title="NoviCodes • Master Fullstack Engineering from Fundamentals to Production SaaS"/,
    'title="NoviCodes • Master Modern Web & Frontend Engineering from Scratch"'
);
indexAstro = indexAstro.replace(
    /description="Learn HTML, CSS, JavaScript, React, Python, Cloud DevOps, PostgreSQL, and fullstack SaaS architecture by building 81 real-world projects directly in your browser\. 10 interactive tracks, zero paywalls, and 7 verifiable proof-of-work credentials\."/,
    'Learn HTML, CSS, JavaScript, Python, React, and modern SaaS architecture by building 81 real-world projects directly in your browser. 10 interactive tracks, zero paywalls, and 7 verifiable credentials.'
);
indexAstro = indexAstro.replace(
    /Learn HTML, CSS, JavaScript, React, Python, Cloud DevOps, and PostgreSQL by building 81 real projects directly in your browser\. Zero setup, zero paywalls, and 7 verifiable proof-of-work credentials from Day 1\./,
    'Learn HTML, CSS, JavaScript, Python, React, and modern SaaS architecture by building 81 real projects directly in your browser. Zero setup, zero paywalls, and 7 verifiable credentials from Day 1.'
);

// Update Track 8 Card
const oldTrack8 = /<!-- Track 8: Fullstack API & State Bridge -->[\s\S]*?<\/article>/;
const newTrack8 = `<!-- Track 8: Async UI & Live Data Patterns -->
                <article class="track-card advanced-track gsap-reveal" data-category="advanced">
                    <div class="card-top">
                        <span class="track-level-badge" style="background: linear-gradient(135deg, #0284c7, #0369a1); color: white;">Level 8</span>
                        <span class="track-status-icon ready">⚡ +1,500 XP</span>
                    </div>
                    <div class="card-icon-wrap" style="background: linear-gradient(135deg, #e0f2fe, #bae6fd);">
                        <span class="card-icon">🌉</span>
                    </div>
                    <h3 class="card-title">Async UI &amp; Live Data Patterns</h3>
                    <p class="card-desc">
                        Learn how top apps feel instant. Master smooth skeleton loaders, friendly error screens with retry buttons, instant optimistic likes, and live auto-refreshing badges.
                    </p>
                    <div class="card-meta">
                        <span class="meta-tag">⚡ Skeleton Loaders</span>
                        <span class="meta-tag">❤️ Optimistic UI</span>
                        <span class="meta-tag">🔄 Live Polling</span>
                    </div>
                    <a href="/7. partG/hub.html" class="track-btn gold-btn">
                        <span>🌉 Enter Level 8 Dojo</span>
                    </a>
                </article>`;
indexAstro = indexAstro.replace(oldTrack8, newTrack8);

// Update Track 9 Card
const oldTrack9 = /<!-- Track 9: Fullstack Auth & Database Persistence -->[\s\S]*?<\/article>/;
const newTrack9 = `<!-- Track 9: React Auth & Permission Gates -->
                <article class="track-card advanced-track gsap-reveal" data-category="advanced">
                    <div class="card-top">
                        <span class="track-level-badge" style="background: linear-gradient(135deg, #4f46e5, #4338ca); color: white;">Level 9</span>
                        <span class="track-status-icon ready">⚡ +1,500 XP</span>
                    </div>
                    <div class="card-icon-wrap" style="background: linear-gradient(135deg, #ede9fe, #ddd6fe);">
                        <span class="card-icon">🛡️</span>
                    </div>
                    <h3 class="card-title">React Auth &amp; Permission Gates</h3>
                    <p class="card-desc">
                        Learn how modern web apps handle logins and security. Master session states, lock private dashboards from visitors, and show admin-only tools based on user roles.
                    </p>
                    <div class="card-meta">
                        <span class="meta-tag">🔐 Login States</span>
                        <span class="meta-tag">🛡️ Protected Pages</span>
                        <span class="meta-tag">👑 Role Permissions</span>
                    </div>
                    <a href="/8. partH/hub.html" class="track-btn gold-btn">
                        <span>🛡️ Enter Level 9 Dojo</span>
                    </a>
                </article>`;
indexAstro = indexAstro.replace(oldTrack9, newTrack9);

// Update Track 10 Card
const oldTrack10 = /<!-- Track 10: The Apex Production SaaS Capstone -->[\s\S]*?<\/article>/;
const newTrack10 = `<!-- Track 10: SaaS UI & Design Systems -->
                <article class="track-card advanced-track gsap-reveal" data-category="advanced" style="border: 2px solid #f59e0b !important; background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%) !important; box-shadow: 0 12px 32px rgba(245, 158, 11, 0.20) !important;">
                    <div class="card-top">
                        <span class="track-level-badge" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; font-weight: 800; text-transform: uppercase;">🏆 LEVEL 10 APEX</span>
                        <span class="track-status-icon ready" style="color: #b45309; font-weight: 800;">🎓 Graduation Capstone</span>
                    </div>
                    <div class="card-icon-wrap" style="background: linear-gradient(135deg, #fef3c7, #fde68a); border: 1px solid #fcd34d;">
                        <span class="card-icon">👑</span>
                    </div>
                    <h3 class="card-title" style="color: #78350f;">SaaS UI &amp; Design Systems</h3>
                    <p class="card-desc" style="color: #475569;">
                        The flagship graduation milestone! Build real SaaS interfaces: clean sidebar layouts, instant search filters, monthly/annual pricing tables, and AI copilot panels.
                    </p>
                    <div class="card-meta">
                        <span class="meta-tag" style="background: #fef3c7; color: #b45309; font-weight: 700;">💎 SaaS App Shell</span>
                        <span class="meta-tag" style="background: #fefce8; color: #854d0e; font-weight: 700;">💳 Pricing Switcher</span>
                        <span class="meta-tag" style="background: #ecfdf5; color: #047857; font-weight: 700;">🤖 AI Copilot UI</span>
                    </div>
                    <a href="/9. partI/hub.html" class="track-btn primary-btn" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #0f172a; font-weight: 800; border-radius: 20px; box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35);">
                        <span>🏆 Launch Level 10 Capstone</span>
                    </a>
                </article>`;
indexAstro = indexAstro.replace(oldTrack10, newTrack10);

fs.writeFileSync('src/pages/index.astro', indexAstro, 'utf-8');
console.log('✅ Updated index.astro with friendly dashboard cards and SEO');


// =========================================================================
// 2. METADATA FOR HUBS AND LESSONS
// =========================================================================

const level8_friendly = [
    {
        num: 1,
        title: "Smooth Skeleton Loaders",
        desc: "Make your app look fast and polished by showing animated loading skeletons while fetching data.",
        mission: "Build a product catalog that shows a smooth loading skeleton while data is on its way!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> How It Works</h3>
            <p>Ever notice how YouTube and LinkedIn show grey pulsing placeholder boxes instead of an empty white screen while loading?</p>
            <p>That is a <strong>Skeleton Loader</strong>. In React, you use a simple state variable: <code>const [isLoading, setIsLoading] = React.useState(true);</code>. While <code>isLoading</code> is true, you show the skeleton; once the data arrives, you show the real items!</p>
        </article>
        <article class="concept-card">
            <h3><span>✨</span> Why Users Love This</h3>
            <p>Showing a skeleton makes your website feel <strong>2x faster</strong> because users know immediately that content is loading.</p>
        </article>`
    },
    {
        num: 2,
        title: "Friendly Error Screens & 1-Click Retry",
        desc: "Handle failed network requests gracefully and give users a helpful retry button.",
        mission: "Build a friendly error screen that catches connection errors and lets users retry with one click!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> How It Works</h3>
            <p>Sometimes the internet drops or an API is down. Good apps never show a broken white screen—they show a friendly message like <em>"Couldn't load data. [Try Again]"</em>.</p>
            <p>In React, we save the error into state (<code>setErrorMessage(...)</code>) and conditionally render a helpful error card with a retry button.</p>
        </article>
        <article class="concept-card">
            <h3><span>✨</span> Why Users Love This</h3>
            <p>Users stay calm when an error is clearly explained and easy to fix with one click.</p>
        </article>`
    },
    {
        num: 3,
        title: "Smarter Forms (Prevent Double Submits)",
        desc: "Disable buttons while sending data so users can't accidentally submit twice.",
        mission: "Build an interactive form that disables the submit button and shows 'Saving...' while submitting!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> How It Works</h3>
            <p>If a button doesn't respond instantly, users will impatiently click it 5 times. On a checkout page, that could mean 5 duplicate orders!</p>
            <p>To fix this, we track <code>const [isSubmitting, setIsSubmitting] = React.useState(false);</code>. When clicked, we set it to <code>true</code>, disable the button (<code>disabled={isSubmitting}</code>), and change the text to <em>"Saving..."</em>.</p>
        </article>
        <article class="concept-card">
            <h3><span>✨</span> Why Users Love This</h3>
            <p>Instant visual feedback reassures the user that their action is already being processed.</p>
        </article>`
    },
    {
        num: 4,
        title: "Instant Optimistic Likes (Zero Lag)",
        desc: "Update the UI immediately when clicked without waiting for the server.",
        mission: "Build a social like button that turns red instantly when clicked for a snappy, zero-lag feel!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> How It Works</h3>
            <p>When you like a post on Twitter or Instagram, the heart turns red <strong>instantly (0ms)</strong>. It doesn't make you wait for the server response.</p>
            <p>This is called <strong>Optimistic UI</strong>. We toggle the like state immediately in React. In the background, the request sends. If something goes wrong, we simply switch it back.</p>
        </article>
        <article class="concept-card">
            <h3><span>✨</span> Why Users Love This</h3>
            <p>Optimistic updates make your web app feel as fast and snappy as a native mobile app.</p>
        </article>`
    },
    {
        num: 5,
        title: "Live Activity Badges & Safe Timers",
        desc: "Keep stats fresh with auto-refresh intervals and clean up timers properly.",
        mission: "Build a live counter that auto-refreshes every few seconds and safely cleans up its timer!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> How It Works</h3>
            <p>To show live metrics (like active users or order counts), we can use <code>setInterval</code> inside a <code>useEffect</code> hook to refresh data every few seconds.</p>
            <p><strong>Crucial Rule:</strong> Always return <code>() => clearInterval(timer)</code> at the end of <code>useEffect</code> so the timer stops when the user leaves the page, preventing memory leaks!</p>
        </article>
        <article class="concept-card">
            <h3><span>✨</span> Why Users Love This</h3>
            <p>Live badges keep users informed in real-time without forcing them to manually refresh the whole browser.</p>
        </article>`
    },
    {
        num: 6,
        title: "Capstone: Reactive Storefront Dashboard",
        desc: "Combine skeleton loaders, optimistic cart counts, and live activity into one reactive store.",
        mission: "Build a complete e-commerce store with smooth loading, instant cart updates, and live stats!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> Your Capstone Project</h3>
            <p>It's time to put all your new async superpowers together! In this capstone, you will assemble a fast e-commerce dashboard featuring skeleton loaders, instant cart counts, and live status badges.</p>
            <p>Everything you write here is real, modern React state management used by top frontend engineering teams.</p>
        </article>`
    }
];

const level9_friendly = [
    {
        num: 1,
        title: "Managing Login Tokens in State",
        desc: "Store user credentials in React state and handle clean login/logout flows.",
        mission: "Build a clean login screen that stores auth tokens in state and displays the active session!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> How It Works</h3>
            <p>When a user logs in with their password, the server responds with an <strong>auth token</strong> (like a digital VIP wristband).</p>
            <p>Our React application saves this token in state (and client storage), immediately transforming the view from a login form into a personalized member screen!</p>
        </article>
        <article class="concept-card">
            <h3><span>✨</span> Why This Matters</h3>
            <p>Understanding token state is the foundation of building any multi-user web application or SaaS platform.</p>
        </article>`
    },
    {
        num: 2,
        title: "Global Session Provider (AuthContext)",
        desc: "Share the logged-in user info across every component without messy prop-drilling.",
        mission: "Build an AuthContext provider that shares the user session and logout function everywhere!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> How It Works</h3>
            <p>Imagine having to pass <code>user={user}</code> down through 10 nested components just to show the user's avatar in the navbar. That's called <em>prop-drilling</em> and it gets messy fast.</p>
            <p>With React's <strong>AuthContext</strong>, we wrap our app once in <code>&lt;AuthProvider&gt;</code>. Then, <em>any</em> component can simply call <code>useContext(AuthContext)</code> to get <code>{ user, logout }</code> directly!</p>
        </article>
        <article class="concept-card">
            <h3><span>✨</span> Why This Matters</h3>
            <p>Every major React app (from Netflix to GitHub) uses Context to share the active login session globally.</p>
        </article>`
    },
    {
        num: 3,
        title: "Locking Private Pages (Route Guards)",
        desc: "Keep private dashboard views locked from logged-out visitors.",
        mission: "Build a ProtectedRoute component that blocks visitors and shows private views only to logged-in members!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> How It Works</h3>
            <p>Visitors shouldn't be able to see private settings or member dashboards unless they are logged in.</p>
            <p>A <strong>Route Guard</strong> is a simple React component that checks: <em>"Is the user logged in?"</em> If yes, it renders the page; if no, it shows a friendly <em>"Please log in first"</em> message.</p>
        </article>
        <article class="concept-card">
            <h3><span>✨</span> Why This Matters</h3>
            <p>Route guards keep user accounts, private messages, and payment details completely private and secure.</p>
        </article>`
    },
    {
        num: 4,
        title: "Managing Team Member Lists (Clean State)",
        desc: "Add and manage team members with clean, immutable React state updates.",
        mission: "Build a team directory that immutably adds new members without mutating existing state!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> How It Works</h3>
            <p>In React, you should never modify arrays directly with <code>users.push()</code> because React won't know the list changed.</p>
            <p>Instead, we use the spread operator: <code>setUsers([...users, newUser])</code>. This creates a fresh new list that tells React to instantly re-render the UI with the new member!</p>
        </article>
        <article class="concept-card">
            <h3><span>✨</span> Why This Matters</h3>
            <p>Writing immutable state updates is the #1 rule for preventing subtle bugs in modern React apps.</p>
        </article>`
    },
    {
        num: 5,
        title: "Role Gates (Admin vs Member Views)",
        desc: "Show special admin tools (like delete buttons) only to users with the Admin role.",
        mission: "Build a permission gate that shows sensitive action buttons exclusively to Admin accounts!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> How It Works</h3>
            <p>In a team app, a regular <code>member</code> should only view projects, while an <code>admin</code> needs buttons to delete, invite, or change billing.</p>
            <p>In React, we use conditional rendering: <code>{user.role === 'admin' && &lt;button&gt;Delete Project&lt;/button&gt;}</code> to only show admin tools when authorized.</p>
        </article>
        <article class="concept-card">
            <h3><span>✨</span> Why This Matters</h3>
            <p>Role-based views keep your UI clean and prevent regular team members from clicking dangerous settings.</p>
        </article>`
    },
    {
        num: 6,
        title: "Capstone: Secure Team Workspace",
        desc: "Assemble a multi-user workspace with user switching, private views, and admin role gates.",
        mission: "Build a complete team workspace that switches between users and updates access permissions on the fly!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> Your Capstone Project</h3>
            <p>You are now ready to build a complete team workspace! In this project, you will combine token state, global AuthContext, protected route guards, and role permissions.</p>
            <p>Switching between Member and Admin accounts will instantly recalculate what each user can see and do.</p>
        </article>`
    }
];

const level10_friendly = [
    {
        num: 1,
        title: "The Sleek SaaS App Shell & Sidebar",
        desc: "Build a reusable modular app layout with clean headers, sidebars, and content slots.",
        mission: "Build a modular SaaS layout shell that wraps pages with consistent navigation and header branding!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> How It Works</h3>
            <p>Look at apps like Notion, Linear, or Slack: the header, navigation sidebar, and user profile stay fixed in place while you navigate between pages.</p>
            <p>In React, we build a <strong>Layout Shell</strong> component that accepts <code>{children}</code> and places it into the main viewport.</p>
        </article>
        <article class="concept-card">
            <h3><span>✨</span> Why This Matters</h3>
            <p>Layout shells keep your design consistent across hundreds of pages without duplicating navbar code.</p>
        </article>`
    },
    {
        num: 2,
        title: "Instant Search (Filter Without Lag)",
        desc: "Filter large lists instantly as users type with case-insensitive search logic.",
        mission: "Build a snappy live search filter that instantly narrows down product lists as you type!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> How It Works</h3>
            <p>Users expect search bars to update the list in real-time as they type each letter.</p>
            <p>By connecting an <code>&lt;input&gt;</code> to React state and filtering items with <code>item.name.toLowerCase().includes(query.toLowerCase())</code>, we get a buttery-smooth instant search experience!</p>
        </article>
        <article class="concept-card">
            <h3><span>✨</span> Why This Matters</h3>
            <p>Fast search makes dashboards delightful to use and helps users find what they need in seconds.</p>
        </article>`
    },
    {
        num: 3,
        title: "Interactive Pricing & Upgrade Table",
        desc: "Build an interactive SaaS pricing card that toggles between Free and PRO tiers with discount math.",
        mission: "Build an interactive pricing card that switches between Free and PRO plans with visual feedback!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> How It Works</h3>
            <p>Every commercial SaaS website needs a great pricing card that explains plan features and lets users choose between Starter and PRO.</p>
            <p>In React, we track the selected plan (<code>const [tier, setTier] = React.useState('free')</code>) and update badge colors, features, and the upgrade button on click!</p>
        </article>
        <article class="concept-card">
            <h3><span>✨</span> Why This Matters</h3>
            <p>Clear, responsive pricing cards make buying intuitive and directly increase SaaS conversions.</p>
        </article>`
    },
    {
        num: 4,
        title: "Smart AI Copilot & Insights Panel",
        desc: "Build an AI copilot panel with thinking animations and formatted summary cards.",
        mission: "Build an AI assistant panel that shows a thinking animation and generates structured summaries!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> How It Works</h3>
            <p>Modern web apps feature AI assistants to help users summarize data, write text, or analyze stats.</p>
            <p>The frontend must guide the user: when they click <em>"Generate"</em>, we show a thinking state (<code>isGenerating: true</code>), and then smoothly reveal the structured AI insights!</p>
        </article>
        <article class="concept-card">
            <h3><span>✨</span> Why This Matters</h3>
            <p>Polished loading and thinking states make interacting with AI feel magical and responsive.</p>
        </article>`
    },
    {
        num: 5,
        title: "Launch Readiness & Settings Audit",
        desc: "Build an interactive pre-flight checklist dashboard that verifies settings before launch.",
        mission: "Build a pre-flight audit checklist that validates configuration switches before going live!",
        concept_body: `<article class="concept-card">
            <h3><span>💡</span> How It Works</h3>
            <p>Before launching a website to real users, engineers check settings like SSL security, API keys, and domain whitelist.</p>
            <p>In React, we track each setting with a boolean switch, and automatically display a big green <em>"100% Ready to Launch"</em> badge once every item is checked!</p>
        </article>
        <article class="concept-card">
            <h3><span>✨</span> Why This Matters</h3>
            <p>Clear launch dashboards ensure teams never ship broken settings to production users.</p>
        </article>`
    },
    {
        num: 6,
        title: "Apex Capstone: The Full SaaS Dashboard Suite",
        desc: "The final graduation milestone: unite app shells, search, pricing tiers, and AI into one flagship app.",
        mission: "Build your flagship SaaS dashboard combining layout shells, live search, pricing, and AI insights!",
        concept_body: `<article class="concept-card">
            <h3><span>🏆</span> The Final Graduation Capstone</h3>
            <p>Congratulations on reaching the pinnacle of NoviCodes! In this grand milestone, you will unite everything you've built across all 10 levels:</p>
            <p>A modular app layout shell, snappy live search, dynamic pricing switcher, AI assistant panel, and system launch monitors into one complete, flagship SaaS application.</p>
        </article>`
    }
];


// =========================================================================
// 3. UPDATE HUBS (src/pages/7. partG, 8. partH, 9. partI)
// =========================================================================

function updateHub(hubPath, title, heroBadge, heroTitle, heroDesc, chapterTitle, lessons) {
    let content = fs.readFileSync(hubPath, 'utf-8');

    // Title
    content = content.replace(/title="[^"]*"/, `title="${title} | NoviCodes"`);

    // Hero Badge & Title & Subtitle
    content = content.replace(/<span class="hub-badge"[\s\S]*?<\/span>/, `<span class="hub-badge">${heroBadge}</span>`);
    content = content.replace(/<h1>[\s\S]*?<\/h1>/, `<h1>${heroTitle}</h1>`);
    content = content.replace(/<p>\s*Production React frontends[\s\S]*?<\/p>/, `<p>\n                ${heroDesc}\n            </p>`);
    content = content.replace(/<p>\s*Master how production React applications[\s\S]*?<\/p>/, `<p>\n                ${heroDesc}\n            </p>`);
    content = content.replace(/<p>\s*The ultimate frontend engineering milestone[\s\S]*?<\/p>/, `<p>\n                ${heroDesc}\n            </p>`);

    // Chapter Title
    content = content.replace(/<h2 class="chapter-title">[\s\S]*?<\/h2>/, `<h2 class="chapter-title">${chapterTitle}</h2>`);

    // Lesson Card Titles
    lessons.forEach((l, idx) => {
        const titleRegex = new RegExp(`<a href="[^"]*lesson${l.num}[^"]*"[\\s\\S]*?<h3 class="lesson-card-title">([\\s\\S]*?)<\\/h3>`);
        const match = content.match(titleRegex);
        if (match) {
            content = content.replace(match[0], match[0].replace(match[1], l.title));
        }
    });

    fs.writeFileSync(hubPath, content, 'utf-8');
    console.log(`✅ Updated Hub: ${hubPath}`);
}

updateHub(
    'src/pages/7. partG/hub.astro',
    'Async UI & Live Data Patterns (Level 8)',
    '🌉 Level 8 • Async UI & Live Data',
    'Make Your Apps Feel Fast, Smooth, and Alive',
    'Ever wonder how apps like YouTube, Instagram, and Linear never freeze or show ugly blank screens? In this level, you’ll learn the frontend secrets: showing smooth animated loading skeletons, handling offline errors with a friendly "Retry" button, making like buttons react instantly, and keeping data fresh with live updates!',
    'The 6 Async Frontend Projects',
    level8_friendly
);

updateHub(
    'src/pages/8. partH/hub.astro',
    'React Auth & Permission Gates (Level 9)',
    '🛡️ Level 9 • React Auth & Permissions',
    'Handle User Logins and Secure Member Views',
    'Every real web app has members, accounts, and private dashboards. In this level, you’ll learn how React apps manage active user sessions, share login info across every page with Context, lock down private views from visitors, and hide admin buttons from regular members!',
    'The 6 Auth & Permission Projects',
    level9_friendly
);

updateHub(
    'src/pages/9. partI/hub.astro',
    'SaaS UI & Design Systems (Level 10)',
    '🏆 Level 10 • SaaS UI & Design Systems',
    'Build a Complete, Polished SaaS Application',
    'This is your final graduation milestone! You’ll put together everything you’ve learned to build a stunning, production-ready SaaS product: a sleek navigation shell, snappy debounced search, an interactive pricing & upgrade table, and a smart AI copilot panel.',
    'The 6 SaaS Milestone Projects',
    level10_friendly
);


// =========================================================================
// 4. UPDATE ALL 18 LESSONS (src/pages/7. partG, 8. partH, 9. partI)
// =========================================================================

function updateLessons(dir, lessons, levelTag, hubTitle, hubIcon) {
    const jumpList = lessons.map(l => ({
        id: l.num,
        title: l.title,
        url: `/${path.basename(dir)}/lesson${l.num}/lesson${l.num}_remake.html`
    }));

    lessons.forEach(l => {
        const file = path.join(dir, `lesson${l.num}`, `lesson${l.num}_remake.astro`);
        let content = fs.readFileSync(file, 'utf-8');

        // 1. Jump Lessons
        const jumpRegex = /const jumpLessons = \[[\s\S]*?\];/;
        content = content.replace(jumpRegex, `const jumpLessons = ${JSON.stringify(jumpList, null, 4)};`);

        // 2. Props
        content = content.replace(/title="[^"]*"/, `title="${l.title} | ${levelTag}"`);
        content = content.replace(/description="[^"]*"/, `description="${l.desc}"`);
        content = content.replace(/levelTag="[^"]*"/, `levelTag="${levelTag}"`);
        content = content.replace(/lessonTitle="[^"]*"/, `lessonTitle="${l.title}"`);
        content = content.replace(/hubTitle="[^"]*"/, `hubTitle="${hubTitle}"`);
        content = content.replace(/hubIcon="[^"]*"/, `hubIcon="${hubIcon}"`);

        // 3. Intro Subtitle
        const introRegex = /<!-- Intro Slot -->\s*<p class="lesson-subtitle" slot="intro">[\s\S]*?<\/p>/;
        content = content.replace(introRegex, `<!-- Intro Slot -->\n    <p class="lesson-subtitle" slot="intro">\n        ${l.desc}\n    </p>`);

        // 4. Mission Target Goal
        const targetGoalRegex = /<div style="color: #475569; margin-top: 3px;">[\s\S]*?<\/div>/;
        content = content.replace(targetGoalRegex, `<div style="color: #475569; margin-top: 3px;">${l.mission}</div>`);

        // 5. Concept Body
        const conceptSlotRegex = /<!-- Analogy Explainer Card -->[\s\S]*?(?=<\/div>\s*<!-- Workspace \/ Editor Pane -->)/;
        content = content.replace(conceptSlotRegex, `<!-- Analogy Explainer Card -->\n        ${l.concept_body}\n    `);

        fs.writeFileSync(file, content, 'utf-8');
        console.log(`✅ Updated ${levelTag} Lesson ${l.num}: ${l.title}`);
    });
}

updateLessons('src/pages/7. partG', level8_friendly, "Level 8 • Async UI Architecture", "Level 8 Hub", "🌉");
updateLessons('src/pages/8. partH', level9_friendly, "Level 9 • React Auth & Access Control", "Level 9 Hub", "🛡️");
updateLessons('src/pages/9. partI', level10_friendly, "Level 10 • SaaS UI Architecture", "Level 10 Hub", "🏆");

console.log('\n🎉 Successfully applied friendly, easy-to-understand copywriting across all pages!');
