import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { LessonVideoConfig } from './types';
import { processLessonVideo } from './video_orchestrator';

/**
 * Genera una diapositiva en alta resolución (1920x1080) usando SVG y Sharp con estilo Nordic Clean.
 */
async function generateSlideImage(
  outputPath: string,
  options: {
    badge: string;
    stage: string;
    title: string;
    subtitle: string;
    points: string[];
    footerNote: string;
    bgColor: string;
    accentColor: string;
  }
) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const pointsSvg = options.points
    .map((point, index) => {
      const y = 520 + index * 90;
      return `
        <g transform="translate(140, ${y})">
          <circle cx="20" cy="20" r="14" fill="${options.accentColor}" opacity="0.25"/>
          <circle cx="20" cy="20" r="7" fill="${options.accentColor}"/>
          <text x="60" y="28" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="500" fill="#e2e8f0">${point}</text>
        </g>
      `;
    })
    .join('');

  const svgTemplate = `
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${options.bgColor}"/>
          <stop offset="100%" stop-color="#090d16"/>
        </linearGradient>
        <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.45"/>
        </filter>
      </defs>

      <!-- Fondo Degradado Principal -->
      <rect width="1920" height="1080" fill="url(#bgGrad)"/>

      <!-- Rejilla y Acentos Gráficos de Fondo -->
      <circle cx="1750" cy="150" r="450" fill="${options.accentColor}" opacity="0.06"/>
      <circle cx="150" cy="950" r="350" fill="${options.accentColor}" opacity="0.04"/>

      <!-- Tarjeta Principal de Contenido (Glassmorphism) -->
      <rect x="90" y="80" width="1740" height="920" rx="32" fill="#1e293b" fill-opacity="0.65" stroke="#334155" stroke-width="2" filter="url(#cardShadow)"/>

      <!-- Encabezado / Badge de Asignatura -->
      <rect x="140" y="140" width="360" height="48" rx="24" fill="${options.accentColor}" fill-opacity="0.18"/>
      <text x="320" y="172" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="${options.accentColor}" letter-spacing="1.5">
        ${options.badge.toUpperCase()}
      </text>

      <!-- Indicador de Etapa de la Lección -->
      <text x="140" y="240" font-family="system-ui, sans-serif" font-size="24" font-weight="600" fill="#94a3b8" letter-spacing="1">
        ${options.stage}
      </text>

      <!-- Título Principal -->
      <text x="140" y="320" font-family="system-ui, sans-serif" font-size="58" font-weight="800" fill="#ffffff">
        ${options.title}
      </text>

      <!-- Subtítulo Didáctico -->
      <text x="140" y="390" font-family="system-ui, sans-serif" font-size="30" font-weight="400" fill="#cbd5e1">
        ${options.subtitle}
      </text>

      <!-- Línea Divisoria Decorativa -->
      <line x1="140" y1="440" x2="1680" y2="440" stroke="#334155" stroke-width="2" stroke-linecap="round"/>

      <!-- Puntos de la Lámina -->
      ${pointsSvg}

      <!-- Barra de Estado Inferior -->
      <rect x="90" y="940" width="1740" height="60" rx="0" fill="#0f172a" fill-opacity="0.9"/>
      <text x="140" y="978" font-family="system-ui, sans-serif" font-size="20" font-weight="500" fill="#64748b">
        EstudioSimple • Plataforma Exámenes Libres MINEDUC
      </text>
      <text x="1700" y="978" text-anchor="end" font-family="system-ui, sans-serif" font-size="20" font-weight="600" fill="${options.accentColor}">
        ${options.footerNote}
      </text>
    </svg>
  `;

  await sharp(Buffer.from(svgTemplate))
    .png({ quality: 100 })
    .toFile(outputPath);
}

async function runPilotTest() {
  const rootDir = process.cwd();
  const testOutputDir = path.join(rootDir, 'dist', 'test_video_pilot');
  const slidesDir = path.join(testOutputDir, 'slides');

  console.log(`\n======================================================`);
  console.log(`🧪 EJECUTANDO PRUEBA PILOTO: GENERADOR NATIVO SLIDE-TO-VIDEO`);
  console.log(`======================================================\n`);

  fs.mkdirSync(slidesDir, { recursive: true });

  const slide1Img = path.join(slidesDir, 'slide_01.png');
  const slide2Img = path.join(slidesDir, 'slide_02.png');
  const slide3Img = path.join(slidesDir, 'slide_03.png');

  // Generar 3 imágenes en 1080p
  console.log('🎨 Generando láminas gráficas 1080p en alta resolución...');

  await generateSlideImage(slide1Img, {
    badge: 'Ciencias Naturales • 7° Básico',
    stage: 'Etapa 1: Gancho Inicial y Activación Cognitiva',
    title: '¿Cómo Obtiene Energía Nuestro Cuerpo?',
    subtitle: 'El viaje de los nutrientes desde el primer bocado',
    points: [
      'Todo lo que comemos contiene energía almacenada químicamente.',
      'El sistema digestivo es una máquina biológica de transformación.',
      '¿Qué ocurre con una manzana desde que la masticas?'
    ],
    footerNote: 'Lámina 1 de 3 • Activación',
    bgColor: '#0f172a',
    accentColor: '#10b981' // Esmeralda
  });

  await generateSlideImage(slide2Img, {
    badge: 'Ciencias Naturales • 7° Básico',
    stage: 'Etapa 2: Aprendizaje Didáctico y Ejemplificación',
    title: 'Digestión Mecánica vs. Digestión Química',
    subtitle: 'Dos procesos complementarios trabajando en sincronía',
    points: [
      'Digestión Mecánica: Los dientes trituran el alimento aumentando la superficie.',
      'Digestión Química: La saliva y jugos gástricos descomponen enlaces moleculares.',
      'El estómago mezcla y degrada las proteínas en un medio ácido.'
    ],
    footerNote: 'Lámina 2 de 3 • Contenido Central',
    bgColor: '#1e1b4b',
    accentColor: '#f59e0b' // Ámbar
  });

  await generateSlideImage(slide3Img, {
    badge: 'Ciencias Naturales • 7° Básico',
    stage: 'Etapa 3: Momento Cuaderno y Síntesis Activa',
    title: 'Abre tu Cuaderno de Ciencias',
    subtitle: 'Conecta lo digital con el papel y consolida tu aprendizaje',
    points: [
      'Escribe en la parte superior: "Etapas de la Digestión Humana".',
      'Dibuja un diagrama simple con Boca, Esófago y Estómago.',
      'Anota al lado de cada órgano si realiza digestión mecánica o química.'
    ],
    footerNote: 'Lámina 3 de 3 • Registro Análogo',
    bgColor: '#0f172a',
    accentColor: '#06b6d4' // Cian
  });

  console.log('✅ Láminas generadas exitosamente en 1920x1080.\n');

  // Configuración de la lección con alternancia de voces (Mujer / Hombre)
  const lessonConfig: LessonVideoConfig = {
    lessonId: 'ciencias_7b_oa01_demo',
    title: 'El Sistema Digestivo Humano: Transformación de Nutrientes',
    subject: 'Ciencias Naturales',
    course: '7° Básico',
    defaultVoice: 'female-cl', // Voz predeterminada Catalina (Chile)
    outputDir: testOutputDir,
    slides: [
      {
        slideNumber: 1,
        title: 'Gancho Inicial',
        imagePath: slide1Img,
        narrationText: '¡Hola! Bienvenidos a tu clase de Ciencias Naturales. ¿Alguna vez te has preguntado qué camino recorre una manzana desde el primer bocado hasta convertirse en la energía que mueve tus músculos? Hoy descubriremos los fascinantes secretos del sistema digestivo.',
        voiceKey: 'female-cl', // Voz Femenina Chilena
        zoomDirection: 'in',
        rate: '-5%'
      },
      {
        slideNumber: 2,
        title: 'Explicación Central',
        imagePath: slide2Img,
        narrationText: 'En la boca comienza todo. Los dientes realizan la digestión mecánica, mientras que las enzimas de la saliva inician la digestión química. Luego, el bolo alimenticio viaja por el esófago hacia el estómago, donde los jugos gástricos descomponen las proteínas.',
        voiceKey: 'male-cl', // Voz Masculina Chilena (Alternancia de locutor)
        zoomDirection: 'in',
        rate: '-5%'
      },
      {
        slideNumber: 3,
        title: 'Momento Cuaderno',
        imagePath: slide3Img,
        narrationText: 'Ahora es tu turno de trabajar en tu cuaderno físico. Abre tu cuaderno de ciencias, escribe el título y dibuja el esquema con los tres órganos principales. Pausa este video, registra tus notas y continúa cuando estés listo.',
        voiceKey: 'female-cl', // Vuelve a Voz Femenina Chilena
        zoomDirection: 'in',
        rate: '-5%'
      }
    ]
  };

  // Procesar lección completa
  const result = await processLessonVideo(lessonConfig);

  if (!result.success) {
    console.error('❌ La prueba piloto falló:', result.error);
    process.exit(1);
  }

  // Validación de archivos y aserciones
  console.log('\n🔎 Validando integridad de artefactos generados:');
  for (const scene of result.scenes) {
    const exists = fs.existsSync(scene.videoPath);
    const size = exists ? fs.statSync(scene.videoPath).size : 0;
    console.log(`   - Escena ${scene.slideNumber} (${scene.videoPath}): ${exists ? 'EXISTE' : 'FALTA'} | ${size} bytes`);
    if (!exists || size === 0) {
      throw new Error(`Escena ${scene.slideNumber} inválida.`);
    }
  }

  const masterExists = fs.existsSync(result.masterVideoPath);
  const masterSize = masterExists ? fs.statSync(result.masterVideoPath).size : 0;
  console.log(`   - Master (${result.masterVideoPath}): ${masterExists ? 'EXISTE' : 'FALTA'} | ${masterSize} bytes`);

  if (!masterExists || masterSize === 0) {
    throw new Error('El video master no existe o está vacío.');
  }

  console.log('\n✨ ¡TODAS LAS VALIDACIONES FUNCIONALES PASARON CON ÉXITO (Código 0)! ✨\n');
}

runPilotTest().catch((err) => {
  console.error('❌ Error fatal en prueba piloto:', err);
  process.exit(1);
});
