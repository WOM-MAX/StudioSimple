import { saveCustomPlayerLesson, getLessonCanonicalKey } from '../Web Studio Simple/src/lib/lesson-repository';
import * as ALL_CANONICAL_LESSONS from '../Web Studio Simple/src/data/lessons';

// Mock localStorage
const storage: Record<string, string> = {};
(global as any).localStorage = {
  getItem: (k: string) => storage[k] || null,
  setItem: (k: string, v: string) => { storage[k] = v; },
  removeItem: (k: string) => { delete storage[k]; }
};
(global as any).window = {};

const cases = [
  { name: 'MAT OA04 C01', grade: '7° Básico', subj: 'Matemática', oa: 'OA 4', num: 1, obj: ALL_CANONICAL_LESSONS.MATEMATICA_7B_OA04_CLASE01 },
  { name: 'LEN OA03 C02', grade: '7° Básico', subj: 'Lengua y Literatura', oa: 'OA 3', num: 2, obj: ALL_CANONICAL_LESSONS.LENGUA_7B_OA03_CLASE02 },
  { name: 'CIE OA01 C02', grade: '7° Básico', subj: 'Ciencias Naturales', oa: 'OA 1', num: 2, obj: ALL_CANONICAL_LESSONS.CIENCIAS_7B_OA01_CLASE02 },
  { name: 'HIS OA02 C01', grade: '7° Básico', subj: 'Historia, Geografía y Ciencias Sociales', oa: 'OA 2', num: 1, obj: ALL_CANONICAL_LESSONS.HISTORIA_7B_OA02_CLASE01 },
  { name: 'ING OA09 C01', grade: '7° Básico', subj: 'Inglés', oa: 'OA 9', num: 1, obj: ALL_CANONICAL_LESSONS.INGLES_7B_OA09_CLASE01 },
];

for (const c of cases) {
  const mutated = JSON.parse(JSON.stringify(c.obj));
  mutated.prep.routeToday = `Ruta guiada de prueba [TEST_${c.name}]`;
  const res = saveCustomPlayerLesson(c.grade, c.subj, c.oa, c.num, mutated);
  const key = getLessonCanonicalKey(c.grade, c.subj, c.oa, c.num);
  const stored = JSON.parse(storage['estudiosimple_custom_player_lessons'] || '{}')[key];
  console.log(`${c.name}: res.ok=${res.ok}, error=${res.error}, key=${key}, stored=${Boolean(stored)}`);
  if (stored) {
    console.log(`  routeToday in storage:`, stored.prep.routeToday);
  }
}
