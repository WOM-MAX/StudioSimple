# Bitacora y Pendientes Prioritarios: Auditoria Integral del Flujo de Compra Real y Gestion de Suscripciones

- **Fecha de Registro:** 2026-10-03T20:56:00-03:00
- **Reportado por:** Walter (Prueba real en produccion con tarjeta de debito bancaria)
- **Proyecto:** EstudioSimple - Web Studio Simple / Railway
- **Estado:** Pendientes criticos registrados para sesion de desarrollo inmediata.

---

## 1. Incidencias Detectadas en la Prueba Real

Durante la prueba de compra real de la suscripcion en oferta ($1.000 CLP) con tarjeta de debito, se identificaron las siguientes brechas en la pasarela, notificaciones y experiencia de usuario:

### A. Fallo de Cobro Bancario Efectivo (Sin Descuento de Fondos)
- **Sintoma:** La transaccion concluyo pero los $1.000 CLP no fueron descontados de la cuenta bancaria de debito del usuario ni acreditados en la cuenta recaudadora.
- **Causa probable a investigar:**
  1. Estado de credenciales en produccion: verificar si las variables de entorno `MERCADOPAGO_ACCESS_TOKEN` o `MERCADOPAGO_PUBLIC_KEY` en Railway corresponden a credenciales de prueba (TEST) en lugar de produccion (APP_USR).
  2. Redireccion a URL de Sandbox: comprobar si `create-preference` utilizo `sandbox_init_point` en lugar del `init_point` oficial productivo.
  3. Comportamiento de Webpay en Mercado Pago: validar si el medio de pago Webpay selecciono modo simulador o si la pasarela no completo el capture bancario formal.

### B. Ausencia de Notificaciones Transaccionales (WhatsApp y Correo Electronico)
- **Sintoma:** No se recibio confirmacion de compra ni por WhatsApp ni por correo electronico.
- **Causa probable a investigar:**
  1. Integracion con WhatsApp Business API / Webhook: verificar el servicio o endpoint encargado del despacho del mensaje de WhatsApp y su estado de conexion o ejecucion.
  2. Servicio de correo (`/api/mail/send-welcome` o Resend/Nodemailer): comprobar credenciales SMTP o API Key en el servidor Railway, revision de logs en servidor y carpeta de spam del destinatario.
  3. Disparo post-pago: validar si el retorno o webhook ejecuto efectivamente la llamada a las funciones de notificacion tras la confirmacion del pago.

### C. Visibilidad de Contrasena en Formulario de Registro / Checkout
- **Requerimiento:** La clave ingresada por el apoderado/usuario debe poder verse mediante un boton o conmutador de visibilidad (icono de ojo para mostrar u ocultar).
- **Justificacion:** Si el usuario comete un error tipografico al escribir su clave y esta se encuentra oculta (`type="password"` sin opcion de alternar), queda sin saber exactamente que clave definio y sin un canal rapido de recuperacion en esa instancia.

### D. Formato y Mascara del Numero Telefonico
- **Requerimiento:** Al escribir el numero de contacto, este no debe quedar como una cadena continua de digitos pegados (ej. `56978981434`), sino estructurado y formateado de forma legible y estandarizada para Chile:
  - Formato deseado: `+56 9 7898 1434` (con prefijo visual y separacion en bloques de 4 digitos).
  - Implementar mascara interactiva que inserte los espacios automaticamente mientras el usuario escribe.

### E. Gestion y Cancelacion de Suscripciones (Eliminar / Dar de Baja)
- **Requerimiento:** No existe actualmente en la interfaz una opcion que permita al usuario o al administrador cancelar o eliminar una suscripcion activa.
- **Accion requerida:**
  1. Disenar e incorporar un boton de "Gestionar suscripcion" o "Cancelar suscripcion" en el panel del apoderado (`ParentDashboard` o seccion de cuenta).
  2. Incorporar endpoint en backend para suspender, cancelar o eliminar el registro de suscripcion en base de datos (`neonCurriculum` / `data/users.json` / tabla de suscripciones).
  3. Definir la logica de desuscripcion frente a la pasarela (Mercado Pago Subscriptions / preapproval en caso de cobros recurrentes).

---

## 2. Hoja de Ruta para la Sesion de Manana

1. **Auditoria Exhaustiva del Ciclo de Cobro End-to-End:**
   - Inspeccionar variables en Railway (`MERCADOPAGO_ACCESS_TOKEN`, `MERCADOPAGO_PUBLIC_KEY`, `MP_MODO_SANDBOX`).
   - Auditar `server.js` y el flujo de `create-preference` para garantizar cobro real con debito bancario y Webpay.
   - Probar y verificar el webhook `/api/payment/webhook` para registrar la aprobacion del pago directamente desde los servidores de Mercado Pago.

2. **Implementacion de Mejoras de UX en Checkout:**
   - Agregar boton de visibilidad de contrasena (`showPassword` toggle con iconos de ojo abierto / cerrado).
   - Implementar formateo automatico de telefono chileno (`+56 9 XXXX XXXX`).

3. **Activacion de Canales de Notificacion:**
   - Depurar despacho de correo de confirmacion con credenciales activas en Railway.
   - Definir y conectar el flujo de mensajeria de WhatsApp para recepcion inmediata de comprobante y credenciales.

4. **Modulo de Gestion de Suscripcion:**
   - Disenar el flujo de eliminacion / cancelacion de suscripciones tanto para el usuario final como para el panel de administracion.

5. **Revision de Casos de Borde:**
   - Analizar todo el circuito para detectar posibles fugas de estado, problemas de rehidratacion de sesion o inconsistencias en dispositivos moviles.
