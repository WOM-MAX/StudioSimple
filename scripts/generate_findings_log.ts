import fs from 'fs';
import path from 'path';

function main() {
  const auditPath = path.resolve('docs/auditorias/110-7-MAT-OA04_auditoria.md');
  const content = fs.readFileSync(auditPath, 'utf-8');

  // Regex to extract each finding block
  // Format in audit:
  // ### Hallazgo X: [CODE] - Prioridad: Priority
  // - **Ubicacion:** `Location`
  // - **Fuente Aprobada:** Rule / Source
  // - **Material Revisado:** Evidence
  // - **Discrepancia:** Discrepancy
  // - **Correccion Sugerida:** Correction
  const findingRegex = /### Hallazgo (\d+): \[([A-Z0-9-]+)\] - Prioridad: ([^\n]+)\n\n- \*\*Ubicacion:\*\* `([^`]+)`\n- \*\*Fuente Aprobada:\*\* ([^\n]+)\n- \*\*Material Revisado:\*\* ([^\n]+)\n- \*\*Discrepancia:\*\* ([^\n]+)\n- \*\*Correccion Sugerida:\*\* ([^\n]+)/g;

  const findings: Array<{
    num: number;
    code: string;
    priority: string;
    location: string;
    source: string;
    evidence: string;
    discrepancy: string;
    correction: string;
    clase: string;
  }> = [];

  let match: RegExpExecArray | null;
  while ((match = findingRegex.exec(content)) !== null) {
    const num = parseInt(match[1], 10);
    const code = match[2];
    const priority = match[3].trim();
    const location = match[4].trim();
    const source = match[5].trim();
    const evidence = match[6].trim();
    const discrepancy = match[7].trim();
    const correction = match[8].trim();

    // Determine clase from location (e.g., "Leccion 1 -> ...")
    let clase = 'General';
    const claseMatch = location.match(/Leccion (\d+)/i);
    if (claseMatch) {
      clase = `Clase ${claseMatch[1]}`;
    }

    findings.push({
      num,
      code,
      priority,
      location,
      source,
      evidence,
      discrepancy,
      correction,
      clase
    });
  }

  console.log(`Total hallazgos extraidos: ${findings.length}`);

  // Summary by code
  const byCode: Record<string, number> = {};
  const byClase: Record<string, number> = {};
  for (const f of findings) {
    byCode[f.code] = (byCode[f.code] || 0) + 1;
    byClase[f.clase] = (byClase[f.clase] || 0) + 1;
  }

  console.log('Por codigo:', byCode);
  console.log('Por clase:', byClase);

  // Generate markdown
  let md = `# REGISTRO VERIFICABLE DE HALLAZGOS PREVIOS - MATEMÁTICA 7° BÁSICO OA04\n\n`;
  md += `- **Objetivo de Aprendizaje:** 110-7-MAT-OA04 (Porcentajes)\n`;
  md += `- **Total Real de Hallazgos Verificados:** ${findings.length}\n`;
  md += `- **Fecha de Extracción y Auditoría Previa:** 2026-10-08T16:46:09.997Z\n`;
  md += `- **Estado Previo:** REQUIERE CORRECCIONES\n\n`;

  md += `## 1. Resumen Cuantitativo de Hallazgos por Regla Afectada\n\n`;
  md += `| Código Regla | Descripción | Cantidad Real |\n`;
  md += `| :--- | :--- | :--- |\n`;
  for (const [code, count] of Object.entries(byCode)) {
    md += `| **${code}** | Regla auditada | ${count} |\n`;
  }
  md += `| **TOTAL** | **Total de discrepancias documentadas** | **${findings.length}** |\n\n`;

  md += `## 2. Resumen de Hallazgos por Clase\n\n`;
  md += `| Clase | Total de Hallazgos |\n`;
  md += `| :--- | :--- |\n`;
  for (const [clase, count] of Object.entries(byClase)) {
    md += `| ${clase} | ${count} |\n`;
  }
  md += `\n`;

  md += `## 3. Registro Exhaustivo Verificable de Hallazgos (Clase, Ubicación, Regla, Evidencia y Corrección)\n\n`;
  for (const f of findings) {
    md += `### Hallazgo ${f.num} [${f.code}] - ${f.clase}\n\n`;
    md += `- **Clase:** ${f.clase}\n`;
    md += `- **Ubicación:** \`${f.location}\`\n`;
    md += `- **Regla Afectada:** ${f.source} (${f.code})\n`;
    md += `- **Evidencia (Material Revisado):** ${f.evidence}\n`;
    md += `- **Discrepancia:** ${f.discrepancy}\n`;
    md += `- **Corrección Planificada:** ${f.correction}\n\n`;
  }

  const outPath = path.resolve('docs/auditorias/110-7-MAT-OA04_hallazgos_previos.md');
  fs.writeFileSync(outPath, md, 'utf-8');
  console.log(`Archivo generado con exito: ${outPath} (${fs.statSync(outPath).size} bytes)`);
}

main();
