# Bitacora de Arquitectura: Optimizacion de Costos Neon Scale-to-Zero y Despliegue en Railway

- Fecha: 2026-10-02 19:10
- Proyecto: EstudioSimple
- Objetivo: Implementar arquitectura de despliegue en Railway y persistencia en Neon PostgreSQL minimizando al maximo el consumo de computo y asegurando suspension automatica (Scale-to-Zero).
- Referencia: Metodologia Scale-to-Zero implementada en `colegio-acropolis`.

## 1. Diagnostico y Resolucion del Problema de Costos

### 1.1 Inactividad en Neon PostgreSQL (191.9 Horas Gratuitas)
Neon suspende sus instancias de computo tras 5 minutos de inactividad total (cero consultas y cero conexiones TCP abiertas). Los clientes tradicionales de base de datos (pools persistentes en Node) mantienen sockets abiertos de forma indefinida, impidiendo que el contador de inactividad se active y agotando las horas de computo en dias.

### 1.2 Soluciones Implementadas para Neon
1. **Patron Stateless con Desconexion Inmediata (`withPrisma`):**
   - Cada operacion de base de datos ejecuta su consulta e invoca de inmediato `await prisma.$disconnect()`.
   - Se libera el socket TCP en milisegundos, permitiendo que Neon active su cuenta regresiva de 5 minutos hacia `Endpoint Inactive`.
2. **Whitelist Cache Shield en Memoria RAM:**
   - La consulta curricular de los 628 Objetivos de Aprendizaje se almacena en memoria tras la primera lectura.
   - Todo visitante, estudiante o robot que navegue por los cursos y asignaturas recibe los datos desde RAM en 0 ms, sin tocar la base de datos.
3. **Healthcheck Aislado (`/api/health`):**
   - El endpoint de sondeo de Railway responde codigo 200 con estado del servicio y uptime sin ejecutar consultas a Neon, garantizando que el monitoreo de infraestructura no despierte a la base de datos.

### 1.3 Soluciones Implementadas para Railway
1. **Contenedor Multi-Stage (`node:20-alpine`):**
   - Imagen ligera de produccion sin compiladores innecesarios ni herramientas de desarrollo.
   - Uso de usuario seguro no root (`nodejs:nodejs`).
2. **Servidor Hibrido Ligero (`server.js`):**
   - Servidor Node nativo que sirve los archivos estaticos compilados por Vite (`dist/`) con cabeceras de cache (`immutable` para assets, `no-cache` para HTML) y maneja las rutas de backend (`/api/*`).
   - Cero polling recurrente (`setInterval`) en segundo plano.
3. **Configuracion Railway (`railway.json` y `.dockerignore`):**
   - `.dockerignore` filtra mas de 2 GB de documentos auxiliares, videos locales y borradores, acelerando el proceso de construccion.
   - `railway.json` fija el healthcheck en `/api/health` y reinicios unicamente ante fallos reales.

## 2. Esquema de Datos Sincronizado en Neon
Se actualizo `prisma/schema.prisma` a PostgreSQL preservando intactas las tablas preexistentes con sus 628 registros:
- `learning_objectives` (628 registros preservados)
- `bloom_activities` (628 registros preservados)
- `dua_strategies` (628 registros preservados)
Y se incorporaron los modelos de persistencia:
- `User`: Registro de apoderados y estudiantes (RUT, email, password, cursos habilitados, PIN).
- `StudentProgress`: Registro de lecciones completadas por estudiante (gemas, puntos, fecha).
- `SubscriptionOrder`: Registro de transacciones y suscripciones de checkout.

## 3. Pruebas y Evidencia de Funcionamiento
- `npm run build`: Compilacion Vite completada con codigo de salida 0 en 10.88 segundos.
- `Healthcheck`: HTTP 200 `{ status: "ok", neon: "scale-to-zero-ready" }`.
- `Curriculum`: HTTP 200 (628 items leidos y cacheados).
- `Checkout`: HTTP 200 (Usuario y Orden persistidos en Neon).
- `Progress`: HTTP 200 (Progreso registrado exitosamente en Neon).
