import { LessonData as PlayerLessonData } from '../types/lesson';
import { GeneratedOAPackage, LessonData as GeneratorLessonData } from './lesson-generator';
import { adaptGeneratorLessonToPlayer } from './lesson-adapter';

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

export function findInjectedLesson(
  grade: string,
  subject: string,
  oaCode: string,
  lessonNumber: number
): PlayerLessonData | null {
  const cleanStr = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  const cleanGrade = cleanStr(grade);
  const cleanSubj = cleanStr(subject);
  const cleanOa = cleanStr(oaCode);

  const foundPkg = cachedInjectedPackages.find(p => {
    const matchGrade = cleanStr(p.curso).includes(cleanGrade) || cleanGrade.includes(cleanStr(p.curso));
    const matchSubj = cleanStr(p.asignatura).includes(cleanSubj) || cleanSubj.includes(cleanStr(p.asignatura));
    const matchOa = cleanStr(p.oaCodigo) === cleanOa || cleanOa.endsWith(cleanStr(p.oaCodigo).replace(/[^0-9]/g, ''));
    return matchGrade && matchSubj && matchOa;
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

export function getAllInjectedPackages(): InjectedOAPackage[] {
  return cachedInjectedPackages;
}