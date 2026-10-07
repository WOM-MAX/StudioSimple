import React, { useMemo } from 'react';
import { LessonSyncProvider, useLessonSync } from '../../context/LessonSyncContext';
import { useApp } from '../../context/AppContext';
import { TesterBar } from './common/TesterBar';
import { AdultLessonView } from './adult/AdultLessonView';
import { StudentLessonView } from './student/StudentLessonView';
import { LessonData } from '../../types/lesson';
import { MATEMATICA_7B_OA01_CLASE01 } from '../../data/lessons/matematica_7b_oa01_clase01';
import { findInjectedLesson } from '../../lib/lesson-repository';
import { ArrowLeft } from 'lucide-react';

const SynchronizedLessonContainer: React.FC = () => {
  const { viewMode } = useLessonSync();
  const { authSession, setViewMode: setAppViewMode } = useApp();
  const isStudent = authSession?.role === 'student';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e8edf2] p-3 sm:p-5 font-sans">
      {/* Dev and Testing Control Bar (Solo visible para Apoderado / Admin) */}
      {!isStudent && <TesterBar />}

      {/* Cabecera limpia y amena para el Estudiante (Sin respuestas ni controles de mentor) */}
      {isStudent && (
        <header className="bg-white/95 border border-[#d9dde2] rounded-2xl flex items-center justify-between gap-3 max-w-5xl min-h-[52px] mx-auto mb-4 px-4 py-2 shadow-xs backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[#1C3257] font-extrabold text-xs">
              EstudioSimple · Aula del Estudiante
            </span>
          </div>
          <button
            type="button"
            onClick={() => setAppViewMode('student')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1C3257] text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#EE751C]" />
            <span>Volver a mis clases</span>
          </button>
        </header>
      )}

      {/* Synchronized Screen Layout */}
      <main
        className={`max-w-[1800px] mx-auto gap-4 items-start transition-all duration-300 ${
          !isStudent && viewMode === 'split'
            ? 'grid grid-cols-1 lg:grid-cols-2'
            : 'flex justify-center max-w-5xl'
        }`}
      >
        {/* ADULT / HOST VIEW (ESTRICTAMENTE PROHIBIDO PARA ESTUDIANTE) */}
        {!isStudent && viewMode !== 'student' && (
          <div className="w-full flex flex-col">
            {viewMode === 'split' && (
              <span className="text-[11px] font-bold tracking-wider text-[#6d7889] uppercase mb-1.5 ml-2">
                Vista del Apoderado (Mentor / Host)
              </span>
            )}
            <AdultLessonView />
          </div>
        )}

        {/* STUDENT / CLIENT VIEW */}
        {(isStudent || viewMode !== 'adult') && (
          <div className="w-full flex flex-col">
            {!isStudent && viewMode === 'split' && (
              <span className="text-[11px] font-bold tracking-wider text-[#6d7889] uppercase mb-1.5 ml-2">
                Vista del Estudiante (Participante / Cliente)
              </span>
            )}
            <StudentLessonView />
          </div>
        )}
      </main>
    </div>
  );
};

export const SynchronizedLessonMaster: React.FC<{ lessonData?: LessonData }> = ({
  lessonData
}) => {
  const { authSession } = useApp();

  const resolvedLesson = useMemo(() => {
    if (lessonData) return lessonData;
    const defaultMeta = MATEMATICA_7B_OA01_CLASE01.metadata;
    const injected = findInjectedLesson(
      defaultMeta.grade,
      defaultMeta.subject,
      defaultMeta.oaCode,
      defaultMeta.lessonNumber
    );
    return injected || MATEMATICA_7B_OA01_CLASE01;
  }, [lessonData]);

  // Dynamic key ensures that changing lessonData or its videoSrc completely resets and re-renders the Provider
  const syncKey = `${resolvedLesson.metadata.grade}_${resolvedLesson.metadata.subject}_${resolvedLesson.metadata.oaCode}_${resolvedLesson.metadata.lessonNumber}_${resolvedLesson.hook.videoSrc || 'nohook'}_${resolvedLesson.formalization.videoSrc || 'noformal'}`;

  return (
    <LessonSyncProvider key={syncKey} initialLesson={resolvedLesson} userRole={authSession?.role}>
      <SynchronizedLessonContainer />
    </LessonSyncProvider>
  );
};

export default SynchronizedLessonMaster;
