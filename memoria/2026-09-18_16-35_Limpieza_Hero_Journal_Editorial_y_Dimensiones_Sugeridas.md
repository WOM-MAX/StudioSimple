# Bitácora de Implementación: Limpieza Estética Pre-Hero, Journal Editorial en Página Completa y Dimensiones Sugeridas de Imagen

- **Fecha:** 2026-09-18 16:35
- **Rama/Contexto:** Web Studio Simple - CMS & Journal Pedagógico
- **Estado:** Implementado y Validado con tsc y build de producción exitosos

---

## 1. Problemas Detectados
1. **Elemento residual previo al Hero:** En páginas secundarias dinámicas (por ejemplo `/blog` o `/blog-de-noticias`), se renderizaba un contenedor rígido `max-w-7xl` con una barra superior que contenía "Volver al Inicio" y "Página: [Título] ([Slug])". Esto fragmentaba el diseño, rompía la estética limpia de los bloques Hero o encabezados institucionales y generaba ruido visual innecesario.
2. **Visualización de noticias en modal emergente (popup) vs. página completa:** En la versión anterior se abría un popup emergente al consultar un artículo, a diferencia del estándar editorial de Colegio Acrópolis donde cada noticia cuenta con una página dedicada (`/journal/[slug]`) con ficha de autor, imagen panorámica, lectura descansada y artículos relacionados.
3. **Falta de dimensiones sugeridas en el Journal y vistas multimedia:** El creador/editor de artículos del Journal, popups y logos no indicaba las dimensiones ideales para cada caso de uso.

---

## 2. Solución Implementada

### A. Limpieza Estética Pre-Hero en Páginas Dinámicas
- En `src/components/landing/LandingPage.tsx`:
  - Se eliminó el bloque de cabecera residual (`border-b border-slate-200` con `Volver al Inicio` y `Página: ...`).
  - Se liberó el contenedor rígido, permitiendo que bloques como `HERO`, `PAGE_HEADER` y `JOURNAL` se rendericen con su ancho completo y fluidez visual, mientras que los bloques de contenido estándar (`GRID_CARDS`, `TEXTO_ENRIQUECIDO`, etc.) se mantienen contenidos en `max-w-7xl mx-auto px-4 md:px-12`.
  - Se calibró el espaciado superior debajo de la barra de navegación para una transición natural sin solapamientos.

### B. Vista Editorial en Página Completa (JournalArticleView)
- Se creó `src/components/common/JournalArticleView.tsx`:
  - Botón de retorno "Volver al listado de noticias".
  - Ficha de autor con avatar institucional, cargo y fecha de publicación.
  - Indicador de tiempo estimado de lectura y categoría con color personalizado.
  - Botones para compartir en redes (WhatsApp, Facebook, Copiar enlace directo).
  - Portada panorámica de alta definición (hasta 540px de altura con curvatura suave y sombra).
  - Cuerpo de la noticia con tipografía espaciosa, descansada y formato por párrafos.
  - Banner de llamado a la acción hacia Planes y Precios.
  - Sección de artículos relacionados "Te podría interesar" con navegación directa.

### C. Rediseño Estético del JournalBlock
- En `src/components/common/JournalBlock.tsx`:
  - Se incorporó una tarjeta destacada Hero Card para la noticia principal más reciente (diseño 12 columnas: 7 cols de imagen con badges sobrepuestos + 5 cols con extracto editorial, botón "Leer artículo completo" y tiempo de lectura).
  - Tarjetas secundarias con efecto de profundidad tridimensional (`-mt-6 relative mx-4 rounded-xl bg-white p-5 shadow-sm border border-slate-100`) superpuestas sobre las imágenes panorámicas.
  - Transición fluida al hacer clic que abre la vista editorial de página completa.

### D. Sugerencias de Dimensiones de Imagen en el CMS
- Se incorporaron sugerencias explícitas en los modales y formularios de subida a Cloudinary:
  - **Journal / Portada de Noticias:** `1200 x 750 px (16:10) o 1200 x 675 px (16:9 Panorámico Editorial)`.
  - **Popups y Avisos Flotantes:** `800 x 600 px (4:3) o 800 x 800 px (1:1 Flyer)`.
  - **Galería Institucional:** `1200 x 800 px (3:2) o 800 x 600 px (4:3)`.
  - **Logotipo Cabecera:** `400 x 120 px (Horizontal transparente PNG o SVG)`.
  - **Logotipo Pie de Página:** `500 x 200 px (Horizontal con imagotipo PNG o SVG)`.

---

## 3. Archivos Modificados / Creados
- `src/components/common/JournalArticleView.tsx` (Nuevo)
- `src/components/common/JournalBlock.tsx` (Modificado)
- `src/components/common/CmsBlockRenderer.tsx` (Modificado)
- `src/components/landing/LandingPage.tsx` (Modificado)
- `src/components/admin/cms/JournalView.tsx` (Modificado)
- `src/components/admin/cms/PopupsView.tsx` (Modificado)
- `src/components/admin/cms/GaleriaView.tsx` (Modificado)
- `src/components/admin/cms/ConfiguracionGeneralView.tsx` (Modificado)

---

## 4. Verificación
- `npx tsc --noEmit`: Salida con código 0, sin errores de tipado.
- `npm run build`: 1619 módulos transformados exitosamente, bundle generado en 9.28 segundos.
