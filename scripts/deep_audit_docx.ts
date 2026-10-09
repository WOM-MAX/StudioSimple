import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const targetDir = 'LECCIONES/110-7/Matematica/OA04';
const docxFile = fs.readdirSync(targetDir).find(f => f.startsWith('Plan_Maestro_') && f.endsWith('.docx'));
const fullPath = path.resolve(targetDir, docxFile!);
console.log('=== AUDITORIA EXHAUSTIVA DE WORD DOCX ===');
console.log('Archivo:', docxFile);

const xml = execSync(`tar -xOf "${fullPath}" word/document.xml`, { maxBuffer: 50 * 1024 * 1024, encoding: 'utf8' });

// Extraer filas de tablas que contienen "Slide " o diapositivas
// En docx, cada celda es <w:tc>...</w:tc>
const rows = xml.split('</w:tr>');
console.log(`Total de filas en documento: ${rows.length}`);

let totalSlideRows = 0;
let subtitleErrors: string[] = [];
let promptErrors: string[] = [];
let logoMissing: string[] = [];

rows.forEach((r, rIdx) => {
  if (r.includes('Slide ') && (r.includes('• Título') || r.includes('• Prompt IA'))) {
    totalSlideRows++;
    const textOnly = r.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    
    // Extract subtitle
    const subMatch = textOnly.match(/• Subtítulo \(\d+ pt\):\s*([^•]+)/);
    if (subMatch) {
      const sub = subMatch[1].trim();
      const words = sub.split(/\s+/).filter(Boolean);
      if (words.length > 8) {
        subtitleErrors.push(`Fila ${rIdx} (${words.length} w): "${sub}"`);
      }
    }

    // Extract prompt
    const promptMatch = textOnly.match(/• Prompt IA:\s*([^•]+)/);
    if (promptMatch) {
      const p = promptMatch[1].trim();
      if (/Two 13-year-old student.*Two 13-year-old student/i.test(p)) {
        promptErrors.push(`Fila ${rIdx} [DUPLICATE PROTAGONIST]: "${p.substring(0, 80)}"`);
      }
      if (/showing the text|displaying text|with numbers written|lettering/i.test(p)) {
        promptErrors.push(`Fila ${rIdx} [TEXT REQUEST]: "${p.substring(0, 80)}"`);
      }
    }

    // Check logo
    if (!textOnly.includes('Logo blanco de EstudioSimple en la esquina inferior derecha')) {
      logoMissing.push(`Fila ${rIdx} sin especificación de logo`);
    }
  }
});

console.log(`\nLáminas auditadas en tablas DOCX: ${totalSlideRows} / 84`);
console.log(`Subtítulos > 8 palabras en tablas: ${subtitleErrors.length}`);
subtitleErrors.forEach(e => console.log('  - ' + e));
console.log(`Errores en prompts: ${promptErrors.length}`);
promptErrors.forEach(e => console.log('  - ' + e));
console.log(`Láminas sin especificación de logo blanco: ${logoMissing.length}`);

// Check Clase 6 specifically
console.log('\n--- VERIFICACIÓN ESPECÍFICA CLASE 6 ---');
const cl6Pos = xml.indexOf('Clase 6');
if (cl6Pos !== -1) {
  const cl6Xml = xml.substring(cl6Pos);
  const cl6Text = cl6Xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  
  console.log('¿Contiene "sucesiv" en Clase 6?:', /sucesiv/i.test(cl6Text));
  console.log('¿Contiene "19%" en Clase 6?:', cl6Text.includes('19%'));
  console.log('¿Contiene "dos descuentos" en Clase 6?:', /dos descuentos/i.test(cl6Text));
  console.log('¿Contiene "descuento de 10%" en Clase 6?:', /descuento.*10%/i.test(cl6Text));
  
  // Slide 6 de explicación en Clase 6
  console.log('\n[Explicación Clase 6 - Diapositiva 6]:');
  const expMatch = cl6Text.match(/Resolución Guiada: Total de Libros[^]+?(?=Slide 7|Paso 5)/);
  if (expMatch) {
    console.log(expMatch[0].substring(0, 800));
  } else {
    console.log('No se encontró bloque de Slide 6 con ese título');
  }

  // Evaluación miniquiz Clase 6
  console.log('\n[Evaluación Clase 6]:');
  const miniMatch = cl6Text.match(/Paso 7: Evaluación Formativa[^]+?(?=Paso 8|Ficha)/);
  if (miniMatch) {
    console.log(miniMatch[0].substring(0, 1500));
  }
}
