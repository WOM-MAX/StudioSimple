import * as fs from 'fs';
import * as path from 'path';
import { LessonVideoConfig } from './types';
import { processLessonVideo } from './video_orchestrator';
import { VOICE_CATALOG } from './tts_service';

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--voices') || args.includes('-v')) {
    console.log('\n🎙 CATÁLOGO DE VOCES DISPONIBLES EN ESTUDIOSIMPLE:');
    console.log('----------------------------------------------------');
    for (const [key, profile] of Object.entries(VOICE_CATALOG)) {
      const genderIcon = profile.gender === 'female' ? '👩' : '👨';
      console.log(`${genderIcon} [${key}] ${profile.displayName} (${profile.shortName})`);
      console.log(`   ${profile.description}\n`);
    }
    process.exit(0);
  }

  const configPath = args[0];

  if (!configPath) {
    console.log(`
Uso del Generador de Video Nativo (Slide-to-Video Engine):
  npx tsx scripts/video_engine/generar_video_leccion.ts <ruta_config.json>
  npx tsx scripts/video_engine/generar_video_leccion.ts --voices (ver catálogo de voces)

Ejemplo de ejecución de prueba piloto:
  npx tsx scripts/video_engine/test_sample_lesson.ts
`);
    process.exit(1);
  }

  const resolvedPath = path.resolve(process.cwd(), configPath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ Error: El archivo de configuración no existe en: ${resolvedPath}`);
    process.exit(1);
  }

  try {
    const rawContent = fs.readFileSync(resolvedPath, 'utf-8');
    const config: LessonVideoConfig = JSON.parse(rawContent);

    const result = await processLessonVideo(config);

    if (result.success) {
      console.log(`✅ Proceso finalizado con éxito para la lección "${result.title}".`);
      process.exit(0);
    } else {
      console.error(`❌ El proceso falló: ${result.error}`);
      process.exit(1);
    }
  } catch (err: any) {
    console.error(`❌ Error al procesar la configuración:`, err.message);
    process.exit(1);
  }
}

main();
