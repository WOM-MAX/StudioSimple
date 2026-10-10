/**
 * validate_pilot.ts — Validador del Piloto Real de Ciencias Naturales 7° Básico OA01 Clase 1
 */

import fs from 'fs';
import path from 'path';
import { LessonSystemValidator } from './validate_system_v2';
import { CLASE_01_CIENCIAS_7B_OA01 } from '../piloto_ciencias_7b_oa01_c1/clase01_ciencias_7b_oa01';

async function main(): Promise<void> {
  console.log('');
  console.log('🔬 ═══════════════════════════════════════════════════════════════════');
  console.log('   VALIDACIÓN OFICIAL DEL PILOTO DE CIENCIAS NATURALES 7° BÁSICO OA01');
  console.log('   Sistema Global de Lecciones EstudioSimple v2.0');
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('');

  const validator = new LessonSystemValidator();
  const report = validator.validateLesson(CLASE_01_CIENCIAS_7B_OA01, 'Piloto_Ciencias_7B_OA01_Clase01');

  console.log(`📋 Objetivo Validado: ${CLASE_01_CIENCIAS_7B_OA01.subobjective}`);
  console.log(`📚 Fuente Oficial: ${CLASE_01_CIENCIAS_7B_OA01.officialSource.document} (Págs. ${CLASE_01_CIENCIAS_7B_OA01.officialSource.pages})`);
  console.log(`🏛️  Gobernanza: Estado ${CLASE_01_CIENCIAS_7B_OA01.governanceStatus}`);
  console.log(`🔢 Reglas del Catálogo Computadas: ${report.totalCatalogRules}`);
  console.log('');
  console.log('📊 RESUMEN DE HALLAZGOS:');
  console.log(`  • Hallazgos Críticos: ${report.summary.critico}`);
  console.log(`  • Hallazgos Mayores:  ${report.summary.mayor}`);
  console.log(`  • Hallazgos Menores:  ${report.summary.menor}`);
  console.log('');

  if (report.findings.length > 0) {
    console.log('⚠️  DETALLE DE OBSERVACIONES:');
    for (const f of report.findings) {
      console.log(`   [${f.severity.toUpperCase()}] ${f.ruleId} - ${f.ruleName}: ${f.message}`);
    }
    console.log('');
  }

  // Guardar reporte en docs/
  const outPath = path.resolve(__dirname, '..', 'docs', 'resultado_validacion_piloto.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`💾 Reporte de auditoría guardado en: ${outPath}`);

  console.log('═══════════════════════════════════════════════════════════════════');
  if (report.isApproved) {
    console.log('🎉 ¡EL PILOTO DE CIENCIAS 7° BÁSICO OA01 HA SIDO VALIDADO CON ÉXITO!');
    console.log('   Cumple con 0 errores críticos, 0 errores mayores y está listo para revisión.');
    console.log('═══════════════════════════════════════════════════════════════════');
    console.log('');
    process.exit(0);
  } else {
    console.error('❌ EL PILOTO NO CUMPLE CON LOS CRITERIOS DE APROBACIÓN.');
    console.log('═══════════════════════════════════════════════════════════════════');
    console.log('');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Error fatal al ejecutar validación del piloto:', err);
  process.exit(1);
});
