import fs from 'fs';
import path from 'path';
import { generateOAPackage, OACatalogItem } from '../Web Studio Simple/src/lib/lesson-generator';
import { adaptGeneratorLessonToPlayer } from '../Web Studio Simple/src/lib/lesson-adapter';
import { LessonData } from '../Web Studio Simple/src/types/lesson';

const rootDir = process.cwd();
const catalogPath = path.resolve(rootDir, 'Web Studio Simple/public/data/curriculum_catalog.json');
const catalog: OACatalogItem[] = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const lessonsDir = path.resolve(rootDir, 'Web Studio Simple/src/data/lessons');

// 1. Fix historia_7b_oa02_clase01.ts metadata.totalLessonsInOa
const historiaClase01Path = path.join(lessonsDir, 'historia_7b_oa02_clase01.ts');
if (fs.existsSync(historiaClase01Path)) {
  let h1 = fs.readFileSync(historiaClase01Path, 'utf8');
  if (h1.includes('totalLessonsInOa: 5')) {
    h1 = h1.replace('totalLessonsInOa: 5', 'totalLessonsInOa: 6');
    fs.writeFileSync(historiaClase01Path, h1, 'utf8');
    console.log('Actualizado historia_7b_oa02_clase01.ts -> totalLessonsInOa: 6');
  }
}

const subjectsToGenerate = [
  {
    catalogId: '110-7-HIS-OA02',
    prefix: 'historia_7b_oa02',
    constPrefix: 'HISTORIA_7B_OA02',
    lessonsToGenerate: [2, 3, 4, 5, 6]
  },
  {
    catalogId: '110-7-LEN-OA03',
    prefix: 'lengua_7b_oa03',
    constPrefix: 'LENGUA_7B_OA03',
    lessonsToGenerate: [2, 3, 4, 5, 6]
  },
  {
    catalogId: '110-7-ING-OA09',
    prefix: 'ingles_7b_oa09',
    constPrefix: 'INGLES_7B_OA09',
    lessonsToGenerate: [2, 3, 4, 5, 6]
  }
];

for (const sub of subjectsToGenerate) {
  const catalogItem = catalog.find(c => c.id === sub.catalogId);
  if (!catalogItem) {
    throw new Error(`Item ${sub.catalogId} no encontrado en curriculum_catalog.json`);
  }

  console.log(`\n======================================================`);
  console.log(`Generando paquete de 6 clases para ${catalogItem.asignatura} (${sub.catalogId})...`);
  const pkg = generateOAPackage(catalogItem, 6);

  for (const num of sub.lessonsToGenerate) {
    const genLesson = pkg.lessons.find(l => l.num === num);
    if (!genLesson) {
      throw new Error(`No se encontró la lección ${num} para ${sub.catalogId}`);
    }

    const playerLesson: LessonData = adaptGeneratorLessonToPlayer(genLesson, catalogItem, 6);
    
    // Ensure metadata is completely correct
    playerLesson.metadata.totalLessonsInOa = 6;
    playerLesson.metadata.lessonNumber = num;
    if (num < 6) {
      const nextLesson = pkg.lessons.find(l => l.num === num + 1);
      playerLesson.metadata.nextLessonTitle = nextLesson ? nextLesson.title : 'Próxima Lección';
    } else {
      playerLesson.metadata.nextLessonTitle = 'Fin de Unidad: Felicitaciones por completar el Objetivo de Aprendizaje';
    }

    const padNum = String(num).padStart(2, '0');
    const filename = `${sub.prefix}_clase${padNum}.ts`;
    const varName = `${sub.constPrefix}_CLASE${padNum}`;
    const filePath = path.join(lessonsDir, filename);

    const tsContent = `import { LessonData } from '../../types/lesson';\n\nexport const ${varName}: LessonData = ${JSON.stringify(playerLesson, null, 2)};\n`;
    fs.writeFileSync(filePath, tsContent, 'utf8');
    console.log(`✓ Creado ${filename} (${fs.statSync(filePath).size} bytes) con constante ${varName}`);
  }
}

console.log('\n¡Todos los módulos TypeScript de Historia, Lengua e Inglés han sido generados exitosamente!');
