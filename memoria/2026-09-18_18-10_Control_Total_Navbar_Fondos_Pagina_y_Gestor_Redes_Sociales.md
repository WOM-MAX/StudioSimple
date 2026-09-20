# Bitácora: Control Total de Navbar, Fondo Dinámico por Página y Gestor Dinámico de Redes Sociales

## Contexto y Solicitud del Usuario
El usuario solicitó ampliar las capacidades del CMS y Ajustes Generales para no depender de modificaciones en código:
1. Control de la Cabecera (Navbar): Personalización del color del menú seleccionado / página activa, estilo de resaltado (subrayado, píldora o negrita), tamaño tipográfico del menú y color de texto de enlaces inactivos.
2. Fondo Dinámico por Página: Capacidad de cambiar el color de fondo y el tono de texto de cada página secundaria (por ejemplo, el blog de noticias o páginas informativas) para no depender del lienzo azul oscuro general.
3. Gestor Dinámico de Redes Sociales en el Footer: Reemplazar los campos estáticos fijos por un gestor 100% dinámico donde el usuario puede añadir cualquier red/canal (Instagram, YouTube, Facebook, TikTok, WhatsApp, Telegram, LinkedIn, X, Sitio Web u Otro), personalizar la etiqueta, URL, visibilidad y orden/eliminación, además de personalizar los colores de encabezados y tarjetas bento del footer.

## Archivos Modificados

1. [src/types/cmsExtras.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/types/cmsExtras.ts)
   - Definidos `TipoRedSocial` y la interfaz `RedSocialItem`.
   - Agregados a `SiteConfig.header`: `activeLinkColor`, `activeLinkStyle`, `menuFontSize` y `headerTextColor`.
   - Agregados a `SiteConfig.footer`: `redesSociales?: RedSocialItem[]`, `footerHeadingsColor` y `bentoCardBgColor`.

2. [src/types/cms.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/types/cms.ts)
   - Agregados `colorFondo?: string` y `colorTexto?: 'dark' | 'light'` al modelo `CmsPage`.

3. [src/data/initialCmsExtrasData.ts](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/initialCmsExtrasData.ts)
   - Actualizado `INITIAL_SITE_CONFIG` con redes sociales iniciales y estilos por defecto de cabecera/footer.
   - Refactorizada la función `loadSiteConfig()` para migrar de forma automática y transparente configuraciones previas almacenadas en `localStorage`.

4. [src/components/admin/cms/ConfiguracionGeneralView.tsx](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/admin/cms/ConfiguracionGeneralView.tsx)
   - Pestaña Cabecera: Controles de selección de color para enlace activo y enlaces inactivos, selector de estilo activo (Subrayado Clásico, Cápsula Moderna / Píldora, Sólo Negrita) y escala de fuente del menú (Compacto, Estándar, Amplio).
   - Pestaña Pie de Página: Controles de color para títulos del footer y fondo de tarjeta bento.
   - Pestaña Contacto y Redes: Gestor dinámico con botón de agregar red, selector de plataforma, campo de etiqueta, campo de URL, conmutador de estado visible/oculto y botón de eliminación.

5. [src/components/admin/cms/PageSettingsModal.tsx](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/admin/cms/PageSettingsModal.tsx)
   - Agregado selector de color de fondo (`ColorPickerField`) y selector de contraste de texto (Oscuro / Claro) en los ajustes de cada página.

6. [src/components/landing/LandingPage.tsx](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/landing/LandingPage.tsx)
   - Aplicación en Navbar de `activeLinkColor`, `activeLinkStyle`, `menuFontSize` y `headerTextColor`.
   - Aplicación en contenedor de páginas secundarias (`currentSlug !== '/'`) de `currentPage.colorFondo` y contraste de texto correspondiente.
   - Renderizado dinámico de la lista `siteConfig.footer.redesSociales` con iconos optimizados según la plataforma seleccionada, y aplicación de `footerHeadingsColor` a los títulos del footer.

## Verificación y Calidad
- Verificación de tipos: `npx tsc --noEmit` completado exitosamente sin errores.
- Empaquetado de producción: `npm run build` completado exitosamente en 9.56s generando la distribución en `dist/`.
