# Bitácora de Sincronización y Reinicio Atómico Multi-PC

**Fecha:** 2026-10-07 18:50 (Hora local Chile)  
**Ambiente:** Railway Production & Local Dev (Vite)  
**Base de Datos:** Neon PostgreSQL (Scale-to-Zero)  
**Estado:** Resuelto y Validado (Build Código 0)

---

## 1. Problema Reportado
Al repetir una clase tras completar una sesión previa o volver a entrar desde los paneles:
1. La pantalla del estudiante quedaba fija en la sala de espera (*"La clase comenzará pronto"*).
2. Se percibía desincronización entre el apoderado y el estudiante.
3. En el panel de administración (*Centro de Control de Accesos y Seguridad*), el contador de familias mostraba momentáneamente `0` antes de que el pooler de Neon DB despertara de su suspensión automática.

---

## 2. Diagnóstico y Causa Raíz
1. **Falso Reinicio en Vistas de Lección:**  
   Los botones *"Repetir esta clase"* en `AdultLessonView.tsx` y `StudentLessonView.tsx` ejecutaban únicamente `setStage('cover')` en lugar de llamar a `resetSession()`. Esto provocaba que:
   - Las respuestas escritas previas (`studentTextAnswers`) quedaran sucias en memoria.
   - Los contadores (`conversationIndex`, `postIndex`, `practiceIndex`) permanecieran en sus valores finales.
   - Las marcas de video visto (`hookStarted`, `formalStarted`, etc.) no se restablecieran.
2. **Reingreso desde Dashboard:**  
   Al pulsar *"Repasar Clase (Host)"* en `ParentDashboard.tsx` o `StudentDashboard.tsx`, no se eliminaba el estado anterior guardado en `localStorage` (`estudiosimple_lesson_session_v1`), manteniendo la sesión en etapa final o desfasada.
3. **Fusión Superficial en el Relay en RAM (`server.js` y `vite.config.ts`):**  
   Al recibir mutaciones, el relay ejecutaba `room.session = { ...(room.session || {}), ...patch }`. Al resetear la sesión a un estado limpio, los campos residuales no se eliminaban si el objeto entrante venía vacío o con menos propiedades.
4. **Fase Privada `prep` vs Percepción de Bloqueo:**  
   En la progresión pedagógica CPA de EstudioSimple, la etapa 1 tiene dos momentos: `cover` (portada) y `prep` (preparación pedagógica privada del mentor). Durante ambas, el estudiante ve la sala de espera. Al no distinguir si el mentor ya había iniciado la clase leyendo su preparación, el usuario interpretaba que la pantalla del estudiante estaba congelada.

---

## 3. Solución Implementada

### A. Reset Atómico de Sesión en el Contexto (`LessonSyncContext.tsx`)
- Se extendió `resetSession()` para construir un estado limpio completo (`INITIAL_LESSON_SESSION`), resetear `studentConnected`, publicar mediante `BroadcastChannel` con flag `isReset: true` y disparar un `POST /api/classroom/sync` inmediato con flag `isReset: true`.
- Los listeners de eventos (`eventSource.onmessage`, `pollFallback` y `channel.onmessage`) detectan `isReset: true` y sustituyen la sesión entera por el estado inicial limpio.

### B. Sobreescritura Atómica en In-Memory Relay (`server.js` y `vite.config.ts`)
- En el endpoint `POST /api/classroom/sync`, si se recibe `isReset: true` o un reinicio a `cover` con intento 0, `room.session` se reemplaza atómicamente por completo en lugar de hacer un *merge* superficial.
- Se retransmite a todos los clientes SSE de la sala con `isReset: true`.

### C. Botones "Repetir esta clase" Conectados a `resetSession()`
- `AdultLessonView.tsx` (etapa final de completado): el botón *"Repetir esta clase"* ejecuta `resetSession()`.
- `StudentLessonView.tsx` (etapa final de completado): el botón *"Repetir esta clase"* ejecuta `resetSession()`.

### D. Purgado al Entrar a Repasar desde Dashboard
- En `ParentDashboard.tsx` y `StudentDashboard.tsx`, el botón *"Repasar Clase (Host)"* / *"Repasar Clase"* purga explícitamente `estudiosimple_lesson_session_v1` de `localStorage` para garantizar que la nueva sesión inicie en etapa 1 limpia.

### E. Feedback Visual Claro en la Sala de Espera del Alumno (`StudentLessonView.tsx`)
- Se distinguió el estado `prep` en el panel del estudiante:
  - Badge dinámico: `🟢 Mentor revisando preparación · ¡Casi listos!`
  - Título: `Preparando la sesión de hoy`
  - Mensaje explicativo: *"Tu mentor ya inició la clase y está revisando los objetivos pedagógicos. En breve dará el pase y tu pantalla avanzará automáticamente."*

### F. Resiliencia en Conexión a Neon DB (`user-repository.ts` y `UserManagementView.tsx`)
- Se agregó reintento silencioso con retardo de 1200ms en `fetchRegisteredUsersFromBackend()` para absorber el tiempo de despertar (*scale-to-zero*) de Neon PostgreSQL.
- Se agregaron estados de carga y spinners en las métricas y la tabla de `UserManagementView.tsx` para evitar parpadeos en 0.

---

## 4. Archivos Modificados
- `server.js`
- `Web Studio Simple/vite.config.ts`
- `Web Studio Simple/src/context/LessonSyncContext.tsx`
- `Web Studio Simple/src/components/lesson/adult/AdultLessonView.tsx`
- `Web Studio Simple/src/components/lesson/student/StudentLessonView.tsx`
- `Web Studio Simple/src/components/parent/ParentDashboard.tsx`
- `Web Studio Simple/src/components/student/StudentDashboard.tsx`
- `Web Studio Simple/src/lib/user-repository.ts`
- `Web Studio Simple/src/components/admin/cms/UserManagementView.tsx`

---

## 5. Verificación Técnica
1. **Sintaxis Node.js:** `node -c server.js` -> Código de salida 0.
2. **Compilación TypeScript / Vite:** `npm run build` -> Código de salida 0 (1,683 módulos transformados sin errores).
3. **Cero impacto en Neon DB:** Las cuentas reales (`mercedespenacordova@gmail.com`, `wom@colegioacropolis.net`, etc.) se mantienen intactas en la base de datos y en producción.
