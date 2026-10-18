# INFORME DE AUDITORÍA TÉCNICA Y DIAGNÓSTICO DE INYECCIÓN
## Ciencias Naturales 7° Básico (Curso `110-7`, Asignatura `Ciencias_Naturales`, OA 1)

- **Fecha y Hora de Auditoría:** 2026-10-17 11:05 [America/Santiago]
- **Auditor Técnico:** Antigravity (Ingeniero de Software con IA, A-SDLC)
- **Destinatarios:** Walter, ChatGPT Work
- **Alcance Autorizado:** Diagnóstico integral de las seis clases de Ciencias Naturales OA01 (7° Básico). Solo generación de informes y archivos de evidencia sin mutar lecciones, código funcional, base de datos ni despliegue.

---

## 1. IDENTIFICACIÓN DEL ENTORNO REAL

* **Repositorio Local:** `d:\StudioSimple - Antigravity`
* **Ruta de Trabajo:** `D:\StudioSimple - Antigravity`
* **Rama Git:** `main` (rastreando `origin/main`, al día)
* **Commit HEAD:** `71413f50255bb426b4c8a86fccd74394ce3ec0aa`
* **Estado de Git (`git status`):**
  * Modificados no commiteados: `package.json`, `package-lock.json`.
  * Archivos no rastreados (*untracked*): `memoria/2026-10-16_13-42_Implementacion_Generador_Video_Nativo_Slide_To_Video.md`, `scripts/video_engine/`, `spec/features/002_slide_to_video_generator/`.
* **Fecha y Zona Horaria:** `2026-10-17 11:05 [America/Santiago]` (UTC-3).
* **Delimitación Estricta de Entornos Inspeccionados:**
  * **Código Local:** Inspeccionado directamente en el sistema de archivos del workspace.
  * **Build Local:** Directorio `Web Studio Simple/dist/` generado por Vite + TypeScript (`tsc`).
  * **Buzón Staging:** `LECCIONES_POR_REVISAR/110-7/Ciencias_Naturales/OA01/`.
  * **Repositorio Canónico Local:** `LECCIONES/110-7/Ciencias_Naturales/OA01/`.
  * **Producción:** Desplegado en **Railway** con base de datos **Neon PostgreSQL**. *Declaración:* No se inspeccionaron ni alteraron datos en vivo ni conexiones en esta auditoría; no se asume que el commit local esté activo en producción.
* **Origen de Datos de la App Visible:**
  * En la SPA (`Web Studio Simple`), los datos de lecciones se resuelven mediante el repositorio en memoria `Web Studio Simple/src/lib/lesson-repository.ts`.
  * La precedencia absoluta de fábrica (#1) la tienen los módulos TypeScript estáticos compilados en `Web Studio Simple/src/data/lessons/`, importados en bloque en `Web Studio Simple/src/data/lessons/index.ts`.

---

## 2. CADENA COMPLETA DE INYECCIÓN Y ANÁLISIS ARQUITECTÓNICO

### 2.1. Trazabilidad del Salto de Datos (De Fuente Editable a Componente Renderizado)

1. **Fuente Editable:**
   * Archivo de entrada: `LECCIONES_POR_REVISAR/110-7/Ciencias_Naturales/OA01/CLASE01.md`.
   * *Estado:* Solo existe `CLASE01.md`. Las clases 02 a 06 **no existen en este buzón local**.
2. **Parser y Transformación:**
   * Archivo real: `scripts/pipeline_sync_lessons.ts` (Líneas 100–390).
   * Función: `parseMarkdownLesson(content: string, relPath: string): LessonData`.
   * Proceso: Mapea encabezados Markdown (`## 1. Paso 1`, `## 2. Paso 2A`, etc.) hacia las interfaces de `Web Studio Simple/src/types/lesson.ts`.
3. **Persistencia / Generación de Archivos:**
   * Función: `generateLessonTsModule(lesson: LessonData, destPath: string)`.
   * Salida 1: `Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts`.
   * Salida 2: Registro en `Web Studio Simple/src/data/lessons/index.ts` (Línea 1).
   * Salida 3: Conversión con `adaptPlayerLessonToGenerator()` e inyección en `Web Studio Simple/public/data/injected_lessons_7b.json`.
   * Salida 4: Registro de trazabilidad y SHA-256 en `data/sync_manifest.json`.
4. **Carga y Servicio en Runtime:**
   * Archivo: `Web Studio Simple/src/lib/lesson-repository.ts`.
   * Función: `findInjectedLesson(grade, subject, oaCode, lessonNumber)`.
   * **Jerarquía Estricta de Resolución:**
     1. `findCanonicalFactoryLesson(...)` (Líneas 258–281): Inspecciona `ALL_CANONICAL_LESSONS` importado de `../data/lessons/index.ts`. **Tiene prioridad absoluta #1**. Si la lección está en TypeScript compilado, se sirve directamente.
     2. `localStorage` bajo `CUSTOM_PLAYER_LESSONS_KEY` (Líneas 283–296): Solo si el usuario editó la clase en la interfaz del CMS/Editor.
     3. `cachedInjectedPackages` (Líneas 398–410): Cargado vía `fetch('/data/injected_lessons_7b.json')`.
     4. `generateDynamicLesson(...)`: Fallback procedural de última instancia.
5. **Componentes Renderizados:**
   * `Web Studio Simple/src/components/lesson/SynchronizedLessonMaster.tsx`: Monta el contexto `LessonSyncContext`.
   * `Web Studio Simple/src/components/lesson/adult/AdultLessonView.tsx`: Renderiza la interfaz del mentor (guion, recordatorios, respuestas esperadas, pistas socráticas).
   * `Web Studio Simple/src/components/lesson/student/StudentLessonView.tsx`: Renderiza la interfaz del estudiante (estímulos, láminas, preguntas, cuaderno, miniquiz).

### 2.2. Verificación de Candidatos Citados en Documentación Previa

| Candidato Citado | Estado Real en el Repositorio | Ruta Confirmada |
| :--- | :--- | :--- |
| `lesson-generator.ts` | **EXISTE** | `Web Studio Simple/src/lib/lesson-generator.ts` |
| `lesson-adapter.ts` | **EXISTE** | `Web Studio Simple/src/lib/lesson-adapter.ts` |
| `docx-export.ts` | **EXISTE** | `Web Studio Simple/src/lib/docx-export.ts` |
| `prompt-export.ts` | **EXISTE** | `Web Studio Simple/src/lib/prompt-export.ts` |
| `curriculumData.ts` | **EXISTE** | `Web Studio Simple/src/data/curriculumData.ts` |
| `AdultLessonView.tsx` | **EXISTE** | `Web Studio Simple/src/components/lesson/adult/AdultLessonView.tsx` |
| `LessonPlayerView.tsx` | **NO EXISTE** | Sustituido por `SynchronizedLessonMaster.tsx` y `StudentLessonView.tsx`. |

### 2.3. Resolución Operativa de DEC-01 frente a los Planes que llaman Canónico al MD

* **Conflicto Detectado:** El principio **DEC-01** del *Sistema v1.0* estipulaba que una *fuente estructurada* (objeto de datos tipado) es la fuente de generación y que los derivados (DOCX, TXT, TS) no se editan por separado. Sin embargo, los planes de trabajo posteriores y el pipeline de ingestión (`scripts/pipeline_sync_lessons.ts`) adoptaron el archivo **Markdown (`.md`)** como la fuente de autoría e intercambio entre ChatGPT Work y Antigravity.
* **Resolución Vigente en Código:**
  1. El archivo Markdown en `LECCIONES_POR_REVISAR/` actúa como **fuente de entrada de autoría humana/IA**.
  2. Al ejecutarse `npm run sync:lessons`, el parser compila dicho `.md` hacia el módulo TypeScript (`.ts`) y los JSON públicos.
  3. En la aplicación web, el archivo TypeScript resultante en `Web Studio Simple/src/data/lessons/` se comporta como la **fuente canónica de compilación e inmutabilidad de ejecución**.
  4. Si se edita un archivo Markdown pero no se ejecuta el pipeline de sincronización, la aplicación **continúa sirviendo la versión previa congelada en TypeScript**.

---

## 3. COMPARACIÓN DE LAS SEIS VERSIONES POR CAMPO (TABLA MAESTRA)

### 3.1. Matriz de Integridad y Trazabilidad Criptográfica

| ID Clase | Fuente Local y SHA-256 | SHA-256 Referencia Work (Drive) | Versión Importada | Versión Persistida/Generada | Dato Efectivamente Servido | Resultado Comparación | Discrepancias Clave |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CIE-OA01-C01** | `LECCIONES_POR_REVISAR/.../CLASE01.md`<br>`ad397d46b91983f688adb42a74eb9ad72a2e8bfe051873a8937c6fd04a9424bb` | `0dc214db01082f1efa9d4efc4b7b2977a2c639eb60f9efd91753fe44b71b5f30`<br>*(Modif. 17-10-2026 12:41 UTC)* | Sincronizada el 11-10-2026 (`hash: ad397d46b91983f6`) | `ciencias_7b_oa01_clase01.ts` | Servido desde `index.ts` / `ciencias_7b_oa01_clase01.ts` | **En conflicto / Desactualizado** | Hash no coincide con Work (Work actualizó hoy en Drive). En la App servida: conserva claves D-B-C y 5 dimensiones, pero `recovery` contiene placeholders genéricos. |
| **CIE-OA01-C02** | **NO EXISTE EN LOCAL (.md)** | `ae7e661c22dbdb1195668eca2195f01e8b7960b089ca0c386e92c9e4033180dc`<br>*(Modif. 13-10-2026 01:34 UTC)* | No importada (ausente en buzón) | Snapshot del 08-10-2026 (`clase02_data.ts`) | `ciencias_7b_oa01_clase02.ts` | **En conflicto / Desvinculado** | Fuente MD de Work del 13-10 nunca fue descargada ni ingestada. Servido usa 7+7 láminas; Work en Drive tiene 7+17. |
| **CIE-OA01-C03** | **NO EXISTE EN LOCAL (.md)** | `1d0eb6ae892ecf6e1fc23b65caf3c005e699efe47801ff8d15cf4c4c8021ffba`<br>*(Modif. 13-10-2026 01:34 UTC)* | No importada (ausente en buzón) | Snapshot del 08-10-2026 (`clase03_data.ts`) | `ciencias_7b_oa01_clase03.ts` | **En conflicto / Desvinculado** | Fuente MD ausente en local. App sirve TS generado el 08-10-2026. Guiones 7+17 de Work ignorados. |
| **CIE-OA01-C04** | **NO EXISTE EN LOCAL (.md)** | `f3e99e22aed6eba5f3695299a6a844685f2ced4475723045af8d2c51e5affd71`<br>*(Modif. 13-10-2026 01:34 UTC)* | No importada (ausente en buzón) | Snapshot del 08-10-2026 (`clase04_data.ts`) | `ciencias_7b_oa01_clase04.ts` | **En conflicto / Desvinculado** | Fuente MD ausente en local. App sirve TS generado el 08-10-2026. Guiones 7+17 de Work ignorados. |
| **CIE-OA01-C05** | **NO EXISTE EN LOCAL (.md)** | `60d770c0b0dd4e958cf3f4b5fba8816e0fad4671a42fb10bc183967042978726`<br>*(Modif. 13-10-2026 01:35 UTC)* | No importada (ausente en buzón) | Snapshot del 08-10-2026 (`clase05_data.ts`) | `ciencias_7b_oa01_clase05.ts` | **En conflicto / Desvinculado** | Fuente MD ausente en local. App sirve TS generado el 08-10-2026. Guiones 7+17 de Work ignorados. |
| **CIE-OA01-C06** | **NO EXISTE EN LOCAL (.md)** | `8fbe1d91552a4efb2258371be8bd2a0e699bc4d36712eda54280f6a5753f9430`<br>*(Modif. 13-10-2026 01:35 UTC)* | No importada (ausente en buzón) | Snapshot del 08-10-2026 (`clase06_data.ts`) | `ciencias_7b_oa01_clase06.ts` | **En conflicto / Desvinculado** | Fuente MD ausente en local. App sirve TS generado el 08-10-2026. Guiones 7+17 de Work ignorados. |

* **Aclaración de Alias:**
  * Curricular: `7B-CNA-OA01` (Bases Curriculares / Temarios EELL MINEDUC).
  * Código en App: `Ciencias_Naturales` (nombre de carpeta e identificador de asignatura).
  * Normalizador (`normalizeSubject` en `lesson-repository.ts:114`): Mapea cadenas que contienen `cien` o `nat` al alias canónico interno `cie`.
  * Clases: Se utiliza formalmente `CLASE01` / `clase01` (o prefijo legacy `les-cie-701`).

### 3.2. Análisis Extremo a Extremo de CLASE 01 (Fuente Local vs Dato Servido)

* **Objetivo de la Lección:**
  * *Fuente:* "Explicar que la sexualidad comprende más que el aspecto físico, identificando las cinco dimensiones que presenta el Texto Escolar y relacionándolas con los aspectos biológicos, afectivos y sociales señalados en el OA."
  * *Dato Servido:* **Idéntico** (`ciencias_7b_oa01_clase01.ts:16`).
* **Recurso / Estímulo:**
  * *Fuente:* Texto Escolar Ciencias Naturales 7° Básico, Unidad 4, pág. impresa 116 (PDF 118).
  * *Dato Servido:* Mantiene la referencia textual a la página 116 en `reminders`, `preQuestions`, `practice` y `mini[0]`.
* **Vocabulario y Definiciones:**
  * Distingue con precisión las 5 dimensiones del libro (*física, intelectual, social, emocional, espiritual*) de los 3 aspectos del OA (*biológico, afectivo, social*).
* **Miniquiz y Claves:**
  * **Ítem 1:** `D. Cinco: física, intelectual, social, emocional y espiritual.` $\rightarrow$ **Clave D**.
  * **Ítem 2:** `B. Considera aspectos corporales, emocionales, sociales y otros de la persona que se relacionan.` $\rightarrow$ **Clave B**.
  * **Ítem 3:** `C. Social.` $\rightarrow$ **Clave C**.
  * **Resultado:** Claves **D - B - C conservadas al 100%**.
* **Apoyos y Recuperación (Discrepancia Crítica):**
  * *Fuente MD:* Define pautas pedagógicas descriptivas ("Si necesita apoyo en el reactivo 1: Abrir página 116 y recorrer las cinco etiquetas...").
  * *Dato Servido (TypeScript):* El parser generó opciones de andamiaje ficticias en `recovery` (`ciencias_7b_oa01_clase01.ts:395-399`):
    ```json
    "options": [
      "Opción con andamiaje A",
      "Opción con andamiaje B",
      "Opción con andamiaje C"
    ],
    "correct": "Opción con andamiaje A"
    ```
    *Diagnóstico:* **Truncamiento / Sustitución por Placeholder**. El componente de recuperación del estudiante renderiza texto genérico.

---

## 4. EQUIVALENCIA PEDAGÓGICA Y DISTRIBUCIÓN POR ROL

### 4.1. Matriz de Trazabilidad: Manual Maestro $\rightarrow$ Fuente $\rightarrow$ Plataforma $\rightarrow$ Roles

| Función Pedagógica (Manual 15.3) | Sección en Fuente MD | Campo Real en `LessonData` | Etapa Visible en App | Rol que lo Ve | Momento de Revelación | Evidencia en Código |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Conexión** | Paso 1 (Preparación) y Paso 2B (Situación) | `prep.adultObjective`, `prep.routeToday`, `situation.dilePrompt` | `cover` / `prep` | Mentor (Adulto) y Estudiante | El adulto ve pautas y advertencias privadas; el estudiante ve la pregunta inicial. | `AdultLessonView.tsx:50-120` |
| **2. Motivación (Gancho)** | Paso 3 (Video Gancho) | `hook.slides[0..6]`, `hook.dileIntro`, `hook.dileAfterVideo` | `hook` | Ambos roles | Ambos ven las 7 diapositivas; solo el mentor ve `speakerNotes`. | `StudentLessonView.tsx:280-360` |
| **3. Recorrido** | Paso 2A (Ruta) | `route.blocks[0..3]`, `route.keyQuestions` | `route` | Ambos roles | Inmediata al inicio de la navegación. | `StudentLessonView.tsx:210-270` |
| **4. Explicación / Modelamiento** | Paso 5 (Formalización) | `formalization.slides[7..13]`, `formalization.concept` | `formalization` | Ambos roles | Diapositivas explicativas (7 láminas) comunes; notas al orador exclusivas del mentor. | `AdultLessonView.tsx:420-510` |
| **5. Práctica Guiada** | Paso 4 (Conversación) y Paso 5B (Comprobación) | `preQuestions[]`, `postQuestions[]` | `preQuestions` / `postQuestions` | Mentor y Estudiante | **Condicionada:** El estudiante solo ve la pregunta; la respuesta modelo (`studentReveal`) se bloquea hasta que el estudiante envía su respuesta escrita y el mentor la valida. | `StudentLessonView.tsx:79-95` |
| **6. Práctica Autónoma** | Paso 6 (Práctica Cuaderno) | `practice[]` (`caso1`, `caso2`) | `practice` | Ambos roles | Estudiante resuelve en su cuaderno físico y redacta su síntesis; mentor evalúa con criterios de éxito/apoyo. | `StudentLessonView.tsx:820-910` |
| **7. Feedback / Reintento** | `situation.options`, `preQuestions[].support` | `socraticHint`, `supportHintCard` | Durante pasos guiados | Mentor activa, Estudiante recibe | Pistas socráticas que se despliegan si el estudiante solicita ayuda. | `SupportHintCard.tsx:1-45` |
| **8. Comprobación (Miniquiz)** | Paso 7 (Miniquiz) | `mini[]` (3 preguntas de 4 alternativas) | `mini` | Estudiante responde; Mentor monitorea | Estudiante marca y envía; retroalimentación inmediata post-envío. | `StudentMiniquizView.tsx:1-124` |
| **9. Recuperación** | Paso 7B (Recuperación) | `recovery[]` | `recoveryIntro` / `recovery` | Activada solo con score < 2/3 | Solo se muestra si el estudiante obtuvo 0/3 o 1/3 en el miniquiz. | `StudentRecoveryView.tsx:1-70` |
| **10. Cierre y Metacognición** | Paso 8 (Cierre) | `summaryIdeas`, `paso8_cierre` | `closing` | Ambos roles | Ideas clave, pregunta de síntesis y celebración de cierre. | `AdultLessonView.tsx:1420-1510` |

### 4.2. Privacidad de Interfaz vs Exposición en Estado del Cliente

* **Privacidad en Interfaz (DOM / Render):** **Verificada y Conforme**. En `StudentLessonView.tsx` (Líneas 79–95), la constante `isResolved` exige estrictamente:
  ```typescript
  const studentHasAnswered = Boolean(savedAnswer && savedAnswer.trim().length > 0);
  const isResolved = (feedback?.kind === 'success' || feedback?.kind === 'reveal') && studentHasAnswered;
  ```
  La respuesta modelo (`studentReveal`) y las claves no son pintadas en el árbol DOM del estudiante antes de que emita su respuesta.
* **Exposición en Memoria del Cliente (SPA):** **Pendiente de Protección Criptográfica / Filtrado por Rol**. Al ser una SPA en React, el objeto íntegro `LessonData` (que incluye `correct`, `expected`, `socraticHint` y `reveal`) es inyectado completo en el contexto `LessonSyncContext`. Un estudiante con conocimientos técnicos puede abrir la consola de desarrollador (`DevTools`) e inspeccionar el estado para ver las respuestas. Para un blindaje absoluto en producción, se requerirá un endpoint de backend que filtre los campos privados según el rol JWT.

### 4.3. Sincronización Adulto-Estudiante y Reanudación de Sesión

* **Mismo Dispositivo (Pestañas separadas o modo split):** Opera mediante `BroadcastChannel` nativo (`estudiosimple_lesson_sync_channel`) con latencia de 0 ms.
* **Dispositivos Separados (Multi-PC / Tablet):**
  * Envío: HTTP POST hacia `/api/classroom/sync` con identificador de sala determinista (`room-${studentPin}`).
  * Recepción: Server-Sent Events (SSE) en `/api/classroom/sync?roomCode=...` con reconexión automática y fallback a polling cada 1500 ms.
* **Reanudación de Sesión:** Se persiste en `localStorage` bajo `estudiosimple_active_lesson_session`. Si el estudiante o mentor recargan la página, la sesión valida `activeOa`, `activeLessonNum` y `activeLessonTitle`. Si coinciden, reanuda exactamente la etapa (`stage`), respuestas marcadas y textos ingresados. Si se detecta una nueva lección, purga la caché residual y reinicia a `cover`.

---

## 5. VERIFICACIÓN DE EVALUACIÓN Y RECURSOS

### 5.1. Reglas del Miniquiz y Progresión

* **Lógica en Código (`StudentMiniquizView.tsx:24-40`):**
  * Tres ítems de 4 alternativas.
  * Si `score >= 2` (2/3 o 3/3): Se marca `reviewQueue = [0, 1, 2]` y avanza directamente a la etapa de Cierre (`closing`).
  * Si `score < 2` (0/3 o 1/3): Se filtran las preguntas erróneas en `wrong` y se fuerza la transición a `recoveryIntro` y `recovery`.
* **Registro de Intentos:** Se incrementa `session.attempt` y se registran los strings de alternativas en `session.miniAnswers`.
* **Ausencia Terminante de Aprobación Automática:**
  * Al completar la lección, el cliente añade la clave (ej. `'7_cie_oa1_1'`) a `completedLessons` en el perfil del estudiante (`AppContext.tsx`).
  * **El archivo normativo `manifest.json` del OA jamás es mutado por la app**: permanece estrictamente en `EN_REVISION` (`WORK_PRE_APROBACION`), cumpliendo la directiva de gobernanza de AGENTS.md.

### 5.2. Verificación de Recursos Visuales y Audiovisuales

* **Esquema `CIE-OA01-ESQUEMA.png`:**
  * **Estado: NO EXISTE en el repositorio local.**
  * No se encuentra en `Web Studio Simple/public/images/` ni en `visuals/`.
  * *Impacto:* La lección no puede cargar una imagen estática local; en su lugar, la interfaz renderiza el componente vectorial interactivo `StudentDimensionsChart.tsx`.
* **Cinco Íconos Citados vs Componente Renderizado:**
  * En el texto de la lección se alude a 5 íconos (*física, intelectual, social, emocional, espiritual*).
  * Sin embargo, el componente renderizado (`StudentDimensionsChart.tsx:19-75`) define **4 dimensiones** (*Biológica, Afectiva, Social, Ética*) con 4 íconos Lucide (`Activity`, `Heart`, `Users`, `ShieldCheck`).
  * *Diagnóstico:* Discrepancia visual entre el contenido del guion (5 dimensiones) y el widget interactivo (4 dimensiones).
* **Página 118 del Texto Escolar:**
  * No está integrada como asset binario embebido en la aplicación web; se referencia como enlace externo de Google Drive en el encabezado Markdown.
* **Recursos Audiovisuales (Videos Gancho y Explicativo):**
  * En las seis clases (`ciencias_7b_oa01_clase01.ts` a `clase06.ts`), los campos `videoSrc` y `posterSrc` son strings vacíos `""`.
  * *Diagnóstico:* Videos aún no producidos ni enlazados a Cloudflare R2. Conforme al alcance, esto no constituye falla del inyector.

---

## 6. COMPROBACIÓN DE PUNTOS CONCRETOS DE WORK

1. **Corrección Intelectual vs Espiritual y Claves D-B-C en CLASE 01:**
   * **Comprobado: CONFORME en el archivo TypeScript servido.**
   * Slide 12 (`ciencias_7b_oa01_clase01.ts:286`): Integra autoconocimiento, convicciones, valores y sentido personal.
   * Práctica 1 (`ciencias_7b_oa01_clase01.ts:336`): `intelectual–personalidad/autoconocimiento`, `espiritual–aceptación/sentido personal`.
   * Práctica 2 (`ciencias_7b_oa01_clase01.ts:348`): La dimensión espiritual se reconoce por aceptación de sí y sentido personal, no solo por nombrar valores.
   * Claves Miniquiz: **D - B - C** verificadas en código.
2. **Guiones 7+17 en CLASE 02–06:**
   * **Comprobado: TOTALMENTE IGNORADOS / NUNCA INGESTADOS.**
   * Las fuentes `CLASE02.md` a `CLASE06.md` de Work en Google Drive (con fecha 13-10-2026 y estructura de 17 diapositivas explicativas) **nunca fueron descargadas ni procesadas** en el entorno local.
   * La aplicación local sirve los archivos TypeScript creados el 08-10-2026, los cuales tienen estrictamente **14 diapositivas bimodales (7 gancho + 7 explicación)**.
3. **Observaciones Críticas de Work (Transferencia, Apoyos Genéricos, Afectividad e Intimidad):**
   * **Apoyos Genéricos:** **CONFIRMADO**. El archivo servido contiene placeholders literales en `recovery` (`"Opción con andamiaje A"`, etc.).
   * **Falta de Transferencia Delimitada:** **CONFIRMADO**. Los casos de práctica no proponen un reto inédito ni una toma de decisiones contextualizada; se limitan a clasificación de conceptos.
   * **Cobertura de Relación Afectiva e Intimidad:** **CONFIRMADO**. Ni en el guion de CLASE 01 ni en el componente de la App se aborda en profundidad la intimidad entre dos personas ni la responsabilidad mutua en los vínculos afectivos (se pospuso para clases posteriores, pero en CLASE 02 a 06 servidas tampoco está desarrollado con la profundidad requerida).

---

## 7. ENTREGABLES NORMATIVOS

### A. Informe con Identificadores de Hallazgo y Estados Normativos

| ID Hallazgo | Gravedad | Origen del Defecto | Estado Normativo | Descripción del Hallazgo | Propuesta Mínima de Solución |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **HAL-CIE-001** | **Mayor** | Desfase de Sincronización | **En conflicto** | `CLASE01.md` local (`ad397d...`) difiere del SHA-256 de referencia de Work (`0dc214...`) actualizado hoy en Drive. | Descargar el `.md` oficial de Drive a `LECCIONES_POR_REVISAR/` y ejecutar `npm run sync:lessons`. |
| **HAL-CIE-002** | **Crítico** | Incompletitud en Buzón | **Pendiente de implementación** | Las clases 02 a 06 en Markdown no existen en el repositorio local. La App sirve un snapshot congelado del 08-10-2026. | Colocar `CLASE02.md` a `CLASE06.md` en `LECCIONES_POR_REVISAR/110-7/Ciencias_Naturales/OA01/` para procesarlas por el pipeline. |
| **HAL-CIE-003** | **Mayor** | Generador / Parser | **En conflicto** | El array `recovery` en `ciencias_7b_oa01_clase01.ts` tiene placeholders literales (`"Opción con andamiaje A"`). | Ajustar el parser en `pipeline_sync_lessons.ts` para que extraiga los reactivos reales de recuperación del Markdown. |
| **HAL-CIE-004** | **Menor** | Frontend / Assets | **Parcialmente conforme** | Falta el archivo binario `CIE-OA01-ESQUEMA.png` y el widget `StudentDimensionsChart.tsx` usa 4 dimensiones en vez de las 5 del libro. | Incorporar el PNG nítido de la pág. 116 en `public/images/` y sincronizar las 5 dimensiones en el componente React. |
| **HAL-CIE-005** | **Menor** | Arquitectura SPA | **Sin evidencia suficiente** | Los datos sensibles de evaluación residen en la memoria cliente de React (`LessonSyncContext`). | Aceptar como riesgo controlado en fase actual; proyectar sanitización por endpoint en la API de producción. |

---

### B. JSON de Evidencia Estructurado

Ver archivo: `docs/auditorias/EVIDENCIA_AUDITORIA_CIENCIAS_OA01_2026-10-17.json`.

---

### C. Lista de Campos y Rutas Concretas que Requerirían Cambios

1. **Ruta:** `Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts` (Líneas 391–430)
   * **Campo:** `recovery[].options` y `recovery[].correct`
   * **Texto Actual:**
     ```json
     "options": [
       "Opción con andamiaje A",
       "Opción con andamiaje B",
       "Opción con andamiaje C"
     ],
     "correct": "Opción con andamiaje A"
     ```
   * **Reemplazo Propuesto (Andamiaje Disciplinar):**
     ```json
     "options": [
       "A. Revisar las cinco etiquetas de la pág. 116: física, intelectual, social, emocional y espiritual.",
       "B. Considerar únicamente los cambios corporales visibles durante la pubertad.",
       "C. Clasificar la sexualidad en tres etapas de edad cronológica."
     ],
     "correct": "A. Revisar las cinco etiquetas de la pág. 116: física, intelectual, social, emocional y espiritual."
     ```
2. **Ruta:** `Web Studio Simple/src/components/lesson/student/StudentDimensionsChart.tsx` (Líneas 19–75)
   * **Campo:** Array `dimensions`
   * **Texto Actual:** 4 dimensiones didácticas (`Biológica`, `Afectiva`, `Social`, `Ética`).
   * **Reemplazo Propuesto:** Expandir a las 5 dimensiones oficiales del Texto Escolar SM (pág. 116): `Física`, `Intelectual`, `Social`, `Emocional`, `Espiritual` (y subtitular su correlación con los 3 aspectos del OA).
3. **Ruta:** `LECCIONES_POR_REVISAR/110-7/Ciencias_Naturales/OA01/`
   * **Archivos Faltantes:** Colocar los archivos oficiales `CLASE02.md`, `CLASE03.md`, `CLASE04.md`, `CLASE05.md`, `CLASE06.md` provenientes de Drive para habilitar la ingesta canónica.

---

### D. Respuestas Directas y Conclusivas

1. **¿Qué fuente manda hoy?**
   En el runtime de la aplicación web visible, manda el código TypeScript estático en `Web Studio Simple/src/data/lessons/index.ts` (precedencia #1 en `lesson-repository.ts`). En el proceso de autoría, mandan los archivos Markdown depositados en `LECCIONES_POR_REVISAR/`.
2. **¿Qué se inyecta realmente?**
   Actualmente solo se inyectó la `CLASE01.md` (con fecha 11 de octubre). Las clases 02 a 06 servidas provienen de una generación previa por script TypeScript del 8 de octubre; las clases 02 a 06 creadas por Work en Drive **no han sido inyectadas**.
3. **¿Cómo se transforma?**
   El comando `npm run sync:lessons` ejecuta `scripts/pipeline_sync_lessons.ts`, el cual parsea el Markdown estructurado en 8 etapas/12 pasos, compila el módulo `.ts` en `Web Studio Simple/src/data/lessons/`, actualiza `index.ts` y vuelca la versión adaptada a `public/data/injected_lessons_7b.json` y `data/sync_manifest.json`.
4. **¿Qué versión ve cada rol?**
   Ambos roles consumen el mismo objeto `LessonData`. Sin embargo, `AdultLessonView.tsx` renderiza pautas privadas de mediación, respuestas esperadas, notas al orador y criterios de éxito; mientras que `StudentLessonView.tsx` bloquea las respuestas correctas y explicaciones hasta que el estudiante envía su intento por escrito y el mentor lo libera.
5. **¿Qué contenido se pierde o cambia?**
   * En CLASE 01: Se perdieron las opciones específicas de recuperación en el parser, quedando reemplazadas por placeholders genéricos (`"Opción con andamiaje A"`).
   * En CLASE 02 a 06: Se perdieron por completo los guiones de 7+17 láminas de Work del 13 de octubre porque nunca ingresaron al buzón de entrada local.
6. **¿Qué falta para sincronizarlo con Work?**
   1. Descargar desde Google Drive hacia `LECCIONES_POR_REVISAR/110-7/Ciencias_Naturales/OA01/` la versión más reciente de `CLASE01.md` (la modificada hoy 17-10) y las clases `CLASE02.md` a `CLASE06.md`.
   2. Corregir en el parser `pipeline_sync_lessons.ts` la extracción del bloque `recovery`.
   3. Conciliar la decisión de diseño entre las 14 láminas (7+7) exigidas por el perfil de 7° básico y los guiones de 7+17 elaborados por Work.
   4. Ejecutar `npm run sync:lessons` para regenerar de forma atómica y consistente los 6 módulos TypeScript, los JSON públicos y el manifiesto.
