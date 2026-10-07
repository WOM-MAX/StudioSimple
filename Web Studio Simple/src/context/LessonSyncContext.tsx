import React, { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { LessonSessionState, SyncViewMode, LessonStage, LessonData } from '../types/lesson';
import { AuthRole } from '../types';
import { MATEMATICA_7B_OA01_CLASE01 } from '../data/lessons/matematica_7b_oa01_clase01';

const SYNC_CHANNEL_NAME = 'estudiosimple_lesson_sync_channel';
const STORAGE_KEY = 'estudiosimple_active_lesson_session';

export const INITIAL_LESSON_SESSION: LessonSessionState = {
  stage: 'cover',
  activeOa: 'OA 1',
  activeLessonNum: 1,
  feedback: null,
  attempt: 0,
  conversationIndex: 0,
  postIndex: 0,
  practiceIndex: 0,
  summaryIdea: 0,
  quizVisible: false,
  hookStarted: false,
  hookEnded: false,
  formalStarted: false,
  formalEnded: false,
  video: { kind: null, playing: false, seek: 0, command: 0 },
  miniAnswers: ['', '', ''],
  miniScore: 0,
  reviewQueue: [],
  reviewIndex: 0,
  recoveryItems: [],
  recoveryIndex: 0,
  recoveryVisible: false,
  recoveryAnswer: '',
  supportCount: 0,
  reasoningIndependent: false,
  challengeCompleted: false,
  closureState: 'none',
  isOxygenPauseActive: false,
  studentConnected: true,
  studentTextAnswers: {},
  studentSubmissionStatus: 'writing'
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
  setFeedback: (feedback: { kind: 'success' | 'support' | 'reveal' | 'info'; text: string } | null) => void;
  openNewWindow: (mode: 'adult' | 'student') => void;
  // Respuestas escritas del estudiante en vivo
  submitStudentAnswer: (questionKey: string, answer: string) => void;
  // Propiedades de enlace remoto multi-dispositivo
  roomCode: string;
  remoteConnected: boolean;
  peerRoleConnected: boolean;
  activeClientsCount: number;
}

const LessonSyncContext = createContext<LessonSyncContextType | undefined>(undefined);

export const LessonSyncProvider: React.FC<{
  children: React.ReactNode;
  initialLesson?: LessonData;
  userRole?: AuthRole;
  roomCode?: string;
}> = ({
  children,
  initialLesson = MATEMATICA_7B_OA01_CLASE01,
  userRole,
  roomCode: initialRoomCode
}) => {
  const isStudentRole = userRole === 'student';

  // Identificador de cliente único por pestaña/dispositivo para evitar bucles de eco
  const clientIdRef = useRef<string>(`client-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`);

  // Derivación determinista del roomCode a partir de PIN familiar o parámetro
  const effectiveRoomCode = useMemo(() => {
    if (initialRoomCode && initialRoomCode.trim()) return initialRoomCode.trim();
    if (typeof window !== 'undefined') {
      const urlParam = new URLSearchParams(window.location.search).get('room');
      if (urlParam && urlParam.trim()) return `room-${urlParam.trim()}`;
      try {
        const studentRaw = localStorage.getItem('estudio_simple_student');
        if (studentRaw) {
          const s = JSON.parse(studentRaw);
          if (s?.pin) return `room-${s.pin}`;
        }
        const parentRaw = localStorage.getItem('estudio_simple_parent');
        if (parentRaw) {
          const p = JSON.parse(parentRaw);
          if (p?.studentPin) return `room-${p.studentPin}`;
          if (p?.id) return `room-${p.id}`;
        }
      } catch {}
    }
    return 'room-estudiosimple';
  }, [initialRoomCode]);

  const [viewMode, setViewModeState] = useState<SyncViewMode>(() => {
    if (isStudentRole) {
      return 'student';
    }
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
          const parsed = JSON.parse(saved);
          if (
            parsed.activeOa === initialLesson.metadata.oaCode &&
            parsed.activeLessonNum === initialLesson.metadata.lessonNumber
          ) {
            return { ...INITIAL_LESSON_SESSION, ...parsed };
          }
        }
      } catch (e) {
        console.error('Error reading saved session:', e);
      }
    }
    return {
      ...INITIAL_LESSON_SESSION,
      activeOa: initialLesson.metadata.oaCode,
      activeLessonNum: initialLesson.metadata.lessonNumber
    };
  });

  const channelRef = useRef<BroadcastChannel | null>(null);

  // Estados de conexión remota
  const [remoteConnected, setRemoteConnected] = useState<boolean>(false);
  const [peerRoleConnected, setPeerRoleConnected] = useState<boolean>(() => {
    return !isStudentRole && viewMode === 'split';
  });
  const [activeClientsCount, setActiveClientsCount] = useState<number>(1);

  const currentRole = isStudentRole ? 'student' : (viewMode === 'adult' ? 'adult' : 'split');

  // 1. Transporte Local: BroadcastChannel (0ms entre pestañas en el mismo PC)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
      channelRef.current = channel;

      channel.onmessage = (event) => {
        if (event.data && typeof event.data === 'object') {
          if (event.data.isReset) {
            setSessionState({ ...INITIAL_LESSON_SESSION, ...event.data });
          } else {
            setSessionState((prev) => ({ ...prev, ...event.data }));
          }
        }
      };

      return () => {
        channel.close();
      };
    } catch (e) {
      console.warn('BroadcastChannel not supported in this environment:', e);
    }
  }, []);

  // 2. Transporte Remoto: Publicación HTTP hacia in-memory relay con debounce inteligente
  const debouncePostRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const postSyncToServer = useCallback((stateToSync: LessonSessionState, immediate: boolean = false, isReset: boolean = false) => {
    if (typeof fetch !== 'function') return;

    const executePost = () => {
      fetch('/api/classroom/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode: effectiveRoomCode,
          session: stateToSync,
          clientId: clientIdRef.current,
          role: currentRole,
          isReset
        })
      })
        .then((res) => {
          if (res.ok) {
            setRemoteConnected(true);
          }
        })
        .catch((err) => {
          console.warn('[LessonSync] Advertencia de envío remoto:', err);
        });
    };

    if (debouncePostRef.current) {
      clearTimeout(debouncePostRef.current);
      debouncePostRef.current = null;
    }

    if (immediate) {
      executePost();
    } else {
      debouncePostRef.current = setTimeout(executePost, 50);
    }
  }, [effectiveRoomCode, currentRole]);

  // 3. Transporte Remoto: Escucha en tiempo real vía SSE con fallback automático a polling HTTP
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let eventSource: EventSource | null = null;
    let fallbackInterval: ReturnType<typeof setInterval> | null = null;
    let isMounted = true;

    const pollFallback = async () => {
      try {
        const res = await fetch(`/api/classroom/sync?roomCode=${encodeURIComponent(effectiveRoomCode)}`);
        if (res.ok && isMounted) {
          const json = await res.json();
          if (json.success && json.session) {
            setRemoteConnected(true);
            setActiveClientsCount(json.activeClients || 1);
            if (isStudentRole) {
              setPeerRoleConnected(Boolean(json.hasAdult || viewMode === 'split'));
            } else {
              setPeerRoleConnected(Boolean(json.hasStudent || viewMode === 'split'));
            }
            setSessionState((prev) => {
              const incoming = json.session;
              if (
                incoming.activeOa === initialLesson.metadata.oaCode &&
                incoming.activeLessonNum === initialLesson.metadata.lessonNumber
              ) {
                try {
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(incoming));
                } catch {}
                const isReset = Boolean(
                  json.isReset ||
                  (incoming.stage === 'cover' && incoming.attempt === 0 && (!incoming.studentTextAnswers || Object.keys(incoming.studentTextAnswers).length === 0))
                );
                if (isReset) {
                  return { ...INITIAL_LESSON_SESSION, ...incoming };
                }
                return { ...prev, ...incoming };
              }
              return prev;
            });
          }
        }
      } catch {}
    };

    try {
      const streamUrl = `/api/classroom/stream?roomCode=${encodeURIComponent(effectiveRoomCode)}&role=${encodeURIComponent(currentRole)}&clientId=${encodeURIComponent(clientIdRef.current)}`;
      eventSource = new EventSource(streamUrl);

      eventSource.onopen = () => {
        if (!isMounted) return;
        setRemoteConnected(true);
      };

      eventSource.onmessage = (event) => {
        if (!isMounted) return;
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'init' || data.type === 'sync') {
            // Ignorar eco si vino de este mismo cliente
            if (data.senderClientId && data.senderClientId === clientIdRef.current) {
              return;
            }
            if (data.session) {
              setSessionState((prev) => {
                const incoming = data.session;
                if (
                  incoming.activeOa === initialLesson.metadata.oaCode &&
                  incoming.activeLessonNum === initialLesson.metadata.lessonNumber
                ) {
                  try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(incoming));
                  } catch {}
                  if (data.isReset) {
                    return { ...INITIAL_LESSON_SESSION, ...incoming };
                  }
                  return { ...prev, ...incoming };
                }
                return prev;
              });
            }
          }

          if (data.activeClients !== undefined) {
            setActiveClientsCount(data.activeClients);
          }

          if (isStudentRole) {
            const adultConnected = Boolean(data.hasAdult || (data.peerRoles && (data.peerRoles.includes('adult') || data.peerRoles.includes('split'))));
            setPeerRoleConnected(adultConnected);
          } else {
            const studentConnected = Boolean(data.hasStudent || (data.peerRoles && (data.peerRoles.includes('student') || data.peerRoles.includes('split'))) || viewMode === 'split');
            setPeerRoleConnected(studentConnected);
          }
        } catch (e) {
          console.warn('[LessonSync] Error analizando evento SSE:', e);
        }
      };

      eventSource.onerror = () => {
        if (!isMounted) return;
        setRemoteConnected(false);
        if (!fallbackInterval) {
          fallbackInterval = setInterval(pollFallback, 1500);
        }
      };
    } catch (e) {
      console.warn('[LessonSync] SSE no disponible, iniciando polling de contingencia:', e);
      fallbackInterval = setInterval(pollFallback, 1500);
    }

    // Consulta inicial inmediata
    pollFallback();

    return () => {
      isMounted = false;
      if (eventSource) {
        eventSource.close();
      }
      if (fallbackInterval) {
        clearInterval(fallbackInterval);
      }
      if (debouncePostRef.current) {
        clearTimeout(debouncePostRef.current);
      }
    };
  }, [effectiveRoomCode, currentRole, initialLesson.metadata.oaCode, initialLesson.metadata.lessonNumber, isStudentRole, viewMode]);

  // Sincronizar session.studentConnected con peerRoleConnected para el rol adulto
  useEffect(() => {
    if (!isStudentRole) {
      setSessionState((prev) => {
        if (prev.studentConnected !== peerRoleConnected) {
          return { ...prev, studentConnected: peerRoleConnected };
        }
        return prev;
      });
    }
  }, [peerRoleConnected, isStudentRole]);

  // Reiniciar estado si cambia la lección activa
  useEffect(() => {
    if (
      session.activeOa !== initialLesson.metadata.oaCode ||
      session.activeLessonNum !== initialLesson.metadata.lessonNumber
    ) {
      const cleanSession: LessonSessionState = {
        ...INITIAL_LESSON_SESSION,
        activeOa: initialLesson.metadata.oaCode,
        activeLessonNum: initialLesson.metadata.lessonNumber
      };
      setSessionState(cleanSession);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanSession));
        channelRef.current?.postMessage({ ...cleanSession, isReset: true });
      } catch (e) {
        console.error('Error resetting session for new lesson:', e);
      }
      postSyncToServer(cleanSession, true, true);
    }
  }, [initialLesson.metadata.oaCode, initialLesson.metadata.lessonNumber, session.activeOa, session.activeLessonNum, postSyncToServer]);

  const updateSession = useCallback((patch: Partial<LessonSessionState> | ((prev: LessonSessionState) => LessonSessionState)) => {
    setSessionState((prev) => {
      const updated = typeof patch === 'function' ? patch(prev) : { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        channelRef.current?.postMessage(updated);
      } catch (e) {
        console.error('Error broadcasting update:', e);
      }
      const isCritical = ('stage' in updated && updated.stage !== prev.stage) ||
                         ('video' in updated && updated.video.command !== prev.video.command);
      postSyncToServer(updated, isCritical);
      return updated;
    });
  }, [postSyncToServer]);

  const resetSession = useCallback(() => {
    const cleanSession: LessonSessionState = {
      ...INITIAL_LESSON_SESSION,
      activeOa: initialLesson.metadata.oaCode,
      activeLessonNum: initialLesson.metadata.lessonNumber,
      studentConnected: peerRoleConnected
    };
    setSessionState(cleanSession);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanSession));
      channelRef.current?.postMessage({ ...cleanSession, isReset: true });
    } catch (e) {
      console.error('Error resetting session:', e);
    }
    postSyncToServer(cleanSession, true, true);
  }, [initialLesson.metadata.oaCode, initialLesson.metadata.lessonNumber, peerRoleConnected, postSyncToServer]);

  const setStage = useCallback((stage: LessonStage) => {
    updateSession({ stage, feedback: null });
  }, [updateSession]);

  const toggleOxygenPause = useCallback(() => {
    updateSession((prev) => ({ ...prev, isOxygenPauseActive: !prev.isOxygenPauseActive }));
  }, [updateSession]);

  const setFeedback = useCallback((feedback: { kind: 'success' | 'support' | 'reveal' | 'info'; text: string } | null) => {
    updateSession({ feedback });
  }, [updateSession]);

  const setViewMode = useCallback((mode: SyncViewMode) => {
    if (isStudentRole && mode !== 'student') {
      return;
    }
    setViewModeState(mode);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('mode', mode);
      window.history.replaceState({}, '', url.toString());
    }
  }, [isStudentRole]);

  const openNewWindow = useCallback((mode: 'adult' | 'student') => {
    if (isStudentRole && mode !== 'student') {
      return;
    }
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('mode', mode);
      window.open(url.toString(), '_blank', 'noopener,noreferrer');
    }
  }, [isStudentRole]);

  const submitStudentAnswer = useCallback((questionKey: string, answer: string) => {
    updateSession((prev) => ({
      ...prev,
      studentTextAnswers: {
        ...(prev.studentTextAnswers || {}),
        [questionKey]: answer
      },
      studentSubmissionStatus: 'submitted'
    }));
  }, [updateSession]);

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
        openNewWindow,
        submitStudentAnswer,
        roomCode: effectiveRoomCode,
        remoteConnected,
        peerRoleConnected,
        activeClientsCount
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