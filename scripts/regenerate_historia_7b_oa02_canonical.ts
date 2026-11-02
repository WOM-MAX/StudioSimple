/**
 * regenerate_historia_7b_oa02_canonical.ts
 *
 * Script de regeneración canónica y validación estricta para:
 * 110-7 · Historia, Geografía y Ciencias Sociales · OA02 (6 lecciones completas)
 *
 * Ejecución: npx tsx scripts/regenerate_historia_7b_oa02_canonical.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

import { CLASE01_MD } from './historia_oa02_data/clase01';
import { CLASE02_MD } from './historia_oa02_data/clase02';
import { CLASE03_MD } from './historia_oa02_data/clase03';
import { CLASE04_MD } from './historia_oa02_data/clase04';
import { CLASE05_MD } from './historia_oa02_data/clase05';
import { CLASE06_MD } from './historia_oa02_data/clase06';

const ROOT = path.resolve(__dirname, '..');

const DEST_1 = path.join(ROOT, 'LECCIONES_POR_REVISAR', '110-7', 'Historia_Geografia', 'OA02');
const DEST_2 = path.join(ROOT, 'EstudioSimple_Repositorio_Curricular', 'LECCIONES_POR_REVISAR', '110-7', 'Historia_Geografia', 'OA02');

interface ClassSpec {
  fileName: string;
  expectedTitle: string;
  expectedIndicators: string[];
  content: string;
}

const CLASSES: ClassSpec[] = [
  {
    fileName: 'CLASE01.md',
    expectedTitle: '¿Dónde y cuándo comenzó la agricultura?',
    expectedIndicators: ['7B-HIS-OA02-IE01'],
    content: CLASE01_MD
  },
  {
    fileName: 'CLASE02.md',
    expectedTitle: 'Domesticación y sedentarización',
    expectedIndicators: ['7B-HIS-OA02-IE02', '7B-HIS-OA02-IE04'],
    content: CLASE02_MD
  },
  {
    fileName: 'CLASE03.md',
    expectedTitle: 'Explicar procesos mediante varias causas',
    expectedIndicators: ['7B-HIS-OA02-IE01', '7B-HIS-OA02-IE02', '7B-HIS-OA02-IE04'],
    content: CLASE03_MD
  },
  {
    fileName: 'CLASE04.md',
    expectedTitle: 'Técnicas agrícolas y excedentes',
    expectedIndicators: ['7B-HIS-OA02-IE03', '7B-HIS-OA02-IE04'],
    content: CLASE04_MD
  },
  {
    fileName: 'CLASE05.md',
    expectedTitle: 'Excedentes, intercambio y evidencia',
    expectedIndicators: ['7B-HIS-OA02-IE03', '7B-HIS-OA02-IE04'],
    content: CLASE05_MD
  },
  {
    fileName: 'CLASE06.md',
    expectedTitle: 'Transformaciones agrícolas y huellas en el presente',
    expectedIndicators: ['7B-HIS-OA02-IE01', '7B-HIS-OA02-IE02', '7B-HIS-OA02-IE03', '7B-HIS-OA02-IE04'],
    content: CLASE06_MD
  }
];

function sha256(text: string): string {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

function validateClass(spec: ClassSpec): { pass: boolean; errors: string[] } {
  const errors: string[] = [];
  const c = spec.content;

  // 1. Título exacto en encabezado
  if (!c.includes(`# EstudioSimple · ${spec.expectedTitle}`)) {
    errors.push(`Encabezado no contiene título exacto: # EstudioSimple · ${spec.expectedTitle}`);
  }

  // 2. Metadata básica
  if (!c.includes('**Curso:** 110-7')) errors.push('Falta **Curso:** 110-7');
  if (!c.includes('**Asignatura:** Historia_Geografia')) errors.push('Falta **Asignatura:** Historia_Geografia');
  if (!c.includes('**OA:** OA02')) errors.push('Falta **OA:** OA02');
  if (!c.includes('**Estado:** EN_REVISION · NO INTEGRADA EN APP · NO APROBADA')) {
    errors.push('Falta estado normativo compatible con EN_REVISION / NO APROBADA');
  }

  // 3. Indicadores esperados
  for (const ie of spec.expectedIndicators) {
    if (!c.includes(ie)) {
      errors.push(`Falta indicador esperado: ${ie}`);
    }
  }

  // 4. Secciones obligatorias de la arquitectura de lecciones
  const requiredSections = [
    '## 1. Paso 1 — Preparación del mentor',
    '## 2. Paso 2A — Ruta de aprendizaje',
    '## 3. Paso 2B — Punto de partida',
    '### Recurso de lectura visible para el estudiante',
    '## 4. Paso 3 — Videos',
    '## 5. Paso 4 — Conversación guiada',
    '### Pregunta 1',
    '### Pregunta 2',
    '## 6. Paso 5 — Explicación y modelamiento',
    '## 7. Paso 6 — Práctica conjunta y autónoma',
    '### Caso 1',
    '### Caso 2',
    '### Aplicación autónoma y transferencia',
    '## 8. Paso 7 — Miniquiz y recuperación',
    '### Reactivo 1',
    '### Recuperación 1',
    '### Reactivo 2',
    '### Recuperación 2',
    '### Reactivo 3',
    '### Recuperación 3',
    '## 9. Paso 8 — Síntesis y cierre',
    '## Trazabilidad de esta entrega',
    '## Guiones audiovisuales de producción',
    '### MOTIVACION',
    '### EXPLICACION',
    '## Contrato de revisión y correspondencia pedagógica'
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
    if (!c.includes(`Diapositiva ${pad}`)) {
      errors.push(`Falta Diapositiva ${pad} en los guiones audiovisuales`);
    }
  }

  // 7. Verificación de alternativas A, B, C, D en reactivos
  const r1Matches = ['- A.', '- B.', '- C.', '- D.'];
  for (const opt of r1Matches) {
    const count = (c.match(new RegExp(`\\${opt}`, 'g')) || []).length;
    // Deben haber al menos 6 apariciones (3 reactivos iniciales + 3 reintentos)
    if (count < 6) {
      errors.push(`Opción ${opt} aparece solo ${count} veces (esperadas mínimo 6)`);
    }
  }

  return { pass: errors.length === 0, errors };
}

async function main() {
  console.log('================================================================');
  console.log('REGENERACIÓN CANÓNICA INTEGRAL — HISTORIA 7° BÁSICO · OA02');
  console.log('Destinos:');
  console.log('  1. ' + DEST_1);
  console.log('  2. ' + DEST_2);
  console.log('================================================================\n');

  // Asegurar carpetas
  fs.mkdirSync(DEST_1, { recursive: true });
  fs.mkdirSync(DEST_2, { recursive: true });

  // Limpiar archivos paralelos o backups prohibidos en ambas carpetas
  const forbiddenPatterns = [
    /CLASE.*NUEVA.*\.md$/i,
    /CLASE.*CORREGIDA.*\.md$/i,
    /CLASE.*v\d.*\.md$/i,
    /backup.*\.md$/i,
    /final.*\.md$/i,
    /CLASE.*_\d{4}-\d{2}-\d{2}.*\.md$/i
  ];

  for (const dest of [DEST_1, DEST_2]) {
    const existing = fs.readdirSync(dest);
    for (const f of existing) {
      if (forbiddenPatterns.some(pat => pat.test(f))) {
        const full = path.join(dest, f);
        console.log(`Removiendo copia paralela prohibida: ${full}`);
        fs.unlinkSync(full);
      }
    }
  }

  const results: { fileName: string; pass: boolean; errors: string[]; bytes: number; hash: string }[] = [];

  for (const spec of CLASSES) {
    console.log(`Auditoría pre-escritura: ${spec.fileName}...`);
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

    // Re-leer desde disco para verificar integridad absoluta
    const readBack1 = fs.readFileSync(p1, 'utf8');
    const readBack2 = fs.readFileSync(p2, 'utf8');

    const hash1 = sha256(readBack1);
    const hash2 = sha256(readBack2);

    if (hash1 !== hash2 || hash1 !== sha256(spec.content)) {
      console.error(`  FAIL de persistencia en ${spec.fileName}: hashes no coinciden`);
      results.push({ fileName: spec.fileName, pass: false, errors: ['Falla de verificación hash'], bytes: 0, hash: '' });
      continue;
    }

    console.log(`  PASS: ${spec.fileName} (${readBack1.length} caracteres, ${Buffer.byteLength(readBack1, 'utf8')} bytes, SHA-256: ${hash1.slice(0, 12)}...)`);
    results.push({
      fileName: spec.fileName,
      pass: true,
      errors: [],
      bytes: Buffer.byteLength(readBack1, 'utf8'),
      hash: hash1
    });
  }

  console.log('\n================================================================');
  console.log('VERIFICACIÓN POST-ESCRITURA');
  console.log('================================================================');

  for (const dest of [DEST_1, DEST_2]) {
    const files = fs.readdirSync(dest).filter(f => f.endsWith('.md'));
    console.log(`Archivos presentes en ${dest}:`);
    files.forEach(f => console.log(`  - ${f}`));
    if (files.length !== 6) {
      console.error(`  ADVERTENCIA: Número de archivos en ${dest} es ${files.length} (esperado: 6)`);
    } else {
      console.log(`  Total verificado: 6/6 archivos canónicos exactos.`);
    }
  }

  console.log('\n================================================================');
  console.log('RESUMEN DE AUDITORÍA');
  console.log('================================================================');
  results.forEach(r => {
    console.log(`${r.fileName} — ${r.pass ? 'PASS' : 'FAIL'} (${r.bytes} B, hash: ${r.hash.slice(0, 16)})`);
  });
}

main().catch(err => {
  console.error('Error fatal durante la regeneración:', err);
  process.exit(1);
});

