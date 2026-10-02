import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateOAPackage, OACatalogItem } from '../src/lib/lesson-generator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const catalogPath = path.resolve(rootDir, 'public/data/curriculum_catalog.json');
const existing7bPath = path.resolve(rootDir, 'public/data/injected_lessons_7b.json');
const outputAllGradesPath = path.resolve(rootDir, 'public/data/injected_lessons_all_grades.json');

interface InjectedOAPackage {
  oaId: string;
  curso: string;
  asignatura: string;
  oaCodigo: string;
  totalLecciones: number;
  lessons: any[];
  isCustomized?: boolean;
}

function run() {
  console.log('--- GENERACIÓN DE LECCIONES CANÓNICAS 3° A 8° BÁSICO ---');

  if (!fs.existsSync(catalogPath)) {
    console.error('No se encontró el archivo de catálogo:', catalogPath);
    process.exit(1);
  }

  const catalog: OACatalogItem[] = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  console.log(`Catálogo curricular cargado: ${catalog.length} OAs disponibles.`);

  let existingPackages: InjectedOAPackage[] = [];
  if (fs.existsSync(existing7bPath)) {
    existingPackages = JSON.parse(fs.readFileSync(existing7bPath, 'utf8'));
    console.log(`Paquetes existentes de 7° Básico cargados: ${existingPackages.length} paquetes.`);
  }

  const packageMap = new Map<string, InjectedOAPackage>();
  existingPackages.forEach((pkg) => {
    packageMap.set(pkg.oaId || `${pkg.curso}_${pkg.asignatura}_${pkg.oaCodigo}`, pkg);
  });

  const targetGrades = ['3° Básico', '4° Básico', '5° Básico', '6° Básico', '8° Básico'];

  // Agrupar catálogo por curso y asignatura
  const groupedByGradeAndSubj = new Map<string, OACatalogItem[]>();

  catalog.forEach((item) => {
    if (targetGrades.includes(item.curso)) {
      const key = `${item.curso}___${item.asignatura}`;
      if (!groupedByGradeAndSubj.has(key)) {
        groupedByGradeAndSubj.set(key, []);
      }
      groupedByGradeAndSubj.get(key)!.push(item);
    }
  });

  console.log(`Grupos curso-asignatura a generar: ${groupedByGradeAndSubj.size}`);

  let generatedCount = 0;

  for (const [key, oas] of groupedByGradeAndSubj.entries()) {
    const [curso, asignatura] = key.split('___');
    // Priorizar OAs del temario de exámenes libres o de prioridad demo
    const priorityOAs = oas.filter((o) => o.inTemarioEELL || o.isPriorityDemo);
    const selectedOAs = (priorityOAs.length > 0 ? priorityOAs : oas).slice(0, 2); // Tomar los 2 OAs prioritarios por asignatura

    for (const oaItem of selectedOAs) {
      const pkgId = oaItem.id || `${curso}_${asignatura}_${oaItem.oa}`;
      if (packageMap.has(pkgId)) {
        continue;
      }

      const numLessons = Math.min(oaItem.leccionesSugeridas || 4, 4);
      const generated = generateOAPackage(oaItem, numLessons);

      const injectedPkg: InjectedOAPackage = {
        oaId: oaItem.id,
        curso: oaItem.curso,
        asignatura: oaItem.asignatura,
        oaCodigo: oaItem.oa,
        totalLecciones: generated.totalLessons,
        lessons: generated.lessons
      };

      packageMap.set(pkgId, injectedPkg);
      generatedCount++;
    }
  }

  const finalPackages = Array.from(packageMap.values());
  console.log(`Total de paquetes generados e integrados: ${generatedCount}`);
  console.log(`Total final de paquetes en catálogo completo: ${finalPackages.length}`);

  fs.writeFileSync(outputAllGradesPath, JSON.stringify(finalPackages, null, 2), 'utf8');
  console.log(`Archivo guardado exitosamente en: ${outputAllGradesPath}`);

  // Mantener sincronizado injected_lessons_7b.json como retrocompatibilidad
  fs.writeFileSync(existing7bPath, JSON.stringify(finalPackages, null, 2), 'utf8');
  console.log(`Archivo de retrocompatibilidad actualizado en: ${existing7bPath}`);
}

run();
