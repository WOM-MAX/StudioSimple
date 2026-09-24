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
      keyQuestions: (genLesson as any).keyQuestions && (genLesson as any).keyQuestions.length > 0
        ? (genLesson as any).keyQuestions
        : [
            { label: 'Exploración inicial', sub: genLesson.title },
            { label: 'Idea clave', sub: genLesson.paso4_explicativo?.ideaClave ? genLesson.paso4_explicativo.ideaClave.slice(0, 60) : 'Concepto central del objetivo' },
            { label: 'Práctica y aplicación', sub: 'Resolución guiada paso a paso' }
          ],
      dileIntro: `Hoy comenzaremos la clase ${genLesson.num} de ${oa.asignatura}: "${genLesson.title}".`,
      dileObjective: genLesson.focoDidactico
    },

    situation: {
      dilePrompt: genLesson.situacionIntro.dialogo,
      expectedAnswer: genLesson.situacionIntro.respEsperada,
      socraticHint: genLesson.situacionIntro.pistaSocratica,
      emotionalTip: genLesson.climaEmocional,
      options: (genLesson.situacionIntro as any).options && (genLesson.situacionIntro as any).options.length > 0
        ? (genLesson.situacionIntro as any).options
        : [
            {
              label: genLesson.situacionIntro.respEsperada.toLowerCase().startsWith('una respuesta que')
                ? genLesson.situacionIntro.respEsperada.replace(/^una respuesta que /i, 'Mencionó o reconoció que ').slice(0, 95)
                : (genLesson.situacionIntro.respEsperada.toLowerCase().startsWith('an answer')
                  ? genLesson.situacionIntro.respEsperada.replace(/^an answer identifying /i, 'Identified ').slice(0, 95)
                  : `Respondió correctamente: ${genLesson.situacionIntro.respEsperada.length > 80 ? genLesson.situacionIntro.respEsperada.slice(0, 77) + '...' : genLesson.situacionIntro.respEsperada}`),
              kind: 'correct',
              feedbackText: '¡Exacto! Comprendió la idea central esperada.'
            },
            {
              label: 'Necesita apoyo o dio otra respuesta',
              kind: 'needs_support',
              feedbackText: genLesson.situacionIntro.pistaSocratica
            }
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
      posterSrc: (genLesson.paso2_hook as any).posterUrl || (genLesson.paso2_hook as any).posterSrc || (genLesson.paso2_hook.slides?.[0]?.imageUrl || ''),
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
      graphicPoster: (genLesson.paso4_explicativo as any).posterUrl || (genLesson.paso4_explicativo as any).graphicPoster || (genLesson.paso4_explicativo.slides?.[0]?.imageUrl || '')
    },

    postQuestions: postQuestions.length > 0 ? postQuestions : [
      {
        context: 'Concepto',
        question: genLesson.paso4_explicativo.ideaClave || genLesson.situacionIntro.pregunta,
        expected: genLesson.situacionIntro.respEsperada,
        success: '¡Muy bien!',
        support: 'Recuerda relacionar la idea central con la evidencia observada.',
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

    summaryIdeas: isMat7bOa01L01 ? [
      ['1 · Punto de referencia', 'En cada situación identificamos un punto o valor de referencia y lo representamos con el número cero. Desde ese punto podemos determinar dónde se encuentra algo.'],
      ['2 · Números positivos y negativos', 'En los ejemplos de temperatura y profundidad, los valores sobre el punto de referencia se representaron con números positivos y los valores bajo ese punto, con números negativos. En una cuenta bancaria, positivo indica dinero disponible y negativo indica una deuda. El significado se interpreta según el contexto.'],
      ['3 · Posición y movimiento', 'Una posición indica dónde se encuentra algo respecto del punto de referencia. Por su parte, un movimiento indica cómo ese objeto o valor cambia de lugar, hacia dónde se mueve y qué distancia recorre.']
    ] : [
      ['1 · Concepto central', genLesson.situacionIntro.pregunta ? 'Identificamos los elementos y el punto de partida del análisis.' : 'Reconocemos los elementos iniciales del tema.'],
      ['2 · Interpretación del contexto', genLesson.focoDidactico],
      ['3 · Síntesis formal', genLesson.paso4_explicativo.ideaClave || (genLesson.paso6_resumen && genLesson.paso6_resumen.ideaClave) || 'Aplicamos lo aprendido con precisión y criterio.']
    ],

    interactive: isMat7bOa01L01 ? {
      type: 'thermo',
      title: 'El cero como punto de referencia'
    } : ((genLesson as any).interactive || resolveInteractiveForDiscipline(oa.asignatura, genLesson.num)),

    summaryText: isMat7bOa01L01
      ? 'En este recorrido usamos la superficie del mar como punto de referencia y la representamos con el número cero. Una posición indica dónde se encuentra algo respecto de ese punto; por eso, menos veinte metros representa la posición inicial del submarino. Un movimiento indica cómo cambia de lugar, hacia dónde se mueve y qué distancia recorre; por eso, bajar quince metros y subir ocho metros representan movimientos.'
      : (genLesson.paso6_resumen?.sintesis || `En esta sesión revisamos las ideas clave de ${genLesson.title}. Identificamos el concepto principal y su aplicación práctica paso a paso.`),

    reasoning: isMat7bOa01L01 ? {
      title: 'Comparemos dos situaciones',
      dileIntro: 'Antes de resumir, comparemos dos situaciones. No necesitas repetir una frase exacta: lo importante es que expliques la idea con tus propias palabras.',
      question: 'En una temperatura de −4 °C y en un saldo de −$4.000 aparece el signo negativo. ¿Significa lo mismo en las dos situaciones? Explica qué representa en cada una.',
      expectedAnswer: 'En −4 °C el signo indica una temperatura bajo cero y en −$4.000 indica una deuda.',
      context1: { label: 'TEMPERATURA', value: '−4 °C', desc: 'Cuatro grados bajo cero' },
      context2: { label: 'CUENTA BANCARIA', value: '−$4.000', desc: 'Un saldo negativo' },
      successFeedback: '¡Excelente razonamiento! Reconociste que el mismo signo puede comunicar ideas diferentes según la situación.',
      supportFeedback: 'Pensemos en cada situación por separado. En el termómetro, el cero separa temperaturas sobre y bajo cero. En la cuenta, el cero separa dinero disponible y deuda. Con esta pista, explica qué indica el signo negativo en cada caso.',
      revealText: 'No significa exactamente lo mismo. En −4 °C indica una temperatura de cuatro grados bajo cero. En −$4.000 indica una deuda de cuatro mil pesos. El signo negativo se interpreta según el contexto.'
    } : {
      title: 'Comparemos dos situaciones',
      dileIntro: 'Antes de resumir, comparemos dos situaciones. No necesitas repetir una frase exacta: lo importante es que expliques la idea con tus propias palabras.',
      question: `Al comparar dos situaciones de ${genLesson.title}, ¿cómo influye el contexto en la interpretación de los datos?`,
      expectedAnswer: 'El significado o resultado depende de las condiciones del contexto y del propósito de la situación.',
      context1: { label: 'SITUACIÓN 1', value: practiceItems[0]?.context || 'Primera situación', desc: practiceItems[0]?.question || 'Primer caso práctico' },
      context2: { label: 'SITUACIÓN 2', value: practiceItems[1]?.context || 'Segunda situación', desc: practiceItems[1]?.question || 'Segundo caso práctico' },
      successFeedback: '¡Excelente razonamiento! Reconociste que el contexto orienta la interpretación de los datos.',
      supportFeedback: 'Observa cada situación por separado y explica qué elementos las distinguen.',
      revealText: 'Cada situación tiene un propósito particular y los datos se interpretan según las condiciones del problema.'
    },

    challenge: isMat7bOa01L01 ? {
      title: 'Desafío breve: Posición y movimiento',
      question: 'Una temperatura está en −2 °C y luego sube cinco grados. ¿Qué parte representa una posición y qué parte representa un movimiento? Explica cómo lo sabes.',
      expectedAnswer: '−2 °C representa la posición inicial; “sube cinco grados” representa el movimiento.',
      item1: { label: '−2 °C', tag: 'Posición inicial' },
      item2: { label: 'sube 5 grados', tag: 'Movimiento' },
      successFeedback: '¡Muy bien! −2 °C indica la posición inicial de la temperatura respecto del cero; “sube cinco grados” indica el movimiento o cambio.',
      supportFeedback: 'Revisémoslo juntos. −2 °C dice dónde está la temperatura al comenzar, por eso representa una posición. “Sube cinco grados” dice cómo cambia, por eso representa un movimiento.'
    } : {
      title: `Desafío breve: ${genLesson.title}`,
      question: `En ${oa.asignatura}, ¿qué diferencia observas entre identificar los datos y aplicar el procedimiento? Explica tu razonamiento.`,
      expectedAnswer: 'Identificar los datos determina el punto de partida; aplicar el procedimiento permite construir la respuesta.',
      item1: { label: 'Datos iniciales', tag: 'Punto de partida' },
      item2: { label: 'Procedimiento', tag: 'Aplicación' },
      successFeedback: '¡Muy bien! Distinguiste claramente los momentos del análisis.',
      supportFeedback: 'Revisémoslo juntos: primero identificamos la información disponible y luego aplicamos el método correspondiente.'
    },

    strategy: isMat7bOa01L01 ? {
      title: 'Cómo analizar una situación',
      dileIntro: 'Cuando analices una situación con números enteros, puedes seguir tres pasos. Primero, identifica el punto de referencia. Luego, observa qué indica el signo en ese contexto. Finalmente, pregúntate si la información dice dónde se encuentra algo o cómo cambia.',
      steps: [
        { number: 1, title: 'Identifica', desc: '¿Cuál es el punto de referencia?' },
        { number: 2, title: 'Interpreta', desc: '¿Qué indica el signo en este contexto?' },
        { number: 3, title: 'Distingue', desc: '¿Dice dónde se encuentra algo o cómo cambia?' }
      ]
    } : {
      title: 'Cómo analizar una situación',
      dileIntro: `Cuando enfrentes un problema en ${oa.asignatura}, puedes seguir estos tres pasos clave:`,
      steps: [
        { number: 1, title: 'Identifica', desc: '¿Cuáles son los datos clave y cuál es la pregunta central?' },
        { number: 2, title: 'Aplica', desc: '¿Qué regla o método disciplinar corresponde utilizar?' },
        { number: 3, title: 'Comprueba', desc: '¿La conclusión o resultado responde con coherencia al problema?' }
      ]
    },

    closure: isMat7bOa01L01 ? {
      congratulations: '¡Felicitaciones! Hoy aprendiste que el cero puede funcionar como punto de referencia, que los signos positivo y negativo se interpretan de acuerdo con cada situación, y que una posición indica dónde se encuentra algo mientras un movimiento indica cómo cambia de lugar.',
      nextClassPreview: 'En la próxima clase ubicaremos números enteros en la recta numérica para saber dónde está cada uno y compararlos.'
    } : {
      congratulations: `¡Felicitaciones! Hoy completaste con éxito la clase "${genLesson.title}". Has demostrado constancia y rigor en tu aprendizaje.`,
      nextClassPreview: `En la próxima sesión continuaremos profundizando los aprendizajes de ${oa.asignatura}.`
    }
  };
}

function resolveInteractiveForDiscipline(
  asignatura: string,
  lessonNum: number
): { type: 'thermo' | 'number_line' | 'hero_journey' | 'dimensions' | 'timeline' | 'story_arc'; title: string; description?: string } {
  const norm = (asignatura || '').toLowerCase();

  if (norm.includes('mat')) {
    if (lessonNum === 2) {
      return {
        type: 'number_line',
        title: 'La recta numérica y orden en Z',
        description: 'Explora la ubicación de números positivos y negativos respecto del cero.'
      };
    }
    return {
      type: 'thermo',
      title: 'El cero como punto de referencia',
      description: 'Reconoce el cero como origen y punto de referencia.'
    };
  }

  if (norm.includes('len') || norm.includes('liter')) {
    return {
      type: 'hero_journey',
      title: 'Las 6 Etapas del Viaje del Héroe',
      description: 'Organizador gráfico de la estructura narrativa y evolución del personaje.'
    };
  }

  // Historia debe evaluarse antes de ciencias porque "Ciencias Sociales" contiene "ciencias"
  if (norm.includes('hist') || norm.includes('geog') || norm.includes('soc')) {
    return {
      type: 'timeline',
      title: 'Línea de Tiempo Histórica: De la Hominización a la Aldea',
      description: 'Organizador cronológico de la revolución agrícola y el modo de vida.'
    };
  }

  if ((norm.includes('cien') && !norm.includes('soc')) || norm.includes('nat')) {
    return {
      type: 'dimensions',
      title: 'Las 4 Dimensiones de la Sexualidad Humana',
      description: 'Organizador gráfico del modelo integral de desarrollo personal.'
    };
  }

  if (norm.includes('ing') || norm.includes('eng')) {
    return {
      type: 'story_arc',
      title: 'English Narrative Story Arc & Time Connectors',
      description: 'Organizador gráfico secuencial para comprensión lectora.'
    };
  }

  return {
    type: 'number_line',
    title: 'Organizador visual de aprendizaje'
  };
}