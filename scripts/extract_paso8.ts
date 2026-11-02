import fs from 'fs';
import path from 'path';

for (let i = 3; i <= 6; i++) {
  const p = path.resolve(`LECCIONES_POR_REVISAR/110-7/Ciencias_Naturales/OA01/CLASE0${i}.md`);
  const content = fs.readFileSync(p, 'utf8');
  const regex = /##\s*9\.\s*Paso 8\s*—\s*Síntesis y cierre[\s\S]*?(?=##\s*Trazabilidad)/i;
  const match = content.match(regex);
  console.log(`=== CLASE 0${i} PASO 8 SÍNTESIS Y CIERRE ===`);
  if (match) {
    console.log(match[0].trim());
  } else {
    console.log('No encontrado');
  }
  console.log('\n----------------------------------------\n');
}
