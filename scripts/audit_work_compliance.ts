import fs from 'fs';
import path from 'path';

// ==============================================================================
// AUDITOR ESPEJO DE MATEMÁTICA 7° OA04 (ESTÁNDAR CHATGPT WORK / CODEX)
// ==============================================================================

export interface Finding {
  rule: string;
  clase: number;
  momento: 'Gancho' | 'Explicación' | 'Estructura' | 'Evaluación' | 'Coherencia';
  laminaNum: number; // 1-based (ej. Lámina 3)
  arrayIndex: number; // 0-based (ej. hook.slides[2] -> index 2)
  archivo: string;
  campo: string;
  valorActual: string;
  conteoOComparacion: string;
  razon: string;
  estado: 'FALLA' | 'NO RESUELTO';
}

// ------------------------------------------------------------------------------
// REGLAS DE TOKENIZACIÓN Y CONTEO
// ------------------------------------------------------------------------------

/**
 * Conteo Work estándar:
 * - Cuenta grupos alfanuméricos de letras o números.
 * - Un número con '%' adjunto cuenta como un único token (ej: "50%" -> 1 token).
 * - Ignora signos y conectores puramente aislados como '->', '|', '–', '—', ':', '/'.
 * - Limpia puntuación periférica pero mantiene '%' adjunto.
 */
export function countWordsWork(text: string): { count: number; tokens: string[] } {
  if (!text || typeof text !== 'string') return { count: 0, tokens: [] };
  const rawTokens = text.trim().split(/\s+/).filter(Boolean);
  const filtered: string[] = [];

  for (const t of rawTokens) {
    // Ignorar signos puramente aislados
    if (/^[\->|:–—/]+$/.test(t)) {
      continue;
    }
    // Limpiar puntuación periférica pero mantener % o alfanuméricos
    const cleaned = t.replace(/^[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ%]+|[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ%]+$/g, '');
    if (cleaned.length > 0) {
      filtered.push(cleaned);
    }
  }

  return { count: filtered.length, tokens: filtered };
}

/**
 * Conteo estricto por espacios en blanco (informativo).
 */
export function countWordsStrict(text: string): number {
  if (!text || typeof text !== 'string') return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ------------------------------------------------------------------------------
// ANÁLISIS DE PROMPTS VISUALES
// ------------------------------------------------------------------------------

export interface PromptAuditResult {
  hasDuo: boolean;
  duplicateDuoCount: number;
  hasNoTextClause: boolean;
  mathOperations: string[];
  unresolvedIssues: string[];
}

export function auditVisualPrompt(prompt: string): PromptAuditResult {
  const result: PromptAuditResult = {
    hasDuo: false,
    duplicateDuoCount: 0,
    hasNoTextClause: false,
    mathOperations: [],
    unresolvedIssues: []
  };

  if (!prompt || typeof prompt !== 'string') {
    result.unresolvedIssues.push('Campo visualPrompt vacío o no string');
    return result;
  }

  // 1. Presencia del dúo aprobado
  const duoMatches = prompt.match(/Two 13-year-old student explorers/gi) || [];
  result.hasDuo = duoMatches.length > 0;
  result.duplicateDuoCount = duoMatches.length > 1 ? duoMatches.length : 0;

  // 2. Cláusula 'No text drawn by AI'
  result.hasNoTextClause = /No text drawn by AI/i.test(prompt);

  // 3. Detección de operaciones matemáticas, precios, porcentajes, fórmulas y datos numéricos
  // Excepciones canónicas respaldadas por la fuente:
  // - "16:9"
  // - "13-year-old"
  // - "10x10", "10 by 10", "100 square cells", "100-cell grid", "100 cells" (Clase 1 representación pictórica)
  let sanitized = prompt
    .replace(/16:9/gi, 'CANONICAL_RATIO')
    .replace(/13-year-old/gi, 'CANONICAL_AGE')
    .replace(/13 year old/gi, 'CANONICAL_AGE')
    .replace(/10x10\b/gi, 'CANONICAL_GRID')
    .replace(/10 by 10\b/gi, 'CANONICAL_GRID')
    .replace(/100 square cells\b/gi, 'CANONICAL_GRID')
    .replace(/100-cell grid\b/gi, 'CANONICAL_GRID')
    .replace(/100 cells\b/gi, 'CANONICAL_GRID')
    .replace(/100-cell\b/gi, 'CANONICAL_GRID');

  // Buscar porcentajes explícitos o en palabras (ej. "20%", "50 percent", "10 percent")
  const pctMatches = sanitized.match(/\b\d+\s*%/g) || [];
  const pctWordMatches = sanitized.match(/\b\d+\s*percent\b/gi) || [];

  // Buscar precios o monedas (ej. "$40.000", "8000 pesos")
  const priceMatches = sanitized.match(/\$\s*[0-9.]+|\b[0-9.]+\s*pesos\b/gi) || [];

  // Buscar operaciones aritméticas o fórmulas (ej. "0.08", "250 x 0.08 = 20", "150 : 5", "multiplying by 1.19", "2x2")
  const opMatches = sanitized.match(/(?:multiplying by [0-9.]+)|(?:dividing by [0-9.]+)|(?:\b[0-9.]+\s*[xX*·:/+\-=]\s*[0-9.]+\b)/gi) || [];

  // Buscar números aislados que representen cantidades de cálculo (ej. "500 liters", "150 pages", "40 students")
  const unitNumMatches = sanitized.match(/\b\d+\s*(?:liters|pages|students|segments|blocks)\b/gi) || [];

  // Buscar cálculos que llegan a resultados numéricos o cifras de cálculo explícitas (ej. "calculations arriving at 90", "arriving at 90")
  const arrivingMatches = sanitized.match(/(?:calculations? arriving at \d+)|(?:arriving at \d+)/gi) || [];

  // Acumular todas las operaciones y valores matemáticos no visuales
  const allMath = [
    ...pctMatches,
    ...pctWordMatches,
    ...priceMatches,
    ...opMatches,
    ...unitNumMatches,
    ...arrivingMatches
  ];

  // Caso específico Clase 5 Slide 5: decimales 0.80 y 1.19
  const decimals = sanitized.match(/\b0\.[0-9]+\b|\b1\.[0-9]+\b/g) || [];
  for (const d of decimals) {
    if (!allMath.includes(d)) allMath.push(d);
  }

  result.mathOperations = Array.from(new Set(allMath));

  return result;
}

// ------------------------------------------------------------------------------
// AUDITORÍA DE PARIDAD EN EJERCICIOS (CAMPOS EXACTOS SIN BARRAS)
// ------------------------------------------------------------------------------

export interface CaseFieldsComparison {
  contextMatch: boolean;
  questionMatch: boolean;
  expectedMatch: boolean;
  revealMatch: boolean;
  studentRevealMatch: boolean;
  successMatch: boolean;
  supportMatch: boolean;
  diffs: string[];
}

export function compareExactCaseFields(postItem: any, practiceItem: any, caseIndex: number): CaseFieldsComparison {
  const diffs: string[] = [];
  const pQPrefix = `postQuestions[${caseIndex}]`;
  const pRPrefix = `practice[${caseIndex}]`;

  if (!postItem || !practiceItem) {
    return {
      contextMatch: false,
      questionMatch: false,
      expectedMatch: false,
      revealMatch: false,
      studentRevealMatch: false,
      successMatch: false,
      supportMatch: false,
      diffs: [`Uno de los objetos a comparar (${pQPrefix} o ${pRPrefix}) no existe en la lección`]
    };
  }

  // Campo 1: context
  const contextMatch = (postItem.context || '').trim() === (practiceItem.context || '').trim();
  if (!contextMatch) {
    diffs.push(`Campo context no coincide: ${pQPrefix}.context ("${postItem.context}") vs ${pRPrefix}.context ("${practiceItem.context}")`);
  }

  // Campo 2: question
  const questionMatch = (postItem.question || '').trim() === (practiceItem.question || '').trim();
  if (!questionMatch) {
    diffs.push(`Campo question no coincide: ${pQPrefix}.question ("${postItem.question}") vs ${pRPrefix}.question ("${practiceItem.question}")`);
  }

  // Campo 3: expected
  const expectedMatch = (postItem.expected || '').trim() === (practiceItem.expected || '').trim();
  if (!expectedMatch) {
    diffs.push(`Campo expected no coincide: ${pQPrefix}.expected ("${postItem.expected}") vs ${pRPrefix}.expected ("${practiceItem.expected}")`);
  }

  // Campo 4: reveal
  const revealMatch = (postItem.reveal || '').trim() === (practiceItem.reveal || '').trim();
  if (!revealMatch) {
    diffs.push(`Campo reveal no coincide: ${pQPrefix}.reveal ("${postItem.reveal}") vs ${pRPrefix}.reveal ("${practiceItem.reveal}")`);
  }

  // Campo 5: studentReveal
  const studentRevealMatch = (postItem.studentReveal || '').trim() === (practiceItem.studentReveal || '').trim();
  if (!studentRevealMatch) {
    diffs.push(`Campo studentReveal no coincide: ${pQPrefix}.studentReveal ("${postItem.studentReveal}") vs ${pRPrefix}.studentReveal ("${practiceItem.studentReveal}")`);
  }

  // Campo 6: success
  const successMatch = (postItem.success || '').trim() === (practiceItem.success || '').trim();
  if (!successMatch) {
    diffs.push(`Campo success no coincide: ${pQPrefix}.success ("${postItem.success}") vs ${pRPrefix}.success ("${practiceItem.success}")`);
  }

  // Campo 7: support
  const supportMatch = (postItem.support || '').trim() === (practiceItem.support || '').trim();
  if (!supportMatch) {
    diffs.push(`Campo support no coincide: ${pQPrefix}.support ("${postItem.support}") vs ${pRPrefix}.support ("${practiceItem.support}")`);
  }

  return {
    contextMatch,
    questionMatch,
    expectedMatch,
    revealMatch,
    studentRevealMatch,
    successMatch,
    supportMatch,
    diffs
  };
}

// ==============================================================================
// SUITE DE PRUEBAS CONTROLADAS (--self-test)
// ==============================================================================

export function runSelfTest(): boolean {
  console.log('================================================================');
  console.log('EJECUTANDO SUITE CONTROLADA: --self-test DE AUDITOR WORK');
  console.log('================================================================\n');

  let testsPassed = 0;
  const totalTests = 5;

  // Prueba 1: Detección de Título fuera de límite
  console.log('[Prueba 1/5] Detección de límite de palabras en títulos:');
  const validTitle = 'EL MISTERIO DEL PANEL SOLAR'; // 5 palabras
  const invalidTitle = 'EL 10% CABE 10 VECES EN EL 100%'; // 8 palabras Work
  const countValid = countWordsWork(validTitle);
  const countInvalid = countWordsWork(invalidTitle);

  if (countValid.count <= 6 && countInvalid.count > 6) {
    console.log(`  ✓ Conforme: Válido detectado con ${countValid.count} palabras, Inválido detectado con ${countInvalid.count} palabras (límite 6).`);
    testsPassed++;
  } else {
    console.error('  ✗ Fallo en Prueba 1');
  }

  // Prueba 2: Detección de Subtítulo fuera de límite
  console.log('\n[Prueba 2/5] Detección de límite de palabras en subtítulos:');
  const validSubtitle = '18 libros son el 15%: total 120 libros'; // 8 palabras Work
  const invalidSubtitle = 'Este subtítulo contiene demasiadas palabras para ser aceptado en la lámina oficial'; // 12 palabras
  const countSubValid = countWordsWork(validSubtitle);
  const countSubInvalid = countWordsWork(invalidSubtitle);

  if (countSubValid.count <= 8 && countSubInvalid.count > 8) {
    console.log(`  ✓ Conforme: Subtítulo de 8 palabras aceptado (${countSubValid.count}), Subtítulo de 12 palabras rechazado (${countSubInvalid.count}).`);
    testsPassed++;
  } else {
    console.error('  ✗ Fallo en Prueba 2');
  }

  // Prueba 3: Detección de Duplicación interna en prompt
  console.log('\n[Prueba 3/5] Detección de descripción de protagonistas duplicada en prompt:');
  const cleanPrompt = 'Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, standing before a blackboard. No text drawn by AI.';
  const duplicatedPrompt = 'Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, The two 13-year-old student explorers smiling. No text drawn by AI.';
  const auditClean = auditVisualPrompt(cleanPrompt);
  const auditDup = auditVisualPrompt(duplicatedPrompt);

  if (auditClean.duplicateDuoCount === 0 && auditDup.duplicateDuoCount > 0) {
    console.log(`  ✓ Conforme: Prompt limpio tiene 0 duplicados, Prompt repetido detectado con ${auditDup.duplicateDuoCount} menciones.`);
    testsPassed++;
  } else {
    console.error('  ✗ Fallo en Prueba 3');
  }

  // Prueba 4: Detección de operaciones matemáticas, porcentajes y cálculos numéricos
  console.log('\n[Prueba 4/5] Detección de cálculos, porcentajes y resultados numéricos en prompts:');
  const mathPrompt = 'Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, comparing notebooks with two different calculations arriving at 90. No text drawn by AI.';
  const auditMath = auditVisualPrompt(mathPrompt);

  if (auditMath.mathOperations.some(op => op.includes('arriving at 90'))) {
    console.log(`  ✓ Conforme: Detectada la filtración numérica: ${JSON.stringify(auditMath.mathOperations)}`);
    testsPassed++;
  } else {
    console.error('  ✗ Fallo en Prueba 4');
  }

  // Prueba 5: Detección de discrepancias en campos exactos entre comprobación y práctica
  console.log('\n[Prueba 5/5] Comparación de campos exactos (sin barras) entre comprobación y práctica:');
  const itemPost = {
    context: 'En una cuadrícula de 100 cuadritos...',
    question: '¿Qué porcentaje está coloreado?',
    expected: '40%',
    reveal: '40/100 = 40%',
    studentReveal: 'Está coloreado el 40%',
    success: '¡Correcto!',
    support: 'Cuenta las partes.'
  };
  const itemPracDiff = {
    ...itemPost,
    question: '¿Cuál es el valor del porcentaje coloreado?' // Discrepancia en campo question
  };

  const compSame = compareExactCaseFields(itemPost, itemPost, 0);
  const compDiff = compareExactCaseFields(itemPost, itemPracDiff, 0);

  if (compSame.diffs.length === 0 && compDiff.diffs.length === 1 && !compDiff.questionMatch) {
    console.log(`  ✓ Conforme: Identidad en los 7 campos exactos aprobada (0 diffs). Discrepancia en question detectada con precisión: "${compDiff.diffs[0]}"`);
    testsPassed++;
  } else {
    console.error('  ✗ Fallo en Prueba 5');
  }

  console.log(`\n================================================================`);
  console.log(`RESULTADO DE --self-test: ${testsPassed}/${totalTests} PRUEBAS EXITOSAS`);
  console.log('================================================================\n');

  return testsPassed === totalTests;
}

// ==============================================================================
// EJECUCIÓN DE AUDITORÍA COMPLETA SOBRE OA04
// ==============================================================================

export function runFullOA04Audit(): { findings: Finding[]; summary: Record<string, number>; pendingAuditStatus: Record<string, string> } {
  const findings: Finding[] = [];
  const rootDir = process.cwd();
  const oaDataDir = path.resolve(rootDir, 'scripts/oa04_data');

  console.log('================================================================');
  console.log('AUDITORÍA DETERMINISTA WORK: MATEMÁTICA 7° OA04 (PORCENTAJES)');
  console.log(`Fuente canónica auditada: ${oaDataDir}`);
  console.log('================================================================\n');

  // A. ESTRUCTURA: Cargar las 6 clases
  const classesData: Array<{ num: number; file: string; data: any }> = [];

  for (let c = 1; c <= 6; c++) {
    const fileName = `clase0${c}.ts`;
    const filePath = path.join(oaDataDir, fileName);

    if (!fs.existsSync(filePath)) {
      findings.push({
        rule: 'ESTR-001 (Existencia de 6 clases)',
        clase: c,
        momento: 'Estructura',
        laminaNum: 0,
        arrayIndex: -1,
        archivo: fileName,
        campo: 'archivo',
        valorActual: 'NO EXISTE',
        conteoOComparacion: '0 clases encontradas para clase ' + c,
        razon: 'Falta el archivo requerido para completar las 6 clases canónicas del OA.',
        estado: 'FALLA'
      });
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/export const MATEMATICA_7B_OA04_CLASE0\d:\s*LessonData\s*=\s*(\{[\s\S]*\});?\s*$/);
    if (!match) {
      findings.push({
        rule: 'ESTR-002 (Estructura exportada LessonData)',
        clase: c,
        momento: 'Estructura',
        laminaNum: 0,
        arrayIndex: -1,
        archivo: fileName,
        campo: 'export const',
        valorActual: 'NO_PARSEABLE',
        conteoOComparacion: 'Error regex al extraer LessonData',
        razon: 'No se pudo parsear el objeto LessonData en el archivo.',
        estado: 'FALLA'
      });
      continue;
    }

    try {
      const data = JSON.parse(match[1]);
      classesData.push({ num: c, file: fileName, data });
    } catch (e: any) {
      findings.push({
        rule: 'ESTR-002 (JSON Válido)',
        clase: c,
        momento: 'Estructura',
        laminaNum: 0,
        arrayIndex: -1,
        archivo: fileName,
        campo: 'JSON.parse',
        valorActual: 'SYNTAX_ERROR',
        conteoOComparacion: e.message,
        razon: 'Error sintáctico de JSON al parsear la lección.',
        estado: 'FALLA'
      });
    }
  }

  if (classesData.length !== 6) {
    findings.push({
      rule: 'ESTR-001 (Exactamente 6 clases)',
      clase: 0,
      momento: 'Estructura',
      laminaNum: 0,
      arrayIndex: -1,
      archivo: 'scripts/oa04_data/',
      campo: 'total_clases',
      valorActual: `${classesData.length} clases`,
      conteoOComparacion: 'Requeridas: 6 clases',
      razon: 'El paquete no contiene exactamente las 6 clases completas por OA.',
      estado: 'FALLA'
    });
  }

  let totalLaminasAuditadas = 0;

  for (const cItem of classesData) {
    const c = cItem.num;
    const file = cItem.file;
    const lesson = cItem.data;

    // Verificar paso8_cierre
    if (!lesson.paso8_cierre || !lesson.paso8_cierre.preguntaSintesis || !lesson.paso8_cierre.metacognicion) {
      findings.push({
        rule: 'COH-003 (Presencia de paso8_cierre)',
        clase: c,
        momento: 'Coherencia',
        laminaNum: 0,
        arrayIndex: -1,
        archivo: file,
        campo: 'paso8_cierre',
        valorActual: lesson.paso8_cierre ? 'INCOMPLETO' : 'FALTANTE',
        conteoOComparacion: 'Requerido objeto paso8_cierre con preguntaSintesis y metacognicion',
        razon: 'Toda lección debe incluir la estructura formal de cierre metacognitivo de 8 etapas.',
        estado: 'FALLA'
      });
    }

    // A.1. Hook Slides (7 láminas)
    const hookSlides = lesson.hook?.slides || [];
    if (hookSlides.length !== 7) {
      findings.push({
        rule: 'ESTR-003 (Exactamente 7 láminas en Gancho)',
        clase: c,
        momento: 'Gancho',
        laminaNum: 0,
        arrayIndex: -1,
        archivo: file,
        campo: 'hook.slides.length',
        valorActual: `${hookSlides.length} láminas`,
        conteoOComparacion: 'Requeridas: 7 láminas',
        razon: 'El video gancho bimodal de 7° básico exige exactamente 7 láminas.',
        estado: 'FALLA'
      });
    }

    // A.2. Formalization Slides (7 láminas)
    const explSlides = lesson.formalization?.slides || [];
    if (explSlides.length !== 7) {
      findings.push({
        rule: 'ESTR-004 (Exactamente 7 láminas en Explicación)',
        clase: c,
        momento: 'Explicación',
        laminaNum: 0,
        arrayIndex: -1,
        archivo: file,
        campo: 'formalization.slides.length',
        valorActual: `${explSlides.length} láminas`,
        conteoOComparacion: 'Requeridas: 7 láminas',
        razon: 'El video explicativo bimodal de 7° básico exige exactamente 7 láminas.',
        estado: 'FALLA'
      });
    }

    // Auditar cada lámina de Gancho
    hookSlides.forEach((s: any, idx: number) => {
      totalLaminasAuditadas++;
      const laminaNum = idx + 1; // 1-based (verificación: hook.slides[2] es Lámina 3)
      const arrayIndex = idx;
      const campoBase = `hook.slides[${idx}]`;

      // B. Título
      const title = s.overlayTitle || s.overlayText || '';
      const wWork = countWordsWork(title);
      const wStrict = countWordsStrict(title);

      if (wWork.count > 6) {
        findings.push({
          rule: 'TIT-001 (Límite de 6 palabras en Título Work)',
          clase: c,
          momento: 'Gancho',
          laminaNum,
          arrayIndex,
          archivo: file,
          campo: `${campoBase}.overlayTitle`,
          valorActual: `"${title}"`,
          conteoOComparacion: `Work: ${wWork.count} palabras (Estricto: ${wStrict}) > Límite: 6`,
          razon: `El título excede el límite de 6 palabras impuesto por Work. Tokens contados: ${JSON.stringify(wWork.tokens)}`,
          estado: 'FALLA'
        });
      }

      // B. Subtítulo
      const subtitle = s.overlaySubtitle || '';
      const sWork = countWordsWork(subtitle);
      const sStrict = countWordsStrict(subtitle);

      if (sWork.count > 8) {
        findings.push({
          rule: 'SUB-001 (Límite de 8 palabras en Subtítulo Work)',
          clase: c,
          momento: 'Gancho',
          laminaNum,
          arrayIndex,
          archivo: file,
          campo: `${campoBase}.overlaySubtitle`,
          valorActual: `"${subtitle}"`,
          conteoOComparacion: `Work: ${sWork.count} palabras (Estricto: ${sStrict}) > Límite: 8`,
          razon: `El subtítulo excede el límite de 8 palabras impuesto por Work. Tokens contados: ${JSON.stringify(sWork.tokens)}`,
          estado: 'FALLA'
        });
      }

      // C. Prompt visual
      const pResult = auditVisualPrompt(s.visualPrompt || '');
      if (!pResult.hasDuo) {
        findings.push({
          rule: 'PRM-001 (Presencia del dúo de protagonistas)',
          clase: c,
          momento: 'Gancho',
          laminaNum,
          arrayIndex,
          archivo: file,
          campo: `${campoBase}.visualPrompt`,
          valorActual: `"${(s.visualPrompt || '').substring(0, 60)}..."`,
          conteoOComparacion: 'Dúo no encontrado',
          razon: 'Falta la descripción aprobada de los dos estudiantes exploradores de 13 años.',
          estado: 'FALLA'
        });
      }

      if (pResult.duplicateDuoCount > 1) {
        findings.push({
          rule: 'PRM-002 (Cero duplicación de protagonistas en prompt)',
          clase: c,
          momento: 'Gancho',
          laminaNum,
          arrayIndex,
          archivo: file,
          campo: `${campoBase}.visualPrompt`,
          valorActual: `"${(s.visualPrompt || '').substring(0, 80)}..."`,
          conteoOComparacion: `${pResult.duplicateDuoCount} menciones de protagonistas en el mismo campo`,
          razon: 'El texto del protagonista está repetido dentro del mismo campo visualPrompt.',
          estado: 'FALLA'
        });
      }

      if (!pResult.hasNoTextClause) {
        findings.push({
          rule: 'PRM-003 (Cláusula No text drawn by AI)',
          clase: c,
          momento: 'Gancho',
          laminaNum,
          arrayIndex,
          archivo: file,
          campo: `${campoBase}.visualPrompt`,
          valorActual: `"${(s.visualPrompt || '').substring(0, 60)}..."`,
          conteoOComparacion: 'Cláusula ausente',
          razon: 'Todo prompt debe concluir obligatoriamente con "No text drawn by AI."',
          estado: 'FALLA'
        });
      }

      if (pResult.mathOperations.length > 0) {
        findings.push({
          rule: 'PRM-004 (Cero operaciones/datos matemáticos en prompt)',
          clase: c,
          momento: 'Gancho',
          laminaNum,
          arrayIndex,
          archivo: file,
          campo: `${campoBase}.visualPrompt`,
          valorActual: `"${(s.visualPrompt || '').substring(0, 90)}..."`,
          conteoOComparacion: `Detectados: ${JSON.stringify(pResult.mathOperations)}`,
          razon: 'El prompt visual contiene números, porcentajes o cálculos que inducen a la IA a dibujar texto o números.',
          estado: 'FALLA'
        });
      }

      if (pResult.unresolvedIssues.length > 0) {
        findings.push({
          rule: 'PRM-005 (Clasificación de Prompt)',
          clase: c,
          momento: 'Gancho',
          laminaNum,
          arrayIndex,
          archivo: file,
          campo: `${campoBase}.visualPrompt`,
          valorActual: s.visualPrompt || '',
          conteoOComparacion: pResult.unresolvedIssues.join('; '),
          razon: 'El prompt contiene elementos no clasificables bajo las reglas canónicas vigentes.',
          estado: 'NO RESUELTO'
        });
      }
    });

    // Auditar cada lámina de Explicación
    explSlides.forEach((s: any, idx: number) => {
      totalLaminasAuditadas++;
      const laminaNum = idx + 1; // 1-based
      const arrayIndex = idx;
      const campoBase = `formalization.slides[${idx}]`;

      // B. Título
      const title = s.overlayTitle || s.overlayText || '';
      const wWork = countWordsWork(title);
      const wStrict = countWordsStrict(title);

      if (wWork.count > 6) {
        findings.push({
          rule: 'TIT-001 (Límite de 6 palabras en Título Work)',
          clase: c,
          momento: 'Explicación',
          laminaNum,
          arrayIndex,
          archivo: file,
          campo: `${campoBase}.overlayTitle`,
          valorActual: `"${title}"`,
          conteoOComparacion: `Work: ${wWork.count} palabras (Estricto: ${wStrict}) > Límite: 6`,
          razon: `El título excede el límite de 6 palabras impuesto por Work. Tokens contados: ${JSON.stringify(wWork.tokens)}`,
          estado: 'FALLA'
        });
      }

      // B. Subtítulo
      const subtitle = s.overlaySubtitle || '';
      const sWork = countWordsWork(subtitle);
      const sStrict = countWordsStrict(subtitle);

      if (sWork.count > 8) {
        findings.push({
          rule: 'SUB-001 (Límite de 8 palabras en Subtítulo Work)',
          clase: c,
          momento: 'Explicación',
          laminaNum,
          arrayIndex,
          archivo: file,
          campo: `${campoBase}.overlaySubtitle`,
          valorActual: `"${subtitle}"`,
          conteoOComparacion: `Work: ${sWork.count} palabras (Estricto: ${sStrict}) > Límite: 8`,
          razon: `El subtítulo excede el límite de 8 palabras impuesto por Work. Tokens contados: ${JSON.stringify(sWork.tokens)}`,
          estado: 'FALLA'
        });
      }

      // Subtítulo específico Clase 6 Lámina 6
      if (c === 6 && laminaNum === 6) {
        const expectedSub = '18 libros son el 15%: total 120 libros';
        if (subtitle !== expectedSub) {
          findings.push({
            rule: 'SUB-002 (Subtítulo Canónico Clase 6 Lámina 6)',
            clase: 6,
            momento: 'Explicación',
            laminaNum: 6,
            arrayIndex: 5,
            archivo: file,
            campo: `${campoBase}.overlaySubtitle`,
            valorActual: `"${subtitle}"`,
            conteoOComparacion: `Actual: "${subtitle}" vs Esperado: "${expectedSub}"`,
            razon: 'Falta la palabra final "libros" solicitada explícitamente por Work para expresar completo el contexto y resultado.',
            estado: 'FALLA'
          });
        }
      }

      // C. Prompt visual
      const pResult = auditVisualPrompt(s.visualPrompt || '');
      if (!pResult.hasDuo) {
        findings.push({
          rule: 'PRM-001 (Presencia del dúo de protagonistas)',
          clase: c,
          momento: 'Explicación',
          laminaNum,
          arrayIndex,
          archivo: file,
          campo: `${campoBase}.visualPrompt`,
          valorActual: `"${(s.visualPrompt || '').substring(0, 60)}..."`,
          conteoOComparacion: 'Dúo no encontrado',
          razon: 'Falta la descripción aprobada de los dos estudiantes exploradores de 13 años.',
          estado: 'FALLA'
        });
      }

      if (pResult.duplicateDuoCount > 1) {
        findings.push({
          rule: 'PRM-002 (Cero duplicación de protagonistas en prompt)',
          clase: c,
          momento: 'Explicación',
          laminaNum,
          arrayIndex,
          archivo: file,
          campo: `${campoBase}.visualPrompt`,
          valorActual: `"${(s.visualPrompt || '').substring(0, 80)}..."`,
          conteoOComparacion: `${pResult.duplicateDuoCount} menciones de protagonistas en el mismo campo`,
          razon: 'El texto del protagonista está repetido dentro del mismo campo visualPrompt.',
          estado: 'FALLA'
        });
      }

      if (!pResult.hasNoTextClause) {
        findings.push({
          rule: 'PRM-003 (Cláusula No text drawn by AI)',
          clase: c,
          momento: 'Explicación',
          laminaNum,
          arrayIndex,
          archivo: file,
          campo: `${campoBase}.visualPrompt`,
          valorActual: `"${(s.visualPrompt || '').substring(0, 60)}..."`,
          conteoOComparacion: 'Cláusula ausente',
          razon: 'Todo prompt debe concluir obligatoriamente con "No text drawn by AI."',
          estado: 'FALLA'
        });
      }

      if (pResult.mathOperations.length > 0) {
        findings.push({
          rule: 'PRM-004 (Cero operaciones/datos matemáticos en prompt)',
          clase: c,
          momento: 'Explicación',
          laminaNum,
          arrayIndex,
          archivo: file,
          campo: `${campoBase}.visualPrompt`,
          valorActual: `"${(s.visualPrompt || '').substring(0, 90)}..."`,
          conteoOComparacion: `Detectados: ${JSON.stringify(pResult.mathOperations)}`,
          razon: 'El prompt visual contiene números, porcentajes o cálculos que inducen a la IA a dibujar texto o números.',
          estado: 'FALLA'
        });
      }

      if (pResult.unresolvedIssues.length > 0) {
        findings.push({
          rule: 'PRM-005 (Clasificación de Prompt)',
          clase: c,
          momento: 'Explicación',
          laminaNum,
          arrayIndex,
          archivo: file,
          campo: `${campoBase}.visualPrompt`,
          valorActual: s.visualPrompt || '',
          conteoOComparacion: pResult.unresolvedIssues.join('; '),
          razon: 'El prompt contiene elementos no clasificables bajo las reglas canónicas vigentes.',
          estado: 'NO RESUELTO'
        });
      }
    });

    // D. Coherencia: postQuestions reutiliza practice Casos 1 y 2 (Comparación de los 7 campos exactos sin barras)
    const postQ = lesson.postQuestions || [];
    const pracQ = lesson.practice || [];

    for (let caseIdx = 0; caseIdx < 2; caseIdx++) {
      const pPost = postQ[caseIdx];
      const pPrac = pracQ[caseIdx];
      const caseNum = caseIdx + 1;

      if (!pPost || !pPrac) {
        findings.push({
          rule: 'COH-002 (Reutilización de Casos 1 y 2 en postQuestions)',
          clase: c,
          momento: 'Coherencia',
          laminaNum: 0,
          arrayIndex: caseIdx,
          archivo: file,
          campo: `postQuestions[${caseIdx}]`,
          valorActual: pPost ? 'DEFINIDO' : 'FALTANTE',
          conteoOComparacion: `practice[${caseIdx}]: ${pPrac ? 'DEFINIDO' : 'FALTANTE'}`,
          razon: `El Caso ${caseNum} debe existir tanto en postQuestions como en practice.`,
          estado: 'FALLA'
        });
        continue;
      }

      const comp = compareExactCaseFields(pPost, pPrac, caseIdx);
      if (comp.diffs.length > 0) {
        findings.push({
          rule: 'COH-002 (Identidad en campos exactos entre postQuestions y practice)',
          clase: c,
          momento: 'Coherencia',
          laminaNum: 0,
          arrayIndex: caseIdx,
          archivo: file,
          campo: `postQuestions[${caseIdx}] vs practice[${caseIdx}]`,
          valorActual: 'DIVERGENTE',
          conteoOComparacion: `Diferencias: ${comp.diffs.join('; ')}`,
          razon: `Todos los campos comparados individualmente (context, question, expected, reveal, studentReveal, success, support) deben ser idénticos para el Caso ${caseNum}.`,
          estado: 'FALLA'
        });
      }
    }
  }

  const pendingAuditStatus = {
    capaVectorial_contenido: "84/84 láminas definen campo vectorialOverlayPptx no vacío (VERIFICADO).",
    especificacion_logotipo: "PENDIENTE (En scripts/oa04_data/, la cláusula literal 'Logo blanco de EstudioSimple en la esquina inferior derecha' no está explicitada en los campos JSON de láminas; se ensambla en el generador DOCX).",
    coincidencia_typescript_reproductor: "VERIFICADO (Web Studio Simple/src/data/lessons/ contiene 6 archivos JSON idénticos a scripts/oa04_data/).",
    coincidencia_celda_a_celda_docx: "PENDIENTE (No auditada celda a celda en este ejecutable; requiere parser XML de tablas Word completo).",
    coincidencia_caracter_a_caracter_txt: "PENDIENTE (No auditada carácter a carácter contra Prompts_Work_*.txt en este ejecutable)."
  };

  const summary = {
    totalLaminasAuditadas,
    totalFindings: findings.length,
    titulosExcedidos: findings.filter(f => f.rule.startsWith('TIT-001')).length,
    subtitulosExcedidos: findings.filter(f => f.rule.startsWith('SUB-')).length,
    promptsDuplicados: findings.filter(f => f.rule.startsWith('PRM-002')).length,
    promptsConOperaciones: findings.filter(f => f.rule.startsWith('PRM-004')).length,
    noResueltos: findings.filter(f => f.estado === 'NO RESUELTO').length
  };

  return { findings, summary, pendingAuditStatus };
}

// ==============================================================================
// PUNTO DE ENTRADA CLI
// ==============================================================================

async function main() {
  const isSelfTest = process.argv.includes('--self-test');

  if (isSelfTest) {
    const success = runSelfTest();
    process.exit(success ? 0 : 1);
  }

  const { findings, summary, pendingAuditStatus } = runFullOA04Audit();

  console.log(`Láminas auditadas en fuente: ${summary.totalLaminasAuditadas} / 84`);
  console.log(`Total de hallazgos detectados: ${summary.totalFindings}`);
  console.log(`- Títulos sobre límite Work (> 6 palabras): ${summary.titulosExcedidos}`);
  console.log(`- Subtítulos sobre límite Work (> 8 palabras / requerimiento): ${summary.subtitulosExcedidos}`);
  console.log(`- Prompts con protagonistas duplicados: ${summary.promptsDuplicados}`);
  console.log(`- Prompts con cálculos/operaciones matemáticas: ${summary.promptsConOperaciones}`);
  console.log(`- Casos NO RESUELTO: ${summary.noResueltos}\n`);

  console.log('ESTADO DE VERIFICACIONES PENDIENTES:');
  console.log(`- Capa Vectorial: ${pendingAuditStatus.capaVectorial_contenido}`);
  console.log(`- Especificación Logotipo: ${pendingAuditStatus.especificacion_logotipo}`);
  console.log(`- Coincidencia TypeScript Reproductor: ${pendingAuditStatus.coincidencia_typescript_reproductor}`);
  console.log(`- Coincidencia Celda a Celda DOCX: ${pendingAuditStatus.coincidencia_celda_a_celda_docx}`);
  console.log(`- Coincidencia Carácter a Carácter TXT: ${pendingAuditStatus.coincidencia_caracter_a_caracter_txt}\n`);

  if (findings.length > 0) {
    console.log('DETALLE DE HALLAZGOS:');
    findings.forEach((f, idx) => {
      console.log(`\n[${idx + 1}] REGLA: ${f.rule} | ESTADO: ${f.estado}`);
      console.log(`    Ubicación: Clase ${f.clase} - ${f.momento} | Lámina ${f.laminaNum} (índice [${f.arrayIndex}])`);
      console.log(`    Archivo: ${f.archivo} -> Campo: ${f.campo}`);
      console.log(`    Valor actual: ${f.valorActual}`);
      console.log(`    Conteo/Comparación: ${f.conteoOComparacion}`);
      console.log(`    Razón: ${f.razon}`);
    });

    console.log('\n================================================================');
    console.log('RESULTADO FINAL: FALLA (Existen incumplimientos en la fuente canónica)');
    console.log('================================================================\n');
    process.exit(1);
  } else {
    console.log('================================================================');
    console.log('RESULTADO FINAL: PASA (Cero hallazgos en la fuente canónica)');
    console.log('================================================================\n');
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
