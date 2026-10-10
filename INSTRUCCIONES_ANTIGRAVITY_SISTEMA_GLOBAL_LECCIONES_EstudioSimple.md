# INSTRUCCIÓN ÚNICA PARA ANTIGRAVITY
## Sistema global de lecciones EstudioSimple, cinco módulos y piloto de Ciencias

### 0. Encargo

Implementa, en una carpeta de entrega aislada, un sistema común de planificación, producción y control de lecciones para EstudioSimple, con cinco módulos disciplinares y una aplicación piloto completa a Ciencias Naturales, 7.º Básico, OA01, Clase 1.

Ejecuta las etapas en el orden de este documento. No comiences por generar o corregir una lección. No detengas tareas independientes por una fuente faltante o un conflicto: registra el punto exacto, no inventes una respuesta y continúa todo lo que no dependa de él. No hagas preguntas intermedias sobre decisiones que ya están fijadas aquí.

Este encargo define el sistema para los niveles de 3.º a 8.º Básico. **En esta ejecución no debes producir lecciones para todos esos niveles ni para las cinco asignaturas.** Debes crear el sistema reutilizable, los cinco módulos y únicamente el piloto especificado en la sección 10.

### 1. Decisiones obligatorias del proyecto

Aplica estas decisiones literalmente. No las reinterpretes ni las sustituyas por instrucciones de informes anteriores:

1. El sistema tiene una sola estructura global para 3.º–8.º Básico.
2. Existen cinco módulos reutilizables, uno por asignatura: Matemática; Lengua y Literatura; Inglés; Ciencias Naturales; e Historia, Geografía y Ciencias Sociales. No crees módulos separados por nivel. Para un nivel dado, aplica un módulo solo si la asignatura aparece en el temario correspondiente.
3. Cada OA se planifica en seis clases, conforme a su Plan Maestro vigente. La ejecución actual produce completa únicamente la Clase 1 del OA piloto.
4. Cada clase tiene exactamente estas ocho etapas, con estos rótulos y en este orden:
   1. Inicio
   2. Video Motivacional
   3. Recorrido
   4. Video Explicativo
   5. Práctica
   6. Resumen
   7. Miniquiz
   8. Cierre
5. No agregues, elimines, combines, dividas, renombres ni reordenes esas ocho etapas.
6. El Video Motivacional tiene exactamente siete diapositivas. El Video Explicativo tiene exactamente siete diapositivas. Son catorce diapositivas en total, pertenecientes exclusivamente a esos dos videos. No representan la clase completa. Las otras seis etapas siguen siendo componentes separados de la clase.
7. En este encargo, “Gancho” es solo otra forma de referirse al Video Motivacional; no es una etapa ni un video adicional.
8. “Antes de comenzar” es preparación previa a la clase. No es una novena etapa ni reemplaza Inicio.
9. La revisión de duraciones de videos queda fuera de este encargo. No la midas, cambies, audites ni uses como motivo de rechazo.
10. Conserva todo contenido y archivo existente que cumpla. Corrige únicamente incumplimientos demostrables y localizados.
11. Una vez que Walter apruebe el sistema y el piloto, el sistema podrá aplicarse a las demás asignaturas y niveles. Antigravity no tiene autoridad para otorgar esa aprobación.

### 2. Autoridad de las fuentes

No uses una única jerarquía para asuntos que pertenecen a dominios diferentes. Aplica esta autoridad por materia:

- **Alcance, entregables y reglas invariables de este encargo:** los fija este documento.
- **Texto literal del OA, contenidos, habilidades y exigencias curriculares:** los fijan el currículo oficial y el temario vigente del nivel y asignatura. No reescribas ni simplifiques el OA oficial.
- **Secuencia de seis clases, objetivos de cada clase, actividades, mediación y requisitos pedagógicos de un OA:** los fijan el Plan Maestro vigente de ese OA y el Manual Maestro, respetando las reglas invariables de este encargo.
- **Rótulos y orden visibles de la aplicación:** los fija la captura adjunta con las ocho etapas indicadas en la sección 1. Usa esos nombres literalmente. Un informe anterior que proponga otros rótulos no los cambia.
- **Ejecución del proceso:** la guían las skills vigentes de Antigravity solo cuando no contradicen las reglas anteriores.
- **Informes anteriores, resultados de auditoría y entregables previos:** son evidencia para localizar problemas; no son autoridad para cambiar silenciosamente el currículo, una decisión vigente o material aprobado.

Si dos fuentes discrepan sobre una materia, registra el nombre exacto de cada archivo, la sección o página y la decisión afectada. No inventes una regla ni cambies el contenido curricular para resolver el conflicto. Continúa las tareas independientes. Marca como **PENDIENTE DE FUENTE** cualquier validación que no pueda hacerse con evidencia disponible.

### 3. Insumos, límites de edición y destino

#### 3.1 Insumos que debes revisar

1. Revisa los materiales pertinentes disponibles en `D:\StudioSimple - Antigravity\INSUMOS`.
2. Revisa dentro del proyecto `D:\StudioSimple - Antigravity` las skills vigentes, sus reglas, perfiles, plantillas, catálogos y validadores relacionados con planificación, lecciones, guiones, evaluación y control de calidad.
3. Revisa el Manual Maestro, los Planes Maestros pertinentes, el temario y las fuentes curriculares del piloto, la captura adjunta, la implementación actual pertinente y los scripts de generación o validación necesarios para entender el formato existente.
4. Registra una lista de archivos efectivamente leídos, sus rutas y, cuando esté disponible, versión o fecha. No declares haber revisado un archivo al que no tuviste acceso. El nombre de un archivo, por sí solo, no demuestra que su contenido sea oficial o vigente.
5. Limita la revisión a los materiales necesarios para este encargo. No abras una auditoría general de la aplicación, de otros OA o de otros productos.

Si una ruta o archivo no está disponible, registra la ruta exacta, qué comprobación impide y qué trabajo sí puedes continuar. No sustituyas silenciosamente una fuente faltante por una fuente externa o por un informe anterior.

#### 3.2 Protección y carpeta de entrega

- No modifiques, muevas, renombres ni reemplaces archivos originales de `INSUMOS`.
- No modifiques las skills activas ni registres o instales una segunda skill activa con el mismo propósito durante esta ejecución.
- Usa los materiales actuales como base de lectura. Copia al paquete de entrega únicamente las skills y archivos pertinentes que deban formar parte de la propuesta; edita esas copias. Conserva el contenido válido y registra la ruta original de cada copia.
- No modifiques código de la aplicación web en producción, bases de datos, cuentas, pagos, infraestructura, despliegues, almacenamiento remoto ni ramas remotas de Git. No publiques ni hagas push.
- No ejecutes scripts con efectos fuera de la carpeta de entrega. Para validar, usa copias y pruebas locales aisladas.
- Guarda todo lo producido en `D:\StudioSimple - Antigravity\SALIDA_SISTEMA_LECCIONES_V2`.
- Si esa carpeta ya existe, no sobrescribas archivos: crea dentro una subcarpeta `EJECUCION_YYYY-MM-DD_HHmm` usando la hora local de Santiago. Usa esa subcarpeta como raíz de esta entrega.
- La carpeta de entrega es una propuesta en preparación; no la actives ni cambies estados de aprobación. Incluye un mapa que relacione cada archivo de origen con su archivo propuesto.

### 4. Orden de ejecución

Realiza exactamente estas fases:

**Fase 1 — Inventario y línea base.** Localiza los insumos, las skills canónicas, los planes, el temario, las fuentes del piloto, los generadores y el validador existente. Registra qué existe, qué falta, qué está aprobado y qué no pudiste comprobar. Antes de editar cualquier copia, registra una línea base de los campos pedagógicos que deben protegerse.

**Fase 2 — Estructura global.** Define el flujo común desde las fuentes del OA hasta la entrega y aprobación. Incluye fuentes, ficha del OA, seis clases, formato de las ocho etapas, videos 7+7, adaptación por nivel, vistas del estudiante y del adulto, generación, validación, correcciones, protección y control de versiones.

**Fase 3 — Cinco módulos disciplinares.** Crea o adapta exactamente un módulo por cada asignatura indicada en la sección 1. Cada módulo debe explicar su método de enseñanza y evaluación dentro de la estructura común; no debe crear otra estructura.

**Fase 4 — Plantilla y controles.** Crea o adapta la ficha reutilizable del OA, la matriz y el catálogo de reglas, y un validador que examine archivos reales o fixtures fieles a la estructura real. Ejecuta las pruebas de la sección 9. Si estas pruebas demuestran un defecto del validador o del catálogo, corrígelo en la copia de entrega y vuelve a ejecutar esa prueba antes del piloto. El validador debe pasar sus pruebas antes de iniciar el piloto; si no pasa, no inicies el piloto y registra el bloqueo. Congélalo al iniciar el piloto. No uses una corrección del sistema como motivo para reescribir contenido del piloto.

**Fase 5 — Piloto.** Aplica ambas capas al piloto definido en la sección 10. Revisa la clase completa antes de proponer cambios.

**Fase 6 — Corrección única y cierre.** Consolida todos los incumplimientos demostrados en una sola lista, corrige solo esos elementos en una pasada y vuelve a comprobarlos. Entrega el resultado con uno de los estados de la sección 11. No comiences otra ronda de mejoras editoriales.

### 5. Estructura global común

La skill global debe especificar, como mínimo:

1. propósito y alcance de 3.º–8.º Básico;
2. las fuentes y la autoridad por dominio descritas en la sección 2;
3. el flujo de trabajo desde el inventario del OA hasta el resultado para revisión de Walter;
4. planificación de seis clases por OA, con progresión y evidencia propia de cada clase;
5. las ocho etapas invariables, con rótulos y orden exactos;
6. siete diapositivas exactas para cada uno de los dos videos;
7. adaptación al nivel sin alterar el OA, las etapas ni los conteos;
8. coordinación entre lo que ve/hace el estudiante y lo que ve/dice/hace el adulto;
9. ficha del OA, guiones, formatos de salida y proceso de generación existentes;
10. controles curriculares, disciplinares, pedagógicos, lingüísticos, visuales, técnicos y de accesibilidad que sean pertinentes;
11. línea base, protección de campos, severidades, tolerancias, una pasada de corrección, versiones y aprobación.

La estructura global fija el proceso común. No impone una metodología disciplinar única ni crea reglas distintas de estructura por grado. Los módulos definen cómo enseñar y evaluar cada asignatura dentro de ese marco.

### 6. Cinco módulos disciplinares

Entrega exactamente estos cinco módulos: `Matemática`, `Lengua y Literatura`, `Inglés`, `Ciencias Naturales` e `Historia, Geografía y Ciencias Sociales`.

Cada módulo debe precisar:

1. cómo interpretar el OA y el temario de esa asignatura;
2. qué estrategias de enseñanza corresponden a la disciplina;
3. qué evidencia muestra el aprendizaje esperado;
4. cómo completar cada una de las ocho etapas con contenido de esa asignatura;
5. cómo elaborar los dos videos de siete diapositivas usando el storyboard vigente del OA;
6. qué prácticas y representaciones son adecuadas;
7. cómo evaluar y retroalimentar conforme al OA y al temario;
8. qué errores, concepciones o confusiones disciplinares comprobar;
9. qué apoyos y pistas pueden usarse sin revelar anticipadamente la respuesta;
10. criterios disciplinares para que la clase quede **APTA PARA REVISIÓN DE WALTER**.

El miniquiz mantiene el formato común de selección múltiple definido en la sección 8. Las demás actividades y evidencias pueden usar el formato que requiera el OA y el Plan Maestro.

Usa estos controles disciplinares mínimos, solo cuando correspondan al OA:

- **Matemática:** recalcular operaciones y claves desde los datos originales; comprobar signos, unidades, escalas, gráficos, procedimientos y condiciones del problema. No usar un método de resolución como plantilla obligatoria cuando no aporte al objetivo.
- **Lengua y Literatura:** verificar integridad y atribución de textos; justificar respuestas con evidencia del estímulo; distinguir información explícita de inferencia e interpretación; no imponer una única lectura cuando el texto admite respuestas distintas bien fundamentadas.
- **Inglés:** especificar el idioma de cada instrucción, estímulo y respuesta; comprobar corrección y naturalidad; no afirmar que se validó comprensión auditiva si no se revisó el audio; no traducir de modo que la traducción revele la respuesta del ejercicio.
- **Ciencias Naturales:** comprobar afirmaciones con fuentes; distinguir observación, evidencia, modelo e inferencia; revisar que diagramas y relaciones científicas sean correctos; no solicitar revelaciones personales ni presentar una actividad como diagnóstico individual.
- **Historia, Geografía y Ciencias Sociales:** comprobar ubicación temporal y espacial, fuentes, evidencia, mapas y causalidad; evitar anacronismos; distinguir hechos documentados, reconstrucciones e interpretaciones.

Las reglas particulares de un OA se aplican únicamente a ese OA y deben conservar su procedencia. No las conviertas en reglas universales. Conserva el estilo, funciones, cantidad de personajes, diversidad y excepciones por asignatura ya aprobados en los planes vigentes. Ajusta la apariencia visual a la edad del nivel sin inventar elencos o roles nuevos.

### 7. Ficha reutilizable del OA y fuente de contenido

Antes de planificar una clase, completa una ficha con estos campos:

- nivel y asignatura;
- código y texto literal del OA;
- nombre, versión, página o sección de cada fuente curricular consultada;
- contenidos, habilidades y criterios del temario aplicables;
- conocimientos previos necesarios, con fuente cuando corresponda;
- evidencia que demostrará el aprendizaje;
- secuencia completa de seis clases del OA;
- subobjetivo, contenido enseñado y evidencia de cada clase;
- módulo disciplinar que se aplica;
- apoyos o ajustes necesarios para ese nivel;
- storyboard de Video Motivacional y Video Explicativo;
- materiales, recursos o datos que la fuente exige;
- conflictos, archivos faltantes y comprobaciones pendientes.

No inventes OA, contenidos, fuentes, citas, criterios de evaluación, datos ni resultados esperados. Mantén el texto oficial del OA intacto; adapta ejemplos, vocabulario, explicación y apoyos para que sean adecuados al nivel, sin reemplazar el aprendizaje oficial.

Si el proyecto ya tiene una fuente estructurada canónica para el OA, úsala como fuente única y genera desde ella los formatos derivados vigentes. No edites por separado DOCX, TXT, TypeScript, manifest u otros derivados. Conserva identificadores estables y compara los campos pedagógicos correspondientes entre salidas. Si no puedes confirmar cuál es la fuente canónica, documenta el hallazgo; no crees otra cadena paralela ni afirmes igualdad no comprobada.

### 8. Formato de cada clase

En cada una de las ocho etapas, separa claramente:

- qué ve y hace el estudiante;
- qué ve, dice y hace el adulto;
- instrucciones literales, respuesta o desempeño esperado, pista y retroalimentación cuando correspondan;
- respuesta correcta o clave privada, sin mostrarla al estudiante antes de responder.

Las indicaciones del adulto deben poder usarse sin exigirle preparación pedagógica previa. Si la fuente establece un tiempo de espera, consígnalo. Si no lo establece, indica “esperar la respuesta del estudiante”; no inventes un número de segundos.

`Antes de comenzar` contiene solo la preparación previa que el adulto necesita para disponer la clase. No la repitas como una novena etapa ni como contenido de Inicio. Inicio contiene las indicaciones para abrir la sesión y guiar al estudiante en ese momento.

1. **Inicio:** ubica la clase en la asignatura y el OA; comunica el foco u objetivo de la clase; activa conocimientos o presenta la situación inicial; muestra la ruta de la sesión. No incluyas aquí la lista de preparación previa del adulto.
2. **Video Motivacional:** presenta el gancho de exactamente siete diapositivas; despierta interés y conecta con el OA sin reemplazar la explicación formal. Las instrucciones antes o después del video van fuera de sus siete diapositivas.
3. **Recorrido:** etapa independiente entre ambos videos. Incluye la exploración o conversación guiada definida en el plan. Por pregunta, consigna la pregunta, respuesta esperada, pista y retroalimentación. No la insertes dentro de los videos.
4. **Video Explicativo:** presenta exactamente siete diapositivas y desarrolla el concepto, procedimiento o habilidad central del subobjetivo conforme al storyboard vigente. No agregues una octava diapositiva. Si el plan contempla comprobaciones después del visionado, preséntalas como interacción de la aplicación dentro de esta etapa, fuera de las siete diapositivas. No inventes comprobaciones ausentes del plan.
5. **Práctica:** incluye las actividades y evidencias previstas por el plan y el temario. Para cada actividad, especifica consigna, indicación del adulto, resultado esperado, pasos cuando sean necesarios, pistas, retroalimentación y vínculo con el subobjetivo y el OA. Usa el cuaderno físico cuando corresponda.
6. **Resumen:** recupera solo ideas, procedimientos o estrategias efectivamente enseñados y practicados. No introduzcas materia nueva.
7. **Miniquiz:** incluye exactamente tres preguntas vinculadas con el subobjetivo. Cada pregunta debe contener alternativas, respuesta correcta y retroalimentación. Al menos dos respuestas correctas permiten aprobar y avanzar. Mantén la clave fuera de la vista del estudiante antes de responder. Si obtiene menos de dos, aplica la recuperación especificada en el Plan Maestro: explicación o pista, nueva práctica y un nuevo intento con ítems equivalentes cuando así lo establezca el plan. No inventes intentos adicionales ni un resultado posterior que las fuentes no definan; registra como pendiente cualquier regla necesaria que falte.
8. **Cierre:** incluye síntesis, reflexión o metacognición y transferencia solo en la forma prevista por el plan. Incluye continuidad hacia la clase siguiente únicamente cuando corresponda. No incorpores contenido nuevo de otra etapa.

No cambies la estructura de ocho etapas para acomodar contenidos. Si una función pedagógica del Plan Maestro tiene otro nombre, asígnala a la etapa correspondiente y registra la equivalencia; no cambies el rótulo de la aplicación.

### 9. Videos, generación y validador

#### 9.1 Videos

Para **cada diapositiva** de ambos videos registra: número del 1 al 7, propósito, texto visible, descripción visual, guion oral, relación con OA/subobjetivo y fuente cuando corresponda. El conteo de siete incluye cualquier portada, título o cierre que pertenezca al video: no agregues una diapositiva extra fuera del conteo.

Respeta el storyboard vigente de la asignatura y el OA; no impongas un storyboard genérico. Si sus unidades de contenido no coinciden con siete diapositivas, redistribúyelas dentro de siete diapositivas preservando todos los contenidos aprobados, sin agregar, eliminar ni repetir enseñanza. Si no es posible hacerlo sin alterar contenido o sentido, registra el conflicto y deja ese video **PENDIENTE DE FUENTE**; no inventes una solución.

Mantén requisitos vigentes de identidad visual, idioma, personajes, contraste, tipografía, audio, nombres de archivos y notas del orador según cada Plan Maestro. Extrae valores de la versión vigente; no inventes valores ni extiendas a todas las asignaturas una excepción particular. Cuando el flujo aprobado indique que el texto se agrega en una capa editable posterior, no pidas a la herramienta de imagen que escriba ese texto. No uses elementos visuales que tapen texto, evidencia o partes necesarias de la imagen.

El resultado de esta ejecución es el paquete pedagógico fuente del piloto: estructura de clase, contenidos de estudiante y adulto, guiones/storyboards de ambos videos y recursos de práctica/evaluación en los formatos vigentes del proyecto. No renderices PPTX, audio o video, no publiques y no despliegues la aplicación en esta ejecución.

#### 9.2 Catálogo y validador

Revisa el catálogo y validador existentes antes de cambiarlos. Corrige solo defectos confirmados y pertinentes. Cada regla debe tener ID único, alcance, severidad fijada en el catálogo, fuente, evidencia requerida y método real de validación. El validador debe derivar el total de reglas del catálogo, no de un número escrito manualmente. Ningún dato de entrada puede reducir o cambiar la severidad definida por catálogo.

Ejecuta las reglas sobre archivos reales del paquete o fixtures que reproduzcan fielmente su estructura. Una prueba que recibe hallazgos previamente preparados no demuestra que el validador encuentre errores.

Comprueba expresamente:

1. que detecta campos protegidos modificados, eliminados y agregados sin autorización;
2. que verifica las ocho etapas, sus rótulos y su orden;
3. que cuenta exactamente siete diapositivas por video;
4. que verifica el miniquiz de tres preguntas, sus claves/retroalimentaciones y el umbral de dos aciertos;
5. que detecta fuentes curriculares faltantes o citas sin evidencia;
6. que informa todos los defectos encontrados en una diapositiva aunque una regla anterior ya haya fallado;
7. que cada regla conserva su código y severidad correctos y no reutiliza códigos disciplinares para controles de tipografía u otra área;
8. que el total de reglas coincide con el catálogo real y resuelve por conteo la discrepancia previa entre 45 y 47, si todavía existe;
9. que no afirma una comparación de versiones si no hay línea base;
10. que no afirma validación de una clase real si solo se ejecutaron fixtures.

Incluye pruebas positivas y negativas para estructura, conteos, miniquiz, fuentes, severidades, campos protegidos y múltiples defectos simultáneos. Registra los archivos comprobados, las pruebas ejecutadas y sus resultados. No afirmes integración o validación de la aplicación en vivo si no la ejecutaste; esta tarea no autoriza modificarla.

### 10. Piloto único

Cuando las fases 1–4 estén completas, aplica el sistema únicamente a:

- asignatura: Ciencias Naturales;
- nivel: 7.º Básico;
- OA: OA01;
- clase que se produce completa: Clase 1 del Plan Maestro vigente.

Conserva en la ficha la secuencia de seis clases del OA, pero no generes ni reescribas las Clases 2–6. No apliques este piloto a otras asignaturas ni a otros OA.

Revisa la Clase 1 completa, con las ocho etapas, los rótulos y el orden fijados, siete diapositivas de Video Motivacional y siete de Video Explicativo, más las otras seis etapas como componentes separados. Comprueba la coordinación entre estudiante y adulto y la relación entre fuentes, OA, subobjetivo, guiones, videos, práctica, miniquiz, recuperación y cierre.

Reutiliza el contenido existente que cumpla. En este OA, no solicites datos personales ni revelaciones íntimas al estudiante; comprueba que las afirmaciones científicas tengan fuente y que las explicaciones no presenten un diagnóstico individual. No corrijas el enfoque del plan por preferencia: toda corrección debe citar el incumplimiento y la fuente aplicable.

### 11. Severidad, tolerancia, corrección y aprobación

Usa estas categorías; no rebajes una severidad para cumplir el margen:

- **Crítico:** contenido o clave incorrectos; OA o fuente inventados; error científico sustantivo; fuga de una respuesta privada antes de responder; contradicción que induce aprendizaje falso. Bloquea.
- **Mayor:** falta una etapa o requisito obligatorio; conteo u orden incorrecto; actividad irrealizable; evidencia o evaluación no alineada; problema que impide comprender, leer o completar la tarea; defecto repetido que revela una falla sistémica. Bloquea.
- **Menor:** defecto aislado de redacción o presentación que no altera significado, aprendizaje, acceso, legibilidad, estructura ni evaluación.
- **Preferencia:** alternativa distinta pero igualmente válida. No es incumplimiento y no se cambia.
- **Pendiente de fuente:** falta evidencia para ejecutar una comprobación. No es menor ni equivale a conformidad; si afecta un criterio esencial del piloto, impide declararlo apto.

El margen de aprobación es cero críticos, cero mayores y hasta tres menores aislados en la Clase 1. Tres menores no compensan un crítico o mayor. Un mismo defecto que se repite en varias diapositivas o etapas se clasifica como sistémico, no como varios menores. Si la primera revisión encuentra más de tres menores, incluye en la misma lista consolidada los cambios mínimos necesarios para dejar como máximo tres.

Para cada corrección propuesta registra: ID, regla, severidad, archivo y ruta, OA/clase/etapa/diapositiva/campo, texto actual exacto, reemplazo exacto, fuente que lo exige, dependencias directas y campos que deben permanecer idénticos. No uses instrucciones vagas como “mejorar”, “hacer más coherente” o “ajustar todo”. No reescribas contenido correcto por estilo o preferencia.

Realiza una sola pasada consolidada de corrección del piloto, después de completar su revisión inicial. Las correcciones del validador o del catálogo pertenecen a la Fase 4 y deben quedar terminadas antes de iniciar el piloto; no son una segunda pasada de corrección del contenido de la clase. Después de la única pasada del piloto, vuelve a ejecutar las pruebas que fallaron y la comprobación de campos protegidos. No añadas preferencias ni hallazgos editoriales nuevos en esa verificación. Si queda un crítico, mayor, más de tres menores o un pendiente de fuente esencial, informa **NO APTO** o **PENDIENTE DE FUENTE**; no inicies otra ronda ni declares el trabajo terminado como conforme.

Antigravity no aprueba el sistema ni cambia estados de aprobación. Entrega uno de estos resultados:

- **APTO PARA REVISIÓN DE WALTER:** cumple todos los criterios y tiene cero críticos/mayores, con hasta tres menores aislados documentados;
- **NO APTO:** mantiene uno o más críticos/mayores o excede el margen de menores;
- **PENDIENTE DE FUENTE:** no pudo comprobar un requisito necesario por falta de una fuente identificada.

Solo Walter puede cambiar el estado a **APROBADA**. No edites manifests o archivos para marcar aprobado.

### 12. Entregables

Dentro de la carpeta de entrega crea:

1. `00_INVENTARIO/Inventario_y_mapa_de_fuentes.md`: rutas revisadas, versiones, fuentes faltantes, skills existentes y mapa entre fuentes y entregables.
2. `01_ESTRUCTURA_GLOBAL/SKILL.md`: skill global propuesta.
3. `02_MODULOS/Matematica/SKILL.md`.
4. `02_MODULOS/Lengua_y_Literatura/SKILL.md`.
5. `02_MODULOS/Ingles/SKILL.md`.
6. `02_MODULOS/Ciencias_Naturales/SKILL.md`.
7. `02_MODULOS/Historia_Geografia_Ciencias_Sociales/SKILL.md`.
8. `03_PLANTILLAS/Ficha_reutilizable_OA.md`.
9. `04_CONTROL/Matriz_de_reglas.csv` y `04_CONTROL/Catalogo_de_reglas.<extension_vigente>`, usando el formato y la extensión del catálogo actual. Si no existe un catálogo previo, crea `Catalogo_de_reglas.json` y documenta su esquema.
10. `04_CONTROL/Validador_y_pruebas/`: validador local propuesto y pruebas ejecutables, usando el lenguaje y formato existentes cuando sea posible.
11. `05_PILOTO/110-7-CIE-OA01/Clase_01/`: paquete fuente completo de la Clase 1 en los formatos vigentes del proyecto, con un único origen de contenido y los guiones/storyboards 7+7.
12. `06_INFORME/Informe_de_cierre.md`: alcance ejecutado, archivos creados/modificados en la carpeta de entrega, pruebas realmente ejecutadas, resultados, cambios exactos, observaciones menores aceptadas, conflictos y pendientes.

No entregues únicamente un informe. No copies masivamente `INSUMOS` al paquete. Los originales se mantienen intactos y se citan mediante sus rutas exactas.

### 13. Definición de término

La ejecución está lista para que Walter la revise únicamente cuando:

- existe una estructura global reutilizable para 3.º–8.º Básico;
- existen exactamente cinco módulos disciplinares;
- la ficha del OA y los controles están implementados en archivos de la carpeta de entrega;
- las pruebas ejecutadas demuestran los controles declarados;
- existe el paquete fuente completo de Ciencias Naturales 7.º Básico OA01 Clase 1, con ocho etapas correctas y videos 7+7;
- se preservaron los insumos originales y el contenido correcto;
- cada cambio está justificado por evidencia;
- el informe usa uno de los tres estados de la sección 11 y enumera cualquier limitación.

No declares implementado un elemento que solo describiste. No declares verificado un archivo que no leíste o una prueba que no ejecutaste. No marques nada como aprobado: la aprobación final corresponde a Walter.
