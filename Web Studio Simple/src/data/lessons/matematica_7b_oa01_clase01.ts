import { LessonData } from '../../types/lesson';

export const MATEMATICA_7B_OA01_CLASE01: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Matemática',
    oaCode: 'OA 1',
    oaTitle: 'Números enteros',
    lessonNumber: 1,
    totalLessonsInOa: 6,
    lessonTitle: 'Posiciones y movimientos respecto de un punto de referencia',
    durationMinutes: 30,
    nextLessonTitle: 'La recta numérica y orden en Z'
  },

  // Paso 1: Portada y Preparación
  prep: {
    adultObjective: 'Guiar al estudiante para que comprenda que los números enteros pueden representar la ubicación de algo en relación con un punto de referencia, que distinga entre posición y movimiento y que explique al menos una idea con sus propias palabras.',
    routeToday: 'Introducción → conexión inicial → video introductorio → conversación guiada → video explicativo → práctica → comparación → estrategia para pensar → resumen → miniquiz → refuerzo si es necesario → cierre.',
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
      { label: 'Punto de referencia', sub: 'El cero como origen de comparación' },
      { label: 'Cantidades opuestas', sub: 'Valores sobre cero y bajo cero' },
      { label: 'Posición vs Movimiento', sub: 'Ubicaciones fijas y desplazamientos' }
    ],
    dileIntro: 'Hoy comenzamos la ruta de Matemática de séptimo básico. Durante este curso trabajaremos cuatro grandes bloques: Números, Álgebra, Geometría y Datos y azar. En cada bloque conoceremos distintos temas, los practicaremos paso a paso y comprobaremos lo que vamos aprendiendo.',
    dileObjective: 'En la clase de hoy comenzaremos con los números enteros. Aprenderemos a representar la ubicación de objetos o valores comparándolos con un punto de referencia, como una temperatura comparada con cero grados o la profundidad de un submarino comparada con la superficie del mar. También aprenderemos a distinguir una posición de un movimiento y a explicar cómo llegamos a una respuesta.'
  },

  situation: {
    dilePrompt: 'Observa este termómetro. Tomaremos 0 °C como punto de referencia. Una temperatura de tres grados sobre cero es positiva: podemos escribirla como 3 °C o, si queremos mostrar expresamente su signo, como +3 °C. Ahora pensemos: ¿qué número entero representa una temperatura de tres grados bajo cero?',
    expectedAnswer: '−3',
    socraticHint: '0 °C se lee “cero grados Celsius”. · 3 °C se lee “tres grados Celsius”. · +3 °C se lee “más tres grados Celsius”.',
    emotionalTip: '−3 se lee “menos tres”.',
    options: [
      {
        label: 'Respondió −3',
        kind: 'correct',
        feedbackText: '¡Correcto! El número entero que representa esa temperatura es −3.'
      },
      {
        label: 'Respondió 3',
        kind: 'needs_support',
        feedbackText: 'Estuviste cerca. El número 3 está correcto porque indica la cantidad de grados, pero falta el signo que indica que la temperatura está bajo cero. ¿Recuerdas qué signo utilizamos para representar una cantidad bajo cero?'
      },
      {
        label: 'No sabe o dio otra respuesta',
        kind: 'no_answer',
        feedbackText: 'Vamos paso a paso. El número 3 indica la cantidad de grados. Como la temperatura está bajo cero necesitamos el signo que representa una cantidad bajo cero. ¿Cuál es ese signo?'
      }
    ]
  },

  reference: {
    dilePrompt: 'Ahora veamos qué significa −3 °C. El signo menos indica que la temperatura está bajo cero. El número 3 indica que está a tres grados del cero.',
    question: 'Entonces, dime con tus palabras: ¿qué representa −3 °C?',
    expectedAnswer: 'Representa una temperatura de tres grados Celsius bajo cero.',
    socraticHint: 'El estudiante ya identificó el número. Ahora comprobarás si comprende qué representan el signo negativo y el número 3.',
    feedbackSuccess: '¡Exacto! Comprendiste que −3 °C representa una temperatura de tres grados Celsius bajo cero.',
    feedbackSupport: 'Mira nuevamente el termómetro: el signo menos indica bajo cero y el 3 indica la distancia desde el cero. −3 °C representa tres grados Celsius bajo cero.'
  },

  // Paso 3: Video Gancho
  hook: {
    title: 'El recorrido del submarino',
    focusPoints: [
      'Dónde comienza el submarino respecto de la superficie.',
      'Cuánto baja el submarino en su primera maniobra.',
      'Cuánto sube el submarino al detectar la corriente.'
    ],
    dileIntro: 'Ahora veremos un video sobre el recorrido de un submarino. Mientras lo ves, fíjate en tres cosas: dónde comienza el submarino, cuánto baja y cuánto sube.',
    hazInstruction: 'Presiona el botón para reproducir el video.',
    videoSrc: 'https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/110-7-MAT-OA01-L01-MOTIVACIONAL_V9_LEGIBLE.mp4',
    posterSrc: '/visuals/desafio-submarino.png',
    dileAfterVideo: 'El video nos muestra cómo el submarino comienza en la superficie y realiza distintos cambios de profundidad en el mar. Pero antes de realizar cálculos formales con enteros, nuestro primer gran paso es aprender a distinguir con claridad qué es una posición y qué es un movimiento.',
    slides: [
      {
            "slideNumber": 1,
            "tituloMomento": "Apertura y Desafío Marino",
            "didacticPurpose": "Apertura y Enfoque",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing on the deck of a research vessel looking out at an advanced yellow submarine in calm waters. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Misión 1: Recorrido del submarino",
            "overlayTitle": "Misión 1: Recorrido del submarino",
            "overlaySubtitle": "Expedición oceanográfica en aguas profundas",
            "vectorialOverlayPptx": "Rótulo de inicio: Profundidad Profundidad de referencia: 0 metros",
            "mathOverlayPptx": "Rótulo de inicio: Profundidad Profundidad de referencia: 0 metros",
            "speakerNotes": "Comienza una nueva expedición oceanográfica. Nuestro submarino de investigación científica se prepara para una inmersión en aguas profundas.",
            "palabrasAprox": 18,
            "duracionSeg": 8
      },
      {
            "slideNumber": 2,
            "tituloMomento": "El Punto de Referencia Cero",
            "didacticPurpose": "Punto de Referencia",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, observing from the ship railing as the yellow submarine rests at the horizontal boundary dividing sea and sky. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Punto de partida: Superficie del mar (0 metros)",
            "overlayTitle": "Punto de referencia cero",
            "overlaySubtitle": "Superficie del mar: 0 metros",
            "vectorialOverlayPptx": "Línea de nivel horizontal punteada con marca: 0 metros",
            "mathOverlayPptx": "Línea de nivel horizontal punteada con marca: 0 metros",
            "speakerNotes": "La superficie del mar es nuestro punto de referencia fundamental. En esta expedición la representamos exactamente con el número cero.",
            "palabrasAprox": 20,
            "duracionSeg": 8
      },
      {
            "slideNumber": 3,
            "tituloMomento": "Posición Inicial Bajo el Mar",
            "didacticPurpose": "Ubicación Inicial",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, inside the yellow submarine cockpit looking through the reinforced porthole into the azure deep. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Posición inicial: −20 metros",
            "overlayTitle": "Posición inicial sumergida",
            "overlaySubtitle": "Ubicación fija: −20 metros",
            "vectorialOverlayPptx": "Eje vertical de profundidad con cota puntual en −20 metros bajo el cero",
            "mathOverlayPptx": "Eje vertical de profundidad con cota puntual en −20 metros bajo el cero",
            "speakerNotes": "El submarino desciende veinte metros bajo la superficie. Como está bajo cero, su posición es menos veinte metros.",
            "palabrasAprox": 18,
            "duracionSeg": 8
      },
      {
            "slideNumber": 4,
            "tituloMomento": "Primer Movimiento: Descenso",
            "didacticPurpose": "Desplazamiento Descendente",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, working together at the cockpit controls, the boy piloting thrusters while the girl monitors descent depth. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Maniobra 1: baja 15 metros",
            "overlayTitle": "Primer movimiento: Descenso",
            "overlaySubtitle": "Maniobra hacia abajo: baja 15 metros",
            "vectorialOverlayPptx": "Vector vertical descendente indicando desplazamiento: −15 metros",
            "mathOverlayPptx": "Vector vertical descendente indicando desplazamiento: −15 metros",
            "speakerNotes": "Para investigar una fosa marina, el submarino ejecuta una maniobra: desciende quince metros hacia el fondo del océano.",
            "palabrasAprox": 18,
            "duracionSeg": 9
      },
      {
            "slideNumber": 5,
            "tituloMomento": "Segundo Movimiento: Ascenso",
            "didacticPurpose": "Desplazamiento Ascendente",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, operating the ballast system together as water currents swirl outside the cockpit viewport. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Maniobra 2: sube 8 metros",
            "overlayTitle": "Segundo movimiento: Ascenso",
            "overlaySubtitle": "Maniobra hacia arriba: sube 8 metros",
            "vectorialOverlayPptx": "Vector vertical ascendente indicando desplazamiento: +8 metros",
            "mathOverlayPptx": "Vector vertical ascendente indicando desplazamiento: +8 metros",
            "speakerNotes": "Al detectar una corriente submarina intensa, el capitán ordena ascender: el submarino sube ocho metros hacia la superficie.",
            "palabrasAprox": 18,
            "duracionSeg": 9
      },
      {
            "slideNumber": 6,
            "tituloMomento": "El Enigma del Recorrido",
            "didacticPurpose": "Problematización",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, analyzing illuminated digital navigation charts side by side with curiosity and keen attention. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "¿Posición actual o movimiento realizado?",
            "overlayTitle": "El enigma del recorrido",
            "overlaySubtitle": "¿Posición actual o movimiento realizado?",
            "vectorialOverlayPptx": "Comparación gráfica: Cota estática frente a Flecha de traslación",
            "mathOverlayPptx": "Comparación gráfica: Cota estática frente a Flecha de traslación",
            "speakerNotes": "Durante la expedición se registraron profundidades y maniobras: ¿cuáles datos indican dónde está el submarino y cuáles cómo se mueve?",
            "palabrasAprox": 20,
            "duracionSeg": 9
      },
      {
            "slideNumber": 7,
            "tituloMomento": "Desafío de la Lección",
            "didacticPurpose": "Pregunta Detonante y Síntesis",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, sitting at the study console with their notebooks open, confident and ready for the pedagogical challenge. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Desafío: Distinguir posición de movimiento",
            "overlayTitle": "Desafío de la lección",
            "overlaySubtitle": "Distinguir posición de movimiento",
            "vectorialOverlayPptx": "Diagrama conceptual: Punto cero -> Posición estática vs Vector de movimiento",
            "mathOverlayPptx": "Diagrama conceptual: Punto cero -> Posición estática vs Vector de movimiento",
            "speakerNotes": "En la lección aprenderemos a distinguir la ubicación de los desplazamientos que realizamos respecto del punto de referencia.",
            "palabrasAprox": 18,
            "duracionSeg": 9
      }
]
  },

  // Paso 4: Conversación Guiada
  preQuestions: [
    {
      context: 'Punto de referencia',
      question: 'En el recorrido del submarino, ¿qué lugar representa el cero?',
      expected: 'La superficie del mar representa el cero.',
      success: '¡Muy bien! En este recorrido usamos la superficie del mar como punto de referencia y la representamos con el número cero.',
      support: 'Recuerda que la profundidad comienza a medirse desde la superficie del mar. Ese es el lugar desde donde contamos cuántos metros baja el submarino. Con esta pista, ¿qué lugar representa el cero?',
      reveal: 'En este recorrido, la superficie del mar representa el cero porque desde allí comenzamos a medir la profundidad.',
      studentReveal: 'La superficie del mar representa el cero.',
      studentImage: '/images/lessons/clase1_submarino.svg'
    },
    {
      context: 'Ubicación del submarino',
      question: '¿Qué significa que el submarino se encuentre a −20 metros?',
      expected: 'El submarino se encuentra veinte metros bajo la superficie del mar.',
      success: '¡Exacto! Significa que el submarino se encuentra veinte metros bajo la superficie del mar, que usamos como punto de referencia. Como −20 metros nos indica dónde se encuentra, decimos que representa una posición.',
      support: 'Recuerda que la superficie del mar representa el cero. En −20 metros, el signo negativo indica que el submarino está debajo de ese punto y el número 20 indica la distancia desde el cero hasta el submarino. Con esta pista, ¿qué significa −20 metros?',
      reveal: '−20 metros significa que el submarino se encuentra veinte metros bajo la superficie del mar. Esta información representa su posición.',
      studentReveal: 'El submarino está veinte metros bajo la superficie. Esa es su posición.',
      studentImage: '/images/lessons/clase1_submarino.svg'
    }
  ],

  // Paso 5: Explicación y Formalización
  formalization: {
    title: 'Posición y movimiento respecto de un punto de referencia',
    concept: 'Posición y movimiento',
    ideaClave: 'Una posición indica dónde se encuentra un objeto respecto del punto de referencia; un movimiento describe cómo cambia de lugar, la dirección y la distancia recorrida.',
    summary: 'Una posición indica dónde se encuentra un objeto respecto del punto de referencia; un movimiento describe cómo cambia de lugar, la dirección y la distancia recorrida.',
    dileIntro: 'En el video observamos que el submarino parte en la superficie y realiza distintos desplazamientos bajo el mar. Ahora veremos la explicación formal para aprender a distinguir siempre qué es una posición fija y qué es un movimiento.',
    hazInstruction: '−20 metros se lee “menos veinte metros”.',
    videoSrc: 'https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/110-7/MAT/110-7-MAT-OA01-L01-EXPLICACION.mp4',
    graphicPoster: '/visuals/posicion-movimiento.png',
    slides: [
      {
            "slideNumber": 1,
            "tituloMomento": "Objetivo de la Lección",
            "didacticPurpose": "Objetivo de la Lección",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing before a bright interactive digital whiteboard presenting the core lesson goal with clear diagram pillars. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Objetivo: Distinguir posición y movimiento desde el cero",
            "overlayTitle": "Objetivo",
            "overlaySubtitle": "Distinguir posición y movimiento desde el cero",
            "vectorialOverlayPptx": "Sin rótulo adicional (la diapositiva presenta únicamente el Título de 64 pt y el Objetivo en Subtítulo de 36 pt sobre la ilustración limpia)",
            "mathOverlayPptx": "Sin rótulo adicional (la diapositiva presenta únicamente el Título de 64 pt y el Objetivo en Subtítulo de 36 pt sobre la ilustración limpia)",
            "speakerNotes": "El objetivo de hoy es aprender a distinguir con total claridad dos ideas fundamentales: qué es una posición y qué es un movimiento respecto de un punto cero.",
            "palabrasAprox": 28,
            "duracionSeg": 12
      },
      {
            "slideNumber": 2,
            "tituloMomento": "Qué es una Posición",
            "didacticPurpose": "Formalización Conceptual",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, examining an illuminated vertical depth axis with a luminous reference origin, the girl noting details in her binder. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Posición: Dónde se encuentra un objeto",
            "overlayTitle": "Concepto: Posición",
            "overlaySubtitle": "Lugar exacto respecto del punto cero",
            "vectorialOverlayPptx": "Eje de referencia: Marca fija en −20 metros con etiqueta \"Ubicación\"",
            "mathOverlayPptx": "Eje de referencia: Marca fija en −20 metros con etiqueta \"Ubicación\"",
            "speakerNotes": "Una posición indica el lugar exacto donde se encuentra un objeto en un momento determinado, medido siempre en relación con un punto de referencia fijo como el mar.",
            "palabrasAprox": 28,
            "duracionSeg": 13
      },
      {
            "slideNumber": 3,
            "tituloMomento": "Conexión: −20 metros es una Posición",
            "didacticPurpose": "Conexión Didáctica Explícita",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, inspecting the stationary submarine sensor display inside the cabin, confirming a fixed coordinate reading. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Posición fija: −20 metros respecto al mar",
            "overlayTitle": "Posición: Dónde está",
            "overlaySubtitle": "−20 metros indica la ubicación exacta",
            "vectorialOverlayPptx": "Cota de posición fija: Ubicación h = −20 metros bajo el nivel cero",
            "mathOverlayPptx": "Cota de posición fija: Ubicación h = −20 metros bajo el nivel cero",
            "speakerNotes": "En la situación observada, el submarino se encuentra a menos veinte metros. Menos veinte metros es una posición fija, porque responde con exactitud dónde se encuentra respecto del cero.",
            "palabrasAprox": 28,
            "duracionSeg": 13
      },
      {
            "slideNumber": 4,
            "tituloMomento": "Qué es un Movimiento",
            "didacticPurpose": "Formalización Conceptual",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, sketching a directional motion vector on a transparent glowing panel, gesturing along the trajectory. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Movimiento: Cómo cambia de lugar",
            "overlayTitle": "Concepto: Movimiento",
            "overlaySubtitle": "Cambio de lugar, dirección y magnitud",
            "vectorialOverlayPptx": "Vector direccional con flecha orientada y magnitud de cambio",
            "mathOverlayPptx": "Vector direccional con flecha orientada y magnitud de cambio",
            "speakerNotes": "Un movimiento describe una acción de cambio de lugar. No indica una ubicación fija, sino hacia qué dirección se traslada el objeto y qué distancia recorre al moverse.",
            "palabrasAprox": 28,
            "duracionSeg": 13
      },
      {
            "slideNumber": 5,
            "tituloMomento": "Conexión: Bajar y Subir son Movimientos",
            "didacticPurpose": "Conexión Didáctica Explícita",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, tracking ascending and descending flow vectors on an interactive marine navigation screen. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Movimiento: Bajar y subir son desplazamientos",
            "overlayTitle": "Movimiento: Cómo cambia",
            "overlaySubtitle": "Bajar y subir son movimientos",
            "vectorialOverlayPptx": "Vectores de desplazamiento: Bajar 15 metros (vector descendente) y Subir 8 metros (vector ascendente)",
            "mathOverlayPptx": "Vectores de desplazamiento: Bajar 15 metros (vector descendente) y Subir 8 metros (vector ascendente)",
            "speakerNotes": "Bajar quince metros y subir ocho metros son movimientos. No nos dicen dónde está el submarino, sino cómo cambia de lugar, la dirección y cuánto se desplaza.",
            "palabrasAprox": 27,
            "duracionSeg": 13
      },
      {
            "slideNumber": 6,
            "tituloMomento": "Comparación Lado a Lado",
            "didacticPurpose": "Contraste y Sistematización",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, comparing side-by-side holographic columns showing fixed location coordinates on one side and motion arrows on the other. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Ubicación fija frente a Desplazamiento activo",
            "overlayTitle": "Comparación directa",
            "overlaySubtitle": "−20 m es posición | Desplazamientos son movimientos",
            "vectorialOverlayPptx": "Tabla comparativa: Posición (−20 metros, ¿dónde está?) vs Movimiento (bajar y subir, ¿cómo cambia?)",
            "mathOverlayPptx": "Tabla comparativa: Posición (−20 metros, ¿dónde está?) vs Movimiento (bajar y subir, ¿cómo cambia?)",
            "speakerNotes": "Menos veinte metros es una posición fija que indica dónde está el submarino. En cambio, bajar y subir son movimientos con sentido y magnitud que modifican esa posición.",
            "palabrasAprox": 28,
            "duracionSeg": 13
      },
      {
            "slideNumber": 7,
            "tituloMomento": "Regla de Oro y Pase a Práctica",
            "didacticPurpose": "Síntesis y Regla de Oro",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, sitting side by side with open notebooks, smiling warmly before their clean study console. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Regla: Posición = Ubicación | Movimiento = Desplazamiento",
            "overlayTitle": "Regla de Oro: Síntesis",
            "overlaySubtitle": "Posición = Dónde está | Movimiento = Desplazamiento",
            "vectorialOverlayPptx": "Esquema de síntesis: Punto cero -> Posición (−20 metros) vs Desplazamiento (bajar o subir)",
            "mathOverlayPptx": "Esquema de síntesis: Punto cero -> Posición (−20 metros) vs Desplazamiento (bajar o subir)",
            "speakerNotes": "Posición indica dónde se encuentra un valor y movimiento describe cómo cambia de lugar. ¡Con esta regla de oro pasamos a la práctica en la plataforma!",
            "palabrasAprox": 26,
            "duracionSeg": 13
      }
]
  },

  postQuestions: [
    {
      context: 'Movimiento 1 de 2',
      question: 'La expresión “el submarino baja quince metros”, ¿representa una posición o un movimiento?',
      expected: 'Un movimiento.',
      success: '¡Correcto! Bajar quince metros representa un movimiento porque indica cómo cambia de lugar el submarino, la dirección y la distancia que recorre.',
      support: 'La palabra “baja” indica un cambio de lugar y “quince metros” indica la distancia recorrida. Con esta pista, responde la misma pregunta.',
      reveal: 'Representa un movimiento: el submarino cambia de lugar, baja y recorre quince metros.',
      studentReveal: 'Bajar 15 metros representa un movimiento.'
    },
    {
      context: 'Movimiento 2 de 2',
      question: 'La expresión “el submarino sube ocho metros”, ¿representa una posición o un movimiento?',
      expected: 'Un movimiento.',
      success: '¡Muy bien! Subir ocho metros representa un movimiento porque indica cómo cambia de lugar el submarino, la dirección y la distancia que recorre.',
      support: 'La palabra “sube” indica un cambio de lugar y “ocho metros” indica la distancia recorrida. Con esta pista, responde la misma pregunta.',
      reveal: 'Representa un movimiento: el submarino cambia de lugar, sube y recorre ocho metros.',
      studentReveal: 'Subir 8 metros representa un movimiento.'
    }
  ],

  // Paso 6: Práctica Conjunta
  practice: [
    {
      context: 'Temperatura',
      question: 'Un termómetro marca cuatro grados Celsius bajo cero. ¿Qué número entero representa esa temperatura?',
      expected: '−4',
      success: '¡Muy bien! El número entero es −4. El signo negativo indica que la temperatura está bajo cero.',
      support: 'Recuerda que las cantidades bajo cero se representan con un signo negativo. Conservamos el número 4 y agregamos ese signo. Entonces, ¿qué número entero representa la temperatura?',
      reveal: 'El número entero es −4: el 4 indica la cantidad de grados y el signo negativo indica que están bajo cero.',
      studentReveal: '−4',
      studentImage: '/images/lessons/clase1_termometro.svg'
    },
    {
      context: 'Ascensor',
      question: 'Un ascensor baja cinco pisos. En esta frase, ¿se está representando una posición o un movimiento?',
      expected: 'Un movimiento.',
      success: '¡Genial! Representa un movimiento porque indica cómo cambia de lugar el ascensor.',
      support: 'Fíjate en la palabra “baja”: indica que el ascensor cambia de lugar. Con esta pista, responde la misma pregunta.',
      reveal: 'Representa un movimiento porque “baja cinco pisos” indica cómo cambia de lugar el ascensor.',
      studentReveal: 'Un movimiento.',
      studentImage: '/images/lessons/clase1_ascensor.svg'
    },
    {
      context: 'Saldo de una cuenta',
      question: 'Si una cuenta bancaria tiene un saldo de menos cinco mil pesos, ¿qué significa el signo negativo?',
      expected: 'Significa que existe una deuda de cinco mil pesos.',
      success: '¡Excelente! En esta situación, el signo negativo indica que existe una deuda de cinco mil pesos.',
      support: 'En una cuenta bancaria, un saldo positivo indica dinero disponible y un saldo negativo indica una deuda. Con esta pista, ¿qué significa el signo negativo?',
      reveal: 'El signo negativo indica que existe una deuda de cinco mil pesos. Aquí su significado depende del contexto.',
      studentReveal: 'Existe una deuda de $5.000.',
      studentImage: '/images/lessons/clase1_banco.svg'
    }
  ],

  // Paso 7: Miniquiz y Recuperación
  mini: [
    {
      q: 'Un buzo se encuentra siete metros bajo la superficie del mar. Si la superficie representa el cero, ¿qué número entero representa la posición del buzo?',
      options: ['−7', '+7', '7'],
      correct: '−7',
      fixExplain: 'La superficie representa el cero. Como el buzo está siete metros debajo, usamos el signo negativo: la respuesta es −7.',
      dileReview: 'Pídele al estudiante que explique por qué eligió −7. Observen juntos que la superficie del mar es el cero y hacia abajo los valores llevan signo negativo.'
    },
    {
      q: 'Un ascensor sube seis pisos. Esta frase, ¿representa una posición o un movimiento?',
      options: ['Una posición', 'Un movimiento'],
      correct: 'Un movimiento',
      fixExplain: 'La palabra “sube” indica que el ascensor cambia de lugar. Por eso representa un movimiento.',
      dileReview: 'Pídele al estudiante que señale qué palabra de la frase indica que hay un cambio de lugar y no una posición fija.'
    },
    {
      q: 'En una cuenta bancaria aparece un saldo de −$8.000. ¿Qué situación representa ese saldo?',
      options: ['Hay $8.000 disponibles', 'Hay una deuda de $8.000', 'No hay dinero disponible ni una deuda'],
      correct: 'Hay una deuda de $8.000',
      fixExplain: 'En este contexto, el signo negativo indica una deuda. Por eso −$8.000 representa una deuda de $8.000.',
      dileReview: 'Pídele al estudiante que justifique por qué un saldo negativo en el banco representa una deuda y no dinero disponible.'
    }
  ],

  recovery: [
    {
      title: 'Posiciones bajo el punto de referencia',
      explain: 'Cuando una posición está debajo del punto de referencia, utilizamos un número negativo.',
      q: 'Una entrada está cinco metros bajo el nivel de la calle, que representa el cero. ¿Qué entero representa su posición?',
      options: ['−5', '+5'],
      correct: '−5',
      correctText: '¡Eso es! La posición se representa con −5.',
      fixText: 'La respuesta correcta es −5: el signo negativo indica que está bajo el punto de referencia.'
    },
    {
      title: 'Posición y movimiento',
      explain: 'Una posición dice dónde está algo. Un movimiento dice cómo cambia de lugar.',
      q: 'Un globo sube cuatro metros. ¿Representa una posición o un movimiento?',
      options: ['Una posición', 'Un movimiento'],
      correct: 'Un movimiento',
      correctText: '¡Eso es! Subir cuatro metros representa un movimiento.',
      fixText: 'La respuesta correcta es movimiento, porque “sube” indica un cambio de lugar.'
    },
    {
      title: 'Significado del signo negativo',
      explain: 'El significado del signo depende del contexto. En una temperatura, puede indicar que está bajo cero.',
      q: 'Una temperatura de −2 °C está…',
      options: ['Dos grados bajo cero', 'Dos grados sobre cero'],
      correct: 'Dos grados bajo cero',
      correctText: '¡Eso es! −2 °C significa dos grados bajo cero.',
      fixText: 'La respuesta correcta es dos grados bajo cero.'
    }
  ],

  summaryIdeas: [
    [
      '1 · Punto de referencia',
      'En cada situación identificamos un punto o valor de referencia y lo representamos con el número cero. Desde ese punto podemos determinar dónde se encuentra algo.'
    ],
    [
      '2 · Números positivos y negativos',
      'En los ejemplos de temperatura y profundidad, los valores sobre el punto de referencia se representaron con números positivos y los valores bajo ese punto, con números negativos. En una cuenta bancaria, positivo indica dinero disponible y negativo indica una deuda. El significado se interpreta según el contexto.'
    ],
    [
      '3 · Posición y movimiento',
      'Una posición indica dónde se encuentra algo respecto del punto de referencia. Por su parte, un movimiento indica cómo ese objeto o valor cambia de lugar, hacia dónde se mueve y qué distancia recorre.'
    ]
  ],

  // Desacoplamiento explícito de etapas pedagógicas
  interactive: {
    type: 'thermo',
    title: 'El cero como punto de referencia'
  },

  summaryText: 'En este recorrido usamos la superficie del mar como punto de referencia y la representamos con el número cero. Una posición indica dónde se encuentra algo respecto de ese punto; por eso, menos veinte metros representa la posición inicial del submarino. Un movimiento indica cómo cambia de lugar, hacia dónde se mueve y qué distancia recorre; por eso, bajar quince metros y subir ocho metros representan movimientos.',

  reasoning: {
    title: 'Comparemos dos situaciones',
    dileIntro: 'Antes de resumir, comparemos dos situaciones. No necesitas repetir una frase exacta: lo importante es que expliques la idea con tus propias palabras.',
    question: 'En una temperatura de −4 °C y en un saldo de −$4.000 aparece el signo negativo. ¿Significa lo mismo en las dos situaciones? Explica qué representa en cada una.',
    expectedAnswer: 'En −4 °C el signo indica una temperatura bajo cero y en −$4.000 indica una deuda.',
    context1: { label: 'TEMPERATURA', value: '−4 °C', desc: 'Cuatro grados bajo cero' },
    context2: { label: 'CUENTA BANCARIA', value: '−$4.000', desc: 'Un saldo negativo' },
    successFeedback: '¡Excelente razonamiento! Reconociste que el mismo signo puede comunicar ideas diferentes según la situación.',
    supportFeedback: 'Pensemos en cada situación por separado. En el termómetro, el cero separa temperaturas sobre y bajo cero. En la cuenta, el cero separa dinero disponible y deuda. Con esta pista, explica qué indica el signo negativo en cada caso.',
    revealText: 'No significa exactamente lo mismo. En −4 °C indica una temperatura de cuatro grados bajo cero. En −$4.000 indica una deuda de cuatro mil pesos. El signo negativo se interpreta según el contexto.'
  },

  challenge: {
    title: 'Desafío breve: Posición y movimiento',
    question: 'Una temperatura está en −2 °C y luego sube cinco grados. ¿Qué parte representa una posición y qué parte representa un movimiento? Explica cómo lo sabes.',
    expectedAnswer: '−2 °C representa la posición inicial; “sube cinco grados” representa el movimiento.',
    item1: { label: '−2 °C', tag: 'Posición inicial' },
    item2: { label: 'sube 5 grados', tag: 'Movimiento' },
    successFeedback: '¡Muy bien! −2 °C indica la posición inicial de la temperatura respecto del cero; “sube cinco grados” indica el movimiento o cambio.',
    supportFeedback: 'Revisémoslo juntos. −2 °C dice dónde está la temperatura al comenzar, por eso representa una posición. “Sube cinco grados” dice cómo cambia, por eso representa un movimiento.'
  },

  strategy: {
    title: 'Cómo analizar una situación',
    dileIntro: 'Cuando analices una situación con números enteros, puedes seguir tres pasos. Primero, identifica el punto de referencia. Luego, observa qué indica el signo en ese contexto. Finalmente, pregúntate si la información dice dónde se encuentra algo o cómo cambia.',
    steps: [
      { number: 1, title: 'Identifica', desc: '¿Cuál es el punto de referencia?' },
      { number: 2, title: 'Interpreta', desc: '¿Qué indica el signo en este contexto?' },
      { number: 3, title: 'Distingue', desc: '¿Dice dónde se encuentra algo o cómo cambia?' }
    ]
  },

  closure: {
    congratulations: '¡Felicitaciones! Hoy aprendiste que el cero puede funcionar como punto de referencia, que los signos positivo y negativo se interpretan de acuerdo con cada situación, y que una posición indica dónde se encuentra algo mientras un movimiento indica cómo cambia de lugar.',
    nextClassPreview: 'En la próxima clase ubicaremos números enteros en la recta numérica para saber dónde está cada uno y compararlos.'
  }
};
