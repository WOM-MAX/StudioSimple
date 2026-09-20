import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Sparkles, ArrowDown, ChevronRight, Shield } from 'lucide-react';

const TOTAL_FRAMES = 151;
const FRAME_PATH = (index: number) =>
  `/hero-frames/frame_${String(index).padStart(4, '0')}.webp`;

export const HeroScrollScrubber: React.FC = () => {
  const { setViewMode } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(1);
  const isRenderingRef = useRef<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // 1. Preload frames
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    // Preload the first frame immediately for instant first paint
    const firstImg = new Image();
    firstImg.src = FRAME_PATH(1);
    firstImg.onload = () => {
      images[1] = firstImg;
      loaded++;
      renderFrame(1);
    };

    // Preload remaining frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        images[i] = img;
        loaded++;
        const percent = Math.floor((loaded / TOTAL_FRAMES) * 100);
        setLoadProgress(percent);
        if (loaded >= Math.min(20, TOTAL_FRAMES)) {
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        loaded++;
      };
    }
    imagesRef.current = images;
  }, []);

  // 2. Draw frame to canvas with aspect ratio cover
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Cover math
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // 3. Resize canvas to match display size
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  // 4. Scroll Listener to update frame
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = containerRef.current.scrollHeight - window.innerHeight;

      if (scrollableDistance <= 0) return;

      // Progress from 0.0 to 1.0
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / scrollableDistance));
      setScrollProgress(progress);

      const targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(progress * (TOTAL_FRAMES - 1)) + 1));

      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame;
        if (!isRenderingRef.current) {
          isRenderingRef.current = true;
          requestAnimationFrame(() => {
            renderFrame(currentFrameRef.current);
            isRenderingRef.current = false;
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [renderFrame]);

  // Overlay phase calculations
  const isPhase1 = scrollProgress < 0.35;
  const isPhase2 = scrollProgress >= 0.35 && scrollProgress < 0.70;
  const isPhase3 = scrollProgress >= 0.70;

  // Desplazamiento cinemático suave y flotado hacia la sección de método
  const handleScrollToMethod = () => {
    const targetElement = document.getElementById('exito');
    if (!targetElement) return;

    // Compensar cabecera fija institucional (~92px)
    const headerHeight = 92;
    const targetRect = targetElement.getBoundingClientRect();
    const targetTop = targetRect.top + window.pageYOffset - headerHeight;

    const startPosition = window.pageYOffset;
    const distance = targetTop - startPosition;
    const duration = 1200; // ms: duración flotada y suave
    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <div ref={containerRef} className="relative w-full h-[240vh] bg-[#0A192F]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Cinematic Soft Vignette Overlay: Rostros luminosos y centro despejado */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/60 via-transparent to-black/25 pointer-events-none" />

        {/* Phase 1: Intro Hero (0% - 35%) */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center text-center p-6 max-w-4xl mx-auto transition-all duration-700 pointer-events-none ${
            isPhase1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8AD22]/25 border border-[#F8AD22]/50 text-[#F8AD22] text-xs sm:text-sm font-black mb-4 backdrop-blur-md drop-shadow">
            <Sparkles className="w-4 h-4" />
            <span>Método Exclusivo 3º a 8º Básico</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            Prepara sus exámenes libres <span className="text-[#F8AD22]">sin estrés.</span>
          </h1>

          <p className="text-white/95 text-sm sm:text-lg max-w-xl font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Microaprendizaje de 30 minutos al día con pedagogía adaptativa y acompañamiento guiado.
          </p>

          <div className="mt-8 flex items-center gap-2 text-white/80 text-xs font-bold animate-bounce drop-shadow">
            <ArrowDown className="w-4 h-4 text-[#F8AD22]" />
            <span>Desliza hacia abajo para recorrer la experiencia</span>
          </div>
        </div>

        {/* Phase 2: Pedagogical Focus (35% - 70%) */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center text-center p-6 max-w-3xl mx-auto transition-all duration-700 pointer-events-none ${
            isPhase2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12A1A4]/30 border border-[#12A1A4]/50 text-white text-xs font-extrabold mb-3 backdrop-blur-md drop-shadow">
            <span>Estructura Canónica de 8 Pasos</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            Lecciones interactivas de 30 minutos guiadas paso a paso
          </h2>

          <p className="text-white/95 text-xs sm:text-base max-w-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            El apoderado guía con diálogo socrático y preguntas precisas, mientras el estudiante practica de forma autónoma.
          </p>
        </div>

        {/* Phase 3: Action & Direct Connection (70% - 100%) */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center text-center p-6 max-w-4xl mx-auto transition-all duration-700 ${
            isPhase3 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4A964E]/30 border border-[#4A964E]/50 text-white text-xs font-extrabold mb-3 backdrop-blur-md drop-shadow">
            <span>Autonomía y Confianza Escolar</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            Preparados para validar sus estudios con éxito
          </h2>

          <p className="text-white/95 text-xs sm:text-base max-w-xl mb-8 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Una metodología validada que brinda tranquilidad a las familias y seguridad a los estudiantes frente a la evaluación MINEDUC.
          </p>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleScrollToMethod}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-sm shadow-2xl backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
            >
              <span>Conoce cómo funciona el método</span>
              <ArrowDown className="w-4 h-4 text-[#F8AD22]" />
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar at Bottom of Sticky Viewport */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 sm:w-64 bg-white/10 rounded-full h-1.5 overflow-hidden backdrop-blur-xs border border-white/10">
          <div
            className="bg-[#F8AD22] h-full transition-all duration-75"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
