import { ParentUser, GradeLevel } from '../types';
import { cleanRut, formatRut } from './rut-validator';

const LOCAL_STORAGE_USERS_KEY = 'estudiosimple_registered_users';
const LOCAL_STORAGE_SYNCED_KEY = 'estudiosimple_users_synced_db';

/**
 * Lista negra de cuentas semilla/demo históricas para purga irreversible.
 * En producción NUNCA se inyectan usuarios ficticios.
 */
export const DEMO_SEED_EMAILS = new Set([
  'carolina@estudiosimple.cl',
  'rodrigo.silva@gmail.com',
  'mgonzalez@educarchile.cl',
  'vvalenzuela@vtr.net'
]);

export const DEMO_SEED_IDS = new Set([
  'usr-chile-01',
  'usr-chile-02',
  'usr-chile-03',
  'usr-chile-04'
]);

export function isSeedDemoUser(user: { id?: string; email?: string } | null | undefined): boolean {
  if (!user) return false;
  if (user.id && DEMO_SEED_IDS.has(user.id)) return true;
  if (user.email && DEMO_SEED_EMAILS.has(user.email.toLowerCase().trim())) return true;
  return false;
}

const SEED_USERS: ParentUser[] = [];

let isInitialized = false;
let cachedUsers: ParentUser[] = [];

/**
 * Inicializa el repositorio desde localStorage suprimiendo permanentemente cualquier semilla demo residual.
 */
export function initializeUsersRegistry(): ParentUser[] {
  if (typeof window === 'undefined') {
    return cachedUsers;
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);

    if (raw !== null) {
      const parsed: ParentUser[] = JSON.parse(raw);
      // Purgar de forma permanente cualquier cuenta demo residual de localStorage
      cachedUsers = Array.isArray(parsed) ? parsed.filter((u) => !isSeedDemoUser(u)) : [];
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(cachedUsers));
    } else {
      cachedUsers = [];
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, '[]');
      localStorage.setItem(LOCAL_STORAGE_SYNCED_KEY, 'true');
    }
  } catch (err) {
    console.error('Error al inicializar registro de usuarios:', err);
    cachedUsers = [];
  }

  isInitialized = true;
  return cachedUsers;
}

/**
 * Carga de forma asíncrona la lista centralizada de familias desde Neon DB / API backend
 * y actualiza la caché local suprimiendo semillas demo y preservando familias locales.
 */
export async function fetchRegisteredUsersFromBackend(): Promise<ParentUser[]> {
  if (typeof window === 'undefined' || typeof fetch !== 'function') {
    return getAllRegisteredUsers();
  }

  try {
    const res = await fetch('/api/admin/families');
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.families)) {
        // 1. Filtrar cualquier semilla que venga del backend
        const cleanBackendFamilies: ParentUser[] = data.families.filter((f: ParentUser) => !isSeedDemoUser(f));

        // 2. Obtener usuarios locales limpios
        const currentLocal = getAllRegisteredUsers().filter((l) => !isSeedDemoUser(l));

        // Si el backend viene con datos válidos o si ambos están vacíos
        const mergedMap = new Map<string, ParentUser>();

        cleanBackendFamilies.forEach((bUser) => {
          if (bUser.email) {
            mergedMap.set(bUser.email.toLowerCase().trim(), bUser);
          }
        });

        // Asegurar que las familias locales reales no registradas aún en backend se preserven y sincronicen
        currentLocal.forEach((localUser) => {
          const key = localUser.email ? localUser.email.toLowerCase().trim() : '';
          if (key && !mergedMap.has(key)) {
            mergedMap.set(key, localUser);
            syncUserToNeon(localUser);
          }
        });

        const mergedFamilies = Array.from(mergedMap.values());
        cachedUsers = mergedFamilies;
        isInitialized = true;

        try {
          localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(mergedFamilies));
          localStorage.setItem(LOCAL_STORAGE_SYNCED_KEY, 'true');
        } catch (e) {
          console.warn('[UserRepository] Error al guardar en localStorage:', e);
        }

        return mergedFamilies;
      }
    }
  } catch (err) {
    console.warn('[UserRepository] No se pudo conectar al endpoint /api/admin/families:', err);
  }

  return getAllRegisteredUsers().filter((u) => !isSeedDemoUser(u));
}

/**
 * Obtiene todos los usuarios registrados (desde memoria o localStorage).
 */
export function getAllRegisteredUsers(): ParentUser[] {
  if (!isInitialized) {
    initializeUsersRegistry();
  }
  return cachedUsers;
}

/**
 * Persiste los usuarios en localStorage y en memoria caché.
 */
function persistUsers(users: ParentUser[]): void {
  cachedUsers = users;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
      localStorage.setItem(LOCAL_STORAGE_SYNCED_KEY, 'true');
    } catch (err) {
      console.error('Error al guardar usuarios en localStorage:', err);
    }
  }
}

/**
 * Sincroniza un usuario con Neon DB y con el archivo de persistencia dual del servidor.
 */
export function syncUserToNeon(
  user: ParentUser,
  grade?: GradeLevel,
  extra?: { password?: string; studentPin?: string; paymentId?: string; amount?: number }
): Promise<{ success: boolean; error?: string }> {
  if (typeof window !== 'undefined' && typeof fetch === 'function') {
    return fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rut: user.rut,
        name: user.name,
        email: user.email,
        password: extra?.password || user.password,
        studentName: user.studentName,
        studentRun: user.studentRun,
        studentPin: extra?.studentPin || user.studentPin,
        studentId: user.studentId,
        grade: grade || (user.enrolledGrades && user.enrolledGrades[0]),
        plan: user.plan,
        phone: user.phone,
        paymentId: extra?.paymentId,
        amount: extra?.amount
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user?.id) {
          user.id = data.user.id;
        }
        return { success: Boolean(data?.success) };
      })
      .catch((err) => {
        console.warn('[syncUserToNeon] Advertencia al sincronizar con backend:', err.message);
        return { success: false, error: err.message };
      });
  }
  return Promise.resolve({ success: false, error: 'No browser fetch available' });
}

/**
 * Registra o actualiza un usuario que completó el Checkout.
 * Si el RUN ya existe, añade el nuevo curso y actualiza la suscripción sin duplicar la cuenta.
 */
export function registerUserFromCheckout(params: {
  rut: string;
  name: string;
  email: string;
  password?: string;
  studentName: string;
  studentRun?: string;
  studentPin?: string;
  grade: GradeLevel;
  plan: 'monthly' | 'full' | 'trial';
  phone?: string;
  amount?: number;
  paymentId?: string;
}): { user: ParentUser; isNew: boolean; syncPromise?: Promise<{ success: boolean; error?: string }> } {
  const users = getAllRegisteredUsers();
  const cleanIncomingRut = cleanRut(params.rut);
  const normalizedEmail = (params.email || '').toLowerCase().trim();

  // Buscar si el usuario ya existe por RUN o por Email
  const existingIdx = users.findIndex(
    (u) =>
      (u.rut && cleanRut(u.rut) === cleanIncomingRut) ||
      u.email.toLowerCase().trim() === normalizedEmail
  );

  const planMapping: 'mensual' | 'anual' = params.plan === 'full' ? 'anual' : 'mensual';

  if (existingIdx >= 0) {
    // Usuario existente: incorporar el curso nuevo a sus enrolledGrades sin duplicados
    const existing = users[existingIdx];
    const updatedGrades = Array.from(new Set([...existing.enrolledGrades, params.grade]));

    const updatedUser: ParentUser = {
      ...existing,
      name: params.name || existing.name,
      rut: existing.rut || formatRut(params.rut),
      phone: params.phone || existing.phone,
      password: params.password || existing.password || 'demo2026',
      subscriptionActive: true,
      status: 'active',
      plan: planMapping,
      enrolledGrades: updatedGrades,
      lastLogin: new Date().toISOString()
    };

    if (params.studentName && !existing.studentName) {
      updatedUser.studentName = params.studentName;
    }
    if (params.studentRun && !existing.studentRun) {
      updatedUser.studentRun = formatRut(params.studentRun);
    }
    if (params.studentPin) {
      updatedUser.studentPin = params.studentPin;
    }

    users[existingIdx] = updatedUser;
    persistUsers(users);
    const syncPromise = syncUserToNeon(updatedUser, params.grade, {
      password: updatedUser.password,
      studentPin: updatedUser.studentPin,
      amount: params.amount,
      paymentId: params.paymentId
    });
    return { user: updatedUser, isNew: false, syncPromise };
  }

  // Usuario nuevo: crear credenciales y PIN
  const newId = `usr-${Date.now()}`;
  const generatedPin = params.studentPin || Math.floor(100000 + Math.random() * 900000).toString();

  const newUser: ParentUser = {
    id: newId,
    rut: formatRut(params.rut),
    name: params.name,
    email: normalizedEmail,
    password: params.password || 'demo2026',
    phone: params.phone || '',
    studentId: `stu-${Date.now()}`,
    studentName: params.studentName || 'Estudiante',
    studentRun: params.studentRun ? formatRut(params.studentRun) : '',
    studentPin: generatedPin,
    status: params.plan === 'trial' ? 'trial' : 'active',
    subscriptionActive: true,
    plan: planMapping,
    enrolledGrades: [params.grade],
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };

  const updatedUsers = [newUser, ...users];
  persistUsers(updatedUsers);
  const syncPromise = syncUserToNeon(newUser, params.grade, {
    password: newUser.password,
    studentPin: newUser.studentPin,
    amount: params.amount,
    paymentId: params.paymentId
  });
  return { user: newUser, isNew: true, syncPromise };
}

/**
 * Modifica la lista de cursos habilitados para un usuario específico.
 */
export function updateUserGrades(userId: string, grades: GradeLevel[]): void {
  const users = getAllRegisteredUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx >= 0) {
    users[idx] = {
      ...users[idx],
      enrolledGrades: grades
    };
    persistUsers(users);
  }
}

/**
 * Modifica el estado de suscripción de un usuario (activo, suspendido o prueba).
 */
export function updateUserStatus(userId: string, status: 'active' | 'suspended' | 'trial'): void {
  const users = getAllRegisteredUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx >= 0) {
    users[idx] = {
      ...users[idx],
      status,
      subscriptionActive: status !== 'suspended'
    };
    persistUsers(users);
  }
}

/**
 * Actualiza la contraseña personalizada del apoderado, persiste localmente
 * y sincroniza hacia Neon DB a traves de la API.
 */
export async function updateUserPassword(
  userId: string,
  newPassword: string,
  email?: string,
  rut?: string
): Promise<{ success: boolean; message?: string }> {
  const users = getAllRegisteredUsers();
  const cleanIncomingRut = rut ? cleanRut(rut) : '';
  const normalizedEmail = email ? email.toLowerCase().trim() : '';

  const idx = users.findIndex((u) => {
    if (userId && u.id === userId) return true;
    if (normalizedEmail && u.email?.toLowerCase().trim() === normalizedEmail) return true;
    if (cleanIncomingRut && u.rut && cleanRut(u.rut) === cleanIncomingRut) return true;
    return false;
  });

  let targetUser: ParentUser | null = null;

  if (idx >= 0) {
    users[idx] = {
      ...users[idx],
      password: newPassword
    };
    targetUser = users[idx];
    persistUsers(users);
  }

  if (typeof fetch !== 'undefined') {
    try {
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: targetUser?.id || userId,
          email: targetUser?.email || email,
          rut: targetUser?.rut || rut,
          newPassword
        })
      });
      const data = await res.json();
      return { success: data.success !== false, message: data.message };
    } catch (err: any) {
      console.warn('[UserRepository] Error al sincronizar cambio de clave en backend:', err?.message);
      return { success: true, message: 'Actualizado localmente' };
    }
  }

  return { success: true };
}

/**
 * Genera una contraseña temporal de alta entropía para soporte técnico,
 * actualiza el repositorio local y sincroniza en Neon DB con notificación WhatsApp.
 */
export function generateTemporaryPassword(userId: string, autoNotifyWhatsApp = true): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const tempPass = `Temp-${rand}!`;

  const users = getAllRegisteredUsers();
  const idx = users.findIndex((u) => u.id === userId);
  let targetUser: ParentUser | null = null;

  if (idx >= 0) {
    users[idx] = {
      ...users[idx],
      password: tempPass
    };
    targetUser = users[idx];
    persistUsers(users);
  }

  // Despacho asincrono de reseteo a Neon DB y envio de WhatsApp
  if (typeof fetch !== 'undefined' && targetUser) {
    fetch('/api/admin/family/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: targetUser.id,
        email: targetUser.email,
        rut: targetUser.rut,
        phone: targetUser.phone,
        recipientName: targetUser.name,
        newPassword: tempPass,
        autoNotifyWhatsApp
      })
    }).catch((err) => {
      console.warn('[UserRepository] Error al sincronizar reseteo de clave en backend:', err?.message);
    });
  }

  return tempPass;
}

/**
 * Regenera el PIN infantil de 6 dígitos del estudiante asociado.
 */
export function regenerateStudentPin(userId: string): string {
  const newPin = Math.floor(100000 + Math.random() * 900000).toString();
  const users = getAllRegisteredUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx >= 0) {
    users[idx] = {
      ...users[idx],
      studentPin: newPin
    };
    persistUsers(users);
  }
  return newPin;
}

/**
 * Busca un usuario por email o por RUN chileno.
 */
export function findUserByEmailOrRut(identifier: string): ParentUser | null {
  const cleanId = cleanRut(identifier);
  const normalizedEmail = (identifier || '').toLowerCase().trim();
  const users = getAllRegisteredUsers();

  return (
    users.find((u) => {
      const matchRut = u.rut && cleanRut(u.rut) === cleanId;
      const matchEmail = u.email.toLowerCase().trim() === normalizedEmail;
      return matchRut || matchEmail;
    }) || null
  );
}

/**
 * Elimina definitivamente un usuario y su suscripcion asociada de localStorage y del backend.
 */
export async function deleteUserPermanently(userId: string): Promise<boolean> {
  const users = getAllRegisteredUsers();
  const target = users.find((u) => u.id === userId);
  if (!target) return false;

  const filtered = users.filter((u) => u.id !== userId);
  persistUsers(filtered);

  // Despacho asincrono de purga a nivel servidor y base de datos Neon
  if (typeof fetch !== 'undefined') {
    try {
      await fetch('/api/admin/family/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: target.id,
          email: target.email,
          rut: target.rut
        })
      });
    } catch (err: any) {
      console.warn('[UserRepository] Error al sincronizar eliminacion en backend:', err?.message);
    }
  }

  return true;
}

/**
 * Actualiza los datos de una familia en localStorage y sincroniza con el backend (/api/admin/family/update)
 */
export async function updateFamilyDetails(
  updatedFields: Partial<ParentUser> & { id: string }
): Promise<{ success: boolean; user?: ParentUser; error?: string }> {
  const users = getAllRegisteredUsers();
  const idx = users.findIndex((u) => u.id === updatedFields.id);
  if (idx < 0) {
    return { success: false, error: 'Usuario no encontrado en el registro' };
  }

  const existing = users[idx];
  const mergedUser: ParentUser = {
    ...existing,
    ...updatedFields,
    rut: updatedFields.rut !== undefined ? formatRut(updatedFields.rut) : existing.rut,
    email: updatedFields.email ? updatedFields.email.trim().toLowerCase() : existing.email,
    name: updatedFields.name ? updatedFields.name.trim() : existing.name,
    studentName: updatedFields.studentName !== undefined ? updatedFields.studentName.trim() : existing.studentName,
    studentRun: updatedFields.studentRun !== undefined ? (updatedFields.studentRun ? formatRut(updatedFields.studentRun) : '') : existing.studentRun,
    phone: updatedFields.phone !== undefined ? updatedFields.phone.trim() : existing.phone,
    password: updatedFields.password !== undefined && updatedFields.password.trim() ? updatedFields.password.trim() : existing.password
  };

  users[idx] = mergedUser;
  persistUsers(users);

  // Sincronizar en backend
  if (typeof fetch !== 'undefined') {
    try {
      await fetch('/api/admin/family/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: mergedUser.id,
          id: mergedUser.id,
          name: mergedUser.name,
          rut: mergedUser.rut,
          email: mergedUser.email,
          phone: mergedUser.phone,
          studentName: mergedUser.studentName,
          studentRun: mergedUser.studentRun,
          studentPin: mergedUser.studentPin,
          plan: mergedUser.plan,
          enrolledGrades: mergedUser.enrolledGrades,
          status: mergedUser.status,
          password: mergedUser.password
        })
      });
    } catch (err: any) {
      console.warn('[UserRepository] Error al sincronizar actualización en backend:', err?.message);
    }
  }

  return { success: true, user: mergedUser };
}

// Inicialización automática
if (typeof window !== 'undefined') {
  initializeUsersRegistry();
}
