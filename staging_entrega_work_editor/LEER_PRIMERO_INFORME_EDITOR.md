# INFORME DE INSUMOS Y PRUEBA ACOTADA DEL EDITOR DE LECCIONES
**EstudioSimple · Curso 110-7 · Fecha de Emisión:** 2026-10-24 15:30 [America/Santiago]  
**Estado Normativo Global:** `EN_REVISION` (Sin cambios en producción, cero push, cero mutaciones)  
**Destinatario:** ChatGPT Work / Walter  
**Autor:** Antigravity (AI Software Engineer A-SDLC)  

---

## 1. Entorno, Versión y Aislamiento

* **Commit Base Vigente:** `89add56cc9135e04d14c3abefbe2c18e25cdce18` (`89add56`).
* **Rama Git:** `work-auditor-titulos-test` (sincronizada y limpia, `working tree clean`).
* **Relación con la Versión del Auditor:** Incluye formalmente el parche de Work del 22 de octubre con **31 pruebas unitarias aprobadas (31/31 pass)** y la corrección puntual de Matemática OA04 Clase 05 (**30/30 lecciones verificadas con código de salida 0**).
* **Condición de Aislamiento:**
  - Todas las inspecciones se realizaron por lectura sobre copia local aislada.
  - La prueba funcional se ejecutó en memoria y almacenamiento simulado (`localStorage` desacoplado) sin escribir en la base de datos Neon PostgreSQL ni en sesiones de producción.
  - Se mantuvo intacto el estado `EN_REVISION`, sin push a GitHub ni despliegues a Railway.
  - **Blindajes Certificados:** Matemática OA01 permanece 100% no intervenida (`PROTEGIDO_NO_INTERVENIDO`), las 30 fuentes Markdown de `LECCIONES_POR_REVISAR/` permanecen congeladas, y los 14 PPTX de `PLANES MAESTROS PRESENTACIONES/` están intactos.

---

## 2. Código Fuente Incluido en el Paquete

Se incluye en la carpeta `codigo/` la totalidad de los archivos solicitados en su ruta original completa (sin recortes):
1. **Componentes y Páginas del Editor:**
   - `Web Studio Simple/src/components/admin/cms/LessonEditorView.tsx` (Componente raíz del editor con 8 pasos, navegación, tabs y previsualización).
   - `Web Studio Simple/src/components/admin/AdminDashboard.tsx` (Dashboard de administración, control de módulos y login).
   - `Web Studio Simple/src/components/lesson/SynchronizedLessonMaster.tsx` (Maestro del aula interactiva).
   - Vistas de Adulto y Estudiante: `AdultLessonView.tsx`, `AdultHeader.tsx`, `AdultSidebar.tsx`, `StudentLessonView.tsx`, `StudentHeader.tsx`, `StudentMiniquizView.tsx`, `StudentRecoveryView.tsx`.
2. **Repositorio, Adaptadores y Exportadores:**
   - `Web Studio Simple/src/lib/lesson-repository.ts` (Carga, jerarquía de prioridad, almacenamiento en `localStorage` y filtros).
   - `Web Studio Simple/src/lib/lesson-adapter.ts` (Transformación isomórfica entre modelo de Generador y modelo de Player).
   - `Web Studio Simple/src/lib/lesson-generator.ts` (Lógica de prompts de arte, ganchos y explicativos).
   - `Web Studio Simple/src/lib/docx-export.ts` (Exportador a formato DOCX oficial).
   - `Web Studio Simple/src/lib/prompt-export.ts` (Exportador de archivo TXT de prompts).
   - `Web Studio Simple/src/lib/video-utils.ts` (Resolución de fuentes de video Cloudflare R2).
   - `Web Studio Simple/src/data/lessons/index.ts` (Catálogo central de lecciones estáticas compiladas).
3. **Tipos y Esquemas:**
   - `Web Studio Simple/src/types/lesson.ts` (Contrato canónico `LessonData`, `PlayerLessonData`, subetapas y reactivos).
4. **Backend y Persistencia:**
   - `server.js` (Servidor Express/Neon para autenticación de familias y pagos Webpay/MercadoPago; se documenta que **no posee** endpoints REST para mutar lecciones).
5. **Auditor Canónico:**
   - `scripts/canonical_lesson_reference.ts`
   - `scripts/audit_structural_rules.ts`
   - `scripts/pipeline_sync_lessons.ts`
   - `scripts/test_canonical_auditor.ts`
   - `docs/auditorias/REFERENCIA_CANONICA_TITULOS_CONTINUIDAD.json`
6. **Configuración y Dependencias:**
   - `package.json`, `package-lock.json`, `tsconfig.json` (Raíz y subproyecto `Web Studio Simple`).

---

## 3. Caso Único: Ciencias Naturales OA01 Clase 02

### Archivos Oficiales y Hashes SHA-256:
* **Fuente Markdown Canónica:**
  - Ruta: `LECCIONES_POR_REVISAR/110-7/Ciencias_Naturales/OA01/CLASE02.md`
  - Tamaño: `31.597 bytes`
  - SHA-256: `5e575811240a5bc216334fc4454b9fa5211f8b4ea7bd4b47093c2edf8022025a`
* **Módulo TypeScript Compilado:**
  - Ruta: `Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase02.ts`
  - Tamaño: `25.881 bytes`
  - SHA-256: `b40ddae3ac8a8a78e58cecfbf3e68ed213f84bbf1e4b8114d8d6f224e2973f5c`
* **Manifiesto Oficial del OA:**
  - Ruta: `LECCIONES/110-7/Ciencias_Naturales/OA01/manifest.json`
  - Tamaño: `2.977 bytes`
  - SHA-256: `c8a37de68f48aa675c2bb2dae5c745a2fa70cd3c20cccc52a3728327888a2e15`

### Recorrido Efectivo de Datos (Paso a Paso):
1. **Fuente Markdown (`CLASE02.md`):** Texto estructurado con 12 secciones, 14 láminas bimodales y 3 reactivos psicométricos.
2. **Transformación al Módulo TS (`ciencias_7b_oa01_clase02.ts`):** El pipeline (`pipeline_sync_lessons.ts`) genera la constante exportada tipada `CIENCIAS_7B_OA01_CLASE02: LessonData` con todas sus etapas serializadas.
3. **Carga en el Repositorio (`lesson-repository.ts`):** Se registra en `ALL_CANONICAL_LESSONS` en `data/lessons/index.ts`.
4. **Carga en el Editor (`LessonEditorView.tsx`):** Invoca `findInjectedLesson('7° Básico', 'Ciencias Naturales', 'OA 1', 2)`.
   - *Hallazgo de Prioridad:* `findInjectedLesson` consulta primero `findCanonicalFactoryLesson`. Si existe en el bundle compilado, retorna la instancia de fábrica.
5. **Persistencia en el Editor:** Al pulsar "Guardar", se invoca `saveCustomPlayerLesson()`, serializando el objeto en `localStorage.getItem('estudiosimple_custom_player_lessons')` bajo la clave `7b_cie_oa1_2`. No se contacta a ningún servidor remoto.
6. **Exportación:** Permite descargar el JSON (`CIENCIAS_7B_OA01_CLASE02_EXPORTADA.json`), los prompts en texto (`CIENCIAS_7B_OA01_CLASE02_PROMPTS_EXPORTADOS.txt`) y el documento Word (`exportSingleLessonToDocx`).
7. **Consumo en el Aula Interactiva (`SynchronizedLessonMaster.tsx`):**
   - **Vista de Adulto (`AdultLessonView.tsx`):** Muestra el objetivo pedagógico, los recordatorios, el tip socioemocional, las respuestas esperadas y la pauta de corrección con las claves del miniquiz.
   - **Vista de Estudiante (`StudentLessonView.tsx`):** Oculta estrictamente las respuestas esperadas y las claves; muestra los 4 bloques de ruta, las diapositivas interactivas, los casos para el cuaderno y las preguntas con selección múltiple en blanco.

---

## 4. Resultados de la Prueba Funcional Acotada (Hitos A a F)

| Hito | Operación Evaluada | Resultado | Evidencia Adjunta |
|---|---|---|---|
| **A** | **Apertura y Registro Inicial** | **CONFORME.** Clase cargada correctamente con título *"Cambios físicos durante la pubertad"*, 12 secciones completas, 14 láminas bimodales y 3 reactivos. | `evidencias/HITO_A_DATOS_CARGADOS_INICIALES.json` |
| **B** | **Guardado Inicial sin Cambios** | **CONFORME.** Hash idéntico antes y después (`hashA === hashB`). Idempotencia demostrada. | `evidencias/HITO_B_COMPARACION_GUARDADO_SIN_CAMBIOS.json` |
| **C** | **Marca Temporal `PRUEBA_EDITOR_WORK`** | **CONFORME.** Se introdujo la marca en `prep.routeToday`. Se confirmó que se persiste en `localStorage` en la clave `7b_cie_oa1_2`. Al concluir se restauró el valor original. *Hallazgo documentado sobre precedencia de loader.* | `evidencias/HITO_C_PERSISTENCIA_MARCA_Y_PRECEDENCIA.json` |
| **D** | **Exportación con Controles Reales** | **CONFORME.** Se generaron y adjuntaron el JSON exportado y el archivo TXT de prompts. Se constata que **no existe** exportador de video en la interfaz. | `caso_CNA_OA01_C02/exportaciones/` |
| **E** | **Reimportación / Recarga** | **LIMITACIÓN IDENTIFICADA (`NO_DISPONIBLE`).** El editor **carece** de función para reimportar desde archivo JSON o DOCX externo hacia la memoria. Solo recarga desde `localStorage` o el bundle de fábrica. | `evidencias/HITO_E_REIMPORTACION_Y_LIMITACIONES.json` |
| **F** | **Matriz de Correspondencia y Privacidad** | **CONFORME.** Correspondencia 100% de campos. Se constata que la clase contiene **exactamente 2 ideas formativas** en el resumen (cumpliendo la instrucción de Work de no forzar 3). Segregación estricta de datos privados adulto vs estudiante. | `caso_CNA_OA01_C02/comparacion/COMPARACION_CAMPOS_Y_PRIVACIDAD.json` |

---

## 5. Enlace con el Auditor Canónico de Work

### Diagnóstico Técnico:
1. **Ausencia de Validación en Tiempo de Guardado:**  
   Al auditar `LessonEditorView.tsx` (`handleSaveLesson`, líneas 423-455) y `lesson-repository.ts` (`saveCustomPlayerLesson`, líneas 283-300), se comprueba que **ninguno importa ni invoca** a `canonical_lesson_reference.ts` ni a `audit_structural_rules.ts`.
2. **Impacto:**  
   Un usuario en el editor podría teóricamente cambiar el título de una clase o su puente de continuidad hacia la siguiente clase y guardarlo en su navegador sin que la interfaz emita ninguna alerta de bloqueo, desalineándose del plan maestro hasta que el auditor externo sea corrido por consola.
3. **Recomendación para la Siguiente Fase:**  
   Conforme a la instrucción de Work, **no se aplicó ninguna corrección en esta fase**. Se recomienda que en la siguiente etapa consensuada se introduzca un middleware preflight (`lesson-validator.ts`) en el botón de guardar que verifique los títulos y continuidad contra `REFERENCIA_CANONICA_TITULOS_CONTINUIDAD.json`.

---

## 6. Declaración de Protecciones e Invariantes

1. **Matemática OA01:** Intacta y protegida (`PROTEGIDO_NO_INTERVENIDO`).
2. **Fuentes Markdown y Manifiestos:** Congelados sin mutaciones.
3. **Presentaciones PPTX:** 14 archivos intactos.
4. **Gobernanza:** No se realizaron commits ni pushes a producción. Estado: `EN_REVISION`.
