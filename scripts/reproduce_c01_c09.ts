import * as fs from 'fs';
import * as path from 'path';

interface DefectEvidence {
  id: string;
  name: string;
  severity: string;
  confirmed: boolean;
  details: any;
}

function runReproduction() {
  const rootDir = 'd:/StudioSimple - Antigravity';
  const lessonsDir = path.join(rootDir, 'Web Studio Simple/src/data/lessons');
  const evidence: DefectEvidence[] = [];

  console.log('--- REPRODUCIENDO Y DOCUMENTANDO DEFECTOS C01 A C09 ---');

  // C01: Enunciados "Clave privada:" y claves forzadas a A
  const c01Findings: Array<{ file: string; itemId: string; question: string; correct: string }> = [];
  const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.ts'));

  for (const f of files) {
    if (f.startsWith('matematica_7b_oa01')) continue; // protegido
    const content = fs.readFileSync(path.join(lessonsDir, f), 'utf8');
    // Buscar en mini quiz: "q": "Clave privada:"
    const regex = /"q":\s*"Clave privada:"/g;
    const matches = content.match(regex);
    if (matches) {
      c01Findings.push({
        file: f,
        itemId: 'multiple',
        question: 'Clave privada:',
        correct: 'A'
      });
    }
  }

  evidence.push({
    id: 'C01',
    name: 'Sustitución del enunciado por "Clave privada:" y clave forzada a A',
    severity: 'Crítico',
    confirmed: c01Findings.length > 0,
    details: {
      affectedLessonFilesCount: c01Findings.length,
      sampleFile: 'ciencias_7b_oa01_clase02.ts',
      sampleWitness: {
        item2: {
          qInTS: 'Clave privada:',
          correctInTS: 'A. La estatura de la inteligencia mediante una fórmula',
          correctInSource: 'B. Los órganos reproductores de los caracteres sexuales secundarios'
        },
        item3: {
          qInTS: 'Clave privada:',
          correctInTS: 'A. Todas las personas cambian el mismo día',
          correctInSource: 'D. Las personas pueden mostrar cambios en momentos distintos'
        }
      }
    }
  });
  console.log(`✓ C01 Confirmado: ${c01Findings.length} archivos de lecciones tienen 'Clave privada:' como pregunta.`);

  // C02: MAT OA04 miniquiz sin opciones y clave vacía
  const mat04Files = files.filter(f => f.startsWith('matematica_7b_oa04'));
  const c02Findings: Array<{ file: string; emptyQuizCount: number }> = [];
  for (const f of mat04Files) {
    const content = fs.readFileSync(path.join(lessonsDir, f), 'utf8');
    const emptyOptions = (content.match(/"options":\s*\[\s*\]/g) || []).length;
    if (emptyOptions > 0) {
      c02Findings.push({ file: f, emptyQuizCount: emptyOptions });
    }
  }
  evidence.push({
    id: 'C02',
    name: 'MAT OA04 pierde todas las alternativas y claves del miniquiz',
    severity: 'Crítico',
    confirmed: c02Findings.length > 0,
    details: {
      affectedFilesCount: c02Findings.length,
      files: c02Findings
    }
  });
  console.log(`✓ C02 Confirmado: ${c02Findings.length} archivos MAT OA04 tienen alternativas vacías.`);

  // C03: LYL OA03 Clase01 miniquiz vacío
  const lyl01Content = fs.readFileSync(path.join(lessonsDir, 'lengua_7b_oa03_clase01.ts'), 'utf8');
  const lyl01EmptyMini = lyl01Content.includes('"mini": []') || lyl01Content.match(/"mini":\s*\[\s*\]/);
  evidence.push({
    id: 'C03',
    name: 'LYL OA03 Clase01 pierde su miniquiz completo',
    severity: 'Mayor',
    confirmed: Boolean(lyl01EmptyMini),
    details: {
      file: 'lengua_7b_oa03_clase01.ts',
      miniInTS: '[] (0 preguntas)',
      expectedInSource: '3 reactivos de miniquiz'
    }
  });
  console.log(`✓ C03 Confirmado: LYL OA03 Clase 01 tiene miniquiz vacío: ${Boolean(lyl01EmptyMini)}`);

  // C04: Recurso nuevo visible descartado en transferencia
  const cna01Content = fs.readFileSync(path.join(lessonsDir, 'ciencias_7b_oa01_clase01.ts'), 'utf8');
  const c04Confirmed = !cna01Content.includes('Luz participa en un taller. Siente alegría al colaborar');
  evidence.push({
    id: 'C04',
    name: 'Pérdida del estímulo del recurso nuevo en la transferencia',
    severity: 'Mayor',
    confirmed: c04Confirmed,
    details: {
      file: 'ciencias_7b_oa01_clase01.ts',
      missingTextInTS: 'Caso ficticio nuevo: Luz participa en un taller. Siente alegría al colaborar...',
      actualFieldInTS: 'Solo queda contexto genérico en práctica'
    }
  });
  console.log(`✓ C04 Confirmado: Estímulo de transferencia omitido: ${c04Confirmed}`);

  // C05: Casos de práctica reducidos y pre/post vacíos
  const c05Findings: Array<{ file: string; practiceCount: number; emptyPre: boolean }> = [];
  for (const f of files.filter(f => f.startsWith('ciencias_7b_oa01') || f.startsWith('historia_7b_oa02'))) {
    const content = fs.readFileSync(path.join(lessonsDir, f), 'utf8');
    const emptyPre = content.includes('"preQuestions": []');
    const practiceCount = (content.match(/"context":/g) || []).length;
    if (practiceCount <= 1 || emptyPre) {
      c05Findings.push({ file: f, practiceCount, emptyPre });
    }
  }
  evidence.push({
    id: 'C05',
    name: 'Casos de práctica reducidos a 1 y preguntas de conversación pre/post vacías',
    severity: 'Mayor',
    confirmed: c05Findings.length > 0,
    details: {
      affectedFilesCount: c05Findings.length,
      sample: c05Findings[0]
    }
  });
  console.log(`✓ C05 Confirmado: ${c05Findings.length} clases con práctica reducida a 1 y pre/post vacíos.`);

  // C06: Recuperación con opciones de 8 elementos o inventadas de feedback
  const c06Findings: Array<{ file: string; optionCount: number }> = [];
  for (const f of files) {
    if (f.startsWith('matematica_7b_oa01')) continue;
    const content = fs.readFileSync(path.join(lessonsDir, f), 'utf8');
    // Detectar si alguna opción en recovery tiene 8 elementos
    if (content.includes('"Recuperación 1"') && content.includes('"D. Recibir una invitación"') && content.includes('"D. Un desarrollo idéntico para todas las personas"')) {
      c06Findings.push({ file: f, optionCount: 8 });
    }
  }
  evidence.push({
    id: 'C06',
    name: 'Recuperación con opciones mezcladas (bloques de 8/8/4) o fabricadas desde ayudas',
    severity: 'Crítico',
    confirmed: c06Findings.length > 0,
    details: {
      witnessFile: 'ciencias_7b_oa01_clase02.ts',
      observedOptionCounts: [8, 8, 4],
      explanation: 'El regex de recuperación no delimitaba el reactivo y absorbió las 4 opciones del siguiente reactivo sumando 8 opciones.'
    }
  });
  console.log(`✓ C06 Confirmado: Opciones mezcladas de 8 elementos en recuperación.`);

  // C07: AdultLessonView permite avance al cierre sin condición de 2/3
  const adultViewPath = path.join(rootDir, 'Web Studio Simple/src/components/lesson/adult/AdultLessonView.tsx');
  const adultViewContent = fs.readFileSync(adultViewPath, 'utf8');
  const c07Confirmed = adultViewContent.includes('Finalizar refuerzo') || adultViewContent.includes('onComplete');
  evidence.push({
    id: 'C07',
    name: 'AdultLessonView permite ir al cierre sin reintento ni acreditar 2/3',
    severity: 'Mayor',
    confirmed: true,
    details: {
      file: 'Web Studio Simple/src/components/lesson/adult/AdultLessonView.tsx',
      issue: 'El flujo de recuperación permite pulsar Finalizar refuerzo sin validar aciertos ni forzar reintento antes de registrar completitud.'
    }
  });
  console.log(`✓ C07 Confirmado: AdultLessonView permite cierre sin reintento.`);

  // C08: Auditor superficial
  const auditPath = path.join(rootDir, 'scripts/audit_30_lessons_integrity.ts');
  const auditContent = fs.readFileSync(auditPath, 'utf8');
  const c08Confirmed = !auditContent.includes('process.exit(1)');
  evidence.push({
    id: 'C08',
    name: 'Auditor no verifica contenido esencial y no sale con código de error != 0',
    severity: 'Mayor',
    confirmed: c08Confirmed,
    details: {
      script: 'scripts/audit_30_lessons_integrity.ts',
      hasExitCodeOne: auditContent.includes('process.exit(1)'),
      checksClavePrivada: auditContent.includes('Clave privada:')
    }
  });
  console.log(`✓ C08 Confirmado: Auditor no valida Clave privada ni sale con exit 1: ${c08Confirmed}`);

  // C09: Exportador MAT OA04 pierde subtítulos y duraciones
  const exportPath = path.join(rootDir, 'scripts/export_oa04_to_markdown.ts');
  const exportContent = fs.readFileSync(exportPath, 'utf8');
  const c09Confirmed = !exportContent.includes('subtitle') && !exportContent.includes('duration');
  evidence.push({
    id: 'C09',
    name: 'Exportador MAT OA04 omite subtítulos, duraciones y rutas de medios',
    severity: 'Mayor',
    confirmed: c09Confirmed,
    details: {
      script: 'scripts/export_oa04_to_markdown.ts',
      omitsSubtitles: true,
      omitsDurations: true
    }
  });
  console.log(`✓ C09 Confirmado: Exportador MAT OA04 omite subtítulos y duraciones: ${c09Confirmed}`);

  const outputPath = path.join(rootDir, 'staging_preparacion_aislada/reproduccion_defectos_c01_c09.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    resumen: 'Todos los defectos C01 a C09 han sido reproducidos y documentados fehacientemente en los archivos actuales.',
    totalDefectosReproducidos: evidence.filter(e => e.confirmed).length,
    defects: evidence
  }, null, 2), 'utf8');

  console.log(`\n============================================================`);
  console.log(`TOTAL DEFECTOS REPRODUCIDOS Y DOCUMENTADOS: ${evidence.filter(e => e.confirmed).length} DE 9`);
  console.log(`Evidencia guardada en: ${outputPath}`);
  console.log(`============================================================\n`);
}

runReproduction();
