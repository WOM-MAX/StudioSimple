import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LessonData, SlidePrompt, GuidedItem, QuizQuestion, RecoveryItem } from '../Web Studio Simple/src/types/lesson';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const REVISAR_DIR = path.resolve(ROOT, 'LECCIONES_POR_REVISAR', '110-7');

interface LessonFilePlan {
  subjectFolder: string;
  oaFolder: string;
  mdFile: string;
  tsDestPath: string;
  exportVar: string;
  grade: string;
  subjectName: string;
  oaCode: string;
  oaTitle: string;
}

const LESSON_PLANS: LessonFilePlan[] = [
  {
    subjectFolder: 'Lengua_Literatura',
    oaFolder: 'OA03',
    mdFile: 'CLASE01.md',
    tsDestPath: 'Web Studio Simple/src/data/lessons/lengua_7b_oa03_clase01.ts',
    exportVar: 'LENGUA_7B_OA03_CLASE01',
    grade: '7° Básico',
    subjectName: 'Lengua y Literatura',
    oaCode: 'OA 3',
    oaTitle: 'Análisis de narraciones: conflicto, personajes y ambiente'
  },
  {
    subjectFolder: 'Ciencias_Naturales',
    oaFolder: 'OA01',
    mdFile: 'CLASE01.md',
    tsDestPath: 'Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts',
    exportVar: 'CIENCIAS_7B_OA01_CLASE01',
    grade: '7° Básico',
    subjectName: 'Ciencias Naturales',
    oaCode: 'OA 1',
    oaTitle: 'Sexualidad y Afectividad Integral'
  },
  {
    subjectFolder: 'Historia_Geografia',
    oaFolder: 'OA02',
    mdFile: 'CLASE01.md',
    tsDestPath: 'Web Studio Simple/src/data/lessons/historia_7b_oa02_clase01.ts',
    exportVar: 'HISTORIA_7B_OA02_CLASE01',
    grade: '7° Básico',
    subjectName: 'Historia, Geografía y Ciencias Sociales',
    oaCode: 'OA 2',
    oaTitle: 'Hominización y Revolución Neolítica'
  },
  {
    subjectFolder: 'Ingles',
    oaFolder: 'OA09',
    mdFile: 'CLASE01.md',
    tsDestPath: 'Web Studio Simple/src/data/lessons/ingles_7b_oa09_clase01.ts',
    exportVar: 'INGLES_7B_OA09_CLASE01',
    grade: '7° Básico',
    subjectName: 'Idioma Extranjero Inglés',
    oaCode: 'OA 9',
    oaTitle: 'Reading Comprehension of Authentic and Adapted Texts'
  }
];

function cleanMd(text: string): string {
  return text.replace(/\r\n/g, '\n').trim();
}

function extractMetadata(content: string) {
  const titleMatch = content.match(/\*\*Título:\*\*\s*(.+)/i) || content.match(/\*\*Lesson title:\*\*\s*(.+)/i);
  const nextMatch = content.match(/\*\*Título de trabajo de la siguiente clase:\*\*\s*(.+)/i) || content.match(/\*\*Next class working title:\*\*\s*(.+)/i);
  const durationMatch = content.match(/\*\*Duración total:\*\*\s*(.+)/i) || content.match(/\*\*Duración:\*\*\s*(.+)/i) || content.match(/\*\*Duration:\*\*\s*(.+)/i);

  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    nextTitle: nextMatch ? nextMatch[1].trim() : '',
    duration: durationMatch ? parseInt(durationMatch[1].replace(/[^0-9]/g, ''), 10) || 30 : 30
  };
}

export function parseLessonMarkdown(mdContent: string, plan: LessonFilePlan): LessonData {
  const lines = cleanMd(mdContent).split('\n');
  const fullText = cleanMd(mdContent);
  const meta = extractMetadata(fullText);

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

  // 3. Paso 2B: Situación Inicial y Punto de Partida
  let sitDile = '';
  const sitDileMatch = fullText.match(/### (?:Activación|Situación ficticia|Before reading)[\s\S]*?\*\*(?:DILE|SAY):\*\*\s*[“"]([^”"]+)[”"]/i);
  if (sitDileMatch) sitDile = sitDileMatch[1].trim();

  let sitExpected = '';
  const sitExpMatch = fullText.match(/### (?:Activación|Situación ficticia|Before reading)[\s\S]*?\*\*(?:Respuestas aceptables|Respuesta esperada|Expected responses):\*\*\s*([^\n]+)/i);
  if (sitExpMatch) sitExpected = sitExpMatch[1].trim();

  let sitHint = '';
  const sitHintMatch = fullText.match(/### (?:Activación|Situación ficticia|Before reading)[\s\S]*?\*\*(?:Pista socrática|Hint):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (sitHintMatch) sitHint = sitHintMatch[1].trim();

  // Punto de partida / Lectura de partida (Reference)
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
  // slideBlocks[0] is header, slideBlocks[1] is number 1, slideBlocks[2] is content of slide 1, etc.
  for (let i = 1; i < slideBlocks.length; i += 2) {
    const sNum = parseInt(slideBlocks[i], 10);
    const sBody = slideBlocks[i + 1] || '';
    
    // Header line inside sBody: e.g. " · Objetivo de la lección · 8 s"
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
    // Check if this block belongs to Paso 4 (stop before Paso 5)
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
  let formalResp = '';

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

    const frMatch = fText.match(/\*\*(?:Respuesta modelo|Respuesta de referencia|Model answer):\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
    if (frMatch) formalResp = frMatch[1].trim();
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

  // 9. Paso 7: Miniquiz (3 reactivos psicométricos con opciones A, B, C, D)
  const mini: QuizQuestion[] = [];
  const reactivoBlocks = fullText.split(/### (?:Reactivo|Item)\s*\d+/i);
  for (let i = 1; i < reactivoBlocks.length; i++) {
    const rText = reactivoBlocks[i].split(/### (?:Recuperación|Recovery)|## (?:10\.|Step 8|Paso 8)/)[0];
    
    // Question text: first line with bold or question
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
      if (isCorrect) {
        correct = optText;
      }
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

  // 10. Recuperación adaptativa
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

  // Assembling final LessonData object
  const lessonData: LessonData = {
    metadata: {
      grade: plan.grade,
      subject: plan.subjectName,
      oaCode: plan.oaCode,
      oaTitle: plan.oaTitle,
      lessonNumber: 1,
      totalLessonsInOa: 6,
      lessonTitle: meta.title,
      durationMinutes: meta.duration,
      nextLessonTitle: meta.nextTitle
    },
    prep: {
      adultObjective: adultObjective || 'Acompañar al estudiante en la sesión.',
      routeToday: routeToday || 'Observar → leer → responder → sintetizar.',
      mentorReminder: 'Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Las respuestas esperadas y criterios te indican qué debe responder el estudiante.',
      reminders: reminders.length > 0 ? reminders : [
        'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
        'Mantén abierto el texto oficial de referencia.',
        'Acompaña la reflexión socrática sin imponer respuestas cerradas.'
      ],
      emotionalTip: emotionalTip || 'Mantén un clima de confianza, escucha activa y validación.'
    },
    route: {
      blocks: blocks.length >= 4 ? blocks : [
        { id: 'b1', number: '01', title: 'Apertura', subtitle: 'Observar y anticipar', color: 'orange' },
        { id: 'b2', number: '02', title: 'Exploración', subtitle: 'Pistas y evidencias', color: 'teal' },
        { id: 'b3', number: '03', title: 'Comprensión', subtitle: 'Contraste y análisis', color: 'yellow' },
        { id: 'b4', number: '04', title: 'Evaluación', subtitle: 'Práctica y síntesis', color: 'navy' }
      ],
      keyQuestions: keyQuestions,
      dileIntro: dilePaso1 || `Hoy comenzaremos la clase: "${meta.title}".`,
      dileObjective: dileObjective || 'Aprenderemos a fundamentar nuestras respuestas con evidencias del texto oficial.'
    },
    situation: {
      dilePrompt: sitDile || 'Observa la escena inicial e identifica los elementos principales.',
      expectedAnswer: sitExpected || 'Respuesta abierta con hipótesis inicial.',
      socraticHint: sitHint || '¿Qué pistas observas en la imagen o texto?',
      emotionalTip: emotionalTip || 'Acepta las hipótesis iniciales como parte del proceso de indagación.',
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
    interactive: {
      type: plan.subjectFolder.includes('Lengua') ? 'reading_resource' : 'general',
      title: plan.subjectFolder.includes('Lengua') ? 'Recurso de Lectura: El mejor amigo de un muchacho' : meta.title
    },
    reference: {
      dilePrompt: refDile || 'Leamos el punto de partida del recurso oficial.',
      question: refDile || '¿Qué información entrega el recurso de partida?',
      expectedAnswer: refExpected || 'Respuesta basada en la evidencia del texto oficial.',
      socraticHint: 'Localiza las palabras clave en la página.',
      feedbackSuccess: refSuccess || '¡Excelente! Encontraste los datos exactos en la fuente.',
      feedbackSupport: refSupport || 'Revisa nuevamente la página y localiza el término indicado.'
    },
    hook: {
      title: meta.title,
      dileIntro: dilePaso1 || 'Observa con atención la secuencia en pantalla.',
      hazInstruction: 'Observa cada lámina e interactúa con las preguntas clave.',
      videoSrc: '',
      dileAfterVideo: 'Conversemos sobre lo observado y profundicemos en las ideas del recurso.',
      slides: slides
    },
    preQuestions: preQuestions,
    formalization: {
      title: meta.title,
      concept: formalConcept || 'Concepto central de la lección.',
      summary: formalIdea || 'Idea clave de la formalización.',
      ideaClave: formalIdea || 'Idea clave de la formalización.',
      dileIntro: formalDile || 'Analicemos cómo conectar la idea con las evidencias del texto.',
      hazInstruction: formalHaz || 'Completa la síntesis con tus propias palabras.',
      slides: slides.filter(s => s.slideNumber >= 8)
    },
    postQuestions: postQuestions.length > 0 ? postQuestions : [
      {
        context: 'Comprobación 1',
        question: '¿Qué idea clave aprendimos hoy?',
        expected: formalIdea || 'Identificar y fundamentar con evidencias.',
        success: 'Respuesta correcta.',
        support: 'Revisa el concepto central.',
        reveal: formalIdea || 'Identificar y fundamentar con evidencias.',
        studentReveal: formalIdea || 'Identificar y fundamentar con evidencias.'
      }
    ],
    practice: practice,
    mini: mini,
    recovery: recovery.length >= 3 ? recovery : [
      {
        title: 'Recuperación 1',
        explain: 'Andamiaje guiado.',
        q: 'Pregunta de apoyo',
        options: ['Opción A', 'Opción B'],
        correct: 'Opción A',
        correctText: 'Correcto',
        fixText: 'Revisa el texto'
      }
    ],
    summaryIdeas: summaryIdeas.length > 0 ? summaryIdeas : [
      ['Idea 1', 'Primera idea clave de la lección'],
      ['Idea 2', 'Segunda idea clave de la lección'],
      ['Idea 3', 'Tercera idea clave de la lección']
    ],
    paso8_cierre: {
      preguntaSintesis: preguntaSintesis || '¿Qué aprendimos hoy?',
      metacognicion: metacognicion || '¿Qué estrategia te ayudó más a comprender?',
      celebracion: celebracion || '¡Excelente trabajo en esta clase!'
    }
  };

  return lessonData;
}

export function run() {
  console.log('=== CARGANDO LECCIONES DESDE LECCIONES_POR_REVISAR/110-7 ===\n');

  for (const plan of LESSON_PLANS) {
    const fullMdPath = path.resolve(REVISAR_DIR, plan.subjectFolder, plan.oaFolder, plan.mdFile);
    console.log(`[+] Leyendo archivo fuente: ${fullMdPath}`);

    if (!fs.existsSync(fullMdPath)) {
      throw new Error(`Archivo no encontrado: ${fullMdPath}`);
    }

    const mdContent = fs.readFileSync(fullMdPath, 'utf8');
    const lessonData = parseLessonMarkdown(mdContent, plan);

    console.log(`    Título extraído: "${lessonData.metadata.lessonTitle}"`);
    console.log(`    Láminas gancho/explicación: ${lessonData.hook.slides?.length}`);
    console.log(`    Preguntas guiadas: ${lessonData.preQuestions.length}`);
    console.log(`    Casos práctica: ${lessonData.practice.length}`);
    console.log(`    Reactivos miniquiz: ${lessonData.mini.length}`);

    // Escribir en Web Studio Simple
    const fullTsPath = path.resolve(ROOT, plan.tsDestPath);
    const tsCode = `import { LessonData } from '../../types/lesson';\n\nexport const ${plan.exportVar}: LessonData = ${JSON.stringify(lessonData, null, 2)};\n`;
    fs.writeFileSync(fullTsPath, tsCode, 'utf8');
    console.log(`    ✓ Guardado en TypeScript: ${plan.tsDestPath}\n`);
  }

  console.log('=== TODAS LAS 4 LECCIONES CARGADAS EXITOSAMENTE ===');
}

run();
