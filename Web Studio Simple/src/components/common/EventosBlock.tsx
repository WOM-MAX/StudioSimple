import React, { useState, useEffect, useRef } from 'react';
import {
  CalendarDays,
  MapPin,
  Video,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { CalendarioEvento } from '../../types/cmsExtras';
import { EventosConfig } from '../../types/cms';
import { loadEventos } from '../../data/initialCmsExtrasData';
import { getBorderStyles } from './borderStyles';

interface EventosBlockProps {
  titulo?: string;
  subtitulo?: string;
  configuracion?: EventosConfig;
}

const MONTHS_SHORT = [
  'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
  'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
];

const MONTHS_FULL = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const EventosBlock: React.FC<EventosBlockProps> = ({
  titulo = 'Calendario Oficial y Fechas MINEDUC',
  subtitulo = 'Hitos ministeriales, convocatorias de exámenes libres y talleres de acompañamiento pedagógico.',
  configuracion
}) => {
  const [eventos, setEventos] = useState<CalendarioEvento[]>(() => loadEventos());
  const sliderRef = useRef<HTMLDivElement>(null);
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
    configuracion?.colorTexto === 'claro'
      ? true
      : configuracion?.colorTexto === 'oscuro'
      ? false
      : configuracion?.colorFondo
      ? isHexDark(configuracion.colorFondo)
      : true;

  const cardBorderStyles = getBorderStyles(
    configuracion?.modoBorde || 'completo',
    configuracion?.colorBorde,
    configuracion?.grosorBorde || '1.5px',
    '1px solid rgba(255, 255, 255, 0.1)'
  );

  const cardCustomStyles: React.CSSProperties = {
    backgroundColor: configuracion?.colorFondo || '#16325C',
    ...(configuracion?.colorBorde ? cardBorderStyles : {})
  };

  const diseno = configuracion?.diseno || 'grilla';
  const limite = configuracion?.limite && configuracion.limite > 0 ? configuracion.limite : undefined;
  const soloVigentes = configuracion?.soloVigentes ?? false;
  const tipoFiltro = configuracion?.tipoFiltro || 'todos';

  useEffect(() => {
    const handleRefresh = () => {
      setEventos(loadEventos());
    };
    handleRefresh();
    window.addEventListener('storage', handleRefresh);
    return () => window.removeEventListener('storage', handleRefresh);
  }, []);

  // Filtrado y orden cronológico
  const today = new Date().toISOString().split('T')[0];
  const eventosFiltrados = eventos
    .filter((ev) => ev.activo)
    .filter((ev) => {
      if (soloVigentes && ev.fecha < today) return false;
      if (tipoFiltro && tipoFiltro !== 'todos' && ev.tipo !== tipoFiltro) return false;
      return true;
    })
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .slice(0, limite);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const offset = direction === 'left' ? -360 : 360;
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const getBadgeStyle = (tipo: CalendarioEvento['tipo']) => {
    switch (tipo) {
      case 'Inscripción MINEDUC':
        return 'bg-[#12A1A4]/15 text-[#57d6f3] border-[#12A1A4]/40';
      case 'Examen 1ª Oportunidad':
      case 'Examen 2ª Oportunidad':
        return 'bg-[#EE751C]/15 text-[#EE751C] border-[#EE751C]/40';
      case 'Taller para Padres':
        return 'bg-[#3B82F6]/15 text-[#60A5FA] border-[#3B82F6]/40';
      case 'Entrega de Resultados':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/40';
    }
  };

  const parseDate = (fechaStr: string) => {
    const parts = fechaStr.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIndex = Math.max(0, parseInt(parts[1], 10) - 1);
      const day = parts[2];
      return {
        day,
        monthShort: MONTHS_SHORT[monthIndex] || parts[1],
        monthFull: MONTHS_FULL[monthIndex] || parts[1],
        year
      };
    }
    return { day: fechaStr, monthShort: '', monthFull: '', year: '' };
  };

  return (
    <section id="eventos" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full transition-colors duration-300">
      {/* Encabezado del Bloque */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12A1A4]/15 text-[#57d6f3] border border-[#12A1A4]/30 text-xs font-semibold uppercase tracking-wider">
            <CalendarDays className="w-4 h-4 text-[#12A1A4]" />
            <span>Calendario Oficial y Fechas Clave</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {titulo}
          </h2>
          {subtitulo && (
            <p className="text-slate-300 text-sm md:text-base font-normal leading-relaxed">
              {subtitulo}
            </p>
          )}
        </div>

        {/* Controles de navegación cuando está en modo Slider */}
        {diseno === 'slider' && eventosFiltrados.length > 0 && (
          <div className="flex items-center gap-2 self-start md:self-end shrink-0">
            <button
              type="button"
              onClick={() => scrollSlider('left')}
              className="w-11 h-11 rounded-2xl bg-[#16325C] border border-white/10 text-white hover:bg-[#1D4ED8] hover:border-[#1D4ED8] flex items-center justify-center transition-all shadow-md cursor-pointer"
              title="Anterior"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollSlider('right')}
              className="w-11 h-11 rounded-2xl bg-[#16325C] border border-white/10 text-white hover:bg-[#1D4ED8] hover:border-[#1D4ED8] flex items-center justify-center transition-all shadow-md cursor-pointer"
              title="Siguiente"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Estado Vacío */}
      {eventosFiltrados.length === 0 ? (
        <div className="bg-[#16325C]/70 border border-white/10 rounded-3xl p-10 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
            <Calendar className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">No hay eventos disponibles</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Pronto publicaremos nuevas fechas de exámenes libres y talleres pedagógicos del Ministerio de Educación.
          </p>
        </div>
      ) : diseno === 'grilla' ? (
        /* 1. DISEÑO EN GRILLA (CARDS) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventosFiltrados.map((evento) => {
            const { day, monthShort, year } = parseDate(evento.fecha);
            return (
              <div
                key={evento.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 group border ${
                  isLightText ? 'text-white border-white/10 hover:border-[#12A1A4]/40' : 'text-slate-900 border-slate-200 hover:border-[#12A1A4]/50'
                }`}
                style={cardCustomStyles}
              >
                <div className="space-y-4">
                  {/* Fila Superior: Fecha en Bloque + Tipo */}
                  <div className="flex items-start justify-between gap-3">
                    {/* Caja de Fecha */}
                    <div className={`w-14 h-16 rounded-2xl border flex flex-col items-center justify-center shrink-0 shadow-inner group-hover:border-[#12A1A4]/50 transition-colors ${
                      isLightText ? 'bg-[#10223D] border-white/15' : 'bg-slate-100 border-slate-200'
                    }`}>
                      <span className={`text-[10px] font-black tracking-widest uppercase leading-none ${
                        isLightText ? 'text-[#57d6f3]' : 'text-[#12A1A4]'
                      }`}>
                        {monthShort}
                      </span>
                      <span className={`text-2xl font-black leading-none mt-1 ${
                        isLightText ? 'text-white' : 'text-slate-900'
                      }`}>
                        {day}
                      </span>
                    </div>

                    {/* Insignias de Tipo y Modalidad */}
                    <div className="flex flex-col items-end gap-1.5 min-w-0">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border truncate leading-tight ${getBadgeStyle(evento.tipo)}`}>
                        {evento.tipo}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${
                        isLightText ? 'text-slate-300 bg-white/5 border-white/5' : 'text-slate-600 bg-slate-100 border-slate-200'
                      }`}>
                        {evento.modalidad === 'Online' ? (
                          <Video className="w-3 h-3 text-sky-400 shrink-0" />
                        ) : (
                          <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                        )}
                        <span>{evento.modalidad}</span>
                      </span>
                    </div>
                  </div>

                  {/* Título y Descripción */}
                  <div>
                    <h3 className={`text-lg font-bold transition-colors line-clamp-2 leading-snug ${
                      isLightText ? 'text-white group-hover:text-[#57d6f3]' : 'text-slate-900 group-hover:text-[#12A1A4]'
                    }`}>
                      {evento.titulo}
                    </h3>
                    <p className={`text-xs sm:text-sm mt-2 leading-relaxed line-clamp-3 ${
                      isLightText ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {evento.descripcion}
                    </p>
                  </div>
                </div>

                {/* Pie de Tarjeta: Lugar o Enlace */}
                <div className={`pt-5 mt-5 border-t flex items-center justify-between text-xs ${
                  isLightText ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'
                }`}>
                  <div className="flex items-center gap-1.5 truncate mr-2 font-medium">
                    <span>{year}</span>
                    <span>·</span>
                    <span className="truncate" title={evento.lugarOEnlace}>
                      {evento.lugarOEnlace}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : diseno === 'slider' ? (
        /* 2. DISEÑO EN SLIDER (CARRUSEL HORIZONTAL) */
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scroll-smooth scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {eventosFiltrados.map((evento) => {
            const { day, monthShort, year } = parseDate(evento.fecha);
            return (
              <div
                key={evento.id}
                className={`min-w-[300px] sm:min-w-[340px] md:min-w-[370px] snap-start border rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl group shrink-0 ${
                  isLightText ? 'text-white border-white/10 hover:border-[#12A1A4]/40' : 'text-slate-900 border-slate-200 hover:border-[#12A1A4]/50'
                }`}
                style={cardCustomStyles}
              >
                <div className="space-y-4">
                  {/* Fila Superior */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-14 h-16 rounded-2xl border flex flex-col items-center justify-center shrink-0 shadow-inner group-hover:border-[#12A1A4]/50 transition-colors ${
                      isLightText ? 'bg-[#10223D] border-white/15' : 'bg-slate-100 border-slate-200'
                    }`}>
                      <span className={`text-[10px] font-black tracking-widest uppercase leading-none ${
                        isLightText ? 'text-[#57d6f3]' : 'text-[#12A1A4]'
                      }`}>
                        {monthShort}
                      </span>
                      <span className={`text-2xl font-black leading-none mt-1 ${
                        isLightText ? 'text-white' : 'text-slate-900'
                      }`}>
                        {day}
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 min-w-0">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border truncate leading-tight ${getBadgeStyle(evento.tipo)}`}>
                        {evento.tipo}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${
                        isLightText ? 'text-slate-300 bg-white/5 border-white/5' : 'text-slate-600 bg-slate-100 border-slate-200'
                      }`}>
                        {evento.modalidad === 'Online' ? (
                          <Video className="w-3 h-3 text-sky-400 shrink-0" />
                        ) : (
                          <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                        )}
                        <span>{evento.modalidad}</span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-lg font-bold transition-colors line-clamp-2 leading-snug ${
                      isLightText ? 'text-white group-hover:text-[#57d6f3]' : 'text-slate-900 group-hover:text-[#12A1A4]'
                    }`}>
                      {evento.titulo}
                    </h3>
                    <p className={`text-xs sm:text-sm mt-2 leading-relaxed line-clamp-3 ${
                      isLightText ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {evento.descripcion}
                    </p>
                  </div>
                </div>

                <div className={`pt-5 mt-5 border-t flex items-center justify-between text-xs ${
                  isLightText ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'
                }`}>
                  <div className="flex items-center gap-1.5 truncate mr-2 font-medium">
                    <span>{year}</span>
                    <span>·</span>
                    <span className="truncate" title={evento.lugarOEnlace}>
                      {evento.lugarOEnlace}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 3. DISEÑO EN LISTA (AGENDA CRONOLÓGICA VERTICAL) */
        <div className="space-y-4 max-w-5xl mx-auto">
          {eventosFiltrados.map((evento) => {
            const { day, monthShort, year } = parseDate(evento.fecha);
            return (
              <div
                key={evento.id}
                className={`border rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition-all duration-300 shadow-md hover:shadow-xl group ${
                  isLightText ? 'text-white border-white/10 hover:border-[#12A1A4]/40' : 'text-slate-900 border-slate-200 hover:border-[#12A1A4]/50'
                }`}
                style={cardCustomStyles}
              >
                {/* Lado Izquierdo: Fecha y Contenido */}
                <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
                  {/* Fecha Estilizada */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border flex flex-col items-center justify-center shrink-0 shadow-inner group-hover:border-[#12A1A4]/50 transition-colors ${
                    isLightText ? 'bg-[#10223D] border-white/15' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <span className={`text-[10px] font-black tracking-widest uppercase leading-none ${
                      isLightText ? 'text-[#57d6f3]' : 'text-[#12A1A4]'
                    }`}>
                      {monthShort}
                    </span>
                    <span className={`text-xl sm:text-2xl font-black leading-none mt-1 ${
                      isLightText ? 'text-white' : 'text-slate-900'
                    }`}>
                      {day}
                    </span>
                  </div>

                  {/* Textos */}
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border leading-tight ${getBadgeStyle(evento.tipo)}`}>
                        {evento.tipo}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                        isLightText ? 'text-slate-300 bg-white/5 border-white/5' : 'text-slate-600 bg-slate-100 border-slate-200'
                      }`}>
                        {evento.modalidad === 'Online' ? (
                          <Video className="w-3 h-3 text-sky-400" />
                        ) : (
                          <MapPin className="w-3 h-3 text-emerald-400" />
                        )}
                        <span>{evento.modalidad}</span>
                      </span>
                      <span className={`text-xs ${isLightText ? 'text-slate-400' : 'text-slate-500'}`}>{year}</span>
                    </div>

                    <h3 className={`text-base sm:text-lg font-bold transition-colors leading-snug ${
                      isLightText ? 'text-white group-hover:text-[#57d6f3]' : 'text-slate-900 group-hover:text-[#12A1A4]'
                    }`}>
                      {evento.titulo}
                    </h3>
                    <p className={`text-xs sm:text-sm font-normal line-clamp-2 leading-relaxed ${
                      isLightText ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {evento.descripcion}
                    </p>
                  </div>
                </div>

                {/* Lado Derecho: Lugar o Enlace */}
                <div className={`sm:text-right shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 flex sm:flex-col items-center sm:items-end justify-between gap-1 text-xs ${
                  isLightText ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-600'
                }`}>
                  <span className={`font-medium ${isLightText ? 'text-slate-400' : 'text-slate-500'}`}>Ubicación / Modalidad</span>
                  <span className={`font-semibold max-w-[200px] truncate ${
                    isLightText ? 'text-white' : 'text-slate-900'
                  }`} title={evento.lugarOEnlace}>
                    {evento.lugarOEnlace}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
