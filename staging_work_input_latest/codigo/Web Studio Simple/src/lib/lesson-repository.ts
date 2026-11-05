import { validateLessonCanonical, CanonicalValidationResult } from './lesson-canonical-validator';
import { LessonData as PlayerLessonData } from '../types/lesson';
import { GeneratedOAPackage, LessonData as GeneratorLessonData } from './lesson-generator';
import { adaptGeneratorLessonToPlayer, adaptPlayerLessonToGenerator } from './lesson-adapter';
import * as ALL_CANONICAL_LESSONS from '../data/lessons';


const LOCAL_STORAGE_KEY = 'estudiosimple_injected_lessons';
const CUSTOM_STORAGE_KEY = 'estudiosimple_custom_lessons';
export const CUSTOM_PLAYER_LESSONS_KEY = 'estudiosimple_custom_player_lessons';

export interface InjectedOAPackage {
  oaId: string;
  curso: string;
  asignatura: string;
  oaCodigo: string;
  totalLecciones: number;
  lessons: GeneratorLessonData[];
  isCustomized?: boolean;
}

let cachedInjectedPackages: InjectedOAPackage[] = [];

export async function initializeInjectedLessons(): Promise<InjectedOAPackage[]> {
  let localPackages: InjectedOAPackage[] = [];
  let customPackages: InjectedOAPackage[] = [];

  if (typeof window !== 'undefined') {
    // 1. Limpieza preventiva de almacenamiento residual obsoleto
    try {
      const localDataRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (localDataRaw && (localDataRaw.includes('Viaje del Héroe') || localDataRaw.includes('viaje del héroe') || localDataRaw.includes('hero_journey'))) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } else if (localDataRaw) {
        localPackages = JSON.parse(localDataRaw);
      }

      const customPlayerDataRaw = localStorage.getItem(CUSTOM_PLAYER_LESSONS_KEY);
      if (customPlayerDataRaw && (customPlayerDataRaw.includes('Viaje del Héroe') || customPlayerDataRaw.includes('viaje del héroe'))) {
        const parsedCustom = JSON.parse(customPlayerDataRaw);
        delete parsedCustom['7_len_oa3_1'];
        localStorage.setItem(CUSTOM_PLAYER_LESSONS_KEY, JSON.stringify(parsedCustom));
      }

      const customData = localStorage.getItem(CUSTOM_STORAGE_KEY);
      if (customData) {
        customPackages = JSON.parse(customData).filter((p: any) => p.isCustomized);
      }
    } catch (e) {
      console.error('Error durante saneamiento de lecciones locales:', e);
    }
  }

  try {
    let res = await fetch('/data/injected_lessons_all_grades.json');
    if (!res.ok) {
      res = await fetch('/data/injected_lessons_7b.json');
    }
    if (res.ok) {
      const remotePackages: InjectedOAPackage[] = await res.json();
      const map = new Map<string, InjectedOAPackage>();
      
      // La fuente canónica remota tiene prioridad absoluta sobre la caché local
      remotePackages.forEach((p) => map.set(p.oaId || `${p.curso}_${p.asignatura}_${p.oaCodigo}`, p));
      
      // Solo modificaciones explícitas de usuario (isCustomized === true) pueden sobreescribir
      customPackages.forEach((p) => {
        if (p.isCustomized) {
          map.set(p.oaId || `${p.curso}_${p.asignatura}_${p.oaCodigo}`, p);
        }
      });
      
      cachedInjectedPackages = Array.from(map.values());

      // Actualizar localStorage con la versión canónica limpia
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cachedInjectedPackages));
        } catch {}
      }
    } else {
      cachedInjectedPackages = [...localPackages, ...customPackages];
    }
  } catch {
    cachedInjectedPackages = [...localPackages, ...customPackages];
  }

  return cachedInjectedPackages;
}

export function registerGeneratedPackage(pkg: GeneratedOAPackage): void {
  const injectedItem: InjectedOAPackage = {
    oaId: pkg.oa.id,
    curso: pkg.oa.curso,
    asignatura: pkg.oa.asignatura,
    oaCodigo: pkg.oa.oa,
    totalLecciones: pkg.totalLessons,
    lessons: pkg.lessons
  };

  const map = new Map<string, InjectedOAPackage>();
  cachedInjectedPackages.forEach((p) => map.set(p.oaId, p));
  map.set(injectedItem.oaId, injectedItem);
  cachedInjectedPackages = Array.from(map.values());

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cachedInjectedPackages));
    } catch (e) {
      console.error('Error al persistir lecciones en localStorage:', e);
    }
  }
}

export function normalizeSubject(subject: string): string {
  const clean = (subject || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
  if (clean.includes('mat')) return 'mat';
  if (clean.includes('leng') || clean.includes('liter')) return 'len';
  if (clean.includes('hist') || clean.includes('geog') || clean.includes('soc')) return 'his';
  if ((clean.includes('cien') && !clean.includes('soc')) || clean.includes('nat')) return 'cie';
  if (clean.includes('ing') || clean.includes('eng')) return 'ing';
  return clean;
}

export function normalizeOa(oaCode: string): string {
  const digits = (oaCode || '').replace(/[^0-9]/g, '');
  return digits ? `oa${parseInt(digits, 10)}` : (oaCode || '').toLowerCase().trim();
}

export function normalizeGrade(grade: string): string {
  const digits = (grade || '').replace(/[^0-9]/g, '');
  return digits || (grade || '').toLowerCase().trim();
}

export function getLessonCanonicalKey(
  grade: string,
  subject: string,
  oaCode: string,
  lessonNumber: number
): string {
  return `${normalizeGrade(grade)}_${normalizeSubject(subject)}_${normalizeOa(oaCode)}_${lessonNumber}`;
}

export function isLessonCompleted(
  completedLessons: string[] | undefined,
  grade: string,
  subject: string,
  oaCode: string,
  lessonNumber: number
): boolean {
  if (!completedLessons || completedLessons.length === 0) return false;
  const canonicalKey = getLessonCanonicalKey(grade, subject, oaCode, lessonNumber);
  const shortKey = `${normalizeOa(oaCode)}_${lessonNumber}`;
  const legacyPrefix = `les-${normalizeSubject(subject)}-${normalizeGrade(grade)}${String(lessonNumber).padStart(2, '0')}`;
  return (
    completedLessons.includes(canonicalKey) ||
    completedLessons.includes(shortKey) ||
    completedLessons.includes(legacyPrefix)
  );
}

export function saveCustomLessonData(
  curso: string, asignatura: string, oaCodigo: string, oaId: string,
  lesson: GeneratorLessonData, totalLessons: number
): LessonSaveResult {
  // Compatibilidad sólo para una versión Player ya validada. No reconstruir contenido perdido.
  try {
    const key = getLessonCanonicalKey(curso, asignatura, oaCodigo, lesson.num);
    const map = JSON.parse(localStorage.getItem(CUSTOM_PLAYER_LESSONS_KEY) || '{}');
    const player = map[key];
    const validation = validateLessonCanonical(player, { grade: curso, subject: asignatura, oaCode: oaCodigo, lessonNumber: lesson.num });
    if (!validation.isValid || validation.isProtectedOa) return { ok: false, error: validation.error || 'Paquete protegido.', validation };
    if (JSON.stringify(adaptPlayerLessonToGenerator(player)) !== JSON.stringify(lesson)) return { ok: false, error: 'El paquete de compatibilidad no corresponde a la versión Player validada.' };
    return saveCustomPlayerLesson(curso, asignatura, oaCodigo, lesson.num, player, { oaId });
  } catch (error) { return { ok: false, error: String(error) }; }
}

export function resetCustomLessonData(
  curso: string,
  asignatura: string,
  oaCodigo: string,
  lessonNum?: number
): void {
  if (isProtectedSelection(curso, asignatura, oaCodigo)) return;
  const keyGrade = normalizeGrade(curso);
  const keySubj = normalizeSubject(asignatura);
  const keyOa = normalizeOa(oaCodigo);

  const targetPkg = cachedInjectedPackages.find((p) => {
    return (
      normalizeGrade(p.curso) === keyGrade &&
      normalizeSubject(p.asignatura) === keySubj &&
      normalizeOa(p.oaCodigo) === keyOa
    );
  });

  if (targetPkg) {
    if (lessonNum !== undefined) {
      // Si se especifica la lección, verificar si quedan otras modificadas
      targetPkg.isCustomized = false;
    } else {
      targetPkg.isCustomized = false;
    }
  }

  if (typeof window !== 'undefined') {
    try {
      const customizedOnly = cachedInjectedPackages.filter((p) => p.isCustomized);
      localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(customizedOnly));
    } catch (e) {
      console.error('Error al actualizar localStorage tras reset:', e);
    }
  }
}

export function findCanonicalFactoryLesson(
  grade: string,
  subject: string,
  oaCode: string,
  lessonNumber: number
): PlayerLessonData | null {
  const keyGrade = normalizeGrade(grade);
  const keySubj = normalizeSubject(subject);
  const keyOa = normalizeOa(oaCode);

  const allLessons = Object.values(ALL_CANONICAL_LESSONS) as PlayerLessonData[];
  for (const l of allLessons) {
    if (!l?.metadata) continue;
    if (
      normalizeGrade(l.metadata.grade) === keyGrade &&
      normalizeSubject(l.metadata.subject) === keySubj &&
      normalizeOa(l.metadata.oaCode) === keyOa &&
      l.metadata.lessonNumber === lessonNumber
    ) {
      return l;
    }
  }
  return null;
}

export interface LessonSaveResult { ok: boolean; error?: string; validation?: CanonicalValidationResult; }
let lastLessonLoadIssue: CanonicalValidationResult | null = null;
export function getLastLessonLoadIssue() { return lastLessonLoadIssue; }
function isProtectedSelection(grade: string, subject: string, oa: string): boolean {
  return normalizeGrade(grade) === '7' && normalizeSubject(subject) === 'mat' && normalizeOa(oa) === 'oa1';
}

export function saveCustomPlayerLesson(
  grade: string, subject: string, oaCode: string, lessonNumber: number,
  lessonData: PlayerLessonData, options: { oaId?: string } = {}
): LessonSaveResult {
  const validation = validateLessonCanonical(lessonData, { grade, subject, oaCode, lessonNumber });
  if (!validation.isValid || validation.isProtectedOa) return { ok: false, error: validation.error || 'Matemática OA01 permanece protegida; no se guardó la edición.', validation };
  if (typeof window === 'undefined') return { ok: false, error: 'Almacenamiento del navegador no disponible.' };
  const key = getLessonCanonicalKey(grade, subject, oaCode, lessonNumber);
  const written: string[] = [];
  const previous = new Map<string, string | null>();
  try {
    for (const name of [CUSTOM_PLAYER_LESSONS_KEY, CUSTOM_STORAGE_KEY, LOCAL_STORAGE_KEY]) previous.set(name, localStorage.getItem(name));
    const playerMap = JSON.parse(previous.get(CUSTOM_PLAYER_LESSONS_KEY) || '{}');
    if (!playerMap || typeof playerMap !== 'object' || Array.isArray(playerMap)) return { ok: false, error: 'Almacenamiento Player no interpretable; se conserva sin sobrescribir.' };
    const storedPackages = JSON.parse(previous.get(CUSTOM_STORAGE_KEY) || '[]');
    if (!Array.isArray(storedPackages)) return { ok: false, error: 'Paquetes guardados no interpretables; se conservan sin sobrescribir.' };
    const sameOa = (p: InjectedOAPackage) => normalizeGrade(p.curso) === normalizeGrade(grade) && normalizeSubject(p.asignatura) === normalizeSubject(subject) && normalizeOa(p.oaCodigo) === normalizeOa(oaCode);
    // Conservar personalizaciones todavía no inicializadas en memoria, incluidas las de otros OAs.
    const next: InjectedOAPackage[] = JSON.parse(JSON.stringify(cachedInjectedPackages));
    for (const pkg of storedPackages) { const index = next.findIndex(same => same.oaId === pkg.oaId); if (index >= 0) next[index] = pkg; else next.push(pkg); }
    let target = next.find(sameOa);
    if (!target) {
      target = { oaId: options.oaId || `${grade}_${subject}_${oaCode}`, curso: grade, asignatura: subject, oaCodigo: oaCode, totalLecciones: lessonData.metadata.totalLessonsInOa, lessons: [], isCustomized: true };
      next.push(target);
    }
    const gen = adaptPlayerLessonToGenerator(lessonData);
    const index = target.lessons.findIndex(l => l.num === lessonNumber);
    if (index >= 0) target.lessons[index] = gen; else target.lessons.push(gen);
    target.isCustomized = true;
    target.totalLecciones = lessonData.metadata.totalLessonsInOa;
    playerMap[key] = lessonData;
    const values: Array<[string,string]> = [
      [CUSTOM_PLAYER_LESSONS_KEY, JSON.stringify(playerMap)],
      [CUSTOM_STORAGE_KEY, JSON.stringify(next.filter(pkg => pkg.isCustomized))],
      [LOCAL_STORAGE_KEY, JSON.stringify(next)]
    ];
    for (const [name, value] of values) { localStorage.setItem(name, value); written.push(name); }
    cachedInjectedPackages = next;
    return { ok: true, validation };
  } catch (error) {
    let rollbackFailed = false;
    for (const name of written.reverse()) {
      try { const old = previous.get(name); if (old === null) localStorage.removeItem(name); else if (old !== undefined) localStorage.setItem(name, old); }
      catch { rollbackFailed = true; }
    }
    return { ok: false, error: rollbackFailed ? `Falló el guardado y no pudo completarse la restauración: ${String(error)}` : `No se guardó la edición; se conserva la última versión válida. ${String(error)}` };
  }
}

export function resetCustomPlayerLesson(
  grade: string,
  subject: string,
  oaCode: string,
  lessonNumber: number
): void {
  if (isProtectedSelection(grade, subject, oaCode)) return;
  if (typeof window === 'undefined') return;
  const key = `${normalizeGrade(grade)}_${normalizeSubject(subject)}_${normalizeOa(oaCode)}_${lessonNumber}`;
  try {
    const raw = localStorage.getItem(CUSTOM_PLAYER_LESSONS_KEY);
    if (raw) {
      const map = JSON.parse(raw);
      delete map[key];
      localStorage.setItem(CUSTOM_PLAYER_LESSONS_KEY, JSON.stringify(map));
    }
  } catch (e) {
    console.error('Error al restablecer lección personalizada:', e);
  }
}

export function isPlayerLessonCustomized(grade: string, subject: string, oaCode: string, lessonNumber: number): boolean {
  if (typeof window === 'undefined' || isProtectedSelection(grade, subject, oaCode)) return false;
  try {
    const candidate = JSON.parse(localStorage.getItem(CUSTOM_PLAYER_LESSONS_KEY) || '{}')[getLessonCanonicalKey(grade, subject, oaCode, lessonNumber)];
    return Boolean(candidate && validateLessonCanonical(candidate, { grade, subject, oaCode, lessonNumber }).isValid);
  } catch { return false; }
}

export function isLessonCustomized(
  curso: string,
  asignatura: string,
  oaCodigo: string,
  lessonNum?: number
): boolean {
  if (lessonNum !== undefined) {
    if (isPlayerLessonCustomized(curso, asignatura, oaCodigo, lessonNum)) return true;
  }
  const keyGrade = normalizeGrade(curso);
  const keySubj = normalizeSubject(asignatura);
  const keyOa = normalizeOa(oaCodigo);

  const targetPkg = cachedInjectedPackages.find((p) => {
    return (
      p.isCustomized &&
      normalizeGrade(p.curso) === keyGrade &&
      normalizeSubject(p.asignatura) === keySubj &&
      normalizeOa(p.oaCodigo) === keyOa
    );
  });

  if (!targetPkg) return false;
  if (lessonNum === undefined) return true;
  return targetPkg.lessons.some((l) => l.num === lessonNum);
}

export function findInjectedLesson(grade: string, subject: string, oaCode: string, lessonNumber: number): PlayerLessonData | null {
  lastLessonLoadIssue = null;
  // El paquete aprobado se lee exclusivamente de fábrica, sin reauditar su pedagogía.
  if (isProtectedSelection(grade, subject, oaCode)) return findCanonicalFactoryLesson(grade, subject, oaCode, lessonNumber);
  const selection = { grade, subject, oaCode, lessonNumber };
  const accept = (candidate: any): PlayerLessonData | null => {
    const validation = validateLessonCanonical(candidate, selection);
    if (validation.isValid && !validation.isProtectedOa) return candidate;
    lastLessonLoadIssue = validation;
    console.warn('Lección no promovida:', validation.error, validation.details);
    return null;
  };
  if (typeof window !== 'undefined') {
    try {
      const map = JSON.parse(localStorage.getItem(CUSTOM_PLAYER_LESSONS_KEY) || '{}');
      const candidate = map[getLessonCanonicalKey(grade, subject, oaCode, lessonNumber)];
      if (candidate) { const valid = accept(candidate); if (valid) return valid; }
    } catch (error) {
      lastLessonLoadIssue = { isValid: false, status: 'NO_VERIFICABLE', error: `No se pudo leer la edición guardada: ${String(error)}`, details: [] };
    }
  }
  const canonical = findCanonicalFactoryLesson(grade, subject, oaCode, lessonNumber);
  if (canonical) return accept(canonical);
  const pkg = cachedInjectedPackages.find(p => normalizeGrade(p.curso) === normalizeGrade(grade) && normalizeSubject(p.asignatura) === normalizeSubject(subject) && normalizeOa(p.oaCodigo) === normalizeOa(oaCode));
  const candidate: any = pkg?.lessons.find(l => l.num === lessonNumber);
  if (!candidate || !pkg) return null;
  try {
    const player = candidate.metadata ? candidate : adaptGeneratorLessonToPlayer(candidate, { curso: pkg.curso, asignatura: pkg.asignatura, oa: pkg.oaCodigo }, pkg.totalLecciones);
    return accept(player);
  } catch (error) {
    lastLessonLoadIssue = { isValid: false, status: 'NO_VERIFICABLE', error: `No se pudo interpretar la versión anterior: ${String(error)}`, details: [] };
    return null;
  }
}

export function getInjectedPackage(
  curso: string,
  asignatura: string,
  oaCodigo: string
): InjectedOAPackage | null {
  const keyGrade = normalizeGrade(curso);
  const keySubj = normalizeSubject(asignatura);
  const keyOa = normalizeOa(oaCodigo);

  const basePkg = cachedInjectedPackages.find((p) => {
    return (
      normalizeGrade(p.curso) === keyGrade &&
      normalizeSubject(p.asignatura) === keySubj &&
      normalizeOa(p.oaCodigo) === keyOa
    );
  }) || null;

  const total = basePkg?.totalLecciones || 5;
  const lessons: GeneratorLessonData[] = [];

  for (let num = 1; num <= total; num++) {
    const playerLesson = findInjectedLesson(curso, asignatura, oaCodigo, num);
    if (playerLesson) {
      lessons.push(adaptPlayerLessonToGenerator(playerLesson));
    } else if (basePkg) {
      const gl = basePkg.lessons.find((l) => l.num === num);
      if (gl) lessons.push(gl);
    }
  }

  if (lessons.length > 0) {
    return {
      oaId: basePkg?.oaId || `${curso}_${asignatura}_${oaCodigo}`,
      curso,
      asignatura,
      oaCodigo,
      totalLecciones: total,
      lessons,
      isCustomized: lessons.some((l) => isPlayerLessonCustomized(curso, asignatura, oaCodigo, l.num))
    };
  }

  return basePkg;
}

export async function getInjectedPackageAsync(
  curso: string,
  asignatura: string,
  oaCodigo: string
): Promise<InjectedOAPackage | null> {
  if (cachedInjectedPackages.length === 0) {
    await initializeInjectedLessons();
  }
  return getInjectedPackage(curso, asignatura, oaCodigo);
}

// Inicialización proactiva en runtime de navegador
if (typeof window !== 'undefined') {
  initializeInjectedLessons().catch(console.error);
}

export function getAllInjectedPackages(): InjectedOAPackage[] {
  return cachedInjectedPackages;
}