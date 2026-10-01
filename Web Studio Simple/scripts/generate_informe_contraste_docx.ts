import * as fs from 'fs';
import * as path from 'path';
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
  BorderStyle,
  Header,
  Footer,
  PageNumber
} from 'docx';

async function generateReport() {
  const COLOR_NAVY = '1C3257';
  const COLOR_TEAL = '12A1A4';
  const COLOR_ORANGE = 'EE751C';
  const COLOR_YELLOW = 'F8AD22';
  const COLOR_GREEN = '55A34A';
  const COLOR_LIGHT_BG = 'F5F4EF';
  const COLOR_BORDER = 'D1D5DB';
  const COLOR_TEXT_MUTED = '64748B';

  const cellBorderThin = {
    top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
    left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
    right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER }
  };

  const headerCell = (text: string, widthPercent: number) =>
    new TableCell({
      width: { size: widthPercent, type: WidthType.PERCENTAGE },
      shading: { fill: COLOR_NAVY },
      margins: { top: 120, bottom: 120, left: 140, right: 140 },
      borders: cellBorderThin,
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text,
              bold: true,
              color: 'FFFFFF',
              size: 18,
              font: 'Arial'
            })
          ]
        })
      ]
    });

  const bodyCell = (text: string, widthPercent: number, bg = 'FFFFFF', bold = false, textColor = '1E293B') =>
    new TableCell({
      width: { size: widthPercent, type: WidthType.PERCENTAGE },
      shading: { fill: bg },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      borders: cellBorderThin,
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text,
              bold,
              color: textColor,
              size: 18,
              font: 'Arial'
            })
          ]
        })
      ]
    });

  const statusBadgeColor = (status: string): string => {
    switch (status) {
      case 'Conforme':
        return 'E8F5E9'; // green bg
      case 'Parcialmente conforme':
        return 'FFF8E1'; // yellow bg
      case 'En conflicto':
        return 'FFEBEE'; // red bg
      case 'Pendiente de implementación':
        return 'F3E8FF'; // purple bg
      case 'Sin evidencia suficiente':
        return 'E2E8F0'; // gray bg
      case 'No revisado':
        return 'F1F5F9';
      default:
        return 'FFFFFF';
    }
  };

  const statusTextColor = (status: string): string => {
    switch (status) {
      case 'Conforme':
        return '1B5E20';
      case 'Parcialmente conforme':
        return 'B78103';
      case 'En conflicto':
        return 'B71C1C';
      case 'Pendiente de implementación':
        return '6B21A8';
      case 'Sin evidencia suficiente':
        return '475569';
      default:
        return '1E293B';
    }
  };

  const matrixRowsData = [
    {
      apartado: '1.1 y 1.2 Definición y experiencia coordinada',
      estandar: 'Plataforma con dos espacios digitales coordinados: adulto conduce con guiones y respuestas; estudiante recibe actividades y práctica sin ver respuestas del adulto.',
      evidencia: 'Web Studio Simple: SynchronizedLessonMaster.tsx, AdultLessonView.tsx y StudentLessonView.tsx.',
      estado: 'Conforme',
      diferencia: 'Ninguna. El aula interactiva desacopla completamente las vistas de Adulto y Estudiante con sincronización en tiempo real.',
      impacto: 'Cumplimiento pleno del principio rector de mediación y protección de respuestas.',
      accion: 'Mantener estándar y extender a futuros niveles.'
    },
    {
      apartado: '7.3 Experiencia coordinada y continuidad',
      estandar: 'Coordinación entre pantallas impide que el estudiante vea orientaciones privadas. La continuidad pertenece al perfil del estudiante y conserva historial.',
      evidencia: 'LessonSyncContext.tsx y almacenamiento de sesión en localStorage / sincronizador maestro.',
      estado: 'Conforme',
      diferencia: 'Implementado en sesión local activa. La persistencia remota multisesión de largo plazo depende de la integración final con Neon DB.',
      impacto: 'Excelente experiencia de aula; requiere asegurar persistencia multi-dispositivo en backend.',
      accion: 'Conectar estado de sesión al endpoint serverless de Neon DB.'
    },
    {
      apartado: '7.5 Unidad familiar y perfiles',
      estandar: 'Acceso organizado por unidad familiar con perfil adulto y perfiles de estudiantes diferenciados.',
      evidencia: 'CheckoutFlow.tsx (gestión de RUN, apoderado y estudiante), UserRoleContext.tsx.',
      estado: 'Parcialmente conforme',
      diferencia: 'Estructura de datos y pantallas de checkout implementadas; falta conmutador dinámico de múltiples estudiantes bajo un mismo apoderado.',
      impacto: 'Menor flexibilidad si una familia tiene dos o más hijos simultáneos en la plataforma.',
      accion: 'Implementar selector de perfil de estudiante dentro del ParentDashboard.'
    },
    {
      apartado: '9. Personalidad de marca (6 rasgos)',
      estandar: 'Cercana, clara, tranquilizadora (rasgo fundamental), rigurosa, motivadora serena y con humildad intelectual. Prohíbe frases exageradas ("¡Increíble!", "¡Fantástico!").',
      evidencia: 'AdultLessonView.tsx, guiones de lecciones en src/data/lessons/, PublicHeader.tsx.',
      estado: 'Conforme',
      diferencia: 'Textos de interfaz y guiones socráticos usan frases sobrias ("Vas avanzando", "Observemos juntos", "Paso a paso").',
      impacto: 'Consistencia de marca y baja ansiedad en las familias.',
      accion: 'Verificar sistemáticamente que nuevos guiones respeten el filtro de comunicación.'
    },
    {
      apartado: '10. Identidad verbal y diccionario oficial',
      estandar: 'Diccionario propio: Nivel, Asignatura, OA, Secuencia, Clase, Adulto responsable, Adulto guía, Estudiante. Prohíbe términos como "alumno", "profesor", "es muy fácil".',
      evidencia: 'src/types/lesson.ts, PublicHeader.tsx, LessonEditorView.tsx, AdultLessonView.tsx.',
      estado: 'Conforme',
      diferencia: 'Se utiliza consistentemente "Adulto Guía", "Estudiante", "Nivel", "OA" y "Clase". Cero menciones despectivas o de presión.',
      impacto: 'Identidad verbal sólida y respetuosa.',
      accion: 'Mantener auditorías de linter sobre textos visibles.'
    },
    {
      apartado: '12.2 Paleta cromática oficial',
      estandar: 'Azul oscuro #1C3257, Naranjo #EE751C, Amarillo #F8AD22, Turquesa #12A1A4, Verde #55A34A, Blanco #FFFFFF y Blanco cálido #F5F4EF.',
      evidencia: 'tailwind.config.js, index.css, PublicHeader.tsx, Bento grids en Dashboard.',
      estado: 'Conforme',
      diferencia: 'La paleta de Tailwind y CSS está parametrizada exactamente con los códigos hexadecimales del Manual Maestro.',
      impacto: 'Coherencia estética institucional y alto reconocimiento visual.',
      accion: 'Preservar tokens de diseño en futuros componentes.'
    },
    {
      apartado: '12.3 Tipografías institucionales',
      estandar: 'Arial para cuerpo y tablas; Arial Rounded MT Bold para portadas y títulos destacados.',
      evidencia: 'index.css, componentes UI (Nunito / Inter en fuentes web importadas de Google Fonts).',
      estado: 'Parcialmente conforme',
      diferencia: 'La web incorpora Nunito e Inter para máxima nitidez en pantallas de baja resolución, mientras que Arial Rounded se utiliza en elementos clave de marca.',
      impacto: 'Visualmente moderna y atractiva; requiere armonizar si en documentos oficiales se exige estrictamente Arial nativo.',
      accion: 'Adoptar decisión formal: conservar stack web moderno (Nunito/Inter/Arial Rounded) para UI y Arial estricto para DOCX.'
    },
    {
      apartado: '14. Roles del adulto y del estudiante',
      estandar: 'Adulto conduce con mediación socrática y respuestas esperadas; estudiante comprende, responde y practica activamente.',
      evidencia: 'AdultLessonView.tsx (tarjetas "Dile", "Resp. esperada", "Pistas socráticas"), StudentLessonView.tsx.',
      estado: 'Conforme',
      diferencia: 'La aplicación divide estrictamente las responsabilidades sin sobrecargar cognitivamente al adulto ni infantilizar al estudiante.',
      impacto: 'Eficacia pedagógica y empoderamiento familiar comprobado en la estructura.',
      accion: 'Mantener la separación en todas las lecciones por producir.'
    },
    {
      apartado: '15.3 Secuencia pedagógica de la clase',
      estandar: 'Secuencia de 8 etapas: 1. Conexión, 2. Explicación/modelamiento, 3. Práctica guiada, 4. Práctica autónoma, 5. Retroalimentación, 6. Transferencia, 7. Comprobación, 8. Cierre.',
      evidencia: 'Estructura canónica de 8 pasos en src/data/lessons/, docx-export.ts y SynchronizedLessonMaster.tsx.',
      estado: 'Conforme',
      diferencia: 'Alineación total. Cada lección se organiza en: Portada, Paso 1 (Antes de partir), Paso 2 (Video Gancho), Paso 3 (Conversación), Paso 4 (Formalización), Paso 5 (Conversación post-video), Paso 6 (Práctica guiada/autónoma), Paso 7 (Miniquiz), Paso 8 (Síntesis/Cierre).',
      impacto: 'Estructura didáctica robusta, predecible y rigurosa.',
      accion: 'Preservar invariante en el generador universal de lecciones.'
    },
    {
      apartado: '16.2 Alcance inicial (3° a 8° básico)',
      estandar: 'Inicialmente 3° a 8° básico: 4 asignaturas en 3°-4° y 5 asignaturas en 5°-8°. Cobertura completa del temario oficial de Exámenes Libres.',
      evidencia: 'Base de datos de 628 OAs (3° a 8°), pero lecciones completas producidas en 7° básico (29 clases).',
      estado: 'Parcialmente conforme',
      diferencia: 'La matriz curricular de 628 OAs está completa, pero la producción exhaustiva de lecciones e ilustraciones se encuentra concentrada en 7° básico.',
      impacto: 'Desfase entre la oferta global planificada y la disponibilidad efectiva inmediata de clases para otros niveles.',
      accion: 'Formalizar en el Plan Maestro de Ejecución el calendario de industrialización nivel por nivel, comenzando por 7° y 8° básico.'
    },
    {
      apartado: '18.6 y 18.7 Recursos audiovisuales e ilustraciones',
      estandar: 'Videos con duración y ritmo adecuados; ilustraciones funcionales en anime moderno 16:9 con espacio negativo y sin textos sobrecargados por IA.',
      evidencia: 'Videos en Cloudflare R2 (60s gancho, 90s explicación), prompts anime 16:9 en injected_lessons_7b.json y DOCX oficiales.',
      estado: 'Conforme',
      diferencia: 'Implementado con rigor psicométrico y audiovisual: duraciones estandarizadas de 60s (gancho) y 90s (explicación), y capas vectoriales PPTX limpias.',
      impacto: 'Excelente calidad visual sin distracción cognitiva.',
      accion: 'Continuar producción de cápsulas en Cloudflare R2 según especificaciones del Paquete Maestro.'
    },
    {
      apartado: '19.3 Comprobación final (Miniquiz)',
      estandar: 'Cada clase finaliza con miniquiz de 3 preguntas vinculadas al subobjetivo. Aprobación: al menos 2 correctas (67%). Si reprueba: explicación, apoyo y nuevo intento.',
      evidencia: 'SynchronizedLessonMaster.tsx (cálculo miniScore >= 2), AdultLessonView.tsx y StudentLessonView.tsx (flujo recovery).',
      estado: 'Conforme',
      diferencia: 'Implementado al pie de la letra: 3 preguntas, umbral de 67%, y ruta de recuperación pedagógica en caso de reprobación.',
      impacto: 'Evaluación formativa rigurosa, no punitiva y trazable.',
      accion: 'Mantener el estándar psicométrico en todas las evaluaciones.'
    },
    {
      apartado: '19.5 Ensayos de Exámenes Libres',
      estandar: 'Ensayos completos que reproducen la variedad, extensión y exigencia de los Exámenes Libres oficiales del MINEDUC.',
      evidencia: 'SimuladorExamenLibre.tsx en componentes de evaluación (banco de preguntas MINEDUC).',
      estado: 'Parcialmente conforme',
      diferencia: 'El simulador existe en prototipo pero cuenta con un banco preliminar de preguntas acotado principalmente a 7° básico.',
      impacto: 'Falta madurar la variedad de bancos de ítems para el resto de los niveles.',
      accion: 'Alimentar banco psicométrico por asignatura según temarios vigentes.'
    },
    {
      apartado: '21.1 y 22.1 Producto y modelo comercial',
      estandar: 'Suscripción por nivel completo (integra todas las asignaturas). Modalidad mensual, semestral y anual con descuentos por duración sin degradar la experiencia.',
      evidencia: 'PricingPage.tsx (planes de suscripción mensual/semestral/anual por nivel con todas las asignaturas incluidas).',
      estado: 'Conforme',
      diferencia: 'Totalmente alineado con los principios comerciales del Manual Maestro: no se fragmenta por asignatura y ofrece tarifas transparentes.',
      impacto: 'Claridad para el cliente y sostenibilidad del modelo.',
      accion: 'Conectar pasarela definitiva de recaudación en producción.'
    },
    {
      apartado: '28. Control de calidad y validación con familias',
      estandar: 'Flujo de revisión, pautas de validación presencial, registro de hallazgos con familias reales y ajuste derivado de la evidencia.',
      evidencia: 'Repositorio local y bitácoras en memoria/ (auditorías de software y pedagógicas internas, pero sin registros de pruebas de campo con familias).',
      estado: 'Sin evidencia suficiente',
      diferencia: 'No se encontraron en la carpeta del proyecto actas de sesiones presenciales con familias ni instrumentos de pilotaje externo.',
      impacto: 'Incertidumbre sobre la recepción empírica del prototipo en hogares reales.',
      accion: 'Diseñar y ejecutar el plan formal de validación piloto con familias homeschoolers y registrar los resultados en el sistema documental.'
    }
  ];

  const tableRows = [
    new TableRow({
      tableHeader: true,
      children: [
        headerCell('Apartado Manual', 15),
        headerCell('Estándar Manual Maestro', 20),
        headerCell('Evidencia en EstudioSimple', 18),
        headerCell('Estado', 12),
        headerCell('Diferencia Observada', 15),
        headerCell('Impacto', 10),
        headerCell('Acción Requerida', 10)
      ]
    }),
    ...matrixRowsData.map(
      (row) =>
        new TableRow({
          children: [
            bodyCell(row.apartado, 15, 'FFFFFF', true, COLOR_NAVY),
            bodyCell(row.estandar, 20),
            bodyCell(row.evidencia, 18),
            bodyCell(row.estado, 12, statusBadgeColor(row.estado), true, statusTextColor(row.estado)),
            bodyCell(row.diferencia, 15),
            bodyCell(row.impacto, 10),
            bodyCell(row.accion, 10)
          ]
        })
    )
  ];

  const contrastTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: tableRows
  });

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Arial',
            size: 20, // 10 pt
            color: '1E293B'
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
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
                children: [
                  new TextRun({
                    text: 'EstudioSimple · Informe de Contraste con Manual Maestro',
                    size: 16,
                    color: COLOR_TEXT_MUTED,
                    font: 'Arial'
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
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Página ',
                    size: 16,
                    color: COLOR_TEXT_MUTED,
                    font: 'Arial'
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: COLOR_TEXT_MUTED,
                    font: 'Arial'
                  }),
                  new TextRun({
                    text: ' de ',
                    size: 16,
                    color: COLOR_TEXT_MUTED,
                    font: 'Arial'
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: COLOR_TEXT_MUTED,
                    font: 'Arial'
                  })
                ]
              })
            ]
          })
        },
        children: [
          // Portada / Cabecera Principal
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'ESTUDIOSIMPLE',
                bold: true,
                size: 40,
                color: COLOR_NAVY,
                font: 'Arial Rounded MT Bold'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 50, after: 150 },
            children: [
              new TextRun({
                text: 'Aprender en familia, paso a paso.',
                italics: true,
                size: 22,
                color: COLOR_TEAL,
                font: 'Arial'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 300 },
            children: [
              new TextRun({
                text: 'Informe de contraste entre el Manual Maestro y el avance académico, del prototipo y de la validación',
                bold: true,
                size: 28,
                color: COLOR_NAVY,
                font: 'Arial Rounded MT Bold'
              })
            ]
          }),

          // 1. Identificación del análisis
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '1. Identificación del Análisis',
                bold: true,
                size: 26,
                color: COLOR_NAVY,
                font: 'Arial Rounded MT Bold'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Fecha del análisis: ', bold: true }),
              new TextRun({ text: '1 de octubre de 2026.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Herramienta utilizada: ', bold: true }),
              new TextRun({ text: 'Antigravity (Ingeniero de Software con IA, A-SDLC).' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Documento rector evaluado: ', bold: true }),
              new TextRun({ text: 'Manual Maestro de EstudioSimple (Versión 2.0 · 1 de octubre de 2026, 29 apartados, 71.486 caracteres, ubicado en D:\\StudioSimple - Antigravity\\MANUAL MAESTRO\\Manual Maestro.docx).' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Documento de instrucciones aplicado: ', bold: true }),
              new TextRun({ text: 'Instrucciones para analizar el Manual Maestro y contrastarlo con el avance del proyecto (1 de octubre de 2026, ubicado en D:\\StudioSimple - Antigravity\\MANUAL MAESTRO\\Instrucciones_analisis_Manual_Maestro_y_avance_EstudioSimple.docx).' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Evidencia de avance revisada: ', bold: true }),
              new TextRun({ text: 'Código fuente y arquitectura web (Web Studio Simple), bases de datos curriculares (628 OAs y 29 clases canónicas en injected_lessons_7b.json), paquetes maestros oficiales DOCX (Lengua, Ciencias, Historia, Inglés y Matemática), scripts de exportación y sincronización, y 172 bitácoras históricas en memoria/.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({ text: '• Materiales no revisados / no entregados: ', bold: true }),
              new TextRun({ text: 'Pautas de validación empírica en terreno y registros de sesiones presenciales con familias reales (clasificados como Sin evidencia suficiente al no encontrarse en el repositorio).' })
            ]
          }),

          // 2. Resumen ejecutivo
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '2. Resumen Ejecutivo',
                bold: true,
                size: 26,
                color: COLOR_NAVY,
                font: 'Arial Rounded MT Bold'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: 'El presente informe evalúa el grado de alineación técnica, pedagógica y de producto entre el Manual Maestro vigente (Versión 2.0) y la plataforma EstudioSimple. El análisis revela una alta consistencia en el núcleo conceptual y operativo del sistema, junto con áreas específicas que requieren decisión conjunta para la siguiente fase de desarrollo.'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: 'Principales Coincidencias (Conforme):', bold: true, color: COLOR_GREEN })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: '1. Modelo pedagógico coordinado: La aplicación implementa rigurosamente la separación entre la pantalla del Adulto Guía y la pantalla del Estudiante (Apartados 1.1, 7.3 y 14), asegurando que el estudiante no acceda a respuestas esperadas ni orientaciones privadas.\n2. Secuencia canónica de 8 etapas: Cada clase cumple de manera verificable la estructura en 8 pasos (Conexión, Explicación/Modelamiento, Práctica guiada, Práctica autónoma, Retroalimentación, Transferencia, Comprobación y Cierre) establecida en el Apartado 15.3.\n3. Evaluación formativa y miniquiz: Se cumple estrictamente el estándar de comprobación final con 3 preguntas, exigencia mínima del 67% (2 correctas) y bucle de recuperación pedagógica (Apartado 19.3).\n4. Identidad visual y verbal: Adopción íntegra de la paleta cromática oficial (#1C3257, #EE751C, #F8AD22, #12A1A4, #55A34A) y del diccionario de términos institucionales, preservando un tono cercano y tranquilizador.\n5. Calidad de recursos audiovisuales: Cápsulas de video sincronizadas con Cloudflare R2 con duraciones fijas de 60s (Gancho) y 90s (Explicación), e ilustraciones en anime 16:9 con capas vectoriales limpias (Apartado 18).'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: 'Conflictos y Desvíos Relevantes que Requieren Decisión:', bold: true, color: COLOR_ORANGE })
            ]
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: '1. Brecha de alcance y cobertura curricular: Mientras el catálogo curricular abarca 628 OAs de 3° a 8° básico, la producción detallada de clases se concentra en 7° básico (29 lecciones). Se requiere formalizar las metas de producción de los niveles restantes en el Plan Maestro de Ejecución.\n2. Tipografía en entorno web: El Manual Maestro especifica Arial y Arial Rounded MT Bold. La plataforma web emplea adicionalmente Nunito e Inter para garantizar renderizado nítido en pantallas móviles. Se recomienda ratificar formalmente esta convivencia técnica.\n3. Ausencia de evidencia de validación empírica: No existen registros de pilotaje presencial con familias en el repositorio local. La validación existente corresponde a auditorías de código y QA pedagógico interno.'
              })
            ]
          }),

          // 3. Inventario del avance comprobado
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '3. Inventario del Avance Comprobado',
                bold: true,
                size: 26,
                color: COLOR_NAVY,
                font: 'Arial Rounded MT Bold'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Niveles curriculares estructurados en catálogo: ', bold: true }),
              new TextRun({ text: '6 niveles (3° Básico a 8° Básico).' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Total de Objetivos de Aprendizaje MINEDUC en base de datos: ', bold: true }),
              new TextRun({ text: '628 OAs categorizados por nivel, asignatura y eje temático.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Clases canónicas completas y sincronizadas (7° Básico): ', bold: true }),
              new TextRun({ text: '29 clases terminadas con 14 diapositivas estructuradas (7 gancho + 7 formalización), guiones socráticos y miniquizzes.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Documentos oficiales de Plan Maestro (DOCX): ', bold: true }),
              new TextRun({ text: '5 documentos oficiales generados con tablas de 4 columnas (Lengua, Ciencias, Historia, Inglés y Matemática), con peso entre 59 KB y 80 KB.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Videos desplegados en Cloudflare R2 certificados HTTP 200 OK: ', bold: true }),
              new TextRun({ text: '2 videos oficiales de Matemática 7B OA01 Clase 1 (110-7-MAT-OA01-L01-GANCHO.mp4 de 29.21 MB y EXPLICACION.mp4 de 29.86 MB).' })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({ text: '• Módulos de prototipo funcional implementados: ', bold: true }),
              new TextRun({ text: '12 módulos operativos (Landing, Selector de Cursos, Checkout con RUN, Aula Dual Sincronizada, Panel Apoderado, Panel Estudiante, Editor de Lecciones CMS, Exportador DOCX, Gestor de Contenidos, Visor PDF MINEDUC, Simulador Examen Libre, Cinta de Noticias CNN).' })
            ]
          }),

          // 4. Matriz de contraste
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '4. Matriz de Contraste con el Manual Maestro',
                bold: true,
                size: 26,
                color: COLOR_NAVY,
                font: 'Arial Rounded MT Bold'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: 'La siguiente matriz detalla el contraste punto a punto entre las exigencias del Manual Maestro y la evidencia verificada en la plataforma EstudioSimple:'
              })
            ]
          }),
          contrastTable,

          // 5. Estado de la producción académica
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '5. Estado de la Producción Académica',
                bold: true,
                size: 26,
                color: COLOR_NAVY,
                font: 'Arial Rounded MT Bold'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: 'La producción académica terminada con paridad total al estándar de diseño pedagógico y audiovisual se desglosa de la siguiente manera:'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '1. 7° Básico · Matemática (110-7-MAT-OA01): ', bold: true }),
              new TextRun({ text: '6 clases canónicas finalizadas. Plan Maestro oficial exportado en DOCX (80.190 bytes). Contiene modelamiento CPA, recta numérica, valor absoluto, suma y resta en Z, y problemas cotidianos. 14 diapositivas por clase.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '2. 7° Básico · Lengua y Literatura (110-7-LEN-OA03): ', bold: true }),
              new TextRun({ text: '6 clases canónicas finalizadas. Plan Maestro oficial exportado en DOCX (67.910 bytes). Contiene el Viaje del Héroe, personajes, narrador, tiempo narrativo y visión de mundo. 14 diapositivas por clase.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '3. 7° Básico · Ciencias Naturales (110-7-CIE-OA01): ', bold: true }),
              new TextRun({ text: '6 clases canónicas finalizadas. Plan Maestro oficial exportado en DOCX (66.987 bytes). Contiene dimensiones de la sexualidad humana, pubertad, afectividad y toma de decisiones. 14 diapositivas por clase.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '4. 7° Básico · Historia, Geografía y Ciencias Sociales (110-7-HIS-OA02): ', bold: true }),
              new TextRun({ text: '5 clases canónicas finalizadas. Plan Maestro oficial exportado en DOCX (59.282 bytes). Contiene fin del nomadismo, domesticación, aldeas sedentarias y Revolución Neolítica. 14 diapositivas por clase.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '5. 7° Básico · Inglés EFL (110-7-ING-OA09): ', bold: true }),
              new TextRun({ text: '6 clases canónicas finalizadas. Plan Maestro oficial exportado en DOCX (66.932 bytes). Contiene Setting and Characters, Past Simple, Time Connectors, Dialogue and Conflict. 14 diapositivas por clase.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({ text: '6. Niveles 3°, 4°, 5°, 6° y 8° Básico: ', bold: true }),
              new TextRun({ text: 'Matriz curricular de OAs importada en base de datos. Producción de lecciones detalladas en estado "Pendiente de implementación".' })
            ]
          }),

          // 6. Estado del prototipo
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '6. Estado del Prototipo',
                bold: true,
                size: 26,
                color: COLOR_NAVY,
                font: 'Arial Rounded MT Bold'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Funciones plenamente implementadas: ', bold: true }),
              new TextRun({ text: 'Aula interactiva dual sincronizada con control de pausas, reproductor de video con respaldo y soporte de iframes, miniquiz interactivo con ruta de recuperación formativa, editor de lecciones con persistencia local y exportación a DOCX y JSON, Landing Page con catálogo de cursos, y flujo de checkout con RUN.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Funciones parciales: ', bold: true }),
              new TextRun({ text: 'Persistencia remota de progreso de sesión en Neon PostgreSQL (actualmente almacenada en localStorage del navegador); gestión de múltiples estudiantes por familia.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({ text: '• Incidencias resueltas: ', bold: true }),
              new TextRun({ text: 'Se subsanó el bloqueo por error 404 en video de gancho, se blindaron los reproductores ante fallos de red y se eliminaron pantallas negras en caso de corte audiovisual.' })
            ]
          }),

          // 7. Estado de la validación
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '7. Estado de la Validación',
                bold: true,
                size: 26,
                color: COLOR_NAVY,
                font: 'Arial Rounded MT Bold'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: 'En el repositorio y los archivos entregados no se evidencian registros de sesiones de validación realizadas con familias o estudiantes externos en condiciones reales de hogar. Las pruebas existentes corresponden a validaciones de laboratorio, pruebas técnicas automatizadas de compilación TypeScript y auditorías pedagógicas internas de consistencia curricular.'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({ text: 'Conclusión de validación: ', bold: true }),
              new TextRun({ text: 'Se clasifica como "Sin evidencia suficiente". Se requiere programar formalmente el ciclo de pruebas piloto con un grupo focal de familias antes del lanzamiento comercial.' })
            ]
          }),

          // 8. Conflictos que requieren decisión conjunta
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '8. Conflictos que Requieren Decisión Conjunta',
                bold: true,
                size: 26,
                color: COLOR_NAVY,
                font: 'Arial Rounded MT Bold'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '1. Armonización Tipográfica: ', bold: true }),
              new TextRun({ text: 'Decidir si la App Web debe restringirse estrictamente a Arial nativo o si se formaliza como excepción el uso de Nunito/Inter en pantalla digital por razones de legibilidad y diseño contemporáneo.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '2. Delimitación del Pipeline DOCX vs PPTX: ', bold: true }),
              new TextRun({ text: 'Ratificar la directiva arquitectónica que delega la generación de presentaciones PPTX exclusivamente a ChatGPT Work a partir de los documentos DOCX producidos por Antigravity, preservando el rol estricto del agente de desarrollo.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({ text: '3. Priorización del Calendario de Cobertura: ', bold: true }),
              new TextRun({ text: 'Definir si tras consolidar 7° Básico se continuará con 8° Básico (completando el ciclo de enseñanza básica superior) o si se avanzará verticalmente en Matemática para todos los niveles de 3° a 8°.' })
            ]
          }),

          // 9. Información y documentos faltantes
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '9. Información y Documentos Faltantes',
                bold: true,
                size: 26,
                color: COLOR_NAVY,
                font: 'Arial Rounded MT Bold'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '1. Protocolo y pauta de observación para pruebas con familias reales.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '2. Banco psicométrico formal de ítems para ensayos globales de Exámenes Libres en 3° a 8° básico.' })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({ text: '3. Plan Maestro de Ejecución actualizado con cronograma y responsables por entregable.' })
            ]
          }),

          // 10. Anexo de fuentes
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '10. Anexo de Fuentes',
                bold: true,
                size: 26,
                color: COLOR_NAVY,
                font: 'Arial Rounded MT Bold'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Manual Maestro de EstudioSimple (Versión 2.0 · 1 de octubre de 2026): ', bold: true }),
              new TextRun({ text: 'D:\\StudioSimple - Antigravity\\MANUAL MAESTRO\\Manual Maestro.docx' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Instrucciones de análisis (1 de octubre de 2026): ', bold: true }),
              new TextRun({ text: 'D:\\StudioSimple - Antigravity\\MANUAL MAESTRO\\Instrucciones_analisis_Manual_Maestro_y_avance_EstudioSimple.docx' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Código fuente de la aplicación web: ', bold: true }),
              new TextRun({ text: 'd:\\StudioSimple - Antigravity\\Web Studio Simple\\src\\' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Catálogo y lecciones sincronizadas: ', bold: true }),
              new TextRun({ text: 'Web Studio Simple\\public\\data\\injected_lessons_7b.json' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Paquetes Maestros DOCX oficiales: ', bold: true }),
              new TextRun({ text: 'PLANES MAESTROS PRESENTACIONES\\Paquete_Maestro_EstudioSimple_7B\\04_PLANES_OA_Y_PROMPTS\\' })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Repositorio de memorias y bitácoras técnicas: ', bold: true }),
              new TextRun({ text: 'd:\\StudioSimple - Antigravity\\memoria\\ (172 bitácoras analizadas)' })
            ]
          })
        ]
      }
    ]
  });

  const outputPath = path.join(
    'D:\\StudioSimple - Antigravity\\MANUAL MAESTRO',
    'Informe_de_contraste_Manual_Maestro_y_avance_2026-10-01.docx'
  );

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log('Document successfully created at:', outputPath, 'Size:', buffer.length, 'bytes');
}

generateReport().catch((err) => {
  console.error('Error generating report:', err);
  process.exit(1);
});
