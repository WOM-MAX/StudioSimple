# Registro de Memoria: FAQ Ampliado (max-w-5xl) y Capsulas Horizontales Delgadas en Landing

Fecha: 2026-09-17 19:25 CLST
Modulo: LandingPage.tsx (Seccion 6: Preguntas Frecuentes)

## 1. Contexto y Diagnostico
El usuario observo que las preguntas del FAQ en la Landing Page no tenian el mismo largo que en la pagina de Planes y Precios, viendose mas gruesas y pesadas en la Landing:
1. El contenedor en LandingPage estaba acotado a `max-w-4xl` con un padding horizontal de `md:px-12` (800px utiles).
2. Cada tarjeta contenia un icono cuadrado con fondo de color a la izquierda (`w-8 h-8 rounded-lg`), restando 46px adicionales al ancho del texto.
3. Debido al ancho reducido, todas las preguntas extensas (70 a 81 caracteres) se partian forzadamente en 2 lineas, duplicando la altura vertical de cada capsula cerrada.
4. En Planes y Precios, el FAQ no tiene icono a la izquierda y las preguntas caben comodamente en una sola linea horizontal, viendose mucho mas delgado y elegante.
5. El usuario concluyo: "Si es mas largo el faq de la landing las preguntas van a caber sin problemas".

## 2. Acciones Implementadas
- **Ampliacion de Ancho del Contenedor FAQ**: Se actualizo la seccion FAQ de `px-4 md:px-12 max-w-4xl mx-auto` a `px-4 sm:px-6 md:px-8 max-w-5xl mx-auto`. Esto proporciona mas de 920px de espacio horizontal interior utilizable.
- **Eliminacion de Cajas de Icono a la Izquierda**: Se removieron los bloques decorativos cuadrados a la izquierda de cada pregunta, alineando el texto de la pregunta directamente al margen izquierdo con `p-5 md:p-6`.
- **Alineacion en Una Sola Linea**: Las 6 preguntas frecuentes ahora se renderizan completamente en una sola linea horizontal en pantallas de escritorio y tablets, manteniendo la capsula cerrada con una silueta delgada, esbelta y limpia.
- **Micro-interaccion**: Se incorporo `hover:bg-white/5` en el elemento `<summary>` para una retroalimentacion visual suave al pasar el cursor, conservando el chevron `#57d6f3` con rotacion de 180 grados al desplegar.

## 3. Verificacion Tecnica
- Compilacion TypeScript validada mediante `npx tsc --noEmit` con codigo de salida 0 (cero errores).
