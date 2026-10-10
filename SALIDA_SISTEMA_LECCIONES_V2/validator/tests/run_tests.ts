/**
 * run_tests.ts — Suite de pruebas de validación con fixtures reales
 */

import { LessonSystemValidator } from '../validate_system_v2';
import { FIXTURE_VALIDO } from '../fixtures/fixture_valido';
import {
  FIXTURE_CAMPOS_PROTEGIDOS_MUTADOS,
  FIXTURE_ETAPAS_INCOMPLETAS,
  FIXTURE_VIDEOS_INCORRECTOS,
  FIXTURE_MINIQUIZ_INCORRECTO,
  FIXTURE_SLIDE_SIN_ANTI_TEXT
} from '../fixtures/fixtures_negativos';

function runTestSuite(): void {
  console.log('');
  console.log('🧪 ═══════════════════════════════════════════════════════════════════');
  console.log('   SUITE DE PRUEBAS DEL VALIDADOR CON FIXTURES DE ESTRUCTURA REAL');
  console.log('   Sistema Global de Lecciones EstudioSimple v2.0');
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('');

  const validator = new LessonSystemValidator();
  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, detail?: string): void {
    totalTests++;
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`);
      if (detail) {
        console.error(`     └─ Detalle: ${detail}`);
      }
    }
  }

  // 1. Prueba de Catálogo y Conteo Dinámico de Reglas
  console.log('🔹 1. Verificación del Catálogo Dinámico');
  const count = validator.getRuleCount();
  assert(count === 47, 'El catálogo debe computar dinámicamente exactamente 47 reglas activas', `Obtenido: ${count}`);
  const ruleCie01 = validator.getRule('CIE-01');
  assert(ruleCie01 !== undefined && ruleCie01.severity === 'critico', 'La regla CIE-01 existe y tiene severidad crítica derivada del catálogo');

  // 2. Prueba de Rechazo de Severidad Incompatible
  console.log('');
  console.log('🔹 2. Verificación de Derivación Estricta de Severidades');
  let rejectedIncompatible = false;
  try {
    // Intentar asignar severidad 'menor' a la regla CIE-01 (que es 'critico')
    validator.createFinding('CIE-01', 'Mensaje de prueba', 'etapa4', 'slide', 'menor');
  } catch (err) {
    rejectedIncompatible = true;
  }
  assert(rejectedIncompatible, 'El validador rechaza una severidad incompatible con la prescrita en el catálogo');

  // 3. Prueba Positiva: Fixture Válido Completo (8 etapas, 7+7 slides, miniquiz 3 preguntas)
  console.log('');
  console.log('🔹 3. Prueba Positiva: Fixture de Lección 100% Conforme');
  const reportValido = validator.validateLesson(FIXTURE_VALIDO, 'Fixture_Valido_Ciencias_7B');
  assert(reportValido.isApproved === true, 'El fixture válido es aprobado con isApproved === true');
  assert(reportValido.summary.critico === 0, 'El fixture válido tiene 0 errores críticos');
  assert(reportValido.summary.mayor === 0, 'El fixture válido tiene 0 errores mayores');
  assert(reportValido.summary.menor === 0, 'El fixture válido tiene 0 errores menores');

  // 4. Prueba Negativa: Campos Protegidos Mutados
  console.log('');
  console.log('🔹 4. Prueba Negativa: Detección de Campos Protegidos Mutados / Inyectados');
  const findingsCampos = validator.validateProtectedFields(FIXTURE_CAMPOS_PROTEGIDOS_MUTADOS);
  const detectedMissing = findingsCampos.some((f) => f.message.includes("subobjective"));
  const detectedInjected = findingsCampos.some((f) => f.message.includes("campoInyectadoNoAutorizado"));
  assert(detectedMissing, 'Detecta el campo protegido obligatorio eliminado (subobjective)');
  assert(detectedInjected, 'Detecta el campo no autorizado agregado (campoInyectadoNoAutorizado)');

  // 5. Prueba Negativa: Etapas Incompletas (Falta Etapa 3 Recorrido)
  console.log('');
  console.log('🔹 5. Prueba Negativa: Detección de Etapa Faltante (Recorrido)');
  const reportEtapas = validator.validateLesson(FIXTURE_ETAPAS_INCOMPLETAS, 'Fixture_Error_Etapas');
  assert(reportEtapas.isApproved === false, 'El fixture con etapa faltante no es aprobado');
  const detectedMissingStage = reportEtapas.findings.some((f) => f.message.includes('etapa3_recorrido'));
  assert(detectedMissingStage, 'Detecta específicamente la ausencia de etapa3_recorrido');

  // 6. Prueba Negativa: Conteo de Diapositivas Incorrecto (6 en vez de 7)
  console.log('');
  console.log('🔹 6. Prueba Negativa: Detección de Diapositivas != 7 en Videos (7B-001)');
  const reportVideos = validator.validateLesson(FIXTURE_VIDEOS_INCORRECTOS, 'Fixture_Error_Videos');
  assert(reportVideos.isApproved === false, 'El fixture con 6 slides en video motivacional no es aprobado');
  const detectedVideoCount = reportVideos.findings.some((f) => f.ruleId === '7B-001' && f.message.includes('contiene 6'));
  assert(detectedVideoCount, 'Detecta que el video motivacional contiene 6 diapositivas en vez de 7');

  // 7. Prueba Negativa: Miniquiz Erróneo (2 preguntas y sin opción D)
  console.log('');
  console.log('🔹 7. Prueba Negativa: Detección de Miniquiz No Conforme (UNI-006, 7B-003)');
  const reportQuiz = validator.validateLesson(FIXTURE_MINIQUIZ_INCORRECTO, 'Fixture_Error_Quiz');
  assert(reportQuiz.isApproved === false, 'El fixture con miniquiz incompleto no es aprobado');
  const detectedQuizCount = reportQuiz.findings.some((f) => f.ruleId === 'UNI-006' && f.message.includes('contiene 2'));
  const detectedMissingD = reportQuiz.findings.some((f) => f.ruleId === '7B-003' && f.message.includes('4 opciones'));
  assert(detectedQuizCount, 'Detecta que el miniquiz tiene 2 preguntas en lugar de 3');
  assert(detectedMissingD, 'Detecta que la pregunta carece de la opción D requerida');

  // 8. Prueba Negativa: Lámina sin Cláusula Anti-Texto en Arte IA (UNI-004)
  console.log('');
  console.log('🔹 8. Prueba Negativa: Detección de Prompt sin Blindaje Anti-Texto (UNI-004)');
  const reportAntiText = validator.validateLesson(FIXTURE_SLIDE_SIN_ANTI_TEXT, 'Fixture_Error_AntiText');
  assert(reportAntiText.isApproved === false, 'El fixture con lámina sin cláusula anti-texto no es aprobado');
  const detectedAntiText = reportAntiText.findings.some((f) => f.ruleId === 'UNI-004');
  assert(detectedAntiText, "Detecta lámina sin cláusula 'No text drawn by AI'");

  // Resumen Final de la Suite
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(`📊 RESULTADO DE LA SUITE: ${passedTests} de ${totalTests} pruebas superadas (${((passedTests / totalTests) * 100).toFixed(1)}%)`);
  if (passedTests === totalTests) {
    console.log('🎉 ¡TODAS LAS PRUEBAS UNITARIAS Y DE INTEGRACIÓN PASARON EXITOSAMENTE!');
  } else {
    console.error('⚠️  HAY PRUEBAS FALLIDAS EN LA SUITE.');
    process.exit(1);
  }
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('');
}

runTestSuite();
