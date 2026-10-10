/**
 * clase01_ciencias_7b_oa01.ts — Lección Piloto Completa: Ciencias Naturales 7° Básico OA01 Clase 1
 * 
 * Implementada bajo el Sistema Global de Lecciones EstudioSimple v2.0
 * 8 Etapas Oficiales | 14 Diapositivas Audiovisuales (7+7) | Guía Dual Mentor-Estudiante
 */

import { CompleteLesson } from '../validator/types';

export const CLASE_01_CIENCIAS_7B_OA01: CompleteLesson = {
  id: '110-7-CIE-OA01-C01',
  grade: '7B',
  subject: 'Ciencias_Naturales',
  oaCode: 'OA01',
  classNumber: 1,
  subobjective: 'Identificar las cuatro dimensiones de la sexualidad humana y reconocer que el inicio de la pubertad está regulado por el eje hormonal hipotálamo-hipófisis-gónadas.',
  officialSource: {
    document: 'Texto del Estudiante Ciencias Naturales 7° Básico - Edición SM Chile',
    pages: '114 a 125',
    officialPublisher: 'Ediciones SM Chile / MINEDUC'
  },
  governanceStatus: 'EN_REVISION',
  stages: {
    antesDeComenzar: {
      materials: [
        'Cuaderno de Ciencias Naturales',
        'Lápiz mina o grafito',
        'Goma de borrar y regla de 20 cm'
      ],
      estimatedTime: '30 a 35 minutos',
      mentorTip: 'Crea un ambiente de confianza y escucha activa en el hogar. Explica que la pubertad es una etapa de crecimiento universal por la que pasan todas las personas.'
    },
    etapa1_inicio: {
      welcome: '¡Hola! Te damos la bienvenida a tu clase de Ciencias Naturales en EstudioSimple.',
      sequencePosition: 'Clase 1 de 6 (Secuencia OA01)',
      subobjective: 'Hoy descubriremos qué es la pubertad, cómo se activa el eje hormonal en nuestro cuerpo y cuáles son las cuatro dimensiones que componen la sexualidad humana.',
      priorKnowledgeConnection: 'En 6° básico aprendiste que los seres vivos crecen y se reproducen. Hoy exploraremos cómo el cuerpo humano inicia su paso hacia la etapa adulta.',
      roadmap: [
        '1. Video Motivacional: El Gran Cambio de Sofía y Tomás',
        '2. Recorrido: Conversación guiada sobre lo observado',
        '3. Video Explicativo: Las 4 dimensiones y el eje neuroendocrino',
        '4. Práctica: Construcción de organizador en el cuaderno físico',
        '5. Resumen, Miniquiz formativo y Cierre'
      ],
      adultGuide: {
        dile: 'Hoy comenzaremos una nueva unidad de Ciencias muy interesante sobre el desarrollo humano. Vamos a ver cómo cambia nuestro cuerpo y nuestras emociones.',
        espera: 'Espera a que el estudiante abra su cuaderno y anote la fecha y el título: "Dimensiones de la sexualidad y la pubertad".',
        siRespondeBien: '¡Excelente! Estás listo con tus materiales.',
        siNecesitaApoyo: 'Anímalo explicándole que aprenderemos conceptos científicos muy útiles para comprender nuestro propio crecimiento.'
      }
    },
    etapa2_videoMotivacional: {
      slides: [
        {
          number: 1,
          title: 'El Gran Cambio',
          subtitle: 'Creciendo paso a paso',
          visibleText: ['El Gran Cambio', 'Sofía y Tomás observan su historia'],
          visualDescription: 'Sofía con trenzas y Tomás con chaqueta cerceta (13 años) en su sala de clases mirando fotos de cuando tenían 8 años. Composición limpia 16:9 estilo Anime moderno. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: '¿Te has fijado en cómo cambiamos las personas a medida que pasan los años? Sofía y Tomás encontraron una fotografía de cuando entraron a primero básico.',
          sourceCitation: 'Texto SM 7° Básico, Unidad 4, pág. 114.'
        },
        {
          number: 2,
          title: 'Mucho Más que Estatura',
          subtitle: 'Transformaciones múltiples',
          visibleText: ['¿Solo la estatura?', 'Cuerpo, voz y emociones'],
          visualDescription: 'Tomás se mira al espejo notando que su voz suena distinta y Sofía reflexiona en su escritorio sobre sus emociones. Espacio negativo superior. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Casi siempre pensamos que crecer es solo hacernos más altos. Pero Tomás notó que su tono de voz se vuelve más grave y Sofía siente que sus emociones son más intensas.',
          sourceCitation: 'Texto SM 7° Básico, Unidad 4, pág. 115.'
        },
        {
          number: 3,
          title: 'La Pubertad',
          subtitle: 'Etapa de transición',
          visibleText: ['La Pubertad', 'De la niñez a la adultez'],
          visualDescription: 'Infografía contextual animada mostrando una línea de vida desde la infancia hasta la juventud con ambos personajes caminando. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Este periodo de transición biológica y social entre la infancia y la edad adulta se llama pubertad, y forma parte natural del desarrollo humano.',
          sourceCitation: 'Texto SM 7° Básico, Unidad 4, pág. 116.'
        },
        {
          number: 4,
          title: 'El Reloj Interno',
          subtitle: 'Señales invisibles',
          visibleText: ['El Reloj Interno', '¿Quién enciende los cambios?'],
          visualDescription: 'Representación estilizada y respetuosa del sistema nervioso central con un suave resplandor en la base del cerebro. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Pero, ¿cómo sabe nuestro cuerpo cuándo debe comenzar este cambio? ¿Hay un reloj invisible dentro de nosotros que da la señal de partida?',
          sourceCitation: 'Texto SM 7° Básico, Unidad 4, pág. 118.'
        },
        {
          number: 5,
          title: 'Dimensiones Humanas',
          subtitle: 'Más allá de lo físico',
          visibleText: ['Ser Persona', 'Afecto, mente y sociedad'],
          visualDescription: 'Sofía conversando con su familia en la mesa del hogar y Tomás compartiendo un proyecto escolar con amigos. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Crecer no ocurre en soledad. Cambia la forma en que nos valoramos a nosotros mismos, cómo expresamos cariño y cómo nos relacionamos con los demás.',
          sourceCitation: 'Texto SM 7° Básico, Unidad 4, pág. 120.'
        },
        {
          number: 6,
          title: 'El Desafío Científico',
          subtitle: 'Nuestra misión de hoy',
          visibleText: ['Misión de Hoy', 'Descubrir las cuatro dimensiones'],
          visualDescription: 'Sofía y Tomás en el laboratorio escolar con un cuaderno de notas y una lupa científica mirando con entusiasmo. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Hoy tenemos una misión científica: descubriremos qué dimensiones componen la sexualidad humana y qué glándula enciende el motor hormonal.',
          sourceCitation: 'Texto SM 7° Básico, Unidad 4, pág. 121.'
        },
        {
          number: 7,
          title: '¡A Explorar!',
          subtitle: 'Comienza la aventura',
          visibleText: ['¡A Explorar!', 'Acompáñanos a descubrir la ciencia'],
          visualDescription: 'Plano general de ambos jóvenes sonriendo e invitando al estudiante. Logo oficial blanco en esquina inferior derecha. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: '¡Acompáñanos! Abre tu mente curiosa y descubramos juntos la ciencia de nuestro propio desarrollo.',
          sourceCitation: 'Texto SM 7° Básico, Unidad 4, pág. 122.'
        }
      ],
      adultPreInstruction: 'Dile al estudiante: "Mira el video con atención y fíjate en qué cosas cambian además del tamaño del cuerpo".',
      adultPostCheck: 'Pregúntale: "¿Qué cambios mencionaron Tomás y Sofía que no eran solo físicos?"'
    },
    etapa3_recorrido: {
      inquiryQuestions: [
        {
          question: 'En el video, Tomás notó cambios en su voz y Sofía en sus emociones. ¿Por qué crees que cambiar no es solo hacerse más alto?',
          expectedAnswer: 'Porque al crecer también madura nuestra forma de pensar, sentir, expresar emociones y convivir con las demás personas.',
          hint: 'Piensa en cómo te sentías cuando eras más pequeño respecto a tus amigos o a las cosas que te gustaban.',
          feedbackSuccess: '¡Exacto! El desarrollo humano incluye el cuerpo, la mente, los afectos y la vida en comunidad.',
          feedbackHelp: 'Recuerda que Sofía habló de cómo se siente con su familia y amigos. Esos son cambios emocionales y sociales.'
        },
        {
          question: '¿Qué crees tú que activa estos cambios dentro del cuerpo humano?',
          expectedAnswer: 'Un sistema interno de hormonas o señales biológicas que vienen del cerebro.',
          hint: 'Tiene que ver con sustancias químicas mensajeras llamadas hormonas.',
          feedbackSuccess: '¡Muy bien anticipado! El cerebro produce señales químicas que activan el crecimiento.',
          feedbackHelp: 'En el video explicativo veremos que el cerebro y unas glándulas especiales producen hormonas mensajeras.'
        }
      ],
      adultGuide: {
        dile: 'Vamos a reflexionar sobre lo que acabas de ver. Responde a estas preguntas con tus propias palabras.',
        espera: 'Escucha atentamente sin apurar su respuesta. Permítele pensar unos 15 a 20 segundos.',
        siRespondeBien: '¡Qué buena observación! Se nota que estuviste atento a los detalles.',
        siNecesitaApoyo: 'Usa la pista que aparece en pantalla para guiarlo paso a paso.'
      }
    },
    etapa4_videoExplicativo: {
      slides: [
        {
          number: 1,
          title: 'La Sexualidad Integral',
          subtitle: 'Un concepto multidimensional',
          visibleText: ['Sexualidad Humana', 'Una dimensión integral del ser'],
          visualDescription: 'Diagrama armónico con cuatro cuadrantes de colores suaves que representan las dimensiones biológica, afectiva, psicológica y sociocultural. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'En ciencias, la sexualidad humana no es solo un hecho biológico o reproductivo. Es una dimensión integral que nos acompaña durante toda la vida.',
          sourceCitation: 'Texto SM 7° Básico, Unidad 4, pág. 116.'
        },
        {
          number: 2,
          title: 'Cuatro Dimensiones',
          subtitle: 'La persona completa',
          visibleText: ['Cuatro Dimensiones', 'Biológica, Afectiva, Psicológica y Social'],
          visualDescription: 'Iconografía vectorial limpia: ADN/célula (Biológica), corazón cálido (Afectiva), silueta con engranajes de pensamiento (Psicológica), grupo de personas (Sociocultural). No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Se compone de cuatro dimensiones entrelazadas: la dimensión biológica, la afectiva, la psicológica y la sociocultural.',
          sourceCitation: 'Texto SM 7° Básico, Unidad 4, págs. 116-117.'
        },
        {
          number: 3,
          title: 'Dimensión Biológica',
          subtitle: 'Anatomía y fisiología',
          visibleText: ['Dimensión Biológica', 'Cuerpo, cromosomas y hormonas'],
          visualDescription: 'Esquema anatómico pedagógico limpio destacando los caracteres sexuales y el sistema endocrino. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'La dimensión biológica comprende la anatomía corporal, los órganos reproductores, los cromosomas y las hormonas que dirigen los cambios físicos.',
          sourceCitation: 'Texto SM 7° Básico, Unidad 4, pág. 117.'
        },
        {
          number: 4,
          title: 'El Eje Hormonal',
          subtitle: 'El motor de la pubertad',
          visibleText: ['Eje Neuroendocrino', 'Hipotálamo -> Hipófisis -> Gónadas'],
          visualDescription: 'Diagrama vectorial técnico del cerebro: hipotálamo libera GnRH hacia la hipófisis anterior, que libera LH y FSH hacia las gónadas. Flechas nítidas. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'El inicio de la pubertad está comandado por el eje hipotálamo-hipófisis-gónadas. El hipotálamo emite neurohormonas que activan la hipófisis, y esta estimula a las gónadas para producir hormonas sexuales.',
          sourceCitation: 'Texto SM 7° Básico, Unidad 4, pág. 118.'
        },
        {
          number: 5,
          title: 'Mente, Afecto y Cultura',
          subtitle: 'Las otras tres dimensiones',
          visibleText: ['Psicológica, Afectiva y Social', 'Sentimientos, identidad y convivencia'],
          visualDescription: 'Ilustración de jóvenes colaborando en proyectos, expresando afecto familiar y tomando decisiones responsables. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'La dimensión psicológica abarca el autoconcepto e identidad; la afectiva incluye los sentimientos, vínculos y cariño; y la sociocultural abarca las normas de respeto y convivencia.',
          sourceCitation: 'Texto SM 7° Básico, Unidad 4, págs. 119-120.'
        },
        {
          number: 6,
          title: 'Caso Modelo',
          subtitle: 'Análisis de una situación real',
          visibleText: ['Caso de Martín', 'Identificación de dimensiones'],
          visualDescription: 'Sofía y Tomás analizan en una pizarra una situación cotidiana: Martín experimenta cambios en su voz, reflexiona sobre su identidad y dialoga con sus padres con respeto. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Veamos nuestro caso modelo: Cuando Martín nota que su voz cambia (dimensión biológica), reflexiona sobre cómo se percibe a sí mismo (dimensión psicológica) y conversa con cariño y respeto con su familia (dimensiones afectiva y social).',
          sourceCitation: 'Texto SM 7° Básico, Unidad 4, pág. 121.'
        },
        {
          number: 7,
          title: 'Regla de Oro',
          subtitle: 'Principio científico clave',
          visibleText: ['Regla de Oro', 'La sexualidad es integral y universal'],
          visualDescription: 'Cuadro resumen nítido con tipografía formal destacando la Regla de Oro. Logo blanco inferior derecho. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Nuestra Regla de Oro: La sexualidad humana es integral; conjuga biología, afecto, mente y sociedad en cada etapa del desarrollo.',
          sourceCitation: 'Texto SM 7° Básico, Unidad 4, pág. 122.'
        }
      ],
      case1Model: {
        context: 'Situación cotidiana de Martín al iniciar la pubertad a los 13 años.',
        problem: 'Identificar cómo se articulan las dimensiones en la experiencia de Martín.',
        stepByStepResolution: [
          'Paso 1 (Biológica): El cambio de voz y crecimiento corporal provienen de la activación del eje hipotálamo-hipófisis.',
          'Paso 2 (Psicológica): El reconocimiento de su propia identidad y autoconcepto al verse crecer.',
          'Paso 3 (Afectiva): La expresión de afecto, confianza y búsqueda de contención emocional.',
          'Paso 4 (Sociocultural): La convivencia respetuosa con sus pares y el cumplimiento de normas de cuidado mutuo.'
        ],
        conclusion: 'Cualquier vivencia durante la pubertad integra las cuatro dimensiones de forma simultánea.'
      },
      goldenRule: 'La sexualidad humana es una dimensión integral que conjuga lo biológico, lo afectivo, lo psicológico y lo sociocultural en el desarrollo de la persona.'
    },
    etapa5_practica: {
      exercises: [
        {
          id: 'P1-CIE7-OA01',
          prompt: 'Abre tu cuaderno de Ciencias Naturales. Traza dos líneas perpendiculares para formar una cruz que divida la página en 4 cuadrantes. Rotula cada cuadrante con una dimensión: 1) Biológica, 2) Afectiva, 3) Psicológica, 4) Sociocultural. Escribe en cada cuadrante una característica o ejemplo concreto aprendido en la clase.',
          adultInstruction: 'Supervisa que el estudiante dibuje el organizador de 4 cuadrantes usando regla y que anote al menos una característica o ejemplo claro en cada cuadrante.',
          expectedPerformance: 'El estudiante organiza en su cuaderno las 4 dimensiones: Biológica (hormonas, cuerpo, caracteres sexuales); Afectiva (sentimientos, cariño, vínculos); Psicológica (autoconcepto, identidad, toma de decisiones); Sociocultural (convivencia, normas de respeto, cultura).',
          stepsToSolve: [
            '1. Dividir la hoja de cuaderno en cuatro partes iguales con regla.',
            '2. Colocar los cuatro títulos en mayúscula.',
            '3. Redactar una frase breve descriptiva en cada cuadrante.',
            '4. Revisar junto al adulto mentor que las cuatro ideas sean correctas.'
          ],
          hints: [
            'Pista 1: Si tienes dudas con la biológica, recuerda qué glándulas y sustancias químicas actúan.',
            'Pista 2: Para la psicológica, piensa en lo que ocurre dentro de los pensamientos y la propia identidad.'
          ],
          notebookRequired: true,
          alignedSubobjective: 'Identificar las cuatro dimensiones de la sexualidad humana.'
        }
      ],
      adultGuide: {
        dile: 'Ahora vamos a trabajar en tu cuaderno físico. Dibuja los cuatro cuadrantes y escribe una idea en cada uno. Tómate tu tiempo.',
        espera: 'Observa su trabajo en silencio durante unos 5 minutos. Asegúrate de que use regla y letra clara.',
        siRespondeBien: '¡Qué gran organizador gráfico! Has capturado con mucha claridad las cuatro dimensiones.',
        siNecesitaApoyo: 'Repasa con él las diapositivas 2 y 5 del video explicativo para recordar ejemplos cotidianos.'
      }
    },
    etapa6_resumen: {
      keyIdeas: [
        'La sexualidad humana es una dimensión integral que abarca cuatro componentes: biológico, afectivo, psicológico y sociocultural.',
        'La pubertad es el periodo biológico de transición hacia la madurez reproductiva y está regulada por el eje neuroendocrino hipotálamo-hipófisis-gónadas.',
        'Los cambios durante la pubertad son universales y naturales en la especie humana, y requieren autocuidado, respeto y empatía.'
      ],
      summaryCardNotebook: 'Tarjeta de Síntesis: Pubertad = Eje hormonal activo. Sexualidad = Biología + Afecto + Psicología + Sociedad.',
      adultGuide: {
        dile: 'Leamos juntos las tres ideas de resumen para fijar lo que aprendimos hoy.',
        espera: 'Pídele al estudiante que lea cada idea y que te explique con sus palabras qué significa la palabra "integral".',
        siRespondeBien: '¡Excelente comprensión! Integral significa que reúne todas las partes de la persona.',
        siNecesitaApoyo: 'Explícale que "integral" es como un rompecabezas donde no puede faltar ninguna pieza.'
      }
    },
    etapa7_miniquiz: {
      questions: [
        {
          id: 'Q1-CIE7-OA01',
          question: '¿Cuál de los siguientes aspectos corresponde a una manifestación de la dimensión biológica de la sexualidad humana?',
          options: {
            A: 'La capacidad de ponerse en el lugar de un compañero triste.',
            B: 'La producción de hormonas sexuales estimuladas por la hipófisis.',
            C: 'Las tradiciones culturales sobre la vestimenta en una fiesta patria.',
            D: 'La reflexión interna sobre las metas personales a largo plazo.'
          },
          correctOption: 'B',
          explanationCorrect: 'La producción de hormonas por el eje hipotálamo-hipófisis-gónadas es un proceso fisiológico y biológico directo.',
          distractorExplanations: {
            A: 'La empatía corresponde a las dimensiones afectiva y psicológica.',
            B: 'Correcta: Proceso endocrino y fisiológico del cuerpo.',
            C: 'Las tradiciones corresponden a la dimensión sociocultural.',
            D: 'La autorreflexión corresponde a la dimensión psicológica.'
          }
        },
        {
          id: 'Q2-CIE7-OA01',
          question: '¿Qué estructura del sistema nervioso central inicia la secuencia hormonal que activa la pubertad al estimular a la glándula hipófisis?',
          options: {
            A: 'El hipotálamo.',
            B: 'El cerebelo.',
            C: 'La médula espinal.',
            D: 'El lóbulo occipital.'
          },
          correctOption: 'A',
          explanationCorrect: 'El hipotálamo sintetiza y libera neurohormonas (GnRH) que viajan a la hipófisis anterior para activar la producción de gonadotropinas.',
          distractorExplanations: {
            A: 'Correcta: Centro neuroendocrino que comanda el inicio de la pubertad.',
            B: 'El cerebelo coordina la postura corporal y el equilibrio.',
            C: 'La médula espinal transmite impulsos nerviosos motores y sensoriales.',
            D: 'El lóbulo occipital procesa la información visual.'
          }
        },
        {
          id: 'Q3-CIE7-OA01',
          question: 'Dos amigos conversan con sinceridad, se brindan apoyo mutuo en un momento difícil y se tratan con respeto y afecto. ¿Qué dimensiones de la sexualidad humana se manifiestan principalmente en esta situación?',
          options: {
            A: 'Exclusivamente la dimensión biológica y genética.',
            B: 'Las dimensiones afectiva y sociocultural.',
            C: 'Únicamente la dimensión anatómica y hormonal.',
            D: 'Ninguna dimensión, ya que no intervienen médicos.'
          },
          correctOption: 'B',
          explanationCorrect: 'El apoyo emocional, el cariño y el respeto interpersonal articulan las dimensiones afectiva (sentimientos y vínculos) y sociocultural (convivencia y valores).',
          distractorExplanations: {
            A: 'No se describe un proceso fisiológico o genético directo.',
            B: 'Correcta: Integra vínculos emocionales y normas de convivencia respetuosa.',
            C: 'No se refiere a estructuras anatómicas o secreciones hormonales.',
            D: 'Falsa: La sexualidad humana se vive en la vida cotidiana de todas las personas sin requerir un contexto clínico.'
          }
        }
      ],
      remediationLoop: {
        thresholdPassing: 2,
        conceptReinforcement: 'Recuerda: La sexualidad humana está formada por cuatro dimensiones que se complementan. La dimensión biológica incluye tu cuerpo y las hormonas secretadas por el eje hipotálamo-hipófisis. La dimensión afectiva reúne tus sentimientos y el cariño que compartes.',
        remedialPracticeItem: {
          question: 'Si una persona reconoce sus propias fortalezas, reflexiona sobre quién es y toma decisiones sobre cómo actuar, ¿qué dimensión está ejerciendo?',
          options: {
            A: 'Dimensión biológica.',
            B: 'Dimensión psicológica.',
            C: 'Dimensión celular.',
            D: 'Dimensión respiratoria.'
          },
          correctOption: 'B',
          explanation: 'La autoconciencia, el autoconcepto y la toma de decisiones conscientes son características centrales de la dimensión psicológica.'
        }
      }
    },
    etapa8_cierre: {
      metacognitionQuestion: '¿Por qué crees que es importante saber que la sexualidad abarca el afecto y la sociedad, y no solo los cambios físicos del cuerpo?',
      congratulationsMessage: '¡Felicitaciones por completar con dedicación tu primera clase sobre el desarrollo humano!',
      transferNextLesson: 'En la Clase 2 investigaremos a fondo cómo las hormonas sexuales dan origen a los caracteres sexuales primarios y secundarios.',
      adultGuide: {
        dile: '¡Muy bien hecho! Cuéntame qué fue lo más valioso que aprendiste hoy sobre ti y sobre el crecimiento de las personas.',
        espera: 'Escucha su reflexión con una sonrisa y felicítalo por su concentración.',
        siRespondeBien: '¡Qué buena reflexión! Cerramos el cuaderno y quedamos listos para la siguiente clase.',
        siNecesitaApoyo: 'Recuérdale que crecer es un proceso hermoso que abarca el cuerpo y el corazón.'
      }
    }
  }
};
