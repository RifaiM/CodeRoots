/**
 * NoviCodes - Level 1: HTML Foundations Data Module
 */
window.LEVEL1_HTML_DATA = {
    id: "level1_html",
    title: "Level 1: HTML Foundations",
    subtitle: "The Structural Blueprint & Skeleton of the World Wide Web",
    badgeIcon: "🧱",
    xpReward: 300,
    trackKey: "html",
    nextTrackUrl: "./foundations.html?track=css",
    nextTrackName: "Level 2: CSS Foundations",

    // 1. Deep Concept Explanation & Analogy
    concepts: {
        heroAnalogy: {
            title: "HTML is Like the Structural Frame of a House",
            description: "Imagine building a modern house. Before painting walls or adding furniture, carpenters erect wooden beams, walls, doors, and windows. HTML (HyperText Markup Language) is the blueprint and structural frame of every website on Earth. It defines what exists on the page: headings, paragraphs, images, buttons, and text fields.",
            icon: "🏠"
        },
        sections: [
            {
                title: "1. Tags: The Building Blocks of HTML",
                content: `
                    <p>An HTML element is created using <strong>tags</strong> wrapped in angle brackets: <code>&lt;tagname&gt;</code>. Most elements have an opening tag, content inside, and a closing tag with a slash: <code>&lt;/tagname&gt;</code>.</p>
                    <div class="code-explain-box">
                        <pre><code>&lt;h1&gt;Welcome to NoviCodes&lt;/h1&gt;
&lt;p&gt;This is a paragraph of text on our web page.&lt;/p&gt;</code></pre>
                    </div>
                    <p>Think of tags like labeled boxes. An <code>&lt;h1&gt;</code> box tells the web browser: <em>"Hey, render this text as a big, important headline!"</em></p>
                `
            },
            {
                title: "2. Attributes: Giving Extra Superpowers to Tags",
                content: `
                    <p>Tags can have <strong>attributes</strong> inside their opening tag to provide additional information or behavior. Attributes always follow the format <code>name="value"</code>.</p>
                    <div class="code-explain-box">
                        <pre><code>&lt;a href="https://novicodes.com" target="_blank"&gt;Visit NoviCodes&lt;/a&gt;
&lt;img src="assets/logo.jpg" alt="NoviCodes Logo" width="100"&gt;</code></pre>
                    </div>
                    <ul>
                        <li><code>href</code> tells the <code>&lt;a&gt;</code> link tag where to navigate when clicked.</li>
                        <li><code>src</code> tells the <code>&lt;img&gt;</code> tag where the picture file lives.</li>
                        <li><code>alt</code> describes the image for screen readers or if the image fails to load.</li>
                    </ul>
                `
            },
            {
                title: "3. Document Skeleton & Boilerplate",
                content: `
                    <p>Every standard HTML document has a mandatory skeleton structure that web browsers expect:</p>
                    <div class="code-explain-box">
                        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;My First Web Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello World!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                    </div>
                    <p>The <code>&lt;head&gt;</code> contains invisible metadata (title, fonts, styles), while the <code>&lt;body&gt;</code> contains everything visible to visitors!</p>
                `
            }
        ]
    },

    // 2. Interactive Terms & Glossary Bank
    glossary: [
        {
            term: "HTML (HyperText Markup Language)",
            category: "Core Concept",
            definition: "The standard markup language used to structure web pages using tags, attributes, and text elements.",
            analogy: "The physical skeleton or wooden framing of a house.",
            codeSnippet: "<!DOCTYPE html>\n<html>...</html>"
        },
        {
            term: "Tag",
            category: "Syntax",
            definition: "A command enclosed in angle brackets (<tag>) that tells the browser how to format and display content.",
            analogy: "A label placed on a moving box telling workers what's inside.",
            codeSnippet: "<h1>Headline Text</h1>"
        },
        {
            term: "Attribute",
            category: "Syntax",
            definition: "A key-value pair inside an opening tag that modifies or configures the element's behavior.",
            analogy: "Adding a tag label: 'Fragile: Handle with Care'.",
            codeSnippet: '<a href="page.html" class="active">Link</a>'
        },
        {
            term: "DOM (Document Object Model)",
            category: "Browser Architecture",
            definition: "The tree-like memory structure the browser creates after parsing an HTML file.",
            analogy: "A family tree showing how parents, children, and siblings connect.",
            codeSnippet: "document.getElementById('myElement')"
        },
        {
            term: "Semantic HTML",
            category: "Best Practice",
            definition: "Using tags that clearly convey their meaning to browsers and accessibility tools (e.g., <header>, <article>, <nav> instead of generic <div>).",
            analogy: "Using labeled drawers in a workshop instead of random mystery boxes.",
            codeSnippet: "<article>\n<h2>Article Title</h2>\n</article>"
        },
        {
            term: "Void / Self-Closing Tag",
            category: "Syntax",
            definition: "An HTML element that cannot contain text content and therefore has no closing tag (e.g., <img>, <input>, <br>).",
            analogy: "A single printed sticker placed directly on a wall.",
            codeSnippet: '<img src="photo.jpg" alt="My Photo">'
        }
    ],

    // 3. Code Sandbox Starter Template
    sandbox: {
        initialHTML: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      margin: 0;
      padding: 20px;
      background: #f8fafc;
      color: #0f172a;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .card {
      background: #ffffff;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
      max-width: 450px;
      width: 100%;
      box-sizing: border-box;
    }
    h1 { color: #2563eb; margin-top: 0; }
    .badge {
      display: inline-block;
      background: #eff6ff;
      color: #2563eb;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 700;
    }
  </style>
</head>
<body>

  <div class="card">
    <span class="badge">🌱 Level 1 HTML Sandbox</span>
    <h1>My First NoviCodes Web Page</h1>
    <p>HTML creates structural elements like headlines, paragraphs, and buttons!</p>
    
    <!-- Try editing text or adding new tags below! -->
    <button onclick="alert('HTML Structure Working!')">Click Me!</button>
  </div>

</body>
</html>`,
        instructions: "Try modifying the headline text inside <h1>, adding a new <p> paragraph, or adding an <a> link element in the editor to see instant live rendering!"
    },

    // 4. Knowledge Check Quizzes & Practical Exercise
    quizzes: [
        {
            id: "q1",
            question: "What does HTML stand for?",
            options: [
                "HyperText Markup Language",
                "High Tech Modern Language",
                "Hyperlink Text Management Protocol",
                "Home Tool Markup Logic"
            ],
            correctIndex: 0,
            explanation: "HTML stands for HyperText Markup Language. 'HyperText' refers to links that connect web pages, and 'Markup Language' refers to using tags to annotate document structure."
        },
        {
            id: "q2",
            question: "Which HTML tag is used to define the main top-level headline of a page?",
            options: [
                "<head>",
                "<title>",
                "<h1>",
                "<header>"
            ],
            correctIndex: 2,
            explanation: "The <h1> tag represents the highest level heading on a web page. <h2> through <h6> represent subheadings in descending visual order."
        },
        {
            id: "q3",
            question: "What attribute is required on an <img> tag to specify the image filepath?",
            options: [
                "href",
                "src",
                "link",
                "path"
            ],
            correctIndex: 1,
            explanation: "The 'src' (source) attribute specifies the path or URL to the image file."
        }
    ]
};
