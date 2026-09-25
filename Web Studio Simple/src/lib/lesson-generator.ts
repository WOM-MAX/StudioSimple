import neonDataRaw from '../data/neonCurriculum.json';
import { NeonCurriculumItem } from '../types';

const neonCurriculum: NeonCurriculumItem[] = neonDataRaw as NeonCurriculumItem[];

export interface OACatalogItem {
  id: string;
  curso: string;
  asignatura: string;
  eje: string;
  oa: string;
  oaNumero: number;
  inTemarioEELL?: boolean;
  temarioPosicion?: number | null;
  isPriorityDemo: boolean;
  descripcion: string;
  indicadores: string[];
  conceptosClave: string[];
  leccionesSugeridas: number;
  justificacionLecciones: string;
  referenciaTextoEscolar?: {
    libro: string;
    unidad: string;
    leccion: string;
    paginas: string;
  };
}

export const TEXTBOOK_MAPPINGS: Record<string, { libro: string; unidad: string; leccion: string; paginas: string }> = {
  // 1. MATEMÁTICA
  "110-7-MAT-OA01": { libro: "Matemática 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 1: "Números"', leccion: 'Lección 1: "Números enteros"', paginas: "Páginas 6 a 25" },
  "110-7-MAT-OA03": { libro: "Matemática 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 1: "Números"', leccion: 'Lección 2: "Fracciones y decimales"', paginas: "Páginas 26 a 41" },
  "110-7-MAT-OA04": { libro: "Matemática 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 1: "Números"', leccion: 'Lección 3: "Porcentajes"', paginas: "Páginas 42 a 51" },
  "110-7-MAT-OA06": { libro: "Matemática 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 2: "Álgebra y funciones"', leccion: 'Lección 4: "Lenguaje algebraico y ecuaciones"', paginas: "Páginas 52 a 61" },
  "110-7-MAT-OA08": { libro: "Matemática 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 2: "Álgebra y funciones"', leccion: 'Lección 5: "Proporcionalidad"', paginas: "Páginas 62 a 75" },
  "110-7-MAT-OA11": { libro: "Matemática 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 3: "Geometría"', leccion: 'Lección 6: "El círculo"', paginas: "Páginas 76 a 84" },
  "110-7-MAT-OA14": { libro: "Matemática 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 3: "Geometría"', leccion: 'Lección 7 y 8: "Plano cartesiano y vectores"', paginas: "Páginas 85 a 115" },
  "110-7-MAT-OA16": { libro: "Matemática 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 4: "Probabilidad y estadística"', leccion: 'Lección 9: "Estadística descriptiva"', paginas: "Páginas 116 a 129" },
  "110-7-MAT-OA18": { libro: "Matemática 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 4: "Probabilidad y estadística"', leccion: 'Lección 10: "Probabilidades y regla de Laplace"', paginas: "Páginas 130 a 140" },

  // 2. LENGUA Y LITERATURA
  "110-7-LEN-OA03": { libro: "Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 1: "Héroes y heroínas"', leccion: 'Lección 1: "El viaje del héroe en la narrativa"', paginas: "Páginas 14 a 45" },
  "110-7-LEN-OA04": { libro: "Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 2: "Voces de la poesía"', leccion: 'Lección 1 y 2: "Lenguaje poético y sentimientos"', paginas: "Páginas 46 a 87" },
  "110-7-LEN-OA09": { libro: "Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 3: "Somos naturaleza y sociedad"', leccion: 'Lección 1: "Noticias, reportajes y medios"', paginas: "Páginas 92 a 125" },
  "110-7-LEN-OA15": { libro: "Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 4: "¿Qué nos cuenta el mundo?"', leccion: 'Lección 2: "Producción escrita y revisión"', paginas: "Páginas 138 a 170" },

  // 3. CIENCIAS NATURALES
  "110-7-CIE-OA01": { libro: "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 1: "Sexualidad y autocuidado"', leccion: 'Lección 1: "Dimensiones biológicas, afectivas y sociales"', paginas: "Páginas 6 a 23" },
  "110-7-CIE-OA02": { libro: "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 1: "Sexualidad y autocuidado"', leccion: 'Lección 2: "Formación de un nuevo individuo"', paginas: "Páginas 24 a 37" },
  "110-7-CIE-OA05": { libro: "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 2: "Microorganismos y barreras del cuerpo"', leccion: 'Lección 3: "Virus, bacterias y hongos"', paginas: "Páginas 38 a 51" },
  "110-7-CIE-OA07": { libro: "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 2: "Fuerza y movimiento"', leccion: 'Lección 5: "Fuerzas y presión en fluidos"', paginas: "Páginas 64 a 81" },
  "110-7-CIE-OA09": { libro: "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 3: "Dinámica de la Tierra"', leccion: 'Lección 6 y 7: "Placas tectónicas y relieve"', paginas: "Páginas 82 a 111" },
  "110-7-CIE-OA13": { libro: "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 4: "Materia y sus transformaciones"', leccion: 'Lección 8: "Leyes de los gases ideales"', paginas: "Páginas 112 a 137" },
  "110-7-CIE-OA14": { libro: "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 4: "Materia y sus transformaciones"', leccion: 'Lección 9: "Sustancias puras, mezclas y separación"', paginas: "Páginas 138 a 153" },

  // 4. HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES
  "110-7-HIS-OA02": { libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 1: "Primeras sociedades agrícolas y civilizaciones"', leccion: 'Lección 1: "El surgimiento de la agricultura"', paginas: "Páginas 8 a 27" },
  "110-7-HIS-OA03": { libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 1: "Primeras sociedades agrícolas y civilizaciones"', leccion: 'Lección 2: "Las primeras civilizaciones"', paginas: "Páginas 28 a 45" },
  "110-7-HIS-OA06": { libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 2: "La Antigüedad clásica"', leccion: 'Lección 1: "Grecia y la democracia ateniense"', paginas: "Páginas 46 a 67" },
  "110-7-HIS-OA07": { libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 2: "La Antigüedad clásica"', leccion: 'Lección 2: "Roma y el legado republicano"', paginas: "Páginas 68 a 87" },
  "110-7-HIS-OA09": { libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 3: "La Edad Media"', leccion: 'Lección 1: "La conformación de Europa"', paginas: "Páginas 90 a 109" },
  "110-7-HIS-OA12": { libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 3: "La Edad Media"', leccion: 'Lección 2: "Transformaciones en los últimos siglos medievales"', paginas: "Páginas 110 a 127" },
  "110-7-HIS-OA13": { libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 4: "Civilizaciones de América"', leccion: 'Lección 1: "Mayas y Aztecas en Mesoamérica"', paginas: "Páginas 128 a 145" },
  "110-7-HIS-OA16": { libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 4: "Civilizaciones de América"', leccion: 'Lección 2: "Mestizaje y herencia cultural viva"', paginas: "Páginas 146 a 155" },
  "110-7-HIS-OA18": { libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 5: "Formación ciudadana y derechos"', leccion: 'Lección 1: "El Estado de derecho y la república"', paginas: "Páginas 156 a 163" },
  "110-7-HIS-OA19": { libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 5: "Formación ciudadana y derechos"', leccion: 'Lección 2: "Pueblos originarios y convivencia"', paginas: "Páginas 164 a 170" },
  "110-7-HIS-OA20": { libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 5: "Formación ciudadana y derechos"', leccion: 'Lección 3: "Diálogo, mediación y acuerdos"', paginas: "Páginas 171 a 178" },
  "110-7-HIS-OA21": { libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 6: "Espacio geográfico y sustentabilidad"', leccion: 'Lección 1: "Relieve, clima y riesgos socionaturales"', paginas: "Páginas 180 a 195" },
  "110-7-HIS-OA22": { libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)", unidad: 'Unidad 6: "Espacio geográfico y sustentabilidad"', leccion: 'Lección 2: "Huella ecológica y sustentabilidad"', paginas: "Páginas 196 a 210" },

  // 5. INGLÉS
  "110-7-ING-OA09": { libro: "English 7th Grade (Student's Book MINEDUC)", unidad: 'Unit 1: "People and Places"', leccion: 'Lesson 1: "Reading adapted short stories"', paginas: "Páginas 8 a 23" },
  "110-7-ING-OA10": { libro: "English 7th Grade (Student's Book MINEDUC)", unidad: 'Unit 2: "Communication and Technology"', leccion: 'Lesson 1: "Non-literary texts and articles"', paginas: "Páginas 24 a 39" },
  "110-7-ING-OA13": { libro: "English 7th Grade (Student's Book MINEDUC)", unidad: 'Unit 3: "Daily Life and Routines"', leccion: 'Lesson 1: "Personal profiles and sentences"', paginas: "Páginas 40 a 55" },
  "110-7-ING-OA16": { libro: "English 7th Grade (Student's Book MINEDUC)", unidad: 'Unit 4: "World of Wonders"', leccion: 'Lesson 1: "Present Simple and Modal verbs"', paginas: "Páginas 56 a 72" }
};

export interface SlidePrompt {
  slideNumber: number;
  tituloMomento: string;
  visualPrompt: string;
  overlayText: string;
  speakerNotes: string;
  palabrasAprox: number;
  duracionSeg: number;
  imageUrl?: string;
}

export interface GuidedItem {
  context: string;
  question: string;
  expected: string;
  success: string;
  support: string;
  reveal: string;
  studentReveal: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: string;
  fixExplain: string;
  dileReview?: string;
}

export interface RecoveryItem {
  title: string;
  explain: string;
  q: string;
  options: string[];
  correct: string;
  correctText: string;
  fixText: string;
}

export interface LessonData {
  num: number;
  title: string;
  focoDidactico: string;
  routeToday?: string;
  routeIntro?: string;
  routeCards?: Array<{ label: string; sub: string }>;
  keyQuestions?: Array<{ label: string; sub: string }>;
  routeBlocks?: Array<{ id: string; number: string; title: string; subtitle: string; color?: string }>;
  reminders?: string[];
  duracion: string;
  objetivoAdulto: string;
  climaEmocional: string;
  situacionIntro: {
    dialogo: string;
    pregunta: string;
    respEsperada: string;
    pistaSocratica: string;
    options?: Array<{
      label: string;
      kind: 'correct' | 'needs_support' | 'no_answer' | 'other';
      feedbackText: string;
    }>;
  };
  reference?: {
    dilePrompt: string;
    question: string;
    expectedAnswer: string;
    socraticHint: string;
    feedbackSuccess?: string;
    feedbackSupport?: string;
  };
  paso2_hook: {
    titulo: string;
    fullPrompt: string;
    slides: SlidePrompt[];
    dileAntes: string;
    dileDespues: string;
    videoUrl?: string;
    videoSrc?: string;
    posterUrl?: string;
    focusPoints?: string[];
    hazInstruction?: string;
  };
  paso3_recorrido: GuidedItem[];
  conversationContext?: string;
  paso4_explicativo: {
    titulo: string;
    fullPrompt: string;
    slides: SlidePrompt[];
    ideaClave: string;
    dileAntes: string;
    videoUrl?: string;
    videoSrc?: string;
    posterUrl?: string;
    hazInstruction?: string;
  };
  summaryText?: string;
  postQuestions?: GuidedItem[];
  paso5_practica: GuidedItem[];
  reasoning?: {
    title: string;
    dileIntro?: string;
    question: string;
    expectedAnswer: string;
    successFeedback?: string;
    supportFeedback?: string;
    revealText?: string;
  };
  challenge?: {
    title: string;
    question: string;
    expectedAnswer: string;
    successFeedback?: string;
    supportFeedback?: string;
  };
  paso6_resumen: {
    ideaClave: string;
    sintesis: string;
    estrategia?: string | Array<{ number: number; title: string; desc: string }>;
  };
  strategy?: {
    title?: string;
    dileIntro?: string;
    steps?: Array<{ number: number; title: string; desc: string }>;
  };
  summaryIdeas?: Array<[string, string]>;
  paso7_miniquiz: QuizQuestion[];
  paso7b_recuperacion?: RecoveryItem[];
  paso8_cierre: {
    preguntaSintesis: string;
    metacognicion: string;
    celebracion: string;
  };
}

export interface GeneratedOAPackage {
  oa: OACatalogItem;
  totalLessons: number;
  lessons: LessonData[];
}

/**
 * Helper to build the exact ChatGPT Work prompt for Step 2 (Gancho H.O.O.K. - 7 slides)
 */
export function buildHookPromptText(
  asignatura: string,
  oa: string,
  claseNum: number,
  tema: string,
  slides: SlidePrompt[]
): string {
  let prompt = `Actúa como Diseñador Instruccional Senior y Creador de Presentaciones en ChatGPT Work para EstudioSimple.\n\n`;
  prompt += `OBJETIVO: Generar la presentación PPTX oficial de GANCHO MOTIVACIONAL (Paso 2) para:\n`;
  prompt += `- Asignatura: ${asignatura}\n`;
  prompt += `- Objetivo de Aprendizaje: ${oa}\n`;
  prompt += `- Clase: ${claseNum} ("${tema}")\n\n`;
  prompt += `DIRECTIVAS DE DISEÑO OBLIGATORIAS:\n`;
  prompt += `1. Formato Widescreen 16:9 estricto (1920x1080).\n`;
  prompt += `2. Exactamente 7 diapositivas (slide1 a slide7).\n`;
  prompt += `3. ESTILO ARTÍSTICO DE LAS IMÁGENES: Anime Moderno (Modern Anime Style, estética cinematográfica de alta gama, iluminación dinámica, fondos detallados, estilo Makoto Shinkai / CoMix Wave).\n`;
  prompt += `4. PROTAGONISTAS: Dúo co-protagónico de 13 años (una joven y un joven estudiantes-exploradores chilenos). ACTÚAN JUNTOS en cada escena, colaborando, investigando y resolviendo el desafío en equipo.\n`;
  prompt += `5. REGLA VISUAL ANTI-MÁSCARAS: Imágenes Full-Bleed con espacio negativo para texto. Queda prohibido usar placas oscuras que tapen las caras de los personajes o la mitad de la lámina.\n`;
  prompt += `6. NOTAS AL ORADOR (GUION CONTINUO): Cada diapositiva DEBE incluir únicamente el texto de narración oral continua (entre 15 y 22 palabras por lámina) sin marcas técnicas, encabezados ni duraciones, listo para ser leído por TTS en Google Vids.\n\n`;
  prompt += `DETALLE DE LAS 7 DIAPOSITIVAS A CONSTRUIR:\n\n`;

  slides.forEach((s) => {
    prompt += `--- DIAPOSITIVA ${s.slideNumber} (${s.tituloMomento}) ---\n`;
    prompt += `• Prompt de Imagen (16:9): ${s.visualPrompt}\n`;
    prompt += `• Texto en Pantalla (Overlay limpio): ${s.overlayText}\n`;
    prompt += `• Notas al Orador (Locución Google Vids): "${s.speakerNotes}"\n\n`;
  });

  return prompt;
}

/**
 * Helper to build the exact ChatGPT Work prompt for Step 4 (Video Explicativo / Formalización - 7 slides)
 */
export function buildExplicativoPromptText(
  asignatura: string,
  oa: string,
  claseNum: number,
  tema: string,
  slides: SlidePrompt[]
): string {
  let prompt = `Actúa como Diseñador Pedagógico y Especialista en Didáctica Disciplinar en ChatGPT Work para EstudioSimple.\n\n`;
  prompt += `OBJETIVO: Generar la presentación PPTX oficial de VIDEO EXPLICATIVO / FORMALIZACIÓN (Paso 4) para:\n`;
  prompt += `- Asignatura: ${asignatura}\n`;
  prompt += `- Objetivo de Aprendizaje: ${oa}\n`;
  prompt += `- Clase: ${claseNum} ("${tema}")\n\n`;
  prompt += `DIRECTIVAS DE DISEÑO OBLIGATORIAS:\n`;
  prompt += `1. Formato Widescreen 16:9 estricto (1920x1080).\n`;
  prompt += `2. Formato de EXACTAMENTE 7 DIAPOSITIVAS (slide1 a slide7) siguiendo el principio de un cambio visual por cada movimiento mental.\n`;
  prompt += `3. ESTILO ARTÍSTICO: Anime Moderno (Modern Anime Style, limpio, didáctico y luminoso).\n`;
  prompt += `4. PROTAGONISTAS: Los mismos 2 jóvenes de 13 años (la chica y el chico) manipulando el modelo disciplinar, observando la fórmula o comprobando el paso a paso juntos.\n`;
  prompt += `5. REGLA VISUAL ANTI-MÁSCARAS: Imagen limpia con espacio negativo. Overlays pequeños y localizados.\n`;
  prompt += `6. NOTAS AL ORADOR: Guion explicativo continuo y pedagógico (entre 20 y 25 palabras por lámina) sin encabezados técnicos, optimizado para voz en off directa en Google Vids.\n\n`;
  prompt += `DETALLE DE LAS 7 DIAPOSITIVAS A CONSTRUIR:\n\n`;

  slides.forEach((s) => {
    prompt += `--- DIAPOSITIVA ${s.slideNumber} (${s.tituloMomento}) ---\n`;
    prompt += `• Prompt de Imagen (16:9): ${s.visualPrompt}\n`;
    prompt += `• Texto en Pantalla (Overlay limpio): ${s.overlayText}\n`;
    prompt += `• Notas al Orador (Locución Google Vids): "${s.speakerNotes}"\n\n`;
  });

  return prompt;
}

/**
 * Helper to build canonical Lesson 1 of Mathematics Grade 7 OA01 directly from the tested prototype
 */
export function getCanonicalClase1Matematica(): LessonData {
  const hookSlides: SlidePrompt[] = [
    {
      slideNumber: 1,
      tituloMomento: "Apertura y Desafío Marino",
      visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing on the deck of a research vessel looking at an advanced yellow submarine. Clear calm sea, crisp morning light, negative space in the upper third.",
      overlayText: "Misión 1: El recorrido del submarino",
      speakerNotes: "Comienza una nueva expedición científica. Nuestro submarino de investigación oceanográfica se prepara para una inmersión en aguas profundas.",
      palabrasAprox: 18,
      duracionSeg: 9
    },
    {
      slideNumber: 2,
      tituloMomento: "El Punto de Referencia Cero",
      visualPrompt: "Modern anime style. The submarine at the exact surface of the water, with a clean glowing horizontal dashed line labeled '0 metros'. Clear blue sky above and turquoise sea below. Digital measurement gauge on the side.",
      overlayText: "Punto de partida: Superficie del mar (0 m)",
      speakerNotes: "La superficie del mar es nuestro punto de referencia fundamental. En esta expedición la representamos exactamente con el número cero.",
      palabrasAprox: 19,
      duracionSeg: 9
    },
    {
      slideNumber: 3,
      tituloMomento: "Posición Inicial Bajo el Mar",
      visualPrompt: "Modern anime style. The submarine submerged deep underwater, stationary at twenty meters below the surface line. Soft rays of sunlight filtering through the water. Modern digital depth indicator reading −20 m.",
      overlayText: "Posición inicial: −20 m",
      speakerNotes: "El submarino desciende veinte metros bajo la superficie. Como se encuentra debajo del cero, decimos que su posición es menos veinte metros.",
      palabrasAprox: 21,
      duracionSeg: 10
    },
    {
      slideNumber: 4,
      tituloMomento: "Primer Movimiento: Descenso",
      visualPrompt: "Modern anime style. The submarine maneuvering downward with bubbles and small directional arrows indicating descent of 15 meters from its previous depth. High clarity, beautiful underwater marine flora.",
      overlayText: "Maniobra 1: baja 15 metros",
      speakerNotes: "Para investigar una fosa marina, el submarino ejecuta una maniobra: desciende quince metros más hacia el fondo.",
      palabrasAprox: 16,
      duracionSeg: 8
    },
    {
      slideNumber: 5,
      tituloMomento: "Segundo Movimiento: Ascenso",
      visualPrompt: "Modern anime style. The submarine adjusting ballast and propelling upward with light upward arrows indicating an ascent of 8 meters. School of colorful fish passing by in background.",
      overlayText: "Maniobra 2: sube 8 metros",
      speakerNotes: "Al detectar una corriente submarina intensa, el capitán ordena ascender: el submarino sube ocho metros.",
      palabrasAprox: 15,
      duracionSeg: 8
    },
    {
      slideNumber: 6,
      tituloMomento: "El Desafío Central",
      visualPrompt: "Modern anime style. Inside the control cabin, the two 13-year-olds analyzing the navigation dashboard, pointing at the depth sensor with curiosity and focus. Clean lineart, expressive faces.",
      overlayText: "¿Cuál es la posición final del submarino?",
      speakerNotes: "Ahora surge la gran pregunta: después de descender y subir, ¿en qué posición exacta respecto de la superficie se encuentra el submarino?",
      palabrasAprox: 21,
      duracionSeg: 10
    },
    {
      slideNumber: 7,
      tituloMomento: "Puente a la Conversación",
      visualPrompt: "Modern anime style. Minimalist clean composition showing the StudioSimple emblem, the submarine resting at its final depth, and an invitation to analyze.",
      overlayText: "StudioSimple · Matemática 7° Básico",
      speakerNotes: "No respondas todavía. Vamos a pensar juntos en el recorrido para descubrir la respuesta exacta paso a paso.",
      palabrasAprox: 18,
      duracionSeg: 8
    }
  ];

  const explicativoSlides: SlidePrompt[] = [
    {
      slideNumber: 1,
      tituloMomento: "Definición de Posición y Movimiento",
      visualPrompt: "Modern anime style 16:9. The boy and girl standing before a sleek interactive lightboard with two clearly contrasting columns: 'Posición' and 'Movimiento'. Clean modern typography, soft teal and amber lighting.",
      overlayText: "¿Posición o Movimiento?",
      speakerNotes: "Para comprender los números enteros, necesitamos distinguir con total claridad dos ideas fundamentales: qué es una posición y qué es un movimiento.",
      palabrasAprox: 21,
      duracionSeg: 11
    },
    {
      slideNumber: 2,
      tituloMomento: "Qué es una Posición",
      visualPrompt: "Modern anime style. The girl pointing at a single illuminated dot at −20 m on a vertical depth axis. Negative space for clean reading.",
      overlayText: "Posición: Dónde se encuentra un objeto",
      speakerNotes: "Una posición indica el lugar exacto donde se encuentra algo en relación con un punto de referencia fijo, como la superficie del mar.",
      palabrasAprox: 22,
      duracionSeg: 11
    },
    {
      slideNumber: 3,
      tituloMomento: "Ejemplo Real de Posición",
      visualPrompt: "Modern anime style. Submarine static at twenty meters depth. Callout box pointing to it: 'Posición = −20 m'.",
      overlayText: "Ejemplo: El submarino está a −20 m",
      speakerNotes: "Estar a menos veinte metros es una posición, porque nos dice dónde está el submarino sin que se esté moviendo en ese momento.",
      palabrasAprox: 22,
      duracionSeg: 11
    },
    {
      slideNumber: 4,
      tituloMomento: "Qué es un Movimiento",
      visualPrompt: "Modern anime style. The boy illustrating a vertical arrow with motion lines, showing an active shift from one level to another.",
      overlayText: "Movimiento: Cómo cambia de lugar",
      speakerNotes: "Un movimiento indica una acción de cambio de lugar. Señala hacia dónde se traslada el objeto y qué distancia recorre.",
      palabrasAprox: 20,
      duracionSeg: 10
    },
    {
      slideNumber: 5,
      tituloMomento: "Ejemplo Real de Movimiento",
      visualPrompt: "Modern anime style. Submarine moving downward with an active measurement arrow indicating 'Baja 15 m'.",
      overlayText: "Ejemplo: El submarino baja 15 m",
      speakerNotes: "Bajar quince metros es un movimiento, porque describe un desplazamiento activo y una distancia recorrida desde un punto hacia otro.",
      palabrasAprox: 19,
      duracionSeg: 10
    },
    {
      slideNumber: 6,
      tituloMomento: "Comparación Lado a Lado",
      visualPrompt: "Modern anime style. Split screen diagram: Left side shows 'Está a −20 m (Ubicación)'; Right side shows 'Baja 15 m (Desplazamiento)'. High contrast, crystal clarity.",
      overlayText: "Ubicación vs. Desplazamiento",
      speakerNotes: "Recuerda esta distinción: una posición dice 'dónde estás'; un movimiento dice 'hacia dónde te mueves y cuánto avanzas'.",
      palabrasAprox: 17,
      duracionSeg: 9
    },
    {
      slideNumber: 7,
      tituloMomento: "Síntesis y Regla del Signo",
      visualPrompt: "Modern anime style. Both students with their open notebooks and pencils ready, smiling confidently in the bright classroom.",
      overlayText: "¡Ahora a practicar en el cuaderno!",
      speakerNotes: "El cero marca el punto de partida. Con esta regla clara, estás listo para clasificar cualquier situación cotidiana junto a tu mentor.",
      palabrasAprox: 20,
      duracionSeg: 10
    }
  ];

  return {
    num: 1,
    title: "Posiciones y movimientos respecto de un punto de referencia",
    focoDidactico: "Distinguir entre posición y movimiento usando el cero como punto de referencia",
    routeToday: "Introducción → conexión inicial → video introductorio → conversación guiada → video explicativo → práctica → comparación → estrategia para pensar → resumen → miniquiz → refuerzo si es necesario → cierre.",
    duracion: "30-35 Minutos",
    objetivoAdulto: "Guiar al estudiante para que comprenda que los números enteros representan posiciones respecto de un punto de referencia y distinga entre posición y movimiento.",
    climaEmocional: "Crea un clima seguro: 'Aquí equivocarse es la mejor pista para entender cómo funciona la regla'.",
    situacionIntro: {
      dialogo: "Observa este termómetro. Tomaremos 0 °C como punto de referencia. Una temperatura de tres grados sobre cero es positiva: podemos escribirla como 3 °C o, si queremos mostrar expresamente su signo, como +3 °C. Ahora pensemos: ¿qué número entero representa una temperatura de tres grados bajo cero?",
      pregunta: "¿Qué número entero representa una temperatura de tres grados bajo cero?",
      respEsperada: "−3",
      pistaSocratica: "0 °C se lee “cero grados Celsius”. El número 3 indica la cantidad de grados. Para representar que está bajo cero usamos el signo menos. ¿Qué número entero representa esa posición?"
    },
    paso2_hook: {
      titulo: "El recorrido del submarino",
      fullPrompt: buildHookPromptText("Matemática", "OA 1", 1, "Posiciones y movimientos respecto de un punto de referencia", hookSlides),
      slides: hookSlides,
      videoUrl: "https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/110-7-MAT-OA01-L01-MOTIVACIONAL_V9_LEGIBLE.mp4",
      dileAntes: "Ahora veremos un video sobre el recorrido de un submarino. Mientras lo ves, fíjate en tres cosas: dónde comienza el submarino, cuánto baja y cuánto sube.",
      dileDespues: "Conversemos sobre lo que acabamos de ver. Te haré dos preguntas para que juntos comprendamos mejor el recorrido del submarino."
    },
    paso3_recorrido: [
      {
        context: "Punto de referencia",
        question: "En el recorrido del submarino, ¿qué lugar representa el cero?",
        expected: "La superficie del mar representa el cero.",
        success: "¡Muy bien! En este recorrido usamos la superficie del mar como punto de referencia y la representamos con el número cero.",
        support: "Recuerda que la profundidad comienza a medirse desde la superficie del mar. Ese es el lugar desde donde contamos cuántos metros baja el submarino. Con esta pista, ¿qué lugar representa el cero?",
        reveal: "En este recorrido, la superficie del mar representa el cero porque desde allí comenzamos a medir la profundidad.",
        studentReveal: "La superficie del mar representa el cero."
      },
      {
        context: "Ubicación del submarino",
        question: "¿Qué significa que el submarino se encuentre a −20 m?",
        expected: "El submarino se encuentra veinte metros bajo la superficie del mar.",
        success: "¡Exacto! Significa que el submarino se encuentra veinte metros bajo la superficie del mar, que usamos como punto de referencia. Como −20 m nos indica dónde se encuentra, decimos que representa una posición.",
        support: "Recuerda que la superficie del mar representa el cero. En −20 m, el signo negativo indica que el submarino está debajo de ese punto y el número 20 indica la distancia desde el cero hasta el submarino. Con esta pista, ¿qué significa −20 m?",
        reveal: "−20 m significa que el submarino se encuentra veinte metros bajo la superficie del mar. Esta información representa su posición.",
        studentReveal: "El submarino está veinte metros bajo la superficie. Esa es su posición."
      }
    ],
    paso4_explicativo: {
      titulo: "Aprendamos sobre posición y movimiento",
      fullPrompt: buildExplicativoPromptText("Matemática", "OA 1", 1, "Posiciones y movimientos respecto de un punto de referencia", explicativoSlides),
      slides: explicativoSlides,
      videoUrl: "https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/110-7/MAT/MAT_OA01_L01_Concepto.mp4",
      ideaClave: "Una posición indica dónde se encuentra algo respecto de un punto de referencia; un movimiento indica cómo cambia de lugar, hacia dónde se desplaza y qué distancia recorre.",
      dileAntes: "Ya identificamos el punto de referencia de este recorrido y comprendimos que menos veinte metros indica dónde se encuentra el submarino. A eso lo llamamos una posición. Ahora veremos un video para aprender qué es un movimiento y cómo distinguirlo de una posición."
    },
    paso5_practica: [
      {
        context: "Temperatura",
        question: "Un termómetro marca cuatro grados Celsius bajo cero. ¿Qué número entero representa esa temperatura?",
        expected: "−4",
        success: "¡Muy bien! El número entero es −4. El signo negativo indica que la temperatura está bajo cero.",
        support: "Recuerda que las cantidades bajo cero se representan con un signo negativo. Conservamos el número 4 y agregamos ese signo. Entonces, ¿qué número entero representa la temperatura?",
        reveal: "El número entero es −4: el 4 indica la cantidad de grados y el signo negativo indica que están bajo cero.",
        studentReveal: "−4"
      },
      {
        context: "Ascensor",
        question: "Un ascensor baja cinco pisos. En esta frase, ¿se está representando una posición o un movimiento?",
        expected: "Un movimiento.",
        success: "¡Genial! Representa un movimiento porque indica cómo cambia de lugar el ascensor.",
        support: "Fíjate en la palabra “baja”: indica que el ascensor cambia de lugar. Con esta pista, responde la misma pregunta.",
        reveal: "Representa un movimiento porque “baja cinco pisos” indica cómo cambia de lugar el ascensor.",
        studentReveal: "Un movimiento."
      },
      {
        context: "Saldo de una cuenta",
        question: "Si una cuenta bancaria tiene un saldo de menos cinco mil pesos, ¿qué significa el signo negativo?",
        expected: "Significa que existe una deuda de cinco mil pesos.",
        success: "¡Excelente! En esta situación, el signo negativo indica que existe una deuda de cinco mil pesos.",
        support: "En una cuenta bancaria, un saldo positivo indica dinero disponible y un saldo negativo indica una deuda. Con esta pista, ¿qué significa el signo negativo?",
        reveal: "El signo negativo indica que existe una deuda de cinco mil pesos. Aquí su significado depende del contexto.",
        studentReveal: "Existe una deuda de $5.000."
      }
    ],
    paso6_resumen: {
      ideaClave: "En este recorrido usamos la superficie del mar como punto de referencia y la representamos con el número cero. Una posición indica dónde se encuentra algo respecto de ese punto; un movimiento indica cómo cambia de lugar, hacia dónde se mueve y qué distancia recorre.",
      sintesis: "El cero marca el punto de referencia. Las posiciones sobre o bajo cero se distinguen por el signo. Los movimientos indican desplazamientos."
    },
    paso7_miniquiz: [
      {
        q: "Un buzo se encuentra siete metros bajo la superficie del mar. Si la superficie representa el cero, ¿qué número entero representa la posición del buzo?",
        options: ["−7", "+7", "7"],
        correct: "−7",
        fixExplain: "La superficie representa el cero. Como el buzo está siete metros debajo, usamos el signo negativo: la respuesta es −7."
      },
      {
        q: "Un ascensor sube seis pisos. Esta frase, ¿representa una posición o un movimiento?",
        options: ["Una posición", "Un movimiento"],
        correct: "Un movimiento",
        fixExplain: "La palabra “sube” indica que el ascensor cambia de lugar. Por eso representa un movimiento."
      },
      {
        q: "En una cuenta bancaria aparece un saldo de −$8.000. ¿Qué situación representa ese saldo?",
        options: ["Hay $8.000 disponibles", "Hay una deuda de $8.000", "No hay dinero disponible ni una deuda"],
        correct: "Hay una deuda de $8.000",
        fixExplain: "En este contexto, el signo negativo indica una deuda. Por eso −$8.000 representa una deuda de $8.000."
      }
    ],
    paso7b_recuperacion: [
      {
        title: "Posiciones bajo el punto de referencia",
        explain: "Cuando una posición está debajo del punto de referencia, utilizamos un número negativo.",
        q: "Una entrada está cinco metros bajo el nivel de la calle, que representa el cero. ¿Qué entero representa su posición?",
        options: ["−5", "+5"],
        correct: "−5",
        correctText: "¡Eso es! La posición se representa con −5.",
        fixText: "La respuesta correcta es −5: el signo negativo indica que está bajo el punto de referencia."
      },
      {
        title: "Posición y movimiento",
        explain: "Una posición dice dónde está algo. Un movimiento dice cómo cambia de lugar.",
        q: "Un globo sube cuatro metros. ¿Representa una posición o un movimiento?",
        options: ["Una posición", "Un movimiento"],
        correct: "Un movimiento",
        correctText: "¡Eso es! Subir cuatro metros representa un movimiento.",
        fixText: "La respuesta correcta es movimiento, porque “sube” indica un cambio de lugar."
      },
      {
        title: "Significado del signo negativo",
        explain: "El significado del signo depende del contexto. En una temperatura, puede indicar que está bajo cero.",
        q: "Una temperatura de −2 °C está…",
        options: ["Dos grados bajo cero", "Dos grados sobre cero"],
        correct: "Dos grados bajo cero",
        correctText: "¡Eso es! −2 °C significa dos grados bajo cero.",
        fixText: "La respuesta correcta es dos grados bajo cero."
      }
    ],
    paso8_cierre: {
      preguntaSintesis: "En tus propias palabras, ¿qué diferencia hay entre dónde estás (posición) y hacia dónde te trasladas (movimiento)?",
      metacognicion: "¿Qué situación de la vida diaria te ayudó más a entender el punto de referencia cero: el termómetro, el ascensor o el submarino?",
      celebracion: "¡Felicitaciones! Has completado con éxito la primera clase de números enteros de 7° básico."
    }
  };
}

/**
 * Helper to build canonical Lesson 2 of Mathematics Grade 7 OA01 directly from the tested prototype
 */
export function getCanonicalClase2Matematica(): LessonData {
  const hookSlides: SlidePrompt[] = [
    {
      slideNumber: 1,
      tituloMomento: "Apertura en el Puesto de Mando",
      visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers examining a glowing digital navigation board on their vessel. Altitude and depth measurements appear on screen. Clear calm sea visible through windows.",
      overlayText: "Misión 2: La recta numérica y orden en Z",
      speakerNotes: "Los registros de navegación combinan alturas sobre el nivel del mar y profundidades marinas en una misma pantalla.",
      palabrasAprox: 18,
      duracionSeg: 9
    },
    {
      slideNumber: 2,
      tituloMomento: "El Desafío de Ordenar Datos",
      visualPrompt: "Modern anime style. The girl pointing at conflicting numbers: +3 m, −6 m, 0 m, −1 m. High contrast, clean layout.",
      overlayText: "El problema: ¿Qué valor es mayor?",
      speakerNotes: "Al comparar números positivos y negativos, necesitamos un criterio único y seguro que evite confusiones.",
      palabrasAprox: 17,
      duracionSeg: 9
    },
    {
      slideNumber: 3,
      tituloMomento: "Trazando la Recta Numérica",
      visualPrompt: "Modern anime style. The boy drawing a horizontal line with the zero glowing at the exact center. Arrows pointing both ways.",
      overlayText: "La línea continua: El cero al centro",
      speakerNotes: "Trazamos una recta numérica horizontal. El cero se ubica al centro como punto de partida indiscutible.",
      palabrasAprox: 18,
      duracionSeg: 9
    },
    {
      slideNumber: 4,
      tituloMomento: "Positivos a la Derecha",
      visualPrompt: "Modern anime style. Warm orange markers glowing at +1, +2, +3 moving towards the right.",
      overlayText: "Hacia la derecha: Valores positivos (+)",
      speakerNotes: "A la derecha del cero se ubican los números positivos, aumentando su valor a medida que avanzamos.",
      palabrasAprox: 18,
      duracionSeg: 9
    },
    {
      slideNumber: 5,
      tituloMomento: "Negativos a la Izquierda",
      visualPrompt: "Modern anime style. Cool cyan markers glowing at −1, −2, −3 extending towards the left.",
      overlayText: "Hacia la izquierda: Valores negativos (−)",
      speakerNotes: "A la izquierda del cero se ubican los números negativos, alejándose del centro con el signo menos.",
      palabrasAprox: 18,
      duracionSeg: 9
    },
    {
      slideNumber: 6,
      tituloMomento: "La Regla de Oro del Orden",
      visualPrompt: "Modern anime style. Side-by-side comparison with a large glowing arrow pointing to the right: 'Mayor hacia la derecha'.",
      overlayText: "Regla de Oro: Mayor hacia la derecha",
      speakerNotes: "Cualquier número situado a la derecha de otro en la recta horizontal es siempre mayor que el de la izquierda.",
      palabrasAprox: 19,
      duracionSeg: 10
    },
    {
      slideNumber: 7,
      tituloMomento: "Listo para Comparar",
      visualPrompt: "Modern anime style. Both explorers confident with their notebooks open and pencil ready to compare numbers.",
      overlayText: "¡A comparar y ordenar en el cuaderno!",
      speakerNotes: "Con la recta numérica clara, ahora puedes ordenar cualquier conjunto de números enteros sin dudar.",
      palabrasAprox: 17,
      duracionSeg: 8
    }
  ];

  const explicativoSlides: SlidePrompt[] = [
    {
      slideNumber: 1,
      tituloMomento: "La Recta Numérica Horizontal",
      visualPrompt: "Modern anime style. A crisp horizontal line across the center of the whiteboard with zero marked prominently in teal.",
      overlayText: "El cero divide la recta",
      speakerNotes: "El cero divide la recta en dos semirrectas: a su derecha los enteros positivos y a su izquierda los enteros negativos.",
      palabrasAprox: 21,
      duracionSeg: 10
    },
    {
      slideNumber: 2,
      tituloMomento: "Sentido Creciente de la Recta",
      visualPrompt: "Modern anime style. A gradient arrow flowing from left to right with the label 'Aumenta el valor'.",
      overlayText: "El valor aumenta hacia la derecha",
      speakerNotes: "La recta numérica avanza de menor a mayor de izquierda a derecha. Estar más a la derecha significa ser mayor.",
      palabrasAprox: 19,
      duracionSeg: 10
    },
    {
      slideNumber: 3,
      tituloMomento: "Comparando un Positivo y un Negativo",
      visualPrompt: "Modern anime style. Comparing +2 and −4. Diagram highlights +2 on the right and −4 on the left.",
      overlayText: "+2 está a la derecha de −4: +2 > −4",
      speakerNotes: "Cualquier número positivo es siempre mayor que cualquier número negativo porque siempre está a la derecha del cero.",
      palabrasAprox: 19,
      duracionSeg: 10
    },
    {
      slideNumber: 4,
      tituloMomento: "Comparando Dos Negativos",
      visualPrompt: "Modern anime style. Focus on −2 and −5. The distance to zero is visually measured.",
      overlayText: "Comparando −2 y −5",
      speakerNotes: "¿Qué número es mayor entre menos dos y menos cinco? Pensemos cuál de los dos se ubica más hacia la derecha.",
      palabrasAprox: 20,
      duracionSeg: 10
    },
    {
      slideNumber: 5,
      tituloMomento: "Cercanía al Cero en los Negativos",
      visualPrompt: "Modern anime style. −2 is only 2 steps from zero, while −5 is 5 steps away. −2 is further to the right.",
      overlayText: "−2 está más a la derecha que −5: −2 > −5",
      speakerNotes: "Menos dos está más cerca del cero y a la derecha de menos cinco. Por la regla de la recta, menos dos es mayor.",
      palabrasAprox: 22,
      duracionSeg: 11
    },
    {
      slideNumber: 6,
      tituloMomento: "Estrategia en 3 Pasos",
      visualPrompt: "Modern anime style. 3-step numbered infographic: 1. Ubica, 2. Compara, 3. Concluye.",
      overlayText: "1. Ubica · 2. Compara · 3. Concluye",
      speakerNotes: "Primero ubica los números, luego mira cuál está a la derecha, y finalmente concluye que el de la derecha es mayor.",
      palabrasAprox: 20,
      duracionSeg: 10
    },
    {
      slideNumber: 7,
      tituloMomento: "Síntesis al Cuaderno",
      visualPrompt: "Modern anime style. Both students ready with notebook open showing the number line drawn cleanly.",
      overlayText: "¡Dibuja tu recta en el cuaderno!",
      speakerNotes: "Traza tu recta en el cuaderno y compruébalo tú mismo. ¡Todo número a la derecha es mayor!",
      palabrasAprox: 17,
      duracionSeg: 9
    }
  ];

  return {
    num: 2,
    title: "La recta numérica y orden en Z",
    focoDidactico: "Ordenar y comparar números enteros en la recta numérica usando la noción de distancia",
    routeToday: "Introducción → conexión inicial → situación problema en la recta → conversación guiada → explicación formal del orden → práctica en tres situaciones → comparación de magnitudes → estrategia para ordenar → resumen → miniquiz formativo → refuerzo si es necesario → cierre.",
    duracion: "30 Minutos",
    objetivoAdulto: "Acompañar al estudiante a representar números enteros en la recta numérica horizontal y vertical, y a comparar y ordenar números enteros comprendiendo que todo número ubicado a la derecha de otro en la recta numérica horizontal es mayor.",
    climaEmocional: "Refuerza la confianza: 'Ordenar números negativos puede parecer confuso al principio, pero la recta nunca miente'.",
    situacionIntro: {
      dialogo: "Imagina una recta numérica horizontal donde el centro es el número cero. A la derecha avanzan los números positivos (+1, +2, +3...) y a la izquierda avanzan los números negativos (−1, −2, −3...). Si te ubicas en el número −2 y caminas hacia el número −5, ¿te estás moviendo hacia la izquierda o hacia la derecha?",
      pregunta: "¿Te estás moviendo hacia la izquierda o hacia la derecha al ir de −2 a −5?",
      respEsperada: "Hacia la izquierda",
      pistaSocratica: "Los números negativos se alejan del cero hacia la izquierda: −1, −2, −3, −4, −5. Para ir de −2 a −5 nos movemos hacia la izquierda.",
      options: [
        {
          label: "Respondió hacia la izquierda",
          kind: "correct",
          feedbackText: "¡Correcto! Para ir desde −2 hasta −5 nos movemos hacia la izquierda, alejándonos del cero."
        },
        {
          label: "Respondió hacia la derecha",
          kind: "needs_support",
          feedbackText: "Pensemos en el camino: el cero está en el centro. El −2 está dos pasos a la izquierda. Para llegar a −5 avanzamos más a la izquierda."
        }
      ]
    },
    paso2_hook: {
      titulo: "La recta numérica y el orden de los números",
      fullPrompt: buildHookPromptText("Matemática", "OA 1", 2, "La recta numérica y orden en Z", hookSlides),
      slides: hookSlides,
      dileAntes: "Hoy nuestros dos exploradores necesitan organizar registros de temperaturas y alturas en un tablero de navegación. Observa con atención cómo ordenan los números.",
      dileDespues: "Conversemos sobre lo observado. Te haré dos preguntas para comprobar cómo organizamos los números en la recta."
    },
    paso3_recorrido: [
      {
        context: "Ubicación en la recta",
        question: "En una recta numérica horizontal con el cero al centro, ¿hacia qué lado se ubican los números negativos?",
        expected: "Hacia la izquierda del cero.",
        success: "¡Muy bien! Los números negativos se ubican siempre a la izquierda del cero.",
        support: "Recuerda que a la derecha del cero van los positivos. ¿Hacia qué lado van los negativos?",
        reveal: "Los números negativos se ubican siempre a la izquierda del cero.",
        studentReveal: "A la izquierda del cero."
      },
      {
        context: "Cercanía al origen",
        question: "Entre el número −1 y el número −4, ¿cuál de los dos se encuentra más cerca del cero?",
        expected: "El número −1 está más cerca del cero.",
        success: "¡Exacto! El −1 está a un solo paso del cero, mientras que el −4 está a cuatro pasos.",
        support: "Cuenta cuántos pasos hay desde el cero hasta el −1 y cuántos hasta el −4. ¿Cuál está más cerca?",
        reveal: "El número −1 está más cerca del cero porque solo dista una unidad del origen.",
        studentReveal: "El número −1 está más cerca del cero."
      }
    ],
    paso4_explicativo: {
      titulo: "Criterio de orden en la recta numérica",
      fullPrompt: buildExplicativoPromptText("Matemática", "OA 1", 2, "La recta numérica y orden en Z", explicativoSlides),
      slides: explicativoSlides,
      ideaClave: "Todo número ubicado a la derecha de otro en la recta numérica horizontal es mayor que él.",
      dileAntes: "Ahora aprenderemos la regla fundamental para comparar cualquier pareja de números enteros: la regla de la derecha."
    },
    paso5_practica: [
      {
        context: "Temperaturas en la montaña",
        question: "En un refugio cordillerano se registran dos temperaturas: −3 °C en la mañana y −8 °C en la noche. ¿Cuál de las dos temperaturas fue más alta (mayor)?",
        expected: "−3 °C fue más alta porque −3 es mayor que −8.",
        success: "¡Muy bien! −3 °C representa una temperatura mayor (menos fría) que −8 °C.",
        support: "Piensa cuál de las dos temperaturas está más cerca del cero en la recta: −3 está a la derecha de −8. ¿Cuál es mayor?",
        reveal: "−3 °C es mayor que −8 °C porque está más a la derecha en la escala térmica.",
        studentReveal: "−3 °C es mayor."
      },
      {
        context: "Niveles de estacionamiento",
        question: "Un edificio tiene tres subterráneos: piso −1, piso −2 y piso −3. Si subes desde el piso −3 hasta el piso −1, ¿estás subiendo hacia un nivel mayor o menor?",
        expected: "Hacia un nivel mayor, porque −1 es mayor que −3.",
        success: "¡Genial! El piso −1 está más cerca de la superficie (cero) y es un nivel mayor que el piso −3.",
        support: "Al subir te acercas a la calle (piso 0). Subir significa aumentar de nivel. ¿El nivel es mayor o menor?",
        reveal: "Es un nivel mayor porque −1 > −3. Al subir avanzamos hacia valores mayores.",
        studentReveal: "Hacia un nivel mayor."
      },
      {
        context: "Orden de cuatro valores",
        question: "Ordena de menor a mayor los siguientes cuatro números enteros: +3, −6, 0, −1.",
        expected: "−6, −1, 0, +3",
        success: "¡Excelente ordenamiento! Leíste los números de izquierda a derecha en la recta numérica.",
        support: "Busca el número que esté más a la izquierda de todos en la recta: ese es el menor. Luego sigue hacia la derecha.",
        reveal: "El orden de menor a mayor es: −6, −1, 0, +3.",
        studentReveal: "−6, −1, 0, +3"
      }
    ],
    paso6_resumen: {
      ideaClave: "En la recta numérica, el cero se ubica al centro; los positivos avanzan a la derecha y los negativos a la izquierda. Todo número a la derecha es mayor.",
      sintesis: "En esta clase aprendimos que la recta numérica organiza todos los números enteros en una sola dimensión continua. La regla principal establece que cualquier número situado más a la derecha siempre es mayor que los que están a su izquierda.",
      estrategia: [
        { number: 1, title: "Ubica", desc: "Sitúa cada número en la recta numérica tomando el cero como centro." },
        { number: 2, title: "Compara", desc: "Observa cuál de los números se encuentra ubicado más hacia la derecha." },
        { number: 3, title: "Concluye", desc: "El número que está a la derecha siempre es el mayor, sin importar sus signos." }
      ]
    },
    paso7_miniquiz: [
      {
        q: "En una recta numérica horizontal, ¿dónde se ubican los números negativos?",
        options: [
          "A la izquierda del cero",
          "A la derecha del cero",
          "En el centro reemplazando al cero"
        ],
        correct: "A la izquierda del cero",
        fixExplain: "En la recta numérica horizontal, el cero está en el centro: a su derecha van los positivos y a su izquierda los negativos."
      },
      {
        q: "Al comparar los números −9 y −3, ¿cuál de ellos es el mayor?",
        options: [
          "−3",
          "−9",
          "Son iguales porque ambos son negativos"
        ],
        correct: "−3",
        fixExplain: "El número −3 es mayor porque en la recta numérica está ubicado más hacia la derecha (más cerca del cero) que el −9."
      },
      {
        q: "¿Cuál de las siguientes listas está correctamente ordenada de menor a mayor?",
        options: [
          "−7, −2, 0, +5",
          "+5, 0, −2, −7",
          "0, −2, +5, −7"
        ],
        correct: "−7, −2, 0, +5",
        fixExplain: "De menor a mayor se lee de izquierda a derecha en la recta: −7 es el más pequeño, luego −2, después 0 y finalmente +5."
      }
    ],
    paso7b_recuperacion: [
      {
        title: "Orden entre números negativos",
        explain: "Entre dos números negativos, siempre es mayor el que se encuentra más cerca del cero en la recta numérica.",
        q: "Entre −10 y −1, ¿cuál número es mayor?",
        options: [
          "−1",
          "−10"
        ],
        correct: "−1",
        correctText: "¡Eso es! El −1 es mayor porque está a solo un paso del cero, mucho más a la derecha que el −10.",
        fixText: "La respuesta correcta es −1, porque en la recta numérica está ubicado más a la derecha que el −10."
      }
    ],
    paso8_cierre: {
      preguntaSintesis: "¿Por qué en los números negativos un número con mayor dígito (como −9) tiene menor valor que uno con dígito menor (como −3)?",
      metacognicion: "¿Qué imagen mental te ayudó más hoy: el termómetro vertical, la recta horizontal o los pisos del edificio subterráneo?",
      celebracion: "¡Excelente! Has dominado el orden de los números enteros en la recta numérica."
    }
  };
}


/**
 * Helper to build canonical Lesson 1 of Lengua y Literatura Grade 7 OA03
 */
export function getCanonicalClase1Lengua(): LessonData {
  const hookSlides: SlidePrompt[] = [
    {
      slideNumber: 1,
      tituloMomento: "Apertura: El Mundo Ordinario",
      visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, studying in a quiet, sunlit village library filled with ancient scrolls and comfortable wooden desks. Warm morning light, negative space in upper third.",
      overlayText: "Misión 1: Las 6 Etapas del Viaje del Héroe",
      speakerNotes: "Toda gran historia comienza en la calma. Nuestro protagonista vive en un mundo conocido donde todo parece seguro y predecible.",
      palabrasAprox: 20,
      duracionSeg: 9
    },
    {
      slideNumber: 2,
      tituloMomento: "El Quiebre: La Llamada a la Aventura",
      visualPrompt: "Modern anime style. The two companions looking startled as a mysterious glowing letter arrives on the table, surrounded by subtle wind swirls. Clean lineart, dramatic lighting, clear space on the left side.",
      overlayText: "Etapa 2: La Llamada a la Aventura",
      speakerNotes: "De pronto, la tranquilidad se rompe. Un suceso inesperado o una amenaza urgente obliga al héroe a tomar una decisión crucial.",
      palabrasAprox: 21,
      duracionSeg: 10
    },
    {
      slideNumber: 3,
      tituloMomento: "El Encuentro con el Mentor",
      visualPrompt: "Modern anime style. A wise elderly librarian mentor handing the young protagonists an ancient compass and a leather-bound journal. Soft depth of field, warm candlelight.",
      overlayText: "El Consejo del Mentor",
      speakerNotes: "Sentir miedo es natural frente a lo desconocido. Un mentor experimentado entrega sabiduría y la herramienta clave para iniciar la expedición.",
      palabrasAprox: 21,
      duracionSeg: 10
    },
    {
      slideNumber: 4,
      tituloMomento: "El Cruce del Primer Umbral",
      visualPrompt: "Modern anime style. The two young protagonists stepping across a stone archway into a mysterious twilight forest with glowing flora. Dramatic atmospheric lighting.",
      overlayText: "Etapa 3: El Cruce del Umbral",
      speakerNotes: "El héroe deja atrás su hogar seguro y cruza la frontera hacia un mundo nuevo donde las reglas del juego son desafiantes.",
      palabrasAprox: 22,
      duracionSeg: 10
    },
    {
      slideNumber: 5,
      tituloMomento: "Pruebas, Aliados y Obstáculos",
      visualPrompt: "Modern anime style. The boy and girl working side by side with a loyal animal companion, deciphering a stone puzzle gate while rain falls softly. Vibrant colors, focused determination.",
      overlayText: "Etapa 4: Pruebas y Aliados",
      speakerNotes: "En el camino enfrentan dificultades crecientes, descubren quiénes son sus verdaderos aliados y aprenden a confiar en sus propias fortalezas.",
      palabrasAprox: 20,
      duracionSeg: 10
    },
    {
      slideNumber: 6,
      tituloMomento: "El Abismo: La Prueba Suprema",
      visualPrompt: "Modern anime style. Dramatic confrontation in a cavern illuminated by a deep blue glowing crystal. High tension, expressive faces showing courage despite fear.",
      overlayText: "Etapa 5: El Abismo / Prueba Suprema",
      speakerNotes: "Llega el momento decisivo: enfrentar su mayor temor. De esta prueba suprema depende resolver el conflicto y salvar a su comunidad.",
      palabrasAprox: 22,
      duracionSeg: 10
    },
    {
      slideNumber: 7,
      tituloMomento: "El Regreso Transformado",
      visualPrompt: "Modern anime style. Minimalist clean composition showing the StudioSimple emblem, the hero returning to the sunrise holding the light of knowledge, wiser and smiling.",
      overlayText: "Etapa 6: El Regreso con el Elíxir",
      speakerNotes: "El héroe no vuelve siendo el mismo: regresa transformado con una valiosa lección y sabiduría que enriquecerá a todos.",
      palabrasAprox: 19,
      duracionSeg: 9
    }
  ];

  const explicativoSlides: SlidePrompt[] = [
    {
      slideNumber: 1,
      tituloMomento: "El Conflicto como Motor Narrativo",
      visualPrompt: "Modern anime style 16:9. The boy and girl standing before an interactive lightboard showing a dynamic balance scale: 'Equilibrio Inicial' vs 'Conflicto Detonante'. Clean typography.",
      overlayText: "¿Qué es el Conflicto Narrativo?",
      speakerNotes: "Para comprender un relato, debemos reconocer su motor: el conflicto narrativo es el problema o quiebre que obliga a los personajes a actuar.",
      palabrasAprox: 22,
      duracionSeg: 11
    },
    {
      slideNumber: 2,
      tituloMomento: "Fuerzas en Oposición",
      visualPrompt: "Modern anime style. Split screen diagram: Left side shows the protagonist's goal; Right side shows the opposing obstacle or antagonist. High contrast, sharp clarity.",
      overlayText: "Protagonista vs. Fuerza Opositora",
      speakerNotes: "Toda trama enfrenta dos fuerzas: el deseo del protagonista por alcanzar una meta y los obstáculos que se interponen en su camino.",
      palabrasAprox: 21,
      duracionSeg: 10
    },
    {
      slideNumber: 3,
      tituloMomento: "Conflicto Externo",
      visualPrompt: "Modern anime style. The young adventurers navigating a stormy sea in a wooden boat, facing natural forces. Callout box: 'Conflicto Externo: El Entorno'.",
      overlayText: "Conflicto Externo: El Mundo",
      speakerNotes: "El conflicto externo proviene del entorno: un monstruo, un villano, una tormenta o una injusticia social que el personaje debe enfrentar.",
      palabrasAprox: 21,
      duracionSeg: 10
    },
    {
      slideNumber: 4,
      tituloMomento: "Conflicto Interno",
      visualPrompt: "Modern anime style. Close-up on the girl reflecting in front of a mirror, with subtle dual lighting representing doubt and courage. Callout box: 'Conflicto Interno: La Mente'.",
      overlayText: "Conflicto Interno: Las Emociones",
      speakerNotes: "El conflicto interno ocurre dentro del personaje: son sus dudas, culpas, temores o dilemas éticos que lo desafían a madurar.",
      palabrasAprox: 20,
      duracionSeg: 10
    },
    {
      slideNumber: 5,
      tituloMomento: "Progresión de la Tensión Dramática",
      visualPrompt: "Modern anime style. The boy tracing a clean glowing narrative curve that rises from the Call to the Abyss and resolves at the Return.",
      overlayText: "La Curva de Tensión Dramática",
      speakerNotes: "A medida que el conflicto se intensifica, la tensión dramática sube hasta alcanzar el clímax en la prueba suprema del abismo.",
      palabrasAprox: 21,
      duracionSeg: 10
    },
    {
      slideNumber: 6,
      tituloMomento: "La Transformación del Personaje",
      visualPrompt: "Modern anime style. Side-by-side comparison of the young explorer: before the journey (timid, insecure) and after (confident, noble, mature).",
      overlayText: "La Huella de la Experiencia",
      speakerNotes: "Las dificultades no solo entretienen: transforman al personaje. Al superar las pruebas, el héroe adquiere nueva madurez y valores.",
      palabrasAprox: 18,
      duracionSeg: 9
    },
    {
      slideNumber: 7,
      tituloMomento: "Síntesis y Aplicación en el Cuaderno",
      visualPrompt: "Modern anime style. Both students with their open literature notebooks and fountain pens, smiling ready to analyze stories.",
      overlayText: "¡A analizar relatos en el cuaderno!",
      speakerNotes: "Ahora que conoces la estructura del viaje y el papel del conflicto, estás listo para analizar cualquier obra literaria junto a tu mentor.",
      palabrasAprox: 22,
      duracionSeg: 11
    }
  ];

  return {
    num: 1,
    title: "Las 6 Etapas del Viaje del Héroe",
    focoDidactico: "Identificar las 6 etapas del viaje del héroe y el conflicto narrativo como motor del relato",
    duracion: "30-35 Minutos",
    objetivoAdulto: "Acompañar al estudiante a reconocer la estructura de una narración a través de las 6 etapas del viaje del héroe, identificando cómo el conflicto narrativo impulsa las acciones de los personajes.",
    climaEmocional: "Crea un clima de disfrute por la lectura: 'Leer nos permite viajar a otros mundos, comprender los desafíos de los personajes y descubrir cómo resuelven sus problemas'.",
    situacionIntro: {
      dialogo: "Hoy en Lengua y Literatura nos adentramos en 'El conflicto narrativo y la trama de la historia'. En la pantalla puedes ver el organizador gráfico 'Las 6 Etapas del Viaje del Héroe'. Observa la Etapa 1 (Mundo Ordinario) y la Etapa 2 (La Llamada a la Aventura). ¿Qué suceso o problema rompe la calma cotidiana del protagonista y lo obliga a iniciar su historia?",
      pregunta: "¿Qué suceso rompe la calma del protagonista y lo obliga a salir a resolver el problema?",
      respEsperada: "El conflicto narrativo (surge un problema, desafío, peligro o misterio inesperado que altera la tranquilidad normal).",
      pistaSocratica: "Fíjate en la Etapa 2 en la pantalla: ¿qué aparece de repente para que el protagonista no pueda quedarse cómodo en su casa?"
    },
    paso2_hook: {
      titulo: "Las 6 etapas del viaje del héroe",
      fullPrompt: buildHookPromptText("Lengua y Literatura", "OA 3", 1, "Las 6 Etapas del Viaje del Héroe", hookSlides),
      slides: hookSlides,
      videoUrl: "",
      dileAntes: "Vamos a explorar cómo los grandes relatos de la literatura universal comparten esta misma estructura dramática en 6 momentos a través del viaje del héroe.",
      dileDespues: "Conversemos sobre lo observado. Te haré dos preguntas para comprobar cómo identificamos estas etapas en los relatos."
    },
    paso3_recorrido: [
      {
        context: "Mundo Ordinario vs La Llamada",
        question: "En las dos primeras etapas, ¿qué diferencia la vida del héroe en su Mundo Ordinario respecto de cuando recibe La Llamada a la Aventura?",
        expected: "En el Mundo Ordinario el personaje vive su rutina segura y conocida; con La Llamada recibe un desafío, peligro o misión que quiebra esa rutina y lo enfrenta a lo desconocido.",
        success: "¡Muy bien! Distinguiste con precisión la tranquilidad inicial del suceso detonante que quiebra la rutina.",
        support: "Piensa en cómo empieza una película o libro antes de que ocurra el incidente principal y qué pasa justo después.",
        reveal: "El Mundo Ordinario muestra la normalidad del personaje; La Llamada es el incidente que rompe esa calma e inicia la trama.",
        studentReveal: "El Mundo Ordinario muestra la rutina; La Llamada introduce el problema o misión que inicia la aventura."
      },
      {
        context: "El Abismo y el Clímax Dramático",
        question: "Observa la Etapa 5 en la pantalla: 'El Abismo'. ¿Por qué esta etapa representa el momento de mayor tensión en todo el relato?",
        expected: "Porque es la crisis más grande o batalla decisiva donde el héroe enfrenta su mayor peligro, parece estar a punto de perder y debe vencer sus temores para triunfar.",
        success: "¡Excelente análisis dramático! Identificaste el clímax donde se decide el destino del personaje.",
        support: "Fíjate en la descripción de la Etapa 5: es el momento culminante donde todo está en riesgo antes de resolver el conflicto.",
        reveal: "El Abismo es la prueba suprema del héroe: si fracasa allí, la historia termina en tragedia; si la supera, logra la transformación.",
        studentReveal: "El Abismo es la prueba más difícil donde el héroe arriesga todo para superar el conflicto."
      }
    ],
    paso4_explicativo: {
      titulo: "El conflicto narrativo: motor de la historia",
      fullPrompt: buildExplicativoPromptText("Lengua y Literatura", "OA 3", 1, "Las 6 Etapas del Viaje del Héroe", explicativoSlides),
      slides: explicativoSlides,
      videoUrl: "",
      ideaClave: "El conflicto narrativo es el obstáculo o fuerza contraria que enfrenta al protagonista y lo obliga a actuar. Sin conflicto no hay trama, y a través de las pruebas el héroe se transforma.",
      dileAntes: "Ahora formalizaremos la idea central sobre el conflicto narrativo y cómo estructura toda narración literaria."
    },
    paso5_practica: [
      {
        context: "Análisis de un Relato Conocido en el Cuaderno",
        question: "Abre tu cuaderno de Lengua y Literatura. Elige una película, serie o libro que conozcas bien (por ejemplo Harry Potter, El Rey León, Moana o El Señor de los Anillos). Escribe el título y anota: 1) Su Mundo Ordinario, 2) Su Llamada a la Aventura (cuál fue el conflicto), y 3) Su momento de Abismo (la prueba más dura).",
        expected: "Registro completo en el cuaderno con título y las 3 etapas identificadas con hechos concretos de la historia elegida.",
        success: "¡Excelente trabajo en tu cuaderno! Aplicaste las etapas del viaje del héroe a una historia real con hechos específicos.",
        support: "Escribe el nombre de la película y responde: ¿qué hacía al principio?, ¿qué problema lo obligó a salir de casa? y ¿cuál fue la batalla más difícil?",
        reveal: "Al aplicar este esquema a historias reales comprobamos que casi todas las obras maestras siguen esta estructura universal.",
        studentReveal: "Esquema de las 3 etapas del relato anotado con claridad en el cuaderno."
      },
      {
        context: "Creación de un Conflicto Narrativo Breve en el Cuaderno",
        question: "En tu cuaderno de Lengua, inventa un personaje original y redacta un párrafo de 4 a 5 líneas donde presentes su vida cotidiana y el momento exacto en que un conflicto inesperado interrumpe su día.",
        expected: "Párrafo narrativo con redacción clara, que describe una rutina cotidiana y luego introduce un conflicto detonante explícito.",
        success: "¡Gran creatividad narrativa! Creaste una tensión dramática muy clara que dan ganas de seguir leyendo.",
        support: "Empieza describiendo qué hace el personaje en una mañana común, y usa un conector de quiebre como 'De pronto...' o 'Sin embargo, esa tarde...'.",
        reveal: "Un buen inicio literario presenta la calma justo antes de quebrarla con un acontecimiento inesperado.",
        studentReveal: "Párrafo narrativo propio con conflicto detonante redactado en el cuaderno."
      }
    ],
    paso6_resumen: {
      ideaClave: "El conflicto narrativo es el motor que impulsa toda la trama. Las narraciones avanzan a través de las 6 etapas del viaje del héroe, llevando al personaje desde la calma cotidiana hasta la transformación personal.",
      sintesis: "Sin conflicto no hay historia. El obstáculo obliga al héroe a actuar, cruzar el umbral, superar el abismo y regresar con sabiduría."
    },
    paso7_miniquiz: [
      {
        q: "¿Cuál es la función principal del conflicto narrativo en un cuento o novela?",
        options: [
          "Describir el paisaje geográfico donde viven los personajes secundarios",
          "Romper el equilibrio inicial y motivar las acciones y decisiones del protagonista",
          "Enumerar los nombres de todos los autores que escribieron sobre el tema"
        ],
        correct: "Romper el equilibrio inicial y motivar las acciones y decisiones del protagonista",
        fixExplain: "El conflicto narrativo quiebra la tranquilidad inicial y obliga al protagonista a actuar, poniendo en movimiento toda la trama."
      },
      {
        q: "En el esquema del Viaje del Héroe, ¿qué sucede en la etapa de 'El Abismo'?",
        options: [
          "El protagonista descansa en su casa sin ninguna preocupación",
          "El protagonista enfrenta su mayor peligro o temor en el momento de máxima tensión",
          "El protagonista decide abandonar para siempre la aventura sin intentar nada"
        ],
        correct: "El protagonista enfrenta su mayor peligro o temor en el momento de máxima tensión",
        fixExplain: "El Abismo representa el clímax o crisis máxima: es el momento más difícil donde el héroe debe darlo todo para vencer el conflicto."
      },
      {
        q: "Si en un relato leemos que una capitana navega hacia una isla prohibida para rescatar a su tripulación secuestrada por piratas, ¿qué tipo de conflicto predomina en ese momento?",
        options: [
          "Un conflicto puramente gramatical sin personajes",
          "Un conflicto externo donde enfrenta a piratas y al mar para cumplir su misión",
          "La capitana no tiene ningún conflicto porque le gusta navegar"
        ],
        correct: "Un conflicto externo donde enfrenta a piratas y al mar para cumplir su misión",
        fixExplain: "Los piratas y los peligros del mar son fuerzas externas del entorno que amenazan a la protagonista y sus compañeros."
      }
    ],
    paso7b_recuperacion: [
      {
        title: "Refuerzo: El Incidente Detonante",
        explain: "Toda historia necesita un suceso que cambie las cosas. Si Caperucita se queda en su casa comiendo sopa, no hay cuento. El conflicto surge cuando debe cruzar el bosque peligroso y se encuentra con el lobo.",
        q: "¿Por qué la aparición del lobo en el camino de Caperucita es un conflicto narrativo?",
        options: [
          "Porque interrumpe su viaje seguro y genera un peligro directo que debe enfrentar",
          "Porque el lobo era un personaje que no tenía diálogo"
        ],
        correct: "Porque interrumpe su viaje seguro y genera un peligro directo que debe enfrentar",
        correctText: "¡Exacto! El lobo representa el obstáculo y la amenaza que crea la tensión de la historia.",
        fixText: "La respuesta correcta es: el lobo altera su trayecto pacífico y crea el peligro que da vida al cuento."
      }
    ],
    paso8_cierre: {
      preguntaSintesis: "En tus propias palabras, ¿por qué decimos que sin un conflicto no habría historia que contar?",
      metacognicion: "¿Qué película o libro conocido te ayudó a visualizar las 6 etapas del viaje del héroe?",
      celebracion: "¡Felicitaciones! Has dominado la primera lección de estructura narrativa y viaje del héroe de 7° básico."
    }
  };
}

/**
 * Helper to build canonical Lesson 1 of Ciencias Naturales Grade 7 OA01
 */
export function getCanonicalClase1Ciencias(): LessonData {
  const hookSlides: SlidePrompt[] = [
    {
      slideNumber: 1,
      tituloMomento: "Apertura: Más Allá de lo Biológico",
      visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, examining a glowing interactive holographic infographic of the 4 dimensions of human sexuality. Warm, inviting scientific atmosphere, negative space in top third.",
      overlayText: "Misión 1: Las 4 Dimensiones Humanas",
      speakerNotes: "La ciencia actual comprende la sexualidad como una vivencia integral que acompaña a la persona durante toda su vida.",
      palabrasAprox: 19,
      duracionSeg: 9
    },
    {
      slideNumber: 2,
      tituloMomento: "Dimensión 1: El Cuerpo Biológico",
      visualPrompt: "Modern anime style. Clean anatomical growth chart showing developmental milestones of puberty, height markers, and secondary sexual characteristics. High clarity, medical illustration style.",
      overlayText: "Dimensión Biológica: El Cuerpo",
      speakerNotes: "Abarca nuestro cuerpo físico, el desarrollo puberal, los cambios hormonales y la maduración biológica.",
      palabrasAprox: 14,
      duracionSeg: 8
    },
    {
      slideNumber: 3,
      tituloMomento: "Dimensión 2: Sentimientos y Afectividad",
      visualPrompt: "Modern anime style. Close-up of adolescents sharing a sincere laugh, icons of heart and brain softly illuminated. Warm morning light, emotional connection.",
      overlayText: "Dimensión Afectiva: Emociones",
      speakerNotes: "Reúne nuestras emociones, el cariño, la autoestima y la maravillosa capacidad de establecer lazos afectivos profundos.",
      palabrasAprox: 16,
      duracionSeg: 9
    },
    {
      slideNumber: 4,
      tituloMomento: "Dimensión 3: Convivencia y Sociedad",
      visualPrompt: "Modern anime style. Diverse group of young students collaborating in a bright park, talking respectfully with families and friends. Crisp clean composition.",
      overlayText: "Dimensión Social: Relaciones",
      speakerNotes: "Se manifiesta en cómo nos relacionamos con la familia, los amigos y nuestra cultura en comunidad.",
      palabrasAprox: 15,
      duracionSeg: 8
    },
    {
      slideNumber: 5,
      tituloMomento: "Dimensión 4: Valores, Respeto y Ética",
      visualPrompt: "Modern anime style. Balance scale emblem with glowing symbols of respect, personal limits, consent, and mutual dignity. Clear negative space.",
      overlayText: "Dimensión Ética: Valores y Respeto",
      speakerNotes: "Guía nuestras decisiones mediante el respeto a la dignidad ajena, el consentimiento y el cuidado mutuo.",
      palabrasAprox: 15,
      duracionSeg: 8
    },
    {
      slideNumber: 6,
      tituloMomento: "Interrelación de los 4 Cuadrantes",
      visualPrompt: "Modern anime style. The four dimensions connecting dynamically with glowing energetic nodes around a human silhouette. High visual impact, harmony.",
      overlayText: "Un Sistema Integral e Inseparable",
      speakerNotes: "Ninguna dimensión actúa aislada: lo que sentimos influye en nuestro cuerpo y en nuestras relaciones sociales.",
      palabrasAprox: 16,
      duracionSeg: 9
    },
    {
      slideNumber: 7,
      tituloMomento: "Puente a la Conversación Diaria",
      visualPrompt: "Modern anime style. Both explorers smiling, ready to investigate everyday cases with their science notebooks open. StudioSimple badge.",
      overlayText: "StudioSimple · Ciencias Naturales",
      speakerNotes: "Analicemos ahora juntos cómo estas cuatro dimensiones se manifiestan en situaciones reales de cada día.",
      palabrasAprox: 15,
      duracionSeg: 8
    }
  ];

  const explicativoSlides: SlidePrompt[] = [
    {
      slideNumber: 1,
      tituloMomento: "Definición del Enfoque Integral",
      visualPrompt: "Modern anime style 16:9. The boy and girl standing before a clear 4-quadrant lightboard: 'Biológica', 'Afectiva', 'Social' y 'Ética'. Clean modern typography.",
      overlayText: "Modelo Integral de la Sexualidad",
      speakerNotes: "La sexualidad humana es una vivencia integral que comprende cuatro dimensiones inseparables presentes durante toda la vida.",
      palabrasAprox: 17,
      duracionSeg: 9
    },
    {
      slideNumber: 2,
      tituloMomento: "La Dimensión Biológica y Pubertad",
      visualPrompt: "Modern anime style. The girl pointing at growth metrics, voice change diagrams, and cellular maturation charts. Clear clinical clarity.",
      overlayText: "Cambios Biológicos de la Pubertad",
      speakerNotes: "En la pubertad, las hormonas activan el crecimiento de estatura, el cambio de voz y los caracteres sexuales secundarios.",
      palabrasAprox: 18,
      duracionSeg: 10
    },
    {
      slideNumber: 3,
      tituloMomento: "La Dimensión Afectiva y Autoestima",
      visualPrompt: "Modern anime style. The boy reflecting on emotional self-worth and family bonds with gentle warm ambient lighting. Negative space on left.",
      overlayText: "Autoestima y Expresión de Afectos",
      speakerNotes: "La dimensión afectiva comprende cómo aprendemos a querernos a nosotros mismos y a expresar sentimientos sinceros a los demás.",
      palabrasAprox: 19,
      duracionSeg: 10
    },
    {
      slideNumber: 4,
      tituloMomento: "La Dimensión Social y Convivencia",
      visualPrompt: "Modern anime style. Young adolescents participating in school and family dialogues, showing open active listening. Soft depth of field.",
      overlayText: "Amistad, Familia y Cultura",
      speakerNotes: "Somos seres sociables: aprendemos a convivir con respeto en el hogar, en el colegio y con nuestro grupo de amigos.",
      palabrasAprox: 20,
      duracionSeg: 10
    },
    {
      slideNumber: 5,
      tituloMomento: "La Dimensión Ética y Consentimiento",
      visualPrompt: "Modern anime style. Two hands shaking with dignity and mutual respect. Icon of personal boundaries and safety shield in glowing cyan.",
      overlayText: "Límites Personales y Consentimiento",
      speakerNotes: "La ética nos enseña a valorar la dignidad de cada persona, respetar sus límites y construir relaciones basadas en el consentimiento.",
      palabrasAprox: 20,
      duracionSeg: 10
    },
    {
      slideNumber: 6,
      tituloMomento: "Las Dimensiones se Conectan",
      visualPrompt: "Modern anime style. Dynamic circular flowchart showing the feedback between body changes, emotions, social interactions, and moral values.",
      overlayText: "Conexión Permanente entre Dimensiones",
      speakerNotes: "Lo que experimenta nuestro cuerpo afecta nuestras emociones; y nuestros valores éticos guían cómo convivimos en sociedad.",
      palabrasAprox: 17,
      duracionSeg: 9
    },
    {
      slideNumber: 7,
      tituloMomento: "Síntesis y Cuaderno de Ciencias",
      visualPrompt: "Modern anime style. Both students with their open science notebooks and colored pencils, ready to draw their 4-column organizer.",
      overlayText: "¡A registrar en el cuaderno!",
      speakerNotes: "Con el modelo de 4 dimensiones claro, abre tu cuaderno de Ciencias Naturales para analizar casos concretos junto a tu mentor.",
      palabrasAprox: 20,
      duracionSeg: 10
    }
  ];

  return {
    num: 1,
    title: "Las 4 Dimensiones de la Sexualidad Humana",
    focoDidactico: "Reconocer e interrelacionar las dimensiones biológica, afectiva, social y ética en la vida cotidiana",
    duracion: "30-35 Minutos",
    objetivoAdulto: "Guiar al estudiante a comprender que la sexualidad humana es una vivencia integral que comprende cuatro dimensiones inseparables: biológica, afectiva, social y ética, superando la visión reducida a lo estrictamente reproductivo.",
    climaEmocional: "Aborda la pubertad y la sexualidad con serenidad, apertura y confianza. Es una etapa natural del desarrollo y el diálogo cercano refuerza su seguridad personal.",
    situacionIntro: {
      dialogo: "Hoy en Ciencias Naturales investigamos la sexualidad humana como una dimensión integral de la persona. En pantalla puedes ver el modelo de 4 dimensiones. Observa la primera dimensión destacada: la Dimensión Biológica. ¿Qué cambios físicos concretos ocurren en el cuerpo humano durante la pubertad?",
      pregunta: "¿Qué cambios físicos concretos caracterizan la pubertad en la dimensión biológica?",
      respEsperada: "Mencionar cambios corporales concretos como aumento de estatura, cambio de voz, vello corporal o desarrollo de caracteres sexuales.",
      pistaSocratica: "Piensa en las transformaciones corporales que ocurren al pasar de la niñez a la adolescencia."
    },
    paso2_hook: {
      titulo: "La persona en su totalidad: Las 4 dimensiones",
      fullPrompt: buildHookPromptText("Ciencias Naturales", "OA 1", 1, "Las 4 Dimensiones de la Sexualidad Humana", hookSlides),
      slides: hookSlides,
      videoUrl: "",
      dileAntes: "Vamos a ver cómo la ciencia moderna comprende la sexualidad a través de cuatro dimensiones inseparables.",
      dileDespues: "Conversemos sobre lo observado. Te haré dos preguntas para comprobar cómo se interrelacionan estas 4 dimensiones."
    },
    paso3_recorrido: [
      {
        context: "Dimensión Afectiva y Vínculos",
        question: "En la segunda dimensión, ¿qué elementos componen la dimensión afectiva de la sexualidad humana?",
        expected: "Las emociones, los sentimientos, el cariño, la autoestima y la capacidad de amar y establecer vínculos afectivos.",
        success: "¡Muy bien! La dimensión afectiva reúne cómo sentimos, cómo expresamos cariño y cómo cuidamos nuestra autoestima.",
        support: "Piensa en lo que pasa en nuestro corazón y mente: cuando sentimos alegría por un amigo, afecto por la familia o aprendemos a querernos a nosotros mismos.",
        reveal: "La dimensión afectiva integra las emociones, los sentimientos, el cariño y la capacidad de formar lazos profundos con los demás.",
        studentReveal: "Las emociones, sentimientos, el amor, el cariño y los vínculos afectivos."
      },
      {
        context: "Dimensiones Social y Ética",
        question: "¿Por qué decimos que la sexualidad humana también tiene una dimensión social y una dimensión ética?",
        expected: "Porque nos relacionamos con la familia y la sociedad (social), y debemos actuar con valores, respeto mutuo, responsabilidad y consentimiento (ética).",
        success: "¡Exacto! Somos seres sociales que convivimos con otros, y la ética nos enseña a respetar la dignidad y los límites de cada persona.",
        support: "Separa las dos palabras: 'social' tiene que ver con vivir en sociedad y convivir; 'ética' tiene que ver con valores, normas y tomar decisiones correctas.",
        reveal: "La dimensión social abarca cómo convivimos en sociedad y familia, mientras que la ética guía nuestras decisiones con valores de respeto y cuidado.",
        studentReveal: "Porque convivimos en sociedad (social) y debemos tratarnos con respeto, valores y responsabilidad (ética)."
      }
    ],
    paso4_explicativo: {
      titulo: "Modelo Integral de la Sexualidad Humana",
      fullPrompt: buildExplicativoPromptText("Ciencias Naturales", "OA 1", 1, "Las 4 Dimensiones de la Sexualidad Humana", explicativoSlides),
      slides: explicativoSlides,
      videoUrl: "",
      ideaClave: "La sexualidad humana es integral: une nuestro cuerpo biológico, nuestras emociones, nuestra convivencia social y nuestros valores éticos.",
      dileAntes: "Ahora formalizaremos la idea central que debes recordar para siempre sobre la sexualidad en Ciencias Naturales."
    },
    paso5_practica: [
      {
        context: "Caso 1: Cuidado de la higiene y descanso",
        question: "El hábito de bañarse diariamente, usar ropa limpia y dormir ocho horas para cuidar el cuerpo durante el crecimiento, ¿a qué dimensión corresponde?",
        expected: "Corresponde a la dimensión biológica, ya que se relaciona con el cuidado y funcionamiento saludable del organismo.",
        success: "¡Muy bien! Cuidar el cuerpo físico con higiene y descanso es parte de la dimensión biológica.",
        support: "Piensa a qué parte de la persona beneficia directamente el descanso y la limpieza: ¿al cuerpo físico, a las leyes o a la economía?",
        reveal: "Corresponde a la dimensión biológica porque promueve la salud, higiene y bienestar anatómico del cuerpo.",
        studentReveal: "Dimensión biológica (salud y cuidado del cuerpo)."
      },
      {
        context: "Caso 2: Expresión de afecto en la familia",
        question: "Conversar con honestidad con los padres sobre los temores o dudas que surgen en la adolescencia, ¿qué dimensiones involucra?",
        expected: "Involucra la dimensión afectiva (expresar emociones y confianza) y la dimensión social (el vínculo familiar).",
        success: "¡Exacto! El diálogo familiar combina el cariño sincero (afectivo) con la convivencia dentro del hogar (social).",
        support: "Piensa en las emociones compartidas (afecto) y en las personas con las que vives y convives (familia/social).",
        reveal: "Involucra la dimensión afectiva (manejo de emociones y confianza) y la dimensión social (la relación de convivencia con la familia).",
        studentReveal: "Dimensión afectiva (emociones) y dimensión social (familia)."
      },
      {
        context: "Caso 3: Trabajo en el Cuaderno de Ciencias",
        question: "Abre tu cuaderno de Ciencias Naturales. Dibuja un cuadro con cuatro columnas tituladas: Biológica, Afectiva, Social y Ética. Anota en la columna 'Ética' una acción que demuestre respeto hacia tus compañeros.",
        expected: "Registrar una acción ética concreta (por ejemplo: no burlarse de los cambios de otros, pedir permiso antes de tocar pertenencias ajenas o respetar la privacidad).",
        success: "¡Excelente registro en tu cuaderno! Anotaste una acción clara de respeto y valor ético.",
        support: "Escribe una acción cotidiana donde se note el respeto hacia los demás: por ejemplo, no difundir secretos o no burlarse del cuerpo de otra persona.",
        reveal: "Una acción ética fundamental es tratar a todas las personas con respeto y dignidad, valorando su individualidad y respetando sus límites.",
        studentReveal: "Acción ética registrada en el cuaderno: respetar los límites y la dignidad de cada compañero."
      }
    ],
    paso6_resumen: {
      ideaClave: "La sexualidad humana es una vivencia integral que comprende cuatro dimensiones inseparables: biológica (cuerpo), afectiva (emociones), social (relaciones) y ética (valores y respeto).",
      sintesis: "Todas las dimensiones interactúan permanentemente: lo que sentimos se refleja en nuestro cuerpo y en cómo convivimos en sociedad bajo principios éticos."
    },
    paso7_miniquiz: [
      {
        q: "¿Cuál de las siguientes afirmaciones define correctamente la sexualidad humana según la ciencia?",
        options: [
          "Es una dimensión integral presente a lo largo de toda la vida que une lo biológico, afectivo, social y ético.",
          "Se reduce exclusivamente a la reproducción biológica y a los órganos del cuerpo humano.",
          "Es un tema que únicamente involucra a los adultos y no tiene relación con las emociones ni los valores."
        ],
        correct: "Es una dimensión integral presente a lo largo de toda la vida que une lo biológico, afectivo, social y ético.",
        fixExplain: "La sexualidad humana es integral: comprende el cuerpo biológico, los afectos, la convivencia social y los valores éticos durante toda la vida."
      },
      {
        q: "El cambio en el tono de la voz y el crecimiento acelerado de estatura durante la pubertad corresponden a la dimensión:",
        options: [
          "Biológica",
          "Social",
          "Ética"
        ],
        correct: "Biológica",
        fixExplain: "Los cambios corporales, hormonales y anatómicos forman parte de la dimensión biológica del ser humano."
      },
      {
        q: "Aprender a decir 'no' con seguridad y respetar los límites y decisiones de los demás corresponde a la dimensión:",
        options: [
          "Ética y moral",
          "Exclusivamente biológica",
          "Únicamente climática"
        ],
        correct: "Ética y moral",
        fixExplain: "Establecer límites personales, cuidar el consentimiento y valorar la dignidad propia y ajena son fundamentos de la dimensión ética."
      }
    ],
    paso7b_recuperacion: [
      {
        title: "Recuperación: Las 4 Dimensiones de la Sexualidad",
        explain: "Recuerda que la sexualidad humana se compone de 4 dimensiones esenciales: 1) Biológica (el cuerpo), 2) Afectiva (las emociones), 3) Social (la relación con otros) y 4) Ética (los valores y el respeto).",
        q: "Si una persona siente cariño por sus amigos y comparte momentos felices con ellos, ¿qué dos dimensiones se manifiestan?",
        options: [
          "Las dimensiones afectiva (cariño) y social (amistades).",
          "Únicamente la dimensión biológica anatómica."
        ],
        correct: "Las dimensiones afectiva (cariño) y social (amistades).",
        correctText: "¡Exacto! El cariño representa la dimensión afectiva y compartir con amigos representa la dimensión social.",
        fixText: "Recuerda que el cariño corresponde a la dimensión afectiva y la convivencia con amigos corresponde a la dimensión social."
      }
    ],
    paso8_cierre: {
      preguntaSintesis: "En tus propias palabras, ¿por qué decimos que la sexualidad involucra a la persona completa y no solo a la biología?",
      metacognicion: "¿Cuál de las 4 dimensiones te parece más importante para cuidar tus relaciones con amigos y familia?",
      celebracion: "¡Felicitaciones! Has completado con éxito la primera clase de Ciencias Naturales sobre las 4 dimensiones de la sexualidad humana."
    }
  };
}

/**
 * Helper to build canonical Lesson 1 of Historia y Ciencias Sociales Grade 7 OA02
 */
export function getCanonicalClase1Historia(): LessonData {
  const hookSlides: SlidePrompt[] = [
    {
      slideNumber: 1,
      tituloMomento: "El Mundo Paleolítico Nómade",
      visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, watching from a ridge as a Paleolithic band moves across cold windswept plains carrying shelters and stone spears. Cinematic atmospheric lighting.",
      overlayText: "Hace 15.000 años: La vida nómade",
      speakerNotes: "Durante milenios, los seres humanos debían seguir las manadas y recolectar frutos silvestres para no morir de hambre.",
      palabrasAprox: 17,
      duracionSeg: 9
    },
    {
      slideNumber: 2,
      tituloMomento: "El Clima Cambia y Nace la Observación",
      visualPrompt: "Modern anime style. Warm sunlight illuminating green valleys along a flowing river. Early hunter-gatherers observing wild wheat and barley growing naturally. Fresh spring atmosphere.",
      overlayText: "El Clima Cambia y Florece la Tierra",
      speakerNotes: "Al terminar la última glaciación, el clima se volvió más templado y las comunidades comenzaron a observar los ciclos de las plantas.",
      palabrasAprox: 21,
      duracionSeg: 10
    },
    {
      slideNumber: 3,
      tituloMomento: "La Invención de la Agricultura",
      visualPrompt: "Modern anime style. Early Neolithic farmers carefully planting emmer and barley seeds into fertile soil near the Euphrates river with polished digging sticks. Golden morning light.",
      overlayText: "La Revolución Agrícola",
      speakerNotes: "Sembrar trigo, cebada y legumbres permitió producir alimento en un lugar permanente sin tener que trasladarse.",
      palabrasAprox: 16,
      duracionSeg: 8
    },
    {
      slideNumber: 4,
      tituloMomento: "La Domesticación Ganadera",
      visualPrompt: "Modern anime style. Neolithic sheep and goats grazing peacefully in stone-fenced enclosures beside early mudbrick round houses. Clean lineart, soft depth of field.",
      overlayText: "La Ganadería Neolítica",
      speakerNotes: "La crianza controlada de ovejas y cabras aseguró leche, carne y lana constante durante todo el año.",
      palabrasAprox: 16,
      duracionSeg: 8
    },
    {
      slideNumber: 5,
      tituloMomento: "Primeras Aldeas Sedentarias",
      visualPrompt: "Modern anime style. Panoramic view of an ancient settlement like Jericho or Catalhoyuk with square mudbrick dwellings, communal granaries, and children playing safely.",
      overlayText: "Nacen las Primeras Aldeas Sedentarias",
      speakerNotes: "Con comida almacenada en graneros, las familias levantaron viviendas duraderas y fundaron las primeras aldeas.",
      palabrasAprox: 15,
      duracionSeg: 8
    },
    {
      slideNumber: 6,
      tituloMomento: "Nuevas Herramientas y Oficios",
      visualPrompt: "Modern anime style. Villagers shaping clay into storage pots, weaving woolen textiles, and polishing stone sickles beside a communal fire.",
      overlayText: "Nuevas Herramientas y Oficios",
      speakerNotes: "Al no necesitar que todos cazaran, nacieron artesanos de la alfarería, tejedores y constructores.",
      palabrasAprox: 13,
      duracionSeg: 7
    },
    {
      slideNumber: 7,
      tituloMomento: "Puente a la Conversación Histórica",
      visualPrompt: "Modern anime style. The two 13-year-olds analyzing a glowing interactive map of the Fertile Crescent with timeline markers. StudioSimple emblem.",
      overlayText: "StudioSimple · Historia 7° Básico",
      speakerNotes: "Descubramos en nuestra línea de tiempo cómo este salto revolucionario dio origen a nuestras civilizaciones.",
      palabrasAprox: 15,
      duracionSeg: 8
    }
  ];

  const explicativoSlides: SlidePrompt[] = [
    {
      slideNumber: 1,
      tituloMomento: "De la Depredación a la Producción",
      visualPrompt: "Modern anime style 16:9. The boy and girl standing before a sleek interactive lightboard contrasting two eras: 'Economía Depredadora (Paleolítico)' vs 'Economía Productora (Neolítico)'.",
      overlayText: "La Gran Transformación Económica",
      speakerNotes: "El Neolítico representa el salto decisivo: el ser humano dejó de recolectar pasivamente para convertirse en productor de su propio alimento.",
      palabrasAprox: 20,
      duracionSeg: 10
    },
    {
      slideNumber: 2,
      tituloMomento: "El Creciente Fértil y los Ríos",
      visualPrompt: "Modern anime style. Map of the Middle East highlighting the green arc formed by the Tigris, Euphrates, and Nile rivers. Clear geographic labels.",
      overlayText: "La Media Luna Fértil",
      speakerNotes: "Esta revolución comenzó en el Creciente Fértil, donde los ríos aportaban agua constante y tierras ricas en nutrientes.",
      palabrasAprox: 18,
      duracionSeg: 9
    },
    {
      slideNumber: 3,
      tituloMomento: "La Acumulación de Excedentes",
      visualPrompt: "Modern anime style. Large clay jars filled with golden wheat grains inside a cool, dry stone storage room. Warm ambient glow.",
      overlayText: "El Excedente Alimentario",
      speakerNotes: "Por primera vez en la historia, sobraba comida. El grano almacenado garantizaba sobrevivir en inviernos y sequías.",
      palabrasAprox: 17,
      duracionSeg: 9
    },
    {
      slideNumber: 4,
      tituloMomento: "La Cerámica como Tecnología Clave",
      visualPrompt: "Modern anime style. Neolithic artisan shaping a ceramic vessel on a slow turntable, showing waterproof clay walls.",
      overlayText: "Alfarería para Conservar Alimentos",
      speakerNotes: "Las vasijas de barro cocido fueron indispensables para proteger las cosechas de la humedad y de los roedores.",
      palabrasAprox: 17,
      duracionSeg: 9
    },
    {
      slideNumber: 5,
      tituloMomento: "El Nacimiento del Sedentarismo",
      visualPrompt: "Modern anime style. Families building permanent stone and adobe walls, settling near their irrigated crop fields.",
      overlayText: "Sedentarismo: Quedarse en un Lugar Fijo",
      speakerNotes: "Tener cultivos y animales requirió cuidar la tierra permanentemente, dando origen a la vida sedentaria.",
      palabrasAprox: 15,
      duracionSeg: 8
    },
    {
      slideNumber: 6,
      tituloMomento: "La División y Especialización del Trabajo",
      visualPrompt: "Modern anime style. Split infographic showing 4 distinct roles: farmer tending fields, potter at wheel, weaver at loom, and builder with mudbricks.",
      overlayText: "Nuevas Profesiones y Oficios",
      speakerNotes: "Al haber excedente de comida, surgieron nuevos oficios especializados que impulsaron la tecnología y el comercio.",
      palabrasAprox: 16,
      duracionSeg: 8
    },
    {
      slideNumber: 7,
      tituloMomento: "Síntesis en el Cuaderno de Historia",
      visualPrompt: "Modern anime style. Both explorers smiling with their open notebooks, drawing the comparative table between Paleolithic and Neolithic.",
      overlayText: "¡A comparar en tu cuaderno!",
      speakerNotes: "Ahora abre tu cuaderno de Historia y Ciencias Sociales para construir el cuadro comparativo junto a tu mentor.",
      palabrasAprox: 18,
      duracionSeg: 9
    }
  ];

  return {
    num: 1,
    title: "El fin del nomadismo y el surgimiento agrícola",
    focoDidactico: "Transición de la caza y recolección nómade a las primeras aldeas sedentarias productoras de alimentos",
    duracion: "30-35 Minutos",
    objetivoAdulto: "Acompañar al estudiante a comprender la gran transformación del Paleolítico al Neolítico: cómo el descubrimiento de la agricultura y la domesticación de animales transformó a los grupos humanos nómades en comunidades sedentarias.",
    climaEmocional: "Crea un clima de exploración histórica: 'En historia no memorizamos fechas sueltas: comprendemos cómo las personas resolvieron sus necesidades básicas para construir nuestra civilización'.",
    situacionIntro: {
      dialogo: "Hoy en Historia y Ciencias Sociales nos situamos en 'El fin del nomadismo y el surgimiento agrícola'. En la pantalla puedes ver la línea de tiempo interactiva. Observa la etapa de la 'Revolución Neolítica' (hace unos 10.000 años a.C.). ¿Qué descubrimiento fundamental permitió a las familias humanas dejar de trasladarse todo el tiempo y fundar las primeras aldeas sedentarias?",
      pregunta: "¿Qué descubrimiento fundamental permitió a los humanos dejar el nomadismo y fundar aldeas permanentes?",
      respEsperada: "La agricultura (cultivo de plantas como trigo y cebada) y la domesticación de animales (ganadería), lo que permitió producir y almacenar alimento fijo.",
      pistaSocratica: "Fíjate en el icono de la espiga de trigo: ¿qué empezaron a hacer en el Neolítico para tener alimento sin tener que viajar buscando caza?"
    },
    paso2_hook: {
      titulo: "De cazadores a agricultores: La Revolución Neolítica",
      fullPrompt: buildHookPromptText("Historia, Geografía y Ciencias Sociales", "OA 2", 1, "El fin del nomadismo y el surgimiento agrícola", hookSlides),
      slides: hookSlides,
      videoUrl: "",
      dileAntes: "Durante más del 95% de la historia humana, nuestros antepasados fueron cazadores nómadas. Todo cambió cuando aprendieron a sembrar.",
      dileDespues: "Conversemos sobre lo observado en la línea de tiempo. Te haré dos preguntas para comprobar esta transformación."
    },
    paso3_recorrido: [
      {
        context: "Vida Nómada vs Vida Sedentaria",
        question: "¿Por qué las bandas humanas del Paleolítico estaban obligadas a ser nómadas y trasladarse constantemente de un lugar a otro?",
        expected: "Porque dependían de la caza de animales que migraban y de la recolección de frutos silvestres; cuando los recursos se agotaban, debían moverse para no morir de hambre.",
        success: "¡Muy bien! Comprendiste que el nomadismo era una necesidad estricta para sobrevivir buscando comida.",
        support: "Piensa en una manada de animales: si los animales migran hacia el sur por el invierno, ¿qué tienen que hacer los cazadores?",
        reveal: "Los nómadas no tenían cultivos propios; seguían las rutas migratorias de los animales y las estaciones de las plantas silvestres.",
        studentReveal: "Eran nómadas porque dependían de la caza y recolección, y debían seguir a las manadas de animales."
      },
      {
        context: "El Creciente Fértil y la Geografía",
        question: "¿Por qué la Revolución Neolítica comenzó en regiones con ríos abundantes como la Media Luna Fértil (en Medio Oriente, junto a los ríos Tigris y Éufrates)?",
        expected: "Porque los ríos proveían agua constante para regar los primeros campos cultivados y dejaban tierras húmedas y fértiles tras las crecidas.",
        success: "¡Excelente análisis geográfico! Supiste vincular la presencia de agua dulce y suelos fértiles con el éxito de los primeros cultivos.",
        support: "Fíjate en las condiciones que necesita una semilla para crecer: ¿por qué los desiertos secos no servían para empezar la agricultura?",
        reveal: "El agua dulce de los ríos y los valles aluviales proporcionaron el entorno propicio para domesticar el trigo y la cebada.",
        studentReveal: "Comenzó junto a los ríos porque aseguraban agua para el riego y tierras fértiles para los cultivos."
      }
    ],
    paso4_explicativo: {
      titulo: "La Revolución Neolítica y los excedentes alimentarios",
      fullPrompt: buildExplicativoPromptText("Historia, Geografía y Ciencias Sociales", "OA 2", 1, "El fin del nomadismo y el surgimiento agrícola", explicativoSlides),
      slides: explicativoSlides,
      videoUrl: "",
      ideaClave: "La Revolución Neolítica fue la transformación más profunda de la humanidad: al domesticar plantas y animales, las sociedades pasaron de la economía depredadora a la economía productora, naciendo las primeras aldeas sedentarias.",
      dileAntes: "Revisemos la idea histórica formal: cómo el paso a la economía productora cambió la vida para siempre."
    },
    paso5_practica: [
      {
        context: "Cuadro Comparativo en el Cuaderno de Historia",
        question: "Abre tu cuaderno de Historia. Dibuja una tabla de 2 columnas titulada: 'Paleolítico (Nómadas) vs Neolítico (Sedentarios)'. Completa al menos 3 diferencias: 1) Modo de conseguir comida, 2) Tipo de vivienda, y 3) Herramientas principales.",
        expected: "Tabla ordenada en el cuaderno con 3 comparaciones claras: Caza/recolección vs Agricultura/ganadería; Cavernas/chozas desmontables vs Casas de barro y piedra; Piedra tallada vs Piedra pulida y cerámica.",
        success: "¡Excelente sistematización histórica en tu cuaderno! Tu cuadro comparativo refleja con rigor las diferencias de cada período.",
        support: "Escribe en la izquierda 'Paleolítico' (nómadas, caza, piedra tallada) y a la derecha 'Neolítico' (sedentarios, cultivo, cerámica y casas fijas).",
        reveal: "Comparar ambos modos de vida permite apreciar el enorme salto de seguridad y organización que trajo el Neolítico.",
        studentReveal: "Cuadro comparativo completo de 3 filas en el cuaderno de Historia y Ciencias Sociales."
      },
      {
        context: "Consecuencias Sociales del Sedentarismo en el Cuaderno",
        question: "En tu cuaderno, responde en 3 líneas: Al tener comida asegurada en la aldea, ya no todos tenían que salir a cazar todo el día. ¿Qué nuevos oficios o trabajos surgieron en las aldeas neolíticas?",
        expected: "Mencionar al menos dos nuevos oficios: alfareros (cerámica), tejedores (textiles con lana de oveja), agricultores, constructores o artesanos de herramientas.",
        success: "¡Muy buena deducción histórica! Identificaste la división y especialización del trabajo que dio origen a la vida urbana.",
        support: "Piensa en las nuevas necesidades de la aldea: ¿quién hacía las vasijas de barro?, ¿quién tejía la ropa con lana de oveja?",
        reveal: "El excedente de comida liberó a parte de la población para dedicarse a la alfarería, el tejido, la arquitectura y el liderazgo comunitario.",
        studentReveal: "Mención en el cuaderno de la especialización del trabajo: alfareros, tejedores, agricultores y constructores."
      }
    ],
    paso6_resumen: {
      ideaClave: "La agricultura y la ganadería transformaron la economía depredadora en economía productora, permitiendo almacenar excedentes y fundar las primeras aldeas sedentarias.",
      sintesis: "Al producir su propio alimento, los humanos abandonaron el nomadismo. Surgieron la cerámica, la piedra pulida y la especialización de oficios."
    },
    paso7_miniquiz: [
      {
        q: "¿Cuál fue la causa principal que permitió a los seres humanos abandonar la vida nómada y volverse sedentarios en el Neolítico?",
        options: [
          "La invención de barcos de guerra para navegar grandes océanos",
          "La domesticación de plantas (agricultura) y animales (ganadería)",
          "El enfriamiento brusco del clima polar en toda Europa"
        ],
        correct: "La domesticación de plantas (agricultura) y animales (ganadería)",
        fixExplain: "Al producir su propio alimento en campos fijos, las familias ya no necesitaban desplazarse detrás de las manadas de caza."
      },
      {
        q: "¿Por qué la invención de vasijas de cerámica fue indispensable para las primeras aldeas agrícolas?",
        options: [
          "Porque servían únicamente como adornos en los templos",
          "Porque permitían almacenar excedentes de granos y líquidos protegiéndolos de roedores y humedad",
          "Porque reemplazaron a las armas de fuego en las batallas"
        ],
        correct: "Porque permitían almacenar excedentes de granos y líquidos protegiéndolos de roedores y humedad",
        fixExplain: "La cerámica permitió guardar cosechas durante meses, asegurando reservas contra el hambre y el invierno."
      },
      {
        q: "En el período Paleolítico anterior a la agricultura, ¿cómo obtenían su sustento diario las bandas humanas?",
        options: [
          "Comprando alimentos en mercados organizados",
          "Mediante la caza de animales, la pesca y la recolección de frutos silvestres",
          "Cultivando grandes campos de trigo y maíz"
        ],
        correct: "Mediante la caza de animales, la pesca y la recolección de frutos silvestres",
        fixExplain: "El Paleolítico se caracterizó por una economía depredadora basada exclusivamente en la caza y recolección silvestre."
      }
    ],
    paso7b_recuperacion: [
      {
        title: "Recuperación: El Paso al Sedentarismo",
        explain: "Recuerda que 'nómade' significa viajar continuamente buscando comida, mientras que 'sedentario' significa vivir en un lugar fijo porque produces tu propio alimento.",
        q: "¿Qué actividad fue la base que permitió a los seres humanos ser sedentarios?",
        options: [
          "La agricultura y la ganadería en campos fijos.",
          "La caza de ballenas en altamar."
        ],
        correct: "La agricultura y la ganadería en campos fijos.",
        correctText: "¡Exacto! Producir alimentos en campos permanentes hizo posible el sedentarismo.",
        fixText: "La respuesta correcta es la agricultura y ganadería: al tener comida estable, ya no necesitaban migrar."
      }
    ],
    paso8_cierre: {
      preguntaSintesis: "En tus propias palabras, ¿qué diferencia hay entre buscar alimento en la naturaleza y producirlo tú mismo?",
      metacognicion: "¿Qué invento neolítico te llamó más la atención: la siembra, la ganadería o las vasijas de cerámica?",
      celebracion: "¡Felicitaciones! Has completado con éxito la primera clase de Historia sobre el surgimiento de la agricultura."
    }
  };
}

/**
 * Helper to build canonical Lesson 1 of Inglés Grade 7 OA09
 */
export function getCanonicalClase1Ingles(): LessonData {
  const hookSlides: SlidePrompt[] = [
    {
      slideNumber: 1,
      tituloMomento: "Welcome to the Story Arc",
      visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers standing before an illuminated holographic narrative mountain peak labeled Beginning, Rising Action, Climax, Falling Action, Resolution. Dynamic lighting, negative space on top.",
      overlayText: "English 7th Grade · The Story Arc",
      speakerNotes: "Every exciting story in English follows a narrative path called the Story Arc, from the beginning to the resolution.",
      palabrasAprox: 19,
      duracionSeg: 9
    },
    {
      slideNumber: 2,
      tituloMomento: "Step 1: The Setting (Where and When)",
      visualPrompt: "Modern anime style. Panoramic view of a quiet mountain town at sunrise with pine trees, wooden houses, and distant snowy peaks. High atmospheric detail, calm feeling.",
      overlayText: "Setting: Where and When",
      speakerNotes: "The setting tells us where and when the story happens: a quiet town, a rainy night, or an ancient castle.",
      palabrasAprox: 20,
      duracionSeg: 10
    },
    {
      slideNumber: 3,
      tituloMomento: "Step 1: Characters (Who takes part)",
      visualPrompt: "Modern anime style. Close-up of young Leo with a blue backpack and his adventurous younger sister holding a brass compass and field notebook. Expressive, friendly eyes.",
      overlayText: "Characters: Who takes part",
      speakerNotes: "Characters are the people or animals in the story. Meet Leo and his sister, who love exploring nature.",
      palabrasAprox: 17,
      duracionSeg: 9
    },
    {
      slideNumber: 4,
      tituloMomento: "The Time Connector: FIRST",
      visualPrompt: "Modern anime style. Big stylized typography 'FIRST' with a golden directional arrow pointing to the opening scene of their adventure. Clean graphics.",
      overlayText: "Time Connector: FIRST / In the beginning",
      speakerNotes: "To start the narrative, English writers use signal words like 'First' or 'In the beginning'.",
      palabrasAprox: 14,
      duracionSeg: 8
    },
    {
      slideNumber: 5,
      tituloMomento: "Reading the Full Sentence",
      visualPrompt: "Modern anime style. Clean textbook lightboard showing the sentence: 'First, Leo and his sister lived in a quiet town near the mountains.' Both explorers pointing at words.",
      overlayText: "'First, Leo and his sister lived in a quiet town...'",
      speakerNotes: "Listen to the complete sentence: First, Leo and his sister lived in a quiet town near the mountains.",
      palabrasAprox: 17,
      duracionSeg: 9
    },
    {
      slideNumber: 6,
      tituloMomento: "Characters vs. Setting Split",
      visualPrompt: "Modern anime style. Split screen highlighting green box 'Leo and his sister' (Characters) and blue box 'a quiet town near the mountains' (Setting). Crystal clarity.",
      overlayText: "Characters vs. Setting",
      speakerNotes: "Notice how easily you can identify both elements: the characters and the peaceful setting.",
      palabrasAprox: 14,
      duracionSeg: 8
    },
    {
      slideNumber: 7,
      tituloMomento: "Ready for the Notebook Challenge",
      visualPrompt: "Modern anime style. Minimalist clean composition showing StudioSimple emblem, the two explorers smiling with their English notebooks open, ready to write.",
      overlayText: "StudioSimple · English 7th Grade",
      speakerNotes: "Now let's practice together with your mentor and write your first sentences in your English notebook!",
      palabrasAprox: 17,
      duracionSeg: 9
    }
  ];

  const explicativoSlides: SlidePrompt[] = [
    {
      slideNumber: 1,
      tituloMomento: "Model Sentence Pattern",
      visualPrompt: "Modern anime style 16:9. The boy and girl standing before a clear formula board: 'Time Connector + Subject (Character) + Past Verb + Setting'. Modern typography.",
      overlayText: "The Narrative Sentence Formula",
      speakerNotes: "To begin any narrative in English, we follow a simple formula that gives immediate clarity to the reader.",
      palabrasAprox: 18,
      duracionSeg: 9
    },
    {
      slideNumber: 2,
      tituloMomento: "The Time Connector (First)",
      visualPrompt: "Modern anime style. The girl highlighting 'First,' with a comma on the digital board. Callout: 'Always add a comma after First'.",
      overlayText: "Step 1: First, / In the beginning,",
      speakerNotes: "Always place a comma after introductory time words: 'First,' signals the exact starting point of our story.",
      palabrasAprox: 17,
      duracionSeg: 9
    },
    {
      slideNumber: 3,
      tituloMomento: "The Subject Character (Who)",
      visualPrompt: "Modern anime style. The boy illustrating different characters: 'two brave pilots', 'a clever detective', 'a lonely astronaut'. Vibrant badges.",
      overlayText: "Step 2: Name the Characters",
      speakerNotes: "Next, clearly introduce the main characters so the audience knows who will experience the upcoming adventure.",
      palabrasAprox: 16,
      duracionSeg: 8
    },
    {
      slideNumber: 4,
      tituloMomento: "The Action Verb in Past Simple (-ed)",
      visualPrompt: "Modern anime style. Glowing linguistic breakdown showing the verb 'live' adding '-ed' to become 'lived', and 'travel' becoming 'traveled'.",
      overlayText: "Step 3: Past Simple Verb (-ed)",
      speakerNotes: "Stories happen in the past. Regular action verbs take the -ed ending, like 'lived' or 'explored'.",
      palabrasAprox: 15,
      duracionSeg: 8
    },
    {
      slideNumber: 5,
      tituloMomento: "The Setting Phrase (Place and Time)",
      visualPrompt: "Modern anime style. Beautiful background callouts: 'in an ancient castle', 'in a futuristic laboratory', 'near the dark forest'.",
      overlayText: "Step 4: Describe the Setting",
      speakerNotes: "Finally, describe where and when the characters lived, creating an immersive setting for the reader.",
      palabrasAprox: 15,
      duracionSeg: 8
    },
    {
      slideNumber: 6,
      tituloMomento: "Common Mistakes: Missing Elements",
      visualPrompt: "Modern anime style. A friendly contrast showing an incomplete phrase with a yellow alert symbol, and the full complete sentence in green.",
      overlayText: "Avoid Incomplete Sentences",
      speakerNotes: "Remember: never omit the setting or the connector. A complete opening sentence gives both context and action.",
      palabrasAprox: 17,
      duracionSeg: 9
    },
    {
      slideNumber: 7,
      tituloMomento: "Summary in English Notebook",
      visualPrompt: "Modern anime style. Both explorers smiling confidently, holding their pencils and inviting the student to write their own story opening.",
      overlayText: "Your Turn in the English Notebook!",
      speakerNotes: "Now open your English notebook and write your own story opening using the pattern you just mastered!",
      palabrasAprox: 18,
      duracionSeg: 9
    }
  ];

  return {
    num: 1,
    title: "Setting and Characters in Short Stories",
    focoDidactico: "Identificar personajes (characters), ambientación (setting) y conector inicial (First) en textos narrativos en inglés",
    duracion: "30-35 Minutos",
    objetivoAdulto: "Guiar al estudiante en inglés a identificar los personajes (characters), el lugar y tiempo (setting) y el conector inicial (First / In the beginning) en oraciones narrativas breves.",
    climaEmocional: "Crea un ambiente de confianza en inglés: 'No tengas miedo a equivocarte al pronunciar. En inglés cada intento suma vocabulario y seguridad'.",
    situacionIntro: {
      dialogo: "Hoy en nuestra sesión de English exploramos 'Setting and Characters in Short Stories'. En la pantalla del estudiante se muestra el organizador de la montaña narrativa. Observa el Paso 1: 'Beginning (Introduction)' y lee en voz alta la oración de ejemplo: 'First, Leo and his sister lived in a quiet town near the mountains.' ¿Quiénes son los personajes de la historia y en qué lugar viven?",
      pregunta: "Who are the characters and what is the setting in this story?",
      respEsperada: "Characters: Leo and his sister. Setting: a quiet town near the mountains (comenzando con 'First').",
      pistaSocratica: "Fíjate en las palabras en inglés: 'Leo and his sister' indica quiénes son, y 'quiet town near the mountains' describe el pueblo y las montañas."
    },
    paso2_hook: {
      titulo: "The Narrative Mountain: Story Arc & Time Connectors",
      fullPrompt: buildHookPromptText("Idioma Extranjero: Inglés", "OA 9", 1, "Setting and Characters in Short Stories", hookSlides),
      slides: hookSlides,
      videoUrl: "",
      dileAntes: "En los relatos en inglés, toda narración sigue una montaña de tensión dramática estructurada con conectores de tiempo clave.",
      dileDespues: "Conversemos sobre el organizador. Te haré dos preguntas sobre los conectores y elementos que vimos en inglés."
    },
    paso3_recorrido: [
      {
        context: "Characters vs Setting in English",
        question: "En un cuento en inglés leemos: 'The young astronaut landed on Mars in the year 2095.' ¿Cuál es el 'character' (personaje) y cuál es el 'setting' (lugar y tiempo)?",
        expected: "El character es el joven astronauta ('the young astronaut') y el setting es Marte en el año 2095 ('Mars in the year 2095').",
        success: "¡Very good! Identificaste con total exactitud al protagonista y las coordenadas de lugar y tiempo.",
        support: "Busca quién realiza la acción (astronaut) y dónde y cuándo ocurre (Mars, year 2095).",
        reveal: "'Character' responde a 'Who' (quién); 'Setting' responde a 'Where and When' (dónde y cuándo).",
        studentReveal: "Character: The young astronaut. Setting: Mars in the year 2095."
      },
      {
        context: "Time Connector: First",
        question: "¿Qué función cumple la palabra 'First' o la frase 'In the beginning' al inicio de un párrafo narrativo?",
        expected: "Indica el punto de partida temporal, señalando qué hecho ocurrió en primer lugar antes de todos los demás.",
        success: "¡Excelente! 'First' marca el orden cronológico inicial de la historia.",
        support: "Recuerda que First significa 'Primero'. Se usa siempre para abrir la secuencia de acciones.",
        reveal: "'First' conecta el inicio del relato con la presentación de la rutina de los personajes.",
        studentReveal: "'First' indica el primer hecho que ocurre al comenzar una historia en inglés."
      }
    ],
    paso4_explicativo: {
      titulo: "Model Sentence Pattern: Beginning a Story in English",
      fullPrompt: buildExplicativoPromptText("Idioma Extranjero: Inglés", "OA 9", 1, "Setting and Characters in Short Stories", explicativoSlides),
      slides: explicativoSlides,
      videoUrl: "",
      ideaClave: "Pattern: 'First, [Character] lived/worked in [Setting].' Example: 'First, two brave explorers traveled across the desert.'",
      dileAntes: "Revisemos la estructura formal para iniciar una historia en inglés con conector, personaje, verbo en pasado y lugar."
    },
    paso5_practica: [
      {
        context: "Writing a Story Beginning in English Notebook",
        question: "Abre tu cuaderno de inglés. Escribe el título: 'Story Arc: Step 1 Beginning'. Inventa y escribe 1 oración completa en inglés siguiendo el modelo aprendido: empieza con 'First,', luego nombra un personaje (ej. 'a brave girl', 'a curious dog', 'a clever scientist') y di dónde vivía usando 'lived in...'.",
        expected: "Oración completa en inglés en el cuaderno con la estructura: 'First, [personaje] lived in [lugar].' (Por ejemplo: 'First, a brave girl lived in a magical forest.').",
        success: "¡Great job in your notebook! Tu oración en inglés está correctamente estructurada con conector, personaje y lugar.",
        support: "Copia este molde y complétalo: 'First, a young detective lived in Santiago.' o 'First, a lonely wizard lived in an old castle.'",
        reveal: "Escribir oraciones completas en el cuaderno consolida la ortografía, la puntuación y el vocabulario en inglés.",
        studentReveal: "Oración modelo escrita en el cuaderno: 'First, [Character] lived in [Setting].'"
      },
      {
        context: "Translating Setting and Characters to Spanish",
        question: "Debajo de tu oración en inglés en el cuaderno, escribe la traducción al español e indica al lado con dos flechas: ¿cuál es el Character (personaje) y cuál es el Setting (lugar)?",
        expected: "Traducción correcta de su propia oración al español con identificación explícita del personaje y del lugar.",
        success: "¡Excelente demostración bilingüe! Comprobaste que comprendes a fondo cada parte de lo que escribiste en inglés.",
        support: "Escribe tu frase en español y encierra en un círculo el nombre del personaje y subraya el lugar donde vive.",
        reveal: "Poder traducir y rotular los elementos demuestra dominio real del significado y no solo repetición mecánica.",
        studentReveal: "Traducción al español en el cuaderno con Character y Setting claramente rotulados."
      }
    ],
    paso6_resumen: {
      ideaClave: "Todo inicio de relato en inglés presenta 'Characters' (quiénes participan) y 'Setting' (dónde y cuándo ocurre), articulados con el conector inicial 'First'.",
      sintesis: "Fórmula de apertura: Time Connector ('First,') + Character + Past Verb ('lived in') + Setting ('a quiet town')."
    },
    paso7_miniquiz: [
      {
        q: "Read the sentence: 'First, an old sailor lived in a small lighthouse near the sea.' Who is the main character?",
        options: [
          "The sea",
          "An old sailor",
          "A small lighthouse"
        ],
        correct: "An old sailor",
        fixExplain: "'An old sailor' (un viejo marinero) es la persona que realiza la acción y vive en el lugar."
      },
      {
        q: "In the same sentence: 'First, an old sailor lived in a small lighthouse near the sea.' What is the setting (place)?",
        options: [
          "In a big airport",
          "In an old sailor",
          "In a small lighthouse near the sea"
        ],
        correct: "In a small lighthouse near the sea",
        fixExplain: "'A small lighthouse near the sea' (un pequeño faro cerca del mar) es el lugar físico donde se ambienta la escena."
      },
      {
        q: "Which time connector is best suited to start the very first sentence of a short story in English?",
        options: [
          "Finally,",
          "First,",
          "Because,"
        ],
        correct: "First,",
        fixExplain: "'First,' (Primero) o 'In the beginning' son los conectores ideales para iniciar la narración cronológica."
      }
    ],
    paso7b_recuperacion: [
      {
        title: "Recuperación: Characters and Setting",
        explain: "Recuerda que 'Character' es la persona o animal de la historia, y 'Setting' es el lugar donde ocurre.",
        q: "In 'First, a doctor worked in a hospital', what is the setting?",
        options: [
          "In a hospital (un hospital).",
          "A doctor (un doctor)."
        ],
        correct: "In a hospital (un hospital).",
        correctText: "¡Very good! 'In a hospital' es el lugar (setting).",
        fixText: "The correct answer is: In a hospital (el hospital es el lugar físico)."
      }
    ],
    paso8_cierre: {
      preguntaSintesis: "In your own words, what is the difference between a character and a setting in an English short story?",
      metacognicion: "¿Qué conector de tiempo en inglés te resultó más fácil de recordar para comenzar un relato?",
      celebracion: "Congratulations! You have completed your first English lesson on Setting and Characters!"
    }
  };
}

// ============================================================================
// GENERADORES DISCIPLINARES ESPECIALIZADOS
// ============================================================================

interface DisciplineContent {
  objetivoAdulto: string;
  climaEmocional: string;
  situacionIntro: {
    dialogo: string;
    pregunta: string;
    respEsperada: string;
    pistaSocratica: string;
    options?: Array<{ label: string; kind: 'correct' | 'needs_support' | 'no_answer' | 'other'; feedbackText: string }>;
  };
  recorrido: GuidedItem[];
  ideaClaveExplicativo: string;
  dileAntesExplicativo: string;
  practica: GuidedItem[];
  resumen: {
    ideaClave: string;
    sintesis: string;
    estrategia?: string;
  };
  miniquiz: QuizQuestion[];
  recuperacion: RecoveryItem[];
  cierre: {
    preguntaSintesis: string;
    metacognicion: string;
    celebracion: string;
  };
}

/**
 * Helper para buscar el ítem correspondiente en el currículum oficial de Neon
 */
function findCurriculumItem(oa: OACatalogItem): NeonCurriculumItem | undefined {
  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  const oaCursoDigits = norm(oa.curso).replace(/[^0-9]/g, "");
  const oaAsig = norm(oa.asignatura);

  return neonCurriculum.find(item => {
    const itemCursoDigits = norm(item.curso).replace(/[^0-9]/g, "");
    if (oaCursoDigits && itemCursoDigits && oaCursoDigits !== itemCursoDigits) return false;

    const itemAsig = norm(item.asignatura);
    const asigMatches =
      itemAsig.includes(oaAsig) ||
      oaAsig.includes(itemAsig) ||
      (oaAsig.includes("mat") && itemAsig.includes("mat")) ||
      (oaAsig.includes("leng") && itemAsig.includes("leng")) ||
      (oaAsig.includes("cien") && itemAsig.includes("cien") && !itemAsig.includes("soc")) ||
      (oaAsig.includes("hist") && itemAsig.includes("hist")) ||
      (oaAsig.includes("ing") && itemAsig.includes("ing"));

    if (!asigMatches) return false;

    if (item.numero_oa) {
      const num = parseInt(item.numero_oa.replace(/\D/g, ""), 10);
      if (!isNaN(num) && num === oa.oaNumero) return true;
    }

    if (item.descripcion_oa && oa.descripcion) {
      const d1 = norm(item.descripcion_oa).slice(0, 30);
      const d2 = norm(oa.descripcion).slice(0, 30);
      if (d1 === d2 || norm(item.descripcion_oa).includes(d2) || norm(oa.descripcion).includes(d1)) {
        return true;
      }
    }

    return false;
  });
}

function parseCurriculumItem(c?: NeonCurriculumItem) {
  if (!c) {
    return {
      conceptos: [] as string[],
      indicadores: [] as string[],
      errores: [] as string[],
      actividadAplicar: "",
      actividadEvaluar: "",
      actividadComprender: "",
      estrategiaMotivacion: ""
    };
  }
  const conceptos = (c.conceptos_clave || "")
    .split(/[,;•\n]/)
    .map(s => s.trim())
    .filter(s => s.length > 2);

  const indicadores = (c.indicadores_evaluacion || "")
    .split(/\n|•/)
    .map(s => s.trim().replace(/^[-*•]\s*/, ""))
    .filter(s => s.length > 5);

  const errores = (c.errores_frecuentes || "")
    .split(/[|\n]/)
    .map(s => s.trim().replace(/^[-*•]\s*/, ""))
    .filter(s => s.length > 5);

  return {
    conceptos,
    indicadores,
    errores,
    actividadAplicar: c.actividad_aplicar || "",
    actividadEvaluar: c.actividad_evaluar || "",
    actividadComprender: c.actividad_comprender || "",
    estrategiaMotivacion: c.estrategia_motivacion || ""
  };
}

/**
 * 1. Generador Especializado de Matemática
 */
function buildMathContent(
  oa: OACatalogItem,
  classNum: number,
  totalLessons: number,
  item: { title: string; focoDidactico: string }
): DisciplineContent {
  const isFirst = classNum === 1;
  const isLast = classNum === totalLessons;
  const curr = parseCurriculumItem(findCurriculumItem(oa));
  const concepto = curr.conceptos[(classNum - 1) % Math.max(1, curr.conceptos.length)] || item.focoDidactico;
  const errorFrecuente = curr.errores[(classNum - 1) % Math.max(1, curr.errores.length)] || "Confundir el sentido de la operación o ignorar las unidades de medida";
  const actividad = curr.actividadAplicar || "Resolver problemas contextualizados modelando la operación en el cuaderno";

  return {
    objetivoAdulto: `Acompañar al estudiante a comprender y aplicar el procedimiento matemático de: ${item.title}, formalizando el concepto de ${concepto} y modelando el cálculo en el cuaderno.`,
    climaEmocional: isFirst
      ? "Crea un clima seguro: 'En matemática, el error no es una falla: es la mejor pista para entender cómo funciona la regla'."
      : "Refuerza la autonomía: 'Tómate el tiempo necesario para ordenar los datos y verificar antes de escribir'.",
    situacionIntro: {
      dialogo: `Hoy exploramos '${item.title}'. En el currículum de Matemática, el foco de esta clase es comprender '${concepto}'. Observa la situación planteada en pantalla sobre ${item.focoDidactico}:`,
      pregunta: `¿Qué datos numéricos reconoces en este caso y qué relación tienen con '${concepto}'?`,
      respEsperada: `Identificar con precisión los valores conocidos de ${item.title} y vincularlos formalmente al concepto de ${concepto}.`,
      pistaSocratica: `Pídele que señale qué representa cada número en el contexto antes de intentar calcular.`,
      options: [
        {
          label: `Identificó los datos numéricos y explicó la relación con ${concepto}`,
          kind: 'correct',
          feedbackText: '¡Exacto! Reconoció los valores dados y el procedimiento matemático necesario.'
        },
        {
          label: 'Mencionó solo los números sin explicar la relación ni la operación',
          kind: 'needs_support',
          feedbackText: 'Observa qué representa cada cantidad y qué operación se necesita para llegar a la respuesta.'
        }
      ]
    },
    recorrido: [
      {
        context: `Estructura de Datos y ${concepto}`,
        question: `Al observar el problema planteado, ¿de qué manera el concepto de '${concepto}' nos permite organizar los datos conocidos para encontrar la solución?`,
        expected: `Explicar cómo ${concepto} estructura los datos y permite formular el planteamiento formal.`,
        success: `¡Muy bien! Utilizaste ${concepto} para estructurar con claridad el problema.`,
        support: `Observa el punto de referencia o la regla dada en pantalla: ¿cómo se aplica a estas cantidades?`,
        reveal: `El concepto de ${concepto} permite asignar significado y orden a cada cantidad dentro del problema.`,
        studentReveal: `La forma en que ${concepto} organiza los datos para plantear la solución.`
      },
      {
        context: "Procedimiento y Prevención de Errores",
        question: `Para resolver esta situación sin caer en el error de '${errorFrecuente}', ¿qué paso formal debemos realizar en el cálculo?`,
        expected: `Describir el paso del procedimiento formal que evita la confusión o error frecuente.`,
        success: `¡Excelente! Identificaste el procedimiento formal que asegura la precisión del resultado.`,
        support: `Recuerda la regla explicada: opera en el orden debido y verifica siempre los signos o unidades.`,
        reveal: `El procedimiento formal exige respetar el orden de las operaciones y verificar los datos en el contexto original.`,
        studentReveal: `El paso a paso riguroso que evita errores y asegura el resultado exacto.`
      }
    ],
    ideaClaveExplicativo: `Para dominar ${item.title}, aplicamos el algoritmo formal de ${concepto} verificando siempre con la operación inversa.`,
    dileAntesExplicativo: `Ahora veremos la demostración matemática formal de ${item.title}. Fíjate en el paso a paso del cálculo y en cómo se comprueba el resultado.`,
    practica: [
      {
        context: "Ejercicio 1 en Cuaderno: Modelamiento Formal",
        question: `Abre tu cuaderno de notas. Escribe como título: '${item.title}'. Con base en la actividad de aprendizaje (${actividad.slice(0, 90)}...), registra los datos ordenadamente, plantea la operación formal y calcula el resultado final.`,
        expected: "Desarrollo ordenado en el cuaderno mostrando el planteamiento formal, cálculo y resultado verificado.",
        success: "¡Excelente trabajo en tu cuaderno! El desarrollo matemático está ordenado y el cálculo es exacto.",
        support: "Revisa la diapositiva de la regla: primero plantea los números en orden, resuelve la operación y comprueba.",
        reveal: "El resultado correcto se obtiene operando según la prioridad de cálculo y verificando que el valor tenga sentido.",
        studentReveal: "Desarrollo completo en el cuaderno con el resultado final comprobado."
      },
      {
        context: "Ejercicio 2 en Cuaderno: Problema de Aplicación Contextualizado",
        question: `En tu cuaderno, resuelve el siguiente problema de la vida cotidiana sobre ${item.focoDidactico}: Modela la situación con una expresión matemática, calcula el resultado y redacta una respuesta completa indicando las unidades correspondientes.`,
        expected: "Resolución del problema verbal con planteamiento, cálculo y respuesta contextualizada.",
        success: "¡Muy bien! Tu respuesta en el cuaderno no es solo un número aislado: tiene significado y unidades en el contexto.",
        support: "Recuerda el método de 4 pasos: comprender el problema, planificar la operación, ejecutar el cálculo y comprobar.",
        reveal: "El problema se resuelve relacionando las cantidades dadas y expresando la respuesta con sus unidades en el contexto real.",
        studentReveal: "Problema resuelto en el cuaderno con respuesta completa y unidades."
      }
    ],
    resumen: {
      ideaClave: `Para resolver problemas sobre ${item.title}, identificamos las magnitudes, aplicamos la regla de ${concepto} y comprobamos con la operación inversa.`,
      sintesis: `Hoy dominaste ${item.focoDidactico} con rigor curricular y práctica efectiva en tu cuaderno físico.`,
      estrategia: `1. Identificar datos y magnitudes · 2. Aplicar la regla formal de ${concepto} · 3. Comprobar el resultado en el contexto original.`
    },
    miniquiz: [
      {
        q: `Al resolver una situación sobre ${item.title}, ¿cuál es la aplicación correcta del concepto de ${concepto}?`,
        options: [
          `Aplicar el procedimiento de ${concepto} respetando el orden formal y comprobando el resultado con la operación inversa`,
          `Operar de forma directa con los números sin considerar su sentido ni las condiciones del problema`,
          `Invertir arbitrariamente los signos y las unidades sin justificación matemática`
        ],
        correct: `Aplicar el procedimiento de ${concepto} respetando el orden formal y comprobando el resultado con la operación inversa`,
        dileReview: "Pídele que señale por qué eligió esta respuesta y qué elemento clave de la pantalla confirma su validez.",
        fixExplain: `En matemática formal, la aplicación rigurosa de ${concepto} asegura que el cálculo sea determinista y verificable.`
      },
      {
        q: `Respecto al error frecuente detectado en este contenido (${errorFrecuente}), ¿qué criterio debemos aplicar para resolverlo correctamente?`,
        options: [
          `Verificar el planteamiento inicial y las unidades de medida antes de ejecutar el algoritmo definitivo`,
          `Asumir que cualquier resultado es válido sin verificar si tiene sentido en el contexto real`,
          `Omitir el paso de comprobación para terminar el ejercicio con mayor rapidez`
        ],
        correct: `Verificar el planteamiento inicial y las unidades de medida antes de ejecutar el algoritmo definitivo`,
        dileReview: "Pregúntale: ¿cuál es la trampa frecuente en este paso y cómo la evitaste?",
        fixExplain: `Atención con este error frecuente: ${errorFrecuente}. Siempre debemos verificar el planteamiento antes de dar el resultado por definitivo.`
      },
      {
        q: `En la evaluación formativa de ${item.focoDidactico}, ¿qué propiedad garantiza que el resultado obtenido en el cuaderno sea matemáticamente válido?`,
        options: [
          `La consistencia lógica de la operación inversa que permite verificar que la solución satisface el enunciado inicial`,
          `Que el número obtenido sea de mayor magnitud que todos los datos iniciales del problema`,
          `Que el resultado coincida con una suposición previa sin requerir verificación operativa`
        ],
        correct: `La consistencia lógica de la operación inversa que permite verificar que la solución satisface el enunciado inicial`,
        dileReview: "Pídele que te justifique con sus propias palabras cómo la operación inversa demuestra que el resultado no tiene error.",
        fixExplain: "La verificación formal mediante la operación inversa es el estándar psicométrico y pedagógico que confirma el dominio del cálculo."
      }
    ],
    recuperacion: [
      {
        title: `Recuperación Matemática: ${item.title}`,
        explain: `Al resolver situaciones de ${item.focoDidactico}, recuerda que ${concepto} requiere ordenar los datos en tu cuaderno y comprobar siempre con la operación inversa.`,
        q: `¿Cuál es la regla fundamental para asegurar la validez de tu resultado en ${item.title}?`,
        options: [
          `Reemplazar el valor obtenido en las condiciones iniciales y comprobar con la operación inversa`,
          `Quedarse con el primer valor numérico calculado sin realizar ninguna comprobación`
        ],
        correct: "Reemplazar el valor obtenido en las condiciones iniciales y comprobar con la operación inversa",
        correctText: "¡Correcto! Comprobar reemplazando en el problema original garantiza la maestría del procedimiento.",
        fixText: "Recuerda que comprobar es parte fundamental del quehacer matemático: verifica siempre que tu resultado satisfaga las condiciones iniciales."
      }
    ],
    cierre: {
      preguntaSintesis: `En tus propias palabras, ¿cómo le explicarías a tu familia la importancia de ${concepto} en ${item.title}?`,
      metacognicion: "¿Qué parte de la clase te pareció más desafiante y qué estrategia usaste para superarla?",
      celebracion: isLast
        ? `¡Felicitaciones! Has completado todas las lecciones del Objetivo de Aprendizaje ${oa.oa}. ¡Excelente trabajo matemático!`
        : `¡Gran trabajo hoy! Has dominado la Clase ${classNum}. ¡Nos vemos en la siguiente misión!`
    }
  };
}

/**
 * 2. Generador Especializado de Ciencias Naturales
 */
function buildScienceContent(
  oa: OACatalogItem,
  classNum: number,
  totalLessons: number,
  item: { title: string; focoDidactico: string }
): DisciplineContent {
  const isFirst = classNum === 1;
  const isLast = classNum === totalLessons;
  const curr = parseCurriculumItem(findCurriculumItem(oa));
  const concepto = curr.conceptos[(classNum - 1) % Math.max(1, curr.conceptos.length)] || item.focoDidactico;
  const errorFrecuente = curr.errores[(classNum - 1) % Math.max(1, curr.errores.length)] || "Confundir una correlación circunstancial con una relación de causa y efecto comprobada";
  const actividad = curr.actividadAplicar || "Investigar experimentalmente y registrar observaciones en esquemas y tablas";

  return {
    objetivoAdulto: `Guiar la observación y el análisis científico en torno a: ${item.title}, facilitando la comprensión de ${concepto} mediante evidencias empíricas.`,
    climaEmocional: isFirst
      ? "Despierta el asombro científico: 'En ciencias investigamos para entender cómo funciona la naturaleza a partir de evidencias'."
      : "Estimula el rigor observacional: 'Un buen científico contrasta sus ideas con lo que los datos demuestran'.",
    situacionIntro: {
      dialogo: `Hoy en Ciencias Naturales investigamos '${item.title}'. El fenómeno central del currículum se basa en '${concepto}'. Observa la evidencia o experimento inicial en la pantalla:`,
      pregunta: `¿Qué fenómeno observable ocurre en este escenario de ${item.focoDidactico} y cómo se relaciona con '${concepto}'?`,
      respEsperada: `Describir las estructuras, componentes o variables involucradas en el fenómeno de ${item.title} y vincularlas con ${concepto}.`,
      pistaSocratica: `Pídele que señale qué elementos o condiciones cambian y qué permanece constante.`,
      options: [
        {
          label: `Identificó las estructuras y explicó la relación con ${concepto}`,
          kind: 'correct',
          feedbackText: '¡Excelente observación! Reconoció las variables y componentes centrales del fenómeno.'
        },
        {
          label: 'Describió solo un detalle superficial sin relacionar las causas con los efectos',
          kind: 'needs_support',
          feedbackText: 'Observa qué causa produce el cambio: ¿qué estructura o fuerza está actuando?'
        }
      ]
    },
    recorrido: [
      {
        context: `Estructura y Función de ${concepto}`,
        question: `¿Qué función específica cumple '${concepto}' dentro del sistema natural o biológico que estamos investigando?`,
        expected: `Explicar el rol funcional de ${concepto} y cómo interactúa con los demás componentes del sistema.`,
        success: `¡Muy bien! Relacionaste con precisión la estructura con su función biológica o física.`,
        support: `Piensa en el sistema como un equipo: ¿qué tarea indispensable realiza este componente?`,
        reveal: `Cada componente del sistema cumple una función especializada que permite el equilibrio y funcionamiento del conjunto.`,
        studentReveal: `La función especializada de ${concepto} y su interacción en el sistema.`
      },
      {
        context: "Evidencia Experimental y Prevención de Errores",
        question: `Para no caer en el error de '${errorFrecuente}', ¿qué evidencia científica debemos comprobar antes de concluir?`,
        expected: `Identificar la evidencia empírica u observación experimental que valida la conclusión científica.`,
        success: `¡Exacto! El método científico exige basar las conclusiones en datos comprobables y no en suposiciones.`,
        support: `Revisa los datos del experimento: ¿qué demuestran las mediciones u observaciones directas?`,
        reveal: `La evidencia empírica comprobable es la única base legítima para formular explicaciones científicas válidas.`,
        studentReveal: `La evidencia experimental que respalda la conclusión sin dejar lugar a suposiciones.`
      }
    ],
    ideaClaveExplicativo: `Los sistemas naturales funcionan mediante interacciones precisas entre sus componentes, donde '${concepto}' cumple un rol fundamental respaldado por evidencia observable.`,
    dileAntesExplicativo: `Ahora veremos el video explicativo de ${item.title}. Presta atención al diagrama y a cómo se demuestra la función de ${concepto}.`,
    practica: [
      {
        context: "Ejercicio 1 en Cuaderno: Esquema Rotulado de Investigación",
        question: `Abre tu cuaderno de notas. Escribe como título: '${item.title}'. Dibuja un diagrama ordenado del sistema estudiado, rotula sus partes principales destacando '${concepto}' y describe brevemente la función de cada una (${actividad.slice(0, 80)}...).`,
        expected: "Esquema científico en el cuaderno con rotulación precisa de estructuras y descripción de funciones.",
        success: "¡Excelente esquema en tu cuaderno! Las etiquetas son precisas y las relaciones entre partes están claras.",
        support: "Usa flechas para indicar el flujo o la interacción entre los componentes del diagrama.",
        reveal: "El esquema rotulado permite visualizar con claridad la arquitectura del sistema y el rol de cada estructura.",
        studentReveal: "Diagrama completo y rotulado en el cuaderno con las funciones de cada estructura."
      },
      {
        context: "Ejercicio 2 en Cuaderno: Análisis de Caso o Causa-Efecto",
        question: `En tu cuaderno, redacta una respuesta científica fundamentada: Si se alterara la condición o componente '${concepto}', ¿qué consecuencias inmediatas y a largo plazo se observarían en el sistema?`,
        expected: "Explicación causal en el cuaderno anticipando las consecuencias ecológicas o fisiológicas con rigor científico.",
        success: "¡Muy bien! Tu razonamiento de causa y efecto demuestra una profunda comprensión del equilibrio del sistema.",
        support: "Piensa en cadena: si falla este componente, ¿qué otro proceso se detiene o se desequilibra?",
        reveal: "La alteración de un componente clave rompe el equilibrio funcional del sistema natural.",
        studentReveal: "Análisis de causa y efecto en el cuaderno fundamentado en evidencia científica."
      }
    ],
    resumen: {
      ideaClave: `En ${item.title}, el funcionamiento armónico del sistema depende de ${concepto}, y toda afirmación debe estar respaldada por datos observables.`,
      sintesis: `Hoy comprendiste ${item.focoDidactico} con rigor científico y registro visual en tu cuaderno de ciencias.`,
      estrategia: `1. Observar las evidencias observables · 2. Relacionar estructura y función de ${concepto} · 3. Contrastar con datos experimentales.`
    },
    miniquiz: [
      {
        q: `En el estudio científico de ${item.title}, ¿cuál de las siguientes afirmaciones describe con mayor precisión la función de ${concepto}?`,
        options: [
          `El proceso ocurre mediante la interacción coordinada de sus componentes según leyes naturales comprobables vinculadas a ${concepto}`,
          `El fenómeno es completamente aleatorio y no responde a ninguna causa biológica o ambiental identificable`,
          `El proceso ocurre de manera instantánea sin que intervengan estructuras celulares o fuerzas del entorno`
        ],
        correct: `El proceso ocurre mediante la interacción coordinada de sus componentes según leyes naturales comprobables vinculadas a ${concepto}`,
        dileReview: "Pídele que explique en qué evidencia empírica se basa para seleccionar esta opción.",
        fixExplain: `Todo proceso natural responde a mecanismos específicos donde cada estructura, como ${concepto}, cumple un rol funcional determinado.`
      },
      {
        q: `Al analizar las evidencias científicas de ${item.focoDidactico}, ¿qué criterio previene el error frecuente de '${errorFrecuente}'?`,
        options: [
          `Verificar experimentalmente las relaciones de causa y efecto mediante datos reproducibles antes de formular una conclusión`,
          `Aceptar la primera impresión visual sin contrastarla con observaciones ni registros controlados`,
          `Asumir que si dos eventos ocurren al mismo tiempo uno es necesariamente la causa del otro`
        ],
        correct: `Verificar experimentalmente las relaciones de causa y efecto mediante datos reproducibles antes de formular una conclusión`,
        dileReview: "Pregúntale: ¿cómo distingue un científico entre una simple coincidencia y una verdadera causa?",
        fixExplain: `En el método científico es indispensable controlar variables y verificar datos antes de establecer causalidad.`
      },
      {
        q: `¿De qué manera el conocimiento sobre ${item.title} y ${concepto} contribuye al autocuidado, la salud o la sustentabilidad ambiental?`,
        options: [
          `Permite tomar decisiones informadas y fundamentadas en evidencia para prevenir riesgos y mantener el equilibrio saludable`,
          `Demuestra que las acciones humanas individuales no tienen ningún impacto en el organismo o en los ecosistemas`,
          `Indica que basta con guiarse por creencias populares sin verificar la evidencia científica disponible`
        ],
        correct: `Permite tomar decisiones informadas y fundamentadas en evidencia para prevenir riesgos y mantener el equilibrio saludable`,
        dileReview: "Pídele que mencione un ejemplo real de la vida cotidiana donde este conocimiento marque una diferencia.",
        fixExplain: "La comprensión de los procesos biológicos y ambientales es la base para el autocuidado responsable, la prevención médica y la sustentabilidad."
      }
    ],
    recuperacion: [
      {
        title: `Recuperación Científica: ${item.title}`,
        explain: `Al estudiar ${item.focoDidactico}, recuerda que ${concepto} cumple una función biológica o física específica que podemos verificar mediante evidencias.`,
        q: `¿Cuál es el criterio científico fundamental para validar una explicación en ${item.title}?`,
        options: [
          `Basar la conclusión en evidencias observables y en el funcionamiento comprobado de ${concepto}`,
          `Aceptar una afirmación sin requerir evidencias empíricas ni demostración experimental`
        ],
        correct: `Basar la conclusión en evidencias observables y en el funcionamiento comprobado de ${concepto}`,
        correctText: "¡Correcto! El pensamiento científico siempre exige fundamentar las conclusiones en evidencias sólidas.",
        fixText: "Recuerda que en Ciencias Naturales la evidencia empírica es el pilar de toda explicación: observa los datos antes de concluir."
      }
    ],
    cierre: {
      preguntaSintesis: `En tus propias palabras, ¿cómo le explicarías a tu familia el funcionamiento e importancia de ${concepto} en ${item.title}?`,
      metacognicion: "¿Qué descubrimiento de la clase de hoy te llamó más la atención y por qué?",
      celebracion: isLast
        ? `¡Felicitaciones! Has completado todas las investigaciones del Objetivo de Aprendizaje ${oa.oa}. ¡Excelente labor científica!`
        : `¡Gran trabajo hoy! Has dominado la Clase ${classNum}. ¡Nos vemos en la próxima expedición científica!`
    }
  };
}

/**
 * 3. Generador Especializado de Historia, Geografía y Ciencias Sociales
 */
function buildHistoryContent(
  oa: OACatalogItem,
  classNum: number,
  totalLessons: number,
  item: { title: string; focoDidactico: string }
): DisciplineContent {
  const isFirst = classNum === 1;
  const isLast = classNum === totalLessons;
  const curr = parseCurriculumItem(findCurriculumItem(oa));
  const concepto = curr.conceptos[(classNum - 1) % Math.max(1, curr.conceptos.length)] || item.focoDidactico;
  const errorFrecuente = curr.errores[(classNum - 1) % Math.max(1, curr.errores.length)] || "Juzgar las acciones del pasado con valores contemporáneos sin considerar el contexto histórico (presentismo)";
  const actividad = curr.actividadAplicar || "Analizar fuentes históricas primarias y secundarias contrastando perspectivas";

  return {
    objetivoAdulto: `Acompañar al estudiante a contextualizar y comprender el proceso histórico o geográfico de: ${item.title}, desarrollando el pensamiento crítico y analizando ${concepto}.`,
    climaEmocional: isFirst
      ? "Crea un clima de exploración histórica: 'En historia no memorizamos fechas sueltas: comprendemos por qué las personas actuaron de determinada manera'."
      : "Fomenta la perspectiva histórica: 'Analiza los hechos considerando la época y el espacio geográfico en que ocurrieron'.",
    situacionIntro: {
      dialogo: `Hoy en Historia y Ciencias Sociales nos situamos en '${item.title}'. El concepto histórico central que abordamos es '${concepto}'. Observa el escenario histórico planteado en la pantalla sobre ${item.focoDidactico}:`,
      pregunta: `¿Qué causas o necesidades motivaron a las comunidades de esa época en relación con '${concepto}'?`,
      respEsperada: `Explicar las necesidades de subsistencia, recursos geográficos o motivos sociales vinculados con ${concepto}.`,
      pistaSocratica: `Pídele que se sitúe en el lugar de las personas de la época: ¿con qué recursos contaban y qué problemas debían solucionar?`,
      options: [
        {
          label: `Explicó las causas históricas y geográficas vinculadas con ${concepto}`,
          kind: 'correct',
          feedbackText: '¡Exacto! Comprendió las causas históricas y geográficas que motivaron a las personas de esa época.'
        },
        {
          label: 'Solo mencionó hechos aislados sin explicar por qué ocurrieron',
          kind: 'needs_support',
          feedbackText: 'Pídele que piense en los desafíos del entorno: ¿por qué necesitaban organizarse de esa manera?'
        }
      ]
    },
    recorrido: [
      {
        context: `Contexto Temporal, Espacial y ${concepto}`,
        question: `¿De qué manera el entorno geográfico y la época condicionaron el desarrollo de '${concepto}' en este proceso histórico?`,
        expected: `Relacionar las características del espacio geográfico con la organización social y el desarrollo de ${concepto}.`,
        success: `¡Muy bien! Ubicaste con precisión las coordenadas temporales y espaciales del proceso.`,
        support: `Observa las referencias del mapa y la cronología: ¿qué recursos naturales o rutas influían en sus decisiones?`,
        reveal: `El entorno geográfico y las condiciones de la época condicionaron profundamente los modos de vida y las instituciones humanas.`,
        studentReveal: `La influencia del espacio geográfico y el tiempo histórico en ${concepto}.`
      },
      {
        context: "Pensamiento Crítico y Prevención del Presentismo",
        question: `Para evitar el error común de '${errorFrecuente}', ¿qué debemos considerar al analizar las decisiones tomadas por los actores históricos?`,
        expected: `Evaluar las decisiones históricas desde la mentalidad, recursos y cosmovisión propia de la época estudiada.`,
        success: `¡Excelente empatía histórica! Analizaste el pasado desde su propio contexto y no desde los prejuicios actuales.`,
        support: `Piensa qué información y qué valores tenían en ese siglo: ¿podían prever las consecuencias de la misma forma que nosotros hoy?`,
        reveal: `El rigor histórico exige comprender las razones de los protagonistas en su propio tiempo, evitando anacronismos.`,
        studentReveal: `La comprensión del pasado desde el contexto propio de sus protagonistas.`
      }
    ],
    ideaClaveExplicativo: `Los procesos históricos sobre ${item.title} responden a múltiples causas interconectadas, donde '${concepto}' explica cómo las sociedades resolvieron sus desafíos de convivencia y subsistencia.`,
    dileAntesExplicativo: `Ahora veremos el video explicativo de ${item.title}. Observa el mapa conceptual y cómo se articula el concepto de ${concepto}.`,
    practica: [
      {
        context: "Ejercicio 1 en Cuaderno: Análisis de Fuentes y Cuadro Comparativo",
        question: `Abre tu cuaderno de notas. Escribe como título: '${item.title}'. Con base en la actividad (${actividad.slice(0, 80)}...), dibuja un cuadro de doble entrada: en una columna registra los antecedentes geográficos y sociales, y en la otra explica el impacto de '${concepto}'.`,
        expected: "Cuadro comparativo en el cuaderno con antecedentes históricos y análisis fundamentado del impacto de concepto.",
        success: "¡Excelente análisis en tu cuaderno! Has sintetizado las múltiples causas con claridad y orden.",
        support: "Revisa la línea de tiempo en pantalla: identifica qué ocurrió antes y qué transformaciones trajo este acontecimiento.",
        reveal: "El cuadro comparativo permite distinguir causas estructurales de consecuencias inmediatas en el proceso histórico.",
        studentReveal: "Cuadro comparativo completo en el cuaderno con causas y consecuencias analizadas."
      },
      {
        context: "Ejercicio 2 en Cuaderno: Reflexión de Ciudadanía y Continuidad",
        question: `En tu cuaderno, responde con un breve texto argumentativo: ¿Qué elementos de '${concepto}' continúan presentes en nuestra sociedad actual y qué aspectos han cambiado sustancialmente?`,
        expected: "Reflexión argumentada identificando elementos de cambio y continuidad histórica entre el pasado y el presente.",
        success: "¡Muy buena argumentación! Conectaste el aprendizaje histórico con la realidad ciudadana actual.",
        support: "Piensa en nuestras leyes, ciudades o costumbres: ¿qué heredamos de esa civilización o proceso?",
        reveal: "La historia nos permite comprender el presente al identificar las raíces de nuestras instituciones contemporáneas.",
        studentReveal: "Reflexión en el cuaderno sobre continuidades y transformaciones hacia el presente."
      }
    ],
    resumen: {
      ideaClave: `En ${item.title}, comprendemos que '${concepto}' es resultado de procesos multicausales donde el espacio, el tiempo y la acción humana interactúan.`,
      sintesis: `Hoy dominaste ${item.focoDidactico} con pensamiento crítico y fuentes históricas en tu cuaderno.`,
      estrategia: `1. Situar en tiempo y espacio · 2. Analizar múltiples causas en torno a ${concepto} · 3. Identificar cambios y continuidades hacia el presente.`
    },
    miniquiz: [
      {
        q: `Al estudiar el proceso de ${item.title}, ¿cuál de las siguientes opciones describe con rigor histórico el rol de '${concepto}'?`,
        options: [
          `Constituyó un elemento articulador que permitió a la sociedad responder a sus necesidades de organización y territorio`,
          `Fue un acontecimiento completamente aislado que no tuvo ninguna relación con el entorno social ni geográfico`,
          `Ocurrió por decisión exclusiva de un único individuo sin influencia de la comunidad ni de la época`
        ],
        correct: `Constituyó un elemento articulador que permitió a la sociedad responder a sus necesidades de organización y territorio`,
        dileReview: "Pídele que señale qué fuentes o evidencias históricas analizadas hoy justifican esta afirmación.",
        fixExplain: `Los procesos históricos son colectivos y multicausales; ${concepto} responde a dinámicas sociales y territoriales profundas.`
      },
      {
        q: `Para analizar críticamente este proceso sin caer en el error de '${errorFrecuente}', ¿qué actitud metodológica debemos adoptar?`,
        options: [
          `Evaluar las decisiones históricas considerando el contexto, las creencias y los recursos disponibles en su época`,
          `Condenar inmediatamente las acciones del pasado aplicando únicamente los estándares de la sociedad actual`,
          `Ignorar las fuentes primarias y basarse en opiniones espontáneas sin respaldo documental`
        ],
        correct: `Evaluar las decisiones históricas considerando el contexto, las creencias y los recursos disponibles en su época`,
        dileReview: "Pregúntale: ¿por qué es injusto juzgar a personas del pasado como si tuvieran la tecnología y valores de hoy?",
        fixExplain: `El presentismo distorsiona la comprensión histórica; la empatía histórica permite entender las motivaciones reales de los actores del pasado.`
      },
      {
        q: `¿Qué importancia tiene para la formación ciudadana actual el análisis de ${item.focoDidactico}?`,
        options: [
          `Permite valorar los derechos humanos, la participación democrática y la diversidad cultural al comprender su evolución histórica`,
          `Demuestra que el pasado no guarda ninguna relación con los problemas ni desafíos de la sociedad moderna`,
          `Enseña que las leyes e instituciones humanas son inmutables y no han cambiado a lo largo de los siglos`
        ],
        correct: `Permite valorar los derechos humanos, la participación democrática y la diversidad cultural al comprender su evolución histórica`,
        dileReview: "Pídele que mencione cómo lo aprendido hoy fortalece su rol como ciudadano responsable en su comunidad.",
        fixExplain: "El aprendizaje histórico fortalece el juicio cívico y la convivencia democrática mediante el análisis crítico del pasado."
      }
    ],
    recuperacion: [
      {
        title: `Recuperación Histórica: ${item.title}`,
        explain: `Al analizar ${item.focoDidactico}, recuerda situar siempre los acontecimientos en su espacio geográfico y comprender ${concepto} dentro de su época.`,
        q: `¿Cuál es el principio metodológico central para interpretar un hecho histórico en ${item.title}?`,
        options: [
          `Analizar el hecho a partir de sus fuentes históricas y el contexto propio de ${concepto}`,
          `Memorizar fechas aisladas sin considerar las causas ni las consecuencias del proceso`
        ],
        correct: `Analizar el hecho a partir de sus fuentes históricas y el contexto propio de ${concepto}`,
        correctText: "¡Correcto! Comprender el contexto histórico es la base del pensamiento crítico en Ciencias Sociales.",
        fixText: "Recuerda que la historia explica procesos humanos: busca siempre las causas y el entorno donde ocurrieron."
      }
    ],
    cierre: {
      preguntaSintesis: `En tus propias palabras, ¿qué lección o reflexión para el presente nos deja el estudio de ${concepto} en ${item.title}?`,
      metacognicion: "¿Qué estrategia te ayudó más a comprender la época estudiada: analizar el mapa o ponerte en el lugar de los protagonistas?",
      celebracion: isLast
        ? `¡Felicitaciones! Has completado todas las investigaciones del Objetivo de Aprendizaje ${oa.oa}. ¡Excelente labor histórica!`
        : `¡Gran trabajo hoy! Has dominado la Clase ${classNum}. ¡Nos vemos en la próxima expedición histórica!`
    }
  };
}

/**
 * 4. Generador Especializado de Lengua y Literatura
 */
function buildLanguageContent(
  oa: OACatalogItem,
  classNum: number,
  totalLessons: number,
  item: { title: string; focoDidactico: string }
): DisciplineContent {
  const isFirst = classNum === 1;
  const isLast = classNum === totalLessons;
  const curr = parseCurriculumItem(findCurriculumItem(oa));
  const concepto = curr.conceptos[(classNum - 1) % Math.max(1, curr.conceptos.length)] || item.focoDidactico;
  const errorFrecuente = curr.errores[(classNum - 1) % Math.max(1, curr.errores.length)] || "Quedarse en una lectura puramente literal sin inferir el sentido profundo ni la intención del autor";
  const actividad = curr.actividadAplicar || "Analizar textos narrativos o poéticos identificando recursos literarios e indicios textuales";

  return {
    objetivoAdulto: `Acompañar la lectura comprensiva e interpretativa de: ${item.title}, guiando al estudiante a inferir sentidos profundos en torno a '${concepto}' y dialogar sobre la obra.`,
    climaEmocional: isFirst
      ? "Invita al disfrute y la curiosidad literaria: 'Leer no es solo descifrar palabras: es descubrir nuevos mundos, emociones y puntos de vista'."
      : "Estimula la voz propia: 'En literatura tu interpretación es valiosa siempre que encuentres pistas en el texto que la respalden'.",
    situacionIntro: {
      dialogo: `Hoy en Lengua y Literatura nos sumergimos en '${item.title}'. El concepto literario clave que exploraremos es '${concepto}'. Observa el fragmento o situación inicial en la pantalla sobre ${item.focoDidactico}:`,
      pregunta: `¿Qué conflicto, dilema humano o recurso expresivo identificas en este texto en relación con '${concepto}'?`,
      respEsperada: `Identificar el tema central, conflicto del personaje o recurso literario vinculado con ${concepto}.`,
      pistaSocratica: `Pídele que relea la primera frase y se fije en cómo se siente el protagonista o qué tono tiene el narrador.`,
      options: [
        {
          label: `Identificó el conflicto central y lo vinculó con ${concepto}`,
          kind: 'correct',
          feedbackText: '¡Excelente intuición lectora! Reconoció el dilema humano y el sentido de la situación.'
        },
        {
          label: 'Repitió palabras del texto sin interpretar lo que sienten los personajes',
          kind: 'needs_support',
          feedbackText: 'Pregúntale qué emoción transmite el personaje: ¿por qué actúa de esa forma?'
        }
      ]
    },
    recorrido: [
      {
        context: `Indicios Textuales y ${concepto}`,
        question: `¿Qué palabras o pistas del texto nos permiten inferir la presencia e importancia de '${concepto}' en este relato?`,
        expected: `Citar pistas textuales o acciones de los personajes que demuestran el sentido de ${concepto}.`,
        success: `¡Muy bien! Tu interpretación se apoya directamente en evidencias del texto y no en suposiciones.`,
        support: `Busca en el segundo párrafo: ¿qué palabras describen la atmósfera o la motivación del personaje?`,
        reveal: `La comprensión profunda se construye rastreando las pistas explícitas e implícitas que el autor distribuye en la obra.`,
        studentReveal: `Las pistas textuales que confirman la presencia y sentido de ${concepto}.`
      },
      {
        context: "Sentido Figurado y Prevención del Error Literal",
        question: `Para no caer en el error de '${errorFrecuente}', ¿cómo debemos interpretar las expresiones en sentido figurado o simbólico de esta obra?`,
        expected: `Distinguir el significado literal del sentido connotativo o metafórico que el autor busca evocar.`,
        success: `¡Exacto! Lograste ver más allá de las palabras literales y descubriste la metáfora profunda del autor.`,
        support: `Piensa qué imagen o sentimiento evoca esa frase: ¿busca describir un hecho físico o una emoción interior?`,
        reveal: `El lenguaje literario utiliza recursos figurados para transmitir experiencias humanas universales que trascienden lo literal.`,
        studentReveal: `La interpretación del sentido figurado y simbólico de la obra.`
      }
    ],
    ideaClaveExplicativo: `En ${item.title}, el autor utiliza '${concepto}' para construir una experiencia estética y reflexiva que interpela al lector en sus propias vivencias.`,
    dileAntesExplicativo: `Ahora veremos el video explicativo de ${item.title}. Observa cómo se analiza el personaje y la función de ${concepto}.`,
    practica: [
      {
        context: "Ejercicio 1 en Cuaderno: Ficha de Análisis Textual",
        question: `Abre tu cuaderno de notas. Escribe como título: '${item.title}'. Con base en la actividad (${actividad.slice(0, 80)}...), escribe un breve párrafo analizando el rol de '${concepto}': cita una frase del texto, explica su significado implícito y menciona qué valor transmite.`,
        expected: "Desarrollo en el cuaderno con cita textual, interpretación del significado implícito y reflexión sobre el valor o tema.",
        success: "¡Excelente análisis literario en tu cuaderno! Tu interpretación está fundamentada con citas precisas.",
        support: "Revisa la diapositiva: subraya la cita textual y escribe con tus palabras qué revela sobre el protagonista.",
        reveal: "El análisis riguroso vincula la cita textual con la interpretación temática y el contexto de la obra.",
        studentReveal: "Ficha de análisis completa en el cuaderno con cita e interpretación fundamentada."
      },
      {
        context: "Ejercicio 2 en Cuaderno: Producción Escrita Breve y Revisión",
        question: `En tu cuaderno, redacta una breve continuación o respuesta reflexiva de 5 líneas aplicando '${concepto}'. Al finalizar, revisa tu texto cuidando la coherencia, el uso de conectores y la ortografía.`,
        expected: "Micro-escritura creativa en el cuaderno con aplicación de concepto y revisión de cohesión y ortografía.",
        success: "¡Muy buena producción escrita! Tu texto es coherente, expresivo y demuestra el dominio del concepto literario.",
        support: "Lee tu borrador en voz alta: ¿las ideas se conectan con fluidez? Corrige las tildes antes de darlo por listo.",
        reveal: "Escribir y revisar permite consolidar la apropiación del lenguaje y expresar ideas personales con rigor.",
        studentReveal: "Texto breve producido y revisado en el cuaderno con coherencia y precisión."
      }
    ],
    resumen: {
      ideaClave: `En ${item.title}, '${concepto}' nos abre la puerta a interpretar el sentido implícito de la obra y conectar con la experiencia humana del autor.`,
      sintesis: `Hoy profundizaste en ${item.focoDidactico} con lectura analítica y escritura reflexiva en tu cuaderno.`,
      estrategia: `1. Rastrear pistas explícitas e implícitas · 2. Interpretar el sentido figurado de ${concepto} · 3. Fundamentar la interpretación con el texto.`
    },
    miniquiz: [
      {
        q: `Al interpretar el fragmento de ${item.title}, ¿cuál de las siguientes opciones expresa con mayor fidelidad el rol de '${concepto}'?`,
        options: [
          `Permite develar la motivación profunda del personaje y el conflicto central a través de indicios textuales concretos`,
          `Es un detalle puramente decorativo que no aporta ningún significado a la historia ni al mensaje del autor`,
          `Demuestra que el texto literario carece de sentido implícito y solo debe leerse al pie de la letra`
        ],
        correct: `Permite develar la motivación profunda del personaje y el conflicto central a través de indicios textuales concretos`,
        dileReview: "Pídele que señale qué fragmento específico de la lectura justifica su respuesta.",
        fixExplain: `Toda inferencia legítima en comprensión lectora debe apoyarse en pistas textuales e indicios entregados por la obra.`
      },
      {
        q: `Para no cometer el error de '${errorFrecuente}', ¿qué estrategia de lectura comprensiva debemos emplear?`,
        options: [
          `Distinguir el sentido literal del lenguaje figurado, relacionando las metáforas con las emociones de los personajes`,
          `Asumir que cada palabra significa exclusivamente su definición de diccionario más simple y directa`,
          `Saltarse los pasajes poéticos o descriptivos para centrarse únicamente en el desenlace final`
        ],
        correct: `Distinguir el sentido literal del lenguaje figurado, relacionando las metáforas con las emociones de los personajes`,
        dileReview: "Pregúntale: ¿cómo cambia el mensaje de un poema o relato cuando descubrimos el sentido figurado?",
        fixExplain: `El lenguaje figurado transmite matices que el sentido literal no logra expresar; comprenderlo es la cumbre de la lectura crítica.`
      },
      {
        q: `Durante el proceso de análisis y escritura sobre ${item.focoDidactico}, ¿por qué es indispensable la etapa de revisión del borrador en el cuaderno?`,
        options: [
          `Porque permite verificar la coherencia de las ideas, la precisión de los conectores y la correcta ortografía antes de la versión final`,
          `Porque la primera versión de un texto nunca debe ser modificada bajo ninguna circunstancia`,
          `Porque revisar un texto escrito carece de impacto en la claridad comunicativa ante el lector`
        ],
        correct: `Porque permite verificar la coherencia de las ideas, la precisión de los conectores y la correcta ortografía antes de la versión final`,
        dileReview: "Pídele que te muestre en su cuaderno qué ajustes u observaciones hizo al releer su escrito.",
        fixExplain: "La revisión y edición es la fase fundamental de la escritura que asegura que el mensaje se transmita con claridad y rigor."
      }
    ],
    recuperacion: [
      {
        title: `Recuperación de Lengua y Literatura: ${item.title}`,
        explain: `Al analizar ${item.focoDidactico}, recuerda buscar siempre las pistas explícitas e implícitas en el texto y relacionar '${concepto}' con la intención del autor.`,
        q: `¿Cuál es la estrategia clave para comprender el sentido profundo de una obra en ${item.title}?`,
        options: [
          `Releer con atención buscando las pistas contextuales que justifican la interpretación de '${concepto}'`,
          `Adivinar el tema central fijándose únicamente en el título sin examinar el cuerpo del texto`
        ],
        correct: `Releer con atención buscando las pistas contextuales que justifican la interpretación de '${concepto}'`,
        correctText: "¡Correcto! La relectura atenta guiada por pistas textuales es la mejor herramienta de comprensión lectora.",
        fixText: "Recuerda que en Lengua y Literatura las respuestas están en el texto: vuelve siempre al fragmento para comprobar tu deducción."
      }
    ],
    cierre: {
      preguntaSintesis: `En tus propias palabras, ¿qué personaje, frase o idea de ${item.title} te pareció más significativa y por qué?`,
      metacognicion: "¿Qué estrategia de lectura te ayudó más a entender el sentido profundo del texto?",
      celebracion: isLast
        ? `¡Felicitaciones! Has completado todos los análisis del Objetivo de Aprendizaje ${oa.oa}. ¡Excelente dominio literario!`
        : `¡Gran trabajo hoy! Has dominado la Clase ${classNum}. ¡Nos vemos en la siguiente misión de lectura!`
    }
  };
}

/**
 * 5. Generador Especializado de Idioma Extranjero: Inglés (EFL)
 */
function buildEnglishContent(
  oa: OACatalogItem,
  classNum: number,
  totalLessons: number,
  item: { title: string; focoDidactico: string }
): DisciplineContent {
  const isFirst = classNum === 1;
  const isLast = classNum === totalLessons;
  const curr = parseCurriculumItem(findCurriculumItem(oa));
  const concepto = curr.conceptos[(classNum - 1) % Math.max(1, curr.conceptos.length)] || item.focoDidactico;
  const errorFrecuente = curr.errores[(classNum - 1) % Math.max(1, curr.errores.length)] || "Traducir palabra por palabra en lugar de comprender el sentido comunicativo global";

  return {
    objetivoAdulto: `Acompañar al estudiante en la inmersión del idioma inglés para: ${item.title}. Las instrucciones del apoderado son en español, mientras los textos, vocabulario y miniquiz se practican en inglés con foco en '${concepto}'.`,
    climaEmocional: isFirst
      ? "Crea un ambiente de confianza en inglés: 'Don't worry about making mistakes! In English, every attempt helps you build fluency and vocabulary'."
      : "Fomenta la confianza comunicativa: 'Listen, read the clues, and focus on the general meaning before translating every single word'.",
    situacionIntro: {
      dialogo: `Hoy en nuestra sesión de English exploramos '${item.title}'. El foco comunicativo del currículum es '${concepto}'. El apoderado guía en español mientras que el estudiante lee y escucha en inglés. Lee la siguiente frase en voz alta sobre ${item.focoDidactico}:`,
      pregunta: `"What is the main communicative situation described in this English sentence? (¿Cuál es la situación principal descrita en la oración?)"`,
      respEsperada: `Identificar en español o inglés los personajes (characters), la acción o el propósito comunicativo vinculado con ${concepto}.`,
      pistaSocratica: `Invítalo a identificar las palabras transparentes o cognados (palabras similares al español) para deducir el contexto general.`,
      options: [
        {
          label: `Identificó a los personajes, la acción o el propósito en inglés vinculado con ${concepto}`,
          kind: 'correct',
          feedbackText: '¡Very good! Supo reconocer los elementos clave de la oración en inglés.'
        },
        {
          label: 'Tuvo dudas con el vocabulario o no identificó la acción ni los personajes',
          kind: 'needs_support',
          feedbackText: 'Busquen juntos palabras transparentes y guíalo para identificar el verbo principal de la acción.'
        }
      ]
    },
    recorrido: [
      {
        context: `Key Vocabulary & Context Clues (${concepto})`,
        question: "Which English words in the text give you clear clues about the communicative goal and the action?",
        expected: "Identify key English nouns, action verbs or connectors related to the topic.",
        success: "Well done! You successfully identified the key English vocabulary from the context.",
        support: "Look for transparent words and descriptive adjectives: what words tell you what is happening?",
        reveal: "Context clues and key vocabulary help us understand the main message without needing an immediate dictionary translation.",
        studentReveal: "Key English words identified from the context of the communicative text."
      },
      {
        context: "Grammar & Communicative Flow",
        question: "Notice the verb tense or structure used in the sentences. How does the grammatical form tell us when or how the action happens?",
        expected: "Recognize the verb form or structure indicating time, function, or modality.",
        success: "Excellent! You connected the grammatical structure with its real communicative meaning.",
        support: "Look at the ending of the verb or auxiliary words: does it talk about routine, past events or future plans?",
        reveal: "Grammatical structures and verb tenses provide the timeline and conditions for natural English communication.",
        studentReveal: "The verb tense and sentence structure that clarify the communicative intention."
      }
    ],
    ideaClaveExplicativo: `In ${item.title}, we communicate effectively by using '${concepto}' in context, paying attention to verb tenses and avoiding word-for-word translation.`,
    dileAntesExplicativo: `Ahora veremos el video explicativo de ${item.title}. Fíjate en la pronunciación y en cómo se utiliza '${concepto}' en una conversación real.`,
    practica: [
      {
        context: "Practice 1 in Notebook: Vocabulary & Model Sentences",
        question: `Open your English notebook. Write as title: '${item.title}'. Copy the key vocabulary box, write 2 original sentences using '${concepto}', and translate their meaning into Spanish.`,
        expected: "Accurate English sentences in the notebook with correct spelling, grammar agreement, and Spanish translation.",
        success: "Great notebook work! Your English sentences are well structured and meaningful.",
        support: "Check the slide model: Subject + Verb + Complement. Follow that pattern to write your sentences.",
        reveal: "Writing model sentences consolidates vocabulary and internalizes the English syntactic order.",
        studentReveal: "Original English sentences written and checked in the notebook."
      },
      {
        context: "Practice 2 in Notebook: Short Dialogue or Message",
        question: `In your notebook, write a short 3-line dialogue or message applying today's communicative goal (${item.focoDidactico}). Then read it aloud with your mentor.`,
        expected: "Short dialogue written in English and read aloud with proper pronunciation and natural intonation.",
        success: "Outstanding fluency! Writing and reading aloud activates both speaking and writing skills.",
        support: "Use simple, direct phrases: Greeting, main message or question, and friendly closing.",
        reveal: "Interactive dialogue practice is the cornerstone of foreign language fluency.",
        studentReveal: "Short English dialogue written and practiced aloud with the mentor."
      }
    ],
    resumen: {
      ideaClave: `Today in ${item.title}, we practiced communicating ideas using '${concepto}' with clear sentence structure and natural expressions.`,
      sintesis: `Hoy dominaste ${item.focoDidactico} en inglés con práctica activa de vocabulario y escritura en tu cuaderno.`,
      estrategia: `1. Spot context clues and cognates · 2. Apply the sentence structure of '${concepto}' · 3. Read aloud to confirm natural flow.`
    },
    miniquiz: [
      {
        q: `Reading Comprehension: What is the main communicative purpose of '${concepto}' in today's English lesson?`,
        options: [
          `To express clear ideas, actions, or descriptions in English using context clues and accurate sentence structure`,
          `To translate words completely out of context without paying attention to meaning`,
          `To memorize isolated lists of English words without applying them in real sentences`
        ],
        correct: `To express clear ideas, actions, or descriptions in English using context clues and accurate sentence structure`,
        dileReview: "Pídele que señale la palabra o verbo en inglés que justifica su elección.",
        fixExplain: `Context clues and functional structures allow English learners to communicate naturally and with confidence.`
      },
      {
        q: `To avoid the common mistake of '${errorFrecuente}', what is the best strategy when reading an English text?`,
        options: [
          `Identify the general meaning and key cognates first, instead of trying to translate every single word`,
          `Stop reading immediately whenever you find an unfamiliar English word`,
          `Assume that English sentences must follow the exact same word order as Spanish`
        ],
        correct: `Identify the general meaning and key cognates first, instead of trying to translate every single word`,
        dileReview: "Pregúntale: ¿cómo te ayudaron los cognados a entender la idea general sin usar diccionario?",
        fixExplain: `Deducir el significado por contexto evita la frustración y construye fluidez en la comprensión lectora en inglés.`
      },
      {
        q: `Language Structure: Which English sentence demonstrates the correct grammatical pattern for '${concepto}'?`,
        options: [
          `The student carefully read the text and wrote a complete response in the notebook`,
          `The student carefully reading the text and write without agreement yesterday`,
          `Yesterday the student will read the text in the future tense by mistake`
        ],
        correct: `The student carefully read the text and wrote a complete response in the notebook`,
        dileReview: "Pídele que identifique el sujeto y el verbo principal de la oración correcta.",
        fixExplain: `A well-structured English sentence maintains proper subject-verb agreement and consistent tense usage.`
      }
    ],
    recuperacion: [
      {
        title: `English Recovery & Consolidation: ${item.title}`,
        explain: `When reading and writing in English, always look for the main subject and the action verb in the correct tense, using context clues to guide your comprehension of '${concepto}'.`,
        q: `Which sentence correctly demonstrates clear English communication for this lesson?`,
        options: [
          `The team explored the setting and recorded their findings in the notebook`,
          `The team explore yesterday without any past tense marker`
        ],
        correct: "The team explored the setting and recorded their findings in the notebook",
        correctText: "Correct! The sentence uses the proper past tense marker (-ed) to express a completed action.",
        fixText: "Remember that in English, regular verbs in the past tense take the -ed ending to signal completed events."
      }
    ],
    cierre: {
      preguntaSintesis: `In your own words, what was the most useful English word or phrase you learned in today's lesson?`,
      metacognicion: "¿Qué técnica te ayudó más a entender el texto en inglés: buscar cognados o identificar los verbos principales?",
      celebracion: isLast
        ? `Congratulations! You have completed all the English lessons for Objective ${oa.oa}. Outstanding language work!`
        : `Great job today! You have successfully mastered Lesson ${classNum}. See you in the next English adventure!`
    }
  };
}

/**
 * Función Despachadora Disciplinar Principal
 */
function buildDisciplineContent(
  oa: OACatalogItem,
  classNum: number,
  totalLessons: number,
  item: { title: string; focoDidactico: string }
): DisciplineContent {
  const isMat = oa.asignatura.includes("Matem");
  const isHis = oa.asignatura.includes("Hist") || oa.asignatura.includes("Sociales");
  const isCie = (oa.asignatura.includes("Cienc") || oa.asignatura.includes("Naturales")) && !isHis;
  const isIng = oa.asignatura.includes("Ingl");

  if (isMat) {
    return buildMathContent(oa, classNum, totalLessons, item);
  }
  if (isCie) {
    return buildScienceContent(oa, classNum, totalLessons, item);
  }
  if (isHis) {
    return buildHistoryContent(oa, classNum, totalLessons, item);
  }
  if (isIng) {
    return buildEnglishContent(oa, classNum, totalLessons, item);
  }
  // Lengua y Literatura (default humanista)
  return buildLanguageContent(oa, classNum, totalLessons, item);
}

/**
 * Generador Completo de Paquete de Lecciones (DOCX y Datos de la App)
 */
export function generateOAPackage(oa: OACatalogItem, totalLessons: number): GeneratedOAPackage {
  const lessons: LessonData[] = [];

  // Theme titles per subject and lesson count
  const distribution = getLessonTitlesAndFocus(oa, totalLessons);

  distribution.forEach((item, idx) => {
    const classNum = idx + 1;
    const isFirst = classNum === 1;
    const isLast = classNum === totalLessons;

    // Inyección canónica de lecciones sincronizadas para 7° Básico Clase 1 (las 5 asignaturas troncales)
    if (classNum === 1 && oa.curso.includes("7")) {
      if (oa.oaNumero === 1 && oa.asignatura === "Matemática") {
        lessons.push(getCanonicalClase1Matematica());
        return;
      }
      if (oa.oaNumero === 3 && (oa.asignatura.includes("Lengua") || oa.asignatura.includes("Lenguaje"))) {
        lessons.push(getCanonicalClase1Lengua());
        return;
      }
      if (oa.oaNumero === 1 && oa.asignatura.includes("Ciencias") && !oa.asignatura.includes("Sociales")) {
        lessons.push(getCanonicalClase1Ciencias());
        return;
      }
      if (oa.oaNumero === 2 && oa.asignatura.includes("Historia")) {
        lessons.push(getCanonicalClase1Historia());
        return;
      }
      if (oa.oaNumero === 9 && (oa.asignatura.includes("Inglés") || oa.asignatura.includes("Ingles"))) {
        lessons.push(getCanonicalClase1Ingles());
        return;
      }
    }

    // Inyección canónica de lecciones sincronizadas para 7° Básico Clase 2 (Matemática OA01)
    if (classNum === 2 && oa.curso.includes("7") && oa.oaNumero === 1 && oa.asignatura === "Matemática") {
      lessons.push(getCanonicalClase2Matematica());
      return;
    }

    // Build Hook 7 Slides
    const hookSlides: SlidePrompt[] = [
      {
        slideNumber: 1,
        tituloMomento: "Apertura y Contexto",
        visualPrompt: `Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, arriving at a captivating setting related to ${item.title} (${oa.asignatura}). Cinematic lighting, warm morning atmosphere, wide negative space in top third.`,
        overlayText: `Misión ${classNum}: ${item.title}`,
        speakerNotes: `Comienza una nueva expedición de aprendizaje. Nuestros dos exploradores se preparan para enfrentar un enigma fascinante en ${oa.asignatura}.`,
        palabrasAprox: 19,
        duracionSeg: 9
      },
      {
        slideNumber: 2,
        tituloMomento: "Presentación del Escenario",
        visualPrompt: `Modern anime style. The two 13-year-old companions inspecting an interactive device, map, or artifact showing clear signs of ${item.focoDidactico}. High detail, clean lineart, soft depth of field, clear space on the left side.`,
        overlayText: "Punto de Partida",
        speakerNotes: `Al observar los datos iniciales, notan que para avanzar necesitan comprender con precisión cómo se relacionan estos elementos.`,
        palabrasAprox: 18,
        duracionSeg: 9
      },
      {
        slideNumber: 3,
        tituloMomento: "Aparición del Conflicto / Misterio",
        visualPrompt: "Modern anime style. The boy pointing towards an unexpected discrepancy or challenge on a digital screen while the girl takes field notes in a physical notebook. Dramatic atmospheric lighting, expressive eyes.",
        overlayText: "¡Un obstáculo inesperado!",
        speakerNotes: "De pronto, aparece una situación inesperada: los registros cambian y surge una duda que deben resolver juntos para continuar.",
        palabrasAprox: 19,
        duracionSeg: 9
      },
      {
        slideNumber: 4,
        tituloMomento: "Exploración de Pistas",
        visualPrompt: "Modern anime style. The two young protagonists working together side by side, analyzing a concrete diagram or physical tool. Vibrant colors, focused determination, clean composition.",
        overlayText: "Buscando la clave",
        speakerNotes: "Ambos comparan las pistas disponibles. Cada movimiento y cada dato entrega información valiosa sobre el comportamiento del fenómeno.",
        palabrasAprox: 17,
        duracionSeg: 8
      },
      {
        slideNumber: 5,
        tituloMomento: "El Momento Crítico",
        visualPrompt: "Modern anime style. Close-up on the two protagonists discussing with excitement as a glowing clue or measurement appears in the center. Dynamic lighting, high emotional impact.",
        overlayText: "Una decisión importante",
        speakerNotes: "Para superar el reto no basta con adivinar: es indispensable aplicar un criterio claro y seguir un orden lógico.",
        palabrasAprox: 18,
        duracionSeg: 9
      },
      {
        slideNumber: 6,
        tituloMomento: "La Pregunta Detonante",
        visualPrompt: "Modern anime style. Wide shot of the two 13-year-olds looking directly towards the horizon or viewer with confident curiosity. Beautiful sky with volumetric clouds, calm reflection.",
        overlayText: "¿Cómo podemos resolverlo?",
        speakerNotes: "Ahora surge el verdadero desafío: ¿qué regla o procedimiento nos permitirá encontrar la respuesta exacta sin equivocarnos?",
        palabrasAprox: 17,
        duracionSeg: 8
      },
      {
        slideNumber: 7,
        tituloMomento: "Puente a la Lección",
        visualPrompt: "Modern anime style. Minimalist elegant graphic composition with StudioSimple emblem and an inspiring visual tool connecting to the upcoming lesson. Soft gradient background.",
        overlayText: `StudioSimple · ${oa.asignatura}`,
        speakerNotes: "Existe una forma precisa de resolverlo paso a paso. ¡Descubrámosla juntos en la lección de hoy!",
        palabrasAprox: 15,
        duracionSeg: 7
      }
    ];

    // Build Explicativo 7 Slides
    const explicativoSlides: SlidePrompt[] = [
      {
        slideNumber: 1,
        tituloMomento: "Definición del Concepto Central",
        visualPrompt: `Modern anime style 16:9. The girl and boy in a luminous study room, pointing at a clearly labeled scientific/mathematical diagram representing ${item.focoDidactico}. High clarity, negative space for text.`,
        overlayText: `Concepto Clave: ${item.title}`,
        speakerNotes: `Para comprender este contenido, siempre necesitamos un punto de partida claro que nos permita comparar y analizar con exactitud.`,
        palabrasAprox: 21,
        duracionSeg: 11
      },
      {
        slideNumber: 2,
        tituloMomento: "La Regla de Oro / Algoritmo",
        visualPrompt: "Modern anime style. The boy illustrating the step-by-step rule on a transparent lightboard, while the girl checks and confirms each step. Clean infographic elements, modern lighting.",
        overlayText: "El procedimiento formal",
        speakerNotes: "El primer paso consiste en organizar la información disponible y seguir el método disciplinar en un orden riguroso.",
        palabrasAprox: 20,
        duracionSeg: 10
      },
      {
        slideNumber: 3,
        tituloMomento: "Demostración Modelada",
        visualPrompt: "Modern anime style. Close-up on the model showing the transformation or relationship clearly executed with annotations and arrows.",
        overlayText: "Caso aplicado",
        speakerNotes: "Observa cómo se aplica la regla en este caso práctico: cada elemento tiene un propósito definido y comprobable.",
        palabrasAprox: 19,
        duracionSeg: 10
      },
      {
        slideNumber: 4,
        tituloMomento: "Prevención del Error Frecuente",
        visualPrompt: "Modern anime style. A visual contrast showing a common mistake with a subtle red outline and the correct method in glowing teal.",
        overlayText: "¡Cuidado con esta trampa!",
        speakerNotes: "Un error habitual ocurre cuando nos apresuramos y omitimos el contexto. Siempre debemos verificar el procedimiento completo.",
        palabrasAprox: 19,
        duracionSeg: 10
      },
      {
        slideNumber: 5,
        tituloMomento: "Comprobación del Resultado",
        visualPrompt: "Modern anime style. The girl verifying the solution with a checkmark symbol and showing how the answer satisfies the original problem.",
        overlayText: "Comprobación del resultado",
        speakerNotes: "Al comprobar nuestro resultado, confirmamos que la respuesta es coherente con el problema y no deja dudas.",
        palabrasAprox: 18,
        duracionSeg: 9
      },
      {
        slideNumber: 6,
        tituloMomento: "Estrategia Mnemotécnica / Regla Mental",
        visualPrompt: "Modern anime style. An elegant three-step visual icon diagram showing the mental strategy to remember for future challenges.",
        overlayText: "Los 3 pasos para pensar",
        speakerNotes: "Recuerda siempre la estrategia en tres pasos: identificar los datos, aplicar el método en orden y comprobar el resultado.",
        palabrasAprox: 20,
        duracionSeg: 10
      },
      {
        slideNumber: 7,
        tituloMomento: "Síntesis y Puente al Cuaderno",
        visualPrompt: "Modern anime style. The two 13-year-olds smiling confidently with their notebooks open and pencils ready, inviting the student to replicate the method.",
        overlayText: "¡Tu turno en el cuaderno!",
        speakerNotes: "Ya dominas la regla y el método paso a paso. Ahora abre tu cuaderno y resuelve el siguiente ejercicio junto a tu mentor.",
        palabrasAprox: 22,
        duracionSeg: 11
      }
    ];

    const hookPromptText = buildHookPromptText(
      oa.asignatura,
      oa.oa,
      classNum,
      item.title,
      hookSlides
    );

    const explicativoPromptText = buildExplicativoPromptText(
      oa.asignatura,
      oa.oa,
      classNum,
      item.title,
      explicativoSlides
    );

    // Obtener contenido disciplinar especializado
    const discContent = buildDisciplineContent(oa, classNum, totalLessons, item);

    lessons.push({
      num: classNum,
      title: item.title,
      focoDidactico: item.focoDidactico,
      routeToday: `1. Inicio y activación · 2. Video de exploración · 3. Recorrido guiado · 4. Formalización y práctica en cuaderno · 5. Miniquiz y REVISAR · 6. Cierre metacognitivo`,
      duracion: "30 Minutos",
      objetivoAdulto: discContent.objetivoAdulto,
      climaEmocional: discContent.climaEmocional,
      situacionIntro: discContent.situacionIntro,
      paso2_hook: {
        titulo: `Video Motivacional: El Desafío de ${item.title}`,
        fullPrompt: hookPromptText,
        slides: hookSlides,
        dileAntes: "Antes de ver el video, observa con atención lo que descubren los dos exploradores y qué pregunta queda planteada.",
        dileDespues: "Muy buena observación. Ahora conversaremos sobre lo que descubrieron en la expedición."
      },
      paso3_recorrido: discContent.recorrido,
      paso4_explicativo: {
        titulo: `Video Explicativo: Formalización de ${item.title}`,
        fullPrompt: explicativoPromptText,
        slides: explicativoSlides,
        ideaClave: discContent.ideaClaveExplicativo,
        dileAntes: discContent.dileAntesExplicativo
      },
      paso5_practica: discContent.practica,
      paso6_resumen: discContent.resumen,
      paso7_miniquiz: discContent.miniquiz,
      paso7b_recuperacion: discContent.recuperacion,
      paso8_cierre: discContent.cierre
    });
  });

  const oaWithBook: OACatalogItem = {
    ...oa,
    referenciaTextoEscolar: oa.referenciaTextoEscolar || TEXTBOOK_MAPPINGS[oa.id] || {
      libro: `${oa.asignatura} 7° Básico (Texto del Estudiante MINEDUC)`,
      unidad: "Unidad Oficial",
      leccion: `Objetivo ${oa.oa}`,
      paginas: "Texto del Estudiante"
    }
  };

  return {
    oa: oaWithBook,
    totalLessons,
    lessons
  };
}

/**
 * Returns pedagogical distribution of lesson titles and focuses for all official OAs
 */
function getRawLessonTitlesAndFocus(
  oa: OACatalogItem,
  total: number
): { title: string; focoDidactico: string }[] {
  const isMat = oa.asignatura.includes("Matem");
  const isHis = oa.asignatura.includes("Hist") || oa.asignatura.includes("Sociales");
  const isCie = (oa.asignatura.includes("Cienc") || oa.asignatura.includes("Naturales")) && !isHis;
  const isIng = oa.asignatura.includes("Ingl");
  const isLeng = oa.asignatura.includes("Leng");

  // ==================== 1. MATEMÁTICA ====================
  if (isMat) {
    if (oa.oaNumero === 1) {
      if (total === 5) {
        return [
          { title: "Posiciones respecto de un punto de referencia", focoDidactico: "El número cero como origen, signos + y -, niveles de profundidad y temperaturas" },
          { title: "La recta numérica y orden en Z", focoDidactico: "Ubicación horizontal de enteros y criterio de mayor hacia la derecha" },
          { title: "Valor absoluto y números opuestos", focoDidactico: "Distancia pura al cero y simetría aditiva en la recta numérica" },
          { title: "Adición y sustracción en Z", focoDidactico: "Desplazamientos direccionales y la resta como suma del inverso aditivo" },
          { title: "Resolución de problemas cotidianos y síntesis", focoDidactico: "Modelamiento en 4 pasos para saldos financieros, variaciones térmicas y evaluación" }
        ];
      }
      return [
        { title: "Posiciones respecto de un punto de referencia", focoDidactico: "El número cero como origen, signos + y -, niveles bajo tierra y temperaturas" },
        { title: "La recta numérica y orden en Z", focoDidactico: "Ubicación horizontal y vertical, criterio de orden mayor hacia la derecha" },
        { title: "Valor absoluto y números opuestos", focoDidactico: "Distancia pura al cero sin signo y simetría aditiva en la recta" },
        { title: "Adición de enteros de igual y distinto signo", focoDidactico: "Algoritmo de adición y desplazamientos en la recta numérica" },
        { title: "Sustracción en Z y la suma del inverso aditivo", focoDidactico: "Transformación formal de resta a suma y regla de signos" },
        { title: "Resolución de problemas cotidianos y síntesis oficial", focoDidactico: "Saldos bancarios, variaciones térmicas y ensayo tipo MINEDUC" }
      ];
    }

    if (oa.oaNumero === 2 || oa.oaNumero === 3) {
      return [
        { title: "Representación de fracciones y decimales positivos", focoDidactico: "Sentido numérico y equivalencia gráfica entre fracción y decimal" },
        { title: "Multiplicación de decimales en contextos cotidianos", focoDidactico: "Modelado de área y algoritmo de multiplicación con coma decimal" },
        { title: "Multiplicación de fracciones paso a paso", focoDidactico: "Interpretación como parte de una parte y simplificación de productos" },
        { title: "División de decimales e interpretación de reparto", focoDidactico: "División entre decimales y comprensión del reparto continuo" },
        { title: "División de fracciones y el inverso multiplicativo", focoDidactico: "Multiplicación por el recíproco y resolución de ejercicios mixtos" },
        { title: "Resolución de problemas cotidianos y síntesis", focoDidactico: "Modelamiento de recetas, presupuestos, medidas y ensayo sumativo" }
      ];
    }

    if (oa.oaNumero === 4) {
      return [
        { title: "Concepto de porcentaje como razón y parte de cien", focoDidactico: "Representación cuadriculada de 100 y equivalencia decimal/fracción" },
        { title: "Estrategias de cálculo mental para porcentajes clave", focoDidactico: "Cálculo directo del 10%, 25%, 50% y descomposiciones rápidas" },
        { title: "Cálculo de porcentajes mediante proporciones y regla de tres", focoDidactico: "Planteamiento formal de razón y proporción para cualquier porcentaje" },
        { title: "Aumentos, descuentos y recargos comerciales en la vida real", focoDidactico: "Cálculo de IVA, ofertas del comercio y boletas de compra" },
        { title: "Interés simple, problemas financieros y síntesis", focoDidactico: "Fórmula de interés simple en ahorro y crédito, y ensayo tipo MINEDUC" }
      ];
    }

    if (oa.oaNumero === 6) {
      return [
        { title: "Del lenguaje natural al lenguaje algebraico", focoDidactico: "Traducción de enunciados cotidianos a expresiones con incógnitas" },
        { title: "Términos semejantes y reducción de expresiones algebraicas", focoDidactico: "Agrupación de coeficientes numéricos y factores literales" },
        { title: "Ecuaciones lineales de la forma x + a = b y ax = b", focoDidactico: "Propiedad de la igualdad y balanza equilibrada" },
        { title: "Ecuaciones lineales de la forma ax + b = c", focoDidactico: "Despeje formal de la incógnita mediante dos operaciones inversas" },
        { title: "Resolución de problemas verbales mediante ecuaciones", focoDidactico: "Modelamiento en 4 pasos: definir incógnita, plantear y resolver" },
        { title: "Simulador de ecuaciones y evaluación sumativa", focoDidactico: "Ensayo formal de álgebra y síntesis del OA para Examen Libre" }
      ];
    }

    if (oa.oaNumero === 8) {
      return [
        { title: "Tablas de valores y concepto de proporción directa", focoDidactico: "Razones equivalentes y situaciones de compra proporcional" },
        { title: "La constante de proporcionalidad directa (k = y/x)", focoDidactico: "Cálculo de k y gráfico lineal que pasa por el origen (0,0)" },
        { title: "Concepto y tablas de proporción inversa", focoDidactico: "Producto constante k = x · y en situaciones de velocidad y tiempo" },
        { title: "Gráfico de la proporción inversa (hipérbola)", focoDidactico: "Interpretación de curvas asintóticas y contraste con la directa" },
        { title: "Resolución de problemas mixtos de proporcionalidad", focoDidactico: "Regla de tres directa e inversa y discernimiento de contexto" },
        { title: "Simulador de proporcionalidad y síntesis oficial", focoDidactico: "Ensayo formal y evaluación de proporcionalidad tipo MINEDUC" }
      ];
    }

    if (oa.oaNumero === 11) {
      return [
        { title: "Elementos del círculo: centro, radio, diámetro y cuerda", focoDidactico: "Diferenciación geométrica entre circunferencia y círculo" },
        { title: "El número Pi como razón constante entre perímetro y diámetro", focoDidactico: "Aproximación histórica 3,14 y medición concreta de contornos" },
        { title: "Cálculo del perímetro de la circunferencia (P = 2·π·r)", focoDidactico: "Aplicación de la fórmula y problemas de giros de ruedas" },
        { title: "Deducción geométrica del área del círculo mediante sectores", focoDidactico: "Reordenamiento en paralelogramo y deducción de A = π·r²" },
        { title: "Cálculo de áreas y perímetros de figuras compuestas", focoDidactico: "Semicírculos, coronas circulares y regiones sombreadas" },
        { title: "Simulador geométrico y evaluación sumativa del círculo", focoDidactico: "Ensayo formal de geometría circular tipo MINEDUC" }
      ];
    }

    if (oa.oaNumero === 14) {
      return [
        { title: "El plano cartesiano y ubicación de puntos (x, y)", focoDidactico: "Eje de abscisas, ordenadas y los 4 cuadrantes cartesianos" },
        { title: "Concepto de vector: magnitud, dirección y sentido", focoDidactico: "Representación gráfica con flechas dirigidas en la cuadrícula" },
        { title: "Traslación de figuras geométricas mediante vectores", focoDidactico: "Suma de coordenadas de los vértices y vector de traslación" },
        { title: "Composición de traslaciones sucesivas en el plano", focoDidactico: "Suma de vectores componentes y desplazamiento total resultante" },
        { title: "Resolución de problemas espaciales y síntesis oficial", focoDidactico: "Navegación cartesiana, simetrías y ensayo del OA" }
      ];
    }

    if (oa.oaNumero === 16) {
      return [
        { title: "Población, muestra y tipos de variables estadísticas", focoDidactico: "Variables cualitativas y cuantitativas discretas/continuas" },
        { title: "Tablas de frecuencias absolutas, relativas y acumuladas", focoDidactico: "Organización de datos no agrupados y conteo ordenado" },
        { title: "Gráficos de barras, líneas y sectores circulares", focoDidactico: "Interpretación visual y cálculo de ángulos porcentuales" },
        { title: "Medidas de tendencia central: la media aritmética (promedio)", focoDidactico: "Cálculo, interpretación y propiedades del valor representativo" },
        { title: "Mediana y moda en conjuntos de datos", focoDidactico: "Ordenamiento de datos, dato central y valor más frecuente" },
        { title: "Toma de decisiones con datos estadísticos y ensayo oficial", focoDidactico: "Comparación de distribuciones, sesgos y evaluación del OA" }
      ];
    }

    if (oa.oaNumero === 18) {
      return [
        { title: "Fenómenos deterministas vs experimentos aleatorios", focoDidactico: "Distinción entre causalidad fija y azar en situaciones cotidianas" },
        { title: "Espacio muestral y eventos o sucesos posibles", focoDidactico: "Lanzamiento de monedas, dados y extracción de fichas" },
        { title: "La escala de probabilidades: eventos imposibles, probables y seguros", focoDidactico: "Graduación numérica entre 0 y 1 (o entre 0% y 100%)" },
        { title: "La regla de Laplace para eventos equiprobables", focoDidactico: "Cálculo formal: casos favorables dividido por casos posibles" },
        { title: "Frecuencia relativa y probabilidad empírica", focoDidactico: "Ley de los grandes números y repetición experimental" },
        { title: "Simulador de probabilidades y síntesis de Exámenes Libres", focoDidactico: "Ensayo formal de probabilidades y evaluación del OA" }
      ];
    }
  }

  // ==================== 2. CIENCIAS NATURALES ====================
  if (isCie) {
    if (oa.oaNumero === 1) {
      return [
        { title: "Las 4 Dimensiones de la Sexualidad Humana", focoDidactico: "Comprender la sexualidad como experiencia integral que une las dimensiones biológica, afectiva, social y ética" },
        { title: "Transformaciones físicas y emocionales en la pubertad", focoDidactico: "Caracteres sexuales secundarios, cambios corporales y desarrollo" },
        { title: "Vínculos afectivos, respeto mutuo e intimidad", focoDidactico: "La comunicación empática y el cuidado en las relaciones interpersonales" },
        { title: "Responsabilidad individual y toma de decisiones", focoDidactico: "Autocuidado, consentimiento y discernimiento informado en adolescentes" },
        { title: "Mitos, estereotipos y convivencia saludable", focoDidactico: "Análisis crítico de mitos culturales sobre la sexualidad y el género" },
        { title: "Síntesis y simulación tipo Examen Libre", focoDidactico: "Evaluación formativa, análisis de dilemas y cierre del OA" }
      ];
    }

    if (oa.oaNumero === 2) {
      return [
        { title: "Gametos humanos: estructura del ovocito y del espermatozoide", focoDidactico: "Morfología celular, dotación cromosómica y maduración sexual" },
        { title: "El ciclo menstrual y los días fértiles", focoDidactico: "Fases ovárica y uterina, hormonas y período de fertilidad" },
        { title: "Fecundación en las trompas de Falopio y formación del cigoto", focoDidactico: "Unión de gametos, singamia y primeras divisiones celulares" },
        { title: "Desarrollo embrionario y fetal: placenta y cordón umbilical", focoDidactico: "Estructuras de protección, nutrición e intercambio de gases" },
        { title: "Cuidado prenatal, parto y síntesis reproductiva", focoDidactico: "Factores de riesgo, etapas del parto y ensayo del OA" }
      ];
    }

    if (oa.oaNumero === 5) {
      return [
        { title: "Microorganismos en el entorno: virus, bacterias y hongos", focoDidactico: "Diferenciación estructural, tamaños y formas de nutrición/replicación" },
        { title: "Bacterias beneficiosas en la flora intestinal y biotecnología", focoDidactico: "Microbiota humana, fermentación y producción de alimentos" },
        { title: "Microorganismos patógenos y mecanismos de transmisión", focoDidactico: "Vías de contagio, infecciones comunes y medidas de higiene" },
        { title: "Barreras defensivas del cuerpo: piel, mucosas e inmunidad", focoDidactico: "Barreras primarias, secundarias y respuesta inmunológica" },
        { title: "Vacunas, antibióticos y síntesis de salud e higiene", focoDidactico: "Inmunización activa, uso responsable de fármacos y ensayo oficial" }
      ];
    }

    if (oa.oaNumero === 7) {
      return [
        { title: "Concepto de fuerza: magnitud, dirección y punto de aplicación", focoDidactico: "Representación vectorial y efectos de deformación y movimiento" },
        { title: "Fuerzas por contacto y a distancia: gravedad y roce", focoDidactico: "Atracción gravitacional, masa vs peso y fricción de superficies" },
        { title: "Presión en sólidos: relación entre fuerza y área de contacto", focoDidactico: "Fórmula P = F / A, unidades en Pascal y ejemplos cotidianos" },
        { title: "Presión en líquidos y gases: principio de Pascal", focoDidactico: "Presión hidrostática, transmisión en fluidos y prensa hidráulica" },
        { title: "Presión atmosférica, barómetros y síntesis de fuerzas", focoDidactico: "Experimento de Torricelli, altitud y ensayo tipo MINEDUC" }
      ];
    }
  }

  // ==================== 3. HISTORIA Y CIENCIAS SOCIALES ====================
  if (isHis) {
    if (oa.oaNumero === 2) {
      return [
        { title: "El fin del nomadismo y el surgimiento agrícola", focoDidactico: "Transición de la caza y recolección a la producción de alimentos" },
        { title: "Domesticación de animales y plantas en el Creciente Fértil", focoDidactico: "Selección artificial, ciclos de cultivo y almacenamiento de excedentes" },
        { title: "Primeras aldeas sedentarias y división del trabajo", focoDidactico: "Transformación del espacio geográfico y nuevas profesiones" },
        { title: "Innovaciones tecnológicas del Neolítico", focoDidactico: "Cerámica, tejido, piedra pulida y metalurgia incipiente" },
        { title: "Consecuencias históricas y síntesis de la Revolución Neolítica", focoDidactico: "Aparición de la propiedad, jerarquías y proyección al presente" }
      ];
    }

    if (oa.oaNumero === 3) {
      return [
        { title: "Entornos geográficos y ríos de las primeras civilizaciones", focoDidactico: "Ríos Tigris, Éufrates, Nilo, Indo y Amarillo como ejes de desarrollo" },
        { title: "La ciudad como centro de poder y organización estatal", focoDidactico: "Estratificación social, leyes escritas y centralización política" },
        { title: "Sistemas de contabilidad, escritura y monumentalidad", focoDidactico: "Invención de la escritura cuneiforme/jeroglífica y arquitectura ceremonial" },
        { title: "Religión, cosmovisión y legitimación del poder teocrático", focoDidactico: "Politeísmo, templos y relación entre gobernantes y dioses" },
        { title: "Comercio interregional, legado cultural y síntesis", focoDidactico: "Redes de intercambio, aportes a la humanidad y ensayo oficial" }
      ];
    }

    if (oa.oaNumero === 6) {
      return [
        { title: "El espacio geográfico del mar Egeo y el nacimiento de la polis", focoDidactico: "Fragmentación territorial, autarquía y comunidad de ciudadanos" },
        { title: "La polis ateniense y el surgimiento de la democracia directa", focoDidactico: "Ekklesía, bulé, tribunales populares e igualdad ante la ley" },
        { title: "La ciudadanía en Atenas: derechos, deberes y sectores excluidos", focoDidactico: "Condición de ciudadano, exclusión de mujeres, metecos y esclavos" },
        { title: "Esparta y el modelo militar: oligarquía y disciplina", focoDidactico: "Diarquía, educación espartana y contraste con el modelo ateniense" },
        { title: "Legado cultural griego y síntesis de la Antigüedad clásica", focoDidactico: "Filosofía, teatro, ciencias, juegos olímpicos y ensayo oficial" }
      ];
    }

    if (oa.oaNumero === 18) {
      return [
        { title: "La Constitución como ley fundamental de la República", focoDidactico: "Supremacía constitucional, límites al poder y orden institucional" },
        { title: "El Estado de derecho: imperio de la ley y garantías", focoDidactico: "Principio de legalidad y protección judicial de las personas" },
        { title: "La separación de los poderes públicos del Estado", focoDidactico: "Funciones y contrapesos del Poder Ejecutivo, Legislativo y Judicial" },
        { title: "Derechos fundamentales y deberes ciudadanos en Chile", focoDidactico: "Derechos humanos civiles, políticos, sociales y responsabilidad cívica" },
        { title: "Participación ciudadana, democracia y ensayo oficial", focoDidactico: "Sufragio, organizaciones sociales, bien común y evaluación del OA" }
      ];
    }
  }

  // ==================== 4. LENGUA Y LITERATURA ====================
  if (isLeng) {
    if (oa.oaNumero === 3) {
      return [
        { title: "Las 6 Etapas del Viaje del Héroe", focoDidactico: "Identificar las 6 etapas del viaje del héroe y el conflicto narrativo como motor del relato" },
        { title: "Evolución y roles de los personajes", focoDidactico: "Protagonistas, antagonistas y motivaciones que impulsan las acciones" },
        { title: "La voz del narrador y perspectivas", focoDidactico: "Distinción entre narrador omnisciente, protagonista y testigo" },
        { title: "Disposición temporal de los acontecimientos", focoDidactico: "Orden cronológico, saltos temporales (anacronías) y ritmo narrativo" },
        { title: "Interpretación global, visión de mundo y síntesis", focoDidactico: "Mensaje implícito, dilemas humanos y ensayo tipo MINEDUC" }
      ];
    }

    if (oa.oaNumero === 4) {
      return [
        { title: "El hablante lírico, objeto y motivo del poema", focoDidactico: "Distinción entre autor real y voz lírica ficticia, temple de ánimo" },
        { title: "Figuras literarias de significado: metáfora y comparación", focoDidactico: "Sentido connotativo, imágenes poéticas y traslación de significados" },
        { title: "Figuras literarias de atribución: personificación e hipérbole", focoDidactico: "Rasgos humanos a objetos/animales y exageración lírica" },
        { title: "Estructura del poema: verso, estrofa y rima", focoDidactico: "Métrica, ritmo y rima consonante, asonante y libre" },
        { title: "Interpretación de textos poéticos y producción en cuaderno", focoDidactico: "Análisis global de poemas, creación lírica y ensayo oficial" }
      ];
    }

    if (oa.oaNumero === 9) {
      return [
        { title: "Estructura y propósito de la noticia periodística", focoDidactico: "Titular, bajada, epígrafe, lead y cuerpo informativo en pirámide invertida" },
        { title: "Diferenciación entre hechos verificables y opiniones", focoDidactico: "Objetividad informativa vs valoraciones subjetivas en los medios" },
        { title: "El reportaje y la crónica: profundidad y testimonios", focoDidactico: "Contextualización de temas de interés público e investigación" },
        { title: "Recursos visuales y diseño en medios impresos y digitales", focoDidactico: "Fotografía periodística, infografías y diagramación de prensa" },
        { title: "Lectura crítica de medios de comunicación y síntesis", focoDidactico: "Propósito del emisor, sesgos informativos y ensayo del OA" }
      ];
    }
  }

  // ==================== 5. IDIOMA EXTRANJERO: INGLÉS ====================
  if (isIng) {
    if (oa.oaNumero === 9) {
      return [
        { title: "Setting and Characters in Short Stories", focoDidactico: "Exploring adapted adventure and mystery stories, character traits" },
        { title: "Chronological Sequence and Time Connectors", focoDidactico: "Using 'first', 'then', 'suddenly' to map narrative events" },
        { title: "Past Simple Tense: Regular and Irregular Verbs", focoDidactico: "Recognizing -ed endings and common irregular past actions in context" },
        { title: "Character Feelings, Dialogue, and Conflict", focoDidactico: "Identifying emotions and the main obstacle in narrative texts" },
        { title: "Resolution, Moral of the Story, and Reading Test", focoDidactico: "Reading comprehension synthesis, story mapping, and official test" }
      ];
    }

    if (oa.oaNumero === 10) {
      return [
        { title: "Skimming and Scanning in Non-Literary Texts", focoDidactico: "Fast reading techniques to locate main ideas, dates, and numbers" },
        { title: "Technology and Innovation Articles", focoDidactico: "Target vocabulary for digital communication, computers, and science" },
        { title: "Identifying Facts and Opinions in English News", focoDidactico: "Differentiating verifiable facts from subjective statements" },
        { title: "Context Clues and Synonyms in Informative Texts", focoDidactico: "Deducing meanings of unfamiliar words without a dictionary" },
        { title: "Graphic Organizers and Non-Literary Reading Test", focoDidactico: "Summarizing information from charts/articles and official test" }
      ];
    }
  }

  // ==================== 6. FALLBACK DINÁMICO DIRIGIDO POR INDICADORES MINEDUC ====================
  // Si el OA no está en la lista explícita, se construyen lecciones temáticas a partir de los indicadores oficiales
  const indics = oa.indicadores && oa.indicadores.length > 0
    ? oa.indicadores
    : [
        `Identificar los conceptos clave de ${oa.oa}`,
        `Explicar las relaciones y propiedades fundamentales`,
        `Aplicar el procedimiento en situaciones prácticas`,
        `Analizar variaciones y resolver problemas en contexto`
      ];

  const conceptos = oa.conceptosClave && oa.conceptosClave.length > 0
    ? oa.conceptosClave
    : [oa.oa, oa.eje || "Contenido Oficial"];

  const dynamicLessons: { title: string; focoDidactico: string }[] = [];

  // Lección 1: Fundamentos
  dynamicLessons.push({
    title: `Fundamentos y conceptos clave de ${conceptos[0] || oa.oa}`,
    focoDidactico: `Comprensión inicial de ${oa.descripcion.substring(0, 75)}...`
  });

  // Lecciones intermedias derivadas de indicadores oficiales
  const availableSlots = total - 2; // dejar espacio para lección 1 y lección final de síntesis
  for (let i = 0; i < availableSlots; i++) {
    const indIndex = i % indics.length;
    const rawIndic = indics[indIndex];
    // Acortar y formatear título
    const cleanTitle = rawIndic.length > 55 ? rawIndic.substring(0, 52) + "..." : rawIndic;
    dynamicLessons.push({
      title: cleanTitle,
      focoDidactico: `Desarrollo del indicador oficial MINEDUC: ${rawIndic.substring(0, 80)}`
    });
  }

  // Lección Final: Síntesis y Ensayo de Exámenes Libres
  dynamicLessons.push({
    title: `Resolución de problemas, síntesis y ensayo de ${oa.oa}`,
    focoDidactico: `Integración curricular completa y preparación formal para Examen Libre del MINEDUC`
  });

  return dynamicLessons;
}

function adaptToTotalLessons(
  list: { title: string; focoDidactico: string }[],
  count: number,
  oaItem: OACatalogItem
): { title: string; focoDidactico: string }[] {
  if (list.length === count) return list;
  if (count < list.length) {
    const trimmed = list.slice(0, count - 1);
    trimmed.push(list[list.length - 1]);
    return trimmed;
  }
  const expanded = [...list.slice(0, -1)];
  const needed = count - list.length;
  for (let k = 1; k <= needed; k++) {
    expanded.push({
      title: `Práctica avanzada y modelamiento de ${oaItem.oa} (Parte ${k})`,
      focoDidactico: `Consolidación guiada de destrezas para ${oaItem.asignatura}`
    });
  }
  expanded.push(list[list.length - 1]);
  return expanded;
}

function getLessonTitlesAndFocus(
  oa: OACatalogItem,
  total: number
): { title: string; focoDidactico: string }[] {
  const raw = getRawLessonTitlesAndFocus(oa, total);
  return adaptToTotalLessons(raw, total, oa);
}
