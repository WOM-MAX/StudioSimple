import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const filesToInclude = [
  '.agents/skills/estudiosimple-lecciones/rules/reglas_universales.md',
  '.agents/skills/estudiosimple-lecciones/profiles/cursos/perfil_7_basico.md',
  '.agents/skills/estudiosimple-lecciones/profiles/asignaturas/matematica.md',
  '.agents/skills/estudiosimple-lecciones/profiles/asignaturas/lengua_literatura.md',
  '.agents/skills/estudiosimple-lecciones/profiles/asignaturas/ingles.md',
  '.agents/skills/estudiosimple-lecciones/profiles/asignaturas/ciencias_naturales.md',
  '.agents/skills/estudiosimple-lecciones/profiles/asignaturas/historia_geografia.md',
  '.agents/skills/estudiosimple-lecciones/profiles/anexos/matematica_7b_oa04.md',
  '.agents/skills/estudiosimple-lecciones/profiles/anexos/ciencias_7b_oa01.md',
  '.agents/skills/estudiosimple-lecciones/profiles/anexos/historia_7b_oa02.md',
  '.agents/skills/estudiosimple-lecciones/SKILL.md',
  '.agents/skills/auditor_coherencia_estudiosimple/rules_catalog.json',
  '.agents/skills/auditor_coherencia_estudiosimple/SKILL.md',
  'scripts/validate_lesson_system.ts',
  'scripts/verify_protection_evidence.ts',
  'scripts/generate_implementation_docx_report.ts',
  'docs/Informe_Implementacion_Sistema_Lecciones_7B_v1_2026-10-09_11-00.docx',
  'docs/informe_implementacion_sistema_lecciones_7b_v1_2026-10-09_11-00.md',
  'memoria/2026-10-09_11-00_Implementacion_Sistema_Lecciones_7B_v1.md'
];

const zipOutput = path.resolve('docs', 'Implementacion_Sistema_Lecciones_7B_v1_2026-10-09.zip');
const tempStagingDir = path.resolve('temp_zip_staging');

if (fs.existsSync(tempStagingDir)) {
  fs.rmSync(tempStagingDir, { recursive: true, force: true });
}
fs.mkdirSync(tempStagingDir, { recursive: true });

console.log('Copiando archivos al staging conservando rutas relativas:');
for (const relPath of filesToInclude) {
  const src = path.resolve(relPath);
  const dest = path.join(tempStagingDir, relPath);
  if (!fs.existsSync(src)) {
    console.error(`❌ No existe el archivo: ${src}`);
    continue;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`  • ${relPath}`);
}

if (fs.existsSync(zipOutput)) {
  fs.unlinkSync(zipOutput);
}

// Comprimir usando PowerShell
const cmd = `powershell -Command "Compress-Archive -Path '${tempStagingDir}/*' -DestinationPath '${zipOutput}' -Force"`;
execSync(cmd, { stdio: 'inherit' });

// Limpiar staging
fs.rmSync(tempStagingDir, { recursive: true, force: true });

const stats = fs.statSync(zipOutput);
console.log(`\n✅ ZIP de implementación creado con éxito:`);
console.log(`   Ruta: ${zipOutput}`);
console.log(`   Tamaño: ${(stats.size / 1024).toFixed(1)} KB`);
