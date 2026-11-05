import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { buildCanonicalReference, loadCanonicalReference, parseSource, readLessonObject, validateBatch, MODULE_DIR, REFERENCE_PATH } from './canonical_lesson_reference';
import { runUniversalPipeline } from './pipeline_sync_lessons';

const root = path.resolve(__dirname, '..');
const auditor = path.join(__dirname, 'audit_structural_rules.ts');
function write(base: string, name: string, data: string) { const p = path.join(base, name); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, data); }
function metadata(n: number) {
  return { courseId: '110-7', grade: '7° Básico', subject: 'Ciencias Naturales', oaCode: 'OA 1', lessonNumber: n,
    totalLessonsInOa: 2, lessonTitle: n === 1 ? 'Primera clase' : 'Segunda clase', nextLessonTitle: n === 1 ? 'Segunda clase' : 'Fin del objetivo' };
}
function object(n: number) { return { metadata: metadata(n), preQuestions: [{ question: 'Pre' }], postQuestions: [{ question: 'Post' }], practice: [], summaryIdeas: [['Idea', 'Contenido'], ['Otra', 'Contenido 2']] }; }
const moduleName = (n: number) => `${MODULE_DIR}/ciencias_7b_oa01_clase0${n}.ts`;
function writeModule(base: string, n: number, change: (d: any) => void = () => {}) {
  const data = object(n); change(data); write(base, moduleName(n), `export const LESSON: LessonData = ${JSON.stringify(data)};`);
}
function fixture(t: any) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'work-auditor-')); t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  const manifest = { curso: '110-7', nivel: '7° Básico', asignatura: 'Ciencias_Naturales', oa: 'OA01', total_lecciones: 2,
    lecciones_construidas: [1, 2].map(n => ({ clase: n, archivo_ts: moduleName(n), archivo_md: `LECCIONES_POR_REVISAR/110-7/Ciencias_Naturales/OA01/CLASE0${n}.md` })) };
  write(base, 'LECCIONES/110-7/Ciencias_Naturales/OA01/manifest.json', JSON.stringify(manifest));
  for (const item of manifest.lecciones_construidas) {
    const n = item.clase;
    write(base, item.archivo_md, `# EstudioSimple · ${n === 1 ? 'Primera clase' : 'Segunda clase'}\n\n**Curso:** 110-7 · **Asignatura:** Ciencias_Naturales · **OA:** OA01 · **Clase:** 0${n} de 02\n${n === 2 ? '**Próxima clase:** Fin del objetivo\n' : ''}\n## 1. Paso 1\n**Título:** Una situación\n`);
    writeModule(base, n);
  }
  const ref = buildCanonicalReference(base); write(base, REFERENCE_PATH, JSON.stringify(ref, null, 2)); return base;
}
function cli(base: string) {
  const result = spawnSync(process.execPath, ['--import', 'tsx', auditor, '--root', base], { cwd: root, encoding: 'utf8' });
  assert.equal(result.signal, null, result.stderr);
  assert.notEqual(result.status, null, result.stderr);
  return { code: result.status, report: JSON.parse(result.stdout), stderr: result.stderr };
}

test('CLI real: caso válido, dos ideas aceptadas y cierre explícito, salida 0', t => {
  const base = fixture(t), result = cli(base); assert.equal(result.code, 0, result.stderr); assert.equal(result.report.totals.verified, 2); assert.equal(result.report.totals.pendingSummaryReview, 0);
});
for (const [name, change, field] of [
  ['título plausible ajeno', (d: any) => d.metadata.lessonTitle = 'La sociedad agrícola', 'lessonTitle'],
  ['puente plausible ajeno', (d: any) => d.metadata.nextLessonTitle = 'El sistema solar', 'nextLessonTitle'],
  ['puente vacío', (d: any) => d.metadata.nextLessonTitle = '', 'nextLessonTitle'],
  ['asignatura ajena', (d: any) => d.metadata.subject = 'Historia', 'subject'],
  ['curso ajeno', (d: any) => d.metadata.courseId = '110-8', 'courseId'],
  ['OA ajeno', (d: any) => d.metadata.oaCode = 'OA 2', 'oaCode'],
  ['clase ajena', (d: any) => d.metadata.lessonNumber = 2, 'lessonNumber'],
  ['nivel ajeno', (d: any) => d.metadata.grade = '8° Básico', 'grade'],
  ['total ajeno', (d: any) => d.metadata.totalLessonsInOa = 6, 'totalLessonsInOa']
] as const) {
  test(`CLI real: rechaza ${name}, salida 1`, t => {
    const base = fixture(t); writeModule(base, 1, change); const result = cli(base); assert.equal(result.code, 1, result.stderr);
    assert.ok(result.report.results[0].differences.some((d: any) => d.field === field));
  });
}
test('CLI real: conserva control R1 narrativo en Ciencias', t => {
  const base = fixture(t); writeModule(base, 1, d => d.interactive = { type: 'reading_resource', paragraphs: ['Ajeno'] });
  assert.equal(cli(base).code, 1);
});
test('CLI real: conserva control R2 de reactivos ausentes', t => {
  const base = fixture(t); writeModule(base, 1, d => d.preQuestions = []); assert.equal(cli(base).code, 1);
});
test('CLI real: fuente ausente, salida 2', t => {
  const base = fixture(t); const ref = loadCanonicalReference(base); fs.unlinkSync(path.join(base, ref.lessons[0].source)); assert.equal(cli(base).code, 2);
});
test('CLI real: referencia ausente, salida 2', t => {
  const base = fixture(t); fs.unlinkSync(path.join(base, REFERENCE_PATH)); assert.equal(cli(base).code, 2);
});
test('CLI real: fuente cambiada, salida 2 sin regeneración silenciosa', t => {
  const base = fixture(t), ref = loadCanonicalReference(base); fs.appendFileSync(path.join(base, ref.lessons[0].source), '\nContenido cambiado');
  assert.equal(cli(base).code, 2); assert.equal(JSON.parse(fs.readFileSync(path.join(base, REFERENCE_PATH), 'utf8')).lessons[0].sourceSha256, ref.lessons[0].sourceSha256);
});
test('CLI real: referencia alterada, salida 2', t => {
  const base = fixture(t), ref = loadCanonicalReference(base); ref.lessons[0].title = 'Inventado'; write(base, REFERENCE_PATH, JSON.stringify(ref)); assert.equal(cli(base).code, 2);
});
test('CLI real: títulos oficiales contradictorios, salida 2', t => {
  const base = fixture(t), ref = loadCanonicalReference(base), p = path.join(base, ref.lessons[0].source);
  fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace('## 1.', '**Título:** Contradicción\n## 1.')); assert.equal(cli(base).code, 2);
});
test('CLI real: módulo o fuente nuevos sin vínculo no pueden pasar', t => {
  const base = fixture(t); write(base, `${MODULE_DIR}/otro.ts`, 'export const x = {}'); assert.equal(cli(base).code, 2);
  fs.unlinkSync(path.join(base, MODULE_DIR, 'otro.ts')); write(base, 'LECCIONES_POR_REVISAR/nueva.md', '# Nueva'); assert.equal(cli(base).code, 2);
});
test('CLI real: módulo vinculado ausente, salida 2', t => {
  const base = fixture(t); fs.unlinkSync(path.join(base, moduleName(1))); assert.equal(cli(base).code, 2);
});
test('AST: rechaza expresión dinámica y no la ejecuta', t => {
  const base = fixture(t), marker = path.join(base, 'no-debe-existir');
  write(base, moduleName(1), `export const X: LessonData = { metadata: (() => {require('fs').writeFileSync(${JSON.stringify(marker)}, 'ejecutado');return {}})() };`);
  assert.equal(cli(base).code, 2); assert.equal(fs.existsSync(marker), false);
});
test('AST: rechaza propiedades duplicadas y admite acentos/escapes/arrays anidados', () => {
  assert.throws(() => readLessonObject('export const X: LessonData = { metadata: {}, metadata: {} };', 'duplicado.ts'));
  const parsed = readLessonObject('export const X: LessonData = { metadata: {lessonTitle: "Él dijo \\"hola\\""}, a: [["ítem", {n: 1}]] };', 'ok.ts');
  assert.equal(parsed.metadata.lessonTitle, 'Él dijo "hola"'); assert.equal(parsed.a[0][1].n, 1);
});
test('Cabecera: título H1 oficial prevalece sobre título de lámina posterior', t => {
  const base = fixture(t); const ref = loadCanonicalReference(base); assert.equal(ref.lessons[0].title, 'Primera clase');
});
test('Cabecera: rechaza identidad contradictoria entre encabezado y campos', t => {
  const base = fixture(t), ref = loadCanonicalReference(base), source = fs.readFileSync(path.join(base, ref.lessons[0].source), 'utf8');
  assert.throws(() => parseSource(source.replace('\n\n**Curso:', '\n## 7° básico · Ciencias Naturales · OA02 · Clase 01\n\n**Curso:'), 'contradiccion.md'), /encabezado curricular/);
});
test('CLI real: normaliza sólo Unicode/espacios; rechaza una paráfrasis con puntuación distinta', t => {
  const base = fixture(t); writeModule(base, 1, d => d.metadata.lessonTitle = ' Primera   clase '); assert.equal(cli(base).code, 0);
  writeModule(base, 1, d => d.metadata.lessonTitle = 'Primera clase.'); assert.equal(cli(base).code, 1);
});
test('Provisional distinto se informa sin sustituir el oficial de la siguiente clase', t => {
  const base = fixture(t), source = loadCanonicalReference(base).lessons[0].source;
  fs.writeFileSync(path.join(base, source), fs.readFileSync(path.join(base, source), 'utf8').replace('## 1.', '**Título de trabajo de la siguiente clase:** Título provisional\n## 1.'));
  const ref = buildCanonicalReference(base); write(base, REFERENCE_PATH, JSON.stringify(ref)); assert.equal(cli(base).code, 0); assert.equal(ref.lessons[0].advisories.length, 1);
});
test('Protegida: Matemática OA01 no se lee ni se cuenta como PASS', t => {
  const base = fixture(t), protectedModule = `${MODULE_DIR}/matematica_7b_oa01_clase01.ts`;
  write(base, 'LECCIONES/110-7/Matematica/OA01/manifest.json', JSON.stringify({ curso: '110-7', asignatura: 'Matematica', oa: 'OA01', total_clases: 6, resolucion_rutas_typescript: { archivos_clases_ts: [protectedModule] } }));
  const sentinel = 'ESTE ARCHIVO NO ES TYPESCRIPT Y NO DEBE LEERSE'; write(base, protectedModule, sentinel);
  write(base, REFERENCE_PATH, JSON.stringify(buildCanonicalReference(base)));
  const result = cli(base); assert.equal(result.code, 0); assert.equal(result.report.totals.protected, 6); assert.equal(result.report.totals.verified, 2);
  assert.equal(fs.readFileSync(path.join(base, protectedModule), 'utf8'), sentinel);
});
test('Preflight: metadatos incorrectos y cobertura incompleta son rechazados', t => {
  const base = fixture(t), ref = loadCanonicalReference(base);
  const batch = ref.lessons.map((l, i) => ({ source: l.source, module: l.module, data: object(i + 1) }));
  assert.doesNotThrow(() => validateBatch(base, ref, batch)); batch[0].data.metadata.lessonTitle = 'Inventado'; assert.throws(() => validateBatch(base, ref, batch), /FALLO_CORRESPONDENCIA/);
  assert.throws(() => validateBatch(base, ref, batch.slice(0, 1)), /Cobertura/);
});
test('Pipeline real: referencia ausente detiene antes de crear directorios/salidas', async t => {
  const base = fixture(t); fs.unlinkSync(path.join(base, REFERENCE_PATH));
  await assert.rejects(runUniversalPipeline({ rootDir: base }), /Falta referencia/); assert.equal(fs.existsSync(path.join(base, 'staging_preparacion_aislada')), false);
});
test('Pipeline real: vínculo no canónico detiene antes de escribir', async t => {
  // Copia de insumos completos para que linter/parser recorran las fuentes reales, sin sustituirlos.
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'work-pipeline-')); t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  fs.cpSync(path.join(root, 'LECCIONES'), path.join(base, 'LECCIONES'), { recursive: true });
  fs.cpSync(path.join(root, 'LECCIONES_POR_REVISAR'), path.join(base, 'LECCIONES_POR_REVISAR'), { recursive: true });
  const manifest = 'LECCIONES/110-7/Ciencias_Naturales/OA01/manifest.json';
  const data = JSON.parse(fs.readFileSync(path.join(base, manifest), 'utf8')); data.lecciones_construidas[0].archivo_ts = `${MODULE_DIR}/nombre_ajeno.ts`; write(base, manifest, JSON.stringify(data));
  write(base, REFERENCE_PATH, JSON.stringify(buildCanonicalReference(base)));
  await assert.rejects(runUniversalPipeline({ rootDir: base }), /Vínculo fuente\/módulo no canónico/);
  assert.equal(fs.existsSync(path.join(base, 'staging_preparacion_aislada')), false);
});
test('Pipeline recibido: valida treinta fuentes sin escribir ni exigir tres ideas', async () => {
  const result = await runUniversalPipeline({ validateOnly: true }); assert.equal(result.total, buildCanonicalReference(root).lessons.length); assert.equal(result.manifestPath, '');
});
test('Pipeline real: genera treinta módulos sólo en copia aislada; auditor los verifica; fuentes y Matemática OA01 intactas', async t => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'work-staging-')); t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  fs.cpSync(path.join(root, 'LECCIONES'), path.join(base, 'LECCIONES'), { recursive: true });
  fs.cpSync(path.join(root, 'LECCIONES_POR_REVISAR'), path.join(base, 'LECCIONES_POR_REVISAR'), { recursive: true });
  const protectedModule = `${MODULE_DIR}/matematica_7b_oa01_clase01.ts`;
  const protectedSource = 'LECCIONES_POR_REVISAR/110-7/Matematica/OA01/CLASE01.md';
  write(base, protectedModule, 'PROTEGIDO_TS_NO_PARSEAR'); write(base, protectedSource, 'PROTEGIDO_MD_NO_PARSEAR');
  const ref = buildCanonicalReference(base); write(base, REFERENCE_PATH, JSON.stringify(ref));
  const before = ref.lessons.map(l => fs.readFileSync(path.join(base, l.source)));
  const result = await runUniversalPipeline({ rootDir: base }); assert.equal(result.total, ref.lessons.length);
  assert.equal(fs.existsSync(path.join(base, 'staging_preparacion_aislada/lessons/matematica_7b_oa01_clase01.ts')), false);
  for (const [index, lesson] of ref.lessons.entries()) {
    assert.deepEqual(fs.readFileSync(path.join(base, lesson.source)), before[index]);
    const generated = fs.readFileSync(path.join(base, 'staging_preparacion_aislada/lessons', path.basename(lesson.module)), 'utf8');
    write(base, lesson.module, generated);
  }
  assert.equal(fs.readFileSync(path.join(base, protectedModule), 'utf8'), 'PROTEGIDO_TS_NO_PARSEAR');
  assert.equal(fs.readFileSync(path.join(base, protectedSource), 'utf8'), 'PROTEGIDO_MD_NO_PARSEAR');
  const audited = cli(base); assert.equal(audited.code, 0, JSON.stringify(audited.report)); assert.equal(audited.report.totals.verified, ref.lessons.length);
});
