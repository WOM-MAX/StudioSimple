# Bitacora: Ilustraciones Ad-Hoc en Espanol, Navegacion Post-Leccion, Tarjetas Verticales y Precision Pedagogica Sin Ambiguedades

- Fecha: 2026-09-23
- Hora: 19:05
- Modulos afectados: Lecciones sincronizadas, ilustrador didactico, catalogo de lecciones en ParentDashboard/StudentDashboard y adaptador curricular.
- Estado: Completado y validado (tsc 0 errores, build de produccion exitoso).

## 1. Contexto y Diagnostico
A partir de la revision funcional con el usuario, se detectaron y resolvieron 5 problemas fundamentales:
1. **Ilustraciones en ingles y sobrecargadas:** Las imagenes anteriores contenian texto en ingles y elementos distractores. Ademas, en Clase 2 de Matematica se repetia 5 veces la misma recta generica.
2. **Navegacion erronea al finalizar la clase:** En AdultLessonView y StudentLessonView, al pulsar el boton de volver se ejecutaba setViewMode('courses'), enviando al usuario al selector general de cursos en lugar de mantenerlo en su panel de lecciones con el OA seleccionado.
3. **Diseno de tarjetas de lecciones horizontal:** El catalogo de clases utilizaba 2 columnas horizontales alargadas poco optimizadas para moviles y Bento vertical.
4. **Confeti:** Confirmacion de que el confeti permanece estrictamente aislado en la pantalla del estudiante.
5. **Ambiguedad en panel adulto de Ciencias Naturales:** En Ciencias Naturales 7B OA1 Clase 1 se presentaban frases genericas y meta-pedagogicas ambiguas ("describa las observaciones directas y proponga una relacion de causa y efecto preliminar"), obligando al apoderado a adivinar o estudiar previamente.

## 2. Soluciones Implementadas

### A. Ilustraciones Didacticas Ad-Hoc Vectoriales en Espanol (SVG)
Se crearon 11 archivos vectoriales SVG limpios, en espanol, sin sobrecarga cognitiva y especificos para cada situacion en `Web Studio Simple/public/images/lessons/`:
1. `clase1_submarino.svg`: Nivel del mar en 0 m y submarino a -20 m de profundidad.
2. `clase1_termometro.svg`: Escala termica con 0 °C de referencia y marca destacada en -4 °C bajo cero.
3. `clase1_ascensor.svg`: Edificio con corte y cabina que baja 5 pisos indicando movimiento.
4. `clase1_banco.svg`: Tarjeta y saldo en pesos chilenos -$5.000 indicando deuda.
5. `clase2_recta_negativos_izquierda.svg`: Recta numerica horizontal con el 0 al centro, destacando el lado izquierdo con los numeros negativos (-1, -2, -3) y el derecho con positivos.
6. `clase2_cercania_cero.svg`: Comparacion ad-hoc de distancia al cero entre -1 (1 paso) y -4 (4 pasos).
7. `clase2_regla_derecha.svg`: Recta con dos valores B y A (con A a la derecha) indicando que hacia la derecha los valores aumentan (A > B).
8. `clase2_comparacion_negativos.svg`: Recta en zona negativa (-6 a 0) destacando -5 y -2, evidenciando que -2 > -5.
9. `clase2_temperaturas_montana.svg`: Comparacion en refugio cordillerano: Manana (-3 °C) vs Noche (-8 °C), mostrando que -3 °C es mayor.
10. `clase2_estacionamiento_subterraneo.svg`: Edificio con Calle (0) y subterraneos -1, -2 y -3, mostrando que subir a -1 es aumentar de nivel (-1 > -3).
11. `clase2_orden_cuatro_valores.svg`: Recta numerica ordenando de menor a mayor los cuatro valores: -6, -1, 0, +3.

Se actualizaron las rutas en `matematica_7b_oa01_clase01.ts` y `matematica_7b_oa01_clase02.ts`.

### B. Correccion de la Navegacion al Finalizar la Clase
- En `AdultLessonView.tsx` y `StudentLessonView.tsx`, se modifico la accion de retorno en la etapa `completed`:
  `const targetMode = authSession?.role === 'student' ? 'student' : 'parent';`
  `setViewMode(targetMode);`
  Esto asegura que el usuario retorne directamente al panel con el Objetivo de Aprendizaje y las 5 lecciones activas.

### C. Tarjetas de Lecciones en Rectangulos Verticales Responsivos
- En `ParentDashboard.tsx` y `StudentDashboard.tsx`, se reemplazo la grilla de 2 columnas por una grilla responsiva:
  `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4`
- Cada tarjeta adopta proporcion de rectangulo vertical (`h-full min-h-[350px] p-5 rounded-3xl flex flex-col justify-between`), con badge de clase y duracion, indicador de fase pedagogica, titulo jerarquizado, resumen pedagogico y boton de accion anclado al fondo (`mt-auto`).

### D. Precision Pedagogica y Cero Ambiguedad en Ciencias Naturales
- Se desarrollo la leccion curada de alta fidelidad `CIENCIAS_7B_OA01_CLASE01` ("Las 4 Dimensiones de la Sexualidad Humana") en `src/data/lessons/ciencias_7b_oa01_clase01.ts`.
- Contiene explicaciones 100% claras y concretas:
  - Ayuda pedagogica con las 4 dimensiones reales: biologica, afectiva, social y etica.
  - Preguntas precisas sobre cambios fisicos observables de la pubertad (crecimiento, cambio de voz, vello corporal).
  - Opciones de respuesta reales para lo que dice el estudiante, liberando al apoderado de tener que interpretar meta-pedagogia.
- Se registro en `src/data/lessons/index.ts` y en `lesson-repository.ts` (`findInjectedLesson`), quedando activa inmediatamente en la plataforma.
- Se refinaron las plantillas de `lesson-generator.ts` y `lesson-adapter.ts` para eliminar frases ambiguas en todas las asignaturas.

## 3. Validacion Tecnica
- `npx tsc --noEmit`: 0 errores en todo el proyecto.
- `npm run build`: Compilacion y empaquetado de produccion Vite v5.4.21 exitoso en 9.15 segundos.
