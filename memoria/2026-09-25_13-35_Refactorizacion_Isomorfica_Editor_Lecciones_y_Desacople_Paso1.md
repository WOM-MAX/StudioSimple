# Memoria de Continuidad: Refactorizacion Isomorfica Total del Editor de Lecciones (LessonEditorView.tsx)

Fecha: 2026-09-25 13:35 CLT
Ambiente: Produccion / Local Vite - TypeScript

## 1. Problema Detectado y Diagnostico
Anteriormente, existia una asimetria funcional y de estructura de datos entre el Aula Sincronizada y el Editor de Lecciones:
1. El Editor operaba sobre el modelo legacy `GeneratorLessonData`, perdiendo o comprimiendo campos que el Aula Sincronizada requeria (`LessonData` / `PlayerLessonData`).
2. En el Paso 1 (Inicio), la conversion intermedia mezclaba la pregunta socrática de la sub-etapa 4 (`reference.question`: "¿qué número divide la recta numérica entre positivos y negativos?") con la respuesta esperada de la sub-etapa 3 (`situation.expectedAnswer`: "Hacia la izquierda"), generando colisiones pedagógicas donde el mentor veia una respuesta no congruente con la pregunta formulada.
3. El Paso 1 en el Aula consta de 4 pantallas secuenciales (`routeOverview`, `routeToday`, `situation`/`thermo`, `reference`/`thermoMeaning`), mientras que en el editor aparecia como un bloque condensado sin division clara.
4. Faltaban modulos pedagogicos clave en el Editor que si estaban presentes en las lecciones canónicas del Aula:
   - Paso 2 (hook): `focusPoints` (3 puntos de foco del estudiante) y `hazInstruction`.
   - Paso 3 (preQuestions): `conversationContext` (contexto de apertura socrática).
   - Paso 4 (formalization): `summaryText` (síntesis de cierre de video) y `postQuestions` (preguntas de comprobacion post-video).
   - Paso 5 (practice): `reasoning` (Comparemos dos situaciones) y `challenge` (Desafío breve).
   - Paso 6 (strategy): `strategy.steps` (3 pasos algorítmicos) y `summaryIdeas` (3 ideas clave de síntesis).
5. Las funciones de exportacion a DOCX y Prompt (.txt) requerian alineacion para reflejar exactamente estas 4 sub-etapas y los modulos pedagogicos completos.

## 2. Solucion Implementada

### A. Adopcion Nativa de LessonData en LessonEditorView.tsx
- El estado principal del editor paso de `GeneratorLessonData` a `LessonData` (`PlayerLessonData`).
- La carga de lecciones se realiza directamente con `findInjectedLesson(selectedGrade, selectedSubject, currentOA.oa, selectedLessonNum)`, priorizando el almacenamiento local del usuario y las lecciones canonicas de fabrica.
- El guardado persiste de forma bidireccional mediante `saveCustomPlayerLesson(...)` bajo la clave `'estudiosimple_custom_player_lessons'` y paralelamente en el repositorio legacy para retrocompatibilidad.
- El boton "Probar en Aula" transfiere directamente el objeto `lessonData` a `setActiveSynchronizedLesson(lessonData)` y activa `setViewMode('lesson')`.

### B. Desglose Isomorfico del Paso 1 (Inicio) en 4 Sub-etapas Canonicas
1. Sub-etapa 1: Nuestra Ruta de la Asignatura (`routeOverview`):
   - Edicion de `route.dileIntro`.
   - Edicion de los 4 grandes bloques tematicos oficiales de la disciplina (`route.blocks`: number, title, subtitle).
2. Sub-etapa 2: La Clase de Hoy (`routeToday`):
   - Edicion de `route.dileObjective`.
   - Edicion de las 3 tarjetas de foco de la pantalla del alumno (`route.keyQuestions`: label, sub).
3. Sub-etapa 3: Situacion Inicial de Exploracion (`situation` / `thermo`):
   - Edicion del DILE detonante (`situation.dilePrompt`).
   - Edicion de la respuesta esperada a la situacion (`situation.expectedAnswer`: "Hacia la izquierda").
   - Pista socratica (`situation.socraticHint`) y recomendacion de clima emocional (`situation.emotionalTip`).
   - Lista editable de opciones formativas del mentor (`situation.options`: label, kind, feedbackText).
4. Sub-etapa 4: Comprendamos la Respuesta (`reference` / `thermoMeaning`):
   - Edicion del DILE de formalizacion del punto de referencia central (`reference.dilePrompt`).
   - Edicion del PREGUNTALE al estudiante (`reference.question`: "Dime con tus palabras: ¿qué número divide la recta numérica entre positivos y negativos?").
   - Edicion de la respuesta esperada (`reference.expectedAnswer`: "El número cero").
   - Pista socratica (`reference.socraticHint`), feedback si acierta (`reference.feedbackSuccess`) y feedback si necesita apoyo (`reference.feedbackSupport`).

### C. Exposicion Completa de Modulos en Pasos 2 a 6
- Paso 2: Integracion de `hook.focusPoints` (3 puntos de observacion) y `hook.hazInstruction`.
- Paso 3: Integracion de `conversationContext` para la apertura de la conversacion socrática.
- Paso 4: Integracion de `formalization.hazInstruction`, `summaryText` y las 2 preguntas de comprobacion `postQuestions` con contexto, respuesta esperada, feedback y revelacion.
- Paso 5: Integracion del modulo `reasoning` ("Comparemos dos situaciones") con contextos duales y el modulo `challenge` ("Desafío breve").
- Paso 6: Integracion de los 3 pasos de la estrategia (`strategy.steps`) y las 3 ideas estructuradas de sintesis (`summaryIdeas`).

### D. Actualizacion de Exportaciones (DOCX Doble y Prompt .txt)
- `src/lib/docx-export.ts`:
  - Seccion 1 (Guia del Mentor): Renderiza las 4 sub-etapas del Paso 1 sin mezclas, incluye `focusPoints`, `hazInstruction`, `conversationContext`, `summaryText`, `postQuestions`, `reasoning`, `challenge`, `strategy.steps` y `summaryIdeas`.
  - Seccion 2 (Cuadernillo Estudiante): Incluye ejercicios aplicados de `reasoning` y `challenge` con lineas de desarrollo para impresion.
  - Se subsano el guardado de arrays opcionales evitando fallos de tipado.
- `src/lib/prompt-export.ts`:
  - `buildLessonPromptText`: Separa explicitamente las 4 sub-etapas del Paso 1 e incorpora todos los modulos adicionales en los bloques correspondientes.

### E. Alineacion de Interfaces en lesson-generator.ts
- Se declararon como opcionales en la interfaz `LessonData` de `lesson-generator.ts` los campos `routeBlocks`, `reference`, `focusPoints`, `hazInstruction`, `conversationContext`, `summaryText`, `postQuestions`, `reasoning`, `challenge`, `strategy` y `summaryIdeas`, asegurando tipado estricto en todo el flujo de adaptadores.

## 3. Archivos Modificados
- `Web Studio Simple/src/components/admin/cms/LessonEditorView.tsx`
- `Web Studio Simple/src/lib/lesson-adapter.ts`
- `Web Studio Simple/src/lib/lesson-generator.ts`
- `Web Studio Simple/src/lib/docx-export.ts`
- `Web Studio Simple/src/lib/prompt-export.ts`

## 4. Validacion
- `npx tsc --noEmit`: 0 errores de compilacion.
- `npm run build`: Generacion exitosa del bundle de produccion (0 errores).
