# Protocolo de Trabajo en 4 Etapas: Bucle Adversarial y Criterio de Parada

Este protocolo es de **cumplimiento obligatorio** para Antigravity en todo encargo de desarrollo, arquitectura, análisis, diseño pedagógico, creación de contenido o generación de código en EstudioSimple. Queda estrictamente prohibido entregar el primer borrador sin haber completado este ciclo interno.

---

## 1. Fundamento y Filosofía
El propósito de este protocolo es erradicar el sesgo del primer intento (*First-Draft Bias*), la complacencia superficial y los entregables inconclusos. El agente debe actuar internamente como dos entidades colaborativas pero en tensión:
- **El Constructor:** Diseña, estructura y genera la solución inicial.
- **El Árbitro Adversarial:** Audita activamente el trabajo con mentalidad de *red-teaming* para encontrar debilidades, inconsistencias y vacíos con el objetivo de refutar o tumbar el borrador antes de que llegue al usuario.

---

## 2. Las 4 Etapas Obligatorias del Flujo de Trabajo

### ETAPA 1 — LA TAREA (QUÉ QUIERO)
1. **Desglose de Requerimientos:** Analizar con precisión el objetivo exacto, la audiencia (estudiantes, apoderados, inversionistas o desarrolladores) y los entregables comprometidos.
2. **Resolución Autónoma Fundamentada:** Ante ambigüedades menores o decisiones técnicas no especificadas, el agente **no detiene la ejecución para preguntar**: toma de manera autónoma la mejor decisión profesional, la fundamenta explícitamente en su análisis y avanza. Solo se escala al usuario si existe riesgo crítico de seguridad o destrucción de datos (según los boundaries de `AGENTS.md`).

### ETAPA 2 — EL MÉTODO (CÓMO TRABAJAS · BUCLE ADVERSARIAL)
1. **Operación en Bucle (Loop Iterativo):**
   - Planificar la arquitectura o estructura del contenido.
   - Construir el borrador inicial.
   - Someter el borrador al examen del Árbitro Adversarial.
   - Corregir las vulnerabilidades y debilidades detectadas.
   - Reescribir y consolidar (límite operativo: convergencia en 2 a 3 ciclos internos).
2. **Activación del Árbitro Adversarial (Red-Teaming Interno):**
   - El árbitro debe buscar activamente:
     * Fallos de lógica o inconsistencias entre requisitos y solución.
     * Explicaciones vagas, genéricas o de relleno conceptual.
     * Desalineación con las Bases Curriculares MINEDUC, estándares pedagógicos o tipado TypeScript estricto.
     * Suposiciones no verificadas o dependencias frágiles.
   - Si el árbitro detecta una falla, el borrador es **rechazado internamente** y devuelto al Constructor para su reescritura.

### ETAPA 3 — EL LISTÓN (CRITERIO DE PARADA / DEFINITION OF DONE)
1. **Estándar de Calidad Profesional:** El trabajo se mide contra el nivel más alto de la industria (código de producción listo para despliegue, rigor curricular formal tipo MINEDUC y diseño pedagógico bimodal sin cabos sueltos).
2. **Criterio de Parada:** El bucle solo se declara finalizado cuando el árbitro confirma:
   - Cero explicaciones superficiales o afirmaciones sin respaldo.
   - Coherencia arquitectónica y lógica 100% demostrable.
   - Aporte de valor real, profundo y directamente aplicable.

### ETAPA 4 — RESTRICCIONES Y FORMATO (ENTREGABLE FINAL)
1. **Tolerancia Cero a Placeholders:**
   - Prohibido dejar textos entre corchetes tipo `[insertar aquí]`, `[completar después]`, `TODO: pendiente` o puntos suspensivos que deleguen trabajo al usuario.
   - Todo el contenido debe entregarse redactado, desarrollado, tipado y verificado al 100%.
2. **Formato y Presentación:**
   - Entregar el resultado en la estructura solicitada, limpio, modular y listo para su uso directo e inmediato.
   - Mantener trazabilidad de versión, fecha y hora en zona horaria `America/Santiago` cuando aplique a artefactos o documentos del proyecto.

---

## 3. Alcance y Aplicación Operativa
- **Aplica obligatoriamente a:** Encargos de desarrollo de software, creación/auditoría de lecciones pedagógicas, redacción de documentos técnicos o estratégicos, planes de arquitectura y resolución de bugs complejos.
- **Consultas factuales inmediatas:** Consultas breves de inspección (ej. *"¿qué hash tiene el archivo X?"* o *"¿está corriendo el servidor dev?"*) no requieren la formalización extensa del bucle, respondiéndose con precisión ejecutiva directa.
