import React from 'react';
import { BookOpen, Moon, Compass, Sparkles, ExternalLink } from 'lucide-react';

interface StudentReadingResourceCardProps {
  title?: string;
  author?: string;
  pages?: string;
  description?: string;
}

export const StudentReadingResourceCard: React.FC<StudentReadingResourceCardProps> = ({
  title = 'El mejor amigo de un muchacho',
  author = 'Isaac Asimov',
  pages = 'Páginas 12–15 (Texto Escolar)',
  description = 'Observa la portada del cuento y el ambiente lunar: Jimmy Anderson y su fiel perro robot Robutt en la superficie de la Luna.'
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-orange-200/90 text-center relative overflow-hidden transition-all duration-300">
      {/* Top Accent Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#EE751C] via-[#F59E0B] to-[#12A1A4]" />

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 text-[#C2540A] border border-orange-200 font-bold text-xs uppercase tracking-wider mb-4 shadow-xs">
        <Moon className="w-3.5 h-3.5 text-[#EE751C]" />
        <span>Recurso de Lectura · Ciencia Ficción</span>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-[#1C3257] tracking-tight mb-1">
        “{title}”
      </h2>
      <p className="text-xs sm:text-sm font-bold text-[#EE751C] mb-3">
        {author} · {pages}
      </p>

      <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
        {description}
      </p>

      {/* Tarjetas de Claves de Observación */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-left">
        <div className="bg-slate-50 hover:bg-orange-50/50 transition-colors p-3.5 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-6 h-6 rounded-lg bg-orange-100 text-[#EE751C] font-black text-xs flex items-center justify-center">
              1
            </span>
            <span className="text-xs font-bold text-[#1C3257]">Ambiente Lunar</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            Cráteres rocosos, suelo árido y necesidad de traje espacial presurizado afuera.
          </p>
        </div>

        <div className="bg-slate-50 hover:bg-teal-50/50 transition-colors p-3.5 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-6 h-6 rounded-lg bg-teal-100 text-[#0E8284] font-black text-xs flex items-center justify-center">
              2
            </span>
            <span className="text-xs font-bold text-[#1C3257]">Jimmy Anderson</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            Nacido en la Luna; aprovecha la gravedad reducida para dar saltos largos.
          </p>
        </div>

        <div className="bg-slate-50 hover:bg-yellow-50/50 transition-colors p-3.5 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-6 h-6 rounded-lg bg-yellow-100 text-yellow-700 font-black text-xs flex items-center justify-center">
              3
            </span>
            <span className="text-xs font-bold text-[#1C3257]">Robutt</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            Perro robot cuadrúpedo con tendones de acero y sistema de comunicación por radio.
          </p>
        </div>
      </div>

      <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100/80 px-4 py-2 rounded-xl">
        <BookOpen className="w-3.5 h-3.5 text-[#12A1A4]" />
        <span>Presta atención a las preguntas que te formulará tu mentor sobre este texto</span>
      </div>
    </div>
  );
};
