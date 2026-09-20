# Bitácora de Sesión: Optimización de Scrubber (Luminosidad), Altura y Flujo de Planes CLP

**Fecha:** 2026-09-17 14:45  
**Autor:** Antigravity AI Engine  
**Workspace:** `Web Studio Simple`

---

## 1. Contexto y Objetivos
1. Resolver el problema de oscurecimiento excesivo (opacidad de fondo) en el scrubber interactivo del Hero que apagaba los rostros y la calidez de las fotografías familiares.
2. Disminuir la altura de desplazamiento del scrubber de 320vh a 240vh para evitar fatiga de scroll, asegurando que se reproduzcan los 151 fotogramas sin pérdida de narrativa.
3. Retirar los dos botones prototipo en la Fase 3 del scrubber ("Ingresar al Panel del Apoderado" y "Probar Aula Sincronizada"), sustituyéndolos por una invitación fluida al método de estudio.
4. Conectar la llamada a la acción inferior directamente a la sección de Planes y Precios (`#planes`), evitando el salto ciego al formulario de compra.
5. Sincronizar el flujo de checkout con montos reales en pesos chilenos (CLP) y niveles escolares oficiales de 3° a 8° Básico.

---

## 2. Acciones Ejecutadas

### 2.1. HeroScrollScrubber.tsx
- **Corrección de Opacidad:** Se reemplazó el velo invasivo `from-[#0A192F]/90 via-[#0A192F]/40 to-[#0A192F]/70` por un viñetado perimetral suave `from-[#0A192F]/60 via-transparent to-black/25`. Las caras y el centro de la escena quedan 100% despejados con luz natural.
- **Legibilidad Focal:** Se aplicó sombra profunda de alto contraste (`drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]` y `drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]`) a títulos y párrafos, garantizando legibilidad perfecta sin oscurecer las imágenes.
- **Altura Optimizada:** Se ajustó la altura del contenedor a `240vh`, manteniendo la proporción 1:1 de los 151 fotogramas WebP.
- **Retiro de Botones Prototipo:** Se reemplazaron los botones de acceso directo de la Fase 3 por un enlace con animación suave hacia la sección de método (`#exito`).

### 2.2. LandingPage.tsx
- **Redirección de la Llamada a la Acción Inferior:** El botón de cierre "Comenzar Registro Oficial" ahora ejecuta `scrollToPlanes()` hacia la sección `#planes`, permitiendo al apoderado elegir informadamente su plan.
- **Sincronización de Selección de Plan:** Se añadió la función `handleSelectPlan(plan)` que registra la opción seleccionada (`monthly`, `full`, `trial`) en `localStorage` antes de ingresar al checkout.

### 2.3. CheckoutFlow.tsx
- **Moneda Chilena Oficial:** Sustitución de valores en dólares (USD) por Pesos Chilenos (CLP):
  - Plan Mensual: $29.990 CLP / mes.
  - Anual Exámenes Libres: $199.900 CLP / año (Ahorro del 44%).
  - Prueba 7 Días: $0 CLP.
- **Cursos MINEDUC:** Opciones de curso actualizadas estrictamente de 3° a 8° Básico.
- **Resumen en Tiempo Real:** El sidebar refleja el nombre oficial del plan y el total exacto en CLP.

---

## 3. Validación Técnica
- Verificación de tipos TypeScript (`npx tsc --noEmit`): **0 errores**.
