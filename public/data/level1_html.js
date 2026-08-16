/**
 * NoviCodes - Level 1: HTML Foundations Data Module
 */
window.LEVEL1_HTML_DATA = {
    "id": "level1_html",
    "title": "Level 1: HTML Foundations",
    "subtitle": "The Structural Blueprint & Skeleton of the World Wide Web",
    "badgeIcon": "🧱",
    "xpReward": 300,
    "trackKey": "html",
    "nextTrackUrl": "./foundations.html?track=css",
    "nextTrackName": "Level 2: CSS Foundations",
    "concepts": {
        "heroAnalogy": {
            "title": "HTML is Like the Wooden Frame & Blueprint of a House",
            "description": "Before you paint walls or arrange furniture, carpenters erect the wooden frame, doorways, and window openings. HTML (HyperText Markup Language) is that exact skeleton for websites. It defines what exists on your page—headlines, paragraphs, images, buttons, and input boxes.",
            "icon": "🏠"
        },
        "sections": [
            {
                "title": "1. Tags: Labeled Storage Boxes for Your Content",
                "content": "\n                <p>Think of HTML tags like <strong>labeled storage boxes</strong>. When you put a label on a box, you tell the web browser exactly how to display what's inside:</p>\n                <ul>\n                    <li>An <code>&lt;h1&gt;</code> box tells the browser: <em>\"Hey, this is my big, bold main headline!\"</em></li>\n                    <li>A <code>&lt;p&gt;</code> box tells the browser: <em>\"This is regular reading paragraph text.\"</em></li>\n                    <li>A <code>&lt;button&gt;</code> box creates an interactive clickable button.</li>\n                </ul>\n                \n                <div class=\"concept-interactive-container\" id=\"htmlTagAnatomyWidget\">\n                    <div style=\"text-align: center; margin-bottom: 10px; font-weight: 800; font-size: 0.9rem; color: #1e293b;\">\n                        🔍 Anatomy of an HTML Tag (Click each piece below):\n                    </div>\n                    <div class=\"tag-anatomy-card\">\n                        <span class=\"anatomy-chunk chunk-open-tag\" data-part=\"open\">&lt;a</span>\n                        <span class=\"anatomy-chunk chunk-attr\" data-part=\"attr\">href=\"https://coderoots.dev\"</span>\n                        <span class=\"anatomy-chunk chunk-open-tag\" data-part=\"open\">&gt;</span>\n                        <span class=\"anatomy-chunk chunk-content\" data-part=\"content\">Explore Code Dojo</span>\n                        <span class=\"anatomy-chunk chunk-close-tag\" data-part=\"close\">&lt;/a&gt;</span>\n                    </div>\n                    <div class=\"anatomy-detail-display\" id=\"anatomyDetailBox\">\n                        <!-- Hydrated by JS -->\n                    </div>\n                </div>\n            "
            },
            {
                "title": "2. Attributes: Extra Settings & Superpowers (Luggage Tags)",
                "content": "\n                <p>Imagine packing a suitcase for a flight. The suitcase is your HTML tag, but the airline needs a <strong>Luggage Tag</strong> attached to know the destination flight number and passenger name. That's what an <strong>Attribute</strong> does!</p>\n                <div class=\"code-explain-box\">\n                    <pre><code>&lt;!-- href tells the link where to fly when clicked --&gt;\n&lt;a href=\"https://coderoots.dev\"&gt;Visit NoviCodes&lt;/a&gt;\n\n&lt;!-- src tells the image tag where the photo file lives --&gt;\n&lt;img src=\"assets/logo.jpg\" alt=\"NoviCodes Logo\"&gt;\n\n&lt;!-- placeholder shows a helpful ghost prompt inside the text box --&gt;\n&lt;input type=\"text\" placeholder=\"Enter your developer name...\"&gt;</code></pre>\n                </div>\n                <p><strong>💡 Beginner Rule of Thumb:</strong> Attributes ALWAYS sit inside the opening tag and look like <code>name=\"value\"</code>.</p>\n            "
            },
            {
                "title": "3. Semantic HTML: Clear Room Signs in a Building",
                "content": "\n                <p>Imagine walking into a large airport or hospital. If every room was just labeled <em>\"Room\"</em> (like generic <code>&lt;div&gt;</code> tags), you'd get totally lost!</p>\n                <p>Instead, good architecture uses <strong>Semantic Signs</strong> that tell humans, search engines (Google), and blind users with screen readers what each section is for:</p>\n                <div class=\"code-explain-box\">\n                    <pre><code>&lt;header&gt;  &lt;!-- Main lobby sign with branding and logo --&gt;\n&lt;nav&gt;     &lt;!-- Directory of navigation links and menus --&gt;\n&lt;main&gt;    &lt;!-- The core primary content of this page --&gt;\n&lt;article&gt; &lt;!-- Standalone story, lesson, or blog post --&gt;\n&lt;footer&gt;  &lt;!-- Ground floor exit with copyright and legal links --&gt;</code></pre>\n                </div>\n                <p><strong>💡 Why It Matters:</strong> Using semantic HTML makes your website rank much higher on Google search results and work seamlessly for disabled users using screen readers!</p>\n            "
            },
            {
                "title": "4. The DOM Tree: Parents, Children & Siblings",
                "content": "\n                <p>When the browser reads your HTML file, it organizes elements into a <strong>Family Tree</strong>:</p>\n                <div class=\"code-explain-box\">\n                    <pre><code>&lt;html&gt; (Grandparent)\n  └── &lt;body&gt; (Parent)\n        ├── &lt;header&gt; (Child of body)\n        │     └── &lt;h1&gt;Welcome&lt;/h1&gt; (Grandchild of body)\n        └── &lt;main&gt; (Sibling of header)\n              ├── &lt;p&gt;First Paragraph&lt;/p&gt; (Sibling of button)\n              └── &lt;button&gt;Start Learning&lt;/button&gt;</code></pre>\n                </div>\n                <p><strong>💡 Why It Matters:</strong> Just like a family tree, elements nested inside other elements inherit behaviors and can be selected with pinpoint precision in CSS and JavaScript!</p>\n            "
            }
        ]
    },
    "glossary": [
        {
            "term": "HTML (HyperText Markup Language)",
            "category": "Core Concept",
            "definition": "The standard markup language used to structure web pages using tags, attributes, and text elements.",
            "analogy": "The physical skeleton or wooden framing of a house.",
            "codeSnippet": "<!DOCTYPE html>\n<html>...</html>"
        },
        {
            "term": "Tag",
            "category": "Syntax",
            "definition": "A command enclosed in angle brackets (<tag>) that tells the browser how to format and display content.",
            "analogy": "A label placed on a moving box telling workers what's inside.",
            "codeSnippet": "<h1>Headline Text</h1>"
        },
        {
            "term": "Attribute",
            "category": "Syntax",
            "definition": "A key-value pair inside an opening tag that modifies or configures the element's behavior.",
            "analogy": "Adding a tag label: 'Fragile: Handle with Care'.",
            "codeSnippet": "<a href=\"page.html\" class=\"active\">Link</a>"
        },
        {
            "term": "DOM (Document Object Model)",
            "category": "Browser Architecture",
            "definition": "The tree-like memory structure the browser creates after parsing an HTML file.",
            "analogy": "A family tree showing how parents, children, and siblings connect.",
            "codeSnippet": "document.getElementById('myElement')"
        },
        {
            "term": "Semantic HTML",
            "category": "Best Practice",
            "definition": "Using tags that clearly convey their meaning to browsers and accessibility tools (e.g., <header>, <article>, <nav> instead of generic <div>).",
            "analogy": "Using labeled drawers in a workshop instead of random mystery boxes.",
            "codeSnippet": "<article>\n  <h2>Article Title</h2>\n</article>"
        },
        {
            "term": "Void / Self-Closing Tag",
            "category": "Syntax",
            "definition": "An HTML element that cannot contain text content and therefore has no closing tag (e.g., <img>, <input>, <br>).",
            "analogy": "A single printed sticker placed directly on a wall.",
            "codeSnippet": "<img src=\"photo.jpg\" alt=\"My Photo\">"
        },
        {
            "term": "Block vs Inline Elements",
            "category": "Layout Behavior",
            "definition": "Block elements (<div>, <p>, <h1>) take up full available width and start on a new line. Inline elements (<span>, <a>, <strong>) only wrap their text content on the same line.",
            "analogy": "Block elements are full-width bookshelves; Inline elements are books placed side-by-side on a shelf.",
            "codeSnippet": "<div style=\"display:block;\">Full Row</div>\n<span style=\"display:inline;\">Inline Word</span>"
        },
        {
            "term": "Relative vs Absolute File Paths",
            "category": "File Navigation",
            "definition": "Relative paths (./image.png or ../assets/photo.jpg) reference files relative to the current directory. Absolute paths (https://site.com/photo.jpg or /) reference from the domain root.",
            "analogy": "Relative: 'Walk 2 doors down the hall'. Absolute: '123 Main Street, Suite 400'.",
            "codeSnippet": "<img src=\"../assets/logo.jpg\" alt=\"Logo\">"
        },
        {
            "term": "Meta Viewport & Responsive Head",
            "category": "Mobile Optimization",
            "definition": "A essential <meta> tag placed inside <head> that forces mobile browsers to render the page at actual device width instead of desktop zoomed-out view.",
            "analogy": "Setting your camera lens zoom to 100% instead of looking through a telescope.",
            "codeSnippet": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
        },
        {
            "term": "OpenGraph SEO Meta Tags",
            "category": "SEO & Social Sharing",
            "definition": "Special meta tags (og:title, og:image, og:description) that define how your link appears when shared on WhatsApp, Twitter, Discord, or LinkedIn.",
            "analogy": "The printed cover and teaser snippet on the back of a book.",
            "codeSnippet": "<meta property=\"og:title\" content=\"My Web App\">\n<meta property=\"og:image\" content=\"preview.jpg\">"
        },
        {
            "term": "Form Controls & Input Validation",
            "category": "User Input",
            "definition": "Interactive elements (<form>, <input>, <button>) that collect user data with native browser validation attributes (required, pattern, type).",
            "analogy": "A printed job application form with required fields marked with an asterisk (*).",
            "codeSnippet": "<form>\n  <input type=\"email\" required placeholder=\"name@email.com\">\n  <button type=\"submit\">Submit</button>\n</form>"
        },
        {
            "term": "Web Accessibility (a11y) & ARIA",
            "category": "Accessibility",
            "definition": "Designing HTML so people with visual or physical impairments can navigate using screen readers or keyboards using alt text, aria-labels, and focus states.",
            "analogy": "Building wheelchair ramps and tactile braille signs at a building entrance.",
            "codeSnippet": "<button aria-label=\"Close Modal\" onclick=\"close()\">✕</button>"
        }
    ],
    "sandbox": {
        "initialHTML": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <style>\n    body {\n      font-family: 'Plus Jakarta Sans', sans-serif;\n      margin: 0;\n      padding: 20px;\n      background: #f8fafc;\n      color: #0f172a;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      min-height: 100vh;\n      box-sizing: border-box;\n    }\n    .card {\n      background: #ffffff;\n      padding: 24px;\n      border-radius: 12px;\n      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);\n      max-width: 450px;\n      width: 100%;\n      box-sizing: border-box;\n    }\n    h1 { color: #2563eb; margin-top: 0; }\n    .badge {\n      display: inline-block;\n      background: #eff6ff;\n      color: #2563eb;\n      padding: 4px 12px;\n      border-radius: 20px;\n      font-size: 0.85rem;\n      font-weight: 700;\n    }\n  </style>\n</head>\n<body>\n\n  <div class=\"card\">\n    <span class=\"badge\">🌱 Level 1 HTML Sandbox</span>\n    <h1>My First NoviCodes Web Page</h1>\n    <p>HTML creates structural elements like headlines, paragraphs, and buttons!</p>\n    \n    <!-- Try editing text or adding new tags below! -->\n    <button onclick=\"alert('HTML Structure Working!')\">Click Me!</button>\n  </div>\n\n</body>\n</html>",
        "instructions": "Try modifying the headline text inside <h1>, adding a new <p> paragraph, or adding an <a> link element in the editor to see instant live rendering!"
    },
    "quizzes": [
        {
            "id": "q1",
            "question": "What does HTML stand for?",
            "options": [
                "HyperText Markup Language",
                "High Tech Modern Language",
                "Hyperlink Text Management Protocol",
                "Home Tool Markup Logic"
            ],
            "correctIndex": 0,
            "explanation": "HTML stands for HyperText Markup Language. 'HyperText' refers to links that connect web pages, and 'Markup Language' refers to using tags to annotate document structure."
        },
        {
            "id": "q2",
            "question": "Which HTML tag is used to define the main top-level headline of a page?",
            "options": [
                "<head>",
                "<title>",
                "<h1>",
                "<header>"
            ],
            "correctIndex": 2,
            "explanation": "The <h1> tag represents the highest level heading on a web page. <h2> through <h6> represent subheadings in descending visual order."
        },
        {
            "id": "q3",
            "question": "What attribute is required on an <img> tag to specify the image filepath?",
            "options": [
                "href",
                "src",
                "link",
                "path"
            ],
            "correctIndex": 1,
            "explanation": "The 'src' (source) attribute specifies the path or URL to the image file."
        }
    ]
};
