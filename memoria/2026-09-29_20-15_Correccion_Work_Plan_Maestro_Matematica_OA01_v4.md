# Memoria: Corrección Integral del Plan Maestro de Matemática 7° Básico OA 01 según los 8 Criterios de Work (v4)

**Fecha:** 2026-09-29 20:20  
**Objetivo:** Aplicar de extremo a extremo y de forma 100% autónoma las correcciones solicitadas por ChatGPT Work sobre el Plan Maestro de Matemática 7° Básico OA 01 (6 lecciones), generando el archivo DOCX oficial en OneDrive y validando la integridad del sistema.

---

## 1. Archivos Generados y Auditados

1. [Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones(4).docx](file:///D:/OneDrive/EstudioSimple-Contenido/EstudioSimple_7B_Planes_Actualizados-29-09-2026/Plan_Maestro_7B%C3%A1sico_110-7-MAT-OA01_6Lecciones(4).docx) (85.761 bytes).
2. [Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones.docx](file:///D:/OneDrive/EstudioSimple-Contenido/EstudioSimple_7B_Planes_Actualizados-29-09-2026/Plan_Maestro_7B%C3%A1sico_110-7-MAT-OA01_6Lecciones.docx) (85.761 bytes).

Ambos archivos fueron verificados con comparación binaria estricta, resultando 100% idénticos.

---

## 2. Implementación de los 8 Criterios de Work

### Criterio 1: Tamaños Únicos de Tipografía para Matemática (64 pt y 36 pt)
- **Modificación en Tablas Word ([docx-export.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/docx-export.ts)):** Rótulos de columnas actualizados a `"Título en Pantalla (64 pt)"` y `"Subtítulo en Pantalla (36 pt)"` tanto en el Video Gancho como en el Video Explicativo.
- **Modificación en Generadores de Prompts ([prompt-export.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/prompt-export.ts) y [lesson-generator.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/lesson-generator.ts)):** Estructura de salida estandarizada en:
  - `2. Título en Pantalla (64 pt): ...`
  - `3. Subtítulo en Pantalla (36 pt): ...`

### Criterio 2: Texto Brillante de un Solo Color sin Sombras ni Recuadros
- Incorporación en directivas técnicas del requerimiento: *Texto de un solo color brillante (ej. Blanco Brillante #FFFFFF), elegido para contrastar con el fondo de cada imagen, plano, sin sombras, contornos, resplandores ni recuadros flotantes o fondos detrás del texto*.
- En las 84 escenas visuales ([clase01.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/matematica_7b_oa01_clase01.ts) a [clase06.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/matematica_7b_oa01_clase06.ts)) se incluyó la especificación explícita de color de texto: `Color de texto en pantalla: Blanco brillante (#FFFFFF) plano, sin sombras, contornos, resplandores ni recuadros flotantes.`

### Criterio 3: Objetivo en Subtítulo de Slide 1 y Supresión de "OA 01" Redundante
- En la Diapositiva 1 de la formalización de cada clase:
  - `overlayTitle`: `"Objetivo de la Lección"` (64 pt).
  - `overlaySubtitle`: Objetivo específico de la clase redactado para el estudiante (36 pt):
    - Clase 1: *Distinguir posición de movimiento respecto de un punto cero de referencia*.
    - Clase 2: *Ubicar, ordenar y comparar números enteros en la recta numérica horizontal*.
    - Clase 3: *Comprender el concepto de valor absoluto y caracterizar números enteros opuestos*.
    - Clase 4: *Dominar el algoritmo formal para sumar enteros de igual y distinto signo*.
    - Clase 5: *Resolver sustracciones en Z transformándolas en la adición del inverso aditivo*.
    - Clase 6: *Resolver problemas cotidianos aplicando adición y sustracción en Z según el contexto*.
  - `vectorialOverlayPptx` y `mathOverlayPptx`: Se eliminó el rótulo visible redundante `"OA 01 ·"`, reemplazándolo por descripciones conceptuales limpias.

### Criterio 4: Rectas Numéricas y Diagramas Precisos y Editables
- Todas las capas vectoriales especifican con rigor matemático: origen cero, signos (+/−), valores numéricos, unidades de medida (metros, grados Celsius, pesos chilenos), flechas direccionales y arcos de traslación.

### Criterio 5: Presencia Activa del Dúo Protagónico en el 100% de las Escenas
- La joven con trenzas y el joven con chaqueta cerceta aparecen y participan activamente en las 84 escenas visuales (14 diapositivas por clase distribuidas en 6 clases).

### Criterio 6: Cronometría Exacta por Diapositiva
- **Video Gancho (60 segundos exactos):**
  - Diapositivas 1, 2, 3: 8 segundos cada una.
  - Diapositivas 4, 5, 6, 7: 9 segundos cada una.
  - Total: `8 + 8 + 8 + 9 + 9 + 9 + 9 = 60 s`.
- **Video Explicativo (90 segundos exactos):**
  - Diapositiva 1 (Objetivo): 12 segundos.
  - Diapositivas 2, 3, 4, 5, 6, 7: 13 segundos cada una.
  - Total: `12 + 13 + 13 + 13 + 13 + 13 + 13 = 90 s`.

### Criterio 7: Notas Calibradas y Cierre con Transición a Plataforma
- Locución calibrada con precisión exacta:
  - Gancho: 130 palabras en las 6 clases (~18 palabras por lámina a 130 ppm).
  - Explicativo: 195 palabras en las 6 clases (~28 palabras por lámina a 130 ppm).
- En la Diapositiva 7 de cada explicación se suprimieron propuestas de desafíos finales o trabajo en cuaderno dentro del video, cerrando con la síntesis de la regla de oro y el pase directo a la práctica interactiva en la plataforma web.

### Criterio 8: Protocolo Obligatorio de Comprobación Acústica en Google Vids
- Se incorporó la directiva formal de medición acústica en las fichas técnicas del DOCX y en los guiones exportados:
  *Tras generar y exportar el audio en Google Vids, medir la duración real del archivo exportado con cronómetro o analizador de audio. El conteo de palabras no garantiza por sí solo que se obtengan 60 o 90 segundos exactos. Si la duración real no es exacta (60 s en gancho y 90 s en explicación), ajustar la narración, las pausas o el ritmo, volver a exportar y medir nuevamente. Registrar la duración comprobada; no marcar el requisito como cumplido basándose solo en el número de palabras o en una duración estimada.*

---

## 3. Verificaciones de Calidad y Resultados

| Prueba | Comando / Herramienta | Resultado |
|---|---|---|
| Sincronización de Catálogo | `npx tsx scripts/sync_injected_lessons.ts` | Exitoso (6 lecciones sincronizadas en `injected_lessons_7b.json`) |
| Tipado TypeScript | `npx tsc --noEmit` | Código de salida 0 (0 errores) |
| Compilación de Producción | `npm run build` | Código de salida 0 (`dist/` generado en 10.34s) |
| Auditoría Forense DOCX | `scratch/audit_docx_work_criteria.py` | Exitoso (los 8 criterios verificados en el XML de Word) |
| Integridad de Archivos | Verificación de hash y tamaño | 85.761 bytes en ambas rutas de OneDrive |
