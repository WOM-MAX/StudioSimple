# Norma de Protocolo de Interaccion, Autonomia y Generacion de /goal

## Directiva de Operacion Obligatoria
Cada vez que el usuario consulte, pregunte, solicite un analisis o pida ejecutar una tarea (tecnica, pedagogica, de arquitectura o de codigo), el agente DEBE estructurar su respuesta obligatoriamente en tres secciones:

1. **Analisis / Diagnostico Objetivo:** Presentar el diagnostico o analisis tecnico/pedagogico con evidencia verificada directamente en los archivos o componentes correspondientes.
2. **Plan de Accion Estructurado:** Detallar el desglose secuencial de pasos, archivos especificos a modificar o crear, y las pruebas de validacion a ejecutar.
3. **Prompt Autosuficiente con `/goal`:** Proporcionar obligatoriamente un bloque de prompt listo para copiar y ejecutar con el comando `/goal`.

---

## Estandar Obligatorio para Prompts Autosuficientes de /goal

Todo prompt formulado para `/goal` DEBE incluir de manera estricta y sin excepciones las siguientes clausulas tecnicas para asegurar autosuficiencia total y ejecucion limpia de principio a fin:

### 1. Clausula de Autonomia Absoluta y Cero Interrupciones
Queda estrictamente prohibido solicitar confirmaciones, hacer preguntas intermedias, pedir aprobaciones de diseno o delegar decisiones al usuario durante el transcurso de la tarea. El agente debe asumir decisiones tecnicas fundamentadas basadas en las especificaciones del proyecto y los estandares de AGENTS.md.
Prohibido emitir mensajes intermedios de espera tipo "he lanzado la tarea y te avisare cuando termine": la ejecucion debe concluir de principio a fin antes del reporte final.

### 2. Prohibicion de Comandos Lentos y Busquedas Ciegas en Terminal
Queda estrictamente prohibido ejecutar busquedas recursivas globales en la raiz del disco (`Get-ChildItem -Path "C:\" -Recurse...`) o comandos que superen los limites sincronos y caigan a segundo plano. Toda exploracion debe realizarse con rutas deterministas acotadas exclusivamente al repositorio local (`c:\Proyectos\StudioSimple\Web Studio Simple`) o a la carpeta de contenidos (`OneDrive\EstudioSimple-Contenido`).

### 3. Prioridad de TypeScript (npx tsx) sobre Python
El entorno canonico de automatizacion del proyecto es TypeScript / Node.js. Queda prohibido improvisar scripts de Python en linea que fallen por dependencias ausentes o por problemas de codificacion de caracteres en la consola de Windows (cp1252 frente a caracteres como '−'). Todo script de datos, exportacion o verificacion debe escribirse en TypeScript y ejecutarse mediante `npx tsx scripts/[nombre].ts`.

### 4. Delimitacion Estricta de Mision (Antigravity vs ChatGPT Work)
En el pipeline de produccion de contenidos de EstudioSimple:
- La mision de Antigravity es EXCLUSIVAMENTE disenar, mantener y compilar el archivo DOCX oficial con las lecciones, tablas didacticas, overlays y prompts limpios (Plan Maestro).
- Antigravity tiene ESTRICTAMENTE PROHIBIDO generar o intentar compilar las presentaciones finales en PPTX. Esa tarea le corresponde exclusivamente a ChatGPT Work en su propio entorno a partir del archivo DOCX.

### 5. Clausula de Circuito de Proteccion y Autocorreccion Acotada
Ante cualquier fallo en terminal (compilacion TypeScript, linter, tests, o build), el agente debe analizar el registro de error, modificar el codigo de forma autonoma y reintentar la validacion.
Se establece un limite maximo de 4 iteraciones de autocorreccion consecutivas sobre un mismo error. Si tras el cuarto intento no se alcanza la resolucion, el agente debe cambiar de enfoque estrategico o revertir la mutacion fallida, evitando entrar en bucles repetitivos infinitos.

### 6. Control de Procesos Bloqueantes en Windows (EBUSY / EPERM)
En entornos Windows, los procesos activos en segundo plano (como servidores dev, compiladores en observacion o exploradores de archivos) pueden bloquear ficheros impidiendo su reemplazo o borrado. El agente debe verificar si existen bloqueos antes de reintentar operaciones de archivo y operar de manera segura sin corromper el arbol de dependencias.

### 7. Punto de Control y Reversibilidad (Git Checkpoint)
Antes de iniciar modificaciones que afecten multiples archivos o modulos troncales, el agente debe verificar el estado del repositorio (`git status`). Si una estrategia de solucion fracasa y genera regresiones severas, el agente debe tener la capacidad de restaurar los archivos afectados a su punto de control previo antes de probar una solucion alternativa.

### 8. Clausula de Doble Validacion (Sintactica y de Contenido)
La finalizacion de una tarea no se apoya unicamente en la ausencia de errores sintacticos (`npx tsc --noEmit` o `npm run build` con codigo 0). El agente debe ejecutar una verificacion funcional y de integridad sobre el contenido:
- Confirmar que los artefactos generados (DOCX, JSON, etc.) existan en la ruta especificada y tengan un tamano superior a 0 bytes.
- Validar que los campos de datos y estructuras requeridas esten poblados sin valores corruptos o nulos.

### 9. Persistencia de Progreso contra Compactacion de Contexto
En tareas complejas que demanden ejecuciones prolongadas y extensas lecturas de codigo, el agente debe registrar los hitos clave en un archivo local o en la bitacora de `memoria/`. Esto evita la perdida de directivas e historial de resolucion en caso de compactacion automatica del contexto por parte del sistema.

### 10. Definition of Done (DoD) Determinista y Cierre Unico
La tarea solo se considerara finalizada cuando:
- Los comandos de verificacion por terminal (`npm run build`, etc.) concluyan con codigo de salida 0.
- La validacion de integridad del artefacto o contenido sea conforme.
- Se actualice la bitacora en `memoria/` si hubo cambios arquitectonicos o de reglas.
La entrega se realizara en un unico informe final de cierre al culminar la totalidad del trabajo.

---

## Plantilla Canonica del Prompt /goal

```text
/goal Ejecutar de inicio a fin la siguiente tarea en StudioSimple con 100% de autonomia y sin interrupciones intermedias.

DIRECTIVAS DE AUTONOMIA:
1. Prohibido solicitar aprobacion, hacer preguntas o pausar para pedir interaccion al usuario antes de concluir.
2. Prohibido ejecutar busquedas recursivas en la raiz del disco o scripts improvisados de Python: usa rutas exactas y TypeScript (npx tsx).
3. Delimitacion de mision: el entregable es exclusivamente el codigo/DOCX segun corresponda; nunca generar archivos PPTX finales (mision de Work).
4. Circuito de proteccion: maximo 4 intentos de autocorreccion ante fallos de compilacion antes de cambiar de enfoque o revertir cambios infructuosos.
5. Control de bloqueos: considerar posibles procesos de Node o Windows bloqueando archivos (EBUSY) antes de operaciones destructivas.
6. Punto de control: verificar estado de Git antes de mutaciones extensas para preservar reversibilidad.
7. Doble validacion: validar compilacion con codigo 0 y comprobar integridad real de los artefactos generados (tamano > 0 bytes y datos consistentes).
8. Persistencia: registrar hitos en memoria/ para tareas complejas si existe riesgo de saturacion de contexto.
9. Resuelve cualquier detalle tecnico o pedagogico no especificado aplicando los estandares de AGENTS.md y documenta la decision en el reporte final.

TAREA A EJECUTAR:
[Descripcion detallada y determinista del requerimiento]

ARCHIVOS Y COMPONENTES AFECTADOS:
- [Rutas exactas de archivos a consultar, modificar o crear]

CRITERIOS DE ACEPTACION Y DEFINITION OF DONE (DoD):
1. Codigo modular, tipado estricto (unknown > any), sin errores de sintaxis ni regresiones.
2. Validacion local exitosa ejecutando: npm run build --prefix "Web Studio Simple" (codigo de salida 0).
3. Verificacion de integridad y contenido del entregable (tamano > 0 bytes y estructura valida).
4. Documentar los cambios en memoria/ si corresponde.
5. Entregar el informe de resultados en un unico mensaje final al terminar todo el flujo.
```
