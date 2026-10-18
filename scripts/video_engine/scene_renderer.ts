import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export interface RenderSceneOptions {
  slideNumber: number;
  imagePath: string;
  audioPath: string;
  outputPath: string;
  audioDurationSeconds: number;
  tailPaddingSeconds?: number; // Tiempo adicional al final de la lámina (default: 0.5s)
  zoomDirection?: 'in' | 'out' | 'static' | 'pan-right';
  subtitlePath?: string;
}

export interface RenderSceneOutput {
  slideNumber: number;
  videoPath: string;
  totalDurationSeconds: number;
  success: boolean;
  error?: string;
}

/**
 * Renderiza una escena de video MP4 a partir de una diapositiva en alta resolución (1080p)
 * y una pista de audio MP3, aplicando un efecto Ken Burns (zoom suave) sincronizado.
 */
export async function renderSceneVideo(options: RenderSceneOptions): Promise<RenderSceneOutput> {
  const tailPadding = options.tailPaddingSeconds !== undefined ? options.tailPaddingSeconds : 0.5;
  const totalDuration = parseFloat((options.audioDurationSeconds + tailPadding).toFixed(3));
  const totalFrames = Math.max(30, Math.ceil(totalDuration * 30));

  const targetDir = path.dirname(options.outputPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Configuración del filtro de cámara Ken Burns
  const zoomType = options.zoomDirection || 'in';
  let zoomFilter = '';

  if (zoomType === 'static') {
    zoomFilter = 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1';
  } else if (zoomType === 'pan-right') {
    zoomFilter = `scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,zoompan=z=1.03:x='min(x+0.5,iw*0.03)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30`;
  } else {
    // Zoom in suave por defecto: pasa de 1.0 a 1.04 a lo largo del tiempo
    zoomFilter = `scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,zoompan=z='min(zoom+0.0005,1.04)':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30`;
  }

  const args: string[] = [
    '-loop', '1',
    '-t', totalDuration.toString(),
    '-i', options.imagePath,
    '-i', options.audioPath,
    '-vf', zoomFilter,
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-ar', '44100',
    '-af', `apad=pad_dur=${tailPadding}`,
    '-t', totalDuration.toString(),
    '-y',
    options.outputPath
  ];

  return new Promise((resolve) => {
    const ffmpeg = spawn('ffmpeg', args);

    let stderr = '';

    ffmpeg.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    ffmpeg.on('close', (code) => {
      if (code !== 0) {
        return resolve({
          slideNumber: options.slideNumber,
          videoPath: options.outputPath,
          totalDurationSeconds: totalDuration,
          success: false,
          error: `FFmpeg falló con código ${code}: ${stderr.slice(-500)}`
        });
      }

      if (!fs.existsSync(options.outputPath) || fs.statSync(options.outputPath).size === 0) {
        return resolve({
          slideNumber: options.slideNumber,
          videoPath: options.outputPath,
          totalDurationSeconds: totalDuration,
          success: false,
          error: `El archivo de video no se generó o tiene 0 bytes: ${options.outputPath}`
        });
      }

      resolve({
        slideNumber: options.slideNumber,
        videoPath: options.outputPath,
        totalDurationSeconds: totalDuration,
        success: true
      });
    });
  });
}
