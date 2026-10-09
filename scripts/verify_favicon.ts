/**
 * verify_favicon.ts — Verificación de Suite de Favicons y PWA
 * 
 * Valida que todos los archivos de la suite estén presentes en dist/
 * y que sus tamaños sean > 0 bytes. Si se pasa --http <url>, también
 * verifica los endpoints HTTP con Content-Type correcto.
 * 
 * Uso:
 *   npx tsx scripts/verify_favicon.ts                    # Solo verificación de archivos
 *   npx tsx scripts/verify_favicon.ts --http http://localhost:3000  # + verificación HTTP
 */

import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve(import.meta.dirname ?? __dirname, '..', 'Web Studio Simple', 'dist');

interface FaviconSpec {
  file: string;
  expectedMime: string;
  minBytes: number;
  description: string;
}

const SUITE: FaviconSpec[] = [
  { file: 'favicon.svg',        expectedMime: 'image/svg+xml',              minBytes: 100,  description: 'SVG vectorial (navegadores modernos)' },
  { file: 'favicon-16x16.png',  expectedMime: 'image/png',                  minBytes: 50,   description: 'PNG 16×16 (fallback)' },
  { file: 'favicon-32x32.png',  expectedMime: 'image/png',                  minBytes: 50,   description: 'PNG 32×32 (fallback)' },
  { file: 'favicon.ico',        expectedMime: 'image/x-icon',               minBytes: 50,   description: 'ICO legacy (compatibilidad)' },
  { file: 'apple-touch-icon.png', expectedMime: 'image/png',                minBytes: 500,  description: 'Apple Touch Icon 180×180' },
  { file: 'pwa-192x192.png',    expectedMime: 'image/png',                  minBytes: 500,  description: 'PWA Icon 192×192' },
  { file: 'pwa-512x512.png',    expectedMime: 'image/png',                  minBytes: 1000, description: 'PWA Icon 512×512 (splash)' },
  { file: 'site.webmanifest',   expectedMime: 'application/manifest+json',  minBytes: 50,   description: 'Web App Manifest' },
];

async function verifyFiles(): Promise<{ passed: number; failed: number }> {
  let passed = 0;
  let failed = 0;

  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  🔍 Verificación de Suite Favicon/PWA en dist/');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  for (const spec of SUITE) {
    const fullPath = path.join(DIST_DIR, spec.file);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`  ❌ FALTA  ${spec.file} — ${spec.description}`);
      failed++;
      continue;
    }

    const stats = fs.statSync(fullPath);
    if (stats.size < spec.minBytes) {
      console.log(`  ❌ VACÍO  ${spec.file} (${stats.size} bytes < ${spec.minBytes} mín.) — ${spec.description}`);
      failed++;
      continue;
    }

    console.log(`  ✅ OK     ${spec.file} (${(stats.size / 1024).toFixed(1)} KB) — ${spec.description}`);
    passed++;
  }

  return { passed, failed };
}

async function verifyHttp(baseUrl: string): Promise<{ passed: number; failed: number }> {
  let passed = 0;
  let failed = 0;

  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`  🌐 Verificación HTTP contra ${baseUrl}`);
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  for (const spec of SUITE) {
    const url = `${baseUrl}/${spec.file}`;
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('content-type') ?? '';
      
      if (!response.ok) {
        console.log(`  ❌ HTTP ${response.status}  ${spec.file}`);
        failed++;
        continue;
      }

      if (!contentType.includes(spec.expectedMime)) {
        console.log(`  ❌ MIME   ${spec.file} — Esperado: ${spec.expectedMime}, Recibido: ${contentType}`);
        failed++;
        continue;
      }

      console.log(`  ✅ OK     ${spec.file} — HTTP ${response.status}, ${contentType}`);
      passed++;
    } catch (err) {
      console.log(`  ❌ ERROR  ${spec.file} — ${(err as Error).message}`);
      failed++;
    }
  }

  return { passed, failed };
}

async function main(): Promise<void> {
  // Verificación de archivos en disco (dist/)
  const fileResult = await verifyFiles();

  // Verificación HTTP opcional
  const httpFlag = process.argv.indexOf('--http');
  let httpResult = { passed: 0, failed: 0 };
  if (httpFlag !== -1 && process.argv[httpFlag + 1]) {
    httpResult = await verifyHttp(process.argv[httpFlag + 1]);
  }

  // Resumen
  const totalPassed = fileResult.passed + httpResult.passed;
  const totalFailed = fileResult.failed + httpResult.failed;

  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`  📊 RESUMEN: ${totalPassed} passed, ${totalFailed} failed`);

  if (totalFailed === 0) {
    console.log('  🎉 ¡Suite de favicon/PWA completamente válida!');
  } else {
    console.log('  ⚠️  Hay archivos faltantes o con errores.');
  }
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  process.exit(totalFailed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('❌ Error en verificación:', err);
  process.exit(1);
});
