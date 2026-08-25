/**
 * NoviCodes - Level 7C: Next.js & Server Components Foundations Data Module
 */
window.LEVEL7C_NEXTJS_DATA = {
 "id": "level7c_nextjs",
 "title": "Level 7C: Next.js & UI Architecture Foundations",
 "subtitle": "App Router, Page Layouts, Server Rendering & Client UI",
 "badgeIcon": "",
 "xpReward": 300,
 "trackKey": "nextjs",
 "nextTrackUrl": "./foundations.html?track=async",
 "nextTrackName": "Level 8: Async UI & Live Data Foundations",
 "concepts": {
 "heroAnalogy": {
 "title": "Next.js is Like a High-End Restaurant with Both Hot Ready Buffets & Custom Cook-to-Order Dishes",
 "description": "Traditional single-page React apps make visitors download a massive empty JavaScript file and wait for the browser to construct the page from scratch (like giving a customer raw ingredients and a stove). Next.js is a modern React web framework with server rendering that cooks the meal on the server first, serving instant, fully-formed HTML to the user and Google search engines in milliseconds, then seamlessly attaching React click interactivity (Hydration)!",
 "icon": ""
 },
 "sections": [
 {
 "title": "1. CSR vs SSR: The Empty Plate Problem",
 "content": `
 <p>Why do developers choose Next.js over plain vanilla React?</p>
 <ul>
 <li><strong>Client-Side Rendering (CSR - Plain React):</strong> The server sends a nearly empty <code>&lt;div id=\"root\"&gt;&lt;/div&gt;</code> and a giant 5MB JavaScript file. The user sees a blank white screen until the JavaScript finishes downloading and executing. Bad for slow phones and SEO!</li>
 <li><strong>Server-Side Rendering (SSR - Next.js):</strong> The server runs React ahead of time, fills the HTML with text and images, and delivers a complete page in <strong>50 milliseconds</strong>. Google bots can index every word instantly!</li>
 </ul>
 `
 },
 {
 "title": "2. The App Router: Folders as URLs",
 "content": `
 <p>In Next.js, you don't need complex routing libraries. The <strong>folder structure inside <code>app/</code> automatically defines your website's URLs</strong>:</p>
 <div class="code-explain-box">
 <pre><code>app/
├── page.tsx mysite.com (Home Page)
├── about/
│ └── page.tsx mysite.com/about
└── blog/
 └── [slug]/
 └── page.tsx mysite.com/blog/react-guide (Dynamic URL!)</code></pre>
 </div>
 <p><strong> Dynamic Routes <code>[slug]</code>:</strong> Brackets in folder names allow you to capture dynamic parameters from the URL automatically!</p>
 `
 },
 {
 "title": "3. Server Components (RSC) vs Client Components ('use client')",
 "content": `
 <p>By default in Next.js, every component is a <strong>Server Component</strong>. It runs purely on the server and sends <strong>ZERO JavaScript</strong> to the user's browser!</p>
 <p>When you need interactive features like <code>useState</code>, <code>onClick</code>, or <code>useEffect</code>, you simply add the <code>"use client"</code> directive at the top of the file:</p>
 <div class="code-explain-box">
 <pre><code>// 1. Server Component (Fast, talks directly to database)
export default async function ProductPage() {
 const products = await db.products.findMany();
 return &lt;div&gt;{products.map(p =&gt; &lt;p&gt;{p.name}&lt;/p&gt;)}&lt;/div&gt;;
}

// 2. Client Component (Interactive button)
'use client';
import { useState } from 'react';
export function AddToCartBtn() {
 const [added, setAdded] = useState(false);
 return &lt;button onClick={() =&gt; setAdded(true)}&gt;Add&lt;/button&gt;;
}</code></pre>
 </div>
 `
 },
 {
 "title": "4. Server Actions: Calling the Server without Writing API Boilerplate",
 "content": `
 <p>Traditionally, saving a form required writing an Express API route, setting up a <code>fetch('/api/save')</code> POST request, handling headers, and parsing JSON.</p>
 <p>In Next.js, <strong>Server Actions</strong> allow you to define asynchronous functions with <code>'use server'</code> that run directly on your backend when a user submits a form:</p>
 <div class="code-explain-box">
 <pre><code>// Inside your component:
async function handleCreateUser(formData: FormData) {
 'use server'; // This runs securely on your server!
 const email = formData.get('email');
 await db.users.create({ data: { email } });
}

return (
 &lt;form action={handleCreateUser}&gt;
 &lt;input name="email" type="email" /&gt;
 &lt;button type="submit"&gt;Sign Up&lt;/button&gt;
 &lt;/form&gt;
);</code></pre>
 </div>
 `
 }
 ]
 },
 "glossary": [
 {
 "term": "Next.js",
 "category": "Framework",
 "definition": "The leading production React framework that enables hybrid static and server rendering, smart routing, and backend API route capabilities.",
 "analogy": "A fully equipped professional restaurant kitchen built on top of React's modular tools.",
 "codeSnippet": "npx create-next-app@latest"
 },
 {
 "term": "Server-Side Rendering (SSR)",
 "category": "Rendering",
 "definition": "Rendering React components into static HTML on the web server on each incoming request before sending it to the client browser.",
 "analogy": "A chef cooking a hot meal in the kitchen and serving it ready-to-eat.",
 "codeSnippet": "export default async function Page() { ... }"
 },
 {
 "term": "Static Site Generation (SSG)",
 "category": "Rendering",
 "definition": "Pre-building all HTML pages at build time so they can be cached globally on CDNs for instant loading.",
 "analogy": "Pre-printing thousands of newspapers at 4:00 AM ready for instant morning delivery.",
 "codeSnippet": "export const dynamic = 'force-static';"
 },
 {
 "term": "Hydration",
 "category": "React Lifecycle",
 "definition": "The process where React in the client browser attaches event listeners to pre-rendered HTML received from the server.",
 "analogy": "Pouring water over dry instant noodles to bring them to life.",
 "codeSnippet": "// Handled automatically by Next.js client runtime"
 },
 {
 "term": "'use client'",
 "category": "Directive",
 "definition": "The directive placed at the top of a file to declare a boundary where React interactivity (state, effects, event handlers) runs in the browser.",
 "analogy": "A sign on a door marking the interactive customer dining room.",
 "codeSnippet": "'use client';\nimport { useState } from 'react';"
 },
 {
 "term": "Server Components (RSC)",
 "category": "Architecture",
 "definition": "React components that execute exclusively on the server and emit lightweight JSON/HTML without shipping JS code to the client.",
 "analogy": "Heavy kitchen equipment that stays in the back room and never needs to be transported to tables.",
 "codeSnippet": "async function ServerDataWidget() { ... }"
 },
 {
 "term": "Server Action",
 "category": "API Routes",
 "definition": "Asynchronous server functions that can be invoked directly from client components or HTML forms without manual API routes.",
 "analogy": "A dumbwaiter elevator connecting dining room orders directly to the chef's hands.",
 "codeSnippet": "async function createPost() { 'use server'; ... }"
 },
 {
 "term": "App Router",
 "category": "Routing",
 "definition": "Next.js's file-system based routing architecture that leverages React Server Components, nested layouts, and loading states.",
 "analogy": "A building floor plan where the room numbers match the hallway directory perfectly.",
 "codeSnippet": "app/dashboard/settings/page.tsx"
 }
 ],
 "sandbox": {
 "instructions": "Test the simulated Next.js App Router and Server Rendering simulator below. Switch routes and compare instant Server Pre-rendering vs Client hydration!",
 "initialHTML": `<!DOCTYPE html>
<html>
<head>
 <meta charset="UTF-8" />
 <title>Next.js App Router Simulator</title>
 <style>
 body {
 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
 background: #09090b;
 color: #fafafa;
 padding: 16px;
 margin: 0;
 }
 .next-shell {
 background: #18181b;
 border: 1px solid #27272a;
 border-radius: 12px;
 padding: 18px;
 }
 .url-bar {
 background: #09090b;
 border: 1px solid #27272a;
 border-radius: 8px;
 padding: 8px 12px;
 font-family: 'Fira Code', monospace;
 font-size: 0.85rem;
 color: #a1a1aa;
 display: flex;
 align-items: center;
 gap: 8px;
 margin-bottom: 14px;
 }
 .badge-next {
 background: #fafafa;
 color: #09090b;
 font-weight: 800;
 font-size: 0.75rem;
 padding: 2px 6px;
 border-radius: 4px;
 }
 .nav-links { display: flex; gap: 8px; margin-bottom: 16px; }
 .nav-btn {
 background: #27272a;
 color: #e4e4e7;
 border: none;
 padding: 6px 14px;
 border-radius: 6px;
 font-size: 0.82rem;
 font-weight: 600;
 cursor: pointer;
 }
 .nav-btn.active { background: #3b82f6; color: white; }
 .page-box {
 background: #09090b;
 border: 1px solid #27272a;
 border-radius: 8px;
 padding: 16px;
 min-height: 100px;
 }
 .render-metric {
 display: inline-block;
 background: rgba(34, 197, 94, 0.15);
 border: 1px solid #22c55e;
 color: #4ade80;
 font-size: 0.75rem;
 padding: 2px 8px;
 border-radius: 4px;
 font-weight: 700;
 margin-bottom: 10px;
 }
 </style>
</head>
<body>
 <div class="next-shell">
 <div class="url-bar">
 <span class="badge-next">Next.js 14</span>
 <span>https://app.novicodes.dev<strong id="urlPath" style="color:#60a5fa;">/</strong></span>
 </div>

 <div class="nav-links">
 <button class="nav-btn active" onclick="navigate(this, '/', 'Home Dashboard', 'app/page.tsx', ' Server Pre-Rendered in 18ms (0KB Client JS)')">app/page.tsx</button>
 <button class="nav-btn" onclick="navigate(this, '/blog', 'Developer Blog', 'app/blog/page.tsx', ' Static Edge Cached in 4ms')">app/blog/page.tsx</button>
 <button class="nav-btn" onclick="navigate(this, '/settings', 'Account Settings [use client]', 'app/settings/page.tsx', '️ Client Component (Hydrated & Interactive)')">app/settings/page.tsx</button>
 </div>

 <div class="page-box">
 <div class="render-metric" id="metricBadge"> Server Pre-Rendered in 18ms (0KB Client JS)</div>
 <h3 id="pageTitle" style="margin: 0 0 6px 0;">Home Dashboard</h3>
 <p id="pageDesc" style="color: #a1a1aa; font-size: 0.88rem; margin: 0;">Loaded directly from <code>app/page.tsx</code>. Zero JavaScript runtime required for static HTML layout.</p>
 </div>
 </div>

 <script>
 function navigate(btnEl, path, title, file, metric) {
 document.getElementById('urlPath').textContent = path;
 document.getElementById('pageTitle').textContent = title;
 document.getElementById('metricBadge').textContent = metric;
 document.getElementById('pageDesc').innerHTML = 'Loaded from <code>' + file + '</code>. Next.js automatically handled the route transition seamlessly.';
 
 const btns = document.querySelectorAll('.nav-btn');
 btns.forEach(b => b.classList.remove('active'));
 if (btnEl) btnEl.classList.add('active');
 }
 </script>
</body>
</html>`
 },
 "quizzes": [
 {
 "id": "next_q1",
 "question": "What is the key advantage of Server-Side Rendering (SSR) in Next.js over client-only React?",
 "options": [
 "The server sends fully-rendered HTML instantly, improving initial page load speed and search engine SEO.",
 "It eliminates the need for any HTML or CSS files.",
 "It allows websites to run on devices without internet connections.",
 "It removes the need to write JavaScript functions."
 ],
 "correctIndex": 0,
 "explanation": "Server-Side Rendering generates complete HTML on the server before delivering it to the browser, ensuring fast initial page loads and excellent SEO."
 },
 {
 "id": "next_q2",
 "question": "In the Next.js App Router, what directive MUST you write at the top of a file to use useState or event handlers?",
 "options": [
 "'use server'",
 "'use client'",
 "'use strict'",
 "'use react'"
 ],
 "correctIndex": 1,
 "explanation": "Adding 'use client' declares that the component runs in the browser and can use client-side hooks like useState, useEffect, and onClick handlers."
 },
 {
 "id": "next_q3",
 "question": "How does Next.js determine the URL route for a page in the App Router?",
 "options": [
 "By matching the folder hierarchy inside the app/ directory (e.g. app/about/page.tsx -> /about).",
 "By randomly generating a number code for each page.",
 "By writing XML configuration files in Apache.",
 "By manually editing the browser's bookmark list."
 ],
 "correctIndex": 0,
 "explanation": "Next.js uses file-system based routing where the folder structure inside app/ automatically defines the public URL path."
 }
 ]
};
