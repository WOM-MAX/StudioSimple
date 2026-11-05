import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

const ROOT = path.resolve('.');
const STAGING = path.join(ROOT, 'staging_cierre_definitivo_plan_b');
const ZIP_NAME = 'CIERRE_DEFINITIVO_EDITOR_UNIVERSAL_PLAN_B_110-7_SANEADO_2026-10-28_08-15_CL.zip';

const DEST_DRIVE = path.join(
  ROOT,
  'EstudioSimple_Repositorio_Curricular',
  'ARREGLOS_SINCRONIZACION_ANTIGRAVITY',
  'INFORMES_Y_EVIDENCIAS'
);

const DEST_LOCAL = path.join(ROOT, 'entregas', '2026-10-28');

function sha256(filePath: string): string {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('=== Iniciando empaquetado del Cierre Definitivo Saneado Plan B ===');

const requiredFiles = [
  'LEER_PRIMERO_CIERRE_DEFINITIVO_PLAN_B.md',
  'DIAGNOSTICO_LYL_OA03_CLASE01.md',
  'MATRIZ_FINAL_5_ASIGNATURAS.md',
  'CAMBIOS_REALIZADOS.md',
  'ARCHIVOS_PROTEGIDOS_HASHES_ANTES_DESPUES.json',
  'RESULTADOS_PRUEBAS_COMPLETAS.txt',
  'RESULTADO_BUILD.txt',
  'INVENTARIO_SHA256.json'
];

for (const req of requiredFiles) {
  const full = path.join(STAGING, req);
  if (!fs.existsSync(full)) {
    throw new Error(`Archivo obligatorio faltante: ${req}`);
  }
}

// Crear ZIP
const zipPath = path.join(ROOT, ZIP_NAME);
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

console.log(`Comprimiendo ${STAGING} a ${zipPath}...`);
const psCommand = `Compress-Archive -Path '${STAGING}\\*' -DestinationPath '${zipPath}' -Force`;
execSync(`powershell -NoProfile -Command "${psCommand}"`, { cwd: ROOT });

const zipSize = fs.statSync(zipPath).size;
const zipHash = sha256(zipPath);
console.log(`\n✅ ZIP Creado: ${ZIP_NAME}`);
console.log(`   Tamaño:  ${zipSize} bytes`);
console.log(`   SHA-256: ${zipHash}`);

// Copiar a destinos oficiales
fs.mkdirSync(DEST_LOCAL, { recursive: true });
const destLocalPath = path.join(DEST_LOCAL, ZIP_NAME);
fs.copyFileSync(zipPath, destLocalPath);
console.log(`   Copiado a entregas locales: ${destLocalPath}`);

if (fs.existsSync(path.dirname(DEST_DRIVE))) {
  fs.mkdirSync(DEST_DRIVE, { recursive: true });
  const destDrivePath = path.join(DEST_DRIVE, ZIP_NAME);
  fs.copyFileSync(zipPath, destDrivePath);
  console.log(`   Copiado a Google Drive repo: ${destDrivePath}`);
}

// Copiar ruta al portapapeles de Windows
try {
  const clipCmd = `Set-Clipboard -Path '${zipPath}'`;
  execSync(`powershell -NoProfile -Command "${clipCmd}"`, { cwd: ROOT });
  console.log('   📋 Ruta copiada al portapapeles de Windows.');
} catch (e: any) {
  console.warn('   No se pudo copiar al portapapeles:', e.message);
}

console.log('\n=== EMPAQUETADO SANEADO FINALIZADO CON ÉXITO ===');
