import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  X,
  Save,
  Tag,
  Calendar
} from 'lucide-react';
import { GaleriaItem } from '../../../types/cmsExtras';
import { loadGaleria, saveGaleria } from '../../../data/initialCmsExtrasData';
import { CloudinaryImageUploader } from '../../common/CloudinaryImageUploader';

export const GaleriaView: React.FC = () => {
  const [items, setItems] = useState<GaleriaItem[]>(() => loadGaleria());
  const [editingItem, setEditingItem] = useState<GaleriaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState<GaleriaItem['categoria']>('Cuadernos de Estudiantes');
  const [imagenUrl, setImagenUrl] = useState('');
  const [activo, setActivo] = useState(true);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setTitulo('');
    setDescripcion('');
    setCategoria('Cuadernos de Estudiantes');
    setImagenUrl('/images/cuaderno_demo.webp');
    setActivo(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GaleriaItem) => {
    setEditingItem(item);
    setTitulo(item.titulo);
    setDescripcion(item.descripcion);
    setCategoria(item.categoria);
    setImagenUrl(item.imagenUrl);
    setActivo(item.activo);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !imagenUrl.trim()) return;

    let updated: GaleriaItem[];
    if (editingItem) {
      updated = items.map((i) =>
        i.id === editingItem.id
          ? { ...i, titulo, descripcion, categoria, imagenUrl, activo }
          : i
      );
    } else {
      const newItem: GaleriaItem = {
        id: `gal-${Date.now()}`,
        titulo,
        descripcion,
        categoria,
        imagenUrl,
        fecha: new Date().toISOString().split('T')[0],
        activo
      };
      updated = [newItem, ...items];
    }

    setItems(updated);
    saveGaleria(updated);
    window.dispatchEvent(new Event('storage'));
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    const updated = items.map((i) => (i.id === id ? { ...i, activo: !i.activo } : i));
    setItems(updated);
    saveGaleria(updated);
    window.dispatchEvent(new Event('storage'));
  };

  const handleDelete = (id: string) => {
    if (!confirm('¿Deseas eliminar esta imagen de la galería?')) return;
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    saveGaleria(updated);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-[#12A1A4]" />
            <span>Galería Multimedia · Cuadernos e Infografías</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Repositorio visual de cuadernos modelo de estudiantes, cómics didácticos y esquemas para la web.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs font-extrabold shadow-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Imagen</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border bg-white shadow-sm overflow-hidden flex flex-col justify-between transition-all hover:shadow-md ${
              item.activo ? 'border-slate-200/90' : 'border-slate-200 opacity-60 bg-slate-50'
            }`}
          >
            {/* Imagen o Preview */}
            <div className="h-44 bg-slate-100 flex items-center justify-center relative overflow-hidden border-b border-slate-100">
              {item.imagenUrl ? (
                <img
                  src={item.imagenUrl}
                  alt={item.titulo}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="text-center p-4">
                  <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <span className="text-[11px] font-mono text-slate-400 block truncate max-w-[220px]">
                    Sin imagen
                  </span>
                </div>
              )}
              <span className="absolute top-3 left-3 text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-sm">
                {item.categoria}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-slate-800 leading-snug mb-1.5">
                  {item.titulo}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                  {item.descripcion}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] font-mono">{item.fecha}</span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(item.id)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                      item.activo ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {item.activo ? 'Visible' : 'Oculta'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg text-[#12A1A4] hover:bg-teal-50 transition-colors"
                    title="Editar datos de imagen"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Eliminar imagen"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Crear / Editar Imagen */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-base font-extrabold text-slate-800">
                {editingItem ? 'Editar Imagen' : 'Nueva Imagen para Galería'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Título de la Imagen
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                  placeholder="Ej: Cuaderno de estudiante - Clase 1"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Categoría
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
                >
                  <option value="Cuadernos de Estudiantes">Cuadernos de Estudiantes</option>
                  <option value="Infografías del Método">Infografías del Método</option>
                  <option value="Material Didáctico">Material Didáctico</option>
                  <option value="Eventos">Eventos</option>
                </select>
              </div>

              <div>
                <CloudinaryImageUploader
                  label="Fotografía o Archivo Multimedia"
                  recommendedDimensions="1200 x 800 px (3:2) o 800 x 600 px (4:3)"
                  value={imagenUrl}
                  onChange={setImagenUrl}
                  folder="estudiosimple/galeria"
                  helperText="Fotografía del cuaderno del alumno, infografía o material didáctico."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Descripción
                </label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-700"
                  placeholder="Explicación del ejercicio o contexto del material"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="galeriaActivaCheck"
                  checked={activo}
                  onChange={(e) => setActivo(e.target.checked)}
                  className="w-4 h-4 text-[#12A1A4] rounded"
                />
                <label htmlFor="galeriaActivaCheck" className="text-xs font-bold text-slate-700">
                  Visible en la galería pública
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs font-extrabold shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar Imagen</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
