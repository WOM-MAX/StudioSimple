import React, { useState } from 'react';
import {
  Newspaper,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  X,
  Save,
  BookOpen,
  Calendar,
  User,
  Star
} from 'lucide-react';
import { JournalArticle } from '../../../types/cmsExtras';
import { loadJournalArticles, saveJournalArticles } from '../../../data/initialCmsExtrasData';
import { CloudinaryImageUploader } from '../../common/CloudinaryImageUploader';

export const JournalView: React.FC = () => {
  const [articles, setArticles] = useState<JournalArticle[]>(() => loadJournalArticles());
  const [editingArticle, setEditingArticle] = useState<JournalArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields
  const [titulo, setTitulo] = useState('');
  const [extracto, setExtracto] = useState('');
  const [contenido, setContenido] = useState('');
  const [categoria, setCategoria] = useState<JournalArticle['categoria']>('MINEDUC');
  const [autor, setAutor] = useState('Equipo Pedagógico EstudioSimple');
  const [imagenPortadaUrl, setImagenPortadaUrl] = useState('');
  const [activo, setActivo] = useState(true);
  const [destacado, setDestacado] = useState(false);

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setTitulo('');
    setExtracto('');
    setContenido('');
    setCategoria('MINEDUC');
    setAutor('Equipo Pedagógico EstudioSimple');
    setImagenPortadaUrl('');
    setActivo(true);
    setDestacado(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (art: JournalArticle) => {
    setEditingArticle(art);
    setTitulo(art.titulo);
    setExtracto(art.extracto);
    setContenido(art.contenido);
    setCategoria(art.categoria);
    setAutor(art.autor);
    setImagenPortadaUrl(art.imagenPortadaUrl || '');
    setActivo(art.activo);
    setDestacado(art.destacado);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    const slug = titulo
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, '-')
      .replace(/[^\w-]/g, '');

    let updated: JournalArticle[];
    if (editingArticle) {
      updated = articles.map((a) =>
        a.id === editingArticle.id
          ? {
              ...a,
              titulo,
              slug,
              extracto,
              contenido,
              categoria,
              autor,
              imagenPortadaUrl: imagenPortadaUrl || '/images/journal-default.webp',
              activo,
              destacado
            }
          : a
      );
    } else {
      const newArticle: JournalArticle = {
        id: `art-${Date.now()}`,
        titulo,
        slug,
        extracto,
        contenido,
        categoria,
        autor,
        fecha: new Date().toISOString().split('T')[0],
        imagenPortadaUrl: imagenPortadaUrl || '/images/journal-default.webp',
        activo,
        destacado
      };
      updated = [newArticle, ...articles];
    }

    setArticles(updated);
    saveJournalArticles(updated);
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    const updated = articles.map((a) => (a.id === id ? { ...a, activo: !a.activo } : a));
    setArticles(updated);
    saveJournalArticles(updated);
  };

  const handleDelete = (id: string) => {
    if (!confirm('¿Deseas eliminar este artículo permanentemente?')) return;
    const updated = articles.filter((a) => a.id !== id);
    setArticles(updated);
    saveJournalArticles(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-[#12A1A4]" />
            <span>Journal · Artículos y Guías Educativas</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Publica contenido de orientación pedagógica, novedades de exámenes libres y guías para padres homeschoolers.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs font-extrabold shadow-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Artículo</span>
        </button>
      </div>

      {/* Grilla de Artículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((art) => (
          <div
            key={art.id}
            className={`rounded-2xl border p-5 bg-white shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${
              art.activo ? 'border-slate-200/90' : 'border-slate-200 opacity-60 bg-slate-50'
            }`}
          >
            <div className="flex flex-col flex-1">
              {art.imagenPortadaUrl && (
                <div className="h-32 -mx-5 -mt-5 mb-3.5 rounded-t-2xl overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={art.imagenPortadaUrl}
                    alt={art.titulo}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-teal-50 text-[#12A1A4] border border-teal-100">
                  {art.categoria}
                </span>
                <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {art.fecha}
                </span>
              </div>

              <h2 className="text-sm font-extrabold text-slate-800 leading-snug mb-2 line-clamp-2">
                {art.titulo}
              </h2>

              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                {art.extracto}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px] truncate max-w-[120px]">{art.autor}</span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(art.id)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                    art.activo ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {art.activo ? 'Publicado' : 'Borrador'}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(art)}
                  className="p-1.5 rounded-lg text-[#12A1A4] hover:bg-teal-50 transition-colors"
                  title="Editar artículo"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(art.id)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Eliminar artículo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Crear / Editar Artículo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-base font-extrabold text-slate-800">
                {editingArticle ? 'Editar Artículo' : 'Nuevo Artículo del Journal'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Título del Artículo
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                  placeholder="Ej: Guía de inscripción para exámenes libres"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Categoría
                  </label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
                  >
                    <option value="MINEDUC">MINEDUC</option>
                    <option value="Homeschooling">Homeschooling</option>
                    <option value="Cuaderno y Método">Cuaderno y Método</option>
                    <option value="Neurodiversidad">Neurodiversidad</option>
                    <option value="Orientación">Orientación</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Autor
                  </label>
                  <input
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-700"
                  />
                </div>
              </div>

              <div>
                <CloudinaryImageUploader
                  label="Imagen de Portada del Artículo"
                  recommendedDimensions="1200 x 750 px (16:10) o 1200 x 675 px (16:9 Panorámico Editorial)"
                  value={imagenPortadaUrl}
                  onChange={setImagenPortadaUrl}
                  folder="estudiosimple/journal"
                  helperText="Fotografía o esquema de cabecera que se exhibirá en la tarjeta y en la lectura del artículo."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Extracto / Bajada Resumida
                </label>
                <textarea
                  value={extracto}
                  onChange={(e) => setExtracto(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-700"
                  placeholder="Breve resumen visible en las tarjetas de previsualización"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Contenido Completo
                </label>
                <textarea
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  rows={6}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-700 leading-relaxed font-mono"
                  placeholder="Cuerpo redactado del artículo..."
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activo}
                    onChange={(e) => setActivo(e.target.checked)}
                    className="w-4 h-4 text-[#12A1A4] rounded"
                  />
                  <span>Publicar en la web inmediatamente</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={destacado}
                    onChange={(e) => setDestacado(e.target.checked)}
                    className="w-4 h-4 text-[#12A1A4] rounded"
                  />
                  <span>Destacar en portada</span>
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
                  <span>Guardar Artículo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
