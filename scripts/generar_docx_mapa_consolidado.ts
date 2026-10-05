import * as fs from 'fs';
import * as path from 'path';

// Cargar la libreria docx desde node_modules de Web Studio Simple
const docxPath = path.resolve('d:/StudioSimple - Antigravity/Web Studio Simple/node_modules/docx');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  WidthType,
  BorderStyle
} = require(docxPath);

function createHeading1(text: string) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 180 },
    run: {
      font: 'Arial',
      size: 32, // 16pt
      bold: true,
      color: '1E3A8A'
    }
  });
}

function createHeading2(text: string) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    run: {
      font: 'Arial',
      size: 26, // 13pt
      bold: true,
      color: '0D9488'
    }
  });
}

function createHeading3(text: string) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 80 },
    run: {
      font: 'Arial',
      size: 22, // 11pt
      bold: true,
      color: '334155'
    }
  });
}

function createParagraph(text: string, bold = false) {
  return new Paragraph({
    spacing: { before: 80, after: 80, line: 276 },
    children: [
      new TextRun({
        text: text,
        font: 'Arial',
        size: 20, // 10pt
        bold: bold,
        color: '1E293B'
      })
    ]
  });
}

function createBullet(title: string, desc: string) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 60, after: 60, line: 260 },
    children: [
      new TextRun({
        text: title + ': ',
        font: 'Arial',
        size: 20,
        bold: true,
        color: '0F172A'
      }),
      new TextRun({
        text: desc,
        font: 'Arial',
        size: 20,
        color: '334155'
      })
    ]
  });
}

function createCallout(label: string, text: string) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.SINGLE, size: 24, color: '0D9488' }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: 'F0FDFA' },
            margins: { top: 140, bottom: 140, left: 180, right: 180 },
            children: [
              new Paragraph({
                spacing: { before: 40, after: 40 },
                children: [
                  new TextRun({ text: label + ' ', font: 'Arial', size: 20, bold: true, color: '0F766E' }),
                  new TextRun({ text: text, font: 'Arial', size: 20, color: '134E4A' })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

function createTableHeader(titles: string[], widths: number[]) {
  return new TableRow({
    tableHeader: true,
    children: titles.map((title, i) => new TableCell({
      width: { size: widths[i], type: WidthType.PERCENTAGE },
      shading: { fill: '1E3A8A' },
      margins: { top: 120, bottom: 120, left: 120, right: 120 },
      children: [
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({ text: title, font: 'Arial', size: 18, bold: true, color: 'FFFFFF' })
          ]
        })
      ]
    }))
  });
}

function createTableRow(cells: string[], widths: number[], isEven: boolean) {
  return new TableRow({
    children: cells.map((cellText, i) => new TableCell({
      width: { size: widths[i], type: WidthType.PERCENTAGE },
      shading: { fill: isEven ? 'F8FAFC' : 'FFFFFF' },
      margins: { top: 100, bottom: 100, left: 120, right: 120 },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
        left: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
        right: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' }
      },
      children: [
        new Paragraph({
          children: [
            new TextRun({ text: cellText, font: 'Arial', size: 18, color: '1E293B' })
          ]
        })
      ]
    }))
  });
}

async function buildDocx() {
  console.log('Iniciando construccion del Documento Maestro DOCX...');

  // Tabla comparativa de Hashes
  const hashHeaders = ['Asignatura y OA', 'Tipo', 'Archivo DOCX', 'Tamano', 'Hash SHA256 (Verificado)', 'Divergencia'];
  const hashWidths = [18, 12, 28, 12, 18, 12];
  const hashRowsData = [
    ['Ciencias Naturales OA01', 'Oficial', 'Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx', '82,152 B', '07a82f7119a7cba25982ac03d5c0841ac997dcdeef74f28629a207f1589e1780', '0 B / Identico'],
    ['Ciencias Naturales OA01', 'Alias', 'Ciencias_OA01.docx', '82,152 B', '07a82f7119a7cba25982ac03d5c0841ac997dcdeef74f28629a207f1589e1780', '0 B / Identico'],
    ['Historia y Geografia OA02', 'Oficial', 'Plan_Maestro_7Básico_110-7-HIS-OA02_5Lecciones.docx', '59,282 B', '6102209f960b4fae21913c01559b1092adf2d477556f1890c00fef5cfe2d81ea', '0 B / Identico'],
    ['Historia y Geografia OA02', 'Alias', 'Historia_OA02.docx', '59,282 B', '6102209f960b4fae21913c01559b1092adf2d477556f1890c00fef5cfe2d81ea', '0 B / Identico'],
    ['Ingles EFL OA09', 'Oficial', 'Plan_Maestro_7Básico_110-7-ING-OA09_6Lecciones.docx', '66,932 B', '55e4832c21b4fc63e01295499ee241b1aba27d5e8838f64c5761ae3848c08d85', '0 B / Identico'],
    ['Ingles EFL OA09', 'Alias', 'Ingles_OA09.docx', '66,932 B', '55e4832c21b4fc63e01295499ee241b1aba27d5e8838f64c5761ae3848c08d85', '0 B / Identico'],
    ['Lengua y Literatura OA03', 'Oficial', 'Plan_Maestro_7Básico_110-7-LEN-OA03_6Lecciones.docx', '67,910 B', '306a56cd08d18eab309253553d68767fdba73eeb62114657fb341375899af41b', '0 B / Identico'],
    ['Lengua y Literatura OA03', 'Alias', 'Lenguaje_OA03.docx', '67,910 B', '306a56cd08d18eab309253553d68767fdba73eeb62114657fb341375899af41b', '0 B / Identico'],
    ['Matematica OA01', 'Oficial', 'Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones.docx', '40,402 B', 'f53dcdb5f481ae288757db6fa858dacdc39bc235d2407347ceb99c9ec4ca0087', 'Fuente unica 6 lecc.'],
    ['Matematica OA01', 'Referencia', 'referencias/OA01_Matematica_..._Guiones.docx', '51,200 B', 'Prototipo historico previo de 5 clases (2026-09-01)', 'Aislado en ref/']
  ];

  const tableHashes = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      createTableHeader(hashHeaders, hashWidths),
      ...hashRowsData.map((row, idx) => createTableRow(row, hashWidths, idx % 2 === 1))
    ]
  });

  // Tabla Maestra de Rutas
  const routeHeaders = ['Ruta de Origen Real (ZIP Previo)', 'Ruta Actual Vigente en Repositorio', 'Funcion Principal', 'Estado', 'Fuente Vigente'];
  const routeWidths = [24, 26, 22, 14, 14];
  const routeRowsData = [
    ['TEMARIOS EELL/', 'TEMARIOS EELL/', 'Temarios oficiales MINEDUC para examenes libres', 'Vigente intacto', 'Oficial MINEDUC'],
    ['INSUMOS/', 'INSUMOS/', 'Textos escolares, guias y programas de estudio', 'Vigente (fuera Git)', 'Textos MINEDUC'],
    ['PLANES MAESTROS PRESENTACIONES/', 'PLANES MAESTROS PRESENTACIONES/', 'Referencia de diseno visual y tipografia en PowerPoint', 'Vigente (referencia)', 'Paquetes Work 7B'],
    ['LECCIONES/Analisis_Estandarizacion_8_Etapas...docx', 'MANUAL MAESTRO/Analisis_Estandarizacion_8_Etapas...docx', 'Marco metodologico transversal de 8 etapas duales', 'Vigente', 'Diseno EstudioSimple'],
    ['CUENTA VISTA MERCADO LIBRE WALTER/', 'C:\\Users\\walte\\CUENTA VISTA MERCADO LIBRE WALTER', 'Datos bancarios y financieros personales', 'Aislado fuera proy.', 'Carpeta de usuario'],
    ['DESCARGA_LECCIONES/README_WORK_INSTRUCCIONES.md', 'LECCIONES/7_Basico/README_WORK_INSTRUCCIONES.md', 'Guia de operacion de paquetes para ChatGPT Work', 'Vigente', 'Operaciones Work'],
    ['DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_...CIE...txt', 'LECCIONES/7_Basico/Ciencias_Naturales/OA01/Prompts_...txt', 'Prompts de 84 laminas para diapositivas de Ciencias', 'Vigente', 'Extraccion oficial'],
    ['LECCIONES/Plan_Maestro_7Básico_110-7-CIE-OA01...docx', 'LECCIONES/7_Basico/Ciencias_Naturales/OA01/Plan_Maestro...docx', 'Plan maestro oficial 6 lecciones Ciencias OA01', 'Vigente oficial', 'Antigravity / Work'],
    ['LECCIONES/Ciencias_OA01.docx', 'LECCIONES/7_Basico/Ciencias_Naturales/OA01/Ciencias_OA01.docx', 'Copia alias identica para compatibilidad de scripts', 'Vigente (alias)', 'DOCX Oficial'],
    ['DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_...HIS...txt', 'LECCIONES/7_Basico/Historia_Geografia/OA02/Prompts_...txt', 'Prompts de 70 laminas para diapositivas de Historia', 'Vigente', 'Extraccion oficial'],
    ['LECCIONES/Plan_Maestro_7Básico_110-7-HIS-OA02...docx', 'LECCIONES/7_Basico/Historia_Geografia/OA02/Plan_Maestro...docx', 'Plan maestro oficial 5 lecciones Historia OA02', 'Vigente oficial', 'Antigravity / Work'],
    ['LECCIONES/Historia_OA02.docx', 'LECCIONES/7_Basico/Historia_Geografia/OA02/Historia_OA02.docx', 'Copia alias identica para compatibilidad de scripts', 'Vigente (alias)', 'DOCX Oficial'],
    ['DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_...ING...txt', 'LECCIONES/7_Basico/Ingles/OA09/Prompts_...txt', 'Prompts de 84 laminas para diapositivas de Ingles', 'Vigente', 'Extraccion oficial'],
    ['LECCIONES/Plan_Maestro_7Básico_110-7-ING-OA09...docx', 'LECCIONES/7_Basico/Ingles/OA09/Plan_Maestro...docx', 'Plan maestro oficial 6 lecciones Ingles OA09', 'Vigente oficial', 'Antigravity / Work'],
    ['LECCIONES/Ingles_OA09.docx', 'LECCIONES/7_Basico/Ingles/OA09/Ingles_OA09.docx', 'Copia alias identica para compatibilidad de scripts', 'Vigente (alias)', 'DOCX Oficial'],
    ['DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_...LEN...txt', 'LECCIONES/7_Basico/Lengua_Literatura/OA03/Prompts_...txt', 'Prompts de 84 laminas para diapositivas de Lenguaje', 'Vigente', 'Extraccion oficial'],
    ['LECCIONES/Plan_Maestro_7Básico_110-7-LEN-OA03...docx', 'LECCIONES/7_Basico/Lengua_Literatura/OA03/Plan_Maestro...docx', 'Plan maestro oficial 6 lecciones Lenguaje OA03', 'Vigente oficial', 'Antigravity / Work'],
    ['LECCIONES/Lenguaje_OA03.docx', 'LECCIONES/7_Basico/Lengua_Literatura/OA03/Lenguaje_OA03.docx', 'Copia alias identica para compatibilidad de scripts', 'Vigente (alias)', 'DOCX Oficial'],
    ['LECCIONES/Plan_Maestro_7Básico_110-7-MAT-OA01...docx', 'LECCIONES/7_Basico/Matematica/OA01/Plan_Maestro...docx', 'Plan maestro oficial 6 lecciones Matematica OA01', 'Vigente oficial', 'Antigravity / Work'],
    ['LECCIONES/OA01_Matematica_..._Guiones.docx', 'LECCIONES/7_Basico/Matematica/OA01/referencias/OA01_...docx', 'Borrador prototipo inicial de 5 clases con guiones', 'Referencia hist.', 'Prototipo 2026-09-01']
  ];

  const tableRoutes = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      createTableHeader(routeHeaders, routeWidths),
      ...routeRowsData.map((row, idx) => createTableRow(row, routeWidths, idx % 2 === 1))
    ]
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // PORTADA
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 720, after: 120 },
            children: [
              new TextRun({
                text: 'ESTUDIOSIMPLE',
                font: 'Arial',
                size: 44,
                bold: true,
                color: '1E3A8A'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 360 },
            children: [
              new TextRun({
                text: 'MAPA CONSOLIDADO Y SANEAMIENTO ARQUITECTONICO',
                font: 'Arial',
                size: 28,
                bold: true,
                color: '0D9488'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 720 },
            children: [
              new TextRun({
                text: 'Reestructuracion Integral de Carpetas, Gobernanza de Skills, Evidencia Empirica de Archivos y Manifests Curriculares Oficiales',
                font: 'Arial',
                size: 20,
                color: '64748B'
              })
            ]
          }),
          createCallout('ESTADO DE HOMOLOGACION:', 'Documento rector cerrado y validado para la construccion de la Skill Universal de Lecciones de 3° a 8° Basico. Version 1.0.0 Oficial (2026-10-05).'),

          // SECCION 1
          createHeading1('1. Decisiones Estructurales y Conservacion de los 5 Pilares'),
          createParagraph('El proyecto EstudioSimple organiza su arquitectura de produccion pedagógica e ingenieril en torno a cinco pilares fundamentales que han sido saneados y preservados de forma inmutable:'),
          createBullet('1. TEMARIOS EELL', 'Permanece intacta en la raiz del proyecto como la referencia oficial inmutable de los Objetivos de Aprendizaje priorizados por el MINEDUC para examenes libres.'),
          createBullet('2. INSUMOS', 'Conserva intacta su clasificacion por material, curso y asignatura (Libros Digitales, Guias, Resumenes y Ensayos). Se mantiene formalmente fuera de Git y de paquetes de entrega por su peso documental (26.8 GB).'),
          createBullet('3. MANUAL MAESTRO', 'Concentra el canon pedagogico e institucional de la plataforma. Aloja el documento rector Analisis_Estandarizacion_8_Etapas_EstudioSimple.docx.'),
          createBullet('4. PLANES MAESTROS PRESENTACIONES', 'Repositorio de referencia para diseno visual, jerarquia tipografica y maquetacion de diapositivas en PowerPoint para ChatGPT Work. Todo contenido didactico se subordina a la leccion completa vigente.'),
          createBullet('5. LECCIONES', 'Estructurada de forma jerarquica por curso, asignatura y OA. Cada OA cuenta con su manifest.json, un unico DOCX oficial, sus prompts limpios y carpetas de referencias aisladas.'),

          // SECCION 2
          createHeading1('2. Delimitacion de Responsabilidades y Fronteras Tecnicas'),
          createParagraph('Para erradicar ambiguedades operativas entre agentes y entornos de produccion, se formaliza la siguiente division de trabajo:'),
          createBullet('Antigravity (Ingenieria Curricular y Desarrollo Web)', 'Genera y mantiene las lecciones completas en TypeScript y los documentos oficiales DOCX (Plan Maestro con tablas tecnicas y prompts limpios). Sus reglas NO evaluan conteo de palabras ni duracion de videos. Queda terminantemente prohibido que genere o modifique presentaciones PPTX.'),
          createBullet('Codex / ChatGPT Work (Maquetacion Grafica de Diapositivas)', 'Consume los paquetes oficiales entregados y adapta los guiones a la composicion visual en diapositivas, asumiendo la responsabilidad exclusiva de generar y validar las presentaciones PPTX en su propio entorno con Python.'),
          createBullet('Produccion Audiovisual (Google Vids)', 'La duracion acustica real, el calculo de velocidad de locucion y la sincronizacion temporal se revisan empiricamente en Google Vids durante la produccion del video (grabacion y sintesis de voz), sin imponer metricas ficticias a Antigravity ni a Codex/Work.'),

          // SECCION 3
          createHeading1('3. Resolucion Documentada de los 8 Puntos de Saneamiento'),
          createHeading2('Punto 1: Jerarquia de LECCIONES por Curso, Asignatura y OA'),
          createParagraph('Se elimino la distribucion plana anterior en la raiz de LECCIONES/. Se implemento la estructura canonica LECCIONES/7_Basico/<Asignatura>/<OA>/ para Ciencias Naturales (OA01), Historia y Geografia (OA02), Ingles (OA09), Lengua y Literatura (OA03) y Matematica (OA01).'),

          createHeading2('Punto 2: Origen Real y Destino Vigente de Prompts TXT'),
          createParagraph('En el archivo ZIP anterior, los prompts de texto plano se encontraban en DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/. Cada archivo fue extraido y reubicado junto a su respectivo OA en LECCIONES/7_Basico/<Asignatura>/<OA>/Prompts_Work_...txt. El instructivo operacional se ubica en LECCIONES/7_Basico/README_WORK_INSTRUCCIONES.md.'),

          createHeading2('Punto 3: Desambiguacion de Matematica OA01'),
          createParagraph('Se declaro formalmente Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones.docx como la UNICA fuente oficial de produccion (6 lecciones completas con estructura de 8 etapas duales). El archivo previo OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx corresponde a un borrador preliminar de 5 clases y fue aislado en la subcarpeta referencias/ sin intervencion en el pipeline.'),

          createHeading2('Punto 4: Metodologia de 8 Etapas en MANUAL MAESTRO'),
          createParagraph('El archivo Analisis_Estandarizacion_8_Etapas_EstudioSimple.docx se traslado formalmente a MANUAL MAESTRO/ como especificacion rectora de diseno instruccional transversal.'),

          createHeading2('Punto 5: Aislamiento Absoluto de Informacion Bancaria'),
          createParagraph('La carpeta CUENTA VISTA MERCADO LIBRE WALTER fue extraida fisicamente del repositorio hacia C:\\Users\\walte\\CUENTA VISTA MERCADO LIBRE WALTER. Se verifico en el historial completo de Git que NUNCA estuvo commiteada, garantizando cero riesgo de exposicion.'),

          createHeading2('Punto 6: Exclusiones de Git y Blindaje de _archivo/'),
          createParagraph('Se valido que .gitignore excluye INSUMOS/, CONOCIMIENTO/, _archivo/ y archivos .env*, mientras conserva activamente .env.example como plantilla versionada. Se establecio en AGENTS.md la prohibicion estricta para las Skills de buscar o indexar en _archivo/.'),

          createHeading2('Punto 7: Rol de PLANES MAESTROS PRESENTACIONES'),
          createParagraph('Funciona como catalogo de referencia visual para diseno de láminas en PowerPoint operado por Work. El contenido didactico y las preguntas de evaluacion deben subordinarse y provenir de la leccion oficial en LECCIONES/.'),

          createHeading2('Punto 8: Organizacion Jerarquica de Reglas por Alcance'),
          createParagraph('Se separaron las directivas en 4 ambitos explicitos:'),
          createBullet('Universal (3° a 8° Basico)', 'Estructura pedagogica de 8 etapas duales, prompts de arte sin texto generado por IA, puente con cuaderno fisico, honestidad epistemologica y evaluacion formativa no punitiva.'),
          createBullet('Por Curso (Perfil 7° Basico)', 'Regla 7B-001 (14 diapositivas bimodales: 7 Gancho + 7 Explicacion) y Regla 7B-006 (reactivos de 4 alternativas A, B, C, D con distractores psicometricos).'),
          createBullet('Por Asignatura', 'Enfoques disciplinares MINEDUC: CPA en Matematica, indagacion en Ciencias, comprension lectora en Lenguaje, pensamiento historico en Historia, enfoque funcional en Ingles.'),
          createBullet('Por OA', 'Cobertura curricular estricta de temarios oficiales y leccion oficial vigente.'),

          // SECCION 4
          createHeading1('4. Evidencia Empirica de Verificacion de Archivos'),
          createHeading2('A. Hashes SHA256 Oficiales y Alias (Cero Divergencia Verificada)'),
          createParagraph('Se contrastaron los archivos DOCX oficiales con sus copias alias mediante calculo criptografico de SHA256 y tamano exacto en bytes, certificando que la divergencia es exactamente 0 bytes:'),
          tableHashes,

          createHeading2('B. Resolucion de Rutas TypeScript'),
          createBullet('Raiz del Repositorio', 'd:/StudioSimple - Antigravity/'),
          createBullet('Raiz de Aplicacion SPA', 'Web Studio Simple/'),
          createBullet('Alias tsconfig.json', '@/ mapea a ./src/* en Web Studio Simple/tsconfig.json'),
          createBullet('Ruta Fisica de Lecciones', 'Web Studio Simple/src/data/lessons/... (ej. ciencias_7b_oa01_clase01.ts a clase06.ts, matematica_7b_oa01_clase01.ts a clase06.ts)'),

          // SECCION 5
          createHeading1('5. Tabla Maestra de Rutas Consolidadas'),
          createParagraph('A continuacion se presenta la matriz completa de transformacion de rutas desde la estructura inicial hasta la organizacion canonica vigente:'),
          tableRoutes,

          // SECCION 6
          createHeading1('6. Manifests Oficiales y Fundamentacion Curricular por OA'),
          createParagraph('Cada OA cuenta con un archivo manifest.json estandarizado en su directorio que declara la fuente oficial unica, los prompts asociados, las referencias oficiales del MINEDUC y las rutas de resolucion de codigo:'),

          createHeading2('A. Ciencias Naturales 7° Básico - OA01'),
          createBullet('Ubicacion', 'LECCIONES/7_Basico/Ciencias_Naturales/OA01/manifest.json'),
          createBullet('Identificador y Version', '110-7-CIE-OA01 | Version 1.4.0 (Oficial y Certificado)'),
          createBullet('Fuente Oficial Unica DOCX', 'Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx (82,152 bytes | SHA256: 07a82f7119...)'),
          createBullet('Alias Validado', 'Ciencias_OA01.docx (82,152 bytes | SHA256 identico verificado)'),
          createBullet('Prompts TXT', 'Prompts_Work_Ciencias_7B_OA01.txt (84 laminas, 14 por clase, origen: DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/)'),
          createBullet('Temario EELL MINEDUC', 'TEMARIOS EELL/temario 7° basico.pdf, Pagina 7 (Eje Biologia - OA 1: Sexualidad y Afectividad)'),
          createBullet('Texto Escolar Oficial', 'INSUMOS/LIBROS DIGITALES Y GUIAS/110-7/Ciencias Naturales.pdf (Unidad 1, Leccion 1, pag. 16 a 29)'),
          createBullet('Codigo TypeScript', 'Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts ... clase06.ts'),

          createHeading2('B. Historia, Geografía y Ciencias Sociales 7° Básico - OA02'),
          createBullet('Ubicacion', 'LECCIONES/7_Basico/Historia_Geografia/OA02/manifest.json'),
          createBullet('Identificador y Version', '110-7-HIS-OA02 | Version 1.4.0 (Oficial y Certificado)'),
          createBullet('Fuente Oficial Unica DOCX', 'Plan_Maestro_7Básico_110-7-HIS-OA02_5Lecciones.docx (59,282 bytes | SHA256: 6102209f96...)'),
          createBullet('Alias Validado', 'Historia_OA02.docx (59,282 bytes | SHA256 identico verificado)'),
          createBullet('Prompts TXT', 'Prompts_Work_Historia_7B_OA02.txt (70 laminas, 14 por clase, origen: DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/)'),
          createBullet('Temario EELL MINEDUC', 'TEMARIOS EELL/temario 7° basico.pdf, Pagina 11 (Eje Historia - OA 2: Hominizacion y Neolitico)'),
          createBullet('Texto Escolar Oficial', 'INSUMOS/LIBROS DIGITALES Y GUIAS/110-7/Historia, Geografia y Ciencias Sociales.pdf (Unidad 1, Leccion 2)'),
          createBullet('Codigo TypeScript', 'Web Studio Simple/src/data/lessons/historia_7b_oa02_clase01.ts'),

          createHeading2('C. Inglés EFL 7° Básico - OA09'),
          createBullet('Ubicacion', 'LECCIONES/7_Basico/Ingles/OA09/manifest.json'),
          createBullet('Identificador y Version', '110-7-ING-OA09 | Version 1.8.0 (Oficial y Certificado)'),
          createBullet('Fuente Oficial Unica DOCX', 'Plan_Maestro_7Básico_110-7-ING-OA09_6Lecciones.docx (66,932 bytes | SHA256: 55e4832c21...)'),
          createBullet('Alias Validado', 'Ingles_OA09.docx (66,932 bytes | SHA256 identico verificado)'),
          createBullet('Prompts TXT', 'Prompts_Work_Ingles_7B_OA09.txt (84 laminas, 14 por clase, origen: DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/)'),
          createBullet('Temario EELL MINEDUC', 'TEMARIOS EELL/temario 7° basico.pdf, Pagina 15 (Eje Expresion Oral - OA 9: Comprension de textos orales)'),
          createBullet('Texto Escolar Oficial', 'INSUMOS/LIBROS DIGITALES Y GUIAS/110-7/Ingles.pdf (Unit 1: Feelings and Opinions)'),
          createBullet('Codigo TypeScript', 'Web Studio Simple/src/data/lessons/ingles_7b_oa09_clase01.ts'),

          createHeading2('D. Lengua y Literatura 7° Básico - OA03'),
          createBullet('Ubicacion', 'LECCIONES/7_Basico/Lengua_Literatura/OA03/manifest.json'),
          createBullet('Identificador y Version', '110-7-LEN-OA03 | Version 2.6.0 (Oficial y Certificado)'),
          createBullet('Fuente Oficial Unica DOCX', 'Plan_Maestro_7Básico_110-7-LEN-OA03_6Lecciones.docx (67,910 bytes | SHA256: 306a56cd08...)'),
          createBullet('Alias Validado', 'Lenguaje_OA03.docx (67,910 bytes | SHA256 identico verificado)'),
          createBullet('Prompts TXT', 'Prompts_Work_Lenguaje_7B_OA03.txt (84 laminas, 14 por clase, origen: DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/)'),
          createBullet('Temario EELL MINEDUC', 'TEMARIOS EELL/temario 7° basico.pdf, Pagina 3 (Eje Lectura - OA 3: Analisis de narraciones)'),
          createBullet('Texto Escolar Oficial', 'INSUMOS/LIBROS DIGITALES Y GUIAS/110-7/Lengua y literatura.pdf (Unidad 1: Heroes y Heroinas)'),
          createBullet('Codigo TypeScript', 'Web Studio Simple/src/data/lessons/lengua_7b_oa03_clase01.ts'),

          createHeading2('E. Matemática 7° Básico - OA01'),
          createBullet('Ubicacion', 'LECCIONES/7_Basico/Matematica/OA01/manifest.json'),
          createBullet('Identificador y Version', '110-7-MAT-OA01 | Version 1.0.0-certificada (Oficial y Certificado)'),
          createBullet('Fuente Oficial Unica DOCX', 'Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones.docx (40,402 bytes | SHA256: f53dcdb5f4...)'),
          createBullet('Borrador Historico Aislado', 'referencias/OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx (5 clases de prototipo)'),
          createBullet('Prompts', 'Integrados en codigo TypeScript y en tablas de especificaciones escena por escena del DOCX'),
          createBullet('Temario EELL MINEDUC', 'TEMARIOS EELL/temario 7° basico.pdf, Pagina 5 (Eje Numeros y Operaciones - OA 1: Numeros enteros)'),
          createBullet('Texto Escolar Oficial', 'INSUMOS/LIBROS DIGITALES Y GUIAS/110-7/Matematica.pdf (Unidad 1, Tema 1, pag. 12 a 23)'),
          createBullet('Codigo TypeScript', 'Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase01.ts ... clase06.ts'),

          // SECCION 7
          createHeading1('7. Registro de Validacion y Cierre Tecnico'),
          createParagraph('Todas las operaciones fueron verificadas exitosamente bajo estandares de ingenieria agéntica:'),
          createBullet('Compilacion Web SPA', 'npm run build --prefix "Web Studio Simple" superada con exito (codigo de salida 0 en 13.10 segundos). Cero errores de TypeScript y empaquetado optimo en dist/.'),
          createBullet('Sincronizacion Git Atomica', 'Commit 6e81ff3 y 59599f6 integrados y sincronizados en la rama main de GitHub mediante scripts/git_sync.ts.'),
          createBullet('Persistencia Documental', 'Bitacora oficial registrada en memoria/2026-10-05_20-00_Reestructuracion_Canonica_Lecciones_Manifests_Y_Gobernanza.md.')
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);

  // 1. Guardar en el proyecto en MANUAL MAESTRO/
  const targetProject = 'd:/StudioSimple - Antigravity/MANUAL MAESTRO/Mapa_Consolidado_Reestructuracion_EstudioSimple.docx';
  fs.writeFileSync(targetProject, buffer);
  console.log('Documento guardado exitosamente en:', targetProject, `(${buffer.length} bytes)`);

  // 2. Guardar en el directorio de artefactos para descarga directa
  const targetArtifact = 'C:/Users/walte/.gemini/antigravity-ide/brain/cc9a63f7-a1de-423a-a747-73ef2d9c6038/Mapa_Consolidado_Reestructuracion_EstudioSimple.docx';
  fs.writeFileSync(targetArtifact, buffer);
  console.log('Documento guardado exitosamente en artefactos:', targetArtifact, `(${buffer.length} bytes)`);
}

buildDocx().catch(err => {
  console.error('Error generando DOCX:', err);
  process.exit(1);
});
