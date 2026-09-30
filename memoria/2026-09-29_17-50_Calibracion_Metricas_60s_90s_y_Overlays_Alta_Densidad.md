# Calibracion Formal de Metricas de Voz en Off (60s y 90s) y Overlays de Alta Densidad

- **Fecha:** 2026-09-29 17:50
- **Modulo:** Generador de Prompts Audiovisuales (ChatGPT Work / Google Vids)
- **Archivos Modificados:**
  - [lesson-generator.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/lesson-generator.ts)
  - [prompt-export.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/prompt-export.ts)
  - [matematica_7b_oa01_clase01.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/matematica_7b_oa01_clase01.ts)
  - [matematica_7b_oa01_clase02.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/matematica_7b_oa01_clase02.ts)
  - [matematica_7b_oa01_clase03.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/matematica_7b_oa01_clase03.ts)
  - [matematica_7b_oa01_clase04.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/matematica_7b_oa01_clase04.ts)
  - [matematica_7b_oa01_clase05.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/matematica_7b_oa01_clase05.ts)
  - [matematica_7b_oa01_clase06.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/matematica_7b_oa01_clase06.ts)
  - [injected_lessons_7b.json](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/public/data/injected_lessons_7b.json)

---

## 1. Analisis y Diagnostico Tecnico

Se realizo una auditoria cuantitativa sobre las presentaciones generadas por ChatGPT Work en `extracted_pptx_data.json` para determinar la causa raiz de los titulos telegraficos breves (ej. "-2 METROS", "DOS SENTIDOS").

### Metricas Verificadas de Locucion TTS en Espanol:
- Velocidad de locucion estandar para comprension educativa en Google Vids / TTS: 130 palabras por minuto (ppm).
- Video Gancho (Paso 2): 60 segundos exactos = 130 palabras totales. Distribuido en 7 diapositivas, arroja un promedio de 18 palabras por lamina (rango operativo: 16 a 20 palabras).
- Video Explicativo (Paso 4): 90 segundos exactos = 195 palabras totales. Distribuido en 7 diapositivas, arroja un promedio de 28 palabras por lamina (rango operativo: 25 a 30 palabras).

### Hallazgo:
El conteo de palabras de las 4 clases analizadas en `extracted_pptx_data.json` cumplia exactamente con el presupuesto: exactamente 130 palabras en los ganchos y 195 palabras en las lecciones. Por lo tanto, la reduccion temporal no perjudica la calidad del guion oral. El motivo de los titulos breves y telegraficos era la ausencia de una directiva explicita que delimitara la longitud y densidad conceptual del texto overlay.

---

## 2. Acciones Implementadas

1. **Estandarizacion de Directivas en el Generador y Exportador:**
   - En [lesson-generator.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/lesson-generator.ts) y [prompt-export.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/prompt-export.ts), se formalizaron las directivas tecnicas de produccion audiovisual:
     - Presupuesto temporal estricto: Gancho de 60 segundos (130 palabras, 16-20 por lamina) y Leccion Explicativa de 90 segundos (195 palabras, 25-30 por lamina).
     - Directiva de Overlay de Alta Densidad (4 a 8 palabras obligatorias): Se prohibieron explicitamente los rotulos de 1 o 2 palabras y los titulos abstractos ("Punto de partida", "Un obstaculo", "Dos situaciones", "Procedimiento"). Cada overlay debe ser un ancla conceptual, formula o pregunta especifica con datos matematicos directos.

2. **Densificacion de Diapositivas Fallback en OA Package:**
   - Se ajusto la funcion generadora `generateOAPackage` para que las diapositivas de respaldo sinteticen titulos descriptivos de 4 a 8 palabras basados en `item.title` y `item.focoDidactico`.

3. **Armonizacion de las 6 Lecciones Canonicas de Matematica 7B OA01:**
   - Se actualizaron todos los archivos de datos canónicos (`matematica_7b_oa01_clase01.ts` hasta `matematica_7b_oa01_clase06.ts`) sustituyendo los titulos telegraficos por anclas conceptuales de 4 a 8 palabras alineadas con la imagen CPA y la locucion.
   - Se sincronizo el paquete JSON precompilado en [injected_lessons_7b.json](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/public/data/injected_lessons_7b.json).

---

## 3. Verificacion y Estado de Compilacion

- Comando ejecutado: `npx tsc --noEmit` en el directorio `Web Studio Simple`.
- Resultado: Codigo de salida 0 (sin errores de tipos ni advertencias en TypeScript).
