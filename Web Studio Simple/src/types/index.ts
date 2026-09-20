export type ViewMode = 'landing' | 'pricing' | 'checkout' | 'courses' | 'student' | 'parent' | 'login' | 'lesson' | 'admin';

export type ThemeMode = 'dark' | 'light';
export type BrandColorOption = 'yellow' | 'orange' | 'turquoise' | 'silver' | 'graphite' | 'white' | 'ice-blue' | 'navy';

export type AuthRole = 'student' | 'parent' | 'admin';

export interface AuthSession {
  role: AuthRole;
  userId: string;
  enrolledGrades: GradeLevel[];
  isAuthenticated: boolean;
}




export type GradeLevel = '3° Básico' | '4° Básico' | '5° Básico' | '6° Básico' | '7° Básico' | '8° Básico';

export type SubjectName = 'Matemáticas' | 'Lenguaje' | 'Ciencias Naturales' | 'Historia' | 'Inglés';

export interface NeonCurriculumItem {
  id: number;
  curso: string;
  asignatura: string;
  eje_curricular: string;
  numero_oa: string;
  descripcion_oa: string;
  nivel_bloom: string;
  indicadores_evaluacion: string;
  conceptos_clave: string;
  errores_frecuentes: string;
  actividad_recordar: string;
  actividad_comprender: string;
  actividad_aplicar: string;
  actividad_analizar: string;
  actividad_evaluar: string;
  actividad_crear: string;
  estrategia_representacion: string;
  estrategia_expresion: string;
  estrategia_motivacion: string;
}

export type EmotionalBattery = 'full' | 'half' | 'low';
export type DUAMode = 'audio' | 'visual' | 'text';

export interface MentorTrainingCard {
  audioTitle: string;
  audioDuration: string;
  videoTitle: string;
  summaryBulletPoints: string[];
  homeAnalogy: string;
  commonMistakes: string[];
  socraticQuestions: string[];
}

export interface CopilotoAdvice {
  mineducOA: string;
  simplification: string;
  openingScript: string;
  alerts: string[];
  counterExample: string;
  finalSummaryScript: string;
  mentorTraining?: MentorTrainingCard;
}

export interface MineducExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson7thGrade {
  id: string;
  title: string;
  subject: SubjectName;
  grade: GradeLevel;
  durationMinutes: number;
  copiloto: CopilotoAdvice;
  studentMission: string;
  cards: {
    id: string;
    title: string;
    content: string;
    copilotoAlert?: string;
  }[];
  mineducExam?: MineducExamQuestion[];
  dragDropGame: {
    title: string;
    items: { id: string; text: string; targetGroup: 'nomada' | 'sedentario' }[];
    copilotoQuestion: string;
  };
  duaOptions: {
    mode: DUAMode;
    title: string;
    instruction: string;
    icon: string;
  }[];
  exitTicket: {
    question1: {
      text: string;
      options: { id: string; text: string; isCorrect: boolean }[];
    };
    question2: {
      text: string;
      isTrueFalse: boolean;
      correctAnswer: boolean;
    };
    metacognitionQuestion: string;
  };
}

export interface StudentProfile {
  id: string;
  name: string;
  grade: GradeLevel;
  avatar: string;
  curiosityPoints: number;
  gems: number;
  completedLessons: string[];
  currentStreakDays: number;
  pin: string;
}

export interface ParentUser {
  id: string;
  name: string;
  email: string;
  password: string;
  studentId: string;
  subscriptionActive: boolean;
  plan: 'mensual' | 'anual';
  enrolledGrades: GradeLevel[];
}

export interface LearningObjective {
  id: string;
  code: string; // ej: "OA 04"
  title: string;
  description: string;
  subject: SubjectName;
  grade: GradeLevel;
  masteryPercentage: number; // 0 a 100 (para BKT)
}

export interface LessonComponent {
  step: number;
  title: string;
  type: 
    | 'objective' 
    | 'materials' 
    | 'explanation' 
    | 'guided_example' 
    | 'guided_activity' 
    | 'mini_game' 
    | 'mini_quiz' 
    | 'parent_tip' 
    | 'video' 
    | 'illustration' 
    | 'summary';
  content: string;
  details?: string[];
  quizOptions?: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  parentAdvice?: string;
  mediaUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  subject: SubjectName;
  grade: GradeLevel;
  oaCode: string;
  durationMinutes: number;
  components: LessonComponent[];
}
