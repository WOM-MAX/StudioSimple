import fs from 'fs';
import path from 'path';

function findPptx(dir: string, results: string[] = []) {
  try {
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of list) {
      if (ent.name === 'node_modules' || ent.name === '.git' || ent.name === '_archivo') continue;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        findPptx(full, results);
      } else if (ent.name.toLowerCase().endsWith('.pptx')) {
        results.push(full);
      }
    }
  } catch (e) {}
  return results;
}

const pptxFiles = findPptx('d:/StudioSimple - Antigravity');
console.log(`Found ${pptxFiles.length} PPTX files in workspace:`);
pptxFiles.forEach(f => console.log(' -', f));
