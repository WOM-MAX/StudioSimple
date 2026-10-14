import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Square, RotateCcw } from 'lucide-react';

interface OptionalAudioPlayerProps {
  text: string;
  label?: string;
  className?: string;
  compact?: boolean;
}

export const OptionalAudioPlayer: React.FC<OptionalAudioPlayerProps> = ({
  text,
  label = 'Escuchar lectura',
  className = '',
  compact = false
}) => {
  const [status, setStatus] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available && available.length > 0) {
        setVoices(available);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /**
   * Selección estricta de voz en Español Latino (es-419, es-CL, es-MX, etc.)
   * Evita expresamente el español peninsular (es-ES) si existen voces latinoamericanas disponibles.
   */
  const getLatinAmericanVoice = (): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

    const voiceList = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
    if (!voiceList || voiceList.length === 0) return null;

    const latamLangs = ['es-419', 'es-cl', 'es-mx', 'es-ar', 'es-co', 'es-pe', 'es-us'];
    const latamKeywords = [
      'latin',
      'latino',
      'chile',
      'méxico',
      'mexico',
      'argentina',
      'colombia',
      'sabina',
      'raul',
      'dalia',
      'jorge',
      'paulina',
      'mia',
      'andres',
      'carlos'
    ];

    // 1. Coincidencia por etiqueta de idioma latinoamericano (es-CL, es-419, es-MX, etc.)
    const byLangTag = voiceList.find((v) => {
      const tag = (v.lang || '').toLowerCase().replace('_', '-');
      return latamLangs.some((latam) => tag.includes(latam));
    });
    if (byLangTag) return byLangTag;

    // 2. Coincidencia por nombre descriptivo de voz latinoamericana
    const byName = voiceList.find((v) => {
      const nameLower = (v.name || '').toLowerCase();
      const langLower = (v.lang || '').toLowerCase().replace('_', '-');
      return (
        langLower.startsWith('es') &&
        latamKeywords.some((kw) => nameLower.includes(kw)) &&
        !langLower.includes('es-es')
      );
    });
    if (byName) return byName;

    // 3. Cualquier voz en español que NO sea peninsular / España (es-ES)
    const nonSpainSpanish = voiceList.find((v) => {
      const langLower = (v.lang || '').toLowerCase().replace('_', '-');
      return langLower.startsWith('es') && !langLower.includes('es-es');
    });
    if (nonSpainSpanish) return nonSpainSpanish;

    // 4. Último recurso disponible en español
    const fallbackSpanish = voiceList.find((v) => (v.lang || '').toLowerCase().startsWith('es'));
    return fallbackSpanish || null;
  };

  const handlePlay = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const selectedVoice = getLatinAmericanVoice();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configuración canónica para español latinoamericano
    utterance.lang = selectedVoice?.lang || 'es-419';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setStatus('playing');
    utterance.onend = () => setStatus('idle');
    utterance.onerror = () => setStatus('idle');
    utterance.onpause = () => setStatus('paused');
    utterance.onresume = () => setStatus('playing');

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setStatus('playing');
  };

  const handlePause = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setStatus('paused');
    }
  };

  const handleResume = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setStatus('playing');
      } else {
        handlePlay();
      }
    }
  };

  const handleStop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setStatus('idle');
    }
  };

  const handleReplay = () => {
    handleStop();
    setTimeout(() => {
      handlePlay();
    }, 100);
  };

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  return (
    <div className={`inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-orange-50/90 border border-orange-200/90 shadow-xs transition-all ${className}`}>
      {status === 'idle' && (
        <button
          type="button"
          onClick={handlePlay}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EE751C] hover:bg-[#D96512] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          title="Escuchar audio de apoyo"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{label}</span>
        </button>
      )}

      {status === 'playing' && (
        <div className="flex items-center gap-1.5 animate-fadeIn">
          <span className="text-[11px] font-extrabold text-[#C2540A] flex items-center gap-1.5 px-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {!compact && 'Reproduciendo...'}
          </span>
          <button
            type="button"
            onClick={handlePause}
            className="p-1.5 rounded-lg bg-white hover:bg-orange-100 text-[#1C3257] text-xs font-bold border border-orange-200 transition-all cursor-pointer flex items-center gap-1"
            title="Pausar lectura"
          >
            <Pause className="w-3.5 h-3.5 text-[#EE751C]" />
            {!compact && <span className="text-[11px]">Pausar</span>}
          </button>
          <button
            type="button"
            onClick={handleStop}
            className="p-1.5 rounded-lg bg-white hover:bg-rose-50 text-[#1C3257] text-xs font-bold border border-orange-200 transition-all cursor-pointer flex items-center gap-1"
            title="Detener lectura"
          >
            <Square className="w-3.5 h-3.5 text-rose-500" />
            {!compact && <span className="text-[11px]">Detener</span>}
          </button>
          <button
            type="button"
            onClick={handleReplay}
            className="p-1.5 rounded-lg bg-white hover:bg-orange-100 text-[#1C3257] text-xs font-bold border border-orange-200 transition-all cursor-pointer flex items-center gap-1"
            title="Repetir desde el inicio"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#12A1A4]" />
            {!compact && <span className="text-[11px]">Repetir</span>}
          </button>
        </div>
      )}

      {status === 'paused' && (
        <div className="flex items-center gap-1.5 animate-fadeIn">
          <span className="text-[11px] font-extrabold text-amber-700 flex items-center gap-1.5 px-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            {!compact && 'En pausa'}
          </span>
          <button
            type="button"
            onClick={handleResume}
            className="p-1.5 rounded-lg bg-[#EE751C] hover:bg-[#D96512] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            title="Reanudar lectura"
          >
            <Play className="w-3.5 h-3.5" />
            {!compact && <span className="text-[11px]">Reanudar</span>}
          </button>
          <button
            type="button"
            onClick={handleStop}
            className="p-1.5 rounded-lg bg-white hover:bg-rose-50 text-[#1C3257] text-xs font-bold border border-orange-200 transition-all cursor-pointer flex items-center gap-1"
            title="Detener lectura"
          >
            <Square className="w-3.5 h-3.5 text-rose-500" />
            {!compact && <span className="text-[11px]">Detener</span>}
          </button>
          <button
            type="button"
            onClick={handleReplay}
            className="p-1.5 rounded-lg bg-white hover:bg-orange-100 text-[#1C3257] text-xs font-bold border border-orange-200 transition-all cursor-pointer flex items-center gap-1"
            title="Repetir desde el inicio"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#12A1A4]" />
            {!compact && <span className="text-[11px]">Repetir</span>}
          </button>
        </div>
      )}
    </div>
  );
};
