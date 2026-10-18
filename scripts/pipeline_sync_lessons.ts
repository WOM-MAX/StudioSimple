import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { LessonData, SlidePrompt, GuidedItem, QuizQuestion, RecoveryItem } from '../Web Studio Simple/src/types/lesson';
import { adaptPlayerLessonToGenerator } from '../Web Studio Simple/src/lib/lesson-adapter';
import { lintPedagogicalLesson } from './linter_contrato_pedagogico';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const REVISAR_DIR = path.resolve(ROOT, 'LECCIONES_POR_REVISAR');
const STAGING_DIR = path.resolve(ROOT, 'staging_preparacion_aislada');
const STAGING_LESSONS_DIR = path.resolve(STAGING_DIR, 'lessons');
const STAGING_MANIFEST_DIR = path.resolve(STAGING_DIR, 'manifests');

// Normalizadores
export function normalizeSubject(subject: string): string {
  const clean = (subject || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
  if (clean.includes('mat')) return 'mat';
  if (clean.includes('leng') || clean.includes('liter')) return 'len';
  if (clean.includes('hist') || clean.includes('geog') || clean.includes('soc')) return 'his';
  if ((clean.includes('cien') && !clean.includes('soc')) || clean.includes('nat')) return 'cie';
  if (clean === 'ing' || clean.includes('ingles') || clean.includes('english')) return 'ing';
  return clean;
}

export function normalizeOa(oaCode: string): string {
  const digits = (oaCode || '').replace(/[^0-9]/g, '');
  return digits ? `oa${String(parseInt(digits, 10)).padStart(2, '0')}` : (oaCode || '').toLowerCase().trim();
}

export function normalizeGrade(grade: string): string {
  const digits = (grade || '').replace(/[^0-9]/g, '');
  return digits || (grade || '').toLowerCase().trim();
}

export function getSubjectFormalName(norm: string): string {
  switch (norm) {
    case 'len': return 'Lengua y Literatura';
    case 'cie': return 'Ciencias Naturales';
    case 'his': return 'Historia, Geografía y Ciencias Sociales';
    case 'ing': return 'Idioma Extranjero Inglés';
    case 'mat': return 'Matemática';
    default: return 'General';
  }
}

export function getSubjectKey(norm: string): string {
  switch (norm) {
    case 'len': return 'lengua';
    case 'cie': return 'ciencias';
    case 'his': return 'historia';
    case 'ing': return 'ingles';
    case 'mat': return 'matematica';
    default: return 'materia';
  }
}

export function getInteractiveConfig(norm: string, title: string): { type: any; title: string; description?: string } {
  switch (norm) {
    case 'len':
      return {
        type: 'reading_resource',
        title: 'Recurso de Lectura y Ambiente Narrativo',
        description: 'Organizador de lectura comprensiva y análisis del entorno narrativo.'
      };
    case 'cie':
      return {
        type: 'dimensions',
        title: 'Dimensiones Integrales de la Sexualidad',
        description: 'Organizador de las cinco dimensiones biopsicosociales.'
      };
    case 'his':
      return {
        type: 'timeline',
        title: 'Línea de Tiempo y Espacio Histórico',
        description: 'Organizador histórico, espacial y temporal.'
      };
    case 'ing':
      return {
        type: 'reading_resource',
        title: 'Reading Resource & Vocabulary in Context',
        description: 'Text comprehension and contextual vocabulary organizer.'
      };
    case 'mat':
      return {
        type: 'thermo',
        title: 'Representación Gráfica y Numérica',
        description: 'Modelamiento CPA y recta numérica.'
      };
    default:
      return {
        type: 'general',
        title: title || 'Organizador de Aprendizaje',
        description: 'Esquema interactivo de aprendizaje'
      };
  }
}

export interface FileMetadata {
  grade: string;
  subjectName: string;
  oaCode: string;
  oaTitle: string;
  lessonNumber: number;
  totalLessons: number;
  lessonTitle: string;
  durationMinutes: number;
  nextLessonTitle: string;
  courseId: string;
}

export function extractFileMetadata(filePath: string, content: string): FileMetadata {
  const relPath = path.relative(REVISAR_DIR, filePath).replace(/\\/g, '/');
  const pathParts = relPath.split('/');

  const courseId = pathParts[0] || '110-7';
  const folderSubject = pathParts[1] || '';
  const folderOa = pathParts[2] || '';
  const fileName = pathParts[pathParts.length - 1] || '';

  const classNumMatch = fileName.match(/CLASE\s*0?(\d+)/i) || fileName.match(/CLASE_?0?(\d+)/i);
  const detectedClassNum = classNumMatch ? parseInt(classNumMatch[1], 10) : 1;

  let detectedGrade = '7° Básico';
  let detectedSubjNorm = normalizeSubject(folderSubject);
  let detectedOaNum = 1;

  const oaMatch = folderOa.match(/OA0?(\d+)/i);
  if (oaMatch) {
    detectedOaNum = parseInt(oaMatch[1], 10);
  }

  const subjFromContent = content.match(/\*\*(?:Asignatura|Asignatura App):\*\*\s*([^\n·*]+)/i);
  if (subjFromContent) {
    detectedSubjNorm = normalizeSubject(subjFromContent[1]);
  }
  const oaFromContent = content.match(/\*\*(?:OA|C[óo]digo curricular):\*\*\s*([^\n·*]+)/i);
  if (oaFromContent) {
    const oMatch = oaFromContent[1].match(/OA0?(\d+)/i);
    if (oMatch) detectedOaNum = parseInt(oMatch[1], 10);
  }

  const titleMatch = content.match(/\*\*(?:Lesson title|T[íi]tulo de la clase|T[íi]tulo|Title):\*\*\s*(.+)/i);

  const durationMatch = content.match(/\*\*Duraci[óo]n:\*\*\s*(.+)/i)
    || content.match(/\*\*Duration:\*\*\s*(.+)/i);

  const nextMatch = content.match(/\*\*(?:Next class working title|Next class title|T[íi]tulo de trabajo de la siguiente clase|Pr[óo]xima clase):\*\*\s*(.+)/i);

  let resolvedTitle = titleMatch ? titleMatch[1].trim() : '';
  if (!resolvedTitle) {
    const h1Match = content.match(/^#\s+EstudioSimple\s*[·|]\s*(.+)$/m);
    if (h1Match && !h1Match[1].toLowerCase().includes('interactive lesson')) {
      resolvedTitle = h1Match[1].trim();
    }
  }

  return {
    grade: detectedGrade,
    subjectName: getSubjectFormalName(detectedSubjNorm),
    oaCode: `OA ${detectedOaNum}`,
    oaTitle: `${getSubjectFormalName(detectedSubjNorm)} - OA ${detectedOaNum}`,
    lessonNumber: detectedClassNum,
    totalLessons: 6,
    lessonTitle: resolvedTitle || path.basename(filePath, '.md'),
    durationMinutes: durationMatch ? parseInt(durationMatch[1].replace(/[^0-9]/g, ''), 10) || 30 : 30,
    nextLessonTitle: nextMatch ? nextMatch[1].trim() : '',
    courseId
  };
}

// ============================================================================
// PARSER ROBUSTO DELIMITADO POR SECCIONES
// ============================================================================

export function parseLessonMarkdown(mdContent: string, meta: FileMetadata, filePathForContext: string = ''): LessonData {
  const fullText = mdContent.replace(/\r\n/g, '\n').trim();

  // 1. Paso 1 — Preparación del mentor
  let adultObjective = '';
  const objHeaderMatch = fullText.match(/\*\*(?:Objetivo de la clase|Objetivo de la sesión|Objetivo de aprendizaje|Class objective):\*\*\s*([^\n]+)/i);
  const objH3Match = fullText.match(/### (?:Objetivo de aprendizaje de la clase|Objetivo de esta clase|Class objective)\s*\n\s*\*\*([^*]+)\*\*/i);
  if (objHeaderMatch) {
    adultObjective = objHeaderMatch[1].trim();
  } else if (objH3Match) {
    adultObjective = objH3Match[1].trim();
  }
  if (!adultObjective) {
    const p1Obj = fullText.match(/##\s*\d*\.?\s*(?:Paso 1|Step 1|Mentor preparation)[^\n]*\n([\s\S]*?)(?=##\s*\d*\.?\s*(?:Paso 2|Step 2|Learning route))/i);
    if (p1Obj) {
      const p1Match = p1Obj[1].match(/\*\*(?:Propósito|Purpose|Objetivo|Objective):\*\*\s*([^\n]+)/i);
      if (p1Match) adultObjective = p1Match[1].trim();
    }
  }

  let routeToday = '';
  const routeMatch = fullText.match(/\*\*(?:Ruta de la sesión|Ruta de hoy|Ruta|Route|Learning route):\*\*\s*(.+)/i);
  if (routeMatch) routeToday = routeMatch[1].trim();

  let dilePaso1 = '';
  const dile1Match = fullText.match(/\*\*(?:DILE al estudiante|DILE|SAY|DILE \/ SAY):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (dile1Match) dilePaso1 = dile1Match[1].trim();

  const reminders: string[] = [];
  const pautasMatch = fullText.match(/(?:Pautas para el mentor|Mentor guidance|Recordatorios|Reminders):([\s\S]*?)(?:\*\*Clima|\*\*Emotional|\*\*Consejo|\n\s*##\s*\d)/i);
  if (pautasMatch) {
    const pLines = pautasMatch[1].split('\n');
    for (const pl of pLines) {
      const itemMatch = pl.match(/^\s*(?:\d+\.|\-)\s*(.+)/);
      if (itemMatch) reminders.push(itemMatch[1].trim());
    }
  }

  let emotionalTip = '';
  const emoMatch = fullText.match(/(?:\*\*Clima emocional:\*\*|\*\*Clima de aprendizaje:\*\*|\*\*Emotional climate:\*\*|\*\*Tip emocional:\*\*|\*\*Consejo emocional:\*\*|\*\*Cuidado del acompañamiento:\*\*)\s*(.+)/i);
  if (emoMatch) emotionalTip = emoMatch[1].trim();

  // 2. Paso 2A — Ruta de aprendizaje
  const colorMap: Record<string, 'navy' | 'orange' | 'yellow' | 'teal'> = {
    'naranja': 'orange',
    'orange': 'orange',
    'verde': 'teal',
    'green': 'teal',
    'amarillo': 'yellow',
    'yellow': 'yellow',
    'azul marino': 'navy',
    'navy': 'navy'
  };

  const blocks: Array<{ id: string; number: string; title: string; subtitle: string; color: 'navy' | 'orange' | 'yellow' | 'teal' }> = [];
  const tableMatch = fullText.match(/\| N\.?º? \| Bloque \| (?:Qué hará el estudiante|Qué haremos|Acción|Student action) \| Color \|([\s\S]*?)(?:\n\s*\n|\*\*Pregunta clave|\*\*Key question|\*\*DILE)/i);
  if (tableMatch) {
    const tableLines = tableMatch[1].trim().split('\n').filter(l => l.includes('|') && !l.includes('---'));
    let bIndex = 1;
    for (const tLine of tableLines) {
      const parts = tLine.split('|').map(s => s.trim()).filter(Boolean);
      if (parts.length >= 4) {
        const cKey = parts[3].toLowerCase();
        blocks.push({
          id: `b${bIndex}`,
          number: String(bIndex).padStart(2, '0'),
          title: parts[1],
          subtitle: parts[2],
          color: colorMap[cKey] || 'teal'
        });
        bIndex++;
      }
    }
  }

  let dileObjective = '';
  const dileObjMatch = fullText.match(/\*\*(?:DILE — Objetivo del estudiante|DILE — Student objective|DILE):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (dileObjMatch) dileObjective = dileObjMatch[1].trim();

  // 3. Paso 2B — Punto de partida
  let sitDile = '';
  const sitDileMatch = fullText.match(/(?:### (?:Activación|Situación ficticia|Before reading|Recurso de lectura visible)[\s\S]*?)?\*\*(?:DILE antes de leer|DILE|SAY|Before reading):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (sitDileMatch) sitDile = sitDileMatch[1].trim();

  let sitExpected = '';
  const sitExpMatch = fullText.match(/\*\*(?:Respuestas aceptables|Respuesta esperada[^*]*|Expected responses[^*]*|Respuesta de referencia[^*]*):\*\*\s*([^\n]+)/i);
  if (sitExpMatch) sitExpected = sitExpMatch[1].trim();

  let sitHint = '';
  const sitHintMatch = fullText.match(/\*\*(?:Pista socrática|Hint):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (sitHintMatch) sitHint = sitHintMatch[1].trim();

  let refDile = '';
  const refDileMatch = fullText.match(/(?:### (?:Lectura de partida|Punto de partida|Starting-point check)[\s\S]*?)?\*\*(?:Punto de partida \/ Starting point|Pregunta|Question):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (refDileMatch) refDile = refDileMatch[1].trim();

  let refExpected = sitExpected;
  let refSuccess = '¡Excelente fundamentación!';
  let refSupport = sitHint || 'Revisa la lectura para confirmar los datos.';

  // 4. Paso 3 & Paso 5 — Láminas / Diapositivas (R01: Separación bimodal Motivación / Explicación)
  // 4. Paso 3 & Paso 5 — Láminas / Diapositivas (R01/R03: Extracción fiel sin guiones fabricados)
  let hookSlides: SlidePrompt[] = [];
  let formalizationSlides: SlidePrompt[] = [];

  function parseSlidesFromText(text: string, defaultMomento: string, startNum: number = 1): SlidePrompt[] {
    const parsed: SlidePrompt[] = [];
    const headerRegex = /^[#]{3,4}\s+(?:Diapositiva|Lámina|Slide)\s*0?(\d+)[:\s·—\-]?[^\n]*/gim;
    const matches = [...text.matchAll(headerRegex)];
    if (matches.length === 0) return [];

    for (let i = 0; i < matches.length; i++) {
      const cur = matches[i];
      const next = matches[i + 1];
      const sNum = parseInt(cur[1], 10);
      const headerLine = cur[0].replace(/^[#]+\s*/, '').trim();
      const startPos = cur.index + cur[0].length;
      const endPos = next ? next.index : text.length;
      const sBody = text.slice(startPos, endPos);

      const titleMatch = sBody.match(/\*\*(?:Título|Title):\*\*\s*([^\n]+)/i);
      const textMatch = sBody.match(/(?:^|\n)\s*(?:-\s*)?\*\*(?:Texto visible|On-screen text|Texto en Pantalla \(Overlay\)|Overlay):\*\*\s*[“"]?([^”"\n]+)[”"]?/i)
        || sBody.match(/\*\*(?:Título|Title):\*\*\s*([^\n]+)/i);
      const subMatch = sBody.match(/(?:^|\n)\s*(?:-\s*)?\*\*(?:Subtítulo|Subtitle):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
      const imgMatch = sBody.match(/(?:^|\n)\s*(?:-\s*)?\*\*(?:Visual|Imagen|Prompt Visual [^\n:]*):\*\*\s*([^\n]+)/i);
      const locMatch = sBody.match(/(?:^|\n)\s*(?:-\s*)?\*\*(?:Locución|Voice-over|Notas de Locución|Narración):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
      const durMatch = sBody.match(/\*\*(?:Duración(?: estimada)?|Duration):\*\*\s*(\d+)/i)
        || cur[0].match(/(\d+)\s*s\b/i);

      const sTitle = titleMatch ? titleMatch[1].trim() : headerLine;
      const overlayText = textMatch ? textMatch[1].trim() : sTitle;
      const overlaySubtitle = subMatch ? subMatch[1].trim() : '';

      parsed.push({
        slideNumber: startNum + i,
        tituloMomento: defaultMomento,
        didacticPurpose: sTitle,
        visualPrompt: imgMatch ? imgMatch[1].trim() : '',
        overlayText,
        overlayTitle: overlayText,
        overlaySubtitle,
        vectorialOverlayPptx: overlayText,
        speakerNotes: locMatch ? locMatch[1].trim() : '',
        duracionSeg: durMatch ? parseInt(durMatch[1], 10) : 8
      });
    }
    return parsed;
  }

  // Estrategia A: Buscar en "## Guiones audiovisuales"
  const guionesIdx = fullText.search(/^##\s*Guiones audiovisuales/im);
  if (guionesIdx >= 0) {
    const nextH2 = fullText.slice(guionesIdx + 20).search(/^##\s+[^\n]+/im);
    const gText = nextH2 > 0 ? fullText.slice(guionesIdx, guionesIdx + 20 + nextH2) : fullText.slice(guionesIdx);

    const motIdx = gText.search(/^###\s*(?:MOTIVACION|MOTIVACIÓN|GANCHO|HOOK)/im);
    const expIdx = gText.search(/^###\s*(?:EXPLICACION|EXPLICACIÓN|Explanation)/im);

    if (motIdx >= 0 && expIdx > motIdx) {
      const motText = gText.slice(motIdx, expIdx);
      const expText = gText.slice(expIdx);
      hookSlides = parseSlidesFromText(motText, 'Motivación', 1);
      formalizationSlides = parseSlidesFromText(expText, 'Explicación', 8);
    }
  }

  // Estrategia B: Buscar en Paso 3
  if (hookSlides.length === 0 && formalizationSlides.length === 0) {
    const p3Idx = fullText.search(/^##\s*\d*\.?\s*(?:Paso 3|Step 3|Videos|Motivación y explicación|Gancho y explicación)/im);
    if (p3Idx >= 0) {
      const nextH2 = fullText.slice(p3Idx + 20).search(/^##\s*\d*\.?\s*(?:Paso 4|Step 4|Conversación)|^##\s+[A-Za-z]/im);
      const p3Text = nextH2 > 0 ? fullText.slice(p3Idx, p3Idx + 20 + nextH2) : fullText.slice(p3Idx);

      const motIdx = p3Text.search(/^###\s*(?:MOTIVACION|MOTIVACIÓN|GANCHO|HOOK|Hook video|Hook\b|Gancho|Presentación 1)/im);
      const expIdx = p3Text.search(/^###\s*(?:EXPLICACION|EXPLICACIÓN|Explanation|Explicación|Presentación 2)/im);

      if (motIdx >= 0 && expIdx > motIdx) {
        const motText = p3Text.slice(motIdx, expIdx);
        const expText = p3Text.slice(expIdx);
        hookSlides = parseSlidesFromText(motText, 'Motivación', 1);
        formalizationSlides = parseSlidesFromText(expText, 'Explicación', 8);
      } else {
        const allSlides = parseSlidesFromText(p3Text, 'Motivación', 1);
        if (allSlides.length === 14) {
          hookSlides = allSlides.slice(0, 7);
          formalizationSlides = allSlides.slice(7, 14);
        } else if (allSlides.length === 7) {
          hookSlides = allSlides;
        }
      }
    }
  }

  // Estrategia C: Buscar ### MOTIVACION y ### EXPLICACION en cualquier parte
  if (hookSlides.length === 0 && formalizationSlides.length === 0) {
    const motIdx = fullText.search(/^###\s*(?:MOTIVACION|MOTIVACIÓN|GANCHO|HOOK)/im);
    const expIdx = fullText.search(/^###\s*(?:EXPLICACION|EXPLICACIÓN|Explanation)/im);
    if (motIdx >= 0 && expIdx > motIdx) {
      const nextH2 = fullText.slice(expIdx).search(/^##\s+[^\n]+/im);
      const motText = fullText.slice(motIdx, expIdx);
      const expText = nextH2 > 0 ? fullText.slice(expIdx, expIdx + nextH2) : fullText.slice(expIdx);
      hookSlides = parseSlidesFromText(motText, 'Motivación', 1);
      formalizationSlides = parseSlidesFromText(expText, 'Explicación', 8);
    }
  }

  // Normalizar numeración y títulos oficiales sin fabricar contenido
  hookSlides.forEach((s, i) => {
    s.slideNumber = i + 1;
    s.tituloMomento = 'Motivación';
  });
  formalizationSlides.forEach((s, i) => {
    s.slideNumber = i + 8;
    s.tituloMomento = 'Explicación';
  });

  // 5. Paso 4 — Conversación Guiada (R02: Soporte para formato multilingüe y sin viñeta)
  const preQuestions: GuidedItem[] = [];
  const convSectionMatch = fullText.match(/##\s*\d*\.?\s*(?:Paso 4|Step 4|Guided conversation|Conversación guiada)[^\n]*([\s\S]*?)(?=##\s*\d*\.?\s*(?:Paso 5|Step 5|Explanation|Explicación))/i);
  if (convSectionMatch) {
    const convText = convSectionMatch[1];
    const itemRegex = /###\s+(?:Conversación|Pregunta|Question)\s*\d+[^\n]*\n([\s\S]*?)(?=###\s+(?:Conversación|Pregunta|Question)|$)/gi;
    const matches = [...convText.matchAll(itemRegex)];
    for (const m of matches) {
      const b = m[1];
      const ctxMatch = b.match(/(?:^|\n)\s*(?:-\s*)?\*\*Context(?:o)?:\*\*\s*([^\n]+)/i);
      const qMatch = b.match(/(?:^|\n)\s*(?:-\s*)?\*\*(?:DILE|PREGÚNTALE|Pregunta|Question|Ask|SAY|PREGÚNTALE \/ ASK):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
      const expMatch = b.match(/(?:^|\n)\s*(?:-\s*)?\*\*(?:Respuesta esperada[^*]*|Expected answer[^*]*|Respuesta de referencia[^*]*):\*\*\s*([^\n]+)/i);
      const succMatch = b.match(/(?:^|\n)\s*(?:-\s*)?\*\*(?:Éxito|Success|Evidencia|Evidence|Criterio|Criterion):\*\*\s*([^\n]+)/i);
      const suppMatch = b.match(/(?:^|\n)\s*(?:-\s*)?\*\*(?:Apoyo 1|Apoyo|Support 1|Support):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
      const revMentorMatch = b.match(/(?:^|\n)\s*(?:-\s*)?\*\*(?:Revelación para el mentor|Mentor reveal|Apoyo 3[^*]*):\*\*\s*([^\n]+)/i);
      const revStudentMatch = b.match(/(?:^|\n)\s*(?:-\s*)?\*\*(?:Revelación estudiante|Student reveal):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);

      if (qMatch) {
        preQuestions.push({
          context: ctxMatch ? ctxMatch[1].trim() : 'Conversación guiada',
          question: qMatch[1].trim(),
          expected: expMatch ? expMatch[1].trim() : '',
          success: succMatch ? succMatch[1].trim() : '',
          support: suppMatch ? suppMatch[1].trim() : '',
          reveal: revMentorMatch ? revMentorMatch[1].trim() : (expMatch ? expMatch[1].trim() : ''),
          studentReveal: revStudentMatch ? revStudentMatch[1].trim() : (expMatch ? expMatch[1].trim() : '')
        });
      }
    }
  }

  // 6. Paso 5 — Formalización e Idea Clave
  const formalMatch = fullText.match(/##\s*\d*\.?\s*(?:Paso 5|Step 5)[^\n]*([\s\S]*?)(?=##\s*\d*\.?\s*(?:Paso 5B|Step 5B|Paso 6|Step 6|Joint and independent practice|Práctica))/i);
  let formalConcept = '';
  let formalIdea = '';
  let formalDile = '';
  let formalHaz = '';

  if (formalMatch) {
    const fText = formalMatch[1];
    const cMatch = fText.match(/\*\*Concept(?:o)?:\*\*\s*([^\n]+)/i);
    if (cMatch) formalConcept = cMatch[1].trim();

    const idMatch = fText.match(/\*\*(?:Idea clave|Key idea):\*\*\s*([^\n]+)/i);
    if (idMatch) formalIdea = idMatch[1].trim();

    const fdMatch = fText.match(/\*\*(?:DILE|SAY):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
    if (fdMatch) formalDile = fdMatch[1].trim();

    const fhMatch = fText.match(/\*\*(?:HAZ|DO):\*\*\s*([^\n]+)/i);
    if (fhMatch) formalHaz = fhMatch[1].trim();
  }

  // 7. Paso 5B — Comprobación Inmediata (R02 & Grupo B)
  const postQuestions: GuidedItem[] = [];

  // A) Búsqueda en sección dedicada Paso 5B o Comprobación
  const compSectionMatch = fullText.match(/(?:^|\n)##\s*\d*\.?\s*(?:Paso 5B|Step 5B|Comprobación|Check)[^\n]*\n([\s\S]*?)(?=(?:\n|^)##\s*\d*\.?\s*(?:Paso 6|Step 6)|(?:\n|^)##\s+[A-Za-z]|$)/i);
  if (compSectionMatch) {
    const compText = compSectionMatch[1];
    const compRegex = /(?:^|\n)###\s+(?:Pregunta de\s+)?(?:Comprobación|Check)\s*\d+[^\n]*\n([\s\S]*?)(?=(?:\n|^)###\s+(?:Pregunta de\s+)?(?:Comprobación|Check)|(?:\n|^)##|$)/gi;
    const matches = [...compText.matchAll(compRegex)];
    let idx = 1;
    for (const m of matches) {
      const b = m[1];
      const qMatch = b.match(/\*\*(?:Pregunta|Question):\*\*\s*[“"]?([^”"\n]+)[”"]?/i) || b.match(/(?:^|\n)\s*[“"]?([^”"\n]+\?)[”"]?/);
      const expMatch = b.match(/\*\*(?:Respuesta esperada|Expected answer|Solución modelo):\*\*\s*([^\n]+)/i);
      const suppMatch = b.match(/\*\*(?:Apoyo|Support|Pista):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
      if (qMatch) {
        postQuestions.push({
          context: `Comprobación ${idx}`,
          question: qMatch[1].trim(),
          expected: expMatch ? expMatch[1].trim() : '',
          success: 'Respuesta precisa y fundamentada',
          support: suppMatch ? suppMatch[1].trim() : 'Revisa el concepto clave expuesto',
          reveal: expMatch ? expMatch[1].trim() : '',
          studentReveal: expMatch ? expMatch[1].trim() : ''
        });
        idx++;
      }
    }
  }

  // B) Si no se encontraron en 5B, buscar todas las ocurrencias dentro de Paso 5 (con/sin número)
  if (postQuestions.length === 0) {
    const p5BlockMatch = fullText.match(/##\s*\d*\.?\s*(?:Paso 5|Step 5)[^\n]*\n([\s\S]*?)(?=##\s*\d*\.?\s*(?:Paso 6|Step 6|Joint and independent practice|Práctica))/i);
    const searchScope = p5BlockMatch ? p5BlockMatch[1] : fullText;

    const compGlobalRegex = /\*\*(?:Comprobación inmediata|Immediate check|Comprobación|Check)\s*(\d+)?:\*\*\s*[“"]?([^”"\n]+)[”"]?/gi;
    const compMatches = [...searchScope.matchAll(compGlobalRegex)];

    for (let i = 0; i < compMatches.length; i++) {
      const cMatch = compMatches[i];
      const cNum = cMatch[1] || '';
      const cQuestion = cMatch[2].trim();
      
      const startPos = cMatch.index! + cMatch[0].length;
      const nextMatch = compMatches[i + 1];
      const endPos = nextMatch ? nextMatch.index! : searchScope.length;
      const subBlock = searchScope.slice(startPos, endPos);

      let modelRegex = cNum
        ? new RegExp(`\\*\\*(?:Modelo de comprobación|Check model|Respuesta comprobación)\\s*${cNum}:\\*\\*\\s*([^\\n]+)`, 'i')
        : /\*\*(?:Modelo de comprobación|Check model|Respuesta comprobación)(?:\s*\d+)?:[^*]*\*\*\s*([^\n]+)/i;
      
      let supportRegex = cNum
        ? new RegExp(`\\*\\*(?:Apoyo de comprobación|Check support|Apoyo)\\s*${cNum}:\\*\\*\\s*[“"]?([^”"\\n]+)[”"]?`, 'i')
        : /\*\*(?:Apoyo de comprobación|Check support|Apoyo)(?:\s*\d+)?:[^*]*\*\*\s*[“"]?([^”"\\n]+)[”"]?/i;

      const mMatch = subBlock.match(modelRegex) || subBlock.match(/\*\*(?:Modelo de comprobación|Check model|Respuesta comprobación):\*\*\s*([^\n]+)/i);
      const sMatch = subBlock.match(supportRegex) || subBlock.match(/\*\*(?:Apoyo de comprobación|Check support|Apoyo):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);

      postQuestions.push({
        context: cNum ? `Comprobación ${cNum}` : `Comprobación ${i + 1}`,
        question: cQuestion,
        expected: mMatch ? mMatch[1].trim() : '',
        success: 'Respuesta precisa y fundamentada',
        support: sMatch ? sMatch[1].trim() : 'Revisa el concepto clave expuesto',
        reveal: mMatch ? mMatch[1].trim() : '',
        studentReveal: mMatch ? mMatch[1].trim() : ''
      });
    }
  }

  // 8. Paso 6 — Práctica conjunta y transferencia autónoma (R02: Soporte sin viñetas y multilingüe)
  const practice: GuidedItem[] = [];
  const pSectionMatch = fullText.match(/##\s*\d*\.?\s*(?:Paso 6|Step 6|Práctica conjunta|Joint and independent practice)[^\n]*([\s\S]*?)(?=##\s*\d*\.?\s*(?:Paso 7|Step 7|Miniquiz|Mini-quiz))/i);
  if (pSectionMatch) {
    const pSection = pSectionMatch[1];
    const caseRegex = /###\s+(?:Caso(?:\s+de\s+Práctica)?\s*\d+|Case\s*\d+|Task\s*\d+|Aplicación autónoma y transferencia|Autonomous application[^\n]*)/gi;
    const matches = [...pSection.matchAll(caseRegex)];

    for (let i = 0; i < matches.length; i++) {
      const heading = matches[i][0];
      const start = matches[i].index + heading.length;
      const end = (i + 1 < matches.length) ? matches[i + 1].index : pSection.length;
      const blockText = pSection.substring(start, end);

      if (/aplicación autónoma|autonomous application/i.test(heading)) {
        const resMatch = blockText.match(/\*\*(?:Recurso nuevo visible[^\n]*):\*\*\s*([\s\S]*?)(?=\n\s*\*\*(?:Actividad|Criterio|Cómo valorar)|$)/i);
        const actMatch = blockText.match(/\*\*(?:Actividad del estudiante|Student activity):\*\*\s*([^\n]+)/i);
        const critMatch = blockText.match(/\*\*(?:Criterio privado del mentor[^\n]*):\*\*\s*([^\n]+)/i);
        const valMatch = blockText.match(/\*\*(?:Cómo valorar|How to assess):\*\*\s*([^\n]+)/i);

        const resourceText = resMatch ? resMatch[1].trim() : '';
        if (!resourceText) {
          throw new Error(`[Pipeline Error] Ruta: ${filePathForContext || meta.fileName} | Campo: practice[${practice.length}].context | Causa: Estímulo indispensable ausente en la fuente ('Recurso nuevo visible para el estudiante' no encontrado o vacío; prohibido sustituir por rótulo genérico).`);
        }

        practice.push({
          context: resourceText,
          question: actMatch ? actMatch[1].trim() : 'Realiza la transferencia autónoma con el nuevo recurso.',
          expected: critMatch ? critMatch[1].trim() : 'Aplica los criterios aprendidos al nuevo caso.',
          success: 'Aplica el criterio de la clase de manera autónoma en un recurso nuevo',
          support: valMatch ? valMatch[1].trim() : 'Revisa el recurso y aplica los criterios aprendidos.',
          reveal: critMatch ? critMatch[1].trim() : '',
          studentReveal: critMatch ? critMatch[1].trim() : ''
        });
      } else {
        const resMatch = blockText.match(/(?:^|\n)\s*(?:-\s*)?\*\*(?:Recurso|Resource|Contexto|Context):\*\*\s*([\s\S]*?)(?=\n\s*(?:-\s*)?\*\*(?:Actividad|Pregunta|Task|Question|Procedimiento|Criterio)|$)/i);
        const actMatch = blockText.match(/(?:^|\n)\s*(?:-\s*)?\*\*(?:Actividad|Activity|Task|Pregunta|Question):\*\*\s*([^\n]+)/i);
        const expMatch = blockText.match(/(?:^|\n)\s*(?:-\s*)?\*\*(?:Respuesta de referencia|Reference answer|Modelo para revisar[^*]*|Modelo|Model):\*\*\s*([^\n]+)/i);
        const critMatch = blockText.match(/(?:^|\n)\s*(?:-\s*)?\*\*(?:Criterio|Success criterion|Respaldo|Support):\*\*\s*([^\n]+)/i);
        const suppMatch = blockText.match(/(?:^|\n)\s*(?:-\s*)?\*\*(?:Apoyo|Support|Pista):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);

        if (actMatch || resMatch) {
          practice.push({
            context: resMatch ? resMatch[1].trim() : `Caso ${i + 1}`,
            question: actMatch ? actMatch[1].trim() : 'Resuelve la actividad en tu cuaderno.',
            expected: expMatch ? expMatch[1].trim() : '',
            success: critMatch ? critMatch[1].trim() : 'Cumple el criterio formal del caso',
            support: suppMatch ? suppMatch[1].trim() : 'Revisa los datos del recurso',
            reveal: expMatch ? expMatch[1].trim() : '',
            studentReveal: expMatch ? expMatch[1].trim() : ''
          });
        }
      }
    }
  }

  // 9. Paso 7 — Miniquiz y Recuperación (R03: Cero tolerancia a defaults silenciosos)
  const mini: QuizQuestion[] = [];
  const recovery: RecoveryItem[] = [];

  const paso7SectionMatch = fullText.match(/##\s*\d*\.?\s*(?:Paso 7|Step 7|Miniquiz|Mini-quiz)[^\n]*([\s\S]*?)(?=##\s*\d*\.?\s*(?:Paso 8|Step 8|Síntesis|Summary)|## Trazabilidad|## Guiones|$)/i);
  const paso7Text = paso7SectionMatch ? paso7SectionMatch[1] : fullText;

  // Extraer Reactivos
  const reactivoRegex = /###\s+(?:Reactivo|Item|Pregunta)\s*\d+[^\n]*\n([\s\S]*?)(?=###\s+(?:Reactivo|Item|Pregunta|Recuperación|Recovery|Refuerzo)|####|##|$)/gi;
  const rMatches = [...paso7Text.matchAll(reactivoRegex)];

  let qIdx = 1;
  for (const rm of rMatches) {
    const rBlock = rm[1];
    const lines = rBlock.split('\n');

    let qText = '';
    const enunMatch = rBlock.match(/\*\*(?:Enunciado|Question|Prompt):\*\*\s*([^\n]+)/i);
    if (enunMatch) {
      qText = enunMatch[1].trim();
    } else {
      const qLines: string[] = [];
      for (const line of lines) {
        const trimmed = line.trim();
        if (/^-\s*(?:[⚪✅\s]*[A-D][.)]|\*\*[A-D]\.\*\*)/i.test(trimmed) || /^\s*-\s*[A-D]\./i.test(trimmed)) {
          break;
        }
        if (/^-\s+[A-Za-z0-9]/.test(trimmed) && (trimmed.includes('%') || trimmed.length < 50)) {
          break;
        }
        if (trimmed && !trimmed.startsWith('**Clave') && !trimmed.startsWith('**Explicación') && !trimmed.startsWith('**Análisis') && !trimmed.startsWith('**Alternativas')) {
          const cleanLine = trimmed.replace(/^\*\*([^*]+)\*\*$/, '$1').trim();
          qLines.push(cleanLine);
        }
      }
      qText = qLines.join(' ').trim();
    }

    qText = qText.replace(/^(?:Reactivo|Item|Pregunta)\s*\d+[:.\s]*/i, '').trim();

    const options: string[] = [];
    const optionLetters: string[] = ['A', 'B', 'C', 'D'];
    let markedCorrectLetter = '';

    const optLines = lines.filter(l => {
      const t = l.trim();
      return /^-\s*(?:[⚪✅\s]*[A-D][.)]|\*\*[A-D]\.\*\*)/i.test(t) || (/^-\s+/.test(t) && !t.includes('**Clave') && !t.includes('**Explicación') && !t.includes('**Análisis'));
    });

    for (let oIdx = 0; oIdx < optLines.length && oIdx < 4; oIdx++) {
      let rawLine = optLines[oIdx].replace(/^\s*-\s*/, '').trim();
      rawLine = rawLine.replace(/^[⚪✅\s]+/, '').trim();
      const hasCorrectTag = rawLine.includes('**Correcta**') || rawLine.includes('**Correct**') || optLines[oIdx].includes('✅');
      const cleanOpt = rawLine.replace(/\*\*(?:Correcta|Correct)\*\*/g, '').trim();

      const optTextMatch = cleanOpt.match(/^[A-D][.)]\s*(.+)/i);
      const finalOptText = optTextMatch ? optTextMatch[1].trim() : cleanOpt;
      const letter = optionLetters[oIdx];

      options.push(`${letter}. ${finalOptText}`);
      if (hasCorrectTag) {
        markedCorrectLetter = letter;
      }
    }

    // Extraer clave privada: CERO DEFAULTS SILENCIOSOS (R03)
    const claveMatch = rBlock.match(/\*\*(?:Clave privada|Clave|Key|Respuesta correcta):\*\*\s*([A-D])[.)]?/i);
    const targetLetter = claveMatch ? claveMatch[1].toUpperCase() : markedCorrectLetter;

    if (!targetLetter) {
      throw new Error(`[Pipeline Error] Ruta: ${filePathForContext || 'desconocida'} | Campo: Paso 7 Reactivo ${qIdx} Clave | Causa: No se encontró clave privada explícita (**Clave privada:** [A-D]) ni marca de respuesta correcta.`);
    }

    const matchedOpt = options.find(o => o.startsWith(`${targetLetter}.`));
    if (!matchedOpt) {
      throw new Error(`[Pipeline Error] Ruta: ${filePathForContext || 'desconocida'} | Campo: Paso 7 Reactivo ${qIdx} Clave | Causa: La clave '${targetLetter}' no coincide con ninguna de las opciones disponibles (${options.map(o => o.slice(0, 2)).join(', ')}).`);
    }
    const correctOption = matchedOpt;

    const corrMatch = rBlock.match(/\*\*(?:Explicación formativa|Corrección|Corrective feedback|Feedback):\*\*\s*([^\n]+)/i);
    const fixExplain = corrMatch ? corrMatch[1].trim() : 'Revisa la lectura y las evidencias del texto para fundamentar tu respuesta.';

    if (!qText || qText === 'Clave privada:') {
      throw new Error(`[Pipeline Error] Ruta: ${filePathForContext || 'desconocida'} | Campo: Paso 7 Reactivo ${qIdx} Enunciado | Causa: Enunciado inválido o ausente ('${qText}').`);
    }

    if (options.length !== 4) {
      throw new Error(`[Pipeline Error] Ruta: ${filePathForContext || 'desconocida'} | Campo: Paso 7 Reactivo ${qIdx} Opciones | Causa: Opciones insuficientes (${options.length}). Se requieren exactamente 4 alternativas.`);
    }

    mini.push({
      id: `q${qIdx}`,
      q: qText,
      options,
      correct: correctOption,
      fixExplain
    });

    qIdx++;
  }

  // Extraer items de Recuperación
  const recoveryRegex = /(?:###\s+(?:Recuperación|Recovery|Refuerzo|Ítem de Recuperación)\s*\d+[^\n]*|####\s+(?:Nueva práctica para el reactivo|Recuperación|Ítem de Recuperación|Recovery Item)\s*\d+[^\n]*)\n([\s\S]*?)(?=###\s+(?:Reactivo|Item|Pregunta|Recuperación|Recovery|Refuerzo|Ítem de Recuperación)|####\s+(?:Nueva práctica|Recuperación|Ítem de Recuperación)|##|$)/gi;
  const recMatches = [...paso7Text.matchAll(recoveryRegex)];

  let recIdx = 1;
  for (const rcm of recMatches) {
    const bText = rcm[1];
    const heading = rcm[0].split('\n')[0];
    const title = heading.replace(/^[#\s]+/, '').trim() || `Recuperación Reactivo ${recIdx}`;

    const teachMatch = bText.match(/\*\*(?:Enseñanza|Teaching|Explicación pedagógica|Explicación para el estudiante|Explicación|Explanation):\*\*\s*([^\n]+)/i);
    const hintMatch = bText.match(/\*\*(?:Pista|Hint):\*\*\s*([^\n]+)/i);
    const explain = teachMatch ? teachMatch[1].trim() : (hintMatch ? hintMatch[1].trim() : `Revisa los conceptos clave del reactivo ${recIdx}.`);

    const resMatch = bText.match(/\*\*(?:Recurso visible de recuperación|New original message for recovery[^*]*):\*\*\s*([\s\S]*?)(?=\n\s*\*\*(?:Tarea|Student new task|Pregunta|Apoyo|Criterio)|$)/i);
    const resourceText = resMatch ? resMatch[1].trim() : '';

    const taskMatch = bText.match(/\*\*(?:Tarea nueva del estudiante|Student new task|Pregunta de refuerzo|Pregunta de reintento|Pregunta|Question):\*\*\s*([^\n]+)/i);
    const q = taskMatch ? taskMatch[1].trim() : `Paso guiado de recuperación para el Reactivo ${recIdx}`;

    const ap1Match = bText.match(/\*\*(?:Apoyo 1[^\n]*|Si necesita apoyo[^\n]*|Texto de Apoyo[^\n]*):\*\*\s*([^\n]+)/i);
    const fixText = ap1Match ? ap1Match[1].trim() : 'Vuelve a revisar la página de referencia para consolidar el aprendizaje.';

    const ap2Match = bText.match(/\*\*(?:Apoyo 2[^\n]*):\*\*\s*([^\n]+)/i);
    const support2 = ap2Match ? ap2Match[1].trim() : undefined;

    const modMatch = bText.match(/\*\*(?:Apoyo 3 y modelo privado[^\n]*|Si acierta[^\n]*|Texto de Éxito[^\n]*|Respuesta correcta|Correct answer):\*\*\s*([^\n]+)/i);
    const correctText = modMatch ? modMatch[1].trim() : '¡Excelente! Lograste resolver el reactivo con el andamiaje del texto.';

    const exitMatch = bText.match(/\*\*(?:Criterio de salida de esta práctica):\*\*\s*([^\n]+)/i);
    const exitCriteria = exitMatch ? exitMatch[1].trim() : undefined;

    const isOpenTask = bText.includes('Esta es práctica abierta') || bText.includes('no convertir las pistas en alternativas') || bText.includes('práctica abierta:') || bText.includes('Tarea de cuaderno');

    let recoveryKind: 'open_response' | 'multiple_choice' = 'open_response';
    let recoveryOptions: string[] = [];
    let recoveryCorrect = '';

    if (!isOpenTask) {
      const directOptLines = bText.split('\n')
        .filter(l => /^[-*]\s*(?:\*\*)?[A-D][.)]/i.test(l.trim()))
        .slice(0, 4);

      if (directOptLines.length === 4) {
        recoveryKind = 'multiple_choice';
        recoveryOptions = directOptLines.map(l => {
          let clean = l.replace(/^[-*]\s*/, '').trim();
          clean = clean.replace(/\*\*\(([A-D])\)\*\*/i, '$1.');
          clean = clean.replace(/\*\*([A-D])[.)]\*\*/i, '$1.');
          clean = clean.replace(/\*\*(?:Correcta|Correct)\*\*/g, '').trim();
          return clean;
        });
        const rClaveMatch = bText.match(/\*\*(?:Clave privada|Clave):\*\*\s*([A-D])/i);
        let rLet = rClaveMatch ? rClaveMatch[1].toUpperCase() : '';
        if (!rLet) {
          const correctIdx = directOptLines.findIndex(l => l.includes('Correcta') || l.includes('Correct') || l.includes('✅'));
          if (correctIdx >= 0) {
            rLet = ['A', 'B', 'C', 'D'][correctIdx];
          }
        }
        if (!rLet) {
          throw new Error(`[Pipeline Error] Ruta: ${filePathForContext || meta.fileName} | Campo: recovery[${recIdx}].correct | Causa: Recuperación de selección múltiple carece de clave explícita [A-D] o marca inequívoca en la fuente (prohibido default a 'A').`);
        }
        const matchedOpt = recoveryOptions.find(o => o.startsWith(`${rLet}.`));
        if (!matchedOpt) {
          throw new Error(`[Pipeline Error] Ruta: ${filePathForContext || meta.fileName} | Campo: recovery[${recIdx}].correct | Causa: La clave '${rLet}' no coincide con ninguna de las 4 opciones encontradas.`);
        }
        recoveryCorrect = matchedOpt;
      } else if (directOptLines.length > 0 && directOptLines.length < 4) {
        throw new Error(`[Pipeline Error] Ruta: ${filePathForContext || meta.fileName} | Campo: recovery[${recIdx}].options | Causa: Recuperación de selección múltiple incompleta: se encontraron ${directOptLines.length} opciones en lugar de 4.`);
      }
    }

    recovery.push({
      title,
      explain,
      q,
      kind: recoveryKind,
      options: recoveryOptions,
      correct: recoveryCorrect,
      correctText,
      fixText,
      support2,
      resource: resourceText || undefined,
      exitCriteria
    });

    recIdx++;
  }

  // Si la recuperación está formateada como lista con viñetas (- **Si necesita apoyo...:** ...)
  if (recovery.length === 0) {
    const bulletRecSection = paso7Text.match(/###\s*(?:Recuperación formativa|Recovery by item|Recuperación|Recovery)[^\n]*\n([\s\S]*?)(?=##|$)/i);
    if (bulletRecSection) {
      const bLines = bulletRecSection[1].split('\n').filter(l => l.trim().startsWith('-'));
      let bIdx = 1;
      for (const bl of bLines) {
        const m = bl.match(/^-\s*\*\*([^:*]+):\*\*\s*([^\n]+)/);
        if (m) {
          const itemTitle = m[1].trim();
          const itemSupport = m[2].trim();
          recovery.push({
            title: `Refuerzo: ${itemTitle}`,
            explain: itemSupport,
            q: `Resuelve en tu cuaderno físico: ${itemSupport}`,
            kind: 'open_response',
            options: [],
            correct: '',
            correctText: '¡Muy bien! Completaste el refuerzo correctamente en tu cuaderno.',
            fixText: itemSupport
          });
          bIdx++;
        }
      }
    }
  }

  // 11. Paso 8 — Síntesis y Cierre
  const summaryIdeas: Array<[string, string]> = [];
  const ideasSection = fullText.match(/(?:### Tres ideas para recordar|### Ideas de síntesis|### Key ideas|\*\*Ideas de síntesis:\*\*)([\s\S]*?)(?=\*\*Pregunta de síntesis|\*\*Synthesis question|\*\*Síntesis:|$)/i);
  if (ideasSection) {
    const iLines = ideasSection[1].split('\n').filter(l => /^\s*(?:\d+\.|\-)\s*/.test(l));
    for (const il of iLines) {
      const cleanIl = il.replace(/^\s*(?:\d+\.|\-)\s*/, '').trim();
      const boldMatch = cleanIl.match(/\*\*([^*]+)\*\*:\s*(.+)/);
      if (boldMatch) {
        summaryIdeas.push([boldMatch[1].trim(), boldMatch[2].trim()]);
      } else {
        summaryIdeas.push(['Idea clave', cleanIl]);
      }
    }
  }

  const synQMatch = fullText.match(/\*\*(?:Pregunta de síntesis|Synthesis question|Síntesis):\*\*\s*([^\n]+)/i);
  const metaQMatch = fullText.match(/\*\*(?:Metacognición|Metacognition):\*\*\s*([^\n]+)/i);
  const celMatch = fullText.match(/\*\*(?:Celebración|Celebration|Cierre):\*\*\s*([^\n]+)/i);

  const normSubject = normalizeSubject(meta.subjectName);

  // Ensamblar LessonData con hook obligatorio (R01)
  const lessonData: LessonData = {
    metadata: {
      grade: meta.grade,
      subject: meta.subjectName,
      oaCode: meta.oaCode,
      oaTitle: meta.oaTitle,
      lessonNumber: meta.lessonNumber,
      totalLessonsInOa: meta.totalLessons,
      lessonTitle: meta.lessonTitle,
      durationMinutes: meta.durationMinutes,
      nextLessonTitle: meta.nextLessonTitle
    },
    prep: {
      adultObjective: adultObjective,
      routeToday: routeToday || `Ruta guiada de la clase ${meta.lessonNumber}`,
      mentorReminder: dilePaso1 || 'Sigue las orientaciones pedagógicas del guion interactivo.',
      reminders: reminders.length > 0 ? reminders : ['Acompaña al estudiante y valora su proceso.'],
      emotionalTip: emotionalTip || 'Valora cada avance con paciencia y entusiasmo.'
    },
    route: {
      blocks: blocks.length > 0 ? blocks : [
        { id: 'b1', number: '01', title: 'Punto de partida', subtitle: 'Activación', color: 'teal' },
        { id: 'b2', number: '02', title: 'Motivación y Explicación', subtitle: '14 láminas', color: 'orange' },
        { id: 'b3', number: '03', title: 'Práctica guiada', subtitle: 'Transferencia', color: 'yellow' },
        { id: 'b4', number: '04', title: 'Miniquiz', subtitle: 'Evaluación y cierre', color: 'navy' }
      ],
      dileIntro: 'Hoy avanzaremos en una nueva clase interactiva.',
      dileObjective: dileObjective || meta.lessonTitle
    },
    situation: {
      dilePrompt: sitDile || 'Observa la situación de partida para comenzar.',
      expectedAnswer: sitExpected || 'Respuesta basada en la observación directa.',
      socraticHint: sitHint || 'Fíjate en los detalles destacados.',
      emotionalTip: emotionalTip || 'Acompaña con calma.',
      options: [
        {
          label: sitExpected || 'Respuesta guiada correcta',
          kind: 'correct',
          feedbackText: '¡Muy bien observado!'
        },
        {
          label: 'Requiere apoyo adicional',
          kind: 'needs_support',
          feedbackText: 'Revisa nuevamente la situación inicial.'
        },
        {
          label: 'No sabe qué responder',
          kind: 'no_answer',
          feedbackText: 'Leamos juntos para descubrir la pista.'
        }
      ]
    },
    reference: {
      dilePrompt: refDile || 'Revisemos el punto de partida.',
      question: '¿Qué información entrega el punto de partida?',
      expectedAnswer: refExpected || 'Respuesta esperada según el texto.',
      socraticHint: 'Localiza las palabras clave.',
      feedbackSuccess: refSuccess || '¡Excelente fundamentación!',
      feedbackSupport: refSupport || 'Revisa la fuente para confirmar los datos.'
    },
    hook: {
      title: 'Motivación',
      titulo: 'Motivación',
      focusPoints: [],
      dileIntro: sitDile || 'Hoy exploraremos una nueva situación motivadora.',
      hazInstruction: 'Observa y reflexiona con las escenas del video.',
      videoSrc: '',
      dileAfterVideo: '¿Qué observaste en esta situación inicial?',
      slides: hookSlides
    },
    preQuestions,
    conversationContext: 'Diálogo guiado para profundizar en los elementos clave.',
    formalization: {
      title: formalConcept || 'Explicación',
      concept: formalConcept || meta.lessonTitle,
      summary: formalIdea || 'Consolidación de las ideas clave.',
      ideaClave: formalIdea || formalConcept || meta.lessonTitle,
      dileIntro: formalDile || 'Ahora consolidaremos los aprendizajes esenciales.',
      hazInstruction: formalHaz || 'Registra en tu cuaderno el concepto principal.',
      graphicPoster: '',
      videoSrc: '',
      slides: formalizationSlides
    },
    postQuestions,
    practice,
    mini,
    recovery,
    summaryIdeas: summaryIdeas.length > 0 ? summaryIdeas : [
      ['Idea central', meta.lessonTitle],
      ['Comprensión', 'Aplicación del criterio formal en el cuaderno físico.']
    ],
    interactive: getInteractiveConfig(normSubject, meta.lessonTitle),
    closure: {
      congratulations: celMatch ? celMatch[1].trim() : '¡Felicitaciones por completar la sesión de hoy!',
      nextClassPreview: meta.nextLessonTitle ? `Próxima clase: ${meta.nextLessonTitle}` : '¡Nos vemos en la próxima lección!'
    },
    paso8_cierre: {
      preguntaSintesis: synQMatch ? synQMatch[1].trim() : '¿Qué aprendiste hoy?',
      metacognicion: metaQMatch ? metaQMatch[1].trim() : '¿Qué estrategia te ayudó más?',
      celebracion: celMatch ? celMatch[1].trim() : '¡Buen trabajo hoy!'
    }
  };

  // Validación estricta de campos esenciales obligatorios (Directivas R01, R02, R03)
  if (!lessonData.metadata.lessonTitle || lessonData.metadata.lessonTitle.trim().length === 0) {
    throw new Error(`[Pipeline Error] Ruta: ${filePathForContext || 'desconocida'} | Campo: metadata.lessonTitle | Causa: Título de lección obligatorio ausente o no interpretable.`);
  }
  if (!lessonData.prep.adultObjective || lessonData.prep.adultObjective.trim().length === 0 || lessonData.prep.adultObjective.startsWith('Preparación de la clase')) {
    throw new Error(`[Pipeline Error] Ruta: ${filePathForContext || 'desconocida'} | Campo: prep.adultObjective | Causa: Objetivo de aprendizaje obligatorio ausente o reemplazado por plantilla.`);
  }
  if (!lessonData.mini || lessonData.mini.length !== 3) {
    throw new Error(`[Pipeline Error] Ruta: ${filePathForContext || 'desconocida'} | Campo: mini (Paso 7) | Causa: Se encontraron ${lessonData.mini ? lessonData.mini.length : 0} reactivos de miniquiz. Se requieren estrictamente 3 reactivos psicométricos completos.`);
  }

  return lessonData;
}

// ============================================================================
// EJECUCIÓN DEL PIPELINE EN STAGING AISLADO
// ============================================================================

export async function runUniversalPipeline(options: {
  outputDir?: string;
  isStaging?: boolean;
} = {}) {
  const isStaging = options.isStaging ?? true;
  const targetLessonsDir = options.outputDir || STAGING_LESSONS_DIR;
  const targetManifestDir = isStaging ? STAGING_MANIFEST_DIR : path.resolve(ROOT, 'data');

  console.log('\n================================================================');
  console.log(`🚀 INICIANDO SINCRONIZACIÓN EN PREPARACIÓN AISLADA`);
  console.log(`   Directorio de salida: ${targetLessonsDir}`);
  console.log('================================================================\n');

  if (!fs.existsSync(targetLessonsDir)) {
    fs.mkdirSync(targetLessonsDir, { recursive: true });
  }
  if (!fs.existsSync(targetManifestDir)) {
    fs.mkdirSync(targetManifestDir, { recursive: true });
  }

  // Descubrir archivos Markdown en LECCIONES_POR_REVISAR y en candidatos OA04
  const allMdFiles: string[] = [];

  function scanDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        scanDir(full);
      } else if (ent.isFile() && ent.name.endsWith('.md')) {
        allMdFiles.push(full);
      }
    }
  }

  scanDir(REVISAR_DIR);

  console.log(`[1/4] Descubiertos ${allMdFiles.length} archivos Markdown para procesar.`);

  // Filtro de exclusión estricta de Matemática OA01
  const validFiles = allMdFiles.filter(f => {
    const norm = f.replace(/\\/g, '/').toLowerCase();
    if (norm.includes('matematica/oa01') || norm.includes('matematica_7b_oa01')) {
      console.log(`  🔒 PROTECCIÓN ABSOLUTA: Omitiendo ${path.basename(f)} (Matemática OA01 congelado).`);
      return false;
    }
    return true;
  });

  // Preflight de lectura y análisis antes de escribir nada
  console.log(`\n[2/4] Ejecutando Preflight y análisis puro de ${validFiles.length} lecciones...`);
  const parsedBatch: Array<{
    filePath: string;
    meta: FileMetadata;
    lessonData: LessonData;
    tsFileName: string;
    varName: string;
  }> = [];

  for (const filePath of validFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const meta = extractFileMetadata(filePath, content);

    // Validar previamente contra Contrato Pedagógico Universal (Grupo A3)
    const lintReport = lintPedagogicalLesson(filePath, content);
    if (!lintReport.isAptaParaInyeccion) {
      const errSummary = lintReport.discrepancies.map(d => `[${d.categoria_oficial}] ${d.campo_afectado}: ${d.requisito_esperado}`).join('; ');
      throw new Error(`[Pipeline Preflight Error] Fuente inválida para Contrato Pedagógico: ${filePath} | ${errSummary}`);
    }

    // Parsear
    const lessonData = parseLessonMarkdown(content, meta, filePath);

    // Validar preflight
    if (lessonData.mini.length < 3) {
      console.warn(`  ⚠ AVISO: ${path.basename(filePath)} tiene ${lessonData.mini.length} reactivos de miniquiz.`);
    }

    const normG = normalizeGrade(meta.grade);
    const normS = normalizeSubject(meta.subjectName);
    const normO = normalizeOa(meta.oaCode);
    const classNumPad = String(meta.lessonNumber).padStart(2, '0');
    const tsFileName = `${getSubjectKey(normS)}_${normG}b_${normO}_clase${classNumPad}.ts`;
    const varName = `${getSubjectKey(normS).toUpperCase()}_${normG}B_${normO.toUpperCase()}_CLASE${classNumPad}`;

    parsedBatch.push({
      filePath,
      meta,
      lessonData,
      tsFileName,
      varName
    });
  }

  console.log(`  ✓ Preflight exitoso: ${parsedBatch.length} lecciones analizadas y validadas.`);

  // Escritura en staging aislado
  console.log(`\n[3/4] Generando módulos TypeScript en ${targetLessonsDir}...`);
  const manifestItems: any[] = [];

  for (const item of parsedBatch) {
    const outTsPath = path.join(targetLessonsDir, item.tsFileName);
    const tsContent = `import { LessonData } from '../../../src/types/lesson';\n\n`
      + `export const ${item.varName}: LessonData = ${JSON.stringify(item.lessonData, null, 2)};\n`;

    fs.writeFileSync(outTsPath, tsContent, 'utf8');

    const fileHash = crypto.createHash('sha256').update(fs.readFileSync(outTsPath)).digest('hex');

    manifestItems.push({
      subject: item.meta.subjectName,
      oaCode: item.meta.oaCode,
      classNumber: item.meta.lessonNumber,
      title: item.lessonData.metadata.lessonTitle,
      sourceFile: path.relative(ROOT, item.filePath).replace(/\\/g, '/'),
      destModule: path.relative(ROOT, outTsPath).replace(/\\/g, '/'),
      varName: item.varName,
      hash: fileHash,
      status: 'EN_REVISION'
    });
  }

  console.log(`  ✓ Se generaron ${manifestItems.length} módulos TypeScript en preparación aislada.`);

  // Generar manifiesto de staging
  console.log(`\n[4/4] Guardando manifiesto de preparación aislada...`);
  const manifestData = {
    timestamp: new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' }) + ' [America/Santiago]',
    isoDate: new Date().toISOString(),
    totalLessonsProcessed: manifestItems.length,
    status: 'EN_REVISION',
    environment: 'PREPARACION_AISLADA',
    lessons: manifestItems
  };

  const manifestPath = path.join(targetManifestDir, 'staging_sync_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), 'utf8');
  console.log(`  ✓ Manifiesto guardado en: ${manifestPath}`);

  console.log('\n================================================================');
  console.log('✅ PREPARACIÓN AISLADA COMPLETADA CON ÉXITO (SIN TOCAR PRODUCCIÓN)');
  console.log('================================================================\n');

  return { total: manifestItems.length, manifestPath };
}

if (process.argv[1] && process.argv[1].includes('pipeline_sync_lessons')) {
  runUniversalPipeline().catch(err => {
    console.error('Error fatal en Pipeline Universal:', err);
    process.exit(1);
  });
}
