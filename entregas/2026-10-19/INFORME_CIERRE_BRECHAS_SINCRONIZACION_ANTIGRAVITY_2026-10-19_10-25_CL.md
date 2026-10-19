# INFORME DE CIERRE DE BRECHAS DE SINCRONIZACIÓN Y PRUEBA FUNCIONAL
**EstudioSimple · Versión 110-7 (Copia Aislada Staging)**  
**Fecha y hora:** 2026-10-19 10:25 [America/Santiago]  
**Estado normativo:** `EN_REVISION` (Aprobación formal exclusiva de Walter tras análisis con Work; no publicado a producción)

---

## 1. RESUMEN EJECUTIVO Y RESOLUCIÓN DE DISCREPANCIAS (A - G)

En cumplimiento estricto de la instrucción emitida por Work para el cierre acotado de evidencia e integración funcional en la App aislada (`Web Studio Simple`, curso 110-7), se ejecutó una verificación funcional completa interactuando directamente con los controles reales en Microsoft Edge automatizado vía Chrome DevTools Protocol (CDP), con servidor local Vite en `http://127.0.0.1:5173`.

A continuación se detalla la resolución técnica y observable de cada una de las discrepancias identificadas:

| Discrepancia | Clasificación | Causa Real Comprobada | Cambio Realizado | Resultado Observable en Evidencia |
|---|---|---|---|---|
| **A. REC-01** (Roles y Split) | `DEFECTO_Y_EVIDENCIA_CORREGIDA` | La carga por URL no aislaba salas (`roomCode`), provocando lectura de estados antiguos del relay. | Corrección en `LessonSyncContext.tsx` priorizando `&room=` sobre PIN previo. Captura en modo `&mode=split`, `&mode=adult` y `&mode=student`. | 3 capturas con tamaños y hashes únicos (`REC-01_01`, `02`, `03`). Vista adulto sin columna estudiante; vista estudiante sin columna adulto ni filtración de claves privadas (`Clave privada:` ausente del DOM). |
| **B. REC-02** (0/3 y 1/3 sin logro) | `EVIDENCIA_POR_COMPLETAR` | En el script anterior, las pulsaciones se ejecutaban sincrónicamente sin aguardar la actualización del estado de React, impidiendo habilitar y disparar el botón "Enviar respuestas". | Secuenciación con esperas de 350ms por reactivo en `execute_real_browser_recs.ts`. | Capturas `REC-02_01` (muestra `0 / 3` y "Sigamos aprendiendo") y `REC-02_02` (muestra `1 / 3` y "Sigamos aprendiendo"). `REC-02_03` muestra recarga forzada tras pulsar "Finalizar sesión (sin acreditar logro)" con `completedLessons` sin la clase `7_ciencias-naturales_oa1_2`. |
| **C. REC-03** (Recuperación y 2/3) | `EVIDENCIA_POR_COMPLETAR` | La sala de relay preservaba el estado previo no acreditado de la sesión anterior al recargar. | Invocación de reintento en sala aislada `room=rec03_logro`, confirmando tarea de cuaderno por el alumno y valoración de acierto del mentor (la cual no acredita por sí sola). Al alcanzar 2/3, se habilita "Finalizar y registrar clase lograda". | `REC-03_01` muestra tarea abierta en cuaderno. `REC-03_02` muestra "Resultado del miniquiz: 2 de 3", "✓ Criterio de logro acreditado (2/3 aciertos)" y botón "Finalizar y registrar clase lograda". `REC-03_03` muestra "¡Clase 2 completada con éxito!" y `completedLessons` persiste el logro tras recarga. |
| **D. REC-04** (Restauración práctica activa) | `EVIDENCIA_POR_COMPLETAR` | La captura previa se tomó en pantalla de cierre. | La prueba se posicionó en `stage: 'practice'`, caso 1 de 3 (Alex y caracteres sexuales secundarios). El estudiante envió respuesta escrita en el textarea ("Tu respuesta para tu mentor:"). | `REC-04_01` muestra la práctica activa con el texto y la insignia "✓ Respuesta registrada". `REC-04_02` muestra la pantalla tras recarga forzada en el navegador: conserva la misma etapa `practice`, misma pregunta y el mismo texto redactado sin retorno espurio a la portada. |
| **E. REC-05** (Lectura Asimov y aislamiento) | `EVIDENCIA_POR_COMPLETAR` | Las capturas anteriores documentaban solo las portadas de las asignaturas sin abrir el modal. | Se interactuó con el control real "Consultar texto de lectura", abriendo el modal completo en pantalla con el relato de Isaac Asimov. Retorno a Ciencias verificado sin contaminación. | `REC-05_01` muestra el modal desplegado "Consulta de Lectura · Relato en pantalla" con el texto de Jimmy y su perro robot Robutt (Párrafos 1, 2 y 3). `REC-05_02` muestra el retorno limpio a Ciencias Naturales Clase 02 con almacenamiento y pantalla 100% aislados. |
| **F. Entregables incompletos** | `EVIDENCIA_POR_COMPLETAR` | El paquete anterior contenía solo imágenes PNG sin los scripts, diffs ni logs. | Se generó la estructura estándar con 4 carpetas: `capturas/`, `codigo/`, `diffs/`, `logs/`. | Los archivos completos están integrados en el ZIP y documentados en el JSON oficial. |
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
Todas las capturas fueron tomadas en la resolución nativa de 1440x900 con Microsoft Edge headless mediante Chrome DevTools Protocol (CDP).

| N° | Nombre de Archivo | Tamaño (Bytes) | SHA-256 | Hito |
|:---:|---|:---:|---|:---:|
| 1 | `REC-01_01_Carga_Split_Ciencias_OA01_Clase02.png` | 339.094 | `0f9fe781af7f6e7fc1acc13841a5def6977296337fec106ffed7152d04cf4a1c` | REC-01 |
| 2 | `REC-01_02_Vista_Adulto_Ciencias_OA01_Clase02.png` | 102.015 | `c82e4787f7aae5070129326398bc16255f45716ca1cb27f479cbab9efa60f98f` | REC-01 |
| 3 | `REC-01_03_Vista_Estudiante_Ciencias_OA01_Clase02.png` | 427.971 | `4352d6c0c489bbe00f9196466a5dbf06ec7378e7cc3e246c16473df596ef75e2` | REC-01 |
| 4 | `REC-02_01_Sin_Logro_0_de_3.png` | 332.178 | `d5e855939c698457a0dbd70a1596f3d662f47bfb9fcaa46854d49d1d0315f320` | REC-02 |
| 5 | `REC-02_02_Sin_Logro_1_de_3.png` | 331.109 | `b2ee9347ad002270cd2a49b46c90481e5351a3e1853d57ae7cd5a372a8f5faeb` | REC-02 |
| 6 | `REC-02_03_Recarga_No_Acreditada.png` | 312.002 | `773f8bd63f02ef8de8259a149f792c61452d5576c702921e6dff208038488cf2` | REC-02 |
| 7 | `REC-03_01_Flujo_Recuperacion_Apoyo_Cuaderno.png` | 291.048 | `471f5a7339377232151141e344851e61fac4dc4b20763f0a4fd951373406c320` | REC-03 |
| 8 | `REC-03_02_Reintento_Acreditado_2_de_3.png` | 327.620 | `42dfccbf1130f26f8eda58dfe08d2ac776ae9bd7237384fa96f5760dd6e1e9a2` | REC-03 |
| 9 | `REC-03_03_Logro_Final_Ambos_Roles.png` | 308.969 | `8195f901d4b1cfb026d8a8c41b3b409bfa5ad23b776bc24befc7c28d330be1d4` | REC-03 |
| 10 | `REC-04_01_Estado_Antes_De_Pausar.png` | 372.591 | `b9837b6aaa79264cf07e8c199df20297bc6beb4f1163f22c45d93c83f689842b` | REC-04 |
| 11 | `REC-04_02_Estado_Despues_De_Reanudar.png` | 372.471 | `6e7b76fa8987302c101e16318e5d95128cd8ad97bfef1216f58ba579e3fb88c2` | REC-04 |
| 12 | `REC-05_01_Cambio_A_Lengua_OA03_Clase01.png` | 265.039 | `8cee6f6a52886777286e65c32dc58181d2a62ea2ac1d6d98a5b8545e196eb7ef` | REC-05 |
| 13 | `REC-05_02_Retorno_A_Ciencias_OA01_Clase02.png` | 372.781 | `8f18429410072db8063407560e3cf41a2f5da57905a30112324b4bd62642e971` | REC-05 |

### B. Código Fuente y Soporte (8 archivos)
- `codigo/execute_real_browser_recs.ts`: Script completo de automatización CDP en Edge.
- `codigo/App.tsx`: Soporte de carga directa por parámetros URL (`view`, `grade`, `subject`, `oa`, `lesson`).
- `codigo/AppContext.tsx`: Inicialización reactiva de `viewMode` y `activeSynchronizedLesson` por URL sin bloqueo de login.
- `codigo/LessonSyncContext.tsx`: Derivación de `effectiveRoomCode` priorizando el parámetro `room` para aislar pruebas.
- `codigo/SynchronizedLessonMaster.tsx`: Renderizado condicional de vistas (Split, Solo Adulto, Solo Estudiante).
- `codigo/TesterBar.tsx`: Barra técnica de auditoría y conmutación de roles y etapas.
- `codigo/lesson-repository.ts`: Servicio canónico de resolución de lecciones y prioridad de fábrica.
- `codigo/lesson-session.ts`: Máquina de estados de sesión pedagógica, cálculo de acreditación y reintentos.

### C. Diffs Bounded contra Commit Base 71413f5 (2 archivos)
- `diffs/App.tsx.diff`: Detección de parámetros URL y selección de lección activa.
- `diffs/AppContext.tsx.diff`: Carga diferida en estado inicial desde `window.location.search` y preservación de sesión.

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
