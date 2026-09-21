import {
  LessonData as PlayerLessonData,
  SocraticConversationItem,
  PracticeContextItem,
  QuizQuestion,
  RecoveryQuestion
} from '../types/lesson';
import { LessonData as GeneratorLessonData } from './lesson-generator';

export function adaptGeneratorLessonToPlayer(
  genLesson: GeneratorLessonData,
  oa: { curso: string; asignatura: string; oa: string; eje?: string; titulo?: string },
  totalLessons: number
): PlayerLessonData {
  const conversationItems: SocraticConversationItem[] = (genLesson.paso3_recorrido || []).map((item) => ({
    question: item.question,
    expectedAnswer: item.expected,
    socraticGuidance: item.support || item.reveal,
    studentVisualPrompt: item.studentReveal || item.context,
    supportHelp: item.support
  }));

  const practiceItems: PracticeContextItem[] = (genLesson.paso5_practica || []).map((item) => ({
    contextName: item.context || 'Situación Aplicada',
    prompt: item.question,
    expectedAnswer: item.expected,
    socraticTip: item.support || item.reveal,
    supportHelp: item.support
  }));

  const quizQuestions: QuizQuestion[] = (genLesson.paso7_miniquiz || []).map((q, idx) => ({
    id: `q_${idx + 1}`,
    q: q.q,
    options: q.options,
    correct: q.correct,
    concept: genLesson.title,
    explain: q.fixExplain
  }));

  const recoveryQuestions: RecoveryQuestion[] = (genLesson.paso7b_recuperacion || []).map((r, idx) => ({
    id: `rec_${idx + 1}`,
    title: r.title || `Refuerzo ${idx + 1}`,
    concept: r.title || genLesson.title,
    explain: r.explain,
    socraticHint: r.fixText || 'Lee con atención la pregunta y busca la pista principal.',
    q: r.q,
    options: r.options,
    correct: r.correct
  }));

  const subjectColorMap: Record<string, 'navy' | 'orange' | 'yellow' | 'teal'> = {
    'Matemática': 'navy',
    'Lengua y Literatura': 'orange',
    'Ciencias Naturales': 'teal',
    'Historia, Geografía y Ciencias Sociales': 'yellow',
    'Inglés': 'teal'
  };

  const activeColor = subjectColorMap[oa.asignatura] || 'navy';

  return {
    metadata: {
      grade: oa.curso,
      subject: oa.asignatura,
      oaCode: oa.oa,
      oaTitle: oa.titulo || oa.eje || `${oa.asignatura} - ${oa.oa}`,
      lessonNumber: genLesson.num,
      totalLessonsInOa: totalLessons,
      lessonTitle: genLesson.title,
      durationMinutes: 30,
      nextLessonTitle: `Clase ${genLesson.num + 1}`
    },

    prep: {
      adultObjective: genLesson.objetivoAdulto,
      routeToday: genLesson.focoDidactico,
      mentorReminder: 'Sigue las indicaciones en pantalla paso a paso. Lee únicamente los recuadros DILE en voz alta y espera siempre la respuesta.',
      emotionalTip: genLesson.climaEmocional
    },

    route: {
      blocks: [
        { id: 'b1', number: '01', title: oa.asignatura, subtitle: genLesson.title, color: activeColor },
        { id: 'b2', number: '02', title: 'Exploración', subtitle: 'Gancho y Recorrido Guiado', color: 'orange' },
        { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Aplicación en situaciones reales', color: 'yellow' },
        { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz formativo y síntesis', color: 'teal' }
      ],
      dileIntro: `Hoy desarrollaremos la clase ${genLesson.num} de ${oa.asignatura}: "${genLesson.title}".`,
      dileObjective: genLesson.focoDidactico
    },

    situation: {
      dilePrompt: genLesson.situacionIntro.dialogo,
      expectedAnswer: genLesson.situacionIntro.respEsperada,
      socraticHint: genLesson.situacionIntro.pistaSocratica,
      emotionalTip: genLesson.climaEmocional,
      options: [
        { label: genLesson.situacionIntro.respEsperada, kind: 'correct', feedbackText: '¡Exacto! Esa es la respuesta esperada.' },
        { label: 'Otra respuesta o duda', kind: 'needs_support', feedbackText: genLesson.situacionIntro.pistaSocratica }
      ]
    },

    reference: {
      dilePrompt: genLesson.situacionIntro.pregunta,
      question: genLesson.situacionIntro.pregunta,
      expectedAnswer: genLesson.situacionIntro.respEsperada,
      socraticHint: genLesson.situacionIntro.pistaSocratica,
      feedbackSuccess: 'Muy bien. Observaste el detalle central con precisión.',
      feedbackSupport: genLesson.situacionIntro.pistaSocratica
    },

    hook: {
      dileIntro: genLesson.paso2_hook.dileAntes,
      hazInstruction: 'Observa y reflexiona con las escenas del desafío visual.',
      videoSrc: '',
      posterSrc: '',
      dileAfterVideo: genLesson.paso2_hook.dileDespues
    },

    conversation: {
      dileIntro: 'Conversemos en base a las pistas y evidencias observadas.',
      emotionalTip: 'Valora la justificación por sobre la rapidez.',
      items: conversationItems.length > 0 ? conversationItems : [
        {
          question: genLesson.situacionIntro.pregunta,
          expectedAnswer: genLesson.situacionIntro.respEsperada,
          socraticGuidance: genLesson.situacionIntro.pistaSocratica,
          studentVisualPrompt: genLesson.focoDidactico,
          supportHelp: genLesson.situacionIntro.pistaSocratica
        }
      ]
    },

    formalization: {
      dileIntro: genLesson.paso4_explicativo.dileAntes,
      hazInstruction: 'Revisemos la explicación formal y la idea clave.',
      videoSrc: '',
      graphicPoster: ''
    },

    idea: {
      dilePrompt: `Fijemos la idea clave: ${genLesson.paso4_explicativo.ideaClave || genLesson.paso6_resumen.ideaClave}`,
      checkQuestion: genLesson.paso6_resumen.sintesis || '¿Cuál es la conclusión principal de esta sesión?',
      expectedAnswer: genLesson.paso4_explicativo.ideaClave || genLesson.focoDidactico,
      socraticHint: 'Pídele explicar la idea con sus propias palabras antes de avanzar.',
      feedbackSuccess: '¡Excelente! Has comprendido la idea clave de la lección.',
      feedbackSupport: 'Revisemos juntos la idea clave para asegurar el concepto.'
    },

    practice: {
      dileIntro: 'Ahora practiquemos juntos con situaciones aplicadas.',
      items: practiceItems.length > 0 ? practiceItems : [
        {
          contextName: 'Aplicación Directa',
          prompt: genLesson.focoDidactico,
          expectedAnswer: genLesson.situacionIntro.respEsperada,
          socraticTip: genLesson.situacionIntro.pistaSocratica,
          supportHelp: genLesson.situacionIntro.pistaSocratica
        }
      ]
    },

    quiz: {
      dileIntro: 'Ahora responderás tres preguntas sobre lo que aprendimos hoy de forma autónoma.',
      hazInstruction: 'Permite que el estudiante responda con calma en su pantalla sin recibir ayuda.',
      passScoreMin: 2,
      questions: quizQuestions.length > 0 ? quizQuestions : [
        {
          id: 'q_1',
          q: genLesson.situacionIntro.pregunta,
          options: [genLesson.situacionIntro.respEsperada, 'Opción alternativa 1', 'Opción alternativa 2'],
          correct: genLesson.situacionIntro.respEsperada,
          concept: genLesson.title,
          explain: genLesson.paso4_explicativo.ideaClave
        }
      ]
    },

    recovery: {
      dileIntroError: 'Vamos a revisar las ideas clave con calma. El error nos muestra dónde poner más atención.',
      dilePass: '¡Gran trabajo! Has consolidado los aprendizajes requeridos.',
      dileNeedsMorePractice: 'Completaste la sesión con perseverancia. Estas ideas se afianzarán en la próxima clase.',
      items: recoveryQuestions
    },

    closing: {
      dileQuestion: genLesson.paso8_cierre.preguntaSintesis,
      metacognitionQuestion: genLesson.paso8_cierre.metacognicion,
      transferQuestion: 'Transferencia: ¿Dónde podrás aplicar o notar esto durante la semana?',
      evaluationCriteria: `Criterio de logro: El estudiante demuestra comprensión de ${genLesson.focoDidactico}.`,
      supportRefocus: genLesson.paso4_explicativo.ideaClave,
      dileFinalCelebration: genLesson.paso8_cierre.celebracion,
      dilePausedSave: 'Tu progreso de hoy ha quedado guardado exitosamente.'
    }
  };
}