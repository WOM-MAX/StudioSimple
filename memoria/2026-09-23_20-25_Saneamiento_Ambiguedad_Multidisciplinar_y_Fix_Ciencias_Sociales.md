# Registro de Continuidad: Saneamiento de Ambiguedad Multidisciplinar y Correccion de Deteccion Curricular

Fecha: 2026-09-23 20:25
Autor: Agente Antigravity (A-SDLC)

## 1. Problema Detectado

El usuario identifico y documento mediante capturas de pantalla dos problemas criticos en las lecciones de las demas asignaturas (Lengua y Literatura, Historia y Geografia, e Ingles):

1. **Ambiguedad pedagogica extrema en el panel del apoderado:**
   - En Lengua y Literatura: la respuesta esperada y el boton de evaluacion mostraban un texto abstracto tipo rubrica docente: *"Una respuesta que identifique el conflicto, la emocion del hablante o el tema central del texto."*
   - En Historia y Geografia: mostraban: *"Una respuesta que reconozca las necesidades de subsistencia, la organizacion comunitaria o los ideales de la epoca."*
   - En Ingles: mostraban: *"An answer identifying the main action, setting, or characters in English or Spanish."*
   El apoderado no tiene que estudiar ni adivinar que debe responder el estudiante; las preguntas, respuestas esperadas y botones de evaluacion deben ser concretos, explicitos y detallados al 100%.

2. **Error cruzado de disciplina grafica (Captura Historia vs Ciencias):**
   Al cambiar a Historia, Geografia y Ciencias Sociales (7° Basico OA 2 Clase 1), el panel del apoderado y del estudiante mostraban "Las 4 Dimensiones de la Sexualidad Humana" (grafico y titulo de Ciencias Naturales) y el tema de color verde esmeralda.

## 2. Causa Raiz

1. **Ambiguedad:** En `lesson-generator.ts` y en `injected_lessons_7b.json`, las funciones generadoras utilizaban plantillas genericas de evaluacion docente ("Una respuesta que...") sin opciones estructuradas (`options`). Al adaptarse en `lesson-adapter.ts`, el fallback generaba un boton con el texto integro de esa frase generica.
2. **Conflicto de Deteccion en "Ciencias Sociales":** En `subject-theme.ts`, `lesson-repository.ts`, `lesson-adapter.ts` y `StudentDisciplineGraphic.tsx`, la condicion de Ciencias Naturales evaluaba `norm.includes('cien')` ANTES que Historia. Como "Historia, Geografia y Ciencias Sociales" contiene la subcadena "cien", el sistema clasificaba Historia como Ciencias Naturales, asignandole el tema verde y el componente de Dimensiones de la Sexualidad.

## 3. Solucion Implementada

1. **Prioridad y Proteccion de Asignaturas:**
   - En `subject-theme.ts`, `lesson-repository.ts`, `lesson-adapter.ts` y `StudentDisciplineGraphic.tsx`, se evaluo Historia (`hist`, `geog`, `soc`) ANTES que Ciencias.
   - Para Ciencias Naturales se condiciono estrictamente a `(clean.includes('cien') && !clean.includes('soc')) || clean.includes('nat')`.

2. **Creacion de Lecciones Curadas de Cero Ambiguedad:**
   - `Web Studio Simple/src/data/lessons/lengua_7b_oa03_clase01.ts`: Leccion de alta fidelidad basada en las 6 etapas del viaje del heroe, con preguntas precisas, respuestas esperadas concretas, botones de evaluacion claros para el apoderado y ejercicios reales de aplicacion en el cuaderno.
   - `Web Studio Simple/src/data/lessons/historia_7b_oa02_clase01.ts`: Leccion sobre el fin del nomadismo y la revolucion agricola (Paleolitico vs Neolitico), almacenamiento de excedentes en ceramica, domesticacion de especies y sedentarismo en el Creciente Fertil.
   - `Web Studio Simple/src/data/lessons/ingles_7b_oa09_clase01.ts`: Leccion bilingue sobre Setting y Characters con conectores de tiempo ("First", "Then", "Finally") y patron de oraciones en tiempo pasado en el cuaderno.

3. **Registro y Enrutamiento en Repositorio:**
   - Se exportaron todas las lecciones curadas en `src/data/lessons/index.ts`.
   - Se registraron en `findInjectedLesson` dentro de `src/lib/lesson-repository.ts` para que la barra de pruebas rapida (`Mat`, `Len`, `Cie`, `His`, `Ing`) devuelva inmediatamente estas lecciones precisas.

4. **Saneamiento del Generador y del JSON:**
   - En `lesson-generator.ts`, se actualizaron `buildScienceContent`, `buildHistoryContent`, `buildLanguageContent` y `buildEnglishContent`, eliminando las frases genericas e incorporando el arreglo `options` con etiquetas y retroalimentaciones directas.
   - Se ejecuto un script de saneamiento sobre `public/data/injected_lessons_7b.json`, actualizando 29 lecciones para que contengan respuestas esperadas y botones de evaluacion especificos.

## 4. Archivos Modificados / Creados

- `src/data/lessons/lengua_7b_oa03_clase01.ts` (Nuevo)
- `src/data/lessons/historia_7b_oa02_clase01.ts` (Nuevo)
- `src/data/lessons/ingles_7b_oa09_clase01.ts` (Nuevo)
- `src/data/lessons/index.ts` (Modificado)
- `src/lib/lesson-repository.ts` (Modificado)
- `src/lib/subject-theme.ts` (Modificado)
- `src/lib/lesson-adapter.ts` (Modificado)
- `src/lib/lesson-generator.ts` (Modificado)
- `src/components/lesson/student/StudentDisciplineGraphic.tsx` (Modificado)
- `public/data/injected_lessons_7b.json` (Modificado)

## 5. Verificacion

- `npx tsc --noEmit`: Ejecutado exitosamente con codigo de salida 0.
- `npm run build`: Compilacion de produccion con Vite exitosa en 27.35s sin errores.
