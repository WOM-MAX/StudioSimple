import { validateLessonCanonical } from '../Web Studio Simple/src/lib/lesson-canonical-validator';
import { HISTORIA_7B_OA02_CLASE01, INGLES_7B_OA09_CLASE01 } from '../Web Studio Simple/src/data/lessons';

console.log('=== VALIDACIÓN CANÓNICA DE HISTORIA 7B OA02 CLASE 01 ===');
const hisLesson = HISTORIA_7B_OA02_CLASE01;
const hisVal = validateLessonCanonical(hisLesson, {
  grade: '7° Básico',
  subject: 'Historia, Geografía y Ciencias Sociales',
  oaCode: 'OA 2',
  lessonNumber: 1
});
console.log('Valid:', hisVal.isValid, 'Status:', hisVal.status, 'Error:', hisVal.error);
console.log('Details:', hisVal.details);

console.log('\n=== VALIDACIÓN CANÓNICA DE INGLÉS 7B OA09 CLASE 01 ===');
const ingLesson = INGLES_7B_OA09_CLASE01;
const ingVal = validateLessonCanonical(ingLesson, {
  grade: '7° Básico',
  subject: 'Inglés',
  oaCode: 'OA 9',
  lessonNumber: 1
});
console.log('Valid:', ingVal.isValid, 'Status:', ingVal.status, 'Error:', ingVal.error);
console.log('Details:', ingVal.details);
