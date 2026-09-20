import React from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const StudentInteractiveThermo: React.FC = () => {
  const { session } = useLessonSync();
  const isReferenceStage = session.stage === 'reference';
  const isSuccess = session.feedback?.kind === 'success';

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-xl mx-auto text-center animate-fadeIn">
      <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
        El cero como punto de referencia
      </span>
      <h1 className="text-2xl md:text-3xl font-extrabold text-[#1c3257] mb-6">
        {session.stage === 'situation'
          ? '¿Qué número representa tres grados bajo cero?'
          : '¿Qué representa −3 °C?'}
      </h1>

      {/* Thermometer Visual Widget */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dce2e6] flex items-center justify-center gap-8 w-full max-w-md">
        {/* Thermometer Tube Graphic */}
        <div className="relative flex flex-col items-center">
          {/* Glass Tube */}
          <div className="w-7 h-52 bg-[#f0f4f8] border-4 border-[#1c3257] rounded-t-full relative overflow-hidden">
            {/* Liquid Level */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#ef4e36] to-[#ee751c] rounded-b-md transition-all duration-700"
              style={{ height: '35%' }}
            />
            {/* Zero marker line on tube */}
            <div className="absolute top-[50%] left-0 right-0 h-1 bg-[#1c3257]" />
          </div>

          {/* Bulb at bottom */}
          <div className="w-14 h-14 rounded-full bg-[#ef4e36] border-4 border-[#1c3257] -mt-3 flex items-center justify-center shadow-inner">
            <div className="w-4 h-4 rounded-full bg-white/40" />
          </div>
        </div>

        {/* Labels & Scale */}
        <div className="text-left space-y-5">
          <div className="flex items-center gap-2">
            <span className="bg-[#e9f2f8] text-[#1c3257] font-black text-base px-2.5 py-1 rounded-lg border border-[#bcd6ea]">
              +3 °C
            </span>
            <span className="text-xs text-[#748093] font-semibold">Sobre cero (calor)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#fff7db] text-[#956b00] font-black text-base px-2.5 py-1 rounded-lg border border-[#f0d372]">
              0 °C
            </span>
            <span className="text-xs text-[#956b00] font-bold">Punto de referencia</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`font-black text-base px-2.5 py-1 rounded-lg border transition-all ${
              isSuccess || isReferenceStage
                ? 'bg-[#eaf4e8] text-[#255e29] border-[#badcb8]'
                : 'bg-[#f0f4f8] text-[#748093] border-[#dce2e6]'
            }`}>
              {isSuccess || isReferenceStage ? '−3 °C' : '?'}
            </span>
            <span className="text-xs text-[#748093] font-semibold">Bajo cero (frío)</span>
          </div>
        </div>
      </div>

      {/* Success Callout */}
      {isSuccess && (
        <div className="mt-6 bg-[#eaf4e8] text-[#255e29] border border-[#badcb8] rounded-2xl p-4 flex items-center justify-center gap-2 text-sm font-bold shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#255e29]" />
          <span>−3 °C representa una posición de 3 grados bajo cero.</span>
        </div>
      )}
    </div>
  );
};
