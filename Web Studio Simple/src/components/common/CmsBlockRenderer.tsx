import React, { useState } from 'react';
import {
  ChevronDown,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Info,
  Check,
  Star,
  Play,
  Mail,
  Phone,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  Users,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import { CmsSection } from '../../types/cms';
import { JournalArticle } from '../../types/cmsExtras';
import { JournalBlock } from './JournalBlock';
import { CintaNoticiasBlock } from './CintaNoticiasBlock';
import { EventosBlock } from './EventosBlock';
import { GaleriaBlock } from './GaleriaBlock';
import { TestimoniosBlock } from './TestimoniosBlock';
import { getBorderStyles } from './borderStyles';

interface CmsBlockRendererProps {
  section: CmsSection;
  onNavigateToPricing?: () => void;
  onOpenContactModal?: () => void;
  onSelectJournalArticle?: (article: JournalArticle) => void;
}

export const CmsBlockRenderer: React.FC<CmsBlockRendererProps> = ({
  section,
  onNavigateToPricing,
  onOpenContactModal,
  onSelectJournalArticle
}) => {
  const { tipoBloque, titulo, subtitulo, configuracion: config } = section;

  // Estado local para acordeones
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(0);

  if (!section.activo) return null;

  // Helper de cálculo de luminancia para contraste automático
  const isHexDark = (color?: string): boolean => {
    if (!color || color === 'transparent') return false;
    let hex = color.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    if (hex.length !== 6) return false;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return false;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.55;
  };

  const resolveTextMode = (
    colorFondo?: string,
    colorTexto?: string,
    defaultIsDarkBg: boolean = false
  ): 'claro' | 'oscuro' => {
    if (colorTexto === 'claro') return 'claro';
    if (colorTexto === 'oscuro') return 'oscuro';
    if (colorFondo && colorFondo !== 'transparent') {
      if (colorFondo === 'azul') return 'claro';
      if (colorFondo === 'gris') return 'oscuro';
      return isHexDark(colorFondo) ? 'claro' : 'oscuro';
    }
    return defaultIsDarkBg ? 'claro' : 'oscuro';
  };

  const blockBorderColor = config?.colorBorde || config?.colorBordeTarjeta;
  const blockBorderStyles = (defaultBorder: string = '1px solid #e2e8f0') => {
    return getBorderStyles(
      config?.modoBorde || 'completo',
      blockBorderColor,
      config?.grosorBorde || '1.5px',
      defaultBorder
    );
  };

  const getContainerStyles = (
    defaultBorder: string = '1px solid #e2e8f0',
    defaultBg?: string,
    extraStyles?: React.CSSProperties
  ): React.CSSProperties => {
    const bg = config?.colorFondo
      ? config.colorFondo === 'azul'
        ? '#0B254D'
        : config.colorFondo === 'gris'
        ? '#F8FAFC'
        : config.colorFondo
      : defaultBg;

    const borderStyle = blockBorderColor
      ? blockBorderStyles(defaultBorder)
      : defaultBorder
      ? { border: defaultBorder }
      : {};

    return {
      ...(bg ? { backgroundColor: bg } : {}),
      ...borderStyle,
      ...extraStyles
    };
  };

  switch (tipoBloque) {
    // 1. ENCABEZADO INSTITUCIONAL
    case 'PAGE_HEADER': {
      const highlight = config?.highlight || '';
      const bgImage = config?.imagenFondo;
      const textMode = resolveTextMode(config?.colorFondo, config?.colorTexto, true);
      const isLight = textMode === 'claro';

      return (
        <div
          className={`py-16 md:py-20 px-4 text-center relative overflow-hidden rounded-3xl mb-8 shadow-xl border ${
            isLight ? 'text-white border-white/10' : 'text-slate-900 border-slate-200'
          }`}
          style={getContainerStyles('1px solid rgba(255, 255, 255, 0.1)', '#0B254D')}
        >
          {bgImage && (
            <div className="absolute inset-0 z-0">
              <img
                src={bgImage}
                alt={titulo}
                className="w-full h-full object-cover object-center opacity-30"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: isLight
                    ? 'linear-gradient(to top, rgba(11, 37, 77, 0.95), rgba(11, 37, 77, 0.8), transparent)'
                    : 'linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8), transparent)'
                }}
              />
            </div>
          )}
          <div className="max-w-4xl mx-auto space-y-3 relative z-10">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              <span>{titulo}</span>
              {highlight && (
                <span className="ml-2 text-[#12A1A4] inline-block underline decoration-[#F8AD22] decoration-4">
                  {highlight}
                </span>
              )}
            </h1>
            {subtitulo && (
              <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal ${
                isLight ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {subtitulo}
              </p>
            )}
          </div>
        </div>
      );
    }

    // 2. HERO PERSONALIZADA
    case 'HERO': {
      const bgImage = config?.imagenFondo;
      const textMode = resolveTextMode(config?.colorFondo, config?.colorTexto, true);
      const isLight = textMode === 'claro';

      return (
        <div
          className={`relative rounded-3xl overflow-hidden mb-10 shadow-2xl border min-h-[380px] md:min-h-[440px] flex items-center justify-center text-center p-8 ${
            isLight ? 'text-white border-white/10' : 'text-slate-900 border-slate-200'
          }`}
          style={getContainerStyles('1px solid rgba(255, 255, 255, 0.1)', '#0B254D')}
        >
          {bgImage && (
            <div className="absolute inset-0 z-0">
              <img
                src={bgImage}
                alt={titulo}
                className="w-full h-full object-cover object-center opacity-40"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: isLight
                    ? 'linear-gradient(to top, rgba(11, 37, 77, 0.95), rgba(11, 37, 77, 0.75), transparent)'
                    : 'linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.75), transparent)'
                }}
              />
            </div>
          )}
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            {config?.badgeText && (
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#12A1A4]/20 text-[#57d6f3] border border-[#12A1A4]/40 text-xs font-black uppercase tracking-wider">
                {config.badgeText}
              </span>
            )}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {titulo}
            </h1>
            {subtitulo && (
              <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
                isLight ? 'text-slate-200' : 'text-slate-600'
              }`}>
                {subtitulo}
              </p>
            )}
            {config?.ctaText && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (config.ctaUrl && config.ctaUrl !== '#' && config.ctaUrl !== '#journal') {
                      if (config.ctaUrl.startsWith('http')) {
                        window.open(config.ctaUrl, '_blank');
                      } else if (config.ctaUrl === '/planes') {
                        onNavigateToPricing?.();
                      } else {
                        window.location.href = config.ctaUrl;
                      }
                    } else {
                      const journalElem = document.getElementById('journal') || document.querySelector('.journal-section');
                      if (journalElem) {
                        journalElem.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.scrollBy({ top: 480, behavior: 'smooth' });
                      }
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-sm font-extrabold shadow-lg transition-all hover:scale-[1.03] cursor-pointer"
                >
                  <span>{config.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    // 3. IMAGEN Y TEXTO 50/50
    case 'IMAGEN_TEXTO': {
      const isReverse = config?.posicionImagen === 'right';
      const isPolaroid = config?.estiloImagen === 'polaroid';
      const textMode = resolveTextMode(config?.colorFondo, config?.colorTexto, false);
      const isLight = textMode === 'claro';

      return (
        <div
          className={`rounded-3xl p-6 sm:p-10 border shadow-sm mb-10 ${
            isLight ? 'border-white/10' : 'border-slate-200/90'
          }`}
          style={getContainerStyles(
            isLight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(226, 232, 240, 0.9)',
            '#ffffff'
          )}
        >
          <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${isReverse ? 'lg:flex-row-reverse' : ''}`}>
            {/* Columna Imagen */}
            <div className="w-full lg:w-1/2">
              {config?.imagenUrl ? (
                isPolaroid ? (
                  <div className="p-3 pb-10 bg-white border border-slate-200 shadow-xl rounded-sm rotate-[-2deg] hover:rotate-0 transition-transform duration-300 max-w-md mx-auto">
                    <img
                      src={config.imagenUrl}
                      alt={titulo}
                      className="w-full h-64 sm:h-80 object-cover rounded-xs"
                    />
                    <p className="mt-3 text-center text-xs font-bold text-slate-500 font-serif">
                      {titulo}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 max-w-md mx-auto">
                    <img
                      src={config.imagenUrl}
                      alt={titulo}
                      className="w-full h-64 sm:h-80 object-cover"
                    />
                  </div>
                )
              ) : (
                <div className="w-full h-64 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 text-xs font-medium border border-dashed border-slate-300">
                  Sin imagen configurada
                </div>
              )}
            </div>

            {/* Columna Texto */}
            <div className="w-full lg:w-1/2 space-y-4">
              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight leading-snug ${
                isLight ? 'text-white' : 'text-slate-900'
              }`}>
                {titulo}
              </h2>
              {subtitulo && (
                <p className={`text-xs sm:text-sm font-semibold ${
                  isLight ? 'text-[#57d6f3]' : 'text-[#12A1A4]'
                }`}>
                  {subtitulo}
                </p>
              )}
              <div className={`text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal ${
                isLight ? 'text-slate-200' : 'text-slate-600'
              }`}>
                {config?.contenido}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 4. TEXTO o RICHTEXT
    case 'TEXTO':
    case 'RICHTEXT': {
      const alignClass = config?.alineacion === 'center' ? 'text-center' : config?.alineacion === 'right' ? 'text-right' : 'text-left';
      const textMode = resolveTextMode(config?.colorFondo, config?.colorTexto, config?.colorFondo === 'azul');
      const isLight = textMode === 'claro';

      return (
        <div
          className={`rounded-3xl p-8 sm:p-12 mb-10 border transition-all ${
            isLight ? 'text-white border-white/10 shadow-xl' : 'text-slate-800 border-slate-200 shadow-xs'
          } ${alignClass}`}
          style={getContainerStyles(
            isLight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
            config?.colorFondo === 'azul' ? '#0B254D' : config?.colorFondo === 'gris' ? '#F8FAFC' : '#ffffff'
          )}
        >
          <div className="max-w-4xl mx-auto space-y-4">
            {titulo && (
              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-white' : 'text-slate-900'}`}>
                {titulo}
              </h2>
            )}
            {subtitulo && (
              <p className={`text-xs sm:text-sm font-semibold ${isLight ? 'text-[#57d6f3]' : 'text-slate-500'}`}>
                {subtitulo}
              </p>
            )}
            <div className={`text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal pt-2 ${
              isLight ? 'text-slate-200' : 'text-slate-700'
            }`}>
              {config?.cuerpoTexto || config?.contenido}
            </div>
          </div>
        </div>
      );
    }

    // 5. TARJETAS
    case 'TARJETAS': {
      const tarjetas = config?.tarjetas || [];
      const textMode = resolveTextMode(config?.colorFondo, config?.colorTexto, false);
      const isLight = textMode === 'claro';

      return (
        <div className="mb-10 space-y-6">
          {(titulo || subtitulo) && (
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              {titulo && <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{titulo}</h2>}
              {subtitulo && <p className="text-xs sm:text-sm text-slate-500 font-medium">{subtitulo}</p>}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tarjetas.map((t: any, idx: number) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border shadow-xs hover:shadow-md transition-all hover:scale-[1.01] space-y-3 ${
                  isLight ? 'border-white/10' : 'border-slate-200'
                }`}
                style={getContainerStyles(
                  isLight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
                  '#ffffff'
                )}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                  isLight ? 'bg-[#12A1A4]/30 text-[#57d6f3]' : 'bg-[#12A1A4]/15 text-[#12A1A4]'
                }`}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-extrabold ${isLight ? 'text-white' : 'text-slate-900'}`}>{t.titulo}</h3>
                <p className={`text-xs sm:text-sm leading-relaxed font-normal ${isLight ? 'text-slate-200' : 'text-slate-600'}`}>{t.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 6. ACORDEON o FAQ
    case 'ACORDEON':
    case 'FAQ': {
      const items = config?.items || [];
      const itemBorderColor = blockBorderColor;
      const iconoColor = config?.colorIcono;
      const textMode = resolveTextMode(config?.colorFondo, config?.colorTexto, false);
      const isLight = textMode === 'claro';
      const itemBorderStyles = blockBorderStyles(isLight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0');

      return (
        <div
          className={`rounded-3xl p-6 sm:p-10 border shadow-sm mb-10 max-w-4xl mx-auto space-y-6 ${
            isLight ? 'text-white border-white/10' : 'text-slate-900 border-slate-200'
          }`}
          style={getContainerStyles(
            isLight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
            '#ffffff'
          )}
        >
          {(titulo || subtitulo) && (
            <div className="text-center space-y-2 mb-6">
              {titulo && <h2 className={`text-2xl sm:text-3xl font-black ${isLight ? 'text-white' : 'text-slate-900'}`}>{titulo}</h2>}
              {subtitulo && <p className={`text-xs sm:text-sm font-medium ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>{subtitulo}</p>}
            </div>
          )}

          <div className="space-y-3">
            {items.map((item: any, idx: number) => {
              const isOpen = openAccordionIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border overflow-hidden transition-colors ${
                    isLight ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'
                  }`}
                  style={itemBorderColor ? itemBorderStyles : undefined}
                >
                  <button
                    type="button"
                    onClick={() => setOpenAccordionIndex(isOpen ? null : idx)}
                    className={`w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-sm transition-colors cursor-pointer ${
                      isLight ? 'text-white hover:bg-white/10' : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.pregunta || 'Pregunta sin definir'}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : 'text-slate-400'
                      }`}
                      style={iconoColor ? { color: iconoColor } : undefined}
                    />
                  </button>
                  {isOpen && (
                    <div className={`px-4 pb-4 pt-1 text-xs sm:text-sm leading-relaxed border-t ${
                      isLight
                        ? 'text-slate-200 border-white/10 bg-black/20'
                        : 'text-slate-600 border-slate-100 bg-slate-50/50'
                    }`}>
                      {item.respuesta}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // 7. DESCARGAS LIST
    case 'DESCARGAS_LIST': {
      const docs = config?.documentos || [];
      const textMode = resolveTextMode(config?.colorFondo, config?.colorTexto, false);
      const isLight = textMode === 'claro';

      return (
        <div
          className={`rounded-3xl p-6 sm:p-10 border shadow-sm mb-10 max-w-4xl mx-auto space-y-6 ${
            isLight ? 'text-white border-white/10' : 'border-slate-200'
          }`}
          style={getContainerStyles(
            isLight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
            '#ffffff'
          )}
        >
          {(titulo || subtitulo) && (
            <div className="text-center space-y-2 mb-6">
              {titulo && <h2 className={`text-2xl sm:text-3xl font-black ${isLight ? 'text-white' : 'text-slate-900'}`}>{titulo}</h2>}
              {subtitulo && <p className={`text-xs sm:text-sm font-medium ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>{subtitulo}</p>}
            </div>
          )}

          <div className="space-y-2.5">
            {docs.map((doc: any, idx: number) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-colors ${
                  isLight
                    ? 'border-white/10 bg-white/5 hover:bg-white/10 text-white'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-slate-50 text-slate-800'
                }`}
                style={blockBorderColor ? blockBorderStyles(isLight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0') : undefined}
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 rounded-lg bg-red-100 text-red-700 text-[10px] font-black uppercase">
                    {doc.formato || 'PDF'}
                  </span>
                  <div>
                    <h4 className={`text-xs sm:text-sm font-extrabold ${isLight ? 'text-white' : 'text-slate-800'}`}>{doc.titulo}</h4>
                    <span className={`text-[11px] ${isLight ? 'text-slate-300' : 'text-slate-400'}`}>Recurso oficial descargable</span>
                  </div>
                </div>

                {doc.urlDescarga ? (
                  <a
                    href={doc.urlDescarga}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs font-bold shadow-xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar</span>
                  </a>
                ) : (
                  <span className={`text-[11px] font-medium ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>No disponible</span>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 8. TESTIMONIOS (MÓDULO ENRIQUECIDO CON TESTIMONIOSBLOCK)
    case 'TESTIMONIOS': {
      return (
        <div className="mb-12">
          <TestimoniosBlock
            titulo={titulo}
            subtitulo={subtitulo}
            configuracion={config}
          />
        </div>
      );
    }

    // 9. GALERÍA MULTIMEDIA (MÓDULO INTERACTIVO CON LIGHTBOX Y CATEGORÍAS)
    case 'GALERIA_MINI': {
      return (
        <div className="mb-12">
          <GaleriaBlock
            titulo={titulo}
            subtitulo={subtitulo}
            configuracion={config}
          />
        </div>
      );
    }

    // 10. VIDEO
    case 'VIDEO': {
      const videoUrl = config?.videoUrl || '';
      const isDirectVideo =
        videoUrl.includes('/video/upload/') ||
        Boolean(videoUrl.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i));

      let embedUrl = videoUrl;
      if (!isDirectVideo) {
        if (videoUrl.includes('youtube.com/watch?v=')) {
          embedUrl = videoUrl.replace('watch?v=', 'embed/');
        } else if (videoUrl.includes('youtu.be/')) {
          embedUrl = videoUrl.replace('youtu.be/', 'www.youtube.com/embed/');
        } else if (videoUrl.includes('vimeo.com/') && !videoUrl.includes('player.vimeo.com')) {
          const vimeoId = videoUrl.split('/').pop()?.split('?')[0];
          if (vimeoId) {
            embedUrl = `https://player.vimeo.com/video/${vimeoId}`;
          }
        }
      }

      const textMode = resolveTextMode(config?.colorFondo, config?.colorTexto, false);
      const isLight = textMode === 'claro';

      return (
        <div
          className={`rounded-3xl p-6 sm:p-10 border shadow-sm mb-10 max-w-4xl mx-auto space-y-6 ${
            isLight ? 'text-white border-white/10' : 'border-slate-200'
          }`}
          style={getContainerStyles(
            isLight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
            '#ffffff'
          )}
        >
          {(titulo || subtitulo) && (
            <div className="text-center space-y-2 mb-4">
              {titulo && <h2 className={`text-2xl sm:text-3xl font-black ${isLight ? 'text-white' : 'text-slate-900'}`}>{titulo}</h2>}
              {subtitulo && <p className={`text-xs sm:text-sm font-medium ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>{subtitulo}</p>}
            </div>
          )}

          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 flex items-center justify-center">
            {videoUrl ? (
              isDirectVideo ? (
                <video
                  src={videoUrl}
                  controls
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                <iframe
                  src={embedUrl}
                  title={titulo}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-medium">
                Sin video configurado
              </div>
            )}
          </div>
        </div>
      );
    }

    // 11. ALERTA
    case 'ALERTA': {
      const tipo = config?.tipoAlerta || 'info';
      const isWarning = tipo === 'advertencia';
      const isSuccess = tipo === 'exito';
      const textMode = resolveTextMode(config?.colorFondo, config?.colorTexto, false);
      const isLight = textMode === 'claro';

      return (
        <div
          className={`p-4 sm:p-5 rounded-2xl border mb-6 flex items-center gap-3.5 ${
            config?.colorFondo
              ? isLight ? 'text-white border-white/15' : 'text-slate-900 border-slate-300'
              : isWarning
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : isSuccess
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-teal-50 border-teal-200 text-teal-900'
          }`}
          style={{
            ...(config?.colorFondo ? { backgroundColor: config.colorFondo } : {}),
            ...(blockBorderColor
              ? blockBorderStyles(isWarning ? '1px solid #fde68a' : isSuccess ? '1px solid #a7f3d0' : '1px solid #99f6e4')
              : undefined)
          }}
        >
          <div className="shrink-0">
            {isWarning ? (
              <AlertCircle className="w-5 h-5 text-amber-600" />
            ) : isSuccess ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <Info className="w-5 h-5 text-[#12A1A4]" />
            )}
          </div>
          <div className="flex-1 text-xs sm:text-sm font-semibold">
            <span className="font-extrabold block">{titulo}</span>
            <span className={isLight ? 'text-slate-200' : undefined}>{config?.mensaje || subtitulo}</span>
          </div>
        </div>
      );
    }

    // 12. CINTA DE NOTICIAS
    case 'CINTA_NOTICIAS': {
      return (
        <div className="mb-8 rounded-2xl overflow-hidden shadow-sm">
          <CintaNoticiasBlock configuracion={config} />
        </div>
      );
    }

    // 13. ESPACIADOR
    case 'ESPACIADOR': {
      const height = config?.altura || 40;
      const showLine = config?.mostrarLinea !== false;
      return (
        <div style={{ height: `${height}px` }} className="w-full flex items-center justify-center my-2">
          {showLine && <div className="w-full border-t border-slate-200" />}
        </div>
      );
    }

    // 14. JOURNAL / BLOG DE NOTICIAS
    case 'JOURNAL': {
      return (
        <div className="mb-12">
          <JournalBlock
            titulo={titulo}
            subtitulo={subtitulo}
            configuracion={config}
            onNavigateToPricing={onNavigateToPricing}
            onSelectArticle={onSelectJournalArticle}
          />
        </div>
      );
    }

    // 15. EVENTOS Y CALENDARIO OFICIAL MINEDUC
    case 'EVENTOS': {
      return (
        <div className="mb-12">
          <EventosBlock
            titulo={titulo}
            subtitulo={subtitulo}
            configuracion={config}
          />
        </div>
      );
    }

    // 16. LÍNEA DE TIEMPO / RUTA PEDAGÓGICA
    case 'LINEA_TIEMPO': {
      const pasos = config?.pasos || [];
      const textMode = resolveTextMode(config?.colorFondo, config?.colorTexto, false);
      const isLight = textMode === 'claro';

      return (
        <div className="mb-12 max-w-4xl mx-auto space-y-8 py-4">
          {(titulo || subtitulo) && (
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              {titulo && <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{titulo}</h2>}
              {subtitulo && <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{subtitulo}</p>}
            </div>
          )}
          {pasos.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-xs text-slate-400">
              No hay fases o pasos definidos en esta línea de tiempo.
            </div>
          ) : (
            <div className="relative border-l-2 border-[#12A1A4]/30 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
              {pasos.map((paso: any, idx: number) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-[#0B254D] text-[#57d6f3] border-2 border-[#12A1A4] flex items-center justify-center text-xs font-black shadow-md group-hover:scale-110 transition-transform">
                    {paso.numero || idx + 1}
                  </div>
                  <div
                    className={`p-5 sm:p-6 rounded-2xl border shadow-xs hover:shadow-md transition-all ${
                      isLight ? 'border-white/10' : 'border-slate-200/90'
                    }`}
                    style={getContainerStyles(
                      isLight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(226, 232, 240, 0.9)',
                      '#ffffff'
                    )}
                  >
                    <h3 className={`text-base font-extrabold leading-snug ${isLight ? 'text-white' : 'text-slate-900'}`}>
                      {paso.titulo}
                    </h3>
                    {paso.descripcion && (
                      <p className={`text-xs sm:text-sm mt-2 leading-relaxed font-normal ${isLight ? 'text-slate-200' : 'text-slate-600'}`}>
                        {paso.descripcion}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // 17. LLAMADO A LA ACCIÓN (CTA / BOTONES)
    case 'CTA_BOTONES':
    case 'CTA': {
      const primaryText = config?.botonPrincipalTexto || 'Ver Planes y Precios';
      const primaryUrl = config?.botonPrincipalUrl || '/planes';
      const secondaryText = config?.botonSecundarioTexto;
      const secondaryUrl = config?.botonSecundarioUrl;
      const textMode = resolveTextMode(config?.colorFondo, config?.colorTexto, true);
      const isLight = textMode === 'claro';

      return (
        <div className="mb-12 max-w-5xl mx-auto">
          <div
            className={`rounded-3xl p-8 sm:p-12 text-center shadow-2xl border relative overflow-hidden ${
              isLight ? 'text-white border-white/10' : 'text-slate-900 border-slate-200'
            }`}
            style={{
              ...(config?.colorFondo
                ? { backgroundColor: config.colorFondo }
                : { background: 'linear-gradient(to right, #0B254D, #123A72, #0B254D)' }),
              ...(blockBorderColor ? blockBorderStyles(isLight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0') : {})
            }}
          >
            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
              {titulo && (
                <h2 className="text-2xl sm:4xl font-black tracking-tight leading-tight">
                  {titulo}
                </h2>
              )}
              {subtitulo && (
                <p className={`text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto ${
                  isLight ? 'text-slate-200' : 'text-slate-600'
                }`}>
                  {subtitulo}
                </p>
              )}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (primaryUrl === '/planes') {
                      onNavigateToPricing?.();
                    } else if (primaryUrl.startsWith('#') && onOpenContactModal && primaryUrl.includes('contacto')) {
                      onOpenContactModal();
                    } else if (primaryUrl.startsWith('http')) {
                      window.open(primaryUrl, '_blank');
                    } else {
                      window.location.href = primaryUrl;
                    }
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-[#EE751C] hover:bg-[#D66512] text-white text-xs sm:text-sm font-extrabold shadow-lg hover:scale-[1.03] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{primaryText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {secondaryText && (
                  <button
                    type="button"
                    onClick={() => {
                      if (secondaryUrl === '/planes') {
                        onNavigateToPricing?.();
                      } else if (secondaryUrl?.startsWith('#') && onOpenContactModal && secondaryUrl.includes('contacto')) {
                        onOpenContactModal();
                      } else if (secondaryUrl?.startsWith('http')) {
                        window.open(secondaryUrl, '_blank');
                      } else if (secondaryUrl) {
                        window.location.href = secondaryUrl;
                      }
                    }}
                    className={`px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold hover:scale-[1.03] transition-all cursor-pointer ${
                      isLight
                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        : 'bg-slate-900/10 hover:bg-slate-900/20 text-slate-900 border border-slate-900/20'
                    }`}
                  >
                    <span>{secondaryText}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 18. ESTADÍSTICAS Y MÉTRICAS CLAVE
    case 'ESTADISTICAS': {
      const metricas = config?.metricas || [];
      const textMode = resolveTextMode(config?.colorFondo, config?.colorTexto, false);
      const isLight = textMode === 'claro';

      return (
        <div className="mb-12 max-w-6xl mx-auto space-y-6 py-4">
          {(titulo || subtitulo) && (
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              {titulo && <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{titulo}</h2>}
              {subtitulo && <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{subtitulo}</p>}
            </div>
          )}
          {metricas.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-xs text-slate-400">
              No hay métricas configuradas en este bloque.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {metricas.map((m: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border shadow-xs hover:shadow-lg transition-all text-center space-y-2 group hover:-translate-y-1 ${
                    isLight ? 'border-white/10' : 'border-slate-200/90'
                  }`}
                  style={getContainerStyles(
                    isLight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(226, 232, 240, 0.9)',
                    '#ffffff'
                  )}
                >
                  <div className={`text-3xl sm:text-4xl font-black group-hover:scale-105 transition-transform ${
                    isLight ? 'text-[#57d6f3]' : 'text-[#12A1A4]'
                  }`}>
                    {m.cifra}
                  </div>
                  <p className={`text-xs sm:text-sm font-bold leading-snug ${isLight ? 'text-slate-200' : 'text-slate-700'}`}>
                    {m.etiqueta}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // 19. EQUIPO PEDAGÓGICO Y MENTORES
    case 'EQUIPO': {
      const miembros = config?.miembros || [];
      const textMode = resolveTextMode(config?.colorFondo, config?.colorTexto, false);
      const isLight = textMode === 'claro';

      return (
        <div className="mb-12 max-w-6xl mx-auto space-y-6 py-4">
          {(titulo || subtitulo) && (
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              {titulo && <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{titulo}</h2>}
              {subtitulo && <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{subtitulo}</p>}
            </div>
          )}
          {miembros.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-xs text-slate-400">
              No hay miembros de equipo configurados en este bloque.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {miembros.map((m: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border shadow-xs hover:shadow-lg transition-all flex flex-col items-center text-center space-y-3 hover:-translate-y-1 ${
                    isLight ? 'border-white/10' : 'border-slate-200/90'
                  }`}
                  style={getContainerStyles(
                    isLight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(226, 232, 240, 0.9)',
                    '#ffffff'
                  )}
                >
                  {m.fotoUrl ? (
                    <img
                      src={m.fotoUrl}
                      alt={m.nombre}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#12A1A4]/30 shadow-sm"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#0B254D] text-[#57d6f3] font-black text-xl flex items-center justify-center border-2 border-[#12A1A4]/30">
                      {(m.nombre || 'ES').slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className={`text-base font-extrabold ${isLight ? 'text-white' : 'text-slate-900'}`}>{m.nombre}</h3>
                    <p className={`text-xs font-bold mt-0.5 ${isLight ? 'text-[#57d6f3]' : 'text-[#12A1A4]'}`}>{m.cargo}</p>
                  </div>
                  {m.bio && (
                    <p className={`text-xs leading-relaxed font-normal ${isLight ? 'text-slate-300' : 'text-slate-600'}`}>
                      {m.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // 20. CONTACTO INFO
    case 'CONTACTO_INFO': {
      const textMode = resolveTextMode(config?.colorFondo, config?.colorTexto, false);
      const isLight = textMode === 'claro';

      return (
        <div
          className={`rounded-3xl p-6 sm:p-10 border shadow-sm mb-12 max-w-4xl mx-auto space-y-6 ${
            isLight ? 'border-white/10' : 'border-slate-200/90'
          }`}
          style={getContainerStyles(
            isLight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(226, 232, 240, 0.9)',
            '#ffffff'
          )}
        >
          {(titulo || subtitulo) && (
            <div className="text-center space-y-2 mb-4">
              {titulo && <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-white' : 'text-slate-900'}`}>{titulo}</h2>}
              {subtitulo && <p className={`text-xs sm:text-sm leading-relaxed font-normal ${isLight ? 'text-slate-300' : 'text-slate-600'}`}>{subtitulo}</p>}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {config?.email && (
              <div
                className={`p-4 rounded-2xl border flex items-center gap-3.5 ${
                  isLight ? 'bg-white/10 border-white/15' : 'bg-slate-50 border-slate-200'
                }`}
                style={blockBorderColor ? blockBorderStyles(isLight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0') : undefined}
              >
                <div className="w-10 h-10 rounded-xl bg-[#12A1A4]/15 text-[#12A1A4] flex items-center justify-center shrink-0 font-black">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className={`text-[11px] font-bold uppercase block ${isLight ? 'text-slate-300' : 'text-slate-400'}`}>Correo Electrónico</span>
                  <a href={`mailto:${config.email}`} className={`text-xs sm:text-sm font-extrabold truncate block ${isLight ? 'text-white hover:text-[#57d6f3]' : 'text-slate-800 hover:text-[#12A1A4]'}`}>
                    {config.email}
                  </a>
                </div>
              </div>
            )}
            {config?.whatsApp && (
              <div
                className={`p-4 rounded-2xl border flex items-center gap-3.5 ${
                  isLight ? 'bg-white/10 border-white/15' : 'bg-slate-50 border-slate-200'
                }`}
                style={blockBorderColor ? blockBorderStyles(isLight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0') : undefined}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 font-black">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className={`text-[11px] font-bold uppercase block ${isLight ? 'text-slate-300' : 'text-slate-400'}`}>WhatsApp Orientación</span>
                  <a
                    href={`https://wa.me/${config.whatsApp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs sm:text-sm font-extrabold truncate block ${isLight ? 'text-white hover:text-emerald-400' : 'text-slate-800 hover:text-emerald-600'}`}
                  >
                    {config.whatsApp}
                  </a>
                </div>
              </div>
            )}
          </div>
          {onOpenContactModal && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onOpenContactModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs sm:text-sm font-extrabold shadow-md transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Enviar Mensaje al Equipo Pedagógico</span>
              </button>
            </div>
          )}
        </div>
      );
    }

    default:
      return null;
  }
};
