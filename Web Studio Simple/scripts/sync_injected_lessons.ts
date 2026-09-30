import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  MATEMATICA_7B_OA01_CLASE01,
  MATEMATICA_7B_OA01_CLASE02,
  MATEMATICA_7B_OA01_CLASE03,
  MATEMATICA_7B_OA01_CLASE04,
  MATEMATICA_7B_OA01_CLASE05,
  MATEMATICA_7B_OA01_CLASE06
} from '../src/data/lessons/index.js';
import { adaptPlayerLessonToGenerator } from '../src/lib/lesson-adapter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.resolve(__dirname, '../public/data/injected_lessons_7b.json');
const rawData = fs.readFileSync(jsonPath, 'utf-8');
const packages = JSON.parse(rawData);

const matIndex = packages.findIndex(
  (p: any) =>
    (p.oaId === '110-7-MAT-OA01' || p.asignatura === 'Matemática') &&
    (p.oaCodigo === 'OA 1' || p.oaCodigo === 'OA01')
);

if (matIndex === -1) {
  console.error('No se encontro el paquete de Matematica 7B OA01');
  process.exit(1);
}

const canonicalLessons = [
  MATEMATICA_7B_OA01_CLASE01,
  MATEMATICA_7B_OA01_CLASE02,
  MATEMATICA_7B_OA01_CLASE03,
  MATEMATICA_7B_OA01_CLASE04,
  MATEMATICA_7B_OA01_CLASE05,
  MATEMATICA_7B_OA01_CLASE06
];

const convertedLessons = canonicalLessons.map((l) => adaptPlayerLessonToGenerator(l));

packages[matIndex].totalLecciones = convertedLessons.length;
packages[matIndex].lessons = convertedLessons;

fs.writeFileSync(jsonPath, JSON.stringify(packages, null, 2), 'utf-8');
console.log('injected_lessons_7b.json actualizado exitosamente con 6 lecciones canonicas.');
convertedLessons.forEach((l) => {
  console.log(`Clase ${l.num}: ${l.title} - Hook Slides: ${l.paso2_hook?.slides?.length || 0}, Expl Slides: ${l.paso4_explicativo?.slides?.length || 0}`);
});
