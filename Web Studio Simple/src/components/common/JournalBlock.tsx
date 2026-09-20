import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Calendar,
  User,
  Clock,
  ArrowRight,
  Search,
  X,
  Sparkles,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { JournalArticle } from '../../types/cmsExtras';
import { loadJournalArticles } from '../../data/initialCmsExtrasData';
import { getBorderStyles } from './borderStyles';

interface JournalBlockProps {
  titulo?: string;
  subtitulo?: string;
  configuracion?: {
    categoriaFiltro?: string;
    limiteArticulos?: number;
    mostrarSoloDestacados?: boolean;
    mostrarFiltros?: boolean;
    colorBorde?: string;
    modoBorde?: any;
    grosorBorde?: string;
    colorFondo?: string;
    colorTexto?: any;
  };
  onNavigateToPricing?: () => void;
  onSelectArticle?: (article: JournalArticle) => void;
}

const CATEGORIAS = [
  'Todas',
  'MINEDUC',
  'Homeschooling',
  'Cuaderno y Método',
  'Neurodiversidad',
  'Orientación'
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  MINEDUC: 'bg-teal-50 text-[#12A1A4] border-teal-200',
  Homeschooling: 'bg-amber-50 text-amber-700 border-amber-200',
  'Cuaderno y Método': 'bg-orange-50 text-orange-700 border-orange-200',
  Neurodiversidad: 'bg-purple-50 text-purple-700 border-purple-200',
  Orientación: 'bg-blue-50 text-blue-700 border-blue-200'
};

export const JournalBlock: React.FC<JournalBlockProps> = ({
  titulo = 'Journal Pedagógico · Artículos y Novedades',
  subtitulo = 'Orientación experta sobre exámenes libres MINEDUC, neurodiversidad y el método pantalla y papel.',
  configuracion = {},
  onNavigateToPricing,
  onSelectArticle
}) => {
  const [articles] = useState<JournalArticle[]>(() => loadJournalArticles());
  const [selectedCategoria, setSelectedCategoria] = useState<string>(
    configuracion.categoriaFiltro && configuracion.categoriaFiltro !== 'todas'
      ? configuracion.categoriaFiltro
      : 'Todas'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [readingArticle, setReadingArticle] = useState<JournalArticle | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

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
    configuracion.colorTexto === 'claro' ||
    (configuracion.colorTexto !== 'oscuro' && Boolean(configuracion.colorFondo && isHexDark(configuracion.colorFondo)));

  const cardBorderStyles = getBorderStyles(
    configuracion.modoBorde || 'completo',
    configuracion.colorBorde,
    configuracion.grosorBorde || '1.5px',
    '1px solid rgba(226, 232, 240, 0.9)'
  );

  const cardCustomStyles: React.CSSProperties = {
    ...(configuracion.colorFondo ? { backgroundColor: configuracion.colorFondo } : {}),
    ...(configuracion.colorBorde ? cardBorderStyles : {})
  };

  const filteredArticles = useMemo(() => {
    let list = articles.filter((a) => a.activo);

    if (configuracion.mostrarSoloDestacados) {
      list = list.filter((a) => a.destacado);
    }

    if (selectedCategoria !== 'Todas') {
      list = list.filter((a) => a.categoria === selectedCategoria);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (a) =>
          a.titulo.toLowerCase().includes(q) ||
          a.extracto.toLowerCase().includes(q) ||
          a.contenido.toLowerCase().includes(q)
      );
    }

    if (configuracion.limiteArticulos && configuracion.limiteArticulos > 0) {
      list = list.slice(0, configuracion.limiteArticulos);
    }

    return list;
  }, [articles, selectedCategoria, searchTerm, configuracion]);

  const handleArticleClick = (art: JournalArticle) => {
    if (onSelectArticle) {
      onSelectArticle(art);
    } else {
      setReadingArticle(art);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const getEstimatedReadingTime = (text: string): number => {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 160));
  };

  const hasFilterActive = selectedCategoria !== 'Todas' || Boolean(searchTerm.trim());
  const showFeaturedHero = !hasFilterActive && filteredArticles.length > 0;
  const heroArticle = showFeaturedHero ? filteredArticles[0] : null;
  const gridArticles = showFeaturedHero ? filteredArticles.slice(1) : filteredArticles;

  return (
    <section id="journal" className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto font-sans">
      {/* Cabecera de la Sección */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
          {titulo}
        </h2>
        {subtitulo && (
          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
            {subtitulo}
          </p>
        )}
      </div>

      {/* Controles de Filtros y Búsqueda */}
      {configuracion.mostrarFiltros !== false && (
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Píldoras de Categoría */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 w-full sm:w-auto">
              {CATEGORIAS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategoria(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategoria === cat
                      ? 'bg-[#12A1A4] text-white shadow-sm'
                      : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Input Buscador */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar guías o temarios..."
                className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#12A1A4]/30 focus:border-[#12A1A4] bg-white shadow-xs"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sin Artículos */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200 max-w-md mx-auto space-y-2">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm font-extrabold text-slate-700">No se encontraron artículos</p>
          <p className="text-xs text-slate-400">Intenta con otro término de búsqueda o selecciona otra categoría.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* 1. ARTÍCULO DESTACADO HERO CARD (Estilo Colegio Acrópolis) */}
          {heroArticle && (
            <div
              onClick={() => handleArticleClick(heroArticle)}
              className={`group cursor-pointer rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
                isLightText ? 'text-white border-white/10' : 'bg-white text-slate-800 border-slate-200/90'
              }`}
              style={cardCustomStyles}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Imagen Destacada */}
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-100">
                  <img
                    src={heroArticle.imagenPortadaUrl || '/images/journal-default.webp'}
                    alt={heroArticle.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/journal-default.webp';
                    }}
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border backdrop-blur-md shadow-xs ${
                        CATEGORY_COLORS[heroArticle.categoria] ||
                        'bg-teal-50 text-[#12A1A4] border-teal-200'
                      }`}
                    >
                      {heroArticle.categoria}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#F8AD22] text-slate-900 shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Destacado</span>
                    </span>
                  </div>
                </div>

                {/* Contenido Destacado */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className={`flex items-center gap-3 text-xs font-medium ${
                      isLightText ? 'text-slate-300' : 'text-slate-400'
                    }`}>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {heroArticle.fecha}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {getEstimatedReadingTime(heroArticle.contenido)} min de lectura
                      </span>
                    </div>

                    <h3 className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight transition-colors ${
                      isLightText ? 'text-white group-hover:text-[#57d6f3]' : 'text-slate-900 group-hover:text-[#12A1A4]'
                    }`}>
                      {heroArticle.titulo}
                    </h3>

                    <p className={`text-xs sm:text-sm leading-relaxed font-normal line-clamp-4 ${
                      isLightText ? 'text-slate-200' : 'text-slate-600'
                    }`}>
                      {heroArticle.extracto}
                    </p>
                  </div>

                  <div className={`pt-6 border-t flex items-center justify-between ${
                    isLightText ? 'border-white/10' : 'border-slate-100'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-teal-50 text-[#12A1A4] flex items-center justify-center font-bold text-xs">
                        <User className="w-4 h-4" />
                      </div>
                      <span className={`text-xs font-bold ${
                        isLightText ? 'text-white' : 'text-slate-700'
                      }`}>
                        {heroArticle.autor}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#12A1A4] group-hover:translate-x-1 transition-transform">
                      <span>Leer artículo</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. GRILLA DE ARTÍCULOS CON EFECTO DE PROFUNDIDAD (Overlap Cards) */}
          {gridArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {gridArticles.map((art) => {
                const readingTime = getEstimatedReadingTime(art.contenido);
                const badgeStyle =
                  CATEGORY_COLORS[art.categoria] ||
                  'bg-teal-50 text-[#12A1A4] border-teal-200';

                return (
                  <article
                    key={art.id}
                    onClick={() => handleArticleClick(art)}
                    className={`group block cursor-pointer rounded-2xl border shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between ${
                      isLightText ? 'border-white/10' : 'bg-white border-slate-200/90'
                    }`}
                    style={cardCustomStyles}
                  >
                    {/* Imagen con zoom al hover */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={art.imagenPortadaUrl || '/images/journal-default.webp'}
                        alt={art.titulo}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/journal-default.webp';
                        }}
                      />
                      {art.destacado && (
                        <span className="absolute top-3 right-3 text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#F8AD22] text-slate-900 shadow-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Destacado</span>
                        </span>
                      )}
                    </div>

                    {/* Tarjeta con margen negativo (profundidad 3D) */}
                    <div className={`-mt-6 relative mx-4 rounded-xl p-5 shadow-sm border mb-4 flex-1 flex flex-col justify-between ${
                      isLightText ? 'bg-slate-900/90 border-white/10 text-white' : 'bg-white border-slate-100 text-slate-900'
                    }`}>
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider border ${badgeStyle}`}
                          >
                            {art.categoria}
                          </span>
                          <span className={`text-[11px] font-medium ${isLightText ? 'text-slate-300' : 'text-slate-400'}`}>
                            {art.fecha}
                          </span>
                        </div>

                        <h3 className={`text-base font-black line-clamp-2 leading-snug transition-colors ${
                          isLightText ? 'text-white group-hover:text-[#57d6f3]' : 'text-slate-900 group-hover:text-[#12A1A4]'
                        }`}>
                          {art.titulo}
                        </h3>

                        <p className={`text-xs line-clamp-3 leading-relaxed font-normal ${
                          isLightText ? 'text-slate-200' : 'text-slate-500'
                        }`}>
                          {art.extracto}
                        </p>
                      </div>

                      <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs ${
                        isLightText ? 'border-white/10' : 'border-slate-100'
                      }`}>
                        <span className={`text-[11px] font-medium flex items-center gap-1 ${
                          isLightText ? 'text-slate-300' : 'text-slate-400'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {readingTime} min
                        </span>

                        <span className="inline-flex items-center gap-1 font-bold text-[#12A1A4] group-hover:translate-x-1 transition-transform">
                          <span>Leer más</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* FALLBACK MODAL (si no se utiliza la vista de página completa) */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 text-slate-800">
            {/* Cabecera del Lector */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 shrink-0">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-600">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-[#12A1A4]/15 text-[#12A1A4]">
                  {readingArticle.categoria}
                </span>
                <span>·</span>
                <span className="text-slate-400 font-mono text-[11px]">{readingArticle.fecha}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                  title="Copiar enlace"
                >
                  {copiedLink ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>¡Enlace copiado!</span>
                    </span>
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setReadingArticle(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                  title="Cerrar artículo"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contenido del Artículo */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-6 flex-1">
              {readingArticle.imagenPortadaUrl && (
                <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                  <img
                    src={readingArticle.imagenPortadaUrl}
                    alt={readingArticle.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {readingArticle.titulo}
                </h1>
                <div className="flex items-center gap-3 text-xs text-slate-500 pt-1 border-b border-slate-100 pb-3">
                  <span className="font-bold text-slate-700">{readingArticle.autor}</span>
                  <span>·</span>
                  <span>{getEstimatedReadingTime(readingArticle.contenido)} minutos de lectura</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/60 border-l-4 border-[#12A1A4] text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic">
                {readingArticle.extracto}
              </div>

              <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 font-normal whitespace-pre-line">
                {readingArticle.contenido}
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-[#0B254D] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-sm font-extrabold text-[#F8AD22]">
                    ¿Preparando Exámenes Libres en Familia?
                  </h4>
                  <p className="text-xs text-slate-300">
                    Conoce el método EstudioSimple: 30 minutos diarios combinando pantalla interactiva y cuaderno físico.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setReadingArticle(null);
                    if (onNavigateToPricing) onNavigateToPricing();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs font-extrabold shadow-md shrink-0 transition-all cursor-pointer"
                >
                  Ver Planes y Precios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
