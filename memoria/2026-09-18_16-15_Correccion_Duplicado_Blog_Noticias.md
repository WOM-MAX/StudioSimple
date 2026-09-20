# Bitácora de Continuidad: Corrección de Duplicidad en Página de Blog

**Fecha:** 2026-09-18 16:15  
**Proyecto:** EstudioSimple - Web y CMS Administrativo

---

## 1. Causa Raíz Identificada
Al renombrar la página "Blog Pedagógico" a "Blog de Noticias", ambas páginas comenzaron a figurar simultáneamente en el menú de navegación debido a:
1. **Inyección Forzada Incondicional:** En `initialCmsData.ts`, la función `loadCmsPages()` evaluaba `!parsed.some((p: CmsPage) => p.slug === '/blog')`. Al renombrar la página y cambiar su slug a `/blog-de-noticias` (o similar), dicha comprobación fallaba y forzaba la re-inserción de la página por defecto `INITIAL_CMS_PAGES[2]` ("Blog Pedagógico" con slug `/blog`).
2. **Mutación Imprevista del Slug al Editar Título:** En `PageSettingsModal.tsx`, `handleTitleChange` cambiaba automáticamente el slug si coincidía con el título original (`slug === page.slug`), forzando el desacople de la URL `/blog` sin intención explícita del usuario.

---

## 2. Solución Implementada
1. **Eliminación de la Re-inyección Forzada:** Se eliminó en `loadCmsPages()` el bloque que volvía a insertar `defaultBlog` si no existía el slug `/blog`.
2. **Purgado Automático de Entradas Residuales:** Se añadió una rutina en `loadCmsPages()` que detecta si el usuario tiene una página de "Blog de Noticias" (o que contenga "noticias") y purga cualquier copia residual de "Blog Pedagógico", garantizando que solo quede la página deseada por el usuario.
3. **Deduplicación por ID:** Se introdujo filtrado por ID único para evitar entradas repetidas.
4. **Resguardo del Slug en Edición:** En `PageSettingsModal.tsx`, `handleTitleChange` ahora solo sugiere un slug si el campo está explícitamente vacío, evitando alterar la URL existente de páginas ya creadas.

---

## 3. Validación
- Compilación de tipos: `npx tsc --noEmit` completado con 0 errores.
- Compilación de bundle: `npm run build` exitoso en 10.54s.
