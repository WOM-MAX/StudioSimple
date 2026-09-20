# Registro de Memoria: Eliminacion de Columna Inexacta en Tabla de Cobertura Curricular

Fecha: 2026-09-17 19:27 CLST
Modulo: PricingPage.tsx (Seccion 4: Cobertura Curricular Oficial)

## 1. Contexto y Diagnostico
El usuario senalo una inconsistencia en la tabla de Cobertura Curricular Oficial (3º a 8º Basico) de la pagina de Planes y Precios:
1. La cuarta columna decia "Ejercicios en Cuaderno" y repetia "✓ Incluido" en todas las filas.
2. Esto generaba confusion al apoderado, pues sugeria falsamente la entrega o envio de un cuaderno fisico o contradecia lo ofrecido en los planes.
3. El encabezado presentaba ademas un salto de linea forzado que partio la palabra ("EJERCICIO S EN CUADERNO").
4. El usuario instruyo su eliminacion estricta para apegarse a las Bases Curriculares oficiales del MINEDUC sin afirmaciones inexactas.

## 2. Acciones Realizadas
- Se elimino la cuarta columna ("Ejercicios en Cuaderno") tanto del `<thead>` como de las 5 filas del `<tbody>` en `PricingPage.tsx`.
- La tabla quedo estructurada estrictamente en 3 columnas normadas por MINEDUC:
  1. `Asignatura Oficial`: con su indicador de color institucional y nombre oficial.
  2. `Ejes Curriculares Clave`: con el desglose tematico oficial MINEDUC, que ahora cuenta con amplio espacio horizontal.
  3. `Nivel Cubierto`: estandarizado con `whitespace-nowrap` en 3º a 8º Basico.

## 3. Verificacion Tecnica
- Compilacion validada mediante `npx tsc --noEmit` con codigo de salida 0 (cero errores).
