/**
 * Simplified JavaScript validation
 */
function validateJavaScriptStructure(code, results) {
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    let jsCode = '';
    let match;
    
    while ((match = scriptRegex.exec(code)) !== null) {
      jsCode += match[1] + '\n';
    }
    
    if (!jsCode.trim()) {
      return; // No JavaScript is okay
    }
    
    const lines = jsCode.split('\n');
    let braceCount = 0;
    let parenCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line || line.startsWith('//') || line.startsWith('/*')) continue;
      
      const lineNumber = findJSLineInOriginal(code, line, i + 1);
      
      // Count brackets
      braceCount += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      parenCount += (line.match(/\(/g) || []).length - (line.match(/\)/g) || []).length;
      
      // Check for missing semicolons (simplified)
      if (needsSemicolon(line)) {
        results.javascript.errors.push({
          line: lineNumber,
          message: `Missing semicolon after "${htmlEncode(line)}"`
        });
        return; // Stop at first JS error
      }
      
      // Check for extra closing symbols
      if (braceCount < 0) {
        results.javascript.errors.push({
          line: lineNumber,
          message: `Extra closing brace '}' - no matching opening brace`
        });
        return;
      }
      
      if (parenCount < 0) {
        results.javascript.errors.push({
          line: lineNumber,
          message: `Extra closing parenthesis ')' - no matching opening parenthesis`
        });
        return;
      }
    }
    
    // Check for unclosed symbols
    if (braceCount > 0) {
      results.javascript.errors.push({
        line: lines.length,
        message: `Missing ${braceCount} closing brace(s) '}'`
      });
      return;
    }
    
    if (parenCount > 0) {
      results.javascript.errors.push({
        line: lines.length,
        message: `Missing ${parenCount} closing parenthesis ')' `
      });
      return;
    }
    
    if (results.javascript.errors.length > 0) {
      results.javascript.valid = false;
    }
  }
          line: lineNumber,
          message: `Extra closing parenthesis ')' - no matching opening parenthesis`
        });
        return;
      }
    }
    
    // Check for unclosed symbols
    if (braceCount > 0) {
      results.javascript.errors.push({
        line: lines.length,
        message: `Missing ${braceCount} closing brace(s) '}'`
      });
      return;
    }
    
    if (parenCount > 0) {
      results.javascript.errors.push({
        line: lines.length,
        message: `Missing ${parenCount} closing parenthesis ')' `
      });
      return;
    }
    
    if (results.javascript.errors.length > 0) {
      results.javascript.valid = false;
    }
  }
          line: lineNumber,
          message: `Extra closing parenthesis ')' - no matching opening parenthesis`
        });
        return;
      }
    }
    
    if (results.javascript.errors.length > 0) {
      results.javascript.valid = false;
    }
  }