import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { 
  LessonVideoConfig, 
  SceneRenderResult, 
  VideoOrchestrationResult 
} from './types';
import { synthesizeSlideAudio, getAudioDuration } from './tts_service';
import { renderSceneVideo } from './scene_renderer';

/**
 * Concatena múltiples archivos MP4 utilizando el demuxer de FFmpeg sin recodificar (lossless fast concat).
 */
export async function concatenateScenes(
  sceneVideoPaths: string[], 
  masterOutputPath: string
): Promise<{ success: boolean; error?: string }> {
  if (sceneVideoPaths.length === 0) {
    return { success: false, error: 'No hay escenas para concatenar.' };
  }

  const masterDir = path.dirname(masterOutputPath);
  if (!fs.existsSync(masterDir)) {
    fs.mkdirSync(masterDir, { recursive: true });
  }

  // Crear archivo de lista temporal para concat demuxer
  const listFilePath = path.join(masterDir, `concat_list_${Date.now()}.txt`);
  const listContent = sceneVideoPaths
    .map(p => `file '${p.replace(/\\/g, '/')}'`)
    .join('\n');

  fs.writeFileSync(listFilePath, listContent, 'utf-8');

  return new Promise((resolve) => {
    const ffmpeg = spawn('ffmpeg', [
      '-f', 'concat',
      '-safe', '0',
      '-i', listFilePath,
      '-c', 'copy',
      '-y',
      masterOutputPath
    ]);

    let stderr = '';

    ffmpeg.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    ffmpeg.on('close', (code) => {
      // Limpiar archivo de lista temporal
      try {
        if (fs.existsSync(listFilePath)) {
          fs.unlinkSync(listFilePath);
        }
      } catch (_) {}

      if (code !== 0) {
        return resolve({ 
          success: false, 
          error: `FFmpeg concat falló con código ${code}: ${stderr.slice(-500)}` 
        });
      }

      if (!fs.existsSync(masterOutputPath) || fs.statSync(masterOutputPath).size === 0) {
        return resolve({ 
          success: false, 
          error: `El video master no se generó o está vacío: ${masterOutputPath}` 
        });
      }

      resolve({ success: true });
    });
  });
}

/**
 * Orquestador principal: procesa una lección completa generando el audio TTS,
 * el video dinámico de cada diapositiva y el video master final ensamblado.
 */
export async function processLessonVideo(config: LessonVideoConfig): Promise<VideoOrchestrationResult> {
  const audioDir = path.join(config.outputDir, 'audio');
  const scenesDir = path.join(config.outputDir, 'escenas');
  const masterVideoPath = path.join(config.outputDir, `${config.lessonId}_completa.mp4`);

  fs.mkdirSync(audioDir, { recursive: true });
  fs.mkdirSync(scenesDir, { recursive: true });

  const scenesResults: SceneRenderResult[] = [];
  const successfulScenePaths: string[] = [];

  console.log(`\n======================================================`);
  console.log(`🚀 Iniciando generación de video para: "${config.title}"`);
  console.log(`📋 Total de láminas a procesar: ${config.slides.length}`);
  console.log(`🎤 Voz predeterminada: ${config.defaultVoice}`);
  console.log(`📁 Directorio de salida: ${config.outputDir}`);
  console.log(`======================================================\n`);

  for (const slide of config.slides) {
    const slidePadded = String(slide.slideNumber).padStart(2, '0');
    const audioPath = path.join(audioDir, `slide_${slidePadded}.mp3`);
    const videoPath = path.join(scenesDir, `slide_${slidePadded}.mp4`);
    const voiceKey = slide.voiceKey || config.defaultVoice;

    console.log(`▶ Procesando Lámina ${slide.slideNumber}/${config.slides.length}: ${slide.title || 'Sin título'}...`);

    try {
      // 1. Síntesis de Audio con Edge-TTS
      console.log(`   🎤 Sintetizando locución [Voz: ${voiceKey}]...`);
      const ttsResult = await synthesizeSlideAudio({
        text: slide.narrationText,
        outputPath: audioPath,
        voiceKey,
        rate: slide.rate || '-5%',
        generateSubtitles: true
      });

      console.log(`   ⏱ Duración de audio: ${ttsResult.durationSeconds.toFixed(2)}s`);

      // 2. Renderizado de Escena MP4 con efecto Ken Burns
      console.log(`   🎬 Renderizando escena MP4 con Ken Burns...`);
      const sceneResult = await renderSceneVideo({
        slideNumber: slide.slideNumber,
        imagePath: slide.imagePath,
        audioPath: ttsResult.audioPath,
        outputPath: videoPath,
        audioDurationSeconds: ttsResult.durationSeconds,
        tailPaddingSeconds: 0.5,
        zoomDirection: slide.zoomDirection || 'in',
        subtitlePath: ttsResult.subtitlePath
      });

      if (!sceneResult.success) {
        throw new Error(sceneResult.error || 'Error desconocido al renderizar la escena.');
      }

      const fileSizeMb = (fs.statSync(videoPath).size / (1024 * 1024)).toFixed(2);
      console.log(`   ✅ Escena ${slide.slideNumber} lista: ${videoPath} (${fileSizeMb} MB, ${sceneResult.totalDurationSeconds}s)\n`);

      scenesResults.push({
        slideNumber: slide.slideNumber,
        audioPath: ttsResult.audioPath,
        videoPath,
        audioDurationSeconds: ttsResult.durationSeconds,
        totalDurationSeconds: sceneResult.totalDurationSeconds,
        success: true
      });

      successfulScenePaths.push(videoPath);
    } catch (err: any) {
      console.error(`   ❌ Error en lámina ${slide.slideNumber}:`, err.message);
      scenesResults.push({
        slideNumber: slide.slideNumber,
        audioPath,
        videoPath,
        audioDurationSeconds: 0,
        totalDurationSeconds: 0,
        success: false,
        error: err.message
      });
    }
  }

  // 3. Concatenación final de todas las escenas
  if (successfulScenePaths.length === 0) {
    return {
      lessonId: config.lessonId,
      title: config.title,
      scenesCount: 0,
      scenes: scenesResults,
      masterVideoPath: '',
      totalDurationSeconds: 0,
      success: false,
      error: 'Ninguna escena pudo ser generada con éxito.'
    };
  }

  console.log(`🔗 Concatenando ${successfulScenePaths.length} escenas en el video master final...`);
  const concatResult = await concatenateScenes(successfulScenePaths, masterVideoPath);

  if (!concatResult.success) {
    console.error(`❌ Error en la concatenación master:`, concatResult.error);
    return {
      lessonId: config.lessonId,
      title: config.title,
      scenesCount: successfulScenePaths.length,
      scenes: scenesResults,
      masterVideoPath,
      totalDurationSeconds: 0,
      success: false,
      error: concatResult.error
    };
  }

  let totalDuration = 0;
  try {
    totalDuration = await getAudioDuration(masterVideoPath);
  } catch (_) {
    totalDuration = scenesResults.reduce((acc, s) => acc + s.totalDurationSeconds, 0);
  }

  const masterSizeMb = (fs.statSync(masterVideoPath).size / (1024 * 1024)).toFixed(2);
  console.log(`\n🎉 ¡VIDEO MASTER COMPLETADO CON ÉXITO!`);
  console.log(`📹 Archivo: ${masterVideoPath}`);
  console.log(`⏱ Duración total: ${totalDuration.toFixed(2)}s | Tamaño: ${masterSizeMb} MB`);
  console.log(`======================================================\n`);

  return {
    lessonId: config.lessonId,
    title: config.title,
    scenesCount: successfulScenePaths.length,
    scenes: scenesResults,
    masterVideoPath,
    totalDurationSeconds: totalDuration,
    success: true
  };
}
