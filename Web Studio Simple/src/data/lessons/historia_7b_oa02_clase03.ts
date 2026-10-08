import { LessonData } from '../../types/lesson';

export const HISTORIA_7B_OA02_CLASE03: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Historia, Geografía y Ciencias Sociales',
    oaCode: 'OA 2',
    oaTitle: 'Procesos de transformación de la vida humana en el Neolítico',
    lessonNumber: 3,
    totalLessonsInOa: 6,
    lessonTitle: 'Primeras aldeas sedentarias y organización comunitaria',
    durationMinutes: 30,
    nextLessonTitle: 'Innovaciones tecnológicas del Neolítico'
  },

  prep: {
    adultObjective: 'Acompañar al estudiante a comprender la reorganización del espacio geográfico y la vida comunitaria en las primeras aldeas sedentarias del Neolítico, analizando los casos arqueológicos de Çatalhöyük y Jericó, y reconociendo el surgimiento de la cooperación colectiva y la división del trabajo.',
    routeToday: 'De los campamentos temporales a las viviendas permanentes de adobe y la vida comunitaria.',
    mentorReminder: 'Sigue las indicaciones en pantalla paso a paso. Lee únicamente los recuadros DILE y PREGÚNTALE en voz alta.',
    reminders: [
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'No leas los recuadros SOLO PARA TI ni AYUDA PEDAGÓGICA.',
      'Haz cada pregunta y espera la respuesta antes de retroalimentar.',
      'Considera correcta una respuesta si expresa el razonamiento histórico con sus propias palabras.',
      'Pídele que imagine la vida cotidiana en una aldea donde no había calles y se caminaba por los techos.'
    ],
    emotionalTip: 'Invítalo a valorar el sentido de comunidad: "Vivir juntos en aldeas exigió inventar acuerdos, ayudarse en las cosechas y aprender a resolver conflictos en paz".'
  },

  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Historia y Geografía', subtitle: 'Primeras aldeas sedentarias', color: 'yellow' },
      { id: 'b2', number: '02', title: 'Exploración', subtitle: 'Casas de adobe y murallas comunales', color: 'orange' },
      { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Análisis de Çatalhöyük en cuaderno', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz formativo y síntesis', color: 'teal' }
    ],
    keyQuestions: [
      { label: '¿Cómo eran las primeras aldeas?', sub: 'Viviendas agrupadas de adobe construidas junto a ríos y valles fértiles.' },
      { label: '¿Qué nuevos roles surgieron?', sub: 'División del trabajo entre agricultores, constructores y pastores.' }
    ],
    dileIntro: 'Hoy comenzaremos la clase 3 de Historia, Geografía y Ciencias Sociales: "Primeras aldeas sedentarias y organización comunitaria".',
    dileObjective: 'Analizar cómo el sedentarismo transformó el hábitat humano y la organización social.'
  },

  situation: {
    dilePrompt: 'Observa la reconstrucción arqueológica de la aldea neolítica de Çatalhöyük en Anatolia (actual Turquía). Las casas estaban completamente pegadas unas a otras, sin calles entre ellas. Las personas subían por escaleras de madera a los techos, caminaban sobre las terrazas y entraban a sus hogares por una abertura superior. ¿Por qué crees que diseñaron su aldea de esta forma tan compacta?',
    expectedAnswer: 'Para defenderse de posibles ataques de animales salvajes o grupos rivales al no tener puertas exteriores vulnerables, y para aprovechar mejor el calor en invierno y el espacio disponible para los campos de cultivo.',
    socraticHint: 'Si no hay calles ni puertas en la planta baja, ¿cómo entra un intruso o un animal salvaje a la aldea?',
    emotionalTip: 'Valora la creatividad arquitectónica de nuestros antepasados para sentirse seguros y protegidos en su nuevo modo de vida.',
    options: [
      {
        label: 'Explicó que servía como muralla defensiva continua y para protegerse del clima y animales',
        kind: 'correct',
        feedbackText: '¡Exacto! La disposición adosada funcionaba como una fortaleza natural que protegía a toda la comunidad.'
      },
      {
        label: 'Dijo que no sabían hacer puertas ni ventanas comunes en el suelo',
        kind: 'needs_support',
        feedbackText: 'Sabían construir muy bien, pero entrar por el techo era una decisión inteligente de seguridad defensiva y aislamiento térmico.'
      },
      {
        label: 'No sabe qué responder o dio otra respuesta',
        kind: 'no_answer',
        feedbackText: 'Pista guiada: Fíjate en los muros exteriores continuos: al no tener puertas hacia afuera, ninguna fiera salvaje podía entrar a la aldea.'
      }
    ]
  },

  reference: {
    dilePrompt: 'En la antigua aldea de Jericó, los arqueólogos descubrieron una imponente muralla de piedra de cuatro metros de alto y una torre circular de ocho metros construida hacia el 8.000 a.C.',
    question: '¿Qué nos indica la construcción de una muralla y una torre monumental sobre la organización social de los habitantes de Jericó?',
    expectedAnswer: 'Indica que existía una sólida cooperación colectiva y líderes o consejos capaces de coordinar a cientos de personas trabajando juntas durante meses en una obra pública común.',
    socraticHint: 'Una sola familia no puede levantar una muralla de piedra de cuatro metros. ¿Quiénes tuvieron que participar y cómo debieron organizarse?',
    feedbackSuccess: '¡Excelente deducción histórica! Revela que ya existía coordinación comunitaria a gran escala y un fuerte sentido de defensa colectiva.',
    feedbackSupport: 'Una obra tan grande demuestra que la aldea trabajaba de forma unida bajo acuerdos comunitarios para proteger su territorio.'
  },

  hook: {
    title: 'La Vida Cotidiana en las Primeras Aldeas',
    titulo: 'La Vida Cotidiana en las Primeras Aldeas',
    focusPoints: [
      'El poblado de Çatalhöyük: Urbanismo compacto de adobe con acceso por los techos.',
      'Las defensas de Jericó: Murallas y torre circular de piedra para protección colectiva.',
      'División comunitaria: Tareas compartidas de siembra, construcción, pastoreo y alfarería.',
      'Lazos de parentesco: Ritos y enterramientos de antepasados bajo el suelo familiar.'
    ],
    dileIntro: 'Acompañemos a los dos exploradores a recorrer los tejados y patios de las primeras aldeas sedentarias de la historia.',
    hazInstruction: 'Observa cómo el espacio habitacional transformó la convivencia y la seguridad colectiva.',
    videoSrc: '',
    dileAfterVideo: 'Muy buena observación. Ahora profundizaremos en cómo estas aldeas cambiaron la organización humana.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Apertura y Escenario",
        didacticPurpose: "Apertura y Escenario",
        visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, arriving at a sunlit plateau overlooking the mudbrick rooftops of ancient Çatalhöyük. Warm morning light, wide negative space in top third. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Las Primeras Aldeas",
        overlaySubtitle: "Hogares permanentes junto a valles fértiles",
        overlayText: "Las Primeras Aldeas: Hogares permanentes junto a valles fértiles",
        vectorialOverlayPptx: "Coordenadas arqueológicas: Çatalhöyük (Anatolia) y Jericó (Cisjordania), 8.000 a 6.000 a.C.",
        speakerNotes: "Nuestros exploradores descubren Çatalhöyük, una de las aldeas más antiguas del mundo, donde cientos de familias compartían un asentamiento fijo de adobe.",
        palabrasAprox: 23,
        duracionSeg: 9
      },
      {
        slideNumber: 2,
        tituloMomento: "El Hábitat Adosado",
        didacticPurpose: "El Hábitat Adosado",
        visualPrompt: "Modern anime style. The girl climbing a wooden ladder through a roof opening into a clean, plastered mudbrick room with an oven and sleeping benches. Soft volumetric light, clear space on left. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Viviendas por el Techo",
        overlaySubtitle: "Entradas superiores y muros continuos protectores",
        overlayText: "Viviendas por el Techo: Entradas superiores y muros continuos protectores",
        vectorialOverlayPptx: "Arquitectura vernácula: Casas adosadas sin calles para aislamiento térmico y defensa",
        speakerNotes: "Las casas no tenían puertas en la planta baja. Las familias circulaban por los techos y descendían por escaleras, protegiéndose del frío y de animales salvajes.",
        palabrasAprox: 26,
        duracionSeg: 9
      },
      {
        slideNumber: 3,
        tituloMomento: "La Muralla de Jericó",
        didacticPurpose: "La Muralla de Jericó",
        visualPrompt: "Modern anime style. The boy standing before a massive stone fortification wall and circular tower of ancient Jericho, measuring the stones with admiration. Dramatic lighting, expressive eyes. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Fortificaciones Colectivas",
        overlaySubtitle: "Murallas de piedra levantadas en comunidad",
        overlayText: "Fortificaciones Colectivas: Murallas de piedra levantadas en comunidad",
        vectorialOverlayPptx: "Monumento comunitario: Muralla y torre de Jericó construidas mediante trabajo cooperativo",
        speakerNotes: "En Jericó, los aldeanos construyeron una imponente muralla de piedra. Esta gran obra exigió que toda la comunidad colaborara organizada para proteger su oasis.",
        palabrasAprox: 24,
        duracionSeg: 9
      },
      {
        slideNumber: 4,
        tituloMomento: "La División del Trabajo",
        didacticPurpose: "La División del Trabajo",
        visualPrompt: "Modern anime style. Bustling village scene: a group of men molding mudbricks, women weaving flax linen, and youths herding goats toward the green hills. Vibrant colors, clean composition. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Nuevas Labores Aldeanas",
        overlaySubtitle: "Agricultores constructores pastores y artesanos",
        overlayText: "Nuevas Labores Aldeanas: Agricultores constructores pastores y artesanos",
        vectorialOverlayPptx: "Organización social: Primeros pasos hacia la especialización y división comunitaria del trabajo",
        speakerNotes: "La vida aldeana impulsó la división de tareas: mientras unos sembraban en los campos, otros fabricaban ladrillos de adobe, cuidaban los rebaños o tejían mantas.",
        palabrasAprox: 25,
        duracionSeg: 9
      },
      {
        slideNumber: 5,
        tituloMomento: "El Espacio Sagrado",
        didacticPurpose: "El Espacio Sagrado",
        visualPrompt: "Modern anime style. The two young protagonists in a quiet domestic room with bull skull decorations (bucrania) and plastered hearths, looking with respect at an ancestral platform. Gentle warm light. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Memoria y Antepasados",
        overlaySubtitle: "Culto doméstico y enterramientos familiares",
        overlayText: "Memoria y Antepasados: Culto doméstico y enterramientos familiares",
        vectorialOverlayPptx: "Cohesión social: Sentido de pertenencia territorial vinculado al culto de los antepasados",
        speakerNotes: "Los lazos de parentesco eran sagrados. Enterraban a sus seres queridos bajo las plataformas de sus casas, reforzando el arraigo y el derecho a su tierra.",
        palabrasAprox: 25,
        duracionSeg: 9
      },
      {
        slideNumber: 6,
        tituloMomento: "El Espacio Modificado",
        didacticPurpose: "El Espacio Modificado",
        visualPrompt: "Modern anime style. Wide shot of the two explorers on a hill overlooking cultivated fields, water diversion ditches, and animal pens surrounding the village. Volumetric clouds, generous negative space. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Transformación del Paisaje",
        overlaySubtitle: "Campos canales y corrales alterando el entorno",
        overlayText: "Transformación del Paisaje: Campos canales y corrales alterando el entorno",
        vectorialOverlayPptx: "Geografía humana: Modificación intencional del entorno natural para fines productivos",
        speakerNotes: "El sedentarismo transformó el paisaje geográfico: abrieron canales para desviar agua de ríos, talaron matorrales y crearon huertos permanentes en el valle.",
        palabrasAprox: 22,
        duracionSeg: 9
      },
      {
        slideNumber: 7,
        tituloMomento: "Pregunta Detonante",
        didacticPurpose: "Pregunta Detonante",
        visualPrompt: "Modern anime style. Inspiring setting with both 13-year-olds smiling with their study notes before an ancient village map, curious and confident. Soft gradient background. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Interrogante Central",
        overlaySubtitle: "¿Cómo organizaron la convivencia en aldeas?",
        overlayText: "Interrogante Central: ¿Cómo organizaron la convivencia en aldeas?",
        vectorialOverlayPptx: "Pregunta rectora: ¿Qué acuerdos comunitarios permitieron la vida sedentaria?",
        speakerNotes: "¡Acompáñanos a descubrir cómo las primeras aldeas sedentarias crearon nuevas formas de cooperación, liderazgo y vida comunitaria!",
        palabrasAprox: 18,
        duracionSeg: 6
      }
    ]
  },

  preQuestions: [
    {
      context: 'El Urbanismo de Çatalhöyük',
      question: 'En el video observamos que las casas de Çatalhöyük estaban pegadas sin calles y se entraba por los techos. ¿Qué ventajas prácticas tenía esta forma de construir?',
      expected: 'Proporcionaba una muralla defensiva continua contra intrusos o animales feroces y mantenía el calor en las viviendas durante los inviernos rigurosos.',
      success: '¡Exacto! El diseño compacto ofrecía defensa colectiva pasiva y un excelente aislamiento térmico en la meseta.',
      support: 'Piensa en la seguridad: sin puertas al nivel del suelo, ningún enemigo o fiera podía ingresar sin trepar a las terrazas.',
      reveal: 'El diseño adosado de Çatalhöyük funcionaba como fortaleza comunal y protegía los hogares frente a las heladas invernales.',
      studentReveal: 'Servía como muralla defensiva continua para la aldea y mantenía el calor en las casas durante el invierno.'
    },
    {
      context: 'Las Murallas de Jericó y la Cooperación Social',
      question: '¿Por qué la construcción de la gran muralla y torre de Jericó demuestra que la sociedad neolítica ya tenía una organización comunitaria avanzada?',
      expected: 'Porque una obra de piedra tan grande requería trabajo conjunto planificado, turnos organizados y liderazgo comunal para coordinar a cientos de personas.',
      success: '¡Excelente análisis social! La arquitectura monumental es prueba irrefutable de trabajo cooperativo y acuerdos comunitarios estables.',
      support: 'Una familia sola no puede cortar ni transportar miles de piedras pesadas. Requirió el esfuerzo coordinado de todo el poblado.',
      reveal: 'Las fortificaciones de Jericó demuestran que las aldeas contaban con liderazgo, acuerdos colectivos y división de faenas para obras de bien común.',
      studentReveal: 'Porque levantar murallas de piedra exigió que cientos de aldeanos trabajaran juntos bajo acuerdos y liderazgos comunes.'
    }
  ],

  formalization: {
    title: 'El Espacio Aldeano y la Vida Comunitaria',
    concept: 'Primeras Aldeas Sedentarias y División del Trabajo',
    dileIntro: 'Ahora veremos el video explicativo. Comprenderemos cómo el sedentarismo transformó el espacio geográfico, la arquitectura y la división social del trabajo.',
    hazInstruction: 'Revisemos con atención la explicación formal y preparemos el cuaderno para registrar las ideas centrales.',
    ideaClave: 'El surgimiento de las primeras aldeas sedentarias como Çatalhöyük y Jericó reorganizó el espacio geográfico mediante viviendas permanentes de adobe, obras defensivas colectivas y una división inicial del trabajo entre agricultores, pastores y constructores.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Objetivo de la Lección",
        didacticPurpose: "Objetivo de la Lección",
        visualPrompt: "Modern anime style 16:9. The boy and girl in a luminous study room, examining architectural models of Neolithic mudbrick houses and village layouts. Clear negative space on top. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Objetivo de la Clase",
        overlaySubtitle: "Comprender la vida en primeras aldeas",
        overlayText: "Objetivo: Comprender la vida en primeras aldeas",
        vectorialOverlayPptx: "Rótulo formal: OA 2 · Hábitat sedentario y organización comunitaria",
        speakerNotes: "El objetivo de hoy es comprender cómo las primeras aldeas sedentarias transformaron el espacio geográfico e inauguraron la división social del trabajo.",
        palabrasAprox: 23,
        duracionSeg: 12
      },
      {
        slideNumber: 2,
        tituloMomento: "La Arquitectura de Adobe",
        didacticPurpose: "La Arquitectura de Adobe",
        visualPrompt: "Modern anime style. The girl explaining a cutaway illustration of a Neolithic mudbrick house: hearth, clay storage bins, reed roof with opening, and wooden ladder. Clean lineart. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Viviendas Permanentes",
        overlaySubtitle: "Ladrillos de adobe barro y madera",
        overlayText: "Viviendas Permanentes: Ladrillos de adobe barro y madera",
        vectorialOverlayPptx: "Tecnología constructiva: Ladrillos de barro y paja secados al sol para arquitectura duradera",
        speakerNotes: "El adobe fue el material estrella. Mezclando arcilla, agua y paja secada al sol, levantaron viviendas cuadrangulares sólidas que resistían años de uso.",
        palabrasAprox: 24,
        duracionSeg: 13
      },
      {
        slideNumber: 3,
        tituloMomento: "El Caso de Çatalhöyük",
        didacticPurpose: "El Caso de Çatalhöyük",
        visualPrompt: "Modern anime style. High-angle architectural view of Çatalhöyük showing contiguous rooftops, people walking between terraces, and ladder entrances. The two explorers studying the settlement map. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Urbanismo sin Calles",
        overlaySubtitle: "Circulación por terrazas y azoteas comunales",
        overlayText: "Urbanismo sin Calles: Circulación por terrazas y azoteas comunales",
        vectorialOverlayPptx: "Caso arqueológico: Asentamiento igualitario de Çatalhöyük (Anatolia, 7.500 a.C.)",
        speakerNotes: "En Çatalhöyük vivían miles de personas sin calles. Los tejados eran plazas públicas donde molían granos, horneaban pan y conversaban en comunidad.",
        palabrasAprox: 22,
        duracionSeg: 13
      },
      {
        slideNumber: 4,
        tituloMomento: "Defensa Colectiva en Jericó",
        didacticPurpose: "Defensa Colectiva en Jericó",
        visualPrompt: "Modern anime style. Detailed diagram showing the stone defensive ditch, stone wall, and circular tower of Jericho with water channels flowing from the spring. Soft ambient light. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Obras Públicas Comunes",
        overlaySubtitle: "Protección ante crecidas y pueblos vecinos",
        overlayText: "Obras Públicas Comunes: Protección ante crecidas y pueblos vecinos",
        vectorialOverlayPptx: "Ingeniería temprana: Murallas de Jericó como respuesta a riesgos hídricos y amenazas externas",
        speakerNotes: "Jericó levantó murallas de piedra para resguardar su manantial y defender sus cosechas, demostrando que podían organizar faenas colectivas masivas.",
        palabrasAprox: 21,
        duracionSeg: 13
      },
      {
        slideNumber: 5,
        tituloMomento: "La División del Trabajo",
        didacticPurpose: "La División del Trabajo",
        visualPrompt: "Modern anime style. Four-quadrant diagram: 1. Labranza de campos, 2. Pastoreo, 3. Fabricación de adobes, 4. Tejido y alfarería. The two 13-year-olds analyzing each role. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Especialización de Roles",
        overlaySubtitle: "Nuevas tareas divididas en la comunidad",
        overlayText: "Especialización de Roles: Nuevas tareas divididas en la comunidad",
        vectorialOverlayPptx: "Estructura social: Diferenciación inicial de funciones productivas y de cuidado",
        speakerNotes: "Con el sedentarismo nació la división del trabajo: las familias se repartieron labores entre cultivo, pastoreo, construcción y artesanías útiles.",
        palabrasAprox: 20,
        duracionSeg: 13
      },
      {
        slideNumber: 6,
        tituloMomento: "Atención al Error Común",
        didacticPurpose: "Atención al Error Común",
        visualPrompt: "Modern anime style. The boy pointing to an architectural drawing, correcting the mistaken idea of modern avenues with a graphic of clustered Neolithic rooftops. Clean visuals. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Error: No Eran Ciudades",
        overlaySubtitle: "Eran aldeas agrícolas de organización familiar",
        overlayText: "Error: No Eran Ciudades: Eran aldeas agrícolas de organización familiar",
        vectorialOverlayPptx: "Rigor conceptual: Distinción entre aldea igualitaria neolítica y ciudad-estado estratificada posterior",
        speakerNotes: "Un error común es llamar ciudades a estas primeras aldeas. Eran asentamientos campesinos donde primaba el parentesco y la colaboración familiar.",
        palabrasAprox: 21,
        duracionSeg: 13
      },
      {
        slideNumber: 7,
        tituloMomento: "Síntesis y Regla de Oro",
        didacticPurpose: "Síntesis y Regla de Oro",
        visualPrompt: "Modern anime style. The two 13-year-olds smiling confidently with their notebooks open before a peaceful view of a fertile Neolithic river village at sunset. Generous negative space. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Regla de Oro Comunitaria",
        overlaySubtitle: "Vivienda permanente y cooperación organizada",
        overlayText: "Regla de Oro: Vivienda permanente y cooperación organizada",
        vectorialOverlayPptx: "Conclusión didáctica: Sedentarismo = Reorganización del espacio + Cooperación social colectiva",
        speakerNotes: "La aldea sedentaria transformó la convivencia. La vivienda permanente y el trabajo compartido establecieron las bases de la vida en sociedad que perdura hasta hoy.",
        palabrasAprox: 25,
        duracionSeg: 13
      }
    ]
  },

  postQuestions: [
    {
      context: 'El Espacio de Convivencia en Çatalhöyük',
      question: 'En el video revisamos que en Çatalhöyük las terrazas y tejados eran los espacios principales de circulación y encuentro diario. ¿Cómo influyó esto en la relación entre los vecinos de la aldea?',
      expected: 'Favoreció una intensa convivencia comunitaria y colaboración cercana, ya que las familias realizaban sus labores domésticas y conversaban compartiendo los techos de sus hogares.',
      success: '¡Excelente deducción de geografía social! Supiste reconocer cómo la arquitectura física moldea los vínculos y la confianza comunitaria.',
      support: 'Imagina que tu patio o vereda fuera el techo de tu casa y de la de tu vecino: ¿tendrías mucho contacto con ellos?',
      reveal: 'Los techos compartidos funcionaron como plazas públicas donde las familias cooperaban, fortaleciendo la solidaridad comunitaria.',
      studentReveal: 'Generó una convivencia muy cercana y unida porque todos compartían los techos para trabajar, cocinar y conversar.'
    },
    {
      context: 'Las Murallas de Jericó como Obra Colectiva',
      question: '¿Por qué la muralla de piedra de Jericó es considerada por los arqueólogos como una de las primeras obras de ingeniería pública de la humanidad?',
      expected: 'Porque no beneficiaba a una sola familia sino a toda la comunidad, y requirió planificación colectiva, mano de obra masiva y dirección técnica compartida.',
      success: '¡Gran comprensión histórica! Identificaste el carácter público y solidario de las obras defensivas neolíticas.',
      support: 'Piensa en quiénes se protegían detrás del muro: servía para resguardar a todos los habitantes del poblado.',
      reveal: 'La muralla de Jericó es la primera gran obra pública porque fue concebida, levantada y mantenida por el esfuerzo conjunto de toda la aldea.',
      studentReveal: 'Porque fue una obra para proteger a todo el pueblo que exigió el esfuerzo y trabajo planificado de todos los vecinos juntos.'
    }
  ],

  practice: [
    {
      context: 'Actividad en Cuaderno: Ficha Arqueológica de Çatalhöyük',
      question: 'Abre tu cuaderno de notas de Historia. Escribe como título: "Primeras Aldeas Sedentarias: El Caso de Çatalhöyük". Dibuja un croquis de una vivienda de adobe (mostrando la escalera, la abertura en el techo, el fogón y las plataformas para dormir). Debajo, explica en tres líneas por qué no tenían puertas al nivel de la tierra.',
      expected: 'Ficha arqueológica en el cuaderno con dibujo rotulado y justificación de la arquitectura defensiva y térmica.',
      success: '¡Excelente trabajo en tu cuaderno! Has graficado el hábitat neolítico con gran fidelidad a los hallazgos arqueológicos.',
      support: 'Revisa las diapositivas de la lección: recuerda incluir la entrada por el techo y la función de protección contra el frío y animales feroces.',
      reveal: 'La ficha permite comprender cómo las viviendas reflejaban las necesidades de abrigo, seguridad y vida doméstica permanente.',
      studentReveal: 'Ficha completa en el cuaderno con croquis de vivienda de adobe y fundamentación de la entrada por el techo.'
    },
    {
      context: 'Reflexión Social: La División de Tareas en la Aldea',
      question: 'En tu cuaderno, elabora un breve cuadro con cuatro oficios o tareas neolíticas (agricultor, pastor, constructor de adobe, alfarero/tejedor) y explica cómo cada una beneficiaba al resto de la comunidad.',
      expected: 'Cuadro en el cuaderno con cuatro roles neolíticos y análisis de la interdependencia y beneficio mutuo en la aldea.',
      success: '¡Brillante análisis de organización social! Explicaste con precisión cómo la división del trabajo unió a la comunidad.',
      support: 'Piensa en el intercambio: el agricultor alimenta al constructor de adobe, y el constructor levanta la casa del agricultor.',
      reveal: 'La división del trabajo creó interdependencia social: ningún individuo podía subsistir aislado, reforzando la unión comunitaria.',
      studentReveal: 'Cuadro en el cuaderno con los cuatro oficios neolíticos y explicación del beneficio mutuo e interdependencia.'
    }
  ],

  summaryIdeas: [
    ['Hábitat Permanente', 'Las viviendas de adobe secado al sol permitieron vivir en comunidad fija durante todo el año cerca de tierras fértiles.'],
    ['Obras Colectivas', 'Yacimientos como Jericó y Çatalhöyük demuestran defensa colectiva, trabajo cooperativo y arquitectura adaptada al entorno.'],
    ['División del Trabajo', 'Surgieron roles comunitarios complementarios entre siembra, pastoreo, construcción y artesanías indispensables.']
  ],

  mini: [
    {
      id: 'q_1',
      q: '¿Cuál fue la razón arquitectónica principal por la que los habitantes de Çatalhöyük construyeron sus casas pegadas unas a otras sin calles intermedias?',
      options: [
        'A) Para crear una muralla exterior continua que protegiera a la comunidad de animales salvajes y regulara la temperatura.',
        'B) Porque tenían prohibido caminar al aire libre por órdenes de sacerdotes extranjeros.',
        'C) Porque el suelo estaba cubierto de agua de mar y las casas flotaban sobre botes.',
        'D) Porque querían construir pistas de carreras para carruajes de hierro sobre las azoteas.'
      ],
      correct: 'A) Para crear una muralla exterior continua que protegiera a la comunidad de animales salvajes y regulara la temperatura.',
      fixExplain: 'El trazado adosado actuaba como defensa colectiva y aislante térmico en el riguroso clima de Anatolia.',
      concept: 'Arquitectura Defensiva de Çatalhöyük'
    },
    {
      id: 'q_2',
      q: '¿Qué nos enseña la monumental muralla de piedra descubierta en la antigua Jericó sobre la sociedad que la construyó hacia el 8.000 a.C.?',
      options: [
        'A) Que era una banda de diez cazadores nómades que levantó el muro en una sola tarde.',
        'B) Que las familias no hablaban entre sí y competían destruyéndose mutuamente sus chozas.',
        'C) Que las piedras fueron transportadas por extraterrestres según las leyendas locales.',
        'D) Que poseía una avanzada capacidad de cooperación comunitaria, acuerdos colectivos y liderazgo para realizar obras públicas.'
      ],
      correct: 'D) Que poseía una avanzada capacidad de cooperación comunitaria, acuerdos colectivos y liderazgo para realizar obras públicas.',
      fixExplain: 'Una fortificación de tal escala requirió cientos de trabajadores coordinados y un sólido sentido de protección compartida.',
      concept: 'Cooperación Comunitaria en Jericó'
    },
    {
      id: 'q_3',
      q: 'Al consolidarse el sedentarismo en las aldeas neolíticas, ¿qué transformación fundamental experimentó la organización del trabajo humano?',
      options: [
        'A) Todas las personas fueron obligadas a hacer exactamente la misma tarea al mismo minuto.',
        'B) Se produjo una división social del trabajo donde diferentes miembros asumieron tareas especializadas como cultivo, pastoreo, construcción y alfarería.',
        'C) El trabajo desapareció por completo porque la comida crecía sola sin ningún esfuerzo humano.',
        'D) Se contrataron trabajadores de otros continentes pagados mediante billetes de banco.'
      ],
      correct: 'B) Se produjo una división social del trabajo donde diferentes miembros asumieron tareas especializadas como cultivo, pastoreo, construcción y alfarería.',
      fixExplain: 'La vida sedentaria permitió repartir funciones según las necesidades del poblado, aumentando la eficiencia comunitaria.',
      concept: 'División del Trabajo Neolítica'
    }
  ],

  recovery: [
    {
      title: 'Recuperación Histórica: Vida en las Primeras Aldeas',
      explain: 'El sedentarismo no consistió únicamente en quedarse en un sitio: exigió inventar una nueva manera de convivir. Levantaron casas de barro y piedra, construyeron defensas compartidas y se repartieron las tareas de siembra, ganado y construcción.',
      q: '¿Qué características definían a una aldea sedentaria del Neolítico como Çatalhöyük o Jericó?',
      options: [
        'A) Carpas temporales de pieles de animales que se desmontaban cada semana para seguir ciervos.',
        'B) Rascacielos de hormigón armado con electricidad y avenidas pavimentadas para automóviles.',
        'C) Casas permanentes de adobe o piedra, trabajo cooperativo entre vecinos y división de labores de subsistencia.',
        'D) Castillos medievales gobernados por reyes con caballeros armados con armaduras de acero.'
      ],
      correct: 'C) Casas permanentes de adobe o piedra, trabajo cooperativo entre vecinos y división de labores de subsistencia.',
      correctText: '¡Correcto! Identificaste los pilares del hábitat sedentario neolítico: vivienda duradera, cooperación y división del trabajo.',
      fixText: 'Recuerda que las aldeas neolíticas se caracterizaron por casas permanentes de adobe, cooperación colectiva y especialización de tareas.'
    }
  ]
};
