import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  ShadingType,
  Packer,
  BorderStyle,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
  HeadingLevel
} from 'docx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '../..');
const destDirManual = path.resolve(rootDir, 'MANUAL MAESTRO');
const destDirJefatura = path.resolve(rootDir, 'ENTREGA_JEFATURA_ESTUDIOSIMPLE_7B/01_INFORME_EJECUTIVO');

[destDirManual, destDirJefatura].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const fileName = 'Informe_de_contraste_Manual_Maestro_y_avance_2026-10-02.docx';
const pathManual = path.join(destDirManual, fileName);
const pathJefatura = path.join(destDirJefatura, fileName);

// Paleta Corporativa Oficial (Manual Maestro Apartado 12)
const COLOR_AZUL_OSCURO = '1C3257';
const COLOR_TURQUESA = '12A1A4';
const COLOR_NARANJO = 'EE751C';
const COLOR_AMARILLO = 'F8AD22';
const COLOR_VERDE = '2E7D32';
const COLOR_ROJO = 'C62828';
const COLOR_GRIS_TEXTO = '2D3748';
const COLOR_GRIS_FONDO = 'F8FAFC';
const COLOR_BORDE = 'CBD5E1';

function createHeaderCell(text: string, widthPercent: number, bgHex: string = COLOR_AZUL_OSCURO): TableCell {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: bgHex },
    margins: { top: 120, bottom: 120, left: 140, right: 140 },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: COLOR_BORDE },
      bottom: { style: BorderStyle.SINGLE, size: 12, color: COLOR_TURQUESA },
      left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDE },
      right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDE }
    },
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({
            text,
            bold: true,
            color: 'FFFFFF',
            font: 'Arial',
            size: 18
          })
        ]
      })
    ]
  });
}

function createBodyCell(
  paragraphs: Paragraph[],
  widthPercent: number,
  bgHex?: string,
  align: AlignmentType = AlignmentType.LEFT
): TableCell {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: bgHex ? { type: ShadingType.CLEAR, fill: bgHex } : undefined,
    margins: { top: 100, bottom: 100, left: 130, right: 130 },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDE },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDE },
      left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDE },
      right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDE }
    },
    children: paragraphs
  });
}

function createTextP(
  text: string,
  options: { bold?: boolean; color?: string; size?: number; align?: AlignmentType; spacingAfter?: number; spacingBefore?: number } = {}
): Paragraph {
  return new Paragraph({
    alignment: options.align ?? AlignmentType.LEFT,
    spacing: {
      before: options.spacingBefore ?? 60,
      after: options.spacingAfter ?? 60,
      line: 260
    },
    children: [
      new TextRun({
        text,
        bold: options.bold ?? false,
        color: options.color ?? COLOR_GRIS_TEXTO,
        font: 'Arial',
        size: options.size ?? 21
      })
    ]
  });
}

function createHeading(title: string, level: HeadingLevel = HeadingLevel.HEADING_1): Paragraph {
  const isH1 = level === HeadingLevel.HEADING_1;
  const isH2 = level === HeadingLevel.HEADING_2;
  return new Paragraph({
    heading: level,
    spacing: {
      before: isH1 ? 260 : 180,
      after: isH1 ? 120 : 80
    },
    children: [
      new TextRun({
        text: title,
        bold: true,
        font: 'Arial',
        color: isH1 ? COLOR_AZUL_OSCURO : COLOR_TURQUESA,
        size: isH1 ? 28 : isH2 ? 24 : 22
      })
    ]
  });
}

function getStatusBadge(status: string): { bgHex: string; textHex: string } {
  switch (status) {
    case 'Conforme':
      return { bgHex: 'E8F5E9', textHex: '2E7D32' };
    case 'Parcialmente conforme':
      return { bgHex: 'FFF9C4', textHex: 'F57F17' };
    case 'En conflicto':
      return { bgHex: 'FFEBEE', textHex: 'C62828' };
    case 'Pendiente de implementación':
      return { bgHex: 'E3F2FD', textHex: '1565C0' };
    case 'Sin evidencia suficiente':
      return { bgHex: 'EDE7F6', textHex: '4A148C' };
    case 'No revisado':
      return { bgHex: 'ECEFF1', textHex: '455A64' };
    case 'No aplica al alcance revisado':
    default:
      return { bgHex: 'F5F5F5', textHex: '616161' };
  }
}

async function generateDocx() {
  console.log('Generando documento Word oficial segun instrucciones...');

  // Seccion 4: Matriz de Contraste (Items evaluados con rigurosidad factual)
  const matrixData = [
    {
      apartado: '1. Qué es EstudioSimple (1.1 a 1.5)',
      definicion: 'Plataforma para Exámenes Libres que organiza el aprendizaje en una ruta completa. Dos espacios digitales coordinados: adulto con guion paso a paso y estudiante con recursos activos sincronizados.',
      evidencia: 'Web Studio Simple/src/components/lesson/adult/AdultLessonView.tsx y student/StudentLessonView.tsx; LessonSyncContext.tsx.',
      estado: 'Conforme',
      diferencia: 'Implementación total y operativa. El adulto dispone de guiones DILE, apoyos socráticos y control de video; el estudiante visualiza únicamente contenido didáctico sin sobrecarga docente.',
      impacto: 'Garantiza la promesa fundacional de permitir la conducción del aprendizaje en el hogar sin requerir conocimientos pedagógicos previos.',
      accion: 'Mantener la sincronización dual en todas las asignaturas.'
    },
    {
      apartado: '2, 3, 4, 5. Principios, Misión y Valores',
      definicion: 'Comprensión antes que memorización, accesibilidad educativa y empoderamiento de las familias. Trato respetuoso no infantilizante y uso del error como información formativa.',
      evidencia: 'Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase01.ts; StudentLessonView.tsx.',
      estado: 'Conforme',
      diferencia: 'El diseño instruccional descompone los conceptos en movimientos mentales guiados con pistas socráticas graduadas. No existen castigos ni penalizaciones por error.',
      impacto: 'Fomenta la seguridad emocional y autonomía del estudiante en el hogar.',
      accion: 'Preservar invariantes en nuevas secuencias didácticas.'
    },
    {
      apartado: '7. Modelo del sistema EstudioSimple',
      definicion: 'Sistema articulado con espacio del adulto, espacio del estudiante, materiales de apoyo y comunicación en tiempo real.',
      evidencia: 'Web Studio Simple/src/context/LessonSyncContext.tsx; Web Studio Simple/src/lib/video-utils.ts.',
      estado: 'Conforme',
      diferencia: 'Arquitectura SPA React con sincronización de estado, modo compartido, reproductor de video universal y respaldo local.',
      impacto: 'Experiencia fluida en cualquier dispositivo (computador, tablet o celular).',
      accion: 'Completar pruebas de estrés de sincronización en conexiones lentas.'
    },
    {
      apartado: '12. Identidad visual y sistema documental',
      definicion: 'Paleta corporativa oficial: Azul Oscuro (#1C3257), Turquesa (#12A1A4), Naranjo (#EE751C), Amarillo (#F8AD22) y Gris Texto. Tipografía Arial y Nunito sin distractores.',
      evidencia: 'Web Studio Simple/tailwind.config.js; Web Studio Simple/src/index.css.',
      estado: 'Conforme',
      diferencia: 'Alineación estricta de tokens de color y fuentes en todas las vistas de la aplicación.',
      impacto: 'Consistencia de marca y legibilidad óptima para estudiantes y apoderados.',
      accion: 'Verificar contraste en pantallas de bajo brillo.'
    },
    {
      apartado: '14. Roles del adulto y del estudiante',
      definicion: 'El adulto conduce la sesión mediante instrucciones orales y apoyos; el estudiante observa, responde, practica en cuaderno y manipula simuladores.',
      evidencia: 'AdultLessonView.tsx (bloques DILE, PREGUNTALE, SOLO PARA TI); StudentLessonView.tsx.',
      estado: 'Conforme',
      diferencia: 'División de roles rigurosa. Ningún elemento docente confidencial o pista interna se filtra a la vista del estudiante.',
      impacto: 'Respeta la mediación parental sin generar dependencia técnica.',
      accion: 'Auditar que las nuevas lecciones mantengan la etiqueta SOLO PARA TI.'
    },
    {
      apartado: '15. Estructura y secuencia de la clase',
      definicion: 'Secuencia canónica obligatoria en 8 pasos: 1) Preparación, 2) Conexión y Situación Inicial, 3) Video Gancho, 4) Conversación Guiada, 5) Video Explicativo e Idea Clave, 6) Práctica Guiada, 7) Comprobación/Miniquiz y Refuerzo, 8) Cierre y Metacognición.',
      evidencia: 'LessonEditorView.tsx; matematica_7b_oa01_clase01.ts; matematica_7b_oa01_clase02.ts; lesson-adapter.ts.',
      estado: 'Conforme',
      diferencia: 'La estructura de 8 pasos está formalizada en el código fuente, en el editor CMS y en el aula interactiva, con progresión de 26 momentos pedagógicos.',
      impacto: 'Asegura predictibilidad pedagógica y rigor metodológico en cada sesión.',
      accion: 'Asegurar que toda lección importada cumpla con los 8 pasos completos.'
    },
    {
      apartado: '16. Diseño curricular (Temarios EELL 3° a 8°)',
      definicion: 'Cobertura integral de las Bases Curriculares y temarios oficiales de Exámenes Libres del MINEDUC para los niveles 3° a 8° básico en las 5 asignaturas fundamentales.',
      evidencia: 'Web Studio Simple/public/data/injected_lessons_all_grades.json; injected_lessons_7b.json; lesson-generator.ts.',
      estado: 'Parcialmente conforme',
      diferencia: '7° básico (Matemática OA01) cuenta con clases canónicas completas (Clase 1 y 2) con prompts, diapositivas y guiones. Los restantes niveles (3° a 8° básico) cuentan con estructura inyectada y generador paramétrico para 628 OAs, pero requieren desarrollo artesanal lección por lección.',
      impacto: 'El alcance operativo inmediato cubre 7° básico; la escala completa requiere avance secuencial de producción académica.',
      accion: 'Priorizar calendario de desarrollo curricular iniciando por 7° básico y luego expandir a 8° y niveles de básica.'
    },
    {
      apartado: '17 y 18. Estándares y recursos educativos',
      definicion: 'Presupuesto temporal estricto: Video Gancho de 60 segundos (~130 palabras, 7 láminas) y Video Explicativo de 90 segundos (~195 palabras, 7 láminas). Overlays limpios sin texto IA. Delimitación estricta: Antigravity genera DOCX oficial; ChatGPT Work genera presentaciones PPTX finales.',
      evidencia: 'Web Studio Simple/src/lib/lesson-generator.ts (buildHookPromptText y buildExplicativoPromptText); video-utils.ts.',
      estado: 'Conforme',
      diferencia: 'Los generadores de prompts implementan la estructura hexapartita por diapositiva con conteo de palabras y calibración de locución para Google Vids. La delimitación técnica DOCX vs PPTX está blindada en AGENTS.md.',
      impacto: 'Estandarización industrial de la calidad gráfica y acústica de las cápsulas audiovisuales.',
      accion: 'Continuar exportación de planes maestros en DOCX para ingesta en ChatGPT Work.'
    },
    {
      apartado: '19. Evaluación y seguimiento',
      definicion: 'Evaluación formativa durante la sesión (miniquiz de 4 alternativas con distractores justificados) y preparación formal para examen libre (ensayos acumulativos con temporizador y reporte por eje).',
      evidencia: 'Web Studio Simple/src/components/student/FormalExamSimulator.tsx; StudentLessonView.tsx.',
      estado: 'Conforme',
      diferencia: 'Implementado simulador formal tipo MINEDUC con 4 alternativas y retroalimentación pedagógica, además del miniquiz de 3 a 5 preguntas al cierre de cada lección.',
      impacto: 'Prepara al estudiante para el rigor psicométrico real del examen libre presencial.',
      accion: 'Enriquecer el banco de ítems de evaluación con rúbricas de respuesta abierta.'
    },
    {
      apartado: '20, 21, 22. Producto, usuarios y modelo',
      definicion: 'Enfoque en familias que educan en casa, apoderados trabajadores y estudiantes que requieren ritmo adaptativo. Modelo de suscripción accesible y Progressive Web App.',
      evidencia: 'Web Studio Simple/src/components/parent/ParentDashboard.tsx; StudentDashboard.tsx; AppContext.tsx.',
      estado: 'Conforme',
      diferencia: 'Paneles de apoderado y estudiante diferenciados, acceso rápido a asignaturas y diseño sin fricciones de inicio de sesión.',
      impacto: 'Adopción sencilla y alta retención familiar.',
      accion: 'Incorporar reportes semanales de progreso por correo electrónico para apoderados.'
    },
    {
      apartado: '27 y 28. Control de calidad y validación empírica',
      definicion: 'Validación en terreno con familias reales de homeschooling para medir tiempos de sesión, comprensión, usabilidad de la pantalla y fatiga cognitiva.',
      evidencia: 'memoria/2026-09-15_20-25_Auditoria_Funcional_Prototipo_Clase1.md (auditoría interna); ausencia de actas de sesiones familiares externas.',
      estado: 'Sin evidencia suficiente',
      diferencia: 'Existen registros de pruebas técnicas y funcionales del equipo de desarrollo, pero no se adjuntaron al repositorio actas o datos de sesiones de prueba con apoderados y estudiantes reales.',
      impacto: 'Riesgo de desajuste entre los supuestos de usabilidad y el comportamiento efectivo en el hogar.',
      accion: 'Ejecutar piloto controlado con una cohorte de 5 a 10 familias homeschoolers y registrar los resultados según pauta.'
    }
  ];

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Arial',
            size: 21,
            color: COLOR_GRIS_TEXTO
          },
          paragraph: {
            spacing: { line: 260 }
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              bottom: 1440,
              left: 1440,
              right: 1440
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { after: 120 },
                children: [
                  new TextRun({
                    text: 'EstudioSimple · Informe de Contraste Manual Maestro vs Avance',
                    font: 'Arial',
                    size: 16,
                    color: '718096'
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Página ',
                    font: 'Arial',
                    size: 16,
                    color: '718096'
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    font: 'Arial',
                    size: 16,
                    color: '718096'
                  }),
                  new TextRun({
                    text: ' de ',
                    font: 'Arial',
                    size: 16,
                    color: '718096'
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    font: 'Arial',
                    size: 16,
                    color: '718096'
                  })
                ]
              })
            ]
          })
        },
        children: [
          // Portada / Encabezado Ejecutivo
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({
                text: 'INFORME DE CONTRASTE ENTRE EL MANUAL MAESTRO Y EL AVANCE ACADÉMICO, DEL PROTOTIPO Y DE LA VALIDACIÓN',
                bold: true,
                font: 'Arial',
                size: 32,
                color: COLOR_AZUL_OSCURO
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: 'Documento oficial para la revisión de responsabilidades, estado de avance y actualización del Plan Maestro de Ejecución',
                font: 'Arial',
                size: 22,
                color: COLOR_TURQUESA,
                italics: true
              })
            ]
          }),

          // 1. Identificación del análisis
          createHeading('1. Identificación del Análisis', HeadingLevel.HEADING_1),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createHeaderCell('Parámetro', 30),
                  createHeaderCell('Detalle Verificado', 70)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Fecha del análisis', { bold: true })], 30, COLOR_GRIS_FONDO),
                  createBodyCell([createTextP('2 de octubre de 2026')], 70)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Herramienta utilizada', { bold: true })], 30, COLOR_GRIS_FONDO),
                  createBodyCell([createTextP('Antigravity AI Engine (Google DeepMind) en entorno de desarrollo local')], 70)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Documento rector', { bold: true })], 30, COLOR_GRIS_FONDO),
                  createBodyCell([createTextP('Manual Maestro de EstudioSimple · Versión 2.0 (1 de octubre de 2026)')], 70)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Instructivo rector', { bold: true })], 30, COLOR_GRIS_FONDO),
                  createBodyCell([createTextP('Instrucciones para analizar el Manual Maestro y contrastarlo con el avance del proyecto (1 de octubre de 2026)')], 70)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Archivos recibidos y abiertos', { bold: true })], 30, COLOR_GRIS_FONDO),
                  createBodyCell([
                    createTextP('1. MANUAL MAESTRO/Manual Maestro.docx (Versión 2.0, 1 oct 2026)\n2. MANUAL MAESTRO/Instrucciones_analisis_Manual_Maestro_y_avance_EstudioSimple.docx (1 oct 2026)\n3. Web Studio Simple/src/ (código fuente React + TypeScript del prototipo)\n4. Web Studio Simple/src/data/lessons/ (lecciones canónicas de 7° básico)\n5. Web Studio Simple/public/data/injected_lessons_*.json (inyección curricular de 3° a 8° básico)\n6. memoria/ (bitácoras técnicas y registros de cambios)')
                  ], 70)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Archivos no revisados / no entregados', { bold: true })], 30, COLOR_GRIS_FONDO),
                  createBodyCell([
                    createTextP('Actas y grabaciones de sesiones de validación empírica con familias homeschoolers reales (no disponibles en el repositorio local).')
                  ], 70)
                ]
              })
            ]
          }),

          // 2. Resumen ejecutivo
          createHeading('2. Resumen Ejecutivo', HeadingLevel.HEADING_1),
          createTextP('El presente informe contrastó de manera independiente y verificable el Manual Maestro Versión 2.0 (1 de octubre de 2026) con la evidencia de desarrollo académico, producto digital (prototipo web) y validación existentes en el repositorio del proyecto EstudioSimple.', { spacingAfter: 100 }),
          createTextP('Principales Coincidencias Comprobadas:', { bold: true, color: COLOR_AZUL_OSCURO }),
          createTextP('1. El modelo pedagógico dual (pantalla del adulto con guion paso a paso DILE/PREGÚNTALE y pantalla del estudiante con recursos visuales y actividades) se encuentra 100% implementado y operativo en el prototipo.'),
          createTextP('2. La estructura canónica de la lección en 8 pasos con 26 momentos pedagógicos está fielmente plasmada en el código fuente, en el editor CMS y en las lecciones maestras de 7° básico.'),
          createTextP('3. El principio de comprensión antes que memorización se traduce en preguntas de razonamiento, pistas socráticas graduadas y un simulador de examen libre con 4 alternativas y justificación de distractores.'),
          createTextP('4. Los estándares audiovisuales (video gancho de 60 segundos y video explicativo de 90 segundos con estructura hexapartita y overlays vectoriales limpios sin texto IA) están codificados en los generadores automáticos de prompts.'),
          createTextP('5. El reproductor multimedia cuenta con resolución universal blindada para Cloudflare Stream, Cloudflare R2 (.mp4 directo), YouTube, Vimeo y Google Drive, sin fallas por CORS.'),

          createTextP('Conflictos y Brechas Identificadas:', { bold: true, color: COLOR_NARANJO, spacingBefore: 120 }),
          createTextP('1. Cobertura Curricular Parcial: Aunque el catálogo completo de 628 OAs de 3° a 8° básico está estructurado en base de datos e inyección JSON, solo Matemática 7° básico OA 01 dispone de lecciones maestras de alta densidad desarrolladas íntegramente. Las restantes asignaturas y niveles requieren avance en la producción de guiones y recursos.'),
          createTextP('2. Validación Empírica Externa: No se encontraron en el repositorio registros de pruebas en terreno con familias reales de homeschooling. Las pruebas existentes corresponden a auditorías funcionales internas del equipo.'),

          createTextP('Decisiones Requeridas:', { bold: true, color: COLOR_TURQUESA, spacingBefore: 120 }),
          createTextP('1. Aprobar el cronograma de producción académica priorizando 7° básico en sus 5 asignaturas antes de expandir horizontalmente a otros grados.'),
          createTextP('2. Formalizar el plan de validación en terreno con una cohorte piloto de 5 a 10 familias homeschoolers.'),
          createTextP('3. Ratificar la delimitación de herramientas: Antigravity compila el DOCX oficial del Plan Maestro y ChatGPT Work genera las presentaciones PPTX finales.'),

          // 3. Inventario del avance comprobado
          createHeading('3. Inventario del Avance Comprobado', HeadingLevel.HEADING_1),
          createTextP('A continuación se detallan los productos concretos terminados, en desarrollo y pendientes, expresados en cantidades verificables sin porcentajes especulativos:', { spacingAfter: 100 }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createHeaderCell('Área / Componente', 25),
                  createHeaderCell('Entregables Terminados', 30),
                  createHeaderCell('Entregables en Desarrollo', 25),
                  createHeaderCell('Entregables Pendientes', 20)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Documentación Rectora', { bold: true })], 25, COLOR_GRIS_FONDO),
                  createBodyCell([createTextP('Manual Maestro v2.0 oficial (29 capítulos); Instructivo de análisis de avance; Normas de gobernanza ACI/SDD.')], 30),
                  createBodyCell([createTextP('Plan Maestro de Ejecución (en actualización).')], 25),
                  createBodyCell([createTextP('Manual de operaciones de soporte familiar.')], 20)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Producción Académica (Lecciones)', { bold: true })], 25, COLOR_GRIS_FONDO),
                  createBodyCell([createTextP('Matemática 7° Básico OA 01 Clases 1 y 2 (100% completas con 26 etapas cada una); Plantillas y prompts de Lengua OA3, Ciencias OA1, Historia OA2 e Inglés OA9.')], 30),
                  createBodyCell([createTextP('Matemática 7° Básico OA 01 Clases 3 a 6 (paquetes base generados).')], 25),
                  createBodyCell([createTextP('Desarrollo artesanal de clases para 3° a 6° básico y 8° básico.')], 20)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Prototipo Digital (Aplicación Web)', { bold: true })], 25, COLOR_GRIS_FONDO),
                  createBodyCell([createTextP('Aula Interactiva Dual (Adulto y Estudiante); Sincronización en vivo; Editor CMS de 8 pasos; Visor universal de video; Simulador de examen libre; Dashboards apoderado/alumno.')], 30),
                  createBodyCell([createTextP('Optimizaciones PWA offline y reportes automáticos.')], 25),
                  createBodyCell([createTextP('App móvil nativa en tiendas (prevista para fase posterior).')], 20)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Validación con Usuarios', { bold: true })], 25, COLOR_GRIS_FONDO),
                  createBodyCell([createTextP('Auditorías técnicas y pedagógicas internas documentadas en memoria/.')], 30),
                  createBodyCell([createTextP('Pauta de observación de campo.')], 25),
                  createBodyCell([createTextP('Sesiones de prueba con familias reales y análisis de resultados.')], 20)
                ]
              })
            ]
          }),

          // 4. Matriz de Contraste
          createHeading('4. Matriz de Contraste (Manual Maestro vs Evidencia)', HeadingLevel.HEADING_1),
          createTextP('Esta matriz evalúa punto por punto los apartados rectores del Manual Maestro frente a la evidencia observable en el repositorio:', { spacingAfter: 100 }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createHeaderCell('Apartado del Manual', 15),
                  createHeaderCell('Definición o Estándar', 20),
                  createHeaderCell('Evidencia Revisada', 17),
                  createHeaderCell('Estado', 12),
                  createHeaderCell('Diferencia Observada', 14),
                  createHeaderCell('Impacto', 11),
                  createHeaderCell('Acción o Decisión', 11)
                ]
              }),
              ...matrixData.map((item) => {
                const badge = getStatusBadge(item.estado);
                return new TableRow({
                  children: [
                    createBodyCell([createTextP(item.apartado, { bold: true, size: 17 })], 15),
                    createBodyCell([createTextP(item.definicion, { size: 17 })], 20),
                    createBodyCell([createTextP(item.evidencia, { size: 16, color: '4A5568' })], 17),
                    createBodyCell(
                      [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: item.estado,
                              bold: true,
                              color: badge.textHex,
                              font: 'Arial',
                              size: 16
                            })
                          ]
                        })
                      ],
                      12,
                      badge.bgHex
                    ),
                    createBodyCell([createTextP(item.diferencia, { size: 17 })], 14),
                    createBodyCell([createTextP(item.impacto, { size: 17 })], 11),
                    createBodyCell([createTextP(item.accion, { size: 17, bold: true, color: COLOR_AZUL_OSCURO })], 11)
                  ]
                });
              })
            ]
          }),

          // 5. Estado de la producción académica
          createHeading('5. Estado de la Producción Académica', HeadingLevel.HEADING_1),
          createTextP('Desglose verificable según los archivos existentes en el proyecto:'),
          createTextP('Nivel 7° Básico (Enfoque Prioritario):', { bold: true, color: COLOR_AZUL_OSCURO }),
          createTextP('• Matemática OA 01 (Números Enteros):'),
          createTextP('  - Clase 1 (Ubicación en relación al punto de referencia): 100% terminada, con 26 etapas pedagógicas interactivas, guion para adulto, video gancho y video explicativo integrados.'),
          createTextP('  - Clase 2 (Recta numérica y orden en Z): 100% terminada, con 26 etapas pedagógicas y recursos didácticos interactivos.'),
          createTextP('  - Clases 3 a 6: Estructura base generada con diapositivas, prompts ChatGPT Work y miniquizzes listos en el catálogo inyectado.'),
          createTextP('• Otras Asignaturas de 7° Básico:'),
          createTextP('  - Lengua y Literatura OA 03 (El Viaje del Héroe): Clase 1 generada con 7 diapositivas de gancho y 7 diapositivas explicativas.'),
          createTextP('  - Ciencias Naturales OA 01 (Sexualidad y Dimensiones): Clase 1 generada con 7 diapositivas de gancho y 7 explicativas.'),
          createTextP('  - Historia, Geografía y Ciencias Sociales OA 02 (Revolución Neolítica): Clase 1 generada con 7 diapositivas de gancho y 7 explicativas.'),
          createTextP('  - Inglés EFL OA 09 (The Narrative Mountain): Clase 1 generada con 7 diapositivas de gancho y 7 explicativas.'),
          createTextP('Niveles de 3° a 6° Básico y 8° Básico:', { bold: true, color: COLOR_AZUL_OSCURO, spacingBefore: 100 }),
          createTextP('• Existe catálogo curricular completo con 628 OAs inyectados en la base de datos y archivos JSON de la aplicación (injected_lessons_all_grades.json). El motor de generación de lecciones permite crear el andamiaje de cualquier OA en segundos, quedando pendiente la curaduría fina y validación de contenidos específicos.'),

          // 6. Estado del prototipo
          createHeading('6. Estado del Prototipo Digital', HeadingLevel.HEADING_1),
          createTextP('Funciones Implementadas y Operativas:', { bold: true, color: COLOR_AZUL_OSCURO }),
          createTextP('1. Aula Interactiva Sincronizada: Permite que el adulto y el estudiante utilicen dispositivos independientes o una pantalla compartida, manteniendo el avance y el estado de la sesión en tiempo real.'),
          createTextP('2. Editor de Lecciones (CMS Admin): Permite al equipo pedagógico editar cada uno de los 8 pasos, previsualizar videos y diapositivas, exportar prompts a ChatGPT Work y exportar el Plan Maestro a DOCX con un clic.'),
          createTextP('3. Reproductor Universal de Video: Detección y reproducción sin fallos de CORS para Cloudflare Stream, Cloudflare R2 (.mp4), YouTube, Vimeo y Google Drive.'),
          createTextP('4. Simulador Formal de Exámenes Libres: Módulo de evaluación con formato oficial tipo MINEDUC (4 alternativas, reloj temporizador, desglose por eje temático y retroalimentación sin penalizaciones).'),
          createTextP('5. Dashboards para Apoderado y Estudiante: Panel del apoderado con cápsulas de audio y recursos; panel del estudiante con avatar, rutas de aprendizaje y puntos de curiosidad.'),
          createTextP('Incidencias Resueltas Recientemente:', { bold: true, color: COLOR_AZUL_OSCURO, spacingBefore: 100 }),
          createTextP('• Eliminación de fallas por CORS en archivos multimedia mediante el retiro del atributo crossOrigin="anonymous".'),
          createTextP('• Corrección de regresiones por cadenas vacías en URLs de video que provocaban reasignación fantasma de videos de fábrica.'),

          // 7. Estado de la validación
          createHeading('7. Estado de la Validación', HeadingLevel.HEADING_1),
          createTextP('Auditorías Técnicas Internas:', { bold: true, color: COLOR_AZUL_OSCURO }),
          createTextP('• El código fuente cuenta con validación estricta de compilación en TypeScript (código de salida 0 en tsc y vite build) y 100% de pase en pruebas unitarias de resolución multimedia.'),
          createTextP('Validación con Usuarios Finales (Familias):', { bold: true, color: COLOR_NARANJO }),
          createTextP('• Estado: Pendiente de implementación / Sin evidencia suficiente en repositorio.'),
          createTextP('• Diagnóstico: No se dispone en el repositorio de grabaciones, encuestas ni métricas cuantitativas derivadas de sesiones reales con familias que educan en casa en Santiago o regiones.'),
          createTextP('• Tarea Pendiente: Estructurar un piloto de campo con 5 a 10 familias que evalúe: 1) Claridad del guion DILE para el adulto; 2) Comprensión real del estudiante en la práctica en cuaderno; 3) Duración real de la sesión (máximo 30-40 minutos); y 4) Nivel de fatiga o engagement.'),

          // 8. Conflictos que requieren decisión conjunta
          createHeading('8. Conflictos que Requieren Decisión Conjunta', HeadingLevel.HEADING_1),
          createTextP('Los siguientes puntos requieren acuerdo formal de coordinación técnica y pedagógica:', { spacingAfter: 100 }),
          createTextP('1. Alcance del Lanzamiento Inicial (Lanzamiento Focalizado vs Multicapacidad):', { bold: true }),
          createTextP('El Manual Maestro v2.0 proyecta cobertura de 3° a 8° básico. Sin embargo, el prototipo tiene profundidad pedagógica acabada (lecciones de 26 momentos con guiones completos) en 7° básico. Se recomienda decidir si el producto mínimo viable (MVP) de lanzamiento al mercado se concentrará exclusivamente en 7° básico o si se lanzará con cobertura básica en todos los grados.'),
          createTextP('2. Pipeline de Producción Audiovisual:', { bold: true, spacingBefore: 80 }),
          createTextP('Alinear tiempos entre la exportación de planes maestros en DOCX por Antigravity y la generación de láminas y locución con Google Vids en ChatGPT Work.'),
          createTextP('3. Estrategia de Ingesta y Hosting Multimedia:', { bold: true, spacingBefore: 80 }),
          createTextP('Formalizar si el repositorio principal de videos finales será Cloudflare Stream (con player embebido) o Cloudflare R2 (archivos MP4 directos), considerando costos de ancho de banda y velocidad de reproducción en dispositivos móviles de gama media.'),

          // 9. Información y documentos faltantes
          createHeading('9. Información y Documentos Faltantes', HeadingLevel.HEADING_1),
          createTextP('Para completar la revisión y cerrar brechas documentales se requiere:'),
          createTextP('1. Actas o pautas de retroalimentación de sesiones piloto realizadas con familias reales.'),
          createTextP('2. Archivos finales exportados de audio podcast para la Escuela de Mentores (formato MP3/AAC).'),
          createTextP('3. Plan Maestro de Ejecución actualizado con fechas de entrega por hito y responsables definidos.'),

          // 10. Anexo de fuentes
          createHeading('10. Anexo de Fuentes Consultadas', HeadingLevel.HEADING_1),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createHeaderCell('Archivo / Documento', 35),
                  createHeaderCell('Versión / Fecha', 20),
                  createHeaderCell('Ubicación en Repositorio', 45)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Manual Maestro de EstudioSimple', { bold: true })], 35),
                  createBodyCell([createTextP('Versión 2.0 · 1 oct 2026')], 20),
                  createBodyCell([createTextP('MANUAL MAESTRO/Manual Maestro.docx')], 45)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Instrucciones de Análisis de Avance', { bold: true })], 35),
                  createBodyCell([createTextP('1 oct 2026')], 20),
                  createBodyCell([createTextP('MANUAL MAESTRO/Instrucciones_analisis_Manual_Maestro_y_avance_EstudioSimple.docx')], 45)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Clase 1 Matemática 7B OA01', { bold: true })], 35),
                  createBodyCell([createTextP('Canónica · Octubre 2026')], 20),
                  createBodyCell([createTextP('Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase01.ts')], 45)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Clase 2 Matemática 7B OA01', { bold: true })], 35),
                  createBodyCell([createTextP('Canónica · Octubre 2026')], 20),
                  createBodyCell([createTextP('Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase02.ts')], 45)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Aula Interactiva del Adulto', { bold: true })], 35),
                  createBodyCell([createTextP('Octubre 2026')], 20),
                  createBodyCell([createTextP('Web Studio Simple/src/components/lesson/adult/AdultLessonView.tsx')], 45)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Aula Interactiva del Estudiante', { bold: true })], 35),
                  createBodyCell([createTextP('Octubre 2026')], 20),
                  createBodyCell([createTextP('Web Studio Simple/src/components/lesson/student/StudentLessonView.tsx')], 45)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Editor CMS de Lecciones', { bold: true })], 35),
                  createBodyCell([createTextP('Octubre 2026')], 20),
                  createBodyCell([createTextP('Web Studio Simple/src/components/admin/cms/LessonEditorView.tsx')], 45)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Simulador Formal Exámenes Libres', { bold: true })], 35),
                  createBodyCell([createTextP('Octubre 2026')], 20),
                  createBodyCell([createTextP('Web Studio Simple/src/components/student/FormalExamSimulator.tsx')], 45)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Generador Curricular Paramétrico', { bold: true })], 35),
                  createBodyCell([createTextP('Octubre 2026')], 20),
                  createBodyCell([createTextP('Web Studio Simple/src/lib/lesson-generator.ts')], 45)
                ]
              }),
              new TableRow({
                children: [
                  createBodyCell([createTextP('Módulo Universal de Video', { bold: true })], 35),
                  createBodyCell([createTextP('Octubre 2026')], 20),
                  createBodyCell([createTextP('Web Studio Simple/src/lib/video-utils.ts')], 45)
                ]
              })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(pathManual, buffer);
  console.log(`Documento guardado en: ${pathManual} (${buffer.length} bytes)`);

  fs.writeFileSync(pathJefatura, buffer);
  console.log(`Copia de respaldo guardada en: ${pathJefatura}`);
}

generateDocx().catch((err) => {
  console.error('Error generando documento DOCX:', err);
  process.exit(1);
});
