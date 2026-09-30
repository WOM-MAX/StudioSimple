import { LessonData } from '../../types/lesson';

export const MATEMATICA_7B_OA01_CLASE04: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Matemática',
    oaCode: 'OA 1',
    oaTitle: 'Números enteros',
    lessonNumber: 4,
    totalLessonsInOa: 6,
    lessonTitle: 'Adición de enteros de igual y distinto signo',
    durationMinutes: 30,
    nextLessonTitle: 'Sustracción en Z y la suma del inverso aditivo'
  },

  // Paso 1: Portada y Preparación
  prep: {
    adultObjective: 'Acompañar al estudiante a resolver adiciones de números enteros tanto de igual signo (sumando magnitudes y conservando el signo) como de distinto signo (restando las magnitudes y conservando el signo del sumando con mayor valor absoluto), modelando los movimientos en la recta numérica.',
    routeToday: 'Introducción → situación detonante con fichas y movimientos → video gancho → conversación guiada → video explicativo formal de la regla de adición → práctica guiada en tres contextos → estrategia en 3 pasos → miniquiz formativo → ticket de salida y cierre.',
    mentorReminder: 'Sigue el orden indicado. Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
    reminders: [
      'Sigue el orden indicado.',
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'No leas los recuadros SOLO PARA TI ni AYUDA DE LECTURA.',
      'Haz cada pregunta y espera la respuesta antes de seleccionar una opción.',
      'Refuerza la regla mnemotécnica: signos iguales se suman magnitudes; signos distintos se restan magnitudes y manda el mayor valor absoluto.',
      'Si el estudiante necesita apoyo, usa únicamente la ayuda que aparecerá.',
      'Fomenta el apoyo visual en la recta numérica para verificar cada resultado.'
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
      { label: 'Suma de igual signo', sub: 'Sumar distancias y conservar el signo' },
      { label: 'Suma de distinto signo', sub: 'Restar distancias y mandar el mayor valor absoluto' },
      { label: 'Movimiento en la recta', sub: 'Avanzar a la derecha (+) o a la izquierda (−)' }
    ],
    dileIntro: 'Hoy continuamos con nuestra ruta de Matemática de séptimo básico. Entramos a la cuarta clase para aprender a sumar números enteros.',
    dileObjective: 'En la clase de hoy aprenderemos el algoritmo formal para sumar números enteros: descubriremos cómo operar cuando ambos tienen el mismo signo y cómo proceder cuando tienen signos diferentes comparando sus valores absolutos.'
  },

  situation: {
    dilePrompt: 'Imagina un submarino de investigación que se encuentra a 4 metros bajo el agua (−4 metros). Desde ese punto, enciende sus propulsores y asciende 7 metros hacia la superficie (+7 metros). ¿En qué posición final queda el submarino respecto de la superficie?',
    expectedAnswer: 'En la posición +3 metros (tres metros sobre la superficie).',
    socraticHint: 'Desde −4 sube 4 metros para llegar al cero (la superficie), y le quedan 3 metros más por subir hacia arriba.',
    emotionalTip: 'Visualiza la recta numérica vertical: desde −4 das 7 pasos hacia arriba.',
    options: [
      {
        label: 'Respondió +3 metros',
        kind: 'correct',
        feedbackText: '¡Excelente! Partiendo en −4 y avanzando 7 unidades hacia arriba (+7), se llega exactamente a +3 metros.'
      },
      {
        label: 'Respondió −11 metros (sumó sin considerar direcciones opuestas)',
        kind: 'needs_support',
        feedbackText: 'Cuidado: el submarino sube, no baja más. Si estuviera en −4 y bajara 7 más iría a −11. Pero como asciende (+7), se mueve hacia arriba superando el cero. ¿Dónde termina?'
      },
      {
        label: 'Duda o no sabe',
        kind: 'no_answer',
        feedbackText: 'Vamos paso a paso. Desde −4 subimos 4 metros y llegamos a 0. Como en total sube 7 metros, aún le quedan 3 metros por subir hacia arriba: 0 + 3 = +3.'
      }
    ]
  },

  reference: {
    dilePrompt: 'En la adición de enteros con signos contrarios, los movimientos van en direcciones opuestas. Por eso se resta la magnitud menor de la mayor: 7 menos 4 es 3, y como 7 es positivo y mayor, el resultado es positivo (+3).',
    question: 'Si debes 8 mil pesos (−8.000) y pagas 5 mil pesos (+5.000), ¿sigues debiendo o tienes saldo a favor?',
    expectedAnswer: 'Sigo debiendo 3 mil pesos (−3.000).',
    socraticHint: 'El dinero que pagas no alcanza a cubrir toda la deuda: 8 menos 5 es 3.',
    feedbackSuccess: '¡Exacto! Como la deuda (8) es mayor que lo pagado (5), el resultado conserva el signo de la deuda: quedas debiendo $3.000 (−3.000).',
    feedbackSupport: 'Resta las cantidades: 8.000 menos 5.000 da 3.000. Como debías más de lo que pagaste, sigues con deuda (−3.000).'
  },

  // Paso 3: Video Gancho
  hook: {
    title: 'Clasificación de fichas y desplazamientos en la recta',
    dileIntro: 'Ahora veremos un video donde nuestros dos exploradores usan fichas de colores y la recta numérica para registrar los movimientos de un vehículo sumergible. Presta atención a cómo se combinan grupos con signos opuestos.',
    hazInstruction: 'Observa cómo el signo indica la dirección de cada grupo y cómo se comparan las cantidades.',
    videoSrc: '',
    focusPoints: [
      'Cómo 4 fichas negativas (−4) y 7 positivas (+7) representan movimientos opuestos.',
      'Por qué juntar sentidos distintos exige restar magnitudes.',
      'Cómo la recta confirma la posición final del recorrido.'
    ],
    dileAfterVideo: 'El video nos muestra que cuando los signos son distintos, los movimientos van en sentido contrario. Ahora conversaremos sobre cómo sumar enteros formalmente.',
    slides: [
      {
            "slideNumber": 1,
            "tituloMomento": "Laboratorio de Cargas y Fichas",
            "didacticPurpose": "Apertura y Enfoque",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, working at an illuminated laboratory workbench with containers of glowing blue and red tokens. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Misión 4: El juego de las fichas cargadas",
            "overlayTitle": "Misión 4: Fichas cargadas",
            "overlaySubtitle": "Laboratorio de física y modelación en Z",
            "vectorialOverlayPptx": "Rótulo de inicio: Contador de carga neta Q = 0",
            "mathOverlayPptx": "Rótulo de inicio: Contador de carga neta Q = 0",
            "speakerNotes": "En el laboratorio de la expedición científica, los dos jóvenes exploradores clasifican muestras utilizando fichas de colores cargadas.",
            "palabrasAprox": 18,
            "duracionSeg": 8
      },
      {
            "slideNumber": 2,
            "tituloMomento": "Fichas Azules (+) y Rojas (−)",
            "didacticPurpose": "Convención de Signos",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, sorting tokens into distinct trays, holding up a blue positive token and a red negative token. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Fichas azules = Positivas (+) | Fichas rojas = Negativas (−)",
            "overlayTitle": "Convención de colores",
            "overlaySubtitle": "Azul representa positivo | Rojo representa negativo",
            "vectorialOverlayPptx": "Leyenda visual: Ficha azul (+) y Ficha roja (−)",
            "mathOverlayPptx": "Leyenda visual: Ficha azul (+) y Ficha roja (−)",
            "speakerNotes": "Las fichas de color azul representan cargas positivas y las rojas cargas negativas para registrar aportes energéticos del sistema.",
            "palabrasAprox": 19,
            "duracionSeg": 8
      },
      {
            "slideNumber": 3,
            "tituloMomento": "Juntando Fichas del Mismo Color",
            "didacticPurpose": "Adición de Igual Signo",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, grouping multiple red tokens together in one bowl and blue tokens in another, watching counts accumulate. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Igual color se acumula: (+3) + (+4) = +7 | (−3) + (−4) = −7",
            "overlayTitle": "Mismo color: Acumulación",
            "overlaySubtitle": "Cantidades con igual signo se suman directamente",
            "vectorialOverlayPptx": "Agrupaciones con recuento: 3 rojos + 4 rojos = 7 rojos",
            "mathOverlayPptx": "Agrupaciones con recuento: 3 rojos + 4 rojos = 7 rojos",
            "speakerNotes": "Al juntar fichas del mismo color sobre la mesa, las cantidades se acumulan directamente conservando su signo original.",
            "palabrasAprox": 18,
            "duracionSeg": 8
      },
      {
            "slideNumber": 4,
            "tituloMomento": "El Reto de Signos Contrarios",
            "didacticPurpose": "Problematización",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, placing eight red negative tokens and five blue positive tokens onto the central testing mat. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Reto: 8 fichas rojas (−) combinadas con 5 fichas azules (+)",
            "overlayTitle": "Combinación mixta",
            "overlaySubtitle": "¿Qué ocurre al juntar signos diferentes?",
            "vectorialOverlayPptx": "Disposición en el tablero: 8 rojas (−) y 5 azules (+)",
            "mathOverlayPptx": "Disposición en el tablero: 8 rojas (−) y 5 azules (+)",
            "speakerNotes": "El gran desafío aparece al combinar ocho fichas rojas negativas con cinco fichas azules positivas sobre la mesa del laboratorio.",
            "palabrasAprox": 20,
            "duracionSeg": 9
      },
      {
            "slideNumber": 5,
            "tituloMomento": "Cancelación por Pares Cero",
            "didacticPurpose": "Principio de Neutralización",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, pairing one blue token with one red token, watching five neutral pairs dissolve in soft white light. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Principio de neutralización: Una ficha (+) anula a una (−)",
            "overlayTitle": "Pares cero",
            "overlaySubtitle": "Cada par (+ y −) se neutraliza y vale cero",
            "vectorialOverlayPptx": "Cinco pares enlazados con marca de neutralización = 0",
            "mathOverlayPptx": "Cinco pares enlazados con marca de neutralización = 0",
            "speakerNotes": "Cada ficha azul neutraliza a una ficha roja, formando pares neutros de valor cero que se eliminan mutuamente del conteo.",
            "palabrasAprox": 20,
            "duracionSeg": 9
      },
      {
            "slideNumber": 6,
            "tituloMomento": "Resultado Final y Signo Dominante",
            "didacticPurpose": "Identificación de Sobrantes",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, observing the three remaining red tokens left over on the workbench after neutralization. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Quedan 3 fichas rojas: (−8) + (+5) = −3",
            "overlayTitle": "Resultado neto",
            "overlaySubtitle": "Sobran 3 fichas del color dominante: −3",
            "vectorialOverlayPptx": "Ecuación resultante destacada: (−8) + (+5) = −3",
            "mathOverlayPptx": "Ecuación resultante destacada: (−8) + (+5) = −3",
            "speakerNotes": "Al retirar los cinco pares neutros quedan tres fichas rojas: el resultado final es menos tres unidades.",
            "palabrasAprox": 17,
            "duracionSeg": 9
      },
      {
            "slideNumber": 7,
            "tituloMomento": "Desafío de la Lección",
            "didacticPurpose": "Pregunta Detonante y Síntesis",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing together ready to translate the physical token game into an abstract mathematical algorithm. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Desafío: ¿Cuál es el algoritmo formal para sumar en Z?",
            "overlayTitle": "Desafío de la lección",
            "overlaySubtitle": "Algoritmo universal de adición en números enteros",
            "vectorialOverlayPptx": "Diagrama de flujo: ¿Signos iguales o signos distintos?",
            "mathOverlayPptx": "Diagrama de flujo: ¿Signos iguales o signos distintos?",
            "speakerNotes": "En la lección formalizaremos el algoritmo formal para sumar diferentes números enteros con igual y con distinto signo.",
            "palabrasAprox": 18,
            "duracionSeg": 9
      }
]
  },

  // Paso 4: Conversación Guiada
  preQuestions: [
    {
      context: 'Suma de signos iguales',
      question: 'Si caminas 3 pasos hacia la izquierda (−3) y luego caminas otros 4 pasos hacia la izquierda (−4), ¿en qué posición terminas?',
      expected: 'En la posición −7 (siete pasos a la izquierda).',
      success: '¡Exacto! Como ambos van en la misma dirección, se suman los pasos (3 + 4 = 7) y se conserva el signo negativo (−7).',
      support: 'Ambos movimientos van hacia la izquierda. Suma 3 pasos más 4 pasos. ¿Hacia qué lado terminas?',
      reveal: 'Terminas en −7 porque (−3) + (−4) = −7. Al tener igual signo, se suman las distancias.',
      studentReveal: 'En la posición −7.',
      studentImage: '/images/lessons/clase4_suma_igual_signo.svg'
    },
    {
      context: 'Suma de distinto signo',
      question: 'Si tienes un avance de +6 y un retroceso de −2, ¿dónde terminas en la recta?',
      expected: 'En +4 (cuatro pasos hacia adelante).',
      success: '¡Muy bien! Como van en direcciones opuestas, restas 6 menos 2 y conservas el signo del mayor (+4).',
      support: 'Avanzas 6 y retrocedes 2: 6 − 2 = 4. Como avanzaste más de lo que retrocediste, ¿es positivo o negativo?',
      reveal: 'Terminas en +4 porque (+6) + (−2) = +4.',
      studentReveal: 'En +4.',
      studentImage: '/images/lessons/clase4_suma_distinto_signo.svg'
    }
  ],

  conversationContext: 'Revisaremos el algoritmo formal de la adición de números enteros para los dos casos fundamentales.',

  // Paso 5: Explicación y Formalización
  formalization: {
    title: 'Regla formal de adición en el conjunto de los números enteros (Z)',
    concept: 'Adición de enteros',
    summary: 'Para sumar números enteros existen dos casos: 1) Si tienen igual signo, se suman sus valores absolutos y se conserva el signo común. Por ejemplo: (+4) + (+3) = +7 y (−4) + (−3) = −7. 2) Si tienen distinto signo, se restan sus valores absolutos (el menor del mayor) y el resultado lleva el signo del número con mayor valor absoluto. Por ejemplo: −8 + 5 = −3.',
    ideaClave: 'Igual signo: suma valores absolutos y conserva el signo. Distinto signo: resta valores absolutos y conserva el signo del mayor valor absoluto.',
    dileIntro: 'Ahora veremos el video de explicación formal. Aprenderemos la regla de oro: iguales se suman, distintos se restan y manda el de mayor valor absoluto.',
    hazInstruction: 'Pon atención a los dos ejemplos resueltos: suma de dos positivos, suma de dos negativos y suma de signos opuestos.',
    videoSrc: '',
    slides: [
      {
            "slideNumber": 1,
            "tituloMomento": "Objetivo de la Lección",
            "didacticPurpose": "Objetivo de la Lección",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing in front of the digital board showing the dual branching rules for addition in Z. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Objetivo: Adición de enteros de igual y distinto signo",
            "overlayTitle": "Objetivo de la Lección",
            "overlaySubtitle": "Dominar el algoritmo formal para sumar enteros de igual y distinto signo",
            "vectorialOverlayPptx": "Sin rótulo adicional (la diapositiva presenta únicamente el Título de 64 pt y el Objetivo en Subtítulo de 36 pt sobre la ilustración limpia)",
            "mathOverlayPptx": "Sin rótulo adicional (la diapositiva presenta únicamente el Título de 64 pt y el Objetivo en Subtítulo de 36 pt sobre la ilustración limpia)",
            "speakerNotes": "El objetivo de hoy es dominar el algoritmo formal para resolver adiciones entre números enteros con igual signo y con signos diferentes en cualquier contexto de aplicación.",
            "palabrasAprox": 27,
            "duracionSeg": 12
      },
      {
            "slideNumber": 2,
            "tituloMomento": "Caso 1: Suma de Positivos",
            "didacticPurpose": "Adición de Signos Iguales (+)",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, pointing to an addition equation with two positive numbers, showing magnitude accumulation. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Signos iguales (+): Se suman valores absolutos y queda (+)",
            "overlayTitle": "Suma de positivos",
            "overlaySubtitle": "(+3) + (+4) = +7 | Se suman magnitudes",
            "vectorialOverlayPptx": "Operación formal: |+3| + |+4| = 3 + 4 = +7",
            "mathOverlayPptx": "Operación formal: |+3| + |+4| = 3 + 4 = +7",
            "speakerNotes": "Cuando los sumandos tienen el mismo signo, sumamos sus valores absolutos y conservamos el signo común. Por ejemplo, más tres más más cuatro resulta más siete unidades enteras.",
            "palabrasAprox": 28,
            "duracionSeg": 13
      },
      {
            "slideNumber": 3,
            "tituloMomento": "Caso 1B: Suma de Negativos",
            "didacticPurpose": "Adición de Signos Iguales (−)",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, reviewing an addition of two negative numbers on the screen, verifying that the sum stays negative. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Signos iguales (−): Se suman valores absolutos y queda (−)",
            "overlayTitle": "Suma de negativos",
            "overlaySubtitle": "(−3) + (−4) = −7 | Se acumula la deuda o descenso",
            "vectorialOverlayPptx": "Operación formal: |−3| + |−4| = 3 + 4 = 7 -> Resultado: −7",
            "mathOverlayPptx": "Operación formal: |−3| + |−4| = 3 + 4 = 7 -> Resultado: −7",
            "speakerNotes": "Si sumamos dos números negativos, sumamos también sus valores absolutos y mantenemos el signo negativo. Así, menos tres sumado con menos cuatro da exactamente menos siete unidades.",
            "palabrasAprox": 27,
            "duracionSeg": 13
      },
      {
            "slideNumber": 4,
            "tituloMomento": "Caso 2: Suma con Signos Distintos",
            "didacticPurpose": "Sustracción de Magnitudes",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, pointing at a mixed addition problem where positive and negative values compensate each other. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Signos distintos: Se restan los valores absolutos",
            "overlayTitle": "Signos distintos: Resta",
            "overlaySubtitle": "Mayor valor absoluto menos menor valor absoluto",
            "vectorialOverlayPptx": "Cálculo intermedio: Diferencia de valores absolutos |−8| − |+5| = 8 − 5 = 3",
            "mathOverlayPptx": "Cálculo intermedio: Diferencia de valores absolutos |−8| − |+5| = 8 − 5 = 3",
            "speakerNotes": "Cuando los sumandos poseen signos distintos, ocurre una compensación. En lugar de sumar, restamos el valor absoluto menor del valor absoluto mayor entre ambos números presentes en la operación.",
            "palabrasAprox": 29,
            "duracionSeg": 13
      },
      {
            "slideNumber": 5,
            "tituloMomento": "Asignación del Signo Dominante",
            "didacticPurpose": "Regla del Mayor Valor Absoluto",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, comparing absolute values on the screen, showing the larger number dictating the final sign. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Blanco puro (#FFFFFF) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "El resultado lleva el signo del sumando con mayor valor absoluto",
            "overlayTitle": "Signo dominante",
            "overlaySubtitle": "Manda el signo del número con mayor distancia al cero",
            "vectorialOverlayPptx": "Comparación: |−8| > |+5|, por ende el signo final es negativo (−)",
            "mathOverlayPptx": "Comparación: |−8| > |+5|, por ende el signo final es negativo (−)",
            "speakerNotes": "El resultado de la adición conservará siempre el signo del número que tenga mayor valor absoluto, tal como ocurría con las fichas dominantes en el laboratorio de ciencias.",
            "palabrasAprox": 28,
            "duracionSeg": 13
      },
      {
            "slideNumber": 6,
            "tituloMomento": "Ejemplo Resuelto Paso a Paso",
            "didacticPurpose": "Modelamiento Procedimental",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, tracing each step of (+5) + (−8) = −3 on the digital whiteboard with complete clarity. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Azul marino oscuro (#0F172A) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Paso a paso: (+5) + (−8) -> 8 − 5 = 3 -> Resultado: −3",
            "overlayTitle": "Ejemplo resuelto",
            "overlaySubtitle": "Diferencia 3 con signo negativo dominante: −3",
            "vectorialOverlayPptx": "Paso 1: Restar magnitudes (8 − 5 = 3) | Paso 2: Aplicar signo mayor (−3)",
            "mathOverlayPptx": "Paso 1: Restar magnitudes (8 − 5 = 3) | Paso 2: Aplicar signo mayor (−3)",
            "speakerNotes": "Por ejemplo, en más cinco más menos ocho, restamos ocho menos cinco obteniendo tres, y asignamos el signo negativo del ocho: el total es menos tres unidades.",
            "palabrasAprox": 27,
            "duracionSeg": 13
      },
      {
            "slideNumber": 7,
            "tituloMomento": "Regla de Oro y Pase a Práctica",
            "didacticPurpose": "Síntesis y Regla de Oro",
            "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, sitting at the study console with their notebooks ready, smiling as they proceed to the interactive exercises. Ample negative space in the upper portion for overlays. Clean scenic anime illustration, absolutely no text, numbers, formulas, or labels drawn by AI. Color de texto en pantalla: Azul marino oscuro (#0F172A) plano de alto contraste, sin sombras, contornos, resplandores ni recuadros flotantes.",
            "overlayText": "Regla de Oro: Iguales se suman | Distintos se restan y manda el mayor",
            "overlayTitle": "Regla de Oro: Síntesis",
            "overlaySubtitle": "Iguales se suman | Distintos se restan y manda el mayor",
            "vectorialOverlayPptx": "Esquema resumen: Signos = -> Sumar magnitudes | Signos ≠ -> Restar magnitudes",
            "mathOverlayPptx": "Esquema resumen: Signos = -> Sumar magnitudes | Signos ≠ -> Restar magnitudes",
            "speakerNotes": "Signos iguales se suman y conservan signo; signos distintos se restan y manda el mayor valor absoluto. ¡Apliquemos esta regla en los ejercicios de la plataforma interactiva de estudio!",
            "palabrasAprox": 29,
            "duracionSeg": 13
      }
]
  },

  postQuestions: [
    {
      context: 'Suma de dos negativos',
      question: 'Resuelve: (−6) + (−5). ¿Cuál es el resultado?',
      expected: '−11',
      success: '¡Excelente! Como ambos tienen el mismo signo negativo, sumamos 6 + 5 = 11 y conservamos el signo: −11.',
      support: 'Al tener igual signo, se suman sus valores absolutos (6 + 5) y se mantiene el signo menos (−).',
      reveal: '(−6) + (−5) = −11.',
      studentReveal: '−11'
    },
    {
      context: 'Suma de signos diferentes',
      question: 'Resuelve: (−10) + (+4). ¿Cuál es el resultado?',
      expected: '−6',
      success: '¡Muy bien! Tienen signos diferentes: restamos 10 − 4 = 6. Como |−10| > |+4|, el resultado es −6.',
      support: 'Resta el menor del mayor: 10 − 4 = 6. ¿Qué número tiene mayor valor absoluto, el −10 o el +4?',
      reveal: '(−10) + (+4) = −6.',
      studentReveal: '−6'
    }
  ],

  // Paso 6: Práctica Conjunta y Guiada
  practice: [
    {
      context: 'Temperatura de montaña',
      question: 'En la cordillera la temperatura era de −2 °C a la medianoche. Durante la madrugada bajó 5 °C más (−5 °C). ¿Cuál es la temperatura final? Expresa la operación como adición.',
      expected: '(−2) + (−5) = −7 °C.',
      success: '¡Exacto! Ambas variaciones van hacia abajo: (−2) + (−5) = −7 °C.',
      support: 'Suma las dos bajas de temperatura: 2 + 5 = 7, y como ambas son bajo cero, se mantiene el signo negativo.',
      reveal: '(−2) + (−5) = −7 °C.',
      studentReveal: '−7 °C.',
      studentImage: '/images/lessons/clase4_temperatura_cordillera.svg'
    },
    {
      context: 'Finanzas personales',
      question: 'Tienes una deuda de $12.000 (−12.000) y realizas un abono de $15.000 (+15.000). ¿Cuál es tu saldo final?',
      expected: '+$3.000 a favor.',
      success: '¡Genial! Como el abono supera la deuda: (−12.000) + (+15.000) = +3.000 pesos.',
      support: 'Resta 15.000 menos 12.000: da 3.000. Como pagaste más de lo que debías, queda saldo positivo (+).',
      reveal: '(−12.000) + (+15.000) = +3.000.',
      studentReveal: '+$3.000 a favor.',
      studentImage: '/images/lessons/clase4_saldo_abono.svg'
    },
    {
      context: 'Ascensor de estacionamiento',
      question: 'Un automóvil está estacionado en el subterráneo −3. Sube 5 pisos (+5). ¿En qué piso queda?',
      expected: 'Piso +2 (segundo piso sobre la calle).',
      success: '¡Brillante! (−3) + (+5) = +2. Sube 3 pisos para llegar a la calle (0) y 2 pisos más arriba.',
      support: 'Calcula: 5 − 3 = 2. Como subió más pisos de los que estaba abajo, queda en un piso positivo.',
      reveal: '(−3) + (+5) = +2.',
      studentReveal: 'Piso +2.',
      studentImage: '/images/lessons/clase4_ascensor_subterraneo.svg'
    }
  ],

  // Síntesis y Razonamiento
  summaryIdeas: [
    [
      '1 · Suma de números con igual signo',
      'Cuando dos números tienen el mismo signo (ambos positivos o ambos negativos), se suman sus valores absolutos y el resultado mantiene el mismo signo: (+a) + (+b) = +(a+b) y (−a) + (−b) = −(a+b).'
    ],
    [
      '2 · Suma de números con distinto signo',
      'Cuando dos números tienen signos diferentes, se restan sus valores absolutos (|mayor| − |menor|) y el resultado conserva el signo del sumando que tenga mayor valor absoluto.'
    ],
    [
      '3 · Confirmación gráfica en la recta',
      'Sumar un positivo equivale a moverse hacia la derecha; sumar un negativo equivale a moverse hacia la izquierda en la recta numérica horizontal.'
    ]
  ],

  summaryText: 'En esta clase dominamos la adición de números enteros. Comprobamos que al sumar números con el mismo signo, los desplazamientos van en la misma dirección y sus magnitudes se acumulan manteniendo el signo. Al sumar números con signos opuestos, los movimientos compiten entre sí, por lo que restamos sus distancias y el resultado final queda del lado del número que estaba más lejos del cero.',

  reasoning: {
    title: '¿Por qué la suma de dos números a veces da un número menor?',
    dileIntro: 'En los números naturales estábamos acostumbrados a que "sumar siempre agranda". Analicemos si eso sigue siendo cierto en los enteros.',
    question: 'Si a 10 le sumamos −15, el resultado es −5: 10 + (−15) = −5. ¿Por qué al sumar obtuvimos un número menor que 10? Explícalo usando la idea de deuda o desplazamiento.',
    expectedAnswer: 'Porque sumar un número negativo equivale a retroceder o agregar una deuda, lo que disminuye la posición en la recta numérica hacia la izquierda.',
    context1: { label: 'SUMA NATURAL', value: '10 + 5 = 15', desc: 'Ambos avanzan a la derecha' },
    context2: { label: 'SUMA CON NEGATIVO', value: '10 + (−15) = −5', desc: 'El negativo retrocede 15 unidades a la izquierda' },
    successFeedback: '¡Extraordinario razonamiento! Desmontaste la creencia de que sumar siempre aumenta, demostrando que sumar un negativo produce un retroceso.',
    supportFeedback: 'Piensa en tu cuenta: si tienes $10 y te suman una deuda de $15, ¿quedas con más dinero o con menos dinero?',
    revealText: 'Sumar un número negativo significa añadir un retroceso o una disminución en la recta, por lo que el resultado queda a la izquierda del punto de partida.'
  },

  challenge: {
    title: 'Desafío del cálculo relámpago',
    question: 'Encuentra el valor de: (−7) + (+12) + (−5). Muestra cómo agruparías los números para calcular más rápido.',
    expectedAnswer: 'El resultado es 0. Se pueden juntar primero los negativos: (−7) + (−5) = −12, y luego (−12) + (+12) = 0.',
    item1: { label: 'Negativos agrupados', tag: '−12' },
    item2: { label: 'Resultado final', tag: '0' },
    successFeedback: '¡Magistral! Agrupaste los números de igual signo primero y aprovechaste la propiedad de los opuestos (−12 + 12 = 0).',
    supportFeedback: 'Junta los que tienen signo menos: (−7) y (−5). ¿Cuánto suman? Luego súmalo con +12.'
  },

  strategy: {
    title: 'Estrategia en 3 pasos para sumar enteros',
    dileIntro: 'Aplica este algoritmo infalible cada vez que resuelvas una adición en Z:',
    steps: [
      { number: 1, title: 'Examina los signos', desc: 'Verifica si los sumandos tienen el mismo signo o signos diferentes.' },
      { number: 2, title: 'Aplica la operación', desc: 'Si son IGUALES: suma sus magnitudes. Si son DISTINTOS: resta la magnitud menor de la mayor.' },
      { number: 3, title: 'Asigna el signo', desc: 'Si eran iguales: conserva el signo común. Si eran distintos: coloca el signo del sumando con mayor valor absoluto.' }
    ]
  },

  // Paso 7: Evaluación Formativa (Miniquiz)
  mini: [
    {
      id: 'q_1',
      q: '¿Cuál es el resultado de (−8) + (−6)?',
      options: [
        '−14',
        '+14',
        '−2'
      ],
      correct: '−14',
      fixExplain: 'Como ambos números son negativos (signos iguales), sumamos 8 + 6 = 14 y conservamos el signo negativo: −14.',
      dileReview: 'Pídele al estudiante que recuerde la regla de signos iguales: se suman y se conserva el signo.'
    },
    {
      id: 'q_2',
      q: '¿Cuál es el resultado de (−15) + (+9)?',
      options: [
        '−6',
        '+6',
        '−24'
      ],
      correct: '−6',
      fixExplain: 'Tienen signos diferentes: restamos 15 − 9 = 6. Como |−15| > |+9|, gana el signo negativo: −6.',
      dileReview: 'Pídele que reste 15 menos 9 y se fije cuál de los dos números tiene mayor distancia al cero.'
    },
    {
      id: 'q_3',
      q: '¿Cuál es el resultado de (+20) + (−7)?',
      options: [
        '+13',
        '−13',
        '+27'
      ],
      correct: '+13',
      fixExplain: 'Signos distintos: restamos 20 − 7 = 13. Como 20 es positivo y mayor que 7, el resultado es +13.',
      dileReview: 'Pídele que verifique que el número positivo es mayor en magnitud que el negativo.'
    }
  ],

  // Paso 7b: Recuperación
  recovery: [
    {
      title: 'Suma de números negativos',
      explain: 'Juntar dos deudas o dos descensos siempre da como resultado una cantidad negativa mayor.',
      q: 'Calcula: (−3) + (−4)',
      options: [
        '−7',
        '+7'
      ],
      correct: '−7',
      correctText: '¡Correcto! 3 pasos a la izquierda más 4 pasos a la izquierda dan 7 pasos a la izquierda (−7).',
      fixText: 'La respuesta correcta es −7. Signos iguales se suman y mantienen el signo.'
    },
    {
      title: 'Suma con signos contrarios',
      explain: 'Cuando los signos son distintos, la cantidad mayor reduce a la menor.',
      q: 'Calcula: (−9) + (+10)',
      options: [
        '+1',
        '−1'
      ],
      correct: '+1',
      correctText: '¡Exacto! 10 − 9 = 1, y como 10 es positivo, el resultado es +1.',
      fixText: 'La respuesta correcta es +1 porque 10 es mayor que 9 y es positivo.'
    }
  ],

  // Paso 8: Cierre
  closure: {
    congratulations: '¡Felicitaciones! Has completado con éxito la Clase 4 de Matemática. Ahora dominas la adición de números enteros de igual y distinto signo.',
    nextClassPreview: 'En la próxima clase aprenderemos la sustracción en Z y descubriremos el secreto de transformar cualquier resta en una suma del inverso aditivo.'
  },

  interactive: {
    type: 'number_line',
    title: 'Simulador de adición de enteros con desplazamientos',
    description: 'Modela adiciones en la recta observando flechas hacia la derecha para sumandos positivos y hacia la izquierda para negativos.'
  }
};
