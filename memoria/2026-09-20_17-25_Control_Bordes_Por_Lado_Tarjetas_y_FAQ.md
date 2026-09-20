# Registro de Memoria: Control y Personalización de Bordes por Lado en Tarjetas, Testimonios y FAQ

## 1. Contexto y Objetivos
- Permitir al administrador configurar la ubicación del borde (acento superior, inferior, lateral izquierdo, laterales, superior-inferior o completo) y el grosor (1px a 4px) en tarjetas de testimonios y cápsulas de preguntas frecuentes (FAQ/Acordeón).
- Implementar la función de cálculo de bordes adaptativa getBorderStyles para entornos claros y oscuros.
- Extender los formularios de administración global (ConfiguracionGeneralView.tsx) y a nivel de bloque (BlockFormModal.tsx).
- Replicar y validar la compilación TypeScript en Web Studio Simple y en el paquete standalone E:\CMS.

## 2. Modificaciones Realizadas

### A. Tipado de Datos (src/types/cmsExtras.ts y src/types/cms.ts)
- Se creó el tipo:
  `export type ModoBordeTarjeta = 'completo' | 'superior' | 'inferior' | 'lateral-izquierdo' | 'laterales' | 'superior-inferior';`
- Se extendió `EstilosGlobalesConfig` con `modoBordeComentarios`, `grosorBordeComentarios`, `modoBordeFaq` y `grosorBordeFaq`.
- Se extendieron `TestimoniosConfig` y `AcordeonConfig` con `modoBorde` y `grosorBorde`.
- En `initialCmsExtrasData.ts`, se asignaron valores por defecto en `INITIAL_SITE_CONFIG.estilosGlobales`.

### B. Utilidad de Cálculo de Estilos (src/components/common/borderStyles.ts)
- Se creó la función `getBorderStyles(modo, color, grosor, bordeBase)` que devuelve el objeto `React.CSSProperties` aplicando los anchos y colores exactos al lado correspondiente (superior, inferior, franja izquierda, laterales, o contorno total).

### C. Renderizado en Componentes Públicos y Landing
- `TestimoniosBlock.tsx`: Aplica `getBorderStyles` en el carrusel/slider y en la grilla de testimonios.
- `CmsBlockRenderer.tsx`: Aplica `getBorderStyles` a cada cápsula de acordeón/FAQ según la configuración del bloque.
- `LandingPage.tsx`: Aplica `comentariosBorderStyles` a las 4 tarjetas testimoniales de la Sección 5 y `faqBorderStyles` a las 6 cápsulas de preguntas frecuentes de la Sección 6.

### D. Panel de Administración CMS
- `ConfiguracionGeneralView.tsx`: En la pestaña "Colores de Elementos (Paleta)" se agregaron selectores de ubicación de borde (6 modos) y de grosor (1px a 4px) tanto para Testimonios como para FAQ, con previsualización en vivo.
- `BlockFormModal.tsx`: Se agregaron los selectores de modo y grosor de borde en los bloques `ACORDEON` / `FAQ` y `TESTIMONIOS`.

### E. Sincronización y Validación
- Se actualizó `deploy_cms.cjs` incorporando `borderStyles.ts` y exportándolo en `src/index.ts`.
- Despliegue ejecutado hacia `E:\CMS`.

## 3. Verificación Técnica
- Compilación en `d:\StudioSimple - Antigravity\Web Studio Simple` (`npx tsc --noEmit`): 0 errores (código de salida 0).
- Compilación en `e:\CMS` (`npx tsc --noEmit`): 0 errores (código de salida 0).
