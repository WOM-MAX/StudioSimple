import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Heart, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setViewMode } = useApp();

  return (
    <footer 
      className="border-t border-black/10 transition-colors duration-300 pt-12 pb-8 px-4 md:px-8"
      style={{ backgroundColor: 'var(--hf-bg)', color: 'var(--hf-text)' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setViewMode('landing')}>
            <img 
              alt="Estudio Simple Logo" 
              className="h-36 md:h-48 w-auto object-contain rounded-lg" 
              src="/logos/Logo con todo.png"
            />
          </div>

          <p className="text-sm opacity-90 leading-relaxed">
            Plataforma inclusiva de preparación para Exámenes Libres del MINEDUC (Chile), bajo el Decreto 2272. Diseñada para aprender en familia, sin estrés ni ansiedad.
          </p>
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Alineado a Temarios MINEDUC 2026</span>
          </div>
        </div>

        {/* Links Rápidos */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--footer-heading)' }}>Navegación</h4>
          <ul className="space-y-2.5 text-sm font-normal">
            <li>
              <button onClick={() => setViewMode('landing')} className="hover:text-[#12A1A4] transition-colors">
                Inicio & Método
              </button>
            </li>
            <li>
              <button onClick={() => setViewMode('student')} className="hover:text-[#12A1A4] transition-colors">
                Panel del Estudiante
              </button>
            </li>
            <li>
              <button onClick={() => setViewMode('parent')} className="hover:text-[#12A1A4] transition-colors">
                Panel del Apoderado
              </button>
            </li>
            <li>
              <button onClick={() => setViewMode('checkout')} className="hover:text-[#12A1A4] transition-colors">
                Planes y Checkout
              </button>
            </li>
          </ul>
        </div>

        {/* Asignaturas */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--footer-heading)' }}>Asignaturas Evaluadas</h4>
          <ul className="space-y-2.5 text-sm font-normal opacity-90">
            <li className="flex items-center gap-2">Matemáticas (3° a 8° Básico)</li>
            <li className="flex items-center gap-2">Lenguaje y Comunicación</li>
            <li className="flex items-center gap-2">Ciencias Naturales</li>
            <li className="flex items-center gap-2">Historia, Geografía y C. Social</li>
            <li className="flex items-center gap-2">Idioma Extranjero: Inglés</li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--footer-heading)' }}>Redes Sociales</h4>
          <ul className="space-y-2.5 text-sm font-normal opacity-90">
            <li><a href="#instagram" className="hover:underline">Instagram</a></li>
            <li><a href="#facebook" className="hover:underline">Facebook</a></li>
            <li><a href="#youtube" className="hover:underline">YouTube</a></li>
            <li><a href="#whatsapp" className="hover:underline">WhatsApp</a></li>
          </ul>
        </div>

      </div>

      {/* Animated Marquee Banner with Motion & Extra Options */}
      <div className="max-w-7xl mx-auto my-8 pt-6 border-t border-black/10 overflow-hidden w-full relative">
        <div className="animate-marquee flex items-center gap-12 py-2 cursor-pointer">
          {/* Sequence 1 */}
          <div className="flex items-center gap-3 shrink-0">
            <img src="/logos/Casa.png" alt="Para aprender en casa" className="w-9 h-9 object-contain" />
            <span className="text-sm font-medium whitespace-nowrap opacity-90">Para aprender en casa</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <img src="/logos/Personas.png" alt="En familia, mejor juntos" className="w-9 h-9 object-contain" />
            <span className="text-sm font-medium whitespace-nowrap opacity-90">En familia, mejor juntos</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <img src="/logos/Ampolleta.png" alt="Comprender es avanzar" className="w-9 h-9 object-contain" />
            <span className="text-sm font-medium whitespace-nowrap opacity-90">Comprender es avanzar</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <img src="/logos/Crecimiento.png" alt="Paso a paso, sin complicaciones" className="w-9 h-9 object-contain" />
            <span className="text-sm font-medium whitespace-nowrap opacity-90">Paso a paso, sin complicaciones</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 bg-white/10 px-4 py-2 rounded-full border border-white/20">
            <span className="material-symbols-outlined text-[#12A1A4] text-xl">verified</span>
            <span className="text-sm font-bold whitespace-nowrap opacity-95">Temarios MINEDUC 2026</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 bg-white/10 px-4 py-2 rounded-full border border-white/20">
            <span className="material-symbols-outlined text-[#F8AD22] text-xl">school</span>
            <span className="text-sm font-bold whitespace-nowrap opacity-95">Exámenes Libres (3° a 8° Básico)</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 bg-white/10 px-4 py-2 rounded-full border border-white/20">
            <span className="material-symbols-outlined text-[#EE751C] text-xl">favorite</span>
            <span className="text-sm font-bold whitespace-nowrap opacity-95">Sin estrés ni ansiedad pedagógica</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 bg-white/10 px-4 py-2 rounded-full border border-white/20">
            <span className="material-symbols-outlined text-[#60A5FA] text-xl">analytics</span>
            <span className="text-sm font-bold whitespace-nowrap opacity-95">Seguimiento en tiempo real</span>
          </div>

          {/* Sequence 2 (Duplicated for Seamless Loop) */}
          <div className="flex items-center gap-3 shrink-0">
            <img src="/logos/Casa.png" alt="Para aprender en casa" className="w-9 h-9 object-contain" />
            <span className="text-sm font-medium whitespace-nowrap opacity-90">Para aprender en casa</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <img src="/logos/Personas.png" alt="En familia, mejor juntos" className="w-9 h-9 object-contain" />
            <span className="text-sm font-medium whitespace-nowrap opacity-90">En familia, mejor juntos</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <img src="/logos/Ampolleta.png" alt="Comprender es avanzar" className="w-9 h-9 object-contain" />
            <span className="text-sm font-medium whitespace-nowrap opacity-90">Comprender es avanzar</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <img src="/logos/Crecimiento.png" alt="Paso a paso, sin complicaciones" className="w-9 h-9 object-contain" />
            <span className="text-sm font-medium whitespace-nowrap opacity-90">Paso a paso, sin complicaciones</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 bg-white/10 px-4 py-2 rounded-full border border-white/20">
            <span className="material-symbols-outlined text-[#12A1A4] text-xl">verified</span>
            <span className="text-sm font-bold whitespace-nowrap opacity-95">Temarios MINEDUC 2026</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 bg-white/10 px-4 py-2 rounded-full border border-white/20">
            <span className="material-symbols-outlined text-[#F8AD22] text-xl">school</span>
            <span className="text-sm font-bold whitespace-nowrap opacity-95">Exámenes Libres (3° a 8° Básico)</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 bg-white/10 px-4 py-2 rounded-full border border-white/20">
            <span className="material-symbols-outlined text-[#EE751C] text-xl">favorite</span>
            <span className="text-sm font-bold whitespace-nowrap opacity-95">Sin estrés ni ansiedad pedagógica</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 bg-white/10 px-4 py-2 rounded-full border border-white/20">
            <span className="material-symbols-outlined text-[#60A5FA] text-xl">analytics</span>
            <span className="text-sm font-bold whitespace-nowrap opacity-95">Seguimiento en tiempo real</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-60">
        <p>© 2026 EstudioSimple Chile. Todos los derechos reservados.</p>
        <p className="flex items-center gap-2">
          <span>Decreto 2272 MINEDUC</span>
          <span>•</span>
          <span>PWA Local-First</span>
        </p>
      </div>
    </footer>
  );
};

