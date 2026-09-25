import { LessonData as PlayerLessonData } from '../types/lesson';
import { GeneratedOAPackage, LessonData as GeneratorLessonData } from './lesson-generator';
import { adaptGeneratorLessonToPlayer, adaptPlayerLessonToGenerator } from './lesson-adapter';
import {
  MATEMATICA_7B_OA01_CLASE01,
  MATEMATICA_7B_OA01_CLASE02,
  CIENCIAS_7B_OA01_CLASE01,
  LENGUA_7B_OA03_CLASE01,
  HISTORIA_7B_OA02_CLASE01,
  INGLES_7B_OA09_CLASE01
} from '../data/lessons';

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
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localData) {
      try {
        localPackages = JSON.parse(localData);
      } catch (e) {
        console.error('Error al leer paquetes locales de lecciones:', e);
      }
    }

    const customData = localStorage.getItem(CUSTOM_STORAGE_KEY);
    if (customData) {
      try {
        customPackages = JSON.parse(customData);
      } catch (e) {
        console.error('Error al leer lecciones personalizadas:', e);
      }
    }
  }

  try {
    const res = await fetch('/data/injected_lessons_7b.json');
    if (res.ok) {
      const remotePackages: InjectedOAPackage[] = await res.json();
      const map = new Map<string, InjectedOAPackage>();
      remotePackages.forEach((p) => map.set(p.oaId || `${p.curso}_${p.asignatura}_${p.oaCodigo}`, p));
      localPackages.forEach((p) => map.set(p.oaId || `${p.curso}_${p.asignatura}_${p.oaCodigo}`, p));
      customPackages.forEach((p) => {
        map.set(p.oaId || `${p.curso}_${p.asignatura}_${p.oaCodigo}`, { ...p, isCustomized: true });
      });
      cachedInjectedPackages = Array.from(map.values());
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

function normalizeSubject(subject: string): string {
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

function normalizeOa(oaCode: string): string {
  const digits = (oaCode || '').replace(/[^0-9]/g, '');
  return digits ? `oa${parseInt(digits, 10)}` : (oaCode || '').toLowerCase().trim();
}

function normalizeGrade(grade: string): string {
  const digits = (grade || '').replace(/[^0-9]/g, '');
  return digits || (grade || '').toLowerCase().trim();
}

export function saveCustomLessonData(
  curso: string,
  asignatura: string,
  oaCodigo: string,
  oaId: string,
  lesson: GeneratorLessonData,
  totalLessons: number
): void {
  const keyGrade = normalizeGrade(curso);
  const keySubj = normalizeSubject(asignatura);
  const keyOa = normalizeOa(oaCodigo);

  let targetPkg = cachedInjectedPackages.find((p) => {
    return (
      (p.oaId && p.oaId === oaId) ||
      (normalizeGrade(p.curso) === keyGrade &&
        normalizeSubject(p.asignatura) === keySubj &&
        normalizeOa(p.oaCodigo) === keyOa)
    );
  });

  if (!targetPkg) {
    targetPkg = {
      oaId: oaId || `${curso}_${asignatura}_${oaCodigo}`,
      curso,
      asignatura,
      oaCodigo,
      totalLecciones: totalLessons,
      lessons: [lesson],
      isCustomized: true
    };
    cachedInjectedPackages.push(targetPkg);
  } else {
    targetPkg.isCustomized = true;
    targetPkg.totalLecciones = Math.max(targetPkg.totalLecciones, totalLessons);
    const existingIndex = targetPkg.lessons.findIndex((l) => l.num === lesson.num);
    if (existingIndex >= 0) {
      targetPkg.lessons[existingIndex] = lesson;
    } else {
      targetPkg.lessons.push(lesson);
    }
  }

  // Persistir en CUSTOM_STORAGE_KEY
  if (typeof window !== 'undefined') {
    try {
      const customizedOnly = cachedInjectedPackages.filter((p) => p.isCustomized);
      localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(customizedOnly));
      // También respaldar en LOCAL_STORAGE_KEY
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cachedInjectedPackages));
    } catch (e) {
      console.error('Error al persistir lección personalizada:', e);
    }
  }
}

export function resetCustomLessonData(
  curso: string,
  asignatura: string,
  oaCodigo: string,
  lessonNum?: number
): void {
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

  if ((keyGrade === '7' || keyGrade.includes('7')) && keySubj === 'mat' && keyOa === 'oa1') {
    if (lessonNumber === 1) return MATEMATICA_7B_OA01_CLASE01;
    if (lessonNumber === 2) return MATEMATICA_7B_OA01_CLASE02;
  }
  if ((keyGrade === '7' || keyGrade.includes('7')) && keySubj === 'cie' && keyOa === 'oa1') {
    if (lessonNumber === 1) return CIENCIAS_7B_OA01_CLASE01;
  }
  if ((keyGrade === '7' || keyGrade.includes('7')) && keySubj === 'len' && (keyOa === 'oa3' || keyOa === 'oa03')) {
    if (lessonNumber === 1) return LENGUA_7B_OA03_CLASE01;
  }
  if ((keyGrade === '7' || keyGrade.includes('7')) && keySubj === 'his' && (keyOa === 'oa2' || keyOa === 'oa02')) {
    if (lessonNumber === 1) return HISTORIA_7B_OA02_CLASE01;
  }
  if ((keyGrade === '7' || keyGrade.includes('7')) && keySubj === 'ing' && (keyOa === 'oa9' || keyOa === 'oa09')) {
    if (lessonNumber === 1) return INGLES_7B_OA09_CLASE01;
  }
  return null;
}

export function saveCustomPlayerLesson(
  grade: string,
  subject: string,
  oaCode: string,
  lessonNumber: number,
  lessonData: PlayerLessonData
): void {
  if (typeof window === 'undefined') return;
  const key = `${normalizeGrade(grade)}_${normalizeSubject(subject)}_${normalizeOa(oaCode)}_${lessonNumber}`;
  try {
    const raw = localStorage.getItem(CUSTOM_PLAYER_LESSONS_KEY);
    const map = raw ? JSON.parse(raw) : {};
    map[key] = lessonData;
    localStorage.setItem(CUSTOM_PLAYER_LESSONS_KEY, JSON.stringify(map));
  } catch (e) {
    console.error('Error al guardar lección personalizada en localStorage:', e);
  }
}

export function resetCustomPlayerLesson(
  grade: string,
  subject: string,
  oaCode: string,
  lessonNumber: number
): void {
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

export function isPlayerLessonCustomized(
  grade: string,
  subject: string,
  oaCode: string,
  lessonNumber: number
): boolean {
  if (typeof window === 'undefined') return false;
  const key = `${normalizeGrade(grade)}_${normalizeSubject(subject)}_${normalizeOa(oaCode)}_${lessonNumber}`;
  try {
    const raw = localStorage.getItem(CUSTOM_PLAYER_LESSONS_KEY);
    if (!raw) return false;
    const map = JSON.parse(raw);
    return Boolean(map[key]);
  } catch {
    return false;
  }
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

export function findInjectedLesson(
  grade: string,
  subject: string,
  oaCode: string,
  lessonNumber: number
): PlayerLessonData | null {
  const keyGrade = normalizeGrade(grade);
  const keySubj = normalizeSubject(subject);
  const keyOa = normalizeOa(oaCode);
  const customKey = `${keyGrade}_${keySubj}_${keyOa}_${lessonNumber}`;

  // 1. REGLA PRIORITARIA: Versión personalizada guardada por el usuario en localStorage
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(CUSTOM_PLAYER_LESSONS_KEY);
      if (raw) {
        const map = JSON.parse(raw);
        if (map[customKey]) {
          return map[customKey];
        }
      }
    } catch (e) {
      console.error('Error al leer custom player lesson:', e);
    }
  }

  // Compatibilidad con almacenamiento anterior
  const customPkg = cachedInjectedPackages.find((p) => {
    if (!p.isCustomized) return false;
    return (
      normalizeGrade(p.curso) === keyGrade &&
      normalizeSubject(p.asignatura) === keySubj &&
      normalizeOa(p.oaCodigo) === keyOa
    );
  });
  if (customPkg) {
    const customLesson = customPkg.lessons.find((l) => l.num === lessonNumber);
    if (customLesson) {
      return adaptGeneratorLessonToPlayer(
        customLesson,
        {
          curso: customPkg.curso,
          asignatura: customPkg.asignatura,
          oa: customPkg.oaCodigo
        },
        customPkg.totalLecciones
      );
    }
  }

  // 2. Sobrescrituras manuales curadas de alta fidelidad de fábrica
  const canonical = findCanonicalFactoryLesson(grade, subject, oaCode, lessonNumber);
  if (canonical) return canonical;

  // 3. Fallback canónico en los paquetes inyectados o generados
  const foundPkg = cachedInjectedPackages.find((p) => {
    const pkgGrade = normalizeGrade(p.curso);
    const pkgSubj = normalizeSubject(p.asignatura);
    const pkgOa = normalizeOa(p.oaCodigo);
    return pkgGrade === keyGrade && pkgSubj === keySubj && pkgOa === keyOa;
  });

  if (!foundPkg) return null;

  const genLesson = foundPkg.lessons.find((l) => l.num === lessonNumber);
  if (!genLesson) return null;

  return adaptGeneratorLessonToPlayer(
    genLesson,
    {
      curso: foundPkg.curso,
      asignatura: foundPkg.asignatura,
      oa: foundPkg.oaCodigo
    },
    foundPkg.totalLecciones
  );
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