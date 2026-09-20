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
  "110-7-MAT-OA01": {
    libro: "Matemática 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 1: "Números"',
    leccion: 'Lección 1: "Números enteros"',
    paginas: "Páginas 6 a 25"
  },
  "110-7-MAT-OA03": {
    libro: "Matemática 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 1: "Números"',
    leccion: 'Lección 2: "Fracciones y decimales"',
    paginas: "Páginas 26 a 41"
  },
  "110-7-CIE-OA01": {
    libro: "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 1: "Sexualidad y autocuidado"',
    leccion: 'Lección 1: "Dimensiones biológicas y afectivas"',
    paginas: "Páginas 10 a 29"
  },
  "110-7-CIE-OA02": {
    libro: "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 1: "Sexualidad y autocuidado"',
    leccion: 'Lección 2: "Formación de un nuevo individuo"',
    paginas: "Páginas 30 a 45"
  },
  "110-7-HIS-OA02": {
    libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 1: "De los primeros humanos a las primeras civilizaciones"',
    leccion: 'Lección 1: "Hominización y revolución neolítica"',
    paginas: "Páginas 12 a 35"
  },
  "110-7-HIS-OA03": {
    libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 1: "De los primeros humanos a las primeras civilizaciones"',
    leccion: 'Lección 2: "Estados organizados y primeras civilizaciones"',
    paginas: "Páginas 36 a 55"
  },
  "110-7-LEN-OA03": {
    libro: "Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 1: "Héroes y heroínas"',
    leccion: 'Lección 1: "El viaje del héroe en la narrativa"',
    paginas: "Páginas 14 a 45"
  },
  "110-7-LEN-OA04": {
    libro: "Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 2: "Voces de la poesía"',
    leccion: 'Lección 1: "Lenguaje figurado en la poesía"',
    paginas: "Páginas 60 a 85"
  },
  "110-7-ING-OA09": {
    libro: "English 7th Grade (Student's Book MINEDUC)",
    unidad: 'Unit 1: "People and Places"',
    leccion: 'Lesson 1: "Reading literary stories"',
    paginas: "Páginas 8 a 23"
  },
  "110-7-ING-OA10": {
    libro: "English 7th Grade (Student's Book MINEDUC)",
    unidad: 'Unit 2: "Communication and Technology"',
    leccion: 'Lesson 1: "Non-literary texts and articles"',
    paginas: "Páginas 30 a 47"
  }
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
  };
  paso3_recorrido: GuidedItem[];
  paso4_explicativo: {
    titulo: string;
    fullPrompt: string;
    slides: SlidePrompt[];
    ideaClave: string;
    dileAntes: string;
  };
  paso5_practica: GuidedItem[];
  paso6_resumen: {
    ideaClave: string;
    sintesis: string;
  };
  paso7_miniquiz: QuizQuestion[];
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
 * Generates the full pedagogical and data package for an OA with 5 or 6 lessons.
 */
export function generateOAPackage(oa: OACatalogItem, totalLessons: number): GeneratedOAPackage {
  const lessons: LessonData[] = [];

  // Theme titles per subject and lesson count
  const distribution = getLessonTitlesAndFocus(oa, totalLessons);

  distribution.forEach((item, idx) => {
    const classNum = idx + 1;
    const isFirst = classNum === 1;
    const isLast = classNum === totalLessons;

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
        overlayText: `Punto de Partida`,
        speakerNotes: `Al observar los datos iniciales, notan que para avanzar necesitan comprender con precisión cómo se relacionan estos elementos.`,
        palabrasAprox: 18,
        duracionSeg: 9
      },
      {
        slideNumber: 3,
        tituloMomento: "Aparición del Conflicto / Misterio",
        visualPrompt: `Modern anime style. The boy pointing towards an unexpected discrepancy or challenge on a digital screen while the girl takes field notes in a physical notebook. Dramatic atmospheric lighting, expressive eyes.`,
        overlayText: `¡Un obstáculo inesperado!`,
        speakerNotes: `De pronto, aparece una situación inesperada: los registros cambian y surge una duda que deben resolver juntos para continuar.`,
        palabrasAprox: 19,
        duracionSeg: 9
      },
      {
        slideNumber: 4,
        tituloMomento: "Exploración de Pistas",
        visualPrompt: `Modern anime style. The two young protagonists working together side by side, analyzing a concrete diagram or physical tool. Vibrant colors, focused determination, clean composition.`,
        overlayText: `Buscando la clave`,
        speakerNotes: `Ambos comparan las pistas disponibles. Cada movimiento y cada dato entrega información valiosa sobre el comportamiento del fenómeno.`,
        palabrasAprox: 17,
        duracionSeg: 8
      },
      {
        slideNumber: 5,
        tituloMomento: "El Momento Crítico",
        visualPrompt: `Modern anime style. Close-up on the two protagonists discussing with excitement as a glowing clue or measurement appears in the center. Dynamic lighting, high emotional impact.`,
        overlayText: `Una decisión importante`,
        speakerNotes: `Para superar el reto no basta con adivinar: es indispensable aplicar un criterio claro y seguir un orden lógico.`,
        palabrasAprox: 18,
        duracionSeg: 9
      },
      {
        slideNumber: 6,
        tituloMomento: "La Pregunta Detonante",
        visualPrompt: `Modern anime style. Wide shot of the two 13-year-olds looking directly towards the horizon or viewer with confident curiosity. Beautiful sky with volumetric clouds, calm reflection.`,
        overlayText: `¿Cómo podemos resolverlo?`,
        speakerNotes: `Ahora surge el verdadero desafío: ¿qué regla o procedimiento nos permitirá encontrar la respuesta exacta sin equivocarnos?`,
        palabrasAprox: 17,
        duracionSeg: 8
      },
      {
        slideNumber: 7,
        tituloMomento: "Puente a la Lección",
        visualPrompt: `Modern anime style. Minimalist elegant graphic composition with StudioSimple emblem and an inspiring visual tool connecting to the upcoming lesson. Soft gradient background.`,
        overlayText: `StudioSimple · ${oa.asignatura}`,
        speakerNotes: `Existe una forma precisa de resolverlo paso a paso. ¡Descubrámosla juntos en la lección de hoy!`,
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
        overlayText: `Concepto Clave: ${item.focoDidactico}`,
        speakerNotes: `Para comprender este contenido, siempre necesitamos un punto de partida claro que nos permita comparar y medir cualquier cambio con exactitud.`,
        palabrasAprox: 23,
        duracionSeg: 12
      },
      {
        slideNumber: 2,
        tituloMomento: "La Regla de Oro / Algoritmo",
        visualPrompt: `Modern anime style. The boy illustrating the step-by-step rule on a transparent lightboard, while the girl checks and confirms each step. Clean infographic elements, modern lighting.`,
        overlayText: `Regla Fundamental de Procedimiento`,
        speakerNotes: `Esta es la regla de oro: cada paso se ejecuta en un orden estricto, respetando las propiedades y el significado de cada término.`,
        palabrasAprox: 22,
        duracionSeg: 12
      },
      {
        slideNumber: 3,
        tituloMomento: "Planteamiento del Ejercicio Modelado",
        visualPrompt: `Modern anime style. The two 13-year-olds analyzing a specific problem written clearly on the board, identifying the initial given data with arrows and callouts.`,
        overlayText: `Paso 1: Identificar los Datos`,
        speakerNotes: `Comencemos con este caso concreto. El primer movimiento siempre es extraer los datos clave y verificar qué nos pide el problema.`,
        palabrasAprox: 21,
        duracionSeg: 11
      },
      {
        slideNumber: 4,
        tituloMomento: "Primer Paso de Resolución en Acción",
        visualPrompt: `Modern anime style. Close-up on the board where the first calculation or logical transformation is performed visibly, with the girl pointing at the transition.`,
        overlayText: `Paso 2: Aplicar la Operación`,
        speakerNotes: `Ahora ejecutamos la transformación paso a paso: sustituimos los valores y operamos con precisión sin saltarnos ningún renglón.`,
        palabrasAprox: 20,
        duracionSeg: 11
      },
      {
        slideNumber: 5,
        tituloMomento: "Operación Final y Resultado Comprobado",
        visualPrompt: `Modern anime style. The boy writing the final result highlighted in a bright box, and both protagonists nodding in agreement at the verified solution.`,
        overlayText: `Paso 3: Resultado y Verificación`,
        speakerNotes: `Llegamos al resultado final. Antes de continuar, comprobamos si la respuesta tiene sentido lógico con los datos originales del problema.`,
        palabrasAprox: 21,
        duracionSeg: 12
      },
      {
        slideNumber: 6,
        tituloMomento: "Alerta de Error Frecuente (La Trampa)",
        visualPrompt: `Modern anime style. The girl explaining a common misconception with a friendly warning symbol on the board, contrasting the trap with the correct path.`,
        overlayText: `¡Atención con este error común!`,
        speakerNotes: `Cuidado con esta trampa habitual: no confundas los signos ni el orden de las operaciones. Verificarlo ahora te ahorrará equivocaciones.`,
        palabrasAprox: 21,
        duracionSeg: 12
      },
      {
        slideNumber: 7,
        tituloMomento: "Síntesis y Puente al Cuaderno",
        visualPrompt: `Modern anime style. The two 13-year-olds smiling confidently with their notebooks open and pencils ready, inviting the student to replicate the method.`,
        overlayText: `¡Tu turno en el cuaderno!`,
        speakerNotes: `Ya dominas la regla y el método paso a paso. Ahora abre tu cuaderno y resuelve el siguiente ejercicio junto a tu mentor.`,
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

    // Build interactive steps matching app/page.tsx runtime schema
    lessons.push({
      num: classNum,
      title: item.title,
      focoDidactico: item.focoDidactico,
      duracion: "30 Minutos",
      objetivoAdulto: `Acompañar al estudiante para que comprenda y aplique: ${item.focoDidactico}, modelando el pensamiento disciplinar sin prisas.`,
      climaEmocional: isFirst
        ? "Crea un clima seguro: 'Aquí equivocarse es la mejor pista para entender cómo funciona la regla'."
        : "Refuerza la autonomía: 'Tómate el tiempo para observar los datos antes de responder'.",
      situacionIntro: {
        dialogo: `Observa la situación de inicio de hoy. Estamos explorando ${item.title}. ¿Qué observas a primera vista?`,
        pregunta: `¿Cómo describirías esta situación con tus propias palabras?`,
        respEsperada: `Una respuesta que identifique el concepto central de ${item.focoDidactico}.`,
        pistaSocratica: `Pídele que compare lo que conoce con lo que aparece nuevo en el ejemplo.`
      },
      paso2_hook: {
        titulo: `Video Motivacional: El Desafío de ${item.title}`,
        fullPrompt: hookPromptText,
        slides: hookSlides,
        dileAntes: `Antes de ver el video, observa con atención lo que descubren los dos exploradores y qué pregunta queda planteada.`,
        dileDespues: `Muy buena observación. Ahora conversaremos sobre lo que descubrieron en la expedición.`
      },
      paso3_recorrido: [
        {
          context: `Punto de partida`,
          question: `¿Cuál fue la pista principal que encontraron los exploradores al inicio del video?`,
          expected: `Identificar el dato o escenario inicial.`,
          success: `¡Muy bien! Identificaste el punto de partida exacto.`,
          support: `Recuerda fijarte en el momento en que revisan los primeros instrumentos.`,
          reveal: `El punto de partida fue el escenario inicial donde se registraron los primeros datos.`,
          studentReveal: `El escenario inicial con los primeros datos.`
        },
        {
          context: `El obstáculo`,
          question: `¿Qué dificultad tuvieron que enfrentar juntos para no perderse?`,
          expected: `Reconocer la diferencia o problema planteado.`,
          success: `¡Excelente! Reconociste el desafío central del video.`,
          support: `Piensa en qué cambió de repente en la pantalla de control.`,
          reveal: `Tuvieron que resolver cómo registrar el cambio sin cometer errores en la dirección o valor.`,
          studentReveal: `Tuvieron que registrar el cambio correctamente.`
        }
      ],
      paso4_explicativo: {
        titulo: `Video Explicativo: Formalización de ${item.title}`,
        fullPrompt: explicativoPromptText,
        slides: explicativoSlides,
        ideaClave: `Un procedimiento disciplinar claro permite resolver cualquier caso siguiendo un orden verificable paso a paso.`,
        dileAntes: `Ahora veremos la explicación formal de la regla matemática/científica. Fíjate en el paso a paso del ejemplo.`
      },
      paso5_practica: [
        {
          context: `Caso Guiado 1`,
          question: `En esta primera situación, ¿cuál es el primer paso que debemos realizar según la regla aprendida?`,
          expected: `Identificar los datos e incógnita del problema.`,
          success: `¡Correcto! Siempre partimos identificando los datos principales.`,
          support: `Revisa la primera diapositiva de la explicación formal: ¿por dónde comenzamos?`,
          reveal: `El primer paso es registrar claramente los datos y saber qué nos están preguntando.`,
          studentReveal: `Identificar los datos y la pregunta.`
        },
        {
          context: `Caso Guiado 2`,
          question: `Al aplicar el procedimiento a este nuevo caso, ¿qué resultado se obtiene y cómo lo justificas?`,
          expected: `El resultado correcto con su unidad o fundamento.`,
          success: `¡Exacto! Aplicaste la regla en el orden correcto.`,
          support: `Sigue el modelo de los dos jóvenes exploradores paso a paso.`,
          reveal: `El resultado correcto se obtiene aplicando la transformación en orden y comprobando con el contexto.`,
          studentReveal: `El resultado obtenido tras aplicar la regla.`
        }
      ],
      paso6_resumen: {
        ideaClave: `Para resolver problemas sobre ${item.title}, aplicamos el procedimiento en orden, verificamos el resultado y explicamos su sentido.`,
        sintesis: `Hoy dominaste la regla central de ${item.focoDidactico} junto a tus compañeros exploradores.`
      },
      paso7_miniquiz: [
        {
          q: `¿Cuál es el propósito central de la regla aprendida hoy sobre ${item.title}?`,
          options: [
            `A) Resolver situaciones con un criterio formal y comprobable`,
            `B) Memorizar números sin entender su significado`,
            `C) Adivinar el resultado más rápido`
          ],
          correct: `A`,
          fixExplain: `El objetivo de la lección es desarrollar un procedimiento lógico que se pueda comprobar en cualquier situación.`
        },
        {
          q: `Al resolver un problema de este tipo, ¿qué error frecuente debemos evitar?`,
          options: [
            `A) Comprobar el resultado`,
            `B) Saltar pasos y omitir el significado en el contexto`,
            `C) Leer atentamente la pregunta`
          ],
          correct: `B`,
          fixExplain: `Saltar pasos u omitir el contexto suele llevar a confusiones entre conceptos parecidos.`
        },
        {
          q: `¿Cómo podemos comprobar que nuestra respuesta final es razonable?`,
          options: [
            `A) Volviendo al contexto original y verificando la operación inversa`,
            `B) Cambiando la pregunta`,
            `C) Borrando el procedimiento`
          ],
          correct: `A`,
          fixExplain: `Una comprobación real siempre compara el número obtenido con la situación original.`
        }
      ],
      paso8_cierre: {
        preguntaSintesis: `En tus propias palabras, ¿cómo le explicarías a otra persona el paso más importante que aprendimos hoy?`,
        metacognicion: `¿Qué parte de la clase te pareció más entretenida o fácil de comprender?`,
        celebracion: isLast
          ? `¡Felicitaciones! Has completado todo el Objetivo de Aprendizaje ${oa.oa}. ¡Excelente trabajo en equipo!`
          : `¡Gran trabajo hoy! Has dominado la Clase ${classNum}. ¡Nos vemos en la próxima misión!`
      }
    });
  });

  const oaWithBook: OACatalogItem = {
    ...oa,
    referenciaTextoEscolar: oa.referenciaTextoEscolar || TEXTBOOK_MAPPINGS[oa.id] || {
      libro: `${oa.asignatura} 7° Básico (Texto del Estudiante MINEDUC)`,
      unidad: `Unidad Oficial`,
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
 * Returns pedagogical distribution of lesson titles and focuses
 */
function getLessonTitlesAndFocus(
  oa: OACatalogItem,
  total: number
): { title: string; focoDidactico: string }[] {
  const isMat = oa.asignatura.includes("Matem");
  const isCie = oa.asignatura.includes("Cienc");
  const isHis = oa.asignatura.includes("Hist");
  const isIng = oa.asignatura.includes("Ingl");

  if (total === 5) {
    if (isMat && oa.oaNumero === 1) {
      return [
        { title: "Posiciones respecto de un punto de referencia", focoDidactico: "El número cero como origen, signos + y -, niveles de profundidad y temperaturas" },
        { title: "La recta numérica y orden en Z", focoDidactico: "Ubicación horizontal de enteros y criterio de mayor hacia la derecha" },
        { title: "Valor absoluto y números opuestos", focoDidactico: "Distancia pura al cero y simetría aditiva en la recta numérica" },
        { title: "Adición y sustracción en Z", focoDidactico: "Desplazamientos direccionales y la resta como suma del inverso aditivo" },
        { title: "Resolución de problemas cotidianos y síntesis", focoDidactico: "Modelamiento en 4 pasos para saldos financieros, variaciones térmicas y evaluación" }
      ];
    }
    return [
      { title: "Apertura conceptual y punto de partida", focoDidactico: `Definición esencial y vocabulario clave de ${oa.conceptosClave[0] || oa.oa}` },
      { title: "Representación y modelo visual", focoDidactico: `Visualización gráfica, diagramas o esquemas de ${oa.conceptosClave[1] || oa.oa}` },
      { title: "Procedimiento nuclear y regla principal", focoDidactico: `Aplicación de la primera regla disciplinar paso a paso` },
      { title: "Casos de contraste y relaciones", focoDidactico: `Comparación con contraejemplos y análisis de variaciones` },
      { title: "Resolución de problemas y cierre del OA", focoDidactico: `Transferencia a situaciones de la vida real y ensayo final` }
    ];
  }

  // 6 lessons
  if (isMat && (oa.oaNumero === 2 || oa.oaNumero === 3)) {
    return [
      { title: "Representación de fracciones y decimales positivos", focoDidactico: "Sentido numérico y equivalencia gráfica entre fracción y decimal" },
      { title: "Multiplicación de decimales en contextos cotidianos", focoDidactico: "Modelado de área y algoritmo de multiplicación con coma decimal" },
      { title: "Multiplicación de fracciones paso a paso", focoDidactico: "Interpretación como parte de una parte y simplificación de productos" },
      { title: "División de decimales e inverso multiplicativo", focoDidactico: "División entre decimales y comprensión del reparto continuo" },
      { title: "División de fracciones y algoritmos combinados", focoDidactico: "Multiplicación por el recíproco y resolución de ejercicios mixtos" },
      { title: "Resolución de problemas cotidianos tipo Examen Libre", focoDidactico: "Modelamiento Pólya de recetas, presupuestos, medidas y ensayo sumativo" }
    ];
  }

  if (isCie && oa.oaNumero === 1) {
    return [
      { title: "La sexualidad como dimensión integral humana", focoDidactico: "Integración de aspectos biológicos, psicológicos, afectivos y sociales" },
      { title: "Transformaciones físicas y emocionales en la pubertad", focoDidactico: "Caracteres sexuales secundarios, cambios corporales y desarrollo" },
      { title: "Vínculos afectivos, respeto mutuo e intimidad", focoDidactico: "La comunicación empática y el cuidado en las relaciones interpersonales" },
      { title: "Responsabilidad individual y toma de decisiones", focoDidactico: "Autocuidado, consentimiento y discernimiento informado en adolescentes" },
      { title: "Mitos, estereotipos y convivencia saludable", focoDidactico: "Análisis crítico de mitos culturales sobre la sexualidad y el género" },
      { title: "Síntesis y simulación tipo Examen Libre", focoDidactico: "Evaluación formativa, análisis de dilemas y cierre del OA" }
    ];
  }

  if (isHis && oa.oaNumero === 2) {
    return [
      { title: "El fin del nomadismo y el surgimiento agrícola", focoDidactico: "Transición de la caza y recolección a la producción de alimentos" },
      { title: "Domesticación de animales y plantas", focoDidactico: "Selección artificial, ciclos de cultivo y almacenamiento de excedentes" },
      { title: "Primeras aldeas sedentarias y división del trabajo", focoDidactico: "Transformación del espacio geográfico y nuevas profesiones" },
      { title: "Innovaciones tecnológicas del Neolítico", focoDidactico: "Cerámica, tejido, piedra pulida y metalurgia incipiente" },
      { title: "Consecuencias sociales y síntesis de la Revolución", focoDidactico: "Aparición de la propiedad, jerarquías y proyección al presente" }
    ];
  }

  if (isHis && oa.oaNumero === 3) {
    return [
      { title: "Entornos geográficos y ríos de las primeras civilizaciones", focoDidactico: "Ríos Tigris, Éufrates, Nilo, Indo y Amarillo como ejes de desarrollo" },
      { title: "La ciudad como centro de poder y organización política", focoDidactico: "Estratificación social, leyes escritas y centralización estatal" },
      { title: "Sistemas de contabilidad, escritura y monumentalidad", focoDidactico: "Invención de la escritura cuneiforme/jeroglífica y arquitectura ceremonial" },
      { title: "Religión, cosmovisión y legitimación del poder", focoDidactico: "Politeísmo, templos y relación entre gobernantes y dioses" },
      { title: "Comercio interregional y legado cultural", focoDidactico: "Redes de intercambio y aportes científicos y culturales a la humanidad" }
    ];
  }

  if (oa.asignatura.includes("Leng") && oa.oaNumero === 3) {
    return [
      { title: "El conflicto narrativo y la trama de la historia", focoDidactico: "Identificación de fuerzas en oposición y nudo central del relato" },
      { title: "Evolución y roles de los personajes", focoDidactico: "Protagonistas, antagonistas y motivaciones que impulsan las acciones" },
      { title: "La voz del narrador y perspectivas", focoDidactico: "Distinción entre narrador omnisciente, protagonista y testigo" },
      { title: "Disposición temporal de los acontecimientos", focoDidactico: "Orden cronológico, saltos temporales (anacronías) y ritmo narrativo" },
      { title: "Interpretación global y visión de mundo", focoDidactico: "Mensaje implícito, dilemas humanos y conexión con la experiencia propia" }
    ];
  }

  // Generic 6 lessons
  return [
    { title: "Marco inicial y punto de referencia", focoDidactico: `Introducción al fenómeno y delimitación conceptual de ${oa.conceptosClave[0] || oa.oa}` },
    { title: "Representación y modelado disciplinar 1", focoDidactico: `Primera herramienta o proceso pictórico` },
    { title: "Procedimiento formal del proceso 1", focoDidactico: `Algoritmo o análisis de causas del primer núcleo temático` },
    { title: "Modelado disciplinar del proceso 2", focoDidactico: `Segunda herramienta o proceso divergente` },
    { title: "Operaciones integradas y relaciones", focoDidactico: `Interacción combinada entre ambos procesos y prevención de errores` },
    { title: "Simulador de problemas y evaluación sumativa", focoDidactico: `Ensayo formal de 8 preguntas tipo MINEDUC y síntesis del OA` }
  ];
}
