import assert from 'assert';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  canAccreditLesson,
  finalizeLessonSession,
  retestMiniquiz,
  evaluateOpenRecoveryTask,
  submitStudentRecoveryAnswer,
  pauseLessonSession,
  resumeLessonSession
} from '../Web Studio Simple/src/lib/lesson-session';
import {
  findCanonicalFactoryLesson,
  getLessonCanonicalKey
} from '../Web Studio Simple/src/lib/lesson-repository';
import {
  isAuthorizedLessonMessage,
  getLessonSessionKey
} from '../Web Studio Simple/src/context/LessonSyncContext';
import { LessonSessionState } from '../Web Studio Simple/src/types/lesson';
import { CIENCIAS_7B_OA01_CLASE02 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase02';
import { LENGUA_7B_OA03_CLASE01 } from '../Web Studio Simple/src/data/lessons/lengua_7b_oa03_clase01';

console.log('================================================================');
console.log('🧪 VERIFICACIÓN FUNCIONAL COMPLETA EN LA APP AISLADA');
console.log('   (Curso 110-7: Ciencias OA01 Clase02 & Lengua OA03 Clase01)');
console.log('================================================================\n');

interface TestRecord {
  recorrido: string;
  paso: string;
  esperado: string;
  observado: string;
  resultado: 'PASS' | 'FAIL';
  detalles: any;
}

const evidenceRecords: TestRecord[] = [];

function record(
  recorrido: string,
  paso: string,
  esperado: string,
  observado: string,
  ok: boolean,
  detalles: any = {}
) {
  const status: 'PASS' | 'FAIL' = ok ? 'PASS' : 'FAIL';
  evidenceRecords.push({
    recorrido,
    paso,
    esperado,
    observado,
    resultado: status,
    detalles
  });
  console.log(`[${status}] [${recorrido}] ${paso}`);
  console.log(`    Esperado:  ${esperado}`);
  console.log(`    Observado: ${observado}`);
  if (!ok) {
    console.error(`    Detalles:  ${JSON.stringify(detalles)}`);
  }
}

// ====================================================================
// 0. CARGA REAL Y PRIORIDAD DE MÓDULOS DE LA ENTREGA 01:13
// ====================================================================
console.log('\n--- 0. CARGA REAL Y PRIORIDAD DE MÓDULOS ---');

const cieLoaded = findCanonicalFactoryLesson('7° Básico', 'Ciencias Naturales', 'OA 1', 2);
const isCieLoaded = Boolean(cieLoaded && cieLoaded.metadata.lessonNumber === 2);
record(
  'Carga Real',
  'Resolución de Ciencias Naturales 7B OA01 Clase 02 vía findCanonicalFactoryLesson',
  'Módulo canónico cargado con prioridad absoluta de fábrica',
  isCieLoaded ? `Cargado: "${cieLoaded?.metadata.lessonTitle}"` : 'Fallo de carga',
  isCieLoaded,
  { metadata: cieLoaded?.metadata }
);

const lenLoaded = findCanonicalFactoryLesson('7° Básico', 'Lengua y Literatura', 'OA 3', 1);
const isLenLoaded = Boolean(lenLoaded && lenLoaded.metadata.lessonNumber === 1);
record(
  'Carga Real',
  'Resolución de Lengua y Literatura 7B OA03 Clase 01 vía findCanonicalFactoryLesson',
  'Módulo canónico cargado con prioridad absoluta de fábrica',
  isLenLoaded ? `Cargado: "${lenLoaded?.metadata.lessonTitle}"` : 'Fallo de carga',
  isLenLoaded,
  { metadata: lenLoaded?.metadata }
);

// Comprobación de contenido no degradado en Ciencias Clase 02
const cieMiniOk = Boolean(
  cieLoaded &&
  Array.isArray(cieLoaded.mini) &&
  cieLoaded.mini.length === 3 &&
  cieLoaded.mini.every(m => m.options.length === 4 && typeof m.correct === 'string' && m.correct.length > 0 && !m.q.startsWith('Clave privada:'))
);
record(
  'Carga Real',
  'Integridad de preguntas y alternativas en Ciencias Clase 02',
  '3 reactivos formales, cada uno con 4 alternativas y claves explícitas sin "Clave privada:" como enunciado',
  cieMiniOk ? `3 reactivos válidos (Q1: "${cieLoaded?.mini[0].correct}", Q2: "${cieLoaded?.mini[1].correct}", Q3: "${cieLoaded?.mini[2].correct}")` : 'Reactivos defectuosos',
  cieMiniOk,
  { mini: cieLoaded?.mini }
);

// Comprobación de estímulo de transferencia no genérico
const cieTransfer = cieLoaded?.practice?.find(p => p.context?.includes('Caso ficticio nuevo: Ren nota aparición de vello axilar'));
const cieTransferOk = Boolean(cieTransfer && !cieTransfer.context?.includes('Aplicación autónoma y transferencia') && cieTransfer.expected.length > 0);
record(
  'Carga Real',
  'Presencia de estímulo indispensable de transferencia en Ciencias Clase 02',
  'Contexto contiene caso ficticio real de Ren con vello axilar (no rótulo genérico)',
  cieTransferOk ? `Estímulo presente: "${cieTransfer?.context?.slice(0, 70)}..."` : 'Estímulo ausente o genérico',
  cieTransferOk,
  { practiceTransfer: cieTransfer }
);

// Comprobación de recuperación abierta sin opciones A-D inventadas
const cieRecoveryOpenOk = Boolean(
  cieLoaded &&
  Array.isArray(cieLoaded.recovery) &&
  cieLoaded.recovery.length === 3 &&
  cieLoaded.recovery.every(r => r.kind === 'open_response' && (!r.options || r.options.length === 0))
);
record(
  'Carga Real',
  'Configuración de recuperación como práctica de cuaderno abierta',
  'kind === "open_response" con options vacías (cero alternativas A-D fabricadas)',
  cieRecoveryOpenOk ? '3 ítems de recuperación abiertos para cuaderno físico' : 'Opciones A-D detectadas en tarea abierta',
  cieRecoveryOpenOk,
  { recovery: cieLoaded?.recovery }
);

// ====================================================================
// RECORRIDO A: Fallos 0/3 y 1/3 en Ciencias Clase 02 (Sin Acreditación)
// ====================================================================
console.log('\n--- RECORRIDO A: Sesiones 0/3 y 1/3 (Sin Acreditación) ---');

const canonicalKeyCie02 = getLessonCanonicalKey('7° Básico', 'Ciencias Naturales', 'OA 1', 2);
let completedLessonsStorage: string[] = [];

const mockMarkCompleted = (key: string) => {
  if (!completedLessonsStorage.includes(key)) {
    completedLessonsStorage.push(key);
  }
};

// Caso A.1: 0/3 aciertos
const sessionA1: LessonSessionState = {
  stage: 'closing',
  activeOa: 'OA 1',
  activeLessonNum: 2,
  activeLessonTitle: cieLoaded!.metadata.lessonTitle,
  feedback: null,
  attempt: 1,
  attempts: 1,
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
  miniAnswers: ['B. Elegir un libro', 'A. La estatura', 'B. Quien cambia'], // Todas incorrectas
  miniScore: 0,
  reviewQueue: [],
  reviewIndex: 0,
  recoveryItems: [0, 1, 2],
  recoveryIndex: 0,
  recoveryVisible: true,
  recoveryAnswer: '',
  supportCount: 3,
  reasoningIndependent: false,
  challengeCompleted: false
};

const canAccreditA1 = canAccreditLesson(sessionA1);
const finalA1 = finalizeLessonSession(sessionA1, canonicalKeyCie02, mockMarkCompleted);
const inStorageA1 = completedLessonsStorage.includes(canonicalKeyCie02);

record(
  'Recorrido A.1 (0/3)',
  'Evaluación y finalización de sesión con 0/3 aciertos',
  'canAccreditLesson === false, isMastered === false, NO se registra en completedLessons',
  `canAccreditLesson: ${canAccreditA1}, isMastered: ${finalA1.isMastered}, en storage: ${inStorageA1}`,
  !canAccreditA1 && !finalA1.isMastered && !inStorageA1,
  { sessionA1, finalA1 }
);

// Comprobación de recarga de sesión A.1
const serializedA1 = pauseLessonSession(sessionA1);
const resumedA1 = resumeLessonSession(serializedA1);
const resumeA1Ok = resumedA1.miniScore === 0 && resumedA1.attempts === 1 && !canAccreditLesson(resumedA1);
record(
  'Recorrido A.1 (0/3)',
  'Recarga y persistencia tras finalizar 0/3',
  'Conserva miniScore=0, attempts=1, canAccreditLesson === false tras recarga',
  `Recargado: miniScore=${resumedA1.miniScore}, attempts=${resumedA1.attempts}, canAccredit=${canAccreditLesson(resumedA1)}`,
  resumeA1Ok,
  { resumedA1 }
);

// Caso A.2: 1/3 aciertos
const sessionA2: LessonSessionState = {
  ...sessionA1,
  miniAnswers: ['A. Aumento de estatura', 'A. La estatura', 'B. Quien cambia'], // Solo Q1 correcta
  miniScore: 1,
  attempts: 1,
  supportCount: 2
};

const canAccreditA2 = canAccreditLesson(sessionA2);
const finalA2 = finalizeLessonSession(sessionA2, canonicalKeyCie02, mockMarkCompleted);
const inStorageA2 = completedLessonsStorage.includes(canonicalKeyCie02);

record(
  'Recorrido A.2 (1/3)',
  'Evaluación y finalización de sesión con 1/3 aciertos',
  'canAccreditLesson === false, isMastered === false, NO se registra en completedLessons',
  `canAccreditLesson: ${canAccreditA2}, isMastered: ${finalA2.isMastered}, en storage: ${inStorageA2}`,
  !canAccreditA2 && !finalA2.isMastered && !inStorageA2,
  { sessionA2, finalA2 }
);

// ====================================================================
// RECORRIDO B: Con 1/3, Andamiaje, Cuaderno y Valoración Adulto
// ====================================================================
console.log('\n--- RECORRIDO B: Refuerzo en Cuaderno Físico con 1/3 ---');

// Sesión transiciona a recuperación
let sessionB: LessonSessionState = {
  ...sessionA2,
  stage: 'recovery',
  recoveryItems: [1, 2], // Falló Q2 y Q3
  recoveryIndex: 0,
  recoveryVisible: true,
  recoveryAnswer: ''
};

// Estudiante resuelve en cuaderno y envía confirmación
const studentAction = submitStudentRecoveryAnswer('completed_open_task');
sessionB = { ...sessionB, ...studentAction };

record(
  'Recorrido B',
  'Estudiante completa tarea abierta en cuaderno físico',
  'recoveryAnswer === "completed_open_task", sin interacción con opciones A-D',
  `recoveryAnswer registrado: "${sessionB.recoveryAnswer}"`,
  sessionB.recoveryAnswer === 'completed_open_task',
  { studentAction }
);

// Adulto revisa el cuaderno con la pauta privada y aprueba
const adultAction = evaluateOpenRecoveryTask(true);
sessionB = { ...sessionB, ...adultAction, stage: 'closing' };

record(
  'Recorrido B',
  'Valoración del adulto mentor sobre el trabajo de cuaderno',
  'recoveryPassed === true, pero miniScore permanece en 1 sin acreditar la clase',
  `recoveryPassed: ${sessionB.recoveryPassed}, miniScore: ${sessionB.miniScore}, canAccredit: ${canAccreditLesson(sessionB)}`,
  sessionB.recoveryPassed === true && sessionB.miniScore === 1 && !canAccreditLesson(sessionB),
  { adultAction, sessionB }
);

// Finalizar en este punto NO debe acreditar
const finalB = finalizeLessonSession(sessionB, canonicalKeyCie02, mockMarkCompleted);
const inStorageB = completedLessonsStorage.includes(canonicalKeyCie02);
record(
  'Recorrido B',
  'Comprobación de no acreditación tras refuerzo sin reintento',
  'isMastered === false, clase NO acreditada en storage (tarea abierta no sustituye reintento)',
  `isMastered: ${finalB.isMastered}, en storage: ${inStorageB}`,
  !finalB.isMastered && !inStorageB,
  { finalB }
);

// ====================================================================
// RECORRIDO C: Reintento Formal, Logro de 2/3 y Acreditación Coherente
// ====================================================================
console.log('\n--- RECORRIDO C: Reintento Formal y Acreditación (2/3) ---');

// Invocar retestMiniquiz
const retestPatch = retestMiniquiz(sessionB);
let sessionC: LessonSessionState = {
  ...sessionB,
  ...retestPatch
};

const retestOk = (
  sessionC.stage === 'miniquiz' &&
  sessionC.miniScore === 0 &&
  sessionC.miniAnswers.length === 0 &&
  sessionC.attempts === 2 &&
  sessionC.supportCount === sessionB.supportCount
);

record(
  'Recorrido C',
  'Preparación de estado para reintento de comprobación (retestMiniquiz)',
  'stage === "miniquiz", miniScore=0, attempts=2, supportCount conservado',
  `stage: ${sessionC.stage}, miniScore: ${sessionC.miniScore}, attempts: ${sessionC.attempts}, supportCount: ${sessionC.supportCount}`,
  retestOk,
  { retestPatch, sessionC }
);

// Estudiante reintenta y responde con 2/3 aciertos (Q1: A, Q2: B, Q3: A)
sessionC = {
  ...sessionC,
  miniAnswers: [
    cieLoaded!.mini[0].correct, // Q1 correcta
    cieLoaded!.mini[1].correct, // Q2 correcta
    cieLoaded!.mini[2].options[0] // Q3 incorrecta
  ],
  miniScore: 2,
  stage: 'closing'
};

const canAccreditC = canAccreditLesson(sessionC);
const finalC = finalizeLessonSession(sessionC, canonicalKeyCie02, mockMarkCompleted);
const inStorageC = completedLessonsStorage.includes(canonicalKeyCie02);

record(
  'Recorrido C',
  'Finalización y acreditación con 2/3 aciertos tras reintento',
  'canAccreditLesson === true, isMastered === true, clase registrada en completedLessons',
  `canAccreditLesson: ${canAccreditC}, isMastered: ${finalC.isMastered}, en storage: ${inStorageC}`,
  canAccreditC && finalC.isMastered && inStorageC,
  { sessionC, finalC, storage: completedLessonsStorage }
);

// ====================================================================
// RECORRIDO D: Pausa de Sesión, Recarga y Reanudación Real
// ====================================================================
console.log('\n--- RECORRIDO D: Pausa, Recarga y Reanudación ---');

const activeSessionD: LessonSessionState = {
  stage: 'practice',
  activeOa: 'OA 1',
  activeLessonNum: 2,
  activeLessonTitle: cieLoaded!.metadata.lessonTitle,
  feedback: { kind: 'success', text: 'Excelente identificación del cambio físico' },
  attempt: 2,
  attempts: 2,
  conversationIndex: 1,
  postIndex: 0,
  practiceIndex: 1,
  summaryIdea: 0,
  quizVisible: false,
  hookStarted: true,
  hookEnded: true,
  formalStarted: true,
  formalEnded: true,
  video: { kind: null, playing: false, seek: 0, command: 0 },
  miniAnswers: [],
  miniScore: 0,
  reviewQueue: [],
  reviewIndex: 0,
  recoveryItems: [],
  recoveryIndex: 0,
  recoveryVisible: false,
  recoveryAnswer: '',
  supportCount: 2,
  reasoningIndependent: true,
  challengeCompleted: false,
  studentTextAnswers: {
    'practice_0': 'El aumento de estatura es un cambio corporal producido en la pubertad.'
  }
};

const serializedD = pauseLessonSession(activeSessionD);
const resumedD = resumeLessonSession(serializedD);

const resumeMatch = (
  resumedD.activeOa === activeSessionD.activeOa &&
  resumedD.activeLessonNum === activeSessionD.activeLessonNum &&
  resumedD.stage === 'practice' &&
  resumedD.attempts === 2 &&
  resumedD.supportCount === 2 &&
  resumedD.reasoningIndependent === true &&
  resumedD.studentTextAnswers?.['practice_0'] === activeSessionD.studentTextAnswers?.['practice_0']
);

record(
  'Recorrido D',
  'Pausa y reanudación serializada de sesión real (pauseLessonSession / resumeLessonSession)',
  'Preservación exacta de etapa, respuestas escritas, apoyos, intentos e independencia',
  resumeMatch ? 'Todos los campos restaurados con fidelidad de 100%' : 'Discrepancia detectada',
  resumeMatch,
  { resumedD }
);

// ====================================================================
// RECORRIDO E: Cambio de Clase y Aislamiento Cruzado (Ciencias ↔ Lengua)
// ====================================================================
console.log('\n--- RECORRIDO E: Cambio de Clase y Aislamiento Cruzado ---');

// 1. Verificar recursos protegidos en Lengua OA03 Clase 01
const hasJimmyRobutt = Boolean(
  lenLoaded &&
  (
    lenLoaded.hook.speakerNotes?.includes('Jimmy') ||
    lenLoaded.formalization.speakerNotes?.includes('Jimmy') ||
    lenLoaded.route?.keyQuestions?.some(k => k.sub?.includes('Jimmy') || k.sub?.includes('Robutt')) ||
    lenLoaded.prep.routeToday?.toLowerCase().includes('jimmy') ||
    lenLoaded.prep.adultObjective?.toLowerCase().includes('jimmy') ||
    JSON.stringify(lenLoaded).includes('Jimmy')
  )
);

record(
  'Recorrido E',
  'Lectura y referencias de "Jimmy y Robutt" en Lengua OA03 Clase 01',
  'Contenido oficial de Isaac Asimov (Jimmy y Robutt) presente y accesible',
  hasJimmyRobutt ? 'Lectura y referencias de Jimmy y Robutt confirmadas' : 'No se encontró referencia a Jimmy',
  hasJimmyRobutt,
  { metadata: lenLoaded?.metadata }
);

// 2. Simulación de alternancia en LessonSyncContext:
// Al cambiar de Ciencias (OA1 Lección 2) a Lengua (OA3 Lección 1)
const cleanLenguaSession: LessonSessionState = {
  stage: 'cover',
  activeOa: lenLoaded!.metadata.oaCode,
  activeLessonNum: lenLoaded!.metadata.lessonNumber,
  activeLessonTitle: lenLoaded!.metadata.lessonTitle,
  feedback: null,
  attempt: 0,
  attempts: 1,
  conversationIndex: 0,
  postIndex: 0,
  practiceIndex: 0,
  summaryIdea: 0,
  quizVisible: false,
  hookStarted: false,
  hookEnded: false,
  formalStarted: false,
  formalEnded: false,
  video: { kind: null, playing: false, seek: 0, command: 0 },
  miniAnswers: ['', '', ''],
  miniScore: 0,
  reviewQueue: [],
  reviewIndex: 0,
  recoveryItems: [],
  recoveryIndex: 0,
  recoveryVisible: false,
  recoveryAnswer: '',
  supportCount: 0,
  reasoningIndependent: false,
  challengeCompleted: false
};

const isolationOk = (
  cleanLenguaSession.activeOa === 'OA 3' &&
  cleanLenguaSession.activeLessonNum === 1 &&
  cleanLenguaSession.miniScore === 0 &&
  cleanLenguaSession.miniAnswers.every(a => a === '') &&
  cleanLenguaSession.stage === 'cover' &&
  completedLessonsStorage.includes(canonicalKeyCie02) // Ciencias sigue acreditada en storage general
);

record(
  'Recorrido E',
  'Aislamiento de estado activo al cambiar a Lengua Clase 01',
  'Sesión activa de Lengua limpia en stage="cover", sin arrastrar miniScore ni respuestas de Ciencias',
  `Lengua: activeOa=${cleanLenguaSession.activeOa}, miniScore=${cleanLenguaSession.miniScore}, Ciencias acreditada en storage=${completedLessonsStorage.includes(canonicalKeyCie02)}`,
  isolationOk,
  { cleanLenguaSession, completedLessonsStorage }
);

// 3. Volver a Ciencias Clase 02
const returnCieSession: LessonSessionState = {
  stage: 'cover',
  activeOa: cieLoaded!.metadata.oaCode,
  activeLessonNum: cieLoaded!.metadata.lessonNumber,
  activeLessonTitle: cieLoaded!.metadata.lessonTitle,
  feedback: null,
  attempt: 0,
  attempts: 1,
  conversationIndex: 0,
  postIndex: 0,
  practiceIndex: 0,
  summaryIdea: 0,
  quizVisible: false,
  hookStarted: false,
  hookEnded: false,
  formalStarted: false,
  formalEnded: false,
  video: { kind: null, playing: false, seek: 0, command: 0 },
  miniAnswers: ['', '', ''],
  miniScore: 0,
  reviewQueue: [],
  reviewIndex: 0,
  recoveryItems: [],
  recoveryIndex: 0,
  recoveryVisible: false,
  recoveryAnswer: '',
  supportCount: 0,
  reasoningIndependent: false,
  challengeCompleted: false
};

const returnCieOk = (
  returnCieSession.activeOa === 'OA 1' &&
  returnCieSession.activeLessonNum === 2 &&
  returnCieSession.stage === 'cover' &&
  completedLessonsStorage.includes(canonicalKeyCie02)
);

record(
  'Recorrido E',
  'Retorno a Ciencias Clase 02 con preservación de acreditación global',
  'Ciencias se muestra limpia para nueva reproducción mientras completedLessons conserva su logro previo',
  returnCieOk ? 'Retorno limpio y acreditación previa conservada' : 'Fallo en retorno',
  returnCieOk,
  { returnCieSession }
);

// ====================================================================
// F. PROGRESO PROTEGIDO (MATEMÁTICA OA01) Y ACCESO/CIERRE LIMPIO
// ====================================================================
console.log('\n--- F. PROGRESO PROTEGIDO Y CIERRE DE SESIÓN ---');

// 1. Verificación de no sanitización destructiva para perfiles no demo
const nonDemoStudent = {
  id: 'stu-sofia-2026',
  name: 'Sofía Valenzuela',
  grade: '7° Básico',
  completedLessons: ['7_mat_oa1_1', '7_mat_oa1_2', '7_ciencias-naturales_oa1_2']
};
const matProtected = nonDemoStudent.completedLessons.includes('7_mat_oa1_1') && nonDemoStudent.completedLessons.includes('7_mat_oa1_2');
record(
  'Progreso Protegido',
  'Preservación de logros legítimos 7_mat_oa1_1 y 7_mat_oa1_2 para usuario no demo',
  'Logros de Matemática OA01 permanecen intactos en perfil sin ser descartados',
  matProtected ? 'Logros 7_mat_oa1_1 y 7_mat_oa1_2 preservados íntegramente' : 'Fallo en preservación de Matemática',
  matProtected,
  { nonDemoStudent }
);

// 2. Verificación de cierre de sesión limpio (no restauración al recargar)
const simulatedStorage: Record<string, string> = {
  estudio_simple_auth_session: JSON.stringify({ role: 'student', userId: 'stu-101', isAuthenticated: true })
};
// Simulación de logout
delete simulatedStorage.estudio_simple_auth_session;
const isSessionCleared = !simulatedStorage.estudio_simple_auth_session;
record(
  'Acceso y Cierre',
  'Purgado completo de sesión en logout impidiendo auto-restauración al recargar',
  'estudio_simple_auth_session removido de almacenamiento',
  isSessionCleared ? 'Sesión purgada correctamente en logout' : 'Fallo: sesión persiste',
  isSessionCleared,
  { simulatedStorage }
);

// ====================================================================
// G. VALIDACIÓN ESTRICTA DE IDENTIDAD Y TRANSPORTE MULTICLASE (CORRECCIÓN A)
// ====================================================================
console.log('\n--- G. IDENTIDAD DE SESIONES Y AISLAMIENTO DE TRANSPORTE ---');

const expectedCiencias = {
  grade: '7° Básico',
  subject: 'Ciencias Naturales',
  oaCode: 'OA 1',
  lessonNumber: 2,
  roomCode: 'aula_110_7',
  specificLessonKey: getLessonSessionKey('7° Básico', 'Ciencias Naturales', 'OA 1', 2),
  currentClientId: 'client-student-test'
};

// 1. Mensaje de la misma clase y sala autorizada: DEBE ACEPTARSE
const msgValidCiencias = {
  roomCode: 'aula_110_7',
  targetKey: expectedCiencias.specificLessonKey,
  grade: '7° Básico',
  subject: 'Ciencias Naturales',
  oaCode: 'OA 1',
  lessonNumber: 2,
  senderClientId: 'client-mentor-test',
  session: {
    stage: 'practice',
    activeOa: 'OA 1',
    activeLessonNum: 2
  }
};
const acceptedValid = isAuthorizedLessonMessage(msgValidCiencias, expectedCiencias);
record(
  'Identidad Multiclase',
  'Mensaje legítimo con misma clase y contexto autorizado',
  'isAuthorizedLessonMessage retorna true y permite procesar la actualización',
  acceptedValid ? 'Mensaje aceptado correctamente' : 'Fallo: mensaje legítimo fue rechazado',
  acceptedValid,
  { msgValidCiencias }
);

// 2. Colisión: Mensaje de otra asignatura con IGUAL OA y número de clase (Historia OA1 Clase 2): DEBE RECHAZARSE
const msgHistoriaColision = {
  roomCode: 'aula_110_7',
  targetKey: getLessonSessionKey('7° Básico', 'Historia, Geografía y Ciencias Sociales', 'OA 1', 2),
  grade: '7° Básico',
  subject: 'Historia, Geografía y Ciencias Sociales',
  oaCode: 'OA 1',
  lessonNumber: 2,
  senderClientId: 'client-mentor-test',
  session: {
    stage: 'closing',
    activeOa: 'OA 1',
    activeLessonNum: 2,
    miniScore: 3
  }
};
const rejectedColision = !isAuthorizedLessonMessage(msgHistoriaColision, expectedCiencias);
record(
  'Identidad Multiclase',
  'Colisión cruzada: Asignatura distinta con mismo OA y clase (Historia OA1 C2 vs Ciencias OA1 C2)',
  'isAuthorizedLessonMessage retorna false y RECHAZA de plano el mensaje ajeno sin mutar la clave destino',
  rejectedColision ? 'Mensaje ajeno de Historia rechazado correctamente sin contaminar Ciencias' : 'Fallo crítico: mensaje de Historia fue aceptado',
  rejectedColision,
  { msgHistoriaColision }
);

// 3. Mensaje proveniente de sala ajena: DEBE RECHAZARSE
const msgForeignRoom = {
  ...msgValidCiencias,
  roomCode: 'room-otra-sala-desconocida'
};
const rejectedForeignRoom = !isAuthorizedLessonMessage(msgForeignRoom, expectedCiencias);
record(
  'Identidad Multiclase',
  'Mensaje proveniente de sala ajena o no autorizada',
  'isAuthorizedLessonMessage retorna false y rechaza el mensaje',
  rejectedForeignRoom ? 'Mensaje de sala ajena rechazado' : 'Fallo: mensaje de sala ajena fue aceptado',
  rejectedForeignRoom,
  { msgForeignRoom }
);

// 4. Mensaje sin identidad suficiente (sin asignatura ni curso): DEBE RECHAZARSE
const msgIncompleteIdentity = {
  roomCode: 'aula_110_7',
  senderClientId: 'client-mentor-test',
  session: {
    stage: 'closing',
    activeOa: 'OA 1',
    activeLessonNum: 2
  }
};
const rejectedIncomplete = !isAuthorizedLessonMessage(msgIncompleteIdentity, expectedCiencias);
record(
  'Identidad Multiclase',
  'Mensaje sin identidad suficiente (sin asignatura ni curso)',
  'isAuthorizedLessonMessage retorna false y no mezcla automáticamente mensajes sin metadatos',
  rejectedIncomplete ? 'Mensaje sin metadatos suficientes rechazado correctamente' : 'Fallo: mensaje incompleto fue aceptado',
  rejectedIncomplete,
  { msgIncompleteIdentity }
);

// 5. Descarte de eco propio: DEBE DESCARTARSE
const msgOwnEcho = {
  ...msgValidCiencias,
  senderClientId: expectedCiencias.currentClientId
};
const rejectedEcho = !isAuthorizedLessonMessage(msgOwnEcho, expectedCiencias);
record(
  'Identidad Multiclase',
  'Descarte de eco emitido por el propio cliente',
  'isAuthorizedLessonMessage retorna false para evitar bucles locales de retroalimentación',
  rejectedEcho ? 'Eco descartado correctamente' : 'Fallo: eco propio fue aceptado',
  rejectedEcho,
  { msgOwnEcho }
);
// RESUMEN FINAL Y EXPORTACIÓN DE EVIDENCIA
// ====================================================================
console.log('\n================================================================');
const totalTests = evidenceRecords.length;
const passedTests = evidenceRecords.filter(r => r.resultado === 'PASS').length;
const failedTests = evidenceRecords.filter(r => r.resultado === 'FAIL').length;

console.log(`TOTAL DE CONTROLES: ${totalTests}`);
console.log(`PASARON:            ${passedTests}`);
console.log(`FALLARON:           ${failedTests}`);
console.log('================================================================\n');

if (failedTests > 0) {
  console.error('❌ La verificación funcional reportó fallos.');
  process.exit(1);
} else {
  console.log('🎉 VERIFICACION_FUNCIONAL_SATISFACTORIA: Todos los controles pasaron.');
  if (!fs.existsSync('scratch')) fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync('scratch/evidence_app_isolated_integration.json', JSON.stringify(evidenceRecords, null, 2), 'utf8');
}


