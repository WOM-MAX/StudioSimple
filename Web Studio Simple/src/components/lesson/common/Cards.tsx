import React from 'react';
import { Info, Check, Sparkles, AlertCircle, Heart } from 'lucide-react';

export const PromptBox: React.FC<{
  label: string;
  tone?: 'green' | 'teal' | 'orange' | 'yellow';
  children: React.ReactNode;
}> = ({ label, tone = 'green', children }) => {
  const toneClasses = {
    green: 'border-l-[#4a964e] text-[#4a964e]',
    teal: 'border-l-[#12a1a4] text-[#12a1a4]',
    orange: 'border-l-[#ee751c] text-[#ee751c]',
    yellow: 'border-l-[#f8ad22] text-[#c87b00]'
  };

  return (
    <div className={`bg-white border-l-4 ${toneClasses[tone]} rounded-xl my-3 p-4 shadow-sm`}>
      <span className="font-bold text-xs tracking-wider uppercase block mb-1.5">{label}</span>
      <div className="text-[#334157] text-base leading-relaxed">{children}</div>
    </div>
  );
};

export const PrivateBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-[#fff7db] border border-[#f0d372] text-[#5a4704] rounded-xl p-3.5 my-3 flex items-start gap-2.5 text-sm">
      <Info className="w-4 h-4 text-[#956b00] shrink-0 mt-0.5" />
      <div>
        <strong className="text-[#956b00] block text-xs uppercase tracking-wider mb-0.5">Solo para ti</strong>
        <div className="text-[#5a4704] leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

export const EmotionalTipBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-[#fdf2f8] border border-[#fbcfe8] text-[#831843] rounded-xl p-3.5 my-3 flex items-start gap-2.5 text-sm shadow-sm">
      <Heart className="w-4 h-4 text-[#db2777] shrink-0 mt-0.5" />
      <div>
        <strong className="text-[#db2777] block text-xs uppercase tracking-wider mb-0.5">Educación Emocional & Clima Seguro</strong>
        <div className="text-[#831843] leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

export const SocraticTipBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#14532d] rounded-xl p-3.5 my-3 flex items-start gap-2.5 text-sm shadow-sm">
      <Sparkles className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
      <div>
        <strong className="text-[#16a34a] block text-xs uppercase tracking-wider mb-0.5">Diálogo Socrático</strong>
        <div className="text-[#14532d] leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

export const ExpectedAnswerBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-[#e8edf3] border border-[#d2dbe5] rounded-xl px-4 py-2.5 my-3 flex items-center justify-between gap-3 text-sm">
      <span className="text-[#687589] text-xs font-semibold uppercase tracking-wider">Respuesta esperada</span>
      <strong className="text-[#1c3257] text-right font-bold text-sm">{children}</strong>
    </div>
  );
};

export const FeedbackBanner: React.FC<{
  feedback: { kind: 'success' | 'support' | 'reveal' | 'info'; text: string } | null;
}> = ({ feedback }) => {
  if (!feedback) return null;

  const isSuccess = feedback.kind === 'success';
  const isReveal = feedback.kind === 'reveal';

  return (
    <div
      className={`rounded-xl p-3.5 my-3 flex items-start gap-2.5 text-sm transition-all animate-fadeIn ${
        isSuccess
          ? 'bg-[#eaf4e8] text-[#255e29] border border-[#badcb8]'
          : isReveal
          ? 'bg-[#f0f4f8] text-[#1c3257] border border-[#dce2e6]'
          : 'bg-[#fff0e4] text-[#794112] border border-[#f5c49d]'
      }`}
    >
      {isSuccess ? (
        <Check className="w-4 h-4 text-[#255e29] shrink-0 mt-0.5" />
      ) : isReveal ? (
        <Sparkles className="w-4 h-4 text-[#12a1a4] shrink-0 mt-0.5" />
      ) : (
        <AlertCircle className="w-4 h-4 text-[#ee751c] shrink-0 mt-0.5" />
      )}
      <p className="m-0 leading-relaxed">{feedback.text}</p>
    </div>
  );
};
