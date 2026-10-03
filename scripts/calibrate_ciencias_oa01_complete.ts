import fs from 'fs';
import path from 'path';

// Importar clases actuales
import { CIENCIAS_7B_OA01_CLASE01 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01';
import { buildClase02 } from './ciencias_data/clase02_data';
import { buildClase03 } from './ciencias_data/clase03_data';
import { buildClase04 } from './ciencias_data/clase04_data';
import { buildClase05 } from './ciencias_data/clase05_data';
import { buildClase06 } from './ciencias_data/clase06_data';

function countWords(str: string): number {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

// Generador de prompts universales conforme a UNI-003, UNI-004 y UNI-012
function formatPrompt(themeDescription: string): string {
  // Limpiar descripciones previas
  let desc = themeDescription
    .replace(/^Modern anime style(\.|\s|16:9\s*widescreen\s*illustration\.)*/i, '')
    .replace(/Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket,\s*/gi, '')
    .replace(/No text drawn by AI\.?/gi, '')
    .replace(/(\s*,\s*)*with generous negative space for text overlays\.?/gi, '')
    .replace(/(\s*,\s*)*clear negative space.*?\./gi, '')
    .replace(/(\s*,\s*)*ample negative space.*?\./gi, '')
    .trim();

  // Asegurar que comience en minúscula fluida tras la introducción canónica
  if (desc.length > 0) {
    desc = desc.charAt(0).toLowerCase() + desc.slice(1);
  }

  return `Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, ${desc}, with generous negative space for text overlays. No text drawn by AI.`;
}

// Definicion de escenas tematicas por clase
const classPromptThemes: Record<number, { hook: string[]; expl: string[] }> = {
  1: {
    hook: [
      'examining a glowing interactive holographic infographic of the 4 dimensions of human sexuality in a warm scientific atmosphere',
      'analyzing a clean anatomical growth chart showing developmental milestones of puberty and height markers with clinical clarity',
      'sharing a sincere laugh in a sunlit school courtyard, with softly illuminated icons of heart and brain symbolizing emotional connection',
      'collaborating respectfully with a diverse group of young students and families in a bright park',
      'observing a balanced scale emblem with glowing symbols of respect, personal limits, consent, and mutual dignity',
      'observing the four dimensions connecting dynamically with glowing energetic nodes around a human silhouette',
      'smiling ready to investigate everyday cases with their science notebooks open beside a StudioSimple badge'
    ],
    expl: [
      'standing before a clear 4-quadrant lightboard representing biological, affective, social, and ethical dimensions',
      'analyzing growth metrics, voice change diagrams, and cellular maturation charts on a holographic display with clinical clarity',
      'reflecting on emotional self-worth, feelings, and family bonds with gentle warm ambient lighting',
      'participating in school and family dialogues with peers, showing open active listening in a bright library',
      'holding a glowing cyan emblem of mutual respect, personal boundaries, and dignity',
      'reviewing an illustrated daily hygiene, sleep schedule, and healthy meal chart on a study desk with clean lineart',
      'presenting a prominent balance diagram with all four dimensions working in dynamic equilibrium beside a StudioSimple emblem'
    ]
  },
  2: {
    hook: [
      'examining a glowing timeline of human growth in a bright science lab, observing the endocrine transition',
      'examining a medical diagram in a clean holographic sphere showing the pituitary gland and descending hormonal signals',
      'studying an anatomical diagram of primary reproductive organs present from birth with respectful scientific curiosity',
      'observing comparison silhouettes illustrating height markers, shoulder broadening, and vocal changes of puberty',
      'reflecting outdoors under a gentle autumn tree, expressing camaraderie and emotional growth in the pubertal stage',
      'interacting with healthy teenage friends of different heights and physical builds, observing diverse growth rhythms between 10 and 16 years',
      'ready to classify developmental traits with their science notebooks open beside a StudioSimple badge'
    ],
    expl: [
      'standing before a clear two-column digital panel contrasting primary and secondary sexual characteristics',
      'analyzing the endocrine feedback loop showing the pituitary gland, gonadotropins, and gonadal hormones',
      'examining a developmental timeline of secondary sexual characteristics in males and females with clean medical aesthetics',
      'comparing growth curves and percentiles in their notebooks, laughing warmly with reassurance about individual rhythms',
      'writing in their science journals while a supportive family chats in the background living room',
      'analyzing an illustrated medical card with height metrics and voice frequency charts on their desk',
      'presenting a two-part diagram contrasting primary organs from birth with pubertal secondary traits beside a StudioSimple emblem'
    ]
  },
  3: {
    hook: [
      'sharing a peaceful conversation on a wooden bench in a sunlit courtyard, learning the value of empathy and friendship',
      'resolving a misunderstanding calmly under a courtyard pergola with active listening gestures and mutual respect',
      'visualizing two thought bubbles overlapping in gentle harmony representing empathy and reciprocal perspective',
      'holding a symbolic glowing blue emblem representing personal boundaries, intimacy, and family privacy',
      'reflecting on reciprocal support and sharing notes during study time in a soft morning atmosphere',
      'agreeing on respectful group rules with classmates in a bright school library with thumbs-up gestures',
      'holding open science notebooks, ready to investigate interpersonal cases beside a StudioSimple badge'
    ],
    expl: [
      'standing next to a glowing infographic illustrating empathy, mutual trust, and personal intimacy',
      'listening intently to each other with speech bubbles transforming into a bridge of reciprocal understanding',
      'keeping personal confidences safe beside a study desk with a glowing lock and diary emblem',
      'observing a balanced scale of reciprocal care and mutual respect glowing softly in cyan and gold',
      'high-fiving respectfully after establishing healthy teamwork boundaries and positive peer support',
      'examining an illustrated case card of respectful conflict resolution on a study desk',
      'presenting a three-pillar diagram of empathy, reciprocity, and intimacy beside a StudioSimple emblem'
    ]
  },
  4: {
    hook: [
      'standing in front of a welcoming digital board displaying the four pillars of responsible consent and self-care',
      'standing calmly in front of a study room with an open hand sign projecting serene confidence and clear personal boundaries',
      'assembling four glowing holographic puzzle pieces representing free, informed, specific, and revocable consent',
      'expressing a calm and assertive refusal in front of peers, surrounded by a gentle aura of dignity and self-respect',
      'holding a protective shield emblem safeguarding personal space and digital privacy against peer pressure',
      'talking with a trusted teacher and guidance counselor in a brightly lit room, receiving supportive advice',
      'holding open science notebooks, ready to evaluate ethical consent scenarios beside a StudioSimple badge'
    ],
    expl: [
      'standing before a four-part criteria board illustrating consent: free, informed, specific, and revocable',
      'analyzing a four-quadrant infographic breaking down unpressured choice, truth, context, and the right to revoke consent',
      'observing a student changing their mind during an activity with classmates stopping immediately and nodding respectfully',
      'standing firmly in the light with moral confidence, resisting group pressure and upholding personal boundaries',
      'visualizing a glowing circle of trust with school counselors, teachers, and parents forming a protective network',
      'reviewing an illustrated decision flowchart of valid consent on a tablet at their desk',
      'presenting a protective shield with four gold stars representing the criteria of consent beside a StudioSimple emblem'
    ]
  },
  5: {
    hook: [
      'reviewing a digital display that debunks popular adolescent myths with verified scientific evidence',
      'observing a distorted mirror being replaced with a clean, realistic medical illustration of pubertal growth',
      'examining a bell-curve growth graph demonstrating the natural developmental diversity between ages 10 and 16',
      'collaborating in a science lab with robotics tools and culinary chemistry, demonstrating equal capabilities without gender stereotypes',
      'holding a glowing magnifying glass revealing verified biological facts over misleading social media headlines',
      'celebrating diverse talents and unique growth trajectories with classmates in an inclusive classroom',
      'holding open science notebooks, ready to debunk myths and analyze evidence beside a StudioSimple badge'
    ],
    expl: [
      'standing in front of a split-screen display contrasting popular myths with verified biological evidence',
      'analyzing official growth curves from WHO and MINEDUC on a digital screen showing normal pubertal ranges between 10 and 16 years',
      'visualizing neural pathways and equal cognitive capabilities across diverse vocations and scientific fields',
      'examining a scientific anatomical model of skin glands and hormonal changes during puberty',
      'reviewing official pediatric health guides and verified scientific portals on their laptops, calm and reassured',
      'analyzing an illustrated growth-percentile chart on their desk, comparing curves with calm scientific smiles',
      'presenting a golden emblem of scientific evidence breaking a chain of myths beside a StudioSimple badge'
    ]
  },
  6: {
    hook: [
      'standing at the entrance of a high-tech science evaluation room, reviewing their comprehensive unit portfolio',
      'in a high-tech science examination hall, with clean multiple-choice options A, B, C, D softly illuminated in cyan',
      'observing a panoramic holographic map synthesizing the biological, affective, social, and ethical dimensions',
      'examining an endocrine feedback loop diagram showing the pituitary gland and secondary sexual characteristics',
      'holding an emblem of mutual dignity and consent with four interlocking glowing rings',
      'analyzing an official MINEDUC growth percentile chart demonstrating normal developmental tracks between 10 and 16 years',
      'holding open science notebooks fully completed, smiling with triumphant focus beside a StudioSimple badge'
    ],
    expl: [
      'standing before an exam review board showing an official MINEDUC multiple-choice item with options A, B, C, D clearly laid out',
      'pointing at the correct option B on the screen, highlighted by a subtle green aura of valid scientific evidence',
      'demonstrating the systematic discard of distractors A, C, and D with clinical reasoning on a digital display',
      'standing beside four solid pillars representing dimensions, pubertal hormones, consent, and scientific evidence',
      'reviewing an official bubble answer sheet on their study desk, calm and confident with plenty of time',
      'analyzing an official four-choice exam card on their desk, comparing reasoning notes before selecting option B',
      'presenting a golden laurel emblem of curricular mastery in Ciencias Naturales OA 01 beside a StudioSimple badge'
    ]
  }
};

// Calibracion de locuciones por clase (palabras exactas para 120-145 hook y 180-210 expl)
const calibratedNotes: Record<number, { hook: string[]; expl: string[] }> = {
  1: {
    hook: [
      'Comienza una expedición fascinante en ciencias. La sexualidad humana es una vivencia integral presente en todas las etapas de nuestra vida.',
      'Comprende nuestro cuerpo material, la maduración celular y los cambios puberales que transforman nuestra estatura, voz y fisonomía.',
      'Reúne nuestros sentimientos, la autoestima personal, el cariño y la capacidad de establecer lazos de ternura y confianza profunda con otros.',
      'Se manifiesta en cómo convivimos día a día, compartiendo experiencias con la familia, en la escuela y dialogando con amigos.',
      'Guía nuestras decisiones morales a través del respeto incondicional a la dignidad humana, límites personales y el consentimiento mutuo.',
      'Ninguna dimensión funciona aislada. Lo que experimenta nuestro cuerpo repercute en nuestras emociones y moldea nuestras relaciones comunitarias.',
      'Ahora surge la gran pregunta: al enfrentar un cambio en nuestra adolescencia, ¿cómo interactúan estas cuatro dimensiones al mismo tiempo?'
    ],
    expl: [
      'El objetivo de la lección es reconocer y explicar que la sexualidad humana está conformada por cuatro dimensiones inseparables: biológica, afectiva, social y ética.',
      'En la pubertad, el sistema endocrino libera señales químicas que inician el estirón puberal, el desarrollo reproductivo y cambios visibles corporales.',
      'El eje afectivo orienta cómo nos sentimos con nosotros mismos. Una autoestima sólida permite valorar el propio cuerpo y comunicar afectos de manera asertiva y respetuosa.',
      'En el entorno social aprendemos pautas culturales y construimos amistades. La dimensión social nos invita a convivir en igualdad de derechos sin discriminación ni estereotipos.',
      'El eje ético establece que el cuerpo de cada individuo es inviolable. Toda relación humana sana se funda en la dignidad, honestidad y consentimiento libre y mutuo.',
      'Analicemos un caso concreto: mantener hábitos de higiene diaria, descanso de ocho horas y alimentación sana para cuidar el cuerpo durante el crecimiento, ¿a qué dimensión corresponde? Corresponde a la dimensión biológica, porque beneficia directamente la salud, anatomía y bienestar del organismo.',
      'Recuerda la regla de oro: la sexualidad es integral. Une cuerpo, emociones, sociedad y valores. ¡Ahora pon a prueba lo aprendido resolviendo las actividades prácticas en la plataforma interactiva!'
    ]
  },
  2: {
    hook: [
      'Comienza una expedición en ciencias. La pubertad marca el inicio de cambios corporales y emocionales guiados por señales químicas.',
      'En la base del cerebro, la hipófisis emite hormonas que despiertan a los ovarios y testículos para comenzar la maduración.',
      'Los caracteres primarios son los órganos reproductores. Están formados desde la gestación y nos acompañan desde el nacimiento.',
      'En la pubertad surgen los caracteres secundarios: aumento de estatura, cambio en el tono de voz y aparición de vello.',
      'Las hormonas también influyen en los afectos. Experimentamos cambios de ánimo y la necesidad de construir nuestra identidad.',
      'No todos los cuerpos crecen al mismo tiempo. La pubertad inicia normalmente entre los 10 y 16 años según ritmos genéticos.',
      'Surge ahora el desafío: al analizar un cambio puberal, ¿cómo determinamos si es primario o secundario sin dudar?'
    ],
    expl: [
      'El objetivo de la lección es diferenciar con precisión científica los caracteres sexuales primarios de los secundarios, comprendiendo la acción del sistema endocrino en la pubertad.',
      'La pubertad inicia cuando la hipófisis secreta hormonas gonadales. Estas estimulan la producción de estrógenos en mujeres y testosterona en varones, desencadenando cambios físicos.',
      'Los caracteres primarios son congénitos y anatómicos. Los secundarios son adquiridos durante la pubertad por estímulo hormonal, preparando al organismo para la madurez reproductiva.',
      'El ritmo de crecimiento varía entre personas. El estirón y la maduración ocurren entre los 10 y 16 años sin que existan diferencias de valor entre ritmos rápidos o lentos.',
      'La maduración puberal también impacta las emociones. La búsqueda de autonomía y las variaciones del estado de ánimo requieren comunicación empática y diálogo cercano en el hogar.',
      'Analicemos un caso concreto: identificar si el cambio en el tono de la voz y el aumento acelerado de estatura corresponden a caracteres primarios o secundarios, y justificarlo biológicamente. Corresponden a caracteres sexuales secundarios, porque se manifiestan durante la pubertad por estímulo de las hormonas sexuales y no están presentes desde el nacimiento.',
      'Recuerda la regla de oro: los caracteres primarios nacen con nosotros; los secundarios despiertan en la pubertad por acción hormonal. ¡Ahora pon a prueba lo aprendido resolviendo las actividades prácticas en la plataforma interactiva!'
    ]
  },
  3: {
    hook: [
      'Comienza una nueva expedición en ciencias. Los seres humanos somos sociales por naturaleza y nuestros vínculos afectivos determinan nuestra felicidad y salud mental.',
      'En la adolescencia, las amistades cobran un valor central. Aprendemos a compartir vivencias, escuchar con paciencia y brindar apoyo sincero.',
      'La empatía es la capacidad de ponerse en el lugar del otro, comprendiendo sus emociones y respetando sus puntos de vista sin juzgar.',
      'La intimidad es nuestro espacio personal más reservado. Cada persona tiene derecho a decidir qué comparte y qué guarda para sí misma.',
      'La reciprocidad exige equilibrio: dar y recibir afecto en igualdad de condiciones, cuidando que nadie imponga su voluntad sobre los demás.',
      'Cuando surge un desacuerdo con amigos o familia, el diálogo sincero y la calma permiten encontrar acuerdos justos que cuiden la relación.',
      'Surge ahora la pregunta: en nuestras relaciones diarias, ¿cómo podemos cuidar la intimidad ajena y expresar afecto con madurez?'
    ],
    expl: [
      'El objetivo de la lección es comprender el valor de la empatía, el respeto mutuo y la intimidad en los vínculos afectivos de la adolescencia.',
      'Los vínculos afectivos sanos se construyen sobre la reciprocidad y la confianza. Cuando ambas partes se sienten escuchadas y valoradas, la amistad se fortalece y genera bienestar.',
      'La empatía permite conectar con los sentimientos ajenos sin invalidarlos. Escuchar activamente a un amigo que pasa por un momento difícil es una manifestación concreta de madurez afectiva.',
      'El respeto a la intimidad exige no divulgar confidencias, no revisar pertenencias ajenas y no presionar a nadie para que revele aspectos reservados de su vida personal o familiar.',
      'La reciprocidad evita relaciones desiguales. Compartir decisiones en el grupo escolar garantiza que nadie se sienta excluido o sometido a las preferencias de los demás.',
      'Analicemos un caso concreto: dos amigos debaten sobre cómo resolver una diferencia de opinión sobre un proyecto escolar sin presiones, aplicando diálogo sincero y respeto mutuo. ¿Qué principio afectivo y ético se aplica? Se aplica la comunicación empática y la reciprocidad, ya que ambos escuchan con respeto la postura del otro y construyen un acuerdo justo sin forzar voluntades.',
      'Recuerda la regla de oro: la reciprocidad y la empatía protegen la intimidad y fortalecen la amistad. ¡Ahora pon a prueba lo aprendido resolviendo las actividades prácticas en la plataforma interactiva!'
    ]
  },
  4: {
    hook: [
      'Comienza una lección fundamental en ciencias. El autocuidado y la responsabilidad personal son herramientas que protegen nuestro bienestar físico, emocional y social.',
      'El consentimiento es el acuerdo libre, consciente y voluntario mediante el cual una persona acepta participar en una situación determinada.',
      'Para que el consentimiento sea válido, nadie debe presionar, amenazar o manipular. La decisión debe tomarse con total tranquilidad y conocimiento.',
      'Decir no con seguridad es un derecho inviolable. La asertividad nos permite fijar límites personales claros frente a la presión de grupo.',
      'El consentimiento también se aplica en el mundo digital: no compartir fotografías, mensajes o información privada de otros sin su autorización explícita.',
      'Si una situación nos incomoda o vulnera nuestros límites, acudir de inmediato a adultos de confianza en la familia o el colegio es indispensable.',
      'Surge ahora el desafío ético: ante una decisión cotidiana con amigos, ¿cómo comprobamos que existe un consentimiento plenamente válido?'
    ],
    expl: [
      'El objetivo de la lección es analizar y aplicar los cuatro criterios innegociables del consentimiento: libre, informado, específico y siempre revocable.',
      'El primer criterio exige que el consentimiento sea libre: sin chantajes, amenazas ni presiones de grupo. Si existe coacción, el consentimiento es nulo.',
      'El segundo criterio exige que sea informado: conocer con claridad qué se propone y qué consecuencias tiene. El tercer criterio establece que sea específico para cada momento.',
      'El cuarto criterio es decisivo: el consentimiento es revocable. Cualquier persona tiene derecho a cambiar de opinión y detener una actividad cuando lo decida.',
      'La asertividad es la habilidad de expresar límites con firmeza y respeto. Reconocer situaciones de riesgo y pedir apoyo a docentes o apoderados refuerza la seguridad.',
      'Analicemos un caso concreto: un grupo insiste para que un estudiante comparta una foto privada ajena o propia y el estudiante se niega con firmeza diciendo que la privacidad debe respetarse. ¿Qué principio se evidencia? Se evidencia el ejercicio del consentimiento informado, el derecho a la privacidad y el uso de la asertividad para fijar límites claros frente a la presión de grupo.',
      'Recuerda la regla de oro: el consentimiento debe ser libre, informado, específico y siempre revocable. ¡Ahora pon a prueba lo aprendido resolviendo las actividades prácticas en la plataforma interactiva!'
    ]
  },
  5: {
    hook: [
      'Comienza una expedición de pensamiento crítico en ciencias. Alrededor de la pubertad circulan muchas creencias populares que no tienen respaldo científico.',
      'Muchos creen que todos los adolescentes deben pegar el estirón al mismo tiempo. La biología demuestra que cada cuerpo tiene su propio reloj genético.',
      'El inicio de la pubertad se extiende normalmente entre los 10 y 16 años. Crecer antes o después no significa tener una enfermedad o deficiencia.',
      'Los estereotipos de género también son mitos culturales sin base biológica. Hombres y mujeres tienen iguales capacidades cognitivas, artísticas y científicas.',
      'El acné puberal responde a estímulos hormonales en las glándulas sebáceas, no a la suciedad ni a castigos imaginarios.',
      'Aprender a buscar información en fuentes médicas oficiales nos protege de la desinformación y fortalece nuestra autoestima y seguridad personal.',
      'Surge ahora la pregunta clave: cuando escuchamos una afirmación sobre el desarrollo adolescente, ¿cómo usamos la evidencia científica para evaluarla?'
    ],
    expl: [
      'El objetivo de la lección es refutar mitos sobre la pubertad usando evidencia biológica y criterios de salud integral.',
      'Las curvas de la OMS y el MINEDUC confirman que la pubertad inicia normalmente entre los 10 y 16 años según factores genéticos y nutricionales.',
      'El desarrollo puberal no es una carrera. Quienes experimentan cambios tempranos o tardíos alcanzan igualmente la madurez biológica completa con salud.',
      'Los estereotipos que asignan roles rígidos según el sexo carecen de fundamento científico. La neurociencia confirma que la inteligencia y vocaciones no tienen límites de género.',
      'La salud puberal requiere hábitos concretos: alimentación balanceada, hidratación, actividad física regular y al menos ocho horas de sueño para la hormona del crecimiento.',
      'Analicemos un caso concreto: un estudiante de 13 años se angustia creyendo erróneamente que tiene una anomalía porque sus compañeros ya crecieron. La evidencia médica demuestra que el estirón puberal responde a relojes genéticos individuales que se manifiestan normalmente entre los 10 y 16 años.',
      'Recuerda la regla de oro: la ciencia desmiente prejuicios; cada cuerpo crece a su propio ritmo genético entre los 10 y 16 años. ¡Ahora pon a prueba lo aprendido resolviendo las actividades prácticas en la plataforma interactiva!'
    ]
  },
  6: {
    hook: [
      'Comienza la clase de síntesis de Ciencias Naturales para el OA 1. Hoy consolidaremos todos los aprendizajes adquiridos a lo largo de esta unidad curricular.',
      'Repasamos que la sexualidad humana es una vivencia integral que articula las dimensiones biológica, afectiva, social y ética durante toda la vida.',
      'Comprendimos que la pubertad es activada por el sistema endocrino, diferenciando órganos primarios de caracteres secundarios hormonales.',
      'Afianzamos que los vínculos afectivos sanos se fundan en la empatía sincera, la reciprocidad y el cuidado riguroso de la intimidad personal.',
      'Validamos que el consentimiento debe cumplir cuatro condiciones innegociables: ser libre, informado, específico y revocable en todo instante.',
      'Derribamos mitos sobre el crecimiento adolescente, fundamentando que la variabilidad entre los 10 y 16 años es un hecho biológico normal.',
      'Estamos listos para enfrentar la evaluación formativa formal: ¿cómo aplicamos el método científico para justificar cada respuesta del examen libre?'
    ],
    expl: [
      'El objetivo de la lección es integrar los contenidos de sexualidad y pubertad, aplicando el análisis riguroso para resolver reactivos psicométricos tipo Examen Libre MINEDUC.',
      'El análisis de reactivos formales exige leer con atención el enunciado e identificar la variable disciplinaria central antes de revisar las alternativas de respuesta.',
      'El método de resolución descarta sistemáticamente distractores que presenten reduccionismos biológicos, afirmaciones absolutas falsas o confusiones conceptuales.',
      'La justificación de la clave correcta debe articular la evidencia biológica con las dimensiones afectivas y éticas aprobadas en las Bases Curriculares nacionales.',
      'La gestión del tiempo en la evaluación formal requiere calma y seguridad: fundamentar cada elección en conceptos científicos estudiados en el cuaderno.',
      'Analicemos un ítem modelado: un estudiante afirma que la sexualidad se limita exclusivamente a órganos y procreación. A partir del MINEDUC, ¿cuál opción refuta dicha postura? La opción B es correcta porque establece que la sexualidad es una dimensión integral que une lo biológico, afectivo, psicológico, sociocultural y ético durante toda la vida.',
      'Recuerda la regla de oro: la justificación científica y el descarte de distractores aseguran el éxito en el examen. ¡Ahora pon a prueba lo aprendido resolviendo las actividades prácticas en la plataforma interactiva!'
    ]
  }
};

// Rutinas de actualizacion
function updateLessonData(lesson: any, classNum: number): any {
  const prompts = classPromptThemes[classNum];
  const notes = calibratedNotes[classNum];

  // 1. Prompts y notas del Gancho
  if (lesson.hook?.slides) {
    lesson.hook.slides.forEach((s: any, idx: number) => {
      s.visualPrompt = formatPrompt(prompts.hook[idx]);
      s.speakerNotes = notes.hook[idx];
      s.palabrasAprox = countWords(s.speakerNotes);
      s.duracionSeg = Math.round(s.palabrasAprox / 2.2);
    });
  }

  // 2. Prompts y notas de Formalizacion
  if (lesson.formalization?.slides) {
    lesson.formalization.slides.forEach((s: any, idx: number) => {
      s.visualPrompt = formatPrompt(prompts.expl[idx]);
      s.speakerNotes = notes.expl[idx];
      s.palabrasAprox = countWords(s.speakerNotes);
      s.duracionSeg = Math.round(s.palabrasAprox / 2.2);
    });

    // Asegurar titulo de objetivo en slide 1
    if (lesson.formalization.slides[0]) {
      lesson.formalization.slides[0].overlayTitle = 'Objetivo de la lección';
    }

    // Asegurar titulo de regla de oro en slide 7
    if (lesson.formalization.slides[6]) {
      const titles = [
        'Regla de Oro de la sexualidad',
        'Regla de Oro de los caracteres sexuales',
        'Regla de Oro de los vínculos afectivos',
        'Regla de Oro del consentimiento',
        'Regla de Oro frente a los mitos',
        'Regla de Oro de la síntesis de ciencias'
      ];
      lesson.formalization.slides[6].overlayTitle = titles[classNum - 1];
    }
  }

  // 3. Reutilizacion fiel en postQuestions (UNI-009) reutilizando practice[0] y practice[1]
  if (lesson.practice && lesson.practice.length >= 2) {
    lesson.postQuestions = [
      {
        context: lesson.practice[0].context,
        question: lesson.practice[0].question,
        expected: lesson.practice[0].expected,
        success: lesson.practice[0].success,
        support: lesson.practice[0].support,
        reveal: lesson.practice[0].reveal,
        studentReveal: lesson.practice[0].studentReveal
      },
      {
        context: lesson.practice[1].context,
        question: lesson.practice[1].question,
        expected: lesson.practice[1].expected,
        success: lesson.practice[1].success,
        support: lesson.practice[1].support,
        reveal: lesson.practice[1].reveal,
        studentReveal: lesson.practice[1].studentReveal
      }
    ];
  }

  return lesson;
}

// Actualizar Clase 1
const c1Updated = updateLessonData(CIENCIAS_7B_OA01_CLASE01, 1);
const c1OutPath = path.resolve('Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts');
const c1OutCode = `import { LessonData } from '../../types/lesson';\n\nexport const CIENCIAS_7B_OA01_CLASE01: LessonData = ${JSON.stringify(c1Updated, null, 2)};\n`;
fs.writeFileSync(c1OutPath, c1OutCode, 'utf8');
console.log('Clase 1 reescrita y calibrada.');

// Actualizar Clase 2
const c2Updated = updateLessonData(buildClase02(), 2);
const c2OutPath = path.resolve('scripts/ciencias_data/clase02_data.ts');
const c2OutCode = `export function buildClase02() {\n  return ${JSON.stringify(c2Updated, null, 2)};\n}\n`;
fs.writeFileSync(c2OutPath, c2OutCode, 'utf8');
console.log('Clase 2 reescrita y calibrada.');

// Actualizar Clase 3
const c3Updated = updateLessonData(buildClase03(), 3);
const c3OutPath = path.resolve('scripts/ciencias_data/clase03_data.ts');
const c3OutCode = `export function buildClase03() {\n  return ${JSON.stringify(c3Updated, null, 2)};\n}\n`;
fs.writeFileSync(c3OutPath, c3OutCode, 'utf8');
console.log('Clase 3 reescrita y calibrada.');

// Actualizar Clase 4
const c4Updated = updateLessonData(buildClase04(), 4);
const c4OutPath = path.resolve('scripts/ciencias_data/clase04_data.ts');
const c4OutCode = `export function buildClase04() {\n  return ${JSON.stringify(c4Updated, null, 2)};\n}\n`;
fs.writeFileSync(c4OutPath, c4OutCode, 'utf8');
console.log('Clase 4 reescrita y calibrada.');

// Actualizar Clase 5
const c5Updated = updateLessonData(buildClase05(), 5);
const c5OutPath = path.resolve('scripts/ciencias_data/clase05_data.ts');
const c5OutCode = `export function buildClase05() {\n  return ${JSON.stringify(c5Updated, null, 2)};\n}\n`;
fs.writeFileSync(c5OutPath, c5OutCode, 'utf8');
console.log('Clase 5 reescrita y calibrada.');

// Actualizar Clase 6
const c6Updated = updateLessonData(buildClase06(), 6);
const c6OutPath = path.resolve('scripts/ciencias_data/clase06_data.ts');
const c6OutCode = `export function buildClase06() {\n  return ${JSON.stringify(c6Updated, null, 2)};\n}\n`;
fs.writeFileSync(c6OutPath, c6OutCode, 'utf8');
console.log('Clase 6 reescrita y calibrada.');

console.log('\nTodas las lecciones de Ciencias OA 01 han sido completamente calibradas.');
