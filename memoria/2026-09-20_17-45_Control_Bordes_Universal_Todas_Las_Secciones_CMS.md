# Control Universal de Bordes y Acentos en Todas las Secciones del Constructor CMS

## 1. Contexto y Requerimiento
El usuario solicitó que la opción de control de bordes por lado (ubicación: completo, superior, inferior, lateral-izquierdo, laterales, superior-inferior; grosor: 1px, 1.5px, 2px, 3px, 4px; y color mediante ColorPicker) esté disponible en **todas las secciones** del constructor de páginas del CMS.

## 2. Acciones Realizadas

### A. Tipos de Datos (src/types/cms.ts y src/types/cmsExtras.ts)
- Se extendieron las interfaces de configuración de todos los bloques en `src/types/cms.ts`:
  * `CintaNoticiasConfig`
  * `EventosConfig`
  * `GaleriaConfig`
  * `TestimoniosConfig`
  * `AcordeonConfig`
  * `LineaTiempoConfig`
  * `CtaBotonesConfig`
  * `EstadisticasConfig`
  * `EquipoConfig`
  * `ContactoInfoConfig`
- En cada interfaz se incorporó soporte explícito para:
  * `colorBorde?: string`
  * `modoBorde?: ModoBordeTarjeta`
  * `grosorBorde?: string`

### B. Formulario del Constructor (BlockFormModal.tsx)
- Se removieron los selectores duplicados o dispersos que existían de forma aislada en `ACORDEON` y `TESTIMONIOS`.
- Se implementó un panel unificado y universal: **"Estilo de Borde y Acento de Sección / Tarjetas"** disponible para todas las secciones (`tipoBloque !== 'ESPACIADOR'`), que incluye:
  * Selector de Color de Borde con `ColorPickerField`.
  * Selector de Ubicación del Borde / Acento:
    - Contorno Completo (Todos los lados)
    - Línea de Acento Superior (Arriba)
    - Franja Lateral Izquierda (Acento vertical)
    - Línea Inferior (Abajo)
    - Ambos Lados (Izquierda y Derecha)
    - Superior e Inferior (Arriba y Abajo)
  * Selector de Grosor del Borde (1px, 1.5px, 2px, 3px, 4px).
  * Vista previa en tiempo real del borde configurado sobre una tarjeta modelo.
  * Botón para restablecer el estilo por defecto si se desea volver al diseño base del tema.

### C. Renderizado Visual Universal (CmsBlockRenderer.tsx y Componentes)
- En `CmsBlockRenderer.tsx`, se aplicó el generador de estilos `getBorderStyles` a todas las secciones del constructor:
  * `PAGE_HEADER`: Contenedor principal.
  * `HERO`: Tarjeta/contenedor hero.
  * `IMAGEN_TEXTO`: Contenedor bento 50/50.
  * `TEXTO` y `RICHTEXT`: Contenedor editorial.
  * `TARJETAS`: Cada tarjeta individual de la grilla.
  * `ACORDEON` y `FAQ`: Cada cápsula desplegable.
  * `DESCARGAS_LIST`: Cada tarjeta de documento descargable.
  * `TESTIMONIOS`: Conectado a través de `TestimoniosBlock`.
  * `GALERIA_MINI`: Cada tarjeta multimedia tanto en carrusel horizontal como en grilla responsiva.
  * `VIDEO`: Contenedor del reproductor.
  * `ALERTA`: Banner informativo o de advertencia.
  * `LINEA_TIEMPO`: Cada tarjeta de fase pedagógica.
  * `CTA_BOTONES`: Contenedor banner del llamado a la acción.
  * `ESTADISTICAS`: Cada métrica o cifra destacada.
  * `EQUIPO`: Cada tarjeta de miembro del equipo pedagógico.
  * `CONTACTO_INFO`: Cada cápsula de contacto (correo y WhatsApp).
  * `CINTA_NOTICIAS`: Contenedor de la barra ticker superior.
  * `EVENTOS`: Cada tarjeta de evento en grilla, slider y lista (`EventosBlock.tsx`).
  * `JOURNAL`: Tarjeta hero destacada y grilla de artículos (`JournalBlock.tsx`).
- En `LandingPage.tsx`, se aplicó `pilaresBorderStyles` a las 4 tarjetas de la Sección 3 (Bloques Independientes, Temario MINEDUC, Respaldo Legal, Evaluación).

### D. Sincronización y Validación Técnica
- Se ejecutó el script `node scripts/deploy_cms.cjs`, replicando todos los componentes, renderers y tipos a `E:\CMS`.
- Compilación TypeScript ejecutada con éxito en ambos proyectos:
  * `d:\StudioSimple - Antigravity\Web Studio Simple`: `npx tsc --noEmit` -> Código de salida 0 (0 errores).
  * `E:\CMS`: `npx tsc --noEmit` -> Código de salida 0 (0 errores).
