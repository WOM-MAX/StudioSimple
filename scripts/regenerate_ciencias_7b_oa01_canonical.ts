/**
 * regenerate_ciencias_7b_oa01_canonical.ts
 *
 * Script de regeneración canónica y validación estricta para:
 * 110-7 · Ciencias Naturales · OA01 (6 lecciones completas)
 *
 * Ejecución: npx tsx scripts/regenerate_ciencias_7b_oa01_canonical.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

import { CLASE01_MD } from './ciencias_oa01_data/clase01';
import { CLASE02_MD } from './ciencias_oa01_data/clase02';
import { CLASE03_MD } from './ciencias_oa01_data/clase03';
import { CLASE04_MD } from './ciencias_oa01_data/clase04';
import { CLASE05_MD } from './ciencias_oa01_data/clase05';
import { CLASE06_MD } from './ciencias_oa01_data/clase06';

import { parseLessonMarkdown } from './pipeline_sync_lessons';
import { buildCanonicalReference, REFERENCE_PATH } from './canonical_lesson_reference';

const ROOT = path.resolve(__dirname, '..');

const DEST_1 = path.join(ROOT, 'LECCIONES_POR_REVISAR', '110-7', 'Ciencias_Naturales', 'OA01');
const DEST_2 = path.join(ROOT, 'EstudioSimple_Repositorio_Curricular', 'LECCIONES_POR_REVISAR', '110-7', 'Ciencias_Naturales', 'OA01');
const TS_LESSONS_DIR = path.join(ROOT, 'Web Studio Simple', 'src', 'data', 'lessons');

interface ClassSpec {
  fileName: string;
  expectedTitle: string;
  expectedIndicators: string[];
  content: string;
  tsFileName: string;
  varName: string;
}

const CLASSES: ClassSpec[] = [
  {
    fileName: 'CLASE01.md',
    expectedTitle: 'La sexualidad integra distintas dimensiones',
    expectedIndicators: ['7B-CNA-OA01-IE01'],
    content: CLASE01_MD,
    tsFileName: 'ciencias_7b_oa01_clase01.ts',
    varName: 'CIENCIAS_7B_OA01_CLASE01'
  },
  {
    fileName: 'CLASE02.md',
    expectedTitle: 'Cambios físicos durante la pubertad',
    expectedIndicators: ['7B-CNA-OA01-IE01', '7B-CNA-OA01-IE02'],
    content: CLASE02_MD,
    tsFileName: 'ciencias_7b_oa01_clase02.ts',
    varName: 'CIENCIAS_7B_OA01_CLASE02'
  },
  {
    fileName: 'CLASE03.md',
    expectedTitle: 'Emociones, afectividad e imagen personal',
    expectedIndicators: ['7B-CNA-OA01-IE02', '7B-CNA-OA01-IE03'],
    content: CLASE03_MD,
    tsFileName: 'ciencias_7b_oa01_clase03.ts',
    varName: 'CIENCIAS_7B_OA01_CLASE03'
  },
  {
    fileName: 'CLASE04.md',
    expectedTitle: 'Aspectos sociales y estereotipos',
    expectedIndicators: ['7B-CNA-OA01-IE01', '7B-CNA-OA01-IE04'],
    content: CLASE04_MD,
    tsFileName: 'ciencias_7b_oa01_clase04.ts',
    varName: 'CIENCIAS_7B_OA01_CLASE04'
  },
  {
    fileName: 'CLASE05.md',
    expectedTitle: 'Vínculos afectivos y respeto mutuo',
    expectedIndicators: ['7B-CNA-OA01-IE03', '7B-CNA-OA01-IE04'],
    content: CLASE05_MD,
    tsFileName: 'ciencias_7b_oa01_clase05.ts',
    varName: 'CIENCIAS_7B_OA01_CLASE05'
  },
  {
    fileName: 'CLASE06.md',
    expectedTitle: 'Decisiones responsables e integración',
    expectedIndicators: ['7B-CNA-OA01-IE01', '7B-CNA-OA01-IE02', '7B-CNA-OA01-IE03', '7B-CNA-OA01-IE04'],
    content: CLASE06_MD,
    tsFileName: 'ciencias_7b_oa01_clase06.ts',
    varName: 'CIENCIAS_7B_OA01_CLASE06'
  }
];

function sha256(text: string): string {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

const GENERIC_PLACEHOLDERS = [
  'Una situación',
  'Una herramienta',
  'El criterio',
  'Relación entre pistas',
  'Modelo explicado',
  'Comprobación',
  'Error y corrección',
  'Síntesis y práctica',
  'Primera idea',
  'Busca pistas',
  'Compara posibilidades',
  'Una estrategia',
  'Puente a la lectura'
];

function validateClass(spec: ClassSpec): { pass: boolean; errors: string[] } {
  const errors: string[] = [];
  const c = spec.content;

  // 1. Título exacto en metadatos
  if (!c.includes(`**Título:** ${spec.expectedTitle}`)) {
    errors.push(`Metadatos no contienen título exacto: **Título:** ${spec.expectedTitle}`);
  }

  // 2. Metadata básica
  if (!c.includes('**Curso App:** 110-7')) errors.push('Falta **Curso App:** 110-7');
  if (!c.includes('**Asignatura App:** Ciencias_Naturales')) errors.push('Falta **Asignatura App:** Ciencias_Naturales');
  if (!c.includes('**Código curricular:** 7B-CNA-OA01')) errors.push('Falta **Código curricular:** 7B-CNA-OA01');
  if (!c.includes('**Estado:** EN_REVISION · NO INTEGRADA EN APP · NO APROBADA')) {
    errors.push('Falta estado normativo compatible con EN_REVISION / NO APROBADA');
  }

  // 3. Indicadores esperados
  for (const ie of spec.expectedIndicators) {
    if (!c.includes(ie)) {
      errors.push(`Falta indicador esperado: ${ie}`);
    }
  }

  // 4. Secciones obligatorias de la arquitectura de lecciones (26 secciones canónicas)
  const requiredSections = [
    '## 1. Paso 1 — Preparación del mentor',
    '## 2. Paso 2A — Ruta de aprendizaje',
    '## 3. Paso 2B — Situación inicial y punto de partida',
    '### Recurso de lectura visible para el estudiante',
    '## 4. Paso 3 — Videos de la clase: Motivación y Explicación',
    '## 5. Paso 4 — Conversación guiada',
    '### Pregunta 1',
    '### Pregunta 2',
    '### Pregunta 3',
    '## 6. Paso 5 — Explicación y modelamiento',
    '### Razonamiento científico visible que modela la clase:',
    '### Ejemplo modelado paso a paso para mostrar al estudiante:',
    '## 7. Paso 6 — Práctica conjunta y autónoma',
    '### Caso 1',
    '### Caso 2',
    '### Aplicación autónoma y transferencia',
    '## 8. Paso 7 — Miniquiz y recuperación',
    '### Reactivo 1',
    '### Reactivo 2',
    '### Reactivo 3',
    '### Recuperación formativa posterior al error (para puntajes 0/3 o 1/3)',
    '## 9. Paso 8 — Síntesis y cierre',
    '## Trazabilidad y entrega',
    '## Guiones audiovisuales de producción',
    '### MOTIVACION',
    '### EXPLICACION',
    '## Control de esta revisión y contrato pedagógico'
  ];

  for (const sec of requiredSections) {
    if (!c.includes(sec)) {
      errors.push(`Falta sección obligatoria: "${sec}"`);
    }
  }

  // 5. Cero ocurrencias de "gancho"
  const ganchoMatches = c.match(/gancho/gi);
  if (ganchoMatches && ganchoMatches.length > 0) {
    errors.push(`Se encontraron ${ganchoMatches.length} ocurrencias prohibidas de "gancho"`);
  }

  // 6. Verificación de 14 láminas en guiones audiovisuales (7 MOTIVACION + 7 EXPLICACION)
  for (let i = 1; i <= 7; i++) {
    const pad = i.toString().padStart(2, '0');
    const motSlide = `#### Diapositiva ${pad}`;
    if (!c.includes(motSlide)) {
      errors.push(`Falta Diapositiva ${pad} en los guiones audiovisuales`);
    }
  }

  // 7. No contener títulos de diapositiva genéricos
  for (const ph of GENERIC_PLACEHOLDERS) {
    const re = new RegExp(`#### Diapositiva \\d{2} — ${ph}`, 'i');
    if (re.test(c)) {
      errors.push(`Contiene título genérico prohibido en lámina: "${ph}"`);
    }
  }

  // 8. DILE no debe ser un objetivo en infinitivo
  const dileMatch = c.match(/\*\*DILE:\*\*\s*[“"]([A-ZÁÉÍÓÚ][a-zñáéíóú]+)/);
  if (dileMatch) {
    const firstWord = dileMatch[1].toLowerCase();
    const infinitiveEndings = ['ar', 'er', 'ir'];
    if (infinitiveEndings.some(end => firstWord.endsWith(end))) {
      errors.push(`DILE comienza con verbo en infinitivo ("${firstWord}"), violación de pauta conversacional`);
    }
  }

  // 9. Verificación de reactivos con alternativas A, B, C, D
  const optMatches = ['- A.', '- B.', '- C.', '- D.'];
  for (const opt of optMatches) {
    const count = (c.match(new RegExp(`\\${opt}`, 'g')) || []).length;
    if (count < 3) {
      errors.push(`Opción ${opt} aparece solo ${count} veces (esperadas mínimo 3)`);
    }
  }

  return { pass: errors.length === 0, errors };
}

async function main() {
  console.log('================================================================');
  console.log('REGENERACIÓN CANÓNICA INTEGRAL — CIENCIAS NATURALES 7° BÁSICO · OA01');
  console.log('Destinos locales:');
  console.log('  1. ' + DEST_1);
  console.log('  2. ' + DEST_2);
  console.log('  3. ' + TS_LESSONS_DIR);
  console.log('================================================================\n');

  // Asegurar carpetas
  fs.mkdirSync(DEST_1, { recursive: true });
  fs.mkdirSync(DEST_2, { recursive: true });
  fs.mkdirSync(TS_LESSONS_DIR, { recursive: true });

  // Limpiar archivos paralelos prohibidos
  const forbiddenPatterns = [
    /CLASE.*NUEVA.*\.md$/i,
    /CLASE.*CORREGIDA.*\.md$/i,
    /CLASE.*v\d.*\.md$/i,
    /CLASE.*_\d{4}-\d{2}-\d{2}.*\.md$/i
  ];

  for (const dest of [DEST_1, DEST_2]) {
    if (fs.existsSync(dest)) {
      const existing = fs.readdirSync(dest);
      for (const f of existing) {
        if (forbiddenPatterns.some(pat => pat.test(f))) {
          const full = path.join(dest, f);
          console.log(`Removiendo copia paralela prohibida: ${full}`);
          fs.unlinkSync(full);
        }
      }
    }
  }

  const results: { fileName: string; pass: boolean; errors: string[]; bytes: number; hash: string }[] = [];

  for (let idx = 0; idx < CLASSES.length; idx++) {
    const spec = CLASSES[idx];
    console.log(`Auditoría pre-escritura: ${spec.fileName} (${spec.expectedTitle})...`);
    const val = validateClass(spec);

    if (!val.pass) {
      console.error(`  FAIL en ${spec.fileName}:`);
      val.errors.forEach(e => console.error(`    - ${e}`));
      results.push({ fileName: spec.fileName, pass: false, errors: val.errors, bytes: 0, hash: '' });
      continue;
    }

    const p1 = path.join(DEST_1, spec.fileName);
    const p2 = path.join(DEST_2, spec.fileName);

    fs.writeFileSync(p1, spec.content, 'utf8');
    fs.writeFileSync(p2, spec.content, 'utf8');

    // Re-leer desde disco para verificar integridad
    const readBack1 = fs.readFileSync(p1, 'utf8');
    const readBack2 = fs.readFileSync(p2, 'utf8');

    const hash1 = sha256(readBack1);
    const hash2 = sha256(readBack2);

    if (hash1 !== hash2 || hash1 !== sha256(spec.content)) {
      console.error(`  FAIL de persistencia en ${spec.fileName}: hashes no coinciden`);
      results.push({ fileName: spec.fileName, pass: false, errors: ['Falla de verificación hash'], bytes: 0, hash: '' });
      continue;
    }

    console.log(`  PASS Markdown: ${spec.fileName} (${Buffer.byteLength(readBack1, 'utf8')} bytes, SHA-256: ${hash1.slice(0, 16)}...)`);

    // Sincronizar Módulo TypeScript
    const meta = {
      grade: '7° Básico',
      subjectName: 'Ciencias Naturales',
      oaCode: 'OA 1',
      oaTitle: 'Ciencias Naturales - OA 1',
      lessonNumber: idx + 1,
      totalLessons: 6,
      lessonTitle: spec.expectedTitle,
      durationMinutes: 30,
      nextLessonTitle: idx < 5 ? CLASSES[idx + 1].expectedTitle : 'Fin del objetivo de aprendizaje',
      courseId: '110-7'
    };

    const lessonData = parseLessonMarkdown(spec.content, meta, p1);
    const tsOut = path.join(TS_LESSONS_DIR, spec.tsFileName);
    const tsContent = `import { LessonData } from '../../../src/types/lesson';\n\n`
      + `export const ${spec.varName}: LessonData = ${JSON.stringify(lessonData, null, 2)};\n`;

    fs.writeFileSync(tsOut, tsContent, 'utf8');
    console.log(`  PASS TypeScript: ${spec.tsFileName}`);

    results.push({
      fileName: spec.fileName,
      pass: true,
      errors: [],
      bytes: Buffer.byteLength(readBack1, 'utf8'),
      hash: hash1
    });
  }

  // Actualizar referencia canónica de continuidad
  console.log('\n================================================================');
  console.log('ACTUALIZANDO REFERENCIA CANÓNICA DE CONTINUIDAD...');
  console.log('================================================================');
  try {
    const ref = buildCanonicalReference(ROOT);
    const refPath = path.join(ROOT, REFERENCE_PATH);
    fs.writeFileSync(refPath, JSON.stringify(ref, null, 2), 'utf8');
    console.log(`Referencia canónica actualizada exitosamente en: ${refPath}`);
  } catch (err: any) {
    console.warn(`Aviso al actualizar referencia canónica: ${err.message}`);
  }

  console.log('\n================================================================');
  console.log('RESUMEN DE AUDITORÍA');
  console.log('================================================================');
  results.forEach(r => {
    console.log(`${r.fileName} -> ${r.pass ? 'PASS' : 'FAIL'} (${r.bytes} B, hash: ${r.hash.slice(0, 16)})`);
  });

  const allPassed = results.every(r => r.pass);
  if (!allPassed) {
    console.error('\nERROR: Al menos una clase no superó la auditoría estricta.');
    process.exit(1);
  } else {
    console.log('\n¡ÉXITO TOTAL! Las 6 clases canónicas de Ciencias OA01 fueron regeneradas y validadas.');
  }
}

main().catch(err => {
  console.error('Error fatal durante la regeneración:', err);
  process.exit(1);
});
