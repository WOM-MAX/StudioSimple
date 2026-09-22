import React, { useRef, useState, useEffect } from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { StudentHeader } from './StudentHeader';
import { StudentDisciplineGraphic } from './StudentDisciplineGraphic';
import { StudentMiniquizView } from './StudentMiniquizView';
import { StudentQuizReviewView } from './StudentQuizReviewView';
import { StudentRecoveryView } from './StudentRecoveryView';
import { ConfettiEffect } from './ConfettiEffect';
import { SupportHintCard } from './SupportHintCard';
import { getSubjectTheme } from '../../../lib/subject-theme';
import {
  Sparkles,
  Check,
  CircleHelp,
  ArrowRight,
  Play
} from 'lucide-react';

function isAmbientActiveStage(
  stage: string,
  hookStarted: boolean,
  hookEnded: boolean,
  formalStarted: boolean,
  formalEnded: boolean
): boolean {
  if (['cover', 'prep'].includes(stage)) return true;
  if (['conversationIntro', 'preQuestions', 'postIntro', 'postQuestions', 'summary'].includes(stage)) return true;
  if (stage === 'hook') return !hookStarted || hookEnded;
  if (stage === 'formalization') return !formalStarted || formalEnded;
  return false;
}

export const StudentLessonView: React.FC = () => {
  const { session, lessonData } = useLessonSync();
  const theme = getSubjectTheme(lessonData.metadata.subject);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevFeedbackRef = useRef<string | null>(null);

  // Trigger confetti on success/reveal feedback transitions
  useEffect(() => {
    const currentKind = session.feedback?.kind || null;
    if (
      (currentKind === 'success' || currentKind === 'reveal') &&
      prevFeedbackRef.current !== currentKind
    ) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
    prevFeedbackRef.current = currentKind;
  }, [session.feedback?.kind]);

  const isAmbientActive = isAmbientActiveStage(
    session.stage,
    session.hookStarted,
    session.hookEnded,
    session.formalStarted,
    session.formalEnded
  );

  useEffect(() => {
    const player = audioRef.current;
    if (!player) return;
    player.volume = 0.12;
    if (isAmbientActive && soundOn && lessonData.ambientAudioSrc) {
      player
        .play()
        .then(() => setBlocked(false))
        .catch(() => setBlocked(true));
    } else {
      player.pause();
      if (!isAmbientActive) player.currentTime = 0;
    }
  }, [isAmbientActive, soundOn, lessonData.ambientAudioSrc]);

  const toggleSound = () => {
    if (soundOn && !blocked) {
      setSoundOn(false);
      return;
    }
    setSoundOn(true);
    const player = audioRef.current;
    if (player && lessonData.ambientAudioSrc) {
      player.volume = 0.12;
      player
        .play()
        .then(() => setBlocked(false))
        .catch(() => setBlocked(true));
    }
  };

  const currentPreItem = lessonData.preQuestions[session.conversationIndex] ?? lessonData.preQuestions[0];
  const currentPostItem = lessonData.postQuestions[session.postIndex] ?? lessonData.postQuestions[0];
  const currentPracticeItem = lessonData.practice[session.practiceIndex] ?? lessonData.practice[0];

  return (
    <div className="flex flex-col h-full min-h-[720px] bg-gradient-to-br from-slate-50 via-white to-slate-100/70 rounded-2xl overflow-hidden border border-slate-200/90 shadow-md shadow-slate-200/40 select-none relative">
      {/* Confetti on correct answers */}
      <ConfettiEffect active={showConfetti} />

      {/* Audio ambiental opcional */}
      {lessonData.ambientAudioSrc && (
        <audio ref={audioRef} src={lessonData.ambientAudioSrc} loop preload="auto" />
      )}

      {/* Dynamic Ambient Glow Auras for Visual Warmth and Vitality */}
      <div className={`absolute -top-20 -right-20 w-80 h-80 rounded-full ${theme.glowColor} blur-3xl pointer-events-none transition-all duration-700`} />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-slate-200/30 blur-3xl pointer-events-none" />

      <StudentHeader
        soundActive={isAmbientActive && Boolean(lessonData.ambientAudioSrc)}
        soundOn={soundOn && !blocked}
        onToggleSound={toggleSound}
      />

      <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-center max-w-4xl mx-auto w-full relative z-10">
        {/* 1. STAGE: COVER & PREP (Waiting Room - Clean Single-Elevation Card) */}
        {(session.stage === 'cover' || session.stage === 'prep') && (
          <div className="max-w-md mx-auto w-full text-center animate-fadeIn my-auto py-6">
            <div className={`bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-slate-200/60 border ${theme.borderColor} text-center relative overflow-hidden transition-all duration-300 hover:shadow-2xl`}>
              {/* Decorative top accent border */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.accentGradient}`} />

              <div className={`inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} font-bold text-xs uppercase tracking-wider mb-4 shadow-xs`}>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Sala de Espera · Sincronizado</span>
              </div>

              <h1 className="text-2xl font-black text-[#1C3257] mb-2 tracking-tight">
                La clase comenzará pronto
              </h1>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Tu mentor está preparando la sesión de hoy. Cuando comience, tu pantalla avanzará automáticamente.
              </p>

              <div className="pt-4 border-t border-slate-100 text-left bg-slate-50/70 -mx-8 -mb-8 p-6 rounded-b-3xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  {lessonData.metadata.subject} · {lessonData.metadata.oaCode}
                </span>
                <strong className="text-sm text-[#1C3257] font-extrabold block mt-0.5">
                  {lessonData.metadata.lessonTitle}
                </strong>
              </div>
            </div>
          </div>
        )}

        {/* 2. STAGE: ROUTE OVERVIEW (Grandes bloques del curso) */}
        {session.stage === 'routeOverview' && (
          <div className="max-w-2xl mx-auto w-full animate-fadeIn py-4">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1 text-center">
              Nuestra ruta de {lessonData.metadata.subject}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-6 text-center">
              {lessonData.route.blocks.length} grandes bloques
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lessonData.route.blocks.map((block, idx) => {
                const colors = [
                  'bg-[#1c3257] text-white',
                  'bg-[#ee751c] text-white',
                  'bg-[#f8ad22] text-[#1c3257]',
                  'bg-[#12a1a4] text-white'
                ];
                return (
                  <article key={block.id || block.number} className={`${colors[idx % colors.length]} rounded-2xl p-5 shadow-sm min-h-[110px] flex flex-col justify-between`}>
                    <span className="text-xs font-bold opacity-75">{block.number}</span>
                    <div>
                      <h2 className="text-lg font-bold leading-tight mb-1">{block.title}</h2>
                      <p className="text-xs opacity-90 leading-snug">{block.subtitle}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. STAGE: ROUTE TODAY (La clase de hoy) */}
        {session.stage === 'routeToday' && (
          <div className="max-w-2xl mx-auto w-full animate-fadeIn text-center py-4">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              La clase de hoy
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-6">
              {lessonData.metadata.lessonTitle}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {lessonData.route.keyQuestions && lessonData.route.keyQuestions.length > 0 ? (
                lessonData.route.keyQuestions.map((q, idx) => {
                  const iconColors = [
                    'bg-[#e6f7f7] text-[#12a1a4]',
                    'bg-[#e9f2f8] text-[#1c3257]',
                    'bg-[#fff0e4] text-[#ee751c]'
                  ];
                  return (
                    <div key={idx} className="bg-white border border-[#dce2e6] rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                      <div className={`w-10 h-10 rounded-full ${iconColors[idx % iconColors.length]} flex items-center justify-center mb-3 font-bold text-sm`}>
                        {idx + 1}
                      </div>
                      <strong className="text-sm font-bold text-[#1c3257] block mb-1">{q.label}</strong>
                      <span className="text-xs text-[#748093]">{q.sub}</span>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full bg-white border border-[#dce2e6] rounded-2xl p-6 shadow-sm text-center">
                  <p className="text-sm text-[#1c3257] font-semibold">{lessonData.route.dileObjective}</p>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#526177] max-w-lg mx-auto leading-relaxed bg-white border border-[#dce2e6] p-4 rounded-2xl">
              {lessonData.route.dileObjective}
            </p>
          </div>
        )}

        {/* 4. STAGE: INTERACTIVE DISCIPLINE GRAPHIC (CPA) */}
        {(session.stage === 'thermo' || session.stage === 'thermoMeaning') && (
          <div className="w-full flex flex-col items-center justify-center animate-fadeIn py-2">
            <StudentDisciplineGraphic
              interactiveType={lessonData.interactive?.type}
              subject={lessonData.metadata.subject}
              oaCode={lessonData.metadata.oaCode}
              lessonNumber={lessonData.metadata.lessonNumber}
            />
          </div>
        )}

        {/* 5. STAGE: HOOK */}
        {session.stage === 'hook' && (
          <div className="max-w-3xl mx-auto w-full animate-fadeIn text-center">
            {!session.hookStarted ? (
              <div className={`bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md mx-auto w-full shadow-xl shadow-slate-200/50 border ${theme.borderColor} text-left relative overflow-hidden transition-all duration-300`}>
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.accentGradient}`} />
                <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.badgeText} block mb-2`}>
                  {lessonData.hook.title || 'Video de inicio'}
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C3257] mb-4">
                  Mientras observas, fíjate en...
                </h1>
                {lessonData.hook.focusPoints && lessonData.hook.focusPoints.length > 0 ? (
                  <ul className="space-y-2 text-xs sm:text-sm text-[#334157] font-semibold">
                    {lessonData.hook.focusPoints.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} text-[11px] flex items-center justify-center font-bold`}>
                          {idx + 1}
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-[#526177]">
                    Presta atención a los detalles principales que presentará el video.
                  </p>
                )}
                <p className="text-[11px] text-slate-400 mt-6 pt-3 border-t border-slate-100">
                  El video se reproducirá cuando tu mentor lo indique.
                </p>
              </div>
            ) : !session.hookEnded ? (
              <SyncedStudentVideo src={lessonData.hook.videoSrc} kind="hook" session={session} title={lessonData.hook.title} />
            ) : (
              <div className={`bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md mx-auto w-full shadow-xl shadow-slate-200/50 border ${theme.borderColor} text-center relative overflow-hidden transition-all duration-300`}>
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.accentGradient}`} />
                <h1 className="text-2xl font-extrabold text-[#1C3257] mb-2">
                  {lessonData.hook.title || 'Observación completada'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Ahora comprenderemos la información del video junto a tu mentor.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 6. STAGE: CONVERSATION INTRO */}
        {session.stage === 'conversationIntro' && (
          <div className="max-w-md mx-auto w-full animate-fadeIn text-center my-auto py-6">
            <div className={`bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-slate-200/50 border ${theme.borderColor} text-center relative overflow-hidden transition-all duration-300`}>
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.accentGradient}`} />
              <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.badgeText} block mb-2`}>
                Conversemos sobre lo observado
              </span>
              <h1 className="text-2xl font-extrabold text-[#1C3257] mb-2">Pensemos juntos</h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {lessonData.conversationContext || 'Responderemos algunas preguntas sobre la situación presentada.'}
              </p>
            </div>
          </div>
        )}

        {/* 7. STAGE: PRE QUESTIONS */}
        {session.stage === 'preQuestions' && (
          <div className="max-w-lg mx-auto w-full animate-fadeIn text-center my-auto py-6">
            <div className={`bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-slate-200/50 border ${theme.borderColor} text-center relative overflow-hidden transition-all duration-300`}>
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.accentGradient}`} />
              <span className={`inline-flex px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} text-[11px] font-bold uppercase tracking-widest mb-3`}>
                Pregunta {session.conversationIndex + 1} de {lessonData.preQuestions.length || 2}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C3257] mb-4">
                {currentPreItem.question}
              </h1>

              <SupportHintCard
                visible={session.feedback?.kind === 'support'}
                message="Presta atencion a la pista que te dara tu mentor."
              />

              {(session.feedback?.kind === 'success' || session.feedback?.kind === 'reveal') && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-xs animate-fadeIn">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{currentPreItem.studentReveal}</span>
                </div>
              )}

              {!session.feedback && (
                <p className="text-xs text-slate-400 mt-4">
                  Responde en voz alta a tu mentor.
                </p>
              )}
            </div>
          </div>
        )}
        {/* 8. STAGE: FORMALIZATION */}
        {session.stage === 'formalization' && (
          <div className="max-w-3xl mx-auto w-full animate-fadeIn text-center">
            {!session.formalStarted ? (
              <div className={`bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md mx-auto w-full shadow-xl shadow-slate-200/50 border ${theme.borderColor} text-center relative overflow-hidden transition-all duration-300`}>
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.accentGradient}`} />
                <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.badgeText} block mb-2`}>
                  Ahora aprenderemos
                </span>
                <h1 className="text-2xl font-extrabold text-[#1C3257] mb-2">
                  {lessonData.formalization.concept || 'Concepto clave'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {lessonData.formalization.summary || 'Explicación del concepto fundamental de la clase.'}
                </p>
              </div>
            ) : !session.formalEnded ? (
              <SyncedStudentVideo src={lessonData.formalization.videoSrc ?? ''} kind="formal" session={session} title={lessonData.formalization.concept} />
            ) : (
              <div className={`bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md mx-auto w-full shadow-xl shadow-slate-200/50 border ${theme.borderColor} text-center relative overflow-hidden transition-all duration-300`}>
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.accentGradient}`} />
                <h1 className="text-2xl font-extrabold text-[#1C3257] mb-2">
                  {lessonData.formalization.concept || 'Concepto clave'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Ahora comprobaremos lo aprendido con dos preguntas.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 9. STAGE: POST INTRO */}
        {session.stage === 'postIntro' && (
          <div className="max-w-md mx-auto w-full animate-fadeIn text-center my-auto py-6">
            <div className={`bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-slate-200/50 border ${theme.borderColor} text-center relative overflow-hidden transition-all duration-300`}>
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.accentGradient}`} />
              <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.badgeText} block mb-2`}>
                Comprobemos lo aprendido
              </span>
              <h1 className="text-2xl font-extrabold text-[#1C3257] mb-2">
                {lessonData.formalization.concept || 'Ideas principales'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Responderemos dos preguntas sobre lo aprendido en la explicación.
              </p>
            </div>
          </div>
        )}

        {/* 10. STAGE: POST QUESTIONS */}
        {session.stage === 'postQuestions' && (
          <div className="max-w-lg mx-auto w-full animate-fadeIn text-center my-auto py-6">
            <div className={`bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-slate-200/50 border ${theme.borderColor} text-center relative overflow-hidden transition-all duration-300`}>
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.accentGradient}`} />
              <span className={`inline-flex px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} text-[11px] font-bold uppercase tracking-widest mb-3`}>
                Pregunta {session.postIndex + 1} de {lessonData.postQuestions.length || 2}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C3257] mb-4">
                {currentPostItem.question}
              </h1>

              <SupportHintCard
                visible={session.feedback?.kind === 'support'}
                message="Presta atencion a la pista que te dara tu mentor."
              />

              {(session.feedback?.kind === 'success' || session.feedback?.kind === 'reveal') && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-xs animate-fadeIn">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{currentPostItem.studentReveal}</span>
                </div>
              )}

              {!session.feedback && (
                <p className="text-xs text-slate-400 mt-4">
                  Responde en voz alta a tu mentor.
                </p>
              )}
            </div>
          </div>
        )}

        {/* 11. STAGE: SUMMARY */}
        {session.stage === 'summary' && (
          <div className="max-w-2xl mx-auto w-full animate-fadeIn text-center py-4">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              En resumen
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-6">
              {lessonData.formalization.concept || lessonData.formalization.title || lessonData.metadata.lessonTitle}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lessonData.summaryIdeas && lessonData.summaryIdeas.length > 0 ? (
                lessonData.summaryIdeas.slice(0, 2).map(([title, desc], idx) => {
                  const borderColors = ['border-[#1c3257]', 'border-[#ee751c]'];
                  const tagColors = ['text-[#12a1a4]', 'text-[#ee751c]'];

                  return (
                    <article key={title} className={`bg-white border-2 ${borderColors[idx % 2]} rounded-3xl p-6 shadow-sm flex flex-col justify-between text-left`}>
                      <div>
                        <span className={`text-xs font-extrabold uppercase tracking-wider ${tagColors[idx % 2]} block mb-2`}>
                          {title}
                        </span>
                        <b className="text-base sm:text-lg font-bold text-[#1c3257] block mb-2">
                          {desc}
                        </b>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="col-span-full bg-white border border-[#dce2e6] rounded-3xl p-6 shadow-sm text-left">
                  <p className="text-sm text-[#1c3257]">{lessonData.formalization.summary || lessonData.summaryText || 'Revisamos los conceptos clave de la clase.'}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 12. STAGE: PRACTICE INTRO */}
        {session.stage === 'practiceIntro' && (() => {
          const ordinals = ['Primera situación', 'Segunda situación', 'Tercera situación', 'Siguiente situación'];
          const textOrdinal = ordinals[session.practiceIndex] ?? `Situación ${session.practiceIndex + 1}`;

          return (
            <div className="max-w-xl mx-auto w-full animate-fadeIn text-center py-4">
              <div className="bg-white border border-[#dce2e6] rounded-3xl p-8 shadow-sm flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center mb-4 text-[#12a1a4] font-extrabold text-xl">
                  {session.practiceIndex + 1}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#12a1a4] block mb-1">
                  {textOrdinal}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-3">
                  {currentPracticeItem?.context || 'Práctica guiada'}
                </h1>
                <p className="text-xs text-[#748093]">
                  Escucha la situación antes de responder.
                </p>
              </div>
            </div>
          );
        })()}

        {/* 13. STAGE: PRACTICE */}
        {session.stage === 'practice' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn text-center py-4">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              Situación {session.practiceIndex + 1} de {lessonData.practice.length || 3} : {currentPracticeItem.context}
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1c3257] mb-6">
              {currentPracticeItem.question}
            </h1>

            <div className="bg-white border border-[#dce2e6] rounded-3xl p-8 shadow-sm">
              <SupportHintCard
                visible={session.feedback?.kind === 'support'}
                message="Presta atencion a la pista que te dara tu mentor."
              />

              {(session.feedback?.kind === 'success' || session.feedback?.kind === 'reveal') && (
                <div className="bg-[#eaf4e8] border border-[#badcb8] text-[#255e29] p-4 rounded-2xl text-base font-bold flex items-center justify-center gap-2 shadow-sm animate-fadeIn">
                  <Sparkles className="w-5 h-5 text-[#255e29]" />
                  <span>{currentPracticeItem.studentReveal}</span>
                </div>
              )}

              {!session.feedback && (
                <p className="text-xs text-[#748093]">
                  Responde oralmente a tu mentor.
                </p>
              )}
            </div>
          </div>
        )}

        {/* 14. STAGE: REASONING INTRO & REASONING */}
        {(session.stage === 'reasoningIntro' || session.stage === 'reasoning') && (
          <div className="max-w-2xl mx-auto w-full animate-fadeIn text-center py-4">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              Pensemos y comparemos
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1c3257] mb-6">
              {session.stage === 'reasoningIntro'
                ? (lessonData.reasoning?.title ?? 'Una misma idea puede comunicar sentidos distintos')
                : (lessonData.reasoning?.question ?? 'Cómo interpretamos esta diferencia')}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <article className="bg-white border border-[#dce2e6] rounded-3xl p-6 shadow-sm text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#12a1a4] block mb-1">
                  {lessonData.reasoning?.context1?.label ?? 'Caso 1'}
                </span>
                <strong className="text-2xl font-black text-[#1c3257] block mb-1">
                  {lessonData.reasoning?.context1?.value ?? 'Ejemplo 1'}
                </strong>
                <p className="text-xs text-[#748093]">
                  {lessonData.reasoning?.context1?.desc ?? ''}
                </p>
              </article>

              <article className="bg-white border border-[#dce2e6] rounded-3xl p-6 shadow-sm text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ee751c] block mb-1">
                  {lessonData.reasoning?.context2?.label ?? 'Caso 2'}
                </span>
                <strong className="text-2xl font-black text-[#1c3257] block mb-1">
                  {lessonData.reasoning?.context2?.value ?? 'Ejemplo 2'}
                </strong>
                <p className="text-xs text-[#748093]">
                  {lessonData.reasoning?.context2?.desc ?? ''}
                </p>
              </article>
            </div>

            {session.stage === 'reasoningIntro' ? (
              <p className="text-xs text-[#748093] bg-white border border-[#dce2e6] p-4 rounded-2xl">
                Escucha la indicación antes de responder.
              </p>
            ) : (
              <div className="bg-white border border-[#dce2e6] rounded-3xl p-6 shadow-sm">
                <p className="text-sm sm:text-base font-bold text-[#1c3257] mb-4">
                  {lessonData.reasoning?.question ?? 'Explica con tus palabras la diferencia.'}
                </p>

                <SupportHintCard
                  visible={session.feedback?.kind === 'support'}
                  message="Presta atencion a la pista que te dara tu mentor."
                />

                {session.feedback?.kind === 'success' && (
                  <div className="bg-[#eaf4e8] border border-[#badcb8] text-[#255e29] p-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 animate-fadeIn">
                    <Sparkles className="w-5 h-5 text-[#255e29]" />
                    <span>{lessonData.reasoning?.successFeedback ?? 'Muy bien analizado.'}</span>
                  </div>
                )}

                {session.feedback?.kind === 'reveal' && (
                  <div className="bg-[#f8fafc] border border-[#dce2e6] text-[#334157] p-4 rounded-2xl text-xs sm:text-sm text-left animate-fadeIn">
                    {lessonData.reasoning?.revealText ?? ''}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 15. STAGE: CHALLENGE */}
        {session.stage === 'challenge' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn text-center py-4">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              Desafío breve
            </span>
            <h1 className="text-2xl font-extrabold text-[#1c3257] mb-6">
              {lessonData.challenge?.title ?? lessonData.metadata.lessonTitle}
            </h1>

            <div className="bg-white border border-[#dce2e6] rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-center gap-4 text-xl sm:text-2xl font-black text-[#1c3257] mb-6 flex-wrap">
                <span className="bg-[#e6f7f7] px-4 py-2 rounded-xl text-[#12a1a4]">
                  {lessonData.challenge?.item1?.label ?? 'Elemento A'}
                </span>
                <ArrowRight className="w-6 h-6 text-[#ee751c]" />
                <span className="bg-[#fff0e4] px-4 py-2 rounded-xl text-[#ee751c]">
                  {lessonData.challenge?.item2?.label ?? 'Elemento B'}
                </span>
              </div>

              <p className="text-sm font-bold text-[#1c3257] mb-4">
                {lessonData.challenge?.question ?? 'Identifica la diferencia entre ambos elementos.'}
              </p>

              {session.feedback?.kind === 'success' && (
                <div className="bg-[#eaf4e8] border border-[#badcb8] text-[#255e29] p-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 animate-fadeIn">
                  <Sparkles className="w-5 h-5 text-[#255e29]" />
                  <span>Muy bien explicado.</span>
                </div>
              )}

              <SupportHintCard
                visible={session.feedback?.kind === 'support'}
                message={lessonData.challenge?.supportFeedback ?? 'Tu mentor te dara una pista para resolver este desafio.'}
              />
            </div>
          </div>
        )}

        {/* 16. STAGE: STRATEGY */}
        {session.stage === 'strategy' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn text-center py-4">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              Una estrategia para pensar
            </span>
            <h1 className="text-2xl font-extrabold text-[#1c3257] mb-6">
              {lessonData.strategy?.title ?? 'Cómo analizar esta situación'}
            </h1>

            <div className="space-y-3 text-left">
              {lessonData.strategy?.steps && lessonData.strategy.steps.length > 0 ? (
                lessonData.strategy.steps.map((st, idx) => {
                  const circleColors = ['bg-[#12a1a4]', 'bg-[#ee751c]', 'bg-[#1c3257]'];
                  return (
                    <article key={idx} className="bg-white border border-[#dce2e6] rounded-2xl p-5 shadow-sm flex items-start gap-4">
                      <span className={`w-7 h-7 rounded-full ${circleColors[idx % circleColors.length]} text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5`}>
                        {st.number || idx + 1}
                      </span>
                      <div>
                        <strong className="text-sm font-bold text-[#1c3257] block mb-0.5">{st.title}</strong>
                        <p className="text-xs text-[#526177]">{st.desc}</p>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="bg-white border border-[#dce2e6] rounded-2xl p-5 shadow-sm text-center">
                  <p className="text-xs text-[#526177]">Sigue los pasos indicados por tu mentor.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 17. STAGE: PRACTICE SUMMARY (3 Ideas) */}
        {session.stage === 'practiceSummary' && (
          <div className="max-w-2xl mx-auto w-full animate-fadeIn text-center py-4">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              Recordemos lo aprendido
            </span>
            <h1 className="text-2xl font-extrabold text-[#1c3257] mb-6">
              Tres ideas importantes
            </h1>

            <div className="space-y-3 text-left">
              {lessonData.summaryIdeas.slice(0, session.summaryIdea).map(([title, text]) => (
                <article key={title} className="bg-white border border-[#dce2e6] rounded-2xl p-5 shadow-sm animate-fadeIn">
                  <strong className="text-sm font-bold text-[#1c3257] block mb-1">{title}</strong>
                  <p className="text-xs text-[#526177] leading-relaxed">{text}</p>
                </article>
              ))}
            </div>

            {session.summaryIdea === 0 && (
              <p className="text-xs text-[#748093] bg-white border border-[#dce2e6] p-4 rounded-2xl mt-4">
                Comenzaremos el resumen en un momento.
              </p>
            )}
          </div>
        )}

        {/* 18. STAGE: MINIQUIZ */}
        {session.stage === 'miniquiz' && (
          session.quizVisible ? (
            <StudentMiniquizView />
          ) : (
            <div className="max-w-md mx-auto w-full animate-fadeIn text-center py-8">
              <div className="bg-white border border-[#dce2e6] rounded-3xl p-8 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-[#12a1a4] block mb-2">
                  Miniquiz preparado
                </span>
                <h1 className="text-xl font-bold text-[#1c3257] mb-2">El miniquiz comenzará pronto</h1>
                <p className="text-xs text-[#748093]">
                  El miniquiz aparecerá cuando tu mentor lo indique.
                </p>
              </div>
            </div>
          )
        )}

        {/* 19. STAGE: RESULTS */}
        {session.stage === 'results' && (
          <div className="max-w-md mx-auto w-full animate-fadeIn text-center py-6">
            <div
              className={`p-8 rounded-3xl border shadow-sm ${
                session.miniScore === 3
                  ? 'bg-[#eaf4e8] border-[#badcb8] text-[#255e29]'
                  : session.miniScore >= 2
                  ? 'bg-[#eef9fa] border-[#b2e5e7] text-[#12a1a4]'
                  : 'bg-[#fff5ee] border-[#f5c49d] text-[#924814]'
              }`}
            >
              <div className="text-4xl font-black mb-2">
                {session.miniScore} / 3
              </div>
              <h1 className="text-2xl font-black mb-2">
                {session.miniScore === 3
                  ? 'Excelente trabajo'
                  : session.miniScore >= 2
                  ? 'Muy bien, aprobaste la clase'
                  : 'Sigamos aprendiendo'}
              </h1>
              <p className="text-xs sm:text-sm leading-relaxed">
                {session.miniScore === 3
                  ? 'Respondiste correctamente las tres preguntas.'
                  : session.miniScore >= 2
                  ? 'Ahora revisaremos juntos las respuestas.'
                  : 'Revisaremos algunas ideas y después haremos una comprobación breve.'}
              </p>
            </div>
          </div>
        )}

        {/* 20. STAGE: REVIEW */}
        {session.stage === 'review' && (
          <StudentQuizReviewView />
        )}

        {/* 21. STAGE: RECOVERY INTRO */}
        {session.stage === 'recoveryIntro' && (
          <div className="max-w-md mx-auto w-full animate-fadeIn text-center py-6">
            <div className="bg-white border border-[#dce2e6] rounded-3xl p-8 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#12a1a4] block mb-2">
                Refuerzo breve
              </span>
              <h1 className="text-2xl font-extrabold text-[#1c3257] mb-2">
                Volvamos a mirar estas ideas
              </h1>
              <p className="text-xs text-[#748093] leading-relaxed">
                Primero veremos una explicación y después responderás una pregunta breve.
              </p>
            </div>
          </div>
        )}

        {/* 22. STAGE: RECOVERY */}
        {session.stage === 'recovery' && (
          <StudentRecoveryView />
        )}

        {/* 23. STAGE: CLOSING & COMPLETED */}
        {(session.stage === 'closing' || session.stage === 'completed') && (
          <div className="max-w-md mx-auto w-full animate-fadeIn text-center my-auto py-6">
            <div className={`bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-slate-200/50 border ${theme.borderColor} text-center relative overflow-hidden transition-all duration-300`}>
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.accentGradient}`} />
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-500/20">
                <Check className="w-8 h-8" />
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.badgeText} block mb-1`}>
                Terminamos por hoy
              </span>
              <h1 className="text-2xl font-black text-[#1C3257] mb-2 tracking-tight">
                {session.miniScore === 3
                  ? 'Excelente trabajo'
                  : session.miniScore >= 2
                  ? 'Muy bien'
                  : 'Buen trabajo'}
              </h1>
              <p className="text-xs text-slate-500 mb-6">
                Completaste la clase de hoy con tu mentor.
              </p>
              <div className="bg-slate-50 text-[#1C3257] p-3.5 rounded-2xl text-xs font-bold border border-slate-200/70">
                Próxima clase: {lessonData.metadata.nextLessonTitle}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface SyncedStudentVideoProps {
  src?: string;
  kind: 'hook' | 'formal';
  session: any;
  title?: string;
}

const SyncedStudentVideo: React.FC<SyncedStudentVideoProps> = ({ src, kind, session, title }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || session.video.kind !== kind) return;
    if (Math.abs(v.currentTime - session.video.seek) > 1.2) {
      v.currentTime = session.video.seek;
    }
    if (session.video.playing) {
      v.play()
        .then(() => setBlocked(false))
        .catch(() => setBlocked(true));
    } else {
      v.pause();
    }
  }, [kind, session.video]);

  if (!src || src.trim() === '') {
    return (
      <div className="w-full aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-slate-800 shadow-2xl flex flex-col items-center justify-center p-8 text-center text-white relative">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 text-[#12A1A4] ring-1 ring-white/20">
          <Play className="w-8 h-8 fill-current ml-1 opacity-80" />
        </div>
        <h3 className="text-lg font-black tracking-tight mb-2">{title || 'Video de la lección'}</h3>
        <p className="text-xs text-slate-400 max-w-md">
          Sigue las indicaciones de tu mentor para este momento de aprendizaje.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl flex items-center justify-center relative">
      <video
        ref={ref}
        src={src}
        playsInline
        preload="auto"
        className="w-full h-full object-contain"
      />
      {blocked && (
        <button
          type="button"
          onClick={() => {
            if (ref.current) {
              ref.current.play();
              setBlocked(false);
            }
          }}
          className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 text-white cursor-pointer z-20"
        >
          <div className="w-16 h-16 rounded-full bg-[#ee751c] flex items-center justify-center shadow-xl">
            <Play className="w-8 h-8 fill-white ml-1" />
          </div>
          <span className="text-xs font-bold bg-[#1c3257] px-4 py-2 rounded-xl border border-white/20">
            Presiona para escuchar el video
          </span>
        </button>
      )}
    </div>
  );
};
