# Bitácora de Memoria: Delimitación Estricta entre Skills Universales y Específicas

**Fecha:** 2026-10-07 20:42  
**Hito:** Alineación Jerárquica y Desacoplamiento de Aprendizajes en la Arquitectura de Skills  
**Autor:** Antigravity (A-SDLC)

---

## 1. Contexto y Advertencia
Se detectó que en iteraciones previas se habían depositado aprendizajes disciplinares específicos de biología (endocrinología, pubertad, Tanner/MedlinePlus, Edición SM) directamente en el cuerpo de la Skill Universal (`estudiosimple-lecciones/SKILL.md`), mientras que las Skills Específicas (`expert_ciencias_naturales`, `assessment_evaluation_expert`, `curriculum_mineduc_expert`) carecían de estas definiciones críticas.

---

## 2. Acciones Ejecutadas y Mapeo Canónico

### A. Skill Universal (`.agents/skills/estudiosimple-lecciones/`)
Se reestructuró la **Sección 9** y se consolidó en `rules/reglas_universales.md` **exclusivamente lo transversal** a todas las asignaturas (3° a 8° básico):
1. **Duraciones planificadas y tolerancia Google Vids:** 60s (Gancho) y 90s (Explicación) sin "aproximado". Cero rechazos por duración acústica exportada o conteo de palabras.
2. **Separación radical Fondos IA vs Overlays Editables:** Fondos limpios con tarjetas modulares en blanco y espacio negativo real (`No text drawn by AI. No logo drawn by AI`). Prohibido pedir letras A-D o textos a la IA. Letras, subtítulos ($\le 8$ palabras) y logo blanco van en overlays editables (PPTX / código web).
3. **Nomenclatura rigurosa de reactivos:** Elaborados por el equipo = "reactivo didáctico de práctica elaborado para esta clase" / "formato tipo Examen Libre". "Oficial MINEDUC" reservado exclusivamente para ítems de pruebas ministeriales comprobables con cita.
4. **Isomorfismo en Paso 6:** Comprobación posterior reproduce exactamente los casos modelados en Lámina 6 y práctica guiada.
5. **Estructura:** 6 lecciones completas por OA y ausencia de cuadernillos anexos (práctica escrita en Paso 5).

### B. Skill Específica Disciplinar (`.agents/skills/expert_ciencias_naturales/SKILL.md`)
Se inyectaron todos los aprendizajes disciplinares de Ciencias Naturales:
1. **Fisiología endocrina:** Cascada estricta Hipotálamo $\rightarrow$ Hipófisis (secreta gonadotropinas LH y FSH) $\rightarrow$ Gónadas (secretan hormonas sexuales). Prohibido atribuir hormonas sexuales a la hipófisis.
2. **Distinción médica en Pubertad:** Inicio puberal (8–13 niñas telarquia, 9–14 niños volumen testicular $\ge 4\text{ ml}$ según Tanner 1962, MedlinePlus/OMS y SOCHIPE) rigurosamente diferenciado del estirón de estatura (10–14 niñas, 12–16 niños; rango poblacional amplio 10–16 años). Prohibido afirmar que la pubertad inicia de 10 a 16 años.
3. **Límite diagnóstico individual:** No diagnosticar con curvas generales; derivación a adultos de confianza o profesionales de salud.
4. **Tratamiento de género y estereotipos:** Redacción formativa respaldada (los estereotipos sociales no deben limitar intereses, talentos ni oportunidades).
5. **Texto escolar oficial:** Edición SM (Editorial SM / MINEDUC) para 7° Básico; prohibido llamarlo Santillana.
6. **Cuatro dimensiones de la sexualidad:** Organización didáctica integral, no decreto literal.

### C. Skill Específica Psicométrica (`.agents/skills/assessment_evaluation_expert/SKILL.md`)
1. Nomenclatura rigurosa de reactivos creados vs oficiales comprobables.
2. Estandarización de 4 alternativas (A, B, C, D) con distractor plausible para segundo ciclo básico (7° y 8°).

### D. Skill Específica Curricular (`.agents/skills/curriculum_mineduc_expert/SKILL.md`)
1. Verificación de editoriales oficiales vigentes en Currículum Nacional por nivel/asignatura.
2. Distinción entre modelos didácticos organizativos y decretos oficiales literales.

---

## 3. Estado de Compilación y Manifiestos
- Paquete Ciencias OA 01 preservado en estado `REQUIERE_AJUSTES` en su `manifest.json`.
- Compilación limpia y desacoplamiento verificado.
