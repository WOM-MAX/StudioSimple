# Bitácora de Sesión: Conciliación de Temarios EELL y Textos Escolares MINEDUC

**Fecha**: 2026-09-16 21:40 (Hora Local)  
**Proyecto**: EstudioSimple - Prototipo Funcional de Lecciones y Portal Curricular  
**Estado**: Niveles 1 al 3 implementados y suite completa de habilidades experta en educación cargada localmente.

---

## 1. Resumen de lo Realizado en la Sesión

### A. Implementación de los 3 Niveles Arquitectónicos
1. **Nivel 1: Menú Principal y Dashboard (Estudiante y Apoderado)**:
   - Punto de inicio de la aplicación en `http://localhost:5173/` fijado en el Catálogo de Clases.
   - Pestañas funcionales para las 5 asignaturas oficiales de 7° Básico (Matemática, Ciencias Naturales, Historia, Lengua y Literatura, Inglés).
   - Hoja de ruta de Matemática OA 01 con 6 lecciones de 30 minutos vinculadas al Texto Escolar oficial del MINEDUC (Unidad 1 "Números", Lección 1, Páginas 6 a 25).
   - Botón directo `[ Entrar a la Clase 1 ]`. Se eliminó cualquier botón o enlace de administración de las pantallas públicas.

2. **Nivel 2: Macro-navegación en el Aula (Eliminación de Bloqueo)**:
   - Panel del Adulto: Botón `[ ← Salir al Menú ]` y migas de pan interactivas `7° Básico › Matemática › OA1 › Clase 1 (← Menú)`.
   - Panel del Estudiante: Botón `[ ← Menú ]` en la barra de cabecera.
   - Barra superior de control: Botón `[ Menú de Clases ]` / `[ Entrar a Clase 1 ]`.
   - Permite salir de la clase y volver al menú principal en cualquier momento sin perder la sincronización.

3. **Nivel 3: Portal de Administración Aislado (`/admin`)**:
   - Acceso protegido por contraseña en `http://localhost:5173/admin` (y redirección desde `/admin/generador`).
   - Credenciales: `admin@estudiosimple.cl` / `admin`.
   - Interfaz limpia construida en Vanilla CSS con variables oficiales del sistema de diseño (`--navy`, `--teal`, `--paper`).
   - Flujo de 2 pasos: Seleccionar Asignatura -> Seleccionar OA (con badges de prioridad del Temario de Exámenes Libres).
   - Ficha de referencia automática al libro de `MATERIALES/110-7`.
   - Generación con tecla Enter o clic: descarga el archivo `Plan_Maestro_[OA]_[N]Lecciones.docx` con portada, ficha curricular, referencias al libro del MINEDUC, dosificación de clases y guiones audiovisuales estandarizados.
   - Botones complementarios para copiar prompts para ChatGPT Work y JSON para la app.

### B. Estandarización de Guiones Audiovisuales
- **Paso 2 (Video Motivacional / Gancho)**: Estandarizado en exactamente 7 diapositivas (60 segundos aprox., estilo anime moderno, 13 años).
- **Paso 4 (Video Explicativo / Formalización)**: Estandarizado en exactamente 7 diapositivas (60 a 90 segundos aprox., un cambio visual por momento mental, letreros translúcidos delgados de 20 a 25 palabras).

---

## 2. Inyección de la Suite de Habilidades de Experto en Educación

Se estructuraron y cargaron localmente en `.agents/skills/` y se registraron formalmente en `AGENTS.md` las siguientes habilidades disciplinares y pedagógicas:

1. **`educational_expert`**: Principios DUA (Diseño Universal para el Aprendizaje), gestión de carga cognitiva, principio de chunking, taxonomía de Bloom y andamiaje (scaffolding).
2. **`curriculum_mineduc_expert`**: Bases Curriculares oficiales de Chile (Decretos 614/2013 y 369/2015), Temarios de Exámenes Libres (EELL), y uso de los Textos Escolares Oficiales como suelo de verdad (ground truth).
3. **`instructional_design_expert`**: Metodología de lecciones en 8 etapas para homeschooling, mediación adulto-estudiante sin jerga técnica, y articulación entre pantalla digital y cuaderno físico.
4. **`assessment_evaluation_expert`**: Psicometría formativa, construcción de ítems tipo MINEDUC/SIMCE, análisis riguroso de distractores con feedback correctivo inmediato (`fixExplain`) y bucles de recuperación (Recovery Loop).
5. **`expert_matematica`**: Didáctica matemática CPA (Concreto, Pictórico, Abstracto), 4 habilidades disciplinarias (Pólya en 4 pasos, modelar, representar, argumentar), y tratamiento de errores conceptuales en números enteros y álgebra.
6. **`expert_ciencias_naturales`**: Ciclo de indagación científica, biología de pubertad y sexualidad humana integral, física de fuerzas y presión, y química del modelo corpuscular.
7. **`expert_historia_ciencias_sociales`**: Pensamiento histórico (temporalidad, multicausalidad, cambio y continuidad), análisis de fuentes primarias y secundarias, y civilizaciones fluviales.
8. **`expert_lenguaje_literatura`**: 3 niveles de comprensión lectora oficiales (localizar, interpretar/relacionar, reflexionar/evaluar), narrativa, lírica y escritura en etapas.
9. **`expert_ingles`**: Enfoque comunicativo CLT (Reading, Listening, Writing, Speaking), gramática inductiva y andamiaje bilingüe para apoderados hispanohablantes.
10. **`gamification_simulators_expert`**: Mecánicas no punitivas y simuladores interactivos táctiles adaptados a neurodivergencia (TEA, TDAH).

---

## 3. El Hito Crítico Identificado: Conciliación Temarios EELL y Textos Escolares MINEDUC

### Diagnóstico del Problema
Hasta el momento, el generador producía lecciones mediante plantillas sintéticas basadas en descriptores curriculares, pero desconectadas del contenido textual interno de los libros de `CONOCIMIENTO/ACADEMICO/MATERIALES/110-7`.

Si solo se usa el Temario de Exámenes Libres, se inventan ejercicios teóricos que no coinciden con lo que el estudiante tiene en papel. Si solo se usa el Libro de Texto completo (150 a 200 páginas), la familia colapsa con contenidos y dinámicas de aula presencial que no entran en el examen libre.

### Modelo de Conciliación en 4 Capas
1. **Capa 1: El Temario como Filtro y Secuenciador**: El Temario EELL define qué OAs son evaluables y en qué orden. Se descarta todo contenido del libro que no pertenezca a los OAs priorizados (reducción de más del 40% de sobrecarga).
2. **Capa 2: Localización Canónica en el Libro**: Se fijan las páginas exactas del texto oficial para cada OA priorizado (ejemplo: Matemática OA 01 -> Unidad 1, Lección 1, páginas 6 a 25).
3. **Capa 3: Mapeo a las 8 Etapas de EstudioSimple**:
   - Situación inicial del libro -> Paso 2: Video Motivacional (7 slides).
   - Sección "Aprendo" del libro -> Paso 4: Video Explicativo (7 slides).
   - Sección "Practico" del libro -> Paso 5: Práctica en Cuaderno Físico (la app guía la resolución de los ejercicios de esa página).
   - Síntesis del libro -> Paso 6: Resumen y Estrategia.
   - Sección "¿Cómo voy?" del libro -> Paso 7: Miniquiz Formativo con análisis de distractores.
4. **Capa 4: El Puente Análogo-Digital**: La plataforma actúa como el tutor interactivo del libro escolar que la familia tiene en la mesa, resolviendo la duda del apoderado sobre qué estudiar y qué ejercicios realizar.

---

## 4. Próximos Pasos para Mañana

1. **Construir el extractor de contenido real**:
   - Crear un script para leer e ingestar las páginas 6 a 25 del archivo `Matemática.pdf` de la carpeta `MATERIALES/110-7`.
   - Estructurar en formato JSON los ejercicios, definiciones oficiales y problemas resueltos de esas páginas.
2. **Conectar el Generador de Lecciones con el contenido extraído**:
   - Reemplazar las plantillas sintéticas de `lesson-generator.ts` por los datos reales del libro escolar para el OA 01.
   - Validar que el archivo Word exportado y las lecciones interactivas utilicen los enunciados y problemas oficiales del MINEDUC.
3. **Revisión y retroalimentación conjunta con Walter**.
