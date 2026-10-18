import assert from 'assert';
import {
  canAccreditLesson,
  finalizeLessonSession,
  retestMiniquiz,
  evaluateOpenRecoveryTask,
  submitStudentRecoveryAnswer,
  pauseLessonSession,
  resumeLessonSession
} from '../Web Studio Simple/src/lib/lesson-session';
import { LessonSessionState } from '../Web Studio Simple/src/types/lesson';

console.log('================================================================');
console.log('🧪 PRUEBAS UNITARIAS DE LA LÓGICA DE ACREDITACIÓN Y LOGRO (R05)');
console.log('   (Importando directamente el código real de Web Studio Simple)');
console.log('================================================================\n');

function runRealAccreditationTests() {
  const canonicalKey = '7b_cie_oa01_clase02';
  let completedCalls: string[] = [];

  const markLessonCompleted = (key: string) => {
    completedCalls.push(key);
  };

  const baseSession: LessonSessionState = {
    stage: 'closing',
    activeOa: 'OA 1',
    activeLessonNum: 2,
    feedback: null,
    attempt: 1,
    conversationIndex: 0,
    postIndex: 0,
    practiceIndex: 0,
    summaryIdea: 0,
    quizVisible: false,
    hookStarted: true,
    hookEnded: true,
    formalStarted: true,
    formalEnded: true,
    video: { kind: null, playing: false, seek: 0, command: 0 },
    miniAnswers: ['B', 'A', 'D'],
    miniScore: 0,
    reviewQueue: [],
    reviewIndex: 0,
    recoveryItems: [0],
    recoveryIndex: 0,
    recoveryVisible: true,
    recoveryAnswer: '',
    recoveryPassed: true,
    attempts: 1,
    supportCount: 2,
    reasoningIndependent: false,
    challengeCompleted: false
  };

  // -------------------------------------------------------------
  // Escenario 1: 0/1 acierto NO acredita maestría (incluso con refuerzo completado)
  // -------------------------------------------------------------
  completedCalls = [];
  const s0: LessonSessionState = {
    ...baseSession,
    miniScore: 0,
    miniAnswers: ['B', 'A', 'D'],
    recoveryPassed: true
  };
  assert.strictEqual(canAccreditLesson(s0), false, 's0 no debe acreditar');
  const res0 = finalizeLessonSession(s0, canonicalKey, markLessonCompleted);
  assert.strictEqual(res0.isMastered, false, 'isMastered debe ser false para 0 aciertos');
  assert.strictEqual(completedCalls.length, 0, 'Caso 1 FALLÓ: 0 aciertos NO debe llamar a markLessonCompleted');

  // Prueba complementaria con 1 acierto
  const s1: LessonSessionState = {
    ...baseSession,
    miniScore: 1,
    miniAnswers: ['A', 'A', 'D'],
    recoveryPassed: true
  };
  assert.strictEqual(canAccreditLesson(s1), false, 's1 no debe acreditar');
  const res1 = finalizeLessonSession(s1, canonicalKey, markLessonCompleted);
  assert.strictEqual(res1.isMastered, false, 'isMastered debe ser false para 1 acierto');
  assert.strictEqual(completedCalls.length, 0, 'Caso 1 FALLÓ: 1 acierto NO debe llamar a markLessonCompleted');
  console.log('✓ Escenario 1 APROBADO: 0/1 aciertos con refuerzo completado NO acredita maestría ni llama a markLessonCompleted.');

  // -------------------------------------------------------------
  // Escenario 2: Reintento con 2/3 aciertos SÍ acredita
  // -------------------------------------------------------------
  completedCalls = [];
  const sRetryPass: LessonSessionState = {
    ...baseSession,
    attempts: 2,
    miniScore: 2,
    miniAnswers: ['A', 'B', 'D']
  };
  assert.strictEqual(canAccreditLesson(sRetryPass), true, 'sRetryPass debe acreditar con 2/3');
  const resRetry = finalizeLessonSession(sRetryPass, canonicalKey, markLessonCompleted);
  assert.strictEqual(resRetry.isMastered, true, 'isMastered debe ser true para 2 aciertos');
  assert.strictEqual(completedCalls.length, 1, 'Caso 2 FALLÓ: 2/3 en reintento DEBE llamar a markLessonCompleted');
  assert.strictEqual(completedCalls[0], canonicalKey);
  console.log('✓ Escenario 2 APROBADO: Reintento con 2/3 aciertos acredita formalmente la clase y llama a markLessonCompleted.');

  // -------------------------------------------------------------
  // Escenario 3: 3/3 aciertos directos acredita la clase con excelencia
  // -------------------------------------------------------------
  completedCalls = [];
  const s3: LessonSessionState = {
    ...baseSession,
    miniScore: 3,
    miniAnswers: ['A', 'B', 'C'],
    supportCount: 0,
    attempts: 1
  };
  assert.strictEqual(canAccreditLesson(s3), true, 's3 debe acreditar con 3/3');
  const res3 = finalizeLessonSession(s3, canonicalKey, markLessonCompleted);
  assert.strictEqual(res3.isMastered, true, 'isMastered debe ser true para 3 aciertos');
  assert.strictEqual(completedCalls.length, 1, 'Caso 3 FALLÓ: 3/3 directo DEBE llamar a markLessonCompleted');
  assert.strictEqual(completedCalls[0], canonicalKey);
  console.log('✓ Escenario 3 APROBADO: 3/3 aciertos directos acredita la clase con excelencia.');

  // -------------------------------------------------------------
  // Escenario 4: Tarea abierta con evaluación del adulto
  // -------------------------------------------------------------
  const studentAnswerPatch = submitStudentRecoveryAnswer('completed_open_task');
  assert.strictEqual(studentAnswerPatch.recoveryAnswer, 'completed_open_task');

  const adultApprovedPatch = evaluateOpenRecoveryTask(true);
  assert.strictEqual(adultApprovedPatch.recoveryPassed, true);

  const adultRejectedPatch = evaluateOpenRecoveryTask(false);
  assert.strictEqual(adultRejectedPatch.recoveryPassed, false);

  const sOpenEvaluated: LessonSessionState = {
    ...baseSession,
    ...studentAnswerPatch,
    ...adultApprovedPatch
  };
  assert.strictEqual(sOpenEvaluated.recoveryAnswer, 'completed_open_task');
  assert.strictEqual(sOpenEvaluated.recoveryPassed, true);
  console.log('✓ Escenario 4 APROBADO: Tarea abierta en cuaderno y dictamen del adulto modularizados correctamente.');

  // -------------------------------------------------------------
  // Escenario 5: Conservación de intentos y ayudas en reintento
  // -------------------------------------------------------------
  const sBeforeRetry: LessonSessionState = {
    ...baseSession,
    supportCount: 3,
    attempts: 1,
    miniScore: 1
  };
  const retryPatch = retestMiniquiz(sBeforeRetry);
  assert.strictEqual(retryPatch.stage, 'miniquiz');
  assert.deepStrictEqual(retryPatch.miniAnswers, []);
  assert.strictEqual(retryPatch.miniScore, 0);
  assert.strictEqual(retryPatch.quizVisible, false);
  assert.strictEqual(retryPatch.supportCount, 3, 'Caso 5 FALLÓ: Debe preservar el conteo acumulado de apoyos previos');
  assert.strictEqual(retryPatch.attempts, 2, 'Caso 5 FALLÓ: Debe incrementar el número de intentos a 2');
  console.log('✓ Escenario 5 APROBADO: Reintento de comprobación preserva apoyos acumulados (3) e incrementa intentos (2).');

  // -------------------------------------------------------------
  // Escenario 6: Pausa y reanudación conserva estado sin mutar progreso
  // -------------------------------------------------------------
  const sToPause: LessonSessionState = {
    ...baseSession,
    stage: 'practice',
    practiceIndex: 2,
    supportCount: 4,
    attempts: 1,
    miniScore: 0
  };
  const pausedJson = pauseLessonSession(sToPause);
  assert.strictEqual(typeof pausedJson, 'string');
  const resumedState = resumeLessonSession(pausedJson);
  assert.deepStrictEqual(resumedState, sToPause, 'Caso 6 FALLÓ: Estado reanudado debe ser idéntico al pausado');
  assert.strictEqual(canAccreditLesson(resumedState), false, 'Sesión pausada a mitad de clase no debe acreditar');
  console.log('✓ Escenario 6 APROBADO: Pausar y reanudar serializa/deserializa con fidelidad estricta sin mutar progreso.');

  console.log('\n================================================================');
  console.log('✅ TODOS LOS 6 ESCENARIOS DE ACREDITACIÓN CON CÓDIGO REAL APROBADOS (6/6)');
  console.log('================================================================');
}

runRealAccreditationTests();
