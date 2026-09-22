import React from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { LessonStage } from '../../../types/lesson';
import { Check } from 'lucide-react';

export const CANONICAL_STEPS = [
  'Inicio',
  'Video Motivacional',
  'Recorrido',
  'Video Explicativo',
  'Práctica',
  'Resumen',
  'Miniquiz',
  'Cierre'
];

export const STAGE_STARTS: LessonStage[] = [
  'routeOverview',
  'hook',
  'conversationIntro',
  'formalization',
  'practiceIntro',
  'practiceSummary',
  'miniquiz',
  'closing'
];

export function stepFor(stage: LessonStage): number {
  if (stage === 'cover' || stage === 'prep' || stage === 'landing' || stage === 'catalog') return -1;
  if (stage === 'routeOverview' || stage === 'routeToday' || stage === 'thermo' || stage === 'thermoMeaning') return 0;
  if (stage === 'hook') return 1;
  if (stage === 'conversationIntro' || stage === 'preQuestions') return 2;
  if (stage === 'formalization' || stage === 'postIntro' || stage === 'postQuestions' || stage === 'summary') return 3;
  if (stage === 'practiceIntro' || stage === 'practice' || stage === 'reasoningIntro' || stage === 'reasoning' || stage === 'challenge') return 4;
  if (stage === 'strategy' || stage === 'practiceSummary') return 5;
  if (stage === 'miniquiz' || stage === 'results' || stage === 'review' || stage === 'recoveryIntro' || stage === 'recovery') return 6;
  return 7;
}

export function isLocked(stage: LessonStage): boolean {
  return ['results', 'review', 'recoveryIntro', 'recovery', 'closing', 'catalog', 'landing'].includes(stage);
}

export const AdultSidebar: React.FC = () => {
  const { session, lessonData, updateSession } = useLessonSync();
  const currentStep = stepFor(session.stage);
  const locked = isLocked(session.stage);

  const handleJump = (i: number) => {
    if (i <= currentStep && !locked) {
      updateSession({
        stage: STAGE_STARTS[i],
        feedback: null,
        attempt: 0,
        video: {
          ...session.video,
          playing: false,
          command: session.video.command + 1
        }
      });
    }
  };

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
            {currentStep < 0
              ? 'Antes de comenzar'
              : `Etapa ${currentStep + 1} de 8 : ${CANONICAL_STEPS[currentStep]}`}
          </p>
        </div>

        <nav className="space-y-1">
          {CANONICAL_STEPS.map((stepName, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;
            const isDisabled = idx > currentStep || locked;

            return (
              <button
                key={stepName}
                type="button"
                disabled={isDisabled}
                onClick={() => handleJump(idx)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                  isCurrent
                    ? 'bg-white/20 text-white font-bold shadow-sm'
                    : isDone
                    ? 'text-[#c2e4cb] hover:bg-white/10 cursor-pointer'
                    : 'text-[#8da3c0] cursor-not-allowed opacity-60'
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
              </button>
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
