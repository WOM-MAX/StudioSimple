import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LessonData, SlidePrompt, GuidedItem, QuizQuestion, RecoveryItem } from '../Web Studio Simple/src/types/lesson';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const REVISAR_FILE = path.resolve(ROOT, 'LECCIONES_POR_REVISAR', '110-7', 'Lengua_Literatura', 'OA03', 'CLASE01.md');
const TS_DEST = path.resolve(ROOT, 'Web Studio Simple', 'src', 'data', 'lessons', 'lengua_7b_oa03_clase01.ts');

function cleanMd(text: string): string {
  return text.replace(/\r\n/g, '\n').trim();
}

export function parseClase01Lengua(mdContent: string): LessonData {
  const fullText = cleanMd(mdContent);

  // 1. Metadata
  const titleMatch = fullText.match(/\*\*Título:\*\*\s*(.+)/i);
  const nextMatch = fullText.match(/\*\*Título de trabajo de la siguiente clase:\*\*\s*(.+)/i);
  const durationMatch = fullText.match(/\*\*Duración total:\*\*\s*(.+)/i);

  // 2. Paso 1
  let adultObjective = '';
  const objMatch = fullText.match(/### Objetivo de aprendizaje de la clase\s*\n\s*\*\*([^*]+)\*\*/i);
  if (objMatch) adultObjective = objMatch[1].trim();

  let routeToday = '';
  const routeMatch = fullText.match(/\*\*Ruta de la sesión:\*\*\s*(.+)/i);
  if (routeMatch) routeToday = routeMatch[1].trim();

  let dilePaso1 = '';
  const dile1Match = fullText.match(/\*\*DILE al estudiante:\*\*\s*[“"]([^”"]+)[”"]/i);
  if (dile1Match) dilePaso1 = dile1Match[1].trim();

  const reminders: string[] = [];
  const pautasRegex = /Pautas para el mentor:([\s\S]*?)\*\*Clima/i;
  const pautasMatch = fullText.match(pautasRegex);
  if (pautasMatch) {
    const pLines = pautasMatch[1].split('\n');
    for (const pl of pLines) {
      const itemMatch = pl.match(/^\d+\.\s*(.+)/);
      if (itemMatch) reminders.push(itemMatch[1].trim());
    }
  }

  let emotionalTip = '';
  const emoMatch = fullText.match(/\*\*Clima emocional:\*\*\s*(.+)/i);
  if (emoMatch) emotionalTip = emoMatch[1].trim();

  // 3. Paso 2A: Ruta
  const colorMap: Record<string, 'navy' | 'orange' | 'yellow' | 'teal'> = {
    'naranja': 'orange',
    'verde': 'teal',
    'amarillo': 'yellow',
    'azul marino': 'navy'
  };

  const blocks: Array<{ id: string; number: string; title: string; subtitle: string; color: 'navy' | 'orange' | 'yellow' | 'teal' }> = [];
  const tableRegex = /\| N\.?º? \| Bloque \| Qué hará el estudiante \| Color \|([\s\S]*?)(?:\n\s*\n|\*\*Pregunta clave)/i;
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
  const q1Match = fullText.match(/\*\*Pregunta clave 1:\*\*\s*(.+)/i);
  const q2Match = fullText.match(/\*\*Pregunta clave 2:\*\*\s*(.+)/i);
  if (q1Match) keyQuestions.push({ label: 'Pregunta Clave 1', sub: q1Match[1].trim() });
  if (q2Match) keyQuestions.push({ label: 'Pregunta Clave 2', sub: q2Match[1].trim() });

  let dileObjective = '';
  const objDileMatch = fullText.match(/\*\*DILE — Objetivo[^*]*:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (objDileMatch) dileObjective = objDileMatch[1].trim();

  // 4. Paso 2B: Activación y Lectura de Partida
  let sitDile = '';
  const sitDileMatch = fullText.match(/### Activación[\s\S]*?\*\*DILE:\*\*\s*[“"]([^”"]+)[”"]/i);
  if (sitDileMatch) sitDile = sitDileMatch[1].trim();

  let sitExpected = '';
  const sitExpMatch = fullText.match(/### Activación[\s\S]*?\*\*Respuestas aceptables:\*\*\s*([^\n]+)/i);
  if (sitExpMatch) sitExpected = sitExpMatch[1].trim();

  let sitHint = '';
  const sitHintMatch = fullText.match(/### Activación[\s\S]*?\*\*Pista socrática:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (sitHintMatch) sitHint = sitHintMatch[1].trim();

  // Lectura de partida
  let refDile = '';
  const refDileMatch = fullText.match(/### Lectura de partida[\s\S]*?\*\*DILE:\*\*\s*[“"]([^”"]+)[”"]/i);
  if (refDileMatch) refDile = refDileMatch[1].trim();

  let refExpected = '';
  const refExpMatch = fullText.match(/### Lectura de partida[\s\S]*?\*\*Respuesta de referencia:\*\*\s*([^\n]+)/i);
  if (refExpMatch) refExpected = refExpMatch[1].trim();

  let refSuccess = '';
  const refSuccMatch = fullText.match(/\*\*Retroalimentación correcta:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (refSuccMatch) refSuccess = refSuccMatch[1].trim();

  let refSupport = '';
  const refSuppMatch = fullText.match(/\*\*Retroalimentación con apoyo:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (refSuppMatch) refSupport = refSuppMatch[1].trim();

  // 5. Paso 3: Gancho y Explicación en 14 láminas
  const slides: SlidePrompt[] = [];
  const slideBlocks = fullText.split(/#### Lámina\s*(\d+)/i);
  for (let i = 1; i < slideBlocks.length; i += 2) {
    const sNum = parseInt(slideBlocks[i], 10);
    const sBody = slideBlocks[i + 1] || '';
    
    const headerLine = sBody.split('\n')[0].replace(/^[·\s]+/, '').replace(/[·\s]+\d+\s*s.*$/, '').trim();
    
    const textMatch = sBody.match(/-\s*\*\*Texto visible:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
    const imgMatch = sBody.match(/-\s*\*\*Imagen:\*\*\s*([^\n]+)/i);
    const locMatch = sBody.match(/-\s*\*\*Locución:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
    
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

  // 6. Paso 4: Conversación guiada (3 conversaciones)
  const preQuestions: GuidedItem[] = [];
  const convBlocks = fullText.split(/### Conversación\s*\d+/i);
  for (let i = 1; i < convBlocks.length; i++) {
    const cText = convBlocks[i];
    if (cText.includes('## 6.') || cText.includes('Paso 5')) {
      const cleanBlock = cText.split(/## 6\./)[0];
      parseConvItem(cleanBlock, preQuestions);
      break;
    } else {
      parseConvItem(cText, preQuestions);
    }
  }

  function parseConvItem(text: string, arr: GuidedItem[]) {
    const ctxMatch = text.match(/-\s*\*\*Contexto:\*\*\s*([^\n]+)/i);
    const qMatch = text.match(/-\s*\*\*DILE:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
    const expMatch = text.match(/-\s*\*\*Respuesta esperada:\*\*\s*([^\n]+)/i);
    const succMatch = text.match(/-\s*\*\*Éxito:\*\*\s*([^\n]+)/i);
    const suppMatch = text.match(/-\s*\*\*Apoyo:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
    const revMentorMatch = text.match(/-\s*\*\*Revelación para el mentor:\*\*\s*([^\n]+)/i);
    const revStudentMatch = text.match(/-\s*\*\*Revelación para el estudiante:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);

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

  // 7. Paso 5: Formalización
  let formalConcept = '';
  const fConceptMatch = fullText.match(/\*\*Concepto:\*\*\s*([^\n]+)/i);
  if (fConceptMatch) formalConcept = fConceptMatch[1].trim();

  let formalIdea = '';
  const fIdeaMatch = fullText.match(/\*\*Idea clave:\*\*\s*([^\n]+)/i);
  if (fIdeaMatch) formalIdea = fIdeaMatch[1].trim();

  let formalDile = '';
  const fDileMatch = fullText.match(/## 6\. Paso 5[\s\S]*?\*\*DILE:\*\*\s*[“"]([^”"]+)[”"]/i);
  if (fDileMatch) formalDile = fDileMatch[1].trim();

  let formalHaz = '';
  const fHazMatch = fullText.match(/## 6\. Paso 5[\s\S]*?\*\*HAZ:\*\*\s*([^\n]+)/i);
  if (fHazMatch) formalHaz = fHazMatch[1].trim();

  // Comprobaciones 5B
  const postQuestions: GuidedItem[] = [];
  const comp1Match = fullText.match(/### Comprobación 1[\s\S]*?\*\*Pregunta:\*\*\s*[“"]?([^”"\n]+)[”"]?[\s\S]*?\*\*Respuesta esperada:\*\*\s*([^\n]+)/i);
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
  const comp2Match = fullText.match(/### Comprobación 2[\s\S]*?\*\*Pregunta:\*\*\s*[“"]?([^”"\n]+)[”"]?[\s\S]*?\*\*Respuesta esperada:\*\*\s*([^\n]+)/i);
  if (comp2Match) {
    postQuestions.push({
      context: 'Comprobación 2',
      question: comp2Match[1].trim(),
      expected: comp2Match[2].trim(),
      success: 'Respuesta precisa y fundamentada',
      support: 'Revisa la relación entre las dos posturas',
      reveal: comp2Match[2].trim(),
      studentReveal: comp2Match[2].trim()
    });
  }

  // 8. Paso 6: Práctica conjunta (2 casos mapeados a GuidedItem[])
  const practice: GuidedItem[] = [];
  const practiceBlocks = fullText.split(/### Caso\s*(\d+)/i);
  for (let i = 1; i < practiceBlocks.length; i += 2) {
    const cNum = parseInt(practiceBlocks[i], 10);
    const pBody = practiceBlocks[i + 1] || '';
    
    const pCtxMatch = pBody.match(/-\s*\*\*Contexto:\*\*\s*([^\n]+)/i);
    const pPregMatch = pBody.match(/-\s*\*\*Pregunta:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
    const pRespMatch = pBody.match(/-\s*\*\*Respuesta de referencia:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
    const pCritMatch = pBody.match(/-\s*\*\*Criterio:\*\*\s*([^\n]+)/i);
    const pApoyoMatch = pBody.match(/-\s*\*\*Apoyo:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);

    practice.push({
      context: pCtxMatch ? pCtxMatch[1].trim() : `Caso ${cNum}`,
      question: pPregMatch ? pPregMatch[1].trim() : '',
      expected: pRespMatch ? pRespMatch[1].trim() : '',
      success: pCritMatch ? pCritMatch[1].trim() : 'Cumple el criterio formal del caso',
      support: pApoyoMatch ? pApoyoMatch[1].trim() : 'Revisa los datos del texto en pantalla',
      reveal: pRespMatch ? pRespMatch[1].trim() : '',
      studentReveal: pRespMatch ? pRespMatch[1].trim() : ''
    });
  }

  // 9. Paso 7: Miniquiz (3 reactivos psicométricos con opciones A, B, C, D)
  const mini: QuizQuestion[] = [];
  const reactivoBlocks = fullText.split(/### Reactivo\s*(\d+)/i);
  for (let i = 1; i < reactivoBlocks.length; i += 2) {
    const qNum = parseInt(reactivoBlocks[i], 10);
    const qBody = reactivoBlocks[i + 1] || '';
    
    const qQuestionMatch = qBody.match(/\*\*([^*?]+\?)\*\*/);
    const qText = qQuestionMatch ? qQuestionMatch[1].trim() : `Pregunta ${qNum}`;

    const options: string[] = [];
    let correct = '';
    const optLines = qBody.split('\n').filter(l => /^\s*-\s*[A-D]\./i.test(l));
    for (const ol of optLines) {
      const cleanOpt = ol.replace(/^\s*-\s*/, '').trim();
      const isCorrect = cleanOpt.includes('**Correcta**');
      const optText = cleanOpt.replace(/\*\*Correcta\*\*/g, '').trim();
      options.push(optText);
      if (isCorrect) {
        correct = optText;
      }
    }

    const corrMatch = qBody.match(/\*\*Corrección:\*\*\s*([^\n]+)/i);

    mini.push({
      id: `q${qNum}`,
      q: qText,
      options,
      correct: correct || options[0] || '',
      fixExplain: corrMatch ? corrMatch[1].trim() : 'Revisa la lectura para fundamentar con evidencia.'
    });
  }

  // 10. Recuperación adaptativa
  const recovery: RecoveryItem[] = [];
  const recovSection = fullText.match(/### Recuperación adaptativa([\s\S]*?)## 10\. Paso 8/i);
  if (recovSection) {
    const rLines = recovSection[1].split('\n').filter(l => l.includes('reactivo'));
    let rIdx = 1;
    for (const rl of rLines) {
      const cleanLine = rl.replace(/^\s*\*\*Si necesita apoyo en el reactivo \d+:\*\*\s*/i, '').trim();
      recovery.push({
        title: `Recuperación Reactivo ${rIdx}`,
        explain: cleanLine,
        q: `Paso guiado de recuperación para el Reactivo ${rIdx}`,
        options: ['Opción con andamiaje A', 'Opción con andamiaje B', 'Opción con andamiaje C'],
        correct: 'Opción con andamiaje A',
        correctText: '¡Excelente! Lograste resolver el reactivo con el andamiaje del texto.',
        fixText: 'Vuelve a revisar la lectura en pantalla para consolidar el aprendizaje.'
      });
      rIdx++;
    }
  }

  // 11. Paso 8: Síntesis y Cierre
  const summaryIdeas: Array<[string, string]> = [];
  const ideasSection = fullText.match(/### Tres ideas para recordar([\s\S]*?)\*\*Pregunta de síntesis:/i);
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
  const psMatch = fullText.match(/\*\*Pregunta de síntesis:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (psMatch) preguntaSintesis = psMatch[1].trim();

  let metacognicion = '';
  const metaMatch = fullText.match(/\*\*Metacognición:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (metaMatch) metacognicion = metaMatch[1].trim();

  let celebracion = '';
  const celMatch = fullText.match(/\*\*Celebración:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (celMatch) celebracion = celMatch[1].trim();

  let puente = '';
  const puMatch = fullText.match(/\*\*Puente a la siguiente clase:\*\*\s*[“"]?([^”"\n]+)[”"]?/i);
  if (puMatch) puente = puMatch[1].trim();

  const lessonData: LessonData = {
    metadata: {
      grade: '7° Básico',
      subject: 'Lengua y Literatura',
      oaCode: 'OA 3',
      oaTitle: 'Análisis de narraciones: conflicto, personajes y ambiente',
      lessonNumber: 1,
      totalLessonsInOa: 6,
      lessonTitle: titleMatch ? titleMatch[1].trim() : 'Jimmy y Robutt: leer el ambiente y descubrir el conflicto',
      durationMinutes: durationMatch ? parseInt(durationMatch[1].replace(/[^0-9]/g, ''), 10) || 30 : 30,
      nextLessonTitle: nextMatch ? nextMatch[1].trim() : 'Acciones de los personajes y desarrollo del conflicto.'
    },
    prep: {
      adultObjective: adultObjective || 'Describir el ambiente donde vive Jimmy y explicar el conflicto que inicia el relato.',
      routeToday: routeToday || 'Observar → leer el recurso en pantalla → reunir pistas → explicar el conflicto → comprobar comprensión.',
      mentorReminder: 'Sigue el guion leyendo en voz alta únicamente los recuadros DILE y PREGÚNTALE. Las respuestas esperadas y criterios te indican qué debe responder el estudiante.',
      reminders: reminders.length > 0 ? reminders : [
        'Usa el recurso de lectura incluido en esta lección. El Texto Escolar fue una fuente de autoría; el estudiante no necesita tenerlo ni abrirlo.',
        'Antes de revelar una respuesta, invita al estudiante a localizar una pista.',
        'Acepta respuestas diferentes si se entienden y se sostienen con el cuento.',
        'En preguntas de opinión, acompaña el razonamiento sin calificar la postura personal.'
      ],
      emotionalTip: emotionalTip || 'La historia presenta un vínculo de amistad y un desacuerdo familiar. El objetivo es comprender cómo se construye el relato, no decidir qué personaje tiene la única opinión válida.'
    },
    route: {
      blocks: blocks.length >= 4 ? blocks : [
        { id: 'b1', number: '01', title: 'Abrimos la historia', subtitle: 'Observar el escenario y anticipar', color: 'orange' },
        { id: 'b2', number: '02', title: 'Leemos las pistas', subtitle: 'Ubicar detalles y acciones', color: 'teal' },
        { id: 'b3', number: '03', title: 'Descubrimos el conflicto', subtitle: 'Contrastar las posturas', color: 'yellow' },
        { id: 'b4', number: '04', title: 'Explicamos con evidencia', subtitle: 'Responder, practicar y revisar', color: 'navy' }
      ],
      keyQuestions: keyQuestions,
      dileIntro: dilePaso1 || 'Hoy investigaremos cómo un lugar y las decisiones de los personajes ponen en marcha una historia.',
      dileObjective: dileObjective || 'Al terminar, podrás describir dónde vive Jimmy y explicar por qué él y su padre no piensan igual sobre Robutt.'
    },
    situation: {
      dilePrompt: sitDile || 'Mira el título «El mejor amigo de un muchacho» y la ilustración de la Luna. ¿Qué imaginas sobre el lugar de la historia?',
      expectedAnswer: sitExpected || 'Anticipaciones variadas expresadas como hipótesis.',
      socraticHint: sitHint || '¿Eso aparece en el recurso o lo estás imaginando a partir del título?',
      emotionalTip: emotionalTip || 'Acepta las hipótesis iniciales como parte del proceso de indagación.',
      options: [
        {
          label: 'Formuló una hipótesis basada en el título y la ilustración lunar',
          kind: 'correct',
          feedbackText: '¡Muy bien! Planteaste una anticipación lógica antes de leer.'
        },
        {
          label: 'Mencionó detalles sin conectar con la ambientación lunar',
          kind: 'needs_support',
          feedbackText: 'Observa la ilustración: ¿qué pistas de la Luna y el título te ayudan a imaginar el lugar?'
        },
        {
          label: 'Requiere apoyo inicial o no sabe qué imaginar',
          kind: 'no_answer',
          feedbackText: 'Pensemos en el título: si habla de un muchacho y la Luna, ¿dónde podría ocurrir?'
        }
      ]
    },
    interactive: {
      type: 'reading_resource',
      title: 'Recurso de Lectura Autónomo: El mejor amigo de un muchacho'
    },
    reference: {
      dilePrompt: refDile || 'Lee el recurso que aparece en pantalla. ¿Dónde vive Jimmy? Elige dos detalles que nos ayuden a describir el ambiente.',
      question: refDile || '¿Dónde vive Jimmy y qué dos detalles describen el ambiente?',
      expectedAnswer: refExpected || 'Jimmy vive en una colonia de la Luna. El relato describe un entorno rocoso y árido y señala que no hay oxígeno respirable en el exterior.',
      socraticHint: 'Vuelve al recurso en pantalla: busca el suelo y la condición exterior.',
      feedbackSuccess: refSuccess || 'Encontraste el lugar y usaste detalles del texto para describirlo.',
      feedbackSupport: refSupport || 'Ya ubicamos la Luna. Vuelve al recurso en pantalla: ¿qué detalle describe el suelo y qué condición del exterior hace necesario el traje espacial?'
    },
    hook: {
      title: titleMatch ? titleMatch[1].trim() : 'Jimmy y Robutt: leer el ambiente y descubrir el conflicto',
      dileIntro: 'Hoy descubrirás dónde vive Jimmy y qué desacuerdo comienza entre él y su padre.',
      hazInstruction: 'Observa cada una de las 14 láminas y sigue la locución.',
      videoSrc: '',
      dileAfterVideo: 'Conversemos sobre el ambiente, los personajes y el desacuerdo que presenciaste.',
      slides: slides
    },
    preQuestions: preQuestions,
    formalization: {
      title: 'Del desacuerdo al conflicto',
      concept: formalConcept || 'Un conflicto narrativo aparece cuando una situación o deseos diferentes complican la historia.',
      summary: formalIdea || 'Una interpretación literaria se vuelve más clara cuando explicamos qué evidencia del relato la apoya.',
      ideaClave: formalIdea || 'Una interpretación literaria se vuelve más clara cuando explicamos qué evidencia del relato la apoya.',
      dileIntro: formalDile || '¿Qué hace que el anuncio del padre se convierta en un conflicto para Jimmy?',
      hazInstruction: formalHaz || 'Responde con esta estructura: “El conflicto comienza cuando ___ quiere ___, pero ___ quiere ___; lo noto porque el cuento muestra ___.”',
      videoSrc: '',
      slides: []
    },
    postQuestions: postQuestions,
    practice: practice,
    mini: mini,
    recovery: recovery,
    summaryIdeas: summaryIdeas.length > 0 ? summaryIdeas : [
      ['Ambiente narrativo', 'se describe con detalles que aparecen en el texto.'],
      ['Personajes y acciones', 'ayudan a comprender sus relaciones y cómo avanza el relato.'],
      ['Conflicto', 'se reconoce al comparar lo que los personajes quieren o deciden hacer.']
    ],
    paso8_cierre: {
      preguntaSintesis: preguntaSintesis || '¿Qué dos pistas del cuento usarías para explicar el conflicto entre Jimmy y su padre?',
      metacognicion: metacognicion || '¿Qué te ayudó más a comprender: localizar un detalle, observar una acción o comparar las posturas? ¿Por qué?',
      celebracion: celebracion || '¡Buen trabajo! Encontraste pistas del cuento y las convertiste en una explicación propia.'
    }
  };

  return lessonData;
}

export function executeSync() {
  console.log('=== VERIFICANDO FUENTE LOCAL LECCIONES_POR_REVISAR ===');
  if (!fs.existsSync(REVISAR_FILE)) {
    throw new Error(`Fuente no encontrada: ${REVISAR_FILE}`);
  }

  const content = fs.readFileSync(REVISAR_FILE, 'utf8');
  console.log(`[+] Archivo leído: ${REVISAR_FILE} (${content.length} bytes)`);

  const lesson = parseClase01Lengua(content);

  console.log('\n--- COMPROBACIÓN ESTRUCTURAL ---');
  console.log(`• Título: "${lesson.metadata.lessonTitle}"`);
  console.log(`• Objetivo: "${lesson.prep.adultObjective}"`);
  console.log(`• Láminas (Paso 3): ${lesson.hook.slides?.length} láminas extraídas`);
  console.log(`• Conversaciones (Paso 4): ${lesson.preQuestions.length} conversaciones`);
  console.log(`• Casos práctica (Paso 6): ${lesson.practice.length} casos`);
  console.log(`• Reactivos miniquiz (Paso 7): ${lesson.mini.length} reactivos`);
  console.log(`• Recuperación adaptativa: ${lesson.recovery?.length} ítems`);
  console.log(`• Ideas síntesis: ${lesson.summaryIdeas.length} ideas`);

  // Escribir en módulo TypeScript de la app
  const tsCode = `import { LessonData } from '../../types/lesson';\n\nexport const LENGUA_7B_OA03_CLASE01: LessonData = ${JSON.stringify(lesson, null, 2)};\n`;
  fs.writeFileSync(TS_DEST, tsCode, 'utf8');
  console.log(`\n[✔] Guardado con éxito en: ${TS_DEST}`);
}

executeSync();
