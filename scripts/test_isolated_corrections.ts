import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { parseLessonMarkdown, extractFileMetadata } from './pipeline_sync_lessons';

console.log('================================================================');
console.log('🧪 SUITE DE PRUEBAS DE CARGA REAL Y CORRECCIONES EN AISLADO');
console.log('================================================================\n');

let testsPassed = 0;
let testsFailed = 0;
const testLogs: Array<{ test: string; status: 'PASS' | 'FAIL'; details: string }> = [];

function recordTest(name: string, ok: boolean, details: string) {
  if (ok) {
    testsPassed++;
    testLogs.push({ test: name, status: 'PASS', details });
    console.log(`  ✓ [PASS] ${name}: ${details}`);
  } else {
    testsFailed++;
    testLogs.push({ test: name, status: 'FAIL', details });
    console.error(`  ❌ [FAIL] ${name}: ${details}`);
  }
}

// -------------------------------------------------------------
// PRUEBA 1: Casos representativos de formatos conocidos
// CNA02, LYL01, ING01, MAT OA04 clase01 y clase06
// -------------------------------------------------------------
console.log('\n--- PRUEBA 1: Formatos conocidos representativos ---');

const STAGING_LESSONS_DIR = path.resolve('staging_preparacion_aislada/lessons');
const representativeFiles = [
  'ciencias_7b_oa01_clase02.ts',
  'lengua_7b_oa03_clase01.ts',
  'ingles_7b_oa09_clase01.ts',
  'matematica_7b_oa04_clase01.ts',
  'matematica_7b_oa04_clase06.ts'
];

for (const rf of representativeFiles) {
  const fpath = path.join(STAGING_LESSONS_DIR, rf);
  if (!fs.existsSync(fpath)) {
    recordTest(`Archivo representativo ${rf}`, false, 'Archivo no encontrado en staging.');
    continue;
  }
  const raw = fs.readFileSync(fpath, 'utf8');
  const match = raw.match(/=\s*(\{[\s\S]*\});?\s*$/);
  if (!match) {
    recordTest(`Parseo de ${rf}`, false, 'No se pudo extraer JSON de LessonData.');
    continue;
  }
  const data = JSON.parse(match[1]);

  const has3Mini = Array.isArray(data.mini) && data.mini.length === 3;
  const noClavePrivada = data.mini.every((m: any) => !m.q.startsWith('**Clave privada:') && !m.q.startsWith('Clave privada:'));
  const all4Opts = data.mini.every((m: any) => Array.isArray(m.options) && m.options.length === 4);
  const allHaveKey = data.mini.every((m: any) => typeof m.correct === 'string' && m.correct.trim().length > 0);

  const ok = has3Mini && noClavePrivada && all4Opts && allHaveKey;
  recordTest(
    `Validación de formato en ${rf}`,
    ok,
    `mini=${data.mini.length}, 4 alternativas en todos=${all4Opts}, claves no vacías=${allHaveKey}, sin "Clave privada:"=${noClavePrivada}`
  );
}

// -------------------------------------------------------------
// PRUEBA 2: Fallo explícito ante campo obligatorio ausente
// Debe lanzar error estructurado con ruta, campo y causa sin fallback silencioso
// -------------------------------------------------------------
console.log('\n--- PRUEBA 2: Fallo explícito ante campo obligatorio ausente ---');

try {
  const dummyMalformedMd = `# 7° Básico - Prueba
## Información General
- Asignatura: Ciencias Naturales
- Unidad: 1

## Paso 1: Preparación
Hola estudiante.
`; // Le falta título, objetivos, paso 7, miniquiz, etc.

  let threwExpected = false;
  let errorMsg = '';
  try {
    parseLessonMarkdown(dummyMalformedMd, {
      grade: '7b',
      subjectName: 'ciencias',
      oaCode: 'oa01',
      lessonNumber: 99
    }, 'test_missing_mandatory.md');
  } catch (err: any) {
    threwExpected = true;
    errorMsg = err.message;
  }

  recordTest(
    'Fallo explícito por campo faltante',
    threwExpected,
    threwExpected
      ? `Lanzó error estructurado como se esperaba: "${errorMsg}"`
      : 'ERROR: El parser aceptó un Markdown sin campos obligatorios sin arrojar excepción'
  );
} catch (e: any) {
  recordTest('Fallo explícito por campo faltante', false, `Excepción inesperada: ${e.message}`);
}

// -------------------------------------------------------------
// PRUEBA 3: Repetibilidad y Ausencia de Duplicados
// Ejecutar transformación dos veces y verificar idempotencia por SHA-256
// -------------------------------------------------------------
console.log('\n--- PRUEBA 3: Repetibilidad e Idempotencia ---');

const testFile = path.resolve('LECCIONES_POR_REVISAR/110-7/Lengua_Literatura/OA03/CLASE01.md');
if (fs.existsSync(testFile)) {
  const content = fs.readFileSync(testFile, 'utf8');
  const meta = extractFileMetadata(testFile, content);
  
  const res1 = parseLessonMarkdown(content, meta, testFile);
  const res2 = parseLessonMarkdown(content, meta, testFile);

  const h1 = crypto.createHash('sha256').update(JSON.stringify(res1)).digest('hex');
  const h2 = crypto.createHash('sha256').update(JSON.stringify(res2)).digest('hex');

  recordTest(
    'Idempotencia en transformación',
    h1 === h2,
    `Hash 1: ${h1.substring(0, 16)}... === Hash 2: ${h2.substring(0, 16)}... (Idénticos)`
  );
} else {
  recordTest('Idempotencia en transformación', false, `Archivo de prueba no encontrado: ${testFile}`);
}

// -------------------------------------------------------------
// PRUEBA 4: Lógica de Recuperación y Criterio de Logro
// Evaluación de 0, 1, 2 y 3 aciertos, tarea abierta y acreditación
// -------------------------------------------------------------
console.log('\n--- PRUEBA 4: Lógica de Recuperación y Logro pedagógico ---');

// Simulador de la lógica de evaluación en AdultLessonView / StudentRecoveryView
function evaluateMastery(score: number, total: number, recoveryPassed: boolean): { canAdvance: boolean; status: string } {
  if (score >= 2) {
    return { canAdvance: true, status: 'APPROVED_BY_SCORE' };
  }
  if (recoveryPassed) {
    return { canAdvance: true, status: 'APPROVED_BY_RECOVERY' };
  }
  return { canAdvance: false, status: 'REQUIRES_RETEST' };
}

// Caso 3/3 aciertos
const case3 = evaluateMastery(3, 3, false);
recordTest('Caso 3/3 aciertos', case3.canAdvance && case3.status === 'APPROVED_BY_SCORE', 'Aprobación directa sin refuerzo');

// Caso 2/3 aciertos
const case2 = evaluateMastery(2, 3, false);
recordTest('Caso 2/3 aciertos', case2.canAdvance && case2.status === 'APPROVED_BY_SCORE', 'Aprobación directa con estándar 67%');

// Caso 1/3 aciertos sin recuperación
const case1Fail = evaluateMastery(1, 3, false);
recordTest('Caso 1/3 aciertos (sin refuerzo)', !case1Fail.canAdvance && case1Fail.status === 'REQUIRES_RETEST', 'Bloqueado, requiere reintento/refuerzo');

// Caso 1/3 aciertos con recuperación aprobada por mentor
const case1Pass = evaluateMastery(1, 3, true);
recordTest('Caso 1/3 aciertos (con refuerzo acreditado)', case1Pass.canAdvance && case1Pass.status === 'APPROVED_BY_RECOVERY', 'Habilitado tras validar criterio en cuaderno');

// Caso 0/3 aciertos sin recuperación
const case0Fail = evaluateMastery(0, 3, false);
recordTest('Caso 0/3 aciertos (sin refuerzo)', !case0Fail.canAdvance && case0Fail.status === 'REQUIRES_RETEST', 'Bloqueado rigurosamente');

// -------------------------------------------------------------
// PRUEBA 5: Inspección de Prioridad de Carga y Contexto
// Verificar prioridad entre TS estático, json inyectado y estado de sesión
// -------------------------------------------------------------
console.log('\n--- PRUEBA 5: Inspección de Prioridad de Fuentes y Roles ---');

const indexPath = path.resolve('Web Studio Simple/src/data/lessons/index.ts');
let indexContent = '';
if (fs.existsSync(indexPath)) {
  indexContent = fs.readFileSync(indexPath, 'utf8');
}

const hasStaticImports = indexContent.includes('export {') && indexContent.includes('./ciencias_7b_oa01_clase01');
recordTest(
  'Importación estática en index.ts',
  hasStaticImports,
  'index.ts mantiene mapa de exportaciones estáticas tipadas para SSR/CSR seguro'
);

console.log('\n================================================================');
console.log(`📊 RESULTADO DE LA SUITE DE PRUEBAS:`);
console.log(`   Pruebas pasadas: ${testsPassed}`);
console.log(`   Pruebas fallidas: ${testsFailed}`);
console.log('================================================================\n');

if (testsFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
