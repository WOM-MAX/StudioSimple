# Bitácora de Sesión: Calibración Disciplinar de Ciencias Naturales y Skill de Coherencia

- **Fecha y Hora:** 2026-10-07 21:35 (UTC-3)
- **Ámbitos Afectados:**
  - `.agents/skills/expert_ciencias_naturales/SKILL.md` (Skill Disciplinar de Ciencias Naturales)
  - `.agents/skills/auditor_coherencia_estudiosimple/SKILL.md` (Skill de Coherencia Pedagógica y Curricular)
- **Responsable:** Antigravity (Modo Ejecución Directa Autónoma)

---

## 1. Resumen Ejecutivo de la Tarea

En esta sesión se realizaron ajustes disciplinarios y metodológicos de alta precisión sobre las Skills normativas de EstudioSimple, garantizando la delimitación rigurosa entre cursos (7.º vs. 8.º Básico), la honestidad curricular según las Bases Curriculares del MINEDUC, la exactitud fisiológica/médica con fuentes rastreables y la coherencia del protocolo de auditoría automatizada.

---

## 2. Modificaciones en la Skill de Ciencias Naturales (`expert_ciencias_naturales`)

1. **Separación Estricta de Alcance (7.º vs. 8.º Básico):**
   - Se delimitó formalmente el alcance de 7.º Básico (`110-7`) y 8.º Básico (`110-8`), asignando a cada nivel sus propios Objetivos de Aprendizaje (OAs) y rutas de textos en `INSUMOS/` (7.º Básico: `INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/Ciencias Naturales.pdf` Edición SM; 8.º Básico: `INSUMOS/LIBROS DIGITALES Y GUÍAS/110-8/CNASM26E8B.pdf` Edición SM).
   - Se estableció la **Regla de No Extrapolación**: queda prohibido extender a 8.º básico contenidos, modelos de dimensiones o datos fisiológicos verificados únicamente para la unidad de pubertad y sexualidad de 7.º básico.

2. **Distinción Curricular entre CN07 OA 01 y CN07 OA 02:**
   - **CN07 OA 01:** Sexualidad humana integral (dimensiones biológica, afectiva, social y ética), cambios puberales, eje endocrino, autocuidado, identidad y respeto mutuo.
   - **CN07 OA 02:** Fisiología reproductiva y formación de un nuevo individuo (gametogénesis, fecundación, ciclo ovárico/menstrual, métodos anticonceptivos y prevención de ITS).
   - Prohibición expresa de fusionar o confundir ambos objetivos.

3. **Fisiología Médica: Inicio Puberal vs. Estirón sin Rangos Rígidos:**
   - Se mantuvo la diferenciación entre **inicio puberal habitual** (aparición de caracteres primarios/secundarios: botón mamario en niñas a los 8–13 años; aumento del volumen testicular $\ge 4\text{ ml}$ en niños a los 9–14 años) y el **estirón de crecimiento en estatura** (*Peak Height Velocity*, evento posterior hacia los 11.5–12 años en niñas y 13.5–14 años en niños).
   - **Eliminación del rango 10–16 como límite universal dogmático:** Las edades se presentan exclusivamente como promedios estadísticos y referencias poblacionales, explicitando la amplia variabilidad biológica individual normal.

4. **Referencias Bibliográficas Rastreables:**
   - Inclusión de citas formales: Decreto Supremo 614/2013 (MINEDUC), Textos del Estudiante 7° y 8° SM, J. M. Tanner (1962), MedlinePlus (NIH), SOCHIPE / MINSAL y Hall & Guyton (*Tratado de Fisiología Médica*, 14.ª ed., caps. 81 y 82).

---

## 3. Modificaciones en la Skill de Coherencia (`auditor_coherencia_estudiosimple`)

1. **Jerarquía Normativa de Fuentes:**
   - Nivel 1: Currículum Nacional y Textos Oficiales (validador supremo de alineación y cobertura).
   - Nivel 2: Plan Maestro DOCX aprobado (fuente de verdad pedagógica de cada lección).
   - Nivel 3: Módulos TypeScript y Prompts limpios (artefactos de implementación que deben reflejar el DOCX).

2. **Exclusión de Métricas de Tiempo y Eliminación de `ERR-TIME-003`:**
   - El conteo de palabras y la duración de videos quedan fuera de la auditoría de Antigravity (se verifican en Google Vids durante la síntesis y renderizado audiovisual). Se eliminó definitivamente el código `ERR-TIME-003`.

3. **Protagonistas Universales en el 100 % de las Ilustraciones (`UNI-003`):**
   - Presencia de ambos co-protagonistas en el 100 % de las ilustraciones de arte como regla universal.
   - La edad (ej. 13 años), rasgos específicos y estilo visual (ej. Anime Moderno) se reservan para el perfil de cada curso.

4. **Corrección Tipográfica de Subtítulos (`UNI-004`):**
   - Título: 64 pt.
   - Subtítulo: **36 pt en Matemática**, y **48 pt en Ciencias Naturales, Lengua y Literatura, Historia/Geografía e Inglés**.

5. **Parámetro Estándar de Seis Lecciones por OA (`UNI-001`):**
   - Obligatoriedad de exactamente 6 lecciones completas por OA (Clases 1 a 6) para cobertura exhaustiva de los EELL.

6. **Secuencia de Pasos del Manual Maestro (`UNI-006`):**
   - Corrección de la lista: Fase Pre (Preparación adulto) seguida de los 8 pasos pedagógicos (Inicio, Gancho, Recorrido, Explicativo, Práctica, Resumen, Miniquiz y Cierre), eliminando la confusión de enumerar 9 por 8 y sin imponer progresiones fijas a todos los OA.

7. **Unificación de Controles de Correspondencia e Isomorfismo (`UNI-005`):**
   - Fusión de controles: modelamiento del video = ejercicio 1 de la práctica; revisión posterior al video = reutilización exacta de los ejercicios de la lección (Casos 1 y 2).

8. **Estándares de Calidad vs. Recomendaciones No Bloqueantes:**
   - 4 alternativas (A, B, C, D) en 7.º Básico (`7B-002`) como estándar psicométrico de EstudioSimple.
   - Balance y rotación de claves (`7B-003`) clasificado como recomendación de diseño psicométrico **no bloqueante** (prioridad `Media`).

9. **Acotaciones Curriculares Específicas por OA:**
   - `OA-7B-CIE01`: Actualizado a **Unidad 4** (CN07 OA 01: Sexualidad y autocuidado).
   - `OA-7B-HIS02`: Lecciones 5 y 6 acotadas a las transformaciones socioeconómicas del Neolítico y primeros asentamientos (Uruk) según el plan aprobado de HI07 OA 02, sin atribuirle contenidos de Estado centralizado, burocracia o escritura formal propios de HI07 OA 03.

10. **Catálogo por Alcance y Registro Inmutable:**
    - Estructura clasificada en `universal`, `course`, `subject` y `oa`.
    - `regression_cases.json` ratificado como **registro inmutable append-only**.

---

## 4. Estado de Validación Técnica

- Verificación de compilación TypeScript (`tsc --noEmit` y `npm run build` en Web Studio Simple).
- Verificación de integridad de archivos sin errores sintácticos.
- Commit y push completados hacia el repositorio remoto `origin/main`.
