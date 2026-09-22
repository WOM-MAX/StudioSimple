import React, { useState } from 'react';
import { Compass, Sparkles, BookOpen, Shield, Sword, Award, ArrowRight } from 'lucide-react';

interface StageInfo {
  num: number;
  title: string;
  desc: string;
  tension: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const StudentHeroJourneyChart: React.FC = () => {
  const stages: StageInfo[] = [
    {
      num: 1,
      title: 'Mundo Ordinario',
      desc: 'La vida cotidiana del protagonista antes de que ocurra cualquier suceso extraordinario.',
      tension: 'Calma inicial',
      icon: Compass
    },
    {
      num: 2,
      title: 'La Llamada a la Aventura',
      desc: 'Surge un problema, desafío o misterio que altera la tranquilidad y exige una decisión.',
      tension: 'Conflicto emergente',
      icon: BookOpen
    },
    {
      num: 3,
      title: 'Cruce del Umbral',
      desc: 'El personaje abandona su zona conocida y entra al mundo nuevo o lleno de riesgos.',
      tension: 'Tensión creciente',
      icon: Shield
    },
    {
      num: 4,
      title: 'Pruebas y Aliados',
      desc: 'Enfrenta obstáculos, descubre quiénes son sus amigos y desarrolla nuevas habilidades.',
      tension: 'Desarrollo del nudo',
      icon: Sword
    },
    {
      num: 5,
      title: 'El Abismo (Prueba Máxima)',
      desc: 'La crisis más grande donde todo parece perdido. El héroe debe superar su mayor temor.',
      tension: 'Clímax dramático',
      icon: Sparkles
    },
    {
      num: 6,
      title: 'Regreso Transformado',
      desc: 'El protagonista vuelve a su entorno con una nueva sabiduría o poder que beneficia a todos.',
      tension: 'Desenlace y resolución',
      icon: Award
    }
  ];

  const [activeStage, setActiveStage] = useState<number>(1);
  const current = stages.find((s) => s.num === activeStage) || stages[0];
  const IconComp = current.icon;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-orange-200/90 text-center relative overflow-hidden transition-all duration-300">
      {/* Top Accent Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#EE751C] via-[#F59E0B] to-[#E55B00]" />

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 text-[#C2540A] border border-orange-200 font-bold text-xs uppercase tracking-wider mb-4 shadow-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-[#EE751C] animate-pulse" />
        <span>Organizador Gráfico · Estructura Narrativa Universal</span>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-[#1C3257] tracking-tight mb-2">
        Las 6 Etapas del Viaje del Héroe
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mb-6">
        Haz clic en cada etapa para explorar la progresión dramática del relato y entender cómo cambia el personaje.
      </p>

      {/* CIRCULAR / SEQUENTIAL STEP BUTTONS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-8">
        {stages.map((st) => {
          const isSelected = st.num === activeStage;
          const StIcon = st.icon;

          return (
            <button
              key={st.num}
              type="button"
              onClick={() => setActiveStage(st.num)}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? 'bg-gradient-to-b from-[#EE751C] to-[#E55B00] text-white border-transparent shadow-md scale-105'
                  : 'bg-slate-50 hover:bg-orange-50/50 text-slate-700 border-slate-200'
              }`}
            >
              <StIcon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-[#EE751C]'}`} />
              <span className="text-[10px] font-black uppercase tracking-tight">Etapa {st.num}</span>
              <span className={`text-[11px] font-bold truncate max-w-full ${isSelected ? 'text-white' : 'text-[#1C3257]'}`}>
                {st.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* DETAIL CARD */}
      <div className="bg-gradient-to-br from-orange-50/60 to-white p-6 rounded-2xl border border-orange-200/80 text-left flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EE751C] to-[#F59E0B] text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
          <IconComp className="w-8 h-8" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#EE751C]">
              Etapa {current.num}: {current.tension}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-orange-200 text-[#C2540A]">
              Arco Narrativo
            </span>
          </div>

          <h3 className="text-lg font-black text-[#1C3257] mb-1">
            {current.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {current.desc}
          </p>
        </div>
      </div>
    </div>
  );
};
