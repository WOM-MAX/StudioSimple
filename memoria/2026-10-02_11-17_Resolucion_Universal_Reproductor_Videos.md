# Bitácora Técnica: Resolución Universal y Blindaje del Reproductor de Video en Editor y Aula Interactiva

- Fecha y Hora: 2026-10-02 11:17
- Entorno: EstudioSimple (Vite + React + TypeScript + Tailwind CSS)
- Áreas Afectadas: Editor de Lecciones (CMS Admin), Aula Interactiva del Adulto, Aula Interactiva del Estudiante, Adaptadores de Persistencia de Lecciones.

---

## 1. Diagnóstico y Causa Raíz

Se identificaron tres fallas estructurales que impedían la reproducción de videos y la persistencia de cambios:

1. Incompatibilidad de Formatos y Bloqueo de Embebidos:
   - Las URLs de plataformas de transmisión (YouTube, Cloudflare Stream, Vimeo, Google Drive) eran inyectadas directamente en etiquetas video o en iframes sin transformación a endpoints de inserción (embed).
   - En iframes, URLs estándar como youtube.com/watch?v=... o watch.cloudflarestream.com/... eran rechazadas por los encabezados del servidor (X-Frame-Options: SAMEORIGIN).
   - En etiquetas video, el atributo crossOrigin="anonymous" causaba rechazo CORS en servidores CDN (incluyendo buckets directos de Cloudflare R2 pub-*.r2.dev) que no emiten encabezados Access-Control-Allow-Origin: *.

2. Regresión por Fallback Fantasma al Limpiar Campos:
   - En lesson-adapter.ts (adaptGeneratorLessonToPlayer), la asignación utilizaba la expresión:
     (genLesson.paso2_hook as any).videoUrl || (genLesson.paso2_hook as any).videoSrc || (isMat7bOa01L01 ? 'https://...' : '')
   - Cuando el usuario borraba la URL en el editor para dejarla vacía (""), la evaluación lógica booleana saltaba al fallback de fábrica de Matemática 7B OA01 Clase 1, forzando la reaparición del video predeterminado.

3. Desincronización entre videoSrc y videoUrl:
   - El editor operaba primariamente sobre lessonData.hook.videoSrc y lessonData.formalization.videoSrc, mientras que algunos componentes o adaptadores serializaban hacia videoUrl. Al no estar sincronizados de forma bidireccional, se producían pérdidas de estado o inconsistencias de lectura.

---

## 2. Modificaciones Implementadas

### A. Módulo Canónico de Resolución de Video (video-utils.ts)
Se creó el módulo Web Studio Simple/src/lib/video-utils.ts con la función universal resolveVideoSource(rawUrl?: string):
- Sanitización de entrada: remoción de espacios en blanco al inicio y final, saltos de línea y comillas dobles o simples accidentales.
- YouTube: Detección de watch?v=ID, youtu.be/ID, youtube.com/shorts/ID y youtube.com/embed/ID, convirtiendo a https://www.youtube.com/embed/ID con isEmbed: true.
- Cloudflare Stream: Detección de cloudflarestream.com/ID/watch, watch.cloudflarestream.com/ID, customer-*.cloudflarestream.com/ID/*, iframe.videodelivery.net/ID y videodelivery.net/ID, convirtiendo a https://iframe.videodelivery.net/ID con isEmbed: true.
- Vimeo: Detección de vimeo.com/ID y player.vimeo.com/video/ID, convirtiendo a https://player.vimeo.com/video/ID con isEmbed: true.
- Google Drive: Detección de drive.google.com/file/d/ID/view o /preview, convirtiendo a https://drive.google.com/file/d/ID/preview con isEmbed: true.
- Archivos Multimedia Directos: Archivos con extensión .mp4, .webm, .ogg, .mov, .m4v y Cloudflare R2 (pub-*.r2.dev), retornando URL limpia directa con isEmbed: false.
- Valores vacíos o no válidos: Retorna isValid: false y isEmbed: false de forma determinista.

### B. Corrección del Editor de Lecciones (LessonEditorView.tsx)
- Integración de resolveVideoSource para las previsualizaciones de Paso 2 (hook) y Paso 4 (formalization).
- Previsualización dinámica: renderizado condicional con iframe para servicios embebidos (YouTube, Stream, Vimeo, Drive) y video para archivos directos (.mp4, R2).
- Eliminación de crossOrigin="anonymous" en etiquetas video para prevenir fallas de CORS.
- Sincronización simultánea de videoSrc y videoUrl tanto en la edición manual como al hacer clic en el botón "Limpiar".

### C. Corrección del Aula Interactiva del Adulto (AdultLessonView.tsx)
- En AdultVideoPlayer, integración de resolveVideoSource.
- Si isEmbed es true, renderiza un iframe seguro con atributos allow y allowFullScreen.
- Eliminación del atributo crossOrigin="anonymous" de la etiqueta video.
- Botón "Continuar a la siguiente etapa" y avance de sesión garantizados tanto para videos embebidos como para archivos directos o lecciones sin video asignado.

### D. Corrección del Aula Interactiva del Estudiante (StudentLessonView.tsx)
- En SyncedStudentVideo, integración de resolveVideoSource.
- Eliminación del bloque if (embedStreamUrl) duplicado en la lógica de renderizado.
- Eliminación del atributo crossOrigin="anonymous" de la etiqueta video.
- Preservación de los controles de desbloqueo de audio (autoplay policy) para videos directos.

### E. Blindaje de Adaptadores de Persistencia (lesson-adapter.ts)
- Definición de función auxiliar resolveLessonVideo(videoUrl, videoSrc, fallbackUrl) que respeta cadenas vacías ("") si el usuario borró la URL explícitamente, evitando la reasignación automática de los videos de fábrica.
- Sincronización bidireccional estricta de videoSrc y videoUrl en hook y formalization en adaptGeneratorLessonToPlayer y en adaptPlayerLessonToGenerator.
- Actualización de los tipos de datos en src/types/lesson.ts agregando videoUrl? opcional tanto en hook como en formalization para integridad tipográfica de TypeScript.

---

## 3. Pruebas y Validación Realizadas

1. Pruebas Unitarias de Resolución (test_video_resolver.ts):
   - Ejecutados 11 casos de prueba cubriendo YouTube estándar, YouTube Shorts, YouTube YouTu.be, Cloudflare Stream Watch, Cloudflare Stream Customer Iframe, Vimeo, Google Drive, Cloudflare R2 (.mp4), URLs con espacios/comillas y URLs vacías.
   - Resultado: 11/11 casos aprobados exitosamente (código de salida 0).

2. Compilación de Producción (npm run build):
   - Ejecución de tsc && vite build en Web Studio Simple.
   - 1655 módulos transformados.
   - Cero errores de TypeScript y código de salida 0.
