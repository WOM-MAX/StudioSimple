import React, { useState } from 'react';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { TestimoniosConfig, TestimonioItem } from '../../types/cms';
import { getBorderStyles } from './borderStyles';

interface TestimoniosBlockProps {
  titulo?: string;
  subtitulo?: string;
  configuracion?: TestimoniosConfig;
}

const OFICIALES_TESTIMONIOS: TestimonioItem[] = [
  {
    nombre: 'Claudia M.',
    rol: 'Mamá de Lucas (5º Básico · Santiago Centro)',
    cita: 'Cuando Lucas quedó sin cupo en el colegio por el SAE y venía afectado por la convivencia del aula, decidimos dar el paso al homeschooling con temor de no saber qué enseñar. EstudioSimple nos dio una rutina clara: cápsulas breves y ejercicios directos al cuaderno. Rindió sus exámenes libres con promedio 6.5 sin peleas familiares.',
    estrellas: 5,
    badge: 'Homeschooling 1er año · Caso SAE',
    badgeColor: 'bg-[#12A1A4]/15 text-[#12A1A4] border-[#12A1A4]/30',
    initials: 'CM'
  },
  {
    nombre: 'Rodrigo T.',
    rol: 'Papá de Sofía (7º Básico · Ñuñoa)',
    cita: 'En el colegio tradicional Sofía colapsaba con las pruebas de 40 preguntas y el ruido constante. Con EstudioSimple estudia a su propio ritmo: 15 minutos en pantalla, escribe en su cuaderno y después practica con ensayos tipo evaluación formal. Los ensayos formativos le quitaron la fobia a las pruebas del MINEDUC.',
    estrellas: 5,
    badge: 'Neurodiversidad · TDAH & Ritmo Propio',
    badgeColor: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30',
    initials: 'RT'
  },
  {
    nombre: 'Marcela V.',
    rol: 'Mamá trabajadora de Tomás (3º Básico · Maipú)',
    cita: 'Trabajo todo el día y no soy profesora; no tenía tiempo de armar guías ni buscar temarios en internet hasta la noche. La plataforma me entrega el paso a paso exacto para guiar a Tomás en media hora diaria. Verlo escribir en su cuaderno con entusiasmo y saber que cumple al 100% con los temarios oficiales no tiene precio.',
    estrellas: 5,
    badge: 'Padres Trabajadores · Puente Pantalla-Cuaderno',
    badgeColor: 'bg-[#EE751C]/15 text-[#EE751C] border-[#EE751C]/30',
    initials: 'MV'
  },
  {
    nombre: 'Fernando S.',
    rol: 'Papá de Matías (6º Básico · La Florida)',
    cita: 'La prueba en el colegio examinador asignado era nuestro gran temor. Matías practicó con los ensayos de la plataforma durante dos meses y el día del examen reconoció de inmediato el formato formal de las preguntas. Aprobó todas las materias con notas sobresalientes.',
    estrellas: 5,
    badge: 'Aprobado MINEDUC · Promoción Escolar',
    badgeColor: 'bg-amber-500/15 text-amber-700 border-amber-500/30',
    initials: 'FS'
  }
];

export const TestimoniosBlock: React.FC<TestimoniosBlockProps> = ({
  titulo = 'Historias Reales de Familias Homeschoolers',
  subtitulo = 'Padres, madres y educadores en Santiago y regiones que transformaron su rutina de estudio sin estrés escolar.',
  configuracion: config = {}
}) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  // Determinar lista de testimonios a mostrar
  const testimonios: TestimonioItem[] =
    config.testimonios && config.testimonios.length > 0
      ? config.testimonios
      : OFICIALES_TESTIMONIOS;

  const diseno = config.diseno || 'grilla';

  const handlePrev = () => {
    setSliderIndex((prev) => (prev > 0 ? prev - 1 : testimonios.length - 1));
  };

  const handleNext = () => {
    setSliderIndex((prev) => (prev < testimonios.length - 1 ? prev + 1 : 0));
  };

  const starColor = config.colorEstrellas || '#F8AD22';
  const borderStyles = getBorderStyles(
    config.modoBorde || 'completo',
    config.colorBordeTarjeta || config.colorBorde,
    config.grosorBorde || '2px',
    '1px solid rgba(226, 232, 240, 0.9)'
  );

  const isHexDark = (color?: string): boolean => {
    if (!color || color === 'transparent') return false;
    let hex = color.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    if (hex.length !== 6) return false;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return false;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.55;
  };

  const isLightText =
    config.colorTexto === 'claro' ||
    (config.colorTexto !== 'oscuro' && Boolean(config.colorFondo && isHexDark(config.colorFondo)));

  const cardCustomStyles: React.CSSProperties = {
    ...(config.colorFondo ? { backgroundColor: config.colorFondo } : {}),
    ...borderStyles
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12A1A4]/10 text-[#12A1A4] border border-[#12A1A4]/20 text-xs font-black uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Comunidad y Validación Familiar</span>
          </div>
          {titulo && (
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {titulo}
            </h2>
          )}
          {subtitulo && (
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              {subtitulo}
            </p>
          )}
        </div>

        {/* Modalidad 1: Carrusel / Slider Horizontal */}
        {diseno === 'slider' ? (
          <div className="relative max-w-4xl mx-auto">
            <div 
              className={`rounded-3xl p-8 sm:p-12 border shadow-xl relative overflow-hidden ${
                isLightText ? 'text-white border-white/10' : 'bg-white text-slate-800 border-slate-200/90'
              }`}
              style={cardCustomStyles}
            >
              <Quote className={`absolute right-6 top-6 w-20 h-20 -rotate-12 select-none pointer-events-none ${
                isLightText ? 'text-white/10' : 'text-slate-100'
              }`} />

              {testimonios[sliderIndex] && (
                <div className="relative z-10 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonios[sliderIndex].estrellas || 5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5" style={{ color: starColor, fill: starColor }} />
                      ))}
                    </div>
                    {testimonios[sliderIndex].badge && (
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                          testimonios[sliderIndex].badgeColor ||
                          'bg-[#12A1A4]/10 text-[#12A1A4] border-[#12A1A4]/30'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{testimonios[sliderIndex].badge}</span>
                      </span>
                    )}
                  </div>

                  <p className={`text-base sm:text-lg italic leading-relaxed font-medium ${
                    isLightText ? 'text-slate-100' : 'text-slate-800'
                  }`}>
                    "{testimonios[sliderIndex].cita}"
                  </p>

                  <div className={`pt-4 border-t flex items-center justify-between ${
                    isLightText ? 'border-white/10' : 'border-slate-100'
                  }`}>
                    <div className="flex items-center gap-3.5">
                      {testimonios[sliderIndex].fotoUrl ? (
                        <img
                          src={testimonios[sliderIndex].fotoUrl}
                          alt={testimonios[sliderIndex].nombre}
                          className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-[#0B254D] text-[#57d6f3] font-black text-sm flex items-center justify-center border border-white/10 shadow-sm">
                          {testimonios[sliderIndex].initials ||
                            testimonios[sliderIndex].nombre.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h4 className={`text-sm sm:text-base font-extrabold ${
                          isLightText ? 'text-white' : 'text-slate-900'
                        }`}>
                          {testimonios[sliderIndex].nombre}
                        </h4>
                        <p className={`text-xs font-medium ${
                          isLightText ? 'text-slate-300' : 'text-slate-500'
                        }`}>
                          {testimonios[sliderIndex].rol}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                          isLightText ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                        title="Anterior testimonio"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                          isLightText ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                        title="Siguiente testimonio"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Paginador de puntos */}
            <div className="flex justify-center items-center gap-2 mt-4">
              {testimonios.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSliderIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    sliderIndex === i ? 'w-8 bg-[#12A1A4]' : 'w-2 bg-slate-300'
                  }`}
                  title={`Ir al testimonio ${i + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Modalidad 2: Grilla de Tarjetas (Recomendado) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {testimonios.map((t, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-7 border shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 hover:-translate-y-1 relative overflow-hidden ${
                  isLightText ? 'text-white border-white/10' : 'bg-white text-slate-800 border-slate-200/90'
                }`}
                style={cardCustomStyles}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(t.estrellas || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4" style={{ color: starColor, fill: starColor }} />
                      ))}
                    </div>
                    {t.badge && (
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          t.badgeColor || 'bg-[#12A1A4]/10 text-[#12A1A4] border-[#12A1A4]/20'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{t.badge}</span>
                      </span>
                    )}
                  </div>

                  <p className={`text-xs sm:text-sm italic leading-relaxed font-normal ${
                    isLightText ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    "{t.cita}"
                  </p>
                </div>

                <div className={`pt-4 border-t flex items-center gap-3.5 ${
                  isLightText ? 'border-white/10' : 'border-slate-100'
                }`}>
                  {t.fotoUrl ? (
                    <img
                      src={t.fotoUrl}
                      alt={t.nombre}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-xs shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-[#0B254D] text-[#57d6f3] font-black text-xs flex items-center justify-center border border-white/10 shadow-xs shrink-0">
                      {t.initials || t.nombre.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className={`text-xs sm:text-sm font-extrabold leading-snug ${
                      isLightText ? 'text-white' : 'text-slate-900'
                    }`}>
                      {t.nombre}
                    </h4>
                    <p className={`text-[11px] leading-tight mt-0.5 ${
                      isLightText ? 'text-slate-300' : 'text-slate-400'
                    }`}>
                      {t.rol}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
