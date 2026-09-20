import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OFFICIAL_SUBJECTS, getSubjectOAs, CurricularOA } from '../../data/curriculumData';
import { Play, Lock, CheckCircle2, Clock, Sparkles, LogOut, Shield, Sun, Moon, ArrowLeft, User } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { setViewMode, logout, verifyParentPassword, student, themeMode, toggleThemeMode } = useApp();
  const [selectedGrade, setSelectedGrade] = useState(student.grade || '7° Básico');
  const [selectedSubject, setSelectedSubject] = useState('Matemática');
  const [selectedOaIndex, setSelectedOaIndex] = useState(0);
  const [showParentModal, setShowParentModal] = useState(false);
  const [parentPasswordInput, setParentPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const currentOAs = getSubjectOAs(selectedGrade, selectedSubject);
  const activeOa: CurricularOA = currentOAs[selectedOaIndex] || currentOAs[0];
  const isDark = themeMode === 'dark';

  const handleSubjectChange = (subjectName: string) => {
    setSelectedSubject(subjectName);
    setSelectedOaIndex(0);
  };

  const handleParentAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyParentPassword(parentPasswordInput)) {
      setShowParentModal(false);
      setViewMode('parent');
    } else {
      setPasswordError('Contraseña incorrecta.');
    }
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 select-none ${
      isDark ? 'bg-[#0A192F] text-[#F8FAFC]' : 'bg-[#F5F4EF] text-[#1C3257]'
    }`}>
      {/* 1. TOP HEADER (STUDENT PORTAL WITH LIVE BREADCRUMB) */}
      <header className={`border-b sticky top-0 z-30 px-4 sm:px-8 py-3.5 transition-colors duration-300 ${
        isDark ? 'bg-[#10223D] border-[#1C3257]' : 'bg-white border-[#E2E8F0] shadow-sm'
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Return to Course Selector with Live Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode('courses')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                isDark ? 'bg-[#0A192F] border-[#1C3257] text-white hover:bg-[#1C3257]' : 'bg-[#F5F4EF] border-[#E2E8F0] text-[#1C3257] hover:bg-[#EAEAEA]'
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

          {/* Theme Toggle, Avatar & Mentor Access */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleThemeMode}
              className={`p-2 rounded-xl border transition-all ${
                isDark
                  ? 'bg-[#1C3257] border-[#2A4365] text-[#F8AD22] hover:bg-[#2A4365]'
                  : 'bg-[#F5F4EF] border-[#E2E8F0] text-[#1C3257] hover:bg-[#EAEAEA]'
              }`}
              title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
              isDark ? 'bg-[#0A192F] border-[#1C3257]' : 'bg-[#F5F4EF] border-[#E2E8F0]'
            }`}>
              <User className="w-3.5 h-3.5 text-[#12A1A4]" />
              <span className={`text-xs font-bold hidden sm:inline ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                {student.name || 'Estudiante'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowParentModal(true);
                setParentPasswordInput('');
                setPasswordError('');
              }}
              className="flex items-center gap-1 text-xs font-bold text-[#748093] hover:text-current px-2.5 py-1.5 rounded-xl hover:bg-current/10 transition-colors"
              title="Acceso al Panel del Apoderado"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Modo Apoderado</span>
            </button>

            <button
              type="button"
              onClick={() => logout()}
              className="p-2 rounded-xl text-[#748093] hover:text-[#DC2626] hover:bg-[#FEE2E2] transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-8 space-y-6">
        
        {/* BARRA HORIZONTAL PROMINENTE DE LAS 5 ASIGNATURAS OFICIALES */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#748093] uppercase tracking-wider">
              Elige tu Asignatura · 7° Básico
            </span>
            <span className="text-[11px] font-bold text-[#12A1A4]">
              {OFFICIAL_SUBJECTS.length} Materias
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {OFFICIAL_SUBJECTS.map((sub) => {
              const isSelected = selectedSubject.toLowerCase().includes(sub.id) || selectedSubject === sub.name;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => handleSubjectChange(sub.name)}
                  className={`px-3.5 py-2.5 rounded-2xl font-bold text-xs transition-all flex flex-col items-start gap-1 border text-left shadow-sm ${
                    isSelected
                      ? isDark
                        ? 'bg-[#12A1A4] border-[#12A1A4] text-white shadow-md ring-2 ring-[#12A1A4]/40'
                        : 'bg-[#1C3257] border-[#1C3257] text-white shadow-md ring-2 ring-[#1C3257]/30'
                      : isDark
                      ? 'bg-[#10223D] border-[#1C3257] text-[#94A3B8] hover:bg-[#1C3257] hover:text-white'
                      : 'bg-white border-[#E2E8F0] text-[#526177] hover:bg-[#F0F4F8] hover:text-[#1C3257]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">{sub.shortName}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#F8AD22]" />}
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold truncate w-full">{sub.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* NAVEGACIÓN DE OBJETIVOS DE APRENDIZAJE */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#748093] uppercase tracking-wider">
              Tu Ruta de Aprendizaje · {selectedSubject}
            </span>
            <span className="text-xs font-semibold text-[#12A1A4]">
              {currentOAs.length} Objetivos
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {currentOAs.map((oa, index) => {
              const isSelected = index === selectedOaIndex;
              return (
                <button
                  key={oa.code}
                  type="button"
                  onClick={() => setSelectedOaIndex(index)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 shadow-sm ${
                    isSelected
                      ? isDark
                        ? 'bg-[#12A1A4] text-white shadow-md'
                        : 'bg-[#1C3257] text-white shadow-md'
                      : isDark
                      ? 'bg-[#10223D] text-[#94A3B8] border border-[#1C3257] hover:bg-[#1C3257]'
                      : 'bg-white text-[#526177] hover:bg-[#EAEAEA] border border-[#E2E8F0]'
                  }`}
                >
                  <span>{oa.code}</span>
                  <span className="font-normal opacity-80 truncate max-w-[140px]">· {oa.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TARJETA HERO DEL OBJETIVO ACTIVO */}
        <div className={`border rounded-3xl p-6 sm:p-8 shadow-sm ${
          isDark ? 'bg-[#10223D] border-[#1C3257]' : 'bg-white border-[#E2E8F0]'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b pb-4 border-current/10">
            <div className="flex items-center gap-2">
              <span className="bg-[#12A1A4] text-white text-[11px] font-extrabold px-3 py-1 rounded-full">
                {activeOa.code}
              </span>
              <span className="text-xs font-bold text-[#748093]">
                Misión {selectedOaIndex + 1} de {currentOAs.length}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#12A1A4] bg-[#E9F8F8] px-3 py-1 rounded-full border border-[#BCD6EA]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeOa.lessons.length} Clases de 30 min</span>
            </div>
          </div>

          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
            {activeOa.title}
          </h1>
          <p className={`text-sm leading-relaxed max-w-3xl mb-4 ${isDark ? 'text-[#94A3B8]' : 'text-[#526177]'}`}>
            {activeOa.shortDesc}
          </p>
        </div>

        {/* GRILLA DE LAS 5 LECCIONES */}
        <div>
          <h2 className={`text-base font-extrabold mb-3 ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
            Tus Clases del Objetivo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeOa.lessons.map((lesson) => {
              const isReady = lesson.status === 'ready';
              const isCompleted = lesson.status === 'completed';

              return (
                <div
                  key={lesson.lessonNumber}
                  className={`border rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between ${
                    isReady
                      ? isDark
                        ? 'bg-[#10223D] border-[#12A1A4] ring-1 ring-[#12A1A4]/40 shadow-md'
                        : 'bg-white border-[#12A1A4] ring-1 ring-[#12A1A4]/30 shadow-md'
                      : isDark
                      ? 'bg-[#0E1C33] border-[#1C3257] opacity-75'
                      : 'bg-white border-[#E2E8F0] opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-[#12A1A4] uppercase tracking-wider">
                        Clase {lesson.lessonNumber} de 5
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                        isDark ? 'bg-[#0A192F] text-[#94A3B8]' : 'bg-[#F5F4EF] text-[#748093]'
                      }`}>
                        <Clock className="w-3 h-3 text-[#EE751C]" />
                        {lesson.durationMinutes} min
                      </span>
                    </div>

                    <h3 className={`text-base font-extrabold leading-snug mb-1.5 ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                      {lesson.title}
                    </h3>
                    <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-[#94A3B8]' : 'text-[#526177]'}`}>
                      {lesson.focusSummary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-current/10">
                    {isReady ? (
                      <button
                        type="button"
                        onClick={() => setViewMode('lesson')}
                        className="w-full bg-[#12A1A4] hover:bg-[#0e8b8e] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Entrar a la Sala de Espera</span>
                      </button>
                    ) : isCompleted ? (
                      <div className="w-full bg-[#EAF4E8] text-[#255E29] font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 border border-[#BADCB8]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Completada</span>
                      </div>
                    ) : (
                      <div className={`w-full font-semibold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 border ${
                        isDark ? 'bg-[#0A192F] text-[#64748B] border-[#1C3257]' : 'bg-[#F5F4EF] text-[#8DA3C0] border-[#E2E8F0]'
                      }`}>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Bloqueada</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* MODAL DE SEGURIDAD PARA ACCESO DE APODERADO */}
      {showParentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl animate-fadeIn ${
            isDark ? 'bg-[#10223D] border-[#1C3257]' : 'bg-white border-[#E2E8F0]'
          }`}>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#E9F2F8] text-[#1C3257] flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Shield className="w-6 h-6 text-[#12A1A4]" />
              </div>
              <h3 className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                Acceso al Modo Apoderado
              </h3>
              <p className="text-xs text-[#748093] mt-1">Ingresa la contraseña del apoderado</p>
            </div>

            <form onSubmit={handleParentAccess} className="space-y-3">
              <input
                type="password"
                value={parentPasswordInput}
                onChange={(e) => {
                  setParentPasswordInput(e.target.value);
                  setPasswordError('');
                }}
                placeholder="Contraseña del apoderado"
                className={`w-full rounded-xl px-4 py-2.5 text-xs border focus:outline-none focus:border-[#12A1A4] focus:ring-1 focus:ring-[#12A1A4] ${
                  isDark
                    ? 'bg-[#0A192F] border-[#1C3257] text-white placeholder:text-[#64748B]'
                    : 'bg-[#F5F4EF] border-[#DCE2E6] text-[#1C3257]'
                }`}
                autoFocus
              />

              {passwordError && (
                <div className="text-[#DC2626] text-xs font-bold bg-[#FEE2E2] rounded-xl py-2 px-3 text-center">
                  {passwordError}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowParentModal(false)}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    isDark
                      ? 'bg-[#0A192F] text-[#94A3B8] hover:bg-[#1C3257]'
                      : 'bg-[#F5F4EF] text-[#657185] hover:bg-[#EAEAEA]'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#1C3257] text-white font-bold text-xs hover:bg-[#284773] transition-all shadow-md"
                >
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
