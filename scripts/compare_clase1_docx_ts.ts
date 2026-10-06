import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const baseDir = 'c:/Proyectos/StudioSimple/LECCIONES/110-7';
const packages = [
  { subj: 'Matematica', oa: 'OA01', docx: 'Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones.docx', ts: 'Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase01.ts' },
  { subj: 'Ciencias_Naturales', oa: 'OA01', docx: 'Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx', ts: 'Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts' },
  { subj: 'Historia_Geografia', oa: 'OA02', docx: 'Plan_Maestro_7Básico_110-7-HIS-OA02_5Lecciones.docx', ts: 'Web Studio Simple/src/data/lessons/historia_7b_oa02_clase01.ts' },
  { subj: 'Ingles', oa: 'OA09', docx: 'Plan_Maestro_7Básico_110-7-ING-OA09_6Lecciones.docx', ts: 'Web Studio Simple/src/data/lessons/ingles_7b_oa09_clase01.ts' },
  { subj: 'Lengua_Literatura', oa: 'OA03', docx: 'Plan_Maestro_7Básico_110-7-LEN-OA03_6Lecciones.docx', ts: 'Web Studio Simple/src/data/lessons/lengua_7b_oa03_clase01.ts' }
];

for (const pkg of packages) {
  const fullDocx = path.join(baseDir, pkg.subj, pkg.oa, pkg.docx);
  const fullTs = path.join('c:/Proyectos/StudioSimple', pkg.ts);

  console.log(`\n--------------------------------------------------`);
  console.log(`COMPARANDO: ${pkg.subj} ${pkg.oa} (Clase 1)`);
  
  const xml = execSync(`tar -xOf "${fullDocx}" word/document.xml`, { maxBuffer: 50 * 1024 * 1024, encoding: 'utf8' });
  const docxText = xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const tsContent = fs.readFileSync(fullTs, 'utf8');

  // Check if Class 1 title / topic is in both
  // Extract title from TS: title: "..."
  const tsTitleMatch = tsContent.match(/title:\s*["'`]([^"'`]+)["'`]/);
  const tsTitle = tsTitleMatch ? tsTitleMatch[1] : 'No encontrado';
  console.log(`TS Título: "${tsTitle}"`);
  console.log(`¿Título TS en DOCX?: ${docxText.toLowerCase().includes(tsTitle.toLowerCase()) ? 'SÍ' : 'NO'}`);

  // Check questions in TS
  const tsQuestions = tsContent.match(/question:\s*["'`]([^"'`]+)["'`]/g) || [];
  console.log(`TS Preguntas encontradas: ${tsQuestions.length}`);
  
  let questionsMatched = 0;
  for (const q of tsQuestions.slice(0, 3)) {
    const qClean = q.replace(/question:\s*["'`]([^"'`]+)["'`]/, '$1').trim();
    const inDocx = docxText.toLowerCase().includes(qClean.toLowerCase().slice(0, 30));
    console.log(`  Pregunta TS: "${qClean.slice(0, 50)}..." -> en DOCX: ${inDocx ? 'SÍ' : 'NO'}`);
    if (inDocx) questionsMatched++;
  }
}
