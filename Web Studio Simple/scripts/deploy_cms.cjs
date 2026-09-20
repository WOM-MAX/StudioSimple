const fs = require('fs');
const path = require('path');

const srcDir = 'd:\\StudioSimple - Antigravity\\Web Studio Simple\\src';
const destDir = 'E:\\CMS';

// 1. Crear directorios
const dirs = [
  path.join(destDir, 'src', 'types'),
  path.join(destDir, 'src', 'data'),
  path.join(destDir, 'src', 'admin'),
  path.join(destDir, 'src', 'renderer'),
  path.join(destDir, 'src', 'context')
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

function copyAndTransform(sourceRel, destRel, transformFn) {
  const fullSrc = path.join(srcDir, sourceRel);
  const fullDest = path.join(destDir, destRel);
  
  if (!fs.existsSync(fullSrc)) {
    console.warn('No existe archivo origen:', fullSrc);
    return;
  }
  
  let content = fs.readFileSync(fullSrc, 'utf8');
  if (transformFn) {
    content = transformFn(content);
  }
  fs.writeFileSync(fullDest, content, 'utf8');
  console.log('Copiado:', destRel);
}

// 2. Copiar tipos
copyAndTransform('types/cms.ts', 'src/types/cms.ts');
copyAndTransform('types/cmsExtras.ts', 'src/types/cmsExtras.ts');

// 3. Copiar datos
copyAndTransform('data/initialCmsData.ts', 'src/data/initialCmsData.ts', content => {
  return content.replace(/from '\.\.\/types\/cms'/g, "from '../types/cms'");
});

copyAndTransform('data/initialCmsExtrasData.ts', 'src/data/initialCmsExtrasData.ts', content => {
  return content.replace(/from '\.\.\/types\/cmsExtras'/g, "from '../types/cmsExtras'");
});

// 4. Copiar componentes comunes indispensables (ColorPicker, Cloudinary)
copyAndTransform('components/common/ColorPickerField.tsx', 'src/renderer/ColorPickerField.tsx');
copyAndTransform('components/common/CloudinaryImageUploader.tsx', 'src/renderer/CloudinaryImageUploader.tsx', content => {
  return content
    .replace(/from '\.\.\/\.\.\/types\/cmsExtras'/g, "from '../types/cmsExtras'")
    .replace(/from '\.\.\/\.\.\/data\/initialCmsExtrasData'/g, "from '../data/initialCmsExtrasData'");
});

// 5. Copiar componentes Admin
const adminFiles = [
  'BlockFormModal.tsx',
  'ConfiguracionGeneralView.tsx',
  'DescargasView.tsx',
  'EventosView.tsx',
  'GaleriaView.tsx',
  'JournalView.tsx',
  'MensajesView.tsx',
  'MetricCard.tsx',
  'PageEditor.tsx',
  'PageSettingsModal.tsx',
  'PaginasTable.tsx',
  'PopupsView.tsx'
];

adminFiles.forEach(file => {
  copyAndTransform(
    path.join('components', 'admin', 'cms', file),
    path.join('src', 'admin', file),
    content => {
      return content
        .replace(/from '\.\.\/\.\.\/\.\.\/types\/cmsExtras'/g, "from '../types/cmsExtras'")
        .replace(/from '\.\.\/\.\.\/\.\.\/types\/cms'/g, "from '../types/cms'")
        .replace(/from '\.\.\/\.\.\/\.\.\/types'/g, "from '../types/cms'")
        .replace(/from '\.\.\/\.\.\/\.\.\/data\/initialCmsExtrasData'/g, "from '../data/initialCmsExtrasData'")
        .replace(/from '\.\.\/\.\.\/\.\.\/data\/initialCmsData'/g, "from '../data/initialCmsData'")
        .replace(/from '\.\.\/\.\.\/\.\.\/context\/AppContext'/g, "from '../context/CmsContext'")
        .replace(/from '\.\.\/\.\.\/common\/ColorPickerField'/g, "from '../renderer/ColorPickerField'")
        .replace(/from '\.\.\/\.\.\/common\/CloudinaryImageUploader'/g, "from '../renderer/CloudinaryImageUploader'")
        .replace(/from '\.\.\/\.\.\/common\//g, "from '../renderer/");
    }
  );
});

// 6. Copiar componentes Renderer
const rendererFiles = [
  { src: 'components/common/CmsBlockRenderer.tsx', dest: 'src/renderer/CmsBlockRenderer.tsx' },
  { src: 'components/common/PublicHeader.tsx', dest: 'src/renderer/PublicHeader.tsx' },
  { src: 'components/common/JournalBlock.tsx', dest: 'src/renderer/JournalBlock.tsx' },
  { src: 'components/common/JournalArticleView.tsx', dest: 'src/renderer/JournalArticleView.tsx' },
  { src: 'components/common/CintaNoticiasBlock.tsx', dest: 'src/renderer/CintaNoticiasBlock.tsx' },
  { src: 'components/common/EventosBlock.tsx', dest: 'src/renderer/EventosBlock.tsx' },
  { src: 'components/common/GaleriaBlock.tsx', dest: 'src/renderer/GaleriaBlock.tsx' },
  { src: 'components/common/TestimoniosBlock.tsx', dest: 'src/renderer/TestimoniosBlock.tsx' },
  { src: 'components/common/PopupWrapper.tsx', dest: 'src/renderer/PopupWrapper.tsx' },
  { src: 'components/common/borderStyles.ts', dest: 'src/renderer/borderStyles.ts' }
];

rendererFiles.forEach(item => {
  copyAndTransform(item.src, item.dest, content => {
    return content
      .replace(/from '\.\.\/\.\.\/types\/cmsExtras'/g, "from '../types/cmsExtras'")
      .replace(/from '\.\.\/\.\.\/types\/cms'/g, "from '../types/cms'")
      .replace(/from '\.\.\/\.\.\/data\/initialCmsExtrasData'/g, "from '../data/initialCmsExtrasData'")
      .replace(/from '\.\.\/\.\.\/data\/initialCmsData'/g, "from '../data/initialCmsData'")
      .replace(/from '\.\.\/\.\.\/context\/AppContext'/g, "from '../context/CmsContext'")
      .replace(/from '\.\/JournalArticleView'/g, "from './JournalArticleView'")
      .replace(/from '\.\/borderStyles'/g, "from './borderStyles'");
  });
});

// 7. CmsAdminDashboard.tsx con signatura exacta de updateCmsPage
const adminDashboardContent = `import React, { useState } from 'react';
import { CmsPage } from '../types/cms';
import { 
  loadCmsPages, 
  saveCmsPages, 
  createCmsPage, 
  deleteCmsPage, 
  updateCmsPage 
} from '../data/initialCmsData';
import { PaginasTable } from './PaginasTable';
import { PageEditor } from './PageEditor';
import { ConfiguracionGeneralView } from './ConfiguracionGeneralView';
import { JournalView } from './JournalView';
import { PopupsView } from './PopupsView';
import { MensajesView } from './MensajesView';
import { GaleriaView } from './GaleriaView';
import { EventosView } from './EventosView';
import { DescargasView } from './DescargasView';
import { 
  Files, Sliders, Newspaper, Bell, Mail, Image as ImageIcon, 
  CalendarDays, FileDown, ArrowLeft 
} from 'lucide-react';

export type CmsAdminTab = 'paginas' | 'configuracion' | 'journal' | 'popups' | 'mensajes' | 'galeria' | 'eventos' | 'descargas';

interface CmsAdminDashboardProps {
  onBackToSite?: () => void;
  title?: string;
}

export const CmsAdminDashboard: React.FC<CmsAdminDashboardProps> = ({ 
  onBackToSite,
  title = 'Panel de Administración CMS'
}) => {
  const [activeTab, setActiveTab] = useState<CmsAdminTab>('paginas');
  const [cmsPages, setCmsPages] = useState<CmsPage[]>(() => loadCmsPages());
  const [selectedPageForEdit, setSelectedPageForEdit] = useState<CmsPage | null>(null);

  const tabs = [
    { id: 'paginas', label: 'Páginas y Menú', icon: Files },
    { id: 'configuracion', label: 'Cabecera, Footer y Redes', icon: Sliders },
    { id: 'journal', label: 'Blog y Noticias', icon: Newspaper },
    { id: 'popups', label: 'Banners y Popups', icon: Bell },
    { id: 'mensajes', label: 'Mensajes de Contacto', icon: Mail },
    { id: 'galeria', label: 'Galería Visual', icon: ImageIcon },
    { id: 'eventos', label: 'Calendario y Eventos', icon: CalendarDays },
    { id: 'descargas', label: 'Centro de Descargas', icon: FileDown },
  ];

  const handleCreatePage = (titulo: string, slug: string, mostrarEnMenu: boolean) => {
    const updated = createCmsPage(titulo, slug, mostrarEnMenu);
    setCmsPages(updated);
  };

  const handleDeletePage = (id: string) => {
    const updated = deleteCmsPage(id);
    setCmsPages(updated);
  };

  const handleToggleStatus = (id: string) => {
    const target = cmsPages.find(p => p.id === id);
    if (target) {
      const updated = updateCmsPage({ ...target, activo: !target.activo });
      setCmsPages(updated);
    }
  };

  const handleToggleMenu = (id: string) => {
    const target = cmsPages.find(p => p.id === id);
    if (target) {
      const updated = updateCmsPage({ ...target, mostrarEnMenu: !target.mostrarEnMenu });
      setCmsPages(updated);
    }
  };

  const handleSavePageSettings = (updatedPage: CmsPage) => {
    const updated = updateCmsPage(updatedPage);
    setCmsPages(updated);
  };

  const handleReorderPages = (updatedPages: CmsPage[]) => {
    setCmsPages(updatedPages);
    saveCmsPages(updatedPages);
  };

  const handleSavePageContent = (updatedPage: CmsPage) => {
    const updated = updateCmsPage(updatedPage);
    setCmsPages(updated);
    setSelectedPageForEdit(updatedPage);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-800/90 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {onBackToSite && (
            <button
              onClick={onBackToSite}
              className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
              title="Volver a la Web"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-lg md:text-xl font-bold text-white">{title}</h1>
        </div>

        <nav className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedPageForEdit(null);
                  setActiveTab(tab.id as CmsAdminTab);
                }}
                className={\`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 \${
                  isActive
                    ? 'bg-[#12A1A4] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }\`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
        {selectedPageForEdit ? (
          <PageEditor
            page={selectedPageForEdit}
            onBack={() => setSelectedPageForEdit(null)}
            onSavePage={handleSavePageContent}
          />
        ) : (
          <>
            {activeTab === 'paginas' && (
              <PaginasTable
                paginas={cmsPages}
                onSelectPage={(p) => setSelectedPageForEdit(p)}
                onToggleStatus={handleToggleStatus}
                onToggleMenu={handleToggleMenu}
                onCreatePage={handleCreatePage}
                onDeletePage={handleDeletePage}
                onSavePage={handleSavePageSettings}
                onReorderPages={handleReorderPages}
              />
            )}
            {activeTab === 'configuracion' && <ConfiguracionGeneralView />}
            {activeTab === 'journal' && <JournalView />}
            {activeTab === 'popups' && <PopupsView />}
            {activeTab === 'mensajes' && <MensajesView />}
            {activeTab === 'galeria' && <GaleriaView />}
            {activeTab === 'eventos' && <EventosView />}
            {activeTab === 'descargas' && <DescargasView />}
          </>
        )}
      </main>
    </div>
  );
};
`;
fs.writeFileSync(path.join(destDir, 'src', 'admin', 'CmsAdminDashboard.tsx'), adminDashboardContent, 'utf8');
console.log('Creado CmsAdminDashboard.tsx');

// 8. Crear index.ts principal
const indexContent = `// Exportaciones principales del módulo CMS Portable
export * from './types/cms';
export * from './types/cmsExtras';
export * from './data/initialCmsData';
export * from './data/initialCmsExtrasData';
export * from './context/CmsContext';

// Vistas Administrativas
export { CmsAdminDashboard } from './admin/CmsAdminDashboard';
export { PaginasTable } from './admin/PaginasTable';
export { PageEditor } from './admin/PageEditor';
export { PageSettingsModal } from './admin/PageSettingsModal';
export { BlockFormModal } from './admin/BlockFormModal';
export { ConfiguracionGeneralView } from './admin/ConfiguracionGeneralView';
export { JournalView } from './admin/JournalView';
export { PopupsView } from './admin/PopupsView';
export { MensajesView } from './admin/MensajesView';
export { GaleriaView } from './admin/GaleriaView';
export { EventosView } from './admin/EventosView';
export { DescargasView } from './admin/DescargasView';
export { MetricCard } from './admin/MetricCard';

// Componentes de Renderizado Público
export { CmsBlockRenderer } from './renderer/CmsBlockRenderer';
export { PublicHeader } from './renderer/PublicHeader';
export { JournalBlock } from './renderer/JournalBlock';
export { JournalArticleView } from './renderer/JournalArticleView';
export { CintaNoticiasBlock } from './renderer/CintaNoticiasBlock';
export { EventosBlock } from './renderer/EventosBlock';
export { GaleriaBlock } from './renderer/GaleriaBlock';
export { TestimoniosBlock } from './renderer/TestimoniosBlock';
export { PopupWrapper } from './renderer/PopupWrapper';
export { getBorderStyles } from './renderer/borderStyles';
export { ColorPickerField } from './renderer/ColorPickerField';
export { CloudinaryImageUploader } from './renderer/CloudinaryImageUploader';
`;
fs.writeFileSync(path.join(destDir, 'src', 'index.ts'), indexContent, 'utf8');
console.log('Creado src/index.ts');

console.log('--- RE-DEPLOY COMPLETO EXITOSO EN E:\\CMS ---');
