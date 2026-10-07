# Bitácora de Cierre: Cierre Definitivo de Persistencia en Neon PostgreSQL y Motor de Correos

**Fecha:** 2026-10-07 15:00 CLT  
**Autor:** Antigravity (AI Engineering Lead)  
**Proyecto:** EstudioSimple  
**Objetivo:** Erradicación total de la dependencia de archivos JSON locales efímeros en Railway/Docker, migración de la configuración de CMS, páginas, usuarios y pases de cortesía a la tabla `SystemSetting` en Neon PostgreSQL, blindaje de checkout con espera activa (Scale-to-Zero tolerance), e integración del servicio de correos transaccionales directos en base de datos.

---

## 1. Diagnóstico y Causa Raíz

1. **Efimeridad de Archivos JSON en Railway:**
   - En despliegues basados en contenedores Docker en Railway, el sistema de archivos local (`data/*.json`) es efímero. Cada despliegue, reinicio o redimensionamiento destruye el contenedor anterior y levanta uno nuevo desde el repositorio, perdiendo cualquier mutación guardada en disco local.
   - Las configuraciones del CMS (visibilidad de página de inicio `activo: true`, visualización en menú `mostrarEnMenu: false`), los usuarios registrados vía checkout y los pases de cortesía se revertían a los valores por defecto del repositorio.

2. **Captura Silenciosa de Errores y Scale-to-Zero en Neon DB:**
   - Neon PostgreSQL entra en suspensión automática (Scale-to-Zero) tras 5 minutos de inactividad, requiriendo entre 2 y 5 segundos para reactivarse ante la primera consulta.
   - Los endpoints de checkout y sincronización de usuarios capturaban silenciosamente los errores (`try/catch` con `console.error` o fallback simulado) y devolvían respuestas HTTP 200/éxito al frontend sin confirmar la persistencia real en la base de datos. Familias como "Mercedes Peña" creían haberse registrado, pero la inserción en Prisma fallaba por timeout del Scale-to-Zero sin reintento ni alarma.

3. **Despacho de Correos Desconectado de la Base de Datos:**
   - La configuración de Resend o SMTP dependía exclusivamente de variables de entorno no persistentes en tiempo de ejecución para el CMS, simulando el envío si faltaban credenciales sin transparentar el estado en la interfaz ni permitir configurar las claves directamente desde el panel de administración.

---

## 2. Acciones y Modificaciones Arquitectónicas

### A. Extensión del Esquema Prisma (`prisma/schema.prisma`)
Se incorporó el modelo inmutable `SystemSetting` para almacenar datos estructurados en formato JSON:
```prisma
model SystemSetting {
  key       String   @id
  value     Json
  updatedAt DateTime @updatedAt

  @@map("system_settings")
}
```
- Se ejecutó `npx prisma db push` y `npx prisma generate`, sincronizando la tabla directamente en el clúster de Neon PostgreSQL.

### B. Mecanismo de Tolerancia y Reintentos (`withPrismaRetry` en `server.js`)
Para blindar el backend contra los tiempos de latencia del Scale-to-Zero de Neon DB:
- Se implementó `withPrismaRetry(fn, maxRetries = 3, delayMs = 1500)` con backoff exponencial.
- Si Neon está dormido, la función reintenta hasta 3 veces esperando la activación antes de abortar.
- Se crearon las funciones helper `getSystemSetting(key, defaultValue)` y `setSystemSetting(key, value)`.

### C. Migración de Endpoints a Neon DB (`server.js`)
- `GET/PUT /api/cms/pages`: Lee y escribe exclusivamente en la clave `cms_pages` de `SystemSetting`.
- `GET/PUT /api/cms/site-config`: Lee y escribe en la clave `site_config` de `SystemSetting`.
- `GET/POST /api/admin/users`: Lee y escribe en la clave `admin_users` de `SystemSetting`.
- `GET/POST /api/admin/guest-passes`: Lee y escribe en la clave `guest_passes` de `SystemSetting`.
- `GET/POST /api/admin/families`: Persiste familias directamente en el modelo `User` de Prisma mediante `withPrismaRetry`.
- `POST /api/checkout`:
  - Eliminación total de la captura silenciosa de errores.
  - Inserción obligatoria de `User` y `SubscriptionOrder` con `withPrismaRetry`.
  - Si la base de datos no confirma el registro tras agotar los 3 reintentos, el endpoint responde con HTTP 500 y mensaje de error explícito, impidiendo falsos positivos.
- `GET/POST /api/mail/config` y `POST /api/mail/test`:
  - Lectura y guardado de credenciales (Resend API Key o SMTP) en `SystemSetting` (clave `mail_config`).
  - Endpoint de prueba en vivo para enviar correos de diagnóstico desde el CMS.

### D. Honestidad en el Frontend (`CheckoutFlow.tsx`, `UserManagementView.tsx`, `user-repository.ts`)
- `CheckoutFlow.tsx`:
  - Se eliminó el mensaje falso de "correo enviado exitosamente" cuando el despacho era simulado.
  - La interfaz reporta con transparencia: *"Despacho en proceso"* o *"Simulado (Falta API Key)"* según el flag `dispatched` devuelto por el backend.
- `UserManagementView.tsx` y `user-repository.ts`:
  - Se aseguró que la creación de usuarios manuales espere la promesa de sincronización (`await syncPromise`) antes de recargar la lista, garantizando la inserción efectiva en Neon.

### E. Alineación de Datos Base y Módulo de Correo en el CMS
- `initialCmsData.ts` y `data/cms_pages.json`:
  - Página de Inicio fijada con `activo: true` y `mostrarEnMenu: false` (o `true` según preferencia pero sincronizada inmutablemente).
- `ConfiguracionGeneralView.tsx`:
  - Incorporación de pestaña dedicada **"Servicio de Correo Real"**.
  - Permite al administrador ingresar la API Key de Resend o credenciales SMTP directamente en Neon DB.
  - Botón de **"Enviar Correo de Prueba"** con diagnóstico inmediato de conexión y despacho.

---

## 3. Validación y Pruebas

1. **Script de Verificación en Vivo (`scripts/verify_real_database.ts`):**
   - Ejecutado con `npx tsx scripts/verify_real_database.ts`.
   - Resultado: **EXIT CODE 0 (100% Exitoso)**.
   - Verificaciones confirmadas contra Neon PostgreSQL:
     - Tabla `SystemSetting` operativa: Claves `cms_pages`, `site_config` y `mail_config` almacenadas y leídas correctamente.
     - Registro de Usuario y Orden de Suscripción: Inserción de "Mercedes Peña" (`mercedes.pena.test@estudiosimple.cl`) y orden de prueba confirmada en Neon DB con reintento activo.
     - Familias activas recuperadas directamente desde la base de datos real.

2. **Compilación de Producción:**
   - Ejecutado `npm run build` en `Web Studio Simple` (`tsc && vite build`).
   - Resultado: **EXIT CODE 0 (100% Limpio)**.
   - 1683 módulos transformados sin errores de TypeScript ni linter.

---

## 4. Estado Final del Repositorio
- Persistencia inmutable garantizada en Neon PostgreSQL.
- Cero pérdida de datos ante reinicios de contenedor en Railway.
- Listo para commit y despliegue a producción.
