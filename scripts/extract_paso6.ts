import fs from 'fs';
import path from 'path';

for (let i = 3; i <= 6; i++) {
  const p = path.resolve(`LECCIONES_POR_REVISAR/110-7/Ciencias_Naturales/OA01/CLASE0${i}.md`);
  const content = fs.readFileSync(p, 'utf8');
  
  // Buscar seccion Paso 6
  const regex = /##\s*6\.\s*Paso 6\s*—\s*Resumen[\s\S]*?(?=##\s*7\.\s*Paso 7)/i;
  const match = content.match(regex);
  console.log(`=== CLASE 0${i} PASO 6 ===`);
  if (match) {
    console.log(match[0].trim());
  } else {
    console.log('No se encontró sección Paso 6 exacta, buscando alternativas...');
    const altRegex = /Paso 6[\s\S]*?(?=Paso 7)/i;
    const altMatch = content.match(altRegex);
    console.log(altMatch ? altMatch[0].substring(0, 500) : 'NO ENCONTRADO');
  }
  console.log('\n----------------------------------------\n');
}
