# Bitacora de Sincronizacion: Planes Maestros DOCX y Prompts TXT para ChatGPT Work (4 Asignaturas 7° Basico)

- Fecha: 2026-10-02 18:45
- Asignaturas procesadas: Lengua y Literatura (OA 03), Ciencias Naturales (OA 01), Historia y Geografia (OA 02), Ingles (OA 09).
- Asignatura excluida: Matematica (OA 01) permanece intacta segun instruccion explicita.
- Objetivo: Sincronizar las carpetas de descarga y generar archivos planos TXT limpios con prompts estructurados para la confeccion de presentaciones PPTX en ChatGPT Work.

## 1. Contexto y Problematica Detectada
La carpeta `DESCARGA_LECCIONES` mantenia versiones desactualizadas de borradores anteriores (24 de septiembre, 37 KB a 42 KB), carentes de las tablas didacticas de 4 columnas completas y con solo 6 diapositivas por clase en lugar del estandar de 14 diapositivas por clase establecido en la arquitectura del Plan Maestro.
Asimismo, pasar un archivo DOCX complejo con tablas anidadas a ChatGPT Work anade friccion en el parseo y extraccion de prompts.

## 2. Acciones Ejecutadas

### 2.1 Sincronizacion de Documentos DOCX Oficiales
Se tomaron las versiones definitivas desde `PLANES MAESTROS PRESENTACIONES/Paquete_Maestro_EstudioSimple_7B/04_PLANES_OA_Y_PROMPTS/` y se sincronizaron con nombres dobles (nombre canonico formal y nombre directo simplificado) en dos ubicaciones de distribucion:
- `DESCARGA_LECCIONES/`
- `Web Studio Simple/public/descargas_planes_maestros/`

Archivos sincronizados:
1. Lengua y Literatura 7° Basico OA 03 (6 Lecciones):
   - `Plan_Maestro_7Basico_110-7-LEN-OA03_6Lecciones.docx` (67.910 bytes)
   - `Lenguaje_OA03.docx` (67.910 bytes)
2. Ciencias Naturales 7° Basico OA 01 (6 Lecciones):
   - `Plan_Maestro_7Basico_110-7-CIE-OA01_6Lecciones.docx` (66.989 bytes)
   - `Ciencias_OA01.docx` (66.989 bytes)
3. Historia, Geografia y Ciencias Sociales 7° Basico OA 02 (5 Lecciones):
   - `Plan_Maestro_7Basico_110-7-HIS-OA02_5Lecciones.docx` (59.282 bytes)
   - `Historia_OA02.docx` (59.282 bytes)
4. Idioma Extranjero Ingles 7° Basico OA 09 (6 Lecciones):
   - `Plan_Maestro_7Basico_110-7-ING-OA09_6Lecciones.docx` (66.932 bytes)
   - `Ingles_OA09.docx` (66.932 bytes)

### 2.2 Extraccion y Generacion de Prompts TXT Limpios para Work
Se desarrollo y ejecuto el script `scripts/sync_work_packages.ts` (TypeScript mediante `npx tsx`), procesando los 4 planes maestros y extrayendo de forma determinista la totalidad de diapositivas y prompts:
- Ubicacion: `DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/` y `Web Studio Simple/public/descargas_planes_maestros/`
- Total archivos generados:
  1. `Prompts_Work_Lenguaje_7B_OA03.txt` (6 lecciones, 84 diapositivas, 200.295 bytes)
  2. `Prompts_Work_Ciencias_7B_OA01.txt` (6 lecciones, 84 diapositivas, 200.626 bytes)
  3. `Prompts_Work_Historia_7B_OA02.txt` (5 lecciones, 70 diapositivas, 172.289 bytes)
  4. `Prompts_Work_Ingles_7B_OA09.txt` (6 lecciones, 84 diapositivas, 192.452 bytes)
- Total consolidado: 23 lecciones, 322 diapositivas con prompts anime 16:9, titulos 64 pt, subtitulos 36 pt, notas didacticas y locucion paso a paso.

### 2.3 Generacion de Guias de Instrucciones
Se incorporo el archivo `README_WORK_INSTRUCCIONES.md` en ambos directorios detallando el flujo de trabajo para ChatGPT Work (sin emojis, sin guiones largos).

## 3. Verificaciones de Integridad
- Todos los archivos generados y copiados poseen tamano mayor a cero bytes (> 0 bytes).
- Ausencia de errores de lectura/escritura en el sistema de archivos de Windows.
- Matematica OA 01 no fue modificada ni intervenida.
