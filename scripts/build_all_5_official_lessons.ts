import fs from 'fs';
import path from 'path';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  ShadingType
} from '../Web Studio Simple/node_modules/docx';

export interface SlideData {
  num: string;
  title: string;
  subtitle: string;
  screenText: string[];
  visualPrompt: string;
  script: string;
  source: string;
}

export interface QuizQuestion {
  code: string;
  question: string;
  options: { letter: string; text: string; isCorrect: boolean }[];
  distractorsAnalysis: { letter: string; text: string; reason: string }[];
}

export interface LessonData {
  subject: string;
  subjectCode: string;
  folderCode: string;
  grade: string;
  oaCode: string;
  oaTitle: string;
  lessonNumber: number;
  totalLessons: number;
  lessonTitle: string;
  dateStr: string;
  status: string;
  sources: { title: string; details: string }[];
  subobjective: string;
  preInstance: {
    purpose: string;
    materials: string[];
    timeEstimate: string;
    mediationAdvice: string;
  };
  stage1: {
    welcome: string;
    curriculumLocation: string;
    priorKnowledge: string;
    sessionFocus: string;
    learningPath: string[];
    mentor: {
      dile: string;
      espera: string;
      siBien: string;
      siApoyo: string;
    };
  };
  stage2: {
    slides: SlideData[];
    mentorPrev: string;
    mentorCheck: string;
  };
  stage3: {
    questions: {
      qText: string;
      expected: string;
      hint: string;
      reinforce: string;
      formativeSupport: string;
      source: string;
    }[];
    mentor: {
      dile: string;
      espera: string;
      siBien: string;
      siApoyo: string;
    };
  };
  stage4: {
    slides: SlideData[];
    caseModel: {
      title: string;
      steps: { stepName: string; desc: string; source: string }[];
    };
    goldenRule: string;
  };
  stage5: {
    notebookPrompt: string;
    expectedOutcome: { section: string; desc: string; source: string }[];
    hints: string[];
    mentor: {
      dile: string;
      espera: string;
      siBien: string;
      siApoyo: string;
    };
  };
  stage6: {
    keyIdeas: { text: string; source: string }[];
    synthesisCard: string;
    mentor: {
      dile: string;
      espera: string;
      siBien: string;
      siApoyo: string;
    };
  };
  stage7: {
    questions: QuizQuestion[];
    remedialCapsule: string;
    remedialItem: {
      question: string;
      options: string[];
      correctLetter: string;
      justification: string;
    };
  };
  stage8: {
    metacognitivePrompt: string;
    congratulation: string;
    transferNext: string;
    mentor: {
      dile: string;
      espera: string;
      siBien: string;
      siApoyo: string;
    };
  };
}

// ==========================================
// 1. CIENCIAS NATURALES
// ==========================================
export const CIENCIAS_DATA: LessonData = {
  subject: 'Ciencias Naturales',
  subjectCode: 'CIE',
  folderCode: '110-7-CIE-OA01',
  grade: '7.° Básico',
  oaCode: 'OA01',
  oaTitle: 'Comprender la sexualidad como un proceso biológico, afectivo y social; cambios físicos de la pubertad; responsabilidad y respeto mutuo',
  lessonNumber: 1,
  totalLessons: 6,
  lessonTitle: 'Las Dimensiones de la Sexualidad y el Inicio de la Pubertad',
  dateStr: '2026-10-09 19:45 [America/Santiago]',
  status: 'EN_REVISION',
  sources: [
    {
      title: 'Texto del estudiante de Ciencias Naturales 7° básico SM',
      details: 'Edición 2024, SM S.A. / MINEDUC, ISBN 978-956-403-295-5, Unidad 4: Salud sexual y reproducción, págs. 114 a 125.'
    },
    {
      title: 'Resumen Curricular Oficial MINEDUC',
      details: 'INSUMOS/RESUMENES/110-7/RESUMEN CIENCIAS NATURALES.pdf, págs. 2 a 4.'
    },
    {
      title: 'Currículum Nacional Oficial MINEDUC (OA01)',
      details: 'Comprender la sexualidad como proceso biológico, afectivo y social; cambios físicos de la pubertad; responsabilidad y respeto mutuo (curriculumnacional.cl/614/w3-article-70157.html).'
    },
    {
      title: 'Actividad Complementaria Oficial MINEDUC',
      details: 'Actividad sobre pubertad y regulación hormonal (articles-26565_recurso_pauta_pdf.pdf).'
    }
  ],
  subobjective: 'Identificar las cuatro dimensiones de la sexualidad humana (biológica, afectiva, psicológica y social) y reconocer que el inicio de la pubertad está regulado por el sistema endocrino y las señales hormonales.',
  preInstance: {
    purpose: 'Disponer el ambiente de trabajo en el hogar antes de abrir la aplicación digital.',
    materials: [
      'Cuaderno de Ciencias Naturales del estudiante.',
      'Lápiz grafito o mina, goma de borrar y regla graduada de 20 cm.'
    ],
    timeEstimate: '30 a 35 minutos de trabajo concentrado.',
    mediationAdvice: 'Crear un clima de acogida, confianza y respeto mutuo. La pubertad es un fenómeno biológico y social universal y natural por el que transitan todas las personas. Evitar comentarios que generen vergüenza o incomodidad.'
  },
  stage1: {
    welcome: '¡Hola! Te damos la bienvenida a tu clase de Ciencias Naturales en EstudioSimple.',
    curriculumLocation: 'Clase 1 de 6 (Secuencia OA01 — Unidad 4: Salud sexual y reproducción).',
    priorKnowledge: 'En 6° básico aprendiste cómo los seres vivos crecen y se reproducen. Hoy exploraremos cómo el cuerpo humano comienza su transición hacia la adultez.',
    sessionFocus: 'Descubrir qué es la pubertad, cómo se activan las hormonas reguladoras en nuestro cuerpo y cuáles son las cuatro dimensiones de la sexualidad humana: biológica, afectiva, psicológica y social.',
    learningPath: [
      'Video Motivacional: El Gran Cambio de Sofía y Tomás.',
      'Recorrido: Conversación guiada e indagación socrática.',
      'Video Explicativo: Las 4 dimensiones y el eje hormonal.',
      'Práctica: Trabajo de aplicación en el cuaderno físico.',
      'Resumen, Miniquiz formativo y Cierre metacognitivo.'
    ],
    mentor: {
      dile: 'Hoy comenzaremos una nueva unidad de Ciencias muy interesante sobre el desarrollo humano. Vamos a ver cómo cambia nuestro cuerpo y nuestras emociones al crecer.',
      espera: 'Espera a que el estudiante abra su cuaderno y anote con letra clara la fecha y el título: Dimensiones de la sexualidad y la pubertad.',
      siBien: '¡Excelente! Veo que estás listo con tu cuaderno y estuche.',
      siApoyo: 'Anímalo recordándole que aprenderemos conceptos científicos muy valiosos para entender los cambios propios de la edad.'
    }
  },
  stage2: {
    slides: [
      {
        num: 'G1',
        title: 'El Gran Cambio',
        subtitle: 'Creciendo paso a paso',
        screenText: ['• El Gran Cambio', '• Sofía y Tomás observan su historia'],
        visualPrompt: 'Sofía con trenzas y Tomás con chaqueta cerceta (13 años) en la sala de clases mirando fotos de cuando tenían 8 años. Composición limpia 16:9 estilo Anime moderno. No text drawn by AI.',
        script: '¿Te has fijado en cómo cambiamos las personas a medida que pasan los años? Sofía y Tomás encontraron una fotografía de cuando entraron a primero básico.',
        source: 'Texto SM 7°, Unidad 4, pág. 114 (Apertura de unidad y reflexión sobre el crecimiento).'
      },
      {
        num: 'G2',
        title: 'Mucho Más que Estatura',
        subtitle: 'Transformaciones múltiples',
        screenText: ['• ¿Solo la estatura?', '• Cuerpo, voz y emociones'],
        visualPrompt: 'Tomás se mira al espejo notando que su voz suena más grave y Sofía reflexiona en su escritorio sobre sus emociones. Espacio negativo superior. No text drawn by AI.',
        script: 'Casi siempre pensamos que crecer es solo hacernos más altos. Pero Tomás notó que su tono de voz se vuelve más grave y Sofía siente que sus emociones son más intensas.',
        source: 'Texto SM 7°, pág. 119 (Cambios físicos); Resumen MINEDUC, pág. 3 (Cambios físicos y emocionales).'
      },
      {
        num: 'G3',
        title: 'La Pubertad',
        subtitle: 'Etapa de transición',
        screenText: ['• La Pubertad', '• Cambios físicos y maduración', '• El ritmo varía en cada persona'],
        visualPrompt: 'Infografía contextual animada mostrando una línea de vida desde la infancia hasta la juventud con ambos personajes caminando. No text drawn by AI.',
        script: 'La pubertad es una etapa del desarrollo en que ocurren cambios físicos y de maduración sexual. El momento de inicio y el ritmo de esos cambios varían entre las personas.',
        source: 'Texto SM 7°, pág. 119; Resumen MINEDUC, pág. 2 y pág. 3 (Pubertad y variabilidad del desarrollo).'
      },
      {
        num: 'G4',
        title: 'El Reloj Interno',
        subtitle: 'Señales invisibles',
        screenText: ['• El Reloj Interno', '• ¿Quién enciende los cambios?'],
        visualPrompt: 'Representación estilizada y respetuosa del sistema nervioso central con un suave resplandor en la base del cerebro. No text drawn by AI.',
        script: 'Pero, ¿cómo sabe nuestro cuerpo cuándo debe comenzar este cambio? ¿Hay un reloj invisible dentro de nosotros que da la señal de partida?',
        source: 'Texto SM 7°, págs. 124–125 (Regulación biológica por hormonas corporales).'
      },
      {
        num: 'G5',
        title: 'Dimensiones Humanas',
        subtitle: 'Más allá de lo físico',
        screenText: ['• Ser Persona', '• Afecto, mente y sociedad'],
        visualPrompt: 'Sofía conversando con su familia en la mesa del hogar y Tomás compartiendo un proyecto escolar con amigos. No text drawn by AI.',
        script: 'Crecer no ocurre en soledad. Cambia la forma en que nos valoramos a nosotros mismos, cómo expresamos cariño y cómo nos relacionamos con los demás.',
        source: 'Texto SM 7°, pág. 120 (Dimensión social) y pág. 123 (Dimensión emocional y afectiva).'
      },
      {
        num: 'G6',
        title: 'El Desafío Científico',
        subtitle: 'Nuestra misión de hoy',
        screenText: ['• Misión de Hoy', '• Descubrir las cuatro dimensiones'],
        visualPrompt: 'Sofía y Tomás en el laboratorio escolar con un cuaderno de notas y una lupa científica mirando con entusiasmo. No text drawn by AI.',
        script: 'Hoy tenemos una misión científica: descubriremos qué cuatro dimensiones componen la sexualidad humana y qué glándula enciende el motor hormonal.',
        source: 'Texto SM 7°, pág. 114; Resumen MINEDUC, pág. 2 (Comprender las dimensiones de la sexualidad).'
      },
      {
        num: 'G7',
        title: '¡A Explorar!',
        subtitle: 'Comienza la aventura',
        screenText: ['• ¡A Explorar!', '• Acompáñanos a descubrir la ciencia'],
        visualPrompt: 'Plano general de ambos jóvenes sonriendo e invitando al estudiante. Logo oficial blanco en esquina inferior derecha. No text drawn by AI.',
        script: '¡Acompáñanos! Abre tu mente curiosa y descubramos juntos la ciencia de nuestro propio desarrollo.',
        source: 'Texto SM 7°, Unidad 4, pág. 114 (Invitación al análisis y diálogo científico).'
      }
    ],
    mentorPrev: 'Mira el video con atención y fíjate en qué cosas cambian además del tamaño del cuerpo.',
    mentorCheck: '¿Qué cambios mencionaron Tomás y Sofía que no eran solo físicos?'
  },
  stage3: {
    questions: [
      {
        qText: 'En el video, Tomás notó cambios en su voz y Sofía en sus emociones. ¿Por qué crees que cambiar no es solo hacerse más alto?',
        expected: 'Porque al crecer también madura nuestra forma de pensar, sentir, expresar emociones y convivir con las demás personas.',
        hint: 'Piensa en cómo te sentías cuando eras más pequeño respecto a tus amigos o a las cosas que te gustaban.',
        reinforce: '¡Exacto! El desarrollo humano incluye el cuerpo, la mente, los afectos y la vida en comunidad.',
        formativeSupport: 'Recuerda que Sofía habló de cómo se siente con su familia y amigos. Esos son cambios emocionales y sociales.',
        source: 'Texto SM 7°, pág. 120 y 123; Resumen MINEDUC, pág. 3.'
      },
      {
        qText: '¿Qué crees tú que activa estos cambios dentro del cuerpo humano?',
        expected: 'Un sistema interno de sustancias químicas llamadas hormonas que son reguladas desde el cerebro.',
        hint: 'Tiene que ver con sustancias químicas mensajeras que viajan por la sangre llamadas hormonas.',
        reinforce: '¡Muy bien anticipado! El cuerpo produce hormonas mensajeras que activan el crecimiento.',
        formativeSupport: 'En el video explicativo veremos que glándulas especiales producen hormonas que coordinan los cambios.',
        source: 'Texto SM 7°, pág. 125; Actividad Complementaria MINEDUC (Control hormonal en la pubertad).'
      }
    ],
    mentor: {
      dile: 'Vamos a reflexionar sobre lo que acabas de ver. Responde a estas preguntas con tus propias palabras.',
      espera: 'Escucha atentamente sin apurar su respuesta (15 a 20 segundos de pausa reflexiva).',
      siBien: '¡Qué buena observación! Se nota que estuviste atento a los detalles.',
      siApoyo: 'Usa la pista que aparece en pantalla para guiarlo paso a paso.'
    }
  },
  stage4: {
    slides: [
      {
        num: 'E1',
        title: 'La Sexualidad Integral',
        subtitle: 'Un concepto multidimensional',
        screenText: ['• Sexualidad Humana', '• Una dimensión integral del ser'],
        visualPrompt: 'Diagrama armónico con cuatro cuadrantes de colores suaves que representan las dimensiones biológica, afectiva, psicológica y social. No text drawn by AI.',
        script: 'En ciencias, la sexualidad humana no es solo un hecho biológico o reproductivo. Es una dimensión integral que nos acompaña durante toda la vida.',
        source: 'Texto SM 7°, Unidad 4, pág. 114 y pág. 118; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'E2',
        title: 'Cuatro Dimensiones',
        subtitle: 'La persona completa',
        screenText: ['• Cuatro Dimensiones', '• Biológica, Afectiva, Psicológica y Social'],
        visualPrompt: 'Iconografía vectorial limpia: ADN/célula (Biológica), corazón cálido (Afectiva), silueta con engranajes de pensamiento (Psicológica), grupo de personas (Social). No text drawn by AI.',
        script: 'Se compone de cuatro dimensiones entrelazadas: la dimensión biológica, la afectiva, la psicológica y la social.',
        source: 'Texto SM 7°, págs. 119, 120 y 123; Resumen MINEDUC, págs. 2–3.'
      },
      {
        num: 'E3',
        title: 'Dimensión Biológica',
        subtitle: 'Anatomía y fisiología',
        screenText: ['• Dimensión Biológica', '• Cuerpo, cromosomas y hormonas'],
        visualPrompt: 'Esquema anatómico pedagógico limpio destacando los caracteres sexuales y el sistema endocrino. No text drawn by AI.',
        script: 'La dimensión biológica comprende la anatomía corporal, los órganos reproductores, los cromosomas y las hormonas que dirigen los cambios físicos.',
        source: 'Texto SM 7°, Unidad 4, pág. 119 (Caracteres sexuales) y pág. 125 (Hormonas reguladoras).'
      },
      {
        num: 'E4',
        title: 'El Control Hormonal',
        subtitle: 'El motor biológico de la pubertad',
        screenText: ['• Regulación Hormonal', '• Señales químicas en la sangre', '• Coordinación de los cambios'],
        visualPrompt: 'Diagrama pedagógico del sistema endocrino humano mostrando las glándulas que producen hormonas sexuales y su transporte por la sangre hacia los tejidos. Flechas nítidas. No text drawn by AI.',
        script: 'Durante la pubertad, el cuerpo comienza a producir hormonas sexuales. Estas sustancias químicas viajan por la sangre y actúan como señales biológicas que regulan la maduración de los caracteres sexuales y los cambios físicos propios de esta etapa.',
        source: 'Texto SM 7°, Unidad 4, pág. 125; Actividad Complementaria MINEDUC (Pubertad y control hormonal, pauta docente págs. 1–2).'
      },
      {
        num: 'E5',
        title: 'Mente, Afecto y Sociedad',
        subtitle: 'Las otras tres dimensiones',
        screenText: ['• Psicológica, Afectiva y Social', '• Sentimientos, identidad y convivencia'],
        visualPrompt: 'Ilustración de jóvenes colaborando en proyectos, expresando afecto familiar y tomando decisiones responsables. No text drawn by AI.',
        script: 'La dimensión psicológica abarca el autoconcepto e identidad; la afectiva incluye los sentimientos, vínculos y cariño; y la social abarca las normas de respeto y convivencia.',
        source: 'Texto SM 7°, Unidad 4, pág. 120 (Dimensión social) y pág. 123 (Dimensión emocional y afectiva).'
      },
      {
        num: 'E6',
        title: 'Caso Modelo',
        subtitle: 'Análisis de una situación real',
        screenText: ['• Caso de Martín', '• Identificación de dimensiones'],
        visualPrompt: 'Sofía y Tomás analizan en una pizarra una situación cotidiana: Martín experimenta cambios en su voz, reflexiona sobre su identidad y dialoga con sus padres con respeto. No text drawn by AI.',
        script: 'Veamos nuestro caso modelo: Cuando Martín nota que su voz cambia (dimensión biológica), reflexiona sobre cómo se percibe a sí mismo (dimensión psicológica) y conversa con cariño y respeto con su familia (dimensiones afectiva y social).',
        source: 'Texto SM 7°, Unidad 4, págs. 119, 120 y 123; Resumen MINEDUC, pág. 3.'
      },
      {
        num: 'E7',
        title: 'Regla de Oro',
        subtitle: 'Principio científico clave',
        screenText: ['• Regla de Oro', '• La sexualidad es integral y universal'],
        visualPrompt: 'Cuadro resumen nítido con tipografía formal destacando la Regla de Oro. Logo blanco inferior derecho. No text drawn by AI.',
        script: 'Nuestra Regla de Oro: La sexualidad humana es integral; conjuga biología, afecto, mente y sociedad en cada etapa del desarrollo.',
        source: 'Texto SM 7°, Unidad 4, pág. 114 y pág. 118; Resumen MINEDUC, pág. 4.'
      }
    ],
    caseModel: {
      title: 'Caso Modelo: Martín y las Cuatro Dimensiones',
      steps: [
        { stepName: 'Paso 1 (Biológica)', desc: 'El cambio de voz y crecimiento corporal provienen de la activación hormonal de la pubertad.', source: 'Texto SM, pág. 119.' },
        { stepName: 'Paso 2 (Psicológica)', desc: 'El reconocimiento de su propia identidad y autoconcepto al verse crecer.', source: 'Texto SM, pág. 123.' },
        { stepName: 'Paso 3 (Afectiva)', desc: 'La expresión de afecto, confianza y búsqueda de contención emocional en la familia.', source: 'Texto SM, pág. 123.' },
        { stepName: 'Paso 4 (Social)', desc: 'La convivencia respetuosa con sus pares y el cumplimiento de normas de cuidado mutuo.', source: 'Texto SM, pág. 120.' }
      ]
    },
    goldenRule: 'La sexualidad humana es una dimensión integral que conjuga lo biológico, lo afectivo, lo psicológico y lo social en el desarrollo de la persona.'
  },
  stage5: {
    notebookPrompt: 'Abre tu cuaderno de Ciencias Naturales. Traza dos líneas perpendiculares con regla para formar una cruz que divida la página en 4 cuadrantes. Rotula cada cuadrante con una dimensión: 1) Biológica, 2) Afectiva, 3) Psicológica, 4) Social. Escribe en cada cuadrante una característica o ejemplo concreto aprendido en la clase.',
    expectedOutcome: [
      { section: 'Cuadrante 1 (Biológica)', desc: 'Hormonas sexuales, caracteres sexuales primarios y secundarios, cambios físicos corporales.', source: 'Texto SM, pág. 119.' },
      { section: 'Cuadrante 2 (Afectiva)', desc: 'Sentimientos, capacidad de expresar cariño, empatía y vínculos con personas queridas.', source: 'Texto SM, pág. 123.' },
      { section: 'Cuadrante 3 (Psicológica)', desc: 'Autoconcepto, identidad personal, forma de pensar y toma de decisiones conscientes.', source: 'Texto SM, pág. 123.' },
      { section: 'Cuadrante 4 (Social)', desc: 'Normas de convivencia, respeto a la diversidad, relaciones familiares y de amistad.', source: 'Texto SM, pág. 120.' }
    ],
    hints: [
      'Pista 1: Si tienes dudas con la dimensión biológica, recuerda qué sustancias químicas regulan los cambios físicos (hormonas).',
      'Pista 2: Para la dimensión psicológica, piensa en lo que ocurre dentro de los pensamientos y la propia identidad.'
    ],
    mentor: {
      dile: 'Ahora vamos a trabajar en tu cuaderno físico. Dibuja los cuatro cuadrantes y escribe una idea en cada uno. Tómate tu tiempo.',
      espera: 'Dale entre 5 y 8 minutos para dibujar el cuadro con regla y escribir los ejemplos en silencio.',
      siBien: '¡Qué gran organizador gráfico! Has capturado con mucha claridad las cuatro dimensiones.',
      siApoyo: 'Repasa con él las diapositivas 2 y 5 del video explicativo para recordar ejemplos cotidianos.'
    }
  },
  stage6: {
    keyIdeas: [
      { text: 'La sexualidad humana es una dimensión integral que abarca cuatro componentes: biológico, afectivo, psicológico y social.', source: 'Texto SM, pág. 114; Resumen MINEDUC, pág. 2.' },
      { text: 'La pubertad es el periodo biológico de transición hacia la madurez reproductiva y está regulada por hormonas sexuales coordinadas por el sistema endocrino.', source: 'Texto SM, págs. 119 y 125; Actividad Complementaria MINEDUC sobre pubertad.' },
      { text: 'Los cambios durante la pubertad son universales y naturales en la especie humana, y requieren autocuidado, respeto y empatía.', source: 'Texto SM, pág. 120; Resumen MINEDUC, pág. 4.' }
    ],
    synthesisCard: 'Pubertad = Eje hormonal activo. Sexualidad = Biología + Afecto + Psicología + Sociedad.',
    mentor: {
      dile: 'Leamos juntos las tres ideas de resumen para fijar lo que aprendimos hoy.',
      espera: 'Pídele al estudiante que lea cada idea y que te explique con sus palabras qué significa la palabra "integral".',
      siBien: '¡Excelente comprensión! Integral significa que reúne todas las partes de la persona.',
      siApoyo: 'Explícale que "integral" es como un rompecabezas donde no puede faltar ninguna pieza.'
    }
  },
  stage7: {
    questions: [
      {
        code: 'Q1-CIE7-OA01',
        question: '¿Cuál de los siguientes aspectos corresponde a una manifestación de la dimensión biológica de la sexualidad humana?',
        options: [
          { letter: 'A', text: 'La capacidad de ponerse en el lugar de un compañero triste.', isCorrect: false },
          { letter: 'B', text: 'La producción de hormonas sexuales estimuladas por la hipófisis.', isCorrect: true },
          { letter: 'C', text: 'Las tradiciones culturales sobre la vestimenta en una fiesta patria.', isCorrect: false },
          { letter: 'D', text: 'La reflexión interna sobre las metas personales a largo plazo.', isCorrect: false }
        ],
        distractorsAnalysis: [
          { letter: 'A', text: 'La capacidad de ponerse en el lugar de un compañero triste.', reason: 'Distractor. La empatía corresponde a las dimensiones afectiva y psicológica (Texto SM, pág. 123).' },
          { letter: 'C', text: 'Las tradiciones culturales sobre la vestimenta en una fiesta patria.', reason: 'Distractor. Las tradiciones corresponden a la dimensión social y cultural (Texto SM, pág. 120).' },
          { letter: 'D', text: 'La reflexión interna sobre las metas personales a largo plazo.', reason: 'Distractor. La autorreflexión corresponde a la dimensión psicológica (Texto SM, pág. 123).' }
        ]
      },
      {
        code: 'Q2-CIE7-OA01',
        question: '¿Qué estructura del sistema nervioso central inicia la secuencia hormonal que activa la pubertad al estimular a la glándula hipófisis?',
        options: [
          { letter: 'A', text: 'El hipotálamo.', isCorrect: true },
          { letter: 'B', text: 'El cerebelo.', isCorrect: false },
          { letter: 'C', text: 'La médula espinal.', isCorrect: false },
          { letter: 'D', text: 'El lóbulo occipital.', isCorrect: false }
        ],
        distractorsAnalysis: [
          { letter: 'B', text: 'El cerebelo.', reason: 'Distractor. El cerebelo coordina la postura corporal y el equilibrio motor.' },
          { letter: 'C', text: 'La médula espinal.', reason: 'Distractor. La médula espinal transmite impulsos nerviosos sensitivos y motores.' },
          { letter: 'D', text: 'El lóbulo occipital.', reason: 'Distractor. El lóbulo occipital procesa la información visual.' }
        ]
      },
      {
        code: 'Q3-CIE7-OA01',
        question: 'Dos amigos conversan con sinceridad, se brindan apoyo mutuo en un momento difícil y se tratan con respeto y afecto. ¿Qué dimensiones de la sexualidad humana se manifiestan principalmente en esta situación?',
        options: [
          { letter: 'A', text: 'Exclusivamente la dimensión biológica y genética.', isCorrect: false },
          { letter: 'B', text: 'Las dimensiones afectiva y social.', isCorrect: true },
          { letter: 'C', text: 'Únicamente la dimensión anatómica y hormonal.', isCorrect: false },
          { letter: 'D', text: 'Ninguna dimensión, ya que no intervienen médicos.', isCorrect: false }
        ],
        distractorsAnalysis: [
          { letter: 'A', text: 'Exclusivamente la dimensión biológica y genética.', reason: 'Distractor. No se describe un proceso fisiológico o genético directo (Texto SM, pág. 119).' },
          { letter: 'C', text: 'Únicamente la dimensión anatómica y hormonal.', reason: 'Distractor. No se refiere a estructuras anatómicas o secreciones hormonales.' },
          { letter: 'D', text: 'Ninguna dimensión, ya que no intervienen médicos.', reason: 'Distractor. Falsa: La sexualidad humana se vive en la vida cotidiana de todas las personas sin requerir un contexto clínico (Resumen MINEDUC, pág. 2).' }
        ]
      }
    ],
    remedialCapsule: 'Recuerda: La sexualidad humana está formada por cuatro dimensiones que se complementan. La dimensión biológica incluye tu cuerpo y las hormonas producidas por el sistema endocrino. La dimensión afectiva reúne tus sentimientos y el cariño que compartes (Texto SM, pág. 114).',
    remedialItem: {
      question: 'Si una persona reconoce sus propias fortalezas, reflexiona sobre quién es y toma decisiones sobre cómo actuar, ¿qué dimensión está ejerciendo?',
      options: ['A) Dimensión biológica.', 'B) Dimensión psicológica. [CORRECTA]', 'C) Dimensión celular.', 'D) Dimensión respiratoria.'],
      correctLetter: 'B',
      justification: 'La autoconciencia, el autoconcepto y la toma de decisiones conscientes son características centrales de la dimensión psicológica (Texto SM, pág. 123; Resumen MINEDUC, pág. 2).'
    }
  },
  stage8: {
    metacognitivePrompt: 'A partir del caso de Martín que analizamos en la clase, ¿por qué es importante comprender que la sexualidad abarca el afecto y la sociedad, y no solamente los cambios biológicos del cuerpo?',
    congratulation: '¡Felicitaciones por completar con dedicación tu primera clase sobre el desarrollo humano!',
    transferNext: 'En la Clase 2 investigaremos a fondo cómo las hormonas sexuales dan origen a los caracteres sexuales primarios y secundarios, y cómo maduran los gametos.',
    mentor: {
      dile: '¡Muy bien hecho! Cuéntame qué fue lo más valioso que aprendiste hoy sobre el caso de Martín y las cuatro dimensiones de la sexualidad humana.',
      espera: 'Escucha su reflexión con una sonrisa y felicítalo por su concentración y trabajo.',
      siBien: '¡Qué buena reflexión! Cerramos el cuaderno y quedamos listos para la siguiente clase.',
      siApoyo: 'Recuérdale que la sexualidad humana es integral y reúne mente, cuerpo, afecto y sociedad.'
    }
  }
};

// ==========================================
// 2. MATEMÁTICA
// ==========================================
export const MATEMATICA_DATA: LessonData = {
  subject: 'Matemática',
  subjectCode: 'MAT',
  folderCode: '110-7-MAT-OA01',
  grade: '7.° Básico',
  oaCode: 'OA01',
  oaTitle: 'Comprender la adición y la sustracción de números enteros: representando de manera concreta, pictórica y simbólica; resolviendo problemas de la vida diaria y usando la recta numérica',
  lessonNumber: 1,
  totalLessons: 6,
  lessonTitle: 'Los Números Enteros y la Recta Numérica en la Vida Diaria',
  dateStr: '2026-10-09 19:45 [America/Santiago]',
  status: 'EN_REVISION',
  sources: [
    {
      title: 'Texto del estudiante Matemática 7° básico',
      details: 'Edición 2024, Santillana / MINEDUC, Unidad 1: Números, Lección 1: Números enteros, págs. 10 a 22.'
    },
    {
      title: 'Resumen Curricular Oficial MINEDUC',
      details: 'INSUMOS/RESUMENES/110-7/RESUMEN MATEMÁTICA.pdf, págs. 2 a 4.'
    },
    {
      title: 'Bases Curriculares Oficiales MINEDUC (OA01)',
      details: 'Mostrar que comprenden la adición y la sustracción de números enteros: representando los números enteros de manera concreta, pictórica y simbólica; dándole significado a los símbolos + y - según el contexto.'
    }
  ],
  subobjective: 'Comprender el concepto del conjunto de los números enteros (Z), su ordenamiento en la recta numérica respecto al cero y su aplicación para modelar situaciones reales de temperatura, altitud y saldos financieros.',
  preInstance: {
    purpose: 'Disponer un espacio ordenado y materiales de trazo geométrico antes de iniciar la interacción digital.',
    materials: [
      'Cuaderno de Matemática (cuadriculado).',
      'Lápiz grafito, goma de borrar y regla graduada de 20 o 30 cm.',
      'Dos lápices de colores (azul para números positivos y rojo para negativos).'
    ],
    timeEstimate: '35 a 40 minutos de trabajo concentrado.',
    mediationAdvice: 'Enfatizar que los números negativos no son "errores" o "números falsos", sino herramientas exactas creadas por la matemática para expresar sentidos opuestos, deudas y valores bajo un nivel de referencia.'
  },
  stage1: {
    welcome: '¡Hola! Te damos la bienvenida a tu clase de Matemática en EstudioSimple.',
    curriculumLocation: 'Clase 1 de 6 (Secuencia OA01 — Unidad 1: Números enteros).',
    priorKnowledge: 'Hasta 6° básico trabajaste con los números naturales (0, 1, 2, 3...) y fracciones. Hoy ampliaremos nuestro universo numérico para resolver situaciones que antes parecían imposibles.',
    sessionFocus: 'Descubrir el conjunto de los números enteros (Z), aprender a ubicarlos y compararlos en la recta numérica y entender su utilidad en la vida cotidiana.',
    learningPath: [
      'Video Motivacional: El Desafío del Termómetro y la Montaña.',
      'Recorrido: Indagación socrática y reflexión sobre cantidades opuestas.',
      'Video Explicativo: La Recta Numérica, el conjunto Z y el Caso Modelo.',
      'Práctica: Construcción y graduación de la recta numérica en el cuaderno.',
      'Resumen, Miniquiz psicométrico formativo y Cierre metacognitivo.'
    ],
    mentor: {
      dile: 'Hoy iniciaremos una aventura matemática muy poderosa: descubriremos los números enteros y por qué el mundo necesita valores positivos y negativos.',
      espera: 'Pídele al estudiante que abra su cuaderno cuadriculado y escriba la fecha y el título: El conjunto de los Números Enteros y la Recta Numérica.',
      siBien: '¡Excelente! Veo tu cuaderno y tu regla listos sobre la mesa.',
      siApoyo: 'Recuérdale que hoy usaremos la regla para hacer esquemas muy ordenados y limpios.'
    }
  },
  stage2: {
    slides: [
      {
        num: 'G1',
        title: 'Bajo Cero en la Cordillera',
        subtitle: 'Una situación extrema',
        screenText: ['• Temperaturas Extremas', '• Sofía y Tomás en la cordillera'],
        visualPrompt: 'Tomás y Sofía abrigados con bufandas en un refugio de montaña observando un termómetro digital que marca -5 grados Celsius. Estilo Anime 16:9 nítido. No text drawn by AI.',
        script: 'Imagina que estás en la cordillera chilena durante una noche de invierno. El termómetro marca 5 grados bajo cero. ¿Cómo escribirías ese número sin usar palabras?',
        source: 'Texto Matemática 7°, Unidad 1, pág. 10; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G2',
        title: 'El Límite de los Naturales',
        subtitle: 'Cuando el cero no es el final',
        screenText: ['• ¿El cero es el final?', '• ¿Qué hay más abajo?'],
        visualPrompt: 'Tomás mirando una recta numérica que termina bruscamente en el cero y preguntándose qué ocurre si retrocede más. No text drawn by AI.',
        script: 'Con los números naturales aprendimos a contar hacia adelante: 1, 2, 3... y el cero marcaba la ausencia. Pero, ¿qué pasa cuando debemos dinero o bajamos al fondo del mar?',
        source: 'Texto Matemática 7°, pág. 12; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G3',
        title: 'Nacen los Números Negativos',
        subtitle: 'Magnitudes con sentido opuesto',
        screenText: ['• Números con Signo', '• Expresar deudas y descensos'],
        visualPrompt: 'Gráfico visual pedagógico mostrando un nivel del mar a 0 metros, una gaviota a +10 metros y un buzo a -10 metros. No text drawn by AI.',
        script: 'Para resolver este misterio nacieron los números negativos. Anteponiendo un signo menos, podemos indicar deudas, profundidades y temperaturas congelantes.',
        source: 'Texto Matemática 7°, pág. 13; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G4',
        title: 'La Recta en Dos Direcciones',
        subtitle: 'El espejo del cero',
        screenText: ['• La Recta Numérica', '• Izquierda y derecha desde el cero'],
        visualPrompt: 'Sofía trazando con una tiza luminosa una línea horizontal infinita con flechas en ambos extremos y el número 0 brillando al centro. No text drawn by AI.',
        script: 'La recta numérica ahora se extiende hacia dos lados: hacia la derecha crecen los positivos, y hacia la izquierda avanzan los números negativos.',
        source: 'Texto Matemática 7°, pág. 14; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G5',
        title: 'El Juego de los Pasos',
        subtitle: 'Avanzar y retroceder',
        screenText: ['• Desplazamientos', '• Sumar es avanzar, restar es retroceder'],
        visualPrompt: 'Tomás dando pasos hacia adelante sobre una alfombra graduada y luego retrocediendo al recibir una tarjeta de desafío. No text drawn by AI.',
        script: 'Pensar en los números enteros es como un juego de pasos: dar pasos al frente es avanzar, y dar pasos hacia atrás es retroceder o pagar una deuda.',
        source: 'Texto Matemática 7°, pág. 16; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G6',
        title: 'El Desafío Matemático',
        subtitle: 'Nuestra meta de hoy',
        screenText: ['• Desafío de Hoy', '• Dominar el conjunto Z y la recta'],
        visualPrompt: 'Sofía y Tomás en su escritorio con regla y lápiz resolviendo un tablero de coordenadas numéricas. No text drawn by AI.',
        script: 'Hoy aprenderemos a ordenar cualquier número entero, a compararlos con seguridad y a entender qué número es mayor cuando ambos tienen signo negativo.',
        source: 'Texto Matemática 7°, pág. 10; Resumen MINEDUC, pág. 3.'
      },
      {
        num: 'G7',
        title: '¡A Conquistar la Recta!',
        subtitle: 'Comienza el aprendizaje',
        screenText: ['• ¡A Conquistar la Recta!', '• El poder de los números enteros'],
        visualPrompt: 'Plano general entusiasta de ambos estudiantes mostrando su cuaderno con una recta numérica impecable. Logo blanco en esquina. No text drawn by AI.',
        script: '¡Acompáñanos! Toma tu regla y descubre el increíble mundo de los números enteros.',
        source: 'Texto Matemática 7°, Unidad 1, pág. 11.'
      }
    ],
    mentorPrev: 'Fíjate bien en el video en cómo se usa el número cero para separar las alturas de las profundidades.',
    mentorCheck: '¿Qué situaciones de la vida real viste en el video donde se usan números negativos?'
  },
  stage3: {
    questions: [
      {
        qText: 'Si la temperatura en una ciudad es de 3 grados Celsius y desciende 5 grados durante la noche, ¿por qué el resultado no se puede expresar con un número natural?',
        expected: 'Porque al restar 5 a 3 sobrepasamos el cero hacia abajo y entramos a las temperaturas negativas (-2 °C).',
        hint: 'Piensa en qué pasa si tienes 3 fichas y te piden quitar 5. Quedas debiendo 2 fichas.',
        reinforce: '¡Exacto! El conjunto de los números naturales no tiene solución para 3 menos 5; por eso necesitamos los enteros negativos.',
        formativeSupport: 'Recuerda que en la recta numérica retrocedemos 5 pasos partiendo desde el 3.',
        source: 'Texto Matemática 7°, pág. 12; Resumen MINEDUC, pág. 2.'
      },
      {
        qText: '¿Qué representa el número 0 cuando hablamos de la altura de una montaña y la profundidad del océano?',
        expected: 'Representa el punto de referencia o nivel medio del mar.',
        hint: 'Es la línea donde el agua toca la costa, separando lo que está arriba de lo que está sumergido.',
        reinforce: '¡Muy bien! El cero es el origen o nivel de referencia neutral.',
        formativeSupport: 'El cero separa las magnitudes positivas (sobre el nivel del mar) de las negativas (bajo el nivel del mar).',
        source: 'Texto Matemática 7°, pág. 13; Resumen MINEDUC, pág. 2.'
      }
    ],
    mentor: {
      dile: 'Vamos a comentar estas dos preguntas. Tómate tu tiempo y piensa en la recta numérica.',
      espera: 'Dale 20 segundos para pensar antes de formular su respuesta en voz alta.',
      siBien: '¡Excelente razonamiento! Entendiste muy bien el papel del cero.',
      siApoyo: 'Usa la pista en pantalla o dibuja una pequeña línea vertical en un papel borrador.'
    }
  },
  stage4: {
    slides: [
      {
        num: 'E1',
        title: 'El Conjunto Z',
        subtitle: 'Ampliando el universo numérico',
        screenText: ['• Conjunto Z (Enteros)', '• Positivos, Negativos y el Cero', '• Z = {..., -2, -1, 0, 1, 2, ...}'],
        visualPrompt: 'Diagrama de conjuntos estilizado mostrando los Naturales dentro de los Enteros Z con fondo geométrico moderno. No text drawn by AI.',
        script: 'El conjunto de los números enteros se representa con la letra Z. Está formado por los enteros positivos, el cero y los enteros negativos.',
        source: 'Texto Matemática 7°, pág. 14; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'E2',
        title: 'Estructura de la Recta',
        subtitle: 'Orientación y graduación',
        screenText: ['• La Recta Numérica', '• 0 = Origen de referencia', '• Derecha: (+), Izquierda: (-)'],
        visualPrompt: 'Gráfico nítido de la recta numérica con intervalos regulares de 1 cm, marcas claras y colores azul y rojo. No text drawn by AI.',
        script: 'En la recta numérica, el cero se ubica en el centro como origen. Hacia la derecha situamos los números positivos y hacia la izquierda los negativos a distancias iguales.',
        source: 'Texto Matemática 7°, pág. 15; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'E3',
        title: 'El Doble Rol del Signo',
        subtitle: 'Cualidad y operación',
        screenText: ['• Doble Significado', '• Cualidad: Positivo o Negativo', '• Operación: Sumar (+) o Restar (-)'],
        visualPrompt: 'Cuadro comparativo resaltando la expresión (-3 + 5), señalando con flechas la cualidad negativa del 3 y la operación de adición. No text drawn by AI.',
        script: 'El signo tiene dos funciones: puede indicar la naturaleza del número (positivo o negativo) o puede señalar la operación que realizamos, como sumar o restar.',
        source: 'Texto Matemática 7°, pág. 16; Resumen MINEDUC, pág. 3.'
      },
      {
        num: 'E4',
        title: 'Enfoque CPA',
        subtitle: 'Concreto, Pictórico y Simbólico',
        screenText: ['• Tres Formas de Entender', '• Concreto: Pasos o fichas', '• Pictórico: Recta numérica', '• Simbólico: Expresión matemática'],
        visualPrompt: 'Triptico visual pedagógico: un niño caminando pasos (concreto), una flecha sobre una recta dibujada (pictórico) y la ecuación 2 - 5 = -3 (simbólico). No text drawn by AI.',
        script: 'Podemos representar los enteros de tres formas: concreta caminando o usando fichas, pictórica dibujando la recta numérica, y simbólica escribiendo números y signos.',
        source: 'Texto Matemática 7°, pág. 18; Resumen MINEDUC, pág. 3.'
      },
      {
        num: 'E5',
        title: 'Comparar y Ordenar en Z',
        subtitle: '¿Quién es mayor?',
        screenText: ['• Orden en la Recta', '• Más a la derecha = Mayor', '• Ejemplo: -1 es mayor que -5'],
        visualPrompt: 'Comparación visual en la recta mostrando que -1 está más a la derecha que -5, por lo tanto -1 > -5. No text drawn by AI.',
        script: 'Para saber qué número es mayor, basta con mirar la recta numérica: cualquier número ubicado a la derecha es siempre mayor que el que está a su izquierda.',
        source: 'Texto Matemática 7°, pág. 17; Resumen MINEDUC, pág. 3.'
      },
      {
        num: 'E6',
        title: 'Caso Modelo',
        subtitle: 'El saldo bancario de Tomás',
        screenText: ['• Caso Modelo', '• Tomás tiene $2 y debe pagar $5', '• Cálculo: 2 - 5 = -3'],
        visualPrompt: 'Tomás modelando en la pizarra: parte en +2, retrocede 5 unidades hacia la izquierda y llega exactamente al número -3. No text drawn by AI.',
        script: 'Veamos nuestro caso modelo: Tomás tiene 2 fichas a favor (+2) y compra un libro que cuesta 5 fichas (-5). En la recta, parte en +2, retrocede 5 pasos y llega a -3. Su saldo es una deuda de 3 fichas.',
        source: 'Texto Matemática 7°, pág. 20; Resumen MINEDUC, págs. 2–3.'
      },
      {
        num: 'E7',
        title: 'Regla de Oro de los Enteros',
        subtitle: 'Principio matemático fundamental',
        screenText: ['• Regla de Oro', '• El orden absoluto en la recta', '• Derecha siempre supera a Izquierda'],
        visualPrompt: 'Marco formal dorado con tipografía sans-serif nítida mostrando la Regla de Oro. Logo de EstudioSimple en esquina inferior. No text drawn by AI.',
        script: 'Nuestra Regla de Oro: En la recta numérica, todo número situado a la derecha es estrictamente mayor que cualquier número situado a su izquierda, sin importar su signo.',
        source: 'Texto Matemática 7°, Unidad 1, pág. 17; Resumen MINEDUC, pág. 4.'
      }
    ],
    caseModel: {
      title: 'Caso Modelo: El Saldo de Tomás (Enfoque CPA)',
      steps: [
        { stepName: 'Paso 1 (Concreto)', desc: 'Tomás coloca 2 fichas azules (positivas) y necesita retirar 5 fichas; como solo tiene 2, queda debiendo 3 fichas rojas.', source: 'Texto Matemática 7°, pág. 18.' },
        { stepName: 'Paso 2 (Pictórico)', desc: 'Se ubica en el punto +2 de la recta numérica y traza una flecha de 5 unidades hacia la izquierda, aterrizando en -3.', source: 'Texto Matemática 7°, pág. 19.' },
        { stepName: 'Paso 3 (Simbólico)', desc: 'Escribe la operación formal: (+2) - 5 = -3, verificando que el resultado es un entero negativo.', source: 'Texto Matemática 7°, pág. 20.' },
        { stepName: 'Paso 4 (Interpretación)', desc: 'El signo menos indica que Tomás tiene una deuda o saldo en contra de 3 unidades.', source: 'Resumen MINEDUC, pág. 3.' }
      ]
    },
    goldenRule: 'En la recta numérica, todo número situado a la derecha de otro es estrictamente mayor que él: a > b si y solo si a está a la derecha de b.'
  },
  stage5: {
    notebookPrompt: 'Abre tu cuaderno cuadriculado de Matemática. Con lápiz grafito y regla graduada, traza una línea recta horizontal de 14 centímetros. Marca el número 0 exactamente al centro. Con marcas cada 1 cm, gradúa hacia la derecha los números positivos (+1 hasta +6) y hacia la izquierda los números negativos (-1 hasta -6). Luego, ubica los siguientes 4 puntos con un punto destacado: Punto A = +4, Punto B = -3, Punto C = -1, Punto D = +2.',
    expectedOutcome: [
      { section: 'Trazado y Graduación', desc: 'Línea recta limpia de 14 cm con flechas en ambos extremos e intervalos idénticos de 1 cm.', source: 'Texto Matemática 7°, pág. 15.' },
      { section: 'Ubicación de Puntos', desc: 'Punto A en +4 (cuatro marcas a la derecha del 0); Punto B en -3 (tres marcas a la izquierda); Punto C en -1; Punto D en +2.', source: 'Texto Matemática 7°, pág. 16.' },
      { section: 'Comparación Escrita', desc: 'El estudiante anota debajo: -3 < -1 y -1 < +2, justificando que los números a la derecha son mayores.', source: 'Resumen MINEDUC, pág. 3.' },
      { section: 'Aplicación Práctica', desc: 'Dibuja una flecha que demuestre el movimiento del submarino: parte en -4 y sube 3 metros hasta -1.', source: 'Resumen MINEDUC, pág. 4.' }
    ],
    hints: [
      'Pista 1: Usa los cuadritos del cuaderno (dos cuadritos suelen medir exactamente 1 cm) para que la distancia sea perfecta.',
      'Pista 2: Recuerda que los números negativos se escriben con el signo menos a la izquierda del dígito (-1, -2, -3...).'
    ],
    mentor: {
      dile: 'Ahora vamos a trabajar en tu cuaderno con la regla. Traza la recta con calma y gradúa las distancias con mucha precisión.',
      espera: 'Dale entre 6 y 8 minutos para trazar la recta, ubicar los 4 puntos y escribir las comparaciones.',
      siBien: '¡Qué trabajo más ordenado! Tu recta numérica tiene los espacios exactamente iguales.',
      siApoyo: 'Si le cuesta medir, guíalo para que use dos cuadritos de la cuadrícula por cada unidad.'
    }
  },
  stage6: {
    keyIdeas: [
      { text: 'El conjunto de los números enteros (Z) reúne a los enteros positivos, los enteros negativos y el cero como punto de referencia.', source: 'Texto Matemática 7°, pág. 14; Resumen MINEDUC, pág. 2.' },
      { text: 'En la recta numérica, los números positivos se ordenan a la derecha del cero y los negativos a la izquierda; el sentido hacia la derecha representa crecimiento y hacia la izquierda disminución.', source: 'Texto Matemática 7°, pág. 15; Resumen MINEDUC, pág. 2.' },
      { text: 'Un número entero es mayor que otro si se ubica más a la derecha en la recta numérica (por ejemplo, -1 es mayor que -5 porque está más cerca del cero y más a la derecha).', source: 'Texto Matemática 7°, pág. 17; Resumen MINEDUC, pág. 3.' }
    ],
    synthesisCard: 'Conjunto Z = {... , -2, -1, 0, +1, +2, ...}. En la recta: Derecha es Mayor, Izquierda es Menor.',
    mentor: {
      dile: 'Leamos juntos las tres ideas clave de resumen para consolidar lo aprendido.',
      espera: 'Pídele que señale en su recta dibujada por qué el -1 es mayor que el -4.',
      siBien: '¡Exacto! Porque el -1 está más a la derecha, más cerca del cero.',
      siApoyo: 'Recuérdale la regla: el que está más a la derecha en la recta siempre gana.'
    }
  },
  stage7: {
    questions: [
      {
        code: 'Q1-MAT7-OA01',
        question: 'En la recta numérica, ¿cuál de los siguientes números enteros es menor que -2?',
        options: [
          { letter: 'A', text: '+1', isCorrect: false },
          { letter: 'B', text: '0', isCorrect: false },
          { letter: 'C', text: '-1', isCorrect: false },
          { letter: 'D', text: '-5', isCorrect: true }
        ],
        distractorsAnalysis: [
          { letter: 'A', text: '+1', reason: 'Distractor. +1 es positivo y está a la derecha del -2, por lo tanto es mayor (Texto Matemática 7°, pág. 17).' },
          { letter: 'B', text: '0', reason: 'Distractor. El cero es mayor que cualquier número negativo (Resumen MINEDUC, pág. 2).' },
          { letter: 'C', text: '-1', reason: 'Distractor. -1 está a la derecha de -2 en la recta numérica, por lo que es mayor (-1 > -2).' }
        ]
      },
      {
        code: 'Q2-MAT7-OA01',
        question: 'La temperatura en una estación meteorológica era de -3 °C a las seis de la mañana. Si al mediodía la temperatura subió 5 °C, ¿cuál es la temperatura registrada al mediodía?',
        options: [
          { letter: 'A', text: '-8 °C', isCorrect: false },
          { letter: 'B', text: '+2 °C', isCorrect: true },
          { letter: 'C', text: '-2 °C', isCorrect: false },
          { letter: 'D', text: '+8 °C', isCorrect: false }
        ],
        distractorsAnalysis: [
          { letter: 'A', text: '-8 °C', reason: 'Distractor. Corresponde a restar erróneamente 5 en lugar de subir o sumar (+5).' },
          { letter: 'C', text: '-2 °C', reason: 'Distractor. Error común de signo al no superar el cero hacia los números positivos.' },
          { letter: 'D', text: '+8 °C', reason: 'Distractor. Corresponde a sumar los valores absolutos ignorando el signo negativo del -3.' }
        ]
      },
      {
        code: 'Q3-MAT7-OA01',
        question: 'En la expresión matemática -4 + 6 = 2, ¿qué significado tiene el signo menos (-) delante del número 4 según el contexto?',
        options: [
          { letter: 'A', text: 'Indica la operación de resta entre dos cantidades.', isCorrect: false },
          { letter: 'B', text: 'Indica la cualidad del número como un entero negativo situado a la izquierda del cero.', isCorrect: true },
          { letter: 'C', text: 'Indica que el resultado final de la suma debe ser obligatoriamente menor que cero.', isCorrect: false },
          { letter: 'D', text: 'Indica que el número 4 no tiene valor matemático.', isCorrect: false }
        ],
        distractorsAnalysis: [
          { letter: 'A', text: 'Indica la operación de resta entre dos cantidades.', reason: 'Distractor. El operador de la cuenta es el signo +, el signo - es la cualidad del primer número (Resumen MINEDUC, pág. 3).' },
          { letter: 'C', text: 'Indica que el resultado final de la suma debe ser obligatoriamente menor que cero.', reason: 'Distractor. El resultado es +2, que es positivo porque el sumando positivo tiene mayor magnitud.' },
          { letter: 'D', text: 'Indica que el número 4 no tiene valor matemático.', reason: 'Distractor. Afirmación falsa; -4 es un número entero con valor y posición exacta en Z.' }
        ]
      }
    ],
    remedialCapsule: 'Recuerda: Los números enteros negativos se ubican a la izquierda del cero y representan cantidades como deudas, descensos o temperaturas bajo cero. En la recta numérica, mientras más a la izquierda esté un número, menor es su valor (Texto Matemática 7°, pág. 15).',
    remedialItem: {
      question: 'Un submarino navega a -10 metros de profundidad respecto al nivel del mar. Si asciende 6 metros hacia la superficie, ¿a qué profundidad queda ubicado?',
      options: ['A) -16 metros.', 'B) -4 metros. [CORRECTA]', 'C) +4 metros.', 'D) -6 metros.'],
      correctLetter: 'B',
      justification: 'Partiendo desde -10 m, ascender significa avanzar +6 m en la recta numérica vertical: -10 + 6 = -4 metros (Resumen MINEDUC, pág. 4).'
    }
  },
  stage8: {
    metacognitivePrompt: 'A partir del caso de Tomás y su saldo, ¿por qué es importante contar con números negativos en la vida diaria en lugar de usar solamente números naturales?',
    congratulation: '¡Felicitaciones por completar con rigor y dedicación tu primera clase de Matemática sobre números enteros!',
    transferNext: 'En la Clase 2 aprenderemos a sumar números enteros formalmente usando la regla de los signos y representaciones con fichas bicolores.',
    mentor: {
      dile: '¡Excelente trabajo hoy! Cuéntame qué descubriste sobre los números negativos que no sabías antes.',
      espera: 'Escucha su explicación con atención y valida cómo relaciona la recta con situaciones reales.',
      siBien: '¡Qué gran explicación! Has comprendido la utilidad práctica de la matemática.',
      siApoyo: 'Recuérdale que los números negativos nos ayudan a entender desde el clima hasta las cuentas bancarias.'
    }
  }
};

// ==========================================
// 3. LENGUA Y LITERATURA
// ==========================================
export const LENGUA_DATA: LessonData = {
  subject: 'Lengua y Literatura',
  subjectCode: 'LEN',
  folderCode: '110-7-LEN-OA01',
  grade: '7.° Básico',
  oaCode: 'OA01',
  oaTitle: 'Analizar narraciones para comprenderlas en profundidad: identificando el conflicto de la historia, el rol de los personajes, las acciones y sus consecuencias, y la distinción entre narrador y personajes',
  lessonNumber: 1,
  totalLessons: 6,
  lessonTitle: 'El Conflicto Narrativo: El Motor de la Historia',
  dateStr: '2026-10-09 19:45 [America/Santiago]',
  status: 'EN_REVISION',
  sources: [
    {
      title: 'Texto del estudiante Lengua y literatura 7° básico',
      details: 'Edición especial MINEDUC, Unidad 1: "Tener un amigo", Lección 1: El conflicto y los personajes, págs. 10 a 25.'
    },
    {
      title: 'Resumen Curricular Oficial MINEDUC',
      details: 'INSUMOS/RESUMENES/110-7/RESUMEN LENGUAJE Y COMUNICACIÓN.pdf, págs. 2 a 4.'
    },
    {
      title: 'Bases Curriculares Oficiales MINEDUC (OA01)',
      details: 'Analizar las narraciones leídas para enriquecer su comprensión, considerando: el o los conflictos de la historia; el papel que juega cada personaje en el conflicto y cómo sus acciones afectan a otros.'
    }
  ],
  subobjective: 'Identificar el conflicto narrativo como el problema central que rompe el equilibrio inicial de un relato, reconociendo las fuerzas en pugna (motivación del protagonista frente al obstáculo) y sus consecuencias en la trama.',
  preInstance: {
    purpose: 'Crear un entorno propicio para la lectura atenta, el análisis crítico y la escritura reflexiva.',
    materials: [
      'Cuaderno de Lengua y Literatura del estudiante.',
      'Lápiz pasta o grafito y destacador de color claro.'
    ],
    timeEstimate: '30 a 35 minutos de trabajo concentrado.',
    mediationAdvice: 'Animar al estudiante a no quedarse en un resumen superficial de "lo que pasa", sino a preguntarse siempre "¿por qué ocurre esto?" y "¿qué problema empuja a los personajes a actuar?".'
  },
  stage1: {
    welcome: '¡Hola! Te damos la bienvenida a tu clase de Lengua y Literatura en EstudioSimple.',
    curriculumLocation: 'Clase 1 de 6 (Secuencia OA01 — Unidad 1: Narraciones y Conflicto).',
    priorKnowledge: 'En años anteriores leíste muchos cuentos y fábulas identificando el inicio, desarrollo y final. Hoy daremos un paso más allá para convertirnos en lectores críticos capaces de analizar el corazón del relato.',
    sessionFocus: 'Descubrir qué es el conflicto narrativo, cómo reconocerlo en una historia y cómo las decisiones de los personajes transforman el destino del relato.',
    learningPath: [
      'Video Motivacional: El Secreto de una Gran Historia.',
      'Recorrido: Indagación socrática sobre el aburrimiento y la tensión.',
      'Video Explicativo: El Conflicto como Motor, Fuerzas en Oposición y Caso Modelo.',
      'Práctica: Construcción del Mapa de Tensión Narrativa en el cuaderno.',
      'Resumen, Miniquiz psicométrico formativo y Cierre metacognitivo.'
    ],
    mentor: {
      dile: 'Hoy aprenderemos un secreto que conocen todos los grandes escritores: ninguna historia puede existir sin un conflicto que la haga avanzar.',
      espera: 'Pídele al estudiante que abra su cuaderno y anote la fecha y el título: El Conflicto Narrativo y las Decisiones de los Personajes.',
      siBien: '¡Muy bien! Veo tu cuaderno listo y tu mente dispuesta a investigar historias.',
      siApoyo: 'Recuérdale que hoy exploraremos historias y dilemas morales fascinantes.'
    }
  },
  stage2: {
    slides: [
      {
        num: 'G1',
        title: 'Una Historia Sin Emoción',
        subtitle: 'El día en que nada pasaba',
        screenText: ['• Una Historia Sin Acción', '• ¿Qué falta para atraparnos?'],
        visualPrompt: 'Tomás leyendo con cara de aburrimiento un libro plano donde los personajes solo comen manzanas en un parque sin ningún problema. Estilo Anime 16:9 nítido. No text drawn by AI.',
        script: 'Imagina un cuento que dice: "Había una vez un joven que fue al parque, se sentó en una banca, comió una manzana y volvió a su casa. Fin". ¿Qué le falta a esta historia para atraparnos?',
        source: 'Texto Lengua y Literatura 7°, Unidad 1, pág. 10; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G2',
        title: 'La Ruptura del Equilibrio',
        subtitle: 'El momento en que todo cambia',
        screenText: ['• La Chispa del Relato', '• Algo imprevisto sucede'],
        visualPrompt: 'Sofía leyendo con ojos abiertos de sorpresa mientras una ilustración estilizada detrás de ella muestra un relámpago que bloquea un camino de montaña. No text drawn by AI.',
        script: 'Una historia se vuelve fascinante cuando la calma se rompe. Ocurre un hecho inesperado, surge un problema difícil o aparece un desafío que no se puede ignorar.',
        source: 'Texto Lengua y Literatura 7°, pág. 11; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G3',
        title: 'El Conflicto Central',
        subtitle: 'El corazón que late en la trama',
        screenText: ['• El Conflicto Narrativo', '• El problema principal que genera tensión'],
        visualPrompt: 'Infografía conceptual animada de dos siluetas frente a un obstáculo con flechas de colores opuestos que se encuentran en el centro. No text drawn by AI.',
        script: 'Ese problema principal se llama conflicto narrativo. Es la fuerza que genera tensión y obliga a los personajes a levantarse y tomar decisiones.',
        source: 'Texto Lengua y Literatura 7°, pág. 12; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G4',
        title: 'Deseos y Obstáculos',
        subtitle: 'Lo que quiero versus lo que se interpone',
        screenText: ['• Protagonista y Meta', '• Un obstáculo en el camino'],
        visualPrompt: 'Un personaje joven mirando hacia la cima de una colina donde brilla su objetivo, pero entremedio hay un río caudaloso sin puente. No text drawn by AI.',
        script: 'Todo protagonista desea algo con fuerza: proteger a su familia, ganar una competencia o descubrir una verdad. Pero siempre aparece un obstáculo que bloquea su camino.',
        source: 'Texto Lengua y Literatura 7°, pág. 13; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G5',
        title: 'Acciones y Consecuencias',
        subtitle: 'Cada decisión tiene un precio',
        screenText: ['• Decisiones Cruciales', '• Las acciones cambian el rumbo'],
        visualPrompt: 'Tomás y Sofía analizando dos senderos que se bifurcan en una encrucijada con señales de madera. No text drawn by AI.',
        script: 'Frente al conflicto, el personaje debe elegir. Cada decisión que toma desata una cadena de acciones y consecuencias que transforman el relato y a quienes lo rodean.',
        source: 'Texto Lengua y Literatura 7°, pág. 16; Resumen MINEDUC, pág. 3.'
      },
      {
        num: 'G6',
        title: 'El Lector Detective',
        subtitle: 'Inferir más allá de las palabras',
        screenText: ['• Misión de Hoy', '• Identificar el conflicto y su motor'],
        visualPrompt: 'Sofía con una libreta de notas y Tomás señalando pistas en un texto proyectado en el pizarrón. No text drawn by AI.',
        script: 'A veces el conflicto no está escrito directamente con letras gigantes. El lector debe ser un detective que infiere las verdaderas motivaciones de los personajes.',
        source: 'Texto Lengua y Literatura 7°, pág. 18; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G7',
        title: '¡A Desentrañar Historias!',
        subtitle: 'Comienza la lectura crítica',
        screenText: ['• ¡A Leer en Profundidad!', '• Descubre el motor de la narración'],
        visualPrompt: 'Plano general alegre de ambos personajes invitando a abrir el libro con entusiasmo. Logo blanco en esquina. No text drawn by AI.',
        script: '¡Acompáñanos a descubrir cómo las fuerzas en conflicto dan vida a los relatos que leemos!',
        source: 'Texto Lengua y Literatura 7°, Unidad 1, pág. 11.'
      }
    ],
    mentorPrev: 'Fíjate en el video en qué momento el cuento aburrido se transforma en una historia que dan ganas de seguir leyendo.',
    mentorCheck: '¿Por qué dijimos que una historia sin problemas o desafíos resulta aburrida?'
  },
  stage3: {
    questions: [
      {
        qText: 'Si en un cuento los personajes consiguieran todo lo que desean al instante y sin esfuerzo, ¿por qué dejaría de ser una narración entretenida?',
        expected: 'Porque no habría conflicto ni tensión dramática que mantenga el interés del lector.',
        hint: 'Piensa en qué te mantiene atento a una película o serie: ¿la calma o la curiosidad por ver cómo resuelven un problema?',
        reinforce: '¡Exacto! La curiosidad del lector nace de querer saber si el protagonista logrará superar el obstáculo.',
        formativeSupport: 'El conflicto genera tensión y suspenso; sin él no hay nada que resolver.',
        source: 'Texto Lengua y Literatura 7°, pág. 12; Resumen MINEDUC, pág. 2.'
      },
      {
        qText: '¿Por qué es importante fijarse en las decisiones que toma un personaje cuando se enfrenta a una situación difícil?',
        expected: 'Porque las decisiones revelan su carácter y motivaciones, y generan consecuencias que cambian el rumbo de la historia.',
        hint: 'Piensa en cómo reaccionas tú o tus amigos ante un problema: la elección que toman define lo que pasa después.',
        reinforce: '¡Muy bien observado! Las decisiones de los personajes son las que mueven las acciones del relato.',
        formativeSupport: 'En el video explicativo veremos cómo cada decisión inclina la balanza de las fuerzas en oposición.',
        source: 'Texto Lengua y Literatura 7°, pág. 16; Resumen MINEDUC, pág. 3.'
      }
    ],
    mentor: {
      dile: 'Conversemos sobre estas dos preguntas. Recuerda algún libro o película que te haya gustado mucho.',
      espera: 'Escucha su reflexión durante 20 segundos sin interrumpir.',
      siBien: '¡Qué buen ejemplo diste! Se nota que comprendes cómo funciona la trama.',
      siApoyo: 'Usa la pista de pantalla para ayudarlo a conectar la pregunta con su propia experiencia de lector.'
    }
  },
  stage4: {
    slides: [
      {
        num: 'E1',
        title: 'Anatomía de una Narración',
        subtitle: 'La curva dramática',
        screenText: ['• Estructura Narrativa', '• Equilibrio inicial → Quiebre → Desarrollo → Desenlace'],
        visualPrompt: 'Gráfico limpio de una curva narrativa con estaciones claras: inicio estable, quiebre por conflicto, clímax y resolución. No text drawn by AI.',
        script: 'Toda narración posee una estructura: comienza con un estado de equilibrio inicial que se quiebra con la llegada del conflicto, se desarrolla con las acciones y concluye en un desenlace.',
        source: 'Texto Lengua y Literatura 7°, pág. 14; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'E2',
        title: 'El Conflicto como Motor',
        subtitle: 'La fuerza que impulsa los hechos',
        screenText: ['• El Motor del Relato', '• Tensión central entre fuerzas', '• Sin conflicto no hay acción'],
        visualPrompt: 'Metáfora visual de un engranaje mecánico que se pone en marcha impulsado por dos fuerzas opuestas. No text drawn by AI.',
        script: 'El conflicto narrativo no es simplemente una pelea o una discusión: es el problema central que genera tensión y hace que los hechos avancen de forma necesaria.',
        source: 'Texto Lengua y Literatura 7°, pág. 15; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'E3',
        title: 'Tipos de Conflicto',
        subtitle: 'Las tres formas de la oposición',
        screenText: ['• Tres Tipos de Conflicto', '• 1. Personaje vs Personaje', '• 2. Personaje vs Entorno/Naturaleza', '• 3. Conflicto Interno (Dilema)'],
        visualPrompt: 'Triptico ilustrado: dos caballeros dialogando en desacuerdo, un explorador enfrentando una tormenta, y una joven meditando ante dos opciones morales. No text drawn by AI.',
        script: 'El conflicto puede ser externo entre dos personajes, entre un personaje y su entorno natural o social, o interno cuando el personaje enfrenta un dilema moral consigo mismo.',
        source: 'Texto Lengua y Literatura 7°, pág. 17; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'E4',
        title: 'Fuerzas en Oposición',
        subtitle: 'Protagonista y fuerza antagónica',
        screenText: ['• Fuerzas en Pugna', '• Fuerza A: Deseo y motivación del protagonista', '• Fuerza B: Obstáculo o antagonista'],
        visualPrompt: 'Diagrama de balanza con dos pesos equilibrados temporalmente: el deseo del héroe y el muro del obstáculo. No text drawn by AI.',
        script: 'En todo conflicto encontramos dos fuerzas en pugna: la fuerza que persigue un objetivo (protagonista) y la fuerza que se opone o dificulta alcanzarlo (fuerza antagónica).',
        source: 'Texto Lengua y Literatura 7°, pág. 18; Resumen MINEDUC, pág. 3.'
      },
      {
        num: 'E5',
        title: 'Distinción Clave',
        subtitle: 'Narrador versus Personajes',
        screenText: ['• ¿Quién Habla?', '• Narrador: La voz que relata los hechos', '• Personajes: Las voces que actúan dentro del relato'],
        visualPrompt: 'Comparación nítida con globos de diálogo: una voz en off sobre la viñeta (narrador) frente a personajes que conversan directamente. No text drawn by AI.',
        script: 'Es fundamental no confundir al narrador con los personajes: el narrador es la voz ficticia que relata los hechos, mientras que los personajes son quienes actúan y toman decisiones dentro de la historia.',
        source: 'Texto Lengua y Literatura 7°, pág. 20; Resumen MINEDUC, pág. 3.'
      },
      {
        num: 'E6',
        title: 'Caso Modelo',
        subtitle: 'El dilema de Lucas y el puente',
        screenText: ['• Caso de Lucas', '• Motivación: Entregar medicina a su abuela', '• Obstáculo: El río destruyó el puente', '• Conflicto con el entorno natural'],
        visualPrompt: 'Lucas con su bolso medicinal mirando el río crecido que derribó el puente de madera, analizando si buscar un sendero largo o pedir ayuda a los vecinos. No text drawn by AI.',
        script: 'Analicemos nuestro caso modelo: Lucas debe llevar medicinas urgentes a su abuela (motivación). Al llegar, descubre que la lluvia derribó el puente (obstáculo). Es un conflicto entre el personaje y el entorno natural que lo obliga a tomar una decisión crucial.',
        source: 'Texto Lengua y Literatura 7°, pág. 22; Resumen MINEDUC, págs. 2–3.'
      },
      {
        num: 'E7',
        title: 'Regla de Oro de la Narración',
        subtitle: 'Principio de análisis literario',
        screenText: ['• Regla de Oro', '• El conflicto genera la acción', '• Sin problema no hay transformación'],
        visualPrompt: 'Marco formal nítido con tipografía editorial sobria. Logo de EstudioSimple en la esquina inferior. No text drawn by AI.',
        script: 'Nuestra Regla de Oro: El conflicto narrativo es el corazón del relato; orienta las motivaciones de los personajes, determina sus acciones y produce la transformación de la historia.',
        source: 'Texto Lengua y Literatura 7°, Unidad 1, pág. 14; Resumen MINEDUC, pág. 4.'
      }
    ],
    caseModel: {
      title: 'Caso Modelo: El Dilema de Lucas y el Río Crecido',
      steps: [
        { stepName: 'Paso 1 (Identificar la Motivación)', desc: 'Lucas tiene un objetivo claro y urgente: llevar los remedios a su abuela enferma al otro lado del valle.', source: 'Texto Lengua y Literatura 7°, pág. 22.' },
        { stepName: 'Paso 2 (Reconocer el Obstáculo)', desc: 'La crecida del río arrasó el puente de madera, bloqueando el único camino directo.', source: 'Texto Lengua y Literatura 7°, pág. 22.' },
        { stepName: 'Paso 3 (Clasificar el Conflicto)', desc: 'Es un conflicto de personaje contra el entorno natural, que desata un conflicto interno sobre qué riesgo asumir.', source: 'Resumen MINEDUC, pág. 2.' },
        { stepName: 'Paso 4 (Analizar la Decisión y Consecuencia)', desc: 'Lucas decide no cruzar el río crecido solo y corre a pedir ayuda a los leñadores de la aldea, logrando cruzar a salvo con una cuerda.', source: 'Resumen MINEDUC, pág. 3.' }
      ]
    },
    goldenRule: 'El conflicto narrativo es el problema central que quiebra el equilibrio inicial, confronta el deseo del protagonista con un obstáculo y moviliza las acciones hacia el desenlace.'
  },
  stage5: {
    notebookPrompt: 'Abre tu cuaderno de Lengua y Literatura. Dibuja un "Organizador de Tensión Narrativa" con forma de balanza o dos flechas enfrentadas. En el lado izquierdo rotula "Fuerza 1: Motivación del Protagonista" y describe qué busca Lucas en el caso modelo. En el lado derecho rotula "Fuerza 2: Obstáculo / Oposición" y explica qué le impide avanzar. Debajo, anota qué tipo de conflicto es (contra otra persona, contra el entorno o conflicto interno) y qué consecuencia tuvo su decisión.',
    expectedOutcome: [
      { section: 'Fuerza 1 (Motivación)', desc: 'Llevar las medicinas con urgencia y cariño a su abuela enferma.', source: 'Texto Lengua y Literatura 7°, pág. 22.' },
      { section: 'Fuerza 2 (Obstáculo)', desc: 'El río desbordado que destruyó el puente e impide el paso a pie.', source: 'Texto Lengua y Literatura 7°, pág. 22.' },
      { section: 'Tipo de Conflicto', desc: 'Conflicto externo con el entorno natural (la fuerza del río) y dilema de prudencia.', source: 'Resumen MINEDUC, pág. 2.' },
      { section: 'Consecuencia', desc: 'Pedir ayuda comunitaria le permite cumplir su meta sin arriesgar su vida imprudentemente.', source: 'Resumen MINEDUC, pág. 3.' }
    ],
    hints: [
      'Pista 1: Recuerda que la motivación responde a la pregunta "¿qué quiere lograr el personaje?".',
      'Pista 2: El obstáculo responde a la pregunta "¿qué o quién se interpone en su camino?".'
    ],
    mentor: {
      dile: 'Vamos a dibujar el organizador de tensión en tu cuaderno. Sintetiza las dos fuerzas con letra clara y buena ortografía.',
      espera: 'Dale entre 6 y 8 minutos para dibujar el esquema y completar las explicaciones.',
      siBien: '¡Qué gran esquema! Has identificado con mucha claridad las dos fuerzas que chocan.',
      siApoyo: 'Si tiene dudas con el tipo de conflicto, pregúntale: ¿Lucas está peleando con otra persona o con la naturaleza?'
    }
  },
  stage6: {
    keyIdeas: [
      { text: 'El conflicto narrativo es el problema central que quiebra la calma inicial y da inicio a las acciones principales del relato.', source: 'Texto Lengua y Literatura 7°, pág. 12; Resumen MINEDUC, pág. 2.' },
      { text: 'El conflicto surge de la oposición entre el deseo o meta del protagonista y un obstáculo (que puede ser otro personaje, la naturaleza o un dilema interno).', source: 'Texto Lengua y Literatura 7°, pág. 17; Resumen MINEDUC, pág. 2.' },
      { text: 'Analizar las decisiones de los personajes y sus consecuencias permite comprender en profundidad el sentido y mensaje de la narración.', source: 'Texto Lengua y Literatura 7°, pág. 16; Resumen MINEDUC, pág. 3.' }
    ],
    synthesisCard: 'Conflicto Narrativo = Meta del Protagonista vs Obstáculo. Es el motor que hace avanzar la historia.',
    mentor: {
      dile: 'Leamos juntos las tres conclusiones clave de nuestra clase.',
      espera: 'Pídele al estudiante que te diga en una sola frase qué es el conflicto narrativo.',
      siBien: '¡Excelente síntesis! Es el problema que pone en movimiento toda la historia.',
      siApoyo: 'Recuérdale la imagen del motor: sin combustible y sin motor, el auto no avanza.'
    }
  },
  stage7: {
    questions: [
      {
        code: 'Q1-LEN7-OA01',
        question: '¿Qué es el conflicto narrativo dentro de una obra literaria?',
        options: [
          { letter: 'A', text: 'La descripción física del lugar donde ocurren los acontecimientos.', isCorrect: false },
          { letter: 'B', text: 'El problema central que quiebra el equilibrio inicial y genera tensión en la historia.', isCorrect: true },
          { letter: 'C', text: 'El conjunto de palabras difíciles que el narrador utiliza en el texto.', isCorrect: false },
          { letter: 'D', text: 'La lista de los nombres de todos los personajes secundarios.', isCorrect: false }
        ],
        distractorsAnalysis: [
          { letter: 'A', text: 'La descripción física del lugar donde ocurren los acontecimientos.', reason: 'Distractor. Corresponde al ambiente o espacio narrativo (Texto Lengua y Literatura 7°, pág. 14).' },
          { letter: 'C', text: 'El conjunto de palabras difíciles que el narrador utiliza en el texto.', reason: 'Distractor. Corresponde al léxico o vocabulario contextual.' },
          { letter: 'D', text: 'La lista de los nombres de todos los personajes secundarios.', reason: 'Distractor. Corresponde al elenco de personajes, no al problema de la trama.' }
        ]
      },
      {
        code: 'Q2-LEN7-OA01',
        question: 'En el caso de Lucas, ¿qué elemento actúa como la fuerza antagónica u obstáculo que desata el conflicto principal?',
        options: [
          { letter: 'A', text: 'El deseo de Lucas de cuidar a su abuela.', isCorrect: false },
          { letter: 'B', text: 'La crecida del río que destruyó el puente de madera.', isCorrect: true },
          { letter: 'C', text: 'La presencia de leñadores amables en la aldea.', isCorrect: false },
          { letter: 'D', text: 'El frasco de medicina que llevaba en su bolso.', isCorrect: false }
        ],
        distractorsAnalysis: [
          { letter: 'A', text: 'El deseo de Lucas de cuidar a su abuela.', reason: 'Distractor. Corresponde a la motivación del protagonista, no al obstáculo que se opone a ella (Resumen MINEDUC, pág. 2).' },
          { letter: 'C', text: 'La presencia de leñadores amables en la aldea.', reason: 'Distractor. Los leñadores son ayudantes o aliados que facilitan la resolución.' },
          { letter: 'D', text: 'El frasco de medicina que llevaba en su bolso.', reason: 'Distractor. Es el objeto de valor que motiva la misión, no el impedimento.' }
        ]
      },
      {
        code: 'Q3-LEN7-OA01',
        question: '¿Cuál es la diferencia fundamental entre el narrador y los personajes dentro de un texto narrativo?',
        options: [
          { letter: 'A', text: 'El narrador siempre es una persona de la vida real y los personajes son inventados.', isCorrect: false },
          { letter: 'B', text: 'El narrador es la voz ficticia que relata la historia, mientras que los personajes son los seres que actúan y toman decisiones en ella.', isCorrect: true },
          { letter: 'C', text: 'No existe ninguna diferencia; narrador y personajes son exactamente lo mismo.', isCorrect: false },
          { letter: 'D', text: 'Los personajes saben todo lo que ocurrirá y el narrador nunca conoce el final.', isCorrect: false }
        ],
        distractorsAnalysis: [
          { letter: 'A', text: 'El narrador siempre es una persona de la vida real y los personajes son inventados.', reason: 'Distractor. El narrador es una entidad ficticia creada por el autor real (Texto Lengua y Literatura 7°, pág. 20).' },
          { letter: 'C', text: 'No existe ninguna diferencia; narrador y personajes son exactamente lo mismo.', reason: 'Distractor. Falso: Son instancias narrativas con roles completamente distintos en el relato.' },
          { letter: 'D', text: 'Los personajes saben todo lo que ocurrirá y el narrador nunca conoce el final.', reason: 'Distractor. Falso: Frecuentemente el narrador omnisciente conoce el destino de los personajes.' }
        ]
      }
    ],
    remedialCapsule: 'Recuerda: El conflicto narrativo es el choque entre lo que un personaje desea lograr y las dificultades que encuentra para conseguirlo. Reconocer este problema te ayuda a entender por qué los personajes toman decisiones valientes o cometen errores (Texto Lengua y Literatura 7°, pág. 12).',
    remedialItem: {
      question: 'Si en un relato un estudiante debe decidir entre decir la verdad sobre una travesura o encubrir a su mejor amigo para que no lo castiguen, ¿qué tipo de conflicto está experimentando principalmente?',
      options: ['A) Conflicto con la naturaleza.', 'B) Conflicto interno (dilema moral). [CORRECTA]', 'C) Conflicto espacial geográfico.', 'D) Conflicto biológico celular.'],
      correctLetter: 'B',
      justification: 'Cuando un personaje se debate en su propia mente entre dos valores éticos opuestos, experimenta un conflicto interno o dilema moral (Resumen MINEDUC, pág. 2).'
    }
  },
  stage8: {
    metacognitivePrompt: 'A partir del caso de Lucas y su dilema con el puente, ¿cómo te ayuda identificar el conflicto de una narración a comprender las decisiones difíciles que enfrentan las personas en la vida real?',
    congratulation: '¡Felicitaciones por culminar con agudeza y dedicación tu primera clase de Lengua y Literatura sobre análisis narrativo!',
    transferNext: 'En la Clase 2 analizaremos la evolución de los personajes y cómo el conflicto transforma sus valores y sentimientos a lo largo del relato.',
    mentor: {
      dile: '¡Muy bien hecho! Cuéntame qué fue lo más interesante que aprendiste hoy sobre el conflicto en las historias.',
      espera: 'Escucha su reflexión con una sonrisa y felicítalo por su capacidad de análisis.',
      siBien: '¡Qué análisis tan maduro! Ya tienes ojos de lector crítico.',
      siApoyo: 'Recuérdale que los libros nos enseñan a reflexionar sobre los dilemas de la vida.'
    }
  }
};

// ==========================================
// 4. HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES
// ==========================================
export const HISTORIA_DATA: LessonData = {
  subject: 'Historia, Geografía y Ciencias Sociales',
  subjectCode: 'HIS',
  folderCode: '110-7-HIS-OA01',
  grade: '7.° Básico',
  oaCode: 'OA01',
  oaTitle: 'Comprender la revolución agrícola y sus cambios en la vida humana: domesticación de plantas y animales, sedentarización, aldeas, excedentes y nuevas formas de organización social',
  lessonNumber: 1,
  totalLessons: 6,
  lessonTitle: 'La Revolución Neolítica: El Origen de la Agricultura y el Sedentarismo',
  dateStr: '2026-10-09 19:45 [America/Santiago]',
  status: 'EN_REVISION',
  sources: [
    {
      title: 'Texto del estudiante Historia, Geografía y Ciencias Sociales 7° básico',
      details: 'Edición especial MINEDUC, Unidad 1: ¿Cómo cambió la vida humana con la agricultura?, Lección 1: El surgimiento de la agricultura, págs. 8 a 22; Fuentes históricas pág. 12; La revolución neolítica pág. 16.'
    },
    {
      title: 'Resumen Curricular Oficial MINEDUC',
      details: 'INSUMOS/RESUMENES/110-7/RESUMEN HISTORIA  GEOGRAFÍA Y CIENCIAS SOCIALES.pdf, págs. 2 a 4.'
    },
    {
      title: 'Bases Curriculares Oficiales MINEDUC (OA01)',
      details: 'Explicar el proceso de hominización, reconociendo las principales etapas de la evolución de la especie humana, la influencia de factores geográficos y su dispersión en el planeta, y el surgimiento de la agricultura y la domesticación de animales.'
    }
  ],
  subobjective: 'Explicar el surgimiento de la agricultura y la domesticación de plantas y animales durante el Neolítico, comprendiendo cómo la producción de alimentos transformó a los grupos humanos de nómadas cazadores en sociedades sedentarias.',
  preInstance: {
    purpose: 'Disponer un ambiente propicio para el pensamiento histórico y la indagación del pasado humano.',
    materials: [
      'Cuaderno de Historia, Geografía y Ciencias Sociales.',
      'Lápiz grafito o mina, goma de borrar y regla graduada.'
    ],
    timeEstimate: '35 a 40 minutos de trabajo concentrado.',
    mediationAdvice: 'Estimular la empatía histórica: invitar al estudiante a imaginar el inmenso esfuerzo diario que significaba para las familias prehistóricas conseguir comida antes de que existieran los campos cultivados y las ciudades.'
  },
  stage1: {
    welcome: '¡Hola! Te damos la bienvenida a tu clase de Historia, Geografía y Ciencias Sociales en EstudioSimple.',
    curriculumLocation: 'Clase 1 de 6 (Secuencia OA01 — Unidad 1: Los inicios de la humanidad y la agricultura).',
    priorKnowledge: 'En años anteriores estudiaste pueblos originarios y descubriste que algunos eran nómadas y otros sedentarios. Hoy investigaremos el momento exacto de la historia universal en que ocurrió esa gran transformación.',
    sessionFocus: 'Descubrir qué fue la Revolución Neolítica, cómo los seres humanos domesticaron plantas y animales, y por qué el cultivo de la tierra cambió para siempre el destino de la humanidad.',
    learningPath: [
      'Video Motivacional: El Enigma de los Cazadores Nómadas.',
      'Recorrido: Conversación guiada sobre cómo comían los antiguos humanos.',
      'Video Explicativo: De la Recolección a la Cosecha, Domesticación y Aldeas.',
      'Práctica: Cuadro comparativo en el cuaderno: Vida Nómada vs Vida Sedentaria.',
      'Resumen, Miniquiz psicométrico formativo y Cierre metacognitivo.'
    ],
    mentor: {
      dile: 'Hoy viajaremos diez mil años al pasado para descubrir una de las mayores revoluciones de la historia: la invención de la agricultura.',
      espera: 'Pídele al estudiante que abra su cuaderno y anote con letra clara la fecha y el título: La Revolución Agrícola y el Paso al Sedentarismo.',
      siBien: '¡Excelente! Veo tu cuaderno listo para registrar este viaje histórico.',
      siApoyo: 'Recuérdale que aprender historia nos ayuda a entender por qué hoy vivimos en ciudades y pueblos estables.'
    }
  },
  stage2: {
    slides: [
      {
        num: 'G1',
        title: 'Cazando para Sobrevivir',
        subtitle: 'La vida en movimiento constante',
        screenText: ['• Cazadores-Recolectores', '• Seguir a las manadas para comer'],
        visualPrompt: 'Un pequeño grupo familiar del Paleolítico abrigado con pieles caminando por una estepa helada siguiendo las huellas de animales. Estilo Anime 16:9 nítido. No text drawn by AI.',
        script: 'Durante cientos de miles de años, los seres humanos no podían quedarse en un solo lugar. Si los animales migraban o las bayas silvestres se acababan, debían recoger sus pertenencias y caminar.',
        source: 'Texto Historia 7°, Unidad 1, pág. 14; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G2',
        title: 'El Fin de los Hielos',
        subtitle: 'Un planeta que cambia de clima',
        screenText: ['• Cambio Climático Global', '• La Tierra se vuelve más cálida'],
        visualPrompt: 'Paisaje natural estilizado mostrando el retroceso de los glaciares y el florecimiento de valles verdes con espigas silvestres. No text drawn by AI.',
        script: 'Hace unos 10.000 años, el clima de la Tierra se volvió más templado. En diversas regiones del mundo, comenzaron a crecer pastos y cereales silvestres en abundancia.',
        source: 'Texto Historia 7°, pág. 16; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G3',
        title: 'La Gran Observación',
        subtitle: 'La semilla que renace',
        screenText: ['• El Gran Descubrimiento', '• Las semillas caen y vuelven a brotar'],
        visualPrompt: 'Una mujer prehistórica agachada observando con asombro un brote verde de trigo que nace en el suelo donde antes cayeron semillas. No text drawn by AI.',
        script: 'Tras generaciones de observación atenta de la naturaleza, las comunidades humanas comprendieron que una semilla enterrada en tierra fértil brotaba y producía más alimento.',
        source: 'Texto Historia 7°, pág. 17; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G4',
        title: 'Domesticar la Vida',
        subtitle: 'Seleccionar para convivir',
        screenText: ['• Domesticación', '• Cuidar plantas y criar animales'],
        visualPrompt: 'Un corral rústico de piedra con cabras y ovejas mansas junto a una choza circular temprana. No text drawn by AI.',
        script: 'Así nació la domesticación: los seres humanos aprendieron a seleccionar las mejores semillas para cultivar y a proteger animales dóciles para obtener leche, carne y lana.',
        source: 'Texto Historia 7°, pág. 18; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G5',
        title: 'Echar Raíces',
        subtitle: 'Quedarse para cuidar la cosecha',
        screenText: ['• La Sedentarización', '• Vivir en un lugar permanente'],
        visualPrompt: 'Una pequeña aldea con casas permanentes de barro y paja junto a un campo de cultivo dorado bajo el sol. No text drawn by AI.',
        script: 'Quien siembra un campo no puede marcharse: debe regarlo, cuidarlo de las plagas y esperar la cosecha. Así las personas dejaron de ser nómadas y se volvieron sedentarias.',
        source: 'Texto Historia 7°, pág. 19; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G6',
        title: 'La Misión Histórica',
        subtitle: 'Comprender la revolución neolítica',
        screenText: ['• Misión de Hoy', '• Analizar los cambios en la vida humana'],
        visualPrompt: 'Sofía y Tomás en una excavación arqueológica examinando una vasija neolítica con herramientas científicas. No text drawn by AI.',
        script: 'Hoy investigaremos cómo la agricultura transformó la alimentación, las herramientas, las viviendas y dio origen a las primeras aldeas organizadas.',
        source: 'Texto Historia 7°, pág. 8; Resumen MINEDUC, pág. 3.'
      },
      {
        num: 'G7',
        title: '¡A Explorar el Neolítico!',
        subtitle: 'El amanecer de la civilización',
        screenText: ['• ¡A Explorar el Pasado!', '• La revolución que cambió el mundo'],
        visualPrompt: 'Plano general alegre de ambos estudiantes invitando a estudiar los orígenes de la vida comunitaria. Logo blanco en esquina. No text drawn by AI.',
        script: '¡Acompáñanos a descubrir la revolución que sentó las bases de nuestra forma de vivir actual!',
        source: 'Texto Historia 7°, Unidad 1, pág. 9.'
      }
    ],
    mentorPrev: 'Presta atención a cómo la domesticación cambió la relación entre los humanos y los animales.',
    mentorCheck: '¿Por qué los agricultores ya no podían viajar constantemente como hacían los cazadores?'
  },
  stage3: {
    questions: [
      {
        qText: 'Si una comunidad nómada dependía exclusivamente de los frutos que encontraba y los animales que cazaba, ¿por qué su población no podía crecer demasiado?',
        expected: 'Porque los recursos silvestres eran limitados y dependían de las estaciones y del éxito de la caza.',
        hint: 'Piensa en qué pasaba en invierno si no encontraban animales para cazar.',
        reinforce: '¡Exacto! El alimento era incierto y escaso, lo que obligaba a mantener grupos pequeños que pudieran moverse rápido.',
        formativeSupport: 'La agricultura permitió tener una fuente segura y constante de alimento, lo que permitió alimentar a muchas más personas.',
        source: 'Texto Historia 7°, pág. 14; Resumen MINEDUC, pág. 2.'
      },
      {
        qText: '¿Qué significa la palabra "domesticación" cuando los historiadores hablan de plantas y animales en el Neolítico?',
        expected: 'Significa adaptar, seleccionar y criar especies vegetales y animales para que convivan con los humanos y les sirvan de sustento.',
        hint: 'Piensa en la diferencia entre un lobo salvaje y un perro, o entre una espiga silvestre pequeña y una mazorca cultivada.',
        reinforce: '¡Excelente definición! Es un proceso gradual de selección y cuidado artificial realizado por los seres humanos.',
        formativeSupport: 'En el video explicativo veremos cómo el trigo, el maíz, las ovejas y las vacas fueron domesticados en distintos lugares del planeta.',
        source: 'Texto Historia 7°, pág. 18; Resumen MINEDUC, pág. 2.'
      }
    ],
    mentor: {
      dile: 'Vamos a reflexionar sobre estas preguntas históricas. Imagina cómo era la vida sin tiendas ni almacenes.',
      espera: 'Escucha con paciencia sus ideas durante 20 segundos.',
      siBien: '¡Qué gran intuición histórica tienes! Has comprendido el cambio de vida.',
      siApoyo: 'Usa la pista para guiarlo paso a paso en el concepto de domesticación.'
    }
  },
  stage4: {
    slides: [
      {
        num: 'E1',
        title: 'Paleolítico versus Neolítico',
        subtitle: 'Piedra antigua y piedra nueva',
        screenText: ['• Dos Grandes Etapas', '• Paleolítico: Cazadores nómadas, piedra tallada', '• Neolítico: Agricultores sedentarios, piedra pulida'],
        visualPrompt: 'Comparación visual directa entre una punta de flecha tosca de sílex (Paleolítico) y una azada o hacha pulida con mango de madera (Neolítico). No text drawn by AI.',
        script: 'El término Neolítico significa "piedra nueva" o pulida. Pero la verdadera revolución no fue la piedra, sino la forma en que los seres humanos producían su propio sustento.',
        source: 'Texto Historia 7°, pág. 16; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'E2',
        title: '¿Qué es la Domesticación?',
        subtitle: 'Modificando la naturaleza con paciencia',
        screenText: ['• Domesticación Biológica', '• Selección de semillas resistentes', '• Crianza de ganado manso'],
        visualPrompt: 'Secuencia pedagógica mostrando la selección de granos de trigo más grandes y el cuidado de crías de cabras y ovejas en corrales. No text drawn by AI.',
        script: 'La domesticación fue un proceso milenario: las comunidades seleccionaban las semillas que daban más alimento y los animales menos agresivos, adaptándolos a sus necesidades.',
        source: 'Texto Historia 7°, pág. 18; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'E3',
        title: 'Un Fenómeno Multirregional',
        subtitle: 'La agricultura en todo el mundo',
        screenText: ['• Focos de Origen Mundial', '• Creciente Fértil (trigo), China (arroz), América (maíz)'],
        visualPrompt: 'Mapa planisferio estilizado destacando con colores suaves los diferentes focos independientes donde surgió la agricultura en el mundo. No text drawn by AI.',
        script: 'La agricultura no nació en un solo país: surgió de forma independiente en diversas partes del planeta, como el Creciente Fértil en Medio Oriente, los valles de Asia y Mesoamérica y los Andes en América.',
        source: 'Texto Historia 7°, pág. 18; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'E4',
        title: 'La Sedentarización',
        subtitle: 'Las primeras aldeas del mundo',
        screenText: ['• Vida Sedentaria', '• Casas permanentes de adobe o piedra', '• Surgimiento de aldeas'],
        visualPrompt: 'Reconstrucción histórica ilustrada de una aldea neolítica temprana con techos planos, escaleras de madera y silos de granos. No text drawn by AI.',
        script: 'Al depender de las cosechas, los humanos debieron construir viviendas sólidas y duraderas cerca de sus campos de cultivo. Así nacieron las primeras aldeas y poblados estables.',
        source: 'Texto Historia 7°, pág. 19; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'E5',
        title: 'El Excedente y la Cerámica',
        subtitle: 'Guardar para el futuro',
        screenText: ['• Excedente Agrícola', '• Producir más de lo que se come al día', '• Invención de la alfarería y el comercio'],
        visualPrompt: 'Artesano neolítico modelando una vasija de greda cocida para almacenar granos de trigo, mientras otros intercambian productos. No text drawn by AI.',
        script: 'Por primera vez en la historia, las cosechas generaron excedentes: sobraba alimento. Para guardarlo inventaron la alfarería y vasijas de cerámica, y con el sobrante nació el trueque comercial.',
        source: 'Texto Historia 7°, pág. 20; Resumen MINEDUC, pág. 3.'
      },
      {
        num: 'E6',
        title: 'Caso Modelo',
        subtitle: 'La aldea de Çatalhöyük',
        screenText: ['• Caso de Çatalhöyük', '• Aldea neolítica de hace 9.000 años', '• Viviendas unidas, corrales comunitarios, división del trabajo'],
        visualPrompt: 'Plano contextual de la aldea neolítica de Çatalhöyük en Anatolia con casas adosadas sin calles donde la gente circulaba por los techos. No text drawn by AI.',
        script: 'Veamos nuestro caso modelo: En la aldea neolítica de Çatalhöyük, miles de personas vivían en casas de adobe contiguas. Ya no eran cazadores solitarios: había agricultores, ganaderos, tejedores y alfareros.',
        source: 'Texto Historia 7°, pág. 22; Resumen MINEDUC, pág. 3.'
      },
      {
        num: 'E7',
        title: 'Regla de Oro de la Historia',
        subtitle: 'El principio del cambio cultural',
        screenText: ['• Regla de Oro', '• La agricultura transformó la civilización', '• Domesticación → Sedentarismo → Poblados'],
        visualPrompt: 'Marco formal sobrio con tipografía editorial histórica. Logo de EstudioSimple en la esquina inferior derecha. No text drawn by AI.',
        script: 'Nuestra Regla de Oro: La domesticación de plantas y animales permitió el sedentarismo, transformando la economía de subsistencia y sentando las bases de la vida en comunidad y las primeras ciudades.',
        source: 'Texto Historia 7°, Unidad 1, pág. 16; Resumen MINEDUC, pág. 4.'
      }
    ],
    caseModel: {
      title: 'Caso Modelo: La Transformación Neolítica en Çatalhöyük',
      steps: [
        { stepName: 'Paso 1 (Economía Productiva)', desc: 'Cultivo permanente de trigo, cebada y arvejas, combinado con crianza de ovejas y cabras.', source: 'Texto Historia 7°, pág. 22.' },
        { stepName: 'Paso 2 (Vivienda Estable)', desc: 'Construcción de casas permanentes de adobe con hornos y silos para almacenar granos.', source: 'Texto Historia 7°, pág. 22.' },
        { stepName: 'Paso 3 (División del Trabajo)', desc: 'Surgimiento de oficios especializados: agricultores, pastores, artesanos de cerámica y tejedores.', source: 'Resumen MINEDUC, pág. 3.' },
        { stepName: 'Paso 4 (Comercio Temprano)', desc: 'Intercambio de obsidiana volcánica y productos artesanales con otras comunidades lejanas.', source: 'Texto Historia 7°, pág. 23.' }
      ]
    },
    goldenRule: 'La Revolución Neolítica sustituyó la economía depredadora (caza y recolección) por una economía productiva (agricultura y ganadería), originando el sedentarismo y las primeras comunidades urbanas.'
  },
  stage5: {
    notebookPrompt: 'Abre tu cuaderno de Historia, Geografía y Ciencias Sociales. Traza con regla una tabla comparativa de dos columnas: Columna 1 "Paleolítico (Sociedad Nómada)" y Columna 2 "Neolítico (Sociedad Sedentaria)". Compara ambas épocas bajo tres criterios específicos: 1) Forma de obtención de alimentos, 2) Tipo de vivienda, y 3) Herramientas e inventos característicos. Escribe una oración clara en cada celda.',
    expectedOutcome: [
      { section: 'Criterio 1: Alimentos', desc: 'Paleolítico: Caza de animales salvajes y recolección silvestre. Neolítico: Agricultura (siembra y cosecha) y ganadería (domesticación animal).', source: 'Texto Historia 7°, págs. 14 y 18.' },
      { section: 'Criterio 2: Vivienda', desc: 'Paleolítico: Refugios temporales, cuevas y toldos de piel fáciles de desarmar. Neolítico: Casas permanentes de adobe, madera o piedra en aldeas estables.', source: 'Texto Historia 7°, pág. 19.' },
      { section: 'Criterio 3: Herramientas', desc: 'Paleolítico: Piedra tallada, lanzas y raspadores simples. Neolítico: Piedra pulida, azadas para sembrar, vasijas de cerámica y telares.', source: 'Texto Historia 7°, pág. 16; Resumen MINEDUC, pág. 3.' },
      { section: 'Conclusión Escrita', desc: 'El estudiante anota: "El Neolítico cambió la historia porque pasamos de buscar alimento a producirlo".', source: 'Resumen MINEDUC, pág. 4.' }
    ],
    hints: [
      'Pista 1: Recuerda qué hacían los nómadas cuando llegaba el invierno y qué hacían los agricultores con sus semillas.',
      'Pista 2: Para las herramientas, piensa en qué recipientes se necesitaban para guardar el grano de la cosecha (cerámica).'
    ],
    mentor: {
      dile: 'Vamos a dibujar la tabla comparativa en tu cuaderno con regla. Completa los tres criterios con muy buena letra.',
      espera: 'Dale entre 6 y 8 minutos para trazar la tabla y redactar las comparaciones en silencio.',
      siBien: '¡Qué gran cuadro comparativo! Has sintetizado la diferencia entre nómadas y sedentarios con total claridad.',
      siApoyo: 'Repasa con él las diapositivas 1 y 5 del video explicativo para recordar las herramientas y viviendas.'
    }
  },
  stage6: {
    keyIdeas: [
      { text: 'La Revolución Neolítica fue el proceso en que la humanidad aprendió a cultivar plantas y domesticar animales, pasando de ser cazadora-recolectora a productora de alimentos.', source: 'Texto Historia 7°, pág. 16; Resumen MINEDUC, pág. 2.' },
      { text: 'La agricultura originó la sedentarización: las personas debieron vivir en un lugar fijo para cuidar sus cosechas, construyendo las primeras aldeas permanentes.', source: 'Texto Historia 7°, pág. 19; Resumen MINEDUC, pág. 2.' },
      { text: 'La generación de excedentes agrícolas permitió almacenar alimentos para el futuro, impulsó el desarrollo de la alfarería y dio inicio al comercio y a la división del trabajo.', source: 'Texto Historia 7°, pág. 20; Resumen MINEDUC, pág. 3.' }
    ],
    synthesisCard: 'Neolítico = Domesticación de plantas y animales → Sedentarismo → Aldeas y Excedentes.',
    mentor: {
      dile: 'Leamos juntos las tres ideas de resumen de nuestra clase de Historia.',
      espera: 'Pídele al estudiante que te explique qué significa la palabra "sedentario" con sus propias palabras.',
      siBien: '¡Excelente definición! Sedentario es quien vive de forma permanente y fija en un lugar.',
      siApoyo: 'Recuérdale la raíz: estar sentado o establecido en una casa propia.'
    }
  },
  stage7: {
    questions: [
      {
        code: 'Q1-HIS7-OA01',
        question: '¿Cuál fue la causa directa que llevó a los grupos humanos a abandonar el nomadismo y adoptar un modo de vida sedentario durante el Neolítico?',
        options: [
          { letter: 'A', text: 'La necesidad de huir de animales peligrosos que poblaban los bosques.', isCorrect: false },
          { letter: 'B', text: 'El desarrollo de la agricultura y la necesidad de permanecer en un lugar fijo para cuidar los cultivos y el ganado.', isCorrect: true },
          { letter: 'C', text: 'La invención de la rueda para viajar distancias más largas.', isCorrect: false },
          { letter: 'D', text: 'La orden dada por reyes de grandes imperios mundiales.', isCorrect: false }
        ],
        distractorsAnalysis: [
          { letter: 'A', text: 'La necesidad de huir de animales peligrosos que poblaban los bosques.', reason: 'Distractor. Los cazadores del Paleolítico ya convivían con grandes animales sin volverse sedentarios por esa causa (Texto Historia 7°, pág. 14).' },
          { letter: 'C', text: 'La invención de la rueda para viajar distancias más largas.', reason: 'Distractor. La rueda facilitó el transporte posterior, no fue la causa del asentamiento agrícola inicial.' },
          { letter: 'D', text: 'La orden dada por reyes de grandes imperios mundiales.', reason: 'Distractor. En el Neolítico temprano no existían reyes ni imperios; la organización era tribal y aldeana.' }
        ]
      },
      {
        code: 'Q2-HIS7-OA01',
        question: '¿Qué significa el concepto de "domesticación" de especies vegetales y animales en el contexto de la prehistoria?',
        options: [
          { letter: 'A', text: 'Enseñar trucos circenses a animales silvestres.', isCorrect: false },
          { letter: 'B', text: 'El proceso mediante el cual los seres humanos adaptaron y criaron plantas y animales para satisfacer sus necesidades de alimentación y abrigo.', isCorrect: true },
          { letter: 'C', text: 'Encerrar a todos los animales de un bosque sin alimentarlos.', isCorrect: false },
          { letter: 'D', text: 'Cazar únicamente en las noches de luna llena.', isCorrect: false }
        ],
        distractorsAnalysis: [
          { letter: 'A', text: 'Enseñar trucos circenses a animales silvestres.', reason: 'Distractor. Sentido coloquial erróneo ajeno al rigor histórico y biológico.' },
          { letter: 'C', text: 'Encerrar a todos los animales de un bosque sin alimentarlos.', reason: 'Distractor. La domesticación implica reproducción controlada y alimentación constante por parte de los humanos (Texto Historia 7°, pág. 18).' },
          { letter: 'D', text: 'Cazar únicamente en las noches de luna llena.', reason: 'Distractor. Práctica mágica ficticia no relacionada con la domesticación.' }
        ]
      },
      {
        code: 'Q3-HIS7-OA01',
        question: '¿Por qué la aparición del "excedente agrícola" fue un cambio tan trascendental para la organización de las primeras aldeas?',
        options: [
          { letter: 'A', text: 'Porque obligó a quemar los campos para no tener que cocinar.', isCorrect: false },
          { letter: 'B', text: 'Porque permitió almacenar reservas de comida para épocas difíciles y posibilitó que algunas personas se dedicaran a otros oficios distintos a la agricultura.', isCorrect: true },
          { letter: 'C', text: 'Porque hizo que las personas volvieran a ser nómadas en busca de granos.', isCorrect: false },
          { letter: 'D', text: 'Porque provocó la desaparición inmediata de la cerámica y el trueque.', isCorrect: false }
        ],
        distractorsAnalysis: [
          { letter: 'A', text: 'Porque obligó a quemar los campos para no tener que cocinar.', reason: 'Distractor. Afirmación absurda; los granos se conservaban cuidadosamente en silos y vasijas.' },
          { letter: 'C', text: 'Porque hizo que las personas volvieran a ser nómadas en busca de granos.', reason: 'Distractor. El excedente consolidó el sedentarismo en aldeas permanentes (Resumen MINEDUC, pág. 3).' },
          { letter: 'D', text: 'Porque provocó la desaparición inmediata de la cerámica y el trueque.', reason: 'Distractor. Al contrario: el excedente impulsó directamente la invención de la cerámica para guardar granos y el trueque para intercambiarlos.' }
        ]
      }
    ],
    remedialCapsule: 'Recuerda: La agricultura y la crianza de animales permitieron tener comida segura. Como las cosechas debían cuidarse durante meses, las familias construyeron casas fijas y dejaron de ser nómadas, formando las primeras aldeas de la humanidad (Texto Historia 7°, pág. 19; Resumen MINEDUC, pág. 2).',
    remedialItem: {
      question: 'Si una persona en una aldea neolítica ya no necesita pasar el día cultivando porque la comunidad tiene granos de sobra y decide dedicarse a fabricar ollas de barro, ¿qué fenómeno social está ocurriendo?',
      options: ['A) Nomadismo obligatorio.', 'B) División del trabajo y especialización de oficios. [CORRECTA]', 'C) Desaparición de las leyes.', 'D) Destrucción de la agricultura.'],
      correctLetter: 'B',
      justification: 'El excedente de alimentos permite que no todos deban cultivar la tierra, surgiendo nuevos roles como alfareros, tejedores y constructores (Texto Historia 7°, pág. 22; Resumen MINEDUC, pág. 3).'
    }
  },
  stage8: {
    metacognitivePrompt: 'A partir del caso de la aldea de Çatalhöyük, ¿cómo influye el descubrimiento de la agricultura en el Neolítico en la forma en que vivimos, comemos y habitamos nuestras ciudades hoy en día?',
    congratulation: '¡Felicitaciones por completar con dedicación y pensamiento crítico tu primera clase de Historia sobre la Revolución Neolítica!',
    transferNext: 'En la Clase 2 investigaremos el surgimiento de las primeras ciudades y las grandes civilizaciones fluviales de la Antigüedad.',
    mentor: {
      dile: '¡Muy bien hecho! Cuéntame qué fue lo que más te llamó la atención de cómo vivían las personas en las primeras aldeas.',
      espera: 'Escucha su reflexión histórica con atención y celebra sus conexiones con el presente.',
      siBien: '¡Qué gran pensamiento histórico! Has conectado el pasado remoto con nuestra vida moderna.',
      siApoyo: 'Recuérdale que el pan que comemos hoy nació con los primeros agricultores del Neolítico.'
    }
  }
};

// ==========================================
// 5. INGLÉS
// ==========================================
export const INGLES_DATA: LessonData = {
  subject: 'Inglés',
  subjectCode: 'ING',
  folderCode: '110-7-ING-OA01',
  grade: '7.° Básico',
  oaCode: 'OA01',
  oaTitle: 'Comprender textos y extraer información importante en inglés: identificar la idea general (main idea), extraer información explícita (explicit information) y aplicar estrategias de skimming y scanning en temas de sentimientos y vida cotidiana',
  lessonNumber: 1,
  totalLessons: 6,
  lessonTitle: 'Reading Comprehension: Feelings and Opinions (Skimming & Scanning)',
  dateStr: '2026-10-09 19:45 [America/Santiago]',
  status: 'EN_REVISION',
  sources: [
    {
      title: 'Texto del estudiante Inglés 7° básico',
      details: 'Edición especial MINEDUC, Unit 1: Feelings and Opinions, Lesson 1: How do you feel today?, págs. 6 a 20.'
    },
    {
      title: 'Resumen Curricular Oficial MINEDUC',
      details: 'INSUMOS/RESUMENES/110-7/RESUMNE DE INGLÉS.pdf, págs. 2 a 4.'
    },
    {
      title: 'Bases Curriculares Oficiales MINEDUC (OA01)',
      details: 'Demostrar comprensión de textos no literarios (como artículos informativos, correos electrónicos, entradas de diario de vida) identificando la idea general, información explícita relevante y aplicando estrategias de lectura skimming y scanning.'
    }
  ],
  subobjective: 'Comprender textos breves en inglés sobre sentimientos y opiniones personales, aplicando las estrategias de skimming para identificar la idea principal (main idea) y scanning para localizar datos e información explícita específica.',
  preInstance: {
    purpose: 'Crear un ambiente de confianza y perder el temor a leer en una lengua extranjera.',
    materials: [
      'Cuaderno de Inglés del estudiante.',
      'Lápiz grafito o mina, goma de borrar y lápiz destacador.'
    ],
    timeEstimate: '30 a 35 minutos de trabajo concentrado.',
    mediationAdvice: 'Recordar al estudiante que para comprender un texto en inglés NO se necesita saber el significado exacto del 100% de las palabras. La lectura en inglés es una labor de detective donde buscamos pistas y el sentido global.'
  },
  stage1: {
    welcome: '¡Hola! Te damos la bienvenida a tu clase de Inglés en EstudioSimple.',
    curriculumLocation: 'Clase 1 de 6 (Secuencia OA01 — Unit 1: Feelings and Opinions).',
    priorKnowledge: 'En 6° básico aprendiste vocabulario básico de la rutina diaria y la familia. Hoy daremos un salto emocionante: aprenderemos a leer textos reales en inglés usando estrategias profesionales de lectura comprensiva.',
    sessionFocus: 'Descubrir cómo leer en inglés con las técnicas de Skimming y Scanning, identificar la idea principal y reconocer palabras clave sobre emociones y opiniones.',
    learningPath: [
      'Video Motivacional: El Desafío de Leer en Inglés Sin Miedo.',
      'Recorrido: Indagación guiada sobre traducir palabra por palabra.',
      'Video Explicativo: Skimming, Scanning, Feelings Vocabulary y Caso Modelo.',
      'Práctica: Construcción del Organizador de Lectura Detective en el cuaderno.',
      'Resumen, Miniquiz psicométrico formativo y Cierre metacognitivo.'
    ],
    mentor: {
      dile: 'Today we will start Unit 1! Vamos a descubrir que leer en inglés es como descifrar un mapa del tesoro: no necesitas traducir todo para entender el mensaje.',
      espera: 'Pídele al estudiante que abra su cuaderno de inglés y anote la fecha y el título: Reading Comprehension: Skimming & Scanning (Feelings).',
      siBien: '¡Excellent! Veo tu cuaderno abierto y listo para trabajar.',
      siApoyo: 'Anímalo diciéndole que hoy aprenderá dos trucos de lectura que usan los expertos de todo el mundo.'
    }
  },
  stage2: {
    slides: [
      {
        num: 'G1',
        title: 'El Gran Bloqueo',
        subtitle: 'Frente a una página en inglés',
        screenText: ['• Reading in English', '• ¿Miedo a no entender todo?'],
        visualPrompt: 'Tomás mirando con expresión abrumada un artículo corto en inglés con un diccionario gigante en la mano y cara de cansancio. Estilo Anime 16:9 nítido. No text drawn by AI.',
        script: 'A casi todos nos ha pasado: abres una página en inglés, ves una palabra que no conoces y te detienes asustado pensando "¡no entiendo nada!". ¿Es necesario traducir cada palabra?',
        source: 'Texto Inglés 7°, Unit 1, pág. 6; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G2',
        title: 'El Error del Diccionario',
        subtitle: 'Palabra por palabra no funciona',
        screenText: ['• El Error Común', '• Traducir cada palabra cansa y confunde'],
        visualPrompt: 'Sofía mostrándole a Tomás una lupa sonriendo mientras deja a un lado el pesado diccionario. No text drawn by AI.',
        script: 'Buscar cada palabra en el diccionario hace que la lectura sea lenta y aburrida. Cuando llegas al final de la frase, ya olvidaste de qué trataba el principio.',
        source: 'Texto Inglés 7°, pág. 7; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G3',
        title: 'La Mirada de Halcón',
        subtitle: 'Ver el bosque antes que los árboles',
        screenText: ['• Skimming Strategy', '• Una mirada rápida para la idea general'],
        visualPrompt: 'Gráfico animado con un halcón sobrevolando un paisaje panorámico, captando la forma completa de las montañas. No text drawn by AI.',
        script: 'Los buenos lectores usan una mirada panorámica llamada Skimming: un vistazo veloz al título, las imágenes y la primera oración para descubrir de qué trata el texto en general.',
        source: 'Texto Inglés 7°, pág. 8; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G4',
        title: 'La Linterna Detective',
        subtitle: 'Buscar el dato exacto',
        screenText: ['• Scanning Strategy', '• La mirada fija en un dato clave'],
        visualPrompt: 'Ilustración de una linterna con haz de luz enfocado directamente sobre una fecha y un nombre propio en un párrafo. No text drawn by AI.',
        script: 'Otras veces necesitas un dato específico, como una edad o una emoción. Ahí usas el Scanning: mueves los ojos rápidamente buscando solo esa palabra clave.',
        source: 'Texto Inglés 7°, pág. 9; Resumen MINEDUC, pág. 3.'
      },
      {
        num: 'G5',
        title: 'Sentimientos en Palabras',
        subtitle: 'El vocabulario de nuestras emociones',
        screenText: ['• Feelings & Opinions', '• Happy, Nervous, Excited, Calm'],
        visualPrompt: 'Emoticones ilustrados elegantes estilo anime expresando felicidad, nerviosismo, emoción y calma con etiquetas en inglés debajo. No text drawn by AI.',
        script: 'En esta unidad exploraremos cómo expresar sentimientos: palabras como "happy", "nervous", "excited" y "calm" nos ayudan a entender lo que sienten los personajes.',
        source: 'Texto Inglés 7°, pág. 10; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'G6',
        title: 'Nuestra Misión de Hoy',
        subtitle: 'Dominar la lectura comprensiva',
        screenText: ['• Misión de Hoy', '• Aplicar Skimming y Scanning a un texto real'],
        visualPrompt: 'Sofía y Tomás en la biblioteca escolar leyendo una entrada de diario de vida de un estudiante con lápices destacadores. No text drawn by AI.',
        script: 'Hoy leeremos la publicación de un estudiante que cuenta cómo se siente en su primer día de clases y descubriremos su idea principal y detalles explícitos.',
        source: 'Texto Inglés 7°, pág. 6; Resumen MINEDUC, pág. 3.'
      },
      {
        num: 'G7',
        title: '¡Let’s Read in English!',
        subtitle: 'La aventura de leer con seguridad',
        screenText: ['• ¡Let’s Explore!', '• La lectura en inglés es para ti'],
        visualPrompt: 'Plano general entusiasta de ambos personajes invitando a leer sin miedo. Logo blanco de EstudioSimple en esquina inferior. No text drawn by AI.',
        script: '¡Acompáñanos! Abre tu mente y descubre que puedes comprender historias en inglés mucho mejor de lo que crees.',
        source: 'Texto Inglés 7°, Unit 1, pág. 7.'
      }
    ],
    mentorPrev: 'Fíjate en el video en la diferencia entre mirar todo el paisaje rápido (Skimming) y buscar una palabra con una linterna (Scanning).',
    mentorCheck: '¿Qué dos estrategias de lectura mencionaron Tomás y Sofía en el video?'
  },
  stage3: {
    questions: [
      {
        qText: 'Cuando lees un texto en inglés y encuentras una palabra que no conoces, ¿por qué no es necesario detenerse a buscarla inmediatamente en un diccionario?',
        expected: 'Porque muchas veces puedes deducir el significado por el contexto o continuar leyendo sin que esa palabra impida entender la idea general.',
        hint: 'Piensa en cómo lees en español: si ves una palabra rara en un cuento, ¿te detienes o sigues leyendo para entender la historia?',
        reinforce: '¡Exacto! Detenerse en cada palabra rompe el ritmo y hace olvidar la idea principal del párrafo.',
        formativeSupport: 'En el video explicativo veremos que las palabras clave como títulos y nombres nos dan la mayor parte de la información.',
        source: 'Texto Inglés 7°, pág. 8; Resumen MINEDUC, pág. 2.'
      },
      {
        qText: 'Si te piden responder "¿cuántos años tiene el personaje?", ¿qué estrategia te sirve más: leer todo el texto desde el principio o buscar rápidamente un número con los ojos?',
        expected: 'Buscar rápidamente el número con la mirada fija, aplicando la estrategia de Scanning.',
        hint: 'Es como buscar el número de un autobús que viene a lo lejos: no miras todo el paisaje, solo buscas el número.',
        reinforce: '¡Muy bien! Eso es exactamente Scanning: buscar un dato específico sin leer cada palabra.',
        formativeSupport: 'Scanning es la herramienta perfecta para encontrar información explícita como edades, nombres y lugares.',
        source: 'Texto Inglés 7°, pág. 9; Resumen MINEDUC, pág. 3.'
      }
    ],
    mentor: {
      dile: 'Vamos a comentar estas dos preguntas. Responde con tus palabras y piensa en cómo usas tu vista al buscar algo en una pantalla.',
      espera: 'Escucha su respuesta durante 20 segundos con una actitud positiva.',
      siBien: '¡Qué gran observación! Has captado la esencia de leer como un detective.',
      siApoyo: 'Usa el ejemplo del número de teléfono o el cartel de una tienda para explicar el scanning.'
    }
  },
  stage4: {
    slides: [
      {
        num: 'E1',
        title: 'Reading with Purpose',
        subtitle: 'Leer para comprender el mensaje',
        screenText: ['• Reading Comprehension', '• Entender el significado, no traducir palabras', '• You understand the meaning!'],
        visualPrompt: 'Gráfico visual limpio conectando un texto en inglés con un icono de bombilla encendida (comprensión del mensaje). No text drawn by AI.',
        script: 'La comprensión de lectura en inglés significa entender el mensaje que comunica el autor. No leemos para hacer una lista de traducción, sino para disfrutar y aprender información valiosa.',
        source: 'Texto Inglés 7°, pág. 8; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'E2',
        title: 'Skimming: The Bird’s Eye View',
        subtitle: 'Descubrir The Main Idea',
        screenText: ['• Skimming Strategy', '• Lectura rápida (30 segundos)', '• Responde: ¿De qué trata el texto? (Main Idea)'],
        visualPrompt: 'Un ojo estilizado barriendo las tres primeras líneas de un párrafo resaltando las palabras temáticas principales. No text drawn by AI.',
        script: 'Skimming es leer a vuelo de pájaro: pasas la vista rápido por el título, subtítulos y primeras frases para responder la pregunta fundamental: ¿de qué trata este texto? Esa es la Main Idea.',
        source: 'Texto Inglés 7°, pág. 8; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'E3',
        title: 'Scanning: The Searchlight',
        subtitle: 'Localizar Explicit Information',
        screenText: ['• Scanning Strategy', '• Búsqueda focalizada', '• Encuentra nombres, números, adjetivos específicos'],
        visualPrompt: 'Una lupa destacando la palabra "excited" dentro de un bloque de texto en inglés con marco resaltado. No text drawn by AI.',
        script: 'Scanning es como encender una linterna en la oscuridad: no lees todo, mueves la mirada buscando una palabra clave concreta, como un nombre propio o una emoción explícita.',
        source: 'Texto Inglés 7°, pág. 9; Resumen MINEDUC, pág. 3.'
      },
      {
        num: 'E4',
        title: 'Feelings Vocabulary',
        subtitle: 'Palabras para expresar emociones',
        screenText: ['• Key Adjectives', '• Happy (feliz) • Nervous (nervioso)', '• Excited (entusiasmado) • Calm (tranquilo)'],
        visualPrompt: 'Cuatro tarjetas ilustradas elegantes con los cuatro adjetivos en inglés y situaciones cotidianas representadas con respeto. No text drawn by AI.',
        script: 'Conozcamos cuatro adjetivos clave de la unidad: Happy (feliz), Nervous (nervioso o inquieta), Excited (entusiasmado o ilusionado) y Calm (tranquilo y en paz).',
        source: 'Texto Inglés 7°, pág. 10; Resumen MINEDUC, pág. 2.'
      },
      {
        num: 'E5',
        title: 'Explicit Information',
        subtitle: 'Datos que están a la vista',
        screenText: ['• Explicit Facts', '• Datos escritos directamente en el texto', '• Ejemplo: "The cat is white" → El gato es blanco'],
        visualPrompt: 'Comparación nítida entre una frase textual subrayada y la pregunta directa que responde exactamente con las mismas palabras. No text drawn by AI.',
        script: 'La información explícita es aquella que aparece escrita directamente en las líneas del texto. No tienes que adivinarla: basta con encontrar la oración exacta.',
        source: 'Texto Inglés 7°, pág. 12; Resumen MINEDUC, pág. 3.'
      },
      {
        num: 'E6',
        title: 'Model Text: Alex’s Blog',
        subtitle: 'Análisis de un texto real',
        screenText: ['• Alex’s Post', '• "Hi! I am Alex. Today is my first day at my new school. I feel nervous because everything is new, but I am excited to meet new friends."'],
        visualPrompt: 'Post de red social escolar estilizado con el avatar de Alex de 13 años y las tres líneas de texto en inglés en tipografía nítida y legible. No text drawn by AI.',
        script: 'Analicemos nuestro texto modelo: Alex escribe: "Hi! I am Alex. Today is my first day at my new school. I feel nervous because everything is new, but I am excited to meet new friends." Con Skimming vemos que habla de su primer día escolar. Con Scanning encontramos por qué está nervioso: "because everything is new".',
        source: 'Texto Inglés 7°, pág. 14; Resumen MINEDUC, págs. 2–3.'
      },
      {
        num: 'E7',
        title: 'Golden Rule of Reading',
        subtitle: 'Principio de lectura en inglés',
        screenText: ['• Golden Rule', '• Skimming for Main Idea', '• Scanning for Specific Details', '• Don’t translate word-by-word!'],
        visualPrompt: 'Marco dorado formal sobrio con tipografía limpia en inglés y español. Logo de EstudioSimple en la esquina inferior. No text drawn by AI.',
        script: 'Our Golden Rule: Usa Skimming para la idea general y Scanning para los datos específicos. No necesitas traducir cada palabra para comprender el mensaje.',
        source: 'Texto Inglés 7°, Unit 1, pág. 8; Resumen MINEDUC, pág. 4.'
      }
    ],
    caseModel: {
      title: 'Model Text Analysis: Alex’s First Day at School',
      steps: [
        { stepName: 'Step 1 (Skimming - Main Idea)', desc: 'Leer el post completo en 15 segundos: trata sobre los sentimientos de un estudiante en su primer día de clases.', source: 'Texto Inglés 7°, pág. 14.' },
        { stepName: 'Step 2 (Scanning - Key Feelings)', desc: 'Buscar adjetivos de emoción: encontramos "nervous" (nervioso) y "excited" (entusiasmado).', source: 'Texto Inglés 7°, pág. 14.' },
        { stepName: 'Step 3 (Extracting Explicit Facts)', desc: 'Pregunta: ¿Por qué se siente nervioso? Oración textual explícita: "because everything is new".', source: 'Resumen MINEDUC, pág. 3.' },
        { stepName: 'Step 4 (Positive Motivation)', desc: 'Pregunta: ¿Por qué se siente entusiasmado? Oración textual explícita: "to meet new friends".', source: 'Resumen MINEDUC, pág. 3.' }
      ]
    },
    goldenRule: 'Use Skimming to grasp the Main Idea and Scanning to locate Specific Explicit Information; never get stuck translating word-by-word.'
  },
  stage5: {
    notebookPrompt: 'Abre tu cuaderno de Inglés. Traza una tabla de dos columnas con regla. En la Columna 1 rotula "Reading Strategy" y escribe: 1) Skimming, 2) Scanning. En la Columna 2 rotula "How to use it in Alex\'s text" y anota qué descubriste con cada una: para Skimming anota la Main Idea en una oración en español o inglés; para Scanning escribe los dos adjetivos de emoción que encontramos ("nervous" y "excited") con su razón explícita.',
    expectedOutcome: [
      { section: 'Estrategia 1: Skimming', desc: 'Main Idea: La experiencia y emociones de Alex en su primer día en una nueva escuela (Alex’s feelings on his first day at school).', source: 'Texto Inglés 7°, pág. 14.' },
      { section: 'Estrategia 2: Scanning', desc: 'Dato explícito 1: "nervous" (because everything is new). Dato explícito 2: "excited" (to meet new friends).', source: 'Texto Inglés 7°, pág. 14; Resumen MINEDUC, pág. 3.' },
      { section: 'Vocabulario de Emociones', desc: 'Anotar en una caja destacada: Happy = feliz, Calm = tranquilo/a, Nervous = nervioso/a, Excited = entusiasmado/a.', source: 'Texto Inglés 7°, pág. 10.' },
      { section: 'Opinión Personal Breve', desc: 'El estudiante escribe: "In my opinion, it is normal to feel nervous when you are in a new place".', source: 'Resumen MINEDUC, pág. 3.' }
    ],
    hints: [
      'Pista 1: Recuerda que "excited" en inglés significa tener muchas ganas o ilusión por algo bueno, no significa enojado.',
      'Pista 2: Para encontrar la razón explícita, busca la palabra conectora "because".'
    ],
    mentor: {
      dile: 'Vamos a trabajar en tu cuaderno de inglés. Dibuja la tabla con regla y anota los datos del texto de Alex.',
      espera: 'Dale entre 6 y 8 minutos para completar la tabla y copiar el vocabulario.',
      siBien: '¡Excellent job! Tu organizador gráfico demuestra que encontraste la información explícita de inmediato.',
      siApoyo: 'Recuérdale buscar directamente la palabra "nervous" en la diapositiva para ver qué dice al lado.'
    }
  },
  stage6: {
    keyIdeas: [
      { text: 'Comprender un texto en inglés no requiere traducir cada palabra; se trata de entender el mensaje principal y el propósito del autor.', source: 'Texto Inglés 7°, pág. 8; Resumen MINEDUC, pág. 2.' },
      { text: 'La estrategia de Skimming permite captar la idea general (Main Idea) mediante una lectura panorámica rápida de títulos y primeras frases.', source: 'Texto Inglés 7°, pág. 8; Resumen MINEDUC, pág. 2.' },
      { text: 'La estrategia de Scanning permite localizar información explícita (fechas, nombres, adjetivos como nervous o excited) moviendo la vista directamente hacia la palabra clave.', source: 'Texto Inglés 7°, pág. 9; Resumen MINEDUC, pág. 3.' }
    ],
    synthesisCard: 'Skimming = Main Idea (Vista panorámica). Scanning = Explicit Details (Linterna detective).',
    mentor: {
      dile: 'Leamos juntos las tres ideas de resumen de nuestra clase de Inglés.',
      espera: 'Pídele que te diga cuál de las dos estrategias usaría para encontrar el número de teléfono de una pizzería.',
      siBien: '¡Exacto! Scanning, porque buscas un dato numérico específico.',
      siApoyo: 'Recuérdale: si buscas un dato concreto, enciendes la linterna de scanning.'
    }
  },
  stage7: {
    questions: [
      {
        code: 'Q1-ING7-OA01',
        question: 'What is the Main Idea of Alex’s text according to our Skimming strategy? (¿Cuál es la idea principal del texto de Alex según la estrategia de Skimming?)',
        options: [
          { letter: 'A', text: 'Alex is playing a video game with his cousins at home.', isCorrect: false },
          { letter: 'B', text: 'Alex shares his feelings and experiences during his first day at a new school.', isCorrect: true },
          { letter: 'C', text: 'Alex is cooking a delicious pizza for his teachers.', isCorrect: false },
          { letter: 'D', text: 'Alex is buying a bicycle in a shopping mall.', isCorrect: false }
        ],
        distractorsAnalysis: [
          { letter: 'A', text: 'Alex is playing a video game with his cousins at home.', reason: 'Distractor. El texto no menciona videojuegos ni familiares (Texto Inglés 7°, pág. 14).' },
          { letter: 'C', text: 'Alex is cooking a delicious pizza for his teachers.', reason: 'Distractor. No guarda ninguna relación temática con el texto escolar analizado.' },
          { letter: 'D', text: 'Alex is buying a bicycle in a shopping mall.', reason: 'Distractor. No se menciona ninguna compra o medio de transporte.' }
        ]
      },
      {
        code: 'Q2-ING7-OA01',
        question: 'According to the explicit information in the text, why does Alex feel excited? (Según la información explícita del texto, ¿por qué Alex se siente entusiasmado?)',
        options: [
          { letter: 'A', text: 'Because he is tired of studying.', isCorrect: false },
          { letter: 'B', text: 'Because he is excited to meet new friends.', isCorrect: true },
          { letter: 'C', text: 'Because he wants to sleep all day.', isCorrect: false },
          { letter: 'D', text: 'Because his school was closed.', isCorrect: false }
        ],
        distractorsAnalysis: [
          { letter: 'A', text: 'Because he is tired of studying.', reason: 'Distractor. Alex no dice estar cansado; expresa nerviosismo y emoción positiva (Resumen MINEDUC, pág. 3).' },
          { letter: 'C', text: 'Because he wants to sleep all day.', reason: 'Distractor. Información no presente en el texto.' },
          { letter: 'D', text: 'Because his school was closed.', reason: 'Distractor. Falso: Alex está físicamente en su nueva escuela comenzando las clases.' }
        ]
      },
      {
        code: 'Q3-ING7-OA01',
        question: 'If you want to find the exact time a train leaves in an English brochure, which reading strategy should you use? (Si quieres encontrar la hora exacta en que sale un tren en un folleto en inglés, ¿qué estrategia debes usar?)',
        options: [
          { letter: 'A', text: 'Translating every word with a dictionary from page one.', isCorrect: false },
          { letter: 'B', text: 'Scanning, moving your eyes quickly looking specifically for numbers and hours.', isCorrect: true },
          { letter: 'C', text: 'Memorizing the whole brochure by heart.', isCorrect: false },
          { letter: 'D', text: 'Reading only the author’s biography.', isCorrect: false }
        ],
        distractorsAnalysis: [
          { letter: 'A', text: 'Translating every word with a dictionary from page one.', reason: 'Distractor. Estrategia ineficiente y lenta desaconsejada en la clase (Texto Inglés 7°, pág. 8).' },
          { letter: 'C', text: 'Memorizing the whole brochure by heart.', reason: 'Distractor. No es una estrategia de lectura comprensiva funcional.' },
          { letter: 'D', text: 'Reading only the author’s biography.', reason: 'Distractor. La biografía del autor no contiene los horarios del tren.' }
        ]
      }
    ],
    remedialCapsule: 'Remember: When reading in English, use Skimming to discover the general topic (What is the text about?) and Scanning to find explicit words and specific facts like names or hours (Texto Inglés 7°, pág. 8; Resumen MINEDUC, pág. 2).',
    remedialItem: {
      question: 'In the sentence: "Emma feels happy because she won a medal", what is the explicit reason why Emma feels happy? (¿Cuál es la razón explícita por la que Emma se siente feliz?)',
      options: ['A) Because she is eating cake.', 'B) Because she won a medal. [CORRECTA]', 'C) Because it is raining outside.', 'D) Because she lost her keys.'],
      correctLetter: 'B',
      justification: 'The explicit text clearly states "because she won a medal", answering the exact reason for her feeling (Resumen MINEDUC, pág. 3).'
    }
  },
  stage8: {
    metacognitivePrompt: 'A partir del caso de Alex, ¿por qué crees que aprender las estrategias de Skimming y Scanning te dará más confianza para leer artículos, páginas web o canciones en inglés por tu cuenta?',
    congratulation: '¡Congratulations! Has completado con éxito y mucho entusiasmo tu primera clase de Inglés sobre estrategias de lectura.',
    transferNext: 'In Lesson 2 we will explore how to express our own opinions using the phrases "I think that..." and "In my opinion...".',
    mentor: {
      dile: '¡Very well done! Cuéntame qué truco de lectura te pareció más útil para no tenerle miedo a los textos en inglés.',
      espera: 'Escucha su respuesta en español o inglés con entusiasmo y anímalo.',
      siBien: '¡Great reflection! Ya eres todo un detective de la lectura en inglés.',
      siApoyo: 'Recuérdale que la práctica hace al maestro y que hoy dio un gran primer paso.'
    }
  }
};

export const ALL_LESSONS: LessonData[] = [
  CIENCIAS_DATA,
  MATEMATICA_DATA,
  LENGUA_DATA,
  HISTORIA_DATA,
  INGLES_DATA
];

export function generateMarkdown(lesson: LessonData): string {
  let md = `# GUION PEDAGÓGICO OFICIAL DESARROLLADO: ${lesson.subject.toUpperCase()} ${lesson.grade.toUpperCase()} ${lesson.oaCode} — CLASE ${lesson.lessonNumber}\n`;
  md += `## EstudioSimple — Sistema Global de Lecciones v2.0\n`;
  md += `**Ubicación:** \`SALIDA_SISTEMA_LECCIONES_V2/${lesson.folderCode}/Clase_0${lesson.lessonNumber}/Guion_Pedagogico_Clase0${lesson.lessonNumber}.md\`  \n`;
  md += `**Fecha y Hora:** ${lesson.dateStr}  \n`;
  md += `**Estado:** Propuesta en preparación (\`${lesson.status}\`)  \n`;
  md += `**Asignatura:** ${lesson.subject} (${lesson.grade}, Código ${lesson.folderCode.split('-')[0]}-${lesson.folderCode.split('-')[1]})  \n`;
  md += `**Objetivo de Aprendizaje Oficial:** ${lesson.oaCode} — ${lesson.oaTitle}  \n`;
  md += `**Fuentes Oficiales Discriminadas:**\n`;
  lesson.sources.forEach((s, idx) => {
    md += `${idx + 1}. *${s.title}* (${s.details})\n`;
  });
  md += `\n**Subobjetivo Específico:** ${lesson.subobjective}\n\n---\n\n`;

  // Instancia Previa
  md += `## INSTANCIA PREVIA: ANTES DE COMENZAR (Guía del Adulto Mentor)\n`;
  md += `* **Propósito:** ${lesson.preInstance.purpose}\n`;
  md += `* **Materiales necesarios:**\n`;
  lesson.preInstance.materials.forEach(m => {
    md += `  - ${m}\n`;
  });
  md += `* **Tiempo estimado de la sesión:** ${lesson.preInstance.timeEstimate}\n`;
  md += `* **Consejo de mediación pedagógica:** ${lesson.preInstance.mediationAdvice}\n\n---\n\n`;

  // Etapa 1
  md += `## ETAPA 1 — INICIO\n`;
  md += `* **Experiencia y Pantalla del Estudiante:**\n`;
  md += `  - **Bienvenida:** "${lesson.stage1.welcome}"\n`;
  md += `  - **Ubicación en el currículo:** ${lesson.stage1.curriculumLocation}\n`;
  md += `  - **Activación de conocimientos previos:** ${lesson.stage1.priorKnowledge}\n`;
  md += `  - **Foco de la sesión:** ${lesson.stage1.sessionFocus}\n`;
  md += `  - **Ruta de aprendizaje:**\n`;
  lesson.stage1.learningPath.forEach((p, idx) => {
    md += `    ${idx + 1}. ${p}\n`;
  });
  md += `* **Guía del Adulto Mentor:**\n`;
  md += `  - \`DILE:\` "${lesson.stage1.mentor.dile}"\n`;
  md += `  - \`ESPERA:\` ${lesson.stage1.mentor.espera}\n`;
  md += `  - \`SI RESPONDE BIEN:\` "${lesson.stage1.mentor.siBien}"\n`;
  md += `  - \`SI NECESITA APOYO:\` ${lesson.stage1.mentor.siApoyo}\n\n---\n\n`;

  // Etapa 2
  md += `## ETAPA 2 — VIDEO MOTIVACIONAL (7 Diapositivas)\n\n`;
  md += `| N.° | Título y Subtítulo | Texto Visible en Pantalla | Descripción Visual del Arte (16:9 Anime) | Guion Oral (Notas al Orador) | Fuente y Página Respaldada |\n`;
  md += `| :---: | :--- | :--- | :--- | :--- | :--- |\n`;
  lesson.stage2.slides.forEach(s => {
    const screenTxt = s.screenText.join('<br>');
    md += `| **${s.num}** | **${s.title}**<br>*${s.subtitle}* | ${screenTxt} | ${s.visualPrompt} | ${s.script} | ${s.source} |\n`;
  });
  md += `\n* **Instrucción Previa del Adulto:** "${lesson.stage2.mentorPrev}"\n`;
  md += `* **Comprobación Posterior:** "${lesson.stage2.mentorCheck}"\n\n---\n\n`;

  // Etapa 3
  md += `## ETAPA 3 — RECORRIDO (Indagación Socrática Guiada)\n`;
  lesson.stage3.questions.forEach((q, idx) => {
    md += `* **Pregunta ${idx + 1}:** "${q.qText}"\n`;
    md += `  - *Respuesta esperada:* ${q.expected}\n`;
    md += `  - *Pista gradual:* ${q.hint}\n`;
    md += `  - *Refuerzo positivo:* "${q.reinforce}"\n`;
    md += `  - *Apoyo formativo:* "${q.formativeSupport}"\n`;
    md += `  - *Respaldo curricular:* ${q.source}\n`;
  });
  md += `* **Guía del Adulto Mentor:**\n`;
  md += `  - \`DILE:\` "${lesson.stage3.mentor.dile}"\n`;
  md += `  - \`ESPERA:\` ${lesson.stage3.mentor.espera}\n`;
  md += `  - \`SI RESPONDE BIEN:\` "${lesson.stage3.mentor.siBien}"\n`;
  md += `  - \`SI NECESITA APOYO:\` ${lesson.stage3.mentor.siApoyo}\n\n---\n\n`;

  // Etapa 4
  md += `## ETAPA 4 — VIDEO EXPLICATIVO (7 Diapositivas)\n\n`;
  md += `| N.° | Título y Subtítulo | Texto Visible en Pantalla | Descripción Visual del Arte (16:9 Anime) | Guion Oral (Notas al Orador) | Fuente y Página Respaldada |\n`;
  md += `| :---: | :--- | :--- | :--- | :--- | :--- |\n`;
  lesson.stage4.slides.forEach(s => {
    const screenTxt = s.screenText.join('<br>');
    md += `| **${s.num}** | **${s.title}**<br>*${s.subtitle}* | ${screenTxt} | ${s.visualPrompt} | ${s.script} | ${s.source} |\n`;
  });
  md += `\n* **Modelamiento Explícito (${lesson.stage4.caseModel.title}):**\n`;
  lesson.stage4.caseModel.steps.forEach(st => {
    md += `  - **${st.stepName}:** ${st.desc} (**Fuente:** ${st.source})\n`;
  });
  md += `* **Regla de Oro:** *${lesson.stage4.goldenRule}*\n\n---\n\n`;

  // Etapa 5
  md += `## ETAPA 5 — PRÁCTICA (Cuaderno Físico y Transferencia Isomórfica)\n`;
  md += `* **Actividad en Cuaderno:**\n`;
  md += `  - *Consigna literal:* "${lesson.stage5.notebookPrompt}"\n`;
  md += `  - *Desempeño esperado:*\n`;
  lesson.stage5.expectedOutcome.forEach(eo => {
    md += `    * **${eo.section}:** ${eo.desc} (**Fuente:** ${eo.source})\n`;
  });
  md += `  - *Pistas graduales:*\n`;
  lesson.stage5.hints.forEach(h => {
    md += `    * ${h}\n`;
  });
  md += `* **Guía del Adulto Mentor:**\n`;
  md += `  - \`DILE:\` "${lesson.stage5.mentor.dile}"\n`;
  md += `  - \`ESPERA:\` ${lesson.stage5.mentor.espera}\n`;
  md += `  - \`SI RESPONDE BIEN:\` "${lesson.stage5.mentor.siBien}"\n`;
  md += `  - \`SI NECESITA APOYO:\` ${lesson.stage5.mentor.siApoyo}\n\n---\n\n`;

  // Etapa 6
  md += `## ETAPA 6 — RESUMEN (Consolidación Cognitiva Sin Materia Nueva)\n`;
  md += `* **Ideas Clave Efectivamente Consolidadas:**\n`;
  lesson.stage6.keyIdeas.forEach((ki, idx) => {
    md += `  ${idx + 1}. ${ki.text} (**Fuente:** ${ki.source})\n`;
  });
  md += `* **Tarjeta de Síntesis en Cuaderno:** *${lesson.stage6.synthesisCard}*\n`;
  md += `* **Guía del Adulto Mentor:**\n`;
  md += `  - \`DILE:\` "${lesson.stage6.mentor.dile}"\n`;
  md += `  - \`ESPERA:\` ${lesson.stage6.mentor.espera}\n`;
  md += `  - \`SI RESPONDE BIEN:\` "${lesson.stage6.mentor.siBien}"\n`;
  md += `  - \`SI NECESITA APOYO:\` ${lesson.stage6.mentor.siApoyo}\n\n---\n\n`;

  // Etapa 7
  md += `## ETAPA 7 — MINIQUIZ FORMATIVO (3 Preguntas Psicométricas de Selección Múltiple)\n\n`;
  lesson.stage7.questions.forEach((q, idx) => {
    md += `### Pregunta ${idx + 1} (${q.code})\n`;
    md += `${q.question}\n`;
    q.options.forEach(opt => {
      if (opt.isCorrect) {
        md += `* **${opt.letter}) ${opt.text} [CLAVE CORRECTA]**\n`;
      } else {
        md += `* ${opt.letter}) ${opt.text}\n`;
      }
    });
    md += `* *Análisis de distractores:*\n`;
    q.distractorsAnalysis.forEach(da => {
      md += `  - ${da.letter}: ${da.reason}\n`;
    });
    md += `\n`;
  });
  md += `### Bucle de Recuperación Formativa (Umbral: $\\ge 2$ de 3)\n`;
  md += `* *Parámetros:* Las claves privadas están ocultas antes de que el estudiante responda. Al menos 2 aciertos de 3 permiten avanzar.\n`;
  md += `* *Cápsula de refuerzo formativo:* "${lesson.stage7.remedialCapsule}"\n`;
  md += `* *Ítem remedial equivalente:*\n`;
  md += `  - *Pregunta:* ${lesson.stage7.remedialItem.question}\n`;
  md += `  - *Opciones:* ${lesson.stage7.remedialItem.options.join(' | ')}\n`;
  md += `  - *Justificación:* ${lesson.stage7.remedialItem.justification}\n\n---\n\n`;

  // Etapa 8
  md += `## ETAPA 8 — CIERRE (Metacognición y Transferencia)\n`;
  md += `* **Pregunta Metacognitiva:** "${lesson.stage8.metacognitivePrompt}"\n`;
  md += `* **Mensaje de Felicitación:** "${lesson.stage8.congratulation}"\n`;
  md += `* **Transferencia a la siguiente clase:** ${lesson.stage8.transferNext}\n`;
  md += `* **Guía del Adulto Mentor:**\n`;
  md += `  - \`DILE:\` "${lesson.stage8.mentor.dile}"\n`;
  md += `  - \`ESPERA:\` ${lesson.stage8.mentor.espera}\n`;
  md += `  - \`SI RESPONDE BIEN:\` "${lesson.stage8.mentor.siBien}"\n`;
  md += `  - \`SI NECESITA APOYO:\` ${lesson.stage8.mentor.siApoyo}\n`;

  return md;
}

export function generateDocxDocument(lesson: LessonData): Document {
  const tableBorder = {
    top: { style: BorderStyle.SINGLE, size: 1, color: 'B0BEC5' },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: 'B0BEC5' },
    left: { style: BorderStyle.SINGLE, size: 1, color: 'B0BEC5' },
    right: { style: BorderStyle.SINGLE, size: 1, color: 'B0BEC5' }
  };

  const headerShading = {
    fill: '0F172A',
    type: ShadingType.CLEAR,
    color: 'auto'
  };

  const zebraShading = {
    fill: 'F8FAFC',
    type: ShadingType.CLEAR,
    color: 'auto'
  };

  // Helper para construir tablas audiovisuales completas (14 diapositivas individuales)
  const buildSlideTable = (slides: SlideData[]): Table => {
    const rows: TableRow[] = [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Lámina', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading, width: { size: 10, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Título y Subtítulo', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading, width: { size: 18, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Texto en Pantalla', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading, width: { size: 18, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Arte Visual (16:9 Anime)', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading, width: { size: 22, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Guion Oral (Locución)', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading, width: { size: 20, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Fuente Respaldada', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading, width: { size: 12, type: WidthType.PERCENTAGE } })
        ]
      })
    ];

    slides.forEach((s, idx) => {
      const isZebra = idx % 2 === 1;
      rows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: s.num, bold: true })] })],
              borders: tableBorder,
              shading: isZebra ? zebraShading : undefined
            }),
            new TableCell({
              children: [
                new Paragraph({ children: [new TextRun({ text: s.title, bold: true })] }),
                new Paragraph({ children: [new TextRun({ text: s.subtitle, italics: true, color: '64748B' })] })
              ],
              borders: tableBorder,
              shading: isZebra ? zebraShading : undefined
            }),
            new TableCell({
              children: s.screenText.map(t => new Paragraph({ text: t })),
              borders: tableBorder,
              shading: isZebra ? zebraShading : undefined
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: s.visualPrompt })] })],
              borders: tableBorder,
              shading: isZebra ? zebraShading : undefined
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: s.script, italics: true })] })],
              borders: tableBorder,
              shading: isZebra ? zebraShading : undefined
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: s.source, size: 18, color: '475569' })] })],
              borders: tableBorder,
              shading: isZebra ? zebraShading : undefined
            })
          ]
        })
      );
    });

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows
    });
  };

  // Construir secciones del documento
  const children: any[] = [
    new Paragraph({
      text: 'PLAN MAESTRO DE CLASE — ESTUDIOSIMPLE',
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 }
    }),
    new Paragraph({
      text: `${lesson.subject} ${lesson.grade} — ${lesson.oaCode} (Clase ${lesson.lessonNumber} de ${lesson.totalLessons})`,
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Título de la Lección: ', bold: true }),
        new TextRun(`${lesson.lessonTitle}\n`),
        new TextRun({ text: 'Fecha y Hora Oficial: ', bold: true }),
        new TextRun(`${lesson.dateStr}\n`),
        new TextRun({ text: 'Estado de Gobernanza: ', bold: true }),
        new TextRun(`${lesson.status} (Aprobación reservada formalmente a Walter y ChatGPT Work)\n`),
        new TextRun({ text: 'Objetivo de Aprendizaje: ', bold: true }),
        new TextRun(`${lesson.oaCode} — ${lesson.oaTitle}\n`),
        new TextRun({ text: 'Fuentes Oficiales Respaldadas:\n', bold: true }),
        ...lesson.sources.map(s => new TextRun(`• ${s.title}: ${s.details}\n`))
      ],
      spacing: { after: 240 }
    }),

    // SUBOBJETIVO
    new Paragraph({
      text: 'Subobjetivo Específico de Aprendizaje',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: lesson.subobjective,
      spacing: { after: 200 }
    }),

    // INSTANCIA PREVIA
    new Paragraph({
      text: 'Instancia Previa: Antes de Comenzar (Guía del Adulto Mentor)',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Propósito: ', bold: true }),
        new TextRun(`${lesson.preInstance.purpose}\n`),
        new TextRun({ text: 'Materiales Necesarios: ', bold: true }),
        new TextRun(`${lesson.preInstance.materials.join(', ')}\n`),
        new TextRun({ text: 'Tiempo Estimado: ', bold: true }),
        new TextRun(`${lesson.preInstance.timeEstimate}\n`),
        new TextRun({ text: 'Mediación Pedagógica: ', bold: true }),
        new TextRun(lesson.preInstance.mediationAdvice)
      ],
      spacing: { after: 240 }
    }),

    // ETAPA 1
    new Paragraph({
      text: 'Etapa 1 — Inicio (Activación y Encuadre)',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Experiencia del Estudiante:\n', bold: true }),
        new TextRun(`• Bienvenida: "${lesson.stage1.welcome}"\n`),
        new TextRun(`• Ubicación curricular: ${lesson.stage1.curriculumLocation}\n`),
        new TextRun(`• Activación previa: ${lesson.stage1.priorKnowledge}\n`),
        new TextRun(`• Foco de sesión: ${lesson.stage1.sessionFocus}\n`),
        new TextRun(`• Ruta de aprendizaje: ${lesson.stage1.learningPath.join(' → ')}\n\n`),
        new TextRun({ text: 'Guía del Adulto Mentor:\n', bold: true }),
        new TextRun(`• DILE: "${lesson.stage1.mentor.dile}"\n`),
        new TextRun(`• ESPERA: ${lesson.stage1.mentor.espera}\n`),
        new TextRun(`• SI RESPONDE BIEN: "${lesson.stage1.mentor.siBien}"\n`),
        new TextRun(`• SI NECESITA APOYO: ${lesson.stage1.mentor.siApoyo}`)
      ],
      spacing: { after: 240 }
    }),

    // ETAPA 2
    new Paragraph({
      text: 'Etapa 2 — Video Motivacional (7 Diapositivas Desarrolladas)',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Instrucción Previa del Mentor: ', bold: true }),
        new TextRun(`"${lesson.stage2.mentorPrev}"\n`),
        new TextRun({ text: 'Comprobación Posterior: ', bold: true }),
        new TextRun(`"${lesson.stage2.mentorCheck}"`)
      ],
      spacing: { after: 140 }
    }),
    buildSlideTable(lesson.stage2.slides),

    // ETAPA 3
    new Paragraph({
      text: 'Etapa 3 — Recorrido (Indagación Socrática Guiada)',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 240, after: 100 }
    }),
    ...lesson.stage3.questions.flatMap((q, idx) => [
      new Paragraph({
        children: [
          new TextRun({ text: `Pregunta Socrática ${idx + 1}: `, bold: true }),
          new TextRun(`"${q.qText}"`)
        ],
        spacing: { before: 80, after: 40 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '• Respuesta Esperada: ', bold: true }),
          new TextRun(`${q.expected}\n`),
          new TextRun({ text: '• Pista Gradual: ', bold: true }),
          new TextRun(`${q.hint}\n`),
          new TextRun({ text: '• Refuerzo Positivo: ', bold: true }),
          new TextRun(`"${q.reinforce}"\n`),
          new TextRun({ text: '• Apoyo Formativo: ', bold: true }),
          new TextRun(`"${q.formativeSupport}"\n`),
          new TextRun({ text: '• Respaldo Curricular: ', bold: true }),
          new TextRun(q.source)
        ],
        spacing: { after: 100 }
      })
    ]),
    new Paragraph({
      children: [
        new TextRun({ text: 'Guía del Mentor en Recorrido:\n', bold: true }),
        new TextRun(`• DILE: "${lesson.stage3.mentor.dile}"\n`),
        new TextRun(`• ESPERA: ${lesson.stage3.mentor.espera}\n`),
        new TextRun(`• SI RESPONDE BIEN: "${lesson.stage3.mentor.siBien}"\n`),
        new TextRun(`• SI NECESITA APOYO: ${lesson.stage3.mentor.siApoyo}`)
      ],
      spacing: { after: 240 }
    }),

    // ETAPA 4
    new Paragraph({
      text: 'Etapa 4 — Video Explicativo (7 Diapositivas Desarrolladas)',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 }
    }),
    buildSlideTable(lesson.stage4.slides),
    new Paragraph({
      text: `Modelamiento Explícito: ${lesson.stage4.caseModel.title}`,
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 180, after: 80 }
    }),
    ...lesson.stage4.caseModel.steps.map(st => new Paragraph({
      children: [
        new TextRun({ text: `• ${st.stepName}: `, bold: true }),
        new TextRun(`${st.desc} `),
        new TextRun({ text: `[Fuente: ${st.source}]`, italics: true, color: '475569' })
      ],
      spacing: { after: 60 }
    })),
    new Paragraph({
      children: [
        new TextRun({ text: 'Regla de Oro: ', bold: true, color: '0F172A' }),
        new TextRun({ text: `"${lesson.stage4.goldenRule}"`, bold: true, italics: true })
      ],
      spacing: { before: 100, after: 240 }
    }),

    // ETAPA 5
    new Paragraph({
      text: 'Etapa 5 — Práctica (Cuaderno Físico)',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Consigna Literal para el Cuaderno:\n', bold: true }),
        new TextRun(`"${lesson.stage5.notebookPrompt}"\n\n`),
        new TextRun({ text: 'Desempeño Esperado:\n', bold: true }),
        ...lesson.stage5.expectedOutcome.flatMap(eo => [
          new TextRun(`• ${eo.section}: ${eo.desc} [Fuente: ${eo.source}]\n`)
        ]),
        new TextRun({ text: '\nPistas Graduales:\n', bold: true }),
        ...lesson.stage5.hints.map(h => new TextRun(`• ${h}\n`)),
        new TextRun({ text: '\nGuía del Adulto Mentor:\n', bold: true }),
        new TextRun(`• DILE: "${lesson.stage5.mentor.dile}"\n`),
        new TextRun(`• ESPERA: ${lesson.stage5.mentor.espera}\n`),
        new TextRun(`• SI RESPONDE BIEN: "${lesson.stage5.mentor.siBien}"\n`),
        new TextRun(`• SI NECESITA APOYO: ${lesson.stage5.mentor.siApoyo}`)
      ],
      spacing: { after: 240 }
    }),

    // ETAPA 6
    new Paragraph({
      text: 'Etapa 6 — Resumen (Consolidación Cognitiva)',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 }
    }),
    ...lesson.stage6.keyIdeas.map((ki, idx) => new Paragraph({
      children: [
        new TextRun({ text: `${idx + 1}. `, bold: true }),
        new TextRun(`${ki.text} `),
        new TextRun({ text: `[Fuente: ${ki.source}]`, italics: true, color: '475569' })
      ],
      spacing: { after: 60 }
    })),
    new Paragraph({
      children: [
        new TextRun({ text: 'Tarjeta de Síntesis en Cuaderno: ', bold: true }),
        new TextRun({ text: `"${lesson.stage6.synthesisCard}"`, italics: true })
      ],
      spacing: { before: 80, after: 140 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Guía del Mentor en Resumen:\n', bold: true }),
        new TextRun(`• DILE: "${lesson.stage6.mentor.dile}"\n`),
        new TextRun(`• ESPERA: ${lesson.stage6.mentor.espera}\n`),
        new TextRun(`• SI RESPONDE BIEN: "${lesson.stage6.mentor.siBien}"\n`),
        new TextRun(`• SI NECESITA APOYO: ${lesson.stage6.mentor.siApoyo}`)
      ],
      spacing: { after: 240 }
    }),

    // ETAPA 7
    new Paragraph({
      text: 'Etapa 7 — Miniquiz Formativo (3 Preguntas Psicométricas Completas)',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 }
    }),
    ...lesson.stage7.questions.flatMap((q, idx) => [
      new Paragraph({
        children: [
          new TextRun({ text: `Pregunta ${idx + 1} (${q.code}): `, bold: true }),
          new TextRun(q.question)
        ],
        spacing: { before: 100, after: 60 }
      }),
      ...q.options.map(opt => new Paragraph({
        children: [
          new TextRun({ text: `${opt.letter}) `, bold: true }),
          new TextRun({ text: opt.text, bold: opt.isCorrect, color: opt.isCorrect ? '059669' : undefined }),
          opt.isCorrect ? new TextRun({ text: ' [CLAVE CORRECTA]', bold: true, color: '059669' }) : new TextRun('')
        ],
        spacing: { after: 30 }
      })),
      new Paragraph({
        text: 'Análisis Justificado de Distractores:',
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 60, after: 30 }
      }),
      ...q.distractorsAnalysis.map(da => new Paragraph({
        children: [
          new TextRun({ text: `• Alternativa ${da.letter}: `, bold: true }),
          new TextRun(da.reason)
        ],
        spacing: { after: 40 }
      }))
    ]),
    new Paragraph({
      text: 'Bucle de Recuperación Formativa (Umbral >= 2 de 3)',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 140, after: 60 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Cápsula Formativa Remedial: ', bold: true }),
        new TextRun(`${lesson.stage7.remedialCapsule}\n\n`),
        new TextRun({ text: 'Ítem Remedial Equivalente:\n', bold: true }),
        new TextRun(`• Pregunta: ${lesson.stage7.remedialItem.question}\n`),
        new TextRun(`• Opciones: ${lesson.stage7.remedialItem.options.join(' | ')}\n`),
        new TextRun(`• Clave Correcta: Opción ${lesson.stage7.remedialItem.correctLetter}\n`),
        new TextRun(`• Justificación: ${lesson.stage7.remedialItem.justification}`)
      ],
      spacing: { after: 240 }
    }),

    // ETAPA 8
    new Paragraph({
      text: 'Etapa 8 — Cierre (Metacognición y Transferencia)',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Pregunta Metacognitiva: ', bold: true }),
        new TextRun(`"${lesson.stage8.metacognitivePrompt}"\n\n`),
        new TextRun({ text: 'Mensaje de Felicitación: ', bold: true }),
        new TextRun(`"${lesson.stage8.congratulation}"\n\n`),
        new TextRun({ text: 'Transferencia a la Siguiente Clase: ', bold: true }),
        new TextRun(`${lesson.stage8.transferNext}\n\n`),
        new TextRun({ text: 'Guía del Adulto Mentor:\n', bold: true }),
        new TextRun(`• DILE: "${lesson.stage8.mentor.dile}"\n`),
        new TextRun(`• ESPERA: ${lesson.stage8.mentor.espera}\n`),
        new TextRun(`• SI RESPONDE BIEN: "${lesson.stage8.mentor.siBien}"\n`),
        new TextRun(`• SI NECESITA APOYO: ${lesson.stage8.mentor.siApoyo}`)
      ],
      spacing: { after: 240 }
    })
  ];

  return new Document({
    sections: [
      {
        properties: {},
        children
      }
    ]
  });
}

export async function main(): Promise<void> {
  console.log('================================================================');
  console.log('GENERACIÓN COMPLETA DE LAS 5 LECCIONES OFICIALES DE 7.° BÁSICO');
  console.log('Sistema Global de Lecciones v2.0 — EstudioSimple');
  console.log('================================================================\n');

  for (const lesson of ALL_LESSONS) {
    console.log(`\n▶ Procesando Asignatura: ${lesson.subject} (${lesson.oaCode})...`);

    // 1. Generar Markdown
    const markdownContent = generateMarkdown(lesson);

    // Carpetas canónicas de salida
    const lessonCanonicalDir = path.resolve(
      __dirname,
      '..',
      'SALIDA_SISTEMA_LECCIONES_V2',
      lesson.subjectCode === 'CIE' ? '05_PILOTO' : 'LECCIONES_OFICIALES_7B',
      lesson.folderCode,
      `Clase_0${lesson.lessonNumber}`
    );
    if (!fs.existsSync(lessonCanonicalDir)) {
      fs.mkdirSync(lessonCanonicalDir, { recursive: true });
    }

    const mdCanonicalPath = path.join(lessonCanonicalDir, `Guion_Pedagogico_Clase0${lesson.lessonNumber}.md`);
    fs.writeFileSync(mdCanonicalPath, markdownContent, 'utf-8');
    console.log(`  ✓ Markdown canónico guardado en: ${mdCanonicalPath}`);

    // Copia Markdown en raíz
    const subjectCleanName = lesson.subject.replace(/,/g, '').replace(/ /g, '_');
    const mdRootPath = path.resolve(__dirname, '..', `GUION_PEDAGOGICO_CLASE01_${subjectCleanName}_7B_OA01_PARA_WORK.md`);
    fs.writeFileSync(mdRootPath, markdownContent, 'utf-8');
    console.log(`  ✓ Markdown en raíz: ${mdRootPath}`);

    // Si es ciencias, sobreescribir también el piloto original en raíz
    if (lesson.subjectCode === 'CIE') {
      const cieRootOldPath = path.resolve(__dirname, '..', 'GUION_PEDAGOGICO_CLASE01_CIENCIAS_7B_OA01_PARA_WORK.md');
      fs.writeFileSync(cieRootOldPath, markdownContent, 'utf-8');
    }

    // 2. Generar DOCX
    const docxDoc = generateDocxDocument(lesson);
    const docxBuffer = await Packer.toBuffer(docxDoc);

    const docxCanonicalPath = path.join(
      lessonCanonicalDir,
      `Plan_Maestro_Clase0${lesson.lessonNumber}_7B_${lesson.subjectCode}_${lesson.oaCode}_2026-10-09_19-45.docx`
    );
    fs.writeFileSync(docxCanonicalPath, docxBuffer);
    console.log(`  ✓ DOCX canónico guardado en: ${docxCanonicalPath}`);

    const docxRootPath = path.resolve(
      __dirname,
      '..',
      `PLAN_MAESTRO_CLASE01_${subjectCleanName}_7B_OA01_PARA_WORK.docx`
    );
    fs.writeFileSync(docxRootPath, docxBuffer);
    console.log(`  ✓ DOCX en raíz: ${docxRootPath}`);

    // Si es ciencias, actualizar también el archivo del piloto original
    if (lesson.subjectCode === 'CIE') {
      const cieDocxOldPath = path.resolve(
        __dirname,
        '..',
        'SALIDA_SISTEMA_LECCIONES_V2',
        'EJECUCION_2026-10-09_1735',
        '05_PILOTO',
        '110-7-CIE-OA01',
        'Clase_01',
        'Plan_Maestro_Clase01_7B_CIE_OA01_2026-10-09_17-45.docx'
      );
      if (fs.existsSync(path.dirname(cieDocxOldPath))) {
        fs.writeFileSync(cieDocxOldPath, docxBuffer);
      }
      const cieDocxRootOld = path.resolve(__dirname, '..', 'PLAN_MAESTRO_CLASE01_CIENCIAS_7B_OA01_PARA_WORK.docx');
      fs.writeFileSync(cieDocxRootOld, docxBuffer);
    }
  }

  console.log('\n================================================================');
  console.log('✅ TODAS LAS 5 LECCIONES GENERADAS CON ÉXITO EN MARKDOWN Y DOCX');
  console.log('================================================================\n');
}

if (require.main === module) {
  main().catch(err => {
    console.error('Error generando lecciones:', err);
    process.exit(1);
  });
}
