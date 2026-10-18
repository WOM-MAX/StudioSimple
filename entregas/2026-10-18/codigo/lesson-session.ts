import { LessonSessionState, LessonStage } from '../types/lesson';

/**
 * Determina si la sesión actual acredita logro y maestría pedagógica de la lección.
 * Regla R05: Se exige un mínimo de 2 aciertos en la comprobación final (miniquiz) para acreditar
 * (2/3 o 3/3 aciertos). 0/3 o 1/3 aciertos NO acreditan maestría, incluso si se completó la
 * actividad de refuerzo en el cuaderno; en tal caso, se requiere reintento obligatorio de comprobación.
 */
export function canAccreditLesson(session: Pick<LessonSessionState, 'miniScore'>): boolean {
  return typeof session.miniScore === 'number' && session.miniScore >= 2;
}

/**
 * Finaliza la sesión de la lección y, únicamente si se acredita maestría, registra la clase como completada.
 * Garantiza idempotencia y evita acreditación prematura si miniScore < 2.
 */
export function finalizeLessonSession(
  session: LessonSessionState,
  canonicalKey: string,
  markLessonCompleted?: (key: string) => void
): { isMastered: boolean; stage: LessonStage; canonicalKey: string } {
  const isMastered = canAccreditLesson(session);
  if (isMastered && markLessonCompleted) {
    markLessonCompleted(canonicalKey);
  }
  return {
    isMastered,
    stage: 'completed',
    canonicalKey
  };
}

/**
 * Prepara el estado para reintentar la comprobación formativa (Miniquiz).
 * Resetea las respuestas y el puntaje inmediato, pero PRESERVA estrictamente el conteo de apoyos previos
 * e incrementa el contador de intentos para trazabilidad pedagógica.
 */
export function retestMiniquiz(
  currentSession: LessonSessionState
): Partial<LessonSessionState> {
  const nextAttempts = (currentSession.attempts || 1) + 1;
  return {
    stage: 'miniquiz',
    miniAnswers: [],
    miniScore: 0,
    quizVisible: false,
    attempts: nextAttempts,
    supportCount: currentSession.supportCount
  };
}

/**
 * Dictamen del mentor/adulto ante una tarea abierta o de cuaderno en el refuerzo pedagógico.
 */
export function evaluateOpenRecoveryTask(
  adultApproved: boolean
): Partial<LessonSessionState> {
  return {
    recoveryPassed: adultApproved
  };
}

/**
 * Envío de respuesta del estudiante durante la etapa de refuerzo.
 */
export function submitStudentRecoveryAnswer(
  answer: string
): Partial<LessonSessionState> {
  return {
    recoveryAnswer: answer
  };
}

/**
 * Pausa la sesión de estudio serializando su estado a formato JSON sin alterar el progreso ni los apoyos.
 */
export function pauseLessonSession(session: LessonSessionState): string {
  return JSON.stringify(session);
}

/**
 * Reanuda una sesión de estudio a partir de su estado serializado, conservando íntegramente
 * etapa, apoyos, puntajes e intentos.
 */
export function resumeLessonSession(serialized: string): LessonSessionState {
  const parsed = JSON.parse(serialized) as LessonSessionState;
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('[LessonSession] Formato de sesión serializada inválido');
  }
  return parsed;
}
