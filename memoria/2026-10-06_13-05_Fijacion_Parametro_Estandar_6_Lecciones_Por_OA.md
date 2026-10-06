# Bitácora de Configuración Normativa: Parámetro Estándar de 6 Lecciones por Objetivo (OA)

- **Fecha:** 2026-10-06 13:05
- **Rol:** Antigravity (Ingeniero de Software IA)
- **Origen:** Recomendación y directriz de ChatGPT Work validada por Walter
- **Estado:** Parámetro Fijado y Documentado en Gobernanza y Skills

---

## 1. Contexto y Decisión

Durante la auditoría de lecciones entre Antigravity, Walter y ChatGPT Work, Work recomendó establecer como **estándar fijo y obligatorio exactamente 6 lecciones completas por cada Objetivo de Aprendizaje (OA)**.

Esta definición unifica el alcance pedagógico, evitando disparidades (como paquetes de 5 clases vs 6 clases) y asegurando que cada OA cuente con el espacio didáctico necesario para cubrir el ciclo completo de aprendizaje y preparación para los Exámenes Libres (EELL) del MINEDUC.

---

## 2. Archivos Actualizados y Parámetros Fijados

1. **`AGENTS.md` (Gobernanza Principal):**
   - Se incorporó la regla en los boundaries y en el *Alcance Universal de las Skills*:
     > **Parámetro Estándar de Cobertura por OA (Directriz Work):** Se fija como parámetro normativo obligatorio **exactamente 6 lecciones completas por Objetivo de Aprendizaje (OA)**. Cada paquete curricular por OA debe planificarse y estructurarse en 6 clases completas.

2. **`.agents/skills/estudiosimple-lecciones/SKILL.md` (Habilidad Normativa):**
   - Se añadió en la sección de *Alcance Universal* el requisito de 6 lecciones completas por OA.

3. **`.agents/skills/estudiosimple-lecciones/rules/reglas_universales.md`:**
   - Se añadió la **Sección 6: Parámetro Estándar de Cobertura por Objetivo de Aprendizaje (OA)**, definiendo la progresión canónica en 6 clases:
     - *Clase 1:* Activación previa, concepto fundacional y modelo concreto/pictórico.
     - *Clase 2:* Procedimientos formales, reglas y representaciones simbólicas.
     - *Clase 3:* Casos especiales, estrategias de cálculo mental o atajos cognitivos.
     - *Clase 4:* Algoritmos universales y resolución guiada de problemas.
     - *Clase 5:* Aplicaciones en la vida cotidiana, contextos interdisciplinares o toma de decisiones.
     - *Clase 6:* Síntesis integradora, preparación rigurosa para Exámenes Libres (EELL) del MINEDUC y evaluación psicométrica de cierre.

4. **`.agents/skills/estudiosimple-lecciones/profiles/cursos/perfil_7_basico.md`:**
   - Se actualizó la sección 4 de cobertura de clases, reemplazando la referencia flexible "5 a 6 lecciones" por **"exactamente 6 lecciones completas"** como estándar oficial.

---

## 3. Impacto en el Pipeline y Paquetes de Lecciones

- A partir de este momento, todo nuevo paquete de OA producido o refactorizado debe contener exactamente 6 lecciones completas.
- El paquete de Matemática 7° Básico OA04 (Porcentajes) producido previamente con 5 lecciones podrá recibir la Clase 06 (Evaluación integradora y síntesis tipo EELL) cuando Work y Walter lo indiquen para alinearse al nuevo estándar.
