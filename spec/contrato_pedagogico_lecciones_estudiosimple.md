# CONTRATO PEDAGÓGICO Y ESPECIFICACIÓN DE LECCIONES ESTUDIOSIMPLE (7° BÁSICO)

**Versión:** 2.0 (Borrador de Trabajo)  
**Ámbito:** Todas las asignaturas de 7° Básico (Ciencias Naturales, Historia y Geografía, Idioma Extranjero Inglés, Lengua y Literatura, Matemática).  
**Destinatarios:** ChatGPT Work (Generación pedagógica) y Antigravity (Ingeniería de software e inyección a la App).  
**Estado:** BORRADOR DE TRABAJO (En alineación bilateral con Work — Sin prevalencia sobre planes vigentes)  

---

## 1. Principio Rector: Cero Ambigüedad e Isomorfismo

Una lección de EstudioSimple articula la mediación del adulto (apoderado/mentor), el trabajo análogo del estudiante en su cuaderno físico y el soporte interactivo en la pantalla digital.

La navegación del estudiante consta de **8 momentos interactivos acordados**:
1. **Inicio:** Situación inicial y punto de partida observable.
2. **Motivación:** Video/láminas de motivación (7 diapositivas).
3. **Recorrido:** Ruta de aprendizaje y diálogo socrático.
4. **Explicación:** Video/láminas de formalización y modelamiento (7 diapositivas).
5. **Práctica:** Casos de aplicación guiada al cuaderno físico.
6. **Resumen:** Consolidación de ideas clave.
7. **Miniquiz:** Instrumento formal psicométrico (3 reactivos, 4 alternativas A-D).
8. **Cierre:** Metacognición, celebración y puente a la próxima clase.

*Nota de arquitectura:* La **Preparación del adulto mediador** se realiza antes de iniciar la interacción con el estudiante y reside fuera de la secuencia de navegación directa del alumno.

---

## 2. Estructura Canónica de los 8 Pasos

Toda lección debe componerse exactamente de las siguientes 8 secciones:

### Paso 1: Preparación del Adulto
- **Objetivo de la clase:** Redacción clara y concisa del aprendizaje esperado (`### Objetivo de aprendizaje de la clase` o `### Objetivo de esta clase`). No usar frases genéricas ni plantillas como "Preparación de la clase N".
- **Ruta de hoy:** Breve descripción de los 4 momentos (`**Ruta de hoy:** ...`).
- **Orientación para el adulto:** Indicación pedagógica clave (`**DILE al estudiante:** "..."`).
- **Recordatorios y Consejo emocional:** Recomendaciones de mediación (`**Recordatorios:**` y `**Consejo emocional:**`).

### Paso 2: Ruta y Preguntas Clave
- **Presentación de la ruta:** Diálogo introductorio para el estudiante (`**DILE:** "..."`).
- **Bloques pedagógicos:** Exactamente 4 momentos:
  1. Punto de partida (Activación)
  2. Motivación y Explicación (14 láminas bimodales)
  3. Práctica guiada (Transferencia al cuaderno)
  4. Miniquiz y Cierre (Evaluación formativa y metacognición)
- **Pregunta clave detonante:** Pregunta inicial para despertar curiosidad.

### Paso 3: Punto de Partida y Situación Inicial
- **Estímulo observable:** Imagen, texto breve, problema cotidiano o fuente histórica.
- **Pregunta de observación directa:** Pregunta guiada para el diálogo adulto-estudiante.
- **Respuesta esperada:** Criterio explícito de respuesta correcta.
- **Pistas socráticas y apoyos:** Orientaciones para el adulto si el estudiante duda.

### Paso 4: Conversación Guiada (Diálogo Socrático)
- **Encabezado:** `## Paso 4: Conversación guiada` o `## Step 4: Guided Conversation`.
- **Preguntas de conversación (`preQuestions`):** Mínimo 2 preguntas socráticas secuenciales con su contexto, pregunta, respuesta esperada y pista de apoyo para profundizar en el punto de partida antes del video.

### Paso 5: Explicación Bimodal (14 Láminas de Video)
En 7° básico rige la **estructura bimodal obligatoria de 14 láminas** distribuidas equitativamente en dos momentos:

1. **Momento 1: MOTIVACIÓN (Láminas 1 a 7)**
   - *Propósito:* Activar conocimientos previos, presentar el conflicto cognitivo, contextualizar en la vida cotidiana y plantear la pregunta desafiante.
   - *Rótulo de momento:* **Motivación** (en sustitución del término histórico "Gancho").
   - *Campos por lámina:*
     - Número de diapositiva (1 a 7).
     - Título del momento: `Motivación`.
     - Propósito didáctico.
     - Prompt visual (descripción para arte sin texto IA).
     - Texto en pantalla (Overlay text).
     - Guion de locución (Speaker notes / lo que se escucha).
     - Duración aproximada en segundos.

2. **Momento 2: EXPLICACIÓN (Láminas 8 a 14)**
   - *Propósito:* Formalización conceptual, modelamiento explícito del método (enfoque CPA en matemática, análisis de fuentes en historia, indagación en ciencias, lectura en lenguaje/inglés) y síntesis del aprendizaje.
   - *Rótulo de momento:* **Explicación**.
   - *Campos por lámina:* Misma estructura de campos (láminas 8 a 14).

### Preguntas de Comprobación (`postQuestions`)
- Tras el video explicativo, exactamente 2 preguntas de comprobación rápida para verificar comprensión antes de pasar a la práctica.

### Paso 6: Práctica Guiada (Transferencia al Cuaderno)
- **Encabezado:** `## Paso 6: Práctica guiada` o `## Step 6: Guided Practice`.
- **Casos de aplicación:** Entre 1 y 3 actividades secuenciales.
- **Estructura de cada caso:**
  - Contexto / Estímulo completo (multilínea, sin omitir datos).
  - Tarea / Pregunta explícita a resolver en el cuaderno físico.
  - Criterio de logro esperado.
  - Pistas graduales de apoyo (Nivel 1 y Nivel 2).

### Paso 7: Miniquiz Psicométrico y Recuperación Formativa
- **Encabezado:** `## Paso 7: Miniquiz` o `## Step 7: Mini-quiz`.
- **Estructura Psicométrica del Miniquiz:**
  - **Exactamente 3 reactivos psicométricos** de evaluación formativa formal.
  - Cada reactivo debe contar con **exactamente 4 alternativas distintas** identificadas con prefijo estándar (`- A. `, `- B. `, `- C. `, `- D. `).
  - **Clave privada explícita:** En una línea independiente tras las 4 alternativas:  
    `**Clave privada:** [A-D]` (Ejemplo: `**Clave privada:** B`).
  - Justificación breve del distractor o refuerzo si falla (`**Explicación:** ...`).
- **Paso 7B: Recuperación Formativa (Refuerzo):**
  - Módulo de recuperación para cada reactivo.
  - **Declaración explícita de modalidad:**
    - **Modalidad A: Práctica Abierta en Cuaderno Físico** (`kind: 'open_response'`). Se declara: `Esta es práctica abierta: no convertir las pistas en alternativas de respuesta`. Contiene consigna, criterio privado del adulto y apoyos graduados.
    - **Modalidad B: Selección Múltiple** (`kind: 'multiple_choice'`). Contiene pregunta con sus alternativas y clave.
  - **Regla de Oro de Acreditación de Logro:**
    - Con 2/3 o 3/3 aciertos: Aprobación directa de la lección.
    - Con 0/3 o 1/3 aciertos: El adulto guía el refuerzo en el cuaderno físico, pero **la lección solo se acredita si el estudiante supera el reintento del miniquiz con $\ge 2/3$ aciertos**. Finalizar la sesión sin superar el reintento no otorga la acreditación del criterio.

### Paso 8: Cierre Metacognitivo y Celebración
- **Ideas de síntesis:** 3 ideas centrales para recordar (`**Ideas de síntesis:**` con 3 puntos numerados).
- **Pregunta de síntesis:** Pregunta para verbalizar lo aprendido (`**Pregunta de síntesis:** "..."`).
- **Reflexión metacognitiva:** Pregunta sobre la estrategia de estudio (`**Metacognición:** "..."`).
- **Celebración del esfuerzo:** Refuerzo positivo del mentor (`**Celebración:** "..."`).

---

## 3. Matriz de Validación Rápida (Preflight Checklist para Work)

Antes de entregar una lección a Antigravity, Work debe verificar:
1. [ ] ¿Tiene los 8 pasos completos con sus títulos de sección?
2. [ ] ¿Tiene exactamente 14 láminas divididas en 7 de Motivación (Láminas 1-7) y 7 de Explicación (Láminas 8-14)?
3. [ ] ¿El Paso 4 contiene preguntas socráticas (`preQuestions`) y tras la explicación hay preguntas de comprobación (`postQuestions`)?
4. [ ] ¿El Miniquiz contiene exactamente 3 reactivos con 4 opciones (A, B, C, D) cada uno?
5. [ ] ¿Cada reactivo tiene su `**Clave privada:** [A-D]` explícita en su propia línea?
6. [ ] ¿La recuperación distingue explícitamente si es Práctica Abierta en Cuaderno o Selección Múltiple?
7. [ ] ¿Se eliminó cualquier texto provisional o placeholder (`TODO`, `[insertar]`)?

---

## 4. Protocolo Permanente de Coordinación y Validación Previa Work ↔ Antigravity (Contrato v1.0)

Este protocolo rige de forma permanente la validación previa, la ingesta y la coordinación entre ChatGPT Work (autoría pedagógica) y Antigravity (ingeniería de integración A-SDLC) en el repositorio de EstudioSimple.

### 1. WORK ENTREGA UNA CLASE COMPLETA SEGÚN LA ESTRUCTURA ACORDADA
Work debe entregar la clase conforme al plan maestro y a los requisitos del contrato de intercambio vigente que conocen ambas partes. La clase debe incluir los contenidos, estímulos, actividades, respuestas y criterios privados, apoyos, evaluación, recuperación y cierre que correspondan, con sus recursos y referencias identificados y su estado de disponibilidad. Los videos que Walter producirá posteriormente en Vids pueden quedar `PENDIENTE_VIDEO_A_CARGO_WALTER` sin que eso convierta la fuente en una clase defectuosa. Registra la versión del contrato utilizada (Contrato v1.0). No se exigirán después elementos nuevos que no fueron comunicados al generar esa versión.

### 2. ANTIGRAVITY VALIDA LA CLASE ANTES DE INYECTARLA
Antes de modificar datos de uso o inyectar una clase, comprueba que contiene los elementos exigidos y que la estructura actual de la App puede interpretarlos y representarlos fielmente para adulto y estudiante. Verifica valores y significado, no solo presencia de campos. La transformación debe conservar preguntas, alternativas, claves, casos, estímulos, ayudas y condiciones de revelación. Reconoce los formatos admitidos sin reescribir contenido correcto para facilitar el parser. Que compile no demuestra sincronización.

### 3. SI HAY DIFERENCIAS, ANTIGRAVITY EMITE UN ÚNICO REPORTE PARA WORK
Detén la inyección de esa versión, conserva la última versión válida y entrega un reporte consolidado con `archivo/clase/versión`, `campo afectado`, `contenido recibido`, `requisito esperado`, `impacto` y `acción necesaria`. Distingue:
1. **Falta contenido en la fuente:** Work debe corregirlo.
2. **La clase es válida, pero la App no soporta una función:** Debe coordinarse su incorporación.
3. **El parser o adaptador pierde información que debería conservar:** Antigravity debe corregirlo.
4. **Video de motivación o explicación aún no producido/subido por Walter:** Registra `PENDIENTE_VIDEO_A_CARGO_WALTER`. Esta ausencia temporal no es un error de Work ni de sincronización y no debe bloquear la validación del resto o su carga en el entorno autorizado. No generes un reporte de corrección por ese único motivo.
5. **Falta un texto, mapa, caso, dato u otro estímulo indispensable para resolver una actividad:** Identifica la carencia concreta para Work. La excepción del video pendiente no permite omitir esos elementos.

No inventes contenido, respuestas o valores por defecto para obtener una apariencia de compatibilidad. Identifica las comprobaciones no ejecutadas como pendientes. Entrega el reporte listo para que Walter lo remita a Work si no existe un canal directo.

### 4. WORK RESUELVE LAS DIFERENCIAS Y COMUNICA LOS CAMBIOS ANTES DE APLICARLOS
Work corrige las omisiones de autoría o aclara el requisito. Si propone una mejora que exige cambiar la App, debe informar antes qué cambió, por qué, qué campos o funciones afecta y desde qué versión se aplica. Antigravity también debe avisar antes de cambiar el formato o la interpretación acordados.
Ambas partes deben usar la misma versión comunicada del contrato. Ninguna puede eliminar una actividad, cambiar su significado o convertir una tarea abierta en selección para hacerla encajar. Registra los cambios técnicos autorizados; consulta con Walter si cambia objetivo, cobertura, interpretación o material protegido. No cambies unilateralmente las condiciones de una entrega en curso.

### 5. LA INYECCIÓN CONTINÚA CUANDO FUENTE Y APP SON COMPATIBLES
Resueltas las diferencias, repite los controles afectados y reutiliza la evidencia de componentes sin cambios. Comprueba la conservación `fuente → datos transformados → versión cargada → vista del adulto y del estudiante`. Declara **APTA PARA INYECCIÓN** solo cuando la clase esté completa respecto del contrato vigente y su compatibilidad esté comprobada. Si persisten diferencias, actualiza el mismo reporte con los pendientes concretos.
La aptitud técnica no equivale a aprobación pedagógica ni autoriza publicación. Ejecuta únicamente en el entorno autorizado: la preparación continúa aislada, `EN_REVISION` y sin promoción. Una clase puede resultar técnicamente apta para carga y revisión en el entorno autorizado y mantener un video pendiente. No declares verificada su reproducción ni completa la unidad audiovisual hasta que Walter entregue el video y se compruebe su vinculación. No sustituyas la lección por contenido inventado para ocultar esa etapa pendiente.

### RESPONSABILIDAD AUDIOVISUAL
Work prepara las presentaciones y sus notas conforme al encargo. Walter transforma las presentaciones en videos con Vids y los sube después. Antigravity vincula y comprueba esos videos cuando Walter entregue sus archivos o enlaces, dentro del alcance autorizado. No exigir a Work que produzca o suba videos ni rehacer presentaciones o lecciones correctas por su ausencia temporal.

### APLICACIÓN
Aplica el protocolo a las cinco asignaturas, con sus requisitos específicos, mediante un control común previo y sin parches manuales por clase. Conserva las protecciones de Matemática OA01 y las presentaciones terminadas. Complementa la preparación en curso sin reiniciarla ni abrir otra reestructuración.

