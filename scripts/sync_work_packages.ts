import fs from 'fs';
import path from 'path';
import { generateOAPackage, OACatalogItem } from '../Web Studio Simple/src/lib/lesson-generator';
import { adaptGeneratorLessonToPlayer } from '../Web Studio Simple/src/lib/lesson-adapter';
import { buildLessonPromptText } from '../Web Studio Simple/src/lib/prompt-export';

const catalogPath = path.resolve('Web Studio Simple/public/data/curriculum_catalog.json');
const catalog: OACatalogItem[] = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const TARGET_SUBJECTS = [
  {
    id: '110-7-LEN-OA03',
    subjectName: 'Lengua y Literatura',
    oaCode: 'OA 3',
    lecciones: 6,
    shortDocx: 'Lenguaje_OA03.docx',
    fullDocx: 'Plan_Maestro_7Básico_110-7-LEN-OA03_6Lecciones.docx',
    txtFileName: 'Prompts_Work_Lenguaje_7B_OA03.txt'
  },
  {
    id: '110-7-CIE-OA01',
    subjectName: 'Ciencias Naturales',
    oaCode: 'OA 1',
    lecciones: 6,
    shortDocx: 'Ciencias_OA01.docx',
    fullDocx: 'Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx',
    txtFileName: 'Prompts_Work_Ciencias_7B_OA01.txt'
  },
  {
    id: '110-7-HIS-OA02',
    subjectName: 'Historia, Geografía y Ciencias Sociales',
    oaCode: 'OA 2',
    lecciones: 5,
    shortDocx: 'Historia_OA02.docx',
    fullDocx: 'Plan_Maestro_7Básico_110-7-HIS-OA02_5Lecciones.docx',
    txtFileName: 'Prompts_Work_Historia_7B_OA02.txt'
  },
  {
    id: '110-7-ING-OA09',
    subjectName: 'Inglés',
    oaCode: 'OA 9',
    lecciones: 6,
    shortDocx: 'Ingles_OA09.docx',
    fullDocx: 'Plan_Maestro_7Básico_110-7-ING-OA09_6Lecciones.docx',
    txtFileName: 'Prompts_Work_Ingles_7B_OA09.txt'
  }
];

const sourceDocxDir = path.resolve('PLANES MAESTROS PRESENTACIONES/Paquete_Maestro_EstudioSimple_7B/04_PLANES_OA_Y_PROMPTS');
const targetDescargasDir = path.resolve('DESCARGA_LECCIONES');
const targetTxtDir = path.resolve('DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK');
const publicDescargasDir = path.resolve('Web Studio Simple/public/descargas_planes_maestros');

function main() {
  console.log('=== SINCRONIZACION Y EMPAQUETADO PARA CHATGPT WORK ===');
  console.log('(Excluyendo Matematica OA01 segun directiva)\n');

  // Asegurar directorios destino
  [targetDescargasDir, targetTxtDir, publicDescargasDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  for (const item of TARGET_SUBJECTS) {
    console.log(`\n--------------------------------------------------------------`);
    console.log(`Procesando: ${item.subjectName} (${item.oaCode} - ${item.id})`);

    // 1. Sincronizar DOCX oficiales
    const srcDocxPath = path.join(sourceDocxDir, item.shortDocx);
    if (!fs.existsSync(srcDocxPath)) {
      throw new Error(`Archivo fuente DOCX no encontrado: ${srcDocxPath}`);
    }

    const docxBuffer = fs.readFileSync(srcDocxPath);
    console.log(`Leido DOCX fuente: ${srcDocxPath} (${docxBuffer.length} bytes)`);

    // Guardar en DESCARGA_LECCIONES (ambos nombres: corto y canonico)
    const destShort = path.join(targetDescargasDir, item.shortDocx);
    const destFull = path.join(targetDescargasDir, item.fullDocx);
    fs.writeFileSync(destShort, docxBuffer);
    fs.writeFileSync(destFull, docxBuffer);
    console.log(`Actualizado en DESCARGA_LECCIONES:`);
    console.log(`  -> ${item.shortDocx} (${docxBuffer.length} bytes)`);
    console.log(`  -> ${item.fullDocx} (${docxBuffer.length} bytes)`);

    // Guardar en Web Studio Simple/public/descargas_planes_maestros
    const publicShort = path.join(publicDescargasDir, item.shortDocx);
    const publicFull = path.join(publicDescargasDir, item.fullDocx);
    fs.writeFileSync(publicShort, docxBuffer);
    fs.writeFileSync(publicFull, docxBuffer);
    console.log(`Copiado a public/descargas_planes_maestros:`);
    console.log(`  -> ${item.shortDocx}`);
    console.log(`  -> ${item.fullDocx}`);

    // 2. Generar archivo consolidado de Prompts TXT para Work
    const catalogItem = catalog.find((c) => c.id === item.id);
    if (!catalogItem) {
      throw new Error(`Item ${item.id} no encontrado en curriculum_catalog.json`);
    }

    const pkg = generateOAPackage(catalogItem, item.lecciones);
    console.log(`Paquete generado con ${pkg.lessons.length} lecciones.`);

    let consolidatedTxt = '';
    consolidatedTxt += `================================================================================\n`;
    consolidatedTxt += `STUDIOSIMPLE - PAQUETE DE PROMPTS Y GUIONES OFICIALES PARA CHATGPT WORK\n`;
    consolidatedTxt += `ASIGNATURA: ${item.subjectName.toUpperCase()}\n`;
    consolidatedTxt += `CURSO: 7° BASICO | OBJETIVO: ${item.oaCode} (${catalogItem.descripcion})\n`;
    consolidatedTxt += `TOTAL DE CLASES: ${item.lecciones} LECCIONES (14 DIAPOSITIVAS POR CLASE = ${item.lecciones * 14} LAMINAS TOTALES)\n`;
    consolidatedTxt += `FORMATO: 7 DIAPOSITIVAS VIDEO GANCHO (60s) + 7 DIAPOSITIVAS VIDEO EXPLICATIVO (90s)\n`;
    consolidatedTxt += `================================================================================\n\n`;

    pkg.lessons.forEach((genLesson, lIdx) => {
      const playerLesson = adaptGeneratorLessonToPlayer(genLesson, catalogItem, item.lecciones);
      const lessonTxt = buildLessonPromptText(playerLesson);
      consolidatedTxt += `\n################################################################################\n`;
      consolidatedTxt += `### CLASE ${lIdx + 1} DE ${item.lecciones}: ${genLesson.title.toUpperCase()}\n`;
      consolidatedTxt += `################################################################################\n\n`;
      consolidatedTxt += lessonTxt;
      consolidatedTxt += `\n\n`;
    });

    // Guardar archivo .txt en DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/
    const txtPath = path.join(targetTxtDir, item.txtFileName);
    fs.writeFileSync(txtPath, consolidatedTxt, 'utf8');

    // Tambien en public
    const publicTxtPath = path.join(publicDescargasDir, item.txtFileName);
    fs.writeFileSync(publicTxtPath, consolidatedTxt, 'utf8');

    console.log(`Generado archivo TXT para Work:`);
    console.log(`  -> ${item.txtFileName} (${consolidatedTxt.length} caracteres, ${Buffer.byteLength(consolidatedTxt, 'utf8')} bytes)`);
  }

  // Generar README indice para Work en DESCARGA_LECCIONES
  const indexContent = `# PAQUETE DE LECCIONES Y PROMPTS PARA CHATGPT WORK (7° BASICO)

Este paquete contiene los documentos oficiales (Word DOCX) y los archivos de prompts en texto (.txt) correspondientes a los primeros objetivos priorizados de las asignaturas troncales de 7° Básico para la generación de presentaciones PPTX en ChatGPT Work.

Nota: Matemática OA 01 fue cerrado y certificado previamente, por lo que no se incluye en este lote.

## 1. Asignaturas y Documentos Incluidos

1. **Lengua y Literatura (7° Básico OA 3):**
   - Documento Word Oficial: \`Lenguaje_OA03.docx\` / \`Plan_Maestro_7Básico_110-7-LEN-OA03_6Lecciones.docx\`
   - Prompts de Diapositivas para Work: \`PROMPTS_TXT_PARA_WORK/Prompts_Work_Lenguaje_7B_OA03.txt\`
   - Contenido: 6 Clases (84 láminas en total, 14 láminas por clase).

2. **Ciencias Naturales (7° Básico OA 1):**
   - Documento Word Oficial: \`Ciencias_OA01.docx\` / \`Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx\`
   - Prompts de Diapositivas para Work: \`PROMPTS_TXT_PARA_WORK/Prompts_Work_Ciencias_7B_OA01.txt\`
   - Contenido: 6 Clases (84 láminas en total, 14 láminas por clase).

3. **Historia, Geografía y Ciencias Sociales (7° Básico OA 2):**
   - Documento Word Oficial: \`Historia_OA02.docx\` / \`Plan_Maestro_7Básico_110-7-HIS-OA02_5Lecciones.docx\`
   - Prompts de Diapositivas para Work: \`PROMPTS_TXT_PARA_WORK/Prompts_Work_Historia_7B_OA02.txt\`
   - Contenido: 5 Clases (70 láminas en total, 14 láminas por clase).

4. **Idioma Extranjero Inglés (7° Básico OA 9):**
   - Documento Word Oficial: \`Ingles_OA09.docx\` / \`Plan_Maestro_7Básico_110-7-ING-OA09_6Lecciones.docx\`
   - Prompts de Diapositivas para Work: \`PROMPTS_TXT_PARA_WORK/Prompts_Work_Ingles_7B_OA09.txt\`
   - Contenido: 6 Clases (84 láminas en total, 14 láminas por clase).

## 2. Instrucciones de Procesamiento para ChatGPT Work

Para cada clase, Work debe construir la presentación PPTX correspondiente respetando:
- Diapositivas 1 a 7: Módulo 1 (Video Gancho Motivacional - 60s).
- Diapositivas 8 a 14: Módulo 2 (Video Explicativo Conceptual - 90s).
- Estilo Visual: Anime Moderno 16:9 con espacio negativo limpio, sin textos incrustados por IA.
- Título en Pantalla: 64 pt (alto contraste).
- Subtítulo en Pantalla: 36 pt.
- Capas Vectoriales PPTX y Locución Limpia en las Notas del Orador.
`;

  fs.writeFileSync(path.join(targetDescargasDir, 'README_WORK_INSTRUCCIONES.md'), indexContent, 'utf8');
  fs.writeFileSync(path.join(publicDescargasDir, 'README_WORK_INSTRUCCIONES.md'), indexContent, 'utf8');

  console.log('\n=== SINCRONIZACION Y EMPAQUETADO FINALIZADOS CON EXITO ===');
}

main();
