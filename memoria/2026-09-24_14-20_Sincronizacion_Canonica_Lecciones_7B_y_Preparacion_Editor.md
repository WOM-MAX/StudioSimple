# Bitácora de Sincronización Canónica de Lecciones 7° Básico y Preparación del Editor de Lecciones

**Fecha:** 2026-09-24 14:18  
**Autor:** Agente IA (A-SDLC)  
**Proyecto:** EstudioSimple  
**Objetivo:** Sincronizar lecciones canónicas de Clase 1 para las 5 asignaturas de 7° básico en el generador de paquetes (DOCX y App) y preparar la base para el Editor de Lecciones del Dashboard Admin.

---

## 1. Problema Identificado

Al analizar la carpeta de descargas con los planes de lecciones descargados (`.docx`) y compararlos con las lecciones inyectadas en la aplicación:
1. **Lengua y Literatura (7B OA03):** El DOCX contenía prompts genéricos de plantilla para video, mientras que la App utilizaba una estructura basada en "Las 6 Etapas del Viaje del Héroe" (Mundo Ordinario, Llamada, Umbral, Pruebas, Abismo, Regreso).
2. **Ciencias Naturales (7B OA01):** El DOCX carecía de los 7 slides específicos del modelo de 4 dimensiones (Biológica, Afectiva, Social, Ética), utilizando un texto genérico de relleno.
3. **Historia, Geografía y Ciencias Sociales (7B OA02):** Los prompts de video en DOCX no estaban adaptados a la línea de tiempo interactiva ni a los hitos del Neolítico (siembra, ganadería, excedentes y sedentarismo).
4. **Inglés (7B OA09):** El DOCX contenía descripciones genéricas sin mencionar la montaña narrativa (Story Arc) ni la historia de Leo y su hermana cerca de las montañas.
5. **Matemática (7B OA01):** El Paso 1 del DOCX hacía referencia a la situación del ascensor y estacionamientos subterráneos, mientras que en la App el Paso 1 utilizaba el termómetro interactivo.

---

## 2. Acciones Implementadas en este Commit

1. **Sincronización Canónica en `lesson-generator.ts`:**
   - **Matemática (7B OA01 Clase 1):** Se alineó la `situacionIntro` con el termómetro interactivo ("Observa este termómetro. Tomaremos 0 °C como punto de referencia..."), manteniendo la secuencia de 7 slides del submarino en el video motivacional y los 7 slides de posición vs movimiento en el video explicativo.
   - **Lengua y Literatura (7B OA03 Clase 1):** Se implementó la función exportada `getCanonicalClase1Lengua()` con los 7 slides de prompts visuales y speaker notes para el viaje del héroe, su situación inicial de quiebre de rutina, preguntas socráticas, práctica de análisis literario, miniquiz y recuperación formativa.
   - **Ciencias Naturales (7B OA01 Clase 1):** Se implementó `getCanonicalClase1Ciencias()` con los 7 slides de prompts visuales para las 4 dimensiones (Biológica, Afectiva, Social, Ética), preguntas guiadas de interrelación, práctica de higiene y diálogo familiar, miniquiz y recuperación.
   - **Historia y Geografía (7B OA02 Clase 1):** Se implementó `getCanonicalClase1Historia()` con los 7 slides de prompts visuales para la Revolución Neolítica (caza nómada, cambio climático, siembra, domesticación animal, aldeas y cerámica), preguntas de geografía fluvial y cuadro comparativo en el cuaderno.
   - **Inglés (7B OA09 Clase 1):** Se implementó `getCanonicalClase1Ingles()` con los 7 slides de prompts visuales para el Story Arc (Setting, Characters, conector First, oración modelo de Leo), práctica de escritura y miniquiz de comprensión.
2. **Inyección en `generateOAPackage`:**
   - Se configuró la inyección directa de las 5 lecciones canónicas cuando se solicita la Clase 1 de 7° Básico para cualquiera de las 5 materias troncales.
   - Se actualizaron los títulos oficiales en `getRawLessonTitlesAndFocus`.
3. **Exportación de Funciones de Apoyo:**
   - Se exportaron `buildHookPromptText` y `buildExplicativoPromptText` para su consumo reactivo por el futuro `LessonEditorView`.

---

## 3. Estado de Validación Técnica

- Verificación TypeScript: `npx tsc --noEmit` completado con 0 errores (código de salida 0).
- Estado del repositorio: Listo para commit y push a la rama `main` en GitHub.

---

## 4. Próximos Pasos (Al Reanudar la Sesión)

1. Crear el componente `LessonEditorView.tsx` en `src/components/admin/cms/`.
2. Integrarlo en `AdminDashboard.tsx` bajo la pestaña `Editor de Lecciones` en el grupo "Motor Pedagógico".
3. Probar la edición completa en vivo y la persistencia sincronizada entre la App y la descarga de DOCX.
