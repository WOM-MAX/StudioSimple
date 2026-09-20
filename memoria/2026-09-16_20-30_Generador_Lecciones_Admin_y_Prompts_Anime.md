# Sesión: Implementación del Generador de Lecciones por OA y Prompts Anime Moderno

**Fecha:** 16 de Septiembre de 2026  
**Contexto:** EstudioSimple : Prototipo y Administración  
**Objetivo:** Desarrollar la sección administrativa "Generador de lecciones por OA" con dosificación automática (5/6 clases), exportación a Word (.docx), generación de datos listos para la App y prompts para ChatGPT Work con el dúo co-protagónico de 13 años en estilo anime moderno.

---

## 1. Alcance y Decisiones Implementadas

1. **Aislamiento Arquitectónico:**
   - La sección se construyó en la ruta `prototipo/app/admin/generador/page.tsx`.
   - La pantalla de la clase (`app/page.tsx`) y los tests del prototipo no sufrieron alteraciones que comprometan el flujo congelado. Se añadió un enlace directo de acceso administrativo en la barra superior.

2. **Catálogo Curricular (`public/data/curriculum_catalog.json`):**
   - Se extrajeron 106 OAs de 7° Básico desde `planes_consolidados_master_enriquecido.xlsx` cubriendo Matemática, Ciencias Naturales, Historia, Lengua y Literatura e Inglés.
   - **Alineación con el Temario Oficial de Exámenes Libres (MINEDUC):** Tras cotejar con `temario 7° basico.pdf`, se verificó que el temario oficial prioriza un subconjunto selecto y no una correlatividad simple (1 y 2). Se etiquetaron con `isPriorityDemo: true` y `temarioPosicion` los 10 primeros OAs en orden estricto de dicho temario:
     - Matemática: OA 01 (Pos #1) y OA 03 (Pos #2) (el OA 02 no está en el temario EELL).
     - Ciencias Naturales: OA 01 (Pos #1) y OA 02 (Pos #2).
     - Historia, Geografía y C. Sociales: OA 02 (Pos #1) y OA 03 (Pos #2) (el OA 01 no entra).
     - Lengua y Literatura: OA 03 (Pos #1) y OA 04 (Pos #2) (los OA 01 y 02 no entran).
     - Idioma Extranjero (Inglés): OA 09 (Pos #1) y OA 10 (Pos #2) (los OA del 1 al 8 no entran).

3. **Motor Pedagógico y Prompts Anime (`lib/lesson-generator.ts`):**
   - **Paso 2 (Gancho H.O.O.K.):** Prompt estructurado para 7 diapositivas full-bleed 16:9 con espacio negativo, destacando al dúo co-protagónico de 13 años (chica y chico) actuando juntos en estilo anime moderno. Guion de locución continuo de 15 a 22 palabras por lámina para Google Vids.
   - **Paso 4 (Video Explicativo Corto):** Prompt conciso de 5 diapositivas centrado en la regla y el ejemplo modelado. Locución de 22 a 30 palabras por lámina.
   - **Datos para la App:** Generación de los Pasos 1, 3, 5, 6, 7 y 8 (`preQuestions`, `practice`, `mini`, `cierre`) en el schema exacto de `page.tsx`.

4. **Exportación a Word (`lib/docx-export.ts`):**
   - Integración de la librería `docx` para compilar y descargar directamente en el navegador el Plan Maestro oficial en formato Word.

---

## 2. Comprobación y Verificación

- `node scripts/test_oa_generator.mjs`: Validación de los 10 OAs modelo prioritarios para fondos.
- `node scripts/test_docx_build.mjs`: Comprobación exitosa de la creación del archivo DOCX.
- `npx tsc --noEmit`: Compilación limpia sin errores en los archivos nuevos.
