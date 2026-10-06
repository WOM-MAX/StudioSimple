# Repositorio Canónico de Lecciones Oficiales: EstudioSimple

Este directorio contiene los paquetes oficiales de lecciones completas, prompts para ChatGPT Work y manifiestos de trazabilidad curricular de EstudioSimple para los niveles de **3° a 8° básico**.

---

## 1. Convención Canónica de Carpetas

La organización de carpetas se estructura por código institucional de nivel (`110-<curso>`), asignatura y Objetivo de Aprendizaje (OA):

```text
LECCIONES/
├── README_LECCIONES.md
├── 110-3/                          # 3° Básico
│   └── <Asignatura>/
│       └── OAxx/
├── 110-4/                          # 4° Básico
│   └── <Asignatura>/
│       └── OAxx/
├── 110-5/                          # 5° Básico
│   └── <Asignatura>/
│       └── OAxx/
├── 110-6/                          # 6° Básico
│   └── <Asignatura>/
│       └── OAxx/
├── 110-7/                          # 7° Básico (Segunda Etapa Consolidada)
│   ├── Ciencias_Naturales/
│   │   └── OA01/
│   ├── Historia_Geografia/
│   │   └── OA02/
│   ├── Ingles/
│   │   └── OA09/
│   ├── Lengua_Literatura/
│   │   └── OA03/
│   └── Matematica/
│       └── OA01/
└── 110-8/                          # 8° Básico (Cierre y Articulación)
    └── <Asignatura>/
        └── OAxx/
```

---

## 2. Invariantes de Contenido por Carpeta de OA

Cada carpeta de OA debe alojar estrictamente:

1. **Un Único DOCX Oficial Vigente:**
   - Denominación: `Plan_Maestro_<Curso>_110-<curso>-<ASI>-<OA>_<N>Lecciones.docx`
   - Es la **fuente pedagógica oficial inmutable**. Queda terminantemente prohibido mantener archivos alias duplicados (ej: `Ciencias_OA01.docx`), copias paralelas o versiones intermedias en la raíz del OA.
2. **El Archivo TXT de Prompts Limpios para Work:**
   - Denominación: `Prompts_Work_<Asignatura>_<Curso>_<OA>.txt`
   - Contiene la descripción escena por escena de las diapositivas para ser consumido por Codex/Work en la generación de presentaciones PowerPoint.
3. **El Manifiesto de Trazabilidad (`manifest.json`):**
   - Registra curso, asignatura, OA, hashes SHA256, fuentes oficiales consultadas, rutas de clases en TypeScript y el estado normativo.
4. **Subcarpeta `referencias/` (Opcional):**
   - Únicamente reservada para antecedentes o borradores conceptuales históricos aislados (como el borrador preliminar de Matemática OA01). No se utiliza para respaldar versiones intermedias ni duplicar el DOCX oficial.

---

## 3. Estados Oficiales de Lección en `manifest.json`

El estado de un paquete de lección en su manifiesto se rige estrictamente por tres valores posibles:

- `EN_REVISION`: Paquete en proceso de elaboración, auditoría por Antigravity o revisión por Codex/Work.
- `REQUIERE_AJUSTES`: Se identificaron brechas conceptuales, de formato o psicométricas que deben corregirse sobre los mismos archivos.
- `APROBADA`: Paquete completamente certificado, sin brechas pendientes y con el visto bueno formal de Walter.

*Prohibición:* Ninguna versión puede calificarse como "oficial" o "aprobada" por el mero hecho de haberse generado o compilado.

---

## 4. Fuentes Externas Prohibidas dentro de `LECCIONES/`

- **Prohibido copiar PDFs de Temarios EELL o libros de texto** dentro de esta estructura. Dichos documentos se consultan en sus carpetas matrices (`TEMARIOS EELL/` o `INSUMOS/`).
- **Prohibido alojar presentaciones finales PPTX.** La generación de presentaciones recae exclusivamente en Codex/Work en su propio entorno de trabajo.
