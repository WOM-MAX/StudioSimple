import fs from "fs";
import path from "path";
import { Packer } from "docx";
import { OACatalogItem, generateOAPackage } from "../lib/lesson-generator";
import { buildOAPackageDocx } from "../lib/docx-export";

const catalogPath = path.resolve("public/data/curriculum_catalog.json");
const catalog: OACatalogItem[] = JSON.parse(fs.readFileSync(catalogPath, "utf8"));

const priorityOAs = catalog
  .filter((o) => o.isPriorityDemo)
  .sort((a, b) => {
    if (a.asignatura !== b.asignatura) {
      return a.asignatura.localeCompare(b.asignatura);
    }
    return (a.temarioPosicion || 0) - (b.temarioPosicion || 0);
  });

const outputBase = path.resolve("..", "ENTREGABLES_FONDOS");
const docxDir = path.join(outputBase, "docx");
const jsonDir = path.join(outputBase, "json");
const promptsDir = path.join(outputBase, "prompts");

fs.mkdirSync(docxDir, { recursive: true });
fs.mkdirSync(jsonDir, { recursive: true });
fs.mkdirSync(promptsDir, { recursive: true });

console.log(`Iniciando generacion de 10 paquetes prioritarios para fondos...`);
console.log(`Directorio de salida: ${outputBase}\n`);

const summaryList: Array<{
  asignatura: string;
  oaId: string;
  oaNumero: number;
  posicionEELL: number;
  lecciones: number;
  docxFile: string;
  jsonFile: string;
  promptsFile: string;
}> = [];

for (const oa of priorityOAs) {
  const lessonCount = oa.leccionesSugeridas || 5;
  const pkg = generateOAPackage(oa, lessonCount);

  const cleanSubject = oa.asignatura.replace(/[^a-zA-Z0-9]/g, "_");
  const filePrefix = `${cleanSubject}_OA${String(oa.oaNumero).padStart(2, "0")}_EELL_Pos${oa.temarioPosicion}`;

  // 1. Generate DOCX
  const doc = buildOAPackageDocx(pkg);
  const buffer = await Packer.toBuffer(doc);
  const docxFilename = `Plan_Maestro_${filePrefix}.docx`;
  const docxPath = path.join(docxDir, docxFilename);
  fs.writeFileSync(docxPath, buffer);

  // 2. Generate JSON App Package
  const jsonFilename = `App_Dataset_${filePrefix}.json`;
  const jsonPath = path.join(jsonDir, jsonFilename);
  fs.writeFileSync(jsonPath, JSON.stringify(pkg, null, 2), "utf8");

  // 3. Generate Prompts Markdown File
  const promptsFilename = `Prompts_Anime_${filePrefix}.md`;
  const promptsPath = path.join(promptsDir, promptsFilename);

  let mdContent = `# Guiones y Prompts Audiovisuales (ChatGPT Work + Google Vids)\n\n`;
  mdContent += `**Asignatura:** ${oa.asignatura}  \n`;
  mdContent += `**Objetivo:** ${oa.oa} (Posicion #${oa.temarioPosicion} en Temario Oficial EELL 7° Basico)  \n`;
  mdContent += `**Descripcion:** ${oa.descripcion}  \n`;
  mdContent += `**Total Clases:** ${pkg.totalLessons} clases de 30 minutos  \n`;
  mdContent += `**Identidad Visual:** Dos coprotagonistas de 13 anos (chica y chico) en Modern Anime Style (iluminacion suave, cooperacion en equipo, formato 16:9 con espacio negativo para rotulos).  \n\n`;
  mdContent += `---\n\n`;

  for (const l of pkg.lessons) {
    mdContent += `## Clase ${l.num}: ${l.title}\n\n`;
    mdContent += `### Paso 2: Video Motivacional (Hook - 7 Slides)\n\n`;
    mdContent += `\`\`\`text\n${l.paso2_hook.fullPrompt}\n\`\`\`\n\n`;
    mdContent += `### Paso 4: Video Explicativo / Formalizacion (5 Slides)\n\n`;
    mdContent += `\`\`\`text\n${l.paso4_explicativo.fullPrompt}\n\`\`\`\n\n`;
    mdContent += `---\n\n`;
  }

  fs.writeFileSync(promptsPath, mdContent, "utf8");

  console.log(`[OK] ${oa.asignatura} - ${oa.oa} (EELL #${oa.temarioPosicion}) -> ${lessonCount} lecciones generadas.`);
  summaryList.push({
    asignatura: oa.asignatura,
    oaId: oa.id,
    oaNumero: oa.oaNumero,
    posicionEELL: oa.temarioPosicion || 0,
    lecciones: lessonCount,
    docxFile: docxFilename,
    jsonFile: jsonFilename,
    promptsFile: promptsFilename
  });
}

// 4. Generate README Index
let readme = `# Paquete Oficial de Entregables: 10 OAs Prioritarios (Temario Examenes Libres 7° Basico)\n\n`;
readme += `Este directorio contiene los entregables curriculares y tecnicos generados por el motor de **EstudioSimple** para respaldar la postulacion a fondos de financiamiento (CORFO Semilla Inicia / Start-Up Chile Build o Ignite) y presentaciones ante evaluadores.\n\n`;
readme += `## Criterio Curricular Oficial\n`;
readme += `Los 10 OAs corresponden estrictamente a los **dos primeros objetivos evaluados por asignatura** en el Temario Oficial de Examenes Libres del MINEDUC para 7° Basico:\n\n`;
readme += `| Asignatura | Posicion EELL | OA | Lecciones Dosificadas | Plan Maestro (.docx) | Dataset App (.json) | Prompts Anime (.md) |\n`;
readme += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

for (const s of summaryList) {
  readme += `| ${s.asignatura} | #${s.posicionEELL} | OA ${s.oaNumero} | ${s.lecciones} clases (30 min) | [\`${s.docxFile}\`](docx/${s.docxFile}) | [\`${s.jsonFile}\`](json/${s.jsonFile}) | [\`${s.promptsFile}\`](prompts/${s.promptsFile}) |\n`;
}

readme += `\n## Estructura de Contenidos por Leccion\n`;
readme += `Cada una de las clases incluye:\n`;
readme += `1. **Paso 1:** Activacion y dialogo guiado adulto-estudiante.\n`;
readme += `2. **Paso 2:** Prompt ChatGPT Work para presentacion motivacional de 7 laminas (anime moderno, 2 protagonistas de 13 anos cooperando) con notas al orador limpias para Google Vids.\n`;
readme += `3. **Paso 3:** Ejercitacion guiada socrática con pistas graduales.\n`;
readme += `4. **Paso 4:** Prompt ChatGPT Work para video explicativo conciso de 5 laminas con regla modelada y notas al orador.\n`;
readme += `5. **Paso 5:** Practica en cuaderno fisico (puente analogo).\n`;
readme += `6. **Paso 6:** Revision y retroalimentacion de errores frecuentes.\n`;
readme += `7. **Paso 7:** Miniejercitacion formativa (quiz de 3 preguntas de alternativas con justificacion).\n`;
readme += `8. **Paso 8:** Cierre metacognitivo y celebracion del esfuerzo.\n`;

fs.writeFileSync(path.join(outputBase, "README.md"), readme, "utf8");

console.log(`\nTodos los 10 paquetes fueron generados exitosamente.`);
console.log(`Indice guardado en: ${path.join(outputBase, "README.md")}`);
