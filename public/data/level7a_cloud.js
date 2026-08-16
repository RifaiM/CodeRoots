/**
 * NoviCodes - Level 7A: Cloud Systems & DevOps Foundations Data Module
 */
window.LEVEL7A_CLOUD_DATA = {
    "id": "level7a_cloud",
    "title": "Level 7A: Cloud & Deployment Foundations",
    "subtitle": "Static Hosting, Serverless, Containers & CI/CD Pipelines",
    "badgeIcon": "☁️",
    "xpReward": 300,
    "trackKey": "cloud",
    "nextTrackUrl": "./foundations.html?track=sql",
    "nextTrackName": "Level 7B: SQL & Database Foundations",
    "concepts": {
        "heroAnalogy": {
            "title": "Docker Containers are Like Standardized Steel Shipping Cargo Containers",
            "description": "Before 1956, loading cargo onto ships was chaotic—barrels leaked, wooden boxes smashed, and every dock required different cranes. Standardized steel shipping containers revolutionized global trade because any truck, train, or ship could carry the exact same steel box. Docker does the exact same thing for software: it packs your app, Node/Python runtime, and settings into an isolated container that runs identically on any computer or cloud server on Earth!",
            "icon": "☁️"
        },
        "sections": [
            {
                "title": "1. \"It Works on My Machine\": The Great DevOps Problem",
                "content": `
                <p>Have you ever shared code with a friend, only for them to say: <em>\"It crashed on my laptop!\"</em>?</p>
                <p>That happens because your laptop might have Node v20 on Mac, while their computer runs Node v16 on Windows with missing system libraries.</p>
                <p><strong>The Container Solution:</strong> Instead of shipping just your code files, you ship a <strong>Docker Container</strong>—a lightweight, self-contained mini computer environment containing your exact OS, Node version, and libraries. If it works in the container, it works everywhere!</p>
                `
            },
            {
                "title": "2. Dockerfile vs Image vs Container: Recipe vs Cake",
                "content": `
                <p>DevOps engineers work with 3 core concepts:</p>
                <ol>
                    <li><strong>Dockerfile (The Written Recipe):</strong> A text file containing step-by-step instructions (e.g. <code>FROM node:18</code>, <code>COPY . .</code>, <code>RUN npm install</code>).</li>
                    <li><strong>Docker Image (The Frozen Pre-Made Meal):</strong> A packaged, read-only snapshot built from your Dockerfile recipe.</li>
                    <li><strong>Docker Container (The Hot Running Meal):</strong> A live, active running process created from the image. You can spin up 10 identical containers in seconds!</li>
                </ol>
                <div class="code-explain-box">
                    <pre><code># Sample Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]</code></pre>
                </div>
                `
            },
            {
                "title": "3. CI/CD: The Automated Robot Quality Inspection Line",
                "content": `
                <p>Imagine building cars in a modern factory. Before any car leaves the building, robotic sensors test the brakes, headlights, and engine automatically.</p>
                <p><strong>CI/CD (Continuous Integration & Continuous Deployment)</strong> is that automated factory line for software:</p>
                <ul>
                    <li><strong>CI (Continuous Integration):</strong> Every time you push code to GitHub, automated servers instantly run your tests and linter to catch bugs before humans see them.</li>
                    <li><strong>CD (Continuous Deployment):</strong> If all tests pass with green checkmarks, the robots automatically deploy your newest code to production servers with <strong>zero downtime</strong>!</li>
                </ul>
                `
            },
            {
                "title": "4. Reverse Proxies & NGINX: The 5-Star Hotel Concierge",
                "content": `
                <p>When thousands of visitors arrive at your website simultaneously, you don't let them wander into your server's private backend rooms directly.</p>
                <p>Instead, an <strong>NGINX Reverse Proxy</strong> acts as the smart hotel concierge in the lobby:</p>
                <ul>
                    <li>It handles <strong>SSL Encryption (HTTPS padlock)</strong>.</li>
                    <li>It <strong>Caches</strong> popular images so the backend doesn't re-render them.</li>
                    <li>It performs <strong>Load Balancing</strong>—distributing traffic evenly across 3 background servers so none of them crash!</li>
                </ul>
                `
            }
        ]
    },
    "glossary": [
        {
            "term": "Docker Container",
            "category": "DevOps",
            "definition": "A lightweight, standalone executable package of software that includes everything needed to run an application.",
            "analogy": "A standardized steel shipping container holding all furniture safely.",
            "codeSnippet": "docker run -p 8080:80 my-app"
        },
        {
            "term": "Dockerfile",
            "category": "DevOps",
            "definition": "A plain text file containing instructions that the Docker engine uses to build a container image.",
            "analogy": "A written cooking recipe listing all ingredients and oven temperatures.",
            "codeSnippet": "FROM python:3.11\nWORKDIR /app\nRUN pip install -r requirements.txt"
        },
        {
            "term": "CI/CD Pipeline",
            "category": "Automation",
            "definition": "Automated workflow that continuously integrates code changes, runs unit tests, and deploys to production servers.",
            "analogy": "An automated assembly line in a car factory with robotic quality sensors.",
            "codeSnippet": "# GitHub Actions workflow yaml\non: [push]\njobs:\n  test: ...\n  deploy: ..."
        },
        {
            "term": "Reverse Proxy (NGINX)",
            "category": "Networking",
            "definition": "A server that sits in front of web servers and forwards client requests to the appropriate backend target.",
            "analogy": "A hotel concierge directing guests to the right elevators and rooms.",
            "codeSnippet": "location /api/ {\n    proxy_pass http://localhost:8000;\n}"
        },
        {
            "term": "Environment Variables (.env)",
            "category": "Security",
            "definition": "Key-value settings stored outside code files to securely configure secrets, database URLs, and API keys.",
            "analogy": "A private safe in a hotel room holding the manager's master keys.",
            "codeSnippet": "DATABASE_URL=postgres://user:pass@localhost:5432/db"
        },
        {
            "term": "Load Balancer",
            "category": "Infrastructure",
            "definition": "A traffic distribution device that spreads incoming network traffic across multiple servers to ensure high availability.",
            "analogy": "A bank manager directing queueing customers to whichever teller window becomes free first.",
            "codeSnippet": "upstream backend_cluster {\n  server 10.0.0.1;\n  server 10.0.0.2;\n}"
        },
        {
            "term": "Virtual Machine (VM)",
            "category": "Cloud",
            "definition": "A software simulation of a physical computer running its own complete guest operating system.",
            "analogy": "An entire rented standalone house compared to a lightweight container apartment room.",
            "codeSnippet": "AWS EC2 / DigitalOcean Droplet"
        },
        {
            "term": "Port Mapping (-p 80:3000)",
            "category": "Networking",
            "definition": "Connecting an outside public network port to an internal port inside an isolated container.",
            "analogy": "An apartment building front buzzer that connects to apartment unit #3000.",
            "codeSnippet": "docker run -p 80:3000 my-web-app"
        }
    ],
    "sandbox": {
        "instructions": "Interact with the simulated Cloud Deployment & CI/CD Pipeline below. Click 'Trigger Deployment' to watch automated tests and container builds run live!",
        "initialHTML": `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Cloud & DevOps Simulator</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      padding: 20px;
      margin: 0;
    }
    .pipeline-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 14px;
      padding: 20px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    }
    .pipeline-title {
      font-size: 1.1rem;
      font-weight: 800;
      color: #c084fc;
      margin: 0 0 16px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .pipeline-steps {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 20px;
    }
    .step-box {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 12px 10px;
      text-align: center;
      font-size: 0.82rem;
      font-weight: 700;
      color: #94a3b8;
      transition: all 0.3s ease;
    }
    .step-box.active {
      border-color: #38bdf8;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
    }
    .step-box.success {
      border-color: #4ade80;
      color: #4ade80;
      background: rgba(74, 222, 128, 0.1);
    }
    .log-terminal {
      background: #020617;
      border: 1px solid #1e293b;
      border-radius: 8px;
      padding: 12px;
      font-family: 'Fira Code', monospace;
      font-size: 0.82rem;
      height: 110px;
      overflow-y: auto;
      color: #38bdf8;
      margin-bottom: 16px;
    }
    .btn-deploy {
      background: #9333ea;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 800;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }
    .btn-deploy:hover { background: #7e22ce; }
  </style>
</head>
<body>
  <div class="pipeline-card">
    <div class="pipeline-title">
      <span>☁️</span> CI/CD Automated Cloud Pipeline
    </div>

    <div class="pipeline-steps">
      <div class="step-box" id="step1">1. Git Push</div>
      <div class="step-box" id="step2">2. Unit Tests</div>
      <div class="step-box" id="step3">3. Docker Build</div>
      <div class="step-box" id="step4">4. Live Deploy</div>
    </div>

    <div class="log-terminal" id="pipelineLogs">
      &gt; Ready for deployment. Click below to test pipeline.
    </div>

    <button class="btn-deploy" id="btnRunDeploy" onclick="simulatePipeline()">
      🚀 Trigger Production Deploy
    </button>
  </div>

  <script>
    function simulatePipeline() {
      const logs = document.getElementById('pipelineLogs');
      const btn = document.getElementById('btnRunDeploy');
      const s1 = document.getElementById('step1');
      const s2 = document.getElementById('step2');
      const s3 = document.getElementById('step3');
      const s4 = document.getElementById('step4');

      btn.disabled = true;
      logs.innerHTML = '&gt; [0.0s] Git commit detected on branch main...';
      s1.className = 'step-box success';

      setTimeout(() => {
        logs.innerHTML += '<br>&gt; [1.2s] Running 14 unit tests... ALL PASSED (100%)';
        s2.className = 'step-box success';
      }, 800);

      setTimeout(() => {
        logs.innerHTML += '<br>&gt; [2.4s] Building Docker image (node:18-alpine)... Size: 84MB';
        s3.className = 'step-box success';
      }, 1600);

      setTimeout(() => {
        logs.innerHTML += '<br>&gt; [3.5s] Container live on Cloud Cluster! Status 200 OK.';
        s4.className = 'step-box success';
        btn.disabled = false;
      }, 2400);
    }
  </script>
</body>
</html>`
    },
    "quizzes": [
        {
            "id": "cloud_q1",
            "question": "What is the main purpose of using Docker containers in web development?",
            "options": [
                "To package code, runtimes, and dependencies into an isolated environment that runs identically everywhere.",
                "To design visual logos and CSS animations.",
                "To speed up typing speed on keyboards.",
                "To replace internet domain names."
            ],
            "correctIndex": 0,
            "explanation": "Docker packages applications with all their dependencies and operating system configurations, eliminating the 'works on my machine' bug across different computers and cloud servers."
        },
        {
            "id": "cloud_q2",
            "question": "In a CI/CD pipeline, what does Continuous Integration (CI) do?",
            "options": [
                "Automatically charges customer credit cards every month.",
                "Automatically runs tests and code linters when code is pushed to catch bugs before deployment.",
                "Installs new computer hardware in the office.",
                "Manually sends emails to company managers."
            ],
            "correctIndex": 1,
            "explanation": "Continuous Integration automatically validates code changes with automated test suites and builds whenever a developer pushes commits to GitHub."
        },
        {
            "id": "cloud_q3",
            "question": "What is a Reverse Proxy (like NGINX) commonly used for?",
            "options": [
                "To create 3D video game graphics in the browser.",
                "To sit in front of backend servers handling SSL encryption, caching, and load balancing traffic.",
                "To write SQL database queries.",
                "To replace JavaScript functions."
            ],
            "correctIndex": 1,
            "explanation": "A reverse proxy acts as an entry gate that manages incoming web traffic, enforces HTTPS SSL encryption, caches assets, and balances traffic across multiple backend servers."
        }
    ]
};
