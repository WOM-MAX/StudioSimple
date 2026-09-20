import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { CmsSection, CmsBlockType } from '../../../types/cms';
import { ColorPickerField } from '../../common/ColorPickerField';
import { CloudinaryImageUploader } from '../../common/CloudinaryImageUploader';
import { getBorderStyles } from '../../common/borderStyles';
import { loadSiteConfig, saveSiteConfig } from '../../../data/initialCmsExtrasData';

const isHexDark = (hex?: string): boolean => {
  if (!hex || hex === 'transparent') return false;
  if (hex.startsWith('#')) {
    const c = hex.substring(1);
    const rgb = parseInt(c.length === 3 ? c.split('').map(x => x + x).join('') : c, 16);
    if (!isNaN(rgb)) {
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;
      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return luma < 140;
    }
  }
  return false;
};

interface BlockFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (section: CmsSection) => void;
  section: CmsSection | null; // null if creating a new block
  defaultOrder?: number;
}

export const BlockFormModal: React.FC<BlockFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  section,
  defaultOrder = 0
}) => {
  const [tipoBloque, setTipoBloque] = useState<CmsBlockType>('HERO');
  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [config, setConfig] = useState<Record<string, any>>({});

  useEffect(() => {
    if (section) {
      setTipoBloque(section.tipoBloque);
      setTitulo(section.titulo || '');
      setSubtitulo(section.subtitulo || '');
      if (section.tipoBloque === 'CINTA_NOTICIAS') {
        const siteCfg = loadSiteConfig();
        const existingNoticias = section.configuracion?.noticias || siteCfg.cintaNoticias?.noticias || [];
        setConfig({
          ...(siteCfg.cintaNoticias || {}),
          ...(section.configuracion || {}),
          noticias: existingNoticias
        });
      } else {
        setConfig(section.configuracion || {});
      }
    } else {
      // Nuevo bloque limpio
      setTipoBloque('HERO');
      setTitulo('');
      setSubtitulo('');
      setConfig({});
    }
  }, [section, isOpen]);

  if (!isOpen) return null;

  const handleBlockTypeChange = (newType: CmsBlockType) => {
    setTipoBloque(newType);
    if (newType === 'CINTA_NOTICIAS') {
      const siteCfg = loadSiteConfig();
      setConfig({
        ...(siteCfg.cintaNoticias || {}),
        noticias: siteCfg.cintaNoticias?.noticias || []
      });
    } else {
      // Limpiar y cargar valores por defecto limpios según el bloque
      setConfig({});
    }
    setTitulo('');
    setSubtitulo('');
  };

  const handleConfigChange = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const savedSection: CmsSection = {
      id: section ? section.id : `sec-${Date.now()}`,
      tipoBloque,
      orden: section ? section.orden : defaultOrder,
      activo: section ? section.activo : true,
      titulo: titulo.trim() || getDefaultTitleForType(tipoBloque),
      subtitulo: subtitulo.trim(),
      configuracion: config
    };

    if (tipoBloque === 'CINTA_NOTICIAS') {
      try {
        const siteConfig = loadSiteConfig();
        saveSiteConfig({
          ...siteConfig,
          cintaNoticias: {
            ...(siteConfig.cintaNoticias || {}),
            ...config,
            noticias: config.noticias || siteConfig.cintaNoticias?.noticias || [],
            activo: savedSection.activo
          }
        });
        window.dispatchEvent(new Event('storage'));
      } catch (err) {
        console.error('Error sincronizando siteConfig desde BlockFormModal:', err);
      }
    }

    onSave(savedSection);
    onClose();
  };

  const getDefaultTitleForType = (type: CmsBlockType): string => {
    switch (type) {
      case 'PAGE_HEADER': return 'Encabezado Institucional';
      case 'HERO': return 'Cabecera Hero';
      case 'IMAGEN_TEXTO': return 'Imagen y Texto';
      case 'TEXTO':
      case 'RICHTEXT': return 'Contenido de Texto';
      case 'TARJETAS': return 'Características y Pilares';
      case 'DESCARGAS_LIST': return 'Documentos y Descargas';
      case 'LINEA_TIEMPO': return 'Ruta y Proceso de Aprendizaje';
      case 'ACORDEON':
      case 'FAQ': return 'Preguntas Frecuentes';
      case 'CTA_BOTONES':
      case 'CTA': return 'Llamado a la Acción';
      case 'TESTIMONIOS': return 'Opiniones de Familias';
      case 'GALERIA_MINI': return 'Galería Multimedia';
      case 'EQUIPO': return 'Equipo Pedagógico';
      case 'VIDEO': return 'Video Explicativo';
      case 'ESTADISTICAS': return 'Cifras Clave';
      case 'CONTACTO_INFO': return 'Información de Contacto';
      case 'ALERTA': return 'Aviso Importante';
      case 'CINTA_NOTICIAS': return 'Cinta de Noticias';
      case 'ESPACIADOR': return 'Espaciador';
      case 'JOURNAL': return 'Artículos del Blog';
      case 'METODO': return 'Método en 8 Pasos';
      case 'SIMULADOR': return 'Simulador MINEDUC';
      case 'PRICING': return 'Planes y Precios';
      case 'EVENTOS': return 'Calendario MINEDUC';
      default: return 'Nueva Sección';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header del Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 className="text-base font-black text-slate-800 tracking-tight">
              {section ? `Editar Bloque: ${section.titulo || section.tipoBloque}` : 'Añadir Nuevo Bloque'}
            </h2>
            <p className="text-xs text-slate-500">
              {section ? 'Modifica el contenido y los estilos de este bloque' : 'Selecciona el tipo de bloque y define su contenido limpio'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario Dinámico */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-800">
          {/* Selector de Tipo de Bloque con Optgroups Estilo Colegio Acrópolis */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tipo de Bloque
            </label>
            <select
              value={tipoBloque}
              onChange={(e) => handleBlockTypeChange(e.target.value as CmsBlockType)}
              disabled={!!section}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-semibold text-slate-800 focus:border-[#12A1A4] focus:outline-none focus:ring-2 focus:ring-[#12A1A4]/20 disabled:bg-slate-100 disabled:text-slate-500 cursor-pointer shadow-xs"
            >
              <optgroup label="📢 Contenido y Elementos Dinámicos">
                <option value="JOURNAL">Journal / Blog Pedagógico (Artículos y Novedades)</option>
                <option value="EVENTOS">Calendario Oficial de Eventos MINEDUC</option>
                <option value="CINTA_NOTICIAS">Cinta de Noticias (Ticker Superior)</option>
                <option value="ALERTA">Cintillo de Alerta / Info</option>
                <option value="PAGE_HEADER">Encabezado Institucional (Título central destacado)</option>
                <option value="HERO">Cabecera Hero Personalizada (Imagen + Título)</option>
                <option value="IMAGEN_TEXTO">Imagen y Texto (Diseño 50/50)</option>
                <option value="TEXTO">Bloque de Texto Enrich (Párrafos y Títulos)</option>
                <option value="TARJETAS">Grilla de Tarjetas (Características)</option>
                <option value="DESCARGAS_LIST">Lista de Documentos Descargables (PDFs/Guías)</option>
                <option value="LINEA_TIEMPO">Pasos y Proceso / Línea de Tiempo (Ruta pedagógica)</option>
                <option value="ACORDEON">Acordeón (Preguntas/Documentos)</option>
                <option value="CTA_BOTONES">Llamado a la Acción (Botones)</option>
                <option value="TESTIMONIOS">Testimonios (Grilla de citas)</option>
                <option value="GALERIA_MINI">Galería de Imágenes (Grid)</option>
                <option value="EQUIPO">Equipo Pedagógico y Mentores</option>
                <option value="VIDEO">Video Integrado (YouTube/Vimeo)</option>
                <option value="ESTADISTICAS">Métricas y Estadísticas (Números)</option>
                <option value="CONTACTO_INFO">Información de Contacto y Mapa</option>
                <option value="ESPACIADOR">Espaciador / Línea Divisoria</option>
              </optgroup>

              <optgroup label="⚡ Secciones del Sistema (Página de Inicio)">
                <option value="HERO_SYSTEM">Hero Principal Interactivo (Frontis Scrubber)</option>
                <option value="METODO">Método en 8 Pasos (Pantalla y Cuaderno)</option>
                <option value="SIMULADOR">Simulador de Examen Libre MINEDUC (4 Alternativas)</option>
                <option value="PRICING">Planes y Membresías Familiares</option>
              </optgroup>
            </select>
          </div>

          {/* Campos Básicos de Título y Subtítulo (Salvo para bloques que no lo requieren como Espaciador) */}
          {tipoBloque !== 'ESPACIADOR' && tipoBloque !== 'HERO_SYSTEM' && (
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Título del Bloque *
                </label>
                <input
                  type="text"
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Escribe el título visible..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#12A1A4]/30 focus:border-[#12A1A4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subtítulo / Bajada Descriptiva (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={subtitulo}
                  onChange={(e) => setSubtitulo(e.target.value)}
                  placeholder="Breve explicación o contexto..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#12A1A4]/30 focus:border-[#12A1A4]"
                />
              </div>
            </div>
          )}

          {/* =========================================================
              FORMULARIOS ESPECÍFICOS LIMPIOS POR TIPO DE BLOQUE
             ========================================================= */}

          {/* 1. PAGE_HEADER */}
          {tipoBloque === 'PAGE_HEADER' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Personalización del Encabezado
              </span>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Palabra o Frase Resaltada</label>
                <input
                  type="text"
                  value={config.highlight || ''}
                  onChange={(e) => handleConfigChange('highlight', e.target.value)}
                  placeholder="Ej: Oficial MINEDUC"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>
              <div>
                <CloudinaryImageUploader
                  label="Imagen de Fondo del Encabezado (Opcional)"
                  recommendedDimensions="1920 x 450 px (Panorámico Estrecho)"
                  value={config.imagenFondo || ''}
                  onChange={(url: string) => handleConfigChange('imagenFondo', url)}
                />
              </div>
            </div>
          )}

          {/* 2. HERO */}
          {tipoBloque === 'HERO' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Cabecera Hero Limpia
              </span>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Insignia Superior (Badge)</label>
                <input
                  type="text"
                  value={config.badgeText || ''}
                  onChange={(e) => handleConfigChange('badgeText', e.target.value)}
                  placeholder="Ej: Novedades 2026"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Texto del Botón CTA</label>
                  <input
                    type="text"
                    value={config.ctaText || ''}
                    onChange={(e) => handleConfigChange('ctaText', e.target.value)}
                    placeholder="Ej: Comenzar Ahora"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Enlace del Botón</label>
                  <input
                    type="text"
                    value={config.ctaUrl || ''}
                    onChange={(e) => handleConfigChange('ctaUrl', e.target.value)}
                    placeholder="Ej: /planes o #contacto"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-mono"
                  />
                </div>
              </div>
              <div>
                <CloudinaryImageUploader
                  label="Imagen de Fondo (Opcional)"
                  recommendedDimensions="1920 x 1080 px (16:9 Panorámico)"
                  value={config.imagenFondo || ''}
                  onChange={(url: string) => handleConfigChange('imagenFondo', url)}
                />
              </div>
            </div>
          )}

          {/* 3. IMAGEN_TEXTO (50/50) */}
          {tipoBloque === 'IMAGEN_TEXTO' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Diseño 50/50 (Imagen y Texto)
              </span>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contenido Textual / Párrafos</label>
                <textarea
                  rows={4}
                  value={config.contenido || ''}
                  onChange={(e) => handleConfigChange('contenido', e.target.value)}
                  placeholder="Escribe la explicación detallada..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Posición de la Imagen</label>
                  <select
                    value={config.posicionImagen || 'left'}
                    onChange={(e) => handleConfigChange('posicionImagen', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value="left">Imagen a la Izquierda</option>
                    <option value="right">Imagen a la Derecha</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Estilo Visual</label>
                  <select
                    value={config.estiloImagen || 'estandar'}
                    onChange={(e) => handleConfigChange('estiloImagen', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value="estandar">Bordes Redondeados Modernos</option>
                    <option value="polaroid">Estilo Fotografía Polaroid</option>
                  </select>
                </div>
              </div>
              <div>
                <CloudinaryImageUploader
                  label="Fotografía o Esquema Adjunto"
                  recommendedDimensions="800 x 800 px (1:1 Cuadrado) o 1200 x 800 px (3:2)"
                  value={config.imagenUrl || ''}
                  onChange={(url: string) => handleConfigChange('imagenUrl', url)}
                />
              </div>
            </div>
          )}

          {/* 4. TEXTO o RICHTEXT */}
          {(tipoBloque === 'TEXTO' || tipoBloque === 'RICHTEXT') && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Cuerpo de Texto Enriquecido
              </span>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Párrafos del Comunicado o Artículo</label>
                <textarea
                  rows={6}
                  value={config.cuerpoTexto || config.contenido || ''}
                  onChange={(e) => {
                    handleConfigChange('cuerpoTexto', e.target.value);
                    handleConfigChange('contenido', e.target.value);
                  }}
                  placeholder="Redacta los párrafos aquí. Puedes separar párrafos con doble salto de línea..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white leading-relaxed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Alineación del Texto</label>
                <select
                  value={config.alineacion || 'left'}
                  onChange={(e) => handleConfigChange('alineacion', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                >
                  <option value="left">Izquierda</option>
                  <option value="center">Centrado</option>
                  <option value="right">Derecha</option>
                </select>
              </div>
            </div>
          )}

          {/* 5. TARJETAS */}
          {tipoBloque === 'TARJETAS' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Grilla de Tarjetas ({((config.tarjetas || []).length)})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = config.tarjetas || [];
                    handleConfigChange('tarjetas', [...current, { titulo: '', descripcion: '', icono: 'check_circle' }]);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#12A1A4]/15 hover:bg-[#12A1A4]/25 text-[#12A1A4] text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Tarjeta</span>
                </button>
              </div>

              {(config.tarjetas || []).length === 0 ? (
                <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
                  <p className="text-xs text-slate-400 font-medium">No hay tarjetas configuradas. Añade una para comenzar.</p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {(config.tarjetas || []).map((t: any, idx: number) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={t.titulo || ''}
                          onChange={(e) => {
                            const updated = [...config.tarjetas];
                            updated[idx] = { ...updated[idx], titulo: e.target.value };
                            handleConfigChange('tarjetas', updated);
                          }}
                          placeholder="Título de la tarjeta"
                          className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = config.tarjetas.filter((_: any, i: number) => i !== idx);
                            handleConfigChange('tarjetas', updated);
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={t.descripcion || ''}
                        onChange={(e) => {
                          const updated = [...config.tarjetas];
                          updated[idx] = { ...updated[idx], descripcion: e.target.value };
                          handleConfigChange('tarjetas', updated);
                        }}
                        placeholder="Descripción o detalle breve..."
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-600"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 6. ACORDEON o FAQ */}
          {(tipoBloque === 'ACORDEON' || tipoBloque === 'FAQ') && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Ítems del Acordeón / Preguntas ({((config.items || []).length)})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = config.items || [];
                    handleConfigChange('items', [...current, { pregunta: '', respuesta: '' }]);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#12A1A4]/15 hover:bg-[#12A1A4]/25 text-[#12A1A4] text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Pregunta</span>
                </button>
              </div>

              {(config.items || []).length === 0 ? (
                <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl bg-white space-y-2">
                  <p className="text-xs text-slate-500 font-medium">No hay preguntas configuradas para este bloque.</p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        handleConfigChange('items', [{ pregunta: '', respuesta: '' }]);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#12A1A4] text-white text-xs font-bold hover:bg-[#0e8284] cursor-pointer"
                    >
                      + Añadir Pregunta
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleConfigChange('items', [
                          {
                            pregunta: '¿Cómo asegura EstudioSimple que mi hijo valide su curso ante el MINEDUC?',
                            respuesta: 'El proceso de Validación de Estudios por Exámenes Libres está normado por el Decreto Exento N° 2272 y el Decreto 67 del Ministerio de Educación de Chile.\n\nEstudioSimple cubre el 100% de las Bases Curriculares oficiales para 3° a 8° Básico en las asignaturas evaluadas.'
                          },
                          {
                            pregunta: 'No soy profesor ni dispongo de muchas horas al día. ¿Puedo guiar a mi hijo?',
                            respuesta: 'Absolutamente. Cada sesión cuenta con mediación pedagógica dual: una guía resolutiva directa para el apoderado que explica en 2 minutos cómo orientar la lección. Todo el proceso toma entre 20 y 30 minutos diarios.'
                          },
                          {
                            pregunta: '¿Por qué el método exige usar un cuaderno físico si es una plataforma web?',
                            respuesta: 'Porque la sobrecarga cognitiva de pasar horas frente a una pantalla reduce la retención. El estudiante consume una cápsula didáctica breve de 15 minutos y traslada de inmediato la resolución manual a su cuaderno escolar análogo.'
                          }
                        ]);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 cursor-pointer"
                    >
                      Cargar Preguntas de Ejemplo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {(config.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={item.pregunta || ''}
                          onChange={(e) => {
                            const updated = [...config.items];
                            updated[idx] = { ...updated[idx], pregunta: e.target.value };
                            handleConfigChange('items', updated);
                          }}
                          placeholder="Pregunta o encabezado desplegable"
                          className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = config.items.filter((_: any, i: number) => i !== idx);
                            handleConfigChange('items', updated);
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={item.respuesta || ''}
                        onChange={(e) => {
                          const updated = [...config.items];
                          updated[idx] = { ...updated[idx], respuesta: e.target.value };
                          handleConfigChange('items', updated);
                        }}
                        placeholder="Respuesta explicativa detallada..."
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-600"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-slate-200">
                <ColorPickerField
                  label="Color de Acento / Icono Desplegable"
                  value={config.colorIcono || '#57d6f3'}
                  onChange={(hex) => handleConfigChange('colorIcono', hex)}
                />
              </div>
            </div>
          )}

          {/* 7. DESCARGAS_LIST */}
          {tipoBloque === 'DESCARGAS_LIST' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Documentos Descargables ({((config.documentos || []).length)})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = config.documentos || [];
                    handleConfigChange('documentos', [...current, { titulo: '', formato: 'PDF', urlDescarga: '' }]);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#12A1A4]/15 hover:bg-[#12A1A4]/25 text-[#12A1A4] text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Archivo</span>
                </button>
              </div>

              {(config.documentos || []).length === 0 ? (
                <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
                  <p className="text-xs text-slate-400 font-medium">No hay documentos cargados. Añade un archivo.</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {(config.documentos || []).map((doc: any, idx: number) => (
                    <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                      <input
                        type="text"
                        value={doc.titulo || ''}
                        onChange={(e) => {
                          const updated = [...config.documentos];
                          updated[idx] = { ...updated[idx], titulo: e.target.value };
                          handleConfigChange('documentos', updated);
                        }}
                        placeholder="Nombre del documento (ej: Guía Oficial Matemática)"
                        className="flex-1 px-2 py-1 rounded-lg border border-slate-300 text-xs font-semibold"
                      />
                      <input
                        type="text"
                        value={doc.formato || 'PDF'}
                        onChange={(e) => {
                          const updated = [...config.documentos];
                          updated[idx] = { ...updated[idx], formato: e.target.value };
                          handleConfigChange('documentos', updated);
                        }}
                        placeholder="PDF"
                        className="w-16 px-2 py-1 rounded-lg border border-slate-300 text-xs text-center uppercase font-bold"
                      />
                      <input
                        type="text"
                        value={doc.urlDescarga || ''}
                        onChange={(e) => {
                          const updated = [...config.documentos];
                          updated[idx] = { ...updated[idx], urlDescarga: e.target.value };
                          handleConfigChange('documentos', updated);
                        }}
                        placeholder="URL de descarga"
                        className="w-40 px-2 py-1 rounded-lg border border-slate-300 text-xs font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = config.documentos.filter((_: any, i: number) => i !== idx);
                          handleConfigChange('documentos', updated);
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 8. TESTIMONIOS */}
          {tipoBloque === 'TESTIMONIOS' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Configuración de Testimonios y Validación Familiar
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Formato de Visualización (Diseño)
                  </label>
                  <select
                    value={config.diseno || 'grilla'}
                    onChange={(e) => handleConfigChange('diseno', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold text-slate-800"
                  >
                    <option value="grilla">Grilla de Tarjetas (2 o 3 columnas)</option>
                    <option value="slider">Carrusel / Slider Horizontal Interactivo</option>
                  </select>
                </div>

              </div>

              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Lista de Testimonios / Reseñas ({((config.testimonios || []).length)})
                    </span>
                    <p className="text-[11px] text-slate-400">
                      {(!config.testimonios || config.testimonios.length === 0)
                        ? 'Actualmente usando testimonios oficiales. Haz clic en "Añadir Testimonio" para agregar los tuyos.'
                        : 'Mostrando tus testimonios personalizados.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const current = config.testimonios || [];
                      handleConfigChange('testimonios', [
                        ...current,
                        { nombre: '', rol: '', cita: '', estrellas: 5, badge: 'Homeschooling' }
                      ]);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#12A1A4]/15 hover:bg-[#12A1A4]/25 text-[#12A1A4] text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir Testimonio</span>
                  </button>
                </div>

                  {(config.testimonios || []).length === 0 ? (
                    <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl bg-white space-y-2">
                      <p className="text-xs text-slate-500 font-medium">No hay testimonios configurados para este bloque.</p>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            handleConfigChange('testimonios', [
                              { nombre: '', rol: '', cita: '', estrellas: 5, badge: 'Homeschooling' }
                            ]);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#12A1A4] text-white text-xs font-bold hover:bg-[#0e8284] cursor-pointer"
                        >
                          + Añadir Testimonio
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleConfigChange('testimonios', [
                              {
                                nombre: 'Claudia M.',
                                rol: 'Mamá de Lucas (5º Básico · Santiago Centro)',
                                cita: 'Cuando Lucas quedó sin cupo en el colegio por el SAE y venía afectado por la convivencia del aula, decidimos dar el paso al homeschooling con temor de no saber qué enseñar. EstudioSimple nos dio una rutina clara: cápsulas breves y ejercicios directos al cuaderno. Rindió sus exámenes libres en noviembre con promedio 6.5 sin lágrimas ni peleas familiares.',
                                estrellas: 5,
                                badge: 'Homeschooling · Caso SAE'
                              },
                              {
                                nombre: 'Rodrigo T.',
                                rol: 'Papá de Sofía (7º Básico · Ñuñoa)',
                                cita: 'En el colegio tradicional, Sofía colapsaba con las pruebas de 40 preguntas y el ruido constante de la sala. Con EstudioSimple estudia a su propio ritmo: 15 minutos en pantalla, escribe en su cuaderno y después practica con ensayos tipo evaluación formal.',
                                estrellas: 5,
                                badge: 'Neurodiversidad · TDAH'
                              },
                              {
                                nombre: 'Marcela V.',
                                rol: 'Mamá trabajadora de Tomás (3º Básico · Maipú)',
                                cita: 'Trabajo todo el día y no soy profesora; no tenía tiempo de armar guías ni buscar temarios en internet hasta la noche. La plataforma me entrega el paso a paso exacto para guiar a Tomás en media hora diaria. Verlo escribir en su cuaderno con entusiasmo no tiene precio.',
                                estrellas: 5,
                                badge: 'Padres Trabajadores'
                              },
                              {
                                nombre: 'Fernando S.',
                                rol: 'Papá de Matías (6º Básico · La Florida)',
                                cita: 'La prueba en el colegio examinador asignado era nuestro gran temor. Matías practicó con los ensayos de la plataforma durante dos meses y el día del examen reconoció de inmediato el formato formal de las preguntas. Aprobó todas las materias con notas sobresalientes.',
                                estrellas: 5,
                                badge: 'Aprobado MINEDUC'
                              }
                            ]);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 cursor-pointer"
                        >
                          Cargar 4 Ejemplos Oficiales
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                      {(config.testimonios || []).map((test: any, idx: number) => (
                        <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                          <div className="grid grid-cols-3 gap-2">
                            <input
                              type="text"
                              value={test.nombre || ''}
                              onChange={(e) => {
                                const updated = [...config.testimonios];
                                updated[idx] = { ...updated[idx], nombre: e.target.value };
                                handleConfigChange('testimonios', updated);
                              }}
                              placeholder="Nombre (ej: Carolina M.)"
                              className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-bold"
                            />
                            <input
                              type="text"
                              value={test.rol || ''}
                              onChange={(e) => {
                                const updated = [...config.testimonios];
                                updated[idx] = { ...updated[idx], rol: e.target.value };
                                handleConfigChange('testimonios', updated);
                              }}
                              placeholder="Rol (ej: Mamá de Mateo, 6° Básico)"
                              className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs"
                            />
                            <input
                              type="text"
                              value={test.badge || ''}
                              onChange={(e) => {
                                const updated = [...config.testimonios];
                                updated[idx] = { ...updated[idx], badge: e.target.value };
                                handleConfigChange('testimonios', updated);
                              }}
                              placeholder="Insignia (ej: Caso SAE)"
                              className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs text-[#12A1A4] font-bold"
                            />
                          </div>
                          <textarea
                            rows={2}
                            value={test.cita || ''}
                            onChange={(e) => {
                              const updated = [...config.testimonios];
                              updated[idx] = { ...updated[idx], cita: e.target.value };
                              handleConfigChange('testimonios', updated);
                            }}
                            placeholder="Comentario o experiencia de la familia..."
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-700"
                          />
                          <CloudinaryImageUploader
                            label="Foto o Avatar de la Familia (Opcional)"
                            recommendedDimensions="200 x 200 px (1:1 Cuadrado)"
                            compact={true}
                            value={test.fotoUrl || ''}
                            onChange={(url: string) => {
                              const updated = [...config.testimonios];
                              updated[idx] = { ...updated[idx], fotoUrl: url };
                              handleConfigChange('testimonios', updated);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              <div className="pt-2 border-t border-slate-200">
                <ColorPickerField
                  label="Color de Estrellas"
                  value={config.colorEstrellas || '#F8AD22'}
                  onChange={(hex) => handleConfigChange('colorEstrellas', hex)}
                />
              </div>
            </div>
          )}

          {/* 9. VIDEO */}
          {tipoBloque === 'VIDEO' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Video Integrado (Cloudinary / YouTube / Vimeo)
              </span>
              <div>
                <CloudinaryImageUploader
                  label="Subir Archivo de Video con Cloudinary"
                  resourceType="video"
                  recommendedDimensions="1920 x 1080 px o 1280 x 720 px (16:9 MP4/WebM, máx 60 MB)"
                  value={config.videoUrl || ''}
                  onChange={(url: string) => handleConfigChange('videoUrl', url)}
                  helperText="Puedes subir directamente un archivo MP4 o WebM a Cloudinary, o ingresar una URL directa de YouTube / Vimeo abajo."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">O Ingresar Enlace de YouTube / Vimeo / MP4</label>
                <input
                  type="text"
                  value={config.videoUrl || ''}
                  onChange={(e) => handleConfigChange('videoUrl', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... o https://vimeo.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-mono"
                />
              </div>
            </div>
          )}

          {/* 9.1 CTA_BOTONES o CTA */}
          {(tipoBloque === 'CTA_BOTONES' || tipoBloque === 'CTA') && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Llamado a la Acción (Botones de Conversión)
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Texto Botón Principal</label>
                  <input
                    type="text"
                    value={config.botonPrincipalTexto || ''}
                    onChange={(e) => handleConfigChange('botonPrincipalTexto', e.target.value)}
                    placeholder="Ej: Ver Planes y Precios"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Enlace Botón Principal</label>
                  <input
                    type="text"
                    value={config.botonPrincipalUrl || ''}
                    onChange={(e) => handleConfigChange('botonPrincipalUrl', e.target.value)}
                    placeholder="/planes"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Texto Botón Secundario (Opcional)</label>
                  <input
                    type="text"
                    value={config.botonSecundarioTexto || ''}
                    onChange={(e) => handleConfigChange('botonSecundarioTexto', e.target.value)}
                    placeholder="Ej: Contactar Mentor"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Enlace Botón Secundario</label>
                  <input
                    type="text"
                    value={config.botonSecundarioUrl || ''}
                    onChange={(e) => handleConfigChange('botonSecundarioUrl', e.target.value)}
                    placeholder="#contacto"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 9.2 LINEA_TIEMPO */}
          {tipoBloque === 'LINEA_TIEMPO' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Pasos o Fases del Proceso ({((config.pasos || []).length)})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = config.pasos || [];
                    handleConfigChange('pasos', [...current, { numero: current.length + 1, titulo: '', descripcion: '' }]);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#12A1A4]/15 hover:bg-[#12A1A4]/25 text-[#12A1A4] text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Paso</span>
                </button>
              </div>

              {(config.pasos || []).map((p: any, idx: number) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#12A1A4] text-white text-xs font-black flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={p.titulo || ''}
                      onChange={(e) => {
                        const updated = [...config.pasos];
                        updated[idx] = { ...updated[idx], titulo: e.target.value };
                        handleConfigChange('pasos', updated);
                      }}
                      placeholder="Título del paso (ej: Diagnóstico y Nivelación)"
                      className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = config.pasos.filter((_: any, i: number) => i !== idx);
                        handleConfigChange('pasos', updated);
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={p.descripcion || ''}
                    onChange={(e) => {
                      const updated = [...config.pasos];
                      updated[idx] = { ...updated[idx], descripcion: e.target.value };
                      handleConfigChange('pasos', updated);
                    }}
                    placeholder="Descripción detallada de este paso..."
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-600"
                  />
                </div>
              ))}
            </div>
          )}

          {/* 9.3 GALERIA_MINI */}
          {tipoBloque === 'GALERIA_MINI' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Configuración de Galería Multimedia y Cuadernos
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Origen de las Imágenes
                  </label>
                  <select
                    value={config.origenDatos || 'global'}
                    onChange={(e) => handleConfigChange('origenDatos', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold text-slate-800"
                  >
                    <option value="global">Galería Global del Sistema (Recomendado)</option>
                    <option value="manual">Fotografías Manuales para este Bloque</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Formato de Visualización (Diseño)
                  </label>
                  <select
                    value={config.diseno || 'grilla'}
                    onChange={(e) => handleConfigChange('diseno', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold text-slate-800"
                  >
                    <option value="grilla">Grilla de Tarjetas (2 o 3 columnas)</option>
                    <option value="slider">Carrusel / Slider Horizontal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Filtrar por Categoría Inicial
                  </label>
                  <select
                    value={config.categoriaFiltro || 'todas'}
                    onChange={(e) => handleConfigChange('categoriaFiltro', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold text-slate-800"
                  >
                    <option value="todas">Todas las Categorías</option>
                    <option value="Cuadernos de Estudiantes">Cuadernos de Estudiantes</option>
                    <option value="Infografías del Método">Infografías del Método</option>
                    <option value="Material Didáctico">Material Didáctico</option>
                    <option value="Eventos">Eventos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Límite Máximo de Fotografías
                  </label>
                  <select
                    value={config.limite ?? 6}
                    onChange={(e) => handleConfigChange('limite', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold text-slate-800"
                  >
                    <option value={3}>3 fotografías</option>
                    <option value={6}>6 fotografías</option>
                    <option value={9}>9 fotografías</option>
                    <option value={12}>12 fotografías</option>
                    <option value={0}>Todas las disponibles</option>
                  </select>
                </div>
              </div>

              {config.origenDatos !== 'manual' ? (
                <div className="p-3.5 rounded-xl bg-[#12A1A4]/10 border border-[#12A1A4]/20 text-xs text-[#0B254D] space-y-1">
                  <p className="font-bold flex items-center gap-1.5 text-[#12A1A4]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Sincronización Automática con la Galería Visual</span>
                  </p>
                  <p className="text-slate-600 leading-relaxed font-normal">
                    Este bloque cargará dinámicamente las fotografías subidas en la pestaña "Galería Visual" del panel de administración, con filtros interactivos por categoría y visor Lightbox ampliado.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Fotografías Manuales ({((config.imagenes || []).length)})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const current = config.imagenes || [];
                        handleConfigChange('imagenes', [...current, { url: '', titulo: '', pieFoto: '' }]);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#12A1A4]/15 hover:bg-[#12A1A4]/25 text-[#12A1A4] text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Añadir Foto</span>
                    </button>
                  </div>

                  {(config.imagenes || []).length === 0 ? (
                    <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
                      <p className="text-xs text-slate-400 font-medium">No hay fotos manuales agregadas. Añade una para comenzar.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {(config.imagenes || []).map((img: any, idx: number) => (
                        <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-700">Foto #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = config.imagenes.filter((_: any, i: number) => i !== idx);
                                handleConfigChange('imagenes', updated);
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <CloudinaryImageUploader
                            label="Imagen con Cloudinary"
                            recommendedDimensions="800 x 600 px (4:3) o 1200 x 800 px (3:2)"
                            value={img.url || ''}
                            onChange={(url: string) => {
                              const updated = [...config.imagenes];
                              updated[idx] = { ...updated[idx], url };
                              handleConfigChange('imagenes', updated);
                            }}
                          />
                          <input
                            type="text"
                            value={img.titulo || ''}
                            onChange={(e) => {
                              const updated = [...config.imagenes];
                              updated[idx] = { ...updated[idx], titulo: e.target.value };
                              handleConfigChange('imagenes', updated);
                            }}
                            placeholder="Título o pie de foto (ej: Registro en Cuaderno de Matemáticas)"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 9.4 EQUIPO */}
          {tipoBloque === 'EQUIPO' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Miembros del Equipo / Mentores ({((config.miembros || []).length)})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = config.miembros || [];
                    handleConfigChange('miembros', [...current, { nombre: '', cargo: '', bio: '', fotoUrl: '' }]);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#12A1A4]/15 hover:bg-[#12A1A4]/25 text-[#12A1A4] text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Mentor</span>
                </button>
              </div>

              {(config.miembros || []).map((m: any, idx: number) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Perfil #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = config.miembros.filter((_: any, i: number) => i !== idx);
                        handleConfigChange('miembros', updated);
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={m.nombre || ''}
                      onChange={(e) => {
                        const updated = [...config.miembros];
                        updated[idx] = { ...updated[idx], nombre: e.target.value };
                        handleConfigChange('miembros', updated);
                      }}
                      placeholder="Nombre (ej: Prof. Roberto Díaz)"
                      className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={m.cargo || ''}
                      onChange={(e) => {
                        const updated = [...config.miembros];
                        updated[idx] = { ...updated[idx], cargo: e.target.value };
                        handleConfigChange('miembros', updated);
                      }}
                      placeholder="Cargo (ej: Mentor de Ciencias)"
                      className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                  <CloudinaryImageUploader
                    label="Foto de Perfil"
                    recommendedDimensions="400 x 400 px (1:1 Cuadrado)"
                    value={m.fotoUrl || ''}
                    onChange={(url: string) => {
                      const updated = [...config.miembros];
                      updated[idx] = { ...updated[idx], fotoUrl: url };
                      handleConfigChange('miembros', updated);
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* 9.5 ESTADISTICAS */}
          {tipoBloque === 'ESTADISTICAS' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Métricas y Cifras Clave ({((config.metricas || []).length)})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = config.metricas || [];
                    handleConfigChange('metricas', [...current, { cifra: '100%', etiqueta: 'Cobertura' }]);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#12A1A4]/15 hover:bg-[#12A1A4]/25 text-[#12A1A4] text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Métrica</span>
                </button>
              </div>

              {(config.metricas || []).map((met: any, idx: number) => (
                <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                  <input
                    type="text"
                    value={met.cifra || ''}
                    onChange={(e) => {
                      const updated = [...config.metricas];
                      updated[idx] = { ...updated[idx], cifra: e.target.value };
                      handleConfigChange('metricas', updated);
                    }}
                    placeholder="Cifra (ej: 628)"
                    className="w-24 px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-black text-center text-[#12A1A4]"
                  />
                  <input
                    type="text"
                    value={met.etiqueta || ''}
                    onChange={(e) => {
                      const updated = [...config.metricas];
                      updated[idx] = { ...updated[idx], etiqueta: e.target.value };
                      handleConfigChange('metricas', updated);
                    }}
                    placeholder="Etiqueta (ej: OAs MINEDUC Cubiertos)"
                    className="flex-1 px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = config.metricas.filter((_: any, i: number) => i !== idx);
                      handleConfigChange('metricas', updated);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 9.6 CONTACTO_INFO */}
          {tipoBloque === 'CONTACTO_INFO' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Datos de Contacto y Atención
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email de Contacto</label>
                  <input
                    type="email"
                    value={config.email || ''}
                    onChange={(e) => handleConfigChange('email', e.target.value)}
                    placeholder="contacto@estudiosimple.cl"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp de Orientación</label>
                  <input
                    type="text"
                    value={config.whatsApp || ''}
                    onChange={(e) => handleConfigChange('whatsApp', e.target.value)}
                    placeholder="+56 9 8765 4321"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 10. ALERTA */}
          {tipoBloque === 'ALERTA' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Cintillo de Alerta / Notificación
              </span>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Alerta</label>
                <select
                  value={config.tipoAlerta || 'info'}
                  onChange={(e) => handleConfigChange('tipoAlerta', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold"
                >
                  <option value="info">Informativa (Azul / Turquesa)</option>
                  <option value="advertencia">Advertencia (Amarillo / Naranja)</option>
                  <option value="exito">Confirmación / Éxito (Verde Esmeralda)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Texto del Aviso</label>
                <input
                  type="text"
                  value={config.mensaje || ''}
                  onChange={(e) => handleConfigChange('mensaje', e.target.value)}
                  placeholder="Ej: Inscripciones para exámenes libres abiertas hasta el 15 de Octubre."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>
            </div>
          )}

          {/* 11. CINTA_NOTICIAS */}
          {tipoBloque === 'CINTA_NOTICIAS' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Configuración Cinta de Noticias (Ticker CNN)
              </span>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Etiqueta Principal</label>
                <input
                  type="text"
                  value={config.etiquetaPrincipal || ''}
                  onChange={(e) => handleConfigChange('etiquetaPrincipal', e.target.value)}
                  placeholder="Ej: MINEDUC AL DÍA"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold"
                />
              </div>

              {/* Titulares de Noticias Rotativos */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Titulares de Noticias ({((config.noticias || []).length)})
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Mensajes que rotan continuamente en la marquesina superior.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = config.noticias || [];
                      handleConfigChange('noticias', [...cur, { etiqueta: 'AVISO', texto: '' }]);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-[#12A1A4]/15 hover:bg-[#12A1A4]/25 text-[#12A1A4] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir Noticia</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(!config.noticias || config.noticias.length === 0) ? (
                    <div className="p-3 text-center bg-white rounded-xl border border-dashed border-slate-300 text-slate-400 text-xs">
                      No hay titulares configurados. Haz clic en "Añadir Noticia" para agregar uno.
                    </div>
                  ) : (
                    config.noticias.map((noticia: any, idx: number) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={noticia.etiqueta || ''}
                            onChange={(e) => {
                              const updated = [...(config.noticias || [])];
                              updated[idx] = { ...updated[idx], etiqueta: e.target.value };
                              handleConfigChange('noticias', updated);
                            }}
                            placeholder="Etiqueta (ej: URGENTE)"
                            className="w-32 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-[#12A1A4] bg-slate-50 focus:bg-white"
                          />
                          <input
                            type="text"
                            value={noticia.texto || ''}
                            onChange={(e) => {
                              const updated = [...(config.noticias || [])];
                              updated[idx] = { ...updated[idx], texto: e.target.value };
                              handleConfigChange('noticias', updated);
                            }}
                            placeholder="Texto del titular..."
                            className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-hidden focus:border-[#12A1A4]"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (config.noticias || []).filter((_: any, i: number) => i !== idx);
                              handleConfigChange('noticias', updated);
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="Eliminar titular"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Diseño de Filas
                  </label>
                  <select
                    value={config.modoVisual || 'doble'}
                    onChange={(e) => handleConfigChange('modoVisual', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold text-slate-800"
                  >
                    <option value="solo_marquesina">1 Fila: Solo Marquesina continua (Delgada)</option>
                    <option value="solo_titular">1 Fila: Solo Titular rotativo</option>
                    <option value="doble">2 Filas: Doble Barra (Titular + Marquesina)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Grosor / Altura
                  </label>
                  <select
                    value={config.altura || 'normal'}
                    onChange={(e) => handleConfigChange('altura', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold"
                  >
                    <option value="compacta">Compacta (Delgada)</option>
                    <option value="normal">Normal (Estándar · Equilibrada)</option>
                    <option value="amplia">Amplia (Prominente · Mayor presencia)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Alineación del Titular
                  </label>
                  <select
                    value={config.alineacion || 'centrado'}
                    onChange={(e) => handleConfigChange('alineacion', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold"
                  >
                    <option value="centrado">Centrado (En el ancho de la barra)</option>
                    <option value="izquierda">Alineado a la Izquierda</option>
                  </select>
                </div>
              </div>
              <div className="space-y-3">
                <ColorPickerField
                  label="Color de Fondo de la Barra Principal (Titular)"
                  value={config.colorFondo || '#0B254D'}
                  onChange={(hex) => handleConfigChange('colorFondo', hex)}
                />
                <ColorPickerField
                  label="Color del Texto / Titular"
                  value={config.colorTexto || '#FFFFFF'}
                  onChange={(hex) => handleConfigChange('colorTexto', hex)}
                />
                <ColorPickerField
                  label="Color de Fondo Fila Móvil (Marquesina deslizante)"
                  value={config.colorFondoMarquesina || config.colorFondo || '#0B254D'}
                  onChange={(hex) => handleConfigChange('colorFondoMarquesina', hex)}
                  helperText="Color exclusivo de la fila inferior que se mueve de derecha a izquierda."
                />
                <ColorPickerField
                  label="Color de Texto Fila Móvil (Marquesina deslizante)"
                  value={config.colorTextoMarquesina || config.colorTexto || '#FFFFFF'}
                  onChange={(hex) => handleConfigChange('colorTextoMarquesina', hex)}
                  helperText="Color del texto y separadores de la fila inferior que se mueve."
                />
                <ColorPickerField
                  label="Color del Badge / Etiqueta"
                  value={config.colorEtiqueta || '#12A1A4'}
                  onChange={(hex) => handleConfigChange('colorEtiqueta', hex)}
                />
              </div>
            </div>
          )}

          {/* 12. ESPACIADOR */}
          {tipoBloque === 'ESPACIADOR' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Separador Visual
              </span>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Altura del Espaciador (px)</label>
                <input
                  type="number"
                  min={10}
                  max={200}
                  value={config.altura || 40}
                  onChange={(e) => handleConfigChange('altura', Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="mostrarLinea"
                  checked={config.mostrarLinea !== false}
                  onChange={(e) => handleConfigChange('mostrarLinea', e.target.checked)}
                  className="w-4 h-4 rounded text-[#12A1A4]"
                />
                <label htmlFor="mostrarLinea" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Mostrar línea divisoria discreta
                </label>
              </div>
            </div>
          )}

          {/* 13. JOURNAL / BLOG */}
          {tipoBloque === 'JOURNAL' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Módulo Journal / Blog de Noticias
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Filtrar por Categoría</label>
                  <select
                    value={config.categoriaFiltro || 'todas'}
                    onChange={(e) => handleConfigChange('categoriaFiltro', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value="todas">Todas las Categorías</option>
                    <option value="Homeschooling">Homeschooling</option>
                    <option value="Exámenes Libres">Exámenes Libres</option>
                    <option value="MINEDUC">MINEDUC</option>
                    <option value="Didáctica">Didáctica y Consejos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Cantidad Máxima</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={config.limite || 12}
                    onChange={(e) => handleConfigChange('limite', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 14. EVENTOS Y CALENDARIO OFICIAL MINEDUC */}
          {tipoBloque === 'EVENTOS' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Configuración del Calendario de Eventos
              </span>

              {/* Selector de Formato de Diseño */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Formato de Visualización (Diseño)
                </label>
                <select
                  value={config.diseno || 'grilla'}
                  onChange={(e) => handleConfigChange('diseno', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white font-bold text-slate-800 focus:border-[#12A1A4] focus:outline-none"
                >
                  <option value="grilla">Grilla de Tarjetas (Recomendado para páginas institucionales)</option>
                  <option value="slider">Slider / Carrusel Horizontal (Con botones de avance interactivo)</option>
                  <option value="lista">Lista / Agenda Cronológica (Línea de tiempo vertical)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Elige cómo se desplegarán las fechas oficiales y convocatorias en esta sección.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cantidad Máxima de Eventos
                  </label>
                  <select
                    value={config.limite ?? 6}
                    onChange={(e) => handleConfigChange('limite', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold text-slate-800"
                  >
                    <option value={3}>3 eventos</option>
                    <option value={6}>6 eventos</option>
                    <option value={9}>9 eventos</option>
                    <option value={12}>12 eventos</option>
                    <option value={0}>Todos los eventos activos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Filtrar por Categoría
                  </label>
                  <select
                    value={config.tipoFiltro || 'todos'}
                    onChange={(e) => handleConfigChange('tipoFiltro', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold text-slate-800"
                  >
                    <option value="todos">Todos los tipos de eventos</option>
                    <option value="Inscripción MINEDUC">Inscripción MINEDUC</option>
                    <option value="Examen 1ª Oportunidad">Examen 1ª Oportunidad</option>
                    <option value="Examen 2ª Oportunidad">Examen 2ª Oportunidad</option>
                    <option value="Taller para Padres">Taller para Padres</option>
                    <option value="Entrega de Resultados">Entrega de Resultados</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="soloVigentes"
                  checked={config.soloVigentes === true}
                  onChange={(e) => handleConfigChange('soloVigentes', e.target.checked)}
                  className="w-4 h-4 rounded text-[#12A1A4] focus:ring-[#12A1A4]"
                />
                <label htmlFor="soloVigentes" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Mostrar únicamente eventos vigentes (ocultar fechas que ya pasaron)
                </label>
              </div>
            </div>
          )}

          {/* =========================================================
              CONTROL UNIVERSAL DE FONDO, TEXTO Y BORDE (TODAS LAS SECCIONES)
             ========================================================= */}
          {tipoBloque !== 'ESPACIADOR' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                    Personalización Visual: Fondo, Texto y Bordes
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Controla el color de fondo, el contraste tipográfico y los acentos de borde de esta sección.
                  </p>
                </div>
                {(config.colorFondo || config.colorTexto || config.colorBorde || config.colorBordeTarjeta) && (
                  <button
                    type="button"
                    onClick={() => {
                      handleConfigChange('colorFondo', undefined);
                      handleConfigChange('colorTexto', undefined);
                      handleConfigChange('colorBorde', undefined);
                      handleConfigChange('colorBordeTarjeta', undefined);
                      handleConfigChange('modoBorde', undefined);
                      handleConfigChange('grosorBorde', undefined);
                    }}
                    className="text-[11px] text-slate-400 hover:text-red-500 font-semibold transition-colors cursor-pointer"
                  >
                    Restablecer Todo
                  </button>
                )}
              </div>

              {/* Fila 1: Color de Fondo y Contraste de Texto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <ColorPickerField
                    label="Color de Fondo de la Sección"
                    value={config.colorFondo || ''}
                    onChange={(hex) => handleConfigChange('colorFondo', hex)}
                  />

                  {/* Presets Rápidos de Fondo */}
                  <div className="pt-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Presets Rápidos
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: 'Blanco', color: '#FFFFFF', border: true },
                        { label: 'Gris Claro', color: '#F8FAFC', border: true },
                        { label: 'Azul Marino', color: '#0B254D', border: false },
                        { label: 'Azul Noche', color: '#16325C', border: false },
                        { label: 'Turquesa', color: '#12A1A4', border: false },
                        { label: 'Transparente', color: 'transparent', border: true }
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => handleConfigChange('colorFondo', preset.color)}
                          className="px-2 py-1 text-[10px] font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 border border-slate-200 bg-white text-slate-700 shadow-2xs"
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{
                              backgroundColor: preset.color === 'transparent' ? 'white' : preset.color,
                              border: preset.border ? '1px solid #cbd5e1' : 'none'
                            }}
                          />
                          <span>{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contraste / Color de Texto
                    </label>
                    <select
                      value={config.colorTexto || 'auto'}
                      onChange={(e) => handleConfigChange('colorTexto', e.target.value)}
                      className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-[#12A1A4] focus:outline-none cursor-pointer"
                    >
                      <option value="auto">Automático (Según el diseño base del bloque)</option>
                      <option value="claro">Texto Claro (Blanco / Celeste - Para fondos oscuros)</option>
                      <option value="oscuro">Texto Oscuro (Gris Pizarra / Carbón - Para fondos claros)</option>
                    </select>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Garantiza legibilidad si configuras un fondo oscuro o claro.
                    </p>
                  </div>

                  <div>
                    <ColorPickerField
                      label="Color del Borde / Acento"
                      value={config.colorBorde || config.colorBordeTarjeta || '#12A1A4'}
                      onChange={(hex) => {
                        handleConfigChange('colorBorde', hex);
                        if (tipoBloque === 'TESTIMONIOS') {
                          handleConfigChange('colorBordeTarjeta', hex);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Fila 2: Ubicación y Grosor del Borde */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/60">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ubicación del Borde / Acento
                  </label>
                  <select
                    value={config.modoBorde || 'completo'}
                    onChange={(e) => handleConfigChange('modoBorde', e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-[#12A1A4] focus:outline-none cursor-pointer"
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
                    value={config.grosorBorde || '1.5px'}
                    onChange={(e) => handleConfigChange('grosorBorde', e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-[#12A1A4] focus:outline-none cursor-pointer"
                  >
                    <option value="1px">1px (Delgado)</option>
                    <option value="1.5px">1.5px (Estándar)</option>
                    <option value="2px">2px (Medio)</option>
                    <option value="3px">3px (Pronunciado)</option>
                    <option value="4px">4px (Grueso / Barra de Acento)</option>
                  </select>
                </div>
              </div>

              {/* Vista previa en tiempo real combinada (Fondo + Texto + Borde) */}
              <div className="pt-2 border-t border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Vista Previa en Tiempo Real
                </span>
                <div className="p-2 bg-slate-200/60 rounded-2xl flex items-center justify-center">
                  <div
                    className="w-full p-4 rounded-xl text-left transition-all shadow-xs"
                    style={{
                      backgroundColor: config.colorFondo || '#FFFFFF',
                      color:
                        config.colorTexto === 'claro'
                          ? '#FFFFFF'
                          : config.colorTexto === 'oscuro'
                          ? '#0F172A'
                          : config.colorFondo && isHexDark(config.colorFondo)
                          ? '#FFFFFF'
                          : '#0F172A',
                      ...getBorderStyles(
                        config.modoBorde || 'completo',
                        config.colorBorde || config.colorBordeTarjeta || '#12A1A4',
                        config.grosorBorde || '1.5px',
                        '1px solid rgba(0,0,0,0.08)'
                      )
                    }}
                  >
                    <div className="text-xs font-black tracking-tight">
                      Muestra de la Sección / Tarjeta
                    </div>
                    <div
                      className="text-[11px] mt-0.5"
                      style={{
                        opacity: 0.8
                      }}
                    >
                      Color de fondo: {config.colorFondo || 'Por defecto'} · Texto: {config.colorTexto || 'Auto'} · Borde: {config.modoBorde || 'completo'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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
              <span>Guardar Bloque</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
