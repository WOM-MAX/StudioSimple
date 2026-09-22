import {
  LessonData as PlayerLessonData,
  GuidedItem,
  QuizQuestion,
  RecoveryItem
} from '../types/lesson';
import { LessonData as GeneratorLessonData } from './lesson-generator';

export function adaptGeneratorLessonToPlayer(
  genLesson: GeneratorLessonData,
  oa: { curso: string; asignatura: string; oa: string; eje?: string; titulo?: string },
  totalLessons: number
): PlayerLessonData {
  const preQuestions: GuidedItem[] = (genLesson.paso3_recorrido || []).map((item) => ({
    context: item.context || 'Recorrido',
    question: item.question,
    expected: item.expected,
    success: item.success || '¡Muy bien!',
    support: item.support || 'Recuerda observar los detalles principales.',
    reveal: item.reveal || item.expected,
    studentReveal: item.studentReveal || item.expected
  }));

  const postQuestions: GuidedItem[] = (genLesson.paso3_recorrido || []).slice(0, 2).map((item) => ({
    context: item.context || 'Comprobación',
    question: item.question,
    expected: item.expected,
    success: item.success || '¡Correcto!',
    support: item.support || 'Observa la dirección y el cambio.',
    reveal: item.reveal || item.expected,
    studentReveal: item.studentReveal || item.expected
  }));

  const practiceItems: GuidedItem[] = (genLesson.paso5_practica || []).map((item) => ({
    context: item.context || 'Situación Aplicada',
    question: item.question,
    expected: item.expected,
    success: item.success || '¡Muy bien!',
    support: item.support || 'Piensa en el punto de referencia y en el contexto.',
    reveal: item.reveal || item.expected,
    studentReveal: item.studentReveal || item.expected
  }));

  const quizQuestions: QuizQuestion[] = (genLesson.paso7_miniquiz || []).map((q, idx) => ({
    id: `q_${idx + 1}`,
    q: q.q,
    options: q.options,
    correct: q.correct,
    fixExplain: q.fixExplain || 'Revisa la idea central con tu mentor.',
    concept: genLesson.title,
    explain: q.fixExplain
  }));

  const recoveryItems: RecoveryItem[] = (genLesson.paso7b_recuperacion || []).map((r, idx) => ({
    title: r.title || `Refuerzo ${idx + 1}`,
    explain: r.explain || 'Revisemos esta idea paso a paso.',
    q: r.q,
    options: r.options,
    correct: r.correct,
    correctText: r.correctText || '¡Eso es! Respuesta correcta.',
    fixText: r.fixText || `La respuesta correcta es ${r.correct}.`
  }));

  const subjectColorMap: Record<string, 'navy' | 'orange' | 'yellow' | 'teal'> = {
    'Matemática': 'navy',
    'Lengua y Literatura': 'orange',
    'Ciencias Naturales': 'teal',
    'Historia, Geografía y Ciencias Sociales': 'yellow',
    'Inglés': 'teal'
  };

  const activeColor = subjectColorMap[oa.asignatura] || 'navy';

  const isMat7bOa01L01 =
    Boolean(oa.oa && (oa.oa.includes('1') || oa.oa.includes('OA01') || oa.oa.includes('OA 1'))) &&
    Boolean(oa.asignatura && oa.asignatura.toLowerCase().includes('mat')) &&
    genLesson.num === 1;

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
      reminders: [
        'Sigue el orden indicado.',
        'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
        'No leas los recuadros SOLO PARA TI ni AYUDA DE LECTURA.',
        'Haz cada pregunta y espera la respuesta antes de seleccionar una opción.',
        'Considera correcta una respuesta si expresa la idea matemática, aunque use palabras distintas.',
        'Si el estudiante necesita apoyo, usa únicamente la ayuda que aparecerá.',
        'Si propone otra explicación o no está de acuerdo, escúchalo completo y valora su razonamiento antes de guiarlo.'
      ],
      emotionalTip: genLesson.climaEmocional
    },

    route: {
      blocks: [
        { id: 'b1', number: '01', title: oa.asignatura, subtitle: genLesson.title, color: activeColor },
        { id: 'b2', number: '02', title: 'Exploración', subtitle: 'Gancho y Recorrido Guiado', color: 'orange' },
        { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Aplicación en situaciones reales', color: 'yellow' },
        { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz formativo y síntesis', color: 'teal' }
      ],
      dileIntro: `Hoy comenzaremos la clase ${genLesson.num} de ${oa.asignatura}: "${genLesson.title}".`,
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
      videoSrc: (genLesson.paso2_hook as any).videoUrl || (genLesson.paso2_hook as any).videoSrc || (isMat7bOa01L01 ? 'https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/110-7-MAT-OA01-L01-MOTIVACIONAL_V9_LEGIBLE.mp4' : ''),
      posterSrc: '',
      dileAfterVideo: genLesson.paso2_hook.dileDespues
    },

    preQuestions: preQuestions.length > 0 ? preQuestions : [
      {
        context: 'Situación Inicial',
        question: genLesson.situacionIntro.pregunta,
        expected: genLesson.situacionIntro.respEsperada,
        success: '¡Excelente respuesta!',
        support: genLesson.situacionIntro.pistaSocratica,
        reveal: genLesson.situacionIntro.respEsperada,
        studentReveal: genLesson.situacionIntro.respEsperada
      }
    ],

    formalization: {
      dileIntro: genLesson.paso4_explicativo.dileAntes,
      hazInstruction: 'Revisemos la explicación formal y la idea clave.',
      videoSrc: (genLesson.paso4_explicativo as any).videoUrl || (genLesson.paso4_explicativo as any).videoSrc || (isMat7bOa01L01 ? 'https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/110-7/MAT/MAT_OA01_L01_Concepto.mp4' : ''),
      graphicPoster: ''
    },

    postQuestions: postQuestions.length > 0 ? postQuestions : [
      {
        context: 'Concepto',
        question: genLesson.paso4_explicativo.ideaClave || genLesson.situacionIntro.pregunta,
        expected: genLesson.situacionIntro.respEsperada,
        success: '¡Muy bien!',
        support: 'Recuerda relacionar la posición con el movimiento.',
        reveal: genLesson.situacionIntro.respEsperada,
        studentReveal: genLesson.situacionIntro.respEsperada
      }
    ],

    practice: practiceItems.length > 0 ? practiceItems : [
      {
        context: 'Aplicación Directa',
        question: genLesson.focoDidactico,
        expected: genLesson.situacionIntro.respEsperada,
        success: '¡Muy bien!',
        support: genLesson.situacionIntro.pistaSocratica,
        reveal: genLesson.situacionIntro.respEsperada,
        studentReveal: genLesson.situacionIntro.respEsperada
      }
    ],

    mini: quizQuestions.length > 0 ? quizQuestions : [
      {
        id: 'q_1',
        q: genLesson.situacionIntro.pregunta,
        options: [genLesson.situacionIntro.respEsperada, 'Opción alternativa 1', 'Opción alternativa 2'],
        correct: genLesson.situacionIntro.respEsperada,
        fixExplain: genLesson.paso4_explicativo.ideaClave || 'Revisa la idea central con tu mentor.'
      }
    ],

    recovery: recoveryItems.length > 0 ? recoveryItems : [
      {
        title: 'Idea Central',
        explain: genLesson.paso4_explicativo.ideaClave || 'Comprobemos lo aprendido.',
        q: genLesson.situacionIntro.pregunta,
        options: [genLesson.situacionIntro.respEsperada, 'Opción alternativa'],
        correct: genLesson.situacionIntro.respEsperada,
        correctText: '¡Eso es! Respuesta correcta.',
        fixText: `La respuesta correcta es ${genLesson.situacionIntro.respEsperada}.`
      }
    ],

    summaryIdeas: [
      ['1 · Punto de referencia', 'Identificamos un valor de referencia para comparar.'],
      ['2 · Interpretación del contexto', genLesson.focoDidactico],
      ['3 · Síntesis', genLesson.paso4_explicativo.ideaClave || genLesson.paso6_resumen.ideaClave]
    ]
  };
}