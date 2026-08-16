/**
 * NoviCodes - Level 8: Async UI & Client Data Architecture Foundations Data Module
 */
window.LEVEL8_ASYNC_DATA = {
    "id": "level8_async",
    "title": "Level 8: Async UI & Live Data Foundations",
    "subtitle": "Skeleton Loaders, Error States & Optimistic Updates",
    "badgeIcon": "🌉",
    "xpReward": 300,
    "trackKey": "async",
    "nextTrackUrl": "./foundations.html?track=auth",
    "nextTrackName": "Level 9: User Logins & Security UI Foundations",
    "concepts": {
        "heroAnalogy": {
            "title": "Async UI is Like a Fast-Food Drive-Thru Pager & Instant Receipt",
            "description": "Have you ever ordered food and the cashier just stared at you silently for 10 seconds without handing you a receipt or saying a word? That's what a website feels like without Async UI! High-performance apps (like YouTube, Instagram, and Linear) never freeze. They instantly acknowledge your click, show sleek gray pulsing skeleton outlines while data travels across the globe, and update like buttons in 0ms (Optimistic UI)!",
            "icon": "🌉"
        },
        "sections": [
            {
                "title": "1. The 3 Essential UI States: Idle, Pending, and Error",
                "content": `
                <p>Every asynchronous network request (fetching products, submitting a form, saving settings) MUST account for <strong>3 distinct visual states</strong>:</p>
                <ol>
                    <li><strong>Idle / Success:</strong> Displaying the rich data cleanly once received.</li>
                    <li><strong>Pending / Loading:</strong> Showing that work is actively happening in the background (disabling submit buttons to prevent double-charging credit cards!).</li>
                    <li><strong>Error / Retry:</strong> Displaying a friendly message when Wi-Fi drops, with a simple <code>1-Click Retry</code> button.</li>
                </ol>
                <div class="code-explain-box">
                    <pre><code>function ProductList() {
  const [status, setStatus] = useState('pending'); // 'idle' | 'pending' | 'error'

  if (status === 'pending') return &lt;ProductSkeletonList /&gt;;
  if (status === 'error') return &lt;ErrorRetryBanner onRetry={fetchData} /&gt;;
  return &lt;div&gt;{/* Render Products */}&lt;/div&gt;;
}</code></pre>
                </div>
                `
            },
            {
                "title": "2. Skeleton Loaders vs Spinners: Perceived Performance",
                "content": `
                <p>Why did companies like Facebook and LinkedIn replace circular spinning wheels with <strong>Skeleton Loaders</strong>?</p>
                <p>Research in user cognitive psychology reveals that spinning wheels force the user to stare at a clock, making wait times feel <strong>2x longer</strong>. Pulsing skeleton outlines preview the layout shape of cards and avatars, tricking the brain into feeling that content is loading immediately!</p>
                <div class="code-explain-box">
                    <pre><code>/* Smooth pulsing shimmer skeleton effect */
.skeleton-box {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}</code></pre>
                </div>
                `
            },
            {
                "title": "3. Optimistic UI: Updating in 0 Milliseconds",
                "content": `
                <p>When you tap the <strong>❤️ Like button</strong> on Instagram or Twitter, does the heart wait 800ms for a server in Virginia to respond before turning red?</p>
                <p><strong>No!</strong> The app immediately turns the heart red and increments the counter locally in <strong>0ms (Optimistic Update)</strong>. In the background, it quietly sends the API request. In the rare 0.01% case where your phone has no internet, it rolls the heart back and shows a notification.</p>
                `
            },
            {
                "title": "4. Live Polling & Timer Cleanup: Stopping Memory Leaks",
                "content": `
                <p>To keep live notifications and stock prices fresh, web apps use <strong>Periodic Polling</strong> (e.g. asking the server for updates every 5 seconds with <code>setInterval</code>).</p>
                <p><strong>The Golden Rule of Timers:</strong> If a user navigates away from your page, you MUST call <code>clearInterval(timerId)</code>. Otherwise, the timer continues running invisibly in the computer's memory forever (called a <strong>Memory Leak</strong>), draining the user's laptop battery!</p>
                `
            }
        ]
    },
    "glossary": [
        {
            "term": "Optimistic UI",
            "category": "UX Architecture",
            "definition": "A pattern where the UI updates immediately on user action before the server request finishes, rolling back if the request fails.",
            "analogy": "Handing someone their ordered coffee immediately while the credit card machine processes the payment in the background.",
            "codeSnippet": "setLiked(true); // Optimistic\napi.like().catch(() => setLiked(false)); // Rollback"
        },
        {
            "term": "Skeleton Loader",
            "category": "UX Design",
            "definition": "A low-fidelity wireframe preview of content (pulsing gray blocks) displayed while real data is loading.",
            "analogy": "A blueprint sketch of a building displayed before construction finishes.",
            "codeSnippet": "<div className=\"skeleton skeleton-title\"></div>"
        },
        {
            "term": "Pending State",
            "category": "State Management",
            "definition": "The transitional state during which an asynchronous operation has started but has not yet completed.",
            "analogy": "The yellow amber light at a traffic intersection indicating a change is underway.",
            "codeSnippet": "const [isLoading, setIsLoading] = useState(true);"
        },
        {
            "term": "Error Boundary",
            "category": "Resilience",
            "definition": "A React component pattern that catches JavaScript errors anywhere in its child component tree and displays a fallback UI.",
            "analogy": "A circuit breaker in your electrical box that shuts off one room instead of burning down the whole house.",
            "codeSnippet": "<ErrorBoundary fallback={<ErrorScreen />}>\n  <Widget />\n</ErrorBoundary>"
        },
        {
            "term": "Polling",
            "category": "Networking",
            "definition": "A technique where a client repeatedly requests fresh data from a server at fixed time intervals (e.g., every 5000ms).",
            "analogy": "A child in the backseat repeatedly asking 'Are we there yet?' every 30 seconds.",
            "codeSnippet": "const interval = setInterval(fetchLiveOrders, 5000);"
        },
        {
            "term": "Memory Leak",
            "category": "Performance",
            "definition": "A bug where unused memory (like orphaned timers or event listeners) fails to be released, slowing down the browser over time.",
            "analogy": "Leaving the water tap running in an empty bathroom indefinitely.",
            "codeSnippet": "return () => clearInterval(timerId); // Cleanup!"
        },
        {
            "term": "Perceived Performance",
            "category": "Human Factors",
            "definition": "How fast a software interface feels to a human user, which is often more important than the actual raw mathematical latency.",
            "analogy": "Mirrors installed in elevator lobbies that make waiting for elevators feel much faster to passengers.",
            "codeSnippet": "// Skeleton loaders & optimistic UI increase perceived speed"
        },
        {
            "term": "Debounce",
            "category": "Optimization",
            "definition": "Delaying the execution of a function until a specified time has elapsed since the last time it was invoked.",
            "analogy": "An elevator waiting 5 seconds after the last person steps in before closing the doors.",
            "codeSnippet": "const debouncedSearch = debounce(searchAPI, 300);"
        }
    ],
    "sandbox": {
        "instructions": "Test the live Async UI simulator below! Switch between Normal Mode, Skeleton Loader Mode, and instant Optimistic Like buttons to experience the difference in perceived speed.",
        "initialHTML": `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Async UI & Optimistic Sandbox</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      padding: 16px;
      margin: 0;
    }
    .async-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 20px;
      max-width: 400px;
      margin: 0 auto;
      box-shadow: 0 4px 14px rgba(0,0,0,0.06);
    }
    .post-header { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
    .avatar { width: 42px; height: 42px; border-radius: 50%; background: #0284c7; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; }
    .btn-like {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 0.88rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn-like.liked {
      background: #fee2e2;
      border-color: #fca5a5;
      color: #dc2626;
      transform: scale(1.05);
    }
    .skeleton-bar {
      height: 12px;
      background: #e2e8f0;
      border-radius: 4px;
      margin-bottom: 8px;
      animation: pulse 1.2s infinite ease-in-out;
    }
    @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
    .log-box {
      margin-top: 14px;
      background: #0f172a;
      color: #38bdf8;
      font-family: monospace;
      font-size: 0.78rem;
      padding: 8px 12px;
      border-radius: 6px;
    }
  </style>
</head>
<body>
  <div class="async-card">
    <div class="post-header">
      <div class="avatar" id="avatarBox">JS</div>
      <div>
        <div style="font-weight: 800; font-size: 0.95rem;">Alex Developer</div>
        <div style="font-size: 0.75rem; color: #64748b;">Posted 2 mins ago</div>
      </div>
    </div>

    <p id="postContent" style="font-size: 0.9rem; line-height: 1.5; color: #334155; margin-bottom: 16px;">
      Optimistic UI makes button clicks react in <strong>0ms</strong>! Click the like button below to test it live.
    </p>

    <div style="display: flex; justify-content: space-between; align-items: center;">
      <button class="btn-like" id="likeBtn" onclick="handleOptimisticLike()">
        <span id="heartIcon">🤍</span> <span id="likeText">Like</span> (<span id="likeCount">142</span>)
      </button>
      <button onclick="reloadPost()" style="background: none; border: none; color: #0284c7; cursor: pointer; font-size: 0.8rem; font-weight: 700;">🔄 Simulate Reload</button>
    </div>

    <div class="log-box" id="networkLog">&gt; Network Idle. Zero lag.</div>
  </div>

  <script>
    let liked = false;
    let count = 142;

    function handleOptimisticLike() {
      liked = !liked;
      count += (liked ? 1 : -1);
      
      // 0ms INSTANT OPTIMISTIC UPDATE
      const btn = document.getElementById('likeBtn');
      document.getElementById('likeCount').textContent = count;
      document.getElementById('heartIcon').textContent = liked ? '❤️' : '🤍';
      btn.className = liked ? 'btn-like liked' : 'btn-like';
      
      const log = document.getElementById('networkLog');
      log.textContent = '> [0ms] UI updated optimistically! Background API syncing...';
      
      setTimeout(() => {
        log.textContent = '> [350ms] Background API confirmed 200 OK from server.';
      }, 350);
    }

    function reloadPost() {
      const content = document.getElementById('postContent');
      content.innerHTML = '<div class="skeleton-bar" style="width: 90%;"></div><div class="skeleton-bar" style="width: 75%;"></div>';
      document.getElementById('networkLog').textContent = '> [Pending] Showing skeleton shimmer loader...';
      setTimeout(() => {
        content.innerHTML = 'Optimistic UI makes button clicks react in <strong>0ms</strong>! Click the like button below to test it live.';
        document.getElementById('networkLog').textContent = '> [Ready] Real data loaded in 400ms.';
      }, 400);
    }
  </script>
</body>
</html>`
    },
    "quizzes": [
        {
            "id": "async_q1",
            "question": "What is Optimistic UI in modern frontend architecture?",
            "options": [
                "Updating the user interface instantly when clicked before the server network request finishes.",
                "Hoping that the code has no bugs without testing it.",
                "Removing all loading screens from a website completely.",
                "Using only bright, cheerful colors in CSS."
            ],
            "correctIndex": 0,
            "explanation": "Optimistic UI immediately updates the screen (like turning a heart button red in 0ms) assuming the network request will succeed, reverting only if an error occurs."
        },
        {
            "id": "async_q2",
            "question": "Why are Skeleton Loaders preferred over circular spinning wheels?",
            "options": [
                "Because spinners take up too much internet bandwidth.",
                "Because skeleton wireframes preview the content layout, reducing perceived wait time for users.",
                "Because skeleton loaders do not require any CSS.",
                "Because web browsers no longer support spinning animations."
            ],
            "correctIndex": 1,
            "explanation": "Skeleton loaders preview the structural layout of content (text lines, image placeholders), tricking the human brain into perceiving the load time as significantly faster."
        },
        {
            "id": "async_q3",
            "question": "Why is it critical to call clearInterval() when a component with a polling timer unmounts?",
            "options": [
                "To turn off the computer monitor.",
                "To prevent memory leaks where invisible background timers continue running and draining device battery.",
                "To delete the database records.",
                "To restart the web browser."
            ],
            "correctIndex": 1,
            "explanation": "Clearing timers on unmount prevents memory leaks, ensuring unused intervals don't continue executing in the background and draining CPU/memory resources."
        }
    ]
};
