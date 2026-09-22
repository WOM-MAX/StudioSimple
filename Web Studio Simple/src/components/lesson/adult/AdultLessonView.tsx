import React, { useRef, useState, useEffect } from 'react';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { AdultSidebar } from './AdultSidebar';
import { AdultHeader } from './AdultHeader';
import {
  PromptBox,
  PrivateBox,
  EmotionalTipBox,
  SocraticTipBox,
  ExpectedAnswerBox,
  FeedbackBanner
} from '../common/Cards';
import { GuidedItem } from '../../../types/lesson';
import {
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Play,
  Pause,
  RotateCcw,
  Rewind,
  FastForward,
  Check,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Clock,
  HelpCircle,
  Info
} from 'lucide-react';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export const AdultLessonView: React.FC = () => {
  const { session, lessonData, updateSession, setStage, setFeedback } = useLessonSync();

  const handleSupport = (text: string) => {
    updateSession({ feedback: { kind: 'support', text }, attempt: 1, supportCount: session.supportCount + 1 });
  };

  const handleSuccess = (text: string) => {
    updateSession({ feedback: { kind: 'success', text } });
  };

  const handleReveal = (text: string) => {
    updateSession({ feedback: { kind: 'reveal', text }, attempt: 2 });
  };

  const startVideo = (kind: 'hook' | 'formal') => {
    updateSession({
      hookStarted: kind === 'hook' ? true : session.hookStarted,
      hookEnded: kind === 'hook' ? false : session.hookEnded,
      formalStarted: kind === 'formal' ? true : session.formalStarted,
      formalEnded: kind === 'formal' ? false : session.formalEnded,
      video: { kind, playing: true, seek: 0, command: session.video.command + 1 }
    });
  };

  const currentPreItem = lessonData.preQuestions[session.conversationIndex] ?? lessonData.preQuestions[0];
  const currentPostItem = lessonData.postQuestions[session.postIndex] ?? lessonData.postQuestions[0];
  const currentPracticeItem = lessonData.practice[session.practiceIndex] ?? lessonData.practice[0];

  return (
    <div className="flex h-full min-h-[720px] bg-[#f5f4ef] rounded-2xl overflow-hidden border border-[#dce2e6] shadow-sm">
      {/* 8-step Left Sidebar */}
      <AdultSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f5f4ef]">
        <AdultHeader />

        <div className="flex-1 p-6 md:p-8 overflow-y-auto max-w-4xl mx-auto w-full">
          {/* 1. STAGE: COVER */}
          {session.stage === 'cover' && (
            <div className="text-center py-10 flex flex-col items-center justify-center min-h-[500px]">
              <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-2">
                {lessonData.metadata.subject} · {lessonData.metadata.oaCode}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#1c3257] mb-2 tracking-tight">
                {lessonData.metadata.oaTitle}
              </h1>
              <h2 className="text-xl text-[#526177] font-semibold mb-4">
                {lessonData.metadata.lessonTitle}
              </h2>
              <div className="flex items-center gap-2 text-sm text-[#748093] mb-8 bg-white px-4 py-2 rounded-full border border-[#dce2e6]">
                <Clock className="w-4 h-4 text-[#ee751c]" />
                <span>Clase {lessonData.metadata.lessonNumber} de {lessonData.metadata.totalLessonsInOa} · 30–35 minutos</span>
              </div>

              <button
                type="button"
                onClick={() => setStage('prep')}
                className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Comenzar clase</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <details className="mt-6 text-left max-w-md text-xs text-[#667386] bg-white p-3 rounded-xl border border-[#e2e8f0]">
                <summary className="cursor-pointer font-semibold text-[#1c3257] flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-[#12a1a4]" />
                  ¿Qué ocurrirá al presionar este botón?
                </summary>
                <p className="mt-2 leading-relaxed">
                  Este botón abre únicamente tu preparación privada. La pantalla del estudiante continuará en espera.
                </p>
              </details>
            </div>
          )}

          {/* 2. STAGE: PREP */}
          {session.stage === 'prep' && (
            <div className="animate-fadeIn max-w-2xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3257] mb-5">
                Antes de comenzar
              </h1>

              <div className="flex flex-col items-center space-y-2 mb-6">
                {/* 1. TU OBJETIVO */}
                <div className="w-full bg-white border-l-4 border-l-[#38a169] p-5 rounded-2xl shadow-sm">
                  <strong className="text-[#38a169] text-xs uppercase tracking-wider font-bold block mb-2">
                    TU OBJETIVO
                  </strong>
                  <p className="text-[#2d3748] text-xs sm:text-sm leading-relaxed font-normal">
                    {lessonData.prep.adultObjective}
                  </p>
                </div>

                <div className="flex justify-center text-[#a0aec0] py-0.5">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>

                {/* 2. RUTA DE HOY */}
                <div className="w-full bg-white border-l-4 border-l-[#dd6b20] p-5 rounded-2xl shadow-sm">
                  <strong className="text-[#dd6b20] text-xs uppercase tracking-wider font-bold block mb-2">
                    RUTA DE HOY
                  </strong>
                  <p className="text-[#2d3748] text-xs sm:text-sm leading-relaxed font-normal">
                    {lessonData.prep.routeToday}
                  </p>
                </div>

                <div className="flex justify-center text-[#a0aec0] py-0.5">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>

                {/* 3. ¡RECUERDA! */}
                <div className="w-full bg-white border-l-4 border-l-[#d69e2e] p-5 rounded-2xl shadow-sm">
                  <strong className="text-[#b7791f] text-xs uppercase tracking-wider font-bold block mb-2">
                    ¡RECUERDA!
                  </strong>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-[#2d3748] leading-relaxed">
                    {(lessonData.prep.reminders ?? []).map((reminder, idx) => (
                      <li key={idx} className="pl-1">
                        {reminder}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setStage('routeOverview')}
                  className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 text-sm shadow-md hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <span>Comenzar con el estudiante</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 3. STAGE: ROUTE OVERVIEW */}
          {session.stage === 'routeOverview' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-4">Nuestra ruta de Matemática</h1>
              <PrivateBox>
                Los títulos orientan la clase. Lee en voz alta solamente lo que aparezca en los recuadros DILE o PREGÚNTALE.
              </PrivateBox>
              <PromptBox label="DILE">
                {lessonData.route.dileIntro}
              </PromptBox>
              <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                <button
                  type="button"
                  onClick={() => setStage('routeToday')}
                  className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Conozcamos el primer tema</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 4. STAGE: ROUTE TODAY */}
          {session.stage === 'routeToday' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-4">La clase de hoy</h1>
              <PromptBox label="DILE">
                {lessonData.route.dileObjective}
              </PromptBox>
              <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                <button
                  type="button"
                  onClick={() => setStage('thermo')}
                  className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Comencemos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 5. STAGE: THERMO */}
          {session.stage === 'thermo' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-2">El cero como punto de referencia</h1>
              <div className="text-xs text-[#64748b] bg-white p-3 rounded-xl border border-[#dce2e6] mb-4">
                <strong>AYUDA DE LECTURA:</strong> 0 °C se lee “cero grados Celsius”. · 3 °C se lee “tres grados Celsius”. · +3 °C se lee “más tres grados Celsius”.
              </div>
              <PromptBox label="DILE">
                {lessonData.situation.dilePrompt}
              </PromptBox>
              <ExpectedAnswerBox>
                {lessonData.situation.expectedAnswer}
              </ExpectedAnswerBox>
              <div className="text-xs text-[#64748b] bg-white p-2.5 rounded-xl border border-[#dce2e6] mb-4">
                <strong>AYUDA DE LECTURA:</strong> −3 se lee “menos tres”.
              </div>

              <FeedbackBanner feedback={session.feedback} />

              {!session.feedback && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-[#1c3257] uppercase tracking-wider mb-2">
                    ¿Qué respondió el estudiante?
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => handleSuccess('¡Correcto! El número entero que representa esa temperatura es −3.')}
                      className="text-left bg-white hover:bg-[#eefafb] border border-[#b8c4d0] hover:border-[#12a1a4] rounded-xl p-3.5 text-xs font-semibold text-[#1c3257] transition-all shadow-sm cursor-pointer"
                    >
                      Respondió −3
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSupport('Estuviste cerca. El número 3 está correcto porque indica la cantidad de grados, pero falta el signo que indica que la temperatura está bajo cero. ¿Recuerdas qué signo utilizamos para representar una cantidad bajo cero?')}
                      className="text-left bg-white hover:bg-[#fff9f0] border border-[#f5c49d] rounded-xl p-3.5 text-xs font-semibold text-[#794112] transition-all shadow-sm cursor-pointer"
                    >
                      Respondió 3
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSupport('Vamos paso a paso. El número 3 indica la cantidad de grados. Como la temperatura está bajo cero necesitamos el signo que representa una cantidad bajo cero. ¿Cuál es ese signo?')}
                      className="text-left bg-white hover:bg-[#fff9f0] border border-[#f5c49d] rounded-xl p-3.5 text-xs font-semibold text-[#794112] transition-all shadow-sm cursor-pointer"
                    >
                      No sabe o dio otra respuesta
                    </button>
                  </div>
                </div>
              )}

              {session.feedback?.kind === 'support' && session.attempt === 1 && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-[#1c3257] uppercase tracking-wider mb-2">
                    ¿Qué respondió ahora?
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => updateSession({ feedback: { kind: 'success', text: '¡Eso es! Utilizamos el signo negativo porque la temperatura está bajo cero. Por eso escribimos −3 °C.' }, attempt: 2 })}
                      className="text-left bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3 text-xs font-bold text-[#255e29] transition-all cursor-pointer"
                    >
                      Respondió signo negativo
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReveal('El signo positivo representa una cantidad sobre cero. Como buscamos tres grados bajo cero, la respuesta es −3.')}
                      className="text-left bg-white hover:bg-[#f8f9fa] border border-[#dce2e6] rounded-xl p-3 text-xs font-bold text-[#556376] transition-all cursor-pointer"
                    >
                      Respondió signo positivo
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReveal('La respuesta que buscábamos es −3. El signo menos indica que la temperatura está bajo cero.')}
                      className="text-left bg-white hover:bg-[#f8f9fa] border border-[#dce2e6] rounded-xl p-3 text-xs font-bold text-[#556376] transition-all cursor-pointer"
                    >
                      Todavía no sabe
                    </button>
                  </div>
                </div>
              )}

              {(session.feedback?.kind === 'success' || session.feedback?.kind === 'reveal') && (
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => updateSession({ stage: 'thermoMeaning', feedback: null, attempt: 0 })}
                    className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>Comprendamos la respuesta</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 6. STAGE: THERMO MEANING */}
          {session.stage === 'thermoMeaning' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-2">Comprendamos la respuesta</h1>
              <PrivateBox>
                {lessonData.reference.socraticHint}
              </PrivateBox>
              <div className="text-xs text-[#64748b] bg-white p-2.5 rounded-xl border border-[#dce2e6] mb-4">
                <strong>AYUDA DE LECTURA:</strong> −3 °C se lee “menos tres grados Celsius”.
              </div>
              <PromptBox label="DILE">
                {lessonData.reference.dilePrompt}
              </PromptBox>
              <PromptBox label="PREGÚNTALE" tone="teal">
                {lessonData.reference.question}
              </PromptBox>
              <ExpectedAnswerBox>
                {lessonData.reference.expectedAnswer}
              </ExpectedAnswerBox>

              <FeedbackBanner feedback={session.feedback} />

              {!session.feedback && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-[#1c3257] uppercase tracking-wider mb-2">
                    ¿Cómo respondió?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleSuccess(lessonData.reference.feedbackSuccess)}
                      className="bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3.5 text-xs font-bold text-[#255e29] transition-all cursor-pointer"
                    >
                      Respondió correctamente
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSupport(lessonData.reference.feedbackSupport)}
                      className="bg-white hover:bg-[#fff0e4] border border-[#f5c49d] rounded-xl p-3.5 text-xs font-bold text-[#794112] transition-all cursor-pointer"
                    >
                      Necesita apoyo
                    </button>
                  </div>
                </div>
              )}

              {session.feedback && (
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => updateSession({ stage: 'hook', feedback: null, hookStarted: false, hookEnded: false })}
                    className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>Seguir con el video</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 7. STAGE: HOOK (Video Submarino) */}
          {session.stage === 'hook' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-2">El recorrido del submarino</h1>
              {!session.hookStarted ? (
                <div>
                  <PromptBox label="DILE">
                    {lessonData.hook.dileIntro}
                  </PromptBox>
                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={() => startVideo('hook')}
                      className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Reproducir video</span>
                    </button>
                  </div>
                </div>
              ) : (
                <AdultVideoPlayer
                  src={lessonData.hook.videoSrc}
                  kind="hook"
                  session={session}
                  updateSession={updateSession}
                />
              )}

              {session.hookEnded && (
                <div className="mt-6 pt-4 border-t border-[#dce2e6]">
                  <PrivateBox>
                    {lessonData.hook.dileAfterVideo}
                  </PrivateBox>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      type="button"
                      onClick={() => startVideo('hook')}
                      className="bg-white hover:bg-[#f1f5f9] text-[#1c3257] border border-[#dce2e6] font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Ver nuevamente</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateSession({ stage: 'conversationIntro', video: { ...session.video, playing: false } })}
                      className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                    >
                      <span>Comprendamos el recorrido</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 8. STAGE: CONVERSATION INTRO */}
          {session.stage === 'conversationIntro' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-4">Comprendamos el recorrido</h1>
              <PromptBox label="DILE">
                Conversemos sobre lo que acabamos de ver. Voy a hacerte dos preguntas para que juntos comprendamos mejor el recorrido del submarino.
              </PromptBox>
              <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                <button
                  type="button"
                  onClick={() => updateSession({ stage: 'preQuestions', conversationIndex: 0, feedback: null, attempt: 0 })}
                  className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Mostrar primera pregunta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 9. STAGE: PRE QUESTIONS */}
          {session.stage === 'preQuestions' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#12a1a4] bg-[#e6f7f7] px-3 py-1 rounded-full">
                  {currentPreItem.context} · Pregunta {session.conversationIndex + 1} de 2
                </span>
              </div>
              <PromptBox label="PREGÚNTALE">
                {currentPreItem.question}
              </PromptBox>
              <ExpectedAnswerBox>
                {currentPreItem.expected}
              </ExpectedAnswerBox>

              <FeedbackBanner feedback={session.feedback} />

              {!session.feedback && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-[#1c3257] uppercase tracking-wider mb-2">
                    ¿Cómo respondió?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleSuccess(currentPreItem.success)}
                      className="bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3.5 text-xs font-bold text-[#255e29] transition-all cursor-pointer"
                    >
                      Respondió correctamente
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSupport(currentPreItem.support)}
                      className="bg-white hover:bg-[#fff0e4] border border-[#f5c49d] rounded-xl p-3.5 text-xs font-bold text-[#794112] transition-all cursor-pointer"
                    >
                      Necesita apoyo
                    </button>
                  </div>
                </div>
              )}

              {session.feedback?.kind === 'support' && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-[#1c3257] uppercase tracking-wider mb-2">
                    Después de la pista…
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleSuccess(currentPreItem.success)}
                      className="bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3.5 text-xs font-bold text-[#255e29] transition-all cursor-pointer"
                    >
                      Ahora respondió correctamente
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReveal(currentPreItem.reveal)}
                      className="bg-white hover:bg-[#f8f9fa] border border-[#dce2e6] rounded-xl p-3.5 text-xs font-bold text-[#556376] transition-all cursor-pointer"
                    >
                      Todavía necesita apoyo
                    </button>
                  </div>
                </div>
              )}

              {(session.feedback?.kind === 'success' || session.feedback?.kind === 'reveal') && (
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (session.conversationIndex === 0) {
                        updateSession({ conversationIndex: 1, feedback: null, attempt: 0 });
                      } else {
                        updateSession({ stage: 'formalization', feedback: null, attempt: 0, formalStarted: false, formalEnded: false });
                      }
                    }}
                    className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>Continuar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 10. STAGE: FORMALIZATION (Video Explicativo) */}
          {session.stage === 'formalization' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-2">Aprendamos sobre posición y movimiento</h1>
              {!session.formalStarted ? (
                <div>
                  <PromptBox label="DILE">
                    {lessonData.formalization.dileIntro}
                  </PromptBox>
                  <div className="text-xs text-[#64748b] bg-white p-2.5 rounded-xl border border-[#dce2e6] mb-4">
                    <strong>AYUDA DE LECTURA:</strong> −20 m se lee “menos veinte metros”.
                  </div>
                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={() => startVideo('formal')}
                      className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Reproducir video explicativo</span>
                    </button>
                  </div>
                </div>
              ) : (
                <AdultVideoPlayer
                  src={lessonData.formalization.videoSrc ?? ''}
                  kind="formal"
                  session={session}
                  updateSession={updateSession}
                />
              )}

              {session.formalEnded && (
                <div className="mt-6 pt-4 border-t border-[#dce2e6] flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => startVideo('formal')}
                    className="bg-white hover:bg-[#f1f5f9] text-[#1c3257] border border-[#dce2e6] font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ver nuevamente</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateSession({ stage: 'postIntro', video: { ...session.video, playing: false } })}
                    className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>Continuar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 11. STAGE: POST INTRO */}
          {session.stage === 'postIntro' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-4">Posición y movimiento</h1>
              <PromptBox label="DILE">
                Comprobemos que comprendiste la diferencia entre una posición y un movimiento. Te haré dos preguntas para comprobarlo.
              </PromptBox>
              <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                <button
                  type="button"
                  onClick={() => updateSession({ stage: 'postQuestions', postIndex: 0, feedback: null, attempt: 0 })}
                  className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Mostrar primera pregunta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 12. STAGE: POST QUESTIONS */}
          {session.stage === 'postQuestions' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#12a1a4] bg-[#e6f7f7] px-3 py-1 rounded-full">
                  {currentPostItem.context} · Pregunta {session.postIndex + 1} de 2
                </span>
              </div>
              <PromptBox label="PREGÚNTALE">
                {currentPostItem.question}
              </PromptBox>
              <ExpectedAnswerBox>
                {currentPostItem.expected}
              </ExpectedAnswerBox>

              <FeedbackBanner feedback={session.feedback} />

              {!session.feedback && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-[#1c3257] uppercase tracking-wider mb-2">
                    ¿Cómo respondió?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleSuccess(currentPostItem.success)}
                      className="bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3.5 text-xs font-bold text-[#255e29] transition-all cursor-pointer"
                    >
                      Respondió correctamente
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSupport(currentPostItem.support)}
                      className="bg-white hover:bg-[#fff0e4] border border-[#f5c49d] rounded-xl p-3.5 text-xs font-bold text-[#794112] transition-all cursor-pointer"
                    >
                      Necesita apoyo
                    </button>
                  </div>
                </div>
              )}

              {session.feedback?.kind === 'support' && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-[#1c3257] uppercase tracking-wider mb-2">
                    Después de la pista…
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleSuccess(currentPostItem.success)}
                      className="bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3.5 text-xs font-bold text-[#255e29] transition-all cursor-pointer"
                    >
                      Ahora respondió correctamente
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReveal(currentPostItem.reveal)}
                      className="bg-white hover:bg-[#f8f9fa] border border-[#dce2e6] rounded-xl p-3.5 text-xs font-bold text-[#556376] transition-all cursor-pointer"
                    >
                      Todavía necesita apoyo
                    </button>
                  </div>
                </div>
              )}

              {(session.feedback?.kind === 'success' || session.feedback?.kind === 'reveal') && (
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (session.postIndex === 0) {
                        updateSession({ postIndex: 1, feedback: null, attempt: 0 });
                      } else {
                        updateSession({ stage: 'summary', feedback: null });
                      }
                    }}
                    className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>Continuar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 13. STAGE: SUMMARY */}
          {session.stage === 'summary' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-4">En resumen</h1>
              <PromptBox label="DILE">
                En este recorrido usamos la superficie del mar como punto de referencia y la representamos con el número cero. Una posición indica dónde se encuentra algo respecto de ese punto; por eso, menos veinte metros representa la posición inicial del submarino. Un movimiento indica cómo cambia de lugar, hacia dónde se mueve y qué distancia recorre; por eso, bajar quince metros y subir ocho metros representan movimientos.
              </PromptBox>
              <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                <button
                  type="button"
                  onClick={() => updateSession({ stage: 'practiceIntro', practiceIndex: 0, feedback: null })}
                  className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Practiquemos juntos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 14. STAGE: PRACTICE INTRO */}
          {session.stage === 'practiceIntro' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-4">Practiquemos juntos</h1>
              <PromptBox label="DILE">
                {session.practiceIndex === 0
                  ? 'Ahora apliquemos lo que hemos aprendido en tres situaciones distintas. Para eso, te haré algunas preguntas y las resolveremos paso a paso.'
                  : session.practiceIndex === 1
                  ? 'Pasemos a la segunda situación. Ahora hablaremos de un ascensor.'
                  : 'Vamos con la última situación. Esta vez veremos que el significado de un signo también depende del contexto.'}
              </PromptBox>
              {session.practiceIndex === 2 && (
                <PromptBox label="DILE" tone="teal">
                  En una cuenta bancaria, el cero indica que no hay dinero disponible ni deuda. Un saldo positivo representa dinero disponible y un saldo negativo representa una deuda.
                </PromptBox>
              )}
              <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                <button
                  type="button"
                  onClick={() => updateSession({ stage: 'practice', feedback: null, attempt: 0 })}
                  className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>
                    Mostrar {session.practiceIndex === 0 ? 'primera' : session.practiceIndex === 1 ? 'segunda' : 'última'} situación
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 15. STAGE: PRACTICE */}
          {session.stage === 'practice' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#12a1a4] bg-[#e6f7f7] px-3 py-1 rounded-full">
                  {currentPracticeItem.context} · Situación {session.practiceIndex + 1} de 3
                </span>
              </div>
              <PromptBox label="PREGÚNTALE">
                {currentPracticeItem.question}
              </PromptBox>
              <ExpectedAnswerBox>
                {currentPracticeItem.expected}
              </ExpectedAnswerBox>

              <FeedbackBanner feedback={session.feedback} />

              {!session.feedback && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-[#1c3257] uppercase tracking-wider mb-2">
                    ¿Cómo respondió?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleSuccess(currentPracticeItem.success)}
                      className="bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3.5 text-xs font-bold text-[#255e29] transition-all cursor-pointer"
                    >
                      Respondió correctamente
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSupport(currentPracticeItem.support)}
                      className="bg-white hover:bg-[#fff0e4] border border-[#f5c49d] rounded-xl p-3.5 text-xs font-bold text-[#794112] transition-all cursor-pointer"
                    >
                      Necesita apoyo
                    </button>
                  </div>
                </div>
              )}

              {session.feedback?.kind === 'support' && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-[#1c3257] uppercase tracking-wider mb-2">
                    Después de la pista…
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleSuccess(currentPracticeItem.success)}
                      className="bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3.5 text-xs font-bold text-[#255e29] transition-all cursor-pointer"
                    >
                      Ahora respondió correctamente
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReveal(currentPracticeItem.reveal)}
                      className="bg-white hover:bg-[#f8f9fa] border border-[#dce2e6] rounded-xl p-3.5 text-xs font-bold text-[#556376] transition-all cursor-pointer"
                    >
                      Todavía necesita apoyo
                    </button>
                  </div>
                </div>
              )}

              {(session.feedback?.kind === 'success' || session.feedback?.kind === 'reveal') && (
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (session.practiceIndex < 2) {
                        updateSession({ stage: 'practiceIntro', practiceIndex: session.practiceIndex + 1, feedback: null, attempt: 0 });
                      } else {
                        updateSession({ stage: 'reasoningIntro', feedback: null, attempt: 0 });
                      }
                    }}
                    className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>Continuar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 16. STAGE: REASONING INTRO */}
          {session.stage === 'reasoningIntro' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-4">Comparemos dos situaciones</h1>
              <PromptBox label="DILE">
                Antes de resumir, comparemos dos situaciones. No necesitas repetir una frase exacta: lo importante es que expliques la idea con tus propias palabras.
              </PromptBox>
              <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                <button
                  type="button"
                  onClick={() => updateSession({ stage: 'reasoning', feedback: null, attempt: 0, reasoningIndependent: false })}
                  className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Mostrar comparación</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 17. STAGE: REASONING */}
          {session.stage === 'reasoning' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-2">Comparemos dos situaciones</h1>
              <PromptBox label="PREGÚNTALE">
                En una temperatura de −4 °C y en un saldo de −$4.000 aparece el signo negativo. ¿Significa lo mismo en las dos situaciones? Explica qué representa en cada una.
              </PromptBox>
              <ExpectedAnswerBox>
                En −4 °C el signo indica una temperatura bajo cero y en −$4.000 indica una deuda.
              </ExpectedAnswerBox>

              <FeedbackBanner feedback={session.feedback} />

              {!session.feedback && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-[#1c3257] uppercase tracking-wider mb-2">
                    ¿Cómo explicó su respuesta?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => updateSession({
                        feedback: { kind: 'success', text: '¡Excelente razonamiento! Reconociste que el mismo signo puede comunicar ideas diferentes según la situación.' },
                        reasoningIndependent: true
                      })}
                      className="bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3 text-xs font-bold text-[#255e29] transition-all cursor-pointer"
                    >
                      Explicó ambas ideas
                    </button>
                    <button
                      type="button"
                      onClick={() => updateSession({
                        feedback: { kind: 'support', text: 'Pensemos en cada situación por separado. En el termómetro, el cero separa temperaturas sobre y bajo cero. En la cuenta, el cero separa dinero disponible y deuda. Con esta pista, explica qué indica el signo negativo en cada caso.' },
                        attempt: 1,
                        reasoningIndependent: false
                      })}
                      className="bg-white hover:bg-[#fff0e4] border border-[#f5c49d] rounded-xl p-3 text-xs font-bold text-[#794112] transition-all cursor-pointer"
                    >
                      Explicó solo una idea
                    </button>
                    <button
                      type="button"
                      onClick={() => updateSession({
                        feedback: { kind: 'support', text: 'Pensemos en cada situación por separado. En el termómetro, el cero separa temperaturas sobre y bajo cero. En la cuenta, el cero separa dinero disponible y deuda. Con esta pista, explica qué indica el signo negativo en cada caso.' },
                        attempt: 1,
                        reasoningIndependent: false
                      })}
                      className="bg-white hover:bg-[#fff0e4] border border-[#f5c49d] rounded-xl p-3 text-xs font-bold text-[#794112] transition-all cursor-pointer"
                    >
                      Necesita apoyo
                    </button>
                  </div>
                </div>
              )}

              {session.feedback?.kind === 'support' && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-[#1c3257] uppercase tracking-wider mb-2">
                    Después de la pista…
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => updateSession({
                        feedback: { kind: 'success', text: '¡Excelente razonamiento! Reconociste que el mismo signo puede comunicar ideas diferentes según la situación.' },
                        reasoningIndependent: false
                      })}
                      className="bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3.5 text-xs font-bold text-[#255e29] transition-all cursor-pointer"
                    >
                      Ahora explicó ambas ideas
                    </button>
                    <button
                      type="button"
                      onClick={() => updateSession({
                        feedback: { kind: 'reveal', text: 'No significa exactamente lo mismo. En −4 °C indica una temperatura de cuatro grados bajo cero. En −$4.000 indica una deuda de cuatro mil pesos. El signo negativo se interpreta según el contexto.' },
                        attempt: 2,
                        reasoningIndependent: false
                      })}
                      className="bg-white hover:bg-[#f8f9fa] border border-[#dce2e6] rounded-xl p-3.5 text-xs font-bold text-[#556376] transition-all cursor-pointer"
                    >
                      Todavía necesita apoyo
                    </button>
                  </div>
                </div>
              )}

              {(session.feedback?.kind === 'success' || session.feedback?.kind === 'reveal') && (
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => updateSession({
                      stage: session.reasoningIndependent ? 'challenge' : 'strategy',
                      feedback: null,
                      attempt: 0
                    })}
                    className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>{session.reasoningIndependent ? 'Ir al desafío breve' : 'Ver estrategia para pensar'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 18. STAGE: CHALLENGE */}
          {session.stage === 'challenge' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-2">Desafío breve</h1>
              <PrivateBox>
                Esta profundización aparece porque resolvió la comparación anterior sin apoyo. Valora su explicación aunque utilice palabras diferentes.
              </PrivateBox>
              <PromptBox label="PREGÚNTALE">
                Una temperatura está en −2 °C y luego sube cinco grados. ¿Qué parte representa una posición y qué parte representa un movimiento? Explica cómo lo sabes.
              </PromptBox>
              <ExpectedAnswerBox>
                −2 °C representa la posición inicial; “sube cinco grados” representa el movimiento.
              </ExpectedAnswerBox>

              <FeedbackBanner feedback={session.feedback} />

              {!session.feedback && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-[#1c3257] uppercase tracking-wider mb-2">
                    ¿Cómo respondió?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => updateSession({
                        feedback: { kind: 'success', text: '¡Muy bien! −2 °C indica la posición inicial de la temperatura respecto del cero; “sube cinco grados” indica el movimiento o cambio.' },
                        challengeCompleted: true
                      })}
                      className="bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3.5 text-xs font-bold text-[#255e29] transition-all cursor-pointer"
                    >
                      Explicó correctamente
                    </button>
                    <button
                      type="button"
                      onClick={() => updateSession({
                        feedback: { kind: 'support', text: 'Revisémoslo juntos. −2 °C dice dónde está la temperatura al comenzar, por eso representa una posición. “Sube cinco grados” dice cómo cambia, por eso representa un movimiento.' },
                        challengeCompleted: true
                      })}
                      className="bg-white hover:bg-[#fff0e4] border border-[#f5c49d] rounded-xl p-3.5 text-xs font-bold text-[#794112] transition-all cursor-pointer"
                    >
                      Necesita apoyo
                    </button>
                  </div>
                </div>
              )}

              {session.feedback && (
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => updateSession({ stage: 'strategy', feedback: null })}
                    className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>Ver estrategia para pensar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 19. STAGE: STRATEGY */}
          {session.stage === 'strategy' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-4">Cómo analizar una situación</h1>
              <PromptBox label="DILE">
                Cuando analices una situación con números enteros, puedes seguir tres pasos. Primero, identifica el punto de referencia. Luego, observa qué indica el signo en ese contexto. Finalmente, pregúntate si la información dice dónde se encuentra algo o cómo cambia.
              </PromptBox>
              <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                <button
                  type="button"
                  onClick={() => updateSession({ stage: 'practiceSummary', summaryIdea: 0, feedback: null })}
                  className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Recordemos lo aprendido</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 20. STAGE: PRACTICE SUMMARY (3 Ideas) */}
          {session.stage === 'practiceSummary' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-4">Recordemos lo aprendido</h1>
              {session.summaryIdea === 0 && (
                <PromptBox label="DILE">
                  Antes de terminar, recordemos las tres ideas más importantes que aprendimos hoy.
                </PromptBox>
              )}

              <div className="space-y-3 mt-4">
                {lessonData.summaryIdeas.slice(0, session.summaryIdea).map(([title, text]) => (
                  <PromptBox key={title} label={`DILE · ${title}`} tone="teal">
                    {text}
                  </PromptBox>
                ))}
              </div>

              <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                {session.summaryIdea < 3 ? (
                  <button
                    type="button"
                    onClick={() => updateSession({ summaryIdea: session.summaryIdea + 1 })}
                    className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>Mostrar idea {session.summaryIdea + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => updateSession({ stage: 'miniquiz', quizVisible: false })}
                    className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>Continuar al miniquiz</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 21. STAGE: MINIQUIZ */}
          {session.stage === 'miniquiz' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-4">Miniquiz de la clase</h1>
              {!session.quizVisible ? (
                <div>
                  <PromptBox label="DILE">
                    Para terminar, responderás un miniquiz con tres preguntas sobre lo que aprendimos hoy. Tendrás que responderlo en tu pantalla. Cuando lo envíes, revisaremos juntos tus resultados.
                  </PromptBox>
                  <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                    <button
                      type="button"
                      onClick={() => updateSession({ quizVisible: true })}
                      className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                    >
                      <span>Mostrar miniquiz</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-2xl border border-[#dce2e6] text-center">
                  <PrivateBox>
                    Permite que el estudiante responda sin ayuda. Cuando envíe el miniquiz recibirás los resultados. Se aprueba con al menos dos respuestas correctas.
                  </PrivateBox>
                  <div className="flex items-center justify-center gap-3 text-sm text-[#12a1a4] font-semibold mt-6 py-4 bg-[#f0fbfb] rounded-xl border border-[#d2f0f0]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#12a1a4] animate-ping" />
                    <span>El estudiante está respondiendo en su pantalla...</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 22. STAGE: RESULTS */}
          {session.stage === 'results' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-4">Resultado del miniquiz</h1>
              <div className="bg-white p-6 rounded-2xl border border-[#dce2e6] mb-4 text-center">
                <div className="text-3xl font-extrabold text-[#1c3257] mb-1">
                  {session.miniScore} / 3
                </div>
                <p className="text-sm font-bold text-[#12a1a4]">
                  {session.miniScore === 3
                    ? '¡Excelente trabajo!'
                    : session.miniScore >= 2
                    ? '¡Muy bien! Aprobaste la clase.'
                    : 'Sigamos aprendiendo'}
                </p>
              </div>

              <PromptBox label="DILE">
                {session.miniScore === 3
                  ? '¡Excelente trabajo! Respondiste correctamente las tres preguntas. Comprendiste muy bien lo que aprendimos hoy.'
                  : session.miniScore >= 2
                  ? '¡Muy bien! Aprobaste la clase. Revisaremos las respuestas para que todo quede claro.'
                  : 'Vamos a revisar las respuestas que necesitan apoyo y luego haremos una comprobación breve.'}
              </PromptBox>

              <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                <button
                  type="button"
                  onClick={() => updateSession({ stage: 'review', reviewIndex: 0 })}
                  className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Recordemos las respuestas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 23. STAGE: REVIEW */}
          {session.stage === 'review' && (() => {
            const currentQuestionIdx = session.reviewQueue[session.reviewIndex] ?? 0;
            const currentItem = lessonData.mini[currentQuestionIdx] ?? lessonData.mini[0];
            const isLast = session.reviewIndex >= session.reviewQueue.length - 1;

            const handleNext = () => {
              if (isLast) {
                updateSession({ stage: session.miniScore >= 2 ? 'closing' : 'recoveryIntro' });
              } else {
                updateSession({ reviewIndex: session.reviewIndex + 1 });
              }
            };

            return (
              <div>
                <h1 className="text-2xl font-bold text-[#1c3257] mb-4">
                  Revisemos la respuesta {session.reviewIndex + 1} de {session.reviewQueue.length}
                </h1>

                <div className="bg-white p-5 rounded-2xl border border-[#dce2e6] mb-4">
                  <span className="text-xs uppercase font-bold text-[#748093] block mb-1">Pregunta</span>
                  <p className="text-sm font-semibold text-[#1c3257] mb-3">{currentItem.q}</p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs pt-2 border-t border-[#f1f5f9]">
                    <span className="text-[#526177]">
                      Respondió: <b className="text-[#1c3257]">{session.miniAnswers[currentQuestionIdx] || '(sin responder)'}</b>
                    </span>
                    <strong className="text-[#255e29]">
                      Respuesta correcta: {currentItem.correct}
                    </strong>
                  </div>
                </div>

                <PromptBox label="DILE">
                  {currentItem.fixExplain}
                </PromptBox>

                <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>{isLast ? (session.miniScore >= 2 ? 'Ir al cierre' : 'Ir al refuerzo') : 'Siguiente respuesta'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* 24. STAGE: RECOVERY INTRO */}
          {session.stage === 'recoveryIntro' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-4">Refuerzo breve</h1>
              <PromptBox label="DILE">
                Revisaremos paso a paso las ideas que todavía necesitan un poco de práctica. Después harás una comprobación breve.
              </PromptBox>
              <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                <button
                  type="button"
                  onClick={() => updateSession({ stage: 'recovery', recoveryIndex: 0, recoveryVisible: false, recoveryAnswer: '' })}
                  className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Comenzar refuerzo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 25. STAGE: RECOVERY */}
          {session.stage === 'recovery' && (() => {
            const recoveryItemIdx = session.recoveryItems[session.recoveryIndex] ?? 0;
            const item = lessonData.recovery[recoveryItemIdx] ?? lessonData.recovery[0];
            const answered = Boolean(session.recoveryAnswer);
            const isCorrect = session.recoveryAnswer === item.correct;
            const isLast = session.recoveryIndex >= session.recoveryItems.length - 1;

            const handleNext = () => {
              if (isLast) {
                updateSession({ stage: 'closing' });
              } else {
                updateSession({
                  recoveryIndex: session.recoveryIndex + 1,
                  recoveryVisible: false,
                  recoveryAnswer: ''
                });
              }
            };

            return (
              <div>
                <h1 className="text-2xl font-bold text-[#1c3257] mb-4">
                  Refuerzo {session.recoveryIndex + 1} de {session.recoveryItems.length}: {item.title}
                </h1>
                <PromptBox label="DILE">
                  {item.explain}
                </PromptBox>

                {!session.recoveryVisible ? (
                  <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                    <button
                      type="button"
                      onClick={() => updateSession({ recoveryVisible: true })}
                      className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                    >
                      <span>Mostrar comprobación</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : !answered ? (
                  <div className="flex items-center justify-center gap-3 text-sm text-[#12a1a4] font-semibold mt-6 py-4 bg-[#f0fbfb] rounded-xl border border-[#d2f0f0]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#12a1a4] animate-ping" />
                    <span>El estudiante está respondiendo en su pantalla...</span>
                  </div>
                ) : (
                  <div className="mt-6">
                    <PromptBox label="DILE" tone={isCorrect ? 'teal' : 'orange'}>
                      {isCorrect ? item.correctText : item.fixText}
                    </PromptBox>
                    <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                      >
                        <span>{isLast ? 'Finalizar refuerzo' : 'Siguiente refuerzo'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* 26. STAGE: CLOSING */}
          {session.stage === 'closing' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-4">Terminamos por hoy</h1>
              <PromptBox label="DILE">
                ¡Felicitaciones! Hoy aprendiste que el cero puede funcionar como punto de referencia, que los signos positivo y negativo se interpretan de acuerdo con cada situación, y que una posición indica dónde se encuentra algo mientras un movimiento indica cómo cambia de lugar.
              </PromptBox>
              <PromptBox label="DILE" tone="teal">
                En la próxima clase ubicaremos números enteros en la recta numérica para saber dónde está cada uno y compararlos.
              </PromptBox>

              {/* Registro de la sesión */}
              <div className="bg-white p-5 rounded-2xl border border-[#dce2e6] mt-6 flex items-start gap-3">
                <Info className="w-5 h-5 text-[#12a1a4] shrink-0 mt-0.5" />
                <div className="text-xs text-[#526177] leading-relaxed">
                  <strong className="text-[#1c3257] text-sm block mb-1">Registro de la sesión · Solo para ti</strong>
                  <p>
                    {session.supportCount === 0
                      ? 'El estudiante completó las actividades orales sin apoyo guiado.'
                      : `Se utilizaron apoyos guiados en ${session.supportCount} ${session.supportCount === 1 ? 'momento' : 'momentos'}.`}
                    {' '}
                    {session.reasoningIndependent
                      ? 'Explicó la comparación de contextos de manera autónoma.'
                      : 'Completó la comparación de contextos con acompañamiento.'}
                    {' '}
                    Resultado del miniquiz: {session.miniScore} de 3.
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-8 pt-4 border-t border-[#dce2e6]">
                <button
                  type="button"
                  onClick={() => updateSession({ stage: 'completed' })}
                  className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Finalizar clase</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* COMPLETED */}
          {session.stage === 'completed' && (
            <div className="text-center py-10 flex flex-col items-center justify-center min-h-[500px]">
              <div className="w-16 h-16 rounded-full bg-[#eaf4e8] text-[#255e29] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h1 className="text-3xl font-extrabold text-[#1c3257] mb-2">
                ¡Clase 1 completada con éxito!
              </h1>
              <p className="text-sm text-[#526177] max-w-md mx-auto mb-8 leading-relaxed">
                Has finalizado la primera sesión de Matemática con tu estudiante. Los avances han quedado registrados.
              </p>
              <button
                type="button"
                onClick={() => setStage('cover')}
                className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Volver al inicio de la clase</span>
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface AdultVideoPlayerProps {
  src: string;
  kind: 'hook' | 'formal';
  session: any;
  updateSession: (patch: any) => void;
}

const AdultVideoPlayer: React.FC<AdultVideoPlayerProps> = ({ src, kind, session, updateSession }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const lastSharedSecond = useRef(-1);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = ref.current;
    if (!v || session.video.kind !== kind) return;
    if (Math.abs(v.currentTime - session.video.seek) > 1.2) {
      v.currentTime = session.video.seek;
    }
    if (session.video.playing) {
      v.play().catch(() => undefined);
    } else {
      v.pause();
    }
  }, [kind, session.video]);

  const command = (playing: boolean, seek = ref.current?.currentTime ?? 0) => {
    updateSession({
      video: { kind, playing, seek, command: session.video.command + 1 }
    });
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#dce2e6] mt-4">
      <div className="text-xs text-[#748093] bg-[#f8fafc] p-2.5 rounded-xl border border-[#e2e8f0] mb-4">
        Este video está silenciado aquí para evitar audio duplicado. Los controles también actúan sobre la pantalla del estudiante.
      </div>

      <div className="relative rounded-xl overflow-hidden bg-black aspect-video max-h-[360px] mx-auto flex items-center justify-center">
        <video
          ref={ref}
          src={src}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain"
          onTimeUpdate={(e) => {
            const current = e.currentTarget.currentTime;
            setTime(current);
            const second = Math.floor(current);
            if (session.video.playing && second !== lastSharedSecond.current) {
              lastSharedSecond.current = second;
              updateSession({
                video: { ...session.video, kind, seek: current }
              });
            }
          }}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onCanPlay={() => {
            if (session.video.playing) ref.current?.play().catch(() => undefined);
          }}
          onEnded={() => {
            updateSession(
              kind === 'hook'
                ? {
                    hookEnded: true,
                    video: { ...session.video, playing: false, seek: ref.current?.duration ?? session.video.seek }
                  }
                : {
                    formalEnded: true,
                    video: { ...session.video, playing: false, seek: ref.current?.duration ?? session.video.seek }
                  }
            );
          }}
        />
      </div>

      <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-[#f1f5f9]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => command(!session.video.playing)}
            className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold p-2.5 rounded-xl flex items-center justify-center cursor-pointer transition-all"
            title={session.video.playing ? 'Pausar' : 'Continuar'}
          >
            {session.video.playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          </button>
          <button
            type="button"
            onClick={() => command(false, Math.max(0, (ref.current?.currentTime ?? 0) - 10))}
            className="bg-white hover:bg-[#f8fafc] text-[#1c3257] border border-[#dce2e6] font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-all"
          >
            <Rewind className="w-3.5 h-3.5" /> 10 s
          </button>
          <button
            type="button"
            onClick={() => command(false, Math.min(duration, (ref.current?.currentTime ?? 0) + 10))}
            className="bg-white hover:bg-[#f8fafc] text-[#1c3257] border border-[#dce2e6] font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-all"
          >
            10 s <FastForward className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => command(false, 0)}
            className="bg-white hover:bg-[#f8fafc] text-[#1c3257] border border-[#dce2e6] font-bold p-2 rounded-xl text-xs flex items-center justify-center cursor-pointer transition-all"
            title="Reiniciar video"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 flex items-center gap-3 max-w-xs">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(time, duration || 0)}
            onChange={(e) => command(false, Number(e.target.value))}
            className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#12a1a4]"
          />
          <span className="text-xs text-[#748093] font-mono shrink-0">
            {formatTime(time)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};
