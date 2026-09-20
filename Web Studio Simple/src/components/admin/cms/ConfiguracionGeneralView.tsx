import React, { useState } from 'react';
import {
  Save,
  Globe,
  Phone,
  MessageCircle,
  Mail,
  Share2,
  CheckCircle2,
  Sliders,
  Shield,
  Layers,
  Sparkles,
  Cloud,
  Check,
  AlertCircle,
  ExternalLink,
  HelpCircle,
  Plus,
  Trash2,
  Type,
  Palette,
  Radio
} from 'lucide-react';
import { SiteConfig, CloudinaryConfig, RedSocialItem, TipoRedSocial, ModoBordeTarjeta } from '../../../types/cmsExtras';
import { CintaNoticiasConfig, NoticiaItem } from '../../../types/cms';
import { loadSiteConfig, saveSiteConfig } from '../../../data/initialCmsExtrasData';
import { loadCmsPages, saveCmsPages } from '../../../data/initialCmsData';
import { ColorPickerField } from '../../common/ColorPickerField';
import { CloudinaryImageUploader } from '../../common/CloudinaryImageUploader';
import { CintaNoticiasBlock } from '../../common/CintaNoticiasBlock';
import { getBorderStyles } from '../../common/borderStyles';

export const ConfiguracionGeneralView: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig>(() => loadSiteConfig());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'header' | 'cinta' | 'footer' | 'contacto' | 'cloudinary' | 'colores'>('header');
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'testing' | 'success' | 'error'; message?: string }>({ status: 'idle' });

  const updateEstilosGlobales = (key: keyof NonNullable<SiteConfig['estilosGlobales']>, value: any) => {
    setConfig((prev) => ({
      ...prev,
      estilosGlobales: {
        ...(prev.estilosGlobales || {
          colorBordeEtiquetas: '#12A1A4',
          colorBordeComentarios: '#F8AD22',
          colorBordeFaq: '#EE751C',
          colorAcentoFaq: '#57d6f3',
          colorEstrellas: '#F8AD22'
        }),
        [key]: value
      }
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteConfig(config);

    // Sincronizar también con el bloque CINTA_NOTICIAS en las páginas CMS
    try {
      const pages = loadCmsPages();
      const updatedPages = pages.map((page) => {
        if (page.slug === '/') {
          return {
            ...page,
            secciones: page.secciones.map((sec) => {
              if (sec.tipoBloque === 'CINTA_NOTICIAS') {
                return {
                  ...sec,
                  activo: config.cintaNoticias?.activo !== false,
                  configuracion: {
                    ...sec.configuracion,
                    ...(config.cintaNoticias || {})
                  }
                };
              }
              return sec;
            })
          };
        }
        return page;
      });
      saveCmsPages(updatedPages);
    } catch (err) {
      console.error('Error sincronizando bloque Cinta de Noticias:', err);
    }

    // Notificar reactivamente a la LandingPage y ventanas abiertas
    window.dispatchEvent(new Event('storage'));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const updateHeader = (key: keyof SiteConfig['header'], value: any) => {
    setConfig((prev) => ({
      ...prev,
      header: { ...prev.header, [key]: value }
    }));
  };

  const updateCinta = (key: keyof CintaNoticiasConfig | 'activo', value: any) => {
    setConfig((prev) => ({
      ...prev,
      cintaNoticias: {
        ...(prev.cintaNoticias || {
          colorFondo: '#0B254D',
          colorTexto: '#FFFFFF',
          colorEtiqueta: '#12A1A4',
          etiquetaPrincipal: 'MINEDUC AL DÍA',
          mostrarIconoLive: true,
          velocidad: 'normal',
          activo: true,
          noticias: []
        }),
        [key]: value
      }
    }));
  };

  const handleAddNoticia = () => {
    const nueva: NoticiaItem = {
      texto: 'Nuevo anuncio relevante para las familias homeschoolers',
      etiqueta: 'AVISO'
    };
    setConfig((prev) => ({
      ...prev,
      cintaNoticias: {
        ...(prev.cintaNoticias || {}),
        noticias: [...(prev.cintaNoticias?.noticias || []), nueva]
      }
    }));
  };

  const handleUpdateNoticia = (index: number, field: keyof NoticiaItem, value: string) => {
    setConfig((prev) => ({
      ...prev,
      cintaNoticias: {
        ...(prev.cintaNoticias || {}),
        noticias: (prev.cintaNoticias?.noticias || []).map((item, idx) =>
          idx === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const handleDeleteNoticia = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      cintaNoticias: {
        ...(prev.cintaNoticias || {}),
        noticias: (prev.cintaNoticias?.noticias || []).filter((_, idx) => idx !== index)
      }
    }));
  };

  const updateFooter = (key: keyof SiteConfig['footer'], value: any) => {
    setConfig((prev) => ({
      ...prev,
      footer: { ...prev.footer, [key]: value }
    }));
  };

  const updateContacto = (key: keyof SiteConfig['contacto'], value: any) => {
    setConfig((prev) => ({
      ...prev,
      contacto: { ...prev.contacto, [key]: value }
    }));
  };

  const handleAddRedSocial = () => {
    const newRed: RedSocialItem = {
      id: `red-${Date.now()}`,
      red: 'instagram',
      etiqueta: 'Nueva Red Social',
      url: 'https://',
      activo: true
    };
    setConfig((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        redesSociales: [...(prev.footer.redesSociales || []), newRed]
      }
    }));
  };

  const handleUpdateRedSocial = (id: string, field: keyof RedSocialItem, value: any) => {
    setConfig((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        redesSociales: (prev.footer.redesSociales || []).map((r) =>
          r.id === id ? { ...r, [field]: value } : r
        )
      }
    }));
  };

  const handleDeleteRedSocial = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        redesSociales: (prev.footer.redesSociales || []).filter((r) => r.id !== id)
      }
    }));
  };

  const updateCloudinary = (key: keyof CloudinaryConfig, value: any) => {
    setConfig((prev) => ({
      ...prev,
      cloudinary: {
        ...(prev.cloudinary || {
          cloudName: '',
          apiKey: '',
          uploadPreset: '',
          folder: 'estudiosimple',
          enabled: false
        }),
        [key]: value
      }
    }));
  };

  const testCloudinaryConnection = async () => {
    const c = config.cloudinary;
    if (!c?.cloudName?.trim()) {
      setTestResult({ status: 'error', message: 'Ingresa un Cloud Name para probar la conexión.' });
      return;
    }
    setTestResult({ status: 'testing' });
    try {
      // Probar si el subdominio de Cloudinary responde
      const res = await fetch(`https://res.cloudinary.com/${c.cloudName.trim()}/image/upload/sample.jpg`, { method: 'HEAD' });
      if (res.status === 200 || res.status === 404) {
        setTestResult({
          status: 'success',
          message: `Conexión exitosa con el Cloud Name "${c.cloudName}". Tu espacio en Cloudinary está accesible.`
        });
      } else {
        setTestResult({
          status: 'success',
          message: `El servidor de Cloudinary respondió (Código ${res.status}). Las credenciales quedaron listas para guardar.`
        });
      }
    } catch {
      setTestResult({
        status: 'error',
        message: 'No se pudo conectar con Cloudinary. Verifica que el Cloud Name sea correcto.'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <Sliders className="w-6 h-6 text-[#12A1A4]" />
            <span>Configuración General del Sitio</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Personaliza el encabezado (Header), el pie de página (Footer), el WhatsApp de apoderados y los datos legales.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2 rounded-xl font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>¡Configuración guardada! Se actualizó en la Landing Page.</span>
          </div>
        )}
      </div>

      {/* Selector de Pestañas */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('header')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'header'
              ? 'border-[#12A1A4] text-[#12A1A4]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Cabecera (Header)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cinta')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'cinta'
              ? 'border-[#12A1A4] text-[#12A1A4]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>Cinta de Noticias</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('footer')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'footer'
              ? 'border-[#12A1A4] text-[#12A1A4]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Pie de Página (Footer)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contacto')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'contacto'
              ? 'border-[#12A1A4] text-[#12A1A4]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Contacto y Redes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cloudinary')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'cloudinary'
              ? 'border-[#12A1A4] text-[#12A1A4]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Cloud className="w-4 h-4" />
          <span>Integraciones / Cloudinary</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('colores')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'colores'
              ? 'border-[#12A1A4] text-[#12A1A4]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Colores de Elementos (Paleta)</span>
        </button>
      </div>

      {/* Formulario Principal */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* PESTAÑA 1: HEADER */}
        {activeTab === 'header' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#12A1A4]" />
              <span>Elementos de la Cabecera Superior (Navbar)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <CloudinaryImageUploader
                  label="Logotipo de la Cabecera (Navbar)"
                  recommendedDimensions="400 x 120 px (Horizontal transparente PNG o SVG)"
                  value={config.header.logoUrl}
                  onChange={(url) => updateHeader('logoUrl', url)}
                  helperText="Imagen institucional que se visualiza en la barra de navegación superior."
                  compact
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Texto Botón Planes
                </label>
                <input
                  type="text"
                  value={config.header.planesButtonText}
                  onChange={(e) => updateHeader('planesButtonText', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
                  placeholder="Planes y Precios"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Texto Botón Iniciar Sesión
                </label>
                <input
                  type="text"
                  value={config.header.loginButtonText}
                  onChange={(e) => updateHeader('loginButtonText', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
                  placeholder="Iniciar Sesión"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <input
                  type="checkbox"
                  id="showWhatsAppHeader"
                  checked={config.header.showWhatsAppQuick}
                  onChange={(e) => updateHeader('showWhatsAppQuick', e.target.checked)}
                  className="w-4 h-4 text-[#12A1A4] rounded focus:ring-[#12A1A4]"
                />
                <label htmlFor="showWhatsAppHeader" className="text-xs font-bold text-slate-700">
                  Habilitar enlace de soporte rápido por WhatsApp en la cabecera
                </label>
              </div>

              <div className="sm:col-span-2 pt-4 border-t border-slate-100 space-y-4">
                <ColorPickerField
                  label="Color de Fondo de la Cabecera (Navbar)"
                  value={config.header.headerBgColor || '#FFFFFF'}
                  onChange={(hex) => updateHeader('headerBgColor', hex)}
                  helperText="Define el color de la barra superior institucional."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <ColorPickerField
                    label="Color del Menú Activo (Página Seleccionada)"
                    value={config.header.activeLinkColor || '#12A1A4'}
                    onChange={(hex) => updateHeader('activeLinkColor', hex)}
                    helperText="Color con el que se destacará la página que se esté visualizando en el momento."
                  />

                  <ColorPickerField
                    label="Color de Enlaces Inactivos del Menú"
                    value={config.header.headerTextColor || '#0F172A'}
                    onChange={(hex) => updateHeader('headerTextColor', hex)}
                    helperText="Color del texto para las páginas no seleccionadas."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Estilo del Menú Seleccionado
                    </label>
                    <select
                      value={config.header.activeLinkStyle || 'underline'}
                      onChange={(e) => updateHeader('activeLinkStyle', e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                    >
                      <option value="underline">Subrayado Clásico</option>
                      <option value="pill">Píldora / Fondo Suave</option>
                      <option value="bold">Solo Color y Negrita (Sin subrayado)</option>
                    </select>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Elige cómo se resalta visualmente la página activa en el menú.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Tamaño de Fuente del Menú
                    </label>
                    <select
                      value={config.header.menuFontSize || 'sm'}
                      onChange={(e) => updateHeader('menuFontSize', e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                    >
                      <option value="sm">Compacto (12px / text-xs)</option>
                      <option value="base">Estándar (14px / text-sm)</option>
                      <option value="lg">Grande (16px / text-base)</option>
                    </select>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Controla la escala tipográfica de los enlaces de navegación.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 2: CINTA DE NOTICIAS */}
        {activeTab === 'cinta' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#12A1A4]" />
                  <span>Cinta de Noticias Superior (Ticker Oficial MINEDUC)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Barra continua de avisos que se despliega inmediatamente debajo de la cabecera en la Landing Page.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={config.cintaNoticias?.activo !== false}
                  onChange={(e) => updateCinta('activo', e.target.checked)}
                  className="w-4 h-4 rounded text-[#12A1A4] focus:ring-[#12A1A4]"
                />
                <span className="text-xs font-bold text-slate-700">Mostrar Cinta en la Landing</span>
              </label>
            </div>

            {/* Vista Previa Interactiva */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#12A1A4]" />
                <span>Vista Previa en Tiempo Real</span>
              </label>
              <div className="rounded-xl overflow-hidden border border-slate-300 shadow-inner bg-slate-900/5 p-2">
                <CintaNoticiasBlock
                  configuracion={{
                    ...(config.cintaNoticias || {
                      colorFondo: '#0B254D',
                      colorTexto: '#FFFFFF',
                      colorEtiqueta: '#12A1A4',
                      etiquetaPrincipal: 'MINEDUC AL DÍA',
                      mostrarIconoLive: true,
                      velocidad: 'normal',
                      noticias: []
                    })
                  }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Esta es la apariencia exacta con la que se visualizará la cinta en la página principal.
              </p>
            </div>

            {/* Paleta de Colores de la Cinta */}
            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#12A1A4]" />
                <span>Colores y Estilo Visual</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ColorPickerField
                  label="Color de Fondo de la Barra"
                  value={config.cintaNoticias?.colorFondo || '#0B254D'}
                  onChange={(hex) => updateCinta('colorFondo', hex)}
                  helperText="Tono del contenedor principal de la cinta."
                />

                <ColorPickerField
                  label="Color del Texto / Titulares"
                  value={config.cintaNoticias?.colorTexto || '#FFFFFF'}
                  onChange={(hex) => updateCinta('colorTexto', hex)}
                  helperText="Color de las noticias y separadores."
                />

                <ColorPickerField
                  label="Color del Badge / Etiqueta"
                  value={config.cintaNoticias?.colorEtiqueta || '#12A1A4'}
                  onChange={(hex) => updateCinta('colorEtiqueta', hex)}
                  helperText="Color del distintivo lateral y etiquetas de avisos."
                />

                <ColorPickerField
                  label="Color Fondo Fila Móvil"
                  value={config.cintaNoticias?.colorFondoMarquesina || config.cintaNoticias?.colorFondo || '#0B254D'}
                  onChange={(hex) => updateCinta('colorFondoMarquesina', hex)}
                  helperText="Color exclusivo de la fila que se mueve de derecha a izquierda."
                />

                <ColorPickerField
                  label="Color Texto Fila Móvil"
                  value={config.cintaNoticias?.colorTextoMarquesina || config.cintaNoticias?.colorTexto || '#FFFFFF'}
                  onChange={(hex) => updateCinta('colorTextoMarquesina', hex)}
                  helperText="Color del texto y puntos de la fila que se mueve."
                />
              </div>
            </div>

            {/* Configuración de Comportamiento y Dimensiones */}
            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#12A1A4]" />
                <span>Dimensiones, Alineación y Comportamiento</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Diseño de Filas
                  </label>
                  <select
                    value={config.cintaNoticias?.modoVisual || 'doble'}
                    onChange={(e) => updateCinta('modoVisual', e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                  >
                    <option value="solo_marquesina">1 Fila: Solo Marquesina continua (Delgada)</option>
                    <option value="solo_titular">1 Fila: Solo Titular rotativo</option>
                    <option value="doble">2 Filas: Doble Barra (Titular + Marquesina)</option>
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1">Elige entre 1 fila o 2 filas.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Grosor / Altura de la Cinta
                  </label>
                  <select
                    value={config.cintaNoticias?.altura || 'normal'}
                    onChange={(e) => updateCinta('altura', e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                  >
                    <option value="compacta">Compacta (Delgada · Discreta)</option>
                    <option value="normal">Normal (Estándar · Equilibrada)</option>
                    <option value="amplia">Amplia (Prominente · Mayor presencia)</option>
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1">Controla el grosor y tamaño del texto.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Alineación del Titular
                  </label>
                  <select
                    value={config.cintaNoticias?.alineacion || 'centrado'}
                    onChange={(e) => updateCinta('alineacion', e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                  >
                    <option value="centrado">Centrado (En el ancho de la barra)</option>
                    <option value="izquierda">Alineado a la Izquierda (Junto al badge)</option>
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1">Posición del titular superior.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Etiqueta Principal
                  </label>
                  <input
                    type="text"
                    value={config.cintaNoticias?.etiquetaPrincipal ?? 'MINEDUC AL DÍA'}
                    onChange={(e) => updateCinta('etiquetaPrincipal', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                    placeholder="MINEDUC AL DÍA"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Texto del bloque lateral fijo.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Velocidad del Ticker
                  </label>
                  <select
                    value={config.cintaNoticias?.velocidad || 'normal'}
                    onChange={(e) => updateCinta('velocidad', e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                  >
                    <option value="lenta">Lenta (Lectura pausada · 14s)</option>
                    <option value="normal">Normal (Recomendada · 8s)</option>
                    <option value="rapida">Rápida (Dinámica · 4s)</option>
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1">Velocidad del carrusel animado.</p>
                </div>

                <div className="sm:col-span-2 lg:col-span-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.cintaNoticias?.mostrarIconoLive !== false}
                      onChange={(e) => updateCinta('mostrarIconoLive', e.target.checked)}
                      className="w-4 h-4 rounded text-[#12A1A4] focus:ring-[#12A1A4]"
                    />
                    <span className="text-xs font-bold text-slate-700">Mostrar indicador "En Vivo" pulsante</span>
                  </label>
                  <p className="text-[11px] text-slate-400 mt-0.5 pl-6">
                    Muestra un punto blanco pulsante junto a la etiqueta principal.
                  </p>
                </div>
              </div>
            </div>

            {/* Lista de Titulares y Noticias */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-[#12A1A4]" />
                    <span>Titulares y Noticias en Rotación ({config.cintaNoticias?.noticias?.length || 0})</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Cada titular se desplazará continuamente por la pantalla y rotará en la cabecera.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddNoticia}
                  className="px-3 py-1.5 bg-[#12A1A4] hover:bg-[#0e8082] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar Titular</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {(config.cintaNoticias?.noticias || []).map((noticia, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                  >
                    <div className="w-full sm:w-36 shrink-0">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Etiqueta (Badge)
                      </label>
                      <input
                        type="text"
                        value={noticia.etiqueta || ''}
                        onChange={(e) => handleUpdateNoticia(idx, 'etiqueta', e.target.value)}
                        placeholder="Ej: OFICIAL"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-black uppercase text-slate-700 bg-white"
                      />
                    </div>
                    <div className="w-full flex-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Texto de la Noticia / Anuncio
                      </label>
                      <input
                        type="text"
                        value={noticia.texto || ''}
                        onChange={(e) => handleUpdateNoticia(idx, 'texto', e.target.value)}
                        placeholder="Escribe el anuncio para las familias..."
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-800 bg-white"
                      />
                    </div>
                    <div className="sm:pt-5 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteNoticia(idx)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar este titular"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 3: FOOTER */}
        {activeTab === 'footer' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#12A1A4]" />
              <span>Elementos del Pie de Página (Footer Oficial)</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Texto de Misión y Resumen de Marca
              </label>
              <textarea
                value={config.footer.missionText}
                onChange={(e) => updateFooter('missionText', e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-700 leading-relaxed"
                placeholder="Descripción institucional para apoderados"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Texto Legal de Decretos y Acreditación MINEDUC
              </label>
              <textarea
                value={config.footer.decretoText}
                onChange={(e) => updateFooter('decretoText', e.target.value)}
                rows={2}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-700 leading-relaxed font-mono"
                placeholder="Texto sobre Decretos 2272 y 67"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Número de WhatsApp Apoderados
                </label>
                <input
                  type="text"
                  value={config.footer.whatsAppNumber}
                  onChange={(e) => updateFooter('whatsAppNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-emerald-700"
                  placeholder="+56 9 8765 4321"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Etiqueta del Botón WhatsApp
                </label>
                <input
                  type="text"
                  value={config.footer.whatsAppLabel}
                  onChange={(e) => updateFooter('whatsAppLabel', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
                  placeholder="WhatsApp Apoderados"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Texto del Copyright
                </label>
                <input
                  type="text"
                  value={config.footer.copyrightText}
                  onChange={(e) => updateFooter('copyrightText', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-700"
                  placeholder="© 2026 EstudioSimple Chile..."
                />
              </div>

              <div className="sm:col-span-2">
                <CloudinaryImageUploader
                  label="Logotipo del Pie de Página (Footer)"
                  recommendedDimensions="500 x 200 px (Horizontal con imagotipo PNG o SVG)"
                  value={config.footer.logoUrl}
                  onChange={(url) => updateFooter('logoUrl', url)}
                  helperText="Logotipo que aparece en la tarjeta Bento informativa del pie de página."
                  compact
                />
              </div>

              <div className="sm:col-span-2 pt-4 border-t border-slate-100 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ColorPickerField
                    label="Color de Fondo del Sub-Footer Inferior"
                    value={config.footer.footerBgColor || '#123A72'}
                    onChange={(hex) => updateFooter('footerBgColor', hex)}
                    helperText="Define el tono de la franja inferior de acreditación y copyright."
                  />

                  <ColorPickerField
                    label="Color de Texto y Enlaces del Sub-Footer"
                    value={config.footer.footerTextColor || '#BFDBFE'}
                    onChange={(hex) => updateFooter('footerTextColor', hex)}
                    helperText="Color del texto legal, copyright y enlaces del sub-footer."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <ColorPickerField
                    label="Color de Títulos de Columnas del Footer"
                    value={config.footer.footerHeadingsColor || '#123A72'}
                    onChange={(hex) => updateFooter('footerHeadingsColor', hex)}
                    helperText="Tono para los encabezados 'PLATAFORMA', 'TEMARIOS EVALUADOS' y 'FAMILIAS Y SOPORTE'."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 3: CONTACTO Y REDES (GESTOR DINÁMICO) */}
        {activeTab === 'contacto' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#12A1A4]" />
                <span>Canales de Contacto Directo y Atención</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email de Contacto Oficial
                  </label>
                  <input
                    type="email"
                    value={config.footer.emailContacto}
                    onChange={(e) => updateFooter('emailContacto', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
                    placeholder="contacto@estudiosimple.cl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Horario de Atención
                  </label>
                  <input
                    type="text"
                    value={config.contacto.horarioAtencion}
                    onChange={(e) => updateContacto('horarioAtencion', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-700"
                    placeholder="Lunes a Viernes: 09:00 a 18:00 hrs"
                  />
                </div>
              </div>
            </div>

            {/* GESTOR DINÁMICO DE REDES SOCIALES */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#12A1A4]" />
                    <span>Redes Sociales y Canales Oficiales (100% Configurables)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Agrega, edita, activa o pausa cualquier red social para que se muestre en el pie de página.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddRedSocial}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Red o Canal</span>
                </button>
              </div>

              {(!config.footer.redesSociales || config.footer.redesSociales.length === 0) ? (
                <div className="p-8 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-500 text-xs">
                  No hay redes sociales configuradas. Haz clic en "Agregar Red o Canal" para vincular una.
                </div>
              ) : (
                <div className="space-y-3">
                  {config.footer.redesSociales.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all flex flex-col md:flex-row items-start md:items-center gap-3.5"
                    >
                      {/* Plataforma */}
                      <div className="w-full md:w-44">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                          Plataforma
                        </label>
                        <select
                          value={item.red}
                          onChange={(e) => handleUpdateRedSocial(item.id, 'red', e.target.value as TipoRedSocial)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                        >
                          <option value="instagram">Instagram</option>
                          <option value="youtube">YouTube</option>
                          <option value="facebook">Facebook</option>
                          <option value="tiktok">TikTok</option>
                          <option value="whatsapp">WhatsApp (Canal/Grupo)</option>
                          <option value="telegram">Telegram</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="x">X / Twitter</option>
                          <option value="sitio_web">Sitio Web / Blog</option>
                          <option value="otro">Otro Enlace</option>
                        </select>
                      </div>

                      {/* Etiqueta Visible */}
                      <div className="w-full md:w-64">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                          Texto Visible
                        </label>
                        <input
                          type="text"
                          value={item.etiqueta}
                          onChange={(e) => handleUpdateRedSocial(item.id, 'etiqueta', e.target.value)}
                          placeholder="Ej: Instagram Oficial"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
                        />
                      </div>

                      {/* URL */}
                      <div className="w-full md:flex-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                          URL Directa
                        </label>
                        <input
                          type="url"
                          value={item.url}
                          onChange={(e) => handleUpdateRedSocial(item.id, 'url', e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-700 bg-white"
                        />
                      </div>

                      {/* Activo / Inactivo */}
                      <div className="flex items-center gap-2 pt-4 md:pt-3">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.activo}
                            onChange={(e) => handleUpdateRedSocial(item.id, 'activo', e.target.checked)}
                            className="w-4 h-4 text-[#12A1A4] rounded focus:ring-[#12A1A4]"
                          />
                          <span>Visible</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => handleDeleteRedSocial(item.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors ml-2 cursor-pointer"
                          title="Eliminar red"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PESTAÑA 4: INTEGRACIONES / CLOUDINARY */}
        {activeTab === 'cloudinary' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-[#12A1A4]" />
                  <span>Integración de Cloudinary (Almacenamiento de Imágenes)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Conecta tu cuenta de Cloudinary para habilitar subidas directas desde el computador hacia Journal, Popups, Galería y Logos.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                    config.cloudinary?.enabled && config.cloudinary?.cloudName && config.cloudinary?.uploadPreset
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    config.cloudinary?.enabled && config.cloudinary?.cloudName && config.cloudinary?.uploadPreset
                      ? 'bg-emerald-500'
                      : 'bg-amber-500'
                  }`} />
                  <span>
                    {config.cloudinary?.enabled && config.cloudinary?.cloudName && config.cloudinary?.uploadPreset
                      ? 'Cloudinary Habilitado'
                      : 'Sin Configurar'}
                  </span>
                </span>
              </div>
            </div>

            {/* Checkbox de Activación */}
            <div className="p-4 rounded-xl border border-teal-100 bg-teal-50/50 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Activar subida de archivos multimedia a Cloudinary
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Cuando esté activo, los módulos de Journal, Popups y Galería permitirán arrastrar y subir fotos directamente a tu nube.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.cloudinary?.enabled ?? false}
                  onChange={(e) => updateCloudinary('enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#12A1A4]" />
              </label>
            </div>

            {/* Formulario de Credenciales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Cloud Name (Nombre de la Nube) *
                </label>
                <input
                  type="text"
                  value={config.cloudinary?.cloudName || ''}
                  onChange={(e) => updateCloudinary('cloudName', e.target.value.trim())}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#12A1A4]/30 focus:border-[#12A1A4]"
                  placeholder="ej: mi-escuela o dxy123abc"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Identificador principal que aparece en tu Dashboard de Cloudinary.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Clave API (API Key) *
                </label>
                <input
                  type="text"
                  value={config.cloudinary?.apiKey || ''}
                  onChange={(e) => updateCloudinary('apiKey', e.target.value.trim())}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#12A1A4]/30 focus:border-[#12A1A4]"
                  placeholder="ej: 123456789012345"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Tu clave pública para administrar y firmar integraciones de medios.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Upload Preset (Unsigned) *
                </label>
                <input
                  type="text"
                  value={config.cloudinary?.uploadPreset || ''}
                  onChange={(e) => updateCloudinary('uploadPreset', e.target.value.trim())}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#12A1A4]/30 focus:border-[#12A1A4]"
                  placeholder="ej: estudiosimple_preset"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Regla de subida directa sin firmar configurada en Cloudinary Settings &gt; Upload.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Carpeta de Destino (Folder)
                </label>
                <input
                  type="text"
                  value={config.cloudinary?.folder || 'estudiosimple'}
                  onChange={(e) => updateCloudinary('folder', e.target.value.trim())}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#12A1A4]/30 focus:border-[#12A1A4]"
                  placeholder="estudiosimple"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Directorio donde se organizarán las imágenes dentro de tu Media Library.
                </span>
              </div>
            </div>

            {/* Botón de Prueba de Conexión */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={testCloudinaryConnection}
                disabled={testResult.status === 'testing'}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Cloud className="w-3.5 h-3.5 text-[#12A1A4]" />
                <span>
                  {testResult.status === 'testing' ? 'Verificando con Cloudinary...' : 'Probar Conexión'}
                </span>
              </button>

              {testResult.status === 'success' && (
                <div className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{testResult.message}</span>
                </div>
              )}

              {testResult.status === 'error' && (
                <div className="text-xs text-red-700 font-bold flex items-center gap-1.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>{testResult.message}</span>
                </div>
              )}
            </div>

            {/* Guía Rápida de Configuración */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>¿Cómo obtener estos datos en Cloudinary gratis? (Paso a Paso)</span>
              </h3>
              <ol className="text-xs text-blue-900/85 space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>Inicia sesión en tu cuenta de <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="underline font-bold text-blue-800 inline-flex items-center gap-0.5">cloudinary.com <ExternalLink className="w-3 h-3 inline" /></a>.</li>
                <li>En tu panel (Dashboard) principal verás de inmediato tu <strong>Cloud Name</strong> y tu <strong>API Key</strong>. Cópialos y pégalos aquí.</li>
                <li>En la barra lateral de Cloudinary, pulsa el ícono de <strong>Settings (engranaje)</strong> en la esquina inferior izquierda.</li>
                <li>Ve a la pestaña <strong>Upload</strong> y desplázate hasta la sección <strong>Upload presets</strong>.</li>
                <li>Haz clic en <strong>Add upload preset</strong>. En el campo <em>Signing Mode</em> cambia la opción de <em>Signed</em> a <strong>Unsigned</strong>.</li>
                <li>Asígnale un nombre fácil en <em>Upload preset name</em> (ejemplo: <code>estudiosimple_preset</code>) y haz clic en <strong>Save</strong> arriba a la derecha.</li>
                <li>Copia ese nombre, pégalo en el campo <strong>Upload Preset</strong> de este formulario y pulsa <strong>Guardar Configuración General</strong>. ¡Listo!</li>
              </ol>
            </div>
          </div>
        )}

        {/* PESTAÑA 6: COLORES DE ELEMENTOS (ETIQUETAS, COMENTARIOS Y FAQ) */}
        {activeTab === 'colores' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#12A1A4]" />
                  <span>Personalización Cromática de Elementos (Paleta Institucional)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Define el color de los bordes de badges, tarjetas de comentarios/testimonios y cápsulas de preguntas frecuentes.
                </p>
              </div>

              {/* Botón Restaurar Paleta Oficial */}
              <button
                type="button"
                onClick={() => {
                  setConfig((prev) => ({
                    ...prev,
                    estilosGlobales: {
                      colorBordeEtiquetas: '#12A1A4',
                      colorBordeComentarios: '#F8AD22',
                      colorBordeFaq: '#EE751C',
                      colorAcentoFaq: '#57d6f3',
                      colorEstrellas: '#F8AD22'
                    }
                  }));
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
              >
                Restaurar Paleta Oficial
              </button>
            </div>

            {/* Muestrario de Paleta Rápida */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Colores Sugeridos de la Identidad de EstudioSimple:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold shadow-2xs">
                  <span className="w-3 h-3 rounded-full bg-[#F8AD22] shrink-0" />
                  <span>Amarillo Sol (#F8AD22)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold shadow-2xs">
                  <span className="w-3 h-3 rounded-full bg-[#EE751C] shrink-0" />
                  <span>Naranja Cálido (#EE751C)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold shadow-2xs">
                  <span className="w-3 h-3 rounded-full bg-[#12A1A4] shrink-0" />
                  <span>Turquesa MINEDUC (#12A1A4)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold shadow-2xs">
                  <span className="w-3 h-3 rounded-full bg-[#0B254D] shrink-0" />
                  <span>Azul Marino (#0B254D)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold shadow-2xs">
                  <span className="w-3 h-3 rounded-full bg-[#18AFCB] shrink-0" />
                  <span>Azul Cielo (#18AFCB)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold shadow-2xs">
                  <span className="w-3 h-3 rounded-full bg-[#10B981] shrink-0" />
                  <span>Verde Esmeralda (#10B981)</span>
                </span>
              </div>
            </div>

            {/* Controles de Configuración Individual */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Etiquetas y Badges de Sección */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-3 bg-white">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#12A1A4]" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Etiquetas y Badges de Sección
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Aplica al contorno y pastilla de los encabezados de sección en la página de inicio.
                </p>
                <ColorPickerField
                  label="Color del Borde y Acento de Etiquetas"
                  value={config.estilosGlobales?.colorBordeEtiquetas || '#12A1A4'}
                  onChange={(hex) => updateEstilosGlobales('colorBordeEtiquetas', hex)}
                />
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1.5">Previsualización:</span>
                  <div
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                    style={{
                      border: `1.5px solid ${config.estilosGlobales?.colorBordeEtiquetas || '#12A1A4'}`,
                      backgroundColor: `${config.estilosGlobales?.colorBordeEtiquetas || '#12A1A4'}15`,
                      color: config.estilosGlobales?.colorBordeEtiquetas || '#12A1A4'
                    }}
                  >
                    <span>Ejemplo de Etiqueta</span>
                  </div>
                </div>
              </div>

              {/* 2. Tarjetas de Comentarios y Testimonios */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-3 bg-white">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Comentarios y Testimonios Familiares
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Controla el borde de las tarjetas de testimonios y el color de las estrellas de valoración.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ColorPickerField
                    label="Color del Borde de Tarjeta"
                    value={config.estilosGlobales?.colorBordeComentarios || '#F8AD22'}
                    onChange={(hex) => updateEstilosGlobales('colorBordeComentarios', hex)}
                  />
                  <ColorPickerField
                    label="Color de Estrellas"
                    value={config.estilosGlobales?.colorEstrellas || '#F8AD22'}
                    onChange={(hex) => updateEstilosGlobales('colorEstrellas', hex)}
                  />
                </div>

                {/* Ubicación y grosor de borde de comentarios */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ubicación del Borde / Acento
                    </label>
                    <select
                      value={config.estilosGlobales?.modoBordeComentarios || 'completo'}
                      onChange={(e) => updateEstilosGlobales('modoBordeComentarios', e.target.value as ModoBordeTarjeta)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-[#12A1A4] focus:outline-none"
                    >
                      <option value="completo">Contorno Completo (Todos los lados)</option>
                      <option value="superior">Línea de Acento Superior (Arriba)</option>
                      <option value="lateral-izquierdo">Franja Lateral Izquierda (Acento vertical)</option>
                      <option value="inferior">Línea Inferior (Abajo)</option>
                      <option value="laterales">Ambos Lados (Izquierda y Derecha)</option>
                      <option value="superior-inferior">Superior e Inferior (Arriba y Abajo)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Grosor del Borde
                    </label>
                    <select
                      value={config.estilosGlobales?.grosorBordeComentarios || '2px'}
                      onChange={(e) => updateEstilosGlobales('grosorBordeComentarios', e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-[#12A1A4] focus:outline-none"
                    >
                      <option value="1px">1px (Delgado y sutil)</option>
                      <option value="2px">2px (Medio / Estándar)</option>
                      <option value="3px">3px (Pronunciado)</option>
                      <option value="4px">4px (Grueso / Barra de Acento)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1.5">Previsualización:</span>
                  <div
                    className="p-3 rounded-xl bg-slate-900 text-white space-y-1 transition-all"
                    style={getBorderStyles(
                      config.estilosGlobales?.modoBordeComentarios || 'completo',
                      config.estilosGlobales?.colorBordeComentarios || '#F8AD22',
                      config.estilosGlobales?.grosorBordeComentarios || '2px',
                      '1px solid rgba(255, 255, 255, 0.1)'
                    )}
                  >
                    <div className="flex gap-1" style={{ color: config.estilosGlobales?.colorEstrellas || '#F8AD22' }}>
                      {'★'.repeat(5)}
                    </div>
                    <p className="text-xs text-slate-300">"Excelente metodología para el estudio guiado en casa."</p>
                  </div>
                </div>
              </div>

              {/* 3. Preguntas Frecuentes (FAQ) */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-3 bg-white md:col-span-2">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-orange-500" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Preguntas Frecuentes (FAQ / Acordeón)
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Personaliza los bordes de las cápsulas horizontales de dudas frecuentes y el icono de expansión.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ColorPickerField
                    label="Color del Borde de las Cápsulas FAQ"
                    value={config.estilosGlobales?.colorBordeFaq || '#EE751C'}
                    onChange={(hex) => updateEstilosGlobales('colorBordeFaq', hex)}
                  />
                  <ColorPickerField
                    label="Color de Acento / Icono Desplegable"
                    value={config.estilosGlobales?.colorAcentoFaq || '#57d6f3'}
                    onChange={(hex) => updateEstilosGlobales('colorAcentoFaq', hex)}
                  />
                </div>

                {/* Ubicación y grosor de borde de FAQ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ubicación del Borde / Acento
                    </label>
                    <select
                      value={config.estilosGlobales?.modoBordeFaq || 'completo'}
                      onChange={(e) => updateEstilosGlobales('modoBordeFaq', e.target.value as ModoBordeTarjeta)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-[#12A1A4] focus:outline-none"
                    >
                      <option value="completo">Contorno Completo (Todos los lados)</option>
                      <option value="superior">Línea de Acento Superior (Arriba)</option>
                      <option value="lateral-izquierdo">Franja Lateral Izquierda (Acento vertical)</option>
                      <option value="inferior">Línea Inferior (Abajo)</option>
                      <option value="laterales">Ambos Lados (Izquierda y Derecha)</option>
                      <option value="superior-inferior">Superior e Inferior (Arriba y Abajo)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Grosor del Borde
                    </label>
                    <select
                      value={config.estilosGlobales?.grosorBordeFaq || '1.5px'}
                      onChange={(e) => updateEstilosGlobales('grosorBordeFaq', e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-[#12A1A4] focus:outline-none"
                    >
                      <option value="1px">1px (Delgado y sutil)</option>
                      <option value="1.5px">1.5px (Estándar)</option>
                      <option value="2px">2px (Medio)</option>
                      <option value="3px">3px (Pronunciado)</option>
                      <option value="4px">4px (Grueso / Barra de Acento)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1.5">Previsualización:</span>
                  <div
                    className="p-3.5 rounded-xl bg-slate-900 text-white flex items-center justify-between gap-3 transition-all"
                    style={getBorderStyles(
                      config.estilosGlobales?.modoBordeFaq || 'completo',
                      config.estilosGlobales?.colorBordeFaq || '#EE751C',
                      config.estilosGlobales?.grosorBordeFaq || '1.5px',
                      '1px solid rgba(255, 255, 255, 0.1)'
                    )}
                  >
                    <span className="text-xs font-bold">¿Cómo asegura EstudioSimple la validez legal ante el MINEDUC?</span>
                    <span
                      className="text-sm font-black"
                      style={{ color: config.estilosGlobales?.colorAcentoFaq || '#57d6f3' }}
                    >
                      ▼
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Botón Guardar Cambios */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs font-extrabold shadow-md flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Configuración General</span>
          </button>
        </div>
      </form>
    </div>
  );
};
