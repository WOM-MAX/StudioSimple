# Bitacora: Reseteo Centralizado en Neon DB y Envio Automatico por WhatsApp de Claves de Soporte

- Fecha y hora: 2026-10-04 13:10 (GMT-3)
- Modulos afectados: [server.js](file:///d:/StudioSimple%20-%20Antigravity/server.js), [vite.config.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/vite.config.ts), [user-repository.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/user-repository.ts), [UserManagementView.tsx](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/admin/cms/UserManagementView.tsx), [LoginScreen.tsx](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/auth/LoginScreen.tsx), [authAdmin.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/types/authAdmin.ts).

---

## 1. Contexto y Objetivos

Se requirio implementar una solucion determinista y autosuficiente para el soporte de credenciales de familias en StudioSimple:
1. Reseteo y persistencia centralizada de contrasenas en la base de datos Neon PostgreSQL (tabla `User` via Prisma) y almacenamiento local.
2. Despacho automatico e inmediato de la nueva clave temporal al WhatsApp del apoderado titular sin requerir digitacion manual del operador.
3. Boton de respaldo y apertura de chat en WhatsApp Web/Movil, junto con plantilla formal prellenada.
4. Enlace expedito de asistencia y recuperacion en la pantalla publica de inicio de sesion ([LoginScreen.tsx](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/auth/LoginScreen.tsx)).

---

## 2. Implementacion Tecnica

### A. Endpoint Centralizado en Backend ([server.js](file:///d:/StudioSimple%20-%20Antigravity/server.js) y [vite.config.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/vite.config.ts))
- Se implemento el endpoint `POST /api/admin/family/reset-password` recibiendo `{ userId, email, rut, phone, newPassword, autoNotifyWhatsApp, recipientName }`.
- Si Prisma y la base de datos Neon PostgreSQL estan operativos, ejecuta:
  `prisma.user.update({ where: { id: user.id }, data: { password: newPassword } })`.
- Registra el evento `RESET_USER_PASSWORD` en `data/audit_logs.json`.
- Si `autoNotifyWhatsApp` es verdadero y el apoderado posee telefono, ejecuta el despacho de notificacion formal y registra `WHATSAPP_CREDENTIALS_DISPATCH` en la bitacora de auditoria.
- Se integro la paridad correspondiente en el middleware de desarrollo de Vite.

### B. Repositorio de Usuarios ([user-repository.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/user-repository.ts))
- La funcion `generateTemporaryPassword(userId: string, autoNotifyWhatsApp = true)` actualiza la memoria local y `localStorage`, y despacha inmediatamente la llamada asincrona a `/api/admin/family/reset-password`.

### C. Panel de Administracion ([UserManagementView.tsx](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/admin/cms/UserManagementView.tsx))
- El modal `tempPasswordModal` fue extendido para:
  1. Mostrar una insignia de confirmacion de despacho automatico por WhatsApp al numero registrado (`+56 9 ...`).
  2. Ofrecer un boton directo "Abrir Chat de WhatsApp" (`https://wa.me/...`) con el mensaje formal estructurado.
  3. Ofrecer un boton "Copiar Mensaje Formal" para respaldo por correo.
- Se incorporaron los tipos `RESET_USER_PASSWORD` y `WHATSAPP_CREDENTIALS_DISPATCH` en `AuditActionType` ([authAdmin.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/types/authAdmin.ts)).

### D. Portal de Acceso Familiar ([LoginScreen.tsx](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/auth/LoginScreen.tsx))
- Se agrego en la pestana de Apoderado el enlace directo: "¿Olvidaste tu contraseña o necesitas ayuda?", que abre el canal de WhatsApp oficial de soporte de EstudioSimple con un mensaje preconfigurado con el RUN/correo ingresado por el usuario.

---

## 3. Validacion y Criterios de Aceptacion (DoD)

1. Sintaxis de servidor validada: `node --check server.js` (codigo de salida 0).
2. Compilacion TypeScript y empaquetado de produccion: `npm run build --prefix "Web Studio Simple"` (codigo de salida 0, 1663 modulos transformados, 0 errores de tipado).
3. Sincronizacion Git atomica ejecutada mediante `scripts/git_sync.ts`.
