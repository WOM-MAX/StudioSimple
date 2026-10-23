# Entrega de Work: auditor de títulos y continuidad

**22 de octubre de 2026 · Estado EN_REVISION · Preparación aislada**

## Resultado concreto

El cambio está implementado y probado en una copia de los insumos de Antigravity. Cierra la brecha que permitía aprobar títulos y puentes ajenos siempre que no estuvieran vacíos. Todavía debe aplicarse y comprobarse en el repositorio de Antigravity; esta entrega no acredita publicación ni sincronización total de la App.

| Verificación | Resultado |
|---|---|
| Pruebas automatizadas, incluidos comandos reales del auditor | 31/31 correctas; salida 0 |
| Comprobación TypeScript de los scripts afectados | Salida 0 |
| Módulos originales del lote | 29 VERIFICADOS; 1 FALLO_CORRESPONDENCIA; salida 1 |
| Fuentes canónicas vinculadas | 30 presentes, hashes contrastados con MAPA_FUENTES.csv |
| Matemática OA01 | 6 clases PROTEGIDO_NO_INTERVENIDO, sin PASS ficticio |
| Generación de prueba en copia temporal | 30 módulos generados y verificados; fuentes y archivos protegidos intactos |
| Aplicación del parche sobre archivos originales | git apply --check correcto; bytes resultantes idénticos a los probados |

**La salida 1 del lote original es el comportamiento correcto del auditor:** detecta una diferencia real, detallada abajo. Las pruebas válidas también obtienen salida 0; el auditor no está diseñado para rechazar todo.

## Única discrepancia encontrada en títulos y continuidad

Archivo: `Web Studio Simple/src/data/lessons/matematica_7b_oa04_clase05.ts`.

Campo: `metadata.nextLessonTitle`.

Valor actual:

`Clase 6: Síntesis Integradora y Ensayo de Evaluación Formativa`

Valor esperado según el título oficial de la fuente de la Clase 06:

`Síntesis Integradora y Ensayo de Evaluación Formativa: Porcentajes en Acción`

Fuente: `LECCIONES_POR_REVISAR/110-7/Matematica/OA04/CLASE06.md`.

El módulo todavía usa el título de trabajo anunciado en la Clase 05. El parche del auditor no modifica ese módulo: la diferencia queda registrada y no se oculta cambiando las fuentes. Si Walter autoriza su corrección, basta con sustituir ese único campo por el valor oficial anterior y ejecutar otra vez el auditor. No hace falta regenerar todo el lote. Esto corresponde a Matemática **OA04**; Matemática **OA01** sigue protegida.

## Qué cambia

Un único parche contiene cinco archivos:

1. `scripts/audit_structural_rules.ts`: comparación con fuentes independientes, lectura estática mediante AST y estados/códigos de salida verificables. Conserva los controles de recurso narrativo y reactivos ausentes. Informa los resúmenes genéricos sin imponer tres ideas.
2. `scripts/canonical_lesson_reference.ts`: selección de fuentes por manifiestos, extracción de cabeceras oficiales, identidad completa, orden, hashes y procedencia de cada título y puente. No ejecuta los módulos auditados.
3. `scripts/pipeline_sync_lessons.ts`: usa el título oficial de cabecera, resuelve el puente mediante la referencia y valida el lote antes de crear directorios o escribir módulos. Conserva el parser de contenido y el linter existentes. Esta entrega sólo permite salida en preparación aislada. También elimina un import no utilizado y corrige cuatro referencias a `meta.fileName` inexistente en mensajes de error; usa el contexto de archivo disponible.
4. `scripts/test_canonical_auditor.ts`: pruebas positivas y negativas, con códigos del comando real y controles de escritura/protección.
5. `docs/auditorias/REFERENCIA_CANONICA_TITULOS_CONTINUIDAD.json`: referencia reproducible derivada de las fuentes; no es una tabla manual copiada de los módulos.

La causa del título incorrecto era la búsqueda global de `**Título:**` en el Markdown: podía seleccionar un título de diapositiva como «Una situación». Ahora se considera únicamente la cabecera anterior al contenido pedagógico.

## Regla de continuidad y versiones

La clase siguiente se identifica dentro del mismo curso, asignatura y OA; su título oficial es el de su propia fuente. El final del OA conserva el cierre o transición explícitos. Por eso se admite el mensaje final de Matemática OA04 Clase 06.

Cinco fuentes anuncian un **título de trabajo** distinto del título oficial posterior: Ciencias C01, Historia C01, Inglés C01, Lengua C01 y Matemática OA04 C05. Se informa esa diferencia provisional, sin reescribir fuentes congeladas. Un campo oficial contradictorio produce NO_VERIFICABLE; no se trata como provisional.

La normalización de títulos se limita a Unicode y espacios. No elimina tildes, puntuación ni palabras para simular coincidencias.

El curso de los módulos recibidos no figura en `metadata`; se acredita por su vínculo de manifiesto/ruta. Cuando un módulo sí declara `metadata.courseId`, también se compara. Esta limitación se declara en el informe.

| Código | Significado |
|---|---|
| 0 | Correspondencia verificada en el alcance evaluable y controles estructurales conservados sin fallos |
| 1 | Discrepancia comprobada o fallo estructural |
| 2 | Falta información, hay ambigüedad, referencia alterada/desactualizada o módulo no verificable |

Si cambia una fuente, un manifiesto o su inventario, la referencia guardada deja de servir y el comando rechaza la verificación. No se actualiza silenciosamente. `--write-reference` es una operación explícita que sólo genera la referencia; no aprueba módulos ni sustituye la auditoría.

## Instrucción cerrada para Antigravity

Aplicar **PARCHE_APLICAR_EN_REPOSITORIO.patch** tal como está, sin reimplementar la solución ni añadir mejoras. Usar **ARCHIVOS_DEL_PARCHE_Y_HASHES.json** para comprobar archivos antes/después.

Base recibida: `200d6507137de5808aa10bd81ade2cb7d0e7c099`, rama `main`. SHA-256 del ZIP de insumos: `e8d92f009d9f1937b901196357803352aa51ec72b4acc5ab13cb37c3f64bc26a`.

1. Resguardar los cambios locales y comprobar los hashes base de los dos scripts existentes. Si sus versiones cambiaron, informar el conflicto concreto; no sobrescribirlas ni reconstruir la solución por iniciativa propia.
2. En una copia aislada del repositorio, desde su raíz, ejecutar:

```sh
git apply --check RUTA_ENTREGA/PARCHE_APLICAR_EN_REPOSITORIO.patch
git apply RUTA_ENTREGA/PARCHE_APLICAR_EN_REPOSITORIO.patch
```

`RUTA_ENTREGA` representa la carpeta donde se extrajo este ZIP; sustituirla por esa ruta real. Citarla si contiene espacios. No aplicar otros archivos como parches: hay uno solo.

3. Verificar los cinco hashes resultantes. Las versiones probadas por Work fueron Node 24.19.0, TypeScript 5.6.3, tsx 4.20.6 y tipos Node 22. Los comandos siguientes presuponen `typescript`, `tsx` y `@types/node` disponibles desde la raíz de esa copia. La entrega no cambia package.json ni lockfiles; si no están disponibles, preparar las dependencias en el entorno aislado, sin alterar el entorno de producción, y registrar las versiones utilizadas.
4. Ejecutar las pruebas y el control de tipos focalizados:

```sh
node --import tsx --test --test-reporter=tap scripts/test_canonical_auditor.ts
node node_modules/typescript/bin/tsc --noEmit --module esnext --moduleResolution node --target ES2022 --esModuleInterop --strict --skipLibCheck --types node scripts/audit_structural_rules.ts scripts/canonical_lesson_reference.ts scripts/pipeline_sync_lessons.ts scripts/test_canonical_auditor.ts
```

5. Ejecutar el auditor del lote original:

```sh
node --import tsx scripts/audit_structural_rules.ts --report RESULTADO_APLICACION_ANTIGRAVITY.json
```

Sobre los mismos datos recibidos, el resultado esperado es salida **1** por el puente de Matemática OA04 C05. No convertirlo en éxito ni regenerar la referencia para taparlo. Si ya fue corregido con autorización y el resto permanece igual, la salida esperada es 0. Aportar el diff de ese único campo para explicar la diferencia.

6. Comprobar el enlace del control con el pipeline sin escribir:

```sh
node --import tsx -e "require('./scripts/pipeline_sync_lessons.ts').runUniversalPipeline({validateOnly:true}).then(console.log).catch(e=>{console.error(e);process.exitCode=e.exitCode||1})"
```

7. Entregar un único informe de aplicación con: versión/commit aplicado, cinco hashes, versiones de Node/TypeScript/tsx, logs y códigos reales de los comandos, resultado del lote, diff de cualquier corrección puntual autorizada y declaración de protecciones intactas. No iniciar otra auditoría global de la App ni una ronda de mejoras generales.

Mantener **EN_REVISION**, sin push ni despliegue. No editar fuentes, Matemática OA01, PPTX, videos, recuperación, reglas de aprobación, base de datos ni editor. El alcance de esta entrega no autoriza esas acciones.

## Qué sigue y qué no acredita esta entrega

Después de aplicar el mismo cambio y cerrar la discrepancia puntual, se puede cerrar esta tarea del auditor. La alineación del editor se revisa después, con sus archivos y el recorrido guardar → exportar → cargar; su captura de pantalla no acredita ese comportamiento.

El informe señala 21 resúmenes con texto potencialmente genérico. Es una señal automática para contraste, no 21 defectos pedagógicos confirmados ni una orden de reescribirlos; tampoco reemplaza el inventario anterior de 22 pendientes. Este trabajo no redacta resúmenes y mantiene aceptables dos ideas en Ciencias Clase 02. No se presenta un porcentaje de sincronización total a partir de este control acotado.

La compilación aquí comprobada es la de los scripts afectados, no un build completo de la App. No se revisaron de nuevo las vistas de recuperación, la persistencia o producción, ya evaluadas en entregas anteriores. Los videos siguen a cargo de Walter.

El ZIP incluye el parche único, sus hashes, el resultado del lote original, las 31 pruebas y la integridad de los insumos. No contiene lecciones reemplazadas, presentaciones ni videos nuevos.
