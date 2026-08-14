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
            "title": "HTML is Like the Structural Frame & Blueprint of a House",
            "description": "Imagine building a modern home. Before applying paint or installing furniture, carpenters build wooden framing, load-bearing walls, doorway openings, and window frames. HTML (HyperText Markup Language) is the exact digital equivalent: it tells the browser what content exists on the page (headings, paragraphs, images, buttons, and input fields) and how they are organized into a semantic hierarchy.",
            "icon": "🏠",
            "hasInteractiveDemo": true,
            "demoType": "html_blueprint"
        },
        "sections": [
            {
                "title": "1. Anatomy of an HTML Tag: Labeled Shipping Containers",
                "content": "\n                    <p>Think of HTML tags like <strong>labeled shipping containers</strong>. An <code>&lt;h1&gt;</code> container tells the browser: <em>\"Treat this content as a major primary headline!\"</em>. An <code>&lt;img&gt;</code> container tells it: <em>\"Display a photo here!\"</em>.</p>\n                    \n                    <div class=\"concept-interactive-container\" id=\"htmlTagAnatomyWidget\">\n                        <div class=\"tag-anatomy-card\">\n                            <span class=\"anatomy-chunk chunk-open-tag\" data-part=\"open\">&lt;a</span>\n                            <span class=\"anatomy-chunk chunk-attr\" data-part=\"attr\">href=\"https://novicodes.dev\" target=\"_blank\"</span>\n                            <span class=\"anatomy-chunk chunk-open-tag\" data-part=\"open\">&gt;</span>\n                            <span class=\"anatomy-chunk chunk-content\" data-part=\"content\">Explore Code Dojo</span>\n                            <span class=\"anatomy-chunk chunk-close-tag\" data-part=\"close\">&lt;/a&gt;</span>\n                        </div>\n                        <div class=\"anatomy-detail-display\" id=\"anatomyDetailBox\">\n                            <strong>👆 Click any part of the tag above</strong> to inspect its role, syntax rules, and real-world analogy!\n                        </div>\n                    </div>\n                "
            },
            {
                "title": "2. Attributes: Giving Configuration Superpowers to Tags",
                "content": "\n                    <p>Tags can be configured with <strong>attributes</strong> placed inside the opening tag. Attributes always follow the <code>name=\"value\"</code> syntax:</p>\n                    <div class=\"code-explain-box\">\n                        <pre><code>&lt;!-- href specifies the destination URL --&gt;\n&lt;a href=\"https://novicodes.dev\" target=\"_blank\"&gt;Visit NoviCodes&lt;/a&gt;\n\n&lt;!-- src specifies image path, alt provides accessibility text --&gt;\n&lt;img src=\"assets/logo.jpg\" alt=\"NoviCodes Brand Logo\" width=\"48\" height=\"48\"&gt;\n\n&lt;!-- type dictates input behavior, placeholder shows hint text --&gt;\n&lt;input type=\"email\" placeholder=\"Enter your developer email...\" required&gt;</code></pre>\n                    </div>\n                    <p><strong>💡 Real-World Analogy:</strong> Think of attributes like luggage tags: the bag is the HTML tag, and the luggage tag specifies the destination address (<code>href</code>) and passenger name (<code>id</code>).</p>\n                "
            },
            {
                "title": "3. Semantic HTML: The Architectural Floor Plan",
                "content": "\n                    <p>Modern web development uses <strong>Semantic Tags</strong> that clearly describe their meaning to both browsers, search engine web crawlers (SEO), and screen readers for accessibility:</p>\n                    <div class=\"code-explain-box\">\n                        <pre><code>&lt;header&gt;  &lt;!-- Top branding, logo, and title --&gt;\n&lt;nav&gt;     &lt;!-- Navigation links and menus --&gt;\n&lt;main&gt;    &lt;!-- The primary unique content of the page --&gt;\n&lt;article&gt; &lt;!-- Standalone readable story or blog post --&gt;\n&lt;aside&gt;   &lt;!-- Related sidebar widgets or links --&gt;\n&lt;footer&gt;  &lt;!-- Copyright, legal links, and footer info --&gt;</code></pre>\n                    </div>\n                    <p><strong>💡 Pro Tip:</strong> Using semantic HTML instead of generic <code>&lt;div&gt;</code> tags boosts your SEO rank on Google and makes your app accessible to visually impaired developers!</p>\n                "
            },
            {
                "title": "4. The DOM Tree: Parents, Children, and Siblings",
                "content": "\n                    <p>When the browser parses HTML, it creates a hierarchical family tree called the <strong>Document Object Model (DOM)</strong>:</p>\n                    <div class=\"code-explain-box\">\n                        <pre><code>&lt;html&gt; (Root Parent)\n  ├── &lt;head&gt; (Invisible metadata, fonts, stylesheets)\n  └── &lt;body&gt; (Visible viewport container)\n        ├── &lt;header&gt;\n        │     └── &lt;h1&gt;Welcome&lt;/h1&gt; (Child of header)\n        └── &lt;main&gt;\n              ├── &lt;p&gt;Paragraph 1&lt;/p&gt; (Sibling of Paragraph 2)\n              └── &lt;p&gt;Paragraph 2&lt;/p&gt;</code></pre>\n                    </div>\n                    <p>Understanding this parent-child tree structure is the secret key to mastering CSS Selectors in Level 2 and JavaScript DOM manipulation in Level 3!</p>\n                "
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
