# Bitácora: Resolución de Persistencia de Videos y Estado en el Editor de Lecciones

- **Fecha y Hora:** 2026-10-02 17:30 (Hora Local Chile)
- **Autor:** Antigravity (AI Software Engineer)
- **Módulos Modificados:**
  - `Web Studio Simple/src/components/admin/cms/LessonEditorView.tsx`
  - `Web Studio Simple/src/components/admin/AdminDashboard.tsx`
  - `Web Studio Simple/src/lib/lesson-repository.ts`
- **Estado:** Implementado, validado deterministamente con suite de ciclo de vida (100% PASS) y compilado con código de salida 0.

---

## 1. Problema Abordado

El usuario reportó pérdida de datos y desajuste de navegación al interactuar con el Editor Canónico de Lecciones:
1. Al ingresar enlaces de video en la Clase 2 (Paso 2 o Paso 4) y conmutar a la Clase 1, al regresar a la Clase 2 los enlaces desaparecían.
2. Al pulsar "Probar en Aula" (`setViewMode('lesson')`) o desmontar el editor, el sistema forzaba el reinicio a la Clase 1 y al paso inicial de preparación.
3. La carga asíncrona del catálogo curricular en `AdminDashboard` gatillaba una re-ejecución destructiva de `loadLesson()`, purgando las mutaciones en memoria no persistidas.

---

## 2. Solución Técnica Implementada

### A. Auto-guardado Centralizado en Conmutación de Clases y Filtros
- En [LessonEditorView.tsx](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/admin/cms/LessonEditorView.tsx), se implementó la función `handleSwitchLesson(targetNum: number)`. Antes de conmutar `selectedLessonNum`, el estado actual en memoria (`lessonDataRef.current || lessonData`) se persiste inmediatamente en `localStorage` bajo `CUSTOM_PLAYER_LESSONS_KEY` mediante `saveCustomPlayerLesson`, y se sincroniza en el almacén generator (`saveCustomLessonData`).
- Se aplicó el mismo patrón de salvaguarda en los selectores jerárquicos: `handleGradeChange`, `handleSubjectChange` y `handleOAChange`.
- Se incorporó un efecto de limpieza al desmontar el componente (`componentWillUnmount` hook) para garantizar que ante cualquier cambio de vista o desmontaje imprevisto se persista la lección activa en curso.

### B. Persistencia de Navegación del Editor en SessionStorage
- Se vincularon `selectedGrade`, `selectedSubject`, `selectedOAId`, `selectedLessonNum` y `activeStepId` a `sessionStorage` (`estudiosimple_editor_*`).
- Al desmontar el editor (por ejemplo al probar la clase en el aula interactiva) y regresar al panel de administración, el editor recupera exactamente la clase y etapa en la que el usuario estaba trabajando.
- En [AdminDashboard.tsx](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/admin/AdminDashboard.tsx), se persistió `activeModule` y `isAdminAuthenticated` en `sessionStorage`, eliminando la purga prematura al montar para permitir transiciones fluidas entre el aula y el panel docente.

### C. Guardado Contextual Directo y onBlur en Tarjetas Audiovisuales
- En Paso 2 (Video Motivacional) y Paso 4 (Video Explicativo), se añadió el evento `onBlur` en los inputs de URL y campos clave, invocando `handlePersistCurrentVideo()`.
- Se incorporó en cada tarjeta de video una barra contextual con botón directo "Guardar Video Clase [N]" que provee confirmación visual inmediata mediante estado transitorio de 3 segundos (`videoSaveFeedback`).
- Los botones de ayuda rápida "+ Base R2" y "Limpiar" ahora persisten su mutación de forma síncrona en el almacenamiento persistente.

### D. Protección contra Sobrescritura Reactiva del Catálogo Asíncrono
- Se exportaron las funciones canónicas `normalizeGrade`, `normalizeSubject` y `normalizeOa` desde [lesson-repository.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/lesson-repository.ts).
- En `LessonEditorView.tsx`, se introdujo la referencia inmutable `loadedLessonKeyRef`. La función `loadLesson()` evalúa si la clave normalizada (`${grade}_${subject}_${oa}_${lessonNum}`) coincide con la que ya reside en memoria; si coincide y no es un refresco forzado (`forceReload`), la ejecución retorna de inmediato sin destruir el estado de trabajo.

---

## 3. Verificación y Resultados

1. **Suite de Pruebas de Ciclo de Vida (`scripts/test_lesson_lifecycle.ts`):**
   - Validación de existencia de lección inicial: PASS.
   - Persistencia de URLs de video de Clase 2: PASS.
   - Conmutación a Clase 1 y recuperación íntegra de URLs al regresar a Clase 2: PASS.
   - Restablecimiento a versión canónica de fábrica: PASS.
2. **Compilación de Producción:**
   - Comando: `npm run build` en `Web Studio Simple`.
   - Resultado: Código de salida 0 (0 errores de sintaxis o TypeScript, `built in 12.48s`).
