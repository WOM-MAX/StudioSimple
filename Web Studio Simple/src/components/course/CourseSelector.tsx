import React from 'react';
import { useApp } from '../../context/AppContext';
import { GradeLevel } from '../../types';
import {
  Lock,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Shield,
  LogOut,
  Sun,
  Moon,
  Sparkles,
  Home,
  ArrowLeft
} from 'lucide-react';

interface CourseCardData {
  grade: GradeLevel;
  range: string;
  description: string;
  totalOas: number;
}

const ALL_COURSES: CourseCardData[] = [
  {
    grade: '3° Básico',
    range: '8 a 9 años',
    description: 'Bases de lectura comprensiva, cálculo elemental y exploración del entorno.',
    totalOas: 29
  },
  {
    grade: '4° Básico',
    range: '9 a 10 años',
    description: 'Consolidación de operaciones aritméticas, comprensión lectora e indagación científica.',
    totalOas: 32
  },
  {
    grade: '5° Básico',
    range: '10 a 11 años',
    description: 'Fracciones, pensamiento histórico de Chile y sistemas del cuerpo humano.',
    totalOas: 43
  },
  {
    grade: '6° Básico',
    range: '11 a 12 años',
    description: 'Razonamiento proporcional, álgebra inicial y organización democrática.',
    totalOas: 44
  },
  {
    grade: '7° Básico',
    range: '12 a 13 años',
    description: 'Temarios Oficiales de Exámenes Libres MINEDUC: Números enteros, hominización y método científico.',
    totalOas: 39
  },
  {
    grade: '8° Básico',
    range: '13 a 14 años',
    description: 'Preparación para enseñanza media: Álgebra avanzada, química celular y pensamiento crítico.',
    totalOas: 40
  }
];

export const CourseSelector: React.FC = () => {
  const {
    authSession,
    parent,
    student,
    setViewMode,
    logout,
    themeMode,
    toggleThemeMode
  } = useApp();

  const isDark = themeMode === 'dark';
  const enrolledGrades: GradeLevel[] = authSession?.enrolledGrades || parent.enrolledGrades || ['7° Básico'];

  const handleSelectCourse = (grade: GradeLevel) => {
    setViewMode('parent');
  };

  return (
    <div
      className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${
        isDark
          ? 'bg-[#0A192F] text-[#F8FAFC]'
          : 'bg-gradient-to-b from-[#EDF2F7] via-[#F8FAFC] to-[#EBF3F5] text-[#1C3257]'
      }`}
    >
      {/* 1. CABECERA INSTITUCIONAL */}
      <header
        className={`border-b sticky top-0 z-30 px-4 sm:px-8 py-3.5 transition-colors duration-300 ${
          isDark
            ? 'bg-[#10223D] border-[#1C3257]'
            : 'bg-white/85 backdrop-blur-md border-slate-200/90 shadow-xs'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Marca y Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#1C3257] border-[#2A4365] text-[#57d6f3] hover:bg-[#2A4365]'
                  : 'bg-teal-50 border-teal-200 text-[#12A1A4] hover:bg-teal-100/70'
              }`}
              title="Volver a la Página de Inicio (Landing)"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Volver a la Landing</span>
            </button>
            <div className="w-8 h-8 rounded-xl bg-[#F8AD22] flex items-center justify-center font-black text-sm text-[#1C3257] shadow-xs">
              ES
            </div>
            <div>
              <span className={`font-extrabold text-base tracking-tight block leading-tight ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                EstudioSimple
              </span>
              <span className="text-[10px] text-[#12A1A4] font-bold uppercase tracking-wider">
                Selección de Cursos Oficiales
              </span>
            </div>
          </div>

          {/* Perfil, Modo Claro/Oscuro y Cierre de Sesión */}
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

            <div className="hidden sm:flex flex-col text-right text-xs">
              <span className={`font-bold ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
                {parent.name || 'Apoderado'}
              </span>
              <span className="text-[10px] text-slate-500">
                Estudiante: {student.name || 'Carla'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setViewMode('landing')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              title="Volver a la Landing Oficial"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Salir a Landing</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto pt-2 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-[#0E8284] text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#12A1A4]" />
            <span>Control de Acceso por Matrícula</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-[#1C3257]'}`}>
            Selecciona tu Curso de Estudio
          </h1>
          <p className={`text-sm leading-relaxed max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Tu cuenta tiene acceso exclusivo a los niveles contratados en el plan de homeschooling.
            Selecciona el curso activo para acceder a la ruta de lecciones de 30 minutos.
          </p>
        </div>

        {/* 3. GRILLA DE CURSOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_COURSES.map((item) => {
            const isEnrolled = enrolledGrades.includes(item.grade);

            return (
              <div
                key={item.grade}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  isEnrolled
                    ? isDark
                      ? 'bg-[#10223D] border-2 border-[#12A1A4] shadow-xl shadow-teal-950/20 ring-1 ring-[#12A1A4] hover:shadow-2xl hover:-translate-y-1'
                      : 'bg-white border-2 border-[#12A1A4] shadow-xl shadow-teal-900/10 ring-4 ring-[#12A1A4]/15 hover:shadow-2xl hover:-translate-y-1'
                    : isDark
                    ? 'bg-[#0E1B30]/70 border border-[#1C3257] opacity-65 hover:opacity-80'
                    : 'bg-white/80 backdrop-blur-xs border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 hover:bg-white'
                }`}
              >
                {/* Franja decorativa de acento en curso activo */}
                {isEnrolled && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#12A1A4] via-[#38BDF8] to-[#F8AD22]" />
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200/70">
                      {item.range}
                    </span>
                    {isEnrolled ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-teal-50 text-[#0E8284] border border-teal-200 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#12A1A4]" />
                        <span>Curso Activo</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>No Adquirido</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className={`text-xl sm:text-2xl font-black mb-1.5 tracking-tight ${
                      isEnrolled
                        ? isDark ? 'text-white' : 'text-[#1C3257]'
                        : isDark ? 'text-slate-300' : 'text-slate-800'
                    }`}>
                      {item.grade}
                    </h2>

                    <p className={`text-xs leading-relaxed font-normal ${
                      isEnrolled
                        ? isDark ? 'text-slate-300' : 'text-slate-600'
                        : isDark ? 'text-slate-500' : 'text-slate-500'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                      <BookOpen className="w-3.5 h-3.5 text-[#12A1A4]" />
                      <span>{item.totalOas} Objetivos MINEDUC</span>
                    </span>
                    <span className="font-bold text-xs px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80">
                      Temario EELL
                    </span>
                  </div>

                  {isEnrolled ? (
                    <button
                      type="button"
                      onClick={() => handleSelectCourse(item.grade)}
                      className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#12A1A4] to-[#0E8284] hover:from-[#0E8284] hover:to-[#0A6D6F] text-white font-black text-xs shadow-md shadow-teal-800/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <span>Entrar al Catálogo de Clases</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full py-3 px-4 rounded-2xl bg-slate-100 text-slate-400 font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed border border-slate-200/60"
                    >
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Bloqueado · No Contratado</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. NOTA INFORMATIVA */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border flex items-center gap-3.5 text-xs leading-relaxed max-w-2xl mx-auto shadow-xs ${
            isDark
              ? 'bg-[#10223D] border-[#1C3257] text-slate-400'
              : 'bg-white/90 backdrop-blur-md border-slate-200/90 text-slate-600'
          }`}
        >
          <div className="p-2 rounded-xl bg-teal-50 border border-teal-200 text-[#12A1A4] shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <p>
            Los cursos habilitados corresponden a las asignaciones validadas por el administrador del sistema.
            Si necesitas inscribir un nivel adicional, el cambio se reflejará automáticamente tras la activación en el panel docente.
          </p>
        </div>
      </main>
    </div>
  );
};

export default CourseSelector;
