import fs from 'fs';
import path from 'path';

import { CIENCIAS_7B_OA01_CLASE01 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01';
import { CIENCIAS_7B_OA01_CLASE02 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase02';
import { CIENCIAS_7B_OA01_CLASE03 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase03';
import { CIENCIAS_7B_OA01_CLASE04 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase04';
import { CIENCIAS_7B_OA01_CLASE05 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase05';
import { CIENCIAS_7B_OA01_CLASE06 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase06';

const tsLessons = [
  CIENCIAS_7B_OA01_CLASE01,
  CIENCIAS_7B_OA01_CLASE02,
  CIENCIAS_7B_OA01_CLASE03,
  CIENCIAS_7B_OA01_CLASE04,
  CIENCIAS_7B_OA01_CLASE05,
  CIENCIAS_7B_OA01_CLASE06
];

// 1. Leer Injected JSON
const injected7bPath = path.resolve('Web Studio Simple/public/data/injected_lessons_7b.json');
let injectedLessons: any[] = [];
if (fs.existsSync(injected7bPath)) {
  const data = JSON.parse(fs.readFileSync(injected7bPath, 'utf8'));
  const pkg = data.find((it: any) => it.oaId === '110-7-CIE-OA01' || (it.curso?.includes('7') && it.asignatura?.includes('Ciencias') && !it.asignatura?.includes('Sociales') && (it.oaCodigo === 'OA 1' || it.oaCodigo === 'OA 01')));
  injectedLessons = pkg?.lessons || [];
}

// 2. Leer Prompts TXT
const promptsTxtPath = path.resolve('Web Studio Simple/public/descargas_planes_maestros/Prompts_Work_Ciencias_7B_OA01.txt');
const promptsTxtContent = fs.existsSync(promptsTxtPath) ? fs.readFileSync(promptsTxtPath, 'utf8') : '';
const promptTitles: string[] = [];
const promptMatches = promptsTxtContent.matchAll(/LECCI[OÓ]N\s+(\d+)\s+DE\s+6:\s+(.+)/gi);
for (const m of promptMatches) {
  promptTitles[parseInt(m[1], 10) - 1] = m[2].trim();
}

// 3. Leer Base Curricular
const baseCurricularPath = path.resolve('INSUMOS/BASE_CURRICULAR/EstudioSimple_Base_Curricular_7B_4Asignaturas_v1.json');
let cnaOa01Obj: any = null;
if (fs.existsSync(baseCurricularPath)) {
  const bc = JSON.parse(fs.readFileSync(baseCurricularPath, 'utf8'));
  cnaOa01Obj = bc.objetivos?.find((o: any) => o.id === '7B-CNA-OA01');
}

console.log('=== COMPARACION FORENSE DE TITULOS CNA OA01 ===\n');

for (let i = 0; i < 6; i++) {
  const num = i + 1;
  const tsTitle = tsLessons[i]?.metadata?.lessonTitle || 'N/A';
  const injectedTitle = injectedLessons[i]?.title || 'N/A';
  const promptTitle = promptTitles[i] || 'N/A';
  
  // Leer titulo de Markdown en LECCIONES_POR_REVISAR
  const mdPath = path.resolve(`LECCIONES_POR_REVISAR/110-7/Ciencias_Naturales/OA01/CLASE0${num}.md`);
  let mdTitle = 'N/A';
  if (fs.existsSync(mdPath)) {
    const mdLines = fs.readFileSync(mdPath, 'utf8').split('\n');
    const titleLine = mdLines.find(l => l.startsWith('# Lección') || l.startsWith('# Clase') || l.startsWith('**Título:**') || l.startsWith('# '));
    if (titleLine) mdTitle = titleLine.trim();
  }

  const bcTitle = cnaOa01Obj ? 'CNA-OA01 Temario EELL (pág. 7)' : 'N/A';

  console.log(`CLASE 0${num}:`);
  console.log(`  - TS App:           "${tsTitle}"`);
  console.log(`  - Injected JSON:    "${injectedTitle}"`);
  console.log(`  - Prompts TXT Work: "${promptTitle}"`);
  console.log(`  - MD Staging:       "${mdTitle}"`);
  console.log(`  - Base Curricular:  "${bcTitle}"`);
  console.log('');
}
