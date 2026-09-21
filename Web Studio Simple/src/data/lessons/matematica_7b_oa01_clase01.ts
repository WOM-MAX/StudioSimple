import { LessonData } from '../../types/lesson';

export const MATEMATICA_7B_OA01_CLASE01: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Matemática',
    oaCode: 'OA 1',
    oaTitle: 'Números enteros (Z)',
    lessonNumber: 1,
    totalLessonsInOa: 5,
    lessonTitle: 'Posiciones respecto de un punto de referencia',
    durationMinutes: 30,
    nextLessonTitle: 'La recta numérica y orden en Z'
  },

  // Paso 1: Portada y Preparación
  prep: {
    adultObjective: 'Guiar al estudiante para que comprenda que los números enteros pueden representar la ubicación de algo en relación con un punto de referencia, que distinga entre posición y movimiento y que explique al menos una idea con sus propias palabras.',
    routeToday: 'Introducción → conexión inicial → video introductorio → conversación guiada → video explicativo → práctica → comparación → estrategia para pensar → resumen → miniquiz → refuerzo si es necesario → cierre.',
    mentorReminder: 'Sigue las indicaciones en pantalla paso a paso. Lee únicamente los recuadros DILE en voz alta y espera siempre la respuesta.',
    reminders: [
      'Sigue el orden indicado.',
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'No leas los recuadros SOLO PARA TI ni AYUDA DE LECTURA.',
      'Haz cada pregunta y espera la respuesta antes de seleccionar una opción.',
      'Considera correcta una respuesta si expresa la idea matemática, aunque use palabras distintas.',
      'Si el estudiante necesita apoyo, usa únicamente la ayuda que aparecerá.',
      'Si propone otra explicación o no está de acuerdo, escúchalo completo y valora su razonamiento antes de guiarlo.'
    ]
  },

  // Paso 2: Ruta y Situación Inicial
  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Números', subtitle: 'Enteros, fracciones, decimales y porcentajes', color: 'navy' },
      { id: 'b2', number: '02', title: 'Álgebra', subtitle: 'Patrones, lenguaje algebraico y ecuaciones', color: 'orange' },
      { id: 'b3', number: '03', title: 'Geometría', subtitle: 'Círculo, perímetro, área y vectores', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Probabilidades', subtitle: 'Tablas de frecuencia, gráficos y azar', color: 'teal' }
    ],
    dileIntro: 'Hoy comenzamos la ruta de Matemática de 7° básico. Durante las próximas clases conoceremos distintos temas, los practicaremos paso a paso y comprobaremos lo que vamos aprendiendo. En la clase de hoy comenzaremos con los números enteros.',
    dileObjective: 'En esta primera clase aprenderemos a reconocer posiciones usando el cero como punto de referencia.'
  },

  situation: {
    dilePrompt: 'Observa este termómetro. El cero es nuestro punto de referencia. Si la temperatura está tres grados sobre cero, escribimos +3 °C. ¿Qué número usaríamos para representar una temperatura de tres grados bajo cero?',
    expectedAnswer: '−3 °C (o menos 3 grados)',
    socraticHint: 'Si duda o dice 3: Pregúntale con curiosidad: "Si a 3 sobre cero le ponemos +3, ¿cómo podemos diferenciar en el papel que está hacia el otro lado del cero?"',
    emotionalTip: 'Valora el intento antes de evaluar el resultado: "Me gusta que estés observando con atención el termómetro".',
    options: [
      {
        label: 'Respondió −3 °C',
        kind: 'correct',
        feedbackText: 'Exacto. Reconociste el signo negativo para señalar que la temperatura está bajo el punto de referencia.'
      },
      {
        label: 'Respondió 3 °C (sin signo)',
        kind: 'needs_support',
        feedbackText: 'Está muy bien tu intuición. Mira el 0: si decimos solo 3, podríamos confundirlo con 3 sobre cero. ¿Qué signo necesitamos para mostrar que está debajo?'
      },
      {
        label: 'No sabe / Silencio',
        kind: 'no_answer',
        feedbackText: 'Vamos paso a paso juntos. Si +3 representa tres grados sobre cero, el mismo número bajo cero se escribe con el signo contrario (−). ¿Cómo se leería?'
      },
      {
        label: 'Otra respuesta',
        kind: 'other',
        feedbackText: 'Gracias por tu respuesta. Volvamos a mirar el termómetro: ¿este punto está sobre el 0 o bajo el 0?'
      }
    ]
  },

  reference: {
    dilePrompt: 'En este termómetro usamos el 0 como punto de referencia. Las temperaturas sobre 0 se representan con números positivos; las que están bajo 0, con números negativos.',
    question: 'Entonces, ¿qué representa exactamente −3 °C en este contexto?',
    expectedAnswer: 'Una temperatura de 3 grados bajo cero.',
    socraticHint: 'Diálogo Socrático: Si solo dice "frío" o "menos 3", pídele que mencione el punto cero: "¿Está más arriba o más abajo del punto cero?"',
    feedbackSuccess: 'Muy bien. Usaste el cero como referencia y reconociste una posición bajo cero.',
    feedbackSupport: 'El 3 indica cuántos grados; el signo menos (−) indica que están por debajo del punto de referencia cero.'
  },

  // Paso 3: Video Gancho Multimedia
  hook: {
    dileIntro: 'Antes de comenzar a ver el video, observa con mucha atención dónde inicia el submarino y fíjate bien en cuánto baja y cuánto sube.',
    hazInstruction: 'Presiona el botón "Reproducir video" para activar la animación en la pantalla del estudiante.',
    videoSrc: 'https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/110-7/MAT/MAT_OA01_L01_Motivacional.mp4',
    posterSrc: '/visuals/desafio-submarino.png',
    dileAfterVideo: 'Excelente observación. Ahora conversaremos sobre lo que acabamos de ver en el recorrido del submarino.'
  },

  // Paso 4: Conversación Guiada (4 preguntas socráticas)
  conversation: {
    dileIntro: 'Ahora vamos a conversar sobre lo que acabamos de ver en el video. Te haré algunas preguntas para que pensemos juntos en el recorrido del submarino.',
    emotionalTip: 'Recuerda: Dale tiempo para formular su respuesta. El silencio de unos segundos significa que su cerebro está procesando la imagen mental.',
    items: [
      {
        question: '¿Dónde está el cero en esta historia del submarino?',
        expectedAnswer: 'En la superficie del mar.',
        socraticGuidance: 'Guía Socrática: Si dice "en el agua", pregúntale: "¿Desde qué nivel exacto comenzamos a contar hacia abajo para medir la profundidad?"',
        studentVisualPrompt: 'Superficie del mar = 0 metros',
        supportHelp: 'Busca el lugar desde donde medimos la profundidad. ¿Qué límite separa estar sobre el mar de estar bajo el agua?'
      },
      {
        question: '¿Qué significa que el submarino esté a −20 metros?',
        expectedAnswer: 'Indica una posición: está 20 metros bajo la superficie del mar.',
        socraticGuidance: 'Guía Socrática: Pregúntale: "¿La frase nos dice el lugar exacto donde se encuentra detenido o nos dice que se está moviendo?"',
        studentVisualPrompt: '−20 m = Posición bajo la superficie',
        supportHelp: 'Fíjate en el número: el 20 dice la distancia y el signo menos (−) indica que está bajo la superficie (el cero).'
      },
      {
        question: '“Bajar 15 metros”, ¿indica una posición o un movimiento?',
        expectedAnswer: 'Un movimiento (una acción o cambio de lugar).',
        socraticGuidance: 'Guía Socrática: Resalta el verbo: "La palabra bajar, ¿indica quedarse en un punto fijo o describe una acción de trasladarse?"',
        studentVisualPrompt: 'Bajar 15 m = Movimiento (cambio de lugar)',
        supportHelp: 'Fíjate en el verbo "bajar". Describe una acción o desplazamiento, no un lugar estático.'
      },
      {
        question: '“Subir 8 metros”, ¿indica una posición o un movimiento?',
        expectedAnswer: 'Un movimiento.',
        socraticGuidance: 'Guía Socrática: Pídele que compare: "¿Subir es dónde te quedas o cómo te trasladas?"',
        studentVisualPrompt: 'Subir 8 m = Movimiento (desplazamiento hacia arriba)',
        supportHelp: 'Fíjate en la acción "subir": describe cómo cambia de lugar el submarino.'
      }
    ]
  },

  // Paso 5: Explicación e Idea Clave
  formalization: {
    dileIntro: 'Ya descubrimos que una cosa es dónde está el submarino y otra distinta es cómo se mueve. Ahora veremos cómo las matemáticas representan formalmente estas ideas usando números enteros.',
    hazInstruction: 'Reproduce la explicación visual para formalizar la diferencia entre Posición y Movimiento.',
    videoSrc: 'https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/110-7/MAT/MAT_OA01_L01_Concepto.mp4',
    graphicPoster: '/visuals/posicion-movimiento.png'
  },

  idea: {
    dilePrompt: 'Un número entero puede representar una posición respecto de un punto de referencia. El cero marca ese punto. Una posición indica dónde está algo; un movimiento indica cómo cambia de lugar.',
    checkQuestion: 'El ascensor está en el piso −2 y después baja 3 pisos. ¿Cuál parte indica una posición y cuál indica un movimiento?',
    expectedAnswer: 'Estar en el piso −2 = Posición; Bajar 3 pisos = Movimiento.',
    socraticHint: 'Guía Socrática: Si se confunde, ayúdale con las palabras clave: "¿Qué parte tiene la palabra "está en" (lugar) y cuál tiene el verbo de acción "baja"?"',
    feedbackSuccess: 'Exacto: −2 señala el lugar donde se ubica; bajar 3 pisos describe cómo se desplaza.',
    feedbackSupport: 'Mira las palabras: "Está en el piso −2" dice la ubicación (posición). "Baja 3 pisos" es la acción (movimiento).'
  },

  // Paso 6: Práctica Conjunta (3 situaciones contextuales)
  practice: {
    dileIntro: 'Ahora aplicaremos lo que aprendimos en tres situaciones diferentes de la vida cotidiana.',
    items: [
      {
        contextName: 'Temperatura en la montaña',
        prompt: 'El termómetro marca 4 °C bajo cero. ¿Qué número entero representa esta temperatura?',
        expectedAnswer: '−4 °C',
        socraticTip: 'Pídele ubicar el cero. Como está por debajo, debe anteponer el signo menos.',
        supportHelp: 'Ubica primero el 0 como punto de referencia. Como está bajo ese punto, usamos el signo negativo (−4 °C).'
      },
      {
        contextName: 'Edificio y Estacionamientos',
        prompt: 'Un ascensor baja 5 pisos. ¿Esta frase describe una posición o un movimiento?',
        expectedAnswer: 'Un movimiento.',
        socraticTip: 'Enfoca la atención en la acción de descender.',
        supportHelp: 'Fíjate en el verbo "baja": describe cómo cambia de lugar el ascensor, por lo tanto es un movimiento.'
      },
      {
        contextName: 'Campamento en la colina',
        prompt: 'Un campamento está a 120 metros bajo el mirador usado como referencia. ¿Qué número entero representa la ubicación del campamento?',
        expectedAnswer: '−120 m',
        socraticTip: 'El mirador es el 0. Todo lo que esté por debajo se rotula con signo negativo.',
        supportHelp: 'El mirador es nuestro punto 0. Al estar 120 metros por debajo del punto de referencia, se representa como −120 m.'
      }
    ]
  },

  // Paso 7: Miniquiz y Recuperación
  quiz: {
    dileIntro: 'Ahora responderás tres preguntas sobre lo que aprendimos hoy de forma autónoma. Cuando termines, revisaremos juntos tus respuestas.',
    hazInstruction: 'Permite que tu hijo responda sin ayuda en su pantalla. Al enviar las respuestas, recibirás los resultados y las indicaciones de revisión.',
    passScoreMin: 2,
    questions: [
      {
        id: 'q1',
        q: 'Un buzo está a 7 metros bajo la superficie del agua. ¿Qué número entero representa su posición?',
        options: ['−7', '+7', '7 sin signo'],
        correct: '−7',
        concept: 'Posición bajo el punto de referencia cero',
        explain: 'La superficie es el punto 0. Como está bajo la superficie, se representa con signo negativo: −7.'
      },
      {
        id: 'q2',
        q: 'La temperatura en Punta Arenas baja 6 grados en la noche. ¿Esta frase describe una posición o un movimiento?',
        options: ['Posición', 'Movimiento'],
        correct: 'Movimiento',
        concept: 'Diferenciación entre posición y movimiento',
        explain: 'La palabra "baja" describe una acción y un cambio en la temperatura, no un punto fijo.'
      },
      {
        id: 'q3',
        q: 'En una cuenta bancaria aparece un saldo de −$8.000. ¿Qué indica el signo negativo?',
        options: [
          'Que el saldo está bajo el cero (deuda o saldo en contra)',
          'Que el saldo está sobre el cero (dinero a favor)',
          'Que el dinero se está transfiriendo en este momento'
        ],
        correct: 'Que el saldo está bajo el cero (deuda o saldo en contra)',
        concept: 'Significado del signo negativo en contextos reales',
        explain: 'El cero es tener $0. Un saldo con signo negativo representa una cantidad por debajo del cero (deuda).'
      }
    ]
  },

  recovery: {
    dileIntroError: 'Vamos a revisar estas ideas juntos con calma. Equivocarse es completamente natural y nos ayuda a descubrir qué conceptos necesitan una pista extra.',
    dilePass: '¡Excelente trabajo! Revisaste las ideas necesarias y pudiste aplicarlas con éxito en situaciones nuevas.',
    dileNeedsMorePractice: 'Has trabajado con mucha atención hoy. Estas ideas se consolidarán con un poco más de práctica en la próxima sesión.',
    items: [
      {
        id: 'rec1',
        title: 'Posición respecto del cero',
        concept: 'Posición bajo el punto de referencia',
        explain: 'El nivel de referencia (la calle, la superficie o el saldo $0) se representa con el número 0. Cualquier posición ubicada por debajo de esa referencia se escribe con un número negativo.',
        socraticHint: 'Pregúntale: "¿El túnel está arriba o abajo del nivel de la calle?"',
        q: 'Un túnel del Metro está a 15 metros bajo el nivel de la calle. ¿Qué número entero representa su posición?',
        options: ['−15', '+15'],
        correct: '−15'
      },
      {
        id: 'rec2',
        title: 'Posición versus Movimiento',
        concept: 'Diferenciación conceptual',
        explain: 'Una posición indica dónde está un objeto detenido en un momento exacto (ej. "está en el piso 2"). Un movimiento describe una acción o traslado (ej. "sube 4 metros" o "desciende").',
        socraticHint: 'Pregúntale: ¿La palabra "sube" indica dónde está quieto o describe que se está moviendo?',
        q: 'Un dron sube 20 metros en el aire. ¿Esta frase describe una posición o un movimiento?',
        options: ['Posición', 'Movimiento'],
        correct: 'Movimiento'
      },
      {
        id: 'rec3',
        title: 'Significado del signo negativo',
        concept: 'Interpretación del contexto',
        explain: 'El signo negativo (−) señala que la cantidad se encuentra al lado contrario o por debajo del punto que fijamos como punto cero.',
        socraticHint: 'Pregúntale: "¿Una temperatura de −5 °C es más caliente o más fría que el punto 0 °C?"',
        q: 'Si el termómetro marca −5 °C, significa que la temperatura está...',
        options: ['5 grados bajo cero', '5 grados sobre cero'],
        correct: '5 grados bajo cero'
      }
    ]
  },

  // Paso 8: Cierre Oral y Metacognición
  closing: {
    dileQuestion: 'Con tus propias palabras: ¿Para qué sirven el número cero y los signos positivo y negativo cuando queremos representar una situación de la vida real?',
    metacognitionQuestion: 'Metacognición: ¿Qué imagen mental o truco te sirvió hoy para no confundir una posición con un movimiento?',
    transferQuestion: 'Transferencia: ¿Dónde crees que verás números positivos y negativos fuera de esta clase esta semana?',
    evaluationCriteria: 'La respuesta está lograda si expresa con sus palabras que: 1) El cero funciona como punto de referencia (origen); 2) Los signos indican de qué lado o respecto a qué sentido se encuentra un valor (sobre/bajo, a favor/en contra).',
    supportRefocus: 'Vuelve al termómetro o al ascensor: "¿Qué representaba el 0 en el termómetro? ¿Cómo sabíamos si hacía frío bajo cero o calor sobre cero?"',
    dileFinalCelebration: '¡Excelente! Terminamos la clase de hoy con éxito. En la próxima clase construiremos la recta numérica para saber exactamente dónde se ubica cada número entero y aprender a compararlos.',
    dilePausedSave: 'Hoy trabajamos varias ideas importantes. Tu avance ha quedado completamente guardado. La próxima sesión retomaremos el refuerzo paso a paso.'
  }
};
