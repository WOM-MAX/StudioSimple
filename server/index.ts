import http, { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

// Cargar variables de entorno si existe .env y process.loadEnvFile esta disponible
if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile();
  } catch {
    // Si no existe .env (ej. Railway inyecta por entorno), continuar
  }
}

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';

// Directorio del frontend compilado por Vite
const DIST_DIR = path.resolve(process.cwd(), 'Web Studio Simple', 'dist');
const FALLBACK_DIST_DIR = path.resolve(process.cwd(), 'dist');
const PUBLIC_DIR = fs.existsSync(DIST_DIR) ? DIST_DIR : (fs.existsSync(FALLBACK_DIST_DIR) ? FALLBACK_DIST_DIR : '');

// -----------------------------------------------------------------------------
// NEON SCALE-TO-ZERO DATA ACCESS LAYER (Stateless / Instant Disconnect)
// -----------------------------------------------------------------------------

export async function withPrisma<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });
  try {
    return await fn(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

// -----------------------------------------------------------------------------
// WHITELIST CACHE SHIELD (Memoria RAM para Lecturas Publicas)
// -----------------------------------------------------------------------------

let curriculumCache: unknown[] | null = null;

async function getCachedCurriculum(): Promise<unknown[]> {
  if (curriculumCache && curriculumCache.length > 0) {
    return curriculumCache;
  }

  try {
    // Intentar leer desde Neon DB una sola vez
    const oas = await withPrisma(async (prisma) => {
      return await prisma.learning_objectives.findMany({
        include: {
          bloom_activities: true,
          dua_strategies: true
        },
        take: 1000
      });
    });

    if (oas && oas.length > 0) {
      curriculumCache = oas;
      return curriculumCache;
    }
  } catch (err) {
    console.warn('[CacheShield] No fue posible consultar Neon DB, cargando fallback JSON:', err);
  }

  // Fallback a neonCurriculum.json si Neon no esta disponible o esta suspendida
  try {
    const jsonPath = path.resolve(process.cwd(), 'Web Studio Simple', 'src', 'data', 'neonCurriculum.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      curriculumCache = data;
      return curriculumCache;
    }
  } catch (e) {
    console.error('[CacheShield] Error al leer fallback de curriculum:', e);
  }

  return [];
}

// -----------------------------------------------------------------------------
// MIME TYPES PARA ARCHIVOS ESTATICOS
// -----------------------------------------------------------------------------

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

// -----------------------------------------------------------------------------
// HELPER PARA LECTURA DE CUERPO HTTP (JSON)
// -----------------------------------------------------------------------------

function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 2 * 1024 * 1024) { // Maximo 2MB
        reject(new Error('Payload Too Large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// -----------------------------------------------------------------------------
// SERVIDOR HTTP PRINCIPAL
// -----------------------------------------------------------------------------

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;
  const method = req.method || 'GET';

  // Configurar CORS basico
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ---------------------------------------------------------------------------
  // RUTAS DE API (/api/*)
  // ---------------------------------------------------------------------------

  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // 1. Healthcheck (Sin tocar Neon DB -> 0 costo, scale-to-zero preservado)
    if (pathname === '/api/health') {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'StudioSimple Web App',
        neon: 'scale-to-zero-ready',
        uptimeSeconds: Math.floor(process.uptime())
      }));
      return;
    }

    // 2. Curriculum (Lectura con Cache Shield en RAM)
    if (pathname === '/api/curriculum' && method === 'GET') {
      try {
        const items = await getCachedCurriculum();
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, count: items.length, data: items }));
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Error desconocido';
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: msg }));
      }
      return;
    }

    // 3. Autenticacion: Login
    if (pathname === '/api/auth/login' && method === 'POST') {
      try {
        const body = await readJsonBody(req);
        const { identifier, pin } = body as { identifier?: string; pin?: string };

        const user = await withPrisma(async (prisma) => {
          if (!identifier) return null;
          return await prisma.user.findFirst({
            where: {
              OR: [
                { email: identifier },
                { rut: identifier },
                { studentRun: identifier }
              ]
            }
          });
        });

        if (!user) {
          res.writeHead(401);
          res.end(JSON.stringify({ success: false, message: 'Usuario no encontrado' }));
          return;
        }

        // Si es estudiante y tiene PIN configurado
        if (pin && user.studentPin && user.studentPin !== pin) {
          res.writeHead(401);
          res.end(JSON.stringify({ success: false, message: 'PIN de estudiante incorrecto' }));
          return;
        }

        res.writeHead(200);
        res.end(JSON.stringify({ success: true, user }));
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Error interno';
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: msg }));
      }
      return;
    }

    // 4. Registro y Checkout (Persistencia de usuario y orden en Neon DB)
    if (pathname === '/api/checkout' && method === 'POST') {
      try {
        const body = await readJsonBody(req);
        const {
          rut,
          name,
          email,
          studentName,
          studentRun,
          grade,
          plan,
          phone,
          amount
        } = body as {
          rut?: string;
          name?: string;
          email?: string;
          studentName?: string;
          studentRun?: string;
          grade?: string;
          plan?: 'mensual' | 'anual';
          phone?: string;
          amount?: number;
        };

        if (!email || !name) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, message: 'Faltan campos obligatorios' }));
          return;
        }

        const result = await withPrisma(async (prisma) => {
          // Upsert de Usuario
          const user = await prisma.user.upsert({
            where: { email },
            update: {
              name,
              rut: rut || undefined,
              phone: phone || undefined,
              subscriptionActive: true,
              plan: plan || 'mensual',
              studentName: studentName || undefined,
              studentRun: studentRun || undefined,
              enrolledGrades: grade ? [grade] : undefined,
              lastLogin: new Date()
            },
            create: {
              email,
              name,
              rut: rut || null,
              phone: phone || null,
              subscriptionActive: true,
              plan: plan || 'mensual',
              studentName: studentName || null,
              studentRun: studentRun || null,
              enrolledGrades: grade ? [grade] : []
            }
          });

          // Crear registro de orden
          const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
          const order = await prisma.subscriptionOrder.create({
            data: {
              orderNumber,
              userId: user.id,
              plan: plan || 'mensual',
              amount: amount || (plan === 'anual' ? 149990 : 19990),
              status: 'paid',
              paymentMethod: 'simulated_webpay'
            }
          });

          return { user, order };
        });

        res.writeHead(200);
        res.end(JSON.stringify({ success: true, ...result }));
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Error en checkout';
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: msg }));
      }
      return;
    }

    // 5. Progreso de Lecciones: Consulta y Guardado
    if (pathname.startsWith('/api/progress')) {
      if (method === 'GET') {
        const studentId = pathname.replace('/api/progress/', '').trim();
        try {
          const progressList = await withPrisma(async (prisma) => {
            return await prisma.studentProgress.findMany({
              where: studentId ? { studentId } : undefined
            });
          });
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, data: progressList }));
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : 'Error al obtener progreso';
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: msg }));
        }
        return;
      }

      if (method === 'POST') {
        try {
          const body = await readJsonBody(req);
          const { studentId, lessonId, completed, score, gems, curiosityPoints } = body as {
            studentId?: string;
            lessonId?: string;
            completed?: boolean;
            score?: number;
            gems?: number;
            curiosityPoints?: number;
          };

          if (!studentId || !lessonId) {
            res.writeHead(400);
            res.end(JSON.stringify({ success: false, message: 'studentId y lessonId son requeridos' }));
            return;
          }

          const saved = await withPrisma(async (prisma) => {
            return await prisma.studentProgress.upsert({
              where: {
                studentId_lessonId: { studentId, lessonId }
              },
              update: {
                completed: completed ?? true,
                completedAt: new Date(),
                score: score ?? 100,
                gems: gems ? { increment: gems } : undefined,
                curiosityPoints: curiosityPoints ? { increment: curiosityPoints } : undefined
              },
              create: {
                studentId,
                lessonId,
                completed: completed ?? true,
                completedAt: new Date(),
                score: score ?? 100,
                gems: gems ?? 10,
                curiosityPoints: curiosityPoints ?? 50
              }
            });
          });

          res.writeHead(200);
          res.end(JSON.stringify({ success: true, data: saved }));
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : 'Error al registrar progreso';
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: msg }));
        }
        return;
      }
    }

    // Ruta de API no encontrada
    res.writeHead(404);
    res.end(JSON.stringify({ success: false, message: 'Endpoint no encontrado' }));
    return;
  }

  // ---------------------------------------------------------------------------
  // SERVIR ARCHIVOS ESTATICOS DE VITE (dist/) CON SPA FALLBACK
  // ---------------------------------------------------------------------------

  if (!PUBLIC_DIR) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>StudioSimple</h1><p>Frontend aun no compilado. Ejecute <code>npm run build</code>.</p>');
    return;
  }

  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

  // Comprobar si el archivo solicitado existe
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Headers de Cache Optimizados
    if (pathname.startsWith('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (ext === '.html') {
      res.setHeader('Cache-Control', 'no-cache');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // SPA Fallback: Si no es un archivo estatico ni ruta de API, servir index.html
  const indexPath = path.join(PUBLIC_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.writeHead(200);
    fs.createReadStream(indexPath).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
});

// Iniciar servidor
server.listen(PORT, HOST, () => {
  console.log(`[StudioSimple] Servidor de produccion activo en http://${HOST}:${PORT}`);
  console.log(`[StudioSimple] Scale-to-Zero habilitado para Neon PostgreSQL`);
  console.log(`[StudioSimple] Directorio estatico: ${PUBLIC_DIR || 'No encontrado'}`);
});
