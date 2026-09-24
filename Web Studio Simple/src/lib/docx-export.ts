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
import { GeneratedOAPackage } from "./lesson-generator";

export function buildOAPackageDocx(pkg: GeneratedOAPackage): Document {
  const { oa, totalLessons, lessons } = pkg;

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
                text: `Desglose Instruccional en ${totalLessons} Lecciones de 30 Minutos (8 Pasos Pedagógicos Oficiales)\nIncluye Enlaces a Videos en Cloudflare R2, Prompts Anime Moderno 16:9 y Ficha Técnica de Aula`,
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

            // PASO 1: METADATOS Y PREPARACIÓN DEL MENTOR
            new Paragraph({
              text: "Paso 1: Metadatos y Preparación del Mentor",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 200, after: 100 }
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
                new TextRun({ text: "Foco Curricular de la Sesión: ", bold: true, color: "0F766E" }),
                new TextRun({ text: lesson.focoDidactico })
              ]
            }),

            // PASO 2: RUTA Y SITUACIÓN INICIAL
            new Paragraph({
              text: "Paso 2: Ruta y Situación Inicial",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 200, after: 100 }
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: "[DILE]: ", bold: true, color: "0F766E" }),
                new TextRun({ text: lesson.situacionIntro.dialogo })
              ]
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: "[PREGÚNTALE]: ", bold: true, color: "0F766E" }),
                new TextRun({ text: lesson.situacionIntro.pregunta })
              ]
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: "[RESPUESTA ESPERADA]: ", bold: true, color: "0284C7" }),
                new TextRun({ text: lesson.situacionIntro.respEsperada })
              ]
            }),
            new Paragraph({
              spacing: { after: 100 },
              children: [
                new TextRun({ text: "[PISTA SOCRÁTICA]: ", bold: true, color: "D97706" }),
                new TextRun({ text: lesson.situacionIntro.pistaSocratica })
              ]
            }),
            ...(lesson.situacionIntro.options && lesson.situacionIntro.options.length > 0 ? [
              new Paragraph({
                spacing: { before: 60, after: 60 },
                children: [
                  new TextRun({ text: "Alternativas de Retroalimentación Formativa (Mentor):", bold: true, italics: true, color: "475569" })
                ]
              }),
              ...lesson.situacionIntro.options.map((opt) =>
                new Paragraph({
                  spacing: { after: 40 },
                  children: [
                    new TextRun({
                      text: `• [${opt.kind === 'correct' ? 'Acierto' : 'Requiere Apoyo'}] ${opt.label}: `,
                      bold: true,
                      color: opt.kind === 'correct' ? '047857' : 'B45309'
                    }),
                    new TextRun({ text: opt.feedbackText })
                  ]
                })
              )
            ] : []),

            // PASO 3: VIDEO MOTIVACIONAL (CLOUDFLARE Y 7 SLIDES)
            new Paragraph({
              text: "Paso 3: Video Motivacional",
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
              spacing: { after: 120 },
              children: [
                new TextRun({ text: "[DILE después del video]: ", bold: true, color: "0F766E" }),
                new TextRun({ text: lesson.paso2_hook.dileDespues || "Conversemos sobre lo observado." })
              ]
            }),
            new Paragraph({
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: "Ficha Técnica y Guion Audiovisual (7 Diapositivas Anime 16:9 para Google Vids):",
                  bold: true,
                  italics: true,
                  color: "475569"
                })
              ]
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    createHeaderCell("Slide", 8),
                    createHeaderCell("Prompt Visual (Anime 16:9)", 42),
                    createHeaderCell("Texto en Pantalla", 18),
                    createHeaderCell("Notas Orador (Google Vids)", 22),
                    createHeaderCell("Imagen / URL", 10)
                  ]
                }),
                ...lesson.paso2_hook.slides.map((s, idx) =>
                  new TableRow({
                    children: [
                      createDataCell(`${s.slideNumber}`, 8, idx % 2 === 1),
                      createDataCell(s.visualPrompt, 42, idx % 2 === 1),
                      createDataCell(s.overlayText, 18, idx % 2 === 1),
                      createDataCell(s.speakerNotes, 22, idx % 2 === 1),
                      createDataCell(s.imageUrl ? `URL:\n${s.imageUrl}` : "Por generar", 10, idx % 2 === 1)
                    ]
                  })
                )
              ]
            }),

            // PASO 4: CONVERSACIÓN GUIADA
            new Paragraph({
              text: "Paso 4: Conversación Guiada",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 300, after: 100 }
            }),
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

            // PASO 5: VIDEO EXPLICATIVO E IDEA CLAVE
            new Paragraph({
              text: "Paso 5: Video Explicativo e Idea Clave",
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
              spacing: { after: 120 },
              children: [
                new TextRun({ text: "[DILE antes de la explicación]: ", bold: true, color: "0F766E" }),
                new TextRun({ text: lesson.paso4_explicativo.dileAntes || "Veamos juntos el modelo explicativo paso a paso." })
              ]
            }),
            new Paragraph({
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: "Ficha Técnica y Guion de Formalización (7 Diapositivas con Principio de Cambio Visible):",
                  bold: true,
                  italics: true,
                  color: "475569"
                })
              ]
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    createHeaderCell("Slide", 8),
                    createHeaderCell("Prompt Visual (Anime 16:9)", 42),
                    createHeaderCell("Texto en Pantalla", 18),
                    createHeaderCell("Notas Orador (Google Vids)", 22),
                    createHeaderCell("Imagen / URL", 10)
                  ]
                }),
                ...lesson.paso4_explicativo.slides.map((s, idx) =>
                  new TableRow({
                    children: [
                      createDataCell(`${s.slideNumber}`, 8, idx % 2 === 1),
                      createDataCell(s.visualPrompt, 42, idx % 2 === 1),
                      createDataCell(s.overlayText, 18, idx % 2 === 1),
                      createDataCell(s.speakerNotes, 22, idx % 2 === 1),
                      createDataCell(s.imageUrl ? `URL:\n${s.imageUrl}` : "Por generar", 10, idx % 2 === 1)
                    ]
                  })
                )
              ]
            }),

            // PASO 6: PRÁCTICA CONJUNTA
            new Paragraph({
              text: "Paso 6: Práctica Conjunta (Tres Contextos Reales)",
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

            // PASO 7: MINIQUIZ Y RECUPERACIÓN FORMATIVA
            new Paragraph({
              text: "Paso 7: Miniquiz de Evaluación Formativa (Umbral de Aprobación: 2 de 3)",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 250, after: 80 }
            }),
            ...lesson.paso7_miniquiz.flatMap((q, idx) => [
              new Paragraph({
                spacing: { before: 50, after: 30 },
                children: [
                  new TextRun({ text: `${idx + 1}. ${q.q}`, bold: true })
                ]
              }),
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: `Opciones: ${q.options.join(" | ")}\n` }),
                  new TextRun({ text: `Respuesta correcta: ${q.correct} | Justificación formativa: ${q.fixExplain}`, italics: true, color: "047857" })
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
                    text: "Se activa si el estudiante responde menos de 2 preguntas correctas en el miniquiz. Ofrece una nueva oportunidad sin penalización.",
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

            // PASO 8: CIERRE Y METACOGNICIÓN
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
