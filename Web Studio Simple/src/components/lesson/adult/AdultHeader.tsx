import React from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { HeartPulse } from 'lucide-react';

export const AdultHeader: React.FC = () => {
  const { lessonData, session } = useLessonSync();

  return (
    <header className="h-14 bg-white border-b border-[#dce2e6] px-4 sm:px-5 flex items-center justify-between text-xs shrink-0 select-none gap-3">
      {/* Left side: Context and Class Title */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-bold text-[#1c3257] shrink-0">Panel Adulto</span>
        <span className="text-[#dce2e6] shrink-0">|</span>
        <div className="flex items-center gap-1.5 text-[#7d8794] text-xs truncate">
          <span className="hidden md:inline shrink-0">{lessonData.metadata.grade} ›</span>
          <span className="hidden sm:inline shrink-0">{lessonData.metadata.subject} ›</span>
          <span className="shrink-0">{lessonData.metadata.oaCode} ›</span>
          <strong className="text-[#1c3257] font-bold truncate">
            Clase {lessonData.metadata.lessonNumber}: {lessonData.metadata.lessonTitle}
          </strong>
        </div>
      </div>

      {/* Right side: Status & Mental Health Cues */}
      <div className="flex items-center gap-2 shrink-0">
        {session.isOxygenPauseActive && (
          <span className="bg-[#fff0e4] text-[#ee751c] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 animate-pulse border border-[#ee751c]/30 text-xs shrink-0 whitespace-nowrap">
            <HeartPulse className="w-3.5 h-3.5" />
            Pausa activa
          </span>
        )}

        <div className="flex items-center gap-1.5 bg-[#eaf4e8] text-[#255e29] font-bold px-3 py-1 rounded-full border border-[#badcb8] shrink-0 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-[#4a964e] animate-ping" />
          <span>Estudiante conectado</span>
        </div>
      </div>
    </header>
  );
};
