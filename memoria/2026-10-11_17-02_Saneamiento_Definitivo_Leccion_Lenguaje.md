# Bitácora de Saneamiento Definitivo y Erradicación de Lección Residual de Lenguaje

- **Fecha:** 2026-10-11 17:02 [America/Santiago]
- **Objetivo:** Erradicar de raíz cualquier persistencia, visualización o almacenamiento de la lección antigua de Lenguaje ("El conflicto narrativo", "Las 6 etapas del viaje del héroe") en el Panel del Apoderado, Panel del Estudiante, almacenamiento local (localStorage), generadores dinámicos y paquetes JSON.

---

## 1. Causa Raíz Identificada (Mecanismos Interconectados)
1. **Sobrescritura en `lesson-repository.ts` (`initializeInjectedLessons`):**
   - La función cargaba `localPackages` desde `localStorage['estudiosimple_injected_lessons']` y luego ejecutaba `localPackages.forEach(...)` después de `remotePackages.forEach(...)`, permitiendo que datos obsoletos guardados en el navegador del usuario aplastaran permanentemente los paquetes canónicos remotos en cada carga.
2. **Generador Legado en `lesson-generator.ts`:**
   - La función `getCanonicalClase1Lengua()` contenía ~640 líneas de código hardcodeado con la lección antigua "Las 6 Etapas del Viaje del Héroe" y era invocada dinámicamente por `generateOaLessons()` y `generateOAPackage()`.
3. **Mapeo Estático y Tarjetas en Dashboards:**
   - `ParentDashboard.tsx` y `StudentDashboard.tsx` mostraban texto estático de `curriculumData.ts` antes de ser desacoplados para preferir `injectedLesson.metadata.lessonTitle`.
4. **Gráfico Interactivo Disciplinar:**
   - `StudentDisciplineGraphic.tsx` interceptaba `interactiveType === 'hero_journey'` antes de evaluar la disciplina, y las clases 2 a 6 de Lenguaje tenían `type: 'hero_journey'`.
5. **Sesión Residual en `LessonSyncContext.tsx`:**
   - Al restaurar sesión, la condición `(!parsed.activeLessonTitle || parsed.activeLessonTitle === ...)` permitía restaurar sesiones antiguas sin título.

---

## 2. Solución Integral Implementada
1. **`lesson-repository.ts`:**
   - Implementada limpieza automática preventiva en `initializeInjectedLessons()`: si `localStorage` contiene cadenas obsoletas ("Viaje del Héroe", "viaje del héroe", "hero_journey"), se purga inmediatamente.
   - `remotePackages` establecido como la Fuente Única de la Verdad (SSOT) con precedencia absoluta sobre la caché local.
   - Solo modificaciones explícitas de usuario (`isCustomized === true`) tienen permiso de sobreescritura.
   - La versión limpia remota actualiza el almacenamiento local.
2. **`lesson-generator.ts`:**
   - Eliminadas 1.280 líneas de generadores obsoletos hardcodeados.
   - Reemplazados por delegaciones canónicas directas de una sola línea a `playerLessonToGeneratorLesson(LENGUA_7B_OA03_CLASE01)`, `CIENCIAS_7B_OA01_CLASE01`, `HISTORIA_7B_OA02_CLASE01` e `INGLES_7B_OA09_CLASE01`.
   - Actualizados mapeos de texto escolar (`TEXTBOOK_MAPPINGS['110-7-LEN-OA03']`) a `"El conflicto narrativo y el ambiente"`.
3. **`AdminDashboard.tsx`:**
   - Actualizado `TEXTBOOK_MAPPINGS['110-7-LEN-OA03']` a `"El conflicto narrativo y el ambiente"`.
4. **`StudentDisciplineGraphic.tsx` & Lecciones 2 a 6:**
   - Desacoplado Lengua y Literatura para devolver siempre `<StudentReadingResourceCard />` ("El mejor amigo de un muchacho", Asimov).
   - Actualizadas clases 2 a 6 de Lengua para usar `reading_resource`.
5. **`LessonSyncContext.tsx`:**
   - Establecida validación estricta de título: si la sesión en `localStorage` no coincide exactamente con el título de la lección activa, se purga de inmediato.
6. **Pipeline de Ingestión Curricular:**
   - Ejecutado `pipeline_sync_lessons.ts`: `injected_lessons_7b.json` saneado a los 5 paquetes oficiales de 7° Básico con la lección canónica de Jimmy y Robutt.
   - Manifiesto actualizado en estado normativo `EN_REVISION`.

---

## 3. Verificación y DoD
- `npx tsx scripts/pipeline_sync_lessons.ts`: Código de salida 0.
- `npm run build` en `Web Studio Simple`: Código de salida 0 sin advertencias críticas de compilación.
- Verificada ausencia total de la lección antigua en todas las fuentes activas.
