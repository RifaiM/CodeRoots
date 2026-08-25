import type { DiagnosticProblem } from '../types';
import { CSSLinter } from './cssLinter';
import { JSCompiler } from './jsCompiler';

const VOID_ELEMENTS = new Set([
 'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
 'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

export class HTMLLinter {
 /**
 * Run full-fidelity HTML diagnostics on code
 */
 public static lint(code: string): DiagnosticProblem[] {
 const problems: DiagnosticProblem[] = [];
 if (!code || code.trim().length === 0) return problems;

 const lines = code.split('\n');

 // 1. Incomplete / Unterminated HTML Tag Check (e.g. </html or <h1 without closing '>')
 lines.forEach((lineText, idx) => {
 const clean = lineText.replace(/<!--[\s\S]*?-->/g, '').trim();
 if (!clean) return;

 // Matches tag start like <div, </html, <span class="x" without closing >
 const openMatches = clean.match(/<\/?([a-zA-Z0-9\-]+)(?:\s+[^>]*)?$/);
 if (openMatches && !clean.endsWith('>')) {
 problems.push({
 message: `Incomplete HTML tag '${openMatches[0]}' (missing closing '>' bracket)`,
 line: idx + 1,
 severity: 'error',
 hint: `Complete the tag by adding '>' at the end (e.g. '${openMatches[0]}>').`
 });
 }
 });

 // 2. Angle bracket syntax check (e.g. h1My Title/h1)
 const bareTagMatch = /^\s*(h[1-6]|p|div|span|button|table|section|article|header|footer)[A-Za-z0-9\s]+(\/\1|\1)\s*$/i;
 lines.forEach((line, idx) => {
 if (bareTagMatch.test(line.trim()) && !line.includes('<') && !line.includes('>')) {
 problems.push({
 message: `Missing angle brackets on HTML tag`,
 line: idx + 1,
 severity: 'error',
 hint: `HTML tags must be enclosed in '<' and '>' brackets (e.g. <h1>Title</h1>).`
 });
 }
 });

 // 3. Unclosed attribute quotes check
 lines.forEach((line, idx) => {
 const trimmed = line.trim();
 if (trimmed.startsWith('<') && !trimmed.startsWith('<!--')) {
 const quoteCountD = (trimmed.match(/"/g) || []).length;
 const quoteCountS = (trimmed.match(/'/g) || []).length;
 if (quoteCountD % 2 !== 0 || quoteCountS % 2 !== 0) {
 problems.push({
 message: `Unterminated attribute quote`,
 line: idx + 1,
 severity: 'warning',
 hint: `Make sure every opening quote for an attribute has a matching closing quote (e.g. class="my-class").`
 });
 }
 }
 });

 // 4. Tag Balance & Unclosed Tag Tracker
 const tagRegex = /<\/?([a-zA-Z0-9\-]+)(?:\s+[^>]*)?\/?>/g;
 const tagStack: { tag: string; line: number }[] = [];
 let match: RegExpExecArray | null;

 lines.forEach((lineText, lineIdx) => {
 // Strip HTML comments
 const cleanLine = lineText.replace(/<!--[\s\S]*?-->/g, '');
 while ((match = tagRegex.exec(cleanLine)) !== null) {
 const fullMatch = match[0];
 const tagName = match[1].toLowerCase();

 // Skip void elements (e.g. <img />, <input>, <br>)
 if (VOID_ELEMENTS.has(tagName) || fullMatch.endsWith('/>')) {
 continue;
 }

 if (fullMatch.startsWith('</')) {
 // Closing Tag
 if (tagStack.length === 0) {
 problems.push({
 message: `Unexpected closing tag </${tagName}> without opening tag`,
 line: lineIdx + 1,
 severity: 'error',
 hint: `Remove this extra </${tagName}> tag or add the matching <${tagName}> opening tag above.`
 });
 } else {
 const top = tagStack.pop()!;
 if (top.tag !== tagName) {
 problems.push({
 message: `Mismatched closing tag: Expected </${top.tag}>, but found </${tagName}>`,
 line: lineIdx + 1,
 severity: 'error',
 hint: `Tags must be closed in reverse order. Close <${top.tag}> from line ${top.line} first.`
 });
 }
 }
 } else if (!fullMatch.startsWith('<!')) {
 // Opening Tag
 tagStack.push({ tag: tagName, line: lineIdx + 1 });
 }
 }
 });

 // Report any unclosed tags left on stack (suppress if incomplete tag error on same line)
 const hasIncompleteTagErrors = problems.some(p => p.message.includes('Incomplete HTML tag'));
 if (!hasIncompleteTagErrors) {
 tagStack.forEach(unclosed => {
 // Don't complain about html/head/body if partial snippet
 if (['html', 'head', 'body'].includes(unclosed.tag) && tagStack.length > 3) return;
 problems.push({
 message: `Unclosed <${unclosed.tag}> tag opened on line ${unclosed.line}`,
 line: unclosed.line,
 severity: 'warning',
 hint: `Remember to close <${unclosed.tag}> with a matching </${unclosed.tag}> before the end of the file.`
 });
 });
 }

 // 4. In-Memory DOMParser Checks (Duplicate IDs, Missing Attributes, Invalid Nesting)
 try {
 const parser = new DOMParser();
 const doc = parser.parseFromString(code, 'text/html');

 // Duplicate ID Check
 const idsSeen = new Set<string>();
 doc.querySelectorAll('[id]').forEach(el => {
 const id = el.id.trim();
 if (id) {
 if (idsSeen.has(id)) {
 problems.push({
 message: `Duplicate element ID '${id}' detected`,
 severity: 'error',
 hint: `HTML IDs must be unique across the entire document. Use a class if multiple elements share styles.`
 });
 } else {
 idsSeen.add(id);
 }
 }
 });

 // Missing required attributes on <img>
 doc.querySelectorAll('img').forEach(img => {
 if (!img.hasAttribute('src') || img.getAttribute('src')?.trim() === '') {
 problems.push({
 message: `<img> tag is missing the required 'src' attribute`,
 severity: 'warning',
 hint: `Add a valid src attribute (e.g. <img src="photo.jpg" alt="Description">).`
 });
 }
 });

 // Invalid interactive nesting: <button> inside <a> or <a> inside <button>
 doc.querySelectorAll('a button, button a').forEach(() => {
 problems.push({
 message: `Invalid nesting: Do not place a <button> directly inside an <a> link`,
 severity: 'warning',
 hint: `Links and buttons are both interactive. Style your <a> with CSS classes to look like a button instead.`
 });
 });
 } catch (e) {}

 // 5. Embedded CSS Diagnostics (<style>...</style>)
 const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
 let styleMatch: RegExpExecArray | null;
 while ((styleMatch = styleRegex.exec(code)) !== null) {
 const styleContent = styleMatch[1];
 if (styleContent && styleContent.trim()) {
 const preStyle = code.substring(0, styleMatch.index + styleMatch[0].indexOf(styleContent));
 const lineOffset = preStyle.split('\n').length - 1;

 const cssProblems = CSSLinter.lint(styleContent);
 cssProblems.forEach(p => {
 problems.push({
 ...p,
 line: p.line !== undefined ? p.line + lineOffset : lineOffset + 1
 });
 });
 }
 }

 // 6. Embedded JavaScript Diagnostics (<script>...</script>)
 const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
 let scriptMatch: RegExpExecArray | null;
 while ((scriptMatch = scriptRegex.exec(code)) !== null) {
 const scriptContent = scriptMatch[1];
 if (scriptContent && scriptContent.trim()) {
 const preScript = code.substring(0, scriptMatch.index + scriptMatch[0].indexOf(scriptContent));
 const lineOffset = preScript.split('\n').length - 1;

 const jsProblems = JSCompiler.lint(scriptContent);
 jsProblems.forEach(p => {
 problems.push({
 ...p,
 line: p.line !== undefined ? p.line + lineOffset : lineOffset + 1
 });
 });
 }
 }

 return problems;
 }
}

