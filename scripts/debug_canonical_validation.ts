import { validateLessonCanonical } from '../Web Studio Simple/src/lib/lesson-canonical-validator';
import * as ALL_CANONICAL_LESSONS from '../Web Studio Simple/src/data/lessons';

const tests = [
  { name: 'MAT OA01', obj: ALL_CANONICAL_LESSONS.MATEMATICA_7B_OA01_CLASE01, sel: { grade: '7° Básico', subject: 'Matemática', oaCode: 'OA 1', lessonNumber: 1 } },
  { name: 'MAT OA04', obj: ALL_CANONICAL_LESSONS.MATEMATICA_7B_OA04_CLASE01, sel: { grade: '7° Básico', subject: 'Matemática', oaCode: 'OA 4', lessonNumber: 1 } },
  { name: 'LEN OA03', obj: ALL_CANONICAL_LESSONS.LENGUA_7B_OA03_CLASE01, sel: { grade: '7° Básico', subject: 'Lengua y Literatura', oaCode: 'OA 3', lessonNumber: 1 } },
  { name: 'CIE OA01', obj: ALL_CANONICAL_LESSONS.CIENCIAS_7B_OA01_CLASE02, sel: { grade: '7° Básico', subject: 'Ciencias Naturales', oaCode: 'OA 1', lessonNumber: 2 } },
  { name: 'HIS OA02', obj: ALL_CANONICAL_LESSONS.HISTORIA_7B_OA02_CLASE01, sel: { grade: '7° Básico', subject: 'Historia, Geografía y Ciencias Sociales', oaCode: 'OA 2', lessonNumber: 1 } },
  { name: 'ING OA09', obj: ALL_CANONICAL_LESSONS.INGLES_7B_OA09_CLASE01, sel: { grade: '7° Básico', subject: 'Inglés', oaCode: 'OA 9', lessonNumber: 1 } },
];

for (const t of tests) {
  const res = validateLessonCanonical(t.obj, t.sel);
  console.log(`=== ${t.name} ===`);
  console.log(`isValid: ${res.isValid}, status: ${res.status}`);
  if (res.error) console.log(`error: ${res.error}`);
  if (res.details && res.details.length > 0) {
    console.log(`details:`, JSON.stringify(res.details, null, 2));
  }
}
