import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  ShadingType
} from "docx";
import { GeneratedOAPackage, LessonData as GeneratorLessonData } from "./lesson-generator";
import { LessonData as PlayerLessonData } from "../types/lesson";
import { adaptPlayerLessonToGenerator } from "./lesson-adapter";

export function buildOAPackageDocx(pkg: GeneratedOAPackage): Document {
  const { oa, totalLessons, lessons } = pkg;
  const isCiencias = (oa.asignatura || '').toLowerCase().includes('cien');
  const subPt = isCiencias ? 48 : 36;

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134, // ~2.0 cm
              bottom: 1134,
              left: 1134,
              right: 1134
            }
          }
        },
        children: [
          // ==================== PORTADA ====================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 800, after: 200 },
            children: [
              new TextRun({
                text: "STUDIOSIMPLE - ECOSISTEMA EDUCATIVO",
                bold: true,
                size: 32,
                color: "1E293B",
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: `PLAN MAESTRO DE LECCIONES Y GUIONES AUDIOVISUALES\n${oa.asignatura.toUpperCase()} : ${oa.curso.toUpperCase()} : ${oa.oa}`,
                bold: true,
                size: 24,
                color: "0D9488",
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
            children: [
              new TextRun({
                text: `Desglose Instruccional en ${totalLessons} Lecciones de 30 Minutos (8 Pasos Pedagógicos Oficiales)\nIncluye Enlaces a Videos en Cloudflare R2, Prompts Anime Moderno 16:9 y Ficha Técnica de Aula\nFecha de Actualización Oficial: ${new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" })} (America/Santiago)`,
                italics: true,
                size: 20,
                color: "64748B",
                font: "Calibri"
              })
            ]
          }),

          // ==================== FICHA DE CONTROL ====================
          new Paragraph({
            text: `1. Ficha de Control Curricular del ${oa.oa}`,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({ text: "Descripción Oficial: ", bold: true }),
              new TextRun({ text: oa.descripcion })
            ]
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({ text: "Eje Curricular: ", bold: true }),
              new TextRun({ text: oa.eje })
            ]
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({ text: "Texto Escolar Oficial (MINEDUC): ", bold: true }),
              new TextRun({
                text: oa.referenciaTextoEscolar
                  ? `${oa.referenciaTextoEscolar.libro} | ${oa.referenciaTextoEscolar.unidad} | ${oa.referenciaTextoEscolar.leccion} (${oa.referenciaTextoEscolar.paginas})`
                  : `Material Oficial MINEDUC ${oa.curso} (${oa.asignatura})`
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({ text: `Dosificación: ${totalLessons} Lecciones de 30 minutos. `, bold: true }),
              new TextRun({ text: oa.justificacionLecciones, italics: true })
            ]
          }),

          // Tabla Resumen de Lecciones
          new Paragraph({
            text: "Resumen de las Lecciones del Objetivo",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 150 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createHeaderCell("Clase", 15),
                  createHeaderCell("Título de la Lección", 40),
                  createHeaderCell("Foco Didáctico Principal", 45)
                ]
              }),
              ...lessons.map((l, i) =>
                new TableRow({
                  children: [
                    createDataCell(`Clase ${l.num}`, 15, i % 2 === 1),
                    createDataCell(l.title, 40, i % 2 === 1),
                    createDataCell(l.focoDidactico, 45, i % 2 === 1)
                  ]
                })
              )
            ]
          }),

          // ==================== DETALLE DE CADA CLASE (8 PASOS CANÓNICOS) ====================
          ...lessons.flatMap((lesson) => [
            new Paragraph({
              text: `Clase ${lesson.num}: ${lesson.title}`,
              heading: HeadingLevel.HEADING_1,
              pageBreakBefore: true,
              spacing: { before: 400, after: 150 }
            }),
            new Paragraph({
              spacing: { after: 200 },
              children: [
                new TextRun({ text: "Foco didáctico: ", bold: true }),
                new TextRun({ text: lesson.focoDidactico }),
                new TextRun({ text: ` | Duración: ${lesson.duracion || "30 Minutos"}`, italics: true })
              ]
            }),

            // ==================== PRE-ETAPA: ANTES DE COMENZAR (PREPARACIÓN) ====================
            new Paragraph({
              text: "Antes de comenzar (Preparación)",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 200, after: 100 }
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: "Duración estimada: ", bold: true }),
                new TextRun({ text: lesson.duracion || "30 Minutos" })
              ]
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: "Objetivo para el Adulto / Mentor: ", bold: true, color: "0F766E" }),
                new TextRun({ text: lesson.objetivoAdulto || "Acompañar y mediar el aprendizaje socrático." })
              ]
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: "Clima Emocional y Acogida: ", bold: true, color: "0F766E" }),
                new TextRun({ text: lesson.climaEmocional || "Generar un espacio de calma, curiosidad y confianza." })
              ]
            }),
            new Paragraph({
              spacing: { after: 160 },
              children: [
                new TextRun({ text: "Ruta de Hoy (Itinerario de la Sesión): ", bold: true, color: "8B5CF6" }),
                new TextRun({ text: lesson.routeToday || lesson.focoDidactico })
              ]
            }),

            // ==================== PASO 1: INICIO ====================
            new Paragraph({
              text: "Paso 1: Inicio (Ruta de la Asignatura, La Clase de Hoy y Situación Inicial)",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 200, after: 100 }
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: "Sub-etapa 1 · Nuestra Ruta de la Asignatura: ", bold: true, color: "1E293B" }),
                new TextRun({ text: lesson.routeIntro || `Hoy comenzamos la ruta de ${oa.asignatura}.` })
              ]
            }),
            ...(Array.isArray((lesson as any).routeBlocks) && (lesson as any).routeBlocks.length > 0 ? [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: "• Los 4 Bloques Temáticos: ", bold: true }),
                  new TextRun({
                    text: (lesson as any).routeBlocks.map((b: any) => `${b.number}: ${b.title} (${b.subtitle})`).join(" | ")
                  })
                ]
              })
            ] : []),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: "Sub-etapa 2 · La Clase de Hoy (Foco Didáctico Disciplinar): ", bold: true, color: "0F766E" }),
                new TextRun({ text: lesson.focoDidactico })
              ]
            }),
            ...((lesson.keyQuestions || lesson.routeCards || []).length > 0 ? [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: "• 3 Tarjetas de Foco de la Pantalla del Alumno: ", bold: true }),
                  new TextRun({
                    text: (lesson.keyQuestions || lesson.routeCards || []).map((k: any) => `[${k.label}: ${k.sub}]`).join(" · ")
                  })
                ]
              })
            ] : []),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: "Sub-etapa 3 · Situación Inicial de Exploración (Detonante): ", bold: true, color: "10B981" }),
                new TextRun({ text: lesson.situacionIntro.dialogo })
              ]
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: "• Respuesta esperada a la situación: ", bold: true, color: "0284C7" }),
                new TextRun({ text: lesson.situacionIntro.respEsperada })
              ]
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: "• Pista socrática del mentor: ", bold: true, color: "D97706" }),
                new TextRun({ text: lesson.situacionIntro.pistaSocratica })
              ]
            }),
            ...(lesson.situacionIntro.options && lesson.situacionIntro.options.length > 0 ? [
              new Paragraph({
                spacing: { before: 40, after: 40 },
                children: [
                  new TextRun({ text: "• Alternativas formativas del mentor:", bold: true, italics: true, color: "475569" })
                ]
              }),
              ...lesson.situacionIntro.options.map((opt) =>
                new Paragraph({
                  spacing: { after: 30 },
                  children: [
                    new TextRun({
                      text: `   - [${opt.kind === 'correct' ? 'Acierto' : 'Requiere Apoyo'}] ${opt.label}: `,
                      bold: true,
                      color: opt.kind === 'correct' ? '047857' : 'B45309'
                    }),
                    new TextRun({ text: opt.feedbackText })
                  ]
                })
              )
            ] : []),
            ...((lesson as any).reference ? [
              new Paragraph({
                spacing: { before: 80, after: 60 },
                children: [
                  new TextRun({ text: "Sub-etapa 4 · Comprendamos la Respuesta (Punto de Referencia): ", bold: true, color: "0F766E" }),
                  new TextRun({ text: (lesson as any).reference.dilePrompt })
                ]
              }),
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: "• [PREGÚNTALE AL ESTUDIANTE]: ", bold: true, color: "0F766E" }),
                  new TextRun({ text: (lesson as any).reference.question })
                ]
              }),
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: "• [RESPUESTA ESPERADA]: ", bold: true, color: "0284C7" }),
                  new TextRun({ text: (lesson as any).reference.expectedAnswer })
                ]
              }),
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: "• [PISTA SOCRÁTICA]: ", bold: true, color: "D97706" }),
                  new TextRun({ text: (lesson as any).reference.socraticHint })
                ]
              }),
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: "• [FEEDBACK SI ACIERTA]: ", bold: true, color: "047857" }),
                  new TextRun({ text: (lesson as any).reference.feedbackSuccess })
                ]
              }),
              new Paragraph({
                spacing: { after: 80 },
                children: [
                  new TextRun({ text: "• [FEEDBACK SI NECESITA APOYO]: ", bold: true, color: "B45309" }),
                  new TextRun({ text: (lesson as any).reference.feedbackSupport })
                ]
              })
            ] : []),

            // ==================== PASO 2: VIDEO MOTIVACIONAL ====================
            new Paragraph({
              text: "Paso 2: Video Motivacional",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 250, after: 100 }
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: "Título del Video: ", bold: true }),
                new TextRun({ text: lesson.paso2_hook.titulo || "Desafío Motivacional" })
              ]
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: "Enlace Oficial de Video (Cloudflare Stream / R2): ", bold: true, color: "8B5CF6" }),
                new TextRun({
                  text: lesson.paso2_hook.videoUrl || (lesson.paso2_hook as any).videoSrc || "Sin enlace asignado (pendiente carga a Cloudflare R2)",
                  underline: {}
                })
              ]
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: "Imagen de Portada / Póster: ", bold: true }),
                new TextRun({
                  text: (lesson.paso2_hook as any).posterUrl || (lesson.paso2_hook.slides?.[0]?.imageUrl) || "Usar primer fotograma de Cloudflare R2"
                })
              ]
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: "[DILE antes del video]: ", bold: true, color: "0F766E" }),
                new TextRun({ text: lesson.paso2_hook.dileAntes || "Observa con atención el video." })
              ]
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: "[DILE después del video]: ", bold: true, color: "0F766E" }),
                new TextRun({ text: lesson.paso2_hook.dileDespues || "Conversemos sobre lo observado." })
              ]
            }),
            ...(Array.isArray(lesson.paso2_hook?.focusPoints) && lesson.paso2_hook.focusPoints.length > 0 ? [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: "• Puntos de foco al observar el video: ", bold: true, color: "0F766E" }),
                  new TextRun({ text: lesson.paso2_hook.focusPoints.join(" · ") })
                ]
              })
            ] : []),
            ...(lesson.paso2_hook?.hazInstruction ? [
              new Paragraph({
                spacing: { after: 80 },
                children: [
                  new TextRun({ text: "• Instrucción de observación en pantalla [HAZ]: ", bold: true, color: "D97706" }),
                  new TextRun({ text: lesson.paso2_hook.hazInstruction })
                ]
              })
            ] : []),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({
                  text: "Ficha Técnica y Guion Audiovisual (7 Diapositivas Anime 16:9 para Google Vids):",
                  bold: true,
                  italics: true,
                  color: "475569"
                })
              ]
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({
                  text: "• Directiva de Visualización y Tipografía: ",
                  bold: true,
                  size: 19,
                  color: "0F766E"
                }),
                new TextRun({
                  text: `Título en Pantalla (64 pt). Subtítulo en Pantalla (${subPt} pt). Texto de un solo color brillante (ej. Blanco Brillante #FFFFFF), elegido para contrastar con el fondo de cada imagen, plano, sin sombras, contornos, resplandores ni recuadros flotantes o fondos detrás del texto. Protagonistas en el 100% de las escenas: la joven con trenzas y el joven con chaqueta cerceta interactuando activamente en cada escena.`,
                  size: 19,
                  color: "334155"
                })
              ]
            }),
            new Paragraph({
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: "• Calibración Audiovisual (Google Vids): ",
                  bold: true,
                  size: 19,
                  color: "0F766E"
                }),
                new TextRun({
                  text: "El guion continuo está redactado con un presupuesto léxico referencial adaptado al nivel escolar. La calibración acústica, pausas y ritmo de locución se ajustan directamente en Google Vids durante la síntesis y renderizado, sin que el conteo de palabras ni la duración en segundos constituyan un criterio de bloqueo pedagógico.",
                  size: 19,
                  color: "334155"
                })
              ]
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    createHeaderCell("Diapositiva y Propósito", 16),
                    createHeaderCell(`Textos en Pantalla (64 pt / ${subPt} pt)`, 28),
                    createHeaderCell("Prompt Visual IA y Capa Vectorial PPTX", 32),
                    createHeaderCell("Notas al Orador (Google Vids)", 24)
                  ]
                }),
                ...(Array.isArray(lesson.paso2_hook?.slides) ? lesson.paso2_hook.slides : []).map((s, idx) =>
                  new TableRow({
                    children: [
                      createRichDataCell([
                        new Paragraph({
                          spacing: { after: 40 },
                          children: [
                            new TextRun({ text: `Slide ${s.slideNumber || idx + 1}`, bold: true, color: "0F766E", size: 19 })
                          ]
                        }),
                        new Paragraph({
                          spacing: { after: 40 },
                          children: [
                            new TextRun({ text: s.didacticPurpose || (idx === 0 ? "Apertura y Enfoque" : idx === 6 ? "Pregunta Detonante y Síntesis" : "Desarrollo Visual"), bold: true, size: 18 })
                          ]
                        }),
                        new Paragraph({
                          spacing: { after: 20 },
                          children: [
                            new TextRun({ text: `Duración asignada: ${s.duracionSeg || 8} s`, italics: true, color: "64748B", size: 17 })
                          ]
                        })
                      ], 16, idx % 2 === 1),
                      createRichDataCell([
                        new Paragraph({
                          spacing: { after: 60 },
                          children: [
                            new TextRun({ text: "• Título (64 pt): ", bold: true, color: "0369A1", size: 18 }),
                            new TextRun({ text: s.overlayTitle || s.overlayText || '', bold: true, size: 18 })
                          ]
                        }),
                        new Paragraph({
                          spacing: { after: 20 },
                          children: [
                            new TextRun({ text: `• Subtítulo (${subPt} pt): `, bold: true, color: "0F766E", size: 18 }),
                            new TextRun({ text: s.overlaySubtitle || '', size: 18 })
                          ]
                        })
                      ], 28, idx % 2 === 1),
                      createRichDataCell([
                        new Paragraph({
                          spacing: { after: 60 },
                          children: [
                            new TextRun({ text: "• Prompt IA: ", bold: true, color: "475569", size: 17 }),
                            new TextRun({ text: s.visualPrompt || '', size: 17 })
                          ]
                        }),
                        ...((s.vectorialOverlayPptx || s.mathOverlayPptx) && !s.vectorialOverlayPptx?.startsWith("Sin rótulo") ? [
                          new Paragraph({
                            spacing: { after: 20 },
                            children: [
                              new TextRun({ text: "• Capa Vectorial PPTX: ", bold: true, color: "D97706", size: 17 }),
                              new TextRun({ text: s.vectorialOverlayPptx || s.mathOverlayPptx || '', size: 17 })
                            ]
                          })
                        ] : [])
                      ], 32, idx % 2 === 1),
                      createRichDataCell([
                        new Paragraph({
                          spacing: { after: 40 },
                          children: [
                            new TextRun({ text: s.speakerNotes || '', italics: true, size: 18, color: "1E293B" })
                          ]
                        })
                      ], 24, idx % 2 === 1)
                    ]
                  })
                )
              ]
            }),

            // ==================== PASO 3: RECORRIDO ====================
            new Paragraph({
              text: "Paso 3: Recorrido (Preguntas Socráticas Guiadas)",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 300, after: 100 }
            }),
            ...(lesson.conversationContext ? [
              new Paragraph({
                spacing: { before: 40, after: 80 },
                children: [
                  new TextRun({ text: "Contexto de Apertura Socrática: ", bold: true, color: "0F766E" }),
                  new TextRun({ text: lesson.conversationContext })
                ]
              })
            ] : []),
            ...lesson.paso3_recorrido.flatMap((item, idx) => [
              new Paragraph({
                spacing: { before: 80, after: 40 },
                children: [
                  new TextRun({ text: `Pregunta ${idx + 1} (${item.context}): `, bold: true }),
                  new TextRun({ text: item.question })
                ]
              }),
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: "• Respuesta esperada: ", bold: true, color: "0284C7" }),
                  new TextRun({ text: item.expected }),
                  new TextRun({ text: " | Pista socrática: ", bold: true, color: "D97706" }),
                  new TextRun({ text: item.support })
                ]
              }),
              new Paragraph({
                spacing: { after: 100 },
                children: [
                  new TextRun({ text: "• Texto revelado al estudiante: ", bold: true, color: "0F766E" }),
                  new TextRun({ text: item.studentReveal || item.reveal })
                ]
              })
            ]),

            // ==================== PASO 4: VIDEO EXPLICATIVO ====================
            new Paragraph({
              text: "Paso 4: Video Explicativo e Idea Clave",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 250, after: 100 }
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: "Título de la Formalización: ", bold: true }),
                new TextRun({ text: lesson.paso4_explicativo.titulo || "Explicación Formal" })
              ]
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: "Enlace Oficial de Video (Cloudflare Stream / R2): ", bold: true, color: "D97706" }),
                new TextRun({
                  text: lesson.paso4_explicativo.videoUrl || (lesson.paso4_explicativo as any).videoSrc || "Sin enlace asignado (pendiente carga a Cloudflare R2)",
                  underline: {}
                })
              ]
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: "Imagen de Portada / Póster: ", bold: true }),
                new TextRun({
                  text: (lesson.paso4_explicativo as any).posterUrl || (lesson.paso4_explicativo.slides?.[0]?.imageUrl) || "Usar primer fotograma de Cloudflare R2"
                })
              ]
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: "Idea Clave Disciplinar: ", bold: true, color: "0F766E" }),
                new TextRun({ text: lesson.paso4_explicativo.ideaClave || lesson.paso6_resumen?.ideaClave || "Concepto fundamental." })
              ]
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: "[DILE antes de la explicación]: ", bold: true, color: "0F766E" }),
                new TextRun({ text: lesson.paso4_explicativo.dileAntes || "Veamos juntos el modelo explicativo paso a paso." })
              ]
            }),
            ...(lesson.paso4_explicativo?.hazInstruction ? [
              new Paragraph({
                spacing: { after: 80 },
                children: [
                  new TextRun({ text: "• Instrucción de visualización [HAZ]: ", bold: true, color: "D97706" }),
                  new TextRun({ text: lesson.paso4_explicativo.hazInstruction })
                ]
              })
            ] : []),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({
                  text: "Ficha Técnica y Guion de Formalización (7 Diapositivas con Principio de Cambio Visible):",
                  bold: true,
                  italics: true,
                  color: "475569"
                })
              ]
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({
                  text: "• Directiva de Visualización y Tipografía: ",
                  bold: true,
                  size: 19,
                  color: "0F766E"
                }),
                new TextRun({
                  text: `Título en Pantalla (64 pt). Subtítulo en Pantalla (${subPt} pt). Texto de un solo color brillante (ej. Blanco Brillante #FFFFFF), elegido para contrastar con el fondo de cada imagen, plano, sin sombras, contornos, resplandores ni recuadros flotantes o fondos detrás del texto. Protagonistas en el 100% de las escenas: la joven con trenzas y el joven con chaqueta cerceta interactuando activamente en cada escena.`,
                  size: 19,
                  color: "334155"
                })
              ]
            }),
            new Paragraph({
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: "• Calibración Audiovisual (Google Vids): ",
                  bold: true,
                  size: 19,
                  color: "0F766E"
                }),
                new TextRun({
                  text: "El guion continuo está redactado con un presupuesto léxico referencial adaptado al nivel escolar. La calibración acústica, pausas y ritmo de locución se ajustan directamente en Google Vids durante la síntesis y renderizado, sin que el conteo de palabras ni la duración en segundos constituyan un criterio de bloqueo pedagógico.",
                  size: 19,
                  color: "334155"
                })
              ]
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    createHeaderCell("Diapositiva y Propósito", 16),
                    createHeaderCell(`Textos en Pantalla (64 pt / ${subPt} pt)`, 28),
                    createHeaderCell("Prompt Visual IA y Capa Vectorial PPTX", 32),
                    createHeaderCell("Notas al Orador (Google Vids)", 24)
                  ]
                }),
                ...(Array.isArray(lesson.paso4_explicativo?.slides) ? lesson.paso4_explicativo.slides : []).map((s, idx) =>
                  new TableRow({
                    children: [
                      createRichDataCell([
                        new Paragraph({
                          spacing: { after: 40 },
                          children: [
                            new TextRun({ text: `Slide ${s.slideNumber || idx + 1}`, bold: true, color: "0F766E", size: 19 })
                          ]
                        }),
                        new Paragraph({
                          spacing: { after: 40 },
                          children: [
                            new TextRun({ text: s.didacticPurpose || (idx === 0 ? "Objetivo de la Lección" : idx === 6 ? "Síntesis y Regla de Oro" : "Formalización y Cambio"), bold: true, size: 18 })
                          ]
                        }),
                        new Paragraph({
                          spacing: { after: 20 },
                          children: [
                            new TextRun({ text: `Duración asignada: ${s.duracionSeg || (idx === 0 ? 12 : 13)} s`, italics: true, color: "64748B", size: 17 })
                          ]
                        })
                      ], 16, idx % 2 === 1),
                      createRichDataCell([
                        new Paragraph({
                          spacing: { after: 60 },
                          children: [
                            new TextRun({ text: "• Título (64 pt): ", bold: true, color: "0369A1", size: 18 }),
                            new TextRun({ text: s.overlayTitle || s.overlayText || '', bold: true, size: 18 })
                          ]
                        }),
                        new Paragraph({
                          spacing: { after: 20 },
                          children: [
                            new TextRun({ text: `• Subtítulo (${subPt} pt): `, bold: true, color: "0F766E", size: 18 }),
                            new TextRun({ text: s.overlaySubtitle || '', size: 18 })
                          ]
                        })
                      ], 28, idx % 2 === 1),
                      createRichDataCell([
                        new Paragraph({
                          spacing: { after: 60 },
                          children: [
                            new TextRun({ text: "• Prompt IA: ", bold: true, color: "475569", size: 17 }),
                            new TextRun({ text: s.visualPrompt || '', size: 17 })
                          ]
                        }),
                        ...((s.vectorialOverlayPptx || s.mathOverlayPptx) && !s.vectorialOverlayPptx?.startsWith("Sin rótulo") && !s.vectorialOverlayPptx?.startsWith("Sin capa") ? [
                          new Paragraph({
                            spacing: { after: 20 },
                            children: [
                              new TextRun({ text: "• Capa Vectorial PPTX: ", bold: true, color: "D97706", size: 17 }),
                              new TextRun({ text: s.vectorialOverlayPptx || s.mathOverlayPptx || '', size: 17 })
                            ]
                          })
                        ] : [])
                      ], 32, idx % 2 === 1),
                      createRichDataCell([
                        new Paragraph({
                          spacing: { after: 40 },
                          children: [
                            new TextRun({ text: s.speakerNotes || '', italics: true, size: 18, color: "1E293B" })
                          ]
                        })
                      ], 24, idx % 2 === 1)
                    ]
                  })
                )
              ]
            }),
            ...(lesson.summaryText ? [
              new Paragraph({
                spacing: { before: 100, after: 60 },
                children: [
                  new TextRun({ text: "Síntesis de Cierre del Video Explicativo: ", bold: true, color: "0F766E" }),
                  new TextRun({ text: lesson.summaryText })
                ]
              })
            ] : []),
            ...(Array.isArray(lesson.postQuestions) && lesson.postQuestions.length > 0 ? [
              new Paragraph({
                spacing: { before: 100, after: 60 },
                children: [
                  new TextRun({ text: "Comprobemos lo aprendido (Preguntas de Comprobación Post-Video):", bold: true, color: "0F766E" })
                ]
              }),
              ...lesson.postQuestions.flatMap((pq: any, pqi: number) => [
                new Paragraph({
                  spacing: { before: 60, after: 40 },
                  children: [
                    new TextRun({ text: `Comprobación ${pqi + 1} (${pq.context || 'Foco'}): `, bold: true }),
                    new TextRun({ text: pq.question })
                  ]
                }),
                new Paragraph({
                  spacing: { after: 40 },
                  children: [
                    new TextRun({ text: "• Respuesta esperada: ", bold: true, color: "0284C7" }),
                    new TextRun({ text: pq.expected }),
                    new TextRun({ text: " | Pista socrática: ", bold: true, color: "D97706" }),
                    new TextRun({ text: pq.support || "" })
                  ]
                }),
                new Paragraph({
                  spacing: { after: 60 },
                  children: [
                    new TextRun({ text: "• Texto revelado al estudiante: ", bold: true, color: "0F766E" }),
                    new TextRun({ text: pq.studentReveal || pq.reveal || "" })
                  ]
                })
              ])
            ] : []),

            // ==================== PASO 5: PRÁCTICA ====================
            new Paragraph({
              text: "Paso 5: Práctica (Trabajo en Cuaderno y Contextos Reales)",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 300, after: 100 }
            }),
            ...lesson.paso5_practica.flatMap((p, idx) => [
              new Paragraph({
                spacing: { before: 80, after: 40 },
                children: [
                  new TextRun({ text: `Ejercicio ${idx + 1} (${p.context}): `, bold: true }),
                  new TextRun({ text: p.question })
                ]
              }),
              new Paragraph({
                spacing: { after: 100 },
                children: [
                  new TextRun({ text: "• Respuesta esperada: ", bold: true, color: "16A34A" }),
                  new TextRun({ text: p.expected }),
                  new TextRun({ text: " | Pista socrática de modelado: ", bold: true, color: "D97706" }),
                  new TextRun({ text: p.support })
                ]
              })
            ]),
            ...(lesson.reasoning ? [
              new Paragraph({
                spacing: { before: 120, after: 60 },
                children: [
                  new TextRun({ text: `Comparemos dos situaciones: ${lesson.reasoning.title || 'Razonamiento comparativo'}`, bold: true, color: "0F766E" })
                ]
              }),
              ...(lesson.reasoning.dileIntro ? [
                new Paragraph({
                  spacing: { after: 40 },
                  children: [
                    new TextRun({ text: "[DILE]: ", bold: true, color: "0F766E" }),
                    new TextRun({ text: lesson.reasoning.dileIntro })
                  ]
                })
              ] : []),
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: "• Pregunta de razonamiento: ", bold: true }),
                  new TextRun({ text: lesson.reasoning.question })
                ]
              }),
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: "• Respuesta esperada: ", bold: true, color: "16A34A" }),
                  new TextRun({ text: lesson.reasoning.expectedAnswer || "" })
                ]
              }),
              ...(lesson.reasoning.successFeedback ? [
                new Paragraph({
                  spacing: { after: 40 },
                  children: [
                    new TextRun({ text: "• Feedback si acierta: ", bold: true, color: "047857" }),
                    new TextRun({ text: lesson.reasoning.successFeedback })
                  ]
                })
              ] : []),
              ...(lesson.reasoning.supportFeedback ? [
                new Paragraph({
                  spacing: { after: 60 },
                  children: [
                    new TextRun({ text: "• Feedback si necesita apoyo: ", bold: true, color: "D97706" }),
                    new TextRun({ text: lesson.reasoning.supportFeedback })
                  ]
                })
              ] : [])
            ] : []),
            ...(lesson.challenge ? [
              new Paragraph({
                spacing: { before: 100, after: 60 },
                children: [
                  new TextRun({ text: `Desafío Breve: ${lesson.challenge.title || 'Desafío'}`, bold: true, color: "8B5CF6" })
                ]
              }),
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: "• Pregunta del desafío: ", bold: true }),
                  new TextRun({ text: lesson.challenge.question })
                ]
              }),
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: "• Respuesta esperada: ", bold: true, color: "16A34A" }),
                  new TextRun({ text: lesson.challenge.expectedAnswer || "" })
                ]
              })
            ] : []),

            // ==================== PASO 6: RESUMEN ====================
            new Paragraph({
              text: "Paso 6: Resumen y Estrategia para Pensar",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 300, after: 100 }
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: "Idea Clave: ", bold: true, color: "0F766E" }),
                new TextRun({ text: lesson.paso6_resumen?.ideaClave || lesson.paso4_explicativo?.ideaClave || "Síntesis del contenido." })
              ]
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: "Estrategia para Pensar: ", bold: true, color: "8B5CF6" }),
                new TextRun({
                  text: Array.isArray(lesson.paso6_resumen?.estrategia)
                    ? lesson.paso6_resumen.estrategia.map((s) => `${s.number}. ${s.title}: ${s.desc}`).join(" · ")
                    : (typeof lesson.paso6_resumen?.estrategia === "string"
                        ? lesson.paso6_resumen.estrategia
                        : "1. Identificar datos · 2. Aplicar la regla formal · 3. Comprobar el resultado en el contexto original.")
                })
              ]
            }),
            ...(Array.isArray(lesson.strategy?.steps) && lesson.strategy.steps.length > 0 ? [
              new Paragraph({
                spacing: { before: 60, after: 40 },
                children: [
                  new TextRun({ text: `Estrategia de Tres Pasos (${lesson.strategy.title || 'Estrategia para pensar'}):`, bold: true, color: "8B5CF6" })
                ]
              }),
              ...lesson.strategy.steps.map((st: any) =>
                new Paragraph({
                  spacing: { after: 30 },
                  children: [
                    new TextRun({ text: `   Paso ${st.number} [${st.title}]: `, bold: true }),
                    new TextRun({ text: st.desc })
                  ]
                })
              )
            ] : []),
            ...(Array.isArray(lesson.summaryIdeas) && lesson.summaryIdeas.length > 0 ? [
              new Paragraph({
                spacing: { before: 80, after: 40 },
                children: [
                  new TextRun({ text: "3 Ideas Clave Estructuradas de Síntesis:", bold: true, color: "0F766E" })
                ]
              }),
              ...lesson.summaryIdeas.map((idea: [string, string]) =>
                new Paragraph({
                  spacing: { after: 30 },
                  children: [
                    new TextRun({ text: `   • ${idea[0]}: `, bold: true }),
                    new TextRun({ text: idea[1] })
                  ]
                })
              )
            ] : []),
            new Paragraph({
              spacing: { after: 120 },
              children: [
                new TextRun({ text: "Síntesis Conceptual: ", bold: true }),
                new TextRun({ text: lesson.paso6_resumen?.sintesis || "Consolidación de aprendizajes previa a la evaluación formativa." })
              ]
            }),

            // ==================== PASO 7: MINIQUIZ Y FASE REVISAR ====================
            new Paragraph({
              text: "Paso 7: Miniquiz de Evaluación Formativa y Fase REVISAR",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 250, after: 80 }
            }),
            new Paragraph({
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: "Evaluación formativa de 3 preguntas de selección múltiple (Umbral de aprobación: 2 de 3).",
                  italics: true,
                  size: 18,
                  color: "64748B"
                })
              ]
            }),
            ...lesson.paso7_miniquiz.flatMap((q, idx) => [
              new Paragraph({
                spacing: { before: 60, after: 30 },
                children: [
                  new TextRun({ text: `Pregunta ${idx + 1}: `, bold: true, color: "1E293B" }),
                  new TextRun({ text: q.q, bold: true })
                ]
              }),
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: "Opciones: ", bold: true }),
                  new TextRun({ text: q.options.join(" | ") })
                ]
              }),
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: "• Respuesta correcta: ", bold: true, color: "047857" }),
                  new TextRun({ text: q.correct })
                ]
              }),
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: "• [Fase REVISAR - DILE del Mentor]: ", bold: true, color: "0F766E" }),
                  new TextRun({ text: q.dileReview || "Pídele que señale por qué eligió esta respuesta y qué elemento clave de la pantalla confirma su validez." })
                ]
              }),
              new Paragraph({
                spacing: { after: 80 },
                children: [
                  new TextRun({ text: "• [Fase REVISAR - Explicación Formativa del Estudiante]: ", bold: true, color: "0284C7" }),
                  new TextRun({ text: q.fixExplain, italics: true })
                ]
              })
            ]),

            // PASO 7B: RECUPERACIÓN FORMATIVA (SI CORRESPONDE)
            ...(lesson.paso7b_recuperacion && lesson.paso7b_recuperacion.length > 0 ? [
              new Paragraph({
                text: "Paso 7b: Módulo de Recuperación Formativa (Ítems Equivalentes)",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 80 }
              }),
              new Paragraph({
                spacing: { after: 100 },
                children: [
                  new TextRun({
                    text: "Se activa automáticamente si el estudiante responde menos de 2 preguntas correctas en el miniquiz. Ofrece una nueva oportunidad sin penalización.",
                    italics: true,
                    size: 18,
                    color: "64748B"
                  })
                ]
              }),
              ...lesson.paso7b_recuperacion.flatMap((r, idx) => [
                new Paragraph({
                  spacing: { before: 50, after: 30 },
                  children: [
                    new TextRun({ text: `Ítem de Recuperación ${idx + 1} (${r.title}): `, bold: true }),
                    new TextRun({ text: r.q })
                  ]
                }),
                new Paragraph({
                  spacing: { after: 40 },
                  children: [
                    new TextRun({ text: `Explicación previa: ${r.explain}\n`, italics: true }),
                    new TextRun({ text: `Opciones: ${r.options.join(" | ")} | Correcta: ${r.correct}\n` }),
                    new TextRun({ text: `Refuerzo: ${r.fixText}`, color: "B45309" })
                  ]
                })
              ])
            ] : []),

            // ==================== PASO 8: CIERRE ====================
            new Paragraph({
              text: "Paso 8: Cierre y Metacognición",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 250, after: 80 }
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: "Pregunta de Síntesis: ", bold: true }),
                new TextRun({ text: lesson.paso8_cierre.preguntaSintesis })
              ]
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: "Reflexión Metacognitiva: ", bold: true }),
                new TextRun({ text: lesson.paso8_cierre.metacognicion })
              ]
            }),
            new Paragraph({
              spacing: { after: 150 },
              children: [
                new TextRun({ text: "Celebración y Cierre: ", bold: true, color: "0F766E" }),
                new TextRun({ text: lesson.paso8_cierre.celebracion })
              ]
            })
          ])
        ]
      }
    ]
  });

  return doc;
}

export function buildSingleLessonDocx(playerLesson: PlayerLessonData): Document {
  const genLesson = adaptPlayerLessonToGenerator(playerLesson);
  const oaMock = {
    id: `${playerLesson.metadata.grade}_${playerLesson.metadata.subject}_${playerLesson.metadata.oaCode}`,
    curso: playerLesson.metadata.grade,
    asignatura: playerLesson.metadata.subject,
    eje: playerLesson.metadata.oaTitle,
    oa: playerLesson.metadata.oaCode,
    oaNumero: 1,
    isPriorityDemo: true,
    descripcion: playerLesson.metadata.oaTitle,
    indicadores: [],
    conceptosClave: [],
    leccionesSugeridas: playerLesson.metadata.totalLessonsInOa,
    justificacionLecciones: "Dosificación oficial personalizada"
  };

  const fakePkg: GeneratedOAPackage = {
    oa: oaMock,
    totalLessons: playerLesson.metadata.totalLessonsInOa,
    lessons: [genLesson]
  };

  return buildOAPackageDocx(fakePkg);
}

export async function exportSingleLessonToDocx(lesson: PlayerLessonData): Promise<Blob> {
  const doc = buildSingleLessonDocx(lesson);
  return await Packer.toBlob(doc);
}

export async function exportOAPackageToDocx(pkg: GeneratedOAPackage): Promise<Blob> {
  const doc = buildOAPackageDocx(pkg);
  return await Packer.toBlob(doc);
}


function createHeaderCell(text: string, widthPercent: number): TableCell {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: "1E293B" },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 80 },
        children: [
          new TextRun({
            text,
            bold: true,
            size: 18,
            color: "FFFFFF",
            font: "Calibri"
          })
        ]
      })
    ]
  });
}

function createDataCell(text: string, widthPercent: number, isAlternate: boolean): TableCell {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: isAlternate ? "F8FAFC" : "FFFFFF" },
    children: [
      new Paragraph({
        spacing: { before: 60, after: 60 },
        children: [
          new TextRun({
            text,
            size: 18,
            color: "334155",
            font: "Calibri"
          })
        ]
      })
    ]
  });
}

function createRichDataCell(paragraphs: Paragraph[], widthPercent: number, isAlternate: boolean): TableCell {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: isAlternate ? "F8FAFC" : "FFFFFF" },
    children: paragraphs.length > 0 ? paragraphs : [new Paragraph({ children: [] })]
  });
}
