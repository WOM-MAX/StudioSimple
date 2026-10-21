# Registro de Bitácora: Corrección Estructural Compartida para Todas las Lecciones y Asignaturas

**Fecha y Hora:** 2026-10-19 19:15 [America/Santiago]  
**Estado:** \`EN_REVISION\` (Aprobación exclusiva de Walter tras análisis con ChatGPT Work)  
**Autor:** Antigravity (AI Software Engineer A-SDLC)  

---

## 1. Contexto y Diagnóstico
A partir de la revisión técnica del video grabado por Walter (\`Grabación 2026-10-19 182830.mp4\`) sobre **Ciencias Naturales 7° Básico OA01 Clase 02**, se identificaron cinco inconsistencias sistémicas compartidas entre componentes de la App y módulos de datos curriculares:
1. **Conteo asimétrico de preguntas ("Pregunta 2 de 1" vs "2 de 2"):** \`AdultLessonView.tsx\` forzaba conteos fijos de 2 preguntas (\`postIndex === 0 ? updateSession({ postIndex: 1 }) : setStage(...)\`), mientras la lección solo definía 1 pregunta de comprobación. El estudiante mostraba \`Pregunta 2 de 1\` y el adulto mostraba \`Pregunta 2 de 2\`.
2. **Contaminación de recursos literarios en Ciencias Naturales:** Se mostraba el botón *"Consultar texto de lectura"* que abría un relato lunar de ciencia ficción (*Jimmy y Robutt*) debido a un fallback predeterminado (\`DEFAULT_PARAGRAPHS\`) en \`StudentReadingResourceCard.tsx\`. Ciencias Naturales utiliza organizadores y casos científicos contextuales, no relatos literarios.
3. **Ideas importantes desincronizadas:** Se anunciaba *"Tres ideas importantes"* pero se mostraban dos, requiriendo un botón intermedio para revelar una idea inexistente.
4. **Títulos temáticos genéricos ("Una situación"):** Las clases 02 a 06 de Ciencias, Historia e Inglés presentaban el texto de propósito de diapositiva (*"Una situación"*) en lugar de los títulos curriculares oficiales de Work.
5. **Continuidad de lecciones incompleta:** \`nextLessonTitle\` vacío generaba tarjetas con *"Próxima clase: "* en blanco, y la clase 6 no anunciaba formalmente el cierre del Objetivo de Aprendizaje.

---

## 2. Modificaciones Implementadas (Arquitectura Compartida)
- **Desacoplamiento dinámico de índices y totales:** \`StudentLessonView.tsx\` y \`AdultLessonView.tsx\` ahora leen \`preQuestions?.length || 1\` y \`postQuestions?.length || 1\`. Si hay 1 pregunta, ambas vistas muestran \`Pregunta 1 de 1\` y avanzan al resumen en un clic.
- **Aislamiento estructural de lectura y regla de Ciencias/Matemática:** Se eliminó \`DEFAULT_PARAGRAPHS\` de \`StudentReadingResourceCard.tsx\`. Se formalizó que Ciencias Naturales y Matemática no usan texto de lectura (\`isCienciasOrMatematica = true\`). El botón solo se muestra si la asignatura admite lectura y la lección declara párrafos legítimos en sus datos. El texto de *Jimmy y Robutt* fue confinado a \`lengua_7b_oa03_clase01.ts\` (\`interactive.paragraphs\`).
- **Dinamización honesta de ideas importantes:** Se adaptó el encabezado a \`\${totalIdeas} ideas importantes\` y los botones avanzan directamente a miniquiz al llegar a la última idea real disponible.
- **Restauración de títulos oficiales y continuidad:** Mediante \`scripts/restore_titles_and_continuity.ts\`, se restauraron los títulos H1 desde las fuentes Markdown de Work en 23 clases y se vinculó la cadena de continuidad en \`nextLessonTitle\`.
- **Script de auditoría permanente:** Se creó \`scripts/audit_structural_rules.ts\` para auditar las 36 lecciones en matriz (\`docs/auditorias/MATRIZ_AUDITORIA_ESTRUCTURAL_36_LECCIONES.json\`).

---

## 3. Verificación y Resultados
- **Build TypeScript/Vite:** \`npm run build\` en \`Web Studio Simple\` finalizó con **código de salida 0**.
- **Comprobación en Navegador Real (Edge CDP - Puerto 9223):**
  - Ciencias 7B OA01 Clase 02: **PASS** (4 capturas, título oficial, sin botón de lectura, 2 ideas reales y avance honesto).
  - Lengua 7B OA03 Clase 01: **PASS** (1 captura, botón de lectura activo legítimamente).
  - Matemática 7B OA01 Clase 01: **PASS** (1 captura, 100% blindada e intacta).
- **Cobertura 36 clases:** Reglas 1, 2, 4 y 5 al 100% PASS. Regla 3 adaptada dinámicamente en UI y clasificada como \`PENDIENTE_CONTENIDO_WORK\` para redacción de 3ra idea por Work.

---

## 4. Entregables Generados (SHA-256)
Ubicación: \`EstudioSimple_Repositorio_Curricular/ARREGLOS_SINCRONIZACION_ANTIGRAVITY/INFORMES_Y_EVIDENCIAS/\`
- \`INFORME_CORRECCION_ESTRUCTURAL_ASIGNATURAS_ANTIGRAVITY_2026-10-19_19-15_CL.md\` (SHA-256: \`86a7513d31c668d045ad329dbd9fb75807c48671205cf73b0ff75ee149a692d8\`)
- \`EVIDENCIA_CORRECCION_ESTRUCTURAL_ASIGNATURAS_ANTIGRAVITY_2026-10-19_19-15_CL.json\`
- \`PARCHE_Y_CAPTURAS_CORRECCION_ESTRUCTURAL_ASIGNATURAS_2026-10-19_19-15_CL.zip\` (SHA-256: \`0acff1597b65f85ce09900602ce52df00c43e1e3ea318b6360dc2a6b1a2630ec\`, 893.6 KB)
