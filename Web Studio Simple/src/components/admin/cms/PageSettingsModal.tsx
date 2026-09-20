import React, { useState, useEffect } from 'react';
import { X, Save, Globe, Settings, Eye, Check, Palette } from 'lucide-react';
import { CmsPage } from '../../../types/cms';
import { ColorPickerField } from '../../common/ColorPickerField';

interface PageSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  page: CmsPage;
  onSave: (updatedPage: CmsPage) => void;
}

export const PageSettingsModal: React.FC<PageSettingsModalProps> = ({
  isOpen,
  onClose,
  page,
  onSave
}) => {
  const [titulo, setTitulo] = useState(page.titulo);
  const [slug, setSlug] = useState(page.slug);
  const [activo, setActivo] = useState(page.activo);
  const [mostrarEnMenu, setMostrarEnMenu] = useState(page.mostrarEnMenu);
  const [ordenMenu, setOrdenMenu] = useState<number>(page.ordenMenu ?? 1);
  const [seoTitle, setSeoTitle] = useState(page.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(page.seoDescription || '');
  const [colorFondo, setColorFondo] = useState(page.colorFondo || '');
  const [colorTexto, setColorTexto] = useState(page.colorTexto || '');

  useEffect(() => {
    setTitulo(page.titulo);
    setSlug(page.slug);
    setActivo(page.activo);
    setMostrarEnMenu(page.mostrarEnMenu);
    setOrdenMenu(page.ordenMenu ?? 1);
    setSeoTitle(page.seoTitle || '');
    setSeoDescription(page.seoDescription || '');
    setColorFondo(page.colorFondo || '');
    setColorTexto(page.colorTexto || '');
  }, [page, isOpen]);

  if (!isOpen) return null;

  const handleSlugChange = (val: string) => {
    let clean = val.trim().toLowerCase();
    if (!clean.startsWith('/')) {
      clean = '/' + clean;
    }
    setSlug(clean.replace(/\s+/g, '-').replace(/[^a-z0-9\/-]/g, ''));
  };

  const handleTitleChange = (val: string) => {
    setTitulo(val);
    // Solo sugerir nuevo slug si el campo de slug fue dejado completamente vacío
    if (page.slug !== '/' && slug.trim() === '') {
      const generated = '/' + val.toLowerCase().trim().replace(/[\s_]+/g, '-').replace(/[^\w-]/g, '');
      setSlug(generated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    let finalSlug = slug.trim();
    if (!finalSlug.startsWith('/')) {
      finalSlug = '/' + finalSlug;
    }

    const updated: CmsPage = {
      ...page,
      titulo: titulo.trim(),
      slug: finalSlug,
      activo,
      mostrarEnMenu,
      ordenMenu: Number(ordenMenu) || 1,
      colorFondo: colorFondo.trim() || undefined,
      colorTexto: colorTexto.trim() || undefined,
      seoTitle: seoTitle.trim() || `${titulo.trim()} · EstudioSimple`,
      seoDescription: seoDescription.trim(),
      ultimaModificacion: new Date().toISOString().split('T')[0]
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header del Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#12A1A4]/15 text-[#12A1A4] flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-800">
                Configuración de Página
              </h2>
              <p className="text-xs text-slate-500">
                Modifica el nombre, URL y opciones de publicación
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Nombre / Título */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Título de la Página *
            </label>
            <input
              type="text"
              required
              value={titulo}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ej: Blog de Noticias, Orientación Homeschooling..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#12A1A4]/30 focus:border-[#12A1A4]"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Nombre visible en la barra de navegación y encabezados.
            </p>
          </div>

          {/* Slug / URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              URL / Slug de Acceso *
            </label>
            <div className="flex items-center rounded-xl border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#12A1A4]/30 focus-within:border-[#12A1A4]">
              <span className="bg-slate-100 px-3 py-2.5 text-xs text-slate-500 font-mono select-none">
                estudiosimple.cl
              </span>
              <input
                type="text"
                required
                disabled={page.slug === '/'}
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="/blog"
                className="w-full px-3 py-2.5 text-sm font-mono font-semibold text-slate-800 bg-white focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
              />
            </div>
            {page.slug === '/' ? (
              <p className="text-[11px] text-amber-600 mt-1 font-medium">
                La página raíz de inicio (/) no puede modificar su slug de acceso.
              </p>
            ) : (
              <p className="text-[11px] text-slate-400 mt-1">
                Ruta única para acceder a esta página en el navegador.
              </p>
            )}
          </div>

          {/* Switches de Visibilidad */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Estado Publicada / Borrador */}
            <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-800">
                  Estado de Publicación
                </span>
                <span className="text-[11px] text-slate-500">
                  {activo ? 'Página visible al público' : 'Modo borrador (oculta)'}
                </span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={activo}
                  onChange={(e) => setActivo(e.target.checked)}
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#12A1A4] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
              </label>
            </div>

            {/* Mostrar en Menú */}
            <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-800">
                  Mostrar en Menú
                </span>
                <span className="text-[11px] text-slate-500">
                  {mostrarEnMenu ? 'Visible en cabecera' : 'Oculta en la barra'}
                </span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={mostrarEnMenu}
                  onChange={(e) => setMostrarEnMenu(e.target.checked)}
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#12A1A4] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
              </label>
            </div>
          </div>

          {/* Posición en el Menú */}
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label htmlFor="ordenMenuInput" className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Posición en la Barra de Menú
                </label>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Orden de izquierda a derecha en la navegación superior (1 = primer enlace).
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">#</span>
                <input
                  id="ordenMenuInput"
                  type="number"
                  min={1}
                  max={99}
                  value={ordenMenu}
                  onChange={(e) => setOrdenMenu(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 px-3 py-1.5 rounded-xl border border-slate-300 text-sm font-black text-center text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#12A1A4]/30 focus:border-[#12A1A4]"
                />
              </div>
            </div>
          </div>

          {/* Color de Fondo y Estilo Visual de la Página */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#12A1A4]" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Color de Fondo de la Página
              </span>
            </div>

            <ColorPickerField
              label="Tono de Fondo de la Página"
              value={colorFondo || '#FFFFFF'}
              onChange={(hex) => setColorFondo(hex)}
              helperText="Elige el fondo para esta página (ej: blanco #FFFFFF para blog o gris claro #F8FAFC)."
            />

            <div className="pt-2">
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Tono Base del Texto
              </label>
              <select
                value={colorTexto || 'dark'}
                onChange={(e) => setColorTexto(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="dark">Texto Oscuro (Recomendado para fondo blanco o gris claro)</option>
                <option value="light">Texto Claro (Para fondos oscuros como azul noche o negro)</option>
              </select>
            </div>
          </div>

          {/* Sección SEO */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-[#12A1A4]" />
              <span>Metadatos SEO (Buscadores)</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Título SEO (Meta Title)
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder={`${titulo} · EstudioSimple`}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#12A1A4]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Descripción SEO (Meta Description)
              </label>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                rows={2}
                placeholder="Descripción para resultados en Google y redes sociales..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-700 focus:outline-none focus:border-[#12A1A4]"
              />
            </div>
          </div>

          {/* Footer de Acciones */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-extrabold bg-[#12A1A4] hover:bg-[#0e8284] text-white rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
