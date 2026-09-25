# Registro de Sesion: Unificacion e Isomorfismo Integral del Editor de Lecciones, el Aula Sincronizada y el Generador DOCX

- Fecha: 2026-09-25
- Hora: 10:50
- Proyecto: EstudioSimple
- Entorno: Web Studio Simple (React + Vite + TypeScript)

## 1. Problema y Diagnostico
Existian tres inconsistencias criticas entre los modulos del sistema:
1. Discrepancia estructural en el Editor de Lecciones: LessonEditorView.tsx utilizaba pestanas horizontales con una secuencia que no reflejaba la barra lateral canonica del aula (AdultSidebar.tsx). La pre-etapa ("Antes de comenzar") estaba mezclada con el Paso 1, y no existia la visualizacion espejada de las 8 etapas.
2. Acoplamiento indebido de "Ruta de Hoy" y "Foco Didactico": El itinerario de la jornada en la tarjeta de encuadre ("Antes de comenzar") sobreescribia o duplicaba el foco formal leido por el mentor en la pantalla de inicio ("La clase de hoy").
3. Ausencia de la fase "REVISAR" en el Editor y en el exportador DOCX: Tras completar el Miniquiz formativo, el aula sincronizada entra en la fase interactiva de revision guiada (donde el mentor dialoga con el texto DILE y el estudiante lee la justificacion formativa en pantalla). Este flujo no era editable en el CMS ni se documentaba en las guias docentes exportadas a DOCX.
4. Presencia de formulas y textos genericos en el generador automatico de lecciones para OAs no curados a mano ("Identificacion de datos", "Alternativa A/B/C").

## 2. Causa Raiz
- En `lesson-generator.ts`, la interfaz `LessonData` no contemplaba el campo desacoplado `routeToday?: string`, obligando a reutilizar `focoDidactico`.
- En `types/lesson.ts` y en `lesson-generator.ts`, la interfaz `QuizQuestion` no contemplaba el campo `dileReview?: string`, por lo que el dialogo socratico del mentor en la fase de revision no existia en el modelo de datos.
- Las funciones de generacion disciplinar (`buildMathContent`, `buildScienceContent`, etc.) recurrian a plantillas de texto estaticas en lugar de consumir las propiedades curriculares reales presentes en `neonCurriculum.json` (`conceptos_clave`, `actividad_aplicar`, `indicadores_evaluacion`, `errores_frecuentes`).
- `docx-export.ts` no habia sido actualizado para estructurar el Paso 6 (Resumen y Estrategia para Pensar) ni para detallar la fase REVISAR dentro del Paso 7.

## 3. Solucion Implementada

### A. Rediseno Isomorfico del Editor de Lecciones (LessonEditorView.tsx)
- Se elimino la navegacion por pestanas horizontales superiores y se reemplazo por una barra lateral visual y funcional identica a `AdultSidebar.tsx`:
  * Contenedor azul marino `#1c3257`, tipografia, isotipo ES amarillo, selector jerarquico de etapas.
  * Secuencia canonica estricta:
    - Pre-etapa: "Antes de comenzar (Preparacion)" (Metadatos, Duracion, Objetivo del Adulto, Clima Emocional y tarjeta independiente RUTA DE HOY).
    - Paso 1: Inicio (Ruta de la Asignatura y Situacion Inicial con Foco Didactico formal para "La clase de hoy").
    - Paso 2: Video Motivacional (Ficha de 7 laminas anime, selector Cloudflare R2 / Stream, reproductor en vivo, DILE antes y DILE despues).
    - Paso 3: Recorrido (Preguntas socraticas guiadas con respuesta esperada, DILE si acierta, DILE si apoya y revelaciones).
    - Paso 4: Video Explicativo (Idea clave disciplinar, 7 laminas explicativas, selector de video y reproductor en vivo).
    - Paso 5: Practica (Ejercicios contextualizados en situaciones reales con trabajo modelado para cuaderno fisico).
    - Paso 6: Resumen (Idea clave de sintesis, parrafo de cierre y estrategia para pensar).
    - Paso 7: Miniquiz y REVISAR (Preguntas de seleccion multiple, tarjeta explicita de la Fase REVISAR con dialogo `dileReview` para el mentor y `fixExplain` para la pantalla del alumno, mas bucle de recuperacion adaptativa).
    - Paso 8: Cierre (Pregunta de sintesis final, metacognicion y mensaje de celebracion).
- Cajas pedagogicas con el mismo estilo visual del aula interactiva: PromptBox (verde, turquesa, naranja), ExpectedAnswerBox, PrivateBox y tarjetas de alumno.

### B. Desacoplamiento de "Ruta de Hoy" y "Foco Didactico"
- En `lesson-generator.ts` se anadieron los campos opcionales `routeToday?: string;` y `estrategia?: string | Array<{ number: number; title: string; desc: string }>;`.
- En `lesson-adapter.ts` se establecio el mapeo diferencial:
  * `prep.routeToday = genLesson.routeToday || genLesson.focoDidactico;`
  * `route.dileObjective = genLesson.focoDidactico;`
- En las lecciones canonicas `matematica_7b_oa01_clase01.ts` y `clase02.ts`, se incorporo `dileReview` a cada pregunta del miniquiz para mantener paridad con el nuevo flujo.

### C. Sustancia Curricular Real MINEDUC
- En `lesson-generator.ts`, se integro `neonCurriculum.json` importado directamente.
- Se implementaron las funciones auxiliares `findCurriculumItem` y `parseCurriculumItem` para extraer de forma tipada:
  * `conceptos_clave`
  * `actividad_aplicar`
  * `indicadores_evaluacion`
  * `errores_frecuentes`
- Se actualizaron los 5 constructores disciplinares (`buildMathContent`, `buildScienceContent`, `buildHistoryContent`, `buildLanguageContent`, `buildEnglishContent`) para que los contextos de indagacion, las preguntas socraticas, los ejercicios de practica en cuaderno y las alternativas del miniquiz se formulen a partir de situaciones reales del programa oficial chileno.
- Se corrigio el error en la evaluacion del miniquiz: el campo `correct` ahora almacena la cadena exacta de la opcion correcta en lugar de la letra aislada "A".

### D. Exportador DOCX Reestructurado (docx-export.ts)
- Se alineo el documento con la secuencia canonica de 8 pasos mas pre-etapa.
- Se integro la seccion formal del Paso 6: Resumen y Estrategia para Pensar.
- En el Paso 7 se incluyo el detalle explicito de la "Fase REVISAR (Revision Guiada Pregunta a Pregunta)", documentando para cada item:
  * Pregunta y alternativas
  * Respuesta correcta
  * Dialogo del mentor (DILE) para invitar a verbalizar el razonamiento
  * Justificacion pedagogica formativa para el estudiante
  * Seccion del bucle de recuperacion adaptativa.

### E. Persistencia e Inmutabilidad en Repositorio
- Al presionar "Guardar Cambios" o "Probar en Aula" en `LessonEditorView.tsx`, los datos se guardan via `saveCustomLessonData` y se adaptan a traves de `adaptGeneratorLessonToPlayer`.
- Al ingresar al aula, `activeSynchronizedLesson` alimenta a `SynchronizedLessonMaster`, garantizando que todas las modificaciones persistan y sean ejecutables de inmediato.

## 4. Archivos Modificados
- `Web Studio Simple/src/types/lesson.ts`
- `Web Studio Simple/src/lib/lesson-generator.ts`
- `Web Studio Simple/src/lib/lesson-adapter.ts`
- `Web Studio Simple/src/lib/docx-export.ts`
- `Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase01.ts`
- `Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase02.ts`
- `Web Studio Simple/src/components/lesson/adult/AdultLessonView.tsx`
- `Web Studio Simple/src/components/admin/cms/LessonEditorView.tsx`

## 5. Verificacion y Validacion
- Verificacion de TypeScript:
  * Comando: `npx tsc --noEmit` en `Web Studio Simple/`
  * Resultado: Codigo de salida 0 (cero errores de compilacion).
- Verificacion de consistencia:
  * 8 etapas y pre-etapa coinciden 1 a 1 en orden, nombres y numeracion entre el Editor y el Aula.
  * Fase REVISAR operativa en el Editor, en la vista del Adulto y en el exportador DOCX.
  * Desacoplamiento total entre `routeToday` (itinerario de encuadre) y `focoDidactico` (formalizacion de clase).
  * Contenido generado derivado de `neonCurriculum.json` sin textos de plantilla abstracta.

## 6. Fase 2: Unificacion Total de Fuente de Verdad, Persistencia Bidireccional, Prompt .txt y DOCX Alternativa 2
- Fecha de ejecucion: 2026-09-25 (Fase 2)
- Criterios cumplidos:
  1. Fuente Unica de Verdad (LessonData / PlayerLessonData universal):
     - `lesson-adapter.ts` cuenta con `adaptPlayerLessonToGenerator` y `adaptGeneratorLessonToPlayer` con fidelidad total.
     - `lesson-repository.ts` implementa `saveCustomPlayerLesson`, `resetCustomPlayerLesson`, `isPlayerLessonCustomized`.
     - `findInjectedLesson` y `getInjectedPackage` priorizan en primer lugar las ediciones del usuario en `localStorage` (clave `estudiosimple_custom_player_lessons`), luego las lecciones canonicas de fabrica (`MATEMATICA_7B_OA01_CLASE02`, etc.) y solo como fallback paquetes sinteticos.
  2. Isomorfismo Total en Editor:
     - Etapa "Antes de comenzar": campos editables para `objetivoAdulto`, `routeToday`, `climaEmocional` y la lista de los 7 recordatorios pedagogicos del mentor (`reminders`), con inputs individuales, eliminacion, anadido y boton de restauracion.
     - Paso 1 (Inicio): Desglosado en Sub-bloque A (Ruta de la Asignatura con `routeIntro` y vista previa de los 4 bloques), Sub-bloque B (La Clase de Hoy con `focoDidactico` y 3 tarjetas editables de foco para el estudiante `keyQuestions`: titulo y subtitulo), y Sub-bloque C (Situacion Inicial con `dialogo`, `pregunta`, `respEsperada`, `pistaSocratica`, `climaEmocional` y opciones formativas).
     - Boton "Guardar Cambios" y "Probar en Aula" conectados al almacenamiento persistente y activando de inmediato el modo sincronizado (`setViewMode('lesson')`).
  3. Boton "Descargar Prompt (.txt)":
     - Implementado en `prompt-export.ts` y anadido en la cabecera del editor.
     - Descarga archivo .txt estructurado con metadatos curriculares, directivas anime 16:9, modulo 1 (7 laminas hook), modulo 2 (7 laminas explicativo) y modulo 3 (guion pedagogico del mentor).
  4. Exportacion DOCX Formato Cuadernillo Doble (Alternativa 2):
     - Implementado en `docx-export.ts`.
     - Seccion 1: Guia del Mentor / Apoderado (Portada institucional, Ficha curricular, 8 pasos con recuadros pedagogicos, Miniquiz con respuestas correctas y mediacion formativa).
     - Salto de pagina obligatorio (`pageBreakBefore: true`).
     - Seccion 2: Cuadernillo de Trabajo del Estudiante (Encabezado con Nombre/Fecha/Curso, situacion detonante pautada, recuadro de recta numerica o esquema mudo para completar a mano, 3 desafios con lineas de desarrollo y miniquiz sin respuestas marcadas para resolucion autonoma).
  5. Compilacion TypeScript exitosa (`npx tsc --noEmit` -> 0 errores).
