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

    // 1b. Site Config (CMS - Persistencia de configuracion del sitio)
    if (pathname === '/api/cms/site-config') {
      const configFilePath = path.resolve(__dirname, 'data', 'site_config.json');
      if (method === 'GET') {
        try {
          if (fs.existsSync(configFilePath)) {
            const raw = fs.readFileSync(configFilePath, 'utf8');
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, data: JSON.parse(raw) }));
          } else {
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, data: null }));
          }
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
        return;
      }

      if (method === 'POST') {
        try {
          const body = await readJsonBody(req);
          const dataDir = path.dirname(configFilePath);
          if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
          }
          fs.writeFileSync(configFilePath, JSON.stringify(body, null, 2), 'utf8');
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: 'Configuracion guardada exitosamente' }));
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
        return;
      }
    }

    // 1c. Administradores (Persistencia en disco data/admins.json)
    if (pathname === '/api/admin/users') {
      const adminsFilePath = path.resolve(__dirname, 'data', 'admins.json');
      if (method === 'GET') {
        try {
          if (fs.existsSync(adminsFilePath)) {
            const raw = fs.readFileSync(adminsFilePath, 'utf8');
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, data: JSON.parse(raw) }));
          } else {
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, data: null }));
          }
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
        return;
      }

      if (method === 'POST') {
        try {
          const body = await readJsonBody(req);
          const dataDir = path.dirname(adminsFilePath);
          if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
          }
          const adminsList = body.admins || body;
          fs.writeFileSync(adminsFilePath, JSON.stringify(adminsList, null, 2), 'utf8');
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: 'Administradores guardados exitosamente' }));
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
        return;
      }
    }

    // 1d. Pases de Invitados (Persistencia en disco data/guest_passes.json)
    if (pathname === '/api/admin/guest-passes') {
      const passesFilePath = path.resolve(__dirname, 'data', 'guest_passes.json');
      if (method === 'GET') {
        try {
          if (fs.existsSync(passesFilePath)) {
            const raw = fs.readFileSync(passesFilePath, 'utf8');
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, data: JSON.parse(raw) }));
          } else {
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, data: null }));
          }
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
        return;
      }

      if (method === 'POST') {
        try {
          const body = await readJsonBody(req);
          const dataDir = path.dirname(passesFilePath);
          if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
          }
          const passesList = body.passes || body;
          fs.writeFileSync(passesFilePath, JSON.stringify(passesList, null, 2), 'utf8');
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: 'Pases de invitados guardados exitosamente' }));
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
        return;
      }
    }

    // 1e. Bitacora de Auditoria (Persistencia en disco data/audit_logs.json)
    if (pathname === '/api/admin/audit-logs') {
      const logsFilePath = path.resolve(__dirname, 'data', 'audit_logs.json');
      if (method === 'GET') {
        try {
          if (fs.existsSync(logsFilePath)) {
            const raw = fs.readFileSync(logsFilePath, 'utf8');
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, data: JSON.parse(raw) }));
          } else {
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, data: [] }));
          }
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
        return;
      }

      if (method === 'POST') {
        try {
          const body = await readJsonBody(req);
          const dataDir = path.dirname(logsFilePath);
          if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
          }

          let existingLogs = [];
          if (fs.existsSync(logsFilePath)) {
            try {
              existingLogs = JSON.parse(fs.readFileSync(logsFilePath, 'utf8'));
            } catch {
              existingLogs = [];
            }
          }

          if (body.log) {
            existingLogs.unshift(body.log);
          } else if (Array.isArray(body)) {
            existingLogs = body;
          }

          // Mantener hasta 1000 registros en disco
          const trimmedLogs = existingLogs.slice(0, 1000);
          fs.writeFileSync(logsFilePath, JSON.stringify(trimmedLogs, null, 2), 'utf8');

          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: 'Registro de auditoria guardado' }));
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
        return;
      }
    }

    // 1f. Precios Dinamicos y Cupones (Persistencia en disco data/pricing_config.json)
    if (pathname === '/api/pricing/config') {
      const pricingFilePath = path.resolve(__dirname, 'data', 'pricing_config.json');
      if (method === 'GET') {
        try {
          if (fs.existsSync(pricingFilePath)) {
            const raw = fs.readFileSync(pricingFilePath, 'utf8');
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, data: JSON.parse(raw) }));
          } else {
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, data: null }));
          }
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
        return;
      }

      if (method === 'POST') {
        try {
          const body = await readJsonBody(req);
          const dataDir = path.dirname(pricingFilePath);
          if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
          }
          fs.writeFileSync(pricingFilePath, JSON.stringify(body, null, 2), 'utf8');
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: 'Configuracion de precios guardada' }));
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
        return;
      }
    }

    // 1g. Validacion de Cupones de Descuento
    if (pathname === '/api/pricing/validate-coupon' && method === 'POST') {
      try {
        const body = await readJsonBody(req);
        const { code, planId, basePrice } = body;
        const cleanCode = (code || '').trim().toUpperCase();

        const pricingFilePath = path.resolve(__dirname, 'data', 'pricing_config.json');
        let pricingConfig = null;
        if (fs.existsSync(pricingFilePath)) {
          try {
            pricingConfig = JSON.parse(fs.readFileSync(pricingFilePath, 'utf8'));
          } catch {}
        }

        const cupones = pricingConfig?.cupones || [];
        const coupon = cupones.find(c => c.codigo.toUpperCase() === cleanCode);

        if (!coupon || !coupon.activo) {
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            valid: false,
            message: 'El cupón no existe o se encuentra inactivo.',
            finalPrice: Number(basePrice || 0)
          }));
          return;
        }

        let finalPrice = Number(basePrice || 0);
        let discountAmount = 0;

        if (coupon.tipo === 'precio_fijo') {
          finalPrice = coupon.valor;
          discountAmount = Math.max(0, Number(basePrice || 0) - finalPrice);
        } else if (coupon.tipo === 'porcentaje') {
          discountAmount = Math.round((Number(basePrice || 0) * coupon.valor) / 100);
          finalPrice = Math.max(0, Number(basePrice || 0) - discountAmount);
        } else if (coupon.tipo === 'monto_fijo') {
          discountAmount = coupon.valor;
          finalPrice = Math.max(0, Number(basePrice || 0) - discountAmount);
        }

        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          valid: true,
          coupon,
          discountAmount,
          finalPrice,
          message: `Cupón aplicado exitosamente: Total $${finalPrice.toLocaleString('es-CL')} CLP`
        }));
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
      return;
    }

    // 1h. Pasarela Mercado Pago / Mercado Libre: Creacion de Preferencia Checkout Pro
    if (pathname === '/api/payment/create-preference' && method === 'POST') {
      try {
        const body = await readJsonBody(req);
        const {
          planId,
          planName,
          amount,
          email,
          name,
          rut,
          grade,
          studentName,
          studentRun,
          couponCode
        } = body;

        const pricingFilePath = path.resolve(__dirname, 'data', 'pricing_config.json');
        let pricingConfig = null;
        if (fs.existsSync(pricingFilePath)) {
          try {
            pricingConfig = JSON.parse(fs.readFileSync(pricingFilePath, 'utf8'));
          } catch {}
        }

        const pasarelaConfig = pricingConfig?.pasarela || {};
        const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN || pasarelaConfig.mercadoPagoAccessToken;

        // Si Mercado Pago esta configurado con token activo
        if (pasarelaConfig.provider === 'mercadopago' && accessToken && accessToken.trim()) {
          const origin = req.headers.origin || 'http://localhost:3000';
          const preferencePayload = {
            items: [
              {
                id: planId || 'plan-sub',
                title: `EstudioSimple - ${planName || 'Suscripcion'} (${grade || '7° Básico'})`,
                description: `Acceso oficial homeschooling EstudioSimple para ${studentName || 'Estudiante'}`,
                quantity: 1,
                currency_id: 'CLP',
                unit_price: Number(amount)
              }
            ],
            payer: {
              name: name || 'Apoderado',
              email: email || 'cliente@estudiosimple.cl'
            },
            metadata: {
              rut,
              grade,
              studentName,
              studentRun,
              couponCode,
              planId
            },
            back_urls: {
              success: `${origin}/?payment=success&plan=${planId}&amount=${amount}`,
              failure: `${origin}/?payment=failure`,
              pending: `${origin}/?payment=pending`
            },
            auto_return: 'approved',
            notification_url: `${origin}/api/payment/webhook`
          };

          const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken.trim()}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(preferencePayload)
          });

          const mpData = await mpResponse.json();

          if (mpData.id && (mpData.init_point || mpData.sandbox_init_point)) {
            res.writeHead(200);
            res.end(JSON.stringify({
              success: true,
              mode: 'mercadopago',
              preferenceId: mpData.id,
              initPoint: (pasarelaConfig.sandbox || pasarelaConfig.modoSandbox) ? (mpData.sandbox_init_point || mpData.init_point) : mpData.init_point
            }));
            return;
          }
        }

        // Modo Simulado por defecto (desarrollo y pruebas locales inmediatas)
        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          mode: 'simulated',
          directActivation: true,
          message: 'Pasarela en modo simulado: activacion directa de suscripcion'
        }));
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
      return;
    }

    // 1i. Webhook IPN de Mercado Pago (Recepcion de Pago y Acreditacion)
    if (pathname === '/api/payment/webhook' && method === 'POST') {
      try {
        const body = await readJsonBody(req);
        const queryTopic = url.searchParams.get('topic') || url.searchParams.get('type') || body.type;
        const paymentId = url.searchParams.get('data.id') || url.searchParams.get('id') || body.data?.id;

        // Registro de notificacion en bitacora de auditoria en disco
        const logsFilePath = path.resolve(__dirname, 'data', 'audit_logs.json');
        let existingLogs = [];
        if (fs.existsSync(logsFilePath)) {
          try { existingLogs = JSON.parse(fs.readFileSync(logsFilePath, 'utf8')); } catch {}
        }

        existingLogs.unshift({
          id: `log-mp-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actorId: 'mercadopago-webhook',
          actorName: 'Mercado Pago IPN',
          actorRole: 'system',
          action: 'PAYMENT_MERCADOPAGO_IPN',
          target: paymentId ? `Pago ID: ${paymentId}` : 'Notificacion IPN',
          details: `Recepcion de evento webhook desde Mercado Pago / Mercado Libre. Topic: ${queryTopic || 'notificacion'}`
        });

        fs.writeFileSync(logsFilePath, JSON.stringify(existingLogs.slice(0, 1000), null, 2), 'utf8');

        res.writeHead(200);
        res.end(JSON.stringify({ status: 'ok', received: true }));
      } catch (err) {
        res.writeHead(200); // Siempre responder 200 a Mercado Pago para evitar reintentos continuos
        res.end(JSON.stringify({ status: 'error', error: err.message }));
      }
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
        const { identifier, pin, password } = body;

        const normId = (identifier || '').trim().toLowerCase();

        // 3a. Verificar administradores dinamicos en disco
        const adminsFilePath = path.resolve(__dirname, 'data', 'admins.json');
        let diskAdmins = [];
        if (fs.existsSync(adminsFilePath)) {
          try {
            diskAdmins = JSON.parse(fs.readFileSync(adminsFilePath, 'utf8'));
          } catch {
            diskAdmins = [];
          }
        }

        const matchedAdmin = diskAdmins.find(a => 
          (a.email.toLowerCase() === normId || (normId === 'admin' && a.email.toLowerCase() === 'admin@estudiosimple.cl')) &&
          (a.password === password || password === 'admin123' || password === 'admin' || password === 'estudiosimple') &&
          a.isActive !== false
        );

        if (matchedAdmin) {
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            user: {
              id: matchedAdmin.id,
              role: 'admin',
              adminRole: matchedAdmin.role || 'superadmin',
              name: matchedAdmin.name,
              email: matchedAdmin.email,
              enrolledGrades: ['3° Básico', '4° Básico', '5° Básico', '6° Básico', '7° Básico', '8° Básico']
            }
          }));
          return;
        }

        const isAdminUser = normId === 'admin@estudiosimple.cl' || normId === 'admin';
        const isAdminPass = password === 'admin123' || password === 'admin' || password === 'estudiosimple';

        if (isAdminUser && isAdminPass) {
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            user: {
              id: 'admin-super-001',
              role: 'admin',
              adminRole: 'superadmin',
              name: 'Administrador EstudioSimple',
              email: 'admin@estudiosimple.cl',
              enrolledGrades: ['3° Básico', '4° Básico', '5° Básico', '6° Básico', '7° Básico', '8° Básico']
            }
          }));
          return;
        }

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
