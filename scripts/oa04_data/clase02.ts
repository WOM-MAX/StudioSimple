import { LessonData } from '../../Web Studio Simple/src/types/lesson';

export const MATEMATICA_7B_OA04_CLASE02: LessonData = {
  "metadata": {
    "grade": "7° Básico",
    "subject": "Matemática",
    "oaCode": "OA 4",
    "oaTitle": "Porcentajes",
    "lessonNumber": 2,
    "totalLessonsInOa": 6,
    "lessonTitle": "Porcentajes como Fracción Irreductible y Número Decimal",
    "durationMinutes": 30,
    "nextLessonTitle": "Cálculo Mental y Estrategias Rápidas de Porcentajes Notables"
  },
  "prep": {
    "adultObjective": "Acompañar al estudiante a establecer equivalencias entre un porcentaje, su fracción irreductible y su expresión decimal correspondiente, transitando con soltura entre los tres registros de representación.",
    "routeToday": "Convertir porcentajes a fracciones de denominador 100, simplificarlas al máximo y transformar la razón en un número decimal dividiendo por 100.",
    "mentorReminder": "Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Fomenta el uso del cuaderno para simplificar paso a paso.",
    "reminders": [
      "Un mismo valor matemático puede expresarse como porcentaje, fracción o decimal.",
      "Lee en voz alta únicamente los textos con la etiqueta DILE o PREGÚNTALE.",
      "Recuérdale al estudiante que simplificar una fracción significa dividir numerador y denominador por el mismo número.",
      "Valora el procedimiento de simplificación en el cuaderno físico."
    ],
    "emotionalTip": "Ver que el 50% es exactamente lo mismo que un medio (1/2) o 0,5 genera una sensación de orden y control mental muy gratificante en los estudiantes."
  },
  "route": {
    "blocks": [
      {
        "id": "b1",
        "number": "01",
        "title": "Números",
        "subtitle": "La Triple Equivalencia",
        "color": "navy"
      },
      {
        "id": "b2",
        "number": "02",
        "title": "Fracción",
        "subtitle": "Simplificación Irreductible",
        "color": "orange"
      },
      {
        "id": "b3",
        "number": "03",
        "title": "Decimal",
        "subtitle": "División por 100",
        "color": "yellow"
      },
      {
        "id": "b4",
        "number": "04",
        "title": "Evaluación",
        "subtitle": "Miniquiz y Síntesis",
        "color": "teal"
      }
    ],
    "keyQuestions": [
      {
        "label": "Porcentaje a fracción",
        "sub": "Denominador 100 y simplificación"
      },
      {
        "label": "Porcentaje a decimal",
        "sub": "Desplazamiento de dos lugares a la izquierda"
      },
      {
        "label": "Fracción irreductible",
        "sub": "Máxima simplificación por el MCD"
      }
    ],
    "dileIntro": "En la clase anterior descubrimos que el porcentaje es una razón respecto a 100. Hoy aprenderemos a traducirlo a sus dos formas hermanas: las fracciones y los números decimales.",
    "dileObjective": "Aprender a transformar cualquier porcentaje en una fracción irreductible y en un número decimal, reconociendo que representan exactamente la misma cantidad."
  },
  "situation": {
    "dilePrompt": "En una receta de cocina, se indica que debemos agregar el 50% de una taza de leche. Si tuviéramos que medir esa cantidad usando fracciones, ¿qué fracción de taza de leche debemos agregar?",
    "expectedAnswer": "Media taza (1/2 taza).",
    "socraticHint": "Piensa en qué parte de 100 es 50: es exactamente la mitad.",
    "emotionalTip": "Conectar la cocina con las matemáticas ayuda a consolidar el sentido práctico de las fracciones y porcentajes.",
    "options": [
      {
        "label": "Respondió 1/2 taza o la mitad",
        "kind": "correct",
        "feedbackText": "¡Perfecto! 50% equivale a 50/100, que simplificado es exactamente 1/2."
      },
      {
        "label": "Respondió 50/100 taza",
        "kind": "needs_support",
        "feedbackText": "Es correcto en valor, pero esa fracción se puede simplificar dividiendo por 50 para obtener 1/2."
      },
      {
        "label": "No supo responder",
        "kind": "no_answer",
        "feedbackText": "No te preocupes. Vamos a ver cómo simplificar fracciones paso a paso."
      }
    ]
  },
  "reference": {
    "dilePrompt": "Si tenemos el 25%, podemos escribirlo como 25/100. Si dividimos el numerador y el denominador por 25, ¿cuál es la fracción irreductible resultante?",
    "question": "¿Cuál es la fracción irreductible equivalente a 25%?",
    "expectedAnswer": "1/4",
    "socraticHint": "25 dividido en 25 es 1, y 100 dividido en 25 es 4.",
    "feedbackSuccess": "¡Excelente! 25% equivale exactamente a la fracción 1/4 y al número decimal 0,25.",
    "feedbackSupport": "Divide 25 : 25 = 1 en el numerador, y 100 : 25 = 4 en el denominador. La fracción es 1/4."
  },
  "hook": {
    "title": "La Receta del Pan Integral",
    "titulo": "La Receta del Pan Integral",
    "focusPoints": [
      "Observar la balanza y tazas medidoras en la cocina escolar.",
      "Identificar la equivalencia entre 25%, 1/4 y 0,25.",
      "Comprender cómo mover la coma decimal al dividir por 100."
    ],
    "dileIntro": "Acompañemos a Sofía y Lucas en el taller de gastronomía escolar, donde deben preparar una receta que mezcla porcentajes con medidas en tazas y balanzas decimales.",
    "hazInstruction": "Observa el video y fíjate en cómo los dos estudiantes logran medir la cantidad exacta traduciendo el porcentaje a fracción y a decimal.",
    "videoSrc": "/videos/mat_7b_oa04_c02_hook.mp4",
    "videoUrl": "/videos/mat_7b_oa04_c02_hook.mp4",
    "posterSrc": "/images/mat_7b_oa04_c02_hook_poster.jpg",
    "dileAfterVideo": "¿Viste qué fácil es entender el porcentaje cuando lo vemos como una taza dividida en partes iguales? Ahora veamos el método formal.",
    "slides": [
      {
        "slideNumber": 1,
        "tituloMomento": "Desafío Inicial: La receta en porcentajes",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, in a bright home economics kitchen classroom looking at a recipe chalkboard. Clean kitchen counters, glass measuring cups, bright daylight, generous negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "TRES CARAS DE UN MISMO NÚMERO",
        "overlayTitle": "TRES CARAS DE UN MISMO NÚMERO",
        "overlaySubtitle": "Porcentaje, fracción y número decimal",
        "vectorialOverlayPptx": "Diagrama triangular conectando: Porcentaje, Fracción y Decimal",
        "speakerNotes": "En el taller de cocina, la receta indicaba agregar el veinticinco por ciento de un litro de agua. Sofía y Lucas tenían una taza medidora graduada en fracciones y una balanza digital.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 2,
        "tituloMomento": "Observación: La taza medidora",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, The 13-year-old girl holding a clear measuring cup showing liquid at the one-fourth mark, while the boy checks a digital scale. Modern anime style, bright flat saturated colors, negative space on top.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "¿CÓMO MEDIR UN 25%?",
        "overlayTitle": "¿CÓMO MEDIR UN 25%?",
        "overlaySubtitle": "De la expresión porcentual a la medida real",
        "vectorialOverlayPptx": "Taza medidora dividida en cuatro cuartos con 1/4 resaltado",
        "speakerNotes": "Para medir el veinticinco por ciento, Lucas recordó que veinticinco partes de cien equivalen a una de cuatro partes iguales, es decir, un cuarto de taza.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 3,
        "tituloMomento": "Pregunta clave: La balanza decimal",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, The 13-year-old boy in a teal jacket pointing to the digital scale display showing decimal numbers. Inquisitive expression, clean scientific aesthetic, negative space.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "¿Y EN NÚMEROS DECIMALES?",
        "overlayTitle": "¿Y EN NÚMEROS DECIMALES?",
        "overlaySubtitle": "¿Qué número muestra la pantalla electrónica?",
        "vectorialOverlayPptx": "Pantalla digital mostrando la conversión: 25 / 100 = 0,25",
        "speakerNotes": "Al colocar el agua en la balanza digital, la pantalla no mostró fracciones ni porcentajes, sino un número decimal. ¿Cuál fue el valor exacto que marcó la balanza?",
        "duracionSeg": 9
      },
      {
        "slideNumber": 4,
        "tituloMomento": "Visualización: La división por 100",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, calculating on a digital whiteboard, showing the decimal point shifting two places to the left. Sharp focus, clean graphics, negative space on the right.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "DIVIDIR ENTRE CIEN",
        "overlayTitle": "DIVIDIR ENTRE CIEN",
        "overlaySubtitle": "La coma se desplaza dos lugares a la izquierda",
        "vectorialOverlayPptx": "Visualización animada del desplazamiento decimal: 25,0 -> 0,25",
        "speakerNotes": "Como el porcentaje significa dividir entre cien, el número decimal se obtiene corriendo la coma dos lugares hacia la izquierda. Veinticinco dividido por cien es cero coma veinticinco.",
        "duracionSeg": 9
      },
      {
        "slideNumber": 5,
        "tituloMomento": "Equivalencia confirmada: 25% = 1/4 = 0,25",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, smiling in agreement as the ingredients measure perfectly. Bright kitchen atmosphere, high contrast, clean vector overlays.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "LA TRIPLE IDENTIDAD",
        "overlayTitle": "LA TRIPLE IDENTIDAD",
        "overlaySubtitle": "Exactamente la misma cantidad matemática",
        "vectorialOverlayPptx": "Fórmula central destacada: 25% = 25/100 = 1/4 = 0,25",
        "speakerNotes": "Veinticinco por ciento, un cuarto y cero coma veinticinco son tres formas diferentes de nombrar exactamente la misma cantidad de agua.",
        "duracionSeg": 9
      },
      {
        "slideNumber": 6,
        "tituloMomento": "Desafío modelado: ¿Qué pasa con el 20%?",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, The 13-year-old girl writing a new problem in her notebook: 20%. The boy watches attentively. Clean lines, negative space for calculations.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "CONVIRTIENDO EL 20%",
        "overlayTitle": "CONVIRTIENDO EL 20%",
        "overlaySubtitle": "Simplificación y decimal correspondiente",
        "vectorialOverlayPptx": "Ecuación matemática en construcción: 20% = 20/100 = ?/5 = 0,?",
        "speakerNotes": "Lucas planteó un nuevo desafío: ¿cómo expresaríamos el veinte por ciento como fracción irreducible y como decimal? Vamos a resolverlo juntos.",
        "duracionSeg": 9
      },
      {
        "slideNumber": 7,
        "tituloMomento": "Síntesis del Gancho: Pase a la formalización",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, waving cheerfully in front of a neat blackboard filled with fraction and percent relations. Bright welcoming mood, spacious negative space.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "DOMINANDO LAS CONVERSIONES",
        "overlayTitle": "DOMINANDO LAS CONVERSIONES",
        "overlaySubtitle": "El método formal paso a paso",
        "vectorialOverlayPptx": "Iconos conectando la flecha bidireccional entre %, Fracción y Decimal",
        "speakerNotes": "Aprender a cambiar de porcentaje a fracción y a decimal te dará una ventaja enorme para resolver problemas rápidamente. Entremos a formalizar el método.",
        "duracionSeg": 8
      }
    ]
  },
  "preQuestions": [
    {
      "context": "En la receta del video, los estudiantes comprobaron que 25% equivale a 25/100.",
      "question": "Si dividimos el numerador y el denominador por 25, ¿qué fracción obtenemos?",
      "expected": "1/4",
      "success": "¡Excelente! 25 dividido por 25 es 1, y 100 dividido por 25 es 4. La fracción es 1/4.",
      "support": "Divide 25 entre 25 para el numerador y 100 entre 25 para el denominador.",
      "reveal": "25/100 dividido por 25 arriba y abajo da 1/4.",
      "studentReveal": "Obtenemos 1/4."
    },
    {
      "context": "Al dividir 25 entre 100 para escribirlo como número decimal.",
      "question": "¿Qué número decimal representa el 25%?",
      "expected": "0,25",
      "success": "¡Exacto! La coma decimal se corre dos lugares hacia la izquierda, resultando 0,25.",
      "support": "Divide 25 por 100: el resultado tiene dos cifras decimales.",
      "reveal": "25 : 100 = 0,25.",
      "studentReveal": "Representa 0,25."
    }
  ],
  "formalization": {
    "title": "Procedimiento de Conversión entre Porcentajes, Fracciones y Decimales",
    "concept": "Para convertir un porcentaje a fracción se escribe con denominador 100 y se simplifica. Para convertirlo a decimal se divide entre 100.",
    "dileIntro": "Revisemos ahora la regla formal en el cuaderno para convertir cualquier porcentaje sin errores.",
    "hazInstruction": "Abre tu cuaderno de matemática y escribe la tabla de conversiones paso a paso.",
    "videoSrc": "/videos/mat_7b_oa04_c02_expl.mp4",
    "videoUrl": "/videos/mat_7b_oa04_c02_expl.mp4",
    "graphicPoster": "/images/mat_7b_oa04_c02_expl_poster.jpg",
    "slides": [
      {
        "slideNumber": 1,
        "tituloMomento": "Declaración del Objetivo: Conversión de Registros",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, , a girl with braided hair and a boy in a teal jacket, standing beside a digital display in a bright classroom. Spacious negative space on left. Clean vector style.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "OBJETIVO DE LA LECCIÓN",
        "overlayTitle": "OBJETIVO DE LA LECCIÓN",
        "overlaySubtitle": "Equivalencia triple: porcentaje, fracción simplificada y número decimal",
        "vectorialOverlayPptx": "Título de la lección y Objetivo de Aprendizaje oficial",
        "speakerNotes": "Hoy aprenderemos la equivalencia triple entre porcentaje, fracción simplificada y número decimal, utilizando simplificaciones rigurosas.",
        "duracionSeg": 12
      },
      {
        "slideNumber": 2,
        "tituloMomento": "Paso 1: De Porcentaje a Fracción",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, The 13-year-old girl writing a fraction on a chalkboard. Clean neat numbers, bright daytime light, negative space on the right.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "ESCRIBIR SOBRE 100",
        "overlayTitle": "ESCRIBIR SOBRE 100",
        "overlaySubtitle": "El porcentaje se convierte en el numerador y 100 en el denominador",
        "vectorialOverlayPptx": "Fórmula: p% = p / 100",
        "speakerNotes": "El primer paso consiste en escribir el número del porcentaje en el numerador y colocar siempre el número cien en el denominador.",
        "duracionSeg": 13
      },
      {
        "slideNumber": 3,
        "tituloMomento": "Paso 2: Simplificación Irreductible",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, The 13-year-old boy demonstrating step-by-step division by common factors on a notebook. High contrast, clear diagrams, negative space.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "SIMPLIFICAR AL MÁXIMO",
        "overlayTitle": "SIMPLIFICAR AL MÁXIMO",
        "overlaySubtitle": "Dividir numerador y denominador por el máximo común divisor",
        "vectorialOverlayPptx": "Ejemplo paso a paso: 50/100 -> dividir por 50 -> 1/2",
        "speakerNotes": "El segundo paso es simplificar la fracción dividiendo el numerador y el denominador por su máximo común divisor hasta obtener una fracción irreducible.",
        "duracionSeg": 13
      },
      {
        "slideNumber": 4,
        "tituloMomento": "Paso 3: De Porcentaje a Número Decimal",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, pointing at a number line with decimal steps. Bright clean graphics, negative space for decimal notation.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "DIVISIÓN DECIMAL POR 100",
        "overlayTitle": "DIVISIÓN DECIMAL POR 100",
        "overlaySubtitle": "Mover la coma dos posiciones hacia la izquierda",
        "vectorialOverlayPptx": "Regla: p% = p ÷ 100 (ej. 75% = 75 ÷ 100 = 0,75; 8% = 8 ÷ 100 = 0,08)",
        "speakerNotes": "Para obtener el número decimal, aplicamos la regla universal: p por ciento es p dividido en cien, desplazando la coma dos lugares hacia la izquierda.",
        "duracionSeg": 13
      },
      {
        "slideNumber": 5,
        "tituloMomento": "Tabla Canónica de Equivalencias",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, A tidy comparative chart floating in the classroom with clean columns for %, Fracción y Decimal. Ample negative space.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "EQUIVALENCIAS FUNDAMENTALES",
        "overlayTitle": "EQUIVALENCIAS FUNDAMENTALES",
        "overlaySubtitle": "Valores de uso frecuente que debes memorizar",
        "vectorialOverlayPptx": "Tabla: 50% = 1/2 = 0,5 | 25% = 1/4 = 0,25 | 75% = 3/4 = 0,75 | 10% = 1/10 = 0,1",
        "speakerNotes": "Hay equivalencias que usarás toda tu vida: cincuenta por ciento es un medio y cero coma cinco; veinticinco por ciento es un cuarto y cero coma veinticinco.",
        "duracionSeg": 13
      },
      {
        "slideNumber": 6,
        "tituloMomento": "Caso Isomórfico: Conversión del 20%",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, solving the 20% case together on an interactive tablet. Clear, high contrast, negative space on the right.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "EJEMPLO MODELADO: CASO 1",
        "overlayTitle": "EJEMPLO MODELADO: CASO 1",
        "overlaySubtitle": "Queremos transformar el 20% en su expresión fraccionaria irreductible y en su nú",
        "vectorialOverlayPptx": "Resolución canónica: 20% = 20/100 = 1/5 = 0,2.",
        "speakerNotes": "Analicemos paso a paso el caso modelado: Queremos transformar el 20% en su expresión fraccionaria irreductible y en su número decimal correspondiente. ¿Cuál es la fracción irreductible y el número decimal equivalente al 20%? 20% = 20/100 = 1/5 = 0,2. Por lo tanto, el resultado esperado es: Fracción: 1/5 y Decimal: 0,2.",
        "duracionSeg": 13
      },
      {
        "slideNumber": 7,
        "tituloMomento": "Regla de Oro y Pase a la Práctica",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, The 13-year-old girl and boy smiling confidently, holding their pencils ready for practice. Bright classroom, negative space.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "REGLA DE ORO DE LA LECCIÓN",
        "overlayTitle": "REGLA DE ORO DE LA LECCIÓN",
        "overlaySubtitle": "Todo porcentaje tiene su gemelo fraccionario y decimal",
        "vectorialOverlayPptx": "Regla de oro: p% = p ÷ 100. ¡Ahora ponlo en práctica!",
        "speakerNotes": "Regla de oro: Todo porcentaje tiene su gemelo fraccionario y decimal. Ahora pon a prueba lo aprendido resolviendo los casos de práctica en la plataforma interactiva.",
        "duracionSeg": 13
      }
    ]
  },
  "postQuestions": [
    {
      "context": "Queremos transformar el 20% en su expresión fraccionaria irreductible y en su número decimal correspondiente.",
      "question": "¿Cuál es la fracción irreductible y el número decimal equivalente al 20%?",
      "expected": "Fracción: 1/5 y Decimal: 0,2",
      "success": "¡Excelente! 20/100 simplificado por 20 es 1/5, y 20 : 100 es 0,2.",
      "support": "Escribe 20/100 y divide ambos términos por 20. Luego divide 20 por 100 para el decimal.",
      "reveal": "20% = 20/100 = 1/5 = 0,2.",
      "studentReveal": "Fracción: 1/5 | Decimal: 0,2."
    },
    {
      "context": "Un estudiante desea expresar el 75% como fracción irreductible y como decimal.",
      "question": "¿Cuáles son los valores correspondientes al 75%?",
      "expected": "Fracción: 3/4 y Decimal: 0,75",
      "success": "¡Muy bien! 75/100 simplificado por 25 es 3/4, y 75 : 100 es 0,75.",
      "support": "Divide 75 y 100 por 25 para la fracción. Para el decimal, corre la coma dos lugares a la izquierda.",
      "reveal": "75% = 75/100 = 3/4 = 0,75.",
      "studentReveal": "Fracción: 3/4 | Decimal: 0,75."
    }
  ],
  "practice": [
    {
      "context": "Queremos transformar el 20% en su expresión fraccionaria irreductible y en su número decimal correspondiente.",
      "question": "¿Cuál es la fracción irreductible y el número decimal equivalente al 20%?",
      "expected": "Fracción: 1/5 y Decimal: 0,2",
      "success": "¡Excelente! 20/100 simplificado por 20 es 1/5, y 20 : 100 es 0,2.",
      "support": "Escribe 20/100 y divide ambos términos por 20. Luego divide 20 por 100 para el decimal.",
      "reveal": "20% = 20/100 = 1/5 = 0,2.",
      "studentReveal": "Fracción: 1/5 | Decimal: 0,2."
    },
    {
      "context": "Un estudiante desea expresar el 75% como fracción irreductible y como decimal.",
      "question": "¿Cuáles son los valores correspondientes al 75%?",
      "expected": "Fracción: 3/4 y Decimal: 0,75",
      "success": "¡Muy bien! 75/100 simplificado por 25 es 3/4, y 75 : 100 es 0,75.",
      "support": "Divide 75 y 100 por 25 para la fracción. Para el decimal, corre la coma dos lugares a la izquierda.",
      "reveal": "75% = 75/100 = 3/4 = 0,75.",
      "studentReveal": "Fracción: 3/4 | Decimal: 0,75."
    },
    {
      "context": "Se tiene el número decimal 0,4 y se requiere transformarlo a porcentaje y fracción irreductible.",
      "question": "¿A qué porcentaje y a qué fracción irreductible equivale el decimal 0,4?",
      "expected": "Porcentaje: 40% y Fracción: 2/5",
      "success": "¡Perfecto! 0,4 equivale al 40% y a 40/100, que simplificado por 20 es 2/5.",
      "support": "Multiplica 0,4 por 100 para obtener el porcentaje. Luego simplifica 40/100.",
      "reveal": "0,4 x 100 = 40%. La fracción es 40/100 = 2/5.",
      "studentReveal": "Porcentaje: 40% | Fracción: 2/5."
    }
  ],
  "mini": [
    {
      "id": "q1",
      "q": "¿Cuál es la fracción irreductible equivalente al 60%?",
      "options": [
        "6/10",
        "3/5",
        "12/20",
        "60/100"
      ],
      "correct": "3/5",
      "fixExplain": "60% = 60/100. Al dividir numerador y denominador por su máximo común divisor (20), obtenemos 3/5. Las opciones 6/10 y 12/20 son equivalentes pero no son irreductibles."
    },
    {
      "id": "q2",
      "q": "¿Cuál es el número decimal equivalente a 8%?",
      "options": [
        "0,8",
        "0,08",
        "0,008",
        "8,0"
      ],
      "correct": "0,08",
      "fixExplain": "Para convertir un porcentaje a decimal se divide entre 100: 8 : 100 = 0,08 (la coma se corre dos lugares; no confundir con 0,8 que representa 80%)."
    },
    {
      "id": "q3",
      "q": "Si una fracción irreducible es 1/4, ¿qué porcentaje representa?",
      "options": [
        "20%",
        "25%",
        "40%",
        "50%"
      ],
      "correct": "25%",
      "fixExplain": "1/4 amplificado por 25 da 25/100, lo que corresponde al 25% (o dividiendo 1 : 4 = 0,25 = 25%)."
    }
  ],
  "recovery": [
    {
      "title": "Refuerzo de Conversión de Porcentajes",
      "explain": "Para pasar de porcentaje a fracción, escribe el número sobre 100 y simplifica. Para decimal, divide entre 100 corriendo la coma dos lugares.",
      "q": "¿Cuál es la forma decimal del 15%?",
      "options": [
        "1,5",
        "0,15",
        "0,015",
        "15,0"
      ],
      "correct": "0,15",
      "correctText": "¡Correcto! 15 dividido entre 100 es 0,15.",
      "fixText": "Recuerda: 15 : 100 = 0,15. La coma avanza dos posiciones a la izquierda."
    }
  ],
  "summaryIdeas": [
    [
      "Porcentaje a Fracción",
      "Se escribe sobre 100 y se simplifica dividiendo por factores comunes hasta hacerla irreducible."
    ],
    [
      "Porcentaje a Decimal",
      "Se divide por 100, desplazando la coma decimal exactamente dos posiciones a la izquierda."
    ],
    [
      "Equivalencia",
      "El porcentaje, la fracción y el decimal representan la misma parte del entero."
    ]
  ],
  "strategy": {
    "title": "Estrategia para Convertir Porcentajes en 2 Pasos",
    "dileIntro": "Aplica estos pasos sistemáticos para no dudar jamás al convertir:",
    "steps": [
      {
        "number": 1,
        "title": "Formar la razón sobre 100",
        "desc": "Elimina el símbolo % y escribe la cantidad como numerador con denominador 100."
      },
      {
        "number": 2,
        "title": "Simplificar o dividir",
        "desc": "Para fracción: simplifica por 2, 5, 10, 20 o 25. Para decimal: corre la coma dos lugares a la izquierda."
      }
    ]
  },
  "closure": {
    "congratulations": "¡Excelente avance! Ya eres capaz de traducir porcentajes a fracciones y decimales con total soltura.",
    "nextClassPreview": "En la siguiente clase aprenderemos atajos matemáticos para calcular porcentajes mentalmente en segundos."
  },
  "paso8_cierre": {
    "preguntaSintesis": "¿Cómo explicarías con tus palabras por qué 50% es lo mismo que 0,5 y 1/2?",
    "metacognicion": "¿Qué método te resulta más cómodo para convertir: simplificar la fracción o calcular el decimal?",
    "celebracion": "¡Felicitaciones! Has dominado las conversiones fundamentales de los porcentajes."
  }
};
