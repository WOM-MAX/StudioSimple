# Bitacora de Sesion: Secuencia Canonica de 8 Pasos, Visor Multi-Asignatura y Sincronizacion GitHub

- Fecha: 2026-09-21 13:25
- Proyecto: EstudioSimple (C:\Proyectos\StudioSimple)
- Repositorio GitHub: https://github.com/WOM-MAX/StudioSimple.git
- Rama: main

---

## 1. Contexto y Objetivos Abordados

En esta sesion se corrigieron fallas estructurales criticas en la experiencia de aula sincronizada (Mentor Adulto y Estudiante) y se dejo preparada la base de datos para la inyeccion de lecciones completas multi-asignatura:

1. **Correccion de la Secuencia Canonica de 8 Pasos:**
   - Problema detectado: La preparacion privada (Paso 1) saltaba directamente a la ruta o situacion inicial omitiendo el Gancho (Paso 2). La formalizacion saltaba a la idea clave y luego retrocedia a la practica, desordenando la progresion didactica.
   - Solucion: Se restauro y blindo la progresion lineal estricta de 8 fases canonicas:
     * Paso 1 (Inicio): Portada y preparacion privada del mentor (cover -> prep).
     * Paso 2 (Gancho / Video Motivacional): Desafio inicial y activacion cognitiva (hook).
     * Paso 3 (Recorrido Didactico): Ruta, situacion inicial, punto de referencia y preguntas socraticas (route -> situation -> reference -> conversation).
     * Paso 4 (Explicacion Formal / Video Explicativo): Formalizacion conceptual guiada (formalization).
     * Paso 5 (Practica Guiada): Aplicacion en situaciones contextuadas (practice).
     * Paso 6 (Resumen / Idea Clave): Consolidacion de la idea que debe quedar (idea).
     * Paso 7 (Miniquiz Formativo): Evaluacion autonoma y refuerzo guiado (miniquiz -> results / recovery).
     * Paso 8 (Cierre y Metacognicion): Evaluacion oral, transferencia a la vida real y finalizacion (closing -> completed).

2. **Reseteo Determinista de Sesion y Purga de Estado:**
   - Problema: Al entrar a una clase desde el dashboard o al reiniciar, el visor conservaba indices previos o estados en localStorage.
   - Solucion: En LessonSyncContext.tsx se implemento la deteccion reactiva de cambio de objetivo (activeOa) o clase (activeLessonNum), limpiando caches e inicializando siempre en cover con banderas e indices en cero.

3. **Visor del Estudiante Dinamico y Agnostico a la Disciplina:**
   - Problema: StudentLessonView.tsx contenia componentes estaticos exclusivos de matematica (termometro de temperatura, simulador del submarino, ecuaciones de -20 m y ascensor) visibles en todas las asignaturas.
   - Solucion: Se condiciono el widget del termometro unicamente para Matematica OA 1 Clase 1. Para las demas asignaturas (Lenguaje, Ciencias Naturales, Historia e Ingles) y demas clases, el visor se nutre dinamicamente de los campos de lessonData (preguntas socraticas, tarjetas de desafio inicial, formalizacion conceptual, preguntas de resumen y metacognicion).

4. **Inyeccion Curricular en Base de Datos y Repositorio:**
   - Se actualizo prisma/schema.prisma agregando los campos contenidoJson, focoDidactico y objetivoId al modelo Clase.
   - Se genero y ejecuto el script scripts/seed_lessons_to_db.mjs poblando 29 lecciones de 7mo Basico en SQLite (dev.db) y exportando el JSON estatico optimizado public/data/injected_lessons_7b.json.
   - Se implementaron los modulos src/lib/lesson-adapter.ts y src/lib/lesson-repository.ts para sincronizar las lecciones inyectadas con el estado global de la aplicacion.

5. **Analisis Arquitectonico para Videos:**
   - Se realizo la evaluacion tecnica y de costos para almacenar los videos de Examenes Libres (10 a 12 videos por OA de 1:00 a 1:15 min).
   - Se comprobo que los ~300 videos de 7mo Basico suman aprox. 3.6 GB, lo cual calza con holgura dentro del plan gratuito de Cloudflare R2 (10 GB gratis y $0 de costo de transferencia/egress) combinado con Cloudinary para posters WebP.

---

## 2. Archivos Modificados y Creados

- Web Studio Simple/src/components/lesson/adult/AdultSidebar.tsx: Indicador canonico de 8 pasos, navegacion limpia y codificacion UTF-8.
- Web Studio Simple/src/components/lesson/adult/AdultLessonView.tsx: Enrutamiento secuencial lineal estricto de todos los botones y titulos dinamicos.
- Web Studio Simple/src/components/lesson/student/StudentLessonView.tsx: Adaptacion dinamica multi-asignatura con fallbacks limpios.
- Web Studio Simple/src/components/lesson/student/StudentInteractiveThermo.tsx: Tipografia normalizada en UTF-8.
- Web Studio Simple/src/components/lesson/adult/AdultHeader.tsx: Limpieza de separadores y codificacion.
- Web Studio Simple/src/components/lesson/student/StudentHeader.tsx: Limpieza de separadores y codificacion.
- Web Studio Simple/src/context/AppContext.tsx: Exposicion de activeSynchronizedLesson y setActiveSynchronizedLesson.
- Web Studio Simple/src/context/LessonSyncContext.tsx: Ciclo de vida y reseteo determinista.
- Web Studio Simple/src/components/parent/ParentDashboard.tsx: Deteccion automatica de lecciones inyectadas con findInjectedLesson.
- Web Studio Simple/src/lib/lesson-adapter.ts: Adaptador de JSON a tipos tipados de LessonData.
- Web Studio Simple/src/lib/lesson-repository.ts: Repositorio en memoria y cache de lecciones inyectadas.
- Web Studio Simple/public/data/injected_lessons_7b.json: Catalogo estatico de 29 lecciones de 7mo Basico.
- prisma/schema.prisma: Campos extendidos para contenido pedagogico completo.
- scripts/seed_lessons_to_db.mjs: Script generador y sembrador de lecciones en base de datos.

---

## 3. Verificacion de Compilacion

- Comando: npm --prefix "Web Studio Simple" run build
- TypeScript (tsc): 0 errores.
- Bundler Vite: 1627 modulos transformados exitosamente en 6.62s.
- Servidor de desarrollo: Operativo en http://localhost:5173.
