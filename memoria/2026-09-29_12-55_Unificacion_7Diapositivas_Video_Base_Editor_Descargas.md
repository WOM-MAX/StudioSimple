# 2026-09-29 12:55 - Unificación de las 7 Diapositivas Canónicas de Video en Base Universal, Editor y Descargas (Prompt .txt y DOCX)

## Contexto y Objetivo
Garantizar que la secuencia de 7 diapositivas audiovisuales canónicas (estilo anime moderno 16:9 para Google Vids) esté sincronizada de forma determinista e isomórfica entre:
1. La base universal de datos (`LessonData` y archivos canónicos en `src/data/lessons/`).
2. El editor de lecciones (`LessonEditorView.tsx`) en el panel de administración.
3. El generador y descargador de prompts de IA en formato `.txt` (`prompt-export.ts`).
4. El generador de cuadernillos dobles en formato DOCX (`docx-export.ts` y `lesson-adapter.ts`).

## Cambios Implementados

### 1. Tipado Canónico en `src/types/lesson.ts` y `src/lib/lesson-generator.ts`
- Se exportó la interfaz canónica `SlidePrompt`:
  ```typescript
  export interface SlidePrompt {
    slideNumber: number;
    tituloMomento: string;
    visualPrompt: string;
    overlayText: string;
    speakerNotes: string;
    palabrasAprox?: number;
    duracionSeg?: number;
    imageUrl?: string;
  }
  ```
- Se tiparon explícitamente las propiedades `slides?: SlidePrompt[];` en `LessonData.hook` y `LessonData.formalization`.
- En `src/lib/lesson-generator.ts`, se reexportó `SlidePrompt` desde `src/types/lesson.ts` para asegurar compatibilidad de tipos idéntica en todo el ecosistema.

### 2. Sincronización en `src/data/lessons/`
- En `matematica_7b_oa01_clase01.ts`:
  - Se incorporaron las 7 diapositivas de `hook` ("El recorrido del submarino") y las 7 diapositivas de `formalization` ("Posición y movimiento").
  - Se añadieron `focusPoints`, `title`, `concept` e `ideaClave`.
- En `matematica_7b_oa01_clase02.ts`:
  - Se incorporaron las 7 diapositivas de `hook` ("La recta numérica y el orden de los números") y las 7 diapositivas de `formalization` ("Criterio de orden en la recta numérica").

### 3. Reactividad en `src/lib/prompt-export.ts`
- Se actualizó `buildLessonPromptText`:
  - Ahora evalúa prioritariamente `lesson.hook.slides` y `lesson.formalization.slides` antes que cadenas estáticas (`fullPrompt`).
  - Itera dinámicamente las diapositivas 1 a 7 extrayendo `slideNumber`, `tituloMomento`, `duracionSeg`, `visualPrompt`, `overlayText`, `speakerNotes` y `imageUrl`.
  - Esto garantiza que cualquier modificación efectuada por el mentor en el Editor Canónico (`LessonEditorView.tsx`) se transfiera inmediatamente al archivo `.txt` descargado.

### 4. Sincronización en `src/lib/lesson-adapter.ts` y `src/lib/docx-export.ts`
- En `adaptPlayerLessonToGenerator`:
  - Se validó el traspaso íntegro de los arrays `slides` y `focusPoints` de `hook` y `formalization`.
- En `adaptGeneratorLessonToPlayer`:
  - Se incorporó la transferencia de `focusPoints` y `hazInstruction` hacia el modelo de jugador.
- En `docx-export.ts`:
  - Se protegió el mapeo con `Array.isArray(lesson.paso2_hook?.slides)` y `Array.isArray(lesson.paso4_explicativo?.slides)` con valores por defecto para campos opcionales, garantizando que las tablas del Plan Maestro se impriman con las 7 láminas completas sin errores en tiempo de ejecución.

## Validación y Control de Calidad
- Ejecución de compilación TypeScript estricta:
  ```bash
  npx tsc --noEmit
  ```
  Resultado: Código de salida 0 (0 errores de compilación).
