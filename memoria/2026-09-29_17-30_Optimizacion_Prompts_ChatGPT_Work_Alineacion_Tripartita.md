# Bitácora de Arquitectura: Optimización de Prompts para ChatGPT Work y Directiva de Alineación Tripartita Estricta

**Fecha:** 2026-09-29 17:30  
**Autor:** Agente de Software Autónomo (A-SDLC)  
**Alcance:** Refactorización integral de las directivas maestras de generación de prompts para ChatGPT Work y Google Vids, eliminación de marcadores abstractos y densificación conceptual de las presentaciones de Matemática 7° Básico OA 1.

---

## 1. Problema Abordado

En las presentaciones PPTX generadas por ChatGPT Work para Google Vids existía una brecha de coherencia entre los tres canales de comunicación pedagógica:
1. **Canal Visual (Imágenes):** Los prompts no especificaban con precisión el artefacto disciplinar concreto (CPA), lo que producía ilustraciones genéricas de dos estudiantes frente a pantallas sin diagramas matemáticos claros.
2. **Canal Textual (Overlays):** Se utilizaban textos vagos o abstractos (ej. "DOS SITUACIONES", "−2 METROS", "PUNTO DE PARTIDA", "¡UN OBSTÁCULO INESPERADO!"), que no explicaban el fenómeno ni anclaban la fórmula.
3. **Canal Auditivo (Locución TTS):** Explicaba el procedimiento formal paso a paso, pero sin una correspondencia biunívoca con el texto en pantalla o la composición de la lámina.

---

## 2. Solución e Implementación Técnica

### 2.1 Directiva de Alineación Tripartita Estricta en Constructores de Prompts
Se actualizaron las directivas maestras en `src/lib/lesson-generator.ts` (`buildHookPromptText` y `buildExplicativoPromptText`) y en `src/lib/prompt-export.ts` (`buildLessonPromptText`):
- **Regla de Alineación Tripartita Estricta (Imagen - Overlay - Locución):** Cada diapositiva constituye una unidad didáctica indivisible con correspondencia biunívoca entre sus tres canales.
- **Artefacto Visual Concreto (CPA):** El prompt de imagen debe detallar el diagrama técnico disciplinar (recta numérica con valores, cotas de profundidad numéricas, fichas bicolores, termómetro graduado, balanza o flechas direccionales). Se prohíben ilustraciones decorativas sin contenido disciplinar.
- **Prohibición de Overlays Genéricos:** Queda prohibido el uso de rótulos abstractos. El texto en pantalla debe enunciar el concepto, pregunta detonante o dato numérico exacto de la lámina.
- **Locución Coherente:** El guion oral describe con precisión lo que se observa en la imagen y lo que se sintetiza en el overlay.

### 2.2 Densificación de Diapositivas Fallback en el Generador
En `src/lib/lesson-generator.ts`, se eliminaron todas las plantillas genéricas de las 7 diapositivas de gancho y 7 de formalización, inyectando variables dinámicas (`item.title` y `item.focoDidactico`) en los títulos, overlays y notas al orador.

### 2.3 Armonización de las Lecciones Canónicas de Matemática (Clases 1 a 6)
Se actualizaron los archivos de datos en `src/data/lessons/`:
- **Clase 1 (`matematica_7b_oa01_clase01.ts`):** Slide 7 de gancho actualizado a "Desafío: Distinguir posición de movimiento" y slide 7 explicativo a "Regla: Posición = Ubicación | Movimiento = Desplazamiento".
- **Clase 2 (`matematica_7b_oa01_clase02.ts`):** Slide 7 de gancho actualizado a "Síntesis: En la recta numérica, el valor mayor está a la derecha" y slide 7 explicativo a "Regla de Oro: Mayor hacia la derecha (a > b si a está a la derecha de b)".
- **Clase 3 (`matematica_7b_oa01_clase03.ts`):** Reemplazo de overlays escuetos ("−5 Y +5", "MISMA EN AMBOS", "LADOS OPUESTOS") por formulaciones matemáticas rigurosas ("Dos posiciones simétricas: −5 y +5 metros", "Misma distancia al origen: 5 unidades", "|−5| = 5 (Valor absoluto)", "La distancia siempre es no negativa: |x| ≥ 0", etc.).
- **Clase 4 (`matematica_7b_oa01_clase04.ts`):** Reemplazo de overlays genéricos ("UNA UNIDAD CADA UNA", "4 FRENTE A 7", "COMPARAR ES CLAVE") por conceptos explícitos ("Fichas bicolores: azul (+) y roja (−)", "Descenso inicial: 4 fichas negativas (−4)", "Ascenso posterior: 7 fichas positivas (+7)", "Cancelación de pares", "Regla de Oro: Igual signo suma | Distinto signo resta").
- **Clase 5 (`matematica_7b_oa01_clase05.ts`):** Reemplazo de overlays abstractos ("DOS SITUACIONES", "DOS SENTIDOS", "UNA REGLA ÚTIL") por fórmulas y pasos claros ("Posición inicial del submarino: −2 metros", "Operación A: −2 − (+5) = Baja a −7 metros", "Operación B: −2 − (−5) = Quitar un descenso", "Regla de Oro: a − b = a + (−b)", "Solo cambia el signo del sustraendo").
- **Clase 6 (`matematica_7b_oa01_clase06.ts`):** Reemplazo de overlays vagos ("SALDO Y TEMPERATURA", "DEFINE EL CERO") por anclas contextuales precisas ("Dos contextos cotidianos: Finanzas y Clima", "Contexto A: Saldo deudor de −$8.000", "Operación A: −$8.000 + $12.000 = +$4.000", "Paso 1: Definir el punto de referencia cero", "Síntesis: Signo + Contexto = Sentido real").

### 2.4 Sincronización del Catálogo Precompilado
Se ejecutó `scripts/sync_injected_lessons.ts`, actualizando `public/data/injected_lessons_7b.json` con las 6 lecciones canónicas y sus nuevas descripciones tripartitas.

---

## 3. Verificación Técnica

- **Compilación TypeScript:** `npx tsc --noEmit` completado exitosamente con código de salida 0.
- **Validación de Datos:** Se verificó mediante scripts de inspección que los 7 overlays de gancho y 7 de formalización en las 6 clases son específicos, disciplinarmente exactos y carecen de placeholders genéricos.
