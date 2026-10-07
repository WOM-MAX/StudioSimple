# Bitácora de Sincronización Remota Multi-PC para el Aula Interactiva de EstudioSimple

**Fecha:** 2026-10-07 17:30  
**Autor:** Antigravity (AI Software Engineer)  
**Módulo:** Aula Interactiva Sincronizada (Dual Host/Client) & In-Memory Relay Server  
**Estado:** ✅ APROBADO Y COMPILADO (Build exitoso código 0)

---

## 1. Problema Detectado y Diagnóstico Técnico

### Síntoma
Al desplegar la vista del apoderado (mentor) en una computadora física y la vista del estudiante (cliente) en una computadora física independiente:
- El apoderado ingresaba, seleccionaba la lección y hacía clic en "Comenzar clase" y luego "Comenzar con el estudiante".
- En la computadora del estudiante, la pantalla permanecía congelada de forma indefinida en el mensaje *"La clase comenzará pronto"* (sala de espera).

### Causa Raíz
1. **Limitación de Transporte:** La arquitectura previa de `LessonSyncContext.tsx` utilizaba exclusivamente la API web nativa `BroadcastChannel` y `localStorage`. `BroadcastChannel` solo transmite mensajes entre pestañas del **mismo navegador y en la misma máquina física**. Ningún paquete se enviaba a través de la red (LAN o Internet).
2. **Desacoplamiento Pedagógico Inicial:** En el diseño instruccional, la etapa `prep` ("Antes de comenzar - Preparación del Mentor") mantiene intencionalmente al estudiante en la sala de espera hasta que el apoderado presiona *"Comenzar con el estudiante"* (`stage: 'routeOverview'`). Sin embargo, al no haber conexión de red remota, el cambio a `routeOverview` jamás llegaba a la PC del estudiante.

---

## 2. Arquitectura de Solución Implementada

Se implementó un sistema de transporte híbrido dual y un servidor de retransmisión ultraligero en memoria RAM:

```
[ PC 1: Apoderado (Mentor) ]
       │
       ├───> BroadcastChannel (0ms - Mismo equipo / Modo Split)
       │
       └───> POST /api/classroom/sync ───┐
                                          ▼
                         [ Node.js In-Memory Relay (RAM) ]
                         - activeClassrooms: Map<roomCode, session>
                         - classroomClients: Map<roomCode, Set<SSE>>
                         - Cero consumo de cuota Neon DB (Scale-to-Zero intacto)
                                          │
                                          ▼ SSE Stream / Fallback HTTP
                               [ PC 2: Estudiante (Cliente) ]
```

### Componentes y Cambios Realizados:

### A. In-Memory Relay en `server.js` (Producción Railway)
1. **Estructuras en RAM:**
   - `activeClassrooms`: Mapa asociativo `roomCode -> { session, lastUpdated }`.
   - `classroomClients`: Mapa asociativo `roomCode -> Set<{ res, role, clientId, lastSeen }>`.
   - Colector de basura automático cada 15 minutos que purga salas inactivas tras 3 horas sin clientes conectados.
2. **Endpoints HTTP:**
   - `GET /api/classroom/stream`: Canal Server-Sent Events (SSE) con `text/event-stream`, sin almacenamiento intermedio (`X-Accel-Buffering: no`), heartbeat ping cada 15 segundos y entrega instantánea del estado actual e informe de presencia.
   - `POST /api/classroom/sync`: Recepción de mutaciones de estado (`stage`, `video`, `conversationIndex`, `practiceIndex`, `feedback`), actualización atómica en RAM y retransmisión inmediata vía SSE a todos los pares conectados en la sala.
   - `GET /api/classroom/sync`: Endpoint JSON de contingencia para sondeo (polling) resiliente en redes donde los proxies bloquean flujos persistentes.

### B. Paridad Completa en `Web Studio Simple/vite.config.ts` (Entorno Dev)
- Se replicaron exactamente los endpoints `/api/classroom/stream` y `/api/classroom/sync` en el middleware de Vite para que las pruebas en red local con `npm run dev` funcionen idénticas a producción.

### C. Transporte Dual en `LessonSyncContext.tsx`
- **Enlace de Sala Dinámico (`roomCode`):** Derivado deterministamente del PIN de la familia (`room-${pin}`), compartiendo el mismo código tanto en la sesión del apoderado como en la del estudiante sin configuración manual.
- **Doble Vía de Comunicación:**
  1. `BroadcastChannel` local preservado (latencia 0ms para monitores individuales).
  2. Suscripción SSE remota con reintentos silenciosos y polling de respaldo cada 1.500 ms si la señal de red vacila.
  3. Publicación con debounce inteligente (50ms para interacciones continuas, inmediato para transiciones críticas de etapa o video).
  4. Prevención nativa de bucles de eco mediante `clientId` único por dispositivo.

### D. Indicadores Visuales de Conexión en Tiempo Real
1. **`AdultHeader.tsx`:**
   - `🟢 Estudiante en línea` (cuando el alumno se encuentra conectado en su PC).
   - `🟡 Esperando estudiante` (cuando el alumno aún no ha ingresado).
2. **`StudentLessonView.tsx` (Sala de Espera):**
   - `🟢 Mentor en línea · Sincronizado` (confirma enlace antes de iniciar la clase).
   - `🟡 Conectando con Mentor...` (estado de enlace inicial).
3. **`StudentHeader.tsx` (Durante la Clase):**
   - `🟢 Mentor en vivo` vs `🟡 Reconectando...`.
4. **`SynchronizedLessonMaster.tsx`:**
   - Cabecera del estudiante con estado interactivo en vivo.
5. **`TesterBar.tsx`:**
   - Badge visible con el código de sala activo (`room-XXXXXX`) para comprobación técnica del mentor.

---

## 3. Validación y Evidencia Técnica

1. **Sintaxis Node.js:**
   - `node -c server.js` -> Código de salida **0**.
2. **Compilación TypeScript & Vite:**
   - `npm run build` en `Web Studio Simple` -> Código de salida **0** (1.683 módulos transformados sin errores tipados ni de linter).
3. **Scale-to-Zero Neon DB:**
   - Garantizado: Cero lecturas o escrituras a la base de datos para la sincronización de aula. Toda la mensajería efímera se procesa en memoria RAM.

---

## 4. Guía para Pruebas en Dos Computadores Físicos

1. En la **PC 1 (Apoderado)**:
   - Iniciar sesión como Apoderado con las credenciales de la familia.
   - Ir a la clase (ej. *Matemática 7° Básico - Clase 1*).
   - El encabezado mostrará inicialmente `🟡 Esperando estudiante`.
2. En la **PC 2 (Estudiante)**:
   - Iniciar sesión con el PIN de 6 dígitos del estudiante.
   - Entrar al aula interactiva.
   - Verás el badge `🟢 Mentor en línea · Sincronizado`.
   - En la PC del apoderado, el indicador cambiará automáticamente a `🟢 Estudiante en línea`.
3. Iniciar la clase:
   - En la PC 1, hacer clic en "Comenzar clase" y luego en *"Comenzar con el estudiante"*.
   - **Resultado:** La pantalla de la PC 2 abandonará la sala de espera instantáneamente y mostrará *"Nuestra ruta de Matemática: 4 grandes bloques"*, manteniéndose sincronizada en cada avance de video, pregunta o ejercicio.
