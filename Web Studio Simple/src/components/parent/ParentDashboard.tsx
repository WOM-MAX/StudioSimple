import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GradeLevel } from '../../types';
import { OFFICIAL_SUBJECTS, getSubjectOAs, CurricularOA } from '../../data/curriculumData';
import { findInjectedLesson, isLessonCompleted } from '../../lib/lesson-repository';
import {
  Play,
  Lock,
  CheckCircle2,
  Clock,
  Sparkles,
  LogOut,
  ChevronDown,
  Layers,
  BarChart3,
  BookOpen,
  Calendar,
  Award,
  Sun,
  Moon,
  TrendingUp,
  Target,
  ArrowLeft,
  Home,
  RotateCcw,
  KeyRound,
  Copy,
  GraduationCap,
  Shield,
  AlertTriangle,
  X,
  Pencil,
  Mail,
  Phone,
  Settings,
  User,
  Eye,
  EyeOff,
  Save,
  UserCheck,
  Check,
  Calculator,
  Microscope,
  Globe,
  Languages,
  LucideIcon
} from 'lucide-react';
import { updateFamilyDetails } from '../../lib/user-repository';
import { formatRut } from '../../lib/rut-validator';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

const SUBJECT_CONFIG: Record<
  string,
  {
    Icon: LucideIcon;
    badgeClass: string;
    pillClass: string;
  }
> = {
  mat: {
    Icon: Calculator,
    badgeClass: 'bg-blue-50/50 text-blue-600 border border-blue-100/60 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/40',
    pillClass: 'bg-blue-50/70 text-blue-700 border border-blue-200/60 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900/50'
  },
  len: {
    Icon: BookOpen,
    badgeClass: 'bg-orange-50/50 text-orange-600 border border-orange-100/60 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-900/40',
    pillClass: 'bg-orange-50/70 text-orange-700 border border-orange-200/60 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-900/50'
  },
  cie: {
    Icon: Microscope,
    badgeClass: 'bg-emerald-50/50 text-emerald-600 border border-emerald-100/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/40',
    pillClass: 'bg-emerald-50/70 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900/50'
  },
  his: {
    Icon: Globe,
    badgeClass: 'bg-purple-50/50 text-purple-600 border border-purple-100/60 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/40',
    pillClass: 'bg-purple-50/70 text-purple-700 border border-purple-200/60 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-900/50'
  },
  ing: {
    Icon: Languages,
    badgeClass: 'bg-teal-50/50 text-teal-600 border border-teal-100/60 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-900/40',
    pillClass: 'bg-teal-50/70 text-teal-700 border border-teal-200/60 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-900/50'
  }
};

const GRADES = ['3° Básico', '4° Básico', '5° Básico', '6° Básico', '7° Básico', '8° Básico'];

export const ParentDashboard: React.FC = () => {
  const {
    setViewMode,
    setActiveSynchronizedLesson,
    logout,
    parent,
    student,
    students,
    activeStudentId,
    switchActiveStudent,
    themeMode,
    toggleThemeMode,
    generateStudentPin,
    changeParentPassword,
    updateParentProfile
  } = useApp();
  const [selectedGrade, setSelectedGrade] = useState<string>(student?.grade || '7° Básico');
  const [selectedSubject, setSelectedSubject] = useState('Matemática');
  const [selectedOaIndex, setSelectedOaIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'lessons' | 'analytics' | 'credentials' | 'settings'>('lessons');
  const [copiedPin, setCopiedPin] = useState(false);
  const [pinFeedback, setPinFeedback] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelMessage, setCancelMessage] = useState<string | null>(null);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState<boolean>(parent?.subscriptionActive !== false);

  // Estados para panel de configuración y autoservicio
  const [parentNameInput, setParentNameInput] = useState(parent?.name || '');
  const [parentRutInput, setParentRutInput] = useState(parent?.rut || '');
  const [parentEmailInput, setParentEmailInput] = useState(parent?.email || '');
  const [parentPhoneInput, setParentPhoneInput] = useState(parent?.phone || '');
  const [isSavingParent, setIsSavingParent] = useState(false);
  const [parentFeedback, setParentFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [studentNameInput, setStudentNameInput] = useState(student?.name || parent?.studentName || '');
  const [studentRunInput, setStudentRunInput] = useState(parent?.studentRun || '');
  const [studentGradeInput, setStudentGradeInput] = useState<string>(student?.grade || selectedGrade || '7° Básico');
  const [isSavingStudent, setIsSavingStudent] = useState(false);
  const [studentFeedback, setStudentFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Sincronizar inputs si cambia parent o student
  React.useEffect(() => {
    if (parent) {
      setParentNameInput(parent.name || '');
      setParentRutInput(parent.rut || '');
      setParentEmailInput(parent.email || '');
      setParentPhoneInput(parent.phone || '');
    }
  }, [parent]);

  React.useEffect(() => {
    if (student) {
      setStudentNameInput(student.name || parent?.studentName || '');
      setStudentRunInput(parent?.studentRun || '');
      setStudentGradeInput(student.grade || selectedGrade || '7° Básico');
    }
  }, [student, parent?.studentRun, parent?.studentName, selectedGrade]);

  const handleSaveParentProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setParentFeedback(null);
    if (!parentEmailInput.trim().includes('@')) {
      setParentFeedback({ type: 'error', text: 'Por favor ingresa un correo electrónico válido.' });
      return;
    }
    setIsSavingParent(true);
    try {
      const payload = {
        id: parent.id,
        name: parentNameInput.trim(),
        rut: parentRutInput.trim(),
        email: parentEmailInput.trim().toLowerCase(),
        phone: parentPhoneInput.trim()
      };
      const res = await updateFamilyDetails(payload);
      if (res.success) {
        updateParentProfile(payload);
        setParentFeedback({ type: 'success', text: '¡Tus datos de apoderado han sido guardados exitosamente!' });
        setTimeout(() => setParentFeedback(null), 4000);
      } else {
        setParentFeedback({ type: 'error', text: res.error || 'No fue posible guardar los datos.' });
      }
    } catch (err: any) {
      setParentFeedback({ type: 'error', text: err?.message || 'Error al conectar con la base de datos.' });
    } finally {
      setIsSavingParent(false);
    }
  };

  const handleSaveStudentProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setStudentFeedback(null);
    if (!studentNameInput.trim()) {
      setStudentFeedback({ type: 'error', text: 'Por favor ingresa el nombre del estudiante.' });
      return;
    }
    setIsSavingStudent(true);
    try {
      const payload = {
        id: parent.id,
        studentName: studentNameInput.trim(),
        studentRun: studentRunInput.trim(),
        enrolledGrades: [studentGradeInput as GradeLevel]
      };
      const res = await updateFamilyDetails(payload);
      if (res.success) {
        updateParentProfile(payload);
        setSelectedGrade(studentGradeInput);
        setStudentFeedback({ type: 'success', text: '¡Datos y curso del estudiante guardados correctamente!' });
        setTimeout(() => setStudentFeedback(null), 4000);
      } else {
        setStudentFeedback({ type: 'error', text: res.error || 'No fue posible actualizar al estudiante.' });
      }
    } catch (err: any) {
      setStudentFeedback({ type: 'error', text: err?.message || 'Error al conectar con la base de datos.' });
    } finally {
      setIsSavingStudent(false);
    }
  };

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordFeedback(null);
    if (!newPasswordInput || newPasswordInput.trim().length < 6) {
      setPasswordFeedback({ type: 'error', text: 'La nueva contraseña debe tener al menos 6 caracteres.' });
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordFeedback({ type: 'error', text: 'Las contraseñas no coinciden. Por favor verifícalas.' });
      return;
    }
    setIsSavingPassword(true);
    try {
      const res = await changeParentPassword(newPasswordInput.trim());
      if (res.success) {
        setPasswordFeedback({ type: 'success', text: '¡Contraseña actualizada exitosamente! Úsala en tu próximo acceso.' });
        setNewPasswordInput('');
        setConfirmPasswordInput('');
        setTimeout(() => setPasswordFeedback(null), 4000);
      } else {
        setPasswordFeedback({ type: 'error', text: res.error || 'No fue posible actualizar la contraseña.' });
      }
    } catch (err: any) {
      setPasswordFeedback({ type: 'error', text: err?.message || 'Error al actualizar la contraseña.' });
    } finally {
      setIsSavingPassword(false);
    }
  };


  const handleCancelSubscription = async () => {
    setIsCancelling(true);
    try {
      const res = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: parent?.email,
          rut: parent?.rut,
          reason: cancelReason || 'Cancelación voluntaria desde panel'
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsSubscriptionActive(false);
        const savedParent = localStorage.getItem('estudio_simple_parent');
        if (savedParent) {
          try {
            const parsed = JSON.parse(savedParent);
            parsed.subscriptionActive = false;
            localStorage.setItem('estudio_simple_parent', JSON.stringify(parsed));
          } catch {}
        }
        setCancelMessage(data.message || 'Suscripción cancelada exitosamente.');
        setShowCancelModal(false);
      } else {
        alert(data.message || 'No fue posible cancelar la suscripción.');
      }
    } catch (err) {
      console.error('Error al cancelar suscripción:', err);
      alert('Error de conexión al procesar la cancelación.');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleCopyPin = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(student.pin || parent.studentPin || '123456');
      setCopiedPin(true);
      setTimeout(() => setCopiedPin(false), 2500);
    }
  };

  const handleRegeneratePin = () => {
    const newPin = generateStudentPin();
    setPinFeedback(`Nuevo PIN generado exitosamente: ${newPin}`);
    setTimeout(() => setPinFeedback(null), 4000);
  };

  const handleSharePinWhatsApp = () => {
    const pin = student.pin || parent.studentPin || '123456';
    const sName = student.name || 'Estudiante';
    const grade = student.grade || selectedGrade;
    const text = `*ESTUDIOSIMPLE - ACCESO AL SALÓN DE CLASES*\n\nHola ${sName}, tu clave PIN oficial para estudiar ${grade} es: *${pin}*\n\nIngresa directamente en https://estudiosimple.cl digitando este PIN de 6 dígitos.`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const currentOAs = getSubjectOAs(selectedGrade, selectedSubject);
  const activeOa: CurricularOA = currentOAs[selectedOaIndex] || currentOAs[0];
  const isDark = themeMode === 'dark';

  const totalLessons = activeOa?.lessons?.length || 0;
  const completedCount = activeOa?.lessons
    ? activeOa.lessons.filter((l) =>
        isLessonCompleted(student?.completedLessons, selectedGrade, selectedSubject, activeOa.code, l.lessonNumber)
      ).length
    : 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const handleSubjectChange = (subjectName: string) => {
    setSelectedSubject(subjectName);
    setSelectedOaIndex(0);
  };

  React.useEffect(() => {
    if (student?.grade) {
      setSelectedGrade(student.grade);
    }
  }, [student?.grade]);

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-200 ${
      isDark
        ? 'bg-[#0A192F] text-[#F8FAFC]'
        : 'bg-[#FAFAFC] text-slate-900'
    }`}>
      {/* 1. TOP HEADER (UNIFIED & MINIMALIST WITH LIVE BREADCRUMB) */}
      <header className={`border-b sticky top-0 z-30 px-4 sm:px-8 py-3 transition-colors duration-200 ${
        isDark
          ? 'bg-[#10223D]/95 backdrop-blur-md border-[#1C3257]'
          : 'bg-white/95 backdrop-blur-md border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand Identity & Return to Course Selector with Live Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                isDark ? 'bg-[#1C3257] border-[#2A4365] text-[#57d6f3] hover:bg-[#2A4365]' : 'bg-teal-50/70 border-teal-200/70 text-[#0E8284] hover:bg-teal-100/70'
              }`}
              title="Volver a la Landing Page Oficial"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('courses')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                isDark ? 'bg-[#0A192F] border-[#1C3257] text-white hover:bg-[#1C3257]' : 'bg-slate-100 border-slate-200/80 text-slate-700 hover:bg-slate-200'
              }`}
              title="Volver a la Selección de Cursos"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Cursos</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedGrade}</span>
              <span className="text-slate-400">›</span>
              <span className="font-semibold text-[#12A1A4]">{selectedSubject}</span>
              <span className="text-slate-400">›</span>
              <Badge variant="teal" className="text-[11px] px-2 py-0.5">
                {activeOa.code}
              </Badge>
            </div>
          </div>

          <div className={`flex items-center gap-2 p-1 rounded-xl border ${
            isDark ? 'bg-[#0A192F] border-[#1C3257]' : 'bg-slate-50 border-slate-200/80'
          }`}>
            {/* Conmutador Multi-Estudiante de la Familia */}
            <div className="relative">
              <select
                value={activeStudentId}
                onChange={(e) => {
                  const targetId = e.target.value;
                  switchActiveStudent(targetId);
                  const targetStudent = students.find((s) => s.id === targetId);
                  if (targetStudent && targetStudent.grade) {
                    setSelectedGrade(targetStudent.grade);
                  }
                }}
                className={`appearance-none font-semibold text-xs py-1.5 pl-3 pr-7 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#12A1A4] cursor-pointer shadow-xs ${
                  isDark ? 'bg-[#1C3257] text-[#F8AD22] border-[#2A4365]' : 'bg-amber-50/80 text-amber-900 border-amber-200/80'
                }`}
                title="Estudiante de la Familia Activo"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id} className={isDark ? 'bg-[#10223D] text-white' : 'bg-white text-slate-900'}>
                    {s.avatar} {s.name} ({s.grade})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-amber-600 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Curso */}
            <div className="relative">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className={`appearance-none font-semibold text-xs py-1.5 pl-3 pr-7 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#12A1A4] cursor-pointer shadow-xs ${
                  isDark ? 'bg-[#10223D] text-white border-[#1C3257]' : 'bg-white text-slate-800 border-slate-200/80'
                }`}
              >
                {GRADES.map((g) => (
                  <option key={g} value={g} className={isDark ? 'bg-[#10223D] text-white' : 'bg-white text-slate-900'}>
                    {g}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Asignatura */}
            <div className="relative">
              <select
                value={selectedSubject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className={`appearance-none font-semibold text-xs py-1.5 pl-3 pr-7 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#12A1A4] cursor-pointer shadow-xs ${
                  isDark ? 'bg-[#10223D] text-white border-[#1C3257]' : 'bg-white text-slate-800 border-slate-200/80'
                }`}
              >
                {OFFICIAL_SUBJECTS.map((s) => (
                  <option key={s.id} value={s.name} className={isDark ? 'bg-[#10223D] text-white' : 'bg-white text-slate-900'}>
                    {s.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Theme Toggle, Quick Settings, Profile & Logout */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleThemeMode}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#1C3257] border-[#2A4365] text-[#F8AD22] hover:bg-[#2A4365]'
                  : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
              }`}
              title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Acceso directo a panel de Ajustes */}
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                activeTab === 'settings' || activeTab === 'credentials'
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
                  : isDark
                  ? 'bg-[#1C3257] border-[#2A4365] text-slate-300 hover:text-white hover:bg-[#2A4365]'
                  : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
              }`}
              title="Panel de Ajustes y Credenciales"
            >
              <Settings className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Ajustes</span>
            </button>

            <div className="hidden md:flex flex-col text-right">
              <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {parent.name || 'Apoderado'}
              </span>
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className="text-[10px] text-amber-600 hover:underline flex items-center gap-1 cursor-pointer font-semibold justify-end"
                title="Gestionar PIN y Datos en Ajustes"
              >
                <KeyRound size={11} />
                <span>PIN: {student.pin || parent.studentPin || '123456'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => logout()}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Cerrar Sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. TAB SELECTOR BAR (MINIMALISTA STRIPE LIGHT MODE) */}
      <div className={`border-b ${isDark ? 'bg-[#0E1C33] border-[#1C3257]' : 'bg-white border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('lessons')}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'lessons'
                ? isDark
                  ? 'border-[#12A1A4] text-[#12A1A4]'
                  : 'border-[#12A1A4] text-[#0E8284]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Lecciones del Objetivo (Clases de 30 min)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? isDark
                  ? 'border-[#12A1A4] text-[#12A1A4]'
                  : 'border-[#12A1A4] text-[#0E8284]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Estadísticas de Avance & Temario Exámenes Libres</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'settings' || activeTab === 'credentials'
                ? isDark
                  ? 'border-[#F8AD22] text-[#F8AD22]'
                  : 'border-[#F8AD22] text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Ajustes & Claves (Configuración Familiar)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('formal-exam')}
            className={`py-3 px-3 text-xs font-bold border-b-2 border-transparent flex items-center gap-2 transition-all cursor-pointer ${
              isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-700'
            }`}
            title="Abrir Simulador de Examen Acumulativo MINEDUC"
          >
            <Award className="w-4 h-4" />
            <span>Simulador de Ensayo Formal MINEDUC</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN BODY */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-8 space-y-6">
        
        {/* TAB 1: LECCIONES DEL OBJETIVO */}
        {activeTab === 'lessons' && (
          <div className="space-y-6 animate-fadeIn">
            {/* TARJETAS BENTO VERTICALES PREMIUM DE LAS 5 ASIGNATURAS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Asignaturas Oficiales · Temario Exámenes Libres MINEDUC
                </span>
                <Badge variant="teal" className="text-xs font-bold px-2.5 py-0.5">
                  {selectedGrade}
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                {OFFICIAL_SUBJECTS.map((sub) => {
                  const isSelected = selectedSubject.toLowerCase().includes(sub.id) || selectedSubject === sub.name;
                  const subjectOAs = getSubjectOAs(selectedGrade, sub.name);
                  const totalLessons = subjectOAs.reduce((acc, oa) => acc + oa.lessons.length, 0);
                  const cfg = SUBJECT_CONFIG[sub.id] || {
                    Icon: BookOpen,
                    badgeClass: 'bg-slate-50/50 text-slate-600 border border-slate-200/60 dark:bg-slate-900/40 dark:text-slate-400 dark:border-slate-800',
                    pillClass: 'bg-slate-100 text-slate-700 border border-slate-200/60 dark:bg-slate-800 dark:text-slate-300'
                  };
                  const SubjectIcon = cfg.Icon;

                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => handleSubjectChange(sub.name)}
                      className={`relative rounded-xl sm:rounded-2xl p-4 font-bold text-xs transition-all duration-200 flex flex-col items-center gap-2 text-center cursor-pointer border ${
                        isSelected
                          ? isDark
                            ? 'bg-[#10223D] border-slate-700 ring-1 ring-[#12A1A4]/50 shadow-md hover:-translate-y-0.5'
                            : 'bg-teal-50/20 border-slate-200/90 ring-1 ring-[#12A1A4]/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:-translate-y-0.5'
                          : isDark
                          ? 'bg-[#10223D] border-[#1C3257] text-slate-400 hover:bg-[#1C3257]/60 hover:text-white hover:-translate-y-0.5'
                          : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50/70 hover:border-slate-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Subject icon badge */}
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center transition-all duration-200 shadow-xs ${cfg.badgeClass}`}
                      >
                        <SubjectIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={1.5} />
                      </div>

                      {/* Subject name */}
                      <span
                        className={`font-display text-xs sm:text-sm font-bold leading-tight ${
                          isSelected
                            ? isDark
                              ? 'text-white'
                              : 'text-slate-900'
                            : isDark
                            ? 'text-slate-300'
                            : 'text-slate-700'
                        }`}
                      >
                        {sub.name}
                      </span>

                      {/* Lesson count pill */}
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md transition-colors duration-200 ${
                          isSelected
                            ? cfg.pillClass
                            : isDark
                            ? 'bg-[#0A192F] text-slate-400 border border-transparent'
                            : 'bg-slate-100 text-slate-500 border border-transparent'
                        }`}
                      >
                        {totalLessons} clases · {subjectOAs.length} OAs
                      </span>

                      {/* Active indicator dot */}
                      {isSelected && (
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#12A1A4] ring-2 ring-white dark:ring-slate-900 shadow-xs" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TARJETAS VERTICALES ELEGANTES DE OAs */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Objetivos Priorizados de {selectedSubject}
                </span>
                <span className="text-xs font-bold text-[#12A1A4]">
                  {currentOAs.length} OAs Totales
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {currentOAs.map((oa, index) => {
                  const isSelected = index === selectedOaIndex;
                  const currentSub = OFFICIAL_SUBJECTS.find(
                    (s) => selectedSubject.toLowerCase().includes(s.id) || selectedSubject === s.name
                  );
                  const oaColor = currentSub?.color || '#12A1A4';
                  return (
                    <button
                      key={oa.code}
                      type="button"
                      onClick={() => setSelectedOaIndex(index)}
                      className={`relative rounded-xl p-4 transition-all duration-200 flex flex-col items-start gap-2 text-left cursor-pointer border ${
                        isSelected
                          ? isDark
                            ? 'bg-[#10223D] border-slate-700 ring-1 ring-[#12A1A4]/40 shadow-md hover:-translate-y-0.5'
                            : 'bg-teal-50/20 border-slate-200/90 ring-1 ring-[#12A1A4]/40 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:-translate-y-0.5'
                          : isDark
                          ? 'bg-[#10223D] border-[#1C3257] text-slate-400 hover:bg-[#1C3257]/60 hover:text-white hover:-translate-y-0.5'
                          : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50/60 hover:border-slate-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <Badge
                          variant={isSelected ? 'teal' : 'secondary'}
                          className="text-[11px] font-bold px-2 py-0.5"
                        >
                          {oa.code}
                        </Badge>
                        <span className={`text-[10px] font-semibold ${
                          isSelected
                            ? 'text-teal-700 dark:text-teal-400'
                            : isDark ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                          {oa.lessons.length} lecciones
                        </span>
                      </div>

                      {/* Full title - no truncation */}
                      <h4
                        className="font-display text-xs sm:text-sm font-bold leading-snug"
                        style={{ color: isSelected ? (isDark ? '#FFFFFF' : oaColor) : isDark ? '#CBD5E1' : '#334155' }}
                      >
                        {oa.title}
                      </h4>

                      {/* Status indicator */}
                      <span className={`text-[10px] font-semibold ${
                        index === 0
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : isDark ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        {index === 0 ? 'En curso' : 'Pendiente'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TARJETA HERO DEL OA ACTIVO MINIMALISTA */}
            <Card className={`rounded-xl sm:rounded-2xl p-6 sm:p-7 border relative overflow-hidden transition-all ${
              isDark
                ? 'bg-[#10223D] border-[#1C3257] shadow-md'
                : 'bg-white border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b pb-4 border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Badge variant="teal" className="text-xs font-bold px-2.5 py-0.5">
                    {activeOa.code}
                  </Badge>
                  <span className="text-xs font-medium text-slate-500">
                    Objetivo {selectedOaIndex + 1} de {currentOAs.length}
                  </span>
                </div>

                <Badge variant="emerald" className="gap-1.5 px-2.5 py-1 text-xs">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{activeOa.lessons.length} Lecciones de 30 min</span>
                </Badge>
              </div>

              <h1 className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {activeOa.title}
              </h1>
              <p className={`text-sm leading-relaxed max-w-3xl mb-4 font-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {activeOa.shortDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <strong className="text-slate-700 dark:text-slate-300 font-semibold">Progresión:</strong>
                  <span>{completedCount} de {totalLessons} lecciones completadas ({progressPercent}%)</span>
                </div>
                <div className="w-36">
                  <Progress value={progressPercent} className="h-1.5 bg-slate-100 rounded-full" />
                </div>
              </div>
            </Card>

            {/* GRILLA DE LECCIONES DEL OBJETIVO (GRID 3 COLS DESKTOP ESPACIOSO) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`font-display text-base font-bold flex items-center gap-2 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <span>Lecciones del Objetivo</span>
                  <span className="text-xs font-normal text-slate-500">(Secuencia pedagógica de 30 min)</span>
                </h2>
                <Badge variant="teal" className="text-xs px-2.5 py-0.5">
                  Secuencia de {totalLessons} Fases
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {activeOa.lessons.map((lesson) => {
                  const injectedLesson = findInjectedLesson(
                    selectedGrade,
                    selectedSubject,
                    activeOa.code,
                    lesson.lessonNumber
                  );
                  const isCompleted = isLessonCompleted(
                    student?.completedLessons,
                    selectedGrade,
                    selectedSubject,
                    activeOa.code,
                    lesson.lessonNumber
                  ) || lesson.status === 'completed';
                  const isReady = lesson.status === 'ready' || Boolean(injectedLesson);

                  return (
                    <Card
                      key={lesson.lessonNumber}
                      className={`p-6 transition-all duration-200 flex flex-col justify-between relative overflow-hidden h-full min-h-[300px] ${
                        isCompleted
                          ? isDark
                            ? 'bg-[#10223D] border-emerald-500/40 ring-1 ring-emerald-500/30 shadow-md hover:-translate-y-0.5'
                            : 'bg-white border-slate-200/90 ring-1 ring-emerald-500/30 bg-gradient-to-b from-emerald-50/15 to-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5'
                          : isReady
                          ? isDark
                            ? 'bg-[#10223D] border-teal-500/40 ring-1 ring-[#12A1A4]/30 shadow-md hover:-translate-y-0.5'
                            : 'bg-white border-slate-200/90 ring-1 ring-[#12A1A4]/30 bg-gradient-to-b from-teal-50/15 to-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5'
                          : isDark
                          ? 'bg-[#0E1C33]/60 border-slate-800 opacity-70'
                          : 'bg-white/80 border-slate-200/80 opacity-75 hover:opacity-90 shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
                      }`}
                    >
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center justify-between gap-1.5">
                          <Badge
                            variant={isCompleted ? 'emerald' : isReady ? 'teal' : 'subtle'}
                            className="text-[11px] px-2 py-0.5"
                          >
                            Clase {lesson.lessonNumber} de {totalLessons}
                          </Badge>
                          <Badge variant="outline" className="gap-1 text-[11px] px-2 py-0.5">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>{lesson.durationMinutes}m</span>
                          </Badge>
                        </div>

                        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                          Fase {lesson.lessonNumber} · Secuencia 30m
                        </div>

                        <h3 className={`font-display text-base font-bold leading-snug tracking-tight ${
                          isCompleted || isReady
                            ? isDark ? 'text-white' : 'text-slate-900'
                            : isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          {injectedLesson ? injectedLesson.metadata.lessonTitle : lesson.title}
                        </h3>

                        <p className={`text-xs leading-relaxed line-clamp-3 font-normal ${
                          isCompleted || isReady
                            ? isDark ? 'text-slate-300' : 'text-slate-600'
                            : isDark ? 'text-slate-500' : 'text-slate-500'
                        }`}>
                          {injectedLesson ? (injectedLesson.prep.adultObjective || injectedLesson.route.dileObjective) : lesson.focusSummary}
                        </p>
                      </div>

                      <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-800 space-y-2">
                        {isCompleted ? (
                          <>
                            <div className="w-full bg-emerald-50/80 text-emerald-800 font-semibold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 border border-emerald-200/80 shadow-2xs">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>Completada</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                try {
                                  localStorage.removeItem('estudiosimple_lesson_session_v1');
                                } catch {}
                                if (injectedLesson) {
                                  setActiveSynchronizedLesson(injectedLesson);
                                } else {
                                  setActiveSynchronizedLesson(null);
                                }
                                setViewMode('lesson');
                              }}
                              className="w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer text-center border border-slate-200/80 shadow-2xs"
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-[#12A1A4] shrink-0" />
                              <span>Repasar Clase (Host)</span>
                            </button>
                          </>
                        ) : isReady ? (
                          <button
                            type="button"
                            onClick={() => {
                              try {
                                localStorage.removeItem('estudiosimple_lesson_session_v1');
                              } catch {}
                              if (injectedLesson) {
                                setActiveSynchronizedLesson(injectedLesson);
                              } else {
                                setActiveSynchronizedLesson(null);
                              }
                              setViewMode('lesson');
                            }}
                            className="w-full bg-[#EE751C] hover:bg-[#E55B00] active:scale-[0.99] text-white font-bold text-xs py-2.5 px-4 rounded-lg shadow-xs flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer text-center"
                          >
                            <Play className="w-3.5 h-3.5 fill-white shrink-0" />
                            <span>Iniciar Clase (Host)</span>
                          </button>
                        ) : (
                          <div className={`w-full font-medium text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 border ${
                            isDark
                              ? 'bg-[#0A192F] text-slate-500 border-[#1C3257]'
                              : 'bg-slate-50 text-slate-400 border-slate-200/60'
                          }`}>
                            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>Bloqueada</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ESTADÍSTICAS & PROGRESO DE EXÁMENES LIBRES */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fadeIn">
            {/* RESUMEN GLOBAL (MARZO A SEPTIEMBRE) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-6 rounded-3xl border transition-all ${
                isDark ? 'bg-[#10223D] border-[#1C3257] shadow-lg' : 'bg-white/90 backdrop-blur-xs border-slate-200/90 shadow-sm hover:shadow-md'
              }`}>
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
                  <span className="uppercase tracking-wider">OAs {selectedSubject}</span>
                  <Target className="w-4 h-4 text-[#12A1A4]" />
                </div>
                <strong className={`text-2xl sm:text-3xl font-black block tracking-tight ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                  1 / {currentOAs.length}
                </strong>
                <span className="text-xs text-[#0E8284] font-bold mt-1 inline-block bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/80">
                  {activeOa.code} en curso
                </span>
              </div>

              <div className={`p-6 rounded-3xl border transition-all ${
                isDark ? 'bg-[#10223D] border-[#1C3257] shadow-lg' : 'bg-white/90 backdrop-blur-xs border-slate-200/90 shadow-sm hover:shadow-md'
              }`}>
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
                  <span className="uppercase tracking-wider">Clases Estimadas</span>
                  <Clock className="w-4 h-4 text-[#EE751C]" />
                </div>
                <strong className={`text-2xl sm:text-3xl font-black block tracking-tight ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                  {currentOAs.reduce((acc, curr) => acc + curr.lessons.length, 0)} Clases
                </strong>
                <span className="text-xs text-slate-500 mt-1 block">Lecciones de 30 min</span>
              </div>

              <div className={`p-6 rounded-3xl border transition-all ${
                isDark ? 'bg-[#10223D] border-[#1C3257] shadow-lg' : 'bg-white/90 backdrop-blur-xs border-slate-200/90 shadow-sm hover:shadow-md'
              }`}>
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
                  <span className="uppercase tracking-wider">Calendario Lectivo</span>
                  <Calendar className="w-4 h-4 text-[#F8AD22]" />
                </div>
                <strong className={`text-2xl sm:text-3xl font-black block tracking-tight ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                  Semana 1 / 24
                </strong>
                <span className="text-xs text-emerald-700 font-semibold mt-1 block">2 clases/semana (Marzo - Agosto)</span>
              </div>

              <div className={`p-6 rounded-3xl border transition-all ${
                isDark ? 'bg-[#10223D] border-[#1C3257] shadow-lg' : 'bg-white/90 backdrop-blur-xs border-slate-200/90 shadow-sm hover:shadow-md'
              }`}>
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
                  <span className="uppercase tracking-wider">Ensayos Septiembre</span>
                  <Award className="w-4 h-4 text-[#4A964E]" />
                </div>
                <strong className={`text-2xl sm:text-3xl font-black block tracking-tight ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                  Reservado
                </strong>
                <span className="text-xs text-slate-500 mt-1 block">Simulaciones oficiales</span>
              </div>
            </div>

            {/* MATRIZ DE DOMINIO DE LOS OAs DE LA ASIGNATURA */}
            <div className={`p-6 sm:p-8 rounded-3xl border ${
              isDark ? 'bg-[#10223D] border-[#1C3257] shadow-lg' : 'bg-white/90 backdrop-blur-xs border-slate-200/90 shadow-sm'
            }`}>
              <h3 className={`text-base font-black mb-4 flex items-center gap-2 tracking-tight ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                <TrendingUp className="w-5 h-5 text-[#12A1A4]" />
                <span>Estado y Cobertura de los {currentOAs.length} Objetivos de Aprendizaje de {selectedSubject} ({selectedGrade})</span>
              </h3>

              <div className="space-y-3">
                {currentOAs.map((oa, idx) => (
                  <div
                    key={oa.code}
                    className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                      idx === selectedOaIndex
                        ? isDark
                          ? 'bg-[#0A192F] border-[#12A1A4]'
                          : 'bg-teal-50/70 border-teal-200 text-teal-950'
                        : isDark
                        ? 'bg-[#0E1C33] border-[#1C3257]'
                        : 'bg-slate-50/80 border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-[#12A1A4] text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-xs">
                        {oa.code}
                      </span>
                      <div>
                        <strong className={`text-xs sm:text-sm font-black block ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                          {oa.title}
                        </strong>
                        <span className="text-[11px] text-slate-500">
                          {oa.lessons.length} lecciones de 30 min · Estimadas según temario
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        idx === 0
                          ? 'bg-teal-100 text-[#0E8284] border border-teal-200'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        {idx === 0 ? 'En Curso (Clase 1)' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: AJUSTES, CONFIGURACIÓN FAMILIAR & CREDENCIALES (100% AUTOSERVICIO) */}
        {(activeTab === 'settings' || activeTab === 'credentials') && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header del Panel de Ajustes y Autoservicio */}
            <div className={`p-6 sm:p-8 rounded-3xl border ${
              isDark ? 'bg-[#10223D] border-[#1C3257] shadow-xl' : 'bg-white/95 backdrop-blur-xs border-slate-200/90 shadow-sm'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-[#F8AD22] uppercase tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                      Panel de Autoservicio 100% Autónomo
                    </span>
                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20 flex items-center gap-1">
                      <Check size={11} />
                      <span>Sincronizado con Neon DB</span>
                    </span>
                  </div>
                  <h2 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                    Ajustes de Cuenta, Datos y Credenciales
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                    Modifica tus datos de contacto, el nombre y curso de tu hijo/a, gestiona el PIN de aula o renueva tu contraseña en cualquier momento con guardado inmediato en tu base de datos, sin necesidad de llamar a soporte.
                  </p>
                </div>
              </div>

              {pinFeedback && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>{pinFeedback}</span>
                </div>
              )}
            </div>

            {/* BENTO GRID DE 5 TARJETAS DE AUTOSERVICIO */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* BENTO 1: DATOS DEL TITULAR / APODERADO */}
              <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between ${
                isDark ? 'bg-[#10223D] border-[#1C3257] shadow-lg' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 dark:border-white/10 pb-3">
                    <div className="flex items-center gap-2 text-[#12A1A4] font-black text-xs uppercase tracking-wider">
                      <UserCheck size={18} />
                      <span>1. Datos del Titular / Apoderado</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#12A1A4]/15 text-[#12A1A4]">
                      Editable
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">
                    Información oficial del tutor legal responsable del estudiante y de la facturación.
                  </p>

                  <form onSubmit={handleSaveParentProfile} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Nombre Completo del Apoderado:
                      </label>
                      <input
                        type="text"
                        required
                        value={parentNameInput}
                        onChange={(e) => setParentNameInput(e.target.value)}
                        placeholder="Ej. Mercedes Peña Córdova"
                        className={`w-full rounded-xl px-3 py-2.5 text-xs font-semibold border transition-all ${
                          isDark
                            ? 'bg-black/30 border-white/15 text-white focus:border-[#12A1A4]'
                            : 'bg-slate-50 border-slate-200 text-[#1C3257] focus:border-[#12A1A4]'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        RUN de Identificación:
                      </label>
                      <input
                        type="text"
                        value={parentRutInput}
                        onChange={(e) => setParentRutInput(formatRut(e.target.value))}
                        placeholder="Ej. 12.345.678-9"
                        className={`w-full rounded-xl px-3 py-2.5 text-xs font-mono font-bold border transition-all ${
                          isDark
                            ? 'bg-black/30 border-white/15 text-white focus:border-[#12A1A4]'
                            : 'bg-slate-50 border-slate-200 text-[#1C3257] focus:border-[#12A1A4]'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Correo Electrónico (Login Apoderado):
                      </label>
                      <input
                        type="email"
                        required
                        value={parentEmailInput}
                        onChange={(e) => setParentEmailInput(e.target.value)}
                        placeholder="apoderado@correo.cl"
                        className={`w-full rounded-xl px-3 py-2.5 text-xs font-semibold border transition-all ${
                          isDark
                            ? 'bg-black/30 border-white/15 text-white focus:border-[#12A1A4]'
                            : 'bg-slate-50 border-slate-200 text-[#1C3257] focus:border-[#12A1A4]'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Teléfono Móvil (WhatsApp de Avisos):
                      </label>
                      <input
                        type="tel"
                        value={parentPhoneInput}
                        onChange={(e) => setParentPhoneInput(e.target.value)}
                        placeholder="+56 9 1234 5678"
                        className={`w-full rounded-xl px-3 py-2.5 text-xs font-mono font-bold border transition-all ${
                          isDark
                            ? 'bg-black/30 border-white/15 text-white focus:border-[#12A1A4]'
                            : 'bg-slate-50 border-slate-200 text-[#1C3257] focus:border-[#12A1A4]'
                        }`}
                      />
                    </div>

                    {parentFeedback && (
                      <div className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                        parentFeedback.type === 'success'
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                          : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                      }`}>
                        {parentFeedback.type === 'success' ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
                        <span>{parentFeedback.text}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSavingParent}
                      className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#12A1A4] hover:bg-[#0e8385] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      <Save size={14} />
                      <span>{isSavingParent ? 'Guardando en Base de Datos...' : 'Guardar Datos del Apoderado'}</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* BENTO 2: DATOS DEL ESTUDIANTE & NIVEL EDUCATIVO */}
              <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between ${
                isDark ? 'bg-[#10223D] border-[#1C3257] shadow-lg' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2 text-[#F8AD22] font-black text-xs uppercase tracking-wider">
                      <GraduationCap size={18} />
                      <span>2. Datos del Estudiante & Curso</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#F8AD22]/15 text-[#F8AD22]">
                      Editable
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">
                    Configura el nombre del alumno, su RUN y el curso oficial activo al que ingresa con su PIN.
                  </p>

                  <form onSubmit={handleSaveStudentProfile} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Nombre Completo del Alumno:
                      </label>
                      <input
                        type="text"
                        required
                        value={studentNameInput}
                        onChange={(e) => setStudentNameInput(e.target.value)}
                        placeholder="Ej. Mateo Silva Peña"
                        className={`w-full rounded-xl px-3 py-2.5 text-xs font-semibold border transition-all ${
                          isDark
                            ? 'bg-black/30 border-white/15 text-white focus:border-[#F8AD22]'
                            : 'bg-slate-50 border-slate-200 text-[#1C3257] focus:border-[#F8AD22]'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        RUN del Estudiante (Opcional):
                      </label>
                      <input
                        type="text"
                        value={studentRunInput}
                        onChange={(e) => setStudentRunInput(formatRut(e.target.value))}
                        placeholder="Ej. 25.123.456-7"
                        className={`w-full rounded-xl px-3 py-2.5 text-xs font-mono font-bold border transition-all ${
                          isDark
                            ? 'bg-black/30 border-white/15 text-white focus:border-[#F8AD22]'
                            : 'bg-slate-50 border-slate-200 text-[#1C3257] focus:border-[#F8AD22]'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Nivel Escolar Oficial Asignado:
                      </label>
                      <div className="relative">
                        <select
                          value={studentGradeInput}
                          onChange={(e) => setStudentGradeInput(e.target.value)}
                          className={`w-full appearance-none rounded-xl px-3 py-2.5 text-xs font-bold border cursor-pointer transition-all ${
                            isDark
                              ? 'bg-[#0A192F] border-white/15 text-white focus:border-[#F8AD22]'
                              : 'bg-slate-50 border-slate-200 text-[#1C3257] focus:border-[#F8AD22]'
                          }`}
                        >
                          {GRADES.map((g) => (
                            <option key={g} value={g} className={isDark ? 'bg-[#10223D] text-white' : 'bg-white text-[#1C3257]'}>
                              {g} (Bases Curriculares MINEDUC)
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-400 text-[11px] leading-relaxed">
                      💡 Cambiar de curso actualiza instantáneamente el catálogo de lecciones, cápsulas y ensayos MINEDUC que tu hijo verá en su pantalla.
                    </div>

                    {studentFeedback && (
                      <div className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                        studentFeedback.type === 'success'
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                          : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                      }`}>
                        {studentFeedback.type === 'success' ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
                        <span>{studentFeedback.text}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSavingStudent}
                      className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#F8AD22] hover:bg-[#e59d1a] text-[#0A192F] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      <Save size={14} />
                      <span>{isSavingStudent ? 'Guardando en Base de Datos...' : 'Guardar Datos del Estudiante'}</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* BENTO 3: SEGURIDAD & CAMBIO DE CONTRASEÑA */}
              <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between ${
                isDark ? 'bg-[#10223D] border-[#1C3257] shadow-lg' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2 text-rose-400 font-black text-xs uppercase tracking-wider">
                      <Lock size={18} />
                      <span>3. Clave de Acceso del Titular</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/15 text-rose-400">
                      Autoservicio
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Define una nueva contraseña segura para tu cuenta de apoderado. La actualización es inmediata y no requiere códigos por SMS ni validación de soporte.
                  </p>

                  <form onSubmit={handleSavePassword} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Nueva Contraseña (mínimo 6 caracteres):
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          required
                          value={newPasswordInput}
                          onChange={(e) => setNewPasswordInput(e.target.value)}
                          placeholder="Ingresa tu nueva clave secreta"
                          className={`w-full rounded-xl px-3 py-2.5 pr-12 text-xs font-semibold border transition-all ${
                            isDark
                              ? 'bg-black/30 border-white/15 text-white focus:border-rose-400'
                              : 'bg-slate-50 border-slate-200 text-[#1C3257] focus:border-rose-400'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          title={showNewPassword ? 'Ocultar' : 'Mostrar'}
                        >
                          {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Confirmar Nueva Contraseña:
                      </label>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={confirmPasswordInput}
                        onChange={(e) => setConfirmPasswordInput(e.target.value)}
                        placeholder="Repite la nueva clave secreta"
                        className={`w-full rounded-xl px-3 py-2.5 text-xs font-semibold border transition-all ${
                          isDark
                            ? 'bg-black/30 border-white/15 text-white focus:border-rose-400'
                            : 'bg-slate-50 border-slate-200 text-[#1C3257] focus:border-rose-400'
                        }`}
                      />
                    </div>

                    {passwordFeedback && (
                      <div className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                        passwordFeedback.type === 'success'
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                          : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                      }`}>
                        {passwordFeedback.type === 'success' ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
                        <span>{passwordFeedback.text}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSavingPassword}
                      className="w-full mt-2 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      <KeyRound size={14} />
                      <span>{isSavingPassword ? 'Actualizando Clave...' : 'Actualizar Contraseña'}</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* BENTO 4: PIN DE ACCESO DIRECTO DEL ESTUDIANTE */}
              <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between ${
                isDark ? 'bg-[#0E1C33] border-[#F8AD22]/40 shadow-lg' : 'bg-white border-amber-200 shadow-sm'
              }`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2 text-[#F8AD22] font-black text-xs uppercase tracking-wider">
                      <KeyRound size={18} />
                      <span>4. PIN de Acceso del Estudiante</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#F8AD22]/20 text-[#F8AD22] text-[10px] font-extrabold uppercase">
                      Aula Virtual
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Tu hijo/a no necesita recordar correos ni contraseñas complejas. Solo digita este PIN de 6 dígitos para ingresar directamente a sus lecciones.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#0A192F] border-2 border-[#F8AD22] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Código PIN de 6 dígitos
                      </div>
                      <div className="font-mono text-3xl font-black text-[#F8AD22] tracking-[0.25em] mt-0.5">
                        {student.pin || parent.studentPin || '123456'}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyPin}
                      className="px-3.5 py-2 rounded-xl bg-[#F8AD22] hover:bg-[#e09b1f] text-[#0A192F] font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                      title="Copiar PIN"
                    >
                      {copiedPin ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                      <span>{copiedPin ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>

                  <div className="pt-2 space-y-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        onClick={handleRegeneratePin}
                        className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                        title="Generar un nuevo PIN de forma instantánea"
                      >
                        <RotateCcw size={14} className="text-[#57d6f3]" />
                        <span>Regenerar Nuevo PIN</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSharePinWhatsApp}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-xs font-bold text-[#25D366] flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <span>Enviar por WhatsApp</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setViewMode('student');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#12A1A4] hover:bg-[#0e8385] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <Play size={14} />
                      <span>Ingresar al Salón de Clases con este PIN</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* BENTO 5: SUSCRIPCIÓN & FACTURACIÓN DE AUTOSERVICIO (FULL WIDTH) */}
              <div className={`lg:col-span-2 p-6 sm:p-8 rounded-3xl border flex flex-col justify-between ${
                isDark ? 'bg-[#10223D] border-[#1C3257] shadow-lg' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
                      <Shield size={18} />
                      <span>5. Suscripción Familiar & Estado del Plan</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      isSubscriptionActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {isSubscriptionActive ? 'Plan Activo (Sin restricciones)' : 'Suscripción Cancelada'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-black/20 border border-white/5 space-y-1">
                      <span className="text-[11px] text-slate-400 block font-semibold">Estado del Servicio:</span>
                      <strong className="text-sm font-black text-emerald-400 block">
                        {isSubscriptionActive ? 'Activo & Renovado' : 'Dado de Baja (Sin cobro)'}
                      </strong>
                      <span className="text-[10px] text-slate-500 block">Acceso ilimitado al temario completo</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/20 border border-white/5 space-y-1">
                      <span className="text-[11px] text-slate-400 block font-semibold">Plan Oficial:</span>
                      <strong className={`text-sm font-black ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                        {parent.plan || 'EstudioSimple Pro Anual'}
                      </strong>
                      <span className="text-[10px] text-slate-500 block">Todas las asignaturas MINEDUC</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/20 border border-white/5 space-y-1">
                      <span className="text-[11px] text-slate-400 block font-semibold">Cursos Habilitados:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(parent.enrolledGrades || [student.grade || selectedGrade]).map(g => (
                          <span key={g} className="px-2 py-0.5 rounded-md bg-[#12A1A4]/20 text-[#57d6f3] font-bold text-[10px]">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {cancelMessage && (
                    <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
                      {cancelMessage}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <p className="text-[11px] text-slate-400 leading-relaxed max-w-xl">
                      Cuentas con autonomía total: puedes dar de baja o pausar tu cuenta en cualquier momento con un solo clic, sin llamadas de retención ni trámites burocráticos.
                    </p>

                    {isSubscriptionActive ? (
                      <button
                        type="button"
                        onClick={() => setShowCancelModal(true)}
                        className="py-2 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:text-rose-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                      >
                        <AlertTriangle size={14} />
                        <span>Cancelar / Dar de Baja Suscripción</span>
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-amber-400 italic">
                        Suscripción finalizada. Acceso vigente hasta término de ciclo.
                      </span>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* MODAL DE CONFIRMACION PARA CANCELAR SUSCRIPCION */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#10223D] border border-white/20 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative text-white">
            <button
              type="button"
              onClick={() => setShowCancelModal(false)}
              className="absolute right-4 top-4 p-1.5 text-white/50 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Cerrar"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">Cancelar Suscripción</h3>
                <p className="text-xs text-white/60">EstudioSimple Homeschooling</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              ¿Estás segura/o de dar de baja tu suscripción? No se te realizarán cobros futuros. Tu hijo/a mantendrá acceso a las cápsulas y cuadernos hasta que concluya el período actual de facturación.
            </p>

            <div>
              <label className="block text-[11px] text-white/70 font-semibold mb-1">
                Motivo de cancelación (opcional):
              </label>
              <input
                type="text"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Ej. Terminé las lecciones requeridas..."
                className="input-field w-full rounded-xl px-3 py-2 text-xs bg-black/30 border border-white/10"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all cursor-pointer"
              >
                No, mantener activa
              </button>
              <button
                type="button"
                onClick={handleCancelSubscription}
                disabled={isCancelling}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white transition-all cursor-pointer disabled:opacity-50"
              >
                {isCancelling ? 'Cancelando...' : 'Confirmar Baja'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
