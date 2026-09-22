import React, { useState } from 'react';
import { Flame, Footprints, Wheat, Home, Milestone } from 'lucide-react';

interface EraInfo {
  id: string;
  era: string;
  timeRange: string;
  title: string;
  lifestyle: string;
  keyInnovations: string[];
  notebookAction: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const StudentTimelineChart: React.FC = () => {
  const eras: EraInfo[] = [
    {
      id: 'paleo-inf',
      era: 'Paleolítico Temprano',
      timeRange: '2.500.000 a 300.000 a.C.',
      title: 'Hominización y Fuego',
      lifestyle: 'Grupos pequeños de homínidos recolectores. Desplazamiento constante siguiendo presas.',
      keyInnovations: [
        'Bipedismo: liberación de las manos para fabricar herramientas',
        'Primeras hachas de mano líticas de piedra tallada (cantos rodados)',
        'Descubrimiento y control del fuego para abrigo y cocción'
      ],
      notebookAction: 'Anota en tu cuaderno 2 ventajas inmediatas que otorgó el control del fuego a los primeros homínidos.',
      icon: Flame
    },
    {
      id: 'paleo-sup',
      era: 'Paleolítico Superior',
      timeRange: '40.000 a 10.000 a.C.',
      title: 'Cazadores y Arte Rupestre',
      lifestyle: 'Bandas nómadas organizadas de Homo sapiens con lenguaje simbólico complejo.',
      keyInnovations: [
        'Puntas de flecha, arpones de hueso y vestimenta de pieles',
        'Pinturas rupestres en cavernas con sentido ritual o comunicativo',
        'Organización social igualitaria y cooperación colectiva'
      ],
      notebookAction: 'Dibuja en tu cuaderno un símbolo o figura de arte rupestre y describe qué creencia intentaba transmitir.',
      icon: Footprints
    },
    {
      id: 'neolitico',
      era: 'Revolución Neolítica',
      timeRange: '10.000 a 4.000 a.C.',
      title: 'Agricultura y Domesticación',
      lifestyle: 'Nacimiento del sedentarismo en la Media Luna Fértil (Creciente Fértil).',
      keyInnovations: [
        'Domesticación de cereales (trigo, cebada) y animales (ovejas, cabras)',
        'Piedra pulida: hoces, molinos de mano y morteros',
        'Construcción de viviendas permanentes de adobe y madera'
      ],
      notebookAction: 'Construye en tu cuaderno una tabla de 2 columnas comparando la vida nómada versus la vida sedentaria.',
      icon: Wheat
    },
    {
      id: 'aldeas',
      era: 'Neolítico Tardío y Cobre',
      timeRange: '4.000 a 3.000 a.C.',
      title: 'Aldeas y Especialización',
      lifestyle: 'Comunidades complejas con excedentes alimentarios y estratificación inicial.',
      keyInnovations: [
        'Producción de excedentes alimentarios que permitió alimentar artesanos',
        'Aparición de la cerámica para almacenar granos y tejidos de lana',
        'Primeras autoridades políticas y surgimiento de poblados amurallados'
      ],
      notebookAction: 'Explica en tu cuaderno por qué el excedente de alimentos permitió que surgieran nuevos oficios.',
      icon: Home
    }
  ];

  const [activeEraId, setActiveEraId] = useState<string>('neolitico');
  const current = eras.find((e) => e.id === activeEraId) || eras[2];
  const IconComp = current.icon;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-purple-200/90 text-center relative overflow-hidden transition-all duration-300">
      {/* Top Accent Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8C52FF] via-[#A855F7] to-[#6366F1]" />

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-[#6B21A8] border border-purple-200 font-bold text-xs uppercase tracking-wider mb-4 shadow-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-[#8C52FF] animate-pulse" />
        <span>Línea de Tiempo Histórica · De la Hominización a la Aldea</span>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-[#1C3257] tracking-tight mb-2">
        La Gran Transformación de la Prehistoria
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mb-6">
        Recorre cronológicamente las etapas para comprender el impacto de la revolución agrícola en el modo de vida humano.
      </p>

      {/* TIMELINE HORIZONTAL STEPPER */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
        {eras.map((era, index) => {
          const isSelected = era.id === activeEraId;
          const EraIcon = era.icon;

          return (
            <button
              key={era.id}
              type="button"
              onClick={() => setActiveEraId(era.id)}
              className={`p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? 'bg-gradient-to-b from-[#8C52FF] to-[#6366F1] text-white border-transparent shadow-md scale-105'
                  : 'bg-slate-50 hover:bg-purple-50/50 text-slate-700 border-slate-200'
              }`}
            >
              <EraIcon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-[#8C52FF]'}`} />
              <span className="text-[10px] font-black uppercase tracking-tight">Hito {index + 1}</span>
              <span className={`text-[11px] font-bold truncate max-w-full ${isSelected ? 'text-white' : 'text-[#1C3257]'}`}>
                {era.title}
              </span>
              <span className={`text-[9px] ${isSelected ? 'text-purple-100' : 'text-slate-400'}`}>
                {era.timeRange.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* DETAIL CARD */}
      <div className="bg-gradient-to-br from-purple-50/40 via-white to-indigo-50/30 p-6 rounded-2xl border border-purple-200/80 text-left">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8C52FF] to-[#6366F1] text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
            <IconComp className="w-7 h-7" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6B21A8]">
                {current.era}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-purple-200 text-[#7E22CE]">
                {current.timeRange}
              </span>
            </div>
            <h3 className="text-lg font-black text-[#1C3257]">
              {current.title}
            </h3>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
            Modo de vida y subsistencia:
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {current.lifestyle}
          </p>
        </div>

        {/* INNOVATIONS LIST */}
        <div className="bg-white/80 rounded-xl p-4 border border-purple-100 mb-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#1C3257] mb-2 flex items-center gap-1.5">
            <Milestone className="w-4 h-4 text-[#8C52FF]" />
            <span>Innovaciones y cambios culturales:</span>
          </h4>
          <ul className="space-y-1.5">
            {current.keyInnovations.map((inn, idx) => (
              <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C52FF] mt-1.5 shrink-0" />
                <span>{inn}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* NOTEBOOK BRIDGE */}
        <div className="p-3.5 bg-purple-50/80 rounded-xl border border-purple-200/90 flex items-start gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#6B21A8] shrink-0 mt-0.5">
            Cuaderno:
          </span>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            {current.notebookAction}
          </p>
        </div>
      </div>
    </div>
  );
};
