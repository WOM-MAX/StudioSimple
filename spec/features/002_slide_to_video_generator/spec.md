# Feature Spec: 002_slide_to_video_generator

## 📌 Estado de la Especificación
- **Estado:** Approved (Aprobado por Humano)

## 🔎 Problema y Contexto
- **Problema de Negocio:** El proceso actual de producción audiovisual pedagógica depende de Google Vids o herramientas de ensamble manual. Este flujo representa un cuello de botella crítico: demanda intervención humana por diapositiva, no es automatizable por API para producción a escala (6 clases completas por OA según directriz de EstudioSimple) y carece de control determinista sobre tiempos y sincronización de láminas.
- **Solución Propuesta:** Desarrollar un motor nativo en TypeScript (`scripts/video_engine/`) que transforme directamente cada diapositiva de una presentación en una escena de video dinámica con locución neural (Edge-TTS), efecto Ken Burns progresivo (zoom/pan suave) y subtítulos dinámicos sincronizados. El motor debe permitir exportación individual por escena (`slide_XX.mp4`) y concatenación en un video master consolidado (`clase_completa.mp4`), con costo operativo marginal de $0 USD y 100% de coherencia visual y pedagógica.

---

## 🎯 Objetivos y Alcance
1. **Mapeo 1:1 Diapositiva ➔ Escena:** Cada lámina de la lección (imagen 1920x1080 o render gráfico) se convierte en una escena de video cuya duración se calibra con exactitud al milisegundo del audio narrado.
2. **Catálogo de Voces Latinoamericanas (Hombre y Mujer):**
   - Voces chilenas oficiales: `es-CL-CatalinaNeural` (Femenina) y `es-CL-LorenzoNeural` (Masculino).
   - Voces latinoamericanas neutras: `es-MX-DaliaNeural` (Femenina), `es-MX-JorgeNeural` (Masculino), `es-CO-SalomeNeural` (Femenina), `es-CO-GonzaloNeural` (Masculino).
   - Soporte para alternancia de locutor entre teoría (ej. profesora) y práctica/desafío (ej. profesor).
3. **Dinamismo Cinemático (Ken Burns):** Aplicar filtro de paneo/zoom continuo suave (1.0x a 1.04x) para eliminar la sensación de diapositiva fija sin generar sobrecarga cognitiva.
4. **Subtitulado Dinámico:** Generación de subtítulos alineados con los tiempos de la locución.
5. **Transiciones Profesionales y Ensamble Master:** Concatenación de escenas mediante fundido cruzado (crossfade) y exportación de video completo en resolución 1080p (H.264/AAC).
6. **Doble Entrega Modular:**
   - Escenas individuales (`dist/videos/[leccion]/escenas/slide_XX.mp4`) para interactividad en la PWA.
   - Video consolidado (`dist/videos/[leccion]/clase_completa.mp4`) para consumo continuo.

---

## 📐 Requisitos Funcionales (RF)
- **RF-01 (Entrada Estructurada):** El motor debe recibir un manifiesto o archivo de configuración de lección en TypeScript/JSON que especifique: título de la clase, voz predeterminada, lista de diapositivas (ruta de imagen PNG 1080p, texto de locución, voz específica opcional por lámina).
- **RF-02 (Síntesis de Audio TTS):** Generación de archivos MP3 por escena utilizando `msedge-tts` con normalización de volumen, ajuste de velocidad (0.95x para tono pedagógico) y cálculo preciso de duración.
- **RF-03 (Renderizado de Escena MP4):** Composición con FFmpeg combinando la imagen 1080p con el filtro `zoompan` y la pista de audio MP3, generando un archivo MP4 con códec `libx264` y `aac`.
- **RF-04 (Concatenación Atómica):** Script que toma la lista de escenas generadas y las une mediante FFmpeg (`concat demuxer` o filtro de fundido cruzado), produciendo el video final sin desfases de sincronía.
- **RF-05 (CLI de Ejecución):** Comando de consola `npx tsx scripts/video_engine/generar_video_leccion.ts [ruta_leccion]` para procesar de forma desatendida.

---

## 🛡️ Requisitos No Funcionales (RNF)
- **RNF-01 (Costo Cero):** No se permite el uso de APIs externas de pago con cobro por minuto o por token para el render o síntesis de voz.
- **RNF-02 (Determinismo y Fidelidad Gráfica):** Cero alucinaciones visuales; las láminas deben mantenerse fieles a las directrices de diseño y colores oficiales de EstudioSimple.
- **RNF-03 (Rendimiento y Tolerancia a Fallos):** Si una escena falla durante la síntesis o renderizado, el sistema debe reintentar hasta 3 veces antes de abortar de forma limpia con mensaje explícito.
- **RNF-04 (Compatibilidad Windows / Railway):** Código compatible con Node.js v24 y rutas multiplataforma (path normalization).
