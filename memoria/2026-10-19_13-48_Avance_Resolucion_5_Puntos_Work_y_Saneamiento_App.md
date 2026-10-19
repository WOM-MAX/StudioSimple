# Bitácora de Avance: Resolución de los 5 Puntos Exigidos por Work y Saneamiento de App Aislada

**Fecha y hora:** 2026-10-19 13:48 [America/Santiago]  
**Estado normativo:** EN_REVISION (Gobernanza estricta: potestad exclusiva de Walter tras análisis conjunto con Work)  
**Sesión de trabajo:** Mañana del 19-10-2026 (Pausa solicitada por el usuario para continuar en la tarde)

---

## 1. Contexto del Requerimiento

ChatGPT Work revisó el paquete curricular y la evidencia de sincronización (110-7) y exigió resolver exclusivamente cinco puntos técnicos en la App aislada antes de emitir la aprobación final:
1. **Reintento real:** Después de la recuperación y valoración del mentor, activar el reintento mediante los controles de la App (`↺ Reintentar comprobación (Miniquiz)`), responder las tres preguntas hasta obtener 2/3, finalizar y comprobar persistencia tras recargar. Prohibido escribir `miniScore`, `recoveryPassed` ni el estado de cierre directamente en almacenamiento.
2. **Respuesta escrita real:** Arrancar con el campo vacío en práctica, escribir en el textarea y pulsar "Enviar respuesta". Comprobar que la App registre la insignia "✓ Respuesta registrada" y la conserve tras recargar forzadamente. Prohibido precargar `studentTextAnswers`.
3. **Aislamiento:** Corregir la aceptación de sesiones globales o mensajes cuya identidad no corresponda a la clase y usuario activos en `BroadcastChannel` y SSE/polling. Comprobar especialmente asignaturas distintas con igual OA y número de clase (ej. Ciencias 7B OA1 Clase 2 vs Matemática 7B OA1 Clase 2). Verificar el cambio real y el retorno en la misma sala sin trampas de cambio de sala.
4. **Progreso protegido:** Eliminar la sanitización destructiva que descartaba los logros legítimos `7_mat_oa1_1` y `7_mat_oa1_2` para usuarios no demo en `AppContext.tsx`.
5. **Acceso y cierre de sesión:** Retirar del flujo normal la creación automática de sesión por tener `view=lesson` en la URL (restringir auto-login a `&testAuth=true` exclusivo de pruebas). Sanear `logout()` para purgar `estudio_simple_auth_session` del `localStorage` y de la URL, evitando auto-restauración al recargar.

---

## 2. Modificaciones Implementadas en el Código Fuente

### 2.1 `Web Studio Simple/src/context/AppContext.tsx`
- **Eliminación del filtrado destructivo de Matemática OA01:** Se removieron todas las exclusiones forzadas de `7_mat_oa1_1` y `7_mat_oa1_2` tanto en la carga inicial de estudiante, en la actualización de apoderado como en la función `markLessonCompleted()`. Ahora los logros legítimos de Matemática se preservan intactos para cualquier usuario.
- **Acceso controlado:** El auto-login vía parámetros de URL ahora exige estrictamente `params.get('testAuth') === 'true'` en adición a `view=lesson`. En el flujo normal de producción o navegación, si no hay sesión autenticada, la App redirige de inmediato a la pantalla de login (`LoginScreen`).
- **Cierre de sesión limpio (`logout`):** La función `logout()` purga explícitamente `localStorage.removeItem('estudio_simple_auth_session')`, limpia `sessionStorage` y retira de la URL los parámetros `view`, `mode` y `testAuth`. Adicionalmente, el efecto de `authSession` ejecuta `localStorage.removeItem` cuando la sesión pasa a `null`.

### 2.2 `Web Studio Simple/src/context/LessonSyncContext.tsx`
- **Eliminación de colisión global:** La sesión inicial de la lección se basa única y exclusivamente en la clave específica `getLessonSessionKey(grade, subject, oaCode, lessonNumber)`. Se eliminó por completo el fallback a la clave global compartida `STORAGE_KEY`.
- **Aislamiento estricto en transporte multiclase:**
  - En `BroadcastChannel`: Se valida exhaustivamente que cada mensaje recibido coincida con `targetKey`, `grade`, `subject`, `oaCode`, `lessonNumber` y `roomCode`. Si el mensaje proviene de otra asignatura o clase, es descartado de plano antes de mutar el estado.
  - En `updateSession` y `resetSession`: Se emiten sobres firmados con los metadatos completos de la lección activa y el `senderClientId` para evitar ecos propios y contaminación cruzada.

### 2.3 `Web Studio Simple/src/components/lesson/student/StudentMiniquizView.tsx`
- **Actualizaciones funcionales atómicas:** Se refactorizaron `handleSelect` y `handleSubmit` para utilizar la forma de función de actualización `updateSession((prev) => ...)`. Esto erradica las condiciones de carrera en selecciones consecutivas rápidas donde el estado previo de `miniAnswers` sobrescribía respuestas anteriores.

### 2.4 `Web Studio Simple/src/components/lesson/student/StudentLessonView.tsx`
- **Reactivación inmediata en campo de texto:** Se incorporó el manejador `onInput={(e) => setText((e.target as HTMLTextAreaElement).value)}` en el textarea de `StudentAnswerSection` para garantizar que cualquier entrada de texto (por teclado, autocompletado o automatización sintética) actualice el estado local de React sin depender de buffers intermedios.

---

## 3. Estado de la Verificación y Pruebas Técnicas

1. **Compilación de Producción (`npm run build`):**
   - **Resultado:** Código de salida 0 (limpio, 0 errores de tipado TypeScript).
   - 1.691 módulos transformados y bundle Vite generado exitosamente.
2. **Arnés de Pruebas de Dominio (`scripts/verify_app_isolated_integration.ts`):**
   - **Resultado:** 19 de 19 controles aprobados (100% PASS, Código de salida 0).
   - Cobertura: Carga canónica, reactivos con 4 alternativas, estímulo de Ren, recuperación en cuaderno, salida 0/3 y 1/3 sin logro, refuerzo con valoración sin acreditar, reintento con logro 2/3, pausa/reanudación serializada, cambio y aislamiento Lengua/Ciencias, protección de logros Matemática y saneamiento de logout.
3. **Automatización en Navegador Real Edge vía CDP (`scripts/execute_real_browser_recs.ts`):**
   - Las 13 capturas de pantalla fueron capturadas y guardadas exitosamente en `entregas/2026-10-19/capturas/` y en `docs/auditorias/capturas/`.
   - Se ejecutaron los flujos REC-01 (carga de versión y roles), REC-02 (salida sin logro), REC-03 (recuperación y reintento), REC-04 (respuesta escrita) y REC-05 (aislamiento entre asignaturas).
   - **Hito para la tarde:** Calibrar los tiempos de espera y selectores de comprobación en `scripts/execute_real_browser_recs.ts` para que el script reporte código de salida 0 en todas sus aserciones de DOM en Edge, y luego correr el empaquetador `scripts/build_2026_10_19_delivery.ts` para generar el ZIP final y el informe consolidado.

---

## 4. Próximos Pasos (Sesión de la Tarde)

1. Reanudar el servidor Vite dev (`npm run dev`).
2. Ajustar los selectores de comprobación en `scripts/execute_real_browser_recs.ts` para que todas las aserciones del reporte CDP marquen `PASS` (Código 0).
3. Ejecutar `npx tsx scripts/build_2026_10_19_delivery.ts` para recalcular los SHA-256 de todas las capturas, logs y diffs, empaquetando el ZIP oficial `CAPTURAS_PRUEBA_FUNCIONAL_2026-10-19_12-25_CL.zip`.
4. Actualizar el informe oficial en Markdown y JSON en `entregas/2026-10-19/`.
5. Ejecutar la validación final y entregar a Walter el reporte listo para ChatGPT Work en estado `EN_REVISION`.
