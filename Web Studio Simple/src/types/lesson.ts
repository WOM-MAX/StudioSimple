export type LessonStage =
  | 'cover'          // Paso 1: Portada y preparación
  | 'prep'           // Paso 1: Antes de partir (privado adulto)
  | 'route'          // Paso 2: Conexión y ruta de la asignatura
  | 'situation'      // Paso 2: Situación inicial (ej. termómetro o ascensor)
  | 'reference'      // Paso 2: Fijación del punto de referencia 0
  | 'hook'           // Paso 3: Video o gancho multimedia
  | 'conversation'   // Paso 4: Conversación guiada (4 preguntas socráticas)
  | 'formalization'  // Paso 5: Explicación formal (video o gráfica)
  | 'idea'           // Paso 5: Idea clave y transferencia
  | 'practice'       // Paso 6: Práctica conjunta (3 situaciones)
  | 'miniquiz'       // Paso 7: Miniquiz individual del estudiante
  | 'results'        // Paso 7: Revisión conjunta de resultados
  | 'recovery'       // Paso 7: Refuerzo guiado con preguntas equivalentes
  | 'closing'        // Paso 8: Cierre oral y metacognición
  | 'completed'      // Paso 8: Finalización con éxito y próxima clase
  | 'paused';        // Cierre temporal ("Terminar por hoy" con avance guardado)

export type SyncViewMode = 'split' | 'adult' | 'student';

export interface QuizQuestion {
  id: string;
  q: string;
  options: string[];
  correct: string;
  concept: string;
  explain: string;
}

export interface RecoveryQuestion {
  id: string;
  title: string;
  concept: string;
  explain: string;
  socraticHint: string;
  q: string;
  options: string[];
  correct: string;
}

export interface SocraticConversationItem {
  question: string;
  expectedAnswer: string;
  socraticGuidance: string;
  studentVisualPrompt: string;
  supportHelp: string;
}

export interface PracticeContextItem {
  contextName: string;
  prompt: string;
  expectedAnswer: string;
  socraticTip: string;
  supportHelp: string;
}

export interface LessonMetadata {
  grade: string;              // "7° Básico"
  subject: string;            // "Matemática"
  oaCode: string;             // "OA 1"
  oaTitle: string;            // "Números enteros"
  lessonNumber: number;       // 1
  totalLessonsInOa: number;   // 5
  lessonTitle: string;        // "Posiciones respecto de un punto de referencia"
  durationMinutes: number;    // 30
  nextLessonTitle: string;    // "La recta numérica y orden en Z"
}

export interface LessonData {
  metadata: LessonMetadata;
  // Paso 1: Preparación
  prep: {
    adultObjective: string;
    routeToday: string;
    mentorReminder: string;
    emotionalTip: string;
  };
  // Paso 2: Ruta y Situación
  route: {
    blocks: Array<{ id: string; number: string; title: string; subtitle: string; color: 'navy' | 'orange' | 'yellow' | 'teal' }>;
    dileIntro: string;
    dileObjective: string;
  };
  situation: {
    dilePrompt: string;
    expectedAnswer: string;
    socraticHint: string;
    emotionalTip: string;
    options: Array<{ label: string; kind: 'correct' | 'needs_support' | 'no_answer' | 'other'; feedbackText: string }>;
  };
  reference: {
    dilePrompt: string;
    question: string;
    expectedAnswer: string;
    socraticHint: string;
    feedbackSuccess: string;
    feedbackSupport: string;
  };
  // Paso 3: Video Gancho
  hook: {
    dileIntro: string;
    hazInstruction: string;
    videoSrc: string;
    posterSrc?: string;
    dileAfterVideo: string;
  };
  // Paso 4: Conversación Guiada
  conversation: {
    dileIntro: string;
    emotionalTip: string;
    items: SocraticConversationItem[];
  };
  // Paso 5: Explicación e Idea Clave
  formalization: {
    dileIntro: string;
    hazInstruction: string;
    videoSrc?: string;
    graphicPoster?: string;
  };
  idea: {
    dilePrompt: string;
    checkQuestion: string;
    expectedAnswer: string;
    socraticHint: string;
    feedbackSuccess: string;
    feedbackSupport: string;
  };
  // Paso 6: Práctica Conjunta
  practice: {
    dileIntro: string;
    items: PracticeContextItem[];
  };
  // Paso 7: Miniquiz y Recuperación
  quiz: {
    dileIntro: string;
    hazInstruction: string;
    passScoreMin: number; // e.g. 2 out of 3
    questions: QuizQuestion[];
  };
  recovery: {
    dileIntroError: string;
    dilePass: string;
    dileNeedsMorePractice: string;
    items: RecoveryQuestion[];
  };
  // Paso 8: Cierre Oral y Metacognición
  closing: {
    dileQuestion: string;
    metacognitionQuestion: string;
    transferQuestion: string;
    evaluationCriteria: string;
    supportRefocus: string;
    dileFinalCelebration: string;
    dilePausedSave: string;
  };
}

export interface LessonSessionState {
  stage: LessonStage;
  activeOa: string;
  activeLessonNum: number;
  feedback: { kind: 'success' | 'support' | 'info'; text: string } | null;
  conversationIndex: number;
  practiceIndex: number;
  hookStarted: boolean;
  hookEnded: boolean;
  formalStarted: boolean;
  formalEnded: boolean;
  miniAnswers: string[];
  miniScore: number;
  reviewIndex: number;
  recoveryIndex: number;
  recoveryVisible: boolean;
  recoveryResults: boolean[];
  closureState: 'none' | 'one_concept' | 'needs_support' | 'done';
  isOxygenPauseActive: boolean;
  studentConnected: boolean;
}
