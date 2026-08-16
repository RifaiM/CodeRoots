/**
 * NoviCodes - Level 10: SaaS UI Architecture & Design Systems Foundations Data Module
 */
window.LEVEL10_SAAS_DATA = {
    "id": "level10_saas",
    "title": "Level 10: SaaS UI Foundations",
    "subtitle": "The Modern Skyscraper Shell: Design Systems, Instant Search, Pricing & AI Panels",
    "badgeIcon": "🏆",
    "xpReward": 500,
    "trackKey": "saas",
    "nextTrackUrl": "./9. partI/hub.html",
    "nextTrackName": "Level 10 Apex Capstone Dojo",
    "concepts": {
        "heroAnalogy": {
            "title": "A SaaS Application is Like a High-End Commercial Skyscraper",
            "description": "Software as a Service (SaaS) is how modern software businesses (like Figma, Notion, Slack, and Stripe) operate. Instead of selling a DVD disc once, you host a modern digital skyscraper. Every customer rents their own private office suite (Multi-Tenancy), but they all share the same high-speed elevators (Navigation App Shell), security desk (Auth), and premium interior design standards (Design Systems)!",
            "icon": "🏆"
        },
        "sections": [
            {
                "title": "1. The SaaS App Shell: Sidebar Navigation & Master Layouts",
                "content": `
                <p>Every professional SaaS application shares a common layout blueprint called the <strong>App Shell</strong>:</p>
                <ul>
                    <li><strong>Collapsible Sidebar:</strong> Houses primary navigation links, organization switcher, and collapsed icon mode for smaller screens.</li>
                    <li><strong>Universal Top Bar:</strong> Contains global search (<code>Cmd+K</code>), notification bell with unread counters, and the user profile dropdown.</li>
                    <li><strong>Content Workspace:</strong> The main responsive stage where business metrics, tables, and workflows reside.</li>
                </ul>
                <p><strong>💡 Design Rule:</strong> The App Shell stays locked and persistent across page transitions so users never experience a disorienting full-page flash.</p>
                `
            },
            {
                "title": "2. Debounced Live Search: Filtering Without Lag",
                "content": `
                <p>What happens if a user types <em>\"Alex\"</em> into a search bar that queries an API on every single keystroke?</p>
                <p>The browser sends 4 separate network requests in 200 milliseconds (<code>'A'</code>, <code>'Al'</code>, <code>'Ale'</code>, <code>'Alex'</code>), wasting server bandwidth and causing race conditions.</p>
                <p><strong>The Debounce Solution:</strong> A <strong>Debounce Timer (typically 300ms)</strong> waits until the user stops typing for 300ms before triggering the search query, making search feel instant and effortless!</p>
                `
            },
            {
                "title": "3. Interactive Pricing & Subscription Logic (Monthly vs Annual)",
                "content": `
                <p>How do SaaS companies convert visitors into paying customers? With a dynamic <strong>Billing Tier Switcher</strong>:</p>
                <div class="code-explain-box">
                    <pre><code>function PricingCard({ isAnnual }) {
  // Save 20% discount on Annual plans!
  const price = isAnnual ? 19 : 24;
  const billingCycle = isAnnual ? '/mo (billed annually)' : '/mo';

  return (
    &lt;div className="plan-card"&gt;
      &lt;h3&gt;Pro Plan&lt;/h3&gt;
      &lt;div className="price"&gt;\${price}&lt;span&gt;{billingCycle}&lt;/span&gt;&lt;/div&gt;
      {isAnnual && &lt;span className="badge-save"&gt;🎉 Save 20%&lt;/span&gt;}
    &lt;/div&gt;
  );
}</code></pre>
                </div>
                `
            },
            {
                "title": "4. AI Copilot Drawer Architecture",
                "content": `
                <p>In 2026, top SaaS products incorporate intelligent AI assistants directly into their interface as a <strong>Slide-Out Copilot Drawer</strong>:</p>
                <ul>
                    <li><strong>Context Awareness:</strong> The assistant knows which project or team settings you are currently looking at.</li>
                    <li><strong>Streamed Responses:</strong> Shows letters appearing in real time using Server-Sent Events (SSE).</li>
                    <li><strong>Action Suggestions:</strong> One-click pill prompts (e.g. <em>\"Audit Security Settings\"</em> or <em>\"Draft Team Invitation\"</em>) that trigger workflows instantly.</li>
                </ul>
                `
            }
        ]
    },
    "glossary": [
        {
            "term": "SaaS (Software as a Service)",
            "category": "Business Model",
            "definition": "A software licensing and delivery model in which software is centrally hosted in the cloud and accessed via web browsers on a subscription basis.",
            "analogy": "Renting a modern fully serviced apartment instead of building a brick house from scratch.",
            "codeSnippet": "https://app.mysaas.com/dashboard"
        },
        {
            "term": "Design System",
            "category": "UI Engineering",
            "definition": "A comprehensive set of reusable components, design tokens (colors, typography, spacing), and standards used to build cohesive software.",
            "analogy": "An architectural standard guide specifying exact brick dimensions, paint codes, and door handles.",
            "codeSnippet": ":root { --primary-blue: #2563eb; --radius-card: 14px; }"
        },
        {
            "term": "App Shell",
            "category": "Layout",
            "definition": "The minimal HTML, CSS, and JavaScript required to power the static user interface skeleton (sidebar, navbar, framing) of a web application.",
            "analogy": "The structural steel framework of a high-rise office building.",
            "codeSnippet": "<div className=\"saas-app-shell\"><Sidebar /><Main /></div>"
        },
        {
            "term": "Debounce",
            "category": "Performance",
            "definition": "A programming pattern that limits the rate at which a function can fire, waiting until a delay period has elapsed since the last call.",
            "analogy": "Waiting for everyone to step into an elevator before closing the doors and moving.",
            "codeSnippet": "useEffect(() => { const t = setTimeout(search, 300); return () => clearTimeout(t); }, [query]);"
        },
        {
            "term": "Multi-Tenancy",
            "category": "Architecture",
            "definition": "A software architecture where a single software instance serves multiple distinct customer organizations (tenants) with complete data isolation.",
            "analogy": "An apartment building where tenants share plumbing and elevators, but have private keys to their own rooms.",
            "codeSnippet": "WHERE tenant_id = 'org_402'"
        },
        {
            "term": "Billing Tier Switcher",
            "category": "Growth UX",
            "definition": "An interactive toggle UI that dynamically recalculates subscription prices between monthly and discounted annual billing.",
            "analogy": "A discount pass at a gym offering 20% off if you pay for the full year upfront.",
            "codeSnippet": "const [isAnnual, setIsAnnual] = useState(true);"
        },
        {
            "term": "AI Copilot Drawer",
            "category": "AI UX",
            "definition": "A collapsible slide-out drawer interface that provides contextual AI analysis, automated insights, and guided workflows.",
            "analogy": "A smart digital co-pilot sitting in the passenger seat offering navigation tips.",
            "codeSnippet": "<CopilotDrawer isOpen={isOpen} contextData={project} />"
        },
        {
            "term": "Pre-Flight Audit",
            "category": "Reliability",
            "definition": "An automated verification check that scans an application's configuration, database connections, and security settings before launch.",
            "analogy": "A pilot's pre-flight checklist verifying engines and instruments before takeoff.",
            "codeSnippet": "const isReady = auditChecks.every(check => check.passed);"
        }
    ],
    "sandbox": {
        "instructions": "Test the live SaaS App Shell simulator below! Toggle the annual pricing discount, type in the live search bar, and open the AI Copilot helper drawer.",
        "initialHTML": `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>SaaS Dashboard Simulator</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      padding: 14px;
      margin: 0;
    }
    .saas-container {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 14px;
      padding: 18px;
      max-width: 480px;
      margin: 0 auto;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .saas-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #334155;
    }
    .badge-org {
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid #f59e0b;
      color: #fcd34d;
      font-size: 0.75rem;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 6px;
    }
    .search-input {
      width: 100%;
      background: #0f172a;
      border: 1px solid #334155;
      color: white;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 0.85rem;
      box-sizing: border-box;
      margin-bottom: 14px;
    }
    .billing-toggle-box {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }
    .btn-toggle {
      background: #f59e0b;
      color: #0f172a;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: 800;
      font-size: 0.8rem;
      cursor: pointer;
    }
    .copilot-card {
      background: linear-gradient(135deg, #1e1b4b 0%, #311042 100%);
      border: 1px solid #6366f1;
      border-radius: 10px;
      padding: 12px;
    }
  </style>
</head>
<body>
  <div class="saas-container">
    <div class="saas-header">
      <div style="font-weight: 800; font-size: 1rem;">🚀 SaaS App Suite</div>
      <span class="badge-org">👑 Enterprise Plan</span>
    </div>

    <!-- Live Search -->
    <input type="text" class="search-input" id="saasSearch" placeholder="🔍 Search projects & team members..." oninput="handleSearch(this.value)" />
    <div id="searchOutput" style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 14px;">Showing all 4 active workspace projects.</div>

    <!-- Billing Tier Switcher -->
    <div class="billing-toggle-box">
      <div>
        <div style="font-weight: 700; font-size: 0.85rem;" id="billingPlanName">Pro Team • $24 / mo</div>
        <div style="font-size: 0.75rem; color: #94a3b8;" id="billingDiscount">Monthly Billing</div>
      </div>
      <button class="btn-toggle" onclick="toggleBilling()">Switch Billing</button>
    </div>

    <!-- AI Copilot Panel -->
    <div class="copilot-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span style="font-weight: 800; font-size: 0.85rem; color: #a5b4fc;">🤖 AI Copilot Insights</span>
        <span style="font-size: 0.7rem; color: #4ade80;">🟢 Live</span>
      </div>
      <p id="aiPromptOutput" style="font-size: 0.82rem; color: #e0e7ff; margin: 0; line-height: 1.4;">
        "All systems operational. Zero memory leaks detected. Ready for Level 10 graduation deployment!"
      </p>
    </div>
  </div>

  <script>
    let isAnnual = false;
    function toggleBilling() {
      isAnnual = !isAnnual;
      document.getElementById('billingPlanName').textContent = isAnnual ? 'Pro Team • $19 / mo' : 'Pro Team • $24 / mo';
      document.getElementById('billingDiscount').textContent = isAnnual ? '🎉 Annual Billing (Save 20%!)' : 'Monthly Billing';
    }

    let searchTimer;
    function handleSearch(val) {
      clearTimeout(searchTimer);
      document.getElementById('searchOutput').textContent = '⏳ Debouncing input...';
      searchTimer = setTimeout(() => {
        document.getElementById('searchOutput').textContent = val ? 'Filter query: "' + val + '" (Found 2 matching records)' : 'Showing all 4 active workspace projects.';
      }, 250);
    }
  </script>
</body>
</html>`
    },
    "quizzes": [
        {
            "id": "saas_q1",
            "question": "What is the primary benefit of Debouncing live search inputs in a web application?",
            "options": [
                "It waits until the user pauses typing before sending requests, preventing excessive API queries and lag.",
                "It automatically corrects spelling mistakes in English.",
                "It encrypts the user's monitor screen.",
                "It changes the website background to black."
            ],
            "correctIndex": 0,
            "explanation": "Debouncing delays function execution until a pause in typing occurs, reducing redundant network requests and keeping the browser snappy."
        },
        {
            "id": "saas_q2",
            "question": "In modern SaaS UI engineering, what is the role of the 'App Shell'?",
            "options": [
                "To provide a persistent layout frame (sidebar, top bar) that doesn't flash or reload during navigation.",
                "To sell physical merchandise.",
                "To store files on floppy disks.",
                "To format Excel spreadsheets."
            ],
            "correctIndex": 0,
            "explanation": "The App Shell maintains the static user interface framing across page transitions, ensuring seamless navigation without disorienting full-page reloads."
        },
        {
            "id": "saas_q3",
            "question": "What is Multi-Tenancy in software architecture?",
            "options": [
                "An architecture where a single cloud system securely hosts multiple distinct customer companies with strict data isolation.",
                "A computer with 5 keyboards plugged in at the same time.",
                "A website that only runs on weekends.",
                "A type of CSS animation."
            ],
            "correctIndex": 0,
            "explanation": "Multi-tenancy allows a single SaaS infrastructure to serve multiple customer organizations while strictly isolating their private data and users."
        }
    ]
};
