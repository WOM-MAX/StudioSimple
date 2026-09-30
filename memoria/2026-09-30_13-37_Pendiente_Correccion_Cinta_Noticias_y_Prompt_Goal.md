# Bitacora de Continuidad: Diagnostico y Prompt Goal para Correccion de Cinta de Noticias

- **Fecha:** 2026-09-30 13:37 (America/Santiago)
- **Estado:** Pendiente de ejecucion al inicio de la proxima sesion.
- **Contexto:** El usuario reporto que la Cinta de Noticias (Ticker) se vuelve a encender automaticamente tras apagarla. Se solicito resguardo del analisis y del prompt canonico para su ejecucion directa con `/goal`.

---

## 1. Diagnostico Tecnico y Causa Raiz

1. **Falta de Auto-Save en el Switch de Configuracion General:**
   En `Web Studio Simple/src/components/admin/cms/ConfiguracionGeneralView.tsx` (lineas 498-506), el switch "Mostrar Cinta en la Landing" solo actualiza el estado React local en memoria (`updateCinta('activo', e.target.checked)`). No guarda en `localStorage` hasta que el usuario se desplaza al final del formulario de 1484 lineas y pulsa el boton "Guardar Configuracion General". Al cambiar de pestana o recargar, se pierde el cambio.

2. **Doble Fuente de Verdad Desincronizada:**
   La Cinta de Noticias depende simultaneamente de:
   - `estudiosimple_site_config` -> `cintaNoticias.activo`
   - `estudiosimple_cms_pages_v1` -> Bloque con `tipoBloque === 'CINTA_NOTICIAS'` en la pagina `/`.
   En `LandingPage.tsx` (lineas 264-270):
   ```typescript
   const showCinta = useMemo(() => {
     if (siteConfig.cintaNoticias?.activo === false) return false;
     if (activeCintaSection) {
       return activeCintaSection.activo;
     }
     return false;
   }, [siteConfig.cintaNoticias, activeCintaSection]);
   ```
   Si se apaga en una fuente pero se edita o guarda en otra parte, la funcion de guardado sobreescribe la otra con el valor previo (`true`).

3. **Estado Obsoleto en Memoria en AdminDashboard:**
   `AdminDashboard.tsx` no escucha el evento `'storage'`. Mantiene en memoria una copia de `cmsPages` cargada al inicio. Al navegar a "Paginas Web" y guardar cualquier elemento, reescribe `localStorage` con su version vieja donde la cinta sigue activa.

4. **Reversion por Spread en `loadSiteConfig()`:**
   En `initialCmsExtrasData.ts` (lineas 303-306), el spread de `INITIAL_SITE_CONFIG.cintaNoticias` tiene `activo: true` por defecto. Si `parsed.cintaNoticias.activo` es `undefined`, revierte a `true`.

5. **Modal `BlockFormModal.tsx` Fuerza Estado Activo:**
   Al guardar el bloque desde el editor de secciones, `savedSection.activo` evalua `section ? section.activo : true`, forzando `activo: true` en `siteConfig`.

---

## 2. Plan de Accion a Ejecutar

1. Agregar persistencia reactiva e inmediata (auto-save) al conmutar el switch en `ConfiguracionGeneralView.tsx` junto con un indicador visual de guardado.
2. Unificar la sincronizacion bidireccional de modo que al conmutar la cinta se actualice de forma atomica tanto `siteConfig.cintaNoticias.activo` como el bloque `CINTA_NOTICIAS` en `cmsPages`.
3. Agregar listener del evento `'storage'` en `AdminDashboard.tsx` para sincronizar `cmsPages`.
4. Blindar `loadSiteConfig()` en `initialCmsExtrasData.ts` para respetar `activo: false`.
5. Preservar el estado de visibilidad en `BlockFormModal.tsx` y `PageEditor.tsx`.
6. Validar compilacion limpia con `npm run build`.

---

## 3. Prompt Canonico para Ejecutar con /goal al Inicio de la Proxima Sesion

```text
/goal Ejecutar de inicio a fin la solucion definitiva al problema de persistencia y reencendido de la Cinta de Noticias en StudioSimple con 100% de autonomia y sin interrupciones intermedias.

DIRECTIVAS DE AUTONOMIA:
1. Prohibido solicitar aprobacion, hacer preguntas o pausar para pedir interaccion al usuario antes de concluir.
2. Prohibido ejecutar busquedas recursivas en la raiz del disco o scripts improvisados de Python: usa rutas exactas y TypeScript (npx tsx).
3. Delimitacion de mision: el entregable es exclusivamente el codigo fuente de la aplicacion web; nunca generar archivos PPTX finales (mision de Work).
4. Circuito de proteccion: maximo 4 intentos de autocorreccion ante fallos de compilacion antes de cambiar de enfoque o revertir cambios infructuosos.
5. Control de bloqueos: considerar posibles procesos de Node o Windows bloqueando archivos (EBUSY) antes de operaciones destructivas.
6. Punto de control: verificar estado de Git antes de mutaciones extensas para preservar reversibilidad.
7. Doble validacion: validar compilacion con codigo 0 (npm run build) y comprobar consistencia de tipos y funciones de persistencia.
8. Persistencia: registrar hitos en memoria/ si se realizan modificaciones estructurales mayores.
9. Resuelve cualquier detalle tecnico aplicando los estandares de AGENTS.md y documenta la decision en el reporte final.

TAREA A EJECUTAR:
1. En 'Web Studio Simple/src/components/admin/cms/ConfiguracionGeneralView.tsx':
   - Implementar persistencia reactiva e inmediata (auto-save) al conmutar el switch 'Mostrar Cinta en la Landing' (cintaNoticias.activo).
   - Asegurar que al cambiar este valor se persista de forma atomica en 'estudiosimple_site_config' y en el bloque 'CINTA_NOTICIAS' de la pagina de inicio ('/') en 'estudiosimple_cms_pages_v1'.
   - Despachar el evento 'storage' para sincronizacion en tiempo real con la Landing Page.
   - Anadir un indicador visual de guardado inmediato junto al switch para certificar que el cambio fue guardado sin necesidad de scrollear al pie del formulario general.

2. En 'Web Studio Simple/src/components/admin/AdminDashboard.tsx':
   - Agregar un listener del evento 'storage' que actualice el estado local 'cmsPages' ejecutando 'loadCmsPages()', impidiendo que estados antiguos en memoria sobreescriban los cambios de visibilidad al navegar entre modulos.

3. En 'Web Studio Simple/src/data/initialCmsExtrasData.ts':
   - Blindar la funcion 'loadSiteConfig()' para que el booleano 'activo: false' en 'parsed.cintaNoticias' sea respetado estrictamente y no se revierta a 'true' por fallback de spread.

4. En 'Web Studio Simple/src/components/admin/cms/BlockFormModal.tsx' y 'PageEditor.tsx':
   - Garantizar que al guardar o editar bloques de tipo 'CINTA_NOTICIAS', se preserve el estado booleano de visibilidad ('activo') existente en lugar de forzarlo a 'true'.

5. Validacion final:
   - Ejecutar compilacion completa: 'npm run build' en 'c:\Proyectos\StudioSimple\Web Studio Simple' y certificar codigo de salida 0.

ARCHIVOS Y COMPONENTES AFECTADOS:
- Web Studio Simple/src/components/admin/cms/ConfiguracionGeneralView.tsx
- Web Studio Simple/src/components/admin/AdminDashboard.tsx
- Web Studio Simple/src/data/initialCmsExtrasData.ts
- Web Studio Simple/src/components/admin/cms/BlockFormModal.tsx
- Web Studio Simple/src/components/admin/cms/PageEditor.tsx
- Web Studio Simple/src/components/landing/LandingPage.tsx

CRITERIOS DE ACEPTACION Y DEFINITION OF DONE (DoD):
1. Codigo modular, tipado estricto (unknown > any), sin errores de compilacion ni regresiones.
2. Persistencia determinista: al apagar la cinta desde Configuracion General o desde el Editor de Paginas, permanece apagada tras recargar la aplicacion o navegar entre modulos.
3. Validacion local exitosa ejecutando: npm run build en 'Web Studio Simple' (codigo de salida 0).
4. Entregar el informe de resultados en un unico mensaje final al terminar todo el flujo.
```
