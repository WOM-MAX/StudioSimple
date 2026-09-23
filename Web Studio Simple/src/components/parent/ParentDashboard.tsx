import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OFFICIAL_SUBJECTS, getSubjectOAs, CurricularOA } from '../../data/curriculumData';
import { findInjectedLesson } from '../../lib/lesson-repository';
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
  Home
} from 'lucide-react';

const GRADES = ['3° Básico', '4° Básico', '5° Básico', '6° Básico', '7° Básico', '8° Básico'];

export const ParentDashboard: React.FC = () => {
  const { setViewMode, setActiveSynchronizedLesson, logout, parent, student, themeMode, toggleThemeMode } = useApp();
  const [selectedGrade, setSelectedGrade] = useState('7° Básico');
  const [selectedSubject, setSelectedSubject] = useState('Matemática');
  const [selectedOaIndex, setSelectedOaIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'lessons' | 'analytics'>('lessons');

  const currentOAs = getSubjectOAs(selectedGrade, selectedSubject);
  const activeOa: CurricularOA = currentOAs[selectedOaIndex] || currentOAs[0];
  const isDark = themeMode === 'dark';

  const handleSubjectChange = (subjectName: string) => {
    setSelectedSubject(subjectName);
    setSelectedOaIndex(0);
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${
      isDark
        ? 'bg-[#0A192F] text-[#F8FAFC]'
        : 'bg-gradient-to-b from-[#EDF2F7] via-[#F8FAFC] to-[#EBF3F5] text-[#1C3257]'
    }`}>
      {/* 1. TOP HEADER (UNIFIED & MINIMALIST WITH LIVE BREADCRUMB) */}
      <header className={`border-b sticky top-0 z-30 px-4 sm:px-8 py-3.5 transition-colors duration-300 ${
        isDark
          ? 'bg-[#10223D] border-[#1C3257]'
          : 'bg-white/85 backdrop-blur-md border-slate-200/90 shadow-xs'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand Identity & Return to Course Selector with Live Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isDark ? 'bg-[#1C3257] border-[#2A4365] text-[#57d6f3] hover:bg-[#2A4365]' : 'bg-teal-50 border-teal-200 text-[#12A1A4] hover:bg-teal-100/70'
              }`}
              title="Volver a la Landing Page Oficial"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('courses')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isDark ? 'bg-[#0A192F] border-[#1C3257] text-white hover:bg-[#1C3257]' : 'bg-slate-100 border-slate-200 text-[#1C3257] hover:bg-slate-200'
              }`}
              title="Volver a la Selección de Cursos"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Cursos</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className={`font-bold ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>{selectedGrade}</span>
              <span className="text-[#748093]">›</span>
              <span className="font-semibold text-[#12A1A4]">{selectedSubject}</span>
              <span className="text-[#748093]">›</span>
              <span className={`font-bold px-2 py-0.5 rounded-lg text-[11px] ${
                isDark ? 'bg-[#1C3257] text-[#F8AD22]' : 'bg-[#EAF2F8] text-[#1C3257]'
              }`}>
                {activeOa.code}
              </span>
            </div>
          </div>

          {/* Selectores de Curso y Asignatura */}
          <div className={`flex items-center gap-2 p-1 rounded-2xl border ${
            isDark ? 'bg-[#0A192F] border-[#1C3257]' : 'bg-slate-100/80 border-slate-200'
          }`}>
            {/* Curso */}
            <div className="relative">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className={`appearance-none font-bold text-xs py-1.5 pl-3 pr-7 rounded-xl border focus:outline-none focus:border-[#12A1A4] cursor-pointer shadow-xs ${
                  isDark ? 'bg-[#10223D] text-white border-[#1C3257]' : 'bg-white text-[#1C3257] border-slate-200'
                }`}
              >
                {GRADES.map((g) => (
                  <option key={g} value={g} className={isDark ? 'bg-[#10223D] text-white' : 'bg-white text-[#1C3257]'}>
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
                className={`appearance-none font-bold text-xs py-1.5 pl-3 pr-7 rounded-xl border focus:outline-none focus:border-[#12A1A4] cursor-pointer shadow-xs ${
                  isDark ? 'bg-[#10223D] text-white border-[#1C3257]' : 'bg-white text-[#1C3257] border-slate-200'
                }`}
              >
                {OFFICIAL_SUBJECTS.map((s) => (
                  <option key={s.id} value={s.name} className={isDark ? 'bg-[#10223D] text-white' : 'bg-white text-[#1C3257]'}>
                    {s.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Theme Toggle, Profile & Logout */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleThemeMode}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#1C3257] border-[#2A4365] text-[#F8AD22] hover:bg-[#2A4365]'
                  : 'bg-slate-100 border-slate-200 text-[#1C3257] hover:bg-slate-200'
              }`}
              title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className="hidden md:flex flex-col text-right">
              <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                {parent.name || 'Apoderado'}
              </span>
              <span className="text-[10px] text-slate-500">Pupilo: {student.name || 'Estudiante'}</span>
            </div>

            <button
              type="button"
              onClick={() => logout()}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Cerrar Sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. TAB SELECTOR BAR */}
      <div className={`border-b ${isDark ? 'bg-[#0E1C33] border-[#1C3257]' : 'bg-white/85 backdrop-blur-md border-slate-200/90 shadow-xs'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('lessons')}
            className={`py-3.5 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
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
            className={`py-3.5 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
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
                <span className="text-xs font-black text-[#12A1A4] bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                  {selectedGrade}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {OFFICIAL_SUBJECTS.map((sub) => {
                  const isSelected = selectedSubject.toLowerCase().includes(sub.id) || selectedSubject === sub.name;
                  const subjectOAs = getSubjectOAs(selectedGrade, sub.name);
                  const totalLessons = subjectOAs.reduce((acc, oa) => acc + oa.lessons.length, 0);
                  const iconMap: Record<string, string> = {
                    mat: 'calculate',
                    len: 'auto_stories',
                    cie: 'biotech',
                    his: 'public',
                    ing: 'translate'
                  };
                  const subIcon = iconMap[sub.id] || 'school';
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => handleSubjectChange(sub.name)}
                      className={`relative rounded-2xl p-4 pt-5 pb-4 font-bold text-xs transition-all duration-300 flex flex-col items-center gap-2.5 border text-center cursor-pointer overflow-hidden group ${
                        isSelected
                          ? isDark
                            ? 'border-2 shadow-lg ring-1 ring-opacity-40 scale-[1.03]'
                            : 'border-2 shadow-xl scale-[1.03]'
                          : isDark
                          ? 'bg-[#10223D] border-[#1C3257] text-slate-400 hover:bg-[#1C3257]/60 hover:text-white hover:scale-[1.02]'
                          : 'bg-white/90 backdrop-blur-xs border-slate-200/90 text-slate-600 hover:bg-white hover:border-slate-300 hover:shadow-md hover:scale-[1.02]'
                      }`}
                      style={isSelected ? {
                        borderColor: sub.color,
                        backgroundColor: isDark ? `${sub.color}22` : `${sub.color}0A`,
                        boxShadow: `0 8px 24px ${sub.color}25`,
                        ['--tw-ring-color' as string]: `${sub.color}60`
                      } : undefined}
                    >
                      {/* Decorative top accent bar */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-opacity duration-300"
                        style={{
                          backgroundColor: sub.color,
                          opacity: isSelected ? 1 : 0.15
                        }}
                      />

                      {/* Subject icon */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm"
                        style={{
                          backgroundColor: isSelected ? sub.color : `${sub.color}15`,
                          color: isSelected ? '#FFFFFF' : sub.color
                        }}
                      >
                        <span className="material-symbols-outlined text-xl">{subIcon}</span>
                      </div>

                      {/* Subject name */}
                      <span
                        className="text-xs sm:text-sm font-black leading-tight"
                        style={{ color: isSelected ? (isDark ? '#FFFFFF' : sub.color) : undefined }}
                      >
                        {sub.name}
                      </span>

                      {/* Lesson count pill */}
                      <span
                        className="text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-colors duration-300"
                        style={{
                          backgroundColor: isSelected ? `${sub.color}20` : isDark ? '#0A192F' : '#F1F5F9',
                          color: isSelected ? sub.color : isDark ? '#94A3B8' : '#64748B',
                          border: isSelected ? `1px solid ${sub.color}30` : '1px solid transparent'
                        }}
                      >
                        {totalLessons} clases · {subjectOAs.length} OAs
                      </span>

                      {/* Active indicator dot */}
                      {isSelected && (
                        <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#F8AD22] shadow-sm animate-pulse" />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                      className={`relative rounded-2xl p-4 transition-all duration-300 flex flex-col items-start gap-2 text-left cursor-pointer overflow-hidden group ${
                        isSelected
                          ? isDark
                            ? 'border-2 shadow-lg'
                            : 'border-2 shadow-lg'
                          : isDark
                          ? 'bg-[#10223D] border border-[#1C3257] hover:bg-[#1C3257]/60'
                          : 'bg-white/90 border border-slate-200/90 hover:bg-white hover:border-slate-300 hover:shadow-md'
                      }`}
                      style={isSelected ? {
                        borderColor: oaColor,
                        backgroundColor: isDark ? `${oaColor}15` : `${oaColor}08`,
                        boxShadow: `0 4px 16px ${oaColor}20`
                      } : undefined}
                    >
                      {/* Top accent bar */}
                      {isSelected && (
                        <div
                          className="absolute top-0 left-0 right-0 h-1"
                          style={{ backgroundColor: oaColor }}
                        />
                      )}

                      <div className="flex items-center justify-between w-full">
                        <span
                          className="text-[11px] font-black px-2.5 py-0.5 rounded-lg"
                          style={{
                            backgroundColor: isSelected ? oaColor : isDark ? '#1C3257' : '#F1F5F9',
                            color: isSelected ? '#FFFFFF' : isDark ? '#94A3B8' : '#64748B'
                          }}
                        >
                          {oa.code}
                        </span>
                        <span className={`text-[10px] font-bold ${
                          isSelected
                            ? 'text-emerald-600'
                            : isDark ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                          {oa.lessons.length} lecciones
                        </span>
                      </div>

                      {/* Full title - no truncation */}
                      <h4
                        className="text-xs sm:text-sm font-bold leading-snug"
                        style={{ color: isSelected ? (isDark ? '#FFFFFF' : oaColor) : isDark ? '#CBD5E1' : '#334155' }}
                      >
                        {oa.title}
                      </h4>

                      {/* Status indicator */}
                      <span className={`text-[10px] font-bold ${
                        index === 0
                          ? 'text-emerald-600'
                          : isDark ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        {index === 0 ? 'En curso' : 'Pendiente'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TARJETA HERO DEL OA ACTIVO */}
            <div className={`rounded-3xl p-6 sm:p-8 border relative overflow-hidden transition-all ${
              isDark
                ? 'bg-[#10223D] border-[#1C3257] shadow-lg shadow-slate-950/30'
                : 'bg-white border-slate-200/90 shadow-xl shadow-slate-200/60'
            }`}>
              {/* Franja decorativa superior de acento */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#12A1A4] via-[#38BDF8] to-[#F8AD22]" />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b pb-4 border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="bg-teal-50 text-[#0E8284] border border-teal-200 text-xs font-black px-3 py-1 rounded-full shadow-xs">
                    {activeOa.code}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Objetivo {selectedOaIndex + 1} de {currentOAs.length}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{activeOa.lessons.length} Lecciones de 30 min</span>
                </div>
              </div>

              <h1 className={`text-2xl sm:text-3xl font-black tracking-tight mb-2 ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                {activeOa.title}
              </h1>
              <p className={`text-sm leading-relaxed max-w-3xl mb-4 font-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {activeOa.shortDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#EE751C]" />
                  <strong className="text-slate-700 dark:text-slate-300">Progresión:</strong>
                  <span>0 de {activeOa.lessons.length} lecciones completadas</span>
                </div>
                <div className="w-36 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/60 dark:border-slate-700">
                  <div className="h-full bg-[#12A1A4] w-0 transition-all duration-500" />
                </div>
              </div>
            </div>

            {/* GRILLA DE LAS 5 LECCIONES */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-base font-black flex items-center gap-2 tracking-tight ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                  <span>Lecciones del Objetivo</span>
                  <span className="text-xs font-semibold text-slate-500">(Secuencia pedagógica de 30 min)</span>
                </h2>
                <span className="text-xs font-bold text-[#0E8284] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  Secuencia de 5 Fases
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {activeOa.lessons.map((lesson) => {
                  const injectedLesson = findInjectedLesson(
                    selectedGrade,
                    selectedSubject,
                    activeOa.code,
                    lesson.lessonNumber
                  );
                  const isReady = lesson.status === 'ready' || Boolean(injectedLesson);
                  const isCompleted = lesson.status === 'completed';

                  return (
                    <div
                      key={lesson.lessonNumber}
                      className={`rounded-3xl p-5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full min-h-[350px] ${
                        isReady
                          ? isDark
                            ? 'bg-[#10223D] border-2 border-[#12A1A4] ring-1 ring-[#12A1A4]/40 shadow-lg'
                            : 'bg-white border-2 border-[#12A1A4] ring-4 ring-[#12A1A4]/15 shadow-xl shadow-teal-900/10 hover:shadow-2xl hover:-translate-y-1'
                          : isDark
                          ? 'bg-[#0E1C33]/70 border border-[#1C3257] opacity-75'
                          : 'bg-white/80 backdrop-blur-xs border border-slate-200/90 shadow-sm hover:border-slate-300 hover:bg-white hover:shadow-md'
                      }`}
                    >
                      {/* Borde superior de acento para la clase activa */}
                      {isReady && (
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#12A1A4] to-[#EE751C]" />
                      )}

                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center justify-between gap-1.5">
                          <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                            isReady
                              ? 'bg-teal-50 text-[#0E8284] border border-teal-200'
                              : 'bg-slate-100 text-slate-500 border border-slate-200/70'
                          }`}>
                            Clase {lesson.lessonNumber} de 5
                          </span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 ${
                            isDark ? 'bg-[#0A192F] text-slate-400' : 'bg-slate-100 text-slate-600 border border-slate-200/70'
                          }`}>
                            <Clock className="w-3 h-3 text-[#EE751C]" />
                            {lesson.durationMinutes}m
                          </span>
                        </div>

                        <div className="text-[10px] font-black uppercase tracking-wider text-[#EE751C]">
                          Fase {lesson.lessonNumber} · Secuencia 30m
                        </div>

                        <h3 className={`text-sm sm:text-base font-black leading-snug tracking-tight ${
                          isReady
                            ? isDark ? 'text-white' : 'text-[#1C3257]'
                            : isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          {lesson.title}
                        </h3>

                        <p className={`text-xs leading-relaxed line-clamp-4 ${
                          isReady
                            ? isDark ? 'text-slate-300' : 'text-slate-600'
                            : isDark ? 'text-slate-500' : 'text-slate-500'
                        }`}>
                          {lesson.focusSummary}
                        </p>
                      </div>

                      <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-800">
                        {isReady ? (
                          <button
                            type="button"
                            onClick={() => {
                              if (injectedLesson) {
                                setActiveSynchronizedLesson(injectedLesson);
                              } else {
                                setActiveSynchronizedLesson(null);
                              }
                              setViewMode('lesson');
                            }}
                            className="w-full bg-gradient-to-r from-[#EE751C] to-[#E55B00] hover:from-[#E55B00] hover:to-[#CC4C00] text-white font-black text-xs py-3 px-3 rounded-2xl shadow-md shadow-orange-900/20 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
                          >
                            <Play className="w-3.5 h-3.5 fill-white shrink-0" />
                            <span>Iniciar Clase (Host)</span>
                          </button>
                        ) : isCompleted ? (
                          <div className="w-full bg-emerald-50 text-emerald-800 font-bold text-xs py-2.5 px-3 rounded-2xl flex items-center justify-center gap-1.5 border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Completada</span>
                          </div>
                        ) : (
                          <div className={`w-full font-bold text-xs py-2.5 px-3 rounded-2xl flex items-center justify-center gap-1.5 border ${
                            isDark
                              ? 'bg-[#0A192F] text-slate-500 border-[#1C3257]'
                              : 'bg-slate-100 text-slate-400 border-slate-200/70'
                          }`}>
                            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>Bloqueada</span>
                          </div>
                        )}
                      </div>
                    </div>
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

      </main>
    </div>
  );
};
