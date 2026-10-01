import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Packer } from 'docx';
import { generateOAPackage, OACatalogItem } from '../src/lib/lesson-generator';
import { buildOAPackageDocx } from '../src/lib/docx-export';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const catalogPath = path.resolve(__dirname, '../public/data/curriculum_catalog.json');
const catalog: OACatalogItem[] = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

const TARGET_SUBJECTS = [
  {
    id: '110-7-LEN-OA03',
    lecciones: 6,
    shortName: 'Lenguaje_OA03.docx',
    fullName: 'Plan_Maestro_7Básico_110-7-LEN-OA03_6Lecciones.docx'
  },
  {
    id: '110-7-CIE-OA01',
    lecciones: 6,
    shortName: 'Ciencias_OA01.docx',
    fullName: 'Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx'
  },
  {
    id: '110-7-HIS-OA02',
    lecciones: 5,
    shortName: 'Historia_OA02.docx',
    fullName: 'Plan_Maestro_7Básico_110-7-HIS-OA02_5Lecciones.docx'
  },
  {
    id: '110-7-ING-OA09',
    lecciones: 6,
    shortName: 'Ingles_OA09.docx',
    fullName: 'Plan_Maestro_7Básico_110-7-ING-OA09_6Lecciones.docx'
  }
];

const userProfile = process.env.USERPROFILE || 'C:\\Users\\DELL';
const candidateDirs = [
  path.resolve(__dirname, '../../PLANES MAESTROS PRESENTACIONES/Paquete_Maestro_EstudioSimple_7B/04_PLANES_OA_Y_PROMPTS'),
  'C:\\Proyectos\\StudioSimple\\PLANES MAESTROS PRESENTACIONES\\Paquete_Maestro_EstudioSimple_7B\\04_PLANES_OA_Y_PROMPTS',
  path.join(userProfile, 'OneDrive', 'EstudioSimple-Contenido', 'EstudioSimple_7B_Planes_Actualizados-29-09-2026'),
  'D:\\OneDrive\\EstudioSimple-Contenido\\EstudioSimple_7B_Planes_Actualizados-29-09-2026',
  path.resolve(process.cwd(), 'dist', 'planes_actualizados')
];

async function exportAllSubjects() {
  console.log('Iniciando exportacion oficial de Planes Maestros DOCX para Lengua, Ciencias, Historia e Ingles...');

  for (const item of TARGET_SUBJECTS) {
    const catalogItem = catalog.find((c) => c.id === item.id);
    if (!catalogItem) {
      console.error(`Error: No se encontro el item ${item.id} en curriculum_catalog.json`);
      continue;
    }

    console.log(`\n======================================================`);
    console.log(`Generando paquete oficial para ${catalogItem.asignatura} (${catalogItem.id})...`);
    const pkg = generateOAPackage(catalogItem, item.lecciones);
    console.log(`Paquete generado con ${pkg.lessons.length} lecciones.`);

    console.log(`Construyendo documento Word oficial (buildOAPackageDocx)...`);
    const doc = buildOAPackageDocx(pkg);

    console.log(`Empaquetando buffer binario DOCX...`);
    const buffer = await Packer.toBuffer(doc);
    console.log(`Buffer DOCX creado con exito: ${buffer.length} bytes.`);

    for (const destDir of candidateDirs) {
      try {
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        const fileShort = path.join(destDir, item.shortName);
        const fileFull = path.join(destDir, item.fullName);

        fs.writeFileSync(fileShort, buffer);
        fs.writeFileSync(fileFull, buffer);
        console.log(`Guardado exitoso en ${destDir}:`);
        console.log(`  - ${item.shortName} (${buffer.length} bytes)`);
        console.log(`  - ${item.fullName} (${buffer.length} bytes)`);
      } catch (err: any) {
        console.warn(`No se pudo escribir en ${destDir}: ${err.message}`);
      }
    }
  }

  console.log('\nExportacion oficial completada para todos los OA troncales.');
}

exportAllSubjects().catch((err) => {
  console.error('Error durante la exportacion de DOCX:', err);
  process.exit(1);
});
