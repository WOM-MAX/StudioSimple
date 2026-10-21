import * as fs from 'fs';
import * as path from 'path';

// Definición canónica de títulos temáticos oficiales extraídos de los H1 de las fuentes Markdown de Work
// y puentes de continuidad oficiales por asignatura
const TITLES_MAP: Record<string, { title: string; next: string }> = {
  // Ciencias Naturales OA01
  'ciencias_7b_oa01_clase01.ts': {
    title: 'La sexualidad integra distintas dimensiones',
    next: 'Cambios físicos durante la pubertad'
  },
  'ciencias_7b_oa01_clase02.ts': {
    title: 'Cambios físicos durante la pubertad',
    next: 'Emociones, afectividad e imagen personal'
  },
  'ciencias_7b_oa01_clase03.ts': {
    title: 'Emociones, afectividad e imagen personal',
    next: 'Aspectos sociales y estereotipos'
  },
  'ciencias_7b_oa01_clase04.ts': {
    title: 'Aspectos sociales y estereotipos',
    next: 'Vínculos afectivos y respeto mutuo'
  },
  'ciencias_7b_oa01_clase05.ts': {
    title: 'Vínculos afectivos y respeto mutuo',
    next: 'Decisiones responsables e integración'
  },
  'ciencias_7b_oa01_clase06.ts': {
    title: 'Decisiones responsables e integración',
    next: ''
  },

  // Historia, Geografía y Cs. Sociales OA02
  'historia_7b_oa02_clase01.ts': {
    title: '¿Dónde y cuándo comenzó la agricultura?',
    next: 'Domesticación y sedentarización'
  },
  'historia_7b_oa02_clase02.ts': {
    title: 'Domesticación y sedentarización',
    next: 'Explicar procesos mediante varias causas'
  },
  'historia_7b_oa02_clase03.ts': {
    title: 'Explicar procesos mediante varias causas',
    next: 'Técnicas agrícolas y excedentes'
  },
  'historia_7b_oa02_clase04.ts': {
    title: 'Técnicas agrícolas y excedentes',
    next: 'Excedentes, intercambio y evidencia'
  },
  'historia_7b_oa02_clase05.ts': {
    title: 'Excedentes, intercambio y evidencia',
    next: 'Transformaciones agrícolas y huellas en el presente'
  },
  'historia_7b_oa02_clase06.ts': {
    title: 'Transformaciones agrícolas y huellas en el presente',
    next: ''
  },

  // Inglés OA09
  'ingles_7b_oa09_clase01.ts': {
    title: 'Anne’s Birthday: Main Idea and Key Events',
    next: 'An opinion supported by the diary'
  },
  'ingles_7b_oa09_clase02.ts': {
    title: 'An opinion supported by the diary',
    next: 'Dates, times and explicit information'
  },
  'ingles_7b_oa09_clase03.ts': {
    title: 'Dates, times and explicit information',
    next: 'Reading a school email'
  },
  'ingles_7b_oa09_clase04.ts': {
    title: 'Reading a school email',
    next: 'Reading about a school garden'
  },
  'ingles_7b_oa09_clase05.ts': {
    title: 'Reading about a school garden',
    next: 'Comparing messages and showing understanding'
  },
  'ingles_7b_oa09_clase06.ts': {
    title: 'Comparing messages and showing understanding',
    next: ''
  },

  // Lengua y Literatura OA03
  'lengua_7b_oa03_clase01.ts': {
    title: 'Jimmy y Robutt: leer el ambiente y descubrir el conflicto',
    next: 'Acciones que cambian el conflicto'
  },
  'lengua_7b_oa03_clase02.ts': {
    title: 'Acciones que cambian el conflicto',
    next: 'Inferencias con evidencia del relato'
  },
  'lengua_7b_oa03_clase03.ts': {
    title: 'Inferencias con evidencia del relato',
    next: 'La voz del narrador y los personajes'
  },
  'lengua_7b_oa03_clase04.ts': {
    title: 'La voz del narrador y los personajes',
    next: 'El orden de los hechos y el recuerdo'
  },
  'lengua_7b_oa03_clase05.ts': {
    title: 'El orden de los hechos y el recuerdo',
    next: 'Comparar relatos con evidencia'
  },
  'lengua_7b_oa03_clase06.ts': {
    title: 'Comparar relatos con evidencia',
    next: ''
  }
};

const lessonsDir = path.join(__dirname, '../Web Studio Simple/src/data/lessons');

let modifiedCount = 0;

for (const [filename, info] of Object.entries(TITLES_MAP)) {
  const filePath = path.join(lessonsDir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Reemplazar lessonTitle
  const titleRegex = /"lessonTitle":\s*"[^"]*"/;
  if (titleRegex.test(content)) {
    const newTitleStr = `"lessonTitle": "${info.title}"`;
    if (!content.includes(newTitleStr)) {
      content = content.replace(titleRegex, newTitleStr);
      changed = true;
    }
  }

  // Reemplazar dileObjective si contiene "Una situación"
  const dileObjRegex = /"dileObjective":\s*"Una situación"/g;
  if (dileObjRegex.test(content)) {
    content = content.replace(dileObjRegex, `"dileObjective": "${info.title}"`);
    changed = true;
  }

  // Reemplazar nextLessonTitle
  const nextRegex = /"nextLessonTitle":\s*"[^"]*"/;
  if (nextRegex.test(content)) {
    const newNextStr = `"nextLessonTitle": "${info.next}"`;
    if (!content.includes(newNextStr)) {
      content = content.replace(nextRegex, newNextStr);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[OK] Updated ${filename} => title: "${info.title}", next: "${info.next}"`);
    modifiedCount++;
  } else {
    console.log(`[SKIP] Already up-to-date ${filename}`);
  }
}

console.log(`\nTotal lessons updated: ${modifiedCount}`);
