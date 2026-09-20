# EstudioSimple — Paquete técnico del prototipo vigente

**Producto:** EstudioSimple  
**Módulo:** Matemática, 7.º básico, OA1, Clase 1  
**Fecha de congelamiento:** 14 de septiembre de 2026  
**Versión técnica:** 8  
**Sitio publicado:** https://estudiosimple-clase1-oa1.carla-orellana.chatgpt.site/  
**Identificador exacto del código:** `3f5cdbff7bf3ed361b8d8fed466abcad898eca88`

## 1. Objeto de la entrega

Este paquete contiene el código fuente y todos los recursos necesarios para reproducir el prototipo vigente de EstudioSimple. La carpeta `prototipo` constituye la fuente técnica de referencia para cualquier revisión, diagnóstico o trabajo posterior.

El prototipo implementa una clase guiada mediante dos vistas vinculadas:

- **Vista adulto:** contiene la conducción de la clase, instrucciones, preguntas, respuestas esperadas, criterios de evaluación y apoyos privados.
- **Vista estudiante:** presenta exclusivamente los contenidos, preguntas, recursos y actividades destinados al estudiante.

El adulto controla la secuencia principal. Ambas vistas pueden abrirse en dispositivos distintos y vincularse mediante un código de sesión de seis caracteres o un enlace directo para el estudiante.

## 2. Alcance funcional incluido

La implementación entregada incluye:

- selección de vista adulto, estudiante o vista conjunta;
- creación de una sesión de clase desde la vista adulto;
- código breve de vinculación;
- enlace directo para abrir la vista estudiante;
- sincronización del estado de la clase entre dispositivos;
- avance y retroceso controlados desde la vista adulto;
- sincronización de contenidos, preguntas y retroalimentación visible;
- reproducción, pausa, posición y finalización de videos;
- mini quiz;
- rutas de apoyo y refuerzo;
- cierre y reinicio de la clase;
- recuperación del último estado después de una recarga o interrupción breve;
- separación entre sesiones simultáneas;
- separación visual entre información privada del adulto e información del estudiante.

## 3. Estructura principal

| Ruta | Función |
|---|---|
| `prototipo/app/page.tsx` | Flujo completo, estados, contenidos y vistas adulto/estudiante. |
| `prototipo/app/globals.css` | Diseño visual y comportamiento adaptable. |
| `prototipo/public/media/` | Videos y audio utilizados por la clase. |
| `prototipo/public/visuals/` | Recursos gráficos de las actividades. |
| `prototipo/worker/session-api.ts` | Creación, consulta y actualización de sesiones compartidas. |
| `prototipo/worker/index.ts` | Entrada del servicio publicado y conexión con la interfaz. |
| `prototipo/db/schema.ts` | Estructura de almacenamiento de las sesiones. |
| `prototipo/drizzle/` | Migración necesaria para crear la tabla de sesiones. |
| `prototipo/tests/` | Pruebas funcionales y de contrato del prototipo. |
| `prototipo/.openai/hosting.json` | Declaración del servicio de almacenamiento utilizado por el sitio. |

## 4. Requisitos técnicos

- Node.js 22.13.0 o superior.
- npm.
- Entorno compatible con Vinext/Vite y Cloudflare Workers.
- Base de datos D1 enlazada con el nombre `DB` para la sincronización entre dispositivos.

Para preparar y comprobar el proyecto:

```bash
cd prototipo
npm ci
npm run build
node --test tests/*.test.mjs
```

Para abrirlo en desarrollo:

```bash
npm run dev
```

La sincronización real entre dispositivos requiere un entorno que ejecute el Worker, disponga del enlace D1 `DB` y aplique la migración incluida en `drizzle/0000_numerous_stone_men.sql`. Una vista estática o un servidor que omita el Worker no reproduce esa función.

## 5. Funcionamiento de la sesión compartida

1. La vista adulto crea una sesión mediante `POST /api/sessions`.
2. El servicio asigna un código aleatorio de seis caracteres y guarda el estado inicial.
3. La vista estudiante consulta la sesión utilizando ese código.
4. Cada cambio relevante actualiza el estado mediante `PUT /api/sessions/{codigo}`.
5. Las pantallas consultan periódicamente la revisión vigente y aplican los cambios sin recarga manual.
6. Una pantalla recargada vuelve a consultar el estado guardado y continúa desde el punto vigente.
7. Cada código utiliza un registro independiente para evitar que dos clases simultáneas se mezclen.

## 6. Criterios obligatorios de conservación

Antes de realizar cualquier modificación, conservar una copia íntegra de esta entrega como línea base.

No modificar sin autorización expresa:

- contenido pedagógico;
- textos y respuestas esperadas;
- orden de las pantallas;
- rutas de apoyo;
- lógica del mini quiz;
- identidad y recursos visuales;
- videos o audio;
- separación de las vistas adulto y estudiante;
- información privada del adulto;
- comportamiento de sincronización aprobado.

No incorporar sistemas de usuarios, pagos, perfiles, analítica, nuevas actividades ni rediseños si la tarea asignada no los solicita expresamente.

## 7. Prueba mínima de aceptación

La revisión técnica debe realizarse con dos sesiones de navegador independientes y, para la comprobación final, con dos dispositivos:

1. Abrir la vista adulto y crear una clase.
2. Abrir la vista estudiante en otro navegador o dispositivo e ingresar mediante el enlace o código.
3. Confirmar que ambos muestran el mismo código de sesión.
4. Comprobar inicio, avance y retroceso.
5. Comprobar la aparición de contenidos y preguntas.
6. Comprobar reproducción, pausa y continuidad de ambos videos.
7. Completar el mini quiz y verificar sus resultados.
8. Activar al menos una ruta de apoyo y una de refuerzo.
9. Llegar al cierre de la clase.
10. Reiniciar y comprobar que ambas vistas regresan al inicio.
11. Recargar la vista estudiante durante la clase y verificar que recupera el punto vigente.
12. Crear una segunda sesión y confirmar que sus cambios no afectan la primera.
13. Confirmar que las respuestas esperadas, criterios e instrucciones privadas no aparecen en la vista estudiante.

## 8. Regla de trabajo

Toda intervención debe partir del contenido real de la carpeta `prototipo`, identificar con precisión los archivos afectados y limitar los cambios al encargo recibido. Al entregar una modificación, se debe informar qué archivos cambiaron, qué se comprobó y cualquier limitación técnica pendiente.
