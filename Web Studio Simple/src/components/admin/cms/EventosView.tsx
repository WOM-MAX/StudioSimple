import React, { useState } from 'react';
import {
  CalendarDays,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  X,
  Save,
  MapPin,
  Clock,
  Video
} from 'lucide-react';
import { CalendarioEvento } from '../../../types/cmsExtras';
import { loadEventos, saveEventos } from '../../../data/initialCmsExtrasData';

export const EventosView: React.FC = () => {
  const [eventos, setEventos] = useState<CalendarioEvento[]>(() => loadEventos());
  const [editingEvento, setEditingEvento] = useState<CalendarioEvento | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [tipo, setTipo] = useState<CalendarioEvento['tipo']>('Inscripción MINEDUC');
  const [modalidad, setModalidad] = useState<CalendarioEvento['modalidad']>('Presencial');
  const [lugarOEnlace, setLugarOEnlace] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [activo, setActivo] = useState(true);

  const handleOpenCreate = () => {
    setEditingEvento(null);
    setTitulo('');
    setFecha(new Date().toISOString().split('T')[0]);
    setTipo('Inscripción MINEDUC');
    setModalidad('Presencial');
    setLugarOEnlace('Colegio Examinador Asignado');
    setDescripcion('');
    setActivo(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (evt: CalendarioEvento) => {
    setEditingEvento(evt);
    setTitulo(evt.titulo);
    setFecha(evt.fecha);
    setTipo(evt.tipo);
    setModalidad(evt.modalidad);
    setLugarOEnlace(evt.lugarOEnlace);
    setDescripcion(evt.descripcion);
    setActivo(evt.activo);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !fecha) return;

    let updated: CalendarioEvento[];
    if (editingEvento) {
      updated = eventos.map((ev) =>
        ev.id === editingEvento.id
          ? {
              ...ev,
              titulo,
              fecha,
              tipo,
              modalidad,
              lugarOEnlace,
              descripcion,
              activo
            }
          : ev
      );
    } else {
      const newEvt: CalendarioEvento = {
        id: `evt-${Date.now()}`,
        titulo,
        fecha,
        tipo,
        modalidad,
        lugarOEnlace,
        descripcion,
        activo
      };
      updated = [newEvt, ...eventos];
    }

    setEventos(updated);
    saveEventos(updated);
    window.dispatchEvent(new Event('storage'));
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    const updated = eventos.map((ev) => (ev.id === id ? { ...ev, activo: !ev.activo } : ev));
    setEventos(updated);
    saveEventos(updated);
    window.dispatchEvent(new Event('storage'));
  };

  const handleDelete = (id: string) => {
    if (!confirm('¿Deseas eliminar este evento del calendario?')) return;
    const updated = eventos.filter((ev) => ev.id !== id);
    setEventos(updated);
    saveEventos(updated);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-[#12A1A4]" />
            <span>Eventos y Calendario Oficial MINEDUC</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gestiona los plazos de inscripción ministerial, convocatorias a pruebas y talleres formativos.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs font-extrabold shadow-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Evento</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {eventos.map((evt) => (
          <div
            key={evt.id}
            className={`rounded-2xl border p-5 bg-white shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${
              evt.activo ? 'border-slate-200/90' : 'border-slate-200 opacity-60 bg-slate-50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-teal-50 text-[#12A1A4] border border-teal-100">
                  {evt.tipo}
                </span>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 flex items-center gap-1">
                  {evt.modalidad === 'Online' ? <Video className="w-3 h-3 text-[#12A1A4]" /> : <MapPin className="w-3 h-3 text-emerald-600" />}
                  {evt.modalidad}
                </span>
              </div>

              <div className="text-lg font-black text-slate-800 mb-1 flex items-center gap-2">
                <span className="text-xs text-[#12A1A4] bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-100 font-mono">
                  {evt.fecha}
                </span>
              </div>

              <h2 className="text-sm font-extrabold text-slate-800 leading-snug mb-1.5">
                {evt.titulo}
              </h2>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                {evt.descripcion}
              </p>

              <div className="text-[11px] text-slate-400 font-medium truncate mb-4">
                Lugar: <span className="text-slate-700 font-bold">{evt.lugarOEnlace}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => handleToggleStatus(evt.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                  evt.activo ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                {evt.activo ? 'Activo' : 'Oculto'}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(evt)}
                  className="p-1.5 rounded-lg text-[#12A1A4] hover:bg-teal-50 transition-colors"
                  title="Editar evento"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(evt.id)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Eliminar evento"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Crear / Editar Evento */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-base font-extrabold text-slate-800">
                {editingEvento ? 'Editar Evento' : 'Nuevo Evento o Hito MINEDUC'}
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
                  Título del Evento
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                  placeholder="Ej: Rendición 1ª Oportunidad Exámenes Libres"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Fecha del Evento
                  </label>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Modalidad
                  </label>
                  <select
                    value={modalidad}
                    onChange={(e) => setModalidad(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
                  >
                    <option value="Presencial">Presencial (Colegio sede)</option>
                    <option value="Online">Online (Zoom / Meet)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tipo de Evento
                </label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
                >
                  <option value="Inscripción MINEDUC">Inscripción MINEDUC</option>
                  <option value="Examen 1ª Oportunidad">Examen 1ª Oportunidad</option>
                  <option value="Examen 2ª Oportunidad">Examen 2ª Oportunidad</option>
                  <option value="Taller para Padres">Taller para Padres</option>
                  <option value="Entrega de Resultados">Entrega de Resultados</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Lugar o Enlace
                </label>
                <input
                  type="text"
                  value={lugarOEnlace}
                  onChange={(e) => setLugarOEnlace(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                  placeholder="Ej: Colegio República de Chile, Santiago Centro"
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
                  placeholder="Información adicional para las familias"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="eventoActivoCheck"
                  checked={activo}
                  onChange={(e) => setActivo(e.target.checked)}
                  className="w-4 h-4 text-[#12A1A4] rounded"
                />
                <label htmlFor="eventoActivoCheck" className="text-xs font-bold text-slate-700">
                  Publicar en el calendario web
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
                  <span>Guardar Evento</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
