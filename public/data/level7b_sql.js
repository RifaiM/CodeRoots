/**
 * NoviCodes - Level 7B: PostgreSQL & Database Architecture Foundations Data Module
 */
window.LEVEL7B_SQL_DATA = {
    "id": "level7b_sql",
    "title": "Level 7B: PostgreSQL & Database Foundations",
    "subtitle": "The Indexed High-Speed Filing Cabinet: Relational Tables & SQL Queries",
    "badgeIcon": "🛢️",
    "xpReward": 300,
    "trackKey": "sql",
    "nextTrackUrl": "./foundations.html?track=nextjs",
    "nextTrackName": "Level 7C: Next.js Foundations",
    "concepts": {
        "heroAnalogy": {
            "title": "A Relational Database is Like a High-Tech Filing Cabinet with Barcode Links",
            "description": "Imagine saving all customer orders on a messy spreadsheet. If a customer changes their email address, you would have to update 50 different rows manually! A Relational Database (RDBMS) like PostgreSQL solves this by putting Customers in one drawer (Table) and Orders in another. It links them together using unique Barcode IDs (Primary and Foreign Keys), so data is always clean, fast, and never duplicated!",
            "icon": "🛢️"
        },
        "sections": [
            {
                "title": "1. Tables, Columns & Rows: The Structured Grid",
                "content": `
                <p>Every database table looks like a strict spreadsheet:</p>
                <ul>
                    <li><strong>Columns (Fields):</strong> Define what kind of data is stored (e.g. <code>id (INTEGER)</code>, <code>email (VARCHAR)</code>, <code>is_active (BOOLEAN)</code>, <code>created_at (TIMESTAMP)</code>).</li>
                    <li><strong>Rows (Records):</strong> A single data entry for one specific customer or product.</li>
                </ul>
                <div class="code-explain-box">
                    <pre><code>-- Creating a structured table in PostgreSQL
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);</code></pre>
                </div>
                `
            },
            {
                "title": "2. Primary Keys vs Foreign Keys: Passports & Visas",
                "content": `
                <p>How do tables connect with each other without messy duplicates?</p>
                <ul>
                    <li><strong>Primary Key (PK - The Passport ID):</strong> A column that guarantees every row in a table has a unique identification number (e.g. User #42).</li>
                    <li><strong>Foreign Key (FK - The Visa Stamp):</strong> A column in a SECOND table that points directly back to a Primary Key (e.g. <code>orders.user_id = 42</code>).</li>
                </ul>
                <div class="code-explain-box">
                    <pre><code>-- Orders table references users table via Foreign Key
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_cents INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending'
);</code></pre>
                </div>
                `
            },
            {
                "title": "3. The 4 Essential SQL Commands: CRUD in Action",
                "content": `
                <p>Every web application in the world performs 4 basic data actions (CRUD):</p>
                <ol>
                    <li><strong>Create (<code>INSERT INTO</code>):</strong> Add a new user or comment.</li>
                    <li><strong>Read (<code>SELECT</code>):</strong> Retrieve data with filters and sorting (<code>WHERE</code>, <code>ORDER BY</code>).</li>
                    <li><strong>Update (<code>UPDATE</code>):</strong> Modify existing row fields (<code>SET status = 'paid'</code>).</li>
                    <li><strong>Delete (<code>DELETE FROM</code>):</strong> Remove unwanted records.</li>
                </ol>
                <div class="code-explain-box">
                    <pre><code>-- Finding all completed orders for a user with a JOIN
SELECT users.username, orders.total_cents
FROM orders
JOIN users ON orders.user_id = users.id
WHERE orders.status = 'completed';</code></pre>
                </div>
                `
            },
            {
                "title": "4. Database Indexing: The Book Index Superpower",
                "content": `
                <p>Imagine searching for the word <em>\"Photosynthesis\"</em> in an 800-page biology textbook. If you flip through every single page from page 1 to 800 (called a <strong>Full Table Scan</strong>), it takes minutes!</p>
                <p>Instead, you flip to the back of the book to the <strong>Alphabetical Index</strong>, see <em>\"Page 412\"</em>, and open it in 1 second. That is exactly what a <strong>Database Index (B-Tree)</strong> does in PostgreSQL!</p>
                <p><strong>💡 Why It Matters:</strong> Adding an index on <code>users.email</code> turns a slow 2-second search across 1,000,000 users into a <strong>1-millisecond instant lookup</strong>!</p>
                `
            }
        ]
    },
    "glossary": [
        {
            "term": "PostgreSQL (Postgres)",
            "category": "Database Engine",
            "definition": "An enterprise-grade, open-source relational database management system renowned for reliability, ACID compliance, and performance.",
            "analogy": "The gold-standard vault and filing cabinet used by major global tech companies.",
            "codeSnippet": "SELECT version();"
        },
        {
            "term": "SQL (Structured Query Language)",
            "category": "Language",
            "definition": "The standard declarative language used to communicate with and query relational databases.",
            "analogy": "The formal vocabulary used to request specific documents from a librarian.",
            "codeSnippet": "SELECT * FROM products WHERE price < 50;"
        },
        {
            "term": "Primary Key (PK)",
            "category": "Data Model",
            "definition": "A column or set of columns that uniquely identifies each individual row in a database table.",
            "analogy": "Your government passport number that uniquely identifies you worldwide.",
            "codeSnippet": "id SERIAL PRIMARY KEY"
        },
        {
            "term": "Foreign Key (FK)",
            "category": "Relations",
            "definition": "A field in one table that refers directly to the Primary Key in another table to establish a relational link.",
            "analogy": "A luggage tag with your passport number written on it connecting the bag to you.",
            "codeSnippet": "user_id INT REFERENCES users(id)"
        },
        {
            "term": "JOIN",
            "category": "SQL Query",
            "definition": "An operation that combines rows from two or more tables based on a related column between them.",
            "analogy": "Stapling a customer's receipt to their order shipping manifest.",
            "codeSnippet": "SELECT * FROM a JOIN b ON a.id = b.a_id;"
        },
        {
            "term": "Database Index",
            "category": "Performance",
            "definition": "A data structure (typically a B-Tree) that dramatically accelerates data retrieval operations on a database table.",
            "analogy": "The alphabetical index at the back of a thick reference book.",
            "codeSnippet": "CREATE INDEX idx_users_email ON users(email);"
        },
        {
            "term": "Migration",
            "category": "Schema Management",
            "definition": "Version-controlled scripts that modify the structure (schema) of a database over time in a safe, repeatable way.",
            "analogy": "Architectural change orders documenting every modification made to a building.",
            "codeSnippet": "-- Migration: Add phone column\nALTER TABLE users ADD COLUMN phone VARCHAR(20);"
        },
        {
            "term": "Connection Pool",
            "category": "Architecture",
            "definition": "A cache of open database connections maintained so that incoming web requests don't waste time establishing new TCP connections.",
            "analogy": "A fleet of standby taxis waiting at an airport terminal ready to pick up passengers instantly.",
            "codeSnippet": "const pool = new Pool({ max: 20 });"
        }
    ],
    "sandbox": {
        "instructions": "Run real SQL queries in the interactive database simulator below. Filter users, run JOINs, and see the table results instantly!",
        "initialHTML": `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>SQL Database Query Sandbox</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      padding: 18px;
      margin: 0;
    }
    .sql-workspace {
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .sql-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .sql-title { font-weight: 800; font-size: 1rem; color: #1e40af; }
    .query-box {
      background: #0f172a;
      color: #38bdf8;
      font-family: 'Fira Code', monospace;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 0.88rem;
      margin-bottom: 12px;
    }
    .btn-row { display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
    .sql-btn {
      background: #e0f2fe;
      color: #0369a1;
      border: 1px solid #bae6fd;
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
    }
    .sql-btn:hover { background: #0284c7; color: white; }
    table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
    th { background: #f1f5f9; text-align: left; padding: 8px; border-bottom: 2px solid #cbd5e1; }
    td { padding: 8px; border-bottom: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="sql-workspace">
    <div class="sql-header">
      <span class="sql-title">🛢️ PostgreSQL Interactive Table Simulator</span>
      <span style="font-size: 0.75rem; color: #64748b;">Table: <strong>users</strong></span>
    </div>

    <div class="btn-row">
      <button class="sql-btn" onclick="runQuery('SELECT * FROM users;', usersData)">SELECT ALL</button>
      <button class="sql-btn" onclick="runQuery('SELECT * FROM users WHERE rank = \\'Master\\';', usersData.filter(u => u.rank === 'Master'))">WHERE rank='Master'</button>
      <button class="sql-btn" onclick="runQuery('SELECT * FROM users WHERE xp &gt;= 2000;', usersData.filter(u => u.xp >= 2000))">WHERE xp &gt;= 2000</button>
    </div>

    <div class="query-box" id="queryDisplay">&gt; SELECT * FROM users;</div>

    <div style="overflow-x: auto;">
      <table id="resultsTable">
        <thead>
          <tr><th>ID</th><th>Username</th><th>Rank</th><th>XP</th><th>Status</th></tr>
        </thead>
        <tbody id="tableBody"></tbody>
      </table>
    </div>
  </div>

  <script>
    const usersData = [
      { id: 1, name: "dev_alex", rank: "Master", xp: 3200, status: "Active" },
      { id: 2, name: "code_maya", rank: "Apprentice", xp: 1450, status: "Active" },
      { id: 3, name: "sarah_k", rank: "Master", xp: 4100, status: "Active" },
      { id: 4, name: "jordan_w", rank: "Novice", xp: 600, status: "Pending" }
    ];

    function runQuery(sql, rows) {
      document.getElementById('queryDisplay').textContent = '> ' + sql;
      const tbody = document.getElementById('tableBody');
      tbody.innerHTML = rows.map(r => '<tr>' +
        '<td><strong>#' + r.id + '</strong></td>' +
        '<td>' + r.name + '</td>' +
        '<td><span style="background:#e0e7ff; color:#3730a3; padding:2px 8px; border-radius:10px; font-weight:700;">' + r.rank + '</span></td>' +
        '<td>' + r.xp + ' XP</td>' +
        '<td>' + (r.status === 'Active' ? '🟢 Active' : '🟡 Pending') + '</td>' +
      '</tr>').join('');
    }

    runQuery('SELECT * FROM users;', usersData);
  </script>
</body>
</html>`
    },
    "quizzes": [
        {
            "id": "sql_q1",
            "question": "What is the role of a Primary Key (PK) in a relational database table?",
            "options": [
                "To ensure every row in the table has a unique identification number that never duplicates.",
                "To automatically translate SQL into HTML.",
                "To hide the database from the public internet.",
                "To compress image files."
            ],
            "correctIndex": 0,
            "explanation": "A Primary Key uniquely identifies each row in a database table (like a unique passport number), ensuring data integrity."
        },
        {
            "id": "sql_q2",
            "question": "Which SQL keyword is used to filter records that match specific conditions (e.g. price > 100)?",
            "options": [
                "ORDER BY",
                "WHERE",
                "GROUP BY",
                "LIMIT"
            ],
            "correctIndex": 1,
            "explanation": "The WHERE clause is used in SQL to filter query results to only rows that meet specific conditions."
        },
        {
            "id": "sql_q3",
            "question": "Why do engineers add Database Indexes to columns like email or user_id?",
            "options": [
                "To speed up lookups from seconds to milliseconds without scanning every single row.",
                "To delete old records automatically.",
                "To change the color of table text in terminal.",
                "To encrypt passwords."
            ],
            "correctIndex": 0,
            "explanation": "A database index creates an organized search tree (like a book index), allowing instant lookups across millions of rows."
        }
    ]
};
