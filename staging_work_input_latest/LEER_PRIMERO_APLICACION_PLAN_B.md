# Plan B ejecutado por Work: corrección del editor

**EstudioSimple · 24-10-2026 · EN_REVISION · Sin publicación**

## Resultado y avance

Work preparó el cambio exacto sobre los archivos recibidos en `RESULTADOS_CORRECCION_EDITOR_LECCIONES_ANTIGRAVITY_2026-10-24_17-35_CL.zip` (SHA-256 `81a4a33e42c56b82227cfed3584794403d76e0c0a7bcd58f433691f40939a952`). Las **41 pruebas focalizadas de Work pasan**. La comprobación estricta del validador y del repositorio también pasa, con las limitaciones de entorno indicadas abajo.

El avance comprobado respecto de la entrega anterior es concreto: el validador ya no acepta por defecto identidades sin referencia; el guardado y la carga comparten el control; abrir una lección conserva su contenido; los errores de almacenamiento se devuelven y detienen los mensajes de éxito y el acceso al aula dependiente del guardado.

**No se declara todavía cerrado el editor en la App de Antigravity.** Falta aplicar este mismo cambio, compilar la App completa en su entorno y comprobar el recorrido visual solicitado. No se promete que pruebas de handlers con almacenamiento de prueba sean pruebas de navegador.

## Cambios exactos

- `Web Studio Simple/src/lib/lesson-canonical-validator.ts`: referencia obligatoria y única; correspondencia con la selección del editor, curso declarado, nivel, asignatura, OA, clase y total; título y puente comparados conservando tildes/puntuación/mayúsculas, incluso en el cierre del OA. Comprueba los elementos esenciales de LessonData y mantiene dos ideas válidas en Ciencias C02. No inventa contenido ni valida pedagógicamente la redacción de los 21 resúmenes pendientes.
- `Web Studio Simple/src/lib/lesson-repository.ts`: el guardado público valida antes de escribir, devuelve éxito/fallo y actualiza los formatos Player/compatibilidad por una sola puerta. Rechaza el guardado legado si no corresponde a un Player validado. Prepara los valores antes de escribir y restaura las escrituras realizadas ante errores capturables. Sólo una edición validada de la identidad seleccionada precede a la fábrica; una inválida se conserva sin promoverla y se informa. Matemática 7° OA01 permanece de fábrica y sin personalizaciones. La persistencia sigue siendo local al navegador; no es sincronización entre dispositivos ni una transacción de base de datos.
- `Web Studio Simple/src/components/admin/cms/LessonEditorView.tsx`: integra esa puerta en los caminos de guardado, cambios de selección, salidas y controles audiovisuales. Probar en Aula se detiene si guardar falla. Descargar/copiar compara también con la selección visible. La carga no añade focos, estrategias, preguntas ni resúmenes; muestra el diagnóstico si faltan elementos esenciales, permitiendo cambiar la selección. Los rótulos de resumen, foco y preguntas postvideo usan la cantidad real.
- `scripts/verify_editor_reference.cjs` y el comando build de `Web Studio Simple/package.json`: antes de compilar se comprueba que la referencia del frontend sea idéntica a la del auditor y que las huellas de sus fuentes/manifiestos sigan vigentes. Es un control de integridad por lectura, no otra auditoría pedagógica de 30 clases. No regenera ni corrige referencias automáticamente.
- `scripts/test_editor_work.cjs` y `scripts/fixtures/CNA_OA01_C02.json`: pruebas focalizadas y caso técnico de Ciencias C02. La fixture contiene claves privadas para verificación interna; no debe publicarse como recurso del estudiante.

La copia `canonicalReference.json` NO se modifica y debe conservar SHA-256 `da81744b35f8279f684726ca85561e753d5b68ce329131a6c83d39a8abd6d76c`. Tampoco se modifican el auditor original, los módulos de lecciones, las fuentes Markdown, los PPTX, los videos ni el contrato de aprobación.

## Evidencia de Work y sus límites

`PRUEBAS_WORK.tap` contiene 41 resultados del comando Node de pruebas, sin fallos. Se ejecutan los módulos reales de validación/repositorio, el adaptador recibido y los initializers reales de los handlers extraídos mediante AST TypeScript. No se reescribe la lógica del editor dentro del test. Las pruebas usan almacenamiento controlado, una fábrica con Ciencias y un centinela técnico de protección de Matemática; no reauditan el contenido de Matemática OA01. Las funciones de construcción de texto de prompts del generador se sustituyen en el entorno de pruebas; no se acredita aquí su redacción ni el DOCX final.

Se verifican rechazos de identidad ajena, referencia inexistente, título/puente incorrectos, total erróneo, actividades ausentes, alternativas/claves inválidas, recuperación abierta sin alternativas artificiales, contenido conservado, persistencia/reapertura, aislamiento del paquete protegido, errores de escritura en cada almacén y cancelación de previsualización/exportación cuando hay fallo. El control del build se prueba con referencias coincidentes y con fuente, manifiesto y copia cliente alterados, sin reescritura.

`ANTES_DESPUES_VALIDACION.json` ejecuta el validador recibido y el corregido sobre los mismos casos: conserva el caso válido y demuestra los rechazos antes ausentes.

La comprobación estricta de tipos del repositorio usa los tipos LessonData y el adaptador entregados, con las declaraciones de tipos del generador extraídas de su código y una declaración de registro de fábrica. No equivale a compilar todo el frontend. Todos los archivos modificados pasan análisis sintáctico TypeScript/TSX. **El paquete recibido no incluye el árbol completo de la App, por ejemplo AppContext; no se declara un build completo ejecutado por Work.**

Entorno Work: Node 24.22.1 y TypeScript 5.6.3. Los comandos y códigos están en `EJECUCION_WORK.json`. Los informes y archivos de entrada se conservaron sin modificaciones; sólo se trabajó en copias aisladas.

## Instrucción cerrada para Antigravity

**Objetivo: aplicar el cambio de Work tal cual y comprobarlo. No producir otra implementación ni añadir mejoras.**

1. Trabaja en una copia aislada con datos/almacenamiento de prueba separados, sin escritura en Neon, servicios o progreso real. Mantén EN_REVISION, sin push ni despliegue. Protege Matemática OA01, fuentes/manifiestos canónicos y los 14 PPTX terminados. No redactes resúmenes ni generes videos.
2. La base lógica declarada fue `89add56cc9135e04d14c3abefbe2c18e25cdce18`, **más el estado exacto recibido en el ZIP de las 17:35**. El package.json se tomó de los insumos de editor anteriores de esa misma base declarada. Comprueba los hashes base de `ARCHIVOS_Y_HASHES.json`; no basta coincidir en nombre de rama o commit. Si hay incompatibilidad, informa archivo y conflicto concreto sin sobrescribir cambios ni adaptar la solución unilateralmente.
3. Desde la raíz de la copia, aplica únicamente `APLICAR_CAMBIO_EDITOR_WORK.patch`:

```sh
git apply --check RUTA_DEL_PAQUETE/APLICAR_CAMBIO_EDITOR_WORK.patch
git apply RUTA_DEL_PAQUETE/APLICAR_CAMBIO_EDITOR_WORK.patch
```

Sustituye RUTA_DEL_PAQUETE por la ruta real y cítala si contiene espacios. Verifica los hashes resultantes. `codigo/` contiene esos mismos archivos completos para cotejo, no una implementación alternativa.

4. Con TypeScript disponible en la raíz del proyecto, ejecuta:

```sh
node --test --test-reporter=tap scripts/test_editor_work.cjs
npm run build --prefix "Web Studio Simple"
```

El primer comando debe dar 41 correctas y 0 fallidas. El build debe pasar el control de referencia, TypeScript y Vite. No alteres fuentes ni regeneres referencias para conseguir éxito: si el control descubre una versión distinta, devuelve el archivo y huella afectados. No es necesario repetir las 31 pruebas del auditor sin cambios ni las auditorías generales de las lecciones.

5. En el navegador real de esa copia, demuestra únicamente Ciencias Naturales 7° OA01 C02:
   - Abrir y guardar sin cambios: comparar los datos reales del editor/guardado/exportación y conservar las dos ideas, tres reactivos y recursos de la fuente, sin rellenos ajenos.
   - Añadir una marca temporal en `prep.routeToday`, guardar, recargar y reabrir; comprobar la marca. Probar en Aula y comprobar adulto/estudiante, distinguiendo previsualización en memoria de lectura desde almacenamiento.
   - Exportar JSON/TXT con los botones reales, adjuntar los archivos y comparar campos. Mantener la privacidad de claves y criterios en la vista del estudiante.
   - Intentar título y puente ajenos: mostrar rechazo sin sustituir la última versión válida. Las pruebas técnicas ya cubren los otros casos negativos; no ampliar el recorrido visual a otras clases.
   - Restaurar el texto original y comprobar reapertura final sin marca. Capturas o video deben mostrar **Ciencias OA01 Clase 02** y el hito declarado, no Matemática/Lengua. No presentar una prueba simulada como recorrido de interfaz.

6. Entrega un único ZIP `APLICACION_PLAN_B_EDITOR_WORK_YYYY-MM-DD_HH-mm_CL.zip` en `EstudioSimple_Repositorio_Curricular / ARREGLOS_SINCRONIZACION_ANTIGRAVITY / INFORMES_Y_EVIDENCIAS`. Usa la estampa real de America/Santiago y devuelve un único enlace, tamaño y SHA-256.

Incluye: informe de aplicación con versión exacta y cambios locales, hashes resultantes, logs/códigos reales de los dos comandos, capturas/video de los hitos anteriores, exportaciones, comparación calculada, restauración final y controles de protección pertinentes. No hace falta reenviar el repositorio completo. Si un criterio falla, informa el fallo concreto y conserva lo válido; no reabras una reparación general.

## Regla de cierre

La implementación y las pruebas focalizadas quedan preparadas por Work. El editor se declara cerrado sólo después de aplicar los mismos archivos y demostrar build y recorrido real en Antigravity. La aprobación pedagógica, publicación y revisión de los 21 resúmenes son decisiones/tareas separadas, reservadas a Walter y Work. No se calcula un porcentaje global a partir de estas pruebas.
