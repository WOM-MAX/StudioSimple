import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { LessonData, SlidePrompt, GuidedItem, QuizQuestion, RecoveryItem } from '../Web Studio Simple/src/types/lesson';
import { adaptPlayerLessonToGenerator } from '../Web Studio Simple/src/lib/lesson-adapter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const REVISAR_DIR = path.resolve(ROOT, 'LECCIONES_POR_REVISAR', '110-7', 'Lengua_Literatura', 'OA03');
const WEB_STUDIO_DIR = path.resolve(ROOT, 'Web Studio Simple');
const LESSONS_TS_DIR = path.resolve(WEB_STUDIO_DIR, 'src', 'data', 'lessons');
const ALL_GRADES_JSON_PATH = path.resolve(WEB_STUDIO_DIR, 'public', 'data', 'injected_lessons_all_grades.json');
const GRADE_7B_JSON_PATH = path.resolve(WEB_STUDIO_DIR, 'public', 'data', 'injected_lessons_7b.json');
const MANIFEST_DATA_PATH = path.resolve(ROOT, 'data', 'sync_manifest.json');
const MANIFEST_PUBLIC_PATH = path.resolve(WEB_STUDIO_DIR, 'public', 'data', 'sync_manifest.json');

const NEXT_LESSONS: Record<number, string> = {
  2: 'Inferencias con evidencia del relato',
  3: 'La voz del narrador y los personajes',
  4: 'El orden de los hechos y el recuerdo',
  5: 'Comparar relatos con evidencia',
  6: 'Consolidación y evaluación formativa del OA 3'
};

const EMOTIONAL_TIPS: Record<number, string> = {
  2: 'Acompaña el razonamiento del estudiante: comprender las acciones y sus efectos en el conflicto fomenta el pensamiento crítico y la empatía narrativa.',
  3: 'Valora toda interpretación que encuentre respaldo en el texto: en literatura tu lectura es válida siempre que esté fundamentada con evidencia.',
  4: 'Distingue con paciencia las voces del relato: separar la voz del narrador de las intervenciones de los personajes agudiza la comprensión sin presiones.',
  5: 'Comprender los saltos temporales requiere atención: celebra cuando conecte el recuerdo del pasado con el presente de la historia.',
  6: 'Comparar dos relatos enriquece la visión de mundo: felicita su capacidad de tender puentes entre historias distintas.'
};

function cleanText(text: string): string {
  return (text || '').replace(/\r\n/g, '\n').trim();
}

export function parseLenguaLessonMd(rawContent: string, classNum: number): LessonData {
  const text = cleanText(rawContent);

  // Metadata
  const titleMatch = text.match(/^#\s*EstudioSimple\s*·\s*(.+)$/m);
  const lessonTitle = titleMatch ? titleMatch[1].trim() : `Clase ${classNum}`;

  const objMatch = text.match(/\*\*Objetivo de la clase:\*\*\s*([^\n]+)/i);
  const adultObjective = objMatch ? objMatch[1].trim() : '';

  // Paso 1
  const forMentorMatch = text.match(/\*\*Para el mentor:\*\*\s*([^\n]+)/i);
  const mentorReminder = forMentorMatch ? forMentorMatch[1].trim() : 'Sigue las indicaciones en pantalla paso a paso. Lee únicamente los recuadros DILE y PREGÚNTALE.';

  const sayPaso1Match = text.match(/\*\*DILE \/ SAY:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  const dileIntro = sayPaso1Match ? sayPaso1Match[1].trim() : `Hoy exploraremos ${lessonTitle}.`;

  const reminders = [
    'Lee el recurso con el estudiante antes de preguntar.',
    'Guía usando los recuadros DILE y PREGÚNTALE.',
    'Mantén las respuestas de referencia privadas hasta que el estudiante intente responder.',
    'Acepta respuestas en palabras propias siempre que se fundamenten con pistas del texto.'
  ];

  // Paso 2A
  const routeMatch = text.match(/## 2\. Paso 2A[^\n]*\n+([^*\n]+)/i);
  const routeToday = routeMatch ? routeMatch[1].trim() : 'Leer el recurso → localizar pistas → explicar → practicar → comprobar comprensión.';

  // Paso 2B: Recurso visible
  const readingMatch = text.match(/### Recurso de lectura visible para el estudiante\s*\n+([\s\S]*?)(?=\*\*DILE antes de leer:)/i);
  const readingText = readingMatch ? readingMatch[1].trim() : '';
  const paragraphs = readingText.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);

  const dileBeforeReadMatch = text.match(/\*\*DILE antes de leer:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  const dileBeforeRead = dileBeforeReadMatch ? dileBeforeReadMatch[1].trim() : '¿Qué imaginas a partir del título? Presenta tu idea como una anticipación.';

  const startingPointMatch = text.match(/\*\*Punto de partida \/ Starting point:\*\*\s*([^\n]+)/i);
  const startingPoint = startingPointMatch ? startingPointMatch[1].trim() : '';

  const refMatch = text.match(/\*\*Respuesta de referencia \/ Reference:\*\*\s*([^\n]+)/i);
  const refAnswer = refMatch ? refMatch[1].trim() : '';

  // Paso 4: Conversación guiada (Pregunta 1 y 2)
  const preQuestions: GuidedItem[] = [];
  const p1BlockMatch = text.match(/### Pregunta 1\s*\n+([\s\S]*?)(?=### Pregunta 2)/i);
  const p2BlockMatch = text.match(/### Pregunta 2\s*\n+([\s\S]*?)(?=## 6\. Paso 5)/i);

  function parsePreguntaBlock(blockText: string, defaultNum: number): GuidedItem {
    const ctxMatch = blockText.match(/\*\*Contexto:\*\*\s*([^\n]+)/i);
    const askMatch = blockText.match(/\*\*PREGÚNTALE \/ ASK:\*\*\s*([^\n]+)/i);
    const expMatch = blockText.match(/\*\*Respuesta esperada, privada para el mentor:\*\*\s*([^\n]+)/i);
    const evidMatch = blockText.match(/\*\*Evidencia:\*\*\s*([^\n]+)/i);
    const critMatch = blockText.match(/\*\*Criterio:\*\*\s*([^\n]+)/i);

    const a1Match = blockText.match(/\*\*Apoyo 1:\*\*\s*([^\n]+)/i);
    const a2Match = blockText.match(/\*\*Apoyo 2:\*\*\s*([^\n]+)/i);
    const a3Match = blockText.match(/\*\*Apoyo 3:\*\*\s*([^\n]+)/i);
    const supports = [a1Match?.[1], a2Match?.[1], a3Match?.[1]].filter(Boolean).join(' ');

    return {
      context: ctxMatch ? ctxMatch[1].trim() : `Pregunta ${defaultNum}`,
      question: askMatch ? askMatch[1].trim() : '',
      expected: expMatch ? expMatch[1].trim() : '',
      success: critMatch ? critMatch[1].trim() : 'Respuesta comprensible, información precisa y explicación de su relación.',
      support: supports || 'Localiza una pista concreta en el recurso y compárala con tu explicación.',
      reveal: evidMatch ? evidMatch[1].trim() : (expMatch ? expMatch[1].trim() : ''),
      studentReveal: expMatch ? expMatch[1].trim() : '',
      studentImage: `/images/lessons/lengua_7b_oa03_clase0${classNum}_p${defaultNum}.jpg`,
      relevantParagraph: defaultNum
    };
  }

  if (p1BlockMatch) preQuestions.push(parsePreguntaBlock(p1BlockMatch[1], 1));
  if (p2BlockMatch) preQuestions.push(parsePreguntaBlock(p2BlockMatch[1], 2));

  // Paso 5: Explicación y modelamiento
  const p5Match = text.match(/## 6\. Paso 5 — Explicación y modelamiento\s*\n+([\s\S]*?)(?=## 7\. Paso 6)/i);
  let formalConcept = '';
  let formalModel = '';
  let compInmediataQ = '';
  let compInmediataAns = '';

  if (p5Match) {
    const p5Text = p5Match[1];
    const cMatch = p5Text.match(/\*\*Concepto:\*\*\s*([^\n]+)/i);
    if (cMatch) formalConcept = cMatch[1].trim();

    const mMatch = p5Text.match(/\*\*Modelo explicado:\*\*\s*([^\n]+)/i);
    if (mMatch) formalModel = mMatch[1].trim();

    const ciMatch = p5Text.match(/\*\*Comprobación inmediata:\*\*\s*([^\n]+)/i);
    if (ciMatch) compInmediataQ = ciMatch[1].trim();

    const mcMatch = p5Text.match(/\*\*Modelo de comprobación:\*\*\s*([^\n]+)/i);
    if (mcMatch) compInmediataAns = mcMatch[1].trim();
  }

  // Paso 6: Práctica conjunta y autónoma (Casos 1 y 2)
  const practice: GuidedItem[] = [];
  const c1Match = text.match(/### Caso 1\s*\n+([\s\S]*?)(?=### Caso 2)/i);
  const c2Match = text.match(/### Caso 2\s*\n+([\s\S]*?)(?=## 8\. Paso 7)/i);

  function parseCasoBlock(cText: string, caseNum: number): GuidedItem {
    const sitMatch = cText.match(/\*\*Situación de práctica:\*\*\s*([^\n]+)/i);
    const actMatch = cText.match(/\*\*Actividad:\*\*\s*([^\n]+)/i);
    const modMatch = cText.match(/\*\*Modelo para revisar después del intento:\*\*\s*([^\n]+)/i);
    const retMatch = cText.match(/\*\*Retroalimentación:\*\*\s*([^\n]+)/i);

    return {
      context: sitMatch ? `Caso ${caseNum}: ${sitMatch[1].trim()}` : `Caso ${caseNum}`,
      question: actMatch ? actMatch[1].trim() : '',
      expected: modMatch ? modMatch[1].trim() : '',
      success: retMatch ? retMatch[1].trim() : 'Cumple el criterio formal del caso con evidencia del texto.',
      support: 'Vuelve al texto para ubicar la pista que conecta la acción con su efecto.',
      reveal: modMatch ? modMatch[1].trim() : '',
      studentReveal: modMatch ? modMatch[1].trim() : '',
      relevantParagraph: caseNum
    };
  }

  if (c1Match) practice.push(parseCasoBlock(c1Match[1], 1));
  if (c2Match) practice.push(parseCasoBlock(c2Match[1], 2));

  // Paso 7: Miniquiz (Reactivos 1, 2, 3) y Recuperación (1, 2, 3)
  const mini: QuizQuestion[] = [];
  const recovery: RecoveryItem[] = [];

  for (let r = 1; r <= 3; r++) {
    // Regex para reactivo r
    const reactivoRegex = new RegExp(`### Reactivo ${r}\\s*\\n+([\\s\\S]*?)(?=### Recuperación ${r})`, 'i');
    const rMatch = text.match(reactivoRegex);
    if (rMatch) {
      const rBody = rMatch[1].trim();
      const lines = rBody.split('\n').map(l => l.trim()).filter(Boolean);
      const qText = lines[0];

      const optA = rBody.match(/-\s*A\.\s*([^\n]+)/i)?.[1]?.trim() || '';
      const optB = rBody.match(/-\s*B\.\s*([^\n]+)/i)?.[1]?.trim() || '';
      const optC = rBody.match(/-\s*C\.\s*([^\n]+)/i)?.[1]?.trim() || '';
      const optD = rBody.match(/-\s*D\.\s*([^\n]+)/i)?.[1]?.trim() || '';

      const keyMatch = rBody.match(/\*\*Clave privada:\*\*\s*([A-D])/i);
      const keyLetter = keyMatch ? keyMatch[1].toUpperCase() : 'A';

      const expFormatMatch = rBody.match(/\*\*Explicación formativa:\*\*\s*([^\n]+)/i);
      const explainText = expFormatMatch ? expFormatMatch[1].trim() : '';

      const options = [
        `A. ${optA}`,
        `B. ${optB}`,
        `C. ${optC}`,
        `D. ${optD}`
      ];

      const correctOption = options.find(o => o.startsWith(`${keyLetter}.`)) || options[0];

      mini.push({
        id: `q${r}`,
        q: qText,
        options,
        correct: correctOption,
        fixExplain: explainText
      });
    }

    // Regex para recuperacion r
    const nextBoundary = r < 3 ? `### Reactivo ${r + 1}` : `## 9\\. Paso 8`;
    const recRegex = new RegExp(`### Recuperación ${r}\\s*\\n+([\\s\\S]*?)(?=${nextBoundary})`, 'i');
    const recMatch = text.match(recRegex);
    if (recMatch) {
      const recBody = recMatch[1].trim();
      const ensMatch = recBody.match(/\*\*Enseñanza:\*\*\s*([^\n]+)/i);
      const pistaMatch = recBody.match(/\*\*Pista:\*\*\s*([^\n]+)/i);
      const reintentoMatch = recBody.match(/\*\*Reintento completo:\*\*\s*([^\n]+)/i);

      const rOptA = recBody.match(/-\s*A\.\s*([^\n]+)/i)?.[1]?.trim() || '';
      const rOptB = recBody.match(/-\s*B\.\s*([^\n]+)/i)?.[1]?.trim() || '';
      const rOptC = recBody.match(/-\s*C\.\s*([^\n]+)/i)?.[1]?.trim() || '';
      const rOptD = recBody.match(/-\s*D\.\s*([^\n]+)/i)?.[1]?.trim() || '';

      const rKeyMatch = recBody.match(/\*\*Clave:\*\*\s*([A-D])/i);
      const rKeyLetter = rKeyMatch ? rKeyMatch[1].toUpperCase() : 'A';

      const aciertaMatch = recBody.match(/\*\*Si acierta:\*\*\s*([^*]+)(?=\*\*Si necesita)/i);
      const apoyoMatch = recBody.match(/\*\*Si necesita más apoyo:\*\*\s*([^\n]+)/i);

      const rOptions = [
        `A. ${rOptA}`,
        `B. ${rOptB}`,
        `C. ${rOptC}`,
        `D. ${rOptD}`
      ];
      const rCorrect = rOptions.find(o => o.startsWith(`${rKeyLetter}.`)) || rOptions[0];

      recovery.push({
        title: `Recuperación Reactivo ${r}`,
        explain: `${ensMatch ? ensMatch[1].trim() : ''} ${pistaMatch ? pistaMatch[1].trim() : ''}`.trim(),
        q: reintentoMatch ? reintentoMatch[1].trim() : 'Vuelve a responder con el apoyo del texto:',
        options: rOptions,
        correct: rCorrect,
        correctText: aciertaMatch ? aciertaMatch[1].trim() : '¡Excelente! Usaste el recurso para fundamentar tu respuesta.',
        fixText: apoyoMatch ? apoyoMatch[1].trim() : 'Subraya la pista específica y compárala con tu respuesta.'
      });
    }
  }

  // Paso 8: Síntesis y cierre
  const p8Match = text.match(/## 9\. Paso 8 — Síntesis y cierre\s*\n+([\s\S]*?)(?=## Trazabilidad)/i);
  let ideaClaveP8 = '';
  let sintesisP8 = '';
  let metaP8 = '';
  let cierreP8 = '';

  if (p8Match) {
    const p8Text = p8Match[1];
    const icMatch = p8Text.match(/\*\*Idea clave:\*\*\s*([^\n]+)/i);
    if (icMatch) ideaClaveP8 = icMatch[1].trim();

    const sinMatch = p8Text.match(/\*\*Síntesis:\*\*\s*([^\n]+)/i);
    if (sinMatch) sintesisP8 = sinMatch[1].trim();

    const mMatch = p8Text.match(/\*\*Metacognición:\*\*\s*([^\n]+)/i);
    if (mMatch) metaP8 = mMatch[1].trim();

    const cMatch = p8Text.match(/\*\*Cierre:\*\*\s*([^\n]+)/i);
    if (cMatch) cierreP8 = cMatch[1].trim();
  }

  // Guiones audiovisuales (Paso 3): 7 Motivación + 7 Explicación = 14 láminas
  const slides: SlidePrompt[] = [];
  const guionesMatch = text.match(/## Guiones audiovisuales de producción\s*\n+([\s\S]*)$/i);
  if (guionesMatch) {
    const gText = guionesMatch[1];
    const motMatch = gText.match(/### Motivación\s*\n+([\s\S]*?)(?=### Explicación)/i);
    const expMatch = gText.match(/### Explicación\s*\n+([\s\S]*)$/i);

    // Parse slides de Motivacion (1 a 7)
    if (motMatch) {
      const motText = motMatch[1];
      const motBlocks = motText.split(/#### Diapositiva\s*0?(\d+)\s*—\s*([^\n]+)/i);
      for (let i = 1; i < motBlocks.length; i += 3) {
        const sNum = parseInt(motBlocks[i], 10);
        const sTitle = motBlocks[i + 1].trim();
        const sBody = motBlocks[i + 2] || '';

        const tvMatch = sBody.match(/\*\*Texto visible:\*\*\s*([^\n]+)/i);
        const locMatch = sBody.match(/\*\*Locución:\*\*\s*([^\n]+)/i);
        const overlayText = tvMatch ? tvMatch[1].trim() : sTitle;

        slides.push({
          slideNumber: sNum,
          tituloMomento: sTitle,
          didacticPurpose: sTitle,
          visualPrompt: `Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers analyzing ${lessonTitle} in Lengua y Literatura. Setting: ${sTitle}. Cinematic lighting, clean composition, clear negative space. No text drawn by AI.`,
          overlayText,
          overlayTitle: overlayText.split('/')[0].trim(),
          overlaySubtitle: overlayText.split('/')[1]?.trim() || '',
          vectorialOverlayPptx: overlayText,
          speakerNotes: locMatch ? locMatch[1].trim() : ''
        });
      }
    }

    // Parse slides de Explicación (8 a 14)
    if (expMatch) {
      const expText = expMatch[1];
      const expBlocks = expText.split(/#### Diapositiva\s*0?(\d+)\s*—\s*([^\n]+)/i);
      for (let i = 1; i < expBlocks.length; i += 3) {
        const sNumRel = parseInt(expBlocks[i], 10);
        const sTitle = expBlocks[i + 1].trim();
        const sBody = expBlocks[i + 2] || '';

        const tvMatch = sBody.match(/\*\*Texto visible:\*\*\s*([^\n]+)/i);
        const locMatch = sBody.match(/\*\*Locución:\*\*\s*([^\n]+)/i);
        const overlayText = tvMatch ? tvMatch[1].trim() : sTitle;

        slides.push({
          slideNumber: sNumRel + 7,
          tituloMomento: sTitle,
          didacticPurpose: sTitle,
          visualPrompt: `Modern anime style 16:9 widescreen illustration. Focus on explanation and modeling of ${lessonTitle}. Concept: ${sTitle}. Clean background, warm focus. No text drawn by AI.`,
          overlayText,
          overlayTitle: overlayText.split('/')[0].trim(),
          overlaySubtitle: overlayText.split('/')[1]?.trim() || '',
          vectorialOverlayPptx: overlayText,
          speakerNotes: locMatch ? locMatch[1].trim() : ''
        });
      }
    }
  }

  // Si no se parsearon exactamente 14 slides, rellenar ordenadamente
  while (slides.length < 14) {
    const sNum = slides.length + 1;
    slides.push({
      slideNumber: sNum,
      tituloMomento: `Lámina ${sNum}`,
      didacticPurpose: `Momento ${sNum}`,
      visualPrompt: `Modern anime style illustration for ${lessonTitle}. No text drawn by AI.`,
      overlayText: lessonTitle,
      overlayTitle: lessonTitle,
      overlaySubtitle: '',
      vectorialOverlayPptx: lessonTitle,
      speakerNotes: `Continuamos explorando ${lessonTitle}.`
    });
  }

  // Key questions para Paso 2
  const keyQuestions = [
    {
      label: 'Pregunta Clave 1',
      sub: preQuestions[0]?.question || startingPoint || '¿Qué acción de los personajes impulsa el relato?'
    },
    {
      label: 'Pregunta Clave 2',
      sub: preQuestions[1]?.question || compInmediataQ || '¿Cómo se relaciona la evidencia con el conflicto?'
    }
  ];

  // Post questions
  const postQuestions: GuidedItem[] = [
    {
      context: 'Comprobación 1 · Aplicación inmediata',
      question: compInmediataQ || startingPoint || '¿Cómo apoya la acción del personaje la explicación del conflicto?',
      expected: compInmediataAns || refAnswer || 'Explica la relación entre la acción y su efecto en el relato.',
      success: 'Respuesta comprensible, fundamentada en el texto.',
      support: 'Revisa el modelo de la clase y compáralo con tu respuesta.',
      reveal: compInmediataAns || refAnswer,
      studentReveal: compInmediataAns || refAnswer
    },
    {
      context: 'Comprobación 2 · Síntesis de la evidencia',
      question: sintesisP8 || '¿Qué pista del recurso fundamenta tu conclusión?',
      expected: refAnswer || compInmediataAns,
      success: 'Usa una pista concreta del texto.',
      support: 'Vuelve al recurso de lectura para ubicar la pista.',
      reveal: refAnswer || compInmediataAns,
      studentReveal: refAnswer || compInmediataAns
    }
  ];

  return {
    metadata: {
      grade: '7° Básico',
      subject: 'Lengua y Literatura',
      oaCode: 'OA 3',
      oaTitle: 'Análisis de narraciones: conflicto, personajes y ambiente',
      lessonNumber: classNum,
      totalLessonsInOa: 6,
      lessonTitle,
      durationMinutes: 30,
      nextLessonTitle: NEXT_LESSONS[classNum] || 'Consolidación curricular del OA 3'
    },
    prep: {
      adultObjective,
      routeToday,
      mentorReminder,
      reminders,
      emotionalTip: EMOTIONAL_TIPS[classNum] || 'Estimula la voz propia: en literatura tu interpretación es valiosa si encuentras pistas en el texto.'
    },
    route: {
      blocks: [
        {
          id: 'b1',
          number: '01',
          title: 'Lectura activa',
          subtitle: 'Leer el recurso y ubicar pistas',
          color: 'orange'
        },
        {
          id: 'b2',
          number: '02',
          title: 'Exploración',
          subtitle: 'Videos y conversación guiada',
          color: 'teal'
        },
        {
          id: 'b3',
          number: '03',
          title: 'Modelamiento',
          subtitle: 'Explicación y práctica en cuaderno',
          color: 'yellow'
        },
        {
          id: 'b4',
          number: '04',
          title: 'Evaluación',
          subtitle: 'Miniquiz formativo y síntesis',
          color: 'navy'
        }
      ],
      keyQuestions,
      dileIntro,
      dileObjective: `Al terminar, podrás ${adultObjective.toLowerCase()}`
    },
    situation: {
      dilePrompt: dileBeforeRead,
      expectedAnswer: refAnswer || 'Anticipaciones lógicas apoyadas en el título o detalles visibles.',
      socraticHint: '¿Eso aparece en el recurso o lo estás anticipando a partir del título?',
      emotionalTip: EMOTIONAL_TIPS[classNum] || 'Valora el razonamiento inicial: las anticipaciones preparan la mente para la lectura comprensiva.',
      options: [
        {
          label: 'Formuló una anticipación lógica basada en el título y el contexto',
          kind: 'correct',
          feedbackText: '¡Excelente! Planteaste una anticipación fundamentada.'
        },
        {
          label: 'Mencionó ideas sueltas sin conectar con la situación del relato',
          kind: 'needs_support',
          feedbackText: 'Observa el título: ¿qué palabras te dan pistas de lo que ocurrirá?'
        },
        {
          label: 'Requiere apoyo inicial o no sabe qué anticipar',
          kind: 'no_answer',
          feedbackText: 'Leamos juntos el título: ¿de qué imaginas que tratará?'
        }
      ]
    },
    interactive: {
      type: 'reading_resource',
      title: lessonTitle,
      readingText,
      paragraphs,
      imageSrc: `/images/lessons/lengua_7b_oa03_clase0${classNum}_recurso.jpg`
    },
    reference: {
      dilePrompt: startingPoint,
      question: startingPoint,
      expectedAnswer: refAnswer,
      socraticHint: 'Vuelve al recurso de lectura en pantalla y localiza la pista clave.',
      feedbackSuccess: '¡Excelente! Usaste información del recurso para fundamentar tu respuesta.',
      feedbackSupport: 'Vuelve a leer el recurso en pantalla y busca la acción concreta que responde a la pregunta.'
    },
    hook: {
      title: lessonTitle,
      dileIntro: slides[0]?.speakerNotes || `Hoy exploraremos ${lessonTitle}.`,
      hazInstruction: 'Observa cada una de las 14 láminas y sigue la locución.',
      videoSrc: '',
      dileAfterVideo: 'Conversemos sobre los detalles y evidencias que acabas de observar.',
      slides
    },
    preQuestions,
    formalization: {
      title: 'Explicación y modelamiento',
      concept: formalConcept || 'Las acciones de un personaje cambian lo que otros sienten, dicen o hacen en el relato.',
      summary: formalModel || 'Para explicar un efecto, nombramos qué hizo un personaje y qué respuesta aparece después.',
      ideaClave: ideaClaveP8 || formalConcept || 'Una acción se explica mediante su efecto fundamentado en el relato.',
      dileIntro: compInmediataQ || 'Comprobemos lo que acabamos de revisar sobre el conflicto y los personajes.',
      hazInstruction: 'Explica tu respuesta relacionando la acción con su efecto concreto usando evidencia del texto.',
      postDileIntro: 'Comprobemos lo que acabamos de revisar.',
      videoSrc: '',
      slides: []
    },
    postQuestions,
    practice,
    mini,
    recovery,
    summaryIdeas: [
      ['Idea clave', ideaClaveP8 || 'Una acción se explica mediante su efecto fundamentado en el relato.'],
      ['Síntesis', sintesisP8 || '¿Qué efecto tiene la acción analizada sobre los demás personajes?'],
      ['Metacognición', metaP8 || '¿Qué te ayudó más: leer el recurso, localizar pistas o comparar explicaciones?']
    ],
    paso8_cierre: {
      preguntaSintesis: sintesisP8 || '¿Qué pista del relato fundamenta tu conclusión?',
      metacognicion: metaP8 || '¿Qué estrategia te ayudó más a fundamentar tu respuesta?',
      celebracion: cierreP8 || '¡Buen trabajo! Explicaste tu respuesta usando información del recurso.'
    }
  };
}

export async function runSurgicalInjection() {
  console.log('================================================================');
  console.log('🚀 INYECCIÓN QUIRÚRGICA: LENGUA Y LITERATURA 7°B OA03 (02 A 06)');
  console.log('================================================================\n');

  // 1. Verificación de blindaje para Clase 01
  const clase01Ts = path.join(LESSONS_TS_DIR, 'lengua_7b_oa03_clase01.ts');
  if (!fs.existsSync(clase01Ts)) {
    throw new Error('❌ ERROR CRÍTICO: No existe lengua_7b_oa03_clase01.ts. Abortando para proteger integridad.');
  }
  const clase01OriginalHash = crypto.createHash('sha256').update(fs.readFileSync(clase01Ts, 'utf8')).digest('hex');
  console.log(`[PROTECCIÓN] lengua_7b_oa03_clase01.ts verificado. Hash actual: ${clase01OriginalHash.substring(0, 16)}`);

  // 2. Procesar clases 02 a 06
  const classesToProcess = [2, 3, 4, 5, 6];
  const newManifestEntries: any[] = [];
  const processedLessons: LessonData[] = [];

  for (const cNum of classesToProcess) {
    const cNumStr = String(cNum).padStart(2, '0');
    const mdFileName = `CLASE${cNumStr}.md`;
    const mdFilePath = path.join(REVISAR_DIR, mdFileName);

    if (!fs.existsSync(mdFilePath)) {
      throw new Error(`❌ Archivo no encontrado: ${mdFilePath}`);
    }

    const rawMd = fs.readFileSync(mdFilePath, 'utf8');
    const fileHash = crypto.createHash('sha256').update(rawMd).digest('hex').substring(0, 16);
    console.log(`\n[+] Parseando ${mdFileName} (Hash: ${fileHash})...`);

    const lessonData = parseLenguaLessonMd(rawMd, cNum);
    console.log(`    Título: "${lessonData.metadata.lessonTitle}"`);
    console.log(`    Láminas: ${lessonData.hook.slides?.length || 0} | Reactivos: ${lessonData.mini.length} | Recuperaciones: ${lessonData.recovery.length}`);

    // Guardar módulo TS
    const tsFileName = `lengua_7b_oa03_clase${cNumStr}.ts`;
    const tsFilePath = path.join(LESSONS_TS_DIR, tsFileName);
    const varName = `LENGUA_7B_OA03_CLASE${cNumStr}`;

    const tsCode = `import { LessonData } from '../../types/lesson';\n\nexport const ${varName}: LessonData = ${JSON.stringify(lessonData, null, 2)};\n`;
    fs.writeFileSync(tsFilePath, tsCode, 'utf8');
    console.log(`    ✓ Módulo TypeScript guardado: ${tsFileName}`);

    processedLessons.push(lessonData);

    newManifestEntries.push({
      courseId: '110-7',
      grade: '7° Básico',
      subject: 'Lengua y Literatura',
      oaCode: 'OA 3',
      classNumber: cNum,
      title: lessonData.metadata.lessonTitle,
      sourceFile: `LECCIONES_POR_REVISAR/110-7/Lengua_Literatura/OA03/${mdFileName}`,
      destModule: `Web Studio Simple/src/data/lessons/${tsFileName}`,
      varName,
      hash: fileHash,
      status: 'EN_REVISION',
      syncedAt: new Date().toISOString()
    });
  }

  // 3. Verificar que Clase 01 sigue intacta
  const clase01PostHash = crypto.createHash('sha256').update(fs.readFileSync(clase01Ts, 'utf8')).digest('hex');
  if (clase01PostHash !== clase01OriginalHash) {
    throw new Error('❌ VIOLACIÓN DE REGLA: lengua_7b_oa03_clase01.ts fue modificado. Abortando inmediatamente.');
  }
  console.log(`\n[PROTECCIÓN CONFIRMADA] lengua_7b_oa03_clase01.ts permaneció 100% intacta.`);

  // 4. Actualizar paquetes JSON consolidados
  console.log('\n[+] Actualizando paquetes JSON consolidados...');

  function updateJsonPackage(jsonPath: string) {
    if (!fs.existsSync(jsonPath)) return;
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const isArray = Array.isArray(data);
    const list: any[] = isArray ? data : Object.values(data);

    // Buscar paquete 110-7-LEN-OA03
    const pkg = list.find((p: any) =>
      p.oaId === '110-7-LEN-OA03' ||
      (p.oaCodigo === 'OA 3' && p.asignatura.toLowerCase().includes('leng') && (p.curso || '').includes('7'))
    );

    if (pkg) {
      for (const lesson of processedLessons) {
        const adapted = adaptPlayerLessonToGenerator(lesson);
        const idx = pkg.lessons.findIndex((l: any) => l.num === lesson.metadata.lessonNumber);
        if (idx >= 0) {
          pkg.lessons[idx] = adapted;
        } else {
          pkg.lessons.push(adapted);
        }
      }
      pkg.lessons.sort((a: any, b: any) => (a.num || 0) - (b.num || 0));
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`    ✓ Actualizado paquete en: ${path.basename(jsonPath)} (Total lecciones: ${pkg.lessons.length})`);
    } else {
      console.warn(`    ⚠️ No se encontró el paquete 110-7-LEN-OA03 en ${path.basename(jsonPath)}`);
    }
  }

  updateJsonPackage(GRADE_7B_JSON_PATH);
  updateJsonPackage(ALL_GRADES_JSON_PATH);

  // 5. Actualizar sync_manifest.json
  console.log('\n[+] Actualizando manifiestos de sincronización...');
  function updateManifest(mPath: string) {
    let mData: any = { lessons: [] };
    if (fs.existsSync(mPath)) {
      mData = JSON.parse(fs.readFileSync(mPath, 'utf8'));
    }

    for (const newEntry of newManifestEntries) {
      const existingIdx = mData.lessons.findIndex((l: any) =>
        l.courseId === newEntry.courseId &&
        l.subject === newEntry.subject &&
        l.oaCode === newEntry.oaCode &&
        l.classNumber === newEntry.classNumber
      );
      if (existingIdx >= 0) {
        mData.lessons[existingIdx] = newEntry;
      } else {
        mData.lessons.push(newEntry);
      }
    }

    mData.lessons.sort((a: any, b: any) => {
      if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
      return (a.classNumber || 0) - (b.classNumber || 0);
    });

    mData.timestamp = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' }) + ' [America/Santiago]';
    mData.isoDate = new Date().toISOString();
    mData.totalLessonsProcessed = mData.lessons.length;
    mData.status = 'EN_REVISION';

    fs.mkdirSync(path.dirname(mPath), { recursive: true });
    fs.writeFileSync(mPath, JSON.stringify(mData, null, 2), 'utf8');
    console.log(`    ✓ Manifiesto actualizado: ${path.basename(mPath)}`);
  }

  updateManifest(MANIFEST_DATA_PATH);
  updateManifest(MANIFEST_PUBLIC_PATH);

  console.log('\n================================================================');
  console.log('✅ INYECCIÓN QUIRÚRGICA COMPLETADA CON ÉXITO');
  console.log('   Clases inyectadas: 02, 03, 04, 05, 06');
  console.log('   Clase 01 protegida: 100% INTACTA');
  console.log('================================================================\n');
}

if (process.argv[1] && process.argv[1].includes('inject_lengua_oa03_clases_02_a_06')) {
  runSurgicalInjection().catch(err => {
    console.error('Error fatal en inyección:', err);
    process.exit(1);
  });
}
