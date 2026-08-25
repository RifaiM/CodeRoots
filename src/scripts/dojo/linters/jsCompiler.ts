import type { DiagnosticProblem } from '../types';

export class JSCompiler {
 /**
 * Run JavaScript syntax and static diagnostics with exact line precision
 */
 public static lint(code: string): DiagnosticProblem[] {
 const problems: DiagnosticProblem[] = [];
 if (!code || code.trim().length === 0) return problems;

 const lines = code.split('\n');

 // 1. Line-by-line static checks (Unterminated strings, common typos)
 lines.forEach((lineText, idx) => {
 const lineNum = idx + 1;
 const clean = lineText.replace(/\/\/[^\r\n]*/, '').trim();
 if (!clean) return;

 // Check for obvious unterminated single/double quote on single line
 const quoteCountD = (clean.match(/"/g) || []).length;
 const quoteCountS = (clean.match(/'/g) || []).length;
 if (quoteCountD % 2 !== 0 && !clean.includes('`')) {
 problems.push({
 message: `Unterminated double quote (") string literal`,
 line: lineNum,
 severity: 'error',
 hint: `Every opening double quote (") must be closed on the same line.`
 });
 } else if (quoteCountS % 2 !== 0 && !clean.includes('`')) {
 problems.push({
 message: `Unterminated single quote (') string literal`,
 line: lineNum,
 severity: 'error',
 hint: `Every opening single quote (') must be closed on the same line.`
 });
 }

 // Common DOM method casing typos
 if (/document\.(getElementByID|getElementsbyid|getelementbyid)\b/.test(clean)) {
 problems.push({
 message: `Typo in method name: 'document.getElementById' is case-sensitive`,
 line: lineNum,
 severity: 'warning',
 hint: `Use 'document.getElementById("id")' with a lowercase 'd'.`
 });
 }

 if (/\.(addEventlistener|addeventlistener|AddEventListener)\b/.test(clean)) {
 problems.push({
 message: `Typo in method name: 'addEventListener' is case-sensitive`,
 line: lineNum,
 severity: 'warning',
 hint: `Use '.addEventListener("event", callback)' with an uppercase 'L'.`
 });
 }
 });

 // 2. Exact Bracket & Delimiter Stack Tracker (skipping strings and comments)
 const parenStack: { line: number }[] = [];
 const braceStack: { line: number }[] = [];
 const bracketStack: { line: number }[] = [];

 let inMultiComment = false;
 let inTemplateLiteral = false;

 lines.forEach((lineText, lineIdx) => {
 const lineNum = lineIdx + 1;
 let inString: string | null = null;

 for (let i = 0; i < lineText.length; i++) {
 const char = lineText[i];
 const nextChar = lineText[i + 1];

 // Comment handling
 if (!inString && !inTemplateLiteral) {
 if (inMultiComment) {
 if (char === '*' && nextChar === '/') {
 inMultiComment = false;
 i++;
 }
 continue;
 }
 if (char === '/' && nextChar === '*') {
 inMultiComment = true;
 i++;
 continue;
 }
 if (char === '/' && nextChar === '/') {
 break; // Line comment, skip rest of line
 }
 }

 // String handling
 if (char === '`' && !inMultiComment && (!inString || inString === '`')) {
 inTemplateLiteral = !inTemplateLiteral;
 continue;
 }

 if (!inMultiComment && !inTemplateLiteral) {
 if (inString) {
 if (char === inString && lineText[i - 1] !== '\\') {
 inString = null;
 }
 continue;
 } else if (char === '"' || char === "'") {
 inString = char;
 continue;
 }
 }

 // If inside string, skip bracket counting
 if (inString || inTemplateLiteral || inMultiComment) continue;

 // Parentheses
 if (char === '(') {
 parenStack.push({ line: lineNum });
 } else if (char === ')') {
 if (parenStack.length === 0) {
 problems.push({
 message: `Unexpected closing parenthesis ')'`,
 line: lineNum,
 severity: 'error',
 hint: `Remove this extra ')' or check the function call above.`
 });
 } else {
 parenStack.pop();
 }
 }

 // Curly Braces
 if (char === '{') {
 braceStack.push({ line: lineNum });
 } else if (char === '}') {
 if (braceStack.length === 0) {
 problems.push({
 message: `Unexpected closing curly brace '}'`,
 line: lineNum,
 severity: 'error',
 hint: `Remove this extra '}' or check the block above.`
 });
 } else {
 braceStack.pop();
 }
 }

 // Square Brackets
 if (char === '[') {
 bracketStack.push({ line: lineNum });
 } else if (char === ']') {
 if (bracketStack.length === 0) {
 problems.push({
 message: `Unexpected closing square bracket ']'`,
 line: lineNum,
 severity: 'error',
 hint: `Remove this extra ']' or check the array above.`
 });
 } else {
 bracketStack.pop();
 }
 }
 }
 });

 // Report unclosed delimiters with exact line numbers
 parenStack.forEach(unclosed => {
 problems.push({
 message: `Unclosed parenthesis '(' opened on line ${unclosed.line}`,
 line: unclosed.line,
 severity: 'error',
 hint: `Ensure this function call or expression has a matching ')' closing parenthesis.`
 });
 });

 braceStack.forEach(unclosed => {
 problems.push({
 message: `Unclosed curly brace '{' opened on line ${unclosed.line}`,
 line: unclosed.line,
 severity: 'error',
 hint: `Ensure this function or block has a matching '}' closing curly brace.`
 });
 });

 bracketStack.forEach(unclosed => {
 problems.push({
 message: `Unclosed square bracket '[' opened on line ${unclosed.line}`,
 line: unclosed.line,
 severity: 'error',
 hint: `Ensure this array or index expression has a matching ']' closing bracket.`
 });
 });

 // 3. Native JavaScript Syntax Validation via Function constructor (for plain JS snippets)
 if (problems.length === 0) {
 const hasModuleOrJSX = /\b(import|export)\b|<[A-Za-z]/.test(code);
 const isShellOrYaml = /^\s*#/m.test(code);

 if (!hasModuleOrJSX && !isShellOrYaml) {
 try {
 new Function(code);
 } catch (e: any) {
 const errorMsg = e.message || 'Syntax Error';
 
 // Skip errors caused by modern module/JSX syntax in plain Function constructor
 const isModuleOrJSXError = /import|export|<|unexpected reserved word/i.test(errorMsg);
 if (!isModuleOrJSXError) {
 let lineNum: number | undefined;

 const lineMatch = errorMsg.match(/line\s*(\d+)/i) || (e.stack && e.stack.match(/:(\d+):\d+/));
 if (lineMatch) {
 const parsed = parseInt(lineMatch[1], 10);
 // Function wrapper line offset correction
 lineNum = parsed > 2 ? parsed - 2 : parsed;
 }

 let hint = 'Check for missing quotes, unmatched brackets, or misspelled keywords.';
 if (errorMsg.includes('Unexpected token')) {
 hint = `Look closely around line ${lineNum || 'the highlighted area'} for missing parentheses, brackets, or commas.`;
 } else if (errorMsg.includes('Unterminated string') || errorMsg.includes('Invalid or unexpected token')) {
 hint = `Every opening quote (", ', or \`) must have a matching closing quote on the same string.`;
 } else if (errorMsg.includes('missing ) after argument list')) {
 hint = `Make sure every function call closes all parentheses: myFunction(arg1, arg2).`;
 }

 problems.push({
 message: errorMsg,
 line: lineNum,
 severity: 'error',
 hint
 });
 }
 }
 }
 }

 return problems;
 }
}

