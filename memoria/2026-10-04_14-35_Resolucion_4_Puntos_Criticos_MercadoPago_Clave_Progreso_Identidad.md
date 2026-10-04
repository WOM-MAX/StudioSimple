# Bitácora de Resolución: 4 Requerimientos Críticos de EstudioSimple

- **Fecha:** 2026-10-04 14:35 (UTC-03:00)
- **Autor:** Ingeniero de Software IA (A-SDLC)
- **Rama:** main
- **Estado de Compilación:** Código de salida 0 (`npm run build` y `tsc --noEmit`)

---

## 1. Contexto y Problemas Abordados

Se identificaron y resolvieron 4 problemas críticos que afectaban la experiencia del usuario y la integridad operativa del sistema:

1. **Apertura de la Pasarela de Mercado Pago / Webpay:**
   - *Causa raíz:* Falta de implementación de los endpoints `GET /api/pricing/config` y `POST /api/pricing/config` en `server.js` y `vite.config.ts`, lo que causaba un fallo HTTP 404 al consultar la pasarela. Esto forzaba al cliente a retroceder al modo simulado (`provider: 'simulated'`), provocando un bypass silencioso de la pasarela y activando la suscripción localmente sin cobrar ni abrir Mercado Pago.
   - *Solución:* Implementación de `GET /api/pricing/config` y `POST /api/pricing/config` en `server.js` y `vite.config.ts`. Modificación de `DEFAULT_PRICING_CONFIG` en `pricing-repository.ts` con `provider: 'mercadopago'`, clave pública oficial y actualización forzada en `CheckoutFlow.tsx` para redirigir todo cobro mayor a $0 al `initPoint` de Mercado Pago.

2. **Identificación Completa del Estudiante (Nombres y Apellidos):**
   - *Causa raíz:* El Paso 2 del formulario de checkout solicitaba un único campo informal ("Nombre del Hijo/a (Estudiante) *") con placeholder "Ej. Mateo", provocando que los apoderados omitieran los apellidos. Esto impedía emitir certificados oficiales y publicar casos de éxito.
   - *Solución:* División del campo en `Nombres del Estudiante *` y `Apellidos del Estudiante *`, validando la obligatoriedad de ambos campos y concatenándolos de forma transparente en `studentName` para compatibilidad con la base de datos Neon DB y las comunicaciones oficiales.

3. **Cambio de Contraseña desde el Perfil del Apoderado:**
   - *Causa raíz:* La tarjeta de "Cuenta del Apoderado / Tutor Legal" en `ParentDashboard.tsx` no disponía de mecanismo para cambiar la clave temporal despachada por WhatsApp (`Temp-XXXXXX!`).
   - *Solución:* Creación del botón "Cambiar Contraseña / Clave de Acceso" en `ParentDashboard.tsx` con modal interactivo de ingreso, confirmación y validación (mínimo 6 caracteres). Implementación de `updateUserPassword` en `user-repository.ts`, `changeParentPassword` en `AppContext.tsx`, y el endpoint `POST /api/user/change-password` en `server.js` y `vite.config.ts` para persistir la nueva clave en Neon DB (`prisma.user.update`).

4. **Suscripción Nueva con Progreso Falso de Lecciones (33% Inicial):**
   - *Causa raíz:* Inyección estática de `['7_mat_oa1_1', '7_mat_oa1_2']` en `activateSessionFromCheckout`, en la rehidratación de `student` desde `localStorage`, y en el login infantil en `AppContext.tsx`.
   - *Solución:* Erradicación de las lecciones mock en todas las rutas de creación e hidratación de usuarios reales (`completedLessons: []`). Saneamiento automático en `localStorage` al iniciar sesión como apoderado o cargar el dashboard.

---

## 2. Archivos Modificados

1. `server.js`:
   - Endpoint `GET /api/pricing/config` y `POST /api/pricing/config` con inyección de variables de entorno de Mercado Pago.
   - Endpoint `POST /api/user/change-password` con actualización en Neon DB vía Prisma y bitácora de auditoría.
   - Validación de contraseña en `POST /api/auth/login`.

2. `Web Studio Simple/vite.config.ts`:
   - Middleware dev para `/api/pricing/config` y `/api/user/change-password`.

3. `Web Studio Simple/src/lib/pricing-repository.ts`:
   - Configuración predeterminada con `pasarela.provider = 'mercadopago'` y clave pública oficial.

4. `Web Studio Simple/src/lib/user-repository.ts`:
   - Implementación de `updateUserPassword` con despacho a la API.

5. `Web Studio Simple/src/types/authAdmin.ts`:
   - Inclusión de `'CHANGE_PASSWORD'` en el tipo `AuditActionType`.

6. `Web Studio Simple/src/context/AppContext.tsx`:
   - Eliminación del hardcoding de `['7_mat_oa1_1', '7_mat_oa1_2']`.
   - Saneamiento de perfiles de alumnos reales a `completedLessons: []`.
   - Implementación de `changeParentPassword` e integración en el Provider.

7. `Web Studio Simple/src/components/parent/ParentDashboard.tsx`:
   - Botón y modal responsivo para cambio de contraseña del apoderado con retroalimentación inmediata.

8. `Web Studio Simple/src/components/checkout/CheckoutFlow.tsx`:
   - Campos independientes para nombres y apellidos del estudiante en el Paso 2.
   - Forzado de enrutamiento obligatorio a Mercado Pago Checkout Pro (`initPoint`) para todo cobro con monto > $0.

---

## 3. Verificación de Compilación y Calidad

- Compilación TypeScript: `npx tsc --noEmit` exitoso (código 0).
- Bundle de Producción: `npm run build` en `Web Studio Simple` exitoso (código 0).
- Script E2E Mercado Pago: `npx tsx scripts/test_mercadopago_flow.ts` con 7 conformidades aprobadas.
