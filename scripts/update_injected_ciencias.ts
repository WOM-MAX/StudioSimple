import fs from 'fs';
import path from 'path';
import { generateOAPackage, OACatalogItem } from '../Web Studio Simple/src/lib/lesson-generator';

const catalogPath = path.resolve('Web Studio Simple/public/data/curriculum_catalog.json');
const catalog: OACatalogItem[] = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const targetId = '110-7-CIE-OA01';
const catalogItem = catalog.find((c) => c.id === targetId);

if (!catalogItem) {
  console.error(`No se encontro ${targetId} en el catalogo.`);
  process.exit(1);
}

console.log(`Generando paquete canónico para ${catalogItem.asignatura} (${catalogItem.oa})...`);
const pkg = generateOAPackage(catalogItem, 6);
console.log(`Paquete generado con ${pkg.lessons.length} lecciones.`);

const updateFile = (relativeFilePath: string) => {
  const filePath = path.resolve(relativeFilePath);
  if (!fs.existsSync(filePath)) {
    console.log(`Archivo no existe: ${filePath}`);
    return;
  }
  console.log(`Actualizando ${relativeFilePath}...`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let found = false;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (
      item.oaId === targetId ||
      (item.curso?.includes('7') &&
        (item.asignatura?.includes('Ciencias') && !item.asignatura?.includes('Sociales')) &&
        (item.oaCodigo === 'OA 1' || item.oaCodigo === 'OA 01' || item.oaCodigo === 'OA1'))
    ) {
      data[i] = {
        oaId: targetId,
        curso: catalogItem.curso,
        asignatura: catalogItem.asignatura,
        oaCodigo: catalogItem.oa,
        totalLecciones: 6,
        lessons: pkg.lessons
      };
      found = true;
      console.log(`  -> Encontrado y reemplazado en indice ${i}`);
      break;
    }
  }

  if (!found) {
    console.log(`  -> No se encontró elemento previo, agregándolo al inicio`);
    data.unshift({
      oaId: targetId,
      curso: catalogItem.curso,
      asignatura: catalogItem.asignatura,
      oaCodigo: catalogItem.oa,
      totalLecciones: 6,
      lessons: pkg.lessons
    });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`  -> Guardado exitosamente.`);
};

updateFile('Web Studio Simple/public/data/injected_lessons_7b.json');
updateFile('Web Studio Simple/public/data/injected_lessons_all_grades.json');
console.log('Actualización de paquetes inyectados finalizada.');
