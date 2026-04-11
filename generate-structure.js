const fs = require('fs');
const path = require('path');

const ignore = ['node_modules', '.next', '.git', 'dist', 'build'];

function getStructure(dir, prefix = '', level = 0, maxLevel = 3) {
  if (level > maxLevel) return '';
  
  let result = '';
  const items = fs.readdirSync(dir);
  
  items.forEach((item, index) => {
    if (ignore.includes(item)) return;
    
    const fullPath = path.join(dir, item);
    const isLast = index === items.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    
    result += prefix + connector + item + '\n';
    
    if (fs.statSync(fullPath).isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      result += getStructure(fullPath, newPrefix, level + 1, maxLevel);
    }
  });
  
  return result;
}

const structure = 'EVSetu/\n' + getStructure('.', '', 0, 3);
fs.writeFileSync('project-structure.txt', structure);
console.log('✅ Structure saved to project-structure.txt');