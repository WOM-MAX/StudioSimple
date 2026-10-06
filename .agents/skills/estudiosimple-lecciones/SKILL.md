---
name: estudiosimple-lecciones
description: Skill oficial para producir, auditar y validar lecciones completas, documentos maestros DOCX, prompts de diapositivas y manifiestos de EstudioSimple (3° a 8° básico).
---

# Skill Oficial: Producción y Auditoría de Lecciones EstudioSimple (3° a 8° Básico)

Esta es la **habilidad normativa única y canónica** para la creación, revisión, validación curricular y auditoría de lecciones en EstudioSimple para la cobertura completa de educación básica (3° a 8° básico).

---

## 1. Declaración de Principios y Fuente Oficial

1. **DOCX como Fuente Pedagógica Oficial Única:**
   El archivo DOCX oficial aprobado alojado en `LECCIONES/110-<curso>/<Asignatura>/<OA>/` es la **única fuente de verdad didáctica y pedagógica**.
2. **Rol del Código TypeScript:**
   El código TypeScript en `Web Studio Simple/src/data/lessons/` representa exclusivamente la materialización interactiva de la lección para la aplicación SPA y **debe subordinarse y reflejar fielmente el contenido del DOCX oficial**, sin mantener versiones pedagógicas independientes.
3. **Rol de Presentaciones:**
   La carpeta `PLANES MAESTROS PRESENTACIONES/` es exclusivamente un catálogo de referencia visual para la maquetación en PowerPoint. Todo contenido, diálogo y reactivo didáctico debe emanar de la lección oficial vigente en `LECCIONES/`.

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
   Ver [rules/reglas_universales.md](file:///c:/Proyectos/StudioSimple/.agents/skills/estudiosimple-lecciones/rules/reglas_universales.md).
   - Estructura pedagógica de 8 etapas duales (Mentor / Estudiante).
   - **Parámetro Estándar de Cobertura por OA:** Exactamente **6 lecciones completas por Objetivo de Aprendizaje (OA)** (fijado como parámetro estándar obligatorio según recomendación de Work).
   - Prompts de arte sin texto generado por IA (`No text drawn by AI`).
   - Puente análogo-digital con el cuaderno físico.
   - Honestidad epistemológica (atribución a fuentes oficiales).
   - Evaluación formativa sin marcas punitivas.

2. **Alcance por Curso y Nivel Evolutivo:**
   - **3° y 4° Básico (Primer Ciclo):** [profiles/cursos/perfil_3_4_basico.md](file:///c:/Proyectos/StudioSimple/.agents/skills/estudiosimple-lecciones/profiles/cursos/perfil_3_4_basico.md) (Alto andamiaje, lenguaje cercano, mediación del apoderado, reactivos de 3 o 4 alternativas con distractores simples).
   - **5° y 6° Básico (Transición):** [profiles/cursos/perfil_5_6_basico.md](file:///c:/Proyectos/StudioSimple/.agents/skills/estudiosimple-lecciones/profiles/cursos/perfil_5_6_basico.md) (Progresión hacia mayor autonomía conceptual y vocabulario disciplinar).
   - **7° Básico (Segundo Ciclo):** [profiles/cursos/perfil_7_basico.md](file:///c:/Proyectos/StudioSimple/.agents/skills/estudiosimple-lecciones/profiles/cursos/perfil_7_basico.md) (**Específico de 7°**: Estructura bimodal de 14 láminas [7 Gancho + 7 Explicación] y reactivos de 4 alternativas [A, B, C, D] con análisis psicométrico formal de distractores).
   - **8° Básico (Consolidación):** [profiles/cursos/perfil_8_basico.md](file:///c:/Proyectos/StudioSimple/.agents/skills/estudiosimple-lecciones/profiles/cursos/perfil_8_basico.md) (Pensamiento crítico, síntesis y preparación para Enseñanza Media).
   *Nota Crítica:* Los requisitos numéricos de 7° básico (14 láminas, 4 alternativas con tabla psicométrica) **no son universales** y aplican únicamente al perfil de 7°.

3. **Alcance por Asignatura:**
   - **Matemática:** [profiles/asignaturas/matematica.md](file:///c:/Proyectos/StudioSimple/.agents/skills/estudiosimple-lecciones/profiles/asignaturas/matematica.md) (Enfoque Concreto-Pictórico-Simbólico CPA, modelamiento y resolución paso a paso).
   - **Ciencias Naturales:** [profiles/asignaturas/ciencias_naturales.md](file:///c:/Proyectos/StudioSimple/.agents/skills/estudiosimple-lecciones/profiles/asignaturas/ciencias_naturales.md) (Enfoque de indagación científica empírica, preguntas investigables y evidencia).
   - **Lengua y Literatura:** [profiles/asignaturas/lengua_literatura.md](file:///c:/Proyectos/StudioSimple/.agents/skills/estudiosimple-lecciones/profiles/asignaturas/lengua_literatura.md) (Comprensión multinivel, expresión escrita guiada y enriquecimiento léxico).
   - **Historia, Geografía y Cs. Sociales:** [profiles/asignaturas/historia_geografia.md](file:///c:/Proyectos/StudioSimple/.agents/skills/estudiosimple-lecciones/profiles/asignaturas/historia_geografia.md) (Pensamiento histórico, contraste de fuentes y contextualización espacial/temporal).
   - **Inglés (EFL):** [profiles/asignaturas/ingles.md](file:///c:/Proyectos/StudioSimple/.agents/skills/estudiosimple-lecciones/profiles/asignaturas/ingles.md) (Enfoque comunicativo funcional, input comprensible y vocabulario contextual).

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
2. **Personajes:** Presencia recurrente de ambos protagonistas juveniles (la joven y el joven).
3. **Consistencia Cuádruple:** Coherencia total entre imagen, título, contenido textual y notas al orador.
4. **Composición:** Texto breve y de alto contraste; colores planos y luminosos acordes a la paleta institucional.
5. **Limpieza Visual:** Prohibido el uso de sombras duras, contornos o recuadros negros.
6. **Blindaje de Arte por IA:** Inclusión obligatoria de la directiva `No text drawn by AI, no AI letters, no logos on background` en los prompts de generación de imagen.
7. **Marca:** Inclusión del logotipo blanco de EstudioSimple en la esquina inferior derecha.
8. **Tipografía:** No extrapolar tamaños de fuente específicos de un curso a otros niveles evolutivos.

---

## 8. Invocación desde Antigravity

Cada vez que el usuario solicite crear, auditar o ajustar una lección, Antigravity debe invocar esta Skill:

```markdown
Aplicando la Skill 'estudiosimple-lecciones':
1. Consultar el perfil de curso en .agents/skills/estudiosimple-lecciones/profiles/cursos/
2. Consultar el perfil de asignatura en .agents/skills/estudiosimple-lecciones/profiles/asignaturas/
3. Ejecutar la rúbrica de 12 pasos de .agents/skills/estudiosimple-lecciones/validators/rubrica_evaluacion_oa.md
4. Actualizar el manifest.json canónico bajo los estados normativos (EN_REVISION, REQUIERE_AJUSTES, APROBADA)
```
