# Bitácora de Resolución: Persistencia Backend de Páginas CMS y Respeto de Estado Inactivo de Inicio

**Fecha:** 2026-10-06 20:10 CLST  
**Módulo:** CMS Constructor / Enrutamiento Público / Persistencia Server-Side  
**Autor:** Antigravity (Modo Autónomo de Ejecución Directa)

---

## 1. Problema Reportado y Diagnóstico

### Síntoma
El usuario apagó la Página de Inicio desde el Constructor (CMS) en el Administrador, pero al visitar el sitio público en producción (`estudiosimple.cl`), la Página de Inicio volvió a aparecer activa.

### Causa Raíz
1. **Falta de endpoint en el backend:** El CMS guardaba las páginas únicamente en el `localStorage` del navegador local (`estudiosimple_cms_pages_v1`). En `server.js` no existía el endpoint `/api/cms/pages`, por lo que al acceder desde otro navegador, pestaña incógnito o tras un despliegue en Railway, el frontend cargaba `INITIAL_CMS_PAGES` de código fuente donde la página venía hardcodeada con `activo: true`.
2. **Hardcodeo en `LandingPage.tsx`:** Cuando la URL era la raíz (`/`), el componente renderizaba el Hero interactivo `<HeroScrollScrubber />` de forma incondicional sin evaluar el booleano `homePage?.activo`.
3. **Ausencia de redirección de fallback:** Si la raíz estaba inactiva, el menú seguía mostrando "Inicio" y el logo apuntaba a una página apagada.

---

## 2. Solución de Ingeniería Implementada

### A. Endpoint REST en Backend (`server.js`)
- Se implementó `/api/cms/pages` con soporte completo:
  - **`GET /api/cms/pages`:** Lee `data/cms_pages.json` del disco de Railway. Si existe, lo entrega a los navegadores clientes.
  - **`POST /api/cms/pages`:** Recibe el array de páginas actualizado desde el Admin Dashboard y lo guarda permanentemente en `data/cms_pages.json`.

### B. Sincronización en el Frontend (`initialCmsData.ts` y `AdminDashboard.tsx`)
- Se creó `syncCmsPagesFromBackend()` para consultar al servidor al montar la app.
- Se modificó `saveCmsPages()` para que cada vez que el administrador apague/encienda una página o edite bloques, se envíe un `POST /api/cms/pages` al backend en tiempo real.
- En `AdminDashboard.tsx`, al entrar al módulo de Páginas se refresca automáticamente el estado contra el backend.

### C. Respeto Estricto de Estado Inactivo (`LandingPage.tsx` y `PublicHeader.tsx`)
- En `LandingPage.tsx`:
  - Se condicionó el renderizado del Hero a `currentSlug === '/' && homePage?.activo !== false`.
  - Si `homePage?.activo === false` y el usuario está en `/`, el sistema redirige automáticamente al primer slug activo (por defecto `/planes`).
- En `PublicHeader.tsx`:
  - Se filtran las páginas con `p.activo !== false`, por lo que "Inicio" desaparece del menú si está apagada.
  - Al pulsar el logo oficial de EstudioSimple, si inicio está inactivo, dirige a `/planes` en lugar de una página apagada.

### D. Estado Inicial Sincronizado
- Se generó `data/cms_pages.json` en el repositorio reflejando la decisión del usuario: la Página de Inicio (`/`) configurada como `activo: false`.

---

## 3. Validación y Pruebas

- **Compilación de Producción:** `npm run build` en `Web Studio Simple`.
  - Código de salida: `0`.
  - Módulos procesados: `1683`.
  - Tiempo de compilación: `11.65s`.
- **Integridad de Datos:** `data/cms_pages.json` verificado y validado con JSON válido y estado `activo: false`.
- **Despliegue:** Sincronizado atómicamente con `scripts/git_sync.ts` hacia `origin main`.
