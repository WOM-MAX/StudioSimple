# Bitacora de Sesion: Embudo de 3 Etapas (Landing - Pagina de Precios - Checkout), Metodo Plan Maestro y Transicion Flotante

**Fecha:** 2026-09-17 15:15  
**Autor:** Antigravity AI Engine  
**Workspace:** `Web Studio Simple`

---

## 1. Contexto y Diagnostico Integral

A solicitud del usuario bajo comando /goal, se identificaron y resolvieron cuatro problemas estructurales en el recorrido de adquisicion y la narrativa institucional de EstudioSimple:

1. **Bucle Circular en Landing Page:** El banner inferior "Comienza tu Preparacion Hoy" redirigia mediante un desplazamiento corto a la misma seccion de tarjetas de precios dentro de la landing, generando redundancia y confusion.
2. **Ausencia de Pagina Dedicada de Planes:** Las plataformas SaaS educativas formales requieren una vista dedicada (`/pricing`) con desglose comparativo curricular oficial MINEDUC, preguntas frecuentes y respaldo normativo antes de derivar al pago.
3. **Desconexion Narrativa en "Nuestro Metodo":** La seccion "Nuestro Metodo" utilizaba textos genericos de relleno en lugar de los 4 pilares fundamentales definidos en el Plan Maestro y la Constitucion (`AGENTS.md`).
4. **Transicion Abrupta en el Hero Scrubber:** El boton del scrubber saltaba de golpe al ancla `#exito`, cortando la secuencia de 151 cuadros y quedando parcialmente solapado bajo la barra de navegacion fija (92px).
5. **Inconsistencia Visual en Encabezado de Checkout:** La cabecera de la pasarela de pago habia cambiado de color institucional y mantenia un boton redundante ("Volver a Planes").

---

## 2. Acciones Ejecutadas

### 2.1. Tipos y Enrutamiento Global (`src/types/index.ts` y `src/App.tsx`)
- Se agrego `'pricing'` a la union `ViewMode`.
- Se configuro el enrutamiento reactivo en `App.tsx` para renderizar `PricingPage` cuando `viewMode === 'pricing'`.

### 2.2. Nueva Pagina Dedicada de Precios (`src/components/pricing/PricingPage.tsx`)
- **Cabecera y Pie Institucionales:** Mantiene la barra oficial con `var(--hf-bg)` (`#F8AD22`) y el logotipo oficial `Logo_cabecera.png`.
- **Estructura de 3 Planes en Moneda Local (CLP):**
  - **Plan Mensual:** $29.990 CLP / mes (flexibilidad sin permanencia).
  - **Plan Anual Examenes Libres:** $199.900 CLP / ano (pago unico anual, ahorro superior al 44%, cuadernillos fisicos y ensayos MINEDUC).
  - **Prueba 7 Dias:** $0 CLP (acceso a modulo diagnostico y primera leccion guiada).
- **Tabla Comparativa de Cobertura Curricular:** Detalle de Matematicas, Lenguaje, Ciencias Naturales, Historia e Ingles de 3° a 8° basico segun Bases Curriculares.
- **Sello Legal y Normativo:** Referencia al Decreto Exento N° 2272 y Decreto 67 de Evaluacion Escolar.
- **Acordeon Interactivo de FAQ:** Respuestas a preguntas clave de familias homeschoolers.
- **Conexion Directa al Checkout:** Los botones guardan la seleccion en `localStorage` y enrutan a `viewMode = 'checkout'`.

### 2.3. Landing Page Refactorizada (`src/components/landing/LandingPage.tsx`)
- **Enlace de Navegacion:** "Planes y Precios" en la barra superior deriva de forma limpia a `goToPricing()`.
- **Reescritura de "Nuestro Metodo" con los 4 Pilares del Plan Maestro:**
  1. *Pantalla y Papel (Fase 1):* Enlace digital-analogo mediante el uso activo del cuaderno fisico para consolidar neuroaprendizaje.
  2. *Mediacion Dual:* Guia y dialogos socraticos disenados para que padres trabajadores acompanen sin requerir formacion pedagogica previa.
  3. *Enfoque Neurodivergente:* Entornos de baja carga cognitiva para ninos con TDAH, TEA o descompresion de estres escolar tradicional.
  4. *Rigor Evaluativo MINEDUC (Fase 2):* Ensayos tipo examen libre con el estandar del Sistema de Admision y evaluacion docente para certificar el ano escolar.
- **Eliminacion de Tarjetas Redundantes:** Se retiro la seccion `#planes` dentro de la landing page, eliminando el bucle circular.
- **CTA Final Optimizado:** El boton inferior ahora invita a "Ver Planes y Precios Oficiales" y enruta a la nueva `PricingPage`.

### 2.4. Transicion Cinematica Suave en Hero Scrubber (`src/components/landing/HeroScrollScrubber.tsx`)
- Se elimino el salto brusco `<a href="#exito">`.
- Se implemento la funcion cinematica `handleScrollToMethod()` basada en `requestAnimationFrame` con curva `easeInOutCubic` durante 1200ms.
- Se calculo una compensacion de 92px respecto al encabezado institucional fijo para evitar que el titulo del metodo quede oculto.

### 2.5. Encabezado Oficial en Checkout (`src/components/checkout/CheckoutFlow.tsx`)
- Se unifico el fondo con `var(--hf-bg)` y el color de texto institucional.
- Se coloco el logotipo oficial a escala generosa (`Logo_cabecera.png`).
- Se elimino el boton redundante "Volver a Planes".
- Se anadio la insignia oficial de seguridad SSL de 256 bits integrada en la paleta institucional.

---

## 3. Validacion y Criterios de Calidad

- **Compilacion TypeScript:** Ejecucion exitosa de `npx tsc --noEmit` con 0 advertencias y 0 errores.
- **Invariantes de Formato:** Cero emojis y cero guiones largos en todo el codigo fuente modificado.
- **Servidor Activo:** Vite dev server operativo en el puerto 5173.
