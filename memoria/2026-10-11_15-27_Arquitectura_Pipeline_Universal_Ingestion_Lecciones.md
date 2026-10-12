# Bitácora de Arquitectura Canónica: Pipeline Universal de Ingestión Curricular
**Fecha:** 2026-10-11 15:27 [America/Santiago]  
**Estado:** Implementado, Sincronizado y Certificado (Código de Salida 0)  
**Alcance:** Pipeline de Ingestión Universal, Desacoplamiento de Repositorio y Sincronización Canónica

---

## 1. Problema Estructural Resuelto
El flujo anterior utilizaba scripts con arrays fijos y mapeos hardcodeados de 4 clases (`load_4_lessons_from_revisar.ts` y `sync_canonical_to_injected_json.ts`), impidiendo el procesamiento de nuevas clases o niveles sin modificar código fuente, y manteniendo bifurcaciones estáticas en `findCanonicalFactoryLesson` dentro de `lesson-repository.ts`.

---

## 2. Arquitectura Implementada

### A. Pipeline Universal de Ingestión (`scripts/pipeline_sync_lessons.ts`)
1. **Auto-descubrimiento Dinámico:**
   - Escaneo recursivo del directorio `LECCIONES_POR_REVISAR/` sin listas fijas en código.
   - Detección automática de identificadores de curso (`110-7`, etc.), nivel (3° a 8° básico), asignatura, código de OA y número de clase desde rutas canónicas y encabezados Markdown.
2. **Parser Isomórfico de 8 Pasos:**
   - Extracción de metadatos, objetivos adultos, ruta de bloques de aprendizaje, situación inicial y referencia.
   - 14 láminas divididas en Gancho y Explicativo con locución y prompts limpios.
   - Conversación guiada (Paso 4), formalización (Paso 5), comprobación (Paso 5B), práctica en cuaderno (Paso 6).
   - Miniquiz psicométrico con distractores A, B, C, D (Paso 7), recuperación adaptativa (Paso 7b) y síntesis/cierre (Paso 8).
   - Asignación inteligente de componente interactivo por disciplina (`reading_resource`, `dimensions`, `timeline`, `thermo`).
3. **Generación y Registro de Módulos TypeScript:**
   - Genera atómicamente archivos `src/data/lessons/{asig}_{curso}_{oa}_clase{nn}.ts`.
   - Mantiene `src/data/lessons/index.ts` actualizado dinámicamente según los archivos válidos existentes en disco.
4. **Inyección en Paquetes JSON Públicos:**
   - Adapta vía `adaptPlayerLessonToGenerator` y actualiza/inserta ordenadamente en `injected_lessons_all_grades.json` e `injected_lessons_7b.json`.
5. **Trazabilidad y Manifiesto de Sincronización:**
   - Genera `data/sync_manifest.json` y `public/data/sync_manifest.json` con fecha, hash SHA256 de contenido, archivo de origen y estado normativo `EN_REVISION`.

### B. Desacoplamiento Dinámico en `lesson-repository.ts`
- Se reemplazaron más de 50 líneas de sentencias condicionales fijas (`if (lessonNumber === 1) return ...`) por una búsqueda dinámica en `ALL_CANONICAL_LESSONS` utilizando los normalizadores canónicos (`normalizeGrade`, `normalizeSubject`, `normalizeOa`).
- Cualquier lección nueva registrada en `index.ts` es descubierta y resuelta automáticamente por la aplicación.

### C. Comando Canónico Oficial en `package.json`
- Se registró el comando oficial:
  ```bash
  npm run sync:lessons
  ```
  Tanto en la raíz del proyecto como en `Web Studio Simple/package.json`.

---

## 3. Inventario Curricular Procesado
El pipeline procesó las 4 lecciones actualmente disponibles en `LECCIONES_POR_REVISAR/110-7`:
1. **Ciencias Naturales (OA 01, Clase 01):** *"La sexualidad integra distintas dimensiones"* (5 dimensiones biológicas, intelectuales, sociales, emocionales y espirituales).
2. **Historia, Geografía y Cs. Sociales (OA 02, Clase 01):** *"¿Dónde y cuándo comenzó la agricultura?"* (Mapa histórico pp. 18-19).
3. **Idioma Extranjero Inglés (OA 09, Clase 01):** *"Anne’s Birthday: Main Idea and Key Events"* (Diario de Ana Frank, Student's Book p. 18).
4. **Lengua y Literatura (OA 03, Clase 01):** *"Jimmy y Robutt: leer el ambiente y descubrir el conflicto"* (Isaac Asimov, pp. 12-15).

---

## 4. Validación Técnica
- **Comando de Sincronización:** `npm run sync:lessons` ➔ Exit Code 0.
- **Compilación de Producción:** `npm run build` en `Web Studio Simple` ➔ Exit Code 0 (`tsc && vite build`).
