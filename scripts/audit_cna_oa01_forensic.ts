import fs from 'fs';
import path from 'path';

// Importar las 6 clases activas en la App
import { CIENCIAS_7B_OA01_CLASE01 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01';
import { CIENCIAS_7B_OA01_CLASE02 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase02';
import { CIENCIAS_7B_OA01_CLASE03 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase03';
import { CIENCIAS_7B_OA01_CLASE04 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase04';
import { CIENCIAS_7B_OA01_CLASE05 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase05';
import { CIENCIAS_7B_OA01_CLASE06 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase06';

const lessons = [
  CIENCIAS_7B_OA01_CLASE01,
  CIENCIAS_7B_OA01_CLASE02,
  CIENCIAS_7B_OA01_CLASE03,
  CIENCIAS_7B_OA01_CLASE04,
  CIENCIAS_7B_OA01_CLASE05,
  CIENCIAS_7B_OA01_CLASE06
];

console.log('=== AUDITORIA FORENSE DE CIENCIAS 7° BASICO OA01 ===\n');

lessons.forEach((l, idx) => {
  const num = idx + 1;
  const tsFile = `Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase0${num}.ts`;
  const mdFile = `LECCIONES_POR_REVISAR/110-7/Ciencias_Naturales/OA01/CLASE0${num}.md`;
  const mdExists = fs.existsSync(path.resolve(mdFile));
  
  const hookSlides = l.hook?.slides?.length || 0;
  const formSlides = l.formalization?.slides?.length || 0;
  const miniQuestions = l.mini?.length || 0;
  const miniOptsValid = l.mini?.every(m => m.options?.length === 4) ? '4 opciones A-D' : 'Incompleto';
  const hasPrivateKeys = l.mini?.every(m => !!m.correct) ? 'Clave privada PRESENTE' : 'FALTA clave';

  console.log(`CLASE 0${num}:`);
  console.log(`  - Titulo: "${l.metadata.lessonTitle}"`);
  console.log(`  - Siguiente Clase: "${l.metadata.nextLessonTitle}"`);
  console.log(`  - Archivo TS: ${tsFile} (${fs.statSync(path.resolve(tsFile)).size} bytes)`);
  console.log(`  - Archivo MD Staging: ${mdFile} (Existe: ${mdExists ? 'SI, ' + fs.statSync(path.resolve(mdFile)).size + ' bytes' : 'NO'})`);
  console.log(`  - Diapositivas Gancho (Motivacion): ${hookSlides}`);
  console.log(`  - Diapositivas Formalizacion (Explicacion): ${formSlides}`);
  console.log(`  - Miniquiz: ${miniQuestions} preguntas (${miniOptsValid}, ${hasPrivateKeys})`);
  console.log(`  - Objetivo Adulto: "${l.prep.adultObjective.substring(0, 90)}..."`);
  console.log('');
});
