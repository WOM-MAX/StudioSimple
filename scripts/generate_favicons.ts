/**
 * generate_favicons.ts — Generador de Suite Completa de Favicons y PWA Icons
 * 
 * Utiliza sharp para redimensionar el imagotipo oficial de EstudioSimple
 * y generar todas las variantes necesarias (PNG multi-tamaño, ICO, squircle PWA).
 * 
 * Uso: npx tsx scripts/generate_favicons.ts
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve(import.meta.dirname ?? __dirname, '..', 'Web Studio Simple', 'public');
const IMAGOTIPO_PATH = path.join(PUBLIC_DIR, 'logos', 'imagotipo.png');

/**
 * Crea un ícono con fondo squircle blanco y el imagotipo centrado con padding.
 * Usado para apple-touch-icon y PWA icons según la especificación de "Muestra de usos.png".
 */
async function createSquircleIcon(size: number, padding: number, outputPath: string): Promise<void> {
  const innerSize = size - padding * 2;
  const radius = Math.round(size * 0.22); // ~22% corner radius para efecto squircle

  // Fondo blanco con esquinas redondeadas (squircle)
  const backgroundSvg = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#FFFFFF"/>
    </svg>`
  );

  // Redimensionar el imagotipo con fondo transparente
  const resizedIcon = await sharp(IMAGOTIPO_PATH)
    .resize(innerSize, innerSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();

  // Componer: fondo squircle + imagotipo centrado
  await sharp(backgroundSvg)
    .composite([{
      input: resizedIcon,
      top: padding,
      left: padding
    }])
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  console.log(`  ✅ ${path.basename(outputPath)} (${size}×${size}, ${(stats.size / 1024).toFixed(1)} KB)`);
}

/**
 * Crea un ícono con fondo transparente (para pestañas del navegador).
 */
async function createTransparentIcon(size: number, outputPath: string): Promise<void> {
  await sharp(IMAGOTIPO_PATH)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  console.log(`  ✅ ${path.basename(outputPath)} (${size}×${size}, ${(stats.size / 1024).toFixed(1)} KB)`);
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

  console.log(`  ✅ favicon.ico (${(ico.length / 1024).toFixed(1)} KB, PNG-in-ICO 32×32)`);
}

async function main(): Promise<void> {
  console.log('');
  console.log('🎨 ═══════════════════════════════════════════════════════');
  console.log('   EstudioSimple — Generador de Suite de Favicons y PWA');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  // Validar existencia del imagotipo fuente
  if (!fs.existsSync(IMAGOTIPO_PATH)) {
    console.error(`❌ FATAL: No se encontró el imagotipo fuente en:\n   ${IMAGOTIPO_PATH}`);
    process.exit(1);
  }

  const meta = await sharp(IMAGOTIPO_PATH).metadata();
  console.log(`📸 Fuente: imagotipo.png (${meta.width}×${meta.height}, ${meta.format})`);
  console.log('');

  // ── 1. Favicons Transparentes (Browser Tabs) ──────────────────────────
  console.log('🔹 Generando favicons transparentes (browser tabs)...');
  await createTransparentIcon(16, path.join(PUBLIC_DIR, 'favicon-16x16.png'));
  await createTransparentIcon(32, path.join(PUBLIC_DIR, 'favicon-32x32.png'));
  console.log('');

  // ── 2. Íconos Squircle (App / PWA / Apple) ────────────────────────────
  console.log('🔹 Generando íconos squircle (Apple Touch + PWA)...');
  await createSquircleIcon(180, 16, path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  await createSquircleIcon(192, 18, path.join(PUBLIC_DIR, 'pwa-192x192.png'));
  await createSquircleIcon(512, 48, path.join(PUBLIC_DIR, 'pwa-512x512.png'));
  console.log('');

  // ── 3. favicon.ico (Legacy) ───────────────────────────────────────────
  console.log('🔹 Generando favicon.ico (compatibilidad legacy)...');
  createFaviconIco(
    path.join(PUBLIC_DIR, 'favicon-32x32.png'),
    path.join(PUBLIC_DIR, 'favicon.ico')
  );
  console.log('');

  // ── Resumen ───────────────────────────────────────────────────────────
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

  console.log('═══════════════════════════════════════════════════════════');
  console.log(`✅ Suite completa generada: ${generatedFiles.length} archivos en public/`);
  
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
    console.log('  ✅ Todos los archivos verificados en disco.');
  }
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
}

main().catch((err) => {
  console.error('❌ Error fatal en generación de favicons:', err);
  process.exit(1);
});
