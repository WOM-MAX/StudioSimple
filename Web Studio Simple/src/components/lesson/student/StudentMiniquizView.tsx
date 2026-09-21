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
          const isCompact = q.options.length <= 3 && q.options.every((o) => o.length < 20);

          return (
            <div
              key={q.id}
              className="bg-white border border-[#dce2e6] rounded-2xl p-5 sm:p-6 shadow-sm hover:border-[#cbd5e1] transition-all"
            >
              {/* Enunciado completamente integrado dentro de la tarjeta */}
              <div className="flex items-start gap-3 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#12a1a4] text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-sm">
                  {idx + 1}
                </span>
                <h2 className="text-sm sm:text-base font-bold text-[#1c3257] leading-snug flex-1">
                  {q.q}
                </h2>
              </div>

              {/* Opciones de respuesta refinadas */}
              <div className={`grid gap-2.5 ${isCompact ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1'}`}>
                {q.options.map((opt) => {
                  const isChecked = selected === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelect(idx, opt)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#eef9fa] border-[#12a1a4] text-[#1c3257] font-bold ring-2 ring-[#12a1a4]/20 shadow-sm'
                          : 'bg-white border-[#dce2e6] text-[#334157] font-medium hover:bg-[#f8fafc] hover:border-[#12a1a4]/50'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'border-[#12a1a4] bg-[#12a1a4]'
                            : 'border-[#94a3b8] bg-white'
                        }`}
                      >
                        {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="flex-1 leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
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
              ? 'bg-[#1c3257] hover:bg-[#284773] text-white cursor-pointer hover:shadow-lg hover:scale-[1.01]'
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
