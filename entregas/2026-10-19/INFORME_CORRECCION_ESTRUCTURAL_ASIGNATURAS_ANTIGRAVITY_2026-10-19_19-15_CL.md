# INFORME DE CORRECCIÓN ESTRUCTURAL COMPARTIDA — TODAS LAS LECCIONES Y ASIGNATURAS
**EstudioSimple · Repositorio Curricular Oficial**  
**Fecha y Hora:** 2026-10-19 19:15 [America/Santiago]  
**Estado:** `EN_REVISION` (Aprobación exclusiva de Walter tras revisión conjunta con ChatGPT Work)  
**Dictamen Técnico:** `CORRECCIÓN ESTRUCTURAL COMPLETA Y VERIFICADA EN NAVEGADOR (EDGE CDP)`  

---

## 1. RESUMEN EJECUTIVO Y ANTECEDENTES
A partir de la evidencia en video grabada por Walter (`Grabación 2026-10-19 182830.mp4`) en **Ciencias Naturales 7° Básico, OA01, Clase 02**, se identificó un conjunto de desajustes estructurales en los componentes compartidos de la App y en la parametrización de los módulos de datos:
1. **Desfase asimétrico de contadores ("Pregunta 2 de 1" vs "2 de 2"):** AdultLessonView forzaba conteos fijos de 2 preguntas (`postIndex === 0 ? updateSession({ postIndex: 1 }) : setStage(...)`), mientras la lección solo definía 1 pregunta de comprobación. El estudiante mostraba `Pregunta 2 de 1` y el adulto mostraba `Pregunta 2 de 2`.
2. **Contaminación de recursos literarios en Ciencias Naturales:** Se mostraba el botón *"Consultar texto de lectura"* que abría un relato lunar de ciencia ficción (*Jimmy y Robutt*) debido a un fallback predeterminado (`DEFAULT_PARAGRAPHS`) en `StudentReadingResourceCard.tsx`. Ciencias Naturales utiliza organizadores y casos científicos contextuales, no relatos literarios.
3. **Ideas importantes desincronizadas:** Se anunciaba *"Tres ideas importantes"* pero se mostraban dos, requiriendo un botón intermedio para revelar una idea inexistente.
4. **Títulos temáticos genéricos ("Una situación"):** Las clases 02 a 06 de Ciencias, Historia e Inglés presentaban el texto de propósito de diapositiva (*"Una situación"*) en lugar de los títulos curriculares oficiales de Work.
5. **Continuidad de lecciones incompleta:** `nextLessonTitle` vacío generaba tarjetas con *"Próxima clase: "* en blanco, y la clase 6 no anunciaba formalmente el cierre del Objetivo de Aprendizaje.

---

## 2. ARQUITECTURA DE LA SOLUCIÓN ESTRUCTURAL APLICADA

### A. Desacoplamiento Dinámico de Preguntas y Contadores
- **Archivos:** `StudentLessonView.tsx` y `AdultLessonView.tsx`.
- **Lógica implementada:** Los contadores y los avances ahora se calculan dinámicamente con base en la longitud real de los arrays:
  - Total previo: `totalPre = lessonData.preQuestions?.length || 1`
  - Total posterior: `totalPost = lessonData.postQuestions?.length || 1`
  - Contadores: `Pregunta {index + 1} de {total}` en ambas vistas.
  - Avance del adulto: `if (session.postIndex < totalPost - 1) { advance } else { setStage('postSummary') }`.
  - **Resultado:** Erradicación del error *"Pregunta 2 de 1"*. Si una lección tiene 1 pregunta, ambas pantallas muestran `Pregunta 1 de 1` y avanzan al resumen en un solo clic.

### B. Regla Estructural de Recursos y Aislamiento de Lectura
- **Archivos:** `StudentReadingResourceCard.tsx`, `StudentLessonView.tsx`, `lengua_7b_oa03_clase01.ts`.
- **Lógica implementada:**
  - Se eliminó completamente la constante ajena `DEFAULT_PARAGRAPHS` de `StudentReadingResourceCard.tsx`. Si una lección no declara párrafos legítimos, el componente retorna `null`.
  - Se formalizó la regla curricular: **Ciencias Naturales y Matemática no usan texto de lectura narrativo** (`isCienciasOrMatematica = true`).
  - El botón *"Consultar texto de lectura"* y su modal solo se renderizan si `hasLegitimateReadingResource = !isCienciasOrMatematica && Boolean(declaredParagraphs.length > 0)`.
  - Los párrafos auténticos de *Jimmy y Robutt* fueron confinados de forma exclusiva al módulo `lengua_7b_oa03_clase01.ts` dentro de `interactive.paragraphs`.
  - **Resultado:** Ciencias Naturales queda 100% limpia de botones y textos literarios; Lengua conserva su lectura legítima; Matemática permanece blindada.

### C. Dinamización Honesta de Ideas Importantes
- **Archivos:** `StudentLessonView.tsx`, `AdultLessonView.tsx`.
- **Lógica implementada:**
  - Título adaptativo: `${totalIdeas} ideas importantes` (o título curricular específico si está declarado).
  - El ciclo de presentación avanza únicamente hasta `totalIdeas`. Al alcanzar la última idea real disponible, el botón muestra directamente *"Continuar al miniquiz"* sin anunciar ni transicionar por ideas fantasma.
  - Para Ciencias Clase 02, se actualizaron las ideas pedagógicas con los conceptos auténticos de la fuente (`Dimensión física` y `Ritmos individuales`).

### D. Restauración de Títulos Temáticos y Continuidad Curricular
- **Script ejecutado:** `scripts/restore_titles_and_continuity.ts`.
- **Archivos actualizados:** 23 módulos de datos en `Web Studio Simple/src/data/lessons/` (Ciencias 02-06, Historia 02-06, Inglés 02-06, Lengua 02-06).
- **Lógica implementada:**
  - Se extrajeron los títulos oficiales desde la cabecera H1 de las fuentes Markdown de Work (`CLASE0X.md`).
  - Se configuró la cadena de continuidad en `nextLessonTitle`.
  - En la vista del estudiante, si `nextLessonTitle` está vacío se oculta el contenedor; si es la clase 6 (final del OA), se despliega un mensaje formal de cierre: *"¡Felicitaciones! Has completado las 6 clases de este Objetivo de Aprendizaje."*

---

## 3. RESULTADOS DE LA AUDITORÍA PERMANENTE (36 LECCIONES)
Se ejecutó el script permanente `scripts/audit_structural_rules.ts` sobre la totalidad de las 36 clases del repositorio, evaluando 5 reglas estructurales:
- **Regla 1 (Aislamiento de Recursos):** 36/36 PASS (0% de fuga de textos entre asignaturas).
- **Regla 2 (Sincronía de Contadores):** 36/36 PASS (Cero discrepancias o totales cableados).
- **Regla 4 (Títulos Temáticos Oficiales):** 36/36 PASS (0 ocurrencias de *"Una situación"* como título de lección).
- **Regla 5 (Continuidad Curricular):** 36/36 PASS (Puentes hacia la siguiente clase y cierre de OA consistentes).
- **Regla 3 (Integridad de Resumen - Paso 8):**
  - **13 lecciones:** `PASS / OK` (poseen 3 ideas completas).
  - **23 lecciones:** `PENDIENTE_CONTENIDO_WORK`. La UI las presenta con honestidad y dinamismo (2 ideas reales), pero se registra como pendiente de autoría curricular para que ChatGPT Work redacte la 3ra idea cuando corresponda.

---

## 4. EVIDENCIA DE COMPROBACIÓN EN NAVEGADOR REAL (EDGE CDP)
Se ejecutó el script automatizado `scripts/verify_structural_fixes_browser.ts` sobre Microsoft Edge en modo CDP Headless (puerto 9223):

| Caso de Prueba | Asignatura y Clase | Capturas Generadas | Estado | Verificación Específica |
| :--- | :--- | :--- | :---: | :--- |
| **TEST 1** | Ciencias Naturales 7B OA01 Clase 02 | `CNA02_01_Split_Inicio_Titulo_Oficial.png`<br>`CNA02_02_Recorrido_Sin_Texto_Lectura.png`<br>`CNA02_03_Ideas_Importantes_Dinamicas.png`<br>`CNA02_04_Cierre_Proxima_Clase_Oficial.png` | **PASS** | Título oficial visible; botón de lectura ausente en recorrido y práctica; 2 ideas reales sin paso fantasma; próxima clase visible en cierre. |
| **TEST 2** | Lengua y Literatura 7B OA03 Clase 01 | `LYL01_01_Lectura_Legitima_Preservada.png` | **PASS** | Botón *"Consultar texto de lectura"* activo legítimamente; relato de Asimov accesible. |
| **TEST 3** | Matemática 7B OA01 Clase 01 | `MAT01_01_Protegida_Sin_Regresiones.png` | **PASS** | Lección canónica 100% blindada; cero regresiones. |

---

## 5. VALIDACIÓN TÉCNICA Y COMPILACIÓN (DoD)
- **Compilación TypeScript / Vite:** `npm run build` en `Web Studio Simple` finalizó con **código de salida 0**, generando los bundles de producción sin errores de tipos (`tsc && vite build`).
- **Integridad de Artefactos:** Todos los archivos generados tienen tamaño mayor a cero y hashes SHA-256 consistentes.

---

## 6. PAQUETE ENTREGADO Y HASHES DE VERIFICACIÓN (SHA-256)

### Archivos Oficiales en `EstudioSimple_Repositorio_Curricular/ARREGLOS_SINCRONIZACION_ANTIGRAVITY/INFORMES_Y_EVIDENCIAS/`:
1. **Informe Markdown:**  
   `INFORME_CORRECCION_ESTRUCTURAL_ASIGNATURAS_ANTIGRAVITY_2026-10-19_19-15_CL.md`
2. **Evidencia e Inventario JSON:**  
   `EVIDENCIA_CORRECCION_ESTRUCTURAL_ASIGNATURAS_ANTIGRAVITY_2026-10-19_19-15_CL.json`  
   *SHA-256:* `e5a06b591ef82a4f24b4f2d2cdbeb35f7b81a0a39d43f15448ffd4d914b2bcc8`
3. **Paquete ZIP Completo:**  
   `PARCHE_Y_CAPTURAS_CORRECCION_ESTRUCTURAL_ASIGNATURAS_2026-10-19_19-15_CL.zip`  
   *Tamaño:* 893689 bytes  
   *SHA-256:* `0acff1597b65f85ce09900602ce52df00c43e1e3ea318b6360dc2a6b1a2630ec`

### Contenido Interno del Paquete ZIP:
- `capturas/`: Las 6 capturas de pantalla PNG generadas en la sesión de Edge CDP.
- `codigo/`: Los componentes React actualizados (`StudentLessonView`, `AdultLessonView`, `StudentReadingResourceCard`, `LessonSyncContext`), módulos de datos y scripts de verificación.
- `diffs/`: Diferenciales Git (`diff_StudentLessonView.txt`, `diff_AdultLessonView.txt`, etc.) y estado del repositorio.
- `auditoria/`: Matriz completa de las 36 lecciones en JSON (`MATRIZ_AUDITORIA_ESTRUCTURAL_36_LECCIONES.json`) y evidencia de navegador.
- `logs/`: Bitácora y resumen de ejecución técnica.

---

## 7. GOBERNANZA Y ESTADO NORMATIVO
De acuerdo con las directivas de **AGENTS.md**:
- **Estado Global:** `EN_REVISION`.
- **Prohibición de Despliegue/Push:** Queda estrictamente prohibido realizar despliegues automáticos a producción o modificar el estado a `APROBADA`.
- **Aprobación Final:** La aprobación formal y el despliegue corresponden exclusivamente a Walter tras la revisión conjunta con ChatGPT Work.
