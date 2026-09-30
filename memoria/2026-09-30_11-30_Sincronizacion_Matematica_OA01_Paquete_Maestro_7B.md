# Sincronizacion de Matematica 7B OA 01 con el Paquete Maestro y Guia Audiovisual v1.1

## Contexto y Jerarquia de Documentos
Se integro y alineo la matriz curricular y didactica de Matematica 7° Basico (OA 01, 6 lecciones) en conformidad con el Paquete Maestro depositado en `PLANES MAESTROS PRESENTACIONES/Paquete_Maestro_EstudioSimple_7B` y especificamente:
1. `00_LEEME_ANTIGRAVITY.txt`: Delimitacion inequivoca de roles (Antigravity mantiene la matriz y entrega clases con prompts sincronizados en DOCX; Codex construye las presentaciones PPTX; Antigravity no genera PPTX).
2. `Plan_Maestro_Presentaciones_Gancho_Explicacion_7B_v1.1.docx`: Guia audiovisual canonica que rige overlays, tipografia, contraste plano y duraciones asignadas (60s gancho, 90s explicacion).
3. `Matematica_OA01_6Lecciones_v7.docx`: Plan de referencia oficial consolidado.

## Modificaciones Implementadas en el Codigo Fuente

### 1. Clase 1 ('matematica_7b_oa01_clase01.ts')
- Eliminacion de '-27 metros' en todas las diapositivas de explicacion: se establecio estrictamente que '-20 metros' es la posicion fija y que bajar 15 metros y subir 8 metros son los movimientos.
- Diapositiva 1 de explicacion: Titulo 'Objetivo' y subtitulo estandarizado 'Distinguir posición y movimiento desde el cero' (6 palabras).
- Eliminacion de la instruccion residual del logo de StudioSimple en el visualPrompt de la diapositiva 7.
- Sustitucion de 'Azul marino oscuro (#0F172A)' por 'Blanco puro (#FFFFFF)' en todos los visualPrompts.
- Ajuste de subtitulos en pantalla a maximo 8 palabras visibles.

### 2. Clase 6 ('matematica_7b_oa01_clase06.ts')
- Modelamiento dual completo de adicion y sustraccion en contexto:
  * Adicion financiera conservada en diapositivas 3 y 4: `(−$8.000) + (+$12.000) = +$4.000` (saldo a favor).
  * Sustraccion contextualizada modelada en diapositivas 5 y 6: Variacion termica `(+10 °C) − (−2 °C) = 12 °C` (diferencia de temperatura entre maxima y minima), con interpretacion explicita en la diapositiva 6 de que 12 °C representa la amplitud termica total sobre el termometro vertical.
- Diapositiva 1 de explicacion: Titulo 'Objetivo' y subtitulo 'Sumar y restar enteros en contexto' (6 palabras).
- Diapositiva 7: Sintesis y transicion directa a la practica de plataforma, con texto en color 'Blanco puro (#FFFFFF)'.

### 3. Clases 02, 03, 04 y 05
- Diapositiva 1 de explicacion con Titulo 'Objetivo' y subtitulos estandarizados segun la guia v1.1:
  * C2: 'Ubicar, ordenar y comparar enteros' (5 palabras).
  * C3: 'Comprender valor absoluto y números opuestos' (5 palabras).
  * C4: 'Sumar enteros con signos iguales y distintos' (7 palabras).
  * C5: 'Restar sumando el opuesto del sustraendo' (6 palabras).
- Clase 5: Verificada la cota rigurosa de la recta vertical: marca inicial en −2 m, vector de ascenso +5 m y posicion final en +3 m sobre la superficie (nave emergida).
- Eliminacion total de 'Azul marino oscuro (#0F172A)' en favor de 'Blanco puro (#FFFFFF)' para garantizar legibilidad en pantalla dividida (380 px).
- Subtitulos de diapositivas 2 a 7 acotados a un maximo de 8 palabras visibles.

### 4. Sincronizacion y Exportacion
- 'public/data/injected_lessons_7b.json': Actualizado con las 6 lecciones canonicas mediante `sync_injected_lessons.ts`.
- 'export_matematica_oa01_docx.ts': Exporto el archivo oficial `Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones.docx` (80.190 bytes) en OneDrive y simultaneamente en `PLANES MAESTROS PRESENTACIONES/Paquete_Maestro_EstudioSimple_7B/04_PLANES_OA_Y_PROMPTS/Matematica_OA01_6Lecciones_v7.docx`.
- Purgados scripts auxiliares no canonicos.
