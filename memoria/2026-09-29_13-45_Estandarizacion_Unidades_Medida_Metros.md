# Bitacora: Estandarizacion de Unidades de Medida a 'Metros'

- Fecha: 2026-09-29 13:45
- Proyecto: StudioSimple (Web Studio Simple)
- Categoria: Pedagogia / UX de Contenidos

## 1. Problema Detectado
En los prompts de las laminas de video, overlayText, preguntas de conversacion guiada, simuladores y explicaciones, se utilizaba la abreviacion 'm' (por ejemplo: '20 m', '15 m', '0 m', '+3 m', '-12 m'). Para un estudiante de ensenanza basica, estas abreviaciones dificultan la lectura, generan friccion cognitiva e inducen a confusion entre variables matematicas y magnitudes fisicas. La directiva pedagogica instruyo presentar siempre el nombre completo de la unidad de medida: 'metros' o 'metro'.

## 2. Acciones Implementadas

1. **src/data/lessons/matematica_7b_oa01_clase01.ts**:
   - `hook.slides[1].overlayText`: 'Punto de partida: Superficie del mar (0 metros)'.
   - `hook.slides[2].visualPrompt` y `overlayText`: '−20 metros'.
   - `preQuestions[1]`: pregunta, exito, apoyo y revelacion actualizados de '−20 m' a '−20 metros'.
   - `formalization.hazInstruction`: '−20 metros se lee "menos veinte metros"'.
   - `formalization.slides[1, 2, 4, 5]`: actualizadas las referencias de '−20 m' y '15 m' a '−20 metros' y '15 metros' en visualPrompt y overlayText.

2. **src/data/lessons/matematica_7b_oa01_clase02.ts**:
   - `hook.slides[1].visualPrompt`: reemplazado '+3 m, −6 m, 0 m, −1 m' por '+3 metros, −6 metros, 0 metros, −1 metro'.

3. **src/lib/lesson-generator.ts**:
   - Diapositivas hook de Clase 1: '0 metros', '−20 metros'.
   - Diapositivas formalizacion de Clase 1: '−20 metros', '15 metros'.
   - Pregunta guiada de recorrido: '¿Qué significa que el submarino se encuentre a −20 metros?' y sus feedbacks con '−20 metros'.
   - Diapositivas hook de Clase 2: '+3 metros, −6 metros, 0 metros, −1 metro'.

4. **src/components/student/LessonEngine7th.tsx**:
   - Pregunta del miniquiz: 'desde -12 metros'.
   - Simulador kinestesico: '+2.500 metros en la Cordillera', '-300 metros'.
   - Drag & Drop: '+2.500 metros'.
   - Infografia interactiva: 'Everest (+8848 metros) vs Mar Muerto (-423 metros)'.

## 3. Archivos Modificados
- `Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase01.ts`
- `Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase02.ts`
- `Web Studio Simple/src/lib/lesson-generator.ts`
- `Web Studio Simple/src/components/student/LessonEngine7th.tsx`

## 4. Verificacion y DoD
- Busqueda automatizada: 0 ocurrencias de abreviacion 'm' asociadas a magnitudes de longitud en lecciones y generador.
- Compilacion TypeScript (`npx tsc --noEmit`): Exitosa con 0 errores (codigo 0).
