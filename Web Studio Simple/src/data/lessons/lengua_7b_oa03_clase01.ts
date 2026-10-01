import { LessonData } from '../../types/lesson';

export const LENGUA_7B_OA03_CLASE01: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Lengua y Literatura',
    oaCode: 'OA 3',
    oaTitle: 'El conflicto narrativo y la trama de la historia',
    lessonNumber: 1,
    totalLessonsInOa: 6,
    lessonTitle: 'Las 6 Etapas del Viaje del Héroe',
    durationMinutes: 30,
    nextLessonTitle: 'Personajes: Motivaciones y tipos de conflicto'
  },

  prep: {
    adultObjective: 'Acompañar al estudiante a reconocer la estructura de una narración a través de las 6 etapas del viaje del héroe, identificando cómo el conflicto narrativo impulsa las acciones de los personajes.',
    routeToday: 'Estructura narrativa: Desde el Mundo Ordinario hasta el Regreso Transformado en los relatos literarios.',
    mentorReminder: 'Sigue las indicaciones en pantalla paso a paso. Lee en voz alta únicamente los recuadros con la etiqueta DILE o PREGÚNTALE y espera la respuesta del estudiante.',
    reminders: [
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'No leas los recuadros de AYUDA PEDAGÓGICA ni CLIMA EMOCIONAL; son guías exclusivas para ti.',
      'Pídele que observe la pantalla interactiva con las 6 etapas del viaje del héroe.',
      'Valora sus respuestas aunque use sus propias palabras cotidianas.',
      'Ten a mano su cuaderno de Lengua y Literatura para los ejercicios de escritura y análisis.'
    ],
    emotionalTip: 'Crea un clima de disfrute por la lectura: "Leer nos permite viajar a otros mundos, comprender los desafíos de los personajes y descubrir cómo resuelven sus problemas".'
  },

  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Lengua y Literatura', subtitle: 'El conflicto narrativo', color: 'orange' },
      { id: 'b2', number: '02', title: 'Exploración', subtitle: 'Las 6 etapas del viaje', color: 'teal' },
      { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Análisis y escritura en cuaderno', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz formativo y síntesis', color: 'navy' }
    ],
    keyQuestions: [
      { label: '¿Qué es el conflicto narrativo?', sub: 'El problema o quiebre que obliga a los personajes a actuar.' },
      { label: '¿Cuáles son las etapas del viaje?', sub: 'Mundo ordinario, llamada, umbral, pruebas, abismo y regreso.' }
    ],
    dileIntro: 'Hoy comenzaremos la primera clase de Lengua y Literatura para 7° Básico: "Las 6 Etapas del Viaje del Héroe".',
    dileObjective: 'Aprenderemos a reconocer cómo se organiza la trama de una historia y por qué el conflicto es el motor que hace avanzar todo el relato.'
  },

  situation: {
    dilePrompt: 'Hoy en Lengua y Literatura nos adentramos en "El conflicto narrativo y la trama de la historia". En la pantalla puedes ver el organizador gráfico "Las 6 Etapas del Viaje del Héroe". Observa la Etapa 1 (Mundo Ordinario) y la Etapa 2 (La Llamada a la Aventura). ¿Qué suceso o problema rompe la calma cotidiana del protagonista y lo obliga a iniciar su historia?',
    expectedAnswer: 'El estudiante debe señalar que surge un problema, misterio, peligro o llamado imprevisto que altera la vida normal del personaje y lo obliga a salir a resolverlo (el conflicto narrativo).',
    socraticHint: 'Fíjate en la Etapa 2 en la pantalla: ¿qué aparece de repente para que el protagonista no pueda quedarse cómodo en su casa?',
    emotionalTip: 'Transmite curiosidad y empatía por los personajes: en toda buena historia, las dificultades hacen crecer a las personas.',
    options: [
      {
        label: 'Mencionó que surge un problema, amenaza o misterio que rompe la calma (conflicto narrativo)',
        kind: 'correct',
        feedbackText: '¡Exacto! Ese problema o quiebre se llama conflicto narrativo y es el motor que pone en marcha la historia.'
      },
      {
        label: 'Solo mencionó el nombre del personaje o que sale de viaje, sin explicar el problema que lo obliga',
        kind: 'needs_support',
        feedbackText: 'Observa la Etapa 2: un viaje no empieza por casualidad. Siempre hay una necesidad, peligro o misterio que lo provoca.'
      },
      {
        label: 'No sabe qué responder o dio otra respuesta',
        kind: 'no_answer',
        feedbackText: 'Pista guiada: Fíjate en la descripción de la Etapa 2: "Surge un problema, desafío o misterio que altera la tranquilidad". Eso es el conflicto.'
      }
    ]
  },

  reference: {
    dilePrompt: 'En la pantalla interactiva se muestran las 6 etapas del viaje: Mundo Ordinario, La Llamada, Cruce del Umbral, Pruebas y Aliados, El Abismo y Regreso Transformado.',
    question: '¿Por qué decimos que sin un conflicto o problema no existiría una verdadera historia narrada?',
    expectedAnswer: 'Porque si no hay un problema o desafío que resolver, los personajes no tendrían ningún motivo para actuar, cambiar o tomar decisiones.',
    socraticHint: 'Imagina un cuento donde todo es perfecto y nunca pasa nada difícil: ¿habría algo emocionante que contar o leer?',
    feedbackSuccess: '¡Excelente reflexión! El conflicto crea la tensión y el interés de todo relato.',
    feedbackSupport: 'Si no hubiera un obstáculo, los personajes se quedarían en su rutina y no existiría ninguna aventura que contar.'
  },

  hook: {
    title: 'El motor de la historia: El conflicto narrativo',
    dileIntro: 'Vamos a explorar cómo los grandes relatos de la literatura universal (desde la Odisea hasta las sagas modernas) comparten esta misma estructura dramática en 6 momentos.',
    hazInstruction: 'Observa atentamente cada una de las 6 etapas en la pantalla e identifica cómo sube y baja la tensión dramática del relato.',
    videoSrc: '',
    focusPoints: [
      'Etapa 1: Mundo Ordinario (rutina cotidiana del personaje).',
      'Etapa 2: La Llamada a la Aventura (aparición del conflicto inicial).',
      'Etapa 3: Cruce del Umbral (entrada al mundo desconocido y peligroso).',
      'Etapa 4: Pruebas y Aliados (obstáculos intermedios y amigos de confianza).',
      'Etapa 5: El Abismo (el clímax o prueba máxima donde todo parece perdido).',
      'Etapa 6: Regreso Transformado (vuelta a casa con una nueva sabiduría).'
    ],
    dileAfterVideo: 'Conversemos sobre lo observado. Te haré dos preguntas para comprobar cómo identificamos estas etapas en los relatos que lees.',
    slides: [
      {
        "slideNumber": 1,
        "tituloMomento": "Apertura y Mundo Ordinario",
        "didacticPurpose": "Apertura y Mundo Ordinario",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, studying in a quiet, sunlit village library filled with ancient scrolls and comfortable wooden desks. Warm morning light, negative space in upper third. No text drawn by AI.",
        "overlayText": "Misión 1: Las 6 Etapas del Viaje del Héroe",
        "overlayTitle": "Misión 1: El viaje del héroe",
        "overlaySubtitle": "El mundo ordinario en la biblioteca",
        "vectorialOverlayPptx": "Esquema narrativo: Etapa 1 · Estado de calma y rutina conocida",
        "mathOverlayPptx": "Esquema narrativo: Etapa 1 · Estado de calma y rutina conocida",
        "speakerNotes": "Toda gran narración comienza en la calma. Nuestro protagonista vive en un mundo seguro donde todo resulta familiar y predecible.",
        "palabrasAprox": 19,
        "duracionSeg": 9
      },
      {
        "slideNumber": 2,
        "tituloMomento": "Quiebre y Tensión",
        "didacticPurpose": "Quiebre y Tensión",
        "visualPrompt": "Modern anime style. The two companions looking startled as a mysterious glowing letter arrives on the table, surrounded by subtle wind swirls. Clean lineart, dramatic lighting, clear space on the left side. No text drawn by AI.",
        "overlayText": "Etapa 2: La Llamada a la Aventura",
        "overlayTitle": "La llamada a la aventura",
        "overlaySubtitle": "Un mensaje que altera la tranquilidad",
        "vectorialOverlayPptx": "Vector de conflicto: Suceso inesperado -> Quiebre del equilibrio inicial",
        "mathOverlayPptx": "Vector de conflicto: Suceso inesperado -> Quiebre del equilibrio inicial",
        "speakerNotes": "De pronto, la tranquilidad se quiebra. Un mensaje misterioso sobre la mesa plantea un dilema que no puede ser ignorado.",
        "palabrasAprox": 19,
        "duracionSeg": 9
      },
      {
        "slideNumber": 3,
        "tituloMomento": "Encuentro con el Mentor",
        "didacticPurpose": "Encuentro con el Mentor",
        "visualPrompt": "Modern anime style. A wise elderly librarian mentor handing the young protagonists an ancient compass and a leather-bound journal. Soft depth of field, warm candlelight. No text drawn by AI.",
        "overlayText": "El Consejo del Mentor",
        "overlayTitle": "El consejo del mentor",
        "overlaySubtitle": "Herramienta y sabiduría inicial",
        "vectorialOverlayPptx": "Icono de mediación: Guía experimentado entrega objeto clave y consejo",
        "mathOverlayPptx": "Icono de mediación: Guía experimentado entrega objeto clave y consejo",
        "speakerNotes": "Sentir temor es natural frente a lo desconocido. El sabio bibliotecario entrega un mapa y el consejo necesario para dar el primer paso.",
        "palabrasAprox": 22,
        "duracionSeg": 10
      },
      {
        "slideNumber": 4,
        "tituloMomento": "Cruce del Umbral",
        "didacticPurpose": "Cruce del Umbral",
        "visualPrompt": "Modern anime style. The two young protagonists stepping across a stone archway into a mysterious twilight forest with glowing flora. Dramatic atmospheric lighting. No text drawn by AI.",
        "overlayText": "Etapa 3: El Cruce del Umbral",
        "overlayTitle": "El cruce del umbral",
        "overlaySubtitle": "Hacia el territorio de lo desconocido",
        "vectorialOverlayPptx": "Frontera narrativa: Límite entre lo cotidiano y el mundo de los desafíos",
        "mathOverlayPptx": "Frontera narrativa: Límite entre lo cotidiano y el mundo de los desafíos",
        "speakerNotes": "Nuestros protagonistas cruzan el arco de piedra hacia el bosque. Han dejado atrás la seguridad y se adentran en territorio de aventura.",
        "palabrasAprox": 21,
        "duracionSeg": 10
      },
      {
        "slideNumber": 5,
        "tituloMomento": "Pruebas y Aliados",
        "didacticPurpose": "Pruebas y Aliados",
        "visualPrompt": "Modern anime style. The boy and girl working side by side with a loyal animal companion, deciphering a stone puzzle gate while rain falls softly. Vibrant colors, focused determination. No text drawn by AI.",
        "overlayText": "Etapa 4: Pruebas y Aliados",
        "overlayTitle": "Pruebas en el camino",
        "overlaySubtitle": "Obstáculos y fuerzas que se oponen",
        "vectorialOverlayPptx": "Esquema de progresión: Reto 1 -> Reto 2 -> Alianza con compañeros",
        "mathOverlayPptx": "Esquema de progresión: Reto 1 -> Reto 2 -> Alianza con compañeros",
        "speakerNotes": "En el camino surgen dificultades crecientes. Cada obstáculo exige ingenio y pone a prueba el compromiso de mantenerse unidos frente a la adversidad.",
        "palabrasAprox": 21,
        "duracionSeg": 10
      },
      {
        "slideNumber": 6,
        "tituloMomento": "Antesala del Conflicto Mayor",
        "didacticPurpose": "Antesala del Conflicto Mayor",
        "visualPrompt": "Modern anime style. Dramatic confrontation in a cavern illuminated by a deep blue glowing crystal. High tension, expressive faces showing courage despite fear. No text drawn by AI.",
        "overlayText": "Etapa 5: El Abismo / Prueba Suprema",
        "overlayTitle": "La prueba suprema",
        "overlaySubtitle": "El núcleo del conflicto dramático",
        "vectorialOverlayPptx": "Clímax narrativo: Protagonista frente a la fuerza antagónica principal",
        "mathOverlayPptx": "Clímax narrativo: Protagonista frente a la fuerza antagónica principal",
        "speakerNotes": "Llegan a la caverna profunda. Están frente a la fuerza antagónica que amenaza su hogar, y no pueden retroceder.",
        "palabrasAprox": 18,
        "duracionSeg": 9
      },
      {
        "slideNumber": 7,
        "tituloMomento": "Pregunta Detonante",
        "didacticPurpose": "Pregunta Detonante",
        "visualPrompt": "Modern anime style. Minimalist clean composition showing the StudioSimple emblem, the hero returning to the sunrise holding the light of knowledge, wiser and smiling. No text drawn by AI.",
        "overlayText": "Etapa 6: El Regreso con el Elíxir",
        "overlayTitle": "El enigma del relato",
        "overlaySubtitle": "¿Qué fuerza mueve toda historia?",
        "vectorialOverlayPptx": "Pregunta detonante: ¿Qué es el conflicto narrativo y por qué transforma al héroe?",
        "mathOverlayPptx": "Pregunta detonante: ¿Qué es el conflicto narrativo y por qué transforma al héroe?",
        "speakerNotes": "Ahora surge la gran pregunta detonante: ¿qué fuerza impulsa a actuar al personaje y hace que una historia exista de verdad?",
        "palabrasAprox": 20,
        "duracionSeg": 9
      }
    ]
  },

  preQuestions: [
    {
      context: 'Mundo Ordinario vs La Llamada',
      question: 'En las dos primeras etapas, ¿qué diferencia la vida del héroe en su Mundo Ordinario respecto de cuando recibe La Llamada a la Aventura?',
      expected: 'En el Mundo Ordinario el personaje vive su rutina segura y conocida; con La Llamada recibe un desafío, peligro o misión que quiebra esa rutina y lo enfrenta a lo desconocido.',
      success: '¡Muy bien! Distinguiste con precisión la tranquilidad inicial del suceso detonante que quiebra la rutina.',
      support: 'Piensa en cómo empieza una película o libro antes de que ocurra el incidente principal y qué pasa justo después.',
      reveal: 'El Mundo Ordinario muestra la normalidad del personaje; La Llamada es el incidente que rompe esa calma e inicia la trama.',
      studentReveal: 'El Mundo Ordinario muestra la rutina; La Llamada introduce el problema o misión que inicia la aventura.'
    },
    {
      context: 'El Abismo y el Clímax Dramático',
      question: 'Observa la Etapa 5 en la pantalla: "El Abismo". ¿Por qué esta etapa representa el momento de mayor tensión en todo el relato?',
      expected: 'Porque es la crisis más grande o batalla decisiva donde el héroe enfrenta su mayor peligro, parece estar a punto de perder y debe vencer sus temores para triunfar.',
      success: '¡Excelente análisis dramático! Identificaste el clímax donde se decide el destino del personaje.',
      support: 'Fíjate en la descripción de la Etapa 5: es el momento culminante donde todo está en riesgo antes de resolver el conflicto.',
      reveal: 'El Abismo es la prueba suprema del héroe: si fracasa allí, la historia termina en tragedia; si la supera, logra la transformación.',
      studentReveal: 'El Abismo es la prueba más difícil donde el héroe arriesga todo para superar el conflicto.'
    }
  ],

  formalization: {
    title: 'Estructura de la Narración: Conflicto, Nudo y Desenlace',
    dileIntro: 'Revisemos la regla fundamental de la narrativa: todo relato literario tiene una situación inicial, un conflicto detonante que genera el nudo o desarrollo, y un desenlace.',
    hazInstruction: 'Lee con atención la idea clave en pantalla y prepárate para anotarla en tu cuaderno de Lengua.',
    ideaClave: 'El conflicto narrativo es el obstáculo o fuerza contraria que enfrenta al protagonista y lo obliga a actuar. Sin conflicto no hay trama, y a través de las pruebas el héroe se transforma.',
    graphicPoster: '',
    slides: [
      {
        "slideNumber": 1,
        "tituloMomento": "Objetivo de la Lección",
        "didacticPurpose": "Objetivo de la Lección",
        "visualPrompt": "Modern anime style 16:9. The boy and girl standing before an interactive lightboard showing a dynamic balance scale: 'Equilibrio Inicial' vs 'Conflicto Detonante'. Clean typography. No text drawn by AI.",
        "overlayText": "¿Qué es el Conflicto Narrativo?",
        "overlayTitle": "Objetivo de la lección",
        "overlaySubtitle": "Analizar el conflicto como motor de la narración",
        "vectorialOverlayPptx": "Rótulo formal: OA 03 · Conflicto Narrativo y Etapas del Viaje del Héroe",
        "mathOverlayPptx": "Rótulo formal: OA 03 · Conflicto Narrativo y Etapas del Viaje del Héroe",
        "speakerNotes": "El objetivo de hoy es aprender a identificar el conflicto narrativo como motor de la historia y a reconocer cómo transforma a los personajes en el relato.",
        "palabrasAprox": 26,
        "duracionSeg": 12
      },
      {
        "slideNumber": 2,
        "tituloMomento": "Definición Conceptual",
        "didacticPurpose": "Definición Conceptual",
        "visualPrompt": "Modern anime style. Split screen diagram: Left side shows the protagonist's goal; Right side shows the opposing obstacle or antagonist. High contrast, sharp clarity. No text drawn by AI.",
        "overlayText": "Protagonista vs. Fuerza Opositora",
        "overlayTitle": "El conflicto narrativo",
        "overlaySubtitle": "Oposición entre el deseo y el obstáculo",
        "vectorialOverlayPptx": "Mapa Visual: Fuerza A (Meta del Protagonista) <---> Fuerza B (Obstáculo u Opositor)",
        "mathOverlayPptx": "Mapa Visual: Fuerza A (Meta del Protagonista) <---> Fuerza B (Obstáculo u Opositor)",
        "speakerNotes": "Toda historia nace cuando el equilibrio se rompe. El conflicto es la tensión constante entre lo que el protagonista desea alcanzar y los obstáculos que se lo impiden.",
        "palabrasAprox": 27,
        "duracionSeg": 12
      },
      {
        "slideNumber": 3,
        "tituloMomento": "Modelamiento Textual",
        "didacticPurpose": "Modelamiento Textual",
        "visualPrompt": "Modern anime style. A prominent glowing parchment paper showing a clearly legible excerpt of an adventure story, with key sentences highlighted. Clear negative space. No text drawn by AI.",
        "overlayText": "Evidencia y Deseo del Protagonista",
        "overlayTitle": "Análisis del fragmento",
        "overlaySubtitle": "Localizar la evidencia en el texto",
        "vectorialOverlayPptx": "Fragmento fuente visible: Subrayado de la meta y encerrado del obstáculo detonante",
        "mathOverlayPptx": "Fragmento fuente visible: Subrayado de la meta y encerrado del obstáculo detonante",
        "speakerNotes": "Observemos este fragmento: marcamos con color la meta del personaje y subrayamos la fuerza opuesta. Al contrastarlas, el conflicto central queda a la vista con total claridad.",
        "palabrasAprox": 26,
        "duracionSeg": 12
      },
      {
        "slideNumber": 4,
        "tituloMomento": "Tipos de Conflicto",
        "didacticPurpose": "Tipos de Conflicto",
        "visualPrompt": "Modern anime style. Side by side panels: Left shows hero facing a storm (external); Right shows hero in internal doubt looking in mirror (internal). No text drawn by AI.",
        "overlayText": "Conflictos Externos e Internos",
        "overlayTitle": "Interno vs Externo",
        "overlaySubtitle": "Lucha interior o desafío del entorno",
        "vectorialOverlayPptx": "Cuadro comparativo: Conflicto Interno (Miedo, culpa) vs Externo (Naturaleza, rival, sociedad)",
        "mathOverlayPptx": "Cuadro comparativo: Conflicto Interno (Miedo, culpa) vs Externo (Naturaleza, rival, sociedad)",
        "speakerNotes": "El conflicto puede ser externo, si el héroe enfrenta monstruos o tempestades; o interno, si debe vencer sus propios temores y dudas antes de tomar una decisión.",
        "palabrasAprox": 26,
        "duracionSeg": 12
      },
      {
        "slideNumber": 5,
        "tituloMomento": "Evolución del Personaje",
        "didacticPurpose": "Evolución del Personaje",
        "visualPrompt": "Modern anime style. The progression of the protagonist across 3 stages: naive beginner, tested apprentice, and confident hero holding a lantern. Clean lightboard. No text drawn by AI.",
        "overlayText": "Evolución del Personaje en el Conflicto",
        "overlayTitle": "El cambio visible del héroe",
        "overlaySubtitle": "Superar el obstáculo transforma la identidad",
        "vectorialOverlayPptx": "Línea de transformación: Estado inicial (Inseguro) -> Prueba -> Estado final (Maduro y sabio)",
        "mathOverlayPptx": "Línea de transformación: Estado inicial (Inseguro) -> Prueba -> Estado final (Maduro y sabio)",
        "speakerNotes": "Al enfrentar las fuerzas opositoras, el personaje no solo avanza en el mapa: cambia su manera de pensar, supera sus límites y regresa con nueva sabiduría para su comunidad.",
        "palabrasAprox": 28,
        "duracionSeg": 13
      },
      {
        "slideNumber": 6,
        "tituloMomento": "Prevención del Error",
        "didacticPurpose": "Prevención del Error",
        "visualPrompt": "Modern anime style. Contrast graphic: An incidental minor accident crossed out with subtle red; The central plot conflict illuminated with vibrant teal glow. No text drawn by AI.",
        "overlayText": "Problema Pasajero vs Conflicto Central",
        "overlayTitle": "Atención: Error habitual",
        "overlaySubtitle": "No confundir problema secundario con conflicto central",
        "vectorialOverlayPptx": "Alerta de lectura: Conflicto central (motiva toda la obra) ≠ Percance pasajero (se resuelve en un párrafo)",
        "mathOverlayPptx": "Alerta de lectura: Conflicto central (motiva toda la obra) ≠ Percance pasajero (se resuelve en un párrafo)",
        "speakerNotes": "Un error habitual consiste en confundir un tropiezo menor con el conflicto central. Pregúntate siempre: ¿cuál es el gran obstáculo que sostiene la trama desde el principio hasta el desenlace?",
        "palabrasAprox": 28,
        "duracionSeg": 13
      },
      {
        "slideNumber": 7,
        "tituloMomento": "Síntesis y Regla de Oro",
        "didacticPurpose": "Síntesis y Regla de Oro",
        "visualPrompt": "Modern anime style. The two 13-year-olds pointing toward the StudioSimple emblem, with a dynamic infographic summarizing the narrative journey. Positive confident expressions. No text drawn by AI.",
        "overlayText": "Síntesis: El Conflicto como Motor",
        "overlayTitle": "Regla de Oro de la narrativa",
        "overlaySubtitle": "Sin conflicto no hay transformación ni historia",
        "vectorialOverlayPptx": "Esquema de síntesis: Equilibrio -> Quiebre (Conflicto) -> Acción -> Transformación",
        "mathOverlayPptx": "Esquema de síntesis: Equilibrio -> Quiebre (Conflicto) -> Acción -> Transformación",
        "speakerNotes": "Recuerda la regla de oro: sin conflicto no hay narración. ¡Ahora demostraremos lo aprendido aplicando este mapa en las lecturas interactivas de la plataforma!",
        "palabrasAprox": 24,
        "duracionSeg": 11
      }
    ]
  },

  postQuestions: [
    {
      context: 'Tipos de Conflicto en la Literatura',
      question: '¿Qué diferencia existe entre un conflicto externo (como un monstruo, un villano o una tormenta en el mar) y un conflicto interno del personaje?',
      expected: 'El conflicto externo es una amenaza física del mundo exterior; el conflicto interno es una lucha emocional, un miedo, una culpa o una duda dentro de los pensamientos del propio personaje.',
      success: '¡Extraordinaria diferenciación! Distinguiste la acción física exterior del crecimiento psicológico y moral del personaje.',
      support: 'Pregúntate: ¿el problema viene de afuera (otra persona o la naturaleza) o está dentro de su mente y corazón (un temor o una decisión difícil)?',
      reveal: 'Los conflictos externos ponen en riesgo la vida física del héroe; los conflictos internos lo obligan a madurar y cambiar su manera de ser.',
      studentReveal: 'El conflicto externo ocurre contra fuerzas del exterior; el conflicto interno ocurre dentro de los sentimientos del personaje.'
    }
  ],

  practice: [
    {
      context: 'Análisis de un Relato Conocido en el Cuaderno',
      question: 'Abre tu cuaderno de Lengua y Literatura. Elige una película, serie o libro que conozcas bien (por ejemplo Harry Potter, El Rey León, Moana o El Señor de los Anillos). Escribe el título y anota: 1) Su Mundo Ordinario, 2) Su Llamada a la Aventura (cuál fue el conflicto), y 3) Su momento de Abismo (la prueba más dura).',
      expected: 'Registro completo en el cuaderno con título y las 3 etapas identificadas con hechos concretos de la historia elegida.',
      success: '¡Excelente trabajo en tu cuaderno! Aplicaste las etapas del viaje del héroe a una historia real con hechos específicos.',
      support: 'Escribe el nombre de la película y responde: ¿qué hacía al principio?, ¿qué problema lo obligó a salir de casa? y ¿cuál fue la batalla más difícil?',
      reveal: 'Al aplicar este esquema a historias reales comprobamos que casi todas las obras maestras siguen esta estructura universal.',
      studentReveal: 'Esquema de las 3 etapas del relato anotado con claridad en el cuaderno.'
    },
    {
      context: 'Creación de un Conflicto Narrativo Breve en el Cuaderno',
      question: 'En tu cuaderno de Lengua, inventa un personaje original y redacta un párrafo de 4 a 5 líneas donde presentes su vida cotidiana y el momento exacto en que un conflicto inesperado interrumpe su día.',
      expected: 'Párrafo narrativo con redacción clara, que describe una rutina cotidiana y luego introduce un conflicto detonante explícito.',
      success: '¡Gran creatividad narrativa! Creaste una tensión dramática muy clara que dan ganas de seguir leyendo.',
      support: 'Empieza describiendo qué hace el personaje en una mañana común, y usa un conector de quiebre como "De pronto..." o "Sin embargo, esa tarde...".',
      reveal: 'Un buen inicio literario presenta la calma justo antes de quebrarla con un acontecimiento inesperado.',
      studentReveal: 'Párrafo narrativo propio con conflicto detonante redactado en el cuaderno.'
    }
  ],

  summaryIdeas: [
    ['Estructura Universal', 'Las narraciones siguen una progresión dramática en 6 etapas que van desde la calma cotidiana hasta la resolución.'],
    ['El Conflicto Narrativo', 'Es el motor de la historia: sin un obstáculo o problema que resolver, no existen acciones, decisiones ni transformación.'],
    ['Evolución del Personaje', 'Al superar las pruebas y el abismo, el protagonista regresa transformado con nueva madurez y sabiduría.']
  ],

  mini: [
    {
      id: 'q_1',
      q: '¿Cuál es la función principal del conflicto narrativo en un cuento o novela?',
      options: [
        'A) Describir el paisaje geográfico donde viven los personajes secundarios',
        'B) Romper el equilibrio inicial y motivar las acciones y decisiones del protagonista',
        'C) Enumerar los nombres de todos los autores que escribieron sobre el tema',
        'D) Eliminar a todos los personajes para que la historia termine rápidamente'
      ],
      correct: 'B) Romper el equilibrio inicial y motivar las acciones y decisiones del protagonista',
      fixExplain: 'El conflicto narrativo quiebra la tranquilidad inicial y obliga al protagonista a actuar, poniendo en movimiento toda la trama.',
      concept: 'El Conflicto Narrativo'
    },
    {
      id: 'q_2',
      q: 'En el esquema del Viaje del Héroe, ¿qué sucede en la etapa de "El Abismo"?',
      options: [
        'A) El protagonista descansa en su casa sin ninguna preocupación',
        'B) El protagonista enfrenta su mayor peligro o temor en el momento de máxima tensión',
        'C) El protagonista decide abandonar para siempre la aventura sin intentar nada',
        'D) El relato vuelve a comenzar exactamente desde la primera página'
      ],
      correct: 'B) El protagonista enfrenta su mayor peligro o temor en el momento de máxima tensión',
      fixExplain: 'El Abismo representa el clímax o crisis máxima: es el momento más difícil donde el héroe debe darlo todo para vencer el conflicto.',
      concept: 'El Abismo y el Clímax'
    },
    {
      id: 'q_3',
      q: 'Si en un relato leemos que una capitana navega hacia una isla prohibida para rescatar a su tripulación secuestrada por piratas, ¿qué tipo de conflicto predomina en ese momento?',
      options: [
        'A) Un conflicto puramente gramatical sin personajes',
        'B) Un conflicto externo donde enfrenta a piratas y al mar para cumplir su misión',
        'C) La capitana no tiene ningún conflicto porque le gusta navegar',
        'D) Un conflicto de ortografía en la redacción del mapa'
      ],
      correct: 'B) Un conflicto externo donde enfrenta a piratas y al mar para cumplir su misión',
      fixExplain: 'Los piratas y los peligros del mar son fuerzas externas del entorno que amenazan a la protagonista y sus compañeros.',
      concept: 'Conflicto Externo'
    }
  ],

  recovery: [
    {
      title: 'Refuerzo: El Incidente Detonante',
      explain: 'Toda historia necesita un suceso que cambie las cosas. Si Caperucita se queda en su casa comiendo sopa, no hay cuento. El conflicto surge cuando debe cruzar el bosque peligroso y se encuentra con el lobo.',
      q: '¿Por qué la aparición del lobo en el camino de Caperucita es un conflicto narrativo?',
      options: [
        'A) Porque interrumpe su viaje seguro y genera un peligro directo que debe enfrentar',
        'B) Porque el lobo era un personaje que no tenía diálogo',
        'C) Porque el bosque tenía muchos árboles verdes'
      ],
      correct: 'A) Porque interrumpe su viaje seguro y genera un peligro directo que debe enfrentar',
      correctText: '¡Exacto! El lobo representa el obstáculo y la amenaza que crea la tensión de la historia.',
      fixText: 'La respuesta correcta es la A: el lobo altera su trayecto pacífico y crea el peligro que da vida al cuento.'
    }
  ],

  reasoning: {
    title: 'Comparemos dos situaciones narrativas',
    dileIntro: 'Antes de cerrar, analicemos dos tipos de situaciones que vive un personaje.',
    question: 'En la Situación 1 un guerrero enfrenta a un dragón gigante que ataca la ciudad. En la Situación 2 el guerrero siente un profundo miedo de fallarle a sus amigos y duda de tomar su espada. ¿Por qué ambas representan un conflicto, pero uno es externo y el otro interno?',
    expectedAnswer: 'Porque en la primera el peligro viene del mundo exterior (el dragón), mientras que en la segunda la lucha ocurre dentro de sus propias emociones y pensamientos (el miedo a fallar).',
    context1: {
      label: 'SITUACIÓN 1: ATAQUE EXTERNO',
      value: 'El dragón ataca los muros de la fortaleza.',
      desc: 'Conflicto externo: amenaza física que requiere acción y combate en el mundo real.'
    },
    context2: {
      label: 'SITUACIÓN 2: LUCHA INTERIOR',
      value: 'El guerrero siente pánico y duda de su capacidad.',
      desc: 'Conflicto interno: dilema emocional y psicológico que exige superación personal.'
    },
    successFeedback: '¡Extraordinario razonamiento! Supiste diferenciar con total claridad la fuerza exterior del dilema emocional interno.',
    supportFeedback: 'Observa dónde ocurre cada problema: ¿uno está afuera destruyendo muros y el otro está en los pensamientos y temores del guerrero?',
    revealText: 'Los grandes relatos combinan ambos: el héroe debe vencer al dragón exterior al mismo tiempo que vence su propio miedo interior.'
  },

  challenge: {
    title: 'Desafío breve: Identificar la etapa',
    question: 'En un relato leemos: "Lucía encontró un pergamino oculto en el desván y esa misma noche empacó su linterna para salir al bosque". ¿Qué etapa del viaje del héroe representa encontrar el pergamino y cuál empacar la linterna?',
    expectedAnswer: 'Encontrar el pergamino representa La Llamada a la Aventura (aparece el misterio); empacar la linterna representa el Cruce del Umbral (decide entrar al mundo desconocido).',
    item1: { label: 'Encontrar el pergamino', tag: 'La Llamada a la Aventura' },
    item2: { label: 'Empacar la linterna', tag: 'El Cruce del Umbral' },
    successFeedback: '¡Excelente precisión! Reconociste el llamado del conflicto y la decisión de cruzar la frontera hacia lo desconocido.',
    supportFeedback: 'Fíjate en las etapas: primero recibe la señal o misterio (Llamada) y luego toma las herramientas para salir de su casa (Cruce del Umbral).'
  },

  strategy: {
    title: 'Estrategia para analizar cualquier narración',
    dileIntro: 'Cada vez que leas un cuento, fábula o novela, aplica estos tres pasos ordenados:',
    steps: [
      { number: 1, title: 'Ubica el equilibrio inicial', desc: '¿Cómo era la vida cotidiana y pacífica del personaje antes de que ocurriera nada extraño?' },
      { number: 2, title: 'Identifica el conflicto', desc: '¿Qué suceso inesperado rompe la calma y qué obstáculo debe vencer el protagonista?' },
      { number: 3, title: 'Observa la transformación', desc: '¿Cómo cambia el personaje al final de la historia tras haber superado las pruebas?' }
    ]
  },

  closure: {
    congratulations: '¡Felicitaciones! Hoy aprendiste qué es el conflicto narrativo, cómo las 6 etapas del viaje del héroe organizan la trama de las historias y cómo diferenciar los conflictos externos de los internos.',
    nextClassPreview: 'En la próxima clase analizaremos en profundidad a los personajes: sus motivaciones secretas y cómo se relacionan los protagonistas con los antagonistas.'
  },

  interactive: {
    type: 'hero_journey',
    title: 'Las 6 Etapas del Viaje del Héroe',
    description: 'Organizador gráfico interactivo de la estructura narrativa y la evolución del personaje.'
  }
};
