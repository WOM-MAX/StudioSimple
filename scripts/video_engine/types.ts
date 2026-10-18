export type VoiceKey = 
  | 'female-cl' 
  | 'male-cl' 
  | 'female-mx' 
  | 'male-mx' 
  | 'female-co' 
  | 'male-co';

export interface VoiceProfile {
  key: VoiceKey;
  shortName: string;
  displayName: string;
  gender: 'female' | 'male';
  locale: string;
  description: string;
}

export interface SlideSceneConfig {
  slideNumber: number;
  title?: string;
  imagePath: string; // Ruta absoluta o relativa de la imagen 1920x1080
  narrationText: string; // Texto que el locutor dirá
  voiceKey?: VoiceKey; // Voz específica para esta lámina (si no se indica, usa la general)
  rate?: string; // e.g. "-5%" o "0%"
  zoomDirection?: 'in' | 'out' | 'pan-right' | 'static';
  subtitleText?: string;
}

export interface LessonVideoConfig {
  lessonId: string;
  title: string;
  subject?: string;
  course?: string;
  defaultVoice: VoiceKey;
  outputDir: string;
  slides: SlideSceneConfig[];
}

export interface SceneRenderResult {
  slideNumber: number;
  audioPath: string;
  videoPath: string;
  audioDurationSeconds: number;
  totalDurationSeconds: number;
  success: boolean;
  error?: string;
}

export interface VideoOrchestrationResult {
  lessonId: string;
  title: string;
  scenesCount: number;
  scenes: SceneRenderResult[];
  masterVideoPath: string;
  totalDurationSeconds: number;
  success: boolean;
  error?: string;
}
