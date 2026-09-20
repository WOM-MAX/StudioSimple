import React from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const StudentMiniquizView: React.FC = () => {
  const { session, lessonData, updateSession } = useLessonSync();

  const handleSelect = (questionIndex: number, option: string) => {
    const updatedAnswers = [...session.miniAnswers];
    updatedAnswers[questionIndex] = option;
    updateSession({ miniAnswers: updatedAnswers });
  };

  const isAllAnswered = session.miniAnswers.length === 3 && session.miniAnswers.every((ans) => Boolean(ans));

  const handleSubmit = () => {
    let score = 0;
    lessonData.quiz.questions.forEach((q, idx) => {
      if (session.miniAnswers[idx] === q.correct) {
        score++;
      }
    });

    updateSession({
      miniScore: score,
      stage: 'results',
      reviewIndex: 0
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 animate-fadeIn">
      <div className="text-center mb-6">
        <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
          {lessonData.metadata.subject} · Clase {lessonData.metadata.lessonNumber}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257]">Miniquiz Autónomo</h1>
        <p className="text-xs text-[#748093] mt-1">
          Responde las 3 preguntas a tu propio ritmo. Cuando termines, presiona el botón para enviar.
        </p>
      </div>

      <div className="space-y-4">
        {lessonData.quiz.questions.map((q, idx) => {
          const selected = session.miniAnswers[idx];
          return (
            <fieldset key={q.id} className="bg-white border border-[#dce2e6] rounded-2xl p-4 sm:p-5 shadow-sm">
              <legend className="text-sm sm:text-base font-bold text-[#1c3257] px-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#12a1a4] text-white text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span>{q.q}</span>
              </legend>

              <div className="grid grid-cols-1 gap-2 mt-3">
                {q.options.map((opt) => {
                  const isChecked = selected === opt;
                  return (
                    <label
                      key={opt}
                      onClick={() => handleSelect(idx, opt)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#e9f8f8] border-[#12a1a4] text-[#1c3257] shadow-sm font-bold'
                          : 'bg-white border-[#dce2e6] text-[#334157] hover:bg-[#f9fafb]'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`quiz_q_${idx}`}
                        checked={isChecked}
                        onChange={() => handleSelect(idx, opt)}
                        className="w-4 h-4 text-[#12a1a4] focus:ring-[#12a1a4]"
                      />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          disabled={!isAllAnswered}
          onClick={handleSubmit}
          className={`px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all ${
            isAllAnswered
              ? 'bg-[#1c3257] hover:bg-[#284773] text-white cursor-pointer hover:shadow-lg'
              : 'bg-[#dce2e6] text-[#8da3c0] cursor-not-allowed'
          }`}
        >
          <span>Enviar respuestas</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
