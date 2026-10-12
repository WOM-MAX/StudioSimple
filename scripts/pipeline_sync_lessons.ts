import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { LessonData, SlidePrompt, GuidedItem, QuizQuestion, RecoveryItem } from '../Web Studio Simple/src/types/lesson';
import { adaptPlayerLessonToGenerator } from '../Web Studio Simple/src/lib/lesson-adapter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const REVISAR_DIR = path.resolve(ROOT, 'LECCIONES_POR_REVISAR');
const WEB_STUDIO_DIR = path.resolve(ROOT, 'Web Studio Simple');
const LESSONS_TS_DIR = path.resolve(WEB_STUDIO_DIR, 'src', 'data', 'lessons');
const ALL_GRADES_JSON_PATH = path.resolve(WEB_STUDIO_DIR, 'public', 'data', 'injected_lessons_all_grades.json');
const GRADE_7B_JSON_PATH = path.resolve(WEB_STUDIO_DIR, 'public', 'data', 'injected_lessons_7b.json');
const MANIFEST_DATA_PATH = path.resolve(ROOT, 'data', 'sync_manifest.json');
const MANIFEST_PUBLIC_PATH = path.resolve(WEB_STUDIO_DIR, 'public', 'data', 'sync_manifest.json');

// Normalizadores
function normalizeSubject(subject: string): string {
  const clean = (subject || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
  if (clean.includes('mat')) return 'mat';
  if (clean.includes('leng') || clean.includes('liter')) return 'len';
  if (clean.includes('hist') || clean.includes('geog') || clean.includes('soc')) return 'his';
  if ((clean.includes('cien') && !clean.includes('soc')) || clean.includes('nat')) return 'cie';
  if (clean.includes('ing') || clean.includes('eng')) return 'ing';
  return clean;
}

function normalizeOa(oaCode: string): string {
  const digits = (oaCode || '').replace(/[^0-9]/g, '');
  return digits ? `oa${parseInt(digits, 10)}` : (oaCode || '').toLowerCase().trim();
}

function normalizeGrade(grade: string): string {
  const digits = (grade || '').replace(/[^0-9]/g, '');
  return digits || (grade || '').toLowerCase().trim();
}

function getSubjectFormalName(norm: string): string {
  switch (norm) {
    case 'len': return 'Lengua y Literatura';
    case 'cie': return 'Ciencias Naturales';
    case 'his': return 'Historia, Geografía y Ciencias Sociales';
    case 'ing': return 'Idioma Extranjero Inglés';
    case 'mat': return 'Matemática';
    default: return 'General';
  }
}

function getSubjectKey(norm: string): string {
  switch (norm) {
    case 'len': return 'lengua';
    case 'cie': return 'ciencias';
    case 'his': return 'historia';
    case 'ing': return 'ingles';
    case 'mat': return 'matematica';
    default: return 'materia';
  }
}

function getInteractiveConfig(norm: string, title: string): { type: any; title: string; description?: string } {
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
        title: title || 'Organizador de Aprendizaje'
      };
  }
}

// Búsqueda recursiva de archivos .md
function findMarkdownFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findMarkdownFiles(fullPath, fileList);
    } else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.toLowerCase().startsWith('readme') && !entry.name.startsWith('_')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

// Extractor de metadata de archivo
interface FileMetadata {
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

function extractMetadataFromMd(filePath: string, content: string): FileMetadata {
  const normPath = filePath.replace(/\\/g, '/');
  
  let courseId = '110-7';
  const cIdMatch = normPath.match(/LECCIONES_POR_REVISAR\/([^\/]+)/);
  if (cIdMatch) courseId = cIdMatch[1];

  let detectedGrade = '7° Básico';
  if (courseId.includes('-3') || normPath.includes('/3b/') || normPath.includes('3_basico')) detectedGrade = '3° Básico';
  else if (courseId.includes('-4') || normPath.includes('/4b/')) detectedGrade = '4° Básico';
  else if (courseId.includes('-5') || normPath.includes('/5b/')) detectedGrade = '5° Básico';
  else if (courseId.includes('-6') || normPath.includes('/6b/')) detectedGrade = '6° Básico';
  else if (courseId.includes('-7') || normPath.includes('/7b/')) detectedGrade = '7° Básico';
  else if (courseId.includes('-8') || normPath.includes('/8b/')) detectedGrade = '8° Básico';

  let detectedSubjNorm = '';
  if (/lengua|literatura|lyl/i.test(normPath)) detectedSubjNorm = 'len';
  else if (/ciencias|cna|cie/i.test(normPath)) detectedSubjNorm = 'cie';
  else if (/historia|geografia|his/i.test(normPath)) detectedSubjNorm = 'his';
  else if (/ingles|english|ing/i.test(normPath)) detectedSubjNorm = 'ing';
  else if (/matematica|mat/i.test(normPath)) detectedSubjNorm = 'mat';

  let detectedOaNum = 1;
  const oaFolderMatch = normPath.match(/\/OA0?(\d+)/i);
  if (oaFolderMatch) detectedOaNum = parseInt(oaFolderMatch[1], 10);

  let detectedClassNum = 1;
  const classFileMatch = normPath.match(/CLASE0?(\d+)\.md$/i) || normPath.match(/class0?(\d+)\.md$/i);
  if (classFileMatch) detectedClassNum = parseInt(classFileMatch[1], 10);

  const titleMatch = content.match(/\*\*Título:\*\*\s*(.+)/i) || content.match(/\*\*Lesson title:\*\*\s*(.+)/i);
  const nextMatch = content.match(/\*\*Título de trabajo de la siguiente clase:\*\*\s*(.+)/i) || content.match(/\*\*Next class working title:\*\*\s*(.+)/i);
  const durationMatch = content.match(/\*\*Duración total:\*\*\s*(.+)/i) || content.match(/\*\*Duración:\*\*\s*(.+)/i) || content.match(/\*\*Duration:\*\*\s*(.+)/i);
  const classNumMatch = content.match(/\*\*(?:Número de clase|Class number):\*\*\s*0?(\d+)\s*(?:de|of)\s*0?(\d+)/i);

  if (classNumMatch) {
    detectedClassNum = parseInt(classNumMatch[1], 10);
  }

  const h2Match = content.match(/##\s*([^·\n]+)\s*·\s*([^·\n]+)\s*·\s*([^·\n]+)\s*·\s*(?:Clase|Class)\s*0?(\d+)/i);
  if (h2Match) {
    detectedGrade = h2Match[1].trim();
    if (detectedGrade.toLowerCase().includes('7th')) detectedGrade = '7° Básico';
    const subjRaw = h2Match[2].trim();
    detectedSubjNorm = normalizeSubject(subjRaw);
    const oaRaw = h2Match[3].trim().replace(/[^0-9]/g, '');
    if (oaRaw) detectedOaNum = parseInt(oaRaw, 10);
    detectedClassNum = parseInt(h2Match[4].trim(), 10);
  }

  return {
    grade: detectedGrade,
    subjectName: getSubjectFormalName(detectedSubjNorm),
    oaCode: `OA ${detectedOaNum}`,
    oaTitle: `${getSubjectFormalName(detectedSubjNorm)} - OA ${detectedOaNum}`,
    lessonNumber: detectedClassNum,
    totalLessons: 6,
    lessonTitle: titleMatch ? titleMatch[1].trim() : path.basename(filePath, '.md'),
    durationMinutes: durationMatch ? parseInt(durationMatch[1].replace(/[^0-9]/g, ''), 10) || 30 : 30,
    nextLessonTitle: nextMatch ? nextMatch[1].trim() : '',
    courseId
  };
}

// Parser completo de Markdown a LessonData
function parseLessonMarkdown(mdContent: string, meta: FileMetadata): LessonData {
  const fullText = mdContent.replace(/\r\n/g, '\n').trim();

  // 1. Paso 1
  let adultObjective = '';
  const objMatch = fullText.match(/### Objetivo de aprendizaje de la clase\s*\n\s*\*\*([^*]+)\*\*/i)
    || fullText.match(/### Objetivo de esta clase\s*\n\s*\*\*([^*]+)\*\*/i)
    || fullText.match(/### Class objective\s*\n\s*\*\*([^*]+)\*\*/i);
  if (objMatch) adultObjective = objMatch[1].trim();

  let routeToday = '';
  const routeMatch = fullText.match(/\*\*Ruta de la sesión:\*\*\s*(.+)/i)
    || fullText.match(/\*\*Ruta de hoy:\*\*\s*(.+)/i)
    || fullText.match(/\*\*Ruta:\*\*\s*(.+)/i)
    || fullText.match(/\*\*Route:\*\*\s*(.+)/i);
  if (routeMatch) routeToday = routeMatch[1].trim();

  let dilePaso1 = '';
  const dile1Match = fullText.match(/\*\*DILE al estudiante:\*\*\s*[“"]([^”"]+)[”"]/i)
    || fullText.match(/\*\*DILE:\*\*\s*[“"]([^”"]+)[”"]/i)
    || fullText.match(/\*\*Say:\*\*\s*[“"]([^”"]+)[”"]/i);
  if (dile1Match) dilePaso1 = dile1Match[1].trim();

  const reminders: string[] = [];
  const pautasRegex = /(?:Pautas para el mentor|Mentor guidance):([\s\S]*?)(?:\*\*Clima|\*\*Emotional)/i;
  const pautasMatch = fullText.match(pautasRegex);
  if (pautasMatch) {
    const pLines = pautasMatch[1].split('\n');
    for (const pl of pLines) {
      const itemMatch = pl.match(/^\d+\.\s*(.+)/);
      if (itemMatch) reminders.push(itemMatch[1].trim());
    }
  }

  let emotionalTip = '';
  const emoMatch = fullText.match(/(?:\*\*Clima emocional:\*\*|\*\*Clima de aprendizaje:\*\*|\*\*Emotional climate:\*\*|\*\*Tip emocional:\*\*)\s*(.+)/i);
  if (emoMatch) emotionalTip = emoMatch[1].trim();

  // 2. Paso 2A: Ruta
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
  const tableRegex = /\| N\.?º? \| Bloque \| (?:Qué hará el estudiante|Qué haremos|Acción|Student action) \| Color \|([\s\S]*?)(?:\n\s*\n|\*\*Pregunta clave|\*\*Key question)/i;
  const tableMatch = fullText.match(tableRegex);
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

  const keyQuestions: Array<{ label: string; sub: string }> = [];
  const q1Match = fullText.match(/(?:\*\*Pregunta clave 1:\*\*|\*\*Key question 1:\*\*)\s*(.+)/i);
  const q2Match = fullText.match(/(?:\*\*Pregunta clave 2:\*\*|\*\*Key question 2:\*\*)\s*(.+)/i);
  if (q1Match) keyQuestions.push({ label: 'Pregunta Clave 1', sub: q1Match[1].trim() });
  if (q2Match) keyQuestions.push({ label: 'Pregunta Clave 2', sub: q2Match[1].trim() });

  let dileObjective = '';
  const objDileMatch = fullText.match(/(?:\*\*DILE — Objetivo[^*]*:\*\*|\*\*Student objective:\*\*)\s*[“"]?([^”"\n]+)[”"]?/i);
  if (objDileMatch) dileObjective = objDileMatch[1].trim();

  // 3. Paso 2B: Situación Inicial y Referencia
  let sitDile = '';
  const sitDileMatch = fullText.match(/### (?:Activación|Situación ficticia|Before reading)[\s\S]*?\*\*(?:DILE|SAY):\*\*\s*[“"]([^”"]+)[”"]/i);
  if (sitDileMatch) sitDile = sitDileMatch[1].trim();

  let sitExpected = '';
  const sitExpMatch = fullText.match(/### (?:Activación|Situación ficticia|Before reading)[\s\S]*?\*\*(?:Respuestas aceptables|Respuesta esperada|Expected responses):\*\*\s*([^\n]+)/i);
  if (sitExpMatch) sitExpected = sitExpMatch[1].trim();

  let sitHint = '';
  const sitHintMatch = fullText.match(/### (?:Activación|Situación ficticia|Before reading)[\s\S]*?\*\*(?:Pista socrática|Hint):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (sitHintMatch) sitHint = sitHintMatch[1].trim();

  let refDile = '';
  const refDileMatch = fullText.match(/### (?:Lectura de partida|Punto de partida|Starting-point check)[\s\S]*?\*\*(?:DILE|SAY):\*\*\s*[“"]([^”"]+)[”"]/i);
  if (refDileMatch) refDile = refDileMatch[1].trim();

  let refExpected = '';
  const refExpMatch = fullText.match(/### (?:Lectura de partida|Punto de partida|Starting-point check)[\s\S]*?\*\*(?:Respuesta de referencia|Respuesta esperada|Expected answer):\*\*\s*([^\n]+)/i);
  if (refExpMatch) refExpected = refExpMatch[1].trim();

  let refSuccess = '';
  const refSuccMatch = fullText.match(/\*\*(?:Retroalimentación correcta|Feedback):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (refSuccMatch) refSuccess = refSuccMatch[1].trim();

  let refSupport = '';
  const refSuppMatch = fullText.match(/\*\*(?:Retroalimentación con apoyo|Support):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (refSuppMatch) refSupport = refSuppMatch[1].trim();

  // 4. Paso 3: Gancho y Explicación en 14 láminas
  const slides: SlidePrompt[] = [];
  const slideBlocks = fullText.split(/#### (?:Lámina|Slide)\s*(\d+)/i);
  for (let i = 1; i < slideBlocks.length; i += 2) {
    const sNum = parseInt(slideBlocks[i], 10);
    const sBody = slideBlocks[i + 1] || '';
    const headerLine = sBody.split('\n')[0].replace(/^[·\s]+/, '').replace(/[·\s]+\d+\s*s.*$/, '').trim();
    
    const textMatch = sBody.match(/-\s*\*\*(?:Texto visible|On-screen text):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
    const imgMatch = sBody.match(/-\s*\*\*(?:Imagen|Visual):\*\*\s*([^\n]+)/i);
    const locMatch = sBody.match(/-\s*\*\*(?:Locución|Voice-over):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
    
    const overlayText = textMatch ? textMatch[1].trim() : headerLine;
    const parts = overlayText.split('/');
    const overlayTitle = parts[0]?.trim() || headerLine;
    const overlaySubtitle = parts[1]?.trim() || '';

    slides.push({
      slideNumber: sNum,
      tituloMomento: headerLine || `Lámina ${sNum}`,
      didacticPurpose: headerLine || `Lámina ${sNum}`,
      visualPrompt: imgMatch ? imgMatch[1].trim() : '',
      overlayText: overlayText,
      overlayTitle: overlayTitle,
      overlaySubtitle: overlaySubtitle,
      vectorialOverlayPptx: overlayText,
      speakerNotes: locMatch ? locMatch[1].trim() : ''
    });
  }

  // 5. Paso 4: Conversación Guiada
  const preQuestions: GuidedItem[] = [];
  const convBlocks = fullText.split(/### (?:Conversación|Pregunta|Question)\s*\d+/i);
  for (let i = 1; i < convBlocks.length; i++) {
    const cText = convBlocks[i];
    if (cText.includes('## 6.') || cText.includes('## Step 5') || cText.includes('Paso 5')) {
      const cleanBlock = cText.split(/## (?:6\.|Step 5|Paso 5)/)[0];
      parseConvItem(cleanBlock, preQuestions);
      break;
    } else {
      parseConvItem(cText, preQuestions);
    }
  }

  function parseConvItem(text: string, arr: GuidedItem[]) {
    const ctxMatch = text.match(/-\s*\*\*Context(?:o)?:\*\*\s*([^\n]+)/i);
    const qMatch = text.match(/-\s*\*\*(?:DILE|SAY):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
    const expMatch = text.match(/-\s*\*\*(?:Respuesta esperada|Expected answer):\*\*\s*([^\n]+)/i);
    const succMatch = text.match(/-\s*\*\*(?:Éxito|Success):\*\*\s*([^\n]+)/i);
    const suppMatch = text.match(/-\s*\*\*(?:Apoyo|Hint):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
    const revMentorMatch = text.match(/-\s*\*\*(?:Revelación para el mentor|Mentor reveal):\*\*\s*([^\n]+)/i);
    const revStudentMatch = text.match(/-\s*\*\*(?:Revelación para el estudiante|Revelación estudiante|Student reveal):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);

    if (qMatch) {
      arr.push({
        context: ctxMatch ? ctxMatch[1].trim() : '',
        question: qMatch[1].trim(),
        expected: expMatch ? expMatch[1].trim() : '',
        success: succMatch ? succMatch[1].trim() : '',
        support: suppMatch ? suppMatch[1].trim() : '',
        reveal: revMentorMatch ? revMentorMatch[1].trim() : '',
        studentReveal: revStudentMatch ? revStudentMatch[1].trim() : (expMatch ? expMatch[1].trim() : '')
      });
    }
  }

  // 6. Paso 5: Formalización
  const formalMatch = fullText.match(/## (?:6\.|Step 5|5\.) (?:Paso 5 — Formalización|Step 5 — Formalization)[\s\S]*?(?=## (?:7\.|Step 5B|Paso 5B))/i);
  let formalConcept = '';
  let formalIdea = '';
  let formalDile = '';
  let formalHaz = '';

  if (formalMatch) {
    const fText = formalMatch[0];
    const cMatch = fText.match(/\*\*Concept(?:o)?:\*\*\s*([^\n]+)/i);
    if (cMatch) formalConcept = cMatch[1].trim();

    const idMatch = fText.match(/\*\*(?:Idea clave|Key idea):\*\*\s*([^\n]+)/i);
    if (idMatch) formalIdea = idMatch[1].trim();

    const fdMatch = fText.match(/\*\*(?:DILE|SAY):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
    if (fdMatch) formalDile = fdMatch[1].trim();

    const fhMatch = fText.match(/\*\*(?:HAZ|DO):\*\*\s*([^\n]+)/i);
    if (fhMatch) formalHaz = fhMatch[1].trim();
  }

  // 7. Paso 5B: Comprobación Inmediata
  const postQuestions: GuidedItem[] = [];
  const comp1Match = fullText.match(/### (?:Comprobación 1|Check 1)[\s\S]*?\*\*(?:Pregunta|Question):\*\*\s*[“"]?([^”"\n]+)[”"]?[\s\S]*?\*\*(?:Respuesta esperada|Expected answer):\*\*\s*([^\n]+)/i);
  if (comp1Match) {
    postQuestions.push({
      context: 'Comprobación 1',
      question: comp1Match[1].trim(),
      expected: comp1Match[2].trim(),
      success: 'Respuesta precisa y fundamentada',
      support: 'Revisa el concepto clave expuesto',
      reveal: comp1Match[2].trim(),
      studentReveal: comp1Match[2].trim()
    });
  }

  const comp2Match = fullText.match(/### (?:Comprobación 2|Check 2)[\s\S]*?\*\*(?:Pregunta|Question):\*\*\s*[“"]?([^”"\n]+)[”"]?[\s\S]*?\*\*(?:Respuesta esperada|Expected answer):\*\*\s*([^\n]+)/i);
  if (comp2Match) {
    postQuestions.push({
      context: 'Comprobación 2',
      question: comp2Match[1].trim(),
      expected: comp2Match[2].trim(),
      success: 'Respuesta precisa y fundamentada',
      support: 'Revisa la relación entre los elementos',
      reveal: comp2Match[2].trim(),
      studentReveal: comp2Match[2].trim()
    });
  }

  // 8. Paso 6: Práctica conjunta en el cuaderno
  const practice: GuidedItem[] = [];
  const casoBlocks = fullText.split(/### (?:Caso|Case)\s*\d+/i);
  for (let i = 1; i < casoBlocks.length; i++) {
    const cText = casoBlocks[i].split(/## (?:9\.|Step 7|Paso 7)/)[0];
    const ctxMatch = cText.match(/-\s*\*\*Context(?:o)?:\*\*\s*([^\n]+)/i);
    const qMatch = cText.match(/-\s*\*\*(?:Pregunta|Question):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
    const expMatch = cText.match(/-\s*\*\*(?:Respuesta de referencia|Reference answer):\*\*\s*([^\n]+)/i);
    const critMatch = cText.match(/-\s*\*\*(?:Criterio|Success criterion):\*\*\s*([^\n]+)/i);
    const suppMatch = cText.match(/-\s*\*\*(?:Apoyo|Support):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);

    if (qMatch) {
      practice.push({
        context: ctxMatch ? ctxMatch[1].trim() : `Caso ${i}`,
        question: qMatch[1].trim(),
        expected: expMatch ? expMatch[1].trim() : '',
        success: critMatch ? critMatch[1].trim() : 'Cumple el criterio formal del caso',
        support: suppMatch ? suppMatch[1].trim() : 'Revisa los datos del texto o mapa',
        reveal: expMatch ? expMatch[1].trim() : '',
        studentReveal: expMatch ? expMatch[1].trim() : ''
      });
    }
  }

  // 9. Paso 7: Miniquiz (reactivos psicométricos con A, B, C, D)
  const mini: QuizQuestion[] = [];
  const reactivoBlocks = fullText.split(/### (?:Reactivo|Item)\s*\d+/i);
  for (let i = 1; i < reactivoBlocks.length; i++) {
    const rText = reactivoBlocks[i].split(/### (?:Recuperación|Recovery)|## (?:10\.|Step 8|Paso 8)/)[0];
    const qLineMatch = rText.match(/\*\*([^*]+)\*\*/);
    const q = qLineMatch ? qLineMatch[1].trim() : `Pregunta ${i}`;

    const options: string[] = [];
    let correct = '';
    const optLines = rText.split('\n').filter(l => /^\s*-\s*[A-D]\./i.test(l));
    for (const ol of optLines) {
      const cleanOpt = ol.replace(/^\s*-\s*/, '').trim();
      const isCorrect = cleanOpt.includes('**Correcta**') || cleanOpt.includes('**Correct**');
      const optText = cleanOpt.replace(/\*\*(?:Correcta|Correct)\*\*/g, '').trim();
      options.push(optText);
      if (isCorrect) correct = optText;
    }

    const corrMatch = rText.match(/\*\*(?:Corrección|Corrective feedback):\*\*\s*([^\n]+)/i);
    const fixExplain = corrMatch ? corrMatch[1].trim() : 'Revisa la lectura y las evidencias del texto para fundamentar tu respuesta.';

    mini.push({
      id: `q${i}`,
      q,
      options,
      correct: correct || options[0] || '',
      fixExplain
    });
  }

  // 10. Paso 7b: Recuperación adaptativa
  const recovery: RecoveryItem[] = [];
  const recovSection = fullText.match(/(?:### Recuperación formativa|### Recuperación adaptativa|### Recovery by item)([\s\S]*?)(?=## (?:10\.|Step 8|Paso 8))/i);
  if (recovSection) {
    const rLines = recovSection[1].split('\n').filter(l => l.includes('reactivo') || l.includes('Item'));
    let rIdx = 1;
    for (const rl of rLines) {
      const cleanLine = rl.replace(/^\s*-\s*/, '').trim();
      recovery.push({
        title: `Recuperación Reactivo ${rIdx}`,
        explain: cleanLine,
        q: `Paso guiado de recuperación para el Reactivo ${rIdx}`,
        options: ['Opción con andamiaje A', 'Opción con andamiaje B', 'Opción con andamiaje C'],
        correct: 'Opción con andamiaje A',
        correctText: '¡Excelente! Lograste resolver el reactivo con el andamiaje del texto.',
        fixText: 'Vuelve a revisar la página de referencia para consolidar el aprendizaje.'
      });
      rIdx++;
    }
  }

  // 11. Paso 8: Síntesis y Cierre
  const summaryIdeas: Array<[string, string]> = [];
  const ideasSection = fullText.match(/(?:### Tres ideas para recordar|### Ideas de síntesis|### Key ideas|\*\*Ideas de síntesis:\*\*)([\s\S]*?)(?=\*\*Pregunta de síntesis|\*\*Synthesis question)/i);
  if (ideasSection) {
    const iLines = ideasSection[1].split('\n').filter(l => /^\s*\d+\.\s*/.test(l));
    for (const il of iLines) {
      const cleanIl = il.replace(/^\s*\d+\.\s*/, '').trim();
      const boldMatch = cleanIl.match(/\*\*([^*]+)\*\*:\s*(.+)/);
      if (boldMatch) {
        summaryIdeas.push([boldMatch[1].trim(), boldMatch[2].trim()]);
      } else {
        summaryIdeas.push(['Idea clave', cleanIl]);
      }
    }
  }

  let preguntaSintesis = '';
  const psMatch = fullText.match(/(?:\*\*Pregunta de síntesis:\*\*|\*\*Synthesis question:\*\*)\s*[“"]?([^”"\n]+)[”"]?/i);
  if (psMatch) preguntaSintesis = psMatch[1].trim();

  let metacognicion = '';
  const metaMatch = fullText.match(/(?:\*\*Metacognición:\*\*|\*\*Metacognition:\*\*)\s*[“"]?([^”"\n]+)[”"]?/i);
  if (metaMatch && metaMatch[1]) metacognicion = metaMatch[1].trim();

  let celebracion = '';
  const celMatch = fullText.match(/(?:\*\*Celebración:\*\*|\*\*Celebration:\*\*)\s*[“"]?([^”"\n]+)[”"]?/i);
  if (celMatch) celebracion = celMatch[1].trim();

  let puente = '';
  const puMatch = fullText.match(/(?:\*\*Puente a la siguiente clase:\*\*|\*\*Next-class bridge:\*\*)\s*[“"]?([^”"\n]+)[”"]?/i);
  if (puMatch) puente = puMatch[1].trim();

  const normSubj = normalizeSubject(meta.subjectName);
  const interactiveCfg = getInteractiveConfig(normSubj, meta.lessonTitle);

  return {
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
      adultObjective: adultObjective || 'Acompañar al estudiante en la sesión.',
      routeToday: routeToday || 'Observar → comprender → practicar → evaluar.',
      mentorReminder: 'Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Las respuestas esperadas y criterios te indican qué debe responder el estudiante.',
      reminders: reminders.length > 0 ? reminders : [
        'Abre el recurso o texto escolar antes de comenzar la sesión.',
        'Permite que el estudiante elabore su razonamiento sin anticipar las respuestas.',
        'Fomenta el uso del cuaderno físico para registrar evidencias.'
      ],
      emotionalTip: emotionalTip || 'Mantén un ambiente tranquilo de exploración compartida.'
    },
    route: {
      blocks: blocks.length > 0 ? blocks : [
        { id: 'b1', number: '01', title: 'Apertura', subtitle: 'Observar y contextualizar', color: 'orange' },
        { id: 'b2', number: '02', title: 'Exploración', subtitle: 'Pistas y evidencias', color: 'teal' },
        { id: 'b3', number: '03', title: 'Profundización', subtitle: 'Concepto y relaciones', color: 'yellow' },
        { id: 'b4', number: '04', title: 'Cierre', subtitle: 'Práctica y síntesis', color: 'navy' }
      ],
      keyQuestions: keyQuestions.length > 0 ? keyQuestions : [
        { label: 'Pregunta Clave 1', sub: '¿Cuáles son los elementos centrales presentados?' },
        { label: 'Pregunta Clave 2', sub: '¿Cómo fundamentas tu respuesta usando evidencia?' }
      ],
      dileIntro: dilePaso1 || 'Hoy investigaremos los conceptos y evidencias centrales de la clase.',
      dileObjective: dileObjective || 'Hoy comprenderemos los conceptos centrales de la clase.'
    },
    hook: {
      title: meta.lessonTitle,
      dileIntro: dilePaso1 || 'Observa con atención el video introductorio.',
      hazInstruction: 'Pon atención a las imágenes y conceptos clave.',
      dileAfterVideo: sitDile || 'Comenta lo que más te llamó la atención.',
      videoSrc: '',
      posterSrc: '',
      focusPoints: ['Observa el contexto general.', 'Identifica la situación inicial.'],
      slides: slides.slice(0, 7)
    },
    situation: {
      dilePrompt: sitDile || 'Analicemos la situación inicial planteada.',
      expectedAnswer: sitExpected || 'Respuesta basada en la situación planteada.',
      socraticHint: sitHint || 'Observa los detalles del inicio.',
      emotionalTip: emotionalTip || 'Acompaña la exploración con tranquilidad.',
      options: [
        {
          label: 'Identificó los elementos centrales y fundamentó con el contexto',
          kind: 'correct',
          feedbackText: '¡Muy bien! Notaste las pistas clave del escenario inicial.'
        },
        {
          label: 'Mencionó detalles parciales sin conectar con la idea principal',
          kind: 'needs_support',
          feedbackText: 'Observa nuevamente y busca qué condición o suceso da inicio a la situación.'
        },
        {
          label: 'No sabe qué responder o requiere apoyo inicial',
          kind: 'no_answer',
          feedbackText: 'Leamos juntos el punto de partida y observemos los detalles destacados.'
        }
      ]
    },
    reference: {
      dilePrompt: refDile || 'Revisemos el punto de partida para encontrar evidencia.',
      question: refDile || '¿Qué información o evidencia entrega el punto de partida?',
      expectedAnswer: refExpected || 'Respuesta guiada por el texto o fuente.',
      socraticHint: 'Localiza las palabras clave en la página.',
      feedbackSuccess: refSuccess || '¡Muy bien fundamentado!',
      feedbackSupport: refSupport || 'Vuelve a revisar la fuente para confirmar los datos.'
    },
    preQuestions,
    conversationContext: 'Diálogo guiado para profundizar en los elementos clave.',
    formalization: {
      title: formalConcept || meta.lessonTitle,
      concept: formalConcept || meta.lessonTitle,
      summary: formalIdea || 'La comprensión profunda requiere conectar la evidencia con la explicación.',
      ideaClave: formalIdea || 'La comprensión profunda requiere conectar la evidencia con la explicación.',
      dileIntro: formalDile || 'Ahora consolidaremos los aprendizajes esenciales.',
      hazInstruction: formalHaz || 'Registra en tu cuaderno el concepto principal.',
      graphicPoster: '',
      videoSrc: '',
      slides: slides.slice(7, 14)
    },
    postQuestions,
    practice,
    mini,
    recovery,
    summaryIdeas: summaryIdeas.length > 0 ? summaryIdeas : [
      ['Idea central', meta.lessonTitle],
      ['Evidencia', 'Uso de fuentes y datos verificables'],
      ['Conclusión', 'Explicación coherente y argumentada']
    ],
    closure: {
      congratulations: celebracion || '¡Felicitaciones! Has completado exitosamente la lección.',
      nextClassPreview: puente || meta.nextLessonTitle || 'En la próxima clase continuaremos profundizando.'
    },
    paso8_cierre: {
      preguntaSintesis: preguntaSintesis || '¿Qué aprendiste hoy y cómo lo explicarías?',
      metacognicion: metacognicion || '¿Qué parte te resultó más interesante de resolver?',
      celebracion: celebracion || '¡Felicitaciones! Has completado exitosamente la lección.'
    },
    interactive: interactiveCfg
  };
}

// Ingestión y Pipeline Principal
export async function runUniversalPipeline() {
  console.log('================================================================');
  console.log('🚀 PIPELINE UNIVERSAL DE INGESTIÓN CURRICULAR (ESTUDIOSIMPLE)');
  console.log('================================================================\n');

  console.log(`[1/5] Escaneando directorio: ${REVISAR_DIR}`);
  const mdFiles = findMarkdownFiles(REVISAR_DIR);
  console.log(`[+] Encontrados ${mdFiles.length} archivos .md para procesar.\n`);

  if (mdFiles.length === 0) {
    console.warn('⚠️ No se encontraron archivos .md en LECCIONES_POR_REVISAR. Abortando.');
    return;
  }

  let allGradesPackages: any[] = [];
  if (fs.existsSync(ALL_GRADES_JSON_PATH)) {
    allGradesPackages = JSON.parse(fs.readFileSync(ALL_GRADES_JSON_PATH, 'utf8'));
    if (!Array.isArray(allGradesPackages)) allGradesPackages = Object.values(allGradesPackages);
  }

  let grade7bPackages: any[] = [];
  if (fs.existsSync(GRADE_7B_JSON_PATH)) {
    grade7bPackages = JSON.parse(fs.readFileSync(GRADE_7B_JSON_PATH, 'utf8'));
    if (!Array.isArray(grade7bPackages)) grade7bPackages = Object.values(grade7bPackages);
    grade7bPackages = grade7bPackages.filter((p: any) => normalizeGrade(p.curso) === '7');
  }

  const manifestItems: any[] = [];
  const generatedTsModules: Array<{ varName: string; filePath: string }> = [];

  console.log('[2/5] Procesando y parseando lecciones...');

  for (const filePath of mdFiles) {
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const fileHash = crypto.createHash('sha256').update(rawContent).digest('hex').substring(0, 16);
    const meta = extractMetadataFromMd(filePath, rawContent);
    const lessonData = parseLessonMarkdown(rawContent, meta);

    const normSubj = normalizeSubject(meta.subjectName);
    const subjKey = getSubjectKey(normSubj);
    const gradeKey = normalizeGrade(meta.grade) + 'b';
    const digitsOa = meta.oaCode.replace(/[^0-9]/g, '').padStart(2, '0');
    const oaKey = 'oa' + digitsOa;
    const classNumStr = String(meta.lessonNumber).padStart(2, '0');

    const tsFileName = `${subjKey}_${gradeKey}_${oaKey}_clase${classNumStr}.ts`;
    const tsFilePath = path.join(LESSONS_TS_DIR, tsFileName);
    const varName = `${subjKey.toUpperCase()}_${gradeKey.toUpperCase()}_${oaKey.toUpperCase()}_CLASE${classNumStr}`;

    console.log(`  -> [${meta.courseId}] ${meta.subjectName} · ${meta.oaCode} · Clase ${meta.lessonNumber}`);
    console.log(`     Título: "${lessonData.metadata.lessonTitle}"`);

    const tsCode = `import { LessonData } from '../../types/lesson';\n\nexport const ${varName}: LessonData = ${JSON.stringify(lessonData, null, 2)};\n`;
    fs.writeFileSync(tsFilePath, tsCode, 'utf8');
    generatedTsModules.push({ varName, filePath: tsFileName });

    const adaptedGenLesson = adaptPlayerLessonToGenerator(lessonData);

    updatePackageInList(allGradesPackages, meta, adaptedGenLesson);

    if (normalizeGrade(meta.grade) === '7') {
      updatePackageInList(grade7bPackages, meta, adaptedGenLesson);
    }

    manifestItems.push({
      courseId: meta.courseId,
      grade: meta.grade,
      subject: meta.subjectName,
      oaCode: meta.oaCode,
      classNumber: meta.lessonNumber,
      title: lessonData.metadata.lessonTitle,
      sourceFile: path.relative(ROOT, filePath).replace(/\\/g, '/'),
      destModule: `Web Studio Simple/src/data/lessons/${tsFileName}`,
      varName,
      hash: fileHash,
      status: 'EN_REVISION',
      syncedAt: new Date().toISOString()
    });
  }

  console.log('\n[3/5] Actualizando exportaciones en index.ts de lecciones...');
  updateLessonsIndexTs(generatedTsModules);

  console.log('\n[4/5] Guardando paquetes JSON consolidados...');
  fs.writeFileSync(ALL_GRADES_JSON_PATH, JSON.stringify(allGradesPackages, null, 2), 'utf8');
  console.log(`  ✓ Actualizado: ${ALL_GRADES_JSON_PATH} (${allGradesPackages.length} paquetes)`);

  fs.writeFileSync(GRADE_7B_JSON_PATH, JSON.stringify(grade7bPackages, null, 2), 'utf8');
  console.log(`  ✓ Actualizado: ${GRADE_7B_JSON_PATH} (${grade7bPackages.length} paquetes)`);

  console.log('\n[5/5] Generando manifiesto curricular de sincronización...');
  const manifestData = {
    timestamp: new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' }) + ' [America/Santiago]',
    isoDate: new Date().toISOString(),
    totalLessonsProcessed: manifestItems.length,
    status: 'EN_REVISION',
    lessons: manifestItems
  };

  fs.mkdirSync(path.dirname(MANIFEST_DATA_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_DATA_PATH, JSON.stringify(manifestData, null, 2), 'utf8');
  console.log(`  ✓ Manifiesto guardado en: ${MANIFEST_DATA_PATH}`);

  fs.mkdirSync(path.dirname(MANIFEST_PUBLIC_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PUBLIC_PATH, JSON.stringify(manifestData, null, 2), 'utf8');
  console.log(`  ✓ Manifiesto público guardado en: ${MANIFEST_PUBLIC_PATH}`);

  console.log('\n================================================================');
  console.log('✅ SINCRONIZACIÓN UNIVERSAL COMPLETADA CON ÉXITO');
  console.log(`   Total clases procesadas: ${manifestItems.length}`);
  console.log('================================================================\n');
}

function updatePackageInList(packageList: any[], meta: FileMetadata, adaptedGenLesson: any) {
  const normG = normalizeGrade(meta.grade);
  const normS = normalizeSubject(meta.subjectName);
  const normO = normalizeOa(meta.oaCode);

  let targetPkg = packageList.find((p: any) => {
    return (
      normalizeGrade(p.curso) === normG &&
      normalizeSubject(p.asignatura) === normS &&
      normalizeOa(p.oaCodigo) === normO
    );
  });

  if (!targetPkg) {
    const subjCodeMap: Record<string, string> = {
      len: 'LEN',
      cie: 'CIE',
      his: 'HIS',
      ing: 'ING',
      mat: 'MAT'
    };
    const digitsOa = meta.oaCode.replace(/[^0-9]/g, '').padStart(2, '0');
    const genOaId = `${meta.courseId}-${subjCodeMap[normS] || 'GEN'}-OA${digitsOa}`;

    targetPkg = {
      oaId: genOaId,
      curso: meta.grade,
      asignatura: meta.subjectName,
      oaCodigo: meta.oaCode,
      totalLecciones: meta.totalLessons,
      lessons: []
    };
    packageList.push(targetPkg);
  }

  const existingIdx = targetPkg.lessons.findIndex((l: any) => l.num === meta.lessonNumber || l.classNumber === meta.lessonNumber);
  if (existingIdx >= 0) {
    targetPkg.lessons[existingIdx] = adaptedGenLesson;
  } else {
    targetPkg.lessons.push(adaptedGenLesson);
  }

  targetPkg.lessons.sort((a: any, b: any) => (a.num || 0) - (b.num || 0));
}

function updateLessonsIndexTs(newModules: Array<{ varName: string; filePath: string }>) {
  const indexPath = path.resolve(LESSONS_TS_DIR, 'index.ts');
  const allFiles = fs.readdirSync(LESSONS_TS_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts');

  const exportLines: string[] = [];
  for (const file of allFiles) {
    const base = file.replace(/\.ts$/, '');
    const content = fs.readFileSync(path.join(LESSONS_TS_DIR, file), 'utf8');
    const varMatch = content.match(/export const ([A-Z0-9_]+):/);
    if (varMatch) {
      exportLines.push(`export { ${varMatch[1]} } from './${base}';`);
    }
  }

  exportLines.sort();
  fs.writeFileSync(indexPath, exportLines.join('\n') + '\n', 'utf8');
}

if (process.argv[1] && process.argv[1].includes('pipeline_sync_lessons')) {
  runUniversalPipeline().catch(err => {
    console.error('Error fatal en Pipeline Universal:', err);
    process.exit(1);
  });
}
