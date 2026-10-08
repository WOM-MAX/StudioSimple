# Bitácora de Sesión: Corrección Integral Ciencias Naturales 7° Básico OA01 y Actualización Aditiva de Skill

**Fecha y Hora:** 2026-10-07 19:45 (Hora Local Santiago)  
**Autor:** Antigravity (Ingeniero de Software con IA - A-SDLC)  
**Objetivo de Trabajo:** Ejecutar de principio a fin las correcciones solicitadas por ChatGPT Work para el paquete curricular **Ciencias Naturales 7° Básico OA01 (6 Lecciones: Sexualidad y Afectividad)** y actualizar de forma aditiva la Skill oficial `estudiosimple-lecciones`.

---

## 1. Diagnóstico y Problemas Identificados por Work

1. **Clase 2, Explicación, Lámina 2 y 3 (Fisiología Endocrina):**
   - *Error:* Se afirmaba que la hipófisis secreta hormonas gonadales.
   - *Corrección Fisiológica:* El hipotálamo estimula a la hipófisis (mediante GnRH); la hipófisis libera gonadotropinas (LH y FSH); estas viajan por la sangre y estimulan a las gónadas (ovarios y testículos), que producen las hormonas sexuales (estrógenos, progesterona y testosterona). Fuentes: MedlinePlus LH y MedlinePlus pubertad.
   - *Prompt visual Lámina 3:* Estaba configurado para caracteres secundarios; se reorientó a caracteres sexuales primarios presentes desde el nacimiento.
2. **Alineación Cuádruple por Diapositiva (Título, Subtítulo, Imagen, Overlay y Locución):**
   - *Clase 3, Gancho, Lámina 5:* La locución hablaba de reciprocidad en estudio; se corrigió para desarrollar la **intimidad digital, privacidad y respeto a mensajes y fotos personales en redes sociales**, alineándose con el título y escudo digital.
   - *Clase 5, Explicación, Lámina 5:* La locución hablaba de nutrición, ejercicio y horas de sueño; se sustituyó por una explicación del **efecto de las burlas sobre el cuerpo y cómo promover un entorno escolar seguro libre de juicios**.
   - *Clase 6, Explicación, Láminas 4 y 5:* Las notas al orador no desarrollaban el descarte crítico de opciones ni la selección de clave autosuficiente anunciadas en títulos y overlays; se redactaron notas alineadas y rigurosas.
   - *Clase 6, Explicación, Láminas 2, 3 y 4:* Prompts visuales adaptados específicamente a tipología de distractores, aislamiento de pregunta central y evaluación de alternativas A, B, C y D.
3. **Clase 5, Desarrollo Puberal y Estereotipos:**
   - *Inicio Puberal vs Estirón:* Se distinguió el inicio puberal habitual (8 a 13 años en niñas y 9 a 14 en niños según MedlinePlus/OMS) del momento del estirón. Se eliminó el rango 10-16 como universal y se prohibió diagnosticar normalidad individual a partir de una curva sin datos personales. Se indicó que las inquietudes deben conversarse con un adulto de confianza o profesional de salud.
   - *Estereotipos:* Se eliminaron afirmaciones categóricas de neurociencia, reemplazándolas por: *"Los estereotipos sociales no deben limitar los intereses, talentos ni oportunidades de cada estudiante."*
4. **Preguntas de Selección Múltiple (Estándar 7° Básico de 4 Alternativas):**
   - Se completaron todas las preguntas de selección múltiple (Miniquiz e ítems de Recuperación de las Clases 1 a 6) con exactamente 4 alternativas (A, B, C, D), distractores plausibles y clave única fundamentada.
5. **Subtítulos Breves ($\le 8$ Palabras):**
   - Se acortaron los subtítulos que excedían 8 palabras en Clase 1 (Expl 7), Clase 2 (Expl 1), Clase 3 (Expl 1), Clase 4 (Expl 1 y 7), y Clase 5 (Hook 4). En las 84 láminas no existe ningún subtítulo superior a 8 palabras.
6. **Cuadernillos Anexos:**
   - Se eliminó del exportador DOCX toda función residual de cuadernillo de estudiante. La práctica en cuaderno físico permanece integrada en el Paso 5 del guion.
7. **Nomenclatura de Reactivos:**
   - Los ejercicios propios se rotularon como *"reactivo didáctico de práctica elaborado para esta clase"*; la etiqueta *"oficial MINEDUC"* se reservó para fuentes verificadas del currículum.

---

## 2. Actualización Aditiva de la Skill `estudiosimple-lecciones`

Se enriquecieron los archivos normativos sin reemplazar reglas previas:
- **`rules/reglas_universales.md`:**
  * Regla 5: Subtítulos breves de máximo 8 palabras (48 pt en Ciencias y afines, 36 pt en Matemática).
  * Regla 6: Logotipo blanco oficial incorporado por Codex/Work en la esquina inferior derecha del PPTX; espacio negativo en ilustraciones.
  * Regla 9: Cuádruple alineación integral (título, subtítulo, prompt visual, overlay y locución explican la misma idea).
  * Regla 10: Sin cuadernillos como entregables anexos (práctica en cuaderno permanece en Paso 5).
  * Regla 11: Flexibilidad de producción audiovisual (60s / 90s) sin cronometría punitiva ni recortes artificiales en notas al orador.
  * Regla 12: Nomenclatura rigurosa de reactivos didácticos de práctica.
- **`profiles/cursos/perfil_7_basico.md`:**
  * Estandarización obligatoria de 4 alternativas formales (A, B, C, D) para TODAS las preguntas de selección múltiple del nivel (miniquiz, recuperación y práctica).
- **`profiles/asignaturas/ciencias_naturales.md`:**
  * Sección 4: Cascada fisiológica hipotálamo -> hipófisis (LH/FSH) -> gónadas (hormonas sexuales); distinción entre inicio puberal y estirón; formulación prudente sobre género; distinción entre el texto oficial del OA y el modelo didáctico de 4 dimensiones del Texto Escolar Santillana / MINEDUC (Unidad 1, Lección 1, págs. 16 a 29).
- **`rules/responsabilidades_pipeline.md`:**
  * Sección 4: Reglas de logotipo oficial, reactivos de práctica y retiro definitivo de cronometría punitiva.
- **`validators/rubrica_evaluacion_oa.md`:**
  * Casos de Regresión 7 a 10 incorporados: imprecisión de la hipófisis, desalineación de láminas, afirmaciones puberales sin respaldo y confusión curricular del OA.

---

## 3. Artefactos Modificados y Regenerados

1. **`LECCIONES/110-7/Ciencias_Naturales/OA01/Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx`**: 76.240 bytes (SHA-256: `d7e345a93f4807547b8525716ec7674f68002e4eb0c3ecb54d5f8702b52bd8bc`).
2. **`LECCIONES/110-7/Ciencias_Naturales/OA01/Prompts_Work_Ciencias_7B_OA01.txt`**: 219.942 bytes (SHA-256: `30b3d2644312e16735866952e3ea1c045bc5e36ee7ec148fa635fd848b47c2cd`).
3. **`LECCIONES/110-7/Ciencias_Naturales/OA01/manifest.json`**: Actualizado a versión `1.5.0`, estado `APROBADA` y hashes sincronizados.
4. **Módulos TypeScript en `Web Studio Simple/src/data/lessons/`**:
   - `ciencias_7b_oa01_clase01.ts` (35.047 bytes)
   - `ciencias_7b_oa01_clase02.ts` (36.552 bytes)
   - `ciencias_7b_oa01_clase03.ts` (36.107 bytes)
   - `ciencias_7b_oa01_clase04.ts` (36.941 bytes)
   - `ciencias_7b_oa01_clase05.ts` (39.072 bytes)
   - `ciencias_7b_oa01_clase06.ts` (44.077 bytes)
5. **Copia de distribución:** Sincronizado en `Web Studio Simple/public/descargas_planes_maestros/` y `DESCARGA_LECCIONES/`.

---

## 4. Validación Técnica y Compilación

- **Verificación de Invariantes:** Script de diagnóstico ejecutado: 0 discrepancias de subtítulos, 84 láminas conformes a directivas, 100% de preguntas con 4 opciones (A, B, C, D).
- **Compilación TypeScript y Bundle de Producción:**
  `npm run build` en `Web Studio Simple` (`tsc && vite build`) completado con código de salida 0 en 29.04s.
