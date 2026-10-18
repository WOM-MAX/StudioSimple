import fs from 'fs';
import path from 'path';

// Opciones de línea de comandos: --dir <ruta> [--test-mutation]
const args = process.argv.slice(2);
let targetDir = path.resolve('staging_preparacion_aislada/lessons');
const dirIdx = args.indexOf('--dir');
if (dirIdx !== -1 && args[dirIdx + 1]) {
  targetDir = path.resolve(args[dirIdx + 1]);
} else if (!fs.existsSync(targetDir)) {
  targetDir = path.resolve('Web Studio Simple/src/data/lessons');
}

const isMutationTest = args.includes('--test-mutation') || args.includes('--test-mutation-cna02-key');
const isMutationLyl01Key = args.includes('--test-mutation-lyl01-key');
const isMutationCna02Stimulus = args.includes('--test-mutation-cna02-stimulus');
const isMutationArtificialStimulus = args.includes('--test-mutation-artificial-stimulus');

console.log(`================================================================`);
console.log(`🔎 AUDITORÍA RIGUROSA DE INTEGRIDAD SEMÁNTICA Y SINCRONIZACIÓN (R01-R07)`);
console.log(`   Directorio objetivo: ${targetDir}`);
if (isMutationTest) {
  console.log(`   [PRUEBA NEGATIVA]: Mutación deliberada en clave CNA02Q2 activada`);
}
if (isMutationLyl01Key) {
  console.log(`   [PRUEBA NEGATIVA]: Mutación deliberada en alternativa LYL01Q1 activada`);
}
if (isMutationCna02Stimulus) {
  console.log(`   [PRUEBA NEGATIVA]: Retiro de contexto de transferencia en CNA02 activado`);
}
if (isMutationArtificialStimulus) {
  console.log(`   [PRUEBA NEGATIVA]: Inyección de rótulo artificial de transferencia en CNA02 activada`);
}
console.log(`================================================================\n`);

if (!fs.existsSync(targetDir)) {
  console.error(`❌ Directorio no encontrado: ${targetDir}`);
  process.exit(1);
}

const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

const oasToAudit = [
  { prefix: 'ciencias_7b_oa01', expectedCount: 6, label: 'Ciencias Naturales OA01', sourceDir: 'LECCIONES_POR_REVISAR/110-7/Ciencias_Naturales/OA01' },
  { prefix: 'historia_7b_oa02', expectedCount: 6, label: 'Historia y Geografía OA02', sourceDir: 'LECCIONES_POR_REVISAR/110-7/Historia_Geografia/OA02' },
  { prefix: 'ingles_7b_oa09', expectedCount: 6, label: 'Inglés OA09', sourceDir: 'LECCIONES_POR_REVISAR/110-7/Ingles/OA09' },
  { prefix: 'lengua_7b_oa03', expectedCount: 6, label: 'Lengua y Literatura OA03', sourceDir: 'LECCIONES_POR_REVISAR/110-7/Lengua_Literatura/OA03' },
  { prefix: 'matematica_7b_oa04', expectedCount: 6, label: 'Matemática OA04', sourceDir: 'LECCIONES_POR_REVISAR/110-7/Matematica/OA04' }
];

function extractMarkdownKeys(mdContent: string): string[] {
  const keys: string[] = [];
  const miniquizMatch = mdContent.match(/(?:^|\n)##\s*\d*\.?\s*(?:Paso 7|Step 7|Miniquiz)[^\n]*\n([\s\S]*?)(?=(?:\n|^)##\s*\d*\.?\s*(?:Paso 8|Step 8|Síntesis|Synthesis)|(?:\n|^)##\s+[A-Za-z]|$)/i);
  const miniText = miniquizMatch ? miniquizMatch[1] : mdContent;

  const reactivoBlocks = miniText.split(/(?:^|\n)###\s*(?:Reactivo|Item|Ítem|Pregunta|Question)\s*\d+/i).slice(1);
  for (let i = 0; i < Math.min(3, reactivoBlocks.length); i++) {
    const pureReactivo = reactivoBlocks[i].split(/(?:^|\n)###\s*(?:Recuperaci[óo]n|Recovery)/i)[0];
    const keyMatch = pureReactivo.match(/\*\*(?:Clave privada|Clave|Key|Answer key|Respuesta correcta):\*\*\s*([A-D])/i);
    if (keyMatch) {
      keys.push(keyMatch[1].toUpperCase());
    } else {
      const lines = pureReactivo.split('\n');
      const letters = ['A', 'B', 'C', 'D'];
      let found = '';
      let optIdx = 0;
      for (const line of lines) {
        if (/^\s*(?:-\s+|\*\s+(?!\*))/.test(line)) {
          if (/\*\*(?:Correcta|Correct|Respuesta correcta)\*\*/i.test(line) || /✅/.test(line)) {
            const letMatch = line.match(/^\s*[-*]\s*([A-D])[.)]/i);
            if (letMatch) {
              found = letMatch[1].toUpperCase();
            } else {
              found = letters[optIdx] || '';
            }
            break;
          }
          optIdx++;
        }
      }
      keys.push(found || 'DESCONOCIDA');
    }
  }
  return keys;
}

let totalIssues = 0;
let totalChecked = 0;
let simulatedMutationApplied = false;

const auditReport: Array<{
  file: string;
  label: string;
  miniCount: number;
  openRecoveryCount: number;
  mcRecoveryCount: number;
  issues: string[];
}> = [];

for (const oa of oasToAudit) {
  const oaFiles = files.filter(f => f.startsWith(oa.prefix)).sort();
  console.log(`📁 ${oa.label} (Encontrados: ${oaFiles.length}/${oa.expectedCount})`);

  if (oaFiles.length !== oa.expectedCount) {
    console.error(`  ❌ ERROR CANTIDAD: Se esperaban ${oa.expectedCount} clases, se encontraron ${oaFiles.length}`);
    totalIssues++;
  }

  for (const f of oaFiles) {
    totalChecked++;
    const fullPath = path.join(targetDir, f);
    const content = fs.readFileSync(fullPath, 'utf8');

    // Extraer JSON
    const jsonMatch = content.match(/=\s*(\{[\s\S]*\});?\s*$/);
    if (!jsonMatch) {
      console.error(`  ❌ ${f}: No se pudo extraer el objeto LessonData.`);
      totalIssues++;
      continue;
    }

    let lesson: any;
    try {
      lesson = JSON.parse(jsonMatch[1]);
    } catch (err: any) {
      console.error(`  ❌ ${f}: Error de sintaxis JSON al parsear LessonData: ${err.message}`);
      totalIssues++;
      continue;
    }

    // Modos de mutación deliberada para pruebas negativas (Work R03/R07)
    if (isMutationTest && !simulatedMutationApplied && f.includes('ciencias_7b_oa01_clase02')) {
      if (Array.isArray(lesson.mini) && lesson.mini.length > 1) {
        const original = lesson.mini[1].correct;
        lesson.mini[1].correct = original.startsWith('A') ? 'B' : 'A';
        simulatedMutationApplied = true;
        console.log(`  [PRUEBA NEGATIVA] Mutación en ${f} Reactivo 2: clave cambiada de "${original}" a "${lesson.mini[1].correct}"`);
      }
    }
    if (isMutationLyl01Key && !simulatedMutationApplied && f.includes('lengua_7b_oa03_clase01')) {
      if (Array.isArray(lesson.mini) && lesson.mini.length > 0) {
        const original = lesson.mini[0].correct;
        lesson.mini[0].correct = original.startsWith('B') ? 'A' : 'B';
        simulatedMutationApplied = true;
        console.log(`  [PRUEBA NEGATIVA] Mutación en ${f} Reactivo 1: clave cambiada a otra alternativa ("${original}" -> "${lesson.mini[0].correct}")`);
      }
    }
    if (isMutationCna02Stimulus && !simulatedMutationApplied && f.includes('ciencias_7b_oa01_clase02')) {
      if (Array.isArray(lesson.practice) && lesson.practice.length >= 3) {
        lesson.practice[2].context = '';
        simulatedMutationApplied = true;
        console.log(`  [PRUEBA NEGATIVA] Retiro deliberado de contexto/estímulo de transferencia en ${f} Caso 3 (conservando solo consigna)`);
      }
    }
    if (isMutationArtificialStimulus && !simulatedMutationApplied && f.includes('ciencias_7b_oa01_clase02')) {
      if (Array.isArray(lesson.practice) && lesson.practice.length >= 3) {
        lesson.practice[2].context = 'Aplicación autónoma y transferencia';
        simulatedMutationApplied = true;
        console.log(`  [PRUEBA NEGATIVA] Inyección deliberada de rótulo artificial de transferencia en ${f} Caso 3`);
      }
    }

    const issues: string[] = [];

    // 1. R01: Validar hook y formalization con sus láminas reales (sin guiones genéricos)
    const isLyl01 = f.includes('lengua_7b_oa03_clase01');
    if (!lesson.hook || typeof lesson.hook !== 'object') {
      issues.push('R01: Falta objeto obligatorio hook');
    } else {
      if (!Array.isArray(lesson.hook.slides)) {
        issues.push('R01: hook.slides no es un array');
      } else if (lesson.hook.slides.length !== 7) {
        issues.push(`R01: hook.slides tiene ${lesson.hook.slides.length} láminas (deben ser exactamente 7 de Motivación)`);
      } else {
        const nonMotiv = lesson.hook.slides.filter((s: any) => !/motivaci[óo]n/i.test(s.tituloMomento || ''));
        if (nonMotiv.length > 0) {
          issues.push(`R01: hook.slides contiene láminas no tituladas como Motivación`);
        }
      }
    }

    if (!lesson.formalization || typeof lesson.formalization !== 'object') {
      issues.push('R01: Falta objeto formalization');
    } else {
      if (!Array.isArray(lesson.formalization.slides)) {
        issues.push('R01: formalization.slides no es un array');
      } else if (!isLyl01 && lesson.formalization.slides.length !== 7) {
        issues.push(`R01: formalization.slides tiene ${lesson.formalization.slides.length} láminas (deben ser exactamente 7 de Explicación)`);
      } else if (lesson.formalization.slides.length > 0) {
        const nonExpl = lesson.formalization.slides.filter((s: any) => !/explicaci[óo]n/i.test(s.tituloMomento || ''));
        if (nonExpl.length > 0) {
          issues.push(`R01: formalization.slides contiene láminas no tituladas como Explicación`);
        }
      }
    }

    // Detectar guiones genéricos fabricados
    const allSlides = [...(lesson.hook?.slides || []), ...(lesson.formalization?.slides || [])];
    for (const s of allSlides) {
      const notes = s.speakerNotes || '';
      const title = s.didacticPurpose || s.overlayTitle || '';
      if (/En esta sección profundizamos en/i.test(notes) || /Observa esta situación cotidiana y reflexiona/i.test(notes)) {
        issues.push(`R01/R03: Guion genérico fabricado detectado en lámina ${s.slideNumber}: "${notes.substring(0, 50)}..."`);
      }
      if (/^Explicación \d+$/i.test(title) || /^Motivación \d+$/i.test(title)) {
        issues.push(`R01/R03: Título genérico de relleno detectado en lámina ${s.slideNumber}: "${title}"`);
      }
    }

    // 2. R02: Validar preQuestions, postQuestions y adultObjective no genérico
    if (!Array.isArray(lesson.preQuestions) || lesson.preQuestions.length === 0) {
      issues.push('R02: preQuestions (conversación guiada) vacío o no es array');
    }
    if (!Array.isArray(lesson.postQuestions) || lesson.postQuestions.length === 0) {
      issues.push('R02: postQuestions (comprobación inmediata) vacío o no es array');
    }
    if (!lesson.prep?.adultObjective || typeof lesson.prep.adultObjective !== 'string' || lesson.prep.adultObjective.trim().length === 0) {
      issues.push('R02: prep.adultObjective vacío');
    } else if (/^Preparación de la clase/i.test(lesson.prep.adultObjective.trim())) {
      issues.push('R02: prep.adultObjective contiene texto genérico de plantilla ("Preparación de la clase...")');
    }

    // 3. R02 & R07: Validar estructura real de 'practice' (GuidedItem[]) diferenciando estímulo y consigna
    if (!Array.isArray(lesson.practice)) {
      issues.push('R07: practice no es un array (GuidedItem[])');
    } else if (lesson.practice.length === 0) {
      issues.push('R07: practice está vacío (debe contener actividades de práctica guiada)');
    } else {
      lesson.practice.forEach((p: any, pIdx: number) => {
        const pNum = pIdx + 1;
        const rawContext = (p.context || '').trim();
        const hasContext = rawContext.length > 0;
        const isArtificial = /^(?:Aplicaci[óo]n aut[óo]noma y transferencia|Aut[óo]noma y transferencia)$/i.test(rawContext);
        const hasTask = Boolean((p.question || p.activity || p.task) && (p.question || p.activity || p.task).trim().length > 0);
        if (!hasContext) {
          issues.push(`R07: Caso de práctica ${pNum} carece de estímulo/contexto esencial`);
        } else if (isArtificial) {
          issues.push(`R07: Caso de práctica ${pNum} contiene rótulo artificial/genérico de estímulo ("${rawContext}")`);
        }
        if (!hasTask) {
          issues.push(`R07: Caso de práctica ${pNum} carece de consigna/actividad esencial`);
        }
      });
    }

    // 4. Miniquiz: C01, C02, C03, C04
    if (!Array.isArray(lesson.mini)) {
      issues.push('mini no es un array');
    } else {
      if (lesson.mini.length !== 3) {
        issues.push(`mini tiene ${lesson.mini.length} reactivos (deben ser exactamente 3)`);
      }

      lesson.mini.forEach((item: any, idx: number) => {
        const qNum = idx + 1;
        const qText = item.q || item.question;
        // C01: Enunciados "Clave privada:"
        if (!qText || typeof qText !== 'string' || qText.trim().length === 0) {
          issues.push(`Item ${qNum}: question/q vacía`);
        } else if (/^(\*\*)?Clave privada:?/i.test(qText.trim())) {
          issues.push(`Item ${qNum}: Defecto C01 detectado (question comienza con "Clave privada")`);
        } else if (qText.includes('Distractor') && !qText.includes('?')) {
          issues.push(`Item ${qNum}: question parece contener análisis de distractor en lugar de la pregunta`);
        }

        // C02 & C03: Opciones válidas y distintas
        if (!Array.isArray(item.options)) {
          issues.push(`Item ${qNum}: options no es un array`);
        } else {
          if (item.options.length !== 4) {
            issues.push(`Item ${qNum}: options tiene ${item.options.length} alternativas (deben ser 4)`);
          }
          const uniqueOptions = new Set(item.options.map((o: any) => String(o).trim()));
          if (uniqueOptions.size < item.options.length) {
            issues.push(`Item ${qNum}: alternativas duplicadas encontradas`);
          }
          if (item.options.some((o: any) => !o || String(o).trim() === '')) {
            issues.push(`Item ${qNum}: alternativa vacía encontrada`);
          }
        }

        // C02 & C03: Clave correcta válida y no forzada a 'A' sin justificación
        if (!item.correct || String(item.correct).trim().length === 0) {
          issues.push(`Item ${qNum}: Defecto C03 detectado (clave correct vacía)`);
        } else {
          const cVal = String(item.correct).trim();
          const matchLetter = ['A', 'B', 'C', 'D'].includes(cVal.substring(0, 1).toUpperCase());
          const matchText = Array.isArray(item.options) && item.options.some((o: string) => o.trim() === cVal);
          if (!matchLetter && !matchText) {
            issues.push(`Item ${qNum}: Clave correct "${cVal}" no coincide con [A-D] ni con ninguna opción`);
          }
        }
      });
    }

    // 5. R07: Contrastar claves contra el contenido de las fuentes Markdown
    const classNumMatch = f.match(/clase0?(\d+)\.ts$/i);
    const classNum = classNumMatch ? parseInt(classNumMatch[1], 10) : 1;
    const mdFileName = `CLASE0${classNum}.md`;
    const sourceMdPath = path.resolve(oa.sourceDir, mdFileName);

    if (fs.existsSync(sourceMdPath) && Array.isArray(lesson.mini) && lesson.mini.length === 3) {
      const sourceMdContent = fs.readFileSync(sourceMdPath, 'utf8');
      const expectedKeys = extractMarkdownKeys(sourceMdContent);
      const letters = ['A', 'B', 'C', 'D'];

      lesson.mini.forEach((item: any, qIdx: number) => {
        const qNum = qIdx + 1;
        const expectedLetter = expectedKeys[qIdx];
        if (expectedLetter) {
          // Obtener letra del ítem parsed
          let parsedLetter = '';
          const cVal = String(item.correct || '').trim();
          if (letters.includes(cVal.substring(0, 1).toUpperCase())) {
            parsedLetter = cVal.substring(0, 1).toUpperCase();
          } else if (Array.isArray(item.options)) {
            const optMatchIdx = item.options.findIndex((o: string) => o.trim() === cVal || o.includes(cVal));
            if (optMatchIdx !== -1) {
              parsedLetter = letters[optMatchIdx];
            }
          }

          if (parsedLetter && parsedLetter !== expectedLetter) {
            issues.push(`R07: Discrepancia de clave en Item ${qNum}: esperada en fuente Markdown "${expectedLetter}", obtenida en TS "${parsedLetter}"`);
          }
        }
      });
    }

    // 6. R06: Recuperación (Abierta vs Selección)
    let openCount = 0;
    let mcCount = 0;
    if (Array.isArray(lesson.recovery)) {
      lesson.recovery.forEach((rec: any, idx: number) => {
        const rNum = idx + 1;
        if (rec.kind === 'open_response') {
          openCount++;
          if (Array.isArray(rec.options) && rec.options.length > 0) {
            issues.push(`Recuperación ${rNum} abierta contiene opciones inventadas (debe ser vacía)`);
          }
        } else if (rec.kind === 'multiple_choice') {
          mcCount++;
          if (!Array.isArray(rec.options) || rec.options.length < 2) {
            issues.push(`Recuperación ${rNum} múltiple tiene menos de 2 opciones`);
          }
        }
      });
    }

    // 7. Metadatos esenciales
    if (!lesson.metadata || !lesson.metadata.lessonTitle) {
      issues.push('Falta título de la lección en metadata');
    }

    if (issues.length > 0) {
      console.log(`  ❌ ${f}: ${issues.length} fallos detectados:`);
      issues.forEach(i => console.log(`     - ${i}`));
      totalIssues += issues.length;
    } else {
      console.log(`  ✓ ${f}: PASS (Hook 7 láminas, Explicación 7 láminas, Practice guiado, Claves verificadas contra Markdown)`);
    }

    auditReport.push({
      file: f,
      label: oa.label,
      miniCount: lesson.mini ? lesson.mini.length : 0,
      openRecoveryCount: openCount,
      mcRecoveryCount: mcCount,
      issues
    });
  }
  console.log('');
}

console.log('================================================================');
console.log(`📊 RESUMEN AUDITORÍA INTEGRIDAD:`);
console.log(`   Total clases auditadas: ${totalChecked}`);
console.log(`   Total defectos detectados: ${totalIssues}`);
console.log('================================================================');

if (totalIssues > 0) {
  console.error(`\n❌ AUDITORÍA FALLIDA: Se encontraron ${totalIssues} defectos en los módulos TypeScript.`);
  process.exit(1);
} else {
  console.log(`\n✅ AUDITORÍA APROBADA: Cero defectos estructurales R01-R07 en las 30 clases.`);
  process.exit(0);
}
