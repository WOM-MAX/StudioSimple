/**
 * scripts/git_sync.ts
 * Motor atomico de sincronizacion Git para EstudioSimple.
 * Ejecuta status, add, commit y push en un unico proceso determinista.
 */
import { execSync } from 'child_process';

function runGitSync() {
  const commitMessage = process.argv[2];

  if (!commitMessage || !commitMessage.trim()) {
    console.error('[GitSync Error]: Debes proporcionar un mensaje de commit convencional.');
    console.error('Uso: npx tsx scripts/git_sync.ts "feat(...): descripcion"');
    process.exit(1);
  }

  console.log('=== MOTOR ATOMICO DE SINCRONIZACION GIT (STUDIOSIMPLE) ===\n');

  try {
    // 1. Inspeccionar cambios pendientes
    const statusOutput = execSync('git status --porcelain', { encoding: 'utf8' }).trim();

    if (!statusOutput) {
      console.log('[GitSync]: El arbol de trabajo esta completamente limpio. No hay cambios para confirmar.');
      const currentHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
      console.log(`[GitSync]: Hash actual: ${currentHash}`);
      process.exit(0);
    }

    console.log('[1/4] Cambios detectados en el arbol de trabajo:');
    const lines = statusOutput.split('\n');
    lines.slice(0, 15).forEach((line) => console.log(`  ${line}`));
    if (lines.length > 15) {
      console.log(`  ... y ${lines.length - 15} archivos mas.`);
    }

    // 2. Preparar archivos (git add .)
    console.log('\n[2/4] Ejecutando preparacion (git add .)...');
    execSync('git add .', { stdio: 'inherit' });

    // 3. Crear commit atomico
    console.log(`\n[3/4] Creando commit atomico: "${commitMessage.trim()}"...`);
    execSync(`git commit -m "${commitMessage.trim().replace(/"/g, '\\"')}"`, { stdio: 'inherit' });

    const newHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    console.log(`-> Commit confirmado exitosamente. Hash: ${newHash}`);

    // 4. Sincronizar remotamente con origin [rama actual]
    const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim() || 'main';
    console.log(`\n[4/4] Sincronizando con repositorio remoto (git push origin ${currentBranch})...`);
    execSync(`git push origin ${currentBranch}`, { stdio: 'inherit' });

    console.log(`\n=== SINCRONIZACION EXITOSA: Codigo desplegado y confirmado [Hash: ${newHash}] ===`);
    process.exit(0);
  } catch (err: any) {
    console.error('\n[GitSync Fatal Error]: Fallo la ejecucion del ciclo Git:');
    console.error(err?.message || err);
    process.exit(1);
  }
}

runGitSync();
