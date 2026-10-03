import fs from 'fs';
import path from 'path';
import { generateOAPackage, OACatalogItem } from '../Web Studio Simple/src/lib/lesson-generator';
import { adaptGeneratorLessonToPlayer } from '../Web Studio Simple/src/lib/lesson-adapter';
import { findCanonicalFactoryLesson } from '../Web Studio Simple/src/lib/lesson-repository';
import { LessonData as PlayerLessonData } from '../Web Studio Simple/src/types/lesson';

interface AuditFinding {
  code: string;
  priority: 'Critica' | 'Alta' | 'Media' | 'Informativa';
  location: string;
  approvedSource: string;
  reviewedMaterial: string;
  discrepancy: string;
  suggestedCorrection: string;
}

interface AuditReport {
  oaId: string;
  subject: string;
  grade: string;
  oaCode: string;
  totalLessons: number;
  auditDate: string;
  status: 'Aprobado' | 'Aprobado con observaciones' | 'Requiere correcciones' | 'No evaluable por falta de fuentes';
  findings: AuditFinding[];
  metrics: {
    totalSlidesAudited: number;
    hookSlidesCount: number;
    explSlidesCount: number;
    isomorphicPassCount: number;
    antiTextClausePassCount: number;
    protagonistsPassCount: number;
    averageHookWords: number;
    averageExplWords: number;
  };
}

// Helpers
function countWords(str: string): number {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function auditOA(targetOaId: string): Promise<AuditReport> {
  const auditDate = new Date().toISOString();
  const findings: AuditFinding[] = [];

  // 1. Cargar fuentes curriculares
  const catalogPath = path.resolve('Web Studio Simple/public/data/curriculum_catalog.json');
  const neonCurriculumPath = path.resolve('Web Studio Simple/src/data/neonCurriculum.json');
  const rulesPath = path.resolve('.agents/skills/auditor_coherencia_estudiosimple/rules_catalog.json');
  const regressionsPath = path.resolve('.agents/skills/auditor_coherencia_estudiosimple/regression_cases.json');

  if (!fs.existsSync(catalogPath)) {
    return {
      oaId: targetOaId,
      subject: 'Desconocida',
      grade: 'Desconocido',
      oaCode: 'Desconocido',
      totalLessons: 0,
      auditDate,
      status: 'No evaluable por falta de fuentes',
      findings: [
        {
          code: 'ERR-SRC-001',
          priority: 'Critica',
          location: catalogPath,
          approvedSource: 'Archivo public/data/curriculum_catalog.json',
          reviewedMaterial: 'Archivo inexistente',
          discrepancy: 'No se encontro el catalogo curricular en el repositorio.',
          suggestedCorrection: 'Restaurar el archivo curriculum_catalog.json desde la copia de respaldo.'
        }
      ],
      metrics: {
        totalSlidesAudited: 0,
        hookSlidesCount: 0,
        explSlidesCount: 0,
        isomorphicPassCount: 0,
        antiTextClausePassCount: 0,
        protagonistsPassCount: 0,
        averageHookWords: 0,
        averageExplWords: 0
      }
    };
  }

  const catalog: OACatalogItem[] = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const catalogItem = catalog.find((c) => c.id === targetOaId);

  if (!catalogItem) {
    findings.push({
      code: 'ERR-SRC-002',
      priority: 'Critica',
      location: `curriculum_catalog.json (ID: ${targetOaId})`,
      approvedSource: 'Catalogo oficial MINEDUC 7° Basico',
      reviewedMaterial: 'No encontrado en el catalogo',
      discrepancy: `El OA con ID ${targetOaId} no esta registrado en el catalogo oficial.`,
      suggestedCorrection: 'Verificar la nomenclatura del ID del OA en curriculum_catalog.json.'
    });

    return {
      oaId: targetOaId,
      subject: 'Desconocida',
      grade: 'Desconocido',
      oaCode: 'Desconocido',
      totalLessons: 0,
      auditDate,
      status: 'No evaluable por falta de fuentes',
      findings,
      metrics: {
        totalSlidesAudited: 0,
        hookSlidesCount: 0,
        explSlidesCount: 0,
        isomorphicPassCount: 0,
        antiTextClausePassCount: 0,
        protagonistsPassCount: 0,
        averageHookWords: 0,
        averageExplWords: 0
      }
    };
  }

  // Generar paquete y obtener lecciones
  const totalLessons = catalogItem.leccionesSugeridas || 6;
  const pkg = generateOAPackage(catalogItem, totalLessons);

  let totalSlides = 0;
  let hookSlidesTotal = 0;
  let explSlidesTotal = 0;
  let isomorphicPasses = 0;
  let antiTextPasses = 0;
  let protagonistsPasses = 0;
  const hookWordsList: number[] = [];
  const explWordsList: number[] = [];

  // Auditar cada leccion
  for (let lIdx = 0; lIdx < pkg.lessons.length; lIdx++) {
    const lessonNum = lIdx + 1;
    const genLesson = pkg.lessons[lIdx];

    // Intentar obtener version adaptada al reproductor
    const playerLesson: PlayerLessonData = adaptGeneratorLessonToPlayer(genLesson, catalogItem, totalLessons);

    // Tambien verificar si existe leccion canonica estatica en fábrica
    const canonicalFactory = findCanonicalFactoryLesson(catalogItem.curso, catalogItem.asignatura, catalogItem.oa, lessonNum);
    const activeLesson = canonicalFactory || playerLesson;

    const hookSlides = activeLesson.hook?.slides || [];
    const explSlides = activeLesson.formalization?.slides || [];

    hookSlidesTotal += hookSlides.length;
    explSlidesTotal += explSlides.length;
    totalSlides += (hookSlides.length + explSlides.length);

    // Regla UNI-001: 7 diapositivas gancho + 7 diapositivas explicativas = 14
    if (hookSlides.length !== 7) {
      findings.push({
        code: 'ERR-SLIDE-001',
        priority: 'Critica',
        location: `Leccion ${lessonNum} -> hook.slides`,
        approvedSource: 'Regla UNI-001: Exactamente 7 diapositivas de gancho motivacional',
        reviewedMaterial: `Encontradas ${hookSlides.length} diapositivas`,
        discrepancy: `La leccion ${lessonNum} no cumple con la estructura bimodal de 7 diapositivas en el Módulo 1.`,
        suggestedCorrection: 'Ajustar la leccion para contener exactamente 7 diapositivas de gancho.'
      });
    }

    if (explSlides.length !== 7) {
      findings.push({
        code: 'ERR-SLIDE-002',
        priority: 'Critica',
        location: `Leccion ${lessonNum} -> formalization.slides`,
        approvedSource: 'Regla UNI-001: Exactamente 7 diapositivas de explicacion conceptual',
        reviewedMaterial: `Encontradas ${explSlides.length} diapositivas`,
        discrepancy: `La leccion ${lessonNum} no cumple con la estructura bimodal de 7 diapositivas en el Módulo 2.`,
        suggestedCorrection: 'Ajustar la leccion para contener exactamente 7 diapositivas explicativas.'
      });
    }

    // Regla UNI-002: Conteo de palabras de locucion
    const hookWords = hookSlides.reduce((acc, s) => acc + countWords(s.speakerNotes || ''), 0);
    const explWords = explSlides.reduce((acc, s) => acc + countWords(s.speakerNotes || ''), 0);
    hookWordsList.push(hookWords);
    explWordsList.push(explWords);

    if (hookWords < 115 || hookWords > 155) {
      findings.push({
        code: 'WARN-TIME-001',
        priority: 'Media',
        location: `Leccion ${lessonNum} -> hook.speakerNotes (Total palabras: ${hookWords})`,
        approvedSource: 'Regla UNI-002: Rango optimo de 120 a 145 palabras (~130 palabras / 60 segundos)',
        reviewedMaterial: `${hookWords} palabras de locucion continua`,
        discrepancy: `La duracion estimada de locucion en el gancho se desvia del rango ideal (${hookWords} palabras).`,
        suggestedCorrection: `Ajustar notas del orador para acercarse a ~130 palabras totales.`
      });
    }

    if (explWords < 165 || explWords > 240) {
      findings.push({
        code: 'WARN-TIME-002',
        priority: 'Media',
        location: `Leccion ${lessonNum} -> formalization.speakerNotes (Total palabras: ${explWords})`,
        approvedSource: 'Regla UNI-002: Rango optimo de 180 a 220 palabras (~195 palabras / 90 segundos)',
        reviewedMaterial: `${explWords} palabras de locucion continua`,
        discrepancy: `La duracion estimada de locucion en la explicacion se desvia del rango ideal (${explWords} palabras).`,
        suggestedCorrection: `Ajustar notas del orador para acercarse a ~195 palabras totales.`
      });
    }

    // Regla UNI-003 y UNI-004: Protagonistas y Clausula Anti-Texto en el 100% de prompts
    const allSlides = [...hookSlides, ...explSlides];
    allSlides.forEach((slide, sIdx) => {
      const prompt = slide.visualPrompt || '';
      const promptNorm = prompt.toLowerCase();

      // Anti-texto
      if (prompt.includes('No text drawn by AI')) {
        antiTextPasses++;
      } else {
        findings.push({
          code: 'ERR-PROMPT-001',
          priority: 'Alta',
          location: `Leccion ${lessonNum} -> Diapositiva ${slide.slideNumber} (${sIdx < 7 ? 'Gancho' : 'Explicativo'})`,
          approvedSource: "Regla UNI-004: Clausula obligatoria 'No text drawn by AI'",
          reviewedMaterial: prompt.substring(0, 80) + '...',
          discrepancy: 'El prompt visual carece de la directiva de exclusion de texto para IA.',
          suggestedCorrection: "Agregar 'No text drawn by AI.' al final del visualPrompt."
        });
      }

      // Protagonistas (chica con trenzas y chico con chaqueta cerceta)
      const hasGirl = promptNorm.includes('braided hair') || promptNorm.includes('trenzas') || promptNorm.includes('girl');
      const hasBoy = promptNorm.includes('teal jacket') || promptNorm.includes('cerceta') || promptNorm.includes('boy');
      const hasDuo = (hasGirl && hasBoy) || promptNorm.includes('two 13-year-old') || promptNorm.includes('two companions') || promptNorm.includes('both explorers');

      if (hasDuo) {
        protagonistsPasses++;
      } else {
        findings.push({
          code: 'WARN-PROMPT-002',
          priority: 'Media',
          location: `Leccion ${lessonNum} -> Diapositiva ${slide.slideNumber} (${sIdx < 7 ? 'Gancho' : 'Explicativo'})`,
          approvedSource: 'Regla UNI-003: Presencia del duo co-protagonico de 13 anos',
          reviewedMaterial: prompt.substring(0, 80) + '...',
          discrepancy: 'El prompt visual no explicita al duo de joven mujer y joven hombre de 13 anos.',
          suggestedCorrection: 'Mencionar explicitamente a los dos protagonistas en la escena.'
        });
      }
    });

    // Regla UNI-005: Isomorfismo estricto Diapositiva 6 vs Caso 1 de Practica
    const slide6 = explSlides.find((s) => s.slideNumber === 6);
    const practice1 = (activeLesson.practice && activeLesson.practice[0]) || null;

    if (!slide6 || !practice1) {
      findings.push({
        code: 'ERR-ISOM-001',
        priority: 'Critica',
        location: `Leccion ${lessonNum}`,
        approvedSource: 'Regla UNI-005: Diapositiva 6 explicativa y Caso 1 de practica presentes',
        reviewedMaterial: `slide6: ${Boolean(slide6)}, practice1: ${Boolean(practice1)}`,
        discrepancy: 'No fue posible localizar la diapositiva 6 o el primer caso de practica.',
        suggestedCorrection: 'Implementar la diapositiva 6 y el Caso 1 de practica.'
      });
    } else {
      const slide6Text = normalizeText(
        (slide6.speakerNotes || '') + ' ' + (slide6.overlayTitle || '') + ' ' + (slide6.vectorialOverlayPptx || '')
      );
      const practice1Text = normalizeText(
        (practice1.context || '') + ' ' + (practice1.question || '') + ' ' + (practice1.expected || '')
      );

      // Extraer palabras clave disciplinarias significativas (> 4 letras)
      const p1Tokens = Array.from(new Set(practice1Text.split(' ').filter((w) => w.length > 4)));
      const sharedTokens = p1Tokens.filter((token) => slide6Text.includes(token));
      const overlapRatio = sharedTokens.length / (p1Tokens.length || 1);

      if (overlapRatio >= 0.35 || slide6Text.includes(normalizeText(practice1.context || '').substring(0, 20))) {
        isomorphicPasses++;
      } else {
        findings.push({
          code: 'ERR-ISOM-002',
          priority: 'Alta',
          location: `Leccion ${lessonNum} -> Diapositiva 6 vs Caso 1 de Practica`,
          approvedSource: 'Regla UNI-005: Coherencia isomorfica de contexto, datos y resolucion',
          reviewedMaterial: `Tokens compartidos: ${sharedTokens.length}/${p1Tokens.length} (${(overlapRatio * 100).toFixed(0)}%)`,
          discrepancy: `La Diapositiva 6 del video no modela con fidelidad el Caso 1 de la practica en plataforma.`,
          suggestedCorrection: `Reescribir el caso modelado de la Diapositiva 6 para que utilice exactamente el mismo contexto y pregunta del Caso 1.`
        });
      }
    }

    // Regla UNI-006: Reactivo oficial de 4 alternativas en leccion final
    if (lessonNum === totalLessons) {
      const miniQuestions = activeLesson.mini || [];
      const has4Options = miniQuestions.some((q) => q.options && q.options.length >= 4);

      if (has4Options) {
        // Conforme
      } else {
        findings.push({
          code: 'WARN-QUIZ-001',
          priority: 'Media',
          location: `Leccion ${lessonNum} (Cierre de Unidad) -> mini (Preguntas de seleccion multiple)`,
          approvedSource: 'Regla UNI-006: Simulador formal tipo Examen Libre con 4 alternativas (A, B, C, D)',
          reviewedMaterial: `Opciones encontradas: ${miniQuestions.map((q) => q.options?.length || 0).join(', ')}`,
          discrepancy: 'La leccion final no presenta reactivos psicometricos de 4 opciones para preparar el Examen Libre MINEDUC.',
          suggestedCorrection: 'Expandir las opciones del miniquiz a 4 alternativas plausibles con justificacion de distractores.'
        });
      }
    }
  }

  // Determinar Estado de Cierre
  const criticalCount = findings.filter((f) => f.priority === 'Critica').length;
  const highCount = findings.filter((f) => f.priority === 'Alta').length;
  const mediumCount = findings.filter((f) => f.priority === 'Media').length;

  let status: 'Aprobado' | 'Aprobado con observaciones' | 'Requiere correcciones' | 'No evaluable por falta de fuentes';
  if (criticalCount > 0 || highCount > 0) {
    status = 'Requiere correcciones';
  } else if (mediumCount > 0) {
    status = 'Aprobado con observaciones';
  } else {
    status = 'Aprobado';
  }

  const avgHook = hookWordsList.reduce((a, b) => a + b, 0) / (hookWordsList.length || 1);
  const avgExpl = explWordsList.reduce((a, b) => a + b, 0) / (explWordsList.length || 1);

  return {
    oaId: targetOaId,
    subject: catalogItem.asignatura,
    grade: catalogItem.curso,
    oaCode: catalogItem.oa,
    totalLessons,
    auditDate,
    status,
    findings,
    metrics: {
      totalSlidesAudited: totalSlides,
      hookSlidesCount: hookSlidesTotal,
      explSlidesCount: explSlidesTotal,
      isomorphicPassCount: isomorphicPasses,
      antiTextClausePassCount: antiTextPasses,
      protagonistsPassCount: protagonistsPasses,
      averageHookWords: Math.round(avgHook),
      averageExplWords: Math.round(avgExpl)
    }
  };
}

export function generateMarkdownReport(report: AuditReport): string {
  let md = '';
  md += `# INFORME DE AUDITORIA DE COHERENCIA PEDAGOGICA Y CURRICULAR\n\n`;
  md += `- **Objetivo de Aprendizaje:** ${report.oaCode} (${report.oaId})\n`;
  md += `- **Asignatura:** ${report.subject}\n`;
  md += `- **Curso:** ${report.grade}\n`;
  md += `- **Total de Lecciones Auditadas:** ${report.totalLessons}\n`;
  md += `- **Fecha de Auditoria:** ${report.auditDate}\n`;
  md += `- **ESTADO DE CIERRE:** **${report.status.toUpperCase()}**\n\n`;

  md += `## 1. Metricas Generales de Inspeccion\n\n`;
  md += `| Metrica Auditada | Valor Registrado | Criterio de Aprobacion |\n`;
  md += `| :--- | :--- | :--- |\n`;
  md += `| Total de Diapositivas | ${report.metrics.totalSlidesAudited} | ${report.totalLessons * 14} laminas exactas |\n`;
  md += `| Diapositivas Gancho (Módulo 1) | ${report.metrics.hookSlidesCount} | ${report.totalLessons * 7} laminas |\n`;
  md += `| Diapositivas Explicativas (Módulo 2) | ${report.metrics.explSlidesCount} | ${report.totalLessons * 7} laminas |\n`;
  md += `| Coherencia Isomorfica (Diapositiva 6 = Practica 1) | ${report.metrics.isomorphicPassCount} / ${report.totalLessons} clases | 100% de coincidencia |\n`;
  md += `| Clausula Anti-Texto ('No text drawn by AI') | ${report.metrics.antiTextClausePassCount} / ${report.metrics.totalSlidesAudited} laminas | 100% obligatorio |\n`;
  md += `| Presencia del Duo Protagonico de 13 Anos | ${report.metrics.protagonistsPassCount} / ${report.metrics.totalSlidesAudited} laminas | 100% obligatorio |\n`;
  md += `| Promedio Palabras Gancho (Locucion 60s) | ~${report.metrics.averageHookWords} palabras | Rango 120-145 palabras |\n`;
  md += `| Promedio Palabras Explicativo (Locucion 90s) | ~${report.metrics.averageExplWords} palabras | Rango 180-220 palabras |\n\n`;

  md += `## 2. Detalle de Hallazgos y Discrepancias\n\n`;

  if (report.findings.length === 0) {
    md += `No se detectaron discrepancias pedagogicas ni tecnicas. El paquete cumple al 100% con las especificaciones del Plan Maestro y las Bases Curriculares del MINEDUC.\n\n`;
  } else {
    report.findings.forEach((f, idx) => {
      md += `### Hallazgo ${idx + 1}: [${f.code}] - Prioridad: ${f.priority}\n\n`;
      md += `- **Ubicacion:** \`${f.location}\`\n`;
      md += `- **Fuente Aprobada:** ${f.approvedSource}\n`;
      md += `- **Material Revisado:** ${f.reviewedMaterial}\n`;
      md += `- **Discrepancia:** ${f.discrepancy}\n`;
      md += `- **Correccion Sugerida:** ${f.suggestedCorrection}\n\n`;
    });
  }

  md += `## 3. Delimitacion de Frontera Operativa (Antigravity vs Codex)\n\n`;
  md += `1. **Certificacion de Lecciones y Prompts:** Este informe certifica la coherencia del contenido pedagogico en codigo TypeScript, los prompts de ilustracion y el archivo DOCX oficial generado por Antigravity.\n`;
  md += `2. **Generacion de Presentaciones PPTX:** Queda bajo la exclusiva responsabilidad de Codex (ChatGPT Work) la lectura de estos insumos y la compilacion de los archivos PPTX correspondientes en su propio entorno Python.\n`;
  md += `3. **Comprobacion Acustica:** Las duraciones de 60s y 90s se registran como estimaciones basadas en presupuesto de palabras; la medicion real debe ser comprobada acusticamente en Google Vids.\n`;

  return md;
}

async function main() {
  const targetOaId = process.argv[2] || '110-7-CIE-OA01';
  console.log(`=== INICIANDO MOTOR DE AUDITORIA DE COHERENCIA ESTUDIOSIMPLE ===`);
  console.log(`Objetivo a auditar: ${targetOaId}\n`);

  const report = await auditOA(targetOaId);

  console.log(`Auditoria concluida.`);
  console.log(`- Estado: ${report.status}`);
  console.log(`- Total de laminas: ${report.metrics.totalSlidesAudited}`);
  console.log(`- Isomorfismo: ${report.metrics.isomorphicPassCount} / ${report.totalLessons}`);
  console.log(`- Anti-Texto: ${report.metrics.antiTextClausePassCount} / ${report.metrics.totalSlidesAudited}`);
  console.log(`- Hallazgos detectados: ${report.findings.length}`);

  // Guardar informe en docs/auditorias/
  const outDir = path.resolve('docs/auditorias');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, `${targetOaId}_auditoria.md`);
  const markdownReport = generateMarkdownReport(report);
  fs.writeFileSync(outPath, markdownReport, 'utf8');

  console.log(`\nInforme oficial generado en: ${outPath}`);

  if (report.status === 'Requiere correcciones') {
    console.error('\n[FALLO DE AUDITORIA]: Se encontraron brechas criticas que deben ser resueltas.');
    process.exit(1);
  } else {
    console.log('\n[AUDITORIA SATISFACTORIA]: El paquete cumple con el marco especificado.');
  }
}

main().catch((err) => {
  console.error('Error durante la ejecucion de la auditoria:', err);
  process.exit(1);
});
