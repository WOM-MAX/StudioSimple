import { LessonData } from '../../types/lesson';

export const INGLES_7B_OA09_CLASE01: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Idioma Extranjero Inglés',
    oaCode: 'OA 9',
    oaTitle: 'Comprensión lectora de textos narrativos breves en inglés',
    lessonNumber: 1,
    totalLessonsInOa: 6,
    lessonTitle: 'Setting and Characters in Short Stories',
    durationMinutes: 30,
    nextLessonTitle: 'Rising Action and Conflict with "Then" and "Suddenly"'
  },

  prep: {
    adultObjective: 'Guiar al estudiante en inglés a identificar los personajes (characters), el lugar y tiempo (setting) y el conector inicial (First / In the beginning) en oraciones narrativas breves.',
    routeToday: 'Narrative Story Arc: Paso 1 (Beginning / Introduction) y conectores de tiempo en inglés.',
    mentorReminder: 'Tus instrucciones como apoderado están en español. El estudiante leerá las oraciones y escribirá en inglés en su cuaderno.',
    reminders: [
      'Tú guías en español con los recuadros DILE y PREGÚNTALE.',
      'El estudiante lee y pronuncia las frases en inglés en voz alta.',
      'No te preocupes si su pronunciación no es perfecta; lo esencial es que comprenda el significado.',
      'Pídele que observe el gráfico interactivo de la montaña narrativa (Story Arc) en la pantalla.',
      'Ten a mano su cuaderno de inglés para anotar las oraciones con conectores.'
    ],
    emotionalTip: 'Crea un ambiente de confianza en inglés: "No tengas miedo a equivocarte al pronunciar. En inglés cada intento suma vocabulario y seguridad".'
  },

  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'English Session', subtitle: 'Setting and Characters', color: 'teal' },
      { id: 'b2', number: '02', title: 'Story Arc', subtitle: '5 Narrative Steps & Connectors', color: 'orange' },
      { id: 'b3', number: '03', title: 'Notebook Practice', subtitle: 'Writing sentences with "First"', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Evaluation', subtitle: 'Miniquiz formativo y síntesis', color: 'navy' }
    ],
    keyQuestions: [
      { label: '¿Qué es el "Setting"?', sub: 'El lugar (where) y momento (when) donde ocurre la historia.' },
      { label: '¿Qué conector usamos al inicio?', sub: 'Usamos "First" o "In the beginning" (Primero / Al comienzo).' }
    ],
    dileIntro: 'Hoy comenzaremos la primera clase de Inglés para 7° Básico: "Setting and Characters in Short Stories".',
    dileObjective: 'Aprenderemos a reconocer quiénes son los personajes, dónde se ambienta la historia y qué conector en inglés se utiliza para abrir el relato.'
  },

  situation: {
    dilePrompt: 'Hoy en nuestra sesión de English exploramos "Setting and Characters in Short Stories". En la pantalla del estudiante se muestra el organizador de la montaña narrativa. Observa el Paso 1: "Beginning (Introduction)" y lee en voz alta la oración de ejemplo: "First, Leo and his sister lived in a quiet town near the mountains." ¿Quiénes son los personajes de la historia y en qué lugar (setting) viven?',
    expectedAnswer: 'El estudiante debe responder (en español o inglés) que los personajes son Leo y su hermana ("Leo and his sister") y el lugar es un pueblo tranquilo cerca de las montañas ("a quiet town near the mountains"), comenzando con el conector "First" (primero).',
    socraticHint: 'Fíjate en las palabras en inglés: "Leo and his sister" indica quiénes son, y "quiet town near the mountains" describe el pueblo y las montañas. La primera palabra "First" significa "Primero".',
    emotionalTip: 'Felicita su lectura en voz alta. Si duda con alguna palabra, léesela tú con calma para que la repita.',
    options: [
      {
        label: 'Identificó a Leo y su hermana y el pueblo cerca de las montañas usando First',
        kind: 'correct',
        feedbackText: '¡Exacto! "Characters" son Leo y su hermana, y "Setting" es el pueblo tranquilo en las montañas, introducido por "First".'
      },
      {
        label: 'Mencionó solo a Leo o solo las montañas, sin relacionar los personajes con el lugar',
        kind: 'needs_support',
        feedbackText: 'Fíjate bien en la oración completa: "Leo and his sister" son ambos personajes, y "a quiet town near the mountains" es el lugar.'
      },
      {
        label: 'No comprende la frase en inglés o dio otra respuesta',
        kind: 'no_answer',
        feedbackText: 'Pista guiada: Traduzcamos juntos: "First" (Primero), "Leo and his sister" (Leo y su hermana), "lived in a quiet town" (vivían en un pueblo tranquilo).'
      }
    ]
  },

  reference: {
    dilePrompt: 'En la pantalla interactiva se muestran las 5 etapas: Step 1 Beginning (First), Step 2 Rising (Then), Step 3 Climax (At that moment), Step 4 Falling (After that) y Step 5 Resolution (Finally).',
    question: 'Why do we use connectors like "First", "Then", and "Finally" when telling a story in English? (¿Por qué usamos conectores como First, Then o Finally al contar una historia en inglés?)',
    expectedAnswer: 'Porque ordenan la secuencia de los acontecimientos en el tiempo para que el lector entienda qué pasó al principio, qué pasó después y cómo terminó el relato.',
    socraticHint: 'Piensa en qué pasaría si cuentas los hechos desordenados sin palabras que indiquen el orden del tiempo: ¿se entendería la historia?',
    feedbackSuccess: '¡Excelente comprensión! Los time connectors le dan claridad y fluidez cronológica a la narración.',
    feedbackSupport: 'Los conectores de tiempo sirven para guiar al lector paso a paso en el orden de los hechos.'
  },

  hook: {
    title: 'The Narrative Mountain: Story Arc & Time Connectors',
    dileIntro: 'En los relatos en inglés, toda narración sigue una montaña de tensión dramática estructurada con conectores de tiempo clave.',
    hazInstruction: 'Haz clic en cada uno de los 5 pasos de la montaña narrativa en la pantalla y escucha o lee los ejemplos en inglés.',
    videoSrc: '',
    focusPoints: [
      'Step 1: Beginning (Introduction) -> Conector: First / In the beginning (Presenta personajes y lugar).',
      'Step 2: Rising Action -> Conector: Then / Next / Suddenly (Aparece el problema o desafío).',
      'Step 3: Climax (Peak Tension) -> Conector: At that moment / Just then (El momento más emocionante y peligroso).',
      'Step 4: Falling Action -> Conector: After that / Later on (La tensión baja y se busca la solución).',
      'Step 5: Resolution (Ending) -> Conector: Finally / In the end (Se resuelve el conflicto y concluye la historia).'
    ],
    dileAfterVideo: 'Conversemos sobre el organizador. Te haré dos preguntas en español sobre los conectores y elementos que vimos en inglés.'
  },

  preQuestions: [
    {
      context: 'Characters vs Setting in English',
      question: 'En un cuento en inglés leemos: "The young astronaut landed on Mars in the year 2095." ¿Cuál es el "character" (personaje) y cuál es el "setting" (lugar y tiempo)?',
      expected: 'El character es el joven astronauta ("the young astronaut") y el setting es Marte en el año 2095 ("Mars in the year 2095").',
      success: '¡Very good! Identificaste con total exactitud al protagonista y las coordenadas de lugar y tiempo.',
      support: 'Busca quién realiza la acción (astronaut) y dónde y cuándo ocurre (Mars, year 2095).',
      reveal: '"Character" responde a "Who" (quién); "Setting" responde a "Where and When" (dónde y cuándo).',
      studentReveal: 'Character: The young astronaut. Setting: Mars in the year 2095.'
    },
    {
      context: 'Time Connector: First',
      question: '¿Qué función cumple la palabra "First" o la frase "In the beginning" al inicio de un párrafo narrativo?',
      expected: 'Indica el punto de partida temporal, señalando qué hecho ocurrió en primer lugar antes de todos los demás.',
      success: '¡Excelente! "First" marca el orden cronológico inicial de la historia.',
      support: 'Recuerda que First significa "Primero". Se usa siempre para abrir la secuencia de acciones.',
      reveal: '"First" conecta el inicio del relato con la presentación de la rutina de los personajes.',
      studentReveal: '"First" indica el primer hecho que ocurre al comenzar una historia en inglés.'
    }
  ],

  formalization: {
    title: 'Model Sentence Pattern: Beginning a Story in English',
    dileIntro: 'Revisemos la estructura formal para iniciar una historia en inglés con conector, personaje, verbo en pasado y lugar.',
    hazInstruction: 'Observa la fórmula en pantalla: Time Connector + Subject (Character) + Verb (Past) + Setting (Place/Time).',
    ideaClave: 'Pattern: "First, [Character] lived/worked in [Setting]." Example: "First, two brave explorers traveled across the desert."',
    graphicPoster: ''
  },

  postQuestions: [
    {
      context: 'Identifying Past Tense Verbs in Context',
      question: 'En las oraciones "lived in a quiet town" y "traveled across the desert", ¿en qué tiempo verbal están los verbos "lived" y "traveled" y por qué se usan en una narración?',
      expected: 'Están en pasado simple (Past Simple, terminados en -ed), porque narran acontecimientos que ya sucedieron en la historia.',
      success: '¡Perfecto! Reconociste el tiempo pasado regular que se usa para relatar historias.',
      support: 'Fíjate en la terminación -ed de lived y traveled: indican que la acción ya ocurrió antes.',
      reveal: 'Los relatos literarios en inglés se narran habitualmente en tiempo pasado (Past Simple).',
      studentReveal: 'Están en pasado simple (terminación -ed) porque relatan sucesos que ya ocurrieron.'
    }
  ],

  practice: [
    {
      context: 'Writing a Story Beginning in English Notebook',
      question: 'Abre tu cuaderno de inglés. Escribe el título: "Story Arc: Step 1 Beginning". Inventa y escribe 1 oración completa en inglés siguiendo el modelo aprendido: empieza con "First,", luego nombra un personaje (ej. "a brave girl", "a curious dog", "a clever scientist") y di dónde vivía usando "lived in...".',
      expected: 'Oración completa en inglés en el cuaderno con la estructura: "First, [personaje] lived in [lugar]." (Por ejemplo: "First, a brave girl lived in a magical forest.").',
      success: '¡Great job in your notebook! Tu oración en inglés está correctamente estructurada con conector, personaje y lugar.',
      support: 'Copia este molde y complétalo: "First, a young detective lived in Santiago." o "First, a lonely wizard lived in an old castle."',
      reveal: 'Escribir oraciones completas en el cuaderno consolida la ortografía, la puntuación y el vocabulario en inglés.',
      studentReveal: 'Oración modelo escrita en el cuaderno: "First, [Character] lived in [Setting]."'
    },
    {
      context: 'Translating Setting and Characters to Spanish',
      question: 'Debajo de tu oración en inglés en el cuaderno, escribe la traducción al español e indica al lado con dos flechas: ¿cuál es el Character (personaje) y cuál es el Setting (lugar)?',
      expected: 'Traducción correcta de su propia oración al español con identificación explícita del personaje y del lugar.',
      success: '¡Excelente demostración bilingüe! Comprobaste que comprendes a fondo cada parte de lo que escribiste en inglés.',
      support: 'Escribe tu frase en español y encierra en un círculo el nombre del personaje y subraya el lugar donde vive.',
      reveal: 'Poder traducir y rotular los elementos demuestra dominio real del significado y no solo repetición mecánica.',
      studentReveal: 'Traducción al español en el cuaderno con Character y Setting claramente rotulados.'
    }
  ],

  summaryIdeas: [
    ['Characters and Setting', 'Todo inicio de relato en inglés presenta "Characters" (quiénes participan) y "Setting" (dónde y cuándo ocurre la acción).'],
    ['Time Connectors', 'Usamos conectores como "First" (primero) y "In the beginning" (al comienzo) para ordenar cronológicamente la historia.'],
    ['Past Simple Structure', 'Las narraciones utilizan verbos en tiempo pasado regular (como lived o traveled) para relatar los acontecimientos ya sucedidos.']
  ],

  mini: [
    {
      id: 'q_1',
      q: 'Read the sentence: "First, an old sailor lived in a small lighthouse near the sea." Who is the main character?',
      options: [
        'A) The sea',
        'B) An old sailor',
        'C) A small lighthouse',
        'D) The wind'
      ],
      correct: 'B) An old sailor',
      fixExplain: '"An old sailor" (un viejo marinero) es la persona que realiza la acción y vive en el lugar.',
      concept: 'Identifying Characters'
    },
    {
      id: 'q_2',
      q: 'In the same sentence: "First, an old sailor lived in a small lighthouse near the sea." What is the setting (place)?',
      options: [
        'A) In a big airport',
        'B) In an old sailor',
        'C) In a small lighthouse near the sea',
        'D) In a shopping mall'
      ],
      correct: 'C) In a small lighthouse near the sea',
      fixExplain: '"A small lighthouse near the sea" (un pequeño faro cerca del mar) es el lugar físico donde se ambienta la escena.',
      concept: 'Identifying Setting'
    },
    {
      id: 'q_3',
      q: 'Which time connector is best suited to start the very first sentence of a short story in English?',
      options: [
        'A) Finally,',
        'B) First,',
        'C) Because,',
        'D) Never,'
      ],
      correct: 'B) First,',
      fixExplain: '"First," (Primero) o "In the beginning" son los conectores ideales para iniciar la narración cronológica.',
      concept: 'Time Connectors'
    }
  ],

  recovery: [
    {
      title: 'Refuerzo: Characters y Setting',
      explain: 'Recuerda: en inglés "Character" significa el personaje (la persona, animal o robot de la historia). "Setting" significa el escenario (el lugar y tiempo donde ocurre).',
      q: 'Si una historia dice "Elena walked in the forest at night", ¿qué parte representa el "Setting"?',
      options: [
        'A) Elena',
        'B) Walked',
        'C) In the forest at night'
      ],
      correct: 'C) In the forest at night',
      correctText: '¡Exacto! "In the forest at night" indica el lugar (el bosque) y el tiempo (de noche).',
      fixText: 'La respuesta correcta es la C: el bosque de noche es el lugar y tiempo (setting) de la historia.'
    }
  ],

  reasoning: {
    title: 'Comparemos dos oraciones en inglés',
    dileIntro: 'Antes de cerrar, analicemos dos oraciones con conectores de tiempo en inglés.',
    question: 'Sentence 1: "First, the children packed their bags at home." Sentence 2: "Finally, they arrived at the campsite happy and tired." ¿Por qué "First" corresponde al inicio de la montaña narrativa y "Finally" al desenlace?',
    expectedAnswer: 'Porque "First" indica la primera acción que da partida al viaje (Step 1 Beginning), mientras que "Finally" indica el resultado final que concluye la historia (Step 5 Resolution).',
    context1: {
      label: 'SENTENCE 1: BEGINNING',
      value: '"First, the children packed their bags at home."',
      desc: 'Step 1: punto de partida y preparación inicial de los personajes.'
    },
    context2: {
      label: 'SENTENCE 2: RESOLUTION',
      value: '"Finally, they arrived at the campsite happy and tired."',
      desc: 'Step 5: conclusión, llegada a salvo y cierre del relato.'
    },
    successFeedback: '¡Brillante razonamiento! Comprendiste cómo los conectores guían el recorrido narrativo desde la partida hasta la meta.',
    supportFeedback: 'Observa el significado de las palabras: First es "primero" (al partir) y Finally es "finalmente" (al terminar la aventura).',
    revealText: '"First" abre la puerta de la historia y "Finally" sella el desenlace de la experiencia.'
  },

  challenge: {
    title: 'Desafío breve: Identificar Character y Setting',
    question: 'Lee la frase: "First, two young detectives investigated a mystery in Valparaíso." ¿Quiénes son los Characters y cuál es el Setting?',
    expectedAnswer: 'Characters: "two young detectives" (dos jóvenes detectives). Setting: "Valparaíso" (la ciudad donde investigan).',
    item1: { label: 'Two young detectives', tag: 'Characters' },
    item2: { label: 'In Valparaíso', tag: 'Setting' },
    successFeedback: '¡Excelente identificación! Supiste separar con precisión a los protagonistas del escenario geográfico chileno.',
    supportFeedback: 'Pregúntate: ¿quiénes investigan? (dos jóvenes detectives = characters) y ¿dónde lo hacen? (en Valparaíso = setting).'
  },

  strategy: {
    title: 'Estrategia para comenzar a leer o escribir en inglés',
    dileIntro: 'Cada vez que leas o redactes el inicio de un cuento en inglés, sigue estos tres pasos:',
    steps: [
      { number: 1, title: 'Usa el conector inicial', desc: 'Comienza siempre con "First," o "In the beginning," para marcar el tiempo.' },
      { number: 2, title: 'Presenta al Character', desc: 'Nombra claramente al protagonista con su adjetivo o profesión (ej. "a brave astronaut").' },
      { number: 3, title: 'Establece el Setting', desc: 'Indica el lugar y época donde vive o se encuentra (ej. "lived in a quiet valley").' }
    ]
  },

  closure: {
    congratulations: '¡Congratulations! Hoy diste un paso fundamental en inglés: aprendiste a identificar el Setting y los Characters, a usar el conector "First" y a reconocer oraciones en tiempo pasado dentro de la montaña narrativa.',
    nextClassPreview: 'En la próxima clase exploraremos el Paso 2 de la montaña narrativa: la aparición del conflicto con los conectores "Then" y "Suddenly".'
  },

  interactive: {
    type: 'story_arc',
    title: 'English Narrative Story Arc & Time Connectors',
    description: 'Organizador gráfico secuencial para comprensión lectora de textos narrativos en inglés.'
  }
};
