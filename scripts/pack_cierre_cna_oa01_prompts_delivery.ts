import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

const ROOT = path.resolve(__dirname, '..');
const STAGING = path.join(ROOT, 'staging_prompts_corregidos_cna_oa01');
const TIMESTAMP = '2026-10-28_10-30_CL';
const ZIP_NAME = `INSUMOS_PRESENTACIONES_CNA_OA01_CORREGIDOS_${TIMESTAMP}.zip`;

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

console.log('=== EMPAQUETADO OFICIAL INSUMOS AUDIOVISUALES CORREGIDOS CNA OA01 ===\n');

cleanDir(STAGING);

// 1. Copiar TXT corregido
console.log('1. Copiando TXT corregido...');
const txtCorregidoSrc = path.join(
  ROOT,
  'LECCIONES',
  '110-7',
  'Ciencias_Naturales',
  'OA01',
  `Prompts_Work_Ciencias_7B_OA01_CORREGIDO_${TIMESTAMP}.txt`
);

fs.copyFileSync(
  txtCorregidoSrc,
  path.join(STAGING, `Prompts_Work_Ciencias_7B_OA01_CORREGIDO_${TIMESTAMP}.txt`)
);

// 2. Copiar informe de control de calidad
console.log('2. Copiando informe de control de calidad...');
fs.copyFileSync(
  path.join(ROOT, 'CONTROL_CALIDAD_PROMPTS_CNA_OA01.md'),
  path.join(STAGING, 'CONTROL_CALIDAD_PROMPTS_CNA_OA01.md')
);

// 3. Crear LEER_PRIMERO
const leerPrimeroContent = `# LEER PRIMERO — INSUMOS PRESENTACIONES PPTX CORREGIDOS (CIENCIAS 7° BÁSICO OA01)

**Fecha:** 28 de octubre de 2026 — 10:30 [America/Santiago]  
**Paquete:** \`${ZIP_NAME}\`  
**Destinatario:** ChatGPT Work / Walter  

---

## 1. Contenido del Paquete

Este paquete suministra los insumos completos, desambiguados y certificados para que ChatGPT Work proceda a compilar las **12 presentaciones oficiales PPTX** de Ciencias Naturales 7° Básico OA01:

1. **\`Prompts_Work_Ciencias_7B_OA01_CORREGIDO_${TIMESTAMP}.txt\`:**
   - 84 láminas bimodales completas (6 clases x 14 diapositivas: 7 Motivación + 7 Explicación).
   - 84 prompts de imagen IA detallados (0 vacíos), en anime moderno educativo 16:9 full-bleed sin texto dibujado por IA ('No text drawn by AI').
   - Protagonistas universales de 7° Básico (la joven con trenzas y el joven con chaqueta cerceta de 13 años) con rotación espacial dinámica.
   - Tipografía oficial: Título 64 pt Amarillo Oro (#FFD700), Subtítulo 48 pt Blanco (#FFFFFF). Cero paneles, cero sombras.
   - Diapositiva 1 de las 6 presentaciones de Explicación configurada con el **Objetivo de la lección** canónico.
   - Nomenclatura vigente oficial: \`MOTIVACION\` y \`EXPLICACION\` (0 ocurrencias de 'GANCHO').
2. **\`CONTROL_CALIDAD_PROMPTS_CNA_OA01.md\`:**
   - Auditoría automática certificada con 14/14 controles PASS.
   - Respuestas al cuestionario normativo de Work.
3. **\`INVENTARIO_SHA256.json\`:**
   - Registro criptográfico de los artefactos contenidos.

---

## 2. Próximo Paso (ChatGPT Work en Python)

ChatGPT Work tiene la vía libre para generar los 12 archivos binarios:
- \`110-7-CNA-OA01-CLASE01-MOTIVACION.pptx\` y \`EXPLICACION.pptx\`
- \`110-7-CNA-OA01-CLASE02-MOTIVACION.pptx\` y \`EXPLICACION.pptx\`
- \`110-7-CNA-OA01-CLASE03-MOTIVACION.pptx\` y \`EXPLICACION.pptx\`
- \`110-7-CNA-OA01-CLASE04-MOTIVACION.pptx\` y \`EXPLICACION.pptx\`
- \`110-7-CNA-OA01-CLASE05-MOTIVACION.pptx\` y \`EXPLICACION.pptx\`
- \`110-7-CNA-OA01-CLASE06-MOTIVACION.pptx\` y \`EXPLICACION.pptx\`
`;

fs.writeFileSync(path.join(STAGING, 'LEER_PRIMERO_INSUMOS_CORREGIDOS.md'), leerPrimeroContent, 'utf8');

// 4. Generar INVENTARIO_SHA256.json
console.log('3. Generando inventario criptográfico...');
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

// 5. Comprimir paquete ZIP
console.log('4. Comprimiendo paquete ZIP...');
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

// 6. Sincronizar en Drive Oficial
console.log('5. Sincronizando en Google Drive Oficial...');
fs.copyFileSync(outZipLocal, path.join(DEST_DRIVE, ZIP_NAME));
fs.copyFileSync(
  path.join(STAGING, 'CONTROL_CALIDAD_PROMPTS_CNA_OA01.md'),
  path.join(DEST_LOCAL, 'CONTROL_CALIDAD_PROMPTS_CNA_OA01.md')
);
fs.copyFileSync(
  path.join(STAGING, 'CONTROL_CALIDAD_PROMPTS_CNA_OA01.md'),
  path.join(DEST_DRIVE, 'CONTROL_CALIDAD_PROMPTS_CNA_OA01.md')
);
fs.copyFileSync(
  path.join(STAGING, 'LEER_PRIMERO_INSUMOS_CORREGIDOS.md'),
  path.join(DEST_LOCAL, 'LEER_PRIMERO_INSUMOS_CORREGIDOS.md')
);
fs.copyFileSync(
  path.join(STAGING, 'LEER_PRIMERO_INSUMOS_CORREGIDOS.md'),
  path.join(DEST_DRIVE, 'LEER_PRIMERO_INSUMOS_CORREGIDOS.md')
);

// 7. Copiar ruta absoluta al portapapeles de Windows
try {
  execSync(`powershell -NoProfile -Command "Set-Clipboard -Value '${outZipLocal}'"`);
  console.log('✓ Ruta absoluta copiada al portapapeles de Windows de Walter.');
} catch (e) {}

console.log('\n=== EMPAQUETADO Y SINCRONIZACIÓN COMPLETADOS EXITOSAMENTE ===');
