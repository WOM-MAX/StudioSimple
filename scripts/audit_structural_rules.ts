import * as fs from 'fs';
import * as path from 'path';

export interface AuditResult {
  file: string;
  subject: string;
  grade: string;
  oa: string;
  lessonNumber: number;
  lessonTitle: string;
  nextLessonTitle: string;
  preCount: number;
  postCount: number;
  practiceCount: number;
  summaryCount: number;
  rule1_resource_isolation: 'PASS' | 'FAIL';
  rule2_counters_sync: 'PASS' | 'FAIL';
  rule3_summary_integrity: 'PASS' | 'PENDIENTE_CONTENIDO_WORK';
  rule4_thematic_title: 'PASS' | 'FAIL' | 'PENDIENTE_CONTENIDO_WORK';
  rule5_continuity: 'PASS' | 'FAIL';
  overallStatus: 'RESUELTO' | 'SIN_HALLAZGO' | 'PENDIENTE_CONTENIDO_WORK' | 'FALLO_TECNICO';
  notes: string[];
}

export function auditSingleLesson(content: string, file: string): AuditResult {
  const notes: string[] = [];

  // Metadata parsing
  const titleMatch = content.match(/"lessonTitle":\s*"([^"]*)"/);
  const nextMatch = content.match(/"nextLessonTitle":\s*"([^"]*)"/);
  const subjectMatch = content.match(/"subject":\s*"([^"]*)"/);
  const gradeMatch = content.match(/"grade":\s*"([^"]*)"/);
  const oaMatch = content.match(/"oaCode":\s*"([^"]*)"/);
  const numMatch = content.match(/"lessonNumber":\s*(\d+)/);
  const totalInOaMatch = content.match(/"totalLessonsInOa":\s*(\d+)/);

  const lessonTitle = titleMatch ? titleMatch[1] : '';
  const nextLessonTitle = nextMatch ? nextMatch[1] : '';
  const subject = subjectMatch ? subjectMatch[1] : '';
  const grade = gradeMatch ? gradeMatch[1] : '7° Básico';
  const oa = oaMatch ? oaMatch[1] : '';
  const lessonNumber = numMatch ? parseInt(numMatch[1], 10) : 0;
  const totalInOa = totalInOaMatch ? parseInt(totalInOaMatch[1], 10) : 6;

  // Counts
  const preMatches = content.match(/"preQuestions":\s*\[/g);
  const postMatches = content.match(/"postQuestions":\s*\[/g);
  const practiceMatches = content.match(/"practice":\s*\[/g);
  const summaryMatches = content.match(/"summaryIdeas":\s*\[/g);

  let preCount = 0;
  if (preMatches) {
    const preBlock = content.split(/"preQuestions":\s*\[/)[1]?.split(/\]\s*,\s*"(?:conversationContext|formalization|postQuestions)/)[0];
    if (preBlock) preCount = (preBlock.match(/"question":/g) || []).length;
  }

  let postCount = 0;
  if (postMatches) {
    const postBlock = content.split(/"postQuestions":\s*\[/)[1]?.split(/\]\s*,\s*"(?:practice|mini|summaryIdeas)/)[0];
    if (postBlock) postCount = (postBlock.match(/"question":/g) || []).length;
  }

  let practiceCount = 0;
  if (practiceMatches) {
    const practiceBlock = content.split(/"practice":\s*\[/)[1]?.split(/\]\s*,\s*"(?:mini|summaryIdeas)/)[0];
    if (practiceBlock) practiceCount = (practiceBlock.match(/"question":/g) || []).length;
  }

  let summaryCount = 0;
  let sumBlock = '';
  if (summaryMatches) {
    sumBlock = content.split(/"summaryIdeas":\s*\[/)[1]?.split(/\]\s*,\s*"(?:interactive|closure|paso8_cierre)/)[0] || '';
    if (sumBlock) summaryCount = (sumBlock.match(/\[\s*"[^"]+"/g) || []).length;
  }

  const isMatOa01 = file.startsWith('matematica_7b_oa01');

  // Regla 1: Resource Isolation (Ciencias y Matemática no usan texto de lectura narrativo)
  let r1: 'PASS' | 'FAIL' = 'PASS';
  const isCienciasOrMat = subject.toLowerCase().includes('ciencias') || subject.toLowerCase().includes('matemática') || subject.toLowerCase().includes('matematica');
  if (isCienciasOrMat && (content.includes('"readingResource"') || (content.includes('"type": "reading_resource"') && content.includes('"paragraphs"')) || (content.includes('"type": "reading"') && content.includes('"paragraphs"')))) {
    r1 = 'FAIL';
    notes.push('Fallo técnico: Ciencias o Matemática no deben declarar relato de lectura narrativo');
  }

  // Regla 2: Counters Sync
  let r2: 'PASS' | 'FAIL' = 'PASS';
  if (!isMatOa01 && (preCount === 0 || postCount === 0)) {
    r2 = 'FAIL';
    notes.push(`Fallo técnico: Faltan reactivos de recorrido o comprobación (pre: ${preCount}, post: ${postCount})`);
  }

  // Regla 3: Summary Integrity (Distingue contenido pendiente de Work)
  let r3: 'PASS' | 'PENDIENTE_CONTENIDO_WORK' = 'PASS';
  if (!isMatOa01) {
    if (sumBlock.includes('Una situación') || sumBlock.includes('Situación inicial')) {
      r3 = 'PENDIENTE_CONTENIDO_WORK';
      notes.push('summaryIdeas contiene placeholder genérico');
    } else if (summaryCount < 3) {
      r3 = 'PENDIENTE_CONTENIDO_WORK';
      notes.push(`summaryIdeas tiene ${summaryCount} ideas (UI adaptativa; pendiente redacción de 3ra idea por Work)`);
    }
  }

  // Regla 4: Thematic Title
  let r4: 'PASS' | 'FAIL' | 'PENDIENTE_CONTENIDO_WORK' = 'PASS';
  if (!isMatOa01) {
    if (!lessonTitle || lessonTitle.trim() === '' || lessonTitle.trim() === 'Una situación') {
      r4 = 'FAIL';
      notes.push('Fallo técnico: Título temático inválido o placeholder "Una situación"');
    }
  }

  // Regla 5: Continuity
  let r5: 'PASS' | 'FAIL' = 'PASS';
  if (!isMatOa01) {
    if (lessonNumber > 0 && lessonNumber < totalInOa && (!nextLessonTitle || nextLessonTitle.trim() === '')) {
      r5 = 'FAIL';
      notes.push(`Fallo técnico: Clase intermedia ${lessonNumber} no tiene puente a próxima clase`);
    }
  }

  // Distinción formal: Fallo Técnico (salida 1) vs Contenido Pendiente de Work (salida 0)
  let overall: 'RESUELTO' | 'SIN_HALLAZGO' | 'PENDIENTE_CONTENIDO_WORK' | 'FALLO_TECNICO' = 'RESUELTO';
  if (r1 === 'FAIL' || r2 === 'FAIL' || r4 === 'FAIL' || r5 === 'FAIL') {
    overall = 'FALLO_TECNICO';
  } else if (r3 === 'PENDIENTE_CONTENIDO_WORK') {
    overall = 'PENDIENTE_CONTENIDO_WORK';
  } else {
    overall = 'RESUELTO';
  }

  return {
    file,
    subject: subject || (isMatOa01 ? 'Matemática' : 'Desconocida'),
    grade,
    oa: oa || (isMatOa01 ? 'OA 1' : ''),
    lessonNumber,
    lessonTitle,
    nextLessonTitle,
    preCount,
    postCount,
    practiceCount,
    summaryCount,
    rule1_resource_isolation: r1,
    rule2_counters_sync: r2,
    rule3_summary_integrity: r3,
    rule4_thematic_title: r4,
    rule5_continuity: r5,
    overallStatus: overall,
    notes
  };
}

export function verifyRejectionOfInvalidCopies(): void {
  console.log('🧪 Verificando que el auditor rechace copias de prueba incorrectas...');

  // Copia 1: Ciencias con recurso narrativo indebido
  const badResource = auditSingleLesson(`
    "metadata": { "grade": "7° Básico", "subject": "Ciencias Naturales", "oaCode": "OA 1", "lessonNumber": 2, "totalLessonsInOa": 6, "lessonTitle": "Título Real", "nextLessonTitle": "Siguiente" },
    "preQuestions": [{ "question": "Q1" }], "postQuestions": [{ "question": "Q2" }],
    "interactive": { "type": "reading_resource", "paragraphs": ["Texto literario..."] }
  `, 'test_bad_resource.ts');
  if (badResource.rule1_resource_isolation !== 'FAIL' || badResource.overallStatus !== 'FALLO_TECNICO') {
    throw new Error('El auditor falló al rechazar un recurso narrativo indebido en Ciencias.');
  }

  // Copia 2: Título inválido "Una situación"
  const badTitle = auditSingleLesson(`
    "metadata": { "grade": "7° Básico", "subject": "Historia", "oaCode": "OA 2", "lessonNumber": 2, "totalLessonsInOa": 6, "lessonTitle": "Una situación", "nextLessonTitle": "Siguiente" },
    "preQuestions": [{ "question": "Q1" }], "postQuestions": [{ "question": "Q2" }]
  `, 'test_bad_title.ts');
  if (badTitle.rule4_thematic_title !== 'FAIL' || badTitle.overallStatus !== 'FALLO_TECNICO') {
    throw new Error('El auditor falló al rechazar el título placeholder "Una situación".');
  }

  // Copia 3: Clase intermedia sin puente de continuidad
  const badBridge = auditSingleLesson(`
    "metadata": { "grade": "7° Básico", "subject": "Historia", "oaCode": "OA 2", "lessonNumber": 3, "totalLessonsInOa": 6, "lessonTitle": "Título Válido", "nextLessonTitle": "" },
    "preQuestions": [{ "question": "Q1" }], "postQuestions": [{ "question": "Q2" }]
  `, 'test_bad_bridge.ts');
  if (badBridge.rule5_continuity !== 'FAIL' || badBridge.overallStatus !== 'FALLO_TECNICO') {
    throw new Error('El auditor falló al rechazar una clase intermedia sin puente.');
  }

  console.log('  ✅ Comprobación superada: El auditor rechaza con salida FALLO_TECNICO ante recurso, título o puente incorrectos.\n');
}

export function runFullAudit(): void {
  // 1. Ejecutar verificación de rechazo de copias inválidas
  verifyRejectionOfInvalidCopies();

  // 2. Auditar las 36 lecciones reales
  const lessonsDir = path.join(__dirname, '../Web Studio Simple/src/data/lessons');
  const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts').sort();
  const results: AuditResult[] = [];

  for (const file of files) {
    const filePath = path.join(lessonsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    results.push(auditSingleLesson(content, file));
  }

  console.log('=== MATRIZ DE AUDITORÍA ESTRUCTURAL (36 LECCIONES) ===\n');
  console.log(
    'Archivo'.padEnd(35) +
    ' | Título'.padEnd(40) +
    ' | R1 | R2 | R3 | R4 | R5 | Estado Global'
  );
  console.log('-'.repeat(125));

  for (const r of results) {
    console.log(
      r.file.padEnd(35) +
      ` | ${(r.lessonTitle || (r.file.includes('oa01') ? 'Matemática OA01 (Protegida)' : '')).slice(0, 38)}`.padEnd(40) +
      ` | ${r.rule1_resource_isolation.padEnd(2)}` +
      ` | ${r.rule2_counters_sync.padEnd(2)}` +
      ` | ${(r.rule3_summary_integrity === 'PASS' ? 'OK' : 'PEND').padEnd(2)}` +
      ` | ${r.rule4_thematic_title.padEnd(2)}` +
      ` | ${r.rule5_continuity.padEnd(2)}` +
      ` | ${r.overallStatus}`
    );
  }

  const outJsonPath = path.join(__dirname, '../docs/auditorias/MATRIZ_AUDITORIA_ESTRUCTURAL_36_LECCIONES.json');
  fs.mkdirSync(path.dirname(outJsonPath), { recursive: true });
  fs.writeFileSync(outJsonPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\nMatriz guardada en: ${outJsonPath}`);

  const technicalFailures = results.filter(r => r.overallStatus === 'FALLO_TECNICO');
  const pendingContent = results.filter(r => r.overallStatus === 'PENDIENTE_CONTENIDO_WORK');

  console.log(`\nResumen de Control:`);
  console.log(`- Fallos técnicos estructurales: ${technicalFailures.length}`);
  console.log(`- Clases con contenido de resumen pendiente de Work: ${pendingContent.length}`);

  if (technicalFailures.length > 0) {
    console.error(`\n❌ ERROR CRÍTICO: ${technicalFailures.length} lecciones presentan fallos técnicos.`);
    for (const f of technicalFailures) {
      console.error(`  - ${f.file}: ${f.notes.join('; ')}`);
    }
    process.exit(1);
  }

  console.log(`\n✅ AUDITORÍA ESTRUCTURAL SUPERADA: 0 fallos técnicos.`);
  process.exit(0);
}

// Ejecutar si se invoca directamente
if (require.main === module) {
  runFullAudit();
}
