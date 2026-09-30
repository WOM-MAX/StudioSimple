# Sincronización Final y Saneamiento Integral de Matemática 7° Básico OA 01

Fecha: 29-09-2026 19:00
Ambiente: Web Studio Simple (Vite + React + TypeScript + Tailwind)
Directiva: Modo Autónomo Total (DAG de 5 fases ejecutado sin interrupción)

---

## 1. Resumen Ejecutivo y Diagnóstico

Se ejecutó la sincronización y saneamiento integral de las 6 clases de Matemática 7° Básico OA 01 en [Web Studio Simple](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple), resolviendo todas las discrepancias levantadas entre los archivos de lecciones, las directivas de los Planes Maestros actualizados al 29-09-2026 y los requerimientos de coherencia audiovisual y pedagógica.

### Causa Raíz de las Discrepancias Anteriores
1. Los planes exportados y las fichas técnicas solo contenían una columna "Texto en Pantalla", lo que impedía separar el Título principal del Subtítulo explicativo, obligando a truncar conceptos o a mezclar jerarquías tipográficas.
2. La Diapositiva 1 del Video Explicativo carecía de una formulación explícita del Objetivo de Aprendizaje orientada al estudiante.
3. Desalineación en Clase 6 Gancho: La Diapositiva 3 contenía locución de temperatura exterior en lugar de describir el saldo bancario (-$8.000 + $12.000 = +$4.000).
4. Ambigüedad matemática en Clase 4 Explicativo: La Diapositiva 5 mostraba "8 - 5 = 3" de manera aislada, sin explicitar la resta de valores absolutos (|−8| − |5| = 8 − 5 = 3) ni conectar el resultado negativo final (−3) con la regla de signos.
5. Calibración métrica: Las Clases 1 y 2 presentaban un déficit de palabras en notas al orador respecto a los estándares de 60 segundos (~130 palabras) y 90 segundos (~195 palabras).
6. En Clase 1 Gancho, se exigía al estudiante en la pregunta detonante calcular la posición final acumulada (-27 m) antes de tiempo, en lugar de centrar la pregunta en distinguir posición de movimiento.
7. En Clase 2 Explicativo, la diapositiva final instruía trazar la recta en el cuaderno en lugar de cerrar el video y dar el pase a la plataforma interactiva.
8. La exportación DOCX y los constructores de prompts no incluían la capa matemática vectorial para PowerPoint ni la estructura hexapartita completa.

---

## 2. Acciones y Modificaciones Realizadas

### Fase 1: Extensión del Contrato de Datos ([src/types/lesson.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/types/lesson.ts))
Se extendió la interfaz `SlidePrompt` con los siguientes campos opcionales, preservando `overlayText` para compatibilidad regresiva con los componentes existentes:
- `overlayTitle?: string;` (Título principal del slide, 60-72 pt)
- `overlaySubtitle?: string;` (Subtítulo explicativo o remate conceptual)
- `mathOverlayPptx?: string;` (Especificación matemática vectorial exacta para PowerPoint)
- `didacticPurpose?: string;` (Propósito didáctico específico del slide)

### Fase 2: Saneamiento Quirúrgico de las 6 Clases ([src/data/lessons/](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons))
Se actualizaron exhaustivamente los archivos [matematica_7b_oa01_clase01.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/matematica_7b_oa01_clase01.ts) a [matematica_7b_oa01_clase06.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/matematica_7b_oa01_clase06.ts):
- **Clase 1**:
  * Gancho Diapositivas 6 y 7 reformuladas para centrarse en distinguir posición (dónde está) de movimiento (hacia dónde y cuánto cambia), eliminando la exigencia prematura del cálculo aritmético acumulado (-27 m).
  * Guion Gancho calibrado a 139 palabras (~60 s).
  * Explicativo Diapositiva 1 formula explícitamente el Objetivo de Aprendizaje: "Hoy aprenderemos a usar los números enteros para representar posiciones y movimientos respecto de un punto de referencia". Guion Explicativo calibrado a 189 palabras (~90 s).
  * Poblados `overlayTitle`, `overlaySubtitle` y `mathOverlayPptx` en las 14 diapositivas.
- **Clase 2**:
  * Explicativo Diapositiva 1 formula explícitamente el Objetivo de Aprendizaje: "Hoy aprenderemos a ubicar números enteros en la recta numérica y a compararlos usando la regla de orden en Z".
  * Explicativo Diapositiva 7 eliminó la instrucción de dibujar la recta en el cuaderno en el video; cierra formalmente con la regla de oro y da el pase directo a la práctica interactiva en la plataforma.
  * Guion Gancho calibrado a 144 palabras (~60 s) y Explicativo a 180 palabras (~90 s).
  * Poblados `overlayTitle`, `overlaySubtitle` y `mathOverlayPptx` en las 14 diapositivas.
- **Clase 3**:
  * Explicativo Diapositiva 1 formula explícitamente el Objetivo de Aprendizaje: "Hoy aprenderemos qué es el valor absoluto de un número entero y cómo se definen los números opuestos".
  * Poblados `overlayTitle`, `overlaySubtitle` y `mathOverlayPptx` en las 14 diapositivas.
  * Guion Gancho con 148 palabras y Explicativo con 191 palabras.
- **Clase 4**:
  * Explicativo Diapositiva 1 formula explícitamente el Objetivo de Aprendizaje: "Hoy aprenderemos el algoritmo formal para sumar números enteros de igual signo y de distinto signo".
  * Diapositiva 5 del Explicativo corregida: Título "Diferencia de valores absolutos", Subtítulo "|−8| − |5| = 8 − 5 = 3". Capa matemática vectorial especificada exactamente como "|−8| = 8 ; |5| = 5 -> 8 − 5 = 3".
  * Diapositiva 6 del Explicativo corregida: Asigna el signo negativo porque |−8| > |5|, resultando en −3, conectando formalmente la regla de signos.
  * Guion Gancho con 154 palabras y Explicativo con 185 palabras.
  * Poblados `overlayTitle`, `overlaySubtitle` y `mathOverlayPptx` en las 14 diapositivas.
- **Clase 5**:
  * Explicativo Diapositiva 1 formula explícitamente el Objetivo de Aprendizaje: "Hoy aprenderemos que restar un número entero equivale exactamente a sumar su inverso aditivo".
  * Poblados `overlayTitle`, `overlaySubtitle` y `mathOverlayPptx` en las 14 diapositivas.
  * Guion Gancho con 136 palabras y Explicativo con 203 palabras.
- **Clase 6**:
  * Corrección total del cruce en Gancho:
    - Diapositiva 3: Nota al orador y textos dedicados exclusivamente al saldo bancario: -$8.000 + $12.000 = +$4.000.
    - Diapositiva 4: Introduce el registro térmico de −3 °C en la mañana.
    - Diapositiva 5: Introduce el aumento de +5 °C hacia la tarde (-3 °C + 5 °C = +2 °C).
    - Diapositiva 6: Compara los dos puntos de referencia (cero pesos vs cero grados).
    - Diapositiva 7: Síntesis de contextualización.
  * Explicativo Diapositiva 1 formula explícitamente el Objetivo de Aprendizaje: "Hoy aplicaremos la adición y sustracción de números enteros para resolver problemas del mundo real".
  * Guion Gancho con 130 palabras (~60 s) y Explicativo con 183 palabras (~90 s).
  * Poblados `overlayTitle`, `overlaySubtitle` y `mathOverlayPptx` en las 14 diapositivas.

### Fase 3: Actualización de Constructores de Prompts y Exportadores
- [src/lib/prompt-export.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/prompt-export.ts):
  * Actualizado con la estructura hexapartita por diapositiva: 1) Propósito, 2) Título en Pantalla (60-72 pt), 3) Subtítulo en Pantalla (24-32 px separación), 4) Prompt Visual IA (limpio, sin texto dibujado por IA), 5) Capa Matemática Vectorial para PowerPoint, y 6) Notas al Orador (Google Vids continuo).
  * Directivas operativas del 29-09-2026 incorporadas: Prohibición absoluta de placas oscuras globales, contraste WCAG AA, y jerarquía en bloque.
- [src/lib/lesson-generator.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/lesson-generator.ts):
  * Actualizadas las funciones `buildHookPromptText` y `buildExplicativoPromptText` con la plantilla hexapartita y directivas de diseño 29-09-2026.
  * Refactorizadas `getCanonicalClase1Matematica` y `getCanonicalClase2Matematica` para delegar directamente en `playerLessonToGeneratorLesson(MATEMATICA_7B_OA01_CLASE01)` y `CLASE02`, eliminando código duplicado desfasado y garantizando Fuente Única de la Verdad (SSOT).
- [src/lib/docx-export.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/docx-export.ts):
  * Tablas de fichas técnicas para Video Gancho y Video Explicativo adaptadas a 7 columnas proporcionales: Slide (5%), Propósito Didáctico (13%), Título en Pantalla (15%), Subtítulo en Pantalla (15%), Prompt Visual IA (22%), Capa Matemática PPTX (14%) y Notas al Orador (16%).

### Fase 4: Sincronización del Catálogo Precompilado
- Ejecución de [scripts/sync_injected_lessons.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/scripts/sync_injected_lessons.ts).
- Actualizado [public/data/injected_lessons_7b.json](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/public/data/injected_lessons_7b.json) con las 6 lecciones canónicas íntegras conteniendo sus 14 slides saneados cada una.

### Fase 5: Verificación Determinista y Compilación
- `npx tsc --noEmit`: Ejecutado exitosamente con código de salida 0 (cero errores de tipos).
- `npm run build`: Ejecutado exitosamente con código de salida 0. Bundle de producción generado limpiamente en 10.18s (`dist/index.html`, `dist/assets/index-5dRfB3nL.css`, `dist/assets/index-Buh6VL24.js`).

---

## 3. Matriz de Validación de Requerimientos

| Requerimiento / Discrepancia | Estado | Archivos Involucrados |
|---|---|---|
| Extensión SlidePrompt (overlayTitle, overlaySubtitle, mathOverlayPptx) | Cumplido | [src/types/lesson.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/types/lesson.ts) |
| Separación Título (60-72 pt) y Subtítulo en todas las diapositivas | Cumplido | Clases 1 a 6 en [src/data/lessons/](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/) |
| Diapositiva 1 del Explicativo formula explícitamente el OA | Cumplido | Clases 1 a 6 Diapositiva 1 Formalización |
| Desalineación Clase 6 Gancho (Saldo bancario en Slide 3, Temp en Slide 4-5) | Resuelto | [matematica_7b_oa01_clase06.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/matematica_7b_oa01_clase06.ts) |
| Ambigüedad Clase 4 Explicativo Slide 5 y 6 (Resta de valores absolutos y signo) | Resuelto | [matematica_7b_oa01_clase04.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/matematica_7b_oa01_clase04.ts) |
| Pregunta detonante Clase 1 Gancho (Posición vs Movimiento, sin cálculo acumulado) | Resuelto | [matematica_7b_oa01_clase01.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/matematica_7b_oa01_clase01.ts) |
| Cierre Clase 2 Explicativo (Regla en Z y pase a plataforma, sin dibujo en cuaderno) | Resuelto | [matematica_7b_oa01_clase02.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/matematica_7b_oa01_clase02.ts) |
| Calibración métrica (Gancho ~130 palabras / Explicativo ~195 palabras) | Cumplido | Las 6 clases calibradas |
| Formato hexapartita y directivas 29-09-2026 en prompts y DOCX | Cumplido | [src/lib/prompt-export.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/prompt-export.ts), [src/lib/docx-export.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/docx-export.ts), [src/lib/lesson-generator.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/lesson-generator.ts) |
| Sincronización JSON público y compilación de producción exitosa | Cumplido | [public/data/injected_lessons_7b.json](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/public/data/injected_lessons_7b.json), `npm run build` exit code 0 |
