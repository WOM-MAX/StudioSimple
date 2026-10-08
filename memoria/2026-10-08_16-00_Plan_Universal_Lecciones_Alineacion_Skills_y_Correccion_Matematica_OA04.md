# Bitácora de Ejecución: Plan Universal de Lecciones (3° a 8° Básico), Alineación de Skills y Corrección de Matemática 7° OA04

- **Fecha:** 2026-10-08 16:00 [America/Santiago]
- **Estado de Cierre:** COMPLETADO CON ÉXITO
- **Objetivos Cumplidos:**
  1. Formalización del Plan Universal de Lecciones (3° a 8° Básico).
  2. Alineación de Skills (`estudiosimple-lecciones`, `auditor_coherencia_estudiosimple`) y perfiles disciplinares/cursos.
  3. Registro verificable previo de 156 hallazgos de Matemática 7° OA04.
  4. Corrección integral y unidireccional de `scripts/oa04_data/` para MAT-OA04.
  5. Recompilación canónica (DOCX, TXT de prompts, TypeScript, manifest).
  6. Certificación interna por el motor de auditoría (0 hallazgos) y compilación limpia de la app SPA (código 0).

---

## 1. Plan Universal de Producción, Auditoría y Gobernanza (`spec/constitution/plan_universal_lecciones_3a8.md`)

- **Alcance Universal Exclusivo (3° a 8° Básico):**
  * 8 etapas duales (Mentor / Estudiante).
  * Estándar obligatorio de 6 lecciones completas por OA (Directriz Work).
  * Principio de **Fuente Estructurada Única por OA** (ej. `scripts/oa04_data/`) con compilación estrictamente unidireccional hacia DOCX, prompts TXT y TypeScript, prohibiendo la edición manual de archivos derivados.
  * Reglas universales `UNI-001` a `UNI-015` clasificadas formalmente como **BLOQUEANTES**.
  * Identidad determinista de ejercicios en **5 dimensiones**: 1) contexto; 2) datos y unidades; 3) pregunta e intención; 4) procedimiento esperado; 5) respuesta correcta y retroalimentación, enlazando `caso1` y `caso2` entre práctica, Diapositiva 6 y comprobación post-video (`postQuestions`).
  * Separación de controles de Work/Codex en dos fases:
    - *Fase Pre-Aprobación:* Auditor independiente de DOCX y prompts TXT (el PPTX aún no existe).
    - *Fase Post-Aprobación:* Construcción y verificación visual de PPTX en Python tras la orden humana.
  * Ciclo de 5 estados: `BORRADOR` -> `EN_REVISION` (`WORK_PRE_APROBACION`) -> `REQUIERE_AJUSTES` -> `LISTA_PARA_APROBACION` -> `APROBADA`.
  * Delimitación de gobernanza: Cero hallazgos del motor certifica **únicamente la auditoría interna**. Antigravity entrega en `EN_REVISION` (`WORK_PRE_APROBACION`). Queda prohibido declarar `LISTA_PARA_APROBACION` antes de la revisión independiente de Work/Codex. La aprobación final a `APROBADA` es potestad y orden exclusiva de Walter por consola.
  * Catálogo de ejemplos aprobados: Matemática 7° OA01 preservado intacto como referencia aprobada; MAT-OA04 permanece excluido hasta contar con la aprobación formal de Walter.
  * Trazabilidad temporal obligatoria en `America/Santiago`.

---

## 2. Alineación de Skills y Perfiles

- **`rules/reglas_universales.md`:** Se clasificaron todas las reglas `UNI-001` a `UNI-015` como `[BLOQUEANTE]`. Se incorporaron los principios de fuente única y las 5 dimensiones de identidad.
- **`SKILL.md` (estudiosimple-lecciones):** Actualizado con la regla de fuente estructurada única, el flujo de 12 pasos, los 5 estados del manifiesto y la gobernanza de aprobación humana por consola.
- **`profiles/asignaturas/matematica.md`:** Se incorporó el estándar de subtítulos en 36 pt (máximo 8 palabras), la notación canónica $p\% = p \div 100$, y la progresión temática curricular de 7° Básico OA04 (Porcentajes). Se precisó que no aplica a otras asignaturas.
- **`profiles/cursos/perfil_7_basico.md`:** Alberga la estructura bimodal de 14 láminas (7 Gancho + 7 Explicación) y reactivos de 4 alternativas (A, B, C, D) con análisis de distractores.
- **`scripts/audit_coherence_engine.ts`:**
  * Corrección de regex en `placeholderPatterns` con soporte unicode para evitar falsos positivos con palabras legítimas como `MÉTODO`.
  * Verificación determinista de identidad en 5 dimensiones para Diapositiva 6 (`caso1`) y `postQuestions` (`caso1` y `caso2`).
  * Severidad 'Alta' (bloqueante) en todas las reglas universales.
  * Suite de regresión `--regression-check` validada con 0 fallos.

---

## 3. Registro Verificable de Hallazgos Previos

- Generado en `docs/auditorias/110-7-MAT-OA04_hallazgos_previos.md`.
- Total real documentado: **156 hallazgos** (70 WARN-PROMPT-002, 70 ERR-VISUAL-001, 5 ERR-ISOM-002, 5 ERR-POST-001, 3 ERR-TELEO-002, 2 ERR-STEP-002, 1 ERR-PROMPT-003).

---

## 4. Calibración y Corrección de Matemática 7° OA04

- **Fuente Estructurada Única:** `scripts/oa04_data/clase01.ts` a `clase06.ts`.
- **84 Prompts Visuales:** Estandarizados al formato 16:9 Anime Moderno con el dúo co-protagónico de 13 años (joven con trenzas y joven con chaqueta cerceta), espacio negativo y cláusula `'No text drawn by AI'`. Se erradicaron palabras prohibidas (`badge`, `insignia`).
- **Diapositiva 6:** Modela en cada clase con exactitud isomórfica el primer ejercicio de la práctica (`practice[0]` / `caso1`) en sus 5 dimensiones.
- **Diapositiva 7:** Cierre teleológico con Regla de Oro y pase directo: *"Ahora pon a prueba lo aprendido resolviendo los casos de práctica en la plataforma interactiva"*.
- **Comprobación Post-Video (`postQuestions`):** Enlaza `caso1` y `caso2` reutilizando sin variantes la práctica de plataforma.
- **Clase 6:** Objetivo canónico *"Hallar el total (100%) conociendo una parte y el porcentaje correspondiente"*. Eliminación total del término *"porcentaje acumulado"*. Reactivos formales de 4 alternativas A-D con justificación psicométrica de distractores.
- **Paso 8 (`paso8_cierre`):** Completo en las 6 clases con `preguntaSintesis`, `metacognicion` y `celebracion`.

---

## 5. Compilación Unidireccional y Evidencia (DoD)

- **Script:** `npx tsx scripts/build_matematica_oa04_package.ts`
  * 6 archivos TypeScript generados en `Web Studio Simple/src/data/lessons/`.
  * `Plan_Maestro_7Básico_110-7-MAT-OA04_6Lecciones.docx` (67.392 bytes).
  * `Prompts_Work_Matematica_7B_OA04.txt` (196.131 bytes).
  * `manifest.json` (5.960 bytes): `"status": "EN_REVISION"`, `"etapa_revision": "WORK_PRE_APROBACION"`, timestamp `America/Santiago`.
- **Motor de Auditoría Interna:** `npx tsx scripts/audit_coherence_engine.ts 110-7-MAT-OA04`
  * **0 hallazgos detectados.**
  * Isomorfismo: 6 / 6.
  * Anti-Texto: 84 / 84.
  * Dúo co-protagónico: 84 / 84.
  * Criterios visuales: 84 / 84.
  * Reutilización post-video: 6 / 6.
  * Estructura teleológica: 6 / 6.
  * Estado: **Aprobado (auditoría interna)**.
- **Compilación de Producción:** `npm run build --prefix "Web Studio Simple"`
  * `tsc`: 0 errores.
  * `vite build`: código de salida 0 en 11.96s.
