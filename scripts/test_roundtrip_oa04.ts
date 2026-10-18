import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { parseLessonMarkdown, extractFileMetadata } from './pipeline_sync_lessons';

console.log('================================================================');
console.log('🧪 PRUEBA DE CICLO COMPLETO DE IDA Y VUELTA (ROUNDTRIP) MAT OA04');
console.log('   (TS original -> Markdown candidato -> Reimportación con Parser)');
console.log('================================================================\n');

const candidateDir = path.resolve('staging_preparacion_aislada/oa04_markdown');
const tsDir = path.resolve('Web Studio Simple/src/data/lessons');

const files = [
  { md: 'CLASE01.md', ts: 'matematica_7b_oa04_clase01.ts', classNum: 1 },
  { md: 'CLASE02.md', ts: 'matematica_7b_oa04_clase02.ts', classNum: 2 },
  { md: 'CLASE03.md', ts: 'matematica_7b_oa04_clase03.ts', classNum: 3 },
  { md: 'CLASE04.md', ts: 'matematica_7b_oa04_clase04.ts', classNum: 4 },
  { md: 'CLASE05.md', ts: 'matematica_7b_oa04_clase05.ts', classNum: 5 },
  { md: 'CLASE06.md', ts: 'matematica_7b_oa04_clase06.ts', classNum: 6 }
];

let totalTested = 0;

for (const item of files) {
  totalTested++;
  const mdPath = path.join(candidateDir, item.md);
  const tsPath = path.join(tsDir, item.ts);

  assert.ok(fs.existsSync(mdPath), `Markdown candidato no encontrado: ${mdPath}`);
  assert.ok(fs.existsSync(tsPath), `Módulo TS original no encontrado: ${tsPath}`);

  const mdContent = fs.readFileSync(mdPath, 'utf8');
  const tsContent = fs.readFileSync(tsPath, 'utf8');

  // Parsear TS original
  const jsonMatch = tsContent.match(/=\s*(\{[\s\S]*\});?\s*$/);
  assert.ok(jsonMatch, `No se pudo extraer JSON de ${item.ts}`);
  const originalData = JSON.parse(jsonMatch[1]);

  // Parsear Markdown candidato con el parser universal calibrado
  const meta = extractFileMetadata(mdPath, mdContent);
  const reimportedData = parseLessonMarkdown(mdContent, meta, mdPath);

  console.log(`📘 Verificando Clase ${item.classNum} (${item.md}):`);
  
  // Aserción 1: Exactamente 2 postQuestions
  assert.strictEqual(
    reimportedData.postQuestions.length,
    2,
    `Clase ${item.classNum}: Debe tener exactamente 2 postQuestions reimportadas, se encontraron ${reimportedData.postQuestions.length}`
  );

  // Aserción 2: Comparación con originalData.postQuestions
  assert.strictEqual(
    reimportedData.postQuestions.length,
    originalData.postQuestions.length,
    `Clase ${item.classNum}: Conteo de postQuestions reimportadas (${reimportedData.postQuestions.length}) debe coincidir con original (${originalData.postQuestions.length})`
  );

  for (let qIdx = 0; qIdx < 2; qIdx++) {
    const reimported = reimportedData.postQuestions[qIdx];
    const original = originalData.postQuestions[qIdx];

    // Verificar que pregunta, modelo y apoyo existen
    assert.ok(reimported.question && reimported.question.length > 0, `Clase ${item.classNum} Q${qIdx + 1}: Pregunta vacía`);
    assert.ok(reimported.expected && reimported.expected.length > 0, `Clase ${item.classNum} Q${qIdx + 1}: Modelo de comprobación vacío`);
    assert.ok(reimported.support && reimported.support.length > 0, `Clase ${item.classNum} Q${qIdx + 1}: Apoyo vacío`);

    // Aserción de fidelidad contra TS original
    assert.strictEqual(
      reimported.question.trim(),
      original.question.trim(),
      `Clase ${item.classNum} Q${qIdx + 1}: Pregunta no coincide con original`
    );
    assert.strictEqual(
      reimported.expected.trim(),
      original.expected.trim(),
      `Clase ${item.classNum} Q${qIdx + 1}: Modelo esperado no coincide con original`
    );

    console.log(`   ✓ Comprobación ${qIdx + 1}:`);
    console.log(`     - Pregunta: "${reimported.question.substring(0, 60)}..."`);
    console.log(`     - Modelo: "${reimported.expected.substring(0, 60)}..."`);
    console.log(`     - Apoyo: "${reimported.support.substring(0, 60)}..."`);
  }
  console.log(`   ✅ Clase ${item.classNum}: Roundtrip perfecto (2/2 postQuestions íntegras)\n`);
}

console.log('================================================================');
console.log(`✅ CICLO DE IDA Y VUELTA MAT OA04 APROBADO: ${totalTested}/6 CLASES COINCIDENTES AL 100%`);
console.log('================================================================');
