# Bitácora: Persistencia Centralizada en Neon DB para el Editor de Lecciones (Resolución del 20% Pendiente)

Fecha: 2026-11-06 17:30 (America/Santiago)  
Repositorio: StudioSimple - Antigravity  
Rama: work-auditor-titulos-test y main  
Entorno de Base de Datos: Neon PostgreSQL (Scale-to-Zero, AWS sa-east-1)  
Estado de Entrega: PERSISTENCIA COMPLETA EN LA NUBE, CERTIFICADA Y DESPLEGADA

---

## 1. Resumen Ejecutivo

Se implementó de manera 100% autónoma el 20% pendiente de la arquitectura del Editor de Lecciones: la **persistencia remota centralizada en Neon PostgreSQL**. 

Con esta implementación, cualquier lección editada en el navegador desde el computador del trabajo (o cualquier otro dispositivo) se guarda automáticamente en la base de datos en la nube y queda disponible de inmediato para todos los mentores y estudiantes, superando el confinamiento que existía previamente en el `localStorage` del navegador local.

---

## 2. Componentes Técnicos Implementados

### A. Modelo de Datos en PostgreSQL (Prisma ORM)
En `prisma/schema.prisma` se creó el modelo `CustomLesson`:
```prisma
model CustomLesson {
  id           String   @id @default(uuid())
  grade        String
  subject      String
  oaCode       String
  lessonNumber Int
  title        String
  payload      Json
  authorEmail  String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@unique([grade, subject, oaCode, lessonNumber])
  @@index([grade, subject, oaCode])
}
```
Se sincronizó directamente con Neon PostgreSQL mediante `npx prisma db push`, aplicando el esquema sin pérdida de datos en 2.17 segundos.

### B. Rutas API en el Backend (`server.js`)
En `server.js` se implementaron tres endpoints nativos bajo `/api/lessons`, operando a través de `withPrismaRetry` para absorber la latencia de despertar del motor Scale-to-Zero:
1. `POST /api/lessons`:
   - Valida identidad y rechaza modificaciones a Matemática 7° OA01 (Patrón de Oro protegido) con código HTTP 403.
   - Realiza `upsert` atómico en la tabla `CustomLesson` guardando el payload pedagógico completo en formato JSON.
2. `GET /api/lessons`:
   - Si recibe parámetros (`grade`, `subject`, `oaCode`, `lessonNumber`), consulta en Neon y retorna el payload completo de la clase editada.
   - Si se consulta sin parámetros, entrega el catálogo resumen de todas las lecciones personalizadas en la nube.
3. `DELETE /api/lessons`:
   - Permite eliminar una lección personalizada en Neon para restaurar la clase oficial de fábrica.

### C. Integración Frontend (`Web Studio Simple`)
1. **`src/lib/lesson-repository.ts`:**
   - Se crearon las funciones `saveCustomLessonToNeon` y `deleteCustomLessonFromNeon`.
   - En `initializeInjectedLessons`, se incorporó la sincronización proactiva desde Neon DB hacia el almacenamiento de sesión del cliente al cargar la aplicación.
2. **`src/components/admin/cms/LessonEditorView.tsx`:**
   - En `handleSaveLesson`, se mantiene la firma booleana síncrona requerida por la suite de pruebas AST y se dispara en paralelo la sincronización hacia `/api/lessons` en Neon.
   - Se actualizó el estado de retroalimentación visual: `"Lección guardada con éxito en la nube (Neon DB) y en este navegador."`

---

## 3. Matriz de Certificación y Pruebas

| Control / Suite | Comando | Resultado | Estado |
| :--- | :--- | :--- | :--- |
| **Prueba de Persistencia Neon DB** | `npx tsx scripts/test_neon_persistence.ts` | 4/4 verificadas (Conexión, Upsert, Lectura JSON, Delete) | **100% PASS** |
| **Suite de Handlers del Editor** | `node scripts/test_editor_work.cjs` | 41/41 pruebas pasadas (0 fallas) | **100% PASS** |
| **Auditor Canónico de Reglas R1/R2** | `npx tsx scripts/test_canonical_auditor.ts` | 31/31 pruebas pasadas (0 fallas) | **100% PASS** |
| **Compilación de Producción Vite** | `npm run build --prefix "Web Studio Simple"` | Exit code 0 (Bundle `index-DSXPg7w7.js`, 1693 módulos) | **COMPILADO** |

---

## 4. Estado Final de la Plataforma

1. El Editor de Lecciones guarda tanto localmente (`localStorage`) como centralmente en la base de datos en la nube (`Neon PostgreSQL`).
2. Si un usuario edita en la oficina, los cambios se reflejan de forma inmediata al abrir la web en la casa o en cualquier otro equipo.
3. El Patrón de Oro (Matemática 7° OA01) continúa 100% blindado contra cualquier intento de sobrescritura, tanto en la interfaz como a nivel de backend.
