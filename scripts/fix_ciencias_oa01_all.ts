import fs from 'fs';
import path from 'path';

// Script de correccion y calibracion exhaustiva para Ciencias Naturales 7° Basico OA 01
// Cumplimiento estricto de UNI-001 a UNI-012 y resolucion del caso de regresion REG-006

console.log('Iniciando calibracion y correccion de archivos fuente de Ciencias Naturales OA 01...');

// 1. Modificar Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts
const c1Path = path.resolve('Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts');
let c1Content = fs.readFileSync(c1Path, 'utf8');

// Ajustar prompts en Clase 1
const c1Replacements = [
  {
    target: `"visualPrompt": "Modern anime style. Clean anatomical growth chart showing developmental milestones of puberty, height markers, and secondary sexual characteristics. High clarity, medical illustration style. No text drawn by AI.",`,
    replacement: `"visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, analyzing a clean anatomical growth chart showing developmental milestones of puberty and height markers. Medical illustration clarity, generous negative space on top. No text drawn by AI.",`
  },
  {
    target: `"visualPrompt": "Modern anime style. Close-up of adolescents sharing a sincere laugh, icons of heart and brain softly illuminated. Warm morning light, emotional connection. No text drawn by AI.",`,
    replacement: `"visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, sharing a sincere laugh in a sunlit school courtyard, with icons of heart and brain softly illuminated. Emotional connection, clear negative space. No text drawn by AI.",`
  },
  {
    target: `"visualPrompt": "Modern anime style. Diverse group of young students collaborating in a bright park, talking respectfully with families and friends. Crisp clean composition. No text drawn by AI.",`,
    replacement: `"visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, collaborating with a group of young students and families in a bright park, talking respectfully. Crisp clean composition, negative space. No text drawn by AI.",`
  },
  {
    target: `"visualPrompt": "Modern anime style. Balance scale emblem with glowing symbols of respect, personal limits, consent, and mutual dignity. Clear negative space. No text drawn by AI.",`,
    replacement: `"visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, observing a balance scale emblem with glowing symbols of respect, personal limits, consent, and mutual dignity. Clear negative space on top. No text drawn by AI.",`
  },
  {
    target: `"visualPrompt": "Modern anime style. The four dimensions connecting dynamically with glowing energetic nodes around a human silhouette. High visual impact, harmony. No text drawn by AI.",`,
    replacement: `"visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, observing the four dimensions connecting dynamically with glowing energetic nodes around a human silhouette. Ample negative space. No text drawn by AI.",`
  },
  {
    target: `"visualPrompt": "Modern anime style. Both explorers smiling, ready to investigate everyday cases with their science notebooks open. StudioSimple badge. No text drawn by AI.",`,
    replacement: `"visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, smiling, ready to investigate everyday cases with their science notebooks open. StudioSimple badge, clean negative space. No text drawn by AI.",`
  },
  {
    target: `"visualPrompt": "Modern anime style 16:9. The boy and girl standing before a clear 4-quadrant lightboard: 'Biológica', 'Afectiva', 'Social' y 'Ética'. Clean modern typography. No text drawn by AI.",`,
    replacement: `"visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing before a clear 4-quadrant lightboard representing biological, affective, social, and ethical dimensions. Clean negative space on top. No text drawn by AI.",`
  },
  {
    target: `"visualPrompt": "Modern anime style. The girl pointing at growth metrics, voice change diagrams, and cellular maturation charts. Clear clinical clarity. No text drawn by AI.",`,
    replacement: `"visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, analyzing growth metrics, voice change diagrams, and cellular maturation charts on a holographic display. Clinical clarity, clear negative space. No text drawn by AI.",`
  },
  {
    target: `"visualPrompt": "Modern anime style. The boy reflecting on emotional self-worth and family bonds with gentle warm ambient lighting. Negative space on left. No text drawn by AI.",`,
    replacement: `"visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, reflecting on emotional self-worth, feelings, and family bonds with gentle warm ambient lighting. Negative space on left. No text drawn by AI.",`
  },
  {
    target: `"visualPrompt": "Modern anime style. Young adolescents participating in school and family dialogues, showing open active listening. Soft depth of field. No text drawn by AI.",`,
    replacement: `"visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, participating in school and family dialogues with peers, showing open active listening. Soft depth of field, generous negative space. No text drawn by AI.",`
  },
  {
    target: `"visualPrompt": "Modern anime style. Two hands shaking with dignity and mutual respect. Icon of personal boundaries and safety shield in glowing cyan. No text drawn by AI.",`,
    replacement: `"visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, holding a glowing cyan symbol of mutual respect, personal boundaries, and dignity. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `"visualPrompt": "Modern anime style 16:9. The boy and girl reviewing an illustrated daily hygiene, sleep schedule, and healthy meal chart on a study desk. Clean lineart, soft ambient lighting. No text drawn by AI.",`,
    replacement: `"visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, reviewing an illustrated daily hygiene, sleep schedule, and healthy meal chart on a study desk. Clean lineart, soft ambient lighting, ample negative space. No text drawn by AI.",`
  },
  {
    target: `"visualPrompt": "Modern anime style. StudioSimple emblem alongside a prominent balance diagram with all four dimensions working in dynamic equilibrium. Clean lines. No text drawn by AI.",`,
    replacement: `"visualPrompt": "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, presenting a prominent balance diagram with all four dimensions working in dynamic equilibrium. StudioSimple emblem, generous negative space. No text drawn by AI.",`
  }
];

c1Replacements.forEach((r) => {
  if (c1Content.includes(r.target)) {
    c1Content = c1Content.replace(r.target, r.replacement);
  }
});

// Reutilizacion fiel en postQuestions (UNI-009) para Clase 1
const c1OldPost = `  postQuestions: [
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
  ],`;

const c1NewPost = `  postQuestions: [
    {
      context: 'Caso 1: Cuidado de la higiene y descanso',
      question: 'El hábito de bañarse diariamente, usar ropa limpia y dormir ocho horas para cuidar el cuerpo durante el crecimiento, ¿a qué dimensión corresponde?',
      expected: 'Corresponde a la dimensión biológica, ya que se relaciona con el cuidado y funcionamiento saludable del organismo.',
      success: '¡Muy bien! Cuidar el cuerpo físico con higiene y descanso es parte de la dimensión biológica.',
      support: 'Piensa a qué parte de la persona beneficia directamente el descanso y la limpieza: al cuerpo físico y su bienestar anatómico.',
      reveal: 'Corresponde a la dimensión biológica porque promueve la salud, higiene y bienestar anatómico del cuerpo.',
      studentReveal: 'Dimensión biológica (salud y cuidado del cuerpo).'
    },
    {
      context: 'Caso 2: Expresión de afecto en la familia',
      question: 'Conversar con honestidad con los padres sobre los temores o dudas que surgen en la adolescencia, ¿qué dimensiones involucra?',
      expected: 'Involucra la dimensión afectiva (expresar emociones y confianza) y la dimensión social (el vínculo familiar).',
      success: '¡Exacto! El diálogo familiar combina el cariño sincero (afectivo) con la convivencia dentro del hogar (social).',
      support: 'Piensa en las emociones compartidas (afecto) y en las personas con las que vives y convives (familia y sociedad).',
      reveal: 'Involucra la dimensión afectiva (manejo de emociones y confianza) y la dimensión social (la relación de convivencia con la familia).',
      studentReveal: 'Dimensión afectiva (emociones) y dimensión social (familia).'
    }
  ],`;

if (c1Content.includes(c1OldPost)) {
  c1Content = c1Content.replace(c1OldPost, c1NewPost);
}

// Cierre teleologico y pase a practica en Clase 1
const c1OldClosing = `"speakerNotes": "Recuerda la regla de oro: la sexualidad es integral. ¡Ahora demostraremos lo aprendido aplicando este modelo en las situaciones prácticas de la plataforma interactiva!",`;
const c1NewClosing = `"speakerNotes": "Recuerda la regla de oro: la sexualidad es integral. Une cuerpo, emociones, sociedad y valores. ¡Ahora pon a prueba lo aprendido resolviendo los casos prácticos en la plataforma interactiva!",`;
if (c1Content.includes(c1OldClosing)) {
  c1Content = c1Content.replace(c1OldClosing, c1NewClosing);
}

fs.writeFileSync(c1Path, c1Content, 'utf8');
console.log('Clase 1 actualizada correctamente.');

// 2. Modificar scripts/ciencias_data/clase02_data.ts
const c2Path = path.resolve('scripts/ciencias_data/clase02_data.ts');
let c2Content = fs.readFileSync(c2Path, 'utf8');

// Unificacion de datos: rango 10 a 16 anos en lugar de 9 a 15
c2Content = c2Content.replace(/entre los 9 y 15 años/g, 'entre los 10 y 16 años');

// Actualizar prompts en Clase 2
const c2Prompts = [
  {
    target: `visualPrompt: "Modern anime style. Medical diagram in a clean holographic sphere showing the brain, pituitary gland, and hormonal signals descending through the body. Crisp lines. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, examining a medical diagram in a clean holographic sphere showing the pituitary gland and hormonal signals. Crisp lines, ample negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Two adolescent characters studying an anatomical diagram of the reproductive organs with respectful scientific curiosity. Clear negative space on left. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, studying an anatomical diagram of reproductive organs with respectful scientific curiosity. Clear negative space on left. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Comparison silhouettes illustrating height markers, shoulder broadening, pelvic changes, and facial feature maturation. Crisp clean art. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, observing comparison silhouettes illustrating height markers, shoulder broadening, and vocal changes. Crisp clean art, negative space on top. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. The boy and girl reflecting outdoors under a gentle autumn tree, expressing introspection and camaraderie. Warm expressive eyes. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, reflecting outdoors under a gentle autumn tree, expressing camaraderie and emotional growth. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Diverse group of healthy teenage friends of different heights and physical builds smiling together in school uniforms. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, interacting with healthy teenage friends of different heights and physical builds in school uniforms. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. The girl and boy ready to classify developmental traits with their science notebooks open. StudioSimple badge in corner. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, ready to classify developmental traits with their science notebooks open. StudioSimple badge, clean negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style 16:9. The boy and girl standing before a clear two-column digital panel titled 'Caracteres Primarios' and 'Caracteres Secundarios'. Clean scientific typography. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing before a clear two-column digital panel of primary and secondary sexual characteristics. Generous negative space on top. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Detailed scientific illustration of the endocrine feedback loop: pituitary gland releasing FSH and LH to stimulate ovaries and testes. Crisp lines. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, analyzing the endocrine feedback loop showing the pituitary gland and gonads. Crisp clinical clarity, ample negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Comparison diagram highlighting the developmental timeline of secondary sexual characteristics in males and females. Clean medical aesthetic. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, examining a comparison diagram of secondary sexual characteristics in puberty. Clean medical aesthetic, negative space for text overlays. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Close-up on the girl and boy comparing their personal growth percentiles and laughing warmly. Gentle lighting, reassurance. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, comparing growth curves and percentiles in their notebooks, laughing warmly with reassurance. Clean negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. An adolescent peacefully writing in a private journal while a supportive family chats in the background living room. Warm ambient tones. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, writing in their science journals while a supportive family chats in the background. Warm ambient tones, clean negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style 16:9. The boy and girl analyzing an illustrated medical card with height metrics and voice frequency charts on their desk. High clarity. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, analyzing an illustrated medical card with height metrics and voice frequency charts on their desk. High clarity, ample negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. StudioSimple emblem with a clear two-part balance diagram: 'Nacimiento = Primarios' y 'Pubertad = Secundarios'. Clean solid colors. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, presenting a two-part diagram contrasting primary and secondary sexual characteristics. StudioSimple emblem, clean negative space. No text drawn by AI.",`
  }
];

c2Prompts.forEach((p) => {
  if (c2Content.includes(p.target)) {
    c2Content = c2Content.replace(p.target, p.replacement);
  }
});

// Reutilizacion fiel en postQuestions para Clase 2
const c2OldPostRegex = /postQuestions:\s*\[[\s\S]*?\],\s*practice:/;
const c2NewPostStr = `postQuestions: [
      {
        context: "Caso 1: Clasificación de caracteres físicos",
        question: "Identifica si el cambio en el tono de la voz y el aumento acelerado de estatura corresponden a caracteres sexuales primarios o secundarios, y justifica tu respuesta con un criterio biológico.",
        expected: "Corresponden a caracteres sexuales secundarios, porque se desarrollan durante la pubertad por acción de las hormonas sexuales y no están presentes desde el nacimiento.",
        success: "¡Excelente precisión! Justificaste la respuesta vinculando la aparición puberal con la acción hormonal.",
        support: "Aplica la regla de oro: ¿un recién nacido ya tiene voz grave o estirón de estatura, o se manifiestan en la pubertad?",
        reveal: "Son caracteres sexuales secundarios porque se desarrollan durante la pubertad activados por el sistema endocrino.",
        studentReveal: "Caracteres secundarios, porque aparecen en la pubertad por acción de las hormonas sexuales."
      },
      {
        context: "Caso 2: Cambios emocionales y autonomía",
        question: "Un estudiante de 13 años siente que a veces prefiere estar a solas reflexionando y otras veces necesita el apoyo de sus padres. ¿Es esta conducta un cambio emocional normal de la pubertad? Justifica.",
        expected: "Sí, es completamente normal, ya que la pubertad involucra la búsqueda de autonomía e identidad personal junto con la necesidad de seguridad afectiva.",
        success: "¡Exacto! La alternancia entre autonomía y apego familiar es una manifestación afectiva propia de la adolescencia.",
        support: "Piensa en lo analizado sobre la dimensión emocional: ¿la búsqueda de independencia es parte del crecimiento?",
        reveal: "Es normal y saludable: la maduración psicológica de la pubertad combina el deseo de autonomía con la necesidad de contención familiar.",
        studentReveal: "Sí, es normal porque en la pubertad se busca autonomía e identidad personal."
      }
    ],
    practice:`;

c2Content = c2Content.replace(c2OldPostRegex, c2NewPostStr);

// Cierre teleologico en Clase 2
c2Content = c2Content.replace(
  `speakerNotes: "Recuerda la regla de oro: los caracteres primarios nacen con nosotros; los secundarios despiertan en la pubertad por acción hormonal. ¡Ahora demostraremos lo aprendido en las actividades de la plataforma!",`,
  `speakerNotes: "Recuerda la regla de oro: los caracteres primarios nacen con nosotros; los secundarios despiertan en la pubertad por acción hormonal. ¡Ahora pon a prueba lo aprendido resolviendo las actividades prácticas en la plataforma interactiva!",`
);

fs.writeFileSync(c2Path, c2Content, 'utf8');
console.log('Clase 2 actualizada correctamente.');

// 3. Modificar scripts/ciencias_data/clase03_data.ts
const c3Path = path.resolve('scripts/ciencias_data/clase03_data.ts');
let c3Content = fs.readFileSync(c3Path, 'utf8');

// Actualizar prompts en Clase 3
const c3Prompts = [
  {
    target: `visualPrompt: "Modern anime style. Two close friends resolving a misunderstanding calmly under a courtyard pergola, active listening gestures, heart-shaped soft flare. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, resolving a misunderstanding calmly under a courtyard pergola, with active listening gestures. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Conceptual art of two thought bubbles overlapping in gentle glowing harmony, representing empathy, mutual perspective, and compassion. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, visualizing two thought bubbles overlapping in gentle harmony representing empathy and mutual respect. Ample negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Symbolic lock and shield glowing with gentle blue light, representing personal space, private thoughts, and family secrets. Crisp lines. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, holding a symbolic glowing blue emblem representing personal boundaries, intimacy, and privacy. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. The boy and girl reflecting on reciprocal support, sharing notes and encouraging each other during study time. Soft morning atmosphere. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, reflecting on reciprocal support and sharing notes during study time. Soft morning atmosphere, clean negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Group of teenage friends with open body language, agreeing on group rules with a shared thumbs-up gesture in school library. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, agreeing on respectful group rules with classmates in a bright school library. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Both explorers with their science notebooks open, looking toward the viewer with determined expression. StudioSimple badge in corner. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, with science notebooks open, ready to analyze interpersonal cases. StudioSimple badge, clean negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style 16:9. The boy and girl standing next to a glowing infographic entitled 'Pilares de la Afectividad: Empatía, Confianza e Intimidad'. Clear aesthetic. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing next to a glowing infographic of empathy, mutual trust, and personal intimacy. Generous negative space on top. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Two people listening intently to each other, speech bubbles transforming into bridge arches between them. Positive connection. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, listening intently to each other with speech bubbles transforming into a bridge of understanding. Clean negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. An adolescent choosing to keep a friend's private confidence safe, placing a hand over a journal with a glowing lock icon. Integrity. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, keeping personal confidences safe beside a study desk with a glowing lock emblem. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Two scales in perfect balance: 'Dar Cariño' and 'Recibir Cariño', glowing softly in cyan and gold. Ethical harmony. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, observing a balanced scale of reciprocal care and mutual respect glowing softly. Clean negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Close-up on the girl and boy high-fiving respectfully after establishing healthy teamwork boundaries. Positive energy. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, high-fiving respectfully after establishing healthy teamwork boundaries. Crisp artwork, generous negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style 16:9. The boy and girl examining an illustrated case card showing two friends talking through a disagreement calmly on a school bench. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, examining an illustrated case card of respectful conflict resolution on a study desk. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. StudioSimple emblem with a three-pillar emblem: 'Empatía', 'Reciprocidad' e 'Intimidad'. Clean gold and navy geometry. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, presenting a three-pillar diagram of empathy, reciprocity, and intimacy. StudioSimple emblem, clean negative space. No text drawn by AI.",`
  }
];

c3Prompts.forEach((p) => {
  if (c3Content.includes(p.target)) {
    c3Content = c3Content.replace(p.target, p.replacement);
  }
});

// Reutilizacion fiel en postQuestions para Clase 3
const c3OldPostRegex = /postQuestions:\s*\[[\s\S]*?\],\s*practice:/;
const c3NewPostStr = `postQuestions: [
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
      }
    ],
    practice:`;

c3Content = c3Content.replace(c3OldPostRegex, c3NewPostStr);

// Cierre teleologico en Clase 3
c3Content = c3Content.replace(
  `speakerNotes: "Recuerda la regla de oro: la reciprocidad y la empatía protegen la intimidad y fortalecen la amistad. ¡Ahora aplicaremos estos conceptos en los casos prácticos!",`,
  `speakerNotes: "Recuerda la regla de oro: la reciprocidad y la empatía protegen la intimidad y fortalecen la amistad. ¡Ahora pon a prueba lo aprendido resolviendo las actividades prácticas en la plataforma interactiva!",`
);

fs.writeFileSync(c3Path, c3Content, 'utf8');
console.log('Clase 3 actualizada correctamente.');

// 4. Modificar scripts/ciencias_data/clase04_data.ts
const c4Path = path.resolve('scripts/ciencias_data/clase04_data.ts');
let c4Content = fs.readFileSync(c4Path, 'utf8');

// Actualizar prompts en Clase 4
const c4Prompts = [
  {
    target: `visualPrompt: "Modern anime style. An adolescent standing calmly in front of a peer group with an open hand sign for 'stop', projecting serene confidence, shield icon in blue. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing calmly in front of a study room with an open hand sign projecting serene confidence and clear personal boundaries. Negative space on top. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Four glowing puzzle pieces labeled 'Libre', 'Informado', 'Específico' y 'Revocable' clicking together into an unbreakable shield of dignity. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, assembling four glowing holographic puzzle pieces representing free, informed, specific, and revocable consent. Ample negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Student saying 'no' calmly to a group pressuring to share homework or secrets, gentle aura of self-respect protecting the character. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, expressing a calm and assertive refusal in front of peers, with a gentle aura of dignity and self-respect. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. An adolescent holding an umbrella that protects their personal space and devices from digital glare and outside pressure. Protective metaphor. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, holding a protective shield emblem safeguarding their personal space and digital privacy. Generous negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. A student talking with a trusted teacher and parent in a brightly lit counseling room, expressing relief and receiving guidance. Safe space. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, talking with a trusted teacher in a brightly lit guidance room, receiving supportive advice. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Both explorers with their science notebooks open, looking ahead with serious, ethical focus. StudioSimple badge in corner. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, with science notebooks open, ready to analyze ethical consent scenarios. StudioSimple badge, clean negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style 16:9. The boy and girl standing before a four-part criteria board: 'Libre', 'Informado', 'Específico', 'Revocable'. Crisp ethical graphics. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing before a four-part criteria board of consent: free, informed, specific, and revocable. Ample negative space on top. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Detailed four-quadrant infographic breaking down each criterion: unpressured choice, full truth, precise context, right to stop anytime. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, analyzing a four-quadrant infographic breaking down unpressured choice, truth, context, and revocation. Clean negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. A person changing their mind in the middle of a game, with friends stopping immediately and nodding respectfully. Mutual agreement. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, observing a student changing their mind during an activity with classmates stopping immediately and nodding with respect. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. A group of shadows whispering, contrasted with a student standing firmly in the light with hands on hips, unafraid of rejection. Moral strength. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing firmly in the light with moral confidence, resisting peer pressure and upholding personal limits. Ample negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. A network of glowing support contacts: school counselor, parents, pediatrician, and teachers forming a circle of trust. Protective net. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, visualizing a glowing circle of trust with school counselors, teachers, and parents forming a protective network. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style 16:9. The boy and girl reviewing an illustrated decision flowchart on a tablet: 'Petición -> ¿Es libre? ¿Es revocable? -> Consentimiento válido'. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, reviewing an illustrated decision flowchart of valid consent on a tablet at their desk. Clean lineart, generous negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. StudioSimple emblem with an unbreakable shield displaying four gold stars for each criterion of consent. Clean, noble geometry. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, presenting a protective shield with four gold stars representing the criteria of consent. StudioSimple emblem, clean negative space. No text drawn by AI.",`
  }
];

c4Prompts.forEach((p) => {
  if (c4Content.includes(p.target)) {
    c4Content = c4Content.replace(p.target, p.replacement);
  }
});

// Reutilizacion fiel en postQuestions para Clase 4
const c4OldPostRegex = /postQuestions:\s*\[[\s\S]*?\],\s*practice:/;
const c4NewPostStr = `postQuestions: [
      {
        context: "Caso 1: Negativa asertiva ante presión digital",
        question: "Un grupo de compañeros insiste para que un estudiante comparta una fotografía privada de otra persona o propia. El estudiante se niega con firmeza diciendo que la privacidad debe respetarse. ¿Qué principio de responsabilidad y autocuidado se evidencia?",
        expected: "Se evidencia el principio del consentimiento y el respeto a la privacidad, estableciendo un límite claro mediante comunicación asertiva ante la presión del grupo.",
        success: "¡Excelente resolución! Identificaste la aplicación práctica del consentimiento y la asertividad protectora.",
        support: "Fíjate en la acción: decir 'no' frente a la insistencia para proteger la intimidad. ¿Qué principios aprendidos representa?",
        reveal: "Se evidencia el ejercicio del consentimiento informado, el derecho a la privacidad y el uso de la asertividad para fijar límites.",
        studentReveal: "El principio del consentimiento y la privacidad, defendiendo sus límites con asertividad."
      },
      {
        context: "Caso 2: Redes de apoyo ante el acoso",
        question: "Un adolescente nota que una compañera está siendo presionada en los recreos y se siente asustada. ¿Qué acción responsable y solidaria puede realizar para apoyarla?",
        expected: "Acompañarla, validar su malestar y acudir junto a ella a informar a un profesor, inspector o adulto de confianza para detener la situación.",
        success: "¡Exacto! La empatía activa y la denuncia ante adultos responsables protegen a las personas vulneradas.",
        support: "Piensa en no ser un espectador pasivo: ¿cómo podemos conectar a la víctima con adultos que puedan ayudarla?",
        reveal: "La solidaridad exige acompañar a la persona afectada y reportar la situación a adultos de confianza para activar el protocolo de protección.",
        studentReveal: "Acompañarla y avisar a un profesor o adulto responsable para que intervenga."
      }
    ],
    practice:`;

c4Content = c4Content.replace(c4OldPostRegex, c4NewPostStr);

// Cierre teleologico en Clase 4
c4Content = c4Content.replace(
  `speakerNotes: "Recuerda la regla de oro: el consentimiento debe ser libre, informado, específico y siempre revocable. ¡Ahora pondremos a prueba tu discernimiento en la plataforma!",`,
  `speakerNotes: "Recuerda la regla de oro: el consentimiento debe ser libre, informado, específico y siempre revocable. ¡Ahora pon a prueba lo aprendido resolviendo las actividades prácticas en la plataforma interactiva!",`
);

fs.writeFileSync(c4Path, c4Content, 'utf8');
console.log('Clase 4 actualizada correctamente.');

// 5. Modificar scripts/ciencias_data/clase05_data.ts
const c5Path = path.resolve('scripts/ciencias_data/clase05_data.ts');
let c5Content = fs.readFileSync(c5Path, 'utf8');

// Unificar pregunta miniquiz q1 a 10 y 16 anos
c5Content = c5Content.replace(/entre los 9 y 14 años/g, 'entre los 10 y 16 años');

// Actualizar prompts en Clase 5
const c5Prompts = [
  {
    target: `visualPrompt: "Modern anime style. An adolescent standing calmly in front of a distorted funhouse mirror, replacing the warped reflection with a clean, realistic medical illustration. Scientific truth. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, observing a distorted mirror being replaced with a clean, realistic medical illustration. Generous negative space on top. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Three stylized adolescent figures of varying heights and developmental stages standing together under a glowing bell-curve graph. Normal diversity. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, examining a bell-curve growth graph demonstrating the natural developmental diversity between ages 10 and 16. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. A girl in safety goggles assembling a robot alongside a boy baking bread in a home kitchen, both smiling with competence and mutual respect. No stereotypes. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, collaborating in a science lab with robotics tools and culinary chemistry, demonstrating equal capabilities without gender stereotypes. Ample negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. A glowing magnifying glass revealing scientific facts (DNA strand, hormones, medical books) over sensational social media headlines. Discerning truth. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, holding a glowing magnifying glass revealing verified biological facts over misleading social media headlines. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Diverse classroom of adolescents smiling and cheering for each other's diverse talents without judgment. Warm inclusive light. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, celebrating diverse talents and unique growth trajectories with classmates in an inclusive classroom. Clean negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Both explorers with their science notebooks open, looking at the viewer with confident, analytical expressions. StudioSimple badge in corner. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, with science notebooks open, ready to debunk myths and analyze evidence. StudioSimple badge, clean negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style 16:9. The boy and girl standing in front of a large split-screen display: 'Mito Popular' in gray vs 'Evidencia Científica' in vibrant teal and gold. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing in front of a split-screen display contrasting popular myths with verified biological evidence. Ample negative space on top. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Official growth curves from WHO and MINEDUC displayed as smooth overlapping bell curves with clean data points and percentiles. Clinical rigor. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, analyzing official growth curves from WHO and MINEDUC on a digital screen showing normal pubertal ranges between 10 and 16 years. Clinical clarity, clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Two brains glowing with equal complexity and interconnected neural pathways, surrounded by diverse vocations: engineering, art, medicine, caregiving. Equality. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, visualizing neural pathways and equal cognitive capabilities across diverse vocations. Generous negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Scientific breakdown of a hair follicle, sebaceous gland, and androgens during puberty, showing sebum production as a normal biological process. Medical art. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, examining a scientific anatomical model of skin glands and hormonal changes during puberty. Clean medical art, clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. An adolescent closing a sensational video on a smartphone and opening an official pediatric health guide, looking calm and reassured. Critical thinking. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, reviewing official pediatric health guides and verified scientific portals on their laptops, calm and reassured. Ample negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style 16:9. The boy and girl analyzing an illustrated growth-percentile chart on their desk, comparing curves with calm scientific smiles. Positive learning. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, analyzing an illustrated growth-percentile chart on their desk, comparing curves with calm scientific smiles. Clean lineart, generous negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. StudioSimple emblem with a golden scales emblem bearing the inscription 'Evidencia Científica', breaking a chain of rumors. Triumphant, clean. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, presenting a golden emblem of scientific evidence breaking a chain of myths. StudioSimple badge, clean negative space. No text drawn by AI.",`
  }
];

c5Prompts.forEach((p) => {
  if (c5Content.includes(p.target)) {
    c5Content = c5Content.replace(p.target, p.replacement);
  }
});

// Reutilizacion fiel en postQuestions para Clase 5
const c5OldPostRegex = /postQuestions:\s*\[[\s\S]*?\],\s*practice:/;
const c5NewPostStr = `postQuestions: [
      {
        context: "Caso 1: El mito del estirón puberal simultáneo",
        question: "Un estudiante de 13 años siente angustia porque varios compañeros ya tuvieron el estirón puberal y él aún no, creyendo erróneamente que tiene un problema de salud o no crecerá. ¿Qué evidencia científica y biológica desmiente este mito y cómo debe explicarse?",
        expected: "La evidencia indica que el estirón puberal no ocurre a la misma edad para todos; responde a ritmos genéticos individuales que se extienden normalmente entre los 10 y los 16 años, por lo que su desarrollo es biológicamente normal y no constituye una anomalía.",
        success: "¡Excelente resolución! Has contrastado el mito con la evidencia médica de la variabilidad biológica del crecimiento.",
        support: "Recuerda las curvas de desarrollo de la OMS: ¿es normal que algunos jóvenes peguen el estirón antes y otros después?",
        reveal: "El crecimiento sigue curvas individuales reguladas por la genética y las hormonas en una ventana de varios años; no estar en el primer grupo no indica ninguna enfermedad.",
        studentReveal: "La evidencia demuestra que el estirón ocurre en distintas edades según los genes de cada persona, entre los 10 y 16 años, siendo totalmente normal."
      },
      {
        context: "Caso 2: Superación de estereotipos en el aula",
        question: "En una clase de tecnología y robótica, un grupo afirma que los puestos de programación son solo para hombres y que las mujeres deberían dedicarse solo a la decoración del proyecto. ¿Por qué esta afirmación es un estereotipo sin fundamento y qué impacto negativo genera?",
        expected: "Es un estereotipo infundado porque no existe diferencia biológica o cognitiva en la capacidad intelectual o tecnológica entre géneros; genera discriminación, limita el desarrollo vocacional de las alumnas y empobrece el trabajo en equipo.",
        success: "¡Muy bien analizado! La ciencia cognitiva confirma que el intelecto y el talento no dependen del género biológico.",
        support: "Fíjate en las capacidades intelectuales: ¿hay cerebros masculinos o femeninos para programar o es una habilidad universal?",
        reveal: "Los estereotipos de género limitan el talento humano sobre la base de prejuicios culturales sin base biológica ni psicológica.",
        studentReveal: "Es un estereotipo porque hombres y mujeres tienen la misma capacidad mental para programar y hacer ciencia."
      }
    ],
    practice:`;

c5Content = c5Content.replace(c5OldPostRegex, c5NewPostStr);

// Cierre teleologico en Clase 5
c5Content = c5Content.replace(
  `speakerNotes: "Recuerda la regla de oro: la ciencia desmiente prejuicios; cada cuerpo crece a su propio ritmo genético. ¡Ahora demostraremos este pensamiento crítico en la plataforma!",`,
  `speakerNotes: "Recuerda la regla de oro: la ciencia desmiente prejuicios; cada cuerpo crece a su propio ritmo genético entre los 10 y 16 años. ¡Ahora pon a prueba lo aprendido resolviendo las actividades prácticas en la plataforma interactiva!",`
);

fs.writeFileSync(c5Path, c5Content, 'utf8');
console.log('Clase 5 actualizada correctamente.');

// 6. Modificar scripts/ciencias_data/clase06_data.ts
const c6Path = path.resolve('scripts/ciencias_data/clase06_data.ts');
let c6Content = fs.readFileSync(c6Path, 'utf8');

// Actualizar prompts en Clase 6
const c6Prompts = [
  {
    target: `visualPrompt: "Modern anime style. Wide angle of a high-tech science examination hall, holographic test questions floating gently with clean options A, B, C, D illuminated in soft cyan and gold. Positive mastery. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, in a high-tech science examination hall, with clean multiple-choice options A, B, C, D softly illuminated in cyan. Positive mastery, clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. A panoramic holographic map synthesizing the 4 dimensions: biological anatomy, affective emotions, social interactions, and ethical values. Complete unity. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, observing a panoramic holographic map synthesizing the biological, affective, social, and ethical dimensions. Ample negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Detailed endocrine feedback loop diagram: hypothalamus, pituitary gland, LH/FSH, gonads, and secondary sexual characteristics. High clinical precision. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, examining an endocrine feedback loop diagram showing the pituitary gland and secondary sexual characteristics. Clinical precision, clean negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. An emblem of dignity and mutual respect with four interlocking rings: Free, Informed, Specific, Revocable. Gold and cyan glow. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, holding an emblem of mutual dignity and consent with four interlocking glowing rings. Generous negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. An official MINEDUC standard growth percentile chart with diverse student silhouettes standing proudly on their normal growth tracks. Biological diversity. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, analyzing an official MINEDUC growth percentile chart demonstrating normal developmental tracks between 10 and 16 years. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Two confident adolescent students holding a polished brass key and looking at the gateway of the Free Examination, ready and prepared. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, holding a golden key of scientific knowledge, prepared to master the official examination. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Both explorers with their science notebooks fully completed, looking ahead with triumphant, focused smiles. StudioSimple gold emblem. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, with their science notebooks fully completed, smiling with triumphant focus. StudioSimple badge, clean negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style 16:9. The boy and girl standing before a massive exam review board showing an official MINEDUC-style multiple choice item with options A, B, C, D clearly laid out. Clean typography. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing before an exam review board showing an official multiple choice item with options A, B, C, D clearly laid out. Ample negative space on top. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. The boy pointing at the correct option B on the screen, surrounded by a subtle green aura of scientific confirmation and valid evidence. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, pointing at the correct option B on the screen, highlighted by a subtle green aura of valid scientific evidence. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. The girl demonstrating the discard of options A, C, and D with three soft red crosses and explanatory notes in the margin. Systematic method. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, demonstrating the systematic discard of distractors A, C, and D with clinical reasoning on a digital display. Generous negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. Four interconnected concept pillars labeled 'Dimensiones', 'Pubertad y Hormonas', 'Consentimiento' y 'Mitos Derribados' forming a solid classical temple. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing beside four solid pillars representing dimensions, pubertal hormones, consent, and scientific evidence. Clear negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. A student carefully filling out an official bubble answer sheet with a number 2 pencil, calm and confident, with a clean clock showing plenty of time. Mastery. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, reviewing an official bubble answer sheet on their study desk, calm and confident with plenty of time. Ample negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style 16:9. The boy and girl analyzing an official four-choice exam card on their desk, comparing reasoning notes before marking option B. Complete rigor. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, analyzing an official four-choice exam card on their desk, comparing reasoning notes before selecting option B. Clean lineart, generous negative space. No text drawn by AI.",`
  },
  {
    target: `visualPrompt: "Modern anime style. StudioSimple gold laurel emblem with the text 'Ciencias 7° Básico · OA 1 Certificado'. Clean royal blue and gold geometry with triumphant lighting. No text drawn by AI.",`,
    replacement: `visualPrompt: "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, presenting a golden laurel emblem of curricular mastery in Ciencias Naturales OA 01. StudioSimple badge, clean negative space. No text drawn by AI.",`
  }
];

c6Prompts.forEach((p) => {
  if (c6Content.includes(p.target)) {
    c6Content = c6Content.replace(p.target, p.replacement);
  }
});

// Reutilizacion fiel en postQuestions para Clase 6
const c6OldPostRegex = /postQuestions:\s*\[[\s\S]*?\],\s*practice:/;
const c6NewPostStr = `postQuestions: [
      {
        context: "Caso 1: Ítem oficial de selección múltiple (Estándar MINEDUC)",
        question: "Un examen oficial presenta la siguiente pregunta de selección múltiple:\\n'Durante una clase de Ciencias Naturales, los estudiantes debaten sobre la sexualidad humana. Uno de ellos afirma que la sexualidad se limita exclusivamente a los procesos biológicos de maduración de los órganos reproductores y a la capacidad de procrear.'\\nA partir de las Bases Curriculares del MINEDUC, ¿cuál de las siguientes opciones refuta con mayor precisión científica y pedagógica dicha afirmación?\\nA) La afirmación es correcta porque las hormonas y los caracteres sexuales primarios son las únicas variables medibles empíricamente.\\nB) La afirmación es incompleta porque la sexualidad humana es una dimensión integral que involucra aspectos biológicos, afectivos, psicológicos, socioculturales y éticos a lo largo de toda la vida.\\nC) La afirmación es incorrecta porque la sexualidad solo comienza en la adultez cuando se forman vínculos legales formales.\\nD) La afirmación es válida únicamente para la etapa de la pubertad, pues en la niñez no existen influencias afectivas ni sociales.\\n\\nIndica la alternativa correcta y justifica por qué descartaste las otras tres opciones.",
        expected: "La alternativa correcta es la B. Se descarta la opción A porque es un reduccionismo biológico falso; se descarta la C porque la sexualidad se vive en todas las etapas del ciclo vital y no solo en la adultez; y se descarta la D porque las dimensiones afectivas y sociales están presentes desde la primera infancia.",
        success: "¡Extraordinario desempeño evaluativo! Has seleccionado la clave B y justificado con rigor el descarte psicométrico de cada distractor.",
        support: "Recuerda el caso modelado en el video: identifica la opción que describe la sexualidad como una vivencia integral y explica los fallos de las demás.",
        reveal: "La opción B es la única canónicamente correcta; las alternativas A, C y D contienen errores conceptuales de reduccionismo, cronología y etapas de desarrollo.",
        studentReveal: "La correcta es la B. La A es falsa por reduccionista, la C porque la sexualidad dura toda la vida y la D porque el afecto existe desde que nacemos."
      },
      {
        context: "Caso 2: Ítem de aplicación sobre caracteres sexuales y hormonas",
        question: "Un ítem del examen pregunta: '¿Qué relación de causalidad existe entre la secreción de testosterona en los testículos durante la pubertad y la aparición de caracteres sexuales secundarios en el varón?'\\nA) La testosterona inhibe el desarrollo muscular para permitir el cambio de tono de voz.\\nB) La testosterona estimula el crecimiento de la laringe, el desarrollo óseo-muscular y la aparición de vello facial y corporal.\\nC) La testosterona solo actúa sobre los túbulos seminíferos y no tiene efectos en el resto del cuerpo.\\nD) La testosterona es producida por la hipófisis y destruye las glándulas sudoríparas.\\n\\nSelecciona la alternativa correcta y explica brevemente su funcionamiento biológico.",
        expected: "La alternativa correcta es la B. La testosterona es la hormona esteroidea producida en las células de Leydig de los testículos que, al circular por la sangre, estimula los receptores de tejidos blanco provocando engrosamiento de cuerdas vocales, masa muscular y vello corporal.",
        success: "¡Brillante precisión biológica! Identificaste la acción fisiológica exacta de la testosterona sobre los caracteres secundarios.",
        support: "Analiza el rol de la testosterona en el cuerpo masculino: ¿estimula o inhibe el crecimiento de tejidos?",
        reveal: "La opción B describe fielmente la acción androgénica sobre los tejidos efectores; A, C y D contienen errores anatómicos y fisiológicos graves.",
        studentReveal: "La alternativa B, porque la testosterona estimula la laringe, los músculos y el vello."
      }
    ],
    practice:`;

c6Content = c6Content.replace(c6OldPostRegex, c6NewPostStr);

// Cierre teleologico en Clase 6
c6Content = c6Content.replace(
  `speakerNotes: "Recuerda la regla de oro: la justificación científica y el descarte riguroso de distractores garantizan el éxito en la evaluación. ¡Ahora demostraremos este dominio en la plataforma!",`,
  `speakerNotes: "Recuerda la regla de oro: la justificación científica y el descarte de distractores aseguran el éxito en el examen. ¡Ahora pon a prueba lo aprendido resolviendo las actividades prácticas en la plataforma interactiva!",`
);

fs.writeFileSync(c6Path, c6Content, 'utf8');
console.log('Clase 6 actualizada correctamente.');

console.log('\nTodos los archivos fuente de Ciencias OA 01 han sido calibrados y sincronizados.');
