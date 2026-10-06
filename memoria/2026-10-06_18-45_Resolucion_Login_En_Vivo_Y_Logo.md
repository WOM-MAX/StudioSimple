# Bitácora de Resolución: Autenticación en Vivo (RUN/Email/PIN) y Reparación de Logo

**Fecha y Hora:** 2026-10-06 18:55 CLT  
**Tipo:** Fix de Autenticación Crítica & Estética UI  
**Autor:** Antigravity (AI Software Engineer)  
**Estado:** Resuelto & Verificado 100%

---

## 1. Diagnóstico del Problema y Causa Raíz

1. **Fallo de Login en Vivo ("Credenciales no encontradas"):**
   - **Frontend desarticulado de la red:** `loginAsParent` y `loginAsStudent` en `AppContext.tsx` se ejecutaban de forma 100% sincrónica contra el `localStorage` local del navegador. Si un usuario abría una ventana privada o un nuevo navegador donde la caché aún no contenía el registro sincronizado de Neon DB, el login fallaba de inmediato sin consultar la API.
   - **Falta de tolerancia de formato en RUN:** El usuario intentaba ingresar con `8311477-0` (sin puntos), mientras que el registro en Neon DB contenía `8.311.477-0` (con puntos). En `server.js`, la consulta comparaba el valor literal sin normalizar las variantes (puntos, guiones y dígito verificador).
   - **Bloqueo por contraseña local desactualizada:** Si una familia ya existía en la caché local con la contraseña por defecto (`demo2026`), pero el apoderado ingresaba su contraseña definitiva (`Luciano22#$%`), el flujo local la rechazaba sin dar oportunidad a consultar Neon DB.

2. **Logo Roto en LoginScreen:**
   - La etiqueta `<img src="/logos/Logo largo blanco.png" />` apuntaba a un nombre de archivo con espacios.
   - El servidor de archivos estáticos en `server.js` recibía la petición codificada como `/logos/Logo%20largo%20blanco.png` y, al no invocar `decodeURIComponent(pathname)`, no encontraba el archivo en el sistema de archivos de Windows/Linux y entregaba el fallback SPA `index.html` (MIME `text/html`) en vez del binario PNG.

---

## 2. Solución Arquitectónica Implementada

### A. Backend (`server.js`)
1. **Normalización Inteligente de RUN:**
   - Extracción de dígitos y DV (`cleanRut`).
   - Generación de conjunto de variantes canónicas: `[83114770, 8.311.477-0, 8311477-0]`.
   - Consulta a Neon DB con operador `OR` multi-campo:
     - `email: { equals: normId, mode: 'insensitive' }`
     - `rut: r` y `studentRun: r` para cada variante.
     - `studentPin: pin`.
   - Fallback resiliente a `data/registered_families.json` si Neon DB experimenta cold-start / scale-to-zero.
2. **Soporte de URL Encoding en Archivos Estáticos:**
   - Decodificación con `cleanPathname = decodeURIComponent(pathname)` previa a `path.join(PUBLIC_DIR, ...)`.

### B. Frontend (`AppContext.tsx` & `LoginScreen.tsx`)
1. **Flujo Asíncrono de Login con Fallback a Neon DB:**
   - `loginAsParent` y `loginAsStudent` convertidos a funciones asíncronas (`Promise<{ success: boolean; error?: string }>`).
   - Si las credenciales no existen en caché local o si la contraseña local no coincide, se despacha una consulta inmediata en vivo a `POST /api/auth/login`.
   - Al recibir autenticación exitosa desde Neon DB, el usuario se inyecta en `localStorage`, se inicializa el perfil de estudiante (`LUCIANO TOMÁS HERNÁNDEZ ORELLANA`), se crea la sesión de autenticación y se redirige al portal.
2. **Reparación del Logo y Feedback Visual:**
   - En `LoginScreen.tsx`, se actualizó la imagen a `/logos/Logo_cabecera.png` con handler `onError` resiliente hacia `/logos/Logo largo blanco.png`.
   - Estados de carga interactivos (`isLoading`): botones con spinner animado (`progress_activity`) y bloqueo contra envíos duplicados.

---

## 3. Pruebas y Evidencia de Validación

### A. Doble Validación
1. **Compilación TypeScript y Vite:**
   - Comando: `npm run build` en `Web Studio Simple`.
   - Resultado: **Exit Code 0** (1683 módulos transformados sin errores tipográficos ni linter).
2. **Prueba Funcional de Autenticación (`scripts/test_live_login.ts`):**
   - **Caso 1 (RUN sin puntos):** `8311477-0` + `Luciano22#$%` -> **✔ AUTORIZADO (WALTER ORELLANA)**
   - **Caso 2 (RUN con puntos):** `8.311.477-0` + `Luciano22#$%` -> **✔ AUTORIZADO (WALTER ORELLANA)**
   - **Caso 3 (Correo):** `wom@colegioacropolis.net` + `Luciano22#$%` -> **✔ AUTORIZADO (WALTER ORELLANA)**
   - **Caso 4 (PIN Estudiante):** `278748` -> **✔ AUTORIZADO (LUCIANO TOMÁS HERNÁNDEZ ORELLANA, 7° Básico)**

---

## 4. Archivos Modificados
1. `server.js` - Normalización de RUN y decodeURIComponent en servidor estático.
2. `Web Studio Simple/src/context/AppContext.tsx` - Métodos asíncronos tolerantes con consulta al servidor.
3. `Web Studio Simple/src/components/auth/LoginScreen.tsx` - Integración async, spinners de carga y logo de cabecera.
4. `scripts/test_live_login.ts` - Suite de validación automatizada de login multivariante.
5. `memoria/2026-10-06_18-45_Resolucion_Login_En_Vivo_Y_Logo.md` - Esta bitácora.
