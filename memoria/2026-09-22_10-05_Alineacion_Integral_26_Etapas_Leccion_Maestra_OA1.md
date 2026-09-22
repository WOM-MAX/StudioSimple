# Bitácora de Sesión: Alineación Integral de las 26 Etapas Canónicas con la Lección Maestra (OA 1 Matemática 7° Básico)

Fecha: 2026-09-22 10:05  
Contexto: EstudioSimple · Aula Sincronizada Dual (Mentor / Estudiante) · 7° Básico Matemática OA 1

---

## 1. Objetivo y Alcance

Alinear de forma determinista y exhaustiva la Clase 1 de Matemática de 7° Básico (OA 1) de Web Studio Simple con la especificación de referencia del archivo maestro `PROTOTIPO/prototipo/app/page.tsx` (correspondiente a la lección desplegada en producción).

Requisitos clave aplicados:
- Cero abreviaciones, cero resúmenes y cero omisiones de textos, diálogos (DILE, PREGÚNTALE, HAZ), pistas socráticas, criterios y alternativas de respuesta.
- Implementación y sincronización de las 26 micro-etapas canónicas de la lección:
  `landing`, `catalog`, `cover`, `prep`, `routeOverview`, `routeToday`, `thermo`, `thermoMeaning`, `hook`, `conversationIntro`, `preQuestions`, `formalization`, `postIntro`, `postQuestions`, `summary`, `practiceIntro`, `practice`, `reasoningIntro`, `reasoning`, `challenge`, `strategy`, `practiceSummary`, `miniquiz`, `results`, `review`, `recoveryIntro`, `recovery` y `closing`.
- Barra lateral de 8 pasos canónicos en `AdultSidebar.tsx` gobernada por la función `stepFor(stage)`.
- Ramificación adaptativa en razonamiento: autonomía conduce a desafío (`challenge`); requerimiento de apoyo conduce a estrategia guiada (`strategy`).
- Miniquiz formativo con revisión pregunta a pregunta (1 de 3, 2 de 3, 3 de 3) y activación de ítems de recuperación adaptativa (`recoveryItems`).
- Gestión de audio ambiental marino (`ambiente-submarino.mp3`) con reproductor en estudiante y silenciamiento en mentor.

---

## 2. Modificaciones de Arquitectura y Código

### A. Tipos y Estado de Sesión (`Web Studio Simple/src/types/lesson.ts`)
- Se extendió el tipo `LessonStage` para admitir el conjunto completo de 26 etapas canónicas.
- Se actualizaron las interfaces de `GuidedItem`, `QuizQuestion`, `RecoveryItem` con tipado estricto para pistas socráticas, criterios de evaluación y explicaciones.
- Se amplió `LessonSessionState` con los campos del prototipo:
  - `video`: `{ playing: boolean, time: number }`
  - `reviewQueue`: `number[]`
  - `reviewIndex`: `number`
  - `recoveryItems`: `RecoveryItem[]`
  - `recoveryIndex`: `number`
  - `recoveryVisible`: `boolean`
  - `recoveryAnswer`: `string | null`
  - `supportCount`: `number`
  - `reasoningIndependent`: `boolean | null`
  - `challengeCompleted`: `boolean`

### B. Datos Curriculares y Didácticos (`Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase01.ts`)
- Se transcribieron con exactitud literal los textos del archivo maestro:
  - `preQuestions` (3 preguntas de conversación inicial: submarino, termómetro, ascensores).
  - `postQuestions` (3 preguntas post-formalización: significado de negativos, punto de referencia cero, distancia y valor absoluto).
  - `practice` (3 ejercicios guiados en cuaderno: altitud/profundidad, temperatura extrema, balance financiero).
  - `summaryIdeas` (3 ideas fuerza sobre el conjunto de los enteros).
  - `mini` (3 preguntas de evaluación formativa con alternativas completas y retroalimentación didáctica).
  - `recovery` (3 ítems de recuperación adaptativa para nivelación inmediata).

### C. Contexto de Sincronización (`Web Studio Simple/src/context/LessonSyncContext.tsx`)
- Se sincronizó `INITIAL_LESSON_SESSION` con los valores por defecto del prototipo maestro.
- Se actualizó la firma de `setFeedback` para admitir el argumento opcional `reveal: boolean`.

### D. Componentes de Mentor y Estudiante
- `AdultSidebar.tsx`:
  - Se vinculó la función canónica `stepFor(stage)` para mapear las 26 etapas en los 8 pasos principales.
  - Se habilitó la navegación hacia atrás en pasos ya superados y se bloqueó en etapas de evaluación final.
- `Cards.tsx`:
  - Se actualizó `PromptBox` para renderizar etiquetas dinámicas (DILE, PREGÚNTALE, HAZ, o etiquetas compuestas).
  - Se integró soporte para visualización de respuestas reveladas en `FeedbackBanner`.
  - Se exportaron `EmotionalTipBox` y `SocraticTipBox`.
- `AdultLessonView.tsx`:
  - Se implementaron las pantallas correspondientes a cada una de las 26 etapas.
  - Se incluyó `AdultVideoPlayer` silenciado para monitorear el progreso del video sin duplicar audio.
  - Se incorporó la lógica de bifurcación de razonamiento: autónomo avanza a `challenge`, con apoyo avanza a `strategy`.
- `StudentLessonView.tsx`:
  - Se implementó la vista del alumno para las 26 etapas.
  - Se añadió `SyncedStudentVideo` con sincronización de estado y `useRef` para control de video.
  - Se implementó reproducción de audio de fondo submarino (`/media/ambiente-submarino.mp3`) con botón de control de sonido en cabecera y silenciamiento automático durante la reproducción de videos.
- `StudentInteractiveThermo.tsx`:
  - Soporta interacción en las etapas `thermo` y `thermoMeaning`.
- `StudentMiniquizView.tsx`, `StudentQuizReviewView.tsx` y `StudentRecoveryView.tsx`:
  - Flujo de miniquiz con envío de respuestas, cálculo de `reviewQueue` y `recoveryItems`.
  - Revisión paso a paso de cada pregunta.
  - Refuerzo adaptativo interactivo con preguntas análogas si el alumno presenta errores.
- `lesson-adapter.ts`:
  - Adaptador actualizado para mapear campos requeridos por el reproductor.

---

## 3. Validación y Verificación

1. Verificación estática de TypeScript:
   Comando: `npx tsc --noEmit`
   Resultado: Código de salida 0 (sin errores de compilación ni tipos).
2. Verificación de empaquetado de producción:
   Comando: `npm run build`
   Resultado: Código de salida 0 (1628 módulos transformados, bundle generado en `dist/` en 8.53s).
