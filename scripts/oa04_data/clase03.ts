import { LessonData } from '../../Web Studio Simple/src/types/lesson';

export const MATEMATICA_7B_OA04_CLASE03: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Matemática',
    oaCode: 'OA 4',
    oaTitle: 'Porcentajes',
    lessonNumber: 3,
    totalLessonsInOa: 6,
    lessonTitle: 'Cálculo Mental y Estrategias Rápidas de Porcentajes Notables',
    durationMinutes: 30,
    nextLessonTitle: 'Estrategias de Cálculo de Cualquier Porcentaje: Decimales y Proporciones'
  },
  prep: {
    adultObjective: 'Acompañar al estudiante a calcular mentalmente porcentajes de uso frecuente (50%, 25%, 20%, 10%) asociándolos a divisiones directas por 2, 4, 5 y 10, desarrollando agilidad y confianza en el cálculo numérico.',
    routeToday: 'Descubrir las cuatro divisiones maestras para resolver porcentajes notables mentalmente sin calculadora y sin lápiz.',
    mentorReminder: 'Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Da tiempo al estudiante para calcular en su mente antes de responder.',
    reminders: [
      'El cálculo mental fortalece el sentido numérico y la estimación en la vida diaria.',
      'Lee en voz alta únicamente los textos con la etiqueta DILE o PREGÚNTALE.',
      'Permite que el estudiante verbalice el paso intermedio: "para el 25% divido por 4".',
      'Valora la rapidez y la estrategia utilizada por sobre el cálculo mecánico en papel.'
    ],
    emotionalTip: 'Saber calcular descuentos mentalmente en una tienda hace que los estudiantes se sientan autónomos, inteligentes y capaces de tomar decisiones.'
  },
  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Números', subtitle: 'Atajos de Cálculo Mental', color: 'navy' },
      { id: 'b2', number: '02', title: 'Divisiones Clave', subtitle: ':2, :4, :5 y :10', color: 'orange' },
      { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Agilidad sin Calculadora', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz y Síntesis', color: 'teal' }
    ],
    keyQuestions: [
      { label: '50% como mitad (:2)', sub: 'Dividir exactamente entre 2' },
      { label: '25% como cuarta parte (:4)', sub: 'Dividir entre 4 o calcular la mitad de la mitad' },
      { label: '20% y 10% (:5 y :10)', sub: 'Dividir entre 5 o correr la coma decimal' }
    ],
    dileIntro: 'Hoy aprenderemos uno de los secretos más útiles de la matemática: cómo calcular porcentajes en tu cabeza en cuestión de segundos mediante atajos de división.',
    dileObjective: 'Dominar las cuatro divisiones directas para calcular mentalmente el 50%, 25%, 20% y 10% de cualquier cantidad.'
  },
  situation: {
    dilePrompt: 'En una librería escolar, un juego de lápices cuesta $8.000 y tiene un letrero que dice "50% de descuento". ¿Cuánto dinero te descuentan sin necesidad de usar papel ni lápiz?',
    expectedAnswer: '$4.000',
    socraticHint: 'Recuerda que el 50% es exactamente la mitad de una cantidad.',
    emotionalTip: 'Celebra su rapidez: identificar la mitad es la base de todo el cálculo mental con porcentajes.',
    options: [
      { label: 'Respondió $4.000', kind: 'correct', feedbackText: '¡Exacto! El 50% de $8.000 es la mitad, es decir, $4.000.' },
      { label: 'Intentó multiplicar en papel o dudó', kind: 'needs_support', feedbackText: 'Para el 50% solo necesitas dividir el valor entre 2: $8.000 : 2 = $4.000.' },
      { label: 'No supo responder', kind: 'no_answer', feedbackText: 'No te preocupes. Vamos a ver los 4 atajos maestros que hacen esto súper sencillo.' }
    ]
  },
  reference: {
    dilePrompt: 'Si para el 50% dividimos por 2, ¿por cuánto crees que debemos dividir para calcular el 25%?',
    question: '¿Por qué número se divide una cantidad para calcular su 25%?',
    expectedAnswer: 'Por 4.',
    socraticHint: '25% equivale a 1/4. Entonces corresponde a la cuarta parte.',
    feedbackSuccess: '¡Muy bien! Para calcular el 25% se divide directamente por 4 (o se saca la mitad dos veces).',
    feedbackSupport: 'Como 25% = 1/4, calcular el 25% de un número es exactamente igual a dividir ese número por 4.'
  },
  hook: {
    title: 'La Feria del Libro Escolar',
    titulo: 'La Feria del Libro Escolar',
    focusPoints: [
      'Observar los carteles de descuento en los puestos de la feria.',
      'Identificar por qué el 50% es dividir por 2 y el 25% es dividir por 4.',
      'Descubrir cómo calcular el 20% dividiendo por 5 y el 10% dividiendo por 10.'
    ],
    dileIntro: 'Acompañemos a Sofía y Lucas a la feria de libros de la escuela, donde deben calcular rápidamente los mejores descuentos antes de que se agoten las ofertas.',
    hazInstruction: 'Observa el video y descubre cómo Lucas calcula los descuentos en segundos usando divisiones mentales sin usar calculadora.',
    videoSrc: '/videos/mat_7b_oa04_c03_hook.mp4',
    videoUrl: '/videos/mat_7b_oa04_c03_hook.mp4',
    posterSrc: '/images/mat_7b_oa04_c03_hook_poster.jpg',
    dileAfterVideo: '¿Viste qué rápido calculó Lucas el 25% dividiendo por cuatro? Ahora formalizaremos los cuatro atajos maestros.',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: 'Desafío Inicial: Ofertas en la feria escolar',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. Two 13-year-old students, a girl with braided hair and a boy in a teal jacket, walking through a lively school book fair with colorful discount banners. High contrast, bright sunny afternoon, spacious negative space on the left. No text drawn by AI.',
        overlayText: 'CALCULAR MENTALMENTE',
        overlayTitle: 'CALCULAR MENTALMENTE',
        overlaySubtitle: 'El poder de los porcentajes notables',
        vectorialOverlayPptx: 'Banners limpios con descuentos destacados: 50%, 25%, 20% y 10%',
        speakerNotes: 'Sofía y Lucas visitaron la feria del libro en el patio de su escuela. Cada puesto tenía carteles con descuentos llamativos: cincuenta, veinticinco, veinte y diez por ciento.',
        duracionSeg: 8
      },
      {
        slideNumber: 2,
        tituloMomento: 'Observación: El atajo del 50%',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The 13-year-old girl pointing at an adventure novel marked at 8000 pesos with a 50 percent off sticker. Clean anime aesthetic, cheerful expression, negative space on top. No text drawn by AI.',
        overlayText: '50% ES DIVIDIR POR 2',
        overlayTitle: '50% ES DIVIDIR POR 2',
        overlaySubtitle: 'La mitad exacta del valor original',
        vectorialOverlayPptx: 'Operación mental destacada: $8.000 : 2 = $4.000',
        speakerNotes: 'Un libro de aventuras de ocho mil pesos tenía cincuenta por ciento de descuento. Sofía sonrió de inmediato: calcular el cincuenta por ciento es simplemente dividir entre dos.',
        duracionSeg: 8
      },
      {
        slideNumber: 3,
        tituloMomento: 'El reto del 25%: La cuarta parte',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The 13-year-old boy in a teal jacket thinking with fingers on his chin looking at a 25 percent banner. Thought bubble with clean division diagram, negative space. No text drawn by AI.',
        overlayText: '25% ES DIVIDIR POR 4',
        overlayTitle: '25% ES DIVIDIR POR 4',
        overlaySubtitle: 'Un cuarto del total o la mitad de la mitad',
        vectorialOverlayPptx: 'Diagrama de cuatro partes iguales: 100% / 4 = 25%',
        speakerNotes: 'En la mesa de cómics, el descuento era del veinticinco por ciento. Lucas recordó que veinticinco es la cuarta parte de cien, por lo que basta dividir el precio entre cuatro.',
        duracionSeg: 9
      },
      {
        slideNumber: 4,
        tituloMomento: 'Los atajos del 10% y del 20%',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. Both 13-year-old students examining a science encyclopedia marked at 10 percent off. Clear lighting, neat book stalls, negative space for calculations. No text drawn by AI.',
        overlayText: '10% ES DIVIDIR POR 10 | 20% ES DIVIDIR POR 5',
        overlayTitle: '10% ES DIVIDIR POR 10 | 20% ES DIVIDIR POR 5',
        overlaySubtitle: 'La décima parte y la quinta parte',
        vectorialOverlayPptx: 'Esquema de atajos rápidos: 10% -> :10 | 20% -> :5',
        speakerNotes: 'Para el diez por ciento, solo quitamos un cero o corremos la coma un lugar hacia la izquierda. Y para el veinte por ciento, dividimos directamente entre cinco.',
        duracionSeg: 9
      },
      {
        slideNumber: 5,
        tituloMomento: 'La estrategia combinada: Mitad de la mitad',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The 13-year-old girl showing the boy a mental trick with two quick hand gestures. Modern anime style, bright colors, generous negative space. No text drawn by AI.',
        overlayText: 'LA MITAD DE LA MITAD',
        overlayTitle: 'LA MITAD DE LA MITAD',
        overlaySubtitle: 'Un truco infalible para el 25%',
        vectorialOverlayPptx: 'Paso 1: Mitad de $80 -> $40. Paso 2: Mitad de $40 -> $20',
        speakerNotes: 'Sofía le enseñó otro truco fantástico a Lucas: si dividir entre cuatro te cuesta, saca la mitad una vez y luego vuelve a sacar la mitad del resultado.',
        duracionSeg: 9
      },
      {
        slideNumber: 6,
        tituloMomento: 'Desafío modelado: El 20% de 150',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. Both 13-year-old students calculating in their heads while looking at a sign indicating 150 pages with 20% already read. High contrast, clean vector overlays. No text drawn by AI.',
        overlayText: 'CALCULAR EL 20% DE 150',
        overlayTitle: 'CALCULAR EL 20% DE 150',
        overlaySubtitle: 'División directa por 5 en segundos',
        vectorialOverlayPptx: 'Cálculo limpio: 150 : 5 = 30 páginas',
        speakerNotes: 'Resolvamos este desafío: un libro tiene ciento cincuenta páginas y leíste el veinte por ciento. Como veinte por ciento es dividir entre cinco, ciento cincuenta entre cinco son treinta páginas.',
        duracionSeg: 9
      },
      {
        slideNumber: 7,
        tituloMomento: 'Síntesis del Gancho: Pase a la formalización',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. Both 13-year-old students standing proudly with their purchased books, ready to enter the classroom. Bright daylight, spacious negative space. No text drawn by AI.',
        overlayText: 'LAS 4 DIVISIONES MAESTRAS',
        overlayTitle: 'LAS 4 DIVISIONES MAESTRAS',
        overlaySubtitle: 'Guárdalas en tu memoria para siempre',
        vectorialOverlayPptx: 'Resumen visual de los 4 atajos: :2, :4, :5, :10',
        speakerNotes: 'Con estas cuatro divisiones maestras, podrás calcular los porcentajes más importantes de la vida diaria en segundos. Ahora formalicemos cada atajo en el cuaderno.',
        duracionSeg: 8
      }
    ]
  },
  preQuestions: [
    {
      context: 'En la feria del libro del video, los estudiantes calcularon el 25% dividiendo por 4.',
      question: '¿Por qué calcular el 25% de un número equivale a dividirlo por 4?',
      expected: 'Porque 25% equivale a la fracción 1/4 (la cuarta parte de 100).',
      success: '¡Exacto! 100 dividido entre 25 es 4, por lo que 25% es la cuarta parte de cualquier total.',
      support: 'Recuerda que 25/100 simplificado por 25 es exactamente 1/4.',
      reveal: '25% = 25/100 = 1/4. Tomar un cuarto de una cantidad es dividirla entre 4.',
      studentReveal: 'Porque 25% es la cuarta parte de 100.'
    },
    {
      context: 'Para calcular el 20% de una cantidad se utiliza la división entre 5.',
      question: '¿Cuánto es el 20% de 150?',
      expected: '30',
      success: '¡Excelente! 150 dividido entre 5 es exactamente 30.',
      support: 'Divide 150 entre 5: 15 decenas divididas en 5 grupos son 3 decenas, es decir, 30.',
      reveal: '150 : 5 = 30.',
      studentReveal: 'El 20% de 150 es 30.'
    }
  ],
  formalization: {
    title: 'Formalización de los Atajos de Cálculo Mental de Porcentajes',
    concept: 'Los porcentajes notables corresponden a fracciones unitarias simples: 50% = :2; 25% = :4; 20% = :5; 10% = :10.',
    dileIntro: 'Anotemos en el cuaderno de matemática el cuadro maestro de los cuatro atajos de cálculo mental.',
    hazInstruction: 'Copia en tu cuaderno la tabla con los 4 porcentajes notables y su división correspondiente.',
    videoSrc: '/videos/mat_7b_oa04_c03_expl.mp4',
    videoUrl: '/videos/mat_7b_oa04_c03_expl.mp4',
    graphicPoster: '/images/mat_7b_oa04_c03_expl_poster.jpg',
    slides: [
      {
        slideNumber: 1,
        tituloMomento: 'Declaración del Objetivo: Cálculo Mental de Porcentajes',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. Two 13-year-old students, a girl with braided hair and a boy in a teal jacket, in front of a modern smartboard displaying mental math icons. Clean classroom setting, ample negative space on the left. No text drawn by AI.',
        overlayText: 'OBJETIVO DE LA LECCIÓN',
        overlayTitle: 'OBJETIVO DE LA LECCIÓN',
        overlaySubtitle: 'Calcular mentalmente porcentajes notables mediante divisiones exactas',
        vectorialOverlayPptx: 'Título y estándar curricular del cálculo mental con porcentajes',
        speakerNotes: 'Hoy aprenderemos a calcular mentalmente porcentajes de uso frecuente asociándolos de forma inmediata con las divisiones por dos, cuatro, cinco y diez.',
        duracionSeg: 12
      },
      {
        slideNumber: 2,
        tituloMomento: 'Atajo 1: El 50% es la mitad (:2)',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The 13-year-old girl pointing to a circle divided in two halves. Bright contrast, clean lines, negative space on the right. No text drawn by AI.',
        overlayText: 'CALCULAR EL 50% -> DIVIDIR POR 2',
        overlayTitle: 'CALCULAR EL 50% -> DIVIDIR POR 2',
        overlaySubtitle: '50% = 1/2 del total | Mitad exacta',
        vectorialOverlayPptx: 'Regla: 50% de N = N : 2 (ej. 50% de 600 = 300)',
        speakerNotes: 'Cincuenta por ciento equivale a la fracción un medio. Para calcular el cincuenta por ciento de cualquier número, simplemente dividimos esa cantidad entre dos.',
        duracionSeg: 13
      },
      {
        slideNumber: 3,
        tituloMomento: 'Atajo 2: El 25% es la cuarta parte (:4)',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The 13-year-old boy demonstrating a square divided into four quarters. High clarity, negative space for formulas. No text drawn by AI.',
        overlayText: 'CALCULAR EL 25% -> DIVIDIR POR 4',
        overlayTitle: 'CALCULAR EL 25% -> DIVIDIR POR 4',
        overlaySubtitle: '25% = 1/4 del total | Cuarta parte (mitad de la mitad)',
        vectorialOverlayPptx: 'Regla: 25% de N = N : 4 (ej. 25% de 80 = 20)',
        speakerNotes: 'Veinticinco por ciento equivale a un cuarto. Para calcular el veinticinco por ciento, dividimos el número entre cuatro, o sacamos la mitad y volvemos a sacar la mitad.',
        duracionSeg: 13
      },
      {
        slideNumber: 4,
        tituloMomento: 'Atajo 3: El 20% es la quinta parte (:5)',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The two students reviewing a bar divided into five equal 20% segments. Clean graphics, negative space. No text drawn by AI.',
        overlayText: 'CALCULAR EL 20% -> DIVIDIR POR 5',
        overlayTitle: 'CALCULAR EL 20% -> DIVIDIR POR 5',
        overlaySubtitle: '20% = 1/5 del total | Quinta parte',
        vectorialOverlayPptx: 'Regla: 20% de N = N : 5 (ej. 20% de 100 = 20)',
        speakerNotes: 'Veinte por ciento equivale a la fracción un quinto. Para calcular el veinte por ciento de cualquier cantidad, dividimos ese valor directamente entre cinco.',
        duracionSeg: 13
      },
      {
        slideNumber: 5,
        tituloMomento: 'Atajo 4: El 10% es la décima parte (:10)',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. Close up of calculation steps showing a decimal point moving one spot to the left. Sharp focus, negative space. No text drawn by AI.',
        overlayText: 'CALCULAR EL 10% -> DIVIDIR POR 10',
        overlayTitle: 'CALCULAR EL 10% -> DIVIDIR POR 10',
        overlaySubtitle: '10% = 1/10 | Quitar un cero o desplazar la coma un lugar',
        vectorialOverlayPptx: 'Regla: 10% de N = N : 10 (ej. 10% de 340 = 34 | 10% de 85 = 8,5)',
        speakerNotes: 'Diez por ciento equivale a un décimo. Basta con dividir entre diez, lo que en números enteros con ceros significa simplemente eliminar el último cero.',
        duracionSeg: 13
      },
      {
        slideNumber: 6,
        tituloMomento: 'Caso Isomórfico: El 20% de 150',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. Both 13-year-old students solving the problem 20% of 150 on the tablet together. Clean and bright, spacious negative space on the right. No text drawn by AI.',
        overlayText: 'EJEMPLO MODELADO: 20% DE 150',
        overlayTitle: 'EJEMPLO MODELADO: 20% DE 150',
        overlaySubtitle: 'Aplicando el atajo de la división por 5',
        vectorialOverlayPptx: 'Resolución: 20% de 150 = 150 : 5 = 30',
        speakerNotes: 'Apliquemos el atajo al caso modelado: queremos calcular el veinte por ciento de ciento cincuenta. Como veinte por ciento es dividir entre cinco, calculamos ciento cincuenta entre cinco, que da exactamente treinta.',
        duracionSeg: 13
      },
      {
        slideNumber: 7,
        tituloMomento: 'Regla de Oro y Pase a la Práctica',
        visualPrompt: 'Modern anime style 16:9 widescreen illustration. The two 13-year-old student explorers smiling with thumbs up, ready to begin interactive practice. Bright anime aesthetic, negative space. No text drawn by AI.',
        overlayText: 'REGLA DE ORO DEL CÁLCULO MENTAL',
        overlayTitle: 'REGLA DE ORO DEL CÁLCULO MENTAL',
        overlaySubtitle: 'Asocia el porcentaje con su división: 50%(:2), 25%(:4), 20%(:5), 10%(:10)',
        vectorialOverlayPptx: 'Cuadro resumen final con los 4 atajos maestros. ¡A practicar!',
        speakerNotes: 'Regla de oro: cada vez que veas cincuenta, veinticinco, veinte o diez por ciento, sustitúyelo mentalmente por su división correspondiente. Ahora es momento de practicar en la pantalla.',
        duracionSeg: 13
      }
    ]
  },
  postQuestions: [
    {
      context: 'En el video explicativo calculamos mentalmente el 20% de 150.',
      question: '¿Qué división directa se realizó y cuál fue el resultado obtenido?',
      expected: 'Se dividió 150 entre 5, obteniendo 30.',
      success: '¡Excelente memoria y comprensión! 20% equivale a 1/5, por lo que 150 : 5 = 30.',
      support: 'Recuerda cuál de las cuatro divisiones maestras corresponde al 20%.',
      reveal: '150 dividido por 5 da exactamente 30.',
      studentReveal: 'Se dividió 150 : 5 = 30.'
    }
  ],
  practice: [
    {
      context: 'Se requiere calcular mentalmente el 20% de 150 utilizando la división directa por 5.',
      question: '¿Cuál es el 20% de 150?',
      expected: '30',
      success: '¡Correcto! 150 dividido entre 5 es 30.',
      support: 'Aplica el atajo del 20%: divide 150 entre 5.',
      reveal: '150 : 5 = 30.',
      studentReveal: 'El 20% de 150 es 30.'
    },
    {
      context: 'Un estudiante desea calcular mentalmente el 25% de 80 páginas de un folleto.',
      question: '¿Cuál es el 25% de 80?',
      expected: '20',
      success: '¡Muy bien! 80 dividido entre 4 es 20 (o la mitad de 80 es 40, y la mitad de 40 es 20).',
      support: 'Aplica el atajo del 25%: divide 80 entre 4, o saca la mitad dos veces.',
      reveal: '80 : 4 = 20.',
      studentReveal: 'El 25% de 80 es 20 páginas.'
    },
    {
      context: 'En una biblioteca hay 340 libros y se desea apartar el 10% para renovación de portadas.',
      question: '¿Cuántos libros corresponden al 10% de 340?',
      expected: '34',
      success: '¡Exacto! Para calcular el 10% de 340 dividimos entre 10, lo que da 34.',
      support: 'Aplica el atajo del 10%: elimina el cero final de 340 dividiendo entre 10.',
      reveal: '340 : 10 = 34.',
      studentReveal: 'Corresponden 34 libros.'
    }
  ],
  mini: [
    {
      id: 'q1',
      q: 'Un estudiante desea calcular mentalmente el 25% de 240 páginas de un libro. ¿Qué operación directa debe realizar y cuál es el resultado?',
      options: [
        'Multiplicar 240 por 4, obteniendo 960 páginas',
        'Dividir 240 por 2, obteniendo 120 páginas',
        'Dividir 240 por 4, obteniendo 60 páginas',
        'Restar 25 a 240, obteniendo 215 páginas'
      ],
      correct: 'Dividir 240 por 4, obteniendo 60 páginas',
      fixExplain: 'Como 25% = 1/4, se divide 240 : 4 = 60 páginas (o sacando la mitad de 240 que es 120, y la mitad de 120 que es 60). Las demás alternativas aplican operaciones incorrectas.'
    },
    {
      id: 'q2',
      q: '¿Cuál es el 10% de 450?',
      options: ['4,5', '45', '90', '450'],
      correct: '45',
      fixExplain: 'Para calcular el 10% se divide entre 10: 450 : 10 = 45 (se suprime un cero).'
    },
    {
      id: 'q3',
      q: 'Para calcular mentalmente el 50% de 1.800 metros en una pista de atletismo, ¿qué cálculo se realiza?',
      options: [
        '1.800 : 5 = 360 metros',
        '1.800 : 2 = 900 metros',
        '1.800 : 4 = 450 metros',
        '1.800 x 0,5 = 9.000 metros'
      ],
      correct: '1.800 : 2 = 900 metros',
      fixExplain: 'El 50% es la mitad exacta de cualquier cantidad, por lo que se divide entre 2: 1.800 : 2 = 900 metros.'
    }
  ],
  recovery: [
    {
      title: 'Refuerzo de Atajos de Cálculo Mental',
      explain: 'Recuerda las cuatro divisiones maestras: 50% divide entre 2; 25% divide entre 4; 20% divide entre 5; 10% divide entre 10.',
      q: '¿Cuál es el 20% de 50?',
      options: ['5', '10', '20', '25'],
      correct: '10',
      correctText: '¡Excelente! 50 dividido por 5 es 10.',
      fixText: 'Para el 20%, divide el número entre 5: 50 : 5 = 10.'
    }
  ],
  summaryIdeas: [
    ['Atajo del 50%', 'Dividir directamente entre 2 (la mitad).'],
    ['Atajo del 25%', 'Dividir directamente entre 4 (la mitad de la mitad).'],
    ['Atajos del 20% y 10%', 'Para el 20% se divide entre 5; para el 10% se divide entre 10.']
  ],
  strategy: {
    title: 'Estrategia de Selección del Atajo Mental',
    dileIntro: 'Cuando veas un porcentaje notable, identifica de inmediato su número divisor:',
    steps: [
      { number: 1, title: 'Identificar el porcentaje', desc: 'Observa si es 50%, 25%, 20% o 10%.' },
      { number: 2, title: 'Asignar el divisor', desc: 'Asocia: 50% -> :2 | 25% -> :4 | 20% -> :5 | 10% -> :10.' },
      { number: 3, title: 'Dividir mentalmente', desc: 'Ejecuta la división mental y enuncia el resultado con seguridad.' }
    ]
  },
  closure: {
    congratulations: '¡Increíble rapidez mental! Ahora puedes calcular porcentajes cotidianos en tu cabeza sin usar calculadora.',
    nextClassPreview: 'En la siguiente clase aprenderemos cómo calcular cualquier porcentaje, incluso aquellos que no tienen atajos directos, usando decimales y proporciones.'
  },
  paso8_cierre: {
    preguntaSintesis: '¿Por qué calcular el 25% es lo mismo que sacar la mitad dos veces?',
    metacognicion: '¿Cuál de los cuatro atajos te pareció el más fácil de recordar y aplicar?',
    celebracion: '¡Felicitaciones! Has dominado el cálculo mental con porcentajes notables.'
  }
};
