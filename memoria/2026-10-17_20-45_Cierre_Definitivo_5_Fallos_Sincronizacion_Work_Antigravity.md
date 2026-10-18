# Bitácora de Cierre Definitivo: 5 Fallos Comprobados por Work en la Sincronización del Curso 110-7

**Fecha:** 2026-10-17 20:45 [America/Santiago]  
**Autor:** Antigravity (Ingeniero A-SDLC)  
**Estado:** `EN_REVISION`  
**Entorno:** Preparación Aislada (`staging_preparacion_aislada/`)  
**Instrucción de referencia:** `PROMPT_CERRAR_FALLOS_SINCRONIZACION_2026-10-17_19-56_CL.txt`  
**Entregables generados:**
- `entregas/2026-10-17/INFORME_RESULTADO_CORRECCION_PARSER_Y_RECUPERACION_ANTIGRAVITY_2026-10-17_20-44_CL.md` (SHA-256: `770dafde351348a02833f1e464848fed554322a0d442031bab9c1f392dd006da`)
- `entregas/2026-10-17/PARCHE_Y_EVIDENCIA_CORRECCION_INTEGRACION_ANTIGRAVITY_2026-10-17_20-44_CL.json` (SHA-256: `a30c6ca51d5a692104c12a7f02f3b643d949dec9b919d964f98c31dd632990f9`)

---

## 1. Problema Detectado
Tras el informe de auditoría cruzada emitido por ChatGPT Work, se identificaron 5 fallos estructurales que impedían la sincronización fidedigna de las lecciones del curso 110-7 (7° básico):
1. **Fallo 1 (R01/R03 - Láminas sintéticas en parser):** El parser universal generaba 420 láminas artificiales con títulos de paneles solares y textos de relleno debido a un regex con lookahead que cortaba el bloque de guiones al toparse con `#### Diapositiva 01`.
2. **Fallo 2 (R05 - Falsos positivos de logro):** `AdultLessonView.tsx` invocaba `markLessonCompleted` al presionar "Finalizar sesión (sin acreditar logro)" o con 0/3 o 1/3 aciertos. En `StudentRecoveryView.tsx`, las tareas cualitativas abiertas de cuaderno se comparaban contra alternativas de selección múltiple.
3. **Fallo 3 (Contrato Pedagógico & Linter):** El contrato pedagógico pretendía estatus prescriptivo unilateral y fusionaba la preparación del adulto con los pasos del estudiante. El linter pre-inyección rechazaba encabezados válidos de fuentes congeladas o exigía dos preguntas posteriores donde había una.
4. **Fallo 4 (R02/R06 - Pérdida de comprobación y títulos truncados):** `scripts/export_oa04_to_markdown.ts` truncaba `postQuestions` a solo `[0]`. Inglés 01 extraía el encabezado del banner en lugar de su título pedagógico real.
5. **Fallo 5 (R03/R07 - Auditor permisivo con láminas genéricas y sin pruebas negativas):** El auditor no detectaba textos genéricos en láminas y carecía de las 3 pruebas negativas de alteración demostradas por Work.

---

## 2. Hipótesis Descartadas
1. *¿Modificar los archivos Markdown de Work para forzar coincidencia sintáctica?* Descartada: Las fuentes originales de Work están congeladas y garantizan la autoría pedagógica; el parser y los adaptadores deben ser lo suficientemente robustos para extraer la información auténtica sin alterar las fuentes.
2. *¿Acreditar la lección de inmediato en la recuperación sin reintento de miniquiz?* Descartada: Rompe el principio psicométrico de dominio formativo (estándar mínimo 67%, >= 2/3 aciertos).

---

## 3. Causa Raíz
- **Parser de láminas:** Regex `/(?=###\s*EXPLICACION|##\s+[A-Za-z0-9]|$)/i` sin flag multilínea (`/m`) y sin anclaje de inicio estricto (`^## `). Al encontrar `#### Diapositiva 01` (que contiene `## \s+D`), el lookahead saltaba prematuramente y dejaba el bloque en 3 caracteres, disparando la síntesis genérica.
- **Flujo de sesión:** `useEffect` en `AdultLessonView.tsx` escuchaba `session.stage === 'completed'` sin validar `session.miniScore >= 2`.

---

## 4. Solución Implementada
1. **Parser Universal (`scripts/pipeline_sync_lessons.ts`):** Erradicación absoluta de las ramas de síntesis genérica. Búsqueda por índices de las secciones de guiones audiovisuales con límites anclados al inicio de línea (`^## `). Extracción bimodal estricta de 14 láminas (7 Motivación en `hook.slides` y 7 Explicación en `formalization.slides`). Normalización de títulos para reconocer `**Lesson title:**` y `**Next class working title:**`.
2. **Vistas de Aula (`AdultLessonView.tsx` y `StudentRecoveryView.tsx`):** `markLessonCompleted` condicionado estrictamente a `session.miniScore >= 2` tras reintento de miniquiz. Tareas abiertas (`kind: 'open_response'`) desacopladas de las alternativas de selección múltiple.
3. **Contrato y Linter:** `spec/contrato_pedagogico_lecciones_estudiosimple.md` declarado como `BORRADOR DE TRABAJO (En alineación bilateral con Work — Sin prevalencia sobre planes vigentes)`, respetando los 8 momentos de navegación para el estudiante. `scripts/linter_contrato_pedagogico.ts` calibrado: 30/30 clases APTAS PARA INYECCIÓN.
4. **Exportador OA04 (`scripts/export_oa04_to_markdown.ts`):** Preservación de todas las preguntas de `postQuestions`.
5. **Auditor de Integridad (`scripts/audit_30_lessons_integrity.ts`):** Detección de láminas genéricas y adición de las 3 pruebas de mutación negativa automatizadas:
   - `--test-mutation-cna02-key`: mutación clave CNA02Q2 (falla código 1).
   - `--test-mutation-lyl01-key`: cambio alternativa LYL01Q1 (falla código 1).
   - `--test-mutation-cna02-stimulus`: retiro de contexto de práctica CNA02 (falla código 1).
   - Ejecución estándar: 30/30 PASS (código 0).

---

## 5. Archivos Modificados
- `Web Studio Simple/src/components/lesson/adult/AdultLessonView.tsx`
- `Web Studio Simple/src/components/lesson/student/StudentRecoveryView.tsx`
- `scripts/pipeline_sync_lessons.ts`
- `scripts/export_oa04_to_markdown.ts`
- `scripts/audit_30_lessons_integrity.ts`
- `scripts/linter_contrato_pedagogico.ts`
- `spec/contrato_pedagogico_lecciones_estudiosimple.md`
- `scripts/generate_final_correction_delivery.ts`
- `entregas/2026-10-17/INDICE_ENTREGA_2026-10-17.md`

---

## 6. Resultados y Validación
- `npx tsc --noEmit` en `Web Studio Simple/`: **Código 0 (0 errores)**.
- `npm run build` en `Web Studio Simple/`: **Código 0 (Vite build exitoso en 29.12s)**.
- `scripts/audit_30_lessons_integrity.ts`: **30/30 PASS (0 defectos)**.
- 3 Pruebas Negativas: **Las 3 fallan con código 1 y mensaje explícito de causa**.
- `scripts/linter_contrato_pedagogico.ts`: **30/30 clases APTAS PARA INYECCIÓN**.
- `scripts/test_accreditation_path_real.ts`: **6/6 casos aprobados**.
- Material protegido (Matemática OA01 y 14 PPTX terminados): **100% intactos**.
- Paridad SHA-256 de los entregables entre `entregas/2026-10-17/` y directorio de artefactos IDE: **Verificada 100% idéntica**.

---

## 7. Próximos Pasos y Gobernanza
Todo el material permanece en **`EN_REVISION`** en preparación aislada (`staging_preparacion_aislada/`). Conforme a `AGENTS.md`, queda terminantemente prohibida la autoaprobación o inyección automática a producción. La promoción oficial a `APROBADA` queda supeditada a la instrucción explícita de Walter por consola tras la revisión conjunta con ChatGPT Work.
