import React, { useRef, useState, useEffect } from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { StudentHeader } from './StudentHeader';
import { StudentInteractiveThermo } from './StudentInteractiveThermo';
import { StudentMiniquizView } from './StudentMiniquizView';
import { StudentQuizReviewView } from './StudentQuizReviewView';
import { StudentRecoveryView } from './StudentRecoveryView';
import {
  Sparkles,
  Check,
  CheckCircle2,
  CircleHelp,
  Thermometer,
  Waves,
  Building2,
  Banknote,
  ArrowRight,
  Play
} from 'lucide-react';

function marineAmbientActive(stage: string, hookStarted: boolean, hookEnded: boolean, formalStarted: boolean, formalEnded: boolean): boolean {
  if (['cover', 'prep'].includes(stage)) return true;
  if (['conversationIntro', 'preQuestions', 'postIntro', 'postQuestions', 'summary'].includes(stage)) return true;
  if (stage === 'hook') return !hookStarted || hookEnded;
  if (stage === 'formalization') return !formalStarted || formalEnded;
  return false;
}

export const StudentLessonView: React.FC = () => {
  const { session, lessonData, updateSession } = useLessonSync();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [blocked, setBlocked] = useState(false);

  const isAmbientActive = marineAmbientActive(
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
    if (isAmbientActive && soundOn) {
      player
        .play()
        .then(() => setBlocked(false))
        .catch(() => setBlocked(true));
    } else {
      player.pause();
      if (!isAmbientActive) player.currentTime = 0;
    }
  }, [isAmbientActive, soundOn]);

  const toggleSound = () => {
    if (soundOn && !blocked) {
      setSoundOn(false);
      return;
    }
    setSoundOn(true);
    const player = audioRef.current;
    if (player) {
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
    <div className="flex flex-col h-full min-h-[720px] bg-[#f5f4ef] rounded-2xl overflow-hidden border border-[#dce2e6] shadow-sm select-none">
      {/* Audio ambiental marino */}
      <audio ref={audioRef} src="/media/ambiente-submarino.mp3" loop preload="auto" />

      <StudentHeader
        soundActive={isAmbientActive}
        soundOn={soundOn && !blocked}
        onToggleSound={toggleSound}
      />

      <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-center max-w-4xl mx-auto w-full">
        {/* 1. STAGE: COVER & PREP (Waiting Room) */}
        {(session.stage === 'cover' || session.stage === 'prep') && (
          <div className="max-w-2xl mx-auto w-full text-center animate-fadeIn">
            <div className="relative rounded-3xl overflow-hidden bg-[#10223d] text-white shadow-xl min-h-[420px] flex flex-col items-center justify-center p-8 border border-[#233859]">
              <div
                className="absolute inset-0 opacity-40 bg-cover bg-center"
                style={{ backgroundImage: "url('/visuals/mision-portada.png')" }}
              />
              <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/40 text-center">
                <div className="flex items-center justify-center gap-2 text-[#12a1a4] font-bold text-xs uppercase tracking-widest mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#12a1a4] animate-ping" />
                  <span>Sala de Espera</span>
                </div>
                <h1 className="text-2xl font-extrabold text-[#1c3257] mb-2">
                  La clase comenzará pronto
                </h1>
                <p className="text-xs text-[#748093] leading-relaxed">
                  Tu mentor está preparando la sesión de hoy. Cuando comience, tu pantalla avanzará automáticamente.
                </p>
                <div className="mt-6 pt-4 border-t border-[#e2e8f0] text-left">
                  <span className="text-[10px] text-[#748093] font-bold uppercase tracking-wider block">
                    {lessonData.metadata.subject} · {lessonData.metadata.oaCode}
                  </span>
                  <strong className="text-sm text-[#1c3257] font-bold block mt-0.5">
                    {lessonData.metadata.lessonTitle}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. STAGE: ROUTE OVERVIEW (Cuatro grandes bloques) */}
        {session.stage === 'routeOverview' && (
          <div className="max-w-2xl mx-auto w-full animate-fadeIn py-4">
            <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-1 text-center">
              Nuestra ruta de Matemática
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-6 text-center">
              Cuatro grandes bloques
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <article className="bg-[#1c3257] text-white rounded-2xl p-5 shadow-sm min-h-[110px] flex flex-col justify-between">
                <span className="text-xs font-bold opacity-75">01</span>
                <div>
                  <h2 className="text-lg font-bold leading-tight mb-1">Números</h2>
                  <p className="text-xs opacity-90 leading-snug">Enteros, fracciones y decimales</p>
                </div>
              </article>
              <article className="bg-[#ee751c] text-white rounded-2xl p-5 shadow-sm min-h-[110px] flex flex-col justify-between">
                <span className="text-xs font-bold opacity-75">02</span>
                <div>
                  <h2 className="text-lg font-bold leading-tight mb-1">Álgebra</h2>
                  <p className="text-xs opacity-90 leading-snug">Patrones, relaciones y ecuaciones</p>
                </div>
              </article>
              <article className="bg-[#f8ad22] text-[#1c3257] rounded-2xl p-5 shadow-sm min-h-[110px] flex flex-col justify-between">
                <span className="text-xs font-bold opacity-75">03</span>
                <div>
                  <h2 className="text-lg font-bold leading-tight mb-1">Geometría</h2>
                  <p className="text-xs opacity-90 leading-snug">Formas, medidas y transformaciones</p>
                </div>
              </article>
              <article className="bg-[#12a1a4] text-white rounded-2xl p-5 shadow-sm min-h-[110px] flex flex-col justify-between">
                <span className="text-xs font-bold opacity-75">04</span>
                <div>
                  <h2 className="text-lg font-bold leading-tight mb-1">Datos y azar</h2>
                  <p className="text-xs opacity-90 leading-snug">Información, gráficos y probabilidades</p>
                </div>
              </article>
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
              Números enteros
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-white border border-[#dce2e6] rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#e6f7f7] text-[#12a1a4] flex items-center justify-center mb-3">
                  <Thermometer className="w-5 h-5" />
                </div>
                <strong className="text-sm font-bold text-[#1c3257] block mb-1">Temperaturas</strong>
                <span className="text-xs text-[#748093]">Comparadas con cero grados</span>
              </div>

              <div className="bg-white border border-[#dce2e6] rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#e9f2f8] text-[#1c3257] flex items-center justify-center mb-3">
                  <Waves className="w-5 h-5" />
                </div>
                <strong className="text-sm font-bold text-[#1c3257] block mb-1">Profundidades</strong>
                <span className="text-xs text-[#748093]">Comparadas con la superficie</span>
              </div>

              <div className="bg-white border border-[#dce2e6] rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#fff0e4] text-[#ee751c] flex items-center justify-center mb-3">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <strong className="text-sm font-bold text-[#1c3257] block mb-1">Posición y movimiento</strong>
                <span className="text-xs text-[#748093]">Dónde está y cómo cambia</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#526177] max-w-lg mx-auto leading-relaxed bg-white border border-[#dce2e6] p-4 rounded-2xl">
              Aprenderemos a representar ubicaciones y a explicar cómo llegamos a una respuesta.
            </p>
          </div>
        )}

        {/* 4. STAGE: THERMO & THERMO MEANING */}
        {(session.stage === 'thermo' || session.stage === 'thermoMeaning') && (
          <StudentInteractiveThermo />
        )}

        {/* 5. STAGE: HOOK (Video Submarino) */}
        {session.stage === 'hook' && (
          <div className="max-w-3xl mx-auto w-full animate-fadeIn text-center">
            {!session.hookStarted ? (
              <div className="relative rounded-3xl overflow-hidden bg-[#10223d] text-white shadow-xl min-h-[400px] flex flex-col items-center justify-center p-8 border border-[#233859]">
                <div
                  className="absolute inset-0 opacity-40 bg-cover bg-center"
                  style={{ backgroundImage: "url('/visuals/mision-portada.png')" }}
                />
                <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/40 text-left">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#12a1a4] block mb-2">
                    El recorrido del submarino
                  </span>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#1c3257] mb-4">
                    Mientras observas, fíjate en…
                  </h1>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#334157] font-semibold">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#12a1a4] text-white text-[11px] flex items-center justify-center font-bold">1</span>
                      <span>Dónde comienza.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#12a1a4] text-white text-[11px] flex items-center justify-center font-bold">2</span>
                      <span>Cuánto baja.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#12a1a4] text-white text-[11px] flex items-center justify-center font-bold">3</span>
                      <span>Cuánto sube.</span>
                    </li>
                  </ul>
                  <p className="text-[11px] text-[#748093] mt-6 pt-3 border-t border-[#e2e8f0]">
                    El video se reproducirá cuando tu mentor lo indique.
                  </p>
                </div>
              </div>
            ) : !session.hookEnded ? (
              <SyncedStudentVideo src={lessonData.hook.videoSrc} kind="hook" session={session} />
            ) : (
              <div className="relative rounded-3xl overflow-hidden bg-[#10223d] text-white shadow-xl min-h-[380px] flex flex-col items-center justify-center p-8 border border-[#233859]">
                <div
                  className="absolute inset-0 opacity-40 bg-cover bg-center"
                  style={{ backgroundImage: "url('/visuals/submarino-20.png')" }}
                />
                <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/40 text-center">
                  <h1 className="text-2xl font-extrabold text-[#1c3257] mb-2">El recorrido continúa</h1>
                  <p className="text-xs sm:text-sm text-[#526177] leading-relaxed">
                    Ahora comprenderemos la información del video junto a tu mentor.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 6. STAGE: CONVERSATION INTRO */}
        {session.stage === 'conversationIntro' && (
          <div className="max-w-2xl mx-auto w-full animate-fadeIn text-center">
            <div className="relative rounded-3xl overflow-hidden bg-[#10223d] text-white shadow-xl min-h-[380px] flex flex-col items-center justify-center p-8 border border-[#233859]">
              <div
                className="absolute inset-0 opacity-40 bg-cover bg-center"
                style={{ backgroundImage: "url('/visuals/submarino-20.png')" }}
              />
              <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/40 text-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#12a1a4] block mb-2">
                  Comprendamos el recorrido
                </span>
                <h1 className="text-2xl font-extrabold text-[#1c3257] mb-2">Pensemos juntos</h1>
                <p className="text-xs sm:text-sm text-[#526177] leading-relaxed">
                  Primero identificaremos el punto de referencia y la posición inicial.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 7. STAGE: PRE QUESTIONS */}
        {session.stage === 'preQuestions' && (
          <div className="max-w-2xl mx-auto w-full animate-fadeIn text-center">
            <div className="relative rounded-3xl overflow-hidden bg-[#10223d] text-white shadow-xl min-h-[420px] flex flex-col items-center justify-center p-8 border border-[#233859]">
              <div
                className="absolute inset-0 opacity-40 bg-cover bg-center"
                style={{ backgroundImage: "url('/visuals/submarino-20.png')" }}
              />
              <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-white/40 text-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#12a1a4] block mb-2">
                  Pregunta {session.conversationIndex + 1} de 2
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1c3257] mb-4">
                  {currentPreItem.question}
                </h1>

                {session.feedback?.kind === 'support' && (
                  <div className="bg-[#fff9f0] border border-[#f5c49d] text-[#794112] p-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 mb-4 animate-fadeIn">
                    <CircleHelp className="w-4 h-4 text-[#ee751c]" />
                    <span>¡Presta atención a la pista que te dará tu mentor!</span>
                  </div>
                )}

                {(session.feedback?.kind === 'success' || session.feedback?.kind === 'reveal') && (
                  <div className="bg-[#eaf4e8] border border-[#badcb8] text-[#255e29] p-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm animate-fadeIn">
                    <Sparkles className="w-5 h-5 text-[#255e29]" />
                    <span>{currentPreItem.studentReveal}</span>
                  </div>
                )}

                {!session.feedback && (
                  <p className="text-xs text-[#748093] mt-4">
                    Responde en voz alta a tu mentor.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 8. STAGE: FORMALIZATION (Video Explicativo) */}
        {session.stage === 'formalization' && (
          <div className="max-w-3xl mx-auto w-full animate-fadeIn text-center">
            {!session.formalStarted ? (
              <div className="relative rounded-3xl overflow-hidden bg-[#10223d] text-white shadow-xl min-h-[400px] flex flex-col items-center justify-center p-8 border border-[#233859]">
                <div
                  className="absolute inset-0 opacity-40 bg-cover bg-center"
                  style={{ backgroundImage: "url('/visuals/posicion-movimiento.png')" }}
                />
                <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/40 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#12a1a4] block mb-2">
                    Ahora aprenderemos
                  </span>
                  <h1 className="text-2xl font-extrabold text-[#1c3257] mb-2">
                    Posición y movimiento
                  </h1>
                  <p className="text-xs sm:text-sm text-[#526177] leading-relaxed">
                    Dónde se encuentra algo y cómo cambia de lugar.
                  </p>
                </div>
              </div>
            ) : !session.formalEnded ? (
              <SyncedStudentVideo src={lessonData.formalization.videoSrc ?? ''} kind="formal" session={session} />
            ) : (
              <div className="relative rounded-3xl overflow-hidden bg-[#10223d] text-white shadow-xl min-h-[380px] flex flex-col items-center justify-center p-8 border border-[#233859]">
                <div
                  className="absolute inset-0 opacity-40 bg-cover bg-center"
                  style={{ backgroundImage: "url('/visuals/posicion-movimiento.png')" }}
                />
                <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/40 text-center">
                  <h1 className="text-2xl font-extrabold text-[#1c3257] mb-2">Posición y movimiento</h1>
                  <p className="text-xs sm:text-sm text-[#526177] leading-relaxed">
                    Ahora comprobaremos lo aprendido con dos preguntas.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 9. STAGE: POST INTRO */}
        {session.stage === 'postIntro' && (
          <div className="max-w-2xl mx-auto w-full animate-fadeIn text-center">
            <div className="relative rounded-3xl overflow-hidden bg-[#10223d] text-white shadow-xl min-h-[380px] flex flex-col items-center justify-center p-8 border border-[#233859]">
              <div
                className="absolute inset-0 opacity-40 bg-cover bg-center"
                style={{ backgroundImage: "url('/visuals/posicion-movimiento.png')" }}
              />
              <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/40 text-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#12a1a4] block mb-2">
                  Comprobemos lo aprendido
                </span>
                <h1 className="text-2xl font-extrabold text-[#1c3257] mb-2">Posición y movimiento</h1>
                <p className="text-xs sm:text-sm text-[#526177] leading-relaxed">
                  Responderemos dos preguntas sobre el video.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 10. STAGE: POST QUESTIONS */}
        {session.stage === 'postQuestions' && (
          <div className="max-w-2xl mx-auto w-full animate-fadeIn text-center">
            <div className="relative rounded-3xl overflow-hidden bg-[#10223d] text-white shadow-xl min-h-[420px] flex flex-col items-center justify-center p-8 border border-[#233859]">
              <div
                className="absolute inset-0 opacity-40 bg-cover bg-center"
                style={{ backgroundImage: "url('/visuals/posicion-movimiento.png')" }}
              />
              <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-white/40 text-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#12a1a4] block mb-2">
                  Pregunta {session.postIndex + 1} de 2
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1c3257] mb-4">
                  {currentPostItem.question}
                </h1>

                {session.feedback?.kind === 'support' && (
                  <div className="bg-[#fff9f0] border border-[#f5c49d] text-[#794112] p-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 mb-4 animate-fadeIn">
                    <CircleHelp className="w-4 h-4 text-[#ee751c]" />
                    <span>¡Presta atención a la pista que te dará tu mentor!</span>
                  </div>
                )}

                {(session.feedback?.kind === 'success' || session.feedback?.kind === 'reveal') && (
                  <div className="bg-[#eaf4e8] border border-[#badcb8] text-[#255e29] p-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm animate-fadeIn">
                    <Sparkles className="w-5 h-5 text-[#255e29]" />
                    <span>{currentPostItem.studentReveal}</span>
                  </div>
                )}

                {!session.feedback && (
                  <p className="text-xs text-[#748093] mt-4">
                    Responde en voz alta a tu mentor.
                  </p>
                )}
              </div>
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
              Posición y movimiento
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <article className="bg-white border-2 border-[#1c3257] rounded-3xl p-6 shadow-sm flex flex-col justify-between text-left">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#12a1a4] block mb-2">
                  POSICIÓN
                </span>
                <b className="text-base sm:text-lg font-bold text-[#1c3257] block mb-2">
                  Dónde se encuentra
                </b>
                <strong className="text-xl sm:text-2xl font-black text-[#1c3257] block mt-4 bg-[#f0f4f8] p-3 rounded-xl text-center">
                  −20 m
                </strong>
              </article>

              <article className="bg-white border-2 border-[#ee751c] rounded-3xl p-6 shadow-sm flex flex-col justify-between text-left">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#ee751c] block mb-2">
                  MOVIMIENTO
                </span>
                <b className="text-base sm:text-lg font-bold text-[#1c3257] block mb-2">
                  Cómo cambia de lugar
                </b>
                <strong className="text-base sm:text-lg font-bold text-[#ee751c] block mt-4 bg-[#fff5ee] p-3 rounded-xl text-center">
                  Baja 15 m · Sube 8 m
                </strong>
              </article>
            </div>
          </div>
        )}

        {/* 12. STAGE: PRACTICE INTRO */}
        {session.stage === 'practiceIntro' && (() => {
          const items = [
            { icon: <Thermometer className="w-8 h-8 text-[#12a1a4]" />, title: 'Temperatura', text: 'Primera situación' },
            { icon: <Building2 className="w-8 h-8 text-[#1c3257]" />, title: 'Ascensor', text: 'Segunda situación' },
            { icon: <Banknote className="w-8 h-8 text-[#ee751c]" />, title: 'Saldo de una cuenta', text: 'Última situación' }
          ];
          const cur = items[session.practiceIndex] ?? items[0];

          return (
            <div className="max-w-xl mx-auto w-full animate-fadeIn text-center py-4">
              <div className="bg-white border border-[#dce2e6] rounded-3xl p-8 shadow-sm flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center mb-4">
                  {cur.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#12a1a4] block mb-1">
                  {cur.text}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-3">
                  {cur.title}
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
              Situación {session.practiceIndex + 1} de 3 · {currentPracticeItem.context}
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1c3257] mb-6">
              {currentPracticeItem.question}
            </h1>

            <div className="bg-white border border-[#dce2e6] rounded-3xl p-8 shadow-sm">
              {session.feedback?.kind === 'support' && (
                <div className="bg-[#fff9f0] border border-[#f5c49d] text-[#794112] p-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 mb-4 animate-fadeIn">
                  <CircleHelp className="w-4 h-4 text-[#ee751c]" />
                  <span>¡Presta atención a la pista que te dará tu mentor!</span>
                </div>
              )}

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
                ? 'Una misma señal puede comunicar ideas distintas'
                : '¿El signo negativo significa lo mismo?'}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <article className="bg-white border border-[#dce2e6] rounded-3xl p-6 shadow-sm text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#12a1a4] block mb-1">
                  TEMPERATURA
                </span>
                <strong className="text-2xl font-black text-[#1c3257] block mb-1">−4 °C</strong>
                <p className="text-xs text-[#748093]">Cuatro grados bajo cero</p>
              </article>

              <article className="bg-white border border-[#dce2e6] rounded-3xl p-6 shadow-sm text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ee751c] block mb-1">
                  CUENTA BANCARIA
                </span>
                <strong className="text-2xl font-black text-[#1c3257] block mb-1">−$4.000</strong>
                <p className="text-xs text-[#748093]">Un saldo negativo</p>
              </article>
            </div>

            {session.stage === 'reasoningIntro' ? (
              <p className="text-xs text-[#748093] bg-white border border-[#dce2e6] p-4 rounded-2xl">
                Escucha la indicación antes de responder.
              </p>
            ) : (
              <div className="bg-white border border-[#dce2e6] rounded-3xl p-6 shadow-sm">
                <p className="text-sm sm:text-base font-bold text-[#1c3257] mb-4">
                  Explica con tus palabras qué representa el signo negativo en cada situación.
                </p>

                {session.feedback?.kind === 'support' && (
                  <div className="bg-[#fff9f0] border border-[#f5c49d] text-[#794112] p-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn">
                    <CircleHelp className="w-4 h-4 text-[#ee751c]" />
                    <span>¡Presta atención a la pista que te dará tu mentor!</span>
                  </div>
                )}

                {session.feedback?.kind === 'success' && (
                  <div className="bg-[#eaf4e8] border border-[#badcb8] text-[#255e29] p-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 animate-fadeIn">
                    <Sparkles className="w-5 h-5 text-[#255e29]" />
                    <span>¡Muy bien! El significado depende del contexto.</span>
                  </div>
                )}

                {session.feedback?.kind === 'reveal' && (
                  <div className="bg-[#f8fafc] border border-[#dce2e6] text-[#334157] p-4 rounded-2xl text-xs sm:text-sm text-left animate-fadeIn">
                    En la temperatura indica cuatro grados bajo cero; en la cuenta indica una deuda de cuatro mil pesos.
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
              Posición y movimiento
            </h1>

            <div className="bg-white border border-[#dce2e6] rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-center gap-4 text-xl sm:text-2xl font-black text-[#1c3257] mb-6">
                <span className="bg-[#e6f7f7] px-4 py-2 rounded-xl text-[#12a1a4]">−2 °C</span>
                <ArrowRight className="w-6 h-6 text-[#ee751c]" />
                <span className="bg-[#fff0e4] px-4 py-2 rounded-xl text-[#ee751c]">sube 5 grados</span>
              </div>

              <p className="text-sm font-bold text-[#1c3257] mb-4">
                ¿Qué parte representa una posición y qué parte representa un movimiento?
              </p>

              {session.feedback?.kind === 'success' && (
                <div className="bg-[#eaf4e8] border border-[#badcb8] text-[#255e29] p-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 animate-fadeIn">
                  <Sparkles className="w-5 h-5 text-[#255e29]" />
                  <span>¡Muy bien explicado!</span>
                </div>
              )}

              {session.feedback?.kind === 'support' && (
                <div className="bg-[#f8fafc] border border-[#dce2e6] text-[#334157] p-4 rounded-2xl text-xs sm:text-sm text-left animate-fadeIn">
                  <b>−2 °C</b> es la posición inicial. <b>Sube cinco grados</b> es el movimiento.
                </div>
              )}
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
              Cómo analizar una situación
            </h1>

            <div className="space-y-3 text-left">
              <article className="bg-white border border-[#dce2e6] rounded-2xl p-5 shadow-sm flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-[#12a1a4] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-sm font-bold text-[#1c3257] block mb-0.5">Identifica</strong>
                  <p className="text-xs text-[#526177]">¿Cuál es el punto de referencia?</p>
                </div>
              </article>

              <article className="bg-white border border-[#dce2e6] rounded-2xl p-5 shadow-sm flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-[#ee751c] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-sm font-bold text-[#1c3257] block mb-0.5">Interpreta</strong>
                  <p className="text-xs text-[#526177]">¿Qué indica el signo en este contexto?</p>
                </div>
              </article>

              <article className="bg-white border border-[#dce2e6] rounded-2xl p-5 shadow-sm flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-[#1c3257] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-sm font-bold text-[#1c3257] block mb-0.5">Distingue</strong>
                  <p className="text-xs text-[#526177]">¿Dice dónde se encuentra algo o cómo cambia?</p>
                </div>
              </article>
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
                  El miniquiz aparecerá cuando el adulto lo indique.
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
                  ? '¡Excelente trabajo!'
                  : session.miniScore >= 2
                  ? '¡Muy bien! Aprobaste la clase.'
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
          <div className="max-w-lg mx-auto w-full animate-fadeIn text-center py-6">
            <div className="relative rounded-3xl overflow-hidden bg-[#10223d] text-white shadow-xl min-h-[420px] flex flex-col items-center justify-center p-8 border border-[#233859]">
              <div
                className="absolute inset-0 opacity-40 bg-cover bg-center"
                style={{ backgroundImage: "url('/visuals/mision-cierre.png')" }}
              />
              <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/40 text-center">
                <div className="w-14 h-14 rounded-full bg-[#4a964e] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Check className="w-8 h-8" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#12a1a4] block mb-1">
                  Terminamos por hoy
                </span>
                <h1 className="text-2xl font-black text-[#1c3257] mb-2">
                  {session.miniScore === 3
                    ? '¡Excelente trabajo!'
                    : session.miniScore >= 2
                    ? '¡Muy bien!'
                    : '¡Buen trabajo!'}
                </h1>
                <p className="text-xs text-[#526177] mb-4">
                  Completaste la clase de hoy con tu mentor.
                </p>
                <div className="bg-[#f0f4f8] text-[#1c3257] p-3.5 rounded-2xl text-xs font-bold border border-[#dce2e6]">
                  Próxima clase: {lessonData.metadata.nextLessonTitle}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface SyncedStudentVideoProps {
  src: string;
  kind: 'hook' | 'formal';
  session: any;
}

const SyncedStudentVideo: React.FC<SyncedStudentVideoProps> = ({ src, kind, session }) => {
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
