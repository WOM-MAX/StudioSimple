import { CIENCIAS_7B_OA01_CLASE01 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01';
import { HISTORIA_7B_OA02_CLASE01 } from '../Web Studio Simple/src/data/lessons/historia_7b_oa02_clase01';
import { INGLES_7B_OA09_CLASE01 } from '../Web Studio Simple/src/data/lessons/ingles_7b_oa09_clase01';
import { LENGUA_7B_OA03_CLASE01 } from '../Web Studio Simple/src/data/lessons/lengua_7b_oa03_clase01';
import { MATEMATICA_7B_OA01_CLASE01 } from '../Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase01';

console.log('=== INSPECCION DE ARCHIVOS ESTATICOS DE CLASE 01 ===');
const subjects = [
  { name: 'Matematica', data: MATEMATICA_7B_OA01_CLASE01 },
  { name: 'Lengua y Literatura', data: LENGUA_7B_OA03_CLASE01 },
  { name: 'Ciencias Naturales', data: CIENCIAS_7B_OA01_CLASE01 },
  { name: 'Historia', data: HISTORIA_7B_OA02_CLASE01 },
  { name: 'Ingles', data: INGLES_7B_OA09_CLASE01 }
];

for (const s of subjects) {
  const d = s.data;
  console.log(`\nAsignatura: ${s.name} | Titulo: "${d.metadata?.lessonTitle}"`);
  console.log(`  Grade: ${d.metadata?.grade}, Subject: ${d.metadata?.subject}, OA: ${d.metadata?.oaCode}, Leccion: ${d.metadata?.lessonNumber}`);
  console.log(`  Hook Video: "${d.hookVideoSrc}" | Formal Video: "${d.formalVideoSrc}"`);
  console.log(`  Hook Slides: ${d.hook?.slides?.length || 0} | Formalization Slides: ${d.formalization?.slides?.length || 0}`);
  if (d.hook?.slides && d.hook.slides.length > 0) {
    const s1 = d.hook.slides[0];
    console.log(`    Slide 1 Momento: "${s1.tituloMomento}" | Prompt length: ${s1.visualPrompt?.length || 0} chars | Titulo 64pt: "${s1.overlayTitle}"`);
  }
}
