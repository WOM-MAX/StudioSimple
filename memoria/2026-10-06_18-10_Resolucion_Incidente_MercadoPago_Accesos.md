# 2026-10-06 18:10 - Resolución de Incidente Crítico: Suscripción Mercado Pago y Acreditación de Accesos

## 🚨 Contexto del Incidente
El usuario realizó el pago real de una suscripción por $1.000 CLP a través de Mercado Pago en `https://estudiosimple.cl`. El cobro fue descontado por la pasarela sin inconvenientes y el comprobante oficial con claves fue generado y enviado exitosamente al WhatsApp del apoderado:
- **Apoderado:** Walter Orellana (RUN: `8.311.477-0`, Correo: `wom@colegioacropolis.net`, Contraseña: `Luciano22#$%`)
- **Estudiante:** LUCIANO TOMÁS HERNÁNDEZ ORELLANA (7° Básico, PIN de Ingreso Directo: `278748`)
- **Problema Detectado:** Al consultar el Panel de Control Administrador (`Centro de Control de Accesos y Seguridad`), la pestaña "Familias y Suscripciones (0)" mostraba 0 familias registradas, y la familia no contaba con acceso activo en la base de datos central.

---

## 🔍 Causa Raíz Diagnosticada

1. **Desacoplamiento entre Webhook y Registro de Usuario:**
   El webhook de Mercado Pago (`POST /api/payment/webhook`) únicamente registraba un log de auditoría en disco (`audit_logs.json`), sin realizar el aprovisionamiento de usuario ni orden de suscripción de forma server-to-server.
2. **Dependencia Exclusiva del Retorno del Navegador:**
   La persistencia dependía al 100% de que el navegador del cliente concluyera el retorno desde Mercado Pago y llamara exitosamente a `POST /api/checkout`.
3. **Payload Incompleto y Captura Silenciosa de Errores en Frontend:**
   En `src/lib/user-repository.ts`, `syncUserToNeon` omitía los campos `password`, `studentPin`, `amount` y `paymentId`, y silenciaba fallos de red con un `.catch(() => {})`, ocultando cualquier interrupción entre el cliente y el backend.
4. **Fragilidad de `POST /api/checkout` ante Scale-to-Zero de Neon:**
   Si Neon PostgreSQL tardaba en despertar de su suspensión o presentaba una desconexión transitoria, `POST /api/checkout` arrojaba error 500 y omitía la persistencia en el archivo de respaldo local `data/registered_families.json`.
5. **Sobrescritura Destructiva de la Caché Local del Panel Admin:**
   En `fetchRegisteredUsersFromBackend()`, si el servidor devolvía `families: []` (por BD vacía o desconexión), se ejecutaba `localStorage.setItem(LOCAL_STORAGE_USERS_KEY, '[]')`, borrando cualquier registro local previo y dejando el contador en 0.

---

## 🛠️ Solución Técnica Implementada

### 1. Aprovisionamiento Inmediato de la Familia
Se ejecutó un script de inserción segura en Neon PostgreSQL y en `data/registered_families.json`:
- **Usuario Neon DB:** ID `ec1e1d27-794f-4053-aa63-c2fc9ee74c30`
- **Credenciales:** `wom@colegioacropolis.net` / `Luciano22#$%`
- **Alumno y Aula:** `LUCIANO TOMÁS HERNÁNDEZ ORELLANA` / 7° Básico / PIN `278748`
- **Suscripción Activa:** `true`, plan `mensual`
- **Orden de Pago:** `ORD-MP-20261006-1784`, monto $1.000 CLP, método `mercadopago`, estado `paid`

### 2. Blindaje Dual Resiliente en `server.js` (`POST /api/checkout`)
- Se rediseñó el endpoint para operar con persistencia dual:
  - **Paso 1:** Escritura inmediata y atómica en `data/registered_families.json`, garantizando que ninguna familia se pierda aunque la base de datos esté suspendida.
  - **Paso 2:** Upsert en Neon PostgreSQL (`User` y `SubscriptionOrder`) protegido con bloque `try/catch` tolerante a fallos de reconexión.
  - Almacenamiento íntegro de `password`, `studentPin`, `studentId`, `enrolledGrades`, `amount` y `paymentId`.

### 3. Fusión Inteligente en `server.js` (`GET /api/admin/families`)
- Combina los registros de Neon DB con los de `data/registered_families.json` usando un mapa por email.
- Si la base de datos contiene contraseñas por defecto (`demo2026`) o PINs por defecto, pero el archivo local tiene las credenciales reales, se preservan las credenciales reales.
- Se mantiene sincronizado el archivo de respaldo en cada consulta y se devuelve el listado consolidado.

### 4. Auto-Aprovisionamiento Server-to-Server en Webhook (`POST /api/payment/webhook`)
- Al recibir una notificación de pago de Mercado Pago:
  - Consulta directamente la API de Mercado Pago (`https://api.mercadopago.com/v1/payments/${paymentId}`) utilizando el `access_token` oficial.
  - Si el pago está `approved`: extrae pagador, monto y metadata, recupera la intención de compra y aprovisiona a la familia de inmediato en `data/registered_families.json` y Neon PostgreSQL, sin depender de que el usuario vuelva a abrir el navegador.
- Guarda la intención de pago previa en `data/pending_preferences.json` al crear la preferencia.

### 5. Blindaje del Repositorio de Usuarios en Frontend (`src/lib/user-repository.ts`)
- **Protección contra borrado destructivo:** Si el backend responde con 0 familias pero la memoria o `localStorage` contiene familias registradas, NO se sobrescribe la lista local; se conservan y se reenvía la sincronización hacia el servidor.
- **`syncUserToNeon` enriquecido:** Envía `password`, `studentPin`, `paymentId` y `amount`, reportando errores adecuadamente y retornando una promesa con el estado de la sincronización.
- **`registerUserFromCheckout`:** Respeta el `studentPin` generado o recibido y lo despacha de forma atómica.

### 6. Consistencia en `CheckoutFlow.tsx` y `vite.config.ts`
- `CheckoutFlow.tsx` genera y almacena el `studentPin` en `pendingPayload` antes de transferir a Mercado Pago, asegurando que el PIN sea idéntico tanto si se aprovisiona por webhook como por retorno de navegador.
- `vite.config.ts` actualizado para preservar `password` y `studentPin` en entornos locales de desarrollo (`npm run dev`).

---

## 🧪 Pruebas y Doble Validación de Integridad (DoD)

1. **Compilación TypeScript / Vite:**
   - Comando: `npm run build` (en `Web Studio Simple`)
   - Resultado: **Exit code 0 en 11.61s**. Cero errores de tipado o compilación.
2. **Validación de Datos en Neon PostgreSQL y Disco:**
   - Usuario: `wom@colegioacropolis.net` verificado en Neon DB y `registered_families.json`.
   - Orden de compra: `ORD-MP-20261006-1784` ($1.000 CLP, `paid`) confirmada en Neon DB.
3. **Validación de Autenticación (`scripts/test_auth_check.ts`):**
   - **Login Apoderado:** `wom@colegioacropolis.net` + `Luciano22#$%` -> **EXITOSO**
   - **Login Estudiante:** PIN `278748` en 7° Básico -> **EXITOSO**
   - **Panel Admin:** Familia listada como activa con su curso habilitado.

---

## 📌 Archivos Modificados
- `server.js` (Endpoints `/api/admin/families`, `/api/payment/create-preference`, `/api/payment/webhook`, `/api/checkout`)
- `Web Studio Simple/src/lib/user-repository.ts` (`fetchRegisteredUsersFromBackend`, `syncUserToNeon`, `registerUserFromCheckout`)
- `Web Studio Simple/src/components/checkout/CheckoutFlow.tsx` (Manejo de retorno de Mercado Pago y generación de PIN previo)
- `Web Studio Simple/vite.config.ts` (Soporte de password y PIN dinámico en dev server)
- `data/registered_families.json` (Archivo de persistencia dual creado y poblado con la familia)
- `scripts/provision_family.ts` (Script de aprovisionamiento)
- `scripts/test_auth_check.ts` (Script de validación integral de accesos)
