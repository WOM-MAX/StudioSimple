import { LessonData } from '../../types/lesson';

export const HISTORIA_7B_OA02_CLASE05: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Historia, Geografía y Ciencias Sociales',
    oaCode: 'OA 2',
    oaTitle: 'Procesos de transformación de la vida humana en el Neolítico',
    lessonNumber: 5,
    totalLessonsInOa: 6,
    lessonTitle: 'Propiedad, jerarquías y especialización del trabajo',
    durationMinutes: 30,
    nextLessonTitle: 'Excedentes, comercio y primeras ciudades'
  },

  prep: {
    adultObjective: 'Acompañar al estudiante a comprender la complejización social del Neolítico: el paso de la posesión comunitaria a la noción de propiedad familiar de parcelas y rebaños, la acumulación desigual de bienes, la aparición de jerarquías sociales (jefaturas y consejos de ancianos) y la especialización laboral a tiempo completo.',
    routeToday: 'De la comunidad igualitaria a la propiedad de parcelas, jerarquías y artesanos de tiempo completo.',
    mentorReminder: 'Sigue las indicaciones en pantalla paso a paso. Lee únicamente los recuadros DILE y PREGÚNTALE en voz alta.',
    reminders: [
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'No leas los recuadros SOLO PARA TI ni AYUDA PEDAGÓGICA.',
      'Haz cada pregunta y espera la respuesta antes de retroalimentar.',
      'Considera correcta una respuesta si expresa el razonamiento histórico con sus propias palabras.',
      'Asegura que el foco se mantenga estrictamente en la propiedad y las jerarquías sociales, sin desviar la discusión al comercio general.'
    ],
    emotionalTip: 'Invítalo a reflexionar sobre la justicia y el trabajo: "Cuando las personas comenzaron a acumular bienes propios, surgió la necesidad de crear reglas, líderes y acuerdos para convivir en paz".'
  },

  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Historia y Geografía', subtitle: 'Propiedad y jerarquías sociales', color: 'yellow' },
      { id: 'b2', number: '02', title: 'Exploración', subtitle: 'Parcelas linajes y jefaturas', color: 'orange' },
      { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Estratificación en cuaderno', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz formativo y síntesis', color: 'teal' }
    ],
    keyQuestions: [
      { label: '¿Cómo nació la propiedad?', sub: 'Del reclamo familiar sobre parcelas y rebaños cuidados durante meses.' },
      { label: '¿Por qué surgieron líderes?', sub: 'Para resolver disputas de tierras y coordinar faenas de riego comunal.' }
    ],
    dileIntro: 'Hoy comenzaremos la clase 5 de Historia, Geografía y Ciencias Sociales: "Propiedad, jerarquías y especialización del trabajo".',
    dileObjective: 'Comprender cómo la acumulación de bienes dio origen a la propiedad familiar y a las jerarquías sociales.'
  },

  situation: {
    dilePrompt: 'En las bandas del Paleolítico todo lo cazado o recolectado se repartía de inmediato entre todos porque la carne no duraba y nadie era dueño de la tierra. Pero en el Neolítico, una familia trabajaba durante seis meses limpiando piedras de un campo, regándolo y cuidando el trigo. ¿Por qué crees que esa familia empezó a considerar que ese campo y ese trigo eran de su propiedad y no de cualquiera que pasara por ahí?',
    expectedAnswer: 'Porque habían invertido meses de esfuerzo, trabajo y cuidado personal en esa parcela específica, por lo que sintieron que tenían derecho exclusivo sobre los frutos de su cosecha para alimentar a sus propios hijos y guardar semillas.',
    socraticHint: 'Si dedicas medio año de tu vida a construir un huerto y cuidarlo todos los días, ¿te parecería justo que alguien que no hizo nada se lleve toda la cosecha?',
    emotionalTip: 'Valora la comprensión del trabajo: el sentido de propiedad nació vinculado al esfuerzo continuado invertido en la tierra y los rebaños.',
    options: [
      {
        label: 'Explicó que la propiedad nació del esfuerzo y tiempo invertido en cuidar la tierra y los animales',
        kind: 'correct',
        feedbackText: '¡Exacto! El trabajo prolongado sobre la tierra generó el derecho consuetudinario a reclamar esa parcela y su cosecha.'
      },
      {
        label: 'Dijo que un rey les vendió la tierra con papeles firmados y dinero',
        kind: 'needs_support',
        feedbackText: 'En esa época aún no existían reyes, dinero ni escrituras legales; la propiedad nació de la ocupación y trabajo familiar continuo.'
      },
      {
        label: 'No sabe qué responder o dio otra respuesta',
        kind: 'no_answer',
        feedbackText: 'Pista guiada: Fíjate en los meses de trabajo: quien siembra, riega y desmaleza una parcela reclama el derecho a cosechar su propio alimento.'
      }
    ]
  },

  reference: {
    dilePrompt: 'A medida que algunas familias acumulaban más granos en sus silos y tenían rebaños más numerosos, comenzaron a construirse viviendas más grandes y a tomar decisiones por toda la aldea.',
    question: '¿De qué manera la acumulación desigual de bienes provocó la aparición de las primeras diferencias y jerarquías sociales entre los habitantes?',
    expectedAnswer: 'Porque las familias con más reservas de comida y ganado podían ayudar a otras en tiempos de sequía o hambruna, ganando prestigio, respeto y autoridad política para liderar y mandar en la comunidad.',
    socraticHint: 'Si en un año de sequía a tu vecino se le muere el cultivo pero tú tienes diez vasijas de trigo guardadas y le prestas comida, ¿quién tiene más influencia en el pueblo?',
    feedbackSuccess: '¡Extraordinario razonamiento sociológico e histórico! La riqueza acumulada se tradujo en poder político, prestigio social y autoridad comunal.',
    feedbackSupport: 'Tener reservas sobrantes permitió a ciertas familias prestar grano y ganar influencia, convirtiéndose en jefes o líderes de la aldea.'
  },

  hook: {
    title: 'El Nacimiento de las Jerarquías Sociales',
    titulo: 'El Nacimiento de las Jerarquías Sociales',
    focusPoints: [
      'Del usufructo comunal a la propiedad familiar: Cercado de parcelas y marcas de rebaño.',
      'Desigualdad material: Familias con mayores silos frente a familias vulnerables a sequías.',
      'Jefaturas y consejos: Líderes para mediar en pleitos y organizar canales de riego.',
      'Artesanos a tiempo completo: Especialistas mantenidos por el excedente alimentario comunal.'
    ],
    dileIntro: 'Acompañemos a los dos exploradores a investigar cómo la aldea comenzó a dividirse en diferentes sectores sociales.',
    hazInstruction: 'Observa cómo la acumulación de bienes transformó las relaciones entre las familias de la aldea.',
    videoSrc: '',
    dileAfterVideo: 'Muy buena observación. Ahora analizaremos las causas que originaron estas jerarquías sociales.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Apertura y Escenario",
        didacticPurpose: "Apertura y Escenario",
        visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, observing agricultural plots separated by low stone boundary markers along a river terrace. Clear morning light, wide negative space in top third. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Linderos de Piedra",
        overlaySubtitle: "Límites marcando parcelas familiares de cultivo",
        overlayText: "Linderos de Piedra: Límites marcando parcelas familiares de cultivo",
        vectorialOverlayPptx: "Transformación jurídica consuetudinaria: Aparición de linderos y delimitación de parcelas",
        speakerNotes: "Nuestros exploradores observan un cambio en los campos: muros bajos de piedra marcan las tierras de cada familia, delimitando su propiedad.",
        palabrasAprox: 21,
        duracionSeg: 9
      },
      {
        slideNumber: 2,
        tituloMomento: "El Trabajo y el Derecho",
        didacticPurpose: "El Trabajo y el Derecho",
        visualPrompt: "Modern anime style. A farming family sweating together to remove river boulders from their field while planting grain, showing months of dedicated labor. The two protagonists taking field notes. Clear space on left. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "El Fruto del Esfuerzo",
        overlaySubtitle: "Cuidar la tierra genera derechos exclusivos",
        overlayText: "El Fruto del Esfuerzo: Cuidar la tierra genera derechos exclusivos",
        vectorialOverlayPptx: "Base económica: La inversión de trabajo continuado justifica el reclamo de propiedad familiar",
        speakerNotes: "Al invertir meses limpiando, regando y cuidando la tierra, las familias comenzaron a considerar que el grano cosechado les pertenecía por derecho propio.",
        palabrasAprox: 23,
        duracionSeg: 9
      },
      {
        slideNumber: 3,
        tituloMomento: "La Cosecha Desigual",
        didacticPurpose: "La Cosecha Desigual",
        visualPrompt: "Modern anime style. Visual contrast in the village: one house with multiple overflowing clay grain jars and robust sheep pens, next to a modest house with empty baskets. Dramatic lighting, expressive eyes. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Acumulación Desigual",
        overlaySubtitle: "Diferencias materiales entre las familias aldeanas",
        overlayText: "Acumulación Desigual: Diferencias materiales entre las familias aldeanas",
        vectorialOverlayPptx: "Diferenciación económica: Cosechas favorables y rebaños numerosos generan acumulación asimétrica de riqueza",
        speakerNotes: "No todas las familias obtuvieron el mismo resultado. Quienes contaban con mejores suelos o más brazos acumularon grandes reservas, mientras otras pasaban escasez.",
        palabrasAprox: 23,
        duracionSeg: 9
      },
      {
        slideNumber: 4,
        tituloMomento: "La Jefatura Comunal",
        didacticPurpose: "La Jefatura Comunal",
        visualPrompt: "Modern anime style. A respected elder chief with carved bone ornaments mediating a dispute between two farmers near a communal canal, with villagers listening attentively. Vibrant colors, clean composition. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Autoridad y Mediación",
        overlaySubtitle: "Consejos de ancianos resolviendo disputas comunales",
        overlayText: "Autoridad y Mediación: Consejos de ancianos resolviendo disputas comunales",
        vectorialOverlayPptx: "Estructura política: Nacimiento de jefaturas y consejos para resolver conflictos de linderos y riego",
        speakerNotes: "Surgieron conflictos por tierras y agua de regadío. Los consejos de ancianos y líderes prestigiosos asumieron la autoridad para dictar acuerdos y mantener el orden.",
        palabrasAprox: 24,
        duracionSeg: 9
      },
      {
        slideNumber: 5,
        tituloMomento: "Artesanos Especializados",
        didacticPurpose: "Artesanos Especializados",
        visualPrompt: "Modern anime style. A master potter and a stone polisher working full time in a dedicated workshop, receiving grain baskets from farmers in exchange for tools and pots. Soft depth of field. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Oficios de Tiempo Completo",
        overlaySubtitle: "Especialistas alimentados por excedentes agrícolas",
        overlayText: "Oficios de Tiempo Completo: Especialistas alimentados por excedentes agrícolas",
        vectorialOverlayPptx: "Especialización laboral: Los artesanos no cultivan la tierra y son sostenidos por los excedentes colectivos",
        speakerNotes: "Al haber comida acumulada, algunos aldeanos dejaron de cultivar para dedicarse exclusivamente a perfeccionar la alfarería, la metalurgia y la construcción.",
        palabrasAprox: 21,
        duracionSeg: 9
      },
      {
        slideNumber: 6,
        tituloMomento: "Jerarquías de Prestigio",
        didacticPurpose: "Jerarquías de Prestigio",
        visualPrompt: "Modern anime style. Wide shot of the village cemetery showing differences in grave goods: some burials with fine polished jade beads and painted pottery, others with simple earth pits. Volumetric lighting. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Evidencias Funerarias",
        overlaySubtitle: "Tumbas que revelan diferencias de prestigio",
        overlayText: "Evidencias Funerarias: Tumbas que revelan diferencias de prestigio",
        vectorialOverlayPptx: "Registro arqueológico: Ajuares funerarios desiguales demuestran estratificación social hereditaria incipiente",
        speakerNotes: "Los arqueólogos confirman esta jerarquía al excavar tumbas: ciertas familias eran enterradas con adornos valiosos y finas vasijas, reflejando su alto rango social.",
        palabrasAprox: 23,
        duracionSeg: 9
      },
      {
        slideNumber: 7,
        tituloMomento: "Pregunta Detonante",
        didacticPurpose: "Pregunta Detonante",
        visualPrompt: "Modern anime style. Inspiring setting with both 13-year-olds smiling with their notebooks before an ancient village diagram showing chiefs, artisans, and farmers collaborating. Clear background. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Interrogante Central",
        overlaySubtitle: "¿Cómo cambió la igualdad comunitaria inicial?",
        overlayText: "Interrogante Central: ¿Cómo cambió la igualdad comunitaria inicial?",
        vectorialOverlayPptx: "Pregunta rectora: ¿Qué transformaciones trajo la aparición de la propiedad y las jerarquías?",
        speakerNotes: "¡Acompáñanos a comprender en la lección cómo estas jerarquías sociales prepararon el camino para las primeras civilizaciones de la historia!",
        palabrasAprox: 19,
        duracionSeg: 6
      }
    ]
  },

  preQuestions: [
    {
      context: 'El Reclamo de la Propiedad Familiar',
      question: 'Vimos que los agricultores neolíticos pusieron cercos de piedra para delimitar sus parcelas. ¿Por qué el trabajo continuo en la tierra generó este sentido de propiedad privada o familiar?',
      expected: 'Porque las familias dedicaban meses de esfuerzo personal en preparar y regar su huerto, considerando que tenían el derecho exclusivo sobre la cosecha que su propio trabajo había generado.',
      success: '¡Exacto! El derecho a la propiedad nació del vínculo directo entre el trabajo humano sostenido y el fruto de la tierra.',
      support: 'Piensa en el tiempo invertido: si trabajas medio año en una parcela, necesitas la seguridad de que nadie te quitará la comida de tus hijos.',
      reveal: 'El esfuerzo continuo de desmalezar, sembrar y regar transformó la tierra en un bien familiar protegido por linderos.',
      studentReveal: 'Porque trabajaron meses en esa parcela y sentían que tenían derecho a la comida que su propio esfuerzo produjo.'
    },
    {
      context: 'Los Especialistas de Tiempo Completo',
      question: '¿Por qué un artesano alfarero o tejedor pudo dejar de sembrar trigo y dedicarse únicamente a su oficio artesanal?',
      expected: 'Porque los agricultores producían excedentes de alimentos suficientes para alimentar a los artesanos, intercambiando trigo por vasijas, telas y herramientas.',
      success: '¡Brillante comprensión económica! El excedente agrícola liberó a un sector de la comunidad para crear tecnología especializada.',
      support: 'Recuerda: si el campo produce más comida de la que los campesinos comen, ¿a quién pueden alimentar con lo que sobra?',
      reveal: 'El excedente de alimentos permitió sostener a personas dedicadas exclusivamente a la alfarería, la metalurgia y la construcción.',
      studentReveal: 'Porque los agricultores producían comida de sobra y se la cambiaban al artesano por sus vasijas y herramientas.'
    }
  ],

  formalization: {
    title: 'Propiedad, Jerarquías y Especialización Social',
    concept: 'Propiedad, Jerarquías y Especialización del Trabajo',
    dileIntro: 'Ahora veremos el video explicativo. Analizaremos cómo la acumulación de bienes, las jerarquías de autoridad y los oficios especializados transformaron la sociedad neolítica.',
    hazInstruction: 'Revisemos con atención la explicación formal y preparemos el cuaderno para registrar las ideas centrales.',
    ideaClave: 'La acumulación de bienes agrícolas y rebaños consolidó la propiedad familiar, generó desigualdades materiales y dio origen a jerarquías de autoridad (jefaturas) y a artesanos especializados a tiempo completo.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Objetivo de la Lección",
        didacticPurpose: "Objetivo de la Lección",
        visualPrompt: "Modern anime style 16:9. The boy and girl in a luminous study room, examining a sociological pyramid diagram of a Neolithic community showing chiefs, artisans, and farming families. Clear negative space on top. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Objetivo de la Clase",
        overlaySubtitle: "Comprender propiedad jerarquías y especialización",
        overlayText: "Objetivo: Comprender propiedad jerarquías y especialización",
        vectorialOverlayPptx: "Rótulo formal: OA 2 · Complejización social en el Neolítico",
        speakerNotes: "El objetivo de hoy es comprender cómo la propiedad de parcelas, la acumulación desigual y la especialización del trabajo originaron jerarquías sociales.",
        palabrasAprox: 23,
        duracionSeg: 12
      },
      {
        slideNumber: 2,
        tituloMomento: "Aparición de la Propiedad",
        didacticPurpose: "Aparición de la Propiedad",
        visualPrompt: "Modern anime style. The girl explaining a diagram contrasting communal gathering territory in the Paleolithic with demarcated family agricultural plots in the Neolithic. Clean lineart. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "De lo Comunal a lo Familiar",
        overlaySubtitle: "Parcelas y rebaños bajo posesión propia",
        overlayText: "De lo Comunal a lo Familiar: Parcelas y rebaños bajo posesión propia",
        vectorialOverlayPptx: "Evolución institucional: Territorio de caza compartido -> Parcelas agrícolas y ganado de propiedad familiar",
        speakerNotes: "El modo sedentario transformó la posesión de la tierra. Las parcelas de cultivo y los rebaños pasaron a ser propiedad de familias y linajes específicos.",
        palabrasAprox: 24,
        duracionSeg: 13
      },
      {
        slideNumber: 3,
        tituloMomento: "Desigualdad y Acumulación",
        didacticPurpose: "Desigualdad y Acumulación",
        visualPrompt: "Modern anime style. Village storage comparison showing a lineage with large multi-chambered granaries and abundant herds, contrasting with a family with modest reserves. Soft ambient lighting. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Acumulación Desigual",
        overlaySubtitle: "Mayor riqueza genera mayor influencia social",
        overlayText: "Acumulación Desigual: Mayor riqueza genera mayor influencia social",
        vectorialOverlayPptx: "Mecanismo social: La posesión asimétrica de excedentes permite acumular prestigio, deudas y poder político",
        speakerNotes: "Quienes acumulaban más grano y animales podían prestar alimento en épocas duras. Esta ventaja material se tradujo en prestigio social y dependencia comunitaria.",
        palabrasAprox: 24,
        duracionSeg: 13
      },
      {
        slideNumber: 4,
        tituloMomento: "Jefaturas y Autoridad",
        didacticPurpose: "Jefaturas y Autoridad",
        visualPrompt: "Modern anime style. The boy illustrating a tribal chief wearing a copper pectoral and holding an ornate stone staff, coordinating irrigation canal maintenance with village heads. Dramatic lighting. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "El Surgimiento de Jefes",
        overlaySubtitle: "Liderazgo para coordinar obras y justicia",
        overlayText: "El Surgimiento de Jefes: Liderazgo para coordinar obras y justicia",
        vectorialOverlayPptx: "Poder político temprano: Jefaturas tribales encargadas de mediar conflictos y organizar la defensa",
        speakerNotes: "Aparecieron las jefaturas. Líderes respetados asumieron el rol de jueces en conflictos de tierras y de organizadores de obras públicas como canales y murallas.",
        palabrasAprox: 24,
        duracionSeg: 13
      },
      {
        slideNumber: 5,
        tituloMomento: "Especialización de Artesanos",
        didacticPurpose: "Especialización de Artesanos",
        visualPrompt: "Modern anime style. Close-up on a skilled potter decorating fine pottery and a metalsmith crafting copper tools, free from field labor. The two explorers observing. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Artesanos a Tiempo Completo",
        overlaySubtitle: "Oficios sostenidos por el excedente alimentario",
        overlayText: "Artesanos a Tiempo Completo: Oficios sostenidos por el excedente alimentario",
        vectorialOverlayPptx: "División técnica: Separación definitiva entre productores directos de alimentos y especialistas artesanales",
        speakerNotes: "Gracias a los excedentes, nacieron artesanos de tiempo completo. Ya no sembraban: la comunidad les daba alimento a cambio de vasijas, telas y herramientas pulidas.",
        palabrasAprox: 24,
        duracionSeg: 13
      },
      {
        slideNumber: 6,
        tituloMomento: "Atención al Error Común",
        didacticPurpose: "Atención al Error Común",
        visualPrompt: "Modern anime style. The boy pointing out a misconception diagram, showing that social inequality was not present in the Paleolithic band but arose with food storage. Clear visual. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Error: Desigualdad No Inmutable",
        overlaySubtitle: "La jerarquía social nació con los excedentes",
        overlayText: "Error: Desigualdad No Inmutable: La jerarquía social nació con los excedentes",
        vectorialOverlayPptx: "Perspectiva histórica: Las sociedades cazadoras eran igualitarias; la estratificación nació con la acumulación",
        speakerNotes: "Un error habitual es creer que las jerarquías siempre existieron. En el Paleolítico reinaba el igualitarismo; la desigualdad nació al acumular excedentes materiales.",
        palabrasAprox: 25,
        duracionSeg: 13
      },
      {
        slideNumber: 7,
        tituloMomento: "Síntesis y Regla de Oro",
        didacticPurpose: "Síntesis y Regla de Oro",
        visualPrompt: "Modern anime style. Both 13-year-olds smiling proudly with their notebooks before an infographic: Excedente -> Propiedad -> Jerarquía -> Especialización. Clean negative space. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Regla de Oro Social",
        overlaySubtitle: "La acumulación transformó la organización comunitaria",
        overlayText: "Regla de Oro: La acumulación transformó la organización comunitaria",
        vectorialOverlayPptx: "Conclusión didáctica: Acumulación de excedentes = Propiedad privada + Jerarquías políticas + Especialización laboral",
        speakerNotes: "La propiedad familiar y la acumulación de bienes complejizaron a la sociedad neolítica, sentando las bases de la división social y la autoridad política.",
        palabrasAprox: 23,
        duracionSeg: 13
      }
    ]
  },

  postQuestions: [
    {
      context: 'El Vínculo entre Excedente y Poder Político',
      question: 'En el video analizamos que las familias con mayores cosechas y rebaños ganaron prestigio y autoridad sobre la comunidad. ¿Cómo se convirtió la riqueza alimentaria en poder de decisión política?',
      expected: 'Porque al poder prestar grano y ganado en épocas de escasez, esas familias generaron lealtad y dependencia, lo que les permitió liderar consejos y tomar decisiones por la aldea.',
      success: '¡Excelente análisis de ciencia política e historia! Reconociste cómo el excedente material se transformó en autoridad comunal.',
      support: 'Fíjate en quién tiene la comida cuando hay sequía: quien ayuda a los demás se gana el respeto y la obediencia de la comunidad.',
      reveal: 'La capacidad de distribuir alimentos en tiempos difíciles otorgó prestigio e influencia a los linajes ricos, consolidando su rol como jefes.',
      studentReveal: 'Porque al prestar comida en épocas de hambre ganaron el respeto y apoyo de la gente para mandar y dirigir la aldea.'
    },
    {
      context: 'La Especialización Laboral de Tiempo Completo',
      question: '¿Por qué la existencia de artesanos de tiempo completo fue imposible durante el Paleolítico y solo pudo surgir en el Neolítico?',
      expected: 'Porque en el Paleolítico no había excedentes de comida guardados; todos debían buscar alimento diariamente. En el Neolítico el excedente agrícola permitió alimentar a quienes no cultivaban.',
      success: '¡Gran precisión historiográfica! Vinculaste la base económica de subsistencia con la división social del trabajo.',
      support: 'Piensa en el tiempo diario: si tienes que cazar para no morir de hambre hoy, ¿puedes pasar todo el día fabricando vasijas?',
      reveal: 'Solo cuando la producción agrícola generó excedentes sostenidos fue posible liberar a miembros de la comunidad para oficios artesanales exclusivos.',
      studentReveal: 'Porque antes todos tenían que buscar comida para vivir; con la agricultura sobraba comida para alimentar a los artesanos.'
    }
  ],

  practice: [
    {
      context: 'Actividad en Cuaderno: Esquema de Jerarquización Social',
      question: 'Abre tu cuaderno de notas de Historia. Escribe como título: "Propiedad, Jerarquías y Especialización en el Neolítico". Dibuja un esquema piramidal con tres niveles: en la cúspide ubica a los Jefes y Consejos de Ancianos; en el centro a los Artesanos Especializados (alfareros, constructores, tejedores); y en la base a las Familias de Agricultores y Pastores. Al lado de cada grupo, anota su función social y cómo se sostenía económicamente.',
      expected: 'Esquema piramidal completo en el cuaderno con los tres estamentos neolíticos, sus funciones y su base económica de sostenimiento.',
      success: '¡Excelente esquema en tu cuaderno! Has estructurado la pirámide social neolítica con claridad conceptual impecable.',
      support: 'Revisa las diapositivas de la lección: explica que los jefes dirigían, los campesinos producían la comida y los artesanos creaban herramientas y vasijas.',
      reveal: 'El esquema piramidal muestra el nacimiento de la estratificación social como consecuencia directa de la acumulación de bienes.',
      studentReveal: 'Pirámide social completa en el cuaderno con jefes, artesanos y agricultores, indicando su función y cómo se alimentaban.'
    },
    {
      context: 'Debate Histórico: Del Igualitarismo a la Desigualdad',
      question: 'En tu cuaderno, redacta una breve reflexión argumentativa respondiendo: ¿Consideras que la aparición de la propiedad y las jerarquías sociales fue un avance positivo, un problema de convivencia, o ambos a la vez? Fundamenta con ejemplos vistos hoy.',
      expected: 'Texto argumentativo fundamentado que evalúe tanto las ventajas organizativas (obras hidráulicas, defensa, tecnología) como los conflictos de desigualdad.',
      success: '¡Brillante madurez de pensamiento crítico! Evaluaste las transformaciones sociales reconociendo luces y sombras en la historia humana.',
      support: 'Considera los dos lados: permitió organizar grandes canales de agua y fabricar mejores herramientas, pero también generó diferencias entre ricos y pobres.',
      reveal: 'La complejización social aportó orden y productividad técnica, pero introdujo desigualdades que acompañaron a las civilizaciones posteriores.',
      studentReveal: 'Texto argumentativo en el cuaderno analizando las ventajas organizativas de las jerarquías y las desigualdades sociales surgidas.'
    }
  ],

  summaryIdeas: [
    ['Propiedad Familiar', 'El trabajo continuo sobre la tierra y el cuidado de animales consolidó el derecho de familias sobre parcelas y rebaños.'],
    ['Jerarquías de Autoridad', 'Familias con mayores reservas de alimento ganaron prestigio e influencia, asumiendo el liderazgo comunal como jefaturas.'],
    ['Artesanos Exclusivos', 'Los excedentes agrícolas permitieron mantener a especialistas en alfarería, metalurgia y tejido que no trabajaban en el campo.']
  ],

  mini: [
    {
      id: 'q_1',
      q: '¿Cómo surgió históricamente la noción de propiedad familiar sobre las parcelas de cultivo en las aldeas neolíticas?',
      options: [
        'A) Por un decreto escrito enviado por gobernantes de otros planetas.',
        'B) Porque las personas compraban la tierra utilizando tarjetas de crédito.',
        'C) A partir del trabajo e inversión continua de esfuerzo familiar durante meses para preparar, regar y proteger la tierra.',
        'D) Porque los ríos dibujaban cercos de oro alrededor de las casas cada primavera.'
      ],
      correct: 'C) A partir del trabajo e inversión continua de esfuerzo familiar durante meses para preparar, regar y proteger la tierra.',
      fixExplain: 'El sentido de propiedad nació consuetudinariamente al vincular el esfuerzo físico prolongado con los frutos obtenidos de la parcela.',
      concept: 'Origen de la Propiedad Neolítica'
    },
    {
      id: 'q_2',
      q: '¿Cuál fue la causa socioeconómica fundamental que permitió la aparición de artesanos dedicados a tiempo completo a la alfarería o la metalurgia?',
      options: [
        'A) Que los artesanos no necesitaban comer ni beber agua para vivir.',
        'B) La generación de excedentes alimentarios agrícolas que permitieron a la comunidad alimentar a personas que no trabajaban en el campo.',
        'C) La prohibición religiosa de que los hombres tocaran la tierra con las manos.',
        'D) Que los cultivos desaparecieron y todos tuvieron que inventar ollas para no aburrirse.'
      ],
      correct: 'B) La generación de excedentes alimentarios agrícolas que permitieron a la comunidad alimentar a personas que no trabajaban en el campo.',
      fixExplain: 'El excedente liberó a una parte de la población de las tareas de siembra directa, permitiendo el florecimiento de oficios especializados.',
      concept: 'Base Económica de la Especialización'
    },
    {
      id: 'q_3',
      q: 'Para evitar el error común de creer que la desigualdad social siempre existió, ¿qué nos demuestra la comparación entre el Paleolítico y el Neolítico?',
      options: [
        'A) Que las bandas de cazadores del Paleolítico compartían el alimento de forma igualitaria, mientras que la acumulación de bienes en el Neolítico originó las primeras jerarquías.',
        'B) Que en el Paleolítico los jefes tenían castillos y en el Neolítico todos vivían exactamente igual sin jefes.',
        'C) Que los animales salvajes elegían a los gobernantes de las bandas humanas.',
        'D) Que la sociedad humana se volvió completamente nómade y olvidó las leyes al inventar la agricultura.'
      ],
      correct: 'A) Que las bandas de cazadores del Paleolítico compartían el alimento de forma igualitaria, mientras que la acumulación de bienes en el Neolítico originó las primeras jerarquías.',
      fixExplain: 'La estratificación social es una construcción histórica surgida con la capacidad material de acumular excedentes y riqueza.',
      concept: 'Evolución Histórica de la Desigualdad'
    }
  ],

  recovery: [
    {
      title: 'Recuperación Histórica: Complejización Social en el Neolítico',
      explain: 'Cuando las comunidades comenzaron a producir y guardar excedentes de comida, su forma de relacionarse cambió para siempre. La tierra comenzó a tener dueños familiares, surgieron jefes para organizar el trabajo y aparecieron artesanos dedicados a crear herramientas sin sembrar.',
      q: '¿Qué elementos definieron la complejización social en las aldeas del Neolítico tardío?',
      options: [
        'A) La desaparición de los poblados y el regreso al nomadismo en cavernas.',
        'B) La invención de fábricas de vapor y trenes para viajar entre continentes.',
        'C) El uso exclusivo de pieles de animales y la prohibición de usar vasijas de cerámica.',
        'D) La propiedad familiar de tierras, la diferenciación social por acumulación de excedentes y la división del trabajo entre campesinos, jefes y artesanos.'
      ],
      correct: 'D) La propiedad familiar de tierras, la diferenciación social por acumulación de excedentes y la división del trabajo entre campesinos, jefes y artesanos.',
      correctText: '¡Correcto! Identificaste los pilares de la complejización social neolítica: propiedad, jerarquías y especialización laboral.',
      fixText: 'Recuerda que la complejización social combinó tres elementos clave: propiedad de tierras, jerarquías de liderazgo y artesanos especializados.'
    }
  ]
};
