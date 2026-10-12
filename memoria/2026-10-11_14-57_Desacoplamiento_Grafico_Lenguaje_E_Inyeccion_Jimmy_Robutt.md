# Bitácora de Estabilización y Desacoplamiento Pedagógico
**Fecha:** 2026-10-11 14:57 [America/Santiago]  
**Estado:** Resuelto con Certificación Exitosa (Código 0)  
**Alcance:** 7° Básico — Lengua y Literatura — OA 03 — Clase 01

---

## 1. Problema Abordado
Al ingresar a la Clase 01 de Lengua y Literatura (OA 03) en los paneles de apoderado y estudiante, la interfaz mostraba componentes residuales de una lección obsoleta:
1. El panel interactivo del estudiante renderizaba fijamente *"Las 6 etapas del viaje del héroe"* (`StudentHeroJourneyChart`).
2. El archivo `public/data/injected_lessons_all_grades.json` contenía metadata y pasos de la versión previa generada (*"El conflicto narrativo y la trama de la historia"*).
3. La sesión activa persistía en `localStorage` bajo la clave `estudiosimple_lesson_session_v1`, reteniendo el estado de la lección antigua.

---

## 2. Acciones Implementadas

### A. Desacoplamiento de `StudentDisciplineGraphic.tsx`
- Se creó el componente pedagógico especializado [`StudentReadingResourceCard.tsx`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/lesson/student/StudentReadingResourceCard.tsx) que presenta la ficha canónica del texto escolar oficial: *“El mejor amigo de un muchacho”* (Isaac Asimov, pp. 12-15) con contexto del ambiente lunar y preguntas clave del paso 3.
- Se desacopló [`StudentDisciplineGraphic.tsx`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/lesson/student/StudentDisciplineGraphic.tsx) eliminando el retorno incondicional de `StudentHeroJourneyChart` para Lenguaje. Ahora solo se renderiza si `interactiveType === 'hero_journey'`. Por defecto en Lenguaje se renderiza `StudentReadingResourceCard`.
- En [`lesson-adapter.ts`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/lib/lesson-adapter.ts), la función `resolveInteractiveForDiscipline` para Lenguaje fue actualizada a `type: 'story_context'`, con título *"Recurso de Lectura y Ambiente Narrativo"*.
- Se ampliaron los tipos en [`lesson.ts`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/types/lesson.ts) para soportar `'reading_resource'` y `'story_context'`.

### B. Inyección y Sincronización Canónica de Contenidos
- Se regeneró el módulo canónico [`lengua_7b_oa03_clase01.ts`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/data/lessons/lengua_7b_oa03_clase01.ts) a partir del archivo oficial `LECCIONES_POR_REVISAR/110-7/110-7-LEN-OA03-C01.md` (*"Jimmy y Robutt: leer el ambiente y descubrir el conflicto"*).
- Mediante [`scripts/sync_canonical_to_injected_json.ts`](file:///d:/StudioSimple%20-%20Antigravity/scripts/sync_canonical_to_injected_json.ts), se actualizó la Clase 01 del paquete `110-7-LEN-OA03` en:
  - [`Web Studio Simple/public/data/injected_lessons_all_grades.json`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/public/data/injected_lessons_all_grades.json)
  - [`Web Studio Simple/public/data/injected_lessons_7b.json`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/public/data/injected_lessons_7b.json)
- Se eliminaron todos los textos residuales del viaje del héroe de la Clase 01.

### C. Invalidación de Caché y Sesión de Sincronización
- En [`LessonSyncContext.tsx`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/context/LessonSyncContext.tsx), se implementó detección de discrepancia de título: si la sesión en `localStorage` tiene un título diferente al de la lección que se está montando, se purga de inmediato `localStorage.removeItem(STORAGE_KEY)` y se re-inicializa el estado en paso 1.
- En [`SynchronizedLessonMaster.tsx`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/lesson/SynchronizedLessonMaster.tsx), se incorporó `resolvedLesson.metadata.lessonTitle` a la `syncKey` del proveedor para forzar re-montaje limpio ante cambios de lección.
- En [`ParentDashboard.tsx`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/dashboard/ParentDashboard.tsx) y [`StudentDashboard.tsx`](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/dashboard/StudentDashboard.tsx), el botón "Iniciar Clase" ahora purga proactivamente cualquier sesión huérfana en `localStorage`.

---

## 3. Validación y Certificación Técnica
1. **Compilación de Producción:**
   - Comando: `npm run build` en `Web Studio Simple`.
   - Resultado: **Exit Code 0** (`tsc && vite build` completado limpiamente).
2. **Script de Certificación Integral:**
   - Comando: `npx tsx scripts/verify_clase01_certification.ts`.
   - Resultado: **Exit Code 0**, certificando:
     - Título canónico: *"Jimmy y Robutt: leer el ambiente y descubrir el conflicto"*.
     - 0 residuos del Viaje del Héroe en `injected_lessons_all_grades.json`.
     - 0 residuos en `injected_lessons_7b.json`.
     - 0 residuos en `lengua_7b_oa03_clase01.ts`.
     - `StudentDisciplineGraphic.tsx` desacoplado y renderizando `StudentReadingResourceCard`.
     - Invalidación de sesión verificada.
