# Bitácora de Implementación: Rediseño Editorial Limpio de JournalArticleView (Fondo Blanco y Supresión de Distractores)

- **Fecha:** 2026-09-18 16:53
- **Rama/Contexto:** Web Studio Simple - Lectura Editorial Journal
- **Estado:** Implementado y Validado con tsc exitoso

---

## 1. Problemas Detectados
1. **Falta de contraste / Texto invisible:** El contenedor no especificaba fondo blanco (`bg-white`), por lo que heredaba el fondo azul marino oscuro (`#071326`) de la Landing Page general. Las fuentes de texto oscuro (`text-slate-900`, `text-slate-700`) se volvían prácticamente invisibles e ilegibles.
2. **Exceso de distractores previos a la lectura:** Antes del cuerpo del artículo se mostraban múltiples elementos obstructivos:
   - Botón de retorno llamativo y badges complejos.
   - Separadores ruidosos.
   - Ficha de autor completa con avatar y cargos intermedios.
   - Botones de compartir en redes sociales (WhatsApp, Facebook, Copiar enlace) antes de haber leído la noticia.
   - Banners de conversión y ventas de planes.

---

## 2. Solución Implementada
En `src/components/common/JournalArticleView.tsx`:
1. **Fondo Blanco Impecable y Contraste Total:**
   - Se aplicó `bg-white text-slate-900 w-full min-h-screen pt-24 md:pt-32 pb-24` garantizando un lienzo blanco puro y lectura descansada, idéntico al estándar de Colegio Acrópolis.
   - Tipografía del artículo en `text-slate-800 text-base sm:text-lg md:text-xl leading-relaxed` con alto contraste y claridad absoluta.
2. **Jerarquía Editorial Directa (Título Arriba):**
   - Retorno simple y sobrio: `← Volver a noticias`.
   - Categoría y fecha discretos.
   - **Título principal destacado:** `text-3xl sm:text-4xl md:text-5xl font-black text-slate-900`.
   - Extracto breve editorial.
   - **Imagen de portada panorámica:** Inmediatamente después del encabezado.
   - **Cuerpo completo del artículo:** Sin cortes ni banners invasivos en medio del texto.
3. **Reubicación de Acciones al Final del Artículo:**
   - La ficha de autor y los botones para compartir en redes sociales (WhatsApp, Facebook, Copiar enlace) se trasladaron al pie de la noticia, mostrándose únicamente cuando el usuario ha concluido la lectura.
   - Se eliminó el banner de venta de planes que saturaba la pantalla.
   - Se mantuvo la grilla inferior de "Te podría interesar" sobre un fondo gris suave (`bg-slate-50`).

---

## 3. Verificación
- `npx tsc --noEmit`: 0 errores, código 0.
- Validación visual de contraste y legibilidad óptima sobre fondo blanco.
