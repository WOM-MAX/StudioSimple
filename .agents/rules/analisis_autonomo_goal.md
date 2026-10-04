# Norma de Protocolo de Interaccion, Autonomia y Ejecucion Directa

## Directiva de Operacion: Analisis y Plan (/goal) vs Ejecucion Directa

Para maximizar la agilidad, evitar ejecuciones intempestivas que demoren la respuesta y asegurar el control del usuario:

1. **Modo Analisis y Planificacion (Disparadores: "analiza", "plan", "analiza y plan", "contexto", "¿que quedo pendiente?", "¿en que quedamos?", "prepara la sesion", "como seguimos", o prompts de Work / externos para revision):**
   - Cuando el usuario solicite analizar un requerimiento, revisar el estado de avance, consultar pendientes o planificar una tarea:
   - **PROHIBIDO EJECUTAR MUTACIONES DE CODIGO O PROCESOS PESADOS EN TERMINAL.** El agente no debe modificar archivos fuente ni ejecutar compilaciones en este modo.
   - **PROHIBIDO TERMINAR CON PREGUNTAS PASIVAS DE CIERRE:** Queda estrictamente prohibido finalizar respuestas con preguntas abiertas o de delegacion tipo "¿con cual de estos puntos comenzamos?", "¿como procedemos?" o "¿te parece bien el plan?".
   - **OBJETIVO Y ENTREGABLE MANDATORIO:**
     1. Analisis objetivo del requerimiento o estado con evidencia verificable.
     2. Plan de accion estructurado y jerarquizado por prioridad tecnica.
     3. **PROMPT CANONICO `/goal` LISTO PARA EJECUTAR (OBLIGATORIO, NO OPCIONAL):** La finalidad expresa de este modo es formular y entregar el bloque canonico `/goal` con las directivas de autonomia, rutas exactas y Definition of Done (DoD) para que el usuario solo tenga que activarlo cuando decida.

2. **Modo Ejecucion Directa (Disparadores: comando `/goal`, "ejecuta", "aplica", "haz push", "haz pull"):**
   - Cuando el usuario envie un comando que inicie con `/goal`, o de una orden imperativa directa de ejecucion (ej. "ejecuta el plan", "aplica los cambios ahora", "haz push", "haz pull"):
   - El agente **DEBE EJECUTAR DIRECTAMENTE DE PRINCIPIO A FIN** con 100% de autonomia.
   - **PROHIBIDO** generar prompts intermediarios de `/goal` en este modo (cero doble paso).
   - **PROHIBIDO** hacer preguntas de diseno intermedias, pedir aprobaciones previas o hacer pausas intermedias.
   - La ejecucion debe incluir analisis, codigo, pruebas, validacion (build con codigo 0) y documentacion en memoria/ antes de entregar el informe final de cierre.

3. **Regla de Prevalencia ante Prompts Externos (Work / ChatGPT):**
   - Cuando el usuario pegue un prompt generado por Work o terceros que contenga verbos imperativos (ej. "Corrige el plan...", "Actualiza..."), pero la intencion expresada o previa sea "analiza el prompt", "¿que le entrego?", o "analiza y plan":
   - Prevalece estrictamente el **Modo Analisis y Planificacion**. No se ejecuta el codigo; se analiza el texto, se estructura el plan y se genera el bloque canonico `/goal`.

---

## Estandar Obligatorio para Prompts Autosuficientes de /goal

Todo prompt formulado para `/goal` DEBE incluir de manera estricta y sin excepciones las siguientes clausulas tecnicas para asegurar autosuficiencia total y ejecucion limpia de principio a fin:

### 1. Clausula de Autonomia Absoluta y Cero Interrupciones
Queda estrictamente prohibido solicitar confirmaciones, hacer preguntas intermedias, pedir aprobaciones de diseno o delegar decisiones al usuario durante el transcurso de la tarea. El agente debe asumir decisiones tecnicas fundamentadas basadas en las especificaciones del proyecto y los estandares de AGENTS.md.
Prohibido emitir mensajes intermedios de espera tipo "he lanzado la tarea y te avisare cuando termine": la ejecucion debe concluir de principio a fin antes del reporte final.

### 2. Prohibicion de Comandos Lentos y Busquedas Ciegas en Terminal
Queda estrictamente prohibido ejecutar busquedas recursivas globales en la raiz del disco (`Get-ChildItem -Path "C:\" -Recurse...`) o comandos que superen los limites sincronos y caigan a segundo plano. Toda exploracion debe realizarse con rutas deterministas acotadas exclusivamente al repositorio local (`d:\StudioSimple - Antigravity\Web Studio Simple`) o a la carpeta de contenidos (`d:\StudioSimple - Antigravity\PLANES MAESTROS PRESENTACIONES`).

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
- Si la tarea incluye cierre o despliegue, ejecutar la sincronizacion Git de forma atomica en un unico comando con `npx tsx scripts/git_sync.ts "[mensaje]"` segun el protocolo oficial, prohibiendo comandos individuales sueltos de Git.
La entrega se realizara en un unico informe final de cierre al culminar la totalidad del trabajo.

### 11. Clausula de Edicion Atomica Consolidada (Cero Micro-Diffs)
En la interfaz del IDE, cada llamada a herramientas de edicion genera una barra interactiva de cambios pendientes ("1 File With Changes / Accept all"). Para erradicar la sobrecarga de aprobaciones manuales:
- Esta estrictamente prohibido realizar micro-ediciones sucesivas o fragmentadas sobre el mismo archivo.
- Todo cambio sobre un archivo debe planificarse y consolidarse en una unica operacion atomica integral por fichero.
- Quedan prohibidos los ciclos de edicion y reversa inmediata (+0 -11); el reemplazo propuesto debe ser definitivo y autosuficiente desde el primer intento.

### 12. Clausula de Resolucion Autonoma de Diseno y UX (Cero Consultas de Disposicion)
Ante decisiones de interfaz, disposicion de botones o elementos visuales (ej. visibilidad de contrasena, mascara de campos, ubicacion de botones de gestion):
- Queda prohibido detener la ejecucion para consultar preferencias esteticas al usuario.
- El agente debe aplicar directamente las convenciones vigentes del proyecto: Tailwind CSS, iconografia Lucide, contraste accesible, formato chileno oficial (`+56 9 XXXX XXXX`) y estetica Nordic Clean.
- Toda eleccion de diseno se fundamenta y documenta directamente en el reporte de cierre.

### 13. Clausula de Pasarelas de Pago y Variables de Entorno (Autonomia en Integraciones Externas)
Al intervenir pasarelas de pago (Mercado Pago, Webpay) o servicios cloud (Railway, Resend, WhatsApp):
- El agente no debe detenerse a pedir confirmacion manual de claves si estas pueden inferirse del entorno o de la arquitectura existente.
- Debe auditar el codigo fuente (`server.js`, clientes API, `CheckoutFlow.tsx`) para identificar fallos como uso de endpoints de Sandbox en produccion o desalineacion de webhooks.
- Si se requiere una variable de produccion alojada en Railway que no este en local, el agente debe implementar la lectura resiliente (`process.env.VARIABLE || fallbackSeguro`), documentar la variable exacta requerida y probar localmente mediante emulacion sintetica o tests unitarios sin bloquear la entrega.

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
9. Resuelve cualquier detalle tecnico, de UX o pedagogico no especificado aplicando los estandares de AGENTS.md y documenta la decision en el reporte final.
10. Edicion atomica: consolidar todas las modificaciones de cada archivo en una unica operacion integral para eliminar diffs interactivos repetitivos.
11. Autonomia en pasarelas e integraciones: auditar endpoints, credenciales y webhooks sin detenerse a consultar, aplicando validacion sintetica y lectura de entorno resiliente.
12. Cierre y sincronizacion: incluir verificacion de build exitoso, bitacora en memoria/ y sincronizacion git atomica mediante npx tsx scripts/git_sync.ts.

TAREA A EJECUTAR:
[Descripcion detallada y determinista del requerimiento]

ARCHIVOS Y COMPONENTES AFECTADOS:
- [Rutas exactas de archivos a consultar, modificar o crear]

CRITERIOS DE ACEPTACION Y DEFINITION OF DONE (DoD):
1. Codigo modular, tipado estricto (unknown > any), sin errores de sintaxis ni regresiones.
2. Validacion local exitosa ejecutando: npm run build --prefix "Web Studio Simple" (codigo de salida 0).
3. Verificacion de integridad y comportamiento del flujo segun especificaciones.
4. Documentar los cambios en memoria/ si corresponde.
5. Entregar el informe de resultados en un unico mensaje final al terminar todo el flujo.
```
