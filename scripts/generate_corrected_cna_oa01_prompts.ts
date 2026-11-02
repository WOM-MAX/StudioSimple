import fs from 'node:fs';
import path from 'node:path';

// Cargar las lecciones canónicas para extraer sus datos curriculares base
import { CIENCIAS_7B_OA01_CLASE01 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01';
import { CIENCIAS_7B_OA01_CLASE02 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase02';
import { CIENCIAS_7B_OA01_CLASE03 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase03';
import { CIENCIAS_7B_OA01_CLASE04 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase04';
import { CIENCIAS_7B_OA01_CLASE05 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase05';
import { CIENCIAS_7B_OA01_CLASE06 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase06';

const ROOT = path.resolve(__dirname, '..');
const TIMESTAMP = '2026-10-28_10-30_CL';
const OUT_FILENAME = `Prompts_Work_Ciencias_7B_OA01_CORREGIDO_${TIMESTAMP}.txt`;
const TARGET_DIR = path.join(ROOT, 'LECCIONES', '110-7', 'Ciencias_Naturales', 'OA01');
const OUT_PATH = path.join(TARGET_DIR, OUT_FILENAME);

const lessons = [
  CIENCIAS_7B_OA01_CLASE01,
  CIENCIAS_7B_OA01_CLASE02,
  CIENCIAS_7B_OA01_CLASE03,
  CIENCIAS_7B_OA01_CLASE04,
  CIENCIAS_7B_OA01_CLASE05,
  CIENCIAS_7B_OA01_CLASE06
];

interface SlideSpec {
  tipo: 'MOTIVACION' | 'EXPLICACION';
  claseNum: number;
  claseTitulo: string;
  slideNum: number;
  proposito: string;
  titulo: string;
  subtitulo: string;
  promptImagen: string;
  composicion: string;
  posicionProtagonistas: string;
  espacioNegativo: string;
  notasOrador: string;
  reglaLogo: string;
  duracion: string;
}

// Objetivos canónicos de Explicación Diapositiva 1
const OBJETIVOS_CLASES = [
  {
    subtitulo: "Comprender una / visión integral",
    proposito: "Declarar el objetivo de aprendizaje de la lección: comprender que la sexualidad humana integra cinco dimensiones (física, intelectual, emocional, social y espiritual) según el Texto Escolar.",
    speakerNotes: "Comprenderemos que la sexualidad humana integra distintas dimensiones: física, intelectual, emocional, social y espiritual, superando la mirada exclusivamente biológica señalada en el marco curricular.",
    prompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing in front of an inspiring illuminated conceptual board representing the human dimensions. The girl gestures toward an elegant circular diagram showing physical, emotional, and social harmony, while the boy holds an open notebook. Bright morning light entering from high classroom windows, clean modern anime aesthetic, spacious negative space in upper-left for yellow and white text. No text drawn by AI.",
    comp: "Plano medio general, perspectiva frontal con ligero dinamismo, iluminación matutina clara y fondo escolar estilizado con profundidad de campo suave.",
    pos: "Joven con chaqueta cerceta a la izquierda con libreta en mano; joven con trenzas en el centro-derecha señalando el diagrama con expresión de descubrimiento.",
    neg: "Cuadrante superior izquierdo y tercio superior totalmente despejados para ubicar el título de 64 pt y subtítulo de 48 pt."
  },
  {
    subtitulo: "Ritmos individuales / en la pubertad",
    proposito: "Declarar el objetivo de aprendizaje de la lección: reconocer los cambios físicos de la pubertad (caracteres primarios y secundarios) y comprender que ocurren a ritmos individuales respetando las diferencias.",
    speakerNotes: "El objetivo de esta lección es reconocer que los cambios físicos durante la pubertad, tanto primarios como secundarios, son naturales y ocurren a ritmos individuales que debemos comprender y respetar.",
    prompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old students, a girl with braided hair and a boy in a teal jacket, standing beside a clean infographic board comparing stages of biological growth. The boy looks thoughtfully at an illustrated timeline of growth spurts, while the girl takes scientific notes with a friendly smile. Bright natural daylight, soft laboratory background, crisp lines, ample negative space in upper-left. No text drawn by AI.",
    comp: "Plano medio cinematográfico, iluminación balanceada y cálida, atmósfera de respeto y empatía científica en aula moderna.",
    pos: "Joven con trenzas a la izquierda sosteniendo una libreta; joven con chaqueta cerceta a la derecha observando la línea de tiempo con curiosidad respetuosa.",
    neg: "Sector superior y cuadrante izquierdo despejados de líneas y objetos para dar máximo contraste al título 64 pt y subtítulo 48 pt."
  },
  {
    subtitulo: "Emociones, afecto / e imagen personal",
    proposito: "Declarar el objetivo de aprendizaje de la lección: comprender la dimensión afectiva y emocional en la pubertad, diferenciando lo que sentimos de las acciones que elegimos, sin someterse a filtros corporales.",
    speakerNotes: "El objetivo de esta lección es comprender la dimensión afectiva y emocional en la pubertad, diferenciando lo que sentimos de las acciones que elegimos, sin guiarnos por estándares irreales o filtros.",
    prompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old students, a girl with braided hair and a boy in a teal jacket, in a serene school courtyard under blooming cherry trees. The girl holds an authentic printed photograph while the boy smiles reassuringly, encouraging positive self-acceptance and emotional well-being. Gentle ambient sunlight, soft pastel foliage, expansive negative space in upper-left. No text drawn by AI.",
    comp: "Plano medio abierto, atmósfera pacífica y reflexiva con suave desenfoque de fondo botánico, iluminación solar matutina.",
    pos: "Joven con trenzas en el centro-izquierda observando con serenidad; joven con chaqueta cerceta a la derecha con postura de apoyo y escucha activa.",
    neg: "Cuadrante superior izquierdo limpio con fondo de cielo suave para permitir perfecta legibilidad del texto sin paneles ni sombras."
  },
  {
    subtitulo: "Cuestionar estereotipos / y limitaciones",
    proposito: "Declarar el objetivo de aprendizaje de la lección: analizar la dimensión social de la sexualidad, reconociendo cómo los estereotipos de género imponen expectativas injustas que no deben limitar las oportunidades.",
    speakerNotes: "El objetivo de esta lección es analizar la dimensión social de la sexualidad, reconociendo cómo los estereotipos de género imponen expectativas injustas que no deben limitar los talentos ni las decisiones personales.",
    prompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, in a vibrant science workshop. The girl is enthusiastically assembling an educational robotics kit with gears and sensors, while the boy cheers her on and offers tools from a craft kit. Clean modern lines, warm workshop light, wide negative space in upper-left. No text drawn by AI.",
    comp: "Plano medio dinámico, enfoque nítido sobre la mesa de robótica y los personajes, iluminación de taller de ciencias luminosa.",
    pos: "Joven con trenzas en el centro trabajando con cables y engranajes; joven con chaqueta cerceta a la derecha celebrando su avance con una sonrisa genuina.",
    neg: "Tercio superior izquierdo libre de estanterías y objetos colgantes para ubicar el título y subtítulo en tipografía oficial."
  },
  {
    subtitulo: "Respeto mutuo / y consentimiento",
    proposito: "Declarar el objetivo de aprendizaje de la lección: reflexionar sobre los vínculos afectivos, comprendiendo que el cariño y la cercanía siempre deben fundarse en el respeto mutuo, los límites claros y el consentimiento.",
    speakerNotes: "El objetivo de esta lección es reflexionar sobre los vínculos afectivos, comprendiendo que el cariño y la cercanía siempre deben fundarse en el respeto mutuo, los límites claros y el consentimiento.",
    prompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old students, a girl with braided hair and a boy in a teal jacket, greeting each other with a cheerful fist bump at the entrance of a sunlit school library. Both display expressions of mutual trust, comfort, and camaraderie. Crisp architectural lines, soft ambient afternoon glow, large negative space across upper-left. No text drawn by AI.",
    comp: "Plano medio frontal a nivel de ojos, composición simétrica armónica, iluminación natural cálida filtrada por vitrales altos.",
    pos: "Joven con chaqueta cerceta a la izquierda y joven con trenzas a la derecha, extendiendo sus manos en un saludo respetuoso acordado mutuamente.",
    neg: "Franja superior limpia con tonos neutros de pared de biblioteca para contrastar con el título amarillo oro y subtítulo blanco."
  },
  {
    subtitulo: "Decisiones responsables / e integración",
    proposito: "Declarar el objetivo de aprendizaje de la lección: integrar las dimensiones biológica, afectiva y social de la sexualidad para analizar situaciones reales y aprender a tomar decisiones informadas y de mutuo cuidado.",
    speakerNotes: "El objetivo de esta lección es integrar las dimensiones biológica, afectiva y social de la sexualidad para analizar situaciones reales y aprender a tomar decisiones informadas, responsables y de mutuo cuidado.",
    prompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old students, a girl with braided hair and a boy in a teal jacket, standing together looking towards an open horizon from a school observatory terrace. A digital table displays interconnected holistic icons of biology, emotions, and society. Inspiring golden hour lighting, cinematic sky, generous negative space in upper-left. No text drawn by AI.",
    comp: "Plano general medio cinematográfico con vista a la terraza y el cielo crepuscular limpio, sensación de madurez y proyección futura.",
    pos: "Joven con trenzas a la derecha y joven con chaqueta cerceta en el centro-izquierda, ambos con postura firme y reflexiva mirando hacia el horizonte.",
    neg: "Cuadrante superior izquierdo con cielo despejado en degradé suave para máxima nitidez de títulos de 64 pt y subtítulos de 48 pt."
  }
];

// Generador de descripciones visuales detalladas para cada una de las 84 diapositivas
function buildSlideData(lessonIdx: number, slideIdx: number, isExplicacion: boolean): SlideSpec {
  const lesson = lessons[lessonIdx];
  const claseNum = lessonIdx + 1;
  const claseTitulo = lesson.metadata.lessonTitle;
  const slideNumInPres = slideIdx + 1; // 1 a 7
  const tipo = isExplicacion ? 'EXPLICACION' : 'MOTIVACION';
  const pptxFile = `110-7-CNA-OA01-CLASE0${claseNum}-${tipo}.pptx`;

  // Diapositivas de la lección
  const slideObj = isExplicacion ? lesson.formalization.slides[slideIdx] : lesson.hook.slides[slideIdx];

  let titulo = slideObj?.overlayTitle || slideObj?.overlayText || 'Título';
  let subtitulo = slideObj?.overlaySubtitle || '';
  let speakerNotes = slideObj?.speakerNotes || '';
  let proposito = slideObj?.didacticPurpose || `${tipo} diapositiva ${slideNumInPres}`;
  let promptImagen = '';
  let composicion = '';
  let posicionProtagonistas = '';
  let espacioNegativo = '';
  let duracion = isExplicacion ? '13 segundos (Parte del video de Explicación de 90 segundos)' : '8 segundos (Parte del video de Motivación de 60 segundos)';

  // Regla especial: Primera Diapositiva de Explicación = Objetivo de la Lección
  if (isExplicacion && slideIdx === 0) {
    const objData = OBJETIVOS_CLASES[lessonIdx];
    titulo = "Objetivo de la lección";
    subtitulo = objData.subtitulo;
    proposito = objData.proposito;
    speakerNotes = objData.speakerNotes;
    promptImagen = objData.prompt;
    composicion = objData.comp;
    posicionProtagonistas = objData.pos;
    espacioNegativo = objData.neg;
    duracion = '12 segundos (Apertura del video Explicativo de 90 segundos)';
  } else {
    // Generar prompt específico y contextualizado según la clase y el momento pedagógico
    const contextPrompt = generatePedagogicalPrompt(lessonIdx, slideIdx, isExplicacion, titulo, subtitulo, speakerNotes);
    promptImagen = contextPrompt.prompt;
    composicion = contextPrompt.composicion;
    posicionProtagonistas = contextPrompt.posicion;
    espacioNegativo = contextPrompt.espacioNegativo;
    proposito = contextPrompt.proposito;
  }

  return {
    tipo,
    claseNum,
    claseTitulo,
    slideNum: slideNumInPres,
    proposito,
    titulo,
    subtitulo,
    promptImagen,
    composicion,
    posicionProtagonistas,
    espacioNegativo,
    notasOrador: speakerNotes,
    reglaLogo: "Espacio despejado en esquina inferior derecha reservado para la inserción en PowerPoint del logo blanco oficial de EstudioSimple por ChatGPT Work.",
    duracion
  };
}

function generatePedagogicalPrompt(
  lessonIdx: number,
  slideIdx: number,
  isExplicacion: boolean,
  titulo: string,
  subtitulo: string,
  notes: string
): { prompt: string; composicion: string; posicion: string; espacioNegativo: string; proposito: string } {
  // Rotación espacial de protagonistas para evitar posiciones estáticas
  const positions = [
    "Joven con trenzas a la derecha y joven con chaqueta cerceta en el centro-izquierda conversando con atención.",
    "Ambos protagonistas en el centro interactuando con curiosidad frente a la situación presentada.",
    "Joven con chaqueta cerceta a la derecha examinando el caso; joven con trenzas a la izquierda tomando notas analíticas.",
    "Joven con trenzas en primer plano a la izquierda reflexionando; joven con chaqueta cerceta en plano medio a la derecha prestando apoyo.",
    "Joven con chaqueta cerceta en primer plano a la derecha; joven con trenzas en plano medio a la izquierda observando con empatía.",
    "Ambos protagonistas ubicados en el centro-derecha, dirigiendo la mirada hacia el espacio conceptual izquierdo.",
    "Ambos estudiantes en el centro sonriendo con seguridad y confianza, mirando hacia el espectador listos para avanzar."
  ];

  const pos = positions[slideIdx % positions.length];
  const negativeSpaces = [
    "Cuadrante superior izquierdo completamente libre de elementos visuales distractores para alojar el título de 64 pt y subtítulo de 48 pt.",
    "Tercio superior y franja izquierda despejados con cielo o pared desenfocada de tono neutro para garantizar lectura sin máscaras.",
    "Cuadrante superior derecho con iluminación suave y sin objetos para contraste limpio del texto sobre el fondo.",
    "Franja superior horizontal abierta y limpia, permitiendo colocar el título amarillo oro y subtítulo blanco en dos líneas nítidas.",
    "Sector lateral izquierdo amplio y despejado para visualización directa del texto sin sombras ni recuadros.",
    "Mitad superior izquierda despejada, creando una zona de descanso visual para los textos principales de la presentación.",
    "Tercio superior central y lateral izquierdo despejados con iluminación uniforme de aula para texto de alto impacto."
  ];
  const espNeg = negativeSpaces[slideIdx % negativeSpaces.length];

  // Matriz de Prompts específicos por Clase y Lámina
  const classThemes = [
    // Clase 1: La sexualidad integra distintas dimensiones
    {
      theme: "integral dimensions of sexuality (physical, intellectual, social, emotional, spiritual)",
      motScenes: [
        "sitting at a school library table with colorful flashcards, preparing an oral presentation with focused expressions",
        "reviewing study notes together while observing distinct sticky notes representing feelings, thoughts, and friendships",
        "looking thoughtfully at a human anatomical mannequin in a science room, discussing that biology alone does not explain all emotions",
        "reading a fictional case study in a student notebook, highlighting clues about nervousness and conversation with peers",
        "arranging concept cards on a clean wooden desk, seeking an organized criteria to categorize personal experiences",
        "reflecting in a bright hallway beside a bulletin board, wondering what it truly means to understand a person holistically",
        "holding the official school science textbook, opening to the chapter on human development with eager anticipation"
      ],
      expScenes: [
        "presenting the official objective in front of an educational board", // slide 1 (override handled)
        "examining an illustrated school diagram displaying the five interrelated petals: physical, intellectual, emotional, social, and spiritual",
        "comparing two scientific columns on an interactive tablet, linking physical traits to biology, emotions to affectivity, and bonds to society",
        "analyzing the fictional student scenario on a blackboard, identifying that feeling nervous corresponds strictly to the emotional dimension",
        "highlighting personal values and honest conversation on a study chart, recognizing intellectual and social dimensions at work",
        "discussing why reducing human sexuality to physical traits misses feelings and values, looking at a comprehensive diagram",
        "smiling together with notebooks open, ready to begin interactive practice on integral dimensions in the digital platform"
      ]
    },
    // Clase 2: Cambios físicos durante la pubertad
    {
      theme: "physical changes during puberty, primary and secondary sex characteristics, individual biological rhythms",
      motScenes: [
        "standing beside a school growth chart on a bright corridor wall, observing height markings with friendly curiosity",
        "comparing growth milestones on a medical infographic without judgment, noting that two peers of same age develop differently",
        "discussing how to distinguish real biological facts from assumptions, examining health education booklets",
        "taking notes near a school athletic field, noting that physical growth varies naturally between individuals",
        "looking at a clinical textbook illustration showing natural stages of adolescent growth spurts",
        "debating respectfully in the biology lab about why height or physical timing never determines personal value or intelligence",
        "closing their notebooks with cheerful expressions, ready to understand the scientific facts behind bodily changes"
      ],
      expScenes: [
        "presenting the official objective on individual pubertal growth rhythms", // slide 1 (override)
        "examining an anatomical textbook page clearly distinguishing primary reproductive organs from secondary sex characteristics",
        "pointing to a comparative graph showing that boys and girls experience physical changes at diverse, healthy biological times",
        "analyzing the case of Alex noticing a height spurt while a classmate has not yet, formulating a prudent scientific conclusion",
        "reviewing a chart demonstrating that physical development has zero correlation with academic talents or moral character",
        "identifying a common error: using physical appearance to rank popularity or maturity, crossing out the misconception on a board",
        "holding their biology notebooks with confidence, ready to apply evidence-based criteria in the interactive exercises"
      ]
    },
    // Clase 3: Emociones, afectividad e imagen personal
    {
      theme: "emotions, affectivity, self-image, social media filters, distinguishing feeling from acting",
      motScenes: [
        "looking at a smart tablet displaying a photo with artificial beauty filters, discussing the difference between reality and digital edits",
        "talking empathetically on a bench in the school patio, observing that digital filters distort realistic expectations",
        "discussing in a study nook how intense emotions like nervousness or insecurity can arise during adolescent changes",
        "examining journal notes about choosing positive coping strategies when feeling anxious about class presentations",
        "looking at a poster about emotional regulation and supportive friendships in an inspiring school wellness corner",
        "reflecting on how self-worth is rooted in authentic identity rather than superficial online beauty standards",
        "preparing to discover scientific guidance in the health textbook about affective balance and mental health"
      ],
      expScenes: [
        "presenting the official objective on emotions, affectivity, and genuine self-image", // slide 1 (override)
        "analyzing a conceptual diagram distinguishing physical traits from affective feelings and emotional states",
        "reviewing a chart showing that feeling an emotion is natural, while choosing helpful actions is a conscious personal decision",
        "examining Sam's case of feeling insecure over filtered images, explaining how media literacy restores realistic self-perception",
        "observing Dani's case where nervousness is acknowledged, then addressed through practice and asking a teacher for guidance",
        "refuting the false belief that emotions dictate uncontrollable behavior, highlighting constructive emotional management",
        "smiling together with calm expressions, ready to solve interactive dilemmas regarding emotional awareness on the platform"
      ]
    },
    // Clase 4: Aspectos sociales y estereotipos
    {
      theme: "social aspects of sexuality, gender stereotypes, cultural expectations versus individual potential",
      motScenes: [
        "walking through a school club fair, noticing posters for robotics, literature, and athletics, questioning gendered labels",
        "discussing a classmate's comment that certain hobbies belong to boys or girls, questioning that cultural assumption",
        "observing diverse student projects in a science lab where both girls and boys lead innovative experiments",
        "listening to an interview excerpt about professional equality in engineering and healthcare careers",
        "analyzing magazine clippings on a whiteboard to identify cultural messages that limit personal aspirations",
        "reflecting in a bright classroom on how stereotypes restrict genuine talent and emotional expression",
        "opening the textbook section on social influences and cultural heritage with analytical curiosity"
      ],
      expScenes: [
        "presenting the official objective on questioning gender stereotypes in social development", // slide 1 (override)
        "examining a sociological diagram illustrating how family, media, and school transmit ideas that must be critically evaluated",
        "analyzing Valeria's case who loves building robots despite a classmate saying science is not for girls, defending her right to learn",
        "analyzing Tomás's case who expresses sadness and is told boys should not cry, defending his right to full emotional expression",
        "comparing individual interests against group generalizations on an interactive tablet, showing stereotypes lack factual basis",
        "identifying the error of confusing traditional social expectations with biological capabilities, refuting false barriers",
        "smiling proudly beside a completed scientific model, inviting peers to embrace freedom of choice in the online practice"
      ]
    },
    // Clase 5: Vínculos afectivos y respeto mutuo
    {
      theme: "affective bonds, mutual respect, healthy boundaries, consent and empathy in friendships and relationships",
      motScenes: [
        "sitting together in a bright school cafeteria, observing how different friends express affection comfortably and politely",
        "discussing a situation where a student prefers a verbal greeting rather than physical contact, respecting that preference",
        "talking about digital privacy in a hallway, discussing why photos should never be shared without explicit permission",
        "looking at a peer conflict resolution poster that emphasizes active listening and mutual consideration",
        "reviewing case notes about balancing group enthusiasm with an individual friend's comfort and personal boundaries",
        "reflecting on why true affection always respects limits and never uses peer pressure to force agreement",
        "opening the textbook chapter on interpersonal relationships and respectful communication with serious focus"
      ],
      expScenes: [
        "presenting the official objective on mutual respect, healthy boundaries, and consent in affective bonds", // slide 1 (override)
        "examining a relationship diagram showing that affection thrives in friendships, family, and couples through reciprocal care",
        "analyzing Nico's preference for a handshake greeting, highlighting Paula's respectful acceptance without insistence",
        "analyzing the case where a friend asks not to post a group photo online, explaining why the group must honor her boundary",
        "modeling on a digital whiteboard how to communicate personal boundaries kindly and how to listen when a peer sets a limit",
        "correcting the misconception that affection gives permission to ignore boundaries, reinforcing that respect is unconditional",
        "giving a friendly thumbs up in a peaceful library room, ready to apply principles of mutual respect in the interactive module"
      ]
    },
    // Clase 6: Decisiones responsables e integración
    {
      theme: "responsible decision making, integrating biological, affective, and social dimensions for mutual care",
      motScenes: [
        "standing near a school courtyard notice board displaying community health and youth wellness workshops",
        "analyzing a multi-layered case involving bodily changes, emotional reactions, and peer group pressure",
        "discussing how teasing affects someone going through voice breaks, and how a bystander can intervene positively",
        "reviewing notes that trace the biological, affective, and social aspects of a single complex school situation",
        "observing a decision tree graphic showing consequences of impulsive versus well-considered, empathetic choices",
        "reflecting in a quiet classroom on the courage required to stand up for a peer and respect personal dignity",
        "holding their study binders proudly, ready to synthesize all dimensions of sexuality into ethical decision-making"
      ],
      expScenes: [
        "presenting the official objective on integrating dimensions for responsible decision-making", // slide 1 (override)
        "examining an integrated matrix showing how biological events (voice change), feelings (shyness), and social acts (support) connect",
        "analyzing Alex's voice change and the classmates' teasing, highlighting the courageous classmate who stopped the mockery",
        "reviewing a case of group celebration where an individual limit regarding social media photos was protected responsibly",
        "demonstrating step-by-step how to evaluate consequences before acting, combining scientific evidence and ethical empathy",
        "identifying the error of yielding to peer pressure against one's conscience, reinforcing autonomy and mutual care",
        "smiling with mature confidence on the sunlit school steps, inviting all students to master responsible decision-making"
      ]
    }
  ];

  const themeData = classThemes[lessonIdx];
  const sceneDesc = isExplicacion ? themeData.expScenes[slideIdx] : themeData.motScenes[slideIdx];
  const tipoName = isExplicacion ? 'Explicación' : 'Motivación';

  const prompt = `Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, ${sceneDesc}. Clean modern anime aesthetic, inspiring atmosphere, detailed educational setting, cinematic lighting. Full-bleed background with spacious clean negative space for presentation typography. No panels, no dark rectangles, no overlays. No text drawn by AI.`;

  const comp = `Plano medio cinematográfico en proporción 16:9, iluminación natural suave y nítida, fondo detallado en desenfoque sutil y atmósfera de aprendizaje respetuoso.`;

  const proposito = `${tipoName} Lámina ${slideIdx + 1}: ${titulo.replace(/\//g, '').trim()} — Desarrollar el concepto de ${themeData.theme}.`;

  return { prompt, composicion: comp, posicion: pos, espacioNegativo: espNeg, proposito };
}

async function run() {
  console.log('=== GENERANDO ARCHIVO CORREGIDO DE PROMPTS AUDIOVISUALES (84 LÁMINAS) ===\n');

  let txtContent = '';
  txtContent += `================================================================================\n`;
  txtContent += `STUDIOSIMPLE - PAQUETE OFICIAL CORREGIDO DE PROMPTS VISUALES Y GUIONES PARA WORK\n`;
  txtContent += `ASIGNATURA: CIENCIAS NATURALES | CURSO: 7° BÁSICO | OBJETIVO: OA 01\n`;
  txtContent += `ARCHIVO CANÓNICO: ${OUT_FILENAME}\n`;
  txtContent += `FECHA Y HORA OFICIAL: 2026-10-28 10:30:00 [America/Santiago]\n`;
  txtContent += `ESTÁNDAR: 6 LECCIONES | 12 PRESENTACIONES PPTX | 84 LÁMINAS COMPLETAS (0 VACÍAS)\n`;
  txtContent += `NOMENCLATURA VIGENTE: MOTIVACION Y EXPLICACION (CERO TERMINOLOGÍA 'GANCHO')\n`;
  txtContent += `================================================================================\n\n`;

  txtContent += `REGLAS GLOBALES DE PRODUCCIÓN AUDIOVISUAL (OBLIGATORIAS PARA CHATGPT WORK):\n`;
  txtContent += `1. Proporción y Formato: Widescreen 16:9 estricto (1920x1080), full-bleed, imagen única integrada.\n`;
  txtContent += `2. Estética Visual: Anime educativo premium, moderno, cinematográfico, iluminación inspiradora, estilo Makoto Shinkai / CoMix Wave.\n`;
  txtContent += `3. Protagonistas Universales en 100% de las Escenas: Dúo co-protagónico de 13 años (la joven con trenzas y el joven con chaqueta cerceta) siempre presentes, visibles y alternando posición dinámica entre izquierda, centro y derecha.\n`;
  txtContent += `4. Regla Visual Anti-Máscaras: Imagen limpia con espacio negativo real. PROHIBIDO usar paneles, cortinas, tarjetas, sombras detrás del texto, rectángulos oscuros, bloques flotantes, máscaras u overlays globales. La imagen debe ser visible completa.\n`;
  txtContent += `5. Regla Fundamental de Imagen IA (Sin Texto): La IA NUNCA debe dibujar títulos, subtítulos, letras, números, fórmulas ni logotipos ('No text drawn by AI'). Toda rotulación y elemento conceptual se ensambla vectorialmente en PowerPoint.\n`;
  txtContent += `6. Jerarquía Tipográfica y Color Oficial:\n`;
  txtContent += `   • Título en Pantalla: 64 pt, Amarillo Oro (#FFD700), plano, sin borde, sin sombra.\n`;
  txtContent += `   • Subtítulo en Pantalla: 48 pt, Blanco (#FFFFFF), plano, sin borde, sin sombra.\n`;
  txtContent += `   • PROHIBIDO usar título blanco o unificar ambos con una regla ambigua de un solo color.\n`;
  txtContent += `7. Primera Diapositiva de Explicación: En las 6 presentaciones de EXPLICACIÓN, la Diapositiva 1 declara obligatoriamente el 'Objetivo de la lección' procedente de la fuente curricular canónica.\n`;
  txtContent += `8. Logotipo Oficial EstudioSimple: Dejar espacio libre despejado en la esquina inferior derecha. ChatGPT Work inserta el logo vectorial blanco oficial de EstudioSimple en PowerPoint.\n`;
  txtContent += `9. Locución TTS (Google Vids): Notas al orador en español latino pedagógico y fluido, sin marcas de tiempo técnicas ni conteo de palabras visible.\n`;
  txtContent += `10. Nomenclatura de Archivos PPTX Proyectados (12 presentaciones):\n`;
  for (let c = 1; c <= 6; c++) {
    txtContent += `    • 110-7-CNA-OA01-CLASE0${c}-MOTIVACION.pptx (7 diapositivas, ~60 segundos)\n`;
    txtContent += `    • 110-7-CNA-OA01-CLASE0${c}-EXPLICACION.pptx (7 diapositivas, ~90 segundos)\n`;
  }
  txtContent += `\n`;

  let totalSlidesCount = 0;
  let totalPromptsCount = 0;

  for (let lIdx = 0; lIdx < lessons.length; lIdx++) {
    const claseNum = lIdx + 1;
    const l = lessons[lIdx];
    const cTitulo = l.metadata.lessonTitle;

    txtContent += `################################################################################\n`;
    txtContent += `CLASE ${claseNum} DE 6: ${cTitulo.toUpperCase()}\n`;
    txtContent += `################################################################################\n\n`;

    // PRESENTACIÓN 1: MOTIVACIÓN (7 Diapositivas)
    txtContent += `================================================================================\n`;
    txtContent += `PRESENTACIÓN MOTIVACION: 110-7-CNA-OA01-CLASE0${claseNum}-MOTIVACION.pptx\n`;
    txtContent += `PROPÓSITO: Despertar interés, presentar una situación cotidiana y activar conocimientos previos (7 diapositivas / ~60 s)\n`;
    txtContent += `================================================================================\n\n`;

    for (let sIdx = 0; sIdx < 7; sIdx++) {
      totalSlidesCount++;
      totalPromptsCount++;
      const s = buildSlideData(lIdx, sIdx, false);

      txtContent += `--- DIAPOSITIVA ${s.slideNum} DE 7: MOTIVACIÓN (Clase ${claseNum}) ---\n`;
      txtContent += `1. Tipo de presentación: ${s.tipo}\n`;
      txtContent += `2. Clase: Clase ${s.claseNum} ("${s.claseTitulo}")\n`;
      txtContent += `3. Número de diapositiva: Diapositiva ${s.slideNum} de 7 (Archivo: 110-7-CNA-OA01-CLASE0${claseNum}-MOTIVACION.pptx)\n`;
      txtContent += `4. Propósito pedagógico: ${s.proposito}\n`;
      txtContent += `5. Título visible (64 pt, Amarillo Oro #FFD700): ${s.titulo}\n`;
      txtContent += `6. Subtítulo visible (48 pt, Blanco #FFFFFF): ${s.subtitulo}\n`;
      txtContent += `7. Prompt de Imagen para IA (16:9 Anime Moderno Limpio sin texto): ${s.promptImagen}\n`;
      txtContent += `8. Composición visual: ${s.composicion}\n`;
      txtContent += `9. Posición de los protagonistas: ${s.posicionProtagonistas}\n`;
      txtContent += `10. Espacio negativo destinado al texto: ${s.espacioNegativo}\n`;
      txtContent += `11. Notas al orador (Locución Google Vids): "${s.notasOrador}"\n`;
      txtContent += `12. Regla de logo: ${s.reglaLogo}\n`;
      txtContent += `13. Duración aproximada: ${s.duracion}\n\n`;
    }

    // PRESENTACIÓN 2: EXPLICACIÓN (7 Diapositivas)
    txtContent += `================================================================================\n`;
    txtContent += `PRESENTACIÓN EXPLICACION: 110-7-CNA-OA01-CLASE0${claseNum}-EXPLICACION.pptx\n`;
    txtContent += `PROPÓSITO: Enseñar, modelar, aplicar y sintetizar el concepto disciplinar (7 diapositivas / ~90 s)\n`;
    txtContent += `================================================================================\n\n`;

    for (let sIdx = 0; sIdx < 7; sIdx++) {
      totalSlidesCount++;
      totalPromptsCount++;
      const s = buildSlideData(lIdx, sIdx, true);

      txtContent += `--- DIAPOSITIVA ${s.slideNum} DE 7: EXPLICACIÓN (Clase ${claseNum}) ---\n`;
      txtContent += `1. Tipo de presentación: ${s.tipo}\n`;
      txtContent += `2. Clase: Clase ${s.claseNum} ("${s.claseTitulo}")\n`;
      txtContent += `3. Número de diapositiva: Diapositiva ${s.slideNum} de 7 (Archivo: 110-7-CNA-OA01-CLASE0${claseNum}-EXPLICACION.pptx)\n`;
      txtContent += `4. Propósito pedagógico: ${s.proposito}\n`;
      txtContent += `5. Título visible (64 pt, Amarillo Oro #FFD700): ${s.titulo}\n`;
      txtContent += `6. Subtítulo visible (48 pt, Blanco #FFFFFF): ${s.subtitulo}\n`;
      txtContent += `7. Prompt de Imagen para IA (16:9 Anime Moderno Limpio sin texto): ${s.promptImagen}\n`;
      txtContent += `8. Composición visual: ${s.composicion}\n`;
      txtContent += `9. Posición de los protagonistas: ${s.posicionProtagonistas}\n`;
      txtContent += `10. Espacio negativo destinado al texto: ${s.espacioNegativo}\n`;
      txtContent += `11. Notas al orador (Locución Google Vids): "${s.notasOrador}"\n`;
      txtContent += `12. Regla de logo: ${s.reglaLogo}\n`;
      txtContent += `13. Duración aproximada: ${s.duracion}\n\n`;
    }
  }

  // Escribir archivo corregido
  fs.writeFileSync(OUT_PATH, txtContent, 'utf8');
  console.log(`✓ Archivo corregido generado con éxito: ${OUT_PATH}`);
  console.log(`  -> Total diapositivas escritas: ${totalSlidesCount}`);
  console.log(`  -> Total prompts generados: ${totalPromptsCount}`);
  console.log(`  -> Tamaño: ${fs.statSync(OUT_PATH).size} bytes`);

  // Sincronizar en public para descarga web
  const pubDir = path.join(ROOT, 'Web Studio Simple', 'public', 'descargas_planes_maestros');
  if (fs.existsSync(pubDir)) {
    fs.writeFileSync(path.join(pubDir, OUT_FILENAME), txtContent, 'utf8');
    fs.writeFileSync(path.join(pubDir, 'Prompts_Work_Ciencias_7B_OA01.txt'), txtContent, 'utf8');
    console.log(`✓ Sincronizado en ${pubDir}`);
  }

  // Marcar archivo anterior como SUPERADO_NO_USAR_PARA_PRODUCCION
  const oldTxtPath = path.join(TARGET_DIR, 'Prompts_Work_Ciencias_7B_OA01_2026-10-28_09-14.txt');
  if (fs.existsSync(oldTxtPath)) {
    const oldContent = fs.readFileSync(oldTxtPath, 'utf8');
    if (!oldContent.includes('SUPERADO_NO_USAR_PARA_PRODUCCION')) {
      const superadoHeader = `================================================================================\nESTADO: SUPERADO_NO_USAR_PARA_PRODUCCION\nMOTIVO: Versión anterior con 84 prompts visuales vacíos. Reemplazada canónicamente por:\n${OUT_FILENAME}\n================================================================================\n\n`;
      fs.writeFileSync(oldTxtPath, superadoHeader + oldContent, 'utf8');
      console.log(`✓ Archivo previo marcado como SUPERADO_NO_USAR_PARA_PRODUCCION: ${oldTxtPath}`);
    }
  }
}

run().catch((err) => {
  console.error('Error generando prompts:', err);
  process.exit(1);
});
