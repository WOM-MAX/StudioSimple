import React from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';

export const StudentRecoveryView: React.FC = () => {
  const { session, lessonData, updateSession } = useLessonSync();

  const itemIdx = session.recoveryItems[session.recoveryIndex] ?? 0;
  const item = lessonData.recovery[itemIdx] ?? lessonData.recovery[0];
  const totalRecovery = session.recoveryItems.length || 1;
  const answered = Boolean(session.recoveryAnswer);
  const isCorrect = session.recoveryAnswer === item.correct;

  return (
    <div className="max-w-xl mx-auto p-6 animate-fadeIn">
      <div className="text-center mb-6">
        <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
          Refuerzo {session.recoveryIndex + 1} de {totalRecovery}
        </span>
        <h1 className="text-2xl font-extrabold text-[#1c3257]">{item.title}</h1>
      </div>

      <div className="bg-white border border-[#dce2e6] rounded-2xl p-5 mb-6 text-sm text-[#334157] leading-relaxed shadow-sm">
        {item.explain}
      </div>

      {session.recoveryVisible && !answered && (
        <div className="bg-[#e9f8f8] border border-[#12a1a4] rounded-2xl p-5 shadow-sm animate-fadeIn">
          <h2 className="text-sm font-bold text-[#1c3257] mb-4">
            {item.q}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {item.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => updateSession({ recoveryAnswer: opt })}
                className="bg-white hover:bg-[#12a1a4] text-[#1c3257] hover:text-white font-bold p-3.5 rounded-xl border border-[#bac5d0] hover:border-[#12a1a4] text-sm transition-all shadow-sm cursor-pointer"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {answered && (
        <div
          className={`rounded-2xl p-5 shadow-sm animate-fadeIn border ${
            isCorrect
              ? 'bg-[#eaf4e8] border-[#badcb8] text-[#255e29]'
              : 'bg-[#fff5ee] border-[#f5c49d] text-[#924814]'
          }`}
        >
          <strong className="text-sm font-bold block mb-1">
            {isCorrect ? '¡Muy bien!' : 'Revisemos la respuesta'}
          </strong>
          <p className="text-xs sm:text-sm leading-relaxed">
            {isCorrect ? item.correctText : item.fixText}
          </p>
        </div>
      )}

      <p className="text-center text-xs text-[#748093] font-semibold mt-6">
        Escucha a tu mentor para continuar con la sesión.
      </p>
    </div>
  );
};
