import fs from 'fs';
import path from 'path';

function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            fileList.push(filePath.replace(/\\/g, '/'));
        }
    }
    return fileList;
}

const srcFiles = getAllFiles('src');
const publicFiles = getAllFiles('public');
const scratchFiles = fs.existsSync('scratch') ? getAllFiles('scratch') : [];

console.log('=== SCRATCH DIRECTORY FILES (' + scratchFiles.length + ') ===');
scratchFiles.forEach(f => console.log('  ' + f));

console.log('\n=== PUBLIC DIRECTORY FILES (' + publicFiles.length + ') ===');
publicFiles.forEach(f => console.log('  ' + f));

console.log('\n=== SRC DIRECTORY FILES (' + srcFiles.length + ') ===');
srcFiles.forEach(f => console.log('  ' + f));
