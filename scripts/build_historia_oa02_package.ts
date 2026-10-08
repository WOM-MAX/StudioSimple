import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Packer } from 'docx';
import { adaptPlayerLessonToGenerator } from '../Web Studio Simple/src/lib/lesson-adapter';
import { buildOAPackageDocx } from '../Web Studio Simple/src/lib/docx-export';
import { buildLessonPromptText } from '../Web Studio Simple/src/lib/prompt-export';
import { GeneratedOAPackage, OACatalogItem } from '../Web Studio Simple/src/lib/lesson-generator';

// Cargar las 6 clases canónicas oficiales de Historia 7° Básico OA02
import { HISTORIA_7B_OA02_CLASE01 } from '../Web Studio Simple/src/data/lessons/historia_7b_oa02_clase01';
import { HISTORIA_7B_OA02_CLASE02 } from '../Web Studio Simple/src/data/lessons/historia_7b_oa02_clase02';
import { HISTORIA_7B_OA02_CLASE03 } from '../Web Studio Simple/src/data/lessons/historia_7b_oa02_clase03';
import { HISTORIA_7B_OA02_CLASE04 } from '../Web Studio Simple/src/data/lessons/historia_7b_oa02_clase04';
import { HISTORIA_7B_OA02_CLASE05 } from '../Web Studio Simple/src/data/lessons/historia_7b_oa02_clase05';
import { HISTORIA_7B_OA02_CLASE06 } from '../Web Studio Simple/src/data/lessons/historia_7b_oa02_clase06';

function sha256File(filePath: string): string {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

async function main() {
  console.log('=== CONSTRUYENDO PAQUETE CANÓNICO HISTORIA 7° BÁSICO OA02 (6 LECCIONES) ===\n');

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

  // 1. Adaptar las 6 lecciones reales canónicas a formato de generador
  console.log('Adaptando las 6 lecciones canónicas oficiales...');
  const playerLessons = [
    HISTORIA_7B_OA02_CLASE01,
    HISTORIA_7B_OA02_CLASE02,
    HISTORIA_7B_OA02_CLASE03,
    HISTORIA_7B_OA02_CLASE04,
    HISTORIA_7B_OA02_CLASE05,
    HISTORIA_7B_OA02_CLASE06
  ];

  const genLessons = playerLessons.map((pl) => adaptPlayerLessonToGenerator(pl));

  const pkg: GeneratedOAPackage = {
    oa: catalogItem,
    totalLessons: 6,
    lessons: genLessons
  };

  console.log(`✓ Paquete configurado con ${pkg.lessons.length} lecciones reales.`);

  // 2. Compilar y guardar nuevo DOCX oficial de 6 lecciones
  console.log('Compilando DOCX oficial canónico (buildOAPackageDocx)...');
  const doc = buildOAPackageDocx(pkg);
  const docxBuffer = await Packer.toBuffer(doc);
  const docxFilename = 'Plan_Maestro_7Básico_110-7-HIS-OA02_6Lecciones.docx';
  const docxPath = path.join(targetOaDir, docxFilename);
  fs.writeFileSync(docxPath, docxBuffer);
  const docxBytes = fs.statSync(docxPath).size;
  const docxSha256 = sha256File(docxPath);
  console.log(`✓ DOCX generado con éxito: ${docxFilename} (${docxBytes} bytes, SHA-256: ${docxSha256.substring(0, 16)}...)`);

  // Copia de respaldo en descargas de Web Studio Simple si existe la carpeta
  const publicDownloadsDir = path.resolve(rootDir, 'Web Studio Simple/public/descargas_planes_maestros');
  if (fs.existsSync(publicDownloadsDir)) {
    const publicDocxPath = path.join(publicDownloadsDir, docxFilename);
    fs.writeFileSync(publicDocxPath, docxBuffer);
    console.log(`✓ Copia pública actualizada en Web Studio Simple: ${publicDocxPath}`);
  }

  // 3. Generar archivo TXT consolidado de Prompts para Work (84 láminas)
  console.log('Generando archivo TXT consolidado de Prompts para Work (84 láminas)...');
  let promptText = '';
  promptText += `================================================================================\n`;
  promptText += `STUDIOSIMPLE - PAQUETE DE PROMPTS Y GUIONES OFICIALES PARA CHATGPT WORK\n`;
  promptText += `ASIGNATURA: HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES\n`;
  promptText += `CURSO: 7° BASICO | OBJETIVO: OA 2 (${catalogItem.descripcion})\n`;
  promptText += `TOTAL DE CLASES: 6 LECCIONES (14 DIAPOSITIVAS POR CLASE = 84 LÁMINAS TOTALES)\n`;
  promptText += `FORMATO: 7 DIAPOSITIVAS VIDEO GANCHO (60s) + 7 DIAPOSITIVAS VIDEO EXPLICATIVO (90s)\n`;
  promptText += `ESTILO VISUAL: ANIME MODERNO 16:9 | PROTAGONISTAS: EXPLORADORES 13 AÑOS (NIÑA TRENZAS + NIÑO CHAQUETA CERCETA)\n`;
  promptText += `REGLAS DE ARTE: FONDOS LIMPIOS CON ESPACIO NEGATIVO REAL, SIN TEXTO Y SIN LOGO DIBUJADO POR IA\n`;
  promptText += `DURACIONES: 60s Y 90s COMO METAS REFERENCIALES PARA GOOGLE VIDS / TTS (SIN REEXPORTACIÓN FORZADA)\n`;
  promptText += `================================================================================\n\n`;

  playerLessons.forEach((pl, lIdx) => {
    const lessonTxt = buildLessonPromptText(pl);
    promptText += `\n################################################################################\n`;
    promptText += `### CLASE ${lIdx + 1} DE 6: ${pl.metadata.lessonTitle.toUpperCase()}\n`;
    promptText += `################################################################################\n\n`;
    promptText += lessonTxt;
    promptText += `\n\n`;
  });

  const promptFilename = 'Prompts_Work_Historia_7B_OA02.txt';
  const promptPath = path.join(targetOaDir, promptFilename);
  fs.writeFileSync(promptPath, promptText, 'utf-8');
  const promptBytes = fs.statSync(promptPath).size;
  const promptSha256 = sha256File(promptPath);
  console.log(`✓ TXT de Prompts generado con éxito: ${promptFilename} (${promptBytes} bytes, SHA-256: ${promptSha256.substring(0, 16)}...)`);

  if (fs.existsSync(publicDownloadsDir)) {
    const publicTxtPath = path.join(publicDownloadsDir, promptFilename);
    fs.writeFileSync(publicTxtPath, promptText, 'utf-8');
    console.log(`✓ Copia pública de prompts actualizada en Web Studio Simple: ${publicTxtPath}`);
  }

  // 4. Actualizar manifest.json oficial con estado REQUIERE_AJUSTES
  console.log('Actualizando manifest.json oficial con estado REQUIERE_AJUSTES...');
  const manifest = {
    curso: "110-7",
    asignatura: "Historia_Geografia",
    oa: "OA02",
    identificador_paquete: "110-7-HIS-OA02",
    version: "2.1.0",
    fecha_actualizacion: new Date().toISOString().split('T')[0],
    estado: "REQUIERE_AJUSTES",
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
      perfil_evaluacion: "Perfil 7° Básico (14 láminas bimodales: 7 Gancho + 7 Explicación; 4 alternativas A-D en todas las preguntas; sin texto ni logo IA)",
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
        "Web Studio Simple/src/data/lessons/historia_7b_oa02_clase01.ts",
        "Web Studio Simple/src/data/lessons/historia_7b_oa02_clase02.ts",
        "Web Studio Simple/src/data/lessons/historia_7b_oa02_clase03.ts",
        "Web Studio Simple/src/data/lessons/historia_7b_oa02_clase04.ts",
        "Web Studio Simple/src/data/lessons/historia_7b_oa02_clase05.ts",
        "Web Studio Simple/src/data/lessons/historia_7b_oa02_clase06.ts"
      ]
    }
  };

  const manifestPath = path.join(targetOaDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`✓ manifest.json guardado con éxito (${fs.statSync(manifestPath).size} bytes). Estado: REQUIERE_AJUSTES.`);

  console.log('\n=== PAQUETE HISTORIA 7B OA02 (6 LECCIONES) GENERADO Y CALIBRADO SATISFACTORIAMENTE ===\n');
}

main().catch(err => {
  console.error('Error durante la construcción del paquete Historia OA02:', err);
  process.exit(1);
});
