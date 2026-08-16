/**
 * NoviCodes - Level 6: Python & Backend Logic Foundations Data Module
 */
window.LEVEL6_PYTHON_DATA = {
    "id": "level6_python",
    "title": "Level 6: Python & Server Logic Foundations",
    "subtitle": "Indentation, Server Logic & Core Data Structures",
    "badgeIcon": "🐍",
    "xpReward": 300,
    "trackKey": "python",
    "nextTrackUrl": "./foundations.html?track=cloud",
    "nextTrackName": "Level 7A: Cloud & Deployment Foundations",
    "concepts": {
        "heroAnalogy": {
            "title": "Python is Like Clear, Everyday English Instructions for Computers",
            "description": "While other programming languages require strict curly braces {}, semicolons ;, and complex boilerplate, Python was designed around one golden rule: Readability Counts. It reads almost like plain English. Indentation creates the structure, making it the most beginner-friendly and popular language for backend servers, data science, and AI!",
            "icon": "🐍"
        },
        "sections": [
            {
                "title": "1. Indentation & Variables: Clean Organized Drawers",
                "content": `
                <p>In Python, whitespace matters! Instead of wrapping blocks of code in curly braces <code>{ ... }</code>, Python uses <strong>Indentation (4 spaces)</strong> to know which lines belong inside a function, loop, or if-statement.</p>
                <div class="code-explain-box">
                    <pre><code># Declaring variables is clean and simple
developer_name = "Maya Lin"
level = 6
is_certified = True

if is_certified:
    # Notice the 4-space indentation!
    print(f"Welcome, {developer_name}! You are in Level {level}.")
else:
    print("Keep coding to unlock Level 6!")</code></pre>
                </div>
                <p><strong>💡 Beginner Rule:</strong> Always use 4 spaces for indentation. Never mix tabs and spaces in Python!</p>
                `
            },
            {
                "title": "2. Data Containers: Lists & Dictionaries",
                "content": `
                <p>To build real applications, servers need to store collections of information:</p>
                <ul>
                    <li><strong>List <code>[ ... ]</code> (The Ordered Grocery Cart):</strong> An ordered list of items accessed by number index starting at <code>0</code>.</li>
                    <li><strong>Dictionary <code>{ ... }</code> (The Labeled Contact Book):</strong> A collection of key-value pairs where you look up values by their unique label name.</li>
                </ul>
                <div class="code-explain-box">
                    <pre><code># 1. A List of skills
skills = ["HTML", "CSS", "JavaScript", "Python"]
print(skills[0]) # Prints: "HTML"

# 2. A Dictionary representing a user
user = {
    "username": "CodeNinja",
    "xp": 1450,
    "rank": "Apprentice"
}
print(user["xp"]) # Prints: 1450</code></pre>
                </div>
                `
            },
            {
                "title": "3. Object-Oriented Programming (OOP): Cookie Cutters & Cookies",
                "content": `
                <p>Imagine you run a bakery. You don't want to design the shape of a gingerbread man by hand every single time. Instead, you use a <strong>Cookie Cutter (Class)</strong> to stamp out hundreds of identical <strong>Baked Cookies (Objects/Instances)</strong>!</p>
                <div class="code-explain-box">
                    <pre><code># The Blueprint (Class)
class Hero:
    def __init__(self, name, role):
        self.name = name
        self.role = role
        self.hp = 100

    def attack(self):
        return f"{self.name} the {self.role} strikes with power!"

# Stamping out real instances (Objects)
player1 = Hero("Aria", "Frontend Mage")
print(player1.attack())</code></pre>
                </div>
                <p><strong>💡 What is <code>self</code>?</strong> <code>self</code> simply refers to "this specific cookie" so each hero remembers their own name and health points!</p>
                `
            },
            {
                "title": "4. What is a Backend Server? The Restaurant Kitchen",
                "content": `
                <p>When you browse a website:</p>
                <ol>
                    <li><strong>Frontend (The Dining Room & Waiter):</strong> Displays the visual menu (HTML/CSS) and takes your order (JavaScript clicks).</li>
                    <li><strong>API Request (The Order Slip):</strong> The waiter sends your order to the kitchen.</li>
                    <li><strong>Backend (The Kitchen & Chefs):</strong> Python checks the recipe, queries the storage pantry (Database), prepares the data, and sends back a response in <strong>JSON format</strong>.</li>
                </ol>
                <div class="code-explain-box">
                    <pre><code># Simple FastAPI endpoint in Python
@app.get("/api/profile")
def get_profile():
    return {
        "status": "success",
        "data": {"user": "Alex", "level": 6}
    }</code></pre>
                </div>
                `
            }
        ]
    },
    "glossary": [
        {
            "term": "Indentation",
            "category": "Syntax",
            "definition": "The spaces at the beginning of a line of code used in Python to define blocks of scope instead of curly braces.",
            "analogy": "Neatly arranged indented bullet points in a structured document outline.",
            "codeSnippet": "def greet():\n    return 'Hello World'"
        },
        {
            "term": "List",
            "category": "Data Structure",
            "definition": "An ordered, mutable collection of items enclosed in square brackets [].",
            "analogy": "A numbered grocery shopping list where you can cross off or add items.",
            "codeSnippet": "items = ['Laptop', 'Mouse', 'Keyboard']"
        },
        {
            "term": "Dictionary (dict)",
            "category": "Data Structure",
            "definition": "An unordered collection of key-value pairs enclosed in curly braces {key: value}.",
            "analogy": "A physical phonebook where you look up someone's name (key) to get their number (value).",
            "codeSnippet": "user = {'name': 'Sam', 'level': 6}"
        },
        {
            "term": "Class & Object",
            "category": "OOP",
            "definition": "A Class is a template/blueprint for creating Objects that bundle data (attributes) and behavior (methods) together.",
            "analogy": "A blueprint of a house (Class) vs the actual physical houses built from it (Objects).",
            "codeSnippet": "class Car:\n  def __init__(self, brand):\n    self.brand = brand"
        },
        {
            "term": "Backend API",
            "category": "Architecture",
            "definition": "Application Programming Interface: A server program that listens for network requests and returns raw data (usually JSON).",
            "analogy": "The drive-thru window speaker at a restaurant connecting customers to the kitchen.",
            "codeSnippet": "@app.get('/items')\ndef read_items():\n  return {'items': [1,2,3]}"
        },
        {
            "term": "JSON (JavaScript Object Notation)",
            "category": "Data Exchange",
            "definition": "The universal lightweight text format used by web servers and browsers to transmit structured data over the internet.",
            "analogy": "The international postal envelope format that all post offices understand.",
            "codeSnippet": "{\"status\": 200, \"message\": \"OK\"}"
        },
        {
            "term": "def (Function)",
            "category": "Syntax",
            "definition": "The keyword used in Python to define a reusable function block that takes arguments and can return a value.",
            "analogy": "A recorded macro or recipe card you can execute whenever you need that task done.",
            "codeSnippet": "def add_xp(current, earned):\n  return current + earned"
        },
        {
            "term": "try / except",
            "category": "Error Handling",
            "definition": "Python's error-handling mechanism that catches exceptions gracefully without crashing the entire server program.",
            "analogy": "A safety net under a trapeze artist catching them if they slip.",
            "codeSnippet": "try:\n  result = 10 / 0\nexcept ZeroDivisionError:\n  result = 0"
        }
    ],
    "sandbox": {
        "instructions": "Try editing the simulated Python server script below. Change the user info and watch the server terminal process your logic in real time!",
        "initialHTML": `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Python Console Sandbox</title>
  <style>
    body {
      font-family: 'Fira Code', monospace, -apple-system, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      padding: 20px;
      margin: 0;
      box-sizing: border-box;
    }
    .terminal-window {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    .term-header {
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid #334155;
      padding-bottom: 12px;
      margin-bottom: 14px;
    }
    .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
    .dot-r { background: #ef4444; }
    .dot-y { background: #f59e0b; }
    .dot-g { background: #10b981; }
    .term-title { color: #94a3b8; font-size: 0.85rem; font-weight: 700; margin-left: 8px; }
    .code-line { margin: 6px 0; font-size: 0.92rem; line-height: 1.6; }
    .prompt { color: #38bdf8; font-weight: bold; }
    .output-success { color: #4ade80; }
    .output-val { color: #facc15; }
    .btn-run {
      background: #10b981;
      color: #0f172a;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 800;
      cursor: pointer;
      font-family: inherit;
      margin-top: 12px;
      transition: all 0.2s ease;
    }
    .btn-run:hover { background: #34d399; }
  </style>
</head>
<body>
  <div class="terminal-window">
    <div class="term-header">
      <span class="dot dot-r"></span>
      <span class="dot dot-y"></span>
      <span class="dot dot-g"></span>
      <span class="term-title">🐍 Python 3.12 Backend Server Runtime</span>
    </div>

    <div class="code-line"><span class="prompt">&gt;&gt;&gt;</span> # 1. Define Server Data Model</div>
    <div class="code-line"><span class="prompt">&gt;&gt;&gt;</span> user = {"name": "Jordan", "rank": "Python Apprentice", "score": 2800}</div>
    <div class="code-line"><span class="prompt">&gt;&gt;&gt;</span> # 2. Process Server Calculation</div>
    <div class="code-line"><span class="prompt">&gt;&gt;&gt;</span> is_eligible = user["score"] &gt;= 2500</div>
    <div class="code-line output-success"><span class="prompt">&gt;&gt;&gt;</span> [SERVER STATUS 200 OK]: User '<span class="output-val">Jordan</span>' authenticated. Eligible: <span class="output-val">True</span></div>
    
    <button class="btn-run" onclick="alert('⚡ Python server process simulated successfully! In Level 6 Dojo, you will write full Python scripts with Pyodide live in your browser.')">
      ▶️ Test Python Server Action
    </button>
  </div>
</body>
</html>`
    },
    "quizzes": [
        {
            "id": "py_q1",
            "question": "How does Python define code blocks (like inside functions or if-statements)?",
            "options": [
                "Using 4-space indentation instead of curly braces {}.",
                "Using double semicolons (;;).",
                "Using HTML tags like <block>...</block>.",
                "Using parentheses ()."
            ],
            "correctIndex": 0,
            "explanation": "Python uses indentation (standard 4 spaces) to define code blocks and scope, eliminating the need for curly braces or semicolons."
        },
        {
            "id": "py_q2",
            "question": "What Python data structure stores labeled key-value pairs (e.g. {'username': 'Alex', 'xp': 500})?",
            "options": [
                "A Tuple",
                "A Dictionary (dict)",
                "A Float",
                "A Boolean"
            ],
            "correctIndex": 1,
            "explanation": "A Python Dictionary (dict) stores data in key-value pairs enclosed in curly braces {key: value}."
        },
        {
            "id": "py_q3",
            "question": "What is the primary role of a Backend Server in web architecture?",
            "options": [
                "To choose the colors and fonts for the visitor's screen.",
                "To process data, run business logic, query databases, and return JSON API responses.",
                "To install Google Chrome on the client's laptop.",
                "To replace CSS stylesheets."
            ],
            "correctIndex": 1,
            "explanation": "The backend server processes business logic, handles secure calculations, queries databases, and sends structured responses back to the frontend."
        }
    ]
};
