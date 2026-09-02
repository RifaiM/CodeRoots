// NoviCodes DevType Dojo - Line-Buffered Responsive Monkeytype Engine
(function() {
    'use strict';

    const codeSnippets = {
  "html": [
    "<div class=\"card\">\n  <h2>Hello World</h2>\n  <p>Building web apps is awesome!</p>\n</div>",
    "<form action=\"/submit\" method=\"POST\">\n  <label for=\"email\">Email Address</label>\n  <input type=\"email\" id=\"email\" required />\n  <button type=\"submit\">Submit</button>\n</form>",
    "<header class=\"navbar\">\n  <a href=\"/home\" class=\"logo\">DevDojo</a>\n  <nav>\n    <a href=\"/about\">About</a>\n    <a href=\"/contact\">Contact</a>\n  </nav>\n</header>",
    "<main class=\"container\">\n  <section class=\"hero\">\n    <h1>Welcome to NoviCodes</h1>\n    <p>Zero barrier open source learning.</p>\n  </section>\n</main>",
    "<ul class=\"features-list\">\n  <li class=\"item active\">Item One</li>\n  <li class=\"item\">Item Two</li>\n  <li class=\"item\">Item Three</li>\n</ul>",
    "<article class=\"blog-post\">\n  <img src=\"banner.jpg\" alt=\"Banner\" />\n  <h3>Modern Web Frameworks</h3>\n  <p>Learn React and component architecture.</p>\n</article>",
    "<table class=\"data-table\">\n  <thead>\n    <tr><th>ID</th><th>Name</th><th>Role</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>1</td><td>Rifai</td><td>Developer</t\n  d></tr>\n  </tbody>\n</table>",
    "<div class=\"modal-overlay\">\n  <div class=\"modal-content\">\n    <h3>Settings</h3>\n    <button class=\"close-btn\">&times;</button>\n  </div>\n</div>",
    "<footer class=\"footer\">\n  <p>&copy; 2026 NoviCodes DevDojo. All rights\n  reserved.</p>\n</footer>",
    "<div class=\"badge-container\">\n  <span class=\"badge primary\">Active</span>\n  <span class=\"badge success\">Verified</span>\n</div>",
    "<picture>\n  <source srcset=\"hero-dark.webp\" media=\"(\n  prefers-color-scheme: dark)\" />\n  <img src=\"hero-light.png\" alt=\"Hero Banner\" />\n</picture>",
    "<dialog id=\"favDialog\">\n  <form method=\"dialog\">\n    <h3>Confirm Action</h3>\n    <button value=\"cancel\">Cancel</button>\n    <button value=\"confirm\"\n  class=\"btn-primary\">Confirm</button>\n  </form>\n</dialog>",
    "<details class=\"accordion-item\">\n  <summary>What is React 19?</summary>\n  <p>React 19 introduces Actions and Server\n  Components.</p>\n</details>",
    "<nav class=\"pagination\" aria-label=\"Page\n  navigation\">\n  <a href=\"?page=1\" class=\"page-link\">&laquo;\n  Prev</a>\n  <span class=\"page-current\">Page 2 of 10</span>\n  <a href=\"?page=3\" class=\"page-link\">Next\n  &raquo;</a>\n</nav>",
    "<div class=\"toast-notification success\">\n  <span class=\"toast-icon\">✓</span>\n  <div class=\"toast-message\">Project saved\n  successfully!</div>\n  <button class=\"toast-close\">&times;</button>\n</div>",
    "<figure class=\"quote-card\">\n  <blockquote>Simplicity is the soul of\n  efficiency.</blockquote>\n  <figcaption>— Austin Freeman</figcaption>\n</figure>",
    "<input type=\"text\" list=\"browsers\"\n  name=\"browser\" id=\"browserChoice\" />\n<datalist id=\"browsers\">\n  <option value=\"Chrome\">\n  <option value=\"Firefox\">\n  <option value=\"Safari\">\n</datalist>",
    "<video controls width=\"640\"\n  poster=\"thumbnail.jpg\">\n  <source src=\"video.mp4\" type=\"video/mp4\" />\n  <track kind=\"subtitles\" src=\"subs_en.vtt\"\n  srclang=\"en\" label=\"English\" default />\n</video>",
    "<audio controls>\n  <source src=\"podcast.mp3\" type=\"audio/mpeg\" />\n  Your browser does not support the audio element.\n</audio>",
    "<template id=\"cardTemplate\">\n  <div class=\"user-card\">\n    <h4 class=\"name\"></h4>\n    <p class=\"email\"></p>\n  </div>\n</template>",
    "<div class=\"progress-bar-container\"\n  role=\"progressbar\" aria-valuenow=\"75\"\n  aria-valuemin=\"0\" aria-valuemax=\"100\">\n  <div class=\"progress-bar-fill\" style=\"width:\n  75%;\">75%</div>\n</div>",
    "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"\n  fill=\"none\" stroke=\"currentColor\"\n  stroke-width=\"2\">\n  <circle cx=\"12\" cy=\"12\" r=\"10\" />\n  <polyline points=\"12 6 12 12 16 14\" />\n</svg>",
    "<nav aria-label=\"Breadcrumb\" class=\"breadcrumbs\">\n  <ol>\n    <li><a href=\"/\">Home</a></li>\n    <li><a href=\"/courses\">Courses</a></li>\n    <li aria-current=\"page\">Web Development</li>\n  </ol>\n</nav>",
    "<div class=\"dropdown-menu\" role=\"menu\">\n  <a href=\"/profile\" class=\"dropdown-item\"\n  role=\"menuitem\">Profile</a>\n  <a href=\"/settings\" class=\"dropdown-item\"\n  role=\"menuitem\">Settings</a>\n  <div class=\"dropdown-divider\"></div>\n  <a href=\"/logout\" class=\"dropdown-item logout\"\n  role=\"menuitem\">Sign Out</a>\n</div>",
    "<aside class=\"sidebar-widget\">\n  <h3>Related Articles</h3>\n  <ul>\n    <li><a href=\"/post-1\">CSS Grid\n  Mastery</a></li>\n    <li><a href=\"/post-2\">Modern\n  TypeScript</a></li>\n  </ul>\n</aside>",
    "<fieldset class=\"form-group\">\n  <legend>Select Notification Preferences</legend>\n  <label><input type=\"checkbox\"\n  name=\"notify_email\" checked /> Email</label>\n  <label><input type=\"checkbox\"\n  name=\"notify_sms\" /> SMS</label>\n</fieldset>",
    "<div class=\"stat-card\">\n  <span class=\"stat-num\">103</span>\n  <span class=\"stat-label\">Coding\n  Challenges</span>\n</div>",
    "<blockquote cite=\"https://developer.mozilla.org\">\n  <p>The Web is an open platform designed for\n  everyone.</p>\n</blockquote>",
    "<address class=\"author-contact\">\n  Written by <a href=\"mailto:alex@novicodes.dev\"\n  >Alex Dev</a><br />\n  Visit us at <a href=\"https://novicodes.dev\">no\n  vicodes.dev</a>\n</address>",
    "<div class=\"segmented-control\" role=\"tablist\">\n  <button class=\"seg-btn active\" role=\"tab\"\n  aria-selected=\"true\">Monthly</button>\n  <button class=\"seg-btn\" role=\"tab\"\n  aria-selected=\"false\">Annual (Save 20%)</button>\n</div>",
    "<div class=\"pricing-card featured\">\n  <span class=\"badge\">Most Popular</span>\n  <h3>Pro Developer</h3>\n  <div class=\"price\">$29<span>/mo</span></div>\n  <button class=\"btn-primary\">Get Started</button>\n</div>",
    "<form class=\"search-form\" role=\"search\">\n  <input type=\"search\" placeholder=\"Search\n  lessons...\" aria-label=\"Search lessons\" />\n  <button type=\"submit\">Search</button>\n</form>",
    "<div class=\"accordion\">\n  <button class=\"accordion-header\"\n  aria-expanded=\"true\">Section 1:\n  Architecture</button>\n  <div class=\"accordion-panel\">\n    <p>Core client-server communication\n  overview.</p>\n  </div>\n</div>",
    "<div class=\"chip-list\">\n  <span class=\"chip\">JavaScript <button\n  class=\"chip-remove\">&times;</button></span>\n  <span class=\"chip\">React <button\n  class=\"chip-remove\">&times;</button></span>\n</div>",
    "<div class=\"avatar-group\">\n  <img class=\"avatar\" src=\"user1.jpg\" alt=\"User\n  1\" />\n  <img class=\"avatar\" src=\"user2.jpg\" alt=\"User\n  2\" />\n  <span class=\"avatar-more\">+5</span>\n</div>",
    "<div class=\"alert alert-warning\" role=\"alert\">\n  <strong>Caution:</strong> Changes cannot be\n  undone once published.\n</div>",
    "<header class=\"hero-banner\">\n  <h1 class=\"gradient-heading\">Code Faster with\n  Muscle Memory</h1>\n  <p class=\"lead-text\">Practice daily typing\n  challenges in real programming languages.</p>\n</header>",
    "<div class=\"skeleton-wrapper\" aria-hidden=\"true\">\n  <div class=\"skeleton-avatar\"></div>\n  <div class=\"skeleton-line full\"></div>\n  <div class=\"skeleton-line half\"></div>\n</div>",
    "<button class=\"btn btn-icon\" aria-label=\"Copy\n  Code\">\n  <svg class=\"icon\"><use href=\"#copy-icon\"\n  /></svg>\n</button>",
    "<meter min=\"0\" max=\"100\" low=\"33\" high=\"66\"\n  optimum=\"80\" value=\"75\">75% capacity</meter>",
    "<progress value=\"45\" max=\"100\">45%</progress>",
    "<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>D</kbd>",
    "<samp>Error: Module not found: Can't resolve\n  './components'</samp>",
    "<time datetime=\"2026-08-29T12:00\">August 29,\n  2026</time>",
    "<mark class=\"highlight\">High Performance</mark>",
    "<div class=\"code-editor-header\">\n  <span class=\"file-name\">index.html</span>\n  <span class=\"file-status\">● Modified</span>\n</div>",
    "<div class=\"tab-panel\" role=\"tabpanel\"\n  id=\"panel-1\" aria-labelledby=\"tab-1\">\n  <h3>Tab One Content</h3>\n  <p>Dynamic content loaded on demand.</p>\n</div>",
    "<form class=\"inline-subscribe\">\n  <input type=\"email\" placeholder=\"Enter work\n  email\" required />\n  <button type=\"submit\"\n  class=\"btn-oxide\">Subscribe</button>\n</form>",
    "<div class=\"callout callout-info\">\n  <h4>Pro Tip</h4>\n  <p>Use semantic HTML to boost accessibility\n  and SEO rankings effortlessly.</p>\n</div>",
    "<div class=\"hero-cta-group\">\n  <a href=\"/start\" class=\"btn-primary\">Start\n  Level 00 →</a>\n  <a href=\"#roadmap\"\n  class=\"btn-secondary\">Explore Roadmap ↓</a>\n</div>"
  ],
  "css": [
    ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n  padding: 24px;\n}",
    ".btn-primary {\n  background: linear-gradient(135deg, #007bff,\n  #0056b3);\n  color: #ffffff;\n  border-radius: 20px;\n  cursor: pointer;\n}",
    "@media (max-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n}",
    ".card-hero {\n  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);\n  backdrop-filter: blur(12px);\n  border: 1px solid #cbd5e1;\n}",
    ".nav-item:hover {\n  background: #f1f5f9;\n  color: #2563eb;\n  transition: all 0.2s ease;\n}",
    ".grid-layout {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(\n  280px, 1fr));\n  gap: 16px;\n}",
    ".badge-status {\n  display: inline-flex;\n  align-items: center;\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 0.78rem;\n}",
    "header.sticky-header {\n  position: sticky;\n  top: 0;\n  z-index: 9999;\n  background: rgba(15, 23, 42, 0.95);\n}",
    "@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(\n  -10px); }\n  to { opacity: 1; transform: translateY(0); }\n}",
    ".tooltip {\n  position: relative;\n  cursor: help;\n  border-bottom: 1px dashed #64748b;\n}",
    ".glassmorphic-card {\n  background: rgba(255, 255, 255, 0.15);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid rgba(255, 255, 255, 0.25);\n}",
    ".hero-gradient-text {\n  background: linear-gradient(135deg, #38bdf8 0%,\n  #818cf8 50%, #c084fc 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}",
    "@supports (aspect-ratio: 16 / 9) {\n  .video-container {\n    aspect-ratio: 16 / 9;\n    width: 100%;\n    object-fit: cover;\n  }\n}",
    ".container {\n  display: grid;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar content\"\n    \"footer footer\";\n  grid-template-columns: 240px 1fr;\n}",
    ":root {\n  --primary: #2563eb;\n  --surface: #0f172a;\n  --text-main: #f8fafc;\n  --border: rgba(255, 255, 255, 0.12);\n}",
    ".scrollable-panel {\n  scrollbar-width: thin;\n  scrollbar-color: #94a3b8 #f1f5f9;\n  overflow-y: auto;\n  max-height: 480px;\n}",
    "@keyframes pulseGlow {\n  0%, 100% { box-shadow: 0 0 0 0 rgba(163, 59,\n  36, 0.4); }\n  50% { box-shadow: 0 0 0 12px rgba(163, 59, 36,\n  0); }\n}",
    ".card:has(input:checked) {\n  border-color: #2563eb;\n  background: #eff6ff;\n}",
    "h1 {\n  font-size: clamp(2rem, 5vw, 3.5rem);\n  line-height: 1.15;\n  letter-spacing: -0.03em;\n}",
    "@container (min-width: 450px) {\n  .profile-card {\n    display: flex;\n    flex-direction: row;\n    gap: 20px;\n  }\n}",
    ".subgrid-item {\n  display: grid;\n  grid-template-columns: subgrid;\n  grid-column: span 3;\n}",
    ".truncate-lines {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}",
    ".avatar-glow {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  border: 2px solid #ffffff;\n  box-shadow: 0 0 0 2px #2563eb;\n}",
    ".dark-theme {\n  --bg-color: #0b0f19;\n  --text-color: #f3f4f6;\n  --border-color: #1f2937;\n  color-scheme: dark;\n}",
    ".center-fixed {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 1000;\n}",
    ".skeleton-shimmer {\n  background: linear-gradient(90deg, #e2e8f0 25%,\n  #f1f5f9 50%, #e2e8f0 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n}",
    "@keyframes shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}",
    ".interactive-btn {\n  will-change: transform;\n  transition: transform 0.15s cubic-bezier(0.4,\n  0, 0.2, 1);\n}\n.interactive-btn:active {\n  transform: scale(0.96);\n}",
    ".badge-pill {\n  display: inline-block;\n  padding: 0.25em 0.75em;\n  font-size: 75%;\n  font-weight: 700;\n  line-height: 1;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 10rem;\n}",
    ".radial-background {\n  background: radial-gradient(circle at 50% 0%,\n  rgba(56, 189, 248, 0.15) 0%, transparent 70%);\n}",
    ".masonry-grid {\n  column-count: 3;\n  column-gap: 1.5rem;\n}\n.masonry-item {\n  break-inside: avoid;\n  margin-bottom: 1.5rem;\n}",
    ".focus-visible:focus-visible {\n  outline: 2px solid #2563eb;\n  outline-offset: 3px;\n}",
    ".overlay-blur {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.6);\n  backdrop-filter: blur(8px);\n}",
    ".split-pane {\n  display: grid;\n  grid-template-columns: minmax(300px, 1fr) 2fr;\n  height: 100vh;\n  overflow: hidden;\n}",
    ".smooth-scroll {\n  scroll-behavior: smooth;\n  scroll-padding-top: 80px;\n}",
    ".card-3d {\n  transform-style: preserve-3d;\n  transition: transform 0.3s ease;\n}\n.card-3d:hover {\n  transform: rotateY(10deg) rotateX(5deg);\n}",
    ".pill-tab {\n  border: none;\n  background: transparent;\n  color: #64748b;\n  padding: 8px 16px;\n  font-weight: 600;\n  cursor: pointer;\n}",
    ".pill-tab.active {\n  background: #2563eb;\n  color: #ffffff;\n  border-radius: 8px;\n}",
    ".input-floating {\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  padding: 14px 12px;\n  font-size: 1rem;\n  transition: border-color 0.2s;\n}",
    ".input-floating:focus {\n  border-color: #2563eb;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);\n}",
    "@keyframes bounceIn {\n  0% { transform: scale(0.3); opacity: 0; }\n  50% { transform: scale(1.05); opacity: 1; }\n  100% { transform: scale(1); }\n}",
    ".badge-counter {\n  position: absolute;\n  top: -6px;\n  right: -6px;\n  background: #ef4444;\n  color: #ffffff;\n  font-size: 0.7rem;\n  border-radius: 9999px;\n  padding: 2px 6px;\n}",
    ".icon-box {\n  width: 44px;\n  height: 44px;\n  display: grid;\n  place-items: center;\n  border-radius: 10px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n}",
    ".status-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: #22c55e;\n  display: inline-block;\n  margin-right: 6px;\n}",
    ".flex-between {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n}",
    ".glow-on-hover:hover {\n  box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);\n  border-color: #38bdf8;\n}",
    ".divider-horizontal {\n  height: 1px;\n  background: #e2e8f0;\n  margin: 1.5rem 0;\n  width: 100%;\n}",
    ".text-gradient-gold {\n  background: linear-gradient(135deg, #d97706,\n  #f59e0b);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}",
    ".aspect-square {\n  aspect-ratio: 1 / 1;\n  object-fit: cover;\n  border-radius: 8px;\n}",
    ".no-select {\n  user-select: none;\n  -webkit-user-select: none;\n}"
  ],
  "js": [
    "const calculateTotal = (items) => {\n  return items.reduce((acc, item) => acc +\n  item.price, 0);\n};",
    "const fetchUserData = async (userId) => {\n  const response = await fetch(`/api/user/${\n  userId}`);\n  return await response.json();\n};",
    "const user = { name: \"Rifai\", role: \"Dev\" };\nconst { name, role } = user;\nconst updated = { ...user, xp: 1500 };",
    "const skills = [\"HTML\", \"CSS\", \"JS\"];\nconst badges = skills.map(skill => `<span\n  class=\"badge\">${skill}</span>`);",
    "document.addEventListener(\"DOMContentLoaded\", ()\n  => {\n  const btn = document.getElementById(\n  \"submitBtn\");\n  btn.addEventListener(\"click\", handleSubmit);\n});",
    "const filterActiveUsers = (users) => {\n  return users.filter(user => user.isActive &&\n  user.age >= 18);\n};",
    "const debounce = (func, delay = 300) => {\n  let timeout;\n  return (...args) => {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func(...args),\n  delay);\n  };\n};",
    "const formatCurrency = (amount) => {\n  return new Intl.NumberFormat('en-US', { style:\n  'currency', currency: 'USD' }).format(amount);\n};",
    "const getUniqueTags = (posts) => {\n  return [...new Set(posts.flatMap(post =>\n  post.tags))];\n};",
    "const checkStatus = (code) => {\n  return code === 200 ? \"OK\" : \"Error\";\n};",
    "const groupBy = (array, key) => {\n  return array.reduce((acc, obj) => {\n    (acc[obj[key]] = acc[obj[key]] || []).push(\n  obj);\n    return acc;\n  }, {});\n};",
    "const copyToClipboard = async (text) => {\n  try {\n    await navigator.clipboard.writeText(text);\n    return true;\n  } catch (err) {\n    console.error(\"Clipboard copy failed:\", err);\n    return false;\n  }\n};",
    "const toggleTheme = () => {\n  const current = document.documentElement.getAt\n  tribute(\"data-theme\");\n  const next = current === \"dark\" ? \"light\" :\n  \"dark\";\n  document.documentElement.setAttribute(\n  \"data-theme\", next);\n};",
    "const createStore = (initialState) => {\n  let state = initialState;\n  const listeners = new Set();\n  return {\n    getState: () => state,\n    subscribe: (fn) => (listeners.add(fn), () =>\n  listeners.delete(fn))\n  };\n};",
    "const parseQueryParams = (urlStr) => {\n  const params = new URLSearchParams(new URL(\n  urlStr).search);\n  return Object.fromEntries(params.entries());\n};",
    "const throttle = (func, limit = 200) => {\n  let inThrottle;\n  return (...args) => {\n    if (!inThrottle) {\n      func(...args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n};",
    "const deepClone = (obj) => {\n  if (typeof structuredClone === 'function')\n  return structuredClone(obj);\n  return JSON.parse(JSON.stringify(obj));\n};",
    "const observer = new IntersectionObserver((\n  entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting)\n  entry.target.classList.add('visible');\n  });\n}, { threshold: 0.2 });",
    "const fetchWithRetry = async (url, retries = 3)\n  => {\n  for (let i = 0; i < retries; i++) {\n    try { return await (await fetch(url)).json();\n  }\n    catch (err) { if (i === retries - 1) throw\n  err; }\n  }\n};",
    "const capitalize = (str) => str.charAt(\n  0).toUpperCase() + str.slice(1).toLowerCase();",
    "const generateId = (length = 8) => {\n  return Math.random().toString(36).substring(2,\n  2 + length);\n};",
    "const isEmpty = (val) => val == null || !(\n  Object.keys(val) || val).length;",
    "const sleep = (ms) => new Promise(resolve =>\n  setTimeout(resolve, ms));",
    "const sanitizeHtml = (str) => {\n  const temp = document.createElement('div');\n  temp.textContent = str;\n  return temp.innerHTML;\n};",
    "const pipe = (...fns) => (x) => fns.reduce((v,\n  f) => f(v), x);",
    "const chunk = (arr, size) => {\n  return Array.from({ length: Math.ceil(\n  arr.length / size) }, (v, i) =>\n    arr.slice(i * size, i * size + size)\n  );\n};",
    "const memoize = (fn) => {\n  const cache = new Map();\n  return (...args) => {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  };\n};",
    "const getRelativeTime = (timestamp) => {\n  const rtf = new Intl.RelativeTimeFormat('en', {\n  numeric: 'auto' });\n  const days = Math.round((timestamp - Date.now(\n  )) / (1000 * 60 * 60 * 24));\n  return rtf.format(days, 'day');\n};",
    "const flatten = (arr) => arr.reduce((flat, next)\n  => flat.concat(Array.isArray(next) ? flatten(\n  next) : next), []);",
    "const isMobileDevice = () => window.matchMedia('(\n  max-width: 768px)').matches;",
    "const sortByKey = (array, key, ascending = true)\n  => {\n  return [...array].sort((a, b) => ascending ? (\n  a[key] > b[key] ? 1 : -1) : (a[key] < b[key] ?\n  1 : -1));\n};",
    "const binarySearch = (arr, target) => {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n};",
    "const pick = (obj, keys) => keys.reduce((acc, k)\n  => (k in obj && (acc[k] = obj[k]), acc), {});",
    "const omit = (obj, keys) => Object.fromEntries(\n  Object.entries(obj).filter(([k]) =>\n  !keys.includes(k)));",
    "const clampValue = (val, min, max) => Math.min(\n  Math.max(val, min), max);",
    "const isEven = (num) => (num & 1) === 0;",
    "const average = (arr) => arr.reduce((p, c) => p\n  + c, 0) / arr.length;",
    "const getRandomItem = (arr) => arr[Math.floor(\n  Math.random() * arr.length)];",
    "const arrayEquals = (a, b) => a.length ===\n  b.length && a.every((v, i) => v === b[i]);",
    "const downloadJson = (data, filename =\n  'export.json') => {\n  const blob = new Blob([JSON.stringify(data,\n  null, 2)], { type: 'application/json' });\n  const url = URL.createObjectURL(blob);\n  const a = document.createElement('a');\n  a.href = url; a.download = filename; a.click();\n};",
    "const measureExecutionTime = async (fn) => {\n  const start = performance.now();\n  await fn();\n  return performance.now() - start;\n};",
    "const hexToRgb = (hex) => {\n  const bigint = parseInt(hex.replace('#', ''),\n  16);\n  return { r: (bigint >> 16) & 255, g: (bigint\n  >> 8) & 255, b: bigint & 255 };\n};",
    "const eventEmitter = {\n  events: {},\n  on(name, cb) { (this.events[name] =\n  this.events[name] || []).push(cb); },\n  emit(name, data) { (this.events[name] ||\n  []).forEach(cb => cb(data)); }\n};",
    "const parseJwt = (token) => {\n  try { return JSON.parse(atob(token.split(\n  '.')[1])); }\n  catch (e) { return null; }\n};",
    "const truncateString = (str, num) => str.length\n  > num ? str.slice(0, num) + '...' : str;",
    "const reverseString = (str) => [...str].reverse(\n  ).join('');",
    "const removeDuplicates = (arr) => Array.from(new\n  Set(arr));",
    "const isObject = (item) => item && typeof item\n  === 'object' && !Array.isArray(item);",
    "const getScrollProgress = () => {\n  const winScroll = document.documentElement.scr\n  ollTop;\n  const height = document.documentElement.scroll\n  Height - document.documentElement.clientHeight;\n  return (winScroll / height) * 100;\n};",
    "const dispatchCustomEvent = (eventName, detail =\n  {}) => {\n  window.dispatchEvent(new CustomEvent(eventName,\n  { detail }));\n};"
  ],
  "react": [
    "const [count, setCount] = useState(0);\nconst increment = () => setCount(prev => prev +\n  1);",
    "useEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);",
    "function UserCard({ name, role }) {\n  return (\n    <div className=\"card\">\n      <h3>{name}</h3>\n      <p>{role}</p>\n    </div>\n  );\n}",
    "const { data, loading, error } = useFetch(\n  \"/api/data\");\nif (loading) return <p>Loading...</p>;",
    "const AuthContext = createContext(null);\nconst useAuth = () => useContext(AuthContext);",
    "const memoizedValue = useMemo(() => {\n  return expensiveCalculation(data);\n}, [data]);",
    "const handleToggle = useCallback(() => {\n  setIsOpen(prev => !prev);\n}, []);",
    "function TodoItem({ item, onDelete }) {\n  return (\n    <li>\n      <span>{item.text}</span>\n      <button onClick={() => onDelete(\n  item.id)}>Delete</button>\n    </li>\n  );\n}",
    "const inputRef = useRef(null);\nconst focusInput = () => inputRef.current?.focus(\n  );",
    "const [form, setForm] = useState({ name: \"\",\n  email: \"\" });\nconst handleChange = e => setForm({ ...form,\n  [e.target.name]: e.target.value });",
    "function SearchBar({ onSearch }) {\n  const [query, setQuery] = useState(\"\");\n  const handleSubmit = e => {\n    e.preventDefault();\n    onSearch(query);\n  };\n  return <form onSubmit={handleSubmit}><input\n  value={query} onChange={e => setQuery(\n  e.target.value)} /></form>;\n}",
    "function ProtectedRoute({ isAuth, children }) {\n  if (!isAuth) {\n    return <Navigate to=\"/login\" replace />;\n  }\n  return children;\n}",
    "const [optimisticLikes, addOptimisticLike] =\n  useOptimistic(\n  likes,\n  (state, newLike) => [...state, newLike]\n);",
    "function ModalPortal({ children, isOpen }) {\n  if (!isOpen) return null;\n  return createPortal(children,\n  document.getElementById(\"modal-root\"));\n}",
    "const useLocalStorage = (key, initialValue) => {\n  const [value, setValue] = useState(() => {\n    return JSON.parse(localStorage.getItem(key))\n  ?? initialValue;\n  });\n  return [value, setValue];\n};",
    "const [isPending, startTransition] =\n  useTransition();\nconst handleTabChange = (tab) => startTransition(\n  () => setSelectedTab(tab));",
    "const id = useId();\nreturn (\n  <div>\n    <label htmlFor={id}>Username:</label>\n    <input id={id} type=\"text\" />\n  </div>\n);",
    "const reducer = (state, action) => {\n  switch (action.type) {\n    case 'increment': return { count:\n  state.count + 1 };\n    case 'decrement': return { count:\n  state.count - 1 };\n    default: return state;\n  }\n};\nconst [state, dispatch] = useReducer(reducer, {\n  count: 0 });",
    "const useDebounceValue = (value, delay = 300) => {\n  const [debounced, setDebounced] = useState(\n  value);\n  useEffect(() => {\n    const handler = setTimeout(() =>\n  setDebounced(value), delay);\n    return () => clearTimeout(handler);\n  }, [value, delay]);\n  return debounced;\n};",
    "const useOnlineStatus = () => {\n  const [isOnline, setIsOnline] = useState(\n  navigator.onLine);\n  useEffect(() => {\n    const handleOnline = () => setIsOnline(true);\n    const handleOffline = () => setIsOnline(\n  false);\n    window.addEventListener('online',\n  handleOnline);\n    window.addEventListener('offline',\n  handleOffline);\n    return () => { window.removeEventListener(\n  'online', handleOnline);\n  window.removeEventListener('offline',\n  handleOffline); };\n  }, []);\n  return isOnline;\n};",
    "function Badge({ variant = 'default', children\n  }) {\n  return <span className={`badge badge-${\n  variant}`}>{children}</span>;\n}",
    "const Button = forwardRef(({ className, children,\n  ...props }, ref) => (\n  <button ref={ref} className={`btn ${\n  className}`} {...props}>{children}</button>\n));",
    "function Dropdown({ trigger, children }) {\n  const [isOpen, setIsOpen] = useState(false);\n  return (\n    <div className=\"dropdown\">\n      <button onClick={() => setIsOpen(\n  !isOpen)}>{trigger}</button>\n      {isOpen && <div\n  className=\"dropdown-panel\">{children}</div>}\n    </div>\n  );\n}",
    "const ThemeContext = createContext('light');\nexport const ThemeProvider = ({ children }) => {\n  const [theme, setTheme] = useState('light');\n  return <ThemeContext.Provider value={{ theme,\n  setTheme }}>{children}</ThemeContext.Provider>;\n};",
    "function AccordionItem({ title, content }) {\n  const [isOpen, setIsOpen] = useState(false);\n  return (\n    <div className=\"accordion\">\n      <button onClick={() => setIsOpen(prev =>\n  !prev)}>{title}</button>\n      {isOpen && <p>{content}</p>}\n    </div>\n  );\n}",
    "const usePrevious = (value) => {\n  const ref = useRef();\n  useEffect(() => { ref.current = value; },\n  [value]);\n  return ref.current;\n};",
    "const useEventListener = (eventName, handler,\n  element = window) => {\n  const savedHandler = useRef(handler);\n  useEffect(() => { savedHandler.current =\n  handler; }, [handler]);\n  useEffect(() => {\n    const eventListener = (event) =>\n  savedHandler.current(event);\n    element.addEventListener(eventName,\n  eventListener);\n    return () => element.removeEventListener(\n  eventName, eventListener);\n  }, [eventName, element]);\n};",
    "const LazyDashboard = React.lazy(() => import(\n  './Dashboard'));\nfunction App() {\n  return (\n    <Suspense fallback={<p>Loading...</p>}>\n      <LazyDashboard />\n    </Suspense>\n  );\n}",
    "function Tabs({ tabs, activeIndex, onChange }) {\n  return (\n    <div className=\"tab-headers\">\n      {tabs.map((tab, idx) => (\n        <button key={tab.id} className={idx ===\n  activeIndex ? 'active' : ''} onClick={() =>\n  onChange(idx)}>{tab.label}</button>\n      ))}\n    </div>\n  );\n}",
    "function Avatar({ src, alt, fallback }) {\n  const [hasError, setHasError] = useState(false);\n  if (hasError || !src) return <div\n  className=\"avatar-fallback\">{fallback}</div>;\n  return <img src={src} alt={alt} onError={() =>\n  setHasError(true)} className=\"avatar-img\" />;\n}",
    "const useToggle = (initialValue = false) => {\n  const [state, setState] = useState(\n  initialValue);\n  const toggle = useCallback(() => setState(prev\n  => !prev), []);\n  return [state, toggle];\n};",
    "const useInterval = (callback, delay) => {\n  const savedCallback = useRef(callback);\n  useEffect(() => { savedCallback.current =\n  callback; }, [callback]);\n  useEffect(() => {\n    if (delay !== null) {\n      const id = setInterval(() =>\n  savedCallback.current(), delay);\n      return () => clearInterval(id);\n    }\n  }, [delay]);\n};",
    "function Pagination({ currentPage, totalPages,\n  onPageChange }) {\n  return (\n    <div className=\"pagination\">\n      <button disabled={currentPage <= 1}\n  onClick={() => onPageChange(currentPage -\n  1)}>Prev</button>\n      <span>{currentPage} of {totalPages}</span>\n      <button disabled={currentPage >=\n  totalPages} onClick={() => onPageChange(\n  currentPage + 1)}>Next</button>\n    </div>\n  );\n}",
    "function Chip({ label, onRemove }) {\n  return (\n    <span className=\"chip\">\n      {label}\n      {onRemove && <button onClick={onRemove}\n  className=\"chip-remove\">&times;</button>}\n    </span>\n  );\n}",
    "function NotificationBanner({ message, type =\n  'info', onClose }) {\n  return (\n    <div className={`alert alert-${type}`}>\n      <span>{message}</span>\n      {onClose && <button onClick={\n  onClose}>&times;</button>}\n    </div>\n  );\n}",
    "const useMediaQuery = (query) => {\n  const [matches, setMatches] = useState(() =>\n  window.matchMedia(query).matches);\n  useEffect(() => {\n    const matchMediaList = window.matchMedia(\n  query);\n    const handleChange = (e) => setMatches(\n  e.matches);\n    matchMediaList.addEventListener('change',\n  handleChange);\n    return () => matchMediaList.removeEventListe\n  ner('change', handleChange);\n  }, [query]);\n  return matches;\n};",
    "const useCopyToClipboard = () => {\n  const [copiedText, setCopiedText] = useState(\n  null);\n  const copy = async (text) => {\n    await navigator.clipboard.writeText(text);\n    setCopiedText(text);\n  };\n  return [copiedText, copy];\n};",
    "function Breadcrumbs({ items }) {\n  return (\n    <nav aria-label=\"breadcrumb\">\n      <ol>\n        {items.map((item, index) => (\n          <li key={item.href}><a href={\n  item.href}>{item.label}</a></li>\n        ))}\n      </ol>\n    </nav>\n  );\n}",
    "const useIsMounted = () => {\n  const isMounted = useRef(false);\n  useEffect(() => {\n    isMounted.current = true;\n    return () => { isMounted.current = false; };\n  }, []);\n  return isMounted;\n};",
    "function Spinner({ size = 'md' }) {\n  return <div className={`spinner spinner-${\n  size}`} aria-label=\"Loading...\" />;\n}",
    "function ErrorFallback({ error,\n  resetErrorBoundary }) {\n  return (\n    <div role=\"alert\">\n      <p>Something went wrong: {error.message}</p>\n      <button onClick={resetErrorBoundary}>Try\n  again</button>\n    </div>\n  );\n}",
    "function CounterWidget() {\n  const [val, setVal] = useState(0);\n  return (\n    <div className=\"counter-box\">\n      <button onClick={() => setVal(v => v -\n  1)}>-</button>\n      <span>{val}</span>\n      <button onClick={() => setVal(v => v +\n  1)}>+</button>\n    </div>\n  );\n}",
    "function CheckboxField({ label, checked,\n  onChange }) {\n  return (\n    <label className=\"checkbox-wrap\">\n      <input type=\"checkbox\" checked={checked}\n  onChange={e => onChange(e.target.checked)} />\n      <span>{label}</span>\n    </label>\n  );\n}",
    "function Stepper({ currentStep, totalSteps }) {\n  return (\n    <div className=\"stepper-dots\">\n      {Array.from({ length: totalSteps }).map((_,\n  i) => (\n        <span key={i} className={i <=\n  currentStep ? 'dot active' : 'dot'} />\n      ))}\n    </div>\n  );\n}",
    "const useClickOutside = (ref, handler) => {\n  useEffect(() => {\n    const listener = (event) => {\n      if (!ref.current || ref.current.contains(\n  event.target)) return;\n      handler(event);\n    };\n    document.addEventListener('mousedown',\n  listener);\n    return () => document.removeEventListener(\n  'mousedown', listener);\n  }, [ref, handler]);\n};",
    "function TableHeader({ columns }) {\n  return (\n    <thead>\n      <tr>{columns.map(col => <th key={col.key}>{\n  col.title}</th>)}</tr>\n    </thead>\n  );\n}",
    "function MetricCard({ title, value, change }) {\n  return (\n    <div className=\"metric-card\">\n      <h4>{title}</h4>\n      <div className=\"metric-val\">{value}</div>\n      <span className={change >= 0 ?\n  'text-success' : 'text-danger'}>{change}%</span>\n    </div>\n  );\n}",
    "const useWindowSize = () => {\n  const [size, setSize] = useState({ width:\n  window.innerWidth, height: window.innerHeight\n  });\n  useEffect(() => {\n    const handleResize = () => setSize({ width:\n  window.innerWidth, height: window.innerHeight\n  });\n    window.addEventListener('resize',\n  handleResize);\n    return () => window.removeEventListener(\n  'resize', handleResize);\n  }, []);\n  return size;\n};",
    "function SearchInput({ value, onChange,\n  placeholder }) {\n  return <input type=\"search\" value={value}\n  onChange={e => onChange(e.target.value)}\n  placeholder={placeholder}\n  className=\"search-input\" />;\n}",
    "function EmptyState({ title, description,\n  actionText, onAction }) {\n  return (\n    <div className=\"empty-state\">\n      <h3>{title}</h3>\n      <p>{description}</p>\n      <button onClick={onAction}\n  className=\"btn-primary\">{actionText}</button>\n    </div>\n  );\n}"
  ],
  "python": [
    "def calculate_discount(price, discount=0.1):\n  return round(price * (1 - discount), 2)",
    "from pydantic import BaseModel, EmailStr\n\nclass UserRegister(BaseModel):\n  username: str\n  email: EmailStr",
    "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens = [n for n in numbers if n % 2 == 0]",
    "from fastapi import FastAPI, HTTPException\n\napp = FastAPI()\n\n@app.get(\"/api/users/{user_id}\")\ndef get_user(user_id: int):\n  return {\"id\": user_id, \"status\": \"active\"}",
    "import bcrypt\n\ndef hash_password(plain_password: str) -> str:\n  salt = bcrypt.gensalt()\n  return bcrypt.hashpw(plain_password.encode(\n  'utf-8'), salt).decode('utf-8')",
    "from sqlalchemy import Column, Integer, String,\n  create_engine\nfrom sqlalchemy.orm import declarative_base\n\nBase = declarative_base()\n\nclass User(Base):\n  __tablename__ = 'users'\n  id = Column(Integer, primary_key=True)\n  name = Column(String(50))",
    "with open(\"config.json\", \"r\", encoding=\"utf-8\")\n  as f:\n  config_data = json.load(f)",
    "import jwt\nfrom datetime import datetime, timedelta\n\ndef create_access_token(data: dict):\n  to_encode = data.copy()\n  to_encode.update({\"exp\": datetime.utcnow() +\n  timedelta(hours=24)})\n  return jwt.encode(to_encode, \"SECRET_KEY\",\n  algorithm=\"HS256\")",
    "class DatabaseConnection:\n  def __enter__(self):\n    print(\"Connecting to DB...\")\n    return self\n  def __exit__(self, exc_type, exc_val, exc_tb):\n    print(\"Closed connection.\")",
    "import asyncio\n\nasync def main():\n  print(\"Fetching async data...\")\n  await asyncio.sleep(1)\n  print(\"Done!\")",
    "def parse_query_params(url_str):\n  from urllib.parse import parse_qs, urlparse\n  return parse_qs(urlparse(url_str).query)",
    "def retry_api_call(max_retries=3):\n  for attempt in range(max_retries):\n    try:\n      return fetch_data()\n    except Exception as e:\n      if attempt == max_retries - 1:\n        raise e",
    "from dataclasses import dataclass\n\n@dataclass\nclass Product:\n  id: int\n  name: str\n  price: float\n  in_stock: bool = True",
    "def format_user_report(users):\n  return [f\"User #{u['id']}: {u['name']} ({\n  u['role']})\" for u in users if u.get('active')]",
    "def handle_file_upload(file_bytes,\n  destination_path):\n  with open(destination_path, \"wb\") as buffer:\n    buffer.write(file_bytes)\n  return {\"status\": \"success\", \"size\": len(\n  file_bytes)}",
    "def time_it(func):\n  def wrapper(*args, **kwargs):\n    start = time.time()\n    result = func(*args, **kwargs)\n    print(f\"Elapsed: {time.time() - start:.4f}s\")\n    return result\n  return wrapper",
    "from typing import List, Optional\n\ndef find_by_email(users: List[dict], email: str)\n  -> Optional[dict]:\n  return next((u for u in users if u.get(\n  'email') == email), None)",
    "squared_dict = {x: x**2 for x in range(1, 6)}",
    "import os\nfrom pathlib import Path\n\nbase_dir = Path(__file__).resolve().parent\nsecret_key = os.getenv(\"API_SECRET_KEY\",\n  \"default-dev-key\")",
    "def sanitize_input(text: str) -> str:\n  import re\n  return re.sub(r'[<>&\"\\']', '', text).strip()",
    "import logging\n\nlogging.basicConfig(level=logging.INFO,\n  format=\"%(asctime)s - %(levelname)s - %(\n  message)s\")\nlogger = logging.getLogger(__name__)",
    "def divide_safely(a: float, b: float) ->\n  Optional[float]:\n  try:\n    return a / b\n  except ZeroDivisionError:\n    logger.error(\"Division by zero attempted.\")\n    return None",
    "def filter_prime_numbers(numbers: List[int]) ->\n  List[int]:\n  def is_prime(n):\n    return n > 1 and all(n % i != 0 for i in\n  range(2, int(n**0.5) + 1))\n  return [n for n in numbers if is_prime(n)]",
    "from collections import Counter\n\nwords = [\"apple\", \"banana\", \"apple\", \"orange\",\n  \"banana\", \"apple\"]\nword_counts = Counter(words)",
    "from functools import lru_cache\n\n@lru_cache(maxsize=128)\ndef fibonacci(n: int) -> int:\n  if n < 2:\n    return n\n  return fibonacci(n - 1) + fibonacci(n - 2)",
    "import uuid\n\ndef generate_session_token() -> str:\n  return str(uuid.uuid4())",
    "def merge_dictionaries(dict1: dict, dict2: dict)\n  -> dict:\n  return {**dict1, **dict2}",
    "import re\n\ndef validate_phone_number(phone: str) -> bool:\n  pattern = r\"^\\+?[1-9]\\d{1,14}$\"\n  return bool(re.match(pattern, phone))",
    "class CustomAPIError(Exception):\n  def __init__(self, message: str, status_code:\n  int = 400):\n    self.message = message\n    self.status_code = status_code\n    super().__init__(self.message)",
    "def read_csv_records(file_path: str):\n  import csv\n  with open(file_path, mode=\"r\",\n  encoding=\"utf-8\") as f:\n    reader = csv.DictReader(f)\n    return list(reader)",
    "def paginate_list(items: list, page: int = 1,\n  page_size: int = 10) -> list:\n  start = (page - 1) * page_size\n  return items[start:start + page_size]",
    "def remove_null_values(data: dict) -> dict:\n  return {k: v for k, v in data.items() if v is\n  not None}",
    "def flatten_nested_list(nested: list) -> list:\n  return [item for sublist in nested for item in\n  sublist]",
    "import secrets\n\ndef generate_secure_token(length: int = 32) ->\n  str:\n  return secrets.token_urlsafe(length)",
    "def get_file_extension(filename: str) -> str:\n  return os.path.splitext(filename)[1].lower()",
    "async def fetch_multiple_urls(urls: List[str]):\n  import httpx\n  async with httpx.AsyncClient() as client:\n    tasks = [client.get(url) for url in urls]\n    return await asyncio.gather(*tasks)",
    "def parse_timestamp(iso_str: str) -> datetime:\n  return datetime.fromisoformat(iso_str.replace(\n  'Z', '+00:00'))",
    "def convert_bytes_to_mb(size_bytes: int) -> float:\n  return round(size_bytes / (1024 * 1024), 2)",
    "class SinglyLinkedListNode:\n  def __init__(self, val=0, next=None):\n    self.val = val\n    self.next = next",
    "def is_palindrome(s: str) -> bool:\n  clean = re.sub(r'[^a-zA-Z0-9]', '', s).lower()\n  return clean == clean[::-1]",
    "def chunk_list(lst: list, n: int):\n  for i in range(0, len(lst), n):\n    yield lst[i:i + n]",
    "from typing import Union, Tuple\n\ndef parse_dimensions(dim_str: str) -> Tuple[int,\n  int]:\n  w, h = dim_str.split('x')\n  return int(w), int(h)",
    "def sort_by_nested_field(items: List[dict],\n  field: str, reverse=False):\n  return sorted(items, key=lambda x: x.get(field,\n  0), reverse=reverse)",
    "def deep_get(dictionary: dict, keys: str,\n  default=None):\n  for key in keys.split('.'):\n    if isinstance(dictionary, dict):\n      dictionary = dictionary.get(key, default)\n    else:\n      return default\n  return dictionary",
    "import json\n\ndef pretty_print_json(data: dict) -> str:\n  return json.dumps(data, indent=2,\n  ensure_ascii=False)",
    "def generate_slug(text: str) -> str:\n  clean = re.sub(r'[^\\w\\s-]', '', text).strip(\n  ).lower()\n  return re.sub(r'[-\\s]+', '-', clean)",
    "def count_lines_in_file(path: str) -> int:\n  with open(path, \"r\", encoding=\"utf-8\") as f:\n    return sum(1 for _ in f)",
    "def extract_hashtags(text: str) -> List[str]:\n  return re.findall(r'#\\w+', text)",
    "def is_valid_hex_color(color_str: str) -> bool:\n  return bool(re.match(r'^#(?:[0-9a-fA-F]{3}){1,\n  2}$', color_str))",
    "def calculate_growth_rate(current: float,\n  previous: float) -> float:\n  if previous == 0: return 0.0\n  return round(((current - previous) / previous)\n  * 100, 2)"
  ],
  "sql": [
    "SELECT u.id, u.username, u.email\nFROM users u\nWHERE u.role = 'developer'\nORDER BY u.created_at DESC;",
    "SELECT u.username, COUNT(p.id) AS total_posts\nFROM users u\nJOIN posts p ON u.id = p.user_id\nGROUP BY u.id, u.username;",
    "INSERT INTO users (username, email,\n  password_hash, role)\nVALUES ('alex_dev', 'alex@novicodes.dev',\n  '$2b$12$e8x...', 'admin');",
    "UPDATE users\nSET xp = xp + 250, updated_at = NOW()\nWHERE id = 42;",
    "CREATE TABLE orders (\n  id SERIAL PRIMARY KEY,\n  user_id INT REFERENCES users(id) ON DELETE\n  CASCADE,\n  amount NUMERIC(10, 2) NOT NULL,\n  status VARCHAR(20) DEFAULT 'pending'\n);",
    "CREATE UNIQUE INDEX idx_users_email ON users(\n  email);",
    "DELETE FROM audit_logs\nWHERE created_at < NOW() - INTERVAL '30 days';",
    "SELECT product_id, SUM(quantity) AS total_sold\nFROM order_items\nGROUP BY product_id\nHAVING SUM(quantity) > 100;",
    "WITH RecentOrders AS (\n  SELECT id, user_id, amount\n  FROM orders\n  WHERE status = 'completed'\n)\nSELECT r.id, u.email\nFROM RecentOrders r\nJOIN users u ON r.user_id = u.id;",
    "SELECT id, name, price,\n  RANK() OVER (PARTITION BY category ORDER BY\n  price DESC) AS price_rank\nFROM products;",
    "BEGIN;\nUPDATE accounts SET balance = balance - 100\n  WHERE id = 1;\nUPDATE accounts SET balance = balance + 100\n  WHERE id = 2;\nCOMMIT;",
    "SELECT u.username\nFROM users u\nWHERE EXISTS (\n  SELECT 1 FROM subscriptions s WHERE s.user_id\n  = u.id AND s.status = 'active'\n);",
    "SELECT COALESCE(phone, 'N/A') AS contact_number\nFROM user_profiles;",
    "ALTER TABLE users\nADD COLUMN last_login TIMESTAMP DEFAULT\n  CURRENT_TIMESTAMP;",
    "SELECT DATE_TRUNC('month', created_at) AS month,\n  COUNT(*) AS new_users\nFROM users\nGROUP BY month\nORDER BY month DESC;",
    "SELECT u.id, u.name, COALESCE(SUM(o.amount), 0)\n  AS total_spent\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.name;",
    "SELECT title, release_year\nFROM movies\nWHERE rating >= 8.5 AND release_year BETWEEN\n  2010 AND 2025\nORDER BY rating DESC;",
    "CREATE INDEX idx_orders_user_status ON orders(\n  user_id, status);",
    "SELECT category, AVG(price) AS avg_price, COUNT(\n  *) AS item_count\nFROM products\nGROUP BY category\nORDER BY avg_price DESC;",
    "INSERT INTO audit_events (action, user_id,\n  ip_address, created_at)\nVALUES ('login_success', 105, '192.168.1.1', NOW(\n  ));",
    "SELECT id, name, salary,\n  DENSE_RANK() OVER (ORDER BY salary DESC) as\n  salary_rank\nFROM employees;",
    "UPDATE user_profiles\nSET bio = 'Fullstack TypeScript & React Architect'\nWHERE user_id = 99;",
    "SELECT p.name, c.title AS category_name\nFROM products p\nINNER JOIN categories c ON p.category_id = c.id;",
    "SELECT department, COUNT(*) AS head_count\nFROM employees\nGROUP BY department\nHAVING COUNT(*) >= 5;",
    "CREATE TABLE comments (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  post_id INT NOT NULL REFERENCES posts(id),\n  author VARCHAR(60) NOT NULL,\n  content TEXT NOT NULL,\n  created_at TIMESTAMPTZ DEFAULT NOW()\n);",
    "SELECT id, email, created_at\nFROM users\nWHERE email LIKE '%@gmail.com'\nLIMIT 50 OFFSET 0;",
    "SELECT DISTINCT country\nFROM customers\nORDER BY country ASC;",
    "SELECT order_id, product_id, quantity *\n  unit_price AS line_total\nFROM order_details;",
    "DROP TABLE IF EXISTS temporary_imports;",
    "SELECT id, title, created_at\nFROM articles\nWHERE created_at >= CURRENT_DATE - INTERVAL '7\n  days';",
    "SELECT user_id, COUNT(*) AS login_count\nFROM login_history\nGROUP BY user_id\nORDER BY login_count DESC\nLIMIT 10;",
    "CREATE VIEW active_subscriptions_view AS\nSELECT s.id, u.email, s.plan, s.expires_at\nFROM subscriptions s\nJOIN users u ON s.user_id = u.id\nWHERE s.status = 'active';",
    "SELECT id, name, price, CASE\n  WHEN price > 100 THEN 'Premium'\n  WHEN price > 50 THEN 'Standard'\n  ELSE 'Budget'\nEND AS price_tier\nFROM products;",
    "SELECT student_id, course_id, grade,\n  ROW_NUMBER() OVER (PARTITION BY student_id\n  ORDER BY grade DESC) AS rank\nFROM enrollments;",
    "SELECT author_id, ARRAY_AGG(title) AS book_titles\nFROM books\nGROUP BY author_id;",
    "ALTER TABLE orders\nDROP CONSTRAINT IF EXISTS fk_orders_user;",
    "SELECT * FROM logs\nWHERE status_code IN (400, 401, 403, 404, 500);",
    "SELECT date, amount,\n  SUM(amount) OVER (ORDER BY date ROWS BETWEEN\n  UNBOUNDED PRECEDING AND CURRENT ROW) AS\n  running_total\nFROM daily_revenue;",
    "SELECT tag, COUNT(*) AS frequency\nFROM post_tags\nGROUP BY tag\nORDER BY frequency DESC\nLIMIT 20;",
    "TRUNCATE TABLE session_tokens;",
    "SELECT e.name AS employee_name, m.name AS\n  manager_name\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;",
    "SELECT metadata->>'tier' AS subscription_tier\nFROM customer_records\nWHERE metadata->>'active' = 'true';",
    "SELECT id, email FROM users WHERE deleted_at IS\n  NULL;",
    "SELECT CURRENT_TIMESTAMP, CURRENT_DATE,\n  CURRENT_TIME;",
    "CREATE TABLE tag_junction (\n  article_id INT REFERENCES articles(id),\n  tag_id INT REFERENCES tags(id),\n  PRIMARY KEY (article_id, tag_id)\n);",
    "SELECT name, LENGTH(name) AS name_length FROM\n  users ORDER BY name_length DESC;",
    "SELECT LOWER(email) AS normalized_email FROM\n  subscribers;",
    "SELECT product_id, stock_count FROM inventory\n  WHERE stock_count < 10 FOR UPDATE;",
    "SELECT customer_id, MAX(order_date) AS\n  latest_order FROM orders GROUP BY customer_id;",
    "EXPLAIN ANALYZE\nSELECT * FROM transactions WHERE account_id = 500;"
  ],
  "nextjs": [
    "export default function HomePage() {\n  return (\n    <main className=\"container\">\n      <h1>Welcome to Next.js App Router</h1>\n    </main>\n  );\n}",
    "'use client';\n\nimport { useState } from 'react';\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count +\n  1)}>Count: {count}</button>;\n}",
    "'use server';\n\nimport { revalidatePath } from 'next/cache';\n\nexport async function updateUsername(formData) {\n  const name = formData.get('username');\n  await db.user.update({ where: { id: 1 }, data:\n  { name } });\n  revalidatePath('/profile');\n}",
    "import { NextResponse } from 'next/server';\n\nexport async function GET(request) {\n  const data = await fetchUsers();\n  return NextResponse.json({ users: data });\n}",
    "import { notFound } from 'next/navigation';\n\nexport default async function Page({ params }) {\n  const post = await getPost(params.id);\n  if (!post) notFound();\n  return <article><h1>{post.title}</h1></article>;\n}",
    "import Image from 'next/image';\n\nexport default function HeroBanner() {\n  return <Image src=\"/hero.jpg\" alt=\"Hero\"\n  width={1200} height={600} priority />;\n}",
    "import Link from 'next/link';\n\nexport default function Navbar() {\n  return (\n    <nav>\n      <Link href=\"/dashboard\">Dashboard</Link>\n    </nav>\n  );\n}",
    "export const dynamic = 'force-dynamic';\nexport const revalidate = 3600;\n\nexport async function generateMetadata({ params\n  }) {\n  return { title: `Post #${params.id} |\n  NoviCodes` };\n}",
    "import { redirect } from 'next/navigation';\n\nexport default async function DashboardPage() {\n  const session = await getSession();\n  if (!session) redirect('/login');\n  return <div>Welcome {session.user.name}</div>;\n}",
    "export default function GlobalError({ error,\n  reset }) {\n  return (\n    <div>\n      <h2>Something went wrong!</h2>\n      <button onClick={() => reset()}>Try\n  again</button>\n    </div>\n  );\n}",
    "export default function LoadingSkeleton() {\n  return (\n    <div className=\"animate-pulse flex space-x-4\">\n      <div className=\"h-10 w-10 bg-slate-200\n  rounded-full\"></div>\n    </div>\n  );\n}",
    "import { cookies } from 'next/headers';\n\nexport async function getAuthToken() {\n  const cookieStore = cookies();\n  return cookieStore.get('token')?.value;\n}",
    "import { usePathname, useRouter } from\n  'next/navigation';\n\nexport default function ActiveLink({ href,\n  children }) {\n  const pathname = usePathname();\n  const isActive = pathname === href;\n  return <a className={isActive ? 'active' : ''}\n  href={href}>{children}</a>;\n}",
    "export async function generateStaticParams() {\n  const posts = await getPosts();\n  return posts.map(post => ({ id:\n  post.id.toString() }));\n}",
    "import { Suspense } from 'react';\n\nexport default function Dashboard() {\n  return (\n    <main>\n      <Suspense fallback={<p>Loading User\n  Feed...</p>}>\n        <UserFeed />\n      </Suspense>\n    </main>\n  );\n}",
    "import { headers } from 'next/headers';\n\nexport default async function UserIP() {\n  const headersList = headers();\n  const ip = headersList.get('x-forwarded-for')\n  || '127.0.0.1';\n  return <div>Your IP: {ip}</div>;\n}",
    "import { Inter } from 'next/font/google';\nconst inter = Inter({ subsets: ['latin'] });\nexport default function RootLayout({ children }) {\n  return <html lang=\"en\" className={\n  inter.className}><body>{children}</body></html>;\n}",
    "export async function POST(request) {\n  const body = await request.json();\n  const created = await db.post.create({ data:\n  body });\n  return NextResponse.json(created, { status:\n  201 });\n}",
    "'use server';\n\nimport { revalidateTag } from 'next/cache';\n\nexport async function publishArticle(id) {\n  await db.article.update({ where: { id }, data:\n  { published: true } });\n  revalidateTag('articles');\n}",
    "export default function NotFound() {\n  return (\n    <div className=\"text-center\">\n      <h2>404 - Page Not Found</h2>\n      <Link href=\"/\">Return Home</Link>\n    </div>\n  );\n}",
    "import { useSearchParams } from 'next/navigation';\n\nexport default function SearchFilter() {\n  const searchParams = useSearchParams();\n  const query = searchParams.get('q');\n  return <div>Searching for: {query}</div>;\n}",
    "export const runtime = 'edge';\n\nexport async function GET() {\n  return new Response('Edge Runtime Execution');\n}",
    "import { createClient } from\n  '@/utils/supabase/server';\n\nexport default async function ProtectedProfile() {\n  const supabase = createClient();\n  const { data: { user } } = await\n  supabase.auth.getUser();\n  return <div>Logged in as: {user.email}</div>;\n}",
    "export default function AnalyticsLayout({\n  children, team, reports }) {\n  return (\n    <div>\n      {children}\n      <div className=\"grid grid-cols-2\">{team}{\n  reports}</div>\n    </div>\n  );\n}",
    "'use client';\nimport { useFormStatus } from 'react-dom';\n\nexport function SubmitButton() {\n  const { pending } = useFormStatus();\n  return <button disabled={pending}>{pending ?\n  'Saving...' : 'Save Changes'}</button>;\n}",
    "'use client';\nimport { useFormState } from 'react-dom';\nimport { saveProfile } from '@/app/actions';\n\nexport default function ProfileForm() {\n  const [state, formAction] = useFormState(\n  saveProfile, null);\n  return <form action={formAction}><input\n  name=\"name\" /></form>;\n}",
    "import { draftMode } from 'next/headers';\n\nexport default async function PreviewPage() {\n  const { isEnabled } = draftMode();\n  return <div>Preview mode is {isEnabled ? 'ON'\n  : 'OFF'}</div>;\n}",
    "export default function PhotoModal({ children }) {\n  return <div className=\"modal-backdrop\">{\n  children}</div>;\n}",
    "import Script from 'next/script';\n\nexport default function Analytics() {\n  return <Script src=\"https://cdn.example.com/te\n  lemetry.js\" strategy=\"afterInteractive\" />;\n}",
    "import { permanentRedirect } from\n  'next/navigation';\n\nexport default function OldPageRoute() {\n  permanentRedirect('/new-path');\n}",
    "export async function generateViewport() {\n  return { themeColor: '#0f172a', width:\n  'device-width', initialScale: 1 };\n}",
    "export const fetchCache = 'force-no-store';\nexport const revalidate = 0;",
    "import { unstable_noStore as noStore } from\n  'next/cache';\n\nexport default async function RealTimeFeed() {\n  noStore();\n  const data = await getLiveScores();\n  return <div>Score: {data.score}</div>;\n}",
    "import { middleware } from './middleware';\n\nexport const config = {\n  matcher: ['/dashboard/:path*',\n  '/settings/:path*']\n};",
    "export function middleware(request) {\n  const token = request.cookies.get('token');\n  if (!token) return NextResponse.redirect(new\n  URL('/login', request.url));\n}",
    "import { Roboto_Mono } from 'next/font/google';\nconst robotoMono = Roboto_Mono({ subsets:\n  ['latin'], variable: '--font-mono' });",
    "import { sanitizeHtml } from '@/lib/sanitize';\n\nexport default function MarkdownView({ rawHtml\n  }) {\n  return <div dangerouslySetInnerHTML={{ __html:\n  sanitizeHtml(rawHtml) }} />;\n}",
    "export default async function PostPage({ params\n  }) {\n  const res = await fetch(\n  `https://api.example.com/posts/${params.id}`, {\n    next: { tags: ['posts'] }\n  });\n  const post = await res.json();\n  return <h1>{post.title}</h1>;\n}",
    "'use client';\nimport { useRouter } from 'next/navigation';\n\nexport function LogoutButton() {\n  const router = useRouter();\n  return <button onClick={() => { logout();\n  router.push('/login'); }}>Logout</button>;\n}",
    "export default function TabBar() {\n  return (\n    <div className=\"tabs\">\n      <Link href=\"/analytics/overview\">Overview<\n  /Link>\n      <Link href=\"/analytics/realtime\">Realtime<\n  /Link>\n    </div>\n  );\n}",
    "export async function DELETE(request, { params\n  }) {\n  await deleteRecord(params.id);\n  return NextResponse.json({ success: true });\n}",
    "'use client';\nimport { useSelectedLayoutSegment } from\n  'next/navigation';\n\nexport default function NavSegment() {\n  const segment = useSelectedLayoutSegment();\n  return <span>Active Section: {segment}</span>;\n}",
    "export default function PricingSection() {\n  return (\n    <section className=\"pricing\">\n      <h2>Transparent Pricing</h2>\n    </section>\n  );\n}",
    "export async function PUT(request, { params }) {\n  const payload = await request.json();\n  const updated = await updateItem(params.id,\n  payload);\n  return NextResponse.json(updated);\n}",
    "import { Suspense } from 'react';\nimport SkeletonList from\n  '@/components/SkeletonList';\n\nexport default function Feed() {\n  return <Suspense fallback={<SkeletonList\n  />}><LivePostFeed /></Suspense>;\n}",
    "export default function AppShell({ children }) {\n  return (\n    <div className=\"layout-shell\">\n      <aside className=\"sidebar\"></aside>\n      <main>{children}</main>\n    </div>\n  );\n}",
    "'use client';\nimport { useOptimistic } from 'react';\n\nexport default function UpvoteWidget({ votes,\n  onVote }) {\n  const [optVotes, setOptVotes] = useOptimistic(\n  votes, (cur, add) => cur + add);\n  return <button onClick={() => { setOptVotes(1);\n  onVote(); }}>▲ {optVotes}</button>;\n}",
    "export const preferredRegion = 'iad1';\nexport const maxDuration = 30;",
    "import { headers } from 'next/headers';\n\nexport function getClientCountry() {\n  return headers().get('x-vercel-ip-country') ||\n  'US';\n}",
    "export default function FeatureGate({ isEnabled,\n  children }) {\n  if (!isEnabled) return null;\n  return <div className=\"feature-active\">{\n  children}</div>;\n}"
  ]
};

    class DevTypeEngine {
        constructor() {
            this.currentMode = 'js';
            this.timeLimit = 30; // seconds (0 = infinite single snippet)
            this.timeRemaining = 30;
            this.streamText = '';
            this.lines = []; // Array of line strings
            this.charElements = []; // 2D array: [lineIndex][charIndex] -> span element
            this.flatChars = []; // 1D array of all char metadata { char, lineIdx, charIdx, el }
            
            this.currentCursor = 0; // index in flatChars
            this.mistakes = 0;
            this.correctChars = 0;
            this.totalTyped = 0;
            
            this.startTime = null;
            this.timer = null;
            this.isPlaying = false;

            this.init();
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }

        setup() {
            this.typingCard = document.querySelector('.typing-area-card');
            this.codeDisplay = document.getElementById('codeDisplay');
            this.hiddenInput = document.getElementById('hiddenInput');
            this.wpmEl = document.getElementById('wpmVal');
            this.cpmEl = document.getElementById('cpmVal');
            this.accuracyEl = document.getElementById('accuracyVal');
            this.timerLabelEl = document.getElementById('timerLabelVal');
            this.timerValEl = document.getElementById('timerVal');
            this.highScoreEl = document.getElementById('highScoreVal');

            this.retryBtn = document.getElementById('retryBtn');
            this.nextBtn = document.getElementById('nextBtn');

            this.loadHighScore();
            this.bindEvents();
            this.loadMode(this.currentMode);
        }

        bindEvents() {
            // Mode buttons (HTML, CSS, JS, REACT, PYTHON, SQL, NEXTJS)
            document.querySelectorAll('.mode-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this.currentMode = e.currentTarget.dataset.mode;
                    this.loadMode(this.currentMode);
                });
            });

            // Timer buttons (15s, 30s, 60s, custom, 0)
            document.querySelectorAll('.timer-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const timeVal = e.currentTarget.dataset.time;
                    if (timeVal === 'custom') {
                        this.promptCustomTimer(e.currentTarget);
                    } else {
                        document.querySelectorAll('.timer-btn').forEach(b => b.classList.remove('active'));
                        e.currentTarget.classList.add('active');
                        this.timeLimit = parseInt(timeVal, 10);
                        this.resetSession();
                    }
                });
            });

            // Action Buttons
            if (this.retryBtn) this.retryBtn.addEventListener('click', () => this.resetSession());
            if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.loadMode(this.currentMode));

            // Typing & Focus Handling: Click anywhere on card or viewport to focus
            if (this.typingCard) {
                this.typingCard.addEventListener('click', () => this.focusInput());
            }
            if (this.codeDisplay) {
                this.codeDisplay.addEventListener('click', () => this.focusInput());
            }

            if (this.hiddenInput) {
                this.hiddenInput.addEventListener('input', () => this.handleTyping());
                this.hiddenInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
            }

            // Global Key Handler: Auto-focus hiddenInput on any typing keystroke & handle shortcuts
            document.addEventListener('keydown', (e) => {
                // Ignore if interacting with another modal, input, or button
                if (e.target.tagName === 'INPUT' && e.target !== this.hiddenInput) return;
                if (e.target.tagName === 'TEXTAREA' && e.target !== this.hiddenInput) return;
                if (e.target.tagName === 'BUTTON') return;

                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.resetSession();
                    return;
                }

                // Auto focus on printable characters
                if (document.activeElement !== this.hiddenInput && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    this.focusInput();
                }
            });
        }

        promptCustomTimer(btnEl) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Custom Speedrun Timer',
                    input: 'number',
                    inputLabel: 'Enter duration in seconds (5 to 600 seconds):',
                    inputValue: 45,
                    showCancelButton: true,
                    confirmButtonColor: '#A33B24',
                    cancelButtonColor: '#BAB4A6',
                    confirmButtonText: 'Set Timer',
                    cancelButtonText: 'Cancel',
                    inputValidator: (value) => {
                        const num = parseInt(value, 10);
                        if (!value || isNaN(num) || num < 5 || num > 600) {
                            return 'Please enter a duration between 5 and 600 seconds.';
                        }
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        const customSecs = parseInt(result.value, 10);
                        document.querySelectorAll('.timer-btn').forEach(b => b.classList.remove('active'));
                        btnEl.classList.add('active');
                        btnEl.textContent = `⏱️ ${customSecs}s`;
                        this.timeLimit = customSecs;
                        this.resetSession();
                    }
                });
            }
        }

        loadHighScore() {
            const saved = localStorage.getItem('devtype_highscore_wpm') || '0';
            if (this.highScoreEl) {
                this.highScoreEl.textContent = `${saved} WPM`;
            }
        }

        loadMode(mode) {
            this.currentMode = mode;
            this.resetSession();
        }

        generateContinuousStream() {
            const snippets = codeSnippets[this.currentMode] || codeSnippets.js;
            if (this.timeLimit === 0) {
                // Untimed mode: 1 complete standalone snippet
                return snippets[Math.floor(Math.random() * snippets.length)];
            }

            // Timed mode: Shuffle and chain 25 snippets seamlessly
            const shuffled = [...snippets].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, 25).join('\n\n');
        }

        resetSession() {
            clearInterval(this.timer);
            this.isPlaying = false;
            this.startTime = null;
            this.timeRemaining = this.timeLimit > 0 ? this.timeLimit : 0;

            this.currentCursor = 0;
            this.mistakes = 0;
            this.correctChars = 0;
            this.totalTyped = 0;

            if (this.timerValEl) {
                this.timerValEl.textContent = this.timeLimit > 0 ? `${this.timeRemaining}s` : '∞ Untimed';
            }

            if (this.wpmEl) this.wpmEl.textContent = '0 WPM';
            if (this.cpmEl) this.cpmEl.textContent = '0';
            if (this.accuracyEl) this.accuracyEl.textContent = '100%';

            this.streamText = this.generateContinuousStream();

            if (this.hiddenInput) {
                this.hiddenInput.value = '';
            }

            this.buildCodeLinesDOM();
            this.focusInput();
        }

        focusInput() {
            if (this.hiddenInput) {
                this.hiddenInput.focus();
            }
        }

        buildCodeLinesDOM() {
            if (!this.codeDisplay) return;
            this.codeDisplay.innerHTML = '';
            this.codeDisplay.style.transform = 'translateY(0px)';

            this.lines = this.streamText.split('\n');
            this.charElements = [];
            this.flatChars = [];

            const fragment = document.createDocumentFragment();

            for (let lineIdx = 0; lineIdx < this.lines.length; lineIdx++) {
                const lineStr = this.lines[lineIdx];
                const lineDiv = document.createElement('div');
                lineDiv.className = 'code-line';
                lineDiv.dataset.line = lineIdx;

                const lineChars = [];

                for (let charIdx = 0; charIdx < lineStr.length; charIdx++) {
                    const char = lineStr[charIdx];
                    const span = document.createElement('span');
                    span.className = 'char';
                    span.textContent = char;

                    lineDiv.appendChild(span);
                    lineChars.push(span);

                    this.flatChars.push({
                        char: char,
                        lineIdx: lineIdx,
                        charIdx: charIdx,
                        el: span,
                        isNewline: false
                    });
                }

                // Add newline character to flatChars if not last line
                if (lineIdx < this.lines.length - 1) {
                    const newlineSpan = document.createElement('span');
                    newlineSpan.className = 'char char-newline';
                    newlineSpan.textContent = ' ';
                    lineDiv.appendChild(newlineSpan);
                    lineChars.push(newlineSpan);

                    this.flatChars.push({
                        char: '\n',
                        lineIdx: lineIdx,
                        charIdx: lineStr.length,
                        el: newlineSpan,
                        isNewline: true
                    });
                }

                this.charElements.push(lineChars);
                fragment.appendChild(lineDiv);
            }

            this.codeDisplay.appendChild(fragment);

            // Set initial cursor on character 0
            if (this.flatChars.length > 0) {
                this.flatChars[0].el.classList.add('current');
            }
        }

        handleKeyDown(e) {
            // VS Code Tab Key Support (Insert 2 spaces)
            if (e.key === 'Tab') {
                e.preventDefault();
                if (!this.hiddenInput) return;

                const start = this.hiddenInput.selectionStart;
                const val = this.hiddenInput.value;
                this.hiddenInput.value = val.substring(0, start) + '  ' + val.substring(start);
                this.hiddenInput.selectionStart = this.hiddenInput.selectionEnd = start + 2;

                this.handleTyping();
            }
        }

        handleTyping() {
            if (!this.isPlaying) {
                this.isPlaying = true;
                this.startTime = new Date();

                if (this.timeLimit > 0) {
                    this.timer = setInterval(() => this.tickTimer(), 1000);
                }
            }

            const val = this.hiddenInput.value;
            const typedLen = val.length;
            this.totalTyped = typedLen;

            let errors = 0;
            let correct = 0;

            // Loop over typed portion and active cursor
            const maxIdx = Math.min(this.flatChars.length, typedLen + 1);

            for (let i = 0; i < maxIdx; i++) {
                const item = this.flatChars[i];
                if (!item) continue;

                if (i < typedLen) {
                    const typedChar = val[i];
                    const expectedChar = item.char;

                    if (typedChar === expectedChar) {
                        item.el.className = item.isNewline ? 'char char-newline correct' : 'char correct';
                        correct++;
                    } else {
                        item.el.className = item.isNewline ? 'char char-newline incorrect' : 'char incorrect';
                        errors++;
                    }
                } else if (i === typedLen) {
                    item.el.className = item.isNewline ? 'char char-newline current' : 'char current';
                }
            }

            // Clear any lingering classes on chars beyond cursor
            for (let j = maxIdx; j < Math.min(this.flatChars.length, maxIdx + 5); j++) {
                const item = this.flatChars[j];
                if (item) {
                    item.el.className = item.isNewline ? 'char char-newline' : 'char';
                }
            }

            this.mistakes = errors;
            this.correctChars = correct;

            // Adaptive Cursor Viewport Following: Works seamlessly on Desktop & Mobile Soft-Wrap
            const currentItem = this.flatChars[Math.min(typedLen, this.flatChars.length - 1)];
            if (currentItem && currentItem.el) {
                const spanTop = currentItem.el.offsetTop;
                // Threshold: If cursor moves past 52px (2nd row), scroll smoothly to center it
                if (spanTop > 52) {
                    const scrollY = -(spanTop - 26);
                    this.codeDisplay.style.transform = `translateY(${scrollY}px)`;
                } else {
                    this.codeDisplay.style.transform = 'translateY(0px)';
                }
            }

            this.updateStats();

            // End of snippet / stream handling
            if (typedLen >= this.flatChars.length) {
                if (this.timeLimit > 0) {
                    // Seamlessly append more code
                    const extra = '\n\n' + this.generateContinuousStream();
                    this.streamText += extra;
                    this.buildCodeLinesDOM();
                    this.hiddenInput.value = val;
                } else {
                    this.finishSpeedrun();
                }
            }
        }

        tickTimer() {
            this.timeRemaining--;
            if (this.timerValEl) this.timerValEl.textContent = `${this.timeRemaining}s`;

            this.updateStats();

            if (this.timeRemaining <= 0) {
                this.finishSpeedrun();
            }
        }

        updateStats() {
            if (!this.startTime) return;
            const now = new Date();
            const elapsedSeconds = Math.max(0.5, (now - this.startTime) / 1000);
            const elapsedMinutes = elapsedSeconds / 60;

            const wpm = Math.round((this.correctChars / 5) / elapsedMinutes) || 0;
            const cpm = Math.round(this.correctChars / elapsedMinutes) || 0;
            const accuracy = this.totalTyped > 0 ? Math.round((this.correctChars / this.totalTyped) * 100) : 100;

            if (this.wpmEl) this.wpmEl.textContent = `${wpm} WPM`;
            if (this.cpmEl) this.cpmEl.textContent = `${cpm}`;
            if (this.accuracyEl) this.accuracyEl.textContent = `${accuracy}%`;
        }

        finishSpeedrun() {
            clearInterval(this.timer);
            this.isPlaying = false;

            const now = new Date();
            const elapsedSeconds = this.startTime ? Math.max(1, (now - this.startTime) / 1000) : 1;
            const elapsedMinutes = elapsedSeconds / 60;

            const finalWpm = Math.round((this.correctChars / 5) / elapsedMinutes) || 0;
            const finalCpm = Math.round(this.correctChars / elapsedMinutes) || 0;
            const finalAccuracy = this.totalTyped > 0 ? Math.round((this.correctChars / this.totalTyped) * 100) : 100;

            // Save High Score
            const currentHigh = parseInt(localStorage.getItem('devtype_highscore_wpm') || '0', 10);
            let isNewHigh = false;
            if (finalWpm > currentHigh) {
                localStorage.setItem('devtype_highscore_wpm', finalWpm.toString());
                isNewHigh = true;
                this.loadHighScore();
            }

            // Trigger Victory Confetti
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }

            // Results Modal
            if (typeof Swal !== 'undefined') {
                const modeTitles = {
                    html: 'HTML5 Semantic',
                    css: 'CSS Styling & Motion',
                    js: 'JavaScript ES6+',
                    react: 'React 19 Components',
                    python: 'Python 3.12 Backend',
                    sql: 'SQL & Database Queries',
                    nextjs: 'Next.js App Router'
                };

                Swal.fire({
                    title: isNewHigh ? '🏆 New Personal Record!' : '⌨️ Speedrun Complete!',
                    html: `
                        <div style="text-align: center; margin: 16px 0;">
                            <div style="font-family: var(--font-mono, monospace); font-size: 0.82rem; color: var(--text-muted, #686760); text-transform: uppercase; margin-bottom: 8px;">
                                Track: ${modeTitles[this.currentMode] || this.currentMode.toUpperCase()}
                            </div>
                            <div style="font-size: 3rem; font-weight: 700; color: var(--accent-oxide, #A33B24); line-height: 1; font-family: var(--font-mono, monospace);">
                                ${finalWpm} <span style="font-size: 1rem; color: var(--text-muted, #686760); font-weight: 500;">WPM</span>
                            </div>
                            <div style="display: flex; justify-content: space-around; margin-top: 20px; padding: 12px; background: var(--canvas-base, #F1EEE7); border-radius: 4px; border: 1px solid var(--border-subtle, #D5D0C6);">
                                <div>
                                    <div style="font-size: 1.15rem; font-weight: 600; color: var(--text-title, #20211F); font-family: var(--font-mono, monospace);">${finalAccuracy}%</div>
                                    <div style="font-size: 0.72rem; color: var(--text-muted, #686760); text-transform: uppercase;">Accuracy</div>
                                </div>
                                <div>
                                    <div style="font-size: 1.15rem; font-weight: 600; color: var(--text-title, #20211F); font-family: var(--font-mono, monospace);">${finalCpm}</div>
                                    <div style="font-size: 0.72rem; color: var(--text-muted, #686760); text-transform: uppercase;">CPM</div>
                                </div>
                                <div>
                                    <div style="font-size: 1.15rem; font-weight: 600; color: var(--text-title, #20211F); font-family: var(--font-mono, monospace);">${this.totalTyped}</div>
                                    <div style="font-size: 0.72rem; color: var(--text-muted, #686760); text-transform: uppercase;">Keystrokes</div>
                                </div>
                            </div>
                        </div>
                    `,
                    confirmButtonColor: '#A33B24',
                    confirmButtonText: 'Play Again (Esc)',
                    showCancelButton: false
                }).then(() => {
                    this.resetSession();
                });
            }
        }
    }

    window.showArcadeHelpModal = function() {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'DevType Arcade: How It Works',
                html: `
                    <div style="text-align: left; line-height: 1.6; font-size: 0.90rem; color: var(--text-body, #20211F);">
                        <p><strong>DevType Arcade</strong> is built to help developers build instinctive muscle memory across modern frameworks and languages.</p>
                        <ul style="padding-left: 20px; margin: 12px 0;">
                            <li><strong>Continuous Flow:</strong> Real-world snippets stream seamlessly until the timer expires.</li>
                            <li><strong>VS Code Tab Support:</strong> Press <kbd style="padding: 2px 6px; background: #E5E1D8; border-radius: 2px; font-family: monospace;">Tab</kbd> to insert 2 spaces just like in your code editor.</li>
                            <li><strong>Instant Restart:</strong> Press <kbd style="padding: 2px 6px; background: #E5E1D8; border-radius: 2px; font-family: monospace;">Esc</kbd> at any time to immediately reset with a fresh snippet queue.</li>
                            <li><strong>7 Developer Tracks:</strong> 350 curated patterns across HTML, CSS, JavaScript, React, Python, SQL, and Next.js App Router.</li>
                        </ul>
                    </div>
                `,
                confirmButtonColor: '#A33B24',
                confirmButtonText: 'Got It (Start Typing)'
            });
        }
    };

    new DevTypeEngine();
})();
