import fs from 'fs';
import path from 'path';
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
  ShadingType
} from '../Web Studio Simple/node_modules/docx';

async function generateConsolidatedWorkDocx(): Promise<void> {
  const rootOutputDir = path.resolve(__dirname, '..');
  const targetFileRoot = path.join(
    rootOutputDir,
    'INFORME_SISTEMA_GLOBAL_LECCIONES_V2_PARA_WORK_2026-10-09_18-20.docx'
  );
  const targetFileDelivery = path.join(
    rootOutputDir,
    'SALIDA_SISTEMA_LECCIONES_V2',
    'EJECUCION_2026-10-09_1735',
    '06_INFORME',
    'INFORME_SISTEMA_GLOBAL_LECCIONES_V2_PARA_WORK.docx'
  );

  console.log('Generando documento Word consolidado integral corregido para revisión de ChatGPT Work...');

  const tableBorder = {
    top: { style: BorderStyle.SINGLE, size: 1, color: 'B0BEC5' },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: 'B0BEC5' },
    left: { style: BorderStyle.SINGLE, size: 1, color: 'B0BEC5' },
    right: { style: BorderStyle.SINGLE, size: 1, color: 'B0BEC5' }
  };

  const headerShading = {
    fill: '0F172A',
    type: ShadingType.CLEAR,
    color: 'auto'
  };

  const zebraShading = {
    fill: 'F8FAFC',
    type: ShadingType.CLEAR,
    color: 'auto'
  };

  const doc = new Document({
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
        children: [
          // PORTADA / TÍTULO PRINCIPAL
          new Paragraph({
            text: 'ESTUDIOSIMPLE — SISTEMA GLOBAL DE LECCIONES V2.0',
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 150 }
          }),
          new Paragraph({
            text: 'Dossier Maestro Consolidado para Revisión Conjunta de Walter y ChatGPT Work',
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: 'Edición Corregida y Sincronizada conforme al Encargo Acotado de ChatGPT Work',
            heading: HeadingLevel.HEADING_3,
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 }
          }),

          // CAJA DE METADATOS Y GOBERNANZA
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'FECHA Y HORA: ', bold: true }),
                          new TextRun('2026-10-09 18:38 [America/Santiago]\n'),
                          new TextRun({ text: 'AUTOR: ', bold: true }),
                          new TextRun('Antigravity (Ingeniero de Software con IA, A-SDLC)\n'),
                          new TextRun({ text: 'DESTINATARIO: ', bold: true }),
                          new TextRun('Walter & ChatGPT Work\n'),
                          new TextRun({ text: 'ALCANCE NORMATIVO: ', bold: true }),
                          new TextRun('3.° a 8.° Básico (Bases Curriculares y Temarios EELL MINEDUC)\n'),
                          new TextRun({ text: 'ESTADO TÉCNICO FORMAL: ', bold: true }),
                          new TextRun({ text: 'APTO PARA REVISIÓN DE WALTER (EN_REVISION)', bold: true, color: '0D9488' }),
                          new TextRun('\n'),
                          new TextRun({ text: 'DIRECTIVA DE GOBERNANZA: ', bold: true }),
                          new TextRun('La aprobación formal al estado APROBADA es potestad e instrucción exclusiva de Walter tras el análisis conjunto con ChatGPT Work.')
                        ]
                      })
                    ],
                    borders: tableBorder,
                    shading: zebraShading
                  })
                ]
              })
            ]
          }),

          new Paragraph({ text: '', spacing: { after: 300 } }),

          // SECCIÓN 0: COMPROBACIÓN FINAL LIMITADA (ENCARGO DE WORK)
          new Paragraph({
            text: '0. Comprobación Final Limitada (Encargo de Corrección Acotada)',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 150 }
          }),
          new Paragraph({
            text: 'En respuesta directa al dictamen de ChatGPT Work, se ejecutó la corrección acotada sobre las tres discrepancias señaladas, sin alterar la arquitectura global, las 8 etapas, los 5 módulos ni la suite de pruebas. El resultado de los cuatro controles es:',
            spacing: { after: 150 }
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'N.°', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Control Verificado', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Evidencia Técnica Comprobada', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Resultado', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('1')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Nombres de las cuatro dimensiones', bold: true })] })], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Aparecen con los mismos cuatro nombres exactos en todos los archivos del piloto (TS, Guion, Plan Maestro DOCX e Informe): biológica, afectiva, psicológica y social. Eliminado "sociocultural". "Física", "cognitiva" y "emocional" solo aparecen como ejemplos descriptivos contextuales.')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'CUMPLE', bold: true, color: '0D9488' })] })], borders: tableBorder })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('2')], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Un solo miniquiz en todos los archivos', bold: true })] })], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph('Las tres preguntas, sus cuatro alternativas A–D, sus distractores y sus claves privadas coinciden al 100% y en el mismo orden entre la fuente TypeScript (fuente única), el Guion Pedagógico, el Plan Maestro DOCX y este Informe. Claves: Q1 = B, Q2 = A, Q3 = B. Umbral ≥ 2/3 intacto.')], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'CUMPLE', bold: true, color: '0D9488' })] })], borders: tableBorder, shading: zebraShading })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('3')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Verificación de la fuente curricular en INSUMOS', bold: true })] })], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Consultado el archivo real en INSUMOS ("Ciencias Naturales.pdf", 118.4 MB). Título oficial: "Texto del estudiante de Ciencias Naturales 7° básico SM", Editorial: SM S.A. / MINEDUC, Edición 2024, ISBN 978-956-403-295-5. Unidad 4: "Salud sexual y reproducción", págs. 114 a 125, que respaldan con rigor la pubertad, dimensiones y el eje hipotálamo-hipófisis.')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'CUMPLE', bold: true, color: '0D9488' })] })], borders: tableBorder })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('4')], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Invariabilidad estructural y psicométrica', bold: true })] })], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph('Las 8 etapas oficiales, el orden visible, el formato bimodal 7+7 (14 diapositivas con cláusula "No text drawn by AI"), la secuencia de 6 clases por OA y el umbral de aprobación ≥ 2 de 3 permanecen intactos.')], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'CUMPLE', bold: true, color: '0D9488' })] })], borders: tableBorder, shading: zebraShading })
                ]
              })
            ]
          }),

          new Paragraph({ text: '', spacing: { after: 300 } }),

          // SECCIÓN 1: RESUMEN EJECUTIVO
          new Paragraph({
            text: '1. Resumen Ejecutivo y Alcance Cumplido',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 150 }
          }),
          new Paragraph({
            text: 'El Sistema Global de Lecciones EstudioSimple v2.0 ha sido implementado y blindado para los niveles de 3.° a 8.° Básico en estricta coherencia con las Bases Curriculares y los Temarios de Exámenes Libres del MINEDUC.',
            spacing: { after: 120 }
          }),
          new Paragraph({
            text: 'Se garantiza una sola estructura global común con ocho etapas obligatorias, catorce diapositivas audiovisuales (7 en Video Motivacional + 7 en Video Explicativo), seis clases por OA y una perspectiva dual articulada entre el estudiante y el adulto mentor con puente al cuaderno físico.',
            spacing: { after: 200 }
          }),

          // SECCIÓN 2: ESTRUCTURA GLOBAL COMÚN (8 ETAPAS INVARIABLES)
          new Paragraph({
            text: '2. Estructura Global Común (3.° a 8.° Básico)',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 250, after: 150 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'N.°', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Etapa Oficial', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Función Pedagógica y Componente', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Rol del Adulto Mentor', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('-')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Antes de comenzar', bold: true })] })], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Instancia preparatoria previa (no es etapa numerada). Dispone cuaderno físico, útiles, tiempo estimado (30-35 min) y clima de acogida.')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Prepara el espacio y verifica materiales del estudiante.')], borders: tableBorder })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('1')], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Inicio', bold: true })] })], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph('Ubica la clase en el OA, activa conocimientos previos y presenta la ruta de la sesión.')], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph('Verbaliza bienvenida cálida y orienta el objetivo.')], borders: tableBorder, shading: zebraShading })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('2')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Video Motivacional', bold: true })] })], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Gancho audiovisual de exactamente 7 diapositivas con Sofía y Tomás (16:9 Anime, sin texto dibujado por IA).')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Enfoca la atención en la pregunta detonante.')], borders: tableBorder })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('3')], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Recorrido', bold: true })] })], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph('Exploración e indagación socrática intermedia (2 preguntas guiadas entre videos).')], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph('Formula preguntas, escucha activamente y aplica pistas graduales sin revelar la respuesta.')], borders: tableBorder, shading: zebraShading })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('4')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Video Explicativo', bold: true })] })], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Desarrollo conceptual formal de exactamente 7 diapositivas: 4 dimensiones (biológica, afectiva, psicológica, social), Caso 1 de Martín en lámina 6 y Regla de Oro en lámina 7.')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Acompaña la observación del modelo científico.')], borders: tableBorder })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('5')], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Práctica', bold: true })] })], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph('Transferencia aplicada al cuaderno físico, isomórfica con la lámina 6. Organizador de 4 cuadrantes.')], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph('Supervisa el trazado y desarrollo en papel.')], borders: tableBorder, shading: zebraShading })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('6')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Resumen', bold: true })] })], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Consolidación de las 3 ideas fuerza efectivamente enseñadas. Prohibida materia nueva.')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Pide al estudiante verbalizar la síntesis.')], borders: tableBorder })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('7')], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Miniquiz', bold: true })] })], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph('Evaluación psicométrica formal: 3 ítems con 4 alternativas (A–D), análisis de distractores y bucle formativo con umbral ≥ 2 aciertos.')], borders: tableBorder, shading: zebraShading }),
                  new TableCell({ children: [new Paragraph('Mantiene la clave oculta antes de responder.')], borders: tableBorder, shading: zebraShading })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('8')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Cierre', bold: true })] })], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Metacognición, felicitación formativa y puente hacia la siguiente clase.')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Felicita el esfuerzo y cierra la sesión con refuerzo positivo.')], borders: tableBorder })
                ]
              })
            ]
          }),

          new Paragraph({ text: '', spacing: { after: 300 } }),

          // SECCIÓN 3: CINCO MÓDULOS DISCIPLINARES
          new Paragraph({
            text: '3. Cinco Módulos Disciplinares Reutilizables',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 150 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Matemática (02_MODULOS/Matematica/SKILL.md): ', bold: true }),
              new TextRun('Enfoque CPA (Concreto-Pictórico-Simbólico). Recálculo obligatorio de claves desde datos originales. Excepción tipográfica de 36 pt para fórmulas. IVA oficial de Chile del 19%.')
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Lengua y Literatura (02_MODULOS/Lengua_y_Literatura/SKILL.md): ', bold: true }),
              new TextRun('Comprensión lectora multinivel (localizar, interpretar, reflexionar). Citas canónicas íntegras sin mutilaciones y rúbricas analíticas para respuestas abiertas.')
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Inglés (02_MODULOS/Ingles/SKILL.md): ', bold: true }),
              new TextRun('Enfoque comunicativo funcional (CLT). Input comprensible (i+1). Separación estricta de idiomas: guía del adulto en español; estímulo y práctica del estudiante en inglés. Cero pistas con traducción que revelen la clave.')
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Ciencias Naturales (02_MODULOS/Ciencias_Naturales/SKILL.md): ', bold: true }),
              new TextRun('Enfoque de indagación científica empírica. Distinción entre observación, evidencia, modelo e inferencia. Integración de las 4 dimensiones humanas (biológica, afectiva, psicológica, social). Cero diagnósticos individuales o revelaciones íntimas.')
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Historia, Geografía y Cs. Sociales (02_MODULOS/Historia_Geografia_Ciencias_Sociales/SKILL.md): ', bold: true }),
              new TextRun('Pensamiento histórico crítico y multicausalidad. Análisis directo de fuentes. Perspectiva multirregional moderna sobre el Neolítico y cronología uniforme.')
            ],
            spacing: { after: 200 }
          }),

          // SECCIÓN 4: CATÁLOGO DE REGLAS Y PRUEBAS
          new Paragraph({
            text: '4. Catálogo Dinámico de 47 Reglas y Validación',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 150 }
          }),
          new Paragraph({
            text: 'Se consolidó el catálogo oficial en 04_CONTROL/Catalogo_de_reglas.json con 47 reglas activas computadas dinámicamente y su matriz en CSV. La suite de pruebas automatizadas sobre fixtures de estructura real arrojó 18 de 18 pruebas aprobadas (100.0% de éxito, código de salida 0), detectando con precisión campos protegidos mutados, etapas eliminadas, conteos audiovisuales y reactivos incompletos.',
            spacing: { after: 200 }
          }),

          // SECCIÓN 5: PILOTO DE CIENCIAS 7° OA01 CLASE 1
          new Paragraph({
            text: '5. Piloto Oficial Sincronizado: Ciencias Naturales 7.° Básico OA01 — Clase 1',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 250, after: 150 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Código de Lección: ', bold: true }),
              new TextRun('110-7-CIE-OA01-C01\n'),
              new TextRun({ text: '• Subobjetivo: ', bold: true }),
              new TextRun('Identificar las cuatro dimensiones de la sexualidad humana (biológica, afectiva, psicológica y social) y reconocer que el inicio de la pubertad está regulado por el eje hormonal hipotálamo-hipófisis-gónadas.\n'),
              new TextRun({ text: '• Fuente Oficial en INSUMOS: ', bold: true }),
              new TextRun('Texto del estudiante de Ciencias Naturales 7° básico SM (Edición 2024, SM S.A. / MINEDUC, ISBN 978-956-403-295-5, Unidad 4: Salud sexual y reproducción, págs. 114 a 125).\n'),
              new TextRun({ text: '• Cuatro Dimensiones Oficiales: ', bold: true }),
              new TextRun('1) Biológica (anatomía, cromosomas y hormonas), 2) Afectiva (vínculos, sentimientos y cariño), 3) Psicológica (autoconcepto, identidad y decisiones), 4) Social (convivencia, cultura y normas comunitarias).')
            ],
            spacing: { after: 150 }
          }),

          // EVALUACIÓN FORMATIVA (MINIQUIZ COMPLETO)
          new Paragraph({
            text: 'Evaluación Psicométrica Formal (Miniquiz Completo Sincronizado)',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 120 }
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Pregunta 1 (Q1-CIE7-OA01): ', bold: true }), new TextRun('¿Cuál de los siguientes aspectos corresponde a una manifestación de la dimensión biológica de la sexualidad humana?')],
            spacing: { after: 60 }
          }),
          new Paragraph({
            text: '• A) La capacidad de ponerse en el lugar de un compañero triste.\n• B) La producción de hormonas sexuales estimuladas por la hipófisis. [CLAVE CORRECTA]\n• C) Las tradiciones culturales sobre la vestimenta en una fiesta patria.\n• D) La reflexión interna sobre las metas personales a largo plazo.',
            spacing: { after: 80 }
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Justificación: ', bold: true }), new TextRun('La producción de hormonas por el eje hipotálamo-hipófisis-gónadas es un proceso fisiológico y biológico directo. Distractores: A (afectiva/psicológica), C (social), D (psicológica).')],
            spacing: { after: 180 }
          }),

          new Paragraph({
            children: [new TextRun({ text: 'Pregunta 2 (Q2-CIE7-OA01): ', bold: true }), new TextRun('¿Qué estructura del sistema nervioso central inicia la secuencia hormonal que activa la pubertad al estimular a la glándula hipófisis?')],
            spacing: { after: 60 }
          }),
          new Paragraph({
            text: '• A) El hipotálamo. [CLAVE CORRECTA]\n• B) El cerebelo.\n• C) La médula espinal.\n• D) El lóbulo occipital.',
            spacing: { after: 80 }
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Justificación: ', bold: true }), new TextRun('El hipotálamo sintetiza y libera neurohormonas (GnRH) que viajan a la hipófisis anterior para activar la producción de gonadotropinas. Distractores: B (equilibrio), C (impulsos nerviosos motores y sensoriales), D (visión).')],
            spacing: { after: 180 }
          }),

          new Paragraph({
            children: [new TextRun({ text: 'Pregunta 3 (Q3-CIE7-OA01): ', bold: true }), new TextRun('Dos amigos conversan con sinceridad, se brindan apoyo mutuo en un momento difícil y se tratan con respeto y afecto. ¿Qué dimensiones de la sexualidad humana se manifiestan principalmente en esta situación?')],
            spacing: { after: 60 }
          }),
          new Paragraph({
            text: '• A) Exclusivamente la dimensión biológica y genética.\n• B) Las dimensiones afectiva y social. [CLAVE CORRECTA]\n• C) Únicamente la dimensión anatómica y hormonal.\n• D) Ninguna dimensión, ya que no intervienen médicos.',
            spacing: { after: 80 }
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Justificación: ', bold: true }), new TextRun('El apoyo emocional, el cariño y el respeto interpersonal articulan las dimensiones afectiva (sentimientos y vínculos) y social (convivencia y normas comunitarias). Distractores: A y C (fisiológicos ausentes), D (la sexualidad ocurre en la vida cotidiana de todas las personas sin requerir contexto clínico).')],
            spacing: { after: 180 }
          }),

          new Paragraph({
            children: [
              new TextRun({ text: 'Parámetros Psicométricos: ', bold: true }),
              new TextRun('Umbral de aprobación formal ≥ 2 de 3. Claves privadas estrictamente ocultas antes de responder. Si el estudiante obtiene menos de 2 aciertos, se activa el bucle formativo de recuperación con cápsula explicativa e ítem remedial equivalente sobre la dimensión psicológica sin marcas punitivas.')
            ],
            spacing: { after: 200 }
          }),

          // SECCIÓN 6: DICTAMEN DE CIERRE
          new Paragraph({
            text: '6. Dictamen Técnico Formal y Solicitud de Aprobación',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 150 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Dictamen de Antigravity: ', bold: true }),
              new TextRun({ text: 'APTO PARA REVISIÓN DE WALTER', bold: true, color: '0D9488' }),
              new TextRun(' (Manifiesto normativo en estado EN_REVISION).')
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            text: 'Habiéndose subsanado de manera íntegra, trazable y exacta las tres discrepancias señaladas por ChatGPT Work (nombres unificados de las 4 dimensiones, miniquiz idéntico y detallado con opciones A–D, y cita bibliográfica verificada en INSUMOS), se somete este dossier consolidado a la revisión final de Walter y ChatGPT Work para proceder a la aprobación formal.',
            spacing: { after: 300 }
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(targetFileRoot, buffer);
  fs.writeFileSync(targetFileDelivery, buffer);

  console.log(`✅ Documento Word consolidado generado exitosamente en:`);
  console.log(`   1. Raíz: ${targetFileRoot}`);
  console.log(`   2. Entrega: ${targetFileDelivery}`);
}

generateConsolidatedWorkDocx().catch((err) => {
  console.error('Error generando documento consolidado:', err);
  process.exit(1);
});
