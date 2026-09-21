import React from 'react';
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
import { ArrowRight, Play, CheckCircle2, RotateCcw, HelpCircle, Sparkles, BookOpen, Clock } from 'lucide-react';

export const AdultLessonView: React.FC = () => {
  const { session, lessonData, updateSession, setStage, setFeedback } = useLessonSync();

  const handleSupport = (text: string) => {
    setFeedback({ kind: 'support', text });
  };

  const handleSuccess = (text: string) => {
    setFeedback({ kind: 'success', text });
  };

  return (
    <div className="flex h-full min-h-[720px] bg-[#f5f4ef] rounded-2xl overflow-hidden border border-[#dce2e6] shadow-sm">
      {/* 8-step Left Sidebar */}
      <AdultSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f5f4ef]">
        <AdultHeader />

        <div className="flex-1 p-6 md:p-8 overflow-y-auto max-w-4xl mx-auto w-full">
          {/* STAGE: COVER */}
          {session.stage === 'cover' && (
            <div className="text-center py-10 flex flex-col items-center justify-center min-h-[500px]">
              <span className="text-[#12a1a4] font-bold text-xs uppercase tracking-widest block mb-2">
                {lessonData.metadata.subject} · {lessonData.metadata.oaTitle}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#1c3257] mb-2 tracking-tight">
                {lessonData.metadata.oaCode} · Clase {lessonData.metadata.lessonNumber}
              </h1>
              <h2 className="text-xl text-[#526177] font-semibold mb-4">
                {lessonData.metadata.lessonTitle}
              </h2>
              <div className="flex items-center gap-2 text-sm text-[#748093] mb-8 bg-white px-4 py-2 rounded-full border border-[#dce2e6]">
                <Clock className="w-4 h-4 text-[#ee751c]" />
                <span>Duración estimada: {lessonData.metadata.durationMinutes} minutos · Modalidad Mentor Sincronizado</span>
              </div>

              <button
                type="button"
                onClick={() => setStage('prep')}
                className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 text-base shadow-md hover:shadow-lg transition-all"
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
                  Este botón abre únicamente tu preparación privada de mentor. La pantalla del estudiante continuará en la Sala de Espera.
                </p>
              </details>
            </div>
          )}

          {/* STAGE: PREP */}
          {session.stage === 'prep' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-4">Antes de comenzar</h1>
              <div className="space-y-4 mb-6">
                <div className="bg-white border-l-4 border-l-[#4a964e] p-4 rounded-xl shadow-sm">
                  <strong className="text-[#4a964e] text-xs uppercase tracking-wider block mb-1">Tu Objetivo</strong>
                  <p className="text-[#334157] text-sm leading-relaxed">{lessonData.prep.adultObjective}</p>
                </div>

                <div className="bg-white border-l-4 border-l-[#ee751c] p-4 rounded-xl shadow-sm">
                  <strong className="text-[#ee751c] text-xs uppercase tracking-wider block mb-1">Ruta de Hoy</strong>
                  <p className="text-[#334157] text-sm leading-relaxed">{lessonData.prep.routeToday}</p>
                </div>

                <div className="bg-white border-l-4 border-l-[#f8ad22] p-4 rounded-xl shadow-sm">
                  <strong className="text-[#c87b00] text-xs uppercase tracking-wider block mb-1">¡Recuerda!</strong>
                  <p className="text-[#334157] text-sm leading-relaxed">{lessonData.prep.mentorReminder}</p>
                </div>

                <EmotionalTipBox>
                  {lessonData.prep.emotionalTip}
                </EmotionalTipBox>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStage('hook')}
                  className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                >
                  <span>Iniciar gancho motivacional</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STAGE: ROUTE */}
          {session.stage === 'route' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-4">Nuestra ruta de {lessonData.metadata.subject}</h1>
              <PromptBox label="DILE">
                {lessonData.route.dileIntro}
              </PromptBox>

              <PromptBox label="DILE" tone="teal">
                {lessonData.route.dileObjective}
              </PromptBox>

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#dce2e6]">
                <p className="text-xs text-[#748093]">
                  Al continuar avanzarán ambas pantallas a la situación inicial.
                </p>
                <button
                  type="button"
                  onClick={() => setStage('situation')}
                  className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                >
                  <span>Continuemos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STAGE: SITUATION (Termómetro) */}
          {session.stage === 'situation' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-2">¡Comencemos! · El punto de referencia</h1>
              <PrivateBox>
                Lee en voz alta únicamente el contenido del recuadro DILE y espera la respuesta de tu hijo antes de seleccionar una opción.
              </PrivateBox>

              <PromptBox label="DILE">
                {lessonData.situation.dilePrompt}
              </PromptBox>

              <ExpectedAnswerBox>
                {lessonData.situation.expectedAnswer}
              </ExpectedAnswerBox>

              <SocraticTipBox>
                {lessonData.situation.socraticHint}
              </SocraticTipBox>

              <EmotionalTipBox>
                {lessonData.situation.emotionalTip}
              </EmotionalTipBox>

              <FeedbackBanner feedback={session.feedback} />

              <div className="mt-6">
                <p className="text-xs font-bold text-[#1c3257] uppercase tracking-wider mb-2">
                  ¿Qué respondió el estudiante?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {lessonData.situation.options.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (opt.kind === 'correct') {
                          setStage('reference');
                        } else {
                          handleSupport(opt.feedbackText);
                        }
                      }}
                      className="text-left bg-white hover:bg-[#eefafb] border border-[#b8c4d0] hover:border-[#12a1a4] rounded-xl p-3 text-xs font-semibold text-[#1c3257] transition-all shadow-sm"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STAGE: REFERENCE */}
          {session.stage === 'reference' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-2">Fijemos el punto de referencia</h1>
              <PrivateBox>
                Mantén siempre un tono positivo y valida la comprensión del número cero.
              </PrivateBox>

              <PromptBox label="DILE">
                {lessonData.reference.dilePrompt}
              </PromptBox>

              <PromptBox label="PREGUNTA" tone="orange">
                {lessonData.reference.question}
              </PromptBox>

              <ExpectedAnswerBox>
                {lessonData.reference.expectedAnswer}
              </ExpectedAnswerBox>

              <SocraticTipBox>
                {lessonData.reference.socraticHint}
              </SocraticTipBox>

              <FeedbackBanner feedback={session.feedback} />

              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => handleSuccess(lessonData.reference.feedbackSuccess)}
                  className="flex-1 bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3 text-xs font-bold text-[#255e29] transition-all"
                >
                  Respondió correctamente
                </button>
                <button
                  type="button"
                  onClick={() => handleSupport(lessonData.reference.feedbackSupport)}
                  className="flex-1 bg-white hover:bg-[#fff0e4] border border-[#f5c49d] rounded-xl p-3 text-xs font-bold text-[#794112] transition-all"
                >
                  Necesita apoyo
                </button>
              </div>

              {session.feedback?.kind === 'success' && (
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      updateSession({ stage: 'conversation', conversationIndex: 0, feedback: null });
                    }}
                    className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                  >
                    <span>Continuar a las preguntas</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STAGE: HOOK (Video Submarino) */}
          {session.stage === 'hook' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-2">Desafío Inicial: {lessonData.metadata.lessonTitle}</h1>
              <PromptBox label="DILE">
                {lessonData.hook.dileIntro}
              </PromptBox>

              <PromptBox label="HAZ" tone="teal">
                {lessonData.hook.hazInstruction}
              </PromptBox>

              <div className="mt-6 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-[#dce2e6] text-center">
                {!session.hookStarted ? (
                  <button
                    type="button"
                    onClick={() => updateSession({ hookStarted: true })}
                    className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Reproducir video en pantalla del estudiante</span>
                  </button>
                ) : !session.hookEnded ? (
                  <div className="flex items-center gap-2 text-[#12a1a4] font-semibold text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#12a1a4] animate-ping" />
                    <span>El video se está reproduciendo en la pantalla del estudiante...</span>
                    <button
                      type="button"
                      onClick={() => updateSession({ hookEnded: true })}
                      className="ml-4 text-xs underline text-[#748093] hover:text-[#1c3257]"
                    >
                      (Simular fin de video)
                    </button>
                  </div>
                ) : (
                  <div className="w-full">
                    <PromptBox label="DILE" tone="orange">
                      {lessonData.hook.dileAfterVideo}
                    </PromptBox>
                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setStage('route');
                        }}
                        className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                      >
                        <span>Continuar a la ruta de aprendizaje</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STAGE: CONVERSATION (4 Socratic Questions) */}
          {session.stage === 'conversation' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-[#1c3257]">Conversación Guiada: {lessonData.metadata.lessonTitle}</h1>
                <span className="bg-[#e7edf4] text-[#1c3257] font-bold text-xs px-3 py-1 rounded-full">
                  Pregunta {session.conversationIndex + 1} de {lessonData.conversation.items.length}
                </span>
              </div>

              {session.conversationIndex === 0 && (
                <PromptBox label="DILE">
                  {lessonData.conversation.dileIntro}
                </PromptBox>
              )}

              <EmotionalTipBox>
                {lessonData.conversation.emotionalTip}
              </EmotionalTipBox>

              {(() => {
                const currentItem = lessonData.conversation.items[session.conversationIndex];
                return (
                  <div className="mt-4">
                    <PromptBox label="PREGUNTA" tone="orange">
                      {currentItem.question}
                    </PromptBox>

                    <ExpectedAnswerBox>
                      {currentItem.expectedAnswer}
                    </ExpectedAnswerBox>

                    <SocraticTipBox>
                      {currentItem.socraticGuidance}
                    </SocraticTipBox>

                    <FeedbackBanner feedback={session.feedback} />

                    <div className="flex gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() => handleSuccess(currentItem.studentVisualPrompt)}
                        className="flex-1 bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3 text-xs font-bold text-[#255e29] transition-all"
                      >
                        Respondió correctamente
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSupport(currentItem.supportHelp)}
                        className="flex-1 bg-white hover:bg-[#fff0e4] border border-[#f5c49d] rounded-xl p-3 text-xs font-bold text-[#794112] transition-all"
                      >
                        Necesita apoyo
                      </button>
                    </div>

                    {session.feedback?.kind === 'success' && (
                      <div className="flex justify-end mt-6">
                        <button
                          type="button"
                          onClick={() => {
                            if (session.conversationIndex < lessonData.conversation.items.length - 1) {
                              updateSession({
                                conversationIndex: session.conversationIndex + 1,
                                feedback: null
                              });
                            } else {
                              setStage('formalization');
                            }
                          }}
                          className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                        >
                          <span>
                            {session.conversationIndex < lessonData.conversation.items.length - 1
                              ? 'Siguiente pregunta'
                              : 'Continuar a la explicación'}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* STAGE: FORMALIZATION */}
          {session.stage === 'formalization' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-2">Damos nombre a lo que descubrimos</h1>
              <PromptBox label="DILE">
                {lessonData.formalization.dileIntro}
              </PromptBox>

              <PromptBox label="HAZ" tone="teal">
                {lessonData.formalization.hazInstruction}
              </PromptBox>

              <div className="mt-6 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-[#dce2e6] text-center">
                {!session.formalStarted ? (
                  <button
                    type="button"
                    onClick={() => updateSession({ formalStarted: true, formalEnded: false })}
                    className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Mostrar formalización en pantalla del estudiante</span>
                  </button>
                ) : (
                  <div className="w-full">
                    <p className="text-sm text-[#4a964e] font-semibold mb-4">
                      La explicación visual está activa en la pantalla del estudiante.
                    </p>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => updateSession({ stage: 'practice', practiceIndex: 0, feedback: null })}
                        className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                      >
                        <span>Continuar a la práctica guiada</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STAGE: IDEA */}
          {session.stage === 'idea' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-2">La idea que debe quedar</h1>
              <PromptBox label="DILE">
                {lessonData.idea.dilePrompt}
              </PromptBox>

              <PromptBox label="COMPRUEBA" tone="orange">
                {lessonData.idea.checkQuestion}
              </PromptBox>

              <ExpectedAnswerBox>
                {lessonData.idea.expectedAnswer}
              </ExpectedAnswerBox>

              <SocraticTipBox>
                {lessonData.idea.socraticHint}
              </SocraticTipBox>

              <FeedbackBanner feedback={session.feedback} />

              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => handleSuccess(lessonData.idea.feedbackSuccess)}
                  className="flex-1 bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3 text-xs font-bold text-[#255e29] transition-all"
                >
                  Respondió correctamente
                </button>
                <button
                  type="button"
                  onClick={() => handleSupport(lessonData.idea.feedbackSupport)}
                  className="flex-1 bg-white hover:bg-[#fff0e4] border border-[#f5c49d] rounded-xl p-3 text-xs font-bold text-[#794112] transition-all"
                >
                  Necesita apoyo
                </button>
              </div>

              {session.feedback?.kind === 'success' && (
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      updateSession({ stage: 'miniquiz', miniAnswers: ['', '', ''], miniScore: 0, feedback: null });
                    }}
                    className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                  >
                    <span>Ir al Miniquiz</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STAGE: PRACTICE (3 Contexts) */}
          {session.stage === 'practice' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-[#1c3257]">Práctica Guiada: Apliquemos la idea</h1>
                <span className="bg-[#e7edf4] text-[#1c3257] font-bold text-xs px-3 py-1 rounded-full">
                  Situación {session.practiceIndex + 1} de {lessonData.practice.items.length}
                </span>
              </div>

              {session.practiceIndex === 0 && (
                <PromptBox label="DILE">
                  {lessonData.practice.dileIntro}
                </PromptBox>
              )}

              {(() => {
                const currentItem = lessonData.practice.items[session.practiceIndex];
                return (
                  <div className="mt-4">
                    <div className="text-xs font-bold text-[#12a1a4] uppercase tracking-wider mb-1">
                      Contexto: {currentItem.contextName}
                    </div>
                    <PromptBox label="PREGUNTA" tone="orange">
                      {currentItem.prompt}
                    </PromptBox>

                    <ExpectedAnswerBox>
                      {currentItem.expectedAnswer}
                    </ExpectedAnswerBox>

                    <SocraticTipBox>
                      {currentItem.socraticTip}
                    </SocraticTipBox>

                    <FeedbackBanner feedback={session.feedback} />

                    <div className="flex gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() => handleSuccess(`¡Muy bien! La respuesta correcta es ${currentItem.expectedAnswer}.`)}
                        className="flex-1 bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3 text-xs font-bold text-[#255e29] transition-all"
                      >
                        Respondió correctamente
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSupport(currentItem.supportHelp)}
                        className="flex-1 bg-white hover:bg-[#fff0e4] border border-[#f5c49d] rounded-xl p-3 text-xs font-bold text-[#794112] transition-all"
                      >
                        Necesita apoyo
                      </button>
                    </div>

                    {session.feedback?.kind === 'success' && (
                      <div className="flex justify-end mt-6">
                        <button
                          type="button"
                          onClick={() => {
                            if (session.practiceIndex < lessonData.practice.items.length - 1) {
                              updateSession({
                                practiceIndex: session.practiceIndex + 1,
                                feedback: null
                              });
                            } else {
                              updateSession({ stage: 'idea', feedback: null });
                            }
                          }}
                          className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                        >
                          <span>
                            {session.practiceIndex < lessonData.practice.items.length - 1
                              ? 'Siguiente situación'
                              : 'Ir al resumen de la clase'}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* STAGE: MINIQUIZ */}
          {session.stage === 'miniquiz' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-2">Miniquiz de la clase</h1>
              <PromptBox label="DILE">
                {lessonData.quiz.dileIntro}
              </PromptBox>

              <PromptBox label="HAZ" tone="teal">
                {lessonData.quiz.hazInstruction}
              </PromptBox>

              <div className="bg-[#e9f2f8] text-[#1c3257] rounded-xl p-3.5 my-4 text-center text-xs font-bold border border-[#bcd6ea]">
                Criterio de aprobación: {lessonData.quiz.passScoreMin} respuestas correctas de {lessonData.quiz.questions.length}
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[#dce2e6] text-center my-6">
                <div className="flex items-center justify-center gap-2 text-[#748093] text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#12a1a4] animate-ping" />
                  <span>Esperando que el estudiante responda y envíe sus 3 respuestas...</span>
                </div>
              </div>
            </div>
          )}

          {/* STAGE: RESULTS */}
          {session.stage === 'results' && (
            <div>
              {(() => {
                const passed = session.miniScore >= lessonData.quiz.passScoreMin;
                return (
                  <div>
                    <h1 className="text-2xl font-bold text-[#1c3257] mb-4">
                      {passed ? 'Revisemos el resultado' : 'Reforcemos antes de cerrar'}
                    </h1>

                    <div className={`p-4 rounded-2xl flex items-center justify-between mb-6 ${
                      passed ? 'bg-[#eaf4e8] text-[#255e29] border border-[#badcb8]' : 'bg-[#fff0e4] text-[#924814] border border-[#f5c49d]'
                    }`}>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider block">Resultado del Miniquiz</span>
                        <strong className="text-2xl font-black">{session.miniScore} / {lessonData.quiz.questions.length}</strong>
                      </div>
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white shadow-sm">
                        {passed ? 'Miniquiz Aprobado' : 'Requiere Refuerzo Guiado'}
                      </span>
                    </div>

                    {passed ? (
                      <div>
                        <PromptBox label="DILE" tone="teal">
                          ¡Muy bien! Lograste el mínimo de la clase. Revisemos brevemente tus respuestas antes del cierre.
                        </PromptBox>

                        <div className="space-y-3 my-4">
                          {lessonData.quiz.questions.map((q, idx) => {
                            const studentAns = session.miniAnswers[idx];
                            const isCorrect = studentAns === q.correct;
                            return (
                              <div key={q.id} className="bg-white p-3.5 rounded-xl border border-[#dce2e6] text-xs">
                                <div className="flex items-center justify-between mb-1">
                                  <strong className="text-[#1c3257]">Pregunta {idx + 1}: {q.q}</strong>
                                  <span className={`font-bold px-2 py-0.5 rounded ${
                                    isCorrect ? 'bg-[#eaf4e8] text-[#255e29]' : 'bg-[#fff0e4] text-[#ee751c]'
                                  }`}>
                                    {isCorrect ? 'Correcta' : 'Para revisar'}
                                  </span>
                                </div>
                                <p className="text-[#657185]">Tu respuesta: <b className="text-[#1c3257]">{studentAns}</b></p>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex justify-end mt-6">
                          <button
                            type="button"
                            onClick={() => setStage('closing')}
                            className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                          >
                            <span>Ir al cierre oral y metacognición</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <PrivateBox>
                          Revisarán cada concepto no logrado con una explicación guiada y una pregunta equivalente. Mantén siempre un clima positivo.
                        </PrivateBox>

                        <PromptBox label="DILE">
                          {lessonData.recovery.dileIntroError}
                        </PromptBox>

                        <div className="flex gap-3 mt-6">
                          <button
                            type="button"
                            onClick={() => {
                              updateSession({
                                stage: 'recovery',
                                recoveryIndex: 0,
                                recoveryVisible: false,
                                recoveryResults: []
                              });
                            }}
                            className="flex-1 bg-[#1c3257] hover:bg-[#284773] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all"
                          >
                            Comenzar refuerzo guiado
                          </button>
                          <button
                            type="button"
                            onClick={() => setStage('paused')}
                            className="bg-white hover:bg-[#f5f7f9] text-[#657185] border border-[#dce2e6] font-semibold py-3 px-4 rounded-xl text-sm transition-all"
                          >
                            Terminar por hoy
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* STAGE: RECOVERY */}
          {session.stage === 'recovery' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-2">Refuerzo guiado con preguntas equivalentes</h1>
              {(() => {
                const incorrectIndices = lessonData.quiz.questions
                  .map((q, idx) => (session.miniAnswers[idx] === q.correct ? -1 : idx))
                  .filter((idx) => idx >= 0);

                const totalToRecover = incorrectIndices.length;
                const completedCount = session.recoveryResults.length;
                const isAllDone = completedCount >= totalToRecover;

                if (isAllDone) {
                  const passRecovery = session.recoveryResults.filter(Boolean).length >= Math.ceil(totalToRecover / 2);
                  return (
                    <div className="py-6">
                      <div className={`p-4 rounded-2xl mb-6 ${
                        passRecovery ? 'bg-[#eaf4e8] text-[#255e29]' : 'bg-[#fff0e4] text-[#924814]'
                      }`}>
                        <strong className="text-lg block font-bold mb-1">
                          {passRecovery ? '¡Refuerzo logrado con éxito!' : 'Sesión de práctica completada'}
                        </strong>
                        <p className="text-xs">
                          {passRecovery
                            ? lessonData.recovery.dilePass
                            : lessonData.recovery.dileNeedsMorePractice}
                        </p>
                      </div>

                      <div className="flex justify-end gap-3">
                        {passRecovery ? (
                          <button
                            type="button"
                            onClick={() => setStage('closing')}
                            className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                          >
                            <span>Ir al cierre oral</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setStage('paused')}
                            className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all"
                          >
                            Guardar avance y terminar por hoy
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }

                const currentConceptIdx = incorrectIndices[session.recoveryIndex] ?? 0;
                const recItem = lessonData.recovery.items[currentConceptIdx] ?? lessonData.recovery.items[0];

                return (
                  <div>
                    <span className="text-xs font-bold text-[#12a1a4] uppercase tracking-wider block mb-1">
                      Concepto {session.recoveryIndex + 1} de {totalToRecover} · {recItem.title}
                    </span>

                    <PromptBox label="DILE">
                      {recItem.explain}
                    </PromptBox>

                    <SocraticTipBox>
                      {recItem.socraticHint}
                    </SocraticTipBox>

                    <div className="mt-6 flex justify-end">
                      {!session.recoveryVisible ? (
                        <button
                          type="button"
                          onClick={() => updateSession({ recoveryVisible: true })}
                          className="bg-[#1c3257] hover:bg-[#284773] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                        >
                          <span>Mostrar pregunta equivalente en pantalla del estudiante</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-xs text-[#4a964e] font-semibold">
                          El estudiante está respondiendo en su pantalla...
                        </span>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* STAGE: CLOSING (Metacognición y Transferencia) */}
          {session.stage === 'closing' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1c3257] mb-2">Cierre oral, metacognición y transferencia</h1>
              <PrivateBox>
                {lessonData.closing.evaluationCriteria}
              </PrivateBox>

              <PromptBox label="PREGUNTA" tone="orange">
                {lessonData.closing.dileQuestion}
              </PromptBox>

              <SocraticTipBox>
                {lessonData.closing.metacognitionQuestion}
              </SocraticTipBox>

              <EmotionalTipBox>
                {lessonData.closing.transferQuestion}
              </EmotionalTipBox>

              <FeedbackBanner feedback={session.feedback} />

              <div className="mt-6">
                <p className="text-xs font-bold text-[#1c3257] uppercase tracking-wider mb-2">
                  Evaluación del Cierre Oral
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      updateSession({ closureState: 'done' });
                      handleSuccess('Explicó ambas ideas con claridad.');
                    }}
                    className="bg-white hover:bg-[#eaf4e8] border border-[#badcb8] rounded-xl p-3 text-xs font-bold text-[#255e29] transition-all"
                  >
                    Explicó ambas ideas
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      updateSession({ closureState: 'one_concept' });
                      handleSupport('Reconoció una idea. Pregúntale solo la faltante.');
                    }}
                    className="bg-white hover:bg-[#fff7db] border border-[#f0d372] rounded-xl p-3 text-xs font-bold text-[#956b00] transition-all"
                  >
                    Explicó solo una idea
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      updateSession({ closureState: 'needs_support' });
                      handleSupport(lessonData.closing.supportRefocus);
                    }}
                    className="bg-white hover:bg-[#fff0e4] border border-[#f5c49d] rounded-xl p-3 text-xs font-bold text-[#794112] transition-all"
                  >
                    Necesita apoyo
                  </button>
                </div>
              </div>

              {session.closureState === 'done' && (
                <div className="mt-8 pt-4 border-t border-[#dce2e6]">
                  <PromptBox label="DILE" tone="teal">
                    {lessonData.closing.dileFinalCelebration}
                  </PromptBox>
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={() => setStage('completed')}
                      className="bg-[#4a964e] hover:bg-[#3d7e40] text-white font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Finalizar clase (Aprobada)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STAGE: COMPLETED */}
          {session.stage === 'completed' && (
            <div className="text-center py-10 flex flex-col items-center justify-center min-h-[480px]">
              <div className="w-16 h-16 rounded-full bg-[#4a964e] text-white flex items-center justify-center mb-4 shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-[#4a964e] font-bold text-xs uppercase tracking-widest block mb-1">
                Clase completada y registrada
              </span>
              <h1 className="text-3xl font-extrabold text-[#1c3257] mb-2">¡Excelente trabajo!</h1>
              <p className="text-sm text-[#657185] max-w-md mb-6 leading-relaxed">
                Miniquiz aprobado · Cierre oral y metacognición completados con éxito.
              </p>
              <div className="bg-[#e9f2f8] border border-[#bcd6ea] text-[#1c3257] px-5 py-3 rounded-xl text-xs font-semibold max-w-md mb-8">
                Próxima lección habilitada: <strong>{lessonData.metadata.nextLessonTitle}</strong>
              </div>
            </div>
          )}

          {/* STAGE: PAUSED */}
          {session.stage === 'paused' && (
            <div className="text-center py-10 flex flex-col items-center justify-center min-h-[480px]">
              <span className="text-[#ee751c] font-bold text-xs uppercase tracking-widest block mb-1">
                Sesión guardada
              </span>
              <h1 className="text-3xl font-extrabold text-[#1c3257] mb-2">Terminaremos por hoy</h1>
              <PromptBox label="DILE">
                {lessonData.closing.dilePausedSave}
              </PromptBox>
              <p className="text-xs text-[#748093] max-w-md mt-4 leading-relaxed">
                El avance ha quedado guardado sin penalización. La próxima sesión se retomará desde la consolidación de estos conceptos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
