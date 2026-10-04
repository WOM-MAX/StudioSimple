import { GradeLevel } from './index';

export type AdminRole = 'superadmin' | 'admin' | 'soporte';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: AdminRole;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface GuestPass {
  id: string;
  code: string; // e.g. GUEST-7B-8942
  name: string; // e.g. Familia Gómez - Evaluación Homeschooling
  email?: string;
  enrolledGrades: GradeLevel[];
  expiresAt: string; // ISO string
  createdAt: string;
  createdByAdminId: string;
  createdByAdminName: string;
  status: 'active' | 'expired' | 'revoked';
  accessCount: number;
  lastAccess?: string;
  notes?: string;
}

export type AuditActionType =
  | 'LOGIN_ADMIN'
  | 'LOGIN_PARENT'
  | 'LOGIN_STUDENT'
  | 'LOGIN_GUEST'
  | 'AUTO_LOGIN_CHECKOUT'
  | 'CHANGE_ADMIN_PASSWORD'
  | 'CREATE_ADMIN'
  | 'UPDATE_ADMIN_STATUS'
  | 'CREATE_USER_CHECKOUT'
  | 'CREATE_USER_MANUAL'
  | 'UPDATE_USER_STATUS'
  | 'UPDATE_USER_GRADES'
  | 'GENERATE_TEMP_PASSWORD'
  | 'REGENERATE_PIN'
  | 'SEND_WELCOME_CREDENTIALS'
  | 'CREATE_GUEST_PASS'
  | 'REVOKE_GUEST_PASS'
  | 'EXTEND_GUEST_PASS'
  | 'UPDATE_SITE_CONFIG'
  | 'UPDATE_LESSON_CONTENT'
  | 'PAYMENT_MERCADOPAGO_SUCCESS'
  | 'DELETE_USER_PERMANENT';

export interface AuditLogEntry {
  id: string;
  timestamp: string; // ISO string
  actorId: string;
  actorName: string;
  actorEmail?: string;
  actorRole: 'superadmin' | 'admin' | 'soporte' | 'system' | 'user';
  action: AuditActionType;
  target: string;
  details: string;
  metadata?: Record<string, any>;
}
