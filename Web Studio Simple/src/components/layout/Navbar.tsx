import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ShieldCheck, HeartPulse, User, GraduationCap, Sun, Moon, Palette } from 'lucide-react';
import { BrandColorOption } from '../../types';

export const Navbar: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    student,
    setIsSensoryPauseOpen,
    themeMode,
    toggleThemeMode,
    headerFooterColor,
    setHeaderFooterColor,
  } = useApp();

  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);

  const BRAND_COLORS: { id: BrandColorOption; hex: string; name: string }[] = [
    { id: 'yellow', hex: '#F8AD22', name: 'Amarillo Sol (Oficial)' },
    { id: 'orange', hex: '#EE751C', name: 'Naranja Estudio' },
    { id: 'turquoise', hex: '#12A1A4', name: 'Turquesa Mineduc' },
    { id: 'white', hex: '#FFFFFF', name: 'Blanco Puro' },
    { id: 'ice-blue', hex: '#F0F4F8', name: 'Blanco Azulado' },
    { id: 'silver', hex: '#78909C', name: 'Plata / Acero' },
    { id: 'graphite', hex: '#263238', name: 'Grafito / Carbón' },
  ];

  return (
    <header 
      className="fixed top-0 w-full z-50 transition-all duration-300 shadow-md border-b border-black/10" 
      style={{ backgroundColor: 'var(--hf-bg)', color: 'var(--hf-text)' }}
    >
      <div className="flex justify-between items-center px-4 md:px-8 max-w-7xl mx-auto py-3">
        
        {/* Brand Logo & Slogan */}
        <div 
          onClick={() => setViewMode('landing')}
          className="flex items-center cursor-pointer group"
        >
          <img 
            alt="Estudio Simple Logo" 
            className="h-20 md:h-28 w-auto object-contain rounded-lg transition-transform group-hover:scale-105" 
            src="/logos/Logo sin tag.png"
          />
        </div>

        {/* Dynamic Dual View Toggle, Colors & Counters */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Botón Único con Ícono Palette para Selección de Color de Header & Footer */}
          <div className="relative">
            <button
              onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border border-black/10 hover:scale-105 active:scale-95 bg-black/10 hover:bg-black/20 text-current"
              title="Cambiar Color de Encabezado y Pie de Página"
            >
              <Palette className="w-5 h-5 text-current" />
            </button>

            {isColorMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#101415] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 z-50 space-y-1 text-slate-800 dark:text-white">
                <div className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 text-slate-500 dark:text-slate-400 border-b border-black/5 dark:border-white/5 mb-1">
                  Color Header & Footer
                </div>
                {BRAND_COLORS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setHeaderFooterColor(c.id);
                      setIsColorMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                      headerFooterColor === c.id 
                        ? 'bg-[#18AFCB]/15 text-[#18AFCB] font-black' 
                        : 'hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full border border-black/20 shrink-0" style={{ backgroundColor: c.hex }} />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>





          {/* Student Stats (Visible in Student View) */}
          {viewMode === 'student' && (
            <div className="hidden sm:flex items-center gap-3 bg-[#123A72]/15 px-3 py-1.5 rounded-full border border-black/10">
              <div className="flex items-center gap-1 text-xs font-bold text-[#123A72]">
                <Sparkles className="w-4 h-4 text-[#F57C00]" />
                <span>{student.curiosityPoints} Pts</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#123A72]">
                <span>💎 {student.gems}</span>
              </div>
            </div>
          )}

          {/* Sensory Pause Button (For Student Mode) */}
          {viewMode === 'student' && (
            <button
              onClick={() => setIsSensoryPauseOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all shadow-sm"
              title="Pausa Sensorial de Autorregulación"
            >
              <HeartPulse className="w-4 h-4" />
              <span className="hidden md:inline">Pausa Sensorial</span>
            </button>
          )}


          {/* Navigation Mode Switcher */}
          <div className="flex items-center bg-[#123A72] p-1 rounded-xl shadow-inner">
            <button
              onClick={() => setViewMode('student')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'student'
                  ? 'bg-[#F57C00] text-white shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <span className="text-sm">🎮</span>
              <span>Estudiante</span>
            </button>

            <button
              onClick={() => setViewMode('parent')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'parent'
                  ? 'bg-[#18AFCB] text-white shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Apoderado</span>
            </button>
          </div>

          {/* Main Action / CTA */}
          {viewMode === 'landing' && (
            <button
              onClick={() => setViewMode('checkout')}
              className="hidden sm:flex items-center gap-2 bg-[#123A72] hover:bg-[#1C3257] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md hover:scale-105"
            >
              <User className="w-4 h-4 text-[#F57C00]" />
              <span>Comenzar Ahora</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
