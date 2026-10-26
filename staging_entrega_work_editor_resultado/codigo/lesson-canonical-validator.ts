/**
 * Validador canónico client-side de lecciones (puro navegador).
 * Consume el JSON de referencia canónica sin dependencias de Node.js (fs, path, crypto).
 * Valida correspondencia de identidad, título oficial y puente de continuidad.
 */

import canonicalData from '../data/canonicalReference.json';

export interface CanonicalValidationDetail {
  field: string;
  expected: string;
  found: string;
}

export interface CanonicalValidationResult {
  isValid: boolean;
  error?: string;
  details?: CanonicalValidationDetail[];
  canonicalEntry?: {
    course: string;
    subject: string;
    grade: number;
    oa: number;
    lesson: number;
    total: number;
    title: string;
    nextTitle: string;
    nextKind: string;
    [key: string]: any;
  };
  isProtectedOa?: boolean;
}

export function text(value: unknown): string {
  return String(value ?? '').normalize('NFC').replace(/\s+/g, ' ').trim();
}

export function key(value: unknown): string {
  return text(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function subjectKey(value: unknown): string {
  const aliases: Record<string, string> = {
    mat: 'mat',
    matematica: 'mat',
    cna: 'cie',
    cie: 'cie',
    ciencias_naturales: 'cie',
    'ciencias naturales': 'cie',
    his: 'his',
    historia: 'his',
    historia_geografia: 'his',
    'historia, geografia y ciencias sociales': 'his',
    ing: 'ing',
    ingles: 'ing',
    english: 'ing',
    'idioma extranjero ingles': 'ing',
    lyl: 'len',
    len: 'len',
    lengua: 'len',
    lengua_literatura: 'len',
    'lengua y literatura': 'len'
  };
  const normalized = key(value);
  return aliases[normalized] || normalized;
}

export function oaNumber(value: unknown): number {
  const m = text(value).match(/\bOA\s*0*(\d+)\b/i);
  if (m) return Number(m[1]);
  const num = Number(value);
  return Number.isInteger(num) && num > 0 ? num : 0;
}

export function gradeNumber(value: unknown): number {
  const m = text(value).match(/^(\d+)(?:\D|$)/);
  if (m) return Number(m[1]);
  const num = Number(value);
  return Number.isInteger(num) && num > 0 ? num : 0;
}

/**
 * Busca una lección en el catálogo de referencia canónica oficial.
 */
export function findCanonicalReferenceEntry(
  grade: string | number,
  subject: string,
  oa: string | number,
  lessonNumber: number
) {
  const g = gradeNumber(grade);
  const s = subjectKey(subject);
  const o = oaNumber(oa);
  const l = Number(lessonNumber);

  const lessons = (canonicalData as any).lessons || [];
  return lessons.find(
    (item: any) =>
      item.grade === g &&
      item.subject === s &&
      item.oa === o &&
      item.lesson === l
  );
}

/**
 * Valida una lección contra la referencia canónica oficial.
 * Retorna si es válida, los detalles de discrepancia (campo, esperado, encontrado)
 * y el estado de protección (ej. Matemática OA01 blindada de fábrica).
 */
export function validateLessonCanonical(lesson: any): CanonicalValidationResult {
  if (!lesson || typeof lesson !== 'object' || !lesson.metadata) {
    return {
      isValid: false,
      error: 'La lección no contiene metadatos válidos.',
      details: [{ field: 'metadata', expected: 'Objeto metadata válido', found: String(lesson) }]
    };
  }

  const meta = lesson.metadata;
  const grade = gradeNumber(meta.grade);
  const subject = subjectKey(meta.subject);
  const oa = oaNumber(meta.oaCode);
  const lessonNum = Number(meta.lessonNumber);

  // Matemática OA01 está blindada de fábrica: PROTEGIDO_NO_INTERVENIDO
  const isProtectedOa = subject === 'mat' && oa === 1;

  const canonical = findCanonicalReferenceEntry(grade, subject, oa, lessonNum);

  // Si la lección no forma parte de los OAs auditados canónicamente, permitir pero reportar
  if (!canonical) {
    return {
      isValid: true,
      canonicalEntry: undefined,
      isProtectedOa
    };
  }

  const details: CanonicalValidationDetail[] = [];

  // 1. Validar correspondencia de título oficial de cabecera
  const foundTitle = text(meta.lessonTitle);
  const expectedTitle = text(canonical.title);
  if (key(foundTitle) !== key(expectedTitle)) {
    details.push({
      field: 'lessonTitle (Título Oficial)',
      expected: expectedTitle,
      found: foundTitle || '(vacío)'
    });
  }

  // 2. Validar puente de continuidad (nextLessonTitle) cuando existe siguiente clase en el mismo OA
  if (canonical.nextKind === 'NEXT_CLASS' && canonical.nextTitle) {
    const foundNextTitle = text(meta.nextLessonTitle);
    const expectedNextTitle = text(canonical.nextTitle);
    if (key(foundNextTitle) !== key(expectedNextTitle)) {
      details.push({
        field: 'nextLessonTitle (Puente de Continuidad)',
        expected: expectedNextTitle,
        found: foundNextTitle || '(vacío)'
      });
    }
  }

  if (details.length > 0) {
    return {
      isValid: false,
      error: `Discrepancia con la referencia canónica oficial (${canonical.course}/${canonical.subject}/OA${canonical.oa}/C${canonical.lesson})`,
      details,
      canonicalEntry: canonical,
      isProtectedOa
    };
  }

  return {
    isValid: true,
    canonicalEntry: canonical,
    isProtectedOa
  };
}
