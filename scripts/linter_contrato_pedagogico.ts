import fs from 'fs';
import path from 'path';

export type DiscrepancyCategory =
  | '1_FALTA_CONTENIDO_EN_FUENTE'
  | '2_APP_NO_SOPORTA_FUNCION'
  | '3_PARSER_O_ADAPTADOR_PIERDE_INFO'
  | '4_PENDIENTE_VIDEO_A_CARGO_WALTER'
  | '5_FALTA_ESTIMULO_INDISPENSABLE';

export interface StructuredDiscrepancy {
  archivo_clase_version: string;
  campo_afectado: string;
  contenido_recibido: string;
  requisito_esperado: string;
  impacto: string;
  categoria_oficial: DiscrepancyCategory;
  accion_necesaria: string;
}

export interface LintReportItem {
  filePath: string;
  lessonId: string;
  version: string;
  isAptaParaInyeccion: boolean;
  videoStatus: 'VINCULADO' | 'PENDIENTE_VIDEO_A_CARGO_WALTER';
  passedChecks: string[];
  discrepancies: StructuredDiscrepancy[];
}

/**
 * Linter oficial del Contrato de Sincronización Pedagógica Work <-> Antigravity (Contrato v1.0)
 * Puede validar tanto archivos Markdown fuentes (.md) como módulos TypeScript generados (.ts).
 */
export function lintPedagogicalLesson(filePath: string, content: string): LintReportItem {
  const isTs = filePath.endsWith('.ts');
  const discrepancies: StructuredDiscrepancy[] = [];
  const passedChecks: string[] = [];

  const filename = path.basename(filePath);
  const relPath = filePath.replace(/\\/g, '/');

  let versionStr = 'v1.0';
  const versionMatch = content.match(/\*\*Fecha y hora de versión:\*\*\s*([^\n]+)/i);
  if (versionMatch) versionStr = versionMatch[1].trim();

  let videoStatus: 'VINCULADO' | 'PENDIENTE_VIDEO_A_CARGO_WALTER' = 'PENDIENTE_VIDEO_A_CARGO_WALTER';

  if (isTs) {
    // -----------------------------------------------------------------
    // VALIDACIÓN DE MÓDULO TYPESCRIPT (STAGING)
    // -----------------------------------------------------------------
    const match = content.match(/=\s*(\{[\s\S]*\});?\s*$/);
    if (!match) {
      discrepancies.push({
        archivo_clase_version: `${relPath} (${versionStr})`,
        campo_afectado: 'modulo_completo',
        contenido_recibido: 'Sintaxis TypeScript no interpretable',
        requisito_esperado: 'Objeto de lección exportado como objeto JS/TS válido',
        impacto: 'La lección no puede ser parseada por el motor de la App',
        categoria_oficial: '3_PARSER_O_ADAPTADOR_PIERDE_INFO',
        accion_necesaria: 'Regenerar módulo TypeScript asegurando sintaxis válida.'
      });
      return {
        filePath,
        lessonId: filename,
        version: versionStr,
        isAptaParaInyeccion: false,
        videoStatus,
        passedChecks,
        discrepancies
      };
    }

    try {
      const data = JSON.parse(match[1]);

      // 1. Metadata y Objetivo (puede estar en prep.adultObjective o adultObjective)
      const adultObj = data.prep?.adultObjective || data.adultObjective;
      if (data.metadata?.lessonTitle && adultObj && adultObj.trim().length > 5) {
        passedChecks.push('Paso 1: Preparación y Objetivo redactado real');
      } else {
        discrepancies.push({
          archivo_clase_version: `${relPath} (${versionStr})`,
          campo_afectado: 'prep.adultObjective',
          contenido_recibido: adultObj || '[Vacío]',
          requisito_esperado: 'Objetivo pedagógico redactado real para el adulto',
          impacto: 'El apoderado/mentor no cuenta con la directriz pedagógica de la sesión',
          categoria_oficial: '1_FALTA_CONTENIDO_EN_FUENTE',
          accion_necesaria: 'Redactar el objetivo de aprendizaje específico de la clase en la fuente.'
        });
      }

      // 2. Ruta de hoy (puede estar en prep.routeToday, todayRoute o route.blocks)
      const route = data.prep?.routeToday || data.todayRoute || (Array.isArray(data.route?.blocks) && data.route.blocks.length > 0 ? 'Ruta en bloques' : null);
      if (route) {
        passedChecks.push('Paso 2: Ruta de 4 momentos definida');
      } else {
        discrepancies.push({
          archivo_clase_version: `${relPath} (${versionStr})`,
          campo_afectado: 'prep.routeToday',
          contenido_recibido: '[Vacío]',
          requisito_esperado: 'Ruta de aprendizaje comunicable al estudiante',
          impacto: 'Falta mapa mental de la sesión para el alumno',
          categoria_oficial: '1_FALTA_CONTENIDO_EN_FUENTE',
          accion_necesaria: 'Definir la ruta de 4 momentos en la fuente.'
        });
      }

      // 3. Conversación guiada (preQuestions)
      if (Array.isArray(data.preQuestions) && data.preQuestions.length >= 2) {
        passedChecks.push(`Paso 4: Conversación guiada (${data.preQuestions.length} preguntas socráticas)`);
      } else {
        discrepancies.push({
          archivo_clase_version: `${relPath} (${versionStr})`,
          campo_afectado: 'preQuestions',
          contenido_recibido: `${data.preQuestions?.length || 0} preguntas`,
          requisito_esperado: 'Mínimo 2 preguntas socráticas de diálogo previo',
          impacto: 'No se activa el diálogo inicial entre apoderado y estudiante',
          categoria_oficial: '1_FALTA_CONTENIDO_EN_FUENTE',
          accion_necesaria: 'Incorporar al menos 2 preguntas de conversación guiada en la fuente.'
        });
      }

      // 4. Guion Audiovisual Bimodal (14 Láminas: 7 Motivación + 7 Explicación o 7 Motivación para LYL01)
      const hookSlides = data.hook?.slides || [];
      const formalSlides = data.formalization?.slides || [];
      const totalSlides = hookSlides.length + formalSlides.length;

      const isLyl01 = filename.includes('lengua_7b_oa03_clase01');
      const isCompliantSlides = (hookSlides.length === 7 && formalSlides.length === 7) ||
                                (isLyl01 && hookSlides.length === 7);

      if (isCompliantSlides) {
        passedChecks.push(`Paso 5: Estructura bimodal de láminas (${hookSlides.length} Motivación + ${formalSlides.length} Explicación)`);
      } else {
        discrepancies.push({
          archivo_clase_version: `${relPath} (${versionStr})`,
          campo_afectado: 'hook.slides / formalization.slides',
          contenido_recibido: `${hookSlides.length} Motivación + ${formalSlides.length} Explicación (Total: ${totalSlides})`,
          requisito_esperado: 'Exactamente 14 láminas bimodales (7 de Motivación y 7 de Explicación) o 7 canónicas protegidas',
          impacto: 'Desajuste bimodal respecto al estándar psicopedagógico de 7° básico',
          categoria_oficial: '3_PARSER_O_ADAPTADOR_PIERDE_INFO',
          accion_necesaria: 'Calibrar extracción para preservar 7 láminas en hook y 7 en formalization.'
        });
      }

      // Verificación de Videos
      const hasHookVideo = (data.hook?.videoUrl && typeof data.hook.videoUrl === 'string' && data.hook.videoUrl.trim().length > 0) ||
                           (data.formalization?.videoSrc && typeof data.formalization.videoSrc === 'string' && data.formalization.videoSrc.trim().length > 0);

      if (hasHookVideo) {
        videoStatus = 'VINCULADO';
        passedChecks.push('Videos: Archivos o enlaces de video vinculados');
      } else {
        videoStatus = 'PENDIENTE_VIDEO_A_CARGO_WALTER';
        passedChecks.push('Videos: Registrado estado PENDIENTE_VIDEO_A_CARGO_WALTER (producción en Google Vids a cargo de Walter)');
      }

      // 5. Comprobación rápida (postQuestions)
      if (Array.isArray(data.postQuestions) && data.postQuestions.length >= 1) {
        passedChecks.push(`Paso 5B: Comprobación rápida (${data.postQuestions.length} pregunta(s))`);
      } else {
        discrepancies.push({
          archivo_clase_version: `${relPath} (${versionStr})`,
          campo_afectado: 'postQuestions',
          contenido_recibido: `${data.postQuestions?.length || 0} preguntas`,
          requisito_esperado: 'Mínimo 1 pregunta de comprobación tras el video',
          impacto: 'No se verifica la comprensión inmediata del video explicativo',
          categoria_oficial: '1_FALTA_CONTENIDO_EN_FUENTE',
          accion_necesaria: 'Redactar preguntas de comprobación con consigna para el adulto.'
        });
      }

      // 6. Práctica guiada (practice)
      if (Array.isArray(data.practice) && data.practice.length >= 1) {
        const hasValidTasks = data.practice.every((p: any) => p.question && p.question.trim().length > 0);
        if (hasValidTasks) {
          passedChecks.push(`Paso 6: Práctica guiada (${data.practice.length} actividades para cuaderno)`);
        } else {
          discrepancies.push({
            archivo_clase_version: `${relPath} (${versionStr})`,
            campo_afectado: 'practice.question',
            contenido_recibido: 'Actividades con consigna vacía',
            requisito_esperado: 'Consignas claras para ejecución en el cuaderno físico',
            impacto: 'El alumno no puede desarrollar la actividad análoga',
            categoria_oficial: '5_FALTA_ESTIMULO_INDISPENSABLE',
            accion_necesaria: 'Completar enunciado y consigna explícita de práctica en la fuente.'
          });
        }
      } else {
        discrepancies.push({
          archivo_clase_version: `${relPath} (${versionStr})`,
          campo_afectado: 'practice',
          contenido_recibido: `${data.practice?.length || 0} actividades`,
          requisito_esperado: 'Mínimo 1 actividad guiada para cuaderno físico',
          impacto: 'Omisión del puente análogo-digital en la sesión',
          categoria_oficial: '1_FALTA_CONTENIDO_EN_FUENTE',
          accion_necesaria: 'Estructurar actividades de práctica guiada en la fuente.'
        });
      }

      // 7. Miniquiz psicométrico formal (3 reactivos, 4 opciones, claves)
      if (Array.isArray(data.mini) && data.mini.length === 3) {
        const all4Options = data.mini.every((m: any) => Array.isArray(m.options) && m.options.length === 4);
        const allValidKeys = data.mini.every((m: any) => typeof m.correct === 'string' && m.correct.trim().length > 0 && !m.correct.includes('Clave privada:'));

        if (all4Options && allValidKeys) {
          passedChecks.push('Paso 7: Miniquiz psicométrico de 3 reactivos con 4 alternativas y claves');
        } else {
          discrepancies.push({
            archivo_clase_version: `${relPath} (${versionStr})`,
            campo_afectado: 'mini[].options / mini[].correct',
            contenido_recibido: `4 opciones: ${all4Options}, claves limpias: ${allValidKeys}`,
            requisito_esperado: '3 reactivos con 4 alternativas cada uno y clave de respuesta [A-D] limpia',
            impacto: 'Falla psicométrica en el instrumento de evaluación formativa',
            categoria_oficial: '1_FALTA_CONTENIDO_EN_FUENTE',
            accion_necesaria: 'Completar 4 opciones estándar y clave privada explícita en la fuente.'
          });
        }
      } else {
        discrepancies.push({
          archivo_clase_version: `${relPath} (${versionStr})`,
          campo_afectado: 'mini',
          contenido_recibido: `${data.mini?.length || 0} reactivos`,
          requisito_esperado: 'Exactamente 3 reactivos psicométricos',
          impacto: 'El miniquiz no cumple la métrica estándar de evaluación',
          categoria_oficial: '1_FALTA_CONTENIDO_EN_FUENTE',
          accion_necesaria: 'Redactar los 3 reactivos psicométricos en la fuente.'
        });
      }

      // 8. Recuperación Formativa tipada
      if (Array.isArray(data.recovery) && data.recovery.length >= 1) {
        const validKinds = data.recovery.every((r: any) => r.kind === 'open_response' || r.kind === 'multiple_choice');
        if (validKinds) {
          passedChecks.push(`Paso 7B: Recuperación formativa calibrada (${data.recovery.length} refuerzos tipados)`);
        } else {
          discrepancies.push({
            archivo_clase_version: `${relPath} (${versionStr})`,
            campo_afectado: 'recovery.kind',
            contenido_recibido: 'Modalidad no tipada o ausente',
            requisito_esperado: 'Modalidad explícita: open_response (cuaderno) o multiple_choice',
            impacto: 'Riesgo de botones de respuesta falsos en la pantalla del estudiante',
            categoria_oficial: '3_PARSER_O_ADAPTADOR_PIERDE_INFO',
            accion_necesaria: 'Mapear kind="open_response" o kind="multiple_choice" en el adaptador.'
          });
        }
      } else {
        discrepancies.push({
          archivo_clase_version: `${relPath} (${versionStr})`,
          campo_afectado: 'recovery',
          contenido_recibido: `${data.recovery?.length || 0} refuerzos`,
          requisito_esperado: 'Mínimo 1 módulo de recuperación formativa',
          impacto: 'Falta andamiaje de rescate para estudiantes con aciertos < 2/3',
          categoria_oficial: '1_FALTA_CONTENIDO_EN_FUENTE',
          accion_necesaria: 'Redactar refuerzos formativos diferenciados en la fuente.'
        });
      }

      // 9. Cierre metacognitivo
      if (data.closure) {
        passedChecks.push('Paso 8: Cierre metacognitivo y celebración');
      } else {
        discrepancies.push({
          archivo_clase_version: `${relPath} (${versionStr})`,
          campo_afectado: 'closure',
          contenido_recibido: '[Vacío]',
          requisito_esperado: 'Cierre con síntesis, metacognición y celebración',
          impacto: 'La clase carece de cierre pedagógico reflexivo',
          categoria_oficial: '1_FALTA_CONTENIDO_EN_FUENTE',
          accion_necesaria: 'Redactar síntesis y preguntas metacognitivas en la fuente.'
        });
      }

    } catch (e: any) {
      discrepancies.push({
        archivo_clase_version: `${relPath} (${versionStr})`,
        campo_afectado: 'parse_error',
        contenido_recibido: e.message,
        requisito_esperado: 'Objeto JS válido sin errores sintácticos',
        impacto: 'Error de parseo del módulo',
        categoria_oficial: '3_PARSER_O_ADAPTADOR_PIERDE_INFO',
        accion_necesaria: 'Corregir sintaxis del módulo TypeScript.'
      });
    }

  } else {
    // -----------------------------------------------------------------
    // VALIDACIÓN DE FUENTE MARKDOWN (WORK)
    // -----------------------------------------------------------------
    const text = content.replace(/\r\n/g, '\n');

    // 1. Paso 1: Preparación del adulto y objetivo
    // 1. Paso 1: Preparación del adulto y objetivo
    const hasStep1 = /(?:##\s*(?:\d+\.\s*)?(?:Paso\s*1|Step\s*1|Preparaci[óo]n|Mentor preparation))/i.test(text);
    const objMatch = text.match(/(?:###\s*(?:Objetivo|Class objective|Official learning objective)|\*\*(?:Objetivo de la clase|Objetivo|Objective)[^*]*:\*\*)\s*\n*([^\n]+)/i);

    if (hasStep1 && objMatch && objMatch[1].trim().length > 5) {
      passedChecks.push('Paso 1: Preparación y Objetivo redactado');
    } else {
      discrepancies.push({
        archivo_clase_version: `${relPath} (${versionStr})`,
        campo_afectado: 'adultObjective',
        contenido_recibido: objMatch ? objMatch[1].trim() : '[No detectado]',
        requisito_esperado: 'Objetivo de clase explícito y redactado para el mentor',
        impacto: 'Falta horizonte pedagógico en la preparación del adulto',
        categoria_oficial: '1_FALTA_CONTENIDO_EN_FUENTE',
        accion_necesaria: 'Redactar "### Objetivo de aprendizaje de la clase" en la fuente.'
      });
    }

    // 2. Paso 2 o Ruta
    const hasStep2 = /(?:##\s*(?:\d+\.\s*)?(?:Paso\s*2|Step\s*2|Ruta|Punto|Opening situation|Learning route))/i.test(text);
    if (hasStep2) {
      passedChecks.push('Paso 2: Ruta o punto de activación');
    } else {
      discrepancies.push({
        archivo_clase_version: `${relPath} (${versionStr})`,
        campo_afectado: 'todayRoute',
        contenido_recibido: '[No detectado]',
        requisito_esperado: 'Definición de ruta o activación pedagógica',
        impacto: 'Falta orientación inicial para el estudiante',
        categoria_oficial: '1_FALTA_CONTENIDO_EN_FUENTE',
        accion_necesaria: 'Incorporar ruta de 4 momentos en la fuente.'
      });
    }

    // 3. Conversación guiada
    const convMatches = text.match(/(?:###\s*(?:Conversación|Pregunta|Question)\s*\d+|\*\*(?:DILE|PREGÚNTALE|Pregunta|Question|Ask|SAY)[^*]*:\*\*)/gi);
    if (convMatches && convMatches.length >= 2) {
      passedChecks.push(`Paso 4: Conversación guiada (${convMatches.length} preguntas socráticas)`);
    } else {
      discrepancies.push({
        archivo_clase_version: `${relPath} (${versionStr})`,
        campo_afectado: 'preQuestions',
        contenido_recibido: `${convMatches?.length || 0} preguntas`,
        requisito_esperado: 'Mínimo 2 preguntas socráticas para el diálogo adulto-estudiante',
        impacto: 'Omisión del diálogo guiado previo a la formalización',
        categoria_oficial: '1_FALTA_CONTENIDO_EN_FUENTE',
        accion_necesaria: 'Redactar al menos 2 preguntas socráticas de conversación guiada.'
      });
    }

    // 4. Guion audiovisual (14 láminas o 7 protegidas)
    const slideMatches = text.match(/(?:[#]{3,4}\s*(?:Lámina|Slide|Diapositiva)\s*0?\d+)/gi);
    const slideCount = slideMatches ? slideMatches.length : 0;
    const isLyl01 = filename.includes('Lengua_Literatura') && filename.includes('CLASE01');

    if (slideCount >= 14 || (isLyl01 && slideCount >= 7) || text.includes('recurso audiovisual protegido') || text.includes('PPTX')) {
      passedChecks.push(`Paso 5: Guion audiovisual (${slideCount} láminas reales identificadas)`);
    } else {
      discrepancies.push({
        archivo_clase_version: `${relPath} (${versionStr})`,
        campo_afectado: 'slides',
        contenido_recibido: `${slideCount} láminas`,
        requisito_esperado: '14 láminas bimodales (7 Motivación + 7 Explicación) o guion canónico protegido',
        impacto: 'Incompletitud audiovisual respecto al estándar de 7° básico',
        categoria_oficial: '1_FALTA_CONTENIDO_EN_FUENTE',
        accion_necesaria: 'Completar las láminas con propósitos, notas de locución y prompts de arte.'
      });
    }

    // Verificación de Videos
    videoStatus = 'PENDIENTE_VIDEO_A_CARGO_WALTER';
    passedChecks.push('Videos: Registrado estado PENDIENTE_VIDEO_A_CARGO_WALTER (producción en Google Vids a cargo de Walter)');

    // 5. Miniquiz psicométrico
    const miniItems = text.match(/(?:###\s*(?:Reactivo|Item|Pregunta)\s*\d+|\*\*Reactivo\s*\d+:)/gi);
    const keyMatches = text.match(/\*\*Clave privada:\*\*\s*([A-D])/gi);
    const correctMarks = text.match(/\b(?:Correcta|Correct|✅)\b/gi);

    const has3Items = miniItems && miniItems.length >= 3;
    const has3Keys = (keyMatches && keyMatches.length >= 3) || (correctMarks && correctMarks.length >= 3);

    if (has3Items && has3Keys) {
      passedChecks.push('Paso 7: Miniquiz psicométrico formal con claves verificadas');
    } else {
      discrepancies.push({
        archivo_clase_version: `${relPath} (${versionStr})`,
        campo_afectado: 'miniquiz',
        contenido_recibido: `Reactivos: ${miniItems?.length || 0}, Claves: ${keyMatches?.length || correctMarks?.length || 0}`,
        requisito_esperado: '3 reactivos psicométricos con 4 alternativas y sus claves privadas explícitas',
        impacto: 'Instrumento formativo incompleto o no psicométrico',
        categoria_oficial: '1_FALTA_CONTENIDO_EN_FUENTE',
        accion_necesaria: 'Redactar 3 reactivos con opciones - A. a - D. y "**Clave privada:** [A-D]".'
      });
    }

    // 6. Cierre
    const hasClosure = /(?:##\s*(?:\d+\.\s*)?(?:Paso\s*8|Step\s*8|CIERRE|Cierre|S[íi]ntesis|Synthesis|Closure|Closing|Summary))/i.test(text);
    if (hasClosure) {
      passedChecks.push('Paso 8: Cierre y síntesis');
    } else {
      discrepancies.push({
        archivo_clase_version: `${relPath} (${versionStr})`,
        campo_afectado: 'closure',
        contenido_recibido: '[No detectado]',
        requisito_esperado: 'Sección de cierre y síntesis',
        impacto: 'Falta momento de cierre y metacognición',
        categoria_oficial: '1_FALTA_CONTENIDO_EN_FUENTE',
        accion_necesaria: 'Incorporar sección de cierre con ideas de síntesis y celebración.'
      });
    }
  }

  // Criterio de Aptitud: Solo se declara NO apta si hay discrepancias de categorías 1, 2, 3 o 5.
  // La categoría 4 (PENDIENTE_VIDEO_A_CARGO_WALTER) NUNCA bloquea la aptitud.
  const blockingDiscrepancies = discrepancies.filter(d => d.categoria_oficial !== '4_PENDIENTE_VIDEO_A_CARGO_WALTER');
  const isAptaParaInyeccion = blockingDiscrepancies.length === 0;

  return {
    filePath,
    lessonId: filename,
    version: versionStr,
    isAptaParaInyeccion,
    videoStatus,
    passedChecks,
    discrepancies: blockingDiscrepancies
  };
}

// ---------------------------------------------------------------------
// EJECUCIÓN CLI
// ---------------------------------------------------------------------
if (process.argv[1] && process.argv[1].includes('linter_contrato_pedagogico')) {
  const targetPath = process.argv[2] || 'staging_preparacion_aislada/lessons';
  const resolvedTarget = path.resolve(targetPath);

  console.log('================================================================');
  console.log('🔍 LINTER DE CONTRATO PEDAGÓGICO PRE-INYECCIÓN (WORK <-> ANTIGRAVITY)');
  console.log(`   Versión del Contrato: Contrato v1.0 (Oficial)`);
  console.log(`   Ruta analizada: ${resolvedTarget}`);
  console.log('================================================================\n');

  const filesToScan: string[] = [];
  function scan(p: string) {
    if (!fs.existsSync(p)) return;
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      fs.readdirSync(p).forEach(c => scan(path.join(p, c)));
    } else if (stat.isFile() && (p.endsWith('.ts') || p.endsWith('.md'))) {
      if (!p.endsWith('index.ts') && !p.endsWith('manifest.json')) {
        filesToScan.push(p);
      }
    }
  }
  scan(resolvedTarget);
  filesToScan.sort();

  let aptasCount = 0;
  const allDiscrepancies: StructuredDiscrepancy[] = [];

  for (const f of filesToScan) {
    const raw = fs.readFileSync(f, 'utf8');
    const res = lintPedagogicalLesson(f, raw);

    if (res.isAptaParaInyeccion) {
      aptasCount++;
      const videoTag = res.videoStatus === 'PENDIENTE_VIDEO_A_CARGO_WALTER'
        ? ' [VIDEO: PENDIENTE_VIDEO_A_CARGO_WALTER]'
        : ' [VIDEO: VINCULADO]';
      console.log(`  ✓ [APTA PARA INYECCIÓN] ${res.lessonId}${videoTag}`);
    } else {
      console.log(`  ❌ [REQUIERE AJUSTES] ${res.lessonId} (${res.discrepancies.length} discrepancias)`);
      for (const d of res.discrepancies) {
        console.log(`     - [${d.categoria_oficial}] Campo: ${d.campo_afectado}`);
        console.log(`       Recibido: "${d.contenido_recibido}" | Esperado: "${d.requisito_esperado}"`);
        console.log(`       Impacto: ${d.impacto}`);
        console.log(`       Acción necesaria: ${d.accion_necesaria}`);
        allDiscrepancies.push(d);
      }
    }
  }

  console.log('\n================================================================');
  console.log(`📊 BALANCE DE APTITUD TÉCNICA (CONTRATO v1.0):`);
  console.log(`   Total lecciones auditadas: ${filesToScan.length}`);
  console.log(`   Lecciones APTAS PARA INYECCIÓN: ${aptasCount}`);
  console.log(`   Lecciones con discrepancias bloqueantes: ${filesToScan.length - aptasCount}`);
  console.log('================================================================\n');

  if (allDiscrepancies.length > 0) {
    console.log(`⚠️ Se identificaron ${allDiscrepancies.length} discrepancias bloqueantes para Work/Antigravity.`);
    process.exit(1);
  } else {
    console.log(`✅ CERTIFICACIÓN EXITOSA: 100% de las clases cumplen el Contrato Pedagógico Universal.`);
    process.exit(0);
  }
}
