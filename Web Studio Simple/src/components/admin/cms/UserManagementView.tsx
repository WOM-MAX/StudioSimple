import React, { useState, useMemo, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  RotateCcw,
  Search,
  Filter,
  Plus,
  Trash2,
  Copy,
  Check,
  Lock,
  Unlock,
  GraduationCap,
  Phone,
  Mail,
  Eye,
  EyeOff,
  UserCheck,
  CreditCard,
  Calendar
} from 'lucide-react';
import { ParentUser, GradeLevel } from '../../../types';
import {
  getAllRegisteredUsers,
  updateUserGrades,
  updateUserStatus,
  generateTemporaryPassword,
  regenerateStudentPin,
  registerUserFromCheckout
} from '../../../lib/user-repository';
import { cleanRut, formatRut, validateRut, formatRutOnInput } from '../../../lib/rut-validator';

const ALL_GRADES: GradeLevel[] = [
  '3° Básico',
  '4° Básico',
  '5° Básico',
  '6° Básico',
  '7° Básico',
  '8° Básico'
];

export const UserManagementView: React.FC = () => {
  const [users, setUsers] = useState<ParentUser[]>(() => getAllRegisteredUsers());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'trial' | 'suspended'>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');

  // Estado para visibilidad de PINs
  const [visiblePins, setVisiblePins] = useState<Record<string, boolean>>({});

  // Modal de Clave Temporal
  const [tempPasswordModal, setTempPasswordModal] = useState<{
    userName: string;
    userEmail: string;
    tempPass: string;
  } | null>(null);

  // Modal de Nuevo Usuario Manual
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    rut: '',
    email: '',
    phone: '',
    studentName: '',
    studentRun: '',
    grade: '7° Básico' as GradeLevel,
    plan: 'full' as 'monthly' | 'full' | 'trial'
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const refreshUsers = () => {
    setUsers([...getAllRegisteredUsers()]);
  };

  // Filtrado reactivo de usuarios
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      // Filtro por Estado
      if (statusFilter !== 'all') {
        if (statusFilter === 'active' && u.status !== 'active') return false;
        if (statusFilter === 'trial' && u.status !== 'trial') return false;
        if (statusFilter === 'suspended' && u.status !== 'suspended') return false;
      }

      // Filtro por Curso
      if (gradeFilter !== 'all') {
        if (!u.enrolledGrades.includes(gradeFilter as GradeLevel)) return false;
      }

      // Filtro por Búsqueda de Texto (RUN, Nombre, Email, Alumno)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const cleanQ = cleanRut(searchQuery);

        const matchName = u.name.toLowerCase().includes(q);
        const matchEmail = u.email.toLowerCase().includes(q);
        const matchStudent = (u.studentName || '').toLowerCase().includes(q);
        const matchRut = u.rut ? cleanRut(u.rut).includes(cleanQ) : false;
        const matchStudentRun = u.studentRun ? cleanRut(u.studentRun).includes(cleanQ) : false;

        if (!matchName && !matchEmail && !matchStudent && !matchRut && !matchStudentRun) {
          return false;
        }
      }

      return true;
    });
  }, [users, statusFilter, gradeFilter, searchQuery]);

  // Métricas
  const totalActive = useMemo(() => users.filter((u) => u.status === 'active').length, [users]);
  const totalTrial = useMemo(() => users.filter((u) => u.status === 'trial').length, [users]);
  const totalSuspended = useMemo(() => users.filter((u) => u.status === 'suspended').length, [users]);

  // Alternar curso para un usuario
  const handleToggleGrade = (userId: string, targetGrade: GradeLevel) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    let updated: GradeLevel[];
    if (user.enrolledGrades.includes(targetGrade)) {
      if (user.enrolledGrades.length === 1) {
        alert('Cada familia debe conservar al menos un curso activo.');
        return;
      }
      updated = user.enrolledGrades.filter((g) => g !== targetGrade);
    } else {
      updated = [...user.enrolledGrades, targetGrade];
    }

    updateUserGrades(userId, updated);
    refreshUsers();
  };

  // Alternar Estado de Suscripción
  const handleToggleStatus = (userId: string, currentStatus?: string) => {
    const newStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
    updateUserStatus(userId, newStatus);
    refreshUsers();
  };

  // Generar Clave Temporal
  const handleGeneratePassword = (user: ParentUser) => {
    const tempPass = generateTemporaryPassword(user.id);
    refreshUsers();
    setTempPasswordModal({
      userName: user.name,
      userEmail: user.email,
      tempPass
    });
  };

  // Regenerar PIN de Estudiante
  const handleRegeneratePin = (user: ParentUser) => {
    const newPin = regenerateStudentPin(user.id);
    refreshUsers();
    alert(`Nuevo PIN generado para ${user.studentName || 'el estudiante'}: ${newPin}`);
  };

  // Guardar Nuevo Usuario Manual
  const handleCreateManualUser = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validateRut(newUserData.rut)) {
      setFormError('El RUN del apoderado ingresado no es válido según Módulo 11.');
      return;
    }

    if (newUserData.studentRun.trim() && !validateRut(newUserData.studentRun)) {
      setFormError('El RUN del estudiante ingresado no es válido.');
      return;
    }

    try {
      registerUserFromCheckout({
        rut: newUserData.rut,
        name: newUserData.name,
        email: newUserData.email,
        phone: newUserData.phone,
        studentName: newUserData.studentName,
        studentRun: newUserData.studentRun,
        grade: newUserData.grade,
        plan: newUserData.plan
      });

      refreshUsers();
      setShowAddUserModal(false);
      setNewUserData({
        name: '',
        rut: '',
        email: '',
        phone: '',
        studentName: '',
        studentRun: '',
        grade: '7° Básico',
        plan: 'full'
      });
    } catch {
      setFormError('Error al crear usuario.');
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="space-y-6 pb-20 font-sans text-slate-900">
      {/* 1. CABECERA PRINCIPAL */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#12A1A4]/15 text-[#12A1A4] flex items-center justify-center font-bold">
                <Users size={18} />
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                Gestión de Familias, Suscripciones y RUN
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-teal-50 text-[#12A1A4] border border-teal-200">
                Chile · Módulo 11
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Registro central de apoderados con RUN validado, cursos contratados, PINs de estudiantes y credenciales seguras.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#EE751C] hover:bg-[#d96512] text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#EE751C]/20 transition-all cursor-pointer"
            >
              <Plus size={16} />
              <span>Inscribir Familia Manualmente</span>
            </button>
          </div>
        </div>

        {/* 2. TARJETAS DE MÉTRICAS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <p className="text-[11px] font-extrabold text-slate-500 uppercase">Total Familias</p>
            <p className="text-2xl font-black text-slate-900">{users.length}</p>
            <p className="text-[10px] text-slate-400 font-bold">Registradas en sistema</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-1">
            <p className="text-[11px] font-extrabold text-emerald-800 uppercase">Suscripciones Activas</p>
            <p className="text-2xl font-black text-emerald-700">{totalActive}</p>
            <p className="text-[10px] text-emerald-600 font-bold">Acceso a clases habilitado</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-1">
            <p className="text-[11px] font-extrabold text-amber-800 uppercase">Período de Prueba</p>
            <p className="text-2xl font-black text-amber-700">{totalTrial}</p>
            <p className="text-[10px] text-amber-600 font-bold">Prueba de 7 días</p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-center space-y-1">
            <p className="text-[11px] font-extrabold text-rose-800 uppercase">Cuentas Suspendidas</p>
            <p className="text-2xl font-black text-rose-700">{totalSuspended}</p>
            <p className="text-[10px] text-rose-600 font-bold">Bloqueo por no pago</p>
          </div>
        </div>

        {/* 3. BARRA DE BÚSQUEDA Y FILTROS */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por RUN (ej: 15.321.876-5), nombre, correo o alumno..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-white font-medium focus:outline-hidden focus:border-[#EE751C]"
            />
          </div>

          {/* Filtro por Estado */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                statusFilter === 'all' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({users.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                statusFilter === 'active' ? 'bg-white shadow-xs text-emerald-700' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Activos ({totalActive})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('trial')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                statusFilter === 'trial' ? 'bg-white shadow-xs text-amber-700' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Prueba ({totalTrial})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('suspended')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                statusFilter === 'suspended' ? 'bg-white shadow-xs text-rose-700' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Suspendidos ({totalSuspended})
            </button>
          </div>

          {/* Filtro por Nivel */}
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700 focus:outline-hidden"
          >
            <option value="all">Todos los Cursos</option>
            {ALL_GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. TABLA DE USUARIOS Y FAMILIAS */}
      <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Apoderado (Titular)</th>
                <th className="px-4 py-3.5">Estudiante & PIN</th>
                <th className="px-4 py-3.5">Suscripción</th>
                <th className="px-5 py-3.5">Cursos Habilitados (3° a 8°)</th>
                <th className="px-4 py-3.5 text-right">Acciones de Soporte</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-bold">
                    No se encontraron familias que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isPinVisible = visiblePins[u.id] || false;
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Apoderado */}
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-slate-900">{u.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-black text-slate-700 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                              {u.rut || 'Sin RUN'}
                            </span>
                            <span className="text-[10px] text-emerald-700 font-bold">Módulo 11 ✓</span>
                          </div>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Mail size={12} className="text-slate-400" />
                            <span>{u.email}</span>
                          </p>
                          {u.phone && (
                            <p className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Phone size={10} />
                              <span>{u.phone}</span>
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Estudiante & PIN */}
                      <td className="px-4 py-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-800">{u.studentName || 'Estudiante'}</span>
                          </div>
                          {u.studentRun && (
                            <span className="font-mono text-[10px] text-slate-500 block">
                              RUN: {u.studentRun}
                            </span>
                          )}

                          {/* PIN Infantil de Acceso */}
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-slate-500">PIN:</span>
                            <span className="font-mono font-black text-xs text-[#EE751C] tracking-widest bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              {isPinVisible ? u.studentPin || '123456' : '••••••'}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setVisiblePins({ ...visiblePins, [u.id]: !isPinVisible })
                              }
                              className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                              title={isPinVisible ? 'Ocultar PIN' : 'Ver PIN'}
                            >
                              {isPinVisible ? <EyeOff size={13} /> : <Eye size={13} />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRegeneratePin(u)}
                              className="p-1 text-slate-400 hover:text-[#EE751C] cursor-pointer"
                              title="Regenerar PIN infantil"
                            >
                              <RotateCcw size={13} />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Plan y Estado */}
                      <td className="px-4 py-4">
                        <div className="space-y-1.5">
                          <div>
                            {u.status === 'active' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                                Activa
                              </span>
                            )}
                            {u.status === 'trial' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                                Prueba 7d
                              </span>
                            )}
                            {u.status === 'suspended' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-50 text-rose-800 border border-rose-200">
                                Suspendida
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase block">
                            Plan {u.plan}
                          </span>
                        </div>
                      </td>

                      {/* Cursos Habilitados (3° a 8°) */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1.5 max-w-[280px]">
                          {ALL_GRADES.map((g) => {
                            const isEnrolled = u.enrolledGrades.includes(g);
                            return (
                              <button
                                key={g}
                                type="button"
                                onClick={() => handleToggleGrade(u.id, g)}
                                className={`px-2 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                                  isEnrolled
                                    ? 'bg-[#1C3257] text-white shadow-2xs'
                                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-700'
                                }`}
                                title={
                                  isEnrolled
                                    ? `Haz clic para deshabilitar ${g}`
                                    : `Haz clic para habilitar ${g}`
                                }
                              >
                                {isEnrolled ? `✓ ${g.replace(' Básico', '')}` : `+ ${g.replace(' Básico', '')}`}
                              </button>
                            );
                          })}
                        </div>
                      </td>

                      {/* Acciones de Soporte */}
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleGeneratePassword(u)}
                            className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                            title="Generar contraseña temporal de alta entropía para dictar al apoderado"
                          >
                            <KeyRound size={13} />
                            <span>Clave Temp</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleStatus(u.id, u.status)}
                            className={`p-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                              u.status === 'suspended'
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                                : 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                            }`}
                            title={u.status === 'suspended' ? 'Reactivar cuenta' : 'Suspender cuenta'}
                          >
                            {u.status === 'suspended' ? <Unlock size={14} /> : <Lock size={14} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. MODAL DE CLAVE TEMPORAL GENERADA */}
      {tempPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <KeyRound size={18} />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase">
                Contraseña Temporal Generada
              </h3>
            </div>

            <p className="text-xs text-slate-600">
              Esta clave temporal ha sido guardada en el sistema para{' '}
              <strong>{tempPasswordModal.userName}</strong> ({tempPasswordModal.userEmail}). Dicta o
              comparte este código de un solo uso con el apoderado:
            </p>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
              <span className="font-mono text-base font-black text-purple-900 tracking-wider">
                {tempPasswordModal.tempPass}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(tempPasswordModal.tempPass, 'temp_pass')}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === 'temp_pass' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedKey === 'temp_pass' ? 'Copiada' : 'Copiar'}</span>
              </button>
            </div>

            <p className="text-[10px] text-slate-400">
              * Por seguridad, se recomienda que el apoderado actualice su contraseña tras iniciar sesión.
            </p>

            <button
              type="button"
              onClick={() => setTempPasswordModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer"
            >
              Cerrar y Volver
            </button>
          </div>
        </div>
      )}

      {/* 6. MODAL DE NUEVA FAMILIA MANUAL */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#EE751C]/15 text-[#EE751C] flex items-center justify-center">
                  <Plus size={18} />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase">
                  Inscribir Familia Manualmente
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddUserModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
              >
                Cancelar
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateManualUser} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Nombre del Apoderado *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserData.name}
                    onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                    placeholder="Ej. Carmen Gloria Díaz"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    RUN Apoderado (Módulo 11) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserData.rut}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, rut: formatRutOnInput(e.target.value) })
                    }
                    placeholder="Ej. 15.321.876-5"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    placeholder="carmen@gmail.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Teléfono Móvil
                  </label>
                  <input
                    type="tel"
                    value={newUserData.phone}
                    onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })}
                    placeholder="+56 9 8765 4321"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Nombre del Estudiante *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserData.studentName}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, studentName: e.target.value })
                    }
                    placeholder="Ej. Tomás"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    RUN o IPE del Alumno
                  </label>
                  <input
                    type="text"
                    value={newUserData.studentRun}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        studentRun: formatRutOnInput(e.target.value)
                      })
                    }
                    placeholder="Ej. 24.102.394-K"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Curso Inicial *
                  </label>
                  <select
                    value={newUserData.grade}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, grade: e.target.value as GradeLevel })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    {ALL_GRADES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Plan
                  </label>
                  <select
                    value={newUserData.plan}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        plan: e.target.value as 'monthly' | 'full' | 'trial'
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value="full">Anual Completo</option>
                    <option value="monthly">Mensual</option>
                    <option value="trial">Prueba 7 Días</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#EE751C] hover:bg-[#d96512] text-white text-xs font-black shadow-md cursor-pointer"
                >
                  Guardar e Inscribir Familia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
