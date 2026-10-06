# Bitácora de Auditoría: Fix de Contraste en Inputs y Purga Definitiva de Cuentas Semilla

- **Fecha:** 2026-10-06 20:25
- **Estado:** Implementado, validado y desplegado
- **Contexto:** Al agregar manualmente una suscripción desde el CMS (Centro de Control de Accesos y Seguridad), el usuario reportó dos anomalías críticas:
  1. El texto ingresado en los inputs del formulario modal apenas se leía (letras casi invisibles contra el fondo blanco).
  2. Aunque no había ninguna cuenta previa o se habían eliminado 2 cuentas, al agregar la cuenta manual volvieron a aparecer las 4 cuentas demo/semilla iniciales (Valentina Valenzuela, Carolina Morales, Rodrigo Silva, Marcela González).

---

## 1. Causa Raíz Detectada

### A. Contraste de Inputs en Modales
- **Causa:** El contenedor del modal posee un fondo blanco (`bg-white`), pero los elementos `<input>` no tenían declarados explícitamente clases de color de texto (`text-slate-900`) ni fondo (`bg-white`).
- Al heredar el tema visual global de la aplicación (donde las variables CSS base o utilidades heredan textos claros en modo oscuro, como `#CBD5E1`), el texto tecleado por el usuario se renderizaba en gris muy pálido sobre fondo blanco, volviéndolo casi imperceptible.

### B. Resurrección Cíclica de Cuentas Semilla (SEED_USERS)
- **Causa:** En `Web Studio Simple/src/lib/user-repository.ts`, existía una constante `SEED_USERS` con 4 familias mockeadas fijas.
- Cuando el navegador inicializaba `initializeUsersRegistry()` o cuando el usuario hacía clic en "Crear Cuenta y Asignar Claves" (`registerUserFromCheckout`), el repositorio leía `getAllRegisteredUsers()`. Si `localStorage` no existía o el usuario guardaba una nueva familia, el repositorio combinaba la nueva cuenta con `SEED_USERS`.
- Posteriormente, en `fetchRegisteredUsersFromBackend()`, el sistema iteraba sobre `currentLocal.forEach(localUser => syncUserToNeon(localUser))`. Como las 4 cuentas semilla estaban en `currentLocal`, el frontend procedía a enviarlas vía `POST /api/admin/sync-family` hacia Neon PostgreSQL y hacia el backend local (`data/registered_families.json`).
- Por esa razón, cada vez que se creaba una cuenta o se sincronizaba la base de datos, las cuentas semilla se resucitaban y se reinyectaban en la base de datos de producción.

---

## 2. Solución Implementada

### A. Purga Definitiva de Semillas en Frontend y Backend
1. **`Web Studio Simple/src/lib/user-repository.ts`**:
   - `SEED_USERS` se vació por completo (`export const SEED_USERS: ParentUser[] = []`).
   - Se crearon identificadores y correos de bloqueo `DEMO_SEED_EMAILS` y `DEMO_SEED_IDS`, junto con la función guardián `isSeedDemoUser(user)`.
   - En `initializeUsersRegistry()` se eliminan activamente del `localStorage` las cuentas semilla residuales.
   - En `fetchRegisteredUsersFromBackend()` se filtran las semillas tanto de la respuesta del backend como del almacenamiento local, y se bloquea estrictamente la ejecución de `syncUserToNeon(localUser)` para cualquier cuenta semilla.
2. **`server.js`**:
   - En `GET /api/admin/families`, se añadieron filtros con `DEMO_SEED_IDS` y `DEMO_SEED_EMAILS` para asegurar que el backend nunca retorne ni persista cuentas semilla a los clientes.
3. **`scripts/purge_seeds.ts`**:
   - Se ejecutó script de purga en Neon DB y en el archivo persistente `data/registered_families.json`. Solo se conservan las cuentas reales creadas legítimamente.

### B. Corrección de Contraste y Estilos en Modales y Filtros
1. **`UserManagementView.tsx`**:
   - En los modales (Crear Familia Manualmente, Generar Pase de Invitado, Registrar Nuevo Administrador) y en las barras de búsqueda y cambio de contraseña, se configuraron clases atómicas explícitas de alto contraste:
     - `bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 focus:bg-white focus:text-slate-950 focus:border-[#12A1A4] focus:ring-1 focus:ring-[#12A1A4] font-medium outline-none shadow-xs`
   - Los textos ingresados ahora se visualizan en negro pizarra nítido (`#0f172a`), con placeholders legibles y bordes consistentes.

---

## 3. Validación y Verificación
- **Compilación TypeScript / Vite:** `npm run build` ejecutado exitosamente con código de salida `0` (0 linter errors, 0 type errors).
- **Inspección de BD y archivo:** 0 cuentas semilla registradas, integridad familiar preservada.
