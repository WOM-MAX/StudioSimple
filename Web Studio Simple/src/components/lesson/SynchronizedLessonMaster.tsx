import React, { useMemo } from 'react';
import { LessonSyncProvider, useLessonSync } from '../../context/LessonSyncContext';
import { TesterBar } from './common/TesterBar';
import { AdultLessonView } from './adult/AdultLessonView';
import { StudentLessonView } from './student/StudentLessonView';
import { LessonData } from '../../types/lesson';
import { MATEMATICA_7B_OA01_CLASE01 } from '../../data/lessons/matematica_7b_oa01_clase01';
import { findInjectedLesson } from '../../lib/lesson-repository';

const SynchronizedLessonContainer: React.FC = () => {
  const { viewMode } = useLessonSync();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e8edf2] p-3 sm:p-5 font-sans">
      {/* Dev and Testing Control Bar */}
      <TesterBar />

      {/* Synchronized Screen Layout */}
      <main
        className={`max-w-[1800px] mx-auto gap-4 items-start transition-all duration-300 ${
          viewMode === 'split'
            ? 'grid grid-cols-1 lg:grid-cols-2'
            : 'flex justify-center max-w-5xl'
        }`}
      >
        {/* ADULT / HOST VIEW */}
        {viewMode !== 'student' && (
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
        {viewMode !== 'adult' && (
          <div className="w-full flex flex-col">
            {viewMode === 'split' && (
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
    <LessonSyncProvider key={syncKey} initialLesson={resolvedLesson}>
      <SynchronizedLessonContainer />
    </LessonSyncProvider>
  );
};

export default SynchronizedLessonMaster;
