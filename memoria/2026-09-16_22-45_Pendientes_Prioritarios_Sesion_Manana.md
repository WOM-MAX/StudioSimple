# Bitacora de Cierre: Pendientes Prioritarios para la Sesion de Manana

**Fecha:** 2026-09-16 22:45 (America/Santiago)  
**Ambiente de Ejecucion:** Web Studio Simple (Vite + React + Tailwind + TypeScript)  
**Estado General:** Servidor Vite operativo en http://localhost:5173/, compilacion TypeScript limpia (0 errores).

---

## 1. Diagnostico Consolidado de Desajustes a Resolver

Durante la revision visual de la plataforma integrada, se detectaron cuatro puntos criticos que requieren correccion prioritaria al iniciar la siguiente sesion:

### A. Amontonamiento y Superposicion de Textos en Cabeceras del Aula (`AdultHeader.tsx` y `StudentHeader.tsx`)
- **Causa Raiz:** En el modo de pantalla dividida (Split Screen), la columna del adulto dispone de aproximadamente 360px utiles despues de descontar los 240px de la barra lateral izquierda. En ese espacio angosto, `AdultHeader` intentaba renderizar en una sola linea:
  1. Un boton de 200px de ancho con el texto `Volver al Selector de Cursos`.
  2. Un separador vertical `|`.
  3. La ruta completa con el titulo largo de la clase: `7° Basico › Matematica › OA 1 › Clase 1: Posiciones respecto de un punto de referencia` (~350px).
  4. La pastilla verde `Estudiante conectado` (~140px).
- **Efecto Visual:** El boton colapso a menos de 50px de ancho, partiendo el texto en 4 lineas verticales ("Volver al / Selector / de / Cursos") que se montaron fisicamente encima de la ruta y de la pastilla de estado.
- **Solucion Programada:**
  - Retirar el boton duplicado de 200px de las sub-cabeceras (`AdultHeader` y `StudentHeader`), dado que el boton maestro de navegacion ya existe en ancho completo en la barra superior (`TesterBar`).
  - En `AdultHeader`: colocar a la izquierda `Panel Adulto | Clase [N]: [Titulo Truncado]` con regla `truncate`, y a la derecha la pastilla `Estudiante conectado` con `shrink-0` y `whitespace-nowrap`.
  - En `StudentHeader`: colocar a la izquierda `Espacio Estudiante | Clase [N]: [Titulo Truncado]` y a la derecha una unica pastilla compacta de sincronizacion, eliminando la pastilla repetida `OA 1 - Clase 1`.

### B. Correccion de Nombres en los 8 Pasos de la Barra Lateral (`AdultSidebar.tsx`)
- **Falla Detectada:** La barra lateral del adulto muestra nombres desactualizados: `(3) Video` y `(5) Explicacion`.
- **Estandar Oficial Acordado (8 Pasos Canonicos):**
  1. **Inicio**
  2. **Video Motivacional** (capsula de activacion contextual)
  3. **Recorrido** (situacion y fijacion del punto de referencia)
  4. **Video Explicativo** (formalizacion visual del concepto)
  5. **Practica** (ejercitacion conjunta y cuaderno fisico)
  6. **Resumen** (sintesis de ideas clave)
  7. **Miniquiz** (comprobacion formativa)
  8. **Cierre** (metacognicion y avance)
- **Solucion Programada:** Actualizar la constante `CANONICAL_STEPS` y la funcion `getStageStepIndex` en `AdultSidebar.tsx` para sincronizarlas exactamente con este arreglo.

### C. Restitucion del Menu de Seleccion de Asignaturas y Breadcrumb (`ParentDashboard.tsx` y `StudentDashboard.tsx`)
- **Falla Detectada:**
  - El cambio de asignatura se encontraba reducido a un pequeno menu desplegable en el centro de la barra superior.
  - Los Objetivos de Aprendizaje desplegados en la tira horizontal estaban fijos en Matematica, sin responder al cambio de materia.
  - En la esquina superior izquierda solo figuraba `[ ← Cursos ]` y el logo general, sin reflejar la ruta jerarquica.
- **Solucion Programada:**
  - En la esquina superior izquierda: desplegar la ruta en tiempo real `[ ← Cursos ]  7° Basico › [Asignatura] › [OA Seleccionado]`.
  - En el cuerpo del panel: reincorporar la barra horizontal prominente con pestanas para las 5 asignaturas oficiales:
    `[ Matematica ] [ Lengua y Literatura ] [ Ciencias Naturales ] [ Historia, Geografia y C.S. ] [ Ingles ]`.
  - Carga dinamica: conectar la seleccion de asignatura para que la tira de OAs y las 5 clases de 30 minutos se actualicen con los datos correspondientes de `curriculum_catalog.json`.

### D. Conciliacion Curricular entre Temarios EELL y Textos Escolares Digitales MINEDUC
- Tarea sustantiva planificada: Conciliar los temarios oficiales de Examenes Libres con los libros de texto digitales del MINEDUC para estructurar los planes maestros y las lecciones de las asignaturas pendientes.

---

## 2. Mapa de Archivos para la Intervencion de Manana

1. `Web Studio Simple/src/components/lesson/adult/AdultHeader.tsx` (saneamiento de layout y eliminacion de overlap).
2. `Web Studio Simple/src/components/lesson/student/StudentHeader.tsx` (saneamiento de layout y eliminacion de badges repetidos).
3. `Web Studio Simple/src/components/lesson/adult/AdultSidebar.tsx` (restablecimiento de los 8 pasos canonicos).
4. `Web Studio Simple/src/components/parent/ParentDashboard.tsx` (breadcrumb superior izquierdo y barra de 5 asignaturas).
5. `Web Studio Simple/src/components/student/StudentDashboard.tsx` (paridad en el portal del estudiante).
6. `Web Studio Simple/src/data/curriculumData.ts` (conexion multiasignatura para 7° Basico).

---

## 3. Estado de Dejadas del Proyecto

- Repositorio limpio y sin procesos huerfanos.
- Compilacion validada: `npx tsc --noEmit` completada sin errores.
- Memoria persistida y lista para continuar manana a primera hora.
