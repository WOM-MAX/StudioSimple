import fs from 'node:fs';
import path from 'node:path';
import { buildCanonicalReference, loadCanonicalReference, inside, filesUnder, MODULE_DIR, REFERENCE_PATH,
  readLessonObject, compareMetadata, subjectKey, identityKey } from './canonical_lesson_reference';
import type { CanonicalLesson, Difference } from './canonical_lesson_reference';

export interface AuditResult {
  file: string;
  identity?: string;
  status: 'VERIFICADO' | 'FALLO_CORRESPONDENCIA' | 'NO_VERIFICABLE';
  differences: Difference[];
  technicalFailures: string[];
  pendingContent: string[];
  notes: string[];
  counts?: { pre: number; post: number; practice: number; summary: number };
  source?: string;
  sourceSha256?: string;
}
export function auditSingleLesson(content: string, file: string, expected?: CanonicalLesson): AuditResult {
  const result: AuditResult = { file, status: 'NO_VERIFICABLE', differences: [], technicalFailures: [], pendingContent: [], notes: [] };
  try {
    const lesson = readLessonObject(content, file);
    const array = (name: string) => Array.isArray(lesson[name]) ? lesson[name] : [];
    result.counts = { pre: array('preQuestions').length, post: array('postQuestions').length,
      practice: array('practice').length, summary: array('summaryIdeas').length };
    const subject = subjectKey(lesson.metadata.subject);
    const hasNarrative = (node: any): boolean => {
      if (!node || typeof node !== 'object') return false;
      if (Object.hasOwn(node, 'readingResource') || (['reading', 'reading_resource'].includes(node.type) && Array.isArray(node.paragraphs))) return true;
      return Object.values(node).some(hasNarrative);
    };
    if (['cie', 'mat'].includes(subject) && hasNarrative(lesson)) result.technicalFailures.push('R1: Recurso narrativo en Ciencias/Matemática');
    if (!result.counts.pre || !result.counts.post) result.technicalFailures.push('R2: Faltan reactivos de recorrido/comprobación');
    const summary = JSON.stringify(array('summaryIdeas'));
    if (/Una situación|Situación inicial|Aplicación del criterio formal en el cuaderno físico/.test(summary)) {
      result.pendingContent.push('Resumen genérico: requiere contraste pedagógico con la fuente; no implica redactar una tercera idea');
    }
    if (!expected) { result.notes.push('Sin referencia canónica independiente: no se acredita título ni continuidad'); return result; }
    result.identity = identityKey(expected); result.source = expected.source; result.sourceSha256 = expected.sourceSha256;
    result.differences = compareMetadata(lesson.metadata, expected);
    result.notes.push(...expected.advisories);
    result.status = result.differences.length || result.technicalFailures.length ? 'FALLO_CORRESPONDENCIA' : 'VERIFICADO';
  } catch (error) { result.notes.push(String(error)); }
  return result;
}

export function runFullAudit(root = path.resolve(__dirname, '..'), referencePath = REFERENCE_PATH) {
  const report = { schema: 'estudiosimple.audit.canonical.v1', normativeState: 'EN_REVISION',
    scope: 'Títulos, identidad, continuidad y controles estructurales R1/R2; no acredita aprobación pedagógica, editor ni producción',
    courseBinding: 'El curso del módulo se acredita por vínculo de manifiesto/ruta. Si metadata.courseId existe también se compara.',
    exitCode: 2, results: [] as AuditResult[], protected: [] as unknown[], errors: [] as string[],
    totals: { evaluated: 0, verified: 0, mismatches: 0, notVerifiable: 0, protected: 0, pendingSummaryReview: 0 } };
  try {
    const ref = loadCanonicalReference(root, referencePath);
    report.protected = ref.protected;
    report.totals.protected = ref.protected.reduce((count, item) => count + item.total, 0);
    const mapped = new Set(ref.lessons.map(l => l.module));
    const protectedModules = new Set(ref.protected.flatMap(p => p.modules.map(m => m.startsWith(MODULE_DIR + '/') ? m : `${MODULE_DIR}/${path.basename(m)}`)));
    for (const filename of filesUnder(root, MODULE_DIR, '.ts')) {
      if (filename === `${MODULE_DIR}/index.ts` || mapped.has(filename) || protectedModules.has(filename)) continue;
      report.results.push({ file: filename, status: 'NO_VERIFICABLE', differences: [], technicalFailures: [], pendingContent: [], notes: ['Módulo sin vínculo canónico en los manifiestos'] });
    }
    for (const expected of ref.lessons) {
      const filename = inside(root, expected.module);
      if (!fs.existsSync(filename)) {
        report.results.push({ file: expected.module, identity: identityKey(expected), status: 'NO_VERIFICABLE', differences: [], technicalFailures: [], pendingContent: [], notes: ['Falta módulo vinculado'], source: expected.source });
      } else report.results.push(auditSingleLesson(fs.readFileSync(filename, 'utf8'), expected.module, expected));
    }
    report.totals.evaluated = report.results.length;
    report.totals.verified = report.results.filter(r => r.status === 'VERIFICADO').length;
    report.totals.mismatches = report.results.filter(r => r.status === 'FALLO_CORRESPONDENCIA').length;
    report.totals.notVerifiable = report.results.filter(r => r.status === 'NO_VERIFICABLE').length;
    report.totals.pendingSummaryReview = report.results.filter(r => r.pendingContent.length).length;
    report.exitCode = report.totals.notVerifiable ? 2 : report.totals.mismatches ? 1 : 0;
  } catch (error) { report.errors.push(String(error)); }
  return report;
}

export function main(args = process.argv.slice(2)): number {
  let root = path.resolve(__dirname, '..'), reference = REFERENCE_PATH, output = '', writeReference = false;
  try {
    for (let index = 0; index < args.length; index++) {
      const arg = args[index];
      if (arg === '--write-reference') writeReference = true;
      else if (['--root', '--reference', '--report'].includes(arg) && args[index + 1] && !args[index + 1].startsWith('--')) {
        const value = args[++index];
        if (arg === '--root') root = path.resolve(value);
        if (arg === '--reference') reference = value;
        if (arg === '--report') output = path.resolve(value);
      } else throw new Error(`Argumento inválido: ${arg}`);
    }
    if (writeReference) {
      const ref = buildCanonicalReference(root), dest = inside(root, reference);
      fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.writeFileSync(dest, JSON.stringify(ref, null, 2) + '\n');
      console.log(`REFERENCIA_GENERADA: ${ref.lessons.length} evaluables; ${ref.protected.reduce((n, p) => n + p.total, 0)} protegidas. No es un veredicto del lote.`);
      return 0;
    }
    const report = runFullAudit(root, reference);
    if (output) { fs.mkdirSync(path.dirname(output), { recursive: true }); fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n'); }
    console.log(JSON.stringify(report, null, 2));
    return report.exitCode;
  } catch (error) { console.error(`NO_VERIFICABLE: ${String(error)}`); return 2; }
}
if (require.main === module) process.exitCode = main();
