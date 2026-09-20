# Registro de Memoria: Paridad 1:1 Popups de Colegio Acropolis y Personalizacion de Colores en Elementos

## 1. Contexto y Objetivos
- Alcanzar paridad funcional y visual 1:1 entre el sistema de Popups / Avisos Emergentes de EstudioSimple y el de Colegio Acropolis (`components/ui/PopupWrapper.tsx` y `PopupForm.tsx`).
- Implementar controles de color en la paleta corporativa y selectores hexadecimales para:
  * Bordes de etiquetas y badges (`colorBordeEtiquetas`).
  * Bordes de tarjetas de testimonios y comentarios (`colorBordeComentarios`).
  * Color de relleno de estrellas en testimonios (`colorEstrellas`).
  * Borde de cápsulas de preguntas frecuentes FAQ / Acordeón (`colorBordeFaq` / `colorBorde`).
  * Color de icono desplegable en preguntas frecuentes (`colorAcentoFaq` / `colorIcono`).
- Sincronizar el modulo standalone de produccion en `E:\CMS` asegurando cero errores de compilacion TypeScript en ambos entornos.

## 2. Modificaciones Implementadas

### A. Tipado de Datos (`src/types/cmsExtras.ts` y `src/types/cms.ts`)
- Se incorporaron los tipos y enums correspondientes a Colegio Acropolis:
  * `PopupPosicion`: 'centro-modal' | 'inferior-derecha' | 'inferior-izquierda' | 'banner-superior' | 'banner-inferior'.
  * `PopupEstiloImagen`: 'encabezado' | 'fondo' | 'solo-imagen' | 'oculta'.
  * `PopupTamanoTitulo`: 'sm' | 'md' | 'lg' | 'xl'.
  * `PopupFrecuencia`: 'siempre' | 'una_vez' | 'una_vez_por_dia'.
  * `PopupTipoAlerta`: 'info' | 'urgente' | 'matricula' | 'evento' | 'informativo' | 'promocion' | 'alerta' | 'exito'.
- Se extendio la interfaz `PopupBanner` con los 18 campos requeridos incluyendo posicion, estiloImagen, tamanoTitulo, colorFondo, colorTexto, colorBoton, frecuencia, prioridad, y alias compatibles (`contenido`, `enlaceTexto`, `enlaceUrl`).
- Se definio `EstilosGlobalesConfig` en `SiteConfig.estilosGlobales`.
- Se agregaron `colorBordeTarjeta`, `colorEstrellas` y `colorBadge` a `TestimoniosConfig`.
- Se agregaron `colorBorde` y `colorIcono` a `AcordeonConfig`.

### B. Componente PopupWrapper (`src/components/common/PopupWrapper.tsx`)
- Implementacion fiel del motor de renderizado de Colegio Acropolis adaptado a React SPA:
  * 5 posiciones con animaciones CSS dedicadas (popupSlideUp, popupFadeOut, backdropFadeIn).
  * 4 estilos de imagen con soporte de fundido degradado en 'encabezado' y afiche en 'solo-imagen'.
  * Alertas urgentes con pulso continuo (`animate-ping`) y efecto resplandor (`glowPulse`).
  * Botones CTA con animacion reflectante shimmer.
  * Cierre accesible en fondo oscuro (backdrop) para `centro-modal` y botones en tarjeta.

### C. Panel de Administracion (`PopupsView.tsx`, `ConfiguracionGeneralView.tsx`, `BlockFormModal.tsx`)
- `PopupsView.tsx`: Formulario ampliado con selectores de posicion (5), estilo de imagen (4), tamano de titulo (4), pickers de color para fondo, texto y boton, selector de frecuencia (3), selector de prioridad (1 a 10) y vista previa en vivo en tiempo real.
- `ConfiguracionGeneralView.tsx`: Nueva pestaña "Colores de Elementos (Paleta)" con botones de seleccion rapida de la paleta de marca (`#F8AD22`, `#EE751C`, `#12A1A4`, `#0B254D`, `#18AFCB`, `#10B981`) y selectores de color para badges, testimonios, estrellas y FAQ.
- `BlockFormModal.tsx`: Controles directos de color para bloques de Acordeon/FAQ y Testimonios.

### D. Renderizado en Landing y Bloques Publicos (`LandingPage.tsx`, `TestimoniosBlock.tsx`, `CmsBlockRenderer.tsx`)
- `LandingPage.tsx`:
  * Evaluacion estricta de frecuencia con almacenamiento en `localStorage` (`popup_seen_${id}`).
  * Ordenamiento por prioridad numerica descendente.
  * Integracion del componente `PopupWrapper`.
  * Aplicacion de bordes y acentos dinamicos en las secciones de Testimonios y FAQ.
- `TestimoniosBlock.tsx`: Soporte de borde configurable y color solido de estrellas en modal de slider y grilla.
- `CmsBlockRenderer.tsx`: Soporte de `colorBorde` y `colorIcono` en items de acordeon.

### E. Despliegue y Sincronizacion (`scripts/deploy_cms.cjs`)
- Se incluyo `PopupWrapper.tsx` en la lista de componentes a copiar y exportar en `E:\CMS\src\index.ts`.
- Se ejecuto la sincronizacion hacia `E:\CMS`.

## 3. Verificacion
- `npx tsc --noEmit` en `d:\StudioSimple - Antigravity\Web Studio Simple`: 0 errores.
- `npx tsc --noEmit` en `e:\CMS`: 0 errores.
