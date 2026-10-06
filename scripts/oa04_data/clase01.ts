import { LessonData } from '../../Web Studio Simple/src/types/lesson';

export const MATEMATICA_7B_OA04_CLASE01: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Matemática',
    oaCode: 'OA 4',
    oaTitle: 'Porcentajes',
    lessonNumber: 1,
    totalLessonsInOa: 6,
    lessonTitle: 'Concepto de Porcentaje y Representación en Cuadrículas de 100',
    durationMinutes: 30,
    nextLessonTitle: 'Porcentajes como Fracción Irreductible y Número Decimal'
  },
  prep: {
    adultObjective: 'Acompañar al estudiante a comprender el porcentaje como una razón referida a 100 unidades, representándolo pictóricamente en cuadrículas de 10x10 y reconociendo que cada cuadrito corresponde al 1%.',
    routeToday: 'Descubrir qué significa el símbolo %, representar cantidades sobre una cuadrícula de 100 partes y relacionar el porcentaje con situaciones cotidianas.',
    mentorReminder: 'Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Escucha con atención antes de validar la respuesta.',
    reminders: [
      'El concepto clave de hoy es que todo porcentaje compara una cantidad con un total de 100 partes iguales.',
      'Lee en voz alta únicamente los textos con la etiqueta DILE o PREGÚNTALE.',
      'Ten a mano el cuaderno de matemática para que el estudiante dibuje su propia cuadrícula de 10x10.',
      'Valora la explicación conceptual del estudiante antes de exigir exactitud terminológica.'
    ],
    emotionalTip: 'Los porcentajes están en todas partes: tiendas, baterías de celular y noticias. Conectar este contenido con su vida cotidiana despertará su interés natural.'
  },
  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Números', subtitle: 'Concepto de Porcentaje', color: 'navy' },
      { id: 'b2', number: '02', title: 'Representación', subtitle: 'Cuadrícula 10x10', color: 'orange' },
      { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Modelamiento en Cuaderno', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz y Síntesis', color: 'teal' }
    ],
    keyQuestions: [
      { label: 'Razón respecto a 100', sub: 'Por cada cien unidades de un total' },
      { label: 'Símbolo %', sub: 'Lectura y significado matemático' },
      { label: 'Modelo pictórico', sub: 'Cuadrícula de cien cuadritos iguales' }
    ],
    dileIntro: 'Hoy comenzamos una nueva unidad en Matemática de 7° Básico: los porcentajes. Veremos cómo una idea muy simple nos permite comparar cantidades de forma clara y universal.',
    dileObjective: 'Comprender qué es un porcentaje, cómo se representa en una cuadrícula de 100 partes iguales y por qué el total siempre equivale al 100%.'
  },
  situation: {
    dilePrompt: 'Observa la batería de un teléfono inteligente cuando marca 40%. Si la carga completa de la batería representa 100 unidades de energía, ¿cuántas unidades de energía tiene disponibles el teléfono en ese momento?',
    expectedAnswer: 'Tiene 40 unidades de energía de un total de 100.',
    socraticHint: 'Recuerda que el símbolo % significa literalmente "por cada 100".',
    emotionalTip: 'Felicita su razonamiento deductivo: relacionar el símbolo con la cantidad de partes es el primer paso para dominar este tema.',
    options: [
      { label: 'Respondió 40 unidades de 100', kind: 'correct', feedbackText: '¡Exacto! 40% significa exactamente 40 partes de cada 100.' },
      { label: 'Respondió solo 40 o no mencionó el 100', kind: 'needs_support', feedbackText: 'Son 40 partes, pero es fundamental recordar que se comparan con un total de 100 partes iguales.' },
      { label: 'No supo responder', kind: 'no_answer', feedbackText: 'No te preocupes. Vamos a ver cómo una cuadrícula de 100 cuadritos lo deja completamente claro.' }
    ]
  },
  reference: {
    dilePrompt: 'En una cuadrícula de 100 cuadritos iguales, cada cuadrito individual representa el 1%. Si pintamos 40 cuadritos, ¿qué porcentaje de la cuadrícula hemos pintado?',
    question: '¿Qué porcentaje representan 40 cuadritos de un total de 100?',
    expectedAnswer: 'Representan el 40%.',
    socraticHint: 'Si 1 cuadrito es 1%, 40 cuadritos son 40 veces 1%.',
    feedbackSuccess: '¡Muy bien! 40 cuadritos pintados representan exactamente el 40% del total.',
    feedbackSupport: 'Cuenta los cuadritos: cada uno vale 1%. Por lo tanto, 40 cuadritos juntos equivalen al 40%.'
  },
  hook: {
    title: 'El Enigma del Panel Solar',
    titulo: 'El Enigma del Panel Solar',
    focusPoints: [
      'Observar la cuadrícula de 100 celdas fotovoltaicas en el techo de la escuela.',
      'Identificar cuántas celdas capturan energía solar directamente.',
      'Comprender por qué dividir en 100 partes facilita todas las comparaciones.'
    ],
    dileIntro: 'Acompañemos a Sofía y Lucas en el techo de su escuela, donde deben medir cuánta energía solar está capturando un nuevo panel compuesto por 100 celdas.',
    hazInstruction: 'Observa el video con atención y fíjate en cómo los personajes cuentan las celdas activas para determinar el porcentaje de energía.',
    videoSrc: '/videos/mat_7b_oa04_c01_hook.mp4',
    videoUrl: '/videos/mat_7b_oa04_c01_hook.mp4',
    posterSrc: '/images/mat_7b_oa04_c01_hook_poster.jpg',
    dileAfterVideo: '¿Notaste cómo Sofía agrupó las celdas en filas de diez para contar más rápido? Veamos cómo se formaliza esta idea.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: 'Desafío Inicial: El panel solar escolar',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing on a sunny school rooftop looking at a large square solar panel divided into a grid of 100 square cells. High contrast, bright sunny day, clean vector lines, ample negative space on the left. No text drawn by AI.',
        overlayText: '¿QUÉ ES EL PORCENTAJE?',
        overlayTitle: '¿QUÉ ES EL PORCENTAJE?',
        overlaySubtitle: 'El enigma de las 100 celdas solares',
        vectorialOverlayPptx: 'Panel solar cuadrado dividido en cuadrícula de 10x10 celdas',
        speakerNotes: 'Sofía y Lucas subieron al techo de su escuela para revisar el nuevo panel solar. El profesor les explicó que el panel está formado exactamente por cien celdas idénticas.',
        duracionSeg: 8
      },
      {
        slideNumber: 2,
        tituloMomento: 'Observación: Contando celdas activas',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The 13-year-old girl with braided hair pointing with a digital tablet at the solar panel grid, while the 13-year-old boy in a teal jacket counts illuminated blue cells. Clean modern anime aesthetic, bright flat saturated colors, generous negative space on top. No text drawn by AI.',
        overlayText: 'MEDIR SOBRE UN TOTAL DE 100',
        overlayTitle: 'MEDIR SOBRE UN TOTAL DE 100',
        overlaySubtitle: 'Cada celda representa una parte igual',
        vectorialOverlayPptx: 'Ilustración esquemática de cuadrícula con celdas que brillan en color azul cian',
        speakerNotes: 'Al recibir la luz del sol, varias celdas comenzaron a brillar en color azul. Lucas notó que cada fila tenía diez celdas y que en total había diez filas completas.',
        duracionSeg: 8
      },
      {
        slideNumber: 3,
        tituloMomento: 'Pregunta clave: La razón de cien',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The two 13-year-old students looking curiously at a digital display showing a glowing percent symbol. Thoughtful expressions, scientific classroom rooftop setting, sharp clean lines, negative space for layout. No text drawn by AI.',
        overlayText: '¿POR QUÉ COMPARAMOS CON 100?',
        overlayTitle: '¿POR QUÉ COMPARAMOS CON 100?',
        overlaySubtitle: 'El estándar universal de comparación',
        vectorialOverlayPptx: 'Símbolo de porcentaje estilizado con flechas indicando proporción',
        speakerNotes: '¿Por qué los científicos e ingenieros eligen comparar siempre con cien partes? Porque cien nos da una referencia estándar para comparar cualquier tamaño sin confusiones.',
        duracionSeg: 9
      },
      {
        slideNumber: 4,
        tituloMomento: 'Visualización: Cuadrícula de 10x10',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The 13-year-old boy and girl examining a clear holographic 10 by 10 grid floating between them. Crisp vector aesthetic, bright turquoise and orange accents, clean white highlights, negative space. No text drawn by AI.',
        overlayText: 'LA CUADRÍCULA DE 100 PARTES',
        overlayTitle: 'LA CUADRÍCULA DE 100 PARTES',
        overlaySubtitle: '10 filas de 10 cuadritos cada una',
        vectorialOverlayPptx: 'Cuadrícula regular de 100 unidades con una celda destacada en amarillo',
        speakerNotes: 'Si el panel completo tiene cien celdas, cada celda individual representa exactamente una de cien partes. A esa unidad básica la llamamos uno por ciento.',
        duracionSeg: 9
      },
      {
        slideNumber: 5,
        tituloMomento: 'Descubrimiento: Cuarenta celdas iluminadas',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The two 13-year-old students happily observing four full rows of ten cells lighting up in bright energy glow on the panel. Cheerful collaborative atmosphere, negative space on the right. No text drawn by AI.',
        overlayText: '40 DE CADA 100 PARTES',
        overlayTitle: '40 DE CADA 100 PARTES',
        overlaySubtitle: 'Cuatro filas completas encendidas',
        vectorialOverlayPptx: 'Cuatro filas de diez celdas sombreadas en azul brillante',
        speakerNotes: 'A media mañana, el sensor indicó que cuatro filas completas estaban produciendo energía. Cuatro filas de diez celdas equivalen a cuarenta celdas activas de las cien.',
        duracionSeg: 9
      },
      {
        slideNumber: 6,
        tituloMomento: 'Conexión Matemática: 40 por ciento',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The 13-year-old girl with braided hair writing on her digital notebook while the boy in a teal jacket gives a thumbs up. Clean bright modern anime, high clarity, negative space for mathematical formulas. No text drawn by AI.',
        overlayText: '40% DE ENERGÍA CAPTURADA',
        overlayTitle: '40% DE ENERGÍA CAPTURADA',
        overlaySubtitle: 'Razón matemática: 40 sobre 100',
        vectorialOverlayPptx: 'Fórmula limpia: 40 de 100 = 40%',
        speakerNotes: 'Sofía anotó en su registro: cuarenta de cada cien partes significa que el panel está funcionando al cuarenta por ciento de su capacidad total.',
        duracionSeg: 9
      },
      {
        slideNumber: 7,
        tituloMomento: 'Síntesis del Gancho: Pase a la formalización',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. Both 13-year-old student explorers smiling confidently toward the camera, inviting the viewer into the mathematics laboratory. Sunlit morning, bright clean colors, spacious negative space. No text drawn by AI.',
        overlayText: 'EL LENGUAJE DEL PORCENTAJE',
        overlayTitle: 'EL LENGUAJE DEL PORCENTAJE',
        overlaySubtitle: 'De la cuadrícula al cálculo matemático',
        vectorialOverlayPptx: 'Íconos limpios conectando cuadrícula, fracción y porcentaje',
        speakerNotes: 'Comprender la cuadrícula de cien es la llave maestra para entender todos los porcentajes. Ahora entremos al aula para aprender sus reglas y propiedades.',
        duracionSeg: 8
      }
    ]
  },
  preQuestions: [
    {
      context: 'En el video, el panel solar de la escuela estaba dividido en una cuadrícula de 100 celdas iguales.',
      question: '¿Cuántas celdas individuales forman una sola fila si hay 10 filas en total?',
      expected: '10 celdas en cada fila.',
      success: '¡Excelente observación! Diez filas de diez celdas completan exactamente las 100 partes.',
      support: 'Divide 100 entre 10: cada fila contiene exactamente 10 celdas.',
      reveal: '100 dividido por 10 filas nos da 10 celdas por fila.',
      studentReveal: 'Cada fila tiene 10 celdas.'
    },
    {
      context: 'Si se iluminaron 4 filas completas de 10 celdas cada una.',
      question: '¿Cuántas celdas activas hay en total y qué porcentaje del panel representan?',
      expected: 'Hay 40 celdas activas y representan el 40%.',
      success: '¡Exacto! 4 filas de 10 son 40 celdas, lo que equivale al 40% del total.',
      support: 'Multiplica 4 filas por 10 celdas: obtienes 40 celdas sobre un total de 100.',
      reveal: '4 x 10 = 40 celdas. Al ser de 100 totales, corresponde al 40%.',
      studentReveal: 'Son 40 celdas de 100, es decir, el 40%.'
    }
  ],
  formalization: {
    title: 'Definición Formal de Porcentaje y Representación Pictórica',
    concept: 'Un porcentaje es una razón que compara una cantidad con un total de 100 partes iguales. Se simboliza con % y equivale a una fracción de denominador 100.',
    dileIntro: 'Ahora formalizaremos la regla matemática en el cuaderno y revisaremos la explicación conceptual paso a paso.',
    hazInstruction: 'Observa la explicación con atención y escribe la regla de oro en tu cuaderno de matemática.',
    videoSrc: '/videos/mat_7b_oa04_c01_expl.mp4',
    videoUrl: '/videos/mat_7b_oa04_c01_expl.mp4',
    graphicPoster: '/images/mat_7b_oa04_c01_expl_poster.jpg',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: 'Declaración del Objetivo: Concepto de Porcentaje',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. Two 13-year-old students, a girl with braided hair and a boy in a teal jacket, in a clean modern classroom looking at a digital blackboard. Generous negative space on the left. High contrast, bright flat colors. No text drawn by AI.',
        overlayText: 'OBJETIVO DE LA LECCIÓN',
        overlayTitle: 'OBJETIVO DE LA LECCIÓN',
        overlaySubtitle: 'Comprender el porcentaje y su modelo pictórico en cuadrícula de 100',
        vectorialOverlayPptx: 'Cuadro limpio con el Objetivo de Aprendizaje MINEDUC OA 4',
        speakerNotes: 'Hoy aprenderemos a representar y comprender el porcentaje como una razón de consecuente cien, utilizando cuadrículas de diez por diez para visualizar cada cantidad.',
        duracionSeg: 12
      },
      {
        slideNumber: 2,
        tituloMomento: 'Definición: La razón respecto a 100',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The 13-year-old girl explaining with an open notebook, pointing to an illustrated ratio concept. Clean lines, bright cheerful classroom background, negative space on the right. No text drawn by AI.',
        overlayText: '¿QUÉ ES UN PORCENTAJE?',
        overlayTitle: '¿QUÉ ES UN PORCENTAJE?',
        overlaySubtitle: 'Una razón matemática que compara con 100 partes',
        vectorialOverlayPptx: 'Diagrama conceptual: a% = a / 100',
        speakerNotes: 'Un porcentaje es una comparación por cociente donde el total siempre se divide en cien partes iguales. La expresión a por ciento representa a partes de cada cien.',
        duracionSeg: 13
      },
      {
        slideNumber: 3,
        tituloMomento: 'La Unidad Básica: El 1 por ciento',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. A close-up view of the 13-year-old boy in teal jacket highlighting a single colored square within a large 100-cell grid. Sharp focus, clean modern anime, negative space. No text drawn by AI.',
        overlayText: 'CADA CUADRITO ES UN 1%',
        overlayTitle: 'CADA CUADRITO ES UN 1%',
        overlaySubtitle: '1 de 100 partes = 1/100 = 1%',
        vectorialOverlayPptx: 'Un solo cuadrito coloreado en amarillo con la etiqueta 1% destacada',
        speakerNotes: 'En una cuadrícula de diez por diez, cada cuadrito representa exactamente una centésima del total. Por eso decimos que cada cuadrito sombreado equivale al uno por ciento.',
        duracionSeg: 13
      },
      {
        slideNumber: 4,
        tituloMomento: 'Lectura y Escritura de Porcentajes',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. Both 13-year-old students reviewing examples on an interactive tablet display. Clear lighting, neat classroom setup, negative space for mathematical notation. No text drawn by AI.',
        overlayText: 'LECTURA Y ESCRITURA',
        overlayTitle: 'LECTURA Y ESCRITURA',
        overlaySubtitle: 'Símbolo % y su lectura verbal precisa',
        vectorialOverlayPptx: 'Ejemplos claros: 15% se lee quince por ciento, 50% se lee cincuenta por ciento',
        speakerNotes: 'Escribimos el número seguido del símbolo de porcentaje. Se lee siempre diciendo el número y luego la frase por ciento, recordando que representa partes de cien.',
        duracionSeg: 13
      },
      {
        slideNumber: 5,
        tituloMomento: 'La Totalidad: El 100 por ciento',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The full 100-cell grid glowing completely in warm golden light while the two 13-year-old students smile in comprehension. Clean vibrant aesthetic, negative space on left. No text drawn by AI.',
        overlayText: 'EL TOTAL ES EL 100%',
        overlayTitle: 'EL TOTAL ES EL 100%',
        overlaySubtitle: '100 cuadritos de 100 = Todo el conjunto',
        vectorialOverlayPptx: 'Cuadrícula 10x10 totalmente iluminada con la igualdad 100/100 = 1 = 100%',
        speakerNotes: 'Cuando los cien cuadritos están coloreados, tenemos la totalidad del conjunto. Cien sobre cien es igual a un entero completo, lo que corresponde al cien por ciento.',
        duracionSeg: 13
      },
      {
        slideNumber: 6,
        tituloMomento: 'Caso Isomórfico: Cuarenta cuadritos sombreados',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The 13-year-old girl and boy pointing together at a grid of 100 cells where exactly 40 blue cells are neatly colored. Perfect visual clarity, spacious negative space for practice step. No text drawn by AI.',
        overlayText: 'EJEMPLO MODELADO',
        overlayTitle: 'EJEMPLO MODELADO',
        overlaySubtitle: 'En una cuadrícula de 100 cuadritos, se colorean exactamente 40',
        vectorialOverlayPptx: 'Cuadrícula 10x10 con exactamente 40 celdas coloreadas en azul: 40/100 = 40%',
        speakerNotes: 'Analicemos este caso: en una cuadrícula de cien cuadritos, coloreamos exactamente cuarenta. Al contar cuarenta de cien, el porcentaje representado es cuarenta por ciento.',
        duracionSeg: 13
      },
      {
        slideNumber: 7,
        tituloMomento: 'Regla de Oro y Pase a la Práctica',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The two 13-year-old student explorers holding their notebooks, ready to begin interactive exercises. Modern anime style, bright friendly expressions, negative space. No text drawn by AI.',
        overlayText: 'REGLA DE ORO DEL PORCENTAJE',
        overlayTitle: 'REGLA DE ORO DEL PORCENTAJE',
        overlaySubtitle: 'El porcentaje es una fracción de denominador 100',
        vectorialOverlayPptx: 'Regla de oro: Cantidad sobre 100 = Porcentaje directo. ¡A practicar!',
        speakerNotes: 'Regla de oro: cualquier cantidad comparada directamente con cien se convierte de inmediato en su porcentaje correspondiente. Ahora continuemos con la práctica interactiva.',
        duracionSeg: 13
      }
    ]
  },
  postQuestions: [
    {
      context: 'En el video explicativo analizamos una cuadrícula de 100 cuadritos con 40 celdas coloreadas.',
      question: '¿Por qué 40 cuadritos de 100 representan directamente el 40%?',
      expected: 'Porque cada cuadrito es 1%, por lo que 40 cuadritos equivalen a 40%.',
      success: '¡Excelente! Como el total es 100, la cantidad de partes sombreadas coincide exactamente con el valor del porcentaje.',
      support: 'Recuerda que el porcentaje expresa cuántas partes se toman de cada 100.',
      reveal: 'Cada cuadrito es 1 de 100 (1%). Cuarenta cuadritos son 40 de 100, es decir, 40%.',
      studentReveal: 'Representa el 40% porque son 40 partes de un total de 100.'
    }
  ],
  practice: [
    {
      context: 'En una cuadrícula de 100 cuadritos iguales, se colorean exactamente 40 cuadritos de color azul.',
      question: '¿Qué porcentaje de la cuadrícula está coloreado de azul?',
      expected: '40%',
      success: '¡Correcto! 40 partes de 100 corresponden exactamente al 40%.',
      support: 'Cuenta las partes pintadas sobre el total de 100 cuadritos.',
      reveal: 'La razón es 40/100, lo que por definición es 40%.',
      studentReveal: 'Está coloreado el 40%.'
    },
    {
      context: 'En un mosaico de 100 baldosas cuadradas en el patio de la escuela, 65 baldosas son de color verde y el resto son blancas.',
      question: '¿Qué porcentaje del mosaico está formado por baldosas verdes?',
      expected: '65%',
      success: '¡Muy bien! 65 de 100 baldosas representan el 65%.',
      support: 'El total de baldosas es 100. Compara las 65 verdes con ese total.',
      reveal: '65 baldosas verdes de 100 baldosas totales = 65/100 = 65%.',
      studentReveal: 'El 65% de las baldosas son verdes.'
    },
    {
      context: 'Un estanque de agua para riego tiene una capacidad máxima de 100 litros y actualmente contiene 82 litros.',
      question: '¿Qué porcentaje de la capacidad total del estanque está lleno?',
      expected: '82%',
      success: '¡Exacto! 82 litros de 100 litros equivalen al 82% de capacidad.',
      support: 'Compara los 82 litros que tiene con los 100 litros que puede almacenar en total.',
      reveal: '82 litros de 100 litros posibles representan el 82%.',
      studentReveal: 'El estanque está al 82% de su capacidad.'
    }
  ],
  mini: [
    {
      id: 'q1',
      q: 'En una biblioteca escolar con 100 libros de lectura, 25 libros corresponden a novelas gráficas. ¿Qué porcentaje del total representan las novelas gráficas?',
      options: ['2,5%', '25%', '50%', '75%'],
      correct: '25%',
      fixExplain: '25 de cada 100 unidades equivale exactamente a la razón 25/100, lo que corresponde al 25%.'
    },
    {
      id: 'q2',
      q: 'Si en una cuadrícula de 100 cuadritos se colorean 7 cuadritos, ¿cuál es el porcentaje sombreado?',
      options: ['70%', '0,7%', '7%', '14%'],
      correct: '7%',
      fixExplain: 'Cada cuadrito es 1%. Si hay 7 cuadritos sombreados, representan 7/100 = 7% (no confundir con 70%, que requeriría 70 cuadritos).'
    },
    {
      id: 'q3',
      q: '¿Qué representa el 100% en una cuadrícula de 100 partes iguales?',
      options: ['La mitad de la cuadrícula (50 cuadritos)', '10 cuadritos de una fila', 'La totalidad de la cuadrícula (100 cuadritos)', '1.000 cuadritos'],
      correct: 'La totalidad de la cuadrícula (100 cuadritos)',
      fixExplain: 'El 100% representa el total completo: 100 de 100 partes posibles, lo que equivale a la unidad entera.'
    }
  ],
  recovery: [
    {
      title: 'Refuerzo de Porcentaje en Cuadrícula',
      explain: 'Un porcentaje compara siempre una cantidad con 100. Si tienes una cuadrícula de 100 partes y pintas 15, tienes 15 de 100, es decir, 15%.',
      q: 'Si una cuadrícula tiene 100 cuadritos y pintas 30, ¿qué porcentaje está pintado?',
      options: ['3%', '30%', '300%', '0,3%'],
      correct: '30%',
      correctText: '¡Excelente! 30 de 100 es exactamente el 30%.',
      fixText: 'Recuerda: la cantidad pintada sobre 100 da el porcentaje directo: 30 de 100 = 30%.'
    }
  ],
  summaryIdeas: [
    ['Porcentaje', 'Razón matemática que compara una cantidad con un total de 100 partes iguales.'],
    ['Modelo Pictórico', 'En una cuadrícula de 10x10 (100 cuadritos), cada cuadrito representa el 1% del total.'],
    ['Totalidad (100%)', 'Tener el 100% significa tener las 100 partes completas, es decir, todo el conjunto.']
  ],
  strategy: {
    title: 'Estrategia de Visualización de Porcentajes',
    dileIntro: 'Sigue estos 3 pasos para identificar o representar cualquier porcentaje en una cuadrícula:',
    steps: [
      { number: 1, title: 'Comprobar el total', desc: 'Verifica que la cuadrícula o conjunto esté dividido exactamente en 100 partes iguales.' },
      { number: 2, title: 'Contar las partes destacadas', desc: 'Cuenta cuántos cuadritos están coloreados o cuántos elementos cumplen la condición.' },
      { number: 3, title: 'Escribir el porcentaje', desc: 'Escribe el número de partes contadas agregando el símbolo %.' }
    ]
  },
  closure: {
    congratulations: '¡Gran trabajo hoy! Has comprendido el significado profundo del porcentaje y cómo visualizarlo con total claridad.',
    nextClassPreview: 'En la próxima clase aprenderemos cómo transformar cualquier porcentaje en una fracción irreducible y en un número decimal.'
  },
  paso8_cierre: {
    preguntaSintesis: '¿Por qué decimos que un porcentaje es una razón respecto a 100?',
    metacognicion: '¿Cómo te ayudó imaginar la cuadrícula de 100 cuadritos para entender qué significa el 40%?',
    celebracion: '¡Felicitaciones! Has dominado el concepto fundamental de los porcentajes.'
  }
};
