/**
 * fixture_valido.ts — Fixture con la estructura real completa de una lección 100% conforme.
 */

import { CompleteLesson } from '../types';

export const FIXTURE_VALIDO: CompleteLesson = {
  id: '110-7-CIE-OA01-C01',
  grade: '7B',
  subject: 'Ciencias_Naturales',
  oaCode: 'OA01',
  classNumber: 1,
  subobjective: 'Identificar las cuatro dimensiones de la sexualidad humana y reconocer que el inicio de la pubertad está regulado por el eje hormonal hipotálamo-hipófisis-gónadas.',
  officialSource: {
    document: 'Texto del Estudiante Ciencias Naturales 7° Básico - Edición SM',
    pages: '114 a 125',
    officialPublisher: 'Ediciones SM Chile / MINEDUC'
  },
  governanceStatus: 'EN_REVISION',
  stages: {
    antesDeComenzar: {
      materials: ['Cuaderno de Ciencias Naturales', 'Lápiz grafito', 'Goma de borrar'],
      estimatedTime: '30 minutos',
      mentorTip: 'Asegura un ambiente cómodo y de confianza, recordando que los cambios puberales son universales y naturales en la especie humana.'
    },
    etapa1_inicio: {
      welcome: '¡Hola! Bienvenidos a nuestra primera clase de Ciencias Naturales sobre el desarrollo humano.',
      sequencePosition: 'Clase 1 de 6',
      subobjective: 'Hoy aprenderemos qué es la pubertad, cómo se activa en nuestro cuerpo y cuáles son las cuatro dimensiones de la sexualidad humana.',
      priorKnowledgeConnection: 'En años anteriores aprendiste sobre los seres vivos y sus ciclos de vida. Hoy veremos la etapa de transición hacia la adultez.',
      roadmap: ['Pregunta inicial y video motivacional', 'Conversación guiada en el Recorrido', 'Explicación del eje hormonal', 'Práctica en cuaderno', 'Resumen y Miniquiz'],
      adultGuide: {
        dile: 'Hoy comenzaremos un tema muy importante sobre cómo crece nuestro cuerpo y cómo nos desarrollamos como personas.',
        espera: 'Observa que el estudiante tenga su cuaderno abierto y buena disposición.',
        siRespondeBien: '¡Excelente actitud! Vamos a aprender juntos.',
        siNecesitaApoyo: 'Recuérdale que es un tema biológico universal que todos los seres humanos experimentamos.'
      }
    },
    etapa2_videoMotivacional: {
      slides: [
        {
          number: 1,
          title: 'El Gran Cambio',
          visibleText: ['El Gran Cambio', 'Sofía y Tomás observan el crecimiento'],
          visualDescription: 'Sofía y Tomás en la sala de clases mirando una foto de cuando eran más pequeños. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: '¿Alguna vez has notado cómo cambian las personas a medida que crecen?'
        },
        {
          number: 2,
          title: '¿Solo la Estatura?',
          visibleText: ['¿Solo la estatura?', 'Voces, emociones y cuerpo'],
          visualDescription: 'Tomás se da cuenta de que su voz cambia y Sofía nota cambios en sus emociones. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Crecer no es solo hacerse más alto. También cambian nuestra voz, nuestros gustos y cómo nos sentimos.'
        },
        {
          number: 3,
          title: 'Una Nueva Etapa',
          visibleText: ['La Pubertad', 'Transición natural'],
          visualDescription: 'Sofía y Tomás conversan con su profesora en la biblioteca escolar. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Esta etapa de transición entre la niñez y la adultez se llama pubertad.'
        },
        {
          number: 4,
          title: '¿Qué Activa el Reloj?',
          visibleText: ['El reloj interno', '¿Quién da la orden?'],
          visualDescription: 'Gráfico visual de una alarma biológica suave en el cerebro. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: '¿Te has preguntado alguna vez qué señal enciende estos cambios en nuestro cuerpo?'
        },
        {
          number: 5,
          title: 'Mucho Más que Biología',
          visibleText: ['Ser persona', 'Pensamientos y afectos'],
          visualDescription: 'Sofía ayudando a un compañero y compartiendo con su familia. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Además de nuestro cuerpo, cambian nuestras relaciones con amigos y familiares.'
        },
        {
          number: 6,
          title: 'El Desafío de Hoy',
          visibleText: ['Nuestra Misión', 'Descubrir las 4 dimensiones'],
          visualDescription: 'Sofía y Tomás con una libreta científica listos para investigar. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Hoy investigaremos qué dimensiones componen la sexualidad humana y cómo opera el eje hormonal.'
        },
        {
          number: 7,
          title: 'Listos para Indagar',
          visibleText: ['¡Vamos a explorar!', 'Acompáñanos'],
          visualDescription: 'Logo blanco en la esquina inferior derecha. Ambos personajes sonríen al estudiante. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Acompáñanos a descubrir la ciencia detrás del crecimiento humano.'
        }
      ],
      adultPreInstruction: 'Dile al estudiante que preste atención a los distintos tipos de cambios que mencionan Sofía y Tomás.',
      adultPostCheck: 'Pregúntale: ¿Qué cambios notaron los personajes además de crecer en estatura?'
    },
    etapa3_recorrido: {
      inquiryQuestions: [
        {
          question: '¿Qué tipo de cambios mencionaron los personajes en el video?',
          expectedAnswer: 'Mencionaron cambios en el cuerpo (como la voz o estatura) y también cambios en las emociones y relaciones.',
          hint: 'Piensa en lo que le pasaba a la voz de Tomás o en cómo se sentía Sofía.',
          feedbackSuccess: '¡Muy bien observado! Notaste que hay cambios físicos y también emocionales.',
          feedbackHelp: 'Recuerda que Tomás notó que su voz cambiaba y Sofía habló de sus emociones.'
        }
      ],
      adultGuide: {
        dile: 'Cuéntame, según el video, ¿crecer es solo un cambio físico del cuerpo?',
        espera: 'Espera a que el estudiante elabore su respuesta con sus propias palabras.',
        siRespondeBien: '¡Exacto! Hay emociones y relaciones con otras personas.',
        siNecesitaApoyo: 'Guíalo recordándole el ejemplo de Sofía compartiendo con sus amigos.'
      }
    },
    etapa4_videoExplicativo: {
      slides: [
        {
          number: 1,
          title: 'La Sexualidad Humana',
          visibleText: ['Dimensiones Integrales', 'Mucho más que biología'],
          visualDescription: 'Diagrama con cuatro cuadrantes armónicos que representan las dimensiones. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'La sexualidad humana es una dimensión integral que abarca cuatro aspectos fundamentales.'
        },
        {
          number: 2,
          title: 'Las Cuatro Dimensiones',
          visibleText: ['Biológica, Afectiva,', 'Psicológica y Social'],
          visualDescription: 'Esquema de las 4 dimensiones interconectadas con iconos vectoriales limpios. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Estas cuatro dimensiones son: la biológica, la afectiva, la psicológica y la sociocultural.'
        },
        {
          number: 3,
          title: 'Dimensión Biológica',
          visibleText: ['Anatomía y Hormonas', 'Características sexuales'],
          visualDescription: 'Esquema anatómico general del cuerpo humano señalando el cerebro y glándulas. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'La dimensión biológica se refiere a la anatomía, fisiología y a los caracteres sexuales.'
        },
        {
          number: 4,
          title: 'El Eje Hormonal',
          visibleText: ['Hipotálamo e Hipófisis', 'Las gónadas responden'],
          visualDescription: 'Diagrama vectorial del eje hipotálamo-hipófisis con flechas de señalización hormonal. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'El hipotálamo envía señales a la hipófisis, y esta libera hormonas que activan las gónadas.'
        },
        {
          number: 5,
          title: 'Afecto y Sociedad',
          visibleText: ['Vínculos y Respeto', 'Empatía y convivencia'],
          visualDescription: 'Jóvenes dialogando respetuosamente en un entorno comunitario. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Las dimensiones psicológica, afectiva y social orientan cómo sentimos, nos valoramos y convivimos.'
        },
        {
          number: 6,
          title: 'Caso Modelo',
          visibleText: ['Identificar Dimensiones', 'Caso de estudio'],
          visualDescription: 'Sofía analiza una situación donde Martín siente vergüenza al hablar pero cuida a su hermano. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Veamos un caso: Cuando Martín experimenta cambios en su voz y aprende a expresar lo que siente con su familia, se combinan las dimensiones biológica, afectiva y social.'
        },
        {
          number: 7,
          title: 'Regla de Oro',
          visibleText: ['Regla de Oro', 'Integral y Universal'],
          visualDescription: 'Tarjeta de resumen limpia con la Regla de Oro científica. No text drawn by AI.',
          hasAntiTextClause: true,
          oralScript: 'Regla de Oro: La sexualidad humana es integral; conjuga biología, afecto, psicología y cultura en cada etapa del desarrollo.'
        }
      ],
      case1Model: {
        context: 'Situación cotidiana de Martín en la pubertad.',
        problem: 'Identificar qué dimensiones se manifiestan en la situación descrita.',
        stepByStepResolution: [
          'Paso 1: Identificar el cambio físico observable (voz más grave -> dimensión biológica).',
          'Paso 2: Reconocer la emoción sentida (inseguridad inicial -> dimensión psicológica/afectiva).',
          'Paso 3: Identificar la interacción familiar de apoyo (comunicación y respeto -> dimensión sociocultural y afectiva).'
        ],
        conclusion: 'El desarrollo durante la pubertad articula simultáneamente múltiples dimensiones del ser humano.'
      },
      goldenRule: 'La sexualidad humana es una dimensión integral que conjuga lo biológico, afectivo, psicológico y sociocultural.'
    },
    etapa5_practica: {
      exercises: [
        {
          id: 'P1',
          prompt: 'En tu cuaderno de Ciencias, dibuja un organizador con cuatro cuadrantes y escribe una característica de cada dimensión de la sexualidad humana.',
          adultInstruction: 'Pídele al estudiante que abra su cuaderno y divida una página en cuatro partes rotulando: Biológica, Psicológica, Afectiva y Sociocultural.',
          expectedPerformance: 'El estudiante registra un ejemplo claro y pertinente para cada una de las 4 dimensiones en su cuaderno.',
          stepsToSolve: [
            '1. Trazar dos líneas perpendiculares en el cuaderno.',
            '2. Escribir el nombre de las 4 dimensiones.',
            '3. Anotar un ejemplo para cada una según lo aprendido en el video.'
          ],
          hints: ['Recuerda: Biológica son órganos y hormonas; Afectiva son sentimientos y cariño.'],
          notebookRequired: true,
          alignedSubobjective: 'Identificar las cuatro dimensiones de la sexualidad humana.'
        }
      ],
      adultGuide: {
        dile: 'Vamos a dibujar en tu cuaderno las cuatro dimensiones. Yo te acompaño.',
        espera: 'Dale entre 5 y 8 minutos para dibujar el cuadro y escribir los ejemplos.',
        siRespondeBien: '¡Excelente esquema en tu cuaderno! Muy ordenado y claro.',
        siNecesitaApoyo: 'Ayúdalo repasando juntos las 4 palabras clave del video explicativo.'
      }
    },
    etapa6_resumen: {
      keyIdeas: [
        'La pubertad es una etapa universal del desarrollo humano regulada biológicamente por el eje hormonal.',
        'La sexualidad humana no es solo biología: se compone de cuatro dimensiones (biológica, afectiva, psicológica y sociocultural).',
        'El respeto, el autocuidado y la empatía son fundamentales en todas las dimensiones.'
      ],
      summaryCardNotebook: 'Ficha de síntesis: Sexualidad = Biología + Afecto + Psicología + Sociedad.',
      adultGuide: {
        dile: 'Revisemos juntos las tres ideas principales que aprendimos hoy.',
        espera: 'Pídele que lea las tres ideas en voz alta.',
        siRespondeBien: '¡Muy bien leído y comprendido!',
        siNecesitaApoyo: 'Léanlas por turnos, una tú y una el estudiante.'
      }
    },
    etapa7_miniquiz: {
      questions: [
        {
          id: 'Q1',
          question: '¿Cuál de las siguientes opciones corresponde a un componente de la dimensión biológica de la sexualidad humana?',
          options: {
            A: 'La capacidad de empatizar con los sentimientos de un amigo.',
            B: 'La acción de las hormonas secretadas por las gónadas.',
            C: 'Las costumbres y tradiciones de una comunidad escolar.',
            D: 'La formación de valores y creencias personales.'
          },
          correctOption: 'B',
          explanationCorrect: 'La dimensión biológica abarca las estructuras corporales, los caracteres sexuales y los procesos hormonales.',
          distractorExplanations: {
            A: 'La empatía corresponde a la dimensión afectiva y psicológica.',
            B: 'Correcta: Proceso fisiológico y hormonal directo.',
            C: 'Las tradiciones corresponden a la dimensión sociocultural.',
            D: 'Los valores corresponden a la dimensión psicológica y moral.'
          }
        },
        {
          id: 'Q2',
          question: '¿Qué estructura cerebral inicia la cascada hormonal que estimula la producción de hormonas sexuales en la pubertad?',
          options: {
            A: 'El hipotálamo.',
            B: 'El cerebelo.',
            C: 'La corteza motora.',
            D: 'El bulbo raquídeo.'
          },
          correctOption: 'A',
          explanationCorrect: 'El hipotálamo libera neurohormonas que activan a la hipófisis para iniciar el eje hormonal puberal.',
          distractorExplanations: {
            A: 'Correcta: Es el centro regulador neuroendocrino.',
            B: 'El cerebelo coordina el movimiento y el equilibrio.',
            C: 'La corteza motora controla los movimientos voluntarios.',
            D: 'El bulbo raquídeo controla funciones autónomas como el ritmo cardíaco.'
          }
        },
        {
          id: 'Q3',
          question: 'Cuando una persona expresa cariño y contención emocional a un familiar que atraviesa un momento difícil, ¿qué dimensión predomina principalmente?',
          options: {
            A: 'Dimensión biológica.',
            B: 'Dimensión afectiva.',
            C: 'Dimensión anatómica.',
            D: 'Dimensión genética.'
          },
          correctOption: 'B',
          explanationCorrect: 'La dimensión afectiva se relaciona con la capacidad de sentir, expresar afecto y establecer vínculos de apego y cuidado.',
          distractorExplanations: {
            A: 'La dimensión biológica refiere a aspectos anatómicos y fisiológicos.',
            B: 'Correcta: Expresión de emociones, cariño y vínculos interpersonales.',
            C: 'La anatomía describe estructuras físicas.',
            D: 'La genética refiere a la herencia biológica.'
          }
        }
      ],
      remediationLoop: {
        thresholdPassing: 2,
        conceptReinforcement: 'Recuerda: La sexualidad humana integra cuatro dimensiones. La biológica incluye el cuerpo y las hormonas; la afectiva incluye los sentimientos y el cariño.',
        remedialPracticeItem: {
          question: 'Si una persona reflexiona sobre su propia identidad y toma decisiones conscientes sobre su futuro, ¿a qué dimensión corresponde?',
          options: {
            A: 'Biológica.',
            B: 'Psicológica.',
            C: 'Circulatoria.',
            D: 'Respiratoria.'
          },
          correctOption: 'B',
          explanation: 'La introspección, autoconcepto y toma de decisiones pertenecen a la dimensión psicológica.'
        }
      }
    },
    etapa8_cierre: {
      metacognitionQuestion: '¿Cuál de las cuatro dimensiones de la sexualidad te pareció más interesante de aprender hoy y por qué?',
      congratulationsMessage: '¡Felicitaciones! Has completado con éxito la primera clase sobre desarrollo humano y pubertad.',
      transferNextLesson: 'En la siguiente clase profundizaremos en el funcionamiento detallado del eje hipotálamo-hipófisis y los caracteres sexuales.',
      adultGuide: {
        dile: '¡Gran trabajo hoy! Cuéntame qué fue lo más novedoso que aprendiste sobre las cuatro dimensiones.',
        espera: 'Escucha su reflexión con calidez y felicítalo por su esfuerzo.',
        siRespondeBien: '¡Excelente reflexión! Guardemos el cuaderno para la próxima sesión.',
        siNecesitaApoyo: 'Recuérdale cómo el cuerpo y las emociones van de la mano al crecer.'
      }
    }
  }
};
