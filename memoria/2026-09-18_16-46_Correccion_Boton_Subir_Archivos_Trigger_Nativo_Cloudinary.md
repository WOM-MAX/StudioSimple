# Bitácora de Implementación: Corrección del Botón Subir Archivo y Trigger Nativo de Cloudinary

- **Fecha:** 2026-09-18 16:46
- **Rama/Contexto:** Web Studio Simple - Uploader Cloudinary
- **Estado:** Corregido y Verificado con tsc exitoso

---

## 1. Problema Detectado
Al hacer clic en el botón de subida de archivos, el navegador no abría la ventana de selección de archivos del sistema operativo (mientras que la función de arrastrar y soltar sí operaba).

### Causa Raíz
1. El botón en la pestaña superior "Subir Archivo" únicamente conmutaba el modo de vista (`setMode('upload')`), sin disparar el explorador de archivos.
2. El elemento `<input type="file" />` utilizaba la clase CSS `hidden` (`display: none`), lo cual en ciertos navegadores restringe o invalida el evento `.click()` programático desde elementos JavaScript.
3. Faltaba una vinculación nativa mediante etiqueta `<label htmlFor={id}>` que garantice la apertura directa del selector de archivos del sistema operativo a nivel del navegador sin depender de intermediación JS.

---

## 2. Solución Implementada
En `src/components/common/CloudinaryImageUploader.tsx`:
1. Se implementó un identificador único por instancia utilizando `useId()`.
2. Se reemplazó la clase `hidden` por `sr-only`, manteniendo el input interactivo y accesible en el árbol DOM.
3. Se añadió reseteo del valor en el evento `onClick`: `(e.target as HTMLInputElement).value = ''`, permitiendo seleccionar y resubir el mismo archivo en caso de desear reintentarlo.
4. Se convirtió el área del dropzone en una etiqueta nativa `<label htmlFor={inputId}>` y se incorporó un botón visible y clickeable ("Seleccionar archivo del equipo") que delega la apertura del explorador de archivos al comportamiento nativo del navegador.
5. Se dotó al botón de pestaña "Subir Archivo" de disparo directo: si el usuario ya se encuentra en modo upload y hace clic en él, ejecuta `fileInputRef.current?.click()`.

---

## 3. Verificación
- `npx tsc --noEmit`: Finalizado con código 0, sin errores de tipado.
- El explorador de archivos del sistema operativo se abre de manera nativa e instantánea al hacer clic en:
  - El botón "Seleccionar archivo del equipo".
  - Cualquier parte del recuadro de carga.
  - El botón de pestaña "Subir Archivo".
- La funcionalidad de arrastrar y soltar se mantiene completamente intacta.
