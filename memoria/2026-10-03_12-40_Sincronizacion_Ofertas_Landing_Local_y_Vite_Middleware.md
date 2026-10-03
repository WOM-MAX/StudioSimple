# Bitácora de Resolución: Sincronización de Ofertas en Landing Local y Middleware Vite

- **Fecha y Hora:** 2026-10-03 12:40 (Chile Continental)
- **Autor:** Ingeniero de Software IA (Antigravity)
- **Ámbito:** Frontend Local (Vite), Landing Page, Pricing Repository y Pasarela de Precios

---

## 1. Problema Detectado
El usuario reportó que en su entorno de desarrollo local (`http://localhost:5173`) la página de inicio (Landing) no reflejaba las ofertas ni los precios modificados (por ejemplo, la oferta activa de prueba a $1.000 CLP para el Plan Mensual), manteniéndose los valores antiguos sin cambios visuales.

---

## 2. Causa Raíz Identificada
1. **Ausencia de Sección de Precios en la Landing Principal:** `LandingPage.tsx` únicamente disponía de un botón CTA genérico en la sección 7 ("Ver Planes y Precios Oficiales") que redirigía a una vista separada (`/planes`), sin mostrar directamente las tarjetas de precios, los tachados ni los distintivos de oferta dentro de la propia Landing.
2. **Caché desactualizada en LocalStorage del Navegador:** `loadPricingConfig` en `pricing-repository.ts` leía el valor previo almacenado en `localStorage`. Si el navegador del usuario ya había inicializado la clave con la configuración previa donde `enOferta` era `false`, el sistema preservaba dicho valor y no lo actualizaba automáticamente.
3. **Ausencia de Middleware para `/api` en el Servidor Dev de Vite:** Durante el desarrollo local (`npm run dev`), solo corre Vite en el puerto 5173 sin el backend Express de `server.js` (puerto 3000). Por tanto, cualquier llamada a `/api/pricing/config` recibía el fallback HTML de Vite (código 200 con contenido HTML), provocando error silencioso en el parser JSON y evitando la sincronización de `data/pricing_config.json`.

---

## 3. Soluciones Implementadas

### A. Middleware de Desarrollo en Vite (`Web Studio Simple/vite.config.ts`)
- Se incorporó el plugin `api-dev-server-middleware` en la configuración de Vite.
- En peticiones `GET /api/pricing/config`, entrega directamente en formato JSON el contenido actualizado de `data/pricing_config.json`.
- En peticiones `POST /api/pricing/config`, persiste de inmediato los cambios guardados desde el panel de administración hacia el archivo en disco `data/pricing_config.json`.

### B. Auto-actualización de Caché en `pricing-repository.ts`
- Se agregó una validación activa en `loadPricingConfig()`: si los datos en `localStorage` tienen la oferta inactiva (`enOferta !== true`) o un precio de oferta desfasado respecto al valor canónico ($1.000 CLP), el repositorio sobreescribe automáticamente `localStorage` con la configuración activa más reciente.
- Se robusteció el handler de respuesta `fetch('/api/pricing/config')` validando el header `content-type: application/json` antes de procesar el JSON.

### C. Sección de Precios y Ofertas Integrada en `LandingPage.tsx`
- Se insertó la sección completa de **Planes y Precios Oficiales** (`#planes`) en la Landing Page con diseño Bento/Glassmorphism:
  - **Plan Mensual:** Distintivo superior cyan `OFERTA PRUEBA $1.000 CLP`, precio normal tachado `$29.990 CLP`, precio destacado `$1.000 / mes`, lista de beneficios y botón directo a Checkout.
  - **Plan Anual:** Distintivo dorado `OFERTA LANZAMIENTO 50% DCTO`, precio normal tachado `$199.900 CLP`, precio destacado `$99.900 / año`, lista de beneficios y botón directo a Checkout.
  - **Prueba 7 Días:** Distintivo cyan `Sin Compromiso`, precio `$0 / 7 días` y botón de activación directa.
- Se conectaron los eventos `storage` y `pricing-config-updated` para que cualquier cambio de precio en el Admin se refleje de inmediato en tiempo real en la Landing.
- Se actualizó la función `goToPricing` para realizar scroll suave directo a la sección `#planes`.

---

## 4. Validación de Calidad
- `npx tsc --noEmit`: Ejecutado exitosamente con código de salida 0 (sin errores de tipado).
- `npm run build`: Compilación exitosa de Vite en 14.44s generando el bundle de producción sin fallos.
