import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2, HelpCircle } from 'lucide-react';

interface NumberLineProps {
  initialA?: number;
  initialB?: number;
}

export const StudentInteractiveNumberLine: React.FC<NumberLineProps> = ({
  initialA = -3,
  initialB = 2
}) => {
  const [selectedA, setSelectedA] = useState<number>(initialA);
  const [selectedB, setSelectedB] = useState<number>(initialB);
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('B');
  const [showJumps, setShowJumps] = useState<boolean>(true);

  const range = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];

  const handleSelectNumber = (n: number) => {
    if (activeSlot === 'A') {
      setSelectedA(n);
      setActiveSlot('B');
    } else {
      setSelectedB(n);
      setActiveSlot('A');
    }
  };

  const minVal = Math.min(selectedA, selectedB);
  const maxVal = Math.max(selectedA, selectedB);
  const distance = maxVal - minVal;
  const isAGreater = selectedA > selectedB;
  const isEqual = selectedA === selectedB;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-teal-200/90 text-center relative overflow-hidden transition-all duration-300">
      {/* Top Accent Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#12A1A4] via-[#0E8284] to-[#EE751C]" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-[#0E8284] border border-teal-200 font-bold text-xs uppercase tracking-wider shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-[#12A1A4] animate-pulse" />
          <span>Modelo Pictórico CPA · Recta Numérica en Z</span>
        </div>

        <button
          type="button"
          onClick={() => setShowJumps(!showJumps)}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
            showJumps
              ? 'bg-teal-50 text-[#0E8284] border-teal-200'
              : 'bg-slate-50 text-slate-500 border-slate-200'
          }`}
        >
          {showJumps ? 'Ocultar Desplazamiento' : 'Ver Desplazamiento'}
        </button>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-[#1C3257] tracking-tight mb-2">
        La Recta Numérica y Relaciones de Orden
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mb-8">
        Haz clic en cualquier número para posicionar tus marcas. Descubre cómo la posición determina si un número es mayor o menor.
      </p>

      {/* SELECTOR STATUS INDICATORS */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => setActiveSlot('A')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl border-2 transition-all cursor-pointer ${
            activeSlot === 'A'
              ? 'bg-sky-50 border-[#12A1A4] shadow-md ring-2 ring-[#12A1A4]/20 scale-105'
              : 'bg-slate-50 border-slate-200 opacity-80'
          }`}
        >
          <span className="w-3 h-3 rounded-full bg-[#12A1A4]" />
          <span className="text-xs font-bold text-[#1C3257]">Punto A:</span>
          <span className="text-sm font-extrabold text-[#12A1A4]">{selectedA > 0 ? `+${selectedA}` : selectedA}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSlot('B')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl border-2 transition-all cursor-pointer ${
            activeSlot === 'B'
              ? 'bg-orange-50 border-[#EE751C] shadow-md ring-2 ring-[#EE751C]/20 scale-105'
              : 'bg-slate-50 border-slate-200 opacity-80'
          }`}
        >
          <span className="w-3 h-3 rounded-full bg-[#EE751C]" />
          <span className="text-xs font-bold text-[#1C3257]">Punto B:</span>
          <span className="text-sm font-extrabold text-[#EE751C]">{selectedB > 0 ? `+${selectedB}` : selectedB}</span>
        </button>
      </div>

      {/* THE GRAPHICAL NUMBER LINE CANVAS */}
      <div className="relative py-12 px-4 sm:px-8 bg-slate-50/70 rounded-3xl border border-slate-200/80 mb-8 overflow-x-auto">
        {/* Direction Indicator */}
        <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-400 mb-6 px-2 uppercase tracking-wider">
          <span className="flex items-center gap-1 text-rose-500">
            <ArrowLeft className="w-3.5 h-3.5" /> Menor (Hacia la izquierda)
          </span>
          <span className="flex items-center gap-1 text-teal-600">
            Mayor (Hacia la derecha) <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Central Axis Line */}
        <div className="relative h-2 bg-slate-300 rounded-full my-8 mx-4">
          {/* Highlighted segment between minVal and maxVal */}
          {showJumps && distance > 0 && (
            <div
              className="absolute top-0 bottom-0 bg-gradient-to-r from-[#12A1A4] to-[#EE751C] opacity-40 rounded-full transition-all duration-300"
              style={{
                left: `${((minVal + 6) / 12) * 100}%`,
                width: `${(distance / 12) * 100}%`
              }}
            />
          )}

          {/* Jump Arc Badge */}
          {showJumps && distance > 0 && (
            <div
              className="absolute -top-10 -translate-x-1/2 bg-gradient-to-r from-[#12A1A4] to-[#EE751C] text-white px-3 py-1 rounded-full text-xs font-extrabold shadow-md transition-all duration-300 pointer-events-none"
              style={{ left: `${((minVal + maxVal + 12) / 24) * 100}%` }}
            >
              Distancia: {distance} unidades
            </div>
          )}

          {/* Points Grid */}
          <div className="absolute inset-0 flex justify-between items-center -mx-2.5">
            {range.map((n) => {
              const isSelectedA = n === selectedA;
              const isSelectedB = n === selectedB;
              const isZero = n === 0;
              const isNeg = n < 0;

              return (
                <div key={n} className="flex flex-col items-center relative group">
                  {/* Marker Pin A */}
                  {isSelectedA && (
                    <div className="absolute -top-9 flex flex-col items-center animate-bounce">
                      <span className="bg-[#12A1A4] text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-sm">
                        A
                      </span>
                      <div className="w-1.5 h-2 bg-[#12A1A4]" />
                    </div>
                  )}

                  {/* Marker Pin B */}
                  {isSelectedB && (
                    <div className="absolute -top-9 flex flex-col items-center animate-bounce">
                      <span className="bg-[#EE751C] text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-sm">
                        B
                      </span>
                      <div className="w-1.5 h-2 bg-[#EE751C]" />
                    </div>
                  )}

                  {/* Tick Line */}
                  <div
                    className={`w-1 transition-all ${
                      isZero
                        ? 'h-6 bg-[#1C3257] -mt-2'
                        : isSelectedA || isSelectedB
                        ? 'h-5 bg-teal-500'
                        : 'h-3 bg-slate-400'
                    }`}
                  />

                  {/* Clickable Circle Button */}
                  <button
                    type="button"
                    onClick={() => handleSelectNumber(n)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-extrabold text-xs transition-all duration-200 mt-2 cursor-pointer ${
                      isSelectedA
                        ? 'bg-[#12A1A4] text-white ring-4 ring-teal-200 shadow-md scale-110'
                        : isSelectedB
                        ? 'bg-[#EE751C] text-white ring-4 ring-orange-200 shadow-md scale-110'
                        : isZero
                        ? 'bg-[#1C3257] text-white ring-2 ring-slate-300 font-black'
                        : isNeg
                        ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                        : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200'
                    }`}
                  >
                    {n > 0 ? `+${n}` : n}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* COMPARISON RESULT & DEDUCTION CARD */}
      <div className="bg-gradient-to-br from-slate-50 to-teal-50/40 p-6 rounded-2xl border border-teal-200/80 text-left">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#12A1A4]">
            Conclusión Matemática Inmediata
          </span>
          <span className="text-sm font-extrabold px-3 py-1 rounded-xl bg-white border border-teal-200 text-[#1C3257] shadow-xs">
            {isEqual
              ? `${selectedA} = ${selectedB} (Son el mismo punto)`
              : isAGreater
              ? `${selectedA > 0 ? `+${selectedA}` : selectedA} > ${selectedB > 0 ? `+${selectedB}` : selectedB}`
              : `${selectedB > 0 ? `+${selectedB}` : selectedB} > ${selectedA > 0 ? `+${selectedA}` : selectedA}`}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#1C3257] leading-relaxed">
          {isEqual ? (
            'Ambos puntos están ubicados en la misma coordenada.'
          ) : isAGreater ? (
            <>
              El número <strong>{selectedA > 0 ? `+${selectedA}` : selectedA}</strong> está ubicado a la <strong>derecha</strong> de <strong>{selectedB > 0 ? `+${selectedB}` : selectedB}</strong>. Por la regla universal de la recta numérica, <strong>todo número a la derecha es estrictamente mayor</strong>.
            </>
          ) : (
            <>
              El número <strong>{selectedB > 0 ? `+${selectedB}` : selectedB}</strong> está ubicado a la <strong>derecha</strong> de <strong>{selectedA > 0 ? `+${selectedA}` : selectedA}</strong>. Por lo tanto, <strong>{selectedB > 0 ? `+${selectedB}` : selectedB} es mayor que {selectedA > 0 ? `+${selectedA}` : selectedA}</strong>.
            </>
          )}
        </p>
      </div>
    </div>
  );
};
