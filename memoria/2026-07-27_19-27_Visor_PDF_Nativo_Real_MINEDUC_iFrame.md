# Memoria de Sesión: Integración del Lector PDF Nativo Real del MINEDUC con Iframe

- Fecha y Hora: 2026-07-27 19:27
- Tema: Sustitución del componente simulado por la integración del lector PDF nativo real del Ministerio de Educación de Chile (`curriculumnacional.cl`) mediante `<iframe>` embebido directamente en `PdfViewerModal.tsx`.

## Resoluciones Aplicadas

1. **Visor de Documento PDF Real (`PdfViewerModal.tsx`)**:
   - Se conectó la URL directa del documento PDF oficial del MINEDUC de cada asignatura de 7° Básico (Historia, Matemáticas, Lenguaje, Ciencias e Inglés).
   - El navegador abre el lector nativo de PDF (Chromium PDF Viewer) dentro del iframe de la plataforma.
   - Permite al usuario ver las miniaturas de las páginas, desplazar el PDF real de más de 300 páginas, aplicar zoom nativo, imprimir y saltar directamente a la página del capítulo.
   - Se añadió el botón **"Abrir PDF en Pestaña Nueva"** para visualizar el documento completo en el navegador.

2. **Verificación Estática**:
   - Compilación ejecutada con `npx tsc --noEmit` (**0 errores**).
