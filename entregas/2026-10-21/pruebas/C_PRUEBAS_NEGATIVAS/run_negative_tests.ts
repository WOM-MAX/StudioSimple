import * as fs from 'fs';
import * as path from 'path';
import { auditSingleLesson } from './audit_structural_rules';

const testCase = process.argv[2] || 'all';
const scratchDir = path.resolve('scratch/pruebas_negativas');
if (!fs.existsSync(scratchDir)) {
  fs.mkdirSync(scratchDir, { recursive: true });
}

function runTest1() {
  console.log('================================================================');
  console.log('🔴 PRUEBA NEGATIVA 1: Recurso Ajeno en Ciencias Naturales');
  console.log('================================================================');
  const syntheticContent = `
    "metadata": {
      "grade": "7° Básico",
      "subject": "Ciencias Naturales",
      "oaCode": "OA 1",
      "lessonNumber": 2,
      "totalLessonsInOa": 6,
      "lessonTitle": "Cambios físicos durante la pubertad",
      "nextLessonTitle": "Emociones, afectividad e imagen personal"
    },
    "preQuestions": [{ "question": "¿Qué cambios notas?" }],
    "postQuestions": [{ "question": "¿Cómo se clasifican?" }],
    "summaryIdeas": [["Idea 1", "Texto 1"], ["Idea 2", "Texto 2"]],
    "interactive": {
      "type": "reading_resource",
      "title": "Cuento narrativo en Ciencias",
      "paragraphs": ["En una colonia lunar vivía un robot..."]
    }
  `;
  const syntheticFile = path.join(scratchDir, 'synthetic_ciencias_bad_resource.ts');
  fs.writeFileSync(syntheticFile, syntheticContent, 'utf8');

  console.log(`Alteración sintética inyectada en: ${syntheticFile}`);
  console.log(`- Asignatura: Ciencias Naturales`);
  console.log(`- Alteración: Inclusión indebida de 'interactive.type = reading_resource' con 'paragraphs'.`);

  const result = auditSingleLesson(syntheticContent, 'synthetic_ciencias_bad_resource.ts');
  console.log('\nResultado del Auditor:');
  console.log(`- Regla 1 (Aislamiento de recursos): ${result.rule1_resource_isolation}`);
  console.log(`- Estado Global: ${result.overallStatus}`);
  console.log(`- Causa detectada: ${result.notes.join('; ')}`);

  if (result.rule1_resource_isolation === 'FAIL' && result.overallStatus === 'FALLO_TECNICO') {
    console.log('\n✅ Prueba negativa 1 exitosa: El auditor detectó y rechazó el recurso ajeno con salida FALLO_TECNICO.');
    process.exit(1); // Salida distinta de cero requerida para certificar el rechazo
  } else {
    console.error('\n❌ ERROR: El auditor no rechazó la copia incorrecta.');
    process.exit(0);
  }
}

function runTest2() {
  console.log('================================================================');
  console.log('🔴 PRUEBA NEGATIVA 2: Título Temático Inválido ("Una situación")');
  console.log('================================================================');
  const syntheticContent = `
    "metadata": {
      "grade": "7° Básico",
      "subject": "Historia, Geografía y Ciencias Sociales",
      "oaCode": "OA 2",
      "lessonNumber": 2,
      "totalLessonsInOa": 6,
      "lessonTitle": "Una situación",
      "nextLessonTitle": "Explicar procesos mediante varias causas"
    },
    "preQuestions": [{ "question": "¿Dónde comenzó?" }],
    "postQuestions": [{ "question": "¿Qué consecuencias tuvo?" }],
    "summaryIdeas": [["Idea 1", "Texto 1"], ["Idea 2", "Texto 2"]]
  `;
  const syntheticFile = path.join(scratchDir, 'synthetic_historia_bad_title.ts');
  fs.writeFileSync(syntheticFile, syntheticContent, 'utf8');

  console.log(`Alteración sintética inyectada en: ${syntheticFile}`);
  console.log(`- Asignatura: Historia`);
  console.log(`- Alteración: Uso del placeholder genérico 'lessonTitle = "Una situación"'.`);

  const result = auditSingleLesson(syntheticContent, 'synthetic_historia_bad_title.ts');
  console.log('\nResultado del Auditor:');
  console.log(`- Regla 4 (Título temático oficial): ${result.rule4_thematic_title}`);
  console.log(`- Estado Global: ${result.overallStatus}`);
  console.log(`- Causa detectada: ${result.notes.join('; ')}`);

  if (result.rule4_thematic_title === 'FAIL' && result.overallStatus === 'FALLO_TECNICO') {
    console.log('\n✅ Prueba negativa 2 exitosa: El auditor detectó y rechazó el título "Una situación" con salida FALLO_TECNICO.');
    process.exit(1); // Salida distinta de cero requerida para certificar el rechazo
  } else {
    console.error('\n❌ ERROR: El auditor no rechazó la copia incorrecta.');
    process.exit(0);
  }
}

function runTest3() {
  console.log('================================================================');
  console.log('🔴 PRUEBA NEGATIVA 3: Puente Hacia Clase Incorrecta / Ausente');
  console.log('================================================================');
  const syntheticContent = `
    "metadata": {
      "grade": "7° Básico",
      "subject": "Inglés",
      "oaCode": "OA 9",
      "lessonNumber": 3,
      "totalLessonsInOa": 6,
      "lessonTitle": "Dates, times and explicit information",
      "nextLessonTitle": ""
    },
    "preQuestions": [{ "question": "What time is it?" }],
    "postQuestions": [{ "question": "When is the birthday?" }],
    "summaryIdeas": [["Idea 1", "Texto 1"], ["Idea 2", "Texto 2"]]
  `;
  const syntheticFile = path.join(scratchDir, 'synthetic_ingles_bad_bridge.ts');
  fs.writeFileSync(syntheticFile, syntheticContent, 'utf8');

  console.log(`Alteración sintética inyectada en: ${syntheticFile}`);
  console.log(`- Asignatura: Inglés`);
  console.log(`- Alteración: Clase intermedia 3 de 6 con puente vacío 'nextLessonTitle = ""'.`);

  const result = auditSingleLesson(syntheticContent, 'synthetic_ingles_bad_bridge.ts');
  console.log('\nResultado del Auditor:');
  console.log(`- Regla 5 (Continuidad curricular): ${result.rule5_continuity}`);
  console.log(`- Estado Global: ${result.overallStatus}`);
  console.log(`- Causa detectada: ${result.notes.join('; ')}`);

  if (result.rule5_continuity === 'FAIL' && result.overallStatus === 'FALLO_TECNICO') {
    console.log('\n✅ Prueba negativa 3 exitosa: El auditor detectó y rechazó el puente roto con salida FALLO_TECNICO.');
    process.exit(1); // Salida distinta de cero requerida para certificar el rechazo
  } else {
    console.error('\n❌ ERROR: El auditor no rechazó la copia incorrecta.');
    process.exit(0);
  }
}

switch (testCase) {
  case '1':
    runTest1();
    break;
  case '2':
    runTest2();
    break;
  case '3':
    runTest3();
    break;
  default:
    console.log('Uso: npx tsx scripts/run_negative_tests.ts [1|2|3]');
    process.exit(0);
}
