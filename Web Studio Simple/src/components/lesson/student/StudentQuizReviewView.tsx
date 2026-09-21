import React from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { CheckCircle2, HelpCircle } from 'lucide-react';

export const StudentQuizReviewView: React.FC = () => {
  const { session, lessonData } = useLessonSync();
  const qIndex = session.reviewIndex || 0;
  const totalQ = lessonData.quiz.questions.length;
  const currentQ = lessonData.quiz.questions[qIndex] || lessonData.quiz.questions[0];
  const studentAns = session.miniAnswers[qIndex];
  const isCorrect = studentAns === currentQ.correct;

  return (
    <div className="max-w-2xl mx-auto w-full animate-fadeIn py-4">
      {/* Tarjeta de revisión de la respuesta */}
      <div className="bg-white border border-[#dce2e6] rounded-3xl p-6 sm:p-8 shadow-sm">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#12a1a4] block mb-2">
          Recordemos la respuesta · Pregunta {qIndex + 1} de {totalQ}
        </span>

        <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c3257] leading-snug mb-6">
          {currentQ.q}
        </h2>

        {/* Comparación visual de respuestas */}
        <div className="space-y-3 mb-6">
          <div className={`flex items-center justify-between p-3.5 rounded-2xl border text-xs sm:text-sm ${
            isCorrect
              ? 'bg-[#f4faf3] border-[#badcb8]'
              : 'bg-[#fff5ee] border-[#f5c49d]'
          }`}>
            <span className="text-[#64748b] font-medium">Tu respuesta:</span>
            <span className={`font-bold flex items-center gap-1.5 ${
              isCorrect ? 'text-[#255e29]' : 'text-[#ee751c]'
            }`}>
              {isCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-[#255e29]" />
              ) : (
                <HelpCircle className="w-4 h-4 text-[#ee751c]" />
              )}
              {studentAns || '(Sin responder)'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#eaf4e8] border border-[#badcb8] text-xs sm:text-sm">
            <span className="text-[#255e29] font-medium">Respuesta correcta:</span>
            <span className="font-bold text-[#255e29] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#255e29]" />
              {currentQ.correct}
            </span>
          </div>
        </div>

        {/* Recuadro con la explicación pedagógica */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-5 text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#748093] block mb-1.5">
            Explicación pedagógica
          </span>
          <p className="text-xs sm:text-sm text-[#334157] leading-relaxed">
            {currentQ.explain}
          </p>
        </div>

        <p className="text-xs text-[#8da3c0] text-center mt-6">
          Escucha las indicaciones de tu mentor para continuar revisando.
        </p>
      </div>
    </div>
  );
};
