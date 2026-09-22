import React, { useState } from 'react';
import { Activity, Heart, Users, ShieldCheck } from 'lucide-react';

interface DimensionInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  indicators: string[];
  notebookAction: string;
  icon: React.ComponentType<{ className?: string }>;
  colorGradient: string;
  borderActive: string;
  badgeBg: string;
  badgeText: string;
}

export const StudentDimensionsChart: React.FC = () => {
  const dimensions: DimensionInfo[] = [
    {
      id: 'bio',
      title: 'Dimensión Biológica',
      subtitle: 'Cuerpo, maduración y caracteres sexuales',
      description: 'Abarca los cambios físicos de la pubertad, los caracteres sexuales primarios y secundarios, la anatomía y el funcionamiento biológico del cuerpo humano.',
      indicators: [
        'Crecimiento acelerado y cambios de la voz o vello corporal',
        'Maduración de los órganos reproductores y glándulas endocrinas',
        'Cuidado de la higiene corporal y hábitos de descanso'
      ],
      notebookAction: 'Dibuja en tu cuaderno una silueta humana y anota 2 cambios biológicos propios de la pubertad.',
      icon: Activity,
      colorGradient: 'from-[#10B981] to-[#059669]',
      borderActive: 'border-[#10B981]',
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-[#059669]'
    },
    {
      id: 'afec',
      title: 'Dimensión Afectiva',
      subtitle: 'Emociones, sentimientos e identidad personal',
      description: 'Involucra cómo experimentamos y expresamos nuestros sentimientos, la autoestima, los afectos hacia amigos y familia, y la capacidad de empatía.',
      indicators: [
        'Reconocimiento y regulación de emociones intensas',
        'Desarrollo de vínculos de amistad sinceros y leales',
        'Construcción de la autoestima y autoimagen positiva'
      ],
      notebookAction: 'Escribe en tu cuaderno 3 palabras que representen emociones positivas en una amistad constructiva.',
      icon: Heart,
      colorGradient: 'from-[#12A1A4] to-[#0E7490]',
      borderActive: 'border-[#12A1A4]',
      badgeBg: 'bg-teal-50',
      badgeText: 'text-[#0E7490]'
    },
    {
      id: 'soc',
      title: 'Dimensión Social',
      subtitle: 'Convivencia, comunicación y respeto mutuo',
      description: 'Reflexiona sobre la interacción con el entorno: las normas de convivencia, la cultura, la equidad, los roles comunitarios y el respeto irrestricto al consentimiento ajeno.',
      indicators: [
        'Comunicación clara y asertiva de límites personales',
        'Respeto por la diversidad y rechazo al acoso o presión de pares',
        'Importancia de la red familiar y comunitaria como apoyo'
      ],
      notebookAction: 'Formula en tu cuaderno una frase que exprese respeto y consentimiento claro frente a tus pares.',
      icon: Users,
      colorGradient: 'from-[#0284C7] to-[#0369A1]',
      borderActive: 'border-[#0284C7]',
      badgeBg: 'bg-sky-50',
      badgeText: 'text-[#0369A1]'
    },
    {
      id: 'eti',
      title: 'Dimensión Ética y Moral',
      subtitle: 'Valores, responsabilidad y toma de decisiones',
      description: 'Comprende el sentido de justicia, los valores individuales y colectivos, la responsabilidad sobre los propios actos y el autocuidado consciente.',
      indicators: [
        'Evaluación de consecuencias antes de actuar',
        'Responsabilidad por el propio bienestar y el de los demás',
        'Adhesión a valores como honestidad, dignidad y lealtad'
      ],
      notebookAction: 'Anota en tu cuaderno una regla personal que proteja tu dignidad y tu bienestar.',
      icon: ShieldCheck,
      colorGradient: 'from-[#0D9488] to-[#115E59]',
      borderActive: 'border-[#0D9488]',
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-[#115E59]'
    }
  ];

  const [activeId, setActiveId] = useState<string>('bio');
  const current = dimensions.find((d) => d.id === activeId) || dimensions[0];
  const IconComp = current.icon;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-emerald-200/90 text-center relative overflow-hidden transition-all duration-300">
      {/* Top Accent Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#10B981] via-[#12A1A4] to-[#059669]" />

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200 font-bold text-xs uppercase tracking-wider mb-4 shadow-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
        <span>Organizador Gráfico · Modelo Integral de la Sexualidad</span>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-[#1C3257] tracking-tight mb-2">
        Las 4 Dimensiones de la Sexualidad Humana
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mb-6">
        Selecciona cada cuadrante del modelo integral para descubrir sus componentes y su aplicación en la vida cotidiana.
      </p>

      {/* QUADRANT SELECTOR GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {dimensions.map((dim) => {
          const isSelected = dim.id === activeId;
          const DimIcon = dim.icon;

          return (
            <button
              key={dim.id}
              type="button"
              onClick={() => setActiveId(dim.id)}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? `bg-gradient-to-b ${dim.colorGradient} text-white border-transparent shadow-md scale-105`
                  : 'bg-slate-50 hover:bg-emerald-50/50 text-slate-700 border-slate-200'
              }`}
            >
              <DimIcon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-[#10B981]'}`} />
              <span className={`text-xs font-black tracking-tight ${isSelected ? 'text-white' : 'text-[#1C3257]'}`}>
                {dim.title.replace('Dimensión ', '')}
              </span>
            </button>
          );
        })}
      </div>

      {/* DETAIL CARD */}
      <div className="bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 p-6 rounded-2xl border border-emerald-200/80 text-left">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${current.colorGradient} text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20`}>
            <IconComp className="w-7 h-7" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#059669]">
                Visión Integral de la Persona
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${current.badgeBg} border border-emerald-200 ${current.badgeText}`}>
                {current.subtitle}
              </span>
            </div>
            <h3 className="text-lg font-black text-[#1C3257]">
              {current.title}
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          {current.description}
        </p>

        {/* INDICATORS LIST */}
        <div className="bg-white/80 rounded-xl p-4 border border-emerald-100 mb-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#1C3257] mb-2">
            Manifestaciones concretas:
          </h4>
          <ul className="space-y-1.5">
            {current.indicators.map((ind, idx) => (
              <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
                <span>{ind}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* NOTEBOOK BRIDGE */}
        <div className="p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-200/90 flex items-start gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#059669] shrink-0 mt-0.5">
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
