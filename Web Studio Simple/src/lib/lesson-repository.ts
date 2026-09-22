import { LessonData as PlayerLessonData } from '../types/lesson';
import { GeneratedOAPackage, LessonData as GeneratorLessonData } from './lesson-generator';
import { adaptGeneratorLessonToPlayer } from './lesson-adapter';
import { MATEMATICA_7B_OA01_CLASE01, MATEMATICA_7B_OA01_CLASE02 } from '../data/lessons';

const LOCAL_STORAGE_KEY = 'estudiosimple_injected_lessons';

export interface InjectedOAPackage {
  oaId: string;
  curso: string;
  asignatura: string;
  oaCodigo: string;
  totalLecciones: number;
  lessons: GeneratorLessonData[];
}

let cachedInjectedPackages: InjectedOAPackage[] = [];

export async function initializeInjectedLessons(): Promise<InjectedOAPackage[]> {
  const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
  let localPackages: InjectedOAPackage[] = [];
  if (localData) {
    try {
      localPackages = JSON.parse(localData);
    } catch (e) {
      console.error('Error al leer paquetes locales de lecciones:', e);
    }
  }

  try {
    const res = await fetch('/data/injected_lessons_7b.json');
    if (res.ok) {
      const remotePackages: InjectedOAPackage[] = await res.json();
      const map = new Map<string, InjectedOAPackage>();
      remotePackages.forEach(p => map.set(p.oaId || `${p.curso}_${p.asignatura}_${p.oaCodigo}`, p));
      localPackages.forEach(p => map.set(p.oaId || `${p.curso}_${p.asignatura}_${p.oaCodigo}`, p));
      cachedInjectedPackages = Array.from(map.values());
    } else {
      cachedInjectedPackages = localPackages;
    }
  } catch {
    cachedInjectedPackages = localPackages;
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
  cachedInjectedPackages.forEach(p => map.set(p.oaId, p));
  map.set(injectedItem.oaId, injectedItem);
  cachedInjectedPackages = Array.from(map.values());

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cachedInjectedPackages));
  } catch (e) {
    console.error('Error al persistir lecciones en localStorage:', e);
  }
}

function normalizeSubject(subject: string): string {
  const clean = (subject || '')
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
  if (clean.includes('mat')) return 'mat';
  if (clean.includes('leng') || clean.includes('liter')) return 'len';
  if (clean.includes('cien') || clean.includes('nat')) return 'cie';
  if (clean.includes('hist') || clean.includes('geog') || clean.includes('soc')) return 'his';
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

export function findInjectedLesson(
  grade: string,
  subject: string,
  oaCode: string,
  lessonNumber: number
): PlayerLessonData | null {
  const keyGrade = normalizeGrade(grade);
  const keySubj = normalizeSubject(subject);
  const keyOa = normalizeOa(oaCode);

  // Sobrescrituras manuales curadas de alta fidelidad (Matematica 7B OA01)
  if ((keyGrade === '7' || keyGrade.includes('7')) && keySubj === 'mat' && keyOa === 'oa1') {
    if (lessonNumber === 1) return MATEMATICA_7B_OA01_CLASE01;
    if (lessonNumber === 2) return MATEMATICA_7B_OA01_CLASE02;
  }

  const foundPkg = cachedInjectedPackages.find(p => {
    const pkgGrade = normalizeGrade(p.curso);
    const pkgSubj = normalizeSubject(p.asignatura);
    const pkgOa = normalizeOa(p.oaCodigo);
    return pkgGrade === keyGrade && pkgSubj === keySubj && pkgOa === keyOa;
  });

  if (!foundPkg) return null;

  const genLesson = foundPkg.lessons.find(l => l.num === lessonNumber);
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

// Inicializacion proactiva en runtime de navegador
if (typeof window !== 'undefined') {
  initializeInjectedLessons().catch(console.error);
}

export function getAllInjectedPackages(): InjectedOAPackage[] {
  return cachedInjectedPackages;
}