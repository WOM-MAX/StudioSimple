/**
 * validate_lesson_system.ts
 * 
 * Validador determinista del Sistema de Lecciones EstudioSimple v1.0.
 * Implementa la matriz de severidades, tolerancias, controles computables y conceptuales,
 * y ejecuta la suite de 8 casos de prueba obligatorios.
 * 
 * Uso: npx tsx scripts/validate_lesson_system.ts
 */

import fs from 'fs';
import path from 'path';

export type Severity = 'critico' | 'mayor' | 'menor' | 'preferencia' | 'pendiente_de_fuente';
export type AuditStatus = 'CONFORME' | 'CONFORME CON MENORES' | 'NO CONFORME' | 'PENDIENTE DE FUENTE';

export interface AuditFinding {
  ruleId: string;
  ruleName: string;
  severity: Severity;
  location: string;
  message: string;
  expected: string;
  actual: string;
}

export interface LessonAuditResult {
  lessonId: string;
  status: AuditStatus;
  criticos: number;
  mayores: number;
  menores: number;
  preferencias: number;
  pendientesFuente: number;
  findings: AuditFinding[];
}

export interface RuleDefinition {
  id: string;
  name: string;
  scope: string;
  severity: Severity;
  evidence: string;
  validation_method: 'computable' | 'conceptual';
  description: string;
}

export interface RuleCatalog {
  version: string;
  rules: RuleDefinition[];
}

/**
 * Motor de Auditoría según Sistema de Lecciones v1.0
 */
export class LessonSystemValidator {
  private catalog: RuleCatalog;

  constructor(catalogPath?: string) {
    const defaultPath = path.resolve(
      import.meta.dirname ?? __dirname,
      '..',
      '.agents',
      'skills',
      'auditor_coherencia_estudiosimple',
      'rules_catalog.json'
    );
    const resolvedPath = catalogPath || defaultPath;
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`No se encontró el catálogo de reglas en: ${resolvedPath}`);
    }
    this.catalog = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
  }

  public getRule(ruleId: string): RuleDefinition | undefined {
    return this.catalog.rules.find(r => r.id === ruleId);
  }

  public evaluateFindings(lessonId: string, findings: AuditFinding[]): LessonAuditResult {
    let criticos = 0;
    let mayores = 0;
    let menores = 0;
    let preferencias = 0;
    let pendientesFuente = 0;

    for (const f of findings) {
      if (f.severity === 'critico') criticos++;
      else if (f.severity === 'mayor') mayores++;
      else if (f.severity === 'menor') menores++;
      else if (f.severity === 'preferencia') preferencias++;
      else if (f.severity === 'pendiente_de_fuente') pendientesFuente++;
    }

    let status: AuditStatus = 'CONFORME';

    if (criticos > 0 || mayores > 0 || menores > 3) {
      status = 'NO CONFORME';
    } else if (pendientesFuente > 0) {
      status = 'PENDIENTE DE FUENTE';
    } else if (menores > 0 && menores <= 3) {
      status = 'CONFORME CON MENORES';
    } else {
      status = 'CONFORME';
    }

    return {
      lessonId,
      status,
      criticos,
      mayores,
      menores,
      preferencias,
      pendientesFuente,
      findings
    };
  }

  /**
   * Valida la regla de tipografía en subtítulos (DEC-03):
   * 36 pt para Matemática, 48 pt para las demás asignaturas.
   */
  public validateSubtitleTypography(subject: string, fontSizePt: number, wordsCount: number): AuditFinding | null {
    const isMath = subject.toLowerCase().includes('matem');
    const expectedPt = isMath ? 36 : 48;

    if (wordsCount > 8) {
      return {
        ruleId: '7B-002',
        ruleName: 'Límites de Texto Visible en Láminas (7° Básico)',
        severity: 'menor',
        location: `${subject} / Subtítulo`,
        message: `El subtítulo supera el límite de 8 palabras (${wordsCount} palabras detectadas).`,
        expected: '<= 8 palabras',
        actual: `${wordsCount} palabras`
      };
    }

    if (fontSizePt !== expectedPt) {
      return {
        ruleId: isMath ? 'MAT-02' : '7B-002',
        ruleName: isMath ? 'Excepción Tipográfica Matemática' : 'Tipografía Subtítulo',
        severity: 'mayor',
        location: `${subject} / Subtítulo`,
        message: `Tamaño de subtítulo incorrecto: se esperaba ${expectedPt} pt para ${subject}, pero se encontró ${fontSizePt} pt.`,
        expected: `${expectedPt} pt`,
        actual: `${fontSizePt} pt`
      };
    }

    return null;
  }

  /**
   * Valida el formato de preguntas (DEC-06):
   * Pregunta cerrada exige 4 alternativas (A-D).
   * Pregunta abierta exige rúbrica válida sin forzar alternativas.
   */
  public validateQuestionFormat(
    tipo: 'seleccion_multiple' | 'pregunta_abierta',
    options?: string[],
    rubrica?: string
  ): AuditFinding | null {
    if (tipo === 'seleccion_multiple') {
      const optsCount = options ? options.length : 0;
      if (optsCount !== 4) {
        return {
          ruleId: '7B-003',
          ruleName: 'Reactivos de 4 Alternativas (A-D)',
          severity: 'critico',
          location: 'Evaluación / Selección Múltiple',
          message: `La pregunta de selección múltiple no cuenta con 4 alternativas (encontradas: ${optsCount}).`,
          expected: 'Exactamente 4 alternativas (A, B, C, D)',
          actual: `${optsCount} alternativas`
        };
      }
    } else if (tipo === 'pregunta_abierta') {
      if (!rubrica || rubrica.trim().length === 0) {
        return {
          ruleId: 'UNI-006',
          ruleName: 'Rúbrica de Respuesta Abierta',
          severity: 'mayor',
          location: 'Evaluación / Pregunta Abierta',
          message: 'La pregunta abierta no incluye una rúbrica de criterios de respuesta esperada.',
          expected: 'Rúbrica con criterios pedagógicos de respuestas válidas',
          actual: 'Rúbrica vacía o ausente'
        };
      }
      // DEC-06: NO debe exigir alternativas en preguntas abiertas
    }

    return null;
  }

  /**
   * Comprueba la protección de campos contra regresiones
   */
  public verifyProtectedFields(
    originalFields: Record<string, string>,
    modifiedFields: Record<string, string>,
    allowedFieldKeys: string[]
  ): AuditFinding[] {
    const findings: AuditFinding[] = [];

    for (const [key, origVal] of Object.entries(originalFields)) {
      if (allowedFieldKeys.includes(key)) {
        continue; // Campo autorizado a cambiar
      }

      const modVal = modifiedFields[key];
      if (origVal !== modVal) {
        findings.push({
          ruleId: 'UNI-016',
          ruleName: 'Protección de Campos Pedagógicos contra Regresiones',
          severity: 'critico',
          location: `Campo protegido: ${key}`,
          message: `El campo protegido '${key}' fue modificado sin formar parte del conjunto autorizado.`,
          expected: origVal,
          actual: modVal !== undefined ? modVal : '<campo eliminado>'
        });
      }
    }

    return findings;
  }
}

/**
 * Suite de 8 Casos de Prueba Deterministas
 */
export function runTestSuite(): { passed: number; total: number; results: Array<{ name: string; ok: boolean; detail: string }> } {
  const validator = new LessonSystemValidator();
  const testResults: Array<{ name: string; ok: boolean; detail: string }> = [];

  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('  🧪 SUITE DE PRUEBAS DEL SISTEMA DE LECCIONES ESTUDIOSIMPLE V1.0');
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  // Caso 1: Paquete válido (0 críticos, 0 mayores, 0 menores) -> CONFORME
  {
    const res = validator.evaluateFindings('Caso1_Valido', []);
    const ok = res.status === 'CONFORME';
    testResults.push({
      name: 'Caso 1: Paquete Válido',
      ok,
      detail: `Estado obtenido: ${res.status} (esperado: CONFORME)`
    });
  }

  // Caso 2: Cálculo erróneo (MAT-01) -> NO CONFORME (Crítico)
  {
    const findings: AuditFinding[] = [{
      ruleId: 'MAT-01',
      ruleName: 'Recálculo Aritmético',
      severity: 'critico',
      location: 'Clase 4 / Ejercicio 2',
      message: 'Discrepancia aritmética: 15% de 80.000 calculado como 10.000 en lugar de 12.000.',
      expected: '12.000',
      actual: '10.000'
    }];
    const res = validator.evaluateFindings('Caso2_CalculoErroneo', findings);
    const ok = res.status === 'NO CONFORME' && res.criticos === 1;
    testResults.push({
      name: 'Caso 2: Cálculo Erróneo (MAT-01)',
      ok,
      detail: `Estado obtenido: ${res.status}, Críticos: ${res.criticos} (esperado: NO CONFORME con 1 crítico)`
    });
  }

  // Caso 3: Fuente ausente (UNI-014) -> PENDIENTE DE FUENTE
  {
    const findings: AuditFinding[] = [{
      ruleId: 'UNI-014',
      ruleName: 'Honestidad Epistemológica',
      severity: 'pendiente_de_fuente',
      location: 'Documentación Curricular',
      message: 'Texto escolar Edición SM pág. 118 no disponible en el disco local para verificar cita literal.',
      expected: 'Texto escolar disponible en local',
      actual: 'Archivo no presente'
    }];
    const res = validator.evaluateFindings('Caso3_FuenteAusente', findings);
    const ok = res.status === 'PENDIENTE DE FUENTE' && res.pendientesFuente === 1;
    testResults.push({
      name: 'Caso 3: Fuente Curricular Ausente',
      ok,
      detail: `Estado obtenido: ${res.status}, Pendientes de fuente: ${res.pendientesFuente} (esperado: PENDIENTE DE FUENTE)`
    });
  }

  // Caso 4: Excepción Matemática 36 pt (DEC-03) -> CONFORME
  {
    const mathFinding = validator.validateSubtitleTypography('Matemática', 36, 6);
    const scienceFinding = validator.validateSubtitleTypography('Ciencias Naturales', 48, 7);
    const ok = mathFinding === null && scienceFinding === null;
    testResults.push({
      name: 'Caso 4: Excepción Matemática 36 pt vs 48 pt en Otras Asignaturas',
      ok,
      detail: `36 pt en Matemática: ${mathFinding ? 'FALLÓ' : 'OK'}, 48 pt en Ciencias: ${scienceFinding ? 'FALLÓ' : 'OK'}`
    });
  }

  // Caso 5: Pregunta abierta sin alternativas (DEC-06) -> CONFORME
  {
    const openFinding = validator.validateQuestionFormat('pregunta_abierta', undefined, 'Criterio: El estudiante argumenta con al menos 2 evidencias textuales.');
    const ok = openFinding === null;
    testResults.push({
      name: 'Caso 5: Pregunta Abierta con Rúbrica Válida (sin 4 alternativas forzadas)',
      ok,
      detail: `Evaluación de pregunta abierta: ${openFinding ? 'FALLÓ' : 'CONFORME (acepta rúbrica sin forzar A-D)'}`
    });
  }

  // Caso 6: Tres menores documentados -> CONFORME CON MENORES
  {
    const findings: AuditFinding[] = [
      { ruleId: '7B-002', ruleName: 'Texto Visible', severity: 'menor', location: 'G1', message: 'Subtítulo con 8 palabras', expected: '<= 8 palabras', actual: '8 palabras' },
      { ruleId: 'UNI-002', ruleName: 'Locución', severity: 'menor', location: 'G3', message: 'Puntuación con coma en pausa oratoria', expected: 'Punto y coma', actual: 'Coma' },
      { ruleId: 'LYL-05', ruleName: 'Revisión Lingüística', severity: 'menor', location: 'Paso 6', message: 'Tilde en monosílabo contextual', expected: 'Tilde diacrítica', actual: 'Sin tilde' },
    ];
    const res = validator.evaluateFindings('Caso6_TresMenores', findings);
    const ok = res.status === 'CONFORME CON MENORES' && res.menores === 3;
    testResults.push({
      name: 'Caso 6: Exactamente Tres Menores Documentados (Dentro de Tolerancia)',
      ok,
      detail: `Estado obtenido: ${res.status}, Menores: ${res.menores} (esperado: CONFORME CON MENORES)`
    });
  }

  // Caso 7: Cuatro menores -> NO CONFORME
  {
    const findings: AuditFinding[] = [
      { ruleId: '7B-002', ruleName: 'Texto Visible', severity: 'menor', location: 'G1', message: 'Subtítulo con 8 palabras', expected: '<= 8 palabras', actual: '8 palabras' },
      { ruleId: 'UNI-002', ruleName: 'Locución', severity: 'menor', location: 'G3', message: 'Puntuación menor', expected: 'Punto y coma', actual: 'Coma' },
      { ruleId: 'LYL-05', ruleName: 'Revisión Lingüística', severity: 'menor', location: 'Paso 6', message: 'Tilde menor', expected: 'Tilde diacrítica', actual: 'Sin tilde' },
      { ruleId: '7B-002', ruleName: 'Texto Visible', severity: 'menor', location: 'E2', message: 'Detalle de formato tipográfico', expected: 'Interlineado estándar', actual: 'Espaciado doble' }
    ];
    const res = validator.evaluateFindings('Caso7_CuatroMenores', findings);
    const ok = res.status === 'NO CONFORME' && res.menores === 4;
    testResults.push({
      name: 'Caso 7: Cuatro Menores (Supera Tolerancia Máxima)',
      ok,
      detail: `Estado obtenido: ${res.status}, Menores: ${res.menores} (esperado: NO CONFORME)`
    });
  }

  // Caso 8: Campo protegido modificado -> REGRESIÓN / NO CONFORME
  {
    const orig = {
      'clase1_objetivo': 'Comprender el concepto de porcentaje',
      'clase1_caso1_contexto': 'En una tienda de ropa...',
      'clase1_caso1_pregunta': '¿Cuál es el precio final?',
      'clase1_preguntaSintesis': '¿Qué aprendiste hoy?'
    };
    const mod = {
      'clase1_objetivo': 'Comprender el concepto de porcentaje',
      'clase1_caso1_contexto': 'En una tienda de ropa...',
      'clase1_caso1_pregunta': '¿Cuál es el valor del descuento?', // CAMPO AUTORIZADO
      'clase1_preguntaSintesis': 'Texto modificado sin autorización' // CAMPO PROTEGIDO MUTADO
    };
    const allowed = ['clase1_caso1_pregunta'];
    const regressionFindings = validator.verifyProtectedFields(orig, mod, allowed);
    const res = validator.evaluateFindings('Caso8_CampoProtegido', regressionFindings);
    const ok = res.status === 'NO CONFORME' && regressionFindings.length === 1 && regressionFindings[0].ruleId === 'UNI-016';
    testResults.push({
      name: 'Caso 8: Campo Protegido Modificado Indebidamente (Regresión Detectada)',
      ok,
      detail: `Estado obtenido: ${res.status}, Hallazgos de regresión: ${regressionFindings.length} (esperado: NO CONFORME por UNI-016)`
    });
  }

  // Imprimir resumen
  let passedCount = 0;
  testResults.forEach((t, i) => {
    const symbol = t.ok ? '✅' : '❌';
    console.log(`  ${symbol} [Prueba ${i + 1}/8] ${t.name}`);
    console.log(`     Detalle: ${t.detail}\n`);
    if (t.ok) passedCount++;
  });

  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log(`  📊 RESULTADO TOTAL: ${passedCount} / ${testResults.length} pruebas superadas (${(passedCount / testResults.length * 100).toFixed(0)}%)`);
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  return {
    passed: passedCount,
    total: testResults.length,
    results: testResults
  };
}

if (process.argv[1] && process.argv[1].endsWith('validate_lesson_system.ts')) {
  const result = runTestSuite();
  process.exit(result.passed === result.total ? 0 : 1);
}
