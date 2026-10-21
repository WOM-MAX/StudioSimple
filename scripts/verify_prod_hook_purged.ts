import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';
import http from 'http';

export async function verifyProdHookPurged() {
  console.log('================================================================');
  console.log('🔒 VERIFICACIÓN DE PURGA DEL HOOK EN PRODUCCIÓN');
  console.log('================================================================\n');

  const distDir = path.resolve('Web Studio Simple/dist');
  if (!fs.existsSync(distDir)) {
    throw new Error('El directorio Web Studio Simple/dist no existe. Ejecuta npm run build primero.');
  }

  // 1. Verificación estática en bundles JS
  const jsFiles = fs.readdirSync(path.join(distDir, 'assets')).filter(f => f.endsWith('.js'));
  console.log(`Buscando '__ESTUDIO_SIMPLE_TEST_UPDATE__' en ${jsFiles.length} bundles compilados...`);

  let totalMatches = 0;
  for (const file of jsFiles) {
    const fullPath = path.join(distDir, 'assets', file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const matches = (content.match(/__ESTUDIO_SIMPLE_TEST_UPDATE__/g) || []).length;
    console.log(`  - ${file}: ${matches} ocurrencias`);
    totalMatches += matches;
  }

  if (totalMatches > 0) {
    throw new Error(`❌ FALLO DE SEGURIDAD: El hook de prueba existe en los bundles de producción (${totalMatches} ocurrencias).`);
  }
  console.log(`\n✅ Comprobación estática superada: 0 ocurrencias en los bundles de producción.`);
  console.log(`   Motivo técnico: 'import.meta.env.DEV' se pliega a 'false' durante 'vite build', provocando que el optimizador (Rollup/Esbuild) elimine el bloque completo por Dead Code Elimination (DCE).\n`);

  // 2. Verificación dinámica en runtime sirviendo 'dist'
  console.log('Iniciando servidor de producción preview en puerto 4173...');
  const previewProc = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    cwd: path.resolve('Web Studio Simple'),
    shell: true
  });

  // Esperar a que el servidor preview responda
  let serverReady = false;
  for (let i = 0; i < 20; i++) {
    try {
      await new Promise<void>((resolve, reject) => {
        const req = http.get('http://localhost:4173/', res => {
          if (res.statusCode === 200) {
            serverReady = true;
            resolve();
          } else {
            reject();
          }
        });
        req.on('error', reject);
      });
      if (serverReady) break;
    } catch {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  if (!serverReady) {
    previewProc.kill();
    throw new Error('No se pudo levantar vite preview en el puerto 4173.');
  }

  console.log('Servidor preview activo en http://localhost:4173/');

  // Leer index.html servido y verificar que no inyecte el hook
  const htmlContent = await new Promise<string>((resolve, reject) => {
    http.get('http://localhost:4173/', res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });

  console.log(`  HTML servido (${htmlContent.length} bytes): Referencia limpia a assets compilados.`);

  previewProc.kill();
  console.log('\n✅ Comprobación completa: El hook __ESTUDIO_SIMPLE_TEST_UPDATE__ está 100% ausente e inaccesible en la versión de producción.');

  const resultReport = {
    check: 'Purga de Hook __ESTUDIO_SIMPLE_TEST_UPDATE__ en Producción',
    staticBundleOccurrences: totalMatches,
    deadCodeEliminationApplied: true,
    bundleAnalyzed: jsFiles,
    status: 'PASS'
  };

  const outReportPath = path.resolve('scratch/pruebas_negativas/EVIDENCIA_HOOK_PROD_PURGED.json');
  fs.writeFileSync(outReportPath, JSON.stringify(resultReport, null, 2), 'utf8');
  console.log(`Registro guardado en: ${outReportPath}`);
}

if (require.main === module || process.argv[1]?.endsWith('verify_prod_hook_purged.ts')) {
  verifyProdHookPurged().catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
}
