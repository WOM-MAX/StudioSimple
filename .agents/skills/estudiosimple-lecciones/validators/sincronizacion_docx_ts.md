# Protocolo de Sincronización entre DOCX Oficial y Código TypeScript

---

## 1. Principio Rector

El archivo DOCX aprobado en `LECCIONES/110-<curso>/<Asignatura>/<OA>/` es la **fuente pedagógica oficial inmutable**. 

El código TypeScript ubicado en `Web Studio Simple/src/data/lessons/` (ej: `matematica_7b_oa01_clase01.ts`) es la **representación interactiva de la lección para la aplicación web**. 

**Regla Mandatoria:** TypeScript debe subordinarse estrictamente al DOCX oficial. Queda prohibido que TypeScript contenga ejercicios, explicaciones, diálogos o preguntas de evaluación distintos a los aprobados en el DOCX.

---

## 2. Procedimiento de Verificación de Correspondencia

Para comprobar que el código TypeScript está debidamente sincronizado con el DOCX oficial de la lección, se deben verificar los siguientes 5 puntos de control:

### Control 1: Identidad del Objetivo de Aprendizaje
- El campo `objective` o descripción de meta en el archivo `.ts` debe corresponder de forma textual o conceptualmente exacta al objetivo formal declarado en la portada y modelamiento del DOCX.

### Control 2: Identidad de los Personajes y Diálogos
- Los nombres, intervenciones y notas pedagógicas de los personajes juveniles en el guion interactivo de TypeScript deben emanar de las tablas escena por escena del DOCX.

### Control 3: Identidad Numérica y Conceptual de los Ejemplos
- Los datos numéricos, enunciados, variables y desarrollo de los ejercicios modelados en TypeScript deben coincidir con los ejemplos resueltos de la lección completa en el DOCX.

### Control 4: Identidad de los Reactivos de Evaluación (Alternativas y Distractores)
- La pregunta de evaluación formativa en TypeScript debe tener:
  * El mismo enunciado que la lámina de evaluación del DOCX.
  * La misma alternativa correcta con idéntica justificación.
  * Los mismos distractores con la misma retroalimentación diagnóstica definida en la tabla psicométrica del DOCX.

### Control 5: Registro en el Manifiesto
- En `manifest.json`, la sección `resolucion_rutas_typescript` debe registrar la ruta relativa de cada archivo `.ts` vinculado y declarar explícitamente el estado de sincronización (`sincronizado` o `brecha_detectada`).

---

## 3. Resolución de Discrepancias

Si se detecta una diferencia entre el archivo DOCX y el código TypeScript:
1. **El DOCX prevalece:** Salvo instrucción explícita de corrección de Walter, el código TypeScript debe ser ajustado inmediatamente para replicar con precisión el contenido del DOCX oficial.
2. Tras la corrección en TypeScript, se ejecuta `npx tsc --noEmit` para certificar que el código continúe compilando con código de salida 0.
3. Se actualiza el campo `sincronizacion_con_docx` en `manifest.json`.
