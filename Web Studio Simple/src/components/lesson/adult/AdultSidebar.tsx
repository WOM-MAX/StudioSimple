import React from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { LessonStage } from '../../../types/lesson';
import { Check } from 'lucide-react';

export const CANONICAL_STEPS = [
  'Inicio',
  'Video',
  'Recorrido',
  'Posición y movimiento',
  'Práctica',
  'Resumen',
  'Miniquiz',
  'Cierre'
];

export function getStageStepIndex(stage: LessonStage): number {
  if (stage === 'cover' || stage === 'prep' || stage === 'route' || stage === 'situation' || stage === 'reference') return 0;
  if (stage === 'hook') return 1;
  if (stage === 'conversation') return 2;
  if (stage === 'formalization') return 3;
  if (stage === 'practice') return 4;
  if (stage === 'idea') return 5;
  if (['miniquiz', 'results', 'recovery'].includes(stage)) return 6;
  return 7;
}

export const AdultSidebar: React.FC = () => {
  const { session, lessonData } = useLessonSync();
  const currentStep = getStageStepIndex(session.stage);

  return (
    <aside className="w-60 bg-[#1c3257] text-white p-5 flex flex-col justify-between shrink-0 shadow-lg select-none">
      <div>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-[#f8ad22] flex items-center justify-center font-bold text-xs text-[#1c3257]">
              ES
            </div>
            <span className="font-extrabold text-sm tracking-tight">EstudioSimple</span>
          </div>
          <p className="text-[#b8c8dd] text-[10px] uppercase font-bold tracking-widest">
            {lessonData.metadata.subject} : {lessonData.metadata.oaCode}
          </p>
          <h2 className="text-white text-base font-bold leading-tight mt-1">
            Clase {lessonData.metadata.lessonNumber}
          </h2>
          <p className="text-[#9ab1ce] text-xs mt-1 leading-snug">
            {lessonData.metadata.lessonTitle}
          </p>
        </div>

        <div className="bg-white/10 rounded-lg px-3 py-2 mb-4 border border-white/10">
          <span className="text-[#f8ad22] text-[11px] font-bold uppercase tracking-wider block">Progreso de la sesión</span>
          <p className="text-white text-xs font-semibold mt-0.5">
            Paso {currentStep + 1} de 8 : {CANONICAL_STEPS[currentStep]}
          </p>
        </div>

        <nav className="space-y-1">
          {CANONICAL_STEPS.map((stepName, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={stepName}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  isCurrent
                    ? 'bg-white/20 text-white font-bold shadow-sm'
                    : isDone
                    ? 'text-[#c2e4cb]'
                    : 'text-[#8da3c0]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                    isCurrent
                      ? 'bg-[#f8ad22] text-[#1c3257]'
                      : isDone
                      ? 'bg-[#4a964e] text-white'
                      : 'border border-[#5b6d87] text-[#8da3c0]'
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3" /> : idx + 1}
                </div>
                <span className="truncate">{stepName}</span>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-white/10 text-[11px] text-[#8da3c0]">
        <span>Duración: ~{lessonData.metadata.durationMinutes} min</span>
      </div>
    </aside>
  );
};
