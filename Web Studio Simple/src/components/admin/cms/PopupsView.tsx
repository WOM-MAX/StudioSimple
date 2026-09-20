import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  X,
  Save,
  Calendar,
  AlertCircle,
  ExternalLink,
  Eye,
  Sliders,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  PopupBanner,
  PopupPosicion,
  PopupEstiloImagen,
  PopupTamanoTitulo,
  PopupFrecuencia,
  PopupTipoAlerta
} from '../../../types/cmsExtras';
import { loadPopups, savePopups } from '../../../data/initialCmsExtrasData';
import { CloudinaryImageUploader } from '../../common/CloudinaryImageUploader';
import { ColorPickerField } from '../../common/ColorPickerField';

export const PopupsView: React.FC = () => {
  const [popups, setPopups] = useState<PopupBanner[]>(() => loadPopups());
  const [editingPopup, setEditingPopup] = useState<PopupBanner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [ctaText, setCtaText] = useState('Más Información');
  const [ctaUrl, setCtaUrl] = useState('#pricing');
  const [imagenUrl, setImagenUrl] = useState('');
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split('T')[0]);
  const [fechaFin, setFechaFin] = useState('2026-12-31');
  const [tipoAlerta, setTipoAlerta] = useState<PopupTipoAlerta>('info');
  const [activo, setActivo] = useState(true);

  // Especificaciones estilo colegio-acropolis
  const [posicion, setPosicion] = useState<PopupPosicion>('centro-modal');
  const [estiloImagen, setEstiloImagen] = useState<PopupEstiloImagen>('encabezado');
  const [tamanoTitulo, setTamanoTitulo] = useState<PopupTamanoTitulo>('md');
  const [colorFondo, setColorFondo] = useState('#FFFFFF');
  const [colorTexto, setColorTexto] = useState('#0F172A');
  const [colorBoton, setColorBoton] = useState('#12A1A4');
  const [frecuencia, setFrecuencia] = useState<PopupFrecuencia>('una_vez');
  const [prioridad, setPrioridad] = useState<number>(5);

  const handleOpenCreate = () => {
    setEditingPopup(null);
    setTitulo('');
    setMensaje('');
    setCtaText('Ver Calendario');
    setCtaUrl('#eventos');
    setImagenUrl('');
    setFechaInicio(new Date().toISOString().split('T')[0]);
    setFechaFin('2026-12-31');
    setTipoAlerta('info');
    setActivo(true);
    setPosicion('centro-modal');
    setEstiloImagen('encabezado');
    setTamanoTitulo('md');
    setColorFondo('#FFFFFF');
    setColorTexto('#0F172A');
    setColorBoton('#12A1A4');
    setFrecuencia('una_vez');
    setPrioridad(5);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pop: PopupBanner) => {
    setEditingPopup(pop);
    setTitulo(pop.titulo);
    setMensaje(pop.mensaje);
    setCtaText(pop.ctaText || 'Más Información');
    setCtaUrl(pop.ctaUrl || '#pricing');
    setImagenUrl(pop.imagenUrl || '');
    setFechaInicio(pop.fechaInicio);
    setFechaFin(pop.fechaFin);
    setTipoAlerta(pop.tipoAlerta);
    setActivo(pop.activo);
    setPosicion(pop.posicion || 'centro-modal');
    setEstiloImagen(pop.estiloImagen || 'encabezado');
    setTamanoTitulo(pop.tamanoTitulo || 'md');
    setColorFondo(pop.colorFondo || '#FFFFFF');
    setColorTexto(pop.colorTexto || '#0F172A');
    setColorBoton(pop.colorBoton || '#12A1A4');
    setFrecuencia(pop.frecuencia || 'una_vez');
    setPrioridad(pop.prioridad ?? 5);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !mensaje.trim()) return;

    let updated: PopupBanner[];
    if (editingPopup) {
      updated = popups.map((p) =>
        p.id === editingPopup.id
          ? {
              ...p,
              titulo: titulo.trim(),
              mensaje: mensaje.trim(),
              ctaText: ctaText.trim() || undefined,
              ctaUrl: ctaUrl.trim() || undefined,
              imagenUrl: imagenUrl.trim() || undefined,
              fechaInicio,
              fechaFin,
              tipoAlerta,
              activo,
              posicion,
              estiloImagen,
              tamanoTitulo,
              colorFondo,
              colorTexto,
              colorBoton,
              frecuencia,
              prioridad: Number(prioridad) || 5
            }
          : p
      );
    } else {
      const newPop: PopupBanner = {
        id: `pop-${Date.now()}`,
        titulo: titulo.trim(),
        mensaje: mensaje.trim(),
        ctaText: ctaText.trim() || undefined,
        ctaUrl: ctaUrl.trim() || undefined,
        imagenUrl: imagenUrl.trim() || undefined,
        fechaInicio,
        fechaFin,
        tipoAlerta,
        activo,
        posicion,
        estiloImagen,
        tamanoTitulo,
        colorFondo,
        colorTexto,
        colorBoton,
        frecuencia,
        prioridad: Number(prioridad) || 5
      };
      updated = [newPop, ...popups];
    }

    setPopups(updated);
    savePopups(updated);
    window.dispatchEvent(new Event('storage'));
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    const updated = popups.map((p) => (p.id === id ? { ...p, activo: !p.activo } : p));
    setPopups(updated);
    savePopups(updated);
    window.dispatchEvent(new Event('storage'));
  };

  const handleDelete = (id: string) => {
    if (!confirm('¿Deseas eliminar este aviso emergente?')) return;
    const updated = popups.filter((p) => p.id !== id);
    setPopups(updated);
    savePopups(updated);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#12A1A4]" />
            <span>Popups y Avisos Emergentes (Estándar Colegio Acrópolis)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configura avisos en modal central, barras fijas o esquinas con control estricto de frecuencia, estilos y colores.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs font-extrabold shadow-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Aviso</span>
        </button>
      </div>

      {/* Lista de Popups Existentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {popups.map((pop) => (
          <div
            key={pop.id}
            className={`rounded-2xl border p-6 bg-white shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${
              pop.activo ? 'border-slate-200/90' : 'border-slate-200 opacity-60 bg-slate-50'
            }`}
          >
            <div>
              {pop.imagenUrl && pop.estiloImagen !== 'oculta' && (
                <div className="h-36 -mx-6 -mt-6 mb-4 rounded-t-2xl overflow-hidden bg-slate-100 border-b border-slate-100 relative">
                  <img
                    src={pop.imagenUrl}
                    alt={pop.titulo}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                    Estilo: {pop.estiloImagen || 'encabezado'}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md ${
                      pop.tipoAlerta === 'urgente'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : pop.tipoAlerta === 'matricula'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : pop.tipoAlerta === 'evento'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-teal-50 text-[#12A1A4] border border-teal-100'
                    }`}
                  >
                    {pop.tipoAlerta}
                  </span>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    Pos: {pop.posicion || 'centro-modal'}
                  </span>
                </div>

                <span className="text-[11px] text-slate-400 font-mono">
                  Prioridad: {pop.prioridad ?? 5}/10
                </span>
              </div>

              <h2 className="text-base font-extrabold text-slate-800 leading-snug mb-2">
                {pop.titulo}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                {pop.mensaje}
              </p>

              <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 mb-4 font-medium">
                <span className="bg-slate-100 px-2 py-0.5 rounded-md">
                  Frecuencia: {pop.frecuencia === 'siempre' ? 'Siempre' : pop.frecuencia === 'una_vez_por_dia' ? '1 vez/día' : 'Solo 1 vez'}
                </span>
                <span className="bg-slate-100 px-2 py-0.5 rounded-md">
                  Vigencia: {pop.fechaInicio} al {pop.fechaFin}
                </span>
              </div>

              {pop.ctaText && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold mb-4">
                  <ExternalLink className="w-3 h-3 text-[#12A1A4]" />
                  <span>Botón: {pop.ctaText} ({pop.ctaUrl || '#'})</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className={`font-bold ${pop.activo ? 'text-emerald-600' : 'text-slate-400'}`}>
                {pop.activo ? '● Publicado y Activo' : '○ En Pausa'}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(pop.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    pop.activo
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {pop.activo ? 'Activo' : 'Pausado'}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(pop)}
                  className="p-1.5 rounded-lg text-[#12A1A4] hover:bg-teal-50 transition-colors cursor-pointer"
                  title="Editar aviso"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(pop.id)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Eliminar aviso"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Completo Crear / Editar Aviso Emergente */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div>
                <h2 className="text-base font-black text-slate-800 tracking-tight">
                  {editingPopup ? 'Editar Aviso Emergente' : 'Nuevo Aviso Emergente'}
                </h2>
                <p className="text-xs text-slate-500">
                  Especificaciones completas de presentación, posición y frecuencia del sistema.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-800">
              {/* Sección 1: Contenido Principal */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b pb-1">
                  1. Contenido del Aviso
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Título del Aviso *
                  </label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    maxLength={100}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-[#12A1A4]"
                    placeholder="Ej: Fechas límite de inscripción MINEDUC 2026"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mensaje Detallado / Instrucción *
                  </label>
                  <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    rows={3}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-700 focus:outline-hidden focus:border-[#12A1A4]"
                    placeholder="Escribe el texto detallado de la notificación..."
                  />
                </div>

                <div>
                  <CloudinaryImageUploader
                    label="Imagen / Flyer del Aviso (Opcional)"
                    recommendedDimensions="800 x 600 px (4:3) o 800 x 800 px (1:1 Flyer)"
                    value={imagenUrl}
                    onChange={setImagenUrl}
                    folder="estudiosimple/popups"
                    helperText="Afiche oficial o fotografía que acompañará la notificación."
                    compact
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Texto Botón CTA (Opcional)
                    </label>
                    <input
                      type="text"
                      value={ctaText}
                      onChange={(e) => setCtaText(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                      placeholder="Ver Calendario Oficial"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Enlace de Destino (URL o Ancla)
                    </label>
                    <input
                      type="text"
                      value={ctaUrl}
                      onChange={(e) => setCtaUrl(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                      placeholder="#eventos o https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Sección 2: Posicionamiento y Estilos Visuales (Colegio Acrópolis) */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b pb-1">
                  2. Posición y Formato en Pantalla
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Posición en Pantalla *
                    </label>
                    <select
                      value={posicion}
                      onChange={(e) => setPosicion(e.target.value as PopupPosicion)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                    >
                      <option value="centro-modal">Modal Central (Para Urgencias con Fondo Oscuro)</option>
                      <option value="inferior-derecha">Inferior Derecha (Discreto en esquina)</option>
                      <option value="inferior-izquierda">Inferior Izquierda</option>
                      <option value="banner-superior">Banner Superior (Barra Fija Horizontal)</option>
                      <option value="banner-inferior">Banner Inferior (Barra Fija Horizontal)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Estilo de Imagen *
                    </label>
                    <select
                      value={estiloImagen}
                      onChange={(e) => setEstiloImagen(e.target.value as PopupEstiloImagen)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                    >
                      <option value="encabezado">Encabezado (Sobre el texto con gradiente)</option>
                      <option value="fondo">Como Fondo (Cubre toda la tarjeta con capa oscura)</option>
                      <option value="solo-imagen">Solo Imagen / Flyer (Afiche limpio de alto impacto)</option>
                      <option value="oculta">Ocultar Imagen</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Clasificación (Badge de Alerta) *
                    </label>
                    <select
                      value={tipoAlerta}
                      onChange={(e) => setTipoAlerta(e.target.value as PopupTipoAlerta)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                    >
                      <option value="info">Información General (Turquesa)</option>
                      <option value="urgente">Urgente (Rojo con punto pulsante)</option>
                      <option value="matricula">Matrícula / Inscripción (Esmeralda)</option>
                      <option value="evento">Evento / Taller (Amarillo/Ámbar)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Tamaño del Título *
                    </label>
                    <select
                      value={tamanoTitulo}
                      onChange={(e) => setTamanoTitulo(e.target.value as PopupTamanoTitulo)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                    >
                      <option value="sm">Pequeño (sm)</option>
                      <option value="md">Mediano / Equilibrado (md)</option>
                      <option value="lg">Grande (lg)</option>
                      <option value="xl">Extra Grande (xl)</option>
                    </select>
                  </div>
                </div>

                {/* Selectores de Color */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <ColorPickerField
                    label="Color de Fondo"
                    value={colorFondo}
                    onChange={setColorFondo}
                  />
                  <ColorPickerField
                    label="Color del Texto"
                    value={colorTexto}
                    onChange={setColorTexto}
                  />
                  <ColorPickerField
                    label="Color del Botón CTA"
                    value={colorBoton}
                    onChange={setColorBoton}
                  />
                </div>
              </div>

              {/* Sección 3: Reglas de Visualización, Frecuencia y Fechas */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b pb-1">
                  3. Lógica y Frecuencia de Aparición
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Frecuencia para el Usuario *
                    </label>
                    <select
                      value={frecuencia}
                      onChange={(e) => setFrecuencia(e.target.value as PopupFrecuencia)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                    >
                      <option value="una_vez">Solo una vez por usuario (al cerrar no vuelve a salir)</option>
                      <option value="una_vez_por_dia">Una vez al día por usuario</option>
                      <option value="siempre">Siempre (cada vez que visita el sitio)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Prioridad (1-10, mayor gana en empate) *
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={prioridad}
                      onChange={(e) => setPrioridad(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Fecha de Inicio *
                    </label>
                    <input
                      type="date"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Fecha de Fin *
                    </label>
                    <input
                      type="date"
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="popupActivoCheck"
                    checked={activo}
                    onChange={(e) => setActivo(e.target.checked)}
                    className="w-4 h-4 text-[#12A1A4] rounded cursor-pointer"
                  />
                  <label htmlFor="popupActivoCheck" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Activar aviso en el sitio web inmediatamente
                  </label>
                </div>
              </div>

              {/* Previsualización en Vivo */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Vista Previa del Aviso:
                </span>
                <div
                  className="rounded-2xl border p-5 shadow-lg max-w-sm mx-auto overflow-hidden relative"
                  style={{
                    backgroundColor: colorFondo,
                    color: colorTexto,
                    borderColor: tipoAlerta === 'urgente' ? '#EF4444' : '#12A1A4'
                  }}
                >
                  {imagenUrl && estiloImagen !== 'oculta' && estiloImagen !== 'fondo' && (
                    <div className="h-28 -mx-5 -mt-5 mb-3 overflow-hidden bg-slate-100">
                      <img src={imagenUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 mb-2">
                    {tipoAlerta === 'urgente' && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    )}
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-black/10">
                      {tipoAlerta.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm mb-1 leading-snug">{titulo || 'Título del Aviso'}</h4>
                  {estiloImagen !== 'solo-imagen' && (
                    <p className="text-xs opacity-85 mb-3 line-clamp-2">{mensaje || 'Mensaje del aviso...'}</p>
                  )}
                  {ctaText && (
                    <div
                      className="px-3 py-1.5 rounded-xl text-center text-xs font-bold text-white shadow-xs"
                      style={{ backgroundColor: colorBoton }}
                    >
                      {ctaText}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs font-extrabold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar Aviso</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
