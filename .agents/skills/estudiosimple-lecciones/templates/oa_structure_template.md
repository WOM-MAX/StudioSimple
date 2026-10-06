# Estructura Canónica de Paquete de Lección (OA)

Cada Objetivo de Aprendizaje (OA) debe habitar en una estructura canónica estricta dentro del repositorio:

```text
LECCIONES/
└── 110-<curso>/
    └── <Asignatura>/
        └── <OA>/
            ├── Plan_Maestro_<Curso>_110-<curso>-<ASI>-<OA>_<N>Lecciones.docx
            ├── Prompts_Work_<Asignatura>_<Curso>_<OA>.txt
            ├── manifest.json
            └── referencias/               [Opcional, solo antecedentes históricos]
```

---

## 1. Reglas de Contenido por Archivo

1. **DOCX Oficial Único (`Plan_Maestro_...`):**
   - Es el documento pedagógico oficial de producción.
   - Contiene la totalidad de las lecciones completas del OA (5 o 6 lecciones), tablas de diseño escena por escena, diálogos de los personajes, notas al orador y reactivos psicométricos.
   - **Regla Estricta:** Debe haber **un único DOCX** en la raíz de la carpeta del OA. Queda prohibido mantener copias paralelas, archivos alias o duplicados con nombres simplificados (como `Ciencias_OA01.docx`).

2. **TXT de Prompts para Work (`Prompts_Work_...`):**
   - Contiene el texto plano limpio de los prompts para cada una de las diapositivas de las lecciones del OA.
   - Diseñado para ser consumido directamente por Codex/Work para la generación automática de la presentación PPTX.

3. **Manifiesto Curricular (`manifest.json`):**
   - Registra de forma inmutable los metadatos de la lección, el hash SHA256 del DOCX oficial, el estado del paquete (`EN_REVISION`, `REQUIERE_AJUSTES`, `APROBADA`), las fuentes consultadas y la correspondencia con los archivos TypeScript de la aplicación web.

4. **Subcarpeta `referencias/` (Opcional):**
   - Se utiliza **únicamente** cuando existe un borrador prototipo histórico previo que debe conservarse como antecedente conceptual (como ocurrió con el borrador inicial de Matemática OA01).
   - Queda estrictamente prohibido utilizar `referencias/` como basurero de versiones intermedias. Si una versión fue corregida, se sobreescribe el archivo canónico.

---

## 2. Prohibiciones de Inclusión

- **Prohibido copiar PDFs de Temarios EELL o libros de texto dentro de `LECCIONES/`.** Las fuentes oficiales se consultan directamente en sus directorios matrices (`TEMARIOS EELL/` o `INSUMOS/`).
- **Prohibido alojar archivos PPTX finales.** La generación de PPTX recae exclusivamente en Codex/Work en su propio entorno.
