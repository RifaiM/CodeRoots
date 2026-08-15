import fs from 'fs';
import path from 'path';

// Master script to upgrade all 18 lessons in Levels 8, 9, 10

const l8_metadata = [
    {
        num: 1,
        title: "Async Data Fetching & Skeleton Loaders",
        desc: "Fetch asynchronous data in React with useEffect and render animated skeleton loading states.",
        mission: "Build a product catalog that renders an animated loading placeholder while awaiting asynchronous API data!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>In modern web applications, data does not load instantly. Network latency causes blank screens unless the frontend actively manages <strong>asynchronous loading states</strong>.</p>\n            <p>With React, we declare an <code>isLoading</code> boolean state. While <code>true</code>, we render a placeholder skeleton to indicate progress; once resolved, we render the live data.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>High-standard apps (like Stripe, YouTube, or Linear) never show empty blank screens. Showing a smooth skeleton loader improves <strong>Perceived Performance</strong> and keeps users engaged.</p>\n        </article>'
    },
    {
        num: 2,
        title: "Error Boundaries & HTTP Fallbacks",
        desc: "Catch failed network requests in React and render resilient retry UI states.",
        mission: "Build a resilient data widget that gracefully catches network failures and provides a 1-click retry button!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>Servers crash, Wi-Fi disconnects, and APIs return 500 errors. A robust React application must never crash when an API fails—it must catch errors and display a friendly fallback.</p>\n            <p>By tracking an <code>errorMessage</code> state, you can conditionally render a helpful error card with an action to retry the request.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>A white screen of death drives users away. Showing a clear message like <em>"Unable to load data. [Retry]"</em> gives users control and builds trust in your software.</p>\n        </article>'
    },
    {
        num: 3,
        title: "Controlled Form Mutations & Pending State",
        desc: "Handle form submission state, disable buttons during transmission, and process JSON payloads.",
        mission: "Build an interactive feedback form that disables the submit button and prevents duplicate requests while saving!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>When users submit a form, they frequently double-click buttons if there is no immediate visual confirmation. This can cause duplicate orders or double charges.</p>\n            <p>By toggling an <code>isSubmitting</code> state, you disable the button and show a <em>"Submitting..."</em> indicator until the server responds.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>Preventing duplicate form submissions is essential for e-commerce checkout flows, payment processing, and database integrity.</p>\n        </article>'
    },
    {
        num: 4,
        title: "Optimistic UI Updates & State Rollbacks",
        desc: "Update client UI immediately for zero perceived latency with rollback fallback on network error.",
        mission: "Build a responsive social like button that instantly updates on click before waiting for server confirmation!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p><strong>Optimistic UI</strong> is a frontend design pattern where the user interface updates <em>immediately</em> under the assumption that the server request will succeed.</p>\n            <p>Instead of making the user wait 300ms for a heart icon to turn red, you toggle it instantly in React state. If the network request fails, you roll it back to the previous state.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>Apps like Twitter, Instagram, and Discord feel incredibly fast because every like, reaction, and toggle uses Optimistic UI updates.</p>\n        </article>'
    },
    {
        num: 5,
        title: "Real-Time Polling & Sync Cleanup",
        desc: "Implement setInterval polling with proper useEffect cleanup to synchronize live metrics.",
        mission: "Build a live telemetry badge that polls for real-time server updates and cleans up timers on unmount!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>When WebSockets are not available, <strong>periodic polling</strong> with <code>setInterval</code> inside a <code>useEffect</code> hook allows frontends to fetch fresh server metrics periodically.</p>\n            <p><strong>Crucial Rule:</strong> You must always return a cleanup function <code>() => clearInterval(timer)</code> from <code>useEffect</code> to prevent background memory leaks when components unmount.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>Uncleaned intervals are one of the top causes of memory leaks and browser slowdowns in single-page applications. Proper cleanup is mandatory.</p>\n        </article>'
    },
    {
        num: 6,
        title: "Capstone: Reactive E-Commerce Dashboard",
        desc: "Assemble all 5 patterns into a production-grade e-commerce storefront dashboard.",
        mission: "Build a flagship e-commerce dashboard combining async loading, optimistic cart count, and live telemetry!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>This capstone brings together everything you learned in Level 8: async loading states, optimistic UI toggles, and live telemetry badges.</p>\n            <p>You are engineering a complete, responsive frontend application with resilient state management and instant visual feedback.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>Combining these data patterns into a single cohesive interface is exactly what senior frontend engineers build on top-tier engineering teams.</p>\n        </article>'
    }
];

const l9_metadata = [
    {
        num: 1,
        title: "Auth Token State & Client Session Storage",
        desc: "Manage authentication tokens in React state and handle login/logout transitions.",
        mission: "Build an authenticated login portal that stores auth credentials in state and renders the bearer session!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>In web security, a backend authentication server verifies user credentials and issues an <strong>access token</strong> (often a JWT).</p>\n            <p>The frontend React application receives this token, stores it in memory or client storage, and updates the application state to <code>authenticated</code>.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>In production, tokens are usually stored in <code>httpOnly</code> cookies for security against XSS. On the frontend, React tracks authentication status to dynamically render login screens or private app views.</p>\n        </article>'
    },
    {
        num: 2,
        title: "Global AuthContext & useAuth() Hook",
        desc: "Distribute authentication state across components using React Context without prop-drilling.",
        mission: "Build a global AuthContext provider that broadcasts the active user session and logout action across all components!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>Passing user information down through dozens of nested components is called <em>prop drilling</em> and makes code hard to maintain.</p>\n            <p>With <code>React.createContext()</code> and <code>AuthContext.Provider</code>, any component anywhere in your component tree can access <code>{ user, logout }</code> via <code>React.useContext()</code>.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>Every major React app (from Netflix to GitHub) uses Context or a state store (like Zustand or Redux) to manage global authentication state.</p>\n        </article>'
    },
    {
        num: 3,
        title: "Protected Route Guards & Redirects",
        desc: "Guard private application views and redirect unauthorized visitors to the login prompt.",
        mission: "Build a ProtectedRoute component that blocks unauthenticated access and renders private views only to logged-in users!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>A <strong>Protected Route</strong> acts as a security guard for your views. When a user navigates to <code>/dashboard</code> or <code>/settings</code>, the guard checks if an active session exists.</p>\n            <p>If authenticated, it renders the protected child view; if unauthenticated, it displays a login prompt or triggers a redirect.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>Route guards ensure private user data, billing settings, and administrative tools are never exposed to public visitors.</p>\n        </article>'
    },
    {
        num: 4,
        title: "User Directory State & Immutable Mutations",
        desc: "Manage an in-memory user directory with immutable state updates in React.",
        mission: "Build a user directory manager that immutably inserts new team members into React state!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>In React, state must always be treated as <strong>immutable</strong>. When adding a new item to an array, you never use <code>users.push()</code>.</p>\n            <p>Instead, you create a brand new array using the spread operator: <code>setUsers([...users, newUser])</code>. This ensures React detects the change and triggers a re-render.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>Directly mutating arrays or objects causes silent bugs where React components fail to update. Immutability is the golden rule of React state.</p>\n        </article>'
    },
    {
        num: 5,
        title: "Role-Based Access Control (RBAC) UI Gates",
        desc: "Conditionally render administrative actions and destructive controls based on user roles.",
        mission: "Build an RBAC permission gate that reveals admin-only actions (like delete and manage) exclusively to administrators!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p><strong>Role-Based Access Control (RBAC)</strong> assigns permissions to user roles (e.g. <code>admin</code>, <code>editor</code>, <code>viewer</code>).</p>\n            <p>On the frontend, we use conditional rendering to show or hide sensitive buttons: <code>{user.role === \'admin\' && &lt;button&gt;Delete Project&lt;/button&gt;}</code>.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>While the backend always enforces final API authorization, the frontend UI must provide a clean experience by hiding buttons users do not have permission to use.</p>\n        </article>'
    },
    {
        num: 6,
        title: "Capstone: Secure Workspace with Role Guards",
        desc: "Assemble a multi-user team dashboard with user switching, protected views, and RBAC gates.",
        mission: "Build a flagship team workspace that dynamically switches user roles and enforces permission guards!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>This capstone combines all Level 9 security concepts: token state, global AuthContext, protected route guards, and role-based access control.</p>\n            <p>You are building a complete multi-user workspace where switching roles immediately recalculates access privileges across the entire interface.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>Enterprise SaaS applications like Slack, Notion, and Jira are built on this exact architecture to manage thousands of enterprise team members safely.</p>\n        </article>'
    }
];

const l10_metadata = [
    {
        num: 1,
        title: "Modular SaaS Layout Shell & Navigation",
        desc: "Architect a modular enterprise application layout with responsive navigation and content slots.",
        mission: "Build a modular SaaS RootLayout shell with branding headers and responsive children viewports!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>Enterprise SaaS applications (like Linear or Stripe) use <strong>Modular Layout Shells</strong>. The navigation bar, header, and user avatar stay persistent while internal page content updates.</p>\n            <p>In React, layout components accept <code>{children}</code> and wrap them with standard structural framing.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>Layout components ensure design consistency across dozens of pages while eliminating duplicated navigation and header code.</p>\n        </article>'
    },
    {
        num: 2,
        title: "Debounced Live Search & Multi-Filter Pipelines",
        desc: "Filter high-frequency datasets smoothly with client-side query state and debouncing.",
        mission: "Build an instant search pipeline that filters datasets smoothly as users type into the search box!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>When searching through lists, recalculating filters on every single keystroke can freeze the browser if the dataset is large.</p>\n            <p>Using controlled query state combined with case-insensitive filtering: <code>item.name.toLowerCase().includes(query.toLowerCase())</code> creates a snappy search experience.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>Fast client-side filtering makes dashboards feel instantaneous and delightful for users managing large volumes of items.</p>\n        </article>'
    },
    {
        num: 3,
        title: "Subscription Tier Switcher & Billing UI",
        desc: "Architect a dynamic pricing switcher with plan upgrades, discount calculations, and reactive state.",
        mission: "Build an interactive SaaS pricing card that dynamically toggles between Free and PRO subscription tiers!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>Every commercial SaaS product requires a high-converting pricing page that highlights plan tiers, features, and pricing changes.</p>\n            <p>In React, we manage the active tier state (<code>\'free\'</code> vs <code>\'pro\'</code>) and conditionally update badge colors, feature lists, and button CTAs.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>Pricing and billing interfaces directly drive revenue. Clear visual states and instant feedback improve conversion rates.</p>\n        </article>'
    },
    {
        num: 4,
        title: "Interactive AI Copilot & Insights Panel",
        desc: "Build an AI copilot panel with loading animations and simulated streaming insights.",
        mission: "Build an AI insights generator panel that shows a thinking animation and renders structured AI summaries!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>Modern web applications increasingly embed AI copilots to assist users. The frontend must handle the generation lifecycle: trigger ➔ thinking state ➔ formatted response.</p>\n            <p>By toggling an <code>isGenerating</code> state, you display a pulsing animation while the AI models process the prompt, then render the structured insights.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>Clear loading and generation states prevent user confusion when interacting with large language model APIs.</p>\n        </article>'
    },
    {
        num: 5,
        title: "Production Readiness Audit & Pre-Flight Dashboard",
        desc: "Build an interactive launch checklist dashboard that tracks system configuration switches.",
        mission: "Build an interactive pre-flight checklist dashboard that validates system settings before production launch!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>Enterprise platforms often feature pre-flight checklists to ensure all production prerequisites (CORS, SSL, API keys) are configured before launch.</p>\n            <p>By computing an <code>isReady</code> boolean derived from individual configuration state switches, the UI provides clear green/red status badges.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>Deriving overall system readiness directly from granular state properties prevents manual validation errors before major deployments.</p>\n        </article>'
    },
    {
        num: 6,
        title: "Apex Capstone: Enterprise SaaS Dashboard Suite",
        desc: "Assemble a flagship enterprise SaaS application integrating layout shells, search filters, billing, and AI.",
        mission: "Build the ultimate enterprise SaaS dashboard integrating navigation, search, billing tiers, and AI insights!",
        concept: '<article class="concept-card">\n            <h3><span>💡</span> Core Concept &amp; Mental Model</h3>\n            <p>This is the apex capstone of CodeRoots. You are uniting every production pattern you have mastered across all 10 levels:</p>\n            <p>Modular layout shells, debounced search filters, subscription tier switchers, AI copilot insights, and system readiness monitors into one flagship dashboard.</p>\n        </article>\n        <article class="concept-card">\n            <h3><span>🏢</span> Why This Matters in Production</h3>\n            <p>Building and shipping a full-featured dashboard with clean component architecture is the hallmark of a Senior Frontend Engineer.</p>\n        </article>'
    }
];

const level8Jumps = l8_metadata.map(m => ({ id: m.num, title: m.title, url: `/7. partG/lesson${m.num}/lesson${m.num}_remake.html` }));
const level9Jumps = l9_metadata.map(m => ({ id: m.num, title: m.title, url: `/8. partH/lesson${m.num}/lesson${m.num}_remake.html` }));
const level10Jumps = l10_metadata.map(m => ({ id: m.num, title: m.title, url: `/9. partI/lesson${m.num}/lesson${m.num}_remake.html` }));

function updateLevelLessons(baseDir, metadataList, jumpList, levelTag, hubTitle, hubIcon) {
    metadataList.forEach(meta => {
        const file = path.join(baseDir, `lesson${meta.num}`, `lesson${meta.num}_remake.astro`);
        if (!fs.existsSync(file)) {
            console.error(`❌ Not found: ${file}`);
            return;
        }

        let content = fs.readFileSync(file, 'utf-8');

        // 1. Update jumpLessons JSON array in frontmatter
        const jumpRegex = /const jumpLessons = \[[\s\S]*?\];/;
        const newJumpCode = `const jumpLessons = ${JSON.stringify(jumpList, null, 4)};`;
        content = content.replace(jumpRegex, newJumpCode);

        // 2. Update LessonLayout props
        content = content.replace(/title="[^"]*"/, `title="${meta.title} | ${levelTag}"`);
        content = content.replace(/description="[^"]*"/, `description="${meta.desc}"`);
        content = content.replace(/levelTag="[^"]*"/, `levelTag="${levelTag}"`);
        content = content.replace(/lessonTitle="[^"]*"/, `lessonTitle="${meta.title}"`);
        content = content.replace(/hubTitle="[^"]*"/, `hubTitle="${hubTitle}"`);
        content = content.replace(/hubIcon="[^"]*"/, `hubIcon="${hubIcon}"`);

        // 3. Update intro slot paragraph
        const introRegex = /<!-- Intro Slot -->\s*<p class="lesson-subtitle" slot="intro">[\s\S]*?<\/p>/;
        const newIntro = `<!-- Intro Slot -->
    <p class="lesson-subtitle" slot="intro">
        ${meta.desc}
    </p>`;
        content = content.replace(introRegex, newIntro);

        // 4. Update Target Goal text in mission card
        const targetGoalRegex = /<div style="color: #475569; margin-top: 3px;">[\s\S]*?<\/div>/;
        content = content.replace(targetGoalRegex, `<div style="color: #475569; margin-top: 3px;">${meta.mission}</div>`);

        // 5. Replace Analogy / Concept cards after mission card
        const conceptSlotRegex = /<!-- Analogy Explainer Card -->[\s\S]*?(?=<\/div>\s*<!-- Workspace \/ Editor Pane -->)/;
        const newConceptSlot = `<!-- Analogy Explainer Card -->
        ${meta.concept}\n    `;
        content = content.replace(conceptSlotRegex, newConceptSlot);

        fs.writeFileSync(file, content, 'utf-8');
        console.log(`✅ Upgraded ${levelTag} Lesson ${meta.num}: ${meta.title}`);
    });
}

// Execute updates
updateLevelLessons('src/pages/7. partG', l8_metadata, level8Jumps, "Level 8 • Async UI Architecture", "Level 8 Hub", "🌉");
updateLevelLessons('src/pages/8. partH', l9_metadata, level9Jumps, "Level 9 • React Auth & Access Control", "Level 9 Hub", "🛡️");
updateLevelLessons('src/pages/9. partI', l10_metadata, level10Jumps, "Level 10 • SaaS UI Architecture", "Level 10 Hub", "🏆");

console.log('\n🎉 All 18 lessons successfully upgraded with honest, production-accurate curriculum!');
