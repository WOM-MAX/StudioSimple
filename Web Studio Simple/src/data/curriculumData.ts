export interface CurricularLesson {
  lessonNumber: number;
  title: string;
  durationMinutes: number;
  status: 'ready' | 'completed' | 'locked';
  focusSummary: string;
}

export interface CurricularOA {
  code: string;           // "OA 1"
  number: number;         // 1
  title: string;          // "Números enteros (Z)"
  shortDesc: string;      // Resumen pedagógico del objetivo
  totalLessons: number;   // 5
  completedLessons: number;
  lessons: CurricularLesson[];
}

export interface SubjectInfo {
  id: string;
  name: string;
  shortName: string;
  color: string;
}

export const OFFICIAL_SUBJECTS: SubjectInfo[] = [
  { id: 'mat', name: 'Matemática', shortName: 'Matemática', color: '#1C3257' },
  { id: 'len', name: 'Lengua y Literatura', shortName: 'Lenguaje', color: '#EE751C' },
  { id: 'cie', name: 'Ciencias Naturales', shortName: 'Ciencias', color: '#12A1A4' },
  { id: 'his', name: 'Historia y Geografía', shortName: 'Historia', color: '#8C52FF' },
  { id: 'ing', name: 'Inglés', shortName: 'Inglés', color: '#4A964E' }
];

export const MATEMATICA_7B_OAS: CurricularOA[] = [
  {
    code: 'OA 1',
    number: 1,
    title: 'Números Enteros (Z)',
    shortDesc: 'Reconocer el cero como punto de referencia, representar enteros en la recta numérica, ordenarlos y aplicarlos en contextos reales.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      {
        lessonNumber: 1,
        title: 'Posiciones respecto de un punto de referencia',
        durationMinutes: 30,
        status: 'ready',
        focusSummary: 'El número cero como origen, temperaturas bajo cero, niveles de profundidad y ascensor.'
      },
      {
        lessonNumber: 2,
        title: 'La recta numérica y orden en Z',
        durationMinutes: 30,
        status: 'ready',
        focusSummary: 'Ubicación de positivos y negativos, relaciones de orden mayor y menor (> y <).'
      },
      {
        lessonNumber: 3,
        title: 'Valor absoluto y distancias al cero',
        durationMinutes: 30,
        status: 'ready',
        focusSummary: 'Comprensión geométrica del valor absoluto como distancia sin signo.'
      },
      {
        lessonNumber: 4,
        title: 'Adición y sustracción en Z',
        durationMinutes: 30,
        status: 'ready',
        focusSummary: 'Desplazamientos en la recta, suma de signos iguales/distintos y el opuesto aditivo.'
      },
      {
        lessonNumber: 5,
        title: 'Resolución de problemas cotidianos y síntesis',
        durationMinutes: 30,
        status: 'ready',
        focusSummary: 'Aplicación en estados de cuenta bancarios, variaciones térmicas y miniquiz de maestría.'
      }
    ]
  },
  {
    code: 'OA 3',
    number: 3,
    title: 'Multiplicación y División de Fracciones y Decimales',
    shortDesc: 'Operar con números decimales positivos y fracciones de manera simbólica y pictórica en problemas cotidianos.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Multiplicación de fracciones con modelos pictóricos', durationMinutes: 30, status: 'locked', focusSummary: 'Área y partición de enteros.' },
      { lessonNumber: 2, title: 'División de fracciones y el recíproco', durationMinutes: 30, status: 'locked', focusSummary: 'Inverso multiplicativo y simplificación.' },
      { lessonNumber: 3, title: 'Multiplicación y división de decimales positivos', durationMinutes: 30, status: 'locked', focusSummary: 'Movimiento de la coma decimal y potencias de 10.' },
      { lessonNumber: 4, title: 'Problemas contextuales con calculadora', durationMinutes: 30, status: 'locked', focusSummary: 'Medidas, recetas y presupuestos.' },
      { lessonNumber: 5, title: 'Ensayo y consolidación de operatoria Q+', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación sumativa del OA 3.' }
    ]
  },
  {
    code: 'OA 4',
    number: 4,
    title: 'Concepto y Cálculo de Porcentajes',
    shortDesc: 'Comprender el porcentaje como razón y fracción decimal, calculando descuentos e intereses en la vida diaria.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'El porcentaje como parte de cien', durationMinutes: 30, status: 'locked', focusSummary: 'Grillas de 100 y porcentajes clave (50%, 25%, 10%).' },
      { lessonNumber: 2, title: 'Cálculo mental de porcentajes frecuentes', durationMinutes: 30, status: 'locked', focusSummary: 'Estrategias de división rápida.' },
      { lessonNumber: 3, title: 'Descuentos y aumentos en compras reales', durationMinutes: 30, status: 'locked', focusSummary: 'Cálculo de ofertas y rebajas.' },
      { lessonNumber: 4, title: 'Recargo del IVA (19%) e impuestos en Chile', durationMinutes: 30, status: 'locked', focusSummary: 'Uso de calculadora para precios netos y finales.' },
      { lessonNumber: 5, title: 'Ensayo y resolución integral de porcentajes', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa del OA 4.' }
    ]
  },
  {
    code: 'OA 6',
    number: 6,
    title: 'Lenguaje Algebraico y Ecuaciones',
    shortDesc: 'Traducir expresiones del lenguaje natural al simbólico y resolver ecuaciones de primer grado usando la balanza.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Traducción de lenguaje natural a términos algebraicos', durationMinutes: 30, status: 'locked', focusSummary: 'El doble, el triple y aumentos.' },
      { lessonNumber: 2, title: 'Patrones numéricos y regularidades', durationMinutes: 30, status: 'locked', focusSummary: 'Reglas de formación de secuencias.' },
      { lessonNumber: 3, title: 'El modelo de la balanza en equilibrio', durationMinutes: 30, status: 'locked', focusSummary: 'Propiedades de la igualdad.' },
      { lessonNumber: 4, title: 'Resolución de ecuaciones lineales (ax + b = c)', durationMinutes: 30, status: 'locked', focusSummary: 'Despeje algebraico paso a paso.' },
      { lessonNumber: 5, title: 'Problemas de la vida real con ecuaciones', durationMinutes: 30, status: 'locked', focusSummary: 'Modelamiento y comprobación.' }
    ]
  },
  {
    code: 'OA 8',
    number: 8,
    title: 'Proporcionalidad Directa e Inversa',
    shortDesc: 'Identificar variables proporcionales, construir tablas de valores y representar gráficos en el plano cartesiano.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Concepto de razón y proporción directa', durationMinutes: 30, status: 'locked', focusSummary: 'Constante de proporcionalidad k.' },
      { lessonNumber: 2, title: 'Gráficos de proporcionalidad directa (rectas)', durationMinutes: 30, status: 'locked', focusSummary: 'Líneas que parten desde el origen.' },
      { lessonNumber: 3, title: 'Proporcionalidad inversa en el trabajo cotidiano', durationMinutes: 30, status: 'locked', focusSummary: 'Variables que aumentan y disminuyen proporcionalmente.' },
      { lessonNumber: 4, title: 'Gráficos de hipérbolas y tablas inversas', durationMinutes: 30, status: 'locked', focusSummary: 'Tiempo y número de obreros o velocidad.' },
      { lessonNumber: 5, title: 'Resolución de problemas mixtos de proporcionalidad', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación integral del OA 8.' }
    ]
  },
  {
    code: 'OA 11',
    number: 11,
    title: 'El Círculo: Perímetro y Área',
    shortDesc: 'Calcular el perímetro y área de círculos reales aplicando la constante Pi en contextos de diseño y medición.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Radio, diámetro y la constante Pi (3,14)', durationMinutes: 30, status: 'locked', focusSummary: 'Relación métrica d = 2r y origen de Pi.' },
      { lessonNumber: 2, title: 'Cálculo de perímetro de la circunferencia', durationMinutes: 30, status: 'locked', focusSummary: 'Fórmula P = 2 * Pi * r.' },
      { lessonNumber: 3, title: 'Cálculo del área del círculo', durationMinutes: 30, status: 'locked', focusSummary: 'Fórmula A = Pi * r^2.' },
      { lessonNumber: 4, title: 'Problemas geométricos reales con calculadora', durationMinutes: 30, status: 'locked', focusSummary: 'Ruedas, canchas y riego circular.' },
      { lessonNumber: 5, title: 'Ensayo de geometría circular', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa del OA 11.' }
    ]
  },
  {
    code: 'OA 14',
    number: 14,
    title: 'Plano Cartesiano y Vectores 2D',
    shortDesc: 'Ubicar puntos en los cuatro cuadrantes y aplicar vectores de traslación conservando las dimensiones.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Pares ordenados (x, y) en los 4 cuadrantes', durationMinutes: 30, status: 'locked', focusSummary: 'Coordenadas con números enteros.' },
      { lessonNumber: 2, title: 'Vectores de desplazamiento', durationMinutes: 30, status: 'locked', focusSummary: 'Magnitud, dirección y sentido.' },
      { lessonNumber: 3, title: 'Traslación de polígonos 2D en el plano', durationMinutes: 30, status: 'locked', focusSummary: 'Conservación de forma y tamaño.' },
      { lessonNumber: 4, title: 'Problemas de mapas y navegación', durationMinutes: 30, status: 'locked', focusSummary: 'Rutas con coordenadas cartesianas.' },
      { lessonNumber: 5, title: 'Ensayo y síntesis de transformaciones isométricas', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación del OA 14.' }
    ]
  },
  {
    code: 'OA 16',
    number: 16,
    title: 'Tablas de Frecuencia y Gráficos Estadísticos',
    shortDesc: 'Organizar información cuantitativa en tablas y diagramas de tallo y hojas para la toma de decisiones.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Frecuencia absoluta y frecuencia relativa', durationMinutes: 30, status: 'locked', focusSummary: 'Conteo y porcentajes muestrales.' },
      { lessonNumber: 2, title: 'Diagramas de tallo y hojas', durationMinutes: 30, status: 'locked', focusSummary: 'Lectura rápida de distribuciones de datos.' },
      { lessonNumber: 3, title: 'Gráficos de barras y circulares convenientes', durationMinutes: 30, status: 'locked', focusSummary: 'Elección del gráfico adecuado al tipo de dato.' },
      { lessonNumber: 4, title: 'Interpretación crítica de encuestas e informes', durationMinutes: 30, status: 'locked', focusSummary: 'Detección de sesgos en medios.' },
      { lessonNumber: 5, title: 'Ensayo de estadística descriptiva', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación del OA 16.' }
    ]
  },
  {
    code: 'OA 18',
    number: 18,
    title: 'Probabilidad y Regla de Laplace',
    shortDesc: 'Calcular probabilidades de eventos aleatorios mediante razones y la Regla de Laplace.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Experimentos aleatorios y espacio muestral', durationMinutes: 30, status: 'locked', focusSummary: 'Eventos seguros, posibles e imposibles.' },
      { lessonNumber: 2, title: 'Estimación intuitiva mediante frecuencias relativas', durationMinutes: 30, status: 'locked', focusSummary: 'Lanzamiento de dados y monedas.' },
      { lessonNumber: 3, title: 'La Regla de Laplace (Casos favorables / Casos posibles)', durationMinutes: 30, status: 'locked', focusSummary: 'Cálculo formal fraccionario.' },
      { lessonNumber: 4, title: 'Probabilidades en juegos de azar y tómbolas', durationMinutes: 30, status: 'locked', focusSummary: 'Cartas, ruletas y pronósticos.' },
      { lessonNumber: 5, title: 'Ensayo integral de probabilidades', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación sumativa del OA 18.' }
    ]
  }
];

export const LENGUAJE_7B_OAS: CurricularOA[] = [
  {
    code: 'OA 3',
    number: 3,
    title: 'Análisis de Narraciones y el Héroe',
    shortDesc: 'Analizar las narraciones leídas reconociendo el conflicto, motivaciones de los personajes, el viaje del héroe y la visión de mundo.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'El conflicto narrativo y motivaciones del personaje', durationMinutes: 30, status: 'ready', focusSummary: 'Deseo del protagonista, antagonista y motor de la historia.' },
      { lessonNumber: 2, title: 'Las etapas del viaje del héroe en el mito y cuento', durationMinutes: 30, status: 'ready', focusSummary: 'Llamado a la aventura, pruebas y regreso transformado.' },
      { lessonNumber: 3, title: 'Visión de mundo y contexto sociocultural en la obra', durationMinutes: 30, status: 'ready', focusSummary: 'Valores, época histórica y costumbres en el relato.' },
      { lessonNumber: 4, title: 'La voz narrativa: narrador protagonista, testigo y omnisciente', durationMinutes: 30, status: 'ready', focusSummary: 'Punto de vista y grado de conocimiento de los hechos.' },
      { lessonNumber: 5, title: 'Ensayo de comprensión lectora narrativa y distractor', durationMinutes: 30, status: 'ready', focusSummary: 'Preguntas tipo MINEDUC con justificación de respuestas.' }
    ]
  },
  {
    code: 'OA 4',
    number: 4,
    title: 'Poesía y Lenguaje Figurado',
    shortDesc: 'Analizar poemas reconociendo el hablante lírico, figuras literarias (metáfora, personificación, hipérbole) y efectos sonoros.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'El hablante lírico, motivo y objeto lírico', durationMinutes: 30, status: 'locked', focusSummary: 'Quién habla en el poema y qué emoción experimenta.' },
      { lessonNumber: 2, title: 'Figuras literarias: metáfora, personificación e hipérbole', durationMinutes: 30, status: 'locked', focusSummary: 'Interpretación de sentido figurado versus sentido literal.' },
      { lessonNumber: 3, title: 'Ritmo, rima y sonoridad en el verso', durationMinutes: 30, status: 'locked', focusSummary: 'Aliteración, rima consonante/asonante y métrica.' },
      { lessonNumber: 4, title: 'Símbolos poéticos e imágenes sensoriales', durationMinutes: 30, status: 'locked', focusSummary: 'Visual, auditivo y táctil en la poesía latinoamericana.' },
      { lessonNumber: 5, title: 'Taller de apreciación estética y comprobación', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa del OA 4.' }
    ]
  },
  {
    code: 'OA 9',
    number: 9,
    title: 'Textos de Medios de Comunicación',
    shortDesc: 'Analizar y evaluar textos periodísticos y de opinión, distinguiendo hechos de juicios de valor y propósitos explícitos e implícitos.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Diferencia entre hecho y opinión en noticias', durationMinutes: 30, status: 'locked', focusSummary: 'Datos verificables versus juicios subjetivos.' },
      { lessonNumber: 2, title: 'Propósito comunicativo explícito e implícito', durationMinutes: 30, status: 'locked', focusSummary: 'Informar, persuadir, entretener y vender.' },
      { lessonNumber: 3, title: 'Recursos persuasivos en la publicidad y propaganda', durationMinutes: 30, status: 'locked', focusSummary: 'Uso de eslóganes, colores y estereotipos sociales.' },
      { lessonNumber: 4, title: 'Fuentes de información y verificación de veracidad', durationMinutes: 30, status: 'locked', focusSummary: 'Citas directas, atribución y detección de fake news.' },
      { lessonNumber: 5, title: 'Ensayo crítico de lectura de medios', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa del OA 9.' }
    ]
  },
  {
    code: 'OA 15',
    number: 15,
    title: 'Planificación y Redacción de Textos',
    shortDesc: 'Planificar, escribir, revisar y editar textos narrativos y expositivos con coherencia, cohesión y ortografía adecuada.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Lluvia de ideas y esquema de estructura textual', durationMinutes: 30, status: 'locked', focusSummary: 'Introducción, desarrollo y desenlace o conclusión.' },
      { lessonNumber: 2, title: 'Cohesión textual: uso correcto de conectores', durationMinutes: 30, status: 'locked', focusSummary: 'Conectores causales, adversativos y consecutivos.' },
      { lessonNumber: 3, title: 'Ortografía acentual (agudas, graves, esdrújulas)', durationMinutes: 30, status: 'locked', focusSummary: 'Reglas generales de acentuación y diptongo/hiato.' },
      { lessonNumber: 4, title: 'Puntuación y eliminación de redundancias', durationMinutes: 30, status: 'locked', focusSummary: 'Uso de punto y coma, comas explicativas y elipsis.' },
      { lessonNumber: 5, title: 'Publicación final y evaluación con rúbrica', durationMinutes: 30, status: 'locked', focusSummary: 'Cierre del proceso de escritura formativa.' }
    ]
  }
];

export const CIENCIAS_7B_OAS: CurricularOA[] = [
  {
    code: 'OA 1',
    number: 1,
    title: 'Sexualidad y Afectividad Integral',
    shortDesc: 'Explicar los aspectos biológicos, afectivos y sociales de la sexualidad, los cambios en la pubertad y la responsabilidad individual.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Dimensiones biológica, afectiva y social', durationMinutes: 30, status: 'ready', focusSummary: 'Visión integral del desarrollo humano en la adolescencia.' },
      { lessonNumber: 2, title: 'Cambios físicos y maduración en la pubertad', durationMinutes: 30, status: 'ready', focusSummary: 'Caracteres sexuales primarios y secundarios.' },
      { lessonNumber: 3, title: 'Relaciones afectivas, empatía y respeto mutuo', durationMinutes: 30, status: 'ready', focusSummary: 'Comunicación asertiva y consentimiento informado.' },
      { lessonNumber: 4, title: 'Toma de decisiones informadas y autocuidado', durationMinutes: 30, status: 'ready', focusSummary: 'Protección personal, límites y canales de ayuda.' },
      { lessonNumber: 5, title: 'Síntesis formativa y resolución de dilemas', durationMinutes: 30, status: 'ready', focusSummary: 'Evaluación formativa del OA 1.' }
    ]
  },
  {
    code: 'OA 2',
    number: 2,
    title: 'Ciclo Menstrual y Reproducción Humana',
    shortDesc: 'Explicar la formación de un nuevo individuo, el ciclo menstrual, la función de los gametos y la paternidad responsable.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Fases del ciclo ovárico y menstrual', durationMinutes: 30, status: 'locked', focusSummary: 'Días fértiles, ovulación y menstruación.' },
      { lessonNumber: 2, title: 'Gametos: espermatozoides y ovocitos', durationMinutes: 30, status: 'locked', focusSummary: 'Estructura celular y aporte genético paterno/materno.' },
      { lessonNumber: 3, title: 'Fecundación y primeras etapas del desarrollo', durationMinutes: 30, status: 'locked', focusSummary: 'Unión de gametos, cigoto y anidación uterina.' },
      { lessonNumber: 4, title: 'Métodos de regulación de la fertilidad', durationMinutes: 30, status: 'locked', focusSummary: 'Métodos de barrera, hormonales y naturales.' },
      { lessonNumber: 5, title: 'Paternidad y maternidad responsables', durationMinutes: 30, status: 'locked', focusSummary: 'Compromiso emocional, económico y social.' }
    ]
  },
  {
    code: 'OA 5',
    number: 5,
    title: 'Microorganismos y Salud Humana',
    shortDesc: 'Comparar virus, bacterias y hongos en relación con su estructura, beneficios para la salud e infecciones comunes.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Estructura celular: bacterias versus virus y hongos', durationMinutes: 30, status: 'locked', focusSummary: 'Células procariontes, acelulares y eucariontes.' },
      { lessonNumber: 2, title: 'Microorganismos benéficos y flora intestinal', durationMinutes: 30, status: 'locked', focusSummary: 'Fermentación, alimentos y digestión saludable.' },
      { lessonNumber: 3, title: 'Patógenos e infecciones infecciosas frecuentes', durationMinutes: 30, status: 'locked', focusSummary: 'Gripe, gastroenteritis y micosis.' },
      { lessonNumber: 4, title: 'Barreras defensivas del cuerpo y vacunación', durationMinutes: 30, status: 'locked', focusSummary: 'Inmunidad innata, adquirida y memoria biológica.' },
      { lessonNumber: 5, title: 'Ensayo de microbiología y prevención', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa del OA 5.' }
    ]
  },
  {
    code: 'OA 7',
    number: 7,
    title: 'Fuerzas y Presión en la Vida Diaria',
    shortDesc: 'Planificar investigaciones experimentales para proveer evidencias de los efectos de las fuerzas y el concepto de presión.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Fuerza como vector: magnitud, dirección y sentido', durationMinutes: 30, status: 'locked', focusSummary: 'Fuerza neta y equilibrio de fuerzas.' },
      { lessonNumber: 2, title: 'Presión en sólidos: relación fuerza / área', durationMinutes: 30, status: 'locked', focusSummary: 'Por qué los clavos tienen punta y las orugas de nieve son anchas.' },
      { lessonNumber: 3, title: 'Presión hidrostática en líquidos y profundidad', durationMinutes: 30, status: 'locked', focusSummary: 'Principio fundamental de la hidrostática.' },
      { lessonNumber: 4, title: 'Presión atmosférica y barómetros', durationMinutes: 30, status: 'locked', focusSummary: 'El peso del aire y experimentos de Torricelli.' },
      { lessonNumber: 5, title: 'Problemas prácticos de fuerza y presión', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa del OA 7.' }
    ]
  },
  {
    code: 'OA 9',
    number: 9,
    title: 'Tectónica de Placas y Vulcanismo',
    shortDesc: 'Explicar con el modelo de placas los patrones de sismos, volcanes y relieve en Chile y el cinturón de fuego.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Estructura interna terrestre y deriva continental', durationMinutes: 30, status: 'locked', focusSummary: 'Corteza, manto, núcleo y corrientes de convección.' },
      { lessonNumber: 2, title: 'Límites de placas: convergente, divergente y transformante', durationMinutes: 30, status: 'locked', focusSummary: 'Subducción de la Placa de Nazca bajo la Sudamericana.' },
      { lessonNumber: 3, title: 'Sismos: epicentro, hipocentro y ondas sísmicas', durationMinutes: 30, status: 'locked', focusSummary: 'Medición de magnitud e intensidad en Chile.' },
      { lessonNumber: 4, title: 'Actividad volcánica y formación de cordilleras', durationMinutes: 30, status: 'locked', focusSummary: 'Cámaras magmáticas, chimeneas y tipos de erupción.' },
      { lessonNumber: 5, title: 'Cultura sísmica y evaluación del OA 9', durationMinutes: 30, status: 'locked', focusSummary: 'Planes de seguridad familiar y síntesis formativa.' }
    ]
  },
  {
    code: 'OA 13',
    number: 13,
    title: 'Comportamiento de Gases Ideales',
    shortDesc: 'Investigar experimentalmente y explicar el comportamiento de los gases ideales mediante las leyes de Boyle, Charles y Gay-Lussac.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Teoría cinético-molecular de los gases', durationMinutes: 30, status: 'locked', focusSummary: 'Partículas en movimiento, volumen, presión y temperatura.' },
      { lessonNumber: 2, title: 'Ley de Boyle: presión y volumen (T constante)', durationMinutes: 30, status: 'locked', focusSummary: 'Relación inversamente proporcional en jeringas.' },
      { lessonNumber: 3, title: 'Ley de Charles: temperatura y volumen (P constante)', durationMinutes: 30, status: 'locked', focusSummary: 'Globos aerostáticos y expansión térmica.' },
      { lessonNumber: 4, title: 'Ley de Gay-Lussac y escala Kelvin absoluta', durationMinutes: 30, status: 'locked', focusSummary: 'Presión de neumáticos en días calurosos.' },
      { lessonNumber: 5, title: 'Cálculo integrado de leyes de gases', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa del OA 13.' }
    ]
  },
  {
    code: 'OA 14',
    number: 14,
    title: 'Clasificación de la Materia: Sustancias y Mezclas',
    shortDesc: 'Clasificar la materia en sustancias puras (elementos, compuestos) y mezclas (homogéneas, heterogéneas) y métodos de separación.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Sustancias puras: elementos y compuestos químicos', durationMinutes: 30, status: 'locked', focusSummary: 'Átomos iguales versus moléculas combinadas fijas.' },
      { lessonNumber: 2, title: 'Mezclas homogéneas o disoluciones', durationMinutes: 30, status: 'locked', focusSummary: 'Soluto, disolvente y concentración visual.' },
      { lessonNumber: 3, title: 'Mezclas heterogéneas, suspensiones y coloides', durationMinutes: 30, status: 'locked', focusSummary: 'Fases distinguibles a simple vista.' },
      { lessonNumber: 4, title: 'Métodos físicos de separación de mezclas', durationMinutes: 30, status: 'locked', focusSummary: 'Filtración, decantación, tamizado y destilación.' },
      { lessonNumber: 5, title: 'Laboratorio mental y ensayo formativo', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación sumativa del OA 14.' }
    ]
  }
];

export const HISTORIA_7B_OAS: CurricularOA[] = [
  {
    code: 'OA 2',
    number: 2,
    title: 'Hominización y Revolución Neolítica',
    shortDesc: 'Explicar el proceso de hominización, la vida paleolítica y la revolución agrícola del Neolítico.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'El proceso de hominización y bipedismo', durationMinutes: 30, status: 'ready', focusSummary: 'Evolución biológica y uso de herramientas líticas.' },
      { lessonNumber: 2, title: 'Sociedades cazadoras-recolectoras del Paleolítico', durationMinutes: 30, status: 'ready', focusSummary: 'Nomadismo, dominio del fuego y arte rupestre.' },
      { lessonNumber: 3, title: 'La domesticación de plantas y animales', durationMinutes: 30, status: 'ready', focusSummary: 'El origen de la agricultura en la Media Luna Fértil.' },
      { lessonNumber: 4, title: 'Sedentarismo, aldeas y división del trabajo', durationMinutes: 30, status: 'ready', focusSummary: 'Excedente alimentario, alfarería y tejidos.' },
      { lessonNumber: 5, title: 'Ensayo histórico de la prehistoria', durationMinutes: 30, status: 'ready', focusSummary: 'Evaluación formativa del OA 2.' }
    ]
  },
  {
    code: 'OA 3',
    number: 3,
    title: 'Primeras Civilizaciones Fluviales',
    shortDesc: 'Explicar el surgimiento de estados organizados, poder centralizado, estratificación social y escritura en las primeras civilizaciones.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'El entorno fluvial de Mesopotamia y Egipto', durationMinutes: 30, status: 'locked', focusSummary: 'Ríos Tigris, Éufrates y Nilo como fuentes de vida.' },
      { lessonNumber: 2, title: 'Poder político centralizado y sociedad estratificada', durationMinutes: 30, status: 'locked', focusSummary: 'Monarquías teocráticas, sacerdotes, campesinos y esclavos.' },
      { lessonNumber: 3, title: 'Sistemas de escritura y primeras leyes escritas', durationMinutes: 30, status: 'locked', focusSummary: 'Escritura cuneiforme, jeroglíficos y Código de Hammurabi.' },
      { lessonNumber: 4, title: 'Arquitectura monumental y religión politeísta', durationMinutes: 30, status: 'locked', focusSummary: 'Pirámides, zigurats y cosmovisiones del más allá.' },
      { lessonNumber: 5, title: 'Síntesis comparada de civilizaciones tempranas', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación sumativa del OA 3.' }
    ]
  },
  {
    code: 'OA 6',
    number: 6,
    title: 'La Democracia Ateniense y la Polis Griega',
    shortDesc: 'Analizar la democracia ateniense, los límites de la ciudadanía y su legado político para el mundo contemporáneo.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'La polis griega y el espacio público del ágora', durationMinutes: 30, status: 'locked', focusSummary: 'Autonomía de las ciudades-estado y sentimiento panhelénico.' },
      { lessonNumber: 2, title: 'Instituciones de la democracia en Atenas', durationMinutes: 30, status: 'locked', focusSummary: 'Ekklesía, Bulé, tribunales populares y ostracismo.' },
      { lessonNumber: 3, title: 'Límites de la ciudadanía ateniense', durationMinutes: 30, status: 'locked', focusSummary: 'Exclusión de mujeres, extranjeros (metecos) y esclavos.' },
      { lessonNumber: 4, title: 'Filosofía, teatro y debate de ideas', durationMinutes: 30, status: 'locked', focusSummary: 'Sócrates, Platón y la tragedia como educación cívica.' },
      { lessonNumber: 5, title: 'Comparación entre democracia clásica y actual', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa del OA 6.' }
    ]
  },
  {
    code: 'OA 7',
    number: 7,
    title: 'La República Romana y el Imperio',
    shortDesc: 'Relacionar las características de la civilización romana (derecho, organización republicana, expansión militar y romanización).',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Organización de la República: Senado y cónsules', durationMinutes: 30, status: 'locked', focusSummary: 'Equilibrio de poderes y lucha de plebeyos por derechos.' },
      { lessonNumber: 2, title: 'El Derecho Romano y la Ley de las XII Tablas', durationMinutes: 30, status: 'locked', focusSummary: 'Fundamentos jurídicos de contratos, igualdad y ciudadanía.' },
      { lessonNumber: 3, title: 'Expansión militar romana en el Mediterráneo (Mare Nostrum)', durationMinutes: 30, status: 'locked', focusSummary: 'Legiones romanas, provincias y tratados.' },
      { lessonNumber: 4, title: 'Romanización: latín, calzadas, acueductos y ciudades', durationMinutes: 30, status: 'locked', focusSummary: 'Difusión de la cultura romana e ingeniería monumental.' },
      { lessonNumber: 5, title: 'Ensayo histórico sobre el legado de Roma', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación sumativa del OA 7.' }
    ]
  },
  {
    code: 'OA 9',
    number: 9,
    title: 'La Civilización Europea Medieval',
    shortDesc: 'Explicar cómo la civilización europea se conforma de la herencia grecorromana, germánica y el cristianismo feudal.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Fragmentación del Imperio Romano y reinos germánicos', durationMinutes: 30, status: 'locked', focusSummary: 'Invasiones y ruralización de la sociedad europea.' },
      { lessonNumber: 2, title: 'La Iglesia Católica como elemento unificador', durationMinutes: 30, status: 'locked', focusSummary: 'Monasterios, clero secular y cosmovisión teocéntrica.' },
      { lessonNumber: 3, title: 'El sistema feudal: vasallaje, señorío y servidumbre', durationMinutes: 30, status: 'locked', focusSummary: 'Relaciones de fidelidad personal y autarquía económica.' },
      { lessonNumber: 4, title: 'Vida cotidiana en el castillo y la aldea campesina', durationMinutes: 30, status: 'locked', focusSummary: 'Trabajo agrícola, tributos y devoción religiosa.' },
      { lessonNumber: 5, title: 'Síntesis de la Alta Edad Media', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa del OA 9.' }
    ]
  },
  {
    code: 'OA 12',
    number: 12,
    title: 'Renacimiento Urbano y Comercial',
    shortDesc: 'Analizar las transformaciones en Europa a partir del siglo XII, el renacer de las ciudades y la burguesía.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Crecimiento demográfico y apertura comercial', durationMinutes: 30, status: 'locked', focusSummary: 'Ferias medievales, rutas marítimas y uso de la moneda.' },
      { lessonNumber: 2, title: 'El nacimiento de las ciudades libres (burgos)', durationMinutes: 30, status: 'locked', focusSummary: 'Corporaciones de artesanos, gremios y maestros.' },
      { lessonNumber: 3, title: 'La burguesía como nuevo actor social emergente', durationMinutes: 30, status: 'locked', focusSummary: 'Comerciantes, banqueros y demandas de libertades.' },
      { lessonNumber: 4, title: 'Las primeras universidades y el saber laico', durationMinutes: 30, status: 'locked', focusSummary: 'Estudios de derecho, medicina y teología en Bolonia y París.' },
      { lessonNumber: 5, title: 'La peste negra y la crisis bajomedieval', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa del OA 12.' }
    ]
  },
  {
    code: 'OA 13',
    number: 13,
    title: 'Civilizaciones Mesoamericanas: Mayas y Aztecas',
    shortDesc: 'Identificar las características de las civilizaciones maya y azteca, su adaptación ambiental, organización y cosmovisión.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Adaptación geográfica de los mayas en la selva', durationMinutes: 30, status: 'locked', focusSummary: 'Agricultura de roza, cenotes y ciudades-estado independientes.' },
      { lessonNumber: 2, title: 'Conocimientos mayas: calendario solar y numeración vigesimal', durationMinutes: 30, status: 'locked', focusSummary: 'Astronomía avanzada y el concepto del cero.' },
      { lessonNumber: 3, title: 'El Imperio Azteca y la fundación de Tenochtitlán', durationMinutes: 30, status: 'locked', focusSummary: 'El lago Texcoco y la ingeniería de las chinampas.' },
      { lessonNumber: 4, title: 'Religión, sacrificios rituales y sociedad mexica', durationMinutes: 30, status: 'locked', focusSummary: 'Templo Mayor, Tláloc, Quetzalcóatl y estamentos sociales.' },
      { lessonNumber: 5, title: 'Ensayo comparativo maya versus azteca', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación sumativa del OA 13.' }
    ]
  },
  {
    code: 'OA 16',
    number: 16,
    title: 'Confluencia Cultural Latinoamericana',
    shortDesc: 'Reconocer en el presente latinoamericano el mestizaje de las culturas indígena, europea y africana.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'El concepto de mestizaje biológico y cultural', durationMinutes: 30, status: 'locked', focusSummary: 'Encuentro de mundos y transformaciones identitarias.' },
      { lessonNumber: 2, title: 'Presencia viva de lenguas originarias (Mapudungun, Quechua)', durationMinutes: 30, status: 'locked', focusSummary: 'Toponimias, palabras cotidianas y patrimonio lingüístico.' },
      { lessonNumber: 3, title: 'Herencia hispánica en la arquitectura y leyes', durationMinutes: 30, status: 'locked', focusSummary: 'Plaza de armas, traza damero y lengua castellana.' },
      { lessonNumber: 4, title: 'Aporte africano en la música, ritmos y gastronomía', durationMinutes: 30, status: 'locked', focusSummary: 'Cultura afrodescendiente en América del Sur.' },
      { lessonNumber: 5, title: 'Apreciación del patrimonio diverso latinoamericano', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa del OA 16.' }
    ]
  },
  {
    code: 'OA 18',
    number: 18,
    title: 'Democracia, República y Derechos Ciudadanos',
    shortDesc: 'Comparar los conceptos de ciudadanía, democracia, derecho, república y municipio a lo largo de la historia.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Qué es una República y por qué se separan los poderes', durationMinutes: 30, status: 'locked', focusSummary: 'Ejecutivo, legislativo y judicial para evitar la tiranía.' },
      { lessonNumber: 2, title: 'Derechos humanos fundamentales y su universalidad', durationMinutes: 30, status: 'locked', focusSummary: 'Declaración Universal de 1948 y dignidad humana.' },
      { lessonNumber: 3, title: 'El rol del municipio en la vida comunitaria', durationMinutes: 30, status: 'locked', focusSummary: 'Gobierno local, participación vecinal y servicios públicos.' },
      { lessonNumber: 4, title: 'Deberes ciudadanos y cuidado del bien común', durationMinutes: 30, status: 'locked', focusSummary: 'Pago de impuestos, respeto a las leyes y solidaridad cívica.' },
      { lessonNumber: 5, title: 'Taller de análisis cívico contemporáneo', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa del OA 18.' }
    ]
  },
  {
    code: 'OA 19',
    number: 19,
    title: 'Valor de la Diversidad Cultural',
    shortDesc: 'Reconocer el valor de la diversidad como enriquecimiento cultural y base del respeto a la dignidad humana.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Qué entendemos por diversidad cultural', durationMinutes: 30, status: 'locked', focusSummary: 'Pluralismo de cosmovisiones y modos de vida.' },
      { lessonNumber: 2, title: 'Pueblos originarios chilenos y reconocimiento', durationMinutes: 30, status: 'locked', focusSummary: 'Mapuches, aymaras, rapanui y pueblos australes.' },
      { lessonNumber: 3, title: 'Migración y comunidades interculturales', durationMinutes: 30, status: 'locked', focusSummary: 'Aportes culturales, laborales y humanos de migrantes.' },
      { lessonNumber: 4, title: 'Superación de prejuicios y estereotipos discriminatorios', durationMinutes: 30, status: 'locked', focusSummary: 'Estrategias de convivencia y empatía activa.' },
      { lessonNumber: 5, title: 'Síntesis de convivencia formativa', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa del OA 19.' }
    ]
  },
  {
    code: 'OA 20',
    number: 20,
    title: 'Convivencia Pacífica y Resolución de Conflictos',
    shortDesc: 'Reconocer distintas formas de convivencia y conflicto entre culturas y estrategias pacíficas de mediación.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'El diálogo socrático como alternativa a la violencia', durationMinutes: 30, status: 'locked', focusSummary: 'Escucha activa y expresión de intereses legítimos.' },
      { lessonNumber: 2, title: 'La figura del mediador en controversias', durationMinutes: 30, status: 'locked', focusSummary: 'Terceros neutrales y búsqueda de soluciones compartidas.' },
      { lessonNumber: 3, title: 'Tratados de paz históricos y sus lecciones', durationMinutes: 30, status: 'locked', focusSummary: 'Acuerdos internacionales y respeto a compromisos.' },
      { lessonNumber: 4, title: 'Manejo de la frustración y clima familiar saludable', durationMinutes: 30, status: 'locked', focusSummary: 'Autorregulación emocional y asertividad en el hogar.' },
      { lessonNumber: 5, title: 'Taller de resolución pacífica de casos', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa del OA 20.' }
    ]
  },
  {
    code: 'OA 21',
    number: 21,
    title: 'Adaptación y Transformación del Medio Geográfico',
    shortDesc: 'Reconocer procesos de adaptación y transformación derivados de la relación entre el ser humano y el medio.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Paisajes geográficos de Chile: norte, centro y sur', durationMinutes: 30, status: 'locked', focusSummary: 'Relieve, clima, vegetación y disponibilidad hídrica.' },
      { lessonNumber: 2, title: 'Estrategias ancestrales de cultivo en pendientes y desiertos', durationMinutes: 30, status: 'locked', focusSummary: 'Terrazas andinas, canales de regadío y atrapanieblas.' },
      { lessonNumber: 3, title: 'Riesgos socionaturales: terremotos, tsunamis y aluviones', durationMinutes: 30, status: 'locked', focusSummary: 'Factores de vulnerabilidad humana frente a eventos naturales.' },
      { lessonNumber: 4, title: 'Planes de emergencia y resiliencia territorial', durationMinutes: 30, status: 'locked', focusSummary: 'Zonas de evacuación y medidas preventivas familiares.' },
      { lessonNumber: 5, title: 'Ensayo de geografía humana y riesgos', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa del OA 21.' }
    ]
  },
  {
    code: 'OA 22',
    number: 22,
    title: 'Impacto Ambiental y Desarrollo Sustentable',
    shortDesc: 'Reconocer y explicar formas en que la acción humana genera impactos en el medio ambiente y formular propuestas sustentables.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'La huella ecológica humana y sobreexplotación', durationMinutes: 30, status: 'locked', focusSummary: 'Deforestación, minería y escasez de agua dulce.' },
      { lessonNumber: 2, title: 'Cambio climático global y efecto invernadero', durationMinutes: 30, status: 'locked', focusSummary: 'Emisiones de gases y aumento de la temperatura oceánica.' },
      { lessonNumber: 3, title: 'Contaminación por plásticos y pérdida de biodiversidad', durationMinutes: 30, status: 'locked', focusSummary: 'Especies amenazadas y acumulación de microplásticos.' },
      { lessonNumber: 4, title: 'Economía circular, reciclaje y energías limpias', durationMinutes: 30, status: 'locked', focusSummary: 'Energía solar, eólica y consumo consciente en el hogar.' },
      { lessonNumber: 5, title: 'Proyecto familiar de sustentabilidad y síntesis', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación sumativa del OA 22.' }
    ]
  }
];

export const INGLES_7B_OAS: CurricularOA[] = [
  {
    code: 'OA 9',
    number: 9,
    title: 'Reading Comprehension of Literary Stories',
    shortDesc: 'Demostrar comprensión de ideas generales e información explícita en textos adaptados y auténticos breves.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Main ideas and characters in adapted short stories', durationMinutes: 30, status: 'ready', focusSummary: 'Protagonists, settings, and main plot elements.' },
      { lessonNumber: 2, title: 'Sequencing events with time connectors (First, Then, Finally)', durationMinutes: 30, status: 'ready', focusSummary: 'Chronological timeline and story arc.' },
      { lessonNumber: 3, title: 'Character feelings, moods, and motivations', durationMinutes: 30, status: 'ready', focusSummary: 'Adjectives of emotion and physical traits.' },
      { lessonNumber: 4, title: 'Context clues for unknown vocabulary', durationMinutes: 30, status: 'ready', focusSummary: 'Inferring word meanings without a dictionary.' },
      { lessonNumber: 5, title: 'Reading comprehension assessment and review', durationMinutes: 30, status: 'ready', focusSummary: 'Multiple-choice questions with distractor analysis.' }
    ]
  },
  {
    code: 'OA 10',
    number: 10,
    title: 'Non-Literary Texts and Informational Articles',
    shortDesc: 'Demostrar comprensión de textos no literarios (descripciones, instrucciones, artículos de divulgación breve).',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Skimming and scanning in short science articles', durationMinutes: 30, status: 'locked', focusSummary: 'Finding specific facts, dates, and names quickly.' },
      { lessonNumber: 2, title: 'Understanding graphic organizers, tables, and infographics', durationMinutes: 30, status: 'locked', focusSummary: 'Visual cues and key statistics in English.' },
      { lessonNumber: 3, title: 'Following multi-step instructions and recipes', durationMinutes: 30, status: 'locked', focusSummary: 'Imperative verbs and sequential transitions.' },
      { lessonNumber: 4, title: 'Identifying the author’s primary purpose', durationMinutes: 30, status: 'locked', focusSummary: 'To inform, warn, guide, or describe.' },
      { lessonNumber: 5, title: 'Formative informational reading quiz', durationMinutes: 30, status: 'locked', focusSummary: 'Summative check for OA 10.' }
    ]
  },
  {
    code: 'OA 13',
    number: 13,
    title: 'Written Expression and Short Stories',
    shortDesc: 'Escribir historias e información relevante usando conectores básicos y vocabulario contextual temático.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Sentence building: Subject + Verb + Object (SVO)', durationMinutes: 30, status: 'locked', focusSummary: 'Avoiding run-on sentences and fragments.' },
      { lessonNumber: 2, title: 'Using connectors of cause and effect (because, so)', durationMinutes: 30, status: 'locked', focusSummary: 'Linking simple sentences into compound sentences.' },
      { lessonNumber: 3, title: 'Writing a personal profile or daily routine', durationMinutes: 30, status: 'locked', focusSummary: 'Describing daily activities and hobbies.' },
      { lessonNumber: 4, title: 'Punctuation, capital letters, and spelling check', durationMinutes: 30, status: 'locked', focusSummary: 'Self-correction checklist for young learners.' },
      { lessonNumber: 5, title: 'Final writing showcase and rubric feedback', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación formativa de producción escrita.' }
    ]
  },
  {
    code: 'OA 16',
    number: 16,
    title: 'Grammar and Vocabulary in Context',
    shortDesc: 'Demostrar conocimiento y uso del lenguaje en textos escritos: presente simple, preguntas wh-, y modales básicos.',
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      { lessonNumber: 1, title: 'Present Simple for habits and routines (he/she/it -s)', durationMinutes: 30, status: 'locked', focusSummary: 'Affirmative, negative (don’t/doesn’t) and adverbs of frequency.' },
      { lessonNumber: 2, title: 'Forming Wh- questions (What, Where, When, Who, Why)', durationMinutes: 30, status: 'locked', focusSummary: 'Auxiliary do/does and question word order.' },
      { lessonNumber: 3, title: 'Modal verbs of ability and permission (can, can’t)', durationMinutes: 30, status: 'locked', focusSummary: 'Expressing what you can and cannot do.' },
      { lessonNumber: 4, title: 'Countable and uncountable nouns with some and any', durationMinutes: 30, status: 'locked', focusSummary: 'Quantifiers in food and everyday objects.' },
      { lessonNumber: 5, title: 'Grammar synthesis and communicative mini-quiz', durationMinutes: 30, status: 'locked', focusSummary: 'Evaluación sumativa del OA 16.' }
    ]
  }
];

export function getSubjectOAs(grade: string, subjectName: string): CurricularOA[] {
  const norm = subjectName.toLowerCase().trim();
  if (norm.includes('mat')) return MATEMATICA_7B_OAS;
  if (norm.includes('leng') || norm.includes('liter')) return LENGUAJE_7B_OAS;
  if (norm.includes('cien') || norm.includes('nat')) return CIENCIAS_7B_OAS;
  if (norm.includes('hist') || norm.includes('geog') || norm.includes('soc')) return HISTORIA_7B_OAS;
  if (norm.includes('ing') || norm.includes('eng')) return INGLES_7B_OAS;
  return MATEMATICA_7B_OAS;
}
