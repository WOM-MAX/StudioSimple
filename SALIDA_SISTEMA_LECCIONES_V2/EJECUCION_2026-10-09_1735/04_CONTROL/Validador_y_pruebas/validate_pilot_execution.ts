import { LessonSystemValidator } from './validate_system';
import { CLASE_01_CIENCIAS_7B_OA01 } from '../../05_PILOTO/110-7-CIE-OA01/Clase_01/clase01_ciencias_7b_oa01';

function main(): void {
  console.log('');
  console.log('🔬 ═══════════════════════════════════════════════════════════════════');
  console.log('   AUDITORÍA OFICIAL DEL PILOTO DE CIENCIAS NATURALES 7° BÁSICO OA01');
  console.log('   Clase 1: Las Dimensiones de la Sexualidad y el Inicio de la Pubertad');
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('');

  const validator = new LessonSystemValidator();
  const report = validator.validateLesson(CLASE_01_CIENCIAS_7B_OA01, 'Piloto_Ciencias_7B_OA01_Clase01');

  console.log(`📋 Lección: ${CLASE_01_CIENCIAS_7B_OA01.id}`);
  console.log(`📚 Fuente: ${CLASE_01_CIENCIAS_7B_OA01.officialSource.document} (Págs. ${CLASE_01_CIENCIAS_7B_OA01.officialSource.pages})`);
  console.log(`🏛️  Gobernanza: Estado ${CLASE_01_CIENCIAS_7B_OA01.governanceStatus}`);
  console.log(`🔢 Reglas Computadas del Catálogo: ${report.totalCatalogRules}`);
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

  console.log('═══════════════════════════════════════════════════════════════════');
  if (report.isApproved) {
    console.log('🎉 RESULTADO FORMAL: APTO PARA REVISIÓN DE WALTER');
    console.log('   (0 críticos, 0 mayores, hasta 3 menores aceptados)');
    console.log('═══════════════════════════════════════════════════════════════════');
    console.log('');
    process.exit(0);
  } else {
    console.error('❌ RESULTADO FORMAL: NO APTO');
    console.log('═══════════════════════════════════════════════════════════════════');
    console.log('');
    process.exit(1);
  }
}

main();
