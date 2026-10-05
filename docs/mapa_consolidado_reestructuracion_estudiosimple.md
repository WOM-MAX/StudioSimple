# Documento Maestro: Mapa Consolidado y Saneamiento Arquitectonico EstudioSimple

**Fecha:** 2026-10-05 20:10 UTC-03:00  
**Proyecto:** EstudioSimple - Antigravity  
**Repositorio:** WOM-MAX/StudioSimple  
**Objetivo:** Consolidar en un unico documento oficial la totalidad del mapa de reestructuracion, verificaciones empiricas en archivos, definicion de responsabilidades tecnicas y manifests curriculares antes de la construccion de la Skill Universal de Lecciones (3° a 8° Basico).

---

## 1. Decisiones Estructurales y Conservacion de los 5 Pilares

1. **TEMARIOS EELL (Intacta y Canonica):**
   - Permanece intacta en la raiz del proyecto como la fuente oficial inmutable de los Objetivos de Aprendizaje priorizados por el MINEDUC para examenes libres.
2. **INSUMOS (Estructura Intacta y Aislada de Git):**
   - Conserva su ordenamiento por tipo de material, curso y asignatura (`INSUMOS/LIBROS DIGITALES Y GUIAS/`, `INSUMOS/RESUMENES/`, `INSUMOS/ENSAYOS/`).
   - Permanece excluida de Git y de cualquier paquete de entrega debido a su volumen (26.8 GB).
3. **MANUAL MAESTRO (Canon Pedagogico y Metodologico):**
   - Alberga la documentacion institucional y metodologica de diseno instruccional, incluyendo el documento rector `Analisis_Estandarizacion_8_Etapas_EstudioSimple.docx`.
4. **PLANES MAESTROS PRESENTACIONES (Referencia Visual y de Diseno):**
   - Repositorio de referencia para la maquetacion de diapositivas en PowerPoint operada por ChatGPT Work (jerarquia tipografica, composicion grafica y diseno).
   - El contenido didactico, los dialogos y las preguntas de evaluacion se subordinan obligatoriamente a la leccion completa oficial de `LECCIONES/`.
5. **LECCIONES (Estructura Canonica por Nivel):**
   - Organizada jerarquicamente por curso, asignatura y OA (`LECCIONES/<Curso>/<Asignatura>/<OA>/`).
   - Cada carpeta de OA contiene una unica fuente oficial DOCX, sus prompts limpios asociados, su `manifest.json` y la subcarpeta `referencias/` para borradores previos si aplica.

---

## 2. Delimitacion de Responsabilidades y Fronteras Tecnicas

### A. Antigravity (Entorno de Desarrollo e Ingenieria Curricular)
- Disena, mantiene, modulariza y valida las lecciones completas en TypeScript (`Web Studio Simple/src/data/lessons/`) y los documentos oficiales DOCX (Plan Maestro con tablas tecnicas).
- Genera y mantiene los prompts limpios de diapositivas para cada escena.
- **Regla de exclusion estricta:** Las especificaciones y validaciones de Antigravity **no incluyen conteo de palabras ni duracion de videos**.
- Queda estrictamente prohibido que Antigravity genere o modifique presentaciones finales PPTX.

### B. Codex / ChatGPT Work (Entorno de Generacion Grafica de Diapositivas)
- Consume los paquetes oficiales entregados desde `LECCIONES/` y sus archivos de prompts TXT.
- Audita la consistencia logica de las diapositivas y asume la responsabilidad exclusiva de generar y validar las presentaciones PPTX en su propio entorno con Python.
- No es responsable de certificar la duracion acustica real del locutor.

### C. Produccion Audiovisual (Google Vids)
- La duracion acustica real, la velocidad de locucion y la sincronizacion temporal se verifican y calibran directamente en **Google Vids** durante la produccion del video (grabacion de voz, sintesis y renderizado).
- Ni Antigravity ni Codex/Work imponen restricciones temporales forzadas que comprometan la calidad didactica de las explicaciones.

---

## 3. Resolucion Documentada de los 8 Puntos de Saneamiento

### Punto 1: Jerarquia de LECCIONES
Se elimino la distribucion plana anterior en la raiz de `LECCIONES/`. Se implemento la estructura canonica:
- `LECCIONES/7_Basico/Ciencias_Naturales/OA01/`
- `LECCIONES/7_Basico/Historia_Geografia/OA02/`
- `LECCIONES/7_Basico/Ingles/OA09/`
- `LECCIONES/7_Basico/Lengua_Literatura/OA03/`
- `LECCIONES/7_Basico/Matematica/OA01/`

### Punto 2: Origen Real y Destino Vigente de Prompts TXT
En el archivo ZIP anterior, los prompts de texto plano se encontraban centralizados en la ruta:
`DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/`

Al reestructurar, cada archivo fue rescatado y co-ubicado junto a su OA correspondiente:
- `DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_Work_Ciencias_7B_OA01.txt` -> `LECCIONES/7_Basico/Ciencias_Naturales/OA01/Prompts_Work_Ciencias_7B_OA01.txt`
- `DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_Work_Historia_7B_OA02.txt` -> `LECCIONES/7_Basico/Historia_Geografia/OA02/Prompts_Work_Historia_7B_OA02.txt`
- `DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_Work_Ingles_7B_OA09.txt` -> `LECCIONES/7_Basico/Ingles/OA09/Prompts_Work_Ingles_7B_OA09.txt`
- `DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_Work_Lenguaje_7B_OA03.txt` -> `LECCIONES/7_Basico/Lengua_Literatura/OA03/Prompts_Work_Lenguaje_7B_OA03.txt`

El instructivo general para el operador de Work se conservo en:
`LECCIONES/7_Basico/README_WORK_INSTRUCCIONES.md`

### Punto 3: Desambiguacion de Matematica OA01
Para erradicar ambiguedades entre los dos documentos Word existentes en Matematica OA01:
- **Fuente Oficial de Produccion:**
  `Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones.docx`
  Estructura completa de 6 lecciones bajo el modelo de 8 etapas duales, alineada al texto escolar MINEDUC y al Temario EELL.
- **Documento Historico de Referencia:**
  `LECCIONES/7_Basico/Matematica/OA01/referencias/OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx`
  Corresponde a un borrador preliminar (5 clases exploratorias, fecha 2026-09-01). Se conserva aislado en la subcarpeta `referencias/` para consulta conceptual sin interferir en el pipeline de produccion.

### Punto 4: Reubicacion del Marco Metodologico de 8 Etapas
El archivo `Analisis_Estandarizacion_8_Etapas_EstudioSimple.docx` se traslado a:
`MANUAL MAESTRO/Analisis_Estandarizacion_8_Etapas_EstudioSimple.docx`
No pertenece a un OA individual; constituye el estandar instruccional activo del producto.

### Punto 5: Aislamiento Absoluto de Informacion Bancaria
La carpeta `CUENTA VISTA MERCADO LIBRE WALTER/` fue trasladada fuera del repositorio de EstudioSimple y fuera del workspace:
- *Ubicacion actual:* `C:\Users\walte\CUENTA VISTA MERCADO LIBRE WALTER`
- *Verificacion de Git:* Se audito el historial completo de commits (`git log --all --full-history -- "CUENTA VISTA*"` y `git log --all --diff-filter=A`). Se comprobo empiricamente que **la carpeta nunca fue registrada en ningun commit historico**. Por ende, no existe copia historica en Git ni riesgo de inclusion en archivos ZIP o paquetes de despliegue.

### Punto 6: Exclusiones de Seguridad y Blindaje de _archivo/
- En `.gitignore`:
  - `INSUMOS/` y `CONOCIMIENTO/` excluidos.
  - `_archivo/` excluido.
  - `.env`, `.env.*`, `*.env` excluidos.
  - `!.env.example` activamente rastreado en Git como plantilla publica (verificado con `git check-ignore` y `git ls-files`).
- En `AGENTS.md`: Se formalizo la orden que prohibe a las Skills y al agente realizar busquedas, lecturas o indexaciones en `_archivo/`.

### Punto 7: Rol de PLANES MAESTROS PRESENTACIONES
- Repositorio de referencia visual, jerarquias de fuentes y maquetacion de diapositivas en PowerPoint para ChatGPT Work.
- Todo reactivo, dialogo o ejercicio didactico debe emanar y subordinarse a la leccion oficial vigente en `LECCIONES/`.

### Punto 8: Organizacion Jerarquica de Reglas por Alcance
En `AGENTS.md`, `auditor_coherencia_estudiosimple/SKILL.md` y `rules_catalog.json`:
1. **Alcance Universal (3° a 8° Basico):**
   - Arquitectura pedagogica de 8 etapas duales (Mentor/Estudiante).
   - Prompts de arte visual sin texto generado por IA ('No text drawn by AI').
   - Vinculacion entre pantalla y cuaderno fisico.
   - Honestidad epistemologica (atribucion rigurosa de fuentes oficiales MINEDUC).
   - Evaluacion formativa sin calificaciones ni marcas punitivas.
2. **Alcance por Curso (Perfil 7° Basico):**
   - Regla `7B-001`: Estructura bimodal de 14 diapositivas por clase (7 de Gancho + 7 de Explicacion). En otros niveles escolares el numero se calibra segun el andamiaje evolutivo.
   - Regla `7B-006`: Reactivos formales de 4 alternativas (A, B, C, D) con analisis de distractores segun estandar evaluativo de segundo ciclo basico del MINEDUC.
   - Nivel de andamiaje, madurez lectora y grado de mediacion del apoderado.
3. **Alcance por Asignatura:**
   - Matematica: Enfoque Concreto-Pictorico-Simbolico (CPA), modelamiento y resolucion guiada.
   - Ciencias Naturales: Indagacion empirica, evidencia cientifica y preguntas investigables.
   - Lengua y Literatura: Comprension multinivel, analisis de personajes/conflicto y produccion guiada.
   - Historia, Geografia y Cs. Sociales: Pensamiento historico, analisis de fuentes y coordenadas espacio-temporales.
   - Ingles (EFL): Enfoque comunicativo funcional e input comprensible.
4. **Alcance por OA:**
   - Cobertura estricta del objetivo segun Temario EELL oficial y datos del `manifest.json`.

---

## 4. Evidencia Empirica de Verificacion de Archivos

### A. Certificacion SHA256 de Fuentes Oficiales y Alias (Cero Divergencia)

| Asignatura y OA | Tipo | Nombre de Archivo | Tamano (Bytes) | Hash SHA256 | Divergencia |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ciencias OA01** | Oficial | `Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx` | 82,152 | `07a82f7119a7cba25982ac03d5c0841ac997dcdeef74f28629a207f1589e1780` | 0 bytes / Identico |
| **Ciencias OA01** | Alias | `Ciencias_OA01.docx` | 82,152 | `07a82f7119a7cba25982ac03d5c0841ac997dcdeef74f28629a207f1589e1780` | 0 bytes / Identico |
| **Historia OA02** | Oficial | `Plan_Maestro_7Básico_110-7-HIS-OA02_5Lecciones.docx` | 59,282 | `6102209f960b4fae21913c01559b1092adf2d477556f1890c00fef5cfe2d81ea` | 0 bytes / Identico |
| **Historia OA02** | Alias | `Historia_OA02.docx` | 59,282 | `6102209f960b4fae21913c01559b1092adf2d477556f1890c00fef5cfe2d81ea` | 0 bytes / Identico |
| **Ingles OA09** | Oficial | `Plan_Maestro_7Básico_110-7-ING-OA09_6Lecciones.docx` | 66,932 | `55e4832c21b4fc63e01295499ee241b1aba27d5e8838f64c5761ae3848c08d85` | 0 bytes / Identico |
| **Ingles OA09** | Alias | `Ingles_OA09.docx` | 66,932 | `55e4832c21b4fc63e01295499ee241b1aba27d5e8838f64c5761ae3848c08d85` | 0 bytes / Identico |
| **Lengua OA03** | Oficial | `Plan_Maestro_7Básico_110-7-LEN-OA03_6Lecciones.docx` | 67,910 | `306a56cd08d18eab309253553d68767fdba73eeb62114657fb341375899af41b` | 0 bytes / Identico |
| **Lengua OA03** | Alias | `Lenguaje_OA03.docx` | 67,910 | `306a56cd08d18eab309253553d68767fdba73eeb62114657fb341375899af41b` | 0 bytes / Identico |
| **Matematica OA01** | Oficial | `Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones.docx` | 40,402 | `f53dcdb5f481ae288757db6fa858dacdc39bc235d2407347ceb99c9ec4ca0087` | Fuente unica 6 lecciones |
| **Matematica OA01** | Referencia | `referencias/OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx` | 51,200 | Prototipo historico previo de 5 clases (2026-09-01) | Aislado |

### B. Resolucion de Rutas de Codigo TypeScript
- **Raiz del Workspace / Repositorio:** `d:/StudioSimple - Antigravity/`
- **Raiz de la Aplicacion SPA (Vite / React):** `Web Studio Simple/`
- **Configuracion de Alias en `Web Studio Simple/tsconfig.json`:**
  - `@/*` mapea directamente a `./src/*`.
- **Ruta de Archivos de Lecciones:**
  - Desde el repositorio: `Web Studio Simple/src/data/lessons/...`
  - Dentro del codigo de la app: `@/data/lessons/...`

---

## 5. Tabla Maestra de Rutas Consolidadas

| Ruta de Origen Real | Ruta Actual Vigente | Funcion | Estado | Fuente Vigente |
| :--- | :--- | :--- | :--- | :--- |
| `TEMARIOS EELL/` | `TEMARIOS EELL/` | Temarios oficiales MINEDUC para examenes libres | Vigente intacto | Oficial MINEDUC |
| `INSUMOS/` | `INSUMOS/` | Textos escolares, guias didacticas y programas de estudio por curso y asignatura | Vigente intacto (excluido de Git) | Textos Oficiales MINEDUC |
| `PLANES MAESTROS PRESENTACIONES/` | `PLANES MAESTROS PRESENTACIONES/` | Referencia de diseno visual, tipografia y maquetacion de diapositivas en PowerPoint | Vigente (referencia de diseno) | Paquetes Work 7B |
| `LECCIONES/Analisis_Estandarizacion_8_Etapas_EstudioSimple.docx` | `MANUAL MAESTRO/Analisis_Estandarizacion_8_Etapas_EstudioSimple.docx` | Marco pedagogico e instruccional transversal de las 8 etapas duales | Vigente | Diseno Instruccional EstudioSimple |
| `CUENTA VISTA MERCADO LIBRE WALTER/` | `C:\Users\walte\CUENTA VISTA MERCADO LIBRE WALTER` | Datos bancarios y financieros personales | Aislado fuera del proyecto y fuera de Git | Carpeta de usuario |
| `DESCARGA_LECCIONES/README_WORK_INSTRUCCIONES.md` | `LECCIONES/7_Basico/README_WORK_INSTRUCCIONES.md` | Guia de operacion de paquetes para ChatGPT Work | Vigente | Operaciones Work |
| `DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_Work_Ciencias_7B_OA01.txt` | `LECCIONES/7_Basico/Ciencias_Naturales/OA01/Prompts_Work_Ciencias_7B_OA01.txt` | Prompts de 84 laminas para diapositivas de Ciencias OA01 | Vigente | Extraccion oficial |
| `LECCIONES/Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx` | `LECCIONES/7_Basico/Ciencias_Naturales/OA01/Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx` | Plan maestro oficial de 6 lecciones de Ciencias Naturales OA01 | Vigente oficial | Antigravity / Work |
| `LECCIONES/Ciencias_OA01.docx` | `LECCIONES/7_Basico/Ciencias_Naturales/OA01/Ciencias_OA01.docx` | Copia alias identica para compatibilidad de scripts | Vigente (alias validado) | DOCX Oficial |
| `DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_Work_Historia_7B_OA02.txt` | `LECCIONES/7_Basico/Historia_Geografia/OA02/Prompts_Work_Historia_7B_OA02.txt` | Prompts de 70 laminas para diapositivas de Historia OA02 | Vigente | Extraccion oficial |
| `LECCIONES/Plan_Maestro_7Básico_110-7-HIS-OA02_5Lecciones.docx` | `LECCIONES/7_Basico/Historia_Geografia/OA02/Plan_Maestro_7Básico_110-7-HIS-OA02_5Lecciones.docx` | Plan maestro oficial de 5 lecciones de Historia OA02 | Vigente oficial | Antigravity / Work |
| `LECCIONES/Historia_OA02.docx` | `LECCIONES/7_Basico/Historia_Geografia/OA02/Historia_OA02.docx` | Copia alias identica para compatibilidad de scripts | Vigente (alias validado) | DOCX Oficial |
| `DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_Work_Ingles_7B_OA09.txt` | `LECCIONES/7_Basico/Ingles/OA09/Prompts_Work_Ingles_7B_OA09.txt` | Prompts de 84 laminas para diapositivas de Ingles OA09 | Vigente | Extraccion oficial |
| `LECCIONES/Plan_Maestro_7Básico_110-7-ING-OA09_6Lecciones.docx` | `LECCIONES/7_Basico/Ingles/OA09/Plan_Maestro_7Básico_110-7-ING-OA09_6Lecciones.docx` | Plan maestro oficial de 6 lecciones de Ingles OA09 | Vigente oficial | Antigravity / Work |
| `LECCIONES/Ingles_OA09.docx` | `LECCIONES/7_Basico/Ingles/OA09/Ingles_OA09.docx` | Copia alias identica para compatibilidad de scripts | Vigente (alias validado) | DOCX Oficial |
| `DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_Work_Lenguaje_7B_OA03.txt` | `LECCIONES/7_Basico/Lengua_Literatura/OA03/Prompts_Work_Lenguaje_7B_OA03.txt` | Prompts de 84 laminas para diapositivas de Lenguaje OA03 | Vigente | Extraccion oficial |
| `LECCIONES/Plan_Maestro_7Básico_110-7-LEN-OA03_6Lecciones.docx` | `LECCIONES/7_Basico/Lengua_Literatura/OA03/Plan_Maestro_7Básico_110-7-LEN-OA03_6Lecciones.docx` | Plan maestro oficial de 6 lecciones de Lenguaje OA03 | Vigente oficial | Antigravity / Work |
| `LECCIONES/Lenguaje_OA03.docx` | `LECCIONES/7_Basico/Lengua_Literatura/OA03/Lenguaje_OA03.docx` | Copia alias identica para compatibilidad de scripts | Vigente (alias validado) | DOCX Oficial |
| `LECCIONES/Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones.docx` | `LECCIONES/7_Basico/Matematica/OA01/Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones.docx` | Plan maestro oficial de 6 lecciones de Matematica OA01 | Vigente oficial | Antigravity / Work |
| `LECCIONES/OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx` | `LECCIONES/7_Basico/Matematica/OA01/referencias/OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx` | Borrador prototipo inicial de 5 clases con guiones de prueba | Referencia historica | Prototipo 2026-09-01 |

---

## 6. Manifests Oficiales y Fundamentacion Curricular por OA

### A. Ciencias Naturales 7° Básico - OA01
**Ruta:** `LECCIONES/7_Basico/Ciencias_Naturales/OA01/manifest.json`
```json
{
  "curso": "7_Basico",
  "asignatura": "Ciencias_Naturales",
  "oa": "OA01",
  "identificador_paquete": "110-7-CIE-OA01",
  "version": "1.4.0",
  "fecha_actualizacion": "2026-10-05",
  "estado": "Oficial y Certificado",
  "total_clases": 6,
  "fuente_oficial_unica_docx": {
    "archivo": "Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx",
    "rol": "Unica fuente oficial de produccion de lecciones y prompts",
    "sha256": "07a82f7119a7cba25982ac03d5c0841ac997dcdeef74f28629a207f1589e1780",
    "bytes": 82152
  },
  "alias_docx": {
    "archivo": "Ciencias_OA01.docx",
    "generado_desde": "Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx",
    "rol": "Copia alias para retrocompatibilidad con scripts legados",
    "sha256": "07a82f7119a7cba25982ac03d5c0841ac997dcdeef74f28629a207f1589e1780",
    "bytes": 82152,
    "validacion_divergencia": "0 bytes de diferencia / SHA256 identico verificado"
  },
  "prompts_asociados": {
    "archivo": "Prompts_Work_Ciencias_7B_OA01.txt",
    "ruta_origen_zip_anterior": "DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_Work_Ciencias_7B_OA01.txt",
    "total_laminas": 84,
    "laminas_por_clase": 14,
    "perfil_evaluacion": "Perfil 7° Básico (14 láminas bimodales: 7 Gancho + 7 Explicación; reactivos de 4 alternativas en cierre)"
  },
  "fundamentacion_curricular": {
    "temario_eell": {
      "archivo": "TEMARIOS EELL/temario 7° basico.pdf",
      "pagina": 7,
      "seccion": "Eje Biología - Objetivo de Aprendizaje N° 1: Explicar los aspectos biológicos, afectivos y sociales que se integran en la sexualidad humana.",
      "plan_estudios_complementario": "TEMARIOS EELL/Septimo/Plan_de_Estudios_Optimizado_7Basico.docx",
      "documento_detallado": "TEMARIOS EELL/Septimo/Ciencias/Clase_1_Ciencias_Naturales_Detallada.pdf"
    },
    "insumos_mineduc": {
      "texto_estudiante_pdf": "INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/Ciencias Naturales.pdf",
      "unidad_y_paginas": "Unidad 1: Sexualidad y Afectividad, Lección 1 (pág. 16 a 29)",
      "banco_digital_actividades": "INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/BDA_CNA_7B/",
      "resumen_oficial": "INSUMOS/RESUMENES/110-7/RESUMEN CIENCIAS NATURALES.pdf",
      "ensayos_oficiales": "INSUMOS/ENSAYOS/110-7/CIENCIAS NATURALES.pdf"
    }
  },
  "resolucion_rutas_typescript": {
    "raiz_repositorio": "d:/StudioSimple - Antigravity/",
    "raiz_app_spa": "Web Studio Simple/",
    "alias_tsconfig": "@/* -> ./src/* (definido en Web Studio Simple/tsconfig.json)",
    "archivos_clases_ts": [
      "Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts",
      "Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase02.ts",
      "Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase03.ts",
      "Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase04.ts",
      "Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase05.ts",
      "Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase06.ts"
    ]
  }
}
```

### B. Historia, Geografía y Ciencias Sociales 7° Básico - OA02
**Ruta:** `LECCIONES/7_Basico/Historia_Geografia/OA02/manifest.json`
```json
{
  "curso": "7_Basico",
  "asignatura": "Historia_Geografia",
  "oa": "OA02",
  "identificador_paquete": "110-7-HIS-OA02",
  "version": "1.4.0",
  "fecha_actualizacion": "2026-10-05",
  "estado": "Oficial y Certificado",
  "total_clases": 5,
  "fuente_oficial_unica_docx": {
    "archivo": "Plan_Maestro_7Básico_110-7-HIS-OA02_5Lecciones.docx",
    "rol": "Unica fuente oficial de produccion de lecciones y prompts",
    "sha256": "6102209f960b4fae21913c01559b1092adf2d477556f1890c00fef5cfe2d81ea",
    "bytes": 59282
  },
  "alias_docx": {
    "archivo": "Historia_OA02.docx",
    "generado_desde": "Plan_Maestro_7Básico_110-7-HIS-OA02_5Lecciones.docx",
    "rol": "Copia alias para retrocompatibilidad con scripts legados",
    "sha256": "6102209f960b4fae21913c01559b1092adf2d477556f1890c00fef5cfe2d81ea",
    "bytes": 59282,
    "validacion_divergencia": "0 bytes de diferencia / SHA256 identico verificado"
  },
  "prompts_asociados": {
    "archivo": "Prompts_Work_Historia_7B_OA02.txt",
    "ruta_origen_zip_anterior": "DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_Work_Historia_7B_OA02.txt",
    "total_laminas": 70,
    "laminas_por_clase": 14,
    "perfil_evaluacion": "Perfil 7° Básico (14 láminas bimodales: 7 Gancho + 7 Explicación; reactivos de 4 alternativas en cierre)"
  },
  "fundamentacion_curricular": {
    "temario_eell": {
      "archivo": "TEMARIOS EELL/temario 7° basico.pdf",
      "pagina": 11,
      "seccion": "Eje Historia - Objetivo de Aprendizaje N° 2: Explicar que el surgimiento de la agricultura, la domesticación de animales, la sedentarización, la acumulación de bienes y el desarrollo del comercio fueron procesos que transformaron la vida humana.",
      "plan_estudios_complementario": "TEMARIOS EELL/Septimo/Plan_de_Estudios_Optimizado_7Basico.docx",
      "documento_detallado": "TEMARIOS EELL/Septimo/Historia/Clase_1_Historia_y_Geografia_Detallada.pdf"
    },
    "insumos_mineduc": {
      "texto_estudiante_pdf": "INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/Historia, Geografía y Ciencias Sociales.pdf",
      "unidad_y_paginas": "Unidad 1: Hacia las primeras civilizaciones, Lección 2: La revolución del Neolítico",
      "banco_digital_actividades": "INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/BDA_HIS_7B/",
      "resumen_oficial": "INSUMOS/RESUMENES/110-7/RESUMEN HISTORIA  GEOGRAFÍA Y CIENCIAS SOCIALES.pdf",
      "ensayos_oficiales": "INSUMOS/ENSAYOS/110-7/HISTORIA Y GEOGRAFÍA Y CIENCIAS SOCIALES.pdf"
    }
  },
  "resolucion_rutas_typescript": {
    "raiz_repositorio": "d:/StudioSimple - Antigravity/",
    "raiz_app_spa": "Web Studio Simple/",
    "alias_tsconfig": "@/* -> ./src/* (definido en Web Studio Simple/tsconfig.json)",
    "archivos_clases_ts": [
      "Web Studio Simple/src/data/lessons/historia_7b_oa02_clase01.ts"
    ]
  }
}
```

### C. Inglés EFL 7° Básico - OA09
**Ruta:** `LECCIONES/7_Basico/Ingles/OA09/manifest.json`
```json
{
  "curso": "7_Basico",
  "asignatura": "Ingles",
  "oa": "OA09",
  "identificador_paquete": "110-7-ING-OA09",
  "version": "1.8.0",
  "fecha_actualizacion": "2026-10-05",
  "estado": "Oficial y Certificado",
  "total_clases": 6,
  "fuente_oficial_unica_docx": {
    "archivo": "Plan_Maestro_7Básico_110-7-ING-OA09_6Lecciones.docx",
    "rol": "Unica fuente oficial de produccion de lecciones y prompts",
    "sha256": "55e4832c21b4fc63e01295499ee241b1aba27d5e8838f64c5761ae3848c08d85",
    "bytes": 66932
  },
  "alias_docx": {
    "archivo": "Ingles_OA09.docx",
    "generado_desde": "Plan_Maestro_7Básico_110-7-ING-OA09_6Lecciones.docx",
    "rol": "Copia alias para retrocompatibilidad con scripts legados",
    "sha256": "55e4832c21b4fc63e01295499ee241b1aba27d5e8838f64c5761ae3848c08d85",
    "bytes": 66932,
    "validacion_divergencia": "0 bytes de diferencia / SHA256 identico verificado"
  },
  "prompts_asociados": {
    "archivo": "Prompts_Work_Ingles_7B_OA09.txt",
    "ruta_origen_zip_anterior": "DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_Work_Ingles_7B_OA09.txt",
    "total_laminas": 84,
    "laminas_por_clase": 14,
    "perfil_evaluacion": "Perfil 7° Básico (14 láminas bimodales: 7 Gancho + 7 Explicación; reactivos de 4 alternativas en cierre)"
  },
  "fundamentacion_curricular": {
    "temario_eell": {
      "archivo": "TEMARIOS EELL/temario 7° basico.pdf",
      "pagina": 15,
      "seccion": "Eje Expresión Oral - Objetivo de Aprendizaje 9: Demostrar comprensión de textos orales adaptados y auténticos breves y simples relacionados con temas conocidos o de otras asignaturas.",
      "plan_estudios_complementario": "TEMARIOS EELL/Septimo/Plan_de_Estudios_Optimizado_7Basico.docx"
    },
    "insumos_mineduc": {
      "texto_estudiante_pdf": "INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/Inglés.pdf",
      "unidad_y_paginas": "Unit 1: Feelings and Opinions / Unit 2: Healthy Habits",
      "banco_digital_actividades": "INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/BDA_ING_7B/",
      "resumen_oficial": "INSUMOS/RESUMENES/110-7/RESUMNE DE INGLÉS.pdf",
      "ensayos_oficiales": "INSUMOS/ENSAYOS/110-7/INGLÉS.pdf"
    }
  },
  "resolucion_rutas_typescript": {
    "raiz_repositorio": "d:/StudioSimple - Antigravity/",
    "raiz_app_spa": "Web Studio Simple/",
    "alias_tsconfig": "@/* -> ./src/* (definido en Web Studio Simple/tsconfig.json)",
    "archivos_clases_ts": [
      "Web Studio Simple/src/data/lessons/ingles_7b_oa09_clase01.ts"
    ]
  }
}
```

### D. Lengua y Literatura 7° Básico - OA03
**Ruta:** `LECCIONES/7_Basico/Lengua_Literatura/OA03/manifest.json`
```json
{
  "curso": "7_Basico",
  "asignatura": "Lengua_Literatura",
  "oa": "OA03",
  "identificador_paquete": "110-7-LEN-OA03",
  "version": "2.6.0",
  "fecha_actualizacion": "2026-10-05",
  "estado": "Oficial y Certificado",
  "total_clases": 6,
  "fuente_oficial_unica_docx": {
    "archivo": "Plan_Maestro_7Básico_110-7-LEN-OA03_6Lecciones.docx",
    "rol": "Unica fuente oficial de produccion de lecciones y prompts",
    "sha256": "306a56cd08d18eab309253553d68767fdba73eeb62114657fb341375899af41b",
    "bytes": 67910
  },
  "alias_docx": {
    "archivo": "Lenguaje_OA03.docx",
    "generado_desde": "Plan_Maestro_7Básico_110-7-LEN-OA03_6Lecciones.docx",
    "rol": "Copia alias para retrocompatibilidad con scripts legados",
    "sha256": "306a56cd08d18eab309253553d68767fdba73eeb62114657fb341375899af41b",
    "bytes": 67910,
    "validacion_divergencia": "0 bytes de diferencia / SHA256 identico verificado"
  },
  "prompts_asociados": {
    "archivo": "Prompts_Work_Lenguaje_7B_OA03.txt",
    "ruta_origen_zip_anterior": "DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_Work_Lenguaje_7B_OA03.txt",
    "total_laminas": 84,
    "laminas_por_clase": 14,
    "perfil_evaluacion": "Perfil 7° Básico (14 láminas bimodales: 7 Gancho + 7 Explicación; reactivos de 4 alternativas en cierre)"
  },
  "fundamentacion_curricular": {
    "temario_eell": {
      "archivo": "TEMARIOS EELL/temario 7° basico.pdf",
      "pagina": 3,
      "seccion": "Eje Lectura - Objetivo de Aprendizaje N° 3: Analizar las narraciones leídas para enriquecer su comprensión, considerando el conflicto, los personajes y el punto de vista del narrador.",
      "plan_estudios_complementario": "TEMARIOS EELL/Septimo/Plan_de_Estudios_Optimizado_7Basico.docx",
      "documento_detallado": "TEMARIOS EELL/Septimo/Lenguaje/Clase_1_Lengua_y_Literatura_Detallada.pdf"
    },
    "insumos_mineduc": {
      "texto_estudiante_pdf": "INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/Lengua y literatura.pdf",
      "unidad_y_paginas": "Unidad 1: Héroes y heroínas / El viaje del héroe",
      "banco_digital_actividades": "INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/BDA_LYL_7B/",
      "resumen_oficial": "INSUMOS/RESUMENES/110-7/RESUMEN LENGUAJE Y COMUNICACIÓN.pdf",
      "ensayos_oficiales": "INSUMOS/ENSAYOS/110-7/LENGUAJE Y COMUNICACIÓN.pdf"
    }
  },
  "resolucion_rutas_typescript": {
    "raiz_repositorio": "d:/StudioSimple - Antigravity/",
    "raiz_app_spa": "Web Studio Simple/",
    "alias_tsconfig": "@/* -> ./src/* (definido en Web Studio Simple/tsconfig.json)",
    "archivos_clases_ts": [
      "Web Studio Simple/src/data/lessons/lengua_7b_oa03_clase01.ts"
    ]
  }
}
```

### E. Matemática 7° Básico - OA01
**Ruta:** `LECCIONES/7_Basico/Matematica/OA01/manifest.json`
```json
{
  "curso": "7_Basico",
  "asignatura": "Matematica",
  "oa": "OA01",
  "identificador_paquete": "110-7-MAT-OA01",
  "version": "1.0.0-certificada",
  "fecha_actualizacion": "2026-10-05",
  "estado": "Oficial y Certificado",
  "total_clases": 6,
  "fuente_oficial_unica_docx": {
    "archivo": "Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones.docx",
    "rol": "Unica fuente oficial de produccion de lecciones y prompts (6 lecciones completas)",
    "sha256": "f53dcdb5f481ae288757db6fa858dacdc39bc235d2407347ceb99c9ec4ca0087",
    "bytes": 40402
  },
  "archivos_referencia": [
    {
      "archivo": "referencias/OA01_Matematica_7Basico_Lecciones_Completas_y_Guiones.docx",
      "rol": "Borrador prototipo historico inicial (5 clases y 10 guiones, fecha 2026-09-01). Se conserva en carpeta aislada como antecedente conceptual e historico, no como fuente de produccion."
    }
  ],
  "prompts_asociados": {
    "tipo": "Integrados en codigo TypeScript y tablas formales de DOCX",
    "tablas_en_docx": "Tablas de especificaciones visuales y locucion escena por escena en Plan Maestro oficial",
    "perfil_evaluacion": "Perfil 7° Básico (14 láminas bimodales: 7 Gancho + 7 Explicación; reactivos de 4 alternativas en cierre)"
  },
  "fundamentacion_curricular": {
    "temario_eell": {
      "archivo": "TEMARIOS EELL/temario 7° basico.pdf",
      "pagina": 5,
      "seccion": "Eje Números y Operaciones - Objetivo de Aprendizaje N° 1: Mostrar que comprenden la adición y la sustracción de números enteros: representando los números enteros en la recta numérica; representándolas de manera concreta, pictórica y simbólica.",
      "plan_estudios_complementario": "TEMARIOS EELL/Septimo/Plan_de_Estudios_Optimizado_7Basico.docx",
      "documento_detallado": "TEMARIOS EELL/Septimo/Matematicas/Clase_1_Matematicas_Detallada.pdf",
      "presentacion_referencia": "TEMARIOS EELL/Septimo/Matematicas/PPT CLASE MATEMATICA 1.pptx"
    },
    "insumos_mineduc": {
      "texto_estudiante_pdf": "INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/Matemática.pdf",
      "unidad_y_paginas": "Unidad 1: Números enteros, Tema 1: Números enteros y valor absoluto (pág. 12 a 23)",
      "banco_digital_actividades": "INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/BDA_MAT_7B/",
      "resumen_oficial": "INSUMOS/RESUMENES/110-7/RESUMEN MATEMÁTICA.pdf",
      "ensayos_oficiales": "INSUMOS/ENSAYOS/110-7/MATEMÁTICA.pdf"
    }
  },
  "resolucion_rutas_typescript": {
    "raiz_repositorio": "d:/StudioSimple - Antigravity/",
    "raiz_app_spa": "Web Studio Simple/",
    "alias_tsconfig": "@/* -> ./src/* (definido en Web Studio Simple/tsconfig.json)",
    "archivos_clases_ts": [
      "Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase01.ts",
      "Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase02.ts",
      "Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase03.ts",
      "Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase04.ts",
      "Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase05.ts",
      "Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase06.ts"
    ]
  }
}
```

---

## 7. Registro de Validacion y Cierre Tecnico

1. **Compilacion Web SPA:** `npm run build --prefix "Web Studio Simple"` superada con codigo de salida 0 en 13.10 segundos sin errores de tipado TypeScript ni de empaquetado Vite.
2. **Sincronizacion Git Atomica:** Desplegada en la rama `main` remota con el hash de commit `6e81ff3`.
3. **Persistencia Local:** Bitacora de cambios registrada en `memoria/2026-10-05_20-00_Reestructuracion_Canonica_Lecciones_Manifests_Y_Gobernanza.md`.
