# Bitácora de Desarrollo: Autonomía Total en Edición y Reordenamiento de Secciones de la Landing Page en CMS

**Fecha:** 2026-10-07 13:55  
**Autor:** Antigravity AI Coding Assistant  
**Proyecto:** EstudioSimple  
**Objetivo:** Refactorización integral del sistema de edición de la landing page en EstudioSimple para otorgar 100% de autonomía al administrador en el CMS, eliminando el hardcoding de secciones, parametrizando los 4 pilares de éxito académico, las 4 pestañas del método, los textos de planes y hero, y habilitando el reordenamiento secuencial dinámico de cualquier sección en `LandingPage.tsx`.

---

## 1. Diagnóstico Inicial y Causa Raíz

Antes de esta refactorización, el sistema presentaba varias limitaciones que impedían al administrador editar la landing page con total independencia:
1. **Hardcoding en `LandingPage.tsx`:** Las secciones fundamentales de la landing page (Hero interactivo, "¿Cómo logramos el éxito académico?", "Nuestro Método" y "Planes Adaptados a Tu Familia") estaban estructuradas en el JSX con textos fijos en HTML y en un orden predeterminado e inmutable.
2. **Ausencia del bloque `sec-exito` en el CMS:** La sección de los 4 pilares pedagógicos de éxito escolar no existía como bloque formal dentro del catálogo de secciones (`CmsBlockType`), lo que impedía que apareciera en el panel de administración o que sus tarjetas pudieran ser editadas.
3. **Pestañas de Método estáticas:** Aunque existía un bloque `METODO` en el CMS, su modal solo permitía editar títulos generales, ignorando las 4 pestañas interactivas ("1. Pantalla y Papel", "2. Mediación Dual", "3. Neurodiversidad", "4. Rigor MINEDUC").
4. **Falta de endpoint `/api/cms/pages` en Vite Dev Server:** Si bien `server.js` ya persistía `data/cms_pages.json` en producción, `vite.config.ts` carecía del middleware para manejar `/api/cms/pages` en entorno de desarrollo local.
5. **Imposibilidad de intercalar secciones personalizadas:** Los bloques adicionales creados por el administrador en el CMS quedaban forzados a renderizarse al final de la página, sin respetar el atributo `orden`.

---

## 2. Solución e Implementación Técnica

### a) Extensión del Modelo de Datos Tipado (`Web Studio Simple/src/types/cms.ts`)
- Se incorporó el nuevo tipo de bloque `'PILARES'` en `CmsBlockType`.
- Se definieron e importaron las siguientes interfaces tipadas para configuraciones del CMS:
  - `PilarItem` y `PilaresConfig`: Array de pilares con `numero`, `titulo`, `descripcion`, `icono` y `colorIcono`, además de `badgeText` y `colorBordeEtiqueta`.
  - `MetodoTabItem` y `MetodoConfig`: Array de 4 pestañas con `id`, `numeroTab`, `colorTab`, `badge`, `badgeColor`, `titulo`, `descripcion`, `destacado`, `icono` y `colorAcento`.
  - `PricingSectionConfig`: Titulares, viñetas configurables por plan (`bulletsMensual`, `bulletsAnual`, `bulletsPrueba`), y textos del banner inferior de comparativa curricular (`bannerTitulo`, `bannerDescripcion`, `bannerBotonTexto`).
  - `HeroScrubberConfig`: Textos y etiquetas de las 3 fases del Hero con scroll scrubbing (`fase1Badge`, `fase1Titulo`, `fase1Subtitulo`, `fase2Badge`, etc.).

### b) Creación y Sincronización de Datos Iniciales y Auto-reparación
- **`Web Studio Simple/src/data/initialCmsData.ts`:**
  - Se incorporó la sección oficial `sec-exito` con `tipoBloque: 'PILARES'`, `orden: 2` y los 4 pilares por defecto.
  - Se parametrizaron `sec-metodo` (`orden: 3`), `sec-pricing` (`orden: 5`) y `sec-hero` (`orden: 1`).
  - Se reenumeraron las secciones siguientes (`sec-testimonios: 6`, `sec-faq: 7`, `sec-home-journal: 8`, `sec-home-eventos: 9`).
  - En la función `loadCmsPages()`, se agregaron comprobaciones de **auto-reparación** para clientes con caché previa en `localStorage`, garantizando que `sec-exito`, los tabs de método, las viñetas de planes y los textos del hero se inyecten automáticamente si no existían.
- **`data/cms_pages.json`:**
  - Se actualizó el archivo maestro en disco para persistir la sección `sec-exito` y las configuraciones extendidas.

### c) Formularios de Edición Dedicados en el CMS (`BlockFormModal.tsx`)
- Se implementaron editores visuales completos e interactivos con validación y botones de reinicio a valores por defecto para:
  1. **HERO / HERO_SYSTEM:** Edición de titulares, insignias y subtítulos de Fase 1, Fase 2 y Fase 3.
  2. **PILARES (4 Pilares de Éxito Académico):** Formulario para gestionar cada tarjeta (título, descripción, icono Material Symbols, color de fondo del icono) con capacidad de agregar y restaurar.
  3. **METODO (4 Pestañas del Método Pedagógico):** Formulario para gestionar cada una de las 4 pestañas (nombre de pestaña, insignia, título explicativo, texto descriptivo, icono y color de acento).
  4. **PRICING (Planes y Precios):** Edición de viñetas individuales para Plan Mensual, Plan Anual y Prueba 7 Días, más los textos del banner inferior de comparativa.
  5. **SIMULADOR:** Opciones de umbral de aprobación y alternativas por pregunta.

### d) Parametrización del Hero Interactivo (`HeroScrollScrubber.tsx`)
- Se definió la interfaz `HeroScrollScrubberProps` con propiedad opcional `config?: HeroScrubberConfig`.
- Se parametrizaron los textos de las Fases 1, 2 y 3 para leer dinámicamente desde `config`, con fallback transparente a los textos canónicos si no se han editado.

### e) Renderizado Secuencial Dinámico en la Landing (`LandingPage.tsx`)
- Se eliminó el hardcoding estático de las secciones.
- Se implementó `orderedHomeSections`:
  ```tsx
  const orderedHomeSections = useMemo(() => {
    if (!homePage || !homePage.secciones) return [];
    return [...homePage.secciones]
      .filter((s) => s.activo && s.tipoBloque !== 'CINTA_NOTICIAS')
      .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  }, [homePage]);
  ```
- Se implementaron métodos modulares de renderizado (`renderHeroSection`, `renderPilaresSection`, `renderMetodoSection`, `renderTestimoniosSection`, `renderFaqSection`, `renderPricingSection`) que consumen directamente la configuración de cada bloque y respetan los tokens visuales y estilos glassmorphism del sitio.
- En el switch de renderizado, cualquier bloque personalizado (HTML, banners, columnas, etc.) se renderiza en la posición exacta indicada por `sec.orden`.
- Se adaptó el renderizado de páginas secundarias para que también respete el orden secuencial de sus bloques.

### f) Sincronización del Endpoint en Entorno de Desarrollo (`vite.config.ts`)
- Se añadió el middleware para `/api/cms/pages` (métodos `GET` y `POST`) en `vite.config.ts`, permitiendo que los cambios realizados en el panel administrativo durante el desarrollo local se sincronicen directamente con `data/cms_pages.json`.

---

## 3. Validación y Resultados

- **Compilación TypeScript y Bundle de Producción:**
  - Comando: `npm run build` (`tsc && vite build`)
  - Código de salida: `0` (exitoso)
  - Tiempo de compilación: 13.04s
  - Módulos transformados: 1,683
  - Errores de linter y compilador: 0
- **Integridad de Datos:**
  - `data/cms_pages.json` validado y sincronizado con `sec-exito` y configuración de pestañas y viñetas.
- **Autonomía del Administrador:**
  - El administrador ahora puede:
    1. Editar textos, insignias y colores de los 4 pilares de éxito académico.
    2. Modificar el contenido de cualquiera de las 4 pestañas del método pedagógico.
    3. Cambiar las viñetas y textos descriptivos de los planes de suscripción.
    4. Personalizar las fases del scrubber del Hero.
    5. Reordenar libremente cualquier sección de la landing page arrastrándola o modificando el número de orden en el CMS.
    6. Intercalar bloques personalizados en cualquier punto de la página de inicio.
