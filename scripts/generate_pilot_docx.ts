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

async function main(): Promise<void> {
  const deliveryPath = path.resolve(
    __dirname,
    '..',
    'SALIDA_SISTEMA_LECCIONES_V2',
    'EJECUCION_2026-10-09_1735',
    '05_PILOTO',
    '110-7-CIE-OA01',
    'Clase_01',
    'Plan_Maestro_Clase01_7B_CIE_OA01_2026-10-09_17-45.docx'
  );

  const rootPath = path.resolve(
    __dirname,
    '..',
    'PLAN_MAESTRO_CLASE01_CIENCIAS_7B_OA01_PARA_WORK.docx'
  );

  console.log('Generando documento DOCX oficial corregido de la Clase 1 de Ciencias...');

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

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'PLAN MAESTRO DE CLASE — ESTUDIOSIMPLE',
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 150 }
          }),
          new Paragraph({
            text: 'Ciencias Naturales 7.° Básico — OA01 (Clase 1 de 6)',
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
            spacing: { after: 250 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Título de la Lección: ', bold: true }),
              new TextRun('Las Dimensiones de la Sexualidad y el Inicio de la Pubertad\n'),
              new TextRun({ text: 'Fecha y Hora: ', bold: true }),
              new TextRun('2026-10-09 18:35 [America/Santiago]\n'),
              new TextRun({ text: 'Estado de Gobernanza: ', bold: true }),
              new TextRun('EN_REVISION (Aprobación reservada formalmente a Walter y ChatGPT Work)\n'),
              new TextRun({ text: 'Fuente Curricular Oficial: ', bold: true }),
              new TextRun('Texto del estudiante de Ciencias Naturales 7° básico SM (Edición 2024, SM S.A. / MINEDUC, ISBN 978-956-403-295-5, Unidad 4: Salud sexual y reproducción, págs. 114 a 125)')
            ],
            spacing: { after: 300 }
          }),

          // SUB-OBJETIVO
          new Paragraph({
            text: 'Subobjetivo Específico de Aprendizaje',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 }
          }),
          new Paragraph({
            text: 'Identificar las cuatro dimensiones de la sexualidad humana (biológica, afectiva, psicológica y social) y reconocer que el inicio de la pubertad está regulado por el eje neuroendocrino hipotálamo-hipófisis-gónadas.',
            spacing: { after: 250 }
          }),

          // ESTRUCTURA DE 8 ETAPAS
          new Paragraph({
            text: 'Estructura Oficial de Ocho Etapas Invariables',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 }
          }),
          new Paragraph({
            text: '1. Inicio (Acogida, encuadre 1 de 6, activación y ruta)\n2. Video Motivacional (7 diapositivas con cláusula No text drawn by AI)\n3. Recorrido (Indagación socrática y conversación guiada)\n4. Video Explicativo (7 diapositivas: 4 dimensiones [biológica, afectiva, psicológica, social], eje hormonal, Caso 1 de Martín y Regla de Oro)\n5. Práctica (Organizador de 4 cuadrantes en cuaderno físico)\n6. Resumen (3 ideas fuerza y tarjeta de síntesis)\n7. Miniquiz (3 preguntas psicométricas completas con opciones A-D y recuperación formativa)\n8. Cierre (Metacognición y transferencia a Clase 2)',
            spacing: { after: 250 }
          }),

          // TABLA DE DIAPOSITIVAS
          new Paragraph({
            text: 'Storyboards de Videos Audiovisuales (14 Diapositivas)',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Lámina', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Etapa / Video', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Título', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Propósito Pedagógico', bold: true, color: 'FFFFFF' })] })], borders: tableBorder, shading: headerShading })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('G1-G7')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Video Motivacional')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('El Gran Cambio de Sofía y Tomás')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Despertar curiosidad sobre los cambios físicos y emocionales al crecer (exactamente 7 diapositivas)')], borders: tableBorder })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('E1-E7')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Video Explicativo')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Las 4 Dimensiones y el Eje Hormonal')], borders: tableBorder }),
                  new TableCell({ children: [new Paragraph('Formalización conceptual de las 4 dimensiones (biológica, afectiva, psicológica, social), modelamiento en E6 y Regla de Oro en E7 (exactamente 7 diapositivas)')], borders: tableBorder })
                ]
              })
            ]
          }),

          // MINIQUIZ DETALLADO
          new Paragraph({
            text: 'Evaluación Psicométrica Formal (Miniquiz Completo)',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 }
          }),
          new Paragraph({
            text: 'Pregunta 1:',
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
            text: 'Pregunta 2:',
            children: [new TextRun({ text: 'Pregunta 2 (Q2-CIE7-OA01): ', bold: true }), new TextRun('¿Qué estructura del sistema nervioso central inicia la secuencia hormonal que activa la pubertad al estimular a la glándula hipófisis?')],
            spacing: { after: 60 }
          }),
          new Paragraph({
            text: '• A) El hipotálamo. [CLAVE CORRECTA]\n• B) El cerebelo.\n• C) La médula espinal.\n• D) El lóbulo occipital.',
            spacing: { after: 80 }
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Justificación: ', bold: true }), new TextRun('El hipotálamo sintetiza y libera neurohormonas (GnRH) que viajan a la hipófisis anterior para activar la producción de gonadotropinas. Distractores: B (equilibrio), C (impulsos nerviosos), D (visión).')],
            spacing: { after: 180 }
          }),

          new Paragraph({
            text: 'Pregunta 3:',
            children: [new TextRun({ text: 'Pregunta 3 (Q3-CIE7-OA01): ', bold: true }), new TextRun('Dos amigos conversan con sinceridad, se brindan apoyo mutuo en un momento difícil y se tratan con respeto y afecto. ¿Qué dimensiones de la sexualidad humana se manifiestan principalmente en esta situación?')],
            spacing: { after: 60 }
          }),
          new Paragraph({
            text: '• A) Exclusivamente la dimensión biológica y genética.\n• B) Las dimensiones afectiva y social. [CLAVE CORRECTA]\n• C) Únicamente la dimensión anatómica y hormonal.\n• D) Ninguna dimensión, ya que no intervienen médicos.',
            spacing: { after: 80 }
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Justificación: ', bold: true }), new TextRun('El apoyo emocional, el cariño y el respeto interpersonal articulan las dimensiones afectiva (sentimientos y vínculos) y social (convivencia y valores). Distractores: A y C (fisiológicos ausentes), D (la sexualidad ocurre en la vida cotidiana de todas las personas).')],
            spacing: { after: 180 }
          }),

          new Paragraph({
            children: [
              new TextRun({ text: 'Parámetros del Miniquiz: ', bold: true }),
              new TextRun('Umbral de aprobación de al menos 2 respuestas correctas de 3 (≥2/3). Las claves privadas se mantienen ocultas antes de contestar. Si el estudiante obtiene menos de 2, se activa el bucle formativo de recuperación sin marcas punitivas.')
            ],
            spacing: { after: 200 }
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(deliveryPath, buffer);
  fs.writeFileSync(rootPath, buffer);
  console.log(`✅ Documento DOCX del Plan Maestro generado:`);
  console.log(`   1. Entrega: ${deliveryPath}`);
  console.log(`   2. Raíz: ${rootPath}`);
}

main().catch((err) => {
  console.error('Error fatal generando DOCX del piloto:', err);
  process.exit(1);
});
