/**
 * NoviCodes - Level 7D: TypeScript & Type Safety Foundations Data Module
 */
window.LEVEL7D_TYPESCRIPT_DATA = {
    "id": "level7d_typescript",
    "title": "Level 7D: TypeScript & Type Safety Foundations",
    "subtitle": "Type Inference, Interfaces, Generics & DOM Types",
    "badgeIcon": "🔷",
    "xpReward": 300,
    "trackKey": "typescript",
    "nextTrackUrl": "/6. partF/branchD/lesson1_remake.html",
    "nextTrackName": "Level 7D: TypeScript Mastery Dojo",
    "concepts": {
        "heroAnalogy": {
            "title": "TypeScript is Like a Safety Blueprint Inspector for Your JavaScript Code",
            "description": "Vanilla JavaScript is like building a house without blueprints: you can put wooden beams where water pipes should go, and nobody stops you until you turn on the shower and the living room floods. TypeScript is the strict safety inspector watching you as you write code in your editor. It checks that every shape, function input, and database field matches exactly before you run the code, catching bugs in seconds instead of finding them during a live production outage!",
            "icon": "🔷"
        },
        "sections": [
            {
                "title": "1. The JavaScript Problem: Silent Runtime Disasters",
                "content": `
                <p>In standard JavaScript, variables can hold any value, and functions accept any input without complaints:</p>
                <div class="code-explain-box">
                    <pre><code>// Vanilla JavaScript (No warnings in editor!)
function calculateTotal(price, taxRate) {
  return price + (price * taxRate);
}

calculateTotal(100, "0.1"); // Result: "10010" (String concatenation bug!)
calculateTotal();           // Result: NaN (Crash!)</code></pre>
                </div>
                <p>Because JavaScript didn't check the types, <code>100 + "10"</code> became <code>"10010"</code> instead of <code>110</code>. In an online store, this bug would charge a customer $10,010 instead of $110! <strong>TypeScript prevents this by forcing you to define rules upfront.</strong></p>
                `
            },
            {
                "title": "2. Type Annotations & Smart Inference",
                "content": `
                <p>In TypeScript, you specify what type of data a variable or function expects using a colon (<code>:</code>):</p>
                <div class="code-explain-box">
                    <pre><code>// 1. Explicit Type Annotations
let username: string = "alex_dev";
let score: number = 95;
let isCompleted: boolean = true;

// 2. Smart Type Inference (TypeScript figures it out automatically!)
let message = "Hello World"; // TS automatically knows message is string!
// message = 42;             // ❌ TS Error: Type 'number' is not assignable to type 'string'.</code></pre>
                </div>
                <p><strong>💡 Golden Rule:</strong> You don't need to type everything manually. Let TypeScript infer simple variables automatically, and use annotations for function inputs and object models!</p>
                `
            },
            {
                "title": "3. Interfaces: Defining the Shape of Objects",
                "content": `
                <p>In real web applications, data comes in structured objects (like a user account or product). An <strong>Interface</strong> acts as a strict contract:</p>
                <div class="code-explain-box">
                    <pre><code>interface User {
  id: string;
  name: string;
  email: string;
  age?: number;        // Optional property (indicated by ?)
  readonly role: string; // Cannot be changed after creation
}

const newUser: User = {
  id: "usr_101",
  name: "Sarah Chen",
  email: "sarah@example.com",
  role: "admin"
};</code></pre>
                </div>
                <p>If you forget the <code>email</code> field or misspell <code>name</code> as <code>naem</code>, your editor immediately flags the mistake with a red underline!</p>
                `
            },
            {
                "title": "4. Generics <T>: Reusable, Type-Safe Code",
                "content": `
                <p>What if you want a function to work with different data types without losing type safety? You use <strong>Generics</strong> (represented by <code>&lt;T&gt;</code>):</p>
                <div class="code-explain-box">
                    <pre><code>// Think of <T> as a placeholder label on a shipping box:
interface ApiResponse<T> {
  status: number;
  data: T;
  error?: string;
}

// When fetching users:
const userResponse: ApiResponse<User> = {
  status: 200,
  data: { id: "1", name: "Alex", email: "a@b.com", role: "user" }
};

// When fetching product numbers:
const numberResponse: ApiResponse<number[]> = {
  status: 200,
  data: [101, 102, 103]
};</code></pre>
                </div>
                <p><code>ApiResponse&lt;T&gt;</code> works for users, products, orders, or numbers without ever needing lazy <code>any</code> types!</p>
                `
            },
            {
                "title": "5. The Browser DOM Trap: HTMLElement | null",
                "content": `
                <p>When you use <code>document.getElementById()</code> in TypeScript, TypeScript warns you that the element might not exist (<code>HTMLElement | null</code>):</p>
                <div class="code-explain-box">
                    <pre><code>const submitBtn = document.getElementById("submitBtn");

// ❌ Risky: submitBtn might be null if ID is missing in HTML!
// submitBtn.addEventListener("click", () => {}); 

// ✅ Safe Pattern 1: Optional Chaining (?.)
submitBtn?.addEventListener("click", () => {});

// ✅ Safe Pattern 2: Type Narrowing Guard
if (submitBtn instanceof HTMLButtonElement) {
  submitBtn.disabled = true; // TS knows it's a real button!
}</code></pre>
                </div>
                <p>This single feature prevents thousands of <em>"Cannot read properties of null (reading 'addEventListener')"</em> errors in production web apps!</p>
                `
            }
        ]
    },
    "glossary": [
        {
            "term": "Type Annotation",
            "category": "Syntax",
            "definition": "Explicitly declaring the exact data type a variable, function parameter, or return value must conform to.",
            "analogy": "A physical label on a bottle: 'Drinking Water Only'.",
            "codeSnippet": "let userName: string = 'Alex';"
        },
        {
            "term": "Type Inference",
            "category": "Compiler",
            "definition": "TypeScript's built-in capability to automatically detect the type based on the initial assigned value.",
            "analogy": "A smart scanner detecting an apple's weight without you needing to press a button.",
            "codeSnippet": "let score = 100; // TS knows score is number"
        },
        {
            "term": "Interface",
            "category": "Data Contract",
            "definition": "A formal blueprint that defines property names, types, and optional modifiers for objects.",
            "analogy": "A legal contract specifying all required deliverables before payment.",
            "codeSnippet": "interface User { id: string; name: string; age?: number; }"
        },
        {
            "term": "Union Type (|)",
            "category": "Type Combinations",
            "definition": "A composite type allowing a variable to hold any one of several specified types.",
            "analogy": "A payment terminal accepting: 'Cash' OR 'Credit Card'.",
            "codeSnippet": "type Status = 'idle' | 'loading' | 'success' | 'error';"
        },
        {
            "term": "Generic (<T>)",
            "category": "Advanced Types",
            "definition": "A reusable type placeholder that preserves exact data types across functions and interfaces without losing type safety.",
            "analogy": "A universal shipping container that safely transports cars, fruit, or machinery with the same standardized lock.",
            "codeSnippet": "interface ApiResponse<T> { data: T; status: number; }"
        },
        {
            "term": "Type Narrowing",
            "category": "Runtime Safety",
            "definition": "Using conditional checks (typeof, instanceof, if guards) to refine a broad union type into a specific safe subtype.",
            "analogy": "Airport security directing passengers to different lines based on whether they have a passport or national ID.",
            "codeSnippet": "if (el instanceof HTMLInputElement) { console.log(el.value); }"
        }
    ],
    "sandbox": {
        "initialHTML": `<!-- In-Browser TypeScript & Type Safety Simulator -->
<div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 20px; color: #0f172a; max-width: 520px; margin: 0 auto; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);">
  <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1.5px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 16px;">
    <h3 style="margin: 0; font-size: 1.1rem; color: #0f172a; display: flex; align-items: center; gap: 8px;">
      <span style="background: #eff6ff; border: 1px solid #bfdbfe; color: #2563eb; width: 28px; height: 28px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 800;">TS</span>
      Type-Safe User Card
    </h3>
    <span style="font-size: 0.75rem; font-weight: 800; background: #ecfdf5; color: #059669; padding: 4px 10px; border-radius: 20px; border: 1px solid #a7f3d0;">Type Validated ✓</span>
  </div>

  <div style="display: grid; gap: 10px; font-size: 0.88rem; line-height: 1.5;">
    <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 8px 12px; border-radius: 8px;">
      <span style="color: #64748b; font-weight: 600;">id (string):</span>
      <strong style="color: #0f172a; font-family: monospace;">"usr_9981"</strong>
    </div>
    <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 8px 12px; border-radius: 8px;">
      <span style="color: #64748b; font-weight: 600;">name (string):</span>
      <strong style="color: #0f172a;">"Dev Champion"</strong>
    </div>
    <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 8px 12px; border-radius: 8px;">
      <span style="color: #64748b; font-weight: 600;">role ('admin' | 'user'):</span>
      <strong style="color: #2563eb; font-weight: 700;">"admin"</strong>
    </div>
    <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 8px 12px; border-radius: 8px;">
      <span style="color: #64748b; font-weight: 600;">age? (optional number):</span>
      <strong style="color: #475569;">28</strong>
    </div>
  </div>

  <div style="margin-top: 18px; padding: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; font-size: 0.82rem; color: #166534; line-height: 1.5;">
    💡 <strong>Compiler Feedback:</strong> All properties match <code>interface User</code> perfectly. Zero runtime bugs possible!
  </div>
</div>`
    },
    "quizzes": [
        {
            "id": "q1",
            "question": "What is the primary advantage of TypeScript over plain vanilla JavaScript?",
            "options": [
                "TypeScript makes JavaScript code execute 10x faster in web browsers",
                "TypeScript catches type mismatches and missing properties in your editor before the code ever runs",
                "TypeScript replaces HTML and CSS with pure typed functions",
                "TypeScript forces you to write all web applications inside backend servers"
            ],
            "correctIndex": 1,
            "explanation": "TypeScript does not make code faster at runtime (it compiles to standard JavaScript). Its superpower is catching bugs, misspelled properties, and invalid arguments during development before users ever see them."
        },
        {
            "id": "q2",
            "question": "In the interface definition 'interface Product { id: string; discount?: number }', what does the question mark (?) mean?",
            "options": [
                "The discount property is required and must be a question string",
                "The discount property is optional — an object is valid with or without it",
                "The discount property causes a syntax error if accessed",
                "The discount property can only hold boolean true or false"
            ],
            "correctIndex": 1,
            "explanation": "Adding a question mark (?) after a property name marks it as optional. The object can include a number for discount, or omit it completely without TypeScript throwing an error."
        },
        {
            "id": "q3",
            "question": "Why does document.getElementById() return 'HTMLElement | null' in TypeScript?",
            "options": [
                "Because TypeScript does not support browser DOM APIs",
                "Because the HTML element might not exist on the page if the ID is misspelled or not yet loaded",
                "Because browser elements are always deleted after 5 seconds",
                "Because all HTML tags must be converted to strings first"
            ],
            "correctIndex": 1,
            "explanation": "If an element with that ID is not found in the HTML document, the browser returns null. TypeScript forces you to handle this possibility with optional chaining (?.) or an if check so your code never crashes unexpectedly."
        }
    ]
};
