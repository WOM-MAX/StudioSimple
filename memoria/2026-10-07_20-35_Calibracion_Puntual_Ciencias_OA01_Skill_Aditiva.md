# Bitácora de Calibración: Ciencias Naturales 7° Básico OA 01 y Actualización Aditiva de Skill

**Fecha y Hora:** 2026-10-07 20:35 (Hora local)  
**Objetivo:** Ejecución integral y puntual de la corrección de Ciencias Naturales 7° Básico OA 01 (Sexualidad y Afectividad, 6 Lecciones) y enriquecimiento aditivo de la Skill `estudiosimple-lecciones`.

---

## 1. Acciones Realizadas

### A. Duraciones de las Presentaciones (Audiovisual)
- Se consolidó la especificación de **60 segundos para el Gancho** y **90 segundos para la Explicación** como **duraciones planificadas** fijas de referencia, eliminando el término *"aproximado"* en todas las cabeceras de diapositiva (`duracionSeg segundos`).
- Se incorporó la tolerancia oficial a Google Vids: el procesamiento natural y enriquecimiento de las notas al orador puede extender unos segundos la presentación; ese excedente se acepta plenamente. Queda prohibido imponer cronómetros acústicos, conteos de palabras o reexportaciones como condición de aprobación.
- Se actualizaron `prompt-export.ts`, `lesson-generator.ts` y las reglas universales de la Skill.

### B. Corrección Médica de la Pubertad (Distinción Fisiológica)
- Se erradicó toda afirmación que ubicaba el inicio de la pubertad entre los 10 y 16 años (`ciencias_7b_oa01_clase02.ts`, `clase05.ts`, `clase06.ts`).
- Se establecieron los rangos médicos oficiales con respaldo bibliográfico (Tanner 1962 / MedlinePlus / OMS / SOCHIPE):
  * **Inicio habitual de la pubertad:** 8 a 13 años en niñas (aparición de botón mamario / telarquia) y 9 a 14 años en niños (volumen testicular $\ge 4\text{ ml}$).
  * **Estirón de crecimiento en estatura (Peak Height Velocity):** Se identificó estrictamente como un hito posterior no universal que ocurre en etapas intermedias de la maduración puberal (habitualmente entre los 10 y 14 años en niñas y entre los 12 y 16 años en niños; amplio rango poblacional de 10 a 16 años).

### C. Precisión Curricular y Fuentes Oficiales
- Se sustituyó sistemáticamente cualquier mención a "Santillana" por **Edición SM (Editorial SM / Ministerio de Educación de Chile)**, coincidente con el registro oficial en el portal de Currículum Nacional del MINEDUC para 7° Básico.
- Se mantuvo el modelo pedagógico de cuatro dimensiones (biológica, afectiva, social y ética), explicitando que constituye una **organización didáctica integral** que articula los contenidos curriculares con los valores formativos transversales (respeto mutuo, responsabilidad y consentimiento informado), sin atribuirla falsamente como una lista textual del decreto ministerial.

### D. Reactivos de la Clase 6 (Desclasificación de Oficialidad Falsa)
- Se erradicaron las etiquetas de "Pregunta Oficial", "ítem oficial", "cuadernillo oficial" y "ensayo oficial MINEDUC" en los ejercicios elaborados didácticamente para la sesión.
- Se reemplazaron por las denominaciones rigurosas: **"reactivo de práctica tipo Examen Libre"**, **"formato similar a MINEDUC"** y **"reactivo didáctico de práctica"**.

### E. Blindaje de Prompts de Imagen (IA Limpia de Letras A–D)
- Se corrigieron los prompts de imagen de la Clase 6 (Láminas 2, 8, 11) que solicitaban opciones con letras A, B, C, D o rótulos dibujados por IA.
- Ahora solicitan **paneles, tarjetas o módulos interactivos en blanco** (*clean blank rectangular illuminated panels / interactive blank choice cards*), con espacio negativo real y la restricción terminante `No text drawn by AI`.
- Las letras A-D, enunciados y opciones se integran exclusivamente como capas vectoriales y tipográficas editables en PowerPoint (`vectorialOverlayPptx`) y en la web.

### F. Preservación de Invariantes Aprobados
- 6 lecciones completas por OA.
- 8 etapas duales Mentor/Estudiante por clase.
- Subtítulos de 48 pt y máximo 8 palabras en pantalla.
- Dúo co-protagónico de 13 años presente y visible en el 100% de las 84 escenas.
- 4 alternativas (A, B, C, D) con análisis de distractores en cada reactivo psicométrico.
- Comprobación posterior al video (Paso 6) coincidente exactamente con el caso de la práctica (Lámina 6).
- Ausencia total de cuadernillos anexos de rellenado en el DOCX.

---

## 2. Actualización Aditiva de la Skill (`estudiosimple-lecciones`)
- **`rules/reglas_universales.md`:** Incorporadas reglas sobre duraciones planificadas 60s/90s y tolerancia a Google Vids; diferenciación de fuentes oficiales, modelos didácticos y reactivos creados; prompts limpios con paneles en blanco sin letras A-D; correspondencia isomórfica del Paso 6.
- **`profiles/cursos/perfil_7_basico.md`:** Ratificadas las 6 lecciones por OA, objetivo al inicio de la explicación, subtítulos de 48 pt $\le 8$ palabras y 4 alternativas A-D.
- **`profiles/asignaturas/ciencias_naturales.md`:** Distinción médica entre inicio puberal (Tanner/MedlinePlus: 8-13 niñas, 9-14 niños) y estirón de estatura; incorporación de Edición SM; separación de lenguaje curricular y modelo didáctico.
- **`validators/rubrica_evaluacion_oa.md`:** Incorporados casos de regresión:
  * **REG-016:** Error en rangos de inicio puberal vs estirón de crecimiento.
  * **REG-017:** Atribución indebida de oficialidad a reactivos didácticos creados.
  * **REG-018:** Solicitud de texto o letras A-D en prompts de imagen IA.

---

## 3. Artefactos Generados y Verificados
1. **Plan Maestro DOCX Oficial:**  
   `D:\StudioSimple - Antigravity\LECCIONES\110-7\Ciencias_Naturales\OA01\Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx`  
   - Tamaño: 76.424 bytes (> 0 bytes, nombre único sin sufijos).
   - SHA-256: `89c02f7717bcbf3b856b87094f25d2e41f55bd9484153ac997564bc91a586dda`
2. **Prompts Consolidados para Work (84 láminas):**  
   `D:\StudioSimple - Antigravity\LECCIONES\110-7\Ciencias_Naturales\OA01\Prompts_Work_Ciencias_7B_OA01.txt`  
   - Tamaño: 220.701 bytes.
   - SHA-256: `96397ddddf0121dc074bf81a77feec729a2631e080bf1034cc436e74e38c6730`
3. **Manifiesto Oficial:**  
   `D:\StudioSimple - Antigravity\LECCIONES\110-7\Ciencias_Naturales\OA01\manifest.json`  
   - Estado: `REQUIERE_AJUSTES` (mantenido rigurosamente hasta la próxima auditoría).
4. **Validación Técnica:**  
   - `npm run build --prefix "Web Studio Simple"`: Código de salida 0 (Vite build exitoso en 11.41 s).
