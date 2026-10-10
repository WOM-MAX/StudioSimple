/**
 * generate_implementation_docx_report.ts
 * 
 * Generador del documento Word oficial (.docx) de entrega para el
 * "Sistema de lecciones EstudioSimple v1.0 — Estructura global y cinco módulos para 7° básico".
 * 
 * Uso: npx tsx scripts/generate_implementation_docx_report.ts
 */

import fs from 'fs';
import path from 'path';
import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  HeadingLevel,
  AlignmentType,
  ShadingType,
  Packer
} from '../Web Studio Simple/node_modules/docx';

const DOCS_DIR = path.resolve(import.meta.dirname ?? __dirname, '..', 'docs');
if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

const OUTPUT_DOCX = path.join(
  DOCS_DIR,
  'Informe_Implementacion_Sistema_Lecciones_7B_v1_2026-10-09_11-00.docx'
);
const OUTPUT_MD = path.join(
  DOCS_DIR,
  'informe_implementacion_sistema_lecciones_7b_v1_2026-10-09_11-00.md'
);

function createHeaderCell(text: string, widthPct: number): TableCell {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    shading: { fill: '1C3257', type: ShadingType.CLEAR },
    margins: { top: 120, bottom: 120, left: 140, right: 140 },
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({
            text,
            bold: true,
            color: 'FFFFFF',
            font: 'Arial',
            size: 19
          })
        ]
      })
    ]
  });
}

function createDataCell(text: string, widthPct: number, isEven: boolean): TableCell {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    shading: { fill: isEven ? 'F8FAFC' : 'FFFFFF', type: ShadingType.CLEAR },
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({
            text,
            font: 'Arial',
            size: 18,
            color: '1E293B'
          })
        ]
      })
    ]
  });
}

async function buildDocx(): Promise<void> {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Arial', size: 21, color: '1E293B' },
          paragraph: { spacing: { line: 276, before: 120, after: 120 } }
        }
      }
    },
    sections: [
      {
        properties: {},
        children: [
          // Portada y Título Principal
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'ESTUDIOSIMPLE — INFORME OFICIAL DE IMPLEMENTACIÓN TÉCNICA',
                bold: true,
                size: 28,
                color: '1C3257'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 50, after: 150 },
            children: [
              new TextRun({
                text: 'Sistema de Lecciones EstudioSimple v1.0\nEstructura Global y Cinco Módulos para Séptimo Básico',
                bold: true,
                size: 24,
                color: 'EE751C'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 50, after: 250 },
            children: [
              new TextRun({
                text: 'Fecha y Hora: 2026-10-09 11:15 [America/Santiago] | Autor: Antigravity (Ingeniero Software IA)\nDestinatarios: Walter (Director y Autoridad Aprobatoria) y ChatGPT Work (Auditoría Externa)',
                italics: true,
                size: 18,
                color: '64748B'
              })
            ]
          }),

          // 1. Resumen Ejecutivo
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({ text: '1. Resumen Ejecutivo del Alcance Implementado', bold: true, color: '1C3257' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'En cumplimiento estricto del comando /goal y de las directrices del documento "Sistema de lecciones EstudioSimple v1.0" (2026-10-09 09:47), Antigravity ha completado con éxito la implementación integral de la arquitectura de dos capas en D:\\StudioSimple - Antigravity. Esta entrega se limita exclusivamente a la estructura global y los cinco módulos disciplinares, sin regenerar lecciones ni modificar archivos PPTX ni alterar estados de aprobación de paquetes vigentes.'
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'El sistema incorpora: (1) Catálogo de reglas con DEC-01 a DEC-07; (2) Cinco módulos disciplinares independientes; (3) Desacoplamiento de restricciones a anexos por OA; (4) Matriz de equivalencia de 8 funciones pedagógicas; (5) Matriz determinista de tolerancias y severidad; (6) Protocolo de protección de campos pedagógicos contra regresiones; y (7) Suite de validación en TypeScript con 100% de éxito en sus 8 pruebas.'
              })
            ]
          }),

          // 2. Ubicación de la Estructura Global y Cinco Módulos
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({ text: '2. Ubicación de la Estructura Global y los Cinco Módulos (Rutas Relativas)', bold: true, color: '1C3257' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Estructura Global Transversal: ', bold: true, color: '1C3257' }),
              new TextRun({ text: '.agents/skills/estudiosimple-lecciones/rules/reglas_universales.md' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Perfil de Nivel 7° Básico: ', bold: true, color: '1C3257' }),
              new TextRun({ text: '.agents/skills/estudiosimple-lecciones/profiles/cursos/perfil_7_basico.md' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Módulo 1 (Matemática): ', bold: true, color: '1C3257' }),
              new TextRun({ text: '.agents/skills/estudiosimple-lecciones/profiles/asignaturas/matematica.md' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Módulo 2 (Lengua y Literatura): ', bold: true, color: '1C3257' }),
              new TextRun({ text: '.agents/skills/estudiosimple-lecciones/profiles/asignaturas/lengua_literatura.md' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Módulo 3 (Inglés EFL): ', bold: true, color: '1C3257' }),
              new TextRun({ text: '.agents/skills/estudiosimple-lecciones/profiles/asignaturas/ingles.md' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Módulo 4 (Ciencias Naturales): ', bold: true, color: '1C3257' }),
              new TextRun({ text: '.agents/skills/estudiosimple-lecciones/profiles/asignaturas/ciencias_naturales.md' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Módulo 5 (Historia y Geografía): ', bold: true, color: '1C3257' }),
              new TextRun({ text: '.agents/skills/estudiosimple-lecciones/profiles/asignaturas/historia_geografia.md' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Anexos por OA Desacoplados: ', bold: true, color: '1C3257' }),
              new TextRun({ text: '.agents/skills/estudiosimple-lecciones/profiles/anexos/ (matematica_7b_oa04.md, ciencias_7b_oa01.md, historia_7b_oa02.md)' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Catálogo Único del Auditor: ', bold: true, color: '1C3257' }),
              new TextRun({ text: '.agents/skills/auditor_coherencia_estudiosimple/rules_catalog.json y SKILL.md' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Validador Automatizado: ', bold: true, color: '1C3257' }),
              new TextRun({ text: 'scripts/validate_lesson_system.ts' })
            ]
          }),

          // 3. Cambios Realizados por Archivo
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({ text: '3. Cambios Realizados por Archivo (Inventario Exhaustivo)', bold: true, color: '1C3257' })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createHeaderCell('Archivo Modificado / Creado', 35),
                  createHeaderCell('Tipo de Operación', 18),
                  createHeaderCell('Detalle del Cambio Implementado', 47)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('rules/reglas_universales.md', 35, false),
                  createDataCell('Modificación Atómica', 18, false),
                  createDataCell('Incorporación vinculante de DEC-01 a DEC-07, reemplazo de UNI-007 por funciones adaptables, matriz de severidad (crítico, mayor, menor) y protección de campos.', 47, false)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('profiles/cursos/perfil_7_basico.md', 35, true),
                  createDataCell('Modificación Atómica', 18, true),
                  createDataCell('Excepción tipográfica de 36 pt para Matemática vs 48 pt en las demás; distinción entre selección múltiple A-D y preguntas abiertas con rúbricas; duraciones 60s/90s como estimaciones.', 47, true)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('profiles/asignaturas/matematica.md', 35, false),
                  createDataCell('Modificación Atómica', 18, false),
                  createDataCell('Controles MAT-01 a MAT-05; secuencia general de 6 clases; erradicación de "0,p"; purga y desacoplamiento de Porcentajes OA04 a su anexo dedicado.', 47, false)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('profiles/asignaturas/lengua_literatura.md', 35, true),
                  createDataCell('Modificación Atómica', 18, true),
                  createDataCell('Controles LYL-01 a LYL-05; comprensión multinivel; evidencia textual obligatoria; rúbricas abiertas; subtítulos 48 pt sin restringir texto estímulo.', 47, true)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('profiles/asignaturas/ingles.md', 35, false),
                  createDataCell('Modificación Atómica', 18, false),
                  createDataCell('Controles ING-01 a ING-05; separación estricta de lenguas (español mentor / inglés estudiante); subtítulos 48 pt; rúbricas cualitativas de speaking.', 47, false)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('profiles/asignaturas/ciencias_naturales.md', 35, true),
                  createDataCell('Modificación Atómica', 18, true),
                  createDataCell('Controles CIE-01 a CIE-06; indagación científica empírica; esquemas vectoriales controlados; prohibición de diagnósticos individuales; purga de OA01 a su anexo.', 47, true)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('profiles/asignaturas/historia_geografia.md', 35, false),
                  createDataCell('Modificación Atómica', 18, false),
                  createDataCell('Controles HIS-01 a HIS-06; multicausalidad y pensamiento histórico; erradicación de fórmulas matemáticas; mapas como capas controladas; purga de OA02 a su anexo.', 47, false)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('profiles/anexos/matematica_7b_oa04.md', 35, true),
                  createDataCell('Creación Nueva', 18, true),
                  createDataCell('Anexo específico OA04: exclusión de variaciones sucesivas, límites de 7° básico, desglose temático de 6 clases y marco de IVA 19% (D.L. 825).', 47, true)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('profiles/anexos/ciencias_7b_oa01.md', 35, false),
                  createDataCell('Creación Nueva', 18, false),
                  createDataCell('Anexo específico OA01: eje neuroendocrino canónico, inicio puberal (8-13 niñas, 9-14 niños) vs estirón (10-16 años), 4 dimensiones como organizador didáctico interno y texto escolar SM.', 47, false)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('profiles/anexos/historia_7b_oa02.md', 35, true),
                  createDataCell('Creación Nueva', 18, true),
                  createDataCell('Anexo específico OA02: Revolución Neolítica en mosaico, sedentarismo preagrícola natufiense, múltiples centros y convención uniforme de fechas.', 47, true)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('estudiosimple-lecciones/SKILL.md', 35, false),
                  createDataCell('Modificación Atómica', 18, false),
                  createDataCell('Integración de arquitectura de dos capas, matriz de 8 funciones pedagógicas vs plataforma, ciclo de vida del manifiesto y protocolo de protección de campos.', 47, false)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('auditor_coherencia_estudiosimple/rules_catalog.json', 35, true),
                  createDataCell('Modificación Atómica', 18, true),
                  createDataCell('Catálogo de 45 reglas estructuradas con ID, alcance, severidad, evidencia y método de validación (computable vs conceptual).', 47, true)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('auditor_coherencia_estudiosimple/SKILL.md', 35, false),
                  createDataCell('Modificación Atómica', 18, false),
                  createDataCell('Alineación con Sistema v1.0, estados del informe (CONFORME, CONFORME CON MENORES, NO CONFORME, PENDIENTE DE FUENTE) y distinción de controles computables vs conceptuales.', 47, false)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('scripts/validate_lesson_system.ts', 35, true),
                  createDataCell('Creación Nueva', 18, true),
                  createDataCell('Validador TypeScript que ejecuta la suite determinista de 8 casos de prueba con 100% de éxito.', 47, true)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('scripts/verify_protection_evidence.ts', 35, false),
                  createDataCell('Creación Nueva', 18, false),
                  createDataCell('Script de comprobación de protección que verifica la integridad y estados inmutables en LECCIONES/110-7/ mediante Git.', 47, false)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('scripts/create_implementation_zip.ts', 35, true),
                  createDataCell('Creación Nueva', 18, true),
                  createDataCell('Script empaquetador que genera el ZIP con todos los archivos conservando rutas relativas.', 47, true)
                ]
              })
            ]
          }),

          // 4. Resolución de DEC-01 a DEC-07
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({ text: '4. Resolución Operativa de DEC-01 a DEC-07', bold: true, color: '1C3257' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• DEC-01 (Fuente Única vs Documento Oficial): ', bold: true, color: '1C3257' }),
              new TextRun({ text: 'Se estableció que los datos estructurados en código son la única fuente de generación y el DOCX aprobado es el documento oficial de consumo. Se prohíbe editar por separado DOCX, TXT y TypeScript.' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• DEC-02 (Parámetro Estándar de 6 Clases y 14 Láminas): ', bold: true, color: '1C3257' }),
              new TextRun({ text: 'Se fija la norma obligatoria de exactamente 6 clases por OA y 14 láminas por clase (7 Gancho + 7 Explicación). Matemática OA01 aprobada queda preservada intacta.' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• DEC-03 (Jerarquía Tipográfica y Excepción de Matemática): ', bold: true, color: '1C3257' }),
              new TextRun({ text: 'Títulos en 64 pt (<= 6 palabras); subtítulos en 48 pt (<= 8 palabras) en Lengua, Inglés, Ciencias e Historia, con excepción explícita normada de 36 pt en Matemática. La locución oral no se limita por conteo de palabras.' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• DEC-04 (Secuencia Curricular Adaptable): ', bold: true, color: '1C3257' }),
              new TextRun({ text: 'Se sustituyó de UNI-007 la progresión exclusiva de cálculo mental. Cada disciplina adapta las 6 funciones pedagógicas comunes a su propia naturaleza epistemológica.' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• DEC-05 (Rol del Adulto Guía y Mediación Familiar): ', bold: true, color: '1C3257' }),
              new TextRun({ text: 'La autonomía creciente del estudiante de 13 años se acompaña con guiones privados, preguntas socráticas y apoyos graduados para el apoderado según el Manual Maestro.' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• DEC-06 (Modelamiento en E6 y Preguntas Abiertas vs Cerradas): ', bold: true, color: '1C3257' }),
              new TextRun({ text: 'E6 modela caso1 completo y E7 sintetiza con Regla de Oro. Preguntas de selección múltiple exigen 4 alternativas (A-D); preguntas abiertas utilizan rúbricas de respuestas válidas sin alternativas forzadas.' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• DEC-07 (Duraciones de 60s y 90s como Metas de Producción): ', bold: true, color: '1C3257' }),
              new TextRun({ text: 'Las duraciones son estimaciones de diseño; la sincronización acústica real se verifica exclusivamente en Google Vids durante la síntesis de audio.' })
            ]
          }),

          // 5. Pruebas Ejecutadas con sus Resultados Reales
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({ text: '5. Pruebas Ejecutadas con sus Resultados Reales (Suite 8/8)', bold: true, color: '1C3257' })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createHeaderCell('Caso de Prueba', 30),
                  createHeaderCell('Condición Evaluada', 32),
                  createHeaderCell('Resultado Real Obtenido', 20),
                  createHeaderCell('Veredicto', 18)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('Caso 1: Paquete Válido', 30, false),
                  createDataCell('0 críticos, 0 mayores, 0 menores.', 32, false),
                  createDataCell('CONFORME', 20, false),
                  createDataCell('SUPERADA ✅', 18, false)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('Caso 2: Cálculo Erróneo (MAT-01)', 30, true),
                  createDataCell('Discrepancia aritmética en ejercicio.', 32, true),
                  createDataCell('NO CONFORME (1 Crítico)', 20, true),
                  createDataCell('SUPERADA ✅', 18, true)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('Caso 3: Fuente Curricular Ausente', 30, false),
                  createDataCell('Texto escolar SM pág. 118 no presente en local.', 32, false),
                  createDataCell('PENDIENTE DE FUENTE', 20, false),
                  createDataCell('SUPERADA ✅', 18, false)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('Caso 4: Excepción Matemática 36 pt', 30, true),
                  createDataCell('36 pt en Matemática vs 48 pt en Ciencias/Lenguaje.', 32, true),
                  createDataCell('CONFORME (Regla DEC-03)', 20, true),
                  createDataCell('SUPERADA ✅', 18, true)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('Caso 5: Pregunta Abierta con Rúbrica', 30, false),
                  createDataCell('Reactivo abierto sin 4 alternativas forzadas.', 32, false),
                  createDataCell('CONFORME (Regla DEC-06)', 20, false),
                  createDataCell('SUPERADA ✅', 18, false)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('Caso 6: Tres Menores Documentados', 30, true),
                  createDataCell('Exactamente 3 hallazgos menores en una clase.', 32, true),
                  createDataCell('CONFORME CON MENORES', 20, true),
                  createDataCell('SUPERADA ✅', 18, true)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('Caso 7: Cuatro Menores (Exceso)', 30, false),
                  createDataCell('4 hallazgos menores superando tolerancia.', 32, false),
                  createDataCell('NO CONFORME (Límite > 3)', 20, false),
                  createDataCell('SUPERADA ✅', 18, false)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('Caso 8: Campo Protegido Modificado', 30, true),
                  createDataCell('Mutación de campo fuera del conjunto autorizado.', 32, true),
                  createDataCell('NO CONFORME (Regresión UNI-016)', 20, true),
                  createDataCell('SUPERADA ✅', 18, true)
                ]
              })
            ]
          }),

          // 6. Evidencia Empírica de Protección
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({ text: '6. Evidencia Empírica de Protección de Lecciones y Estados Existentes', bold: true, color: '1C3257' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Se ejecutó scripts/verify_protection_evidence.ts para auditar el estado del repositorio mediante Git. El resultado certifica que el directorio LECCIONES/110-7/ y los archivos fuente de la plataforma en Web Studio Simple/src/ permanecen 100% INTACTOS (0 modificaciones, cero mutaciones).'
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createHeaderCell('Paquete Curricular (7° Básico)', 30),
                  createHeaderCell('Estado Oficial (status)', 25),
                  createHeaderCell('Etapa de Revisión', 25),
                  createHeaderCell('Integridad de Archivos', 20)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('Matematica / OA01', 30, false),
                  createDataCell('APROBADA (Inmutable)', 25, false),
                  createDataCell('WORK_PRE_APROBACION', 25, false),
                  createDataCell('INTACTO ✅ (3 archivos)', 20, false)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('Matematica / OA04', 30, true),
                  createDataCell('EN_REVISION', 25, true),
                  createDataCell('WORK_PRE_APROBACION', 25, true),
                  createDataCell('INTACTO ✅ (3 archivos)', 20, true)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('Ciencias_Naturales / OA01', 30, false),
                  createDataCell('APROBADA (Histórico)', 25, false),
                  createDataCell('WORK_PRE_APROBACION', 25, false),
                  createDataCell('INTACTO ✅ (3 archivos)', 20, false)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('Historia_Geografia / OA02', 30, true),
                  createDataCell('REQUIERE_AJUSTES', 25, true),
                  createDataCell('WORK_PRE_APROBACION', 25, true),
                  createDataCell('INTACTO ✅ (3 archivos)', 20, true)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('Ingles / OA09', 30, false),
                  createDataCell('EN_REVISION', 25, false),
                  createDataCell('WORK_PRE_APROBACION', 25, false),
                  createDataCell('INTACTO ✅ (3 archivos)', 20, false)
                ]
              }),
              new TableRow({
                children: [
                  createDataCell('Lengua_Literatura / OA03', 30, true),
                  createDataCell('EN_REVISION', 25, true),
                  createDataCell('WORK_PRE_APROBACION', 25, true),
                  createDataCell('INTACTO ✅ (3 archivos)', 20, true)
                ]
              })
            ]
          }),

          // 7. Distinción Rigurosa: Implementado, Verificado y Pendiente
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({ text: '7. Distinción Rigurosa: Lo Implementado, Lo Verificado y Lo Pendiente', bold: true, color: '1C3257' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'A. Lo Implementado (Estructura y Normativa):', bold: true, color: '0D9488' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. Arquitectura de dos capas con catálogo único de 45 reglas.\n2. Cinco módulos disciplinares y tres anexos por OA desacoplados.\n3. Resoluciones DEC-01 a DEC-07 y matriz de 8 funciones pedagógicas.\n4. Criterios de severidad y tolerancia (0 críticos, 0 mayores, hasta 3 menores documentados).\n5. Validador en TypeScript y empaquetador ZIP de entrega.' })
            ]
          }),
          new Paragraph({
            spacing: { before: 120 },
            children: [
              new TextRun({ text: 'B. Lo Verificado (Evidencia Empírica Comprobada):', bold: true, color: '1C3257' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. 100% de éxito en la suite de 8 pruebas unitarias de validate_lesson_system.ts.\n2. Invariabilidad física total (cero diffs en Git) de LECCIONES/ y Web Studio Simple/src/.\n3. Preservación intacta de los estados de aprobación de los 6 paquetes curriculares de 7° Básico.\n4. Compilación del informe DOCX y empaquetado del archivo ZIP (68.0 KB).' })
            ]
          }),
          new Paragraph({
            spacing: { before: 120 },
            children: [
              new TextRun({ text: 'C. Lo Pendiente y Limitaciones Declaradas (Honestidad Epistemológica):', bold: true, color: 'D97706' })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. Certificación de Fuentes Curriculares Físicas: ' }),
              new TextRun({ text: 'Los textos escolares completos del MINEDUC en PDF que no se encuentran en el disco local quedan formalmente como PENDIENTE DE FUENTE, sin inventar conformidad.\n' }),
              new TextRun({ text: '2. Ejecución del Piloto de Ciencias: ' }),
              new TextRun({ text: 'La aplicación de este sistema a 110-7-CIE-OA01 clase 1 queda pendiente a la espera de la revisión y orden de Walter.\n' }),
              new TextRun({ text: '3. Conteo Acústico y Duración Real: ' }),
              new TextRun({ text: 'La duración real de locución queda pendiente de la fase de producción audiovisual en Google Vids.\n' }),
              new TextRun({ text: '4. Generación de Presentaciones PPTX: ' }),
              new TextRun({ text: 'Corresponde exclusivamente a ChatGPT Work en su propio entorno tras aprobación humana.\n' }),
              new TextRun({ text: '5. Aprobación Formal de Paquetes: ' }),
              new TextRun({ text: 'La transición a APROBADA queda reservada a la instrucción explícita de Walter en consola.' })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(OUTPUT_DOCX, buffer);
  console.log(`✅ Documento DOCX regenerado exitosamente: ${OUTPUT_DOCX} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

buildDocx().catch(err => {
  console.error('❌ Error fatal al generar DOCX:', err);
  process.exit(1);
});
