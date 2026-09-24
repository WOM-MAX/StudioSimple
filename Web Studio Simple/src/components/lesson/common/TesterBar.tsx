import React, { useState, useEffect, useRef } from 'react';
import { SyncViewMode } from '../../../types/lesson';
import { useLessonSync } from '../../../context/LessonSyncContext';
import { useApp } from '../../../context/AppContext';
import { findInjectedLesson } from '../../../lib/lesson-repository';
import {
  Monitor,
  UserRound,
  UsersRound,
  ExternalLink,
  RotateCcw,
  HeartPulse,
  ArrowLeft,
  Home,
  BookOpen,
  ChevronDown,
  Menu,
  Check,
  Wrench
} from 'lucide-react';

export const TesterBar: React.FC = () => {
  const { viewMode, setViewMode, resetSession, openNewWindow, session, toggleOxygenPause, lessonData } = useLessonSync();
  const { setViewMode: setAppViewMode, setActiveSynchronizedLesson } = useApp();

  const [openDropdown, setOpenDropdown] = useState<'nav' | 'subject' | 'view' | 'tools' | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const subjects = [
    {
      name: 'Matemática',
      short: 'Mat',
      oa: 'OA 1',
      badgeColor: 'bg-[#1C3257] text-white',
      match: 'Mat'
    },
    {
      name: 'Lengua y Literatura',
      short: 'Len',
      oa: 'OA 3',
      badgeColor: 'bg-[#EE751C] text-white',
      match: 'Leng'
    },
    {
      name: 'Ciencias Naturales',
      short: 'Cie',
      oa: 'OA 1',
      badgeColor: 'bg-[#10B981] text-white',
      match: 'Cien'
    },
    {
      name: 'Historia y Ciencias Sociales',
      short: 'His',
      oa: 'OA 2',
      badgeColor: 'bg-[#8C52FF] text-white',
      match: 'Hist'
    },
    {
      name: 'Idioma Extranjero Inglés',
      short: 'Ing',
      oa: 'OA 9',
      badgeColor: 'bg-[#4A964E] text-white',
      match: 'Ing'
    }
  ];

  const currentSubjectObj = subjects.find((s) => lessonData.metadata.subject.includes(s.match)) || subjects[0];

  return (
    <header
      ref={containerRef}
      className="bg-white/95 border border-[#d9dde2] rounded-2xl flex items-center justify-between gap-3 max-w-[1800px] min-h-[58px] mx-auto mb-4 px-4 py-2 shadow-sm backdrop-blur-sm relative z-50"
    >
      {/* Brand & Context */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[#1C3257] font-extrabold text-xs tracking-tight flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#EE751C] animate-pulse" />
            EstudioSimple · Aula Sincronizada
          </span>
          <span className="text-slate-500 text-[11px] font-medium">
            {lessonData.metadata.grade} : {lessonData.metadata.subject} : Clase {lessonData.metadata.lessonNumber}
          </span>
        </div>
      </div>

      {/* Dropdown Menus (Listas que se despliegan hacia abajo) */}
      <div className="flex items-center gap-2">
        {/* 1. Dropdown Navegacion */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'nav' ? null : 'nav')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              openDropdown === 'nav'
                ? 'bg-slate-100 border-slate-300 text-[#1C3257] shadow-xs'
                : 'bg-white border-slate-200 text-[#334155] hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <Menu className="w-3.5 h-3.5 text-[#EE751C]" />
            <span>Navegación</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${openDropdown === 'nav' ? 'rotate-180' : ''}`} />
          </button>

          {openDropdown === 'nav' && (
            <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn">
              <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Destinos de la plataforma
              </span>
              <button
                type="button"
                onClick={() => {
                  setOpenDropdown(null);
                  setAppViewMode('landing');
                }}
                className="w-full text-left px-3 py-2 flex items-center gap-2.5 text-xs font-bold text-slate-700 hover:bg-[#12A1A4]/10 hover:text-[#0d7d80] transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-[#12A1A4] flex items-center justify-center text-white shrink-0">
                  <Home className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-extrabold">Inicio</div>
                  <div className="text-[10px] text-slate-400 font-normal">Página principal (Landing)</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpenDropdown(null);
                  setAppViewMode('parent');
                }}
                className="w-full text-left px-3 py-2 flex items-center gap-2.5 text-xs font-bold text-slate-700 hover:bg-[#EE751C]/10 hover:text-[#d96512] transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-[#EE751C] flex items-center justify-center text-white shrink-0">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-extrabold">Catálogo de Clases</div>
                  <div className="text-[10px] text-slate-400 font-normal">Plan y progreso de lecciones</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpenDropdown(null);
                  setAppViewMode('courses');
                }}
                className="w-full text-left px-3 py-2 flex items-center gap-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border-t border-slate-100 mt-1"
              >
                <div className="w-6 h-6 rounded-lg bg-[#1C3257] flex items-center justify-center text-white shrink-0">
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-extrabold">Selección de Cursos</div>
                  <div className="text-[10px] text-slate-400 font-normal">Cambiar de nivel curricular</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* 2. Dropdown Materia y Clase */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'subject' ? null : 'subject')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              openDropdown === 'subject'
                ? 'bg-slate-100 border-slate-300 text-[#1C3257] shadow-xs'
                : 'bg-white border-slate-200 text-[#334155] hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${currentSubjectObj.badgeColor}`}>
              {currentSubjectObj.short}
            </span>
            <span className="font-extrabold text-[#1C3257]">
              {currentSubjectObj.name} · Clase {lessonData.metadata.lessonNumber}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${openDropdown === 'subject' ? 'rotate-180' : ''}`} />
          </button>

          {openDropdown === 'subject' && (
            <div className="absolute left-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-fadeIn">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                Seleccionar Asignatura (7° Básico)
              </span>
              <div className="space-y-1 mb-3">
                {subjects.map((subj) => {
                  const isSelected = lessonData.metadata.subject.includes(subj.match);
                  return (
                    <button
                      key={subj.short}
                      type="button"
                      onClick={() => {
                        const l = findInjectedLesson('7° Básico', subj.name, subj.oa, 1);
                        if (l) setActiveSynchronizedLesson(l);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-100 text-[#1C3257] border border-slate-200'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-extrabold ${subj.badgeColor}`}>
                          {subj.short}
                        </span>
                        <div>
                          <span>{subj.name}</span>
                          <span className="text-[10px] text-slate-400 ml-1.5 font-medium">({subj.oa})</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#1C3257]" />}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-slate-100 pt-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                  Cambiar Número de Clase
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((num) => {
                    const isSelected = lessonData.metadata.lessonNumber === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          const l = findInjectedLesson(
                            lessonData.metadata.grade,
                            lessonData.metadata.subject,
                            lessonData.metadata.oaCode,
                            num
                          );
                          if (l) setActiveSynchronizedLesson(l);
                          setOpenDropdown(null);
                        }}
                        className={`py-1.5 rounded-xl text-xs font-extrabold text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EE751C] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title={`Clase ${num}`}
                      >
                        0{num}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Dropdown Modos de Pantalla */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'view' ? null : 'view')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              openDropdown === 'view'
                ? 'bg-slate-100 border-slate-300 text-[#1C3257] shadow-xs'
                : 'bg-white border-slate-200 text-[#334155] hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {viewMode === 'split' ? (
              <UsersRound className="w-3.5 h-3.5 text-[#1C3257]" />
            ) : viewMode === 'adult' ? (
              <UserRound className="w-3.5 h-3.5 text-[#EE751C]" />
            ) : (
              <Monitor className="w-3.5 h-3.5 text-[#12A1A4]" />
            )}
            <span>
              {viewMode === 'split' ? 'Ambas pantallas' : viewMode === 'adult' ? 'Solo Adulto' : 'Solo Estudiante'}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${openDropdown === 'view' ? 'rotate-180' : ''}`} />
          </button>

          {openDropdown === 'view' && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn">
              <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Disposición de Pantalla
              </span>
              <button
                type="button"
                onClick={() => {
                  setViewMode('split');
                  setOpenDropdown(null);
                }}
                className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === 'split' ? 'bg-slate-100 text-[#1C3257]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <UsersRound className="w-4 h-4 text-[#1C3257]" />
                  <span>Ambas pantallas (Split)</span>
                </div>
                {viewMode === 'split' && <Check className="w-3.5 h-3.5 text-[#1C3257]" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setViewMode('adult');
                  setOpenDropdown(null);
                }}
                className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === 'adult' ? 'bg-slate-100 text-[#EE751C]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <UserRound className="w-4 h-4 text-[#EE751C]" />
                  <span>Solo Adulto (Host)</span>
                </div>
                {viewMode === 'adult' && <Check className="w-3.5 h-3.5 text-[#EE751C]" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setViewMode('student');
                  setOpenDropdown(null);
                }}
                className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === 'student' ? 'bg-slate-100 text-[#12A1A4]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-[#12A1A4]" />
                  <span>Solo Estudiante (Cliente)</span>
                </div>
                {viewMode === 'student' && <Check className="w-3.5 h-3.5 text-[#12A1A4]" />}
              </button>
            </div>
          )}
        </div>

        {/* 4. Dropdown Herramientas y Monitores */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'tools' ? null : 'tools')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              openDropdown === 'tools' || session.isOxygenPauseActive
                ? 'bg-slate-100 border-slate-300 text-[#1C3257] shadow-xs'
                : 'bg-white border-slate-200 text-[#334155] hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-[#EE751C]" />
            <span>Herramientas</span>
            {session.isOxygenPauseActive && (
              <span className="w-2 h-2 rounded-full bg-[#EE751C] animate-ping" />
            )}
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${openDropdown === 'tools' ? 'rotate-180' : ''}`} />
          </button>

          {openDropdown === 'tools' && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn">
              <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Autorregulación y Monitores
              </span>
              <button
                type="button"
                onClick={() => {
                  toggleOxygenPause();
                  setOpenDropdown(null);
                }}
                className={`w-full text-left px-3 py-2 flex items-center gap-2.5 text-xs font-bold transition-colors cursor-pointer ${
                  session.isOxygenPauseActive
                    ? 'bg-[#fff0e4] text-[#ee751c]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <HeartPulse className="w-4 h-4 text-[#EE751C]" />
                <div>
                  <div className="font-extrabold">
                    {session.isOxygenPauseActive ? 'Reanudar Clase' : 'Pausa de Oxígeno'}
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal">Autorregulación emocional guiada</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  openNewWindow('adult');
                  setOpenDropdown(null);
                }}
                className="w-full text-left px-3 py-2 flex items-center gap-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-slate-500" />
                <div>
                  <div className="font-extrabold">Monitor de Adulto</div>
                  <div className="text-[10px] text-slate-400 font-normal">Abrir en monitor secundario</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  openNewWindow('student');
                  setOpenDropdown(null);
                }}
                className="w-full text-left px-3 py-2 flex items-center gap-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-slate-500" />
                <div>
                  <div className="font-extrabold">Monitor de Estudiante</div>
                  <div className="text-[10px] text-slate-400 font-normal">Abrir en tablet o segundo monitor</div>
                </div>
              </button>

              <div className="border-t border-slate-100 my-1 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    resetSession();
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 flex items-center gap-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-red-500" />
                  <div>
                    <div className="font-extrabold">Reiniciar Clase</div>
                    <div className="text-[10px] text-red-400 font-normal">Volver a la portada de la lección</div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
