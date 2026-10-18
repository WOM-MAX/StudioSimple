import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { VoiceKey, VoiceProfile } from './types';

export const VOICE_CATALOG: Record<VoiceKey, VoiceProfile> = {
  'female-cl': {
    key: 'female-cl',
    shortName: 'es-CL-CatalinaNeural',
    displayName: 'Catalina (Chile)',
    gender: 'female',
    locale: 'es-CL',
    description: 'Voz femenina chilena cálida y pedagógica, ideal para explicaciones de educación básica.'
  },
  'male-cl': {
    key: 'male-cl',
    shortName: 'es-CL-LorenzoNeural',
    displayName: 'Lorenzo (Chile)',
    gender: 'male',
    locale: 'es-CL',
    description: 'Voz masculina chilena clara y pausada, excelente para resolución paso a paso.'
  },
  'female-mx': {
    key: 'female-mx',
    shortName: 'es-MX-DaliaNeural',
    displayName: 'Dalia (México / Neutro)',
    gender: 'female',
    locale: 'es-MX',
    description: 'Voz femenina en español neutro latino de alta inteligibilidad y naturalidad.'
  },
  'male-mx': {
    key: 'male-mx',
    shortName: 'es-MX-JorgeNeural',
    displayName: 'Jorge (México / Neutro)',
    gender: 'male',
    locale: 'es-MX',
    description: 'Voz masculina en español neutro, estándar para e-learning y narración documental.'
  },
  'female-co': {
    key: 'female-co',
    shortName: 'es-CO-SalomeNeural',
    displayName: 'Salomé (Colombia)',
    gender: 'female',
    locale: 'es-CO',
    description: 'Voz femenina dulce y empática, adecuada para andamiaje inicial y bienvenida.'
  },
  'male-co': {
    key: 'male-co',
    shortName: 'es-CO-GonzaloNeural',
    displayName: 'Gonzalo (Colombia)',
    gender: 'male',
    locale: 'es-CO',
    description: 'Voz masculina firme y motivadora, ideal para ejercicios y desafíos formativos.'
  }
};

export interface SynthesizeOptions {
  text: string;
  outputPath: string;
  voiceKey?: VoiceKey;
  rate?: string; // Default: "-5%" para tono pedagógico
  generateSubtitles?: boolean;
  subtitlePath?: string;
}

export interface SynthesizeResult {
  audioPath: string;
  durationSeconds: number;
  subtitlePath?: string;
  voiceProfile: VoiceProfile;
}

/**
 * Obtiene la duración exacta de un archivo de audio en segundos usando ffprobe.
 */
export async function getAudioDuration(audioPath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const ffprobe = spawn('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      audioPath
    ]);

    let output = '';
    let errorOutput = '';

    ffprobe.stdout.on('data', (chunk) => {
      output += chunk.toString();
    });

    ffprobe.stderr.on('data', (chunk) => {
      errorOutput += chunk.toString();
    });

    ffprobe.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`ffprobe falló con código ${code}: ${errorOutput}`));
      }
      const duration = parseFloat(output.trim());
      if (isNaN(duration)) {
        return reject(new Error(`No se pudo parsear la duración de audio: ${output}`));
      }
      resolve(duration);
    });
  });
}

/**
 * Sintetiza el texto de una lámina a MP3 mediante Edge-TTS y calcula su duración exacta.
 */
export async function synthesizeSlideAudio(options: SynthesizeOptions): Promise<SynthesizeResult> {
  const voiceKey = options.voiceKey || 'female-cl';
  const voiceProfile = VOICE_CATALOG[voiceKey] || VOICE_CATALOG['female-cl'];
  const rate = options.rate || '-5%'; // Un ritmo sutilmente pausado para comprensión escolar

  const targetDir = path.dirname(options.outputPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const args: string[] = [
    '-m', 'edge_tts',
    '--voice', voiceProfile.shortName,
    '--rate', rate,
    '--text', options.text,
    '--write-media', options.outputPath
  ];

  let resolvedSubPath: string | undefined = undefined;
  if (options.generateSubtitles) {
    resolvedSubPath = options.subtitlePath || options.outputPath.replace(/\.mp3$/i, '.vtt');
    args.push('--write-subtitles', resolvedSubPath);
  }

  return new Promise((resolve, reject) => {
    const proc = spawn('python', args);

    let errorData = '';

    proc.stderr.on('data', (chunk) => {
      errorData += chunk.toString();
    });

    proc.on('close', async (code) => {
      if (code !== 0) {
        return reject(new Error(`edge-tts falló con código ${code}: ${errorData}`));
      }

      if (!fs.existsSync(options.outputPath) || fs.statSync(options.outputPath).size === 0) {
        return reject(new Error(`El archivo de audio no se generó o está vacío: ${options.outputPath}`));
      }

      try {
        const durationSeconds = await getAudioDuration(options.outputPath);
        resolve({
          audioPath: options.outputPath,
          durationSeconds,
          subtitlePath: resolvedSubPath,
          voiceProfile
        });
      } catch (err) {
        reject(err);
      }
    });
  });
}
