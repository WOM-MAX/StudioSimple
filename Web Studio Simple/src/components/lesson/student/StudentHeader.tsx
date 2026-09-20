import React from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { HeartPulse } from 'lucide-react';

export const StudentHeader: React.FC = () => {
  const { lessonData, session } = useLessonSync();

  return (
    <header className="h-14 bg-white border-b border-[#dce2e6] px-4 sm:px-5 flex items-center justify-between text-xs shrink-0 select-none gap-3">
      {/* Left side: Context and Class Title */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-bold text-[#1c3257] shrink-0">Espacio Estudiante</span>
        <span className="text-[#d7dce1] shrink-0">|</span>
        <div className="flex items-center gap-1.5 text-[#7d8794] text-xs truncate">
          <span className="hidden md:inline shrink-0">{lessonData.metadata.grade} ›</span>
          <span className="hidden sm:inline shrink-0">{lessonData.metadata.subject} ›</span>
          <span className="shrink-0">{lessonData.metadata.oaCode} ›</span>
          <strong className="text-[#1c3257] font-bold truncate">
            Clase {lessonData.metadata.lessonNumber}: {lessonData.metadata.lessonTitle}
          </strong>
        </div>
      </div>

      {/* Right side: Status and Oxygen Pause */}
      <div className="flex items-center gap-2 shrink-0">
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
