import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateOAPackage, OACatalogItem } from '../src/lib/lesson-generator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const catalogPath = path.resolve(__dirname, '../public/data/curriculum_catalog.json');
const jsonPath = path.resolve(__dirname, '../public/data/injected_lessons_7b.json');

const catalog: OACatalogItem[] = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
const packages: any[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

const TARGET_OAS = [
  { id: '110-7-MAT-OA01', asignatura: 'Matemática', oa: 'OA 1', lecciones: 6 },
  { id: '110-7-LEN-OA03', asignatura: 'Lengua y Literatura', oa: 'OA 3', lecciones: 6 },
  { id: '110-7-CIE-OA01', asignatura: 'Ciencias Naturales', oa: 'OA 1', lecciones: 6 },
  { id: '110-7-HIS-OA02', asignatura: 'Historia, Geografía y Ciencias Sociales', oa: 'OA 2', lecciones: 5 },
  { id: '110-7-ING-OA09', asignatura: 'Inglés', oa: 'OA 9', lecciones: 6 }
];

console.log('Iniciando sincronizacion universal de los 5 paquetes troncales de 7° Basico...');

for (const target of TARGET_OAS) {
  const catalogItem = catalog.find((c) => c.id === target.id);
  if (!catalogItem) {
    console.error(`Error: No se encontro el item ${target.id} en curriculum_catalog.json`);
    process.exit(1);
  }

  const pkg = generateOAPackage(catalogItem, target.lecciones);

  let pkgIndex = packages.findIndex(
    (p) =>
      p.oaId === target.id ||
      (p.asignatura === target.asignatura && (p.oaCodigo === target.oa || p.oaCodigo === `OA 0${target.oa.replace(/\D/g, '')}` || p.oaCodigo === `OA${target.oa.replace(/\D/g, '')}`))
  );

  const updatedPackage = {
    oaId: catalogItem.id,
    curso: catalogItem.curso,
    asignatura: catalogItem.asignatura,
    oaCodigo: catalogItem.oa,
    totalLecciones: pkg.lessons.length,
    lessons: pkg.lessons
  };

  if (pkgIndex >= 0) {
    packages[pkgIndex] = updatedPackage;
    console.log(`Actualizado paquete existente [${pkgIndex}]: ${target.asignatura} (${catalogItem.id})`);
  } else {
    packages.push(updatedPackage);
    console.log(`Agregado nuevo paquete: ${target.asignatura} (${catalogItem.id})`);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(packages, null, 2), 'utf-8');
console.log('\ninjected_lessons_7b.json actualizado exitosamente con los 5 paquetes sincronizados.\n');

// Verificacion exhaustiva
packages.forEach((p) => {
  console.log(`=== ${p.asignatura} (${p.oaId} - ${p.oaCodigo}) ===`);
  p.lessons.forEach((l: any) => {
    const hookSlides = l.paso2_hook?.slides || [];
    const explSlides = l.paso4_explicativo?.slides || [];
    const sampleHook = hookSlides[0];
    const sampleExpl = explSlides[0];
    console.log(
      `  Clase ${l.num}: "${l.title}" | Hook: ${hookSlides.length} slides (overlayTitle: ${Boolean(sampleHook?.overlayTitle)}, vectorial: ${Boolean(sampleHook?.vectorialOverlayPptx)}) | Expl: ${explSlides.length} slides (overlayTitle: ${Boolean(sampleExpl?.overlayTitle)}, vectorial: ${Boolean(sampleExpl?.vectorialOverlayPptx)})`
    );
  });
});
