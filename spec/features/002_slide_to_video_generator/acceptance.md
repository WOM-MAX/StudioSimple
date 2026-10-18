# Criterios de Aceptación: 002_slide_to_video_generator

## Criterios de Aceptación (DoD)

1. **Sintaxis y Tipado Estricto:**
   - Todo el código en `scripts/video_engine/` compila limpiamente sin errores de TypeScript (`npx tsc --noEmit` o ejecución directa con `tsx`).
2. **Síntesis Multi-Voz Verificada:**
   - Generación exitosa de audio para voces masculinas y femeninas en español latinoamericano (`es-CL-CatalinaNeural`, `es-CL-LorenzoNeural`, etc.).
   - Archivos de audio generados > 0 bytes con reproducción clara y sin cortes abruptos.
3. **Renderizado de Escenas Individuales:**
   - Cada lámina produce un archivo `.mp4` en resolución 1920x1080 a 30fps.
   - La duración del video de cada escena corresponde exactamente a la duración del audio correspondiente (+ buffer de seguridad de 0.5s para cierre visual).
   - Movimiento Ken Burns suave apreciable visualmente.
4. **Video Master Consolidado:**
   - La unión de todas las escenas produce un archivo `clase_completa.mp4` continuo, con audio alineado y transiciones fluidas.
5. **Autonomía y Trazabilidad:**
   - Ejecución completa sin interrupciones intermedias.
   - Registro en bitácora `memoria/` de la arquitectura y resultados de la prueba piloto.
