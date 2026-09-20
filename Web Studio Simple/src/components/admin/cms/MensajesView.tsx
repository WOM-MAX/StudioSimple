import React, { useState } from 'react';
import {
  Mail,
  CheckCircle2,
  Trash2,
  Phone,
  MessageCircle,
  Calendar,
  Search,
  User,
  Check
} from 'lucide-react';
import { MensajeContacto } from '../../../types/cmsExtras';
import { loadMensajes, saveMensajes } from '../../../data/initialCmsExtrasData';

export const MensajesView: React.FC = () => {
  const [mensajes, setMensajes] = useState<MensajeContacto[]>(() => loadMensajes());
  const [filter, setFilter] = useState<'todos' | 'no-leidos'>('todos');
  const [selectedMessage, setSelectedMessage] = useState<MensajeContacto | null>(null);

  const toggleLeido = (id: string) => {
    const updated = mensajes.map((m) => (m.id === id ? { ...m, leido: !m.leido } : m));
    setMensajes(updated);
    saveMensajes(updated);
    if (selectedMessage?.id === id) {
      setSelectedMessage((prev) => (prev ? { ...prev, leido: !prev.leido } : null));
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('¿Deseas eliminar este mensaje?')) return;
    const updated = mensajes.filter((m) => m.id !== id);
    setMensajes(updated);
    saveMensajes(updated);
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const filtered = mensajes.filter((m) => {
    if (filter === 'no-leidos') return !m.leido;
    return true;
  });

  const unreadCount = mensajes.filter((m) => !m.leido).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#12A1A4]" />
            <span>Bandeja de Mensajes y Consultas</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Revisa las dudas enviadas por familias interesadas desde los formularios de la web.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('todos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              filter === 'todos'
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Todos ({mensajes.length})
          </button>

          <button
            type="button"
            onClick={() => setFilter('no-leidos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              filter === 'no-leidos'
                ? 'bg-[#12A1A4] text-white border-[#12A1A4]'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>No Leídos</span>
            {unreadCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lista de Mensajes (Izquierda) */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-400">
              No hay mensajes para mostrar.
            </div>
          ) : (
            filtered.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;

              return (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (!msg.leido) toggleLeido(msg.id);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50/70 border-[#12A1A4] shadow-sm'
                      : !msg.leido
                      ? 'bg-white border-slate-300 shadow-sm ring-1 ring-teal-500/30'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`text-xs font-extrabold ${!msg.leido ? 'text-[#12A1A4]' : 'text-slate-800'}`}>
                      {msg.nombre}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {msg.fecha.split(' ')[0]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {msg.cursoInteres || 'General'}
                    </span>
                    {!msg.leido && (
                      <span className="w-2 h-2 rounded-full bg-[#12A1A4]" />
                    )}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {msg.mensaje}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Detalle del Mensaje Seleccionado (Derecha) */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-800">
                    {selectedMessage.nombre}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1 font-mono">
                      <Mail className="w-3.5 h-3.5 text-[#12A1A4]" />
                      {selectedMessage.email}
                    </span>
                    {selectedMessage.telefono && (
                      <span className="flex items-center gap-1 font-mono">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        {selectedMessage.telefono}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleLeido(selectedMessage.id)}
                    className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold"
                  >
                    {selectedMessage.leido ? 'Marcar No Leído' : 'Marcar Leído'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-1.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50"
                    title="Eliminar mensaje"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">
                  Curso o Nivel de Interés
                </span>
                <p className="text-xs font-bold text-slate-800">{selectedMessage.cursoInteres || 'No especificado'}</p>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2">
                  Mensaje de la Familia
                </span>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {selectedMessage.mensaje}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-400 font-mono">Recibido: {selectedMessage.fecha}</span>

                {selectedMessage.telefono && (
                  <a
                    href={`https://wa.me/${selectedMessage.telefono.replace(/[^\d]/g, '')}?text=Hola%20${encodeURIComponent(selectedMessage.nombre)},%20te%20escribimos%20de%20EstudioSimple...`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Responder por WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-400 text-xs">
              Selecciona un mensaje de la lista para leer su contenido completo.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
