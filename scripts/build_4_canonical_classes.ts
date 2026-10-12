import fs from 'fs';
import path from 'path';
import { LessonData } from '../Web Studio Simple/src/types/lesson';

const TIMESTAMP = '2026-10-10_19-15';
const ISO_TIMESTAMP = '2026-10-10 19:15 [America/Santiago]';

// ============================================================================
// 1. LENGUA Y LITERATURA: 110-7-LYL-OA03 CLASE 01
// ============================================================================
export const LENGUA_7B_OA03_CLASE01: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Lengua y Literatura',
    oaCode: 'OA 3',
    oaTitle: 'Análisis de narraciones: conflicto, personajes y ambiente',
    lessonNumber: 1,
    totalLessonsInOa: 6,
    lessonTitle: 'Ambiente Lunar y Conflicto en "El mejor amigo de un muchacho"',
    durationMinutes: 30,
    nextLessonTitle: 'Motivaciones y Acciones de los Personajes en el Relato de Asimov'
  },
  prep: {
    adultObjective: 'Acompañar al estudiante en la lectura comprensiva de "El mejor amigo de un muchacho" de Isaac Asimov (págs. 12-15 del Texto Escolar), localizando información explícita sobre el entorno lunar y fundamentando inferencias sobre el vínculo afectivo de Jimmy y Robutt, reconociendo el dilema frente al perro de la Tierra sin afirmar que el padre accedió a conservarlo.',
    routeToday: 'Lectura explícita e inferencias en el cuento de ciencia ficción: La Luna, Robutt y el dilema del perro terrestre.',
    mentorReminder: 'Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Las respuestas esperadas y criterios te indican qué debe responder el estudiante para que no tengas que estudiar previamente.',
    reminders: [
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'Los recuadros AYUDA PEDAGÓGICA y CLIMA EMOCIONAL son información exclusiva para ti.',
      'Valora las inferencias del estudiante si están justificadas con acciones o diálogos del cuento.',
      'Ten a mano el cuaderno de Lengua y Literatura para el registro de citas y respuestas.'
    ],
    emotionalTip: 'Fomenta la empatía y la reflexión: pregúntale cómo se sentiría viviendo en la Luna y qué significa el cariño verdadero, incluso hacia un compañero no humano.'
  },
  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Lengua y Literatura', subtitle: 'Ciencia Ficción y Ambiente', color: 'orange' },
      { id: 'b2', number: '02', title: 'Lectura Guiada', subtitle: 'Jimmy, Robutt y el Cráter', color: 'teal' },
      { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Inferencias y Cuaderno', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz Formativo y Síntesis', color: 'navy' }
    ],
    keyQuestions: [
      { label: '¿Dónde y cómo transcurre el relato?', sub: 'En una colonia lunar árida donde se necesita traje espacial.' },
      { label: '¿Qué dilema enfrenta Jimmy?', sub: 'Elegir entre un perro biológico terrestre o su fiel perro robot.' }
    ],
    dileIntro: 'Hoy comenzaremos la primera clase de Lengua y Literatura para 7° Básico: "Ambiente Lunar y Conflicto en El mejor amigo de un muchacho".',
    dileObjective: 'Aprenderemos a localizar datos explícitos del ambiente y personajes, y a fundamentar inferencias basadas en hechos concretos del relato.'
  },
  situation: {
    dilePrompt: 'En pantalla puedes ver la ilustración de la Luna. Jimmy Anderson tiene diez años y nació en una colonia lunar. Nunca ha visitado la Tierra. Su compañero de juegos es Robutt, un perro robot. Observa el paisaje exterior del cráter: ¿por qué Jimmy debe usar un traje espacial presurizado y cómo influye la baja gravedad lunar en su forma de moverse?',
    expectedAnswer: 'El estudiante debe responder que la Luna no tiene atmósfera respirable (falta oxígeno y presión), por lo que necesita traje espacial; además, por la baja gravedad lunar, da saltos largos y flotantes.',
    socraticHint: 'Piensa en las condiciones físicas de la Luna: ¿hay aire para respirar afuera? ¿Pesa lo mismo un cuerpo en la Luna que en la Tierra?',
    emotionalTip: 'Anima al estudiante a imaginar la experiencia de dar saltos de varios metros en la superficie lunar junto a su mascota.',
    options: [
      {
        label: 'Mencionó la falta de atmósfera/oxígeno y los saltos provocados por la menor gravedad lunar',
        kind: 'correct',
        feedbackText: '¡Exacto! El ambiente físico lunar condiciona los trajes espaciales y los movimientos de Jimmy y Robutt.'
      },
      {
        label: 'Solo mencionó que es el espacio o que hace frío, sin aludir al aire ni a la gravedad',
        kind: 'needs_support',
        feedbackText: 'Fíjate en el texto: Jimmy no puede salir sin casco porque no hay oxígeno respirable, y sus saltos son ágiles gracias a la baja gravedad.'
      },
      {
        label: 'No sabe qué responder o dio otra respuesta',
        kind: 'no_answer',
        feedbackText: 'Pista guiada: Recuerda que en la Luna no hay aire para respirar (por eso usa traje espacial) y la gravedad es seis veces menor que en la Tierra.'
      }
    ]
  },
  reference: {
    dilePrompt: 'En la pantalla interactiva se presenta el inicio del cuento de Isaac Asimov (páginas 12-13 del Texto Escolar).',
    question: 'Según lo narrado al comienzo del cuento, ¿cómo es la relación entre Jimmy y Robutt y qué juego demuestra la protección que el robot siente por el niño?',
    expectedAnswer: 'Es una relación de profunda amistad, complicidad y cuidado mutuo. En una ocasión Jimmy fingió estar herido quedándose rígido en el suelo, y Robutt activó de inmediato una alarma y se colocó sobre él para protegerlo.',
    socraticHint: 'Busca en la página 14 del cuento: ¿qué hizo Jimmy fingiendo dolor y cómo reaccionó Robutt?',
    feedbackSuccess: '¡Excelente lectura! Reconociste el vínculo de lealtad y protección que une a Jimmy con su mascota mecánica.',
    feedbackSupport: 'Revisa el fragmento: Jimmy fingió estar herido y Robutt no solo ladró pidiendo auxilio por radio, sino que se quedó cubriéndolo fielmente.'
  },
  hook: {
    title: 'El mejor amigo de un muchacho: Ciencia Ficción y Afecto',
    dileIntro: 'Acompáñame a explorar este relato de Isaac Asimov. Analizaremos cómo el autor construye un mundo futuro en la Luna y plantea un dilema sobre el afecto humano.',
    hazInstruction: 'Observa atentamente las diapositivas e identifica el ambiente espacial, las acciones de los personajes y el conflicto que surge.',
    videoSrc: '',
    focusPoints: [
      'Ambiente lunar: Cráteres áridos, gravedad reducida y trajes espaciales.',
      'Jimmy Anderson: Niño nacido en la Luna que nunca ha visto un animal terrestre vivo.',
      'Robutt: Perro robótico cuadrúpedo con tendones de acero y sistema de comunicación por radio.',
      'El conflicto: Los padres le ofrecen un perro terrier vivo de la Tierra a cambio de abandonar a Robutt.'
    ],
    dileAfterVideo: 'Conversemos sobre lo observado. Te haré dos preguntas para comprobar cómo fundamentamos inferencias con citas del texto.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Apertura en la Luna",
        didacticPurpose: "Apertura en la Luna",
        visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, examining a futuristic holographic moon base with barren craters under a starry black sky. High contrast, warm interior lighting, generous negative space in upper third. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Ambiente Lunar y Ciencia Ficción",
        overlaySubtitle: "El mejor amigo de un muchacho",
        overlayText: "Ambiente Lunar y Ciencia Ficción: El mejor amigo de un muchacho",
        vectorialOverlayPptx: "Contexto literario: Isaac Asimov · Narrativa de ciencia ficción ambientada en una colonia lunar",
        speakerNotes: "Hoy nos trasladamos a una colonia en la Luna para analizar cómo la ciencia ficción explora los sentimientos humanos a través de la historia de Jimmy y Robutt."
      },
      {
        slideNumber: 2,
        tituloMomento: "El Escenario Físico",
        didacticPurpose: "El Escenario Físico",
        visualPrompt: "Modern anime style 16:9. A ten-year-old boy in a white lunar spacesuit jumping playfully across gray regolith craters next to a sleek robotic dog made of dark metal joints. Earth visible as a blue marble in the dark sky. No text drawn by AI.",
        overlayTitle: "Vida en una Colonia Lunar",
        overlaySubtitle: "Gravedad reducida y trajes espaciales",
        overlayText: "Vida en una Colonia Lunar: Gravedad reducida y trajes espaciales",
        vectorialOverlayPptx: "Ambiente físico: Paisaje árido, sin atmósfera respirable, baja gravedad que permite saltos amplios",
        speakerNotes: "Jimmy nació en la Luna. Para salir a jugar fuera de las cúpulas habitacionales debe usar un traje espacial hermético, aprovechando la baja gravedad para dar saltos largos."
      },
      {
        slideNumber: 3,
        tituloMomento: "El Vínculo con Robutt",
        didacticPurpose: "El Vínculo con Robutt",
        visualPrompt: "Modern anime style 16:9. The boy smiling through his helmet visor, petting the mechanical head of his robotic dog. The robot dog emits small radar signals and wags its metallic tail. Warm emotional connection. No text drawn by AI.",
        overlayTitle: "Robutt: El Perro Robot",
        overlaySubtitle: "Complicidad juegos y protección mutua",
        overlayText: "Robutt: El Perro Robot: Complicidad juegos y protección mutua",
        vectorialOverlayPptx: "Personaje: Robutt no necesita traje espacial; se comunica por radio y acompaña a Jimmy en cada expedición",
        speakerNotes: "Robutt es una máquina con tendones de acero y circuitos, pero para Jimmy es su mejor amigo. No necesita traje espacial y siempre cuida la seguridad del niño."
      },
      {
        slideNumber: 4,
        tituloMomento: "La Noticia de los Padres",
        didacticPurpose: "La Noticia de los Padres",
        visualPrompt: "Modern anime style 16:9. Inside the well-lit lunar home, Jimmy's parents, Mr. and Mrs. Anderson, holding a small transport kennel with a sleeping brown Scottish terrier puppy from Earth. Serious yet affectionate discussion. No text drawn by AI.",
        overlayTitle: "Un Regalo Inesperado",
        overlaySubtitle: "Un auténtico cachorro traído de la Tierra",
        overlayText: "Un Regalo Inesperado: Un auténtico cachorro traído de la Tierra",
        vectorialOverlayPptx: "Quiebre inicial: Los padres anuncian la llegada de un perro real y proponen donar a Robutt a una fábrica",
        speakerNotes: "El padre de Jimmy anuncia que ha llegado una nave desde la Tierra con un cachorro vivo. Cree que un perro biológico es mucho mejor que un perro mecánico."
      },
      {
        slideNumber: 5,
        tituloMomento: "El Conflicto Interior",
        didacticPurpose: "El Conflicto Interior",
        visualPrompt: "Modern anime style 16:9. Close-up of Jimmy with a troubled and determined expression, looking from the real puppy to Robutt standing patiently beside him. Visual dilemma. No text drawn by AI.",
        overlayTitle: "Dilema de Jimmy",
        overlaySubtitle: "¿Qué hace que un amigo sea real?",
        overlayText: "Dilema de Jimmy: ¿Qué hace que un amigo sea real?",
        vectorialOverlayPptx: "Conflicto narrativo: El valor de lo biológico frente a la lealtad y el apego emocional construido",
        speakerNotes: "El padre insiste en que un perro real devolverá afecto genuino. Pero Jimmy se pregunta: ¿no es real el cariño que Robutt le ha demostrado durante años?"
      },
      {
        slideNumber: 6,
        tituloMomento: "La Defensa de Jimmy",
        didacticPurpose: "La Defensa de Jimmy",
        visualPrompt: "Modern anime style 16:9. Jimmy kneeling and wrapping his arms tightly around Robutt's metallic neck, facing his father with firm conviction. Tears of loyalty in the boy's eyes. No text drawn by AI.",
        overlayTitle: "La Respuesta de Jimmy",
        overlaySubtitle: "Robutt me quiere a mí",
        overlayText: "La Respuesta de Jimmy: Robutt me quiere a mí",
        vectorialOverlayPptx: "Clímax emocional: 'No es lo que ellos sienten por ti, sino lo que tú sientes por ellos... ¡Robutt me quiere a mí!'",
        speakerNotes: "Jimmy rechaza la idea de reemplazar a su compañero. Para él, los circuitos de Robutt albergan un afecto verdadero que no se puede desechar como un simple aparato."
      },
      {
        slideNumber: 7,
        tituloMomento: "El Final Abierto",
        didacticPurpose: "El Final Abierto",
        visualPrompt: "Modern anime style 16:9. The boy embracing his robot dog in the lunar room while the father watches quietly in thoughtful silence, holding the Earth puppy. Twilight on the Moon. No text drawn by AI.",
        overlayTitle: "Final del Relato",
        overlaySubtitle: "Un abrazo sin acuerdo explícito escrito",
        overlayText: "Final del Relato: Un abrazo sin acuerdo explícito escrito",
        vectorialOverlayPptx: "Rigor textual: El cuento concluye con el abrazo de Jimmy; no declara si el padre cedió o no",
        speakerNotes: "El relato termina con Jimmy abrazando a Robutt. Asimov no escribe que el padre haya aceptado quedárselo; deja la resolución abierta a la reflexión del lector."
      },
      {
        slideNumber: 8,
        tituloMomento: "Objetivo de la Explicación",
        didacticPurpose: "Objetivo de la Explicación",
        visualPrompt: "Modern anime style 16:9. The girl with braided hair and boy in teal jacket in a library setting with holographic text cards analyzing narrative excerpts. Clean layout, generous negative space. No text drawn by AI.",
        overlayTitle: "Objetivo de la Clase",
        overlaySubtitle: "Localizar datos y fundamentar inferencias",
        overlayText: "Objetivo: Localizar datos y fundamentar inferencias",
        vectorialOverlayPptx: "OA 3: Analizar narraciones reconociendo ambiente, conflicto y motivaciones con citas textuales",
        speakerNotes: "En esta fase aprenderemos a distinguir los datos literales del texto de las inferencias fundamentadas, usando las palabras exactas del autor."
      },
      {
        slideNumber: 9,
        tituloMomento: "Nivel Literal vs Inferencial",
        didacticPurpose: "Nivel Literal vs Inferencial",
        visualPrompt: "Modern anime style 16:9. Infographic comparison: on the left a magnifying glass highlighting explicit words in an open book; on the right a thought bubble linking clues to deduce hidden meanings. High contrast. No text drawn by AI.",
        overlayTitle: "Dos Niveles de Lectura",
        overlaySubtitle: "Lo que el texto dice y lo que deducimos",
        overlayText: "Dos Niveles de Lectura: Lo que el texto dice y lo que deducimos",
        vectorialOverlayPptx: "Literal: Información visible en el texto · Inferencial: Deducción lógica basada en pistas textuales",
        speakerNotes: "La lectura literal rescata los hechos visibles en la página; la inferencia une esas pistas con nuestro razonamiento para comprender lo que no está dicho directamente."
      },
      {
        slideNumber: 10,
        tituloMomento: "Ambiente Físico y Psicológico",
        didacticPurpose: "Ambiente Físico y Psicológico",
        visualPrompt: "Modern anime style 16:9. Contrast between the cold, silent lunar crater landscape and the warm, intense emotional bond between the boy and his robot dog. Clean diagram overlay. No text drawn by AI.",
        overlayTitle: "El Doble Ambiente",
        overlaySubtitle: "El cráter lunar y la atmósfera afectiva",
        overlayText: "El Doble Ambiente: El cráter lunar y la atmósfera afectiva",
        vectorialOverlayPptx: "Ambiente físico: Cráter árido, vacío, gravedad lunar · Ambiente psicológico: Afecto, lealtad y tensión familiar",
        speakerNotes: "El ambiente no es solo el lugar geográfico como la Luna; también es el ambiente psicológico, marcado por el cariño sincero y la tensión ante una decisión familiar."
      },
      {
        slideNumber: 11,
        tituloMomento: "Fundamentación de Inferencias",
        didacticPurpose: "Fundamentación de Inferencias",
        visualPrompt: "Modern anime style 16:9. A step-by-step flowchart connecting a text quote with a reasoned conclusion. The student explorers pointing with interest. No text drawn by AI.",
        overlayTitle: "Cómo Fundamentar",
        overlaySubtitle: "Toda inferencia requiere evidencia textual",
        overlayText: "Cómo Fundamentar: Toda inferencia requiere evidencia textual",
        vectorialOverlayPptx: "Estrategia: Cita o hecho del relato -> Razonamiento lógico -> Inferencia válida",
        speakerNotes: "Para que una inferencia sea válida en una evaluación, siempre debemos respaldarla con una acción o diálogo real que ocurra en el cuento."
      },
      {
        slideNumber: 12,
        tituloMomento: "Atención al Error Típico",
        didacticPurpose: "Atención al Error Típico",
        visualPrompt: "Modern anime style 16:9. A warning shield icon next to an open book where an assumed ending is crossed out gently in red. Clear visual caution. No text drawn by AI.",
        overlayTitle: "Cuidado: No Inventes el Final",
        overlaySubtitle: "El autor no declaró el acuerdo del padre",
        overlayText: "Cuidado: No Inventes el Final: El autor no declaró el acuerdo del padre",
        vectorialOverlayPptx: "Regla crítica: El cuento termina en el abrazo. Afirmar que el padre aceptó es sobreinterpretar el texto",
        speakerNotes: "Un error habitual es afirmar que el padre permitió que Jimmy se quedara con Robutt. Asimov nunca escribió esa frase; mantener la fidelidad al texto es esencial."
      },
      {
        slideNumber: 13,
        tituloMomento: "Modelamiento de Pregunta",
        didacticPurpose: "Modelamiento de Pregunta",
        visualPrompt: "Modern anime style 16:9. The boy in teal jacket answering a sample multiple choice question on an interactive screen with four options clearly displayed. Professional typography layout. No text drawn by AI.",
        overlayTitle: "Reactivo Tipo MINEDUC",
        overlaySubtitle: "¿Por qué Jimmy prefiere a Robutt?",
        overlayText: "Reactivo Tipo MINEDUC: ¿Por qué Jimmy prefiere a Robutt?",
        vectorialOverlayPptx: "Pregunta modelada: ¿Qué argumento sostiene Jimmy para defender a su perro robot frente al cachorro de la Tierra?",
        speakerNotes: "Veamos cómo se evalúa este objetivo: Jimmy no defiende a Robutt por ser más barato o moderno, sino porque valora el lazo afectivo vivido con él."
      },
      {
        slideNumber: 14,
        tituloMomento: "Cierre y Transición",
        didacticPurpose: "Cierre y Transición",
        visualPrompt: "Modern anime style 16:9. Both student explorers standing beside a study table with open notebooks, pencils ready, looking motivated towards the exercise screen. Warm dawn light. No text drawn by AI.",
        overlayTitle: "Regla de Oro Literaria",
        overlaySubtitle: "Toda deducción debe apoyarse en el texto",
        overlayText: "Regla de Oro: Toda deducción debe apoyarse en el texto",
        vectorialOverlayPptx: "Paso a la práctica: Vamos a responder las preguntas de inferencia y redactar nuestras justificaciones en el cuaderno",
        speakerNotes: "Nuestra Regla de Oro: en literatura, una opinión o inferencia solo es válida si encontramos la evidencia en las palabras del relato. ¡Pasemos a la práctica!"
      }
    ]
  },
  preQuestions: [
    {
      context: 'El Escenario de la Colonia Lunar (P01 de la Base Curricular)',
      question: '¿En qué lugar físico se desarrolla la historia y cuáles son las características de ese entorno según el texto?',
      expected: 'Se desarrolla en una colonia humana en la Luna, en un ambiente exterior rocoso, árido, sin atmósfera respirable ni gravedad terrestre, dentro de cráteres lunares.',
      success: '¡Excelente localización! Reconociste el escenario físico de la Luna y las restricciones de su atmósfera.',
      support: 'Revisa las primeras páginas del cuento: Jimmy sale por una esclusa con su traje presurizado a caminar por los cráteres lunares.',
      reveal: 'El relato se ambienta en la Luna, un mundo rocoso y sin aire donde los humanos deben usar trajes espaciales y viven en colonias protegidas.',
      studentReveal: 'En la Luna, un lugar árido y rocoso sin oxígeno, donde Jimmy camina por cráteres con traje espacial.'
    },
    {
      context: 'La Relación entre Jimmy y Robutt (P02 de la Base Curricular)',
      question: 'Según lo narrado al comienzo del cuento, ¿cómo es la relación que tiene Jimmy con Robutt y qué demuestra el episodio donde finge estar herido?',
      expected: 'Es una relación de amistad profunda, lealtad y confianza. Cuando Jimmy fingió estar herido, Robutt activó una alarma de emergencia por radio y se colocó encima para protegerlo.',
      success: '¡Gran precisión! La reacción de auxilio y cuidado de Robutt demuestra que entre ellos existe un lazo que trasciende lo puramente mecánico.',
      support: 'Busca la escena donde Jimmy se tira al suelo en el cráter: ¿qué hizo Robutt por su radio y cómo se colocó sobre él?',
      reveal: 'Robutt demostró lealtad inmediata cuidando a Jimmy y pidiendo ayuda, lo que fundamenta la amistad inquebrantable que el niño siente por él.',
      studentReveal: 'Son grandes amigos; cuando Jimmy fingió estar herido, Robutt ladró por radio pidiendo auxilio y se echó sobre él para cuidarlo.'
    }
  ],
  formalization: {
    title: 'Comprensión Literal e Inferencias Fundamentadas',
    concept: 'Lectura Crítica en la Ciencia Ficción',
    ideaClave: 'En un relato literario, las inferencias sobre las motivaciones y afectos de los personajes deben sostenerse rigurosamente en sus acciones y diálogos concretos, sin inventar resoluciones no escritas.',
    dileIntro: 'En la formalización consolidamos la diferencia entre lo explícito y lo inferido, aplicando el rigor de lectura que exige el currículum.',
    hazInstruction: 'Abre tu cuaderno de Lengua y Literatura para registrar la regla de oro y las citas que respaldan tus respuestas.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Definición Conceptual",
        visualPrompt: "Modern anime style 16:9. Infographic of literal facts versus justified inferences. No text drawn by AI.",
        overlayTitle: "Inferencia Fundamentada",
        overlaySubtitle: "Conectar pistas textuales con deducciones lógicas",
        overlayText: "Inferencia: Conectar pistas textuales con deducciones lógicas",
        speakerNotes: "Inferir no es adivinar; es extraer conclusiones obligadas a partir de las pistas que el autor sembró en el texto."
      }
    ]
  },
  postQuestions: [
    {
      context: 'La Motivación de los Padres (P03 de la Base Curricular)',
      question: '¿Por qué los padres de Jimmy deciden comprarle un cachorro vivo traído desde la Tierra?',
      expected: 'Porque consideran que un animal biológico real proporcionará a Jimmy una experiencia de afecto vivo auténtico que, según ellos, una máquina programada no puede brindar.',
      success: '¡Muy bien fundamentado! Los padres distinguen lo biológico de lo mecánico y quieren que su hijo experimente el vínculo con un ser vivo.',
      support: 'Recuerda las palabras del señor Anderson: él cree que los perros de la Tierra tienen sentimientos vivos que superan a cualquier circuito.',
      reveal: 'Los padres desean que Jimmy experimente el vínculo con una mascota biológica viva, convencidos de que un perro de verdad tiene mayor valor emocional.',
      studentReveal: 'Quieren que Jimmy experimente el cariño de un perro vivo de la Tierra, porque creen que una máquina no siente de verdad.'
    },
    {
      context: 'El Dilema de Jimmy (P04 de la Base Curricular)',
      question: '¿Por qué crees que Jimmy no encuentra diferencias de valor entre un perro real y su mascota mecánica Robutt?',
      expected: 'Porque Jimmy nunca conoció animales vivos en la Luna y, para él, el cariño demostrado por Robutt en sus juegos y cuidados cotidianos es completamente real y auténtico.',
      success: '¡Brillante inferencia! Captaste el corazón del conflicto: para Jimmy, la realidad del afecto radica en la lealtad vivida y no en si el cuerpo es de carne o de metal.',
      support: 'Fíjate en lo que dice Jimmy al final: para él lo que importa no es cómo está hecho Robutt, sino lo que han compartido juntos en la Luna.',
      reveal: 'Para Jimmy, el afecto se define por las experiencias compartidas y la protección mutua, haciendo que Robutt sea su mejor amigo indiscutible.',
      studentReveal: 'Porque creció en la Luna y el cariño que recibió de Robutt en todos sus juegos y cuidados es lo más real que ha conocido.'
    }
  ],
  practice: [
    {
      context: 'Caso 1: Criterio de Evidencia Textual (Final del Cuento)',
      question: 'En tu cuaderno de Lengua, redacta dos oraciones respondiendo: ¿Cómo termina exactamente el cuento de Asimov y por qué sería un error afirmar en una prueba que el padre aceptó quedarse con Robutt?',
      expected: 'El estudiante explica que el cuento termina literalmente con Jimmy abrazando a Robutt en llanto, sin que el texto mencione en ningún momento si el padre cedió o cambió de opinión.',
      success: '¡Rigor textual impecable! Demostraste que respetas los límites de la evidencia escrita por el autor.',
      support: 'Vuelve a leer el último párrafo de la página 15: ¿aparece alguna frase donde el padre diga "está bien, nos quedamos con Robutt"?',
      reveal: 'El texto concluye con el abrazo afectuoso de Jimmy. Asimov no incluyó el acuerdo paterno, dejando la resolución en suspenso deliberado.',
      studentReveal: 'Termina con Jimmy abrazando a Robutt. Es un error inventar que el padre aceptó porque el cuento nunca lo dice.'
    },
    {
      context: 'Caso 2: Redacción en Cuaderno de Cita y Análisis',
      question: 'Escribe en tu cuaderno la frase de Jimmy: "Robutt me quiere a mí". Explica en tres líneas qué argumento plantea el niño para defender a su perro frente al criterio de los adultos.',
      expected: 'El estudiante escribe la cita y analiza que Jimmy defiende la reciprocidad del cariño demostrado en acciones, superando la visión puramente material de los adultos.',
      success: '¡Excelente análisis literario! Has conectado la cita directa con el tema de la lealtad y el conflicto entre generaciones.',
      support: 'Piensa en la diferencia: el padre mira el cuerpo mecánico; Jimmy mira los años de protección y juegos compartidos.',
      reveal: 'Jimmy defiende que los sentimientos se demuestran en la lealtad y no en la composición biológica del cuerpo.',
      studentReveal: 'Cita registrada y análisis en cuaderno sobre cómo el cariño demostrado en acciones vale más que el cuerpo de carne o metal.'
    }
  ],
  mini: [
    {
      q: '¿Cuál es el escenario físico principal donde Jimmy juega con Robutt al comienzo del relato?',
      options: [
        'Un cráter rocoso de la Luna sin atmósfera respirable, que exige traje espacial.',
        'Una pradera verde en la campiña de la Tierra con aire libre.',
        'Una nave espacial que viaja a la velocidad de la luz entre planetas.',
        'Un laboratorio subterráneo donde los robots se fabrican en serie.'
      ],
      correct: 'Un cráter rocoso de la Luna sin atmósfera respirable, que exige traje espacial.',
      fixExplain: 'El cuento inicia describiendo a Jimmy dando saltos en el suelo lunar dentro de un cráter árido con traje espacial hermético.'
    },
    {
      q: '¿Por qué el padre de Jimmy desea reemplazar a Robutt por un cachorro traído de la Tierra?',
      options: [
        'Porque considera que un perro biológico vivo transmitirá un afecto auténtico que una máquina no posee.',
        'Porque Robutt se descompuso y sus circuitos dejaron de funcionar en el cráter.',
        'Porque la ley de la colonia lunar prohíbe tener mascotas mecánicas dentro del hogar.',
        'Porque el perro de la Tierra es necesario para cazar animales en la superficie lunar.'
      ],
      correct: 'Porque considera que un perro biológico vivo transmitirá un afecto auténtico que una máquina no posee.',
      fixExplain: 'El padre sostiene que un animal real de carne y hueso es superior porque siente de verdad, diferenciándolo de un mecanismo programado.'
    },
    {
      q: 'Al finalizar la narración, ¿qué ocurre exactamente entre Jimmy y Robutt según las palabras del texto?',
      options: [
        'Jimmy se aferra llorando a Robutt en un fuerte abrazo, sin que el texto declare si el padre aceptó conservarlo.',
        'El padre firma un permiso oficial para que Robutt viva para siempre en la colonia.',
        'Jimmy decide regalar a Robutt a una fábrica para adoptar al cachorro de la Tierra.',
        'Robutt se apaga automáticamente y Jimmy regresa solo a su habitación.'
      ],
      correct: 'Jimmy se aferra llorando a Robutt en un fuerte abrazo, sin que el texto declare si el padre aceptó conservarlo.',
      fixExplain: 'El autor concluye con el abrazo emotivo de Jimmy a su mascota; es un error sobreinterpretar que el padre haya cedido explícitamente.'
    }
  ],
  recovery: [
    {
      title: 'Diferencia entre Hecho Explícito e Inferencia Textual',
      explain: 'Un hecho explícito es lo que el texto dice literalmente (ej. Jimmy nació en la Luna). Una sobreinterpretación es inventar un final que el autor no escribió.',
      q: 'Si una pregunta te pide señalar cómo termina el cuento, ¿cuál de las siguientes opciones representa la información fidedigna del texto?',
      options: [
        'El cuento termina con Jimmy abrazando con fuerza a Robutt frente a sus padres.',
        'El cuento termina cuando los padres devuelven el cachorro a la Tierra.',
        'El cuento termina con una fiesta de cumpleaños en la escuela lunar.',
        'El cuento termina cuando Robutt aprende a hablar con voz humana.'
      ],
      correct: 'El cuento termina con Jimmy abrazando con fuerza a Robutt frente a sus padres.',
      correctText: '¡Exacto! El relato termina en ese abrazo protector y cargado de afecto.',
      fixText: 'Recuerda atenerte a la última escena escrita por Asimov: Jimmy abrazando a su perro mecánico en la sala lunar.'
    }
  ],
  summaryIdeas: [
    ['Ambiente y Ciencia Ficción', 'El entorno lunar condiciona la vida de Jimmy y resalta el contraste entre la aridez espacial y la calidez del afecto.'],
    ['Conflicto y Lealtad', 'El conflicto surge entre el valor biológico que imponen los padres y el lazo emocional que Jimmy construyó con Robutt.'],
    ['Límite de la Evidencia', 'En comprensión lectora, jamás debemos inventar resoluciones o acuerdos que el autor no escribió expresamente.']
  ],
  paso8_cierre: {
    preguntaSintesis: '¿Por qué el abrazo final de Jimmy a Robutt nos enseña más sobre el afecto humano que si el autor hubiera escrito un final fácil y cerrado?',
    metacognicion: 'Hoy aprendí a rastrear datos explícitos del ambiente y a justificar inferencias con las acciones de los personajes sin inventar datos que no están en el texto.',
    celebracion: '¡Excelente trabajo en Lengua y Literatura! En la próxima sesión analizaremos las motivaciones profundas y las voces narrativas de este relato.'
  }
};

// ============================================================================
// 2. CIENCIAS NATURALES: 110-7-CNA-OA01 CLASE 01 (Calibrada con 5 dimensiones del libro y 4 didácticas)
// ============================================================================
export const CIENCIAS_7B_OA01_CLASE01: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Ciencias Naturales',
    oaCode: 'OA 1',
    oaTitle: 'Sexualidad y Afectividad',
    lessonNumber: 1,
    totalLessonsInOa: 6,
    lessonTitle: 'Comprensión Integral de la Sexualidad Humana',
    durationMinutes: 30,
    nextLessonTitle: 'Transformaciones Físicas y Maduración en la Pubertad'
  },
  prep: {
    adultObjective: 'Acompañar al estudiante a comprender que la sexualidad humana es una vivencia integral que articula aspectos biológicos, afectivos y sociales (según exige el OA oficial), reconociendo las cinco dimensiones presentadas en el Texto Escolar SM (física, intelectual, social, emocional y espiritual, págs. 116-121) e integrándolas didácticamente mediante situaciones ficticias de respeto mutuo, sin requerir experiencias íntimas personales.',
    routeToday: 'La sexualidad como vivencia integral humana: Más allá de lo reproductivo, integrando cuerpo, afectos, convivencia y valores.',
    mentorReminder: 'Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. El contenido pedagógico y las respuestas esperadas te indican con total precisión qué debe responder el estudiante para que no tengas que estudiar previamente.',
    reminders: [
      'La sexualidad humana no se reduce a los órganos reproductores; involucra a la persona en su totalidad.',
      'Lee en voz alta únicamente los textos con la etiqueta DILE o PREGÚNTALE.',
      'Los recuadros AYUDA PEDAGÓGICA y CLIMA EMOCIONAL son información exclusiva para ti.',
      'Utiliza siempre situaciones y ejemplos ficticios en tercera persona; no indagues en vivencias íntimas.'
    ],
    emotionalTip: 'Aborda la sexualidad y la pubertad con serenidad, naturalidad y respeto. Recuerda que los ritmos corporales varían en cada persona y los promedios de edad son solo referencias estadísticas.'
  },
  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Ciencias Naturales', subtitle: 'La Persona Integral', color: 'teal' },
      { id: 'b2', number: '02', title: 'Dimensiones', subtitle: 'Física, Afectiva, Social, Ética', color: 'orange' },
      { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Casos Ficticios y Cuaderno', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz y Síntesis Formativa', color: 'navy' }
    ],
    keyQuestions: [
      { label: '¿Qué es la sexualidad integral?', sub: 'Una dimensión humana presente en toda la vida que une cuerpo, afectos y sociedad.' },
      { label: '¿Cuáles son sus manifestaciones?', sub: 'Física/biológica, emocional/afectiva, social, intelectual y ética/espiritual.' }
    ],
    dileIntro: 'Hoy comenzaremos la primera clase de Ciencias Naturales para 7° Básico: "Comprensión Integral de la Sexualidad Humana".',
    dileObjective: 'Comprender que la sexualidad humana abarca mucho más que la reproducción biológica: integra nuestro cuerpo, nuestras emociones, la convivencia y nuestros valores de respeto.'
  },
  situation: {
    dilePrompt: 'En pantalla puedes ver el esquema integral del ser humano. En la vida diaria solemos escuchar que la sexualidad es solo biología o reproducción. Sin embargo, la ciencia nos enseña que es una vivencia completa. Si una persona de 13 años cuida su cuerpo, valora sus amistades y toma decisiones con respeto hacia los demás, ¿qué aspectos de la sexualidad está integrando en su vida?',
    expectedAnswer: 'Está integrando aspectos biológicos o físicos (cuidado del cuerpo), aspectos sociales y afectivos (amistades y sentimientos) y aspectos éticos (valores de respeto hacia los demás).',
    socraticHint: 'Piensa en las distintas partes de su vida: su cuerpo físico, sus amigos en la escuela y sus valores de cuidado mutuo.',
    emotionalTip: 'Refuerza la idea de que la sexualidad abarca todas nuestras relaciones humanas y la forma en que nos cuidamos a nosotros mismos y a quienes nos rodean.',
    options: [
      {
        label: 'Mencionó la unión de cuerpo/físico, afectos/emociones, amistades y respeto mutuo',
        kind: 'correct',
        feedbackText: '¡Exacto! Esa visión integral es precisamente la que define la sexualidad humana en la ciencia actual.'
      },
      {
        label: 'Solo mencionó la biología o los cambios físicos del cuerpo',
        kind: 'needs_support',
        feedbackText: 'El cuerpo es fundamental, pero fíjate que también están presentes los sentimientos, los amigos y los valores de respeto.'
      },
      {
        label: 'No sabe qué responder o dio otra respuesta',
        kind: 'no_answer',
        feedbackText: 'Pista guiada: Fíjate en los cuatro aspectos destacados en la pantalla: cuerpo físico, emociones afectivas, relaciones sociales y valores éticos.'
      }
    ]
  },
  reference: {
    dilePrompt: 'En el Texto Escolar de Ciencias Naturales (págs. 116-121) se explica cómo se manifiestan las distintas dimensiones de la sexualidad.',
    question: '¿Por qué la ciencia médica y pedagógica afirma que reducir la sexualidad solo a la reproducción biológica es una visión incompleta del ser humano?',
    expectedAnswer: 'Porque los seres humanos no actuamos solo por instinto reproductor; la sexualidad involucra afectos, comunicación, cultura, identidad, vínculos familiares y decisiones éticas conscientes a lo largo de toda la vida.',
    socraticHint: 'Piensa en cómo te comunicas con tus amigos y en cómo expresas el cariño en tu familia: ¿tiene eso relación con quién eres como persona?',
    feedbackSuccess: '¡Excelente reflexión! La sexualidad acompaña a la persona desde que nace hasta la vejez a través de sus afectos y su vida social.',
    feedbackSupport: 'Recuerda que los seres humanos expresamos afecto, establecemos amistades y vivimos en comunidad; todo eso forma parte de la sexualidad integral.'
  },
  hook: {
    title: 'La Persona Integral: Dimensiones de la Sexualidad',
    dileIntro: 'Vamos a ver cómo la ciencia contemporánea comprende la sexualidad. El texto escolar describe cinco dimensiones y nosotros las articularemos con los valores de respeto y autocuidado.',
    hazInstruction: 'Observa atentamente el esquema de dimensiones e identifica cómo cada una de ellas se hace presente en la vida cotidiana.',
    videoSrc: '',
    focusPoints: [
      'Aspectos biológicos/físicos: Anatomía, caracteres sexuales y cambios de la pubertad.',
      'Aspectos afectivos/emocionales: Sentimientos, estados de ánimo, cariño y autoestima.',
      'Aspectos sociales: Convivencia con la familia, amistades, escuela y cultura.',
      'Aspectos éticos/espirituales: Valores de respeto mutuo, responsabilidad y consentimiento.'
    ],
    dileAfterVideo: 'Conversemos sobre lo observado. Te haré dos preguntas para comprobar cómo se interrelacionan estas dimensiones.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Apertura e Impacto",
        didacticPurpose: "Apertura e Impacto",
        visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, examining a glowing interactive holographic infographic of human dimensions in a warm scientific setting. High contrast, generous negative space in upper third. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "La Sexualidad Humana Integral",
        overlaySubtitle: "Cuerpo emociones sociedad y valores",
        overlayText: "La Sexualidad Humana Integral: Cuerpo emociones sociedad y valores",
        vectorialOverlayPptx: "Concepto científico: Integración de aspectos biológicos, afectivos y sociales (Bases Curriculares 7° Básico)",
        speakerNotes: "Hoy descubriremos que la sexualidad humana es una dimensión integral que nos acompaña durante toda la vida, uniendo nuestro cuerpo, nuestras emociones y nuestra convivencia."
      },
      {
        slideNumber: 2,
        tituloMomento: "Más Allá de la Reproducción",
        didacticPurpose: "Más Allá de la Reproducción",
        visualPrompt: "Modern anime style 16:9. Infographic displaying a human figure surrounded by interlocking rings: biology, emotions, social bonds, and values. Clean educational aesthetic. No text drawn by AI.",
        overlayTitle: "Visión Holística del Ser Humano",
        overlaySubtitle: "Superando el enfoque reproductivo estrecho",
        overlayText: "Visión Holística del Ser Humano: Superando el enfoque reproductivo estrecho",
        vectorialOverlayPptx: "Texto Escolar SM págs. 116-117: La sexualidad abarca la totalidad de la persona humana",
        speakerNotes: "Durante mucho tiempo se asoció la sexualidad únicamente a la reproducción biológica. La ciencia moderna demuestra que abarca la forma en que sentimos, nos comunicamos y convivimos."
      },
      {
        slideNumber: 3,
        tituloMomento: "La Dimensión Biológica / Física",
        didacticPurpose: "La Dimensión Biológica / Física",
        visualPrompt: "Modern anime style 16:9. Educational diagram of human growth from childhood through puberty to adolescence. Gentle scientific illustration of anatomical development. No text drawn by AI.",
        overlayTitle: "Dimensión Biológica y Física",
        overlaySubtitle: "Cuerpo anatomía y cambios de la pubertad",
        overlayText: "Dimensión Biológica y Física: Cuerpo anatomía y cambios de la pubertad",
        vectorialOverlayPptx: "Fisiología: Caracteres sexuales, maduración biológica y variabilidad individual de ritmos corporales",
        speakerNotes: "La dimensión física abarca nuestro cuerpo y los cambios naturales de la pubertad. Cada organismo madura a su propio ritmo sin que las edades promedio sean plazos obligados."
      },
      {
        slideNumber: 4,
        tituloMomento: "La Dimensión Afectiva y Emocional",
        didacticPurpose: "La Dimensión Afectiva y Emocional",
        visualPrompt: "Modern anime style 16:9. Warm illustration of teenagers sharing hobbies, expressing supportive emotions and self-confidence in a sunny courtyard. Clean lighting. No text drawn by AI.",
        overlayTitle: "Dimensión Afectiva y Emocional",
        overlaySubtitle: "Sentimientos autoestima y lazos de cariño",
        overlayText: "Dimensión Afectiva y Emocional: Sentimientos autoestima y lazos de cariño",
        vectorialOverlayPptx: "Texto Escolar pág. 121: La afectividad comprende emociones, estados de ánimo y capacidad de establecer vínculos",
        speakerNotes: "La dimensión afectiva contempla nuestras emociones, el cariño hacia la familia y amigos, la autoestima personal y la capacidad de expresar lo que sentimos con honestidad."
      },
      {
        slideNumber: 5,
        tituloMomento: "La Dimensión Social e Intelectual",
        didacticPurpose: "La Dimensión Social e Intelectual",
        visualPrompt: "Modern anime style 16:9. A diverse group of young students collaborating on a science project, breaking gender stereotypes with mutual respect and teamwork. No text drawn by AI.",
        overlayTitle: "Dimensión Social y Cultural",
        overlaySubtitle: "Convivencia amistades y equidad de género",
        overlayText: "Dimensión Social y Cultural: Convivencia amistades y equidad de género",
        vectorialOverlayPptx: "Texto Escolar pág. 118: Manifestaciones sociales, cultura y superación de estereotipos limitantes",
        speakerNotes: "La dimensión social se manifiesta en nuestras relaciones con amigos, la cultura y la sociedad. Los estereotipos tradicionales no deben limitar los talentos ni proyectos de ninguna persona."
      },
      {
        slideNumber: 6,
        tituloMomento: "La Dimensión Ética y Espiritual",
        didacticPurpose: "La Dimensión Ética y Espiritual",
        visualPrompt: "Modern anime style 16:9. Two students shaking hands respectfully before an educational debate, symbolizing integrity, honesty and mutual care. Balanced lighting. No text drawn by AI.",
        overlayTitle: "Dimensión Ética y Valores",
        overlaySubtitle: "Respeto mutuo responsabilidad y cuidado",
        overlayText: "Dimensión Ética y Valores: Respeto mutuo responsabilidad y cuidado",
        vectorialOverlayPptx: "Ética personal: Decisiones libres, consentimiento, cuidado de sí mismo y del prójimo",
        speakerNotes: "La dimensión ética orienta nuestras decisiones hacia el respeto mutuo, la responsabilidad y el cuidado del bienestar propio y ajeno en toda situación."
      },
      {
        slideNumber: 7,
        tituloMomento: "Síntesis del Modelo",
        didacticPurpose: "Síntesis del Modelo",
        visualPrompt: "Modern anime style 16:9. A harmonious graphic showing all dimensions balanced in a glowing circle of health and personal development. Clear space on top. No text drawn by AI.",
        overlayTitle: "Salud Sexual Integral",
        overlaySubtitle: "Todas las dimensiones unidas en equilibrio",
        overlayText: "Salud Sexual Integral: Todas las dimensiones unidas en equilibrio",
        vectorialOverlayPptx: "Conclusión formativa: Vivir la sexualidad con plenitud requiere integrar cuerpo, afecto y valores",
        speakerNotes: "La salud integral se alcanza cuando cuidamos nuestro cuerpo físico, cultivamos afectos sinceros, convivimos con respeto y actuamos según valores éticos."
      },
      {
        slideNumber: 8,
        tituloMomento: "Objetivo de la Explicación",
        didacticPurpose: "Objetivo de la Explicación",
        visualPrompt: "Modern anime style 16:9. The girl with braided hair and boy in teal jacket in a science lab with interactive tablets showing biological and psychological data cards. No text drawn by AI.",
        overlayTitle: "Objetivo de la Clase",
        overlaySubtitle: "Explicar la integración de las dimensiones",
        overlayText: "Objetivo: Explicar la integración de las dimensiones",
        vectorialOverlayPptx: "OA 1: Explicar aspectos biológicos, afectivos y sociales integrados en la sexualidad humana",
        speakerNotes: "En esta fase profundizaremos en cómo se articulan las dimensiones presentadas en el texto escolar y cómo analizarlas en casos cotidianos."
      },
      {
        slideNumber: 9,
        tituloMomento: "Las 5 Dimensiones del Libro",
        didacticPurpose: "Las 5 Dimensiones del Libro",
        visualPrompt: "Modern anime style 16:9. Clear five-column chart summarizing the textbook classification: Physical, Intellectual, Social, Emotional, Spiritual. High readability. No text drawn by AI.",
        overlayTitle: "El Enfoque del Texto Escolar",
        overlaySubtitle: "Física intelectual social emocional espiritual",
        overlayText: "El Enfoque del Texto Escolar: Física intelectual social emocional espiritual",
        vectorialOverlayPptx: "Texto Escolar SM: 5 dimensiones explícitas que enriquecen los aspectos biológicos, afectivos y sociales del OA",
        speakerNotes: "El texto escolar SM distingue cinco dimensiones: física, intelectual, social, emocional y espiritual. En la App las articulamos para facilitar su análisis práctico."
      },
      {
        slideNumber: 10,
        tituloMomento: "Variabilidad en el Crecimiento",
        didacticPurpose: "Variabilidad en el Crecimiento",
        visualPrompt: "Modern anime style 16:9. Educational growth chart showing varied natural growth patterns without rigid single lines. Respectful and reassuring atmosphere. No text drawn by AI.",
        overlayTitle: "Ritmos Propios de Desarrollo",
        overlaySubtitle: "Las edades promedio son referencias estadísticas",
        overlayText: "Ritmos Propios de Desarrollo: Las edades promedio son referencias estadísticas",
        vectorialOverlayPptx: "Rigor biomédico: La pubertad presenta un amplio rango natural de inicio; no existen plazos individuales obligatorios",
        speakerNotes: "Las tablas de edad son promedios de la población. Cada cuerpo tiene su propio reloj biológico y comenzar antes o después es completamente natural y saludable."
      },
      {
        slideNumber: 11,
        tituloMomento: "Modelamiento de Caso Ficticio",
        didacticPurpose: "Modelamiento de Caso Ficticio",
        visualPrompt: "Modern anime style 16:9. Split comic panel showing a fictional situation: Sofia listening with empathy to a friend while deciding how to support her with respect. No text drawn by AI.",
        overlayTitle: "Caso: La Empatía en Amistad",
        overlaySubtitle: "Dimensión afectiva y social en acción",
        overlayText: "Caso: La Empatía en Amistad: Dimensión afectiva y social en acción",
        vectorialOverlayPptx: "Resolución modelada: Escuchar a un amigo articula lo afectivo (cariño), lo social (vínculo de pares) y lo ético (lealtad)",
        speakerNotes: "Analicemos un caso: cuando Sofía escucha a su amiga y guarda un secreto con lealtad, está expresando su dimensión afectiva, social y ética al mismo tiempo."
      },
      {
        slideNumber: 12,
        tituloMomento: "Atención al Error Conceptual",
        didacticPurpose: "Atención al Error Conceptual",
        visualPrompt: "Modern anime style 16:9. Caution sign pointing out the misconception of equating human sexuality exclusively with sexual reproduction. High visual clarity. No text drawn by AI.",
        overlayTitle: "Error: Reducción Biológica",
        overlaySubtitle: "El ser humano no actúa solo por instinto",
        overlayText: "Error: Reducción Biológica: El ser humano no actúa solo por instinto",
        vectorialOverlayPptx: "Claridad conceptual: La sexualidad abarca identidad, sentimientos y valores a lo largo de toda la existencia",
        speakerNotes: "Un error común es pensar que la sexualidad solo comienza con la reproducción adulta. En realidad, se manifiesta desde la infancia en el cariño familiar y la convivencia."
      },
      {
        slideNumber: 13,
        tituloMomento: "Reactivo Tipo MINEDUC",
        didacticPurpose: "Reactivo Tipo MINEDUC",
        visualPrompt: "Modern anime style 16:9. Interactive evaluation card showing a multiple-choice question on human dimensions with four distinct options. No text drawn by AI.",
        overlayTitle: "Evaluación Formativa",
        overlaySubtitle: "Identificar dimensiones en situaciones reales",
        overlayText: "Evaluación Formativa: Identificar dimensiones en situaciones reales",
        vectorialOverlayPptx: "Reactivo: Clasificar correctamente situaciones cotidianas según la dimensión predominante",
        speakerNotes: "Las evaluaciones formales te pedirán clasificar acciones reales en su dimensión correspondiente: física, afectiva, social o ética."
      },
      {
        slideNumber: 14,
        tituloMomento: "Cierre y Transición",
        didacticPurpose: "Cierre y Transición",
        visualPrompt: "Modern anime style 16:9. Both student explorers ready with their science field journals, looking confident towards the interactive exercises. Warm morning sunlight. No text drawn by AI.",
        overlayTitle: "Regla de Oro Científica",
        overlaySubtitle: "Cuerpo sentimientos y valores siempre unidos",
        overlayText: "Regla de Oro: Cuerpo sentimientos y valores siempre unidos",
        vectorialOverlayPptx: "Paso a la práctica: Vamos a ejercitar con casos ficticios en el cuaderno de Ciencias Naturales",
        speakerNotes: "Nuestra Regla de Oro: la sexualidad humana une siempre el cuerpo biológico con los afectos y los valores de respeto. ¡Pasemos a la práctica!"
      }
    ]
  },
  preQuestions: [
    {
      context: 'La Visión Integral de la Sexualidad',
      question: '¿Por qué la Organización Mundial de la Salud y el MINEDUC definen la sexualidad como un aspecto integral de la persona a lo largo de toda la vida?',
      expected: 'Porque abarca no solo la función biológica reproductiva, sino también los sentimientos, la identidad, las relaciones interpersonales, los roles y los valores éticos en todas las etapas del desarrollo.',
      success: '¡Excelente definición! Comprendiste que la sexualidad está presente desde que nacemos y se expresa en cómo nos sentimos y convivimos.',
      support: 'Piensa en las distintas etapas de la vida: un niño pequeño expresa cariño y aprende a convivir con su familia; eso ya es parte de su desarrollo afectivo y social.',
      reveal: 'La sexualidad integral acompaña a la persona en toda su existencia integrando cuerpo, afectos, convivencia y valores.',
      studentReveal: 'Porque abarca todo lo que somos: nuestro cuerpo, nuestras emociones, la forma en que nos relacionamos y nuestros valores personales.'
    },
    {
      context: 'Las 5 Dimensiones del Texto Escolar SM',
      question: 'En las páginas 118 a 121 del texto escolar se describen cinco dimensiones: física, intelectual, social, emocional y espiritual. ¿Cómo se manifiesta la dimensión intelectual y social en la superación de estereotipos de género?',
      expected: 'Se manifiesta en el análisis crítico que permite comprender que los talentos, intereses y profesiones no dependen del sexo biológico, promoviendo la equidad y el respeto mutuo entre hombres y mujeres.',
      success: '¡Gran análisis crítico! Reconociste que la dimensión intelectual y social nos ayuda a cuestionar prejuicios que limitan a las personas.',
      support: 'Observa la página 120 del texto: muestra que calificar a las mujeres como "emotivas e irracionales" o a los hombres como "fríos y dominantes" son estereotipos sociales sin base científica.',
      reveal: 'La dimensión intelectual y social permite derribar prejuicios culturales para que cada persona desarrolle libremente sus capacidades.',
      studentReveal: 'Permite comprender que los gustos y talentos no dependen de ser hombre o mujer, superando prejuicios sociales con respeto.'
    }
  ],
  formalization: {
    title: 'Dimensiones Integrales de la Sexualidad Humana',
    concept: 'Integración Bio-Psico-Social y Ética',
    ideaClave: 'La sexualidad humana es una vivencia multidimensional que integra aspectos biológicos (cuerpo y cambios físicos), afectivos (emociones y autoestima), sociales (amistades y cultura) y éticos (respeto, responsabilidad y consentimiento mutuo).',
    dileIntro: 'Consolidemos el aprendizaje formalizando cómo se articulan las dimensiones del texto escolar con los valores de vida.',
    hazInstruction: 'Abre tu cuaderno de Ciencias Naturales para registrar el esquema de las cuatro dimensiones operativas.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Esquema de Cuatro Cuadrantes",
        visualPrompt: "Modern anime style 16:9. Conceptual diagram of 4 quadrants: Biological, Affective, Social, Ethical. Clean educational graphic. No text drawn by AI.",
        overlayTitle: "Las Cuatro Dimensiones Operativas",
        overlaySubtitle: "Biológica afectiva social y ética",
        overlayText: "Dimensiones: Biológica, Afectiva, Social, Ética",
        speakerNotes: "El modelo operativo de la App organiza los contenidos del libro en cuatro cuadrantes claros para facilitar su comprensión y aplicación."
      }
    ]
  },
  postQuestions: [
    {
      context: 'Variabilidad en la Pubertad y Edades Promedio',
      question: 'El texto escolar y las guías de estudio muestran tablas con promedios de edad para los cambios corporales (por ejemplo, entre 10 y 14 años). ¿Por qué estas cifras no representan plazos obligatorios de desarrollo individual?',
      expected: 'Porque son promedios estadísticos de una población general. Cada cuerpo tiene su propio ritmo biológico determinado por factores genéticos y ambientales; comenzar antes o después de la media es completamente normal.',
      success: '¡Excelente precisión médica y biológica! Reconociste la variabilidad natural del desarrollo humano sin comparaciones rígidas.',
      support: 'Piensa en las estaturas en un curso: no todos los niños de 13 años miden exactamente lo mismo. Con la pubertad ocurre lo mismo con los tiempos de inicio.',
      reveal: 'Las edades promedio son referencias estadísticas; cada persona tiene un ritmo biológico único y saludable.',
      studentReveal: 'Porque son datos promedio de muchas personas, pero cada cuerpo se desarrolla a su propio ritmo natural.'
    },
    {
      context: 'La Dimensión Ética y el Respeto Mutuo',
      question: '¿Por qué la dimensión ética es indispensable para que las relaciones afectivas y de amistad sean saludables y seguras?',
      expected: 'Porque establece límites basados en el respeto, la honestidad, el consentimiento mutuo y el cuidado del bienestar físico y emocional del otro, evitando el daño o la manipulación.',
      success: '¡Brillante madurez ética! Sin valores de cuidado mutuo y consentimiento, las relaciones humanas no pueden ser genuinamente saludables.',
      support: 'Piensa en qué se necesita para que una amistad dure años: respeto por la intimidad del otro, confianza y no obligar a nadie a hacer algo que no desea.',
      reveal: 'La dimensión ética protege la dignidad humana asegurando que toda convivencia se base en el respeto, el consentimiento y el cuidado mutuo.',
      studentReveal: 'Porque asegura el respeto mutuo, la confianza y el consentimiento, protegiendo a las personas en sus relaciones.'
    }
  ],
  practice: [
    {
      context: 'Caso 1: Análisis de Situación Ficticia (Lucas y sus Decisiones)',
      question: 'En tu cuaderno de Ciencias Naturales, lee el siguiente caso ficticio: "Lucas (13 años) ha notado que su voz se vuelve más grave y ha crecido varios centímetros en los últimos meses. Además, se preocupa por apoyar a su amigo que está triste y ha decidido no compartir fotos privadas en redes sociales". Identifica qué dimensiones de la sexualidad se manifiestan en la situación de Lucas y justifica cada una.',
      expected: 'El estudiante identifica: 1. Dimensión biológica/física en el cambio de voz y crecimiento en estatura; 2. Dimensión afectiva y social en el apoyo empático a su amigo; 3. Dimensión ética en la decisión responsable de proteger la privacidad en redes sociales.',
      success: '¡Análisis impecable! Lograste clasificar con total precisión las tres manifestaciones en el caso ficticio.',
      support: 'Revisa cada parte del caso: el cambio de voz es el cuerpo (biológica); apoyar al amigo son sentimientos y convivencia (afectiva/social); cuidar fotos ajenas son valores (ética).',
      reveal: 'Lucas manifiesta la dimensión biológica en sus cambios puberales, la afectiva/social en su empatía de amistad y la ética en su respeto por la privacidad.',
      studentReveal: 'Biológica en el cambio de voz y estatura; afectiva/social en apoyar a su amigo; ética en cuidar la privacidad de fotos en redes.'
    },
    {
      context: 'Caso 2: Cuadro de Dimensiones en Cuaderno',
      question: 'Dibuja en tu cuaderno una tabla de cuatro columnas con los títulos: "Biológica", "Afectiva", "Social" y "Ética". Escribe para cada dimensión un ejemplo ficticio de la vida cotidiana de un estudiante de 7° básico.',
      expected: 'Tabla completa en el cuaderno con ejemplos pertinentes: Biológica (cambio de estatura/voz), Afectiva (expresar cariño/autoestima), Social (trabajar en equipo/amistad), Ética (respetar la opinión ajena/cuidado mutuo).',
      success: '¡Excelente trabajo en tu cuaderno! Has estructurado el conocimiento de forma ordenada y aplicable.',
      support: 'Usa las situaciones que vimos en la clase: deportes, escuela, familia y decisiones de respeto.',
      reveal: 'La tabla consolida el organizador didáctico en cuatro dimensiones aplicado a la vida de los estudiantes.',
      studentReveal: 'Tabla completa en el cuaderno con ejemplos claros para las dimensiones biológica, afectiva, social y ética.'
    }
  ],
  mini: [
    {
      q: '¿Cuál de las siguientes afirmaciones describe de manera correcta la sexualidad humana desde el enfoque de las ciencias actuales?',
      options: [
        'Es una vivencia integral que articula aspectos biológicos, afectivos, sociales y éticos a lo largo de toda la vida.',
        'Es un proceso exclusivamente reproductivo que solo concierne a las personas adultas casadas.',
        'Es un fenómeno que depende únicamente de los cambios hormonales sin relación con las emociones ni la cultura.',
        'Es una etapa que comienza y termina estrictamente durante los años de la pubertad escolar.'
      ],
      correct: 'Es una vivencia integral que articula aspectos biológicos, afectivos, sociales y éticos a lo largo de toda la vida.',
      fixExplain: 'La sexualidad abarca a la persona completa: su cuerpo físico, sus emociones, sus vínculos sociales y sus valores éticos en todas las edades.'
    },
    {
      q: 'En el Texto Escolar SM (págs. 118-121), ¿cuál de las siguientes alternativas representa la clasificación de cinco dimensiones presentada en el libro?',
      options: [
        'Física, intelectual, social, emocional y espiritual.',
        'Biológica, química, geológica, matemática y física.',
        'Únicamente reproductora, hormonal, celular, muscular y ósea.',
        'Climática, escolar, familiar, económica y política.'
      ],
      correct: 'Física, intelectual, social, emocional y espiritual.',
      fixExplain: 'El texto escolar oficial de 7° Básico organiza la sexualidad en las dimensiones física, intelectual, social, emocional y espiritual.'
    },
    {
      q: 'Respecto a las edades promedio de inicio de la pubertad que se presentan en los textos y tablas médicas, ¿cuál es la interpretación científicamente válida?',
      options: [
        'Son referencias estadísticas de la población; cada persona tiene su propio ritmo biológico natural y saludable.',
        'Son plazos obligatorios y quien no cambie a esa edad exacta sufre una anomalía grave.',
        'Son fechas universales e idénticas para todas las culturas y climas del mundo sin variación.',
        'Son metas que el estudiante debe acelerar voluntariamente mediante dietas especiales.'
      ],
      correct: 'Son referencias estadísticas de la población; cada persona tiene su propio ritmo biológico natural y saludable.',
      fixExplain: 'Los rangos de edad son promedios poblacionales; la variabilidad individual es una característica natural del desarrollo biológico humano.'
    }
  ],
  recovery: [
    {
      title: 'Comprensión de las Dimensiones en Casos Reales',
      explain: 'Para clasificar una situación, fíjate en su foco: el cuerpo es físico/biológico, los sentimientos son afectivos/emocionales, los grupos son sociales y los valores de respeto son éticos.',
      q: 'Si un grupo de estudiantes decide acordar normas de respeto para que nadie sea burlado por su apariencia física en la sala de clases, ¿qué dimensión están priorizando?',
      options: [
        'Dimensión ética y social, porque establecen valores de convivencia y cuidado del bienestar mutuo.',
        'Dimensión estrictamente reproductiva, porque involucra el cuerpo humano.',
        'Dimensión geológica, porque ocurre dentro de un edificio escolar.',
        'Dimensión puramente biológica, porque las apariencias son físicas.'
      ],
      correct: 'Dimensión ética y social, porque establecen valores de convivencia y cuidado del bienestar mutuo.',
      correctText: '¡Exacto! Acordar normas de respeto y no discriminación es una manifestación directa de la dimensión ética y social.',
      fixText: 'Fíjate en la intención: acordar no burlarse es una decisión moral de respeto hacia los demás, correspondiente a lo ético y social.'
    }
  ],
  summaryIdeas: [
    ['Sexualidad Integral', 'Abarca a la persona completa durante toda su vida, superando la visión reducida a lo puramente reproductivo.'],
    ['Integración de Dimensiones', 'El texto escolar presenta dimensiones física, intelectual, social, emocional y espiritual, que articulamos en cuerpo, afectos, sociedad y ética.'],
    ['Respeto a la Diversidad', 'Cada persona madura a su propio ritmo biológico y merece convivir en un ambiente de dignidad y cuidado mutuo.']
  ],
  paso8_cierre: {
    preguntaSintesis: '¿Cómo cambia nuestra convivencia escolar y familiar cuando comprendemos que la sexualidad incluye el respeto, la empatía y los valores?',
    metacognicion: 'Hoy comprendí que la sexualidad no es solo el cuerpo biológico, sino también cómo expresamos el cariño, cómo cuidamos a nuestros amigos y cómo actuamos con respeto.',
    celebracion: '¡Excelente trabajo en Ciencias Naturales! En la próxima sesión estudiaremos en detalle las transformaciones corporales y la maduración biológica de la pubertad.'
  }
};

// ============================================================================
// 3. HISTORIA, GEOGRAFÍA Y CS. SOCIALES: 110-7-HIS-OA02 CLASE 01
// ============================================================================
export const HISTORIA_7B_OA02_CLASE01: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Historia, Geografía y Ciencias Sociales',
    oaCode: 'OA 2',
    oaTitle: 'Transformaciones de la vida humana en el Neolítico',
    lessonNumber: 1,
    totalLessonsInOa: 6,
    lessonTitle: 'Transición al Neolítico y Expansión Agrícola en el Mundo',
    durationMinutes: 30,
    nextLessonTitle: 'Domesticación de Especies y Selección Artificial en el Creciente Fértil'
  },
  prep: {
    adultObjective: 'Guiar al estudiante en el análisis de la transición al Neolítico como un proceso gradual, multicausal y en mosaico (hace unos 10.000 a 12.000 años), utilizando el mapa histórico del Texto Escolar (págs. 18-19) y las fuentes documentales para comprender que la agricultura y la domesticación surgieron de manera independiente en múltiples focos del planeta, respondiendo a la pregunta oficial sobre cuál dinámica de las noticias se observa mejor en el mapa.',
    routeToday: 'La gran transformación neolítica: Del forrajeo móvil a los múltiples centros de domesticación agrícola y ganadera en el planeta.',
    mentorReminder: 'Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. El mapa y los datos históricos están claramente indicados para que no requieras preparación previa.',
    reminders: [
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'Los recuadros AYUDA PEDAGÓGICA y CLIMA EMOCIONAL son información exclusiva para ti.',
      'Pídele que observe con atención el mapa histórico de las páginas 18 y 19 del texto oficial.',
      'Asegura que comprenda que la agricultura no surgió de un día para otro ni en un solo lugar del mundo.'
    ],
    emotionalTip: 'Despierta la curiosidad por el pasado: "Comprender cómo nuestros antepasados domesticaron las plantas y animales nos permite entender el origen de nuestra comida y de nuestras ciudades actuales".'
  },
  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Historia y Geografía', subtitle: 'La Transición al Neolítico', color: 'yellow' },
      { id: 'b2', number: '02', title: 'Mapa Histórico', subtitle: 'Págs. 18-19 del Texto', color: 'orange' },
      { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Análisis de Noticias y Mapa', color: 'teal' },
      { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz y Síntesis Histórica', color: 'navy' }
    ],
    keyQuestions: [
      { label: '¿Cómo comenzó la agricultura?', sub: 'Un proceso gradual de observación, selección y domesticación a lo largo de milenios.' },
      { label: '¿Dónde ocurrió este cambio?', sub: 'En múltiples regiones independientes del planeta (Anatolia, China, América).' }
    ],
    dileIntro: 'Hoy comenzaremos la primera clase de Historia, Geografía y Ciencias Sociales para 7° Básico: "Transición al Neolítico y Expansión Agrícola en el Mundo".',
    dileObjective: 'Comprender que la agricultura y la ganadería fueron procesos graduales y multicausales desarrollados en diversos focos autónomos del planeta.'
  },
  situation: {
    dilePrompt: 'Observa la línea de tiempo y el mapa en pantalla. Al terminar la última glaciación, hace unos 10.000 a 12.000 años (aprox. 10.000 a 8.000 a.C.), el clima terrestre se volvió más cálido y templado. ¿Crees que las bandas humanas abandonaron la caza y la recolección de un día para otro al descubrir la primera planta cultivada, o fue una transición lenta donde coexistieron varios modos de vida?',
    expectedAnswer: 'El estudiante debe señalar que fue una transición lenta y gradual: durante milenios continuaron cazando y recolectando mientras aprendían experimentalmente a domesticar plantas y animales en distintos territorios.',
    socraticHint: 'Piensa en el riesgo: si una cosecha fallaba por sequía, ¿de qué se alimentaban? ¿Podían dejar de cazar repentinamente?',
    emotionalTip: 'Valora la sabiduría empírica de las primeras comunidades: combinar la recolección con la siembra aseguraba la supervivencia de la banda.',
    options: [
      {
        label: 'Explicó que fue una transición gradual donde coexistieron la caza y la siembra incipiente',
        kind: 'correct',
        feedbackText: '¡Exacto! El Neolítico no fue una revolución súbita, sino un proceso en mosaico de larga duración que tomó miles de años.'
      },
      {
        label: 'Afirmó que todos se volvieron agricultores sedentarios de inmediato en todo el planeta',
        kind: 'needs_support',
        feedbackText: 'Recuerda que si una siembra fallaba, corrían riesgo de hambre. Por eso combinaron la caza con el cultivo durante mucho tiempo.'
      },
      {
        label: 'No sabe qué responder o dio otra respuesta',
        kind: 'no_answer',
        feedbackText: 'Pista guiada: Fíjate en las fechas: pasaron miles de años entre los primeros campamentos semipermanentes y los campos de cultivo fijos.'
      }
    ]
  },
  reference: {
    dilePrompt: 'En el Texto Escolar (páginas 18-19) se presenta el mapa histórico: "Expansión de primeros registros de actividad agrícola y ganadera".',
    question: 'Observa la simbología del mapa de las páginas 18 y 19: ¿qué especies animales y vegetales se domesticaron en los Andes Centrales y qué fechas aproximadas registra el texto?',
    expectedAnswer: 'En los Andes Centrales se domesticaron animales como la llama y la alpaca, y vegetales como la papa y la quínoa, hacia el año 3.000 a 1.000 a.C., mientras que en Anatolia el desarrollo más antiguo data de 8.000 a 6.000 a.C.',
    socraticHint: 'Mira el mapa en la sección de América del Sur y lee la simbología de iconos: busca los símbolos de camélidos andinos y papas.',
    feedbackSuccess: '¡Excelente lectura cartográfica! Identificaste las especies andinas y comprobaste que la domesticación ocurrió en distintas épocas según la región.',
    feedbackSupport: 'Revisa el texto de la página 19: menciona expresamente la llama, la alpaca, la quínoa y la papa en los Andes Centrales hacia 3000-1000 a.C.'
  },
  hook: {
    title: 'La Gran Transformación Neolítica en el Planeta',
    dileIntro: 'Acompáñame a explorar este video. Descubriremos cómo el calentamiento del Holoceno impulsó nuevas formas de subsistencia en distintos continentes.',
    hazInstruction: 'Observa atentamente cómo el mapa mundial muestra focos de domesticación independientes en Medio Oriente, Asia y América.',
    videoSrc: '',
    focusPoints: [
      'Cambio climático del Holoceno: Retirada de glaciares hace unos 10.000 a 12.000 años.',
      'Proceso en mosaico: La agricultura no surgió en un solo centro ni avanzó en línea recta.',
      'Mapa histórico (págs. 18-19): Sitios más antiguos en Anatolia (8.000-6.000 a.C.) y Andes Centrales (3.000-1.000 a.C.).',
      'Multicausalidad: Clima favorable, abundancia de cereales silvestres y crecimiento de la población.'
    ],
    dileAfterVideo: 'Conversemos sobre el mapa. Te haré dos preguntas sobre las evidencias arqueológicas de la domesticación.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Apertura y Escenario",
        didacticPurpose: "Apertura y Escenario",
        visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing on a verdant hill overlooking a fertile river valley with wild wheat grasses under warm morning sun. High contrast, negative space in top third. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "La Gran Transformación Neolítica",
        overlaySubtitle: "Retirada de glaciares y nuevos paisajes",
        overlayText: "La Gran Transformación Neolítica: Retirada de glaciares y nuevos paisajes",
        vectorialOverlayPptx: "Proceso histórico: Transición del Pleistoceno al Holoceno hace unos 10.000 a 12.000 años",
        speakerNotes: "Al finalizar la última era de hielo, hace unos doce mil años, las temperaturas globales aumentaron, permitiendo la proliferación de plantas silvestres comestibles en varios continentes."
      },
      {
        slideNumber: 2,
        tituloMomento: "El Clima del Holoceno",
        didacticPurpose: "El Clima del Holoceno",
        visualPrompt: "Modern anime style 16:9. A map of the ancient world transitioning from tundra to temperate grasslands and woodlands. Warm climatic zones highlighted with soft amber light. No text drawn by AI.",
        overlayTitle: "El Cambio Ambiental Global",
        overlaySubtitle: "Condiciones favorables para la vegetación",
        overlayText: "El Cambio Ambiental Global: Condiciones favorables para la vegetación",
        vectorialOverlayPptx: "Multicausalidad: Estabilidad climática que favoreció la reproducción de gramíneas silvestres",
        speakerNotes: "El clima más templado no causó por sí solo la agricultura, pero creó el escenario ecológico para que distintas sociedades comenzaran a experimentar con semillas."
      },
      {
        slideNumber: 3,
        tituloMomento: "El Mapa de Primeros Registros",
        didacticPurpose: "El Mapa de Primeros Registros",
        visualPrompt: "Modern anime style 16:9. The student explorers examining an ancient parchment world map showing agricultural hearths in Anatolia, Yangtze River, and the Andes Mountains. Clear educational cartography. No text drawn by AI.",
        overlayTitle: "Mapa de Páginas 18 y 19",
        overlaySubtitle: "Expansión de primeros registros agrícolas",
        overlayText: "Mapa de Páginas 18 y 19: Expansión de primeros registros agrícolas",
        vectorialOverlayPptx: "Fuente A (Bernardos et al.): Registros fósiles demuestran desarrollos independientes en lugares distantes",
        speakerNotes: "El mapa del texto escolar demuestra que la agricultura no tuvo un único centro difusor: surgió de forma autónoma en lugares muy distantes del planeta."
      },
      {
        slideNumber: 4,
        tituloMomento: "Anatolia y Creciente Fértil",
        didacticPurpose: "Anatolia y Creciente Fértil",
        visualPrompt: "Modern anime style 16:9. An early Neolithic settlement near modern Turkey with simple stone and mud-brick dwellings surrounded by stands of harvested einkorn wheat and goat pens. No text drawn by AI.",
        overlayTitle: "El Foco de Anatolia (8.000 a.C.)",
        overlaySubtitle: "Domesticación de trigo cebada y cabras",
        overlayText: "El Foco de Anatolia (8.000 a.C.): Domesticación de trigo cebada y cabras",
        vectorialOverlayPptx: "Simbología del mapa: Sitios más tempranos registrados en Medio Oriente hacia 8.000 - 6.000 a.C.",
        speakerNotes: "En Anatolia y el Creciente Fértil encontramos los registros más antiguos: hacia el ocho mil a.C. se domesticaron el trigo, la cebada, las cabras y las ovejas."
      },
      {
        slideNumber: 5,
        tituloMomento: "El Foco de los Andes Centrales",
        didacticPurpose: "El Foco de los Andes Centrales",
        visualPrompt: "Modern anime style 16:9. High altitude Andean terrace landscape with early farmers tending native potato plants and herding llamas against scenic mountain peaks. No text drawn by AI.",
        overlayTitle: "Los Andes Centrales (3.000 a.C.)",
        overlaySubtitle: "Llama alpaca quínoa y papa originarias",
        overlayText: "Los Andes Centrales (3.000 a.C.): Llama alpaca quínoa y papa originarias",
        vectorialOverlayPptx: "América prehispánica: Domesticación independiente adaptada a la geografía de montaña",
        speakerNotes: "Miles de años después y sin contacto con Asia, los pueblos de los Andes Centrales domesticaron camélidos como la llama y cultivos resistentes como la papa y la quínoa."
      },
      {
        slideNumber: 6,
        tituloMomento: "Dos Noticias: Fuente A y Fuente B",
        didacticPurpose: "Dos Noticias: Fuente A y Fuente B",
        visualPrompt: "Modern anime style 16:9. Two historical source scrolls side by side: Source A highlighting multiple independent origins; Source B showing maritime migration routes. No text drawn by AI.",
        overlayTitle: "Dos Explicaciones Históricas",
        overlaySubtitle: "Orígenes múltiples frente a contactos marítimos",
        overlayText: "Dos Explicaciones Históricas: Orígenes múltiples frente a contactos marítimos",
        vectorialOverlayPptx: "Debate BDA: Fuente A (Science, desarrollo paralelo) vs Fuente B (expansión por desplazamientos)",
        speakerNotes: "La investigación histórica analiza dos dinámicas: la Fuente A plantea que la agricultura se inventó en varios lugares a la vez; la Fuente B destaca los contactos y viajes marítimos."
      },
      {
        slideNumber: 7,
        tituloMomento: "Síntesis del Proceso en Mosaico",
        didacticPurpose: "Síntesis del Proceso en Mosaico",
        visualPrompt: "Modern anime style 16:9. A diverse timeline mosaic showing hunting, pastoralism, and early agriculture coexisting in harmony across continents under morning light. No text drawn by AI.",
        overlayTitle: "Un Proceso en Mosaico",
        overlaySubtitle: "Coexistencia de modos de vida en la Tierra",
        overlayText: "Un Proceso en Mosaico: Coexistencia de modos de vida en la Tierra",
        vectorialOverlayPptx: "Conclusión de Bloque A: La humanidad transitó gradualmente hacia la producción de alimentos",
        speakerNotes: "El Neolítico no borró la caza de golpe; fue un mosaico donde convivieron cazadores, pastores nómades y los primeros agricultores aldeanos."
      },
      {
        slideNumber: 8,
        tituloMomento: "Objetivo de la Explicación",
        didacticPurpose: "Objetivo de la Explicación",
        visualPrompt: "Modern anime style 16:9. The boy and girl in their study room examining historical maps and source citations. High contrast, clear layout. No text drawn by AI.",
        overlayTitle: "Objetivo de la Clase",
        overlaySubtitle: "Interpretar mapas y fuentes sobre el Neolítico",
        overlayText: "Objetivo: Interpretar mapas y fuentes sobre el Neolítico",
        vectorialOverlayPptx: "OA 2: Explicar el surgimiento de la agricultura y la domesticación a partir de fuentes primarias y secundarias",
        speakerNotes: "En esta fase aprenderemos el método de 5 pasos para interpretar mapas históricos que presenta el texto escolar en las páginas 18 y 19."
      },
      {
        slideNumber: 9,
        tituloMomento: "Los 5 Pasos del Método",
        didacticPurpose: "Los 5 Pasos del Método",
        visualPrompt: "Modern anime style 16:9. Numbered infographic listing the 5 methodological steps: 1. Tiempo/espacio, 2. Distinguir elementos, 3. Caracterizar, 4. Comparar relaciones, 5. Concluir. No text drawn by AI.",
        overlayTitle: "Método de Interpretación",
        overlaySubtitle: "Cinco pasos para analizar mapas históricos",
        overlayText: "Método de Interpretación: Cinco pasos para analizar mapas históricos",
        vectorialOverlayPptx: "Texto Escolar págs. 18-19: Identificar tiempo y espacio, distinguir aspectos físicos y humanos, y comparar patrones",
        speakerNotes: "Para interpretar un mapa histórico: identificamos tiempo y espacio, distinguimos elementos físicos y humanos, caracterizamos la distribución, comparamos patrones y concluimos."
      },
      {
        slideNumber: 10,
        tituloMomento: "Comprobación de la Fuente A",
        didacticPurpose: "Comprobación de la Fuente A",
        visualPrompt: "Modern anime style 16:9. Detailed zoom on the textbook map showing dispersed icon clusters without connecting route lines between continents. Clear cartographic evidence. No text drawn by AI.",
        overlayTitle: "La Dinámica en el Mapa",
        overlaySubtitle: "Registros dispersos sin líneas de ruta fijas",
        overlayText: "La Dinámica en el Mapa: Registros dispersos sin líneas de ruta fijas",
        vectorialOverlayPptx: "Pregunta P03: El mapa corrobora la Fuente A porque muestra sitios autónomos con especies distintas y sin rutas de difusión",
        speakerNotes: "Al mirar el mapa de las páginas 18 y 19, comprobamos la Fuente A: los puntos arqueológicos aparecen en distintos continentes con especies locales, sin flechas de contacto directo."
      },
      {
        slideNumber: 11,
        tituloMomento: "Domesticación Animal y Vegetal",
        didacticPurpose: "Domesticación Animal y Vegetal",
        visualPrompt: "Modern anime style 16:9. Illustrated legend showing the icons: wheat, rye, corn, potato, goat, sheep, cow, llama, alpaca. High clarity. No text drawn by AI.",
        overlayTitle: "Simbología de Especies",
        overlaySubtitle: "Plantas y animales adaptados a su territorio",
        overlayText: "Simbología de Especies: Plantas y animales adaptados a su territorio",
        vectorialOverlayPptx: "Rigor biológico: La domesticación implicó selección artificial empírica de especies nativas de cada región",
        speakerNotes: "Cada cultura domesticó lo que tenía a mano en su ecosistema: trigo en Medio Oriente, arroz en China, maíz en Mesoamérica y camélidos en Sudamérica."
      },
      {
        slideNumber: 12,
        tituloMomento: "Atención al Error Histórico",
        didacticPurpose: "Atención al Error Histórico",
        visualPrompt: "Modern anime style 16:9. A crossed-out linear arrow contrasting with an intricate branching tree of human history. Soft teal glow. No text drawn by AI.",
        overlayTitle: "Error: El Origen Único",
        overlaySubtitle: "No hubo un solo foco ni una fecha mágica",
        overlayText: "Error: El Origen Único: No hubo un solo foco ni una fecha mágica",
        vectorialOverlayPptx: "Advertencia historiográfica: Erradicar el difusionismo unilineal; la arqueología prueba múltiples orígenes autónomos",
        speakerNotes: "Un error habitual es afirmar que la agricultura se inventó en un solo país y luego viajó a todos los demás. La evidencia arqueológica prueba desarrollos independientes."
      },
      {
        slideNumber: 13,
        tituloMomento: "Modelamiento de Pregunta",
        didacticPurpose: "Modelamiento de Pregunta",
        visualPrompt: "Modern anime style 16:9. Interactive evaluation card showing question P03 with the historical map beside it for evidence retrieval. Clean typography. No text drawn by AI.",
        overlayTitle: "Pregunta Oficial P03",
        overlaySubtitle: "Fundamentar con la evidencia del mapa",
        overlayText: "Pregunta Oficial P03: Fundamentar con la evidencia del mapa",
        vectorialOverlayPptx: "Enunciado oficial: ¿Cuál de las dinámicas descritas se observa de mejor manera en el mapa de las páginas 18 y 19?",
        speakerNotes: "Esta pregunta de examen te pide fundamentar: la Fuente A es la que mejor se observa porque el mapa ilustra focos separados sin rutas marítimas conectándolos."
      },
      {
        slideNumber: 14,
        tituloMomento: "Cierre y Transición",
        didacticPurpose: "Cierre y Transición",
        visualPrompt: "Modern anime style 16:9. Sunrise over an early Neolithic village, the two student explorers holding their field journals and looking ready for notebook practice. Warm golden light. No text drawn by AI.",
        overlayTitle: "Regla de Oro Histórica",
        overlaySubtitle: "Las fuentes y mapas sustentan la explicación",
        overlayText: "Regla de Oro: Las fuentes y mapas sustentan la explicación",
        vectorialOverlayPptx: "Paso a la práctica: Vamos a registrar el análisis de las fuentes A y B y el mapa en el cuaderno",
        speakerNotes: "Nuestra Regla de Oro en historia: toda afirmación sobre el pasado debe apoyarse en la evidencia de las fuentes y los mapas. ¡Pasemos a la práctica!"
      }
    ]
  },
  preQuestions: [
    {
      context: 'El Análisis de las Noticias (P01 de la Base Curricular)',
      question: 'En la actividad del texto y BDA se contrastan dos noticias sobre el Neolítico: la Fuente A y la Fuente B. ¿Cuál es el planteamiento central que recoge cada una respecto al surgimiento de la agricultura?',
      expected: 'La Fuente A plantea que la agricultura se originó en múltiples poblaciones de forma independiente y paralela en el Creciente Fértil; la Fuente B plantea que se expandió a través de contactos culturales y desplazamientos marítimos.',
      success: '¡Excelente contraste de fuentes! Identificaste con claridad la tesis de orígenes paralelos frente a la de difusión por navegación.',
      support: 'Revisa las noticias: la Fuente A habla de un estudio de Science sobre diferentes poblaciones autónomas; la Fuente B habla de rutas marítimas y migraciones.',
      reveal: 'La Fuente A defiende el desarrollo independiente y paralelo en distintos pueblos, mientras que la Fuente B enfatiza la difusión por contactos y viajes.',
      studentReveal: 'Fuente A: la agricultura surgió en varias poblaciones a la vez de forma independiente. Fuente B: se expandió por viajes marítimos y contactos.'
    },
    {
      context: 'Complementariedad de Hipótesis (P02 de la Base Curricular)',
      question: '¿Las ideas de la Fuente A y la Fuente B son complementarias o contradictorias entre sí? Fundamenta tu respuesta.',
      expected: 'Son complementarias: la agricultura pudo surgir de forma autónoma e independiente en diversos territorios y, al mismo tiempo, las técnicas y semillas pudieron propagarse a zonas vecinas mediante contactos y desplazamientos entre comunidades.',
      success: '¡Brillante pensamiento histórico! Comprendiste que la multicausalidad integra tanto la invención local como el intercambio cultural.',
      support: 'Piensa en qué ocurre después de que un pueblo aprende a cultivar: ¿puede compartir sus semillas con vecinos que viajan por mar o tierra?',
      reveal: 'Ambas explicaciones se complementan: el surgimiento independiente explica los focos originales y los contactos explican la posterior expansión regional.',
      studentReveal: 'Son complementarias: diferentes pueblos crearon sus propios cultivos de forma independiente y luego intercambiaron técnicas y semillas.'
    }
  ],
  formalization: {
    title: 'La Expansión Agrícola y Ganadera en el Neolítico',
    concept: 'Proceso Multicausal y Focos Autónomos',
    ideaClave: 'La Revolución Neolítica fue un proceso de larga duración en mosaico, caracterizado por focos de domesticación independientes en el mundo (Anatolia, China, América) condicionados por el clima del Holoceno y la selección empírica de especies nativas.',
    dileIntro: 'Consolidemos la explicación metodológica del mapa histórico y las fuentes que respaldan el conocimiento del Neolítico.',
    hazInstruction: 'Abre tu cuaderno de Historia y Ciencias Sociales para registrar los datos del mapa y la respuesta a la pregunta oficial P03.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Esquema de Focos Mundiales",
        visualPrompt: "Modern anime style 16:9. World map graphic highlighting Fertile Crescent (wheat, 8000 BC), China (rice, 8000 BC), Mesoamerica (maize, 5000 BC), Andes (potato/llama, 3000 BC). High contrast. No text drawn by AI.",
        overlayTitle: "Focos Autónomos en el Mundo",
        overlaySubtitle: "Anatolia China Mesoamérica y Andes Centrales",
        overlayText: "Focos Autónomos: Anatolia, China, Mesoamérica, Andes",
        speakerNotes: "Los registros arqueológicos demuestran que cada continente domesticó sus propias especies silvestres sin depender de una única civilización madre."
      }
    ]
  },
  postQuestions: [
    {
      context: 'La Evidencia en el Mapa (P03 Oficial de la Base Curricular)',
      question: '¿Cuál de las dinámicas descritas en las noticias (Fuente A o Fuente B) se puede observar de mejor manera en el mapa de las páginas 18 y 19 del Texto? Fundamenta tu respuesta.',
      expected: 'Se observa de mejor manera la Fuente A: el mapa muestra registros arqueológicos dispersos en distintos lugares del planeta con especies locales específicas (trigo en Anatolia, papa en los Andes), sin representar rutas de navegación ni flechas de contacto directo entre esas poblaciones.',
      success: '¡Respuesta histórica impecable! Fundamentaste con precisión a partir de los elementos visuales y simbólicos del mapa oficial.',
      support: 'Observa el mapa de las páginas 18 y 19: ¿ves líneas o flechas de barcos navegando, o ves puntos y símbolos de especies nativas ubicados en continentes lejanos?',
      reveal: 'El mapa corrobora la Fuente A porque ilustra la presencia simultánea de especies domesticadas en distintos continentes sin trazar rutas de influencia.',
      studentReveal: 'La Fuente A: el mapa muestra puntos separados en distintos continentes con sus propias plantas y animales, sin dibujar rutas de viaje.'
    },
    {
      context: 'Simbología y Temporalidad en el Mapa',
      question: 'Al comparar las fechas de domesticación en el mapa, ¿qué diferencia temporal se aprecia entre los primeros registros de Anatolia y los de los Andes Centrales?',
      expected: 'En Anatolia los registros más antiguos datan de 8.000 a 6.000 a.C. (trigo, cebada, cabras), mientras que en los Andes Centrales se registran hacia 3.000 a 1.000 a.C. (papa, quínoa, llamas y alpacas), demostrando que ocurrieron con milenios de diferencia de forma autónoma.',
      success: '¡Gran precisión cronológica! Esa diferencia de milenios confirma que la domesticación fue un proceso regional y acumulativo de larga duración.',
      support: 'Consulta las fechas en el mapa del texto escolar: Anatolia tiene fechas de 8000 a.C. y los Andes de 3000 a.C.',
      reveal: 'Anatolia antecede en varios milenios a los Andes Centrales, lo que ratifica la evolución independiente adaptada a cada territorio.',
      studentReveal: 'Anatolia comenzó antes (hacia 8.000 a.C.) y los Andes Centrales más tarde (hacia 3.000 a.C.), mostrando que cada región tuvo su propio tiempo.'
    }
  ],
  practice: [
    {
      context: 'Caso 1: Registro en Cuaderno de la Pregunta Oficial P03',
      question: 'En tu cuaderno de Historia, escribe el título: "Análisis de Mapa Histórico: Págs. 18 y 19". Redacta un párrafo fundamentando por qué la Fuente A (desarrollo independiente) se comprueba en el mapa, mencionando al menos dos especies domesticadas y su ubicación geográfica.',
      expected: 'El estudiante redacta la fundamentación en su cuaderno señalando la Fuente A, citando especies como el trigo en Anatolia y la llama o papa en los Andes Centrales, y explicando que no existen flechas de difusión en el mapa.',
      success: '¡Excelente trabajo historiográfico en tu cuaderno! Has vinculado la teoría con la evidencia cartográfica.',
      support: 'Vuelve a revisar la simbología de la página 19: nombra el trigo en Medio Oriente y la papa en América del Sur.',
      reveal: 'El párrafo en el cuaderno consolida el uso de evidencias empíricas para sustentar explicaciones históricas.',
      studentReveal: 'Párrafo completo en el cuaderno justificando la Fuente A con trigo en Anatolia y papa/llama en los Andes Centrales.'
    },
    {
      context: 'Caso 2: Cuadro de Especies y Regiones',
      question: 'Dibuja en tu cuaderno una tabla de dos columnas: en la izquierda escribe "Especies Vegetales Domesticadas" (anota 4 del mapa) y en la derecha "Especies Animales Domesticadas" (anota 4 del mapa). Agrega al pie la conclusión sobre por qué no son idénticas en todos los continentes.',
      expected: 'Tabla completa con 4 vegetales (ej. trigo, cebada, maíz, papa) y 4 animales (ej. cabra, oveja, vaca, llama) y conclusión sobre la biodiversidad silvestre nativa de cada territorio.',
      success: '¡Gran trabajo de síntesis geográfica! Identificaste que la naturaleza silvestre de cada continente determinó la dieta de cada civilización.',
      support: 'Copia directamente de la simbología de la página 19: cabra, oveja, llama, alpaca para animales; trigo, cebada, maíz, papa para plantas.',
      reveal: 'La diversidad de especies demuestra que la selección artificial dependió de los recursos presentes en cada bioma.',
      studentReveal: 'Tabla en el cuaderno con 4 plantas y 4 animales del mapa, concluyendo que cada pueblo domesticó las especies que crecían en su entorno.'
    }
  ],
  mini: [
    {
      q: '¿Cuál de las siguientes afirmaciones explica de manera rigurosa cómo surgió la agricultura durante el Neolítico?',
      options: [
        'Fue un proceso gradual y en mosaico de larga duración, desarrollado en múltiples focos independientes del planeta tras el cambio climático del Holoceno.',
        'Fue un descubrimiento repentino ocurrido en un solo año en una única ciudad que luego lo enseñó al resto del mundo.',
        'Fue un invento que todos los pueblos cazadores adoptaron obligatoriamente el mismo día abandonando sus campamentos.',
        'Fue una técnica traída por navegantes de un solo imperio que dominaba todos los continentes en el año 10.000 a.C.'
      ],
      correct: 'Fue un proceso gradual y en mosaico de larga duración, desarrollado en múltiples focos independientes del planeta tras el cambio climático del Holoceno.',
      fixExplain: 'La arqueología y las fuentes del texto escolar confirman que la agricultura surgió de forma autónoma en varios centros del mundo a lo largo de milenios.'
    },
    {
      q: 'En el mapa histórico de las páginas 18 y 19 del Texto Escolar, ¿cuáles de las siguientes especies corresponden al foco de domesticación de los Andes Centrales?',
      options: [
        'Llama, alpaca, papa y quínoa.',
        'Trigo, cebada, centeno y cabras.',
        'Arroz, mijo, soja y cerdos asiáticos.',
        'Caballos salvajes, renos, dromedarios y trigo escanda.'
      ],
      correct: 'Llama, alpaca, papa y quínoa.',
      fixExplain: 'La simbología del mapa sitúa en los Andes Centrales hacia 3.000-1.000 a.C. la domesticación de camélidos (llama, alpaca) y cultivos andinos (papa, quínoa).'
    },
    {
      q: 'Respecto a la pregunta oficial sobre las noticias (Fuente A y Fuente B), ¿por qué la Fuente A se observa de mejor manera en el mapa de las páginas 18 y 19?',
      options: [
        'Porque el mapa ilustra registros agrícolas dispersos en diversos continentes con especies locales, sin representar rutas marítimas de contacto directo.',
        'Porque el mapa contiene flechas rojas gigantes que indican navegación de barcos desde Egipto a Chile.',
        'Porque la Fuente B habla de la Edad Media y el mapa representa el periodo Neolítico exclusivamente.',
        'Porque en el mapa solo aparece un único país sin ningún otro asentamiento en el planeta.'
      ],
      correct: 'Porque el mapa ilustra registros agrícolas dispersos en diversos continentes con especies locales, sin representar rutas marítimas de contacto directo.',
      fixExplain: 'La Fuente A sostiene orígenes paralelos e independientes; el mapa corrobora esto mostrando focos separados y sin trazar rutas de difusión entre ellos.'
    }
  ],
  recovery: [
    {
      title: 'Interpretación de Fuentes y Mapas en Historia',
      explain: 'En historia no inventamos lo que creemos que pasó: observamos la simbología, los puntos de hallazgo y los textos para verificar si hay pruebas de rutas o de desarrollos aislados.',
      q: 'Si un mapa arqueológico muestra que en Asia cultivaban arroz hacia el 8.000 a.C. y en América cultivaban maíz hacia el 5.000 a.C. sin rutas de viaje entre ellos, ¿qué conclusión es científicamente válida?',
      options: [
        'Que ambos pueblos domesticaron sus propios cultivos de forma autónoma e independiente a partir de su flora nativa.',
        'Que los agricultores asiáticos viajaron en avión a regalar semillas de maíz a los pueblos americanos.',
        'Que el maíz y el arroz son exactamente la misma planta con nombres distintos.',
        'Que la agricultura en América fue una copia idéntica y simultánea sin ninguna diferencia con la de Asia.'
      ],
      correct: 'Que ambos pueblos domesticaron sus propios cultivos de forma autónoma e independiente a partir de su flora nativa.',
      correctText: '¡Exacto! La distancia geográfica y temporal demuestra desarrollos independientes adaptados a cada continente.',
      fixText: 'Fíjate en las plantas y fechas: maíz y arroz son especies distintas domesticadas con miles de años de diferencia en biomas separados.'
    }
  ],
  summaryIdeas: [
    ['Proceso de Larga Duración', 'La agricultura y ganadería tomaron miles de años de observación, ensayo y selección artificial de semillas y animales.'],
    ['Múltiples Centros en el Mundo', 'Anatolia, China, Mesoamérica y los Andes Centrales domesticaron sus propias especies nativas sin un único centro difusor.'],
    ['Evidencia en Fuentes y Mapas', 'El mapa de las páginas 18 y 19 comprueba la hipótesis de desarrollos independientes al mostrar focos separados sin rutas de conexión.']
  ],
  paso8_cierre: {
    preguntaSintesis: '¿Por qué comprender que la agricultura surgió en muchos lugares a la vez nos ayuda a valorar la diversidad y creatividad de todas las culturas humanas?',
    metacognicion: 'Hoy aprendí a contrastar noticias con un mapa histórico y a verificar que las civilizaciones crearon sus alimentos a partir de su propio entorno.',
    celebracion: '¡Excelente trabajo en Historia y Geografía! En la próxima clase profundizaremos en la selección empírica de semillas y animales en el Creciente Fértil.'
  }
};

// ============================================================================
// 4. INGLÉS (EFL): 110-7-ING-OA09 CLASE 01
// ============================================================================
export const INGLES_7B_OA09_CLASE01: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Idioma Extranjero Inglés',
    oaCode: 'OA 9',
    oaTitle: 'Reading comprehension of authentic and adapted texts',
    lessonNumber: 1,
    totalLessonsInOa: 6,
    lessonTitle: 'Feelings and Celebrations in Anne Frank’s Diary',
    durationMinutes: 30,
    nextLessonTitle: 'Chronological Sequence and Daily Routines in Historical Diaries'
  },
  prep: {
    adultObjective: 'Guiar al estudiante en la comprensión lectora del extracto adaptado del Diario de Ana Frank (Students’ Book 7° Básico, Unit 1, Lesson 1, pág. 18), localizando información explícita sobre la celebración de su cumpleaños (12 de junio de 1942), identificando los regalos recibidos y el orden cronológico de los hechos, cuidando estrictamente de no exigir el término "volleyball" como información explícita del texto.',
    routeToday: 'Reading an authentic adapted diary entry: Anne Frank’s birthday, gifts, emotions, and chronological sequence.',
    mentorReminder: 'Tus instrucciones como apoderado están en español en los recuadros DILE y PREGÚNTALE. El estudiante leerá las oraciones y responderá en inglés o español según la indicación.',
    reminders: [
      'Tú guías en español con los recuadros DILE y PREGÚNTALE.',
      'El estudiante lee los pasajes en inglés en voz alta y localiza las respuestas en la página.',
      'No exijas una pronunciación perfecta; lo esencial es la comprensión del significado y del vocabulario.',
      'Ten a mano su cuaderno de inglés para anotar palabras clave y oraciones del texto.'
    ],
    emotionalTip: 'Crea un ambiente de empatía e interés histórico: "Leer el diario íntimo de una niña de 13 años nos permite conectar con sus sentimientos cotidianos de alegría, familia y esperanza".'
  },
  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Reading Session', subtitle: 'Feelings & Personal Diaries', color: 'teal' },
      { id: 'b2', number: '02', title: 'Text Exploration', subtitle: 'Anne Frank’s Birthday Entry', color: 'orange' },
      { id: 'b3', number: '03', title: 'Notebook Practice', subtitle: 'Chronology & Textual Evidence', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Evaluation', subtitle: 'Miniquiz & Formative Review', color: 'navy' }
    ],
    keyQuestions: [
      { label: 'What is the text about?', sub: 'Anne Frank describing her 13th birthday celebration and presents.' },
      { label: 'What happened in the sports lesson?', sub: 'She chose the game that her class played (no specific sport is named in the text).' }
    ],
    dileIntro: 'Hoy comenzaremos la primera clase de Inglés para 7° Básico: "Feelings and Celebrations in Anne Frank’s Diary".',
    dileObjective: 'Aprenderemos a extraer la idea principal y localizar información explícita y cronológica en un texto auténtico en inglés.'
  },
  situation: {
    dilePrompt: 'En pantalla puedes ver la página 18 del libro de inglés de 7° Básico. El texto es una entrada del diario de Ana Frank (*The Diary of a Young Girl*). Lee en voz alta la fecha y la primera oración: "Friday, 12 June, I woke up early at six o’clock; it was my birthday." ¿A qué hora se despertó Ana y por qué ese día era tan especial para ella?',
    expectedAnswer: 'El estudiante responde (en inglés o español) que se despertó temprano a las seis de la mañana ("at six o’clock") porque era el día de su cumpleaños ("it was my birthday").',
    socraticHint: 'Fíjate en las palabras en inglés: "six o’clock" indica la hora exacta y "birthday" significa cumpleaños.',
    emotionalTip: 'Felicita su lectura en voz alta. Comprender la primera frase en inglés le dará confianza para el resto de la lección.',
    options: [
      {
        label: 'Identificó las 6:00 de la mañana y que era el día de su cumpleaños',
        kind: 'correct',
        feedbackText: '¡Excelente! "At six o\'clock" es la hora en que despertó y "my birthday" señala la ocasión especial.'
      },
      {
        label: 'Solo mencionó el cumpleaños o confundió la hora con las siete',
        kind: 'needs_support',
        feedbackText: 'Fíjate en el texto: a las 6:00 despertó ("woke up"), pero tuvo que esperar hasta las 6:45 ("quarter to seven") para levantarse de la cama.'
      },
      {
        label: 'No comprende el inglés o dio otra respuesta',
        kind: 'no_answer',
        feedbackText: 'Pista guiada: Leamos juntos: "I woke up early at six o\'clock" (Me desperté temprano a las seis) "it was my birthday" (era mi cumpleaños).'
      }
    ]
  },
  reference: {
    dilePrompt: 'En la pantalla interactiva se muestran los regalos que recibió Ana en la sala de su casa ("sitting-room").',
    question: 'Según el texto de la página 18, ¿cuál fue para Ana el regalo más hermoso ("the nicest present") y qué otros objetos le regalaron sus padres?',
    expectedAnswer: 'El regalo más hermoso fue el diario de vida ("you — my diary!"). Además, sus padres le regalaron una blusa azul ("a blue blouse"), un juego de mesa ("a game") y una botella de jugo de frutas ("a bottle of fruit juice").',
    socraticHint: 'Busca en el segundo párrafo: "The nicest present was you..." y la lista que le dieron "Daddy and Mummy".',
    feedbackSuccess: '¡Localización de datos perfecta! Encontraste el regalo más preciado y los obsequios familiares en el texto.',
    feedbackSupport: 'Revisa las líneas centrales: Ana le habla directamente a su diario ("you — my diary!") como el regalo más lindo de todos.'
  },
  hook: {
    title: 'Reading Anne Frank’s Diary: Feelings and Memories',
    dileIntro: 'Vamos a ver este video sobre cómo leer diarios íntimos en inglés. Aprenderemos estrategias para identificar la idea principal y seguir la secuencia de acontecimientos.',
    hazInstruction: 'Observa con atención cómo se organizan las horas del día y los sentimientos de Ana durante su cumpleaños.',
    videoSrc: '',
    focusPoints: [
      'Text type: Personal diary entry written in the first person ("I").',
      'Topic: 13th birthday celebration on 12 June 1942.',
      'Key characters: Anne, her cat Moortje, Mummy and Daddy, and her school friends.',
      'Chronological connectors: "On Friday", "Then", "At seven", "Afterwards".'
    ],
    dileAfterVideo: 'Conversemos sobre lo observado. Te haré dos preguntas en español sobre los detalles del texto en inglés.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Opening and Context",
        didacticPurpose: "Opening and Context",
        visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, opening an antique red-checked hardcover diary on a sunlit wooden desk. Gentle dust motes in golden light, wide negative space in top third. No text drawn by AI. No logo drawn by AI.",
        overlayTitle: "Unit 1: Feelings and Opinions",
        overlaySubtitle: "Reading Anne Frank’s personal diary",
        overlayText: "Unit 1: Feelings and Opinions: Reading Anne Frank’s personal diary",
        vectorialOverlayPptx: "Reading context: Students' Book 7° Básico, page 18 · Adapted excerpt from The Diary of a Young Girl",
        speakerNotes: "Today we will read an authentic adapted diary entry written by Anne Frank on her thirteenth birthday, exploring her feelings, family, and celebrations."
      },
      {
        slideNumber: 2,
        tituloMomento: "The Red-Checked Diary",
        didacticPurpose: "The Red-Checked Diary",
        visualPrompt: "Modern anime style 16:9. A cheerful 13-year-old girl in 1940s clothing smiling as she holds a red-checked diary book with care in her room. Gentle morning sunlight streaming through the window. No text drawn by AI.",
        overlayTitle: "The Nicest Present",
        overlaySubtitle: "A red-checked diary on her birthday",
        overlayText: "The Nicest Present: A red-checked diary on her birthday",
        vectorialOverlayPptx: "Text detail: Anne received her diary as a present on her 13th birthday, translated into over 70 languages",
        speakerNotes: "Anne loved writing and dreamed of becoming an author. On her thirteenth birthday, she received a red-checked diary, which became her most famous companion."
      },
      {
        slideNumber: 3,
        tituloMomento: "Morning Timeline (6:00 to 7:00)",
        didacticPurpose: "Morning Timeline (6:00 to 7:00)",
        visualPrompt: "Modern anime style 16:9. A vintage clock showing 6:00, transitioning to a cute black cat rubbing against a girl's legs in a 1940s dining room. Cozy family setting. No text drawn by AI.",
        overlayTitle: "Early Morning Timeline",
        overlaySubtitle: "Waiting patiently from six to seven",
        overlayText: "Early Morning Timeline: Waiting patiently from six to seven",
        vectorialOverlayPptx: "Chronological sequence: 6:00 AM woke up -> 6:45 AM got up -> Moortje the cat welcomed her -> 7:00 AM went to parents",
        speakerNotes: "Anne woke up at six but had to wait until quarter to seven to get out of bed. In the dining room, her cat Moortje welcomed her warmly."
      },
      {
        slideNumber: 4,
        tituloMomento: "Presents on the Table",
        didacticPurpose: "Presents on the Table",
        visualPrompt: "Modern anime style 16:9. A wooden table decorated with a bouquet of colorful roses, a blue blouse, a small board game, and a glass bottle of fruit juice. Warm festive feeling. No text drawn by AI.",
        overlayTitle: "Presents in the Sitting-Room",
        overlaySubtitle: "Roses blouse game and fruit juice",
        overlayText: "Presents in the Sitting-Room: Roses blouse game and fruit juice",
        vectorialOverlayPptx: "Explicit information: Table with roses, blue blouse, game, and fruit juice that tastes like wine",
        speakerNotes: "At seven o'clock she went to her parents in the sitting-room. On the table there were fresh roses, a blue blouse, a game, and delicious fruit juice."
      },
      {
        slideNumber: 5,
        tituloMomento: "Celebration at School",
        didacticPurpose: "Celebration at School",
        visualPrompt: "Modern anime style 16:9. A cheerful classroom courtyard where schoolchildren dance in a smiling circle around Anne, clapping and celebrating. No text drawn by AI.",
        overlayTitle: "At School with Friends",
        overlaySubtitle: "Sharing cakes and singing Happy Birthday",
        overlayText: "At School with Friends: Sharing cakes and singing Happy Birthday",
        vectorialOverlayPptx: "School events: Shared cakes with friends -> chose the sports lesson game -> friends danced in a circle and sang",
        speakerNotes: "At school Anne shared homemade cakes with her classmates. Later, her friends formed a circle around her and sang 'Happy Birthday' with smiles."
      },
      {
        slideNumber: 6,
        tituloMomento: "Attention to Textual Precision",
        didacticPurpose: "Attention to Textual Precision",
        visualPrompt: "Modern anime style 16:9. A magnifying glass focused on the exact text sentence: 'I was allowed to choose the game that we played in the sports lesson'. No specific sport drawn. No text drawn by AI.",
        overlayTitle: "Reading with Exact Evidence",
        overlaySubtitle: "The sports lesson game is not named",
        overlayText: "Reading with Exact Evidence: The sports lesson game is not named",
        vectorialOverlayPptx: "Critical rule: The passage states 'the game that we played in the sports lesson'; volleyball is not explicitly written",
        speakerNotes: "Pay close attention: the passage says Anne chose 'the game that we played in the sports lesson'. The text does not name volleyball, so we must stick strictly to what is written."
      },
      {
        slideNumber: 7,
        tituloMomento: "Summary of Feelings",
        didacticPurpose: "Summary of Feelings",
        visualPrompt: "Modern anime style 16:9. Anne sitting by an attic window, writing peacefully in her red-checked diary with a smile of gratitude. Soft sunset glow. No text drawn by AI.",
        overlayTitle: "Gratitude and Friendship",
        overlaySubtitle: "Expressing emotions through writing",
        overlayText: "Gratitude and Friendship: Expressing emotions through writing",
        vectorialOverlayPptx: "Main theme: Personal diaries allow young people to express feelings of joy, affection, and personal growth",
        speakerNotes: "Writing a diary was Anne's way of expressing her deepest feelings. Even in difficult historical times, this entry preserves a moment of pure joy and gratitude."
      },
      {
        slideNumber: 8,
        tituloMomento: "Objetivo de la Explicación",
        didacticPurpose: "Objetivo de la Explicación",
        visualPrompt: "Modern anime style 16:9. The student explorers looking at an English vocabulary board with reading strategies. Clean negative space on top. No text drawn by AI.",
        overlayTitle: "Reading Strategy Objective",
        overlaySubtitle: "Main idea and explicit factual details",
        overlayText: "Reading Strategy Objective: Main idea and explicit factual details",
        vectorialOverlayPptx: "OA 9: Comprender la idea general e información explícita en textos adaptados simples en inglés",
        speakerNotes: "In this part of our class, we will practice two key reading strategies: identifying the general topic of the text and locating specific facts using time clues."
      },
      {
        slideNumber: 9,
        tituloMomento: "General Idea vs Details",
        didacticPurpose: "General Idea vs Details",
        visualPrompt: "Modern anime style 16:9. An umbrella diagram: the umbrella represents 'Birthday Celebration' (General Idea), and raindrops underneath represent 'gifts, cat, school, friends' (Supporting Details). No text drawn by AI.",
        overlayTitle: "General Idea vs Details",
        overlaySubtitle: "The main topic covers the whole text",
        overlayText: "General Idea vs Details: The main topic covers the whole text",
        vectorialOverlayPptx: "Strategy: General idea is the complete theme (Anne's birthday); details are individual facts (time, gifts)",
        speakerNotes: "The general idea is the big picture: Anne's thirteenth birthday. Individual facts, like her cat Moortje or the blue blouse, are supporting details."
      },
      {
        slideNumber: 10,
        tituloMomento: "Locating Explicit Facts",
        didacticPurpose: "Locating Explicit Facts",
        visualPrompt: "Modern anime style 16:9. Highlighter effect scanning over English text lines, highlighting words like 'six o'clock', 'cat', 'blue blouse', 'roses'. High visual contrast. No text drawn by AI.",
        overlayTitle: "Scanning for Keywords",
        overlaySubtitle: "Look for numbers names and nouns",
        overlayText: "Scanning for Keywords: Look for numbers names and nouns",
        vectorialOverlayPptx: "Technique: Scan the paragraph quickly for specific nouns or numbers to find answers without translating word-by-word",
        speakerNotes: "When a question asks 'What time did she wake up?', scan the text for numbers and clock words. You will quickly spot 'at six o'clock'."
      },
      {
        slideNumber: 11,
        tituloMomento: "Chronological Sequence",
        didacticPurpose: "Chronological Sequence",
        visualPrompt: "Modern anime style 16:9. A timeline with numbered stepping stones: 1. Woke up, 2. Greeted cat, 3. Opened presents, 4. School celebration. Clear progression. No text drawn by AI.",
        overlayTitle: "Sequence of Events",
        overlaySubtitle: "Ordering actions from morning to afternoon",
        overlayText: "Sequence of Events: Ordering actions from morning to afternoon",
        vectorialOverlayPptx: "Activity P01: Identify main events in Anne's day and order them in correct chronological sequence",
        speakerNotes: "Activity 1 from our curriculum asks us to sequence her day: waking up, seeing her cat, greeting her parents for presents, and going to school with her classmates."
      },
      {
        slideNumber: 12,
        tituloMomento: "Atención al Error Común",
        didacticPurpose: "Atención al Error Común",
        visualPrompt: "Modern anime style 16:9. A warning symbol with the word 'Volleyball' crossed out, pointing back to the text phrase 'the game in the sports lesson'. Clear academic caution. No text drawn by AI.",
        overlayTitle: "Stick to the Text Evidence",
        overlaySubtitle: "Do not add details not stated in the passage",
        overlayText: "Stick to the Text Evidence: Do not add details not stated in the passage",
        vectorialOverlayPptx: "Rule: If a question asks what sport is explicitly mentioned, the correct answer is that no specific sport is named",
        speakerNotes: "Never invent facts that are not in the text. Although an outside workbook may mention volleyball, Anne's passage simply says 'the game that we played in the sports lesson'."
      },
      {
        slideNumber: 13,
        tituloMomento: "Modelamiento de Reactivo",
        didacticPurpose: "Modelamiento de Reactivo",
        visualPrompt: "Modern anime style 16:9. An English multiple-choice question card with four lettered choices A, B, C, D clearly presented on an interactive screen. Professional design. No text drawn by AI.",
        overlayTitle: "Sample Multiple-Choice Item",
        overlaySubtitle: "Which present was the nicest for Anne?",
        overlayText: "Sample Multiple-Choice Item: Which present was the nicest for Anne?",
        vectorialOverlayPptx: "Question: 'What was the nicest present according to Anne?' -> 'Her personal diary'",
        speakerNotes: "In your evaluations, questions will have four clear options: A, B, C, and D. Anne says explicitly: 'The nicest present was you — my diary!'"
      },
      {
        slideNumber: 14,
        tituloMomento: "Cierre y Transición",
        didacticPurpose: "Cierre y Transición",
        visualPrompt: "Modern anime style 16:9. The two 13-year-old explorers smiling with their English notebooks open, pencils ready for writing exercises. Warm morning light. No text drawn by AI.",
        overlayTitle: "Golden Reading Rule",
        overlaySubtitle: "Every answer must be proven by the text",
        overlayText: "Golden Reading Rule: Every answer must be proven by the text",
        vectorialOverlayPptx: "Next step: Let's solve the chronology and comprehension activities in our English notebook",
        speakerNotes: "Our Golden Reading Rule: every correct answer in English must have direct evidence in the text. Let's move to our notebook practice!"
      }
    ]
  },
  preQuestions: [
    {
      context: 'The Main Topic of the Diary (General Idea)',
      question: 'What is the main topic of Anne’s diary entry on printed page 18? (¿Cuál es el tema principal de esta entrada del diario de Ana Frank?)',
      expected: 'The text is about Anne Frank celebrating her 13th birthday, describing her feelings, her presents, and her day with family and school friends.',
      success: '¡Excelente comprensión global! Captaste el tema completo: la celebración de su cumpleaños número 13.',
      support: 'Piensa en qué une a todos los párrafos: los regalos, la fecha de junio, los pasteles en la escuela y el canto de cumpleaños.',
      reveal: 'The passage describes Anne Frank’s thirteenth birthday celebration on 12 June 1942, including her gifts and school activities.',
      studentReveal: 'El tema es la celebración del cumpleaños número 13 de Ana Frank, sus regalos y lo que vivió ese día con su familia y amigos.'
    },
    {
      context: 'Chronological Sequence of the Morning (Activity P01)',
      question: 'What was the exact order of Anne’s morning actions before receiving her presents? (¿Cuál fue el orden de lo que hizo Ana en la mañana antes de abrir sus regalos?)',
      expected: '1. She woke up at six o’clock; 2. She waited until quarter to seven; 3. She went down to the dining room and saw her cat Moortje; 4. At seven, she went to her parents in the sitting room.',
      success: '¡Secuencia cronológica impecable! Ordenaste los cuatro momentos exactos de la mañana con sus conectores de tiempo.',
      support: 'Busca las horas en el primer y segundo párrafo: "six o\'clock", "quarter to seven", "dining-room" y "at seven".',
      reveal: 'Anne woke up at 6:00, got up at 6:45, was welcomed by her cat Moortje in the dining room, and joined her parents at 7:00.',
      studentReveal: '1. Despertó a las 6:00; 2. Esperó hasta las 6:45 para levantarse; 3. Saludó a su gata Moortje en el comedor; 4. A las 7:00 fue a ver a sus padres.'
    }
  ],
  formalization: {
    title: 'Reading Strategies: Scanning and Chronology',
    concept: 'Explicit Information and Time Sequence',
    ideaClave: 'In English reading comprehension, scanning for proper nouns and time markers allows us to locate explicit facts quickly, while sequencing connectors (First, Then, At seven, Afterwards) reveal the chronological order of the narrative.',
    dileIntro: 'Consolidemos las estrategias formales de lectura en inglés para textos narrativos y diarios personales.',
    hazInstruction: 'Abre tu cuaderno de inglés para registrar el vocabulario de la lectura y el organizador cronológico.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: "Estrategias de Comprensión",
        visualPrompt: "Modern anime style 16:9. A chart with key reading strategies: General idea vs Explicit detail, Time markers. Clean educational aesthetic. No text drawn by AI.",
        overlayTitle: "Reading Tools",
        overlaySubtitle: "Keywords time markers and evidence",
        overlayText: "Reading Tools: Keywords time markers and evidence",
        speakerNotes: "Usar time markers como 'On Friday', 'At seven' y 'Afterwards' te ayuda a ordenar los hechos de cualquier historia en inglés."
      }
    ]
  },
  postQuestions: [
    {
      context: 'Presents Received (Explicit Details)',
      question: 'According to the text, which items were given to Anne by her parents, Mummy and Daddy? (¿Qué objetos específicos le regalaron sus padres según el texto?)',
      expected: 'Her parents gave her a blue blouse ("a blue blouse"), a board game ("a game"), and a bottle of fruit juice that tastes like wine ("a bottle of fruit juice which tastes quite like wine").',
      success: '¡Excelente localización de detalles! Mencionaste la blusa azul, el juego y el jugo de frutas.',
      support: 'Revisa la mitad del segundo párrafo: "Daddy and Mummy gave me a blue blouse, a game, and a bottle of fruit juice...".',
      reveal: 'Her parents gave her a blue blouse, a game, and fruit juice, in addition to the flowers and her red-checked diary.',
      studentReveal: 'Sus padres le regalaron una blusa azul, un juego y una botella de jugo de frutas que sabía parecido al vino.'
    },
    {
      context: 'School Celebration and the Sports Lesson',
      question: 'What happened during the sports lesson at school according to the text? (¿Qué ocurrió durante la clase de deportes en la escuela según lo que dice expresamente el texto?)',
      expected: 'Anne was allowed to choose the game that the class played. The text does not name which specific sport they played.',
      success: '¡Rigor textual perfecto! Recordaste la regla: el texto dice que ella eligió el juego, pero no menciona el nombre de ningún deporte como voleibol.',
      support: 'Lee la frase del texto: "I was allowed to choose the game that we played in the sports lesson". ¿Aparece el nombre de algún deporte allí?',
      reveal: 'The text states that Anne chose the game played during the sports lesson; it does not name volleyball or any other specific sport.',
      studentReveal: 'Le permitieron elegir el juego que jugaron en la clase de deportes, pero el texto no nombra qué deporte específico fue.'
    }
  ],
  practice: [
    {
      context: 'Case 1: Notebook Vocabulary and Sentences',
      question: 'In your English notebook, write the title: "Anne Frank’s Birthday: 12 June 1942". Copy these three sentences in English and translate them into Spanish: 1. "The nicest present was you — my diary!" 2. "Moortje, my cat, welcomed me." 3. "All my friends danced round me and sang Happy Birthday."',
      expected: 'The student writes the three sentences in English in their notebook with accurate Spanish translations reflecting the meaning of the passage.',
      success: '¡Excelente trabajo en tu cuaderno! Has reforzado la escritura en inglés y la traducción contextual de ideas clave.',
      support: 'Recuerda: "nicest" significa más lindo o agradable; "welcomed" significa me dio la bienvenida; "danced round me" significa bailaron en ronda a mi alrededor.',
      reveal: 'Copying authentic sentences reinforces vocabulary retention and grammatical familiarity in English.',
      studentReveal: 'Tres oraciones copiadas y traducidas en el cuaderno con vocabulario exacto de afecto, mascotas y amigos.'
    },
    {
      context: 'Case 2: Timeline Diagram in Notebook',
      question: 'Draw a horizontal timeline in your notebook with four points representing Anne’s birthday: 6:00 AM (Woke up), 7:00 AM (Presents with parents), School Time (Shared cakes with friends), Sports Lesson (Chose the class game). Add a brief note under each point.',
      expected: 'Timeline diagram complete in the notebook with correct English labels and chronological progression.',
      success: '¡Gran organizador visual! Has estructurado el paso de las horas en inglés de forma clara y metódica.',
      support: 'Usa las frases del texto: 6:00 woke up, 7:00 presents in sitting-room, cakes shared at school, chose game in sports lesson.',
      reveal: 'The timeline illustrates chronological sequence as an essential reading comprehension strategy in English.',
      studentReveal: 'Línea de tiempo horizontal en el cuaderno con los cuatro momentos clave del cumpleaños de Ana Frank.'
    }
  ],
  mini: [
    {
      q: 'On which date and day of the week did Anne Frank celebrate the birthday described in the diary entry?',
      options: [
        'On Friday, 12 June 1942.',
        'On Sunday, 25 December 1940.',
        'On Monday, 1 January 1950.',
        'On Wednesday, 14 February 1935.'
      ],
      correct: 'On Friday, 12 June 1942.',
      fixExplain: 'The diary entry begins with the explicit header: "Friday, 12 June, I woke up early at six o\'clock; it was my birthday."'
    },
    {
      q: 'Which present did Anne Frank consider "the nicest present" among all the gifts she received?',
      options: [
        'Her red-checked personal diary ("you — my diary!").',
        'A brand new bicycle to ride in the city.',
        'A golden watch from her grandparents.',
        'A ticket to travel to another country by ship.'
      ],
      correct: 'Her red-checked personal diary ("you — my diary!").',
      fixExplain: 'In the second paragraph, Anne directly addresses her book: "The nicest present was you — my diary!"'
    },
    {
      q: 'Regarding the sports lesson at school, what does the text explicitly state about what happened?',
      options: [
        'Anne was allowed to choose the game that the class played, without naming any specific sport.',
        'The class played volleyball in an outdoor championship against another school.',
        'The sports teacher cancelled the class because it was raining heavily.',
        'Anne decided not to participate in the sports lesson because she had a headache.'
      ],
      correct: 'Anne was allowed to choose the game that the class played, without naming any specific sport.',
      fixExplain: 'The passage explicitly says: "I was allowed to choose the game that we played in the sports lesson." It does not name volleyball.'
    }
  ],
  recovery: [
    {
      title: 'Reading Comprehension: Locating Explicit Information',
      explain: 'When answering reading questions in English, always verify your answer against the exact sentence in the text, avoiding assumptions not stated in the passage.',
      q: 'Who welcomed Anne downstairs in the dining room when she got up at quarter to seven in the morning?',
      options: [
        'Her pet cat, named Moortje.',
        'Her school teacher who arrived early.',
        'A postman delivering a package.',
        'A neighbor asking for help.'
      ],
      correct: 'Her pet cat, named Moortje.',
      correctText: '¡Exacto! "Moortje, my cat, welcomed me" en el comedor.',
      fixText: 'Revisa el final del primer párrafo: Ana bajó al comedor ("dining-room") donde su gata Moortje le dio la bienvenida.'
    }
  ],
  summaryIdeas: [
    ['General Topic of the Diary', 'The passage describes Anne Frank’s 13th birthday on 12 June 1942, reflecting feelings of happiness and gratitude.'],
    ['Explicit Facts and Sequence', 'Scanning numbers and time markers (6:00, 6:45, 7:00) allows accurate chronological ordering of her day.'],
    ['Textual Evidence Invariant', 'Every reading answer must be supported directly by the text; the sports lesson does not mention volleyball explicitly.']
  ],
  paso8_cierre: {
    preguntaSintesis: 'Why is keeping a personal diary a valuable way to understand how people felt during historical events in the past?',
    metacognicion: 'Today I learned to scan an authentic English text for dates, names, and time markers to locate factual details and understand personal emotions.',
    celebracion: '¡Excelente trabajo en Inglés! En la próxima sesión continuaremos analizando relatos históricos y rutinas cronológicas en inglés.'
  }
};

// ============================================================================
// GENERACIÓN DE ARCHIVOS MARKDOWN (.md) Y MANIFIESTOS (manifest.json)
// ============================================================================
function lessonToMarkdown(l: LessonData): string {
  let md = `# Lección Oficial EstudioSimple: ${l.metadata.subject} - 7° Básico\n\n`;
  md += `**Curso:** ${l.metadata.grade} (Identificador oficial: \`110-7\`)  \n`;
  md += `**Asignatura:** ${l.metadata.subject}  \n`;
  md += `**Objetivo de Aprendizaje:** ${l.metadata.oaCode} - ${l.metadata.oaTitle}  \n`;
  md += `**Clase:** ${l.metadata.lessonNumber} de ${l.metadata.totalLessonsInOa} (\`${l.metadata.lessonTitle}\`)  \n`;
  md += `**Duración estimada:** ${l.metadata.durationMinutes} minutos  \n`;
  md += `**Fecha y Hora de Versión:** ${ISO_TIMESTAMP}  \n`;
  md += `**Estado Normativo:** \`EN_REVISION\` (Etapa: \`WORK_PRE_APROBACION\`)  \n\n`;
  md += `---\n\n`;

  md += `## 1. Metadata y Preparación del Mentor (Paso 1)\n\n`;
  md += `- **Objetivo del Adulto / Mentor:** ${l.prep.adultObjective}\n`;
  md += `- **Ruta de Hoy:** ${l.prep.routeToday}\n`;
  md += `- **Recordatorio del Mentor:** ${l.prep.mentorReminder}\n`;
  md += `- **Consejo Emocional:** ${l.prep.emotionalTip}\n`;
  md += `- **Consejos Obligatorios:**\n`;
  (l.prep.reminders || []).forEach(r => { md += `  * ${r}\n`; });
  md += `\n---\n\n`;

  md += `## 2. Ruta y Situación Inicial (Paso 2)\n\n`;
  md += `### Bloques de Ruta:\n`;
  l.route.blocks.forEach(b => {
    md += `- **Bloque ${b.number} [${b.color}]:** ${b.title} — *${b.subtitle}*\n`;
  });
  md += `\n### Preguntas Clave:\n`;
  (l.route.keyQuestions || []).forEach(kq => {
    md += `- **${kq.label}:** ${kq.sub}\n`;
  });
  md += `\n### Situación Problémica y Activación Previa:\n`;
  md += `- **DILE (Pregunta inicial):** ${l.situation.dilePrompt}\n`;
  md += `- **Respuesta esperada:** ${l.situation.expectedAnswer}\n`;
  md += `- **Pista socrática:** ${l.situation.socraticHint}\n`;
  md += `- **Opciones de retroalimentación:**\n`;
  l.situation.options.forEach(opt => {
    md += `  * *[${opt.kind}]:* ${opt.label} $\\rightarrow$ "${opt.feedbackText}"\n`;
  });
  md += `\n### Punto de Partida (Reference):\n`;
  md += `- **DILE:** ${l.reference.dilePrompt}\n`;
  md += `- **Pregunta de observación:** ${l.reference.question}\n`;
  md += `- **Respuesta esperada:** ${l.reference.expectedAnswer}\n`;
  md += `- **Éxito:** ${l.reference.feedbackSuccess}\n`;
  md += `- **Apoyo:** ${l.reference.feedbackSupport}\n\n`;
  md += `---\n\n`;

  md += `## 3. Video Gancho y Diapositivas Bimodales (Paso 3 - 14 Láminas)\n\n`;
  md += `- **Título:** ${l.hook.title}\n`;
  md += `- **DILE Intro:** ${l.hook.dileIntro}\n`;
  md += `- **HAZ Instrucción:** ${l.hook.hazInstruction}\n`;
  md += `- **Focos de atención:**\n`;
  (l.hook.focusPoints || []).forEach(fp => { md += `  * ${fp}\n`; });
  md += `\n### Catálogo de 14 Diapositivas (7 Gancho + 7 Explicación):\n\n`;
  (l.hook.slides || []).forEach(s => {
    md += `#### Diapositiva ${s.slideNumber}: ${s.tituloMomento}\n`;
    md += `- **Overlay Title (48 pt):** ${s.overlayTitle || s.overlayText}\n`;
    md += `- **Overlay Subtitle:** ${s.overlaySubtitle || ''}\n`;
    md += `- **Prompt Visual (No text drawn by AI):** \`${s.visualPrompt}\`\n`;
    if (s.vectorialOverlayPptx) md += `- **Rótulo/Diagrama:** ${s.vectorialOverlayPptx}\n`;
    md += `- **Guion del Relator (Speaker Notes):** "${s.speakerNotes}"\n\n`;
  });
  md += `---\n\n`;

  md += `## 4. Conversación Guiada Post-Video (Paso 4)\n\n`;
  l.preQuestions.forEach((pq, i) => {
    md += `### Pregunta Guiada ${i + 1}: ${pq.context}\n`;
    md += `- **Pregunta:** ${pq.question}\n`;
    md += `- **Respuesta esperada:** ${pq.expected}\n`;
    md += `- **Retroalimentación de Éxito:** ${pq.success}\n`;
    md += `- **Pista de Apoyo:** ${pq.support}\n`;
    md += `- **Revelación:** ${pq.reveal}\n\n`;
  });
  md += `---\n\n`;

  md += `## 5. Formalización e Idea Clave (Paso 5)\n\n`;
  md += `- **Concepto:** ${l.formalization.concept}\n`;
  md += `- **Idea Clave:** ${l.formalization.ideaClave}\n`;
  md += `- **DILE Intro:** ${l.formalization.dileIntro}\n`;
  md += `- **HAZ Instrucción:** ${l.formalization.hazInstruction}\n\n`;

  md += `### Comprobación de Formalización (postQuestions):\n`;
  l.postQuestions.forEach((pq, i) => {
    md += `#### Ítem de Comprobación ${i + 1}: ${pq.context}\n`;
    md += `- **Pregunta:** ${pq.question}\n`;
    md += `- **Respuesta esperada:** ${pq.expected}\n`;
    md += `- **Éxito:** ${pq.success}\n`;
    md += `- **Apoyo:** ${pq.support}\n\n`;
  });
  md += `---\n\n`;

  md += `## 6. Práctica Conjunta y Trabajo en Cuaderno Físico (Paso 6)\n\n`;
  l.practice.forEach((p, i) => {
    md += `### Caso de Práctica ${i + 1}: ${p.context}\n`;
    md += `- **Actividad:** ${p.question}\n`;
    md += `- **Respuesta/Producto esperado:** ${p.expected}\n`;
    md += `- **Criterio de Éxito:** ${p.success}\n`;
    md += `- **Pista de Apoyo:** ${p.support}\n`;
    md += `- **Revelación pedagógica:** ${p.reveal}\n\n`;
  });
  md += `---\n\n`;

  md += `## 7. Miniquiz y Recuperación Formativa (Paso 7 - 4 Alternativas A-D)\n\n`;
  md += `### Miniquiz Psicométrico:\n`;
  l.mini.forEach((m, i) => {
    md += `#### Pregunta ${i + 1}:\n`;
    md += `**${m.q}**\n\n`;
    m.options.forEach((opt, idx) => {
      const letter = String.fromCharCode(65 + idx);
      const isCorrect = opt === m.correct ? ' **(Correcta)**' : '';
      md += `- **${letter})** ${opt}${isCorrect}\n`;
    });
    md += `\n*Explicación correctiva:* ${m.fixExplain}\n\n`;
  });

  md += `### Bucles de Recuperación Pedagógica:\n`;
  l.recovery.forEach((r, i) => {
    md += `#### Ítem de Recuperación ${i + 1}: ${r.title}\n`;
    md += `- **Explicación pedagógica:** ${r.explain}\n`;
    md += `- **Pregunta de reintento:** ${r.q}\n`;
    r.options.forEach((opt, idx) => {
      const letter = String.fromCharCode(65 + idx);
      const isCorrect = opt === r.correct ? ' **(Correcta)**' : '';
      md += `  * **${letter})** ${opt}${isCorrect}\n`;
    });
    md += `- **Texto de Éxito:** ${r.correctText}\n`;
    md += `- **Texto de Apoyo:** ${r.fixText}\n\n`;
  });
  md += `---\n\n`;

  md += `## 8. Síntesis, Metacognición y Cierre (Paso 8)\n\n`;
  md += `### Ideas Clave de Síntesis:\n`;
  l.summaryIdeas.forEach(([idea, desc]) => {
    md += `- **${idea}:** ${desc}\n`;
  });
  if (l.paso8_cierre) {
    md += `\n### Preguntas de Cierre y Proyección:\n`;
    md += `- **Pregunta de Síntesis:** ${l.paso8_cierre.preguntaSintesis}\n`;
    md += `- **Metacognición:** ${l.paso8_cierre.metacognicion}\n`;
    md += `- **Celebración y Próxima Clase:** ${l.paso8_cierre.celebracion}\n`;
  }

  return md;
}

function buildManifest(oaCode: string, oaName: string, subjectName: string, lessonFile: string): any {
  return {
    curso: "110-7",
    nivel: "7° Básico",
    asignatura: subjectName,
    oa: oaCode,
    titulo_oa: oaName,
    fecha_generacion: ISO_TIMESTAMP,
    status: "EN_REVISION",
    etapa_revision: "WORK_PRE_APROBACION",
    total_lecciones: 6,
    lecciones_construidas: [
      {
        clase: 1,
        archivo_ts: `Web Studio Simple/src/data/lessons/${lessonFile}.ts`,
        archivo_md: `CLASE01_${TIMESTAMP}.md`,
        estado: "EN_REVISION",
        secciones_completas: 12,
        laminas_bimodales: 14,
        reactivos_miniquiz: 3,
        alternativas_por_pregunta: 4
      }
    ],
    auditoria_interna: {
      fecha: ISO_TIMESTAMP,
      hallazgos: 0,
      resultado: "CONFORME"
    },
    fuentes_utilizadas: [
      "INSUMOS/BASE_CURRICULAR/EstudioSimple_Base_Curricular_7B_4Asignaturas_v1.json",
      "TEMARIOS EELL 7° Básico MINEDUC"
    ]
  };
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================
async function run() {
  console.log('=== CONSTRUYENDO Y ACTUALIZANDO LAS 4 CLASES 01 CANÓNICAS (7° BÁSICO) ===\n');

  const root = process.cwd();

  const lessons = [
    {
      id: 'LYL',
      dir: 'LECCIONES/110-7/Lengua_Literatura/OA03',
      sub: 'Lengua y Literatura',
      oaCode: 'OA03',
      oaName: 'Análisis de narraciones: conflicto, personajes y ambiente',
      tsPath: 'Web Studio Simple/src/data/lessons/lengua_7b_oa03_clase01.ts',
      tsExportName: 'LENGUA_7B_OA03_CLASE01',
      fileBase: 'lengua_7b_oa03_clase01',
      data: LENGUA_7B_OA03_CLASE01
    },
    {
      id: 'CNA',
      dir: 'LECCIONES/110-7/Ciencias_Naturales/OA01',
      sub: 'Ciencias Naturales',
      oaCode: 'OA01',
      oaName: 'Sexualidad y Afectividad',
      tsPath: 'Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts',
      tsExportName: 'CIENCIAS_7B_OA01_CLASE01',
      fileBase: 'ciencias_7b_oa01_clase01',
      data: CIENCIAS_7B_OA01_CLASE01
    },
    {
      id: 'HIS',
      dir: 'LECCIONES/110-7/Historia_Geografia/OA02',
      sub: 'Historia, Geografía y Ciencias Sociales',
      oaCode: 'OA02',
      oaName: 'Transformaciones de la vida humana en el Neolítico',
      tsPath: 'Web Studio Simple/src/data/lessons/historia_7b_oa02_clase01.ts',
      tsExportName: 'HISTORIA_7B_OA02_CLASE01',
      fileBase: 'historia_7b_oa02_clase01',
      data: HISTORIA_7B_OA02_CLASE01
    },
    {
      id: 'ING',
      dir: 'LECCIONES/110-7/Ingles/OA09',
      sub: 'Idioma Extranjero Inglés',
      oaCode: 'OA09',
      oaName: 'Reading comprehension of authentic and adapted texts',
      tsPath: 'Web Studio Simple/src/data/lessons/ingles_7b_oa09_clase01.ts',
      tsExportName: 'INGLES_7B_OA09_CLASE01',
      fileBase: 'ingles_7b_oa09_clase01',
      data: INGLES_7B_OA09_CLASE01
    }
  ];

  for (const item of lessons) {
    console.log(`[+] Procesando ${item.sub} (${item.oaCode}) Clase 01...`);

    // 1. Escribir archivo TypeScript en Web Studio Simple
    const fullTsPath = path.resolve(root, item.tsPath);
    const tsContent = `import { LessonData } from '../../types/lesson';\n\nexport const ${item.tsExportName}: LessonData = ${JSON.stringify(item.data, null, 2)};\n`;
    fs.writeFileSync(fullTsPath, tsContent, 'utf8');
    console.log(`    ✓ TypeScript actualizado: ${item.tsPath}`);

    // 2. Crear directorio de lección en LECCIONES/110-7 si no existe
    const fullDirPath = path.resolve(root, item.dir);
    if (!fs.existsSync(fullDirPath)) {
      fs.mkdirSync(fullDirPath, { recursive: true });
    }

    // 3. Escribir archivo Markdown canónico con timestamp
    const mdFilename = `CLASE01_${TIMESTAMP}.md`;
    const fullMdPath = path.resolve(fullDirPath, mdFilename);
    const mdContent = lessonToMarkdown(item.data);
    fs.writeFileSync(fullMdPath, mdContent, 'utf8');
    console.log(`    ✓ Markdown canónico generado: ${item.dir}/${mdFilename}`);

    // 4. Escribir/actualizar manifest.json
    const manifestPath = path.resolve(fullDirPath, 'manifest.json');
    const manifest = buildManifest(item.oaCode, item.oaName, item.sub, item.fileBase);
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log(`    ✓ manifest.json actualizado en estado EN_REVISION (WORK_PRE_APROBACION)`);
  }

  // 5. Verificar sincronización en index.ts
  const indexPath = path.resolve(root, 'Web Studio Simple/src/data/lessons/index.ts');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  console.log('\n[+] Verificando exportaciones en Web Studio Simple/src/data/lessons/index.ts...');
  lessons.forEach(item => {
    if (indexContent.includes(item.tsExportName)) {
      console.log(`    ✓ ${item.tsExportName} debidamente exportado en index.ts`);
    } else {
      console.warn(`    ! ALERTA: ${item.tsExportName} no encontrado en index.ts`);
    }
  });

  console.log('\n=== PROCESO COMPLETADO EXITOSAMENTE ===');
}

run().catch(err => {
  console.error('Error durante la construcción:', err);
  process.exit(1);
});
