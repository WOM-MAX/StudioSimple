import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  BookOpen,
  Home,
  Check,
  X,
  Play,
  Pause
} from 'lucide-react';

interface ExamQuestion {
  id: number;
  axis: string;
  oaRef: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

function generateMock30Questions(subject: string, grade: string): ExamQuestion[] {
  const axes = ['Comprensión y Conceptos', 'Aplicación y Procedimientos', 'Análisis y Resolución', 'Razonamiento Crítico'];
  const questions: ExamQuestion[] = [];

  for (let i = 1; i <= 30; i++) {
    const axis = axes[(i - 1) % axes.length];
    const oaNum = ((i - 1) % 5) + 1;
    let qText = `Pregunta ${i} (${subject} · ${grade}): ¿Cuál de las siguientes alternativas representa la conclusión correcta respecto a los contenidos oficiales del OA ${oaNum}?`;
    let opts = [
      `A) Opción representativa del concepto principal aplicado en la situación formal ${i}.`,
      `B) Opción distractora con inversión de términos frecuentes de la materia evaluada.`,
      `C) Opción alternativa no concluyente según los antecedentes presentados.`,
      `D) Opción contradictoria con la evidencia formal del problema planteado.`
    ];

    if (subject.includes('Matemát')) {
      const a = (i * 3) - 5;
      const b = (i * 2) + 4;
      qText = `Pregunta ${i}: En una situación cotidiana de ${grade}, si se parte con una magnitud de ${a} y se aplica una variación de ${b}, ¿cuál es el resultado correcto verificado?`;
      opts = [
        `A) El resultado es ${a + b}, aplicando la operación directa en el eje evaluado.`,
        `B) El resultado es ${a - b}, considerando error de signo.`,
        `C) El resultado es ${(a + b) * 2}, duplicando erróneamente la magnitud.`,
        `D) El resultado es ${Math.abs(a - b)}, omitiendo el procedimiento formal.`
      ];
    } else if (subject.includes('Lengu')) {
      qText = `Pregunta ${i}: A partir de la lectura de un texto narrativo de ${grade}, ¿cuál es la inferencia global sobre la motivación del personaje principal en el relato?`;
      opts = [
        `A) Actúa impulsado por el sentido de protección a su comunidad y resolución del conflicto.`,
        `B) Desconoce las consecuencias de sus acciones y actúa por mero azar.`,
        `C) Depende exclusivamente de instrucciones externas sin iniciativa propia.`,
        `D) Busca eludir sus responsabilidades individuales frente a los demás.`
      ];
    } else if (subject.includes('Cien')) {
      qText = `Pregunta ${i}: En una investigación experimental de ${grade}, ¿qué variable debe mantenerse constante para garantizar la validez de la evidencia científica recolectada?`;
      opts = [
        `A) La condición de control ambiental y el instrumento de medición empleado.`,
        `B) La hipótesis preliminar formulada por el grupo de estudio.`,
        `C) La conclusión redactada al finalizar la observación.`,
        `D) El número de errores cometidos durante el registro inicial.`
      ];
    } else if (subject.includes('Hist')) {
      qText = `Pregunta ${i}: Al analizar los procesos históricos y geográficos de ${grade}, ¿cuál es el factor clave que explica la organización de la sociedad estudiada?`;
      opts = [
        `A) La interacción adaptativa con el medio geográfico y la distribución de recursos.`,
        `B) La ausencia total de normas o acuerdos comunitarios.`,
        `C) La imposibilidad de comunicarse con comunidades vecinas.`,
        `D) La permanencia invariable de las costumbres sin cambios en el tiempo.`
      ];
    }

    questions.push({
      id: i,
      axis,
      oaRef: `OA 0${oaNum}`,
      question: qText,
      options: opts,
      correctIndex: 0, // Por diseño pedagógico la A es la correcta en la semilla
      explanation: `Explicación formativa: La alternativa A es la correcta porque responde con rigor al estándar del ${axis} para ${subject} en ${grade}.`
    });
  }

  return questions;
}

export const FormalExamSimulator: React.FC = () => {
  const { setViewMode, student, themeMode } = useApp();
  const isDark = themeMode === 'dark';

  const [currentSubject, setCurrentSubject] = useState('Matemática');
  const [currentGrade, setCurrentGrade] = useState(student?.grade || '7° Básico');
  const [questions, setQuestions] = useState<ExamQuestion[]>(() => generateMock30Questions(currentSubject, currentGrade));

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);

  // Temporizador: 60 minutos (3600 segundos)
  const [timeLeft, setTimeLeft] = useState<number>(3600);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);

  useEffect(() => {
    setQuestions(generateMock30Questions(currentSubject, currentGrade));
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsExamCompleted(false);
    setTimeLeft(3600);
  }, [currentSubject, currentGrade]);

  useEffect(() => {
    if (isExamCompleted || isTimerPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExamCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamCompleted, isTimerPaused]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (optIdx: number) => {
    if (isExamCompleted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIdx
    }));
  };

  // Cálculo de resultados MINEDUC
  const results = useMemo(() => {
    let correct = 0;
    const axisScores: Record<string, { correct: number; total: number }> = {};

    questions.forEach((q) => {
      if (!axisScores[q.axis]) {
        axisScores[q.axis] = { correct: 0, total: 0 };
      }
      axisScores[q.axis].total++;

      if (answers[q.id] === q.correctIndex) {
        correct++;
        axisScores[q.axis].correct++;
      }
    });

    const percent = Math.round((correct / questions.length) * 100);

    // Escala Chilena 1.0 a 7.0 al 60% de exigencia (18 de 30 para nota 4.0)
    let nota = 1.0;
    if (correct >= 18) {
      nota = 4.0 + ((correct - 18) / 12) * 3.0;
    } else {
      nota = 1.0 + (correct / 18) * 3.0;
    }
    const notaFormatted = (Math.round(nota * 10) / 10).toFixed(1);

    return {
      correct,
      total: questions.length,
      percent,
      notaFormatted,
      isApproved: correct >= 18,
      axisScores
    };
  }, [answers, questions]);

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${
      isDark ? 'bg-[#0A192F] text-[#F8FAFC]' : 'bg-[#F4F6F9] text-[#1C3257]'
    }`}>
      {/* HEADER DE EVALUACIÓN OFICIAL */}
      <header className={`border-b sticky top-0 z-30 px-4 sm:px-8 py-3.5 transition-colors duration-300 ${
        isDark ? 'bg-[#10223D] border-[#1C3257]' : 'bg-white/90 backdrop-blur-md border-slate-200'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode('student')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer bg-slate-100 hover:bg-slate-200 text-[#1C3257]"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Volver a la App</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#12A1A4]">Simulador Oficial MINEDUC</span>
              <span className="text-slate-400">·</span>
              <span className="text-xs font-semibold">{currentGrade}</span>
              <span className="text-slate-400">·</span>
              <span className="text-xs font-semibold text-[#F8AD22]">{currentSubject}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Temporizador */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs ${
              timeLeft < 300 ? 'bg-red-50 border-red-300 text-red-600' : 'bg-slate-100 border-slate-200 text-[#1C3257]'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timeLeft)}</span>
              {!isExamCompleted && (
                <button
                  type="button"
                  onClick={() => setIsTimerPaused(!isTimerPaused)}
                  className="ml-1 text-slate-500 hover:text-slate-800"
                  title={isTimerPaused ? 'Reanudar' : 'Pausar'}
                >
                  {isTimerPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                </button>
              )}
            </div>

            {/* Progreso */}
            <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-[#12A1A4]">
              Respondidas: {answeredCount} de {questions.length}
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto w-full p-4 sm:p-8 flex-1">
        {!isExamCompleted ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* HOJA DE PREGUNTA ACTUAL (COL 1-3) */}
            <div className="lg:col-span-3 space-y-6">
              <div className={`p-6 rounded-3xl border shadow-xs ${
                isDark ? 'bg-[#10223D] border-[#1C3257]' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1C3257] text-white">
                      Ítem {currentQ.id} de 30
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#EDF2F7] text-[#1C3257]">
                      {currentQ.axis}
                    </span>
                    <span className="text-xs text-slate-400">({currentQ.oaRef})</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Examen Acumulativo</span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-[#1C3257] dark:text-white mb-6 leading-relaxed">
                  {currentQ.question}
                </h2>

                {/* OPCIONES A, B, C, D */}
                <div className="space-y-3">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = answers[currentQ.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-teal-50 border-[#12A1A4] text-[#1C3257] shadow-xs'
                            : isDark
                              ? 'bg-[#0A192F] border-[#1C3257] text-slate-200 hover:border-slate-500'
                              : 'bg-slate-50/70 border-slate-200 text-[#2D3748] hover:bg-slate-100/80 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#12A1A4] text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span className="text-sm font-medium leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* NAVEGACIÓN ANTERIOR / SIGUIENTE */}
                <div className="flex items-center justify-between pt-8 mt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Pregunta Anterior</span>
                  </button>

                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#12A1A4] hover:bg-[#0e8082] text-white font-bold text-xs shadow-xs cursor-pointer"
                    >
                      <span>Siguiente Pregunta</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsExamCompleted(true)}
                      className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#EE751C] hover:bg-[#d86614] text-white font-bold text-xs shadow-md cursor-pointer animate-pulse"
                    >
                      <span>Finalizar y Evaluar Examen</span>
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* HOJA DE RESPUESTAS DIGITAL (COL 4) */}
            <div className="lg:col-span-1 space-y-4">
              <div className={`p-5 rounded-3xl border shadow-xs ${
                isDark ? 'bg-[#10223D] border-[#1C3257]' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Hoja de Respuestas Digital
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, idx) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isCurrent = idx === currentQuestionIndex;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`w-full aspect-square rounded-xl text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                          isCurrent
                            ? 'ring-2 ring-[#EE751C] bg-[#1C3257] text-white'
                            : isAnswered
                              ? 'bg-[#12A1A4] text-white'
                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {q.id}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-md bg-[#12A1A4]"></span>
                    <span>Respondida</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-md bg-slate-200"></span>
                    <span>Pendiente</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-md ring-2 ring-[#EE751C] bg-[#1C3257]"></span>
                    <span>Pregunta Actual</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsExamCompleted(true)}
                  className="w-full mt-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-all cursor-pointer"
                >
                  Entregar Examen Ahora
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* PANTALLA DE RESULTADOS Y DIAGNÓSTICO FORMAL MINEDUC */
          <div className="max-w-3xl mx-auto space-y-6">
            <div className={`p-8 rounded-3xl border shadow-lg text-center ${
              isDark ? 'bg-[#10223D] border-[#1C3257]' : 'bg-white border-slate-200'
            }`}>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-teal-50 text-[#12A1A4]">
                <Award className="w-8 h-8" />
              </div>

              <span className="text-xs uppercase font-extrabold tracking-widest text-[#12A1A4]">
                Informe Oficial de Resultados · Examen Libre
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1C3257] dark:text-white mt-1 mb-2">
                {results.isApproved ? 'Examen Aprobado Conforme' : 'Examen Completado · Requiere Refuerzo'}
              </h2>
              <p className="text-xs text-slate-500 max-w-lg mx-auto">
                Evaluación formal correspondiente a {currentSubject} ({currentGrade}), calibrada bajo el estándar de exigencia del 60% del MINEDUC.
              </p>

              {/* TARJETAS DE NOTA Y PUNTAJE */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 max-w-xl mx-auto">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-500 block">Nota Estimada</span>
                  <span className={`text-3xl font-black ${
                    results.isApproved ? 'text-[#55A34A]' : 'text-red-500'
                  }`}>
                    {results.notaFormatted}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Escala 1.0 a 7.0</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-500 block">Aciertos Totales</span>
                  <span className="text-3xl font-black text-[#1C3257]">
                    {results.correct} <span className="text-base text-slate-400">/ 30</span>
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{results.percent}% de logro</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-500 block">Dictamen Formal</span>
                  <span className={`text-base font-black mt-2 block ${
                    results.isApproved ? 'text-[#55A34A]' : 'text-amber-600'
                  }`}>
                    {results.isApproved ? 'APROBADO' : 'REFUERZO'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Umbral: 18 aciertos (60%)</span>
                </div>
              </div>

              {/* DESGLOSE POR EJES COGNITIVOS */}
              <div className="text-left max-w-xl mx-auto space-y-3 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Desglose Diagnóstico por Habilidad Curricular
                </h4>
                {Object.entries(results.axisScores).map(([axisName, data]) => {
                  const p = Math.round((data.correct / data.total) * 100);
                  return (
                    <div key={axisName} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#1C3257]">{axisName}</span>
                        <span className="text-slate-500">{data.correct} de {data.total} ({p}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-[#12A1A4] rounded-full transition-all duration-500"
                          style={{ width: `${p}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* BOTONES DE ACCIÓN */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setAnswers({});
                    setCurrentQuestionIndex(0);
                    setIsExamCompleted(false);
                    setTimeLeft(3600);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-[#1C3257] hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Rendir Nuevo Ensayo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('student')}
                  className="px-6 py-2.5 rounded-xl bg-[#12A1A4] hover:bg-[#0e8082] text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  <span>Volver al Dashboard del Estudiante</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
