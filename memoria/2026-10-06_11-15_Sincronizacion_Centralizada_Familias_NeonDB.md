# Bitácora de Implementación: Sincronización Centralizada de Familias y Contraseñas con Neon PostgreSQL

- **Fecha:** 2026-10-06 11:15:00 -03:00
- **Entorno:** Producción Railway / Local Vite Dev Server / Neon PostgreSQL Serverless
- **Objetivo:** Resolver de forma definitiva la discrepancia entre la base de datos central y el cliente local en la gestión de familias, suscripciones reales adquiridas y actualización de contraseñas de apoderados.

---

## 1. Diagnóstico de Causa Raíz

### 1.1 Desaparición de Suscripciones Reales y Reaparición de Usuarios Demo
1. **Mecanismo de Checkout Previo:** Cuando un apoderado completaba la compra en una ventana de incógnito o en un dispositivo específico, el checkout disparaba `POST /api/checkout` persistiendo la suscripción en Neon PostgreSQL (`prisma.user.upsert`) y en el `localStorage` de esa ventana particular.
2. **Dependencia Exclusiva de LocalStorage en Cliente:** El repositorio del cliente (`user-repository.ts`) leía exclusivamente la clave local `estudiosimple_registered_users`. Nunca consultaba al backend sobre los usuarios reales existentes.
3. **Re-inyección Forzada de Usuarios Semilla (`SEED_USERS`):** Al cerrar la ventana de incógnito o limpiar la caché del navegador, `initializeUsersRegistry()` encontraba `localStorage` vacío y ejecutaba `cachedUsers = [...SEED_USERS]`, restaurando en memoria las 4 familias demo que el administrador ya había purgado, y ocultando la cuenta real recién pagada.
4. **Condición de Carrera en `cachedUsers.length === 0`:** Cada vez que el administrador eliminaba todos los usuarios demo, `cachedUsers.length` quedaba en 0. Al volver a llamar a `getAllRegisteredUsers()`, evaluaba `if (cachedUsers.length === 0) initializeUsersRegistry()`, provocando una re-inyección en cascada de los datos semilla.

### 1.2 Imposibilidad de Cambiar la Contraseña del Apoderado
1. **Fallo en Búsqueda Local:** La función `updateUserPassword(userId, newPassword)` buscaba al usuario únicamente en `getAllRegisteredUsers()`. Dado que la cuenta real no estaba en `localStorage`, la búsqueda retornaba `null` y la petición asíncrona hacia `/api/user/change-password` se cancelaba o no se enviaba.
2. **Falta de Redundancia en Backend:** Si el identificador (`userId`) provenía de un entorno transitorio, el backend no contaba con resolución redundante por correo electrónico (`email`) ni por RUN chileno (`rut`) para actualizar en Neon DB.

---

## 2. Solución Arquitectónica Implementada

### 2.1 Backend de Producción (`server.js`)
- **Endpoint `GET /api/admin/families`:**
  - Consulta directa a Neon PostgreSQL mediante `prisma.user.findMany({ orderBy: { createdAt: 'desc' } })`.
  - Mapeo estricto al esquema `ParentUser` (campos `id`, `rut`, `name`, `email`, `phone`, `password`, `studentName`, `studentRun`, `studentPin`, `status`, `subscriptionActive`, `plan`, `enrolledGrades`, `createdAt`).
  - Sincronización automática con la caché de respaldo en disco `data/registered_families.json`. Si la base de datos fue purgada y tiene 0 usuarios, el archivo en disco también se sincroniza a `[]` para evitar incongruencias.
- **Endpoint `POST /api/user/change-password` Blindado:**
  - Búsqueda compuesta con `prisma.user.findFirst` evaluando `OR: [{ id: userId }, { email }, { rut }].filter(Boolean)`.
  - Actualización atómica en base de datos `prisma.user.update` con la contraseña suministrada (validando mínimo 6 caracteres).
  - Actualización sincronizada en `data/registered_families.json` y registro formal en `data/audit_logs.json` con auditoría `CHANGE_PASSWORD`.

### 2.2 Servidor de Desarrollo (`Web Studio Simple/vite.config.ts`)
- **Paridad Isomórfica en Middlewares Vite:**
  - Implementación de `GET /api/admin/families` leyendo `data/registered_families.json`.
  - Implementación de `POST /api/checkout` persistiendo la familia en `data/registered_families.json`.
  - Implementación de `POST /api/admin/family/delete` filtrando y purgando el archivo en disco.
  - Implementación de `POST /api/user/change-password` actualizando la clave por `userId`, `email` o `rut` en disco.

### 2.3 Repositorio del Cliente (`Web Studio Simple/src/lib/user-repository.ts`)
- **Eliminación de Re-inyección Involuntaria:**
  - Control mediante bandera `isInitialized` y marca en almacenamiento persistente `estudiosimple_users_synced_db = 'true'`.
  - Si el backend o el usuario limpian la lista (`[]`), la lista vacía se respeta como válida y no se vuelven a cargar los `SEED_USERS`.
- **Nueva Función Asíncrona `fetchRegisteredUsersFromBackend()`:**
  - Realiza `GET /api/admin/families`.
  - Si la llamada es exitosa, reemplaza la memoria caché con la lista oficial del servidor, actualiza `localStorage` y marca la sesión como sincronizada con la base de datos central.
- **Blindaje de `updateUserPassword(userId, newPassword, email?, rut?)`:**
  - Retorna un `Promise<{ success: boolean; message?: string }>`.
  - Actualiza en memoria local asociando por `id`, `email` o `rut`.
  - Realiza despacho HTTP `POST /api/user/change-password` enviando la tupla completa `{ userId, email, rut, newPassword }` para garantizar actualización en Neon DB incluso si la cuenta fue creada en otra sesión.
- **Blindaje Asíncrono de `deleteUserPermanently(userId)`:**
  - Espera confirmación del borrado en el servidor (`await fetch('/api/admin/family/delete')`) antes de retornar.

### 2.4 Vistas de Gestión y Contexto
- **`UserManagementView.tsx`:**
  - `refreshAll()` ahora es asíncrono y consulta prioritariamente a `fetchRegisteredUsersFromBackend()`.
  - Se ejecuta en el montaje del componente (`useEffect`).
  - Tras la confirmación de borrado permanente de una familia (`handleConfirmDeleteUser`), se espera la purga en el backend y se vuelve a solicitar la lista fresca a la base de datos central.
  - Se integró un botón interactivo "Sincronizar BD" con spinner en la barra de filtros para permitir recargas manuales forzadas en tiempo real.
- **`AppContext.tsx`:**
  - Pre-carga automática en segundo plano de `fetchRegisteredUsersFromBackend()` durante la inicialización de la aplicación.
  - `changeParentPassword` ahora invoca `await updateUserPassword(parent.id, cleanPass, parent.email, parent.rut)` garantizando sincronización bidireccional.

---

## 3. Archivos Modificados

1. [server.js](file:///c:/Proyectos/StudioSimple/server.js)
2. [Web Studio Simple/vite.config.ts](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/vite.config.ts)
3. [Web Studio Simple/src/lib/user-repository.ts](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/lib/user-repository.ts)
4. [Web Studio Simple/src/components/admin/cms/UserManagementView.tsx](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/components/admin/cms/UserManagementView.tsx)
5. [Web Studio Simple/src/context/AppContext.tsx](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/context/AppContext.tsx)

---

## 4. Verificación y Validación

- **Compilación TypeScript (`tsc`):** Sin errores tipográficos ni discrepancias sintácticas.
- **Compilación Vite (`npm run build`):** Exitosa con código 0 (`built in 12.93s`).
- **Control de Estados:** Cero advertencias de mutaciones desincronizadas.
