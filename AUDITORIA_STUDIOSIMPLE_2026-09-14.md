# Auditoría integral: StudioSimple - Antigravity

- Fecha: 2026-09-14
- Alcance: workspace completo `D:\StudioSimple - Antigravity`, con foco en la aplicación `Web Studio Simple`
- Modalidad: auditoría de solo lectura. No se modificó ningún archivo del proyecto.
- Método: inspección estática del código y la configuración, `tsc --noEmit` con el binario local, arranque y sondeo del servidor de desarrollo en `127.0.0.1:5199` (detenido al terminar), medición de activos en disco y revisión de `spec/`, `memoria/` y scripts de raíz.
- Fuera de alcance: navegador (sin Lighthouse, axe, DevTools ni lectores de pantalla), despliegue en producción, auditoría automatizada de dependencias, historial de Git, y las carpetas `CONOCIMIENTO`, `TEMARIOS EELL` y `Base-Excel`.

---

## 0. Alcance verificado y limitaciones

**Verificado con evidencia:** estructura, código fuente, compilación de tipos, existencia o ausencia de archivos, arranque del servidor de desarrollo, contenidos de `localStorage`, `public/`, `spec/`, `memoria/`.

**No verificado (declarado):** despliegue en Railway (no hay configuración de despliegue en el repositorio ni URL de producción), cabeceras HTTP reales de los dominios externos usados, comportamiento en navegador (render, foco, memoria, red), contenido gráfico de los PNG, historial de Git (los directorios `.git` existen pero no contienen `HEAD`, por lo que **no pude verificar si `.env` está o estuvo versionado**), y todo el análisis de rendimiento en runtime.

---

## 1. Resumen ejecutivo

**Estado general.** StudioSimple - Antigravity es una **SPA de React 18 + Vite 5 + TypeScript + Tailwind 3, íntegramente de cliente**, sin backend, sin base de datos conectada y sin API real. El currículo vive en archivos de datos locales; la sesión de usuario vive en `localStorage`. El typecheck pasa limpio y la aplicación arranca y sirve módulos correctamente, lo que confirma una base técnica sana. Sobre esa base, la distancia al producto descrito en `spec/` y `AGENTS.md` es grande: no hay autenticación real, no hay persistencia por cuenta, el pago es una simulación, el progreso que se muestra al apoderado es texto fijo y una parte importante del código más voluminoso (incluido `LessonEngine7th.tsx`, de 115 KB) no está conectada a ninguna vista.

**Fortalezas comprobadas**

1. `tsc --noEmit` exit 0 y el servidor de desarrollo compila y sirve todos los módulos del grafo sin errores de transformación.
2. Arquitectura de componentes clara y consistente en la vista realmente montada: `SynchronizedLessonMaster` + `LessonSyncContext` + vistas de adulto y estudiante con separación de responsabilidades razonable.
3. Sin sumideros de XSS: cero ocurrencias de `dangerouslySetInnerHTML`, `innerHTML`, `eval` o `new Function`; React escapa todo el contenido dinámico (verificado en los tres frentes de auditoría).
4. Sin `fetch` a servicios de terceros con datos de usuario: la aplicación no envía información a ningún backend. Las únicas peticiones externas son Google Fonts, un `lh3.googleusercontent.com` en el checkout y PDFs estáticos de `curriculumnacional.cl`.
5. Sistema de diseño con tokens declarados (paleta oficial, tipografías, radios) y documentación de marca amplia en `memoria/`.
6. El concepto pedagógico (dos fases: cápsula didáctica y práctica tipo ensayo; pausas sensoriales; sincronización mentor-estudiante entre dispositivos) es coherente y está parcialmente implementado.

**Problemas más importantes**

1. **Credenciales hardcodeadas en el cliente**: super-administrador `admin@estudiosimple.cl` / `admin123` (`AppContext.tsx:205`, mostrada en `LoginScreen.tsx:251-269`), PIN de estudiante `123456` y contraseña de apoderado `demo2026` (`mockData.ts:12,19`), más la **cadena de conexión de Neon con contraseña en claro** en `ingest_excel_to_neon.py:10`.
2. **Autenticación y autorización solo de cliente**, evadibles editando `localStorage`, con el guard de rol existente sorteado por dos vías triviales.
3. **El Aula Sincronizada se abre sin autenticación** (botón flotante en `App.tsx:24-33` y CTA de la landing), con las respuestas correctas de los quizzes dentro del bundle.
4. **Checkout simulado que solicita número de tarjeta y CVC** sin procesador de pagos, sin validación, con éxito garantizado y PIN fijo en la pantalla de confirmación.
5. **Sin manejo de errores de almacenamiento ni ErrorBoundary**: un `localStorage` corrupto produce pantalla en blanco irrecuperable (`AppContext.tsx:50,57,63`).
6. **Rendimiento de la landing**: 151 frames WebP (6,08 MiB) precargados todos en el montaje y retenidos en memoria, más PNG de 4500x4500 px mostrados a 36-96 px.
7. **Accesibilidad**: elementos invisibles que siguen siendo enfocables con teclado, `outline-none` en el acordeón, contraste de 1,53:1 en la navegación de cabecera sobre el amarillo de marca.
8. **Calidad del producto**: la vista de lección realmente montada usa contenido hardcodeado (no `lessonData`), el progreso mostrado al apoderado es literal, los selectores de curso y asignatura no filtran nada, y cuatro enlaces de redes sociales apuntan a anclas inexistentes.

**Riesgos para usuarios y negocio**

- **Usuario menor de edad**: credenciales visibles en pantalla, PIN de 6 dígitos sin límite de intentos generado con `Math.random()`, y el alumno puede abrir la vista del mentor desde su propio dispositivo (`TesterBar` visible) donde están las respuestas y el material privado del apoderado.
- **Datos**: introducción de datos reales de tarjeta en un formulario que no cobra ni protege nada; correo del apoderado en un flujo sin base de datos.
- **Negocio**: promesas de producto (suscripción, progreso, credenciales por cuenta, panel de apoderado con analítica) que no se sostienen en el código; testimonios con nombre y curso hardcodeados sin fuente de datos; material premium descargable sin autenticación (`public/OA01_...docx`).
- **Cumplimiento**: no afirmo incumplimiento legal. Sí señalo que hay tres áreas que ameritan revisión especializada: captura de datos de tarjeta sin procesador, publicación de testimonios atribuidos a personas identificables y tratamiento de datos de menores con persistencia en el navegador y sin política de borrado.

**Nivel de preparación: prototipo funcional / demo interna.** No es alpha cerrada porque no hay cuentas reales ni persistencia remota; no es beta porque no hay backend, ni pruebas, ni observabilidad, ni control de acceso verificable. Evidencia: `services/api.ts` existe pero **no lo importa nadie**, `spec/constitution/roadmap.md` marca "Fase 2: Conexión de Datos" como pendiente, el `dist` disponible es del 25-07-2026 mientras el código es del 31-08-2026, y no hay ninguna herramienta de test ni de lint operativa.

**Cinco prioridades inmediatas**

1. Sacar del cliente y del repositorio todos los secretos: `admin123`, `demo2026`, PIN fijo y la cadena de conexión de Neon (`ingest_excel_to_neon.py:10`) rotando esa contraseña.
2. Decidir el acceso real: backend mínimo de autenticación y roles, o marcar el prototipo como demo y retirar el checkout con campos de tarjeta.
3. Restringir el Aula Sincronizada a usuarios autenticados y ocultar `TesterBar` en la vista `mode=student`.
4. Blindar el arranque: `try/catch` en los `JSON.parse` de `localStorage` y un `ErrorBoundary` de nivel superior.
5. Reducir el peso y el riesgo de accesibilidad de la landing: precarga por tramos del hero, reexportar los logos a 2x del tamaño de uso, `invisible` en las fases ocultas y foco visible en el acordeón.

---

## 2. Inventario de la aplicación

**Propósito del producto (verificable en `index.html:6`, `LandingPage.tsx` y `spec/`).** Plataforma de estudio para familias chilenas que educan en casa y preparan los **exámenes libres del MINEDUC**, de 3° a 8° básico. La promesa es acompañar dos etapas: cápsula didáctica (el estudiante copia el ejemplo en su cuaderno físico) y práctica tipo ensayo con formato de evaluación formal. La landing menciona "Temarios MINEDUC 2026", "Exámenes Libres 3° a 8° Básico" y precios de suscripción.

**Usuarios objetivo.** Apoderado o mentor (padre, madre o educador) y estudiante de 3° a 8° básico. `spec/constitution/mission.md` y `AGENTS.md` añaden el foco en familias neurodivergentes y en el segmento de 3° a 8° básico de la Región Metropolitana. [No Verificado] No hay analítica ni investigación de usuarios en el repositorio que confirme el segmento.

**Funciones existentes y su estado real**

| Función | Estado verificado | Evidencia |
|---|---|---|
| Landing pública con propuesta de valor, método, precios, FAQ y testimonios | Funciona (estático) | `LandingPage.tsx` (34 KB), renderizada desde `App.tsx:35` |
| Hero con scrubbing de scroll sobre 151 frames | Funciona con los defectos de rendimiento del punto 7 | `HeroScrollScrubber.tsx:5,22-53` |
| Login de estudiante por PIN y de apoderado por correo y contraseña | Funciona parcialmente: solo cliente, comparación local, credenciales fijas | `LoginScreen.tsx`, `AppContext.tsx:187-231` |
| Sesión y roles (`student`, `parent`, `admin`) | Funciona parcialmente: la sesión es un objeto en `localStorage` sin firma ni expiración | `AppContext.tsx:61-64,97-103` |
| Portal del estudiante: ruta de OAs, lecciones, progreso | Parcial: la estructura funciona, el progreso es fijo y las lecciones 2-5 están bloqueadas de forma permanente | `StudentDashboard.tsx:184-249`, `curriculumData.ts:34-60` |
| Panel del apoderado: navegación de OAs, lecciones, analítica | Parcial: funciona la navegación; los indicadores son literales y los selectores no filtran | `ParentDashboard.tsx:35-36,73-105,250,346,359,372` |
| Aula Sincronizada: vista mentor y vista estudiante sincronizadas entre pestañas o dispositivos | Funciona parcialmente: `BroadcastChannel` operativo, pero con los defectos del punto 3 y sin validación de estado | `LessonSyncContext.tsx`, `SynchronizedLessonMaster.tsx` |
| Miniquiz y refuerzo con puntaje y aprobación | Parcial: criterios duplicados en cuatro lugares y umbrales divergentes | `AdultLessonView.tsx:606,708-717`, `StudentRecoveryView.tsx:8-17` |
| Checkout con selección de plan y "pago" | No funcional: simulación con `setTimeout` de 1200 ms | `CheckoutFlow.tsx:29-36,303-309` |
| Datos curriculares | Datos locales: `curriculumData.ts` (Matemática 7° Básico, 9 OAs), `neonCurriculum.json` (2,1 MB, **sin usar**) | `data/curriculumData.ts`, `services/api.ts` |
| Registro de usuario, recuperación de contraseña, eliminación de cuenta | **No existe** | Sin coincidencias en `src` |
| Backend, API real, base de datos | **No existe en la aplicación**. Hay `prisma/schema.prisma` con `provider = "sqlite"` y un `dev.db` de 2,6 MB en la raíz, pero **ninguna línea de la SPA usa Prisma** | `prisma/schema.prisma:6`, `services/api.ts` sin importadores |

**Flujos principales**

1. Landing, CTA, Aula Sincronizada, sin autenticación.
2. Landing, Login, Portal del estudiante, Aula de la Clase 1.
3. Landing, Login, Panel del apoderado, "Iniciar Clase Sincronizada", Aula.
4. Landing, Precios, Checkout, "suscripción completada" con PIN 123456.
5. Portal del estudiante, botón "Modo Apoderado", modal de contraseña, Panel del apoderado.

**Integraciones.** Ninguna real. Consumo externo: Google Fonts (Inter, Montserrat, Material Symbols, Nunito), una imagen en `lh3.googleusercontent.com` (`CheckoutFlow.tsx:50`), PDF de `curriculumnacional.cl` (`PdfViewerModal.tsx`, componente no usado) e iframes de `youtube-nocookie.com` (`LessonEngine7th.tsx:1094-1101`, componente no usado). Ninguna de estas integraciones tiene manejo de fallo.

**Tipos de datos gestionados.** Perfil de estudiante (nombre, curso, avatar, puntos, gemas, lecciones completadas, PIN), usuario apoderado (nombre, correo, contraseña en claro, plan, cursos matriculados), sesión de autenticación, estado de sesión de lección sincronizada, preferencias de tema y color, currículo (OAs, lecciones, actividades) y contenido de lección (guiones, tarjetas, quizzes, exámenes). No hay datos médicos ni sensibles de terceros; sí hay **datos de menores** (nombre, curso, avatar) persistidos en el navegador.

**Plataformas compatibles.** Aplicación web; `index.html` declara `lang="es"` y `viewport` estándar. No hay manifiesto PWA, ni service worker, ni `apple-touch-icon`, ni estrategia offline, pese a que `spec` describe el enfoque "Mobile-First (Progressive Web App)". No hay `width`/`height` en las imágenes ni `srcSet`.

**Funciones incompletas o no verificadas.** Suscripción y cobro; recuperación de contraseña; alta real de cuenta; progreso por usuario y por lección; analítica del apoderado (los cuatro indicadores son literales); notificación al apoderado (el texto "Notificación Enviada al Apoderado" de `LessonEngine7th.tsx:1913` no tiene implementación); selector de curso y asignatura de los dashboards; indicador "Estudiante conectado" (texto fijo, `AdultHeader.tsx:46-49`); "video" del gancho (no hay ningún elemento `<video>` en la carpeta de lección); pestañas de infografía y modal de respiración de `LessonEngine7th` (inalcanzables, el componente no está montado); y el panel de apoderado en su versión "as-built" que la memoria describe con regeneración de PIN, función que existe en el contexto (`generateStudentPin`) pero **no tiene ninguna interfaz que la invoque**.

---

## 3. Auditoría funcional

**Navegación. Parcial.** El cambio de vista es estado de React más `history.replaceState` (`AppContext.tsx:136-148`). No hay router. Consecuencias verificadas: el botón "atrás" del navegador no navega entre vistas (sale de la aplicación), no existen URLs compartibles ni enlaces profundos, y para el Aula Sincronizada sí hay parámetro `?mode=` (`LessonSyncContext.tsx:49-57,126-133`) como única excepción. No hay estado de carga, ni 404, ni página de error.

**Formularios y validaciones. Deficiente.** El login de estudiante valida longitud de PIN (`LoginScreen.tsx:16-19`) y el de apoderado valida campos no vacíos (`29-32`). El correo se valida solo por `type="email"` del navegador. **No hay límite de intentos, ni bloqueo temporal, ni captcha, ni registro de intentos** (`LoginScreen.tsx:13-37`). El checkout no valida nada: nombre, apellidos, correo, tarjeta, expiración y CVC son campos sin `required`, sin patrón y sin comprobación; la "compra" siempre prospera (`CheckoutFlow.tsx:29-36`). El formulario del checkout **entra en la interfaz con datos precargados de otra persona** ("Jane", "Doe", "jane.doe@example.com", tarjeta terminada en 4242, `CheckoutFlow.tsx:23-27`).

**Inicio de sesión y cuentas. Parcial, con dos vías de evasión de rol.** El guard de `App.tsx:38-39` solo comprueba `isAuthenticated`, no el rol. Y `navigateWithAuth` (`AppContext.tsx:151-176`) sí implementa la regla de roles, pero **`AdultHeader.tsx:16` y `TesterBar.tsx:17` llaman a `setViewMode('parent')` directamente**, saltándola. Además, `localStorage.setItem('estudio_simple_auth_session')` guarda un objeto plano manipulable (`AppContext.tsx:97-103`), de modo que cualquiera puede escribir `{"role":"admin","isAuthenticated":true}` y entrar.

**Gestión de datos. No hay persistencia de producto.** Todos los datos de negocio son mocks (`mockData.ts`) o constantes (`curriculumData.ts`). El avance real solo existe dentro del Aula Sincronizada y en `localStorage` global bajo la clave `estudiosimple_active_lesson_session` (`LessonSyncContext.tsx:6`), **sin separar por usuario ni por lección**. Limpiar el navegador borra todo, y dos usuarios en el mismo equipo comparten la misma sesión de lección.

**Búsqueda, filtros y ordenamiento. No existen.** El panel del apoderado tiene selectores de curso y asignatura cuyo estado se guarda pero **nunca se usa para filtrar**; el contenido mostrado es siempre Matemática 7° Básico (`ParentDashboard.tsx:35-36,195,401`). No hay buscador de lecciones ni de OAs, ni ordenamiento, ni paginación.

**Estados vacíos y errores. Ausentes.** No hay ningún estado vacío en listas, ningún mensaje de error de datos, ningún reintento. Los dos únicos manejos de error son dos `console.error` en `LessonSyncContext.tsx:67,104`. El de la precarga del hero es peor de lo que parece: `onerror` incrementa el mismo contador que `onload`, de modo que **los fallos se contabilizan como éxito** (`HeroScrollScrubber.tsx:27-50`).

**Carga, guardado, edición y eliminación.** Solo existe "guardado" implícito en el aula (escritura en `localStorage` en cada interacción). No hay edición de perfil, ni creación de usuarios, ni borrado de datos desde la interfaz. El botón "Restaurar credenciales por defecto" (`LoginScreen.tsx:280-289`) borra el perfil y el usuario apoderado de `localStorage` y recarga la página, **sin confirmación**.

**Integraciones y notificaciones. Ausentes o sin manejo de fallo.** No hay ninguna notificación al usuario ante fallos (fuentes que no cargan, imágenes que fallan, PDFs externos que no responden). El hero no muestra nada mientras carga.

**Permisos y roles. No verificables como control real.** Los tres roles existen como tipo (`types/index.ts:6`) pero la autorización es decorativa: el panel del apoderado se alcanza desde la sesión de estudiante por dos vías (SEC-03 y SEC-07), y el rol `admin` se obtiene con una credencial publicada.

**Recuperación ante fallos. Ausente.** Sin `ErrorBoundary` en todo el proyecto (verificado: sin coincidencias de `ErrorBoundary` ni `componentDidCatch` en `src`), sin reintentos, sin estado offline, sin comprobación de disponibilidad. Un índice fuera de rango en el aula produce `TypeError` y, sin barrera, pantalla en blanco.

**Compatibilidad con entradas inesperadas. Parcial.** El estado restaurado de `localStorage` no se valida ni se versiona (`LessonSyncContext.tsx:59-71,83-87`), los índices se desreferencian sin guardas (`AdultLessonView.tsx:328-332`, `StudentLessonView.tsx:128-132,218-226`), y `services/api.ts:9,24` usa `includes()` sobre cadenas de curso, lo que hace coincidir "7° Básico" con cualquier curso que contenga el dígito 7 (latente, el módulo no se usa). No hay validación con Zod en ninguna parte, pese a que `AGENTS.md` la exige para toda entrada externa.

---

## 4. Auditoría de errores

Formato compacto por hallazgo: ID, categoría, gravedad, evidencia, impacto, causa probable (solo si hay respaldo técnico), recomendación, esfuerzo, prioridad y criterio de verificación. Las reproducciones se incluyen para los hallazgos Altos y Críticos.

### Críticos

**SEC-01. Secretos publicados en el cliente. Crítica.**
Archivo: `Web Studio Simple/src/context/AppContext.tsx:203-216`; `src/components/auth/LoginScreen.tsx:250-278`; `src/data/mockData.ts:12,19`.
Qué: la comparación de admin es literal en el cliente (`email === 'admin@estudiosimple.cl' && password === 'admin123'`), la pantalla de login muestra esa credencial con un botón que autentica con un clic (`LoginScreen.tsx:258-268`), y el mensaje de error la repite cuando falla (`AppContext.tsx:230`). Además `pin: '123456'` y `password: 'demo2026'`. La decisión está documentada como intencional en `memoria/2026-07-27_19-10_Credenciales_SuperAdmin_y_Selector_Nativo_3Niveles.md`, lo que confirma que no es un accidente, pero no cambia el hecho de que es un secreto en artefacto público.
Reproducción: abrir la aplicación, pulsar "Ingresar como Admin", o ejecutar `grep -r "admin123"` sobre `dist/assets/*.js` tras un build. Esperado: ninguna credencial en el bundle. Observado: credencial presente y funcional, y el rol `admin` habilita los seis cursos.
Impacto: cualquiera que alcance la URL obtiene el rol de mayor privilegio sin credencial válida; viola la regla ZERO-TRUST del propio repositorio; si algún día el backend confía en `role`, es una escalada completa.
Causa probable (con respaldo): autenticación implementada enteramente en cliente para la demo, sin capa de servidor.
Recomendación: rotar y eliminar estas credenciales; sustituir la rama de admin por un mecanismo real (endpoint de autenticación que devuelva token) o, mientras siga siendo demo, condicionar la demo a `import.meta.env.DEV` y consumir un valor de entorno, nunca un literal.
Esfuerzo: S para eliminarlas del cliente, M para autenticación real. Prioridad: P0. Verificación: build de producción sin las cadenas `admin123`, `demo2026`, `admin@estudiosimple.cl` ni `123456` en `dist/assets`; login de admin falla con credencial aleatoria.

**SEC-02. Cadena de conexión de PostgreSQL con contraseña en claro en el repositorio. Crítica.**
Archivo: `ingest_excel_to_neon.py:10` (`DB_URL = "postgresql://neondb_owner:<contraseña>@ep-floral-unit-acgb3xlf-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require"`).
Qué: la URL completa está en el código. Los dos archivos `.env` del workspace contienen la misma credencial (raíz y aplicación). El `.gitignore` del proyecto de la app excluye `.env`, pero **no existe `.gitignore` en la raíz del workspace** y **no pude verificar el estado del repositorio Git** porque los directorios `.git` no contienen `HEAD`.
Impacto: acceso total a la base Neon si el archivo se comparte, se sincroniza o se versiona; el usuario `neondb_owner` es el propietario de la base.
Recomendación: rotar la contraseña de Neon, retirar la cadena del script y leerla de `os.environ`, añadir `.gitignore` en la raíz y revisar (con ayuda del responsable de infraestructura) si la credencial llegó a publicarse.
Esfuerzo: S. Prioridad: P0. Verificación: `grep -r "npg_"` sin coincidencias fuera de `.env` y `.env` fuera de control de versiones.

### Altos

**SEC-03. Autorización solo de cliente, con la sesión editable en `localStorage`. Alta.**
Evidencia: `AppContext.tsx:61-64,97-103,151-176`; `App.tsx:38-39`; `AdultHeader.tsx:16`; `TesterBar.tsx:17`.
Reproducción: iniciar sesión como estudiante (PIN 123456), pulsar "Modo Apoderado", "Cancelar", y luego el botón del encabezado del aula que lleva al panel del apoderado. Esperado: bloqueo por rol. Observado: se abre `ParentDashboard` sin contraseña. Alternativa: desde la consola del navegador, escribir `localStorage.setItem('estudio_simple_auth_session','{"role":"admin","userId":"x","enrolledGrades":[],"isAuthenticated":true}')` y recargar.
Impacto: acceso a datos del apoderado y a su contraseña almacenada; falsificación de rol admin; cualquier control futuro basado en el cliente queda anulado.
Recomendación: usar `navigateWithAuth` en ambos puntos, exigir rol en `App.tsx:39`, y mover la decisión a servidor. Mientras no haya servidor, documentar explícitamente que la autorización no existe.
Esfuerzo: S (mitigación), L (solución real). Prioridad: P0. Verificación: con sesión de estudiante, ninguna ruta a `parent` sin reautenticación; sesión manipulada a mano no otorga rol.

**SEC-04. Contraseña y PIN persistidos en texto plano en el navegador. Alta.**
Evidencia: `AppContext.tsx:47-59,89-95`; `mockData.ts:12,19`.
Impacto: cualquier XSS futuro, extensión o acceso físico al equipo lee la credencial del apoderado; el propio estudiante puede leerla (es la que desbloquea el panel del apoderado). Reproducción: en el portal del estudiante, abrir DevTools y leer `localStorage.getItem('estudio_simple_parent')`.
Recomendación: no persistir `password` ni `pin`; guardar solo un identificador de sesión y validar en servidor.
Esfuerzo: M. Prioridad: P0. Verificación: `localStorage` sin campos `password` ni `pin`.

**SEC-05. El Aula Sincronizada es accesible sin autenticación. Alta.**
Evidencia: `App.tsx:17-19` (retorno temprano antes de cualquier comprobación) y `24-33` (botón flotante "Aula Sincronizada" visible en todas las vistas); CTA de la landing que llama `setViewMode('lesson')`.
Impacto: el contenido de la lección 1, incluido el guion del mentor y las respuestas correctas, es público, y contradice el modelo de suscripción de la landing. Reproducción: abrir la URL, pulsar el botón flotante inferior derecho.
Recomendación: exigir sesión (estudiante o apoderado) para `viewMode === 'lesson'`.
Esfuerzo: S. Prioridad: P0. Verificación: sin sesión, el botón no aparece y `viewMode=lesson` redirige a login.

**SEC-06. Las respuestas correctas viajan en el bundle. Alta.**
Evidencia: `data/lessons/matematica_7b_oa01_clase01.ts:169-198` (campo `correct` por pregunta), `mockData.ts:77-126` (`correctIndex`), `LessonEngine7th.tsx:662-669`.
Impacto: cualquier evaluación es trivialmente copiable con DevTools; el registro de resultados no es confiable. Es inherente a una arquitectura sin backend: corresponde a la Fase 2 del roadmap.
Recomendación: cuando exista backend, enviar solo el identificador de pregunta y las opciones y validar en servidor; mientras tanto, documentarlo como limitación conocida.
Esfuerzo: L. Prioridad: P1. Verificación: inspección del bundle sin respuestas correctas y puntaje validado en servidor.

**ERR-01. `JSON.parse` sin protección en el arranque y sin `ErrorBoundary`. Alta.**
Evidencia: `AppContext.tsx:50,57,63`; `LessonSyncContext.tsx:59-71` (este sí tiene `try/catch`); ausencia de `ErrorBoundary` en todo `src`.
Reproducción: en la consola, `localStorage.setItem('estudio_simple_student','{')` y recargar. Esperado: se restaura un perfil por defecto o se avisa. Observado: excepción durante el render inicial de `AppProvider` sin barrera, pantalla en blanco.
Impacto: pérdida total de acceso sin mensaje ni recuperación; basta un dato corrupto, una extensión o una versión anterior del formato.
Recomendación: envolver los tres `JSON.parse` en `try/catch` con valor por defecto y añadir un `ErrorBoundary` raíz con opción de "restablecer datos locales".
Esfuerzo: S. Prioridad: P0. Verificación: con cada clave corrupta, la aplicación carga y ofrece recuperación.

**ERR-02. El estado `paused` es un callejón sin salida persistido. Alta.**
Evidencia: `AdultLessonView.tsx:687-694,743-751,895-909` (render de `paused` sin botones); `StudentLessonView.tsx:319-329`; `LessonSyncContext.tsx:59-71,101` (persistencia y restauración); `TesterBar.tsx:111-119` (único escape: reiniciar y perder todo).
Reproducción: en el aula, pulsar "Terminaremos por hoy" y recargar. Esperado: opción de retomar. Observado: la clase vuelve a abrir en la pantalla de cierre sin ninguna acción disponible y el texto promete "La próxima sesión se retomará".
Impacto: sesión inutilizable tras cualquier recarga, con pérdida del avance como única salida.
Recomendación: añadir "Retomar donde quedamos" que use el estado ya guardado y un reinicio con confirmación.
Esfuerzo: S. Prioridad: P0. Verificación: pausar, recargar y continuar la clase sin perder progreso.

**SEC-07. El estudiante puede entrar a la vista del mentor y reiniciar la sesión compartida desde su dispositivo. Alta.**
Evidencia: `SynchronizedLessonMaster.tsx:13-16` (`<TesterBar />` incondicional); `TesterBar.tsx:31-64` (conmutador de vistas) y `111-119` (botón "Reiniciar"); `LessonSyncContext.tsx:135-141` (el propio producto abre la vista de estudiante en otro dispositivo).
Impacto: la vista de estudiante en la tablet es el dispositivo del alumno; desde ahí ve `ExpectedAnswerBox` y `PrivateBox` del mentor y puede borrar el avance de ambos.
Recomendación: renderizar `TesterBar` solo en el host y ocultar conmutador y reinicio cuando `mode=student`; el reinicio, con confirmación.
Esfuerzo: S. Prioridad: P0. Verificación: en `?mode=student` no hay barra de herramientas ni opción de cambiar de vista.

**ERR-03. Cálculo de puntaje y aprobación duplicado con criterios divergentes. Alta.**
Evidencia: `AdultLessonView.tsx:606,708-717`; `StudentLessonView.tsx:252`; `StudentRecoveryView.tsx:8-17`; `LessonEngine7th.tsx:662-669` (devuelve 100 sin examen y `NaN` con cero preguntas).
Impacto: el mismo resultado puede leerse como "aprobado" en la tablet del alumno y "requiere refuerzo" en la del mentor; con cero preguntas de refuerzo, `0 >= 0` declara aprobado sin responder; `NaN% de Logro` se muestra al usuario.
Recomendación: extraer tres funciones puras (`computeScore`, `getIncorrectIndices`, `evaluateRecovery`) a un módulo compartido y usarlas en todas las vistas, con guarda explícita para cero preguntas.
Esfuerzo: M. Prioridad: P1. Verificación: pruebas unitarias de los tres casos límite y veredicto idéntico en ambas pantallas.

**ERR-04. Miniquiz acoplado a exactamente 3 respuestas. Alta.**
Evidencia: `StudentMiniquizView.tsx:14` (`miniAnswers.length === 3`); `AdultLessonView.tsx:596` (texto "3 respuestas").
Impacto: con una lección de cuatro o más preguntas el array crece, la igualdad nunca vuelve a cumplirse y el botón "Enviar respuestas" queda deshabilitado de forma permanente. Hoy solo hay una lección de 3 preguntas, así que el fallo llega con el segundo contenido.
Recomendación: comparar contra `lessonData.quiz.questions.length` y usar `>=` sobre el total.
Esfuerzo: S. Prioridad: P1. Verificación: lección de prueba con 4 preguntas permite enviar y puntuar.

**ERR-05. Examen sin reintento y estado no reiniciado al cambiar de asignatura. Alta (latente).**
Evidencia: `LessonEngine7th.tsx:655-656` (`examAnswers`, `showExamResult`), `766-773` (cambio de asignatura que no los reinicia), `1833` (único punto que activa `showExamResult`), `1805` (bloqueo de clics tras evaluar).
Impacto: al cambiar de asignatura después de evaluar, el estudiante ve respuestas marcadas como correctas de un examen que no ha rendido, el botón de evaluar desaparece y aparece "0% de Logro". Es latente porque `LessonEngine7th` no está montado en ninguna vista (ver TEC-02).
Recomendación: `useEffect` sobre `selectedSubject` que reinicie `examAnswers` y `showExamResult`, y un botón de "Volver a intentar".
Esfuerzo: S. Prioridad: P2. Verificación: evaluar, cambiar de asignatura y comprobar que el examen aparece limpio.

**UX-01. Checkout simulado que solicita datos de tarjeta y "aprueba" sin cobrar. Alta.**
Evidencia: `CheckoutFlow.tsx:236-243` (campo de contraseña de cuenta), `282-300` (número de tarjeta, expiración `12/26` y CVC `123` precargados), `303-309` (envío sin validación), `29-36` (`setTimeout` que fija `isCompleted`), `330-333` (entrega un PIN fijo `123456`), `341-351` (botones que llevan al login y al panel del apoderado).
Impacto: un apoderado puede introducir datos reales de tarjeta en un formulario que no se envía a ninguna pasarela ni está protegido; la confirmación afirma "Suscripción Completada" y entrega credenciales falsas. Reproducción: Precios, completar y enviar; siempre "éxito".
Recomendación: mientras no exista pasarela, retirar los campos de tarjeta y el botón de compra, dejar "solicitar acceso" con captura de correo (alineado con la estrategia freemium descrita) y marcar la pantalla como demostración. Si se integra pago, delegar los campos a la pasarela.
Esfuerzo: S (retirar) / L (integrar). Prioridad: P0. Verificación: no existe ningún campo de tarjeta en la interfaz publicada.
[No Verificado] No puedo evaluar cumplimiento legal (PCI-DSS, Ley 19.496, Ley 19.628) sin revisión especializada; señalo el riesgo, no una conclusión jurídica.

**PERF-01. Hero: precarga completa y retención de 151 bitmaps. Alta.**
Evidencia: `HeroScrollScrubber.tsx:5` (`TOTAL_FRAMES = 151`), `22-53` (bucle de `new Image()` en el montaje, `imagesRef` conserva las 151 referencias), `36-51`.
Medición de archivos: 151 archivos `frame_0001..0151.webp`, 6.376.148 bytes (6,08 MiB), 1280x720 VP8 lossy. [Inferencia] decodificados a RGBA serían ~531 MiB si estuvieran todos activos; los navegadores desalojan, así que es un techo, no una medición.
Impacto: 6,38 MB compiten en la primera visita; en Android de gama media (segmento objetivo) es causa plausible de jank y recarga de pestaña.
Recomendación: precargar por tramos (primeros 20 y claves cada 10), cargar bajo demanda en `renderFrame`, liberar frames fuera de una ventana de vecinos, limitar `dpr` a 2 y arrancar el bucle en `i = 2` (hoy el frame 1 se descarga dos veces).
Esfuerzo: M. Prioridad: P1. Verificación: red con throttling mostrando menos de 1 MB antes del primer scroll y sin picos de memoria al recorrer el hero completo.

**PERF-02. Imágenes de marca de 4500x4500 px mostradas a tamaño de icono. Alta.**
Evidencia: `LandingPage.tsx:30-34,439-443,473-519` (`/logos/Casa.png`, `Personas.png`, `Ampolleta.png`, `Crecimiento.png`, `Logo sin tag.png`, `Logo con todo.png`).
Medición: los seis archivos son PNG de 4500x4500 px; `public/logos` suma 4,16 MiB para 20 archivos.
Impacto: ~1,44 MB de red y decodificación innecesaria para iconos de 36 a 56 px; [Inferencia] ~463 MiB decodificados si se mantuvieran simultáneamente.
Recomendación: reexportar esos seis a 2x del tamaño de uso en WebP manteniendo el nombre, y archivar los 14 restantes fuera de `public/`.
Esfuerzo: S. Prioridad: P1. Verificación: peso de `public/logos` por debajo de 300 KB y ninguno de los seis por encima de 60 KB.

**A11Y-01. Elementos invisibles que siguen siendo enfocables y foco invisible en el acordeón. Alta.**
Evidencia: `HeroScrollScrubber.tsx:160-163,185-188,204-239` (fases ocultas con `opacity-0` y `pointer-events-none`, que no sacan del orden de tabulación; los botones de la fase 3 siguen siendo alcanzables); `LandingPage.tsx:374,384,394,404` (`outline-none` en los cuatro `summary`); ausencia de cualquier estilo `:focus-visible` en `index.css`.
Impacto: quien navega con teclado tabula a botones invisibles y puede activar por error "Ingresar al Panel del Apoderado"; el acordeón de FAQ se recorre sin saber dónde está el foco. Afecta a WCAG 2.2 2.4.3, 2.4.7 y 2.4.11.
Recomendación: `invisible`/`visible` o `inert` más `aria-hidden` en las fases inactivas; retirar `outline-none` y añadir `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8AD22]` en los `summary`.
Esfuerzo: S. Prioridad: P1. Verificación: recorrido completo con Tab sin foco perdido ni elementos invisibles activables.

**A11Y-02. Contraste insuficiente en navegación y pie sobre el amarillo de marca. Alta.**
Evidencia: `LandingPage.tsx:46-49` (`text-[#EE751C]` sobre `var(--hf-bg) = #F8AD22`); `Footer.tsx:28-31` (insignia `emerald` sobre el mismo fondo); `Footer.tsx:39,49,54` (`hover:text-[#12A1A4]`); `LandingPage.tsx:424` (blanco sobre `#EE751C`).
Valores calculados con la fórmula de luminancia relativa de WCAG 2.x sobre los colores declarados (no medidos en navegador): 1,53:1 el enlace de cabecera; 1,97:1 en tema claro y 1,01:1 en tema oscuro la insignia verde; 1,65:1 los hovers; 2,92:1 el blanco sobre el naranja del CTA. El umbral AA es 4,5:1 para texto normal y 3:1 para componentes no textuales.
Impacto: el enlace más destacado de la cabecera y la insignia de cumplimiento normativo son prácticamente ilegibles, y la insignia desaparece en tema oscuro (que es el arranque por defecto, `index.html:2`).
Recomendación: usar el color de texto de la cabecera (`--hf-text`) o `#0A192F` en esos elementos (9,21:1 sobre el amarillo), reservar el color de marca para bordes o subrayados, y revisar los temas `silver` y `turquoise`, donde el blanco tampoco alcanza (3,35:1 y 3,15:1).
Esfuerzo: S. Prioridad: P1. Verificación: todos los pares texto/fondo de cabecera y pie por encima de 4,5:1 en los ocho temas de color.

### Medios (registro consolidado)

| ID | Categoría | Problema | Evidencia | Impacto | Recomendación | Esfuerzo | Prioridad | Verificación |
|---|---|---|---|---|---|---|---|---|
| SEC-08 | Seguridad | Sin límite de intentos ni bloqueo temporal en el login; PIN de 6 dígitos y contraseña demo | `LoginScreen.tsx:13-37,187-201` | Fuerza bruta trivial (10^6 combinaciones, sin coste) | Añadir límite por sesión y retardo progresivo; cuando exista backend, en servidor | S (cliente) / M (servidor) | P1 | 20 intentos fallidos bloquean temporalmente |
| SEC-09 | Seguridad | PIN generado con `Math.random()`; la función no tiene interfaz | `AppContext.tsx:37-39,243-247` | PIN predecible y función inalcanzable, mientras `memoria` afirma que existe una sección de regeneración en el panel | Usar `crypto.getRandomValues` y exponer la acción en el panel, o eliminar la función y corregir la memoria | S | P2 | PIN de 6 dígitos desde CSPRNG y regeneración visible |
| SEC-10 | Privacidad | Datos de menores y del apoderado en `localStorage` sin cifrado ni política de borrado; la clave de sesión de lección es global | `AppContext.tsx:89-95`; `LessonSyncContext.tsx:6` | Cualquier persona con el equipo ve nombre, curso y credenciales; dos usuarios comparten sesión | Minimizar datos, no guardar credenciales, aislar por usuario y añadir borrado explícito | M | P1 | `localStorage` sin credenciales y con claves por usuario |
| SEC-11 | Privacidad | Documento interno de negocio servido sin autenticación | `public/OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx` (63.304 B) | Material premium descargable por cualquiera que acierte la URL | Moverlo fuera de `public/` y servirlo con control de acceso | S | P1 | Ningún documento interno en `public/` |
| FP-01 | Formularios | Checkout sin validación y con datos de otra persona precargados; curso en inglés mostrado al usuario; precios en USD | `CheckoutFlow.tsx:23-27,223-235,372,377` | Confusión, desconfianza y datos basura; mercado chileno con precios en dólares | Validar y vaciar los campos, unificar a pesos chilenos, alinear etiquetas y valores | S | P1 | Formulario vacío, validado y mostrando el curso en español y el precio en CLP |
| NAV-01 | Navegación | Sin router: vistas en estado más `replaceState` | `AppContext.tsx:136-148` | Botón atrás inoperante, sin URLs compartibles ni enlaces profundos, sin página 404 | Introducir router ligero y rutas por vista, incluidas rutas protegidas | M | P2 | Atrás y adelante navegan entre vistas y cada vista tiene URL |
| DATA-01 | Gestión de datos | Selectores de curso y asignatura que no filtran; progreso y analítica literales | `ParentDashboard.tsx:35-36,73-105,250,346,359,372`; `StudentDashboard.tsx:184-249` | La interfaz promete personalización y ofrece datos falsos al apoderado | Conectar los selectores al currículo disponible y derivar el progreso del estado real del estudiante | M | P1 | Cambiar curso o asignatura cambia el contenido; el progreso refleja lecciones completadas |
| DATA-02 | Gestión de datos | El contenido de la lección está hardcodeado en las vistas, no en `lessonData` | `StudentLessonView.tsx:54,84,156,192-207,285-311`; `AdultLessonView.tsx:115` | La segunda lección mostraría el contenido de la primera ("ascensor", "Clase 1 Finalizada") sin error de compilación | Mover todo literal a `LessonData` y usar los campos en el render | M | P1 | Cargar una segunda lección muestra su contenido propio |
| ERR-06 | Errores | Índices del estado de lección desreferenciados sin guardas; estado restaurado sin validar ni versionar | `AdultLessonView.tsx:328-332,509-516,757-763`; `StudentLessonView.tsx:128-132,218-226`; `LessonSyncContext.tsx:59-71,83-87` | `TypeError` y pantalla en blanco ante estado viejo o mensaje manipulado entre pestañas | Fallback a `items[0]`, estado vacío cuando no hay datos, validación con Zod y clave por lección | M | P1 | Estado corrupto o índice inválido muestra estado vacío, no pantalla blanca |
| ERR-07 | Errores | Efectos secundarios dentro del updater de estado y difusión del objeto completo | `LessonSyncContext.tsx:97-108`; `main.tsx:6-10` (`StrictMode`) | Escrituras y mensajes duplicados en desarrollo; una pestaña con instantánea antigua puede sobrescribir la última respuesta | Mover `localStorage` y `postMessage` a un `useEffect` y difundir solo el parche | S | P1 | Una acción produce una escritura y un mensaje; las respuestas no se pierden con dos pestañas |
| ERR-08 | Errores | Estados muertos que la interfaz afirma como activos ("Estudiante conectado", "video reproduciendo", "Notificación Enviada") | `AdultHeader.tsx:46-49`; `StudentLessonView.tsx:109-119`; `LessonEngine7th.tsx:1913`; `types/lesson.ts:177` | El mentor confía en semáforos que no miden nada; promesas de producto sin implementación | Conectar al estado real con heartbeat, o etiquetar como demostración y ajustar el texto | M | P2 | El indicador cambia al cerrar la pestaña del estudiante; ningún texto promete algo no implementado |
| A11Y-03 | Accesibilidad | Modales sin `role`, `aria-modal`, Escape, trampa ni restauración de foco | `StudentDashboard.tsx:255-315`; `PdfViewerModal.tsx:81-183` | Usuario de teclado y lector de pantalla queda atrapado o pierde el contexto | Diálogo accesible completo: rol, `aria-modal`, Escape, foco inicial y retorno, bloqueo de scroll | S | P1 | Escape cierra, el foco no sale del diálogo y vuelve al botón de origen |
| A11Y-04 | Accesibilidad | Cero atributos ARIA en el módulo de lección y feedback dinámico sin región viva | `Cards.tsx:69-91`; `TesterBar.tsx:31-64`; `AdultSidebar.tsx:55-60` | El alumno no recibe el acierto o la corrección con lector de pantalla; el producto declara atender familias neurodivergentes | `role="status" aria-live="polite"` en la retroalimentación, `aria-pressed` en los modos, `aria-current` en el paso activo | S | P1 | El lector anuncia aciertos, errores y cambios de paso |
| A11Y-05 | Accesibilidad | Movimiento continuo y scroll secuestrado sin `prefers-reduced-motion` | `index.css:194-208` (marquesina infinita); `HeroScrollScrubber.tsx:147,178` (320vh); verificado que la consulta no existe en el CSS servido | Molestia vestibular y de atención en el segmento objetivo declarado | Añadir `@media (prefers-reduced-motion: reduce)` que detenga marquesina y rebote y reduzca el hero | S | P1 | Con la preferencia activa no hay animación infinita ni scrubbing |
| A11Y-06 | Accesibilidad | Jerarquía de encabezados con salto de `h2` a `h4`, `alt` duplicado en la marquesina, objetivos táctiles bajo 24 px | `LandingPage.tsx:418,450,472-487`; `Footer.tsx:36,63,75,90-105` | Navegación por encabezados confusa y texto anunciado dos veces | Usar `h3`, `alt=""` en imágenes decorativas y añadir padding a los enlaces | S | P2 | Navegación por encabezados sin saltos y marquesina anunciada una vez |
| UX-02 | UX | Enlaces de redes sociales a anclas inexistentes y favicon ausente | `LandingPage.tsx:460-463`; `Footer.tsx:77-80`; `index.html:5` | Cuatro enlaces rotos en el pie, incluido el WhatsApp que la propia FAQ promete; 404 del icono | Retirar los enlaces o publicar URLs reales; añadir `favicon.svg` | S | P2 | Ningún enlace apunta a ancla inexistente; el favicon carga con 200 |
| UX-03 | UX | El hero no tiene estado de carga ni de error, y el progreso calculado nunca se muestra | `HeroScrollScrubber.tsx:17-18,42-50,147-154` | Franja oscura de tres pantallas sin señal de actividad; abandono en el primer scroll | Renderizar `loadProgress` mientras carga y un fondo estático si todos los frames fallan | S | P2 | Con red lenta se ve progreso; con imágenes bloqueadas se ve contenido legible |
| TEC-01 | Configuración | `npm run lint` inejecutable (sin ESLint instalado ni configuración) y `npm test` falla por diseño | `Web Studio Simple/package.json:9-10`; `package.json:10`; sin `.eslintrc*` ni `eslint.config.*`; sin `eslint` en dependencias | El criterio de salida declarado ("linter libre de errores") no es verificable y nada detecta hooks mal usados ni imports muertos | Instalar y configurar ESLint con `typescript-eslint`, `react-hooks` y `jsx-a11y`, o retirar el script y documentarlo | S | P1 | `npm run lint` devuelve 0 y detecta el efecto secundario del updater |
| TEC-02 | Deuda técnica | Código muerto: siete componentes sin importadores, incluido el archivo más grande, y la capa de datos local sin usar | `LessonEngine7th.tsx` (115 KB, 2018 líneas), `LessonPlayer.tsx`, `Navbar.tsx`, `Footer.tsx`, `SensoryPause.tsx`, `ThemeCustomizerModal.tsx`, `PdfViewerModal.tsx`; `services/api.ts` con `neonCurriculum.json` (2,1 MB) | ~180 KB de código que se audita y se mantiene sin efecto, y una "conexión de datos" que no existe | Decidir por archivo: cablear o eliminar; conectar la capa de datos o retirarla del árbol | M | P1 | Cada componente tiene al menos un importador o no está en `src` |
| TEC-03 | Deuda técnica | Sin pruebas automatizadas y sin Vitest, pese a que `spec/constitution/tech-stack.md` lo declara | Verificado: sin archivos `*.test.*` ni `*.spec.*`; sin `vitest` en dependencias | Ninguna red de seguridad sobre puntaje, aprobación, sincronización ni persistencia | Añadir Vitest y cubrir primero las funciones puras de puntaje y los casos límite | M | P1 | `npm test` ejecuta pruebas de puntaje y aprobación |
| TEC-04 | Configuración | Documentación que no corresponde al código | `memoria/2026-07-26_14-41...md:21` promete regeneración de PIN en `ParentDashboard` (inexistente); `spec/constitution/tech-stack.md` declara "HTML + CSS"; `roadmap.md` deja "Conexión de Datos" pendiente | El onboarding y la gobernanza SDD que el propio repositorio exige no son fiables | Reconciliar `spec` y `memoria` con el código, y declarar React + Vite + TypeScript como stack real | S | P2 | Documentación que describe exactamente lo que hace el código |
| PERF-03 | Rendimiento | Un render por evento de scroll y lectura de layout en el mismo manejador | `HeroScrollScrubber.tsx:109-139` | Jank durante el gesto principal de la landing en equipos modestos | Mantener el progreso en `useRef`, escribir la barra por CSS y dejar `useState` solo para las tres fases | M | P2 | Sin renderizados por evento de scroll y animación estable en gama media |
| PERF-04 | Rendimiento | Tres familias tipográficas externas que no se usan y Material Symbols duplicado (una vez con `display=block` y otra con `display=swap`) | `index.html:10-13`; `index.css:1-2`; verificado en el CSS servido que `Nunito` se importa y que la marca usa `Arial Rounded` con `!important` | Hojas externas que bloquean renderizado sin aportar nada y cuatro peticiones a Google por visita | Eliminar Inter, Montserrat y Nunito, quedarse con una sola declaración de iconos y autoalojar la fuente de marca | S | P2 | Una única petición de fuentes y tipografía idéntica en Android, iOS y escritorio |
| PERF-05 | Rendimiento | Clases de Tailwind inexistentes que no generan CSS (`backdrop-blur-xs`, `font-body-md`) y tokens CSS sin definir | `HeroScrollScrubber.tsx:243`; `LandingPage.tsx:24`; `Footer.tsx:36,63,75` con `index.css:172` | Diseño degradado en silencio: sin desenfoque y sin color en encabezados del pie | Sustituir por utilidades válidas (`backdrop-blur-sm`, `font-body`) y definir los tokens | S | P3 | Las clases aparecen en el CSS emitido y los encabezados del pie tienen color propio |
| OPS-01 | Operación | Artefacto `dist` desactualizado respecto al código y sin canal de despliegue visible | `dist/assets/*` con fecha 25-07-2026 frente a `src` con fecha 31-08-2026; el CSS de `dist` no contiene `animate-marquee` | Publicar `dist` tal cual entrega una versión vieja de la aplicación | Regenerar antes de publicar y no versionar artefactos | S | P1 | El artefacto publicado se corresponde con un commit identificable |
| OPS-02 | Operación | Sin observabilidad ni gestión de incidencias | Únicos manejos: `LessonSyncContext.tsx:67,104`; sin telemetría, sin alertas, sin registro de cambios | Los fallos en producción son invisibles y no reparables | Añadir captura de errores con contexto, y un canal mínimo de incidencias y changelog | M | P2 | Errores de cliente visibles en un panel con versión y ruta |
| DEP-01 | Dependencias | `xlsx@0.18.5` en la raíz con vulnerabilidades conocidas y `vite@^5.4.10` (instalado 5.4.21) con CVE-2025-24010 reportado para 5.4.10 | `package.json:23`; `Web Studio Simple/package.json`; fuentes públicas citadas abajo | El CVE de Vite afecta al servidor de desarrollo (no al artefacto publicado); `xlsx` se usa solo en scripts locales de importación y exportación | Ejecutar una auditoría de dependencias en CI, actualizar Vite y `xlsx` (o migrar a una versión mantenida) y confirmar el alcance real de cada aviso | S | P1 | `npm audit` sin avisos altos y servidor de desarrollo actualizado |

Fuentes de dependencias: [Snyk, xlsx 0.18.5](https://security.snyk.io/package/npm/xlsx/0.18.5) y [IBM Security Bulletin sobre vite-5.4.10 y CVE-2025-24010](https://www.ibm.com/support/pages/node/7237940#1). [No Verificado] No ejecuté `npm audit` para no enviar el inventario de dependencias a un servicio externo; la explotabilidad real de cada aviso requiere análisis aparte.

### Bajas e informativas (resumen)

| ID | Gravedad | Problema | Evidencia |
|---|---|---|---|
| LOW-01 | Baja | Imports y estados sin uso; `noUnusedLocals` desactivado oculta los muertos | `tsconfig.json:15-16`; `Navbar.tsx:3,12-13`; `LandingPage.tsx:3` |
| LOW-02 | Baja | Estado de tema claro no implementado: `:root` y `.dark` tienen los mismos valores y no existe `[data-theme="light"]`; `index.html:2` fuerza oscuro contra el `'light'` inicial de `AppContext.tsx:71` | `index.css:9-23,88-95` |
| LOW-03 | Baja | Marquesina con salto de 24 px al reiniciar el ciclo (medio `gap`) [Inferencia] | `index.css:195-204`; `LandingPage.tsx:470` |
| LOW-04 | Baja | `key` por índice o por texto de opción | `AdultLessonView.tsx:173`; `StudentMiniquizView.tsx:60`; `PdfViewerModal.tsx:136` |
| LOW-05 | Baja | Estados muertos en la lección (`formalEnded`, `reviewIndex`, `activeOa`, `studentConnected` nunca leídos) | `types/lesson.ts:166-177` |
| LOW-06 | Baja | `select-none` en todo el contenedor del estudiante impide seleccionar enunciados | `StudentLessonView.tsx:13` |
| LOW-07 | Baja | Nombres de archivo con espacios en las rutas de activos | `LandingPage.tsx:33,442` |
| LOW-08 | Baja | Imágenes sin `width`/`height` ni `decoding="async"`; `dpr` sin límite en el canvas | `LandingPage.tsx:30-34`; `HeroScrollScrubber.tsx:90-100` |
| INF-01 | Informativa | No hay sumideros de XSS ni enlaces con `target="_blank"` sin `rel` (el único caso, `PdfViewerModal.tsx:152-153`, sí lo incluye) | Verificado por búsqueda exhaustiva |
| INF-02 | Informativa | Testimonios con nombre, curso y cinco estrellas hardcodeados sin fuente de datos | `LandingPage.tsx:294-361`; [No Verificado] no puedo determinar si son reales o ficticios |
| INF-03 | Informativa | Iconos por fuente externa (Material Symbols) en lugar de `lucide-react`, ya instalado | `LoginScreen.tsx:148,166`; `PdfViewerModal.tsx:89,126,156,174` |
| INF-04 | Informativa | Descarga en dos peticiones de `frame_0001.webp` y precarga sin `cleanup` (con `StrictMode` se duplican las 151 cargas) | `HeroScrollScrubber.tsx:27-38,48-53`; `main.tsx:6-10` |

**Recuento del registro consolidado:** Crítica 2, Alta 10, Media 24, Baja 8, Informativa 4. Los informes delegados por archivo suman, además, 30 hallazgos detallados en `LessonEngine7th.tsx`, 31 en el módulo de lección y 40 en landing y layout; los relevantes están consolidados aquí por causa raíz para evitar duplicación.

---

## 5. Experiencia de usuario y diseño

**Claridad de la propuesta de valor. Buena en la landing.** El título ("Exámenes Libres MINEDUC"), la sección de método en tres pasos con pestañas y la FAQ comunican con claridad qué se ofrece y a quién. El hero de scroll comunica el puente pantalla-cuaderno. Punto débil: el CTA del hero lleva al Aula Sincronizada sin explicar que es una demo, y la sección de testimonios presenta personas identificables sin respaldo visible.

**Facilidad de aprendizaje. Buena en el aula, mala en el resto.** El aula tiene jerarquía clara, un paso canónico por pantalla y vocabulario propio ("pausa de oxígeno", "misión"). Pero la misma función se llama "Pausa activa" (`AdultHeader.tsx:42`), "Pausa de Oxígeno" (`TesterBar.tsx:76,79`) y "Pausa de respiración y descanso activo" (`StudentHeader.tsx:38`), y el mismo destino se rotula "Volver al Dashboard", "Volver al Portal" y "Volver al Panel del Apoderado". Un adulto y un niño mirando pantallas simultáneas necesitan un único nombre por función.

**Flujo de incorporación. Ausente.** No hay onboarding, ni tour, ni explicación de las credenciales (el login muestra una caja de credenciales de demo, que es lo contrario de un onboarding), ni verificación de correo, ni elección de curso guiada. El checkout "crea" una cuenta con PIN fijo y no explica cómo se entrega ese PIN al estudiante.

**Arquitectura de información. Aceptable con ruido.** Landing, precios, login, portal de estudiante, panel de apoderado y aula están separados. Pero el botón flotante "Aula Sincronizada" aparece en **todas** las vistas, incluidas la landing y el panel del apoderado, sin contexto de qué es, y el Aula tiene su propia barra de herramientas que solo tiene sentido para quien la desarrolla.

**Navegación. Frágil.** Ver NAV-01: sin router, sin URLs, sin historial, sin migas de pan, sin 404. El panel del apoderado se alcanza por tres caminos distintos con tres etiquetas distintas.

**Jerarquía visual. Sólida.** Tokens de color, escala tipográfica y tarjetas con radios grandes son consistentes en las vistas realmente usadas. Problemas puntuales: contraste insuficiente sobre el amarillo de marca (A11Y-02), clases inertes por utilidades inexistentes (PERF-05) y densidad alta de insignias y píldoras de color en las tarjetas de lección.

**Consistencia de componentes. Duplicación real.** `LandingPage` reimplementa cabecera y pie completos (líneas 26-98 y 434-544), y `Navbar.tsx` y `Footer.tsx` existen sin usarse, con el array `BRAND_COLORS` copiado en los dos (`LandingPage.tsx:13-21`, `Navbar.tsx:20-28`). Ya divergieron: el pie de la landing no está limitado con `max-w-7xl` y el enlace al aula se llama distinto en cada versión. Hay dos modales de tema/color distintos (`ThemeCustomizerModal`, sin uso, y el menú de color del checkout) y tres componentes que listan lecciones con el mismo diseño.

**Textos, etiquetas y mensajes. Con errores visibles.** "Iniciar Sesion" sin tilde en el título y el botón del login (`LoginScreen.tsx:69,239`), "Contrasena" (`207`), el mensaje de error del login revela la credencial de admin (`AppContext.tsx:230`), y el resumen del pedido muestra `selectedPlan` en inglés (`monthly`, `full`, `trial`, `CheckoutFlow.tsx:368`) y el curso como `5th Grade` (`372`).

**Estados de carga, éxito y error. Casi inexistentes.** Sin indicadores de carga (el del hero se calcula y no se muestra), sin estados vacíos, sin mensajes de error de datos, y "éxito" solo en el checkout simulado. El aula sí tiene retroalimentación de acierto y apoyo, con buen tono no punitivo.

**Prevención de acciones peligrosas. Débil.** "Reiniciar" en el aula borra el avance guardado sin confirmación y está junto a "Pausa de Oxígeno" (`TesterBar.tsx:111-119`); "Restaurar credenciales por defecto" borra el perfil sin confirmación (`LoginScreen.tsx:280-289`); el "pago" se completa con un clic sin resumen de importe confirmado.

**Deshacer y rehacer. Inexistente.** No hay deshacer en ninguna vista, ni recuperación del avance tras un reinicio accidental.

**Pantallas pequeñas y grandes. Parcial.** El aula usa `select-none` global, el contenedor del estudiante tiene `min-h-[720px]` (`StudentLessonView.tsx:13`), la barra de herramientas del aula y los seis tabs de asignaturas del visor PDF son densos en móvil, y el hero ocupa 320vh. El modo `split` del aula está previsto para dos columnas en escritorio, lo cual es correcto, pero no hay diseño específico para tablet en vertical, que es el dispositivo del estudiante según el propio producto.

**Usuarios nuevos y avanzados. No hay diferenciación.** No hay atajos de teclado en el aula, ni progreso persistente por usuario, ni personalización más allá de color de cabecera y tema (y el tema claro no está implementado, LOW-02).

**Coherencia visual. Buena con excepciones.** La paleta oficial se respeta; el checkout y el aula comparten tokens. Las excepciones son el uso puntual de `Arial Rounded` con `!important` frente a Inter y Montserrat declaradas en `tailwind.config.js:35-39` (ninguna de las tres se usa realmente), y el logo del checkout servido desde `lh3.googleusercontent.com` (`CheckoutFlow.tsx:50`) en lugar del logo local del resto de la aplicación.

**Cinco mejoras de interfaz concretas**

1. Unificar terminología: "Pausa de Oxígeno" y "Volver al Panel" en los tres encabezados, y borrar las variantes.
2. Confirmación en dos pasos para "Reiniciar" y "Restaurar credenciales", con un botón de deshacer durante 5 segundos.
3. Sustituir el bloque de credenciales de demo del login por un aviso de "entorno de demostración" sin credenciales visibles, y un botón "Entrar como invitado" que abra una vista de solo lectura.
4. En el panel del apoderado, reemplazar los cuatro indicadores literales por un estado vacío honesto ("Aún no hay clases registradas") hasta que exista persistencia real.
5. Retirar el botón flotante global del Aula y mover el acceso al contexto donde tiene sentido (tarjeta de lección), con etiqueta "Abrir clase".

---

## 6. Accesibilidad

Método: revisión estática del marcado y del CSS. **No ejecuté axe, Lighthouse ni prueba con lectores de pantalla**; los contrastes son cálculos sobre colores declarados.

**Navegación por teclado. Deficiente.** Hallazgos verificados: fases del hero ocultas con `opacity-0` que siguen siendo enfocables (`HeroScrollScrubber.tsx:160-239`); `outline-none` en los cuatro `summary` del acordeón (`LandingPage.tsx:374-404`); cuatro contenedores de logo que son `div` con `onClick` sin rol ni teclado (`LandingPage.tsx:29-35,438-444`); tarjetas y elementos de la lección con `div` clicable.

**Orden y visibilidad del foco. Deficiente.** No hay ningún estilo `:focus-visible` en el proyecto; el único bloque de foco es `.input-field:focus` (`index.css:159-163`). El foco no se gestiona en ningún modal ni al cambiar de paso en el aula.

**Lectores de pantalla. Deficiente en el aula, aceptable en la landing.** Cero atributos `aria-*`, `role` o `tabIndex` en toda la carpeta `lesson` (verificado por búsqueda). La retroalimentación del miniquiz no usa región viva. Los encabezados de la landing tienen una jerarquía correcta salvo el salto de `h2` a `h4` antes del pie.

**Etiquetas accesibles. Parcial.** Los campos del login tienen `label` asociado visualmente, aunque sin `htmlFor` ni `id` (asociación solo por proximidad, no programática). En el aula hay entradas de texto sin etiqueta ni `aria-label` (por ejemplo la del campo de emoción en `LessonEngine7th.tsx`). Los iconos son elementos de fuente (`material-symbols-outlined`) sin texto alternativo.

**Contraste. Incumplimientos concretos.** Ver A11Y-02: 1,53:1 en el enlace "Aula Sincronizada" de la cabecera sobre el amarillo por defecto; 1,97:1 (claro) y 1,01:1 (oscuro) en la insignia verde del pie; 1,65:1 en los hover; 2,92:1 en el blanco sobre el CTA naranja; 3,35:1 y 3,15:1 para texto blanco sobre los temas plata y turquesa. Los temas alternativos de color agravan el problema porque comparten `--hf-text: #FFFFFF`.

**Tamaño de texto y controles, escalado. Parcial.** Texto de 10 y 11 px en abundancia (insignias, ayudas, pies de tarjeta) por debajo del mínimo recomendado para lectura sostenida; objetivos táctiles de 15-16 px de alto en la navegación de cabecera y ~20 px en los enlaces del pie, bajo el mínimo de 24x24 px de WCAG 2.2 (2.5.8). No hay prueba con zoom al 200% ni con reflujo a 320 px de ancho.

**Uso sin depender del color. Parcial.** El acierto y el error del miniquiz usan color **y** icono (correcto: `LessonPlayer.tsx:140`), pero en el aula sincronizada el estado de las opciones se comunica sobre todo por color, y el paso activo del sidebar solo por color.

**Mensajes comprensibles. Buen nivel.** El tono es claro y no punitivo ("Pista de Aprendizaje", "¡Excelente análisis!"). Problema: el mensaje de error del login revela la credencial de administrador en vez de orientar.

**WCAG 2.2 nivel AA. No alcanzable hoy.** Los incumplimientos verificados afectan a 1.1.1, 1.3.1, 1.4.3, 1.4.11, 2.1.1, 2.2.2, 2.4.3, 2.4.6, 2.4.7, 2.4.11, 2.5.8 y 4.1.2. **No afirmo conformidad ni disconformidad global** sin auditoría con herramientas y pruebas con usuarios; afirmo que estos criterios concretos no se cumplen en el código tal como está.

---

## 7. Rendimiento y estabilidad

**Medido**

- `tsc --noEmit`: exit 0, sin salida (compilación de tipos limpia).
- Vite 5.4.21 en desarrollo: arranque en 513 ms; `/` servido en ~320 ms (1.283 bytes).
- Transformaciones en desarrollo (milisegundos, primera vez, incluida compilación): `LandingPage.tsx` 83 ms (34 KB de fuente a 163 KB de JS), `HeroScrollScrubber.tsx` 137 ms, `AppContext.tsx` 1.097 ms, `main.tsx` 356 ms, `index.css` 73 ms (89.972 bytes de CSS compilado, con `animate-marquee` y sin `prefers-reduced-motion`).
- Activos: 151 frames WebP de 1280x720, 6.376.148 bytes (6,08 MiB); `public/logos` 20 archivos, 4,36 MB, con seis PNG de 4500x4500 px; `public/` completo 173 archivos, 10,43 MiB.

**No medido (no verificado, con prueba pendiente en el punto 14)**

- Tiempo de inicio percibido, LCP, CLS, INP: imposible sin navegador. Prueba pendiente: Lighthouse móvil con throttling 4G y CPU 4x sobre la build de producción.
- Memoria y CPU reales: no medidos. [Inferencia] el techo teórico de los 151 bitmaps es ~531 MiB y el de los seis PNG de marca ~463 MiB; la retención efectiva depende de la política de desalojo de cada navegador, así que son escenarios de techo, no observaciones.
- Rendimiento con grandes volúmenes: el único dataset grande (`neonCurriculum.json`, 2,1 MB) no está en uso. Si se importara tal cual, entraría completo al bundle. Prueba pendiente: medir el tamaño del bundle tras conectar `services/api.ts`.
- Comportamiento con múltiples usuarios o sesiones: el estado de lección es global en `localStorage` y se difunde por `BroadcastChannel` sin distinguir usuario; riesgo de interferencia entre pestañas del mismo equipo documentado en ERR-07, **no reproducido** con dos pestañas reales.
- Consumo de red y batería: no medido. El hero de 320vh con render por evento de scroll es el principal candidato a consumo.
- Recuperación tras errores: verificada por lectura, no en ejecución (ERR-01).

**Cuellos de botella identificados (por lectura, no por perfilado).** Precarga masiva del hero; render por evento de scroll con lectura de layout; escritura de `localStorage` y difusión completa en cada interacción del aula, duplicadas por `StrictMode`; filtrado completo del arreglo de 2,1 MB en cada llamada si se conecta `services/api.ts` sin memoización (`services/api.ts:6-21`); y el componente de 2.018 líneas que, si se monta, recalcula por render su arreglo de pasos y llama `calculateExamScore` dos veces.

---

## 8. Seguridad y privacidad

**Autenticación y sesiones. Rota por diseño.** No hay backend: `loginAsParent` compara cadenas en el cliente (`AppContext.tsx:203-231`) y la sesión es un objeto plano en `localStorage` sin firma, sin expiración, sin rotación y sin cierre por inactividad. `logout` solo borra la clave (`AppContext.tsx:233-237`). No hay cookies, ni `HttpOnly`, ni CSRF (tampoco aplica sin servidor), ni verificación en dos pasos, ni recuperación de contraseña.

**Autorización y permisos. No verificable como control.** Ver SEC-03 y SEC-05. El rol `admin` se obtiene con una credencial publicada; el rol `parent` desde una sesión de estudiante; el Aula es pública. La regla de autorización que sí existe (`AppContext.tsx:151-176`) es sorteada por dos llamadas directas a `setViewMode`.

**Protección de datos sensibles. Insuficiente.** Credenciales en claro en el navegador (SEC-04), datos de menores (nombre, curso, avatar) en `localStorage` sin cifrado ni aviso de privacidad visible, y captura de datos de tarjeta en un formulario simulado (UX-01). No hay política de retención, ni de borrado, ni forma de que el apoderado elimine sus datos.

**Validación de entradas. Ausente.** Sin Zod ni ninguna otra validación de esquema, pese a que `AGENTS.md` la exige; `types/index.ts` es solo tipado de compilación, no verificación de ejecución. Los formularios confían en `type="email"` del navegador.

**Inyección y exposición. Sin hallazgos de inyección.** No hay `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`, ni acceso a base de datos desde la SPA, ni comandos de shell. La superficie de XSS es nula hoy porque no se renderiza contenido de usuario; deja de serlo en cuanto llegue texto de una API (aulas, comentarios, nombres), y ahí el proyecto ya tiene la regla de validar con Zod y escapar por defecto.

**Abuso de APIs. No aplica hoy** (no hay API propia). El abuso relevante es de recursos: registrar cientos de `Image` (PERF-01) y bucles de animación infinita.

**Almacenamiento local y remoto. Todo local.** Siete claves en `localStorage` (`AppContext.tsx:43-82`) más la sesión de lección; sin cifrado, sin caducidad, sin control de tamaño, sin separación por usuario. El `prisma/dev.db` (2,6 MB) de la raíz es un SQLite local con el currículo; no contiene datos de usuarios según el esquema, pero conviene confirmarlo antes de compartir el workspace.

**Cifrado. No hay ninguno.** Ni en tránsito con origen propio (no hay backend) ni en reposo. Los PDFs y las fuentes se cargan por HTTPS de terceros.

**Secretos y variables de entorno. Es el hallazgo más grave.** SEC-01 y SEC-02. Los archivos `.env` existen en la raíz y en la app; el de la app está cubierto por `.gitignore` (`Web Studio Simple/.gitignore`), el de la raíz **no tiene `.gitignore` en la raíz** y no pude verificar su estado de versionado. Búsqueda exhaustiva: la contraseña de Neon aparece en `ingest_excel_to_neon.py:10` (único archivo de código con el secreto), y `admin123` aparece en `AppContext.tsx`, `LoginScreen.tsx` y dos archivos de `memoria/`.

**Registros y telemetría. Ausentes.** Solo dos `console.error` y un `console.warn`/`console.log`. No se registran datos personales en logs, lo cual es correcto, pero tampoco hay detección de errores ni trazabilidad.

**Servicios externos. Tres dependencias de terceros en el camino crítico de la interfaz.** Google Fonts (cuatro hojas, dos peticiones a dominios de Google por visita), un PNG de `lh3.googleusercontent.com` en el checkout, y contenido educativo de `curriculumnacional.cl` en un componente no usado. La privacidad de menores es un punto que conviene decidir conscientemente: cada visita expone IP y user-agent a Google. Recomendación: autoalojar las fuentes y el logo.

**Dependencias vulnerables.** Ver DEP-01, con fuentes públicas citadas. No ejecuté auditoría automatizada; queda como prueba pendiente.

**Copias de seguridad y recuperación. No existen.** No hay backup de base de datos (no hay datos de usuario en base), ni exportación del progreso, ni recuperación de cuenta. El progreso del alumno vive en un navegador concreto y se pierde al limpiarlo.

**Gestión de eliminación de datos. Parcial y sin confirmación.** Solo "Restaurar credenciales por defecto", que borra perfil y usuario y recarga. No hay eliminación de cuenta ni de progreso selectivo.

**Cumplimiento. No afirmo cumplimiento ni incumplimiento legal.** Señalo tres áreas que requieren revisión especializada: captura de datos de tarjeta en un formulario sin pasarela; publicación de testimonios con nombre y curso de personas identificables presentados como valoraciones de cinco estrellas (`LandingPage.tsx:294-361`), que si no son reales constituye publicidad engañosa; y tratamiento de datos de menores con persistencia local y sin política de privacidad visible, sin aviso de cookies ni base legal declarada.

---

## 9. Auditoría técnica

**Arquitectura. Adecuada para prototipo, sin capa de datos.** SPA de un solo paquete, sin backend, sin estado de servidor, sin router. El patrón es Context API (`AppContext`, `LessonSyncContext`) con componentes funcionales. La separación de la vista de lección (contexto, vistas de adulto y estudiante, tarjetas comunes) es la parte mejor estructurada del proyecto y sería la base correcta para el producto real.

**Organización de módulos. Correcta con solapamientos.** `components` por dominio (auth, checkout, landing, layout, lesson, parent, student, common), `context`, `data`, `services`, `types`. Problema: hay dos "motores" de lección (`lesson/SynchronizedLessonMaster` montado y `student/LessonEngine7th` + `LessonPlayer` sin montar), dos cabeceras y dos pies (uno inline, otro en componentes sin uso), y dos sistemas de tema (`ThemeCustomizerModal` sin uso y el menú de color del checkout). `services/api.ts` importa un JSON de 2,1 MB que nunca se usa.

**Separación de responsabilidades. Buena en el aula, mala en los dashboards.** Las vistas de lección reciben datos por contexto; en cambio `StudentDashboard` y `ParentDashboard` mezclan datos de currículo, diseño, estado de selección y lógica de progreso, y el progreso que muestran es literal.

**Calidad y legibilidad. Desigual.** El código del aula es claro y consistente. `LessonEngine7th.tsx` (2.018 líneas, con 431 líneas de currículo incrustado y un componente de ~1.485 líneas) es el principal problema de mantenibilidad del proyecto y, en el estado actual, no está en uso. Los comentarios de sección ayudan; los nombres son correctos.

**Duplicación. Alta en cuatro focos.** Cabecera y pie (landing frente a `Navbar`/`Footer`), `BRAND_COLORS` (dos copias), reglas de puntaje y aprobación (cuatro copias con divergencias), listado de OAs y tarjetas de lección (tres implementaciones).

**Gestión del estado. Apropiada pero frágil.** Context API es suficiente para el tamaño actual. Los problemas son de implementación: escritura en `localStorage` dentro del updater (`LessonSyncContext.tsx:97-108`), persistencia de credenciales, clave de sesión global sin separar por usuario, y ausencia de validación al restaurar.

**Manejo de errores. El punto más débil de la ingeniería.** Dos `try/catch` en todo el código, sin `ErrorBoundary`, sin estado de error en la interfaz, sin reintentos, y tres `JSON.parse` sin protección en el camino de arranque. Cualquier dato inesperado termina en pantalla blanca.

**Tipado. Bueno.** `strict: true` y el typecheck pasa. Puntos a mejorar: `noUnusedLocals` y `noUnusedParameters` desactivados, que ocultan código muerto; un `as NeonCurriculumItem[]` en `services/api.ts:4` que es una aserción no verificada sobre un JSON de 2,1 MB; y uso de `window as any` en `LessonEngine7th.tsx:617`.

**Dependencias. Mínimas y razonables.** React, React DOM, framer-motion (no se usa en las vistas montadas), lucide-react y Tailwind. En la raíz, Prisma y xlsx, que solo usan scripts locales. Sin problemas de lockfile. Actualizaciones pendientes y un aviso de vulnerabilidad sin verificar (DEP-01).

**Pruebas automatizadas. Cero.** Sin Vitest, sin Jest, sin pruebas ni archivos de prueba. La única verificación es `tsc --noEmit`, que no cubre lógica.

**Cobertura de casos críticos. Nula.** Puntaje, aprobación, recuperación, sincronización entre pestañas, restauración de estado y control de acceso son exactamente las áreas sin cobertura y donde están los defectos.

**Configuración de entornos. Inexistente.** Sin archivos de entorno por ambiente, sin validación de variables, sin build separada de desarrollo y producción (`vite build` produce una única salida), sin CI, sin Dockerfile, sin configuración de despliegue en el repositorio pese a que `AGENTS.md` declara Railway. El `dist` presente está cinco semanas por detrás del código.

**Mantenibilidad. Media-baja.** A favor: TypeScript estricto, componentes pequeños en el aula, tokens de diseño centralizados. En contra: código muerto voluminoso, duplicación, sin linter, sin pruebas, documentación que no coincide con el código y una base documental (`memoria/` con 68 archivos, `spec/` con una sola feature "Approved" que describe el stack equivocado) que da una falsa sensación de control.

**Escalabilidad.** El diseño actual no escala a múltiples usuarios porque no hay servidor: cada navegador es un universo. `prisma/schema.prisma` está declarado para `sqlite` (`schema.prisma:6`) mientras el `.env` apunta a Neon PostgreSQL, de modo que los scripts de Prisma fallarían o trabajarían sobre otra base. La SPA, con backend, escalaría sin cambios estructurales grandes.

**Observabilidad. Nula.** Sin telemetría, sin trazas, sin métricas, sin alertas.

**Facilidad de incorporación de nuevos desarrolladores. Baja.** No hay README (verificado: no existe en todo el workspace), no hay guía de arranque, no hay linter, no hay pruebas, el `dist` miente sobre la versión, la carpeta `CONOCIMIENTO` tiene 4.239 archivos, y hay siete componentes huérfanos. Un desarrollador nuevo no puede saber cuál de las dos implementaciones de lección es la vigente sin leer `App.tsx`.

**Relación con el producto.** El exceso de código sin conectar y la ausencia de backend producen el riesgo más caro: la interfaz afirma cosas que el sistema no hace (progreso, suscripción, notificaciones, conexión del estudiante, regeneración de PIN). Cada una de ellas es una promesa incumplida de cara al usuario y una trampa de mantenimiento.

---

## 10. Compatibilidad y calidad multiplataforma

**Navegadores.** Sin `browserslist` ni `@vitejs/plugin-legacy`; el build apunta a `target: ES2020` (`tsconfig.json:3`). Sin verificación en navegadores reales. Uso de `BroadcastChannel` con `try/catch` correcto (`LessonSyncContext.tsx:79-95`), lo que degrada sin sincronización en navegadores antiguos. Prueba pendiente: matriz Chrome, Edge, Firefox y Safari, incluida la ausencia de `BroadcastChannel`.

**Sistemas operativos y densidades.** La marca tipográfica usa `"Arial Rounded MT Bold"` con `!important` (`index.css:102,186`), fuente que **no existe en Android ni en Linux**, de modo que la identidad tipográfica se degrada al fallback del sistema precisamente en el dispositivo del estudiante. El canvas del hero usa `devicePixelRatio` sin límite, lo que en móviles de gama media produce buffers de render de varios megapíxeles por frame.

**Resoluciones.** Sin prueba de reflujo a 320 px ni con zoom al 200%. Elementos con altura mínima fija de 720 px en la vista del estudiante y barras de herramientas densas sugieren problemas en pantallas pequeñas, no verificados.

**Métodos de entrada.** Ratón y táctil cubiertos; teclado con los problemas del punto 6; sin soporte explícito para lápiz, sin gestos, sin atajos.

**Conexiones lentas o intermitentes.** Sin estrategia: seis hojas de fuentes externas, 6,08 MiB de frames precargados, sin `loading="lazy"` en las imágenes, sin estado de carga en el hero y sin reintentos. El primer contacto con el producto es el peor escenario posible en una conexión móvil chilena.

**Modo offline.** No existe. No hay service worker ni manifiesto PWA, pese a que `spec` describe la estrategia "Mobile-First (Progressive Web App)". Es la ausencia funcional más relevante para el nicho declarado (familias en casa, conexiones compartidas).

**Internacionalización.** No existe framework de i18n. Todo el texto está incrustado, con mezcla de idiomas dentro de un mismo flujo (curso en inglés en el checkout) y errores de tilde visibles. Los números de precio alternan CLP y USD sin criterio.

**Zonas horarias y formatos regionales.** Nada implementado: no hay fechas en la interfaz, no hay locales, no hay formatos de número ni de moneda. Sin riesgo actual, sin preparación futura.

**Instalación, actualización y desinstalación.** Sin proceso: no hay PWA, no hay versión visible en la interfaz, no hay aviso de nueva versión, no hay migración de datos locales. Una nueva versión que cambie el formato de `localStorage` rompería la sesión de los usuarios existentes (ERR-06: el estado no está versionado).

---

## 11. Producto y valor para el usuario

**Claridad del problema que resuelve. Alta.** El problema está bien identificado y es real: preparar los exámenes libres del MINEDUC exige temario, secuencia y práctica con formato formal, y la mayoría de las familias no tiene material propio. El enfoque de dos fases con el cuaderno físico como puente es un diferenciador con sentido y está implementado en el aula.

**Diferenciación. Potencial, hoy no demostrada.** Elementos diferenciadores reales en el código: sincronización mentor-estudiante entre dos dispositivos, separación de guion privado del mentor frente a vista del estudiante, pausas sensoriales, adaptación DUA y refuerzo no punitivo. Contraste: el material curricular disponible es **una sola clase** (Matemática 7° Básico OA1, con una segunda lección solo en `LessonEngine7th`, no montada) y el currículo cargado en `curriculumData.ts` cubre 9 OAs de un solo curso y asignatura. La promesa de la landing (3° a 8° básico, cinco asignaturas, temarios MINEDUC 2026) no está respaldada por el contenido existente.

**Funciones esenciales frente a secundarias.** Esenciales y ausentes o incompletas: cuentas reales, persistencia del progreso, contenido de más de una clase, ensayos completos, control de suscripción. Secundarias y muy desarrolladas: personalización de color de cabecera y pie (ocho opciones), temas visuales, botón flotante de acceso al aula, modal de visor de PDF que no se usa, motor de lección de 2.018 líneas desconectado. El esfuerzo está invertido respecto al valor.

**Fricciones que provocan abandono.** (1) La primera visita carga 6,38 MB antes del primer scroll. (2) El hero no da señal de progreso. (3) Tras el checkout, el usuario cree haber comprado y no tiene cuenta ni acceso coherente (el PIN que se le muestra es el de la demo). (4) Tras una recarga en el aula con la clase pausada, el alumno queda en un callejón sin salida. (5) El panel del apoderado promete analítica y muestra ceros y "1 / 9" fijos, lo que destruye la confianza en la primera sesión.

**Oportunidades de automatización.** Generación de ensayos y corrección desde el currículo ya cargado (`neonCurriculum.json` tiene descripción de OA, indicadores de evaluación, errores frecuentes y actividades por nivel de Bloom, y no se usa en ninguna parte); planificación automática de calendario a partir de las fechas de los exámenes libres; recordatorios al apoderado; y un informe de progreso exportable. La pieza con mayor retorno inmediato es conectar ese JSON al panel del apoderado, porque el dato ya existe y está estructurado.

**Retención y recurrencia de uso. Sin bases.** No hay notificaciones, ni racha efectiva (`currentStreakDays` es un campo de mock que nunca se actualiza), ni correo, ni recordatorios, ni progreso persistente por usuario. La gamificación existe como concepto (puntos de curiosidad y gemas) pero se bonifica sin control: responder el mismo quiz repetidamente suma 20 puntos cada vez (`LessonPlayer.tsx:56-59`, en un componente sin uso) y no hay nada que consuma esos puntos.

**Indicadores que deberían medirse.** Activación (familia que abre la primera clase el mismo día del registro), tiempo hasta la primera clase completada, tasa de finalización de los pasos del aula, abandonos por paso (para detectar el callejón de `paused`), errores del cliente por vista, porcentaje de sesiones en que el estudiante se conecta desde otro dispositivo, retención semanal por familia y conversión de la landing al checkout. Hoy no se mide ninguno.

**Monetización (recomendaciones separadas del análisis técnico).** El modelo de precios actual es incoherente con su propio material (USD 49 y 499 frente a un mercado chileno) y con la realidad del contenido (una clase). Antes de cobrar, el orden correcto es: contenido suficiente para un OA completo de una asignatura, cuentas reales con progreso persistente y una pasarela de pago de verdad. Consideraciones de modelo, sin afirmar preferencia: la prueba de 7 días ya existe como concepto en la interfaz y encaja con una captura de correo sin fricción; el enfoque freemium descrito en `AGENTS.md` (plantillas de cuaderno gratuitas y resoluciones en vídeo tras registro) es coherente con el producto físico y no necesita la pasarela para empezar; el cobro anual debería alinearse con el ciclo de los exámenes libres.

**Riesgos de ampliar el alcance sin validar la demanda.** El repositorio muestra exactamente ese patrón: ocho opciones de color de cabecera, tres sistemas de tema, dos implementaciones de lección, un visor de PDF del MINEDUC completo y sin conectar, y un motor de 2.018 líneas con arrastrar y soltar, DUA, termómetro emocional y exámenes, todo escrito antes de tener un solo usuario con cuenta. Recomendación: congelar la personalización visual y el material nuevo hasta cerrar el ciclo mínimo (cuenta, progreso, una clase completa, métrica de activación).

---

## 12. Operación y mantenimiento

**Despliegue. No verificable y sin configuración en el repositorio.** No hay `Dockerfile`, `railway.json`, `Procfile`, `nixpacks.toml`, workflows de CI ni documentación de despliegue (verificado por búsqueda). `AGENTS.md` declara Railway y PostgreSQL Neon, y existe la credencial de Neon, pero **no puedo verificar que la aplicación esté desplegada, ni en qué URL, ni con qué artefacto**. El único artefacto local (`dist`) es del 25-07-2026 mientras el código es del 31-08-2026.

**Versionado. Débil.** `package.json` declara `version: 1.0.0` sin uso posterior; no hay etiquetas ni changelog; la aplicación no muestra su versión; no pude verificar el historial de Git (los directorios `.git` no contienen `HEAD`).

**Copias de seguridad. Inexistentes para el producto.** No hay respaldo de la base Neon documentado, ni exportación del progreso del alumno. El único dato de usuario está en el navegador del usuario y no tiene respaldo.

**Monitorización y alertas. Inexistentes.** Sin telemetría, sin monitor de disponibilidad, sin alertas de error, sin seguimiento de rendimiento.

**Gestión de incidencias. Sin proceso.** No hay plantilla de incidencia, canal de soporte operativo ni registro de incidentes. La FAQ menciona soporte por correo y WhatsApp que el pie no enlaza correctamente (ver UX-02).

**Registro de cambios. Parcial y no fiable.** `memoria/` tiene 68 archivos de sesión con decisiones útiles, pero al menos uno describe funcionalidad que no existe (regeneración de PIN en el panel del apoderado) y `spec/features/001_feature/reconcile.md` afirma que todo el código coincide al 100% con la especificación, lo que hoy no es cierto.

**Soporte a usuarios. Sin definir.** No hay centro de ayuda, ni formulario de contacto funcional, ni preguntas frecuentes sobre credenciales y acceso, que es donde más consultas habría con un login de demo.

**Documentación. Abundante y desalineada.** Bien: `memoria/` es un registro honesto y detallado del trabajo de diseño. Mal: no hay README (el punto de entrada para cualquier persona nueva), `spec/constitution/tech-stack.md` declara "HTML + CSS" y Vitest, y `spec/features` tiene una única feature "Approved" cuyo requisito funcional RF-001 es un volcado del prompt original repetido cuatro veces, sin criterios verificables.

**Plan de recuperación ante fallos. Inexistente.** Sin procedimiento de reversión, sin entorno de pruebas separado, sin respaldo previo a despliegues, sin plan de contingencia si Neon o Railway fallan.

**Proceso de publicación. Inexistente.** No hay CI que ejecute el typecheck, no hay linter, no hay pruebas, no hay revisión automatizada. La única barrera es `tsc`, con `noUnusedLocals` desactivado.

---

## 13. Matriz de mejoras

Prioridad según impacto, urgencia, esfuerzo, riesgo y dependencia. P0 = antes de cualquier uso por terceros; P1 = primeras cuatro semanas; P2 = siguiente trimestre; P3 = cuando haya usuarios reales.

| ID | Área | Problema u oportunidad | Evidencia | Mejora propuesta | Impacto | Esfuerzo | Riesgo | Prioridad | Criterio de finalización |
|---|---|---|---|---|---|---|---|---|---|
| SEC-01 | Seguridad | Credenciales de admin, apoderado y PIN hardcodeadas y visibles en la interfaz | `AppContext.tsx:205`; `LoginScreen.tsx:251-278`; `mockData.ts:12,19` | Retirar del cliente, condicionar la demo a entorno de desarrollo y consumir valores de entorno; autenticación real en servidor | Muy alto | S / L | Bajo | P0 | Build sin las cadenas de credenciales; login de admin falla con valor aleatorio |
| SEC-02 | Seguridad | Contraseña de Neon en claro en el repositorio | `ingest_excel_to_neon.py:10`; `.env` de raíz y app | Rotar la credencial, leer de entorno, añadir `.gitignore` raíz, revisar exposición histórica | Muy alto | S | Bajo | P0 | Sin secreto en código; credencial antigua invalidada |
| SEC-03 | Seguridad | Autorización de cliente evadible y guard de rol sorteado | `App.tsx:38-39`; `AppContext.tsx:151-176`; `AdultHeader.tsx:16`; `TesterBar.tsx:17` | Usar `navigateWithAuth`, exigir rol en `App.tsx` y mover la decisión a servidor | Alto | S / L | Medio | P0 | Ningún camino a `parent` sin rol; sesión manipulada sin efecto |
| SEC-04 | Privacidad | Contraseña y PIN en texto plano en el navegador | `AppContext.tsx:47-59,89-95` | No persistir credenciales; guardar solo identificador de sesión | Alto | M | Medio | P0 | `localStorage` sin `password` ni `pin` |
| SEC-05 | Seguridad | Aula Sincronizada sin autenticación | `App.tsx:17-19,24-33` | Exigir sesión para `viewMode === 'lesson'` y retirar el botón flotante global | Alto | S | Bajo | P0 | Sin sesión no hay acceso al aula |
| ERR-01 | Errores | Arranque sin protección y sin `ErrorBoundary` | `AppContext.tsx:50,57,63` | `try/catch` con valores por defecto y barrera de error con restablecimiento | Alto | S | Bajo | P0 | Datos corruptos no producen pantalla en blanco |
| UX-01 | Producto | Checkout simulado con campos de tarjeta y éxito garantizado | `CheckoutFlow.tsx:236-333` | Retirar campos de pago y marcar como demo; capturar correo; pasarela después | Alto | S / L | Medio | P0 | No existe captura de tarjeta en la interfaz publicada |
| ERR-02 | Errores | Estado `paused` persistido sin salida | `AdultLessonView.tsx:687-694,895-909`; `LessonSyncContext.tsx:59-71` | Botón "Retomar" con el estado guardado y reinicio con confirmación | Alto | S | Bajo | P0 | Pausar, recargar y continuar sin perder progreso |
| SEC-07 | Seguridad | Estudiante puede abrir la vista del mentor y reiniciar la sesión | `SynchronizedLessonMaster.tsx:13-16`; `TesterBar.tsx:31-64,111-119` | `TesterBar` solo en el host; reinicio con confirmación | Alto | S | Bajo | P0 | En `mode=student` no hay barra ni reinicio |
| TEC-01 | Calidad | Lint inejecutable y sin pruebas | `Web Studio Simple/package.json:9-10` | Configurar ESLint (`typescript-eslint`, hooks, jsx-a11y) y Vitest | Alto | S / M | Bajo | P1 | `npm run lint` y `npm test` devuelven 0 ejecutando pruebas |
| TEC-02 | Mantenibilidad | Siete componentes huérfanos y capa de datos sin usar | `LessonEngine7th.tsx` (115 KB); `services/api.ts` + `neonCurriculum.json` (2,1 MB) | Decidir por archivo: cablear o eliminar; integrar o retirar la capa de datos | Alto | M | Medio | P1 | Todo módulo de `src` tiene consumidor o no existe |
| ERR-03 | Errores | Puntaje y aprobación duplicados con criterios divergentes | `AdultLessonView.tsx:606,708-717`; `StudentRecoveryView.tsx:8-17` | Extraer funciones puras compartidas y cubrirlas con pruebas | Alto | M | Medio | P1 | Veredicto idéntico en ambas vistas, con casos límite probados |
| ERR-04 | Errores | Miniquiz acoplado a 3 respuestas | `StudentMiniquizView.tsx:14` | Comparar contra `lessonData.quiz.questions.length` | Medio | S | Bajo | P1 | Lección de 4 preguntas permite enviar y puntuar |
| A11Y-01 | Accesibilidad | Elementos invisibles enfocables y foco invisible | `HeroScrollScrubber.tsx:160-239`; `LandingPage.tsx:374-404` | `invisible`/`inert` más `aria-hidden`; restaurar `focus-visible` | Alto | S | Bajo | P1 | Recorrido completo con Tab sin foco perdido |
| A11Y-02 | Accesibilidad | Contraste 1,53:1 a 2,92:1 en cabecera, pie y CTA | `LandingPage.tsx:46,424`; `Footer.tsx:28-54` | Usar `--hf-text` o `#0A192F` sobre amarillo y revisar los ocho temas | Alto | S | Bajo | P1 | Todos los pares por encima de 4,5:1 |
| A11Y-03 | Accesibilidad | Modales sin rol, Escape, foco ni bloqueo de scroll | `StudentDashboard.tsx:255-315`; `PdfViewerModal.tsx:81-183` | Diálogo accesible completo | Medio | S | Bajo | P1 | Escape cierra y el foco retorna al origen |
| A11Y-04 | Accesibilidad | Sin ARIA ni región viva en el aula | `Cards.tsx:69-91`; `TesterBar.tsx:31-64` | `role="status" aria-live`, `aria-pressed`, `aria-current` | Medio | S | Bajo | P1 | El lector anuncia aciertos y cambios de paso |
| A11Y-05 | Accesibilidad | Movimiento infinito sin `prefers-reduced-motion` | `index.css:194-208`; `HeroScrollScrubber.tsx:147,178` | Consulta de movimiento reducido que detenga animaciones y scrubbing | Medio | S | Bajo | P1 | Con la preferencia activa no hay animación perpetua |
| PERF-01 | Rendimiento | 151 frames (6,08 MiB) precargados y retenidos | `HeroScrollScrubber.tsx:5,22-53` | Carga por tramos, bajo demanda y ventana de vecinos; `dpr` máximo 2 | Alto | M | Medio | P1 | Menos de 1 MB antes del primer scroll, sin picos de memoria |
| PERF-02 | Rendimiento | PNG de 4500x4500 a tamaño de icono | `LandingPage.tsx:30-34,473-519` | Reexportar a 2x del tamaño de uso en WebP y archivar el resto | Alto | S | Bajo | P1 | Los seis archivos por debajo de 60 KB cada uno |
| PERF-04 | Rendimiento | Cuatro hojas de fuentes externas, tres sin uso, y font-display duplicado | `index.html:10-13`; `index.css:1-2` | Eliminar las no usadas, una sola declaración de iconos, autoalojar la fuente de marca | Medio | S | Bajo | P1 | Una sola petición de fuentes y misma tipografía en Android |
| DATA-01 | Producto | Selectores que no filtran y progreso literal | `ParentDashboard.tsx:35-36,73-105,250,346,359,372` | Conectar selectores al currículo y derivar el progreso del estado real | Alto | M | Medio | P1 | Cambiar de curso cambia el contenido; el progreso refleja datos |
| DATA-02 | Producto | Contenido de lección hardcodeado en las vistas | `StudentLessonView.tsx:54,84,192-207,308`; `AdultLessonView.tsx:115` | Mover los literales a `LessonData` | Alto | M | Medio | P1 | Una segunda lección muestra su propio contenido |
| SEC-08 | Seguridad | Login sin límite de intentos sobre PIN de 6 dígitos | `LoginScreen.tsx:13-37,187-201` | Límite por sesión, retardo progresivo y, en servidor, bloqueo | Medio | S / M | Bajo | P1 | 20 intentos fallidos bloquean temporalmente |
| SEC-11 | Privacidad | Documento interno servido sin autenticación | `public/OA01_...docx` | Mover fuera de `public/` y servir con control de acceso | Medio | S | Bajo | P1 | Ningún documento interno en `public/` |
| OPS-01 | Operación | Artefacto de build desactualizado y sin canal de despliegue | `dist/` del 25-07 frente a `src` del 31-08 | Regenerar antes de publicar, no versionar artefactos y documentar el despliegue | Alto | S | Bajo | P1 | Artefacto publicado trazable a un commit |
| ERR-06 | Errores | Estado restaurado sin validar y accesos sin guardas | `LessonSyncContext.tsx:59-71,83-87`; `AdultLessonView.tsx:328-332` | Validación con Zod, clave por lección y fallback a `items[0]` | Alto | M | Medio | P1 | Estado corrupto muestra estado vacío, no pantalla blanca |
| ERR-07 | Errores | Escrituras y difusión dentro del updater con StrictMode | `LessonSyncContext.tsx:97-108` | Mover efectos a `useEffect` y difundir solo el parche | Medio | S | Bajo | P1 | Una acción, una escritura; respuestas no se pierden |
| NAV-01 | UX | Sin router ni URLs por vista | `AppContext.tsx:136-148` | Router ligero con rutas protegidas | Medio | M | Medio | P2 | Atrás y adelante navegan; cada vista tiene URL |
| ERR-05 | Errores | Examen sin reintento y estado no reiniciado | `LessonEngine7th.tsx:655-656,766-773,1833` | Reinicio en cambio de asignatura y botón de reintento | Medio | S | Bajo | P2 | Examen limpio tras cambiar de asignatura |
| ERR-08 | Producto | Indicadores que afirman estados no medidos | `AdultHeader.tsx:46-49`; `StudentLessonView.tsx:109-119` | Conectar al estado real o etiquetar como demo | Medio | M | Medio | P2 | El indicador reacciona a desconexión real |
| SEC-10 | Privacidad | Datos de menores y sesión global en `localStorage` | `AppContext.tsx:89-95`; `LessonSyncContext.tsx:6` | Minimizar datos, aislar por usuario y ofrecer borrado | Medio | M | Medio | P2 | Claves por usuario y borrado explícito disponible |
| FP-01 | Producto | Checkout sin validación, curso en inglés y precios en USD | `CheckoutFlow.tsx:23-27,223-235,372,377` | Validar, vaciar y localizar a español de Chile y CLP | Medio | S | Bajo | P2 | Formulario vacío, validado y localizado |
| UX-02 | UX | Enlaces rotos y favicon ausente | `LandingPage.tsx:460-463`; `Footer.tsx:77-80`; `index.html:5` | Retirar o publicar enlaces reales; añadir favicon | Medio | S | Bajo | P2 | Sin anclas inexistentes y favicon con 200 |
| UX-03 | UX | Hero sin estado de carga ni de error | `HeroScrollScrubber.tsx:17-18,42-50,147-154` | Mostrar progreso y fallback estático | Medio | S | Bajo | P2 | Con red lenta se ve progreso; con fallo se ve contenido |
| PERF-03 | Rendimiento | Un render por evento de scroll | `HeroScrollScrubber.tsx:109-139` | Progreso en `useRef`, barra por CSS, estado solo para fases | Medio | M | Medio | P2 | Sin render por evento de scroll |
| PERF-05 | Diseño | Clases Tailwind y tokens CSS inexistentes | `HeroScrollScrubber.tsx:243`; `LandingPage.tsx:24`; `Footer.tsx:36,63,75` | Sustituir por utilidades válidas y definir tokens | Bajo | S | Bajo | P3 | Las clases se emiten en el CSS |
| TEC-04 | Gobernanza | Documentación que no coincide con el código | `memoria/2026-07-26_14-41...md:21`; `spec/constitution/tech-stack.md` | Reconciliar `spec` y `memoria` con el estado real | Medio | S | Bajo | P2 | Documentación verificable contra el código |
| TEC-03 | Calidad | Sin pruebas de lógica crítica | verificado, sin archivos de prueba | Vitest con cobertura de puntaje, aprobación y restauración | Alto | M | Bajo | P1 | Umbral mínimo de cobertura en módulos de puntaje |
| DEP-01 | Dependencias | Avisos de vulnerabilidad sin evaluar | `package.json:23`; `Web Studio Simple/package.json` | Auditoría en CI, actualizar Vite y `xlsx` y revisar alcance | Medio | S | Bajo | P1 | `npm audit` sin avisos altos |
| OPS-02 | Operación | Sin observabilidad ni gestión de incidencias | `LessonSyncContext.tsx:67,104` únicos | Captura de errores con contexto, changelog e incidencias | Medio | M | Medio | P2 | Errores visibles con versión y ruta |
| A11Y-06 | Accesibilidad | Jerarquía de encabezados, `alt` duplicado y objetivos táctiles | `LandingPage.tsx:418,472-487`; `Footer.tsx:36,75,90-105` | `h3`, `alt=""`, padding en enlaces | Bajo | S | Bajo | P3 | Navegación por encabezados sin saltos |

---

## 14. Plan de pruebas

Sin herramientas de prueba instaladas, cada caso se ejecuta manualmente hoy. Se indica prioridad (P0 a P2) y criterio de aprobación.

### Pruebas de funciones principales

| ID | Caso | Datos de prueba | Pasos | Resultado esperado | Prio | Aprobación |
|---|---|---|---|---|---|---|
| F-01 | Login de estudiante | PIN 123456 y PIN 111111 | Ingresar ambos | Entra con el correcto, error claro con el incorrecto | P0 | Ambos casos responden como se espera |
| F-02 | Login de apoderado | Correo y contraseña demo | Ingresar | Entra al panel del apoderado | P1 | Acceso correcto, error genérico en caso contrario |
| F-03 | Recorrido completo del aula | Lección 1 OA1 | Cubrir los ocho pasos y cerrar | Se completan todos los pasos y se llega al cierre | P0 | Sin bloqueos ni callejones sin salida |
| F-04 | Sincronización entre pestañas | Dos ventanas con `?mode=adult` y `?mode=student` | Responder en el estudiante y observar el mentor | El mentor ve las respuestas y el resultado | P0 | Estado consistente en ambas ventanas |
| F-05 | Miniquiz con 4 preguntas | Lección de prueba | Responder las cuatro y enviar | El botón se habilita y el puntaje es correcto | P1 | Se puede enviar y puntuar |
| F-06 | Pausa y retorno | Estado en miniquiz | Pausar, recargar, retomar | Se retoma en el punto guardado | P0 | El avance se conserva |

### Regresión y límites

| ID | Caso | Datos | Resultado esperado | Prio |
|---|---|---|---|---|
| R-01 | Typecheck | Todo el proyecto | `tsc --noEmit` exit 0 | P0 |
| R-02 | Arranque con `localStorage` corrupto | `{` en las cuatro claves | Carga con valores por defecto y ofrece restablecer | P0 |
| R-03 | Índice fuera de rango | `conversationIndex: 99` inyectado | Estado vacío controlado, sin pantalla blanca | P0 |
| R-04 | Refuerzo con cero preguntas | `passScoreMin` mayor que el total | No declara aprobado ni muestra "0 / 0" | P1 |
| R-05 | Dos usuarios en el mismo equipo | Dos perfiles en el mismo navegador | No comparten progreso (hoy falla: documentar) | P1 |
| R-06 | Cambio de asignatura tras evaluar | En el motor de lección | Examen limpio y sin `NaN%` | P2 |

### Accesibilidad

| ID | Caso | Método | Criterio | Prio |
|---|---|---|---|---|
| A-01 | Recorrido por teclado de la landing | Tab de inicio a fin | Foco siempre visible, sin elementos invisibles activables | P1 |
| A-02 | Acordeón de FAQ | Tab y Enter | Foco visible y apertura correcta | P1 |
| A-03 | Modales del portal | Tab, Escape | Foco contenido, Escape cierra, foco retorna | P1 |
| A-04 | Contraste de los ocho temas | Cálculo o herramienta | Todo texto sobre 4,5:1 | P1 |
| A-05 | Zoom 200% y reflujo 320 px | Navegador | Sin pérdida de contenido ni scroll horizontal | P2 |
| A-06 | Lector de pantalla en el aula | NVDA o VoiceOver | Aciertos, errores y cambios de paso se anuncian | P1 |
| A-07 | Movimiento reducido | Preferencia del sistema | Sin animaciones infinitas ni scrubbing | P2 |

### Rendimiento

| ID | Caso | Método | Criterio | Prio |
|---|---|---|---|---|
| P-01 | Carga inicial en móvil | Lighthouse con 4G y CPU 4x | Tras la mejora, menos de 1 MB antes del primer scroll; LCP bajo 2,5 s | P1 |
| P-02 | Recorrido completo del hero en gama media | Perfil de memoria del navegador | Sin recarga de pestaña ni caída de frames sostenida | P1 |
| P-03 | Peso de activos | Medición de red | `public/logos` bajo 300 KB; un solo dominio de fuentes | P1 |
| P-04 | Interacciones del aula | Grabación de rendimiento | Sin escrituras o mensajes duplicados por acción | P1 |
| P-05 | Currículo de 2,1 MB conectado | Build y medición | Bundle bajo el presupuesto acordado y filtrado memoizado | P2 |

### Seguridad y privacidad

| ID | Caso | Método | Criterio | Prio |
|---|---|---|---|---|
| S-01 | Secretos en artefactos | Búsqueda en `dist` y en el repositorio | Sin credenciales ni cadenas de conexión | P0 |
| S-02 | Evasión de rol | Ruta directa y `localStorage` manipulado | Sin acceso al panel del apoderado | P0 |
| S-03 | Acceso al aula sin sesión | URL y botones | Requiere autenticación | P0 |
| S-04 | Fuerza bruta de PIN | 50 intentos | Bloqueo temporal tras el umbral | P1 |
| S-05 | Auditoría de dependencias | Herramienta en CI | Sin avisos altos sin resolver | P1 |
| S-06 | Renderizado de contenido externo | Datos con etiquetas y comillas | Texto escapado, sin ejecución | P2 (al conectar API) |

### Compatibilidad, recuperación y volumen

| ID | Caso | Método | Criterio | Prio |
|---|---|---|---|---|
| C-01 | Matriz de navegadores | Chrome, Edge, Firefox, Safari | Funciona; sin `BroadcastChannel` degrada sin error | P2 |
| C-02 | Offline y red intermitente | DevTools offline y 3G | Sin cuelgue; mensaje claro | P2 |
| C-03 | Recuperación tras error | Error provocado en un componente | La barrera muestra alternativa y permite restablecer | P0 |
| D-01 | Datos inválidos | Currículo con campos vacíos y `null` | Sin `NaN`, sin `undefined` en pantalla | P1 |
| D-02 | Volumen alto | Currículo completo de 3° a 8° básico | Listas usables con búsqueda y paginación | P2 |

---

## 15. Hoja de ruta

### Correcciones críticas (bloqueantes, antes de que la aplicación vea un tercero)

1. SEC-02: rotar la contraseña de Neon y sacarla del código, con `.gitignore` en la raíz.
2. SEC-01: retirar credenciales del cliente; decidir si la demo se marca como tal.
3. SEC-03 y SEC-05: cerrar el aula a usuarios anónimos, exigir rol en las vistas y usar `navigateWithAuth`.
4. SEC-04: dejar de persistir contraseña y PIN.
5. ERR-01: `try/catch` en los `JSON.parse` y `ErrorBoundary` raíz.
6. ERR-02 y SEC-07: salida del estado `paused` y ocultar `TesterBar` al estudiante.
7. UX-01: retirar los campos de tarjeta del flujo público.

Dependencias: 3 depende de 2 (si se retira la demo, cambia qué se puede abrir); 7 depende de la decisión de producto sobre el checkout.

### Primeros 7 días

8. TEC-01: ESLint y Vitest operativos, con las funciones puras de puntaje extraídas y probadas (ERR-03).
9. OPS-01: regenerar el artefacto de build y documentar cómo se despliega.
10. A11Y-01 y A11Y-02: fases invisibles, foco visible y contraste de cabecera y pie.
11. PERF-02 y PERF-04: reexportar logos y limpiar las fuentes externas.
12. SEC-11 y UX-02: retirar el documento interno de `public/` y arreglar enlaces y favicon.
13. ERR-06 y ERR-07: validar el estado restaurado, clave por lección y efectos fuera del updater.

Dependencias: 8 habilita verificar el resto; 13 depende de 8 para tener red de seguridad.

### Primeros 30 días

14. SEC-08 y SEC-09: límite de intentos, bloqueo temporal y PIN criptográfico; exponer o eliminar la regeneración de PIN y corregir `memoria`.
15. PERF-01: carga por tramos del hero y ventana de imágenes, con `dpr` limitado.
16. DATA-02: mover el contenido de las vistas a `LessonData`.
17. DATA-01: conectar los selectores de curso y asignatura al currículo y derivar el progreso.
18. A11Y-03, A11Y-04 y A11Y-05: modales accesibles, regiones vivas y movimiento reducido.
19. SEC-10: aislar datos por usuario y ofrecer borrado.
20. NAV-01: router con rutas protegidas.

Dependencias: 17 depende de 16; 20 depende de 3.

### Próximos 90 días

21. Backend mínimo (autenticación, cuentas, progreso persistente) sobre Neon, resolviendo el desajuste entre `prisma/schema.prisma` (sqlite) y el `.env` (PostgreSQL), y sustituyendo la autorización de cliente.
22. TEC-02: cablear o eliminar los siete componentes huérfanos y decidir el destino de la capa de datos local.
23. Conectar `neonCurriculum.json` al panel del apoderado como base del progreso real y del temario, con filtrado memoizado.
24. Pasarela de pago real (si la validación de demanda la justifica) y eliminación definitiva del checkout simulado.
25. OPS-02 y OPS-01: observabilidad, incidencias, changelog, CI con typecheck, lint y pruebas.
26. PWA con modo offline y migración versionada del almacenamiento local.

### Mejoras estratégicas posteriores

27. Ensayos completos por OA y calificación con formato MINEDUC, generados desde el currículo cargado.
28. Panel del apoderado con analítica real, planificación de calendario y exportación de informes.
29. Internacionalización y localización regional, con formato de moneda y fechas.
30. Accesibilidad auditada con herramientas y con usuarios del segmento neurodivergente, con objetivos WCAG 2.2 AA verificados.
31. Contenido para las cinco asignaturas y los seis cursos antes de ampliar precios.

**Orden recomendado y dependencias clave.** Las correcciones críticas primero, y entre ellas SEC-02 antes de cualquier otra (una credencial expuesta se resuelve rotando, no reescribiendo código). Después, la red de seguridad (TEC-01) antes de tocar la lógica del aula, porque los defectos de puntaje y estado no son verificables sin pruebas. La accesibilidad y el rendimiento de la landing pueden avanzar en paralelo porque no comparten archivos con la refactorización del aula. El backend (21) debe esperar a que los contratos de datos estén definidos (16 y 17), y la pasarela de pago (24) a que existan cuentas reales.

---

## 16. Informe final

**Qué es.** StudioSimple - Antigravity es un prototipo de SPA educativa de cliente puro para preparar exámenes libres del MINEDUC en Chile, con una landing de marketing ya cuidada, un portal de estudiante, un panel de apoderado y un aula sincronizada entre el mentor y el alumno. Toda la lógica relevante vive en el navegador.

**Estado.** Compila limpio y arranca correctamente; la base técnica (React, TypeScript estricto, Tailwind con tokens, separación de la vista de lección) es aprovechable. El producto, en cambio, está en fase de prototipo o demo interna: sin backend, sin cuentas reales, sin persistencia, sin pruebas, sin linter, sin observabilidad, con credenciales publicadas, con un checkout que no cobra y con la mayor parte del código curricular sin conectar.

**Hallazgos reproducibles.** Los más importantes están detallados en el punto 4: dos críticos (credenciales en el cliente y cadena de conexión de Neon en el repositorio), diez altos (autorización evadible, credenciales en `localStorage`, aula pública, respuestas en el bundle, arranque sin protección de errores, callejón sin salida de `paused`, estudiante con acceso a la vista del mentor, puntaje divergente, miniquiz de tres respuestas, hero y logos de peso excesivo, accesibilidad de foco y contraste), veinticuatro medios y ocho bajos.

**Riesgos pendientes.** El rol admin es la única vulnerabilidad explotable de forma remota y hoy está publicado. Los riesgos de datos se concentran en la captura de tarjeta en un formulario simulado y en la persistencia de credenciales y datos de menores en el navegador. Los riesgos de negocio son de credibilidad: la interfaz afirma progreso, suscripción y notificaciones que no existen, y presenta testimonios y precios sin respaldo verificable.

**Evaluación de UX y accesibilidad.** La landing comunica bien y el aula está bien jerarquizada; el producto falla en onboarding, navegación con historial, estados de carga y error, prevención de acciones destructivas y en la accesibilidad del foco y del contraste, con incumplimientos concretos de WCAG 2.2 AA que no puedo generalizar sin auditoría especializada.

**Evaluación técnica.** Arquitectura adecuada para prototipo y no para producción: sin capa de datos, sin router, sin validación de esquemas, sin pruebas, sin linter operativo, con ~180 KB de código muerto (incluido el archivo más grande del proyecto), duplicación en cuatro focos y tres `JSON.parse` desprotegidos en el arranque.

**Evaluación de seguridad y privacidad.** No hay control de acceso real. La aplicación no envía datos a ningún backend propio, lo cual limita el daño actual, pero publica secretos, guarda credenciales en claro en el navegador, pide datos de tarjeta sin pasarela y hace depender de Google cuatro peticiones por visita para tipografías e imágenes.

**Evaluación de rendimiento.** Lo medido está bien (arranque del servidor de desarrollo en 513 ms, transformaciones de milisegundos, ~90 KB de CSS compilado). Lo que no está medido es el rendimiento percibido, y las señales estáticas son claras: 6,08 MiB de frames precargados, PNG de 4500x4500 para iconos, un render por evento de scroll y escrituras de `localStorage` duplicadas por `StrictMode`.

**Elementos no verificados (lista explícita).** Despliegue en Railway y URL de producción; configuración y cabeceras reales de los servicios externos; comportamiento en navegador (render, foco, consola, memoria, red, LCP, CLS); accesibilidad con lector de pantalla y con usuarios; contenido gráfico de los PNG; historial de Git y si algún `.env` estuvo versionado; resultado de una auditoría automatizada de dependencias; y el comportamiento real del aula con dos dispositivos. Cada uno tiene su prueba definida en el punto 14. También queda fuera de esta auditoría el contenido de las carpetas `CONOCIMIENTO` (4.239 archivos), `TEMARIOS EELL` y `Base-Excel`, que no revisé y que podrían contener material o datos que conviene clasificar antes de compartir el workspace.

**Recomendación final sobre el siguiente paso.** Rotar la credencial de Neon y retirar del cliente las credenciales publicadas, y en la misma sesión de trabajo decidir y dejar escrito qué es este artefacto: si es una demo, se rotula como tal y se cierra el acceso al aula y el checkout; si va a ser producto, el siguiente paso no es más interfaz, es un backend mínimo de cuentas y progreso sobre Neon. Todo lo demás (rendimiento del hero, accesibilidad, orden del código) se puede y se debe corregir en paralelo, pero ninguna de esas mejoras cambia el hecho de que hoy la aplicación no puede distinguir de forma confiable a un apoderado de un estudiante, ni recordar el progreso de nadie.
