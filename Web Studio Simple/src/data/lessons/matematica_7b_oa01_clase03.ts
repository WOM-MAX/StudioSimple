import { LessonData } from '../../types/lesson';

export const MATEMATICA_7B_OA01_CLASE03: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Matemática',
    oaCode: 'OA 1',
    oaTitle: 'Números enteros',
    lessonNumber: 3,
    totalLessonsInOa: 6,
    lessonTitle: 'Valor absoluto y números opuestos',
    durationMinutes: 30,
    nextLessonTitle: 'Adición de enteros de igual y distinto signo'
  },

  // Paso 1: Portada y Preparación
  prep: {
    adultObjective: 'Acompañar al estudiante a comprender el concepto de valor absoluto como la distancia de un número entero al cero en la recta numérica (siempre no negativa) y a reconocer los números opuestos o simétricos que comparten la misma distancia pero ocupan lados contrarios.',
    routeToday: 'Introducción → conexión con mediciones simétricas → video gancho con boyas y sensores → conversación guiada → video explicativo formal → práctica guiada en tres contextos → estrategia para calcular valor absoluto → miniquiz formativo → ticket de salida y cierre.',
    mentorReminder: 'Sigue el orden indicado. Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
    reminders: [
      'Sigue el orden indicado.',
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'No leas los recuadros SOLO PARA TI ni AYUDA DE LECTURA.',
      'Haz cada pregunta y espera la respuesta antes de seleccionar una opción.',
      'Recuerda que el valor absoluto representa distancia física pura: nunca puede ser un valor negativo.',
      'Si el estudiante necesita apoyo, usa únicamente la ayuda que aparecerá.',
      'Valora el razonamiento del estudiante si explica la distancia con sus propias palabras.'
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
      { label: 'Distancia al cero', sub: 'El valor absoluto nunca es negativo' },
      { label: 'Números opuestos', sub: 'Misma distancia, lados contrarios' },
      { label: 'Suma de opuestos', sub: 'Se cancelan mutuamente dando cero' }
    ],
    dileIntro: 'Hoy continuamos con nuestra expedición en Matemática de séptimo básico. Avanzamos a la tercera clase de números enteros.',
    dileObjective: 'En la clase de hoy aprenderemos qué es el valor absoluto de un número entero, descubriremos por qué mide la distancia exacta hasta el cero sin importar el signo, y comprenderemos qué son los números opuestos y cómo se cancelan en la recta numérica.'
  },

  situation: {
    dilePrompt: 'En una estación meteorológica marina, dos sensores registran la posición de dos boyas respecto de la superficie del agua (cero). El sensor A marca +5 metros (sobre la superficie) y el sensor B marca −5 metros (bajo el agua). Si medimos con una huincha la distancia física en línea recta desde la superficie hasta cada boya, ¿cuál boya está más lejos del cero?',
    expectedAnswer: 'Están a la misma distancia, ambas están a 5 metros del cero.',
    socraticHint: 'Piensa en los metros de distancia pura que hay que recorrer para llegar al agua desde cada boya, sin importar si vas hacia arriba o hacia abajo.',
    emotionalTip: 'Recuerda que una distancia nunca es negativa: siempre medimos pasos o metros positivos.',
    options: [
      {
        label: 'Respondió que ambas están a la misma distancia (5 metros)',
        kind: 'correct',
        feedbackText: '¡Exacto! Aunque están en lados opuestos, la separación o distancia física respecto del agua es exactamente la misma: 5 metros.'
      },
      {
        label: 'Respondió que la boya A está más lejos porque es positiva',
        kind: 'needs_support',
        feedbackText: 'Fíjate en la cantidad de metros: desde 0 hasta +5 hay 5 metros. Desde 0 hasta −5 también hay 5 metros de profundidad. ¿La distancia es diferente o igual?'
      },
      {
        label: 'Duda o no sabe',
        kind: 'no_answer',
        feedbackText: 'Vamos paso a paso. Si nadas desde el cero hasta +5 avanzas 5 metros. Si buceas desde el cero hasta −5 avanzas 5 metros. Ambas boyas están separadas 5 metros del cero.'
      }
    ]
  },

  reference: {
    dilePrompt: 'El número cero actúa como un espejo en la recta numérica. Cuando dos números están a la misma distancia del cero pero en lados contrarios, decimos que son números opuestos.',
    question: 'Si un número está en el +7, ¿qué número está en el lado contrario a la misma distancia del cero?',
    expectedAnswer: 'El número −7',
    socraticHint: 'Mantiene la misma cantidad (7) pero con el signo contrario.',
    feedbackSuccess: '¡Muy bien! El número −7 es el opuesto de +7 porque ambos se encuentran a 7 unidades del cero.',
    feedbackSupport: 'Cuenta siete pasos hacia la izquierda desde el cero: llegarás exactamente al número −7.'
  },

  // Paso 3: Video Gancho
  hook: {
    title: 'La distancia al origen y los números opuestos',
    dileIntro: 'Ahora veremos un video donde nuestros dos jóvenes exploradores analizan dos mediciones en una estación de control: una a +5 metros y otra a −5 metros. Presta atención a cómo la distancia al cero es idéntica en ambas.',
    hazInstruction: 'Observa con atención cómo los signos indican dirección pero la distancia al cero coincide.',
    videoSrc: '',
    focusPoints: [
      'Cómo se reflejan las marcas de +5 y −5 a ambos lados del cero.',
      'Por qué la distancia al origen nunca es un valor negativo.',
      'Qué representa el símbolo de barras | | en matemáticas.'
    ],
    dileAfterVideo: 'El video nos muestra que +5 y −5 están a lados opuestos, pero ambos están a 5 unidades de distancia del cero. Ahora conversaremos sobre esta propiedad.',
    slides: [
      {
            "slideNumber": 1,
            "tituloMomento": "Estación de Sensores Marítimos",
            "didacticPurpose": "Apertura y Enfoque",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, checking electronic sensor calibration meters on the outer deck of a marine research station. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Misión 3: Las dos boyas simétricas",
            "overlayTitle": "Misión 3: Boyas simétricas",
            "overlaySubtitle": "Monitoreo en estación oceanográfica",
            "vectorialOverlayPptx": "Rótulo de inicio: Nivel del agua Profundidad de referencia: 0 metros",
            "mathOverlayPptx": "Rótulo de inicio: Nivel del agua Profundidad de referencia: 0 metros",
            "speakerNotes": "En la estación oceanográfica, nuestros dos jóvenes exploradores calibran sensores marítimos colocados a diferentes alturas y profundidades marinas.",
            "palabrasAprox": 18,
            "duracionSeg": 8
      },
      {
            "slideNumber": 2,
            "tituloMomento": "Alturas y Profundidades Opuestas",
            "didacticPurpose": "Simetría Respecto al Origen",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, looking through ocean binoculars, observing a floating sensor buoy and a submerged underwater pod. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Boya aérea: +5 metros | Sensor sumergido: −5 metros",
            "overlayTitle": "Medición de los dos sensores",
            "overlaySubtitle": "Boya aérea: +5 metros | Pod sumergido: −5 metros",
            "vectorialOverlayPptx": "Eje vertical con línea de flotación cero y marcas en +5 y −5",
            "mathOverlayPptx": "Eje vertical con línea de flotación cero y marcas en +5 y −5",
            "speakerNotes": "Una boya flota a cinco metros sobre el agua y un sensor sumergido opera a cinco metros de profundidad.",
            "palabrasAprox": 19,
            "duracionSeg": 8
      },
      {
            "slideNumber": 3,
            "tituloMomento": "Distintos Signos, Misma Posición Relativa",
            "didacticPurpose": "Lectura de Coordenadas",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, recording sensor readings on their waterproof tablets, highlighting the opposite signs of +5 and −5. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Signos opuestos respecto al nivel cero",
            "overlayTitle": "Signos contrarios",
            "overlaySubtitle": "+5 y −5 indican direcciones contrarias",
            "vectorialOverlayPptx": "Cotas punteadas simétricas respecto a la marca horizontal cero",
            "mathOverlayPptx": "Cotas punteadas simétricas respecto a la marca horizontal cero",
            "speakerNotes": "El sensor submarino marca menos cinco y la boya superficial marca más cinco respecto del nivel del agua.",
            "palabrasAprox": 18,
            "duracionSeg": 8
      },
      {
            "slideNumber": 4,
            "tituloMomento": "La Misma Distancia Física",
            "didacticPurpose": "Concepto de Distancia Escalar",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, holding a luminous digital measuring tape, measuring exactly five meters from the water surface to each sensor. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Ambos sensores están a 5 metros de distancia del cero",
            "overlayTitle": "Distancia equivalente",
            "overlaySubtitle": "Ambos sensores distan 5 metros de la superficie",
            "vectorialOverlayPptx": "Segmentos de cota acotados: |+5| = 5 metros y |−5| = 5 metros",
            "mathOverlayPptx": "Segmentos de cota acotados: |+5| = 5 metros y |−5| = 5 metros",
            "speakerNotes": "Aunque sus signos son opuestos, ambos dispositivos se encuentran situados a la misma distancia de la superficie del agua.",
            "palabrasAprox": 19,
            "duracionSeg": 9
      },
      {
            "slideNumber": 5,
            "tituloMomento": "Nace el Concepto de Valor Absoluto",
            "didacticPurpose": "Definición Intuitiva",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, illuminating a geometric diagram on their monitor where sign arrows disappear leaving pure magnitude bars. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Valor absoluto = Distancia de un número al cero",
            "overlayTitle": "El valor absoluto",
            "overlaySubtitle": "Distancia geométrica pura sin considerar el signo",
            "vectorialOverlayPptx": "Notación gráfica de barras: |−5| = 5 y |+5| = 5",
            "mathOverlayPptx": "Notación gráfica de barras: |−5| = 5 y |+5| = 5",
            "speakerNotes": "La distancia física entre cualquier número y el punto cero se denomina valor absoluto en el lenguaje matemático formal.",
            "palabrasAprox": 19,
            "duracionSeg": 9
      },
      {
            "slideNumber": 6,
            "tituloMomento": "Las Distancias Siempre son Positivas",
            "didacticPurpose": "No Negatividad de la Distancia",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, verifying measurement formulas on the screen, nodding in agreement about distance always being positive or zero. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "La distancia nunca es negativa: |a| ≥ 0",
            "overlayTitle": "Magnitud no negativa",
            "overlaySubtitle": "Una distancia nunca puede ser negativa",
            "vectorialOverlayPptx": "Propiedad formal destacada: |a| ≥ 0 para todo número a en Z",
            "mathOverlayPptx": "Propiedad formal destacada: |a| ≥ 0 para todo número a en Z",
            "speakerNotes": "Como las distancias nunca pueden ser negativas, el valor absoluto siempre entrega como resultado un valor positivo o cero.",
            "palabrasAprox": 19,
            "duracionSeg": 9
      },
      {
            "slideNumber": 7,
            "tituloMomento": "Desafío de la Lección",
            "didacticPurpose": "Pregunta Detonante y Síntesis",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing together by the control desk with pens poised, ready to formalize absolute value and opposites. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Desafío: ¿Qué propiedades tienen los números opuestos?",
            "overlayTitle": "Desafío de la lección",
            "overlaySubtitle": "Formalización de simetría y valor absoluto",
            "vectorialOverlayPptx": "Diagrama de síntesis: Origen 0 con flechas simétricas opuestas",
            "mathOverlayPptx": "Diagrama de síntesis: Origen 0 con flechas simétricas opuestas",
            "speakerNotes": "En la lección formalizaremos qué son los números opuestos y cómo calcular con total precisión el valor absoluto.",
            "palabrasAprox": 18,
            "duracionSeg": 9
      }
]
  },

  // Paso 4: Conversación Guiada
  preQuestions: [
    {
      context: 'Distancia al origen',
      question: 'En el video, ¿cuántas unidades de distancia separan al número −5 del cero?',
      expected: 'Cinco unidades de distancia.',
      success: '¡Excelente! La distancia es exactamente 5 unidades. Recuerda que al medir distancias nunca usamos signo negativo.',
      support: 'Cuenta cuántos pasos hay desde el cero hacia la izquierda hasta llegar a −5. ¿Cuántos pasos dista del cero?',
      reveal: 'El número −5 está a exactamente 5 unidades de distancia del cero. A esa distancia la llamamos valor absoluto.',
      studentReveal: 'Está a 5 unidades de distancia del cero.',
      studentImage: '/images/lessons/clase3_distancia_cero.svg'
    },
    {
      context: 'Concepto de números opuestos',
      question: 'Si dos números tienen signos distintos pero están a la misma distancia del cero, ¿cómo se llaman?',
      expected: 'Números opuestos o simétricos.',
      success: '¡Exacto! Se llaman números opuestos o simétricos porque ocupan posiciones opuestas respecto del origen.',
      support: 'Piensa en la palabra que describe estar en el lado contrario: están en lados... Con esta pista, ¿cómo se llaman?',
      reveal: 'Se llaman números opuestos. Por ejemplo, +5 y −5 son números opuestos.',
      studentReveal: 'Se llaman números opuestos.',
      studentImage: '/images/lessons/clase3_numeros_opuestos.svg'
    }
  ],

  conversationContext: 'Revisaremos la distancia de los números enteros al cero y cómo la notación de barras define el valor absoluto.',

  // Paso 5: Explicación y Formalización
  formalization: {
    title: 'Valor absoluto y números opuestos en la recta numérica',
    concept: 'Valor absoluto y números opuestos',
    summary: 'El valor absoluto de un número entero representa la distancia que lo separa del cero en la recta numérica. Se escribe entre barras verticales y siempre es un número no negativo: |−5| = 5 y |+5| = 5. Dos números son opuestos cuando tienen signos diferentes pero el mismo valor absoluto, y su suma siempre es igual a cero.',
    ideaClave: 'El valor absoluto mide distancia al cero y nunca es negativo; dos números opuestos tienen igual valor absoluto pero signos distintos.',
    dileIntro: 'Ahora veremos el video de explicación formal. Aprenderemos cómo se escribe el valor absoluto con barras y por qué sumar dos números opuestos siempre da cero.',
    hazInstruction: 'Presta atención a la regla: el valor absoluto mide distancia, mientras que el signo indica la dirección.',
    videoSrc: '',
    slides: [
      {
            "slideNumber": 1,
            "tituloMomento": "Objetivo de la Lección",
            "didacticPurpose": "Objetivo de la Lección",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing before the smartboard displaying formal absolute value bars and symmetrical coordinate reflections. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Objetivo: Comprender valor absoluto y números opuestos",
            "overlayTitle": "Objetivo",
            "overlaySubtitle": "Comprender valor absoluto y números opuestos",
            "vectorialOverlayPptx": "Sin rótulo adicional (la diapositiva presenta únicamente el Título de 64 pt y el Objetivo en Subtítulo de 36 pt sobre la ilustración limpia)",
            "mathOverlayPptx": "Sin rótulo adicional (la diapositiva presenta únicamente el Título de 64 pt y el Objetivo en Subtítulo de 36 pt sobre la ilustración limpia)",
            "speakerNotes": "El objetivo de hoy es comprender el concepto de valor absoluto como distancia geométrica al origen y caracterizar con rigor los números enteros opuestos en la recta numérica.",
            "palabrasAprox": 28,
            "duracionSeg": 12
      },
      {
            "slideNumber": 2,
            "tituloMomento": "Definición Geométrica de Valor Absoluto",
            "didacticPurpose": "Formalización Conceptual",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, pointing to a horizontal number line where glowing brackets measure distance from points to the origin zero. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Valor absoluto: Distancia de un número al cero en la recta",
            "overlayTitle": "Definición geométrica",
            "overlaySubtitle": "Distancia real entre el número y el origen neutro",
            "vectorialOverlayPptx": "Cotas de distancia sobre la recta desde −5 y +5 hasta el punto 0",
            "mathOverlayPptx": "Cotas de distancia sobre la recta desde −5 y +5 hasta el punto 0",
            "speakerNotes": "El valor absoluto de un número entero representa la distancia que lo separa del cero en la recta numérica, independientemente del sentido o dirección del recorrido realizado.",
            "palabrasAprox": 27,
            "duracionSeg": 13
      },
      {
            "slideNumber": 3,
            "tituloMomento": "Notación con Barras Verticales: |a|",
            "didacticPurpose": "Notación Formal",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, sketching vertical bars around integers on the digital panel, watching the signs convert to absolute magnitudes. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Notación formal: |−5| = 5 y |+5| = 5",
            "overlayTitle": "Notación matemática",
            "overlaySubtitle": "Las barras verticales representan valor absoluto",
            "vectorialOverlayPptx": "Ecuaciones formales destacadas: |−5| = 5 | |+5| = 5 | |0| = 0",
            "mathOverlayPptx": "Ecuaciones formales destacadas: |−5| = 5 | |+5| = 5 | |0| = 0",
            "speakerNotes": "Se escribe utilizando barras verticales. Por ejemplo, el valor absoluto de menos cinco y el de más cinco son iguales a cinco, pues ambos distan cinco unidades exactas.",
            "palabrasAprox": 28,
            "duracionSeg": 13
      },
      {
            "slideNumber": 4,
            "tituloMomento": "Propiedad de No Negatividad",
            "didacticPurpose": "Propiedad Matemática",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, analyzing a mathematical proof banner showing that geometric distance can never be less than zero. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Propiedad universal: |a| ≥ 0 para todo número entero",
            "overlayTitle": "No negatividad",
            "overlaySubtitle": "El valor absoluto nunca puede ser negativo",
            "vectorialOverlayPptx": "Inecuación formal de propiedad: |a| ≥ 0 con cota inferior en cero",
            "mathOverlayPptx": "Inecuación formal de propiedad: |a| ≥ 0 con cota inferior en cero",
            "speakerNotes": "Puesto que una distancia geométrica nunca puede ser negativa, el valor absoluto de cualquier número entero es siempre mayor o igual a cero en toda circunstancia analizada.",
            "palabrasAprox": 27,
            "duracionSeg": 13
      },
      {
            "slideNumber": 5,
            "tituloMomento": "Números Opuestos o Simétricos",
            "didacticPurpose": "Simetría en Z",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, demonstrating reflection symmetry across zero using paired coordinate pins at equal distances. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Números opuestos: Mismo valor absoluto, signos contrarios",
            "overlayTitle": "Números opuestos",
            "overlaySubtitle": "Equidistan del cero en sentidos contrarios",
            "vectorialOverlayPptx": "Esquema simétrico de opuestos: −a y +a con centro de simetría en 0",
            "mathOverlayPptx": "Esquema simétrico de opuestos: −a y +a con centro de simetría en 0",
            "speakerNotes": "Dos números enteros son opuestos o simétricos si tienen signos contrarios pero comparten exactamente el mismo valor absoluto y equidistan siempre del punto cero de referencia fundamental.",
            "palabrasAprox": 27,
            "duracionSeg": 13
      },
      {
            "slideNumber": 6,
            "tituloMomento": "El Caso Especial del Cero",
            "didacticPurpose": "Elemento Neutro",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, highlighting the single point zero at the exact center of the number line axis. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "El cero es su propio opuesto: |0| = 0",
            "overlayTitle": "El cero neutro",
            "overlaySubtitle": "Único entero sin signo y opuesto de sí mismo",
            "vectorialOverlayPptx": "Punto singular en el origen: 0 = −0 y |0| = 0",
            "mathOverlayPptx": "Punto singular en el origen: 0 = −0 y |0| = 0",
            "speakerNotes": "El cero es el único número entero que no posee signo y cuyo valor absoluto es igual a cero, siendo además su propio inverso aditivo simétrico en el conjunto.",
            "palabrasAprox": 29,
            "duracionSeg": 13
      },
      {
            "slideNumber": 7,
            "tituloMomento": "Regla de Oro y Pase a Práctica",
            "didacticPurpose": "Síntesis y Regla de Oro",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, smiling together at the study desk with notebooks open, ready to calculate absolute values on the platform. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Regla: Valor absoluto = Distancia | Opuestos = Simetría",
            "overlayTitle": "Regla de Oro: Síntesis",
            "overlaySubtitle": "Valor absoluto = Distancia | Opuestos = Simetría",
            "vectorialOverlayPptx": "Síntesis visual: |−a| = |+a| = |a| (ejemplo concreto: |−5| = |+5| = 5 metros) con flechas hacia el cero",
            "mathOverlayPptx": "Síntesis visual: |−a| = |+a| = |a| (ejemplo concreto: |−5| = |+5| = 5 metros) con flechas hacia el cero",
            "speakerNotes": "El valor absoluto mide la distancia al origen y los opuestos equidistan del cero. Con esta regla clara, pasamos directamente a practicar en la plataforma interactiva.",
            "palabrasAprox": 29,
            "duracionSeg": 13
      }
]
  },

  postQuestions: [
    {
      context: 'Cálculo de valor absoluto',
      question: '¿Cuál es el valor absoluto de −12 y cómo se escribe con el símbolo de barras?',
      expected: 'El valor absoluto es 12 y se escribe |−12| = 12.',
      success: '¡Perfecto! La distancia desde −12 hasta el cero es 12 unidades.',
      support: 'Recuerda que las barras | | eliminan el signo negativo porque miden la distancia pura hasta el cero.',
      reveal: 'El valor absoluto es 12 y se simboliza |−12| = 12.',
      studentReveal: '|−12| = 12.'
    },
    {
      context: 'Identificación de opuesto',
      question: '¿Cuál es el número opuesto de +9?',
      expected: 'El número −9.',
      success: '¡Muy bien! El opuesto de +9 es −9 porque tiene la misma magnitud pero sentido contrario.',
      support: 'Busca el número que está a 9 unidades del cero pero hacia la izquierda.',
      reveal: 'El opuesto de +9 es −9.',
      studentReveal: 'El opuesto de +9 es −9.'
    }
  ],

  // Paso 6: Práctica Conjunta y Guiada
  practice: [
    {
      context: 'Profundidad marina',
      question: 'Un buzo desciende a −18 metros bajo el mar. ¿Cuál es el valor absoluto de su profundidad?',
      expected: '18 metros.',
      success: '¡Excelente! La distancia recorrida desde la superficie es 18 metros. El valor absoluto es |−18| = 18.',
      support: 'El buzo está a 18 metros de distancia de la superficie. El valor absoluto indica la medida sin signo.',
      reveal: 'El valor absoluto es 18 metros (|−18| = 18).',
      studentReveal: '18 metros.',
      studentImage: '/images/lessons/clase3_buzo_profundidad.svg'
    },
    {
      context: 'Suma de opuestos',
      question: 'Un termómetro baja 6 grados bajo cero (−6) y luego sube 6 grados (+6). ¿En qué temperatura queda el termómetro?',
      expected: 'En 0 grados.',
      success: '¡Exacto! Al sumar un número con su opuesto (−6 + 6) el resultado siempre es cero.',
      support: 'Bajar 6 y luego subir 6 cancela el movimiento. ¿En qué valor terminas?',
      reveal: 'Queda en 0 grados porque −6 + (+6) = 0.',
      studentReveal: '0 grados Celsius.',
      studentImage: '/images/lessons/clase3_termometro_opuestos.svg'
    },
    {
      context: 'Comparación de valores absolutos',
      question: 'Calcula: |−15| y |+10|. ¿Cuál de los dos valores absolutos es mayor?',
      expected: '|−15| es mayor, porque 15 es mayor que 10.',
      success: '¡Brillante! |−15| = 15 y |+10| = 10. Como 15 > 10, el valor absoluto de −15 es mayor.',
      support: 'Primero calcula cada valor absoluto: |−15| es 15 y |+10| es 10. Ahora compara 15 frente a 10.',
      reveal: '|−15| = 15 y |+10| = 10. Por lo tanto, |−15| > |+10|.',
      studentReveal: '|−15| es mayor porque 15 > 10.',
      studentImage: '/images/lessons/clase3_comparacion_barras.svg'
    }
  ],

  // Síntesis y Razonamiento
  summaryIdeas: [
    [
      '1 · El valor absoluto es distancia',
      'El valor absoluto mide cuántas unidades separan a un número del cero en la recta numérica. Se escribe entre barras (|a|) y jamás es un valor negativo.'
    ],
    [
      '2 · Los números opuestos son simétricos',
      'Dos números son opuestos cuando están a la misma distancia del cero en lados contrarios. Tienen el mismo valor absoluto pero distinto signo.'
    ],
    [
      '3 · Cancelación aditiva',
      'La suma de cualquier número entero con su opuesto siempre es igual a cero: a + (−a) = 0. En la recta numérica, los desplazamientos se anulan mutuamente.'
    ]
  ],

  summaryText: 'En esta clase aprendimos que el valor absoluto representa la distancia pura de un número entero hasta el cero, la cual siempre es positiva o cero. Descubrimos que dos números como +5 y −5 son opuestos porque comparten la misma distancia al cero pero apuntan en sentidos contrarios. Además, comprobamos que al sumar un número con su opuesto, ambos desplazamientos se cancelan y el resultado es siempre cero.',

  reasoning: {
    title: 'Diferencia entre valor del número y valor absoluto',
    dileIntro: 'Analicemos una aparente paradoja entre el orden de los números y su valor absoluto.',
    question: 'En la recta numérica sabemos que 0 es mayor que −10 (0 > −10). Sin embargo, el valor absoluto |−10| es mayor que |0| (10 > 0). ¿Por qué ocurre esto y qué nos enseña sobre el valor absoluto?',
    expectedAnswer: 'Porque el valor de un número depende de su posición hacia la derecha, pero el valor absoluto mide la distancia pura hasta el cero sin importar la dirección.',
    context1: { label: 'ORDEN EN LA RECTA', value: '0 > −10', desc: 'El 0 está a la derecha del −10' },
    context2: { label: 'VALOR ABSOLUTO', value: '|−10| = 10 > |0| = 0', desc: 'El −10 está a 10 unidades de distancia del cero' },
    successFeedback: '¡Extraordinario razonamiento! Distinguiste con maestría entre la posición en la recta y la distancia física al origen.',
    supportFeedback: 'Piensa en quién está más lejos del cero: el −10 está a 10 pasos, mientras que el 0 está a 0 pasos. ¿Quién tiene mayor distancia?',
    revealText: 'No hay contradicción: el orden compara la posición (más a la derecha), mientras que el valor absoluto mide la distancia física al cero (separación).'
  },

  challenge: {
    title: 'Desafío: El misterio del número secreto',
    question: 'Un número entero tiene valor absoluto igual a 8 y está ubicado a la izquierda del cero en la recta numérica. ¿De qué número se trata y cuál es su número opuesto?',
    expectedAnswer: 'El número es −8 y su número opuesto es +8.',
    item1: { label: 'Número secreto', tag: '−8' },
    item2: { label: 'Número opuesto', tag: '+8' },
    successFeedback: '¡Excelente deducción! Como está a la izquierda su signo es negativo (−8), y su opuesto simétrico es +8.',
    supportFeedback: 'Si tiene distancia 8 y está a la izquierda del cero, ¿qué signo lleva? Y su opuesto a la derecha, ¿cuál será?'
  },

  strategy: {
    title: 'Estrategia en 3 pasos para valor absoluto y opuestos',
    dileIntro: 'Sigue esta guía rápida cada vez que trabajes con distancias y opuestos en la recta:',
    steps: [
      { number: 1, title: 'Identifica la distancia', desc: 'Para calcular el valor absoluto, quita el signo del número: la distancia al cero siempre es positiva.' },
      { number: 2, title: 'Encuentra el simétrico', desc: 'Para hallar el opuesto, conserva la misma distancia pero invierte el signo (+ pasa a −, y − pasa a +).' },
      { number: 3, title: 'Verifica la suma cero', desc: 'Comprueba sumando ambos números: si son opuestos auténticos, su suma debe dar exactamente 0.' }
    ]
  },

  // Paso 7: Evaluación Formativa (Miniquiz)
  mini: [
    {
      id: 'q_1',
      q: '¿Cuál es el valor absoluto de −7?',
      options: [
        '7',
        '−7',
        '0'
      ],
      correct: '7',
      fixExplain: 'El valor absoluto mide la distancia al cero, y las distancias siempre son positivas: |−7| = 7.',
      dileReview: 'Pídele al estudiante que recuerde que las barras eliminan el signo negativo porque indican distancia.'
    },
    {
      id: 'q_2',
      q: '¿Cuál es el número opuesto de −15?',
      options: [
        '+15',
        '−15',
        '0'
      ],
      correct: '+15',
      fixExplain: 'El opuesto de un número negativo es el número positivo situado a la misma distancia del cero: el opuesto de −15 es +15.',
      dileReview: 'Pídele que señale en la recta el número situado a 15 unidades del cero hacia la derecha.'
    },
    {
      id: 'q_3',
      q: '¿Cuál es el resultado de sumar un número entero con su opuesto, por ejemplo: (−9) + (+9)?',
      options: [
        '0',
        '+18',
        '−18'
      ],
      correct: '0',
      fixExplain: 'Al sumar dos números opuestos, los dos desplazamientos se cancelan completamente en la recta numérica y el resultado es siempre 0.',
      dileReview: 'Pídele que dibuje un avance de 9 pasos a la izquierda y luego 9 pasos a la derecha para ver dónde termina.'
    }
  ],

  // Paso 7b: Recuperación
  recovery: [
    {
      title: 'El valor absoluto siempre es positivo o cero',
      explain: 'El valor absoluto mide la cantidad de pasos físicos desde el cero hasta el número. Por eso nunca lleva signo menos.',
      q: '¿Cuál es el valor de |−25|?',
      options: [
        '25',
        '−25'
      ],
      correct: '25',
      correctText: '¡Correcto! La distancia desde −25 hasta 0 es 25.',
      fixText: 'La respuesta correcta es 25. El valor absoluto siempre es un número positivo.'
    },
    {
      title: 'Propiedad de los números opuestos',
      explain: 'Los números opuestos tienen igual valor absoluto pero signos contrarios.',
      q: 'Si un número es +4, ¿cuál es su opuesto?',
      options: [
        '−4',
        '+4'
      ],
      correct: '−4',
      correctText: '¡Eso es! El opuesto de +4 es −4.',
      fixText: 'La respuesta correcta es −4 porque está a 4 unidades pero en el lado contrario del cero.'
    }
  ],

  // Paso 8: Cierre
  closure: {
    congratulations: '¡Felicitaciones! Has completado con éxito la Clase 3 de Matemática. Hoy dominaste el valor absoluto como distancia pura al cero y aprendiste la simetría de los números opuestos.',
    nextClassPreview: 'En la próxima clase aprenderemos a sumar números enteros de igual y distinto signo utilizando desplazamientos y valores absolutos.'
  },

  interactive: {
    type: 'number_line',
    title: 'Simulador de valor absoluto y simetría de opuestos',
    description: 'Experimenta con puntos simétricos a ambos lados del cero y observa cómo las barras de valor absoluto miden la distancia pura.'
  }
};
