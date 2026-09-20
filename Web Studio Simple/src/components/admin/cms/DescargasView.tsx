import React, { useState } from 'react';
import {
  FileDown,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  X,
  Save,
  FileText,
  Download,
  FolderOpen
} from 'lucide-react';
import { DescargaResource } from '../../../types/cmsExtras';
import { loadDescargas, saveDescargas } from '../../../data/initialCmsExtrasData';

export const DescargasView: React.FC = () => {
  const [resources, setResources] = useState<DescargaResource[]>(() => loadDescargas());
  const [editingResource, setEditingResource] = useState<DescargaResource | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState<DescargaResource['categoria']>('Plantillas de Cuaderno');
  const [archivoUrl, setArchivoUrl] = useState('');
  const [formato, setFormato] = useState<DescargaResource['formato']>('PDF');
  const [tamanoMb, setTamanoMb] = useState(1.2);
  const [activo, setActivo] = useState(true);

  const handleOpenCreate = () => {
    setEditingResource(null);
    setTitulo('');
    setDescripcion('');
    setCategoria('Plantillas de Cuaderno');
    setArchivoUrl('/recursos/Plantilla_Nueva.pdf');
    setFormato('PDF');
    setTamanoMb(1.2);
    setActivo(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (res: DescargaResource) => {
    setEditingResource(res);
    setTitulo(res.titulo);
    setDescripcion(res.descripcion);
    setCategoria(res.categoria);
    setArchivoUrl(res.archivoUrl);
    setFormato(res.formato);
    setTamanoMb(res.tamanoMb);
    setActivo(res.activo);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    let updated: DescargaResource[];
    if (editingResource) {
      updated = resources.map((r) =>
        r.id === editingResource.id
          ? {
              ...r,
              titulo,
              descripcion,
              categoria,
              archivoUrl,
              formato,
              tamanoMb,
              activo
            }
          : r
      );
    } else {
      const newRes: DescargaResource = {
        id: `desc-${Date.now()}`,
        titulo,
        descripcion,
        categoria,
        archivoUrl,
        formato,
        tamanoMb,
        descargasCount: 0,
        activo
      };
      updated = [newRes, ...resources];
    }

    setResources(updated);
    saveDescargas(updated);
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    const updated = resources.map((r) => (r.id === id ? { ...r, activo: !r.activo } : r));
    setResources(updated);
    saveDescargas(updated);
  };

  const handleDelete = (id: string) => {
    if (!confirm('¿Deseas eliminar este recurso descargable?')) return;
    const updated = resources.filter((r) => r.id !== id);
    setResources(updated);
    saveDescargas(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <FileDown className="w-6 h-6 text-[#12A1A4]" />
            <span>Descargas · Recursos Gratuitos y Plantillas</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Administra las plantillas para cuaderno físico, temarios oficiales y decretos normativos para las familias.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs font-extrabold shadow-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Recurso</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {resources.map((res) => (
          <div
            key={res.id}
            className={`rounded-2xl border p-5 bg-white shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${
              res.activo ? 'border-slate-200/90' : 'border-slate-200 opacity-60 bg-slate-50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-teal-50 text-[#12A1A4] border border-teal-100">
                  {res.categoria}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {res.formato} · {res.tamanoMb} MB
                </span>
              </div>

              <h2 className="text-sm font-extrabold text-slate-800 leading-snug mb-1.5 line-clamp-2">
                {res.titulo}
              </h2>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                {res.descripcion}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                <Download className="w-3 h-3 text-[#12A1A4]" />
                {res.descargasCount} descargas
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(res.id)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                    res.activo ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {res.activo ? 'Habilitado' : 'Pausado'}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(res)}
                  className="p-1.5 rounded-lg text-[#12A1A4] hover:bg-teal-50 transition-colors"
                  title="Editar recurso"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(res.id)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Eliminar recurso"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Crear / Editar Recurso */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-base font-extrabold text-slate-800">
                {editingResource ? 'Editar Recurso Descargable' : 'Nuevo Recurso Descargable'}
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
                  Título del Recurso
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                  placeholder="Ej: Plantilla de Cuaderno para Matemática"
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
                    <option value="Plantillas de Cuaderno">Plantillas de Cuaderno</option>
                    <option value="Temarios Oficiales PDF">Temarios Oficiales PDF</option>
                    <option value="Normativa y Decretos">Normativa y Decretos</option>
                    <option value="Guías Imprimibles">Guías Imprimibles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Formato
                  </label>
                  <select
                    value={formato}
                    onChange={(e) => setFormato(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
                  >
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="ZIP">ZIP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  URL / Ruta del Archivo
                </label>
                <input
                  type="text"
                  value={archivoUrl}
                  onChange={(e) => setArchivoUrl(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-800"
                  placeholder="/recursos/archivo.pdf"
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
                  placeholder="Detalle o instrucciones de uso del documento"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="descargaActivaCheck"
                  checked={activo}
                  onChange={(e) => setActivo(e.target.checked)}
                  className="w-4 h-4 text-[#12A1A4] rounded"
                />
                <label htmlFor="descargaActivaCheck" className="text-xs font-bold text-slate-700">
                  Habilitar descarga en la web pública
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
                  <span>Guardar Recurso</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
