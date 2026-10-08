import { LessonData } from '../../types/lesson';

export const CIENCIAS_7B_OA01_CLASE05: LessonData = {
  "metadata": {
    "grade": "7° Básico",
    "subject": "Ciencias Naturales",
    "oaCode": "OA 1",
    "oaTitle": "Sexualidad y Afectividad",
    "lessonNumber": 5,
    "totalLessonsInOa": 6,
    "lessonTitle": "Mitos, Estereotipos y Convivencia Saludable",
    "durationMinutes": 30,
    "nextLessonTitle": "Síntesis Integral y Evaluación Tipo Examen Libre"
  },
  "prep": {
    "adultObjective": "Guiar al estudiante a contrastar mitos y estereotipos sobre la pubertad y la afectividad con la evidencia médica, comprendiendo que el inicio de la pubertad ocurre entre los 8 y 13 años en niñas y 9 y 14 años en niños (Tanner 1962 / MedlinePlus), mientras que el estirón de estatura es un hito posterior no universal que suele presentarse entre los 10 y 16 años según ritmos genéticos individuales.",
    "routeToday": "Analizar falsas creencias sobre el cuerpo y los roles de género, comprender que cada organismo madura a su propio ritmo genético y promover una convivencia respetuosa y solidaria.",
    "mentorReminder": "Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. El contenido pedagógico y las respuestas esperadas te indican con total precisión qué debe responder el estudiante.",
    "reminders": [
      "La variabilidad en el inicio y ritmo de la pubertad es normal y saludable.",
      "Los estereotipos de género limitan la expresión afectiva y dañan la convivencia.",
      "Lee en voz alta únicamente los textos con la etiqueta DILE o PREGÚNTALE.",
      "Fomenta el pensamiento crítico frente a informaciones no científicas en redes sociales."
    ],
    "emotionalTip": "Transmite calma respecto a los tiempos del crecimiento. Muchos adolescentes experimentan inseguridad si ven que sus compañeros crecen antes o después; validar la diversidad alivia la ansiedad."
  },
  "route": {
    "blocks": [
      {
        "id": "b1",
        "number": "01",
        "title": "Ciencias Naturales",
        "subtitle": "Dimensión Sociocultural",
        "color": "teal"
      },
      {
        "id": "b2",
        "number": "02",
        "title": "Mitos y Estereotipos",
        "subtitle": "Evidencia Científica y Convivencia",
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
        "label": "Mitos vs Evidencia",
        "sub": "Desmontar creencias falsas sobre los ritmos del desarrollo"
      },
      {
        "label": "Estereotipos de género",
        "sub": "Superar mandatos rígidos que impiden la libre expresión"
      },
      {
        "label": "Convivencia y empatía",
        "sub": "Aceptación activa de las diferencias y prevención del acoso"
      }
    ],
    "dileIntro": "Hoy comenzaremos la quinta clase de Ciencias Naturales para 7° Básico: 'Mitos, Estereotipos y Convivencia Saludable'.",
    "dileObjective": "Distinguir entre información científica y mitos populares sobre los cambios en la pubertad, comprendiendo que la diversidad de ritmos y la superación de estereotipos son claves para una convivencia armónica."
  },
  "situation": {
    "dilePrompt": "En el patio de un colegio, un estudiante se burla de otro porque todavía no le cambia la voz ni ha pegado el 'estirón', diciéndole que se quedó 'atrasado'. El estudiante afectado se siente triste y avergonzado. Si aplicamos el conocimiento científico sobre la pubertad, ¿por qué esa burla se basa en una creencia completamente falsa e ignorante?",
    "expectedAnswer": "Porque cada persona tiene su propio reloj biológico y ritmo genético de desarrollo; la pubertad puede comenzar entre los 10 y los 14 años sin que eso represente un atraso o problema de salud.",
    "socraticHint": "Recuerda que no todos los cuerpos crecen en el mismo mes ni al mismo ritmo: ¿existe una fecha exacta obligatoria para los cambios puberales?",
    "emotionalTip": "Refuerza la empatía: comprender la biología nos ayuda a defender a quienes sufren burlas y a valorar la diversidad humana.",
    "options": [
      {
        "label": "Explicó que cada cuerpo tiene un ritmo biológico y genético propio y natural",
        "kind": "correct",
        "feedbackText": "¡Excelente! La biología demuestra que la variabilidad en los tiempos de la pubertad es normal y esperable."
      },
      {
        "label": "Dijo que todos los jóvenes deben cambiar a la misma edad exacta",
        "kind": "needs_support",
        "feedbackText": "Cuidado: creer que todos maduran al mismo tiempo es precisamente un mito. La pubertad tiene rangos de varios años."
      },
      {
        "label": "No sabe o tiene dudas",
        "kind": "no_answer",
        "feedbackText": "Pista guiada: Piensa en los factores genéticos y biológicos que hacen que cada ser humano crezca a su propio tiempo."
      }
    ]
  },
  "reference": {
    "dilePrompt": "Un mito es una creencia popular sin sustento empírico que suele generar temores infundados, mientras que un estereotipo es una idea preconcebida y simplificada sobre cómo 'deben' comportarse o sentir las personas según su género o apariencia física.",
    "question": "Con tus propias palabras: ¿por qué es perjudicial para la salud mental y la convivencia escolar creer en estereotipos como 'los hombres no lloran' o 'las mujeres son débiles'?",
    "expectedAnswer": "Porque reprimen las emociones naturales de las personas, generan presiones dañinas y justifican la discriminación o la desigualdad en el trato mutuo.",
    "socraticHint": "Piensa en qué ocurre cuando a alguien se le prohíbe expresar su tristeza o cuando se subestiman las capacidades de una persona.",
    "feedbackSuccess": "¡Exactamente! Las emociones y las capacidades son humanas, no exclusivas de un género; romper estereotipos permite una convivencia sana.",
    "feedbackSupport": "Recuerda que reprimir emociones causa sufrimiento y que limitar las oportunidades por prejuicios atenta contra la dignidad."
  },
  "hook": {
    "title": "Rompiendo espejismos: La ciencia frente a los mitos",
    "dileIntro": "Observaremos cómo la ciencia desmonta los prejuicios que a menudo circulan en las redes sociales y en las conversaciones cotidianas sobre el cuerpo.",
    "hazInstruction": "Identifica en el video cómo el conocimiento riguroso nos libera de inseguridades y fomenta un trato empático entre compañeros.",
    "videoSrc": "",
    "focusPoints": [
      "Variabilidad biológica: el estirón puberal ocurre en ventanas de tiempo amplias.",
      "Mitos corporales: los cambios no son instantáneos ni idénticos para todos.",
      "Estereotipos de género: ideas fijas que limitan la autenticidad personal.",
      "Empatía escolar: erradicar las burlas basadas en la apariencia o el desarrollo."
    ],
    "dileAfterVideo": "Comentemos lo observado en el video. Te haré dos preguntas para profundizar en el impacto de los mitos.",
    "slides": [
      {
        "slideNumber": 1,
        "tituloMomento": "Apertura y el Desafío de los Mitos",
        "didacticPurpose": "Apertura y el Desafío de los Mitos",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, reviewing a digital display that debunks popular adolescent myths with verified scientific evidence, with generous negative space for text overlays. No text drawn by AI.",
        "overlayText": "Misión 5: Mitos y Convivencia Saludable",
        "overlayTitle": "Misión 5: Ciencia vs Mitos",
        "overlaySubtitle": "Desarmar prejuicios con evidencia y respeto mutuo",
        "vectorialOverlayPptx": "Ruta de exploración: Creencias populares -> Contraste científico -> Convivencia armónica",
        "mathOverlayPptx": "Ruta de exploración: Creencias populares -> Contraste científico -> Convivencia armónica",
        "speakerNotes": "Comienza una expedición de pensamiento crítico en ciencias. Alrededor de la pubertad circulan muchas creencias populares que no tienen respaldo científico.",
        "palabrasAprox": 21,
        "duracionSeg": 10
      },
      {
        "slideNumber": 2,
        "tituloMomento": "El Espejismo de la Homogeneidad",
        "didacticPurpose": "El Espejismo de la Homogeneidad",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, observing a distorted mirror being replaced with a clean, realistic medical illustration of pubertal growth, with generous negative space for text overlays. No text drawn by AI.",
        "overlayText": "Diversidad: Ningún Cuerpo es Idéntico",
        "overlayTitle": "No existen moldes únicos",
        "overlaySubtitle": "La naturaleza celebra la diversidad biológica",
        "vectorialOverlayPptx": "Variabilidad del crecimiento: Estirón de estatura con amplia dispersión saludable (Tanner / MedlinePlus)",
        "mathOverlayPptx": "Variabilidad del crecimiento: Estirón de estatura con amplia dispersión saludable (Tanner / MedlinePlus)",
        "speakerNotes": "Muchos creen que todos los adolescentes deben pegar el estirón al mismo tiempo. La biología demuestra que cada cuerpo tiene su propio reloj genético.",
        "palabrasAprox": 24,
        "duracionSeg": 11
      },
      {
        "slideNumber": 3,
        "tituloMomento": "El Mito del 'Atraso' Corporal",
        "didacticPurpose": "El Mito del 'Atraso' Corporal",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, in a modern science classroom observing blank modular panels representing the height growth spurt window (between ages 10 and 16, distinct from earlier pubertal onset), with generous negative space for text overlays. No text drawn by AI.",
        "overlayText": "El Reloj Biológico Personal",
        "overlayTitle": "El reloj biológico individual",
        "overlaySubtitle": "La genética define el calendario de maduración",
        "vectorialOverlayPptx": "Factores de sincronía: Herencia genética + Estado nutricional + Factores ambientales equilibrados",
        "mathOverlayPptx": "Factores de sincronía: Herencia genética + Estado nutricional + Factores ambientales equilibrados",
        "speakerNotes": "El estirón de estatura suele ocurrir como un hito posterior de la pubertad (habitualmente entre los 10 y 16 años según Tanner y MedlinePlus), mientras el inicio puberal ocurre antes (8-13 años en niñas y 9-14 en niños según MedlinePlus). Crecer a ritmos distintos es completamente normal.",
        "palabrasAprox": 25,
        "duracionSeg": 11
      },
      {
        "slideNumber": 4,
        "tituloMomento": "Estereotipos que Limitan Emociones",
        "didacticPurpose": "Estereotipos que Limitan Emociones",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, collaborating in a science lab with robotics tools and culinary chemistry, demonstrating equal capabilities without gender stereotypes, with generous negative space for text overlays. No text drawn by AI.",
        "overlayText": "Emociones Sin Etiquetas de Género",
        "overlayTitle": "Sentir es una cualidad humana",
        "overlaySubtitle": "Las emociones y valores no tienen género",
        "vectorialOverlayPptx": "Esquema de equidad: Reconocimiento emocional pleno y superación de mandatos culturales restrictivos",
        "mathOverlayPptx": "Esquema de equidad: Reconocimiento emocional pleno y superación de mandatos culturales restrictivos",
        "speakerNotes": "Los estereotipos de género también son mitos culturales sin base biológica. Hombres y mujeres tienen iguales capacidades cognitivas, artísticas y científicas.",
        "palabrasAprox": 21,
        "duracionSeg": 10
      },
      {
        "slideNumber": 5,
        "tituloMomento": "El Filtro Crítico de las Redes",
        "didacticPurpose": "El Filtro Crítico de las Redes",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, holding a glowing magnifying glass revealing verified biological facts over misleading social media headlines, with generous negative space for text overlays. No text drawn by AI.",
        "overlayText": "Filtro Crítico Digital",
        "overlayTitle": "Discernimiento digital",
        "overlaySubtitle": "Comprobar fuentes antes de creer rumores virales",
        "vectorialOverlayPptx": "Criterios de verificación: Fuentes médicas oficiales vs Cuentas comerciales con imágenes retocadas",
        "mathOverlayPptx": "Criterios de verificación: Fuentes médicas oficiales vs Cuentas comerciales con imágenes retocadas",
        "speakerNotes": "El acné puberal responde a estímulos hormonales en las glándulas sebáceas, no a la suciedad ni a castigos imaginarios.",
        "palabrasAprox": 19,
        "duracionSeg": 9
      },
      {
        "slideNumber": 6,
        "tituloMomento": "Construir Espacios de Confianza",
        "didacticPurpose": "Construir Espacios de Confianza",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, celebrating diverse talents and unique growth trajectories with classmates in an inclusive classroom, with generous negative space for text overlays. No text drawn by AI.",
        "overlayText": "Convivencia Empática y Respeto",
        "overlayTitle": "Comunidad escolar protectora",
        "overlaySubtitle": "Erradicar apodos y burlas sobre el cuerpo",
        "vectorialOverlayPptx": "Principios de convivencia: Cero tolerancia a la burla corporal + Apoyo entre pares + Solidaridad activa",
        "mathOverlayPptx": "Principios de convivencia: Cero tolerancia a la burla corporal + Apoyo entre pares + Solidaridad activa",
        "speakerNotes": "Aprender a buscar información en fuentes médicas oficiales nos protege de la desinformación y fortalece nuestra autoestima y seguridad personal.",
        "palabrasAprox": 20,
        "duracionSeg": 9
      },
      {
        "slideNumber": 7,
        "tituloMomento": "Cierre y Preparación para el Rigor",
        "didacticPurpose": "Cierre y Preparación para el Rigor",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, holding open science notebooks, ready to debunk myths and analyze evidence in an organized study room, with generous negative space for text overlays. No text drawn by AI.",
        "overlayText": "Ciencia y Convivencia",
        "overlayTitle": "Hacia la comprensión científica",
        "overlaySubtitle": "Profundicemos en los fundamentos biológicos",
        "vectorialOverlayPptx": "Conexión conceptual: Comprensión biológica integral -> Actitudes éticas de convivencia",
        "mathOverlayPptx": "Conexión conceptual: Comprensión biológica integral -> Actitudes éticas de convivencia",
        "speakerNotes": "Surge ahora la pregunta clave: cuando escuchamos una afirmación sobre el desarrollo adolescente, ¿cómo usamos la evidencia científica para evaluarla?",
        "palabrasAprox": 20,
        "duracionSeg": 9
      }
    ]
  },
  "preQuestions": [
    {
      "context": "Identificación de mitos comunes",
      "question": "¿Por qué afirmar que 'el acné surge exclusivamente por falta de aseo facial' es un mito biológico?",
      "expected": "Porque el acné en la pubertad se debe principalmente al estímulo hormonal de las glándulas sebáceas y factores genéticos, no solo a la higiene.",
      "success": "¡Exacto! Las hormonas aumentan la secreción sebácea; la higiene ayuda pero no es la causa única ni principal.",
      "support": "Recuerda el rol de las hormonas sexuales: ¿qué glándulas de la piel se estimulan durante la pubertad?",
      "reveal": "El acné puberal responde a la actividad hormonal sobre las glándulas sebáceas, combinada con factores genéticos.",
      "studentReveal": "Porque el acné se debe a las hormonas y a la genética, no solo al lavado de la cara."
    },
    {
      "context": "Superación de estereotipos",
      "question": "¿Cómo favorece a la convivencia escolar que niños y niñas compartan intereses científicos, deportivos y artísticos sin prejuicios de género?",
      "expected": "Permite que cada estudiante desarrolle sus talentos con libertad, fomenta el respeto recíproco y elimina barreras artificiales de convivencia.",
      "success": "¡Muy bien argumentado! La igualdad de oportunidades enriquece a toda la comunidad escolar.",
      "support": "Piensa en el beneficio de poder elegir libremente lo que nos apasiona sin temor a ser juzgados.",
      "reveal": "Compartir actividades sin sesgos amplía el aprendizaje mutuo y consolida una cultura de respeto e inclusión.",
      "studentReveal": "Permite que todos desarrollen sus gustos y talentos libremente con respeto mutuo."
    }
  ],
  "conversationContext": "Analizaremos cómo el conocimiento biológico de la variabilidad humana desmantela los mitos y fundamenta la convivencia empática.",
  "formalization": {
    "title": "Variabilidad Biológica, Mitos y Convivencia Saludable",
    "concept": "Fundamentos científicos de la diversidad puberal y equidad de género",
    "summary": "La pubertad presenta una amplia variabilidad biológica normal en sus tiempos de inicio y progresión. Los mitos sobre el desarrollo corporal y los estereotipos de género carecen de validez científica y generan malestar psicológico. La comprensión de estos fenómenos fortalece la empatía y la convivencia pacífica.",
    "ideaClave": "La variabilidad en el ritmo del desarrollo es una manifestación normal de la biología humana; desterrar mitos y estereotipos asegura una convivencia libre de discriminación.",
    "dileIntro": "Formalizaremos la evidencia médica sobre los rangos de la pubertad y examinaremos un caso modelado de refutación de mitos.",
    "hazInstruction": "Observa los rangos etarios formales y revisa con atención la resolución del caso de variabilidad en el crecimiento.",
    "videoSrc": "",
    "slides": [
      {
        "slideNumber": 1,
        "tituloMomento": "Objetivo y Conceptos Fundamentales",
        "didacticPurpose": "Objetivo y Conceptos Fundamentales",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing in front of a split-screen display contrasting popular myths with verified biological evidence, with generous negative space for text overlays. No text drawn by AI.",
        "overlayText": "Objetivo: Mitos y Evidencia Científica",
        "overlayTitle": "Objetivo de la lección",
        "overlaySubtitle": "Analizar la variabilidad puberal y superar estereotipos",
        "vectorialOverlayPptx": "Rótulo formal: OA 01 · Variabilidad Biológica, Mitos y Convivencia Saludable",
        "mathOverlayPptx": "Rótulo formal: OA 01 · Variabilidad Biológica, Mitos y Convivencia Saludable",
        "speakerNotes": "El objetivo de la lección es refutar mitos sobre la pubertad usando evidencia biológica y criterios de salud integral.",
        "palabrasAprox": 19,
        "duracionSeg": 9
      },
      {
        "slideNumber": 2,
        "tituloMomento": "Rangos Normales del Inicio Puberal",
        "didacticPurpose": "Rangos Normales del Inicio Puberal",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, in a modern science laboratory observing blank modular comparison panels on a digital display, with generous negative space for text overlays. No text drawn by AI.",
        "overlayText": "Ventanas de Tiempo del Desarrollo",
        "overlayTitle": "Rangos biológicos de la pubertad",
        "overlaySubtitle": "Inicio puberal y sus variaciones habituales",
        "vectorialOverlayPptx": "Inicio puberal habitual: 8 a 13 años en niñas y 9 a 14 años en niños (MedlinePlus / OMS)",
        "mathOverlayPptx": "Inicio puberal habitual: 8 a 13 años en niñas y 9 a 14 años en niños (MedlinePlus / OMS)",
        "speakerNotes": "El inicio de la pubertad varía entre personas: suele ocurrir entre los 8 y 13 años en niñas y entre los 9 y 14 en niños según MedlinePlus y la OMS. Este inicio habitual no debe confundirse con el momento del estirón de estatura, que ocurre en etapas posteriores.",
        "palabrasAprox": 25,
        "duracionSeg": 11
      },
      {
        "slideNumber": 3,
        "tituloMomento": "Factores que Regulan el Crecimiento",
        "didacticPurpose": "Factores que Regulan el Crecimiento",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, visualizing neural pathways and equal cognitive capabilities across diverse vocations and scientific fields, with generous negative space for text overlays. No text drawn by AI.",
        "overlayText": "Factores de Regulación Biológica",
        "overlayTitle": "Qué determina el ritmo de maduración",
        "overlaySubtitle": "Interacción entre herencia, hormonas y ambiente",
        "vectorialOverlayPptx": "Ecuación multifactorial: Crecimiento = Genética (herencia) + Endocrino (GH y esteroides) + Nutrición y descanso",
        "mathOverlayPptx": "Ecuación multifactorial: Crecimiento = Genética (herencia) + Endocrino (GH y esteroides) + Nutrición y descanso",
        "speakerNotes": "El desarrollo puberal no es una carrera. Quienes experimentan cambios tempranos o tardíos alcanzan igualmente la madurez biológica completa con salud.",
        "palabrasAprox": 21,
        "duracionSeg": 10
      },
      {
        "slideNumber": 4,
        "tituloMomento": "Desmontando los Estereotipos de Género",
        "didacticPurpose": "Desmontando los Estereotipos de Género",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, examining a scientific anatomical model of skin glands and hormonal changes during puberty, with generous negative space for text overlays. No text drawn by AI.",
        "overlayText": "Desmontando Estereotipos de Género",
        "overlayTitle": "Libre desarrollo de la personalidad",
        "overlaySubtitle": "Habilidades y emociones compartidas",
        "vectorialOverlayPptx": "Cuadro de equidad: Capacidades intelectuales, creativas y emocionales idénticas entre géneros",
        "mathOverlayPptx": "Cuadro de equidad: Capacidades intelectuales, creativas y emocionales idénticas entre géneros",
        "speakerNotes": "Los estereotipos que asignan roles rígidos carecen de fundamento científico. Los estereotipos sociales no deben limitar los intereses, talentos ni oportunidades de cada estudiante.",
        "palabrasAprox": 26,
        "duracionSeg": 12
      },
      {
        "slideNumber": 5,
        "tituloMomento": "El Impacto Psicológico del Juicio Externo",
        "didacticPurpose": "El Impacto Psicológico del Juicio Externo",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, fostering an inclusive and supportive environment with classmates in a bright classroom, rejecting teasing and body judgment, with generous negative space for text overlays. No text drawn by AI.",
        "overlayText": "Prevención del Acoso y Cuidado Emocional",
        "overlayTitle": "Efectos del juicio y la burla",
        "overlaySubtitle": "Fomentar un entorno escolar seguro",
        "vectorialOverlayPptx": "Mecanismo protector: Validación entre pares + Comunicación asertiva + Cero burlas corporales",
        "mathOverlayPptx": "Mecanismo protector: Validación entre pares + Comunicación asertiva + Cero burlas corporales",
        "speakerNotes": "Las burlas sobre el cuerpo pueden generar inseguridad y aislamiento. Promover un entorno escolar seguro exige empatía, detener los comentarios dañinos y recordar que cada persona vive su desarrollo a su propio ritmo.",
        "palabrasAprox": 24,
        "duracionSeg": 11
      },
      {
        "slideNumber": 6,
        "tituloMomento": "Caso Modelado: El Mito del Estirón Puberal",
        "didacticPurpose": "Caso Modelado: El Mito del Estirón Puberal",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, analyzing an illustrated growth-percentile chart on their desk, comparing curves with calm scientific smiles, with generous negative space for text overlays. No text drawn by AI.",
        "overlayText": "Caso Modelado: Variabilidad en el Estirón",
        "overlayTitle": "Caso 1: El mito del estirón puberal simultáneo",
        "overlaySubtitle": "Variabilidad biológica y ritmos genéticos de crecimiento",
        "vectorialOverlayPptx": "Caso 1 modelado: Estudiante de 13 años con angustia por estirón -> Evidencia científica: ritmos genéticos normales (10 a 16 años) -> Desarrollo biológico saludable",
        "mathOverlayPptx": "Caso 1 modelado: Estudiante de 13 años con angustia por estirón -> Evidencia científica: ritmos genéticos normales (10 a 16 años) -> Desarrollo biológico saludable",
        "speakerNotes": "Analicemos el Caso 1: un estudiante de 13 años siente angustia porque varios compañeros ya tuvieron el estirón puberal y él aún no, creyendo que tiene un problema de salud o no crecerá. ¿Qué evidencia biológica desmiente este mito? La evidencia indica que el estirón puberal no ocurre a la misma edad para todos; responde a ritmos genéticos individuales que se extienden normalmente entre los 10 y los 16 años, por lo que su desarrollo es biológicamente normal y no constituye una anomalía.",
        "palabrasAprox": 85,
        "duracionSeg": 38
      },
      {
        "slideNumber": 7,
        "tituloMomento": "Síntesis y Compromiso con la Convivencia",
        "didacticPurpose": "Síntesis y Compromiso con la Convivencia",
        "visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, presenting an illustrated scientific evidence board dispelling common myths about puberty, with generous negative space for text overlays. No text drawn by AI.",
        "overlayText": "Síntesis: Ciencia, Respeto y Empatía",
        "overlayTitle": "Regla de Oro frente a los mitos",
        "overlaySubtitle": "Comprender la biología para convivir mejor",
        "vectorialOverlayPptx": "Infografía final: Conocimiento científico -> Eliminación de prejuicios -> Convivencia armónica",
        "mathOverlayPptx": "Infografía final: Conocimiento científico -> Eliminación de prejuicios -> Convivencia armónica",
        "speakerNotes": "Recuerda la regla de oro: la ciencia desmiente prejuicios; cada cuerpo crece a su propio ritmo genético. ¡Ahora pon a prueba lo aprendido resolviendo las actividades prácticas en la plataforma interactiva!",
        "palabrasAprox": 29,
        "duracionSeg": 13
      }
    ]
  },
  "postQuestions": [
    {
      "context": "Caso 1: El mito del estirón puberal simultáneo",
      "question": "Un estudiante de 13 años siente angustia porque varios compañeros ya tuvieron el estirón puberal y él aún no, creyendo erróneamente que tiene un problema de salud o no crecerá. ¿Qué evidencia científica y biológica desmiente este mito y cómo debe explicarse?",
      "expected": "La evidencia indica que el estirón puberal no ocurre a la misma edad para todos; responde a ritmos genéticos individuales que se extienden normalmente entre los 10 y los 16 años, por lo que su desarrollo es biológicamente normal y no constituye una anomalía.",
      "success": "¡Excelente resolución! Has contrastado el mito con la evidencia médica de la variabilidad biológica del crecimiento.",
      "support": "Recuerda las curvas de desarrollo de la OMS: ¿es normal que algunos jóvenes peguen el estirón antes y otros después?",
      "reveal": "El crecimiento sigue curvas individuales reguladas por la genética y las hormonas en una ventana de varios años; no estar en el primer grupo no indica ninguna enfermedad.",
      "studentReveal": "La evidencia demuestra que el estirón ocurre en distintas edades según los genes de cada persona, entre los 10 y 16 años, siendo totalmente normal."
    },
    {
      "context": "Caso 2: Superación de estereotipos en el aula",
      "question": "En una clase de tecnología y robótica, un grupo afirma que los puestos de programación son solo para hombres y que las mujeres deberían dedicarse solo a la decoración del proyecto. ¿Por qué esta afirmación es un estereotipo sin fundamento y qué impacto negativo genera?",
      "expected": "Es un estereotipo infundado porque no existe diferencia biológica o cognitiva en la capacidad intelectual o tecnológica entre géneros; genera discriminación, limita el desarrollo vocacional de las alumnas y empobrece el trabajo en equipo.",
      "success": "¡Muy bien analizado! La ciencia cognitiva confirma que el intelecto y el talento no dependen del género biológico.",
      "support": "Fíjate en las capacidades intelectuales: ¿hay cerebros masculinos o femeninos para programar o es una habilidad universal?",
      "reveal": "Los estereotipos de género limitan el talento humano sobre la base de prejuicios culturales sin base biológica ni psicológica.",
      "studentReveal": "Es un estereotipo porque hombres y mujeres tienen la misma capacidad mental para programar y hacer ciencia."
    }
  ],
  "practice": [
    {
      "context": "Caso 1: El mito del estirón puberal simultáneo",
      "question": "Un estudiante de 13 años siente angustia porque varios compañeros ya tuvieron el estirón puberal y él aún no, creyendo erróneamente que tiene un problema de salud o no crecerá. ¿Qué evidencia científica y biológica desmiente este mito y cómo debe explicarse?",
      "expected": "La evidencia indica que el estirón puberal no ocurre a la misma edad para todos; responde a ritmos genéticos individuales que se extienden normalmente entre los 10 y los 16 años, por lo que su desarrollo es biológicamente normal y no constituye una anomalía.",
      "success": "¡Excelente resolución! Has contrastado el mito con la evidencia médica de la variabilidad biológica del crecimiento.",
      "support": "Recuerda las curvas de desarrollo de la OMS: ¿es normal que algunos jóvenes peguen el estirón antes y otros después?",
      "reveal": "El crecimiento sigue curvas individuales reguladas por la genética y las hormonas en una ventana de varios años; no estar en el primer grupo no indica ninguna enfermedad.",
      "studentReveal": "La evidencia demuestra que el estirón ocurre en distintas edades según los genes de cada persona, entre los 10 y 16 años, siendo totalmente normal."
    },
    {
      "context": "Caso 2: Superación de estereotipos en el aula",
      "question": "En una clase de tecnología y robótica, un grupo afirma que los puestos de programación son solo para hombres y que las mujeres deberían dedicarse solo a la decoración del proyecto. ¿Por qué esta afirmación es un estereotipo sin fundamento y qué impacto negativo genera?",
      "expected": "Es un estereotipo infundado porque no existe diferencia biológica o cognitiva en la capacidad intelectual o tecnológica entre géneros; genera discriminación, limita el desarrollo vocacional de las alumnas y empobrece el trabajo en equipo.",
      "success": "¡Muy bien analizado! La ciencia cognitiva confirma que el intelecto y el talento no dependen del género biológico.",
      "support": "Fíjate en las capacidades intelectuales: ¿hay cerebros masculinos o femeninos para programar o es una habilidad universal?",
      "reveal": "Los estereotipos de género limitan el talento humano sobre la base de prejuicios culturales sin base biológica ni psicológica.",
      "studentReveal": "Es un estereotipo porque hombres y mujeres tienen la misma capacidad mental para programar y hacer ciencia."
    },
    {
      "context": "Caso 3: Trabajo en el Cuaderno de Ciencias",
      "question": "Abre tu cuaderno de Ciencias Naturales. Traza una tabla de dos columnas con el encabezado: 'Mito Popular vs Realidad Científica'. Escribe al menos dos mitos frecuentes sobre el cuerpo adolescente y su correspondiente refutación basada en la biología y la salud integral.",
      "expected": "Tabla completada con dos contrastes rigurosos (por ejemplo: Mito 1: 'Todos deben crecer al mismo tiempo' / Realidad: 'Existe variabilidad genética normal'; Mito 2: 'El acné es por mala higiene' / Realidad: 'Es un proceso hormonal y genético').",
      "success": "¡Trabajo sobresaliente en tu cuaderno! Has documentado la verdad científica frente a las creencias populares.",
      "support": "Elige dos mitos revisados en la lección y escribe al lado por qué la ciencia demuestra lo contrario con hechos biológicos.",
      "reveal": "El cuadro comparativo consolida el pensamiento crítico y la capacidad de discernimiento científico frente a la desinformación.",
      "studentReveal": "Tabla comparativa de mitos y realidades científicas registrada detalladamente en el cuaderno."
    }
  ],
  "mini": [
    {
      "id": "q1",
      "q": "La variabilidad en el inicio habitual de la pubertad (8 a 13 años en niñas y 9 a 14 en niños) demuestra que:",
      "options": [
        "Quienes comienzan más tarde presentan obligatoriamente una deficiencia grave",
        "Cada organismo tiene un ritmo biológico y genético individual dentro de rangos normales de salud",
        "Todos los adolescentes deberían recibir tratamientos hormonales para igualar su crecimiento",
        "La estatura final depende exclusivamente de comenzar la pubertad de manera temprana"
      ],
      "correct": "Cada organismo tiene un ritmo biológico y genético individual dentro de rangos normales de salud",
      "fixExplain": "La variabilidad cronológica en el inicio puberal es normal y saludable; cada persona tiene su propio ritmo genético."
    },
    {
      "id": "q2",
      "q": "¿Cuál de las siguientes afirmaciones sobre los estereotipos sociales de género está respaldada por la ciencia?",
      "options": [
        "Son leyes biológicas inmutables determinadas estrictamente por los cromosomas",
        "Permiten organizar la sociedad asignando tareas según el potencial cerebral de cada sexo",
        "Los estereotipos sociales no deben limitar los intereses, talentos ni oportunidades de cada estudiante",
        "La neurociencia demuestra que los gustos e intereses están prefijados por el sexo al nacer"
      ],
      "correct": "Los estereotipos sociales no deben limitar los intereses, talentos ni oportunidades de cada estudiante",
      "fixExplain": "Los estereotipos son construcciones culturales arbitrarias; cada estudiante debe desarrollar plenamente sus intereses, talentos y oportunidades."
    },
    {
      "id": "q3",
      "q": "Una actitud que promueve activamente una convivencia saludable en la escuela es:",
      "options": [
        "Reírse de las burlas corporales para demostrar sentido del humor en el grupo",
        "Respetar la apariencia física y los ritmos personales de todos, rechazando apodos y juicios sobre el cuerpo",
        "Aconsejar a los compañeros que oculten sus emociones para no mostrar debilidad",
        "Juzgar a quienes crecen más lento o más rápido que el promedio del curso"
      ],
      "correct": "Respetar la apariencia física y los ritmos personales de todos, rechazando apodos y juicios sobre el cuerpo",
      "fixExplain": "El respeto incondicional por la corporalidad de los pares es el cimiento de una convivencia escolar pacífica y acogedora."
    }
  ],
  "recovery": [
    {
      "title": "Recuperación: La Normalidad de la Diversidad",
      "explain": "Recuerda que los seres humanos no somos réplicas idénticas de una fábrica. La altura, el momento del cambio de voz y la complexión física dependen de la herencia de nuestros padres y abuelos. No existe una edad fija obligatoria para cambiar.",
      "q": "¿Es motivo de alarma médica que dos amigos de la misma edad tengan estaturas y etapas de maduración distintas?",
      "options": [
        "Sí, porque todos los seres humanos deben crecer exactamente la misma cantidad de centímetros al mes",
        "No, porque la diversidad de ritmos y tiempos es normal; ante dudas se consulta a un profesional de salud",
        "Sí, porque las diferencias de estatura indican una anomalía biológica inmediata",
        "Sí, porque el estirón debe ocurrir exactamente en la misma fecha en todos los adolescentes"
      ],
      "correct": "No, porque la diversidad de ritmos y tiempos es normal; ante dudas se consulta a un profesional de salud",
      "correctText": "¡Exacto! La biología se caracteriza por la diversidad; las diferencias de ritmo son esperables y saludables.",
      "fixText": "Recuerda que cada individuo posee un reloj biológico propio; las diferencias entre pares de la misma edad son normales."
    }
  ],
  "summaryIdeas": [
    [
      "1 · Variabilidad Biológica Natural",
      "El inicio y la velocidad de los cambios puberales varían ampliamente entre individuos según factores genéticos y ambientales saludables."
    ],
    [
      "2 · Superación de Estereotipos",
      "Los prejuicios sobre roles de género o mandatos emocionales limitan el bienestar y carecen de respaldo biológico o neurocientífico."
    ],
    [
      "3 · Empatía y Convivencia Digna",
      "Erradicar los comentarios sobre los cuerpos ajenos y apoyar a los compañeros consolida una comunidad escolar basada en el respeto."
    ]
  ],
  "interactive": {
    "type": "dimensions",
    "title": "Mitos vs Realidad Científica",
    "description": "Explorador interactivo de variabilidad biológica y refutación de estereotipos de género."
  },
  "paso8_cierre": {
    "preguntaSintesis": "¿Por qué la evidencia médica sobre los relojes genéticos y las curvas de crecimiento de la OMS desmiente que el estirón deba ocurrir simultáneamente en todos los adolescentes?",
    "metacognicion": "¿De qué forma analizar críticamente los mitos y estereotipos de género te permite construir un trato más justo y empático hacia tus pares?",
    "celebracion": "¡Felicitaciones! Has completado con éxito la lección sobre mitos, estereotipos y variabilidad en la pubertad."
  }
};
