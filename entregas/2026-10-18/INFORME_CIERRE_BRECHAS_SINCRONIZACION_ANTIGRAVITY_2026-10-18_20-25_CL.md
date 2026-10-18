# INFORME DE CIERRE DE BRECHAS DE SINCRONIZACIÓN Y PRUEBA FUNCIONAL
**EstudioSimple · Versión 110-7 (Copia Aislada Staging)**  
**Fecha y hora:** 2026-10-18 20:25 [America/Santiago]  
**Estado normativo:** `EN_REVISION` (Aprobación formal exclusiva de Walter tras análisis con Work; no publicado a producción)

---

## 1. RESUMEN EJECUTIVO Y RESOLUCIÓN DE DISCREPANCIAS (A - G)

En cumplimiento estricto de la instrucción emitida por Work el 18 de octubre de 2026 a las 19:16 CL, se ejecutó una verificación funcional completa en la copia aislada de la App (`Web Studio Simple`, curso 110-7) interactuando directamente con los controles reales en Microsoft Edge automatizado vía Chrome DevTools Protocol (CDP), con servidor local Vite en `http://127.0.0.1:5173`.

A continuación se detalla la resolución técnica y observable de cada una de las discrepancias identificadas:

| Discrepancia | Clasificación | Causa Real Comprobada | Cambio Realizado | Resultado Observable en Evidencia |
|---|---|---|---|---|
| **A. REC-01** (Roles y Split) | `DEFECTO_Y_EVIDENCIA_CORREGIDA` | La carga por URL no aislaba salas (`roomCode`), provocando lectura de estados antiguos del relay. | Corrección en `LessonSyncContext.tsx` priorizando `&room=` sobre PIN previo. Captura en modo `&mode=split`, `&mode=adult` y `&mode=student`. | 3 capturas con tamaños y hashes únicos (`REC-01_01`, `02`, `03`). Vista adulto sin columna estudiante; vista estudiante sin columna adulto ni filtración de claves privadas (`Clave privada:` ausente del DOM). |
| **B. REC-02** (0/3 y 1/3 sin logro) | `EVIDENCIA_POR_COMPLETAR` | En el script anterior, las pulsaciones se ejecutaban sincrónicamente sin aguardar la actualización del estado de React, impidiendo habilitar y disparar el botón "Enviar respuestas". | Secuenciación con esperas de 350ms por reactivo en `execute_real_browser_recs.ts`. | Capturas `REC-02_01` (muestra `0 / 3` y "Sigamos aprendiendo") y `REC-02_02` (muestra `1 / 3` y "Sigamos aprendiendo"). `REC-02_03` muestra recarga forzada tras pulsar "Finalizar sesión (sin acreditar logro)" con `completedLessons` sin la clase `7_ciencias-naturales_oa1_2`. |
| **C. REC-03** (Recuperación y 2/3) | `EVIDENCIA_POR_COMPLETAR` | La sala de relay preservaba el estado previo no acreditado de la sesión anterior al recargar. | Invocación de reintento en sala aislada `room=rec03_logro`, confirmando tarea de cuaderno por el alumno y valoración de acierto del mentor (la cual no acredita por sí sola). Al alcanzar 2/3, se habilita "Finalizar y registrar clase lograda". | `REC-03_01` muestra tarea abierta en cuaderno. `REC-03_02` muestra "Resultado del miniquiz: 2 de 3", "✓ Criterio de logro acreditado (2/3 aciertos)" y botón "Finalizar y registrar clase lograda". `REC-03_03` muestra "¡Clase 2 completada con éxito!" y `completedLessons` persiste el logro tras recarga. |
| **D. REC-04** (Restauración práctica activa) | `EVIDENCIA_POR_COMPLETAR` | La captura previa se tomó en pantalla de cierre. | La prueba se posicionó en `stage: 'practice'`, caso 1 de 3 (Alex y caracteres sexuales secundarios). El estudiante envió respuesta escrita en el textarea ("Tu respuesta para tu mentor:"). | `REC-04_01` muestra la práctica activa con el texto y la insignia "✓ Respuesta registrada". `REC-04_02` muestra la pantalla tras recarga forzada en el navegador: conserva la misma etapa `practice`, misma pregunta y el mismo texto redactado sin retorno espurio a la portada. |
| **E. REC-05** (Lectura Asimov y aislamiento) | `EVIDENCIA_POR_COMPLETAR` | Las capturas anteriores documentaban solo las portadas de las asignaturas sin abrir el modal. | Se interactuó con el control real "Consultar texto de lectura", abriendo el modal completo en pantalla con el relato de Isaac Asimov. Retorno a Ciencias verificado sin contaminación. | `REC-05_01` muestra el modal desplegado "Consulta de Lectura · Relato en pantalla" con el texto de Jimmy y su perro robot Robutt (Párrafos 1, 2 y 3). `REC-05_02` muestra el retorno limpio a Ciencias Naturales Clase 02 con almacenamiento y pantalla 100% aislados. |
| **F. Entregables incompletos** | `EVIDENCIA_POR_COMPLETAR` | El paquete anterior contenía solo imágenes PNG sin los scripts, diffs ni logs. | Se generó la estructura estándar con 4 carpetas: `capturas/`, `codigo/`, `diffs/`, `logs/`. | Los archivos completos están integrados en el ZIP y documentados en el JSON. |
| **G. Cómputo documental** | `DOCUMENTAL` | Discrepancia entre resumen narrativo (12) y contenido real (13). | Se corrigió formalmente el cómputo documental: **exactamente 13 capturas PNG**. | 13 archivos inventariados con ruta, tamaño y hash SHA-256 verificado. |

---

## 2. MATRIZ DE RECORRIDOS FUNCIONALES (REC-01 A REC-05)

| Hito | Nombre del Recorrido | Estado | Criterios de Aceptación Verificados | Evidencia Asociada |
|---|---|:---:|---|---|
| **REC-01** | Carga de versión y roles de interfaz | **PASS** | 1. Carga Split con vista dual Mentor/Estudiante simultánea.<br>2. Vista Solo Adulto (Host) sin columna estudiante.<br>3. Vista Solo Estudiante (Cliente) sin columna mentor.<br>4. Inspección de DOM en cliente confirma cero filtración de claves privadas (`Clave privada:` / `dileReview` / `correctText` ausentes).<br>5. Loader identificado por código y traza: `findCanonicalFactoryLesson` en `src/lib/lesson-repository.ts` resolviendo `src/data/lessons/ciencias_7b_oa01_clase02.ts`. | `REC-01_01_Carga_Split_Ciencias_OA01_Clase02.png`<br>`REC-01_02_Vista_Adulto_Ciencias_OA01_Clase02.png`<br>`REC-01_03_Vista_Estudiante_Ciencias_OA01_Clase02.png` |
| **REC-02** | Salida sin logro y recarga no acreditada | **PASS** | 1. Miniquiz respondido con 0/3 aciertos (pantalla dual muestra `0 / 3` y "Sigamos aprendiendo").<br>2. Miniquiz respondido con 1/3 aciertos (pantalla dual muestra `1 / 3` y "Sigamos aprendiendo").<br>3. En cierre, aviso visible: "⚠ Clase pendiente de consolidación: requiere al menos 2/3 aciertos tras reintento para acreditar logro."<br>4. Botón real accionado: "Finalizar sesión (sin acreditar logro)".<br>5. Recarga forzada del navegador: `completedLessons` no incluye `7_ciencias-naturales_oa1_2`. | `REC-02_01_Sin_Logro_0_de_3.png`<br>`REC-02_02_Sin_Logro_1_de_3.png`<br>`REC-02_03_Recarga_No_Acreditada.png` |
| **REC-03** | Recuperación abierta, reintento y logro (2/3) | **PASS** | 1. Despliegue de recuperación abierta en cuaderno físico sin reactivos A-D inventados.<br>2. Estudiante pulsa "Listo, ya resolví la tarea en mi cuaderno" y mentor evalúa "Cumple el criterio (Acierto)".<br>3. Se comprueba que la valoración del mentor **no acredita** por sí sola la lección (`completedLessons` permanece limpio).<br>4. Reintento formal del miniquiz alcanzando 2/3 aciertos.<br>5. Pantalla muestra: "Resultado del miniquiz: 2 de 3", "✓ Criterio de logro acreditado (2/3 aciertos)" y botón habilitado "Finalizar y registrar clase lograda".<br>6. Pulsación de finalización y recarga forzada: logro persiste en `completedLessons`. | `REC-03_01_Flujo_Recuperacion_Apoyo_Cuaderno.png`<br>`REC-03_02_Reintento_Acreditado_2_de_3.png`<br>`REC-03_03_Logro_Final_Ambos_Roles.png` |
| **REC-04** | Restauración de una práctica activa | **PASS** | 1. Sesión activa en etapa `practice`, Caso 1 de 3 (Alex y aumento de estatura).<br>2. Redacción y envío de respuesta en textarea ("El aumento de estatura es un carácter sexual secundario...").<br>3. Pantalla muestra insignia "✓ Respuesta registrada".<br>4. Recarga forzada del navegador (simula cierre de pestaña y reanudación).<br>5. Estado reconstituido fielmente: misma etapa `practice`, caso 1 de 3, insignia registrada y el mismo texto escrito visible, sin regreso espurio a portada. | `REC-04_01_Estado_Antes_De_Pausar.png`<br>`REC-04_02_Estado_Despues_De_Reanudar.png` |
| **REC-05** | Lectura y aislamiento entre clases | **PASS** | 1. Transición controlada a Lengua y Literatura 7B OA03 Clase 01 vía URL.<br>2. Pulsación del botón interactivo "Consultar texto de lectura", abriendo el modal "Consulta de Lectura · Relato en pantalla".<br>3. Contenido íntegro del relato de Isaac Asimov ("Jimmy y Robutt", Párrafos 1 a 3) visible en pantalla.<br>4. Almacenamiento limpio de Lengua sin arrastre de puntajes ni respuestas de Ciencias.<br>5. Cierre de modal y retorno a Ciencias Naturales Clase 02: pureza absoluta, sin textos ni referencias de Lengua. | `REC-05_01_Cambio_A_Lengua_OA03_Clase01.png`<br>`REC-05_02_Retorno_A_Ciencias_OA01_Clase02.png` |

---

## 3. INVENTARIO EXACTO DE ARCHIVOS ENTREGADOS

### A. Capturas Gráficas (13 archivos PNG)
Todas las capturas fueron tomadas en la resolución real de 1440x900 con Microsoft Edge headless mediante CDP.

| N° | Nombre de Archivo | Tamaño (Bytes) | SHA-256 | Hito |
|:---:|---|:---:|---|:---:|
| 1 | `REC-01_01_Carga_Split_Ciencias_OA01_Clase02.png` | 191,359 | `2074367d364ff5d5cd28b4c54c7ceeddf96b42f867e2a56a7b7b105f408a1882` | REC-01 |
| 2 | `REC-01_02_Vista_Adulto_Ciencias_OA01_Clase02.png` | 68,810 | `a170fc569f3372e188e76d2a350936d917138d1e8d156e6d42deff582d169b5f` | REC-01 |
| 3 | `REC-01_03_Vista_Estudiante_Ciencias_OA01_Clase02.png` | 203,729 | `6cf31cff585a0a0642c5e07d81d483d3ef3643422f571ba9d0e26b8b23000c8c` | REC-01 |
| 4 | `REC-02_01_Sin_Logro_0_de_3.png` | 196,241 | `50a25951867cf7b7a6f2489a990de880ab1322e490ceda5bb0feee3a237051b3` | REC-02 |
| 5 | `REC-02_02_Sin_Logro_1_de_3.png` | 195,216 | `4f3e8807895b4c4f6ef96dfe07f2ff98058d1ab25534fd35dc636065109134c6` | REC-02 |
| 6 | `REC-02_03_Recarga_No_Acreditada.png` | 178,008 | `b22b004d062aba9532e4251df3726eca058a67e32a40a3e7cf366166a410f005` | REC-02 |
| 7 | `REC-03_01_Flujo_Recuperacion_Apoyo_Cuaderno.png` | 189,409 | `d4b1d1cf53012869bffd6b769cd2cd838ffb8de939fb81092db38d04fb002b03` | REC-03 |
| 8 | `REC-03_02_Reintento_Acreditado_2_de_3.png` | 195,665 | `935f730e9e91b24d672269117c4dab8299d5efe7f734b05b606fa0b98d312912` | REC-03 |
| 9 | `REC-03_03_Logro_Final_Ambos_Roles.png` | 176,955 | `437a44fdebd0b96220550ffcb38a27672e92ac7ae9cc41941cb8a09494ff9d7e` | REC-03 |
| 10 | `REC-04_01_Estado_Antes_De_Pausar.png` | 234,467 | `e2396d3b0720ec52ce584120c6723df84a644b7d13cb0794e71a39e58c89b0be` | REC-04 |
| 11 | `REC-04_02_Estado_Despues_De_Reanudar.png` | 234,500 | `db611618ff855113254ace158b50e1442513214398e378d98ac05b13c619f727` | REC-04 |
| 12 | `REC-05_01_Cambio_A_Lengua_OA03_Clase01.png` | 163,435 | `be2d515d2d416566b709a640202fd792f09511d36acd7d7274ebc0e37794e8a6` | REC-05 |
| 13 | `REC-05_02_Retorno_A_Ciencias_OA01_Clase02.png` | 191,627 | `5665b033746b327fa3de3595a65e8a5f39b749d6be35f5335f7123bb5669fcb9` | REC-05 |

### B. Código Fuente y Soporte (8 archivos)
- `codigo/execute_real_browser_recs.ts`: Script completo de automatización CDP en Edge.
- `codigo/App.tsx`: Soporte de carga directa por parámetros URL (`view`, `grade`, `subject`, `oa`, `lesson`).
- `codigo/AppContext.tsx`: Inicialización reactiva de `viewMode` y `activeSynchronizedLesson` por URL.
- `codigo/LessonSyncContext.tsx`: Derivación de `effectiveRoomCode` priorizando el parámetro `room` para aislar pruebas.
- `codigo/SynchronizedLessonMaster.tsx`: Renderizado condicional de vistas (Split, Solo Adulto, Solo Estudiante).
- `codigo/TesterBar.tsx`: Barra técnica de auditoría y conmutación de roles y etapas.
- `codigo/lesson-repository.ts`: Servicio canónico de resolución de lecciones y prioridad de fábrica.
- `codigo/lesson-session.ts`: Máquina de estados de sesión pedagógica, cálculo de acreditación y reintentos.

### C. Diffs Bounded contra Commit Base 71413f5 (2 archivos)
- `diffs/App.tsx.diff`: Detección de parámetros URL y selección de lección activa.
- `diffs/AppContext.tsx.diff`: Carga diferida en estado inicial desde `window.location.search`.

### D. Registros Reales de Ejecución (2 archivos)
- `logs/execute_real_browser_recs.log`: Salida íntegra de la prueba en Edge con CDP (Código de salida: 0, 100% PASS).
- `logs/domain_test.log`: Salida íntegra del arnés de verificación de lógica del dominio (17 de 17 controles PASS).

---

## 4. VALIDACIÓN TÉCNICA Y COMPILACIÓN

- **Verificación TypeScript:** `npx tsc --noEmit` ejecutado en `Web Studio Simple`. Código de salida: **0** (cero errores).
- **Arnés de Lógica de Dominio:** `npx tsx scripts/verify_app_isolated_integration.ts`. Código de salida: **0** (17/17 controles superados).
- **Prueba en Navegador Real Edge:** `npx tsx scripts/execute_real_browser_recs.ts`. Código de salida: **0** (5/5 recorridos PASS).

---

## 5. CONCLUSIÓN Y ESTADO NORMATIVO

Habiendo resuelto la totalidad de las discrepancias A a G con evidencia observable, verificable y con correspondencia unívoca entre estados de pantalla, datos persistidos y especificación pedagógica:

Se emite la presente entrega bajo la categoría:
**`CIERRE_FUNCIONAL_PROPUESTO_PARA_REVISION_WORK`**

El estado normativo global de las lecciones del curso 110-7 se mantiene estrictamente en:
**`EN_REVISION`**

*(La aprobación formal definitiva es potestad exclusiva de Walter, otorgada por consola tras el análisis conjunto con Work).*
