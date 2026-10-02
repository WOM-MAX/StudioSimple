# Bitacora: Diagnostico y Plan de Persistencia de Videos en Editor de Lecciones

- **Fecha y Hora:** 2026-10-02 13:50 (Hora Local Chile)
- **Autor:** Antigravity (AI Software Engineer)
- **Modulo Afectado:** Editor Canónico de Lecciones (`LessonEditorView.tsx`), Repositorio de Lecciones (`lesson-repository.ts`), Panel de Administracion (`AdminDashboard.tsx`).
- **Estado:** Diagnostico completado, plan de accion estructurado y prompt `/goal` formulado para ejecucion autonoma en la tarde.

---

## 1. Contexto del Requerimiento

El usuario reporta una falla critica de experiencia y persistencia en el Editor de Lecciones:
> "Sabes que pasa coloco los videos de la leccion 2 en el Editor de lecciones, despues me pasa a la leccion 1. Vuelvo a la leccion dos y los enlaces desaparecen. Analiza y haz un plan"

---

## 2. Diagnostico y Analisis Tecnico Objetivo

Tras inspeccionar el codigo fuente en [LessonEditorView.tsx](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/components/admin/cms/LessonEditorView.tsx), [AdminDashboard.tsx](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/components/admin/AdminDashboard.tsx) y [lesson-repository.ts](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/lib/lesson-repository.ts), se identificaron tres causas tecnicas concatenadas:

### Causa 1: Mutacion Volatil en Memoria sin Auto-Guardado al Conmutar de Leccion
- En [LessonEditorView.tsx](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/components/admin/cms/LessonEditorView.tsx#L1650-L1665) y [L2295-L2305](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/components/admin/cms/LessonEditorView.tsx#L2295-L2305), los inputs de URL para el Video Motivacional (`hook.videoSrc`) y Video Explicativo (`formalization.videoSrc`) unicamente modifican el estado local de React (`setLessonData`).
- La persistencia fisica en `localStorage` (`CUSTOM_PLAYER_LESSONS_KEY`) solo ocurre al hacer clic en el boton superior "Guardar Cambios" ubicado en la linea [542](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/components/admin/cms/LessonEditorView.tsx#L542).
- Cuando el usuario conmuta de leccion pulsando el boton de otra clase (por ejemplo, la clase 1 en la linea [676](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/components/admin/cms/LessonEditorView.tsx#L676)), se ejecuta `setSelectedLessonNum(num)` de forma inmediata sin auto-guardar ni advertir sobre cambios pendientes.
- El cambio en `selectedLessonNum` gatilla de inmediato la funcion `loadLesson()` (linea [310](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/components/admin/cms/LessonEditorView.tsx#L310)), la cual carga la leccion seleccionada y sobreescribe por completo el objeto `lessonData` en memoria.
- Al volver posteriormente a la leccion 2, `loadLesson()` busca la leccion en `localStorage` bajo la clave `7_mat_oa1_2`. Al no haberse ejecutado el guardado previo, la clave no existe en `CUSTOM_PLAYER_LESSONS_KEY` y el sistema recurre a la fabrica canonica de solo lectura (`MATEMATICA_7B_OA01_CLASE02` en [lesson-repository.ts](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/lib/lesson-repository.ts#L234)), restaurando los enlaces en blanco originales.

### Causa 2: Estado de Leccion no Persistente (`selectedLessonNum` reinicia a 1)
- En [LessonEditorView.tsx](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/components/admin/cms/LessonEditorView.tsx#L121), el estado del numero de leccion esta declarado como:
  ```tsx
  const [selectedLessonNum, setSelectedLessonNum] = useState<number>(1);
  ```
- No existe ningun mecanismo de almacenamiento de sesion (`sessionStorage`) para recordar la ultima leccion editada.
- Si el usuario pulsa "Probar en Aula" (`setViewMode('lesson')`), o si la aplicacion desmonta el componente del editor y vuelve a montarlo al regresar desde el visor interactivo, el componente se inicializa nuevamente desde cero con `selectedLessonNum = 1`, forzando la visualizacion de la leccion 1.

### Causa 3: Re-ejecucion Asincrona de `loadLesson` por Actualizacion del Catalogo
- En [AdminDashboard.tsx](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/components/admin/AdminDashboard.tsx#L351-L364), el catalogo se carga de forma asincrona mediante un `fetch('/data/curriculum_catalog.json')`.
- En el primer render, `catalog` es un arreglo vacio `[]`. Cuando la peticion HTTP concluye, `AdminDashboard` llama a `setCatalog(data)` y pasa la nueva lista como prop a `<LessonEditorView catalog={catalog} />`.
- En [LessonEditorView.tsx](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/components/admin/cms/LessonEditorView.tsx#L132-L141), el efecto dependiente de `propCatalog` actualiza `localCatalog`, lo que recalcula `availableOAs`, cambia `currentOA`, regenera la referencia de `loadLesson` y dispara el efecto de inicializacion de la linea [312](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/components/admin/cms/LessonEditorView.tsx#L312).
- Si esta respuesta asincrona finaliza mientras el usuario esta escribiendo o pegando enlaces en la leccion 2, `loadLesson()` se ejecuta en segundo plano y purga cualquier modificacion en memoria no guardada.

---

## 3. Plan de Accion Estructurado

1. **Auto-Guardado al Conmutar entre Clases / Lecciones:**
   - Crear una funcion centralizada `handleSelectLesson(targetNum: number)` en [LessonEditorView.tsx](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/components/admin/cms/LessonEditorView.tsx) que, si existen cambios pendientes en `lessonData`, ejecute de forma transparente `saveCustomPlayerLesson` antes de modificar `selectedLessonNum`.
2. **Persistencia del Indice de Leccion y OA Activo en SessionStorage:**
   - Vincular `selectedLessonNum`, `selectedOAId`, `selectedGrade` y `selectedSubject` a `sessionStorage` para que, ante desmontajes por navegacion a "Probar en Aula" o recargas del navegador, el editor restaure exactamente la clase que el usuario estaba editando (en este caso, la Clase 2).
3. **Boton Contextual y Auto-Guardado Directo en las Tarjetas de Video:**
   - En el Paso 2 (Video Motivacional) y Paso 4 (Video Explicativo), incorporar un evento `onBlur` que persista inmediatamente los campos `videoSrc` y `videoUrl` en `localStorage`.
   - Incorporar en cada bloque de video un boton directo "Guardar Video de esta Clase" con notificacion de confirmacion visual inmediata, sin forzar al usuario a desplazarse al inicio del editor.
4. **Proteccion de `loadLesson` contra Sobrescrituras del Catalogo:**
   - En [LessonEditorView.tsx](file:///c:/Proyectos/StudioSimple/Web%20Studio%20Simple/src/components/admin/cms/LessonEditorView.tsx), aislar la inicializacion del catalogo para que no re-ejecute `loadLesson()` si el OA y la leccion seleccionados ya estan montados en memoria y coinciden con el estado actual.
5. **Validacion y Cero Regresiones:**
   - Compilar el proyecto con `npm run build` en `Web Studio Simple` comprobando codigo de salida 0.
   - Ejecutar prueba determinista en TypeScript (`npx tsx scripts/test_lesson_lifecycle.ts`) para garantizar que la persistencia, conmutacion entre clase 1 y 2, y recuperacion de URLs funcione de forma integra.

---

## 4. Prompt Autosuficiente para /goal (Sesion de la Tarde)

A continuacion se registra el prompt oficial listo para ser ejecutado con `/goal`:

```text
/goal Ejecutar de inicio a fin la resolucion integral del sistema de persistencia, auto-guardado y conmutacion de lecciones en el Editor de Lecciones de EstudioSimple con 100% de autonomia y sin interrupciones intermedias.

DIRECTIVAS DE AUTONOMIA:
1. Prohibido solicitar aprobacion, hacer preguntas o pausar para pedir interaccion al usuario antes de concluir.
2. Prohibido ejecutar busquedas recursivas en la raiz del disco o scripts improvisados de Python: usa rutas exactas y TypeScript (npx tsx).
3. Delimitacion de mision: el entregable es exclusivamente codigo funcional de la aplicacion en TypeScript/React que resuelva de manera determinista la retencion de enlaces de video y el flujo de navegacion entre lecciones.
4. Circuito de proteccion: maximo 4 intentos de autocorreccion ante fallos de compilacion antes de cambiar de enfoque o revertir cambios infructuosos.
5. Control de bloqueos: considerar posibles procesos de Node o Windows bloqueando archivos (EBUSY) antes de operaciones destructivas.
6. Punto de control: verificar estado de Git antes de mutaciones extensas para preservar reversibilidad.
7. Doble validacion: validar compilacion con codigo 0 (npm run build) y comprobar mediante script en TypeScript que el ciclo guardar -> conmutar leccion -> regresar retenga intactos los enlaces de video.
8. Persistencia: registrar los cambios tecnicos en la bitacora de memoria/ si corresponde.
9. Resuelve cualquier detalle tecnico o de UX aplicando los estandares de AGENTS.md y documenta la decision en el reporte final.

TAREA A EJECUTAR:
1. En src/components/admin/cms/LessonEditorView.tsx:
   - Implementar persistencia de estado de navegacion (selectedGrade, selectedSubject, selectedOAId, selectedLessonNum) en sessionStorage para que al desmontar el editor (por ejemplo al usar "Probar en Aula") se retome exactamente la misma leccion y no vuelva forzosamente a la leccion 1.
   - Implementar funcion handleSwitchLesson(num) en el selector de lecciones (botones 1 al total de clases) que auto-guarde la leccion actual en curso antes de cargar la leccion de destino, impidiendo la destruccion del estado en memoria.
   - Blindar los inputs de video en Paso 2 (Video Motivacional, hook.videoSrc/videoUrl) y Paso 4 (Video Explicativo, formalization.videoSrc/videoUrl) agregando guardado automatico al desenfocar (onBlur) y un boton de guardado contextual directo dentro de cada tarjeta con feedback visual.
   - Evitar que la resolucion asincrona del catalogo (propCatalog / localCatalog) re-ejecute destructivamente loadLesson() cuando el usuario ya tenga cargada una leccion activa.
2. En src/lib/lesson-repository.ts:
   - Asegurar que saveCustomPlayerLesson persista inmediatamente las modificaciones en CUSTOM_PLAYER_LESSONS_KEY y que findInjectedLesson recupere con prioridad absoluta dicha clave normalizada.
3. Crear un script de prueba scripts/test_lesson_lifecycle.ts y ejecutarlo con npx tsx para verificar que guardar en leccion 2, cambiar a leccion 1 y regresar a leccion 2 devuelva los enlaces configurados sin perdida.
4. Eliminar el script de prueba una vez validado y ejecutar npm run build para verificar compilacion limpia sin errores.

ARCHIVOS Y COMPONENTES AFECTADOS:
- src/components/admin/cms/LessonEditorView.tsx
- src/lib/lesson-repository.ts
- scripts/test_lesson_lifecycle.ts (temporal)

CRITERIOS DE ACEPTACION Y DEFINITION OF DONE (DoD):
1. Codigo modular, tipado estricto (unknown > any), sin errores de sintaxis ni regresiones.
2. Validacion local exitosa ejecutando: npm run build --prefix "Web Studio Simple" (codigo de salida 0).
3. Prueba de ciclo de vida con npx tsx aprobada.
4. Entregar el informe de resultados en un unico mensaje final al terminar todo el flujo.
```
