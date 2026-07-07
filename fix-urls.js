const fs = require('fs');
const path = require('path');

const replaceInDir = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('fetch("https://farah-origin.vercel.app/api/')) {
        // Fix mismatched quotes!
        content = content.replace(/fetch\("https:\/\/farah-origin\.vercel\.app\/api\/([^'"]*)',/g, 'fetch("https://farah-origin.vercel.app/api/$1",');
        content = content.replace(/fetch\("https:\/\/farah-origin\.vercel\.app\/api\/([^'"]*)\`,/g, 'fetch("https://farah-origin.vercel.app/api/$1",');
        fs.writeFileSync(fullPath, content);
        console.log('Fixed', fullPath);
      }
    }
  }
};

replaceInDir('app');
replaceInDir('components');
replaceInDir('lib');
