import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import ts from 'typescript';

export class NotVerifiable extends Error { readonly exitCode = 2; }
export const REFERENCE_PATH = 'docs/auditorias/REFERENCIA_CANONICA_TITULOS_CONTINUIDAD.json';
export const MODULE_DIR = 'Web Studio Simple/src/data/lessons';
export const text = (value: unknown): string => String(value ?? '').normalize('NFC').replace(/\s+/g, ' ').trim();
const key = (value: unknown) => text(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export function subjectKey(value: unknown): string {
  const aliases: Record<string, string> = {
    mat: 'mat', matematica: 'mat', cna: 'cie', cie: 'cie', ciencias_naturales: 'cie', 'ciencias naturales': 'cie',
    his: 'his', historia: 'his', historia_geografia: 'his', 'historia, geografia y ciencias sociales': 'his',
    ing: 'ing', ingles: 'ing', english: 'ing', 'idioma extranjero ingles': 'ing',
    lyl: 'len', len: 'len', lengua: 'len', lengua_literatura: 'len', 'lengua y literatura': 'len'
  };
  const result = aliases[key(value)];
  if (!result) throw new NotVerifiable(`Asignatura no reconocida: ${value}`);
  return result;
}
export function oaNumber(value: unknown): number {
  const m = text(value).match(/\bOA\s*0*(\d+)\b/i);
  if (!m) throw new NotVerifiable(`OA no reconocido: ${value}`);
  return Number(m[1]);
}
export function gradeNumber(value: unknown): number {
  const m = text(value).match(/^(\d+)(?:\D|$)/);
  if (!m) throw new NotVerifiable(`Nivel no reconocido: ${value}`);
  return Number(m[1]);
}
export function inside(root: string, relative: string): string {
  const result = path.resolve(root, relative);
  if (path.isAbsolute(relative) || path.relative(root, result).split(path.sep).includes('..')) {
    throw new NotVerifiable(`Ruta fuera del repositorio: ${relative}`);
  }
  return result;
}
export function sha(root: string, file: string): string {
  const p = inside(root, file);
  if (!fs.existsSync(p)) throw new NotVerifiable(`Falta archivo: ${file}`);
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}
export function filesUnder(root: string, directory: string, suffix: string): string[] {
  const base = inside(root, directory);
  if (!fs.existsSync(base)) return [];
  return fs.readdirSync(base, { withFileTypes: true }).flatMap(entry => {
    const rel = `${directory}/${entry.name}`;
    return entry.isDirectory() ? filesUnder(root, rel, suffix) : entry.isFile() && entry.name.endsWith(suffix) ? [rel] : [];
  }).sort();
}
export interface Identity { course: string; subject: string; oa: number; lesson: number; grade: number; }
export interface CanonicalLesson extends Identity {
  total: number; source: string; sourceSha256: string; manifest: string; module: string;
  title: string; titleLocation: string; version: string;
  workingNext: string; explicitNext: string; nextTitle: string; nextKind: 'NEXT_CLASS' | 'END_OR_TRANSITION';
  nextSource: string; nextSourceSha256: string; nextLocation: string;
  advisories: string[];
}
export interface CanonicalReference {
  schema: 'estudiosimple.canonical-titles.v1';
  policy: string;
  manifests: Array<{ path: string; sha256: string }>;
  lessons: CanonicalLesson[];
  protected: Array<{ course: string; subject: string; oa: number; total: number; modules: string[]; status: 'PROTEGIDO_NO_INTERVENIDO' }>;
}

// Sólo la cabecera documental: nunca extraer un título de lámina dentro de la lección.
export function parseSource(content: string, context: string) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const stop = lines.findIndex(line => /^###\s|^##\s+\d+\./.test(line));
  const header = lines.slice(0, stop < 0 ? lines.length : stop);
  const fields = new Map<string, Array<{ value: string; line: number }>>();
  for (const [index, line] of header.entries()) {
    const re = /\*\*([^*]+?):\*\*\s*(.*?)(?=(?:\s*·\s*)?\*\*[^*]+?:\*\*|$)/g;
    for (const m of line.matchAll(re)) {
      const label = key(m[1]); const list = fields.get(label) ?? [];
      list.push({ value: text(m[2]), line: index + 1 }); fields.set(label, list);
    }
  }
  const pick = (labels: string[], required = false) => {
    const values = labels.flatMap(label => fields.get(label) ?? []);
    const unique = [...new Set(values.map(v => v.value))];
    if (unique.length > 1 || (required && (!unique.length || !unique[0]))) {
      throw new NotVerifiable(`${context}: campo ausente o ambiguo (${labels.join('/')})`);
    }
    return values[0];
  };
  const titleField = pick(['titulo', 'titulo de la clase', 'lesson title', 'title']);
  const h1 = header.flatMap((line, i) => {
    const match = line.match(/^#\s+EstudioSimple\s*[·|]\s*(.+)$/i);
    return match && !/^(?:lecci[oó]n|interactive lesson)\b/i.test(match[1]) ? [{ value: text(match[1]), line: i + 1 }] : [];
  });
  const titles = [...new Set([...(titleField ? [titleField.value] : []), ...h1.map(h => h.value)])];
  if (titles.length !== 1 || !titles[0]) throw new NotVerifiable(`${context}: título oficial ausente o contradictorio`);
  if (['una situacion', 'situacion inicial'].includes(key(titles[0]))) throw new NotVerifiable(`${context}: título oficial genérico pendiente de definición`);
  const loc = titleField ?? h1[0];
  const course = pick(['curso', 'curso app', 'app course id', 'identificador del curso'], true)!.value;
  const subject = subjectKey(pick(['asignatura', 'asignatura app', 'app subject', 'nombre en la app'], true)!.value);
  const curricular = pick(['oa', 'codigo curricular', 'curriculum id', 'identificador curricular'], true)!.value;
  const count = pick(['clase', 'numero de clase', 'class number'], true)!.value.match(/^(\d+)\s+(?:de|of)\s+(\d+)$/i);
  if (!count) throw new NotVerifiable(`${context}: número/total de clase ausente`);
  const grade = Number(course.match(/-(\d+)$/)?.[1]);
  if (!Number.isInteger(grade) || grade < 1) throw new NotVerifiable(`${context}: curso sin nivel identificable`);
  for (const line of header.filter(l => /^##\s/.test(l))) {
    const headingOa = line.match(/\bOA\s*0*(\d+)/i);
    const headingClass = line.match(/\b(?:Clase|Class)\s*0*(\d+)/i);
    const headingGrade = line.match(/^##\s+(\d+)(?:°|th)\s*(?:b[aá]sico|grade)/i);
    if ((headingOa && Number(headingOa[1]) !== oaNumber(curricular)) || (headingClass && Number(headingClass[1]) !== Number(count[1])) || (headingGrade && Number(headingGrade[1]) !== grade)) {
      throw new NotVerifiable(`${context}: encabezado curricular contradice los campos de identidad`);
    }
  }
  const curriculumMatch = curricular.match(/^(\d+)B-([A-Z]+)-OA0*(\d+)$/i);
  if (curriculumMatch && (Number(curriculumMatch[1]) !== grade || subjectKey(curriculumMatch[2]) !== subject)) {
    throw new NotVerifiable(`${context}: identificador curricular contradice curso/asignatura`);
  }
  const workingNext = pick(['titulo de trabajo de la siguiente clase', 'next class working title'])?.value ?? '';
  const explicitNext = pick(['proxima clase', 'next class title'])?.value ?? '';
  const version = pick(['version de referencia'])?.value ?? pick(['fecha de preparacion'])?.value ?? pick(['fecha y hora de emision de esta propuesta'])?.value
    ?? pick(['estado', 'status', 'estado de esta entrega'])?.value ?? 'version fijada por SHA-256';
  return { course, subject, grade, oa: oaNumber(curricular), lesson: Number(count[1]), total: Number(count[2]),
    title: titles[0], titleLocation: `línea ${loc.line}`, workingNext, explicitNext, version };
}

export function identityKey(x: Identity): string { return `${x.course}/${x.subject}/OA${x.oa}/C${x.lesson}`; }
export function buildCanonicalReference(root: string): CanonicalReference {
  const manifests = filesUnder(root, 'LECCIONES', 'manifest.json');
  if (!manifests.length) throw new NotVerifiable('No hay manifiestos canónicos');
  const ref: CanonicalReference = { schema: 'estudiosimple.canonical-titles.v1',
    policy: 'Título oficial de cabecera; continuidad al título oficial de la siguiente clase del mismo curso/asignatura/OA. Títulos de trabajo provisionales se informan; no sustituyen títulos oficiales. Cierre explícito conservado.',
    manifests: [], lessons: [], protected: [] };
  for (const manifest of manifests) {
    ref.manifests.push({ path: manifest, sha256: sha(root, manifest) });
    const m = JSON.parse(fs.readFileSync(inside(root, manifest), 'utf8'));
    const course = text(m.curso), subject = subjectKey(m.asignatura), oa = oaNumber(m.oa);
    const total = Number(m.total_lecciones ?? m.total_clases);
    const parts = manifest.split('/');
    if (parts[1] !== course || subjectKey(parts[2]) !== subject || oaNumber(parts[3]) !== oa || !Number.isInteger(total) || total < 1) {
      throw new NotVerifiable(`${manifest}: identidad/total contradictorios`);
    }
    if (course === '110-7' && subject === 'mat' && oa === 1) {
      const modules = m.resolucion_rutas_typescript?.archivos_clases_ts ?? [];
      ref.protected.push({ course, subject, oa, total, modules: modules.map((f: string) => f.replace(/\\/g, '/')), status: 'PROTEGIDO_NO_INTERVENIDO' });
      continue;
    }
    if (!Array.isArray(m.lecciones_construidas) || m.lecciones_construidas.length !== total) {
      throw new NotVerifiable(`${manifest}: cobertura incompleta`);
    }
    const group: CanonicalLesson[] = [];
    for (const item of m.lecciones_construidas) {
      const source = String(item.archivo_md).replace(/\\/g, '/');
      const module = String(item.archivo_ts).replace(/\\/g, '/');
      const sourceSha256 = sha(root, source);
      const parsed = parseSource(fs.readFileSync(inside(root, source), 'utf8'), source);
      const sourceParts = source.split('/');
      const filenameClass = path.basename(source).match(/^CLASE0*(\d+)(?:_|\.)/i);
      if (sourceParts[1] !== course || subjectKey(sourceParts[2]) !== subject || oaNumber(sourceParts[3]) !== oa || !filenameClass || Number(filenameClass[1]) !== parsed.lesson
          || parsed.course !== course || parsed.subject !== subject || parsed.oa !== oa || parsed.lesson !== Number(item.clase) || parsed.total !== total
          || (m.nivel && gradeNumber(m.nivel) !== parsed.grade)) {
        throw new NotVerifiable(`${source}: identidad contradice manifiesto/ruta`);
      }
      inside(root, module);
      if (!module.startsWith(MODULE_DIR + '/') || !module.endsWith('.ts')) throw new NotVerifiable(`${manifest}: ruta de módulo inválida`);
      group.push({ ...parsed, source, sourceSha256, manifest, module, nextTitle: '', nextKind: 'END_OR_TRANSITION', nextSource: source, nextSourceSha256: sourceSha256, nextLocation: 'cierre explícito o fin del OA', advisories: [] });
    }
    group.sort((a, b) => a.lesson - b.lesson);
    group.forEach((lesson, index) => {
      if (lesson.lesson !== index + 1) throw new NotVerifiable(`${manifest}: orden duplicado o no contiguo`);
      const next = group[index + 1];
      lesson.nextKind = next ? 'NEXT_CLASS' : 'END_OR_TRANSITION';
      lesson.nextTitle = next ? next.title : lesson.explicitNext || lesson.workingNext;
      lesson.nextSource = next?.source ?? lesson.source;
      lesson.nextSourceSha256 = next?.sourceSha256 ?? lesson.sourceSha256;
      lesson.nextLocation = next?.titleLocation ?? 'cierre explícito o fin del OA';
      if (next && lesson.explicitNext && lesson.explicitNext !== next.title) {
        throw new NotVerifiable(`${lesson.source}: próximo título oficial contradice la siguiente fuente`);
      }
      if (next && lesson.workingNext && lesson.workingNext !== next.title) {
        lesson.advisories.push(`Título provisional distinto del oficial: ${lesson.workingNext}`);
      }
    });
    ref.lessons.push(...group);
  }
  if (!ref.lessons.length) throw new NotVerifiable('Alcance evaluable vacío');
  const declaredSources = new Set(ref.lessons.map(l => l.source));
  for (const source of filesUnder(root, 'LECCIONES_POR_REVISAR', '.md')) {
    const parts = source.split('/');
    if (parts[1] === '110-7' && key(parts[2]) === 'matematica' && /^OA0*1$/i.test(parts[3])) continue;
    if (!declaredSources.has(source)) throw new NotVerifiable(`Fuente sin vínculo canónico: ${source}`);
  }
  for (const field of ['module', 'source'] as const) {
    if (new Set(ref.lessons.map(l => l[field])).size !== ref.lessons.length) throw new NotVerifiable(`Vínculo duplicado: ${field}`);
  }
  if (new Set(ref.lessons.map(identityKey)).size !== ref.lessons.length) throw new NotVerifiable('Identidades duplicadas');
  return ref;
}

export function loadCanonicalReference(root: string, referencePath = REFERENCE_PATH): CanonicalReference {
  const current = buildCanonicalReference(root);
  const cachedPath = inside(root, referencePath);
  if (!fs.existsSync(cachedPath)) throw new NotVerifiable(`Falta referencia fijada: ${referencePath}. Generarla explícitamente con --write-reference tras revisar las fuentes.`);
  const cached = JSON.parse(fs.readFileSync(cachedPath, 'utf8'));
  if (JSON.stringify(cached) !== JSON.stringify(current)) throw new NotVerifiable('Referencia desactualizada o alterada: fuentes/manifiestos/inventario no coinciden');
  return current;
}

// Lectura estática: no import(), eval(), require() ni ejecución de módulos de lecciones.
export function readLessonObject(content: string, filename: string): Record<string, any> {
  const sf = ts.createSourceFile(filename, content, ts.ScriptTarget.ES2020, true, ts.ScriptKind.TS);
  const diagnostics = (sf as ts.SourceFile & { parseDiagnostics?: readonly ts.Diagnostic[] }).parseDiagnostics ?? [];
  if (diagnostics.length) throw new NotVerifiable(`${filename}: TypeScript no parseable`);
  function literal(node: ts.Expression): any {
    if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node)) return literal(node.expression);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(node.operand)) return -Number(node.operand.text);
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(n => literal(n as ts.Expression));
    if (ts.isObjectLiteralExpression(node)) {
      const result: Record<string, any> = Object.create(null);
      for (const p of node.properties) {
        if (!ts.isPropertyAssignment(p) || ts.isComputedPropertyName(p.name)) throw new NotVerifiable(`${filename}: propiedad dinámica no verificable`);
        const name = ts.isIdentifier(p.name) || ts.isStringLiteral(p.name) || ts.isNumericLiteral(p.name) ? p.name.text : '';
        if (!name || Object.hasOwn(result, name)) throw new NotVerifiable(`${filename}: propiedad duplicada o inválida`);
        result[name] = literal(p.initializer);
      }
      return result;
    }
    throw new NotVerifiable(`${filename}: expresión dinámica no ejecutada (${ts.SyntaxKind[node.kind]})`);
  }
  const candidates: ts.Expression[] = [];
  for (const statement of sf.statements) {
    if (!ts.isVariableStatement(statement) || !statement.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) continue;
    for (const decl of statement.declarationList.declarations) {
      if (decl.initializer && (decl.type?.getText(sf) === 'LessonData' || (ts.isObjectLiteralExpression(decl.initializer) && decl.initializer.properties.some(p => p.name?.getText(sf).replace(/["']/g, '') === 'metadata')))) candidates.push(decl.initializer);
    }
  }
  if (candidates.length !== 1) throw new NotVerifiable(`${filename}: se esperaba un único objeto exportado LessonData`);
  const result = literal(candidates[0]);
  if (!result?.metadata || typeof result.metadata !== 'object') throw new NotVerifiable(`${filename}: metadata ausente`);
  return result;
}

export interface Difference { field: string; expected: unknown; found: unknown; source: string; }
export function compareMetadata(metadata: Record<string, any>, expected: CanonicalLesson): Difference[] {
  const differences: Difference[] = [];
  const check = (field: string, value: unknown, actual: unknown) => {
    if (value !== actual) differences.push({ field, expected: value, found: actual ?? null, source: field === 'nextLessonTitle' ? expected.nextSource : expected.source });
  };
  const safe = (fn: () => unknown) => { try { return fn(); } catch { return null; } };
  // El curso se vincula por manifiesto/ruta; si el módulo lo declara también, debe coincidir.
  if (metadata.courseId !== undefined) check('courseId', expected.course, text(metadata.courseId));
  check('grade', expected.grade, safe(() => gradeNumber(metadata.grade)));
  check('subject', expected.subject, safe(() => subjectKey(metadata.subject)));
  check('oaCode', expected.oa, safe(() => oaNumber(metadata.oaCode)));
  check('lessonNumber', expected.lesson, metadata.lessonNumber);
  check('totalLessonsInOa', expected.total, metadata.totalLessonsInOa);
  check('lessonTitle', expected.title, text(metadata.lessonTitle));
  if (typeof metadata.nextLessonTitle !== 'string') check('nextLessonTitle', expected.nextTitle, null);
  else check('nextLessonTitle', expected.nextTitle, text(metadata.nextLessonTitle));
  return differences;
}

export function validateBatch(root: string, ref: CanonicalReference, batch: Array<{ source: string; module: string; data: { metadata: Record<string, any> } }>) {
  // Revalidar hashes e inventario justo antes de autorizar la primera escritura.
  if (JSON.stringify(buildCanonicalReference(root)) !== JSON.stringify(ref)) throw new NotVerifiable('Las fuentes cambiaron durante el preflight');
  if (batch.length !== ref.lessons.length || new Set(batch.map(b => b.source)).size !== batch.length) throw new NotVerifiable('Cobertura del lote incompleta o duplicada');
  const differences: Difference[] = [];
  for (const item of batch) {
    const expected = ref.lessons.find(l => l.source === item.source && l.module === item.module);
    if (!expected) throw new NotVerifiable(`Vínculo fuente/módulo no canónico: ${item.source} -> ${item.module}`);
    differences.push(...compareMetadata(item.data.metadata, expected));
  }
  if (differences.length) throw Object.assign(new Error(`FALLO_CORRESPONDENCIA: ${JSON.stringify(differences)}`), { exitCode: 1 });
}
