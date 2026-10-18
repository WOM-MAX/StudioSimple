# Bitácora Técnica: Implementación del Generador Nativo de Video Educativo (Slide-to-Video Engine)

- **Fecha y Hora:** 2026-10-16 13:42 [America/Santiago]
- **Objetivo:** Erradicar el cuello de botella manual de Google Vids e implementar un motor determinista en TypeScript (`scripts/video_engine/`) que transforme diapositivas de presentaciones en videos pedagógicos dinámicos con locución neural (Edge-TTS) y efecto Ken Burns (FFmpeg).
- **Estado:** Completado y Verificado (Código de Salida 0).

---

## 1. Problema Abordado
En el pipeline de producción de contenidos de EstudioSimple (con 6 clases completas por OA según directriz de ChatGPT Work), la conversión de diapositivas a video dependía de procesos manuales en Google Vids. Esto generaba fricción operativa, demoras en el flujo de entrega y riesgo de desfases en la sincronización audiovisual.

---

## 2. Arquitectura Implementada

Se implementó una arquitectura desacoplada y 100% determinista compuesta por 4 módulos en TypeScript:

```
scripts/video_engine/
├── types.ts                    # Interfaces de datos (SlideSceneConfig, LessonVideoConfig, VoiceProfile, etc.)
├── tts_service.ts              # Servicio Edge-TTS multi-voz con catálogo latinoamericano y cálculo ffprobe
├── scene_renderer.ts           # Motor de renderizado FFmpeg con filtro Ken Burns (zoompan) y audio sincronizado
├── video_orchestrator.ts       # Orquestador por escenas y concatenación FFmpeg sin pérdida (concat demuxer)
├── generar_video_leccion.ts    # CLI ejecutable con soporte de parámetros y flag --voices
└── test_sample_lesson.ts       # Suite de prueba piloto integral con generación de láminas SVG/Sharp en 1080p
```

### Catálogo de Voces Neurales Integrado:
- `female-cl`: `es-CL-CatalinaNeural` (Chile - Femenina, tono pedagógico cálido)
- `male-cl`: `es-CL-LorenzoNeural` (Chile - Masculino, tono pausado y didáctico)
- `female-mx`: `es-MX-DaliaNeural` (México / Neutro - Femenina)
- `male-mx`: `es-MX-JorgeNeural` (México / Neutro - Masculino)
- `female-co`: `es-CO-SalomeNeural` (Colombia - Femenina)
- `male-co`: `es-CO-GonzaloNeural` (Colombia - Masculino)

---

## 3. Especificaciones SDD Creadas
En estricto cumplimiento del protocolo Spec-Driven Development de EstudioSimple:
- `spec/features/002_slide_to_video_generator/spec.md` (Estado: Approved)
- `spec/features/002_slide_to_video_generator/plan.md` (Grafo DAG)
- `spec/features/002_slide_to_video_generator/tasks.md` (100% tareas marcadas [x])
- `spec/features/002_slide_to_video_generator/acceptance.md` (Criterios de Aceptación)

---

## 4. Resultados de la Prueba Piloto End-to-End
Se ejecutó `npx tsx scripts/video_engine/test_sample_lesson.ts` simulando la clase `"El Sistema Digestivo Humano: Transformación de Nutrientes"` (Ciencias Naturales 7° Básico):
- **Lámina 1 (Gancho Inicial):** 17.95s audio (Catalina es-CL) ➔ `slide_01.mp4` (18.45s, 477.4 KB)
- **Lámina 2 (Concepto Central):** 16.44s audio (Lorenzo es-CL, alternancia masculina) ➔ `slide_02.mp4` (16.94s, 489.4 KB)
- **Lámina 3 (Momento Cuaderno):** 15.82s audio (Catalina es-CL) ➔ `slide_03.mp4` (16.32s, 456.8 KB)
- **Video Master Consolidado:** `ciencias_7b_oa01_demo_completa.mp4` (51.73s, 1.42 MB, resolución 1920x1080 a 30fps).
- **Tiempo de Ejecución:** Menos de 35 segundos para generar la clase completa.
- **Costo Operativo Marginal:** $0.00 USD.
