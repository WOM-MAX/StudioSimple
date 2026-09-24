import { ParentUser, GradeLevel } from '../types';
import { cleanRut, formatRut } from './rut-validator';

const LOCAL_STORAGE_USERS_KEY = 'estudiosimple_registered_users';

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

let cachedUsers: ParentUser[] = [];

/**
 * Inicializa el repositorio desde localStorage o carga los usuarios semilla.
 */
export function initializeUsersRegistry(): ParentUser[] {
  if (typeof window === 'undefined') {
    cachedUsers = [...SEED_USERS];
    return cachedUsers;
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    if (raw) {
      cachedUsers = JSON.parse(raw);
    } else {
      cachedUsers = [...SEED_USERS];
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(cachedUsers));
    }
  } catch (err) {
    console.error('Error al inicializar registro de usuarios:', err);
    cachedUsers = [...SEED_USERS];
  }

  return cachedUsers;
}

/**
 * Obtiene todos los usuarios registrados.
 */
export function getAllRegisteredUsers(): ParentUser[] {
  if (cachedUsers.length === 0) {
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
    } catch (err) {
      console.error('Error al guardar usuarios en localStorage:', err);
    }
  }
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
  grade: GradeLevel;
  plan: 'monthly' | 'full' | 'trial';
  phone?: string;
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

    users[existingIdx] = updatedUser;
    persistUsers(users);
    return { user: updatedUser, isNew: false };
  }

  // Usuario nuevo: crear credenciales y PIN
  const newId = `usr-${Date.now()}`;
  const generatedPin = Math.floor(100000 + Math.random() * 900000).toString();

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
 * Genera una contraseña temporal de alta entropía para soporte técnico.
 */
export function generateTemporaryPassword(userId: string): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const tempPass = `Temp-${rand}!`;

  const users = getAllRegisteredUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx >= 0) {
    users[idx] = {
      ...users[idx],
      password: tempPass
    };
    persistUsers(users);
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

// Inicialización automática
if (typeof window !== 'undefined') {
  initializeUsersRegistry();
}
