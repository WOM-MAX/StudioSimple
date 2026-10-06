import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const baseDir = 'c:/Proyectos/StudioSimple/LECCIONES/110-7';
const packages = [
  { subj: 'Matematica', oa: 'OA01', docx: 'Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones.docx' },
  { subj: 'Ciencias_Naturales', oa: 'OA01', docx: 'Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx' },
  { subj: 'Historia_Geografia', oa: 'OA02', docx: 'Plan_Maestro_7Básico_110-7-HIS-OA02_5Lecciones.docx' },
  { subj: 'Ingles', oa: 'OA09', docx: 'Plan_Maestro_7Básico_110-7-ING-OA09_6Lecciones.docx' },
  { subj: 'Lengua_Literatura', oa: 'OA03', docx: 'Plan_Maestro_7Básico_110-7-LEN-OA03_6Lecciones.docx' }
];

for (const pkg of packages) {
  const fullDocx = path.join(baseDir, pkg.subj, pkg.oa, pkg.docx);
  console.log(`\n======================================================`);
  console.log(`ASIGNATURA: ${pkg.subj} - ${pkg.oa}`);
  console.log(`DOCX: ${pkg.docx}`);
  
  const xml = execSync(`tar -xOf "${fullDocx}" word/document.xml`, { maxBuffer: 50 * 1024 * 1024, encoding: 'utf8' });
  const text = xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  
  console.log(`Text Length: ${text.length} caracteres`);
  
  // Detect stages
  const etapas = text.match(/Etapa\s+[1-8][^:]{0,40}:?/gi) || [];
  const uniqueEtapas = [...new Set(etapas.map(e => e.trim()))];
  console.log(`Etapas detectadas (${uniqueEtapas.length}):`, uniqueEtapas.slice(0, 10));

  // Detect protagonists
  const protagonists = text.match(/(Sofía|Mateo|Lucas|Valentina|Camila|Joaquín|el joven|la joven)[^.]{0,30}/gi) || [];
  const uniqueProt = [...new Set(protagonists.map(p => p.trim()))];
  console.log(`Protagonistas detectados:`, uniqueProt.slice(0, 6));

  // Check Slide / Lamina counts
  const laminas = text.match(/Lámina\s+[0-9]{1,2}|Diapositiva\s+[0-9]{1,2}|Escena\s+[0-9]{1,2}/gi) || [];
  console.log(`Referencias a láminas/escenas:`, laminas.length);

  // Check Evaluation
  const evalSample = text.match(/(evaluación formativa|reactivo|pregunta|distractor|alternativa a|alternativa b)[^.]{0,60}/gi) || [];
  console.log(`Términos de evaluación:`, evalSample.slice(0, 8));

  // Check if negative prompt constraint is present
  const negPrompt = text.includes('No text drawn by AI') || text.includes('no AI letters') || text.includes('sin texto');
  console.log(`Cláusula negativa de arte en DOCX:`, negPrompt);
}
