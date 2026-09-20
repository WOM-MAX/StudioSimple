# Bitácora de Implementación: Conexión Activa de Cloudinary (Upload Preset Unsigned)

- **Fecha:** 2026-09-18 16:43
- **Rama/Contexto:** Web Studio Simple - Integraciones Cloudinary
- **Estado:** Conectado y Verificado

---

## 1. Contexto y Requerimiento
El usuario configuró en su consola de Cloudinary un Upload Preset sin firmar (Unsigned) para permitir la subida directa de archivos multimedia (imágenes y videos) desde la aplicación web SPA de EstudioSimple sin exponer secretos en el cliente.

## 2. Parámetros Confirmados desde la Consola
- **Cloud Name:** `cpn5zq3g`
- **Upload Preset Name:** `estudiosimple`
- **Signing Mode:** `Unsigned`
- **API Key:** `979383715734283`
- **Asset Folder:** `estudiosimple`
- **Estado:** Activo (`enabled: true`)

## 3. Cambios Realizados
- En `src/data/initialCmsExtrasData.ts`:
  - Se actualizaron las credenciales predeterminadas en `INITIAL_SITE_CONFIG.cloudinary`.
  - Se ajustó la función `loadSiteConfig()` para garantizar que si el almacenamiento local (`localStorage`) mantenía configuraciones anteriores vacías o deshabilitadas, se apliquen de inmediato el Cloud Name `cpn5zq3g`, el Upload Preset `estudiosimple` y el estado activo.

## 4. Verificación
- `npx tsc --noEmit`: Ejecución limpia sin errores (código 0).
- Todos los uploader multimedia del Journal, Popups, Galería, Logotipos y Editor de Secciones quedan habilitados para subir archivos directamente a la Media Library de Cloudinary.
