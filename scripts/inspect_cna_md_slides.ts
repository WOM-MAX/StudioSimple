import fs from 'fs';
import path from 'path';

for (let i = 1; i <= 6; i++) {
  const mdPath = path.resolve(`LECCIONES_POR_REVISAR/110-7/Ciencias_Naturales/OA01/CLASE0${i}.md`);
  if (!fs.existsSync(mdPath)) {
    console.log(`CLASE0${i}.md: NO EXISTE`);
    continue;
  }
  const content = fs.readFileSync(mdPath, 'utf8');
  const hasMotivacion = content.includes('### MOTIVACION') || content.includes('## MOTIVACION') || content.includes('Paso 2 — Video motivacional');
  const hasExplicacion = content.includes('### EXPLICACION') || content.includes('## EXPLICACION') || content.includes('Paso 4 — Video explicativo');
  
  const motSlides = [...content.matchAll(/####\s+Diapositiva\s+(\d+)/gi)];
  const h3Sections = [...content.matchAll(/###\s+([^\n\r]+)/gi)].map(m => m[1]);

  console.log(`CLASE 0${i}.md (${content.length} caracteres):`);
  console.log(`  - MOTIVACION: ${hasMotivacion ? 'PRESENTE' : 'AUSENTE'}`);
  console.log(`  - EXPLICACION: ${hasExplicacion ? 'PRESENTE' : 'AUSENTE'}`);
  console.log(`  - Diapositivas detectadas en markdown: ${motSlides.length}`);
  console.log(`  - Secciones H3: ${h3Sections.slice(-6).join(' | ')}`);
  console.log('');
}
