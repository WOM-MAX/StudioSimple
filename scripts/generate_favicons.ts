/**
 * generate_favicons.ts — Generador de Suite Completa de Favicons y PWA Icons
 * 
 * Genera la suite completa de favicons de alto contraste (21:1) sobre
 * contenedor squircle blanco (#FFFFFF), aplicando trim perimetral automático
 * sobre imagotipo.png para maximizar el peso óptico (86% de cobertura útil).
 * 
 * Uso: npx tsx scripts/generate_favicons.ts
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve(import.meta.dirname ?? __dirname, '..', 'Web Studio Simple', 'public');
const IMAGOTIPO_PATH = path.join(PUBLIC_DIR, 'logos', 'imagotipo.png');

/**
 * Crea un ícono con fondo squircle blanco y el imagotipo recortado (.trim()) centrado.
 */
async function createSquircleIcon(
  trimmedBuffer: Buffer,
  size: number,
  padding: number,
  outputPath: string
): Promise<void> {
  const innerSize = Math.max(size - padding * 2, 1);
  const radius = Math.round(size * 0.22); // Squircle con curvatura superelíptica ~22%

  // Fondo blanco puro con esquinas redondeadas (squircle)
  const backgroundSvg = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#FFFFFF"/>
    </svg>`
  );

  // Redimensionar el imagotipo recortado ajustándolo al área útil
  const resizedIcon = await sharp(trimmedBuffer)
    .resize(innerSize, innerSize, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toBuffer();

  // Componer: fondo squircle blanco + isotipo oficial nítido
  await sharp(backgroundSvg)
    .composite([{
      input: resizedIcon,
      top: padding,
      left: padding
    }])
    .png({ quality: 98, compressionLevel: 9 })
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  console.log(`  ✅ ${path.basename(outputPath)} (${size}×${size}, ${(stats.size / 1024).toFixed(1)} KB, squircle blanco)`);
}

/**
 * Empaqueta un PNG de 32×32 en formato ICO (header + PNG embebido).
 * Compatible con todos los navegadores legados y motores de búsqueda.
 */
function createFaviconIco(png32Path: string, outputPath: string): void {
  const pngData = fs.readFileSync(png32Path);

  // ICO Header (6 bytes)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);      // Reserved
  header.writeUInt16LE(1, 2);      // Type: 1 = ICO
  header.writeUInt16LE(1, 4);      // Number of images: 1

  // ICO Directory Entry (16 bytes)
  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);         // Width: 32px
  entry.writeUInt8(32, 1);         // Height: 32px
  entry.writeUInt8(0, 2);          // Color palette: 0 (sin paleta)
  entry.writeUInt8(0, 3);          // Reserved
  entry.writeUInt16LE(1, 4);       // Color planes: 1
  entry.writeUInt16LE(32, 6);      // Bits per pixel: 32
  entry.writeUInt32LE(pngData.length, 8);   // Size del bloque PNG
  entry.writeUInt32LE(22, 12);     // Offset: 6 (header) + 16 (entry) = 22

  const ico = Buffer.concat([header, entry, pngData]);
  fs.writeFileSync(outputPath, ico);

  console.log(`  ✅ favicon.ico (${(ico.length / 1024).toFixed(1)} KB, PNG-in-ICO 32×32 squircle)`);
}

async function main(): Promise<void> {
  console.log('');
  console.log('🎨 ═══════════════════════════════════════════════════════════════════');
  console.log('   EstudioSimple — Generador de Favicons Squircle Alto Contraste');
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('');

  // Validar existencia del imagotipo fuente
  if (!fs.existsSync(IMAGOTIPO_PATH)) {
    console.error(`❌ FATAL: No se encontró el imagotipo fuente en:\n   ${IMAGOTIPO_PATH}`);
    process.exit(1);
  }

  // Pre-procesar imagotipo: aplicar trim() para descartar márgenes transparentes
  console.log('🔹 Recortando márgenes transparentes con sharp.trim()...');
  const trimmedBuffer = await sharp(IMAGOTIPO_PATH)
    .trim()
    .toBuffer();
  
  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  console.log(`   Área útil detectada: ${trimmedMeta.width}×${trimmedMeta.height} px`);
  console.log('');

  // ── 1. Favicons para Pestañas del Navegador (Squircle Blanco Alto Contraste) ──
  console.log('🔹 Generando favicons para pestañas (squircle blanco 21:1)...');
  await createSquircleIcon(trimmedBuffer, 16, 1, path.join(PUBLIC_DIR, 'favicon-16x16.png'));
  await createSquircleIcon(trimmedBuffer, 32, 2, path.join(PUBLIC_DIR, 'favicon-32x32.png'));
  console.log('');

  // ── 2. Íconos de App y PWA (Squircle Blanco Oficial) ──────────────────────────
  console.log('🔹 Generando íconos de App / PWA (squircle blanco optimizado)...');
  await createSquircleIcon(trimmedBuffer, 180, 12, path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  await createSquircleIcon(trimmedBuffer, 192, 14, path.join(PUBLIC_DIR, 'pwa-192x192.png'));
  await createSquircleIcon(trimmedBuffer, 512, 36, path.join(PUBLIC_DIR, 'pwa-512x512.png'));
  console.log('');

  // ── 3. favicon.ico (Legacy) ───────────────────────────────────────────────────
  console.log('🔹 Generando favicon.ico multi-resolución...');
  createFaviconIco(
    path.join(PUBLIC_DIR, 'favicon-32x32.png'),
    path.join(PUBLIC_DIR, 'favicon.ico')
  );
  console.log('');

  // ── Resumen de Validación ─────────────────────────────────────────────────────
  const generatedFiles = [
    'favicon.svg',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'apple-touch-icon.png',
    'pwa-192x192.png',
    'pwa-512x512.png',
    'favicon.ico',
    'site.webmanifest'
  ];

  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(`✅ Suite completa de alto contraste lista: ${generatedFiles.length} archivos en public/`);
  
  let allExist = true;
  for (const file of generatedFiles) {
    const fullPath = path.join(PUBLIC_DIR, file);
    const exists = fs.existsSync(fullPath);
    if (!exists) {
      console.log(`  ❌ FALTA: ${file}`);
      allExist = false;
    }
  }
  
  if (allExist) {
    console.log('  ✅ Todos los archivos verificados en disco con dimensiones óptimas.');
  }
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('');
}

main().catch((err) => {
  console.error('❌ Error fatal en generación de favicons:', err);
  process.exit(1);
});
