import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  Plus,
  Settings,
  Globe,
  Save,
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';
import { CmsPage, CmsSection, CmsBlockType } from '../../../types/cms';
import { loadSiteConfig, saveSiteConfig } from '../../../data/initialCmsExtrasData';
import { BlockFormModal } from './BlockFormModal';
import { PageSettingsModal } from './PageSettingsModal';

interface PageEditorProps {
  page: CmsPage;
  onBack: () => void;
  onSavePage: (updatedPage: CmsPage) => void;
}

export const PageEditor: React.FC<PageEditorProps> = ({ page, onBack, onSavePage }) => {
  const [currentPage, setCurrentPage] = useState<CmsPage>(page);
  const [editingSection, setEditingSection] = useState<CmsSection | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  const notifyChange = (updated: CmsPage, message: string) => {
    setCurrentPage(updated);
    onSavePage(updated);
    setSaveSuccessMessage(message);
    setTimeout(() => setSaveSuccessMessage(null), 2500);
  };

  const handleTogglePageStatus = () => {
    const updated: CmsPage = {
      ...currentPage,
      activo: !currentPage.activo
    };
    notifyChange(updated, updated.activo ? 'Página activada y publicada.' : 'Página pausada a modo borrador.');
  };

  const handleSavePageSettings = (updatedPage: CmsPage) => {
    notifyChange(updatedPage, 'Configuración y nombre de página actualizados.');
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const list = [...currentPage.secciones];
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === list.length - 1) return;

    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = list[index];
    list[index] = list[swapIndex];
    list[swapIndex] = temp;

    const reordered = list.map((sec, i) => ({ ...sec, orden: i }));
    const updated: CmsPage = { ...currentPage, secciones: reordered };
    notifyChange(updated, 'Orden de secciones actualizado.');
  };

  const toggleSectionActive = (sectionId: string) => {
    let newCintaState: boolean | undefined;
    const updatedSections = currentPage.secciones.map((sec) => {
      if (sec.id === sectionId) {
        const nextState = !sec.activo;
        if (sec.tipoBloque === 'CINTA_NOTICIAS') {
          newCintaState = nextState;
        }
        return { ...sec, activo: nextState };
      }
      return sec;
    });

    if (newCintaState !== undefined) {
      try {
        const siteConfig = loadSiteConfig();
        saveSiteConfig({
          ...siteConfig,
          cintaNoticias: {
            ...(siteConfig.cintaNoticias || {}),
            activo: newCintaState
          }
        });
        window.dispatchEvent(new Event('storage'));
      } catch (err) {
        console.error('Error sincronizando siteConfig desde PageEditor:', err);
      }
    }

    const updated: CmsPage = { ...currentPage, secciones: updatedSections };
    notifyChange(updated, 'Visibilidad del bloque actualizada.');
  };

  const handleDeleteSection = (sectionId: string) => {
    if (!confirm('¿Deseas eliminar esta sección de la página?')) return;
    const filtered = currentPage.secciones
      .filter((sec) => sec.id !== sectionId)
      .map((sec, i) => ({ ...sec, orden: i }));
    const updated: CmsPage = { ...currentPage, secciones: filtered };
    notifyChange(updated, 'Sección eliminada.');
  };

  const handleOpenEdit = (section: CmsSection) => {
    setEditingSection(section);
    setIsModalOpen(true);
  };

  const handleSaveSection = (savedSection: CmsSection) => {
    let updatedSections: CmsSection[];
    const exists = currentPage.secciones.some((s) => s.id === savedSection.id);
    if (exists) {
      updatedSections = currentPage.secciones.map((s) =>
        s.id === savedSection.id ? savedSection : s
      );
    } else {
      updatedSections = [...currentPage.secciones, savedSection];
    }
    const updated: CmsPage = { ...currentPage, secciones: updatedSections };
    notifyChange(updated, `Bloque "${savedSection.titulo}" guardado exitosamente.`);
    setIsModalOpen(false);
    setEditingSection(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP BAR DE NAVEGACIÓN Y ACCIONES */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            title="Volver a la lista de páginas"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Páginas</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                <span>{currentPage.titulo}</span>
                <button
                  type="button"
                  onClick={() => setIsSettingsModalOpen(true)}
                  className="p-1 text-slate-400 hover:text-[#12A1A4] hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                  title="Cambiar nombre y configuración de la página"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </h1>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                currentPage.activo ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {currentPage.activo ? 'Publicada' : 'Borrador'}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">URL: {currentPage.slug}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Botón Configuración de Página (Renombrar, URL, Menú, SEO) */}
          <button
            type="button"
            onClick={() => setIsSettingsModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Editar nombre, URL y opciones de publicación"
          >
            <Settings className="w-3.5 h-3.5 text-[#12A1A4]" />
            <span>Configurar Página</span>
          </button>

          {/* Botón Añadir Nuevo Bloque (Abre modal unificado de Colegio Acrópolis) */}
          <button
            type="button"
            onClick={() => {
              setEditingSection(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl text-xs font-extrabold bg-[#12A1A4] hover:bg-[#0e8284] text-white shadow-md flex items-center gap-1.5 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Bloque</span>
          </button>

          {/* Switch rápido de estado maestro */}
          <button
            type="button"
            onClick={handleTogglePageStatus}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
              currentPage.activo
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
            }`}
          >
            {currentPage.activo ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{currentPage.activo ? 'Desactivar Página' : 'Publicar Página'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {saveSuccessMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* 2. LISTA SECUENCIAL DE SECCIONES (CONSTRUCTOR) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#12A1A4]" />
            Secciones en la Página ({currentPage.secciones.length} Bloques)
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Usa las flechas para ordenar la jerarquía visual de la página
          </span>
        </div>

        {currentPage.secciones.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <p className="text-sm font-bold text-slate-500 mb-2">No hay secciones en esta página</p>
            <p className="text-xs text-slate-400 mb-4">Haz clic en "Agregar Bloque" para comenzar a diseñar el contenido con bloques limpios.</p>
            <button
              type="button"
              onClick={() => {
                setEditingSection(null);
                setIsModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#12A1A4] text-white hover:bg-[#0e8284] inline-flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Primer Bloque</span>
            </button>
          </div>
        ) : (
          currentPage.secciones.map((section, index) => {
            const isFirst = index === 0;
            const isLast = index === currentPage.secciones.length - 1;

            return (
              <div
                key={section.id}
                className={`bg-white rounded-2xl border p-4 sm:p-5 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md ${
                  section.activo
                    ? 'border-slate-200/90'
                    : 'border-slate-200 bg-slate-50/70 opacity-60'
                }`}
              >
                {/* Info del Bloque */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-black text-xs shrink-0 border border-slate-200">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-teal-50 text-[#12A1A4] border border-teal-100">
                        {section.tipoBloque}
                      </span>
                      {!section.activo && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                          Oculto
                        </span>
                      )}
                    </div>
                    <h2 className="text-sm font-extrabold text-slate-800 truncate mt-1">
                      {section.titulo || `Bloque ${section.tipoBloque}`}
                    </h2>
                    {section.subtitulo && (
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {section.subtitulo}
                      </p>
                    )}
                  </div>
                </div>

                {/* Acciones de la Sección */}
                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                  {/* Reordenar arriba */}
                  <button
                    type="button"
                    onClick={() => moveSection(index, 'up')}
                    disabled={isFirst}
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Subir bloque"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  {/* Reordenar abajo */}
                  <button
                    type="button"
                    onClick={() => moveSection(index, 'down')}
                    disabled={isLast}
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Bajar bloque"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Alternar visibilidad */}
                  <button
                    type="button"
                    onClick={() => toggleSectionActive(section.id)}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      section.activo
                        ? 'border-slate-200 text-slate-600 hover:bg-slate-100'
                        : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                    }`}
                    title={section.activo ? 'Ocultar bloque de la página' : 'Mostrar bloque en la página'}
                  >
                    {section.activo ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>

                  {/* Editar contenido */}
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(section)}
                    className="p-2 rounded-xl bg-teal-50 border border-teal-200 text-[#12A1A4] hover:bg-teal-100 transition-colors cursor-pointer"
                    title="Editar textos y configuración del bloque"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {/* Eliminar sección */}
                  <button
                    type="button"
                    onClick={() => handleDeleteSection(section.id)}
                    className="p-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Eliminar bloque"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal unificado para añadir o editar bloque */}
      <BlockFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSection(null);
        }}
        onSave={handleSaveSection}
        section={editingSection}
        defaultOrder={currentPage.secciones.length}
      />

      {/* Modal de Configuración de Página (Renombrar, URL, Menú, SEO) */}
      <PageSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        page={currentPage}
        onSave={handleSavePageSettings}
      />
    </div>
  );
};
