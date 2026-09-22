import React from 'react';
import { Lightbulb } from 'lucide-react';

interface SupportHintCardProps {
  message?: string;
  visible: boolean;
}

/**
 * Non-punitive pedagogical support card shown when a student needs help
 * or answers incorrectly. Uses warm amber tones and Socratic light
 * to guide without shaming (aligned with neurodivergent-friendly design).
 */
export const SupportHintCard: React.FC<SupportHintCardProps> = ({
  message,
  visible
}) => {
  if (!visible) return null;

  return (
    <div className="animate-fadeIn">
      <div className="relative bg-gradient-to-br from-amber-50 via-orange-50/80 to-amber-50 border border-amber-200/80 rounded-2xl p-5 shadow-md shadow-amber-100/50 overflow-hidden">
        {/* Warm ambient glow */}
        <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-200/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex items-start gap-3.5">
          {/* Socratic light bulb icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shrink-0 shadow-sm shadow-amber-300/40">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 block mb-1">
              Pista de tu mentor
            </span>
            <p className="text-sm text-amber-900 font-semibold leading-relaxed">
              {message || 'Presta atencion a la pista que te dara tu mentor. Piensa con calma, no hay apuro.'}
            </p>
            <p className="text-[11px] text-amber-600/80 mt-2 font-medium">
              Recuerda: equivocarse es parte de aprender. Tu mentor esta aqui para ayudarte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
