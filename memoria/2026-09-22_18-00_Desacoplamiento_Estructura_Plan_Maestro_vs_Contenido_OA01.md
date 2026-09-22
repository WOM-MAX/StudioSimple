# Desacoplamiento Estructura Plan Maestro vs Contenido OA01

Fecha: 2026-09-22 18:00
Ambiente: Web Studio Simple (React + Vite + TypeScript)

## Contexto y Diagnostico
Al revisar la grabacion comparativa entre el prototipo maestro y la aplicacion EstudioSimple, se identifico que la implementacion previa copio literalmente el contenido disciplinar del prototipo (Matematica 7mo Basico OA 01: Numeros Enteros, submarinos, termometros, -20m, graficos de posicion y movimiento) dentro de los componentes visuales de la aplicacion (`AdultLessonView.tsx`, `StudentLessonView.tsx`), asi como fallbacks acoplados en el adaptador (`lesson-adapter.ts`).

El objetivo de esta intervencion fue desacoplar completamente la estructura canonica de 26 etapas del plan maestro del contenido especifico del OA01, de modo que la aplicacion ejecute la misma mecanica pedagogica para cualquier objetivo de aprendizaje (Matematica, Ciencias Naturales, Historia, Lengua y Literatura, Ingles) leyendo los datos dinamicamente desde `lessonData`, mientras el OA01 mantiene sus datos curriculares enriquecidos e intactos en `src/data/lessons/matematica_7b_oa01_clase01.ts`.

## Cambios Implementados

### 1. Definicion de Tipos (`src/types/lesson.ts`)
- Se extendio la interfaz `LessonData` con campos opcionales que permiten gobernanza pedagogica desacoplada sin romper contratos existentes:
  - `ambientAudioSrc?: string`: Audio ambiental condicional por leccion.
  - `interactive?: { type: 'thermo' | 'general' | 'none'; title?: string; [key: string]: any }`: Tipo de dinamica interactiva en etapas `thermo` y `thermoMeaning`.
  - `summaryText?: string`: Sintesis textual de formalizacion.
  - `reasoning?: { title?: string; dileIntro?: string; question: string; expectedAnswer: string; context1: { label: string; value: string; desc: string }; context2: { label: string; value: string; desc: string }; successFeedback: string; supportFeedback: string; revealText: string }`: Comparacion socratica entre dos situaciones.
  - `challenge?: { title?: string; question: string; expectedAnswer: string; item1: { label: string; tag: string }; item2: { label: string; tag: string }; successFeedback: string; supportFeedback: string }`: Desafio breve de profundizacion.
  - `strategy?: { title?: string; dileIntro?: string; steps: Array<{ number: number; title: string; desc: string }> }`: Pasos metodologicos de analisis.
  - `closure?: { congratulations?: string; nextClassPreview?: string }`: Cierre y anticipacion de la siguiente leccion.
  - `conversationContext?: string`: Contexto de la conversacion guiada.
  - En `route`: campo opcional `keyQuestions?: Array<{ label: string; sub: string }>`.
  - En `hook`: campos opcionales `title?: string`, `titulo?: string`, `focusPoints?: string[]`.
  - En `formalization`: campos opcionales `title?: string`, `concept?: string`, `summary?: string`, `ideaClave?: string`.

### 2. Preservacion de Datos Curriculares de Matematica 7B OA01 (`src/data/lessons/matematica_7b_oa01_clase01.ts`)
- Se inyectaron explicitamente en el objeto de datos los campos `interactive`, `summaryText`, `reasoning`, `challenge`, `strategy` y `closure`.
- Los datos curriculares de OA01 se conservan 100% integros, incluyendo sus videos en Cloudflare R2 y sus infografias.

### 3. Adaptador de Lecciones (`src/lib/lesson-adapter.ts`)
- Se eliminaron todos los textos y menciones hardcodeadas al submarino, termometro y numeros enteros en los generadores genericos.
- Si el OA corresponde a Matematica 7B OA01 Clase 1, se asignan sus datos detallados; para cualquier otro OA (o para OAs generados), se construyen fallbacks neutrales y pertinentes a la disciplina segun el `focoDidactico`, `situacionIntro` y `paso4_explicativo`.

### 4. Vista del Adulto / Mentor (`src/components/lesson/adult/AdultLessonView.tsx`)
- Se desacoplaron todas las etapas del mentor:
  - `routeOverview`: Mapea dinamicamente sobre `lessonData.route.blocks` y muestra el nombre de la asignatura real.
  - `thermo` y `thermoMeaning`: Si `interactive?.type === 'thermo'` muestra la tarjeta del termometro; de lo contrario, muestra la exploracion de la situacion y punto de referencia general.
  - `hook`: Muestra `lessonData.hook.dileIntro`, instrucciones dinamicas y reproductor de video sincronizado.
  - `conversationIntro`: Lee `lessonData.hook.dileAfterVideo` o mensaje generico.
  - `formalization`: Lee `lessonData.formalization.dileIntro`, `concept` y reproduce video formal.
  - `summary`: Lee `lessonData.summaryText` o `summaryIdeas`.
  - `practiceIntro`: Muestra el contexto de cada situacion desde `lessonData.practice[session.practiceIndex].context`.
  - `reasoningIntro` y `reasoning`: Lee `lessonData.reasoning` (titulo, dileIntro, pregunta, respuestas esperadas y retroalimentaciones).
  - `challenge`: Lee `lessonData.challenge` dinamicamente.
  - `strategy`: Mapea sobre los pasos de `lessonData.strategy.steps`.
  - `closing` y `completed`: Lee `lessonData.closure` o felicitacion generica con el titulo de la proxima clase.
  - Componente de video del adulto (`AdultVideoPlayer`): Si `src` esta vacio o no existe, presenta un recuadro estetico indicando que es un momento guiado por el mentor, sin mostrar elementos rotos ni errores de carga.

### 5. Vista del Estudiante (`src/components/lesson/student/StudentLessonView.tsx`)
- Se removio el audio hardcodeado `/media/ambiente-submarino.mp3`; ahora solo se carga `<audio>` si `lessonData.ambientAudioSrc` esta definido.
- Se removieron todas las imagenes de fondo hardcodeadas (`/visuals/submarino-20.png`, `/visuals/mision-portada.png`, `/visuals/posicion-movimiento.png`, `/visuals/mision-cierre.png`), reemplazandolas por tarjetas con degradados neutros en azul marino profundo.
- Se desacoplo `routeOverview` para iterar sobre `lessonData.route.blocks`.
- Se desacoplo `routeToday` para mostrar el titulo y objetivo de la leccion actual.
- En `thermo` y `thermoMeaning`, se renderiza `<StudentInteractiveThermo />` unicamente si `lessonData.interactive?.type === 'thermo'`; para otras materias se muestra la situacion inicial y referencia general.
- En `hook` y `formalization`, los textos, puntos de observacion y titulos se leen dinamicamente de `lessonData.hook` y `lessonData.formalization`.
- En `SyncedStudentVideo`: Si `src` esta vacio, se renderiza un estado vacio con icono e indicaciones, evitando reproductores rotos.
- En `summary`, se renderizan las tarjetas a partir de `lessonData.summaryIdeas`.
- En `practiceIntro`, se lee el contexto de cada practica ordinal.
- En `reasoningIntro`, `reasoning`, `challenge` y `strategy`, se muestran los contenidos dinamicos desde `lessonData`.

## Verificacion y Resultados
1. Grep global: Se verifico que no quedan referencias a `/visuals/` en componentes de la aplicacion (solo en los metadatos de datos curados de OA01).
2. Grep global: Cero referencias a `/media/ambiente-submarino.mp3` o rutas de video del prototipo local en el codigo fuente.
3. Compilacion TypeScript: `npx tsc --noEmit` finalizo con codigo de salida 0 (cero errores de tipos).
4. Compilacion de Produccion: `npm run build` finalizo con codigo de salida 0 (1628 modulos transformados, dist generado exitosamente en 15.33s).
