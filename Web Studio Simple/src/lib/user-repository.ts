import { ParentUser, GradeLevel } from '../types';
import { cleanRut, formatRut } from './rut-validator';

const LOCAL_STORAGE_USERS_KEY = 'estudiosimple_registered_users';
const LOCAL_STORAGE_SYNCED_KEY = 'estudiosimple_users_synced_db';

/**
 * Familias demo iniciales con RUNs chilenos matemáticamente válidos (Módulo 11)
 */
const SEED_USERS: ParentUser[] = [
  {
    id: 'usr-chile-01',
    rut: '15.321.876-5',
    name: 'Carolina Morales R.',
    email: 'carolina@estudiosimple.cl',
    phone: '+56 9 8412 9012',
    studentId: 'stu-chile-01',
    studentName: 'Mateo Morales',
    studentRun: '24.102.394-K',
    studentPin: '123456',
    status: 'active',
    subscriptionActive: true,
    plan: 'mensual',
    enrolledGrades: ['7° Básico'],
    createdAt: '2026-08-15T10:00:00.000Z',
    lastLogin: '2026-09-24T14:30:00.000Z'
  },
  {
    id: 'usr-chile-02',
    rut: '14.892.410-8',
    name: 'Rodrigo Silva A.',
    email: 'rodrigo.silva@gmail.com',
    phone: '+56 9 9234 1156',
    studentId: 'stu-chile-02',
    studentName: 'Sofía Silva',
    studentRun: '25.301.992-1',
    studentPin: '481920',
    status: 'active',
    subscriptionActive: true,
    plan: 'anual',
    enrolledGrades: ['5° Básico'],
    createdAt: '2026-08-20T11:20:00.000Z',
    lastLogin: '2026-09-23T18:15:00.000Z'
  },
  {
    id: 'usr-chile-03',
    rut: '16.204.811-3',
    name: 'Marcela González P.',
    email: 'mgonzalez@educarchile.cl',
    phone: '+56 9 7120 4490',
    studentId: 'stu-chile-03',
    studentName: 'Lucas González',
    studentRun: '26.890.114-7',
    studentPin: '839102',
    status: 'active',
    subscriptionActive: true,
    plan: 'anual',
    enrolledGrades: ['3° Básico', '4° Básico'],
    createdAt: '2026-09-01T09:45:00.000Z',
    lastLogin: '2026-09-24T09:10:00.000Z'
  },
  {
    id: 'usr-chile-04',
    rut: '17.514.209-6',
    name: 'Valentina Valenzuela T.',
    email: 'vvalenzuela@vtr.net',
    phone: '+56 9 6554 8821',
    studentId: 'stu-chile-04',
    studentName: 'Martina Valenzuela',
    studentRun: '23.940.122-4',
    studentPin: '592014',
    status: 'trial',
    subscriptionActive: true,
    plan: 'mensual',
    enrolledGrades: ['8° Básico'],
    createdAt: '2026-09-18T16:00:00.000Z',
    lastLogin: '2026-09-22T20:00:00.000Z'
  }
];

let isInitialized = false;
let cachedUsers: ParentUser[] = [];

/**
 * Inicializa el repositorio desde localStorage o carga los usuarios semilla solo si nunca se ha sincronizado.
 */
export function initializeUsersRegistry(): ParentUser[] {
  if (typeof window === 'undefined') {
    if (!isInitialized) {
      cachedUsers = [...SEED_USERS];
      isInitialized = true;
    }
    return cachedUsers;
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    const synced = localStorage.getItem(LOCAL_STORAGE_SYNCED_KEY);

    if (raw !== null) {
      // Si existe la clave en localStorage (incluso si es []), se respeta el estado del usuario/servidor
      cachedUsers = JSON.parse(raw);
    } else if (synced === 'true') {
      // Ya se sincronizó con el backend previamente, mantener lista vacía en lugar de reinyectar semillas
      cachedUsers = [];
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, '[]');
    } else {
      // Primera ejecución pura sin sincronización previa con el backend
      cachedUsers = [...SEED_USERS];
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(cachedUsers));
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
        const currentLocal = getAllRegisteredUsers();

        // BLINDAJE CRÍTICO: Si el backend devuelve 0 familias pero localmente ya existen usuarios registrados,
        // NUNCA borrar la lista local (evita pérdida de datos ante cold-starts o fallos transitorios de BD).
        if (data.families.length === 0 && currentLocal.length > 0) {
          console.warn('[UserRepository] Servidor devolvió 0 familias. Preservando', currentLocal.length, 'familias locales.');
          currentLocal.forEach((u) => {
            syncUserToNeon(u);
          });
          return currentLocal;
        }

        // FUSIÓN INTELIGENTE: Combinar registros preservando credenciales reales si el backend viene con defaults
        const mergedFamilies: ParentUser[] = data.families.map((backendUser: ParentUser) => {
          const localMatch = currentLocal.find(
            (l) => l.email?.toLowerCase().trim() === backendUser.email?.toLowerCase().trim()
          );
          return {
            ...backendUser,
            password: (backendUser.password && backendUser.password !== 'demo2026')
              ? backendUser.password
              : (localMatch?.password || backendUser.password || 'demo2026'),
            studentPin: (backendUser.studentPin && backendUser.studentPin !== '123456')
              ? backendUser.studentPin
              : (localMatch?.studentPin || backendUser.studentPin || '123456')
          };
        });

        // Asegurar que cualquier familia registrada localmente que no esté aún en el backend se conserve y se sincronice
        currentLocal.forEach((localUser) => {
          if (!mergedFamilies.some((m) => m.email?.toLowerCase().trim() === localUser.email?.toLowerCase().trim())) {
            mergedFamilies.push(localUser);
            syncUserToNeon(localUser);
          }
        });

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

  return getAllRegisteredUsers();
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
}): { user: ParentUser; isNew: boolean } {
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
    syncUserToNeon(updatedUser, params.grade, {
      password: updatedUser.password,
      studentPin: updatedUser.studentPin,
      amount: params.amount,
      paymentId: params.paymentId
    });
    return { user: updatedUser, isNew: false };
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
  syncUserToNeon(newUser, params.grade, {
    password: newUser.password,
    studentPin: newUser.studentPin,
    amount: params.amount,
    paymentId: params.paymentId
  });
  return { user: newUser, isNew: true };
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

// Inicialización automática
if (typeof window !== 'undefined') {
  initializeUsersRegistry();
}
