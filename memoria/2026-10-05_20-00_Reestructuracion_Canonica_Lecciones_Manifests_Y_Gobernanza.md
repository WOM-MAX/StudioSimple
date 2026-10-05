# Bitacora de Sesion: Reestructuracion Canonica de Lecciones, Manifests y Gobernanza

**Fecha:** 2026-10-05 20:00 UTC-03:00  
**Contexto:** Preparacion y consolidacion de la estructura de archivos y gobernanza previa a la construccion de la Skill Universal de Lecciones (3° a 8° Basico).

---

## 1. Acciones Realizadas

1. **Aislamiento de Informacion Bancaria:**
   - Se traslado completamente la carpeta `CUENTA VISTA MERCADO LIBRE WALTER/` fuera del repositorio y fuera del workspace de EstudioSimple hacia el directorio de usuario: `C:\Users\walte\CUENTA VISTA MERCADO LIBRE WALTER`.
   - Se ratifico que no quede en `_archivo/` ni en ningun archivo comprimido (ZIP) o paquete de entrega.

2. **Reorganizacion de `LECCIONES/` por Curso, Asignatura y OA:**
   - Se creo la jerarquia canonica `LECCIONES/7_Basico/<Asignatura>/<OA>/`.
   - Subcarpetas creadas y pobladas:
     - `Ciencias_Naturales/OA01/`: `Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx`, `Ciencias_OA01.docx`, `Prompts_Work_Ciencias_7B_OA01.txt`, `manifest.json`.
     - `Historia_Geografia/OA02/`: `Plan_Maestro_7Básico_110-7-HIS-OA02_5Lecciones.docx`, `Historia_OA02.docx`, `Prompts_Work_Historia_7B_OA02.txt`, `manifest.json`.
     - `Ingles/OA09/`: `Plan_Maestro_7Básico_110-7-ING-OA09_6Lecciones.docx`, `Ingles_OA09.docx`, `Prompts_Work_Ingles_7B_OA09.txt`, `manifest.json`.
     - `Lengua_Literatura/OA03/`: `Plan_Maestro_7Básico_110-7-LEN-OA03_6Lecciones.docx`, `Lenguaje_OA03.docx`, `Prompts_Work_Lenguaje_7B_OA03.txt`, `manifest.json`.
     - `Matematica/OA01/`: `Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones.docx`, `referencias/OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx`, `manifest.json`.
     - `README_WORK_INSTRUCCIONES.md`: Ubicado como guia operacional general en `LECCIONES/7_Basico/README_WORK_INSTRUCCIONES.md`.

3. **Clarificacion de Matematica OA01:**
   - Documento oficial de produccion: `Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones.docx` (6 clases completas con estructura de 8 etapas duales).
   - Documento prototipo referencial: `referencias/OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx` (5 clases exploratorias preliminares, aislado en subdirectorio `referencias/` para evitar colisiones).

4. **Metodologia de 8 Etapas en `MANUAL MAESTRO`:**
   - El archivo `Analisis_Estandarizacion_8_Etapas_EstudioSimple.docx` fue reubicado formalmente en `MANUAL MAESTRO/Analisis_Estandarizacion_8_Etapas_EstudioSimple.docx`, asegurando su preservacion como canon metodologico activo del producto y no dentro de una carpeta de lecciones particulares.

5. **Exclusiones de Git y Seguridad:**
   - Se ratifico `.gitignore`: `INSUMOS/`, `CONOCIMIENTO/`, `_archivo/`, `.env*` excluidos de Git y empaquetados.
   - Se incorporo en `AGENTS.md` la orden perentoria de aislamiento de `_archivo/`, prohibiendo lecturas o busquedas por parte de las Skills y agentes.

6. **Definicion de `PLANES MAESTROS PRESENTACIONES`:**
   - Se formalizo que esta carpeta constituye el paquete de referencia visual y diseno de diapositivas en PowerPoint para ChatGPT Work.
   - El contenido de las lecciones, dialogos, ejercicios interactivos y reactivos debe emanar obligatoriamente de la leccion completa oficial vigente en `LECCIONES/`.

7. **Ajuste de Gobernanza y Limpieza en `AGENTS.md` y Skills:**
   - Se depuro el encabezado duplicado en `AGENTS.md`.
   - Se explicito que las reglas de Antigravity no incluyen conteo de palabras ni duracion de videos (responsabilidad de Codex/Work).
   - Se ajustaron `instructional_design_expert/SKILL.md`, `auditor_coherencia_estudiosimple/SKILL.md` y `rules_catalog.json` para reflejar esta delimitacion.
   - Se estructuro la jerarquia de reglas por alcance: Universal, Curso, Asignatura y OA.

8. **Validacion:**
   - Frontend `Web Studio Simple`: `npm run build` exitoso con codigo 0 (13.75s).
