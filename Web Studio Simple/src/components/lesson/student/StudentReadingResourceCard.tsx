import React from 'react';
import { BookOpen, Moon, Compass, Sparkles } from 'lucide-react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { OptionalAudioPlayer } from '../common/OptionalAudioPlayer';

const DEFAULT_PARAGRAPHS = [
  'En una colonia de la Luna vive Jimmy, un niño que juega con Robutt, su perro robot. El exterior lunar es rocoso y árido; no hay oxígeno respirable y Jimmy debe usar un traje espacial cuando sale.',
  'En una ocasión, Jimmy finge estar herido durante un juego. Robutt activa una alarma y llega un equipo de rescate. Esa acción permite reconocer que el robot está atento a Jimmy.',
  'Más tarde, el padre de Jimmy anuncia que llegará desde la Tierra un perro vivo y dice que no pueden quedarse con los dos perros. Propone regalar a Robutt a otro niño. Jimmy se opone y expresa que Robutt es su perro. Al final, Jimmy abraza a Robutt; el relato no informa qué decide después el padre.'
];

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
  showImage = true
}) => {
  const { lessonData } = useLessonSync();

  const finalTitle = title || lessonData?.interactive?.title || 'El mejor amigo de un muchacho';
  const finalParagraphs: string[] =
    paragraphs ||
    lessonData?.interactive?.paragraphs ||
    DEFAULT_PARAGRAPHS;

  const fullAudioText = finalParagraphs.join(' ');

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-orange-200/90 text-left relative overflow-hidden transition-all duration-300">
      {/* Top Accent Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#EE751C] via-[#F59E0B] to-[#12A1A4]" />

      {/* Header and Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 text-[#C2540A] border border-orange-200 font-bold text-xs uppercase tracking-wider shadow-xs">
          <Moon className="w-3.5 h-3.5 text-[#EE751C]" />
          <span>Recurso de Lectura Autónomo · Paráfrasis Pedagógica</span>
        </div>

        {/* Audio de Apoyo Opcional */}
        <OptionalAudioPlayer text={fullAudioText} label="Escuchar lectura" />
      </div>

      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-black text-[#1C3257] tracking-tight mb-1">
          “{finalTitle}”
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-[#EE751C]">
          Paráfrasis pedagógica completa para la lección de hoy
        </p>
      </div>

      {/* Ilustración de Contexto */}
      {showImage && (
        <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-50 relative group">
          <img
            src="/images/lessons/lengua_7b_oa03_clase01_ambiente_lunar.jpg"
            alt="Jimmy Anderson y Robutt en la superficie lunar"
            className="w-full h-auto max-h-64 object-cover object-center"
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-3 text-white">
            <p className="text-[11px] font-bold">
              Jimmy Anderson y su perro robot Robutt explorando el ambiente rocoso exterior en la Luna
            </p>
          </div>
        </div>
      )}

      {/* Los Tres Párrafos Completos de la Lectura */}
      <div className="space-y-4 mb-6">
        {finalParagraphs.map((parrafo: string, idx: number) => {
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
                  {pNumber === 1 && 'Párrafo 1 · El ambiente lunar'}
                  {pNumber === 2 && 'Párrafo 2 · El juego y la alarma'}
                  {pNumber === 3 && 'Párrafo 3 · El desacuerdo familiar'}
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
        <span>Presta atención a las preguntas que formulará tu mentor sobre estos hechos del relato.</span>
      </div>
    </div>
  );
};
