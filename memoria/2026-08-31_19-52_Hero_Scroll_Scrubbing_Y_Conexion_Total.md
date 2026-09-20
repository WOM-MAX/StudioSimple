# Registro de Continuidad: Scroll Scrubbing y Conexión Total del Ecosistema

- Fecha y Hora: 2026-08-31 19:52
- Estado: Implementación de Scroll Scrubbing interactivo en el Hero y conexión integral de navegación (Landing Page ↔ Dashboards ↔ Aula Sincronizada).

## 1. Módulos y Cambios Desarrollados

1. **Extracción y Optimización de Fotogramas:**
   - Script `extract_hero_frames.py` ejecutado con `ffmpeg`.
   - 151 fotogramas extraídos en formato WebP a 15 fps y escala optimizada (peso total 6.08 MB) en `Web Studio Simple/public/hero-frames/`.

2. **Componente `HeroScrollScrubber.tsx`:**
   - Contenedor sticky con cálculo de progreso de scroll ($0.0 \to 1.0$).
   - Renderizado acelerado por GPU en `<canvas>` mediante `requestAnimationFrame`.
   - Capas de texto con transición por fases cinemáticas (Fase 1: Entrada, Fase 2: Pedagogía de 30 min, Fase 3: Llamados a la acción directos).
   - Barra de progreso de scroll en tiempo real.

3. **Conexión de la Experiencia Completa:**
   - **Landing Page:** Integración del Hero interactivo y barra de navegación superior con enlaces directos al Panel del Apoderado, Portal del Estudiante, Aula Sincronizada y Planes.
   - **Dashboards (Apoderado y Estudiante):** Enlaces directos de entrada al Aula Sincronizada y retorno al Home / Landing al pulsar el logotipo.
   - **Aula Sincronizada:** Botón omnipresente de retorno al Dashboard en la barra superior y encabezados.

## 2. Validación
- `npx tsc --noEmit` validado con 0 errores de tipado.
