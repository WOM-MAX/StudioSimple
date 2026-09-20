import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { LessonSessionState, SyncViewMode, LessonStage, LessonData } from '../types/lesson';
import { MATEMATICA_7B_OA01_CLASE01 } from '../data/lessons/matematica_7b_oa01_clase01';

const SYNC_CHANNEL_NAME = 'estudiosimple_lesson_sync_channel';
const STORAGE_KEY = 'estudiosimple_active_lesson_session';

export const INITIAL_LESSON_SESSION: LessonSessionState = {
  stage: 'cover',
  activeOa: 'OA 1',
  activeLessonNum: 1,
  feedback: null,
  conversationIndex: 0,
  practiceIndex: 0,
  hookStarted: false,
  hookEnded: false,
  formalStarted: false,
  formalEnded: false,
  miniAnswers: ['', '', ''],
  miniScore: 0,
  reviewIndex: 0,
  recoveryIndex: 0,
  recoveryVisible: false,
  recoveryResults: [],
  closureState: 'none',
  isOxygenPauseActive: false,
  studentConnected: true
};

interface LessonSyncContextType {
  session: LessonSessionState;
  lessonData: LessonData;
  viewMode: SyncViewMode;
  setViewMode: (mode: SyncViewMode) => void;
  updateSession: (patch: Partial<LessonSessionState> | ((prev: LessonSessionState) => LessonSessionState)) => void;
  resetSession: () => void;
  setStage: (stage: LessonStage) => void;
  toggleOxygenPause: () => void;
  setFeedback: (feedback: { kind: 'success' | 'support' | 'info'; text: string } | null) => void;
  openNewWindow: (mode: 'adult' | 'student') => void;
}

const LessonSyncContext = createContext<LessonSyncContextType | undefined>(undefined);

export const LessonSyncProvider: React.FC<{ children: React.ReactNode; initialLesson?: LessonData }> = ({
  children,
  initialLesson = MATEMATICA_7B_OA01_CLASE01
}) => {
  const [viewMode, setViewModeState] = useState<SyncViewMode>(() => {
    if (typeof window !== 'undefined') {
      const urlMode = new URLSearchParams(window.location.search).get('mode') as SyncViewMode;
      if (urlMode === 'adult' || urlMode === 'student' || urlMode === 'split') {
        return urlMode;
      }
    }
    return 'split';
  });

  const [session, setSessionState] = useState<LessonSessionState>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return { ...INITIAL_LESSON_SESSION, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.error('Error reading saved session:', e);
      }
    }
    return INITIAL_LESSON_SESSION;
  });

  const channelRef = useRef<BroadcastChannel | null>(null);

  // Setup BroadcastChannel for Real-time tab sync
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
      channelRef.current = channel;

      channel.onmessage = (event) => {
        if (event.data && typeof event.data === 'object') {
          setSessionState((prev) => ({ ...prev, ...event.data }));
        }
      };

      return () => {
        channel.close();
      };
    } catch (e) {
      console.warn('BroadcastChannel not supported in this environment:', e);
    }
  }, []);

  const updateSession = useCallback((patch: Partial<LessonSessionState> | ((prev: LessonSessionState) => LessonSessionState)) => {
    setSessionState((prev) => {
      const updated = typeof patch === 'function' ? patch(prev) : { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        channelRef.current?.postMessage(updated);
      } catch (e) {
        console.error('Error broadcasting update:', e);
      }
      return updated;
    });
  }, []);

  const resetSession = useCallback(() => {
    updateSession(() => ({ ...INITIAL_LESSON_SESSION }));
  }, [updateSession]);

  const setStage = useCallback((stage: LessonStage) => {
    updateSession({ stage, feedback: null });
  }, [updateSession]);

  const toggleOxygenPause = useCallback(() => {
    updateSession((prev) => ({ ...prev, isOxygenPauseActive: !prev.isOxygenPauseActive }));
  }, [updateSession]);

  const setFeedback = useCallback((feedback: { kind: 'success' | 'support' | 'info'; text: string } | null) => {
    updateSession({ feedback });
  }, [updateSession]);

  const setViewMode = useCallback((mode: SyncViewMode) => {
    setViewModeState(mode);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('mode', mode);
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  const openNewWindow = useCallback((mode: 'adult' | 'student') => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('mode', mode);
      window.open(url.toString(), '_blank', 'noopener,noreferrer');
    }
  }, []);

  return (
    <LessonSyncContext.Provider
      value={{
        session,
        lessonData: initialLesson,
        viewMode,
        setViewMode,
        updateSession,
        resetSession,
        setStage,
        toggleOxygenPause,
        setFeedback,
        openNewWindow
      }}
    >
      {children}
    </LessonSyncContext.Provider>
  );
};

export const useLessonSync = (): LessonSyncContextType => {
  const context = useContext(LessonSyncContext);
  if (!context) {
    throw new Error('useLessonSync must be used within a LessonSyncProvider');
  }
  return context;
};
