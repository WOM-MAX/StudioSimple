# Tarea Pendiente para Mañana: Corrección Video Gancho R2 y Validación Visual en Editor

- **Fecha:** 2026-09-30 20:30
- **Estado:** Pendiente para retomar mañana desde el trabajo.
- **Módulo:** Lecciones Interactivas / CMS / Cloudflare R2 Media
- **Responsable:** Antigravity (A-SDLC)

---

## 1. Diagnóstico Técnico Resumido
1. El archivo motivacional subido a Cloudflare R2 se llama `110-7-MAT-OA01-L01-GANCHO.mp4` (confirmado con HTTP 200 OK y 29.21 MB en `https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/110-7/MAT/110-7-MAT-OA01-L01-GANCHO.mp4`).
2. Al escribir o tener `MOTIVACIONAL` o rutas sin la carpeta `110-7/MAT/`, Cloudflare responde con 404 Not Found, lo que congela el reproductor en `0:00` sin barra de duración.
3. El indicador del editor mostraba falsos positivos porque solo evaluaba si el string de la URL no estaba vacío, sin verificar errores de carga (`onError`).

---

## 2. Prompt Preparado para Ejecutar Mañana con /goal

```text
/goal Ejecutar de inicio a fin la correccion canonica de la URL del video motivacional (Gancho) de Cloudflare R2 y la deteccion de errores en el editor de lecciones con 100% de autonomia.

DIRECTIVAS DE AUTONOMIA:
1. Prohibido solicitar aprobacion, hacer preguntas o pausar para pedir interaccion al usuario antes de concluir.
2. Prohibido ejecutar busquedas recursivas en la raiz del disco o scripts improvisados de Python: usa rutas exactas y TypeScript (npx tsx).
3. Delimitacion de mision: el entregable es exclusivamente el codigo fuente de la aplicacion web; nunca generar archivos PPTX finales (mision de Work).
4. Circuito de proteccion: maximo 4 intentos de autocorreccion ante fallos de compilacion antes de cambiar de enfoque o revertir cambios infructuosos.
5. Control de bloqueos: considerar posibles procesos de Node o Windows bloqueando archivos (EBUSY) antes de operaciones destructivas.
6. Punto de control: verificar estado de Git antes de mutaciones extensas para preservar reversibilidad.
7. Doble validacion: validar compilacion con codigo 0 y comprobar que la URL de Cloudflare R2 responda HTTP 200 OK.
8. Persistencia: registrar hitos en memoria/ para tareas complejas si existe riesgo de saturacion de contexto.
9. Resuelve cualquier detalle tecnico o pedagogico no especificado aplicando los estandares de AGENTS.md y documenta la decision en el reporte final.

TAREA A EJECUTAR:
1. En Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase01.ts, actualizar la propiedad hook.videoSrc con la URL verificada de Cloudflare R2:
   "https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/110-7/MAT/110-7-MAT-OA01-L01-GANCHO.mp4".
2. Sincronizar el paquete json ejecutando npx tsx scripts/sync_injected_lessons.ts para que public/data/injected_lessons_7b.json refleje la nueva URL del video gancho.
3. En Web Studio Simple/src/components/admin/cms/LessonEditorView.tsx:
   - Anadir estado de error y detector onError en las etiquetas <video> del visor de Hook y Formalizacion.
   - Si la carga del video falla (por 404 o enlace invalido), mostrar una advertencia visual ("Error al cargar video: verifica que la URL exista en Cloudflare R2") y actualizar la insignia de estado.
4. Ejecutar la compilacion de produccion (npm run build --prefix "Web Studio Simple") y certificar cero errores de TypeScript.

ARCHIVOS Y COMPONENTES AFECTADOS:
- Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase01.ts
- Web Studio Simple/scripts/sync_injected_lessons.ts
- Web Studio Simple/public/data/injected_lessons_7b.json
- Web Studio Simple/src/components/admin/cms/LessonEditorView.tsx

CRITERIOS DE ACEPTACION Y DEFINITION OF DONE (DoD):
1. Codigo modular, tipado estricto (unknown > any), sin errores de sintaxis ni regresiones.
2. Validacion local exitosa ejecutando: npm run build --prefix "Web Studio Simple" (codigo de salida 0).
3. Confirmacion de que el video Gancho y el video Explicacion correspondan a las URLs reales de Cloudflare R2 (ambas con codigo HTTP 200 OK).
4. Documentar los cambios en memoria/ con formato YYYY-MM-DD_HH-MM_Correccion_Video_Gancho_R2.md.
5. Entregar el informe de resultados en un unico mensaje final al terminar todo el flujo.
```
