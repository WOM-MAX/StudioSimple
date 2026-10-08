import { LessonData } from '../../types/lesson';

export const MATEMATICA_7B_OA04_CLASE06: LessonData = {
  "metadata": {
    "grade": "7° Básico",
    "subject": "Matemática",
    "oaCode": "OA 4",
    "oaTitle": "Porcentajes",
    "lessonNumber": 6,
    "totalLessonsInOa": 6,
    "lessonTitle": "Síntesis Integradora y Ensayo de Evaluación Formativa: Porcentajes en Acción",
    "durationMinutes": 30,
    "nextLessonTitle": "Fin de Unidad: Felicitaciones por completar Porcentajes"
  },
  "prep": {
    "adultObjective": "Guiar al estudiante en la síntesis integradora de la unidad de porcentajes, consolidando el cálculo inverso (hallar el total conociendo el porcentaje), la interpretación de gráficos de sectores circulares y la resolución de reactivos psicométricos formales tipo Examen Libre MINEDUC con análisis crítico de distractores.",
    "routeToday": "Integrar todas las estrategias aprendidas en las 5 clases previas para enfrentar problemas desafiantes y el ensayo de evaluación formativa oficial del MINEDUC con 4 alternativas y justificación de errores comunes.",
    "mentorReminder": "Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Acompaña con calma el trabajo en el cuaderno y celebra cada razonamiento bien argumentado.",
    "reminders": [
      "En problemas inversos: si el P% de una cantidad es X, el total (100%) se calcula como Total = (X · 100) / P.",
      "En gráficos circulares: el círculo completo representa el 100% y 360°, la mitad es 50% (180°) y un cuarto es 25% (90°).",
      "Descuentos sucesivos NO se suman aritméticamente: dos descuentos del 10% no equivalen a un 20%, porque el segundo se aplica sobre el saldo rebajado.",
      "Valida que el estudiante argumente por qué las alternativas incorrectas son erróneas."
    ],
    "emotionalTip": "Esta es la clase de coronación. Demuéstrale confianza: el estudiante ya posee todas las herramientas para resolver con maestría cualquier reactivo formal tipo MINEDUC."
  },
  "route": {
    "blocks": [
      {
        "id": "b1",
        "number": "01",
        "title": "Síntesis",
        "subtitle": "Integración de Conceptos",
        "color": "navy"
      },
      {
        "id": "b2",
        "number": "02",
        "title": "Cálculo Inverso",
        "subtitle": "Hallar el Total (100%)",
        "color": "orange"
      },
      {
        "id": "b3",
        "number": "03",
        "title": "Gráficos y Datos",
        "subtitle": "Sectores Circulares",
        "color": "yellow"
      },
      {
        "id": "b4",
        "number": "04",
        "title": "Ensayo MINEDUC",
        "subtitle": "Evaluación y Distractores",
        "color": "teal"
      }
    ],
    "keyQuestions": [
      {
        "label": "Cálculo Inverso",
        "sub": "Hallar el 100% a partir de un valor parcial conocido"
      },
      {
        "label": "Gráficos Circulares",
        "sub": "Lectura de distribución de datos en porcentajes"
      },
      {
        "label": "Variaciones Sucesivas",
        "sub": "Comprensión de que el porcentaje depende de la base"
      }
    ],
    "dileIntro": "¡Llegamos a la sexta y última clase de nuestra unidad de porcentajes! Hoy integraremos todo nuestro conocimiento para resolver el gran ensayo oficial tipo Examen Libre del MINEDUC.",
    "dileObjective": "Consolidar el aprendizaje integral de la unidad de porcentajes: calcular el total desconocido a partir de una parte porcentual, interpretar gráficos de sectores circulares y resolver reactivos de evaluación formativa tipo MINEDUC con análisis crítico de distractores."
  },
  "situation": {
    "dilePrompt": "En una biblioteca escolar, 12 libros de ciencias representan el 20% de los libros prestados durante la semana. ¿Cuántos libros se prestaron en total?",
    "expectedAnswer": "Se prestaron 60 libros en total, porque si el 20% (la quinta parte) son 12, el 100% es 12 multiplicado por 5, lo que da 60.",
    "socraticHint": "Recuerda que el 20% es equivalente a la fracción 1/5. Si un quinto son 12, ¿cuánto son los cinco quintos?",
    "emotionalTip": "Celebra su razonamiento. Darse cuenta de que se puede \"recorrer el camino al revés\" para hallar el total es un hito de madurez matemática.",
    "options": [
      {
        "label": "Respondió 60 libros aplicando la proporción o multiplicando 12 por 5",
        "kind": "correct",
        "feedbackText": "¡Brillante! Si el 20% es 12, multiplicamos 12 por 5 y obtenemos el 100%, que equivale a 60 libros en total."
      },
      {
        "label": "Calculó el 20% de 12 (obteniendo 2,4)",
        "kind": "needs_support",
        "feedbackText": "¡Atención al enunciado! 12 no es el total; 12 es la parte que equivale al 20%. Debemos buscar un total mayor que 12."
      },
      {
        "label": "Dijo 24 libros (confundió el 20% con el 50%)",
        "kind": "no_answer",
        "feedbackText": "Revisemos juntos: el 20% cabe 5 veces en el 100%. Por lo tanto, 12 veces 5 es 60 libros."
      }
    ]
  },
  "reference": {
    "dilePrompt": "Si en una votación escolar una candidata obtuvo 45 votos, lo que corresponde al 50% de los votos emitidos, ¿cuántos estudiantes votaron en total?",
    "question": "¿Cuál fue el total de votos emitidos?",
    "expectedAnswer": "Votaron 90 estudiantes en total, porque el 50% es la mitad, y el doble de 45 es 90.",
    "socraticHint": "Si la mitad es 45, multiplica por 2 para encontrar el total completo.",
    "feedbackSuccess": "¡Exacto! El 50% es 1/2. Si un medio son 45 votos, los dos medios (100%) son 90 votos.",
    "feedbackSupport": "Como el 50% representa la mitad exacta, basta con duplicar los 45 votos: 45 · 2 = 90."
  },
  "hook": {
    "title": "La Gran Misión del Cierre Anual",
    "titulo": "La Gran Misión del Cierre Anual",
    "focusPoints": [
      "Interpretar los resultados de una encuesta escolar presentados en un gráfico circular.",
      "Deducir el total de la comunidad escolar a partir de un porcentaje parcial conocido.",
      "Analizar por qué dos descuentos sucesivos del 10% no son equivalentes a un 20% de descuento directo."
    ],
    "dileIntro": "Acompañemos a Sofía y Lucas en la asamblea de fin de año del colegio, donde deben presentar el balance de proyectos frente a toda la comunidad estudiantil.",
    "hazInstruction": "Observa la animación y fíjate en la destreza con la que traducen los gráficos circulares a números concretos y desenmascaran los errores frecuentes.",
    "videoSrc": "/videos/mat_7b_oa04_c06_hook.mp4",
    "videoUrl": "/videos/mat_7b_oa04_c06_hook.mp4",
    "posterSrc": "/images/mat_7b_oa04_c06_hook_poster.jpg",
    "dileAfterVideo": "¿Viste cómo resolvieron el enigma del gráfico circular y el cálculo del total? Ahora formalicemos estas estrategias maestras en nuestro cuaderno.",
    "slides": [
      {
        "slideNumber": 1,
        "tituloMomento": "El Gran Balance del Cierre Escolar",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Two 13-year-old student organizers, a girl with braided hair and a boy in a teal jacket, standing before a large wooden presentation board in a bright school auditorium. A colorful pie chart is pinned to the board, sunlight streaming through tall windows, clean vector aesthetic, ample negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "SÍNTESIS INTEGRADORA: PORCENTAJES EN ACCIÓN",
        "overlayTitle": "SÍNTESIS INTEGRADORA: PORCENTAJES EN ACCIÓN",
        "overlaySubtitle": "Misión 6: Consolidación y Ensayo Final tipo MINEDUC",
        "vectorialOverlayPptx": "Panel de asamblea escolar con gráfico circular de participación estudiantil",
        "speakerNotes": "Bienvenidos a la sesión final de nuestra unidad. Sofía y Lucas deben presentar el informe oficial de participación escolar ante la asamblea, interpretando datos porcentuales y calculando totales clave.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 2,
        "tituloMomento": "El Enigma del Gráfico Circular",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Close up of the presentation board showing a large circular chart divided into three distinct colored slices: blue for 50%, yellow for 25%, and coral for 25%. Lucas is pointing with a wooden ruler while Sofía holds her notes, focused engaged expressions, clear clean lines, negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "¿CÓMO LEER UN GRÁFICO CIRCULAR?",
        "overlayTitle": "¿CÓMO LEER UN GRÁFICO CIRCULAR?",
        "overlaySubtitle": "El círculo completo equivale al 100% de la muestra",
        "vectorialOverlayPptx": "Diagrama circular con sectores: 50% (semicírculo), 25% (cuadrante) y 25% (cuadrante)",
        "speakerNotes": "El gráfico muestra las preferencias deportivas de los estudiantes. El sector azul ocupa la mitad del círculo, lo que equivale al 50%. Los dos sectores restantes ocupan un cuarto cada uno, correspondientes al 25%.",
        "duracionSeg": 9
      },
      {
        "slideNumber": 3,
        "tituloMomento": "El Misterio del Total Desconocido",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Sofía writing on a chalkboard with neat chalk figures, drawing a balance scale where one side shows 15 students and the other side shows a 10% tag. Lucas is calculating in his notebook, bright classroom ambiance, clean anime shading.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "CONOCIENDO LA PARTE, ENCONTRAMOS EL TOTAL",
        "overlayTitle": "CONOCIENDO LA PARTE, ENCONTRAMOS EL TOTAL",
        "overlaySubtitle": "Si el 10% son 15 estudiantes, ¿cuántos son el 100%?",
        "vectorialOverlayPptx": "Esquema de proporción directa: 10% -> 15 | 100% -> X = (15 · 100) / 10 = 150",
        "speakerNotes": "El informe señala que 15 estudiantes eligieron ajedrez, representando exactamente el 10% del colegio. Sofía se pregunta: ¿cómo calculamos a cuántos estudiantes encuestaron en total?",
        "duracionSeg": 9
      },
      {
        "slideNumber": 4,
        "tituloMomento": "El Razonamiento Multiplicativo",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Lucas showing his notebook to the audience with an enthusiastic smile, revealing a diagram with 10 identical blocks of 15 students lined up to form a large bar of 150. Crisp lineart, warm studio lighting, negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "EL 10% CABE 10 VECES EN EL 100%",
        "overlayTitle": "EL 10% CABE 10 VECES EN EL 100%",
        "overlaySubtitle": "Multiplicamos 15 por 10 = 150 estudiantes en total",
        "vectorialOverlayPptx": "Barra modular de 10 bloques de 15 unidades: 10 · 15 = 150",
        "speakerNotes": "Lucas razona con rapidez: como el 10% cabe 10 veces en el 100%, multiplicamos 15 por 10. El colegio encuestó a 150 estudiantes en total. ¡Una deducción matemáticamente impecable!",
        "duracionSeg": 9
      },
      {
        "slideNumber": 5,
        "tituloMomento": "El Dilema de las Rebajas Sucesivas",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Two shop posters in a bookstore window: one claims 20% direct discount, and another claims 10% plus an additional 10% discount. Sofía and Lucas analyzing the difference with furrowed brows, dramatic curious expressions, clean lighting.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "¿SUMAR DESCUENTOS ES LO MISMO?",
        "overlayTitle": "¿SUMAR DESCUENTOS ES LO MISMO?",
        "overlaySubtitle": "Comparando 20% directo versus 10% + 10% sucesivo",
        "vectorialOverlayPptx": "Comparación: Descuento 20% sobre $10.000 ($8.000) vs 10% sobre $10.000 y 10% sobre $9.000 ($8.100)",
        "speakerNotes": "Un puesto escolar anuncia una rebaja del 10% y luego otro 10% adicional. ¿Es lo mismo que una rebaja del 20% de una sola vez? Sofía advierte que hay una trampa sutil.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 6,
        "tituloMomento": "La Base Cambia en Cada Paso",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Sofía and Lucas pointing at a comparison table on their chalkboard, showing that the second 10% se calcula sobre el nuevo precio rebajado de $9.000, resultando en $900 y no en $1.000. Clean modern flat colors, ample negative space.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "EL SEGUNDO PORCENTAJE TIENE NUEVA BASE",
        "overlayTitle": "EL SEGUNDO PORCENTAJE TIENE NUEVA BASE",
        "overlaySubtitle": "10% de $10.000 = $1.000 | 10% de $9.000 = $900 | Total = $8.100",
        "vectorialOverlayPptx": "Cálculo paso a paso: $10.000 - $1.000 = $9.000 -> $9.000 - $900 = $8.100 (Ahorro real: 19%)",
        "speakerNotes": "Al aplicar el segundo descuento, la base ya no es 10.000, sino 9.000 pesos. Por eso el segundo ahorro es de 900 pesos, pagando 8.100 en lugar de 8.000. ¡El porcentaje siempre depende de la base sobre la que actúa!",
        "duracionSeg": 9
      },
      {
        "slideNumber": 7,
        "tituloMomento": "Paso a la Consolidación Formal",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Sofía and Lucas high-fiving in front of the finished presentation board, holding their study guides with proud smiles, warm golden afternoon glow entering the hall, tidy minimalist room.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "¡LISTOS PARA EL ENSAYO OFICIAL!",
        "overlayTitle": "¡LISTOS PARA EL ENSAYO OFICIAL!",
        "overlaySubtitle": "Dominamos las 4 operaciones y las estrategias de porcentajes",
        "vectorialOverlayPptx": "Insignia de maestría: 100% de la unidad dominada",
        "speakerNotes": "Han resuelto todos los desafíos con rigor. Ahora pasemos a la formalización matemática y al ensayo tipo Examen Libre para consolidar tu maestría en porcentajes.",
        "duracionSeg": 8
      }
    ]
  },
  "preQuestions": [
    {
      "context": "En el balance escolar, 15 estudiantes que eligieron ajedrez representan el 10% de los encuestados.",
      "question": "¿Cuántas veces cabe el 10% en el 100% y cómo te ayuda eso a hallar el total?",
      "expected": "Cabe 10 veces, por lo que multiplicamos 15 por 10 para obtener 150 estudiantes.",
      "success": "¡Excelente deducción! Como 10% es 1/10, el total es 15 · 10 = 150 estudiantes.",
      "support": "Divide 100 entre 10 para ver cuántas partes son (10). Luego multiplica 15 por 10 = 150.",
      "reveal": "10% · 10 = 100% -> 15 · 10 = 150 estudiantes en total.",
      "studentReveal": "El 10% cabe 10 veces, así que 15 · 10 = 150 estudiantes."
    },
    {
      "context": "En un gráfico circular que representa a toda la comunidad escolar (100%).",
      "question": "Si el 50% hace deportes y el 25% hace arte, ¿qué porcentaje de estudiantes queda para el resto de talleres?",
      "expected": "Queda un 25% (100% - 50% - 25% = 25%).",
      "success": "¡Exacto! 50% + 25% = 75%, y 100% - 75% = 25% restante.",
      "support": "Suma los dos porcentajes conocidos (50 + 25 = 75) y réstalo de 100: 100 - 75 = 25%.",
      "reveal": "100% - (50% + 25%) = 25%.",
      "studentReveal": "Queda un 25% para el resto de los talleres."
    }
  ],
  "formalization": {
    "title": "Formalización y Síntesis: El Algoritmo Universal de Porcentajes",
    "concept": "En problemas inversos, el total (100%) se calcula como Total = (Parte · 100) / Porcentaje. En gráficos circulares, el 100% equivale al círculo entero (360°). En variaciones sucesivas, cada porcentaje actúa sobre el saldo inmediatamente anterior.",
    "dileIntro": "Abre tu cuaderno de matemática en una página limpia. Vamos a registrar el método del cálculo inverso y el análisis de gráficos circulares con rigor.",
    "hazInstruction": "Observa la explicación formal y copia en tu cuaderno la fórmula de cálculo inverso y la resolución del ejemplo modelado.",
    "videoSrc": "/videos/mat_7b_oa04_c06_expl.mp4",
    "videoUrl": "/videos/mat_7b_oa04_c06_expl.mp4",
    "graphicPoster": "/images/mat_7b_oa04_c06_expl_poster.jpg",
    "slides": [
      {
        "slideNumber": 1,
        "tituloMomento": "Declaración del Objetivo: Síntesis de Porcentajes y Ensayo MINEDUC",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing confidently before a modern digital board displaying summary diagrams and sample questions. Clean classroom, high clarity, ample negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "OBJETIVO DE LA LECCIÓN",
        "overlayTitle": "OBJETIVO DE LA LECCIÓN",
        "overlaySubtitle": "Hallar el total conociendo una parte y el porcentaje correspondiente",
        "vectorialOverlayPptx": "Meta de aprendizaje: Dominar cálculo inverso, gráficos de sectores y resolución formal de reactivos",
        "speakerNotes": "Hoy aprenderemos a hallar el total correspondiente al cien por ciento conociendo una parte y su porcentaje, consolidando todas las estrategias de porcentajes para evaluaciones formales.",
        "duracionSeg": 12
      },
      {
        "slideNumber": 2,
        "tituloMomento": "Ejemplo Modelado: Cálculo del Total",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Detailed chalkboard split into three vertical sections demonstrating the calculation step by step: 15% -> 18 libros, 18 · 100 = 1.800, 1.800 : 15 = 120 libros. Lucas pointing to each step, calm organized atmosphere.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "MODELAMIENTO PASO A PASO",
        "overlayTitle": "MODELAMIENTO PASO A PASO",
        "overlaySubtitle": "18 libros corresponden al 15% -> Total = 120 libros",
        "vectorialOverlayPptx": "Resolución: X = (18 · 100) / 15 = 1.800 / 15 = 120 libros",
        "speakerNotes": "Observa la resolución: si dieciocho libros son el quince por ciento, multiplicamos dieciocho por cien, obteniendo mil ochocientos. Al dividir por quince, el resultado final es ciento veinte libros.",
        "duracionSeg": 13
      },
      {
        "slideNumber": 3,
        "tituloMomento": "Interpretación de Gráficos de Sectores",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Clean educational infographic style slide showing a 360-degree circle with protractor markings. Slices clearly labeled with fraction equivalents: 50% = 1/2, 25% = 1/4, 10% = 1/10. Sofía explaining with a pointer, bright colors.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "LECTURA DE GRÁFICOS CIRCULARES",
        "overlayTitle": "LECTURA DE GRÁFICOS CIRCULARES",
        "overlaySubtitle": "La suma de todos los sectores siempre equivale al 100%",
        "vectorialOverlayPptx": "Círculo trigonométrico de porcentajes: 360° = 100% | 180° = 50% | 90° = 25% | 36° = 10%",
        "speakerNotes": "En un gráfico de sectores circulares, la totalidad del círculo representa el cien por ciento. Cada sector equivale a una fracción del total, y la suma de todas las partes debe dar exactamente cien por ciento.",
        "duracionSeg": 13
      },
      {
        "slideNumber": 4,
        "tituloMomento": "Variaciones Porcentuales y Descuentos Sucesivos",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Infographic comparison slide with a flow diagram showing two sequential arrows: from $10.000 minus 10% to $9.000, and from $9.000 minus 10% to $8.100. Lucas analyzing the flow, clean corporate aesthetic.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "VARIACIONES PORCENTUALES SUCESIVAS",
        "overlayTitle": "VARIACIONES PORCENTUALES SUCESIVAS",
        "overlaySubtitle": "El porcentaje se aplica siempre sobre el saldo anterior",
        "vectorialOverlayPptx": "Diagrama de flujo: $10.000 -> -10% -> $9.000 -> -10% -> $8.100 (Rebaja efectiva: 19%)",
        "speakerNotes": "Recuerda que en aumentos o descuentos sucesivos, la base cambia en cada etapa. Por eso dos rebajas sucesivas del diez por ciento producen un descuento real del diecinueve por ciento, no del veinte.",
        "duracionSeg": 13
      },
      {
        "slideNumber": 5,
        "tituloMomento": "Análisis del Error Típico en Evaluaciones",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Chalkboard showing a red alert icon next to a common error: calculating 20% OF 12 instead of solving for the total. Sofía crossing out the error with a gentle smile and writing the correct formula.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "EVITA LA TRAMPA: ¿PARTE O TOTAL?",
        "overlayTitle": "EVITA LA TRAMPA: ¿PARTE O TOTAL?",
        "overlaySubtitle": "Lee con atención si el número dado es la parte o el total",
        "vectorialOverlayPptx": "Cuadro comparativo: \"Calcular el 20% de 12\" = 2,4 vs \"12 es el 20%\" = 60",
        "speakerNotes": "El error más frecuente en los exámenes es calcular el porcentaje sobre el número dado cuando el enunciado indica que ese número ya es la parte porcentual. Pregúntate siempre: ¿este número es la parte o el total?",
        "duracionSeg": 13
      },
      {
        "slideNumber": 6,
        "tituloMomento": "Reactivo de Evaluación Formativa Oficial",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Sofía and Lucas in formal school uniforms, standing beside a projected sample test question with 4 multiple choice letters A, B, C, D clearly highlighted in clean boxes. Focused confident attitudes.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "EJEMPLO MODELADO: CASO 1",
        "overlayTitle": "EJEMPLO MODELADO: CASO 1",
        "overlaySubtitle": "En una biblioteca pública, 18 libros de literatura juvenil representan el 15% de",
        "vectorialOverlayPptx": "Resolución canónica: Total = (18 · 100) / 15 = 1.800 / 15 = 120 libros.",
        "speakerNotes": "Analicemos paso a paso el caso modelado: En una biblioteca pública, 18 libros de literatura juvenil representan el 15% del total de libros prestados este mes. ¿Cuántos libros prestó la biblioteca en total? Total = (18 · 100) / 15 = 1.800 / 15 = 120 libros. Por lo tanto, el resultado esperado es: Se prestaron 120 libros en total..",
        "duracionSeg": 13
      },
      {
        "slideNumber": 7,
        "tituloMomento": "Cierre y Transición a la Práctica en Plataforma",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Both students smiling warmly at the camera from their study desks, laptop open showing the practice portal interface with green checkmarks. Clean bright study room, ample negative space.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "REGLA DE ORO DE LA LECCIÓN",
        "overlayTitle": "REGLA DE ORO DE LA LECCIÓN",
        "overlaySubtitle": "Ingresa al módulo interactivo para tu práctica final",
        "vectorialOverlayPptx": "Logotipo de EstudioSimple con botón: Iniciar Práctica Interactiva",
        "speakerNotes": "Regla de oro: Ingresa al módulo interactivo para tu práctica final. Ahora pon a prueba lo aprendido resolviendo los casos de práctica en la plataforma interactiva.",
        "duracionSeg": 13
      }
    ]
  },
  "postQuestions": [
    {
      "context": "En una biblioteca pública, 18 libros de literatura juvenil representan el 15% del total de libros prestados este mes.",
      "question": "¿Cuántos libros prestó la biblioteca en total?",
      "expected": "Se prestaron 120 libros en total.",
      "success": "¡Excelente! Planteaste la proporción con precisión: (18 · 100) / 15 = 120 libros.",
      "support": "Multiplica la parte por 100 y divide por el porcentaje: (18 · 100) : 15 = 1.800 : 15 = 120.",
      "reveal": "Total = (18 · 100) / 15 = 1.800 / 15 = 120 libros.",
      "studentReveal": "La biblioteca prestó 120 libros en total."
    },
    {
      "context": "Un gráfico circular muestra las preferencias de 200 estudiantes: 40% Robótica, 35% Teatro y el resto Ajedrez.",
      "question": "¿Cuántos estudiantes eligieron Ajedrez?",
      "expected": "50 estudiantes eligieron Ajedrez (25% del total).",
      "success": "¡Perfecto! Identificaste que Ajedrez correspondía al 25% (la cuarta parte de 200 = 50).",
      "support": "Suma 40% + 35% = 75%. El resto es 100% - 75% = 25%. Luego calcula: 200 : 4 = 50.",
      "reveal": "100% - 75% = 25% | 200 · 0,25 = 50 estudiantes.",
      "studentReveal": "50 estudiantes eligieron el taller de Ajedrez."
    }
  ],
  "practice": [
    {
      "context": "En una biblioteca pública, 18 libros de literatura juvenil representan el 15% del total de libros prestados este mes.",
      "question": "¿Cuántos libros prestó la biblioteca en total?",
      "expected": "Se prestaron 120 libros en total.",
      "success": "¡Excelente! Planteaste la proporción con precisión: (18 · 100) / 15 = 120 libros.",
      "support": "Multiplica la parte por 100 y divide por el porcentaje: (18 · 100) : 15 = 1.800 : 15 = 120.",
      "reveal": "Total = (18 · 100) / 15 = 1.800 / 15 = 120 libros.",
      "studentReveal": "La biblioteca prestó 120 libros en total."
    },
    {
      "context": "Un gráfico circular muestra las preferencias de 200 estudiantes: 40% Robótica, 35% Teatro y el resto Ajedrez.",
      "question": "¿Cuántos estudiantes eligieron Ajedrez?",
      "expected": "50 estudiantes eligieron Ajedrez (25% del total).",
      "success": "¡Perfecto! Identificaste que Ajedrez correspondía al 25% (la cuarta parte de 200 = 50).",
      "support": "Suma 40% + 35% = 75%. El resto es 100% - 75% = 25%. Luego calcula: 200 : 4 = 50.",
      "reveal": "100% - 75% = 25% | 200 · 0,25 = 50 estudiantes.",
      "studentReveal": "50 estudiantes eligieron el taller de Ajedrez."
    },
    {
      "context": "Un microscopio escolar tiene un precio neto de $50.000 en una compraventa afecta a IVA. Se aplica un 10% de descuento y luego se agrega el 19% de IVA sobre el valor resultante.",
      "question": "¿Cuál es el valor final a pagar con el IVA incluido?",
      "expected": "El valor final a pagar es $53.550.",
      "success": "¡Extraordinario! Neto rebajado: $45.000. IVA (19%): $8.550. Total: $45.000 + $8.550 = $53.550.",
      "support": "Paso 1: $50.000 - $5.000 = $45.000. Paso 2: IVA = 45.000 · 0,19 = $8.550. Paso 3: $45.000 + $8.550 = $53.550.",
      "reveal": "$50.000 - $5.000 = $45.000 -> $45.000 · 1,19 = $53.550.",
      "studentReveal": "El comprador pagará $53.550 con IVA incluido."
    }
  ],
  "mini": [
    {
      "id": "q1",
      "q": "En un taller de robótica, 14 estudiantes representan el 28% de los inscritos. ¿Cuál es la cantidad total de estudiantes inscritos en el taller?",
      "options": [
        "50 estudiantes",
        "39 estudiantes",
        "3,92 estudiantes",
        "200 estudiantes"
      ],
      "correct": "50 estudiantes",
      "fixExplain": "Total = (14 · 100) / 28 = 1.400 / 28 = 50 estudiantes (39 resulta de restar 28 - 14 equivocadamente; 3,92 resulta de calcular el 28% de 14 en vez de hallar el total)."
    },
    {
      "id": "q2",
      "q": "Un gráfico circular muestra que el 60% de los libros de una biblioteca son de narrativa y el resto son de ciencias. Si la biblioteca tiene 400 libros en total, ¿cuántos libros son de ciencias?",
      "options": [
        "160 libros",
        "240 libros",
        "40 libros",
        "100 libros"
      ],
      "correct": "160 libros",
      "fixExplain": "El porcentaje de ciencias es 100% - 60% = 40%. El 40% de 400 es 400 · 0,40 = 160 libros (240 corresponde a los libros de narrativa, no de ciencias; 40 confunde el porcentaje con la cantidad)."
    },
    {
      "id": "q3",
      "q": "Un par de zapatillas tiene un precio de lista de $40.000. La tienda ofrece un 25% de descuento por liquidación. ¿Cuánto dinero se ahorra el comprador y cuánto paga finalmente?",
      "options": [
        "Se ahorra $10.000 y paga $30.000",
        "Se ahorra $25.000 y paga $15.000",
        "Se ahorra $10.000 y paga $40.000",
        "Se ahorra $4.000 y paga $36.000"
      ],
      "correct": "Se ahorra $10.000 y paga $30.000",
      "fixExplain": "El 25% de $40.000 es la cuarta parte: $40.000 / 4 = $10.000 de rebaja. El precio final es $40.000 - $10.000 = $30.000."
    }
  ],
  "recovery": [
    {
      "title": "Refuerzo de Cálculo Inverso",
      "explain": "Para hallar el total (100%) cuando conoces una parte, multiplica la parte por 100 y divide por el porcentaje: Total = (Parte · 100) / Porcentaje.",
      "q": "Si 9 personas representan el 30% de los asistentes a una reunión, ¿cuántas personas asisten en total?",
      "options": [
        "30 personas",
        "27 personas",
        "90 personas",
        "3 personas"
      ],
      "correct": "30 personas",
      "correctText": "¡Excelente recuperación! (9 · 100) / 30 = 900 / 30 = 30 personas.",
      "fixText": "Recuerda: multiplica 9 por 100 (900) y divide por 30 = 30 personas."
    }
  ],
  "summaryIdeas": [
    [
      "Cálculo Inverso del Total",
      "Para hallar el 100%, multiplica la cantidad parcial por 100 y divide por el porcentaje: Total = (Parte · 100) / Porcentaje."
    ],
    [
      "Gráficos Circulares de Datos",
      "El círculo completo representa siempre el 100% (360°). La suma de los sectores conocidos permite hallar el porcentaje faltante por sustracción."
    ],
    [
      "Variaciones Porcentuales Sucesivas",
      "En aumentos o descuentos sucesivos, cada porcentaje se calcula sobre la base del saldo anterior y no se suman directamente."
    ],
    [
      "Resolución Crítica de Reactivos",
      "En preguntas de evaluación formal tipo MINEDUC, distingue si te preguntan por la parte, el porcentaje o el total, descartando distractores por análisis de procedimiento."
    ]
  ],
  "strategy": {
    "title": "Estrategia Maestra de 3 Pasos para Evaluaciones de Porcentajes",
    "dileIntro": "Aplica esta secuencia infalible en cada reactivo tipo Examen Libre:",
    "steps": [
      {
        "number": 1,
        "title": "Identificar la Incógnita",
        "desc": "Determina con precisión si el problema pide hallar la parte porcentual, la tasa o el total (100%)."
      },
      {
        "number": 2,
        "title": "Seleccionar la Estrategia",
        "desc": "Aplica fracción canónica (cálculo mental), multiplicación decimal directa o proporción cruzada."
      },
      {
        "number": 3,
        "title": "Verificar y Descartar Distractores",
        "desc": "Comprueba la lógica de tu resultado y confirma por qué las demás alternativas son incorrectas."
      }
    ]
  },
  "closure": {
    "congratulations": "¡Felicitaciones! Has completado con total éxito las 6 clases de Porcentajes de 7° Básico, dominando todos los estándares curriculares del MINEDUC.",
    "nextClassPreview": "Estás plenamente preparado para rendir tu Examen Libre oficial con excelencia."
  },
  "paso8_cierre": {
    "preguntaSintesis": "¿Cómo le explicarías a otra persona la diferencia entre calcular el 20% de una cantidad y saber que una cantidad es el 20% del total?",
    "metacognicion": "¿Qué herramienta te dio mayor seguridad en esta unidad: la representación gráfica, el cálculo mental o la proporción directa?",
    "celebracion": "¡Felicitaciones! Has dominado el Objetivo de Aprendizaje OA 4 de 7° Básico en su totalidad con las 6 lecciones canónicas."
  }
};
