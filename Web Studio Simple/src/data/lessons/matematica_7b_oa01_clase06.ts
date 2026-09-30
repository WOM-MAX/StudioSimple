import { LessonData } from '../../types/lesson';

export const MATEMATICA_7B_OA01_CLASE06: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Matemática',
    oaCode: 'OA 1',
    oaTitle: 'Números enteros',
    lessonNumber: 6,
    totalLessonsInOa: 6,
    lessonTitle: 'Resolución de problemas cotidianos y síntesis oficial',
    durationMinutes: 30,
    nextLessonTitle: 'Evaluación del Objetivo OA 1: Números enteros'
  },

  // Paso 1: Portada y Preparación
  prep: {
    adultObjective: 'Acompañar al estudiante a resolver problemas en diversos contextos cotidianos (saldos financieros, variaciones de temperatura, líneas de tiempo históricas y variaciones de altitud/profundidad) utilizando adiciones y sustracciones en Z, e interpretando el significado físico del signo en el resultado.',
    routeToday: 'Introducción → situación problema contextualizada → video gancho con dos registros reales → conversación guiada → video explicativo de modelamiento paso a paso → práctica guiada en tres contextos → estrategia de 4 pasos para resolver problemas → miniquiz formativo tipo MINEDUC → ticket de salida y celebración del objetivo.',
    mentorReminder: 'Sigue el orden indicado. Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
    reminders: [
      'Sigue el orden indicado.',
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'No leas los recuadros SOLO PARA TI ni AYUDA DE LECTURA.',
      'Haz cada pregunta y espera la respuesta antes de seleccionar una opción.',
      'Enfatiza la regla de oro: Signo + Contexto = Sentido. El número no termina en el cálculo; debe responder a la pregunta del problema con sus unidades correspondientes.',
      'Si el estudiante necesita apoyo, usa únicamente la ayuda que aparecerá.',
      'Celebra con entusiasmo la culminación del Objetivo de Aprendizaje 1.'
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
      { label: 'Definir el cero', sub: 'El punto de referencia según el contexto' },
      { label: 'Modelar con enteros', sub: 'Asignar signos + y − a variaciones y estados' },
      { label: 'Interpretar el resultado', sub: 'Traducir el signo a lenguaje cotidiano' }
    ],
    dileIntro: 'Hoy llegamos a la clase culminante de nuestra expedición en los números enteros: la Clase 6 de Matemática de séptimo básico.',
    dileObjective: 'En la clase de hoy aplicaremos todo lo aprendido a la resolución de problemas cotidianos: conectaremos cuentas bancarias, temperaturas y alturas con los números enteros, y aprenderemos a interpretar con total claridad qué significa el signo en cada contexto.'
  },

  situation: {
    dilePrompt: 'En una cuenta bancaria, una persona tiene un saldo de −$15.000 (debe 15 mil pesos). El día lunes recibe una transferencia de +$40.000 a su favor, y el día martes realiza una compra en el supermercado por $20.000. ¿Cuál es su saldo final al terminar el martes y qué significa ese resultado?',
    expectedAnswer: '+$5.000 a favor (tiene cinco mil pesos en su cuenta).',
    socraticHint: 'Primero suma (−15.000) + (+40.000) = +25.000. Luego réstale los $20.000 de la compra.',
    emotionalTip: 'Sigue el orden de los acontecimientos como si fuera tu propia cuenta de ahorros.',
    options: [
      {
        label: 'Respondió +$5.000 (saldo a favor)',
        kind: 'correct',
        feedbackText: '¡Brillante cálculo financiero! Pagó la deuda de 15.000, le quedaron 25.000 y tras la compra le sobraron $5.000 a favor.'
      },
      {
        label: 'Respondió −$5.000 (pensó que seguía debiendo)',
        kind: 'needs_support',
        feedbackText: 'Revisemos: la persona recibió 40.000 pesos. Con eso pagó los 15.000 y le sobraron 25.000. Al gastar 20.000, ¿le sobra dinero o le falta?'
      },
      {
        label: 'Duda o no sabe',
        kind: 'no_answer',
        feedbackText: 'Hagámoslo en dos pasos: (−15.000) + 40.000 = +25.000. Luego gastó 20.000: 25.000 − 20.000 = +5.000 a favor.'
      }
    ]
  },

  reference: {
    dilePrompt: 'Para resolver cualquier problema con enteros siempre seguimos cuatro pasos: 1) Definir qué representa el cero, 2) Asignar signos a los datos, 3) Operar matemáticamente, y 4) Responder en palabras explicando el significado del signo.',
    question: 'Si en un problema de temperatura el resultado es −4 °C, ¿cómo se responde en palabras completas?',
    expectedAnswer: 'La temperatura es de cuatro grados bajo cero.',
    socraticHint: 'El signo menos indica que se encuentra por debajo del punto de congelación (0 °C).',
    feedbackSuccess: '¡Exacto! El signo menos significa "bajo cero" en el contexto de temperaturas.',
    feedbackSupport: 'Recuerda que el cero en un termómetro es el punto de congelación; un número negativo significa grados bajo cero.'
  },

  // Paso 3: Video Gancho
  hook: {
    title: 'Dos realidades con signo: saldo financiero y temperatura',
    dileIntro: 'Ahora veremos un video donde nuestros dos exploradores comparan dos mediciones simultáneas en una estación marina: un saldo deudor bancario de −$8.000 y una temperatura exterior de −3 °C. Presta atención a cómo el cero tiene significados completamente distintos en cada caso.',
    hazInstruction: 'Observa cómo el signo adquiere sentido únicamente cuando se comprende el punto de referencia del contexto.',
    videoSrc: '',
    focusPoints: [
      'Qué representa el cero en una cuenta bancaria frente a un termómetro.',
      'Cómo un depósito de $12.000 revierte un saldo deudor de −$8.000.',
      'Cómo un aumento de 5 °C hace pasar una temperatura de −3 °C a +2 °C.'
    ],
    dileAfterVideo: 'El video nos demuestra que las matemáticas cobran vida cuando conectamos la cifra con la situación real. Ahora analizaremos cómo formalizar esta estrategia.',
    slides: [
      {
            "slideNumber": 1,
            "tituloMomento": "Revisión de Balances en la Estación",
            "didacticPurpose": "Apertura y Enfoque",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, sitting at the central mission desk examining digital financial spreadsheets and weather logs. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Misión 6: Los enteros en la vida real",
            "overlayTitle": "Misión 6: Vida real",
            "overlaySubtitle": "Finanzas, temperaturas y resolución de problemas",
            "vectorialOverlayPptx": "Rótulo de inicio: Panel de control de aplicaciones en Z",
            "mathOverlayPptx": "Rótulo de inicio: Panel de control de aplicaciones en Z",
            "speakerNotes": "En la estación de control, los dos exploradores revisan registros de cuentas corrientes bancarias y mediciones térmicas ambientales.",
            "palabrasAprox": 18,
            "duracionSeg": 8
      },
      {
            "slideNumber": 2,
            "tituloMomento": "Deuda Bancaria: Signo Negativo",
            "didacticPurpose": "Contextualización Financiera",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, analyzing a bank account statement showing an initial negative balance of eight thousand pesos. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Saldo inicial en cuenta: −$8.000 (Deuda)",
            "overlayTitle": "Deuda financiera",
            "overlaySubtitle": "Saldo deudor representado como número negativo",
            "vectorialOverlayPptx": "Balance bancario: Saldo inicial = −$8.000",
            "mathOverlayPptx": "Balance bancario: Saldo inicial = −$8.000",
            "speakerNotes": "El saldo financiero parte en menos ocho mil pesos. El signo negativo indica una deuda contraída con el banco.",
            "palabrasAprox": 19,
            "duracionSeg": 8
      },
      {
            "slideNumber": 3,
            "tituloMomento": "Depósito Bancario: Signo Positivo",
            "didacticPurpose": "Operación de Compensación",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, watching the bank screen update as a deposit of twelve thousand pesos clears the debt and adds credit. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Depósito de +$12.000 -> Saldo final: +$4.000 a favor",
            "overlayTitle": "Depósito bancario",
            "overlaySubtitle": "(−$8.000) + (+$12.000) = +$4.000 a favor",
            "vectorialOverlayPptx": "Operación financiera: −8.000 + 12.000 = +4.000",
            "mathOverlayPptx": "Operación financiera: −8.000 + 12.000 = +4.000",
            "speakerNotes": "Al depositar doce mil pesos en efectivo, se cancela la deuda y queda un saldo favorable de cuatro mil pesos.",
            "palabrasAprox": 20,
            "duracionSeg": 8
      },
      {
            "slideNumber": 4,
            "tituloMomento": "Temperatura Exterior Bajo Cero",
            "didacticPurpose": "Contextualización Térmica",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, inspecting an outdoor weather telemetry sensor showing frost crystals and minus three degrees Celsius. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Temperatura matutina: −3 °C bajo cero",
            "overlayTitle": "Bajo cero",
            "overlaySubtitle": "Tres grados bajo el punto de congelación",
            "vectorialOverlayPptx": "Termómetro ambiental: Cota fija en −3 °C",
            "mathOverlayPptx": "Termómetro ambiental: Cota fija en −3 °C",
            "speakerNotes": "En el exterior de la base, el termómetro marca tres grados bajo cero antes de salir el sol.",
            "palabrasAprox": 18,
            "duracionSeg": 9
      },
      {
            "slideNumber": 5,
            "tituloMomento": "Aumento Térmico con el Sol",
            "didacticPurpose": "Variación Térmica",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, looking through the window as morning sun warms the station, seeing the mercury rise five degrees. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Aumento de +5 °C -> Temperatura final: +2 °C",
            "overlayTitle": "Ascenso térmico",
            "overlaySubtitle": "(−3 °C) + (+5 °C) = +2 °C sobre cero",
            "vectorialOverlayPptx": "Variación en termómetro: −3 °C + 5 °C = +2 °C",
            "mathOverlayPptx": "Variación en termómetro: −3 °C + 5 °C = +2 °C",
            "speakerNotes": "Cuando el sol ilumina la estación, la temperatura aumenta cinco grados, alcanzando dos grados positivos sobre el cero.",
            "palabrasAprox": 18,
            "duracionSeg": 9
      },
      {
            "slideNumber": 6,
            "tituloMomento": "El Significado del Cero en Cada Caso",
            "didacticPurpose": "Sentido Relativo del Cero",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, comparing side by side a bank screen with zero balance and a thermometer with zero freezing point. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "El cero depende del contexto: Saldo nulo vs Congelación",
            "overlayTitle": "El cero en contexto",
            "overlaySubtitle": "El punto de referencia define el sentido de la magnitud",
            "vectorialOverlayPptx": "Comparación contextual: 0 pesos (ni debe ni tiene) vs 0 °C (congelación)",
            "mathOverlayPptx": "Comparación contextual: 0 pesos (ni debe ni tiene) vs 0 °C (congelación)",
            "speakerNotes": "Ambos casos usan números enteros, pero el punto cero representa cosas distintas: saldo monetario nulo o congelación del agua.",
            "palabrasAprox": 19,
            "duracionSeg": 9
      },
      {
            "slideNumber": 7,
            "tituloMomento": "Desafío de la Lección",
            "didacticPurpose": "Pregunta Detonante y Síntesis",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, sitting together at the clean study table with their notebooks open, confident and ready for the synthesis. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Desafío: ¿Cómo traducir problemas reales a cálculos en Z?",
            "overlayTitle": "Desafío de la lección",
            "overlaySubtitle": "Signo + Contexto = Sentido real",
            "vectorialOverlayPptx": "Síntesis relacional directa: Signo + Contexto = Sentido real",
            "mathOverlayPptx": "Síntesis relacional directa: Signo + Contexto = Sentido real",
            "speakerNotes": "En la lección conectaremos cada cálculo formal con su significado real en diversas situaciones prácticas del mundo cotidiano.",
            "palabrasAprox": 18,
            "duracionSeg": 9
      }
]
  },

  // Paso 4: Conversación Guiada
  preQuestions: [
    {
      context: 'El cero en las finanzas',
      question: 'En una cuenta bancaria, ¿qué situación representa exactamente el número cero?',
      expected: 'No tener deuda ni tener dinero a favor (saldo equilibrado en $0).',
      success: '¡Excelente! Cero significa estar al día: ni debes dinero ni tienes dinero sobrante.',
      support: 'Si los positivos son dinero propio y los negativos son deudas, ¿qué hay justo al centro?',
      reveal: 'El cero representa no deber nada y no tener ahorros: saldo neutro.',
      studentReveal: 'No tener deudas ni dinero a favor.',
      studentImage: '/images/lessons/clase6_cero_bancario.svg'
    },
    {
      context: 'El cero en la temperatura',
      question: 'En la escala de grados Celsius, ¿qué fenómeno físico representa el número cero?',
      expected: 'El punto en que el agua se congela (punto de congelación).',
      success: '¡Muy bien! Cero grados marca la congelación del agua: bajo cero es hielo y sobre cero es líquido.',
      support: 'Piensa en el agua y el hielo: ¿a qué temperatura se congela el agua?',
      reveal: 'El cero representa el punto de congelación del agua a nivel del mar.',
      studentReveal: 'El punto de congelación del agua.',
      studentImage: '/images/lessons/clase6_cero_congelacion.svg'
    }
  ],

  conversationContext: 'Revisaremos cómo resolver problemas paso a paso articulando cálculo matemático y redacción de respuestas contextualizadas.',

  // Paso 5: Explicación y Formalización
  formalization: {
    title: 'Modelamiento y resolución de problemas con números enteros',
    concept: 'Resolución de problemas en contextos cotidianos',
    summary: 'Para resolver problemas con números enteros se aplica el principio "Signo + Contexto = Sentido": 1) Identificar el punto de referencia (el cero). 2) Expresar los datos como números enteros positivos (+) o negativos (−). 3) Plantear y resolver la adición o sustracción formal. 4) Interpretar la respuesta final en el lenguaje del contexto (deuda, saldo a favor, bajo cero, sobre el nivel del mar).',
    ideaClave: 'Signo + Contexto = Sentido. El signo indica la dirección respecto del punto cero elegido en cada situación real.',
    dileIntro: 'Ahora veremos el video de explicación formal. Aprenderemos cómo se resuelven paso a paso los dos casos reales: el saldo bancario (−8.000 + 12.000 = +4.000) y la temperatura (−3 °C + 5 °C = +2 °C).',
    hazInstruction: 'Fíjate en cómo cada número lleva siempre su unidad de medida y cómo el signo final se traduce a palabras.',
    videoSrc: '',
    slides: [
      {
            "slideNumber": 1,
            "tituloMomento": "Objetivo de la Lección",
            "didacticPurpose": "Objetivo de la Lección",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing before the smartboard showing real-world applications in finance, meteorology, and science. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Objetivo: Sumar y restar enteros en contexto",
            "overlayTitle": "Objetivo",
            "overlaySubtitle": "Sumar y restar enteros en contexto",
            "vectorialOverlayPptx": "Sin rótulo adicional (la diapositiva presenta únicamente el Título de 64 pt y el Objetivo en Subtítulo de 36 pt sobre la ilustración limpia)",
            "mathOverlayPptx": "Sin rótulo adicional (la diapositiva presenta únicamente el Título de 64 pt y el Objetivo en Subtítulo de 36 pt sobre la ilustración limpia)",
            "speakerNotes": "El objetivo de hoy es consolidar la resolución de problemas cotidianos aplicando adiciones y sustracciones de números enteros e interpretando el resultado según el contexto.",
            "palabrasAprox": 24,
            "duracionSeg": 12
      },
      {
            "slideNumber": 2,
            "tituloMomento": "Paso 1: Identificar el Cero y Asignar Signos",
            "didacticPurpose": "Modelación Inicial",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, reading a problem prompt on the board and marking the reference point zero with a highlighter. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Paso 1: Determinar el cero de referencia y signos clave",
            "overlayTitle": "Paso 1: Punto cero",
            "overlaySubtitle": "Definir origen y asignar signo correspondiente",
            "vectorialOverlayPptx": "Guía metódica: 1. Identificar referencia 0 | 2. Asignar signo a datos",
            "mathOverlayPptx": "Guía metódica: 1. Identificar referencia 0 | 2. Asignar signo a datos",
            "speakerNotes": "Para resolver un problema con enteros debemos primero identificar el punto cero de referencia y traducir las expresiones del enunciado a valores numéricos con signo correspondiente.",
            "palabrasAprox": 26,
            "duracionSeg": 13
      },
      {
            "slideNumber": 3,
            "tituloMomento": "Paso 2: Plantear la Operación Matemática",
            "didacticPurpose": "Planteamiento Matemático",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, writing out the financial calculation (−8000) + (+12000) on their digital study pad. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Paso 2: Plantear la operación: (−$8.000) + (+$12.000)",
            "overlayTitle": "Paso 2: Operación",
            "overlaySubtitle": "Traducir deuda y abono a adición",
            "vectorialOverlayPptx": "Ecuación planteada: Deuda (−8.000) + Depósito (+12.000)",
            "mathOverlayPptx": "Ecuación planteada: Deuda (−8.000) + Depósito (+12.000)",
            "speakerNotes": "En el caso financiero, una deuda representa un número negativo y un depósito representa un valor positivo. Por eso planteamos menos ocho mil sumado con doce mil pesos.",
            "palabrasAprox": 28,
            "duracionSeg": 13
      },
      {
            "slideNumber": 4,
            "tituloMomento": "Paso 3: Calcular e Interpretar el Resultado",
            "didacticPurpose": "Interpretación en Contexto",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, pointing to the final bank balance of plus four thousand, confirming what it means in practical terms. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Paso 3: Resultado +$4.000 -> Significa saldo a favor",
            "overlayTitle": "Paso 3: Interpretación",
            "overlaySubtitle": "Signo positivo indica saldo a favor",
            "vectorialOverlayPptx": "Interpretación: +4.000 pesos = Saldo disponible en cuenta",
            "mathOverlayPptx": "Interpretación: +4.000 pesos = Saldo disponible en cuenta",
            "speakerNotes": "Al operar obtenemos más cuatro mil pesos. Traducido a la realidad, esto significa que la cuenta bancaria queda saldada con saldo a favor del usuario registrado en el sistema.",
            "palabrasAprox": 29,
            "duracionSeg": 13
      },
      {
            "slideNumber": 5,
            "tituloMomento": "Paso 4: Sustracción en Contexto Térmico",
            "didacticPurpose": "Modelamiento de Sustracción",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, calculating thermal range on a vertical wall thermometer between a maximum of plus ten and a minimum of minus two degrees. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Sustracción térmica: (+10 °C) − (−2 °C) = 12 °C",
            "overlayTitle": "Paso 4: Sustracción",
            "overlaySubtitle": "Calcular variación: (+10 °C) − (−2 °C)",
            "vectorialOverlayPptx": "Cálculo de sustracción: 10 − (−2) = 10 + 2 = 12 °C sobre el termómetro",
            "mathOverlayPptx": "Cálculo de sustracción: 10 − (−2) = 10 + 2 = 12 °C sobre el termómetro",
            "speakerNotes": "Para calcular la variación térmica entre una máxima de diez grados y una mínima de menos dos grados, restamos diez menos menos dos, obteniendo doce grados de cambio total.",
            "palabrasAprox": 29,
            "duracionSeg": 13
      },
      {
            "slideNumber": 6,
            "tituloMomento": "Interpretación de la Sustracción en Contexto",
            "didacticPurpose": "Interpretación de la Sustracción",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, measuring the total 12-degree bracket spanning from minus two up to plus ten on the weather chart. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Interpretación: 12 °C de diferencia entre extremos",
            "overlayTitle": "Interpretación de resta",
            "overlaySubtitle": "12 °C representa la amplitud térmica total",
            "vectorialOverlayPptx": "Termómetro vertical con cota: Distancia neta de 12 grados entre −2 °C y +10 °C",
            "mathOverlayPptx": "Termómetro vertical con cota: Distancia neta de 12 grados entre −2 °C y +10 °C",
            "speakerNotes": "El resultado de doce grados no indica una temperatura fija, sino la amplitud térmica total recorrida entre los dos extremos medidos en la estación meteorológica.",
            "palabrasAprox": 26,
            "duracionSeg": 13
      },
      {
            "slideNumber": 7,
            "tituloMomento": "Regla de Oro y Pase a Práctica",
            "didacticPurpose": "Síntesis y Regla de Oro",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing proudly at the study desk with notebooks closed, ready for the comprehensive interactive test. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Regla de Oro: Cero -> Signos -> Operación -> Interpretación",
            "overlayTitle": "Regla de Oro: Síntesis",
            "overlaySubtitle": "Identificar cero, signos, calcular e interpretar",
            "vectorialOverlayPptx": "Ciclo metodológico completo de 4 pasos para resolver en Z",
            "mathOverlayPptx": "Ciclo metodológico completo de 4 pasos para resolver en Z",
            "speakerNotes": "Identifica el cero, asigna signos con rigor, calcula la operación e interpreta el resultado en contexto. ¡Con esta regla de oro pasamos a la práctica en la plataforma!",
            "palabrasAprox": 27,
            "duracionSeg": 13
      }
]
  },

  postQuestions: [
    {
      context: 'Interpretación de resultado financiero',
      question: 'Si una persona resuelve una operación de su cuenta y obtiene −$18.000, ¿qué significa ese resultado?',
      expected: 'Significa que tiene una deuda de $18.000.',
      success: '¡Exacto! El signo negativo en una cuenta bancaria representa deuda o saldo negativo.',
      support: 'El signo menos indica que debe dinero al banco.',
      reveal: 'Significa que debe $18.000 pesos.',
      studentReveal: 'Tiene una deuda de $18.000.'
    },
    {
      context: 'Interpretación de temperatura',
      question: 'Si el termómetro marca +5 °C y baja 8 °C durante la noche, ¿cuál es la temperatura final en palabras?',
      expected: 'Tres grados bajo cero (−3 °C).',
      success: '¡Excelente! (+5) − (+8) = −3 °C, lo que se lee "tres grados bajo cero".',
      support: 'Calcula 5 − 8 = −3. Traduce el signo menos al lenguaje del termómetro.',
      reveal: 'La temperatura final es de 3 °C bajo cero (−3 °C).',
      studentReveal: '3 °C bajo cero.'
    }
  ],

  // Paso 6: Práctica Conjunta y Guiada
  practice: [
    {
      context: 'Línea de tiempo histórica',
      question: 'El filósofo Aristóteles nació en el año 384 a.C. (−384) y murió en el año 322 a.C. (−322). Para saber cuántos años vivió, restamos el año de muerte menos el año de nacimiento: (−322) − (−384). ¿Cuántos años vivió?',
      expected: 'Vivió 62 años.',
      success: '¡Impecable! (−322) − (−384) = (−322) + (+384) = 62 años.',
      support: 'Transforma la resta en suma: (−322) + 384. Resta las magnitudes: 384 − 322.',
      reveal: 'Vivió 62 años ((−322) + 384 = 62).',
      studentReveal: 'Vivió 62 años.',
      studentImage: '/images/lessons/clase6_linea_tiempo_historia.svg'
    },
    {
      context: 'Diferencia geográfica extrema',
      question: 'El Monte Everest tiene una altitud de +8.848 metros y la Fosa de las Marianas tiene una profundidad de −10.994 metros. ¿Cuál es el desnivel total entre la cima del Everest y el fondo de la fosa? (Calcula: 8.848 − (−10.994)).',
      expected: '19.842 metros de desnivel total.',
      success: '¡Extraordinario! 8.848 − (−10.994) = 8.848 + 10.994 = 19.842 metros.',
      support: 'Restar un negativo suma las magnitudes: 8.848 + 10.994.',
      reveal: 'El desnivel total es de 19.842 metros.',
      studentReveal: '19.842 metros.',
      studentImage: '/images/lessons/clase6_desnivel_everest_marianas.svg'
    },
    {
      context: 'Presupuesto familiar',
      question: 'Una familia tenía un ahorro de $45.000. Tuvo que pagar una reparación de $60.000 y al día siguiente recibió un premio de $30.000. ¿Cuál es su estado financiero final?',
      expected: '+$15.000 a favor.',
      success: '¡Brillante! 45.000 − 60.000 = −15.000; luego (−15.000) + 30.000 = +15.000 pesos a favor.',
      support: 'Calcula primero 45.000 − 60.000 = −15.000 (deuda). Luego súmale los 30.000 de premio.',
      reveal: 'Tienen $15.000 de saldo a favor.',
      studentReveal: '+$15.000 a favor.',
      studentImage: '/images/lessons/clase6_presupuesto_familiar.svg'
    }
  ],

  // Síntesis y Razonamiento
  summaryIdeas: [
    [
      '1 · El cero depende de la situación',
      'En la vida real, el cero es una convención: nivel del mar en geografía, 0 °C en termometría, año del nacimiento de Cristo en la historia y saldo equilibrado en economía.'
    ],
    [
      '2 · Los enteros modelan aumentos y disminuciones',
      'Los números positivos representan ganancias, depósitos, alturas sobre el mar y temperaturas cálidas; los números negativos modelan deudas, retiros, profundidades y frío bajo cero.'
    ],
    [
      '3 · Signo + Contexto = Sentido',
      'Un problema matemático no termina con un número aislado; culmina cuando interpretamos qué significa el signo en la realidad investigada.'
    ]
  ],

  summaryText: 'En esta clase de síntesis culminamos el estudio del Objetivo de Aprendizaje 1 de números enteros. Demostramos que las matemáticas nos permiten modelar con precisión situaciones reales complejas: desde cuentas bancarias y presupuestos hasta desniveles geográficos y líneas de tiempo milenarias. Comprendimos que el cero es siempre el punto de referencia que define el sentido, y que cada cálculo adquiere su verdadero valor cuando interpretamos el signo en el lenguaje cotidiano.',

  reasoning: {
    title: '¿Por qué los números enteros revolucionaron el comercio y la ciencia?',
    dileIntro: 'Reflexionemos sobre la importancia histórica de los números enteros.',
    question: 'Antes de que se usaran los números enteros, los comerciantes tenían que llevar dos libros separados: uno para lo que tenían y otro para lo que debían. ¿Por qué el uso de números enteros positivos y negativos simplificó todo en un solo registro unificado?',
    expectedAnswer: 'Porque con los números enteros un solo signo (+ o −) permite saber si el dinero es propio o es deuda, y permite calcular saldos netos directamente mediante adición.',
    context1: { label: 'SISTEMA ANTIGUO', value: 'Dos libros separados', desc: 'Libro de haber y libro de deber' },
    context2: { label: 'CON ENTEROS', value: 'Un solo registro continuo', desc: 'Los signos + y − indican el estado exacto en una sola recta' },
    successFeedback: '¡Pensamiento histórico y matemático de alto nivel! Comprendiste el poder unificador de los enteros en la evolución humana.',
    supportFeedback: 'Piensa en tener todo en una sola línea donde avanzar es haber y retroceder es deber. ¿Cómo ayuda eso a calcular?',
    revealText: 'Los números enteros permitieron unificar activos y pasivos en una sola escala continua, facilitando el cálculo de balances netos con una simple adición.'
  },

  challenge: {
    title: 'Desafío Maestro del OA 1: El submarino científico',
    question: 'Un submarino está a −35 metros. Realiza una inmersión de 25 metros hacia abajo (−25 metros), y luego asciende 40 metros (+40 metros). ¿A qué profundidad se encuentra finalmente y cuántos metros le faltan para llegar a la superficie?',
    expectedAnswer: 'Se encuentra a −20 metros de profundidad y le faltan 20 metros para llegar a la superficie.',
    item1: { label: 'Posición final', tag: '−20 metros' },
    item2: { label: 'Metros a la superficie', tag: '20 metros' },
    successFeedback: '¡Magistral! (−35) + (−25) = −60; luego (−60) + (+40) = −20 metros. Le faltan exactamente 20 metros para emerger.',
    supportFeedback: 'Calcula: (−35) + (−25) = −60. Luego súmale +40. ¿En qué profundidad queda?'
  },

  strategy: {
    title: 'Los 4 pasos maestros para resolver problemas con enteros',
    dileIntro: 'Aplica siempre este método científico en cualquier evaluación:',
    steps: [
      { number: 1, title: 'Identifica el cero', desc: 'Determina cuál es el punto de referencia inicial o neutro de la situación.' },
      { number: 2, title: 'Asigna los signos', desc: 'Convierte cada dato en un entero: (+) para ganancias/ascensos, (−) para deudas/descensos.' },
      { number: 3, title: 'Resuelve la operación', desc: 'Plantea la adición o sustracción y resuélvela con las reglas formales de Z.' },
      { number: 4, title: 'Responde con sentido', desc: 'Escribe la respuesta en palabras explicando lo que el signo representa en la vida real.' }
    ]
  },

  // Paso 7: Evaluación Formativa (Miniquiz tipo MINEDUC)
  mini: [
    {
      id: 'q_1',
      q: 'En una ciudad del sur de Chile, la temperatura a las 6:00 AM era de −4 °C. Al mediodía la temperatura subió 9 °C. ¿Cuál fue la temperatura al mediodía?',
      options: [
        '+5 °C',
        '−13 °C',
        '+13 °C'
      ],
      correct: '+5 °C',
      fixExplain: '(−4) + (+9) = +5 °C. La temperatura subió superando el cero hasta los 5 grados sobre cero.',
      dileReview: 'Pídele al estudiante que calcule (−4) + 9.'
    },
    {
      id: 'q_2',
      q: 'Una persona tenía una deuda de $30.000 en su tarjeta (−30.000). Realizó un pago de $20.000 (+20.000) y luego una nueva compra de $15.000 (−15.000). ¿Cuál es su saldo final?',
      options: [
        '−$25.000 (debe $25.000)',
        '−$5.000 (debe $5.000)',
        '+$25.000 (saldo a favor)'
      ],
      correct: '−$25.000 (debe $25.000)',
      fixExplain: '(−30.000) + 20.000 = −10.000; luego (−10.000) + (−15.000) = −25.000 pesos.',
      dileReview: 'Pídele que sume las dos deudas: 30.000 + 15.000 = 45.000 de deuda, y le reste los 20.000 pagados.'
    },
    {
      id: 'q_3',
      q: 'Un dron despega desde una colina a +150 metros sobre el nivel del mar y sube 80 metros más. Luego desciende 120 metros. ¿A qué altitud final se encuentra respecto del nivel del mar?',
      options: [
        '+110 metros',
        '+150 metros',
        '+350 metros'
      ],
      correct: '+110 metros',
      fixExplain: '150 + 80 = 230; luego 230 − 120 = +110 metros sobre el nivel del mar.',
      dileReview: 'Pídele que calcule 150 + 80 − 120.'
    }
  ],

  // Paso 7b: Recuperación
  recovery: [
    {
      title: 'Identificar el signo correcto',
      explain: 'Si el resultado de un cálculo sobre el nivel del mar es positivo, el objeto está por encima del agua; si es negativo, está bajo el agua.',
      q: 'Un resultado da −15 metros. ¿Dónde se encuentra el objeto?',
      options: [
        '15 metros bajo el nivel del mar',
        '15 metros sobre el nivel del mar'
      ],
      correct: '15 metros bajo el nivel del mar',
      correctText: '¡Correcto! El signo negativo indica profundidad bajo el mar.',
      fixText: 'La respuesta correcta es 15 metros bajo el nivel del mar.'
    },
    {
      title: 'Variación neta',
      explain: 'Para saber el cambio total entre una temperatura máxima y mínima, se restan los valores: máxima menos mínima.',
      q: 'Si la máxima es 10 °C y la mínima es −2 °C, ¿cuál es la variación térmica?',
      options: [
        '12 °C',
        '8 °C'
      ],
      correct: '12 °C',
      correctText: '¡Exacto! 10 − (−2) = 10 + 2 = 12 °C.',
      fixText: 'La respuesta correcta es 12 °C porque 10 − (−2) = 12.'
    }
  ],

  // Paso 8: Cierre y Celebración del OA 1
  closure: {
    congratulations: '¡FELICITACIONES! Has completado las 6 clases del Objetivo de Aprendizaje 1 de Matemática de 7° Básico. Ahora dominas la representación, orden, adición, sustracción y resolución de problemas con números enteros.',
    nextClassPreview: 'Has finalizado exitosamente esta unidad. ¡Estás preparado para avanzar al siguiente Objetivo de Aprendizaje con la máxima solidez!'
  },

  interactive: {
    type: 'number_line',
    title: 'Simulador integral de situaciones reales en Z',
    description: 'Experimenta con problemas financieros, térmicos y geográficos modelados en la recta numérica universal.'
  }
};
