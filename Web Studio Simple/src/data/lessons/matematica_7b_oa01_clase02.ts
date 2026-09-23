import { LessonData } from '../../types/lesson';

export const MATEMATICA_7B_OA01_CLASE02: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Matemática',
    oaCode: 'OA 1',
    oaTitle: 'Números enteros',
    lessonNumber: 2,
    totalLessonsInOa: 6,
    lessonTitle: 'La recta numérica y orden en Z',
    durationMinutes: 30,
    nextLessonTitle: 'Valor absoluto y distancias al cero'
  },

  // Paso 1: Portada y Preparación
  prep: {
    adultObjective: 'Acompañar al estudiante a representar números enteros en la recta numérica horizontal y vertical, y a comparar y ordenar números enteros comprendiendo que todo número ubicado a la derecha de otro en la recta numérica horizontal es mayor.',
    routeToday: 'Introducción → conexión inicial → situación problema en la recta → conversación guiada → explicación formal del orden → práctica en tres situaciones → comparación de magnitudes → estrategia para ordenar → resumen → miniquiz formativo → refuerzo si es necesario → cierre.',
    mentorReminder: 'Sigue el orden indicado. Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
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
      { id: 'b1', number: '01', title: 'Números', subtitle: 'Enteros, fracciones y decimales', color: 'navy' },
      { id: 'b2', number: '02', title: 'Álgebra', subtitle: 'Patrones, relaciones y ecuaciones', color: 'orange' },
      { id: 'b3', number: '03', title: 'Geometría', subtitle: 'Formas, medidas y transformaciones', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Datos y azar', subtitle: 'Información, gráficos y probabilidades', color: 'teal' }
    ],
    keyQuestions: [
      { label: 'Ubicación en la recta', sub: 'El cero al centro y signos opuestos' },
      { label: 'Criterio de orden', sub: 'Mayor hacia la derecha' },
      { label: 'Comparar negativos', sub: 'Distancia relativa al cero' }
    ],
    dileIntro: 'Hoy continuamos con nuestra ruta de Matemática de séptimo básico. Avanzamos a la segunda clase de la unidad de números enteros.',
    dileObjective: 'En la clase de hoy aprenderemos a ubicar los números enteros en una recta numérica con el cero en el centro, y a descubrir por qué cualquier número situado más a la derecha siempre es mayor que los que están a su izquierda, incluso cuando comparamos números negativos.'
  },

  situation: {
    dilePrompt: 'Imagina una recta numérica horizontal donde el centro es el número cero. A la derecha avanzan los números positivos: +1, +2, +3... y a la izquierda avanzan los números negativos: −1, −2, −3... Si te ubicas en el número −2 y caminas hacia el número −5, ¿te estás moviendo hacia la izquierda o hacia la derecha?',
    expectedAnswer: 'Hacia la izquierda',
    socraticHint: 'Recuerda que los números negativos se alejan del cero hacia la izquierda: −1, −2, −3, −4, −5...',
    emotionalTip: 'Tómate un momento para visualizar mentalmente la línea antes de responder.',
    options: [
      {
        label: 'Respondió hacia la izquierda',
        kind: 'correct',
        feedbackText: '¡Correcto! Para ir desde −2 hasta −5 nos movemos hacia la izquierda, alejándonos del cero.'
      },
      {
        label: 'Respondió hacia la derecha',
        kind: 'needs_support',
        feedbackText: 'Pensemos en el camino: el cero está en el centro. El −2 está dos pasos a la izquierda del cero. Para llegar a −5 tenemos que avanzar tres pasos más hacia la izquierda. Con esta pista, ¿hacia qué lado nos movemos?'
      },
      {
        label: 'Duda o no sabe',
        kind: 'no_answer',
        feedbackText: 'Vamos paso a paso. En la recta, los números con signo menos van hacia la izquierda. Como 5 es mayor que 2, el −5 está más a la izquierda que el −2. ¿Hacia qué dirección nos desplazamos?'
      }
    ]
  },

  reference: {
    dilePrompt: 'En la recta numérica el número cero actúa como punto de referencia central. Todos los números que están a la derecha del cero son positivos y mayores que cero; todos los que están a su izquierda son negativos y menores que cero.',
    question: 'Dime con tus palabras: ¿qué número divide la recta numérica entre positivos y negativos?',
    expectedAnswer: 'El número cero',
    socraticHint: 'Es el valor que separa las cantidades positivas de las cantidades negativas.',
    feedbackSuccess: '¡Exacto! El cero es el origen y punto de referencia que separa positivos y negativos en la recta.',
    feedbackSupport: 'Observa el centro de la recta: el cero divide los números positivos a la derecha de los negativos a la izquierda.'
  },

  // Paso 3: Video Gancho
  hook: {
    title: 'La recta numérica y el orden de los números',
    dileIntro: 'Hoy nuestros dos exploradores necesitan organizar una serie de registros de temperaturas y alturas en un tablero de navegación. Para no confundirse, trazan una línea recta continua. Mientras observas la escena, fíjate en tres cosas: dónde colocan el cero, hacia qué lado van los negativos y qué ocurre al avanzar a la derecha.',
    hazInstruction: 'Observa la escena y pon atención a cómo se ordenan los números a lo largo de la recta.',
    videoSrc: '',
    focusPoints: [
      'Dónde se ubica el número cero en la recta.',
      'Hacia qué lado se ordenan los números positivos y negativos.',
      'Qué regla define qué número es mayor que otro.'
    ],
    dileAfterVideo: 'Conversemos sobre lo observado. Te haré dos preguntas para comprobar cómo organizamos los números en la recta.'
  },

  // Paso 4: Conversación Guiada
  preQuestions: [
    {
      context: 'Ubicación en la recta',
      question: 'En una recta numérica horizontal con el cero al centro, ¿hacia qué lado se ubican los números negativos?',
      expected: 'Hacia la izquierda del cero.',
      success: '¡Muy bien! Los números negativos se ubican siempre a la izquierda del cero.',
      support: 'Recuerda que a la derecha del cero van los positivos. ¿Hacia qué lado van los negativos?',
      reveal: 'Los números negativos se ubican siempre a la izquierda del cero.',
      studentReveal: 'A la izquierda del cero.',
      studentImage: '/images/lessons/clase2_recta_negativos_izquierda.svg'
    },
    {
      context: 'Cercanía al origen',
      question: 'Entre el número −1 y el número −4, ¿cuál de los dos se encuentra más cerca del cero?',
      expected: 'El número −1 está más cerca del cero.',
      success: '¡Exacto! El −1 está a un solo paso del cero, mientras que el −4 está a cuatro pasos.',
      support: 'Cuenta cuántos pasos hay desde el cero hasta el −1 y cuántos hasta el −4. ¿Cuál está más cerca?',
      reveal: 'El número −1 está más cerca del cero porque solo dista una unidad del origen.',
      studentReveal: 'El número −1 está más cerca del cero.',
      studentImage: '/images/lessons/clase2_cercania_cero.svg'
    }
  ],

  conversationContext: 'Revisaremos la posición de los números en la recta numérica horizontal y cómo su ubicación determina su orden.',

  // Paso 5: Explicación e Idea Clave
  formalization: {
    title: 'Criterio de orden en la recta numérica',
    concept: 'Orden en la recta numérica',
    summary: 'En la recta numérica horizontal, todo número que se encuentra a la derecha de otro es mayor. Por eso, −1 es mayor que −4, porque está situado más a la derecha.',
    ideaClave: 'Todo número ubicado a la derecha de otro en la recta numérica es mayor que él.',
    dileIntro: 'Ahora aprenderemos la regla fundamental para comparar cualquier pareja de números enteros: la regla de la derecha.',
    hazInstruction: 'Presta atención a cómo la posición en la recta nos dice de inmediato qué número es mayor.',
    videoSrc: ''
  },

  postQuestions: [
    {
      context: 'Regla de la derecha',
      question: 'Si un número A se encuentra a la derecha de un número B en la recta numérica, ¿cuál de los dos es mayor?',
      expected: 'El número A es mayor porque está a la derecha.',
      success: '¡Excelente! En la recta numérica, el número que está más a la derecha siempre es el mayor.',
      support: 'Recuerda la regla de oro: hacia la derecha los números aumentan de valor. Entonces, ¿cuál es mayor?',
      reveal: 'El número A es mayor porque en la recta numérica todo número a la derecha supera en valor al de la izquierda.',
      studentReveal: 'El número A es mayor porque está a la derecha.',
      studentImage: '/images/lessons/clase2_regla_derecha.svg'
    },
    {
      context: 'Comparación de negativos',
      question: 'Al comparar −5 y −2, ¿cuál de los dos números es mayor y por qué?',
      expected: 'El −2 es mayor porque está más a la derecha en la recta numérica.',
      success: '¡Exacto! Aunque el 5 parece más grande, en los negativos el −2 está más a la derecha y por tanto es mayor.',
      support: 'Ubícalos mentalmente en la recta: el −2 está más cerca del cero y a la derecha del −5. ¿Cuál es mayor?',
      reveal: 'El −2 es mayor que el −5 porque en la recta numérica se encuentra más hacia la derecha.',
      studentReveal: 'El −2 es mayor porque está más a la derecha.',
      studentImage: '/images/lessons/clase2_comparacion_negativos.svg'
    }
  ],

  // Paso 6: Práctica Conjunta
  practice: [
    {
      context: 'Temperaturas en la montaña',
      question: 'En un refugio cordillerano se registran dos temperaturas: −3 °C en la mañana y −8 °C en la noche. ¿Cuál de las dos temperaturas fue más alta (mayor)?',
      expected: '−3 °C fue más alta porque −3 es mayor que −8.',
      success: '¡Muy bien! −3 °C representa una temperatura mayor (menos fría) que −8 °C.',
      support: 'Piensa cuál de las dos temperaturas está más cerca del cero en el termómetro o en la recta: −3 está a la derecha de −8. ¿Cuál es mayor?',
      reveal: '−3 °C es mayor que −8 °C porque está más a la derecha en la escala térmica.',
      studentReveal: '−3 °C es mayor.',
      studentImage: '/images/lessons/clase2_temperaturas_montana.svg'
    },
    {
      context: 'Niveles de estacionamiento',
      question: 'Un edificio tiene tres subterráneos: piso −1, piso −2 y piso −3. Si subes desde el piso −3 hasta el piso −1, ¿estás subiendo hacia un nivel mayor o menor?',
      expected: 'Hacia un nivel mayor, porque −1 es mayor que −3.',
      success: '¡Genial! El piso −1 está más cerca de la superficie (cero) y es un nivel mayor que el piso −3.',
      support: 'Al subir te acercas a la calle (piso 0). Subir significa aumentar de nivel. ¿El nivel es mayor o menor?',
      reveal: 'Es un nivel mayor porque −1 > −3. Al subir avanzamos hacia valores mayores.',
      studentReveal: 'Hacia un nivel mayor.',
      studentImage: '/images/lessons/clase2_estacionamiento_subterraneo.svg'
    },
    {
      context: 'Orden de cuatro valores',
      question: 'Ordena de menor a mayor los siguientes cuatro números enteros: +3, −6, 0, −1.',
      expected: '−6, −1, 0, +3',
      success: '¡Excelente ordenamiento! Leíste los números de izquierda a derecha en la recta numérica.',
      support: 'Busca el número que esté más a la izquierda de todos en la recta: ese es el menor. Luego sigue hacia la derecha.',
      reveal: 'El orden de menor a mayor es: −6, −1, 0, +3.',
      studentReveal: '−6, −1, 0, +3',
      studentImage: '/images/lessons/clase2_orden_cuatro_valores.svg'
    }
  ],

  // Síntesis y Razonamiento
  summaryIdeas: [
    [
      '1 · El cero como origen',
      'En la recta numérica, el cero se ubica en el centro y actúa como punto de referencia que separa los números positivos de los negativos.'
    ],
    [
      '2 · Orientación de los signos',
      'Los números positivos se ordenan hacia la derecha aumentando su valor, y los números negativos se ordenan hacia la izquierda alejándose del cero.'
    ],
    [
      '3 · Criterio de orden universal',
      'Todo número ubicado a la derecha de otro en la recta numérica es mayor. Entre dos números negativos, el que está más cerca del cero es mayor.'
    ]
  ],

  summaryText: 'En esta clase aprendimos que la recta numérica organiza todos los números enteros en una sola dimensión continua con el cero en el centro. La regla principal de orden establece que cualquier número situado más a la derecha siempre es mayor que los que están a su izquierda. Por eso, aunque el número cinco sea mayor que dos, el número negativo menos dos es mayor que menos cinco.',

  reasoning: {
    title: 'Comparemos dos situaciones de orden',
    dileIntro: 'Antes del resumen, comparemos dos comparaciones numéricas. Explica la idea con tus propias palabras.',
    question: 'Con números positivos el 5 es mayor que el 2, pero con números negativos el −2 es mayor que el −5. ¿Cómo explicas esta aparente contradicción usando la recta numérica?',
    expectedAnswer: 'En la recta numérica siempre es mayor el número ubicado más a la derecha. El −2 está a la derecha del −5, por eso es mayor.',
    context1: { label: 'POSITIVOS', value: '5 > 2', desc: 'El 5 está más a la derecha que el 2' },
    context2: { label: 'NEGATIVOS', value: '−2 > −5', desc: 'El −2 está más a la derecha que el −5' },
    successFeedback: '¡Excelente razonamiento! Comprendiste que la posición relativa a la derecha manda sobre el valor absoluto del número.',
    supportFeedback: 'Dibuja mentalmente la recta: el cero está al centro, el −2 está dos pasos a la izquierda y el −5 está cinco pasos a la izquierda. ¿Cuál de los dos está más a la derecha?',
    revealText: 'No hay contradicción: en ambos casos se cumple la misma regla. El número que está más a la derecha en la recta numérica es siempre el mayor.'
  },

  challenge: {
    title: 'Desafío breve: Justificación de orden',
    question: 'Un compañero afirma que −8 es mayor que −3 porque el 8 es más grande que el 3. ¿Tiene razón? Explica cómo le demostrarías la respuesta correcta.',
    expectedAnswer: 'No tiene razón. En los números negativos, estar más lejos del cero hacia la izquierda significa tener menor valor; −3 es mayor porque está a la derecha de −8.',
    item1: { label: 'Número −8', tag: 'Más a la izquierda' },
    item2: { label: 'Número −3', tag: 'Más a la derecha' },
    successFeedback: '¡Brillante explicación! Demostraste con claridad la diferencia entre el tamaño del número y su posición en la recta numérica.',
    supportFeedback: 'Recuerda que en los números negativos el signo menos indica estar bajo cero. Deber 8 mil pesos es peor que deber 3 mil pesos. ¿Cuál valor es mayor?'
  },

  strategy: {
    title: 'Cómo ordenar números enteros en 3 pasos',
    dileIntro: 'Cuando tengas que comparar o ordenar números enteros, puedes seguir esta estrategia de tres pasos:',
    steps: [
      { number: 1, title: 'Ubica', desc: 'Sitúa cada número en la recta numérica tomando el cero como centro.' },
      { number: 2, title: 'Compara', desc: 'Observa cuál de los números se encuentra ubicado más hacia la derecha.' },
      { number: 3, title: 'Concluye', desc: 'El número que está a la derecha siempre es el mayor, sin importar sus signos.' }
    ]
  },

  // Paso 7: Evaluación Formativa (Miniquiz)
  mini: [
    {
      id: 'q_1',
      q: '¿Cuál de las siguientes afirmaciones sobre la recta numérica horizontal es correcta?',
      options: [
        'Los números negativos se ubican a la izquierda del cero',
        'Los números positivos se ubican a la izquierda del cero',
        'El número cero se ubica a la izquierda de todos los números'
      ],
      correct: 'Los números negativos se ubican a la izquierda del cero',
      fixExplain: 'En la recta numérica horizontal, el cero está en el centro: a su derecha van los positivos y a su izquierda los negativos.'
    },
    {
      id: 'q_2',
      q: 'Al comparar los números −9 y −3, ¿cuál de ellos es el mayor?',
      options: [
        '−3',
        '−9',
        'Son iguales porque ambos son negativos'
      ],
      correct: '−3',
      fixExplain: 'El número −3 es mayor porque en la recta numérica está ubicado más hacia la derecha (más cerca del cero) que el −9.'
    },
    {
      id: 'q_3',
      q: '¿Cuál de las siguientes listas está correctamente ordenada de menor a mayor?',
      options: [
        '−7, −2, 0, +5',
        '+5, 0, −2, −7',
        '0, −2, +5, −7'
      ],
      correct: '−7, −2, 0, +5',
      fixExplain: 'De menor a mayor se lee de izquierda a derecha en la recta: −7 es el más pequeño, luego −2, después 0 y finalmente +5.'
    }
  ],

  // Paso 7b: Recuperación
  recovery: [
    {
      title: 'Orden entre números negativos',
      explain: 'Entre dos números negativos, siempre es mayor el que se encuentra más cerca del cero en la recta numérica.',
      q: 'Entre −10 y −1, ¿cuál número es mayor?',
      options: [
        '−1',
        '−10'
      ],
      correct: '−1',
      correctText: '¡Eso es! El −1 es mayor porque está a solo un paso del cero, mucho más a la derecha que el −10.',
      fixText: 'La respuesta correcta es −1, porque en la recta numérica está ubicado más a la derecha que el −10.'
    },
    {
      title: 'El cero frente a los negativos',
      explain: 'El número cero siempre se encuentra a la derecha de cualquier número negativo en la recta numérica, por lo que siempre es mayor que ellos.',
      q: '¿Cuál de las siguientes comparaciones es verdadera?',
      options: [
        '0 > −4',
        '−4 > 0'
      ],
      correct: '0 > −4',
      correctText: '¡Correcto! Cero es mayor que cualquier número negativo.',
      fixText: 'La respuesta correcta es 0 > −4, porque el cero está a la derecha de todos los números negativos.'
    }
  ],

  // Paso 8: Cierre
  closure: {
    congratulations: '¡Felicitaciones! Has completado con éxito la Clase 2 de Matemática. Hoy aprendiste a ubicar los enteros en la recta numérica y a aplicar la regla de la derecha para comparar cualquier valor.',
    nextClassPreview: 'En la próxima clase estudiaremos el Valor absoluto y cómo medir distancias al cero sin importar el signo.'
  },

  interactive: {
    type: 'number_line',
    title: 'La recta numérica horizontal y vertical en Z',
    description: 'Explora la ubicación de números positivos y negativos respecto del cero como origen y compara pares de números con la regla de la derecha.'
  }
};

