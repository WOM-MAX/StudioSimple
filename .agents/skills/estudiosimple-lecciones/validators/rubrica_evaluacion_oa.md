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
