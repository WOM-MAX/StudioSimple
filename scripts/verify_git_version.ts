/**
 * scripts/verify_git_version.ts
 * Verificador autonomo de paridad entre la version local (PC) y remota (GitHub).
 * Cumple con la regla obligatoria al comenzar el trabajo en EstudioSimple.
 *
 * Codigos de salida:
 *  0: Sincronizacion exacta (PC == GitHub, arbol limpio).
 *  1: Desalineacion detectada (PC != GitHub o cambios locales no confirmados).
 *  2: Error de conectividad o configuracion de Git.
 */
import { execSync } from 'child_process';

interface GitStatusResult {
  branch: string;
  trackingBranch: string;
  localHash: string;
  remoteHash: string;
  ahead: number;
  behind: number;
  hasUncommittedChanges: boolean;
  uncommittedFiles: string[];
  isSynchronized: boolean;
  stateDescription: string;
}

function getGitStatus(): GitStatusResult {
  try {
    // 1. Obtener rama actual
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();

    // 2. Traer novedades remotas sin alterar working tree
    try {
      execSync('git fetch origin', { stdio: 'pipe' });
    } catch {
      // Continuar si fetch remoto tiene advertencias menores pero registrar estado
    }

    // 3. Obtener tracking branch
    let trackingBranch = '';
    try {
      trackingBranch = execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { encoding: 'utf8' }).trim();
    } catch {
      trackingBranch = `origin/${branch}`;
    }

    // 4. Hashes de commit
    const localHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    let remoteHash = 'DESCONOCIDO';
    try {
      remoteHash = execSync(`git rev-parse --short ${trackingBranch}`, { encoding: 'utf8' }).trim();
    } catch {
      remoteHash = 'NO_EXISTE_EN_ORIGIN';
    }

    // 5. Comparar conteo de commits
    let ahead = 0;
    let behind = 0;
    if (remoteHash !== 'NO_EXISTE_EN_ORIGIN' && remoteHash !== 'DESCONOCIDO') {
      try {
        const counts = execSync(`git rev-list --left-right --count HEAD...${trackingBranch}`, { encoding: 'utf8' }).trim();
        const parts = counts.split(/\s+/);
        ahead = parseInt(parts[0], 10) || 0;
        behind = parseInt(parts[1], 10) || 0;
      } catch {
        // Fallback
      }
    }

    // 6. Cambios en working tree
    const porcelain = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
    const uncommittedFiles = porcelain ? porcelain.split('\n').filter(Boolean) : [];
    const hasUncommittedChanges = uncommittedFiles.length > 0;

    // 7. Evaluar sincronizacion
    const isSynchronized = ahead === 0 && behind === 0 && !hasUncommittedChanges && localHash === remoteHash;

    let stateDescription = '';
    if (isSynchronized) {
      stateDescription = 'SINCRONIZADO: PC y GitHub se encuentran exactamente en la misma version.';
    } else if (ahead > 0 && behind === 0) {
      stateDescription = `PC ADELANTADO: El PC local tiene ${ahead} commit(s) no subidos a GitHub.`;
    } else if (behind > 0 && ahead === 0) {
      stateDescription = `GITHUB ADELANTADO: GitHub tiene ${behind} commit(s) mas recientes que el PC.`;
    } else if (ahead > 0 && behind > 0) {
      stateDescription = `DIVERGENCIA: PC (${ahead} commits) y GitHub (${behind} commits) han divergido.`;
    } else if (hasUncommittedChanges) {
      stateDescription = `CAMBIOS LOCALES PENDIENTES: Existen ${uncommittedFiles.length} archivo(s) sin confirmar en el PC.`;
    } else {
      stateDescription = 'DESALINEACION GENERAL: Los hashes de version no coinciden.';
    }

    return {
      branch,
      trackingBranch,
      localHash,
      remoteHash,
      ahead,
      behind,
      hasUncommittedChanges,
      uncommittedFiles,
      isSynchronized,
      stateDescription
    };
  } catch (err: any) {
    console.error('[Error de Verificacion Git]:', err?.message || err);
    process.exit(2);
  }
}

function main() {
  const status = getGitStatus();

  console.log('================================================================');
  console.log('🔍 VERIFICACION DE PARIDAD DE VERSIONES: PC vs GITHUB');
  console.log('================================================================\n');

  console.log(`- Rama activa:          ${status.branch}`);
  console.log(`- Rama remota rastreada: ${status.trackingBranch}`);
  console.log(`- Hash local (PC):      ${status.localHash}`);
  console.log(`- Hash remoto (GitHub): ${status.remoteHash}`);
  console.log(`- Commits por subir:    ${status.ahead}`);
  console.log(`- Commits por bajar:    ${status.behind}`);
  console.log(`- Cambios sin commit:   ${status.hasUncommittedChanges ? `${status.uncommittedFiles.length} archivo(s)` : 'Ninguno (limpio)'}`);
  console.log(`- Diagnostico:          ${status.stateDescription}\n`);

  if (status.isSynchronized) {
    console.log('================================================================');
    console.log('✅ ESTADO: 100% SINCRONIZADO — MISMA VERSION EN PC Y GITHUB');
    console.log('   Puedes comenzar el trabajo de la sesion con total seguridad.');
    console.log('================================================================\n');
    process.exit(0);
  }

  console.log('================================================================');
  console.log('⚠️  ALERTA DE DESALINEACION: PC Y GITHUB NO TIENEN LA MISMA VERSION');
  console.log('================================================================\n');

  if (status.hasUncommittedChanges) {
    console.log('Archivos locales pendientes en PC:');
    status.uncommittedFiles.slice(0, 10).forEach(f => console.log(`  ${f}`));
    if (status.uncommittedFiles.length > 10) {
      console.log(`  ... y ${status.uncommittedFiles.length - 10} archivos mas.`);
    }
    console.log('');
  }

  console.log('----------------------------------------------------------------');
  console.log('📋 PROMPT AUTONOMO: OPCION 1 — ACTUALIZAR PC DESDE GITHUB (PULL)');
  console.log('   (Usar si GitHub tiene la version mas reciente o de produccion)');
  console.log('----------------------------------------------------------------\n');
  console.log(`\`\`\`text
/goal Sincronizar el PC con la version de GitHub trayendo los ultimos cambios de la rama ${status.branch} de forma 100% autonoma.

DIRECTIVAS DE AUTONOMIA:
1. Ejecutar 'git fetch origin' y comprobar si hay cambios locales que proteger.
2. Si existen cambios locales sin commit, hacer 'git stash' seguro para no perder trabajo.
3. Ejecutar 'git pull origin ${status.branch}' para actualizar el PC con la version de GitHub.
4. Si se uso stash, aplicar 'git stash pop' y resolver conflictos preservando la integridad del codigo.
5. Ejecutar suites de certificacion: npx tsx scripts/audit_structural_rules.ts y npm run build --prefix "Web Studio Simple".
6. Informar el hash final sincronizado sin preguntas intermedias.
Haz todo con total autonomía.
\`\`\`\n`);

  console.log('----------------------------------------------------------------');
  console.log('📋 PROMPT AUTONOMO: OPCION 2 — ACTUALIZAR GITHUB DESDE PC (PUSH)');
  console.log('   (Usar si el trabajo relevante fue realizado en el PC local)');
  console.log('----------------------------------------------------------------\n');
  console.log(`\`\`\`text
/goal Sincronizar GitHub con la version local del PC subiendo los cambios de la rama ${status.branch} de forma 100% autonoma.

DIRECTIVAS DE AUTONOMIA:
1. Comprobar suite tecnica: npx tsx scripts/audit_structural_rules.ts y npx tsx scripts/test_canonical_auditor.ts (deben dar 100% PASS).
2. Compilar Web Studio Simple: npm run build --prefix "Web Studio Simple" (codigo de salida 0).
3. Ejecutar sincronizacion atomica con mensaje convencional:
   npx tsx scripts/git_sync.ts "feat(sync): actualizacion integral de repositorio local a GitHub [${status.localHash}]"
4. Verificar con 'git status' que el arbol de trabajo quede limpio y el push confirmado en origin/${status.branch}.
5. Entregar informe de hash remoto alcanzado sin pausas intermedias.
Haz todo con total autonomía.
\`\`\`\n`);

  if (status.ahead > 0 && status.behind > 0) {
    console.log('----------------------------------------------------------------');
    console.log('📋 PROMPT AUTONOMO: OPCION 3 — RECONCILIACION BIDIRECCIONAL (REBASE/MERGE)');
    console.log('   (Usar cuando ambas ramas tienen commits diferentes que fusionar)');
    console.log('----------------------------------------------------------------\n');
    console.log(`\`\`\`text
/goal Reconciliar y fusionar bidireccionalmente las versiones divergentes de PC y GitHub en la rama ${status.branch} con total autonomia.

DIRECTIVAS DE AUTONOMIA:
1. Ejecutar 'git pull --rebase origin ${status.branch}' para alinear los commits locales sobre los remotos.
2. En caso de conflictos, resolver priorizando la coherencia estructural y los planes maestros vigentes.
3. Certificar compilacion limpia: npm run build --prefix "Web Studio Simple".
4. Enviar version reconciliada a GitHub: git push origin ${status.branch}.
5. Confirmar paridad final exacta de hashes en ambos extremos.
Haz todo con total autonomía.
\`\`\`\n`);
  }

  process.exit(1);
}

main();

