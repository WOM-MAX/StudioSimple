export type LessonStage =
  | 'landing'
  | 'catalog'
  | 'cover'
  | 'prep'
  | 'routeOverview'
  | 'routeToday'
  | 'thermo'
  | 'thermoMeaning'
  | 'hook'
  | 'conversationIntro'
  | 'preQuestions'
  | 'formalization'
  | 'postIntro'
  | 'postQuestions'
  | 'summary'
  | 'practiceIntro'
  | 'practice'
  | 'reasoningIntro'
  | 'reasoning'
  | 'challenge'
  | 'strategy'
  | 'practiceSummary'
  | 'miniquiz'
  | 'results'
  | 'review'
  | 'recoveryIntro'
  | 'recovery'
  | 'closing'
  | 'completed'
  | 'paused';

export type SyncViewMode = 'split' | 'adult' | 'student';

export interface GuidedItem {
  context: string;
  question: string;
  expected: string;
  success: string;
  support: string;
  reveal: string;
  studentReveal: string;
}

export interface QuizQuestion {
  id?: string;
  q: string;
  options: string[];
  correct: string;
  fixExplain: string;
  concept?: string;
  explain?: string;
}

export interface RecoveryItem {
  title: string;
  explain: string;
  q: string;
  options: string[];
  correct: string;
  correctText: string;
  fixText: string;
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
    reminders?: string[];
    emotionalTip?: string;
  };
  // Paso 2: Ruta y Situación
  route: {
    blocks: Array<{ id: string; number: string; title: string; subtitle: string; color: 'navy' | 'orange' | 'yellow' | 'teal' }>;
    keyQuestions?: Array<{ label: string; sub: string }>;
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
    title?: string;
    titulo?: string;
    focusPoints?: string[];
    dileIntro: string;
    hazInstruction: string;
    videoSrc: string;
    posterSrc?: string;
    dileAfterVideo: string;
  };
  // Paso 4: Conversación Guiada
  preQuestions: GuidedItem[];
  conversationContext?: string;
  // Paso 5: Explicación e Idea Clave
  formalization: {
    title?: string;
    concept?: string;
    summary?: string;
    ideaClave?: string;
    dileIntro: string;
    hazInstruction: string;
    videoSrc?: string;
    graphicPoster?: string;
  };
  postQuestions: GuidedItem[];
  // Paso 6: Práctica Conjunta
  practice: GuidedItem[];
  mini: QuizQuestion[];
  recovery: RecoveryItem[];
  summaryIdeas: Array<[string, string]>;
  // Opcionales para desacoplamiento pedagógico total
  ambientAudioSrc?: string;
  interactive?: {
    type: 'thermo' | 'number_line' | 'hero_journey' | 'dimensions' | 'timeline' | 'story_arc' | 'general' | 'none';
    title?: string;
    [key: string]: any;
  };
  summaryText?: string;
  reasoning?: {
    title?: string;
    dileIntro?: string;
    question: string;
    expectedAnswer: string;
    context1: { label: string; value: string; desc: string };
    context2: { label: string; value: string; desc: string };
    successFeedback: string;
    supportFeedback: string;
    revealText: string;
  };
  challenge?: {
    title?: string;
    question: string;
    expectedAnswer: string;
    item1: { label: string; tag: string };
    item2: { label: string; tag: string };
    successFeedback: string;
    supportFeedback: string;
  };
  strategy?: {
    title?: string;
    dileIntro?: string;
    steps: Array<{ number: number; title: string; desc: string }>;
  };
  closure?: {
    congratulations?: string;
    nextClassPreview?: string;
  };
}

export interface LessonSessionState {
  stage: LessonStage;
  activeOa: string;
  activeLessonNum: number;
  feedback: { kind: 'success' | 'support' | 'reveal' | 'info'; text: string } | null;
  attempt: number;
  conversationIndex: number;
  postIndex: number;
  practiceIndex: number;
  summaryIdea: number;
  quizVisible: boolean;
  hookStarted: boolean;
  hookEnded: boolean;
  formalStarted: boolean;
  formalEnded: boolean;
  video: {
    kind: 'hook' | 'formal' | null;
    playing: boolean;
    seek: number;
    command: number;
  };
  miniAnswers: string[];
  miniScore: number;
  reviewQueue: number[];
  reviewIndex: number;
  recoveryItems: number[];
  recoveryIndex: number;
  recoveryVisible: boolean;
  recoveryAnswer: string;
  supportCount: number;
  reasoningIndependent: boolean;
  challengeCompleted: boolean;
  closureState?: 'none' | 'one_concept' | 'needs_support' | 'done';
  isOxygenPauseActive?: boolean;
  studentConnected?: boolean;
}

