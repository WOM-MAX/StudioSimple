import React from 'react';
import { SyncViewMode } from '../../../types/lesson';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { useApp } from '../../../context/AppContext';
import { MATEMATICA_7B_OA01_CLASE01, MATEMATICA_7B_OA01_CLASE02 } from '../../../data/lessons';
import { findInjectedLesson } from '../../../lib/lesson-repository';
import { Monitor, UserRound, UsersRound, ExternalLink, RotateCcw, HeartPulse, ArrowLeft, Home, BookOpen } from 'lucide-react';

export const TesterBar: React.FC = () => {
  const { viewMode, setViewMode, resetSession, openNewWindow, session, toggleOxygenPause, lessonData } = useLessonSync();
  const { setViewMode: setAppViewMode, setActiveSynchronizedLesson } = useApp();

  return (
    <header className="bg-white/95 border border-[#d9dde2] rounded-2xl flex items-center justify-between gap-4 max-w-[1800px] min-h-[62px] mx-auto mb-4 px-4 py-2 shadow-sm backdrop-blur-sm">
      {/* Title & Return */}
      <div className="flex items-center gap-2 min-w-[320px]">
        <button
          type="button"
          onClick={() => setAppViewMode('landing')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#12A1A4] hover:bg-[#18B8BB] text-white font-bold text-xs shadow-sm transition-all"
          title="Volver a la Página de Inicio (Landing)"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Inicio</span>
        </button>

        <button
          type="button"
          onClick={() => setAppViewMode('parent')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EE751C] hover:bg-[#F57C00] text-white font-bold text-xs shadow-sm transition-all"
          title="Volver al Catálogo y Plan de Clases"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Catálogo de Clases</span>
        </button>

        <button
          type="button"
          onClick={() => setAppViewMode('courses')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1c3257] hover:bg-[#284773] text-white font-bold text-xs shadow-sm transition-all"
          title="Volver a la Selección de Cursos"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cursos</span>
        </button>

        <div className="flex flex-col border-l border-slate-200 pl-3">
          <span className="text-[#1C3257] font-extrabold text-xs tracking-tight">EstudioSimple · Aula Sincronizada</span>
          <span className="text-slate-500 text-[10px]">
            {lessonData.metadata.grade} : {lessonData.metadata.subject} : Clase {lessonData.metadata.lessonNumber}
          </span>
        </div>

        {/* Quick Subject Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 ml-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-1.5">
            Materia:
          </span>
          <button
            type="button"
            onClick={() => {
              const l = findInjectedLesson('7° Básico', 'Matemática', 'OA 1', 1);
              if (l) setActiveSynchronizedLesson(l);
            }}
            className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              lessonData.metadata.subject.includes('Mat') ? 'bg-[#1C3257] text-white shadow-xs' : 'text-slate-600 hover:bg-white'
            }`}
            title="Matemática OA 01"
          >
            Mat
          </button>
          <button
            type="button"
            onClick={() => {
              const l = findInjectedLesson('7° Básico', 'Lengua y Literatura', 'OA 3', 1);
              if (l) setActiveSynchronizedLesson(l);
            }}
            className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              lessonData.metadata.subject.includes('Leng') ? 'bg-[#EE751C] text-white shadow-xs' : 'text-slate-600 hover:bg-white'
            }`}
            title="Lengua y Literatura OA 03"
          >
            Len
          </button>
          <button
            type="button"
            onClick={() => {
              const l = findInjectedLesson('7° Básico', 'Ciencias Naturales', 'OA 1', 1);
              if (l) setActiveSynchronizedLesson(l);
            }}
            className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              lessonData.metadata.subject.includes('Cien') ? 'bg-[#10B981] text-white shadow-xs' : 'text-slate-600 hover:bg-white'
            }`}
            title="Ciencias Naturales OA 01"
          >
            Cie
          </button>
          <button
            type="button"
            onClick={() => {
              const l = findInjectedLesson('7° Básico', 'Historia, Geografía y Ciencias Sociales', 'OA 2', 1);
              if (l) setActiveSynchronizedLesson(l);
            }}
            className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              lessonData.metadata.subject.includes('Hist') ? 'bg-[#8C52FF] text-white shadow-xs' : 'text-slate-600 hover:bg-white'
            }`}
            title="Historia y Geografía OA 02"
          >
            His
          </button>
          <button
            type="button"
            onClick={() => {
              const l = findInjectedLesson('7° Básico', 'Idioma Extranjero Inglés', 'OA 9', 1);
              if (l) setActiveSynchronizedLesson(l);
            }}
            className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              lessonData.metadata.subject.includes('Ing') ? 'bg-[#4A964E] text-white shadow-xs' : 'text-slate-600 hover:bg-white'
            }`}
            title="Inglés OA 09"
          >
            Ing
          </button>
        </div>

        {/* Quick Lesson Switcher (Clases 1 a 5) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 ml-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-1.5">
            Clase:
          </span>
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => {
                const l = findInjectedLesson(
                  lessonData.metadata.grade,
                  lessonData.metadata.subject,
                  lessonData.metadata.oaCode,
                  num
                );
                if (l) setActiveSynchronizedLesson(l);
              }}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                lessonData.metadata.lessonNumber === num
                  ? 'bg-[#1C3257] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-white'
              }`}
              title={`Clase ${num}`}
            >
              0{num}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Switch: Split / Adult / Student */}
      <div className="bg-[#eef1f3] rounded-xl p-1 flex items-center gap-1">
        <button
          type="button"
          onClick={() => setViewMode('split')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            viewMode === 'split' ? 'bg-white text-[#1c3257] shadow-sm' : 'text-[#657185] hover:text-[#1c3257]'
          }`}
        >
          <UsersRound className="w-3.5 h-3.5" />
          <span>Ambas pantallas (Split)</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('adult')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            viewMode === 'adult' ? 'bg-white text-[#1c3257] shadow-sm' : 'text-[#657185] hover:text-[#1c3257]'
          }`}
        >
          <UserRound className="w-3.5 h-3.5" />
          <span>Solo Adulto (Host)</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('student')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            viewMode === 'student' ? 'bg-white text-[#1c3257] shadow-sm' : 'text-[#657185] hover:text-[#1c3257]'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Solo Estudiante (Cliente)</span>
        </button>
      </div>

      {/* External Launch & Tools */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleOxygenPause}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            session.isOxygenPauseActive
              ? 'bg-[#fff0e4] border-[#ee751c] text-[#ee751c]'
              : 'border-[#dce2e6] text-[#657185] hover:bg-[#f5f7f9]'
          }`}
          title="Pausa de Oxígeno para autorregulación emocional"
        >
          <HeartPulse className="w-3.5 h-3.5 text-[#ee751c]" />
          <span>{session.isOxygenPauseActive ? 'Reanudar Clase' : 'Pausa de Oxígeno'}</span>
        </button>

        <button
          type="button"
          onClick={() => openNewWindow('adult')}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-[#657185] hover:bg-[#f2f4f5] hover:text-[#1c3257] transition-colors"
          title="Abrir vista adulto en monitor secundario"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Adulto</span>
        </button>

        <button
          type="button"
          onClick={() => openNewWindow('student')}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-[#657185] hover:bg-[#f2f4f5] hover:text-[#1c3257] transition-colors"
          title="Abrir vista estudiante en tablet o segundo monitor"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Estudiante</span>
        </button>

        <button
          type="button"
          onClick={resetSession}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-[#657185] hover:bg-[#fee2e2] hover:text-[#dc2626] transition-colors"
          title="Reiniciar sesión de la clase"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar</span>
        </button>
      </div>
    </header>
  );
};
