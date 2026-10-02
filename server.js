// server.js - Servidor de produccion ligero para Railway y Neon Scale-to-Zero
const http = require('http');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// Cargar variables de entorno nativamente en Node 20+ si existe .env
if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile();
  } catch {
    // Si no existe archivo .env (ej. inyeccion por entorno en Railway), continuar normalmente
  }
}

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';

// Directorio del frontend compilado por Vite
const DIST_DIR = path.resolve(__dirname, 'Web Studio Simple', 'dist');
const FALLBACK_DIST_DIR = path.resolve(__dirname, 'dist');
const PUBLIC_DIR = fs.existsSync(DIST_DIR) ? DIST_DIR : (fs.existsSync(FALLBACK_DIST_DIR) ? FALLBACK_DIST_DIR : '');

// -----------------------------------------------------------------------------
// NEON SCALE-TO-ZERO DATA ACCESS LAYER (Stateless / Instant Disconnect)
// -----------------------------------------------------------------------------

async function withPrisma(fn) {
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
    // Desconecta la conexion inmediatamente tras la consulta
    // Esto permite que Neon active su temporizador de inactividad de 5 minutos y se suspenda
    await prisma.$disconnect();
  }
}

// -----------------------------------------------------------------------------
// WHITELIST CACHE SHIELD (Memoria RAM para Lecturas Publicas)
// -----------------------------------------------------------------------------

let curriculumCache = null;

async function getCachedCurriculum() {
  if (curriculumCache && curriculumCache.length > 0) {
    return curriculumCache;
  }

  try {
    // Consultar Neon DB una unica vez al inicio
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
    console.warn('[CacheShield] No fue posible consultar Neon DB, cargando fallback JSON:', err.message);
  }

  // Fallback estatico si Neon esta suspendida o no responde
  try {
    const jsonPath = path.resolve(__dirname, 'Web Studio Simple', 'src', 'data', 'neonCurriculum.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      curriculumCache = data;
      return curriculumCache;
    }
  } catch (e) {
    console.error('[CacheShield] Error al leer fallback de curriculum:', e.message);
  }

  return [];
}

// -----------------------------------------------------------------------------
// MIME TYPES PARA ARCHIVOS ESTATICOS
// -----------------------------------------------------------------------------

const MIME_TYPES = {
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

function readJsonBody(req) {
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

const server = http.createServer(async (req, res) => {
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

    // 1. Healthcheck (Sin tocar Neon DB -> $0 costo, scale-to-zero preservado)
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
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
      return;
    }

    // 3. Autenticacion: Login
    if (pathname === '/api/auth/login' && method === 'POST') {
      try {
        const body = await readJsonBody(req);
        const { identifier, pin } = body;

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

        if (pin && user.studentPin && user.studentPin !== pin) {
          res.writeHead(401);
          res.end(JSON.stringify({ success: false, message: 'PIN de estudiante incorrecto' }));
          return;
        }

        res.writeHead(200);
        res.end(JSON.stringify({ success: true, user }));
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: err.message }));
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
        } = body;

        if (!email || !name) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, message: 'Faltan campos obligatorios' }));
          return;
        }

        const result = await withPrisma(async (prisma) => {
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
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: err.message }));
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
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
        return;
      }

      if (method === 'POST') {
        try {
          const body = await readJsonBody(req);
          const { studentId, lessonId, completed, score, gems, curiosityPoints } = body;

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
                completed: completed !== undefined ? completed : true,
                completedAt: new Date(),
                score: score || 100,
                gems: gems ? { increment: gems } : undefined,
                curiosityPoints: curiosityPoints ? { increment: curiosityPoints } : undefined
              },
              create: {
                studentId,
                lessonId,
                completed: completed !== undefined ? completed : true,
                completedAt: new Date(),
                score: score || 100,
                gems: gems || 10,
                curiosityPoints: curiosityPoints || 50
              }
            });
          });

          res.writeHead(200);
          res.end(JSON.stringify({ success: true, data: saved }));
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: err.message }));
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
    res.end('<h1>StudioSimple</h1><p>Frontend compilado no encontrado. Ejecute <code>npm run build</code>.</p>');
    return;
  }

  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

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

  // SPA Fallback: Servir index.html
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

server.listen(PORT, HOST, () => {
  console.log(`[StudioSimple] Servidor de produccion activo en http://${HOST}:${PORT}`);
  console.log(`[StudioSimple] Scale-to-Zero habilitado para Neon PostgreSQL`);
  console.log(`[StudioSimple] Directorio estatico: ${PUBLIC_DIR || 'No encontrado'}`);
});
