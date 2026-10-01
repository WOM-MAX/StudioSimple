# Bitacora Tecnica y Prompt Goal: Solucion Integral a Videos de Cloudflare y Sincronizacion de Aula

- Fecha: 2026-10-01 13:36 (America/Santiago)
- Proyecto: EstudioSimple (Web Studio Simple)
- Estado: Pendiente de ejecucion para la sesion de la tarde

## 1. Resumen del Diagnostico
1. Desfase de etapa: En el Editor de Lecciones se estaba editando y reproduciendo el Paso 4 (Video Explicativo), mientras que al presionar "Probar en Aula", la sesion interactiva restauro el progreso guardado en la Etapa 2 (Video Motivacional), cuyo video contenia una URL no funcional.
2. Desmontaje destructivo del reproductor: En caso de error, el reproductor HTML5 era reemplazado en su totalidad por la tarjeta de error en lugar de mantener el visor nativo con un aviso informativo superpuesto o contiguo.
3. Subdominio Cloudflare R2 con error de tipeo en el codigo base: El prefijo configurado en el boton "+ Base R2" y lecciones base tenia "0bc" (pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev) que devuelve error HTTP 404, en lugar del subdominio funcional con "6bc" (pub-8f9429cd99194355a2cf6bc7c5794833.r2.dev).
4. Vinculacion contextual de prueba: El boton "Probar en Aula" debe posicionar la sesion activa directamente en la etapa del paso que el mentor esta editando en ese momento.

## 2. Prompt Listo para Ejecucion con /goal

```text
/goal Ejecutar de inicio a fin la solucion integral a los reproductores de video y sincronizacion de lecciones en StudioSimple con 100% de autonomia y sin interrupciones intermedias.

DIRECTIVAS DE AUTONOMIA:
1. Prohibido solicitar aprobacion, hacer preguntas o pausar para pedir interaccion al usuario antes de concluir.
2. Prohibido ejecutar busquedas recursivas en la raiz del disco o scripts improvisados de Python: usa rutas exactas y TypeScript (npx tsx).
3. Delimitacion de mision: el entregable es exclusivamente el codigo/DOCX segun corresponda; nunca generar archivos PPTX finales (mision de Work).
4. Circuito de proteccion: maximo 4 intentos de autocorreccion ante fallos de compilacion antes de cambiar de enfoque o revertir cambios infructuosos.
5. Control de bloqueos: considerar posibles procesos de Node o Windows bloqueando archivos (EBUSY) antes de operaciones destructivas.
6. Punto de control: verificar estado de Git antes de mutaciones extensas para preservar reversibilidad.
7. Doble validacion: validar compilacion con codigo 0 y comprobar integridad real de los artefactos generados (tamano > 0 bytes y datos consistentes).
8. Persistencia: registrar hitos en memoria/ para tareas complejas si existe riesgo de saturacion de contexto.
9. Resuelve cualquier detalle tecnico o pedagogico no especificado aplicando los estandares de AGENTS.md y documenta la decision en el reporte final. Sin emojis y sin guiones largos.

TAREA A EJECUTAR:
1. En Web Studio Simple/src/components/admin/cms/LessonEditorView.tsx:
   - Corregir la base de R2 en el boton "+ Base R2" y placeholders cambiando "pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/" por "pub-8f9429cd99194355a2cf6bc7c5794833.r2.dev/".
   - En handleTestInLivePlayer, asegurar que la sesion sincronizada se abra en la etapa correspondiente al paso activo que el mentor esta editando (si activeStepId === 'paso4_explicativo' o 'formalization', inicializar session.stage = 'formalization'; si activeStepId === 'paso2_hook' o 'hook', stage = 'hook').
2. En Web Studio Simple/src/components/lesson/adult/AdultLessonView.tsx y StudentLessonView.tsx:
   - Modificar AdultVideoPlayer y SyncedStudentVideo para que la etiqueta video NUNCA sea desmontada del DOM cuando se dispare un error. El reproductor debe permanecer visible con sus controles operativos.
   - Si ocurre onError, mostrar un aviso informativo sutil (banner no bloqueante) indicando que si el video no carga puede reintentarse o continuar, conservando el boton de avance rapido ("Continuar a la siguiente etapa").
3. En Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase01.ts y archivos relacionados:
   - Actualizar las URLs de hook.videoSrc y formalization.videoSrc para utilizar el bucket correcto (6bc en lugar de 0bc).
4. Validar compilacion limpia ejecutando: npm run build --prefix "Web Studio Simple" con codigo de salida 0.
5. Registrar bitacora tecnica en memoria/ con fecha de hoy documentando las correcciones.
```
