import { LessonData } from '../../types/lesson';

export const CIENCIAS_7B_OA01_CLASE01: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Ciencias Naturales',
    oaCode: 'OA 1',
    oaTitle: 'Sexualidad y Afectividad',
    lessonNumber: 1,
    totalLessonsInOa: 5,
    lessonTitle: 'Las 4 Dimensiones de la Sexualidad Humana',
    durationMinutes: 30,
    nextLessonTitle: 'Cambios físicos y hormonales de la pubertad'
  },

  // Paso 1: Preparación
  prep: {
    adultObjective: 'Guiar al estudiante a comprender que la sexualidad humana es una vivencia integral que comprende cuatro dimensiones inseparables: biológica, afectiva, social y ética, superando la visión reducida a lo estrictamente reproductivo.',
    routeToday: 'Reconocer e interrelacionar las dimensiones biológica, afectiva, social y ética en situaciones reales de la vida cotidiana.',
    mentorReminder: 'Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. El contenido pedagógico y las respuestas esperadas te indican con total precisión qué debe responder el estudiante para que no tengas que estudiar previamente.',
    reminders: [
      'La sexualidad humana no es solo el cuerpo biológico; involucra a la persona en su totalidad.',
      'Lee en voz alta únicamente los textos con la etiqueta DILE o PREGÚNTALE.',
      'Los recuadros AYUDA PEDAGÓGICA y CLIMA EMOCIONAL son información exclusiva para ti.',
      'Valora la reflexión del estudiante antes de calificar su respuesta.'
    ],
    emotionalTip: 'Aborda la pubertad y la sexualidad con serenidad, apertura y confianza. Es una etapa natural del desarrollo y el diálogo cercano refuerza su seguridad personal.'
  },

  // Paso 2: Ruta y Situación Inicial
  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Ciencias Naturales', subtitle: 'Las 4 Dimensiones Humanas', color: 'teal' },
      { id: 'b2', number: '02', title: 'Exploración', subtitle: 'Biológica, Afectiva, Social, Ética', color: 'orange' },
      { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Casos y Cuaderno de Ciencias', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz y Síntesis Integral', color: 'navy' }
    ],
    keyQuestions: [
      { label: '¿Qué es la sexualidad?', sub: 'Una dimensión integral presente a lo largo de toda la vida.' },
      { label: '¿Cuáles son sus dimensiones?', sub: 'Biológica, afectiva, social y ético-moral.' }
    ],
    dileIntro: 'Hoy comenzaremos la primera clase de Ciencias Naturales para 7° Básico: "Las 4 Dimensiones de la Sexualidad Humana".',
    dileObjective: 'Comprender que la sexualidad humana abarca mucho más que la reproducción: integra nuestro cuerpo, nuestros sentimientos, nuestras relaciones con amigos y familia, y nuestros valores.'
  },

  situation: {
    dilePrompt: 'Hoy en Ciencias Naturales investigamos la sexualidad humana como una dimensión integral de la persona. En pantalla puedes ver el modelo de 4 dimensiones. Observa la primera dimensión destacada: la Dimensión Biológica. ¿Qué cambios físicos concretos ocurren en el cuerpo humano durante la pubertad?',
    expectedAnswer: 'Mencionar al menos dos cambios físicos propios de la pubertad (por ejemplo: aumento de estatura, cambio de voz, aparición de vello corporal o desarrollo de caracteres sexuales).',
    socraticHint: 'Piensa en las transformaciones corporales que ocurren al pasar de la niñez a la adolescencia: ¿qué cambia en la estatura, la voz o el cuerpo?',
    emotionalTip: 'Conversa sobre los cambios físicos con naturalidad y calma, recordándole que cada cuerpo se desarrolla a su propio ritmo sin comparaciones.',
    options: [
      {
        label: 'Mencionó cambios corporales concretos (crecimiento, voz, vello o desarrollo físico)',
        kind: 'correct',
        feedbackText: '¡Exacto! Esos son cambios biológicos y anatómicos concretos característicos de la pubertad.'
      },
      {
        label: 'Solo mencionó sentimientos, emociones o amigos (dimensiones afectiva o social)',
        kind: 'needs_support',
        feedbackText: 'Las emociones y las amistades son fundamentales, pero corresponden a lo afectivo y social. Fíjate en los cambios físicos y anatómicos del cuerpo.'
      },
      {
        label: 'No sabe, siente timidez o dio otra respuesta',
        kind: 'no_answer',
        feedbackText: 'Pista guiada: Fíjate en la pantalla bajo Dimensión Biológica: menciona el crecimiento acelerado, el cambio de tono en la voz o la aparición de vello corporal.'
      }
    ]
  },

  reference: {
    dilePrompt: 'En la pantalla interactiva se muestran las cuatro dimensiones de la sexualidad humana: Biológica, Afectiva, Social y Ética.',
    question: '¿Qué cambios físicos específicos observas o reconoces en la dimensión biológica de la pubertad?',
    expectedAnswer: 'Mencionar cambios corporales concretos como crecimiento de estatura, cambio de tono en la voz, vello corporal o maduración de órganos reproductores.',
    socraticHint: 'Observa la tarjeta verde en la pantalla del estudiante: describe las manifestaciones corporales de la dimensión biológica.',
    feedbackSuccess: '¡Excelente observación! Reconociste las transformaciones físicas que caracterizan la dimensión biológica.',
    feedbackSupport: 'Observa la tarjeta verde en la pantalla: lee las manifestaciones corporales que se producen en la pubertad.'
  },

  // Paso 3: Video Gancho
  hook: {
    title: 'La persona en su totalidad: Las 4 dimensiones',
    dileIntro: 'Vamos a ver cómo la ciencia moderna comprende la sexualidad. No se reduce solo a la biología o la anatomía: involucra a la persona completa a través de cuatro dimensiones inseparables.',
    hazInstruction: 'Observa atentamente el esquema de los 4 cuadrantes e identifica qué aspectos de nuestra vida cotidiana abarca cada uno.',
    videoSrc: '',
    focusPoints: [
      'Dimensión Biológica: anatomía, pubertad y caracteres sexuales.',
      'Dimensión Afectiva: sentimientos, emociones, autoestima y cariño.',
      'Dimensión Social: convivencia familiar, amistades y cultura.',
      'Dimensión Ética: valores, respeto, cuidado mutuo y consentimiento.'
    ],
    dileAfterVideo: 'Conversemos sobre lo observado. Te haré dos preguntas para comprobar cómo se interrelacionan estas 4 dimensiones.'
  },

  // Paso 4: Conversación Guiada
  preQuestions: [
    {
      context: 'Dimensión Afectiva y Vínculos',
      question: 'En la segunda dimensión, ¿qué elementos componen la dimensión afectiva de la sexualidad humana?',
      expected: 'Las emociones, los sentimientos, el cariño, la autoestima y la capacidad de amar y establecer vínculos afectivos.',
      success: '¡Muy bien! La dimensión afectiva reúne cómo sentimos, cómo expresamos cariño y cómo cuidamos nuestra autoestima.',
      support: 'Piensa en lo que pasa en nuestro corazón y mente: cuando sentimos alegría por un amigo, afecto por la familia o aprendemos a querernos a nosotros mismos. ¿Qué integra esta dimensión?',
      reveal: 'La dimensión afectiva integra las emociones, los sentimientos, el cariño y la capacidad de formar lazos profundos con los demás.',
      studentReveal: 'Las emociones, sentimientos, el amor, el cariño y los vínculos afectivos.'
    },
    {
      context: 'Dimensiones Social y Ética',
      question: '¿Por qué decimos que la sexualidad humana también tiene una dimensión social y una dimensión ética?',
      expected: 'Porque nos relacionamos con la familia y la sociedad (social), y debemos actuar con valores, respeto mutuo, responsabilidad y consentimiento (ética).',
      success: '¡Exacto! Somos seres sociales que convivimos con otros, y la ética nos enseña a respetar la dignidad y los límites de cada persona.',
      support: 'Separa las dos palabras: "social" tiene que ver con vivir en sociedad y convivir; "ética" tiene que ver con valores, normas y tomar decisiones correctas con respeto. ¿Cómo se aplican?',
      reveal: 'La dimensión social abarca cómo convivimos en sociedad y familia, mientras que la ética guía nuestras decisiones con valores de respeto, dignidad y cuidado.',
      studentReveal: 'Porque convivimos en sociedad (social) y debemos tratarnos con respeto, valores y responsabilidad (ética).'
    }
  ],

  conversationContext: 'Revisaremos cómo las cuatro dimensiones de la sexualidad interactúan permanentemente en la vida cotidiana de las personas.',

  // Paso 5: Explicación e Idea Clave
  formalization: {
    title: 'Modelo Integral de la Sexualidad Humana',
    concept: 'La sexualidad como dimensión integral',
    summary: 'La sexualidad humana es una experiencia integral que comprende cuatro dimensiones inseparables: la biológica (el cuerpo), la afectiva (las emociones), la social (las relaciones) y la ética (los valores y el respeto mutuo). Ninguna dimensión opera aislada de las demás.',
    ideaClave: 'La sexualidad humana es integral: une nuestro cuerpo biológico, nuestras emociones, nuestra convivencia social y nuestros valores éticos.',
    dileIntro: 'Ahora formalizaremos la idea central que debes recordar para siempre sobre la sexualidad en Ciencias Naturales.',
    hazInstruction: 'Lee con atención la idea clave en pantalla y fíjate en cómo las cuatro dimensiones se conectan entre sí.',
    videoSrc: ''
  },

  postQuestions: [
    {
      context: 'Interrelación de dimensiones',
      question: 'Si una persona siente timidez o alegría ante los cambios de su cuerpo en la pubertad, ¿qué dimensiones están interactuando?',
      expected: 'Están interactuando la dimensión biológica (los cambios corporales) y la dimensión afectiva (los sentimientos y emociones).',
      success: '¡Excelente conexión! El cuerpo físico (biológico) impacta directamente en cómo nos sentimos (afectivo).',
      support: 'Identifica los dos elementos del ejemplo: "cambios del cuerpo" corresponde a una dimensión, y "sentir timidez o alegría" corresponde a otra. ¿Cuáles son?',
      reveal: 'Interactúan la dimensión biológica (cambios físicos del cuerpo) y la dimensión afectiva (las emociones y sentimientos que experimenta la persona).',
      studentReveal: 'La dimensión biológica (el cuerpo) y la dimensión afectiva (las emociones).'
    },
    {
      context: 'El valor del respeto mutuo',
      question: 'Cuando un grupo de amigos decide escuchar y respetar los límites y la privacidad de cada integrante, ¿qué dimensión destaca principalmente?',
      expected: 'Destaca la dimensión ética y moral, complementada con la dimensión social de convivencia.',
      success: '¡Brillante! El respeto por los límites personales y la dignidad del otro es la base de la dimensión ética.',
      support: 'Fíjate en las palabras clave: "respetar límites", "valores" y "decisión responsable". ¿A qué dimensión corresponde?',
      reveal: 'Corresponde a la dimensión ética y moral, ya que establece los valores de respeto, consentimiento y cuidado en las relaciones con los demás.',
      studentReveal: 'La dimensión ética y moral (valores de respeto y límites).'
    }
  ],

  // Paso 6: Práctica Conjunta
  practice: [
    {
      context: 'Caso 1: Cuidado de la higiene y descanso',
      question: 'El hábito de bañarse diariamente, usar ropa limpia y dormir ocho horas para cuidar el cuerpo durante el crecimiento, ¿a qué dimensión corresponde?',
      expected: 'Corresponde a la dimensión biológica, ya que se relaciona con el cuidado y funcionamiento saludable del organismo.',
      success: '¡Muy bien! Cuidar el cuerpo físico con higiene y descanso es parte de la dimensión biológica.',
      support: 'Piensa a qué parte de la persona beneficia directamente el descanso y la limpieza: ¿al cuerpo físico, a las leyes o a la economía?',
      reveal: 'Corresponde a la dimensión biológica porque promueve la salud, higiene y bienestar anatómico del cuerpo.',
      studentReveal: 'Dimensión biológica (salud y cuidado del cuerpo).'
    },
    {
      context: 'Caso 2: Expresión de afecto en la familia',
      question: 'Conversar con honestidad con los padres sobre los temores o dudas que surgen en la adolescencia, ¿qué dimensiones involucra?',
      expected: 'Involucra la dimensión afectiva (expresar emociones y confianza) y la dimensión social (el vínculo familiar).',
      success: '¡Exacto! El diálogo familiar combina el cariño sincero (afectivo) con la convivencia dentro del hogar (social).',
      support: 'Piensa en las emociones compartidas (afecto) y en las personas con las que vives y convives (familia/social). ¿Qué dimensiones son?',
      reveal: 'Involucra la dimensión afectiva (manejo de emociones y confianza) y la dimensión social (la relación de convivencia con la familia).',
      studentReveal: 'Dimensión afectiva (emociones) y dimensión social (familia).'
    },
    {
      context: 'Caso 3: Trabajo en el Cuaderno de Ciencias',
      question: 'Abre tu cuaderno de Ciencias Naturales. Dibuja un cuadro con cuatro columnas tituladas: Biológica, Afectiva, Social y Ética. Anota en la columna "Ética" una acción que demuestre respeto hacia tus compañeros.',
      expected: 'Registrar una acción ética concreta (por ejemplo: no burlarse de los cambios de otros, pedir permiso antes de tocar pertenencias ajenas o respetar la opinión y límites de cada persona).',
      success: '¡Excelente registro en tu cuaderno! Anotaste una acción clara de respeto y valor ético.',
      support: 'Escribe una acción cotidiana donde se note el respeto hacia los demás: por ejemplo, no difundir secretos o no burlarse del cuerpo de otra persona.',
      reveal: 'Una acción ética fundamental es tratar a todas las personas con respeto y dignidad, valorando su individualidad y respetando sus límites.',
      studentReveal: 'Acción ética registrada en el cuaderno: respetar los límites y la dignidad de cada compañero.'
    }
  ],

  // Paso 7: Miniquiz y Recuperación
  mini: [
    {
      id: 'q1',
      q: '¿Cuál de las siguientes afirmaciones define correctamente la sexualidad humana según la ciencia?',
      options: [
        'Es una dimensión integral presente a lo largo de toda la vida que une lo biológico, afectivo, social y ético.',
        'Se reduce exclusivamente a la reproducción biológica y a los órganos del cuerpo humano.',
        'Es un tema que únicamente involucra a los adultos y no tiene relación con las emociones ni los valores.'
      ],
      correct: 'Es una dimensión integral presente a lo largo de toda la vida que une lo biológico, afectivo, social y ético.',
      fixExplain: 'La sexualidad humana es integral: comprende el cuerpo biológico, los afectos, la convivencia social y los valores éticos durante toda la vida.'
    },
    {
      id: 'q2',
      q: 'El cambio en el tono de la voz y el crecimiento acelerado de estatura durante la pubertad corresponden a la dimensión:',
      options: [
        'Biológica',
        'Social',
        'Ética'
      ],
      correct: 'Biológica',
      fixExplain: 'Los cambios corporales, hormonales y anatómicos forman parte de la dimensión biológica del ser humano.'
    },
    {
      id: 'q3',
      q: 'Aprender a decir "no" con seguridad y respetar los límites y decisiones de los demás corresponde a la dimensión:',
      options: [
        'Ética y moral',
        'Exclusivamente biológica',
        'Únicamente climática'
      ],
      correct: 'Ética y moral',
      fixExplain: 'Establecer límites personales, cuidar el consentimiento y valorar la dignidad propia y ajena son fundamentos de la dimensión ética.'
    }
  ],

  recovery: [
    {
      title: 'Recuperación: Las 4 Dimensiones de la Sexualidad',
      explain: 'Recuerda que la sexualidad humana se compone de 4 dimensiones esenciales: 1) Biológica (el cuerpo), 2) Afectiva (las emociones), 3) Social (la relación con otros) y 4) Ética (los valores y el respeto).',
      q: 'Si una persona siente cariño por sus amigos y comparte momentos felices con ellos, ¿qué dos dimensiones se manifiestan?',
      options: [
        'Las dimensiones afectiva (cariño) y social (amistades).',
        'Únicamente la dimensión biológica anatómica.'
      ],
      correct: 'Las dimensiones afectiva (cariño) y social (amistades).',
      correctText: '¡Exacto! El cariño representa la dimensión afectiva y compartir con amigos representa la dimensión social.',
      fixText: 'Recuerda que el cariño corresponde a la dimensión afectiva y la convivencia con amigos corresponde a la dimensión social.'
    }
  ],

  summaryIdeas: [
    [
      '1 · Visión Integral',
      'La sexualidad humana es una dimensión integral de la persona y no debe reducirse únicamente al aspecto biológico o reproductivo.'
    ],
    [
      '2 · Las 4 Dimensiones',
      'Comprende cuatro dimensiones inseparables: biológica (cuerpo y cambios físicos), afectiva (emociones y sentimientos), social (relaciones y cultura) y ética (valores y respeto).'
    ],
    [
      '3 · Interrelación Constante',
      'Todas las dimensiones interactúan entre sí: lo que sentimos (afectivo) se refleja en nuestro cuerpo (biológico) y en cómo nos relacionamos con los demás (social y ético).'
    ]
  ],

  interactive: {
    type: 'dimensions',
    title: 'Las 4 Dimensiones de la Sexualidad Humana',
    description: 'Organizador gráfico del modelo integral de desarrollo personal.'
  }
};
