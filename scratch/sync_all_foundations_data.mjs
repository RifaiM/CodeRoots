import fs from 'fs';

// 1. level1_html.js
let l1 = fs.readFileSync('public/data/level1_html.js', 'utf-8');
l1 = l1.replace(/"title":\s*"[^"]*"/, '"title": "Level 1: HTML5 Structural Foundations"');
l1 = l1.replace(/"subtitle":\s*"[^"]*"/, '"subtitle": "The Structural Blueprint & Semantic Architecture of the Web"');
l1 = l1.replace(/"nextTrackName":\s*"[^"]*"/, '"nextTrackName": "Level 2: Modern CSS3 Styling & Layouts"');
fs.writeFileSync('public/data/level1_html.js', l1, 'utf-8');

// 2. level2_css.js
let l2 = fs.readFileSync('public/data/level2_css.js', 'utf-8');
l2 = l2.replace(/"title":\s*"[^"]*"/, '"title": "Level 2: Modern CSS3 Styling & Layouts"');
l2 = l2.replace(/"subtitle":\s*"[^"]*"/, '"subtitle": "Box Model Geometry, Flexbox Alignment & Grid Layouts"');
l2 = l2.replace(/"nextTrackName":\s*"[^"]*"/, '"nextTrackName": "Level 3: Modern JavaScript (ES6+) Foundations"');
fs.writeFileSync('public/data/level2_css.js', l2, 'utf-8');

// 3. level3_js.js
let l3 = fs.readFileSync('public/data/level3_js.js', 'utf-8');
l3 = l3.replace(/"title":\s*"[^"]*"/, '"title": "Level 3: Modern JavaScript (ES6+) Foundations"');
l3 = l3.replace(/"subtitle":\s*"[^"]*"/, '"subtitle": "Variables, Functions, DOM Manipulation & Event Handlers"');
l3 = l3.replace(/"nextTrackUrl":\s*"[^"]*"/, '"nextTrackUrl": "../2. partB/hub.html"');
l3 = l3.replace(/"nextTrackName":\s*"[^"]*"/, '"nextTrackName": "Level 4: Interactive DOM Dojo"');
fs.writeFileSync('public/data/level3_js.js', l3, 'utf-8');

// 4. level5_react.js
let l5 = fs.readFileSync('public/data/level5_react.js', 'utf-8');
l5 = l5.replace(/"title":\s*"[^"]*"/, '"title": "Level 5: React & Modern UI Foundations"');
l5 = l5.replace(/"subtitle":\s*"[^"]*"/, '"subtitle": "Modular Component Trees, Props & Reactive State"');
l5 = l5.replace(/"nextTrackName":\s*"[^"]*"/, '"nextTrackName": "Level 6: Python & Server Logic Foundations"');
fs.writeFileSync('public/data/level5_react.js', l5, 'utf-8');

// 5. level6_python.js
let l6 = fs.readFileSync('public/data/level6_python.js', 'utf-8');
l6 = l6.replace(/"title":\s*"[^"]*"/, '"title": "Level 6: Python & Server Logic Foundations"');
l6 = l6.replace(/"subtitle":\s*"[^"]*"/, '"subtitle": "Indentation, Server Logic & Core Data Structures"');
l6 = l6.replace(/"nextTrackName":\s*"[^"]*"/, '"nextTrackName": "Level 7A: Cloud & Deployment Foundations"');
fs.writeFileSync('public/data/level6_python.js', l6, 'utf-8');

// 6. level7a_cloud.js
let l7a = fs.readFileSync('public/data/level7a_cloud.js', 'utf-8');
l7a = l7a.replace(/"title":\s*"[^"]*"/, '"title": "Level 7A: Cloud & Deployment Foundations"');
l7a = l7a.replace(/"subtitle":\s*"[^"]*"/, '"subtitle": "Static Hosting, Serverless, Containers & CI/CD Pipelines"');
l7a = l7a.replace(/"nextTrackName":\s*"[^"]*"/, '"nextTrackName": "Level 7B: SQL & Database Foundations"');
l7a = l7a.replace(/Interact with the simulated Cloud & CI\/CD Pipeline below/g, "Interact with the simulated in-browser Cloud & CI/CD deployment pipeline below");
fs.writeFileSync('public/data/level7a_cloud.js', l7a, 'utf-8');

// 7. level7b_sql.js
let l7b = fs.readFileSync('public/data/level7b_sql.js', 'utf-8');
l7b = l7b.replace(/"title":\s*"[^"]*"/, '"title": "Level 7B: SQL & Database Foundations"');
l7b = l7b.replace(/"subtitle":\s*"[^"]*"/, '"subtitle": "Relational Schemas, Primary Keys & SQL Queries"');
l7b = l7b.replace(/"nextTrackName":\s*"[^"]*"/, '"nextTrackName": "Level 7C: Next.js & UI Architecture Foundations"');
l7b = l7b.replace(/An enterprise-grade, open-source relational database management system renowned for reliability, ACID compliance, and performance\./g, "A popular, reliable open-source relational database management system renowned for data integrity and performance.");
fs.writeFileSync('public/data/level7b_sql.js', l7b, 'utf-8');

// 8. level7c_nextjs.js
let l7c = fs.readFileSync('public/data/level7c_nextjs.js', 'utf-8');
l7c = l7c.replace(/"title":\s*"[^"]*"/, '"title": "Level 7C: Next.js & UI Architecture Foundations"');
l7c = l7c.replace(/"subtitle":\s*"[^"]*"/, '"subtitle": "App Router, Page Layouts, Server Rendering & Client UI"');
l7c = l7c.replace(/"nextTrackName":\s*"[^"]*"/, '"nextTrackName": "Level 8: Async UI & Live Data Foundations"');
l7c = l7c.replace(/Next\.js is a fullstack React framework/g, "Next.js is a modern React web framework with server rendering");
l7c = l7c.replace(/and fullstack capabilities\./g, "and backend API route capabilities.");
l7c = l7c.replace(/"category":\s*"Fullstack API"/g, '"category": "API Routes"');
fs.writeFileSync('public/data/level7c_nextjs.js', l7c, 'utf-8');

// 9. level8_async.js
let l8 = fs.readFileSync('public/data/level8_async.js', 'utf-8');
l8 = l8.replace(/"title":\s*"[^"]*"/, '"title": "Level 8: Async UI & Live Data Foundations"');
l8 = l8.replace(/"subtitle":\s*"[^"]*"/, '"subtitle": "Skeleton Loaders, Error States & Optimistic Updates"');
l8 = l8.replace(/"nextTrackName":\s*"[^"]*"/, '"nextTrackName": "Level 9: User Logins & Security UI Foundations"');
fs.writeFileSync('public/data/level8_async.js', l8, 'utf-8');

// 10. level9_auth.js
let l9 = fs.readFileSync('public/data/level9_auth.js', 'utf-8');
l9 = l9.replace(/"title":\s*"[^"]*"/, '"title": "Level 9: User Logins & Security UI Foundations"');
l9 = l9.replace(/"subtitle":\s*"[^"]*"/, '"subtitle": "Login Tokens, Auth Sessions, Route Guards & Role Permissions"');
l9 = l9.replace(/"nextTrackName":\s*"[^"]*"/, '"nextTrackName": "Level 10: SaaS Dashboard UI Foundations"');
fs.writeFileSync('public/data/level9_auth.js', l9, 'utf-8');

// 11. level10_saas.js
let l10 = fs.readFileSync('public/data/level10_saas.js', 'utf-8');
l10 = l10.replace(/"title":\s*"[^"]*"/, '"title": "Level 10: SaaS Dashboard UI Foundations"');
l10 = l10.replace(/"subtitle":\s*"[^"]*"/, '"subtitle": "Sidebar Navigation, Live Search, Pricing Tables & AI Chat Panels"');
l10 = l10.replace(/"nextTrackUrl":\s*"[^"]*"/, '"nextTrackUrl": "../9. partI/hub.html"');
l10 = l10.replace(/"nextTrackName":\s*"[^"]*"/, '"nextTrackName": "Level 10: SaaS Dashboard UI Suite"');
l10 = l10.replace(/AI Copilot Drawer Architecture/g, "AI Chat Assistant & Insights Panel");
l10 = l10.replace(/Slide-Out Copilot Drawer/g, "Slide-Out AI Insights Panel");
l10 = l10.replace(/"term":\s*"AI Copilot Drawer"/g, '"term": "AI Chat Assistant & Insights Panel"');
l10 = l10.replace(/<CopilotDrawer/g, "<AIAssistantDrawer");
l10 = l10.replace(/AI Copilot helper drawer/g, "AI Chat Assistant & Insights Panel");
l10 = l10.replace(/<!-- AI Copilot Panel -->/g, "<!-- AI Chat Assistant & Insights Panel -->");
l10 = l10.replace(/🤖 AI Copilot Insights/g, "🤖 AI Insights & Recommendations");
fs.writeFileSync('public/data/level10_saas.js', l10, 'utf-8');

console.log('✅ All 11 data files synchronized successfully!');
