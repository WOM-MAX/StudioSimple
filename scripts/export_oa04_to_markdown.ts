import fs from 'fs';
import path from 'path';
import { MATEMATICA_7B_OA04_CLASE01 } from './oa04_data/clase01';
import { MATEMATICA_7B_OA04_CLASE02 } from './oa04_data/clase02';
import { MATEMATICA_7B_OA04_CLASE03 } from './oa04_data/clase03';
import { MATEMATICA_7B_OA04_CLASE04 } from './oa04_data/clase04';
import { MATEMATICA_7B_OA04_CLASE05 } from './oa04_data/clase05';
import { MATEMATICA_7B_OA04_CLASE06 } from './oa04_data/clase06';
import { LessonData } from '../Web Studio Simple/src/types/lesson';

const lessons: LessonData[] = [
  MATEMATICA_7B_OA04_CLASE01,
  MATEMATICA_7B_OA04_CLASE02,
  MATEMATICA_7B_OA04_CLASE03,
  MATEMATICA_7B_OA04_CLASE04,
  MATEMATICA_7B_OA04_CLASE05,
  MATEMATICA_7B_OA04_CLASE06
];

export function exportOa04ToMarkdown(targetDir: string = 'staging_preparacion_aislada/oa04_markdown') {
  const resolvedTarget = path.resolve(process.cwd(), targetDir);
  if (!fs.existsSync(resolvedTarget)) {
    fs.mkdirSync(resolvedTarget, { recursive: true });
  }

  lessons.forEach((l, idx) => {
    const md = lessonToMarkdown(l, idx);
    const fname = `CLASE0${idx + 1}.md`;
    const outPath = path.join(resolvedTarget, fname);
    fs.writeFileSync(outPath, md, 'utf8');
    console.log(`✓ Exportado candidato aislado: ${outPath} (${fs.statSync(outPath).size} bytes)`);
  });
}

function lessonToMarkdown(l: any, idx: number): string {
  const n = idx + 1;
  const meta = l.metadata;
  let md = `# EstudioSimple · ${meta.lessonTitle}\n\n`;
  md += `**Curso:** 110-7 · **Asignatura:** Matematica · **OA:** OA04 · **Clase:** 0${n} de 06\n\n`;
  md += `**Estado:** EN_REVISION · CANDIDATO_RECUPERACION_OA04 · AISLADO\n\n`;
  md += `**Fecha de preparación:** 2026-10-17 America/Santiago\n\n`;
  md += `**Objetivo de la clase:** ${l.prep.adultObjective}\n\n`;
  md += `**Duración de sesión planificada:** ${meta.durationMinutes || 30} minutos.\n\n`;

  md += `## 1. Paso 1 — Preparación del mentor\n\n`;
  md += `**Para el mentor:** ${l.prep.mentorReminder || 'Guía paso a paso al estudiante sin mostrar las respuestas antes del intento.'}\n\n`;
  md += `**Ruta de hoy:** ${l.prep.routeToday}\n\n`;
  if (l.prep.reminders && l.prep.reminders.length > 0) {
    md += `**Recordatorios:**\n`;
    l.prep.reminders.forEach((r: string) => {
      md += `- ${r}\n`;
    });
    md += `\n`;
  }
  md += `**Consejo emocional:** ${l.prep.emotionalTip || 'Valora el razonamiento y acompaña con paciencia.'}\n\n`;

  md += `## 2. Paso 2A — Ruta de aprendizaje\n\n`;
  if (l.route.blocks && l.route.blocks.length > 0) {
    md += `| N.º | Bloque | Acción | Color |\n|---|---|---|---|\n`;
    l.route.blocks.forEach((b: any, i: number) => {
      md += `| ${i + 1} | ${b.title} | ${b.subtitle} | ${b.color} |\n`;
    });
    md += `\n`;
  }
  md += `**DILE — Objetivo del estudiante:** “${l.route.dileObjective || meta.lessonTitle}”\n\n`;

  md += `## 3. Paso 2B — Punto de partida\n\n`;
  md += `### Recurso de lectura visible para el estudiante\n\n`;
  md += `${l.situation.dilePrompt}\n\n`;
  md += `**Punto de partida / Starting point:** ${l.reference.question || l.situation.dilePrompt}\n\n`;
  md += `**Respuesta esperada, privada para el mentor:** ${l.situation.expectedAnswer}\n\n`;
  if (l.situation.socraticHint) {
    md += `**Pista socrática:** “${l.situation.socraticHint}”\n\n`;
  }

  md += `## 4. Paso 3 — Videos\n\n`;
  md += `**MOTIVACION:** 7 diapositivas. **EXPLICACION:** 7 diapositivas.\n\n`;

  // Diapositivas bimodales: 7 Motivación + 7 Explicación
  const hookSlides = l.hook?.slides || [];
  const expSlides = l.formalization?.slides || [];
  const allSlides = [...hookSlides, ...expSlides];

  md += `## Guiones audiovisuales de producción\n\n`;
  md += `### MOTIVACION\n\n`;
  const mSlides = allSlides.slice(0, 7);
  mSlides.forEach((s: any, i: number) => {
    const sNum = i + 1;
    md += `#### Diapositiva 0${sNum} — ${s.tituloMomento || `Motivación ${sNum}`}\n\n`;
    md += `**Título:** ${s.overlayTitle || s.overlayText || `Lámina ${sNum}`}\n\n`;
    if (s.overlaySubtitle) {
      md += `**Subtítulo:** ${s.overlaySubtitle}\n\n`;
    }
    md += `**Duración:** ${s.duracionSeg || 8} segundos\n\n`;
    md += `**Visual:** ${s.visualPrompt || ''}\n\n`;
    md += `**Locución:** ${s.speakerNotes || ''}\n\n`;
  });

  md += `### EXPLICACION\n\n`;
  const eSlides = allSlides.slice(7, 14);
  eSlides.forEach((s: any, i: number) => {
    const sNum = i + 8;
    const numPad = sNum < 10 ? `0${sNum}` : `${sNum}`;
    md += `#### Diapositiva ${numPad} — ${s.tituloMomento || `Explicación ${sNum}`}\n\n`;
    md += `**Título:** ${s.overlayTitle || s.overlayText || `Lámina ${sNum}`}\n\n`;
    if (s.overlaySubtitle) {
      md += `**Subtítulo:** ${s.overlaySubtitle}\n\n`;
    }
    md += `**Duración:** ${s.duracionSeg || 8} segundos\n\n`;
    md += `**Visual:** ${s.visualPrompt || ''}\n\n`;
    md += `**Locución:** ${s.speakerNotes || ''}\n\n`;
  });

  md += `## 5. Paso 4 — Conversación guiada\n\n`;
  (l.preQuestions || []).forEach((q: any, i: number) => {
    md += `### Pregunta ${i + 1}\n\n`;
    md += `**Contexto:** ${q.context || ''}\n\n`;
    md += `**PREGÚNTALE / ASK:** ${q.question || ''}\n\n`;
    md += `**Respuesta esperada, privada para el mentor:** ${q.expected || ''}\n\n`;
    if (q.support) {
      md += `**Apoyo 1:** ${q.support}\n\n`;
    }
    if (q.success) {
      md += `**Criterio:** ${q.success}\n\n`;
    }
  });

  md += `## 6. Paso 5 — Explicación y modelamiento\n\n`;
  md += `**Concepto:** ${l.formalization.concept || meta.lessonTitle}\n\n`;
  md += `**Idea clave:** ${l.formalization.concept || meta.lessonTitle}\n\n`;
  if (l.postQuestions && l.postQuestions.length > 0) {
    l.postQuestions.forEach((pq: any, idx: number) => {
      const suffix = l.postQuestions.length > 1 ? ` ${idx + 1}` : '';
      md += `**Comprobación inmediata${suffix}:** ${pq.question}\n\n`;
      md += `**Modelo de comprobación${suffix}:** ${pq.expected}\n\n`;
      if (pq.support) {
        md += `**Apoyo de comprobación${suffix}:** ${pq.support}\n\n`;
      }
    });
  }

  md += `## 7. Paso 6 — Práctica conjunta y autónoma\n\n`;
  (l.practice || []).forEach((p: any, i: number) => {
    md += `### Caso ${i + 1}\n\n`;
    md += `**Recurso:** ${p.context || `Caso ${i + 1}`}\n\n`;
    md += `**Actividad:** ${p.question || ''}\n\n`;
    md += `**Respuesta de referencia:** ${p.expected || ''}\n\n`;
    md += `**Criterio:** ${p.success || 'Cumple el criterio formal del caso'}\n\n`;
    if (p.support) {
      md += `**Apoyo:** ${p.support}\n\n`;
    }
  });

  md += `## 8. Paso 7 — Miniquiz\n\n`;
  const letters = ['A', 'B', 'C', 'D'];
  (l.mini || []).forEach((m: any, i: number) => {
    md += `### Reactivo ${i + 1}\n\n`;
    md += `${m.q}\n\n`;

    let correctLetter = 'A';
    (m.options || []).forEach((opt: string, optIdx: number) => {
      const cleanOpt = opt.replace(/^[A-D][.)]\s*/, '').trim();
      const letCode = letters[optIdx] || 'A';
      const cleanCorrect = (m.correct || '').replace(/^[A-D][.)]\s*/, '').trim();
      if (cleanOpt === cleanCorrect || opt === m.correct) {
        correctLetter = letCode;
      }
    });

    (m.options || []).forEach((opt: string, optIdx: number) => {
      const cleanOpt = opt.replace(/^[A-D][.)]\s*/, '').trim();
      const letCode = letters[optIdx] || 'A';
      md += `- ${letCode}. ${cleanOpt}\n`;
    });

    md += `\n**Clave privada:** ${correctLetter}.\n\n`;
    md += `**Explicación formativa:** ${m.fixExplain || 'Revisa la regla matemática del concepto.'}\n\n`;
  });

  md += `### Recuperación\n\n`;
  (l.recovery || []).forEach((r: any, rIdx: number) => {
    md += `#### Recuperación ${rIdx + 1}\n\n`;
    md += `**Enseñanza:** ${r.explain || 'Revisa el concepto central.'}\n\n`;
    md += `**Pregunta de refuerzo:** ${r.q}\n\n`;

    if (r.options && r.options.length > 0) {
      let rCorrectLetter = 'A';
      r.options.forEach((opt: string, oIdx: number) => {
        const cleanOpt = opt.replace(/^[A-D][.)]\s*/, '').trim();
        const letCode = letters[oIdx] || 'A';
        const cleanCorrect = (r.correct || '').replace(/^[A-D][.)]\s*/, '').trim();
        if (cleanOpt === cleanCorrect || opt === r.correct) {
          rCorrectLetter = letCode;
        }
      });

      r.options.forEach((opt: string, oIdx: number) => {
        const cleanOpt = opt.replace(/^[A-D][.)]\s*/, '').trim();
        const letCode = letters[oIdx] || 'A';
        md += `- ${letCode}. ${cleanOpt}\n`;
      });
      md += `\n**Clave:** ${rCorrectLetter}.\n\n`;
      md += `**Si acierta:** ${r.correctText || '¡Respuesta correcta!'}\n\n`;
      md += `**Si necesita apoyo:** ${r.fixText || 'Revisa el cálculo paso a paso.'}\n\n`;
    } else {
      md += `**Tarea de cuaderno:** ${r.q}\n\n`;
      md += `**Criterio privado:** ${r.correctText || r.correct || 'Aplica la regla de cálculo.'}\n\n`;
      md += `**Apoyo:** ${r.fixText || 'Revisa el total de 100 partes.'}\n\n`;
    }
  });

  md += `## 9. Paso 8 — Síntesis y cierre\n\n`;
  md += `**Ideas de síntesis:**\n`;
  (l.summaryIdeas || []).forEach((si: any, idx: number) => {
    const title = Array.isArray(si) ? si[0] : (si.title || `Idea ${idx + 1}`);
    const desc = Array.isArray(si) ? si[1] : (si.desc || '');
    md += `${idx + 1}. **${title}:** ${desc}\n`;
  });

  md += `\n**Pregunta de síntesis:** ¿Qué aprendiste hoy sobre el cálculo y significado de los porcentajes?\n\n`;
  md += `**Metacognición:** ¿Qué estrategia te ayudó más a comprender el procedimiento?\n\n`;
  md += `**Celebración:** ¡Excelente trabajo matemático! Has consolidado el aprendizaje de hoy.\n`;

  return md;
}

if (process.argv[1]?.endsWith('export_oa04_to_markdown.ts')) {
  exportOa04ToMarkdown();
}
