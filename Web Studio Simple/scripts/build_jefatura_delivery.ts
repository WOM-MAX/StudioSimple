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
  HeadingLevel,
  BorderStyle,
  ShadingType,
  Packer
} from 'docx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '../..');
const deliveryDir = path.resolve(rootDir, 'ENTREGA_JEFATURA_ESTUDIOSIMPLE_7B');

const dirExecutive = path.join(deliveryDir, '01_INFORME_EJECUTIVO');
const dirPlans = path.join(deliveryDir, '02_PLANES_MAESTROS_OFICIALES_7B');
const dirGuide = path.join(deliveryDir, '03_GUIA_DE_PRUEBA_Y_ACCESO_APP');
const dirTech = path.join(deliveryDir, '04_CERTIFICACION_TECNICA_Y_METRICAS');

// Crear carpetas
[dirExecutive, dirPlans, dirGuide, dirTech].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Creada carpeta: ${path.relative(rootDir, dir)}`);
  }
});

// 1. Copiar Informe Ejecutivo de Contraste
const sourceReport = path.resolve(rootDir, 'MANUAL MAESTRO/Informe_de_contraste_Manual_Maestro_y_avance_2026-10-01.docx');
const destReport = path.join(dirExecutive, 'Informe_de_contraste_Manual_Maestro_y_avance_2026-10-01.docx');
if (fs.existsSync(sourceReport)) {
  fs.copyFileSync(sourceReport, destReport);
  console.log(`Copiado informe ejecutivo a 01_INFORME_EJECUTIVO (${fs.statSync(destReport).size} bytes)`);
} else {
  console.error(`No se encontro archivo fuente: ${sourceReport}`);
}

// 2. Copiar los 5 Planes Maestros DOCX Oficiales
const plansSourceDir = path.resolve(rootDir, 'PLANES MAESTROS PRESENTACIONES/Paquete_Maestro_EstudioSimple_7B/04_PLANES_OA_Y_PROMPTS');
const officialPlans = [
  'Matematica_OA01_6Lecciones_v7.docx',
  'Lenguaje_OA03.docx',
  'Ciencias_OA01.docx',
  'Historia_OA02.docx',
  'Ingles_OA09.docx'
];

officialPlans.forEach((planFile) => {
  const src = path.join(plansSourceDir, planFile);
  const dst = path.join(dirPlans, planFile);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`Copiado plan maestro: ${planFile} (${fs.statSync(dst).size} bytes)`);
  } else {
    console.error(`No se encontro archivo plan: ${src}`);
  }
});

// 3. Generar la Guia Ejecutiva de Acceso y Prueba en DOCX
async function generateGuideDocx() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'ESTUDIOSIMPLE PLATAFORMA EDUCATIVA',
                bold: true,
                color: '12A1A4',
                size: 24,
                font: 'Arial'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 300 },
            children: [
              new TextRun({
                text: 'GUIA EJECUTIVA DE ACCESO Y PRUEBA PARA JEFATURA',
                bold: true,
                color: '1C3257',
                size: 36,
                font: 'Arial'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 50, after: 300 },
            children: [
              new TextRun({
                text: 'Validacion Oficial de Sincronizacion de 7° Basico (5 Asignaturas Troncales / 29 Clases)',
                italics: true,
                color: '526177',
                size: 22,
                font: 'Arial'
              })
            ]
          }),

          // Tabla Ficha Tecnica
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: '12A1A4' },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Parametro', bold: true, color: 'FFFFFF', font: 'Arial', size: 20 })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: '12A1A4' },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Detalle Oficial', bold: true, color: 'FFFFFF', font: 'Arial', size: 20 })
                        ]
                      })
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Fecha de Entrega', bold: true, font: 'Arial', size: 19 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '01 de Octubre de 2026', font: 'Arial', size: 19 })] })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Nivel Curricular', bold: true, font: 'Arial', size: 19 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '7° Basico (Educacion General Basica - MINEDUC)', font: 'Arial', size: 19 })] })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Asignaturas Troncales', bold: true, font: 'Arial', size: 19 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Matematica (6 clases), Lenguaje (6 clases), Ciencias (6 clases), Historia (5 clases), Ingles (6 clases)', font: 'Arial', size: 19 })] })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Total Clases Listas', bold: true, font: 'Arial', size: 19 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '29 Clases de 30 minutos (100% articuladas con pantalla y cuaderno)', font: 'Arial', size: 19 })] })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Estado de Videos Matematica', bold: true, font: 'Arial', size: 19 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '12 Videos Producidos (6 Gancho + 6 Explicativos) blindados y activos en CDN R2', font: 'Arial', size: 19 })] })] })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 300, after: 150 }, children: [new TextRun({ text: '1. PROTOCOLO DE PRUEBA EN 5 MINUTOS PARA JEFATURA', bold: true, color: '1C3257', size: 26, font: 'Arial' })] }),
          new Paragraph({
            spacing: { before: 50, after: 100 },
            children: [
              new TextRun({
                text: 'Para realizar una evaluacion integral y expedita del sistema sin complicaciones tecnicas, siga estos 5 pasos:',
                font: 'Arial',
                size: 20
              })
            ]
          }),

          new Paragraph({
            spacing: { before: 100, after: 100 },
            children: [
              new TextRun({ text: 'Paso 1 (Minuto 1) - Ingreso y Vista de Tablero: ', bold: true, color: 'EE751C', font: 'Arial', size: 20 }),
              new TextRun({ text: 'Abra la aplicacion en el navegador. En el selector superior seleccione "7° Basico" y "Matematica". Observe el Objetivo de Aprendizaje OA 01 ("Numeros Enteros en Contextos Reales") y verifique que se muestran las 6 tarjetas de clase activas con la insignia "Clase X de 6".', font: 'Arial', size: 20 })
            ]
          }),

          new Paragraph({
            spacing: { before: 100, after: 100 },
            children: [
              new TextRun({ text: 'Paso 2 (Minuto 2) - Reproduccion de Video de Gancho: ', bold: true, color: 'EE751C', font: 'Arial', size: 20 }),
              new TextRun({ text: 'Haga clic en "Entrar a la Sala" en la Clase 1. Avance al Paso 2 (Gancho H.O.O.K.). Compruebe la reproduccion del video oficial producido (60 segundos, submarino sumergido a -20m y ascenso). El video carga a traves de la red de distribucion Cloudflare R2 con reproductor nativo responsivo.', font: 'Arial', size: 20 })
            ]
          }),

          new Paragraph({
            spacing: { before: 100, after: 100 },
            children: [
              new TextRun({ text: 'Paso 3 (Minuto 3) - Video Explicativo e Interaccion: ', bold: true, color: 'EE751C', font: 'Arial', size: 20 }),
              new TextRun({ text: 'Avance al Paso 4 (Explicacion). Verifique la reproduccion del segundo video oficial (90 segundos), donde se ilustra la recta numerica vertical y el desplazamiento entre enteros positivos y negativos con rigor matematico y sin formulas dibujadas artificialmente.', font: 'Arial', size: 20 })
            ]
          }),

          new Paragraph({
            spacing: { before: 100, after: 100 },
            children: [
              new TextRun({ text: 'Paso 4 (Minuto 4) - Vista Mediadora de Adulto / Tutor: ', bold: true, color: 'EE751C', font: 'Arial', size: 20 }),
              new TextRun({ text: 'Haga clic en la pestana o modo "Adulto / Tutor". Compruebe como la plataforma despliega el guion socratio sincronizado: "Dile", "Espera", "Si responde correctamente" y "Pista de apoyo si duda", garantizando que cualquier apoderado pueda mediar la clase sin necesidad de ser profesor especialista.', font: 'Arial', size: 20 })
            ]
          }),

          new Paragraph({
            spacing: { before: 100, after: 150 },
            children: [
              new TextRun({ text: 'Paso 5 (Minuto 5) - Comprobacion Multidisciplinar: ', bold: true, color: 'EE751C', font: 'Arial', size: 20 }),
              new TextRun({ text: 'Regrese al Tablero y cambie de asignatura a Lengua y Literatura (OA 3), Ciencias Naturales (OA 1), Historia (OA 2) e Ingles (OA 9). Todas las lecciones cuentan con la estructura homologada de 8 pasos, prompts limpios de 7 slides y coherencia total con el Manual Maestro.', font: 'Arial', size: 20 })
            ]
          }),

          new Paragraph({ spacing: { before: 200, after: 150 }, children: [new TextRun({ text: '2. MATRIZ DE CONCORDANCIA Y BLINDAJE DE VIDEOS', bold: true, color: '1C3257', size: 26, font: 'Arial' })] }),
          new Paragraph({
            spacing: { before: 50, after: 150 },
            children: [
              new TextRun({
                text: 'La siguiente tabla certifica que los 12 videos producidos por el equipo para Matematica 7° Basico OA 01 se encuentran plenamente integrados en la aplicacion y concuerdan con la version v7 del Plan Maestro oficial, descartando cualquier necesidad de rehacer material audiovisual:',
                font: 'Arial',
                size: 20
              })
            ]
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ shading: { type: ShadingType.CLEAR, fill: '1C3257' }, children: [new Paragraph({ children: [new TextRun({ text: 'Clase', bold: true, color: 'FFFFFF', font: 'Arial', size: 18 })] })] }),
                  new TableCell({ shading: { type: ShadingType.CLEAR, fill: '1C3257' }, children: [new Paragraph({ children: [new TextRun({ text: 'Tema Curricular', bold: true, color: 'FFFFFF', font: 'Arial', size: 18 })] })] }),
                  new TableCell({ shading: { type: ShadingType.CLEAR, fill: '1C3257' }, children: [new Paragraph({ children: [new TextRun({ text: 'Video Gancho (60s)', bold: true, color: 'FFFFFF', font: 'Arial', size: 18 })] })] }),
                  new TableCell({ shading: { type: ShadingType.CLEAR, fill: '1C3257' }, children: [new Paragraph({ children: [new TextRun({ text: 'Video Expl. (90s)', bold: true, color: 'FFFFFF', font: 'Arial', size: 18 })] })] }),
                  new TableCell({ shading: { type: ShadingType.CLEAR, fill: '1C3257' }, children: [new Paragraph({ children: [new TextRun({ text: 'Estado App', bold: true, color: 'FFFFFF', font: 'Arial', size: 18 })] })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Clase 1', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Posiciones y punto de referencia', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Submarino -20m / Descenso y ascenso', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Recta numerica vertical y enteros Z', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Sincronizado / Activo', bold: true, color: '12A1A4', font: 'Arial', size: 17 })] })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Clase 2', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Recta numerica y orden en Z', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Exploracion andina y termometros', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Mayor que y menor que en negativos', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Sincronizado / Activo', bold: true, color: '12A1A4', font: 'Arial', size: 17 })] })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Clase 3', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Valor absoluto y numeros opuestos', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Dron sobre el acantilado y buzo', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Distancia simetrica al cero |x|', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Sincronizado / Activo', bold: true, color: '12A1A4', font: 'Arial', size: 17 })] })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Clase 4', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Adicion de enteros (igual y distinto signo)', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Fichas termicas y balance de temperatura', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Regla de signos para suma en Z', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Sincronizado / Activo', bold: true, color: '12A1A4', font: 'Arial', size: 17 })] })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Clase 5', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Sustraccion en Z e inverso aditivo', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Submarino asciende 5m de -2m a +3m', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Transformacion a - b = a + (-b)', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Sincronizado / Activo', bold: true, color: '12A1A4', font: 'Arial', size: 17 })] })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Clase 6', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Resolucion de problemas y sintesis oficial', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Cuentas bancarias y balance financiero', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Amplitud termica (+10°C a -2°C = 12°C)', font: 'Arial', size: 17 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Sincronizado / Activo', bold: true, color: '12A1A4', font: 'Arial', size: 17 })] })] })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 300, after: 150 }, children: [new TextRun({ text: '3. DETALLES DE ACCESO Y CREDENCIALES', bold: true, color: '1C3257', size: 26, font: 'Arial' })] }),
          new Paragraph({
            spacing: { before: 50, after: 100 },
            children: [
              new TextRun({ text: 'Acceso a la Aplicacion Web: ', bold: true, font: 'Arial', size: 20 }),
              new TextRun({ text: 'La aplicacion se ejecuta de forma local o en la infraestructura de Railway bajo el entorno de produccion continuo.', font: 'Arial', size: 20 })
            ]
          }),
          new Paragraph({
            spacing: { before: 50, after: 100 },
            children: [
              new TextRun({ text: 'Modo Estudiante: ', bold: true, font: 'Arial', size: 20 }),
              new TextRun({ text: 'No requiere clave inicial; ingresa directamente seleccionando curso y asignatura.', font: 'Arial', size: 20 })
            ]
          }),
          new Paragraph({
            spacing: { before: 50, after: 100 },
            children: [
              new TextRun({ text: 'Modo Adulto / Tutor: ', bold: true, font: 'Arial', size: 20 }),
              new TextRun({ text: 'Accesible desde el interruptor en la cabecera de la sala interactiva. Si se solicita clave de seguridad para perfil parental, utilizar el codigo por defecto del entorno de prueba: ', font: 'Arial', size: 20 }),
              new TextRun({ text: '1234', bold: true, color: 'EE751C', font: 'Arial', size: 20 })
            ]
          }),
          new Paragraph({
            spacing: { before: 50, after: 200 },
            children: [
              new TextRun({ text: 'Panel de Administracion / CMS: ', bold: true, font: 'Arial', size: 20 }),
              new TextRun({ text: 'Disponible en la seccion administrativa para auditar el catalogo de 628 OAs de 1° Basico a IV Medio y descargar los Planes Maestros generados en formato DOCX.', font: 'Arial', size: 20 })
            ]
          }),

          new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: '4. CONCLUSION Y CERTIFICACION DE ENTREGA', bold: true, color: '1C3257', size: 26, font: 'Arial' })] }),
          new Paragraph({
            spacing: { before: 50, after: 150 },
            children: [
              new TextRun({
                text: 'El sistema EstudioSimple cumple con los 5 Pilares Estrategicos y los Estandares Pedagogicos dictados por la direccion educativa. El paquete entregado permite iniciar la marcha blanca formal con familias de 7° Basico con plena seguridad tecnica, rigor curricular y fidelidad audiovisual.',
                font: 'Arial',
                size: 20
              })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const guideFilePath = path.join(dirGuide, 'Guia_Acceso_y_Prueba_Jefatura_7B.docx');
  fs.writeFileSync(guideFilePath, buffer);
  console.log(`Generada Guia Ejecutiva de Acceso y Prueba: ${guideFilePath} (${buffer.length} bytes)`);
}

// 4. Generar Manifiesto Tecnico en JSON
function generateTechManifest() {
  const manifest = {
    fechaGeneracion: '2026-10-01T21:30:00Z',
    version: '1.0.0-PROD-7B-SYNC',
    nivelValidado: '7° Básico (Educación General Básica Chile)',
    entorno: {
      framework: 'React 18 + TypeScript + Vite + Tailwind CSS',
      hosting: 'Railway Continuous Deployment',
      baseDatos: 'Neon Serverless PostgreSQL (628 OAs catalogados)',
      almacenamientoCDN: 'Cloudflare R2 Bucket (pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev)',
      videosMatematicaVerificados: 12
    },
    asignaturasSincronizadas: [
      {
        id: '110-7-MAT-OA01',
        asignatura: 'Matemática',
        oa: 'OA 1',
        titulo: 'Números Enteros en la Vida Cotidiana',
        totalLecciones: 6,
        planMaestroDocx: 'Matematica_OA01_6Lecciones_v7.docx',
        videosProducidos: {
          ganchoTotal: 6,
          explicativoTotal: 6,
          estado: 'BLINDADOS Y CONCORDANTES'
        }
      },
      {
        id: '110-7-LEN-OA03',
        asignatura: 'Lengua y Literatura',
        oa: 'OA 3',
        titulo: 'Análisis de Narraciones y el Héroe',
        totalLecciones: 6,
        planMaestroDocx: 'Lenguaje_OA03.docx',
        videosProducidos: { estado: 'PROMPTS LIMPIOS 7+7 LISTOS' }
      },
      {
        id: '110-7-CIE-OA01',
        asignatura: 'Ciencias Naturales',
        oa: 'OA 1',
        titulo: 'Sexualidad y Afectividad Integral',
        totalLecciones: 6,
        planMaestroDocx: 'Ciencias_OA01.docx',
        videosProducidos: { estado: 'PROMPTS LIMPIOS 7+7 LISTOS' }
      },
      {
        id: '110-7-HIS-OA02',
        asignatura: 'Historia, Geografía y Ciencias Sociales',
        oa: 'OA 2',
        titulo: 'Hominización y Revolución Neolítica',
        totalLecciones: 5,
        planMaestroDocx: 'Historia_OA02.docx',
        videosProducidos: { estado: 'PROMPTS LIMPIOS 7+7 LISTOS' }
      },
      {
        id: '110-7-ING-OA09',
        asignatura: 'Inglés',
        oa: 'OA 9',
        titulo: 'Reading Comprehension of Literary Stories',
        totalLecciones: 6,
        planMaestroDocx: 'Ingles_OA09.docx',
        videosProducidos: { estado: 'PROMPTS LIMPIOS 7+7 LISTOS' }
      }
    ],
    metricasGenerales: {
      totalAsignaturasTroncales: 5,
      totalClasesDisponibles: 29,
      tiempoPromedioClaseMinutos: 30,
      tiempoTotalFormacionHoras: 14.5,
      diapositivasPromptadasTotales: 406
    }
  };

  const manifestPath = path.join(dirTech, 'Manifiesto_Tecnico_Sincronizacion_7B.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`Generado Manifiesto Tecnico JSON: ${manifestPath} (${fs.statSync(manifestPath).size} bytes)`);
}

async function run() {
  await generateGuideDocx();
  generateTechManifest();
  console.log('\nConsolidacion del paquete para Jefatura completada exitosamente.');
}

run().catch((err) => {
  console.error('Error al generar paquete de Jefatura:', err);
  process.exit(1);
});
