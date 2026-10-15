import React from 'react';
import { useApp } from '../../context/AppContext';
import { GradeLevel } from '../../types';
import {
  Lock,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Shield,
  Sun,
  Moon,
  Sparkles,
  Home,
  ArrowLeft
} from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

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
    themeMode,
    toggleThemeMode
  } = useApp();

  const isDark = themeMode === 'dark';
  const enrolledGrades: GradeLevel[] = authSession?.enrolledGrades || parent.enrolledGrades || ['7° Básico'];

  const handleSelectCourse = (grade: GradeLevel) => {
    const saved = localStorage.getItem('estudio_simple_student');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        parsed.grade = grade;
        localStorage.setItem('estudio_simple_student', JSON.stringify(parsed));
      } catch {}
    }
    setViewMode('parent');
  };

  return (
    <div
      className={`min-h-screen font-sans flex flex-col transition-colors duration-200 ${
        isDark
          ? 'bg-[#0A192F] text-[#F8FAFC]'
          : 'bg-[#FAFAFC] text-slate-900'
      }`}
    >
      {/* 1. CABECERA INSTITUCIONAL MINIMALISTA */}
      <header
        className={`border-b sticky top-0 z-30 px-4 sm:px-8 py-3 transition-colors duration-200 ${
          isDark
            ? 'bg-[#10223D]/95 backdrop-blur-md border-[#1C3257]'
            : 'bg-white/95 backdrop-blur-md border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Marca y Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#1C3257] border-[#2A4365] text-[#57d6f3] hover:bg-[#2A4365]'
                  : 'bg-teal-50/70 border-teal-200/70 text-[#0E8284] hover:bg-teal-100/70'
              }`}
              title="Volver a la Página de Inicio (Landing)"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Volver a Inicio</span>
            </button>
            <div className="w-7 h-7 rounded-lg bg-[#F8AD22] flex items-center justify-center font-black text-xs text-[#1C3257] shadow-xs">
              ES
            </div>
            <div>
              <span className={`font-display font-bold text-sm tracking-tight block leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                EstudioSimple
              </span>
              <span className="text-[10px] text-[#12A1A4] font-bold uppercase tracking-wider">
                Selección de Cursos Oficiales
              </span>
            </div>
          </div>

          {/* Perfil, Modo Claro/Oscuro y Cierre de Sesión */}
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

            <div className="hidden sm:flex flex-col text-right text-xs">
              <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {parent.name || 'Apoderado'}
              </span>
              <span className="text-[10px] text-slate-500">
                Estudiante: {student.name || 'Estudiante'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setViewMode('landing')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
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
        <div className="text-center max-w-2xl mx-auto pt-3 space-y-2">
          <Badge variant="teal" className="gap-1.5 px-3 py-1 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#12A1A4]" />
            <span>Control de Acceso por Matrícula</span>
          </Badge>
          <h1 className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Selecciona tu Curso de Estudio
          </h1>
          <p className={`text-sm leading-relaxed max-w-xl mx-auto font-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Tu cuenta tiene acceso exclusivo a los niveles contratados en el plan de homeschooling.
            Selecciona el curso activo para acceder a la ruta de lecciones de 30 minutos.
          </p>
        </div>

        {/* 3. GRILLA BENTO DE CURSOS (ESTILO STRIPE/LINK LIGHT MODE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {ALL_COURSES.map((item) => {
            const isEnrolled = enrolledGrades.includes(item.grade);

            return (
              <Card
                key={item.grade}
                className={`p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 ${
                  isEnrolled
                    ? isDark
                      ? 'bg-[#10223D] border-teal-500/40 ring-1 ring-[#12A1A4]/30 shadow-md hover:-translate-y-0.5'
                      : 'bg-white border-slate-200/90 ring-1 ring-[#12A1A4]/40 bg-gradient-to-b from-teal-50/20 to-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5'
                    : isDark
                    ? 'bg-[#0E1B30]/60 border-slate-800 opacity-60 hover:opacity-80'
                    : 'bg-white/70 border-slate-200/80 opacity-70 hover:opacity-90 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-slate-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100/90 dark:bg-slate-800 dark:text-slate-400 px-2.5 py-0.5 rounded-md border border-slate-200/70 dark:border-slate-700">
                      {item.range}
                    </span>
                    {isEnrolled ? (
                      <Badge variant="teal" className="gap-1.5 px-2.5 py-1 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#12A1A4]" />
                        <span>Curso Activo</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 ml-0.5 animate-pulse" />
                      </Badge>
                    ) : (
                      <Badge variant="subtle" className="gap-1 px-2.5 py-0.5 text-[11px]">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>No Adquirido</span>
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h2 className={`font-display text-xl sm:text-2xl font-bold mb-1.5 tracking-tight ${
                      isEnrolled
                        ? isDark ? 'text-white' : 'text-slate-900'
                        : isDark ? 'text-slate-300' : 'text-slate-700'
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

                <div className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800/80 space-y-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                      <BookOpen className="w-3.5 h-3.5 text-[#12A1A4]" />
                      <span>{item.totalOas} Objetivos MINEDUC</span>
                    </span>
                    <Badge variant="amber" className="text-[10px] px-2 py-0.5">
                      Temario EELL
                    </Badge>
                  </div>

                  {isEnrolled ? (
                    <Button
                      variant="teal"
                      onClick={() => handleSelectCourse(item.grade)}
                      className="w-full text-xs font-bold py-2.5 shadow-xs flex items-center justify-center gap-2"
                    >
                      <span>Entrar al Catálogo de Clases</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="subtle"
                      disabled
                      className="w-full text-xs font-semibold py-2.5 flex items-center justify-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Bloqueado · No Contratado</span>
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* 4. NOTA INFORMATIVA MINIMALISTA */}
        <Card
          className={`p-4 sm:p-5 flex items-center gap-3.5 text-xs leading-relaxed max-w-2xl mx-auto ${
            isDark
              ? 'bg-[#10223D] border-[#1C3257] text-slate-400'
              : 'bg-white border-slate-200/80 text-slate-600 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
          }`}
        >
          <div className="p-2 rounded-lg bg-teal-50/80 border border-teal-200/70 text-[#12A1A4] shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <p className="font-normal text-slate-600 dark:text-slate-400">
            Los cursos habilitados corresponden a las asignaciones validadas por el administrador del sistema.
            Si necesitas inscribir un nivel adicional, el cambio se reflejará automáticamente tras la activación en el panel docente.
          </p>
        </Card>
      </main>
    </div>
  );
};

export default CourseSelector;
