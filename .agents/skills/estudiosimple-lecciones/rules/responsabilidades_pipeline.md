# Delimitación de Responsabilidades Técnicas en el Pipeline de Lecciones

Este documento formaliza las fronteras operativas entre las tres entidades técnicas responsables de la producción curricular en EstudioSimple.

---

## 1. Antigravity (Ingeniería de Software y Diseño Curricular)

### Alcance Exclusivo y Responsabilidades:
1. Diseñar, redactar y estructurar la lección completa de cada Objetivo de Aprendizaje (OA) en el archivo maestro DOCX oficial en `LECCIONES/110-<curso>/<Asignatura>/<OA>/`.
2. Generar y mantener el archivo TXT de prompts limpios para Work (`Prompts_Work_<Asignatura>_<Curso>_<OA>.txt`).
3. Construir y mantener la implementación en TypeScript en `Web Studio Simple/src/data/lessons/`, garantizando que refleje exactamente el contenido aprobado del DOCX.
4. Generar y certificar el archivo `manifest.json` de cada OA con sus hashes SHA256 y metadatos curriculares.
5. Ejecutar la rúbrica de validación de 12 pasos y registrar brechas o cumplimientos.

### Prohibiciones y Exclusiones Terminantes:
- **PROHIBIDO generar o modificar archivos de presentación PPTX.** La generación de presentaciones PowerPoint es competencia exclusiva de ChatGPT Work.
- **PROHIBIDO realizar conteo de palabras o certificar duración acústica de videos.** Antigravity no calcula tiempos en segundos por diapositiva ni impone restricciones artificiales de extensión que mutilen la explicación pedagógica.

---

## 2. Codex / ChatGPT Work (Maquetación y Automatización PPTX)

### Alcance Exclusivo y Responsabilidades:
1. Consumir el paquete oficial de `LECCIONES/` compuesto por el DOCX oficial, los prompts limpios y el manifiesto.
2. Auditar la consistencia visual y la jerarquía de las láminas.
3. Generar de forma autónoma las presentaciones de PowerPoint (`.pptx`) en su entorno de trabajo utilizando scripts de Python (`python-pptx`).
4. Aplicar los estándares visuales de diseño: tipografía de alto contraste, colores institucionales planos, ausencia de sombras duras y el logotipo blanco de EstudioSimple en la esquina inferior derecha.

### Prohibiciones:
- No altera objetivos, explicaciones conceptuales, ejercicios ni alternativas de evaluación aprobadas en el DOCX oficial. Si detecta una brecha de contenido, la reporta para que Antigravity la resuelva en la fuente única.

---

## 3. Producción Audiovisual (Google Vids)

### Alcance Exclusivo y Responsabilidades:
1. Realizar la grabación de locución humana o síntesis vocal con inteligencia artificial a partir de las notas al orador contenidas en el DOCX y diapositivas.
2. Calibrar la velocidad de lectura, pausas pedagógicas y entonación.
3. Sincronizar acústicamente el audio con las transiciones de las láminas.
4. Generar subtítulos sincronizados y renderizar el video final de la lección.

### Invariante de Pipeline y Regla de Producción Audiovisual:
- **Presupuesto Temporal Asignado:** El video gancho tiene 60 segundos asignados en la dosificación teórica (7 diapositivas) y la explicación 90 segundos asignados (7 diapositivas).
- **Flexibilidad Acústica Natural en Google Vids:** En la producción real con Google Vids, la locución y el ritmo de narración pueden extenderlos unos segundos de forma natural. Queda retirado terminantemente todo protocolo que exija medir con cronómetro, reexportar sucesivamente por diferencias de segundos o mutilar las notas al orador mediante límites rígidos de conteo de palabras.
- **Tratamiento de Ajustes Menores de Distribución:** Discrepancias menores de un segundo en la suma teórica (ej: 89s en lugar de 90s) se clasifican como ajustes menores de distribución: se corrigen en la misma pasada ajustando la lámina correspondiente sin bloquear el OA ni generar otra ronda completa de revisión.
- La duración acústica real del video solo se mide y certifica empíricamente dentro de Google Vids. Ni Antigravity ni Codex imponen cronómetros teóricos punitivos previos.

---

## 4. Reglas de Producción de Activos y Nomenclatura

- **Regla del Logotipo Oficial:** Codex/Work incorpora el logotipo blanco oficial de EstudioSimple en la esquina inferior derecha del PPTX, al tamaño del video de referencia. Queda prohibido solicitar a una IA generativa que dibuje el logo dentro de los mapas de bits de las ilustraciones; se debe reservar el espacio negativo correspondiente en la diapositiva.
- **Nomenclatura Rigurosa de Reactivos:** Todo ejercicio diseñado originalmente para la clase debe titularse "reactivo didáctico de práctica elaborado para esta clase". La etiqueta "oficial MINEDUC" o "reactivo oficial de Examen Libre" se reserva exclusivamente para aquellos ítems cuya fuente original en el temario o ensayo oficial haya sido contrastada y citada con precisión.
- **Sin Cuadernillos como Entregables:** Las actividades para el cuaderno se integran en el Paso 5 del guion; no se generan secciones anexas de cuadernillos dentro del DOCX oficial.

