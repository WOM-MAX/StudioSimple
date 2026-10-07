# Bitácora de Resolución: Alineación del Editor Hero CMS y Fix Navegación Logo Landing

**Fecha:** 2026-10-07 16:15  
**Contexto:** Corrección de dos problemas críticos reportados por el usuario en EstudioSimple:
1. Al editar el bloque HERO en el CMS, los textos presentados ("Aprende lo Esencial, Valídalo en tu Cuaderno.", etc.) no correspondían a lo que salía en pantalla en la landing page, mostrando campos para editar que no aparecían en la web.
2. Al presionar el logotipo "EstudioSimple" en la barra de navegación, la página se acortaba suprimiendo secciones de inicio, dando la impresión de que existían "dos páginas de inicio".

---

## 1. Causa Raíz Identificada

### A. Bug de Redirección del Logotipo (`PublicHeader.tsx`)
- En `PublicHeader.tsx`, el evento `onClick` del logotipo evaluaba:
  ```tsx
  const isHomeActive = deduplicatedPages.some((p) => p.slug === '/' && p.activo !== false);
  onNavigatePage(isHomeActive ? '/' : '/planes');
  ```
- `deduplicatedPages` se calculaba a partir de `menuPages`, las cuales filtran exclusivamente las páginas donde `p.mostrarEnMenu === true`.
- Dado que la página de Inicio (`slug: '/'`) tenía configurado `mostrarEnMenu: false` (para no duplicar el enlace "Inicio" en los textos del menú), `isHomeActive` evaluaba a `false`.
- Como consecuencia directa, al hacer clic en el logotipo, el sistema redirigía forzosamente a `/planes`.
- Al estar en `/planes`, `LandingPage.tsx` no renderizaba las secciones de la portada (`orderedHomeSections`), sino el contenedor de página secundaria con únicamente los bloques configurados para `/planes`, provocando la supresión de las secciones de inicio (Scrubber, Pilares, Método, Simulador, etc.) y la sensación de una "página acortada" o "segunda página de inicio".

### B. Desconexión de Textos del Bloque HERO en el CMS (`BlockFormModal.tsx`)
- El bloque interactivo de la portada es un Frontis Scrubber cinemático de 3 fases (`HeroScrollScrubber`).
- En `BlockFormModal.tsx`:
  1. Al tener `tipoBloque: 'HERO'`, se desplegaban al inicio del modal los campos genéricos de "Título del Bloque *" y "Subtítulo / Bajada Descriptiva", los cuales contenían textos heredados históricos ("Aprende lo Esencial, Valídalo en tu Cuaderno...") que jamás eran leídos por `HeroScrollScrubber`.
  2. Adicionalmente, se renderizaba el formulario de "Cabecera Hero Limpia" con cargador de imágenes de fondo (destinado a páginas estáticas secundarias).
  3. Los campos de las 3 fases del Scrubber quedaban abajo, con valores predeterminados desfasados respecto a los fallbacks visuales de la web.
  4. En `HeroScrollScrubber.tsx`, al recibir `fase1Titulo`, se omitía el resaltado dinámico de la palabra destacada (`highlightWord`) en color amarillo `#F8AD22`.

---

## 2. Soluciones Implementadas

### A. Navegación Universal del Logotipo
- En `Web Studio Simple/src/components/common/PublicHeader.tsx`:
  - Se simplificó el manejador del clic del logotipo a `onClick={() => onNavigatePage('/')}`.
  - El clic en el logo siempre conduce al Home (`'/'`), respetando la convención universal de la web sin depender de si la página de inicio está visible como enlace de texto en la barra de menú.
  - En caso de que la página de inicio esté inactiva (`activo: false`), la guardia existente en `LandingPage.tsx` maneja la redirección controlada.

### B. Formulario Canónico del Hero Scrubber en el CMS
- En `Web Studio Simple/src/components/admin/cms/BlockFormModal.tsx`:
  - Se introdujo el helper `isHeroScrubber = tipoBloque === 'HERO_SYSTEM' || (tipoBloque === 'HERO' && section?.id === 'sec-hero')`.
  - Cuando `isHeroScrubber` es verdadero, se ocultan automáticamente los campos confusos de título genérico, subtítulo genérico e imagen de fondo estándar.
  - Se habilitó la interfaz visual dedicada **"Configuración de Portada Interactiva (Frontis Scrubber)"**, cubriendo con fidelidad del 100% las 3 fases del desplazamiento:
    - **Fase 1 (0% - 35%)**: Insignia (Badge), Título Principal, Palabra Resaltada en Amarillo (`highlightWord`), Subtítulo Descriptivo e Indicador de Scroll con flecha.
    - **Fase 2 (35% - 70%)**: Insignia Fase 2, Título Fase 2 y Subtítulo Descriptivo.
    - **Fase 3 (70% - 100%)**: Insignia Fase 3, Título Fase 3, Subtítulo Descriptivo y Botón de Acción hacia el Método.
  - En el guardado (`handleSubmit`), cuando `isHeroScrubber` está activo, `savedSection.titulo` y `savedSection.subtitulo` se sincronizan automáticamente con la Fase 1, garantizando que el listado de bloques del administrador muestre el nombre exacto de la portada.

### C. Soporte Dinámico y Resaltado en `HeroScrollScrubber.tsx`
- En `Web Studio Simple/src/components/landing/HeroScrollScrubber.tsx`:
  - Se añadió la función `renderFase1Titulo()` que detecta si el título contiene `highlightWord` e inyecta dinámicamente el estilo amarillo `<span className="text-[#F8AD22]">{highlight}</span>`.
  - Se vincularon dinámicamente los campos `fase1IndicadorScroll` y `fase3BotonTexto`.

### D. Sincronización Canónica de Datos y Base de Datos Neon
- Se actualizaron las semillas y configuraciones canónicas en `Web Studio Simple/src/data/initialCmsData.ts` y `data/cms_pages.json`.
- Se ejecutó la sincronización con Neon PostgreSQL (`SystemSetting` con clave `cms_pages`), asegurando que la base de datos en la nube almacene los textos canónicos exactos.

---

## 3. Verificación Técnica
- `npm run build` en `Web Studio Simple` compiló limpiamente con código de salida 0:
  - 1,683 módulos transformados sin errores TypeScript.
  - Empaquetado Vite completado exitosamente en 11.71 segundos.
