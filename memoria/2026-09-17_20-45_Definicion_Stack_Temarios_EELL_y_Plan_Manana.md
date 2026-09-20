# Bitácora de Sesión: Definición de Stack Tecnológico, Temarios EELL y Hoja de Ruta

**Fecha y Hora:** 2026-09-17 20:45 (Chile)  
**Contexto:** Auditoría profunda de la Clase 1 de Matemática, conciliación entre video y Word exportado, clarificación de arquitectura de base de datos, almacenamiento de videos y definición de tareas prioritarias para la siguiente sesión.

---

## 1. Decisiones Arquitectónicas y de Negocio Aprobadas

1. **EstudioSimple es exclusivamente para Exámenes Libres (MINEDUC):**
   - Se descartan de raíz los 628 OAs del currículum escolar tradicional presencial.
   - El universo del proyecto queda delimitado estrictamente por los **205 OAs oficiales** evaluados por el MINEDUC entre 3° y 8° básico, respaldados en la carpeta `d:\StudioSimple - Antigravity\TEMARIOS EELL/`:
     - 3° Básico: 29 OAs.
     - 4° Básico: 31 OAs.
     - 5° Básico: 39 OAs.
     - 6° Básico: 37 OAs.
     - 7° Básico: 35 OAs.
     - 8° Básico: 34 OAs.

2. **Modelo Pedagógico Canónico Obligatorio:**
   - La **Clase 1 del OA01 de Matemática (7° Básico)** detallada en `PROTOTIPO/Mapa_Flujo_Sincronizado_Clase1_OA1_EstudioSimple.docx` y en el prototipo funcional (`prototipo/app/page.tsx`) es la **Plantilla Maestra canónica**.
   - Queda estrictamente prohibido generar texto abstracto o de relleno ("dos exploradores cooperando", "pista inicial"). Cada lección debe incluir recuadros `DILE`, `HAZ`, `ESCUCHA`, `RESPUESTA ESPERADA`, ayudas socráticas escalonadas, 3 contextos reales de práctica, miniquiz formal de 3 preguntas (umbral 2/3), módulo de recuperación obligatoria con ítems equivalentes y cierre oral metacognitivo.

3. **Definición Definitiva del Stack Tecnológico y Costos:**
   - **Neon (PostgreSQL Serverless):**
     - Rol: Base de datos central para almacenar las lecciones estructuradas de los 205 OAs, usuarios, sesiones y progreso del estudiante.
     - Costo: **$0 USD**. Ocupa menos de 50 MB de los 500 MB incluidos en la capa gratuita (menos del 10% del límite).
   - **Railway (Hosting de la Aplicación Web):**
     - Rol: Despliegue continuo de la aplicación web conectada a Neon, para pruebas en producción con colaboradores externos.
     - Costo: Cubierto dentro del plan actual de Railway (consumo de ~150-200 MB de RAM).
   - **Cloudflare (Dominio, DNS y R2):**
     - Rol: Gestión del dominio, certificados SSL automáticos y almacenamiento de videos a 720p en Cloudflare R2.
     - Cálculo de Videos: 205 OAs x 5 lecciones x 2 videos por lección = **2.050 videos en total**.
     - Peso total a 720p: ~10 MB por video = **~20.5 GB**.
     - Costo: **$0 USD en fase inicial** (hasta 10 GB gratis). Al subir la totalidad de la enseñanza básica (20.5 GB), el costo de los 10.5 GB adicionales es de **$0.16 USD al mes**, con reproducciones y descargas ilimitadas a costo cero (cero egress fees).

---

## 2. Hoja de Ruta Inmediata para Mañana (Las 4 Tareas Sin Falta)

### Tarea 1: Saneamiento de Distractores del Repositorio
- Limpiar en `AGENTS.md` las menciones erróneas que empujan a los agentes hacia planillas de colegios tradicionales.
- Eliminar scripts viejos u obsoletos de ingesta (`ingest_excel_to_neon.py`, `seed.js`, `export_excel.js`, `prisma/dev.db`).
- Asegurar que ningún archivo contenga credenciales expuestas en repositorios públicos.

### Tarea 2: Sincronización del Catálogo y Esquema con los Temarios EELL (205 OAs)
- Ajustar `curriculum_catalog.json` y el esquema de Neon para contener únicamente los 205 OAs oficiales de Exámenes Libres (3° a 8° Básico).
- Garantizar que el selector de cursos y asignaturas muestre la información oficial del MINEDUC.

### Tarea 3: Vinculación Canónica de la Clase 1 al Generador de Planes Maestros (.docx)
- Conectar el guion de `Mapa_Flujo_Sincronizado_Clase1_OA1_EstudioSimple.docx` y `prototipo/app/page.tsx` a `lesson-generator.ts` y `docx-export.ts`.
- Validar que al descargar el Plan Maestro de Matemática (OA01), el documento contenga el recorrido del submarino, el ascensor, el termómetro, el miniquiz real y la recuperación conceptual, coincidiendo exactamente con la grabación del prototipo.

### Tarea 4: Optimización Mobile y Modernización del Panel Administrador
- Auditar y adaptar la interfaz en pantallas móviles (375px a 412px): menú hamburguesa en la barra superior, ajuste del scrubber en el Hero y tablas adaptables.
- Portar el diseño ejecutivo de administración desde Colegio Acrópolis (barra lateral `#0D1527` y tarjetas blancas `#F8FAFC`).

---

**Estado:** Sesión cerrada con acuerdos consolidados y especificaciones congeladas para inicio directo en la mañana.
