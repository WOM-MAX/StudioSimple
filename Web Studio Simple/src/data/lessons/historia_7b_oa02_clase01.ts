import { LessonData } from '../../types/lesson';

export const HISTORIA_7B_OA02_CLASE01: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Historia, Geografía y Ciencias Sociales',
    oaCode: 'OA 2',
    oaTitle: 'Procesos de transformación de la vida humana en el Neolítico',
    lessonNumber: 1,
    totalLessonsInOa: 6,
    lessonTitle: 'La transición al Neolítico y orígenes agrícolas',
    durationMinutes: 30,
    nextLessonTitle: 'Domesticación de plantas y animales en el Creciente Fértil'
  },

  prep: {
    adultObjective: 'Acompañar al estudiante a comprender la transición del Paleolítico al Neolítico como un proceso gradual, multicausal y en mosaico, reconociendo diversos centros independientes de domesticación en el mundo y superando la idea de un cambio súbito o lineal.',
    routeToday: 'De la caza y recolección a los múltiples centros de producción agrícola en el mundo.',
    mentorReminder: 'Sigue las indicaciones en pantalla paso a paso. Lee únicamente los recuadros con la etiqueta DILE o PREGÚNTALE en voz alta.',
    reminders: [
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'No leas los recuadros de AYUDA PEDAGÓGICA ni CLIMA EMOCIONAL; son guías exclusivas para ti.',
      'Pídele que observe el mapa interactivo de orígenes agrícolas en la pantalla.',
      'Asegura que comprenda que la agricultura no surgió de un día para otro ni en un solo lugar.',
      'Ten a mano su cuaderno de Historia y Ciencias Sociales para los diagramas y notas.'
    ],
    emotionalTip: 'Crea un clima de exploración histórica: "En historia no memorizamos fechas sueltas: comprendemos cómo las personas resolvieron sus necesidades básicas para construir nuestra civilización".'
  },

  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Historia y Geografía', subtitle: 'Transición y cambio en mosaico', color: 'yellow' },
      { id: 'b2', number: '02', title: 'Exploración', subtitle: 'Línea de tiempo y mapa mundial', color: 'orange' },
      { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Comparación y cuadro en cuaderno', color: 'teal' },
      { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz formativo y síntesis', color: 'navy' }
    ],
    keyQuestions: [
      { label: '¿Cómo comenzó la agricultura?', sub: 'Un proceso gradual de observación y adaptación ambiental.' },
      { label: '¿Dónde ocurrió este cambio?', sub: 'En múltiples regiones independientes del planeta.' }
    ],
    dileIntro: 'Hoy comenzaremos la primera clase de Historia, Geografía y Ciencias Sociales para 7° Básico: "La transición al Neolítico y orígenes agrícolas".',
    dileObjective: 'Comprender que la agricultura y la domesticación fueron procesos graduales y regionalmente diversos.'
  },

  situation: {
    dilePrompt: 'Observa la línea de tiempo en pantalla. Al terminar la última glaciación, hace unos 10.000 a 12.000 años (aprox. 10.000 a 8.000 a.C.), el clima terrestre se volvió más cálido y templado. ¿Crees que las bandas humanas dejaron de cazar de un día para otro al descubrir la primera planta cultivada, o fue una transición lenta donde coexistieron varios modos de vida?',
    expectedAnswer: 'El estudiante debe señalar que fue una transición gradual y diversa: continuaron cazando y recolectando mientras aprendían lentamente a cuidar y sembrar plantas en distintos lugares.',
    socraticHint: 'Piensa en lo que ocurre cuando alguien aprende algo nuevo: ¿abandona de golpe todo lo que hacía antes para sobrevivir o combina ambas estrategias durante mucho tiempo?',
    emotionalTip: 'Valora la prudencia de nuestros antepasados: experimentar con semillas requería asegurar el alimento diario con la caza mientras se comprobaba si el cultivo funcionaba.',
    options: [
      {
        label: 'Explicó que fue una transición gradual donde coexistieron la caza y la siembra incipiente',
        kind: 'correct',
        feedbackText: '¡Exacto! El Neolítico no fue un salto repentino, sino una transformación paulatina que tomó milenios.'
      },
      {
        label: 'Afirmó que todos se volvieron agricultores de inmediato y abandonaron la caza',
        kind: 'needs_support',
        feedbackText: 'Recuerda que si una cosecha fallaba, podían morir de hambre. Por eso combinaron la caza tradicional con el cultivo durante mucho tiempo.'
      },
      {
        label: 'No sabe qué responder o dio otra respuesta',
        kind: 'no_answer',
        feedbackText: 'Pista guiada: Fíjate en la línea de tiempo: pasaron miles de años entre las primeras semillas recolectadas y los campos de cultivo permanentes.'
      }
    ]
  },

  reference: {
    dilePrompt: 'En el Levante mediterráneo, la cultura natufiense construyó campamentos de piedra semipermanentes porque los cereales silvestres eran muy abundantes, ¡incluso antes de sembrar sus propios huertos!',
    question: '¿Qué demuestra este caso arqueológico sobre la relación entre el sedentarismo y la agricultura?',
    expectedAnswer: 'Demuestra que el sedentarismo pudo comenzar antes de la agricultura si el entorno natural ofrecía suficiente alimento silvestre para asentarse.',
    socraticHint: 'Si un valle tiene toneladas de trigo silvestre que crece solo cada año, ¿necesitas sembrarlo para quedarte a vivir allí?',
    feedbackSuccess: '¡Brillante razonamiento histórico! Demuestra que el sedentarismo y la agricultura no ocurrieron en una sola línea fija para todas las comunidades.',
    feedbackSupport: 'Los natufienses demuestran que algunos grupos se establecieron primero donde había alimento abundante y luego aprendieron a cultivar.'
  },

  hook: {
    title: 'El Desafío de la Transición al Neolítico',
    dileIntro: 'Acompáñame a ver este video introductorio. Descubriremos cómo el final de la era glacial abrió nuevas oportunidades para la subsistencia humana en diferentes rincones del planeta.',
    hazInstruction: 'Observa con atención cómo el cambio ambiental impulsó nuevas respuestas humanas en el mapa.',
    videoSrc: '',
    focusPoints: [
      'Calentamiento del Holoceno: Retirada de glaciares hace unos 10.000 a 12.000 años.',
      'Diversidad de recursos: Bosques templados y praderas con cereales silvestres.',
      'Campamentos semipermanentes: Recolección intensiva previa al cultivo sistemático.',
      'Múltiples focos mundiales: Medio Oriente, Asia y América desarrollaron la agricultura por separado.'
    ],
    dileAfterVideo: 'Conversemos sobre lo observado en el video. Te haré dos preguntas sobre cómo vivieron las comunidades este período de transición.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Apertura y Escenario",
        didacticPurpose: "Apertura y Escenario",
        visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing on a verdant hill overlooking a melting glacial valley with blooming grasslands. Warm morning sunlight, wide negative space in top third. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "El Gran Cambio Climático",
        overlaySubtitle: "Retirada de glaciares y nuevos paisajes",
        overlayText: "El Gran Cambio Climático: Retirada de glaciares y nuevos paisajes",
        vectorialOverlayPptx: "Transición climática: Fin del Pleistoceno -> Inicio del Holoceno cálido",
        speakerNotes: "Al finalizar la última era glacial, hace unos doce mil años, las temperaturas aumentaron y vastos valles se cubrieron de vegetación silvestre.",
        palabrasAprox: 23,
        duracionSeg: 9
      },
      {
        slideNumber: 2,
        tituloMomento: "Observación de la Naturaleza",
        didacticPurpose: "Observación de la Naturaleza",
        visualPrompt: "Modern anime style. The two 13-year-old explorers observing hunter-gatherers collecting wild cereal grains by a riverbend with sickles made of bone and flint. Soft natural lighting, clear negative space. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Recolección Intensiva",
        overlaySubtitle: "Aprovechamiento de granos y frutos silvestres",
        overlayText: "Recolección Intensiva: Aprovechamiento de granos y frutos silvestres",
        vectorialOverlayPptx: "Modo de subsistencia: Recolección selectiva de cereales silvestres",
        speakerNotes: "Las comunidades observaron atentamente cómo brotaban las semillas caídas y comenzaron a recolectar trigo y cebada silvestre con hoces de sílex.",
        palabrasAprox: 22,
        duracionSeg: 9
      },
      {
        slideNumber: 3,
        tituloMomento: "El Enigma Natufiense",
        didacticPurpose: "El Enigma Natufiense",
        visualPrompt: "Modern anime style. The boy pointing at circular stone house foundations while the girl sketches a grinding mortar in her physical field notebook. Atmospheric morning mist, wide negative space. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Campamentos Semipermanentes",
        overlaySubtitle: "Viviendas circulares previas a la siembra",
        overlayText: "Campamentos Semipermanentes: Viviendas circulares previas a la siembra",
        vectorialOverlayPptx: "Evidencia arqueológica: Asentamientos natufienses sedentarios con economía recolectora",
        speakerNotes: "En el Cercano Oriente, algunos grupos levantaron cabañas de piedra permanentes mucho antes de sembrar, aprovechando la abundancia natural del entorno.",
        palabrasAprox: 21,
        duracionSeg: 9
      },
      {
        slideNumber: 4,
        tituloMomento: "Diferentes Rutas y Tiempos",
        didacticPurpose: "Diferentes Rutas y Tiempos",
        visualPrompt: "Modern anime style. A panoramic archaeological landscape showing three distinct habitats: river valley, dry steppe with goats, and forested hills. Both explorers analyzing the terrain. Clean composition. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Adaptaciones Regionales",
        overlaySubtitle: "Diversas respuestas a cada entorno natural",
        overlayText: "Adaptaciones Regionales: Diversas respuestas a cada entorno natural",
        vectorialOverlayPptx: "Proceso en mosaico: Cada ecosistema requirió soluciones técnicas singulares",
        speakerNotes: "No todas las regiones avanzaron al mismo ritmo: en zonas secas se priorizó el pastoreo de cabras, mientras que en los valles floreció el cultivo.",
        palabrasAprox: 25,
        duracionSeg: 9
      },
      {
        slideNumber: 5,
        tituloMomento: "Centros Independientes",
        didacticPurpose: "Centros Independientes",
        visualPrompt: "Modern anime style. The two explorers examining an ancient global projection showing early botanical domestications across continents. Clean lighting, negative space. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Focos de Invención Agrícola",
        overlaySubtitle: "Orígenes independientes en distintos continentes",
        overlayText: "Focos de Invención Agrícola: Orígenes independientes en distintos continentes",
        vectorialOverlayPptx: "Cartografía histórica: Media Luna Fértil, China fluvial, Mesoamérica y Andes Centrales",
        speakerNotes: "La agricultura no nació en un único rincón: pueblos de Asia, América y Medio Oriente domesticaron especies por su cuenta sin comunicarse entre sí.",
        palabrasAprox: 24,
        duracionSeg: 9
      },
      {
        slideNumber: 6,
        tituloMomento: "El Dilema del Tiempo",
        didacticPurpose: "El Dilema del Tiempo",
        visualPrompt: "Modern anime style. Wide shot of the boy and girl standing on a cliffside looking toward a vast historical horizon with volumetric clouds. Thoughtful expression, generous negative space. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "La Larga Duración",
        overlaySubtitle: "Milenios de experimentación paciente y continua",
        overlayText: "La Larga Duración: Milenios de experimentación paciente y continua",
        vectorialOverlayPptx: "Tiempo histórico: Proceso acumulativo de aprendizaje de larga duración",
        speakerNotes: "Llegamos a la gran pregunta: si este cambio tomó miles de años y ocurrió en lugares tan distintos, ¿cómo transformó la vida de la humanidad?",
        palabrasAprox: 25,
        duracionSeg: 9
      },
      {
        slideNumber: 7,
        tituloMomento: "Pregunta Detonante",
        didacticPurpose: "Pregunta Detonante",
        visualPrompt: "Modern anime style. Inspiring graphic setting with the two 13-year-olds holding an ear of wild grain and an obsidian tool, smiling toward the viewer. Soft ambient lighting, clean background. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Misión de Aprendizaje",
        overlaySubtitle: "Descubrir la gran revolución de subsistencia",
        overlayText: "Misión de Aprendizaje: Descubrir la gran revolución de subsistencia",
        vectorialOverlayPptx: "Pregunta rectora: ¿Por qué la producción de alimentos transformó a la sociedad?",
        speakerNotes: "¡Acompáñanos a descubrir en la clase cómo el ser humano aprendió a producir su propio alimento y a transformar el espacio geográfico!",
        palabrasAprox: 22,
        duracionSeg: 6
      }
    ]
  },

  preQuestions: [
    {
      context: 'El Caso de los Recolectores Natufienses',
      question: 'Vimos que los natufienses vivían en campamentos de piedra semipermanentes pero todavía no sembraban campos de cultivo. ¿Por qué pudieron quedarse en un lugar fijo?',
      expected: 'Porque el entorno natural contaba con abundantes cereales silvestres, caza y agua, lo que les permitía alimentarse sin tener que trasladarse constantemente.',
      success: '¡Excelente razonamiento! Supiste ver que la abundancia de recursos naturales permitió el sedentarismo antes de inventar la agricultura extensiva.',
      support: 'Fíjate en las herramientas y el entorno: recolectaban tanto grano silvestre que tenían comida suficiente para todo el año en su valle.',
      reveal: 'El sedentarismo pudo preceder a la agricultura cuando los recursos naturales del entorno eran suficientemente ricos y estables.',
      studentReveal: 'Pudieron quedarse porque el valle tenía abundantes cereales silvestres y agua durante todo el año.'
    },
    {
      context: 'Centros Independientes en el Mundo',
      question: 'El video mostró que la agricultura surgió en América, Asia y Medio Oriente sin que estos pueblos tuvieran contacto. ¿Qué demuestra esto sobre la creatividad humana?',
      expected: 'Demuestra que distintas sociedades humanas respondieron de manera creativa a desafíos ambientales similares, domesticando las especies disponibles en su territorio.',
      success: '¡Muy bien fundamentado! Las sociedades humanas descubrieron soluciones productivas independientes según su propia geografía.',
      support: 'Piensa en las distancias: no había barcos ni caminos entre América y Asia. Cada pueblo inventó sus cultivos con las plantas de su región.',
      reveal: 'La invención de la agricultura fue una respuesta creativa y simultánea de múltiples grupos humanos frente al nuevo clima del planeta.',
      studentReveal: 'Demuestra que diferentes pueblos encontraron respuestas similares inventando cultivos con las plantas de su propia región.'
    }
  ],

  formalization: {
    title: 'La Transición al Neolítico: Un Proceso en Mosaico',
    concept: 'La Transición al Neolítico y Orígenes Agrícolas',
    dileIntro: 'Ahora veremos el video explicativo. Comprenderemos la noción de proceso de larga duración y cómo la agricultura se desarrolló de manera diversa en el mundo.',
    hazInstruction: 'Revisemos con atención la explicación formal y preparemos el cuaderno para registrar las ideas centrales.',
    ideaClave: 'La Revolución Neolítica no fue un cambio súbito ni lineal, sino un proceso gradual y en mosaico de miles de años, con focos independientes de domesticación en distintos continentes.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Objetivo de la Lección",
        didacticPurpose: "Objetivo de la Lección",
        visualPrompt: "Modern anime style 16:9. The boy and girl in a luminous study room, examining a world map showing distinct agricultural hearths in the Fertile Crescent, China, Mesoamerica, and the Andes. Generous negative space on top. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Objetivo de la Clase",
        overlaySubtitle: "Comprender la transición gradual al Neolítico",
        overlayText: "Objetivo: Comprender la transición gradual al Neolítico",
        vectorialOverlayPptx: "Rótulo formal: OA 2 · La Revolución Neolítica como proceso de larga duración",
        speakerNotes: "El objetivo de hoy es comprender que la transición al Neolítico fue un proceso gradual y regionalmente diverso, desarrollado en múltiples focos del planeta.",
        palabrasAprox: 25,
        duracionSeg: 12
      },
      {
        slideNumber: 2,
        tituloMomento: "Concepto de Larga Duración",
        didacticPurpose: "Concepto de Larga Duración",
        visualPrompt: "Modern anime style. The girl explaining a timeline banner showing thousands of years connecting the late Paleolithic with the Neolithic. Clear infographic elements, warm ambient lighting. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Tiempo Histórico Acumulativo",
        overlaySubtitle: "Transformaciones lentas a lo largo de milenios",
        overlayText: "Tiempo Histórico Acumulativo: Transformaciones lentas a lo largo de milenios",
        vectorialOverlayPptx: "Concepto historiográfico: Larga duración (Fernand Braudel) aplicada a la prehistoria",
        speakerNotes: "En historia usamos el concepto de larga duración: los cambios en la subsistencia no ocurrieron en una generación, sino a lo largo de miles de años de observación.",
        palabrasAprox: 28,
        duracionSeg: 13
      },
      {
        slideNumber: 3,
        tituloMomento: "Focos Independientes Mundiales",
        didacticPurpose: "Focos Independientes Mundiales",
        visualPrompt: "Modern anime style. Detailed cartographic projection highlighting Fertile Crescent with wheat, Yangtze River with rice, Mesoamerica with maize, and Andes with potato. The two explorers pointing at the regions. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Cuatro Focos Clave",
        overlaySubtitle: "Trigo arroz maíz y papa domesticados",
        overlayText: "Cuatro Focos Clave: Trigo arroz maíz y papa domesticados",
        vectorialOverlayPptx: "Mapa de domesticación: Medio Oriente (10.000 a.C.), China (8.000 a.C.), Mesoamérica (5.000 a.C.), Andes (4.000 a.C.)",
        speakerNotes: "Hacia el diez mil a.C. se domesticó trigo en Medio Oriente; hacia el ocho mil a.C. arroz en China; y más tarde maíz en Mesoamérica y papa en los Andes.",
        palabrasAprox: 30,
        duracionSeg: 13
      },
      {
        slideNumber: 4,
        tituloMomento: "Coexistencia de Modos de Vida",
        didacticPurpose: "Coexistencia de Modos de Vida",
        visualPrompt: "Modern anime style. A split-scene landscape: on one side hunters tracking game in a forest, in the center pastoralists herding goats, on the riverbank farmers tending crops. Soft depth of field. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Modos de Vida Diversos",
        overlaySubtitle: "Caza pastoreo y cultivo coexistiendo juntos",
        overlayText: "Modos de Vida Diversos: Caza pastoreo y cultivo coexistiendo juntos",
        vectorialOverlayPptx: "Esquema multilineal: Coexistencia prolongada de economías depredadoras y productoras",
        speakerNotes: "Durante siglos las comunidades combinaron la caza con la siembra incipiente. Muchos pueblos mantuvieron el pastoreo móvil y nunca adoptaron la vida aldeana fija.",
        palabrasAprox: 24,
        duracionSeg: 13
      },
      {
        slideNumber: 5,
        tituloMomento: "Atención al Error Común",
        didacticPurpose: "Atención al Error Común",
        visualPrompt: "Modern anime style. The boy pointing to a crossed-out linear arrow, contrasting it with an intricate branching tree of human development. Visual clarity, soft teal glow. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Error: La Línea Única",
        overlaySubtitle: "El cambio no fue automático ni idéntico",
        overlayText: "Error: La Línea Única: El cambio no fue automático ni idéntico",
        vectorialOverlayPptx: "Advertencia epistemológica: Superar el evolucionismo unilineal y el determinismo geográfico",
        speakerNotes: "Un error habitual es pensar que toda la humanidad siguió los mismos pasos obligados. Cada cultura se adaptó a su territorio creando soluciones propias y originales.",
        palabrasAprox: 26,
        duracionSeg: 13
      },
      {
        slideNumber: 6,
        tituloMomento: "Estrategia de Análisis",
        didacticPurpose: "Estrategia de Análisis",
        visualPrompt: "Modern anime style. Three connected icons showing: 1. Clima y geografía, 2. Observación de especies, 3. Prácticas comunitarias. The two protagonists studying the icons together. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Claves de Interpretación",
        overlaySubtitle: "Medio natural especies y decisiones sociales",
        overlayText: "Claves de Interpretación: Medio natural especies y decisiones sociales",
        vectorialOverlayPptx: "Guía metodológica: 1. Espacio geográfico · 2. Base ecológica · 3. Organización comunitaria",
        speakerNotes: "Para comprender el origen de la agricultura analiza siempre tres factores: el clima del territorio, las especies disponibles y las necesidades de la comunidad.",
        palabrasAprox: 24,
        duracionSeg: 13
      },
      {
        slideNumber: 7,
        tituloMomento: "Síntesis y Conclusión",
        didacticPurpose: "Síntesis y Conclusión",
        visualPrompt: "Modern anime style. Beautiful sunrise over an early farming settlement by a calm lake, with both 13-year-old student explorers smiling with their field notebooks ready. Clear negative space. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Regla de Oro Histórica",
        overlaySubtitle: "El Neolítico transformó la subsistencia humana",
        overlayText: "Regla de Oro: El Neolítico transformó la subsistencia humana",
        vectorialOverlayPptx: "Síntesis conceptual: La economía productora transformó la relación del ser humano con la naturaleza",
        speakerNotes: "El Neolítico inauguró la economía productora. El ser humano dejó de depender solo de lo que encontraba y comenzó a transformar activamente su entorno.",
        palabrasAprox: 25,
        duracionSeg: 13
      }
    ]
  },

  postQuestions: [
    {
      context: 'Múltiples Focos de Domesticación en el Mundo',
      question: 'En el video revisamos que el trigo se domesticó en Medio Oriente, el arroz en China y el maíz en América. ¿Por qué estas plantas fueron distintas en cada continente?',
      expected: 'Porque cada región contaba con su propia flora silvestre originaria; los seres humanos experimentaron con las plantas que crecían naturalmente en su espacio geográfico.',
      success: '¡Excelente precisión histórica! La geografía y la biodiversidad local determinaron qué especies vegetales fueron domesticadas en cada continente.',
      support: 'Recuerda que en esa época no existían intercambios entre continentes. Si en América no había trigo silvestre pero sí maíz, ¿cuál podían cultivar?',
      reveal: 'Cada foco agrícola domesticó las especies silvestres propias de su territorio: trigo en el Creciente Fértil, arroz en Asia y maíz en Mesoamérica.',
      studentReveal: 'Porque cada continente tenía sus propias plantas silvestres y la gente domesticó las que crecían en su entorno.'
    },
    {
      context: 'La Noción de Proceso en Mosaico',
      question: '¿Por qué los historiadores afirman que la Revolución Neolítica fue un cambio "en mosaico" y no una línea recta donde todos los pueblos hicieron lo mismo?',
      expected: 'Porque diferentes comunidades adoptaron la agricultura, el pastoreo o mantuvieron la caza según sus necesidades y recursos, a ritmos y en momentos distintos.',
      success: '¡Gran comprensión del tiempo histórico! Comprendiste que no hubo un camino único para toda la humanidad.',
      support: 'Piensa en las distintas regiones: en las praderas algunos prefirieron cuidar rebaños sin hacer casas fijas, mientras otros sembraron en valles.',
      reveal: 'El cambio en mosaico significa que coexistieron múltiples ritmos y estilos de vida según el ecosistema y las decisiones de cada comunidad.',
      studentReveal: 'Porque los pueblos avanzaron a ritmos diferentes: unos cultivaron valles, otros se dedicaron al pastoreo y otros continuaron cazando.'
    }
  ],

  practice: [
    {
      context: 'Actividad en Cuaderno: Cuadro Comparativo de Subsistencia',
      question: 'Abre tu cuaderno de Historia y escribe el título: "La Transición al Neolítico: Un Proceso en Mosaico". Dibuja un cuadro de dos columnas: en la primera columna escribe "Focos Independientes y Especies" (menciona Creciente Fértil, China y América); en la segunda explica por qué la caza y la siembra coexistieron durante miles de años.',
      expected: 'Cuadro comparativo completo en el cuaderno con los tres focos mundiales y la fundamentación de la coexistencia de modos de vida.',
      success: '¡Excelente trabajo en tu cuaderno! Has ordenado los datos históricos con claridad y rigor conceptual.',
      support: 'Revisa tus apuntes de la clase: asocia Medio Oriente con trigo, China con arroz y América con maíz, y explica la seguridad de no depender de una sola fuente.',
      reveal: 'El cuadro permite registrar la diversidad geográfica de los orígenes agrícolas y superar visiones lineales simplistas.',
      studentReveal: 'Cuadro completo en el cuaderno con focos agrícolas independientes y análisis de la coexistencia de modos de vida.'
    },
    {
      context: 'Reflexión Histórica: Fechas y Larga Duración',
      question: 'En tu cuaderno, redacta una breve respuesta argumentada: ¿Por qué es un error afirmar que el Neolítico comenzó exactamente en un solo año o que ocurrió de un día para otro?',
      expected: 'Texto argumentativo que explique la noción de larga duración y la experimentación acumulativa a lo largo de milenios.',
      success: '¡Brillante argumentación histórica! Demostraste comprensión del tiempo histórico y sus ritmos de cambio.',
      support: 'Piensa en cuántas generaciones se necesitaron para aprender cuándo sembrar y cómo cuidar las semillas.',
      reveal: 'Los cambios estructurales en la subsistencia humana corresponden a procesos acumulativos de larga duración.',
      studentReveal: 'Texto argumentativo en el cuaderno que explica la larga duración y la gradualidad de la experimentación agrícola.'
    }
  ],

  summaryIdeas: [
    ['Larga Duración y Gradualidad', 'La agricultura no surgió de un día para otro: fue un proceso de miles de años de observación empírica y selección vegetal.'],
    ['Centros Independientes en el Mundo', 'Distintas sociedades domesticaron especies por separado: trigo en Medio Oriente, arroz en China, y maíz y papa en América.'],
    ['Proceso en Mosaico', 'El sedentarismo y la producción de alimentos se combinaron con la caza y el pastoreo móvil según las posibilidades de cada entorno natural.']
  ],

  mini: [
    {
      id: 'q_1',
      q: '¿Por qué los arqueólogos e historiadores consideran que la Revolución Neolítica fue un proceso "en mosaico" y no una transformación homogénea inmediata?',
      options: [
        'A) Porque la agricultura fue impuesta rápidamente por un solo ejército imperial en todo el planeta.',
        'B) Porque diferentes sociedades experimentaron cambios a ritmos distintos, combinando caza, pastoreo y cultivo según su entorno.',
        'C) Porque todos los seres humanos aprendieron a cultivar el mismo cereal durante el mismo siglo.',
        'D) Porque las plantas cultivadas se expandieron por el viento de un continente a otro sin intervención humana.'
      ],
      correct: 'B) Porque diferentes sociedades experimentaron cambios a ritmos distintos, combinando caza, pastoreo y cultivo según su entorno.',
      fixExplain: 'El concepto de mosaico destaca la diversidad de ritmos, ecosistemas y combinaciones de subsistencia en cada territorio.',
      concept: 'Proceso en Mosaico Neolítico'
    },
    {
      id: 'q_2',
      q: '¿Qué evidencia arqueológica demuestra que el sedentarismo pudo preceder al desarrollo de la agricultura sistemática?',
      options: [
        'A) Los campamentos natufienses semipermanentes que recolectaban cereales silvestres antes de cultivar campos agrícolas.',
        'B) Las grandes pirámides egipcias construidas por bandas de cazadores del Paleolítico inferior.',
        'C) La invención de fábricas de telares industriales en campamentos nómades de las estepas.',
        'D) El uso de monedas de oro acuñadas para pagar a recolectores de frutas durante el invierno.'
      ],
      correct: 'A) Los campamentos natufienses semipermanentes que recolectaban cereales silvestres antes de cultivar campos agrícolas.',
      fixExplain: 'La cultura natufiense demostró que la abundancia de recursos naturales silvestres permitió fundar asentamientos estables antes del cultivo formal.',
      concept: 'Sedentarismo Preagrícola Natufiense'
    },
    {
      id: 'q_3',
      q: 'Al analizar los orígenes de la agricultura en el mundo hacia el 8.000 a.C. y milenios posteriores, ¿qué afirmación es históricamente rigurosa?',
      options: [
        'A) La agricultura surgió únicamente en el norte de Europa y desde allí se difundió al resto del mundo.',
        'B) Las comunidades de América dependían de las semillas de trigo importadas en barcos desde Mesopotamia.',
        'C) Existieron múltiples focos independientes de domesticación en regiones como la Media Luna Fértil, valles fluviales de China, Mesoamérica y los Andes.',
        'D) El ser humano abandonó de forma instantánea el consumo de carne animal al brotar la primera cosecha.'
      ],
      correct: 'C) Existieron múltiples focos independientes de domesticación en regiones como la Media Luna Fértil, valles fluviales de China, Mesoamérica y los Andes.',
      fixExplain: 'La investigación arqueológica confirma focos autónomos de domesticación adaptados a la biodiversidad propia de cada continente.',
      concept: 'Centros Independientes de Domesticación'
    }
  ],

  recovery: [
    {
      title: 'Recuperación Histórica: Comprensión de la Transición al Neolítico',
      explain: 'El paso de la economía recolectora a la economía productora no ocurrió de golpe ni de la misma manera en todo el mundo. Las comunidades observaron su entorno durante generaciones y experimentaron con las plantas y animales que tenían a su alcance.',
      q: '¿Cuál de las siguientes afirmaciones explica correctamente cómo ocurrió la transición al Neolítico?',
      options: [
        'A) Ocurrió en un solo año cuando una familia nómade descubrió cómo hacer crecer todas las frutas del mundo.',
        'B) Fue un cambio violento que obligó a todas las personas a abandonar sus herramientas de piedra inmediatamente.',
        'C) Surgió de la decisión de un emperador que prohibió la caza de animales en todos los continentes.',
        'D) Fue un proceso gradual y multicausal que tomó miles de años, donde la recolección, el pastoreo y el cultivo convivieron según cada geografía.'
      ],
      correct: 'D) Fue un proceso gradual y multicausal que tomó miles de años, donde la recolección, el pastoreo y el cultivo convivieron según cada geografía.',
      correctText: '¡Correcto! Comprendiste con exactitud la gradualidad y la diversidad geográfica de este proceso de larga duración.',
      fixText: 'Recuerda que la transición fue un proceso gradual de larga duración donde convivieron diversos modos de vida adaptados a cada territorio.'
    }
  ]
};
