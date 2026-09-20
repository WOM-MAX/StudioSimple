const fs = require('fs');

const content = `import React, { useState, useEffect } from 'react';
import { CmsProvider } from './context/CmsContext';
import { CmsAdminDashboard } from './admin/CmsAdminDashboard';
import { CmsBlockRenderer } from './renderer/CmsBlockRenderer';
import { PublicHeader } from './renderer/PublicHeader';
import { loadCmsPages } from './data/initialCmsData';
import { INITIAL_SITE_CONFIG } from './data/initialCmsExtrasData';
import { CmsPage, CmsSection } from './types/cms';
import { SiteConfig } from './types/cmsExtras';
import { LayoutDashboard, Globe, RefreshCw, Layers } from 'lucide-react';

function CmsPlayground() {
  const [activeTab, setActiveTab] = useState<'admin' | 'public'>('admin');
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [currentSlug, setCurrentSlug] = useState<string>('/');
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);

  const refreshData = () => {
    const loadedPages = loadCmsPages();
    setPages(loadedPages);
    try {
      const savedConfig = localStorage.getItem('cms_site_config_v2');
      if (savedConfig) {
        setSiteConfig(JSON.parse(savedConfig));
      } else {
        setSiteConfig(INITIAL_SITE_CONFIG);
      }
    } catch {
      setSiteConfig(INITIAL_SITE_CONFIG);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const currentPage = pages.find(p => p.slug === currentSlug) || pages[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Barra de Control del Sandbox */}
      <header className="bg-slate-900 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-4 shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm shadow">
            CMS
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight">CMS Portable (Standalone)</h1>
            <p className="text-xs text-slate-400">Entorno Autónomo de Pruebas y Desarrollo</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => {
              refreshData();
              setActiveTab('admin');
            }}
            className={\`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all \${
              activeTab === 'admin'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }\`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Panel de Administración
          </button>
          <button
            onClick={() => {
              refreshData();
              setActiveTab('public');
            }}
            className={\`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all \${
              activeTab === 'public'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }\`}
          >
            <Globe className="w-3.5 h-3.5" />
            Ver Web Pública en Vivo
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button
            onClick={() => {
              if (window.confirm('¿Deseas reiniciar los datos a los valores predeterminados?')) {
                localStorage.removeItem('cms_paginas_v2');
                localStorage.removeItem('cms_site_config_v2');
                localStorage.removeItem('cms_journal_v1');
                localStorage.removeItem('cms_eventos_v1');
                localStorage.removeItem('cms_descargas_v1');
                localStorage.removeItem('cms_galeria_v1');
                localStorage.removeItem('cms_popups_v1');
                localStorage.removeItem('cms_mensajes_v1');
                window.location.reload();
              }
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Restablecer datos de prueba"
          >
            <RefreshCw className="w-3 h-3" />
            Restablecer Datos
          </button>
        </div>
      </header>

      {/* Contenedor Principal */}
      <main className="flex-1">
        {activeTab === 'admin' ? (
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <CmsAdminDashboard
              onBackToSite={() => {
                refreshData();
                setActiveTab('public');
              }}
            />
          </div>
        ) : (
          <div className="min-h-screen bg-white flex flex-col">
            {/* Cabecera pública sincronizada */}
            <PublicHeader
              siteConfig={siteConfig}
              menuPages={pages.filter(p => p.mostrarEnMenu)}
              currentSlug={currentSlug}
              onNavigatePage={(slug) => setCurrentSlug(slug)}
              onNavigatePricing={() => alert('Botón Planes y Precios clickeado')}
            />

            {/* Selector rápido de página */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-2 text-xs text-slate-600">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                Página activa:
              </span>
              {pages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentSlug(p.slug)}
                  className={\`px-2.5 py-1 rounded transition-colors \${
                    (currentSlug === p.slug || (currentSlug === '/' && p.slug === 'inicio'))
                      ? 'bg-blue-600 text-white font-medium'
                      : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }\`}
                >
                  {p.titulo} ({p.slug})
                </button>
              ))}
            </div>

            {/* Renderizador de Bloques */}
            <div className="flex-1 pb-16">
              {currentPage && currentPage.secciones && currentPage.secciones.length > 0 ? (
                currentPage.secciones.map((bloque: CmsSection) => (
                  <CmsBlockRenderer
                    key={bloque.id}
                    section={bloque}
                  />
                ))
              ) : (
                <div className="p-16 text-center text-slate-400">
                  <p className="text-lg font-medium text-slate-600 mb-2">Esta página aún no tiene bloques configurados.</p>
                  <button
                    onClick={() => setActiveTab('admin')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    Ir al Panel a agregar bloques
                  </button>
                </div>
              )}
            </div>

            {/* Footer institucional dinámico */}
            <footer
              className="py-8 px-4 text-center text-xs text-white mt-auto"
              style={{ backgroundColor: siteConfig.footer?.footerBgColor || '#0E284E' }}
            >
              <p>{siteConfig.footer?.copyrightText || 'Plataforma con CMS Portable Integrado'}</p>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <CmsPlayground />
    </CmsProvider>
  );
}
`;

fs.writeFileSync('E:\\CMS\\src\\App.tsx', content, 'utf-8');
console.log('App.tsx reescrito exitosamente con tipos correctos');
