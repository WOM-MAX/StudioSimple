# CONTRATO PEDAGÓGICO Y DE INTEGRACIÓN ESTUDIOSIMPLE
## ChatGPT ↔ Antigravity | Versión 1.0 de diagnóstico | 12 de octubre de 2026

**Naturaleza:** Documento de referencia para comparar reglas y arquitectura vigentes. **No reemplaza ni modifica archivos existentes.**

## 1. Propósito y autoridad
Establecer una interpretación verificable y compartida del diseño, integración, revisión y publicación de lecciones EstudioSimple. El usuario es la única autoridad de aprobación curricular de OA y lecciones. ChatGPT desarrolla y revisa contenidos pedagógicos en los encargos autorizados. Antigravity inspecciona, integra y mantiene el sistema y sus contratos técnicos, preservando contenido aprobado. Los agentes no se comunican automáticamente ni comparten memoria: la sincronización debe comprobarse en archivos y resultados versionados.

## 2. Alcance
Cinco asignaturas de 7.º básico: Matemática; Lengua y Literatura; Inglés; Ciencias Naturales; Historia, Geografía y Ciencias Sociales. La arquitectura busca reutilización entre OA y cursos, pero no se presumirá alcance universal sin pruebas. Los temarios oficiales y los OA autorizados delimitan contenidos. No introducir contenido de otra asignatura.

## 3. Reglas de diseño pedagógico ya acordadas
- Partir del OA, indicadores y temario aplicable; verificar fuentes reales y alcance curricular.
- Cada clase conserva continuidad conceptual entre gancho, explicación, actividades y evaluación. El ejemplo modelado debe preparar efectivamente las tareas posteriores; la revisión posterior al video debe coincidir con la clase completa.
- Incluir objetivo de aprendizaje de la lección en su inicio correspondiente.
- Enseñar con ejemplos completos y progresivos, no solamente consignas: explicación, modelado, guía, práctica, retroalimentación y comprobación pertinentes al OA.
- El estudiante debe poder resolver actividades obligatorias sin depender de un libro físico no provisto. Diferenciar referencias bibliográficas de dependencias necesarias.
- La intervención del adulto debe ser una mediación que acompaña la actividad del estudiante, sin alterar el contenido curricular ni reemplazar su trabajo.
- Mantener miniquiz y cierre; no retirarlos como supuesta simplificación.
- No dar por aprobada una lección por compilar correctamente o por renderizar sin errores.

## 4. Dos estructuras que no se deben confundir
### 4.1. Recorrido visible de la plataforma
La estructura de navegación acordada comprende ocho etapas, en este orden:
1. Inicio
2. Video Motivacional / Gancho
3. Recorrido
4. Video Explicativo
5. Práctica
6. Resumen
7. Miniquiz
8. Cierre

«Antes de comenzar» es una preparación no numerada. No se permite suponer que las ocho etapas equivalen a los doce pasos didácticos.

### 4.2. Procedimiento de doce pasos
Existe una referencia a `.agents/skills/estudiosimple-lecciones/SKILL.md`. **Los nombres y definiciones exactos de sus doce pasos deben extraerse de ese archivo vigente por Antigravity.** Este contrato no los inventa ni los redefine. Antigravity deberá construir una tabla que relacione cada paso documentado con su propósito, los campos reales del esquema, las ocho etapas visibles, las vistas y la validación. Cualquier ausencia, diferencia o incompatibilidad es hallazgo, no permiso para reescribir.

## 5. Contrato pedagógico de una clase (independiente del formato de datos)
Toda clase debe poder responder, con evidencia en su contenido, a estas preguntas:
1. **Identidad curricular:** ¿qué curso, asignatura, OA e indicadores aborda?
2. **Meta:** ¿qué aprenderá el estudiante y cómo se reconocerá ese aprendizaje?
3. **Activación:** ¿qué conocimientos o situación anterior ayudan a comprender el contenido?
4. **Motivación:** ¿qué problema o pregunta moviliza el gancho y cómo reaparece cuando corresponde?
5. **Enseñanza:** ¿qué contenido se explica explícitamente, con precisión disciplinar?
6. **Modelado:** ¿qué ejemplo se desarrolla paso a paso, con evidencia suficiente para que el estudiante vea cómo pensar y proceder?
7. **Participación guiada:** ¿cómo ensaya el estudiante con apoyo gradual?
8. **Práctica:** ¿qué realiza el estudiante usando aquello que realmente se enseñó?
9. **Retroalimentación:** ¿cómo conoce la calidad de su respuesta y comprende posibles errores?
10. **Síntesis:** ¿qué conceptos e ideas se recuperan sin incorporar contenidos ajenos?
11. **Comprobación:** ¿cómo se verifica el logro con preguntas alineadas con los contenidos tratados?
12. **Cierre y continuidad:** ¿cómo se consolida lo aprendido y enlaza con lo siguiente?

**Estas doce preguntas son criterios de calidad transversal, NO una sustitución de los doce pasos oficiales de la skill.** No obligan a crear doce pantallas ni doce propiedades nuevas.

## 6. Reglas específicas por asignatura
- **Matemática:** rigor de procedimientos, signos, representaciones, datos, ejemplos resueltos y correspondencia entre operación, contexto y respuesta. Detectar errores matemáticos antes de integrar.
- **Lengua y Literatura:** trabajar con textos o fragmentos efectivos y accesibles; evidencia textual visible; modelar inferencia, conflicto, narrador, personajes, secuencia u otros aspectos pertinentes al OA. No exigir un texto externo inexistente.
- **Inglés:** adaptar los ejemplos y prácticas a la habilidad comunicativa pertinente; conservar el inglés donde es contenido de aprendizaje y explicar apoyos en términos apropiados. No trasladar elementos de Inglés a otras asignaturas.
- **Ciencias Naturales:** precisión científica, progresión conceptual y alineación del caso explicado con actividades; evitar afirmaciones no justificadas por el OA o las fuentes.
- **Historia, Geografía y Ciencias Sociales:** contextualizar hechos, interpretar fuentes y evidencias pertinentes y distinguir afirmaciones, fuentes e inferencias.

Las reglas más detalladas de cada asignatura deberán localizarse en sus planes maestros vigentes; los resúmenes precedentes no los reemplazan.

## 7. Material audiovisual y continuidad
El OA completo puede incluir Gancho → Lección → Juego → Quiz; no confundir este proceso de producción con la navegación interna de una clase. Para los materiales audiovisuales aprobados: gancho 60 s exactos y explicación 90 s exactos; explicación sin desafío final porque la práctica sigue después. Mantener continuidad del protagonista y escenario según el OA y sus fuentes aprobadas; formato 16:9; texto legible a escala reducida; sin cortinas negras invasivas ni superposición; objetivo inicial de la explicación; textos y matemática de alto contraste, y subtítulos de 48 pt en Lengua, Inglés, Ciencias e Historia según reglas vigentes. La elaboración audiovisual y PPTX es una fase separada, nunca un requisito implícito de esta auditoría.

## 8. Correspondencia entre fuente y editor
Para cada lección, la cadena real de transformación debe quedar identificada con pruebas: insumo curricular → fuente de edición → validación → representación canónica → formatos derivados → editor → vistas estudiante/adulto → estado de aprobación. El nombre «canónico» no se asigna por preferencia: debe demostrarse mediante la precedencia y el código. Ningún formato derivado puede adquirir silenciosamente autoridad sobre contenido aprobado. Si la sincronización es manual, registrarlo como riesgo; no afirmar automatización.

## 9. Contrato técnico de integración
- La forma concreta del objeto, campos y tipos se toma del repositorio real, no de este documento.
- Los componentes compartidos deben renderizar por esquema y no por identificador de OA.
- Los campos opcionales, incluido `GuidedItem.teachingBox` cuando exista, se utilizan con justificación pedagógica, sin insertarlos automáticamente en todas las preguntas.
- La vista del adulto y del estudiante puede diferir en orientación e interacción, pero no en contenidos curriculares contradictorios.
- Un cambio de esquema exige comprobar compatibilidad de lectura, transformación, serialización y renderizado antes de publicarse.
- Nunca modificar lecciones ajenas al alcance autorizado para demostrar universalidad.

## 10. Estados, autorización y cambios
Los estados EN_REVISION, WORK_PRE_APROBACION y APROBADA son distintos; su autoridad debe verificarse en el repositorio. No inferir aprobación desde un build exitoso. El usuario aprueba explícitamente; ninguna IA puede aprobar una lección por cuenta propia. Una lección aprobada permanece intacta salvo autorización expresa. Matemática OA01 aprobada permanece intacta; Matemática OA04 está en revisión y no se convierte en aprobada por esta auditoría. No generar PPTX nuevo de OA04 antes de aprobación.

## 11. Sincronización ChatGPT–Antigravity
Los dos agentes deben compartir una especificación versionada, un identificador de lección, una autoridad curricular y una comprobación de equivalencia entre fuente y editor. No hay sincronización automática de memorias entre agentes. El mecanismo viable es trazabilidad documentada, diferencias detectables y confirmación humana antes de cambios en reglas aprobadas. Antigravity no debe reescribir contenido que ChatGPT preparó y fue aprobado; ChatGPT no debe asumir capacidades técnicas no verificadas en Antigravity.

## 12. Diagnóstico de sincronización obligatorio (solo lectura)
Antigravity deberá:
1. Localizar matrices globales, cinco planes específicos, `AGENTS.md`, skill vigente y reglas de aprobación; informar rutas y versiones.
2. Extraer los doce pasos EXACTOS de la skill, sin reconstruirlos.
3. Comparar cada regla de este contrato contra documentación y código existentes con clasificación COINCIDE / DIFIERE / NO DOCUMENTADO / NO EVALUABLE.
4. Trazar la correspondencia entre las ocho etapas visibles y los doce pasos documentados, sin forzar equivalencias uno a uno.
5. Identificar cuál es la fuente real de verdad y cómo se transforma el `.md`, `.ts` y JSON hasta las dos vistas.
6. Comparar una clase real en revisión (Lengua OA03 Clase 01) con los datos realmente consumidos por el editor y las vistas; conservar miniquiz y cierre.
7. Verificar en solo lectura la presencia de contratos reutilizables, `teachingBox`, validación curricular y bloqueo de aprobación.
8. Separar contradicción pedagógica, fallo técnico, diferencia de versiones y falta de evidencia.
9. Proponer solo las correcciones universales mínimas justificadas por hallazgos, sin implementarlas.
10. Entregar informe con evidencia por archivo/ruta/función y un listado de dudas no comprobables; sin modificar código, lecciones ni datos.

## 13. Formato de informe exigido
A. Resumen de concordancia con este contrato.  
B. Inventario de reglas con rutas y autoridad.  
C. Tabla completa de correspondencia: regla → implementación real → evidencia → estado.  
D. Ocho etapas y doce pasos: correspondencia real y lagunas.  
E. Fuente de verdad y recorrido real de datos.  
F. Evidencia en Lengua OA03 Clase 01.  
G. Brechas priorizadas por bloqueo real.  
H. Plan mínimo de corrección sistémica (sin ejecución).  
I. Elementos expresamente intocables.  
J. Confirmación de solo lectura y veredicto SINCRONIZADO / PARCIAL / NO SINCRONIZADO / NO EVALUABLE, con justificación.

## 14. Prohibiciones
No editar fuentes, Markdown, JSON, TypeScript, documentos de reglas, DB ni estados; no crear parches por OA; no regenerar ni publicar; no tocar otros módulos de la App; no homologar ocho etapas con doce pasos sin evidencia; no declarar sincronización por mera coincidencia de nombres; no alterar OA01 aprobado ni OA04 en revisión. Los comandos que escriben artefactos solo podrán utilizarse fuera del proyecto si se garantiza aislamiento y son necesarios; en caso de duda, omitirlos.

## 15. Criterio para cerrar esta fase
La fase termina cuando existe un informe verificable que permite saber si ambos agentes están describiendo y utilizando **la misma clase** a nivel pedagógico y técnico, qué diferencias reales hay y qué cambio compartido mínimo haría falta. La fase NO requiere corregir, volver a inventariar todo el proyecto, reconstruir planes maestros ni producir clases nuevas.
