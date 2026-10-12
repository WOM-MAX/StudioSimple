import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  LENGUA_7B_OA03_CLASE01,
  CIENCIAS_7B_OA01_CLASE01,
  HISTORIA_7B_OA02_CLASE01,
  INGLES_7B_OA09_CLASE01
} from '../Web Studio Simple/src/data/lessons';
import { adaptPlayerLessonToGenerator } from '../Web Studio Simple/src/lib/lesson-adapter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const JSON_FILES = [
  path.resolve(ROOT, 'Web Studio Simple', 'public', 'data', 'injected_lessons_all_grades.json'),
  path.resolve(ROOT, 'Web Studio Simple', 'public', 'data', 'injected_lessons_7b.json')
];

const CANONICAL_UPDATES = [
  {
    oaId: '110-7-LEN-OA03',
    curso: '7° Básico',
    asignatura: 'Lengua y Literatura',
    oaCodigo: 'OA 3',
    lessonData: LENGUA_7B_OA03_CLASE01
  },
  {
    oaId: '110-7-CNA-OA01',
    curso: '7° Básico',
    asignatura: 'Ciencias Naturales',
    oaCodigo: 'OA 1',
    lessonData: CIENCIAS_7B_OA01_CLASE01
  },
  {
    oaId: '110-7-HIS-OA02',
    curso: '7° Básico',
    asignatura: 'Historia, Geografía y Ciencias Sociales',
    oaCodigo: 'OA 2',
    lessonData: HISTORIA_7B_OA02_CLASE01
  },
  {
    oaId: '110-7-ING-OA09',
    curso: '7° Básico',
    asignatura: 'Idioma Extranjero Inglés',
    oaCodigo: 'OA 9',
    lessonData: INGLES_7B_OA09_CLASE01
  }
];

function run() {
  console.log('=== SINCRONIZANDO LECCIONES CANÓNICAS A ARCHIVOS INJECTED JSON ===\n');

  for (const filePath of JSON_FILES) {
    if (!fs.existsSync(filePath)) {
      console.warn(`[WARN] Archivo no existe: ${filePath}`);
      continue;
    }

    console.log(`[+] Procesando: ${filePath}`);
    const raw = fs.readFileSync(filePath, 'utf8');
    const packages: any[] = JSON.parse(raw);

    let updatedCount = 0;

    for (const update of CANONICAL_UPDATES) {
      const adaptedGenLesson = adaptPlayerLessonToGenerator(update.lessonData);

      // Buscar paquete
      let pkg = packages.find(p => {
        return (
          (p.oaId && p.oaId === update.oaId) ||
          (p.curso === update.curso &&
            (p.asignatura.includes(update.asignatura) || update.asignatura.includes(p.asignatura)) &&
            (p.oaCodigo === update.oaCodigo || p.oa === update.oaCodigo))
        );
      });

      if (pkg) {
        if (!pkg.lessons) pkg.lessons = [];
        const existingIdx = pkg.lessons.findIndex((l: any) => l.num === 1);
        if (existingIdx >= 0) {
          pkg.lessons[existingIdx] = adaptedGenLesson;
        } else {
          pkg.lessons.unshift(adaptedGenLesson);
        }
        console.log(`    ✓ Paquete ${pkg.oaId || update.oaId} actualizado (Clase 1: "${adaptedGenLesson.title}")`);
        updatedCount++;
      } else {
        console.warn(`    ! No se encontró paquete existente para ${update.oaId}, creando uno nuevo...`);
        const newPkg = {
          oaId: update.oaId,
          curso: update.curso,
          asignatura: update.asignatura,
          oaCodigo: update.oaCodigo,
          totalLecciones: 6,
          lessons: [adaptedGenLesson]
        };
        packages.push(newPkg);
        updatedCount++;
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(packages, null, 2), 'utf8');
    console.log(`    ✓ ${updatedCount} paquetes sincronizados en ${path.basename(filePath)}\n`);
  }

  console.log('=== SINCRONIZACIÓN DE JSON COMPLETADA EXITOSAMENTE ===');
}

run();
