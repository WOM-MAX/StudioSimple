import { LessonData } from '../../../src/types/lesson';

export const MATEMATICA_7B_OA04_CLASE04: LessonData = {
  "metadata": {
    "grade": "7° Básico",
    "subject": "Matemática",
    "oaCode": "OA 4",
    "oaTitle": "Matemática - OA 4",
    "lessonNumber": 4,
    "totalLessonsInOa": 6,
    "lessonTitle": "Estrategias de Cálculo de Cualquier Porcentaje: Decimales y Proporciones",
    "durationMinutes": 30,
    "nextLessonTitle": "Resolución de Problemas Cotidianos: Descuentos Comerciales e IVA"
  },
  "prep": {
    "adultObjective": "Acompañar al estudiante a dominar los dos métodos universales para calcular cualquier porcentaje de una cantidad: la multiplicación por su expresión decimal y la regla de proporcionalidad directa, evaluando cuál resulta más conveniente según los números involucrados.",
    "routeToday": "Aprender los dos algoritmos universales para calcular porcentajes que no tienen atajos simples (como el 18% o el 35%), comprobando que ambos métodos entregan exactamente el mismo resultado.",
    "mentorReminder": "Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Fomenta el uso del cuaderno para escribir las operaciones con orden.",
    "reminders": [
      "Existen dos caminos universales: multiplicar por el decimal o aplicar la regla de proporcionalidad.",
      "Lee en voz alta únicamente los textos con la etiqueta DILE o PREGÚNTALE.",
      "Recuérdale al estudiante que en la regla de proporcionalidad se puede simplificar antes de multiplicar para facilitar los cálculos.",
      "Valora la precisión en la multiplicación con números decimales."
    ],
    "emotionalTip": "Tener dos métodos diferentes para llegar a la misma respuesta da una gran sensación de seguridad y permite verificar los resultados de manera autónoma."
  },
  "route": {
    "blocks": [
      {
        "id": "b1",
        "number": "01",
        "title": "Números",
        "subtitle": "Métodos Universales",
        "color": "navy"
      },
      {
        "id": "b2",
        "number": "02",
        "title": "Método 1: Decimal",
        "subtitle": "Multiplicación Directa",
        "color": "orange"
      },
      {
        "id": "b3",
        "number": "03",
        "title": "Método 2: Proporción",
        "subtitle": "Regla de Tres Simple",
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
    "dileIntro": "Hoy avanzaremos en una nueva clase interactiva.",
    "dileObjective": "Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Fomenta el uso del cuaderno para escribir las operaciones con orden."
  },
  "situation": {
    "dilePrompt": "Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Fomenta el uso del cuaderno para escribir las operaciones con orden.",
    "expectedAnswer": "Multiplicando 500 por 0,18 o multiplicando 18 por 500 y dividiendo entre 100.",
    "socraticHint": "Recuerda que 18% es igual a 0,18 y también a 18/100.",
    "emotionalTip": "Tener dos métodos diferentes para llegar a la misma respuesta da una gran sensación de seguridad y permite verificar los resultados de manera autónoma.",
    "options": [
      {
        "label": "Multiplicando 500 por 0,18 o multiplicando 18 por 500 y dividiendo entre 100.",
        "kind": "correct",
        "feedbackText": "¡Muy bien observado!"
      },
      {
        "label": "Requiere apoyo adicional",
        "kind": "needs_support",
        "feedbackText": "Revisa nuevamente la situación inicial."
      },
      {
        "label": "No sabe qué responder",
        "kind": "no_answer",
        "feedbackText": "Leamos juntos para descubrir la pista."
      }
    ]
  },
  "reference": {
    "dilePrompt": "¿Cuántos litros corresponden al 18% de 500 litros?",
    "question": "¿Qué información entrega el punto de partida?",
    "expectedAnswer": "Multiplicando 500 por 0,18 o multiplicando 18 por 500 y dividiendo entre 100.",
    "socraticHint": "Localiza las palabras clave.",
    "feedbackSuccess": "¡Excelente fundamentación!",
    "feedbackSupport": "Recuerda que 18% es igual a 0,18 y también a 18/100."
  },
  "hook": {
    "title": "Motivación",
    "titulo": "Motivación",
    "focusPoints": [],
    "dileIntro": "Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Fomenta el uso del cuaderno para escribir las operaciones con orden.",
    "hazInstruction": "Observa y reflexiona con las escenas del video.",
    "videoSrc": "",
    "dileAfterVideo": "¿Qué observaste en esta situación inicial?",
    "slides": [
      {
        "slideNumber": 1,
        "tituloMomento": "Motivación",
        "didacticPurpose": "Lámina 1 · Desafío Inicial: El agua del huerto escolar",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing next to a large transparent rainwater tank with 500 liters marked on it in a green school garden. High contrast, sunny day, spacious negative space on the left. Clear lighting, vibrant colors. No text drawn by AI.",
        "overlayText": "CALCULAR CUALQUIER PORCENTAJE",
        "overlayTitle": "CALCULAR CUALQUIER PORCENTAJE",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "CALCULAR CUALQUIER PORCENTAJE",
        "speakerNotes": "En el huerto escolar, Sofía y Lucas debían separar el dieciocho por ciento de un estanque de quinientos litros de agua de lluvia para regar las hierbas aromáticas.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 2,
        "tituloMomento": "Motivación",
        "didacticPurpose": "Lámina 2 · Observación: Sin atajo mental directo",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, The 13-year-old boy looking at his notebook noting that 18% does not divide by 2, 4, 5, or 10 directly. Thoughtful expression, garden background, negative space on top.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "¿Y SI NO HAY UN ATAJO DIRECTO?",
        "overlayTitle": "¿Y SI NO HAY UN ATAJO DIRECTO?",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "¿Y SI NO HAY UN ATAJO DIRECTO?",
        "speakerNotes": "Lucas observó que dieciocho no es un porcentaje notable directo. Para resolverlo se necesitan métodos matemáticos universales que funcionen con cualquier número.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 3,
        "tituloMomento": "Motivación",
        "didacticPurpose": "Lámina 3 · Método 1 de Lucas: La multiplicación decimal",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, The 13-year-old boy in a teal jacket calculating on a digital tablet showing 500 multiplied by 0.18. Clear digital tablet glow, modern anime aesthetic, negative space.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "MÉTODO 1: MULTIPLICAR POR DECIMAL",
        "overlayTitle": "MÉTODO 1: MULTIPLICAR POR DECIMAL",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "MÉTODO 1: MULTIPLICAR POR DECIMAL",
        "speakerNotes": "Lucas propuso el primer método: transformar dieciocho por ciento en cero coma dieciocho y multiplicarlo directamente por quinientos. El resultado fue noventa.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 4,
        "tituloMomento": "Motivación",
        "didacticPurpose": "Lámina 4 · Método 2 de Sofía: La regla de proporción",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, The 13-year-old girl with braided hair writing on a notepad showing a clean rule of three proportion. Bright daylight, garden greenery, negative space on the right.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "MÉTODO 2: REGLA DE PROPORCIÓN",
        "overlayTitle": "MÉTODO 2: REGLA DE PROPORCIÓN",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "MÉTODO 2: REGLA DE PROPORCIÓN",
        "speakerNotes": "Sofía prefirió usar una proporción: dieciocho partes de cada cien multiplicado por quinientos. Al multiplicar dieciocho por quinientos y dividir por cien, también obtuvo noventa.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 5,
        "tituloMomento": "Motivación",
        "didacticPurpose": "Lámina 5 · Comparación: Dos caminos, un mismo destino",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, comparing their notebooks with big smiles of satisfaction. Two different calculations arriving at 90.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "¡AMBOS CAMINOS SON CORRECTOS!",
        "overlayTitle": "¡AMBOS CAMINOS SON CORRECTOS!",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "¡AMBOS CAMINOS SON CORRECTOS!",
        "speakerNotes": "Ambos caminos llegaron con exactitud a noventa litros. Esto demuestra que en matemática puedes elegir el método que te resulte más cómodo y rápido según los números.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 6,
        "tituloMomento": "Motivación",
        "didacticPurpose": "Lámina 6 · Desafío modelado: El 35% de 40 estudiantes",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, looking at a school roster showing 40 students with 35% in basketball team. Clean vector overlays, high contrast.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "APLICANDO AL 35% DE 40",
        "overlayTitle": "APLICANDO AL 35% DE 40",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "APLICANDO AL 35% DE 40",
        "speakerNotes": "Practiquemos otro caso: en un curso de cuarenta estudiantes, el treinta y cinco por ciento practica básquetbol. Cuarenta por cero coma treinta y cinco nos da exactamente catorce estudiantes.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 7,
        "tituloMomento": "Motivación",
        "didacticPurpose": "Lámina 7 · Síntesis del Gancho: Pase a la formalización",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing together with confidence, welcoming the viewer to the classroom board. Bright vibrant colors, generous negative space.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "LOS DOS ALGORITMOS MAESTROS",
        "overlayTitle": "LOS DOS ALGORITMOS MAESTROS",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "LOS DOS ALGORITMOS MAESTROS",
        "speakerNotes": "Ahora que conoces los dos algoritmos universales, estás listo para calcular cualquier porcentaje sin importar su valor. Formalicemos las fórmulas en el cuaderno.",
        "duracionSeg": 8
      }
    ]
  },
  "preQuestions": [
    {
      "context": "En el video del huerto escolar, Lucas y Sofía calcularon el 18% de 500 litros de agua.",
      "question": "¿Qué resultado obtuvieron y por qué ambos métodos dieron exactamente la misma cifra?",
      "expected": "Obtuvieron 90 litros, porque multiplicar por 0,18 es matemáticamente idéntico a multiplicar por 18 y dividir por 100.",
      "success": "¡Excelente! Multiplicar por el decimal y aplicar la proporción son dos expresiones del mismo cálculo numérico.",
      "support": "Recuerda: 0,18 es igual a 18/100. Multiplicar por 0,18 es multiplicar por 18 y dividir por 100.",
      "reveal": "El resultado es 90 litros. 500 x 0,18 = 90 y (18 x 500) : 100 = 90.",
      "studentReveal": "Obtuvieron 90 litros con ambos métodos."
    },
    {
      "context": "Para calcular el 35% de 40 estudiantes.",
      "question": "¿Qué operación decimal directa permite resolver el cálculo?",
      "expected": "40 x 0,35 = 14 estudiantes.",
      "success": "¡Exacto! 40 multiplicado por 0,35 da 14 estudiantes.",
      "support": "Transforma 35% a decimal (0,35) y multiplícalo por el total de 40 estudiantes.",
      "reveal": "40 x 0,35 = 14.",
      "studentReveal": "40 x 0,35 = 14 estudiantes."
    }
  ],
  "conversationContext": "Diálogo guiado para profundizar en los elementos clave.",
  "formalization": {
    "title": "Para calcular el a% de una cantidad T se puede: 1) Multiplicar T por la expresión decimal (a : 100), o 2) Aplicar la fórmula proporcional (a x T) : 100.",
    "concept": "Para calcular el a% de una cantidad T se puede: 1) Multiplicar T por la expresión decimal (a : 100), o 2) Aplicar la fórmula proporcional (a x T) : 100.",
    "summary": "Para calcular el a% de una cantidad T se puede: 1) Multiplicar T por la expresión decimal (a : 100), o 2) Aplicar la fórmula proporcional (a x T) : 100.",
    "ideaClave": "Para calcular el a% de una cantidad T se puede: 1) Multiplicar T por la expresión decimal (a : 100), o 2) Aplicar la fórmula proporcional (a x T) : 100.",
    "dileIntro": "Anotemos en el cuaderno de matemática las dos fórmulas maestras para calcular cualquier porcentaje.",
    "hazInstruction": "Escribe en tu cuaderno ambos métodos con el ejemplo resuelto paso a paso.",
    "graphicPoster": "",
    "videoSrc": "",
    "slides": [
      {
        "slideNumber": 8,
        "tituloMomento": "Explicación",
        "didacticPurpose": "Lámina 8 · Declaración del Objetivo: Métodos Universales de Cálculo",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, looking at a math display showing calculation formulas. Clean modern classroom, ample negative space on the left. Clear lighting, vibrant colors. No text drawn by AI.",
        "overlayText": "OBJETIVO DE LA LECCIÓN",
        "overlayTitle": "OBJETIVO DE LA LECCIÓN",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "OBJETIVO DE LA LECCIÓN",
        "speakerNotes": "Hoy aprenderemos a calcular cualquier porcentaje utilizando la multiplicación por decimal y la proporción directa.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 9,
        "tituloMomento": "Explicación",
        "didacticPurpose": "Lámina 9 · Método 1: Multiplicación por Número Decimal",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, The 13-year-old boy in a teal jacket pointing to the conversion from percent to decimal on a whiteboard. Clean lines, negative space on the right.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "MÉTODO 1: MULTIPLICAR POR DECIMAL",
        "overlayTitle": "MÉTODO 1: MULTIPLICAR POR DECIMAL",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "MÉTODO 1: MULTIPLICAR POR DECIMAL",
        "speakerNotes": "En el primer método convertimos el porcentaje a número decimal dividiéndolo por cien y luego multiplicamos ese decimal por el valor total.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 10,
        "tituloMomento": "Explicación",
        "didacticPurpose": "Lámina 10 · Ejemplo del Método 1: Decimales con Cero",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Close-up of notebook calculations showing 8% = 0.08 and 250 x 0.08 = 20. Clear mathematical notation, negative space.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "CUIDADO CON LOS PORCENTAJES MENORES A 10%",
        "overlayTitle": "CUIDADO CON LOS PORCENTAJES MENORES A 10%",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "CUIDADO CON LOS PORCENTAJES MENORES A 10%",
        "speakerNotes": "Atención especial con los porcentajes de un solo dígito: ocho por ciento es cero coma cero ocho. Si multiplicas por cero coma ocho estarías calculando el ochenta por ciento.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 11,
        "tituloMomento": "Explicación",
        "didacticPurpose": "Lámina 11 · Método 2: Regla de Proporcionalidad Directa",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, The 13-year-old girl setting up a 2x2 proportion table on a blackboard. Clear handwriting, negative space.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "MÉTODO 2: REGLA DE PROPORCIONALIDAD",
        "overlayTitle": "MÉTODO 2: REGLA DE PROPORCIONALIDAD",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "MÉTODO 2: REGLA DE PROPORCIONALIDAD",
        "speakerNotes": "En el segundo método planteamos una proporción directa: el porcentaje es a cien como la parte desconocida es al total. Despejando, multiplicamos el porcentaje por el total y dividimos por cien.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 12,
        "tituloMomento": "Explicación",
        "didacticPurpose": "Lámina 12 · Consejo Práctico: Simplificar antes de multiplicar",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, working together with pencil and notebook at a study table. High clarity, modern anime aesthetic, ample negative space on the left. Clear lighting, vibrant colors. No text drawn by AI.",
        "overlayText": "SIMPLIFICAR CEROS PRIMERO",
        "overlayTitle": "SIMPLIFICAR CEROS PRIMERO",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "SIMPLIFICAR CEROS PRIMERO",
        "speakerNotes": "Un consejo de oro para el método proporcional: cuando el total termina en ceros, cancela los ceros con el cien primero. Quinientos entre cien es cinco, y dieciocho por cinco es noventa.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 13,
        "tituloMomento": "Explicación",
        "didacticPurpose": "Lámina 13 · Caso Isomórfico: El 18% de 500",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, studying and solving the case together on an interactive tablet display. Spacious negative space on the left, clear lighting. No text drawn by AI.",
        "overlayText": "EJEMPLO MODELADO: CASO 1",
        "overlayTitle": "EJEMPLO MODELADO: CASO 1",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "EJEMPLO MODELADO: CASO 1",
        "speakerNotes": "Analicemos paso a paso el caso modelado: Se requiere calcular el 18% de 500 utilizando cualquiera de los dos métodos aprendidos. ¿Cuál es el 18% de 500? 500 x 0,18 = 90. Por lo tanto, el resultado esperado es: 90.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 14,
        "tituloMomento": "Explicación",
        "didacticPurpose": "Lámina 14 · Regla de Oro y Pase a la Práctica",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, The two 13-year-old student explorers smiling, pointing forward ready for exercises. Modern anime style, bright colors, negative space.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "REGLA DE ORO DE LA LECCIÓN",
        "overlayTitle": "REGLA DE ORO DE LA LECCIÓN",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "REGLA DE ORO DE LA LECCIÓN",
        "speakerNotes": "Regla de oro: Elige tu camino favorito: decimal o proporción. Ahora pon a prueba lo aprendido resolviendo los casos de práctica en la plataforma interactiva.",
        "duracionSeg": 8
      }
    ]
  },
  "postQuestions": [
    {
      "context": "Comprobación 1",
      "question": "¿Cuál es el 18% de 500?",
      "expected": "90",
      "success": "Respuesta precisa y fundamentada",
      "support": "Revisa el concepto clave expuesto",
      "reveal": "90",
      "studentReveal": "90"
    },
    {
      "context": "Comprobación 2",
      "question": "¿Cuántos estudiantes practican básquetbol?",
      "expected": "14",
      "success": "Respuesta precisa y fundamentada",
      "support": "Revisa el concepto clave expuesto",
      "reveal": "14",
      "studentReveal": "14"
    }
  ],
  "practice": [
    {
      "context": "Se requiere calcular el 18% de 500 utilizando cualquiera de los dos métodos aprendidos.",
      "question": "“¿Cuál es el 18% de 500?”",
      "expected": "90",
      "success": "¡Correcto! 500 x 0,18 = 90 (o (18 x 500) : 100 = 90).",
      "support": "Multiplica 500 por 0,18 o calcula 18 x 5.",
      "reveal": "90",
      "studentReveal": "90"
    },
    {
      "context": "En un curso de 40 estudiantes, el 35% practica básquetbol en las tardes.",
      "question": "“¿Cuántos estudiantes practican básquetbol?”",
      "expected": "14",
      "success": "¡Muy bien! 40 x 0,35 = 14 estudiantes (o (35 x 40) : 100 = 1.400 : 100 = 14).",
      "support": "Multiplica 40 por 0,35 o usa la proporción (35 x 40) : 100.",
      "reveal": "14",
      "studentReveal": "14"
    },
    {
      "context": "Una cuota mensual de $25.000 tiene un recargo por servicio del 12%.",
      "question": "¿A cuánto dinero asciende el recargo del 12%?",
      "expected": "$3.000",
      "success": "Aplica el criterio de la clase de manera autónoma en un recurso nuevo",
      "support": "Multiplica 25.000 por 0,12 o simplifica 25.000 : 100 = 250 y multiplica 12 x 250.",
      "reveal": "$3.000",
      "studentReveal": "$3.000"
    }
  ],
  "mini": [
    {
      "id": "q1",
      "q": "En un colegio con 600 estudiantes en total, el 15% asiste al taller de robótica. ¿Cuántos estudiantes asisten al taller?",
      "options": [
        "A. 60 estudiantes",
        "B. 90 estudiantes",
        "C. 120 estudiantes",
        "D. 150 estudiantes"
      ],
      "correct": "B. 90 estudiantes",
      "fixExplain": "Calculando por decimal: 600 x 0,15 = 90 estudiantes (o por proporción: 15 x 6 = 90 estudiantes)."
    },
    {
      "id": "q2",
      "q": "Para calcular el 32% de 250 mediante multiplicación decimal, ¿qué operación exacta se realiza?",
      "options": [
        "A. 250 x 3,2",
        "B. 250 x 0,32",
        "C. 250 x 32",
        "D. 250 : 0,32"
      ],
      "correct": "B. 250 x 0,32",
      "fixExplain": "El 32% en forma decimal es 32 : 100 = 0,32. Por lo tanto, la operación correcta es 250 x 0,32."
    },
    {
      "id": "q3",
      "q": "¿Cuál es el 45% de 80?",
      "options": [
        "A. 36",
        "B. 40",
        "C. 45",
        "D. 50"
      ],
      "correct": "A. 36",
      "fixExplain": "80 x 0,45 = 36 (o (45 x 80) : 100 = 3.600 : 100 = 36)."
    }
  ],
  "recovery": [
    {
      "title": "Recuperación 1",
      "explain": "Para calcular cualquier porcentaje, convierte el porcentaje a decimal y multiplícalo por el número total.",
      "q": "¿Cuánto es el 12% de 200?",
      "kind": "open_response",
      "options": [],
      "correct": "",
      "correctText": "¡Excelente! 200 x 0,12 = 24 (o 12 x 2 = 24).",
      "fixText": "Recuerda: 200 x 0,12 = 24."
    }
  ],
  "summaryIdeas": [
    [
      "Idea clave",
      "**Método Decimal:** Multiplicar el total por el decimal equivalente: Total · (p ÷ 100)."
    ],
    [
      "Idea clave",
      "**Método Proporcional:** Multiplicar el porcentaje por el total y dividir por 100: (p x Total) : 100."
    ],
    [
      "Idea clave",
      "**Equivalencia Algorítmica:** Ambos métodos producen exactamente el mismo resultado matemático."
    ]
  ],
  "interactive": {
    "type": "thermo",
    "title": "Representación Gráfica y Numérica",
    "description": "Modelamiento CPA y recta numérica."
  },
  "closure": {
    "congratulations": "“¡Felicitaciones! Has dominado los algoritmos generales de cálculo de porcentajes.”",
    "nextClassPreview": "Próxima clase: Resolución de Problemas Cotidianos: Descuentos Comerciales e IVA"
  },
  "paso8_cierre": {
    "preguntaSintesis": "“¿Por qué multiplicar por 0,18 es lo mismo que multiplicar por 18 y dividir por 100?”",
    "metacognicion": "“¿Qué método te pareció más rápido: cancelar ceros en la proporción o multiplicar por decimal?”",
    "celebracion": "“¡Felicitaciones! Has dominado los algoritmos generales de cálculo de porcentajes.”"
  }
};
