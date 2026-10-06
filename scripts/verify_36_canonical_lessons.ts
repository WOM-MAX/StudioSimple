import { findCanonicalFactoryLesson } from '../Web Studio Simple/src/lib/lesson-repository';

const testCases = [
  { grade: '7° Básico', subj: 'mat', oa: 'oa1', name: 'Matemática OA01' },
  { grade: '7° Básico', subj: 'mat', oa: 'oa4', name: 'Matemática OA04' },
  { grade: '7° Básico', subj: 'cie', oa: 'oa1', name: 'Ciencias Naturales OA01' },
  { grade: '7° Básico', subj: 'his', oa: 'oa2', name: 'Historia y Geografía OA02' },
  { grade: '7° Básico', subj: 'len', oa: 'oa3', name: 'Lengua y Literatura OA03' },
  { grade: '7° Básico', subj: 'ing', oa: 'oa9', name: 'Inglés OA09' }
];

let allPassed = true;
console.log('Verificando resolución de findCanonicalFactoryLesson para las 6 clases de cada paquete troncal de 7° Básico...\n');

for (const tc of testCases) {
  console.log(`=== ${tc.name} ===`);
  for (let num = 1; num <= 6; num++) {
    const lesson = findCanonicalFactoryLesson(tc.grade, tc.subj, tc.oa, num);
    if (!lesson) {
      console.error(`  FAIL: Clase ${num} devolvió null!`);
      allPassed = false;
    } else {
      console.log(`  OK: Clase ${num} -> "${lesson.metadata.lessonTitle}" (total: ${lesson.metadata.totalLessonsInOa})`);
    }
  }
}

if (!allPassed) {
  console.error('\nERROR: Alguna lección no resolvió correctamente.');
  process.exit(1);
} else {
  console.log('\n¡ÉXITO TOTAL! Las 36 lecciones canónicas (6 lecciones x 6 OAs) resuelven perfectamente.');
}
