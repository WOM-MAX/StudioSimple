import fs from 'fs';
import path from 'path';

const lessonsDir = path.resolve('Web Studio Simple/src/data/lessons');

function writeLesson(filename: string, varName: string, data: any) {
  const content = `import { LessonData } from '../../types/lesson';\n\nexport const ${varName}: LessonData = ${JSON.stringify(data, null, 2)};\n`;
  const filePath = path.join(lessonsDir, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Guardado ${filename} (${content.length} caracteres)`);
}

// Importar o definir clase 2
import { buildClase02 } from './ciencias_data/clase02_data';
import { buildClase03 } from './ciencias_data/clase03_data';
import { buildClase04 } from './ciencias_data/clase04_data';
import { buildClase05 } from './ciencias_data/clase05_data';
import { buildClase06 } from './ciencias_data/clase06_data';

async function main() {
  console.log('Iniciando generacion de Clases 2 a 6 para Ciencias Naturales 7° Basico OA 01...');
  writeLesson('ciencias_7b_oa01_clase02.ts', 'CIENCIAS_7B_OA01_CLASE02', buildClase02());
  writeLesson('ciencias_7b_oa01_clase03.ts', 'CIENCIAS_7B_OA01_CLASE03', buildClase03());
  writeLesson('ciencias_7b_oa01_clase04.ts', 'CIENCIAS_7B_OA01_CLASE04', buildClase04());
  writeLesson('ciencias_7b_oa01_clase05.ts', 'CIENCIAS_7B_OA01_CLASE05', buildClase05());
  writeLesson('ciencias_7b_oa01_clase06.ts', 'CIENCIAS_7B_OA01_CLASE06', buildClase06());
  console.log('Todas las lecciones de Ciencias Naturales han sido creadas exitosamente.');
}

main().catch(err => {
  console.error('Error generando lecciones:', err);
  process.exit(1);
});
