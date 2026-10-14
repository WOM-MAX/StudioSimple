import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import * as ALL_CANONICAL_LESSONS from '../src/data/lessons/index';
import { LessonData, GuidedItem, QuizQuestion, RecoveryItem } from '../src/types/lesson';
import { adaptPlayerLessonToGenerator } from '../src/lib/lesson-adapter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APP_ROOT = path.resolve(__dirname, '..');
const PROJECT_ROOT = path.resolve(APP_ROOT, '..');

export type PipelineMode = 'validate' | 'dry-run' | 'build';

export interface ValidationIssue {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  valid: boolean;
  lessonKey: string;
  oaId: string;
  issues: ValidationIssue[];
  normalizedHash: string;
}

export interface PipelineOptions {
  lessonKey?: string;
  mode: PipelineMode;
  targetFolder?: 'LECCIONES_POR_REVISAR' | 'LECCIONES';
}

/**
 * Normaliza el contenido de la lección para cálculo de huella digital de contenido
 * Ignora marcas volátiles como fecha/hora de generación para asegurar reproducibilidad.
 */
export function computeContentHash(lesson: LessonData): string {
  const norm = {
    metadata: {
      grade: lesson.metadata.grade,
      subject: lesson.metadata.subject,
      oaCode: lesson.metadata.oaCode,
      lessonNumber: lesson.metadata.lessonNumber,
      lessonTitle: lesson.metadata.lessonTitle,
      totalLessonsInOa: lesson.metadata.totalLessonsInOa
    },
    prep: lesson.prep,
    route: lesson.route,
    situation: lesson.situation,
    reference: lesson.reference,
    hook: {
      title: lesson.hook.title || lesson.hook.titulo,
      dileIntro: lesson.hook.dileIntro,
      dileAfterVideo: lesson.hook.dileAfterVideo,
      focusPoints: lesson.hook.focusPoints,
      slides: (lesson.hook.slides || []).map(s => ({
        slideNumber: s.slideNumber,
        visualPrompt: s.visualPrompt,
        speakerNotes: s.speakerNotes,
        overlayText: s.overlayText
      }))
    },
    preQuestions: lesson.preQuestions,
    formalization: {
      concept: lesson.formalization.concept || lesson.formalization.title,
      ideaClave: lesson.formalization.ideaClave,
      dileIntro: lesson.formalization.dileIntro,
      slides: (lesson.formalization.slides || []).map(s => ({
        slideNumber: s.slideNumber,
        visualPrompt: s.visualPrompt,
        speakerNotes: s.speakerNotes,
        overlayText: s.overlayText
      }))
    },
    postQuestions: lesson.postQuestions,
    practice: lesson.practice,
    mini: lesson.mini,
    recovery: lesson.recovery,
    summaryIdeas: lesson.summaryIdeas,
    paso8_cierre: lesson.paso8_cierre
  };

  const jsonStr = JSON.stringify(norm);
  return crypto.createHash('sha256').update(jsonStr, 'utf8').digest('hex').substring(0, 16);
}

/**
 * Validador Estructural y Técnico (Nivel A) contra LessonData
 */
export function validateLesson(lesson: LessonData, lessonKey: string): ValidationResult {
  const issues: ValidationIssue[] = [];

  // 1. Identificación formal
  if (!lesson.metadata) {
    issues.push({ field: 'metadata', message: 'Falta objeto metadata', severity: 'error' });
  } else {
    if (!lesson.metadata.grade) issues.push({ field: 'metadata.grade', message: 'Falta curso', severity: 'error' });
    if (!lesson.metadata.subject) issues.push({ field: 'metadata.subject', message: 'Falta asignatura', severity: 'error' });
    if (!lesson.metadata.oaCode) issues.push({ field: 'metadata.oaCode', message: 'Falta código de OA', severity: 'error' });
    if (!lesson.metadata.lessonNumber || lesson.metadata.lessonNumber < 1) {
      issues.push({ field: 'metadata.lessonNumber', message: 'Número de lección inválido', severity: 'error' });
    }
    if (!lesson.metadata.lessonTitle) issues.push({ field: 'metadata.lessonTitle', message: 'Falta título de lección', severity: 'error' });
  }

  // 2. Preparación (Paso 1)
  if (!lesson.prep) {
    issues.push({ field: 'prep', message: 'Falta sección prep (Paso 1)', severity: 'error' });
  } else {
    if (!lesson.prep.adultObjective) issues.push({ field: 'prep.adultObjective', message: 'Falta objetivo del adulto', severity: 'error' });
    if (!lesson.prep.routeToday) issues.push({ field: 'prep.routeToday', message: 'Falta ruta del día', severity: 'error' });
  }

  // 3. Ruta y Situación (Paso 2A / 2B)
  if (!lesson.route || !Array.isArray(lesson.route.blocks) || lesson.route.blocks.length < 2) {
    issues.push({ field: 'route.blocks', message: 'Faltan bloques de ruta de aprendizaje', severity: 'error' });
  }
  if (!lesson.situation || !lesson.situation.dilePrompt || !lesson.situation.expectedAnswer) {
    issues.push({ field: 'situation', message: 'Falta situación inicial con diálogo o respuesta esperada', severity: 'error' });
  }

  // 4. Video Gancho (Paso 3)
  if (!lesson.hook) {
    issues.push({ field: 'hook', message: 'Falta objeto hook (Paso 3)', severity: 'error' });
  }

  // 5. Conversación Guiada (Paso 4)
  if (!Array.isArray(lesson.preQuestions) || lesson.preQuestions.length === 0) {
    issues.push({ field: 'preQuestions', message: 'Faltan preguntas guiadas post-video (Paso 4)', severity: 'error' });
  } else {
    lesson.preQuestions.forEach((q, idx) => {
      if (!q.question || !q.expected) {
        issues.push({ field: `preQuestions[${idx}]`, message: `Pregunta guiada ${idx + 1} incompleta`, severity: 'error' });
      }
      if (q.teachingBox) {
        if (!q.teachingBox.points || q.teachingBox.points.length === 0) {
          issues.push({ field: `preQuestions[${idx}].teachingBox`, message: `teachingBox en pregunta ${idx + 1} sin puntos explicativos`, severity: 'error' });
        }
      }
    });
  }

  // 6. Formalización y Post-preguntas (Paso 5 / 5B)
  if (!lesson.formalization) {
    issues.push({ field: 'formalization', message: 'Falta formalización conceptual (Paso 5)', severity: 'error' });
  }
  if (!Array.isArray(lesson.postQuestions) || lesson.postQuestions.length === 0) {
    issues.push({ field: 'postQuestions', message: 'Faltan preguntas de comprobación de formalización (Paso 5B)', severity: 'error' });
  }

  // 7. Práctica Conjunta (Paso 6)
  if (!Array.isArray(lesson.practice) || lesson.practice.length === 0) {
    issues.push({ field: 'practice', message: 'Faltan casos de práctica guiada (Paso 6)', severity: 'error' });
  }

  // 8. Miniquiz y Recuperación (Paso 7 / 7B)
  if (!Array.isArray(lesson.mini) || lesson.mini.length !== 3) {
    issues.push({ field: 'mini', message: `El miniquiz debe tener exactamente 3 preguntas formales (detectadas: ${lesson.mini?.length || 0})`, severity: 'error' });
  } else {
    const isLegacyApprovedMat = lesson.metadata.subject.includes('Mat') && lesson.metadata.oaCode.includes('1');
    lesson.mini.forEach((q, idx) => {
      if (!q.options || q.options.length < 2) {
        issues.push({ field: `mini[${idx}].options`, message: `Pregunta ${idx + 1} debe tener al menos 2 opciones`, severity: 'error' });
      } else if (q.options.length !== 4) {
        if (isLegacyApprovedMat) {
          issues.push({ field: `mini[${idx}].options`, message: `Lección previa aprobada con ${q.options.length} alternativas (formato anterior)`, severity: 'warning' });
        } else {
          issues.push({ field: `mini[${idx}].options`, message: `Pregunta ${idx + 1} debe tener exactamente 4 alternativas A-D (detectadas: ${q.options.length})`, severity: 'error' });
        }
      }
      if (!q.correct) {
        issues.push({ field: `mini[${idx}].correct`, message: `Pregunta ${idx + 1} sin respuesta correcta declarada`, severity: 'error' });
      }
      if (!q.fixExplain) {
        issues.push({ field: `mini[${idx}].fixExplain`, message: `Pregunta ${idx + 1} sin explicación correctiva de distractores`, severity: 'error' });
      }
    });
  }

  // 9. Cierre (Paso 8)
  if (!lesson.paso8_cierre && !lesson.closure) {
    issues.push({ field: 'paso8_cierre', message: 'Falta cierre pedagógico formal (Paso 8)', severity: 'error' });
  }

  // 10. Comprobación de recurso de lectura autónomo
  const hasReadingRef = JSON.stringify(lesson).includes('recurso de lectura') || JSON.stringify(lesson).includes('lectura en pantalla');
  if (hasReadingRef) {
    const hasEmbeddedText = Boolean(
      (lesson.interactive && (lesson.interactive.readingText || (lesson.interactive.paragraphs && lesson.interactive.paragraphs.length > 0)))
    );
    if (!hasEmbeddedText) {
      issues.push({
        field: 'interactive.readingText',
        message: 'La lección hace referencia a una lectura pero no incluye texto en pantalla autónomo en interactive.readingText/paragraphs',
        severity: 'error'
      });
    }
  }

  const valid = issues.filter(i => i.severity === 'error').length === 0;
  const oaId = `${lesson.metadata.grade.replace(/[^0-9]/g, '') === '7' ? '110-7' : '110'}-${getSubjectCode(lesson.metadata.subject)}-OA${lesson.metadata.oaCode.replace(/[^0-9]/g, '').padStart(2, '0')}`;
  const normalizedHash = computeContentHash(lesson);

  return { valid, lessonKey, oaId, issues, normalizedHash };
}

export function getSubjectCode(subj: string): string {
  const s = subj.toLowerCase();
  if (s.includes('leng') || s.includes('liter')) return 'LEN';
  if (s.includes('mat')) return 'MAT';
  if (s.includes('hist') || s.includes('geog') || s.includes('soc')) return 'HIS';
  if (s.includes('cien') || s.includes('nat')) return 'CIE';
  if (s.includes('ing')) return 'ING';
  return 'GEN';
}

export function getSubjectDir(subj: string): string {
  const s = subj.toLowerCase();
  if (s.includes('leng') || s.includes('liter')) return 'Lengua_Literatura';
  if (s.includes('mat')) return 'Matematica';
  if (s.includes('hist') || s.includes('geog') || s.includes('soc')) return 'Historia_Geografia';
  if (s.includes('cien') || s.includes('nat')) return 'Ciencias_Naturales';
  if (s.includes('ing')) return 'Ingles';
  return 'General';
}

/**
 * Generador Unidireccional de Markdown estructurado de alta fidelidad
 */
export function generateMarkdownRepresentation(lesson: LessonData, hash: string): string {
  const m = lesson.metadata;
  const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' America/Santiago';
  const oaNum = m.oaCode.replace(/[^0-9]/g, '').padStart(2, '0');
  const classNumStr = String(m.lessonNumber).padStart(2, '0');
  const totalClassesStr = String(m.totalLessonsInOa || 6).padStart(2, '0');

  let md = `# EstudioSimple | Lección interactiva original

## ${m.grade} · ${m.subject} · OA${oaNum} · Clase ${classNumStr}

**Identificador del curso:** 110-7  
**Identificador curricular:** 7B-${getSubjectCode(m.subject)}-OA${oaNum}  
**Nombre en la App:** ${getSubjectDir(m.subject)}  
**Título:** ${m.lessonTitle}  
**Duración total:** ${m.durationMinutes || 30} minutos  
**Número de clase:** ${classNumStr} de ${totalClassesStr}  
**Título de trabajo de la siguiente clase:** ${m.nextLessonTitle || 'Continuación de unidad'}  
**Fecha y hora de versión:** ${dateStr}  
**Huella digital de contenido:** [sha256:${hash}]  
**Estado:** BORRADOR PARA REVISIÓN · EN_REVISION · WORK_PRE_APROBACION  

### Objetivo de aprendizaje de la clase

**${lesson.prep.adultObjective || m.lessonTitle}**

### Ruta y Enfoque Didáctico

${lesson.prep.routeToday || ''}

---

## 1. Paso 1 — Preparación del mentor

**Propósito del acompañamiento:** ${lesson.prep.mentorReminder}

**Ruta de la sesión:** ${lesson.prep.routeToday}

**DILE al estudiante:** “Hoy exploraremos ${m.lessonTitle}.”

**Pautas para el mentor:**
${(lesson.prep.reminders || [
  'Usa los recursos visuales y lecturas integrados en pantalla.',
  'Antes de revelar una respuesta, invita al estudiante a formular su hipótesis.',
  'Valora el razonamiento antes de corregir.'
]).map((r, i) => `${i + 1}. ${r}`).join('\n')}

**Clima emocional:** ${lesson.prep.emotionalTip || 'Ambiente de aprendizaje seguro y reflexivo.'}

---

## 2. Paso 2A — Ruta de aprendizaje

**Preguntas clave:**
${(lesson.route.keyQuestions || []).map(kq => `- **${kq.label}:** ${kq.sub}`).join('\n')}

**Bloques de la clase:**
${(lesson.route.blocks || []).map(b => `- Bloque ${b.number}: **${b.title}** (${b.subtitle})`).join('\n')}

---

## 3. Paso 2B — Situación inicial y Punto de Partida

**DILE al estudiante:** “${lesson.situation.dilePrompt}”

**Respuesta esperada:** ${lesson.situation.expectedAnswer}

**Pista socrática:** ${lesson.situation.socraticHint}

${lesson.reference ? `**Pregunta de referencia:** “${lesson.reference.question || lesson.reference.dilePrompt}”
**Criterio de éxito:** ${lesson.reference.feedbackSuccess}` : ''}
`;

  // Recurso interactivo de lectura si existe
  if (lesson.interactive?.readingText || (lesson.interactive?.paragraphs && lesson.interactive.paragraphs.length > 0)) {
    md += `\n### Recurso de Lectura Autónomo en Pantalla\n\n`;
    if (lesson.interactive.title) md += `**Título:** ${lesson.interactive.title}\n\n`;
    if (lesson.interactive.paragraphs) {
      lesson.interactive.paragraphs.forEach((p, idx) => {
        md += `> **Párrafo ${idx + 1}:** ${p}\n>\n`;
      });
    } else if (lesson.interactive.readingText) {
      md += `> ${lesson.interactive.readingText}\n\n`;
    }
  }

  // Paso 3: Hook
  md += `\n---\n\n## 4. Paso 3 — Video Motivacional / Gancho\n\n`;
  md += `**Título:** ${lesson.hook.title || lesson.hook.titulo || 'Video Gancho'}\n\n`;
  md += `**DILE antes del video:** “${lesson.hook.dileIntro}”\n\n`;
  md += `**Instrucción HAZ:** ${lesson.hook.hazInstruction}\n\n`;
  md += `**DILE después del video:** “${lesson.hook.dileAfterVideo}”\n\n`;

  if (lesson.hook.slides && lesson.hook.slides.length > 0) {
    md += `### Láminas del Gancho\n\n`;
    lesson.hook.slides.forEach(s => {
      md += `#### Lámina ${s.slideNumber}: ${s.tituloMomento || ''}\n`;
      md += `- **Prompt Visual [No text drawn by AI]:** ${s.visualPrompt}\n`;
      md += `- **Texto en Pantalla (Overlay):** ${s.overlayText}\n`;
      md += `- **Notas de Locución:** ${s.speakerNotes}\n\n`;
    });
  }

  // Paso 4: Recorrido / preQuestions
  md += `\n---\n\n## 5. Paso 4 — Conversación Guiada y Recorrido\n\n`;
  lesson.preQuestions.forEach((q, idx) => {
    md += `### Pregunta ${idx + 1} (${q.context})\n\n`;
    if (q.teachingBox) {
      md += `> 💡 **Enseñanza Previa (teachingBox):**\n`;
      if (q.teachingBox.title) md += `> **${q.teachingBox.title}**\n`;
      q.teachingBox.points.forEach(pt => {
        md += `> - ${pt}\n`;
      });
      if (q.teachingBox.modelExample) md += `> *Ejemplo modelo:* ${q.teachingBox.modelExample}\n`;
      md += `\n`;
    }
    md += `**Pregunta:** “${q.question}”\n\n`;
    md += `**Respuesta esperada:** ${q.expected}\n\n`;
    md += `**Pista de apoyo:** ${q.support}\n\n`;
    md += `**Retroalimentación de éxito:** ${q.success}\n\n`;
    md += `**Solución modelo (revelar):** ${q.studentReveal || q.reveal}\n\n`;
  });

  // Paso 5: Formalización
  md += `\n---\n\n## 6. Paso 5 — Explicación e Idea Clave\n\n`;
  md += `**Concepto:** ${lesson.formalization.concept || lesson.formalization.title || 'Formalización'}\n\n`;
  md += `**Idea Clave:** ${lesson.formalization.ideaClave || ''}\n\n`;
  md += `**DILE antes de la explicación:** “${lesson.formalization.dileIntro}”\n\n`;
  md += `**Instrucción HAZ:** ${lesson.formalization.hazInstruction}\n\n`;

  if (lesson.formalization.slides && lesson.formalization.slides.length > 0) {
    md += `### Láminas Explicativas\n\n`;
    lesson.formalization.slides.forEach(s => {
      md += `#### Lámina ${s.slideNumber}: ${s.tituloMomento || ''}\n`;
      md += `- **Prompt Visual [No text drawn by AI]:** ${s.visualPrompt}\n`;
      md += `- **Texto en Pantalla (Overlay):** ${s.overlayText}\n`;
      md += `- **Notas de Locución:** ${s.speakerNotes}\n\n`;
    });
  }

  // Paso 5B: postQuestions
  md += `\n---\n\n## 7. Paso 5B — Comprobación de Formalización\n\n`;
  lesson.postQuestions.forEach((q, idx) => {
    md += `### Pregunta de Comprobación ${idx + 1} (${q.context})\n\n`;
    if (q.teachingBox) {
      md += `> 💡 **Enseñanza (teachingBox):**\n`;
      q.teachingBox.points.forEach(pt => { md += `> - ${pt}\n`; });
      md += `\n`;
    }
    md += `**Pregunta:** “${q.question}”\n\n`;
    md += `**Respuesta esperada:** ${q.expected}\n\n`;
    md += `**Pista de apoyo:** ${q.support}\n\n`;
    md += `**Solución modelo:** ${q.studentReveal || q.reveal}\n\n`;
  });

  // Paso 6: Práctica Conjunta
  md += `\n---\n\n## 8. Paso 6 — Práctica Conjunta y Cuaderno\n\n`;
  lesson.practice.forEach((p, idx) => {
    md += `### Caso de Práctica ${idx + 1} (${p.context})\n\n`;
    md += `**Actividad:** “${p.question}”\n\n`;
    md += `**Respuesta esperada:** ${p.expected}\n\n`;
    md += `**Pista de apoyo:** ${p.support}\n\n`;
    md += `**Retroalimentación de éxito:** ${p.success}\n\n`;
    md += `**Solución modelo:** ${p.studentReveal || p.reveal}\n\n`;
  });

  // Paso 7: Miniquiz
  md += `\n---\n\n## 9. Paso 7 — Miniquiz de Evaluación Formativa\n\n`;
  lesson.mini.forEach((mItem, idx) => {
    md += `### Pregunta ${idx + 1}\n\n`;
    md += `**Enunciado:** ${mItem.q}\n\n`;
    md += `**Alternativas:**\n`;
    mItem.options.forEach(opt => {
      const isCorrect = opt.trim() === mItem.correct.trim() || opt.startsWith(mItem.correct);
      md += `- ${isCorrect ? '✅' : '⚪'} ${opt}\n`;
    });
    md += `\n**Respuesta correcta:** ${mItem.correct}\n\n`;
    md += `**Explicación formativa / Distractor corregido:** ${mItem.fixExplain}\n\n`;
  });

  // Paso 7B: Recuperación
  if (lesson.recovery && lesson.recovery.length > 0) {
    md += `\n---\n\n## 10. Paso 7B — Recuperación Formativa\n\n`;
    lesson.recovery.forEach((r, idx) => {
      md += `### Refuerzo ${idx + 1}: ${r.title}\n\n`;
      md += `**Explicación:** ${r.explain}\n\n`;
      md += `**Pregunta:** ${r.q}\n\n`;
      md += `**Respuesta correcta:** ${r.correct}\n\n`;
      md += `**Retroalimentación de apoyo:** ${r.fixText}\n\n`;
    });
  }

  // Paso 8: Síntesis y Cierre
  md += `\n---\n\n## 11. Paso 8 — Síntesis y Cierre\n\n`;
  if (lesson.summaryIdeas && lesson.summaryIdeas.length > 0) {
    md += `### Ideas Clave Recapituladas\n\n`;
    lesson.summaryIdeas.forEach(([titulo, desc]) => {
      md += `- **${titulo}:** ${desc}\n`;
    });
    md += `\n`;
  }

  const cierre = lesson.paso8_cierre || {
    preguntaSintesis: lesson.closure?.nextClassPreview || '',
    metacognicion: lesson.closure?.congratulations || '',
    celebracion: '¡Felicitaciones! Has completado la clase con éxito.'
  };

  md += `**Pregunta de síntesis:** ${cierre.preguntaSintesis}\n\n`;
  md += `**Reflexión metacognitiva:** ${cierre.metacognicion}\n\n`;
  md += `**Celebración y cierre:** ${cierre.celebracion}\n`;

  return md;
}

/**
 * Actualiza los paquetes JSON públicos garantizando que la lección preserve sus propiedades de PlayerLessonData
 */
export function updateInjectedJsonPackages(lesson: LessonData, dryRun: boolean): { affectedFiles: string[]; success: boolean } {
  const jsonPaths = [
    path.resolve(APP_ROOT, 'public', 'data', 'injected_lessons_all_grades.json'),
    path.resolve(APP_ROOT, 'public', 'data', 'injected_lessons_7b.json')
  ];

  const affectedFiles: string[] = [];
  const m = lesson.metadata;
  const gradeDigit = m.grade.replace(/[^0-9]/g, '') || '7';
  const oaCodeDigits = m.oaCode.replace(/[^0-9]/g, '');
  const oaId = `110-${gradeDigit}-${getSubjectCode(m.subject)}-OA${oaCodeDigits.padStart(2, '0')}`;

  for (const jsonPath of jsonPaths) {
    if (!fs.existsSync(jsonPath)) continue;

    const raw = fs.readFileSync(jsonPath, 'utf8');
    const packages: any[] = JSON.parse(raw);

    let pkg = packages.find(p => {
      return (
        (p.oaId && p.oaId === oaId) ||
        (p.curso === m.grade && p.asignatura.includes(m.subject.split(' ')[0]) && (p.oaCodigo === m.oaCode || p.oa === m.oaCode))
      );
    });

    if (pkg) {
      if (!pkg.lessons) pkg.lessons = [];
      const idx = pkg.lessons.findIndex((l: any) => l.num === m.lessonNumber || l?.metadata?.lessonNumber === m.lessonNumber);
      
      // Creamos la versión generadora rica asegurando que conserve también las propiedades completas de PlayerLessonData
      const adaptedGenLesson = adaptPlayerLessonToGenerator(lesson);
      // Asignamos metadata y campos clave para que isFullPlayerLesson() en runtime la identifique sin degradación
      (adaptedGenLesson as any).metadata = lesson.metadata;
      (adaptedGenLesson as any).prep = lesson.prep;
      (adaptedGenLesson as any).route = lesson.route;
      (adaptedGenLesson as any).situation = lesson.situation;
      (adaptedGenLesson as any).preQuestions = lesson.preQuestions;
      (adaptedGenLesson as any).formalization = lesson.formalization;
      (adaptedGenLesson as any).postQuestions = lesson.postQuestions;
      (adaptedGenLesson as any).practice = lesson.practice;
      (adaptedGenLesson as any).mini = lesson.mini;
      (adaptedGenLesson as any).recovery = lesson.recovery;
      (adaptedGenLesson as any).interactive = lesson.interactive;
      (adaptedGenLesson as any).paso8_cierre = lesson.paso8_cierre;

      if (idx >= 0) {
        pkg.lessons[idx] = adaptedGenLesson;
      } else {
        pkg.lessons.push(adaptedGenLesson);
      }

      if (!dryRun) {
        const tmpPath = `${jsonPath}.tmp`;
        fs.writeFileSync(tmpPath, JSON.stringify(packages, null, 2), 'utf8');
        fs.renameSync(tmpPath, jsonPath);
      }
      affectedFiles.push(jsonPath);
    }
  }

  return { affectedFiles, success: true };
}

/**
 * Función principal del Pipeline
 */
export function runLessonPipeline(options: PipelineOptions): { success: boolean; results: ValidationResult[] } {
  const { lessonKey, mode } = options;
  console.log(`\n======================================================`);
  console.log(`🚀 ESTUDIOSIMPLE - PIPELINE UNIVERSAL DE LECCIONES`);
  console.log(`Modo: [${mode.toUpperCase()}]`);
  console.log(`======================================================\n`);

  const keysToProcess = lessonKey
    ? [lessonKey]
    : Object.keys(ALL_CANONICAL_LESSONS);

  const results: ValidationResult[] = [];

  for (const key of keysToProcess) {
    const lesson = (ALL_CANONICAL_LESSONS as any)[key] as LessonData;
    if (!lesson || !lesson.metadata) {
      console.warn(`[WARN] Lección '${key}' no encontrada o sin metadatos. Omitiendo.`);
      continue;
    }

    const valResult = validateLesson(lesson, key);
    results.push(valResult);

    console.log(`[+] ${valResult.valid ? '✅ VÁLIDA' : '❌ ERRORES'} | ${key}`);
    console.log(`    OA: ${valResult.oaId} | Huella contenido: ${valResult.normalizedHash}`);

    if (valResult.issues.length > 0) {
      valResult.issues.forEach(iss => {
        console.log(`    ${iss.severity === 'error' ? '🔴' : '🟡'} [${iss.field}]: ${iss.message}`);
      });
    }

    if (!valResult.valid) {
      console.error(`\n❌ Error de validación en '${key}'. El pipeline se detiene.`);
      if (mode === 'build') {
        return { success: false, results };
      }
      continue;
    }

    // Generar representaciones
    const mdContent = generateMarkdownRepresentation(lesson, valResult.normalizedHash);

    if (mode === 'dry-run' || mode === 'validate') {
      console.log(`    ℹ️ [${mode}] Markdown generado en memoria: ${mdContent.length} bytes.`);
      console.log(`    ℹ️ [${mode}] JSON comprobado en memoria sin mutación.`);
    } else if (mode === 'build') {
      // Escritura en staging (LECCIONES_POR_REVISAR)
      const gradeDir = lesson.metadata.grade.replace(/[^0-9]/g, '') === '7' ? '110-7' : '110';
      const subjDir = getSubjectDir(lesson.metadata.subject);
      const oaDir = `OA${lesson.metadata.oaCode.replace(/[^0-9]/g, '').padStart(2, '0')}`;
      const classNumStr = String(lesson.metadata.lessonNumber).padStart(2, '0');

      const targetDir = path.resolve(PROJECT_ROOT, 'LECCIONES_POR_REVISAR', gradeDir, subjDir, oaDir);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const mdFilePath = path.resolve(targetDir, `CLASE${classNumStr}.md`);
      const tmpMdPath = `${mdFilePath}.tmp`;
      fs.writeFileSync(tmpMdPath, mdContent, 'utf8');
      fs.renameSync(tmpMdPath, mdFilePath);
      console.log(`    💾 Markdown escrito: ${mdFilePath}`);

      // Actualizar paquetes JSON
      const jsonRes = updateInjectedJsonPackages(lesson, false);
      jsonRes.affectedFiles.forEach(f => {
        console.log(`    💾 JSON actualizado: ${f}`);
      });
    }
  }

  const allValid = results.every(r => r.valid);
  console.log(`\n======================================================`);
  console.log(`🏁 RESUMEN DEL PIPELINE: ${allValid ? 'ÉXITO' : 'FALLO'}`);
  console.log(`Lecciones procesadas: ${results.length}`);
  console.log(`======================================================\n`);

  return { success: allValid, results };
}

// Ejecución directa desde CLI si se llama como script
const isDirectRun = process.argv[1] && process.argv[1].includes('build_lesson_pipeline');
if (isDirectRun) {
  const args = process.argv.slice(2);
  let mode: PipelineMode = 'validate';
  let targetLesson: string | undefined;

  args.forEach(arg => {
    if (arg === '--build' || arg === '-b') mode = 'build';
    else if (arg === '--dry-run' || arg === '-d') mode = 'dry-run';
    else if (arg === '--validate' || arg === '-v') mode = 'validate';
    else if (arg.startsWith('--lesson=')) targetLesson = arg.split('=')[1];
    else if (!arg.startsWith('-')) targetLesson = arg;
  });

  const res = runLessonPipeline({ mode, lessonKey: targetLesson });
  process.exit(res.success ? 0 : 1);
}
