---
name: sistema-global-lecciones-estudiosimple
description: Sistema Global de Lecciones EstudioSimple v2.0 para planificar, producir, auditar y validar lecciones curriculares de 3° a 8° Básico (MINEDUC Chile).
version: 2.0.0
updated_at: 2026-10-09T15:00:00-03:00
---

# Sistema Global de Lecciones EstudioSimple v2.0 (Capa Global)

## 1. Propósito, Alcance y Fuentes Oficiales

### 1.1 Propósito
El **Sistema Global de Lecciones EstudioSimple** establece la arquitectura pedagógica, curricular, técnica y operativa estándar para planificar, guionar, producir, verificar y aprobar las lecciones interactivas de la plataforma EstudioSimple. Garantiza alineación estricta con las Bases Curriculares y los Temarios Oficiales de Exámenes Libres (EELL) del Ministerio de Educación de Chile (MINEDUC), preservando el puente didáctico entre la pantalla digital y el cuaderno físico del estudiante, mediado por un adulto responsable (homeschooling).

### 1.2 Alcance Curricular
- **Niveles autorizados:** Exclusivamente **3.° a 8.° Básico** (Educación General Básica regular y validación de estudios según D.E. N.° 2272/2007).
- **Límite de alcance:** No se amplía el sistema a 1.° ni 2.° Básico, ni a Enseñanza Media.
- **Cinco Asignaturas Troncales:**
  1. Matemática (3.° a 8.° Básico)
  2. Lengua y Literatura (3.° a 8.° Básico)
  3. Ciencias Naturales (3.° a 8.° Básico)
  4. Historia, Geografía y Ciencias Sociales (3.° a 8.° Básico)
  5. Idioma Extranjero: Inglés (5.° a 8.° Básico según temarios oficiales de exámenes libres)

### 1.3 Jerarquía de Fuentes y Autoridad
1. **Decisiones explícitas del Sistema Global de Lecciones:** Prevalecen sobre cualquier práctica previa o recomendación informal.
2. **Currículo Oficial y Temarios Oficiales de Exámenes Libres (MINEDUC):** Determinan con precisión qué se enseña, qué habilidades se desarrollan y qué se evalúa.
3. **Textos Escolares Oficiales del MINEDUC (Edición vigente):** Fuente canónica de definiciones, representaciones, secuencias y ejercicios modelo.
4. **Manual Maestro y Planes Maestros de Asignatura/OA:** Fijan la estructura, storyboards y requisitos técnicos aprobados.
5. **Skills vigentes de Antigravity:** Instrumentos operativos para la ejecución y validación técnica.
6. **Informes y entregables históricos:** Evidencia de consulta; no pueden contradecir las fuentes normativas superiores.

---

## 2. Invariantes Estructurales del Sistema

### Invariante A: Una Sola Estructura Global Universal
El sistema prescribe **una única estructura global común** para todos los niveles (3.° a 8.° Básico) y para las cinco asignaturas. Queda terminantemente prohibido crear estructuras pedagógicas diferentes por nivel o curso que alteren el número de etapas, el orden de las mismas o la cantidad de diapositivas audiovisuales.

### Invariante B: Seis Clases por Objetivo de Aprendizaje (OA)
- Cada paquete curricular correspondiente a un OA se planifica en **exactamente seis clases completas**.
- No se permite unir, dividir, eliminar ni agregar clases.
- Cada clase posee un **subobjetivo específico** y una **evidencia de aprendizaje observable**, distribuyendo los contenidos y habilidades del OA de forma progresiva.

### Invariante C: Las Ocho Etapas Obligatorias de Cada Clase
Cada clase se compone estrictamente de **ocho etapas secuenciales**, en este orden exacto y con estos rótulos normativos idénticos a la interfaz:

```
[Antes de comenzar] (Instancia previa de preparación del adulto - No es una etapa numerada)
  1. Inicio
  2. Video Motivacional  (7 diapositivas)
  3. Recorrido
  4. Video Explicativo   (7 diapositivas)
  5. Práctica
  6. Resumen
  7. Miniquiz
  8. Cierre
```

Queda estrictamente prohibido renombrar, reordenar, fusionar, dividir o eliminar cualquiera de estas etapas.

### Invariante D: Videos Audiovisuales (7 + 7 Diapositivas)
- **Etapa 2 (Video Motivacional):** Contiene el video gancho de la lección con **exactamente 7 diapositivas**.
- **Etapa 4 (Video Explicativo):** Contiene el video conceptual y de modelamiento con **exactamente 7 diapositivas**.
- **Total audiovisual:** **14 diapositivas por clase**.
- Las otras 6 etapas (Inicio, Recorrido, Práctica, Resumen, Miniquiz y Cierre) transcurren directamente en la plataforma web mediante interacción guiada entre el estudiante y el adulto mentor. Los videos no constituyen la clase completa, sino sus componentes audiovisuales integrados.

### Invariante E: Adaptación por Nivel (3.° a 8.° Básico)
La adaptación pedagógica por nivel escolar se realiza exclusivamente dentro de la estructura común invariable:
- Graduación de la complejidad cognitiva del subobjetivo y de las tareas según las Bases Curriculares.
- Ajuste del registro léxico, extensión de los textos y densidad informativa.
- Nivel de andamiaje: mayor soporte concreto en 3.°-4.° básico; mayor abstracción y autonomía en 7.°-8.° básico.
- Madurez visual de los personajes: dúo co-protagónico con apariencia de ~9-10 años en primer ciclo básico, y de ~13 años en segundo ciclo básico (7.° y 8.° básico), sin crear elencos desconectados.

---

## 3. Estructura Funcional de las Ocho Etapas

Cada etapa debe articularse obligatoriamente bajo una **doble perspectiva coordinada**:
1. **Experiencia del Estudiante:** Lo que el estudiante lee, observa, reflexiona y ejecuta en pantalla o cuaderno.
2. **Guía de Mediación para el Adulto Responsable (Mentor):** Indicaciones operativas claras, directas y utilizables por un padre o madre sin formación pedagógica, estructuradas con los disparadores obligatorios:
   - `DILE:` Texto verbalizable exacto que el adulto dice al estudiante.
   - `ESPERA:` Qué debe observar o cuánto tiempo debe aguardar la respuesta.
   - `SI RESPONDE BIEN:` Retroalimentación de refuerzo positivo inmediato.
   - `SI NECESITA APOYO:` Pistas graduadas y andamiaje formativo antes de revelar la respuesta.

### 3.0 Instancia Previa: Antes de comenzar
- **Propósito:** Preparación ambiental, material y emocional previa a la sesión.
- **Contenido:** Materiales necesarios (cuaderno físico de la asignatura, lápiz mina, goma, regla o calculadora si aplica), tiempo estimado de la sesión (~25-35 minutos) y consejo de predisposición positiva.
- **Regla:** No se computa como una etapa numerada ni sustituye a la Etapa 1.

### 3.1 Etapa 1 — Inicio
- **Propósito:** Acogida emocional, encuadre curricular, activación de saberes previos y presentación de la meta.
- **Componentes obligatorios:**
  1. Clima de bienvenida y motivación inicial.
  2. Ubicación de la clase dentro de la asignatura y de la secuencia del OA (ej. Clase 1 de 6).
  3. Foco o subobjetivo en lenguaje claro y accesible.
  4. Conexión con un conocimiento previo o una vivencia cotidiana familiar.
  5. Ruta visual de lo que se realizará en la sesión.

### 3.2 Etapa 2 — Video Motivacional
- **Formato:** Video animado de **exactamente 7 diapositivas**.
- **Propósito:** Activar la curiosidad, generar disonancia cognitiva constructiva o plantear un reto/pregunta inicial contextualizada.
- **Regla pedagógica:** No entrega la definición formal ni la respuesta cerrada al problema; abre el apetito cognitivo.
- **Mediación del adulto:** Incluye instrucción previa para focalizar la atención ("Mira con atención qué le sucede a Sofía...") y una comprobación inmediata tras la visualización.

### 3.3 Etapa 3 — Recorrido
- **Naturaleza:** Etapa interactiva independiente en la plataforma, ubicada estrictamente entre el Video Motivacional y el Video Explicativo.
- **Propósito:** Indagación guiada y conversación socrática para procesar lo observado en el video gancho y preparar la formalización teórica.
- **Componentes por pregunta:**
  - Pregunta dirigida al estudiante.
  - Respuesta esperada (criterio de logro).
  - Pista gradual si el estudiante duda o se bloquea.
  - Retroalimentación si responde correctamente.
  - Apoyo formativo si requiere orientación adicional.
- **Regla estricta:** Queda prohibido omitir el Recorrido o absorberlo dentro de las diapositivas de los videos.

### 3.4 Etapa 4 — Video Explicativo
- **Formato:** Video animado de **exactamente 7 diapositivas**.
- **Propósito:** Formalizar el concepto, regla, principio científico o procedimiento central de la clase.
- **Componentes:**
  - Diapositivas 1 a 5: Desarrollo conceptual, representaciones visuales y vocabulario técnico disciplinar.
  - Diapositiva 6: Modelamiento explícito de resolución paso a paso (*Pensar en Voz Alta*), idéntico al contexto del primer ejercicio práctico.
  - Diapositiva 7: Síntesis de la regla de oro o conclusión formal.
- **Regla estricta:** Exactamente 7 diapositivas (sin diapositiva 8). La práctica posterior pertenece a la Etapa 5.

### 3.5 Etapa 5 — Práctica
- **Propósito:** Aplicación autónoma o guiada del conocimiento para consolidar destrezas y generar evidencia de aprendizaje.
- **Modalidad:** Interacción dual que articula la pantalla interactiva con el **cuaderno físico del estudiante** (dibujar esquemas, resolver cálculos, redactar respuestas o completar organizadores gráficos).
- **Componentes por actividad:**
  1. Consigna clara para el estudiante.
  2. Guía para el adulto (qué revisar, cómo verificar).
  3. Desempeño o respuesta esperada con criterios observables.
  4. Pasos de resolución guiada.
  5. Pistas graduadas de menor a mayor ayuda.
  6. Retroalimentación constructiva.
  7. Alineación estricta con el subobjetivo de la clase (prohibido incluir contenidos de clases futuras).

### 3.6 Etapa 6 — Resumen
- **Propósito:** Consolidación cognitiva de las ideas fuerza y procedimientos efectivamente trabajados en la sesión.
- **Regla:** Recupera exclusivamente lo enseñado en los videos y practicado en la Etapa 5; prohibido introducir contenidos o definiciones nuevas no abordadas.
- **Cierre del resumen:** Cuadro de síntesis o tarjeta de conceptos clave para registrar en el cuaderno.

### 3.7 Etapa 7 — Miniquiz
- **Propósito:** Evaluación formativa formal de salida para verificar el logro del subobjetivo.
- **Estructura estricta:** **Exactamente 3 preguntas** alineadas con el estándar MINEDUC.
- **Criterio de aprobación:** Al menos **2 respuestas correctas** ($\ge 66.7\%$) para superar la clase.
- **Retroalimentación:** Cada reactivo incluye justificación de la alternativa correcta y explicación del error pedagógico de cada distractor.
- **Bucle de recuperación formativa no punitiva:**
  - Si el estudiante obtiene menos de 2 respuestas correctas, la plataforma no emite calificaciones punitivas ni mensajes de fracaso.
  - Se activa una cápsula de refuerzo inmediato con explicación guiada y se habilitan ítems equivalentes en un segundo intento sin penalización.

### 3.8 Etapa 8 — Cierre
- **Propósito:** Reflexión metacognitiva, valoración del esfuerzo y anticipación de la siguiente sesión.
- **Componentes:**
  1. Pregunta metacognitiva de reflexión personal ("¿Qué estrategia te ayudó más a entender el tema de hoy?").
  2. Mensaje de felicitación por el trabajo y esfuerzo demostrado.
  3. Conexión de transferencia con la siguiente clase de la secuencia del OA.
  4. Registro y guardado de avance en el perfil del estudiante.

---

## 4. Estándar de Guiones y Especificación Técnica Audiovisual

Para cada una de las 14 diapositivas (7 de la Etapa 2 y 7 de la Etapa 4) se debe registrar:
1. **Número de diapositiva (1 a 7).**
2. **Propósito pedagógico:** Función específica dentro del storyboard.
3. **Texto en pantalla (visible):** Títulos principales (máximo 6 palabras) y subtítulos/fórmulas legibles con alto contraste.
4. **Descripción visual del arte:** Escenografía, personajes, acciones y diagramas técnicos. Debe incorporar obligatoriamente la directiva:
   `No text drawn by AI` (el arte visual generado por IA debe estar libre de tipografía renderizada; los textos se añaden posteriormente como capas tipográficas vectoriales limpias).
5. **Guion oral (locución / notas al orador):** Prosa fluida, verbalizable y natural. No se aplican límites arbitrarios de palabras; la duración real y sincronía se calibran en Google Vids en producción.
6. **Vínculo curricular:** Cita explícita a la página del Texto Escolar Oficial del MINEDUC que respalda el concepto.

---

## 5. Gobernanza, Tolerancias y Aprobación

### 5.1 Niveles de Severidad de Hallazgos
- **Crítico (Severidad 1):** Error factual en contenidos curriculares, contradicción con las Bases Curriculares/Temarios MINEDUC, alteración de las 8 etapas obligatorias, cantidad de diapositivas diferente a 7 en videos, o desajuste de evaluación formativa. **Tolerancia: 0.**
- **Mayor (Severidad 2):** Ausencia de guía del adulto en alguna etapa, omisión del bucle de recuperación en Miniquiz, falta de correspondencia entre modelamiento y práctica, o prompts de arte sin cláusula anti-texto. **Tolerancia: 0.**
- **Menor (Severidad 3):** Detalle tipográfico secundario, redacción mejorable en una pista formativa o ajuste estético sin impacto en el aprendizaje ni en la evaluación. **Tolerancia: Máximo 3 observaciones menores justificadas por lección.**

### 5.2 Estados Normativos de Lecciones y Paquetes
- `EN_REVISION`: Estado predeterminado y obligatorio de todo paquete nuevo, adaptado o auditado por Antigravity.
- `REQUIERE_AJUSTES`: Estado ante la presencia de $\ge 1$ error crítico/mayor o $\ge 4$ observaciones menores.
- `APROBADA`: **Potestad exclusiva de Walter**, otorgada únicamente tras la revisión y análisis conjunto con ChatGPT Work. Antigravity tiene prohibido transicionar lecciones a `APROBADA` de manera autónoma.
