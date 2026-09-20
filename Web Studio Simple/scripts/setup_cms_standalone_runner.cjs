const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = 'E:\\CMS';

console.log('--- Configurando Entorno Autónomo de Pruebas en E:\\CMS ---');

// 1. package.json
const pkgJson = {
  "name": "estudiosimple-portable-cms",
  "version": "1.0.0",
  "type": "module",
  "description": "Sistema de gestion de contenidos (CMS) modular, visual y ligero con soporte para Cloudinary, Tailwind CSS y paginas dinamicas.",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview"
  },
  "keywords": ["cms", "react", "tailwindcss", "headless-cms", "page-builder"],
  "author": "Walter / EstudioSimple",
  "license": "MIT",
  "dependencies": {
    "framer-motion": "^11.11.11",
    "lucide-react": "^0.454.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3",
    "vite": "^5.4.10"
  }
};
fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(pkgJson, null, 2), 'utf-8');
console.log('package.json actualizado');

// 2. vite.config.ts
const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    open: false
  }
});
`;
fs.writeFileSync(path.join(targetDir, 'vite.config.ts'), viteConfig, 'utf-8');
console.log('vite.config.ts creado');

// 3. tailwind.config.js
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;
fs.writeFileSync(path.join(targetDir, 'tailwind.config.js'), tailwindConfig, 'utf-8');
console.log('tailwind.config.js creado');

// 4. postcss.config.js
const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;
fs.writeFileSync(path.join(targetDir, 'postcss.config.js'), postcssConfig, 'utf-8');
console.log('postcss.config.js creado');

// 5. index.html
const indexHtml = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CMS Portable - Entorno de Pruebas</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased font-sans">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
fs.writeFileSync(path.join(targetDir, 'index.html'), indexHtml, 'utf-8');
console.log('index.html creado');

// 6. src/index.css
const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}
`;
fs.writeFileSync(path.join(targetDir, 'src', 'index.css'), indexCss, 'utf-8');
console.log('src/index.css creado');

// 7. src/App.tsx
const appTsx = `import React, { useState } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { CmsAdminDashboard } from './admin/CmsAdminDashboard';
import { CmsBlockRenderer } from './renderer/CmsBlockRenderer';
import { PublicHeader } from './renderer/PublicHeader';
import { LayoutDashboard, Globe, RefreshCw } from 'lucide-react';

function CmsPlayground() {
  const { paginas, paginaActiva, setPaginaActiva, siteConfig } = useCms();
  const [activeTab, setActiveTab] = useState<'admin' | 'public'>('admin');

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Barra superior del Entorno de Pruebas */}
      <header className="bg-slate-900 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-4 shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm shadow">
            CMS
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight">CMS Portable (Standalone)</h1>
            <p className="text-xs text-slate-400">Entorno Autonomo de Pruebas y Desarrollo</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('admin')}
            className={\`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all \${
              activeTab === 'admin'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }\`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Panel de Administracion
          </button>
          <button
            onClick={() => setActiveTab('public')}
            className={\`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all \${
              activeTab === 'public'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }\`}
          >
            <Globe className="w-3.5 h-3.5" />
            Ver Web Publica en Vivo
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button
            onClick={() => {
              if (window.confirm('Deseas reiniciar los datos a la configuracion original de fabrica?')) {
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

      {/* Contenido segun pestana activa */}
      <main className="flex-1">
        {activeTab === 'admin' ? (
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <CmsAdminDashboard
              onClose={() => setActiveTab('public')}
            />
          </div>
        ) : (
          <div className="min-h-screen bg-white">
            {/* Cabecera publica del CMS */}
            <PublicHeader
              onNavigate={(pageId) => {
                setPaginaActiva(pageId);
              }}
              onAdminClick={() => setActiveTab('admin')}
            />

            {/* Bloques de la pagina activa */}
            <div className="pb-16">
              {paginaActiva && paginaActiva.bloques && paginaActiva.bloques.length > 0 ? (
                paginaActiva.bloques.map((bloque) => (
                  <CmsBlockRenderer
                    key={bloque.id}
                    bloque={bloque}
                    onNavigate={(pageId) => setPaginaActiva(pageId)}
                  />
                ))
              ) : (
                <div className="p-16 text-center text-slate-400">
                  <p className="text-lg font-medium text-slate-600 mb-2">Esta pagina aun no tiene bloques agregados.</p>
                  <button
                    onClick={() => setActiveTab('admin')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    Ir al Panel a agregar bloques
                  </button>
                </div>
              )}
            </div>

            {/* Footer de muestra */}
            <footer
              className="py-8 px-4 text-center text-xs text-white"
              style={{ backgroundColor: siteConfig?.footer?.fondo || '#0E284E' }}
            >
              <p>{siteConfig?.footer?.textoLegal || 'Plataforma con CMS Portable Integrado'}</p>
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
fs.writeFileSync(path.join(targetDir, 'src', 'App.tsx'), appTsx, 'utf-8');
console.log('src/App.tsx creado');

// 8. src/main.tsx
const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
fs.writeFileSync(path.join(targetDir, 'src', 'main.tsx'), mainTsx, 'utf-8');
console.log('src/main.tsx creado');

console.log('--- Archivos creados. Procediendo con npm install en E:\\CMS ---');
try {
  execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
  console.log('npm install completado con exito.');
} catch (e) {
  console.error('Error al ejecutar npm install:', e);
}
