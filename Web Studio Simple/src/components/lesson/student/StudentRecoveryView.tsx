import React from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const StudentRecoveryView: React.FC = () => {
  const { session, lessonData, updateSession } = useLessonSync();

  const incorrectIndices = lessonData.quiz.questions
    .map((q, idx) => (session.miniAnswers[idx] === q.correct ? -1 : idx))
    .filter((idx) => idx >= 0);

  const totalToRecover = incorrectIndices.length;
  const completedCount = session.recoveryResults.length;
  const isAllDone = completedCount >= totalToRecover;

  if (isAllDone) {
    const passed = session.recoveryResults.filter(Boolean).length >= Math.ceil(totalToRecover / 2);
    return (
      <div className="max-w-xl mx-auto p-6 text-center animate-fadeIn">
        <div className={`p-8 rounded-3xl mb-6 shadow-sm border ${
          passed
            ? 'bg-[#eaf4e8] border-[#badcb8] text-[#255e29]'
            : 'bg-[#fff0e4] border-[#f5c49d] text-[#924814]'
        }`}>
          <div className="text-4xl mb-2 font-black">
            {session.recoveryResults.filter(Boolean).length} / {totalToRecover}
          </div>
          <h1 className="text-2xl font-black mb-2">
            {passed ? '¡Comprobación lograda!' : 'Buen trabajo por hoy'}
          </h1>
          <p className="text-sm leading-relaxed">
            {passed
              ? 'Aplicaste con éxito las ideas en situaciones nuevas.'
              : 'El avance ha quedado guardado. La próxima sesión retomaremos con calma.'}
          </p>
        </div>
      </div>
    );
  }

  const currentConceptIdx = incorrectIndices[session.recoveryIndex] ?? 0;
  const recItem = lessonData.recovery.items[currentConceptIdx] ?? lessonData.recovery.items[0];

  const handleAnswerOption = (option: string) => {
    const isCorrect = option === recItem.correct;
    const updatedResults = [...session.recoveryResults, isCorrect];

    updateSession({
      recoveryResults: updatedResults,
      recoveryIndex: session.recoveryIndex + 1,
      recoveryVisible: false
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 animate-fadeIn">
      <div className="text-center mb-6">
        <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
          Revisemos una idea
        </span>
        <h1 className="text-2xl font-extrabold text-[#1c3257]">{recItem.title}</h1>
      </div>

      <div className="bg-white border border-[#dce2e6] rounded-2xl p-5 mb-6 text-sm text-[#334157] leading-relaxed shadow-sm">
        {recItem.explain}
      </div>

      {session.recoveryVisible && (
        <fieldset className="bg-[#e9f8f8] border border-[#12a1a4] rounded-2xl p-5 shadow-sm animate-fadeIn">
          <legend className="text-sm font-bold text-[#1c3257] px-2">
            {recItem.q}
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {recItem.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleAnswerOption(opt)}
                className="bg-white hover:bg-[#12a1a4] text-[#1c3257] hover:text-white font-bold p-3.5 rounded-xl border border-[#bac5d0] hover:border-[#12a1a4] text-sm transition-all shadow-sm"
              >
                {opt}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <p className="text-center text-xs text-[#4a964e] font-semibold mt-6">
        Aprender también significa volver a intentarlo sin miedo.
      </p>
    </div>
  );
};
