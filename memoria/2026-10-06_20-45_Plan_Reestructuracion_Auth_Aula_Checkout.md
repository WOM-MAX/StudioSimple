# Bitácora y Hoja de Ruta: Diagnóstico Crítico y Plan Maestro (Auth, Aula Estudiante, Edición CMS y Checkout)

- **Fecha:** 2026-10-06 20:45
- **Estado:** Análisis y Planificación Completada (Listo para ejecución autónoma con `/goal`)
- **Autor:** Antigravity (Ingeniero A-SDLC)

---

## 1. Diagnóstico Técnico de Causa Raíz

### 1.1. Mensaje de WhatsApp en Modal de Soporte ("Despacho automático WhatsApp ejecutado")
- **Evidencia Visual:** En el modal de "Clave Temporal de Soporte", un recuadro verde indica:
  > *"Despacho automático WhatsApp ejecutado. Se ha registrado y despachado la notificación al teléfono: +56978981434"*
- **Causa Raíz:** En `UserManagementView.tsx` (línea 333 y 2019), la propiedad `autoSentWhatsApp` se activa simplemente con la condición `Boolean(user.phone)`.
- **Realidad Operativa:** El sistema no tiene contratado un servicio de WhatsApp Cloud API ni webhook saliente automatizado a nivel de servidor que despache mensajes invisibles. Lo único que hace es registrar un evento de auditoría y armar el enlace `wa.me/569...`.
- **Efecto en el Usuario:** El administrador asume que el sistema ya envió el WhatsApp automáticamente al teléfono del apoderado, cuando en realidad dependía de presionar manualmente el botón *"Abrir Chat de WhatsApp"* o copiar el mensaje.
- **Solución:** Reemplazar el mensaje engañoso por una notificación clara del estado real: *"Teléfono verificado para contacto directo"* y habilitar el botón de apertura directa en WhatsApp Web / App con la plantilla precargada, o conectar la API oficial si se dispone de credenciales.

---

### 1.2. Imposibilidad de Ingresar con Clave del Apoderado y Clave de Soporte
- **Causa A (Error tipográfico en correo):** En la captura de pantalla del registro manual, el correo registrado fue `wom@coelgioacropolis.net` (con una "e" antes de la "l"). Al intentar iniciar sesión escribiendo el correo correcto (`colegioacropolis.net`), el backend respondió *"Usuario no encontrado"* porque la búsqueda en base de datos y disco era por coincidencia exacta.
- **Causa B (Clave inicial no editable en registro manual):** El modal de "Registrar Familia Manualmente" no solicitaba contraseña para el apoderado; `registerUserFromCheckout` le asignaba silenciosamente la clave por defecto `'demo2026'`. El usuario no sabía cuál era la clave creada.
- **Causa C (Desconexión de persistencia en Reset de Soporte):** Al presionar "Clave Soporte" (`Temp-G8RCJG!`), el endpoint `/api/admin/family/reset-password` en `server.js` actualizaba Prisma en Neon DB, pero **no actualizaba el archivo local `data/registered_families.json`**. Cuando el login realizaba fallback sobre el archivo local (o ante latencia/suspensión de Neon), la clave temporal no existía en disco.
- **Por qué sí funcionó el Estudiante:** El PIN infantil es numérico (`278748`), visible en la tabla, y el login de estudiante busca directamente por PIN sin depender del correo. Además, el login de apoderado contenía una regla de conveniencia que aceptaba el PIN del estudiante como contraseña.

---

### 1.3. Falla de Blindaje en el Aula: Estudiante Viendo Panel y Respuestas del Mentor
- **Evidencia Visual:** Al entrar a la clase desde el panel del estudiante (`StudentDashboard.tsx`), se visualiza la pantalla dividida (`SynchronizedLessonMaster.tsx`):
  - A la izquierda: **Vista del Apoderado (Mentor / Host)** mostrando el guion pedagógico, las indicaciones *"DILE:"*, el *"CLIMA EMOCIONAL"* y la **"RESPUESTA ESPERADA: -3"**.
  - A la derecha: Vista del estudiante.
  - En la cabecera: La barra de desarrollo `TesterBar` con el selector *"Ambas pantallas"* y el botón *"Modo Apoderado"*.
- **Causa Raíz:** En `LessonSyncContext.tsx` (línea 66), el estado inicial de `viewMode` es `'split'` (modo dividido para desarrollo). Cuando el estudiante pulsa *"Entrar a la Sala"*, la aplicación no comprueba el rol de la sesión (`authSession.role`). Al ser `role === 'student'`, la vista del aula debió restringirse estrictamente a `viewMode: 'student'`.
- **Efecto Pedagógico Crítico:** El estudiante tiene acceso a las respuestas de las actividades y al control de la clase, rompiendo la dualidad mentor-estudiante de EstudioSimple.

---

### 1.4. Falta de Edición de Datos Familiares en Admin CMS y Portal Apoderado
- **Causa:** No existía interfaz para modificar datos ya creados (corregir errores tipográficos en el correo, cambiar el número de teléfono o actualizar nombres).
- Si un usuario se equivocaba en una letra al registrarse, quedaba bloqueado permanentemente sin poder acceder ni recibir correos ni WhatsApp.

---

### 1.5. Ausencia de Pantalla de Confirmación y Advertencia en Checkout
- **Causa:** En `CheckoutFlow.tsx`, el usuario ingresa sus datos y pasa directamente al botón de pago de Mercado Pago sin una etapa de revisión explícita donde se le advierta que verifique su correo y teléfono antes de transferir.

---

## 2. Plan Maestro de Implementación para Mañana (4 Fases)

### Fase 1: Blindaje Estricto del Aula por Rol de Usuario (Prioridad Crítica)
1. **Detección de Rol en Aula Sincrónica (`SynchronizedLessonMaster.tsx` y `LessonSyncContext.tsx`):**
   - Si `authSession?.role === 'student'`, forzar de forma inmutable `viewMode = 'student'`.
   - Ocultar completamente la columna `AdultLessonView` (Mentor / Host) y el componente `TesterBar` cuando el usuario autenticado sea un estudiante.
   - Ocultar o proteger con contraseña del apoderado cualquier intento de cambiar a modo mentor desde la vista del estudiante.
   - Si `authSession?.role === 'parent'`, permitir al apoderado elegir entre solo mentor (`adult`) o pantalla compartida (`split`).

### Fase 2: Robustecimiento de Autenticación, Reset de Claves y Corrección de WhatsApp
1. **Corrección de Modal de Clave Temporal (`UserManagementView.tsx`):**
   - Eliminar el texto engañoso de auto-envío automático.
   - Mostrar estado real: *"Teléfono registrado: +56 9 XXXX XXXX"* con botón prominente *"Abrir Chat de WhatsApp con Mensaje Oficial"* y *"Copiar Plantilla"*.
2. **Persistencia Dual en Reset de Clave (`server.js`):**
   - Asegurar que `/api/admin/family/reset-password` actualice atómicamente TANTO Neon DB como `data/registered_families.json`.
3. **Definición de Contraseña en Registro Manual:**
   - Añadir campo opcional de contraseña inicial en el modal "Registrar Familia Manualmente" (con valor sugerido visible o generado).

### Fase 3: Módulo de Edición de Datos Familiares (Admin CMS y Portal Apoderado)
1. **Edición en Admin CMS (`UserManagementView.tsx` y `server.js`):**
   - Añadir botón de acción ✏️ *"Editar Datos"* en la tabla de familias.
   - Modal para editar: Nombre Apoderado, RUN, Correo Electrónico, Teléfono, Nombre Estudiante, RUN Estudiante y Plan.
   - Crear endpoint `PUT /api/admin/family/update` con persistencia en Neon DB y disco.
2. **Edición en Perfil del Apoderado (`ParentDashboard.tsx`):**
   - Sección *"Mi Cuenta / Datos de Contacto"* para que el apoderado pueda actualizar su correo y teléfono.

### Fase 4: Paso de Confirmación y Advertencia en Checkout (`CheckoutFlow.tsx`)
1. **Paso 3 de Resumen y Advertencia antes del Pago:**
   - Incorporar una tarjeta resumen destacada con los datos que se van a registrar.
   - Alerta visual amarilla/azul: *"Revisa atentamente tu correo electrónico y teléfono. A este correo enviaremos tus claves de acceso de forma inmediata."*
   - Botón *"Modificar datos"* o *"Confirmar y Pagar"*.

---

## 3. Comando Canónico de Ejecución Autónoma (`/goal`)

El siguiente comando `/goal` contiene todas las directivas técnicas necesarias para que el agente ejecute de principio a fin las 4 fases de manera 100% autónoma en la siguiente sesión:

```bash
/goal Ejecutar de inicio a fin la implementacion del blindaje estricto del aula por rol (estudiante solo ve pantalla de alumno sin respuestas ni mentor), persistencia dual de claves y correcion de mensajes en soporte WhatsApp, modulo de edicion de datos familiares en Admin CMS y portal apoderado, y paso de confirmacion previa en CheckoutFlow con 100% de autonomia y sin interrupciones intermedias.

DIRECTIVAS DE AUTONOMIA:
1. Prohibido solicitar aprobacion, hacer preguntas o pausar para pedir interaccion al usuario antes de concluir.
2. Prohibido ejecutar busquedas recursivas en la raiz del disco o scripts improvisados de Python: usa rutas exactas y TypeScript (npx tsx).
3. Delimitacion de mision: el entregable comprende:
   a) Forzar vista 'student' y ocultar TesterBar y respuestas pedagógicas en SynchronizedLessonMaster si authSession.role === 'student'.
   b) Corregir modal de soporte WhatsApp en UserManagementView para indicar con total transparencia el estado de envio manual/directo y garantizar persistencia dual de claves temporales en server.js (/api/admin/family/reset-password).
   c) Modal y endpoint de edicion de familias (nombre, rut, email, telefono, alumno) en Admin CMS y perfil del apoderado.
   d) Pantalla de confirmacion con advertencia de revision de email y telefono en CheckoutFlow.tsx antes de pasar a Mercado Pago.
   e) Compilacion limpia (npm run build exit 0), bitacora en memoria/ y git push a origin main.
4. Circuito de proteccion: maximo 4 intentos de autocorreccion ante fallos de compilacion antes de cambiar de enfoque o revertir cambios infructuosos.
5. Control de bloqueos: identificar procesos bloqueantes antes de limpiezas o modificaciones de paquetes.
6. Punto de control y reversibilidad: validar estado de git antes de mutaciones extensas.
7. Doble validacion: build exit code 0 e inspeccion de integridad de datos.
8. Persistencia: registrar hitos y avances en memoria/ para proteger el contexto.
9. Edicion atomica consolidada: cero micro-diffs iterativos en el mismo archivo.
10. Protocolo de reporte: entregar informe final exhaustivo con enlaces markdown file:// sin preguntas de cierre.
```
