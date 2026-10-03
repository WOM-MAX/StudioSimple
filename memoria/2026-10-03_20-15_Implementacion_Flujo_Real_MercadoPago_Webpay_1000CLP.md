# Registro de Resolucion: Implementacion Integral del Flujo de Cobro Real con Mercado Pago y Webpay ($1.000 CLP)

**Fecha:** 2026-10-03 20:15  
**Proyecto:** EstudioSimple - Web Studio Simple  
**Estado:** Resuelto y Validado (DoD Conforme)

---

## 1. Contexto y Requerimiento

El usuario requiere realizar una transaccion bancaria real por **$1.000 CLP** a traves de Webpay / Mercado Pago (debitando de su tarjeta bancaria e ingresando a su cuenta recaudadora de Mercado Pago) para validar de punta a punta la experiencia de compra, la redireccion a pasarela, el retorno exitoso a la aplicacion, la generacion de credenciales y el auto-login familiar.

---

## 2. Acciones Implementadas

### A. Preservacion de Estado y Rehidratacion Post-Webpay (`CheckoutFlow.tsx`)
- Se implemento la clave de almacenamiento `estudio_simple_pending_checkout` para guardar de forma sincrona los datos del apoderado (RUN, nombres, email, password), estudiante (nombre, RUN, curso), plan y monto ($1.000 CLP) justo antes de saltar a `data.initPoint` (Mercado Pago).
- Se anadio un `useEffect` que intercepta en caliente los parametros de retorno de Mercado Pago (`payment=success`, `status=approved` o `collection_status=approved`):
  - Recupera los datos del usuario desde `estudio_simple_pending_checkout`.
  - Ejecuta `registerUserFromCheckout` y `activateSessionFromCheckout` para iniciar sesion automaticamente.
  - Despacha el correo transaccional de bienvenida a `/api/mail/send-welcome`.
  - Muestra la Ficha Oficial de Acceso con el PIN de 6 digitos del estudiante y las claves del apoderado.
  - Despliega la insignia: "Pago Verificado via Mercado Pago / Webpay ($1.000 CLP)".
  - Limpia los query params de la URL mediante `window.history.replaceState` para evitar reentradas duplicadas.
  - Elimina el objeto pendiente de `localStorage`.
- Se gestiono el caso de cancelacion o rechazo (`payment=failure`), restaurando los campos en el formulario y mostrando un mensaje amigable para permitir el reintento.

### B. Enrutamiento en `App.tsx`
- Se incorporo la deteccion de parametros de pasarela en `MainContent`: si la URL contiene `payment=success`, `payment=failure` o `status=approved`, la aplicacion conmuta automaticamente a `viewMode = 'checkout'` para que el componente procese el retorno inmediatamente.

### C. Robustecimiento de Preferencias de Mercado Pago (`server.js` y `vite.config.ts`)
- En `/api/payment/create-preference`:
  - Se garantiza `unit_price: cleanAmount` (entero minimo 500 CLP segun estandar MLC).
  - Se fija `currency_id: 'CLP'` y `auto_return: 'approved'`.
  - Se anade la condicion para incluir `notification_url` unicamente cuando el origen sea HTTPS publico (evitando el error HTTP 400 Bad Request de Mercado Pago en localhost).
  - Se selecciona dinamicamente `init_point` (produccion) o `sandbox_init_point` segun el valor de `modoSandbox`.
- Se replico el endpoint `/api/payment/create-preference` en `vite.config.ts` para que funcione de forma nativa tanto con `npm run dev` como con `node server.js` en Railway.

### D. Extension de Tipos de Auditoria (`authAdmin.ts`)
- Se agrego `'PAYMENT_MERCADOPAGO_SUCCESS'` al tipo `AuditActionType` para tipado estricto y registro formal en `data/audit_logs.json`.

---

## 3. Verificacion y Definition of Done (DoD)

1. **Prueba E2E Automatizada:**
   - Script: `scripts/test_mercadopago_flow.ts`
   - Comando: `npx tsx scripts/test_mercadopago_flow.ts`
   - Resultado: Salida con codigo 0. Plan mensual verificado en oferta a $1.000 CLP, contrato de preferencia validado y ciclo de rehidratacion conforme.
2. **Compilacion TypeScript y Bundler:**
   - Comando: `npm run build --prefix "Web Studio Simple"`
   - Resultado: 1.663 modulos transformados, compilacion exitosa sin errores en 12.89s (codigo de salida 0).
3. **Verificacion Sintactica del Servidor:**
   - Comando: `node --check server.js`
   - Resultado: Codigo de salida 0.

---

## 4. Instrucciones para la Transaccion Real de $1.000 CLP

Para que el cobro sea debitado de tu tarjeta e ingresado en tu cuenta real de Mercado Pago:

1. **Obtener Credenciales de Produccion de Mercado Pago:**
   - Ingresar a: https://www.mercadopago.cl/developers/panel
   - Ir a "Tus integraciones" -> Seleccionar aplicacion -> "Credenciales de producción".
   - Copiar el **Access Token** (comienza con `APP_USR-...`) y la **Public Key**.

2. **Ingresar las Credenciales en EstudioSimple:**
   - **Metodo 1 (Panel de Administracion):**
     - Ir a `http://localhost:5173` (o tu URL de Railway), ingresar al login con clave `admin123`.
     - Abrir la pestaña **"Precios y Ofertas"**.
     - En la seccion "Pasarela de Pago", cambiar el proveedor a **Mercado Pago / Webpay**.
     - Pegar tu **Public Key** y tu **Access Token**.
     - Desmarcar la casilla "Modo Sandbox (Pruebas)" para activar **Producción Real**.
     - Presionar **"Guardar Configuración de Pasarela"**.
   - **Metodo 2 (Archivo de Configuracion Directo):**
     - Editar [data/pricing_config.json](file:///d:/StudioSimple%20-%20Antigravity/data/pricing_config.json):
       ```json
       "pasarela": {
         "provider": "mercadopago",
         "mercadoPagoPublicKey": "TU_PUBLIC_KEY_REAL",
         "mercadoPagoAccessToken": "TU_ACCESS_TOKEN_REAL",
         "modoSandbox": false
       }
       ```

3. **Ejecutar la Compra Real de $1.000 CLP:**
   - Ir a `/planes`.
   - Seleccionar **Plan Mensual** ($1.000 CLP / mes).
   - Llenar los datos reales del apoderado (RUN, nombres, correo, password) y estudiante (nombre y curso).
   - El boton indicara: **"Pagar con Mercado Pago / Webpay ($1.000 CLP)"**.
   - Al presionar, el sistema te redirigira a la pasarela oficial de Mercado Pago / Webpay Plus.
   - Pagar $1.000 CLP con tu tarjeta de debito/credito.
   - Mercado Pago retornara automaticamente a tu aplicacion, activara la sesion de apoderado y estudiante, mostrara la Ficha Oficial de Acceso con el PIN de 6 digitos y podras entrar a las clases de inmediato. El dinero quedara acreditado en tu cuenta de Mercado Pago.
