import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  Award,
  Video,
  FileText,
  RotateCcw
} from 'lucide-react';
import { LessonComponent } from '../../types';

export const LessonPlayer: React.FC = () => {
  const { activeLesson, markLessonCompleted, addCuriosityPoints, addGems } = useApp();
  
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentComponent: LessonComponent = activeLesson.components[currentStepIndex];
  const totalSteps = activeLesson.components.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setSelectedQuizOption(null);
      setQuizFeedback(null);
    } else {
      setIsCompleted(true);
      markLessonCompleted(activeLesson.id);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setSelectedQuizOption(null);
      setQuizFeedback(null);
    }
  };

  const handleQuizAnswer = (optionId: string, isCorrect: boolean, explanation: string) => {
    setSelectedQuizOption(optionId);
    setQuizFeedback({
      isCorrect,
      text: explanation,
    });

    if (isCorrect) {
      addCuriosityPoints(20);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Header Bar */}
      <div className="glass-card rounded-2xl p-4 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F57C00] flex items-center justify-center text-white font-bold">
            📐
          </div>
          <div>
            <span className="text-[11px] text-[#57D6F3] font-bold uppercase tracking-wider">
              {activeLesson.subject} • {activeLesson.grade} • {activeLesson.oaCode}
            </span>
            <h2 className="font-display font-bold text-sm text-white">{activeLesson.title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="text-white/60">Componente {currentStepIndex + 1} de {totalSteps}</span>
          <div className="w-24 bg-black/40 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#57D6F3] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Component Card */}
      {!isCompleted ? (
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 bg-[#101415]/90 space-y-6 shadow-2xl min-h-[400px] flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* Step Title Badge */}
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-[#F8AD22]">
                {currentComponent.title}
              </h3>
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                Paso {currentComponent.step} / 11
              </span>
            </div>

            {/* Content text */}
            <p className="text-sm md:text-base text-slate-700 dark:text-white/90 leading-relaxed font-sans">
              {currentComponent.content}
            </p>

            {/* Step Type Details / Specific rendering */}
            {currentComponent.details && (
              <ul className="space-y-2 bento-card p-4 rounded-2xl border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-white/80">
                {currentComponent.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#18AFCB] dark:text-[#57D6F3] font-bold">▪</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* MINI-QUIZ INTERACTIVO (Formato Examen Libre MINEDUC) */}
            {currentComponent.type === 'mini_quiz' && currentComponent.quizOptions && (
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  {currentComponent.quizOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handleQuizAnswer(opt.id, opt.isCorrect, opt.explanation)}
                      className={`w-full p-4 rounded-2xl text-left text-xs md:text-sm font-medium border transition-all flex items-center justify-between ${
                        selectedQuizOption === opt.id
                          ? opt.isCorrect
                            ? 'border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200'
                            : 'border-amber-500 bg-amber-500/15 text-amber-800 dark:text-amber-200'
                          : 'border-slate-200 dark:border-white/10 bento-card hover:border-[#18AFCB] text-slate-800 dark:text-white'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {selectedQuizOption === opt.id && (
                        <span>{opt.isCorrect ? '✅' : '💡'}</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Non-punitive Feedback Display */}
                {quizFeedback && (
                  <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    quizFeedback.isCorrect
                      ? 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-800 dark:text-emerald-200'
                      : 'bg-amber-500/10 dark:bg-amber-950/40 border-amber-500/40 text-amber-800 dark:text-amber-200'
                  }`}>
                    <p className="font-bold mb-1">
                      {quizFeedback.isCorrect ? '¡Excelente análisis!' : 'Pista de Aprendizaje:'}
                    </p>
                    <p>{quizFeedback.text}</p>
                  </div>
                )}
              </div>
            )}

            {/* CAJA VERDE DE APOYO AL APODERADO */}
            {currentComponent.type === 'parent_tip' && (
              <div className="bg-emerald-500/10 dark:bg-emerald-950/50 border border-emerald-500/40 p-5 rounded-2xl flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm block">Caja Verde de Apoyo al Apoderado:</span>
                  <p className="text-slate-700 dark:text-emerald-100/90 leading-relaxed font-sans">
                    {currentComponent.content}
                  </p>
                </div>
              </div>
            )}

            {/* VIDEO RECOMMENDED */}
            {currentComponent.type === 'video' && (
              <div className="bento-card p-6 rounded-2xl border border-slate-200 dark:border-white/10 text-center space-y-3">
                <Video className="w-8 h-8 text-[#18AFCB] dark:text-[#57D6F3] mx-auto" />
                <p className="text-xs text-slate-600 dark:text-white/80 font-medium">Cápsula Audiovisual Curada para Apoyo</p>
                <div className="aspect-video bg-slate-100 dark:bg-black/50 rounded-xl flex items-center justify-center text-xs text-slate-500 dark:text-white/50 border border-slate-200 dark:border-white/5">
                  [Video Explicativo de 3 min: Propiedad Distributiva]
                </div>
              </div>
            )}


          </div>

          {/* Bottom Action Navigation Controls */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-6">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-white/70 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F57C00] hover:bg-[#e06f00] text-white font-display font-bold text-xs shadow-lg transition-all"
            >
              <span>{currentStepIndex === totalSteps - 1 ? 'Finalizar Lección' : 'Siguiente Paso'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* LESSON COMPLETE CELEBRATION SCREEN */
        <div className="glass-card rounded-3xl p-8 text-center space-y-6 border border-emerald-500/40 bg-[#101415]/90 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto text-4xl">
            🏆
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-black text-3xl text-white">¡Lección Completada con Éxito!</h2>
            <p className="text-xs text-white/80 max-w-md mx-auto">
              Has dominado el Objetivo de Aprendizaje <strong className="text-[#57D6F3]">{activeLesson.oaCode}</strong> de {activeLesson.subject}.
            </p>
          </div>

          <div className="inline-flex items-center gap-6 p-4 rounded-2xl bg-[#123A72]/40 border border-white/10">
            <div className="text-center">
              <span className="text-[10px] text-white/50 font-semibold uppercase block">Puntos Curiosidad</span>
              <span className="text-xl font-bold text-[#F8AD22]">+50 Pts</span>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="text-center">
              <span className="text-[10px] text-white/50 font-semibold uppercase block">Gemas Recibidas</span>
              <span className="text-xl font-bold text-[#57D6F3]">+2 💎</span>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                setIsCompleted(false);
                setCurrentStepIndex(0);
              }}
              className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-xs shadow-lg"
            >
              Volver al Mapa de Misiones
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
