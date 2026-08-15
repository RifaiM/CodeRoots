import fs from 'fs';
import path from 'path';

console.log('Testing Level 10 Lesson 4 solution and starter...');

const l4Astro = fs.readFileSync('src/pages/9. partI/lesson4/lesson4_remake.astro', 'utf-8');

// Check checklist fns
const step1Fn = (code) => { 
    const c = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(?<!:)\/\/[^\r\n]*/g, ''); 
    return /setIsGenerating[\s\n]*\([\s\n]*true[\s\n]*\)/i.test(c); 
};
const step2Fn = (code) => { 
    const c = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(?<!:)\/\/[^\r\n]*/g, ''); 
    return /setSummary[\s\n]*\(/i.test(c); 
};

// Test starter: Should NOT pass ticks
const starterMatch = l4Astro.match(/const starterCode = ([\s\S]*?);\n\nconst jumpLessons/);
const starterCode = eval(starterMatch[1].trim());

console.log('Starter Step 1 (should be false):', step1Fn(starterCode));
console.log('Starter Step 2 (should be false):', step2Fn(starterCode));

if (step1Fn(starterCode) === false && step2Fn(starterCode) === false) {
    console.log('✅ Starter has NO false-positive ticks!');
} else {
    console.error('❌ Starter has false-positive ticks!');
}

// Test solution: Should pass ticks
const solCode = `// 🤖 Milestone 4: Modern AI / LLM REST API Integration!
function AIAssistantPanel() {
  const [summary, setSummary] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerateAISummary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setSummary("• Built Next.js App Router\\n• Integrated PostgreSQL\\n• Deployed to Cloud");
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div>
      <button onClick={handleGenerateAISummary}>Generate</button>
    </div>
  );
}
`;

console.log('Solution Step 1 (should be true):', step1Fn(solCode));
console.log('Solution Step 2 (should be true):', step2Fn(solCode));

if (step1Fn(solCode) === true && step2Fn(solCode) === true) {
    console.log('✅ Solution passes 100%!');
} else {
    console.error('❌ Solution failed ticks!');
}
