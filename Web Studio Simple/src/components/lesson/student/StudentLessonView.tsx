import React, { useRef, useState, useEffect } from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { StudentHeader } from './StudentHeader';
import { StudentInteractiveThermo } from './StudentInteractiveThermo';
import { StudentMiniquizView } from './StudentMiniquizView';
import { StudentQuizReviewView } from './StudentQuizReviewView';
import { StudentRecoveryView } from './StudentRecoveryView';
import { Sparkles, CheckCircle2, Waves, ArrowDown, ArrowUp, Compass, Play } from 'lucide-react';

export const StudentLessonView: React.FC = () => {
  const { session, lessonData, updateSession } = useLessonSync();
  const hookVideoRef = useRef<HTMLVideoElement | null>(null);
  const formalVideoRef = useRef<HTMLVideoElement | null>(null);
  const [hookAutoplayBlocked, setHookAutoplayBlocked] = useState(false);
  const [formalAutoplayBlocked, setFormalAutoplayBlocked] = useState(false);

  // Reproducción automática reactiva cuando el mentor presiona iniciar video en el Paso 2 (Gancho)
  useEffect(() => {
    if (session.stage === 'hook' && session.hookStarted && hookVideoRef.current) {
      const vid = hookVideoRef.current;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHookAutoplayBlocked(false);
          })
          .catch((err) => {
            console.warn('Autoplay bloqueado por política de audio del navegador:', err);
            setHookAutoplayBlocked(true);
          });
      }
    }
  }, [session.stage, session.hookStarted]);

  // Reproducción automática reactiva cuando el mentor presiona iniciar video en el Paso 4 (Formalización)
  useEffect(() => {
    if (session.stage === 'formalization' && session.formalStarted && formalVideoRef.current) {
      const vid = formalVideoRef.current;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setFormalAutoplayBlocked(false);
          })
          .catch((err) => {
            console.warn('Autoplay formalización bloqueado:', err);
            setFormalAutoplayBlocked(true);
          });
      }
    }
  }, [session.stage, session.formalStarted]);

  return (
    <div className="flex flex-col h-full min-h-[720px] bg-[#f5f4ef] rounded-2xl overflow-hidden border border-[#dce2e6] shadow-sm select-none">
      <StudentHeader />

      <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-center max-w-4xl mx-auto w-full">
        {/* STAGE 1: WAITING ROOM (cover & prep) */}
        {(session.stage === 'cover' || session.stage === 'prep') && (
          <div className="text-center py-12 flex flex-col items-center justify-center animate-fadeIn">
            {/* Animated Waiting Box (Zoom-like Waiting Room) */}
            <div className="bg-white border border-[#dce2e6] rounded-3xl p-8 sm:p-10 shadow-lg max-w-md w-full flex flex-col items-center">
              <div className="relative mb-6">
                <span className="w-16 h-16 rounded-full bg-[#12a1a4]/10 border border-[#12a1a4]/30 flex items-center justify-center text-[#12a1a4]">
                  <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
                </span>
                <span className="w-4 h-4 rounded-full bg-[#12a1a4] absolute -bottom-1 -right-1 border-2 border-white shadow-sm" />
              </div>

              <div className="flex items-center gap-2 text-[#12a1a4] font-bold text-xs uppercase tracking-widest mb-2">
                <span className="w-2 h-2 rounded-full bg-[#12a1a4] animate-ping" />
                <span>Sala de Espera Activa</span>
              </div>

              <h1 className="text-2xl font-extrabold text-[#1c3257] mb-2">La clase comenzará pronto</h1>
              <p className="text-xs text-[#748093] leading-relaxed max-w-xs mb-6">
                Tu mentor está preparando la sesión. La pantalla se actualizará automáticamente cuando inicie la clase.
              </p>

              <div className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-4 text-left">
                <span className="text-[10px] text-[#748093] font-bold uppercase tracking-wider block">Lección de hoy:</span>
                <strong className="text-sm text-[#1c3257] font-bold block mt-0.5">{lessonData.metadata.lessonTitle}</strong>
                <span className="text-xs text-[#12a1a4] font-semibold mt-1 block">
                  {lessonData.metadata.subject} · {lessonData.metadata.oaCode}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: ROUTE MAP */}
        {session.stage === 'route' && (
          <div className="max-w-2xl mx-auto w-full animate-fadeIn py-6">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              Ruta de Aprendizaje: {lessonData.metadata.subject}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-6">{lessonData.metadata.oaTitle}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lessonData.route.blocks.map((b) => {
                const colorClasses = {
                  navy: 'bg-[#1c3257] text-white',
                  orange: 'bg-[#ee751c] text-white',
                  yellow: 'bg-[#f8ad22] text-[#1c3257]',
                  teal: 'bg-[#12a1a4] text-white'
                };
                return (
                  <article
                    key={b.id}
                    className={`${colorClasses[b.color]} rounded-2xl p-5 shadow-sm min-h-[120px] flex flex-col justify-between`}
                  >
                    <span className="text-xs font-bold opacity-75">{b.number}</span>
                    <div>
                      <h2 className="text-xl font-bold leading-tight mb-1">{b.title}</h2>
                      <p className="text-xs opacity-90 leading-snug">{b.subtitle}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 bg-white border border-[#dce2e6] rounded-2xl p-4 flex items-center gap-3 shadow-sm">
              <Sparkles className="w-5 h-5 text-[#f8ad22]" />
              <span className="text-xs sm:text-sm font-bold text-[#1c3257]">
                Clase {lessonData.metadata.lessonNumber}: {lessonData.metadata.lessonTitle}
              </span>
            </div>
          </div>
        )}

        {/* STAGE 2 (cont): SITUATION & REFERENCE (Thermometer) */}
        {(session.stage === 'situation' || session.stage === 'reference') && (
          lessonData.metadata.subject === 'Matemática' &&
          lessonData.metadata.oaCode === 'OA 1' &&
          lessonData.metadata.lessonNumber === 1 ? (
            <StudentInteractiveThermo />
          ) : (
            <div className="max-w-xl mx-auto w-full animate-fadeIn text-center">
              <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
                {lessonData.metadata.subject} : {session.stage === 'situation' ? 'Situación Inicial' : 'Punto de Referencia'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-6">
                {session.stage === 'situation' ? 'Observa la situación inicial' : 'Punto de referencia y contexto'}
              </h1>

              <div className="bg-white border border-[#dce2e6] rounded-3xl p-8 shadow-sm text-left">
                {session.stage === 'situation' ? (
                  <>
                    <p className="text-base sm:text-lg font-semibold text-[#1c3257] leading-relaxed mb-6">
                      {lessonData.situation.dilePrompt}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {lessonData.situation.options.map((opt, i) => (
                        <div
                          key={i}
                          className="bg-[#f8fafc] border border-[#dce2e6] rounded-2xl p-4 text-center text-sm font-bold text-[#1c3257]"
                        >
                          {opt.label}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-base sm:text-lg font-semibold text-[#1c3257] leading-relaxed mb-4">
                      {lessonData.reference.question}
                    </p>
                    {session.feedback?.kind === 'success' ? (
                      <div className="bg-[#eaf4e8] text-[#255e29] border border-[#badcb8] rounded-2xl p-4 text-sm font-bold flex items-center justify-center gap-2 shadow-sm animate-fadeIn">
                        <CheckCircle2 className="w-5 h-5 text-[#255e29]" />
                        <span>{lessonData.reference.feedbackSuccess}</span>
                      </div>
                    ) : (
                      <p className="text-xs text-[#748093] text-center mt-2">
                        Escucha la pregunta de tu mentor y responde oralmente.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          )
        )}

        {/* STAGE 3: VIDEO (Hook Submarine) */}
        {session.stage === 'hook' && (
          <div className="max-w-4xl mx-auto w-full animate-fadeIn text-center">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              {lessonData.metadata.subject} : Desafío Inicial
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-4">
              {lessonData.metadata.lessonTitle}
            </h1>

            <div className="bg-[#10223d] rounded-3xl p-3 sm:p-5 text-white shadow-xl flex flex-col items-center justify-center min-h-[340px] border border-[#233859] relative">
              {lessonData.hook.videoSrc ? (
                <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black mb-3 shadow-2xl flex items-center justify-center relative">
                  {lessonData.hook.videoSrc.endsWith('.mp4') || lessonData.hook.videoSrc.includes('.mp4') || lessonData.hook.videoSrc.includes('r2.dev') ? (
                    <>
                      <video
                        ref={hookVideoRef}
                        src={lessonData.hook.videoSrc}
                        controls
                        playsInline
                        className="w-full h-full object-contain"
                        onPlay={() => {
                          updateSession({ hookStarted: true });
                          setHookAutoplayBlocked(false);
                        }}
                        onEnded={() => updateSession({ hookEnded: true })}
                      />
                      {hookAutoplayBlocked && (
                        <button
                          type="button"
                          onClick={() => {
                            if (hookVideoRef.current) {
                              hookVideoRef.current.play();
                              setHookAutoplayBlocked(false);
                            }
                          }}
                          className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 text-white cursor-pointer z-20 hover:bg-black/50 transition-all"
                        >
                          <div className="w-16 h-16 rounded-full bg-[#ee751c] flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 fill-white ml-1" />
                          </div>
                          <span className="text-xs font-bold bg-[#1c3257] px-4 py-2 rounded-xl border border-white/20">
                            Presiona aquí para iniciar el video
                          </span>
                        </button>
                      )}
                    </>
                  ) : (
                    <iframe
                      src={lessonData.hook.videoSrc}
                      title={lessonData.metadata.lessonTitle}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  )}
                </div>
              ) : (
                <>
                  <Compass className="w-16 h-16 text-[#12a1a4] mb-4 animate-spin" style={{ animationDuration: '12s' }} />
                  <h2 className="text-xl font-bold mb-2">Desafío de Observación</h2>
                  <p className="text-sm text-[#9ab1ce] max-w-md mb-6 leading-relaxed">
                    {session.hookStarted
                      ? (lessonData.hook.hazInstruction || lessonData.hook.dileIntro)
                      : 'Esperando que tu mentor inicie el desafío motivacional...'}
                  </p>
                </>
              )}

              {session.hookStarted && (
                <div className="bg-white/10 border border-white/20 rounded-2xl p-3 flex items-center gap-3 text-xs font-semibold text-[#12a1a4] animate-pulse">
                  <span className="w-3 h-3 rounded-full bg-[#12a1a4]" />
                  <span>{session.hookEnded ? 'Desafío completado' : 'Observando atentamente con tu mentor...'}</span>
                </div>
              )}
            </div>

            {session.hookEnded && lessonData.hook.dileAfterVideo && (
              <div className="mt-4 bg-white border border-[#dce2e6] rounded-2xl p-4 text-xs font-semibold text-[#1c3257] shadow-sm animate-fadeIn">
                {lessonData.hook.dileAfterVideo}
              </div>
            )}
          </div>
        )}

        {/* STAGE 4: CONVERSATION (Guided Socratic dialog) */}
        {session.stage === 'conversation' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn text-center">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              Pregunta {session.conversationIndex + 1} de {lessonData.conversation.items.length}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-6">
              {lessonData.conversation.items[session.conversationIndex].question}
            </h1>

            <div className="bg-white border border-[#dce2e6] rounded-3xl p-8 shadow-sm">
              <div className="text-sm text-[#748093] mb-4 font-semibold">
                Responde oralmente a tu mentor.
              </div>

              {session.feedback?.kind === 'success' && (
                <div className="bg-[#eaf4e8] text-[#255e29] border border-[#badcb8] rounded-2xl p-4 text-sm font-bold flex items-center justify-center gap-2 shadow-sm animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-[#255e29]" />
                  <span>{lessonData.conversation.items[session.conversationIndex].studentVisualPrompt}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STAGE 5: FORMALIZATION */}
        {session.stage === 'formalization' && (
          <div className="max-w-4xl mx-auto w-full animate-fadeIn text-center">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              {lessonData.metadata.subject} : Formalización Conceptual
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-4">
              {lessonData.metadata.lessonTitle}
            </h1>

            <div className="bg-white border border-[#dce2e6] rounded-3xl p-4 sm:p-6 shadow-sm text-left">
              {lessonData.formalization.videoSrc ? (
                <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black mb-6 shadow-md flex items-center justify-center relative">
                  {lessonData.formalization.videoSrc.endsWith('.mp4') || lessonData.formalization.videoSrc.includes('.mp4') || lessonData.formalization.videoSrc.includes('r2.dev') ? (
                    <>
                      <video
                        ref={formalVideoRef}
                        src={lessonData.formalization.videoSrc}
                        controls
                        playsInline
                        className="w-full h-full object-contain"
                        onPlay={() => {
                          updateSession({ formalStarted: true });
                          setFormalAutoplayBlocked(false);
                        }}
                        onEnded={() => updateSession({ formalEnded: true })}
                      />
                      {formalAutoplayBlocked && (
                        <button
                          type="button"
                          onClick={() => {
                            if (formalVideoRef.current) {
                              formalVideoRef.current.play();
                              setFormalAutoplayBlocked(false);
                            }
                          }}
                          className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 text-white cursor-pointer z-20 hover:bg-black/50 transition-all"
                        >
                          <div className="w-16 h-16 rounded-full bg-[#ee751c] flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 fill-white ml-1" />
                          </div>
                          <span className="text-xs font-bold bg-[#1c3257] px-4 py-2 rounded-xl border border-white/20">
                            Presiona aquí para iniciar el video
                          </span>
                        </button>
                      )}
                    </>
                  ) : (
                    <iframe
                      src={lessonData.formalization.videoSrc}
                      title="Formalización Conceptual"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  )}
                </div>
              ) : null}

              <span className="bg-[#e9f2f8] text-[#1c3257] font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-4">
                Concepto Central
              </span>
              <p className="text-base sm:text-lg font-bold text-[#1c3257] leading-relaxed mb-4">
                {lessonData.formalization.hazInstruction || lessonData.formalization.dileIntro}
              </p>
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-4 text-xs sm:text-sm text-[#526177] leading-relaxed max-w-lg mx-auto">
                {lessonData.formalization.dileIntro}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 5 (cont): IDEA */}
        {session.stage === 'idea' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn text-center">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              {lessonData.metadata.subject} : Comprobemos la Idea Central
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-6">
              {lessonData.idea.checkQuestion}
            </h1>

            <div className="bg-white border border-[#dce2e6] rounded-3xl p-8 shadow-sm flex flex-col items-center">
              <p className="text-xs text-[#748093] mb-4 font-semibold">
                Explica tu respuesta a tu mentor antes de avanzar.
              </p>

              {session.feedback?.kind === 'success' && (
                <div className="bg-[#eaf4e8] text-[#255e29] border border-[#badcb8] rounded-2xl p-4 text-sm font-bold flex items-center justify-center gap-2 shadow-sm animate-fadeIn w-full">
                  <CheckCircle2 className="w-5 h-5 text-[#255e29] shrink-0" />
                  <span>{lessonData.idea.expectedAnswer}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STAGE 6: PRACTICE (3 scenarios) */}
        {session.stage === 'practice' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn text-center">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              Practiquemos Juntos · Situación {session.practiceIndex + 1} de {lessonData.practice.items.length}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#748093] mb-4">
              {lessonData.practice.items[session.practiceIndex].contextName}
            </h1>

            <div className="bg-white border border-[#dce2e6] rounded-3xl p-8 shadow-sm">
              <p className="text-lg sm:text-xl font-bold text-[#1c3257] leading-relaxed mb-6">
                {lessonData.practice.items[session.practiceIndex].prompt}
              </p>

              {session.feedback?.kind === 'success' ? (
                <div className="bg-[#eaf4e8] text-[#255e29] border border-[#badcb8] rounded-2xl p-4 text-sm font-bold flex items-center justify-center gap-2 shadow-sm animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-[#255e29]" />
                  <span>¡Excelente! Respuesta correcta.</span>
                </div>
              ) : (
                <div className="text-xs text-[#748093] font-semibold">
                  Responde a tu mentor para avanzar.
                </div>
              )}
            </div>
          </div>
        )}

        {/* STAGE 7: MINIQUIZ */}
        {session.stage === 'miniquiz' && (
          <StudentMiniquizView />
        )}

        {/* STAGE 7 (cont): RESULTS / REVIEW */}
        {session.stage === 'results' && (
          <StudentQuizReviewView />
        )}

        {/* STAGE 7 (cont): RECOVERY */}
        {session.stage === 'recovery' && (
          <StudentRecoveryView />
        )}

        {/* STAGE 8: CLOSING (Metacognición) */}
        {session.stage === 'closing' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn text-center">
            <div className="w-16 h-16 rounded-full bg-[#12a1a4] text-white flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg">
              <Sparkles className="w-8 h-8" />
            </div>
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              Cierre y Reflexión : {lessonData.metadata.subject}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-4">
              {lessonData.closing.metacognitionQuestion}
            </h1>
            <p className="text-xs text-[#748093] max-w-md mx-auto">
              {lessonData.closing.transferQuestion}
            </p>
          </div>
        )}

        {/* STAGE 8 (cont): COMPLETED */}
        {session.stage === 'completed' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn text-center py-6">
            <div className="w-20 h-20 rounded-full bg-[#4a964e] text-white flex items-center justify-center mx-auto mb-4 shadow-xl">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <span className="text-[#4a964e] font-bold text-xs uppercase tracking-widest block mb-1">
              Misión Completada
            </span>
            <h1 className="text-3xl font-black text-[#1c3257] mb-3">
              Clase {lessonData.metadata.lessonNumber} Finalizada
            </h1>
            <p className="text-sm text-[#657185] max-w-sm mx-auto mb-6 leading-relaxed">
              {lessonData.closing.dileFinalCelebration}
            </p>
            <div className="bg-[#e9f2f8] border border-[#bcd6ea] text-[#1c3257] p-4 rounded-2xl text-xs font-bold inline-block">
              Próxima clase: {lessonData.metadata.nextLessonTitle}
            </div>
          </div>
        )}

        {/* STAGE 8 (cont): PAUSED */}
        {session.stage === 'paused' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn text-center py-6">
            <span className="text-[#ee751c] font-bold text-xs uppercase tracking-widest block mb-1">
              Sesión guardada
            </span>
            <h1 className="text-3xl font-black text-[#1c3257] mb-3">Buen trabajo por hoy</h1>
            <p className="text-sm text-[#748093] max-w-sm mx-auto leading-relaxed">
              Tu esfuerzo ha quedado registrado. La próxima sesión continuaremos practicando paso a paso.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
