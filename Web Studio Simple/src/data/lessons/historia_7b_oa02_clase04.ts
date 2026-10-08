import { LessonData } from '../../types/lesson';

export const HISTORIA_7B_OA02_CLASE04: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Historia, Geografía y Ciencias Sociales',
    oaCode: 'OA 2',
    oaTitle: 'Procesos de transformación de la vida humana en el Neolítico',
    lessonNumber: 4,
    totalLessonsInOa: 6,
    lessonTitle: 'Innovaciones tecnológicas del Neolítico',
    durationMinutes: 30,
    nextLessonTitle: 'Propiedad, jerarquías y especialización del trabajo'
  },

  prep: {
    adultObjective: 'Acompañar al estudiante a comprender las innovaciones tecnológicas de la Revolución Neolítica (piedra pulida, alfarería, cestería, telar y metalurgia incipiente del cobre), analizando cómo estas herramientas transformaron la preparación de alimentos, el almacenamiento de reservas y la modificación del entorno natural.',
    routeToday: 'De la piedra tallada a la piedra pulida, la cerámica cocida y los telares.',
    mentorReminder: 'Sigue las indicaciones en pantalla paso a paso. Lee únicamente los recuadros DILE y PREGÚNTALE en voz alta.',
    reminders: [
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'No leas los recuadros SOLO PARA TI ni AYUDA PEDAGÓGICA.',
      'Haz cada pregunta y espera la respuesta antes de retroalimentar.',
      'Considera correcta una respuesta si expresa el razonamiento histórico con sus propias palabras.',
      'Ten a mano el cuaderno de Historia para dibujar las herramientas y esquemas.'
    ],
    emotionalTip: 'Fomenta el aprecio por la tecnología ancestral: "La tecnología no comenzó con los teléfonos ni computadores: comenzó cuando los seres humanos crearon herramientas para resolver sus necesidades cotidianas".'
  },

  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Historia y Geografía', subtitle: 'Tecnología de la piedra pulida', color: 'yellow' },
      { id: 'b2', number: '02', title: 'Exploración', subtitle: 'Alfarería hornos y telares', color: 'orange' },
      { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Cuadro de inventos en cuaderno', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz formativo y síntesis', color: 'teal' }
    ],
    keyQuestions: [
      { label: '¿Qué significa piedra pulida?', sub: 'Herramientas frotadas con arena que logran filos más firmes y resistentes.' },
      { label: '¿Por qué la cerámica fue vital?', sub: 'Permitió cocinar caldos y proteger cosechas de humedad y roedores.' }
    ],
    dileIntro: 'Hoy comenzaremos la clase 4 de Historia, Geografía y Ciencias Sociales: "Innovaciones tecnológicas del Neolítico".',
    dileObjective: 'Analizar cómo la piedra pulimentada, la cerámica y los telares transformaron la vida cotidiana.'
  },

  situation: {
    dilePrompt: 'Observa en pantalla una hacha del Paleolítico (piedra tallada a golpes con filos irregulares) junto a una hacha del Neolítico (piedra pulida frotada con arena y agua, con un filo liso y uniforme engastada en un mango de madera firme). ¿Por qué para talar árboles grandes y abrir campos de siembra era indispensable usar una hacha de piedra pulimentada y no una tosca piedra tallada?',
    expectedAnswer: 'Porque al pulir la piedra no quedan grietas internas; el filo liso soporta golpes fuertes repetidos contra troncos duros sin quebrarse, mientras que la piedra tallada a golpes se fractura con facilidad al chocar contra la madera.',
    socraticHint: 'Si golpeas una piedra quebradiza llena de astillas contra un tronco de roble, ¿qué le pasa? ¿Y si la piedra fue pulida y compactada frotándola con arena?',
    emotionalTip: 'Invítalo a valorar el esfuerzo físico y mental de quienes inventaron el pulido: frotar una piedra durante días requería paciencia y visión de futuro.',
    options: [
      {
        label: 'Explicó que el filo pulimentado era más resistente a impactos fuertes y no se quebraba',
        kind: 'correct',
        feedbackText: '¡Exacto! La técnica del pulido eliminaba fracturas internas, creando herramientas de impacto duraderas.'
      },
      {
        label: 'Dijo que solo la pulían para que se viera brillante y bonita',
        kind: 'needs_support',
        feedbackText: 'Aunque se veía lisa, el motivo central era práctico: un filo pulido no se rompe al cortar árboles duros.'
      },
      {
        label: 'No sabe qué responder o dio otra respuesta',
        kind: 'no_answer',
        feedbackText: 'Pista guiada: Fíjate en el filo: al estar frotado con arena, la hoja es compacta y resiste golpes constantes contra la madera.'
      }
    ]
  },

  reference: {
    dilePrompt: 'Antes de inventar la alfarería cocida, los seres humanos no podían poner recipientes directamente sobre el fuego para hervir agua o cocinar granos duros.',
    question: '¿De qué manera la invención de vasijas de cerámica cocida en hornos mejoró la salud y la alimentación de las familias de la aldea?',
    expectedAnswer: 'Permitió hervir agua y cocinar sopas, papillas y guisos con cereales y legumbres, haciendo los alimentos mucho más nutritivos, suaves y fáciles de digerir para niños pequeños y ancianos.',
    socraticHint: '¿Puedes comer trigo crudo y duro fácilmente? ¿Qué pasa cuando lo cocinas en agua hirviendo dentro de una olla de arcilla?',
    feedbackSuccess: '¡Brillante razonamiento nutricional e histórico! La cerámica revolucionó la dieta humana al permitir la cocción prolongada de alimentos.',
    feedbackSupport: 'Cocinar en ollas de barro permitió hacer papillas y sopas nutritivas, mejorando la digestión y la esperanza de vida.'
  },

  hook: {
    title: 'Los Inventos que Transformaron el Neolítico',
    titulo: 'Los Inventos que Transformaron el Neolítico',
    focusPoints: [
      'Piedra pulida: Hachas para despejar bosques y molinos barquiformes de mano para harina.',
      'Alfarería cocida: Hornos de barro que crearon recipientes impermeables y resistentes al fuego.',
      'Textilería y telar: Tejido de lana y lino para reemplazar las pieles por prendas ligeras.',
      'Metalurgia incipiente: Trabajo inicial del cobre martillado en frío para adornos y punzones.'
    ],
    dileIntro: 'Acompañemos a los dos exploradores a un taller neolítico para descubrir cómo estas tecnologías cambiaron el trabajo diario.',
    hazInstruction: 'Observa cómo cada herramienta resolvía un problema concreto de alimentación, abrigo y trabajo.',
    videoSrc: '',
    dileAfterVideo: 'Excelente observación. Ahora analizaremos el impacto de cada una de estas innovaciones técnicas.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Apertura y Escenario",
        didacticPurpose: "Apertura y Escenario",
        visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, arriving at an ancient artisan quarter in a sunny Neolithic village. Warm morning light, wide negative space in top third. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "El Taller Neolítico",
        overlaySubtitle: "Artesanos creando herramientas para la aldea",
        overlayText: "El Taller Neolítico: Artesanos creando herramientas para la aldea",
        vectorialOverlayPptx: "Revolución técnica: Nuevas herramientas para nuevas necesidades de subsistencia",
        speakerNotes: "Nuestros exploradores llegan a una aldea neolítica donde las familias perfeccionan inventos indispensables para su vida diaria sedentaria.",
        palabrasAprox: 20,
        duracionSeg: 9
      },
      {
        slideNumber: 2,
        tituloMomento: "El Pulido de la Piedra",
        didacticPurpose: "El Pulido de la Piedra",
        visualPrompt: "Modern anime style. The boy observing a villager patiently rubbing a greenstone axe head with wet abrasive sand on a large sandstone boulder, showing smooth polished facets. Soft clean lighting, clear space on left. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Piedra Pulimentada",
        overlaySubtitle: "Frotado con arena para filos indestructibles",
        overlayText: "Piedra Pulimentada: Frotado con arena para filos indestructibles",
        vectorialOverlayPptx: "Técnica lítica: Frotamiento abrasivo con agua para eliminar microfracturas y lograr filos uniformes",
        speakerNotes: "La técnica del pulido revolucionó las herramientas. Al frotar la piedra con arena y agua, lograban filos resistentes que no se rompían al golpear.",
        palabrasAprox: 24,
        duracionSeg: 9
      },
      {
        slideNumber: 3,
        tituloMomento: "El Molino de Mano",
        didacticPurpose: "El Molino de Mano",
        visualPrompt: "Modern anime style. The girl trying out a boat-shaped stone saddle quern (metate), grinding golden wheat grains into white flour with a smooth handstone. Expressive eyes, warm ambient lighting. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Molienda de Cereales",
        overlaySubtitle: "Molinos de piedra para transformar el grano",
        overlayText: "Molienda de Cereales: Molinos de piedra para transformar el grano",
        vectorialOverlayPptx: "Procesamiento de alimentos: De granos duros e indigeribles a harina molida lista para el pan",
        speakerNotes: "Los granos de trigo eran duros para masticar. Con molinos de piedra pulida los transformaron en harina fina, inventando las primeras tortas y panes cocidos.",
        palabrasAprox: 25,
        duracionSeg: 9
      },
      {
        slideNumber: 4,
        tituloMomento: "La Alfarería y el Fuego",
        didacticPurpose: "La Alfarería y el Fuego",
        visualPrompt: "Modern anime style. Close-up on a potter smoothing a wet clay vessel with coils, next to an active domed kiln glowing with orange coals. Vibrant colors, clean composition. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Cerámica en Hornos",
        overlaySubtitle: "Recipientes impermeables que soportan el fuego",
        overlayText: "Cerámica en Hornos: Recipientes impermeables que soportan el fuego",
        vectorialOverlayPptx: "Tecnología pirotécnica: Transformación química de la arcilla en material cerámico impermeable",
        speakerNotes: "Al cocer la arcilla en hornos lograron recipientes impermeables. Por primera vez pudieron hervir caldos directamente al fuego y proteger sus granos de las lluvias.",
        palabrasAprox: 25,
        duracionSeg: 9
      },
      {
        slideNumber: 5,
        tituloMomento: "El Telar Vertical",
        didacticPurpose: "El Telar Vertical",
        visualPrompt: "Modern anime style. The two young companions examining an upright warp-weighted wooden loom with woven linen and wool patterns, decorated with bone weaving needles. Soft depth of field. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Textilería y Vestimenta",
        overlaySubtitle: "Lino y lana tejidos en telares",
        overlayText: "Textilería y Vestimenta: Lino y lana tejidos en telares",
        vectorialOverlayPptx: "Manufactura textil: Hilado con huso y tejido en telar vertical para reemplazar pieles pesadas",
        speakerNotes: "El telar permitió tejer fibras de lana de oveja y lino vegetal. Las familias reemplazaron las pieles pesadas de caza por prendas livianas, flexibles y lavables.",
        palabrasAprox: 25,
        duracionSeg: 9
      },
      {
        slideNumber: 6,
        tituloMomento: "Los Primeros Metales",
        didacticPurpose: "Los Primeros Metales",
        visualPrompt: "Modern anime style. Wide shot of the two explorers inspecting cold-hammered native copper awls, beads, and small hooks shining with reddish metallic luster on an artisan mat. Volumetric lighting. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Cobre Martillado",
        overlaySubtitle: "Primeros destellos de la metalurgia naciente",
        overlayText: "Cobre Martillado: Primeros destellos de la metalurgia naciente",
        vectorialOverlayPptx: "Metalurgia incipiente: Martillado en frío de cobre nativo para adornos y pequeños punzones",
        speakerNotes: "Hacia el final del Neolítico hallaron pepitas de cobre puro. Golpeándolas en frío con piedras, modelaron pequeños punzones y adornos metálicos brillantes.",
        palabrasAprox: 22,
        duracionSeg: 9
      },
      {
        slideNumber: 7,
        tituloMomento: "Pregunta Detonante",
        didacticPurpose: "Pregunta Detonante",
        visualPrompt: "Modern anime style. Elegant visual setting with the two 13-year-olds smiling with their notebooks beside a display of polished tools, pottery, and woven fabric. Soft background. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Pregunta de Indagación",
        overlaySubtitle: "¿Cómo cambió la técnica nuestra vida?",
        overlayText: "Pregunta de Indagación: ¿Cómo cambió la técnica nuestra vida?",
        vectorialOverlayPptx: "Pregunta rectora: ¿Qué impacto social tuvieron las nuevas tecnologías del Neolítico?",
        speakerNotes: "¡Descubramos en la lección cómo estas innovaciones técnicas multiplicaron la capacidad de producir, guardar y transformar la vida cotidiana!",
        palabrasAprox: 19,
        duracionSeg: 6
      }
    ]
  },

  preQuestions: [
    {
      context: 'El Impacto del Molino de Mano',
      question: 'En el video vimos cómo la molienda de trigo en molinos de piedra transformó los granos duros en harina. ¿Por qué esto fue una revolución para la nutrición diaria?',
      expected: 'Porque permitió hornear pan y preparar tortas y papillas que se digerían mucho mejor, alimentando eficientemente a niños pequeños y ancianos.',
      success: '¡Exacto! La molienda de cereales multiplicó la absorción de nutrientes y facilitó la alimentación de toda la familia.',
      support: 'Piensa en lo difícil que es masticar semillas secas crudas frente a comer pan o papilla suave recién horneada.',
      reveal: 'El molino de mano permitió elaborar harina y pan, transformando cereales duros en la base alimentaria más nutritiva de la comunidad.',
      studentReveal: 'Porque convirtió granos duros en harina para hacer pan y papillas suaves fáciles de comer para todos.'
    },
    {
      context: 'La Cerámica Cocida y la Salud',
      question: '¿Por qué la invención de vasijas que podían ponerse directamente sobre el fuego ayudó a prevenir enfermedades en las aldeas?',
      expected: 'Porque al hervir el agua y cocinar los alimentos a altas temperaturas se eliminaban bacterias y parásitos, haciendo la comida más segura y saludable.',
      success: '¡Excelente deducción sanitaria! Hervir alimentos y agua en ollas de cerámica redujo drásticamente las infecciones estomacales.',
      support: 'Recuerda qué le hace el fuego al agua cuando hierve: mata microbios dañinos y hace que los alimentos no enfermen a la gente.',
      reveal: 'Cocer alimentos y hervir agua en recipientes cerámicos purificó la dieta, reduciendo enfermedades transmitidas por bacterias y parásitos.',
      studentReveal: 'Porque hervir el agua y cocer la comida a fuego eliminaba microbios y parásitos que enfermaban a la gente.'
    }
  ],

  formalization: {
    title: 'La Revolución Tecnológica del Neolítico',
    concept: 'Innovaciones Tecnológicas del Neolítico',
    dileIntro: 'Ahora veremos el video explicativo. Comprenderemos en profundidad cómo la piedra pulida, la cerámica cocida, los telares y la metalurgia inicial transformaron a la sociedad.',
    hazInstruction: 'Revisemos con atención la explicación formal y preparemos el cuaderno para registrar las ideas centrales.',
    ideaClave: 'Las innovaciones tecnológicas neolíticas (piedra pulimentada, alfarería cocida, telar y metalurgia incipiente) resolvieron necesidades cruciales de alimentación, almacenamiento y modificación del espacio geográfico.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Objetivo de la Lección",
        didacticPurpose: "Objetivo de la Lección",
        visualPrompt: "Modern anime style 16:9. The boy and girl in a luminous study room, examining archaeological diagrams of Neolithic tools: polished axes, ceramic vessels, and loom parts. Clear negative space on top. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Objetivo de la Clase",
        overlaySubtitle: "Comprender las tecnologías del Neolítico",
        overlayText: "Objetivo: Comprender las tecnologías del Neolítico",
        vectorialOverlayPptx: "Rótulo formal: OA 2 · Innovaciones técnicas de la Revolución Neolítica",
        speakerNotes: "El objetivo de hoy es comprender cómo la piedra pulida, la cerámica, los telares y el cobre transformaron la subsistencia y la vida cotidiana neolítica.",
        palabrasAprox: 24,
        duracionSeg: 12
      },
      {
        slideNumber: 2,
        tituloMomento: "Piedra Pulida y Medio Físico",
        didacticPurpose: "Piedra Pulida y Medio Físico",
        visualPrompt: "Modern anime style. The girl explaining a technical diagram showing how a polished stone axe cuts down trees to clear farmland, with micrographic comparison of stone surfaces. Clear lineart. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Hachas y Azadas Pulimentadas",
        overlaySubtitle: "Modificar el paisaje para campos agrícolas",
        overlayText: "Hachas y Azadas Pulimentadas: Modificar el paisaje para campos agrícolas",
        vectorialOverlayPptx: "Transformación geográfica: Deforestación controlada de bosques y preparación de surcos agrícolas",
        speakerNotes: "La piedra pulida permitió talar bosques y remover suelos duros. Gracias a hachas y azadas resistentes abrieron campos de cultivo permanentes en los valles.",
        palabrasAprox: 23,
        duracionSeg: 13
      },
      {
        slideNumber: 3,
        tituloMomento: "Alfarería y Conservación",
        didacticPurpose: "Alfarería y Conservación",
        visualPrompt: "Modern anime style. Close-up diagram of clay pottery being fired, showing water impermeability and protection against mice and moisture. The two explorers testing a ceramic jar. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Cerámica y Almacenamiento",
        overlaySubtitle: "Protección de granos y cocción de guisos",
        overlayText: "Cerámica y Almacenamiento: Protección de granos y cocción de guisos",
        vectorialOverlayPptx: "Beneficio doble: 1. Almacenamiento impermeable y hermético · 2. Cocción hervida de legumbres y cereales",
        speakerNotes: "La cerámica cocida aportó dos ventajas decisivas: ollas que resistían el fuego para hervir sopas y tinajas herméticas que protegían el grano de la humedad.",
        palabrasAprox: 24,
        duracionSeg: 13
      },
      {
        slideNumber: 4,
        tituloMomento: "La Revolución Textil",
        didacticPurpose: "La Revolución Textil",
        visualPrompt: "Modern anime style. The boy illustrating a vertical loom with hanging clay loom-weights, showing warp and weft fibers interlacing smoothly. Clean lighting. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Telares y Fibras Naturales",
        overlaySubtitle: "Lino y lana para vestimentas ligeras",
        overlayText: "Telares y Fibras Naturales: Lino y lana para vestimentas ligeras",
        vectorialOverlayPptx: "Tecnología textil: Uso de husos de hilar y telares para crear tejidos suaves, higiénicos y resistentes",
        speakerNotes: "Los telares transformaron la vestimenta. Al hilar lana de oveja y fibras de lino, elaboraron mantas y túnicas ligeras, dejando atrás las pieles rígidas del Paleolítico.",
        palabrasAprox: 25,
        duracionSeg: 13
      },
      {
        slideNumber: 5,
        tituloMomento: "Metalurgia Temprana del Cobre",
        didacticPurpose: "Metalurgia Temprana del Cobre",
        visualPrompt: "Modern anime style. An artisan martillando cold native copper nuggets into thin needles, awls, and shiny green-blue beads on an anvil stone. The two 13-year-olds watching with interest. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Los Primeros Metales",
        overlaySubtitle: "Cobre martillado para herramientas precisas",
        overlayText: "Los Primeros Metales: Cobre martillado para herramientas precisas",
        vectorialOverlayPptx: "Transición calcolítica: De la piedra trabajada al martillado en frío del cobre nativo",
        speakerNotes: "A fines del período apareció el cobre nativo. Martillándolo sin fundir crearon agujas finas, punzones para cuero y cuentas de adorno con brillo metálico.",
        palabrasAprox: 23,
        duracionSeg: 13
      },
      {
        slideNumber: 6,
        tituloMomento: "Atención al Error Común",
        didacticPurpose: "Atención al Error Común",
        visualPrompt: "Modern anime style. The girl contrasting an image of crude stone chipping with a smooth polished stone axe, pointing out that 'Neolítico' significa piedra pulida. Clear visual. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Error: No Solo Piedras",
        overlaySubtitle: "La tecnología abarcó barro fuego y tejidos",
        overlayText: "Error: No Solo Piedras: La tecnología abarcó barro fuego y tejidos",
        vectorialOverlayPptx: "Rigor conceptual: El Neolítico no se reduce a la piedra; combinó cerámica, textiles, agricultura y metales",
        speakerNotes: "Un error habitual es creer que la tecnología neolítica fue solo pulir piedras. En verdad fue un sistema integrado de alfarería, hornos, textilería y herramientas.",
        palabrasAprox: 24,
        duracionSeg: 13
      },
      {
        slideNumber: 7,
        tituloMomento: "Síntesis y Regla de Oro",
        didacticPurpose: "Síntesis y Regla de Oro",
        visualPrompt: "Modern anime style. The two 13-year-olds smiling proudly with their open notebooks before an infographic linking: Piedra pulida -> Cerámica -> Telar -> Cobre. Clean negative space. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Regla de Oro Tecnológica",
        overlaySubtitle: "Herramientas que transformaron la subsistencia",
        overlayText: "Regla de Oro: Herramientas que transformaron la subsistencia",
        vectorialOverlayPptx: "Síntesis conceptual: La innovación tecnológica amplió la productividad y el bienestar material de las comunidades",
        speakerNotes: "Cada innovación tecnológica resolvió una necesidad vital de la aldea: limpiar campos, cocinar alimentos, abrigar a las familias y asegurar reservas para el futuro.",
        palabrasAprox: 22,
        duracionSeg: 13
      }
    ]
  },

  postQuestions: [
    {
      context: 'El Rol de la Cerámica en la Dieta y Conservación',
      question: 'En el video analizamos que la cerámica cocida cumplió dos funciones vitales: cocinar y almacenar. ¿Por qué ambas funciones fueron decisivas para que una aldea sobreviviera todo el año?',
      expected: 'Porque cocinar en ollas permitió hacer comestibles cereales y legumbres duros mediante caldos nutritivos, y almacenar en tinajas protegió el grano de la lluvia y roedores para el invierno.',
      success: '¡Excelente análisis integral! Uniste la nutrición familiar con la seguridad alimentaria en una sola explicación fundamentada.',
      support: 'Fíjate en los dos momentos: cuando comes todos los días necesitas cocinar el grano, y cuando termina la cosecha necesitas guardarlo sin que se pudra.',
      reveal: 'La cerámica aseguró la digestibilidad diaria mediante la cocción de alimentos y garantizó reservas estables protegidas de plagas y humedad.',
      studentReveal: 'Porque permitió hervir alimentos duros para comer mejor y guardar granos secos protegidos de ratones y humedad.'
    },
    {
      context: 'La Piedra Pulimentada y la Agricultura',
      question: '¿Por qué la agricultura extensiva en valles boscosos no habría sido posible sin la previa invención del hacha de piedra pulimentada?',
      expected: 'Porque se requerían hachas sólidas y resistentes a impactos fuertes para talar árboles densos, desmalezar terrenos y despejar claros para sembrar campos agrícolas.',
      success: '¡Muy bien! Reconociste que modificar el espacio geográfico requirió herramientas líticas capaces de talar bosques sin fracturarse.',
      support: 'Piensa en el terreno natural: antes de sembrar, los valles estaban llenos de árboles y raíces duras que había que cortar.',
      reveal: 'Las hachas pulimentadas permitieron talar bosques y despejar parcelas de cultivo, transformando el paisaje natural en espacio agrícola.',
      studentReveal: 'Porque se necesitaban hachas firmes que no se rompieran para cortar árboles y abrir espacio limpio para sembrar.'
    }
  ],

  practice: [
    {
      context: 'Actividad en Cuaderno: Cuadro de Innovaciones Tecnológicas',
      question: 'Abre tu cuaderno de notas de Historia. Escribe como título: "Innovaciones Tecnológicas del Neolítico". Construye una tabla de tres columnas: 1. "Tecnología" (Piedra Pulida, Cerámica Cocida, Telar, Cobre Martillado), 2. "Materiales y Técnica", y 3. "Impacto en la Vida de la Aldea". Completa cada fila con los datos analizados hoy.',
      expected: 'Tabla comparativa completa en el cuaderno con las cuatro tecnologías, sus materiales y su impacto en la vida comunitaria.',
      success: '¡Excelente tabla en tu cuaderno! Has clasificado los inventos neolíticos con precisión conceptual y orden impecable.',
      support: 'Revisa las diapositivas de la lección: asocia piedra pulida con talar y moler, cerámica con cocinar y guardar, telar con vestimenta y cobre con punzones.',
      reveal: 'La tabla sintetiza cómo el desarrollo técnico diversificó las capacidades productivas de la sociedad neolítica.',
      studentReveal: 'Tabla completa en el cuaderno con las cuatro innovaciones tecnológicas, sus materiales y su impacto comunitario.'
    },
    {
      context: 'Análisis de Continuidad Histórica: La Huella en el Presente',
      question: 'En tu cuaderno, responde brevemente: ¿Qué herramientas o utensilios de los inventados en el Neolítico (ollas de cocina, telas de ropa, hachas de corte, harina molida) seguimos utilizando hoy y cómo han cambiado sus materiales?',
      expected: 'Texto argumentativo que identifique continuidades funcionales (ollas, ropa tejida, harina) reconociendo los cambios de materiales (metal, plástico, fibras sintéticas).',
      success: '¡Brillante reflexión de cambio y continuidad histórica! Conectaste el pasado neolítico con los objetos de tu vida cotidiana.',
      support: 'Mira a tu alrededor: tu ropa, las ollas de tu cocina o el pan del desayuno provienen de inventos neolíticos modernizados.',
      reveal: 'Identificar continuidades históricas permite comprender que las bases de nuestra cultura material nacieron en las aldeas neolíticas.',
      studentReveal: 'Texto en el cuaderno explicando que seguimos usando ollas, telares y harina, pero hoy son de metal, plástico o máquinas modernas.'
    }
  ],

  summaryIdeas: [
    ['Piedra Pulida', 'El pulido con arena abrasiva creó hachas resistentes para talar bosques y molinos de mano para elaborar harina.'],
    ['Alfarería y Hornos', 'La cerámica impermeable permitió hervir caldos nutritivos y almacenar granos secos protegidos de humedad y roedores.'],
    ['Telares y Cobre', 'El hilado de lana y lino reemplazó a las pieles pesadas, mientras el cobre martillado anticipó la metalurgia.']
  ],

  mini: [
    {
      id: 'q_1',
      q: '¿Cuál fue la ventaja técnica decisiva que ofreció la piedra pulida frente a las herramientas de piedra toscamente talladas del Paleolítico?',
      options: [
        'A) La piedra pulida flotaba sola sobre los ríos para transportar personas sin botes.',
        'B) Al frotar la piedra con arena y agua se eliminaban fisuras internas, logrando filos lisos que resistían golpes fuertes sin quebrarse.',
        'C) Permitía disparar rayos de fuego al frotarla con ramas secas.',
        'D) Se volvía invisible cuando entraban enemigos a la aldea.'
      ],
      correct: 'B) Al frotar la piedra con arena y agua se eliminaban fisuras internas, logrando filos lisos que resistían golpes fuertes sin quebrarse.',
      fixExplain: 'El pulido compactaba la superficie de la herramienta lítica, otorgándole gran resistencia mecánica para talar maderas duras.',
      concept: 'Ventajas de la Piedra Pulimentada'
    },
    {
      id: 'q_2',
      q: '¿Por qué la invención de vasijas de cerámica cocida en hornos transformó radicalmente la nutrición de las comunidades aldeanas?',
      options: [
        'A) Porque la arcilla producía azúcar de forma mágica en el interior de los platos.',
        'B) Porque las vasijas reemplazaron a las semillas de trigo como alimento principal.',
        'C) Porque permitió cocinar caldos, sopas y papillas nutritivas al fuego, ablandando granos duros y facilitando la digestión de niños y ancianos.',
        'D) Porque las ollas de barro enfriaban la comida a temperaturas bajo cero en verano.'
      ],
      correct: 'C) Porque permitió cocinar caldos, sopas y papillas nutritivas al fuego, ablandando granos duros y facilitando la digestión de niños y ancianos.',
      fixExplain: 'Cocer legumbres y cereales en ollas sobre el fuego permitió una asimilación calórica y proteica mucho más eficiente.',
      concept: 'Impacto Nutricional de la Cerámica'
    },
    {
      id: 'q_3',
      q: '¿Qué avance representó la invención del telar para la vestimenta humana en comparación con el uso exclusivo de pieles de animales cazados?',
      options: [
        'A) Permitió confeccionar prendas ligeras, flexibles y lavables a partir de fibras vegetales de lino y lana esquilada de ovejas.',
        'B) Obligó a todos los habitantes a vestir pesadas armaduras de hierro durante todo el año.',
        'C) Hizo que la ropa durara exactamente un solo día antes de desarmarse.',
        'D) Impidió que las personas salieran de sus casas debido al peso del telar.'
      ],
      correct: 'A) Permitió confeccionar prendas ligeras, flexibles y lavables a partir de fibras vegetales de lino y lana esquilada de ovejas.',
      fixExplain: 'El tejido textil mejoró la higiene, el confort térmico y la ligereza de la vestimenta neolítica.',
      concept: 'La Textilería Neolítica'
    }
  ],

  recovery: [
    {
      title: 'Recuperación Histórica: Las Tecnologías Neolíticas',
      explain: 'Las herramientas del Neolítico respondieron a las nuevas necesidades del modo de vida sedentario. Para abrir campos talaron árboles con hachas pulidas; para comer mejor cocinaron en ollas de barro; para guardar grano usaron vasijas selladas; y para vestirse hilaron lana y lino.',
      q: '¿Cuál de las siguientes relaciones entre herramienta neolítica y su función histórica es correcta?',
      options: [
        'A) Hacha de piedra pulida: navegar océanos profundos en busca de metales.',
        'B) Telar vertical: guardar agua de lluvia durante las sequías.',
        'C) Vasija de cerámica cocida: disparar flechas en batallas contra animales.',
        'D) Molino de mano de piedra: triturar granos duros de trigo para convertirlos en harina digestible.'
      ],
      correct: 'D) Molino de mano de piedra: triturar granos duros de trigo para convertirlos en harina digestible.',
      correctText: '¡Correcto! El molino barquiforme de mano fue esencial para moler los cereales cosechados y elaborar pan.',
      fixText: 'Recuerda que el molino de mano permitía moler granos de trigo duros para producir harina y alimentar a la comunidad.'
    }
  ]
};
