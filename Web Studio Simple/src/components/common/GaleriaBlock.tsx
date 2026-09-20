import React, { useState, useEffect, useMemo } from 'react';
import {
  Image as ImageIcon,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Calendar,
  Tag
} from 'lucide-react';
import { GaleriaConfig, GaleriaImagenItem } from '../../types/cms';
import { GaleriaItem } from '../../types/cmsExtras';
import { loadGaleria } from '../../data/initialCmsExtrasData';
import { getBorderStyles } from './borderStyles';

interface GaleriaBlockProps {
  titulo?: string;
  subtitulo?: string;
  configuracion?: GaleriaConfig;
}

interface ItemVisual {
  id: string;
  url: string;
  titulo: string;
  descripcion?: string;
  categoria: string;
  fecha?: string;
}

export const GaleriaBlock: React.FC<GaleriaBlockProps> = ({
  titulo = 'Galería Multimedia y Cuadernos Modelo',
  subtitulo = 'Explora registros reales de cuadernos escolares, infografías pedagógicas y material didáctico.',
  configuracion: config = {}
}) => {
  const [globalItems, setGlobalItems] = useState<GaleriaItem[]>(() => loadGaleria());
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

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

  const cardBorderStyles = getBorderStyles(
    config.modoBorde || 'completo',
    config.colorBorde,
    config.grosorBorde || '1.5px',
    '1px solid rgba(226, 232, 240, 0.9)'
  );

  const cardCustomStyles: React.CSSProperties = {
    ...(config.colorFondo ? { backgroundColor: config.colorFondo } : {}),
    ...(config.colorBorde ? cardBorderStyles : {})
  };

  // Reactividad en tiempo real ante eventos de guardado en el CMS
  useEffect(() => {
    const handleStorage = () => {
      setGlobalItems(loadGaleria());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Normalizar items según el origen de datos (global o manual)
  const allItems: ItemVisual[] = useMemo(() => {
    if (config.origenDatos === 'manual' && config.imagenes && config.imagenes.length > 0) {
      return config.imagenes.map((img: GaleriaImagenItem, idx: number) => ({
        id: `manual-${idx}`,
        url: img.url,
        titulo: img.titulo || `Registro visual #${idx + 1}`,
        descripcion: img.pieFoto || '',
        categoria: img.categoria || 'Registro Escolar'
      }));
    }

    // Por defecto usa la galería global del sistema
    return globalItems
      .filter((g) => g.activo)
      .map((g) => ({
        id: g.id,
        url: g.imagenUrl,
        titulo: g.titulo,
        descripcion: g.descripcion,
        categoria: g.categoria,
        fecha: g.fecha
      }));
  }, [config.origenDatos, config.imagenes, globalItems]);

  // Obtener categorías únicas presentes
  const categories = useMemo(() => {
    const cats = Array.from(new Set(allItems.map((i) => i.categoria).filter(Boolean)));
    return ['todas', ...cats];
  }, [allItems]);

  // Filtrado y límite
  const filteredItems = useMemo(() => {
    let result = allItems;
    if (selectedCategory !== 'todas') {
      result = result.filter((i) => i.categoria === selectedCategory);
    } else if (config.categoriaFiltro && config.categoriaFiltro !== 'todas') {
      result = result.filter((i) => i.categoria === config.categoriaFiltro);
    }

    if (config.limite && config.limite > 0) {
      result = result.slice(0, config.limite);
    }
    return result;
  }, [allItems, selectedCategory, config.categoriaFiltro, config.limite]);

  // Controles del Lightbox
  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handlePrevLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredItems.length - 1
    );
  };

  const handleNextLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev! < filteredItems.length - 1 ? prev! + 1 : 0
    );
  };

  const currentLightboxItem =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const diseno = config.diseno || 'grilla';

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Encabezado de la sección */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12A1A4]/10 text-[#12A1A4] border border-[#12A1A4]/20 text-xs font-black uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Evidencia Visual y Cuadernos</span>
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

        {/* Barra de Filtros por Categoría */}
        {categories.length > 2 && (
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-slate-400 mr-2 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5" />
              Filtrar:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#12A1A4] text-white shadow-md scale-[1.02]'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat === 'todas' ? 'Todas las Categorías' : cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Despliegue de Elementos */}
        {filteredItems.length === 0 ? (
          <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-md mx-auto space-y-2">
            <ImageIcon className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No hay imágenes disponibles en esta categoría.</p>
            <p className="text-xs text-slate-400">Puedes agregar fotografías desde el panel de administración en la pestaña Galería.</p>
          </div>
        ) : diseno === 'slider' ? (
          /* Modo Slider / Carrusel Horizontal */
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none scroll-smooth">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenLightbox(index)}
                  className={`min-w-[280px] sm:min-w-[340px] max-w-[380px] shrink-0 snap-start rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col hover:-translate-y-1 ${
                    isLightText ? 'text-white border-white/10' : 'bg-white text-slate-800 border-slate-200'
                  }`}
                  style={cardCustomStyles}
                >
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
                    <img
                      src={item.url}
                      alt={item.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-lg scale-90 group-hover:scale-100 transition-transform">
                        <ZoomIn className="w-5 h-5" />
                      </span>
                    </div>
                    {item.categoria && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider">
                        {item.categoria}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <h3 className={`text-sm font-extrabold leading-snug group-hover:text-[#12A1A4] transition-colors ${
                      isLightText ? 'text-white' : 'text-slate-900'
                    }`}>
                      {item.titulo}
                    </h3>
                    {item.descripcion && (
                      <p className={`text-xs line-clamp-2 leading-relaxed ${
                        isLightText ? 'text-slate-200' : 'text-slate-500'
                      }`}>
                        {item.descripcion}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Modo Grilla Responsiva */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(index)}
                className={`rounded-2xl border shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col hover:-translate-y-1.5 ${
                  isLightText ? 'text-white border-white/10' : 'bg-white text-slate-800 border-slate-200/90'
                }`}
                style={cardCustomStyles}
              >
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
                  <img
                    src={item.url}
                    alt={item.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-lg scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                  </div>
                  {item.categoria && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider">
                      {item.categoria}
                    </span>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <h3 className={`text-sm sm:text-base font-extrabold leading-snug group-hover:text-[#12A1A4] transition-colors ${
                    isLightText ? 'text-white' : 'text-slate-900'
                  }`}>
                    {item.titulo}
                  </h3>
                  {item.descripcion && (
                    <p className={`text-xs sm:text-sm line-clamp-2 leading-relaxed ${
                      isLightText ? 'text-slate-200' : 'text-slate-500'
                    }`}>
                      {item.descripcion}
                    </p>
                  )}
                  {item.fecha && (
                    <div className={`pt-2 border-t flex items-center gap-1.5 text-[11px] ${
                      isLightText ? 'border-white/10 text-slate-300' : 'border-slate-100 text-slate-400'
                    }`}>
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.fecha}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Lightbox de Visualización en Alta Definición */}
      {currentLightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col max-h-[92vh]">
            {/* Cabecera del Lightbox */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-slate-950/60">
              <div className="space-y-1 pr-4">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#12A1A4]/30 text-[#57d6f3] text-[11px] font-bold uppercase tracking-wider">
                  {currentLightboxItem.categoria}
                </span>
                <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                  {currentLightboxItem.titulo}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold px-2">
                  {activeLightboxIndex! + 1} / {filteredItems.length}
                </span>
                <button
                  type="button"
                  onClick={handleCloseLightbox}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Cerrar vista"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Imagen Principal y Controles Laterales */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[320px] max-h-[65vh]">
              <img
                src={currentLightboxItem.url}
                alt={currentLightboxItem.titulo}
                className="max-w-full max-h-full object-contain select-none"
              />

              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevLightbox}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 shadow-lg transition-transform hover:scale-105 cursor-pointer"
                    title="Imagen anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextLightbox}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 shadow-lg transition-transform hover:scale-105 cursor-pointer"
                    title="Siguiente imagen"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Pie con Descripción Completa */}
            {currentLightboxItem.descripcion && (
              <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>{currentLightboxItem.descripcion}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
