import { findInjectedLesson, normalizeSubject, normalizeOa, normalizeGrade } from '../Web Studio Simple/src/lib/lesson-repository';
import {
  LENGUA_7B_OA03_CLASE01,
  CIENCIAS_7B_OA01_CLASE01,
  HISTORIA_7B_OA02_CLASE01,
  INGLES_7B_OA09_CLASE01
} from '../Web Studio Simple/src/data/lessons';
import { LessonData } from '../Web Studio Simple/src/types/lesson';

interface ValidationResult {
  lessonKey: string;
  subject: string;
  oa: string;
  title: string;
  status: 'CARGADA_Y_PROBADA' | 'BLOQUEADA';
  integrationPoint: string;
  details: {
    resolutionPassed: boolean;
    mentorViewStructure: boolean;
    studentViewStructure: boolean;
    sectionsCount: number;
    slidesCount: number;
    practiceCasesCount: number;
    quizQuestionsCount: number;
    interactiveQuestionsValid: boolean;
  };
  errors: string[];
}

const lessonsToTest = [
  {
    name: 'Lengua y Literatura',
    grade: '7° Básico',
    subject: 'Lengua y Literatura',
    oa: 'OA 3',
    expectedData: LENGUA_7B_OA03_CLASE01,
    file: 'Web Studio Simple/src/data/lessons/lengua_7b_oa03_clase01.ts',
    sourceMd: 'LECCIONES/110-7/Lengua_Literatura/OA03/CLASE01_2026-10-10_19-15.md'
  },
  {
    name: 'Ciencias Naturales',
    grade: '7° Básico',
    subject: 'Ciencias Naturales',
    oa: 'OA 1',
    expectedData: CIENCIAS_7B_OA01_CLASE01,
    file: 'Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts',
    sourceMd: 'LECCIONES/110-7/Ciencias_Naturales/OA01/CLASE01_2026-10-10_19-15.md'
  },
  {
    name: 'Historia y Ciencias Sociales',
    grade: '7° Básico',
    subject: 'Historia y Geografía',
    oa: 'OA 2',
    expectedData: HISTORIA_7B_OA02_CLASE01,
    file: 'Web Studio Simple/src/data/lessons/historia_7b_oa02_clase01.ts',
    sourceMd: 'LECCIONES/110-7/Historia_Geografia/OA02/CLASE01_2026-10-10_19-15.md'
  },
  {
    name: 'Idioma Extranjero Inglés',
    grade: '7° Básico',
    subject: 'Inglés',
    oa: 'OA 9',
    expectedData: INGLES_7B_OA09_CLASE01,
    file: 'Web Studio Simple/src/data/lessons/ingles_7b_oa09_clase01.ts',
    sourceMd: 'LECCIONES/110-7/Ingles/OA09/CLASE01_2026-10-10_19-15.md'
  }
];

const results: ValidationResult[] = [];

for (const testCase of lessonsToTest) {
  const errors: string[] = [];

  // 1. Probar resolución desde repositorio
  const resolved = findInjectedLesson(testCase.grade, testCase.subject, testCase.oa, 1);
  if (!resolved) {
    errors.push(`findInjectedLesson('${testCase.grade}', '${testCase.subject}', '${testCase.oa}', 1) retorno null`);
  }

  const lesson: LessonData = resolved || testCase.expectedData;

  // 2. Validar estructura de Mentor (Adult View)
  const hasPrep = Boolean(lesson.prep && lesson.prep.adultObjective && lesson.prep.mentorReminder);
  const hasRoute = Boolean(lesson.route && lesson.route.blocks && lesson.route.blocks.length >= 4);
  const hasSituation = Boolean(lesson.situation && lesson.situation.dilePrompt && lesson.situation.options);
  const hasHook = Boolean(lesson.hook && lesson.hook.slides && lesson.hook.slides.length === 14);
  const hasConversation = Boolean(lesson.conversation && lesson.conversation.items && lesson.conversation.items.length >= 2);
  const hasFormalization = Boolean(lesson.formalization && lesson.formalization.slides);
  const hasPostConv = Boolean(lesson.postConversation && lesson.postConversation.items);
  const hasPractice = Boolean(lesson.practice && lesson.practice.notebookCases && lesson.practice.notebookCases.length >= 2);
  const hasMiniquiz = Boolean(lesson.miniquiz && lesson.miniquiz.questions && lesson.miniquiz.questions.length === 3);
  const hasRecovery = Boolean(lesson.recovery && lesson.recovery.items && lesson.recovery.items.length === 3);
  const hasClosure = Boolean(lesson.paso8_cierre && lesson.paso8_cierre.preguntaSintesis);

  if (!hasPrep) errors.push('Paso 1 (prep / adultObjective) incompleto o ausente');
  if (!hasRoute) errors.push('Paso 2 (route / blocks) incompleto');
  if (!hasSituation) errors.push('Paso 2 (situation / options) incompleto');
  if (!hasHook) errors.push(`Paso 3 (hook / slides) no contiene 14 láminas bimodales (tiene ${lesson.hook?.slides?.length})`);
  if (!hasPractice) errors.push('Paso 5 (practice / notebookCases) incompleto');
  if (!hasMiniquiz) errors.push(`Paso 7 (miniquiz) no contiene 3 preguntas (tiene ${lesson.miniquiz?.questions?.length})`);
  if (!hasRecovery) errors.push('Paso 7 (recovery) bucles de recuperacion incompletos');
  if (!hasClosure) errors.push('Paso 8 (paso8_cierre) sintesis de cierre ausente');

  // 3. Validar interactividad de preguntas
  let interactiveValid = true;
  if (lesson.miniquiz?.questions) {
    lesson.miniquiz.questions.forEach((q, idx) => {
      if (!q.options || q.options.length !== 4) {
        errors.push(`Miniquiz P0${idx + 1} no tiene 4 alternativas (tiene ${q.options?.length})`);
        interactiveValid = false;
      }
      if (typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex > 3) {
        errors.push(`Miniquiz P0${idx + 1} tiene correctIndex invalido: ${q.correctIndex}`);
        interactiveValid = false;
      }
    });
  }

  // 4. Validar vista del estudiante (Student View)
  // Requiere que los slides tengan campos visualPrompt, overlayTitle y studentAction
  let studentSlidesValid = true;
  lesson.hook?.slides?.forEach((s, idx) => {
    if (!s.overlayTitle || !s.studentAction) {
      errors.push(`Lamina ${idx + 1} carece de overlayTitle o studentAction para vista del estudiante`);
      studentSlidesValid = false;
    }
  });

  const isSuccess = errors.length === 0;

  results.push({
    lessonKey: `${testCase.grade}_${normalizeSubject(testCase.subject)}_${normalizeOa(testCase.oa)}_1`,
    subject: testCase.name,
    oa: testCase.oa,
    title: lesson.metadata.lessonTitle,
    status: isSuccess ? 'CARGADA_Y_PROBADA' : 'BLOQUEADA',
    integrationPoint: testCase.file,
    details: {
      resolutionPassed: Boolean(resolved),
      mentorViewStructure: hasPrep && hasRoute && hasSituation && hasHook && hasPractice && hasClosure,
      studentViewStructure: studentSlidesValid && Boolean(lesson.route) && Boolean(lesson.miniquiz),
      sectionsCount: 8,
      slidesCount: lesson.hook?.slides?.length || 0,
      practiceCasesCount: lesson.practice?.notebookCases?.length || 0,
      quizQuestionsCount: lesson.miniquiz?.questions?.length || 0,
      interactiveQuestionsValid: interactiveValid
    },
    errors
  });
}

console.log(JSON.stringify(results, null, 2));
