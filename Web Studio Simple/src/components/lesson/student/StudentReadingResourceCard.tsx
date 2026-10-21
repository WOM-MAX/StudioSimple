import React from 'react';
import { BookOpen, Moon } from 'lucide-react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { OptionalAudioPlayer } from '../common/OptionalAudioPlayer';

interface StudentReadingResourceCardProps {
  title?: string;
  paragraphs?: string[];
  activeParagraph?: number;
  showImage?: boolean;
}

export const StudentReadingResourceCard: React.FC<StudentReadingResourceCardProps> = ({
  title,
  paragraphs,
  activeParagraph,
  showImage = false
}) => {
  const { lessonData } = useLessonSync();

  // Resolución estricta: solo usar recursos propios de la lección
  const declaredParagraphs =
    paragraphs ||
    (lessonData as any)?.readingResource?.paragraphs ||
    (lessonData?.interactive?.type === 'reading_resource' ? lessonData.interactive.paragraphs : undefined) ||
    ((lessonData as any)?.readingText ? [(lessonData as any).readingText] : undefined);

  if (!declaredParagraphs || declaredParagraphs.length === 0) {
    return null;
  }

  const finalTitle =
    title ||
    (lessonData as any)?.readingResource?.title ||
    (lessonData?.interactive?.type === 'reading_resource' ? lessonData.interactive.title : undefined) ||
    'Texto de lectura';

  const finalImage =
    (lessonData as any)?.readingResource?.imageSrc ||
    (lessonData?.interactive as any)?.imageSrc;

  const fullAudioText = declaredParagraphs.join(' ');

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-orange-200/90 text-left relative overflow-hidden transition-all duration-300">
      {/* Top Accent Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#EE751C] via-[#F59E0B] to-[#12A1A4]" />

      {/* Header and Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 text-[#C2540A] border border-orange-200 font-bold text-xs uppercase tracking-wider shadow-xs">
          <Moon className="w-3.5 h-3.5 text-[#EE751C]" />
          <span>Recurso de Lectura Oficial de la Lección</span>
        </div>

        {/* Audio de Apoyo Opcional */}
        <OptionalAudioPlayer text={fullAudioText} label="Escuchar lectura" />
      </div>

      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-black text-[#1C3257] tracking-tight mb-1">
          “{finalTitle}”
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-[#EE751C]">
          Texto y contexto formativo de la lección
        </p>
      </div>

      {/* Ilustración de Contexto si existe */}
      {showImage && finalImage && (
        <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-50 relative group">
          <img
            src={finalImage}
            alt={finalTitle}
            className="w-full h-auto max-h-64 object-cover object-center"
          />
        </div>
      )}

      {/* Párrafos Completos de la Lectura */}
      <div className="space-y-4 mb-6">
        {declaredParagraphs.map((parrafo: string, idx: number) => {
          const pNumber = idx + 1;
          const isHighlighted = activeParagraph === pNumber;

          return (
            <div
              key={pNumber}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                isHighlighted
                  ? 'bg-amber-50/90 border-[#EE751C] shadow-sm ring-2 ring-[#EE751C]/30'
                  : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-5 h-5 rounded-md flex items-center justify-center font-black text-[11px] ${
                  isHighlighted ? 'bg-[#EE751C] text-white' : 'bg-slate-200 text-[#1C3257]'
                }`}>
                  {pNumber}
                </span>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1C3257]">
                  Párrafo {pNumber}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {parrafo}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100/80 px-4 py-2.5 rounded-xl border border-slate-200/60">
        <BookOpen className="w-4 h-4 text-[#12A1A4] shrink-0" />
        <span>Consulta este recurso para fundamentar tus respuestas durante la actividad.</span>
      </div>
    </div>
  );
};
