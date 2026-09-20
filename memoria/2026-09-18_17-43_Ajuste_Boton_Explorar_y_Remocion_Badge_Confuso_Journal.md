# Bitácora de Implementación: Activación de Scroll en Botón Explorar Artículos y Remoción de Píldora Confusa del Journal

- **Fecha:** 2026-09-18 17:43
- **Rama/Contexto:** Web Studio Simple - UX y Navegación de Bloques CMS
- **Estado:** Corregido y Verificado

---

## 1. Problemas Detectados
1. **Botón "Explorar Artículos" inactivo:** En el bloque `HERO`, el enlace de llamada a la acción (`ctaText`) utilizaba un tag `<a>` con `href="#"`. Al no tener una URL externa configurada, no realizaba ninguna acción al hacer clic.
2. **Píldora decorativa confusa ("Journal & Guías Pedagógicas"):** En la cabecera de `JournalBlock` existía un badge con diseño redondeado (`rounded-full`) e icono que simulaba visualmente ser un botón interactivo, pero era solo una etiqueta estática. Al haber insertado el usuario un bloque Hero previo con el título de la sección, dicha etiqueta resultaba redundante y confusa.
3. **Contraste de texto en cabecera del Journal:** Los textos `titulo` y `subtitulo` estaban definidos en `text-slate-900` y `text-slate-600`, perdiendo visibilidad sobre el fondo oscuro general de la página.

---

## 2. Solución Implementada
1. En `src/components/common/CmsBlockRenderer.tsx`:
   - Se convirtió el CTA del bloque `HERO` en un botón funcional interactivo.
   - Si no tiene una URL externa definida (o es `#`), ejecuta un desplazamiento animado suave (`scrollIntoView({ behavior: 'smooth' })`) directo hacia la sección de noticias (`#journal`).
2. En `src/components/common/JournalBlock.tsx`:
   - Se eliminó la píldora decorativa "Journal & Guías Pedagógicas" que inducía al usuario a hacerle clic en vano.
   - Se ajustó la tipografía de la cabecera a `text-white` para el título y `text-slate-300` para el subtítulo, logrando máxima legibilidad y contraste.
   - Se dotó a los botones de filtro de categorías inactivas de fondo translúcido nítido (`bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10`).

---

## 3. Verificación
- `npx tsc --noEmit`: 0 errores, código 0.
- El botón "Explorar Artículos" traslada al usuario directamente a la grilla de artículos mediante scroll suave.
