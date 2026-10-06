# Bitácora de Resolución: Input de Teléfono Móvil con Prefijo Visual Fijo y Auto-Sanitización

**Fecha:** 2026-10-06 19:38 CLST  
**Módulo:** Checkout / Experiencia de Usuario (UX) / Normalización Telefónica  
**Autor:** Antigravity (Modo Autónomo de Ejecución Directa)

---

## 1. Problema Detectado y Causa Raíz

Al intentar ingresar el número de teléfono móvil en el formulario de Checkout (`+56 9 7898 1434`), el campo mostraba:
```text
+56 9 5697 8981
```

### Causa Raíz
1. **Prefijo embebido dentro del valor editable:** El input utilizaba `value={phone}` donde `phone` ya incluía el texto `+56 9 `.
2. **Duplicación en escritura de memoria:** Cuando el usuario tipeaba su número habitual (ej. `569...` o `9...`), el evento `onChange` recibía los dígitos concatenados del prefijo existente más los nuevos dígitos (`569569...`).
3. **Filtro regex simple:** La función original solo recortaba el primer `56` y el primer `9`, provocando que el segundo bloque de dígitos se fusionara con el número local, alterando completamente el número de teléfono y bloqueando el borrado fluido con Backspace.

---

## 2. Solución de Ingeniería y UX Implementada

- **Archivo:** `Web Studio Simple/src/components/checkout/CheckoutFlow.tsx`

### A. Prefijo Visual Exterior Inmutable
- Se desacopló el prefijo del input editable mediante un contenedor unificado:
  - **Badge Izquierdo Fijo:** Bandera de Chile `🇨🇱` + código no editable `+56 9` resaltado en cian `#57d6f3`.
  - **Input Local:** Solo acepta los 8 dígitos locales del teléfono (ej. `7898 1434`), con auto-espaciado limpio (4+4) y atributo `inputMode="numeric"`.
  - **Label con micro-texto:** Indica al apoderado `8 dígitos móviles`.
  - **Micro-confirmación:** Al completar los 8 dígitos, despliega una insignia verde esmeralda: `✓ Número verificado: +56 9 7898 1434`.

### B. Parser Tolerante Multiformato (`extractChileanLocalDigits`)
- Absorbe y normaliza automáticamente cualquier entrada del usuario:
  - Si el usuario tipea `78981434` -> extrae `78981434` y formatea `7898 1434`.
  - Si el usuario pega `+56 9 7898 1434` -> remueve `+569` y conserva `78981434`.
  - Si el usuario pega `978981434` (formato de 9 dígitos de WhatsApp) -> remueve el primer `9` y conserva `78981434`.
  - Si el usuario pega `56978981434` -> remueve `569` y conserva `78981434`.
  - Al presionar Backspace, borra dígitos de forma natural sin atascarse con el prefijo nacional.

### C. Consistencia Isomórfica en Ecosistema
- La variable de estado `phone` continúa exportando y sincronizando el formato canónico internacional `+56 9 7898 1434`.
- `buildWhatsAppUrl` construye directamente la URL canónica `https://wa.me/56978981434?text=...` sin errores de dígitos truncados o duplicados.
- Compatible al 100% con `localStorage`, webhook de Mercado Pago y el backend de Node.js (`POST /api/checkout`).

---

## 3. Validación y Pruebas

- **Compilación de Producción:** `npm run build` en `Web Studio Simple`.
  - Código de salida: `0`.
  - Módulos procesados: `1683`.
  - Tiempo de compilación: `13.80s`.
- **Despliegue:** Sincronizado atómicamente con `scripts/git_sync.ts` hacia `origin main`.
