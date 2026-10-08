---
name: estudiosimple-lecciones
description: Skill oficial para producir, auditar y validar lecciones completas, documentos maestros DOCX, prompts de diapositivas y manifiestos de EstudioSimple (3° a 8° básico).
---

# Skill Oficial: Producción y Auditoría de Lecciones EstudioSimple (3° a 8° Básico)

Esta Skill establece las **reglas universales** y el **flujo general de producción pedagógica** para la creación, revisión y validación de lecciones en EstudioSimple para la totalidad de educación básica (3° a 8° básico). Los perfiles de curso y de asignatura agregan los criterios propios y específicos de su respectivo alcance. La Skill de coherencia ejecuta la auditoría utilizando estas reglas y perfiles oficiales; no debe crear criterios paralelos.

---

## 1. Declaración de Principios y Fuente Oficial

1. **DOCX como Fuente de Verdad Pedagógica Única:**
   El archivo DOCX oficial aprobado alojado en `LECCIONES/110-<curso>/<Asignatura>/<OA>/Plan_Maestro_<Curso>_110-<curso>-<ASI>-<OA>_<N>Lecciones.docx` es la **fuente de verdad didáctica y pedagógica** de cada lección. Esta función de fuente de verdad del contenido específico de la lección se distingue claramente de las **reglas y estándares de producción** que contiene esta Skill (arquitectura de 8 etapas, estándares visuales, flujos y directivas del pipeline).
2. **Rol del Código TypeScript:**
   El código TypeScript en `Web Studio Simple/src/data/lessons/` representa exclusivamente la materialización interactiva de la lección para la aplicación SPA y **debe subordinarse y reflejar fielmente el contenido del DOCX oficial aprobado**, sin mantener versiones pedagógicas independientes.
3. **Rol de Presentaciones:**
   La carpeta `PLANES MAESTROS PRESENTACIONES/` es exclusivamente un catálogo de referencia visual para la maquetación en PowerPoint. Todo contenido, diálogo y reactivo didáctico debe emanar de la lección oficial vigente en el DOCX aprobado en `LECCIONES/`.

---

## 2. Delimitación Estricta de Responsabilidades (Pipeline)

| Actor | Responsabilidad Obligatoria | Prohibiciones Estrictas |
| :--- | :--- | :--- |
| **Antigravity** | Diseñar y revisar la lección completa, el archivo DOCX oficial, los prompts limpios de diapositivas para Work y el `manifest.json`. Sincronizar TypeScript con el DOCX. | **PROHIBIDO** generar o editar archivos PPTX finales. **PROHIBIDO** contar palabras o certificar duración acústica de videos. |
| **Codex / ChatGPT Work** | Auditar la consistencia gráfica y lógica del paquete recibido y generar la presentación PPTX en Python en su propio entorno a partir de los prompts y tablas del DOCX. | No modifica objetivos, explicaciones ni ejercicios aprobados en el DOCX. |
| **Google Vids** | Grabar, sintetizar locución, generar subtítulos y sincronizar la duración acústica real del video durante la producción audiovisual. | Ni Antigravity ni Codex imponen restricciones acústicas artificiales previas. |

---

## 3. Jerarquía y Organización de Reglas por Alcance

Las directivas están estrictamente ordenadas por ámbito de aplicación en los recursos de la Skill:

1. **Alcance Universal (Transversal 3° a 8° Básico):**
   Ver [rules/reglas_universales.md](rules/reglas_universales.md).
   - Estructura pedagógica de 8 etapas duales (Mentor / Estudiante).
   - **Parámetro Estándar de Cobertura por OA:** Exactamente **6 lecciones completas por Objetivo de Aprendizaje (OA)** como estándar obligatorio del proyecto.
   - **Protagonistas Universales:** Exigencia obligatoria de ambos protagonistas coprotagónicos (la joven y el joven) presentes en cada escena, dejando la edad y sus rasgos específicos al perfil de curso correspondiente.
   - Prompts de arte sin texto generado por IA (`No text drawn by AI`).
   - Puente análogo-digital con el cuaderno físico.
   - Honestidad epistemológica (atribución a fuentes oficiales).
   - Evaluación formativa sin marcas punitivas.

2. **Alcance por Curso y Nivel Evolutivo:**
   - **3° y 4° Básico (Primer Ciclo):** [profiles/cursos/perfil_3_4_basico.md](profiles/cursos/perfil_3_4_basico.md) (Alto andamiaje, lenguaje cercano, mediación del apoderado, reactivos de 3 o 4 alternativas con distractores simples).
   - **5° y 6° Básico (Transición):** [profiles/cursos/perfil_5_6_basico.md](profiles/cursos/perfil_5_6_basico.md) (Progresión hacia mayor autonomía conceptual y vocabulario disciplinar).
   - **7° Básico (Segundo Ciclo):** [profiles/cursos/perfil_7_basico.md](profiles/cursos/perfil_7_basico.md) (**Específico de 7°**: Estructura bimodal de 14 láminas [7 Gancho + 7 Explicación], protagonistas de 13 años [la joven con trenzas y el joven con chaqueta cerceta], y reactivos de 4 alternativas [A, B, C, D] con análisis psicométrico formal de distractores).
   - **8° Básico (Consolidación):** [profiles/cursos/perfil_8_basico.md](profiles/cursos/perfil_8_basico.md) (Pensamiento crítico, síntesis y preparación para Enseñanza Media).
   *Nota Crítica:* Los requisitos específicos de 7° básico (14 láminas, 4 alternativas con tabla psicométrica, edad de 13 años) **no son universales** y aplican únicamente al perfil de 7°.

3. **Alcance por Asignatura:**
   - **Matemática:** [profiles/asignaturas/matematica.md](profiles/asignaturas/matematica.md) (Enfoque Concreto-Pictórico-Simbólico CPA, modelamiento y resolución paso a paso; subtítulos calibrados en 36 pt).
   - **Ciencias Naturales:** [profiles/asignaturas/ciencias_naturales.md](profiles/asignaturas/ciencias_naturales.md) (Enfoque de indagación científica empírica, preguntas investigables y evidencia; subtítulos calibrados en 48 pt).
   - **Lengua y Literatura:** [profiles/asignaturas/lengua_literatura.md](profiles/asignaturas/lengua_literatura.md) (Comprensión multinivel, expresión escrita guiada y enriquecimiento léxico; subtítulos calibrados en 48 pt).
   - **Historia, Geografía y Cs. Sociales:** [profiles/asignaturas/historia_geografia.md](profiles/asignaturas/historia_geografia.md) (Pensamiento histórico, contraste de fuentes y contextualización espacial/temporal; subtítulos calibrados en 48 pt).
   - **Inglés (EFL):** [profiles/asignaturas/ingles.md](profiles/asignaturas/ingles.md) (Enfoque comunicativo funcional, input comprensible y vocabulario contextual; subtítulos calibrados en 48 pt).

4. **Alcance por OA Específico:**
   - Alineación obligatoria con `TEMARIOS EELL/` y el texto escolar respectivo.
   - Si una fuente (por ejemplo, libros en `INSUMOS/`) no está disponible localmente en el disco, el criterio de verificación debe registrarse obligatoriamente como **"no evaluable"**, sin inventar objetivos ni ejercicios.

---

## 4. Flujo de Trabajo Obligatorio de 12 Pasos por OA

Cada vez que se cree o revise una lección, se debe ejecutar estrictamente este protocolo:

1. **Identificar:** Definir curso (`110-<curso>`), asignatura, OA y verificar la existencia de fuentes oficiales aplicables (`TEMARIOS EELL/`, `MANUAL MAESTRO/`).
2. **Revisar Secuencia:** Validar la coherencia conceptual global de la lección completa antes de producir o modificar cualquier archivo.
3. **Comprobar Alineación:** Verificar que el objetivo, explicaciones, ejemplos resueltos, actividades de cuaderno y reactivos de evaluación apunten al mismo núcleo de aprendizaje.
4. **Verificar Ejemplos:** Asegurar que los ejercicios y ejemplos estén resueltos de forma matemáticamente/conceptualmente impecable y sean pertinentes para la edad del curso.
5. **Articulación de Práctica:** Confirmar que la lección prepare de forma directa y genuina para la práctica interactiva posterior de la plataforma.
6. **Cierre sin Desafío Redundante:** No incorporar un desafío final en el video explicativo si a continuación viene el módulo de práctica interactiva.
7. **Consistencia de Ejercicios:** La revisión posterior al video debe usar exactamente los mismos ejercicios de la lección completa (conservando números, condiciones, alternativas y respuestas; prohibido inventar o sustituir ejercicios).
8. **Calificación Estricta:** Registrar cada punto evaluado bajo una de tres categorías objetivas:
   - `cumple`: Evidencia confirmada contra la fuente.
   - `brecha`: Discrepancia identificada que debe corregirse.
   - `no evaluable`: Cuando la fuente externa (ej: `INSUMOS/`) no está presente en el disco local.
9. **Ubicación Canónica:** Guardar el paquete exclusivamente en `LECCIONES/110-<curso>/<Asignatura>/<OA>/`.
10. **Entrega a Work:** Poner a disposición el DOCX oficial y el TXT de prompts para que Walter los transmita al operador de Codex/Work.
11. **Ciclo de Ajustes (Cero Copias Paralelas):** Si Codex/Work reporta brechas, corregir **sobre los mismos archivos en la misma ruta canónica** y actualizar el manifiesto. Prohibido crear archivos paralelos con sufijos como `_v2`, `_nuevo` o `_alias`.
12. **Certificación de Estado:** Cambiar el estado del paquete a `APROBADA` únicamente tras resolver la totalidad de brechas y contar con el visto bueno explícito de Walter.

---

## 5. Estructura Canónica de Archivos por Carpeta de OA

Toda carpeta de lección debe contener exactamente:

```text
LECCIONES/110-<curso>/<Asignatura>/<OA>/
├── Plan_Maestro_<Curso>_110-<curso>-<ASI>-<OA>_<N>Lecciones.docx   # ÚNICO DOCX oficial vigente
├── Prompts_Work_<Asignatura>_<Curso>_<OA>.txt                     # Prompts limpios para Work
├── manifest.json                                                  # Metadatos, hashes y estado
└── referencias/                                                   # (Opcional) Solo para antecedentes históricos aislados
```

- **Prohibido:** No mantener copias paralelas del DOCX en la misma carpeta.
- **Prohibido:** No copiar PDFs de libros ni temarios dentro de `LECCIONES/`; referenciarlos desde sus ubicaciones matrices.

---

## 6. Estados Canónicos del Manifiesto

En `manifest.json`, el campo `estado` debe contener **exclusivamente uno de los siguientes valores**:

- `EN_REVISION`: Paquete generado o en proceso de verificación por Antigravity o Codex/Work.
- `REQUIERE_AJUSTES`: Se identificaron brechas que deben subsanarse en el DOCX, prompts o TypeScript.
- `APROBADA`: Paquete certificado formalmente con visto bueno final de Walter.

*Queda prohibido calificar un paquete como "oficial" o "aprobada" solo porque se haya generado o compilado exitosamente.*

---

## 7. Estándares Visuales en Prompts para Work

Al redactar o auditar prompts de diapositivas para Work, se deben aplicar las directivas aprobadas:

1. **Lámina 1:** Presentación explícita del objetivo de la lección y contexto pedagógico.
2. **Personajes:** Presencia obligatoria y visible de ambos protagonistas (la joven y el joven) en el 100% de las ilustraciones. La edad y sus rasgos visuales específicos se definen en el perfil de cada curso (ej. 13 años con trenzas y chaqueta cerceta para 7° básico), evitando imponer una edad fija transversal a estudiantes de 3° a 8° básico.
3. **Consistencia Cuádruple:** Coherencia total entre imagen, título, contenido textual/overlay y notas al orador. Prohibido desalinear temas (ej: locución de higiene en lámina de burlas o locución de reciprocidad en lámina de privacidad digital).
4. **Composición:** Texto breve y de alto contraste; colores planos y luminosos acordes a la paleta institucional.
5. **Limpieza Visual:** Prohibido el uso de sombras duras, contornos o recuadros negros flotantes.
6. **Blindaje de Arte por IA:** Inclusión obligatoria de la directiva `No text drawn by AI, no AI letters, no logos on background` en los prompts de generación de imagen.
7. **Marca:** Inclusión del logotipo blanco de EstudioSimple en la esquina inferior derecha maquetado por Codex/Work en PPTX. No pedir a la IA dibujar el logo dentro de la imagen; dejar espacio negativo real.
8. **Subtítulos Breves:** Máximo estricto de **ocho palabras** por subtítulo en pantalla (calibrados en 48 pt para Ciencias y humanidades, 36 pt para Matemática).
9. **Flexibilidad Audiovisual:** Presupuesto de 60s (gancho) y 90s (explicación) como metas orientativas de producción pedagógica. Google Vids enriquece la locución; unos segundos extra no constituyen error y no requieren recortes forzados ni conteo restrictivo de palabras.
10. **Sin Cuadernillos Anexos:** El Plan Maestro DOCX contiene exclusivamente la Ficha Curricular, Guiones Bimodales y los 8 Pasos Pedagógicos. La práctica escrita reside en el Paso 5; no generar cuadernillos como entregables anexos.

---

## 8. Invocación desde Antigravity

Cada vez que el usuario solicite crear, auditar o ajustar una lección, Antigravity debe invocar esta Skill:

```markdown
Aplicando la Skill 'estudiosimple-lecciones':
1. Consultar el perfil de curso en profiles/cursos/
2. Consultar el perfil de asignatura en profiles/asignaturas/
3. Ejecutar la rúbrica de 12 pasos de validators/rubrica_evaluacion_oa.md
4. Actualizar el manifest.json canónico bajo los estados normativos (EN_REVISION, REQUIERE_AJUSTES, APROBADA)
```

---

## 9. Barreras Preventivas Obligatorias (Control de Regresiones Críticas por Alcance)

Para evitar la repetición de errores históricos identificados por ChatGPT Work, todo agente que opere bajo esta Skill debe verificar activamente el cumplimiento según el nivel de jerarquía correspondiente:

### 1. Barreras Universales Transversales (Todas las Asignaturas y Cursos)
- **Nomenclatura Rigurosa de Preguntas y Reactivos:** Las preguntas creadas para una lección se identifican como “preguntas” o “reactivos de práctica”. Solo se llaman “oficiales” cuando se proporciona y verifica la pregunta original y su fuente.
- **Separación Radical Fondos IA vs. Overlays:** Todo prompt de imagen debe solicitar paneles o tarjetas en blanco con espacio negativo real (`No text drawn by AI. No logo drawn by AI`). Queda estrictamente prohibido pedir a la IA letras A, B, C, D o textos. Las letras, subtítulos (máx. 8 palabras), fórmulas y el logo blanco se maquetan en overlays editables (PPTX/código).
- **Duraciones Planificadas y Tolerancia Audiovisual:** Las metas son 60s (Gancho) y 90s (Explicación) como duraciones planificadas. Se acepta la extensión natural de Google Vids; queda terminantemente prohibido usar el cronómetro, conteo de palabras o duración exportada para rechazar un plan.
- **Isomorfismo en Paso 6:** La comprobación guiada posterior al video debe reproducir exactamente los mismos casos, números y datos modelados en el video (Lámina 6) y en la práctica guiada.

### 2. Barreras Específicas por Curso (Perfil de Nivel)
- **Específico de 7° Básico:** Consultar [profiles/cursos/perfil_7_basico.md](profiles/cursos/perfil_7_basico.md).
  * Estructura bimodal de 14 láminas (7 Gancho + 7 Explicación).
  * Protagonistas de 13 años (la joven con trenzas y el joven con chaqueta cerceta).
  * Estandarización estricta de **cuatro alternativas (A, B, C, D)** con análisis psicométrico formal de distractores (prohibidas preguntas de 2 o 3 opciones).
  * Subtítulos con un máximo estricto de 8 palabras, calibrados a 36 pt en Matemática y 48 pt en Ciencias, Lengua y Literatura, Historia/Geografía e Inglés.

### 3. Barreras Específicas Disciplinares (Skills y Perfiles Especializados)
- **Específico de Ciencias Naturales:** Consultar [.agents/skills/expert_ciencias_naturales/SKILL.md](../expert_ciencias_naturales/SKILL.md) y [profiles/asignaturas/ciencias_naturales.md](profiles/asignaturas/ciencias_naturales.md).
  * *Fisiología Endocrina:* Secuencia estricta Hipotálamo $\rightarrow$ Hipófisis (gonadotropinas LH/FSH) $\rightarrow$ Gónadas (hormonas sexuales). Prohibido afirmar que la hipófisis secreta hormonas sexuales.
  * *Distinción Médica en Pubertad:* Inicio puberal (8–13 niñas, 9–14 niños según Tanner 1962 y MedlinePlus) diferenciado del estirón de estatura (10–16 años). Prohibido diagnosticar individualmente con curvas generales; remitir a adultos/médicos.
  * *Tratamiento de Género:* Usar redacción prudente (los estereotipos sociales no deben limitar talentos ni oportunidades).
  * *Editorial Oficial:* Texto 7° Básico es Edición SM (Currículum Nacional); prohibido llamarlo Santillana.
  * *Cuatro Dimensiones:* Organización didáctica integral, no decreto taxativo del MINEDUC.
- **Específico de Humanidades (Historia, Lenguaje):** Consultar [.agents/skills/expert_historia_ciencias_sociales/SKILL.md](../expert_historia_ciencias_sociales/SKILL.md). Erradicación total de jerga y plantillas matemáticas en ciencias sociales.
- **Específico de Matemática:** Consultar [.agents/skills/expert_matematica/SKILL.md](../expert_matematica/SKILL.md). Enfoque CPA estricto y resolución por etapas Pólya.


