import { LessonData } from '../../types/lesson';

export const CIENCIAS_7B_OA01_CLASE02: LessonData = {
  "metadata": {
    "grade": "7° Básico",
    "subject": "Ciencias Naturales",
    "oaCode": "OA 1",
    "oaTitle": "Sexualidad y Afectividad",
    "lessonNumber": 2,
    "totalLessonsInOa": 6,
    "lessonTitle": "Transformaciones Físicas y Emocionales en la Pubertad",
    "durationMinutes": 30,
    "nextLessonTitle": "Vínculos afectivos, respeto mutuo e intimidad"
  },
  "prep": {
    "adultObjective": "Acompañar al estudiante a distinguir entre caracteres sexuales primarios y secundarios, reconociendo la acción del sistema endocrino en los cambios físicos y emocionales propios de la pubertad como un proceso biológico natural.",
    "routeToday": "Reconocer cómo las señales hormonales de la pubertad transforman nuestro cuerpo y nuestras emociones, diferenciando caracteres primarios de secundarios y valorando la diversidad en los ritmos de crecimiento.",
    "mentorReminder": "Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. El contenido pedagógico y las respuestas esperadas te indican con total precisión qué debe responder el estudiante.",
    "reminders": [
      "La pubertad es una etapa de maduración biológica y psicológica universal.",
      "Lee en voz alta únicamente los textos con la etiqueta DILE o PREGÚNTALE.",
      "Cada cuerpo tiene su propio ritmo de desarrollo; normaliza las diferencias individuales.",
      "Valora el razonamiento biológico del estudiante antes de calificar su respuesta."
    ],
    "emotionalTip": "Aborda los cambios corporales con naturalidad, serenidad y respeto. Conversar abiertamente ayuda a disminuir la inseguridad típica de esta etapa."
  },
  "route": {
    "blocks": [
      {
        "id": "b1",
        "number": "01",
        "title": "Ciencias Naturales",
        "subtitle": "Eje Endocrino y Pubertad",
        "color": "teal"
      },
      {
        "id": "b2",
        "number": "02",
        "title": "Caracteres Sexuales",
        "subtitle": "Primarios vs Secundarios",
        "color": "orange"
      },
      {
        "id": "b3",
        "number": "03",
        "title": "Práctica",
        "subtitle": "Casos y Cuaderno de Ciencias",
        "color": "yellow"
      },
      {
        "id": "b4",
        "number": "04",
        "title": "Evaluación",
        "subtitle": "Miniquiz y Síntesis Formativa",
        "color": "navy"
      }
    ],
    "keyQuestions": [
      {
        "label": "Caracteres primarios",
        "sub": "Estructuras presentes desde el nacimiento"
      },
      {
        "label": "Caracteres secundarios",
        "sub": "Transformaciones inducidas por hormonas en la pubertad"
      },
      {
        "label": "Maduración emocional",
        "sub": "Búsqueda de identidad y autonomía personal"
      }
    ],
    "dileIntro": "Hoy comenzaremos la segunda clase de Ciencias Naturales para 7° Básico: 'Transformaciones Físicas y Emocionales en la Pubertad'.",
    "dileObjective": "Comprender la diferencia biológica entre caracteres sexuales primarios y secundarios, y reconocer cómo las hormonas influyen tanto en el crecimiento corporal como en el mundo emocional de la adolescencia."
  },
  "situation": {
    "dilePrompt": "Durante la pubertad, los adolescentes experimentan cambios corporales notorios: aumentan de estatura, cambia el tono de su voz y aparece vello corporal, mientras sus órganos reproductores maduran. ¿Qué sistema del cuerpo humano produce las sustancias químicas (hormonas) encargadas de coordinar y activar estos cambios?",
    "expectedAnswer": "El sistema endocrino (las glándulas hormonales, como la hipófisis en el cerebro y las gónadas).",
    "socraticHint": "Piensa en el sistema del cuerpo formado por glándulas que liberan sustancias mensajeras directamente a la sangre.",
    "emotionalTip": "Recuérdale que los cambios corporales no ocurren de la noche a la mañana, sino de manera progresiva a lo largo de varios años.",
    "options": [
      {
        "label": "Mencionó el sistema endocrino o las hormonas/glándulas (hipófisis, testosterona, estrógenos)",
        "kind": "correct",
        "feedbackText": "¡Exacto! El sistema endocrino libera hormonas que actúan como mensajeros químicos coordinando todos los cambios puberales."
      },
      {
        "label": "Mencionó el sistema digestivo, respiratorio o muscular",
        "kind": "needs_support",
        "feedbackText": "Esos sistemas cumplen funciones de nutrición y movimiento. Las señales de la pubertad provienen del sistema endocrino mediante hormonas."
      },
      {
        "label": "No sabe o tiene dudas",
        "kind": "no_answer",
        "feedbackText": "Pista guiada: Es el sistema endocrino, encabezado por la glándula hipófisis en el cerebro, que produce hormonas que viajan por la sangre."
      }
    ]
  },
  "reference": {
    "dilePrompt": "En Ciencias Naturales distinguimos dos tipos de caracteres sexuales: los primarios, que son los órganos reproductores presentes desde el nacimiento; y los secundarios, que son las características físicas que se desarrollan durante la pubertad.",
    "question": "Con tus propias palabras: ¿cuál es la diferencia principal entre un carácter sexual primario y uno secundario?",
    "expectedAnswer": "Los primarios están presentes desde el nacimiento (órganos reproductores), mientras que los secundarios se desarrollan en la pubertad por acción hormonal.",
    "socraticHint": "Fíjate en el momento en que aparece cada uno: ¿cuál está desde que nacemos y cuál aparece al llegar a la adolescencia?",
    "feedbackSuccess": "¡Brillante distinción! Los caracteres primarios nos acompañan desde que nacemos y los secundarios se manifiestan en la pubertad.",
    "feedbackSupport": "Recuerda: 'primario' significa presente desde el nacimiento (órganos reproductores); 'secundario' significa adquirido en la pubertad (voz, vello, estirón)."
  },
  "hook": {
    "title": "El reloj biológico: La metamorfosis de la pubertad",
    "dileIntro": "Vamos a observar cómo el cuerpo humano inicia una de las etapas más fascinantes del desarrollo: la pubertad, donde el sistema endocrino despierta nuevas señales biológicas.",
    "hazInstruction": "Presta atención a cómo la glándula hipófisis activa a las gónadas y observa la distinción entre caracteres primarios y secundarios.",
    "videoSrc": "",
    "focusPoints": [
      "Glándula hipófisis: centro de control que libera gonadotropinas.",
      "Caracteres primarios: órganos genitales presentes desde el nacimiento.",
      "Caracteres secundarios: estirón puberal, voz, masa muscular y vello corporal.",
      "Dimensión emocional: cambios en el estado de ánimo y consolidación de la identidad."
    ],
    "dileAfterVideo": "Conversemos sobre lo observado en el video. Te haré dos preguntas para comprobar cómo actúan estos cambios.",
    "slides": [
      {
        "slideNumber": 1,
        "tituloMomento": "Apertura y el Despertar Hormonal",
        "didacticPurpose": "Apertura y el Despertar Hormonal",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, examining a glowing timeline of human growth in a bright science lab. Warm morning lighting, clean negative space in upper third. No text drawn by AI.",
        "overlayText": "Misión 2: Cambios de la Pubertad",
        "overlayTitle": "Misión 2: El despertar hormonal",
        "overlaySubtitle": "El inicio de una nueva etapa de crecimiento",
        "vectorialOverlayPptx": "Cronograma de desarrollo: Infancia -> Pubertad -> Adolescencia",
        "mathOverlayPptx": "Cronograma de desarrollo: Infancia -> Pubertad -> Adolescencia",
        "speakerNotes": "Comienza una nueva expedición en ciencias. La pubertad marca el inicio de transformaciones corporales y emocionales guiadas por señales químicas precisas.",
        "palabrasAprox": 20,
        "duracionSeg": 9
      },
      {
        "slideNumber": 2,
        "tituloMomento": "El Centro de Mando: La Hipófisis",
        "didacticPurpose": "El Centro de Mando: La Hipófisis",
        "visualPrompt": "Modern anime style. Medical diagram in a clean holographic sphere showing the brain, pituitary gland, and hormonal signals descending through the body. Crisp lines. No text drawn by AI.",
        "overlayText": "La Hipófisis: Centro de Control",
        "overlayTitle": "La glándula hipófisis",
        "overlaySubtitle": "Centro emisor de hormonas reguladoras",
        "vectorialOverlayPptx": "Esquema endocrino: Hipófisis -> Señales químicas LH y FSH -> Gónadas",
        "mathOverlayPptx": "Esquema endocrino: Hipófisis -> Señales químicas LH y FSH -> Gónadas",
        "speakerNotes": "En la base del cerebro, la glándula hipófisis emite hormonas que despiertan a los ovarios y testículos para comenzar la maduración reproductiva.",
        "palabrasAprox": 21,
        "duracionSeg": 9
      },
      {
        "slideNumber": 3,
        "tituloMomento": "Caracteres Sexuales Primarios",
        "didacticPurpose": "Caracteres Sexuales Primarios",
        "visualPrompt": "Modern anime style. Two adolescent characters studying an anatomical diagram of the reproductive organs with respectful scientific curiosity. Clear negative space on left. No text drawn by AI.",
        "overlayText": "Caracteres Primarios: Desde el Nacimiento",
        "overlayTitle": "Caracteres sexuales primarios",
        "overlaySubtitle": "Estructuras anatómicas presentes desde que nacemos",
        "vectorialOverlayPptx": "Definición médica: Órganos genitales externos e internos presentes en el recién nacido",
        "mathOverlayPptx": "Definición médica: Órganos genitales externos e internos presentes en el recién nacido",
        "speakerNotes": "Los caracteres sexuales primarios corresponden a los órganos reproductores. Están formados desde la gestación y nos acompañan desde nuestro nacimiento.",
        "palabrasAprox": 19,
        "duracionSeg": 9
      },
      {
        "slideNumber": 4,
        "tituloMomento": "Caracteres Sexuales Secundarios",
        "didacticPurpose": "Caracteres Sexuales Secundarios",
        "visualPrompt": "Modern anime style. Comparison silhouettes illustrating height markers, shoulder broadening, pelvic changes, and facial feature maturation. Crisp clean art. No text drawn by AI.",
        "overlayText": "Caracteres Secundarios: Maduración Puberal",
        "overlayTitle": "Caracteres sexuales secundarios",
        "overlaySubtitle": "Cambios físicos visibles durante la pubertad",
        "vectorialOverlayPptx": "Matriz comparativa: Estirón puberal, cambio de voz, distribución de grasa y vello",
        "mathOverlayPptx": "Matriz comparativa: Estirón puberal, cambio de voz, distribución de grasa y vello",
        "speakerNotes": "En la pubertad surgen los caracteres secundarios: aumento de estatura, ensanchamiento corporal, cambio en el tono de voz y aparición de vello.",
        "palabrasAprox": 21,
        "duracionSeg": 9
      },
      {
        "slideNumber": 5,
        "tituloMomento": "El Mundo de las Emociones",
        "didacticPurpose": "El Mundo de las Emociones",
        "visualPrompt": "Modern anime style. The boy and girl reflecting outdoors under a gentle autumn tree, expressing introspection and camaraderie. Warm expressive eyes. No text drawn by AI.",
        "overlayText": "Maduración Emocional e Identidad",
        "overlayTitle": "Dimensión emocional en la pubertad",
        "overlaySubtitle": "Búsqueda de autonomía y nuevas inquietudes",
        "vectorialOverlayPptx": "Esquema psicológico: Cambios de humor transitorios y necesidad de autoafirmación",
        "mathOverlayPptx": "Esquema psicológico: Cambios de humor transitorios y necesidad de autoafirmación",
        "speakerNotes": "Las hormonas también influyen en los afectos. Experimentamos cambios de ánimo, mayor curiosidad y la necesidad de construir nuestra propia identidad personal.",
        "palabrasAprox": 21,
        "duracionSeg": 9
      },
      {
        "slideNumber": 6,
        "tituloMomento": "Cada Cuerpo a su Propio Ritmo",
        "didacticPurpose": "Cada Cuerpo a su Propio Ritmo",
        "visualPrompt": "Modern anime style. Diverse group of healthy teenage friends of different heights and physical builds smiling together in school uniforms. No text drawn by AI.",
        "overlayText": "Diversidad de Ritmos Biológicos",
        "overlayTitle": "Diversidad y reloj biológico",
        "overlaySubtitle": "Cada persona se desarrolla a un ritmo único",
        "vectorialOverlayPptx": "Rango cronológico: Variabilidad natural de inicio entre los 9 y 15 años",
        "mathOverlayPptx": "Rango cronológico: Variabilidad natural de inicio entre los 9 y 15 años",
        "speakerNotes": "No todos los cuerpos crecen al mismo tiempo. La pubertad tiene un ritmo único para cada individuo y todas las trayectorias son normales y saludables.",
        "palabrasAprox": 23,
        "duracionSeg": 10
      },
      {
        "slideNumber": 7,
        "tituloMomento": "La Pregunta Detonante",
        "didacticPurpose": "La Pregunta Detonante",
        "visualPrompt": "Modern anime style. The girl and boy ready to classify developmental traits with their science notebooks open. StudioSimple badge in corner. No text drawn by AI.",
        "overlayText": "StudioSimple · Ciencias Naturales",
        "overlayTitle": "El desafío biológico",
        "overlaySubtitle": "¿Cómo clasificamos cada cambio con exactitud?",
        "vectorialOverlayPptx": "Pregunta detonante: ¿Qué criterio biológico diferencia a cada carácter sexual?",
        "mathOverlayPptx": "Pregunta detonante: ¿Qué criterio biológico diferencia a cada carácter sexual?",
        "speakerNotes": "Surge ahora el gran desafío: al analizar un cambio concreto en la pubertad, ¿cómo determinamos si es primario o secundario sin dudar?",
        "palabrasAprox": 21,
        "duracionSeg": 9
      }
    ]
  },
  "preQuestions": [
    {
      "context": "Diferencia de origen temporal",
      "question": "¿Por qué decimos que los órganos genitales son caracteres primarios mientras que el estirón o el cambio de voz son secundarios?",
      "expected": "Porque los órganos genitales están presentes desde que nacemos, mientras que el estirón y el cambio de voz aparecen en la pubertad por las hormonas.",
      "success": "¡Muy bien fundamentado! El momento en que se manifiestan y su causa hormonal marcan la diferencia científica.",
      "support": "Piensa en un bebé recién nacido: ¿tiene ya sus órganos reproductores? ¿Y tiene barba o voz grave? ¿Cuándo aparecen estos últimos?",
      "reveal": "Los caracteres primarios existen desde el nacimiento; los secundarios se desarrollan en la pubertad por estímulo de las hormonas sexuales.",
      "studentReveal": "Los primarios vienen desde el nacimiento; los secundarios aparecen en la pubertad por acción hormonal."
    },
    {
      "context": "Cambios emocionales en la pubertad",
      "question": "Además de los cambios visibles en la estatura y la piel, ¿qué transformaciones emocionales suelen experimentar los jóvenes?",
      "expected": "Variaciones en el estado de ánimo, búsqueda de mayor independencia de los padres y mayor necesidad de compartir con su grupo de amigos.",
      "success": "¡Exacto! El desarrollo puberal no es solo corporal; también transforma nuestra manera de sentir y relacionarnos.",
      "support": "Piensa en cómo cambian los intereses entre la niñez y la adolescencia: ¿surgen nuevas emociones, dudas y ganas de ser más independiente?",
      "reveal": "Durante la pubertad se intensifican las emociones, surge la búsqueda de autonomía personal y se valora profundamente la amistad.",
      "studentReveal": "Cambios de ánimo, búsqueda de independencia y mayor interés en compartir con amigos."
    }
  ],
  "conversationContext": "Analizaremos cómo el sistema endocrino activa la maduración corporal y qué criterios permiten clasificar los caracteres sexuales.",
  "formalization": {
    "title": "Caracteres Sexuales Primarios y Secundarios",
    "concept": "Maduración puberal y diferenciación de caracteres",
    "summary": "La pubertad es el período de transición entre la infancia y la adultez activado por el sistema endocrino. Los caracteres primarios son los órganos reproductores presentes desde el nacimiento; los secundarios son las transformaciones físicas que surgen por acción de los estrógenos y la testosterona.",
    "ideaClave": "Los caracteres sexuales primarios existen desde el nacimiento; los secundarios se desarrollan en la pubertad activados por hormonas del sistema endocrino.",
    "dileIntro": "Ahora formalizaremos la regla biológica para clasificar cualquier transformación del cuerpo humano durante el desarrollo.",
    "hazInstruction": "Lee con atención el objetivo en pantalla y revisa el caso modelado paso a paso.",
    "videoSrc": "",
    "slides": [
      {
        "slideNumber": 1,
        "tituloMomento": "Objetivo de la Lección",
        "didacticPurpose": "Objetivo de la Lección",
        "visualPrompt": "Modern anime style 16:9. The boy and girl standing before a clear two-column digital panel titled 'Caracteres Primarios' and 'Caracteres Secundarios'. Clean scientific typography. No text drawn by AI.",
        "overlayText": "Caracteres Primarios y Secundarios",
        "overlayTitle": "Objetivo de la lección",
        "overlaySubtitle": "Diferenciar caracteres sexuales primarios de secundarios en la pubertad",
        "vectorialOverlayPptx": "Rótulo formal: OA 01 · Diferenciación de Caracteres Sexuales y Pubertad",
        "mathOverlayPptx": "Rótulo formal: OA 01 · Diferenciación de Caracteres Sexuales y Pubertad",
        "speakerNotes": "El objetivo de hoy es diferenciar con precisión científica los caracteres sexuales primarios de los secundarios, comprendiendo la acción del sistema endocrino en la pubertad.",
        "palabrasAprox": 23,
        "duracionSeg": 11
      },
      {
        "slideNumber": 2,
        "tituloMomento": "Mecanismo Hormonal: Eje Hipófisis-Gónadas",
        "didacticPurpose": "Mecanismo Hormonal: Eje Hipófisis-Gónadas",
        "visualPrompt": "Modern anime style. Detailed scientific illustration of the endocrine feedback loop: pituitary gland releasing FSH and LH to stimulate ovaries and testes. Crisp lines. No text drawn by AI.",
        "overlayText": "Eje Hormonal: Hipófisis y Gónadas",
        "overlayTitle": "El sistema endocrino en acción",
        "overlaySubtitle": "Liberación de gonadotropinas, estrógenos y testosterona",
        "vectorialOverlayPptx": "Diagrama fisiológico: Hipófisis -> LH/FSH -> Ovarios (Estrógenos) / Testículos (Testosterona)",
        "mathOverlayPptx": "Diagrama fisiológico: Hipófisis -> LH/FSH -> Ovarios (Estrógenos) / Testículos (Testosterona)",
        "speakerNotes": "La pubertad inicia cuando la hipófisis secreta hormonas gonadales. Estas estimulan la producción de estrógenos en mujeres y testosterona en varones, desencadenando los cambios físicos.",
        "palabrasAprox": 24,
        "duracionSeg": 12
      },
      {
        "slideNumber": 3,
        "tituloMomento": "Definición de Caracteres Primarios",
        "didacticPurpose": "Definición de Caracteres Primarios",
        "visualPrompt": "Modern anime style. Clear medical chart highlighting the internal and external reproductive anatomy present since birth. Respectful scientific design. No text drawn by AI.",
        "overlayText": "Caracteres Primarios: Órganos Reproductores",
        "overlayTitle": "Caracteres sexuales primarios",
        "overlaySubtitle": "Anatomía presente desde el nacimiento",
        "vectorialOverlayPptx": "Capa anatómica: Ovarios, útero, trompas, testículos, conductos y pene presentes desde el parto",
        "mathOverlayPptx": "Capa anatómica: Ovarios, útero, trompas, testículos, conductos y pene presentes desde el parto",
        "speakerNotes": "Los caracteres primarios son los órganos reproductores anatómicos con los que nace cada ser humano. Su estructura se define durante la etapa embrionaria previa al nacimiento.",
        "palabrasAprox": 24,
        "duracionSeg": 12
      },
      {
        "slideNumber": 4,
        "tituloMomento": "Definición de Caracteres Secundarios",
        "didacticPurpose": "Definición de Caracteres Secundarios",
        "visualPrompt": "Modern anime style. Illustrated adolescent developmental landmarks: growth spurt, larynx enlargement, shoulder broadening, and body hair growth. Clean lineart. No text drawn by AI.",
        "overlayText": "Caracteres Secundarios: Cambios Puberales",
        "overlayTitle": "Caracteres sexuales secundarios",
        "overlaySubtitle": "Rasgos corporales activados en la pubertad",
        "vectorialOverlayPptx": "Capa puberal: Estirón estatural, cambio de voz, desarrollo mamario y vello corporal",
        "mathOverlayPptx": "Capa puberal: Estirón estatural, cambio de voz, desarrollo mamario y vello corporal",
        "speakerNotes": "Los caracteres secundarios son las transformaciones corporales que aparecen en la pubertad: aceleración del crecimiento, modificación de la voz, desarrollo mamario y distribución de vello.",
        "palabrasAprox": 23,
        "duracionSeg": 11
      },
      {
        "slideNumber": 5,
        "tituloMomento": "Dimensión Emocional y Autonomía",
        "didacticPurpose": "Dimensión Emocional y Autonomía",
        "visualPrompt": "Modern anime style. The boy and girl dialoguing openly with a supportive mentor or family member in a warm room. Welcoming atmosphere. No text drawn by AI.",
        "overlayText": "Maduración Afectiva y Convivencia",
        "overlayTitle": "Dimensión emocional e identidad",
        "overlaySubtitle": "Sentimientos, independencia y diálogo familiar",
        "vectorialOverlayPptx": "Esquema biopsicosocial: Cambios hormonales conectados con la autoimagen y la vida familiar",
        "mathOverlayPptx": "Esquema biopsicosocial: Cambios hormonales conectados con la autoimagen y la vida familiar",
        "speakerNotes": "La maduración puberal también impacta las emociones. La búsqueda de autonomía y las variaciones del estado de ánimo requieren comunicación empática y diálogo cercano en el hogar.",
        "palabrasAprox": 25,
        "duracionSeg": 12
      },
      {
        "slideNumber": 6,
        "tituloMomento": "Caso Modelado: Voz y Estatura",
        "didacticPurpose": "Caso Modelado: Voz y Estatura",
        "visualPrompt": "Modern anime style 16:9. The boy and girl analyzing an illustrated medical card with height metrics and voice frequency charts on their desk. High clarity. No text drawn by AI.",
        "overlayText": "Caso Modelado: Caracteres Secundarios",
        "overlayTitle": "Caso Modelado: Estatura y Voz",
        "overlaySubtitle": "Identificación de caracteres con justificación biológica",
        "vectorialOverlayPptx": "Desglose del caso: Aumento de estatura y cambio de voz -> Aparecen en la pubertad -> Caracteres Secundarios",
        "mathOverlayPptx": "Desglose del caso: Aumento de estatura y cambio de voz -> Aparecen en la pubertad -> Caracteres Secundarios",
        "speakerNotes": "Analicemos un caso concreto: identificar si el cambio en el tono de la voz y el aumento acelerado de estatura corresponden a caracteres primarios o secundarios, y justificarlo biológicamente. Corresponden a caracteres sexuales secundarios, porque se manifiestan durante la pubertad por estímulo de las hormonas sexuales y no están presentes desde el nacimiento.",
        "palabrasAprox": 53,
        "duracionSeg": 22
      },
      {
        "slideNumber": 7,
        "tituloMomento": "Síntesis y Regla de Oro",
        "didacticPurpose": "Síntesis y Regla de Oro",
        "visualPrompt": "Modern anime style. StudioSimple emblem with a clear two-part balance diagram: 'Nacimiento = Primarios' y 'Pubertad = Secundarios'. Clean solid colors. No text drawn by AI.",
        "overlayText": "Regla de Oro: Primarios vs Secundarios",
        "overlayTitle": "Regla de Oro de los caracteres sexuales",
        "overlaySubtitle": "Nacimiento = Primarios | Pubertad = Secundarios",
        "vectorialOverlayPptx": "Infografía de síntesis: Órganos de nacimiento (primarios) vs rasgos puberales hormonales (secundarios)",
        "mathOverlayPptx": "Infografía de síntesis: Órganos de nacimiento (primarios) vs rasgos puberales hormonales (secundarios)",
        "speakerNotes": "Recuerda la regla de oro: los caracteres primarios nacen con nosotros; los secundarios despiertan en la pubertad por acción hormonal. ¡Ahora demostraremos lo aprendido en las actividades de la plataforma!",
        "palabrasAprox": 27,
        "duracionSeg": 12
      }
    ]
  },
  "postQuestions": [
    {
      "context": "Justificación de caracteres secundarios",
      "question": "Si alguien afirma que el desarrollo mamario y la aparición de barba son caracteres primarios, ¿cómo corregirías esa afirmación con base científica?",
      "expected": "Explicando que son secundarios porque aparecen en la pubertad por acción de las hormonas, mientras que los primarios son los órganos genitales que ya están presentes al nacer.",
      "success": "¡Excelente corrección científica! Distinguiste con total claridad el momento de aparición y el estímulo hormonal.",
      "support": "Recuerda la regla de oro: ¿estos rasgos físicos existen en un recién nacido o se desarrollan en la pubertad?",
      "reveal": "Son caracteres secundarios porque surgen en la pubertad impulsados por estrógenos o testosterona, no en el nacimiento.",
      "studentReveal": "Son secundarios porque aparecen en la pubertad y no desde el nacimiento."
    },
    {
      "context": "Manejo saludable de las emociones",
      "question": "¿Por qué es importante que los adolescentes mantengan una comunicación abierta con sus familias durante los cambios puberales?",
      "expected": "Porque ayuda a comprender que los cambios físicos y emocionales son naturales, alivia temores y fortalece la confianza familiar.",
      "success": "¡Muy bien! El diálogo familiar brinda seguridad y acompañamiento en una etapa de grandes transformaciones.",
      "support": "Piensa en el beneficio de conversar con adultos de confianza cuando surgen dudas sobre el propio cuerpo.",
      "reveal": "El diálogo con la familia proporciona contención afectiva, información veraz y tranquilidad ante las dudas de la pubertad.",
      "studentReveal": "Porque brinda confianza, calma las dudas y enseña que los cambios son normales."
    }
  ],
  "practice": [
    {
      "context": "Caso 1: Clasificación de caracteres físicos",
      "question": "Identifica si el cambio en el tono de la voz y el aumento acelerado de estatura corresponden a caracteres sexuales primarios o secundarios, y justifica tu respuesta con un criterio biológico.",
      "expected": "Corresponden a caracteres sexuales secundarios, porque se desarrollan durante la pubertad por acción de las hormonas sexuales y no están presentes desde el nacimiento.",
      "success": "¡Excelente precisión! Justificaste la respuesta vinculando la aparición puberal con la acción hormonal.",
      "support": "Aplica la regla de oro: ¿un recién nacido ya tiene voz grave o estirón de estatura, o se manifiestan en la pubertad?",
      "reveal": "Son caracteres sexuales secundarios porque se desarrollan durante la pubertad activados por el sistema endocrino.",
      "studentReveal": "Caracteres secundarios, porque aparecen en la pubertad por acción de las hormonas sexuales."
    },
    {
      "context": "Caso 2: Cambios emocionales y autonomía",
      "question": "Un estudiante de 13 años siente que a veces prefiere estar a solas reflexionando y otras veces necesita el apoyo de sus padres. ¿Es esta conducta un cambio emocional normal de la pubertad? Justifica.",
      "expected": "Sí, es completamente normal, ya que la pubertad involucra la búsqueda de autonomía e identidad personal junto con la necesidad de seguridad afectiva.",
      "success": "¡Exacto! La alternancia entre autonomía y apego familiar es una manifestación afectiva propia de la adolescencia.",
      "support": "Piensa en lo analizado sobre la dimensión emocional: ¿la búsqueda de independencia es parte del crecimiento?",
      "reveal": "Es normal y saludable: la maduración psicológica de la pubertad combina el deseo de autonomía con la necesidad de contención familiar.",
      "studentReveal": "Sí, es normal porque en la pubertad se busca autonomía e identidad personal."
    },
    {
      "context": "Caso 3: Trabajo en el Cuaderno de Ciencias",
      "question": "Abre tu cuaderno de Ciencias Naturales. Traza dos columnas tituladas: 'Caracteres Sexuales Primarios' y 'Caracteres Sexuales Secundarios'. Anota dos ejemplos en cada columna e indica la hormona principal que activa los secundarios.",
      "expected": "Registro completo en cuaderno: primarios (ovarios, útero / testículos, pene) y secundarios (estirón, vello, voz, mamas) con mención a estrógenos o testosterona.",
      "success": "¡Excelente registro en tu cuaderno! Las dos categorías están bien diferenciadas con sus hormonas reguladoras.",
      "support": "Escribe en la primera columna los órganos presentes al nacer y en la segunda los rasgos que aparecen en la pubertad por estrógenos o testosterona.",
      "reveal": "El cuadro sintetiza los caracteres primarios (anatómicos congénitos) y secundarios (inducidos en la pubertad por estrógenos y testosterona).",
      "studentReveal": "Cuadro comparativo completo en el cuaderno con ejemplos y hormonas reguladoras."
    }
  ],
  "mini": [
    {
      "id": "q1",
      "q": "¿Cuál es la glándula endocrina que produce las hormonas encargadas de activar a las gónadas al inicio de la pubertad?",
      "options": [
        "La glándula hipófisis (ubicada en la base del cerebro)",
        "El páncreas (encargado de la digestión)",
        "Las glándulas sudoríparas de la piel"
      ],
      "correct": "La glándula hipófisis (ubicada en la base del cerebro)",
      "fixExplain": "La hipófisis actúa como centro de control del sistema endocrino, liberando gonadotropinas que activan a ovarios y testículos."
    },
    {
      "id": "q2",
      "q": "¿Cuál de los siguientes rasgos corresponde a un carácter sexual secundario en los seres humanos?",
      "options": [
        "El aumento acelerado de estatura (estirón puberal)",
        "La presencia de los ovarios desde el nacimiento",
        "La formación del corazón en la etapa embrionaria"
      ],
      "correct": "El aumento acelerado de estatura (estirón puberal)",
      "fixExplain": "El estirón puberal es un carácter secundario porque aparece en la adolescencia por estímulo de la hormona del crecimiento y hormonas sexuales."
    },
    {
      "id": "q3",
      "q": "Si dos adolescentes de la misma edad inician su pubertad en años distintos, ¿qué principio científico explica esta situación?",
      "options": [
        "Cada cuerpo posee un ritmo biológico individual normal influenciado por factores genéticos y de salud",
        "Significa obligatoriamente que uno de ellos tiene una deficiencia biológica permanente",
        "Todos los seres humanos deben comenzar la pubertad exactamente el mismo día"
      ],
      "correct": "Cada cuerpo posee un ritmo biológico individual normal influenciado por factores genéticos y de salud",
      "fixExplain": "Existe una amplia variabilidad biológica natural: la pubertad suele iniciarse entre los 9 y 15 años sin que ello represente una anomalía."
    }
  ],
  "recovery": [
    {
      "title": "Recuperación: Caracteres Primarios vs Secundarios",
      "explain": "Recuerda el criterio temporal y biológico: los caracteres primarios son los órganos reproductores presentes desde el nacimiento; los secundarios son los cambios corporales que aparecen en la pubertad gracias a las hormonas.",
      "q": "¿Cuál de las siguientes estructuras es un carácter sexual primario?",
      "options": [
        "Los órganos reproductores anatómicos presentes al nacer",
        "El ensanchamiento de hombros durante la pubertad"
      ],
      "correct": "Los órganos reproductores anatómicos presentes al nacer",
      "correctText": "¡Correcto! Los órganos reproductores presentes desde el nacimiento son los caracteres primarios.",
      "fixText": "Recuerda que los caracteres primarios están presentes desde el nacimiento (órganos reproductores)."
    }
  ],
  "summaryIdeas": [
    [
      "1 · Sistema Endocrino",
      "La hipófisis coordina el inicio de la pubertad mediante hormonas que estimulan a las gónadas a producir estrógenos y testosterona."
    ],
    [
      "2 · Primarios vs Secundarios",
      "Los caracteres primarios son los órganos reproductores congénitos; los secundarios son las transformaciones corporales de la adolescencia."
    ],
    [
      "3 · Ritmos Individuales",
      "Cada persona tiene su propio reloj biológico: la pubertad se desarrolla en rangos amplios y diversos con total normalidad."
    ]
  ],
  "interactive": {
    "type": "dimensions",
    "title": "Caracteres Sexuales Primarios y Secundarios",
    "description": "Organizador gráfico comparativo de transformaciones biológicas y hormonales en la pubertad."
  }
};
