# Bitácora de Sesión: Resolución Persistencia Cinta de Noticias y Reconstrucción Canónica Ciencias Naturales 7° Básico OA 01

- Fecha: 2026-10-03 10:15
- Entorno: Node 24 / Windows / Vite / Express / TypeScript
- Estado: Completado con éxito (código de salida 0 en compilación `npm run build`).

---

## 1. Problema de Persistencia de la Cinta de Noticias (Ticker Web)

### Causa Raíz
En `initialCmsExtrasData.ts` y en `initialCmsData.ts`, el objeto de configuración por defecto de la cinta de noticias (`cintaNoticias`) tenía `activo: true` codificado rígidamente. Al ingresar desde un dispositivo móvil o navegador web en sesión limpia (incógnito o sin datos previos en `localStorage`), el frontend recurría a ese valor por defecto y desplegaba la cinta independientemente de las modificaciones hechas en el panel de administración. Además, `localStorage` es estrictamente local por dispositivo y navegador, por lo que no existía persistencia compartida en servidor para la configuración del sitio.

### Solución Implementada
1. **Saneamiento de Valores por Defecto:**
   - En `initialCmsExtrasData.ts` y `initialCmsData.ts`, se modificó `activo: false` como estado base seguro.
2. **Persistencia Remota en Servidor:**
   - Se crearon los endpoints `GET /api/cms/site-config` y `POST /api/cms/site-config` en `server.js`.
   - Se habilitó la persistencia física en `data/site_config.json`.
3. **Sincronización Cliente-Servidor:**
   - `saveSiteConfig` envía automáticamente una petición `POST` al backend con la configuración actualizada.
   - En `LandingPage.tsx`, al montarse el componente (`useEffect`), se ejecuta una consulta `GET /api/cms/site-config` que sobreescribe el estado local con la configuración oficial del servidor, garantizando que todos los clientes (móviles y escritorio) compartan el mismo estado de visibilidad.

---

## 2. Reconstrucción Canónica de Ciencias Naturales 7° Básico OA 01

### Diagnóstico Previo
- El objetivo curricular oficial CN07 OA 01 ("Reconocer y valorar la sexualidad como dimensión integral...") carecía de desarrollo canónico para las clases 2 a 6, dependiendo de un generador genérico de ciencias no contextualizado.
- En la Clase 1 existía desfase entre el ejemplo del video explicativo y los ejercicios de la práctica.

### Acciones Ejecutadas
1. **Rediseño Canónico de las 6 Lecciones (14 láminas por lección = 84 láminas en total):**
   - **Clase 1: "Las 4 Dimensiones de la Sexualidad Humana":**
     - Sincronización isomórfica: la diapositiva 6 del video explicativo modela exactamente el Caso 1 de práctica (higiene y descanso como manifestación de la dimensión biológica).
   - **Clase 2: "Transformaciones Físicas y Emocionales en la Pubertad":**
     - Contenidos: Caracteres sexuales primarios y secundarios, activación del eje hipotálamo-hipófisis, testosterona, estrógenos y progesterona.
     - Isomorfismo: Diapositiva 6 modela el Caso 1 de práctica (distinción biológica entre caracteres primarios y secundarios).
   - **Clase 3: "Vínculos Afectivos, Respeto Mutuo e Intimidad":**
     - Contenidos: Dimensión afectiva, intimidad personal, comunicación asertiva y resolución de desacuerdos.
     - Isomorfismo: Diapositiva 6 modela el Caso 1 de práctica (diálogo empático y respeto a la intimidad frente al conflicto).
   - **Clase 4: "Responsabilidad Individual, Autocuidado y Consentimiento":**
     - Contenidos: Los 4 criterios obligatorios del consentimiento (libre, informado, específico y revocable), límites corporales y asertividad frente a la presión de grupo.
     - Isomorfismo: Diapositiva 6 modela el Caso 1 de práctica (negativa asertiva ante la exigencia de compartir contenido privado).
   - **Clase 5: "Mitos, Estereotipos y Convivencia Saludable":**
     - Contenidos: Variabilidad en el ritmo biológico del estirón puberal (ventanas de 10 a 16 años según la OMS), superación de estereotipos de género y convivencia escolar libre de burlas.
     - Isomorfismo: Diapositiva 6 modela el Caso 1 de práctica (refutación científica del mito del estirón puberal homogéneo).
   - **Clase 6: "Síntesis Integral y Evaluación Tipo Examen Libre":**
     - Contenidos: Integración de las 5 dimensiones humanas fundamentales, técnicas psicométricas de análisis de enunciado y descarte de distractores verosímiles en preguntas de 4 alternativas (A, B, C, D) tipo MINEDUC.
     - Isomorfismo: Diapositiva 6 modela el Caso 1 de práctica (resolución y descarte formal de un ítem de 4 alternativas sobre la multidimensionalidad de la sexualidad).

2. **Calibración Temporal y Visual de Prompts:**
   - 7 diapositivas de gancho motivacional: exactamente 60 segundos de locución (~130 palabras).
   - 7 diapositivas explicativas conceptuales: exactamente 90 segundos de locución (~195 palabras).
   - Duración total por clase: 150 segundos.
   - Protagonistas fijos en cada lámina: dúo co-protagónico de 13 años (joven mujer con trenzas y joven hombre con chaqueta cerceta), colaborando en formato anime moderno 16:9 con espacio negativo limpio y sin texto incrustado por IA.

3. **Arquitectura y Canales de Distribución:**
   - Creación de lecciones TypeScript en `Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase0[1-6].ts`.
   - Exportación centralizada en `Web Studio Simple/src/data/lessons/index.ts`.
   - Integración en `lesson-repository.ts` (`findCanonicalFactoryLesson`).
   - Inyección canónica en `lesson-generator.ts` (`generateOAPackage`).
   - Sincronización en `injected_lessons_7b.json` e `injected_lessons_all_grades.json`.
   - Compilación del archivo Word oficial canónico mediante `docx` (`buildOAPackageDocx`) en:
     - `PLANES MAESTROS PRESENTACIONES/Paquete_Maestro_EstudioSimple_7B/04_PLANES_OA_Y_PROMPTS/Ciencias_OA01.docx` (84,280 bytes).
     - `DESCARGA_LECCIONES/Ciencias_OA01.docx` y `Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx`.
     - `Web Studio Simple/public/descargas_planes_maestros/`.
   - Generación del archivo TXT oficial para ChatGPT Work:
     - `DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/Prompts_Work_Ciencias_7B_OA01.txt` (210,100 caracteres, 214,152 bytes, 84 láminas completas).
     - `Web Studio Simple/public/descargas_planes_maestros/Prompts_Work_Ciencias_7B_OA01.txt`.

---

## 3. Validación y Control de Calidad
- Comprobación TypeScript (`tsc`): 0 errores.
- Empaquetado de producción Vite (`vite build`): 1660 módulos transformados, 0 fallos, código de salida 0.
