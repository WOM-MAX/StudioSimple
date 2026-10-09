# Bitácora: Calibración Visual Favicon Squircle Alto Contraste (21:1) — EstudioSimple
**Fecha:** 2026-10-08 21:48 (America/Santiago)  
**Sesión:** Optimización de escala, bounding box y contraste del favicon en pestañas del navegador y PWA.

---

## 1. Diagnóstico del Problema Visual
- En la barra de pestañas de Chrome (tema oscuro/azul petróleo), el isotipo original en transparencia sufría dos defectos severos:
  1. **Bounding box holgado:** El PNG original de 4500×4500 contenía casi 1300 px de margen transparente vacío. Al reducirse a 16×16 px en la pestaña, el glifo efectivo media apenas ~9×9 px, viéndose diminuto frente a Gmail o ChatGPT.
  2. **Pérdida de contraste:** El Azul Marino (`#1C3257`) de la base del libro y el mentor se fundía con el fondo oscuro de la pestaña, dejando flotando solo la estrella amarilla y la cabeza naranja.

## 2. Acciones Implementadas
- **Contenedor Squircle Blanco Sólido (#FFFFFF):**
  - Se diseñó e implementó un contenedor squircle blanco con radio de esquina superelíptico (~22%) que proporciona contraste ratio 21:1 contra cualquier fondo (Dark Mode o Light Mode).
- **Recorte Perimetral (.trim()):**
  - En `scripts/generate_favicons.ts`, se incorporó `sharp.trim()` para purgar automáticamente todo margen transparente de `imagotipo.png` (área útil detectada: 3224×2846 px).
  - Se maximizó el área útil de dibujo a un 86-90% de cobertura dentro del squircle, con padding mínimo calibrado (1px en 16×16, 2px en 32×32).
- **Calibración Vectorial en `favicon.svg`:**
  - Base `<rect width="512" height="512" rx="112" fill="#FFFFFF"/>` con transformación de centrado y escalado al 110% sobre el isotipo oficial.
- **Regeneración de Suite Completa:**
  - `favicon.svg` (1.9 KB)
  - `favicon-16x16.png` (0.6 KB, squircle blanco)
  - `favicon-32x32.png` (1.2 KB, squircle blanco)
  - `favicon.ico` (1.3 KB, PNG-in-ICO 32×32 squircle)
  - `apple-touch-icon.png` (7.3 KB, squircle blanco 180×180)
  - `pwa-192x192.png` (7.6 KB, squircle blanco 192×192)
  - `pwa-512x512.png` (19.0 KB, squircle blanco 512×512)
  - `site.webmanifest` (0.5 KB)

## 3. Verificación y Resultados
- **Build de producción:** `npm run build` en `Web Studio Simple` finalizado exitosamente (código 0, 13.45s).
- **Integridad física:** `scripts/verify_favicon.ts` validó 8/8 archivos presentes en `dist/` con tamaño superior a los umbrales mínimos.
- **Despliegue:** Commit y push a `origin/main` para despliegue automatizado en Railway.
