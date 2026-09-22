import React from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { HeartPulse, Volume2, VolumeX } from 'lucide-react';

interface StudentHeaderProps {
  soundActive?: boolean;
  soundOn?: boolean;
  onToggleSound?: () => void;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({
  soundActive = false,
  soundOn = true,
  onToggleSound
}) => {
  const { lessonData, session } = useLessonSync();

  return (
    <header className="h-14 bg-white border-b border-[#dce2e6] px-4 sm:px-5 flex items-center justify-between text-xs shrink-0 select-none gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-bold text-[#1c3257] shrink-0">Espacio Estudiante</span>
        <span className="text-[#d7dce1] shrink-0">|</span>
        <div className="flex items-center gap-1.5 text-[#7d8794] text-xs truncate">
          <span className="hidden md:inline shrink-0">{lessonData.metadata.grade} :</span>
          <span className="hidden sm:inline shrink-0">{lessonData.metadata.subject} :</span>
          <span className="shrink-0">{lessonData.metadata.oaCode} :</span>
          <strong className="text-[#1c3257] font-bold truncate">
            Clase {lessonData.metadata.lessonNumber}: {lessonData.metadata.lessonTitle}
          </strong>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {soundActive && onToggleSound && (
          <button
            type="button"
            onClick={onToggleSound}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 font-bold text-xs transition-all cursor-pointer border ${
              soundOn
                ? 'bg-[#eaf4e8] text-[#255e29] border-[#badcb8]'
                : 'bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]'
            }`}
            title={soundOn ? 'Silenciar sonido ambiente' : 'Activar sonido ambiente'}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{soundOn ? 'Sonido ambiente' : 'Activar sonido'}</span>
          </button>
        )}
        {session.isOxygenPauseActive && (
          <span className="bg-[#fff0e4] text-[#ee751c] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse border border-[#ee751c]/30 text-xs shrink-0 whitespace-nowrap">
            <HeartPulse className="w-4 h-4" />
            Pausa de respiración
          </span>
        )}
        <span className="bg-[#e9f2f8] text-[#1c3257] font-bold px-3 py-1 rounded-full border border-[#bcd6ea] shrink-0 whitespace-nowrap">
          Sincronizado
        </span>
      </div>
    </header>
  );
};
