import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface ManifestCheck {
  subject: string;
  oa: string;
  manifestPath: string;
  status: string;
  etapaRevision?: string;
  lastUpdated?: string;
  classesCount: number;
  filesInFolder: string[];
}

export function verifyProtection(): { checks: ManifestCheck[]; gitStatusLecciones: string; isPristine: boolean } {
  const baseDir = 'LECCIONES/110-7';
  const checks: ManifestCheck[] = [];

  if (fs.existsSync(baseDir)) {
    const subjects = fs.readdirSync(baseDir);
    for (const sub of subjects) {
      const subPath = path.join(baseDir, sub);
      if (!fs.statSync(subPath).isDirectory()) continue;
      const oas = fs.readdirSync(subPath);
      for (const oa of oas) {
        const oaPath = path.join(subPath, oa);
        if (!fs.statSync(oaPath).isDirectory()) continue;
        const manifestPath = path.join(oaPath, 'manifest.json');
        const files = fs.readdirSync(oaPath);
        if (fs.existsSync(manifestPath)) {
          const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
          checks.push({
            subject: sub,
            oa: oa,
            manifestPath: manifestPath.replace(/\\/g, '/'),
            status: manifest.status || 'SIN_STATUS',
            etapaRevision: manifest.etapa_revision || manifest.fase || 'N/A',
            lastUpdated: manifest.updated_at || manifest.fecha_generacion || 'N/A',
            classesCount: manifest.classes ? Object.keys(manifest.classes).length : (manifest.lecciones_totales || 6),
            filesInFolder: files
          });
        }
      }
    }
  }

  const gitStatusLecciones = execSync('git status --porcelain LECCIONES/', { encoding: 'utf8' }).trim();
  const isPristine = gitStatusLecciones.length === 0;

  return { checks, gitStatusLecciones, isPristine };
}

if (process.argv[1] && process.argv[1].endsWith('verify_protection_evidence.ts')) {
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('  🛡️ EVIDENCIA EMPÍRICA DE PROTECCIÓN DE LECCIONES EXISTENTES');
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  const result = verifyProtection();

  console.log(`Estado Git en directorio LECCIONES/: ${result.isPristine ? '100% LIMPIO (0 MODIFICACIONES)' : result.gitStatusLecciones}`);
  console.log(`¿Directorio LECCIONES/ intacto byte a byte según Git?: ${result.isPristine ? 'SÍ ✅' : 'NO ❌'}\n`);

  console.log('Paquetes Curriculares Existentes y Estados de Aprobación:');
  result.checks.forEach(c => {
    console.log(`  • ${c.subject} / ${c.oa}:`);
    console.log(`      Status oficial: ${c.status}`);
    console.log(`      Etapa revisión: ${c.etapaRevision}`);
    console.log(`      Clases registradas: ${c.classesCount}`);
    console.log(`      Archivos presentes: ${c.filesInFolder.length} (${c.filesInFolder.filter(f => f.endsWith('.docx') || f.endsWith('.json') || f.endsWith('.txt')).join(', ')})`);
  });

  console.log('\n═══════════════════════════════════════════════════════════════════════');
}
