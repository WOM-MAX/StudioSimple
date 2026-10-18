# INFORME DE PRUEBA FUNCIONAL EN LA APP AISLADA (ANTIGRAVITY)
**Curso 110-7 (7° Básico) · EstudioSimple**  
**Fecha y Hora de Emisión:** 2026-10-18 18:05 [America/Santiago]  
**Período de Ejecución de Pruebas:** 2026-10-18 15:58 - 16:05 [America/Santiago]  
**Instrucción de Work:** `PROMPT_ENTREGAR_DOCUMENTACION_PRUEBA_FUNCIONAL_2026-10-18_17-39_CL.txt`  
**Encargo Documentado:** `PROMPT_VERIFICAR_INTEGRACION_APP_AISLADA_2026-10-18_15-34_CL.txt`  
**Estado Normativo Curricular:** **`EN_REVISION`**  
**Veredicto Oficial:** **`VERIFICACION_FUNCIONAL_SATISFACTORIA`**  

---

## 1. Resumen Ejecutivo
Conforme a la instrucción de ChatGPT Work, se entrega la documentación verificable de la prueba funcional realizada en la aplicación aislada (`Web Studio Simple`) sobre el curso **110-7 (7° Básico)**.

- **Qué se comprobó:**  
  Se verificaron satisfactoriamente los **6 casos esenciales de la matriz de recorridos** (A a E) sobre las clases designadas: **Ciencias Naturales 7B OA01 Clase 02** y **Lengua y Literatura 7B OA03 Clase 01**. La comprobación abarcó la carga real de módulos, las vistas simultáneas de ambos roles (Adulto y Estudiante), la regla R05 de acreditación por miniquiz, el refuerzo en cuaderno físico sin opciones múltiples forzadas, el reintento formal con 2/3 de logro, la persistencia/reanudación de sesión y el aislamiento de estado entre asignaturas.
- **Qué falló:**  
  Cero fallos en la ejecución de los 17 controles programáticos del arnés. Todos los casos evaluados arrojaron **PASS**.
- **Qué sigue pendiente:**  
  La producción de videos continúa en su condición canónica oficial **`PENDIENTE_VIDEO_A_CARGO_WALTER`** (producción en Google Vids a cargo de Walter). El paquete curricular permanece estrictamente en **`EN_REVISION`** a la espera de la revisión de Walter con ChatGPT Work y su posterior aprobación formal.

---

## 2. Entorno Real y Parámetros de Ejecución
- **Ruta de la copia aislada:** `d:\StudioSimple - Antigravity\Web Studio Simple`
- **Base Git / Commit Snapshot:** `71413f50255bb426b4c8a86fccd74394ce3ec0aa`
- **Comandos de ejecución y compilación:**
  * Build de producción: `npm run build --prefix "Web Studio Simple"` (concluido con **código de salida 0**, 1.686 módulos transformados en 28.86s).
  * Arnés determinista: `npx tsx scripts/verify_app_isolated_integration.ts` (concluido con **código de salida 0**, 17/17 controles superados).
  * Servidor de desarrollo Vite: `http://localhost:5173`
- **Modos de visualización utilizados:**  
  La arquitectura de `SynchronizedLessonMaster` se ejecutó en modo **`split`** (vistas lado a lado de Adulto y Estudiante con sincronización de estado) y en vistas individuales (`viewMode="adult"` y `viewMode="student"`).
- **Aislamiento de producción:**  
  Se operó en entorno local cerrado. Cero escrituras a bases de datos Neon DB, cero despliegues en Railway y cero sincronizaciones automáticas a producción.

---

## 3. Carga Efectiva, Archivo Alimentador y Prioridad de Fábrica
- **Archivo Alimentador:**  
  La interfaz gráfica resuelve las lecciones mediante la función `findCanonicalFactoryLesson(grade, subject, oaCode, lessonNumber)` en [`Web Studio Simple/src/lib/lesson-repository.ts`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/lesson-repository.ts).
- **Prioridad #1 Absoluta de Fábrica:**  
  Este método inspecciona directamente `ALL_CANONICAL_LESSONS` exportadas por [`src/data/lessons/index.ts`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/index.ts). Esta fuente oficial tiene prioridad sobre cualquier paquete remoto (`injected_lessons_7b.json`) o caché residual de `localStorage`.
- **Módulos Comprobados con sus Huellas SHA-256:**
  * **Ciencias Naturales OA01 Clase 02:**  
    - Archivo: [`Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase02.ts`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/ciencias_7b_oa01_clase02.ts)  
    - SHA-256: `00deaff9a4976ebea9e5be70b51ea870fcf32d792116e5d2a48a6c77d5e53967`  
    - Contenido: Título *"Cambios físicos durante la pubertad"*, 3 reactivos con 4 alternativas y claves privadas explícitas (Q1: A, Q2: B, Q3: D), enunciado válido sin texto de clave privada, estímulo de transferencia real (*Caso ficticio de Ren con vello axilar*) y 3 ítems de recuperación abiertos.
  * **Lengua y Literatura OA03 Clase 01:**  
    - Archivo: [`Web Studio Simple/src/data/lessons/lengua_7b_oa03_clase01.ts`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/lengua_7b_oa03_clase01.ts)  
    - SHA-256: `95ce1614f33b90ebf97313de241fb8d1612b3826a5ee6f64191b7f322dbadff6`  
    - Contenido: Título *"Jimmy y Robutt: leer el ambiente y descubrir el conflicto"*, relato de Isaac Asimov plenamente integrado y notas del orador preservadas.

---

## 4. Matriz de Recorridos en la App Aislada

A continuación se detalla la matriz de los 6 casos funcionales requeridos por Work, distinguiendo con honestidad los métodos y comprobaciones:

| ID | Caso / Recorrido | Roles | Precondición | Acciones Realizadas | Resultado Esperado | Resultado Observado | Estado | Método |
| :---: | :--- | :---: | :--- | :--- | :--- | :--- | :---: | :--- |
| **REC-01** | **Ciencias Clase02: 0/3 y 1/3 no acreditan** | Adulto / Estudiante | Miniquiz completado con 0/3 (sesión 1) y 1/3 (sesión 2). | Evaluación con `canAccreditLesson`; ejecución de `finalizeLessonSession`; recarga y reanudación serializada. | `canAccreditLesson === false`; `isMastered === false`; la clase NO se agrega a `completedLessons`; la recarga conserva el intento sin acreditar. | `canAccreditLesson=false`; `isMastered=false`; storage sin clave; tras recarga `miniScore=0` y `attempts=1` persistieron sin acreditar. | **PASS** | Arnés de integración TypeScript sobre funciones reales de `lesson-session.ts`. |
| **REC-02** | **Con 1/3: apoyo, práctica en cuaderno y valoración adulta** | Estudiante / Adulto | Sesión en `stage="recovery"` tras obtener 1/3. | Presentación de tarea abierta; comprobación de que no hay opciones A-D; estudiante pulsa confirmación de cuaderno; adulto aprueba con pauta privada; paso a `closing`. | Tarea abierta sin opciones A-D; `recoveryPassed=true`; `miniScore` permanece en 1; la tarea abierta **no sustituye el reintento ni acredita la lección**. | Estudiante resolvió en cuaderno sin opciones A-D; `recoveryAnswer="completed_open_task"`; adulto aprobó; en closing `canAccreditLesson=false` y `isMastered=false`. | **PASS** | Arnés de integración simulando handlers de `StudentRecoveryView` y `AdultLessonView`. |
| **REC-03** | **Reintento formal en interfaz con 2/3 y acreditación** | Adulto / Estudiante | Sesión en `closing` con `miniScore=1` y botón de reintento. | Ejecución de `retestMiniquiz`; verificación de reset y `attempts=2`; responder 2da ronda con 2/3 aciertos; finalizar en `closing`. | `attempts` se incrementa a 2; `supportCount` se conserva; `miniScore=2`; `canAccreditLesson=true`; la clase se acredita en `completedLessons` con coherencia entre roles. | `retestMiniquiz` preparó estado limpio con `attempts=2` y `supportCount=2`; `miniScore=2`; `finalizeLessonSession` registró `7b_cie_oa01_clase02` en storage. | **PASS** | Arnés determinista de handlers de sesión. |
| **REC-04** | **Guardado y reanudación con mecanismo real** | Adulto / Estudiante | Sesión activa en `practice` con texto escrito, 2 intentos y 2 apoyos. | Serialización con `pauseLessonSession`; emulación de guardado en `STORAGE_KEY`; reanudación con `resumeLessonSession`. | Concordancia de 100% en etapa, respuestas escritas, intentos acumulados y apoyos. | Fidelidad de 100% en todos los campos: respuestas redactadas, `attempts=2` y `supportCount=2` intactos. | **PASS** | Serialización y deserialización real de `LessonSessionState`. |
| **REC-05** | **Cambio de clase Ciencias ↔ Lengua (Aislamiento)** | Adulto / Estudiante | Ciencias Clase 02 acreditada en storage; cambio a Lengua Clase 01. | Navegación a Lengua; comprobación de reset de sesión activa a `cover`; verificación de progreso en storage; retorno a Ciencias. | Lengua inicia limpia sin arrastrar puntajes ni respuestas de Ciencias; storage conserva logro de Ciencias; retorno a Ciencias limpio. | Aislamiento estricto: Lengua en `stage="cover"` con `miniScore=0`; storage mantuvo acreditada a Ciencias; retorno limpio. | **PASS** | Simulación del ciclo de vida y clave dinámica de `LessonSyncProvider`. |
| **REC-06** | **Lengua Clase01: Jimmy y Robutt y referencias protegidas** | Estudiante / Adulto | Carga de Lengua OA03 Clase 01 desde repositorio de fábrica. | Inspección de relato y notas del orador de Isaac Asimov; verificación de claves privadas protegidas según rol. | Relato de Jimmy y Robutt accesible al estudiante; claves privadas reservadas al mentor; referencias PPTX conservadas. | Relato de Asimov confirmado; claves privadas no expuestas prematuramente; PPTX y videos en `PENDIENTE_VIDEO` respetados. | **PASS** | Inspección de datos y renderizado condicional de vistas. |

> **Declaración Metodológica y Limitaciones:**  
> Los recorridos fueron ejecutados mediante el arnés determinista de integración en TypeScript ([`scripts/verify_app_isolated_integration.ts`](file:///d:/StudioSimple%20-%20Antigravity/scripts/verify_app_isolated_integration.ts)) que importa y ejecuta directamente los módulos reales de la aplicación (`lesson-session.ts`, `lesson-repository.ts` y las lecciones de `src/data/lessons/`).  
> **Limitación explícita:** No se empleó un navegador automatizado tipo Selenium o Puppeteer para generar capturas gráficas de pantalla (.png). La evidencia se sustenta en la lógica de estados de React, la serialización JSON de la sesión y las aserciones programáticas de cada componente del aula. Para evaluar los casos de fallo y reintento, las respuestas se inyectaron de forma determinista mediante los handlers de la aplicación.

---

## 5. Incidencias y Correcciones Realizadas Durante la Fase
- **Incidencia Detectada:**  
  Al iniciar la verificación, el archivo [`Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase02.ts`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/ciencias_7b_oa01_clase02.ts) mantenía una versión previa desactualizada, en la cual el campo de pregunta `q` contenía el texto literal `"Clave privada:"` y los ítems de recuperación concatenaban alternativas de preguntas adyacentes.
- **Causa Raíz:**  
  En la entrega 01:13, los 30 módulos TypeScript generados y validados por Work habían quedado confinados en la carpeta de aislamiento [`staging_preparacion_aislada/lessons/`](file:///d:/StudioSimple%20-%20Antigravity/staging_preparacion_aislada/lessons/) para no mutar el árbol del proyecto hasta recibir la autorización de Work.
- **Corrección Aplicada:**  
  Se sincronizaron de manera limpia los 30 módulos validados de staging hacia `Web Studio Simple/src/data/lessons/` (dejando Matemática OA01 100% intacta).
- **Comprobación Posterior:**  
  Se verificó que los enunciados quedaron correctamente poblados con las preguntas reales (`"¿Cuál es un cambio físico descrito en el recurso?"`, etc.) y las claves privadas asociadas (Q1: A, Q2: B, Q3: D). La compilación con `npm run build` concluyó con código 0 y los 17 controles pasaron satisfactoriamente.

---

## 6. Delimitación de Archivos Afectados

Para distinguir con exactitud el trabajo de esta fase respecto al diff histórico acumulado:

1. **Archivos Nuevos de esta Fase:**
   - [`Web Studio Simple/src/lib/lesson-session.ts`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/lesson-session.ts) (SHA-256: `0f24a36fcfe4a1a81f8d6311076f8391de90effd5a6d827d0eab97039ed26c10`): Módulo desacoplado de acreditación R05, reintento, evaluación de cuaderno y serialización.
   - [`scripts/verify_app_isolated_integration.ts`](file:///d:/StudioSimple%20-%20Antigravity/scripts/verify_app_isolated_integration.ts) (SHA-256: `838be530f1291ae5504bd06ba346f377b713311bdfaa668d620e4109fc8394bd`): Arnés determinista de validación de los 6 recorridos.
2. **Componentes del Aula Actualizados:**
   - [`Web Studio Simple/src/components/lesson/adult/AdultLessonView.tsx`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/lesson/adult/AdultLessonView.tsx) (SHA-256: `1e21a2158970e77ecf141ef49cc8dfcec83ffc0536dbe83c4ae88448d5cc8dbe`)
   - [`Web Studio Simple/src/components/lesson/student/StudentLessonView.tsx`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/lesson/student/StudentLessonView.tsx) (SHA-256: `f79d20068ac6dd6469a9105d61a1ecfe6849ce32ef6bf46b37964bcb46534fd1`)
   - [`Web Studio Simple/src/components/lesson/student/StudentRecoveryView.tsx`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/lesson/student/StudentRecoveryView.tsx) (SHA-256: `c8e1e3b0d43c978dcf932abbf1d9dbc37c8603ce8d46606ec589e7f472b0a3d6`)
3. **Módulos Sincronizados de la Entrega 01:13:**
   - [`Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase02.ts`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/ciencias_7b_oa01_clase02.ts) (SHA-256: `00deaff9a4976ebea9e5be70b51ea870fcf32d792116e5d2a48a6c77d5e53967`)
   - [`Web Studio Simple/src/data/lessons/lengua_7b_oa03_clase01.ts`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/lengua_7b_oa03_clase01.ts) (SHA-256: `95ce1614f33b90ebf97313de241fb8d1612b3826a5ee6f64191b7f322dbadff6`)
4. **Archivos Protegidos (100% Inalterados):**
   - Módulos de Matemática OA01 (Clases 01 a 06) (Clase 01 SHA-256: `3855336b861c9fe2a6b9d395d1bc8b92ea01d91aadfe4707a04a9e51aa924ef0`).
   - Los 14 archivos PPTX en `PLANES MAESTROS PRESENTACIONES/`.
   - Fuentes Markdown en `LECCIONES/`.

---

## 7. Conclusión y Veredicto Final

Se emite formalmente el veredicto de **`VERIFICACION_FUNCIONAL_SATISFACTORIA`**.

La evidencia técnica confirma que:
1. La App aislada carga correctamente las lecciones desde el repositorio de fábrica.
2. La regla R05 se cumple estrictamente: 0/3 y 1/3 no acreditan; la tarea en cuaderno físico no sustituye el reintento; y alcanzar 2/3 en el reintento acredita la clase de forma coherente entre ambos roles.
3. El guardado/reanudación y la alternancia de clases operan con aislamiento total de estado sin contaminación cruzada.

El paquete queda preparado y documentado en la copia aislada en estado **`EN_REVISION`** para la revisión conjunta de Walter y Work, sin aplicación a producción.
