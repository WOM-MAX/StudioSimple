export function buildClase03() {
  return {
    metadata: {
      grade: "7° Básico",
      subject: "Ciencias Naturales",
      oaCode: "OA 1",
      oaTitle: "Sexualidad y Afectividad",
      lessonNumber: 3,
      totalLessonsInOa: 6,
      lessonTitle: "Vínculos Afectivos, Respeto Mutuo e Intimidad",
      durationMinutes: 30,
      nextLessonTitle: "Responsabilidad individual, autocuidado y consentimiento"
    },
    prep: {
      adultObjective: "Guiar al estudiante a reflexionar sobre la importancia de las relaciones interpersonales basadas en el respeto mutuo, la reciprocidad, la empatía y la preservación de la intimidad personal y familiar.",
      routeToday: "Comprender la dimensión afectiva de la sexualidad humana, reconociendo el valor de la confianza, el diálogo empático y el cuidado de los espacios de intimidad en la familia y con amigos.",
      mentorReminder: "Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. El contenido pedagógico y las respuestas esperadas te indican con total precisión qué debe responder el estudiante.",
      reminders: [
        "La afectividad es un componente inseparable de la sexualidad humana.",
        "Lee en voz alta únicamente los textos con la etiqueta DILE o PREGÚNTALE.",
        "Promueve la empatía y el respeto por los límites personales de cada persona.",
        "Valora la reflexión ética y afectiva del estudiante."
      ],
      emotionalTip: "Genera un ambiente de confianza y escucha respetuosa. Reconocer los propios sentimientos y aprender a compartirlos es clave para la salud mental."
    },
    route: {
      blocks: [
        { id: "b1", number: "01", title: "Ciencias Naturales", subtitle: "Dimensión Afectiva", color: "teal" },
        { id: "b2", number: "02", title: "Relaciones Interpersonales", subtitle: "Respeto, Empatía e Intimidad", color: "orange" },
        { id: "b3", number: "03", title: "Práctica", subtitle: "Casos y Cuaderno de Ciencias", color: "yellow" },
        { id: "b4", number: "04", title: "Evaluación", subtitle: "Miniquiz y Síntesis Formativa", color: "navy" }
      ],
      keyQuestions: [
        { label: "Vínculos afectivos", sub: "Confianza, cariño y reciprocidad en las relaciones" },
        { label: "Comunicación empática", sub: "Escucha activa y resolución dialogada de diferencias" },
        { label: "Intimidad y privacidad", sub: "Cuidado de los espacios personales y familiares" }
      ],
      dileIntro: "Hoy comenzaremos la tercera clase de Ciencias Naturales para 7° Básico: 'Vínculos Afectivos, Respeto Mutuo e Intimidad'.",
      dileObjective: "Comprender cómo la dimensión afectiva orienta nuestras relaciones con amigos y familiares, valorando la empatía, el respeto a los límites del prójimo y la protección de la intimidad personal."
    },
    situation: {
      dilePrompt: "Dos compañeros de curso tienen opiniones distintas sobre cómo organizar una actividad escolar. Uno de ellos propone escuchar las ideas de ambos, dialogar con calma y buscar un acuerdo justo sin imponer su voluntad sobre el otro. ¿Qué actitud afectiva y ética se manifiesta en esta forma de resolver las diferencias?",
      expectedAnswer: "La comunicación empática, el respeto mutuo y la reciprocidad (buscar acuerdos sin presiones ni imposiciones).",
      socraticHint: "Piensa en el valor de ponerse en el lugar del otro y resolver desacuerdos mediante la conversación respetuosa.",
      emotionalTip: "Recuérdale que en una amistad o grupo es natural tener opiniones distintas; lo valioso es resolverlas con respeto.",
      options: [
        {
          label: "Mencionó la empatía, el respeto mutuo o la búsqueda dialogada de acuerdos",
          kind: "correct",
          feedbackText: "¡Exacto! La empatía y el respeto mutuo son la base de los vínculos afectivos sanos y duraderos."
        },
        {
          label: "Sugirió que uno debe ceder siempre o imponerse por la fuerza",
          kind: "needs_support",
          feedbackText: "Imponerse o ignorar la opinión ajena deteriora la confianza. Un vínculo sano se funda en la reciprocidad y el diálogo."
        },
        {
          label: "No sabe o tiene dudas",
          kind: "no_answer",
          feedbackText: "Pista guiada: Es la empatía y el respeto mutuo, que permiten construir acuerdos cuidando los sentimientos de ambas partes."
        }
      ]
    },
    reference: {
      dilePrompt: "En la dimensión afectiva de la sexualidad humana, la intimidad es el espacio reservado y protegido donde compartimos nuestros pensamientos, afectos y vivencias más personales con quienes confiamos plenamente.",
      question: "Con tus propias palabras: ¿por qué es indispensable respetar la intimidad y los límites personales de cada individuo?",
      expectedAnswer: "Porque cada persona tiene derecho a decidir qué comparte, con quién lo comparte y a que su privacidad física y emocional sea respetada.",
      socraticHint: "Piensa en tus propios pensamientos o secretos: ¿te gustaría que alguien los divulgara sin tu autorización?",
      feedbackSuccess: "¡Brillante reflexión! Respetar la intimidad del otro es una manifestación fundamental de la dignidad humana.",
      feedbackSupport: "Recuerda: la intimidad es un derecho individual; nadie debe ser forzado a compartir lo que prefiere mantener en privado."
    },
    hook: {
      title: "El lazo invisible: Empatía y respeto en la amistad",
      dileIntro: "Vamos a observar cómo las relaciones afectivas se enriquecen cuando cultivamos la empatía sincera, la lealtad y el cuidado de los límites personales.",
      hazInstruction: "Presta atención a cómo la escucha activa transforma los conflictos y observa cómo la intimidad protege el bienestar emocional.",
      videoSrc: "",
      focusPoints: [
        "Vínculos afectivos: relaciones basadas en el cariño, la confianza y la honestidad.",
        "Empatía: capacidad de comprender los sentimientos y perspectivas de los demás.",
        "Intimidad personal: espacio de privacidad física, emocional y digital.",
        "Respeto mutuo: valorar la dignidad de cada persona sin presiones ni burlas."
      ],
      dileAfterVideo: "Conversemos sobre lo observado en el video. Te haré dos preguntas para profundizar en el valor de los afectos.",
      slides: [
        {
          slideNumber: 1,
          tituloMomento: "Apertura y el Valor de la Amistad",
          didacticPurpose: "Apertura y el Valor de la Amistad",
          visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, sharing a peaceful conversation on a wooden bench in a sunlit school courtyard. Warm morning light, clean negative space in upper third. No text drawn by AI.",
          overlayText: "Misión 3: Vínculos Afectivos",
          overlayTitle: "Misión 3: El poder de la empatía",
          overlaySubtitle: "Construir relaciones basadas en la confianza",
          vectorialOverlayPptx: "Red de interacción positiva: Confianza recíproca, diálogo sincero y aprecio mutuo",
          mathOverlayPptx: "Red de interacción positiva: Confianza recíproca, diálogo sincero y aprecio mutuo",
          speakerNotes: "Comienza una nueva expedición en ciencias. Los seres humanos somos sociales por naturaleza y nuestros vínculos afectivos determinan nuestra felicidad y salud mental.",
          palabrasAprox: 21,
          duracionSeg: 9
        },
        {
          slideNumber: 2,
          tituloMomento: "La Escucha Activa y la Empatía",
          didacticPurpose: "La Escucha Activa y la Empatía",
          visualPrompt: "Modern anime style. Close-up of the two young students listening attentively to each other, soft glowing emblem of a heart connecting with an open ear. Clean lines. No text drawn by AI.",
          overlayText: "Empatía: Escuchar para Comprender",
          overlayTitle: "La escucha activa",
          overlaySubtitle: "Comprender los sentimientos del compañero",
          vectorialOverlayPptx: "Capa comunicativa: Escucha atenta sin interrumpir -> Validación emocional",
          mathOverlayPptx: "Capa comunicativa: Escucha atenta sin interrumpir -> Validación emocional",
          speakerNotes: "La empatía consiste en ponerse en el lugar del otro. Escuchar con atención sincera permite entender lo que siente nuestro amigo antes de responder.",
          palabrasAprox: 22,
          duracionSeg: 9
        },
        {
          slideNumber: 3,
          tituloMomento: "Reciprocidad y Respeto Mutuo",
          didacticPurpose: "Reciprocidad y Respeto Mutuo",
          visualPrompt: "Modern anime style. The two companions collaborating harmoniously on a science model, smiling and sharing tools with natural ease. Balanced lighting. No text drawn by AI.",
          overlayText: "Reciprocidad: Dar y Recibir",
          overlayTitle: "Respeto mutuo y reciprocidad",
          overlaySubtitle: "Relaciones equilibradas sin imposiciones",
          vectorialOverlayPptx: "Balanza de reciprocidad: Aporte compartido de ideas y respeto de los tiempos ajenos",
          mathOverlayPptx: "Balanza de reciprocidad: Aporte compartido de ideas y respeto de los tiempos ajenos",
          speakerNotes: "Una relación afectiva saludable es recíproca. Ambas partes entregan cuidado, valoran las ideas del otro y no intentan imponer sus gustos por la fuerza.",
          palabrasAprox: 23,
          duracionSeg: 10
        },
        {
          slideNumber: 4,
          tituloMomento: "El Territorio de la Intimidad",
          didacticPurpose: "El Territorio de la Intimidad",
          visualPrompt: "Modern anime style. Illustrated sanctuary icon with an open notebook and an illuminated privacy lock symbol surrounded by soft garden greenery. No text drawn by AI.",
          overlayText: "Intimidad Personal: Espacio Sagrado",
          overlayTitle: "El valor de la intimidad",
          overlaySubtitle: "Pensamientos, emociones y vivencias reservadas",
          vectorialOverlayPptx: "Capa de privacidad: Círculo de intimidad personal protegido por límites claros",
          mathOverlayPptx: "Capa de privacidad: Círculo de intimidad personal protegido por límites claros",
          speakerNotes: "La intimidad es nuestro espacio personal más íntimo. Reúne nuestros pensamientos y vivencias que compartimos solo cuando nos sentimos seguros y en plena confianza.",
          palabrasAprox: 22,
          duracionSeg: 9
        },
        {
          slideNumber: 5,
          tituloMomento: "Intimidad en la Era Digital",
          didacticPurpose: "Intimidad en la Era Digital",
          visualPrompt: "Modern anime style. The two adolescents using a tablet thoughtfully, displaying a glowing shield icon of digital privacy protection. Clean composition. No text drawn by AI.",
          overlayText: "Privacidad en el Mundo Digital",
          overlayTitle: "Cuidado de la intimidad digital",
          overlaySubtitle: "Proteger la privacidad propia y ajena en redes",
          vectorialOverlayPptx: "Escudo digital: Respeto a fotos privadas, contraseñas y mensajes personales",
          mathOverlayPptx: "Escudo digital: Respeto a fotos privadas, contraseñas y mensajes personales",
          speakerNotes: "En el mundo digital, cuidar la intimidad es prioritario. Nunca debemos difundir fotos o mensajes privados de otros sin su autorización expresa e informada.",
          palabrasAprox: 22,
          duracionSeg: 9
        },
        {
          slideNumber: 6,
          tituloMomento: "El Hogar como Refugio Afectivo",
          didacticPurpose: "El Hogar como Refugio Afectivo",
          visualPrompt: "Modern anime style. Warm living room scene where the adolescent characters talk smilingly with loving parents while drinking hot cocoa. Atmospheric golden hour. No text drawn by AI.",
          overlayText: "Familia: Diálogo y Contención",
          overlayTitle: "El apoyo familiar sincero",
          overlaySubtitle: "Espacio de seguridad para compartir inquietudes",
          vectorialOverlayPptx: "Núcleo familiar: Diálogo abierto, afecto incondicional y acompañamiento en dudas",
          mathOverlayPptx: "Núcleo familiar: Diálogo abierto, afecto incondicional y acompañamiento en dudas",
          speakerNotes: "La familia representa el primer espacio de intimidad y afecto. Compartir dudas con honestidad fortalece la autoestima y brinda tranquilidad en momentos de cambio.",
          palabrasAprox: 21,
          duracionSeg: 9
        },
        {
          slideNumber: 7,
          tituloMomento: "La Pregunta Detonante",
          didacticPurpose: "La Pregunta Detonante",
          visualPrompt: "Modern anime style. Both explorers looking towards the viewer with empathy and resolve, holding their notebooks ready. StudioSimple logo. No text drawn by AI.",
          overlayText: "StudioSimple · Ciencias Naturales",
          overlayTitle: "El desafío afectivo",
          overlaySubtitle: "¿Cómo cultivamos vínculos de respeto mutuo?",
          vectorialOverlayPptx: "Pregunta detonante: ¿Qué principio guía una relación sana ante un conflicto?",
          mathOverlayPptx: "Pregunta detonante: ¿Qué principio guía una relación sana ante un conflicto?",
          speakerNotes: "Surge ahora el gran desafío: cuando dos personas enfrentan un desacuerdo, ¿qué principios afectivos y éticos permiten resolverlo con respeto y serenidad?",
          palabrasAprox: 21,
          duracionSeg: 9
        }
      ]
    },
    preQuestions: [
      {
        context: "Empatía frente a la imposición",
        question: "Si dos amigos no están de acuerdo en qué juego elegir, ¿qué diferencia existe entre dialogar con empatía y tratar de imponer una decisión?",
        expected: "Dialogar con empatía busca que ambos se sientan escuchados y conformes, mientras que imponer genera malestar, frustración y debilita la confianza.",
        success: "¡Muy bien analizado! La empatía cuida el lazo de amistad; la imposición lo desgasta.",
        support: "Piensa en cómo te sientes cuando alguien te escucha con calma frente a cuando te obliga a hacer lo que tú no quieres.",
        reveal: "La empatía permite comprender las emociones del otro y construir acuerdos justos, evitando el conflicto destructivo.",
        studentReveal: "Dialogar busca el acuerdo de ambos; imponer crea malestar y rompe la confianza."
      },
      {
        context: "Protección de la intimidad digital",
        question: "¿Por qué compartir una foto privada de un compañero sin su permiso representa una falta grave de respeto a su intimidad?",
        expected: "Porque vulnera su derecho a la privacidad, invade su espacio personal íntimo y puede dañarlo emocionalmente frente a los demás.",
        success: "¡Exacto! El consentimiento y la privacidad son inviolables tanto en el espacio físico como en el digital.",
        support: "Recuerda que cada individuo es dueño de su imagen y su privacidad. ¿Qué pasa cuando alguien la divulga sin permiso?",
        reveal: "Difundir material privado sin consentimiento vulnera la intimidad personal y quebranta la confianza básica de la convivencia.",
        studentReveal: "Porque viola su derecho a la privacidad y puede causarle daño emocional."
      }
    ],
    conversationContext: "Examinaremos cómo el respeto mutuo, la empatía y la protección de la intimidad sustentan los vínculos afectivos saludables.",
    formalization: {
      title: "Vínculos Afectivos y Protección de la Intimidad",
      concept: "Relaciones basadas en la empatía y el respeto a la intimidad",
      summary: "Los vínculos afectivos sanos se fundan en la empatía, la reciprocidad y el respeto irrestricto a los límites personales. La intimidad es el espacio reservado de vivencias y emociones que cada individuo tiene derecho a proteger tanto en su vida cotidiana como en entornos digitales.",
      ideaClave: "Las relaciones afectivas saludables se sustentan en la empatía mutua, la reciprocidad y el respeto incondicional a la intimidad personal y familiar.",
      dileIntro: "Ahora formalizaremos los principios científicos y éticos que rigen los vínculos afectivos en Ciencias Naturales.",
      hazInstruction: "Lee el objetivo en pantalla y revisa con atención el caso modelado de resolución respetuosa de diferencias.",
      videoSrc: "",
      slides: [
        {
          slideNumber: 1,
          tituloMomento: "Objetivo de la Lección",
          didacticPurpose: "Objetivo de la Lección",
          visualPrompt: "Modern anime style 16:9. The boy and girl standing before an elegant triangular diagram: 'Empatía', 'Reciprocidad' y 'Respeto a la Intimidad'. Clear typography. No text drawn by AI.",
          overlayText: "Pilares de las Relaciones Afectivas",
          overlayTitle: "Objetivo de la lección",
          overlaySubtitle: "Explicar el rol de la reciprocidad, la empatía y la intimidad en los vínculos afectivos",
          vectorialOverlayPptx: "Rótulo formal: OA 01 · Vínculos Afectivos, Empatía e Intimidad",
          mathOverlayPptx: "Rótulo formal: OA 01 · Vínculos Afectivos, Empatía e Intimidad",
          speakerNotes: "El objetivo de hoy es explicar el rol fundamental de la reciprocidad, la empatía y el respeto a la intimidad personal en la construcción de vínculos afectivos saludables.",
          palabrasAprox: 26,
          duracionSeg: 12
        },
        {
          slideNumber: 2,
          tituloMomento: "Empatía: El Arte de Conectar",
          didacticPurpose: "Empatía: El Arte de Conectar",
          visualPrompt: "Modern anime style. Illustration of an emotional resonance bridge between two adolescents talking calmly under soft sunlight. Clean lineart. No text drawn by AI.",
          overlayText: "Empatía: Conexión Afectiva",
          overlayTitle: "La empatía en las relaciones",
          overlaySubtitle: "Sintonizar con las emociones del prójimo",
          vectorialOverlayPptx: "Esquema socioafectivo: Reconocer emoción ajena -> Validar sin juzgar -> Responder con afecto",
          mathOverlayPptx: "Esquema socioafectivo: Reconocer emoción ajena -> Validar sin juzgar -> Responder con afecto",
          speakerNotes: "La empatía es la capacidad de percibir y comprender el estado emocional del otro. Favorece la solidaridad, fortalece el apego seguro y previene la violencia en la convivencia.",
          palabrasAprox: 25,
          duracionSeg: 12
        },
        {
          slideNumber: 3,
          tituloMomento: "Reciprocidad: Equilibrio en el Afecto",
          didacticPurpose: "Reciprocidad: Equilibrio en el Afecto",
          visualPrompt: "Modern anime style. Two hands exchanging a puzzle piece of friendship with care and gentleness. Warm ambient glow. No text drawn by AI.",
          overlayText: "Reciprocidad: Cuidado Mutuo",
          overlayTitle: "El principio de reciprocidad",
          overlaySubtitle: "Afecto compartido en igualdad de condiciones",
          vectorialOverlayPptx: "Principio ético: Ninguna persona debe estar sometida a los deseos exclusivos de la otra",
          mathOverlayPptx: "Principio ético: Ninguna persona debe estar sometida a los deseos exclusivos de la otra",
          speakerNotes: "La reciprocidad garantiza que ambas personas se sientan valoradas por igual. Las relaciones sanas no admiten manipulaciones, exigencias desmedidas ni relaciones de poder asimétricas.",
          palabrasAprox: 24,
          duracionSeg: 12
        },
        {
          slideNumber: 4,
          tituloMomento: "La Esfera de la Intimidad",
          didacticPurpose: "La Esfera de la Intimidad",
          visualPrompt: "Modern anime style. The girl writing in a personal diary at her desk, with a soft protective glowing aura around her thoughts. Atmospheric peace. No text drawn by AI.",
          overlayText: "Intimidad: Derecho a la Privacidad",
          overlayTitle: "La intimidad personal",
          overlaySubtitle: "Espacio inviolable de la persona",
          vectorialOverlayPptx: "Matriz de privacidad: Límites corporales, emocionales y personales reconocidos por ley",
          mathOverlayPptx: "Matriz de privacidad: Límites corporales, emocionales y personales reconocidos por ley",
          speakerNotes: "La intimidad comprende la privacidad de nuestro cuerpo, pensamientos y afectos. Respetar la intimidad ajena implica no invadir espacios privados ni forzar confesiones o contactos.",
          palabrasAprox: 25,
          duracionSeg: 12
        },
        {
          slideNumber: 5,
          tituloMomento: "Ciudadanía y Cuidado Digital",
          didacticPurpose: "Ciudadanía y Cuidado Digital",
          visualPrompt: "Modern anime style. Smartphone interface showing respectful chat bubbles and privacy lock shields in cyan and white. Clean modern UI aesthetic. No text drawn by AI.",
          overlayText: "Privacidad Digital: Consentimiento Activo",
          overlayTitle: "Intimidad en medios digitales",
          overlaySubtitle: "Cero tolerancia a la divulgación no autorizada",
          vectorialOverlayPptx: "Regla de oro digital: Lo privado se mantiene privado; compartir requiere permiso explícito",
          mathOverlayPptx: "Regla de oro digital: Lo privado se mantiene privado; compartir requiere permiso explícito",
          speakerNotes: "El entorno digital exige el mismo rigor ético que el presencial. La divulgación de material íntimo sin consentimiento causa daño psicológico y vulnera los derechos fundamentales del adolescente.",
          palabrasAprox: 26,
          duracionSeg: 12
        },
        {
          slideNumber: 6,
          tituloMomento: "Caso Modelado: Resolución de Diferencias",
          didacticPurpose: "Caso Modelado: Resolución de Diferencias",
          visualPrompt: "Modern anime style 16:9. The boy and girl collaborating over an organized project planner, smiling after finding a creative shared solution. High detail. No text drawn by AI.",
          overlayText: "Caso Modelado: Diálogo y Empatía",
          overlayTitle: "Caso Modelado: Resolución Respetuosa",
          overlaySubtitle: "Búsqueda de acuerdos sin presiones ni imposición",
          vectorialOverlayPptx: "Desglose del caso: Posturas opuestas -> Escucha empática -> Negociación compartida -> Vínculo fortalecido",
          mathOverlayPptx: "Desglose del caso: Posturas opuestas -> Escucha empática -> Negociación compartida -> Vínculo fortalecido",
          speakerNotes: "Analicemos un caso concreto: dos amigos debaten sobre cómo resolver una diferencia de opinión sobre un proyecto escolar sin presiones, aplicando diálogo sincero y respeto mutuo. ¿Qué principio afectivo y ético se aplica? Se aplica la comunicación empática y la reciprocidad, escuchando la postura del otro y buscando acuerdos sin forzar la voluntad de nadie.",
          palabrasAprox: 54,
          duracionSeg: 22
        },
        {
          slideNumber: 7,
          tituloMomento: "Síntesis y Regla de Oro",
          didacticPurpose: "Síntesis y Regla de Oro",
          visualPrompt: "Modern anime style. StudioSimple emblem with an elegant tri-color emblem: 'Empatía + Reciprocidad + Intimidad = Vínculo Sano'. Crisp contrast. No text drawn by AI.",
          overlayText: "Regla de Oro: Vínculos Saludables",
          overlayTitle: "Regla de Oro de los vínculos afectivos",
          overlaySubtitle: "Empatía + Reciprocidad + Intimidad = Relaciones Sanas",
          vectorialOverlayPptx: "Infografía de síntesis: La confianza duradera florece donde hay respeto por los límites del prójimo",
          mathOverlayPptx: "Infografía de síntesis: La confianza duradera florece donde hay respeto por los límites del prójimo",
          speakerNotes: "Recuerda la regla de oro: las relaciones sanas se construyen con empatía mutua, reciprocidad y respeto a la intimidad. ¡Ahora demostraremos lo aprendido en las actividades de la plataforma!",
          palabrasAprox: 27,
          duracionSeg: 12
        }
      ]
    },
    postQuestions: [
      {
        context: "Construcción de confianza mutua",
        question: "¿Por qué la reciprocidad y la empatía evitan que una relación de amistad se vuelva perjudicial o tóxica?",
        expected: "Porque aseguran que ambas personas sean tratadas con igual dignidad, evitando que una domine a la otra o se aproveche de sus afectos.",
        success: "¡Excelente análisis! La reciprocidad equilibra la relación y protege la dignidad de ambos.",
        support: "Piensa en qué pasaría si solo uno de los amigos decide todo y el otro tiene que obedecer siempre. ¿Es eso sano?",
        reveal: "La reciprocidad previene el desequilibrio de poder y asegura que los sentimientos y necesidades de ambos sean valorados.",
        studentReveal: "Porque evitan que una persona se imponga sobre la otra y aseguran respeto para ambos."
      },
      {
        context: "Límites claros en la amistad",
        question: "Si un amigo te pide que no le cuentes a nadie algo personal que le ocurrió, ¿qué valor afectivo y ético estás cuidando al guardar el secreto?",
        expected: "El valor de la lealtad, la confianza y el respeto a su intimidad personal.",
        success: "¡Muy bien! Guardar la confidencia demuestra lealtad y resguarda la intimidad del compañero.",
        support: "Piensa en el compromiso tácito de confianza que se establece al compartir un secreto personal.",
        reveal: "Cuidas la intimidad y la confianza, demostrando que eres una persona de fiar y respetuosa de la privacidad ajena.",
        studentReveal: "La confianza, la lealtad y el respeto a su intimidad."
      }
    ],
    practice: [
      {
        context: "Caso 1: Resolución dialogada de diferencias",
        question: "Dos amigos debaten sobre cómo resolver una diferencia de opinión sobre un proyecto escolar sin presiones, aplicando diálogo sincero y respeto mutuo. ¿Qué principio afectivo y ético se aplica en su conducta?",
        expected: "Se aplica la comunicación empática y la reciprocidad, ya que ambos escuchan con respeto la postura del otro y construyen un acuerdo justo sin forzar voluntades.",
        success: "¡Excelente fundamentación! Reconociste la empatía y la reciprocidad como claves para resolver desacuerdos.",
        support: "Fíjate en las actitudes: escuchar con calma, no imponerse y buscar un acuerdo donde ambos ganen. ¿Qué principios representan?",
        reveal: "Se aplica la empatía (escuchar y comprender al otro) y la reciprocidad (compartir decisiones en igualdad de condiciones).",
        studentReveal: "Comunicación empática y reciprocidad: escuchan al otro y llegan a acuerdos justos."
      },
      {
        context: "Caso 2: Cuidado de la intimidad en redes sociales",
        question: "Un grupo de chat propone compartir capturas de pantalla de una conversación privada de una compañera para reírse de sus gustos. Una estudiante dice que eso no es correcto y se niega a participar. ¿Qué derecho y valor ético defiende?",
        expected: "Defiende el derecho a la intimidad y privacidad de su compañera, y demuestra valores de lealtad, empatía y respeto ético.",
        success: "¡Exacto! Poner un freno a la difusión de material privado demuestra una profunda madurez ética y empatía.",
        support: "Piensa en la privacidad de la persona afectada: ¿tenían permiso para difundir sus palabras?",
        reveal: "Defiende el derecho inviolable a la privacidad e intimidad, rechazando la presión de grupo para proteger la dignidad ajena.",
        studentReveal: "El derecho a la intimidad y privacidad, actuando con respeto y empatía hacia su compañera."
      },
      {
        context: "Caso 3: Trabajo en el Cuaderno de Ciencias",
        question: "Abre tu cuaderno de Ciencias Naturales. Dibuja un triángulo con tres vértices titulados: 'Empatía', 'Reciprocidad' y 'Respeto a la Intimidad'. En el centro, escribe un compromiso personal de cómo aplicarás estos tres valores en tu familia o amistades.",
        expected: "Diagrama completo en el cuaderno con los 3 vértices rotulados y un compromiso personal redactado con sentido ético y afectivo.",
        success: "¡Hermoso y reflexivo trabajo en tu cuaderno! Has plasmado los pilares de las relaciones saludables de manera concreta.",
        support: "Traza el triángulo, coloca los tres nombres en las esquinas y redacta una frase que resuma cómo cuidarás a tus amigos y familia.",
        reveal: "El esquema sintetiza cómo la empatía, reciprocidad e intimidad se conjugan en decisiones cotidianas de afecto y cuidado.",
        studentReveal: "Triángulo de las relaciones saludables dibujado con compromiso personal en el cuaderno."
      }
    ],
    mini: [
      {
        id: "q1",
        q: "¿Cuál de las siguientes acciones demuestra una verdadera comunicación empática en una relación de amistad?",
        options: [
          "Escuchar con atención los sentimientos del otro e intentar comprender su perspectiva sin burlarse ni juzgar",
          "Interrumpir constantemente al amigo para demostrar que uno tiene más experiencia",
          "Obligar al compañero a cambiar de opinión para que piense igual que el resto"
        ],
        correct: "Escuchar con atención los sentimientos del otro e intentar comprender su perspectiva sin burlarse ni juzgar",
        fixExplain: "La empatía se fundamenta en la escucha activa, la validación de las emociones del otro y la ausencia de juicio descalificador."
      },
      {
        id: "q2",
        q: "La intimidad personal es un derecho fundamental que protege:",
        options: [
          "Los pensamientos, emociones, vivencias personales y la privacidad del propio cuerpo frente a intromisiones no deseadas",
          "Únicamente los bienes materiales que una persona compra en el supermercado",
          "La obligación de publicar toda la vida personal en redes sociales públicas"
        ],
        correct: "Los pensamientos, emociones, vivencias personales y la privacidad del propio cuerpo frente a intromisiones no deseadas",
        fixExplain: "La intimidad resguarda la esfera privada de la persona: nadie tiene derecho a invadirla ni a divulgarla sin consentimiento."
      },
      {
        id: "q3",
        q: "En una relación afectiva recíproca y respetuosa, ¿qué ocurre cuando surge un desacuerdo?",
        options: [
          "Se dialoga de manera asertiva, buscando acuerdos donde ambas personas sean valoradas",
          "Una de las partes impone su voluntad gritando o amenazando con terminar la amistad",
          "Se ignora el problema fingiendo que no existe hasta que explote en conflicto"
        ],
        correct: "Se dialoga de manera asertiva, buscando acuerdos donde ambas personas sean valoradas",
        fixExplain: "La reciprocidad y el respeto mutuo resuelven los desacuerdos mediante la conversación honesta y la consideración de ambas posturas."
      }
    ],
    recovery: [
      {
        title: "Recuperación: El Valor de la Empatía y la Intimidad",
        explain: "Recuerda que la empatía nos ayuda a comprender los sentimientos de los demás, mientras que el respeto a la intimidad protege el derecho a tener un espacio personal y privado que nadie debe vulnerar sin permiso.",
        q: "¿Qué actitud protege la intimidad de un compañero?",
        options: [
          "No divulgar sus secretos personales ni compartir sus fotografías sin su consentimiento",
          "Publicar sus anécdotas privadas en internet para que otros las comenten"
        ],
        correct: "No divulgar sus secretos personales ni compartir sus fotografías sin su consentimiento",
        correctText: "¡Exacto! Proteger sus secretos y no difundir sus imágenes resguarda su intimidad.",
        fixText: "Recuerda que cuidar la intimidad ajena significa mantener en reserva su vida privada y respetar su consentimiento."
      }
    ],
    summaryIdeas: [
      [
        "1 · Empatía y Escucha",
        "La empatía permite conectar sinceramente con el prójimo, validando sus emociones y resolviendo desacuerdos mediante el diálogo."
      ],
      [
        "2 · Reciprocidad Equilibrada",
        "Las relaciones saludables son simétricas: ambas personas dan y reciben cuidado y respeto sin presiones ni manipulaciones."
      ],
      [
        "3 · Intimidad Sagrada",
        "La privacidad física, emocional y digital es un derecho inalienable que debe protegerse con límites claros y consentimiento."
      ]
    ],
    interactive: {
      type: "dimensions",
      title: "Vínculos Afectivos, Respeto e Intimidad",
      description: "Organizador gráfico de los pilares de la convivencia y el cuidado de los afectos."
    }
  };
}
