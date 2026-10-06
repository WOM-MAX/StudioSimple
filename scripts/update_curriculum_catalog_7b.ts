import fs from 'path';
import fsPromises from 'fs';
import path from 'path';

const catalogPath = path.resolve('Web Studio Simple/public/data/curriculum_catalog.json');
const catalog = JSON.parse(fsPromises.readFileSync(catalogPath, 'utf8'));

let updatedCount = 0;
for (const item of catalog) {
  if (item.curso === '7° Básico' || item.curso === '7° Basico' || item.id.startsWith('110-7')) {
    if (item.leccionesSugeridas !== 6) {
      console.log(`Actualizando ${item.id} (${item.asignatura} - ${item.oa}): ${item.leccionesSugeridas} -> 6`);
      item.leccionesSugeridas = 6;
      updatedCount++;
    }
  }
}

fsPromises.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`Total items de 7° Básico actualizados a 6 lecciones: ${updatedCount}`);
