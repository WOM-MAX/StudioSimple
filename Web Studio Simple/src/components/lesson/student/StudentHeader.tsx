import React from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { HeartPulse, Volume2, VolumeX } from 'lucide-react';
import { getSubjectTheme } from '../../../lib/subject-theme';

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
  const theme = getSubjectTheme(lessonData.metadata.subject);

  return (
    <header className="h-14 bg-white/95 backdrop-blur-xs border-b border-slate-200/80 px-4 sm:px-5 flex items-center justify-between text-xs shrink-0 select-none gap-3 relative z-10">
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-extrabold text-[#1C3257] shrink-0">Espacio Estudiante</span>
        <span className="text-slate-300 shrink-0">|</span>
        <div className="flex items-center gap-1.5 text-slate-500 text-xs truncate">
          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} shrink-0`}>
            {lessonData.metadata.subject}
          </span>
          <span className="shrink-0 font-semibold">{lessonData.metadata.oaCode} ·</span>
          <strong className="text-[#1C3257] font-bold truncate">
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
