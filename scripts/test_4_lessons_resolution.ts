import { findInjectedLesson } from '../Web Studio Simple/src/lib/lesson-repository';
import { getSubjectOAs } from '../Web Studio Simple/src/data/curriculumData';

console.log('=== TEST DE RESOLUCIÓN DE LAS 4 LECCIONES VIGENTES ===\n');

const testCases = [
  {
    grade: '7° Básico',
    subject: 'Lengua y Literatura',
    oaCode: 'OA 3',
    lessonNum: 1,
    expectedTitle: 'Jimmy y Robutt: leer el ambiente y descubrir el conflicto'
  },
  {
    grade: '7° Básico',
    subject: 'Ciencias Naturales',
    oaCode: 'OA 1',
    lessonNum: 1,
    expectedTitle: 'La sexualidad integra distintas dimensiones'
  },
  {
    grade: '7° Básico',
    subject: 'Historia, Geografía y Ciencias Sociales',
    oaCode: 'OA 2',
    lessonNum: 1,
    expectedTitle: '¿Dónde y cuándo comenzó la agricultura?'
  },
  {
    grade: '7° Básico',
    subject: 'Idioma Extranjero Inglés',
    oaCode: 'OA 9',
    lessonNum: 1,
    expectedTitle: 'Anne’s Birthday: Main Idea and Key Events'
  }
];

let allPassed = true;

for (const tc of testCases) {
  const lesson = findInjectedLesson(tc.grade, tc.subject, tc.oaCode, tc.lessonNum);
  if (!lesson) {
    console.error(`[FAIL] ${tc.subject} ${tc.oaCode}: No se resolvió la lección.`);
    allPassed = false;
    continue;
  }

  const titleMatches = lesson.metadata.lessonTitle === tc.expectedTitle;
  if (!titleMatches) {
    console.error(`[FAIL] ${tc.subject} ${tc.oaCode}: Título esperado "${tc.expectedTitle}", recibido "${lesson.metadata.lessonTitle}"`);
    allPassed = false;
  } else {
    console.log(`[PASS] ${tc.subject} (${tc.oaCode} Clase ${tc.lessonNum}):`);
    console.log(`       Título: "${lesson.metadata.lessonTitle}"`);
    console.log(`       Láminas: ${lesson.hook.slides?.length}`);
    console.log(`       Preguntas guiadas: ${lesson.preQuestions.length}`);
    console.log(`       Casos de práctica: ${lesson.practice.length}`);
    console.log(`       Reactivos quiz: ${lesson.mini.length}`);
  }

  // Verificar en curriculumData
  const oas = getSubjectOAs(tc.grade, tc.subject);
  const targetOA = oas.find(o => o.code === tc.oaCode);
  const currLesson = targetOA?.lessons.find(l => l.lessonNumber === tc.lessonNum);
  if (currLesson?.title === tc.expectedTitle) {
    console.log(`       ✓ curriculumData sincronizado correctamente: "${currLesson.title}"\n`);
  } else {
    console.error(`       [FAIL] curriculumData no coincide: "${currLesson?.title}" !== "${tc.expectedTitle}"\n`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('=== VERIFICACIÓN EXITOSA: TODAS LAS LECCIONES ESTÁN CORRECTAMENTE ASOCIADAS ===');
  process.exit(0);
} else {
  console.error('=== FALLO EN LA VERIFICACIÓN ===');
  process.exit(1);
}
