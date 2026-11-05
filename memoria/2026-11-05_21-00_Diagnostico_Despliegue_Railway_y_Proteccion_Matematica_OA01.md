# Bitacora y Diagnostico Integral: Despliegue en Railway, Sincronizacion de Lecciones y Proteccion de Matematica OA01

Fecha: 2026-11-05 21:00 (America/Santiago)  
Repositorio: StudioSimple - Antigravity  
Ramas sincronizadas: work-auditor-titulos-test y main  
Entorno de produccion: https://estudiosimple.cl (Railway)

---

## 1. Resumen de la Sesion

En esta sesion se resolvio de forma definitiva el bloqueo de despliegue en produccion en Railway, se corrigio la presentacion del recurso de lectura para el estudiante en Lenguaje Clase 02, se consolidaron las consignas canónicas en Lenguaje OA03, y se diagnostico la razon tecnica por la cual las ediciones en Matematica OA01 no persisten en el editor web.

---

## 2. Diagnostico 1: Fallo de Compilacion en Railway (Causa Raiz y Resolucion)

### Sintoma
Al realizar push al repositorio, Railway fallaba consistentemente en el paso `[8/8] RUN npm run build --prefix "Web Studio Simple"` arrojando el error:
```text
NO_VERIFICABLE: ENOENT: no such file or directory, open '/app/LECCIONES/110-7/Ciencias_Naturales/OA01/manifest.json'
process "/bin/sh -c npm run build --prefix \"Web Studio Simple\"" did not complete successfully: exit code: 1
```
Por esta razon, Railway conservaba en ejecucion el contenedor de hace 13 dias (commit `4e099c0`), sirviendo a los usuarios el archivo JS desactualizado (`index-CAbUbcBu.js`).

### Causa Raiz
El archivo `.dockerignore` contenia en su linea 11 la entrada `LECCIONES`. Al construir la imagen Docker en la nube, el comando `COPY . .` excluía el arbol de directorios `/app/LECCIONES/`. Sin embargo, el script `scripts/verify_editor_reference.cjs` (ejecutado obligatoriamente en el build de Vite) exige la presencia fisica de los manifiestos canonicos de `LECCIONES/` para certificar la integridad del editor antes de compilar. Al no encontrarlos, lanzaba una excepcion `ENOENT` no capturada.

### Solucion Aplicada
1. Se elimino la entrada `LECCIONES` de `.dockerignore`.
2. Se genero el commit `b8ffca1` (`fix(deploy): habilitacion de copia de lecciones en docker y extraccion de recurso de lectura en lenguaje`).
3. Railway compilo con exito el contenedor en el despliegue `e3f342de` y posteriormente en `4e17a271`.

---

## 3. Diagnostico 2: Pantalla en Blanco en Lenguaje Clase 02 (Vista Estudiante)

### Sintoma
En Lenguaje 7° Basico OA03 Clase 02, la pantalla del tutor mostraba las consignas pero la pantalla del estudiante se visualizaba totalmente vacia en la etapa de Recorrido (`thermo`).

### Causa Raiz
En `scripts/pipeline_sync_lessons.ts`, el extractor de datos interactivos no capturaba los parrafos de lectura citados (`> ...`) bajo el encabezado `### Recurso de Lectura Autónomo en Pantalla` para el area de Lenguaje. Como consecuencia, `interactive.paragraphs` quedaba vacio o nulo.
En el frontend, el componente `StudentReadingResourceCard.tsx` contenia la guarda de validacion:
```tsx
if (!declaredParagraphs || declaredParagraphs.length === 0) return null;
```
Al recibir un arreglo vacio, el componente devolvia `null`, suprimiendo la renderizacion grafica en la vista del alumno.

### Solucion Aplicada
Se implemento en el generador la extraccion automatica de lineas de cita de texto para conformar `interactive.paragraphs` e `interactive.title`. Los modulos de Lenguaje OA03 ahora contienen los parrafos completos de lectura («Jimmy comparte juegos con Robutt...»).

---

## 4. Diagnostico 3: Consignas Canónicas del Paso 2B en Lenguaje OA03

### Sintoma
La aplicacion presentaba consignas genericas del tipo «Observa la situación de partida para comenzar» o textos obsoletos como «Anticipaciones variadas expresadas como hipótesis...».

### Causa Raiz
La expresion regular de extraccion `sitDileMatch` buscaba unicamente encabezados con el formato `**DILE:**`, mientras que las fuentes canonicas de Lenguaje empleaban `**DILE al estudiante:**`.

### Solucion Aplicada
Se ajusto la expresion regular en `scripts/pipeline_sync_lessons.ts` acotada a la seccion `Paso 2B` e incluyendo la variante `DILE al estudiante:`. Se regeneraron las 6 lecciones de Lenguaje OA03 con sus consignas exactas:
- **Clase 01:** «Lee el primer párrafo del recurso que aparece en pantalla. ¿Dónde vive Jimmy? Cuéntame dos detalles de ese lugar.» / Esperada: «Por ejemplo: “Vive en la Luna. Hay rocas y no se puede respirar afuera”».
- **Clase 02:** «Lee la propuesta del padre y la respuesta de Jimmy en el recurso. ¿Qué efecto tiene la propuesta del padre sobre Jimmy?» / Esperada: «La propuesta provoca la oposición de Jimmy y hace visible el desacuerdo entre ambos.».

---

## 5. Diagnostico 4: Intento de Edicion no Guardado en Matematica 7° OA01 Clase 01

### Sintoma
Al modificar la Leccion 01 de Matematica en el editor web (`LessonEditorView.tsx`) y hacer clic en "Guardar Lección", la interfaz parecia procesar la accion pero los cambios no se guardaban en la sesion ni en `localStorage`.

### Causa Raiz
El sistema cuenta con un candado de proteccion estricto a nivel de repositorio y validador:
1. En `Web Studio Simple/src/lib/lesson-repository.ts`:
   ```typescript
   function isProtectedSelection(grade: string, subject: string, oa: string): boolean {
     return normalizeGrade(grade) === '7' && normalizeSubject(subject) === 'mat' && normalizeOa(oa) === 'oa1';
   }
   ```
2. Al intentar guardar mediante `saveCustomPlayerLesson`:
   ```typescript
   if (!validation.isValid || validation.isProtectedOa) {
     return { 
       ok: false, 
       error: validation.error || 'Matemática OA01 permanece protegida; no se guardó la edición.', 
       validation 
     };
   }
   ```
   La funcion retorna `ok: false`, impidiendo intencionalmente cualquier sobreescritura en `localStorage`.
3. Al cargar lecciones en el reproductor mediante `findInjectedLesson`:
   ```typescript
   if (isProtectedSelection(grade, subject, oaCode)) {
     return findCanonicalFactoryLesson(grade, subject, oaCode, lessonNumber);
   }
   ```
   Se lee de forma exclusiva el archivo de fabrica empaquetado (`matematica_7b_oa01_clase01.ts`), descartando cualquier modificacion del cliente.

### Fundamento de la Proteccion
El paquete **Matemática OA01 (7° Básico, Clases 01 a 06)** fue definido como el patrón de oro inmutable del proyecto (normativa `PROTEGIDO_NO_INTERVENIDO`). El candado previene que ediciones casuales o descalibradas alteren la referencia matriz con la que se contrastan y auditan todas las demas asignaturas.

### Procedimiento para Modificaciones Legítimas
Para aplicar cambios en Matematica OA01 de forma autorizada, la via oficial es la edicion directa del codigo fuente en `Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase[01-06].ts`, garantizando versionamiento estricto en Git y revision en auditoria estructural.

---

## 6. Estado del Ecosistema para la Jornada Laboral

- **Auditoria Estructural:** 100% PASS (`npx tsx scripts/audit_structural_rules.ts`: 30 verificadas, 0 discrepancias, 6 protegidas).
- **Suite de Pruebas Unitarias del Auditor:** 31/31 PASS (`npx tsx scripts/test_canonical_auditor.ts`).
- **Compilacion Vite:** Exit code 0 (`npm run build --prefix "Web Studio Simple"`).
- **Despliegue Activo en Railway:** `4e17a271-b783-4eaa-ab36-f1bc93df353d` (SUCCESS).
- **Servicio Produccion:** https://estudiosimple.cl operativo con bundles sincronizados.
