import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Packer } from 'docx';
import { generateOAPackage, OACatalogItem } from '../Web Studio Simple/src/lib/lesson-generator';
import { buildOAPackageDocx } from '../Web Studio Simple/src/lib/docx-export';
import { adaptGeneratorLessonToPlayer } from '../Web Studio Simple/src/lib/lesson-adapter';
import { buildLessonPromptText } from '../Web Studio Simple/src/lib/prompt-export';

function sha256File(filePath: string): string {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

async function main() {
  console.log('Iniciando construccion del paquete canonico Historia 7 Basico OA02 (6 Lecciones)...');

  const rootDir = process.cwd();
  const targetOaDir = path.resolve(rootDir, 'LECCIONES/110-7/Historia_Geografia/OA02');
  const catalogPath = path.resolve(rootDir, 'Web Studio Simple/public/data/curriculum_catalog.json');
  const catalog: OACatalogItem[] = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

  const catalogItem = catalog.find((c) => c.id === '110-7-HIS-OA02');
  if (!catalogItem) {
    throw new Error('Item 110-7-HIS-OA02 no encontrado en curriculum_catalog.json');
  }

  if (!fs.existsSync(targetOaDir)) {
    fs.mkdirSync(targetOaDir, { recursive: true });
  }

  // Generar paquete con exactamente 6 lecciones
  console.log('Generando paquete curricular de 6 lecciones con generateOAPackage...');
  const pkg = generateOAPackage(catalogItem, 6);
  console.log(`Paquete generado con ${pkg.lessons.length} lecciones.`);

  // 1. Eliminar archivo previo de 5 lecciones si existe
  const oldDocxPath = path.join(targetOaDir, 'Plan_Maestro_7Básico_110-7-HIS-OA02_5Lecciones.docx');
  if (fs.existsSync(oldDocxPath)) {
    fs.unlinkSync(oldDocxPath);
    console.log(`Archivo obsoleto eliminado: ${oldDocxPath}`);
  }

  // 2. Compilar y guardar nuevo DOCX oficial de 6 lecciones
  console.log('Compilando nuevo DOCX oficial (buildOAPackageDocx)...');
  const doc = buildOAPackageDocx(pkg);
  const docxBuffer = await Packer.toBuffer(doc);
  const docxFilename = 'Plan_Maestro_7Básico_110-7-HIS-OA02_6Lecciones.docx';
  const docxPath = path.join(targetOaDir, docxFilename);
  fs.writeFileSync(docxPath, docxBuffer);
  const docxBytes = fs.statSync(docxPath).size;
  const docxSha256 = sha256File(docxPath);
  console.log(`DOCX generado con éxito: ${docxFilename} (${docxBytes} bytes, SHA-256: ${docxSha256.substring(0, 16)}...)`);

  // 3. Generar archivo TXT consolidado de Prompts para Work (84 láminas)
  console.log('Generando archivo TXT consolidado de Prompts para Work (84 laminas)...');
  let promptText = '';
  promptText += `================================================================================\n`;
  promptText += `STUDIOSIMPLE - PAQUETE DE PROMPTS Y GUIONES OFICIALES PARA CHATGPT WORK\n`;
  promptText += `ASIGNATURA: HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES\n`;
  promptText += `CURSO: 7° BASICO | OBJETIVO: OA 2 (${catalogItem.descripcion})\n`;
  promptText += `TOTAL DE CLASES: 6 LECCIONES (14 DIAPOSITIVAS POR CLASE = 84 LAMINAS TOTALES)\n`;
  promptText += `FORMATO: 7 DIAPOSITIVAS VIDEO GANCHO (60s) + 7 DIAPOSITIVAS VIDEO EXPLICATIVO (90s)\n`;
  promptText += `================================================================================\n\n`;

  pkg.lessons.forEach((genLesson, lIdx) => {
    const playerLesson = adaptGeneratorLessonToPlayer(genLesson, catalogItem, 6);
    const lessonTxt = buildLessonPromptText(playerLesson);
    promptText += `\n################################################################################\n`;
    promptText += `### CLASE ${lIdx + 1} DE 6: ${genLesson.title.toUpperCase()}\n`;
    promptText += `################################################################################\n\n`;
    promptText += lessonTxt;
    promptText += `\n\n`;
  });

  const promptFilename = 'Prompts_Work_Historia_7B_OA02.txt';
  const promptPath = path.join(targetOaDir, promptFilename);
  fs.writeFileSync(promptPath, promptText, 'utf-8');
  const promptBytes = fs.statSync(promptPath).size;
  const promptSha256 = sha256File(promptPath);
  console.log(`TXT de Prompts generado con éxito: ${promptFilename} (${promptBytes} bytes, SHA-256: ${promptSha256.substring(0, 16)}...)`);

  // 4. Actualizar manifest.json oficial
  console.log('Actualizando manifest.json oficial...');
  const manifest = {
    curso: "110-7",
    asignatura: "Historia_Geografia",
    oa: "OA02",
    identificador_paquete: "110-7-HIS-OA02",
    version: "2.0.0",
    fecha_actualizacion: new Date().toISOString().split('T')[0],
    estado: "EN_REVISION",
    total_clases: 6,
    fuente_oficial_unica_docx: {
      archivo: docxFilename,
      rol: "Unica fuente oficial de produccion de lecciones y prompts (6 lecciones completas)",
      sha256: docxSha256,
      bytes: docxBytes
    },
    prompts_asociados: {
      archivo: promptFilename,
      total_laminas: 84,
      laminas_por_clase: 14,
      perfil_evaluacion: "Perfil 7° Básico (14 láminas bimodales: 7 Gancho + 7 Explicación; reactivos de 4 alternativas en cierre)",
      sha256: promptSha256,
      bytes: promptBytes
    },
    fundamentacion_curricular: {
      temario_eell: {
        archivo: "TEMARIOS EELL/temario 7° basico.pdf",
        pagina: 11,
        seccion: "Eje Historia - Objetivo de Aprendizaje N° 2: Explicar que el surgimiento de la agricultura, la domesticación de animales, la sedentarización, la acumulación de bienes y el desarrollo del comercio fueron procesos que transformaron la vida humana.",
        plan_estudios_complementario: "TEMARIOS EELL/Septimo/Plan_de_Estudios_Optimizado_7Basico.docx",
        documento_detallado: "TEMARIOS EELL/Septimo/Historia/Clase_1_Historia_y_Geografia_Detallada.pdf"
      },
      insumos_mineduc: {
        texto_estudiante_pdf: "INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/Historia, Geografía y Ciencias Sociales.pdf",
        unidad_y_paginas: "Unidad 1: Hacia las primeras civilizaciones, Lección 2: La revolución del Neolítico",
        banco_digital_actividades: "INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/BDA_HIS_7B/",
        resumen_oficial: "INSUMOS/RESUMENES/110-7/RESUMEN HISTORIA  GEOGRAFÍA Y CIENCIAS SOCIALES.pdf",
        ensayos_oficiales: "INSUMOS/ENSAYOS/110-7/HISTORIA Y GEOGRAFÍA Y CIENCIAS SOCIALES.pdf"
      }
    },
    resolucion_rutas_typescript: {
      raiz_repositorio: "d:/StudioSimple - Antigravity/",
      raiz_app_spa: "Web Studio Simple/",
      alias_tsconfig: "@/* -> ./src/* (definido en Web Studio Simple/tsconfig.json)",
      archivos_clases_ts: [
        "Web Studio Simple/src/data/lessons/historia_7b_oa02_clase01.ts"
      ]
    }
  };

  const manifestPath = path.join(targetOaDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`manifest.json guardado con éxito (${fs.statSync(manifestPath).size} bytes).`);

  console.log('\n=== PAQUETE HISTORIA 7B OA02 (6 LECCIONES) CONSTRUIDO SATISFACTORIAMENTE ===\n');
}

main().catch(err => {
  console.error('Error durante la construcción del paquete Historia OA02:', err);
  process.exit(1);
});
