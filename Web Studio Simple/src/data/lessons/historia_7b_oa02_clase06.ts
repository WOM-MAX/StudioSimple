import { LessonData } from '../../types/lesson';

export const HISTORIA_7B_OA02_CLASE06: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Historia, Geografía y Ciencias Sociales',
    oaCode: 'OA 2',
    oaTitle: 'Procesos de transformación de la vida humana en el Neolítico',
    lessonNumber: 6,
    totalLessonsInOa: 6,
    lessonTitle: 'Excedentes, comercio y primeras ciudades',
    durationMinutes: 30,
    nextLessonTitle: 'Fin de Unidad: Felicitaciones por completar el Objetivo de Aprendizaje'
  },

  prep: {
    adultObjective: 'Acompañar al estudiante a sintetizar el proceso completo de transformación del Neolítico al surgimiento de las civilizaciones: cómo la acumulación masiva de excedentes agrícolas y el comercio a larga distancia impulsaron el nacimiento de las primeras ciudades en Mesopotamia (como Uruk), preparando al estudiante para el ensayo evaluativo formal tipo MINEDUC.',
    routeToday: 'De los excedentes agrícolas y el trueque a larga distancia al nacimiento de la primera ciudad.',
    mentorReminder: 'Sigue las indicaciones en pantalla paso a paso. Lee únicamente los recuadros DILE y PREGÚNTALE en voz alta.',
    reminders: [
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'No leas los recuadros SOLO PARA TI ni AYUDA PEDAGÓGICA.',
      'Haz cada pregunta y espera la respuesta antes de retroalimentar.',
      'Considera correcta una respuesta si expresa el razonamiento histórico con sus propias palabras.',
      'Asegura que el foco se mantenga estrictamente en los excedentes, el comercio y el nacimiento de las primeras ciudades.'
    ],
    emotionalTip: 'Felicita el camino recorrido: "Hoy completamos el gran viaje del Neolítico: desde la primera semilla recolectada hasta la construcción de las primeras ciudades de la historia humana".'
  },

  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Historia y Geografía', subtitle: 'Excedentes comercio y ciudades', color: 'yellow' },
      { id: 'b2', number: '02', title: 'Exploración', subtitle: 'Rutas comerciales y la ciudad de Uruk', color: 'orange' },
      { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Ensayo de síntesis en cuaderno', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz formativo y ensayo oficial', color: 'teal' }
    ],
    keyQuestions: [
      { label: '¿Qué impulsó el comercio?', sub: 'La necesidad de materias primas que no existían en las llanuras agrícolas.' },
      { label: '¿Cómo nació la primera ciudad?', sub: 'Grandes excedentes y templos que concentraron población y poder.' }
    ],
    dileIntro: 'Hoy comenzaremos la clase 6 de Historia, Geografía y Ciencias Sociales: "Excedentes, comercio y primeras ciudades".',
    dileObjective: 'Explicar cómo los excedentes agrícolas y las redes comerciales dieron origen a los primeros centros urbanos y civilizaciones.'
  },

  situation: {
    dilePrompt: 'En la llanura de la Baja Mesopotamia, entre los ríos Tigris y Éufrates, la tierra era fértil y producía cosechas gigantescas de cebada y trigo gracias a los canales de regadío. Sin embargo, en esa llanura no había ni una sola piedra para construir, ni metales, ni madera resistente de árboles. ¿Cómo resolvieron los habitantes de Mesopotamia la falta de piedras, madera y metales si tenían toneladas de trigo y lana sobrantes?',
    expectedAnswer: 'A través del comercio y el trueque a larga distancia: intercambiaron sus excedentes de trigo, cebada y tejidos de lana con pueblos de montañas y costas lejanas que tenían madera, cobre y piedras duras.',
    socraticHint: 'Si tú tienes mucho trigo que te sobra y tu vecino en la montaña tiene rocas y madera que a ti te faltan, ¿qué hacen para beneficiarse ambos?',
    emotionalTip: 'Invítalo a comprender la interconexión humana: el comercio nació de la necesidad de cooperar e intercambiar riquezas entre regiones distantes.',
    options: [
      {
        label: 'Explicó que intercambiaron sus excedentes de trigo y lana por madera, piedra y metales',
        kind: 'correct',
        feedbackText: '¡Exacto! Ese intercambio a larga distancia dio origen a las primeras grandes rutas comerciales de la humanidad.'
      },
      {
        label: 'Dijo que construyeron todo con plástico o que aprendieron a vivir sin madera ni piedras',
        kind: 'needs_support',
        feedbackText: 'Necesitaban madera para techos y piedras para moler; por eso tuvieron que organizar caravanas comerciales para conseguirlas.'
      },
      {
        label: 'No sabe qué responder o dio otra respuesta',
        kind: 'no_answer',
        feedbackText: 'Pista guiada: Fíjate en los excedentes: cargaron barcas y burros con trigo y tejidos para cambiarlos por madera y cobre en tierras lejanas.'
      }
    ]
  },

  reference: {
    dilePrompt: 'Hacia el 3.500 a.C., la aldea de Uruk en Mesopotamia creció hasta albergar a más de cincuenta mil habitantes, con templos colosales de ladrillos de barro, murallas perimetrales y sacerdotes que administraban los almacenes con sellos cilíndricos.',
    question: '¿Por qué Uruk ya no puede llamarse una simple aldea y es considerada la primera ciudad y civilización de la historia?',
    expectedAnswer: 'Porque superó en tamaño y población a cualquier aldea, contaba con murallas y templos monumentales, una administración estatal organizada con registros contables, y una sociedad dividida en clases gobernantes, soldados, sacerdotes, artesanos y campesinos.',
    socraticHint: 'Compara una aldea de doscientas personas donde todos se conocen con una urbe de cincuenta mil habitantes con murallas, soldados, templos y administradores.',
    feedbackSuccess: '¡Brillante discernimiento histórico! Has identificado con rigor todos los rasgos que definen a la primera civilización urbana.',
    feedbackSupport: 'Uruk era una ciudad porque tenía miles de habitantes, edificios monumentales, leyes, gobernantes y una administración organizada.'
  },

  hook: {
    title: 'De la Aldea a la Primera Ciudad',
    titulo: 'De la Aldea a la Primera Ciudad',
    focusPoints: [
      'Excedentes fluviales: Inundaciones controladas y canales que multiplicaron las cosechas.',
      'Comercio a larga distancia: Intercambio de grano y telas por madera, obsidiana y cobre.',
      'La metrópolis de Uruk: Cincuenta mil habitantes, murallas de ladrillo y templos colosales.',
      'Administración y registros: Sellos cilíndricos y fichas de arcilla preludio de la escritura.'
    ],
    dileIntro: 'Acompañemos a los dos exploradores a presenciar el nacimiento de la primera gran ciudad de la historia humana: Uruk en Mesopotamia.',
    hazInstruction: 'Observa cómo el comercio y los excedentes transformaron una comunidad campesina en un centro urbano monumental.',
    videoSrc: '',
    dileAfterVideo: 'Excelente observación. Ahora analizaremos las claves que marcaron el paso de la prehistoria a la civilización urbana.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Apertura y Escenario",
        didacticPurpose: "Apertura y Escenario",
        visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing on a canal embankment looking toward the bustling gate of ancient Uruk in Sumer. Golden sunset light, wide negative space in top third. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "La Ciudad de Uruk",
        overlaySubtitle: "El amanecer de la civilización urbana en Mesopotamia",
        overlayText: "La Ciudad de Uruk: El amanecer de la civilización urbana en Mesopotamia",
        vectorialOverlayPptx: "Coordenadas históricas: Baja Mesopotamia (Sumer), 3.500 a 3.000 a.C.",
        speakerNotes: "Nuestros dos exploradores contemplan las imponentes murallas de Uruk, la primera gran ciudad del mundo, nacida junto a los ríos Tigris y Éufrates.",
        palabrasAprox: 23,
        duracionSeg: 9
      },
      {
        slideNumber: 2,
        tituloMomento: "El Excedente Fluvial",
        didacticPurpose: "El Excedente Fluvial",
        visualPrompt: "Modern anime style. Vast irrigated grain fields along the Euphrates with sluice gates and network of canals, overflowing with tall barley stalks. Villagers and explorers admiring the bounty. Clear space on left. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Riego y Abundancia",
        overlaySubtitle: "Canales fluviales multiplicando las cosechas agrícolas",
        overlayText: "Riego y Abundancia: Canales fluviales multiplicando las cosechas agrícolas",
        vectorialOverlayPptx: "Agricultura de regadío: Control de crecidas mediante diques y canales para cosechas masivas continuas",
        speakerNotes: "El secreto de Mesopotamia fue el riego artificial. Al dominar las aguas fluviales con canales y diques, obtuvieron cosechas colosales de trigo y cebada.",
        palabrasAprox: 23,
        duracionSeg: 9
      },
      {
        slideNumber: 3,
        tituloMomento: "Rutas de Intercambio",
        didacticPurpose: "Rutas de Intercambio",
        visualPrompt: "Modern anime style. River harbor in Uruk with reed and wooden boats unloading cedar logs, copper ingots, and blue lapis lazuli stones, trading with sacks of grain. Expressive eyes, dramatic lighting. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Comercio a Larga Distancia",
        overlaySubtitle: "Trueque de excedentes por materias primas escasas",
        overlayText: "Comercio a Larga Distancia: Trueque de excedentes por materias primas escasas",
        vectorialOverlayPptx: "Redes comerciales: Exportación de cereales y textiles a cambio de madera de cedro, cobre y piedras duras",
        speakerNotes: "Mesopotamia no tenía maderas duras ni piedras. Enviaron barcas por los ríos para cambiar su grano y tejidos por cobre de Anatolia y cedros del Líbano.",
        palabrasAprox: 25,
        duracionSeg: 9
      },
      {
        slideNumber: 4,
        tituloMomento: "El Templo y la Autoridad",
        didacticPurpose: "El Templo y la Autoridad",
        visualPrompt: "Modern anime style. The girl and boy looking up at the monumental stepped temple terrace (proto-ziggurat) of Eanna in Uruk, with priests receiving tax offerings of sesame oil and grain. Vibrant colors, clean composition. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "El Templo Central",
        overlaySubtitle: "Centro religioso administrativo y almacén público",
        overlayText: "El Templo Central: Centro religioso administrativo y almacén público",
        vectorialOverlayPptx: "Institución estatal: El templo administra los excedentes comunales y dirige el trabajo colectivo de la ciudad",
        speakerNotes: "El templo central era el corazón de la urbe. Los sacerdotes no solo dirigían ceremonias religiosas, sino que administraban los almacenes públicos de la ciudad.",
        palabrasAprox: 23,
        duracionSeg: 9
      },
      {
        slideNumber: 5,
        tituloMomento: "Sellos y Contabilidad",
        didacticPurpose: "Sellos y Contabilidad",
        visualPrompt: "Modern anime style. Close-up on a Sumerian scribe rolling a carved stone cylinder seal over wet clay to seal a grain vessel, with the two 13-year-olds taking notes in awe. Soft depth of field. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Primeros Registros",
        overlaySubtitle: "Sellos cilíndricos y fichas de contabilidad urbana",
        overlayText: "Primeros Registros: Sellos cilíndricos y fichas de contabilidad urbana",
        vectorialOverlayPptx: "Control administrativo: Sellos y tokens de arcilla que dieron origen directo a la escritura cuneiforme",
        speakerNotes: "Para controlar miles de sacos de grano inventaron sellos cilíndricos y marcas en arcilla, dando el primer paso histórico hacia la invención de la escritura.",
        palabrasAprox: 23,
        duracionSeg: 9
      },
      {
        slideNumber: 6,
        tituloMomento: "La Complejidad Urbana",
        didacticPurpose: "La Complejidad Urbana",
        visualPrompt: "Modern anime style. Panoramic view of Uruk showing distinct quarters: artisans' street, bronze foundry, grain market, residential brick houses, and grand outer walls. Volumetric lighting. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Sociedad Estratificada",
        overlaySubtitle: "Gobernantes soldados artesanos y campesinos urbanos",
        overlayText: "Sociedad Estratificada: Gobernantes soldados artesanos y campesinos urbanos",
        vectorialOverlayPptx: "Estructura urbana: Diferenciación socioespacial entre barrios residenciales, talleres y centro cívico",
        speakerNotes: "En la ciudad convivían decenas de profesiones: soldados de guardia, orfebres, tejedores, comerciantes y campesinos, bajo leyes y autoridades estatales.",
        palabrasAprox: 20,
        duracionSeg: 9
      },
      {
        slideNumber: 7,
        tituloMomento: "Pregunta Detonante",
        didacticPurpose: "Pregunta Detonante",
        visualPrompt: "Modern anime style. Inspiring closing setting with both 13-year-olds smiling proudly with their open notebooks before a majestic sunrise over the ancient Near East. Soft gradient background. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Síntesis del Objetivo",
        overlaySubtitle: "El camino hacia las primeras civilizaciones",
        overlayText: "Síntesis del Objetivo: El camino hacia las primeras civilizaciones",
        vectorialOverlayPptx: "Cierre formativo: La agricultura y el comercio transformaron para siempre la historia de la humanidad",
        speakerNotes: "¡Hemos completado la gran trayectoria! Demostremos todo lo aprendido sobre el Neolítico y las primeras ciudades en nuestro ensayo final.",
        palabrasAprox: 19,
        duracionSeg: 6
      }
    ]
  },

  preQuestions: [
    {
      context: 'El Rol de las Rutas Comerciales Fluviales',
      question: 'En el video observamos cómo las barcas navegaban por los ríos llevando trigo para traer maderas y metales. ¿Por qué el comercio a larga distancia fue indispensable para que Mesopotamia pudiera construir ciudades?',
      expected: 'Porque en la llanura aluvial de Mesopotamia no existían árboles para vigas, ni piedras para construir murallas y cimientos, ni metales para herramientas; debían intercambiar sus excedentes agrícolas para obtenerlos.',
      success: '¡Excelente precisión geográfica y económica! Identificaste la complementariedad ecológica que obligó a comerciar a gran distancia.',
      support: 'Recuerda los recursos del entorno: los ríos daban barro y trigo, pero ningún metal ni madera. Todo eso tuvieron que traerlo desde lejos.',
      reveal: 'El comercio a larga distancia compensó la falta de minerales y madera en Mesopotamia, haciendo posible la edificación de la ciudad de Uruk.',
      studentReveal: 'Porque en Mesopotamia solo había barro y trigo; necesitaban cambiar comida por la madera, piedra y metales que no tenían.'
    },
    {
      context: 'La Administración Pública y el Surgimiento de la Escritura',
      question: '¿Por qué la acumulación de toneladas de trigo y rebaños en los templos de Uruk obligó a inventar sellos cilíndricos y registros contables?',
      expected: 'Porque era imposible recordar de memoria cuántos sacos entraban y salían del almacén; se necesitaban marcas permanentes para registrar impuestos, pagos y deudas comunales.',
      success: '¡Gran comprensión de la gestión estatal! La contabilidad de los excedentes fue el motor directo de los primeros signos escritos de la historia.',
      support: 'Piensa en una ciudad de cincuenta mil personas: ¿puede un sacerdote recordar de cabeza la comida de miles de familias?',
      reveal: 'La magnitud de los excedentes urbanos exigió sistemas objetivos de registro que evolucionaron hacia la primera escritura cuneiforme.',
      studentReveal: 'Porque con miles de sacos de trigo nadie podía recordar todo de memoria y necesitaban anotar lo que guardaban y entregaban.'
    }
  ],

  formalization: {
    title: 'Excedentes, Comercio y Primeras Ciudades',
    concept: 'Excedentes Agrícolas, Comercio y Primeras Ciudades',
    dileIntro: 'Ahora veremos el video explicativo final. Sintetizaremos cómo la combinación de excedentes masivos, redes de trueque y administración estatal dio origen a la primera civilización urbana en Mesopotamia.',
    hazInstruction: 'Revisemos con atención la explicación formal y preparemos el cuaderno para registrar las ideas centrales del ensayo.',
    ideaClave: 'La agricultura de regadío en Mesopotamia generó excedentes masivos que sustentaron el comercio a larga distancia, la estratificación social y el nacimiento de las primeras ciudades-estado como Uruk, marcando el origen de la civilización.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Objetivo de la Lección",
        didacticPurpose: "Objetivo de la Lección",
        visualPrompt: "Modern anime style 16:9. The boy and girl in a luminous study room, examining a historical map of Mesopotamia showing Uruk, Ur, and trade routes extending toward the Persian Gulf and Anatolia. Clear negative space on top. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Objetivo de la Clase",
        overlaySubtitle: "Comprender excedentes comercio y primeras ciudades",
        overlayText: "Objetivo: Comprender excedentes comercio y primeras ciudades",
        vectorialOverlayPptx: "Rótulo formal: OA 2 · De las aldeas agrícolas a las primeras civilizaciones urbanas",
        speakerNotes: "El objetivo de hoy es sintetizar cómo los excedentes agrícolas masivos y el comercio interregional hicieron nacer las primeras ciudades en Mesopotamia.",
        palabrasAprox: 22,
        duracionSeg: 12
      },
      {
        slideNumber: 2,
        tituloMomento: "El Excedente como Motor",
        didacticPurpose: "El Excedente como Motor",
        visualPrompt: "Modern anime style. The girl explaining a diagram showing hydraulic canal networks filling vast central grain granaries in Sumer. Clean lineart, soft ambient light. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Excedentes en Mesopotamia",
        overlaySubtitle: "Canales de riego produciendo cosechas masivas",
        overlayText: "Excedentes en Mesopotamia: Canales de riego produciendo cosechas masivas",
        vectorialOverlayPptx: "Base hidráulica: El control del Tigris y Éufrates permitió cosechas gigantescas capaces de alimentar ciudades enteras",
        speakerNotes: "Los canales de regadío en Mesopotamia produjeron cosechas colosales. Ese excedente alimentario permitió sostener a miles de personas que no cultivaban la tierra.",
        palabrasAprox: 23,
        duracionSeg: 13
      },
      {
        slideNumber: 3,
        tituloMomento: "Redes Comerciales Lejanas",
        didacticPurpose: "Redes Comerciales Lejanas",
        visualPrompt: "Modern anime style. Trade route map illustration showing donkey caravans and boats connecting Sumer with the Zagros Mountains and Mediterranean coast. The two explorers studying the routes. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Intercambio Interregional",
        overlaySubtitle: "Trueque de alimentos por madera y metales",
        overlayText: "Intercambio Interregional: Trueque de alimentos por madera y metales",
        vectorialOverlayPptx: "Economía de trueque: Exportación de granos y lana a cambio de madera de cedro, cobre, estaño y piedras duras",
        speakerNotes: "Surgió el comercio interregional. Como en Mesopotamia faltaban materias primas, intercambiaron trigo y telas por madera de cedro, cobre y piedras duras de tierras lejanas.",
        palabrasAprox: 25,
        duracionSeg: 13
      },
      {
        slideNumber: 4,
        tituloMomento: "La Ciudad de Uruk",
        didacticPurpose: "La Ciudad de Uruk",
        visualPrompt: "Modern anime style. High-angle view of ancient Uruk with massive mudbrick defensive walls, thousands of flat-roofed houses, bustling markets, and the monumental Eanna temple precinct. Dramatic atmospheric lighting. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "La Primera Metrópolis",
        overlaySubtitle: "Cincuenta mil habitantes murallas y templos",
        overlayText: "La Primera Metrópolis: Cincuenta mil habitantes murallas y templos",
        vectorialOverlayPptx: "Revolución urbana (Gordon Childe): Asentamiento de alta densidad, murallas monumentales y división espacial",
        speakerNotes: "Hacia el 3.500 a.C. Uruk se convirtió en la primera gran ciudad. Con cincuenta mil habitantes, murallas de ladrillo y templos colosales, inauguró una nueva era.",
        palabrasAprox: 25,
        duracionSeg: 13
      },
      {
        slideNumber: 5,
        tituloMomento: "El Estado y la Contabilidad",
        didacticPurpose: "El Estado y la Contabilidad",
        visualPrompt: "Modern anime style. The boy sketching the evolution from clay counting tokens to clay tablets inscribed with early proto-cuneiform pictograms. Clear lighting. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Gestión Administrativa",
        overlaySubtitle: "De fichas de arcilla a la escritura",
        overlayText: "Gestión Administrativa: De fichas de arcilla a la escritura",
        vectorialOverlayPptx: "Origen de la escritura: Necesidad estatal de registrar tributos, raciones y almacenamiento en los templos",
        speakerNotes: "El Estado urbano necesitó organizar los almacenes. Para registrar impuestos y raciones de comida crearon marcas en tablillas de arcilla, originando la escritura.",
        palabrasAprox: 22,
        duracionSeg: 13
      },
      {
        slideNumber: 6,
        tituloMomento: "Atención al Error Común",
        didacticPurpose: "Atención al Error Común",
        visualPrompt: "Modern anime style. The girl contrasting an image of a small self-sufficient farming village with a complex city dependent on regional trade. Clean visual layout. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Error: La Ciudad no es Aldea",
        overlaySubtitle: "Requiere comercio exterior leyes y administración",
        overlayText: "Error: La Ciudad no es Aldea: Requiere comercio exterior leyes y administración",
        vectorialOverlayPptx: "Criterio disciplinar: La ciudad no es solo una aldea más grande; posee administración pública, leyes y comercio estatal",
        speakerNotes: "Un error habitual es creer que una ciudad es solo una aldea con más casas. La ciudad exige leyes escritas, comercio a larga distancia y autoridades centrales.",
        palabrasAprox: 25,
        duracionSeg: 13
      },
      {
        slideNumber: 7,
        tituloMomento: "Síntesis y Regla de Oro",
        didacticPurpose: "Síntesis y Regla de Oro",
        visualPrompt: "Modern anime style. Both 13-year-olds smiling confidently with their notebooks open before a grand panorama connecting: Neolítico -> Agricultura -> Excedentes -> Comercio -> Ciudad. Generous negative space. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Regla de Oro de la Civilización",
        overlaySubtitle: "El Neolítico hizo posible el mundo moderno",
        overlayText: "Regla de Oro: El Neolítico hizo posible el mundo moderno",
        vectorialOverlayPptx: "Conclusión de unidad: De la domesticación de especies nacieron las ciudades, las leyes y las primeras civilizaciones",
        speakerNotes: "La gran transformación se completó. Al dominar la producción de alimentos y el comercio, la humanidad construyó las primeras ciudades, abriendo las puertas de la civilización.",
        palabrasAprox: 24,
        duracionSeg: 13
      }
    ]
  },

  postQuestions: [
    {
      context: 'El Excedente como Base de la Urbanización',
      question: 'En el video explicativo vimos que Uruk albergaba a cincuenta mil personas que incluían sacerdotes, escribas, soldados y artesanos que no cosechaban comida. ¿Cómo fue posible mantener viva a toda esa población urbana?',
      expected: 'Gracias a los enormes excedentes producidos por los campesinos de las llanuras mediante canales de riego, los cuales eran almacenados y distribuidos centralmente por los templos de la ciudad.',
      success: '¡Excelente precisión de economía histórica! Supiste explicar cómo el campo alimentó a la ciudad mediante la administración de excedentes.',
      support: 'Fíjate en quién producía el alimento: los agricultores de los valles producían suficiente comida de sobra para alimentar a toda la ciudad.',
      reveal: 'Los excedentes agrícolas acumulados en los templos financiaron la alimentación de gobernantes, artesanos, soldados y escribas urbanos.',
      studentReveal: 'Porque los campesinos producían excedentes gigantescos con canales de riego y el templo repartía la comida a los habitantes de la ciudad.'
    },
    {
      context: 'El Comercio y la Dependencia Regional',
      question: '¿Por qué las primeras ciudades como Uruk no podían sobrevivir aisladas y dependían obligatoriamente de redes comerciales a larga distancia?',
      expected: 'Porque carecían de materias primas esenciales en su territorio aluvial (madera para vigas, piedra para cimientos y metales para herramientas), necesitando intercambiar sus granos y telas con otras regiones.',
      success: '¡Gran comprensión de las redes económicas! Reconociste la interdependencia geográfica como motor del comercio civilizatorio.',
      support: 'Piensa en los materiales de una ciudad: sin madera para vigas ni cobre para herramientas, ¿podrían levantar templos y murallas?',
      reveal: 'La ciudad dependía del comercio exterior porque su geografía carecía de madera, piedras y minerales, obligando a tejer redes comerciales interregionales.',
      studentReveal: 'Porque en su valle no tenían madera, piedras ni metales para construir y debían cambiarlos por sus granos y tejidos con otros pueblos.'
    }
  ],

  practice: [
    {
      context: 'Actividad en Cuaderno: Ensayo Breve de Síntesis del Neolítico a la Ciudad',
      question: 'Abre tu cuaderno de notas de Historia. Escribe como título: "Ensayo de Síntesis: De la Aldea Agrícola a la Primera Ciudad". Redacta un texto de dos párrafos: en el primer párrafo explica cómo la domesticación y los excedentes permitieron el nacimiento del comercio; en el segundo explica por qué Uruk es considerada la primera ciudad de la historia humana (menciona sus murallas, templos y administración).',
      expected: 'Ensayo breve de dos párrafos en el cuaderno estructurado con rigor conceptual, articulando excedentes, comercio, arquitectura monumental y administración urbana.',
      success: '¡Excelente ensayo en tu cuaderno! Has sintetizado la progresión completa del Objetivo de Aprendizaje con madurez y claridad.',
      support: 'Revisa tus apuntes de las seis clases: conecta la semilla domesticada con el excedente, el trueque a larga distancia y las murallas de Uruk.',
      reveal: 'El ensayo articula la cadena causal completa: domesticación -> excedente -> especialización -> comercio -> ciudad y civilización.',
      studentReveal: 'Ensayo completo en el cuaderno explicando la transición desde los excedentes agrícolas y el comercio hasta la ciudad de Uruk.'
    },
    {
      context: 'Análisis de Evidencias: La Escritura y la Administración',
      question: 'En tu cuaderno, responde brevemente: ¿Qué relación existió entre los sacos de trigo guardados en los almacenes de Uruk y la invención de los primeros signos escritos de la historia?',
      expected: 'Texto argumentativo que explique cómo la necesidad de registrar cantidades de grano, animales e impuestos motivó la creación de tablillas contables que dieron origen a la escritura.',
      success: '¡Brillante conexión historiográfica! Comprendiste que la escritura nació como una herramienta práctica para administrar la riqueza agrícola.',
      support: 'Piensa en la memoria humana: cuando hay miles de sacos y cientos de deudores, se vuelve indispensable anotar las cuentas en arcilla.',
      reveal: 'La escritura cuneiforme nació de la necesidad contable de registrar y administrar los excedentes alimentarios concentrados en los templos.',
      studentReveal: 'Texto en el cuaderno explicando que la escritura nació para anotar los sacos de trigo y pagos que se guardaban en los almacenes del templo.'
    }
  ],

  summaryIdeas: [
    ['Excedentes de Regadío', 'Los canales en Mesopotamia generaron cosechas masivas que alimentaron a poblaciones urbanas que no trabajaban en el campo.'],
    ['Comercio a Larga Distancia', 'La falta de madera, piedra y metales en los valles aluviales impulsó redes de trueque interregional con montañas y costas lejanas.'],
    ['La Ciudad y la Escritura', 'Uruk inauguró la vida urbana con murallas, templos y registros contables en arcilla que dieron origen directo a la escritura.']
  ],

  mini: [
    {
      id: 'q_1',
      q: '¿Cuál fue el factor geográfico y económico determinante que obligó a las primeras ciudades de Mesopotamia a desarrollar redes de comercio a larga distancia?',
      options: [
        'A) La prohibición religiosa de consumir cereales dentro de las murallas de la ciudad.',
        'B) La falta absoluta de agua en los ríos Tigris y Éufrates durante todo el año.',
        'C) Que los habitantes de Mesopotamia se negaban a trabajar la tierra y preferían comprar todo afuera.',
        'D) La escasez de materias primas esenciales en la llanura aluvial (madera, piedra y metales), las cuales debieron obtener intercambiando sus abundantes excedentes agrícolas y textiles.'
      ],
      correct: 'D) La escasez de materias primas esenciales en la llanura aluvial (madera, piedra y metales), las cuales debieron obtener intercambiando sus abundantes excedentes agrícolas y textiles.',
      fixExplain: 'Mesopotamia tenía ricos suelos y agua, pero carecía de minerales y árboles resistentes, obligando a generar caravanas comerciales.',
      concept: 'Causas del Comercio Interregional'
    },
    {
      id: 'q_2',
      q: '¿Por qué la ciudad de Uruk hacia el 3.500 a.C. representa un salto cualitativo frente a las aldeas agrícolas neolíticas anteriores?',
      options: [
        'A) Porque en Uruk las personas volvieron a vivir en cavernas y abandonaron la agricultura.',
        'B) Porque concentró a decenas de miles de habitantes con murallas monumentales, templos administrativos, estratificación social y registros contables.',
        'C) Porque fue construida en menos de una semana por un solo artesano.',
        'D) Porque sus habitantes no tenían ningún tipo de leyes ni autoridades de gobierno.'
      ],
      correct: 'B) Porque concentró a decenas de miles de habitantes con murallas monumentales, templos administrativos, estratificación social y registros contables.',
      fixExplain: 'La ciudad-estado integró una alta densidad poblacional, arquitectura monumental, división del trabajo y administración estatal formal.',
      concept: 'Características de la Primera Ciudad'
    },
    {
      id: 'q_3',
      q: '¿Cuál de las siguientes afirmaciones resume con rigor histórico el impacto de la Revolución Neolítica en la trayectoria de la humanidad?',
      options: [
        'A) Demostró que la recolección silvestre y el nomadismo eran superiores en todo sentido a la vida en poblados.',
        'B) Hizo que la población del planeta disminuyera drásticamente hasta quedar casi desierta.',
        'C) Transformó radicalmente la relación humana con la naturaleza, pasando de la economía depredadora a la productora, posibilitando el sedentarismo, las aldeas, los excedentes, el comercio y el nacimiento de las primeras civilizaciones.',
        'D) Fue un acontecimiento sin importancia que no dejó ninguna huella en las sociedades actuales.'
      ],
      correct: 'C) Transformó radicalmente la relación humana con la naturaleza, pasando de la economía depredadora a la productora, posibilitando el sedentarismo, las aldeas, los excedentes, el comercio y el nacimiento de las primeras civilizaciones.',
      fixExplain: 'El Neolítico constituyó la revolución material y social sobre la cual se edificaron todas las instituciones de la vida civilizada.',
      concept: 'Impacto Global del Neolítico'
    }
  ],

  recovery: [
    {
      title: 'Recuperación Histórica: De la Aldea a la Civilización Urbana',
      explain: 'El camino hacia la civilización fue posible gracias a la cadena de transformaciones del Neolítico: cultivar la tierra generó cosechas estables; las cosechas produjeron excedentes guardados en silos; los excedentes alimentaron a artesanos y permitieron el trueque con otros pueblos; y la concentración de población y riqueza creó las primeras ciudades con leyes y gobernantes.',
      q: '¿Cuál es la secuencia causal correcta que explica el surgimiento de las primeras ciudades como Uruk?',
      options: [
        'A) Agricultura de regadío -> Producción de excedentes -> Comercio de materias primas -> Especialización social y templos administrativos -> Nacimiento de la ciudad.',
        'B) Construcción de rascacielos -> Invención de fábricas de autos -> Desaparición de los ríos -> Vuelta a las cavernas.',
        'C) Guerra nuclear -> Destrucción de la agricultura -> Nomadismo en carretas -> Ciudades flotantes.',
        'D) Extinción de todas las plantas -> Caza exclusiva de mamuts -> Vida solitaria en bosques.'
      ],
      correct: 'A) Agricultura de regadío -> Producción de excedentes -> Comercio de materias primas -> Especialización social y templos administrativos -> Nacimiento de la ciudad.',
      correctText: '¡Correcto! Identificaste la cadena de transformaciones que condujo desde la agricultura productora hasta el nacimiento de la ciudad y la civilización.',
      fixText: 'Recuerda la cadena causal: agricultura de regadío -> excedentes de alimento -> comercio exterior -> especialización social -> primeras ciudades.'
    }
  ]
};
