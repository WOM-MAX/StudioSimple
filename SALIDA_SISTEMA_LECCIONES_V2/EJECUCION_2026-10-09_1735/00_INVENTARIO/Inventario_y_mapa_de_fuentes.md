# INVENTARIO Y MAPA DE FUENTES: LÍNEA BASE DEL SISTEMA GLOBAL
## EstudioSimple — Sistema Global de Lecciones v2.0
**Ruta de Entrega:** `D:\StudioSimple - Antigravity\SALIDA_SISTEMA_LECCIONES_V2\EJECUCION_2026-10-09_1735\`  
**Fecha y Hora:** 2026-10-09 17:35 [America/Santiago]  
**Estado:** Propuesta en preparación para revisión de Walter  

---

## 1. Materiales Efectivamente Revisados

| Categoría | Ruta del Archivo en el Repositorio | Tamaño / Versión | Descripción y Observaciones |
| :--- | :--- | :---: | :--- |
| **Instrucción Vigente** | `INSTRUCCIONES_ANTIGRAVITY_SISTEMA_GLOBAL_LECCIONES_EstudioSimple.md` | 28.8 KB | Documento maestro con las decisiones invariables, autoridad por materia y 6 fases. |
| **Manual Maestro** | `MANUAL MAESTRO/Sistema_Lecciones_EstudioSimple_7B_v1_2026-10-09.docx` | 13.9 KB | Manual de diseño curricular para 7° básico y resoluciones DEC-01 a DEC-07. |
| **Currículo Oficial** | `INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/Ciencias Naturales.pdf` | 124.1 MB | Texto del Estudiante 7.° Básico, Edición Especial SM Chile / MINEDUC (Unidad 4, págs. 114-137). |
| **Currículo Oficial** | `INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/Matemática.pdf` | 83.7 MB | Texto del Estudiante 7.° Básico, Edición SM Chile / MINEDUC. |
| **Currículo Oficial** | `INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/Lengua y literatura.pdf` | 48.4 MB | Texto del Estudiante 7.° Básico, Edición SM Chile / MINEDUC. |
| **Currículo Oficial** | `INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/Inglés.pdf` | 48.7 MB | Texto del Estudiante 7.° Básico, Edición Express Publishing / MINEDUC. |
| **Currículo Oficial** | `INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/Historia, Geografía y Ciencias Sociales.pdf` | 234.6 MB | Texto del Estudiante 7.° Básico, Edición SM Chile / MINEDUC. |
| **Skill Activa** | `.agents/skills/estudiosimple-lecciones/SKILL.md` | 13.2 KB | Skill de lecciones en estado limpio de Git (solo lectura, no modificada). |
| **Skill Activa** | `.agents/skills/auditor_coherencia_estudiosimple/SKILL.md` | 10.5 KB | Skill auditora de coherencia pedagógica en estado limpio de Git. |
| **Catálogo Activo** | `.agents/skills/auditor_coherencia_estudiosimple/rules_catalog.json` | 20.5 KB | Catálogo oficial de 47 reglas normativas (códigos únicos UNI, 7B, MAT, LYL, ING, CIE, HIS). |
| **Plan Existente** | `LECCIONES/110-7/Ciencias_Naturales/OA01/Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones_2026-10-08_17-52.docx` | 82.8 KB | Plan Maestro oficial vigente de las 6 clases de Ciencias OA01. |
| **Prompts Existentes** | `LECCIONES/110-7/Ciencias_Naturales/OA01/Prompts_Work_Ciencias_7B_OA01_2026-10-08_17-52.txt` | 233.9 KB | Prompts de diapositivas para ChatGPT Work vigentes. |
| **Manifiesto Existente**| `LECCIONES/110-7/Ciencias_Naturales/OA01/manifest.json` | 3.7 KB | Manifiesto con metadatos del paquete de Ciencias OA01. |
| **Datos Aplicación** | `Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts` | 35.3 KB | Estructura TypeScript de la Clase 1 de Ciencias 7° OA01. |
| **Tipos del Sistema** | `Web Studio Simple/src/types/lesson.ts` | 8.2 KB | Definición de interfaz `LessonData` de la aplicación web. |

---

## 2. Estado de Existencia, Aprobación y Fuentes Faltantes

- **Matemática OA01 (`110-7-MAT-OA01`):** Paquete en estado `APROBADA` (inmutable en producción; no se toca).
- **Matemática OA04 (`110-7-MAT-OA04`):** Paquete en estado `EN_REVISION`.
- **Ciencias Naturales OA01 (`110-7-CIE-OA01`):** Paquete histórico en estado `APROBADA`, del cual la **Clase 1** se utiliza como piloto de validación del sistema en esta ejecución.
- **Historia y Geografía OA02 (`110-7-HIS-OA02`):** Paquete en estado `REQUIERE_AJUSTES`.
- **Fuentes faltantes:** Ninguna fuente curricular esencial falta para el piloto de Ciencias 7° OA01 Clase 1; el texto escolar oficial de Ediciones SM (Unidad 4) está 100% disponible e indexado en disco.

---

## 3. Línea Base de Campos Pedagógicos Protegidos

Para asegurar que las validaciones y transformaciones no alteren inadvertidamente la integridad de las lecciones, se fija formalmente la siguiente **línea base de campos protegidos**:

### 3.1 Metadatos Canónicos de la Lección
- `id`: Identificador formal canónico (ej. `110-7-CIE-OA01-C01`). Inmutable.
- `grade`: Nivel escolar oficial (`7B`). Inmutable.
- `subject`: Código de asignatura (`Ciencias_Naturales`). Inmutable.
- `oaCode`: Código de Objetivo de Aprendizaje oficial MINEDUC (`OA01`). Inmutable.
- `classNumber`: Número ordinal de la clase dentro de la secuencia (1 a 6). Inmutable.
- `subobjective`: Texto del subobjetivo específico de la clase. Protegido.
- `officialSource`: Objeto con `document`, `pages` y `officialPublisher`. Obligatorio y protegido.
- `governanceStatus`: Estado normativo (`EN_REVISION` durante la propuesta). Protegido.
- `stages`: Objeto contenedor de las 8 etapas. Inmutable.

### 3.2 Campos Invariables de las Ocho Etapas Oficiales
1. `etapa1_inicio`: `welcome`, `sequencePosition`, `subobjective`, `priorKnowledgeConnection`, `roadmap`, `adultGuide`.
2. `etapa2_videoMotivacional`: `slides` (exactamente 7 diapositivas con `number`, `title`, `visibleText`, `visualDescription`, `oralScript`, `hasAntiTextClause`), `adultPreInstruction`, `adultPostCheck`.
3. `etapa3_recorrido`: `inquiryQuestions` (preguntas con `question`, `expectedAnswer`, `hint`, `feedbackSuccess`, `feedbackHelp`), `adultGuide`.
4. `etapa4_videoExplicativo`: `slides` (exactamente 7 diapositivas con `number`, `title`, `visibleText`, `visualDescription`, `oralScript`, `hasAntiTextClause`), `case1Model`, `goldenRule`.
5. `etapa5_practica`: `exercises` (actividades con `prompt`, `adultInstruction`, `expectedPerformance`, `hints`, `notebookRequired`), `adultGuide`.
6. `etapa6_resumen`: `keyIdeas`, `summaryCardNotebook`, `adultGuide`.
7. `etapa7_miniquiz`: `questions` (exactamente 3 preguntas con `options` A-D, `correctOption`, `explanationCorrect`, `distractorExplanations`), `remediationLoop` (con `thresholdPassing: 2` y `remedialPracticeItem`).
8. `etapa8_cierre`: `metacognitionQuestion`, `congratulationsMessage`, `transferNextLesson`, `adultGuide`.

---

## 4. Mapa entre Fuentes Originales y Entregables Propuestos

| Archivo Fuente Original (Lectura) | Archivo Propuesto en la Entrega (Destino) | Función en la Entrega |
| :--- | :--- | :--- |
| `.agents/skills/estudiosimple-lecciones/SKILL.md` | `01_ESTRUCTURA_GLOBAL/SKILL.md` | Capa global con 8 etapas, 7+7 slides, 6 clases/OA y andamiaje 3°-8°. |
| `.agents/skills/expert_matematica/SKILL.md` | `02_MODULOS/Matematica/SKILL.md` | Módulo disciplinar Matemática (CPA, recálculo, 36 pt, IVA 19%). |
| `.agents/skills/expert_lenguaje_literatura/SKILL.md` | `02_MODULOS/Lengua_y_Literatura/SKILL.md` | Módulo disciplinar Lengua y Literatura (comprensión multinivel, citas). |
| `.agents/skills/expert_ingles/SKILL.md` | `02_MODULOS/Ingles/SKILL.md` | Módulo disciplinar Inglés (CLT, input comprensible, delimitación de idiomas). |
| `.agents/skills/expert_ciencias_naturales/SKILL.md` | `02_MODULOS/Ciencias_Naturales/SKILL.md` | Módulo disciplinar Ciencias Naturales (indagación, 4 dimensiones, no diagnósticos). |
| `.agents/skills/expert_historia_ciencias_sociales/SKILL.md` | `02_MODULOS/Historia_Geografia_Ciencias_Sociales/SKILL.md` | Módulo disciplinar Historia (multicausalidad, fuentes, Neolítico, fechas). |
| `spec/features/` & plantillas de OA | `03_PLANTILLAS/Ficha_reutilizable_OA.md` | Plantilla canónica para planificar las 6 clases de cualquier OA. |
| `.agents/skills/auditor_coherencia_estudiosimple/rules_catalog.json` | `04_CONTROL/Catalogo_de_reglas.json` | Catálogo de 47 reglas normativas computadas dinámicamente. |
| Mapa de reglas previo | `04_CONTROL/Matriz_de_reglas.csv` | Matriz tabular en CSV con aplicabilidad por nivel, asignatura, etapa y OA. |
| Scripts de validación previos | `04_CONTROL/Validador_y_pruebas/` | Validador independiente con verificación de campos protegidos y fixtures reales. |
| `Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts` | `05_PILOTO/110-7-CIE-OA01/Clase_01/` | Paquete de la Clase 1 con fuente única TS, guion MD, Word DOCX y manifest. |
| Informes previos | `06_INFORME/Informe_de_cierre.md` | Informe final de cierre con estado `APTO PARA REVISIÓN DE WALTER`. |
