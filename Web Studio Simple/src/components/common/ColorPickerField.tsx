import React from 'react';
import { Pipette, Check } from 'lucide-react';

export interface ColorPreset {
  hex: string;
  name: string;
}

export const ESTUDIO_SIMPLE_PALETTE: ColorPreset[] = [
  { hex: '#12A1A4', name: 'Turquesa Mineduc' },
  { hex: '#F8AD22', name: 'Amarillo Sol Oficial' },
  { hex: '#EE751C', name: 'Naranja Estudio' },
  { hex: '#0B254D', name: 'Azul Marino Institucional' },
  { hex: '#123A72', name: 'Azul Estudio Cabecera' },
  { hex: '#0F172A', name: 'Pizarra Oscura' },
  { hex: '#1E293B', name: 'Grafito Profundo' },
  { hex: '#EF4444', name: 'Rojo Alerta' },
  { hex: '#10B981', name: 'Verde Aprobado' },
  { hex: '#FFFFFF', name: 'Blanco Puro' },
  { hex: '#E2E8F0', name: 'Blanco Suave' },
];

interface ColorPickerFieldProps {
  label: string;
  value: string;
  onChange: (hex: string) => void;
  helperText?: string;
  presets?: ColorPreset[];
}

export const ColorPickerField: React.FC<ColorPickerFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  presets = ESTUDIO_SIMPLE_PALETTE
}) => {
  const currentColor = (value || '#12A1A4').toUpperCase();

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.trim();
    if (!raw.startsWith('#')) {
      raw = `#${raw}`;
    }
    onChange(raw);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
        <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
          {currentColor}
        </span>
      </div>

      {/* Swatches de la Paleta Oficial */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200">
        {presets.map((preset) => {
          const isSelected = currentColor.toLowerCase() === preset.hex.toLowerCase();
          const isLight = ['#ffffff', '#e2e8f0', '#f8ad22', '#f0f4f8'].includes(preset.hex.toLowerCase());

          return (
            <button
              key={preset.hex}
              type="button"
              onClick={() => onChange(preset.hex)}
              title={`${preset.name} (${preset.hex})`}
              className={`w-7 h-7 rounded-lg transition-all transform flex items-center justify-center relative cursor-pointer border ${
                isSelected
                  ? 'ring-2 ring-offset-1 ring-[#12A1A4] scale-110 shadow-md border-black/30'
                  : 'hover:scale-105 border-black/15 shadow-xs'
              }`}
              style={{ backgroundColor: preset.hex }}
            >
              {isSelected && (
                <Check
                  className={`w-3.5 h-3.5 stroke-[3] ${isLight ? 'text-slate-900' : 'text-white'}`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Entrada Hexadecimal y Selector Universal del Sistema */}
      <div className="flex items-center gap-2">
        {/* Selector de color nativo con barra de espectro cromático */}
        <div className="relative flex items-center">
          <label
            htmlFor={`native-picker-${label.replace(/\s+/g, '-')}`}
            className="w-9 h-9 rounded-xl border border-slate-300 flex items-center justify-center cursor-pointer shadow-xs hover:border-[#12A1A4] transition-colors relative overflow-hidden"
            style={{ backgroundColor: currentColor }}
            title="Abrir selector de color espectral"
          >
            <span className="sr-only">Elegir color</span>
            <div className="absolute inset-0 bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors">
              <Pipette className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
            </div>
          </label>
          <input
            id={`native-picker-${label.replace(/\s+/g, '-')}`}
            type="color"
            value={currentColor.startsWith('#') && currentColor.length === 7 ? currentColor : '#12A1A4'}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            className="opacity-0 absolute w-0 h-0 pointer-events-none"
          />
        </div>

        {/* Input de texto para código HEX */}
        <div className="relative flex-1">
          <input
            type="text"
            value={currentColor}
            onChange={handleHexChange}
            placeholder="#12A1A4"
            maxLength={7}
            className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-800 focus:outline-hidden focus:border-[#12A1A4] focus:ring-1 focus:ring-[#12A1A4]"
          />
        </div>
      </div>

      {helperText && (
        <p className="text-[11px] text-slate-400 font-medium">
          {helperText}
        </p>
      )}
    </div>
  );
};
