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
  Calendar,
  Ticket,
  Shield,
  ShieldAlert,
  History,
  Activity,
  Clock,
  FileText,
  UserPlus,
  Ban,
  ExternalLink,
  RefreshCw,
  X,
  Tag,
  DollarSign,
  Percent,
  Save,
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { ParentUser, GradeLevel } from '../../../types';
import { AdminUser, AdminRole, GuestPass, AuditLogEntry, AuditActionType } from '../../../types/authAdmin';
import {
  getAllRegisteredUsers,
  fetchRegisteredUsersFromBackend,
  updateUserGrades,
  updateUserStatus,
  generateTemporaryPassword,
  regenerateStudentPin,
  registerUserFromCheckout,
  deleteUserPermanently
} from '../../../lib/user-repository';
import { cleanRut, formatRut, validateRut, formatRutOnInput } from '../../../lib/rut-validator';
import {
  getAllAdmins,
  getActiveAdmin,
  changeAdminPassword,
  createAdminUser,
  toggleAdminStatus,
  getAllGuestPasses,
  createGuestPass,
  revokeGuestPass,
  extendGuestPass,
  getAllAuditLogs,
  recordAuditLog
} from '../../../lib/admin-repository';
import {
  loadPricingConfig,
  updatePlanPricing,
  createCoupon,
  toggleCouponStatus,
  updatePaymentGateway
} from '../../../lib/pricing-repository';
import { PricingConfig, PricingPlan, DiscountCoupon, PaymentGatewayConfig } from '../../../types/pricing';

const ALL_GRADES: GradeLevel[] = [
  '3° Básico',
  '4° Básico',
  '5° Básico',
  '6° Básico',
  '7° Básico',
  '8° Básico'
];

type AccessTab = 'families' | 'guests' | 'admins' | 'pricing' | 'audit';

export const UserManagementView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AccessTab>('families');

  // ---------------------------------------------------------------------------
  // 1. ESTADO: FAMILIAS Y RUN
  // ---------------------------------------------------------------------------
  const [users, setUsers] = useState<ParentUser[]>(() => getAllRegisteredUsers());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'trial' | 'suspended'>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [visiblePins, setVisiblePins] = useState<Record<string, boolean>>({});

  // Modal Eliminar Familia Permanente
  const [deleteTargetUser, setDeleteTargetUser] = useState<ParentUser | null>(null);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  // Modal Clave Temporal Familia
  const [tempPasswordModal, setTempPasswordModal] = useState<{
    userName: string;
    userEmail: string;
    userPhone?: string;
    tempPass: string;
    autoSentWhatsApp?: boolean;
  } | null>(null);

  // Modal Nueva Familia Manual
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

  // ---------------------------------------------------------------------------
  // 2. ESTADO: PASES DE INVITADOS Y DEMOS
  // ---------------------------------------------------------------------------
  const [guestPasses, setGuestPasses] = useState<GuestPass[]>(() => getAllGuestPasses());
  const [guestSearchQuery, setGuestSearchQuery] = useState('');
  const [guestStatusFilter, setGuestStatusFilter] = useState<'all' | 'active' | 'expired' | 'revoked'>('all');
  const [showCreatePassModal, setShowCreatePassModal] = useState(false);
  const [copiedPassId, setCopiedPassId] = useState<string | null>(null);
  const [newPassData, setNewPassData] = useState({
    name: '',
    email: '',
    enrolledGrades: ['7° Básico'] as GradeLevel[],
    durationDays: 7,
    notes: ''
  });
  const [passFormError, setPassFormError] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // 3. ESTADO: ADMINISTRADORES Y SEGURIDAD
  // ---------------------------------------------------------------------------
  const [admins, setAdmins] = useState<AdminUser[]>(() => getAllAdmins());
  const [activeAdminUser, setActiveAdminUser] = useState<AdminUser | null>(() => getActiveAdmin());
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'idle' | 'success' | 'error'; message?: string }>({
    type: 'idle'
  });
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin' as AdminRole
  });
  const [adminFormError, setAdminFormError] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // 4. ESTADO: BITACORA DE AUDITORIA
  // ---------------------------------------------------------------------------
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => getAllAuditLogs());
  const [auditSearchQuery, setAuditSearchQuery] = useState('');
  const [auditActionFilter, setAuditActionFilter] = useState<string>('all');
  const [selectedAuditLog, setSelectedAuditLog] = useState<AuditLogEntry | null>(null);

  // ---------------------------------------------------------------------------
  // 5. ESTADO: PRECIOS, CUPONES Y PASARELA DE PAGO
  // ---------------------------------------------------------------------------
  const [pricingConfig, setPricingConfig] = useState<PricingConfig>(() => loadPricingConfig());
  const [editingPlans, setEditingPlans] = useState<Record<string, { precioNormal: number; precioOferta: number; enOferta: boolean; etiquetaOferta: string }>>(() => {
    const initial: Record<string, { precioNormal: number; precioOferta: number; enOferta: boolean; etiquetaOferta: string }> = {};
    const cfg = loadPricingConfig();
    cfg.planes.forEach(p => {
      initial[p.id] = {
        precioNormal: p.precioNormal,
        precioOferta: p.precioOferta,
        enOferta: p.enOferta,
        etiquetaOferta: p.etiquetaOferta || ''
      };
    });
    return initial;
  });

  const [pricingSuccessMsg, setPricingSuccessMsg] = useState<string | null>(null);

  // Nuevo cupón
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'porcentaje' | 'precio_fijo' | 'monto_fijo'>('precio_fijo');
  const [newCouponValue, setNewCouponValue] = useState<number>(1000);
  const [newCouponDesc, setNewCouponDesc] = useState('Cupón de prueba a $1.000 CLP');
  const [newCouponPlan, setNewCouponPlan] = useState<'all' | 'monthly' | 'full'>('all');
  const [couponSuccessMsg, setCouponSuccessMsg] = useState<string | null>(null);

  // Pasarela
  const [gatewayProvider, setGatewayProvider] = useState<'simulated' | 'mercadopago'>(() => pricingConfig.pasarela.provider);
  const [gatewayPublicKey, setGatewayPublicKey] = useState(() => pricingConfig.pasarela.mercadoPagoPublicKey || '');
  const [gatewayAccessToken, setGatewayAccessToken] = useState(() => pricingConfig.pasarela.mercadoPagoAccessToken || '');
  const [gatewaySandbox, setGatewaySandbox] = useState(() => pricingConfig.pasarela.modoSandbox ?? true);
  const [gatewaySuccessMsg, setGatewaySuccessMsg] = useState<string | null>(null);

  const [isLoadingBackendFamilies, setIsLoadingBackendFamilies] = useState(false);

  // Recarga sincronizada desde API central Neon PostgreSQL y repositorios
  const refreshAll = async () => {
    setIsLoadingBackendFamilies(true);
    try {
      const backendFamilies = await fetchRegisteredUsersFromBackend();
      setUsers(backendFamilies);
    } catch {
      setUsers([...getAllRegisteredUsers()]);
    } finally {
      setIsLoadingBackendFamilies(false);
    }
    setGuestPasses([...getAllGuestPasses()]);
    setAdmins([...getAllAdmins()]);
    setActiveAdminUser(getActiveAdmin());
    setAuditLogs([...getAllAuditLogs()]);
    const cfg = loadPricingConfig();
    setPricingConfig(cfg);
    const planMap: Record<string, { precioNormal: number; precioOferta: number; enOferta: boolean; etiquetaOferta: string }> = {};
    cfg.planes.forEach(p => {
      planMap[p.id] = {
        precioNormal: p.precioNormal,
        precioOferta: p.precioOferta,
        enOferta: p.enOferta,
        etiquetaOferta: p.etiquetaOferta || ''
      };
    });
    setEditingPlans(planMap);
  };

  useEffect(() => {
    refreshAll();
  }, []);

  // ---------------------------------------------------------------------------
  // FILTRADO REACTIVO: FAMILIAS
  // ---------------------------------------------------------------------------
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (statusFilter !== 'all') {
        if (statusFilter === 'active' && u.status !== 'active') return false;
        if (statusFilter === 'trial' && u.status !== 'trial') return false;
        if (statusFilter === 'suspended' && u.status !== 'suspended') return false;
      }
      if (gradeFilter !== 'all') {
        if (!u.enrolledGrades.includes(gradeFilter as GradeLevel)) return false;
      }
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

  // ---------------------------------------------------------------------------
  // FILTRADO REACTIVO: PASES DE INVITADOS
  // ---------------------------------------------------------------------------
  const filteredPasses = useMemo(() => {
    return guestPasses.filter((p) => {
      if (guestStatusFilter !== 'all' && p.status !== guestStatusFilter) return false;
      if (guestSearchQuery.trim()) {
        const q = guestSearchQuery.toLowerCase().trim();
        const matchCode = p.code.toLowerCase().includes(q);
        const matchName = p.name.toLowerCase().includes(q);
        const matchEmail = (p.email || '').toLowerCase().includes(q);
        if (!matchCode && !matchName && !matchEmail) return false;
      }
      return true;
    });
  }, [guestPasses, guestStatusFilter, guestSearchQuery]);

  // ---------------------------------------------------------------------------
  // FILTRADO REACTIVO: BITACORA DE AUDITORIA
  // ---------------------------------------------------------------------------
  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      if (auditActionFilter !== 'all' && log.action !== auditActionFilter) return false;
      if (auditSearchQuery.trim()) {
        const q = auditSearchQuery.toLowerCase().trim();
        const matchActor = log.actorName.toLowerCase().includes(q) || (log.actorEmail || '').toLowerCase().includes(q);
        const matchTarget = log.target.toLowerCase().includes(q);
        const matchDetails = log.details.toLowerCase().includes(q);
        const matchAction = log.action.toLowerCase().includes(q);
        if (!matchActor && !matchTarget && !matchDetails && !matchAction) return false;
      }
      return true;
    });
  }, [auditLogs, auditActionFilter, auditSearchQuery]);

  // ---------------------------------------------------------------------------
  // HANDLERS: FAMILIAS
  // ---------------------------------------------------------------------------
  const handleTogglePinVisibility = (userId: string) => {
    setVisiblePins((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const handleGenerateTempPassword = (user: ParentUser) => {
    const tempPass = generateTemporaryPassword(user.id, true);
    const actor = activeAdminUser || { id: 'admin-001', name: 'Administrador', email: 'admin@estudiosimple.cl', role: 'admin' as AdminRole };
    recordAuditLog({
      actorId: actor.id,
      actorName: actor.name,
      actorEmail: actor.email,
      actorRole: actor.role,
      action: 'GENERATE_TEMP_PASSWORD',
      target: user.rut || user.email,
      details: `Generacion de clave temporal de soporte para ${user.name} (${user.rut || user.email}) y despacho automatico por WhatsApp`
    });
    setTempPasswordModal({
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone,
      tempPass,
      autoSentWhatsApp: Boolean(user.phone)
    });
    refreshAll();
  };

  const handleRegeneratePin = (user: ParentUser) => {
    const newPin = regenerateStudentPin(user.id);
    const actor = activeAdminUser || { id: 'admin-001', name: 'Administrador', email: 'admin@estudiosimple.cl', role: 'admin' as AdminRole };
    recordAuditLog({
      actorId: actor.id,
      actorName: actor.name,
      actorEmail: actor.email,
      actorRole: actor.role,
      action: 'REGENERATE_PIN',
      target: user.studentName || user.email,
      details: `Regeneracion de PIN infantil (${newPin}) para el estudiante de ${user.name}`
    });
    setVisiblePins((prev) => ({ ...prev, [user.id]: true }));
    refreshAll();
  };

  const handleStatusChange = (userId: string, newStatus: 'active' | 'suspended' | 'trial', userName: string) => {
    updateUserStatus(userId, newStatus);
    const actor = activeAdminUser || { id: 'admin-001', name: 'Administrador', email: 'admin@estudiosimple.cl', role: 'admin' as AdminRole };
    recordAuditLog({
      actorId: actor.id,
      actorName: actor.name,
      actorEmail: actor.email,
      actorRole: actor.role,
      action: 'UPDATE_USER_STATUS',
      target: userName,
      details: `Modificacion de estado de suscripcion a ${newStatus.toUpperCase()} para ${userName}`
    });
    refreshAll();
  };

  const handleConfirmDeleteUser = async () => {
    if (!deleteTargetUser) return;
    setIsDeletingUser(true);
    try {
      const actor = activeAdminUser || { id: 'admin-001', name: 'Administrador', email: 'admin@estudiosimple.cl', role: 'admin' as AdminRole };
      recordAuditLog({
        actorId: actor.id,
        actorName: actor.name,
        actorEmail: actor.email,
        actorRole: actor.role,
        action: 'DELETE_USER_PERMANENT',
        target: deleteTargetUser.rut || deleteTargetUser.email,
        details: `Eliminacion definitiva y purga en cascada de cuenta y suscripcion para ${deleteTargetUser.name} (${deleteTargetUser.email})`
      });
      await deleteUserPermanently(deleteTargetUser.id);
      setDeleteTargetUser(null);
      await fetchRegisteredUsersFromBackend();
      refreshAll();
    } catch (err) {
      console.error('Error al eliminar usuario permanentemente:', err);
    } finally {
      setIsDeletingUser(false);
    }
  };

  const handleGradeToggle = (user: ParentUser, grade: GradeLevel) => {
    const exists = user.enrolledGrades.includes(grade);
    let updated: GradeLevel[];
    if (exists) {
      if (user.enrolledGrades.length <= 1) return;
      updated = user.enrolledGrades.filter((g) => g !== grade);
    } else {
      updated = [...user.enrolledGrades, grade];
    }
    updateUserGrades(user.id, updated);
    const actor = activeAdminUser || { id: 'admin-001', name: 'Administrador', email: 'admin@estudiosimple.cl', role: 'admin' as AdminRole };
    recordAuditLog({
      actorId: actor.id,
      actorName: actor.name,
      actorEmail: actor.email,
      actorRole: actor.role,
      action: 'UPDATE_USER_GRADES',
      target: user.name,
      details: `Actualizacion de cursos habilitados para ${user.name}: [${updated.join(', ')}]`
    });
    refreshAll();
  };

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
    if (!newUserData.name.trim() || !newUserData.email.trim()) {
      setFormError('Nombre y correo son obligatorios.');
      return;
    }

    const { user } = registerUserFromCheckout({
      rut: newUserData.rut,
      name: newUserData.name.trim(),
      email: newUserData.email.trim(),
      studentName: newUserData.studentName.trim() || 'Estudiante',
      studentRun: newUserData.studentRun.trim(),
      grade: newUserData.grade,
      plan: newUserData.plan,
      phone: newUserData.phone.trim()
    });

    const actor = activeAdminUser || { id: 'admin-001', name: 'Administrador', email: 'admin@estudiosimple.cl', role: 'admin' as AdminRole };
    recordAuditLog({
      actorId: actor.id,
      actorName: actor.name,
      actorEmail: actor.email,
      actorRole: actor.role,
      action: 'CREATE_USER_MANUAL',
      target: user.rut || user.email,
      details: `Registro manual de familia para ${user.name} con PIN de estudiante ${user.studentPin} en ${newUserData.grade}`
    });

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
    refreshAll();
  };

  // ---------------------------------------------------------------------------
  // HANDLERS: PASES DE INVITADOS
  // ---------------------------------------------------------------------------
  const handleCreatePassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassFormError(null);
    if (!newPassData.name.trim()) {
      setPassFormError('El nombre del destinatario es obligatorio.');
      return;
    }
    if (newPassData.enrolledGrades.length === 0) {
      setPassFormError('Debes seleccionar al menos un curso habilitado.');
      return;
    }

    const actor = activeAdminUser || { id: 'admin-001', name: 'Administrador', role: 'admin' as AdminRole };
    createGuestPass({
      name: newPassData.name.trim(),
      email: newPassData.email.trim() || undefined,
      enrolledGrades: newPassData.enrolledGrades,
      durationDays: newPassData.durationDays,
      notes: newPassData.notes.trim() || undefined,
      adminId: actor.id,
      adminName: actor.name
    });

    setShowCreatePassModal(false);
    setNewPassData({
      name: '',
      email: '',
      enrolledGrades: ['7° Básico'],
      durationDays: 7,
      notes: ''
    });
    refreshAll();
  };

  const handleRevokePass = (pass: GuestPass) => {
    const actor = activeAdminUser || { id: 'admin-001', name: 'Administrador', role: 'admin' as AdminRole };
    revokeGuestPass(pass.id, { id: actor.id, name: actor.name, role: actor.role });
    refreshAll();
  };

  const handleExtendPass = (pass: GuestPass, days: number) => {
    const actor = activeAdminUser || { id: 'admin-001', name: 'Administrador', role: 'admin' as AdminRole };
    extendGuestPass(pass.id, days, { id: actor.id, name: actor.name, role: actor.role });
    refreshAll();
  };

  const handleCopyPassCode = (code: string, passId: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedPassId(passId);
      setTimeout(() => setCopiedPassId(null), 2500);
    }
  };

  // ---------------------------------------------------------------------------
  // HANDLERS: ADMINISTRADORES
  // ---------------------------------------------------------------------------
  const handleChangeCurrentPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus({ type: 'idle' });

    if (!newAdminPassword || newAdminPassword.length < 4) {
      setPasswordStatus({ type: 'error', message: 'La contraseña debe tener al menos 4 caracteres.' });
      return;
    }
    if (newAdminPassword !== confirmAdminPassword) {
      setPasswordStatus({ type: 'error', message: 'Las contraseñas no coinciden.' });
      return;
    }

    const actor = activeAdminUser || admins[0];
    if (!actor) {
      setPasswordStatus({ type: 'error', message: 'No hay un administrador activo en la sesión.' });
      return;
    }

    const result = changeAdminPassword(actor.id, newAdminPassword, {
      id: actor.id,
      name: actor.name,
      email: actor.email,
      role: actor.role
    });

    if (result.success) {
      setPasswordStatus({ type: 'success', message: 'Contraseña actualizada exitosamente.' });
      setNewAdminPassword('');
      setConfirmAdminPassword('');
      refreshAll();
    } else {
      setPasswordStatus({ type: 'error', message: result.error || 'Error al actualizar contraseña.' });
    }
  };

  const handleCreateAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminFormError(null);

    const actor = activeAdminUser || admins[0];
    const result = createAdminUser(newAdminData, {
      id: actor.id,
      name: actor.name,
      email: actor.email,
      role: actor.role
    });

    if (result.success) {
      setShowCreateAdminModal(false);
      setNewAdminData({ name: '', email: '', password: '', role: 'admin' });
      refreshAll();
    } else {
      setAdminFormError(result.error || 'Error al registrar administrador.');
    }
  };

  const handleToggleAdmin = (admin: AdminUser) => {
    const actor = activeAdminUser || admins[0];
    const res = toggleAdminStatus(admin.id, { id: actor.id, name: actor.name, email: actor.email, role: actor.role });
    if (!res.success && res.error) {
      alert(res.error);
    }
    refreshAll();
  };

  const handleSavePlanPricing = (planId: 'monthly' | 'full' | 'trial') => {
    const edit = editingPlans[planId];
    if (!edit) return;
    const actor = activeAdminUser || admins[0];
    const updated = updatePlanPricing(
      planId,
      {
        precioNormal: Number(edit.precioNormal),
        precioOferta: Number(edit.precioOferta),
        enOferta: edit.enOferta,
        etiquetaOferta: edit.etiquetaOferta
      },
      actor?.name || 'Administrador'
    );
    setPricingConfig(updated);
    recordAuditLog({
      actorId: actor?.id || 'admin-pricing',
      actorName: actor?.name || 'Administrador',
      actorRole: actor?.role || 'admin',
      action: 'UPDATE_SITE_CONFIG',
      target: `Plan ${planId}`,
      details: `Actualización de precios: Normal $${edit.precioNormal}, Oferta $${edit.precioOferta}, En Oferta: ${edit.enOferta ? 'Sí' : 'No'}`
    });
    setPricingSuccessMsg(`Precios del plan ${planId} guardados exitosamente.`);
    setTimeout(() => setPricingSuccessMsg(null), 3000);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const actor = activeAdminUser || admins[0];
    createCoupon(
      {
        codigo: newCouponCode.trim().toUpperCase(),
        tipo: newCouponType,
        valor: Number(newCouponValue),
        descripcion: newCouponDesc,
        planAplicable: newCouponPlan,
        activo: true
      },
      actor?.name || 'Administrador'
    );
    setPricingConfig(loadPricingConfig());
    recordAuditLog({
      actorId: actor?.id || 'admin-pricing',
      actorName: actor?.name || 'Administrador',
      actorRole: actor?.role || 'admin',
      action: 'UPDATE_SITE_CONFIG',
      target: `Cupón ${newCouponCode.trim().toUpperCase()}`,
      details: `Cupón creado: Tipo ${newCouponType}, Valor ${newCouponValue}, Plan ${newCouponPlan}`
    });
    setNewCouponCode('');
    setCouponSuccessMsg('Cupón creado exitosamente.');
    setTimeout(() => setCouponSuccessMsg(null), 3000);
  };

  const handleToggleCoupon = (id: string, currentStatus: boolean) => {
    const actor = activeAdminUser || admins[0];
    const updated = toggleCouponStatus(id, actor?.name || 'Administrador');
    setPricingConfig(updated);
    recordAuditLog({
      actorId: actor?.id || 'admin-pricing',
      actorName: actor?.name || 'Administrador',
      actorRole: actor?.role || 'admin',
      action: 'UPDATE_SITE_CONFIG',
      target: `Cupón ID ${id}`,
      details: `Cupón ${!currentStatus ? 'activado' : 'desactivado'}`
    });
  };

  const handleSaveGateway = (e: React.FormEvent) => {
    e.preventDefault();
    const actor = activeAdminUser || admins[0];
    const updated = updatePaymentGateway(
      {
        provider: gatewayProvider,
        mercadoPagoPublicKey: gatewayPublicKey.trim(),
        mercadoPagoAccessToken: gatewayAccessToken.trim(),
        modoSandbox: gatewaySandbox
      },
      actor?.name || 'Administrador'
    );
    setPricingConfig(updated);
    recordAuditLog({
      actorId: actor?.id || 'admin-pricing',
      actorName: actor?.name || 'Administrador',
      actorRole: actor?.role || 'admin',
      action: 'UPDATE_SITE_CONFIG',
      target: 'Pasarela de Pago',
      details: `Pasarela configurada a modo ${gatewayProvider} (Sandbox: ${gatewaySandbox ? 'Sí' : 'No'})`
    });
    setGatewaySuccessMsg('Configuración de pasarela de pago guardada exitosamente.');
    setTimeout(() => setGatewaySuccessMsg(null), 3000);
  };

  const handleCopyClipboard = (text: string, key: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. ENCABEZADO Y TABS DE NAVEGACION */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#12A1A4]" />
              <span>Centro de Control de Accesos y Seguridad</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Administración de credenciales familiares, pases temporales de cortesía, administradores y bitácora de intervenciones.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={refreshAll}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
              title="Actualizar datos"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            {activeTab === 'families' && (
              <button
                type="button"
                onClick={() => setShowAddUserModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#12A1A4] hover:bg-[#0e8385] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Registrar Familia Manual</span>
              </button>
            )}
            {activeTab === 'guests' && (
              <button
                type="button"
                onClick={() => setShowCreatePassModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#EE751C] hover:bg-[#d96512] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Generar Pase de Invitado</span>
              </button>
            )}
            {activeTab === 'admins' && (
              <button
                type="button"
                onClick={() => setShowCreateAdminModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Nuevo Administrador</span>
              </button>
            )}
          </div>
        </div>

        {/* Selector de Pestañas Principales */}
        <div className="flex flex-wrap gap-2 pt-4">
          <button
            type="button"
            onClick={() => setActiveTab('families')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'families'
                ? 'bg-[#12A1A4] text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Familias y Suscripciones ({users.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guests')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'guests'
                ? 'bg-[#EE751C] text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>Pases de Invitados y Demos ({guestPasses.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('admins')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'admins'
                ? 'bg-[#0A192F] text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Administradores y Seguridad ({admins.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'pricing'
                ? 'bg-[#EE751C] text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Precios y Ofertas ({pricingConfig.planes.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-slate-800 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Bitácora de Auditoría ({auditLogs.length})</span>
          </button>
        </div>
      </div>

      {/* =======================================================================
          PESTAÑA 1: FAMILIAS Y SUSCRIPCIONES
      ======================================================================= */}
      {activeTab === 'families' && (
        <div className="space-y-6">
          {/* Métricas de Familias */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Familias Activas</span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">
                {users.filter(u => u.status === 'active').length}
              </span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">En Período de Prueba</span>
              <span className="text-2xl font-black text-[#F8AD22] mt-1 block">
                {users.filter(u => u.status === 'trial').length}
              </span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Cuentas Suspendidas</span>
              <span className="text-2xl font-black text-rose-600 mt-1 block">
                {users.filter(u => u.status === 'suspended').length}
              </span>
            </div>
          </div>

          {/* Filtros de Búsqueda */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por RUN, nombre de apoderado, correo o alumno..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#12A1A4]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-[#12A1A4]"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="trial">Prueba 7 Días</option>
              <option value="suspended">Suspendidos</option>
            </select>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-[#12A1A4]"
            >
              <option value="all">Todos los cursos</option>
              {ALL_GRADES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => refreshAll()}
              disabled={isLoadingBackendFamilies}
              title="Sincronizar familias con Neon PostgreSQL"
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#12A1A4] ${isLoadingBackendFamilies ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sincronizar BD</span>
            </button>
          </div>

          {/* Tabla de Familias */}
          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Apoderado (RUN / Correo)</th>
                    <th className="py-3 px-4">Estudiante</th>
                    <th className="py-3 px-4">PIN Alumno</th>
                    <th className="py-3 px-4">Cursos Habilitados</th>
                    <th className="py-3 px-4">Estado</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                        No se encontraron familias registradas con los filtros seleccionados.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{user.name}</div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                            <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-semibold">
                              {user.rut || 'Sin RUN'}
                            </span>
                            <span>{user.email}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-800">{user.studentName || 'Estudiante'}</div>
                          {user.studentRun && (
                            <span className="font-mono text-[10px] text-slate-500">{user.studentRun}</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-black text-[#F8AD22] bg-[#F8AD22]/10 px-2 py-1 rounded-md text-xs tracking-wider">
                              {visiblePins[user.id] ? user.studentPin || '123456' : '••••••'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleTogglePinVisibility(user.id)}
                              className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-1"
                              title={visiblePins[user.id] ? 'Ocultar PIN' : 'Ver PIN'}
                            >
                              {visiblePins[user.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRegeneratePin(user)}
                              className="text-slate-400 hover:text-[#12A1A4] transition-colors cursor-pointer p-1"
                              title="Regenerar PIN numérico"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {ALL_GRADES.map((g) => {
                              const active = user.enrolledGrades.includes(g);
                              return (
                                <button
                                  key={g}
                                  type="button"
                                  onClick={() => handleGradeToggle(user, g)}
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                                    active
                                      ? 'bg-[#12A1A4] text-white shadow-2xs'
                                      : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                  }`}
                                  title={`Alternar habilitación de ${g}`}
                                >
                                  {g.replace(' Básico', 'B')}
                                </button>
                              );
                            })}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={user.status}
                            onChange={(e) => handleStatusChange(user.id, e.target.value as any, user.name)}
                            className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                              user.status === 'active'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : user.status === 'trial'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            <option value="active">Activo</option>
                            <option value="trial">Prueba</option>
                            <option value="suspended">Suspendido</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleGenerateTempPassword(user)}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-[#12A1A4] text-slate-700 hover:text-[#12A1A4] text-[11px] font-bold transition-all cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                              title="Generar clave temporal de soporte"
                            >
                              <KeyRound className="w-3.5 h-3.5" />
                              <span>Clave Soporte</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteTargetUser(user)}
                              className="p-1.5 rounded-lg border border-rose-200 hover:border-rose-400 bg-rose-50/50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 transition-all cursor-pointer inline-flex items-center justify-center shadow-2xs"
                              title="Eliminar suscripción y cuenta para siempre"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          PESTAÑA 2: PASES DE INVITADOS Y DEMOS
      ======================================================================= */}
      {activeTab === 'guests' && (
        <div className="space-y-6">
          {/* Métricas Pases */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Pases Activos</span>
              <span className="text-2xl font-black text-[#EE751C] mt-1 block">
                {guestPasses.filter(p => p.status === 'active').length}
              </span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total de Accesos Registrados</span>
              <span className="text-2xl font-black text-slate-800 mt-1 block">
                {guestPasses.reduce((acc, p) => acc + (p.accessCount || 0), 0)}
              </span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Pases Revocados / Vencidos</span>
              <span className="text-2xl font-black text-slate-400 mt-1 block">
                {guestPasses.filter(p => p.status !== 'active').length}
              </span>
            </div>
          </div>

          {/* Filtros de Pases */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={guestSearchQuery}
                onChange={(e) => setGuestSearchQuery(e.target.value)}
                placeholder="Buscar por código de pase, destinatario o correo..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#EE751C]"
              />
            </div>
            <select
              value={guestStatusFilter}
              onChange={(e) => setGuestStatusFilter(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-[#EE751C]"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="expired">Expirados</option>
              <option value="revoked">Revocados</option>
            </select>
          </div>

          {/* Tabla de Pases de Invitados */}
          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Código de Pase</th>
                    <th className="py-3 px-4">Beneficiario / Destinatario</th>
                    <th className="py-3 px-4">Cursos Habilitados</th>
                    <th className="py-3 px-4">Vigencia / Vencimiento</th>
                    <th className="py-3 px-4">Uso (Accesos)</th>
                    <th className="py-3 px-4">Estado</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPasses.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                        No se encontraron pases de invitados generados.
                      </td>
                    </tr>
                  ) : (
                    filteredPasses.map((pass) => {
                      const isExpired = new Date() > new Date(pass.expiresAt);
                      return (
                        <tr key={pass.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-extrabold text-sm text-[#0A192F] bg-slate-100 px-2 py-1 rounded border border-slate-200">
                                {pass.code}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyPassCode(pass.code, pass.id)}
                                className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer p-1"
                                title="Copiar código de pase"
                              >
                                {copiedPassId === pass.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                            {pass.notes && (
                              <p className="text-[10px] text-slate-400 mt-1 italic">{pass.notes}</p>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-800">{pass.name}</div>
                            {pass.email && <div className="text-[11px] text-slate-500">{pass.email}</div>}
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1">
                              {pass.enrolledGrades.map((g) => (
                                <span key={g} className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#12A1A4]/10 text-[#12A1A4] border border-[#12A1A4]/20">
                                  {g}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-700">
                              {new Date(pass.expiresAt).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Creado por {pass.createdByAdminName}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-800">
                              {pass.accessCount} {pass.accessCount === 1 ? 'visita' : 'visitas'}
                            </div>
                            {pass.lastAccess && (
                              <div className="text-[10px] text-slate-400">
                                Último: {new Date(pass.lastAccess).toLocaleDateString('es-CL')}
                              </div>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                              pass.status === 'revoked'
                                ? 'bg-rose-100 text-rose-700'
                                : isExpired
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {pass.status === 'revoked' ? 'Revocado' : isExpired ? 'Vencido' : 'Activo'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            {pass.status === 'active' && !isExpired && (
                              <button
                                type="button"
                                onClick={() => handleRevokePass(pass)}
                                className="px-2 py-1 rounded text-rose-600 hover:bg-rose-50 border border-rose-200 text-[10px] font-bold transition-all cursor-pointer"
                                title="Revocar pase inmediatamente"
                              >
                                Revocar
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleExtendPass(pass, 7)}
                              className="px-2 py-1 rounded text-[#EE751C] hover:bg-orange-50 border border-orange-200 text-[10px] font-bold transition-all cursor-pointer"
                              title="Extender 7 días adicionales"
                            >
                              +7 Días
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          PESTAÑA 3: ADMINISTRADORES Y SEGURIDAD
      ======================================================================= */}
      {activeTab === 'admins' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Card Izquierda: Cambio de Contraseña del Administrador Activo */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-[#0A192F] font-bold text-sm">
                  <KeyRound className="w-5 h-5 text-[#12A1A4]" />
                  <span>Cambiar Clave de Administrador</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Actualiza la contraseña de tu cuenta administrativa activa en esta estación.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                <div className="text-slate-500 text-[11px]">Administrador en sesión:</div>
                <div className="font-bold text-slate-900">{activeAdminUser?.name || 'Administrador General'}</div>
                <div className="font-mono text-slate-600">{activeAdminUser?.email || 'admin@estudiosimple.cl'}</div>
                <div className="mt-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#12A1A4]/10 text-[#12A1A4] border border-[#12A1A4]/20 uppercase">
                    Rol: {activeAdminUser?.role || 'superadmin'}
                  </span>
                </div>
              </div>

              <form onSubmit={handleChangeCurrentPassword} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nueva Contraseña</label>
                  <input
                    type="password"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="Mínimo 4 caracteres"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#12A1A4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Confirmar Nueva Contraseña</label>
                  <input
                    type="password"
                    value={confirmAdminPassword}
                    onChange={(e) => setConfirmAdminPassword(e.target.value)}
                    placeholder="Repite la contraseña"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#12A1A4]"
                  />
                </div>

                {passwordStatus.type === 'error' && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {passwordStatus.message}
                  </div>
                )}

                {passwordStatus.type === 'success' && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{passwordStatus.message}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0A192F] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Actualizar Mi Clave de Administrador
                </button>
              </form>
            </div>

            {/* Card Derecha: Lista de Administradores Registrados */}
            <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#12A1A4]" />
                    <span>Cuentas Administrativas del Sistema</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Equipo con facultades para intervenir usuarios, generar pases y auditar la plataforma.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {admins.map((adm) => {
                  const isCurrent = activeAdminUser?.id === adm.id;
                  return (
                    <div key={adm.id} className="py-3.5 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs">{adm.name}</span>
                          {isCurrent && (
                            <span className="text-[10px] font-extrabold bg-[#12A1A4]/15 text-[#12A1A4] px-1.5 py-0.2 rounded">
                              Tú
                            </span>
                          )}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            adm.role === 'superadmin'
                              ? 'bg-purple-100 text-purple-800'
                              : adm.role === 'admin'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {adm.role}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{adm.email}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Registrado el {new Date(adm.createdAt).toLocaleDateString('es-CL')}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          adm.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {adm.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                        {!isCurrent && (
                          <button
                            type="button"
                            onClick={() => handleToggleAdmin(adm)}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-slate-400 text-slate-600 text-[11px] font-bold transition-all cursor-pointer"
                          >
                            {adm.isActive ? 'Desactivar' : 'Activar'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          PESTAÑA 4: BITACORA DE AUDITORIA E INTERVENCIONES
      ======================================================================= */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          {/* Métricas Auditoría */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Intervenciones</span>
              <span className="text-2xl font-black text-slate-800 mt-1 block">{auditLogs.length}</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Inicios de Sesión</span>
              <span className="text-2xl font-black text-[#12A1A4] mt-1 block">
                {auditLogs.filter(l => l.action.startsWith('LOGIN')).length}
              </span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Cambios de Clave / PIN</span>
              <span className="text-2xl font-black text-[#F8AD22] mt-1 block">
                {auditLogs.filter(l => l.action.includes('PASSWORD') || l.action.includes('PIN')).length}
              </span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Pases de Cortesía</span>
              <span className="text-2xl font-black text-[#EE751C] mt-1 block">
                {auditLogs.filter(l => l.action.includes('GUEST_PASS')).length}
              </span>
            </div>
          </div>

          {/* Filtros de Auditoría */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={auditSearchQuery}
                onChange={(e) => setAuditSearchQuery(e.target.value)}
                placeholder="Buscar por actor, correo, objetivo intervenido o detalle..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-800"
              />
            </div>
            <select
              value={auditActionFilter}
              onChange={(e) => setAuditActionFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-slate-800"
            >
              <option value="all">Todas las acciones</option>
              <option value="LOGIN_ADMIN">Inicio Sesión Admin</option>
              <option value="LOGIN_PARENT">Inicio Sesión Apoderado</option>
              <option value="LOGIN_STUDENT">Inicio Sesión Estudiante</option>
              <option value="LOGIN_GUEST">Inicio Sesión Invitado</option>
              <option value="CHANGE_ADMIN_PASSWORD">Cambio Clave Admin</option>
              <option value="CREATE_ADMIN">Creación de Administrador</option>
              <option value="CREATE_GUEST_PASS">Generación Pase Invitado</option>
              <option value="REVOKE_GUEST_PASS">Revocación Pase Invitado</option>
              <option value="CREATE_USER_CHECKOUT">Compra / Checkout</option>
              <option value="GENERATE_TEMP_PASSWORD">Clave Soporte</option>
              <option value="REGENERATE_PIN">Regeneración PIN</option>
              <option value="UPDATE_SITE_CONFIG">Configuración Sitio</option>
            </select>
          </div>

          {/* Tabla de Cronología de Auditoría */}
          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Fecha y Hora</th>
                    <th className="py-3 px-4">Actor / Responsable</th>
                    <th className="py-3 px-4">Acción Realizada</th>
                    <th className="py-3 px-4">Recurso Afectado</th>
                    <th className="py-3 px-4">Detalle de la Intervención</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAuditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                        No hay registros de auditoría que coincidan con la búsqueda.
                      </td>
                    </tr>
                  ) : (
                    filteredAuditLogs.map((log) => {
                      const dateObj = new Date(log.timestamp);
                      const timeStr = dateObj.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
                      const dateStr = dateObj.toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });

                      const isDestructive = log.action.includes('REVOKE') || log.action.includes('DELETE');
                      const isAuth = log.action.startsWith('LOGIN');
                      const isKey = log.action.includes('PASSWORD') || log.action.includes('PIN');

                      return (
                        <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-bold text-slate-800">{dateStr}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{timeStr}</div>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-bold text-slate-900">{log.actorName}</div>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                              <span className="font-mono">{log.actorEmail || 'Sin correo'}</span>
                              <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold uppercase">
                                {log.actorRole}
                              </span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                              isDestructive
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : isKey
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : isAuth
                                ? 'bg-cyan-100 text-cyan-800 border border-cyan-200'
                                : 'bg-slate-100 text-slate-800 border border-slate-200'
                            }`}>
                              {log.action}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-mono text-slate-800 font-semibold max-w-[200px] truncate" title={log.target}>
                              {log.target}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <p className="text-slate-600 text-xs leading-relaxed max-w-md">
                              {log.details}
                            </p>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          PESTAÑA 5: PRECIOS DINAMICOS, CUPONES Y MERCADO PAGO
      ======================================================================= */}
      {activeTab === 'pricing' && (
        <div className="space-y-8">
          {/* SECCION 1: EDICION DE PRECIOS DE PLANES */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base md:text-lg font-black text-slate-800 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#EE751C]" />
                  <span>Configuración de Precios y Ofertas de Suscripción</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Modifica en vivo los precios de cada plan. Para pruebas directas de compra, puedes ingresar $1.000 CLP en el precio de oferta y activar la casilla de oferta.
                </p>
              </div>
            </div>

            {pricingSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{pricingSuccessMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pricingConfig.planes.map((plan) => {
                const edit = editingPlans[plan.id] || {
                  precioNormal: plan.precioNormal,
                  precioOferta: plan.precioOferta,
                  enOferta: plan.enOferta,
                  etiquetaOferta: plan.etiquetaOferta
                };

                return (
                  <div
                    key={plan.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-5 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Plan de Suscripción</span>
                        <h3 className="text-base font-black text-slate-800">{plan.nombre}</h3>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        edit.enOferta ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {edit.enOferta ? 'Oferta Activa' : 'Precio Normal'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Precio Normal (CLP)
                        </label>
                        <input
                          type="number"
                          value={edit.precioNormal}
                          onChange={(e) =>
                            setEditingPlans({
                              ...editingPlans,
                              [plan.id]: { ...edit, precioNormal: Number(e.target.value) }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Precio de Oferta (CLP)
                        </label>
                        <input
                          type="number"
                          value={edit.precioOferta}
                          onChange={(e) =>
                            setEditingPlans({
                              ...editingPlans,
                              [plan.id]: { ...edit, precioOferta: Number(e.target.value) }
                            })
                          }
                          placeholder="Ej. 1000"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-[#EE751C] bg-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">Activar Precio de Oferta</span>
                          <span className="text-[11px] text-slate-500 block">
                            Si está activo, se muestra el precio tachado y se cobra el precio de oferta.
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={edit.enOferta}
                          onChange={(e) =>
                            setEditingPlans({
                              ...editingPlans,
                              [plan.id]: { ...edit, enOferta: e.target.checked }
                            })
                          }
                          className="w-5 h-5 rounded text-[#EE751C] cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Etiqueta de la Oferta
                        </label>
                        <input
                          type="text"
                          value={edit.etiquetaOferta}
                          onChange={(e) =>
                            setEditingPlans({
                              ...editingPlans,
                              [plan.id]: { ...edit, etiquetaOferta: e.target.value }
                            })
                          }
                          placeholder="Ej. Oferta Especial Prueba $1.000"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
                        />
                      </div>
                    </div>

                    {/* Vista Previa de Cómo lo Verá el Usuario */}
                    <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Vista Previa en Página Pública de Precios:
                      </span>
                      <div className="flex items-baseline gap-2">
                        {edit.enOferta ? (
                          <>
                            <span className="text-xs line-through text-slate-400 font-mono">
                              ${edit.precioNormal.toLocaleString('es-CL')} CLP
                            </span>
                            <span className="text-xl font-black text-[#57d6f3] font-mono">
                              ${edit.precioOferta.toLocaleString('es-CL')} CLP
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#F8AD22] text-[#0A192F] text-[10px] font-black uppercase">
                              {edit.etiquetaOferta || 'Oferta'}
                            </span>
                          </>
                        ) : (
                          <span className="text-xl font-black text-white font-mono">
                            ${edit.precioNormal.toLocaleString('es-CL')} CLP
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSavePlanPricing(plan.id)}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar Precios de este Plan</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECCION 2: GESTOR DE CUPONES DE DESCUENTO */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base md:text-lg font-black text-slate-800 flex items-center gap-2">
                <Percent className="w-5 h-5 text-[#12A1A4]" />
                <span>Gestor de Cupones de Descuento</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Crea cupones promocionales o de prueba. Ejemplo: el cupón predeterminado <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">TEST1000</code> fija el total exacto a pagar en $1.000 CLP.
              </p>
            </div>

            {couponSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{couponSuccessMsg}</span>
              </div>
            )}

            {/* Formulario Crear Cupón */}
            <form onSubmit={handleCreateCoupon} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Crear Nuevo Cupón</span>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Código del Cupón *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                    placeholder="Ej. TEST1000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800 bg-white uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tipo de Descuento *
                  </label>
                  <select
                    value={newCouponType}
                    onChange={(e) => setNewCouponType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  >
                    <option value="precio_fijo">Precio Final Fijo (ej. $1.000 CLP)</option>
                    <option value="porcentaje">Porcentaje de Descuento (%)</option>
                    <option value="monto_fijo">Monto Fijo a Restar (CLP)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Valor ({newCouponType === 'porcentaje' ? '%' : 'CLP'}) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newCouponValue}
                    onChange={(e) => setNewCouponValue(Number(e.target.value))}
                    placeholder={newCouponType === 'porcentaje' ? 'Ej. 50' : 'Ej. 1000'}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Plan Aplicable
                  </label>
                  <select
                    value={newCouponPlan}
                    onChange={(e) => setNewCouponPlan(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  >
                    <option value="all">Todos los Planes</option>
                    <option value="monthly">Solo Plan Mensual</option>
                    <option value="full">Solo Plan Anual</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Descripción / Motivo
                </label>
                <input
                  type="text"
                  value={newCouponDesc}
                  onChange={(e) => setNewCouponDesc(e.target.value)}
                  placeholder="Ej. Cupón para pruebas de pasarela y flujo de activación"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#12A1A4] hover:bg-[#0e8385] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Crear Cupón</span>
                </button>
              </div>
            </form>

            {/* Tabla de Cupones */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Código</th>
                    <th className="py-3 px-4">Tipo y Valor</th>
                    <th className="py-3 px-4">Plan Aplicable</th>
                    <th className="py-3 px-4">Usos</th>
                    <th className="py-3 px-4">Estado</th>
                    <th className="py-3 px-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {pricingConfig.cupones.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-slate-400">
                        No hay cupones registrados.
                      </td>
                    </tr>
                  ) : (
                    pricingConfig.cupones.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                            {c.codigo}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {c.tipo === 'precio_fijo' ? (
                            <span className="font-semibold text-emerald-700 font-mono">
                              Total fijo: ${c.valor.toLocaleString('es-CL')} CLP
                            </span>
                          ) : c.tipo === 'porcentaje' ? (
                            <span className="font-semibold text-[#EE751C] font-mono">
                              {c.valor}% de descuento
                            </span>
                          ) : (
                            <span className="font-semibold text-blue-700 font-mono">
                              -${c.valor.toLocaleString('es-CL')} CLP
                            </span>
                          )}
                          <span className="block text-[10px] text-slate-400 mt-0.5">{c.descripcion}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-slate-600 font-medium">
                            {c.planAplicable === 'all'
                              ? 'Todos los planes'
                              : c.planAplicable === 'monthly'
                              ? 'Solo Mensual'
                              : 'Solo Anual'}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-600">
                          {c.usosActuales} {c.usosMaximos ? `/ ${c.usosMaximos}` : ''}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.activo ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {c.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleToggleCoupon(c.id, c.activo)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              c.activo
                                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            }`}
                          >
                            {c.activo ? 'Desactivar' : 'Activar'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECCION 3: PASARELA DE PAGO MERCADO PAGO / MERCADO LIBRE */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base md:text-lg font-black text-slate-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#0A192F]" />
                <span>Configuración de Pasarela de Pagos (Mercado Pago / Mercado Libre)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Conecta tu cuenta de Mercado Pago / Mercado Libre para recibir recaudaciones directas con Webpay Plus, tarjetas y saldo disponible.
              </p>
            </div>

            {gatewaySuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{gatewaySuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveGateway} className="space-y-6">
              {/* Selector de Modo de Pasarela */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Modo de Operación de la Pasarela *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setGatewayProvider('simulated')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      gatewayProvider === 'simulated'
                        ? 'border-[#12A1A4] bg-teal-50/40 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-slate-900">Modo Simulado (Desarrollo Local)</span>
                      <span className={`w-3.5 h-3.5 rounded-full border-2 ${
                        gatewayProvider === 'simulated' ? 'border-[#12A1A4] bg-[#12A1A4]' : 'border-slate-300'
                      }`} />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      No realiza cargos bancarios reales. Activa inmediatamente la suscripción en el sistema local y genera la ficha de credenciales familiares para pruebas de experiencia.
                    </p>
                  </div>

                  <div
                    onClick={() => setGatewayProvider('mercadopago')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      gatewayProvider === 'mercadopago'
                        ? 'border-[#EE751C] bg-orange-50/40 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-slate-900">Mercado Pago / Mercado Libre (Producción)</span>
                      <span className={`w-3.5 h-3.5 rounded-full border-2 ${
                        gatewayProvider === 'mercadopago' ? 'border-[#EE751C] bg-[#EE751C]' : 'border-slate-300'
                      }`} />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Genera preferencias oficiales de Checkout Pro. El dinero se deposita en tu cuenta de Mercado Libre / Mercado Pago y activa la suscripción al recibir la confirmación de pago.
                    </p>
                  </div>
                </div>
              </div>

              {/* Credenciales de Mercado Pago */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Credenciales de API de Mercado Pago
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Public Key (Clave Pública)
                    </label>
                    <input
                      type="text"
                      value={gatewayPublicKey}
                      onChange={(e) => setGatewayPublicKey(e.target.value)}
                      placeholder="Ej. APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Access Token (Token de Acceso)
                    </label>
                    <input
                      type="password"
                      value={gatewayAccessToken}
                      onChange={(e) => setGatewayAccessToken(e.target.value)}
                      placeholder="Ej. APP_USR-xxxxxxxxxxxxxxx-xxxxxx-xxxxxx"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="sandboxToggle"
                    checked={gatewaySandbox}
                    onChange={(e) => setGatewaySandbox(e.target.checked)}
                    className="w-4 h-4 rounded text-[#EE751C] cursor-pointer"
                  />
                  <label htmlFor="sandboxToggle" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Habilitar Modo Sandbox de Mercado Pago (Pruebas antes de cobros reales)
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Configuración de Pasarela</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =======================================================================
          MODAL 1: CLAVE TEMPORAL FAMILIA
      ======================================================================= */}
      {tempPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <KeyRound className="w-5 h-5 text-[#12A1A4]" />
                <span>Clave Temporal de Soporte</span>
              </div>
              <button
                type="button"
                onClick={() => setTempPasswordModal(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Entrega esta clave al titular <strong className="text-slate-800">{tempPasswordModal.userName}</strong> ({tempPasswordModal.userEmail}) para que pueda ingresar.
            </p>

            {(() => {
              const phone = tempPasswordModal.userPhone ? tempPasswordModal.userPhone.replace(/[^0-9]/g, '') : '';
              const finalPhone = phone.startsWith('56') ? phone : `56${phone}`;
              const text = encodeURIComponent(
                `Hola ${tempPasswordModal.userName}, desde soporte de EstudioSimple te compartimos tu nueva clave de acceso: *${tempPasswordModal.tempPass}*. Puedes ingresar al portal con tu correo o RUN en https://estudiosimple.cl/login`
              );
              const waUrl = phone ? `https://wa.me/${finalPhone}?text=${text}` : null;
              const fullMsg = `Hola ${tempPasswordModal.userName}, desde soporte de EstudioSimple te compartimos tu nueva clave de acceso: ${tempPasswordModal.tempPass}. Puedes ingresar con tu correo o RUN en https://estudiosimple.cl/login`;

              return (
                <div className="space-y-3">
                  {tempPasswordModal.autoSentWhatsApp ? (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-2.5 text-xs text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Despacho automático WhatsApp ejecutado</span>
                        <p className="text-[11px] text-emerald-700 mt-0.5">
                          Se ha registrado y despachado la notificación al teléfono: <strong className="font-mono">{tempPasswordModal.userPhone}</strong>.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-800">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Sin teléfono registrado para auto-envío</span>
                        <p className="text-[11px] text-amber-700 mt-0.5">
                          El apoderado no tiene número de teléfono registrado en el sistema. Puedes copiar la clave o plantilla para enviarla por correo.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Nueva Clave Temporal</span>
                      <span className="font-mono text-base font-black text-[#12A1A4] tracking-wider">
                        {tempPasswordModal.tempPass}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyClipboard(tempPasswordModal.tempPass, 'TEMP_PASS')}
                      className="px-3 py-1.5 rounded-lg bg-[#12A1A4] hover:bg-[#0e8385] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                    >
                      {copiedKey === 'TEMP_PASS' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'TEMP_PASS' ? 'Copiada' : 'Copiar Clave'}</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    {waUrl && (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Abrir Chat de WhatsApp</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => handleCopyClipboard(fullMsg, 'FULL_MSG')}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedKey === 'FULL_MSG' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'FULL_MSG' ? 'Mensaje Copiado' : 'Copiar Mensaje Formal'}</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            <div className="text-right pt-2">
              <button
                type="button"
                onClick={() => setTempPasswordModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          MODAL 2: REGISTRO MANUAL FAMILIA
      ======================================================================= */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <Users className="w-5 h-5 text-[#12A1A4]" />
                <span>Registrar Familia Manualmente</span>
              </div>
              <button
                type="button"
                onClick={() => setShowAddUserModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateManualUser} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Apoderado</label>
                  <input
                    type="text"
                    required
                    value={newUserData.name}
                    onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                    placeholder="ej. Marcela González"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">RUN Apoderado</label>
                  <input
                    type="text"
                    required
                    value={newUserData.rut}
                    onChange={(e) => setNewUserData({ ...newUserData, rut: formatRutOnInput(e.target.value) })}
                    placeholder="15.321.876-5"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    placeholder="apoderado@correo.cl"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono Móvil</label>
                  <input
                    type="text"
                    value={newUserData.phone}
                    onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })}
                    placeholder="+56 9 1234 5678"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Estudiante</label>
                  <input
                    type="text"
                    required
                    value={newUserData.studentName}
                    onChange={(e) => setNewUserData({ ...newUserData, studentName: e.target.value })}
                    placeholder="ej. Lucas González"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">RUN Estudiante</label>
                  <input
                    type="text"
                    value={newUserData.studentRun}
                    onChange={(e) => setNewUserData({ ...newUserData, studentRun: formatRutOnInput(e.target.value) })}
                    placeholder="26.890.114-7 (opcional)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Curso Inicial</label>
                  <select
                    value={newUserData.grade}
                    onChange={(e) => setNewUserData({ ...newUserData, grade: e.target.value as GradeLevel })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  >
                    {ALL_GRADES.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Plan</label>
                  <select
                    value={newUserData.plan}
                    onChange={(e) => setNewUserData({ ...newUserData, plan: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  >
                    <option value="full">Anual Exámenes Libres</option>
                    <option value="monthly">Mensual</option>
                    <option value="trial">Prueba 7 Días</option>
                  </select>
                </div>
              </div>

              {formError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {formError}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#12A1A4] hover:bg-[#0e8385] text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Crear Cuenta y Asignar Claves
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =======================================================================
          MODAL 3: GENERAR PASE DE INVITADO
      ======================================================================= */}
      {showCreatePassModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <Ticket className="w-5 h-5 text-[#EE751C]" />
                <span>Generar Pase de Invitado / Demo</span>
              </div>
              <button
                type="button"
                onClick={() => setShowCreatePassModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePassSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del Beneficiario</label>
                <input
                  type="text"
                  required
                  value={newPassData.name}
                  onChange={(e) => setNewPassData({ ...newPassData, name: e.target.value })}
                  placeholder="ej. Familia Gómez - Evaluación Homeschooling"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Correo de Contacto (opcional)</label>
                <input
                  type="email"
                  value={newPassData.email}
                  onChange={(e) => setNewPassData({ ...newPassData, email: e.target.value })}
                  placeholder="ej. evaluacion@familia.cl"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Duración del Pase</label>
                <select
                  value={newPassData.durationDays}
                  onChange={(e) => setNewPassData({ ...newPassData, durationDays: parseInt(e.target.value, 10) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                >
                  <option value={1}>24 Horas (1 Día de prueba rápida)</option>
                  <option value={7}>7 Días (1 Semana de evaluación)</option>
                  <option value={14}>14 Días (2 Semanas institucional)</option>
                  <option value={30}>30 Días (1 Mes convenio comunidad)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cursos Habilitados</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {ALL_GRADES.map((g) => {
                    const selected = newPassData.enrolledGrades.includes(g);
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => {
                          const updated = selected
                            ? newPassData.enrolledGrades.filter(x => x !== g)
                            : [...newPassData.enrolledGrades, g];
                          setNewPassData({ ...newPassData, enrolledGrades: updated });
                        }}
                        className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          selected
                            ? 'bg-[#EE751C] text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notas Internas</label>
                <input
                  type="text"
                  value={newPassData.notes}
                  onChange={(e) => setNewPassData({ ...newPassData, notes: e.target.value })}
                  placeholder="ej. Solicitado en feria de educación libre"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              {passFormError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {passFormError}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreatePassModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#EE751C] hover:bg-[#d96512] text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Generar Pase y Código
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =======================================================================
          MODAL 4: CREAR NUEVO ADMINISTRADOR
      ======================================================================= */}
      {showCreateAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <UserPlus className="w-5 h-5 text-[#0A192F]" />
                <span>Registrar Nuevo Administrador</span>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateAdminModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAdminSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={newAdminData.name}
                  onChange={(e) => setNewAdminData({ ...newAdminData, name: e.target.value })}
                  placeholder="ej. Daniel Pedagogo"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={newAdminData.email}
                  onChange={(e) => setNewAdminData({ ...newAdminData, email: e.target.value })}
                  placeholder="ej. daniel@estudiosimple.cl"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contraseña Inicial</label>
                <input
                  type="password"
                  required
                  value={newAdminData.password}
                  onChange={(e) => setNewAdminData({ ...newAdminData, password: e.target.value })}
                  placeholder="Mínimo 4 caracteres"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rol de Acceso</label>
                <select
                  value={newAdminData.role}
                  onChange={(e) => setNewAdminData({ ...newAdminData, role: e.target.value as AdminRole })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                >
                  <option value="admin">Administrador (Contenidos, pases y familias)</option>
                  <option value="superadmin">Superadmin (Acceso total y gestión de claves)</option>
                  <option value="soporte">Soporte (Generación de claves y reseteo de PIN)</option>
                </select>
              </div>

              {adminFormError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {adminFormError}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateAdminModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0A192F] hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Crear Administrador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =======================================================================
          MODAL 5: ELIMINAR SUSCRIPCIÓN Y CUENTA PARA SIEMPRE
      ======================================================================= */}
      {deleteTargetUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-rose-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-xl bg-rose-100 text-rose-600 shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-black text-slate-900">
                  Eliminar Suscripción y Cuenta para Siempre
                </h3>
                <p className="text-xs text-rose-600 font-semibold mt-0.5">
                  Esta acción es crítica, destructiva e irreversible.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Apoderado:</span>
                <span className="font-bold text-slate-900">{deleteTargetUser.name}</span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">RUN / Correo:</span>
                <span className="font-mono font-semibold text-slate-800">
                  {deleteTargetUser.rut || deleteTargetUser.email}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Estudiante:</span>
                <span className="font-bold text-slate-900">{deleteTargetUser.studentName || 'Estudiante'}</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-slate-500 font-medium">Estado actual:</span>
                <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-700">
                  {deleteTargetUser.status} ({deleteTargetUser.plan || 'Plan'})
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/60 text-rose-800 text-[11px] leading-relaxed">
              <p className="font-bold mb-1">Consecuencias inmediatas:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Se cancela y revoca el acceso a la plataforma de inmediato.</li>
                <li>Se purgan registros de progreso escolar y respuestas en base de datos.</li>
                <li>Se eliminan órdenes de suscripción y credenciales asociadas.</li>
              </ul>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isDeletingUser}
                onClick={() => setDeleteTargetUser(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isDeletingUser}
                onClick={handleConfirmDeleteUser}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-bold transition-all cursor-pointer shadow-md inline-flex items-center gap-2 disabled:opacity-50"
              >
                {isDeletingUser ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Eliminando...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Sí, Eliminar Definitivamente</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
