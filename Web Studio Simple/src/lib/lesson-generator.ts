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
  duracion: string;
  objetivoAdulto: string;
  climaEmocional: string;
  situacionIntro: {
    dialogo: string;
    pregunta: string;
    respEsperada: string;
    pistaSocratica: string;
  };
  paso2_hook: {
    titulo: string;
    fullPrompt: string;
    slides: SlidePrompt[];
    dileAntes: string;
    dileDespues: string;
    videoUrl?: string;
    videoSrc?: string;
  };
  paso3_recorrido: GuidedItem[];
  paso4_explicativo: {
    titulo: string;
    fullPrompt: string;
    slides: SlidePrompt[];
    ideaClave: string;
    dileAntes: string;
    videoUrl?: string;
    videoSrc?: string;
  };
  paso5_practica: GuidedItem[];
  paso6_resumen: {
    ideaClave: string;
    sintesis: string;
  };
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
function buildHookPromptText(
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
function buildExplicativoPromptText(
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
function getCanonicalClase1Matematica(): LessonData {
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
    duracion: "30-35 Minutos",
    objetivoAdulto: "Guiar al estudiante para que comprenda que los números enteros representan posiciones respecto de un punto de referencia y distinga entre posición y movimiento.",
    climaEmocional: "Crea un clima seguro: 'Aquí equivocarse es la mejor pista para entender cómo funciona la regla'.",
    situacionIntro: {
      dialogo: "Hoy comenzamos con los números enteros. Observa la situación del ascensor: el nivel de la calle se representa con el cero y los estacionamientos están bajo tierra.",
      pregunta: "Si un vehículo se encuentra tres pisos bajo tierra, ¿qué número entero representa esa posición?",
      respEsperada: "−3",
      pistaSocratica: "Tenemos un piso 3 sobre la calle y un piso 3 bajo tierra. Para diferenciarlos, a los niveles bajo tierra les colocamos un signo menos. ¿Qué número entero representa esa posición?"
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
  };
  recorrido: GuidedItem[];
  ideaClaveExplicativo: string;
  dileAntesExplicativo: string;
  practica: GuidedItem[];
  resumen: {
    ideaClave: string;
    sintesis: string;
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

  return {
    objetivoAdulto: `Acompañar al estudiante a comprender y aplicar el procedimiento matemático de: ${item.title}, modelando el cálculo ordenado y la comprobación de resultados.`,
    climaEmocional: isFirst
      ? "Crea un clima seguro: 'En matemática, el error no es una falla: es la mejor pista para entender cómo funciona la regla'."
      : "Refuerza la autonomía: 'Tómate el tiempo necesario para ordenar los datos y verificar antes de escribir'.",
    situacionIntro: {
      dialogo: `Hoy exploramos '${item.title}'. En la vida real nos encontramos con situaciones donde necesitamos cuantificar y relacionar magnitudes con exactitud. Observa los datos del problema inicial en la pantalla:`,
      pregunta: `¿Qué datos numéricos reconoces en este caso y qué relación crees que existe entre ellos?`,
      respEsperada: `Una respuesta que identifique las cantidades dadas y el tipo de relación u operación matemática requerida.`,
      pistaSocratica: `Pídele que señale qué representa cada número en el contexto antes de intentar calcular.`
    },
    recorrido: [
      {
        context: "Identificación de Datos y Magnitudes",
        question: "¿Cuáles son los datos conocidos que entrega el problema y cuál es la incógnita exacta que debemos determinar?",
        expected: "Distinguir claramente los valores dados de la incógnita matemática que se busca calcular.",
        success: "¡Muy bien! Identificaste con precisión los datos y la pregunta central del problema.",
        support: "Relee el enunciado y fíjate en las unidades de medida: ¿qué valor conocemos y qué nos falta averiguar?",
        reveal: "Los datos conocidos corresponden a las cantidades iniciales, y la incógnita es el valor que completará la igualdad o balance.",
        studentReveal: "Los datos iniciales del problema y la incógnita a determinar."
      },
      {
        context: "Estrategia de Modelamiento Matemático",
        question: "¿Qué operación o regla matemática permite relacionar estos datos para resolver la incógnita de forma verificable?",
        expected: "Señalar la operación o procedimiento formal adecuado para el tipo de problema.",
        success: "¡Excelente! Elegiste la estrategia matemática correcta para plantear la relación.",
        support: "Piensa en el paso a paso del video: ¿qué transformación u operación conecta las dos cantidades?",
        reveal: "La incógnita se resuelve aplicando la operación inversa o la regla de proporcionalidad correspondiente.",
        studentReveal: "La operación o regla formal que conecta los datos con el resultado."
      }
    ],
    ideaClaveExplicativo: `Un procedimiento matemático claro permite resolver cualquier caso siguiendo un orden lógico y verificando con la operación inversa.`,
    dileAntesExplicativo: `Ahora veremos la demostración matemática formal de la regla. Fíjate en el paso a paso del cálculo y en cómo se comprueba el resultado.`,
    practica: [
      {
        context: "Ejercicio 1 en Cuaderno: Cálculo Modelado",
        question: `Abre tu cuaderno de notas. Escribe como título: '${item.title}'. Resuelve el siguiente ejercicio paso a paso: Registra los datos, escribe el planteamiento formal de la operación y calcula el resultado final simplificado.`,
        expected: "Desarrollo ordenado en el cuaderno mostrando el planteamiento, cálculo y resultado verificado.",
        success: "¡Excelente trabajo en tu cuaderno! El desarrollo matemático está ordenado y el cálculo es exacto.",
        support: "Revisa la diapositiva de la regla: primero plantea los números en orden, resuelve la operación y comprueba.",
        reveal: "El resultado correcto se obtiene operando según la prioridad de cálculo y verificando que el valor tenga sentido.",
        studentReveal: "Desarrollo completo en el cuaderno con el resultado final comprobado."
      },
      {
        context: "Ejercicio 2 en Cuaderno: Problema de Aplicación Contextualizado",
        question: `En tu cuaderno, resuelve el siguiente problema de la vida cotidiana: Modela la situación con una expresión matemática, calcula el resultado y redacta una respuesta completa indicando las unidades correspondientes.`,
        expected: "Resolución del problema verbal con planteamiento, cálculo y respuesta contextualizada.",
        success: "¡Muy bien! Tu respuesta en el cuaderno no es solo un número aislado: tiene significado y unidades en el contexto.",
        support: "Recuerda el método de 4 pasos: comprender el problema, planificar la operación, ejecutar el cálculo y comprobar.",
        reveal: "El problema se resuelve relacionando las cantidades dadas y expresando la respuesta con sus unidades en el contexto real.",
        studentReveal: "Problema resuelto en el cuaderno con respuesta completa y unidades."
      }
    ],
    resumen: {
      ideaClave: `Para resolver problemas sobre ${item.title}, identificamos las magnitudes, aplicamos el algoritmo en orden y comprobamos el resultado en el contexto original.`,
      sintesis: `Hoy dominaste la regla central de ${item.focoDidactico} con rigor matemático y práctica efectiva en tu cuaderno.`
    },
    miniquiz: [
      {
        q: `Al resolver una situación de ${item.title}, ¿cuál es el procedimiento correcto para asegurar que el resultado sea exacto?`,
        options: [
          `A) Identificar las cantidades dadas, aplicar la regla en orden y comprobar mediante la operación inversa`,
          `B) Operar únicamente con el primer número que aparece sin verificar las condiciones del problema`,
          `C) Invertir los signos de las variables de forma arbitraria sin justificación matemática`
        ],
        correct: "A",
        fixExplain: `La resolución matemática rigurosa exige identificar los datos, seguir el orden de las operaciones y verificar el resultado con el contexto original.`
      },
      {
        q: `Si al aplicar el procedimiento de ${item.focoDidactico} se obtiene un resultado contradictorio con el contexto real, ¿qué paso debemos revisar primero?`,
        options: [
          `A) Verificar el planteamiento de la operación y el signo o unidades de las magnitudes involucradas`,
          `B) Cambiar los datos originales del problema para que coincidan con el cálculo obtenido`,
          `C) Dar por válido el número sin considerar si tiene sentido en la situación práctica`
        ],
        correct: "A",
        fixExplain: `Una discrepancia matemática casi siempre proviene de un error en el planteamiento inicial, en los signos o en las unidades de medida.`
      },
      {
        q: `¿Qué propiedad matemática garantiza que podamos comprobar nuestro resultado final en este contenido?`,
        options: [
          `A) La relación de equivalencia y la existencia de operaciones inversas que permiten retornar a los datos iniciales`,
          `B) Que en matemática los resultados cambian según la opinión de quien resuelve el ejercicio`,
          `C) Que las operaciones matemáticas no admiten ningún tipo de comprobación formal`
        ],
        correct: "A",
        fixExplain: `Las operaciones matemáticas fundamentales poseen operaciones inversas que permiten verificar inequívocamente la exactitud de cualquier cálculo.`
      }
    ],
    recuperacion: [
      {
        title: `Recuperación Matemática: ${item.title}`,
        explain: `Al resolver problemas de ${item.focoDidactico}, recuerda ordenar los datos en tu cuaderno, aplicar el procedimiento en orden y comprobar siempre con la operación inversa.`,
        q: `¿Cuál es el paso fundamental para validar un resultado matemático en este tema?`,
        options: [
          `Reemplazar el valor obtenido en el problema original y verificar que cumpla la igualdad o condición`,
          `Escribir el primer número que parezca correcto sin realizar la comprobación`
        ],
        correct: "Reemplazar el valor obtenido en el problema original y verificar que cumpla la igualdad o condición",
        correctText: "¡Correcto! Comprobar reemplazando en el problema original garantiza la maestría del procedimiento.",
        fixText: "Recuerda que comprobar es parte fundamental del quehacer matemático: verifica siempre que tu resultado satisfaga las condiciones iniciales."
      }
    ],
    cierre: {
      preguntaSintesis: `En tus propias palabras, ¿cómo le explicarías a un compañero el paso a paso para resolver un problema de ${item.title}?`,
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

  return {
    objetivoAdulto: `Acompañar al estudiante a explorar e investigar el fenómeno natural o biológico de: ${item.title}, fomentando el pensamiento científico y el análisis basado en evidencias.`,
    climaEmocional: isFirst
      ? "Crea un clima de curiosidad científica: 'En ciencias, observar con atención y hacerse preguntas es el primer paso del descubrimiento'."
      : "Fomenta la indagación: 'Analiza las evidencias observables antes de formular una conclusión definitiva'.",
    situacionIntro: {
      dialogo: `Hoy en Ciencias Naturales investigamos '${item.title}'. En nuestro entorno y en nuestro propio organismo ocurren procesos fascinantes regidos por principios biológicos y físicos. Observa la situación planteada en la pantalla:`,
      pregunta: `¿Qué cambios o evidencias puedes observar en este fenómeno y cómo crees que se explican científicamente?`,
      respEsperada: `Una respuesta que describa las observaciones directas y proponga una relación de causa y efecto preliminar.`,
      pistaSocratica: `Guíalo para que observe qué componentes interactúan en este fenómeno y qué ocurre cuando las condiciones cambian.`
    },
    recorrido: [
      {
        context: "Observación Científica de Evidencias",
        question: "¿Cuáles son las evidencias observables que nos permiten entender cómo ocurre este proceso en la naturaleza o en el cuerpo humano?",
        expected: "Identificar los signos, estructuras o variables que demuestran la existencia del fenómeno.",
        success: "¡Muy bien! Identificaste con claridad las evidencias directas del proceso investigado.",
        support: "Fíjate en las transformaciones que experimenta el sistema: ¿qué cambia y qué permanece constante?",
        reveal: "Las evidencias científicas corresponden a los cambios de estado, estructuras visibles o registros de medición del sistema.",
        studentReveal: "Las evidencias y transformaciones observables del fenómeno investigado."
      },
      {
        context: "Relación Causa y Consecuencia",
        question: "Si alteramos una de las variables o condiciones de este sistema biológico/físico, ¿qué consecuencia se produce y por qué?",
        expected: "Explicar la relación causal fundamentando con el concepto científico aprendido.",
        success: "¡Excelente! Comprendiste la relación de causa y efecto que rige este fenómeno.",
        support: "Piensa en el equilibrio del sistema: ¿qué ocurre si falta uno de los componentes esenciales?",
        reveal: "Cada componente cumple una función específica; al alterarse una variable, el sistema responde modificando su estado o función.",
        studentReveal: "La relación causal entre las variables y su impacto en el sistema."
      }
    ],
    ideaClaveExplicativo: `Los fenómenos de la naturaleza se comprenden analizando sus estructuras, sus relaciones de causa-efecto y las evidencias que podemos comprobar experimentalmente.`,
    dileAntesExplicativo: `Ahora veremos la explicación científica formal del proceso. Observa con atención el modelo visual y cómo interactúan los componentes.`,
    practica: [
      {
        context: "Esquema Rotulado en Cuaderno de Ciencias",
        question: `Abre tu cuaderno de Ciencias Naturales. Dibuja y rotula el esquema central de '${item.title}'. Identifica las estructuras o variables principales y escribe al lado la función o rol que cumple cada una.`,
        expected: "Diagrama científico rotulado en el cuaderno con nombres exactos de estructuras y descripción de sus funciones.",
        success: "¡Excelente dibujo científico en tu cuaderno! Las estructuras están correctamente rotuladas y explicadas.",
        support: "Apóyate en el modelo visual del video explicativo para representar los componentes en orden.",
        reveal: "El esquema debe mostrar con claridad la organización anatómica, celular o física del proceso estudiado.",
        studentReveal: "Esquema científico rotulado y completo en el cuaderno de ciencias."
      },
      {
        context: "Análisis de Caso Experimental en Cuaderno",
        question: `En tu cuaderno, analiza el siguiente caso de estudio o situación experimental sobre ${item.focoDidactico}: Registra qué variable se está observando y formula una conclusión científica fundamentada en los datos.`,
        expected: "Conclusión científica registrada en el cuaderno vinculando la causa observada con el concepto del tema.",
        success: "¡Muy buen análisis! Tu conclusión científica está sólidamente respaldada por las evidencias analizadas.",
        support: "Pregúntate: ¿qué evidencia directa demuestra que la hipótesis inicial era correcta o incorrecta?",
        reveal: "La conclusión científica se formula contrastando la hipótesis inicial con los resultados y evidencias verificadas.",
        studentReveal: "Conclusión experimental registrada y fundamentada en el cuaderno."
      }
    ],
    resumen: {
      ideaClave: `Para explicar ${item.title}, identificamos las estructuras involucradas, sus relaciones de causa-efecto y las evidencias científicas que fundamentan el proceso.`,
      sintesis: `Hoy comprendiste a fondo el funcionamiento de ${item.focoDidactico} mediante observación científica y registro en tu cuaderno.`
    },
    miniquiz: [
      {
        q: `En el estudio de ${item.title}, ¿cuál de las siguientes afirmaciones describe con mayor precisión el mecanismo o función central del fenómeno?`,
        options: [
          `A) El proceso ocurre mediante la interacción coordinada de sus componentes biológicos/físicos según leyes y funciones comprobables`,
          `B) El fenómeno es totalmente aleatorio y no responde a ninguna causa biológica o ambiental identificable`,
          `C) El proceso ocurre de manera instantánea sin que intervengan estructuras celulares o fuerzas del entorno`
        ],
        correct: "A",
        fixExplain: `Todo proceso natural y biológico responde a mecanismos específicos donde cada estructura cumple un rol funcional determinado.`
      },
      {
        q: `Al analizar las evidencias científicas de ${item.focoDidactico}, ¿qué error de interpretación debemos evitar para no llegar a conclusiones falsas?`,
        options: [
          `A) Confundir una correlación circunstancial con una relación comprobada de causa y efecto`,
          `B) Registrar cuidadosamente las observaciones en tablas y esquemas comparativos`,
          `C) Contrastar las hipótesis con datos experimentales verificables`
        ],
        correct: "A",
        fixExplain: `En el método científico es fundamental verificar experimentalmente las relaciones de causa y efecto, evitando suposiciones sin sustento empírico.`
      },
      {
        q: `¿De qué manera el conocimiento sobre ${item.title} contribuye al autocuidado, la salud humana o la protección del entorno?`,
        options: [
          `A) Permite tomar decisiones informadas y fundamentadas en evidencia para prevenir riesgos y mantener el equilibrio saludable`,
          `B) Demuestra que las acciones humanas individuales no tienen ningún impacto en el organismo o en los ecosistemas`,
          `C) Indica que basta con guiarse por creencias populares sin verificar la evidencia científica disponible`
        ],
        correct: "A",
        fixExplain: `La comprensión de los procesos biológicos y ambientales es la base para el autocuidado responsable, la prevención médica y la sustentabilidad.`
      }
    ],
    recuperacion: [
      {
        title: `Recuperación Científica: ${item.title}`,
        explain: `Al estudiar ${item.focoDidactico}, recuerda que todo sistema natural posee estructuras que cumplen funciones específicas que podemos verificar mediante evidencias.`,
        q: `¿Cuál es el criterio científico fundamental para validar una explicación en este tema?`,
        options: [
          `Basar la conclusión en evidencias observables y en el funcionamiento comprobado de las estructuras del sistema`,
          `Aceptar una afirmación sin requerir evidencias empíricas ni demostración experimental`
        ],
        correct: "Basar la conclusión en evidencias observables y en el funcionamiento comprobado de las estructuras del sistema",
        correctText: "¡Correcto! El pensamiento científico siempre exige fundamentar las conclusiones en evidencias sólidas.",
        fixText: "Recuerda que en Ciencias Naturales la evidencia empírica es el pilar de toda explicación: observa los datos antes de concluir."
      }
    ],
    cierre: {
      preguntaSintesis: `En tus propias palabras, ¿cómo le explicarías a tu familia el funcionamiento e importancia de ${item.title}?`,
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

  return {
    objetivoAdulto: `Acompañar al estudiante a contextualizar y comprender el proceso histórico, espacial o ciudadano de: ${item.title}, desarrollando el pensamiento crítico y la empatía histórica.`,
    climaEmocional: isFirst
      ? "Crea un clima de exploración histórica: 'En historia no memorizamos fechas sueltas: comprendemos por qué las personas actuaron de determinada manera'."
      : "Fomenta la perspectiva histórica: 'Analiza los hechos considerando la época y el espacio geográfico en que ocurrieron'.",
    situacionIntro: {
      dialogo: `Hoy en Historia y Ciencias Sociales nos situamos en '${item.title}'. Cada época histórica y cada territorio plantean desafíos que llevaron a las sociedades a organizarse, transformarse y crear cultura. Observa el escenario planteado en la pantalla:`,
      pregunta: `¿Por qué crees que las personas o comunidades de esa época tomaron esas decisiones frente a su entorno geográfico y social?`,
      respEsperada: `Una respuesta que reconozca las necesidades de subsistencia, la organización comunitaria o los ideales de la época.`,
      pistaSocratica: `Pídele que se sitúe en el lugar de las personas de la época: ¿con qué recursos contaban y qué problemas debían solucionar?`
    },
    recorrido: [
      {
        context: "Ubicación Temporal y Espacial",
        question: "¿En qué coordenadas de tiempo y espacio geográfico se desarrollaron los acontecimientos analizados?",
        expected: "Identificar el período histórico y el entorno geográfico (continente, ríos, mares, relieve) donde ocurrió el proceso.",
        success: "¡Muy bien! Ubicaste con precisión el marco temporal y el espacio geográfico del proceso.",
        support: "Observa las referencias del mapa y la cronología: ¿en qué siglo o milenio ocurrió y cerca de qué elementos geográficos?",
        reveal: "El proceso se desarrolló en un entorno geográfico estratégico que condicionó los modos de vida y la organización humana.",
        studentReveal: "El marco temporal y geográfico donde se desarrollaron los acontecimientos históricos."
      },
      {
        context: "Multicausalidad y Cambio Social",
        question: "¿Qué diferentes causas (ambientales, económicas, políticas o culturales) se combinaron para generar esta gran transformación?",
        expected: "Reconocer que los procesos históricos no tienen una sola causa, sino que combinan múltiples factores.",
        success: "¡Excelente! Identificaste la multicausalidad del proceso sin reducirlo a una sola causa simple.",
        support: "Distingue entre la causa detonante inmediata y las causas profundas que se venían gestando con el tiempo.",
        reveal: "Las transformaciones históricas responden a la interacción entre necesidades materiales, innovaciones técnicas e ideales comunitarios.",
        studentReveal: "La combinación de factores económicos, geográficos y sociales que impulsaron el cambio."
      }
    ],
    ideaClaveExplicativo: `Comprender la historia exige analizar las fuentes del pasado, reconocer la influencia del medio geográfico y valorar cómo las decisiones humanas modelaron nuestra sociedad.`,
    dileAntesExplicativo: `Ahora veremos la explicación histórica formal. Observa cómo se conectan las causas con las consecuencias y qué huellas perduran en nuestro presente.`,
    practica: [
      {
        context: "Cuadro Comparativo o Línea de Tiempo en Cuaderno de Historia",
        question: `Abre tu cuaderno de Historia. Elabora un cuadro comparativo o una línea de tiempo sobre: '${item.title}'. Registra: 1) El contexto espacial y temporal, 2) Dos causas fundamentales del proceso, y 3) Dos consecuencias para la sociedad.`,
        expected: "Cuadro o línea de tiempo ordenada en el cuaderno con causas y consecuencias claramente diferenciadas.",
        success: "¡Excelente sistematización histórica en tu cuaderno! Las relaciones temporales y causales quedaron muy claras.",
        support: "Organiza tu cuaderno en tres secciones: Antecedentes, Desarrollo del proceso y Consecuencias a largo plazo.",
        reveal: "La comprensión histórica se consolida al organizar los hechos cronológicamente y vincular causas con consecuencias.",
        studentReveal: "Línea de tiempo o cuadro comparativo completo y ordenado en el cuaderno de historia."
      },
      {
        context: "Análisis de Fuente Histórica en Cuaderno",
        question: `En tu cuaderno, lee el siguiente testimonio o fragmento de fuente histórica sobre ${item.focoDidactico}: Identifica quién es el autor, de qué época data y qué visión o testimonio entrega sobre la vida en ese período.`,
        expected: "Análisis de la fuente identificando autor, época, intención y testimonio histórico directo.",
        success: "¡Muy buena lectura crítica de la fuente! Lograste extraer el testimonio directo de quienes vivieron la época.",
        support: "Recuerda distinguir entre la fuente primaria (escrita en la misma época) y la interpretación de los historiadores.",
        reveal: "Analizar fuentes históricas permite reconstruir el pasado a partir de los testimonios reales que dejaron sus protagonistas.",
        studentReveal: "Análisis de la fuente histórica registrado con autor, época y testimonio central."
      }
    ],
    resumen: {
      ideaClave: `Para comprender ${item.title}, analizamos el medio geográfico, identificamos la multicausalidad histórica y valoramos el legado cultural o institucional que heredamos.`,
      sintesis: `Hoy comprendiste las claves históricas de ${item.focoDidactico} con rigor conceptual y trabajo analítico en tu cuaderno.`
    },
    miniquiz: [
      {
        q: `Al analizar el desarrollo histórico de ${item.title}, ¿cuál fue el factor determinante que impulsó la transformación de la sociedad en ese período?`,
        options: [
          `A) La capacidad de las comunidades para adaptarse a su entorno, generar innovaciones tecnológicas y establecer nuevas formas de organización social`,
          `B) Que las sociedades humanas permanecieron inalteradas sin interactuar con el medio natural ni con otros pueblos`,
          `C) La desaparición completa de toda memoria, ley escrita o tradición en las generaciones posteriores`
        ],
        correct: "A",
        fixExplain: `Las grandes transformaciones históricas nacen de la adaptación creativa de los pueblos a su medio y de la creación de nuevas instituciones comunitarias.`
      },
      {
        q: `¿Por qué es fundamental analizar diversas fuentes históricas para comprender ${item.focoDidactico}?`,
        options: [
          `A) Porque permite contrastar diferentes puntos de vista del pasado y reconstruir los procesos con mayor rigor y objetividad`,
          `B) Porque una sola versión aislada siempre contiene la verdad completa y definitiva de la historia humana`,
          `C) Porque en historia las fuentes escritas o materiales carecen de valor testimonial verificable`
        ],
        correct: "A",
        fixExplain: `El método histórico exige contrastar diversas evidencias y testimonios para evitar visiones parciales o sesgadas sobre los hechos del pasado.`
      },
      {
        q: `¿Qué relación de continuidad o legado cultural vincula este proceso histórico con las instituciones o valores de nuestra sociedad actual?`,
        options: [
          `A) El desarrollo de principios cívicos, modelos de organización territorial o aportes culturales que fundamentan nuestra vida democrática`,
          `B) Que el mundo actual no guarda ninguna relación ni herencia cultural con las civilizaciones y procesos del pasado`,
          `C) Que todas las instituciones políticas modernas fueron inventadas recientemente sin antecedentes históricos`
        ],
        correct: "A",
        fixExplain: `Nuestras leyes, lenguas, sistemas de regadío, conceptos de ciudadanía y democracia son herederos directos de los procesos históricos estudiados.`
      }
    ],
    recuperacion: [
      {
        title: `Recuperación Histórica: ${item.title}`,
        explain: `Al estudiar ${item.focoDidactico}, recuerda situar los hechos en su espacio geográfico y comprender que los cambios responden a múltiples causas humanas y ambientales.`,
        q: `¿Cuál es el principio clave para explicar las transformaciones de las sociedades en este tema?`,
        options: [
          `Comprender las decisiones humanas y la adaptación al medio geográfico a partir de fuentes históricas contrastadas`,
          `Memorizar acontecimientos aislados sin buscar la relación entre causas y consecuencias sociales`
        ],
        correct: "Comprender las decisiones humanas y la adaptación al medio geográfico a partir de fuentes históricas contrastadas",
        correctText: "¡Correcto! El pensamiento histórico consiste en conectar causas, decisiones humanas y consecuencias a lo largo del tiempo.",
        fixText: "Recuerda que en Historia y Ciencias Sociales los hechos se explican por su contexto: busca siempre las causas y el legado que dejaron en el presente."
      }
    ],
    cierre: {
      preguntaSintesis: `En tus propias palabras, ¿qué aprendizaje sobre las personas o la sociedad de esa época podemos aplicar a nuestro presente?`,
      metacognicion: "¿Qué hecho o aspecto de la vida cotidiana en ese período te pareció más sorprendente?",
      celebracion: isLast
        ? `¡Felicitaciones! Has completado todas las investigaciones del Objetivo de Aprendizaje ${oa.oa}. ¡Excelente comprensión histórica!`
        : `¡Gran trabajo hoy! Has dominado la Clase ${classNum}. ¡Nos vemos en la próxima misión histórica!`
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

  return {
    objetivoAdulto: `Acompañar al estudiante a profundizar en la comprensión lectora, el análisis de recursos literarios y la expresión escrita en: ${item.title}, promoviendo el diálogo reflexivo sobre los textos.`,
    climaEmocional: isFirst
      ? "Crea un clima de disfrute por la lectura: 'Leer nos permite viajar a otras épocas, sentir lo que otros sienten y encontrar nuestra propia voz'."
      : "Fomenta la interpretación personal: 'Cada texto ofrece pistas que podemos descubrir con atención y sensibilidad'.",
    situacionIntro: {
      dialogo: `Hoy en Lengua y Literatura nos adentramos en '${item.title}'. Los textos literarios y no literarios nos comunican visiones de mundo, emociones e ideas que cobran vida al leer. Observa el fragmento inicial en la pantalla:`,
      pregunta: `¿Qué impresión, emoción o idea principal te transmite este fragmento a primera vista?`,
      respEsperada: `Una respuesta que identifique el conflicto, la emoción del hablante o el tema central del texto.`,
      pistaSocratica: `Invítalo a releer la primera oración y a fijarse en los adjetivos y acciones de los personajes o del emisor.`
    },
    recorrido: [
      {
        context: "Comprensión Explícita e Inferencial",
        question: "¿Qué hechos o datos se afirman explícitamente en el texto y qué motivos de los personajes podemos inferir a partir de sus acciones?",
        expected: "Diferenciar la información textual literal de las deducciones válidas sustentadas en pistas del relato.",
        success: "¡Muy bien! Supiste extraer la información explícita e interpretar con acierto las pistas implícitas.",
        support: "Ubica la parte del texto donde se describe la acción: ¿qué palabras demuestran lo que siente o piensa el personaje?",
        reveal: "La comprensión lectora profunda combina lo que el texto dice textualmente con lo que sugiere a través de sus indicios.",
        studentReveal: "Los hechos explícitos del relato y las motivaciones inferidas a partir de las pistas del texto."
      },
      {
        context: "Recursos Literarios y Sentido Figurado",
        question: "¿Qué figura literaria, recurso de estilo o conector utiliza el autor y qué efecto busca producir en el lector?",
        expected: "Identificar el recurso retórico (metáfora, personificación, hipérbole, etc.) y explicar su sentido poético o narrativo.",
        success: "¡Excelente! Reconociste el recurso literario y cómo enriquece el significado del texto.",
        support: "Fíjate si las palabras se están usando en su sentido literal o si están creando una imagen figurada evocadora.",
        reveal: "El lenguaje figurado transforma el significado cotidiano de las palabras para crear imágenes poéticas y despertar la imaginación.",
        studentReveal: "El recurso literario identificado y su significado connotativo en el texto."
      }
    ],
    ideaClaveExplicativo: `Comprender e interpretar un texto exige analizar la estructura de la narración o del poema, reconocer los recursos del lenguaje y fundamentar las opiniones con citas textuales.`,
    dileAntesExplicativo: `Ahora veremos la explicación formal del análisis textual. Fíjate en cómo desentrañamos el significado de cada estrofa o párrafo paso a paso.`,
    practica: [
      {
        context: "Análisis de Cita y Vocabulario en Cuaderno",
        question: `Abre tu cuaderno de Lengua y Literatura. Copia la cita del texto sobre '${item.title}'. Subraya dos palabras clave, explica su significado en el contexto y describe qué emoción o idea transmiten.`,
        expected: "Cita copiada en el cuaderno con vocabulario analizado según el contexto y comentario de sentido figurado.",
        success: "¡Excelente análisis textual en tu cuaderno! Tu interpretación del vocabulario respeta el sentido original de la lectura.",
        support: "Relee la oración completa: las palabras vecinas son pistas directas para deducir el significado exacto del término.",
        reveal: "El vocabulario en un texto literario cobra su verdadero sentido al analizar cómo se relaciona con el temple de ánimo de la obra.",
        studentReveal: "Cita textual analizada y vocabulario contextual registrado en el cuaderno de lengua."
      },
      {
        context: "Taller de Escritura Guiada en Cuaderno",
        question: `En tu cuaderno, redacta un texto breve (4 a 6 líneas) aplicando lo aprendido hoy sobre ${item.focoDidactico}: Utiliza lenguaje preciso, incluye al menos un recurso literario o conector adecuado y revisa ortografía y puntuación.`,
        expected: "Párrafo breve escrito con coherencia temática, ortografía cuidada y aplicación del recurso disciplinar.",
        success: "¡Muy buena producción escrita! Tu párrafo tiene voz propia, ideas conectadas y una redacción cuidada.",
        support: "Recuerda el proceso de escritura: planifica qué quieres expresar, escribe el borrador y léelo en voz alta para corregir.",
        reveal: "Escribir bien requiere planificar las ideas, conectar las oraciones con fluidez y revisar para pulir el estilo final.",
        studentReveal: "Texto breve redactado, revisado y editado en el cuaderno de notas."
      }
    ],
    resumen: {
      ideaClave: `Para interpretar obras literarias sobre ${item.title}, analizamos la voz del narrador o hablante, identificamos las figuras literarias y respaldamos nuestra interpretación con el texto.`,
      sintesis: `Hoy enriqueciste tu competencia lectora y escritora abordando ${item.focoDidactico} con sensibilidad y pensamiento crítico.`
    },
    miniquiz: [
      {
        q: `Al interpretar un fragmento literario sobre ${item.title}, ¿cuál es el criterio fundamental para validar una inferencia sobre la lectura?`,
        options: [
          `A) Que la interpretación esté sólidamente respaldada por pistas textuales, acciones de los personajes y el contexto de la obra`,
          `B) Interpretar de forma libre cualquier idea aunque contradiga directamente lo que afirma el texto`,
          `C) Limitarse a memorizar las palabras del autor sin reflexionar sobre su significado implícito`
        ],
        correct: "A",
        fixExplain: `Toda inferencia legítima en comprensión lectora debe basarse en evidencias textuales e indicios concretos proporcionados por la obra.`
      },
      {
        q: `¿Qué función cumple el uso de recursos expresivos y lenguaje figurado en ${item.focoDidactico}?`,
        options: [
          `A) Transmitir emociones complejas, evocar imágenes sensibles y aportar matices que el lenguaje literal no logra expresar`,
          `B) Dificultar innecesariamente la lectura para que el receptor no pueda comprender el mensaje`,
          `C) Obligar al lector a entender todas las expresiones exactamente al pie de la letra sin matices`
        ],
        correct: "A",
        fixExplain: `El lenguaje figurado enriquece la comunicación permitiendo que el lector experimente sensaciones, metáforas y significados más profundos.`
      },
      {
        q: `Durante el proceso de producción escrita sobre este contenido, ¿por qué es indispensable la etapa de revisión del borrador?`,
        options: [
          `A) Porque permite verificar la coherencia de las ideas, la precisión de los conectores y la correcta ortografía antes de la versión final`,
          `B) Porque la primera versión de un texto nunca debe ser modificada bajo ninguna circunstancia`,
          `C) Porque revisar un texto escrito carece de impacto en la claridad comunicativa ante el lector`
        ],
        correct: "A",
        fixExplain: `La revisión y edición es la fase culminante de la escritura que asegura que el mensaje se transmita con claridad, belleza y rigor gramatical.`
      }
    ],
    recuperacion: [
      {
        title: `Recuperación de Lengua y Literatura: ${item.title}`,
        explain: `Al analizar ${item.focoDidactico}, recuerda buscar siempre las pistas explícitas e implícitas en el texto y distinguir el sentido literal del lenguaje figurado.`,
        q: `¿Cuál es la estrategia clave para comprender el sentido de un fragmento literario en este tema?`,
        options: [
          `Releer con atención el texto buscando las pistas contextuales que justifican la interpretación del mensaje`,
          `Adivinar el tema central fijándose únicamente en el título sin leer el contenido de los párrafos`
        ],
        correct: "Releer con atención el texto buscando las pistas contextuales que justifican la interpretación del mensaje",
        correctText: "¡Correcto! La relectura atenta guiada por pistas contextuales es la mejor herramienta de comprensión lectora.",
        fixText: "Recuerda que en Lengua y Literatura las respuestas están en el texto: vuelve siempre al fragmento para comprobar tu deducción."
      }
    ],
    cierre: {
      preguntaSintesis: `En tus propias palabras, ¿qué personaje, verso o idea del texto leído hoy te pareció más significativo y por qué?`,
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

  return {
    objetivoAdulto: `Acompañar al estudiante en la inmersión del idioma inglés para: ${item.title}. Las instrucciones del apoderado son en español, mientras los textos, vocabulario y miniquiz se practican en inglés.`,
    climaEmocional: isFirst
      ? "Crea un ambiente de confianza en inglés: 'Don't worry about making mistakes! In English, every attempt helps you build fluency and vocabulary'."
      : "Fomenta la confianza comunicativa: 'Listen, read the clues, and focus on the general meaning before translating every single word'.",
    situacionIntro: {
      dialogo: `Hoy en nuestra sesión de English exploramos '${item.title}'. El apoderado guía la sesión en español, mientras que el estudiante lee y escucha en inglés. Lee la siguiente frase introductoria en voz alta:`,
      pregunta: `"What is the main situation described in this English sentence? (¿Cuál es la situación principal descrita en la oración?)"`,
      respEsperada: `An answer identifying the main action, setting, or characters in English or Spanish.`,
      pistaSocratica: `Invítalo a identificar las palabras transparentes o cognados (palabras similares al español) para deducir el contexto general.`
    },
    recorrido: [
      {
        context: "Vocabulary Spotting & Context Clues",
        question: "Which English words in the text give you clear clues about the characters, the action, or the setting?",
        expected: "Identify key English nouns, adjectives, or action verbs from the reading passage.",
        success: "Well done! You successfully identified the key English vocabulary from the context.",
        support: "Look for transparent words and descriptive adjectives: what words tell you what is happening?",
        reveal: "Context clues and key vocabulary help us understand the main message without needing an immediate dictionary translation.",
        studentReveal: "Key English words identified from the context of the story or article."
      },
      {
        context: "Grammar & Sentence Flow",
        question: "Notice the verb tense or structure used in the sentences. How does the grammatical form tell us when or how the action happens?",
        expected: "Recognize the verb form (e.g. Past Simple -ed / irregular, Present Simple, modal verbs) indicating time or function.",
        success: "Excellent! You connected the grammatical structure with its real communicative meaning.",
        support: "Look at the ending of the verbs: do they show a completed past event, an everyday routine, or an ability/rule?",
        reveal: "Grammatical structures like verb endings and connectors give precise temporal meaning and flow to the English language.",
        studentReveal: "The verb tense and grammatical form that indicates time and function in English."
      }
    ],
    ideaClaveExplicativo: `Learning English involves recognizing key vocabulary in context, understanding grammatical patterns for communication, and building confidence in reading and writing.`,
    dileAntesExplicativo: `Ahora veremos la formalización del vocabulario y la estructura gramatical en inglés. Fíjate en cómo se forman las oraciones modelo.`,
    practica: [
      {
        context: "Vocabulary & Sentence Building in English Notebook",
        question: `Open your English notebook. Write the title: '${item.title}'. Copy the 3 target vocabulary words and write one complete sentence in English for each word using the grammar pattern learned today.`,
        expected: "Three complete, grammatically correct English sentences written in the notebook applying target vocabulary.",
        success: "Great job in your notebook! Your English sentences are well-structured, clear, and accurate.",
        support: "Follow the sentence model from the screen: Subject + Action Verb + Complement (e.g., 'The explorer discovered an ancient map').",
        reveal: "Constructing complete sentences in English reinforces spelling, grammar patterns, and real communication.",
        studentReveal: "Three complete English sentences written and checked in the notebook."
      },
      {
        context: "Short Reading & Guided Question in English Notebook",
        question: `In your English notebook, read the short adapted text on ${item.focoDidactico} and answer the question in English: 'What did the protagonists decide to do next?' Write a full-sentence answer.`,
        expected: "Written response in English providing evidence extracted directly from the short reading passage.",
        success: "Excellent reading comprehension! You found the exact evidence in the English text and wrote a great response.",
        support: "Scan the paragraph to locate the keywords from the question and find where the character's decision is described.",
        reveal: "Skimming for the main idea and scanning for specific details are fundamental strategies for reading success in English.",
        studentReveal: "Full-sentence answer in English answering the reading comprehension prompt."
      }
    ],
    resumen: {
      ideaClave: `To master ${item.title}, we practice target vocabulary in authentic contexts, identify sentence structures, and verify meaning through reading comprehension.`,
      sintesis: `Today you expanded your English proficiency in ${item.focoDidactico} through authentic reading and active writing in your notebook.`
    },
    miniquiz: [
      {
        q: `Reading Comprehension: According to the passage studied today about ${item.title}, what was the main discovery or action taken by the protagonists?`,
        options: [
          `A) They identified the crucial evidence and applied a logical step to continue their expedition successfully`,
          `B) They decided to stop the investigation because they could not find any useful English clues`,
          `C) They completely ignored the written instructions on the map and got lost in the setting`
        ],
        correct: "A",
        fixExplain: `The text describes how the characters collaborated to analyze the situation and find the correct solution.`
      },
      {
        q: `Vocabulary in Context: When reading English texts about ${item.focoDidactico}, what is the best strategy when you find an unfamiliar word?`,
        options: [
          `A) Use the surrounding context clues, transparent words, and the general topic of the sentence to deduce the meaning`,
          `B) Stop reading completely and assume the entire paragraph cannot be understood`,
          `C) Replace the unknown word with a random Spanish word that has a completely different meaning`
        ],
        correct: "A",
        fixExplain: `Context clues allow English learners to deduce meanings naturally and maintain fluent reading comprehension.`
      },
      {
        q: `Language Structure: Which English sentence demonstrates the correct grammatical pattern for the communicative goal learned today?`,
        options: [
          `A) The student carefully read the adapted text and wrote a complete response in the notebook`,
          `B) The student carefully reading the text and write without grammatical agreement`,
          `C) Yesterday the student will read the adapted text in the future tense by mistake`
        ],
        correct: "A",
        fixExplain: `A well-structured English sentence maintains proper subject-verb agreement and consistent tense usage.`
      }
    ],
    recuperacion: [
      {
        title: `English Recovery & Consolidation: ${item.title}`,
        explain: `When reading and writing in English, always look for the main subject and the action verb in the correct tense, using context clues to guide your comprehension.`,
        q: `Which sentence correctly demonstrates clear English communication for this lesson?`,
        options: [
          `The team explored the setting and recorded their findings in the notebook`,
          `The team explore yesterday without any past tense marker`
        ],
        correct: "The team explored the setting and recorded their findings in the notebook",
        correctText: "Correct! The sentence uses the proper past tense marker (-ed) to express a completed narrative action.",
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

    // Si es la Clase 1 de Matemática de 7° Básico (OA01), inyectar la lección canónica sincronizada del prototipo
    if (classNum === 1 && oa.oaNumero === 1 && oa.asignatura === "Matemática" && oa.curso.includes("7")) {
      lessons.push(getCanonicalClase1Matematica());
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
        { title: "La sexualidad como dimensión integral humana", focoDidactico: "Integración de aspectos biológicos, psicológicos, afectivos y sociales" },
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
        { title: "El conflicto narrativo y la trama de la historia", focoDidactico: "Identificación de fuerzas en oposición y nudo central del relato" },
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
