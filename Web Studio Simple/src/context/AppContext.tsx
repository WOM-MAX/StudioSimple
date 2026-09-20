import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ViewMode, StudentProfile, ParentUser, Lesson, BrandColorOption, ThemeMode, AuthSession, AuthRole, GradeLevel } from '../types';
import { INITIAL_STUDENT, INITIAL_PARENT, SAMPLE_LESSON } from '../data/mockData';

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  student: StudentProfile;
  parent: ParentUser;
  activeLesson: Lesson;
  setActiveLesson: (lesson: Lesson) => void;
  isSensoryPauseOpen: boolean;
  setIsSensoryPauseOpen: (open: boolean) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
  headerFooterColor: BrandColorOption;
  setHeaderFooterColor: (color: BrandColorOption) => void;
  sidebarColor: BrandColorOption;
  setSidebarColor: (color: BrandColorOption) => void;
  addCuriosityPoints: (points: number) => void;
  addGems: (gems: number) => void;
  markLessonCompleted: (lessonId: string) => void;
  resetProgress: () => void;
  // Auth
  authSession: AuthSession | null;
  loginAsStudent: (pin: string) => { success: boolean; error?: string };
  loginAsParent: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  generateStudentPin: () => string;
  verifyParentPassword: (password: string) => boolean;
  navigateWithAuth: (targetMode: ViewMode) => void;
  updateEnrolledGrades: (grades: GradeLevel[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function generatePin(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewModeState] = useState<ViewMode>('landing');

  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('estudio_simple_student');
    if (!saved) return INITIAL_STUDENT;
    const parsed = JSON.parse(saved);
    return { ...INITIAL_STUDENT, ...parsed, pin: parsed.pin || INITIAL_STUDENT.pin };
  });

  const [parent, setParent] = useState<ParentUser>(() => {
    const saved = localStorage.getItem('estudio_simple_parent');
    if (!saved) return INITIAL_PARENT;
    const parsed = JSON.parse(saved);
    return { ...INITIAL_PARENT, ...parsed, password: parsed.password || INITIAL_PARENT.password };
  });

  const [authSession, setAuthSessionState] = useState<AuthSession | null>(() => {
    const saved = localStorage.getItem('estudio_simple_auth_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeLesson, setActiveLesson] = useState<Lesson>(SAMPLE_LESSON);
  const [isSensoryPauseOpen, setIsSensoryPauseOpen] = useState<boolean>(false);

  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('estudio_simple_theme_mode');
    return (saved as ThemeMode) || 'light';
  });

  const [headerFooterColor, setHeaderFooterColorState] = useState<BrandColorOption>(() => {
    const saved = localStorage.getItem('estudio_simple_hf_color');
    return (saved as BrandColorOption) || 'yellow';
  });

  const [sidebarColor, setSidebarColorState] = useState<BrandColorOption>(() => {
    const saved = localStorage.getItem('estudio_simple_sidebar_color');
    return (saved as BrandColorOption) || 'yellow';
  });

  // Persistence effects: garantizar que al recargar siempre empiece en landing
  useEffect(() => {
    localStorage.removeItem('estudio_simple_view_mode');
  }, []);

  useEffect(() => {
    localStorage.setItem('estudio_simple_student', JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem('estudio_simple_parent', JSON.stringify(parent));
  }, [parent]);

  useEffect(() => {
    if (authSession) {
      localStorage.setItem('estudio_simple_auth_session', JSON.stringify(authSession));
    } else {
      localStorage.removeItem('estudio_simple_auth_session');
    }
  }, [authSession]);

  useEffect(() => {
    localStorage.setItem('estudio_simple_hf_color', headerFooterColor);
    document.documentElement.setAttribute('data-hf-color', headerFooterColor);
  }, [headerFooterColor]);

  useEffect(() => {
    localStorage.setItem('estudio_simple_sidebar_color', sidebarColor);
    document.documentElement.setAttribute('data-sidebar', sidebarColor);
  }, [sidebarColor]);

  useEffect(() => {
    localStorage.setItem('estudio_simple_theme_mode', themeMode);
    document.documentElement.setAttribute('data-theme', themeMode);
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  // Navigation
  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (mode !== 'lesson') {
        url.searchParams.delete('mode');
        url.searchParams.delete('view');
        const cleanUrl = url.pathname + (url.search ? url.search : '');
        window.history.replaceState({}, '', cleanUrl);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth-aware navigation: redirects to login if not authenticated
  const navigateWithAuth = useCallback((targetMode: ViewMode) => {
    const protectedModes: ViewMode[] = ['student', 'parent', 'courses', 'lesson', 'admin'];
    
    if (protectedModes.includes(targetMode)) {
      if (!authSession || !authSession.isAuthenticated) {
        setViewModeState('login');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      // Admin only for admin mode
      if (targetMode === 'admin' && authSession.role !== 'admin') {
        setViewModeState('login');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      // Parent can access student dashboard (read-only monitoring)
      if (targetMode === 'student' && authSession.role === 'parent') {
        setViewModeState('student');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      // Student cannot access parent dashboard without re-auth
      if (targetMode === 'parent' && authSession.role === 'student') {
        return;
      }
      // Role matches target
      setViewModeState(targetMode);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setViewModeState(targetMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [authSession]);

  const setHeaderFooterColor = (color: BrandColorOption) => {
    setHeaderFooterColorState(color);
  };

  const setSidebarColor = (color: BrandColorOption) => {
    setSidebarColorState(color);
  };

  // Auth functions
  const loginAsStudent = (pin: string): { success: boolean; error?: string } => {
    if (pin === student.pin) {
      const session: AuthSession = {
        role: 'student',
        userId: student.id,
        enrolledGrades: parent.enrolledGrades,
        isAuthenticated: true,
      };
      setAuthSessionState(session);
      setViewModeState('student');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return { success: true };
    }
    return { success: false, error: 'PIN incorrecto. Pide tu PIN al apoderado.' };
  };

  const loginAsParent = (email: string, password: string): { success: boolean; error?: string } => {
    // Super-Administrador Credential Check
    if (email.trim().toLowerCase() === 'admin@estudiosimple.cl' && password === 'admin123') {
      const session: AuthSession = {
        role: 'admin',
        userId: 'admin-super-001',
        enrolledGrades: ['3° Básico', '4° Básico', '5° Básico', '6° Básico', '7° Básico', '8° Básico'],
        isAuthenticated: true,
      };
      setAuthSessionState(session);
      setViewModeState('student');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return { success: true };
    }

    if (email === parent.email && password === parent.password) {
      const session: AuthSession = {
        role: 'parent',
        userId: parent.id,
        enrolledGrades: parent.enrolledGrades,
        isAuthenticated: true,
      };
      setAuthSessionState(session);
      setViewModeState('courses');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return { success: true };
    }
    return { success: false, error: 'Credenciales incorrectas. Para Administrador usa admin@estudiosimple.cl' };
  };

  const updateEnrolledGrades = (grades: GradeLevel[]) => {
    setParent((prev) => {
      const updated = { ...prev, enrolledGrades: grades };
      localStorage.setItem('estudio_simple_parent', JSON.stringify(updated));
      return updated;
    });
    setAuthSessionState((prev) => {
      if (!prev) return null;
      const updated = { ...prev, enrolledGrades: grades };
      localStorage.setItem('estudio_simple_auth_session', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setAuthSessionState(null);
    setViewModeState('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const verifyParentPassword = (password: string): boolean => {
    return password === parent.password;
  };

  const generateStudentPin = (): string => {
    const newPin = generatePin();
    setStudent(prev => ({ ...prev, pin: newPin }));
    return newPin;
  };

  // Gamification
  const addCuriosityPoints = (points: number) => {
    setStudent(prev => ({
      ...prev,
      curiosityPoints: prev.curiosityPoints + points,
    }));
  };

  const addGems = (gems: number) => {
    setStudent(prev => ({
      ...prev,
      gems: prev.gems + gems,
    }));
  };

  const markLessonCompleted = (lessonId: string) => {
    setStudent(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        curiosityPoints: prev.curiosityPoints + 50,
        gems: prev.gems + 2,
      };
    });
  };

  const resetProgress = () => {
    setStudent(INITIAL_STUDENT);
    setParent(INITIAL_PARENT);
    logout();
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        student,
        parent,
        activeLesson,
        setActiveLesson,
        isSensoryPauseOpen,
        setIsSensoryPauseOpen,
        themeMode,
        setThemeMode,
        toggleThemeMode,
        headerFooterColor,
        setHeaderFooterColor,
        sidebarColor,
        setSidebarColor,
        addCuriosityPoints,
        addGems,
        markLessonCompleted,
        resetProgress,
        authSession,
        loginAsStudent,
        loginAsParent,
        logout,
        generateStudentPin,
        verifyParentPassword,
        navigateWithAuth,
        updateEnrolledGrades,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de un AppProvider');
  }
  return context;
};
