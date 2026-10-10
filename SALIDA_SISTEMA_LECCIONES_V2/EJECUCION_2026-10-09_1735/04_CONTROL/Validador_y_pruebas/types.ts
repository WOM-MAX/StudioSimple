/**
 * types.ts — Tipos estrictos para el validador del Sistema Global v2.0
 */

export type Severity = 'critico' | 'mayor' | 'menor';
export type RuleScope = 'universal' | '7_basico' | 'subject_matematica' | 'subject_lengua' | 'subject_ingles' | 'subject_ciencias' | 'subject_historia';

export interface CatalogRule {
  id: string;
  name: string;
  scope: RuleScope;
  severity: Severity;
  evidence: string;
  validation_method: 'computable' | 'conceptual';
  description: string;
}

export interface RulesCatalog {
  version: string;
  updated_at: string;
  system_version: string;
  description: string;
  rules: CatalogRule[];
}

export interface AdultGuide {
  dile: string;
  espera: string;
  siRespondeBien: string;
  siNecesitaApoyo: string;
}

export interface SlideData {
  number: number;
  title: string;
  subtitle?: string;
  visibleText: string[];
  visualDescription: string;
  hasAntiTextClause: boolean;
  oralScript: string;
  sourceCitation?: string;
}

export interface InquiryQuestion {
  question: string;
  expectedAnswer: string;
  hint: string;
  feedbackSuccess: string;
  feedbackHelp: string;
}

export interface PracticeExercise {
  id: string;
  prompt: string;
  adultInstruction: string;
  expectedPerformance: string;
  stepsToSolve?: string[];
  hints: string[];
  notebookRequired: boolean;
  alignedSubobjective: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanationCorrect: string;
  distractorExplanations: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

export interface RemediationLoop {
  thresholdPassing: number;
  conceptReinforcement: string;
  remedialPracticeItem: {
    question: string;
    options: { A: string; B: string; C: string; D: string };
    correctOption: 'A' | 'B' | 'C' | 'D';
    explanation: string;
  };
}

export interface LessonStages {
  antesDeComenzar: {
    materials: string[];
    estimatedTime: string;
    mentorTip: string;
  };
  etapa1_inicio: {
    welcome: string;
    sequencePosition: string;
    subobjective: string;
    priorKnowledgeConnection: string;
    roadmap: string[];
    adultGuide: AdultGuide;
  };
  etapa2_videoMotivacional: {
    slides: SlideData[];
    adultPreInstruction: string;
    adultPostCheck: string;
  };
  etapa3_recorrido: {
    inquiryQuestions: InquiryQuestion[];
    adultGuide: AdultGuide;
  };
  etapa4_videoExplicativo: {
    slides: SlideData[];
    case1Model: {
      context: string;
      problem: string;
      stepByStepResolution: string[];
      conclusion: string;
    };
    goldenRule: string;
  };
  etapa5_practica: {
    exercises: PracticeExercise[];
    adultGuide: AdultGuide;
  };
  etapa6_resumen: {
    keyIdeas: string[];
    summaryCardNotebook: string;
    adultGuide: AdultGuide;
  };
  etapa7_miniquiz: {
    questions: QuizQuestion[];
    remediationLoop: RemediationLoop;
  };
  etapa8_cierre: {
    metacognitionQuestion: string;
    congratulationsMessage: string;
    transferNextLesson: string;
    adultGuide: AdultGuide;
  };
}

export interface CompleteLesson {
  id: string;
  grade: string;
  subject: string;
  oaCode: string;
  classNumber: number;
  subobjective: string;
  officialSource: {
    document: string;
    pages: string;
    officialPublisher: string;
  };
  governanceStatus: 'EN_REVISION' | 'REQUIERE_AJUSTES' | 'APROBADA';
  stages: LessonStages;
}

export interface ValidationFinding {
  ruleId: string;
  ruleName: string;
  severity: Severity;
  stage?: string;
  message: string;
  location?: string;
}

export interface ValidationReport {
  timestamp: string;
  target: string;
  catalogVersion: string;
  totalCatalogRules: number;
  findings: ValidationFinding[];
  summary: {
    critico: number;
    mayor: number;
    menor: number;
  };
  isApproved: boolean;
  notes: string[];
}
