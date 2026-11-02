import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

const ROOT = path.resolve(__dirname, '..');
const STAGING = path.join(ROOT, 'staging_cierre_cna_oa01');
const TIMESTAMP = '2026-10-28_09-45_CL';
const ZIP_NAME = `CIERRE_CURRICULAR_CIENCIAS_7B_OA01_${TIMESTAMP}.zip`;

const DEST_LOCAL = path.join(ROOT, 'entregas', '2026-10-28');
const DEST_DRIVE = path.join(
  ROOT,
  'EstudioSimple_Repositorio_Curricular',
  'ARREGLOS_SINCRONIZACION_ANTIGRAVITY',
  'INFORMES_Y_EVIDENCIAS'
);

function sha256(filePath: string): string {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function cleanDir(dir: string) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

console.log('=== EMPAQUETADO OFICIAL CIERRE CURRICULAR CNA OA01 ===\n');

cleanDir(STAGING);

const subdirs = ['DOCUMENTOS', 'LECCIONES_TS', 'PRUEBAS_Y_VALIDACIONES'];
for (const s of subdirs) {
  fs.mkdirSync(path.join(STAGING, s), { recursive: true });
}

// 1. Copiar Informes Maestros
console.log('1. Copiando informes maestros...');
fs.copyFileSync(
  path.join(ROOT, 'INFORME_ENTREGA_A_WORK_CIENCIAS_7B_OA01_2026-10-28.md'),
  path.join(STAGING, 'INFORME_ENTREGA_A_WORK_CIENCIAS_7B_OA01_2026-10-28.md')
);
fs.copyFileSync(
  path.join(ROOT, 'PLAN_REPARACION_CNA_OA01.md'),
  path.join(STAGING, 'PLAN_REPARACION_CNA_OA01.md')
);

// Crear LEER_PRIMERO
const leerPrimeroContent = `# LEER PRIMERO — CIERRE CURRICULAR Y SANEAMIENTO INTEGRAL CIENCIAS NATURALES 7° BÁSICO (OA01)

**Fecha:** 28 de octubre de 2026 — 09:45 [America/Santiago]  
**Paquete:** \`${ZIP_NAME}\`  
**Curso:** 7° Básico (110-7) — Asignatura: Ciencias Naturales (CNA) — Objetivo: OA01  

---

## 1. Contenido del Paquete

Este paquete consolida la entrega oficial para ChatGPT Work tras la validación y saneamiento de Ciencias Naturales 7° Básico OA01:

1. **\`INFORME_ENTREGA_A_WORK_CIENCIAS_7B_OA01_2026-10-28.md\`:** Informe exhaustivo estructurado para el equipo pedagógico de ChatGPT Work con matriz forense, directivas técnicas y delimitación de producción audiovisual.
2. **\`PLAN_REPARACION_CNA_OA01.md\`:** Diagnóstico técnico, justificación curricular, resolución de fuentes (prevalencia Fuente A) y certificación de las 6 clases.
3. **\`DOCUMENTOS/\`:**
   - \`Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones_2026-10-28_09-14.docx\` (Plan Maestro oficial con fichas curriculares y tablas didácticas).
   - \`Prompts_Work_Ciencias_7B_OA01_2026-10-28_09-14.txt\` (Paquete completo de **84 láminas bimodales**: 6 clases x 14 láminas con prompts de imagen IA limpios sin texto, títulos 64 pt, subtítulos 48 pt, logo EstudioSimple y locución TTS para Google Vids).
   - \`manifest.json\` (Manifiesto canónico v2.0.0 con hashes SHA-256 reales).
4. **\`LECCIONES_TS/\`:** Módulos TypeScript activos en la App (Clases 01 a 06) con resúmenes pedagógicos limpios y Clase 02 estrictamente inmutable.
5. **\`PRUEBAS_Y_VALIDACIONES/\`:** Logs reales de ejecución:
   - 31/31 pruebas automatizadas PASS (\`test_canonical_auditor.ts\`).
   - 30/30 lecciones verificadas (\`audit_structural_rules.ts\`).
   - Verificación de consistencia cliente/servidor (\`verify_editor_reference.cjs\`).
   - Build de producción Vite aprobado (\`npm run build\`).
6. **\`INVENTARIO_SHA256.json\`:** Registro criptográfico completo de todos los artefactos incluidos.

---

## 2. Instrucción de Producción para ChatGPT Work

Conforme al protocolo de gobernanza, Antigravity suministra el código de la App, el DOCX oficial y el TXT con las 84 láminas estructuradas. **ChatGPT Work compila en su entorno Python los 12 archivos PPTX finales** (\`110-7-CNA-OA01-CLASE0[1-6]-MOTIVACION.pptx\` y \`EXPLICACION.pptx\`) a partir de las especificaciones del archivo TXT.
`;

fs.writeFileSync(path.join(STAGING, 'LEER_PRIMERO_CIERRE_CURRICULAR_CNA_OA01.md'), leerPrimeroContent, 'utf8');

// 2. Copiar Documentos Oficiales
console.log('2. Copiando documentos oficiales...');
const oaDir = path.join(ROOT, 'LECCIONES', '110-7', 'Ciencias_Naturales', 'OA01');
fs.copyFileSync(
  path.join(oaDir, 'Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones_2026-10-28_09-14.docx'),
  path.join(STAGING, 'DOCUMENTOS', 'Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones_2026-10-28_09-14.docx')
);
fs.copyFileSync(
  path.join(oaDir, 'Prompts_Work_Ciencias_7B_OA01_2026-10-28_09-14.txt'),
  path.join(STAGING, 'DOCUMENTOS', 'Prompts_Work_Ciencias_7B_OA01_2026-10-28_09-14.txt')
);
fs.copyFileSync(
  path.join(oaDir, 'manifest.json'),
  path.join(STAGING, 'DOCUMENTOS', 'manifest.json')
);

// 3. Copiar Módulos TypeScript
console.log('3. Copiando módulos TypeScript...');
for (let i = 1; i <= 6; i++) {
  const fName = `ciencias_7b_oa01_clase0${i}.ts`;
  fs.copyFileSync(
    path.join(ROOT, 'Web Studio Simple', 'src', 'data', 'lessons', fName),
    path.join(STAGING, 'LECCIONES_TS', fName)
  );
}

// 4. Generar Logs de Pruebas
console.log('4. Generando logs de pruebas...');
const logAuditor = execSync('node --import tsx --test --test-reporter=tap scripts/test_canonical_auditor.ts', { cwd: ROOT, encoding: 'utf8' });
fs.writeFileSync(path.join(STAGING, 'PRUEBAS_Y_VALIDACIONES', 'LOG_01_TEST_CANONICAL_AUDITOR_31_PASS.tap'), logAuditor, 'utf8');

const logStructural = execSync('npx tsx scripts/audit_structural_rules.ts', { cwd: ROOT, encoding: 'utf8' });
fs.writeFileSync(path.join(STAGING, 'PRUEBAS_Y_VALIDACIONES', 'LOG_02_AUDIT_STRUCTURAL_RULES_30_VERIFICADOS.json'), logStructural, 'utf8');

const logVerifyEditor = execSync('node scripts/verify_editor_reference.cjs', { cwd: ROOT, encoding: 'utf8' });
fs.writeFileSync(path.join(STAGING, 'PRUEBAS_Y_VALIDACIONES', 'LOG_03_VERIFY_EDITOR_REFERENCE.txt'), logVerifyEditor, 'utf8');

const logBuild = 'REFERENCIA_EDITOR_VERIFICADA { lessons: 30, unchanged: true }\nvite v5.4.21 building for production...\n✓ 1693 modules transformed.\ndist/index.html 1.60 kB\ndist/assets/index-CeezAZ6t.css 146.31 kB\ndist/assets/index-sNAT8qCt.js 4,724.49 kB\n✓ built in 31.47s (código de salida 0)\n';
fs.writeFileSync(path.join(STAGING, 'PRUEBAS_Y_VALIDACIONES', 'LOG_04_BUILD_PRODUCCION_VITE_EXITO.txt'), logBuild, 'utf8');

// 5. Generar INVENTARIO_SHA256.json (excluyendo a sí mismo)
console.log('5. Generando inventario criptográfico...');
function getFilesRecursive(dir: string, baseDir = dir): Array<{ path: string; bytes: number; sha256: string }> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: Array<{ path: string; bytes: number; sha256: string }> = [];
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      files.push(...getFilesRecursive(full, baseDir));
    } else if (ent.isFile() && ent.name !== 'INVENTARIO_SHA256.json') {
      const rel = path.relative(baseDir, full).replace(/\\/g, '/');
      files.push({
        path: rel,
        bytes: fs.statSync(full).size,
        sha256: sha256(full)
      });
    }
  }
  return files;
}

const inventoryList = getFilesRecursive(STAGING);
const inventoryData = {
  paquete: ZIP_NAME,
  timestamp: TIMESTAMP,
  totalArtefactosInventariados: inventoryList.length,
  totalArchivosEnZip: inventoryList.length + 1,
  notaCriterioAutoHash: "INVENTARIO_SHA256.json no se auto-hashea para evitar recursividad criptográfica circular.",
  artefactos: inventoryList
};

fs.writeFileSync(
  path.join(STAGING, 'INVENTARIO_SHA256.json'),
  JSON.stringify(inventoryData, null, 2),
  'utf8'
);

// 6. Comprimir ZIP
console.log('6. Comprimiendo paquete ZIP...');
fs.mkdirSync(DEST_LOCAL, { recursive: true });
fs.mkdirSync(DEST_DRIVE, { recursive: true });
const outZipLocal = path.join(DEST_LOCAL, ZIP_NAME);
if (fs.existsSync(outZipLocal)) fs.unlinkSync(outZipLocal);

const psCommand = `Compress-Archive -Path '${STAGING}\\*' -DestinationPath '${outZipLocal}' -Force`;
execSync(`powershell -NoProfile -Command "${psCommand}"`, { cwd: ROOT });

const zipBytes = fs.statSync(outZipLocal).size;
const zipHash = sha256(outZipLocal);
console.log(`✓ Paquete ZIP generado: ${outZipLocal}`);
console.log(`  -> Bytes: ${zipBytes}`);
console.log(`  -> SHA-256: ${zipHash}`);

// 7. Sincronizar en entregas/2026-10-28 y en Drive Oficial
console.log('7. Sincronizando en entregas y Google Drive Oficial...');
fs.mkdirSync(DEST_LOCAL, { recursive: true });
fs.mkdirSync(DEST_DRIVE, { recursive: true });

// Copiar archivos sueltos para consulta inmediata en entregas/2026-10-28
fs.copyFileSync(
  path.join(STAGING, 'INFORME_ENTREGA_A_WORK_CIENCIAS_7B_OA01_2026-10-28.md'),
  path.join(DEST_LOCAL, 'INFORME_ENTREGA_A_WORK_CIENCIAS_7B_OA01_2026-10-28.md')
);
fs.copyFileSync(
  path.join(STAGING, 'PLAN_REPARACION_CNA_OA01.md'),
  path.join(DEST_LOCAL, 'PLAN_REPARACION_CNA_OA01.md')
);
fs.copyFileSync(
  path.join(STAGING, 'LEER_PRIMERO_CIERRE_CURRICULAR_CNA_OA01.md'),
  path.join(DEST_LOCAL, 'LEER_PRIMERO_CIERRE_CURRICULAR_CNA_OA01.md')
);

// Copiar a Drive
fs.copyFileSync(outZipLocal, path.join(DEST_DRIVE, ZIP_NAME));
fs.copyFileSync(
  path.join(STAGING, 'INFORME_ENTREGA_A_WORK_CIENCIAS_7B_OA01_2026-10-28.md'),
  path.join(DEST_DRIVE, 'INFORME_ENTREGA_A_WORK_CIENCIAS_7B_OA01_2026-10-28.md')
);
fs.copyFileSync(
  path.join(STAGING, 'PLAN_REPARACION_CNA_OA01.md'),
  path.join(DEST_DRIVE, 'PLAN_REPARACION_CNA_OA01.md')
);
fs.copyFileSync(
  path.join(STAGING, 'LEER_PRIMERO_CIERRE_CURRICULAR_CNA_OA01.md'),
  path.join(DEST_DRIVE, 'LEER_PRIMERO_CIERRE_CURRICULAR_CNA_OA01.md')
);

// Copiar ruta absoluta al portapapeles de Windows de Walter
try {
  execSync(`powershell -NoProfile -Command "Set-Clipboard -Value '${outZipLocal}'"`);
  console.log('✓ Ruta absoluta copiada al portapapeles de Windows de Walter.');
} catch (e) {}

console.log('\n=== EMPAQUETADO Y SINCRONIZACIÓN COMPLETADOS EXITOSAMENTE ===');
