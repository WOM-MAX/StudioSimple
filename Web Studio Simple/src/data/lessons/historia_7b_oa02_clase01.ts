import { LessonData } from '../../types/lesson';

export const HISTORIA_7B_OA02_CLASE01: LessonData = {
  metadata: {
    grade: '7° Básico',
    subject: 'Historia, Geografía y Ciencias Sociales',
    oaCode: 'OA 2',
    oaTitle: 'El proceso de hominización y las primeras sociedades humanas',
    lessonNumber: 1,
    totalLessonsInOa: 5,
    lessonTitle: 'El fin del nomadismo y el surgimiento agrícola',
    durationMinutes: 30,
    nextLessonTitle: 'La domesticación de especies en la Media Luna Fértil'
  },

  prep: {
    adultObjective: 'Acompañar al estudiante a comprender la gran transformación del Paleolítico al Neolítico: cómo el descubrimiento de la agricultura y la domesticación de animales transformó a los grupos humanos nómades en comunidades sedentarias.',
    routeToday: 'De la caza y recolección nómade a las primeras aldeas sedentarias productoras de alimentos.',
    mentorReminder: 'Sigue las indicaciones en pantalla paso a paso. Lee únicamente los recuadros con la etiqueta DILE o PREGÚNTALE en voz alta.',
    reminders: [
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'No leas los recuadros de AYUDA PEDAGÓGICA ni CLIMA EMOCIONAL; son guías exclusivas para ti.',
      'Pídele que observe la línea de tiempo interactiva con las eras históricas en la pantalla.',
      'Asegura que comprenda la diferencia central: los nómadas buscan comida; los sedentarios la producen y almacenan.',
      'Ten a mano su cuaderno de Historia y Ciencias Sociales para los diagramas y notas.'
    ],
    emotionalTip: 'Crea un clima de exploración histórica: "En historia no memorizamos fechas sueltas: comprendemos cómo las personas resolvieron sus necesidades básicas para construir nuestra civilización".'
  },

  route: {
    blocks: [
      { id: 'b1', number: '01', title: 'Historia y Geografía', subtitle: 'Del nomadismo a la aldea', color: 'yellow' },
      { id: 'b2', number: '02', title: 'Exploración', subtitle: 'Línea de tiempo histórica', color: 'orange' },
      { id: 'b3', number: '03', title: 'Práctica', subtitle: 'Comparación y cuadro en cuaderno', color: 'teal' },
      { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Miniquiz formativo y síntesis', color: 'navy' }
    ],
    keyQuestions: [
      { label: '¿Qué causó el fin del nomadismo?', sub: 'La agricultura y la ganadería permitieron tener comida estable.' },
      { label: '¿Dónde ocurrió este cambio?', sub: 'En el Creciente Fértil (Medio Oriente) y valles fluviales.' }
    ],
    dileIntro: 'Hoy comenzaremos la primera clase de Historia, Geografía y Ciencias Sociales para 7° Básico: "El fin del nomadismo y el surgimiento agrícola".',
    dileObjective: 'Comprenderemos por qué la invención de la agricultura en la Revolución Neolítica cambió para siempre la forma de vivir de la humanidad.'
  },

  situation: {
    dilePrompt: 'Hoy en Historia y Ciencias Sociales nos situamos en "El fin del nomadismo y el surgimiento agrícola". En la pantalla puedes ver la línea de tiempo interactiva. Observa la etapa de la "Revolución Neolítica" (hace unos 10.000 años a.C.). ¿Qué descubrimiento fundamental permitió a las familias humanas dejar de trasladarse todo el tiempo y fundar las primeras aldeas sedentarias?',
    expectedAnswer: 'El estudiante debe señalar la agricultura (cultivo de plantas como trigo y cebada) y la domesticación de animales (ganadería), lo que les permitió producir y almacenar su propio alimento en un lugar fijo.',
    socraticHint: 'Fíjate en el icono de la espiga de trigo en la pantalla: ¿de dónde sacaban la comida los nómadas y qué empezaron a hacer en el Neolítico para tener alimento sin tener que viajar?',
    emotionalTip: 'Invítalo a valorar el ingenio de nuestros antepasados: cada alimento que hoy compramos o comemos proviene de este trascendental invento neolítico.',
    options: [
      {
        label: 'Mencionó la agricultura y domesticación de animales (producir su alimento en un lugar fijo)',
        kind: 'correct',
        feedbackText: '¡Exacto! La agricultura y la ganadería aseguraron alimento continuo, haciendo posible el sedentarismo y las primeras aldeas.'
      },
      {
        label: 'Solo mencionó que construyeron casas o inventaron armas, sin explicar que fue la comida lo que permitió quedarse',
        kind: 'needs_support',
        feedbackText: 'Las casas fueron importantes, pero nadie puede quedarse en un lugar si no tiene qué comer. La clave fue cultivar su propio alimento.'
      },
      {
        label: 'No sabe qué responder o dio otra respuesta',
        kind: 'no_answer',
        feedbackText: 'Pista guiada: Fíjate en la tarjeta de la Revolución Neolítica en pantalla: domesticaron cereales (trigo, cebada) y animales (ovejas, cabras) para no depender de la caza.'
      }
    ]
  },

  reference: {
    dilePrompt: 'En la línea de tiempo interactiva se muestran las eras: Paleolítico Temprano, Paleolítico Superior, Revolución Neolítica y Primeras Aldeas.',
    question: '¿Por qué el almacenamiento de excedentes de trigo y cereales en vasijas de cerámica fue crucial para el nacimiento de las aldeas permanentes?',
    expectedAnswer: 'Porque guardar comida sobrante (excedente alimentario) garantizó sobrevivir en épocas de invierno o sequía sin tener que salir a cazar a otros territorios.',
    socraticHint: 'Si cazas un animal, la carne se descompone en pocos días. Pero si cosechas granos de trigo secos y los guardas en una vasija, ¿cuánto tiempo duran?',
    feedbackSuccess: '¡Excelente razonamiento histórico! Los excedentes permitieron alimentar a la población todo el año y dieron origen al comercio y la especialización del trabajo.',
    feedbackSupport: 'Guardar grano seco en vasijas permitió tener reservas para meses enteros, algo que los cazadores del Paleolítico jamás pudieron hacer.'
  },

  hook: {
    title: 'De cazadores a agricultores: La Revolución Neolítica',
    dileIntro: 'Durante más del 95% de la historia humana, nuestros antepasados fueron cazadores y recolectores nómadas que dependían de lo que encontraban en la naturaleza. Todo cambió cuando aprendieron a sembrar.',
    hazInstruction: 'Recorre con atención las 4 etapas de la línea de tiempo en pantalla, desde el control del fuego en el Paleolítico hasta las primeras aldeas con murallas.',
    videoSrc: '',
    focusPoints: [
      'Paleolítico Temprano (2.500.000 a 300.000 a.C.): Bipedismo, herramientas de piedra tallada y control del fuego.',
      'Paleolítico Superior (40.000 a 10.000 a.C.): Bandas nómadas, lenguaje simbólico y pinturas rupestres.',
      'Revolución Neolítica (10.000 a 4.000 a.C.): Invención de la agricultura, domesticación de ovejas y cabras, y piedra pulida.',
      'Primeras Aldeas (4.000 a.C. en adelante): Casas de adobe, cerámica para almacenar granos, división del trabajo y sedentarismo.'
    ],
    dileAfterVideo: 'Conversemos sobre lo observado en la línea de tiempo. Te haré dos preguntas para comprobar cómo comprendemos esta transformación.'
  },

  preQuestions: [
    {
      context: 'Vida Nómada vs Vida Sedentaria',
      question: '¿Por qué las bandas humanas del Paleolítico estaban obligadas a ser nómadas y trasladarse constantemente de un lugar a otro?',
      expected: 'Porque dependían de la caza de animales que migraban y de la recolección de frutos silvestres; cuando los recursos de una zona se agotaban o cambiaba la estación, debían moverse para no morir de hambre.',
      success: '¡Muy bien! Comprendiste que el nomadismo era una necesidad estricta para sobrevivir buscando comida.',
      support: 'Piensa en una manada de mamuts o ciervos: si los animales se van hacia el sur por el invierno, ¿qué tienen que hacer los cazadores?',
      reveal: 'Los nómadas no tenían cultivos propios; seguían las rutas migratorias de los animales y las estaciones de las plantas silvestres.',
      studentReveal: 'Eran nómadas porque dependían de la caza y recolección, y debían seguir a las manadas de animales.'
    },
    {
      context: 'El Creciente Fértil y la Geografía',
      question: '¿Por qué la Revolución Neolítica comenzó en regiones con ríos abundantes como la Media Luna Fértil (en Medio Oriente, junto a los ríos Tigris y Éufrates)?',
      expected: 'Porque los ríos proveían agua constante para regar los primeros campos cultivados y dejaban tierras húmedas y fértiles tras las crecidas.',
      success: '¡Excelente análisis geográfico! Supiste vincular la presencia de agua dulce y suelos fértiles con el éxito de los primeros cultivos.',
      support: 'Fíjate en las condiciones que necesita una semilla para crecer: ¿por qué los desiertos o las montañas secas no servían para empezar la agricultura?',
      reveal: 'El agua dulce de los ríos y los valles aluviales proporcionaron el entorno propicio para domesticar el trigo y la cebada.',
      studentReveal: 'Comenzó junto a los ríos porque aseguraban agua para el riego y tierras fértiles para los cultivos.'
    }
  ],

  formalization: {
    title: 'La Revolución Neolítica: Piedra Pulida y Sedentarismo',
    dileIntro: 'Revisemos la idea histórica formal: la palabra Neolítico significa "piedra nueva o pulida", pero su verdadero impacto fue el nacimiento de la economía productora de alimentos.',
    hazInstruction: 'Lee con atención la idea clave en la pantalla y prepárate para anotarla en tu cuaderno de Historia.',
    ideaClave: 'La Revolución Neolítica fue la transformación más profunda de la humanidad: al domesticar plantas y animales, las sociedades pasaron de la economía depredadora (caza) a la economía productora (agricultura), naciendo las primeras aldeas sedentarias.',
    graphicPoster: ''
  },

  postQuestions: [
    {
      context: 'Nuevas Tecnologías del Neolítico',
      question: 'Además de sembrar, ¿qué dos grandes inventos tecnológicos crearon las sociedades neolíticas para procesar y guardar los alimentos?',
      expected: 'La cerámica (vasijas y ollas de barro cocido para almacenar granos y cocinar) y el molino de mano de piedra pulida (para moler el trigo y hacer harina).',
      success: '¡Exacto! La alfarería y la piedra pulida fueron tecnologías directamente creadas para aprovechar la cosecha.',
      support: 'Pregúntate: una vez cosechado el trigo, ¿en qué lo guardaban para que no se mojara y con qué lo molían para comerlo?',
      reveal: 'La cerámica protegió las reservas de alimentos de la humedad y los roedores, y los molinos de piedra permitieron elaborar panes y papillas.',
      studentReveal: 'La cerámica para almacenar granos secos y los molinos de piedra pulida para hacer harina.'
    }
  ],

  practice: [
    {
      context: 'Cuadro Comparativo en el Cuaderno de Historia',
      question: 'Abre tu cuaderno de Historia. Dibuja una tabla de 2 columnas titulada: "Paleolítico (Nómadas) vs Neolítico (Sedentarios)". Completa al menos 3 diferencias: 1) Modo de conseguir comida, 2) Tipo de vivienda, y 3) Herramientas principales.',
      expected: 'Tabla ordenada en el cuaderno con 3 comparaciones claras: Caza/recolección vs Agricultura/ganadería; Cavernas/chozas desmontables vs Casas de barro y piedra; Piedra tallada vs Piedra pulida y cerámica.',
      success: '¡Excelente sistematización histórica en tu cuaderno! Tu cuadro comparativo refleja con rigor las diferencias de cada período.',
      support: 'Escribe en la izquierda "Paleolítico" (nómadas, caza, piedra tallada) y a la derecha "Neolítico" (sedentarios, cultivo, cerámica y casas fijas).',
      reveal: 'Comparar ambos modos de vida permite apreciar el enorme salto de seguridad y organización que trajo el Neolítico.',
      studentReveal: 'Cuadro comparativo completo de 3 filas en el cuaderno de Historia y Ciencias Sociales.'
    },
    {
      context: 'Consecuencias Sociales del Sedentarismo en el Cuaderno',
      question: 'En tu cuaderno, responde en 3 líneas: Al tener comida asegurada en la aldea, ya no todos tenían que salir a cazar todo el día. ¿Qué nuevos oficios o trabajos surgieron en las aldeas neolíticas?',
      expected: 'Mencionar al menos dos nuevos oficios: alfareros (cerámica), tejedores (textiles con lana de oveja), agricultores, constructores o artesanos de herramientas.',
      success: '¡Muy buena deducción histórica! Identificaste la división y especialización del trabajo que dio origen a la vida urbana.',
      support: 'Piensa en las nuevas necesidades de la aldea: ¿quién hacía las vasijas de barro?, ¿quién tejía la ropa con lana de oveja?',
      reveal: 'El excedente de comida liberó a parte de la población para dedicarse a la alfarería, el tejido, la arquitectura y el liderazgo comunitario.',
      studentReveal: 'Mención en el cuaderno de la especialización del trabajo: alfareros, tejedores, agricultores y constructores.'
    }
  ],

  summaryIdeas: [
    ['Economía Productora', 'El ser humano dejó de depender exclusivamente de lo que encontraba en la naturaleza y aprendió a producir su propio alimento con la agricultura y ganadería.'],
    ['El Sedentarismo', 'Tener campos de cultivo y reservas de grano exigió permanecer en un lugar fijo, dando origen a las primeras aldeas con casas permanentes.'],
    ['Revolución Tecnológica', 'Surgieron la cerámica para conservar granos, la piedra pulida para molinos y hoces, y la especialización del trabajo en nuevos oficios.']
  ],

  mini: [
    {
      id: 'q_1',
      q: '¿Cuál fue la causa principal que permitió a los seres humanos abandonar la vida nómada y volverse sedentarios en el Neolítico?',
      options: [
        'A) La invención de barcos de guerra para navegar grandes océanos',
        'B) La domesticación de plantas (agricultura) y animales (ganadería)',
        'C) El enfriamiento brusco del clima polar en toda Europa',
        'D) El descubrimiento del teléfono y la imprenta'
      ],
      correct: 'B) La domesticación de plantas (agricultura) y animales (ganadería)',
      fixExplain: 'Al producir su propio alimento en campos fijos, las familias ya no necesitaban desplazarse detrás de las manadas de caza.',
      concept: 'Causa del Sedentarismo'
    },
    {
      id: 'q_2',
      q: '¿Por qué la invención de vasijas de cerámica fue indispensable para las primeras aldeas agrícolas?',
      options: [
        'A) Porque servían únicamente como adornos en los templos',
        'B) Porque permitían almacenar excedentes de granos y líquidos protegiéndolos de roedores y humedad',
        'C) Porque reemplazaron a las armas de fuego en las batallas',
        'D) Porque eran obligatorias para escribir tratados de paz'
      ],
      correct: 'B) Porque permitían almacenar excedentes de granos y líquidos protegiéndolos de roedores y humedad',
      fixExplain: 'La cerámica permitió guardar cosechas durante meses, asegurando reservas contra el hambre y el invierno.',
      concept: 'Tecnología Cerámica'
    },
    {
      id: 'q_3',
      q: 'En el período Paleolítico anterior a la agricultura, ¿cómo obtenían su sustento diario las bandas humanas?',
      options: [
        'A) Comprando alimentos en supermercados y ferias locales',
        'B) Mediante la caza de animales, la pesca y la recolección de frutos silvestres',
        'C) Cultivando grandes hectáreas de maíz transgénico',
        'D) Exportando trigo a civilizaciones lejanas'
      ],
      correct: 'B) Mediante la caza de animales, la pesca y la recolección de frutos silvestres',
      fixExplain: 'El Paleolítico se caracterizó por una economía depredadora basada exclusivamente en la caza y recolección silvestre.',
      concept: 'Economía del Paleolítico'
    }
  ],

  recovery: [
    {
      title: 'Refuerzo: ¿Qué significa excedente alimentario?',
      explain: 'Un excedente es la comida que sobra después de que todos en la comunidad comieron. En el Neolítico, un buen campo de trigo producía mucho más de lo necesario para una semana, lo que permitía guardarlo en vasijas para épocas difíciles.',
      q: '¿Qué ventaja directa le daba a una aldea tener excedentes de trigo almacenados?',
      options: [
        'A) Aseguraba la supervivencia en meses de sequía e invierno sin tener que mudarse a otro lugar',
        'B) Obligaba a todos los aldeanos a abandonar sus casas inmediatamente',
        'C) Hacía que las semillas desaparecieran del suelo'
      ],
      correct: 'A) Aseguraba la supervivencia en meses de sequía e invierno sin tener que mudarse a otro lugar',
      correctText: '¡Exacto! El excedente daba seguridad y tranquilidad para vivir de forma sedentaria.',
      fixText: 'La respuesta correcta es la A: tener reservas de comida aseguraba la vida durante el invierno sin tener que migrar.'
    }
  ],

  reasoning: {
    title: 'Comparemos dos modos de subsistencia histórica',
    dileIntro: 'Antes de sintetizar, comparemos dos situaciones de supervivencia en la prehistoria.',
    question: 'En la Situación 1 una banda de 20 cazadores persigue a una manada de ciervos durante semanas y si no cazan pasan hambre. En la Situación 2 una aldea de 100 personas cuida sus campos de trigo y corrales de ovejas junto al río. ¿Cómo influye el método de obtención de comida en la forma de vivir de cada grupo?',
    expectedAnswer: 'En la Situación 1 dependen del azar de la caza y deben mudarse sin cesar (nómadas); en la Situación 2 controlan la producción de alimentos, tienen reservas y pueden vivir en casas fijas (sedentarios).',
    context1: {
      label: 'SITUACIÓN 1: BANDA PALEOLÍTICA',
      value: 'Caza migratoria de ciervos y recolección.',
      desc: 'Economía depredadora: nomadismo forzado, campamentos provisorios y riesgo permanente de escasez.'
    },
    context2: {
      label: 'SITUACIÓN 2: ALDEA NEOLÍTICA',
      value: 'Campos de trigo y corrales de ovejas.',
      desc: 'Economía productora: sedentarismo, casas de adobe, vasijas de reserva y división comunitaria del trabajo.'
    },
    successFeedback: '¡Extraordinario razonamiento histórico! Explicaste con total claridad cómo el paso de recolectar a producir comida cambió toda la estructura humana.',
    supportFeedback: 'Observa la diferencia entre perseguir animales silvestres por el bosque versus cultivar tus propios alimentos al lado de tu casa.',
    revealText: 'El control sobre la producción de alimentos liberó a la humanidad de la incertidumbre diaria de la caza migratoria.'
  },

  challenge: {
    title: 'Desafío breve: Herramientas de piedra',
    question: 'Un arqueólogo encuentra dos herramientas en una excavación: una hacha tosca tallada a golpes sobre un canto rodado, y una hoz con mango de madera y filo de piedra cuidadosamente pulida y brillante. ¿A qué período pertenece cada una?',
    expectedAnswer: 'El hacha tosca tallada pertenece al Paleolítico (piedra tallada); la hoz de piedra pulida pertenece al Neolítico (piedra pulida para cosechar cereales).',
    item1: { label: 'Hacha tosca tallada a golpes', tag: 'Paleolítico' },
    item2: { label: 'Hoz de filo pulido y brillante', tag: 'Neolítico' },
    successFeedback: '¡Excelente ojo arqueológico! Identificaste la técnica de piedra tallada del Paleolítico y la piedra pulida especializada del Neolítico.',
    supportFeedback: 'Recuerda el significado de las palabras: Paleo significa antiguo (piedra tosca tallada); Neo significa nuevo (piedra pulida y fina).'
  },

  strategy: {
    title: 'Estrategia para analizar grandes transformaciones históricas',
    dileIntro: 'Cuando analices un cambio de era en la historia de la humanidad, sigue estos tres pasos:',
    steps: [
      { number: 1, title: 'Identifica la base material', desc: '¿Cómo conseguían su alimento, abrigo y herramientas en esa época?' },
      { number: 2, title: 'Examina la tecnología', desc: '¿Qué nuevos inventos (fuego, agricultura, cerámica, metales) transformaron su vida diaria?' },
      { number: 3, title: 'Evalúa la organización social', desc: '¿Cómo cambió la forma de convivir: eran familias nómades, aldeas de vecinos o ciudades con leyes?' }
    ]
  },

  closure: {
    congratulations: '¡Felicitaciones! Hoy comprendiste el paso decisivo del nomadismo al sedentarismo, el impacto revolucionario de la agricultura y la domesticación de animales, y por qué las primeras aldeas dieron origen a nuestra vida en comunidad.',
    nextClassPreview: 'En la próxima clase investigaremos la domesticación de especies en la Media Luna Fértil y cómo los primeros excedentes agrícolas permitieron el nacimiento del comercio y las leyes.'
  },

  interactive: {
    type: 'timeline',
    title: 'Línea de Tiempo Histórica: De la Hominización a la Aldea',
    description: 'Organizador cronológico de la transición del Paleolítico al Neolítico y el surgimiento del sedentarismo.'
  }
};
