import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { HeartPulse, X, Smile, Sparkles } from 'lucide-react';

export const SensoryPause: React.FC = () => {
  const { isSensoryPauseOpen, setIsSensoryPauseOpen } = useApp();
  const [phase, setPhase] = useState<'invale' | 'hold' | 'exhale'>('invale');
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    if (!isSensoryPauseOpen) return;

    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev > 1) return prev - 1;
        
        // Cycle phases: inhalar (4s) -> mantener (4s) -> exhalar (4s)
        if (phase === 'invale') {
          setPhase('hold');
          return 4;
        } else if (phase === 'hold') {
          setPhase('exhale');
          return 4;
        } else {
          setPhase('invale');
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSensoryPauseOpen, phase]);

  if (!isSensoryPauseOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-card rounded-3xl p-8 max-w-md w-full text-center space-y-6 border border-emerald-500/30 bg-[#101415]/95 shadow-2xl relative">
        
        <button
          onClick={() => setIsSensoryPauseOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white/70 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
          <HeartPulse className="w-4 h-4" />
          <span>Pausa Sensorial de Autorregulación</span>
        </div>

        <div className="space-y-2">
          <h3 className="font-display font-bold text-2xl text-white">Tómate un descanso tranquilo</h3>
          <p className="text-xs text-white/70">
            Aprender requiere calma. Inhala y exhala despacio siguiendo la esfera. Sin prisa.
          </p>
        </div>

        {/* Breathing Animation Circle */}
        <div className="py-8 flex flex-col items-center justify-center">
          <div className={`w-36 h-36 rounded-full flex items-center justify-center transition-all duration-1000 ${
            phase === 'invale'
              ? 'scale-125 bg-emerald-500/30 border-4 border-emerald-400 shadow-[0_0_50px_rgba(52,211,153,0.4)]'
              : phase === 'hold'
              ? 'scale-125 bg-teal-500/30 border-4 border-teal-300'
              : 'scale-90 bg-emerald-900/30 border-4 border-emerald-600'
          }`}>
            <div className="text-center">
              <span className="font-display font-black text-xl text-white uppercase block">
                {phase === 'invale' ? 'Inhala' : phase === 'hold' ? 'Manten' : 'Exhala'}
              </span>
              <span className="text-2xl font-bold text-emerald-300">{seconds}s</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsSensoryPauseOpen(false)}
          className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-xs shadow-lg transition-all"
        >
          Me siento listo para continuar
        </button>

      </div>
    </div>
  );
};
