import { LessonData } from '../../types/lesson';

export const HISTORIA_7B_OA02_CLASE02: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Historia, Geografía y Ciencias Sociales',
    oaCode: 'OA 2',
    oaTitle: 'Procesos de transformación de la vida humana en el Neolítico',
    lessonNumber: 2,
    totalLessonsInOa: 6,
    lessonTitle: 'Domesticación de plantas y animales en el Creciente Fértil',
    durationMinutes: 30,
    nextLessonTitle: 'Primeras aldeas sedentarias y organización comunitaria'
  },

  prep: {
    adultObjective: 'Acompañar al estudiante a comprender el mecanismo histórico de la domesticación en el Creciente Fértil: cómo la selección artificial empírica de semillas (trigo escanda, cebada) y animales dóciles (ovejas, cabras) transformó a las especies silvestres y permitió la planificación alimentaria estacional.',
    routeToday: 'De la recolección silvestre a la domesticación selectiva y el almacenamiento de semillas.',
    mentorReminder: 'Sigue las indicaciones en pantalla paso a paso. Lee únicamente los recuadros DILE y PREGÚNTALE en voz alta.',
    reminders: [
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'No leas los recuadros SOLO PARA TI ni AYUDA PEDAGÓGICA.',
      'Haz cada pregunta y espera la respuesta antes de retroalimentar.',
      'Considera correcta una respuesta si expresa el razonamiento histórico con sus propias palabras.',
      'Asegura que comprenda la diferencia entre amaestrar un animal salvaje individual y domesticar una especie a lo largo de generaciones.'
    ],
    emotionalTip: 'Fomenta la curiosidad científica e histórica: "Nuestros antepasados fueron observadores minuciosos de la naturaleza que aprendieron a multiplicar la vida para alimentarse".'
  },

  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Historia y Geografía', subtitle: 'Domesticación en el Creciente Fértil', color: 'yellow' },
      { id: 'b2', number: '02', title: 'Exploración', subtitle: 'Selección artificial y ciclos agrícolas', color: 'orange' },
      { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Transformación de especies en cuaderno', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz formativo y síntesis', color: 'teal' }
    ],
    keyQuestions: [
      { label: '¿Cómo se domesticó una planta?', sub: 'Seleccionando semillas de espigas más firmes y granos más grandes.' },
      { label: '¿Qué animales se integraron?', sub: 'Ovejas y cabras dóciles que aportaban carne, lana y leche.' }
    ],
    dileIntro: 'Hoy comenzaremos la clase 2 de Historia, Geografía y Ciencias Sociales: "Domesticación de plantas y animales en el Creciente Fértil".',
    dileObjective: 'Comprender cómo la selección artificial y los ciclos de cultivo aseguraron la alimentación humana.'
  },

  situation: {
    dilePrompt: 'Observa la espiga de trigo silvestre y la espiga de trigo cultivado en pantalla. La planta silvestre dispersa sus granos al suelo con el viento para reproducirse, mientras que la planta domesticada retiene sus semillas en la espiga para que las personas puedan cosecharlas. ¿Por qué crees que los primeros recolectores decidieron guardar y sembrar únicamente los granos que no se caían solos?',
    expectedAnswer: 'Porque si los granos caían al suelo se perdían entre la tierra, mientras que las plantas que retenían sus granos permitían recolectar cosechas abundantes para alimentar a la comunidad y guardar semillas para la próxima temporada.',
    socraticHint: 'Ponte en el lugar de quien cosecha trigo con una hoz: ¿prefieres cortar una planta cuyos granos caen al barro o una cuyos granos quedan firmes en la espiga?',
    emotionalTip: 'Invítalo a valorar el ingenio humano: ese sencillo acto de seleccionar semillas dio origen a toda la agricultura moderna.',
    options: [
      {
        label: 'Explicó que seleccionaban las espigas que retenían sus granos para cosechar más alimento',
        kind: 'correct',
        feedbackText: '¡Exacto! Esa selección intencional de rasgos favorables se llama selección artificial empírica.'
      },
      {
        label: 'Dijo que las plantas cambiaron solas sin que nadie las eligiera ni sembrara',
        kind: 'needs_support',
        feedbackText: 'Las plantas cambiaron porque las familias humanas sembraron año tras año solo las semillas de las mejores espigas.'
      },
      {
        label: 'No sabe qué responder o dio otra respuesta',
        kind: 'no_answer',
        feedbackText: 'Pista guiada: Fíjate en el dibujo: al elegir espigas con granos firmes y grandes, las siguientes cosechas salían cada vez más rendidoras.'
      }
    ]
  },

  reference: {
    dilePrompt: 'Además de cuidar los cereales, las comunidades neolíticas construyeron corrales para criar ovejas y cabras cerca de sus viviendas.',
    question: '¿Qué ventajas ofrecía tener un rebaño de cabras y ovejas vivas en comparación con salir a cazar animales salvajes?',
    expectedAnswer: 'Tener animales domesticados aseguraba alimento continuo (leche, carne), pieles y lana sin riesgo de sufrir heridas en cacerías ni pasar hambre si los animales salvajes migraban.',
    socraticHint: 'Si cazas una gacela silvestre, obtienes carne una sola vez. Pero si cuidas una cabra viva en un corral, ¿qué obtienes todos los días?',
    feedbackSuccess: '¡Brillante deducción histórica! El rebaño vivo proporcionó recursos secundarios diarios como leche y lana, además de seguridad alimentaria constante.',
    feedbackSupport: 'Un rebaño en corral garantizaba leche fresca todos los días y lana para abrigarse, sin depender de la suerte de la caza.'
  },

  hook: {
    title: 'El Secreto de las Primeras Cosechas',
    titulo: 'El Secreto de las Primeras Cosechas',
    focusPoints: [
      'El arco del Creciente Fértil: Cuencas de los ríos Tigris y Éufrates con trigo escanda y cebada silvestre.',
      'Selección artificial: Selección repetida de espigas con raquis resistente durante cientos de ciclos.',
      'Domesticación de rebaños: Control reproductivo y convivencia con ovejas y cabras dóciles.',
      'Los primeros silos: Protección de granos secos frente a la humedad y los roedores.'
    ],
    dileIntro: 'Acompañemos a los dos jóvenes exploradores a investigar cómo una pequeña semilla y un dócil rebaño cambiaron el destino de la humanidad.',
    hazInstruction: 'Observa con atención cómo la selección de especies permitió asegurar el alimento para todo el año.',
    videoSrc: '',
    dileAfterVideo: 'Excelente observación. Ahora analizaremos las claves de este gran salto productivo.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Apertura y Escenario",
        didacticPurpose: "Apertura y Escenario",
        visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, arriving at a golden foothill valley in the Fertile Crescent with wild wheat swaying in the breeze. Cinematic warm morning light, wide negative space in top third. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "El Creciente Fértil",
        overlaySubtitle: "Valles del Tigris y Éufrates floreciendo",
        overlayText: "El Creciente Fértil: Valles del Tigris y Éufrates floreciendo",
        vectorialOverlayPptx: "Coordenadas históricas: Arco fértil de Medio Oriente (10.000 a 8.000 a.C.)",
        speakerNotes: "Nuestros dos exploradores llegan a los valles del Creciente Fértil, donde abundaban el trigo silvestre, la cebada y las manadas de cabras montesas.",
        palabrasAprox: 23,
        duracionSeg: 9
      },
      {
        slideNumber: 2,
        tituloMomento: "El Enigma de la Semilla",
        didacticPurpose: "El Enigma de la Semilla",
        visualPrompt: "Modern anime style. The girl holding a magnifying glass inspecting an ancient ear of emmer wheat, comparing a fragile wild stem with a sturdy domesticated stalk. Clean lineart, soft depth of field, clear space on left. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "El Trigo Silvestre",
        overlaySubtitle: "Espigas frágiles que dispersan su grano",
        overlayText: "El Trigo Silvestre: Espigas frágiles que dispersan su grano",
        vectorialOverlayPptx: "Mutación y selección: Trigo silvestre (raquis quebradizo) vs Trigo cultivado (raquis firme)",
        speakerNotes: "Al examinar las espigas silvestres descubren un misterio: la naturaleza hace que el grano se desprenda solo, dificultando su recolección humana.",
        palabrasAprox: 21,
        duracionSeg: 9
      },
      {
        slideNumber: 3,
        tituloMomento: "La Selección Paciente",
        didacticPurpose: "La Selección Paciente",
        visualPrompt: "Modern anime style. The boy and girl observing Neolithic villagers carefully sorting harvested grain baskets, separating the largest, healthiest seeds into clay pots. Dramatic lighting, expressive eyes. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Selección Artificial",
        overlaySubtitle: "Elegir las mejores semillas para sembrar",
        overlayText: "Selección Artificial: Elegir las mejores semillas para sembrar",
        vectorialOverlayPptx: "Mecanismo biológico: Selección humana empírica repetida a lo largo de generaciones",
        speakerNotes: "Los recolectores notaron que algunas espigas conservaban el grano adherido. Comenzaron a guardar esas semillas específicas para sembrarlas al año siguiente.",
        palabrasAprox: 22,
        duracionSeg: 9
      },
      {
        slideNumber: 4,
        tituloMomento: "El Rebaño Amistoso",
        didacticPurpose: "El Rebaño Amistoso",
        visualPrompt: "Modern anime style. The two young protagonists near a stone-walled pen where gentle sheep and goats drink from a wooden trough, with villagers shearing wool. Warm afternoon sunlight, clean composition. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Domesticación de Rebaños",
        overlaySubtitle: "Ovejas y cabras conviviendo en aldeas",
        overlayText: "Domesticación de Rebaños: Ovejas y cabras conviviendo en aldeas",
        vectorialOverlayPptx: "Ganadería neolítica: De la caza indiscriminada al control reproductivo y pastoreo",
        speakerNotes: "Al mismo tiempo, aprendieron a controlar manadas de ovejas y cabras dóciles, asegurando leche fresca, lana para abrigo y carne sin salir a cazar.",
        palabrasAprox: 24,
        duracionSeg: 9
      },
      {
        slideNumber: 5,
        tituloMomento: "El Ciclo Agrícola",
        didacticPurpose: "El Ciclo Agrícola",
        visualPrompt: "Modern anime style. The boy taking notes on an illustrated four-season circular calendar carved on stone, while the girl points to a field being prepared with stone hoes. Vibrant colors, focused determination. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "El Calendario Agrícola",
        overlaySubtitle: "Siembra cuidados riego y cosecha estacional",
        overlayText: "El Calendario Agrícola: Siembra cuidados riego y cosecha estacional",
        vectorialOverlayPptx: "Ciclo de subsistencia: Preparación del suelo -> Siembra -> Protección -> Cosecha",
        speakerNotes: "La agricultura exigió sincronizarse con las estaciones: preparar la tierra tras las lluvias, regar los brotes y organizar la cosecha comunitaria.",
        palabrasAprox: 20,
        duracionSeg: 9
      },
      {
        slideNumber: 6,
        tituloMomento: "El Silo Protector",
        didacticPurpose: "El Silo Protector",
        visualPrompt: "Modern anime style. Wide shot of the two explorers inspecting an underground pit lined with clay plaster and sealed with flat stones, filled with dried golden grain. Calm volumetric light, wide negative space. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "El Almacenamiento",
        overlaySubtitle: "Guardar grano para el invierno venidero",
        overlayText: "El Almacenamiento: Guardar grano para el invierno venidero",
        vectorialOverlayPptx: "Innovación técnica: Silos sellados para resguardar excedentes de plagas y humedad",
        speakerNotes: "Para que el cultivo tuviera sentido fue vital guardarlo. Inventaron silos y vasijas selladas para proteger las reservas de grano durante los meses fríos.",
        palabrasAprox: 24,
        duracionSeg: 9
      },
      {
        slideNumber: 7,
        tituloMomento: "Pregunta Detonante",
        didacticPurpose: "Pregunta Detonante",
        visualPrompt: "Modern anime style. Elegant visual setting with the two 13-year-olds smiling with their study notes in hand beside an ancient clay jar overflowing with wheat. Soft gradient background. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Pregunta de Indagación",
        overlaySubtitle: "¿Cómo cambió la domesticación nuestra vida?",
        overlayText: "Pregunta de Indagación: ¿Cómo cambió la domesticación nuestra vida?",
        vectorialOverlayPptx: "Interrogante central: ¿De qué manera la selección artificial transformó la relación con el entorno?",
        speakerNotes: "Ahora descubriremos en la lección cómo estas técnicas agrícolas y ganaderas sentaron las bases para fundar las primeras aldeas permanentes.",
        palabrasAprox: 21,
        duracionSeg: 6
      }
    ]
  },

  preQuestions: [
    {
      context: 'Selección Artificial del Trigo Escanda',
      question: 'Vimos que el trigo silvestre botaba sus semillas al suelo y el trigo cultivado las retenía en la espiga. ¿Cómo lograron los agricultores que todo su campo tuviera espigas firmes?',
      expected: 'Seleccionando y sembrando únicamente las semillas de las espigas que retenían sus granos, repitiendo este proceso durante muchas generaciones hasta que esa característica predominó.',
      success: '¡Exacto! Esa selección artificial empírica fue la que transformó genéticamente las especies vegetales para el provecho humano.',
      support: 'Piensa en qué semilla sembraban: si solo sembraban las espigas que no se caían, ¿cómo serían las plantas de la siguiente cosecha?',
      reveal: 'Al sembrar exclusivamente semillas con espigas firmes, los agricultores favorecieron esa característica hasta domesticar por completo la especie.',
      studentReveal: 'Sembrando durante muchas generaciones solo las semillas de las espigas firmes que no soltaban el grano.'
    },
    {
      context: 'El Rol de los Primeros Silos de Grano',
      question: '¿Por qué la construcción de silos y vasijas selladas con arcilla fue tan importante como el acto mismo de sembrar?',
      expected: 'Porque de nada servía cosechar mucho grano si se pudría con la lluvia o se lo comían los roedores; el almacenamiento aseguró reservas para sobrevivir y sembrar al año siguiente.',
      success: '¡Excelente visión económica! El almacenamiento garantizó la seguridad alimentaria en épocas de sequía o invierno.',
      support: 'Imagina que cosechas mil sacos de trigo: si no tienes dónde guardarlos secos y protegidos de ratones, ¿qué pasa en pocas semanas?',
      reveal: 'El almacenamiento en silos protegió los granos de la humedad y plagas, garantizando comida para el invierno y semillas para la nueva siembra.',
      studentReveal: 'Porque protegía el grano de la humedad y los roedores, asegurando comida para el invierno y semillas para el próximo año.'
    }
  ],

  formalization: {
    title: 'Domesticación y Selección Artificial en el Neolítico',
    concept: 'Domesticación de Plantas y Animales en el Creciente Fértil',
    dileIntro: 'Ahora veremos el video explicativo. Comprenderemos los conceptos históricos de selección artificial, ciclos de cultivo y conservación de excedentes.',
    hazInstruction: 'Revisemos la explicación formal y preparemos el cuaderno para registrar las ideas centrales.',
    ideaClave: 'La domesticación en el Creciente Fértil fue un proceso de selección artificial continua: al elegir plantas con mayores granos y animales dóciles, las comunidades aseguraron alimentos predecibles y reservas para el futuro.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Objetivo de la Lección",
        didacticPurpose: "Objetivo de la Lección",
        visualPrompt: "Modern anime style 16:9. The boy and girl in a luminous study room, pointing at an anatomical and botanical diagram comparing wild einkorn wheat and modern domesticated wheat. Clear negative space on top. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Objetivo de la Clase",
        overlaySubtitle: "Comprender la domesticación y selección artificial",
        overlayText: "Objetivo: Comprender la domesticación y selección artificial",
        vectorialOverlayPptx: "Rótulo formal: OA 2 · Domesticación en el Creciente Fértil",
        speakerNotes: "El objetivo de hoy es comprender cómo la selección artificial y el manejo de ciclos estacionales permitieron domesticar plantas y animales en el Creciente Fértil.",
        palabrasAprox: 25,
        duracionSeg: 12
      },
      {
        slideNumber: 2,
        tituloMomento: "Concepto de Selección Artificial",
        didacticPurpose: "Concepto de Selección Artificial",
        visualPrompt: "Modern anime style. The girl explaining a comparison board with wild goat horns versus domesticated sheep wool icons. Soft lighting, clean infographic layout. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Selección Artificial Empírica",
        overlaySubtitle: "Modificación de especies para beneficio humano",
        overlayText: "Selección Artificial Empírica: Modificación de especies para beneficio humano",
        vectorialOverlayPptx: "Definición histórica: Intervención humana continua seleccionando rasgos ventajosos de plantas y animales",
        speakerNotes: "La selección artificial es la elección intencionada de rasgos favorables: granos más nutritivos en las plantas y docilidad y mayor tamaño en los animales.",
        palabrasAprox: 24,
        duracionSeg: 13
      },
      {
        slideNumber: 3,
        tituloMomento: "El Caso del Trigo Escanda",
        didacticPurpose: "El Caso del Trigo Escanda",
        visualPrompt: "Modern anime style. Close-up diagram showing a wheat spikelet: wild brittle rachis breaking vs non-brittle tough rachis of domesticated wheat. The two explorers examining the grain closely. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "El Raquis no Quebradizo",
        overlaySubtitle: "Retener semillas para facilitar la cosecha",
        overlayText: "El Raquis no Quebradizo: Retener semillas para facilitar la cosecha",
        vectorialOverlayPptx: "Mutación domesticada: El raquis resistente retiene el grano en la espiga durante la siega",
        speakerNotes: "En el trigo, la clave fue el raquis no quebradizo. Las espigas que no soltaban el grano al viento permitieron a las familias cosechar grandes cantidades sin pérdidas.",
        palabrasAprox: 27,
        duracionSeg: 13
      },
      {
        slideNumber: 4,
        tituloMomento: "Domesticación de Ganado Menor",
        didacticPurpose: "Domesticación de Ganado Menor",
        visualPrompt: "Modern anime style. The boy sketching a pen with sheep, goats and pigs, noting secondary products: wool, milk, leather and traction. Clean lineart, soft ambient lighting. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Ganadería y Recursos Continuos",
        overlaySubtitle: "Leche lana y carne en corrales",
        overlayText: "Ganadería y Recursos Continuos: Leche lana y carne en corrales",
        vectorialOverlayPptx: "Aprovechamiento secundario: Obtención recurrente de derivados lácteos y textiles sin sacrificar el ganado",
        speakerNotes: "Las ovejas y cabras se convirtieron en despensas vivientes: aportaban leche y lana de forma periódica, complementando la dieta vegetal con proteínas de calidad.",
        palabrasAprox: 24,
        duracionSeg: 13
      },
      {
        slideNumber: 5,
        tituloMomento: "Almacenamiento y Seguridad",
        didacticPurpose: "Almacenamiento y Seguridad",
        visualPrompt: "Modern anime style. Village storage scene with sealed pottery jars and subterranean clay silos being inspected by village elders and the two protagonists. Clear negative space. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Reservas de Alimento",
        overlaySubtitle: "Silos y vasijas protegiendo la cosecha",
        overlayText: "Reservas de Alimento: Silos y vasijas protegiendo la cosecha",
        vectorialOverlayPptx: "Función económica: Conservación de excedentes estacionales para subsistencia y siembra posterior",
        speakerNotes: "El almacenamiento resolvió el dilema del invierno. Guardar granos en silos subterráneos secos aseguró comida durante los meses sin cosecha y semillas para sembrar.",
        palabrasAprox: 24,
        duracionSeg: 13
      },
      {
        slideNumber: 6,
        tituloMomento: "Atención al Error Frecuente",
        didacticPurpose: "Atención al Error Frecuente",
        visualPrompt: "Modern anime style. Visual contrast showing a wild aggressive wolf versus a friendly domesticated sheep flock, emphasizing generational biological changes. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Error: Amaestrar no es Domesticar",
        overlaySubtitle: "Domesticar altera la genética de generaciones",
        overlayText: "Error: Amaestrar no es Domesticar: Domesticar altera la genética de generaciones",
        vectorialOverlayPptx: "Diferenciación conceptual: Amaestramiento (conducta individual) vs Domesticación (cambio evolutivo poblacional)",
        speakerNotes: "Un error habitual es confundir amaestrar con domesticar. Amaestrar es educar a un animal salvaje; domesticar es transformar genéticamente a toda una especie a lo largo de siglos.",
        palabrasAprox: 27,
        duracionSeg: 13
      },
      {
        slideNumber: 7,
        tituloMomento: "Síntesis y Regla de Oro",
        didacticPurpose: "Síntesis y Regla de Oro",
        visualPrompt: "Modern anime style. The two 13-year-olds smiling proudly with their open notebooks before an ancient Fertile Crescent landscape of cultivated terraces and grazing sheep. Clear negative space. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Regla de Oro Agrícola",
        overlaySubtitle: "Selección continua y almacenamiento planificado",
        overlayText: "Regla de Oro: Selección continua y almacenamiento planificado",
        vectorialOverlayPptx: "Síntesis metodológica: Observación empírica + Selección artificial + Almacenamiento = Estabilidad comunitaria",
        speakerNotes: "La domesticación y el almacenamiento liberaron a las comunidades de la escasez inmediata, sentando las bases materiales para construir las primeras aldeas sedentarias permanentes.",
        palabrasAprox: 24,
        duracionSeg: 13
      }
    ]
  },

  postQuestions: [
    {
      context: 'El Mecanismo de Selección Artificial en Cereales',
      question: 'En el video explicativo analizamos que el trigo silvestre tenía un raquis quebradizo y el domesticado un raquis firme. ¿Por qué este cambio biológico fue fundamental para la subsistencia de los agricultores?',
      expected: 'Porque evitó que los granos maduros cayeran al suelo y se perdieran con el viento, permitiendo que las familias cosecharan el grano completo en la espiga para alimentarse y almacenar.',
      success: '¡Excelente precisión arqueobotánica! Comprendiste con exactitud cómo la mutación del raquis firme hizo posible la cosecha a gran escala.',
      support: 'Fíjate en lo que ocurría durante la siega: si el tallo de la espiga se quiebra solo, el grano cae al suelo y no se puede recolectar.',
      reveal: 'El raquis no quebradizo permitió recoger las espigas enteras con hoces, multiplicando el rendimiento de las cosechas neolíticas.',
      studentReveal: 'Porque impidió que las semillas cayeran al suelo con el viento, permitiendo cosechar las espigas enteras.'
    },
    {
      context: 'Los Beneficios Secundarios de la Ganadería',
      question: '¿Por qué la cría de ovejas y cabras en corrales fue más provechosa que cazar animales salvajes, más allá de la obtención de carne?',
      expected: 'Porque proporcionó recursos secundarios continuos como leche para beber todos los días y lana o cuero para confeccionar vestimentas, sin tener que matar al animal de inmediato.',
      success: '¡Muy bien fundamentado! La ganadería aportó productos secundarios permanentes que mejoraron la nutrición y el abrigo de la comunidad.',
      support: 'Piensa en los derivados que da un animal vivo: la leche y la lana se pueden obtener muchas veces a lo largo de su vida.',
      reveal: 'Los productos secundarios (leche, queso primitivo, lana y abono para los campos) transformaron al rebaño en un recurso productivo continuo.',
      studentReveal: 'Porque los animales vivos daban leche todos los días y lana para vestimenta sin necesidad de sacrificarlos.'
    }
  ],

  practice: [
    {
      context: 'Actividad en Cuaderno: Esquema de Transformación de Especies',
      question: 'Abre tu cuaderno de notas de Historia. Escribe como título: "Domesticación de Especies en el Creciente Fértil". Dibuja un esquema comparativo: a la izquierda ilustra el trigo silvestre (raquis quebradizo, granos pequeños) y a la derecha el trigo domesticado (raquis resistente, granos grandes). Explica debajo cómo la selección artificial humana produjo esa transformación.',
      expected: 'Esquema comparativo en el cuaderno con dibujos y explicación fundamentada de la selección artificial empírica.',
      success: '¡Excelente esquema en tu cuaderno! Has representado la transformación biológica con claridad y rigor histórico.',
      support: 'Revisa las diapositivas de la lección: explica que los humanos sembraban solo las semillas con mejores características año tras año.',
      reveal: 'El esquema visualiza cómo la acción humana modificó las características físicas de las especies vegetales para asegurar su sustento.',
      studentReveal: 'Esquema completo en el cuaderno comparando el trigo silvestre y el cultivado con explicación de la selección artificial.'
    },
    {
      context: 'Análisis de Fuentes: El Almacenamiento y la Seguridad Alimentaria',
      question: 'En tu cuaderno, redacta un breve texto argumentativo respondiendo: ¿Qué consecuencias habría tenido para una comunidad neolítica cosechar abundante trigo pero carecer de silos o vasijas de cerámica para guardarlo?',
      expected: 'Texto argumentativo que analice los riesgos de pérdida por humedad, roedores o descomposición, impidiendo la supervivencia en el invierno.',
      success: '¡Gran argumentación histórica! Relacionaste la tecnología del almacenamiento con la supervivencia material de la aldea.',
      support: 'Piensa en las lluvias de invierno y las plagas de insectos: sin vasijas ni silos impermeables, ¿cuánto dura un saco de trigo guardado en el suelo?',
      reveal: 'Sin tecnología de almacenamiento hermético, las cosechas se habrían perdido rápidamente y las familias habrían enfrentado hambrunas invernales.',
      studentReveal: 'Texto argumentativo en el cuaderno explicando que sin silos ni vasijas el trigo se habría podrido con las lluvias y comido por plagas.'
    }
  ],

  summaryIdeas: [
    ['Selección Artificial', 'Los primeros agricultores eligieron y sembraron repetidamente las semillas con espigas firmes y granos más nutritivos.'],
    ['Ganadería de Rebaño', 'La domesticación de ovejas y cabras proporcionó carne, leche diaria y lana para abrigo sin depender del azar de la caza.'],
    ['Silos y Almacenamiento', 'Construir silos subterráneos y vasijas de arcilla garantizó reservas de alimento para el invierno y semillas para el siguiente ciclo.']
  ],

  mini: [
    {
      id: 'q_1',
      q: '¿Cuál fue la transformación biológica decisiva producida por la selección artificial en el trigo domesticado del Creciente Fértil?',
      options: [
        'A) Las raíces se volvieron venenosas para evitar que los insectos tocaran la planta.',
        'B) Las flores cambiaron de color para atraer abejas en mitad de la noche.',
        'C) El raquis de la espiga se volvió más resistente, evitando que los granos cayeran solos al suelo antes de la cosecha.',
        'D) Las espigas aprendieron a desplazarse solas hacia los ríos para absorber agua.'
      ],
      correct: 'C) El raquis de la espiga se volvió más resistente, evitando que los granos cayeran solos al suelo antes de la cosecha.',
      fixExplain: 'El raquis no quebradizo permitió recolectar la espiga entera sin perder los granos maduros en la tierra.',
      concept: 'Selección Artificial del Trigo'
    },
    {
      id: 'q_2',
      q: '¿Por qué la domesticación de ganado menor (ovejas y cabras) ofreció una ventaja económica superior frente a la caza tradicional de animales salvajes?',
      options: [
        'A) Porque aseguró recursos secundarios regulares como leche y lana sin necesidad de sacrificar inmediatamente al animal.',
        'B) Porque los animales domesticados cazaban solos a los animales salvajes para alimentar a las familias.',
        'C) Porque las cabras podían nadar océanos enteros para traer mercancías de otros continentes.',
        'D) Porque las ovejas aprendieron a tejer sus propias telas en telares de madera.'
      ],
      correct: 'A) Porque aseguró recursos secundarios regulares como leche y lana sin necesidad de sacrificar inmediatamente al animal.',
      fixExplain: 'La ganadería proporcionó proteínas lácteas diarias y abrigo continuo, superando la incertidumbre de la caza de subsistencia.',
      concept: 'Ventajas de la Ganadería Neolítica'
    },
    {
      id: 'q_3',
      q: 'Para evitar el error común de confundir amaestrar con domesticar, ¿cuál es la diferencia conceptual correcta en historia y arqueología?',
      options: [
        'A) Amaestrar es enseñar trucos a un rebaño completo, mientras que domesticar es encerrar a un pájaro en una jaula.',
        'B) Domesticar implica una modificación genética y biológica hereditaria en una población a lo largo de generaciones, mientras que amaestrar modifica solo la conducta de un individuo.',
        'C) Amaestrar dura miles de años y domesticar ocurre en un solo día con cualquier fiera salvaje.',
        'D) No existe ninguna diferencia; ambas palabras significan exactamente lo mismo en ciencias sociales.'
      ],
      correct: 'B) Domesticar implica una modificación genética y biológica hereditaria en una población a lo largo de generaciones, mientras que amaestrar modifica solo la conducta de un individuo.',
      fixExplain: 'La domesticación es un proceso evolutivo y biológico guiado por el ser humano que modifica a la especie completa.',
      concept: 'Diferencia entre Domesticar y Amaestrar'
    }
  ],

  recovery: [
    {
      title: 'Recuperación Histórica: Comprensión de la Domesticación Neolítica',
      explain: 'La domesticación en el Creciente Fértil fue el resultado de miles de años de interacción entre seres humanos, plantas y animales. Al elegir y cuidar las especies más productivas y dóciles, las comunidades aseguraron su subsistencia diaria.',
      q: '¿Qué combinación de factores permitió a las primeras comunidades del Creciente Fértil lograr una producción de alimentos estable?',
      options: [
        'A) Depender de la caza migratoria en invierno y comprar comida en ferias medievales en verano.',
        'B) Esperar que las semillas crecieran sin regarlas ni seleccionarlas, viviendo siempre en cuevas temporales.',
        'C) Usar únicamente herramientas de piedra tosca para derribar árboles sin sembrar ninguna planta.',
        'D) La selección artificial de cereales con raquis firme, la cría de ganado dócil en corrales y el almacenamiento de reservas en silos protegidos.'
      ],
      correct: 'D) La selección artificial de cereales con raquis firme, la cría de ganado dócil en corrales y el almacenamiento de reservas en silos protegidos.',
      correctText: '¡Correcto! Identificaste la articulación integral de factores que consolidó la economía productora en el Creciente Fértil.',
      fixText: 'Recuerda que la producción estable requirió tres pilares: selección de semillas firmes, ganado dócil en corrales y almacenamiento hermético.'
    }
  ]
};
