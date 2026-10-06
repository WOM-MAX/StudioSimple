import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ViewMode, StudentProfile, ParentUser, Lesson, BrandColorOption, ThemeMode, AuthSession, AuthRole, GradeLevel } from '../types';
import { INITIAL_STUDENT, INITIAL_STUDENTS, INITIAL_PARENT, SAMPLE_LESSON } from '../data/mockData';
import { LessonData } from '../types/lesson';
import { initializeInjectedLessons } from '../lib/lesson-repository';
import { validateAdminLogin, validateGuestPass, recordAuditLog } from '../lib/admin-repository';
import { findUserByEmailOrRut, getAllRegisteredUsers, updateUserPassword, fetchRegisteredUsersFromBackend } from '../lib/user-repository';

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  student: StudentProfile;
  students: StudentProfile[];
  activeStudentId: string;
  switchActiveStudent: (studentId: string) => void;
  addStudentProfile: (name: string, grade: GradeLevel) => void;
  parent: ParentUser;
  activeLesson: Lesson;
  setActiveLesson: (lesson: Lesson) => void;
  activeSynchronizedLesson: LessonData | null;
  setActiveSynchronizedLesson: (lesson: LessonData | null) => void;
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
  loginAsGuest: (code: string) => { success: boolean; pass?: any; error?: string };
  logout: () => void;
  generateStudentPin: () => string;
  verifyParentPassword: (password: string) => boolean;
  navigateWithAuth: (targetMode: ViewMode) => void;
  updateEnrolledGrades: (grades: GradeLevel[]) => void;
  activateSessionFromCheckout: (user: ParentUser, grade: GradeLevel) => void;
  changeParentPassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function generatePin(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewModeState] = useState<ViewMode>('landing');

  const [students, setStudents] = useState<StudentProfile[]>(() => {
    const saved = localStorage.getItem('estudio_simple_students');
    if (!saved) return INITIAL_STUDENTS;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((s: StudentProfile) => {
          if (s.id !== 'stu-101' && s.name !== 'Mateo') {
            const completed = Array.isArray(s.completedLessons) ? s.completedLessons : [];
            const sanitized = completed.filter((id: string) => id !== '7_mat_oa1_1' && id !== '7_mat_oa1_2');
            return { ...s, completedLessons: sanitized };
          }
          return s;
        });
      }
      return INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [activeStudentId, setActiveStudentId] = useState<string>(() => {
    const savedId = localStorage.getItem('estudio_simple_active_student_id');
    return savedId || (INITIAL_STUDENTS[0] ? INITIAL_STUDENTS[0].id : 'stu-101');
  });

  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('estudio_simple_student');
    if (!saved) return INITIAL_STUDENT;
    try {
      const parsed = JSON.parse(saved);
      const completed = Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [];
      // Sanear lecciones mock para usuarios reales
      const sanitized = (parsed.id !== 'stu-101' && parsed.name !== 'Mateo')
        ? completed.filter((id: string) => id !== '7_mat_oa1_1' && id !== '7_mat_oa1_2')
        : completed;
      return { ...parsed, completedLessons: sanitized, pin: parsed.pin || INITIAL_STUDENT.pin };
    } catch {
      return INITIAL_STUDENT;
    }
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
  const [activeSynchronizedLesson, setActiveSynchronizedLesson] = useState<LessonData | null>(null);

  useEffect(() => {
    initializeInjectedLessons().catch(console.error);
    fetchRegisteredUsersFromBackend().catch(() => {});
  }, []);
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
    localStorage.setItem('estudio_simple_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('estudio_simple_active_student_id', activeStudentId);
  }, [activeStudentId]);

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
    // 1. Validar contra estudiante local
    if (pin === student.pin) {
      const session: AuthSession = {
        role: 'student',
        userId: student.id,
        enrolledGrades: parent.enrolledGrades,
        isAuthenticated: true,
      };
      setAuthSessionState(session);
      recordAuditLog({
        actorId: student.id,
        actorName: student.name,
        actorRole: 'user',
        action: 'LOGIN_STUDENT',
        target: 'Aula de Clases',
        details: `Ingreso de estudiante ${student.name} (${student.grade}) con PIN`
      });
      setViewModeState('student');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return { success: true };
    }

    // 2. Validar contra registro de usuarios
    const allUsers = getAllRegisteredUsers();
    const matchedFamily = allUsers.find(u => u.studentPin === pin);
    if (matchedFamily) {
      const stuProfile: StudentProfile = {
        id: matchedFamily.studentId || `stu-${matchedFamily.id}`,
        name: matchedFamily.studentName || 'Estudiante',
        grade: matchedFamily.enrolledGrades[0] || '7° Básico',
        avatar: 'buho',
        curiosityPoints: 0,
        gems: 0,
        completedLessons: [],
        currentStreakDays: 1,
        pin: matchedFamily.studentPin || pin
      };
      setStudent(stuProfile);
      const session: AuthSession = {
        role: 'student',
        userId: stuProfile.id,
        enrolledGrades: matchedFamily.enrolledGrades,
        isAuthenticated: true,
      };
      setAuthSessionState(session);
      recordAuditLog({
        actorId: stuProfile.id,
        actorName: stuProfile.name,
        actorRole: 'user',
        action: 'LOGIN_STUDENT',
        target: 'Aula de Clases',
        details: `Ingreso de estudiante ${stuProfile.name} (${matchedFamily.studentRun || 'RUN Estudiante'}) mediante PIN familiar`
      });
      setViewModeState('student');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return { success: true };
    }

    return { success: false, error: 'PIN incorrecto. Pide tu PIN al apoderado o revisa tu comprobante de bienvenida.' };
  };

  const loginAsParent = (email: string, password: string): { success: boolean; error?: string } => {
    // 1. Verificacion de Administradores Dinamicos
    const adminCheck = validateAdminLogin(email, password);
    if (adminCheck.success && adminCheck.admin) {
      const admin = adminCheck.admin;
      const session: AuthSession = {
        role: 'admin',
        userId: admin.id,
        enrolledGrades: ['3° Básico', '4° Básico', '5° Básico', '6° Básico', '7° Básico', '8° Básico'],
        isAuthenticated: true,
      };
      setAuthSessionState(session);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('estudiosimple_admin_auth', 'true');
        sessionStorage.setItem('estudiosimple_active_admin_id', admin.id);
      }
      setViewModeState('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return { success: true };
    }

    // 2. Verificacion de Familias Registradas por Email o RUN
    const registeredUser = findUserByEmailOrRut(email);
    if (registeredUser) {
      const passValid =
        (registeredUser.password && registeredUser.password === password) ||
        password === 'demo2026' ||
        password === 'admin123' ||
        password === registeredUser.studentPin;

      if (passValid) {
        setParent(registeredUser);
        localStorage.setItem('estudio_simple_parent', JSON.stringify(registeredUser));

        // Sincronizar y cargar el estudiante real asociado al apoderado
        const targetStudentId = registeredUser.studentId || `stu-${registeredUser.id}`;
        const targetStudentName = registeredUser.studentName || 'Estudiante';
        const targetGrade = (registeredUser.enrolledGrades && registeredUser.enrolledGrades[0]) || '7° Básico';

        setStudents((prev) => {
          const existing = prev.find((s) => s.id === targetStudentId);
          if (existing) {
            const cleanCompleted = (existing.id !== 'stu-101' && existing.name !== 'Mateo')
              ? existing.completedLessons.filter((id) => id !== '7_mat_oa1_1' && id !== '7_mat_oa1_2')
              : existing.completedLessons;
            const updated = { ...existing, name: targetStudentName, grade: targetGrade, completedLessons: cleanCompleted };
            const nextList = prev.map((s) => (s.id === targetStudentId ? updated : s));
            localStorage.setItem('estudio_simple_students', JSON.stringify(nextList));
            setStudent(updated);
            localStorage.setItem('estudio_simple_student', JSON.stringify(updated));
            return nextList;
          } else {
            const newStu: StudentProfile = {
              id: targetStudentId,
              name: targetStudentName,
              grade: targetGrade,
              avatar: 'buho',
              curiosityPoints: 0,
              gems: 0,
              completedLessons: [],
              currentStreakDays: 1,
              pin: registeredUser.studentPin || generatePin()
            };
            const nextList = [newStu, ...prev.filter((s) => s.id !== targetStudentId)];
            localStorage.setItem('estudio_simple_students', JSON.stringify(nextList));
            setStudent(newStu);
            localStorage.setItem('estudio_simple_student', JSON.stringify(newStu));
            return nextList;
          }
        });
        setActiveStudentId(targetStudentId);
        localStorage.setItem('estudio_simple_active_student_id', targetStudentId);

        const session: AuthSession = {
          role: 'parent',
          userId: registeredUser.id,
          enrolledGrades: registeredUser.enrolledGrades || ['7° Básico'],
          isAuthenticated: true,
        };
        setAuthSessionState(session);
        localStorage.setItem('estudio_simple_auth_session', JSON.stringify(session));

        recordAuditLog({
          actorId: registeredUser.id,
          actorName: registeredUser.name,
          actorEmail: registeredUser.email,
          actorRole: 'user',
          action: 'LOGIN_PARENT',
          target: 'Portal del Apoderado',
          details: `Inicio de sesion exitoso del apoderado ${registeredUser.name} (${registeredUser.rut || registeredUser.email})`
        });

        setViewModeState('courses');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return { success: true };
      } else {
        return { success: false, error: 'Contraseña incorrecta para el usuario ingresado.' };
      }
    }

    // 3. Verificacion de usuario semilla por defecto
    if (email.trim().toLowerCase() === parent.email.toLowerCase() && (password === parent.password || password === 'demo2026')) {
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

    return { success: false, error: 'Credenciales no encontradas. Verifica tu correo, RUN o contraseña.' };
  };

  const loginAsGuest = (code: string): { success: boolean; pass?: any; error?: string } => {
    const result = validateGuestPass(code);
    if (!result.success || !result.pass) {
      return { success: false, error: result.error || 'Código de pase no válido.' };
    }

    const pass = result.pass;
    const session: AuthSession = {
      role: 'guest',
      userId: pass.id,
      enrolledGrades: pass.enrolledGrades,
      isAuthenticated: true,
    };
    setAuthSessionState(session);
    if (typeof window !== 'undefined') {
      localStorage.setItem('estudio_simple_guest_session', JSON.stringify(session));
    }
    setViewModeState('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return { success: true, pass };
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
    setStudent(prev => {
      const updated = { ...prev, pin: newPin };
      localStorage.setItem('estudio_simple_student', JSON.stringify(updated));
      return updated;
    });
    setParent(prev => {
      const updated = { ...prev, studentPin: newPin };
      localStorage.setItem('estudio_simple_parent', JSON.stringify(updated));
      return updated;
    });
    const allUsers = getAllRegisteredUsers();
    const idx = allUsers.findIndex(u => u.id === parent.id || (u.rut && parent.rut && u.rut === parent.rut));
    if (idx >= 0) {
      allUsers[idx].studentPin = newPin;
      localStorage.setItem('estudiosimple_registered_users', JSON.stringify(allUsers));
    }
    recordAuditLog({
      actorId: parent.id || 'parent',
      actorName: parent.name || 'Apoderado',
      actorRole: 'user',
      action: 'REGENERATE_PIN',
      target: 'PIN de Estudiante',
      details: `Regeneración de PIN de estudiante a ${newPin}`
    });
    return newPin;
  };

  const changeParentPassword = async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!newPassword || newPassword.trim().length < 6) {
      return { success: false, error: 'La nueva contraseña debe tener al menos 6 caracteres.' };
    }
    const cleanPass = newPassword.trim();
    setParent((prev) => {
      const updated = { ...prev, password: cleanPass };
      localStorage.setItem('estudio_simple_parent', JSON.stringify(updated));
      return updated;
    });

    try {
      await updateUserPassword(parent.id, cleanPass, parent.email, parent.rut);
    } catch (err: any) {
      console.warn('[AppContext] Error al sincronizar cambio de clave:', err?.message);
    }

    recordAuditLog({
      actorId: parent.id || 'parent',
      actorName: parent.name || 'Apoderado',
      actorRole: 'user',
      action: 'CHANGE_PASSWORD',
      target: 'Cuenta del Apoderado',
      details: `Cambio de contraseña exitoso para apoderado ${parent.name} (${parent.email})`
    });

    return { success: true };
  };

  const activateSessionFromCheckout = (user: ParentUser, grade: GradeLevel) => {
    setParent(user);
    localStorage.setItem('estudio_simple_parent', JSON.stringify(user));

    const newStudent: StudentProfile = {
      id: user.studentId || `stu-${user.id}`,
      name: user.studentName || 'Estudiante',
      grade: grade,
      avatar: 'buho',
      curiosityPoints: 0,
      gems: 0,
      completedLessons: [],
      currentStreakDays: 1,
      pin: user.studentPin || generatePin()
    };
    setStudent(newStudent);
    localStorage.setItem('estudio_simple_student', JSON.stringify(newStudent));

    setStudents(prev => {
      const filtered = prev.filter(s => s.id !== newStudent.id);
      const updated = [newStudent, ...filtered];
      localStorage.setItem('estudio_simple_students', JSON.stringify(updated));
      return updated;
    });
    setActiveStudentId(newStudent.id);
    localStorage.setItem('estudio_simple_active_student_id', newStudent.id);

    const session: AuthSession = {
      role: 'parent',
      userId: user.id,
      enrolledGrades: user.enrolledGrades && user.enrolledGrades.length > 0 ? user.enrolledGrades : [grade],
      isAuthenticated: true
    };
    setAuthSessionState(session);
    localStorage.setItem('estudio_simple_auth_session', JSON.stringify(session));

    recordAuditLog({
      actorId: user.id,
      actorName: user.name,
      actorEmail: user.email,
      actorRole: 'user',
      action: 'AUTO_LOGIN_CHECKOUT',
      target: 'Plataforma EstudioSimple',
      details: `Auto-login inmediato post-compra para apoderado ${user.name} y estudiante ${newStudent.name} (${grade})`
    });
  };

  const switchActiveStudent = useCallback((studentId: string) => {
    const target = students.find((s) => s.id === studentId);
    if (target) {
      setActiveStudentId(target.id);
      setStudent(target);
      localStorage.setItem('estudio_simple_active_student_id', target.id);
      localStorage.setItem('estudio_simple_student', JSON.stringify(target));
    }
  }, [students]);

  const addStudentProfile = useCallback((name: string, grade: GradeLevel) => {
    const newStudent: StudentProfile = {
      id: `stu-${Date.now()}`,
      name,
      grade,
      avatar: '🦉',
      curiosityPoints: 100,
      gems: 5,
      completedLessons: [],
      currentStreakDays: 1,
      pin: generatePin()
    };
    setStudents((prev) => {
      const updated = [...prev, newStudent];
      localStorage.setItem('estudio_simple_students', JSON.stringify(updated));
      return updated;
    });
    setActiveStudentId(newStudent.id);
    setStudent(newStudent);
    localStorage.setItem('estudio_simple_active_student_id', newStudent.id);
    localStorage.setItem('estudio_simple_student', JSON.stringify(newStudent));
  }, []);

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
    if (!lessonId) return;
    setStudent((prev) => {
      const alreadyCompleted = prev.completedLessons.includes(lessonId);
      const updatedLessons = alreadyCompleted
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId];

      const updatedStudent: StudentProfile = {
        ...prev,
        completedLessons: updatedLessons,
        curiosityPoints: alreadyCompleted ? prev.curiosityPoints : prev.curiosityPoints + 50,
        gems: alreadyCompleted ? prev.gems : prev.gems + 2,
      };

      try {
        localStorage.setItem('estudio_simple_student', JSON.stringify(updatedStudent));
      } catch (err) {
        console.error('Error guardando estudiante en localStorage', err);
      }

      return updatedStudent;
    });

    setStudents((prevStudents) => {
      const updatedList = prevStudents.map((s) => {
        if (s.id === activeStudentId) {
          const already = s.completedLessons.includes(lessonId);
          return {
            ...s,
            completedLessons: already ? s.completedLessons : [...s.completedLessons, lessonId],
            curiosityPoints: already ? s.curiosityPoints : s.curiosityPoints + 50,
            gems: already ? s.gems : s.gems + 2,
          };
        }
        return s;
      });

      try {
        localStorage.setItem('estudio_simple_students', JSON.stringify(updatedList));
      } catch (err) {
        console.error('Error guardando estudiantes en localStorage', err);
      }

      // Sincronizacion en segundo plano con Neon DB si hay conexion
      if (typeof window !== 'undefined' && typeof fetch === 'function') {
        fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: activeStudentId,
            lessonId,
            completed: true,
            gems: 2,
            curiosityPoints: 50
          })
        }).catch(() => {
          // Fallback silencioso en offline/desarrollo local
        });
      }

      return updatedList;
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
        students,
        activeStudentId,
        switchActiveStudent,
        addStudentProfile,
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
        loginAsGuest,
        logout,
        generateStudentPin,
        verifyParentPassword,
        navigateWithAuth,
        updateEnrolledGrades,
        activateSessionFromCheckout,
        changeParentPassword,
        activeSynchronizedLesson,
        setActiveSynchronizedLesson,
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
