import React from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { StudentHeader } from './StudentHeader';
import { StudentInteractiveThermo } from './StudentInteractiveThermo';
import { StudentMiniquizView } from './StudentMiniquizView';
import { StudentRecoveryView } from './StudentRecoveryView';
import { Sparkles, CheckCircle2, Waves, ArrowDown, ArrowUp, Compass } from 'lucide-react';

export const StudentLessonView: React.FC = () => {
  const { session, lessonData, updateSession } = useLessonSync();

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
              Nuestra ruta de Matemática
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-6">Cuatro grandes bloques</h1>

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
                Hoy comenzamos con el Bloque 1: Números Enteros (Z)
              </span>
            </div>
          </div>
        )}

        {/* STAGE 2 (cont): SITUATION & REFERENCE (Thermometer) */}
        {(session.stage === 'situation' || session.stage === 'reference') && (
          <StudentInteractiveThermo />
        )}

        {/* STAGE 3: VIDEO (Hook Submarine) */}
        {session.stage === 'hook' && (
          <div className="max-w-2xl mx-auto w-full animate-fadeIn text-center">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              Desafío de Observación
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-6">
              El recorrido del submarino
            </h1>

            <div className="bg-[#10223d] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col items-center justify-center min-h-[360px] border border-[#233859]">
              <Waves className="w-16 h-16 text-[#12a1a4] mb-4 animate-bounce" />
              <h2 className="text-xl font-bold mb-2">Simulación del Submarino</h2>
              <p className="text-xs text-[#9ab1ce] max-w-sm mb-6 leading-relaxed">
                {session.hookStarted
                  ? 'Observa dónde inicia el submarino, cuánto desciende y cuánto vuelve a subir.'
                  : 'Esperando que el mentor inicie la reproducción del video...'}
              </p>

              {session.hookStarted && (
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 flex items-center gap-3 text-xs font-semibold text-[#12a1a4] animate-pulse">
                  <span className="w-3 h-3 rounded-full bg-[#12a1a4]" />
                  <span>Reproduciendo video interactivo...</span>
                </div>
              )}
            </div>
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
          <div className="max-w-2xl mx-auto w-full animate-fadeIn text-center">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              Formalización Matemática
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-6">
              Posición versus Movimiento
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#dce2e6] rounded-3xl p-6 shadow-sm">
                <span className="bg-[#e9f2f8] text-[#1c3257] font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider block mb-3">
                  Posición (¿Dónde está?)
                </span>
                <strong className="text-3xl text-[#1c3257] font-black block my-2">−20 m</strong>
                <p className="text-xs text-[#748093] leading-relaxed">
                  Indica un lugar fijo respecto al punto cero de referencia (la superficie).
                </p>
              </div>

              <div className="bg-white border border-[#dce2e6] rounded-3xl p-6 shadow-sm">
                <span className="bg-[#fff0e4] text-[#ee751c] font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider block mb-3">
                  Movimiento (¿Cómo cambia?)
                </span>
                <strong className="text-3xl text-[#ee751c] font-black block my-2 flex items-center justify-center gap-1">
                  <ArrowDown className="w-6 h-6" /> Baja 20 m
                </strong>
                <p className="text-xs text-[#748093] leading-relaxed">
                  Indica una acción, traslado o cambio de lugar respecto a su posición previa.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 5 (cont): IDEA */}
        {session.stage === 'idea' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn text-center">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              Comprobemos
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-6">
              El ascensor está en el piso −2 y después baja 3 pisos.
            </h1>

            <div className="bg-white border border-[#dce2e6] rounded-3xl p-8 shadow-sm flex flex-col items-center">
              <div className="flex items-center gap-4 text-base font-bold text-[#1c3257] mb-4">
                <span className="bg-[#1c3257] text-white px-4 py-2 rounded-xl">−2</span>
                <span className="text-[#748093]">→</span>
                <span className="bg-[#ee751c] text-white px-4 py-2 rounded-xl flex items-center gap-1">
                  Baja 3 pisos <ArrowDown className="w-4 h-4" />
                </span>
              </div>

              {session.feedback?.kind === 'success' && (
                <div className="bg-[#eaf4e8] text-[#255e29] border border-[#badcb8] rounded-2xl p-4 text-sm font-bold flex items-center justify-center gap-2 shadow-sm animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-[#255e29]" />
                  <span>−2 = Posición (ubicación fija) · Bajar 3 pisos = Movimiento (acción)</span>
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

        {/* STAGE 7 (cont): RESULTS */}
        {session.stage === 'results' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn text-center">
            {(() => {
              const passed = session.miniScore >= lessonData.quiz.passScoreMin;
              return (
                <div className={`p-8 rounded-3xl shadow-sm border ${
                  passed
                    ? 'bg-[#eaf4e8] border-[#badcb8] text-[#255e29]'
                    : 'bg-[#fff0e4] border-[#f5c49d] text-[#924814]'
                }`}>
                  <strong className="text-4xl font-black block mb-2">
                    {session.miniScore} / {lessonData.quiz.questions.length}
                  </strong>
                  <h1 className="text-2xl font-extrabold mb-2">
                    {passed ? '¡Lograste el mínimo de la clase!' : 'Revisemos algunas ideas'}
                  </h1>
                  <p className="text-sm leading-relaxed max-w-sm mx-auto">
                    {passed
                      ? 'Ahora revisarán brevemente las respuestas junto a tu mentor.'
                      : 'Equivocarse es parte natural del aprendizaje. Revisaremos los conceptos juntos.'}
                  </p>
                </div>
              );
            })()}
          </div>
        )}

        {/* STAGE 7 (cont): RECOVERY */}
        {session.stage === 'recovery' && (
          <StudentRecoveryView />
        )}

        {/* STAGE 8: CLOSING (Metacognición) */}
        {session.stage === 'closing' && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn text-center">
            <div className="w-16 h-16 rounded-full bg-[#12a1a4] text-white flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg">
              0
            </div>
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1">
              Cierre y Reflexión
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-4">
              ¿Para qué sirven el cero y los signos positivo y negativo en la vida real?
            </h1>
            <p className="text-xs text-[#748093]">
              Explícalo con tus propias palabras y ejemplos cotidianos a tu mentor.
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
              ¡Misión Completada!
            </span>
            <h1 className="text-3xl font-black text-[#1c3257] mb-3">¡Clase 1 Finalizada!</h1>
            <p className="text-sm text-[#657185] max-w-sm mx-auto mb-6 leading-relaxed">
              Hoy aprendiste a usar el cero como punto de referencia y a reconocer posiciones con números enteros.
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
