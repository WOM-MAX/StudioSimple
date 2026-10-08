# Bitácora de Saneamiento: Ajustes Puntuales en Skill de Ciencias y Plan Maestro OA01

**Fecha:** 2026-10-07 21:15  
**Asignatura / Paquete:** Ciencias Naturales 7° Básico - 110-7-CIE-OA01  
**Estado del Manifiesto:** `REQUIERE_AJUSTES` (a la espera de revisión/aprobación final de Work/Codex)  
**Código de Salida:** `0` (build exitoso y sin errores)

---

## 1. Ajustes en la Skill Disciplinar (`expert_ciencias_naturales/SKILL.md`)

1. **Armonización de Sexualidad y Sección "Modelo Didáctico de las Cuatro Dimensiones":**
   - Se distinguió con rigor epistemológico lo que declara el OA oficial de las Bases Curriculares (aspectos biológicos, afectivos y sociales, cambios físicos puberales, relación con pares y familia, identidad, responsabilidades individuales y respeto mutuo) del **organizador didáctico de cuatro dimensiones** (biológica, afectiva, social y ética).
   - Se descartó la lista contradictoria *"biológicas, psicológicas, afectivas y sociales"* como taxonomía curricular: en el currículum chileno los procesos cognitivos y psicológicos quedan integrados en la dimensión afectiva, en la identidad y en la dimensión social, mientras la dimensión ética operacionaliza la responsabilidad y el respeto mutuo.
   - Se renombró la sección a `### 4. Modelo Didáctico de las Cuatro Dimensiones` y se reiteró no atribuir dicha clasificación a un decreto oficial del MINEDUC.

2. **Actualización de Ubicación del Texto Escolar:**
   - La antigua referencia a `MATERIALES/110-7` fue formalmente actualizada a su ubicación vigente en el proyecto: `INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/Ciencias Naturales.pdf`.

3. **Referencias Concretas para Rangos de Edad (Inicio Puberal vs. Estirón):**
   - **Inicio habitual de la pubertad:**
     * Niñas: 8 a 13 años (Tanner Estadio 2 / telarquia).
     * Niños: 9 a 14 años (Tanner Estadio 2 / aumento testicular $\ge 4\text{ ml}$).
     * *Citas concretas:* J.M. Tanner (1962), *Growth at Adolescence*; MedlinePlus (Biblioteca Nacional de Medicina de EE. UU.); Guía Clínica de Salud del Adolescente (MINEDUC / SOCHIPE).
   - **Estirón de crecimiento en estatura (Peak Height Velocity):**
     * Ocurre en etapas intermedias/posteriores (habitualmente 10 a 14 años en niñas y 12 a 16 años en niños).
     * El rango **10 a 16 años** se consigna estrictamente como ventana estadística amplia del *estirón de estatura*, quedando terminantemente prohibido presentarlo como edad de inicio puberal.

4. **Delimitación de la Skill Universal:**
   - La regla sobre identificar preguntas elaboradas como "preguntas" o "reactivos de práctica" (reservando "oficial" únicamente para preguntas originales con cita y fuente verificada) se mantiene exclusivamente en la Skill Universal (`.agents/skills/estudiosimple-lecciones/rules/reglas_universales.md`, Regla 12), ya que aplica de forma transversal a todas las asignaturas.

---

## 2. Aplicación Rigurosa en el Paquete Curricular OA01

1. **Organizador Didáctico en Plan OA01:**
   - Se reescribieron las formulaciones para presentar las 4 dimensiones como un organizador didáctico de la unidad que estructura los aspectos del OA 1 y los valores de respeto mutuo, sin atribuirlas a un decreto de las Bases Curriculares.
2. **Esquema Endocrino Unificado:**
   - Secuencia fisiológica canónica estricta:
     $$\text{Hipotálamo (GnRH)} \longrightarrow \text{Hipófisis anterior (LH y FSH)} \longrightarrow \text{Gónadas (hormonas sexuales)} \longrightarrow \text{Cambios puberales}$$
   - Se erradicó cualquier esquema que atribuya a la hipófisis la síntesis de hormonas gonadales.
3. **Prompt Visual de Clase 5 (Lámina 3):**
   - Aclara explícitamente: `representing the height growth spurt window (between ages 10 and 16, distinct from earlier pubertal onset)`. Ambos datos quedan rigurosamente separados.
4. **Preservación Didáctica Total:**
   - Se conservaron intactas las 6 lecciones, sus objetivos, su secuencia didáctica y las preguntas de comprobación que coinciden con los dos primeros ejercicios de práctica.

---

## 3. Entregables e Integridad

- **DOCX Canónico Oficial:** `LECCIONES/110-7/Ciencias_Naturales/OA01/Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx` (76.451 bytes)
- **Prompts TXT para Work:** `LECCIONES/110-7/Ciencias_Naturales/OA01/Prompts_Work_Ciencias_7B_OA01.txt` (220.989 bytes, 84 láminas)
- **Manifiesto:** `LECCIONES/110-7/Ciencias_Naturales/OA01/manifest.json` (`estado: "REQUIERE_AJUSTES"`)
- **Compilación TypeScript / Vite:** Exit code `0` en `npm run build`.
