# Rúbrica de Evaluación y Auditoría de Lecciones (12 Pasos Oficiales)

Este protocolo de verificación debe ser ejecutado por Antigravity para auditar de forma exhaustiva cada paquete de lección antes de certificarlo o entregarlo a Walter.

---

## 1. Escala de Calificación de Tres Estados

Cada criterio debe calificarse de forma objetiva e inequívoca bajo una de tres categorías:

- `cumple`: El criterio fue verificado empíricamente contra la fuente oficial y satisface la totalidad del estándar.
- `brecha`: Se identificó una discrepancia, omisión o contradicción que debe ser corregida obligatoriamente.
- `no evaluable`: La fuente de contraste externa (ej: `INSUMOS/`) no está disponible físicamente en el entorno local. **Queda terminantemente prohibido inventar información para transformar un 'no evaluable' en 'cumple'**.

---

## 2. Los 12 Pasos Obligatorios de la Rúbrica

| Paso | Criterio de Verificación | Descripción del Estándar | Estados Posibles |
| :---: | :--- | :--- | :---: |
| **1** | **Identificación y Fuentes Oficiales** | Curso (`110-<curso>`), asignatura, OA y temario oficial de EELL identificados y citados con número de página y sección. | `cumple` / `brecha` |
| **2** | **Secuencia Conceptual de Lección Completa** | La lección completa progresa de forma lógica desde la activación previa hasta la formalización, sin saltos conceptuales bruscos. | `cumple` / `brecha` |
| **3** | **Alineación Objetivo-Explicación-Evaluación** | Existe coherencia estricta entre el OA declarado, los ejemplos modelados y los reactivos de evaluación final. | `cumple` / `brecha` |
| **4** | **Corrección y Pertinencia de Ejemplos** | Los ejercicios y ejemplos están resueltos correctamente (cálculos, definiciones, hechos) y son pertinentes para la edad y nivel cognitivo del curso. | `cumple` / `brecha` |
| **5** | **Articulación con Práctica de la Plataforma** | La lección prepara de forma directa y evidente al estudiante para abordar con éxito la práctica interactiva posterior de la app. | `cumple` / `brecha` |
| **6** | **Cierre sin Desafío Redundante en Video** | El video explicativo / diapositivas no incorporan un desafío adicional o tarea al final si a continuación viene la práctica en la plataforma. | `cumple` / `brecha` |
| **7** | **Identidad de Ejercicios en Revisión** | La revisión posterior al video utiliza **exactamente los mismos ejercicios** de la lección completa (conservando números, alternativas y respuestas; prohibido sustituir o inventar). | `cumple` / `brecha` |
| **8** | **Registro Riguroso de Calificaciones** | Cada uno de los puntos evaluados queda documentado con su estado (`cumple`, `brecha` o `no evaluable`) y evidencia verificable. | `cumple` / `brecha` |
| **9** | **Ubicación Canónica de Entrega** | Todos los archivos del paquete residen estrictamente en `LECCIONES/110-<curso>/<Asignatura>/<OA>/` sin copias sueltas en la raíz. | `cumple` / `brecha` |
| **10** | **Entrega de DOCX y Prompts para Walter** | Se entregan el DOCX oficial y el TXT de prompts limpios listos para ser transmitidos a Codex/Work. | `cumple` / `brecha` |
| **11** | **Resolución Atómica de Brechas (Sin Copias)** | Si Codex/Work reporta brechas, las correcciones se aplican sobre los mismos archivos en la misma ruta canónica (cero duplicados `_v2`). | `cumple` / `brecha` |
| **12** | **Certificación Formal de Estado** | El `manifest.json` solo se marca como `APROBADA` tras haber resuelto el 100% de las brechas y contar con la confirmación de Walter. | `cumple` / `brecha` |

---

## 3. Modelo de Reporte de Auditoría

Al auditar una lección, Antigravity debe emitir un informe estructurado:

```markdown
### Reporte de Auditoría Curricular: [Identificador Paquete]
- Curso: [110-x] | Asignatura: [Asignatura] | OA: [OAx]
- DOCX Oficial: [Nombre del archivo] (Hash SHA256)
- Estado Actual: [EN_REVISION | REQUIERE_AJUSTES | APROBADA]

#### Resultados de la Rúbrica de 12 Pasos:
1. Identificación y Fuentes Oficiales: [cumple / brecha] (Evidencia)
2. Secuencia Conceptual: [cumple / brecha]
3. Alineación Objetivo-Evaluación: [cumple / brecha]
4. Corrección de Ejemplos: [cumple / brecha]
5. Articulación con Práctica: [cumple / brecha]
6. Cierre sin Desafío Redundante: [cumple / brecha]
7. Identidad de Ejercicios: [cumple / brecha]
8. Registro de Calificaciones: [cumple]
9. Ubicación Canónica: [cumple / brecha]
10. Entrega de Paquete: [cumple / brecha]
11. Resolución de Brechas: [cumple / brecha]
12. Certificación: [cumple / brecha]

#### Conclusión:
[Dictamen final y acciones requeridas]
```

---

## 4. Banco de Casos de Regresión para Detección por el Auditor

Para prevenir la reaparición de inconsistencias detectadas en revisiones anteriores, el auditor debe someter cada plan de lección a las siguientes verificaciones automatizadas o de inspección visual:

### Caso de Regresión 1: Objetivo Ausente o Parcial en Lámina 1 de Explicación
- **Síntoma Detectado:** La Lámina 1 del bloque explicativo omite el objetivo o presenta un rótulo genérico/parcial que no abarca el aprendizaje integral de la lección (ej: titular solo "Definición" en clases de síntesis o problemas cotidianos).
- **Criterio de Validación:** La Lámina 1 debe declarar explícitamente el Objetivo de Aprendizaje visible para el estudiante, resumiendo la meta completa de la sesión.
- **Acción del Auditor:** Si falta el objetivo explícito en Lámina 1, marcar `brecha` en Paso 3.

### Caso de Regresión 2: Notación Porcentual Informal o Inválida ("0,p")
- **Síntoma Detectado:** Enunciados o láminas de matemática que definen la conversión decimal universal como `0,p` o `Total x 0,p`.
- **Criterio de Validación:** La regla general universal es estrictamente $p\% = p \div 100$ o $\frac{p}{100}$. El atajo `0,p` falla en porcentajes de un dígito (5% es 0,05, no 0,5) y en porcentajes decimales (12,5% es 0,125).
- **Acción del Auditor:** En planes de Matemática, si se detecta `0,p` como regla universal, marcar `brecha` en Paso 4.

### Caso de Regresión 3: Contexto Tributario Inexacto en Ejemplos de IVA
- **Síntoma Detectado:** Afirmar que el IVA (19%) "se aplica a todas las compras, boletas o productos en Chile" sin distinguir exenciones.
- **Criterio de Validación:** La legislación tributaria chilena (D.L. 825 / SII) grava las ventas y servicios afectos, contemplando expresamente operaciones exentas. Los ejemplos didácticos deben precisar que se trata de "operaciones comerciales afectas a IVA".
- **Acción del Auditor:** En planes de Matemática, marcar `brecha` en Paso 4 si se generaliza falsamente el cobro de IVA a la totalidad de las compras.

### Caso de Regresión 4: Discrepancia entre el Modelo Visual y el Texto Explicativo
- **Síntoma Detectado:** Textos o notas al orador que describen conceptos no representados en el modelo pictórico (ej: llamar "40% de energía capturada" cuando la cuadrícula ilustrada muestra "40% de celdas activas").
- **Criterio de Validación:** Isomorfismo estricto entre lo que muestra la ilustración (número de celdas, cuadrículas, objetos contables) y la locución/overlay de la lámina.
- **Acción del Auditor:** Si hay disonancia cognitiva entre la imagen y el texto, marcar `brecha` en Paso 4.

### Caso de Regresión 5: Generación de Cuadernillos Anexos No Requeridos en el Plan Maestro
- **Síntoma Detectado:** Exportar dentro del Plan Maestro DOCX secciones completas de cuadernillo de estudiante con encabezados escolares, renglones para rellenar o rectas numéricas genéricas descontextualizadas.
- **Criterio de Validación:** El Plan Maestro oficial comprende exclusivamente la Ficha Curricular, los Guiones Audiovisuales Bimodales y los 8 Pasos Pedagógicos para el Mentor. Los cuadernillos y rectas genéricas quedan excluidos del entregable canónico.
- **Acción del Auditor:** Marcar `brecha` en Paso 10 si el DOCX contiene cuadernillos anexos redundantes.

### Caso de Regresión 6: Discrepancia Menor en Suma de Segundos Teóricos
- **Síntoma Detectado:** Una secuencia de explicación suma 89 segundos en vez de 90 segundos teóricos (ej: láminas con 12+13+13+13+13+13+12 = 89s).
- **Criterio de Validación:** El gancho tiene 60s asignados y la explicación 90s asignados.
- **Acción del Auditor:** Tratar la discrepancia de 1s como **ajuste menor de distribución**: sumarlo a la lámina correspondiente (ej: lámina 1 a 13s) y continuar sin bloquear el OA ni detonar otra ronda completa de revisión.

### Caso de Regresión 7: Imprecisión en la Cascada Endocrina (Hipófisis vs Gónadas)
- **Síntoma Detectado:** Afirmar que la hipófisis secreta hormonas gonadales o sexuales.
- **Criterio de Validación:** La cascada fisiológica correcta es: hipotálamo -> hipófisis (secreta gonadotropinas LH y FSH) -> gónadas (estimuladas para producir hormonas sexuales como testosterona, estrógenos y progesterona).
- **Acción del Auditor:** Marcar `brecha` en Paso 4 si se atribuye a la hipófisis la secreción de hormonas gonadales o sexuales.

### Caso de Regresión 8: Desalineación entre Título, Overlay, Imagen y Locución
- **Síntoma Detectado:** La nota al orador o prompt visual desarrolla un tema distinto al anunciado en el título u overlay de la lámina (ej: locución de higiene/nutrición en lámina de acoso y burlas, o locución de reciprocidad en lámina de privacidad digital).
- **Criterio de Validación:** Cuádruple alineación estricta: título, subtítulo, imagen, overlay y locución deben comunicar exactamente la misma idea central.
- **Acción del Auditor:** Marcar `brecha` en Paso 4 si la locución diverge del título u overlay.

### Caso de Regresión 9: Confusión entre Rangos de Inicio Puberal y Estirón de Estatura
- **Síntoma Detectado:** Presentar 10-16 años como un rango universal del estirón, o diagnosticar normalidad/anomalía individual a partir de una curva genérica sin datos antropométricos reales.
- **Criterio de Validación:** Distinguir el inicio habitual de la pubertad (8-13 niñas, 9-14 niños según MedlinePlus/OMS) del momento del estirón. Evitar diagnósticos categóricos y remitir las inquietudes a adultos de confianza o profesionales de salud.
- **Acción del Auditor:** Marcar `brecha` en Paso 4 si se confunden ambos hitos o se dictamina normalidad individual sin datos.

### Caso de Regresión 10: Atribución Confusa del Modelo Pedagógico al Texto Oficial del OA
- **Síntoma Detectado:** Confundir el modelo didáctico de las cuatro dimensiones con la redacción textual del OA ministerial, o citar fuentes escolares sin unidad, edición ni páginas verificadas (o nombrar Santillana cuando la edición oficial de Currículum Nacional es Edición SM).
- **Criterio de Validación:** El OA oficial menciona aspectos biológicos, afectivos y sociales, cambios puberales, relación con pares y familia, identidad, responsabilidad y respeto mutuo. El modelo de cuatro dimensiones debe presentarse explícitamente como una organización didáctica integradora vinculada al Texto del Estudiante Edición SM / MINEDUC Unidad 1 Lección 1 (págs. 16 a 29).
- **Acción del Auditor:** Marcar `brecha` en Paso 1 si no se distingue la redacción oficial del OA de su modelamiento didáctico escolar o si se cita una editorial no verificada.

### Caso de Regresión 11: Inyección de Jerga y Plantillas Matemáticas en Historia (REG-011)
- **Síntoma Detectado:** Textos explicativos, preguntas o notas al orador en lecciones de Historia que incluyen términos heredados de plantillas matemáticas: "idea matemática", "procedimiento formal", "interpretar cada valor", "resultado consistente", o "1. Identificar · 2. Aplicar · 3. Comprobar".
- **Criterio de Validación:** Las clases de Historia y Ciencias Sociales deben utilizar exclusivamente lenguaje y categorías historiográficas: multicausalidad, espacialidad, procesos de larga duración, testimonio arqueológico, cambio y continuidad.
- **Acción del Auditor:** Marcar `brecha` en Paso 4 si se detecta terminología de cálculo o fórmulas matemáticas en asignaturas humanistas.

### Caso de Regresión 12: Focos Curriculares Cruzados en Lecciones de Cierre (REG-012)
- **Síntoma Detectado:** Invertir o cruzar los focos conceptuales de lecciones finales (ej: etiquetar la Lección 5 como "Comercio" en vez de Propiedad y Jerarquías, o la Lección 6 como "Agricultura" en vez de Excedentes, Comercio y Ciudades).
- **Criterio de Validación:** Cada lección debe alinearse estrictamente con su foco temático planificado según el catálogo y la progresión hacia las civilizaciones.
- **Acción del Auditor:** Marcar `brecha` en Paso 2 y Paso 4 si los conceptos o metadatos divergen de la progresión de la unidad.

### Caso de Regresión 13: Enunciados y Actividades Truncadas en Plantillas (REG-013)
- **Síntoma Detectado:** Enunciados de práctica en cuaderno cortados con puntos suspensivos en el generador (ej: `"...del Neo..."`, `"Domesticación de animales y pl"`).
- **Criterio de Validación:** Todo texto de actividad, instrucción y pregunta en el DOCX y la plataforma debe estar completo, sin cortes sintácticos ni caracteres truncados.
- **Acción del Auditor:** Marcar `brecha` en Paso 5 si se detectan cadenas de texto truncadas en las actividades del cuaderno.

### Caso de Regresión 14: Reactivos Psicométricos Incompletos o sin Rotación de Clave (REG-014)
- **Síntoma Detectado:** Miniquiz con solo 3 alternativas, reactivos de recuperación binarios con 2 opciones, o fijación sistemática de la respuesta correcta siempre en la opción A o en la opción B.
- **Criterio de Validación:** En 7° Básico, todas las preguntas de miniquiz y recuperación deben tener exactamente 4 alternativas (A, B, C, D) con distractores plausibles, retroalimentación pedagógica y rotación equilibrada de la clave correcta.
- **Acción del Auditor:** Marcar `brecha` en Paso 7 si algún reactivo tiene menos de 4 alternativas o la clave no está distribuida.

### Caso de Regresión 15: Discrepancia entre el Caso Modelado en Video y la Comprobación (REG-015)
- **Síntoma Detectado:** Las preguntas de comprobación posterior al video (Paso 6) indagan sobre temas abstractos o no mencionados en el video explicativo, desconectándose de los datos y casos mostrados en las láminas.
- **Criterio de Validación:** Correspondencia isomórfica total: el caso, datos, yacimiento arqueológico o fenómeno analizado en las láminas 2 a 5 debe ser exactamente el mismo evaluado en el Paso 6.
- **Acción del Auditor:** Marcar `brecha` en Paso 6 si la comprobación evalúa un caso diferente al modelado en el video.

### Caso de Regresión 16: Error en Rangos de Inicio Puberal vs Estirón de Crecimiento (REG-016)
- **Síntoma Detectado:** Afirmar que "la pubertad inicia entre los 10 y 16 años" o presentar ese intervalo como rango de inicio.
- **Criterio de Validación:** Distinguir rigurosamente el inicio habitual de la pubertad (8 a 13 años en niñas y 9 a 14 años en niños según Tanner 1962, MedlinePlus, OMS y SOCHIPE) del estirón de estatura posterior. Si se menciona 10 a 16 años, debe identificarse explícitamente como estirón de crecimiento en estatura, respaldado con fuentes médicas y señalando que no es universal ni corresponde al inicio puberal.
- **Acción del Auditor:** Marcar `brecha` en Paso 4 si se presenta 10 a 16 años como inicio de la pubertad o se omite la cita médica respaldada.

### Caso de Regresión 17: Atribución Indebida de Oficialidad a Reactivos Creados (REG-017)
- **Síntoma Detectado:** Llamar "pregunta oficial", "ítem oficial", "reactivo oficial" o "ensayo oficial MINEDUC" a ejercicios o casos elaborados por el equipo pedagógico.
- **Criterio de Validación:** Denominar "reactivo de práctica tipo Examen Libre", "formato similar a MINEDUC" o "reactivo didáctico de práctica". La palabra "oficial" queda estrictamente reservada para reactivos extraídos de ensayos oficiales ministeriales verificables con cita de fuente.
- **Acción del Auditor:** Marcar `brecha` en Paso 4 y Paso 7 si se rotula como oficial un reactivo didáctico creado.

### Caso de Regresión 18: Solicitud de Texto o Letras A–D en Prompts de Imagen IA (REG-018)
- **Síntoma Detectado:** Prompts visuales de IA que solicitan opciones con letras A, B, C, D dibujadas, recuadros con texto de examen o rótulos integrados en la ilustración.
- **Criterio de Validación:** Los prompts de IA deben solicitar fondos limpios con paneles o tarjetas interactivas en blanco (*clean blank modular panels / blank choice cards*), espacio negativo real y la cláusula obligatoria "No text drawn by AI". Todo texto, letra A–D, enunciado y fórmula se incorpora exclusivamente como capa editable en PowerPoint (`vectorialOverlayPptx`) y en la plataforma web.
- **Acción del Auditor:** Marcar `brecha` en Paso 3 si el prompt de imagen solicita texto o letras A–D dibujadas por IA.


