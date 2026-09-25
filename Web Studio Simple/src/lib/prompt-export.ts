import { LessonData as PlayerLessonData } from '../types/lesson';

/**
 * Builds a structured, high-fidelity prompt text file containing the AI video generation
 * prompts (Google Vids / 16:9 Modern Anime) and complete pedagogical script for the mentor.
 */
export function buildLessonPromptText(lesson: PlayerLessonData): string {
  const meta = lesson.metadata;
  let out = `================================================================================\n`;
  out += `STUDIOSIMPLE - GUION MAESTRO Y PROMPTS DE PRODUCCION CON IA\n`;
  out += `================================================================================\n\n`;

  out += `FICHA CURRICULAR:\n`;
  out += `• Asignatura: ${meta.subject}\n`;
  out += `• Nivel / Curso: ${meta.grade}\n`;
  out += `• Objetivo de Aprendizaje: ${meta.oaCode} - ${meta.oaTitle}\n`;
  out += `• Clase: ${meta.lessonNumber} de ${meta.totalLessonsInOa} ("${meta.lessonTitle}")\n`;
  out += `• Duracion Estimada: ${meta.durationMinutes} Minutos\n\n`;

  out += `DIRECTIVAS TECNICAS DE PRODUCCION AUDIOVISUAL:\n`;
  out += `1. Proporcion Widescreen 16:9 estricto (1920x1080).\n`;
  out += `2. Estetica Visual: Anime Moderno (Modern Anime Style, iluminacion cinematografica, fondos detallados, estilo Makoto Shinkai / CoMix Wave).\n`;
  out += `3. Protagonistas: Duo co-protagonico de 13 anos (una joven con trenzas y chaqueta verde y un joven con chaqueta cerceta) explorando y resolviendo el desafio juntos en cada escena.\n`;
  out += `4. Regla Visual Anti-Mascaras: Imagen limpia Full-Bleed con espacio negativo para texto overlay. Prohibido usar placas oscuras que tapen los rostros.\n`;
  out += `5. Locucion Continua (TTS / Google Vids): Cada diapositiva contiene entre 15 y 22 palabras de narracion oral continua, lista para voz en off sin marcas tecnicas.\n\n`;

  out += `================================================================================\n`;
  out += `MODULO 1: PROMPT VIDEO GANCHO MOTIVACIONAL (PASO 2 - 7 DIAPOSITIVAS)\n`;
  out += `================================================================================\n\n`;

  if (lesson.hook.fullPrompt && lesson.hook.fullPrompt.trim().length > 50) {
    out += `${lesson.hook.fullPrompt.trim()}\n\n`;
  } else if (lesson.hook.slides && lesson.hook.slides.length > 0) {
    lesson.hook.slides.forEach((s: any) => {
      out += `--- DIAPOSITIVA ${s.slideNumber || ''} (${s.tituloMomento || ''}) ---\n`;
      out += `• Prompt de Imagen (16:9): ${s.visualPrompt || ''}\n`;
      out += `• Texto en Pantalla (Overlay limpio): ${s.overlayText || ''}\n`;
      out += `• Notas al Orador (Locucion Google Vids): "${s.speakerNotes || ''}"\n\n`;
    });
  } else {
    out += `Titulo: ${lesson.hook.title || lesson.hook.titulo || 'El Desafio Inicial'}\n`;
    out += `• DILE ANTES DEL VIDEO: "${lesson.hook.dileIntro}"\n`;
    out += `• INSTRUCCION AL ESTUDIANTE: "${lesson.hook.hazInstruction}"\n`;
    out += `• DILE DESPUES DEL VIDEO: "${lesson.hook.dileAfterVideo}"\n`;
    if (lesson.hook.focusPoints && lesson.hook.focusPoints.length > 0) {
      out += `• Puntos de foco visual:\n`;
      lesson.hook.focusPoints.forEach((fp, i) => {
        out += `  ${i + 1}. ${fp}\n`;
      });
    }
    out += `\n`;
  }

  out += `================================================================================\n`;
  out += `MODULO 2: PROMPT VIDEO EXPLICATIVO CONCEPTUAL (PASO 4 - 7 DIAPOSITIVAS)\n`;
  out += `================================================================================\n\n`;

  if (lesson.formalization.fullPrompt && lesson.formalization.fullPrompt.trim().length > 50) {
    out += `${lesson.formalization.fullPrompt.trim()}\n\n`;
  } else if (lesson.formalization.slides && lesson.formalization.slides.length > 0) {
    lesson.formalization.slides.forEach((s: any) => {
      out += `--- DIAPOSITIVA ${s.slideNumber || ''} (${s.tituloMomento || ''}) ---\n`;
      out += `• Prompt de Imagen (16:9): ${s.visualPrompt || ''}\n`;
      out += `• Texto en Pantalla (Overlay limpio): ${s.overlayText || ''}\n`;
      out += `• Notas al Orador (Locucion Google Vids): "${s.speakerNotes || ''}"\n\n`;
    });
  } else {
    out += `Titulo: ${lesson.formalization.title || lesson.formalization.concept || 'Formalizacion de la Idea Clave'}\n`;
    out += `• Idea Clave: "${lesson.formalization.ideaClave || ''}"\n`;
    out += `• DILE ANTES DEL VIDEO: "${lesson.formalization.dileIntro}"\n`;
    out += `• INSTRUCCION: "${lesson.formalization.hazInstruction}"\n\n`;
  }

  out += `================================================================================\n`;
  out += `MODULO 3: GUION PEDAGOGICO COMPLETO DEL MENTOR (ETAPA POR ETAPA)\n`;
  out += `================================================================================\n\n`;

  out += `[PREPARACION DEL ADULTO / MENTOR]\n`;
  out += `• Objetivo del Adulto: ${lesson.prep.adultObjective}\n`;
  out += `• Ruta de Hoy: ${lesson.prep.routeToday}\n`;
  if (lesson.prep.reminders && lesson.prep.reminders.length > 0) {
    out += `• Recordatorios Pedagogicos del Mentor:\n`;
    lesson.prep.reminders.forEach((r, i) => {
      out += `  ${i + 1}. ${r}\n`;
    });
  }
  if (lesson.prep.emotionalTip || lesson.situation.emotionalTip) {
    out += `• Clima Emocional y Acogida: "${lesson.prep.emotionalTip || lesson.situation.emotionalTip}"\n`;
  }

  out += `\n--------------------------------------------------------------------------------\n`;
  out += `[PASO 1: INICIO (4 SUB-ETAPAS CANONICAS)]\n`;
  out += `--------------------------------------------------------------------------------\n`;
  out += `Sub-etapa 1: Nuestra Ruta de la Asignatura\n`;
  out += `• DILE AL ESTUDIANTE (Apertura de la ruta): "${lesson.route.dileIntro}"\n`;
  if (lesson.route.blocks && lesson.route.blocks.length > 0) {
    out += `• 4 Bloques Tematicos de la Asignatura:\n`;
    lesson.route.blocks.forEach((b) => {
      out += `  Bloque ${b.number}: ${b.title} (${b.subtitle})\n`;
    });
  }

  out += `\nSub-etapa 2: La Clase de Hoy\n`;
  out += `• DILE AL ESTUDIANTE (Foco didactico): "${lesson.route.dileObjective}"\n`;
  if (lesson.route.keyQuestions && lesson.route.keyQuestions.length > 0) {
    out += `• 3 Tarjetas de Foco de la Pantalla del Estudiante:\n`;
    lesson.route.keyQuestions.forEach((kq, i) => {
      out += `  Tarjeta ${i + 1}: ${kq.label} -> ${kq.sub}\n`;
    });
  }

  out += `\nSub-etapa 3: Situacion Inicial de Exploracion (Detonante)\n`;
  out += `• DILE AL ESTUDIANTE (Situacion detonante): "${lesson.situation.dilePrompt}"\n`;
  out += `• RESPUESTA ESPERADA: ${lesson.situation.expectedAnswer}\n`;
  out += `• PISTA SOCRATICA (SOLO PARA TI): "${lesson.situation.socraticHint}"\n`;
  if (lesson.situation.emotionalTip) {
    out += `• CLIMA EMOCIONAL: "${lesson.situation.emotionalTip}"\n`;
  }
  if (lesson.situation.options && lesson.situation.options.length > 0) {
    out += `• Pautas de Evaluacion Formativa del Mentor:\n`;
    lesson.situation.options.forEach((opt) => {
      out += `  - [${opt.kind === 'correct' ? 'Acierto' : 'Requiere Apoyo'}] ${opt.label} -> Feedback: "${opt.feedbackText}"\n`;
    });
  }

  if (lesson.reference) {
    out += `\nSub-etapa 4: Comprendamos la Respuesta (Punto de Referencia)\n`;
    out += `• DILE AL ESTUDIANTE (Formalizacion de referencia): "${lesson.reference.dilePrompt}"\n`;
    out += `• PREGUNTALE AL ESTUDIANTE: "${lesson.reference.question}"\n`;
    out += `• RESPUESTA ESPERADA: ${lesson.reference.expectedAnswer}\n`;
    out += `• PISTA SOCRATICA: "${lesson.reference.socraticHint}"\n`;
    if (lesson.reference.feedbackSuccess) {
      out += `• FEEDBACK SI ACIERTA: "${lesson.reference.feedbackSuccess}"\n`;
    }
    if (lesson.reference.feedbackSupport) {
      out += `• FEEDBACK SI NECESITA APOYO: "${lesson.reference.feedbackSupport}"\n`;
    }
  }

  out += `\n--------------------------------------------------------------------------------\n`;
  out += `[PASO 3: RECORRIDO - CONVERSACION GUIADA Y PREGUNTAS SOCRATICAS]\n`;
  out += `--------------------------------------------------------------------------------\n`;
  if (lesson.conversationContext) {
    out += `• Contexto de Apertura Socratica: "${lesson.conversationContext}"\n\n`;
  }
  lesson.preQuestions.forEach((q, i) => {
    out += `Item ${i + 1} (${q.context}):\n`;
    out += `• Pregunta Socratica: "${q.question}"\n`;
    out += `• Respuesta Esperada: ${q.expected}\n`;
    out += `• Feedback de Exito: "${q.success}"\n`;
    out += `• Pista de Apoyo Socratica: "${q.support}"\n`;
    out += `• Revelacion: "${q.reveal}"\n\n`;
  });

  if (lesson.summaryText || (lesson.postQuestions && lesson.postQuestions.length > 0)) {
    out += `--------------------------------------------------------------------------------\n`;
    out += `[PASO 4B: COMPROBEMOS LO APRENDIDO (POST-VIDEO EXPLICATIVO)]\n`;
    out += `--------------------------------------------------------------------------------\n`;
    if (lesson.summaryText) {
      out += `• Cierre y Sintesis del Video Explicativo: "${lesson.summaryText}"\n\n`;
    }
    if (lesson.postQuestions && lesson.postQuestions.length > 0) {
      lesson.postQuestions.forEach((pq, i) => {
        out += `Comprobacion ${i + 1} (${pq.context}):\n`;
        out += `• Pregunta: "${pq.question}"\n`;
        out += `• Respuesta Esperada: ${pq.expected}\n`;
        out += `• Pista de Apoyo: "${pq.support || ''}"\n`;
        out += `• Revelacion: "${pq.studentReveal || pq.reveal || ''}"\n\n`;
      });
    }
  }

  out += `--------------------------------------------------------------------------------\n`;
  out += `[PASO 5: PRACTICA EN EL CUADERNO FISICO]\n`;
  out += `--------------------------------------------------------------------------------\n`;
  lesson.practice.forEach((p, i) => {
    out += `Ejercicio ${i + 1} (${p.context}):\n`;
    out += `• Enunciado de Aplicacion: "${p.question}"\n`;
    out += `• Respuesta Esperada: ${p.expected}\n`;
    out += `• Feedback de Exito: "${p.success}"\n`;
    out += `• Pista de Apoyo Socratica: "${p.support}"\n\n`;
  });

  if (lesson.reasoning) {
    out += `Modulo: Comparemos dos situaciones (${lesson.reasoning.title || 'Razonamiento'})\n`;
    if (lesson.reasoning.dileIntro) {
      out += `• DILE: "${lesson.reasoning.dileIntro}"\n`;
    }
    out += `• Pregunta: "${lesson.reasoning.question}"\n`;
    out += `• Respuesta Esperada: ${lesson.reasoning.expectedAnswer || ''}\n`;
    if (lesson.reasoning.successFeedback) {
      out += `• Feedback si acierta: "${lesson.reasoning.successFeedback}"\n`;
    }
    if (lesson.reasoning.supportFeedback) {
      out += `• Feedback si necesita apoyo: "${lesson.reasoning.supportFeedback}"\n`;
    }
    out += `\n`;
  }

  if (lesson.challenge) {
    out += `Modulo: Desafio Breve (${lesson.challenge.title || 'Desafio'})\n`;
    out += `• Pregunta: "${lesson.challenge.question}"\n`;
    out += `• Respuesta Esperada: ${lesson.challenge.expectedAnswer || ''}\n\n`;
  }

  out += `--------------------------------------------------------------------------------\n`;
  out += `[PASO 6: RESUMEN Y ESTRATEGIA DE PENSAMIENTO]\n`;
  out += `--------------------------------------------------------------------------------\n`;
  out += `• Idea Clave: "${lesson.formalization.ideaClave || ''}"\n`;
  if (lesson.strategy) {
    if (lesson.strategy.dileIntro) {
      out += `• DILE AL ESTUDIANTE: "${lesson.strategy.dileIntro}"\n`;
    }
    if (lesson.strategy.steps && lesson.strategy.steps.length > 0) {
      out += `• Pasos de la Estrategia:\n`;
      lesson.strategy.steps.forEach((s) => {
        out += `  Paso ${s.number}: ${s.title} -> ${s.desc}\n`;
      });
    }
  }
  if (lesson.summaryIdeas && lesson.summaryIdeas.length > 0) {
    out += `• 3 Ideas Clave Estructuradas de Sintesis:\n`;
    lesson.summaryIdeas.forEach((si) => {
      out += `  - ${si[0]}: ${si[1]}\n`;
    });
  }

  out += `\n--------------------------------------------------------------------------------\n`;
  out += `[PASO 7: MINIQUIZ FORMATIVO Y FASE REVISAR]\n`;
  out += `--------------------------------------------------------------------------------\n`;
  lesson.mini.forEach((m, i) => {
    out += `Pregunta ${i + 1}: ${m.q}\n`;
    m.options.forEach((opt, oi) => {
      out += `  ${String.fromCharCode(65 + oi)}) ${opt} ${opt === m.correct ? '[CORRECTA]' : ''}\n`;
    });
    out += `• Explicacion Formativa del Error: "${m.fixExplain}"\n`;
    if (m.dileReview) {
      out += `• Guion del Mentor (Fase REVISAR): "${m.dileReview}"\n`;
    }
    out += `\n`;
  });

  if (lesson.recovery && lesson.recovery.length > 0) {
    out += `--------------------------------------------------------------------------------\n`;
    out += `[PASO 7B: MODULO DE RECUPERACION FORMATIVA]\n`;
    out += `--------------------------------------------------------------------------------\n`;
    lesson.recovery.forEach((r, i) => {
      out += `Refuerzo ${i + 1} (${r.title}):\n`;
      out += `• Explicacion Previa: "${r.explain}"\n`;
      out += `• Pregunta: "${r.q}"\n`;
      out += `• Opciones: ${r.options.join(' | ')}\n`;
      out += `• Respuesta Correcta: ${r.correct}\n`;
      out += `• Refuerzo si falla: "${r.fixText}"\n\n`;
    });
  }

  out += `--------------------------------------------------------------------------------\n`;
  out += `[PASO 8: CIERRE METACOGNITIVO Y CELEBRACION]\n`;
  out += `--------------------------------------------------------------------------------\n`;
  out += `• Felicitacion Final: "${lesson.closure?.congratulations || ''}"\n`;
  out += `• Vista Previa Proxima Clase: "${lesson.closure?.nextClassPreview || ''}"\n`;

  return out;
}

/**
 * Trigger immediate browser download of the prompt text file
 */
export function downloadLessonPromptFile(lesson: PlayerLessonData): void {
  const content = buildLessonPromptText(lesson);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  const cleanSubject = lesson.metadata.subject.replace(/[^a-zA-Z0-9]/g, '_');
  const cleanGrade = lesson.metadata.grade.replace(/[^a-zA-Z0-9]/g, '_');
  const cleanOa = lesson.metadata.oaCode.replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `StudioSimple_Prompt_${cleanSubject}_${cleanGrade}_${cleanOa}_Clase0${lesson.metadata.lessonNumber}.txt`;

  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
