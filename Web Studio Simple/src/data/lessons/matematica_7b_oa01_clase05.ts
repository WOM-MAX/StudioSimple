import { LessonData } from '../../types/lesson';

export const MATEMATICA_7B_OA01_CLASE05: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Matemática',
    oaCode: 'OA 1',
    oaTitle: 'Números enteros',
    lessonNumber: 5,
    totalLessonsInOa: 6,
    lessonTitle: 'Sustracción en Z y la suma del inverso aditivo',
    durationMinutes: 30,
    nextLessonTitle: 'Resolución de problemas cotidianos y síntesis oficial'
  },

  // Paso 1: Portada y Preparación
  prep: {
    adultObjective: 'Acompañar al estudiante a comprender y aplicar la regla fundamental de la sustracción en los números enteros: toda resta se transforma en una adición sumando el inverso aditivo (opuesto) del sustraendo: a − b = a + (−b).',
    routeToday: 'Introducción → situación problema de restar una deuda o descenso → video gancho con dos sentidos de resta → conversación guiada → video explicativo formal de la regla de signos → práctica guiada en tres casos → estrategia mnemotécnica → miniquiz formativo → ticket de salida y cierre.',
    mentorReminder: 'Sigue el orden indicado. Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
    reminders: [
      'Sigue el orden indicado.',
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'No leas los recuadros SOLO PARA TI ni AYUDA DE LECTURA.',
      'Haz cada pregunta y espera la respuesta antes de seleccionar una opción.',
      'Enfócate en la regla de oro: el primer número (minuendo) jamás cambia; el signo de resta se transforma en suma y el segundo número (sustraendo) cambia a su opuesto.',
      'Si el estudiante necesita apoyo, usa únicamente la ayuda que aparecerá.',
      'Verifica siempre que el estudiante reescriba la resta como suma antes de calcular.'
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
      { label: 'Transformar resta en suma', sub: 'Sumar el opuesto del sustraendo' },
      { label: 'El minuendo se mantiene', sub: 'Solo cambia el signo de la segunda cantidad' },
      { label: 'Restar un negativo', sub: 'Quitar una deuda equivale a sumar un haber (+)' }
    ],
    dileIntro: 'Hoy continuamos avanzando en nuestra ruta de Matemática de séptimo básico. Llegamos a la quinta clase: el fascinante mundo de la resta en los enteros.',
    dileObjective: 'En la clase de hoy descubriremos el secreto matemático para restar cualquier número entero: aprenderemos que restar equivale exactamente a sumar el número opuesto, lo que nos permite resolver restas usando las reglas de suma que ya dominamos.'
  },

  situation: {
    dilePrompt: 'Imagina que tienes una deuda de 2 mil pesos (−2.000) registrada en una libreta. Si el banco decide perdonarte y eliminar ("restar") esa deuda de 5 mil pesos que te cobraban por error, ¿tu situación financiera mejora o empeora?',
    expectedAnswer: 'Mejora, porque quitar una deuda equivale a tener más dinero o recibir un beneficio.',
    socraticHint: 'Si te quitan una obligación de pagar, es exactamente como si te regalaran ese dinero a favor.',
    emotionalTip: 'Piensa en la frase cotidiana: "quitar un negativo es algo positivo".',
    options: [
      {
        label: 'Respondió que mejora (equivale a sumar)',
        kind: 'correct',
        feedbackText: '¡Brillante intuición! Quitar una cantidad negativa (−(−5)) equivale a sumar una cantidad positiva (+5).'
      },
      {
        label: 'Respondió que empeora porque restar siempre disminuye',
        kind: 'needs_support',
        feedbackText: 'En los números naturales restar disminuía, pero aquí estás quitando una deuda. Si te quitan una deuda de encima, ¿te queda más o menos dinero disponible?'
      },
      {
        label: 'Duda o no sabe',
        kind: 'no_answer',
        feedbackText: 'Piénsalo así: si debías $2.000 y te descuentan $2.000 de deuda, ahora debes $0. ¡Tu situación mejoró!'
      }
    ]
  },

  reference: {
    dilePrompt: 'En matemáticas, restar siempre significa sumar el inverso aditivo: a − b = a + (−b). Mantienes el primer número igual, cambias la resta a suma, y le cambias el signo al segundo número.',
    question: 'Si transformamos la resta 10 − (+4) en una suma, ¿cómo queda escrita?',
    expectedAnswer: '10 + (−4)',
    socraticHint: 'El 10 se mantiene, el signo menos se convierte en más (+), y el +4 cambia a su opuesto (−4).',
    feedbackSuccess: '¡Perfecto! 10 − (+4) se convierte en 10 + (−4) = 6.',
    feedbackSupport: 'Cambia la resta por suma e invierte el signo del 4: 10 + (−4).'
  },

  // Paso 3: Video Gancho
  hook: {
    title: 'Dos situaciones de cambio en la profundidad del sumergible',
    dileIntro: 'Ahora veremos un video donde nuestros dos exploradores comparan dos maniobras desde una profundidad de 2 metros bajo el agua (−2 metros): restar un avance positivo versus restar un descenso negativo. Presta atención a cómo cambia la dirección.',
    hazInstruction: 'Observa con cuidado cómo restar puede llevar hacia abajo o hacia la superficie según el signo que se reste.',
    videoSrc: '',
    focusPoints: [
      'Por qué ambas situaciones parten en −2 metros pero terminan en lugares distintos.',
      'Qué ocurre al plantear −2 − (+5) versus −2 − (−5).',
      'Cómo la regla de sumar el opuesto resuelve la contradicción visual.'
    ],
    dileAfterVideo: 'El video nos demuestra que restar un número negativo produce un movimiento inverso hacia la derecha. Ahora conversaremos sobre esta regla de oro.',
    slides: [
      {
            "slideNumber": 1,
            "tituloMomento": "El Submarino en Posición Fija",
            "didacticPurpose": "Apertura y Enfoque",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, monitoring navigation telemetry inside the submarine cabin at two meters depth below sea level. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Misión 5: El enigma de la resta submarina",
            "overlayTitle": "Misión 5: La resta submarina",
            "overlaySubtitle": "Submarino posicionado a −2 metros",
            "vectorialOverlayPptx": "Rótulo de inicio: Cota fija Posición inicial: −2 metros",
            "mathOverlayPptx": "Rótulo de inicio: Cota fija Posición inicial: −2 metros",
            "speakerNotes": "El submarino de investigación oceanográfica se encuentra estacionado a dos metros de profundidad respecto de la superficie marina en calma.",
            "palabrasAprox": 20,
            "duracionSeg": 8
      },
      {
            "slideNumber": 2,
            "tituloMomento": "La Orden de Restar Maniobras",
            "didacticPurpose": "Planteamiento del Problema",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, reviewing submarine captain log instructions on a digital clipboard, analyzing two subtraction commands. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "¿Qué significa restar un movimiento positivo o negativo?",
            "overlayTitle": "La orden de sustracción",
            "overlaySubtitle": "Recalibrando sensores de profundidad en Z",
            "vectorialOverlayPptx": "Comandos de navegación: Restar (+5 metros) y Restar (−5 metros)",
            "mathOverlayPptx": "Comandos de navegación: Restar (+5 metros) y Restar (−5 metros)",
            "speakerNotes": "El capitán de la nave ordena registrar dos maniobras de sustracción para recalibrar los sensores de navegación profunda del submarino.",
            "palabrasAprox": 20,
            "duracionSeg": 8
      },
      {
            "slideNumber": 3,
            "tituloMomento": "Restar un Positivo Quita Altura",
            "didacticPurpose": "Efecto de Restar Positivo",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, observing the submarine descend five meters deeper on navigation sonar: from −2 metros to −7 metros. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Restar (+5 metros) hace descender: (−2) − (+5) = −7",
            "overlayTitle": "Restar positivo: Descenso",
            "overlaySubtitle": "Quitar elevación sumerge la nave a −7 metros",
            "vectorialOverlayPptx": "Vector descendente: Desde −2 metros hasta −7 metros (desplazamiento −5 metros)",
            "mathOverlayPptx": "Vector descendente: Desde −2 metros hasta −7 metros (desplazamiento −5 metros)",
            "speakerNotes": "En la primera maniobra, restar cinco metros positivos hace que el submarino descienda hasta menos siete metros.",
            "palabrasAprox": 17,
            "duracionSeg": 8
      },
      {
            "slideNumber": 4,
            "tituloMomento": "Restar un Negativo Produce Ascenso",
            "didacticPurpose": "Efecto de Restar Negativo",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, watching the submarine emerge completely above the calm sea surface onto an elevated naval platform at plus three meters altitude (+3 meters above sea level), the hull shining dry in the sun, not submerged underwater. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Restar (−5 metros) hace subir: (−2) − (−5) = +3",
            "overlayTitle": "Restar negativo: Ascenso",
            "overlaySubtitle": "Quitar descenso asciende hasta +3 metros",
            "vectorialOverlayPptx": "Recta numérica vertical con vector editable: Origen cero en nivel del mar (0 metros) | Marca inicial en −2 metros | Vector de ascenso +5 metros hacia arriba | Posición final en +3 metros (emergido sobre el mar, fuera del agua)",
            "mathOverlayPptx": "Recta numérica vertical con vector editable: Origen cero en nivel del mar (0 metros) | Marca inicial en −2 metros | Vector de ascenso +5 metros hacia arriba | Posición final en +3 metros (emergido sobre el mar, fuera del agua)",
            "speakerNotes": "Al restar cinco metros negativos, el submarino asciende cinco metros: sube de menos dos a tres metros sobre la superficie.",
            "palabrasAprox": 20,
            "duracionSeg": 9
      },
      {
            "slideNumber": 5,
            "tituloMomento": "El Gran Descubrimiento: Inverso Aditivo",
            "didacticPurpose": "Descubrimiento de la Equivalencia",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, illuminating an equivalence formula on their touch display where subtraction changes into adding the opposite. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Equivalencia fundamental: Restar a equivale a sumar (−a)",
            "overlayTitle": "El gran descubrimiento",
            "overlaySubtitle": "Toda resta se transforma en la suma del opuesto",
            "vectorialOverlayPptx": "Transformación algebraica: a − b = a + (−b)",
            "mathOverlayPptx": "Transformación algebraica: a − b = a + (−b)",
            "speakerNotes": "Los jóvenes exploradores descubren que restar un número equivale exactamente a sumar su inverso aditivo opuesto en Z.",
            "palabrasAprox": 18,
            "duracionSeg": 9
      },
      {
            "slideNumber": 6,
            "tituloMomento": "Quitar una Deuda es Ganar",
            "didacticPurpose": "Analogía Intuitiva",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, smiling as they compare submarine ballast reduction with erasing an account debt on their tablet. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Quitar una deuda (−) equivale a ganar saldo (+)",
            "overlayTitle": "Analogía contextual",
            "overlaySubtitle": "Anular una pérdida se convierte en ganancia neta",
            "vectorialOverlayPptx": "Comparación: Quitar lastre = Ascenso | Quitar deuda = Crédito",
            "mathOverlayPptx": "Comparación: Quitar lastre = Ascenso | Quitar deuda = Crédito",
            "speakerNotes": "Así, quitar una deuda o cancelar un descenso se transforma de manera natural en un avance positivo.",
            "palabrasAprox": 17,
            "duracionSeg": 9
      },
      {
            "slideNumber": 7,
            "tituloMomento": "Desafío de la Lección",
            "didacticPurpose": "Pregunta Detonante y Síntesis",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing together ready to formalize the universal transformation of subtraction in their notebooks. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Desafío: ¿Cómo transformar cualquier sustracción en Z?",
            "overlayTitle": "Desafío de la lección",
            "overlaySubtitle": "La regla de oro del inverso aditivo",
            "vectorialOverlayPptx": "Diagrama de transformación: a − b ---> a + (−b)",
            "mathOverlayPptx": "Diagrama de transformación: a − b ---> a + (−b)",
            "speakerNotes": "En la lección formalizaremos cómo transformar cualquier sustracción de enteros en una adición simple, segura y muy directa.",
            "palabrasAprox": 18,
            "duracionSeg": 9
      }
]
  },

  // Paso 4: Conversación Guiada
  preQuestions: [
    {
      context: 'Transformación de resta simple',
      question: 'En la resta 8 − 3, el 3 es positivo (+3). Si aplicamos la regla de sumar el opuesto, ¿cómo se reescribe como suma?',
      expected: '8 + (−3)',
      success: '¡Exacto! 8 − (+3) se transforma en 8 + (−3), que da como resultado 5.',
      support: 'Mantén el 8, cambia el signo de menos por más (+) y escribe el opuesto de 3, que es −3.',
      reveal: 'Se escribe 8 + (−3). El resultado es 5.',
      studentReveal: '8 + (−3)',
      studentImage: '/images/lessons/clase5_transformacion_resta.svg'
    },
    {
      context: 'Resta de un número negativo',
      question: 'Si tienes la resta 4 − (−6), ¿cuál es el opuesto del sustraendo (−6)? ¿En qué suma se transforma?',
      expected: 'El opuesto de −6 es +6, por lo que se transforma en 4 + (+6) = 10.',
      success: '¡Excelente! Restar menos seis equivale exactamente a sumar más seis: 4 + 6 = 10.',
      support: 'El signo de resta (−) se convierte en suma (+) y el −6 cambia a su opuesto (+6). ¿Cómo queda?',
      reveal: '4 − (−6) se transforma en 4 + (+6) = 10.',
      studentReveal: '4 + (+6) = 10',
      studentImage: '/images/lessons/clase5_resta_negativo.svg'
    }
  ],

  conversationContext: 'Revisaremos la regla general de sustracción en Z y cómo aplicarla paso a paso sin cometer errores de signos.',

  // Paso 5: Explicación y Formalización
  formalization: {
    title: 'Transformación formal de sustracción a adición del opuesto en Z',
    concept: 'Sustracción en Z e inverso aditivo',
    summary: 'La sustracción de números enteros se define formalmente como la adición del opuesto: para cualesquiera enteros a y b, se cumple que a − b = a + (−b). El minuendo (a) se conserva exactamente igual, la operación de resta se transforma en suma (+), y el sustraendo (b) se reemplaza por su opuesto (−b). Luego se aplican las reglas de adición ya aprendidas.',
    ideaClave: 'Para restar un número entero, se suma su opuesto: a − b = a + (−b). Solo cambia el signo del segundo número.',
    dileIntro: 'Ahora veremos el video de explicación formal. Aprenderemos la regla de los dos cambios: el primer número queda quieto, la resta pasa a suma y el segundo número da media vuelta a su signo opuesto.',
    hazInstruction: 'Fíjate con atención en cómo se resuelven −2 − (+5) = −7 y −2 − (−5) = +3.',
    videoSrc: '',
    slides: [
      {
            "slideNumber": 1,
            "tituloMomento": "Objetivo de la Lección",
            "didacticPurpose": "Objetivo de la Lección",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing before the smartboard showing the transformation of subtraction into the addition of the additive inverse. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Objetivo: Restar sumando el opuesto del sustraendo",
            "overlayTitle": "Objetivo",
            "overlaySubtitle": "Restar sumando el opuesto del sustraendo",
            "vectorialOverlayPptx": "Sin rótulo adicional (la diapositiva presenta únicamente el Título de 64 pt y el Objetivo en Subtítulo de 36 pt sobre la ilustración limpia)",
            "mathOverlayPptx": "Sin rótulo adicional (la diapositiva presenta únicamente el Título de 64 pt y el Objetivo en Subtítulo de 36 pt sobre la ilustración limpia)",
            "speakerNotes": "El objetivo de hoy es aprender a resolver sustracciones de números enteros transformándolas en la adición del inverso aditivo del sustraendo con total seguridad procedimental en cada ejercicio.",
            "palabrasAprox": 28,
            "duracionSeg": 12
      },
      {
            "slideNumber": 2,
            "tituloMomento": "La Regla Fundamental: Sumar el Opuesto",
            "didacticPurpose": "Formalización de la Regla",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, pointing at the universal transformation rule: minuend minus subtrahend equals minuend plus opposite subtrahend. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Regla formal: a − b = a + (−b)",
            "overlayTitle": "Regla de transformación",
            "overlaySubtitle": "Restar un número equivale a sumar su inverso aditivo",
            "vectorialOverlayPptx": "Fórmula highlighted: Minuendo − Sustraendo = Minuendo + (−Sustraendo)",
            "mathOverlayPptx": "Fórmula highlighted: Minuendo − Sustraendo = Minuendo + (−Sustraendo)",
            "speakerNotes": "La regla fundamental establece que restar un número entero equivale exactamente a sumar su opuesto simétrico. El minuendo se conserva intacto y la resta pasa a suma formal.",
            "palabrasAprox": 28,
            "duracionSeg": 13
      },
      {
            "slideNumber": 3,
            "tituloMomento": "Transformación de (−2) − (+5)",
            "didacticPurpose": "Modelamiento Caso 1",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, tracing the step-by-step conversion of minus two minus plus five into minus two plus minus five. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Paso 1: (−2) − (+5) se convierte en (−2) + (−5)",
            "overlayTitle": "Caso 1: Restar positivo",
            "overlaySubtitle": "El sustraendo +5 cambia a su opuesto −5",
            "vectorialOverlayPptx": "Transformación: (−2) − (+5) -> (−2) + (−5)",
            "mathOverlayPptx": "Transformación: (−2) − (+5) -> (−2) + (−5)",
            "speakerNotes": "En menos dos menos más cinco, mantenemos menos dos, cambiamos la resta a suma y reemplazamos más cinco por menos cinco, sumando luego ambos números enteros negativos.",
            "palabrasAprox": 27,
            "duracionSeg": 13
      },
      {
            "slideNumber": 4,
            "tituloMomento": "Resolución del Caso 1: Resultado −7",
            "didacticPurpose": "Aplicación de Adición",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, verifying the addition of minus two plus minus five yielding minus seven on the number line display. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Paso 2: (−2) + (−5) = −7 unidades",
            "overlayTitle": "Resultado Caso 1",
            "overlaySubtitle": "Suma de enteros de igual signo negativo: −7",
            "vectorialOverlayPptx": "Operación finalizada: (−2) + (−5) = −7 sobre la recta",
            "mathOverlayPptx": "Operación finalizada: (−2) + (−5) = −7 sobre la recta",
            "speakerNotes": "El resultado de menos dos más menos cinco es menos siete. La sustracción quedó convertida en una simple suma de números enteros con el mismo signo negativo.",
            "palabrasAprox": 27,
            "duracionSeg": 13
      },
      {
            "slideNumber": 5,
            "tituloMomento": "Caso 2: Restar un Negativo (−2) − (−5)",
            "didacticPurpose": "Modelamiento Caso 2",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, tracing the conversion of minus two minus minus five into minus two plus plus five on the board. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Caso 2: (−2) − (−5) se convierte en (−2) + (+5) = +3",
            "overlayTitle": "Caso 2: Restar negativo",
            "overlaySubtitle": "El sustraendo −5 cambia a su opuesto +5",
            "vectorialOverlayPptx": "Recta numérica vertical con vector editable: Marca inicial en −2 metros | Vector de adición +5 metros hacia arriba | Marca final en +3 metros (emergido sobre el nivel del mar)",
            "mathOverlayPptx": "Recta numérica vertical con vector editable: Marca inicial en −2 metros | Vector de adición +5 metros hacia arriba | Marca final en +3 metros (emergido sobre el nivel del mar)",
            "speakerNotes": "En menos dos menos menos cinco, el opuesto de menos cinco es más cinco. La operación se transforma en menos dos más más cinco, resultando más tres unidades finales.",
            "palabrasAprox": 29,
            "duracionSeg": 13
      },
      {
            "slideNumber": 6,
            "tituloMomento": "Advertencia: El Minuendo Nunca Cambia",
            "didacticPurpose": "Prevención de Errores Comunes",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, highlighting the first number with an intact blue box while circling the operation change and subtrahend inversion. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Atención: El minuendo se mantiene exactamente igual",
            "overlayTitle": "El minuendo no cambia",
            "overlaySubtitle": "Solo se modifica el signo de resta y el sustraendo",
            "vectorialOverlayPptx": "Esquema de control: Minuendo (FIJO) − Sustraendo (INVERTIDO)",
            "mathOverlayPptx": "Esquema de control: Minuendo (FIJO) − Sustraendo (INVERTIDO)",
            "speakerNotes": "Recuerda que el minuendo jamás cambia de signo; únicamente invertimos el operador de sustracción y el signo del sustraendo para aplicar las reglas conocidas de la adición de enteros.",
            "palabrasAprox": 29,
            "duracionSeg": 13
      },
      {
            "slideNumber": 7,
            "tituloMomento": "Regla de Oro y Pase a Práctica",
            "didacticPurpose": "Síntesis y Regla de Oro",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, smiling with notebooks open at the study desk, ready to transform subtractions into additions on the platform. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Regla de Oro: Restar es sumar el inverso aditivo",
            "overlayTitle": "Regla de Oro: Síntesis",
            "overlaySubtitle": "a − b = a + (−b) en toda ocasión",
            "vectorialOverlayPptx": "Resumen algorítmico: Resta convertida en adición del opuesto",
            "mathOverlayPptx": "Resumen algorítmico: Resta convertida en adición del opuesto",
            "speakerNotes": "Para restar enteros, suma siempre el inverso aditivo del sustraendo. Con esta regla de oro, pasamos directamente a la práctica interactiva de la plataforma.",
            "palabrasAprox": 27,
            "duracionSeg": 13
      }
]
  },

  postQuestions: [
    {
      context: 'Aplicación de la regla de resta',
      question: 'Calcula: 6 − (−4). ¿Cuál es el resultado tras aplicar la regla?',
      expected: '+10',
      success: '¡Excelente! 6 − (−4) se transforma en 6 + (+4) = 10.',
      support: 'El 6 queda igual, la resta pasa a suma y el −4 pasa a +4. ¿Cuánto es 6 + 4?',
      reveal: '6 − (−4) = 6 + 4 = 10.',
      studentReveal: '10'
    },
    {
      context: 'Resta que da negativo',
      question: 'Calcula: 3 − 10. ¿Cuál es el resultado?',
      expected: '−7',
      success: '¡Muy bien! 3 − (+10) se transforma en 3 + (−10) = −7.',
      support: 'Escribe 3 + (−10). Tienen signos distintos: resta 10 − 3 = 7 y conserva el signo del mayor.',
      reveal: '3 − 10 = 3 + (−10) = −7.',
      studentReveal: '−7'
    }
  ],

  // Paso 6: Práctica Conjunta y Guiada
  practice: [
    {
      context: 'Variación de temperatura',
      question: 'La temperatura máxima de un día fue de +14 °C y la mínima fue de −3 °C. La variación térmica se calcula restando la máxima menos la mínima: 14 − (−3). ¿Cuál fue la variación térmica?',
      expected: '17 °C de variación.',
      success: '¡Brillante! 14 − (−3) = 14 + (+3) = 17 °C.',
      support: 'Aplica la regla: 14 + (+3). ¿Cuánto suman 14 y 3?',
      reveal: 'La variación fue de 17 °C (14 − (−3) = 14 + 3 = 17).',
      studentReveal: '17 °C.',
      studentImage: '/images/lessons/clase5_variacion_termica.svg'
    },
    {
      context: 'Diferencia de alturas',
      question: 'Un helicóptero vuela a +1.200 metros sobre el nivel del mar y un submarino navega a −400 metros. ¿Cuál es la distancia vertical entre ambos? (Calcula: 1.200 − (−400)).',
      expected: '1.600 metros.',
      success: '¡Perfecto! 1.200 − (−400) = 1.200 + 400 = 1.600 metros de separación vertical.',
      support: 'El helicóptero está a 1.200 del mar y el submarino a 400 bajo el mar. Se suman ambas distancias: 1.200 + 400.',
      reveal: 'La distancia es 1.600 metros.',
      studentReveal: '1.600 metros.',
      studentImage: '/images/lessons/clase5_diferencia_alturas.svg'
    },
    {
      context: 'Resta entre dos negativos',
      question: 'Resuelve paso a paso: (−8) − (−15). ¿Cuál es el resultado final?',
      expected: '+7',
      success: '¡Extraordinario! (−8) − (−15) = (−8) + (+15) = +7.',
      support: 'El primer número (−8) no cambia. La resta pasa a suma y el −15 pasa a +15. Luego calculas (−8) + (+15).',
      reveal: '(−8) − (−15) = (−8) + (+15) = +7.',
      studentReveal: '+7',
      studentImage: '/images/lessons/clase5_dos_negativos.svg'
    }
  ],

  // Síntesis y Razonamiento
  summaryIdeas: [
    [
      '1 · La sustracción no es una operación nueva',
      'En los números enteros, restar no requiere memorizar tablas nuevas: toda sustracción se transforma en una adición mediante la regla a − b = a + (−b).'
    ],
    [
      '2 · Regla de los dos cambios',
      'El minuendo (primer término) jamás cambia. Se realizan solo dos modificaciones: el signo de operación cambia de menos (−) a más (+), y el sustraendo cambia a su número opuesto.'
    ],
    [
      '3 · El caso del doble negativo',
      'Restar un número negativo (−(−b)) siempre produce una adición positiva (+(+b)). En la recta numérica, quitar un retroceso hace que el avance sea hacia la derecha.'
    ]
  ],

  summaryText: 'En esta clase aprendimos que en el conjunto de los números enteros no necesitamos aprender reglas complicadas para restar: toda resta se convierte en una suma del opuesto según la ley a − b = a + (−b). Comprendimos que el primer número siempre se mantiene idéntico, y que restar un número negativo equivale en la realidad a eliminar una deuda o anular un retroceso, impulsando el resultado hacia adelante en la recta numérica.',

  reasoning: {
    title: '¿Por qué "menos por menos" da "más" en una resta?',
    dileIntro: 'Analicemos el razonamiento detrás de restar una cantidad negativa.',
    question: 'En la expresión 5 − (−3) = 8, muchas personas dicen mecánicamente que dos signos menos seguidos se convierten en más. ¿Cómo explicarías esta igualdad usando una recta numérica o una situación cotidiana?',
    expectedAnswer: 'Porque restar significa moverse en sentido contrario al signo del número. Si el número ya apunta a la izquierda (−), ir en sentido contrario a la izquierda obliga a moverse hacia la derecha (+).',
    context1: { label: 'RESTA DE POSITIVO', value: '5 − (+3) = 2', desc: 'Sentido contrario a la derecha: se mueve a la izquierda' },
    context2: { label: 'RESTA DE NEGATIVO', value: '5 − (−3) = 8', desc: 'Sentido contrario a la izquierda: se mueve a la derecha' },
    successFeedback: '¡Magistral explicación! Comprendiste que la resta es un operador de inversión de dirección.',
    supportFeedback: 'Piensa en una orden militar: "Da media vuelta y camina hacia atrás". ¡Terminas avanzando hacia adelante!',
    revealText: 'Restar invierte la dirección. Como el signo negativo ya apuntaba a la izquierda, invertirlo produce un desplazamiento directo hacia la derecha (+).'
  },

  challenge: {
    title: 'El error del signo en el minuendo',
    question: 'Un estudiante intentó resolver (−10) − (+4) y escribió (+10) + (−4) = +6. ¿Qué error cometió y cuál es la solución correcta?',
    expectedAnswer: 'Cometió el error de cambiarle el signo al primer número (−10). El primer número no debe cambiar. Lo correcto es (−10) + (−4) = −14.',
    item1: { label: 'Error detectado', tag: 'Cambió el signo del minuendo' },
    item2: { label: 'Resultado correcto', tag: '−14' },
    successFeedback: '¡Impecable agudeza! Identificaste que el minuendo jamás debe modificarse. Solo cambia el sustraendo.',
    supportFeedback: 'Recuerda la regla: el primer número se queda exactamente igual. ¿Cuál era el primer número?'
  },

  strategy: {
    title: 'Estrategia en 3 pasos para restar en Z',
    dileIntro: 'Aplica siempre esta secuencia para no fallar jamás en una sustracción:',
    steps: [
      { number: 1, title: 'Conserva el primero', desc: 'Escribe el primer número (minuendo) tal cual está, con su signo original.' },
      { number: 2, title: 'Transforma la operación', desc: 'Cambia el signo de resta (−) por una suma (+) y cambia el signo del segundo número (sustraendo) por su opuesto.' },
      { number: 3, title: 'Suma con las reglas de Z', desc: 'Aplica la regla de adición: si quedaron igual signo suma magnitudes; si quedaron distinto signo resta magnitudes y manda el mayor.' }
    ]
  },

  // Paso 7: Evaluación Formativa (Miniquiz)
  mini: [
    {
      id: 'q_1',
      q: '¿Cómo se transforma la resta (−7) − (+12) en una suma del opuesto?',
      options: [
        '(−7) + (−12)',
        '(+7) + (−12)',
        '(−7) + (+12)'
      ],
      correct: '(−7) + (−12)',
      fixExplain: 'El primer número se mantiene (−7), la resta pasa a suma (+) y el +12 pasa a su opuesto (−12).',
      dileReview: 'Pídele al estudiante que verifique que el primer número no haya cambiado de signo.'
    },
    {
      id: 'q_2',
      q: '¿Cuál es el resultado de resolver 15 − (−5)?',
      options: [
        '20',
        '10',
        '−20'
      ],
      correct: '20',
      fixExplain: '15 − (−5) = 15 + (+5) = 20. Quitar un número negativo equivale a sumar su positivo.',
      dileReview: 'Pídele que reescriba la resta como 15 + 5.'
    },
    {
      id: 'q_3',
      q: '¿Cuál es el resultado de (−4) − (−9)?',
      options: [
        '+5',
        '−13',
        '−5'
      ],
      correct: '+5',
      fixExplain: '(−4) − (−9) = (−4) + (+9). Al restar magnitudes: 9 − 4 = 5, y como |+9| > |−4|, el resultado es +5.',
      dileReview: 'Pídele que transforme a (−4) + 9 y luego aplique la regla de signos distintos.'
    }
  ],

  // Paso 7b: Recuperación
  recovery: [
    {
      title: 'Restar es sumar el opuesto',
      explain: 'Nunca restes directamente en Z: primero convierte la resta en suma y cambia el signo del segundo término.',
      q: 'Calcula: 2 − 8',
      options: [
        '−6',
        '+6'
      ],
      correct: '−6',
      correctText: '¡Exacto! 2 − 8 = 2 + (−8) = −6.',
      fixText: 'La respuesta correcta es −6, porque 2 + (−8) = −6.'
    },
    {
      title: 'Resta de dos negativos',
      explain: 'Al restar un negativo, el segundo término siempre pasa a ser positivo.',
      q: 'Calcula: (−3) − (−3)',
      options: [
        '0',
        '−6'
      ],
      correct: '0',
      correctText: '¡Brillante! (−3) + (+3) = 0. Restar un número por sí mismo siempre da cero.',
      fixText: 'La respuesta correcta es 0, porque (−3) + (+3) = 0.'
    }
  ],

  // Paso 8: Cierre
  closure: {
    congratulations: '¡Felicitaciones! Has completado con éxito la Clase 5 de Matemática. Ahora dominas la transformación de la resta en adición del opuesto en los enteros.',
    nextClassPreview: 'En la próxima y última clase del objetivo aplicaremos todo lo aprendido a la resolución de problemas de la vida cotidiana y realizaremos un ensayo formativo tipo MINEDUC.'
  },

  interactive: {
    type: 'number_line',
    title: 'Simulador interactivo de sustracción con inverso aditivo',
    description: 'Experimenta transformando restas en sumas y observa cómo se invierte el vector de desplazamiento en la recta numérica.'
  }
};
