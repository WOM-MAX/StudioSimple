import React, { useState, useEffect } from 'react';
import { X, ExternalLink, ArrowRight } from 'lucide-react';
import type { PopupBanner } from '../../types/cmsExtras';

interface PopupWrapperProps {
  popup: PopupBanner | null;
  onDismiss: (id: string) => void;
}

export const PopupWrapper: React.FC<PopupWrapperProps> = ({ popup, onDismiss }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => setVisible(true), 80);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [popup]);

  if (!popup) return null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onDismiss(popup.id);
    }, 350);
  };

  const posicion = popup.posicion || 'centro-modal';
  const estiloImagen = popup.estiloImagen || 'encabezado';
  const tamanoTitulo = popup.tamanoTitulo || 'md';
  const colorFondo = popup.colorFondo || (posicion.includes('banner') ? '#0B254D' : '#ffffff');
  const colorTexto = popup.colorTexto || (posicion.includes('banner') ? '#ffffff' : '#111827');
  const colorBoton = popup.colorBoton || '#12A1A4';

  const ctaUrl = popup.ctaUrl || popup.enlaceUrl;
  const ctaText = popup.ctaText || popup.enlaceTexto;
  const contenido = popup.contenido || popup.mensaje || '';

  const isUrgent = popup.tipoAlerta === 'urgente' || popup.tipoAlerta === 'alerta';
  const isBanner = posicion.includes('banner');
  const isModal = posicion === 'centro-modal';

  // Tamaños de título
  const titleSizes: Record<string, string> = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
  };
  const titleClass = titleSizes[tamanoTitulo] || titleSizes.md;

  // Badges por tipo
  const badgeStyles: Record<string, { bg: string; label: string }> = {
    info: { bg: 'bg-blue-600', label: 'Información' },
    urgente: { bg: 'bg-red-600', label: 'Urgente' },
    matricula: { bg: 'bg-emerald-600', label: 'Matrícula' },
    evento: { bg: 'bg-amber-600', label: 'Evento' },
    alerta: { bg: 'bg-rose-600', label: 'Alerta' },
    exito: { bg: 'bg-teal-600', label: 'Novedad' },
  };
  const badge = badgeStyles[popup.tipoAlerta] || badgeStyles.info;

  // ============================================
  // RENDER: BANNER (superior o inferior)
  // ============================================
  if (isBanner) {
    const posClass =
      posicion === 'banner-superior'
        ? 'fixed top-0 left-0 right-0 z-[9999]'
        : 'fixed bottom-0 left-0 right-0 z-[9999]';

    const slideTransform =
      posicion === 'banner-superior'
        ? (visible ? 'translateY(0)' : 'translateY(-100%)')
        : (visible ? 'translateY(0)' : 'translateY(100%)');

    return (
      <div className={posClass}>
        <div
          className="w-full shadow-2xl transition-all duration-500 ease-out border-b border-white/10"
          style={{
            backgroundColor: colorFondo,
            color: colorTexto,
            transform: slideTransform,
            opacity: visible ? 1 : 0,
          }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <div className="flex flex-1 items-center gap-3">
              {isUrgent ? (
                <span className="relative flex h-3 w-3 flex-shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
                </span>
              ) : (
                <span className={`${badge.bg} text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0`}>
                  {badge.label}
                </span>
              )}
              <div className="text-sm font-medium">
                <strong className="font-bold">{popup.titulo}</strong>
                {contenido && (
                  <>
                    <span className="mx-1.5 opacity-60">:</span>
                    <span className="opacity-95">{contenido}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {ctaUrl && ctaText && (
                <a
                  href={ctaUrl}
                  target={ctaUrl.startsWith('http') ? '_blank' : '_self'}
                  rel={ctaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={handleClose}
                  className="flex-shrink-0 flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-bold transition-transform hover:scale-105 shadow-sm"
                  style={{
                    backgroundColor: colorBoton,
                    color: '#ffffff',
                  }}
                >
                  <span>{ctaText}</span>
                  {ctaUrl.startsWith('http') ? <ExternalLink size={13} /> : <ArrowRight size={13} />}
                </a>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full p-1.5 transition-colors hover:bg-black/15 active:scale-95 cursor-pointer"
                style={{ color: colorTexto }}
                aria-label="Cerrar aviso"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: MODAL O TARJETA FLOTANTE (ESQUINA)
  // ============================================
  let containerClass = 'fixed z-[9999] ';
  if (isModal) {
    containerClass += 'inset-0 flex items-center justify-center p-4';
  } else if (posicion === 'inferior-derecha') {
    containerClass += 'bottom-4 right-4 sm:bottom-6 sm:right-6 pointer-events-none';
  } else if (posicion === 'inferior-izquierda') {
    containerClass += 'bottom-4 left-4 sm:bottom-6 sm:left-6 pointer-events-none';
  }

  const cardWidth = isModal
    ? 'w-full max-w-[420px]'
    : 'w-[320px] sm:w-[380px] pointer-events-auto';

  return (
    <>
      <style>{`
        @keyframes popupSlideUp {
          0% { opacity: 0; transform: translateY(35px) scale(0.94); }
          65% { opacity: 1; transform: translateY(-5px) scale(1.01); }
          85% { transform: translateY(2px) scale(0.998); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes popupFadeOut {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(25px) scale(0.92); }
        }
        @keyframes backdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes backdropFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 12px rgba(239, 68, 68, 0.35), 0 0 24px rgba(239, 68, 68, 0.15); }
          50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.6), 0 0 45px rgba(239, 68, 68, 0.25); }
        }
        .popup-card-enter {
          animation: popupSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .popup-card-exit {
          animation: popupFadeOut 0.35s ease-in forwards;
        }
        .popup-backdrop-enter {
          animation: backdropFadeIn 0.35s ease-out forwards;
        }
        .popup-backdrop-exit {
          animation: backdropFadeOut 0.3s ease-in forwards;
        }
        .popup-shimmer-btn {
          position: relative;
          overflow: hidden;
        }
        .popup-shimmer-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          animation: shimmer 2.5s ease-in-out infinite;
        }
        .popup-glow-urgent {
          animation: glowPulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* Backdrop para centro-modal */}
      {isModal && (
        <div
          className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-xs transition-opacity ${
            visible ? 'popup-backdrop-enter' : 'popup-backdrop-exit'
          }`}
          onClick={handleClose}
        />
      )}

      {/* Contenedor del popup */}
      <div className={containerClass}>
        <div
          className={`
            ${cardWidth}
            ${visible ? 'popup-card-enter' : 'popup-card-exit'}
            ${isUrgent ? 'popup-glow-urgent' : ''}
            relative overflow-hidden rounded-3xl shadow-2xl border border-black/10 max-h-[90vh] overflow-y-auto
          `}
          style={{
            backgroundColor: estiloImagen !== 'fondo' ? colorFondo : undefined,
            color: colorTexto,
          }}
        >
          {/* Imagen de fondo (cubre toda la tarjeta) */}
          {estiloImagen === 'fondo' && popup.imagenUrl && (
            <div className="absolute inset-0 z-0">
              <img
                src={popup.imagenUrl}
                alt=""
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ backgroundColor: colorFondo, opacity: 0.82 }}
              />
            </div>
          )}

          {/* Modalidad Solo Imagen (Afiche Flyer) */}
          {estiloImagen === 'solo-imagen' && popup.imagenUrl && (
            <div className="relative flex flex-col w-full z-10">
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-3 top-3 z-20 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-md transition-all hover:bg-black/75 hover:scale-110 cursor-pointer"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>

              {ctaUrl && !ctaText ? (
                <a
                  href={ctaUrl}
                  target={ctaUrl.startsWith('http') ? '_blank' : '_self'}
                  rel={ctaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={handleClose}
                  className="block w-full"
                >
                  <img
                    src={popup.imagenUrl}
                    alt={popup.titulo}
                    className="w-full h-auto object-contain"
                  />
                </a>
              ) : (
                <img
                  src={popup.imagenUrl}
                  alt={popup.titulo}
                  className="w-full h-auto object-contain"
                />
              )}

              {ctaUrl && ctaText && (
                <div className="p-4" style={{ backgroundColor: colorFondo }}>
                  <a
                    href={ctaUrl}
                    target={ctaUrl.startsWith('http') ? '_blank' : '_self'}
                    rel={ctaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={handleClose}
                    className="popup-shimmer-btn block w-full rounded-2xl py-3 text-center text-sm font-bold tracking-wide transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                    style={{
                      backgroundColor: colorBoton,
                      color: '#ffffff',
                    }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>{ctaText}</span>
                      {ctaUrl.startsWith('http') ? <ExternalLink size={16} /> : <ArrowRight size={16} />}
                    </span>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Contenido estándar con o sin imagen encabezado */}
          {estiloImagen !== 'solo-imagen' && (
            <div className="relative z-10 flex flex-col">
              {/* Botón Cerrar */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-3.5 top-3.5 z-20 rounded-full bg-black/25 p-1.5 text-white backdrop-blur-md transition-all hover:bg-black/40 hover:scale-110 cursor-pointer"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>

              {/* Badge Urgente con Glow */}
              {isUrgent && (
                <div className="absolute left-3.5 top-3.5 z-20 flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                  <span>Urgente</span>
                </div>
              )}

              {/* Imagen de Encabezado */}
              {estiloImagen === 'encabezado' && popup.imagenUrl && (
                <div className="relative w-full overflow-hidden">
                  <img
                    src={popup.imagenUrl}
                    alt={popup.titulo}
                    className="w-full object-cover max-h-56"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16"
                    style={{
                      background: `linear-gradient(to top, ${colorFondo}, transparent)`,
                    }}
                  />
                </div>
              )}

              {/* Cuerpo del contenido */}
              <div className="flex flex-col gap-3 p-6">
                {!isUrgent && (
                  <span
                    className={`${badge.bg} w-fit rounded-full px-3 py-0.5 text-xs font-semibold text-white shadow-xs`}
                  >
                    {badge.label}
                  </span>
                )}

                <h3 className={`${titleClass} font-bold leading-tight`}>
                  {popup.titulo}
                </h3>

                {contenido && (
                  <div
                    className="whitespace-pre-line text-sm leading-relaxed opacity-90"
                    dangerouslySetInnerHTML={{ __html: contenido }}
                  />
                )}

                {/* Botón de Llamado a la Acción (CTA) */}
                {ctaUrl && ctaText && (
                  <a
                    href={ctaUrl}
                    target={ctaUrl.startsWith('http') ? '_blank' : '_self'}
                    rel={ctaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={handleClose}
                    className="popup-shimmer-btn mt-2 block w-full rounded-2xl py-3 text-center text-sm font-bold tracking-wide transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
                    style={{
                      backgroundColor: colorBoton,
                      color: '#ffffff',
                    }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>{ctaText}</span>
                      {ctaUrl.startsWith('http') ? <ExternalLink size={16} /> : <ArrowRight size={16} />}
                    </span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
