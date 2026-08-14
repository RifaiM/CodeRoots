/**
 * NoviCodes - Level 1: HTML Foundations Data Module
 * Enriched with Deep Visual Analogies & Interactive Architectures
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
            title: "HTML is Like the Structural Frame & Blueprint of a House",
            description: "Imagine building a modern home. Before applying paint or installing furniture, carpenters build wooden framing, load-bearing walls, doorway openings, and window frames. HTML (HyperText Markup Language) is the exact digital equivalent: it tells the browser what content exists on the page (headings, paragraphs, images, buttons, and input fields) and how they are organized into a semantic hierarchy.",
            icon: "🏠",
            hasInteractiveDemo: true,
            demoType: "html_blueprint"
        },
        sections: [
            {
                title: "1. Anatomy of an HTML Tag: Labeled Shipping Containers",
                content: `
                    <p>Think of HTML tags like <strong>labeled shipping containers</strong>. An <code>&lt;h1&gt;</code> container tells the browser: <em>"Treat this content as a major primary headline!"</em>. An <code>&lt;img&gt;</code> container tells it: <em>"Display a photo here!"</em>.</p>
                    
                    <div class="concept-interactive-container" id="htmlTagAnatomyWidget">
                        <div class="tag-anatomy-card">
                            <span class="anatomy-chunk chunk-open-tag" data-part="open">&lt;a</span>
                            <span class="anatomy-chunk chunk-attr" data-part="attr">href="https://novicodes.dev" target="_blank"</span>
                            <span class="anatomy-chunk chunk-open-tag" data-part="open">&gt;</span>
                            <span class="anatomy-chunk chunk-content" data-part="content">Explore Code Dojo</span>
                            <span class="anatomy-chunk chunk-close-tag" data-part="close">&lt;/a&gt;</span>
                        </div>
                        <div class="anatomy-detail-display" id="anatomyDetailBox">
                            <strong>👆 Click any part of the tag above</strong> to inspect its role, syntax rules, and real-world analogy!
                        </div>
                    </div>
                `
            },
            {
                title: "2. Attributes: Giving Configuration Superpowers to Tags",
                content: `
                    <p>Tags can be configured with <strong>attributes</strong> placed inside the opening tag. Attributes always follow the <code>name="value"</code> syntax:</p>
                    <div class="code-explain-box">
                        <pre><code>&lt;!-- href specifies the destination URL --&gt;
&lt;a href="https://novicodes.dev" target="_blank"&gt;Visit NoviCodes&lt;/a&gt;

&lt;!-- src specifies image path, alt provides accessibility text --&gt;
&lt;img src="assets/logo.jpg" alt="NoviCodes Brand Logo" width="48" height="48"&gt;

&lt;!-- type dictates input behavior, placeholder shows hint text --&gt;
&lt;input type="email" placeholder="Enter your developer email..." required&gt;</code></pre>
                    </div>
                    <p><strong>💡 Real-World Analogy:</strong> Think of attributes like luggage tags: the bag is the HTML tag, and the luggage tag specifies the destination address (<code>href</code>) and passenger name (<code>id</code>).</p>
                `
            },
            {
                title: "3. Semantic HTML: The Architectural Floor Plan",
                content: `
                    <p>Modern web development uses <strong>Semantic Tags</strong> that clearly describe their meaning to both browsers, search engine web crawlers (SEO), and screen readers for accessibility:</p>
                    <div class="code-explain-box">
                        <pre><code>&lt;header&gt;  &lt;!-- Top branding, logo, and title --&gt;
&lt;nav&gt;     &lt;!-- Navigation links and menus --&gt;
&lt;main&gt;    &lt;!-- The primary unique content of the page --&gt;
&lt;article&gt; &lt;!-- Standalone readable story or blog post --&gt;
&lt;aside&gt;   &lt;!-- Related sidebar widgets or links --&gt;
&lt;footer&gt;  &lt;!-- Copyright, legal links, and footer info --&gt;</code></pre>
                    </div>
                    <p><strong>💡 Pro Tip:</strong> Using semantic HTML instead of generic <code>&lt;div&gt;</code> tags boosts your SEO rank on Google and makes your app accessible to visually impaired developers!</p>
                `
            },
            {
                title: "4. The DOM Tree: Parents, Children, and Siblings",
                content: `
                    <p>When the browser parses HTML, it creates a hierarchical family tree called the <strong>Document Object Model (DOM)</strong>:</p>
                    <div class="code-explain-box">
                        <pre><code>&lt;html&gt; (Root Parent)
  ├── &lt;head&gt; (Invisible metadata, fonts, stylesheets)
  └── &lt;body&gt; (Visible viewport container)
        ├── &lt;header&gt;
        │     └── &lt;h1&gt;Welcome&lt;/h1&gt; (Child of header)
        └── &lt;main&gt;
              ├── &lt;p&gt;Paragraph 1&lt;/p&gt; (Sibling of Paragraph 2)
              └── &lt;p&gt;Paragraph 2&lt;/p&gt;</code></pre>
                    </div>
                    <p>Understanding this parent-child tree structure is the secret key to mastering CSS Selectors in Level 2 and JavaScript DOM manipulation in Level 3!</p>
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
            definition: "Using HTML tags that clearly convey their meaning (e.g. <header>, <main>, <article>, <footer>) rather than generic <div> tags.",
            analogy: "Labeling rooms in a building as 'Kitchen' and 'Lobby' rather than just 'Room 1' and 'Room 2'.",
            codeSnippet: "<main>\n  <article>Story Content</article>\n</main>"
        },
        {
            term: "<head> vs <body>",
            category: "Structure",
            definition: "<head> contains invisible browser instructions (title, favicon, stylesheets), while <body> contains all visible UI elements.",
            analogy: "The brain (head) vs the visible physical body.",
            codeSnippet: "<head><title>App</title></head>\n<body><h1>Visible</h1></body>"
        }
    ],

    // 3. Code Sandbox Exercises
    sandbox: {
        title: "HTML Live Blueprint Studio",
        starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; padding: 20px; color: #0f172a; }
    h1 { color: #2563eb; }
    .card { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px; }
  </style>
</head>
<body>
  <h1>🧱 My First HTML Blueprint</h1>
  <div class="card">
    <p>Welcome to <strong>NoviCodes</strong>! Edit this HTML code to see live changes instantly.</p>
    <button style="background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: bold; cursor: pointer;">Click Me!</button>
  </div>
</body>
</html>`,
        tasks: [
            "Change the <h1> text to your own developer name",
            "Add a new paragraph <p> with your coding goals",
            "Add an image tag <img> or a new <button>"
        ]
    },

    // 4. Quiz & Verification
    quiz: {
        title: "Level 1: HTML Verification Challenge",
        questions: [
            {
                q: "What does HTML stand for?",
                options: [
                    { text: "HyperText Markup Language", correct: true },
                    { text: "High Tech Modern Language", correct: false },
                    { text: "Hyperlink Text Management Logic", correct: false }
                ],
                explanation: "HTML stands for HyperText Markup Language — the global standard for structuring content on the web."
            },
            {
                q: "Which tag is used to create a clickable hyperlink?",
                options: [
                    { text: "<a> with an href attribute", correct: true },
                    { text: "<link> with a src attribute", correct: false },
                    { text: "<href> with a url attribute", correct: false }
                ],
                explanation: "The <a> (anchor) tag with the href attribute defines a hyperlink to another webpage or file."
            },
            {
                q: "Where does the <title> tag belong in a standard HTML document?",
                options: [
                    { text: "Inside the <head> element", correct: true },
                    { text: "Inside the <body> element", correct: false },
                    { text: "Directly after the </html> closing tag", correct: false }
                ],
                explanation: "The <title> tag belongs inside <head> and specifies the title shown on the browser tab."
            }
        ]
    }
};
