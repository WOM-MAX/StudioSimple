import { LessonData } from '../../../src/types/lesson';

export const MATEMATICA_7B_OA04_CLASE05: LessonData = {
  "metadata": {
    "grade": "7° Básico",
    "subject": "Matemática",
    "oaCode": "OA 4",
    "oaTitle": "Matemática - OA 4",
    "lessonNumber": 5,
    "totalLessonsInOa": 6,
    "lessonTitle": "Resolución de Problemas Cotidianos: Descuentos Comerciales e IVA",
    "durationMinutes": 30,
    "nextLessonTitle": "Clase 6: Síntesis Integradora y Ensayo de Evaluación Formativa"
  },
  "prep": {
    "adultObjective": "Guiar al estudiante en la aplicación de porcentajes a situaciones reales del comercio y la economía cotidiana, calculando rebajas comerciales mediante restas del precio original y recargos impositivos como el IVA chileno (19%) en operaciones afectas mediante adiciones al valor neto.",
    "routeToday": "Resolver problemas auténticos de compras y facturación, identificando cuándo un porcentaje representa un ahorro que se descuenta y cuándo representa un impuesto o recargo que se suma al valor base en operaciones afectas.",
    "mentorReminder": "Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Valida el procedimiento completo: cálculo del porcentaje y operación final (sumar o restar).",
    "reminders": [
      "En problemas de descuento se calcula la rebaja y se resta del precio original: Precio Final = Precio Original - Descuento.",
      "En problemas de IVA (19%) o recargo en operaciones afectas se calcula el impuesto y se suma al valor neto: Precio Bruto = Valor Neto + IVA.",
      "Lee en voz alta únicamente los textos con la etiqueta DILE o PREGÚNTALE.",
      "Asegúrate de que el estudiante distinga entre \"el monto del descuento\" y \"el precio final a pagar\"."
    ],
    "emotionalTip": "Aprender a calcular descuentos e impuestos entrega autonomía real y despierta gran motivación porque el estudiante comprueba el poder práctico de la matemática en el mundo real."
  },
  "route": {
    "blocks": [
      {
        "id": "b1",
        "number": "01",
        "title": "Comercio",
        "subtitle": "Descuentos e IVA",
        "color": "navy"
      },
      {
        "id": "b2",
        "number": "02",
        "title": "Descuento",
        "subtitle": "Rebaja sobre Precio Original",
        "color": "orange"
      },
      {
        "id": "b3",
        "number": "03",
        "title": "IVA 19%",
        "subtitle": "Impuesto al Valor Agregado",
        "color": "yellow"
      },
      {
        "id": "b4",
        "number": "04",
        "title": "Evaluación",
        "subtitle": "Miniquiz y Síntesis Final",
        "color": "teal"
      }
    ],
    "dileIntro": "Hoy avanzaremos en una nueva clase interactiva.",
    "dileObjective": "Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Valida el procedimiento completo: cálculo del porcentaje y operación final (sumar o restar)."
  },
  "situation": {
    "dilePrompt": "Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Valida el procedimiento completo: cálculo del porcentaje y operación final (sumar o restar).",
    "expectedAnswer": "Pagará $7.000, porque los $3.000 corresponden al descuento que se le resta al precio original.",
    "socraticHint": "Recuerda que un descuento es un beneficio económico: significa pagar menos que el valor de lista.",
    "emotionalTip": "Aprender a calcular descuentos e impuestos entrega autonomía real y despierta gran motivación porque el estudiante comprueba el poder práctico de la matemática en el mundo real.",
    "options": [
      {
        "label": "Pagará $7.000, porque los $3.000 corresponden al descuento que se le resta al precio original.",
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
    "dilePrompt": "¿Cuál es el descuento y cuál es el precio final?",
    "question": "¿Qué información entrega el punto de partida?",
    "expectedAnswer": "Pagará $7.000, porque los $3.000 corresponden al descuento que se le resta al precio original.",
    "socraticHint": "Localiza las palabras clave.",
    "feedbackSuccess": "¡Excelente fundamentación!",
    "feedbackSupport": "Recuerda que un descuento es un beneficio económico: significa pagar menos que el valor de lista."
  },
  "hook": {
    "title": "Motivación",
    "titulo": "Motivación",
    "focusPoints": [],
    "dileIntro": "Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Valida el procedimiento completo: cálculo del porcentaje y operación final (sumar o restar).",
    "hazInstruction": "Observa y reflexiona con las escenas del video.",
    "videoSrc": "",
    "dileAfterVideo": "¿Qué observaste en esta situación inicial?",
    "slides": [
      {
        "slideNumber": 1,
        "tituloMomento": "Motivación",
        "didacticPurpose": "Lámina 1 · Desafío Comercial: Las ofertas de la feria",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair holding a calculator and clipboard, and a boy in a teal jacket arranging items on a wooden school market stall. Bright banners in the background, warm natural daylight, clean vector aesthetic, ample negative space on the left. Clear lighting, vibrant colors. No text drawn by AI.",
        "overlayText": "DESCUENTOS E IVA EN LA VIDA REAL",
        "overlayTitle": "DESCUENTOS E IVA EN LA VIDA REAL",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "DESCUENTOS E IVA EN LA VIDA REAL",
        "speakerNotes": "Bienvenidos a la feria escolar. Hoy Sofía y Lucas tienen una misión de gran responsabilidad: calcular correctamente los cobros con descuentos promocionales y emitir boletas legales con el impuesto de IVA en las operaciones afectas.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 2,
        "tituloMomento": "Motivación",
        "didacticPurpose": "Lámina 2 · El Polerón en Liquidación",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Close up of the school market stall counter where a warm blue hoodie is displayed with a large yellow tag showing an original price. Lucas is pointing at a notebook while Sofía checks the calculation, clear focused expressions, clean modern flat colors, ample negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "¿CUÁNTO AHORRAMOS Y CUÁNTO PAGAMOS?",
        "overlayTitle": "¿CUÁNTO AHORRAMOS Y CUÁNTO PAGAMOS?",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "¿CUÁNTO AHORRAMOS Y CUÁNTO PAGAMOS?",
        "speakerNotes": "Un polerón institucional tiene un precio de lista de 30.000 pesos y un letrero anuncia 20% de descuento por liquidación de temporada. Un apoderado se acerca y pregunta cuál es el monto exacto a pagar.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 3,
        "tituloMomento": "Motivación",
        "didacticPurpose": "Lámina 3 · La Trampa del Descuento",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Split visualization on a desk surface: on one side a stack of coins representing the discount savings, on the other side a larger stack representing the final payment amount. Sofía explaining with gestures to Lucas, vibrant educational palette, clean lines, ample negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "DESCUENTO NO ES EL PRECIO FINAL",
        "overlayTitle": "DESCUENTO NO ES EL PRECIO FINAL",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "DESCUENTO NO ES EL PRECIO FINAL",
        "speakerNotes": "Muchos compradores cometen el error de pensar que el cálculo termina al encontrar el 20%. Pero el 20% es solo el ahorro. El precio final exige un paso adicional: restar esa rebaja del precio inicial.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 4,
        "tituloMomento": "Motivación",
        "didacticPurpose": "Lámina 4 · El Impuesto al Valor Agregado: IVA 19%",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Lucas examining an official Chilean shopping receipt or ticket under a magnifying glass, showing clear structured printed sections for net value, tax and total. Soft studio lighting, clean digital vector feel, ample negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "EL IMPUESTO AL CONSUMO: IVA 19%",
        "overlayTitle": "EL IMPUESTO AL CONSUMO: IVA 19%",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "EL IMPUESTO AL CONSUMO: IVA 19%",
        "speakerNotes": "Por otro lado, cuando compramos un bien o servicio en una operación afecta a IVA en Chile, la ley tributaria aplica un recargo del diecinueve por ciento sobre el valor neto. A diferencia del descuento, el IVA se suma al total.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 5,
        "tituloMomento": "Motivación",
        "didacticPurpose": "Lámina 5 · Aumento vs Disminución Porcentual",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Conceptual visual comparing two balance scales side by side: one scale showing a subtraction arrow pointing down labeled with a minus sign, the other showing an addition arrow pointing up. Sofía and Lucas collaborating peacefully, balanced modern layout, ample negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "DOS OPERACIONES OPUESTAS",
        "overlayTitle": "DOS OPERACIONES OPUESTAS",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "DOS OPERACIONES OPUESTAS",
        "speakerNotes": "Porcentajes en acción: en el descuento restamos porque el precio disminuye; en el impuesto sumamos porque el precio aumenta. La estructura matemática es idéntica, cambia únicamente la operación de cierre.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 6,
        "tituloMomento": "Motivación",
        "didacticPurpose": "Lámina 6 · El Desafío de la Caja Registradora",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Sofía and Lucas standing behind the stall cash register with a line of enthusiastic students and parents waiting to buy. They look confident and focused, ready to aplicar las matemáticas con exactitud y rapidez, clean lines, ample negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "EXACTITUD Y RESPONSABILIDAD",
        "overlayTitle": "EXACTITUD Y RESPONSABILIDAD",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "EXACTITUD Y RESPONSABILIDAD",
        "speakerNotes": "Para atender con rapidez y sin equivocarse, Lucas y Sofía necesitan un método estructurado de 3 pasos que funcione para cualquier precio, cualquier descuento y cualquier boleta con IVA.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 7,
        "tituloMomento": "Motivación",
        "didacticPurpose": "Lámina 7 · El Puente: La regla de los 3 pasos",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, An open student notebook on the foreground desk with three clearly numbered structured bullet steps highlighted in cyan, orange and navy. Lucas holding a pen smiling warmly beside Sofía, bright inviting atmosphere, ample negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "MÉTODO DE 3 PASOS EN ACCIÓN",
        "overlayTitle": "MÉTODO DE 3 PASOS EN ACCIÓN",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "MÉTODO DE 3 PASOS EN ACCIÓN",
        "speakerNotes": "Vamos a ver cómo formular este método en el cuaderno de matemática para resolver problemas de comercio sin margen de error.",
        "duracionSeg": 8
      }
    ]
  },
  "preQuestions": [
    {
      "context": "En el puesto de la feria escolar, un polerón de $30.000 tiene un 20% de descuento.",
      "question": "¿A cuánto dinero equivale el 20% de $30.000 y qué representa ese monto?",
      "expected": "Equivale a $6.000 y representa el ahorro o rebaja comercial.",
      "success": "¡Excelente! El 10% de $30.000 es $3.000, por lo que el 20% es $6.000 de rebaja.",
      "support": "Calcula el 20% de 30.000: (20 x 30.000) : 100 = 6.000 pesos.",
      "reveal": "20% de $30.000 = $6.000 de ahorro.",
      "studentReveal": "El 20% son $6.000 y representa el dinero que se descuenta."
    },
    {
      "context": "Para saber cuánto paga el cliente por el polerón de $30.000.",
      "question": "¿Qué operación se debe realizar entre el precio original y el descuento calculado?",
      "expected": "Se debe restar: $30.000 - $6.000 = $24.000.",
      "success": "¡Exacto! Al restar la rebaja del precio inicial se obtiene el precio final a pagar.",
      "support": "Descuento significa rebajar: resta los $6.000 del precio de lista de $30.000.",
      "reveal": "$30.000 - $6.000 = $24.000.",
      "studentReveal": "Restar: $30.000 menos $6.000 da $24.000."
    }
  ],
  "conversationContext": "Diálogo guiado para profundizar en los elementos clave.",
  "formalization": {
    "title": "En problemas comerciales, el 100% es el valor base. En descuentos se calcula el monto y se resta (P_final = P_orig - Desc). En operaciones afectas a IVA (19%) o recargos se calcula el monto y se suma (P_bruto = P_neto + IVA).",
    "concept": "En problemas comerciales, el 100% es el valor base. En descuentos se calcula el monto y se resta (P_final = P_orig - Desc). En operaciones afectas a IVA (19%) o recargos se calcula el monto y se suma (P_bruto = P_neto + IVA).",
    "summary": "En problemas comerciales, el 100% es el valor base. En descuentos se calcula el monto y se resta (P_final = P_orig - Desc). En operaciones afectas a IVA (19%) o recargos se calcula el monto y se suma (P_bruto = P_neto + IVA).",
    "ideaClave": "En problemas comerciales, el 100% es el valor base. En descuentos se calcula el monto y se resta (P_final = P_orig - Desc). En operaciones afectas a IVA (19%) o recargos se calcula el monto y se suma (P_bruto = P_neto + IVA).",
    "dileIntro": "Abre tu cuaderno de matemática en una página limpia. Vamos a registrar el método universal para calcular descuentos e impuestos con total precisión.",
    "hazInstruction": "Observa la explicación y copia en tu cuaderno el procedimiento paso a paso del polerón de $30.000 con 20% de descuento.",
    "graphicPoster": "",
    "videoSrc": "",
    "slides": [
      {
        "slideNumber": 8,
        "tituloMomento": "Explicación",
        "didacticPurpose": "Lámina 8 · Declaración del Objetivo: Descuentos Comerciales e IVA",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, in a clean modern classroom looking at a digital blackboard with price tags and receipts. Generous negative space on the left. High contrast, bright flat colors. Clear lighting, vibrant colors. No text drawn by AI.",
        "overlayText": "OBJETIVO DE LA LECCIÓN",
        "overlayTitle": "OBJETIVO DE LA LECCIÓN",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "OBJETIVO DE LA LECCIÓN",
        "speakerNotes": "Hoy resolveremos problemas cotidianos de descuentos comerciales e IVA del diecinueve por ciento en operaciones comerciales afectas.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 9,
        "tituloMomento": "Explicación",
        "didacticPurpose": "Lámina 9 · Paso 1: Identificar el 100% y el Porcentaje",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Analytical blackboard diagram breaking down a real purchase into its components: Base Price represents 100%, and the Rate represents the percentage to be calculated. Lucas highlighting the variables with chalk, clean modern aesthetic, ample negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "PASO 1: IDENTIFICAR EL TOTAL BASE",
        "overlayTitle": "PASO 1: IDENTIFICAR EL TOTAL BASE",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "PASO 1: IDENTIFICAR EL TOTAL BASE",
        "speakerNotes": "El primer paso consiste en identificar cuál es la cantidad que representa el 100%. En un descuento, el 100% es el precio de lista original. En una operación afecta a IVA, el 100% es el valor neto sobre el cual se calcula el impuesto.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 10,
        "tituloMomento": "Explicación",
        "didacticPurpose": "Lámina 10 · Paso 2: Calcular el Monto del Porcentaje",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Step by step numerical demonstration showing multiplication of a base quantity by a decimal percentage, with clear intermediate arrows pointing to the resulting monetary amount. Sofía writing notes diligently, ample negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "PASO 2: CALCULAR EL MONTO",
        "overlayTitle": "PASO 2: CALCULAR EL MONTO",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "PASO 2: CALCULAR EL MONTO",
        "speakerNotes": "El segundo paso es calcular el valor del porcentaje usando la estrategia más conveniente: ya sea multiplicando por el decimal correspondiente o aplicando la regla de proporcionalidad directa.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 11,
        "tituloMomento": "Explicación",
        "didacticPurpose": "Lámina 11 · Paso 3: Operar Según la Situación (Sumar o Restar)",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Split visual layout showing two clear operations: on the left a green discount tag with a subtraction symbol leading to Final Price, on the right an official seal with an addition symbol leading to Gross Price. High contrast, clean vector art, ample negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "PASO 3: SUMAR O RESTAR",
        "overlayTitle": "PASO 3: SUMAR O RESTAR",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "PASO 3: SUMAR O RESTAR",
        "speakerNotes": "El tercer paso es la operación final. Si el problema plantea un descuento o rebaja, restamos el monto al precio original. Si plantea una compraventa afecta a IVA del diecinueve por ciento o un recargo, sumamos el monto al valor base.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 12,
        "tituloMomento": "Explicación",
        "didacticPurpose": "Lámina 12 · Estrategia Abreviada: El Factor Directo",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Modern computational infographic showing two shortcuts: multiplying by 0.80 to directly obtain an 80% price after 20% off, and multiplying by 1.19 to directly obtain the price with 19% IVA included. Minimalist aesthetic, ample negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "ATAJO: FACTOR DIRECTO",
        "overlayTitle": "ATAJO: FACTOR DIRECTO",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "ATAJO: FACTOR DIRECTO",
        "speakerNotes": "Atajo experto: si te descuentan el veinte por ciento, pagas el ochenta por ciento del valor, multiplicando por cero coma ochenta. Y en compras afectas a IVA del diecinueve por ciento, el valor bruto final corresponde al ciento diecinueve por ciento, multiplicando el neto por uno coma diecinueve.",
        "duracionSeg": 8
      },
      {
        "slideNumber": 13,
        "tituloMomento": "Explicación",
        "didacticPurpose": "Lámina 13 · Modelamiento en Cuaderno: El Polerón de $30.000",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, Close up of a student notebook page on a wooden desk. Lucas and Sofía looking at the notebook with satisfaction, modern anime style, ample negative space on the left. Clear lighting, vibrant colors. No text drawn by AI.",
        "overlayText": "EJEMPLO MODELADO: CASO 1",
        "overlayTitle": "EJEMPLO MODELADO: CASO 1",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "EJEMPLO MODELADO: CASO 1",
        "speakerNotes": "Analicemos paso a paso el caso modelado: Un polerón escolar tiene un precio de lista de $30.000. Durante la liquidación de temporada se ofrece con un 20% de descuento. ¿Cuánto dinero se descuenta y cuál es el precio final que se debe pagar por el polerón? Descuento = 20% de 30.000 = (20 × 30.000) / 100 = $6.000. Precio final = 30.000 - 6.000 = $24.000. Por lo tanto, el resultado esperado es: Se descuentan $6.000 y el precio final es $24.000..",
        "duracionSeg": 8
      },
      {
        "slideNumber": 14,
        "tituloMomento": "Explicación",
        "didacticPurpose": "Lámina 14 · Regla de Oro: Lee con Atención qué se Pregunta",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, A large golden interactive study guide on a clean background highlighting a glowing key icon. Sofía and Lucas pointing forward enthusiastically toward the practice exercises on the platform screen, bright vibrant lighting, ample negative space on the left.. Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.",
        "overlayText": "REGLA DE ORO DE LA LECCIÓN",
        "overlayTitle": "REGLA DE ORO DE LA LECCIÓN",
        "overlaySubtitle": "",
        "vectorialOverlayPptx": "REGLA DE ORO DE LA LECCIÓN",
        "speakerNotes": "Regla de oro: Verifica siempre si piden la rebaja o el precio final. Ahora pon a prueba lo aprendido resolviendo los casos de práctica en la plataforma interactiva.",
        "duracionSeg": 8
      }
    ]
  },
  "postQuestions": [
    {
      "context": "Comprobación 1",
      "question": "¿Cuánto dinero se descuenta y cuál es el precio final que se debe pagar por el polerón?",
      "expected": "Se descuentan $6.000 y el precio final es $24.000.",
      "success": "Respuesta precisa y fundamentada",
      "support": "Revisa el concepto clave expuesto",
      "reveal": "Se descuentan $6.000 y el precio final es $24.000.",
      "studentReveal": "Se descuentan $6.000 y el precio final es $24.000."
    },
    {
      "context": "Comprobación 2",
      "question": "¿A cuánto dinero asciende el impuesto de IVA y cuál es el precio bruto total con IVA incluido?",
      "expected": "El IVA es de $1.900 y el precio final con IVA es $11.900.",
      "success": "Respuesta precisa y fundamentada",
      "support": "Revisa el concepto clave expuesto",
      "reveal": "El IVA es de $1.900 y el precio final con IVA es $11.900.",
      "studentReveal": "El IVA es de $1.900 y el precio final con IVA es $11.900."
    }
  ],
  "practice": [
    {
      "context": "Un polerón escolar tiene un precio de lista de $30.000. Durante la liquidación de temporada se ofrece con un 20% de descuento.",
      "question": "“¿Cuánto dinero se descuenta y cuál es el precio final que se debe pagar por el polerón?”",
      "expected": "Se descuentan $6.000 y el precio final es $24.000.",
      "success": "¡Excelente resolución! Calculaste el 20% de rebaja ($6.000) y lo restaste del precio original para obtener $24.000.",
      "support": "Paso 1: Calcula el 20% de $30.000 (el 10% es $3.000, así que el 20% es $6.000). Paso 2: Resta esa rebaja a los $30.000 originales.",
      "reveal": "Se descuentan $6.000 y el precio final es $24.000.",
      "studentReveal": "Se descuentan $6.000 y el precio final es $24.000."
    },
    {
      "context": "Una librería vende una enciclopedia escolar a un valor neto de $10.000, en una compraventa afecta a IVA. Al momento de emitir la boleta de venta en Chile, se debe agregar el 19% correspondiente al Impuesto al Valor Agregado.",
      "question": "“¿A cuánto dinero asciende el impuesto de IVA y cuál es el precio bruto total con IVA incluido?”",
      "expected": "El IVA es de $1.900 y el precio final con IVA es $11.900.",
      "success": "¡Muy bien! El 19% de $10.000 es $1.900 de impuesto, y al sumarlo al valor neto se obtiene un total bruto de $11.900.",
      "support": "Paso 1: Calcula el 19% de $10.000 multiplicando 10.000 por 0,19. Paso 2: Suma ese valor tributario a los $10.000 netos iniciales.",
      "reveal": "El IVA es de $1.900 y el precio final con IVA es $11.900.",
      "studentReveal": "El IVA es de $1.900 y el precio final con IVA es $11.900."
    },
    {
      "context": "Una bicicleta tiene un precio original de $80.000. Por aniversario de la tienda, se publica una oferta con un 15% de descuento sobre el precio de lista.",
      "question": "¿Cuánto dinero ahorra el comprador y cuál es el precio final que pagará por la bicicleta?",
      "expected": "Ahorra $12.000 y pagará $68.000.",
      "success": "Aplica el criterio de la clase de manera autónoma en un recurso nuevo",
      "support": "Calcula el 10% de $80.000 ($8.000) y el 5% ($4.000), sumando ambos obtienes el 15% ($12.000). Luego resta: $80.000 - $12.000.",
      "reveal": "Ahorra $12.000 y pagará $68.000.",
      "studentReveal": "Ahorra $12.000 y pagará $68.000."
    }
  ],
  "mini": [
    {
      "id": "q1",
      "q": "Un par de zapatillas tiene un precio de lista de $40.000. Si la tienda ofrece un 25% de descuento, ¿cuál es el precio final que se paga en la caja? - $10.000 - $30.000 **Correcta** - $35.000 - $50.000 **Corrección:** El 25% de $40.000 es la cuarta parte: $40.000 / 4 = $10.000 de rebaja. El precio final a pagar es $40.000 - $10.000 = $30.000 ($10.000 es el monto del descuento, no el precio final; $50.000 resultaría de sumar el descuento).",
      "options": [
        "A. $10.000",
        "B. $30.000",
        "C. $35.000",
        "D. $50.000"
      ],
      "correct": "B. $30.000",
      "fixExplain": "El 25% de $40.000 es la cuarta parte: $40.000 / 4 = $10.000 de rebaja. El precio final a pagar es $40.000 - $10.000 = $30.000 ($10.000 es el monto del descuento, no el precio final; $50.000 resultaría de sumar el descuento)."
    },
    {
      "id": "q2",
      "q": "Un taller mecánico emite una factura por un servicio afecto a IVA cuyo valor neto es de $50.000. Si a este valor se le aplica la tasa legal del 19%, ¿cuál es el monto correspondiente únicamente al impuesto de IVA? - $950 - $9.500 **Correcta** - $19.000 - $59.500 **Corrección:** El IVA es el 19% de $50.000: 50.000 × 0,19 = $9.500. La alternativa $59.500 corresponde al precio bruto total con IVA incluido, no solo al monto del impuesto solicitado; $19.000 duplica el cálculo y $950 tiene un error posicional de coma decimal.",
      "options": [
        "A. $950",
        "B. $9.500",
        "C. $19.000",
        "D. $59.500"
      ],
      "correct": "B. $9.500",
      "fixExplain": "El IVA es el 19% de $50.000: 50.000 × 0,19 = $9.500. La alternativa $59.500 corresponde al precio bruto total con IVA incluido, no solo al monto del impuesto solicitado; $19.000 duplica el cálculo y $950 tiene un error posicional de coma decimal."
    },
    {
      "id": "q3",
      "q": "Una tienda anuncia una rebaja general del 30% en todas sus mochilas. Si una mochila costaba originalmente $20.000, ¿qué porcentaje de su precio original terminará pagando el cliente?",
      "options": [
        "A. 30%",
        "B. 50%",
        "C. 70%",
        "D. 130%"
      ],
      "correct": "C. 70%",
      "fixExplain": "El precio original representa el 100%. Si se le descuenta el 30%, el cliente paga el porcentaje complementario: 100% - 30% = 70% del valor inicial (equivalente a 20.000 × 0,70 = $14.000)."
    }
  ],
  "recovery": [
    {
      "title": "Recuperación 1",
      "explain": "Para calcular el precio con descuento sigue siempre 2 pasos: primero calcula el dinero que te descuentan, y luego resta ese dinero del precio inicial que tenía el artículo.",
      "q": "Un juego de mesa cuesta $10.000 y tiene un 20% de descuento. ¿Cuánto dinero cuesta finalmente el juego?",
      "kind": "open_response",
      "options": [],
      "correct": "",
      "correctText": "¡Excelente! El 20% de $10.000 son $2.000 de rebaja. Al restar $10.000 - $2.000 obtienes exactamente $8.000.",
      "fixText": "Recuerda: $2.000 es lo que te ahorras. Para saber cuánto pagas debes restar: $10.000 - $2.000 = $8.000."
    }
  ],
  "summaryIdeas": [
    [
      "Idea clave",
      "**Descuento Comercial:** Monto que se reduce del precio original. Se calcula el porcentaje y se resta: Precio Final = Precio Original - Descuento."
    ],
    [
      "Idea clave",
      "**Impuesto al Valor Agregado (IVA):** Tributo chileno del 19% aplicado al valor neto en operaciones comerciales afectas (según el SII). Se calcula el 19% y se suma: Precio Bruto = Valor Neto + IVA."
    ],
    [
      "Idea clave",
      "**Lectura Rigurosa del Enunciado:** Es fundamental distinguir si una pregunta solicita el monto de la rebaja o recargo, o bien el valor total a cancelar."
    ]
  ],
  "interactive": {
    "type": "thermo",
    "title": "Representación Gráfica y Numérica",
    "description": "Modelamiento CPA y recta numérica."
  },
  "closure": {
    "congratulations": "“¡Felicitaciones! Has completado todas las lecciones del Objetivo de Aprendizaje OA 4 con excelencia.”",
    "nextClassPreview": "Próxima clase: Clase 6: Síntesis Integradora y Ensayo de Evaluación Formativa"
  },
  "paso8_cierre": {
    "preguntaSintesis": "“¿En qué se diferencian el procedimiento para aplicar un descuento del procedimiento para aplicar el IVA del 19%?”",
    "metacognicion": "“¿Qué estrategia de cálculo de porcentajes sentiste que te resultó más cómoda y rápida a lo largo de esta unidad?”",
    "celebracion": "“¡Felicitaciones! Has completado todas las lecciones del Objetivo de Aprendizaje OA 4 con excelencia.”"
  }
};
