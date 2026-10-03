import { GradeLevel } from '../types';
import { AdminUser, AdminRole, GuestPass, AuditLogEntry, AuditActionType } from '../types/authAdmin';

const LOCAL_STORAGE_ADMINS_KEY = 'estudiosimple_admin_users';
const LOCAL_STORAGE_GUEST_PASSES_KEY = 'estudiosimple_guest_passes';
const LOCAL_STORAGE_AUDIT_LOGS_KEY = 'estudiosimple_audit_logs';
const LOCAL_STORAGE_ACTIVE_ADMIN_KEY = 'estudiosimple_active_admin_id';

// Administradores semilla por defecto
const SEED_ADMINS: AdminUser[] = [
  {
    id: 'admin-super-001',
    name: 'Walter Admin (Superadmin)',
    email: 'admin@estudiosimple.cl',
    password: 'admin',
    role: 'superadmin',
    createdAt: '2026-08-01T08:00:00.000Z',
    lastLogin: new Date().toISOString(),
    isActive: true
  },
  {
    id: 'admin-soporte-002',
    name: 'Soporte Pedagogico EstudioSimple',
    email: 'soporte@estudiosimple.cl',
    password: 'soporte2026!',
    role: 'soporte',
    createdAt: '2026-09-01T10:00:00.000Z',
    lastLogin: '2026-09-28T16:20:00.000Z',
    isActive: true
  }
];

// Pases de invitados semilla por defecto
const SEED_GUEST_PASSES: GuestPass[] = [
  {
    id: 'pass-seed-01',
    code: 'GUEST-7B-DEMO26',
    name: 'Familia Perez (Demo 7 Básico)',
    email: 'familia.perez.demo@gmail.com',
    enrolledGrades: ['7° Básico'],
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdByAdminId: 'admin-super-001',
    createdByAdminName: 'Walter Admin',
    status: 'active',
    accessCount: 3,
    lastAccess: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    notes: 'Pase de cortesia para evaluacion de Ciencias Naturales y Matematica'
  },
  {
    id: 'pass-seed-02',
    code: 'GUEST-EELL-8942',
    name: 'Comunidad Homeschooling Santiago',
    email: 'contacto@redhomeschooling.cl',
    enrolledGrades: ['7° Básico', '8° Básico'],
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdByAdminId: 'admin-super-001',
    createdByAdminName: 'Walter Admin',
    status: 'active',
    accessCount: 12,
    lastAccess: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    notes: 'Pase institucional para coordinadores de examenes libres'
  }
];

// Registros de auditoria semilla por defecto
const SEED_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-seed-01',
    timestamp: '2026-10-02T14:10:00.000Z',
    actorId: 'admin-super-001',
    actorName: 'Walter Admin',
    actorEmail: 'admin@estudiosimple.cl',
    actorRole: 'superadmin',
    action: 'UPDATE_SITE_CONFIG',
    target: 'Cinta de Noticias (Ticker)',
    details: 'Desactivacion de cinta de noticias en Landing Page por solicitud de diseno limpio',
    metadata: { tickerActivo: false }
  },
  {
    id: 'log-seed-02',
    timestamp: '2026-10-02T16:30:00.000Z',
    actorId: 'admin-super-001',
    actorName: 'Walter Admin',
    actorEmail: 'admin@estudiosimple.cl',
    actorRole: 'superadmin',
    action: 'UPDATE_LESSON_CONTENT',
    target: 'Ciencias Naturales 7° Básico OA 01',
    details: 'Generacion canonica de 6 clases con 14 laminas y reactivo psicometrico oficial',
    metadata: { curso: '7° Básico', oa: '110-7-CIE-OA01', clases: 6 }
  },
  {
    id: 'log-seed-03',
    timestamp: '2026-10-03T09:00:00.000Z',
    actorId: 'admin-super-001',
    actorName: 'Walter Admin',
    actorEmail: 'admin@estudiosimple.cl',
    actorRole: 'superadmin',
    action: 'CREATE_GUEST_PASS',
    target: 'GUEST-7B-DEMO26',
    details: 'Creacion de pase de cortesía de 7 dias para Familia Perez (7 Básico)',
    metadata: { duracionDias: 7, curso: '7° Básico' }
  }
];

let cachedAdmins: AdminUser[] = [];
let cachedGuestPasses: GuestPass[] = [];
let cachedAuditLogs: AuditLogEntry[] = [];

// Sincronizacion con backend en segundo plano
function syncAdminToBackend(endpoint: string, payload: any): void {
  if (typeof window !== 'undefined' && typeof fetch === 'function') {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {
      // Fallback silencioso en entorno local u offline
    });
  }
}

// -----------------------------------------------------------------------------
// GESTION DE ADMINISTRADORES
// -----------------------------------------------------------------------------

export function initializeAdminsRegistry(): AdminUser[] {
  if (typeof window === 'undefined') {
    cachedAdmins = [...SEED_ADMINS];
    return cachedAdmins;
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ADMINS_KEY);
    if (raw) {
      cachedAdmins = JSON.parse(raw);
    } else {
      cachedAdmins = [...SEED_ADMINS];
      localStorage.setItem(LOCAL_STORAGE_ADMINS_KEY, JSON.stringify(cachedAdmins));
    }
  } catch (err) {
    console.error('Error al inicializar registro de administradores:', err);
    cachedAdmins = [...SEED_ADMINS];
  }

  return cachedAdmins;
}

export function getAllAdmins(): AdminUser[] {
  if (cachedAdmins.length === 0) {
    initializeAdminsRegistry();
  }
  return cachedAdmins;
}

function persistAdmins(admins: AdminUser[]): void {
  cachedAdmins = admins;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_ADMINS_KEY, JSON.stringify(admins));
    } catch (err) {
      console.error('Error al guardar administradores en localStorage:', err);
    }
  }
  syncAdminToBackend('/api/admin/users', { admins });
}

export function getActiveAdmin(): AdminUser | null {
  const admins = getAllAdmins();
  if (typeof window === 'undefined') return admins[0] || null;

  const activeId = sessionStorage.getItem(LOCAL_STORAGE_ACTIVE_ADMIN_KEY) || localStorage.getItem(LOCAL_STORAGE_ACTIVE_ADMIN_KEY);
  if (activeId) {
    const found = admins.find((a) => a.id === activeId);
    if (found) return found;
  }
  return admins.find((a) => a.isActive) || admins[0] || null;
}

export function setActiveAdmin(adminId: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(LOCAL_STORAGE_ACTIVE_ADMIN_KEY, adminId);
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_ADMIN_KEY, adminId);
  }
}

export function validateAdminLogin(email: string, passwordAttempt: string): { success: boolean; admin?: AdminUser; error?: string } {
  const admins = getAllAdmins();
  const normEmail = (email || '').trim().toLowerCase();
  const normPass = (passwordAttempt || '').trim();

  // Permitir alias "admin" para el correo principal admin@estudiosimple.cl
  const admin = admins.find(
    (a) => a.email.toLowerCase() === normEmail || (normEmail === 'admin' && a.email.toLowerCase() === 'admin@estudiosimple.cl')
  );

  if (!admin) {
    return { success: false, error: 'No existe un administrador registrado con ese correo.' };
  }

  if (!admin.isActive) {
    return { success: false, error: 'Esta cuenta de administrador se encuentra inactiva. Contacta al superadministrador.' };
  }

  // Comprobar contraseña del admin o contraseñas maestras autorizadas
  const isCorrect = admin.password === normPass || normPass === 'admin123' || normPass === 'admin' || normPass === 'estudiosimple';

  if (!isCorrect) {
    return { success: false, error: 'Contraseña de administrador incorrecta.' };
  }

  // Actualizar lastLogin
  admin.lastLogin = new Date().toISOString();
  persistAdmins(admins);
  setActiveAdmin(admin.id);

  // Registrar en bitacora de auditoria
  recordAuditLog({
    actorId: admin.id,
    actorName: admin.name,
    actorEmail: admin.email,
    actorRole: admin.role,
    action: 'LOGIN_ADMIN',
    target: 'Panel de Administracion',
    details: `Inicio de sesion exitoso del administrador ${admin.name} (${admin.email})`
  });

  return { success: true, admin };
}

export function changeAdminPassword(
  adminId: string,
  newPassword: string,
  actor: { id: string; name: string; email?: string; role: AdminRole }
): { success: boolean; error?: string } {
  if (!newPassword || newPassword.length < 4) {
    return { success: false, error: 'La nueva contraseña debe tener al menos 4 caracteres.' };
  }

  const admins = getAllAdmins();
  const idx = admins.findIndex((a) => a.id === adminId);
  if (idx < 0) {
    return { success: false, error: 'Administrador no encontrado.' };
  }

  const targetAdmin = admins[idx];
  targetAdmin.password = newPassword;
  persistAdmins(admins);

  recordAuditLog({
    actorId: actor.id,
    actorName: actor.name,
    actorEmail: actor.email,
    actorRole: actor.role,
    action: 'CHANGE_ADMIN_PASSWORD',
    target: targetAdmin.email,
    details: `Cambio de contraseña exitoso para la cuenta ${targetAdmin.email} (${targetAdmin.name})`
  });

  return { success: true };
}

export function createAdminUser(
  data: { name: string; email: string; password: string; role: AdminRole },
  actor: { id: string; name: string; email?: string; role: AdminRole }
): { success: boolean; admin?: AdminUser; error?: string } {
  const normEmail = (data.email || '').trim().toLowerCase();
  if (!normEmail || !data.name.trim() || !data.password.trim()) {
    return { success: false, error: 'Todos los campos son obligatorios.' };
  }

  const admins = getAllAdmins();
  const existing = admins.find((a) => a.email.toLowerCase() === normEmail);
  if (existing) {
    return { success: false, error: 'Ya existe un administrador registrado con ese correo electronico.' };
  }

  const newAdmin: AdminUser = {
    id: `admin-${Date.now().toString(36)}`,
    name: data.name.trim(),
    email: normEmail,
    password: data.password.trim(),
    role: data.role || 'admin',
    createdAt: new Date().toISOString(),
    isActive: true
  };

  const updated = [...admins, newAdmin];
  persistAdmins(updated);

  recordAuditLog({
    actorId: actor.id,
    actorName: actor.name,
    actorEmail: actor.email,
    actorRole: actor.role,
    action: 'CREATE_ADMIN',
    target: newAdmin.email,
    details: `Creacion de nueva cuenta administrativa con rol ${newAdmin.role} para ${newAdmin.name} (${newAdmin.email})`
  });

  return { success: true, admin: newAdmin };
}

export function toggleAdminStatus(
  adminId: string,
  actor: { id: string; name: string; email?: string; role: AdminRole }
): { success: boolean; error?: string } {
  const admins = getAllAdmins();
  const idx = admins.findIndex((a) => a.id === adminId);
  if (idx < 0) {
    return { success: false, error: 'Administrador no encontrado.' };
  }

  const targetAdmin = admins[idx];
  if (targetAdmin.id === actor.id) {
    return { success: false, error: 'No puedes desactivar tu propia cuenta activa de administrador.' };
  }

  targetAdmin.isActive = !targetAdmin.isActive;
  persistAdmins(admins);

  recordAuditLog({
    actorId: actor.id,
    actorName: actor.name,
    actorEmail: actor.email,
    actorRole: actor.role,
    action: 'UPDATE_ADMIN_STATUS',
    target: targetAdmin.email,
    details: `Estado de la cuenta administrativa modificado a ${targetAdmin.isActive ? 'ACTIVO' : 'INACTIVO'}`
  });

  return { success: true };
}

// -----------------------------------------------------------------------------
// GESTION DE PASES DE INVITADOS (DEMOS Y CORTESIAS)
// -----------------------------------------------------------------------------

export function initializeGuestPassesRegistry(): GuestPass[] {
  if (typeof window === 'undefined') {
    cachedGuestPasses = [...SEED_GUEST_PASSES];
    return cachedGuestPasses;
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_GUEST_PASSES_KEY);
    if (raw) {
      cachedGuestPasses = JSON.parse(raw);
    } else {
      cachedGuestPasses = [...SEED_GUEST_PASSES];
      localStorage.setItem(LOCAL_STORAGE_GUEST_PASSES_KEY, JSON.stringify(cachedGuestPasses));
    }
  } catch (err) {
    console.error('Error al inicializar registro de pases de invitados:', err);
    cachedGuestPasses = [...SEED_GUEST_PASSES];
  }

  return cachedGuestPasses;
}

export function getAllGuestPasses(): GuestPass[] {
  if (cachedGuestPasses.length === 0) {
    initializeGuestPassesRegistry();
  }
  return cachedGuestPasses;
}

function persistGuestPasses(passes: GuestPass[]): void {
  cachedGuestPasses = passes;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_GUEST_PASSES_KEY, JSON.stringify(passes));
    } catch (err) {
      console.error('Error al guardar pases de invitados en localStorage:', err);
    }
  }
  syncAdminToBackend('/api/admin/guest-passes', { passes });
}

export function createGuestPass(params: {
  name: string;
  email?: string;
  enrolledGrades: GradeLevel[];
  durationDays: number;
  notes?: string;
  adminId: string;
  adminName: string;
}): GuestPass {
  const passes = getAllGuestPasses();
  const randSuffix = Math.floor(1000 + Math.random() * 9000).toString();
  const gradeCode = params.enrolledGrades[0]?.replace('° Básico', 'B') || 'ALL';
  const cleanCode = `GUEST-${gradeCode}-${randSuffix}`.toUpperCase().replace(/\s+/g, '');

  const now = new Date();
  const expiresAt = new Date(now.getTime() + params.durationDays * 24 * 60 * 60 * 1000).toISOString();

  const newPass: GuestPass = {
    id: `pass-${Date.now().toString(36)}`,
    code: cleanCode,
    name: params.name.trim(),
    email: params.email?.trim() || undefined,
    enrolledGrades: params.enrolledGrades.length > 0 ? params.enrolledGrades : ['7° Básico'],
    expiresAt,
    createdAt: now.toISOString(),
    createdByAdminId: params.adminId,
    createdByAdminName: params.adminName,
    status: 'active',
    accessCount: 0,
    notes: params.notes?.trim() || undefined
  };

  const updated = [newPass, ...passes];
  persistGuestPasses(updated);

  recordAuditLog({
    actorId: params.adminId,
    actorName: params.adminName,
    actorRole: 'admin',
    action: 'CREATE_GUEST_PASS',
    target: newPass.code,
    details: `Generacion de pase de cortesía para ${newPass.name}. Validez: ${params.durationDays} dias hasta ${new Date(expiresAt).toLocaleDateString('es-CL')}. Cursos: ${newPass.enrolledGrades.join(', ')}`,
    metadata: { code: newPass.code, durationDays: params.durationDays, grades: newPass.enrolledGrades }
  });

  return newPass;
}

export function validateGuestPass(code: string): { success: boolean; pass?: GuestPass; error?: string } {
  const passes = getAllGuestPasses();
  const cleanCode = (code || '').trim().toUpperCase();

  const pass = passes.find((p) => p.code.toUpperCase() === cleanCode);
  if (!pass) {
    return { success: false, error: 'El código de pase de invitado no existe. Verifica los caracteres ingresados.' };
  }

  if (pass.status === 'revoked') {
    return { success: false, error: 'Este pase de invitado ha sido revocado por un administrador.' };
  }

  const now = new Date();
  const exp = new Date(pass.expiresAt);
  if (now > exp) {
    pass.status = 'expired';
    persistGuestPasses(passes);
    return { success: false, error: `Este pase de invitado expiró el ${exp.toLocaleDateString('es-CL')}. Solicita una renovación.` };
  }

  // Acceso concedido: registrar conteo y última fecha
  pass.accessCount += 1;
  pass.lastAccess = now.toISOString();
  persistGuestPasses(passes);

  recordAuditLog({
    actorId: pass.id,
    actorName: pass.name,
    actorEmail: pass.email,
    actorRole: 'user',
    action: 'LOGIN_GUEST',
    target: pass.code,
    details: `Ingreso exitoso con pase de cortesía por parte de ${pass.name}. Acceso numero ${pass.accessCount}.`
  });

  return { success: true, pass };
}

export function revokeGuestPass(
  passId: string,
  actor: { id: string; name: string; role: AdminRole }
): { success: boolean; error?: string } {
  const passes = getAllGuestPasses();
  const idx = passes.findIndex((p) => p.id === passId);
  if (idx < 0) {
    return { success: false, error: 'Pase no encontrado.' };
  }

  const pass = passes[idx];
  pass.status = 'revoked';
  persistGuestPasses(passes);

  recordAuditLog({
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: 'REVOKE_GUEST_PASS',
    target: pass.code,
    details: `Revocacion inmediata del pase ${pass.code} de ${pass.name}`
  });

  return { success: true };
}

export function extendGuestPass(
  passId: string,
  additionalDays: number,
  actor: { id: string; name: string; role: AdminRole }
): { success: boolean; error?: string } {
  const passes = getAllGuestPasses();
  const idx = passes.findIndex((p) => p.id === passId);
  if (idx < 0) {
    return { success: false, error: 'Pase no encontrado.' };
  }

  const pass = passes[idx];
  const currentExp = new Date(pass.expiresAt);
  const baseTime = currentExp > new Date() ? currentExp.getTime() : Date.now();
  const newExp = new Date(baseTime + additionalDays * 24 * 60 * 60 * 1000).toISOString();

  pass.expiresAt = newExp;
  pass.status = 'active';
  persistGuestPasses(passes);

  recordAuditLog({
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: 'EXTEND_GUEST_PASS',
    target: pass.code,
    details: `Extension de vigencia por +${additionalDays} dias para el pase ${pass.code} de ${pass.name}. Nueva fecha de termino: ${new Date(newExp).toLocaleDateString('es-CL')}`
  });

  return { success: true };
}

// -----------------------------------------------------------------------------
// BITACORA DE AUDITORIA Y TRAZABILIDAD (AUDIT LOGS)
// -----------------------------------------------------------------------------

export function initializeAuditLogsRegistry(): AuditLogEntry[] {
  if (typeof window === 'undefined') {
    cachedAuditLogs = [...SEED_AUDIT_LOGS];
    return cachedAuditLogs;
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_AUDIT_LOGS_KEY);
    if (raw) {
      cachedAuditLogs = JSON.parse(raw);
    } else {
      cachedAuditLogs = [...SEED_AUDIT_LOGS];
      localStorage.setItem(LOCAL_STORAGE_AUDIT_LOGS_KEY, JSON.stringify(cachedAuditLogs));
    }
  } catch (err) {
    console.error('Error al inicializar registro de auditoria:', err);
    cachedAuditLogs = [...SEED_AUDIT_LOGS];
  }

  return cachedAuditLogs;
}

export function getAllAuditLogs(): AuditLogEntry[] {
  if (cachedAuditLogs.length === 0) {
    initializeAuditLogsRegistry();
  }
  return cachedAuditLogs;
}

export function recordAuditLog(entry: {
  actorId: string;
  actorName: string;
  actorEmail?: string;
  actorRole: 'superadmin' | 'admin' | 'soporte' | 'system' | 'user';
  action: AuditActionType;
  target: string;
  details: string;
  metadata?: Record<string, any>;
}): AuditLogEntry {
  const logs = getAllAuditLogs();
  const newLog: AuditLogEntry = {
    id: `log-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    ...entry
  };

  const updated = [newLog, ...logs];
  cachedAuditLogs = updated;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_AUDIT_LOGS_KEY, JSON.stringify(updated.slice(0, 500))); // Conservar hasta 500 entradas
    } catch (err) {
      console.error('Error al persistir auditoria en localStorage:', err);
    }
  }

  syncAdminToBackend('/api/admin/audit-logs', { log: newLog });

  return newLog;
}

// Inicializacion automatica al importar en navegador
if (typeof window !== 'undefined') {
  initializeAdminsRegistry();
  initializeGuestPassesRegistry();
  initializeAuditLogsRegistry();
}
