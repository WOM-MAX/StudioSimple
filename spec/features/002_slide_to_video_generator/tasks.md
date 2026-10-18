# Checklist de Tareas: 002_slide_to_video_generator

## Fase 1: Arquitectura de Tipos y Contratos
- [x] Tarea 1.1: Crear especificación formal en `spec/features/002_slide_to_video_generator/` (`spec.md`, `plan.md`, `tasks.md`, `acceptance.md`).
- [x] Tarea 1.2: Definir interfaces en `scripts/video_engine/types.ts` (`SlideData`, `LessonVideoConfig`, `SceneRenderResult`, `VoiceOption`).

## Fase 2: Servicio TTS con Catálogo Multi-Voz
- [x] Tarea 2.1: Implementar `scripts/video_engine/tts_service.ts` con catálogo de voces (`es-CL-CatalinaNeural`, `es-CL-LorenzoNeural`, `es-MX-DaliaNeural`, `es-MX-JorgeNeural`, `es-CO-SalomeNeural`, `es-CO-GonzaloNeural`).
- [x] Tarea 2.2: Agregar soporte para velocidad (0.95x) y cálculo automático de duración en milisegundos con `ffprobe`.

## Fase 3: Renderizador de Escena con Dinamismo (FFmpeg)
- [x] Tarea 3.1: Implementar `scripts/video_engine/scene_renderer.ts` combinando imagen PNG 1080p + audio MP3.
- [x] Tarea 3.2: Configurar filtro `zoompan` para paneo/zoom continuo suave (Ken Burns) sincronizado a la duración del audio.
- [x] Tarea 3.3: Soporte para subtítulos sincronizados incrustados o archivo sidecar.

## Fase 4: Orquestador y Concat Maestro
- [x] Tarea 4.1: Implementar `scripts/video_engine/video_orchestrator.ts` para procesar en serie/paralelo las escenas.
- [x] Tarea 4.2: Implementar concatenador FFmpeg demuxer para generar `clase_completa.mp4`.

## Fase 5: CLI y Prueba Piloto Funcional
- [x] Tarea 5.1: Implementar `scripts/video_engine/generar_video_leccion.ts` como interfaz de línea de comandos.
- [x] Tarea 5.2: Crear lección de prueba sintética con 3 láminas y alternancia de locutor hombre/mujer en `scripts/video_engine/test_sample_lesson.ts`.
- [x] Tarea 5.3: Ejecutar prueba piloto, validar generación de archivos MP4 (> 0 bytes) y código de salida 0.

## Fase 6: Cierre y Memoria
- [x] Tarea 6.1: Documentar en `memoria/2026-10-16_13-42_Implementacion_Generador_Video_Nativo_Slide_To_Video.md`.
- [x] Tarea 6.2: Informe final de cierre sin preguntas pasivas.
