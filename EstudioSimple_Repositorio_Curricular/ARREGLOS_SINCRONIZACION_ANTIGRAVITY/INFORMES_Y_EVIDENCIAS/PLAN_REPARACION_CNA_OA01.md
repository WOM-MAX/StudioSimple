# PLAN DE REPARACIÓN, AUDITORÍA Y CIERRE CURRICULAR · CIENCIAS NATURALES 7° BÁSICO (110-7 · OA01)

**Fecha:** 28 de octubre de 2026 — 09:18 [America/Santiago]  
**Sistema:** EstudioSimple — 7° Básico (110-7)  
**Asignatura:** Ciencias Naturales (CNA) — Objetivo de Aprendizaje: **OA01**  
**Gobernanza:** Modo Ejecución Directa (`AGENTS.md` / `.agents/rules/analisis_autonomo_goal.md`)  
**Estado del Editor:** **BASE ESTABLE / CERRADA** (Protegido e intacto; sin modificaciones).

---

## 1. RESUMEN EJECUTIVO Y ANTECEDENTES

Tras el cierre definitivo y saneamiento documental del **Editor Universal Plan B** (`CIERRE_DEFINITIVO_EDITOR_UNIVERSAL_PLAN_B_110-7_SANEADO_2026-10-28_08-15_CL.zip`), se procedió a la auditoría, saneamiento pedagógico y cierre integral del paquete curricular para el primer Objetivo de Aprendizaje de Ciencias Naturales en 7° Básico:

`110-7 · CNA · OA01: Sexualidad y Afectividad (Bases Curriculares MINEDUC · Temario EELL pág. 7)`

### Hitos de Cierre Alcanzados:
1. **Preservación Inmutable de Blindajes:**
   - Editor Universal Plan B (`LessonEditorView.tsx`), Validador Canónico (`lesson-canonical-validator.ts`), Repositorio (`lesson-repository.ts`) y Referencia Canónica (`canonicalReference.json`) se mantuvieron **100% intactos**.
   - Matemática 7° Básico OA01 (`matematica_7b_oa01_clase01.ts` a `clase06.ts`) se mantuvo **estrictamente intacta y protegida**.
   - Ciencias Naturales 7° Básico OA01 Clase 02 (`ciencias_7b_oa01_clase02.ts`) se mantuvo **estrictamente inmutable** (hash `b40ddae3ac8a8a78e58cecfbf3e68ed213f84bbf1e4b8114d8d6f224e2973f5c`).
2. **Saneamiento Pedagógico de Resúmenes en App:**
   - En `ciencias_7b_oa01_clase03.ts`, `clase04.ts`, `clase05.ts` y `clase06.ts`, se erradicaron los textos genéricos de placeholder (`"Una situación"`, `"Aplicación del criterio formal en el cuaderno físico."`) reemplazándolos por las ideas pedagógicas reales extraídas del Paso 6/Paso 8 de sus fuentes canónicas Markdown en `LECCIONES_POR_REVISAR/110-7/Ciencias_Naturales/OA01/`.
3. **Recompilación de Artefactos Oficiales de Salida:**
   - **Plan Maestro DOCX:** Generado en `LECCIONES/110-7/Ciencias_Naturales/OA01/Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones_2026-10-28_09-14.docx` (50.928 bytes, SHA-256: `d36bf616f973...`).
   - **Prompts Limpios para Work TXT:** Generado en `LECCIONES/110-7/Ciencias_Naturales/OA01/Prompts_Work_Ciencias_7B_OA01_2026-10-28_09-14.txt` (166.963 bytes, SHA-256: `1ef4ebfc446c...`), conteniendo las **84 láminas bimodales completas** (6 clases x 14 láminas: 7 de Motivación + 7 de Explicación).
   - **Sincronización JSON Runtime:** `injected_lessons_7b.json` e `injected_lessons_all_grades.json` actualizados con las 6 lecciones canónicas.
   - **Manifiesto Oficial:** `LECCIONES/110-7/Ciencias_Naturales/OA01/manifest.json` actualizado a versión `2.0.0` con hashes reales de código y documentos.
4. **Validación Técnica y de Integridad:**
   - `scripts/test_canonical_auditor.ts`: **31/31 PASS** (código 0).
   - `scripts/audit_structural_rules.ts`: **30/30 VERIFICADOS** (código 0, 0 diffs, 0 tech failures, 0 observaciones en CNA).
   - `npm run build --prefix "Web Studio Simple"`: **APROBADO** (código de salida 0).

---

## 2. JERARQUÍA DE FUENTES Y RESOLUCIÓN DE CONTRADICCIONES

| Fuente | Tipo | Ruta Canónica | Estado / Veredicto |
| :--- | :--- | :--- | :--- |
| **Fuente A (Vigente)** | Markdown Staging + App TS + Auditor Canónico | `LECCIONES_POR_REVISAR/110-7/Ciencias_Naturales/OA01/CLASE01.md` a `CLASE06.md` <br>`Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts` a `clase06.ts`<br>`docs/auditorias/REFERENCIA_CANONICA_TITULOS_CONTINUIDAD.json` | **PREVALECE:** Títulos H1 oficiales aprobados en auditoría del 22-10-2026. Respetan la secuencia del Texto Escolar MINEDUC (págs. 114 a 137). |
| **Fuente B (Histórica)** | DOCX y TXT del 08-10-2026 | `Web Studio Simple/public/descargas_planes_maestros/Plan_Maestro_..._08-10-2026.docx` | **SUPERADA:** Títulos desalineados con los Markdown de Work. Fue reemplazada por la nueva compilación sincronizada. |

### Secuencia Curricular Oficial Vigente (Fuente A):
1. **Clase 01:** *La sexualidad integra distintas dimensiones*
2. **Clase 02:** *Cambios físicos durante la pubertad*
3. **Clase 03:** *Emociones, afectividad e imagen personal*
4. **Clase 04:** *Aspectos sociales y estereotipos*
5. **Clase 05:** *Vínculos afectivos y respeto mutuo*
6. **Clase 06:** *Decisiones responsables e integración*

---

## 3. MATRIZ FORENSE DE INVENTARIO Y ESTADO FINAL (CLASE01 A CLASE06)

| Clase | Título Oficial Vigente | Archivo TS | Fuente MD | Etapas | Miniquiz (3 A-D / Clave) | Motivación (7 láminas) | Explicación (7 láminas) | Resumen Pedagógico | Estado Final |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C01** | La sexualidad integra distintas dimensiones | `ciencias_7b_oa01_clase01.ts` | `CLASE01.md` | 8/8 | 3 preguntas (4 ops / Privada) | 7 / 7 | 7 / 7 | Limpio (3 ideas) | **PASS / VERIFICADO** |
| **C02** | Cambios físicos durante la pubertad | `ciencias_7b_oa01_clase02.ts` | `CLASE02.md` | 8/8 | 3 preguntas (4 ops / Privada) | 7 / 7 | 7 / 7 | Limpio (2 ideas) | **PASS / VERIFICADO** |
| **C03** | Emociones, afectividad e imagen personal | `ciencias_7b_oa01_clase03.ts` | `CLASE03.md` | 8/8 | 3 preguntas (4 ops / Privada) | 7 / 7 | 7 / 7 | Saneado (2 ideas) | **PASS / VERIFICADO** |
| **C04** | Aspectos sociales y estereotipos | `ciencias_7b_oa01_clase04.ts` | `CLASE04.md` | 8/8 | 3 preguntas (4 ops / Privada) | 7 / 7 | 7 / 7 | Saneado (2 ideas) | **PASS / VERIFICADO** |
| **C05** | Vínculos afectivos y respeto mutuo | `ciencias_7b_oa01_clase05.ts` | `CLASE05.md` | 8/8 | 3 preguntas (4 ops / Privada) | 7 / 7 | 7 / 7 | Saneado (2 ideas) | **PASS / VERIFICADO** |
| **C06** | Decisiones responsables e integración | `ciencias_7b_oa01_clase06.ts` | `CLASE06.md` | 8/8 | 3 preguntas (4 ops / Privada) | 7 / 7 | 7 / 7 | Saneado (2 ideas) | **PASS / VERIFICADO** |

---

## 4. AUDITORÍA DE INSUMOS DE PRESENTACIONES Y DELIMITACIÓN DE MISIÓN

### A. Delimitación Estricta de Misión (Antigravity vs ChatGPT Work)
- **Misión de Antigravity:** Suministrar el código TypeScript de la App, el documento oficial DOCX (Plan Maestro con tablas didácticas y fichas curriculares) y el archivo TXT con los **84 prompts limpios de producción audiovisual** (14 láminas bimodales por lección = 7 Gancho + 7 Explicación).
- **Misión de ChatGPT Work:** Compilar en su propio entorno Python los **12 archivos PPTX finales** (`110-7-CNA-OA01-CLASE0[1-6]-MOTIVACION.pptx` y `EXPLICACION.pptx`) empleando la librería `python-pptx`, las plantillas visuales oficiales y los prompts de imagen para IA sin texto.
- **Régimen de Gobernanza:** En el repositorio local **no existen archivos PPTX de Ciencias Naturales**. Antigravity tiene estrictamente prohibido generar o mutar presentaciones PPTX finales.

### B. Especificación Técnica de las 84 Láminas Bimodales Integradas en el TXT Oficial
Todas las láminas en `Prompts_Work_Ciencias_7B_OA01_2026-10-28_09-14.txt` cumplen rigurosamente con los estándares:
1. **Formato:** Proporción 16:9 estricto (1920x1080 Full-Bleed sin máscaras ni paneles rígidos).
2. **Estética y Personajes:** Anime Moderno (iluminación cinematográfica tipo Shinkai). Dúo co-protagónico de 13 años (joven con trenzas y joven con chaqueta cerceta) presentes en el 100% de las láminas.
3. **Tipografía y Jerarquía:** Título 64 pt (amarillo oro / alto contraste), Subtítulo 48 pt (blanco puro, máximo 8 palabras). Diapositiva 1 de Explicación declara el objetivo didáctico.
4. **Logotipo Oficial:** Logo blanco de EstudioSimple en la esquina inferior derecha, respetando el área de resguardo y espacio negativo.
5. **Notas al Orador (Locución Google Vids):** Español latino natural, breve, sin marcas técnicas de tiempo ni conteos invasivos (~60s para Motivación, ~90s para Explicación).

---

## 5. RESUMEN DE ARTEFACTOS PRODUCIDOS Y HASHES CRIPTOGRÁFICOS

| Artefacto Generado / Sincronizado | Ubicación Canónica | Tamaño | SHA-256 |
| :--- | :--- | :---: | :--- |
| **Plan Maestro DOCX Oficial** | `LECCIONES/110-7/Ciencias_Naturales/OA01/Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones_2026-10-28_09-14.docx` | 50.928 B | `d36bf616f97354d7a36db602b8f1773f74d6ae10b5e133a80112395272b4fce2` |
| **Prompts Limpios TXT (84 láminas)** | `LECCIONES/110-7/Ciencias_Naturales/OA01/Prompts_Work_Ciencias_7B_OA01_2026-10-28_09-14.txt` | 166.963 B | `1ef4ebfc446c16c8b6e567d784ff656092451758672f0a7712a2904996615278` |
| **Módulo Clase 01 TS** | `Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts` | 30.330 B | `5e9823ecf52230da37f262c5b369612a2a07d39169fa12b919b53b0a70197022` |
| **Módulo Clase 02 TS (Inmutable)** | `Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase02.ts` | 25.881 B | `b40ddae3ac8a8a78e58cecfbf3e68ed213f84bbf1e4b8114d8d6f224e2973f5c` |
| **Módulo Clase 03 TS** | `Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase03.ts` | 25.807 B | `f04c63283fdbb8c34f037dd7860155fcb5e7d583c8466e3b50c115714041d8e1` |
| **Módulo Clase 04 TS** | `Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase04.ts` | 26.262 B | `07d2f9cb1a4bbabfbe52bcf6539bf99f1fa2d0e7041ca490895cae1a9657ba54` |
| **Módulo Clase 05 TS** | `Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase05.ts` | 26.152 B | `708aa86934ee8a587ce9f705e46513e9a7e04e9c7041c30e71966a34731c238b` |
| **Módulo Clase 06 TS** | `Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase06.ts` | 28.093 B | `8390b1c0e35f52431aa7cb73c9fef4c022374668270505bdf9b216999bfe3e4f` |
| **Manifiesto Canónico** | `LECCIONES/110-7/Ciencias_Naturales/OA01/manifest.json` | 3.528 B | `2f9d658c9b3ea83c07e0506eb36531aa96d3fdf6c63cfd29c88424efb4ba153a` |

---

## 6. CONCLUSIÓN Y DICTAMEN FINAL

El objetivo de aprendizaje **110-7 · CNA · OA01 (Ciencias Naturales 7° Básico)** queda técnicamente saneado, pedagógicamente alineado con las fuentes curriculares oficiales del MINEDUC y sincronizado de forma isomórfica entre la App SPA, el catálogo PWA, el DOCX oficial y el archivo consolidado de Prompts para ChatGPT Work.

**DICTAMEN TÉCNICO:**  
**CIENCIAS NATURALES 7° BÁSICO · OA01: LECCIONES, CATÁLOGO, MANIFIESTO Y PROMPTS AUDITADOS, SANEADOS Y CERTIFICADOS AL 100%. INSUMOS LISTOS PARA COMPILACIÓN DE PRESENTACIONES PPTX EN EL ENTORNO DE CHATGPT WORK.**
