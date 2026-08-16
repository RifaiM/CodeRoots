/**
 * NoviCodes - Level 9: React Auth & Access Control Foundations Data Module
 */
window.LEVEL9_AUTH_DATA = {
    "id": "level9_auth",
    "title": "Level 9: User Logins & Security UI Foundations",
    "subtitle": "Login Tokens, Auth Sessions, Route Guards & Role Permissions",
    "badgeIcon": "🛡️",
    "xpReward": 300,
    "trackKey": "auth",
    "nextTrackUrl": "./foundations.html?track=saas",
    "nextTrackName": "Level 10: SaaS Dashboard UI Foundations",
    "concepts": {
        "heroAnalogy": {
            "title": "Web Authentication is Like an Amusement Park VIP Wristband",
            "description": "When you arrive at a theme park, you show your government passport and ticket once at the front gate (Login). The staff clips a tamper-proof colored wristband with an encrypted barcode onto your wrist (JWT Token). For the rest of the day, as you enter rollercoasters or VIP lounges (Protected Routes), attendants just glance at your wristband without asking for your full passport again!",
            "icon": "🛡️"
        },
        "sections": [
            {
                "title": "1. Authentication vs Authorization: The Passport vs The VIP Area",
                "content": `
                <p>Developers often mix these two terms up, but they handle very different security jobs:</p>
                <ul>
                    <li><strong>Authentication (AuthN - Who are you?):</strong> Proving your identity with an email and password. Result: <em>\"You are Alex Rivera, Account #402\"</em>.</li>
                    <li><strong>Authorization (AuthZ - What are you allowed to do?):</strong> Checking your permissions. Can you edit team members? Can you delete billing cards? Result: <em>\"Alex is a Member (Can view reports, but cannot delete company data)\"</em>.</li>
                </ul>
                `
            },
            {
                "title": "2. JWT (JSON Web Tokens): Digital Tamper-Proof Badges",
                "content": `
                <p>How does a server verify who you are without querying the database 10,000 times per minute?</p>
                <p>A <strong>JSON Web Token (JWT)</strong> is a compact, URL-safe string made of 3 parts separated by dots (<code>header.payload.signature</code>):</p>
                <ul>
                    <li><strong>Header:</strong> Specifies the encryption algorithm (e.g. <code>HS256</code>).</li>
                    <li><strong>Payload (The Data):</strong> Contains your user ID, role (<code>admin</code> or <code>member</code>), and expiration timestamp (e.g. valid for 24 hours).</li>
                    <li><strong>Signature:</strong> An encrypted cryptographic seal created with the server's private secret key. If a hacker tries to tamper with the payload to make themselves an \"admin\", the signature breaks instantly!</li>
                </ul>
                `
            },
            {
                "title": "3. Global Auth State: React AuthContext",
                "content": `
                <p>In a large application with 50 different pages and components (Navbar, Sidebar, Profile Modal, Comment Box), passing the <code>currentUser</code> object down through 10 layers of nested props (called <strong>Prop Drilling</strong>) is messy.</p>
                <p>Instead, we wrap the entire application in an <strong>AuthContext.Provider</strong>. Any button or screen anywhere in the app can simply call <code>const { user, login, logout } = useAuth();</code> to access the global session instantly!</p>
                <div class="code-explain-box">
                    <pre><code>// Using global auth in any component
function HeaderAvatar() {
  const { user, logout } = useAuth();

  if (!user) return &lt;button onClick={openLoginModal}&gt;Sign In&lt;/button&gt;;
  return (
    &lt;div&gt;
      &lt;span&gt;Hello, {user.name}! ({user.role})&lt;/span&gt;
      &lt;button onClick={logout}&gt;Sign Out&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
                </div>
                `
            },
            {
                "title": "4. Protected Route Guards & Role-Based Access Control (RBAC)",
                "content": `
                <p>What happens if an unauthenticated visitor tries to type <code>/dashboard/settings</code> into their browser URL bar?</p>
                <p>A <strong>Protected Route Guard</strong> component intercepts the visit before the page renders:</p>
                <ol>
                    <li>If <code>user === null</code>, it immediately redirects them to <code>/login</code>.</li>
                    <li>If the page requires <code>role === 'admin'</code> but the user is a standard member, it displays an <strong>Access Denied</strong> gate.</li>
                </ol>
                <div class="code-explain-box">
                    <pre><code>function ProtectedAdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return &lt;LoadingSpinner /&gt;;
  if (!user) return &lt;Navigate to="/login" replace /&gt;;
  if (user.role !== 'admin') return &lt;AccessDeniedBanner /&gt;;

  return children; // Render secure dashboard
}</code></pre>
                </div>
                `
            }
        ]
    },
    "glossary": [
        {
            "term": "Authentication (AuthN)",
            "category": "Security",
            "definition": "The process of verifying the identity of a user or system (answering 'Who are you?').",
            "analogy": "Presenting your driver's license or passport to an airport TSA agent.",
            "codeSnippet": "const user = await auth.signIn(email, password);"
        },
        {
            "term": "Authorization (AuthZ)",
            "category": "Security",
            "definition": "The process of verifying whether an authenticated user has permission to perform a specific action or access a resource.",
            "analogy": "A keycard that unlocks the 4th floor executive lounge, but not the server room.",
            "codeSnippet": "if (user.role !== 'admin') throw new ForbiddenError();"
        },
        {
            "term": "JWT (JSON Web Token)",
            "category": "Token Standard",
            "definition": "An open standard (RFC 7519) for securely transmitting information between parties as a digitally signed JSON object.",
            "analogy": "An official stamped concert ticket wristband with a barcode that guards can scan.",
            "codeSnippet": "Authorization: Bearer eyJhbGciOiJIUzI1Ni..."
        },
        {
            "term": "AuthContext",
            "category": "React State",
            "definition": "A React Context provider that supplies global authentication state (user object, tokens, login/logout methods) to the entire component tree.",
            "analogy": "A building-wide intercom system announcing who is currently inside the building.",
            "codeSnippet": "const { user, logout } = useAuth();"
        },
        {
            "term": "Protected Route Guard",
            "category": "Routing Architecture",
            "definition": "A wrapper component that inspects the current user's session before rendering a private page, redirecting unauthorized visitors.",
            "analogy": "A security guard standing at a VIP door checking credentials before letting guests through.",
            "codeSnippet": "<ProtectedRoute><AdminSettings /></ProtectedRoute>"
        },
        {
            "term": "RBAC (Role-Based Access Control)",
            "category": "Access Control",
            "definition": "A security model where system access permissions are assigned based on defined organizational roles (e.g. Owner, Admin, Member, Viewer).",
            "analogy": "Hotel keys where guests can access their room, but cleaning staff have master keys for the whole floor.",
            "codeSnippet": "const canDelete = ['owner', 'admin'].includes(user.role);"
        },
        {
            "term": "Session Persistence",
            "category": "Storage",
            "definition": "Saving an authentication token in browser storage (like localStorage or secure httpOnly cookies) so users don't have to log in on every page reload.",
            "analogy": "A 'Remember Me' hand-stamp at an all-day carnival.",
            "codeSnippet": "localStorage.setItem('auth_token', token);"
        },
        {
            "term": "Bearer Token",
            "category": "HTTP Protocol",
            "definition": "A security token transmitted in the HTTP Authorization request header giving access to whoever 'bears' the token.",
            "analogy": "Cash in your wallet—whoever holds the bill is allowed to spend it.",
            "codeSnippet": "headers: { 'Authorization': `Bearer \${token}` }"
        }
    ],
    "sandbox": {
        "instructions": "Test the live React Auth & Permission Gate simulator below! Switch between Guest, Member, and Admin roles to see Protected Routes and permissions update in real time.",
        "initialHTML": `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>React Auth Simulator</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      padding: 16px;
      margin: 0;
    }
    .auth-workspace {
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 14px;
      padding: 20px;
      max-width: 440px;
      margin: 0 auto;
      box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    }
    .auth-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 16px;
    }
    .role-badge {
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.78rem;
      font-weight: 800;
    }
    .role-guest { background: #f1f5f9; color: #64748b; }
    .role-member { background: #e0f2fe; color: #0369a1; }
    .role-admin { background: #fef3c7; color: #b45309; }
    .btn-switch {
      background: #4f46e5;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
    }
    .view-card {
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 10px;
      padding: 14px;
      margin-bottom: 12px;
    }
    .btn-danger {
      background: #fee2e2;
      border: 1px solid #fca5a5;
      color: #dc2626;
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="auth-workspace">
    <div class="auth-header">
      <div>
        <div style="font-weight: 800; font-size: 0.95rem;" id="userName">Guest Visitor</div>
        <div style="font-size: 0.75rem; color: #64748b;">Global AuthContext State</div>
      </div>
      <span class="role-badge role-guest" id="roleBadge">Visitor (Logged Out)</span>
    </div>

    <div style="display: flex; gap: 6px; margin-bottom: 16px;">
      <button class="btn-switch" onclick="setRole('guest', 'Guest Visitor', 'Visitor (Logged Out)', 'role-guest')">Log Out (Guest)</button>
      <button class="btn-switch" onclick="setRole('member', 'Sarah Member', 'Team Member 🛡️', 'role-member')">Login as Member</button>
      <button class="btn-switch" onclick="setRole('admin', 'Alex Rivera', 'Super Admin 👑', 'role-admin')">Login as Admin</button>
    </div>

    <!-- Public View -->
    <div class="view-card">
      <div style="font-weight: 700; font-size: 0.85rem; color: #16a34a; margin-bottom: 4px;">🟢 Public Route (/home)</div>
      <div style="font-size: 0.82rem; color: #64748b;">Visible to everyone worldwide without logging in.</div>
    </div>

    <!-- Protected Member Route -->
    <div class="view-card" id="memberRouteCard">
      <div style="font-weight: 700; font-size: 0.85rem; color: #2563eb; margin-bottom: 4px;">🛡️ Protected Member Route (/dashboard)</div>
      <div id="memberRouteContent" style="font-size: 0.82rem; color: #dc2626;">🔒 Locked: You must sign in to view team metrics.</div>
    </div>

    <!-- Admin Only Action -->
    <div class="view-card" id="adminRouteCard">
      <div style="font-weight: 700; font-size: 0.85rem; color: #b45309; margin-bottom: 4px;">👑 Admin RBAC Gate (/admin/billing)</div>
      <div id="adminRouteContent" style="font-size: 0.82rem; color: #dc2626;">🔒 Locked: Admin privileges required.</div>
    </div>
  </div>

  <script>
    function handleAdminDelete() {
      alert('Danger action executed with Admin role authorization!');
    }

    function setRole(role, name, label, badgeClass) {
      const userName = document.getElementById('userName');
      const b = document.getElementById('roleBadge');
      if (userName) userName.textContent = name;
      if (b) {
        b.textContent = label;
        b.className = 'role-badge ' + badgeClass;
      }

      const memContent = document.getElementById('memberRouteContent');
      const adminContent = document.getElementById('adminRouteContent');

      if (role === 'guest') {
        if (memContent) {
          memContent.innerHTML = '🔒 Locked: You must sign in to view team metrics.';
          memContent.style.color = '#dc2626';
        }
        if (adminContent) {
          adminContent.innerHTML = '🔒 Locked: Admin privileges required.';
          adminContent.style.color = '#dc2626';
        }
      } else if (role === 'member') {
        if (memContent) {
          memContent.innerHTML = '✅ Access Granted: Welcome to Team Workspace! (View-Only)';
          memContent.style.color = '#16a34a';
        }
        if (adminContent) {
          adminContent.innerHTML = '🔒 Locked: Your role (Member) cannot modify billing.';
          adminContent.style.color = '#dc2626';
        }
      } else if (role === 'admin') {
        if (memContent) {
          memContent.innerHTML = '✅ Access Granted: Welcome to Team Workspace!';
          memContent.style.color = '#16a34a';
        }
        if (adminContent) {
          adminContent.innerHTML = '✅ Full Permissions: <button class="btn-danger" onclick="handleAdminDelete()">Delete Workspace</button>';
          adminContent.style.color = '#16a34a';
        }
      }
    }
  </script>
</body>
</html>`
    },
    "quizzes": [
        {
            "id": "auth_q1",
            "question": "What is the difference between Authentication (AuthN) and Authorization (AuthZ)?",
            "options": [
                "Authentication verifies who you are; Authorization verifies what actions and pages you are permitted to access.",
                "Authentication is written in CSS, while Authorization is written in Python.",
                "Authorization only works on mobile phones, while Authentication works on laptops.",
                "There is no difference; they are exact synonyms."
            ],
            "correctIndex": 0,
            "explanation": "Authentication confirms user identity (login credentials), while Authorization determines user permissions (roles, admin rights, view privileges)."
        },
        {
            "id": "auth_q2",
            "question": "Why do React applications use AuthContext instead of passing the user object as props?",
            "options": [
                "To share authentication state globally across all components without manually drilling props through 10 layers.",
                "To hide code from Google Chrome.",
                "Because React does not allow props anymore.",
                "To speed up CSS rendering."
            ],
            "correctIndex": 0,
            "explanation": "AuthContext provides a single global source of truth for user login sessions that any component across the tree can read directly via useAuth()."
        },
        {
            "id": "auth_q3",
            "question": "What happens when an unauthenticated user attempts to visit a Protected Route Guard?",
            "options": [
                "The browser crashes with a blue screen.",
                "The Guard intercepts the visit and redirects the user to the /login page.",
                "The user is automatically promoted to super admin.",
                "The website sends an SMS message."
            ],
            "correctIndex": 1,
            "explanation": "A Protected Route Guard checks if an active user session exists and immediately redirects unauthenticated visitors to the login screen."
        }
    ]
};
