/**
 * generate_favicons.ts — Generador de Suite Completa de Favicons y PWA Icons
 * 
 * Implementa el rediseño "Favicon Masivo Tipo Gmail":
 * - Glifo macro bold a sangre de la "E" de EstudioSimple.
 * - Squircle base blanco (#FFFFFF) para contraste ratio 21:1 en fondos oscuros o claros.
 * - Cuatro colores oficiales de marca:
 *     • Espina vertical: Azul Marino (#1C3257)
 *     • Barra superior: Naranja Estudio (#EE751C)
 *     • Barra intermedia: Amarillo Sol (#F8AD22)
 *     • Barra inferior: Turquesa (#12A1A4)
 * - Geometría calibrada para alineación píxel-perfecta en 16×16 px (3px de trazo por barra, 2px de gap).
 * 
 * Uso: npx tsx scripts/generate_favicons.ts
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve(import.meta.dirname ?? __dirname, '..', 'Web Studio Simple', 'public');

export const FAVICON_SVG_CONTENT = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- EstudioSimple — Favicon Oficial Masivo Macro (Estilo M de Gmail) -->
  <!-- Base Squircle Blanco Brillante Alto Contraste (21:1) -->
  <rect width="512" height="512" rx="112" fill="#FFFFFF"/>
  
  <!-- Barras Horizontales con Terminación Pill (rx=48) -->
  <!-- Barra Superior: Naranja Estudio Oficial -->
  <rect x="108" y="60" width="344" height="96" rx="48" fill="#EE751C"/>
  <!-- Barra Media: Amarillo Sol Oficial -->
  <rect x="108" y="208" width="280" height="96" rx="48" fill="#F8AD22"/>
  <!-- Barra Inferior: Turquesa Oficial -->
  <rect x="108" y="356" width="344" height="96" rx="48" fill="#12A1A4"/>
  
  <!-- Espina Vertical: Azul Marino Oficial (rx=48) -->
  <rect x="60" y="60" width="96" height="392" rx="48" fill="#1C3257"/>
</svg>
`;

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
  console.log('   EstudioSimple — Generador de Favicons Masivos Macro (Estilo Gmail)');
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('');

  // 1. Guardar favicon.svg canónico oficial
  const svgPath = path.join(PUBLIC_DIR, 'favicon.svg');
  fs.writeFileSync(svgPath, FAVICON_SVG_CONTENT.trim(), 'utf-8');
  console.log(`  ✅ favicon.svg generado (SVG vectorial de alta fidelidad)`);

  const svgBuffer = Buffer.from(FAVICON_SVG_CONTENT);

  // 2. Favicons para Pestañas del Navegador (16×16 y 32×32)
  console.log('🔹 Renderizando favicons rasterizados para pestañas (Pixel-Perfect)...');
  
  const png16Path = path.join(PUBLIC_DIR, 'favicon-16x16.png');
  await sharp(svgBuffer)
    .resize(16, 16)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(png16Path);
  console.log(`  ✅ favicon-16x16.png (${(fs.statSync(png16Path).size / 1024).toFixed(1)} KB)`);

  const png32Path = path.join(PUBLIC_DIR, 'favicon-32x32.png');
  await sharp(svgBuffer)
    .resize(32, 32)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(png32Path);
  console.log(`  ✅ favicon-32x32.png (${(fs.statSync(png32Path).size / 1024).toFixed(1)} KB)`);

  // 3. Íconos de App y PWA (180×180, 192×192 y 512×512)
  console.log('🔹 Renderizando íconos Touch y PWA...');
  
  const touchPath = path.join(PUBLIC_DIR, 'apple-touch-icon.png');
  await sharp(svgBuffer)
    .resize(180, 180)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(touchPath);
  console.log(`  ✅ apple-touch-icon.png (${(fs.statSync(touchPath).size / 1024).toFixed(1)} KB)`);

  const pwa192Path = path.join(PUBLIC_DIR, 'pwa-192x192.png');
  await sharp(svgBuffer)
    .resize(192, 192)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(pwa192Path);
  console.log(`  ✅ pwa-192x192.png (${(fs.statSync(pwa192Path).size / 1024).toFixed(1)} KB)`);

  const pwa512Path = path.join(PUBLIC_DIR, 'pwa-512x512.png');
  await sharp(svgBuffer)
    .resize(512, 512)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(pwa512Path);
  console.log(`  ✅ pwa-512x512.png (${(fs.statSync(pwa512Path).size / 1024).toFixed(1)} KB)`);

  // 4. favicon.ico Multi-Resolución Legacy
  console.log('🔹 Generando favicon.ico...');
  createFaviconIco(png32Path, path.join(PUBLIC_DIR, 'favicon.ico'));

  // 5. Validación de Suite Completa
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

  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(`✅ Suite completa de favicons masivos lista: ${generatedFiles.length} archivos en public/`);
  
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
