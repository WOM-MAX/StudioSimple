import React, { useState, useEffect, useRef } from 'react';
import { CintaNoticiasConfig, NoticiaItem } from '../../types/cms';
import { getBorderStyles } from './borderStyles';

interface CintaNoticiasBlockProps {
  configuracion?: CintaNoticiasConfig;
}

export const CintaNoticiasBlock: React.FC<CintaNoticiasBlockProps> = ({ configuracion }) => {
  const config = configuracion || {};
  const noticias: NoticiaItem[] = config.noticias || [];
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const tickerRef = useRef<HTMLDivElement>(null);

  const borderStyles = getBorderStyles(
    config.modoBorde || 'inferior',
    config.colorBorde,
    config.grosorBorde || '2px',
    '1px solid rgba(0, 0, 0, 0.1)'
  );

  if (noticias.length === 0) return null;

  const speedMap: Record<string, number> = { lenta: 14, normal: 8, rapida: 4 };
  const duration = speedMap[config.velocidad || 'normal'] || 8;

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

  const bgColor = config.colorFondo || '#0B254D';
  let textColor = '#FFFFFF';
  if (config.colorTexto === 'oscuro') {
    textColor = '#0F172A';
  } else if (config.colorTexto === 'claro') {
    textColor = '#FFFFFF';
  } else if (config.colorTexto && config.colorTexto.startsWith('#')) {
    textColor = config.colorTexto;
  } else if (config.colorFondo) {
    textColor = isHexDark(config.colorFondo) ? '#FFFFFF' : '#0F172A';
  }

  const marqueeBgColor = config.colorFondoMarquesina || bgColor;
  let marqueeTextColor = textColor;
  if (config.colorTextoMarquesina === 'oscuro') {
    marqueeTextColor = '#0F172A';
  } else if (config.colorTextoMarquesina === 'claro') {
    marqueeTextColor = '#FFFFFF';
  } else if (config.colorTextoMarquesina && config.colorTextoMarquesina.startsWith('#')) {
    marqueeTextColor = config.colorTextoMarquesina;
  } else if (config.colorFondoMarquesina) {
    marqueeTextColor = isHexDark(config.colorFondoMarquesina) ? '#FFFFFF' : '#0F172A';
  }
  const labelColor = config.colorEtiqueta || '#12A1A4';
  const mainLabel = config.etiquetaPrincipal || 'MINEDUC AL DÍA';
  const showLive = config.mostrarIconoLive !== false;
  const altura = config.altura || 'normal';
  const alineacion = config.alineacion || 'centrado';

  const isCentrado = alineacion === 'centrado';

  // Dimensiones y estilos según la altura configurada
  const alturaMap = {
    compacta: {
      barMinH: 'min-h-[38px]',
      badgePy: 'py-2',
      badgeText: 'text-xs',
      textContainerH: 'h-[22px]',
      titleText: 'text-xs sm:text-sm',
      tickerPy: 'py-2',
      tickerText: 'text-xs sm:text-sm',
    },
    normal: {
      barMinH: 'min-h-[48px]',
      badgePy: 'py-3',
      badgeText: 'text-xs sm:text-sm',
      textContainerH: 'h-[28px]',
      titleText: 'text-sm sm:text-base font-semibold',
      tickerPy: 'py-3.5',
      tickerText: 'text-sm sm:text-base font-medium',
    },
    amplia: {
      barMinH: 'min-h-[58px]',
      badgePy: 'py-4',
      badgeText: 'text-sm sm:text-base',
      textContainerH: 'h-[34px]',
      titleText: 'text-base sm:text-lg font-bold',
      tickerPy: 'py-5',
      tickerText: 'text-base sm:text-lg font-semibold',
    },
  };
  const currentSize = alturaMap[altura] || alturaMap.normal;

  // Rotar el titular superior cada 5 segundos
  useEffect(() => {
    if (noticias.length <= 1) return;
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prev) => (prev + 1) % noticias.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [noticias.length, isPaused]);

  // Construir los elementos con etiquetas del ticker
  const tickerItems = noticias.map((n, i) => (
    <span key={i} className="inline-flex items-center shrink-0">
      {i > 0 && (
        <span
          className="mx-4 inline-block h-1.5 w-1.5 rounded-full opacity-70"
          style={{ backgroundColor: marqueeTextColor }}
        />
      )}
      {n.etiqueta && (
        <span
          className="mr-2 inline-block rounded px-2.5 py-0.5 text-[10px] sm:text-xs font-black uppercase tracking-wider text-white shadow-xs"
          style={{ backgroundColor: labelColor }}
        >
          {n.etiqueta}
        </span>
      )}
      <span className="tracking-wide font-medium">{n.texto}</span>
    </span>
  ));

  const badgeContent = (
    <>
      {showLive && (
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
        </span>
      )}
      <span className={`font-black ${currentSize.badgeText} uppercase tracking-wider text-white leading-none`}>
        {mainLabel}
      </span>
    </>
  );

  const modoVisual = config.modoVisual || 'doble';

  return (
    <div
      className="w-full relative shadow-md z-40 border-b border-black/10"
      style={config.colorBorde ? borderStyles : undefined}
    >
      {/* MODO 1: SOLO MARQUESINA (1 FILA COMPACTA) */}
      {modoVisual === 'solo_marquesina' && (
        <div
          className={`relative w-full overflow-hidden flex items-stretch ${currentSize.barMinH}`}
          style={{ backgroundColor: bgColor }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Badge en Dispositivos Móviles */}
          <div
            className={`relative z-20 flex sm:hidden items-center justify-center gap-1.5 px-3 shrink-0 ${currentSize.badgePy}`}
            style={{ backgroundColor: labelColor }}
          >
            {badgeContent}
          </div>

          {/* Badge en Escritorio con corte angular */}
          <div
            className={`cinta-noticias-badge relative z-20 hidden sm:flex items-center justify-start gap-2.5 shrink-0 px-5 ${currentSize.badgePy}`}
            style={{ backgroundColor: labelColor }}
          >
            {badgeContent}
          </div>

          {/* Marquesina continua en la misma fila */}
          <div
            className="flex-1 relative overflow-hidden flex items-center min-w-0"
            style={{ backgroundColor: marqueeBgColor }}
          >
            <div
              ref={tickerRef}
              className={`flex whitespace-nowrap items-center ${currentSize.tickerText} leading-normal`}
              style={{
                animation: `cinta-scroll ${duration * Math.max(noticias.length, 1)}s linear infinite`,
                animationPlayState: isPaused ? 'paused' : 'running',
                color: marqueeTextColor,
              }}
            >
              <span data-ticker-set="0" className="inline-flex items-center shrink-0 px-4">
                {tickerItems}
              </span>
              <span
                className="mx-4 inline-block h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: marqueeTextColor, opacity: 0.7 }}
              />
              <span data-ticker-set="1" className="inline-flex items-center shrink-0 px-4">
                {tickerItems}
              </span>
              <span
                className="mx-4 inline-block h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: marqueeTextColor, opacity: 0.7 }}
              />
            </div>
          </div>
        </div>
      )}

      {/* MODO 2: SOLO TITULAR ROTATIVO (1 FILA) */}
      {modoVisual === 'solo_titular' && (
        <div
          className={`relative w-full overflow-hidden flex flex-col sm:flex-row sm:items-stretch ${currentSize.barMinH}`}
          style={{ backgroundColor: bgColor }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`relative z-20 flex sm:hidden items-center justify-center gap-2 px-4 ${currentSize.badgePy}`}
            style={{ backgroundColor: labelColor }}
          >
            {badgeContent}
          </div>

          <div
            className={`cinta-noticias-badge relative z-20 hidden sm:flex items-center justify-start gap-2.5 min-w-[210px] px-6 ${currentSize.badgePy}`}
            style={{ backgroundColor: labelColor }}
          >
            {badgeContent}
          </div>

          <div className={`hidden sm:flex flex-1 relative items-center px-6 py-0 z-10 overflow-hidden ${currentSize.barMinH} ${isCentrado ? 'justify-center' : 'justify-start'}`}>
            <div className={`relative w-full ${currentSize.textContainerH} overflow-hidden`}>
              {noticias.map((noticia, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 flex items-center transition-all duration-500 ease-in-out ${isCentrado ? 'justify-center text-center' : 'justify-start text-left'}`}
                  style={{
                    opacity: idx === activeIndex ? 1 : 0,
                    transform: idx === activeIndex ? 'translateY(0)' : 'translateY(100%)',
                  }}
                >
                  {noticia.etiqueta && (
                    <span
                      className="mr-3 inline-block rounded-md px-2.5 py-0.5 text-[10px] sm:text-xs font-black uppercase tracking-wider shrink-0 bg-white/15 text-white border border-white/20"
                    >
                      {noticia.etiqueta}
                    </span>
                  )}
                  <p
                    className={`${currentSize.titleText} m-0 truncate ${isCentrado ? 'text-center' : 'text-left'}`}
                    style={{ color: textColor }}
                  >
                    {noticia.texto}
                  </p>
                </div>
              ))}
            </div>

            {noticias.length > 1 && (
              <div className="ml-auto flex items-center gap-1.5 shrink-0 pl-4">
                {noticias.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="transition-all duration-300 rounded-full cursor-pointer"
                    style={{
                      width: idx === activeIndex ? '18px' : '6px',
                      height: '6px',
                      backgroundColor: idx === activeIndex ? labelColor : `${textColor}55`,
                    }}
                    title={`Noticia ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODO 3: DOBLE BARRA (2 FILAS: TITULAR ROTATIVO + MARQUESINA CONTINUA) */}
      {modoVisual === 'doble' && (
        <>
          {/* 1. BARRA SUPERIOR: Badge + Titular Rotativo */}
          <div
            className={`relative w-full overflow-hidden flex flex-col sm:flex-row sm:items-stretch ${currentSize.barMinH}`}
            style={{ backgroundColor: bgColor }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Badge en Dispositivos Móviles */}
            <div
              className={`relative z-20 flex sm:hidden items-center justify-center gap-2 px-4 ${currentSize.badgePy}`}
              style={{ backgroundColor: labelColor }}
            >
              {badgeContent}
            </div>

            {/* Badge en Escritorio con corte angular */}
            <div
              className={`cinta-noticias-badge relative z-20 hidden sm:flex items-center justify-start gap-2.5 min-w-[210px] px-6 ${currentSize.badgePy}`}
              style={{ backgroundColor: labelColor }}
            >
              {badgeContent}
            </div>

            {/* Titular Principal Rotativo (Escritorio) */}
            <div className={`hidden sm:flex flex-1 relative items-center px-6 py-0 z-10 overflow-hidden ${currentSize.barMinH} ${isCentrado ? 'justify-center' : 'justify-start'}`}>
              <div className={`relative w-full ${currentSize.textContainerH} overflow-hidden`}>
                {noticias.map((noticia, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 flex items-center transition-all duration-500 ease-in-out ${isCentrado ? 'justify-center text-center' : 'justify-start text-left'}`}
                    style={{
                      opacity: idx === activeIndex ? 1 : 0,
                      transform: idx === activeIndex ? 'translateY(0)' : 'translateY(100%)',
                    }}
                  >
                    {noticia.etiqueta && (
                      <span
                        className="mr-3 inline-block rounded-md px-2.5 py-0.5 text-[10px] sm:text-xs font-black uppercase tracking-wider shrink-0 bg-white/15 text-white border border-white/20"
                      >
                        {noticia.etiqueta}
                      </span>
                    )}
                    <p
                      className={`${currentSize.titleText} m-0 truncate ${isCentrado ? 'text-center' : 'text-left'}`}
                      style={{ color: textColor }}
                    >
                      {noticia.texto}
                    </p>
                  </div>
                ))}
              </div>

              {/* Indicadores de titular */}
              {noticias.length > 1 && (
                <div className="ml-auto flex items-center gap-1.5 shrink-0 pl-4">
                  {noticias.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className="transition-all duration-300 rounded-full cursor-pointer"
                      style={{
                        width: idx === activeIndex ? '18px' : '6px',
                        height: '6px',
                        backgroundColor: idx === activeIndex ? labelColor : `${textColor}55`,
                      }}
                      title={`Noticia ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 2. CINTA DESLIZANTE CONTINUA (MARQUESINA TICKER) */}
          <div
            className={`w-full relative ${currentSize.tickerPy} flex items-center overflow-hidden border-t border-black/15 shadow-inner`}
            style={{ backgroundColor: marqueeBgColor }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={tickerRef}
              className={`flex whitespace-nowrap items-center ${currentSize.tickerText} leading-normal`}
              style={{
                animation: `cinta-scroll ${duration * Math.max(noticias.length, 1)}s linear infinite`,
                animationPlayState: isPaused ? 'paused' : 'running',
                color: marqueeTextColor,
              }}
            >
              <span data-ticker-set="0" className="inline-flex items-center shrink-0 px-4">
                {tickerItems}
              </span>
              <span
                className="mx-4 inline-block h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: marqueeTextColor, opacity: 0.7 }}
              />
              <span data-ticker-set="1" className="inline-flex items-center shrink-0 px-4">
                {tickerItems}
              </span>
              <span
                className="mx-4 inline-block h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: marqueeTextColor, opacity: 0.7 }}
              />
            </div>
          </div>
        </>
      )}

      {/* Estilos de animación y corte angular */}
      <style>{`
        @keyframes cinta-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (min-width: 640px) {
          .cinta-noticias-badge {
            clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          }
        }
      `}</style>
    </div>
  );
};
