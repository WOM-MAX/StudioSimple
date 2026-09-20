import { Lesson, LearningObjective, StudentProfile, ParentUser, Lesson7thGrade } from '../types';

export const INITIAL_STUDENT: StudentProfile = {
  id: 'stu-101',
  name: 'Mateo',
  grade: '7° Básico',
  avatar: '🦊',
  curiosityPoints: 340,
  gems: 12,
  completedLessons: ['les-his-701'],
  currentStreakDays: 3,
  pin: '123456',
};

export const INITIAL_PARENT: ParentUser = {
  id: 'par-202',
  name: 'Carolina M.',
  email: 'carolina@estudiosimple.cl',
  password: 'demo2026',
  studentId: 'stu-101',
  subscriptionActive: true,
  plan: 'mensual',
  enrolledGrades: ['7° Básico'],
};

export const MOCK_LESSON_7TH: Lesson7thGrade = {
  id: 'les-his-701',
  title: 'El Proceso de Sedentarización Humana en el Neolítico',
  subject: 'Historia',
  grade: '7° Básico',
  durationMinutes: 30,
  copiloto: {
    mineducOA: 'Caracterizar el proceso de sedentarización humana durante el Neolítico (agricultura, domesticación, consecuencias sociales).',
    simplification: 'Explicaremos el paso de nómadas a sedentarios como un proceso lento y global, enfocado en cómo la comida cambió su forma de vivir.',
    openingScript: 'Imagina que llevas toda tu vida moviéndote, sin una casa fija, buscando comida todos los días. Así vivió la humanidad por miles de años. Hoy vamos a entender qué pasó para que decidiéramos quedarnos quietos en un solo lugar.',
    alerts: [
      'Evita usar la palabra "Revolución" como algo rápido. Aclara que esto tomó miles de años, como aprender a andar en bicicleta, pero para toda la humanidad.',
    ],
    counterExample: 'Si te pregunta si todos lo hicieron al mismo tiempo, recuérdale que no. En el sur de Chile, los Selk\'nam siguieron siendo nómadas orgullosos hasta hace muy poco.',
    finalSummaryScript: '¡Misión cumplida! Hoy descubrimos que aprender a cultivar y cuidar animales nos permitió construir aldeas y tener tiempo libre. Ese tiempo libre es lo que nos permitiría crear las primeras grandes civilizaciones. ¡Nos vemos en la próxima ruta!',
    mentorTraining: {
      audioTitle: '🎧 Cápsula Podcast Mentor: Cómo explicar el Neolítico de camino a casa',
      audioDuration: '1:30 min',
      videoTitle: '🎥 Video Express (60s): Del Nomadismo a las Primeras Aldeas',
      summaryBulletPoints: [
        'Durante miles de años la humanidad fue NÓMADA: caminaba diariamente persiguiendo animales y recolectando frutos.',
        'En el Neolítico descubrimos la AGRICULTURA y la DOMESTICACIÓN: aprendimos a sembrar y criar animales en corrales.',
        'Comida guardada = TIEMPO LIBRE: Al tener la despensa llena, nacieron las aldeas, los oficios y las primeras civilizaciones.',
      ],
      homeAnalogy: 'Compáralo con salir a buscar comida todos los días vs. tener la despensa llena en casa. Si tienes comida guardada en el refrigerador, te sobra tiempo para inventar cosas y construir casas.',
      commonMistakes: [
        'Pensar que la Revolución Neolítica ocurrió rápido de un día para otro (en realidad tomó miles de años).',
        'Creer que todos los pueblos del mundo se volvieron sedentarios al mismo tiempo (ej. los Selk\'nam en Chile siguieron siendo nómadas).',
      ],
      socraticQuestions: [
        '¿Por qué crees que tener comida guardada les dio tiempo a las personas para hacer otras cosas?',
        '¿Qué pasaría hoy si tuviéramos que salir a cazar nuestra propia comida antes de ir al colegio o a trabajar?',
        '¿Cuál crees que fue el animal o planta más importante que aprendimos a cuidar primero?',
      ],
    },
  },
  studentMission: 'Descubrir el misterio de por qué los seres humanos dejamos de caminar todos los días buscando comida y decidimos construir las primeras casas de la historia.',
  cards: [
    {
      id: 'card-1',
      title: 'Tarjeta 1: El Gran Cambio',
      content: 'Hace unos 10.000 años, descubrimos un superpoder: Cultivar plantas y domesticar animales. Ya no necesitábamos perseguir la comida.',
      copilotoAlert: '⚠ Evita usar la palabra "Revolución" como algo rápido. Aclara que tomó miles de años.',
    },
    {
      id: 'card-2',
      title: 'Tarjeta 2: Conexión Local',
      content: 'Esto no solo pasó lejos. Aquí mismo en el territorio andino, los pueblos descubrieron cómo domesticar la papa, la quinoa y las llamas.',
      copilotoAlert: 'Contraejemplo: Recuerda que los Selk\'nam en el sur siguieron siendo nómadas por miles de años.',
    },
  ],
  mineducExam: [
    {
      id: 'q1',
      question: '1. ¿Qué es la agricultura y cómo cambió la vida en el Neolítico?',
      options: [
        'a) La crianza y pastoreo exclusivo de animales salvajes',
        'b) El intercambio comercial de productos entre reinos',
        'c) El cultivo de la tierra para producir alimentos en un mismo lugar',
        'd) La construcción de chozas temporales de madera'
      ],
      correctIndex: 2,
      explanation: '¡Correcto! (Opción c). La agricultura es el cultivo de la tierra. Permitió a los seres humanos producir sus propios alimentos sin depender de buscar frutas silvestres diariamente.'
    },
    {
      id: 'q2',
      question: '2. ¿Qué significa la domesticación de animales en este periodo histórico?',
      options: [
        'a) Criar, cuidar y reproducir animales bajo control humano',
        'b) Cazar animales salvajes en los bosques',
        'c) Comer animales sin cocinar',
        'd) Dibujar animales en las paredes de las cuevas'
      ],
      correctIndex: 0,
      explanation: '¡Correcto! (Opción a). La domesticación implicó criar y amansar especies como ovejas, cabras y vacas para obtener leche, carne y lana de forma continua.'
    },
    {
      id: 'q3',
      question: '3. ¿Qué consecuencia tuvo el sedentarismo para la organización humana?',
      options: [
        'a) Obligó a las familias a viajar permanentemente',
        'b) Permitió establecerse en un lugar fijo, construyendo las primeras aldeas',
        'c) Hizo que las personas dejaran de comunicarse entre sí',
        'd) Eliminó la necesidad de construir viviendas'
      ],
      correctIndex: 1,
      explanation: '¡Correcto! (Opción b). Al tener alimentos cultivados y animales en corrales, las familias se establecieron permanentemente en aldeas cerca de los ríos.'
    },
    {
      id: 'q4',
      question: '4. ¿Qué relación existe entre la agricultura neolítica y el origen del comercio?',
      options: [
        'a) No tuvieron ninguna relación',
        'b) La agricultura generó excedentes de comida que se podían intercambiar',
        'c) El comercio hizo que las personas dejaran de cultivar la tierra',
        'd) La agricultura impidió el contacto entre diferentes pueblos'
      ],
      correctIndex: 1,
      explanation: '¡Correcto! (Opción b). Al producir más comida de la que consumían (excedente), nació el trueque e intercambio de alimentos por herramientas u otros bienes.'
    }
  ],
  dragDropGame: {
    title: 'Simulador: El Choque de Mundos',
    items: [
      { id: 'item-1', text: 'Tienda temporal', targetGroup: 'nomada' },
      { id: 'item-2', text: 'Campo de trigo', targetGroup: 'sedentario' },
      { id: 'item-3', text: 'Rebaño de ovejas', targetGroup: 'sedentario' },
      { id: 'item-4', text: 'Lanza de caza', targetGroup: 'nomada' },
    ],
    copilotoQuestion: 'Pregunta guía: "¿Por qué crees que poder guardar comida fue tan importante para dejar de cazar todos los días?" (Pista: si hay comida guardada, sobra tiempo para hacer otras cosas).',
  },
  duaOptions: [
    {
      mode: 'audio',
      title: 'A) Modo Audio 🎙️',
      instruction: 'Graba una nota de voz de 30 segundos explicando 2 cosas que un sedentario tenía y un nómada no.',
      icon: 'mic',
    },
    {
      mode: 'visual',
      title: 'B) Modo Visual ✏️',
      instruction: 'Dibuja rápido por qué las primeras aldeas se construyeron siempre cerca de los ríos.',
      icon: 'draw',
    },
    {
      mode: 'text',
      title: 'C) Modo Texto 💬',
      instruction: 'Escribe un mensaje de chat corto explicando qué es la Revolución Neolítica.',
      icon: 'chat',
    },
  ],
  exitTicket: {
    question1: {
      text: '1. ¿Qué nos permitió dejar de movernos constantemente?',
      options: [
        { id: 'opt-1', text: 'Descubrir el fuego', isCorrect: false },
        { id: 'opt-2', text: 'La agricultura y domesticar animales', isCorrect: true },
      ],
    },
    question2: {
      text: '2. ¿Todos los pueblos del mundo construyeron aldeas al mismo tiempo exacto?',
      isTrueFalse: true,
      correctAnswer: false, // Falso
    },
    metacognitionQuestion: '3. ¿En qué momento de la misión de hoy te sentiste más inteligente?',
  },
};

export const MOCK_OAS: LearningObjective[] = [
  {
    id: 'oa-his-701',
    code: 'OA 01',
    title: 'Proceso de Sedentarización Neolítica',
    description: 'Caracterizar el proceso de sedentarización humana durante el Neolítico (agricultura, domesticación, consecuencias sociales).',
    subject: 'Historia',
    grade: '7° Básico',
    masteryPercentage: 88,
  },
  {
    id: 'oa-mat-702',
    code: 'OA 04',
    title: 'Números Enteros y Operaciones',
    description: 'Mostrar que comprenden la adición y la sustracción de números enteros en contextos cotidianos.',
    subject: 'Matemáticas',
    grade: '7° Básico',
    masteryPercentage: 75,
  },
];

export const SAMPLE_LESSON: Lesson = {
  id: 'les-his-701',
  title: 'El Proceso de Sedentarización Humana en el Neolítico',
  subject: 'Historia',
  grade: '7° Básico',
  oaCode: 'OA 01',
  durationMinutes: 30,
  components: [],
};
