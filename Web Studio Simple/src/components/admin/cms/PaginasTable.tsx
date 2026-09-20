import React, { useState } from 'react';
import {
  FileText,
  Plus,
  LayoutTemplate,
  Trash2,
  Globe,
  Check,
  X,
  Sparkles,
  Edit3,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { CmsPage } from '../../../types/cms';
import { reorderCmsPages } from '../../../data/initialCmsData';
import { PageSettingsModal } from './PageSettingsModal';

interface PaginasTableProps {
  paginas: CmsPage[];
  onSelectPage: (pagina: CmsPage) => void;
  onToggleStatus: (id: string) => void;
  onToggleMenu: (id: string) => void;
  onCreatePage: (titulo: string, slug: string, mostrarEnMenu: boolean) => void;
  onDeletePage: (id: string) => void;
  onSavePage?: (updatedPage: CmsPage) => void;
  onReorderPages?: (updatedPages: CmsPage[]) => void;
}

export const PaginasTable: React.FC<PaginasTableProps> = ({
  paginas,
  onSelectPage,
  onToggleStatus,
  onToggleMenu,
  onCreatePage,
  onDeletePage,
  onSavePage,
  onReorderPages
}) => {
  const [editingPageSettings, setEditingPageSettings] = useState<CmsPage | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newShowInMenu, setNewShowInMenu] = useState(true);

  const handleMovePage = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= paginas.length) return;

    const newPages = [...paginas];
    const temp = newPages[index];
    newPages[index] = newPages[targetIndex];
    newPages[targetIndex] = temp;

    const updated = reorderCmsPages(newPages);
    if (onReorderPages) {
      onReorderPages(updated);
    }
  };

  const handleTitleChange = (val: string) => {
    setNewTitle(val);
    if (!newSlug || newSlug.startsWith('/')) {
      const generated = '/' + val.toLowerCase().trim().replace(/[\s_]+/g, '-').replace(/[^\w-]/g, '');
      setNewSlug(generated);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSlug.trim()) return;
    onCreatePage(newTitle, newSlug, newShowInMenu);
    setNewTitle('');
    setNewSlug('');
    setNewShowInMenu(true);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header con botón de creación */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Páginas del Sitio Web
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Administra la estructura de URLs públicas, añade nuevas páginas y edita sus bloques de contenido.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#12A1A4] hover:bg-[#0e8284] text-white shadow-md flex items-center gap-2 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Página</span>
        </button>
      </div>

      {/* Tabla de Páginas estilo Colegio Acrópolis */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-100 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Página / URL</th>
                <th className="px-6 py-4 text-center w-36">Interruptor Maestro</th>
                <th className="px-6 py-4 text-center w-36">Mostrar en Menú</th>
                <th className="px-4 py-4 text-center w-28">Orden Menú</th>
                <th className="px-6 py-4 text-center w-32">Bloques</th>
                <th className="px-6 py-4 text-center w-40">Constructor</th>
                <th className="px-4 py-4 text-center w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginas.map((pagina, index) => (
                <tr key={pagina.id} className="transition-colors hover:bg-slate-50/50">
                  {/* Columna Página / URL */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#12A1A4] border border-teal-100 shadow-sm">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-800 text-sm">{pagina.titulo}</p>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{pagina.slug}</p>
                      </div>
                    </div>
                  </td>

                  {/* Interruptor Maestro Activo/Inactivo */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={pagina.activo}
                          onChange={() => onToggleStatus(pagina.id)}
                        />
                        <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#12A1A4] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                      </label>
                    </div>
                  </td>

                  {/* Mostrar en Menú */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => onToggleMenu(pagina.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                          pagina.mostrarEnMenu
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}
                      >
                        {pagina.mostrarEnMenu ? 'Visible en Menú' : 'Oculta'}
                      </button>
                    </div>
                  </td>

                  {/* Orden en Menú con Flechas de Subir / Bajar */}
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-slate-100 text-slate-700 text-xs font-black border border-slate-200 shadow-2xs"
                        title={`Posición #${pagina.ordenMenu || index + 1} en el menú`}
                      >
                        {pagina.ordenMenu || index + 1}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMovePage(index, 'up')}
                          className="p-1 rounded-md hover:bg-[#12A1A4]/15 hover:text-[#12A1A4] text-slate-500 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-slate-500 disabled:cursor-not-allowed transition-all cursor-pointer"
                          title="Mover arriba (a la izquierda en el menú)"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={index === paginas.length - 1}
                          onClick={() => handleMovePage(index, 'down')}
                          className="p-1 rounded-md hover:bg-[#12A1A4]/15 hover:text-[#12A1A4] text-slate-500 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-slate-500 disabled:cursor-not-allowed transition-all cursor-pointer"
                          title="Mover abajo (a la derecha en el menú)"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Cantidad de Bloques */}
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                      {pagina.secciones.length} secciones
                    </span>
                  </td>

                  {/* Botón Constructor y Edición */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectPage(pagina)}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] px-3.5 py-2 text-xs font-extrabold text-white shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
                        title="Abrir editor de bloques"
                      >
                        <LayoutTemplate className="w-3.5 h-3.5" />
                        <span>Constructor</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingPageSettings(pagina)}
                        className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-[#12A1A4] hover:bg-teal-50 transition-colors cursor-pointer"
                        title="Cambiar nombre, URL y configuración"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Eliminar página (protegiendo la de inicio) */}
                  <td className="px-4 py-4 text-center">
                    {pagina.slug !== '/' && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`¿Deseas eliminar permanentemente la página "${pagina.titulo}"?`)) {
                            onDeletePage(pagina.id);
                          }
                        }}
                        className="text-slate-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        title="Eliminar página"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para Crear Nueva Página */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-base font-extrabold text-slate-800">
                Crear Nueva Página Web
              </h2>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Título de la Página
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#12A1A4]/30 focus:border-[#12A1A4]"
                  placeholder="Ej: Metodología Homeschool"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Slug / URL de Acceso
                </label>
                <input
                  type="text"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#12A1A4]/30 focus:border-[#12A1A4]"
                  placeholder="Ej: /metodologia"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="showInMenuCheck"
                  checked={newShowInMenu}
                  onChange={(e) => setNewShowInMenu(e.target.checked)}
                  className="w-4 h-4 rounded text-[#12A1A4] focus:ring-[#12A1A4]"
                />
                <label htmlFor="showInMenuCheck" className="text-xs font-semibold text-slate-700">
                  Incluir en el menú de navegación principal
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-extrabold text-white bg-[#12A1A4] hover:bg-[#0e8284] shadow-md flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Crear Página</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Configuración y Renombrado de Página */}
      {editingPageSettings && (
        <PageSettingsModal
          isOpen={true}
          onClose={() => setEditingPageSettings(null)}
          page={editingPageSettings}
          onSave={(updatedPage) => {
            if (onSavePage) {
              onSavePage(updatedPage);
            }
            setEditingPageSettings(null);
          }}
        />
      )}
    </div>
  );
};
