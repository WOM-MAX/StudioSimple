# Bitácora: Unificación Título de Pestaña Oficial — EstudioSimple

**Fecha:** 2026-10-08 21:58 (America/Santiago)  
**Autor:** Antigravity  

---

## 1. Contexto y Diagnóstico
- En la barra de pestañas de los navegadores (Chrome), el título de la página web mostraba:
  `EstudioSimple - Exámenes Libres MINEDUC | Aprender en familia, paso a paso`
- Debido a la longitud del texto y el límite físico de píxeles de cada pestaña en el navegador, el nombre se cortaba con puntos suspensivos como:
  `EstudioSimple - Exámenes Libre...`
- El usuario solicitó explícitamente simplificar el texto a únicamente **`EstudioSimple`**.

---

## 2. Modificaciones Realizadas
- **Archivo:** `Web Studio Simple/index.html`
  - Se modificó la etiqueta `<title>` para que declare estrictamente:
    ```html
    <title>EstudioSimple</title>
    ```
  - Se incorporaron parámetros de cache-busting (`?v=20261008_3`) en todas las referencias de iconos y favicons (`favicon.svg`, `favicon-32x32.png`, `favicon-16x16.png`, `favicon.ico`, `apple-touch-icon.png` y `site.webmanifest`) para forzar la invalidación inmediata de caché tanto en Cloudflare como en la base de datos interna de Chrome.

---

## 3. Validación y Resultados
- Compilación de producción (`npm run build`) en `Web Studio Simple` ejecutada exitosamente con código de salida 0 (12.44s).
- Artefactos estáticos empaquetados en `dist/index.html` listos para distribución y despliegue continuo en Railway.
