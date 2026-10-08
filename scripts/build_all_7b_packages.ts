import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Packer } from '../Web Studio Simple/node_modules/docx';
import { adaptPlayerLessonToGenerator } from '../Web Studio Simple/src/lib/lesson-adapter';
import { buildOAPackageDocx } from '../Web Studio Simple/src/lib/docx-export';
import { buildLessonPromptText } from '../Web Studio Simple/src/lib/prompt-export';
import { GeneratedOAPackage, OACatalogItem } from '../Web Studio Simple/src/lib/lesson-generator';

import * as Lessons from '../Web Studio Simple/src/data/lessons';

function sha256File(filePath: string): string {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

interface SubjectConfig {
  id: string;
  subjDir: string;
  oaDir: string;
  shortSubj: string;
  lessons: any[];
}

async function main() {
  console.log('=== ESTANDARIZACIÓN UNIVERSAL DE TODAS LAS ASIGNATURAS (7° BÁSICO) ===\n');

  const rootDir = process.cwd();
  const catalogPath = path.resolve(rootDir, 'Web Studio Simple/public/data/curriculum_catalog.json');
  const catalog: OACatalogItem[] = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

  const now = new Date();
  const santiagoTimestamp = now.toLocaleString('sv-SE', { timeZone: 'America/Santiago' }) + ' [America/Santiago]';
  const fileDate = now.toLocaleDateString('sv-SE', { timeZone: 'America/Santiago' });
  const fileTime = now.toLocaleTimeString('es-CL', { timeZone: 'America/Santiago', hour12: false, hour: '2-digit', minute: '2-digit' }).replace(':', '-');
  const fileTimestamp = `${fileDate}_${fileTime}`;

  console.log(`Estampa temporal de archivos: ${fileTimestamp}`);
  console.log(`Estampa de cabecera: ${santiagoTimestamp}\n`);

  const configs: SubjectConfig[] = [
    {
      id: '110-7-MAT-OA01',
      subjDir: 'Matematica',
      oaDir: 'OA01',
      shortSubj: 'Matematica',
      lessons: [
        Lessons.MATEMATICA_7B_OA01_CLASE01,
        Lessons.MATEMATICA_7B_OA01_CLASE02,
        Lessons.MATEMATICA_7B_OA01_CLASE03,
        Lessons.MATEMATICA_7B_OA01_CLASE04,
        Lessons.MATEMATICA_7B_OA01_CLASE05,
        Lessons.MATEMATICA_7B_OA01_CLASE06
      ]
    },
    {
      id: '110-7-CIE-OA01',
      subjDir: 'Ciencias_Naturales',
      oaDir: 'OA01',
      shortSubj: 'Ciencias',
      lessons: [
        Lessons.CIENCIAS_7B_OA01_CLASE01,
        Lessons.CIENCIAS_7B_OA01_CLASE02,
        Lessons.CIENCIAS_7B_OA01_CLASE03,
        Lessons.CIENCIAS_7B_OA01_CLASE04,
        Lessons.CIENCIAS_7B_OA01_CLASE05,
        Lessons.CIENCIAS_7B_OA01_CLASE06
      ]
    },
    {
      id: '110-7-HIS-OA02',
      subjDir: 'Historia_Geografia',
      oaDir: 'OA02',
      shortSubj: 'Historia',
      lessons: [
        Lessons.HISTORIA_7B_OA02_CLASE01,
        Lessons.HISTORIA_7B_OA02_CLASE02,
        Lessons.HISTORIA_7B_OA02_CLASE03,
        Lessons.HISTORIA_7B_OA02_CLASE04,
        Lessons.HISTORIA_7B_OA02_CLASE05,
        Lessons.HISTORIA_7B_OA02_CLASE06
      ]
    },
    {
      id: '110-7-LEN-OA03',
      subjDir: 'Lengua_Literatura',
      oaDir: 'OA03',
      shortSubj: 'Lenguaje',
      lessons: [
        Lessons.LENGUA_7B_OA03_CLASE01,
        Lessons.LENGUA_7B_OA03_CLASE02,
        Lessons.LENGUA_7B_OA03_CLASE03,
        Lessons.LENGUA_7B_OA03_CLASE04,
        Lessons.LENGUA_7B_OA03_CLASE05,
        Lessons.LENGUA_7B_OA03_CLASE06
      ]
    },
    {
      id: '110-7-ING-OA09',
      subjDir: 'Ingles',
      oaDir: 'OA09',
      shortSubj: 'Ingles',
      lessons: [
        Lessons.INGLES_7B_OA09_CLASE01,
        Lessons.INGLES_7B_OA09_CLASE02,
        Lessons.INGLES_7B_OA09_CLASE03,
        Lessons.INGLES_7B_OA09_CLASE04,
        Lessons.INGLES_7B_OA09_CLASE05,
        Lessons.INGLES_7B_OA09_CLASE06
      ]
    },
    {
      id: '110-7-MAT-OA04',
      subjDir: 'Matematica',
      oaDir: 'OA04',
      shortSubj: 'Matematica',
      lessons: [
        Lessons.MATEMATICA_7B_OA04_CLASE01,
        Lessons.MATEMATICA_7B_OA04_CLASE02,
        Lessons.MATEMATICA_7B_OA04_CLASE03,
        Lessons.MATEMATICA_7B_OA04_CLASE04,
        Lessons.MATEMATICA_7B_OA04_CLASE05,
        Lessons.MATEMATICA_7B_OA04_CLASE06
      ]
    }
  ];

  for (const cfg of configs) {
    console.log(`------------------------------------------------------------`);
    console.log(`Procesando ${cfg.subjDir} / ${cfg.oaDir} (${cfg.id})...`);

    const targetDir = path.resolve(rootDir, `LECCIONES/110-7/${cfg.subjDir}/${cfg.oaDir}`);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const catalogItem = catalog.find((c) => c.id === cfg.id);
    if (!catalogItem) {
      console.warn(`[Aviso]: ${cfg.id} no encontrado en curriculum_catalog.json`);
      continue;
    }

    const docxFilename = `Plan_Maestro_7Básico_${cfg.id}_6Lecciones_${fileTimestamp}.docx`;
    const promptFilename = `Prompts_Work_${cfg.shortSubj}_7B_${cfg.oaDir}_${fileTimestamp}.txt`;

    // 1. Eliminar versiones previas de Plan_Maestro_*.docx o Prompts_Work_*.txt
    const existing = fs.readdirSync(targetDir);
    for (const f of existing) {
      if (f.startsWith('Plan_Maestro_') && f.endsWith('.docx') && f !== docxFilename) {
        fs.unlinkSync(path.join(targetDir, f));
        console.log(`  - Versión obsoleta DOCX eliminada: ${f}`);
      }
      if (f.startsWith('Prompts_Work_') && f.endsWith('.txt') && f !== promptFilename) {
        fs.unlinkSync(path.join(targetDir, f));
        console.log(`  - Versión obsoleta Prompts eliminada: ${f}`);
      }
    }

    // 2. Compilar DOCX oficial
    const genLessons = cfg.lessons.map((l) => adaptPlayerLessonToGenerator(l));
    const pkg: GeneratedOAPackage = {
      oa: catalogItem,
      totalLessons: 6,
      lessons: genLessons
    };

    const doc = buildOAPackageDocx(pkg, santiagoTimestamp);
    const docxBuffer = await Packer.toBuffer(doc);
    const docxPath = path.join(targetDir, docxFilename);
    fs.writeFileSync(docxPath, docxBuffer);
    const docxBytes = fs.statSync(docxPath).size;
    const docxSha256 = sha256File(docxPath);
    console.log(`  ✓ DOCX generado: ${docxFilename} (${docxBytes} bytes)`);

    // 3. Compilar TXT de Prompts
    let promptText = '';
    promptText += `================================================================================\n`;
    promptText += `STUDIOSIMPLE - PAQUETE COMPLETO DE PROMPTS Y GUIONES MAESTROS\n`;
    promptText += `CURSO: 7° BASICO | ASIGNATURA: ${catalogItem.asignatura.toUpperCase()} | OA: ${cfg.id}\n`;
    promptText += `ARCHIVO: ${promptFilename}\n`;
    promptText += `TOTAL DE CLASES: 6 CLASES CANONICAS BIMODALES (14 LAMINAS CADA UNA = 84 LAMINAS TOTALES)\n`;
    promptText += `FORMATO: 7 DIAPOSITIVAS VIDEO GANCHO (60s) + 7 DIAPOSITIVAS VIDEO EXPLICATIVO (90s)\n`;
    promptText += `FECHA Y HORA DE ACTUALIZACION: ${santiagoTimestamp}\n`;
    promptText += `DESTINATARIO: CHATGPT WORK / CODEX (MAQUETACION PPTX 16:9 EN PYTHON)\n`;
    promptText += `================================================================================\n\n`;

    for (let i = 0; i < cfg.lessons.length; i++) {
      const l = cfg.lessons[i];
      promptText += `################################################################################\n`;
      promptText += `CLASE ${i + 1} DE 6: ${l.metadata.lessonTitle.toUpperCase()}\n`;
      promptText += `################################################################################\n\n`;
      promptText += buildLessonPromptText(l);
      promptText += `\n\n`;
    }

    const promptPath = path.join(targetDir, promptFilename);
    fs.writeFileSync(promptPath, promptText, 'utf-8');
    const promptBytes = fs.statSync(promptPath).size;
    const promptSha256 = sha256File(promptPath);
    console.log(`  ✓ Prompts TXT generado: ${promptFilename} (${promptBytes} bytes)`);

    // 4. Actualizar manifest.json preservando metadatos curriculares previos si existían
    const manifestPath = path.join(targetDir, 'manifest.json');
    let prevManifest: any = {};
    if (fs.existsSync(manifestPath)) {
      try {
        prevManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      } catch {}
    }

    const manifest = {
      ...prevManifest,
      schemaVersion: prevManifest.schemaVersion || "2.0.0",
      generatedAt: santiagoTimestamp,
      status: prevManifest.status || prevManifest.estado || "EN_REVISION",
      etapa_revision: prevManifest.etapa_revision || "WORK_PRE_APROBACION",
      oaIdentifier: cfg.id,
      course: "7° Básico",
      subject: catalogItem.asignatura,
      totalLessons: 6,
      artifacts: {
        docxMaster: {
          filename: docxFilename,
          relativePath: `LECCIONES/110-7/${cfg.subjDir}/${cfg.oaDir}/${docxFilename}`,
          sizeBytes: docxBytes,
          sha256: docxSha256
        },
        promptsWorkTxt: {
          filename: promptFilename,
          relativePath: `LECCIONES/110-7/${cfg.subjDir}/${cfg.oaDir}/${promptFilename}`,
          sizeBytes: promptBytes,
          sha256: promptSha256
        }
      }
    };

    // Si el manifiesto previo usaba campos tradicionales, sincronizar ambos
    if (manifest.fuente_oficial_unica_docx) {
      manifest.fuente_oficial_unica_docx.archivo = docxFilename;
      manifest.fuente_oficial_unica_docx.sha256 = docxSha256;
      manifest.fuente_oficial_unica_docx.bytes = docxBytes;
    }
    if (manifest.prompts_asociados) {
      manifest.prompts_asociados.archivo = promptFilename;
      manifest.prompts_asociados.sha256 = promptSha256;
      manifest.prompts_asociados.bytes = promptBytes;
    }

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
    console.log(`  ✓ manifest.json sincronizado.`);
  }

  console.log('\n=== ESTANDARIZACIÓN COMPLETADA CON ÉXITO EN TODAS LAS ASIGNATURAS ===\n');
}

main().catch((err) => {
  console.error('Error durante la estandarización:', err);
  process.exit(1);
});
