import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Packer } from '../Web Studio Simple/node_modules/docx';
import { adaptPlayerLessonToGenerator } from '../Web Studio Simple/src/lib/lesson-adapter';
import { buildOAPackageDocx } from '../Web Studio Simple/src/lib/docx-export';
import { buildLessonPromptText } from '../Web Studio Simple/src/lib/prompt-export';
import { GeneratedOAPackage, OACatalogItem } from '../Web Studio Simple/src/lib/lesson-generator';

import { MATEMATICA_7B_OA04_CLASE01 } from './oa04_data/clase01';
import { MATEMATICA_7B_OA04_CLASE02 } from './oa04_data/clase02';
import { MATEMATICA_7B_OA04_CLASE03 } from './oa04_data/clase03';
import { MATEMATICA_7B_OA04_CLASE04 } from './oa04_data/clase04';
import { MATEMATICA_7B_OA04_CLASE05 } from './oa04_data/clase05';
import { MATEMATICA_7B_OA04_CLASE06 } from './oa04_data/clase06';

function sha256File(filePath: string): string {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

async function main() {
  console.log('Iniciando construccion del paquete canonico Matematica 7 Basico OA04 (Porcentajes - 6 Lecciones)...');

  const rootDir = process.cwd();
  const targetOaDir = path.resolve(rootDir, 'LECCIONES/110-7/Matematica/OA04');
  const tsLessonsDir = path.resolve(rootDir, 'Web Studio Simple/src/data/lessons');
  const tsIndexPath = path.resolve(tsLessonsDir, 'index.ts');
  const repoPath = path.resolve(rootDir, 'Web Studio Simple/src/lib/lesson-repository.ts');

  if (!fs.existsSync(targetOaDir)) {
    fs.mkdirSync(targetOaDir, { recursive: true });
  }

  const rawLessons = [
    { num: 1, id: 'clase01', data: MATEMATICA_7B_OA04_CLASE01, varName: 'MATEMATICA_7B_OA04_CLASE01', file: 'matematica_7b_oa04_clase01.ts' },
    { num: 2, id: 'clase02', data: MATEMATICA_7B_OA04_CLASE02, varName: 'MATEMATICA_7B_OA04_CLASE02', file: 'matematica_7b_oa04_clase02.ts' },
    { num: 3, id: 'clase03', data: MATEMATICA_7B_OA04_CLASE03, varName: 'MATEMATICA_7B_OA04_CLASE03', file: 'matematica_7b_oa04_clase03.ts' },
    { num: 4, id: 'clase04', data: MATEMATICA_7B_OA04_CLASE04, varName: 'MATEMATICA_7B_OA04_CLASE04', file: 'matematica_7b_oa04_clase04.ts' },
    { num: 5, id: 'clase05', data: MATEMATICA_7B_OA04_CLASE05, varName: 'MATEMATICA_7B_OA04_CLASE05', file: 'matematica_7b_oa04_clase05.ts' },
    { num: 6, id: 'clase06', data: MATEMATICA_7B_OA04_CLASE06, varName: 'MATEMATICA_7B_OA04_CLASE06', file: 'matematica_7b_oa04_clase06.ts' }
  ];

  // 1. Escribir los 6 archivos TypeScript en Web Studio Simple/src/data/lessons/
  console.log('Escribiendo 6 archivos TypeScript de lecciones...');
  const tsHashes: Record<string, { bytes: number; sha256: string }> = {};

  for (const item of rawLessons) {
    const filePath = path.join(tsLessonsDir, item.file);
    const content = `import { LessonData } from '../../types/lesson';\n\nexport const ${item.varName}: LessonData = ${JSON.stringify(item.data, null, 2)};\n`;
    fs.writeFileSync(filePath, content, 'utf-8');
    tsHashes[item.file] = {
      bytes: fs.statSync(filePath).size,
      sha256: sha256File(filePath)
    };
    console.log(`- Creado ${item.file} (${tsHashes[item.file].bytes} bytes)`);
  }

  // 2. Actualizar index.ts en Web Studio Simple/src/data/lessons/index.ts
  console.log('Actualizando index.ts de lecciones...');
  let indexContent = fs.readFileSync(tsIndexPath, 'utf-8');
  for (const item of rawLessons) {
    const exportLine = `export { ${item.varName} } from './${item.file.replace('.ts', '')}';`;
    if (!indexContent.includes(item.varName)) {
      indexContent = indexContent.trimEnd() + '\n' + exportLine + '\n';
    }
  }
  fs.writeFileSync(tsIndexPath, indexContent, 'utf-8');
  console.log('index.ts actualizado.');

  // 3. Actualizar lesson-repository.ts
  console.log('Actualizando lesson-repository.ts...');
  let repoContent = fs.readFileSync(repoPath, 'utf-8');

  // Asegurar imports
  const neededImports = [
    'MATEMATICA_7B_OA04_CLASE01',
    'MATEMATICA_7B_OA04_CLASE02',
    'MATEMATICA_7B_OA04_CLASE03',
    'MATEMATICA_7B_OA04_CLASE04',
    'MATEMATICA_7B_OA04_CLASE05',
    'MATEMATICA_7B_OA04_CLASE06'
  ];

  const missingImports = neededImports.filter(name => !repoContent.includes(name));
  if (missingImports.length > 0) {
    repoContent = repoContent.replace(
      "} from '../data/lessons';",
      `  ${missingImports.join(',\n  ')}\n} from '../data/lessons';`
    );
  }

  // Asegurar rama de resolucion en findCanonicalFactoryLesson
  const targetBlock = `  if ((keyGrade === '7' || keyGrade.includes('7')) && keySubj === 'mat' && keyOa === 'oa1') {`;
  const existingOa4BlockRegex = /if \(\(keyGrade === '7' \|\| keyGrade\.includes\('7'\)\) && keySubj === 'mat' && \(keyOa === 'oa4' \|\| keyOa === 'oa04'\)\) \{[\s\S]*?\}\n\s*(?=if \(\(keyGrade === '7')/;

  const newBlock = `  if ((keyGrade === '7' || keyGrade.includes('7')) && keySubj === 'mat' && (keyOa === 'oa4' || keyOa === 'oa04')) {
    if (lessonNumber === 1) return MATEMATICA_7B_OA04_CLASE01;
    if (lessonNumber === 2) return MATEMATICA_7B_OA04_CLASE02;
    if (lessonNumber === 3) return MATEMATICA_7B_OA04_CLASE03;
    if (lessonNumber === 4) return MATEMATICA_7B_OA04_CLASE04;
    if (lessonNumber === 5) return MATEMATICA_7B_OA04_CLASE05;
    if (lessonNumber === 6) return MATEMATICA_7B_OA04_CLASE06;
  }\n`;

  if (existingOa4BlockRegex.test(repoContent)) {
    repoContent = repoContent.replace(existingOa4BlockRegex, newBlock);
  } else if (!repoContent.includes("(keyOa === 'oa4' || keyOa === 'oa04')")) {
    repoContent = repoContent.replace(targetBlock, `${newBlock}${targetBlock}`);
  }
  fs.writeFileSync(repoPath, repoContent, 'utf-8');
  console.log('lesson-repository.ts actualizado con las 6 lecciones de 7B MAT OA04.');

  // 4. Construir GeneratedOAPackage y DOCX Oficial (6 Lecciones)
  console.log('Generando Documento DOCX Oficial (Plan Maestro 6 Lecciones)...');
  const oaCatalog: OACatalogItem = {
    id: '110-7-MAT-OA04',
    curso: '7° Básico',
    asignatura: 'Matemática',
    oa: 'OA 4',
    eje: 'Números',
    titulo: 'Porcentajes',
    totalLecciones: 6,
    descripcion: 'Mostrar que comprenden el concepto de porcentaje: representándolo de manera pictórica, calculando de varias maneras, aplicándolo a situaciones sencillas.'
  };

  const adaptedLessons = rawLessons.map(item => adaptPlayerLessonToGenerator(item.data));

  const pkg: GeneratedOAPackage = {
    oa: oaCatalog,
    totalLessons: 6,
    lessons: adaptedLessons
  };

  const now = new Date();
  const santiagoTimestamp = now.toLocaleString('sv-SE', { timeZone: 'America/Santiago' }) + ' [America/Santiago]';
  const fileDate = now.toLocaleDateString('sv-SE', { timeZone: 'America/Santiago' });
  const fileTime = now.toLocaleTimeString('es-CL', { timeZone: 'America/Santiago', hour12: false, hour: '2-digit', minute: '2-digit' }).replace(':', '-');
  const fileTimestamp = `${fileDate}_${fileTime}`;

  const docxFilename = `Plan_Maestro_7Básico_110-7-MAT-OA04_6Lecciones_${fileTimestamp}.docx`;
  const promptFilename = `Prompts_Work_Matematica_7B_OA04_${fileTimestamp}.txt`;

  // Eliminar cualquier versión previa de Plan_Maestro_*.docx o Prompts_Work_*.txt en targetOaDir para conservar únicamente el más actualizado
  if (fs.existsSync(targetOaDir)) {
    const existing = fs.readdirSync(targetOaDir);
    for (const f of existing) {
      if (f.startsWith('Plan_Maestro_') && f.endsWith('.docx') && f !== docxFilename) {
        fs.unlinkSync(path.join(targetOaDir, f));
        console.log(`Versión anterior de DOCX eliminada: ${f}`);
      }
      if (f.startsWith('Prompts_Work_') && f.endsWith('.txt') && f !== promptFilename) {
        fs.unlinkSync(path.join(targetOaDir, f));
        console.log(`Versión anterior de Prompts eliminada: ${f}`);
      }
    }
  }

  const doc = buildOAPackageDocx(pkg, santiagoTimestamp);
  const docxBuffer = await Packer.toBuffer(doc);
  const docxPath = path.join(targetOaDir, docxFilename);
  fs.writeFileSync(docxPath, docxBuffer);
  const docxBytes = fs.statSync(docxPath).size;
  const docxSha256 = sha256File(docxPath);
  console.log(`DOCX generado con éxito: ${docxFilename} (${docxBytes} bytes, SHA-256: ${docxSha256.substring(0, 16)}...)`);

  // 5. Construir archivo TXT de Prompts para Work (84 láminas)
  console.log('Generando archivo de Prompts TXT para Work (84 laminas)...');
  let promptText = '';
  promptText += `================================================================================\n`;
  promptText += `STUDIOSIMPLE - PAQUETE COMPLETO DE PROMPTS Y GUIONES MAESTROS\n`;
  promptText += `CURSO: 7° BASICO | ASIGNATURA: MATEMATICA | OA: 110-7-MAT-OA04 (PORCENTAJES)\n`;
  promptText += `ARCHIVO: ${promptFilename}\n`;
  promptText += `TOTAL DE CLASES: 6 CLASES CANONICAS BIMODALES (14 LAMINAS CADA UNA = 84 LAMINAS TOTALES)\n`;
  promptText += `FORMATO: 7 DIAPOSITIVAS VIDEO GANCHO (60s) + 7 DIAPOSITIVAS VIDEO EXPLICATIVO (90s)\n`;
  promptText += `FECHA Y HORA DE ACTUALIZACION: ${santiagoTimestamp}\n`;
  promptText += `DESTINATARIO: CHATGPT WORK / CODEX (MAQUETACION PPTX 16:9 EN PYTHON)\n`;
  promptText += `================================================================================\n\n`;

  for (const item of rawLessons) {
    promptText += buildLessonPromptText(item.data);
    promptText += `\n\n`;
  }

  const promptPath = path.join(targetOaDir, promptFilename);
  fs.writeFileSync(promptPath, promptText, 'utf-8');
  const promptBytes = fs.statSync(promptPath).size;
  const promptSha256 = sha256File(promptPath);
  console.log(`TXT de Prompts generado con éxito: ${promptFilename} (${promptBytes} bytes, SHA-256: ${promptSha256.substring(0, 16)}...)`);

  // 6. Construir manifest.json oficial
  console.log('Generando manifest.json oficial...');
  const manifest = {
    schemaVersion: "2.0.0",
    generatedAt: santiagoTimestamp,
    status: "EN_REVISION",
    etapa_revision: "WORK_PRE_APROBACION",
    oaIdentifier: "110-7-MAT-OA04",
    course: "7° Básico",
    subject: "Matemática",
    axis: "Números",
    mineducObjective: "Mostrar que comprenden el concepto de porcentaje: representándolo de manera pictórica, calculando de varias maneras, aplicándolo a situaciones sencillas.",
    textbookSource: {
      title: "Matemática 7° Básico - Texto del Estudiante",
      publisher: "Santillana / Ministerio de Educación de Chile",
      unit: "Unidad 1: Números",
      lessonChapter: "Lección 3: Porcentajes",
      pages: "42-51",
      officialCurriculumAlignment: "Bases Curriculares Decreto N° 614/2013 y Temarios Oficiales de Exámenes Libres MINEDUC"
    },
    totalLessons: 6,
    lessons: [
      {
        lessonNumber: 1,
        title: "Concepto de Porcentaje y Representación en Cuadrículas de 100",
        focus: "Razón referida a 100 unidades y representación pictórica en cuadrículas 10x10",
        slidesHook: 7,
        slidesExplanation: 7,
        totalSlides: 14,
        durationMinutes: 30,
        tsFile: "matematica_7b_oa04_clase01.ts",
        tsHashSha256: tsHashes["matematica_7b_oa04_clase01.ts"].sha256
      },
      {
        lessonNumber: 2,
        title: "Porcentajes como Fracción Irreductible y Número Decimal",
        focus: "Equivalencia triple: porcentaje, fracción simplificada y número decimal",
        slidesHook: 7,
        slidesExplanation: 7,
        totalSlides: 14,
        durationMinutes: 30,
        tsFile: "matematica_7b_oa04_clase02.ts",
        tsHashSha256: tsHashes["matematica_7b_oa04_clase02.ts"].sha256
      },
      {
        lessonNumber: 3,
        title: "Cálculo Mental de Porcentajes Notables: 50%, 25%, 20% y 10%",
        focus: "Estrategias de cálculo mental usando división por fracciones canónicas",
        slidesHook: 7,
        slidesExplanation: 7,
        totalSlides: 14,
        durationMinutes: 30,
        tsFile: "matematica_7b_oa04_clase03.ts",
        tsHashSha256: tsHashes["matematica_7b_oa04_clase03.ts"].sha256
      },
      {
        lessonNumber: 4,
        title: "Estrategias de Cálculo de Cualquier Porcentaje: Decimales y Proporciones",
        focus: "Algoritmos universales: multiplicación por decimal y regla de proporcionalidad directa",
        slidesHook: 7,
        slidesExplanation: 7,
        totalSlides: 14,
        durationMinutes: 30,
        tsFile: "matematica_7b_oa04_clase04.ts",
        tsHashSha256: tsHashes["matematica_7b_oa04_clase04.ts"].sha256
      },
      {
        lessonNumber: 5,
        title: "Resolución de Problemas Cotidianos: Descuentos Comerciales e IVA",
        focus: "Aplicaciones contextuales: cálculo de rebajas comerciales e IVA 19% en boletas",
        slidesHook: 7,
        slidesExplanation: 7,
        totalSlides: 14,
        durationMinutes: 30,
        tsFile: "matematica_7b_oa04_clase05.ts",
        tsHashSha256: tsHashes["matematica_7b_oa04_clase05.ts"].sha256
      },
      {
        lessonNumber: 6,
        title: "Síntesis Integradora y Ensayo de Evaluación Formativa: Porcentajes en Acción",
        focus: "Cálculo inverso del total, gráficos circulares, estrategias de evaluación y ensayo psicométrico tipo MINEDUC",
        slidesHook: 7,
        slidesExplanation: 7,
        totalSlides: 14,
        durationMinutes: 30,
        tsFile: "matematica_7b_oa04_clase06.ts",
        tsHashSha256: tsHashes["matematica_7b_oa04_clase06.ts"].sha256
      }
    ],
    artifacts: {
      docxMaster: {
        filename: docxFilename,
        relativePath: `LECCIONES/110-7/Matematica/OA04/${docxFilename}`,
        sizeBytes: docxBytes,
        sha256: docxSha256
      },
      promptsWorkTxt: {
        filename: promptFilename,
        relativePath: `LECCIONES/110-7/Matematica/OA04/${promptFilename}`,
        sizeBytes: promptBytes,
        sha256: promptSha256
      }
    },
    governance: {
      producedBy: "Antigravity (Ingeniero de Software IA)",
      workflow: "Skill estudiosimple-lecciones (Flujo Canónico 12 Pasos)",
      isomorphismLevel: "100% (DOCX == TXT Prompts == TypeScript)",
      pedagogicalStandards: [
        "Estándar normativo universal: 6 lecciones completas por OA (Directriz Work)",
        "Estructura bimodal de 14 láminas (7 Gancho + 7 Explicación) por clase = 84 láminas totales",
        "Objetivo de aprendizaje explícito al inicio de la secuencia visible para el estudiante (Lámina 1 de Explicación)",
        "Dúo co-protagonista de 13 años (joven con trenzas y joven con chaqueta cerceta) en 100% de escenas",
        "Widescreen 16:9 Anime Moderno limpio sin texto dibujado por IA (No text drawn by AI)",
        "Textos y fórmulas matemáticas como capas vectoriales editables, sin recuadros flotantes ni sombras",
        "Subtítulos breves y legibles con logotipo blanco de EstudioSimple en esquina inferior derecha",
        "Fórmula general de porcentaje: p% = p ÷ 100 (cero uso de notaciones informales tipo 0,p)",
        "Contexto tributario verídico: IVA (19%) acotado a operaciones comerciales afectas (según SII)",
        "Reactivos psicométricos formales de 4 alternativas (A, B, C, D) con análisis de distractores",
        "Comprobación posterior y práctica basadas en los mismos ejemplos modelados en el video",
        "Cierre de video en Lámina 7 con Regla de Oro y pase directo a la plataforma (sin desafíos adicionales)",
        "Regla de producción: 60s gancho y 90s explicación sin imposición de cronómetro acústico previo"
      ]
    }
  };

  const manifestPath = path.join(targetOaDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`manifest.json guardado con éxito (${fs.statSync(manifestPath).size} bytes).`);

  console.log('\n=== PAQUETE MATEMATICA 7B OA04 (6 LECCIONES) CONSTRUIDO SATISFACTORIAMENTE ===\n');
}

main().catch(err => {
  console.error('Error durante la construcción del paquete OA04:', err);
  process.exit(1);
});
