import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-dev-server-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split('?')[0];
          if (url === '/api/pricing/config') {
            const pricingFilePath = path.resolve(__dirname, '../data/pricing_config.json');
            if (req.method === 'GET') {
              if (fs.existsSync(pricingFilePath)) {
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  success: true,
                  data: JSON.parse(fs.readFileSync(pricingFilePath, 'utf8'))
                }));
              }
            } else if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', () => {
                try {
                  const dataDir = path.dirname(pricingFilePath);
                  if (!fs.existsSync(dataDir)) {
                    fs.mkdirSync(dataDir, { recursive: true });
                  }
                  fs.writeFileSync(pricingFilePath, body, 'utf8');
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ success: true, data: JSON.parse(body) }));
                } catch (err: any) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ success: false, error: err?.message || 'Error al guardar' }));
                }
              });
              return;
            }
          }

          if (url === '/api/mail/send-welcome' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body);
                const emailsFilePath = path.resolve(__dirname, '../data/sent_emails.json');
                const dataDir = path.dirname(emailsFilePath);
                if (!fs.existsSync(dataDir)) {
                  fs.mkdirSync(dataDir, { recursive: true });
                }
                let sentEmails = [];
                if (fs.existsSync(emailsFilePath)) {
                  try { sentEmails = JSON.parse(fs.readFileSync(emailsFilePath, 'utf8')); } catch {}
                }
                sentEmails.unshift({
                  id: `email-dev-${Date.now()}`,
                  timestamp: new Date().toISOString(),
                  recipient: parsed.email,
                  name: parsed.name,
                  grade: parsed.grade,
                  studentPin: parsed.studentPin,
                  mode: 'simulated_dev',
                  plan: parsed.plan
                });
                fs.writeFileSync(emailsFilePath, JSON.stringify(sentEmails.slice(0, 100), null, 2), 'utf8');
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  success: true,
                  mode: 'simulated_dev',
                  recipient: parsed.email,
                  message: 'Correo registrado exitosamente en modo desarrollo local'
                }));
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
              }
            });
            return;
          }

          if (url === '/api/payment/create-preference' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body);
                const pricingFilePath = path.resolve(__dirname, '../data/pricing_config.json');
                let pricingConfig: any = null;
                if (fs.existsSync(pricingFilePath)) {
                  try { pricingConfig = JSON.parse(fs.readFileSync(pricingFilePath, 'utf8')); } catch {}
                }

                const pasarelaConfig = pricingConfig?.pasarela || {};
                const accessToken = (
                  process.env.MERCADOPAGO_ACCESS_TOKEN ||
                  process.env.MERCADO_PAGO_ACCESS_TOKEN ||
                  process.env.MP_ACCESS_TOKEN ||
                  pasarelaConfig.mercadoPagoAccessToken ||
                  ''
                ).trim();

                const isMercadoPagoActive = pasarelaConfig.provider === 'mercadopago' || Boolean(accessToken);

                if (isMercadoPagoActive) {
                  if (!accessToken) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({
                      success: false,
                      error: 'Token de acceso de Mercado Pago no configurado en el servidor'
                    }));
                  }

                  let origin = req.headers.origin;
                  if (!origin && req.headers.referer) {
                    try { origin = new URL(req.headers.referer).origin; } catch {}
                  }
                  if (!origin) origin = 'http://localhost:5173';

                  const isPublicHttps = origin.startsWith('https://');
                  const cleanAmount = Math.max(500, Math.round(Number(parsed.amount) || 1000));
                  const isSandbox = pasarelaConfig.sandbox === true || pasarelaConfig.modoSandbox === true;

                  const preferencePayload: any = {
                    items: [
                      {
                        id: parsed.planId || 'plan-sub',
                        title: `EstudioSimple - ${parsed.planName || 'Suscripcion'} (${parsed.grade || '7° Básico'})`,
                        description: `Acceso oficial homeschooling EstudioSimple para ${parsed.studentName || 'Estudiante'}`,
                        quantity: 1,
                        currency_id: 'CLP',
                        unit_price: cleanAmount
                      }
                    ],
                    payer: {
                      name: parsed.name || 'Apoderado EstudioSimple',
                      email: (parsed.email && parsed.email.includes('@')) ? parsed.email.trim() : 'cliente@estudiosimple.cl'
                    },
                    metadata: {
                      rut: parsed.rut,
                      grade: parsed.grade,
                      studentName: parsed.studentName,
                      studentRun: parsed.studentRun,
                      couponCode: parsed.couponCode,
                      planId: parsed.planId
                    },
                    back_urls: {
                      success: `${origin}/?payment=success&plan=${parsed.planId}&amount=${cleanAmount}`,
                      failure: `${origin}/?payment=failure`,
                      pending: `${origin}/?payment=pending`
                    },
                    auto_return: 'approved'
                  };

                  if (isPublicHttps) {
                    preferencePayload.notification_url = `${origin}/api/payment/webhook`;
                  }

                  const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${accessToken}`,
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(preferencePayload)
                  });

                  const mpData: any = await mpResponse.json();

                  if (mpData.id && (mpData.init_point || mpData.sandbox_init_point)) {
                    const selectedInitPoint = isSandbox
                      ? (mpData.sandbox_init_point || mpData.init_point)
                      : (mpData.init_point || mpData.sandbox_init_point);

                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({
                      success: true,
                      mode: 'mercadopago',
                      isSandbox,
                      preferenceId: mpData.id,
                      initPoint: selectedInitPoint
                    }));
                  } else {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({
                      success: false,
                      error: mpData.message || 'Error al comunicarse con la pasarela de Mercado Pago',
                      details: mpData
                    }));
                  }
                }

                // Fallback modo simulado en dev si provider === 'simulated' y no hay token
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  success: true,
                  mode: 'simulated',
                  directActivation: true,
                  message: 'Pasarela en modo simulado dev'
                }));
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: err?.message || 'Error en preferencia' }));
              }
            });
            return;
          }

          if (url === '/api/subscription/cancel' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  success: true,
                  message: 'Tu suscripción ha sido cancelada exitosamente en entorno de pruebas.',
                  updatedInDb: false
                }));
              } catch (e: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: e?.message }));
              }
            });
            return;
          }

          if (url === '/api/admin/families' && req.method === 'GET') {
            try {
              const familiesFilePath = path.resolve(__dirname, '../data/registered_families.json');
              let families = [];
              if (fs.existsSync(familiesFilePath)) {
                try {
                  families = JSON.parse(fs.readFileSync(familiesFilePath, 'utf8'));
                } catch {}
              }
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: true, families, count: families.length, source: 'file_dev' }));
            } catch (e: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: false, error: e?.message }));
            }
          }

          if (url === '/api/checkout' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const familiesFilePath = path.resolve(__dirname, '../data/registered_families.json');
                const dataDir = path.dirname(familiesFilePath);
                if (!fs.existsSync(dataDir)) {
                  fs.mkdirSync(dataDir, { recursive: true });
                }
                let families = [];
                if (fs.existsSync(familiesFilePath)) {
                  try { families = JSON.parse(fs.readFileSync(familiesFilePath, 'utf8')); } catch {}
                }
                const newFam = {
                  id: `usr-${Date.now()}`,
                  rut: parsed.rut || '',
                  name: parsed.name,
                  email: parsed.email,
                  phone: parsed.phone || '',
                  studentName: parsed.studentName || 'Estudiante',
                  studentRun: parsed.studentRun || '',
                  studentPin: '123456',
                  status: 'active',
                  subscriptionActive: true,
                  plan: parsed.plan || 'mensual',
                  enrolledGrades: [parsed.grade || '7° Básico'],
                  createdAt: new Date().toISOString(),
                  lastLogin: new Date().toISOString()
                };
                const existingIdx = families.findIndex((f: any) => f.email?.toLowerCase() === (parsed.email || '').toLowerCase().trim());
                if (existingIdx >= 0) {
                  families[existingIdx] = { ...families[existingIdx], ...newFam, subscriptionActive: true };
                } else {
                  families.unshift(newFam);
                }
                fs.writeFileSync(familiesFilePath, JSON.stringify(families, null, 2), 'utf8');
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: true, user: newFam }));
              } catch (e: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: e?.message }));
              }
            });
            return;
          }

          if (url === '/api/admin/family/delete' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const familiesFilePath = path.resolve(__dirname, '../data/registered_families.json');
                if (fs.existsSync(familiesFilePath)) {
                  try {
                    let families = JSON.parse(fs.readFileSync(familiesFilePath, 'utf8'));
                    families = families.filter((f: any) => 
                      (!parsed.userId || f.id !== parsed.userId) &&
                      (!parsed.email || f.email?.toLowerCase() !== parsed.email.toLowerCase()) &&
                      (!parsed.rut || f.rut?.replace(/[^0-9kK]/g, '') !== parsed.rut.replace(/[^0-9kK]/g, ''))
                    );
                    fs.writeFileSync(familiesFilePath, JSON.stringify(families, null, 2), 'utf8');
                  } catch {}
                }
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  success: true,
                  deletedFromDb: false,
                  message: 'Usuario, estudiante y suscripción eliminados de forma definitiva (dev)'
                }));
              } catch (e: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: e?.message }));
              }
            });
            return;
          }

          if (url === '/api/admin/family/reset-password' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  success: true,
                  updatedInDb: false,
                  whatsAppDispatched: Boolean(parsed.autoNotifyWhatsApp && parsed.phone),
                  phone: parsed.phone || null,
                  message: parsed.autoNotifyWhatsApp && parsed.phone
                    ? `Contraseña actualizada y enviada automáticamente por WhatsApp a ${parsed.phone} (dev)`
                    : 'Contraseña actualizada y sincronizada exitosamente (dev)'
                }));
              } catch (e: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: e?.message }));
              }
            });
            return;
          }

          if (url === '/api/pricing/config' && req.method === 'GET') {
            try {
              const pricingFilePath = path.resolve(__dirname, '..', 'data', 'pricing_config.json');
              let pricingConfig = null;
              if (fs.existsSync(pricingFilePath)) {
                try {
                  pricingConfig = JSON.parse(fs.readFileSync(pricingFilePath, 'utf8'));
                } catch {}
              }
              if (!pricingConfig) {
                pricingConfig = {
                  planes: [],
                  cupones: [],
                  pasarela: {
                    provider: 'mercadopago',
                    mercadoPagoPublicKey: 'APP_USR-d44f14cd-7e1c-4bd8-a138-e78e1bcbcd44',
                    mercadoPagoAccessToken: '',
                    modoSandbox: false
                  }
                };
              }

              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: true, data: pricingConfig }));
            } catch (e: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: false, error: e?.message }));
            }
          }

          if (url === '/api/pricing/config' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const pricingFilePath = path.resolve(__dirname, '..', 'data', 'pricing_config.json');
                const dataDir = path.dirname(pricingFilePath);
                if (!fs.existsSync(dataDir)) {
                  fs.mkdirSync(dataDir, { recursive: true });
                }
                fs.writeFileSync(pricingFilePath, body, 'utf8');

                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: true, message: 'Configuracion de precios actualizada (dev)' }));
              } catch (e: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: e?.message }));
              }
            });
            return;
          }

          if (url === '/api/user/change-password' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');
                if (!parsed.newPassword || parsed.newPassword.length < 6) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ success: false, message: 'La contraseña debe tener al menos 6 caracteres' }));
                }

                const familiesFilePath = path.resolve(__dirname, '../data/registered_families.json');
                if (fs.existsSync(familiesFilePath)) {
                  try {
                    let families = JSON.parse(fs.readFileSync(familiesFilePath, 'utf8'));
                    families = families.map((f: any) => {
                      const matchId = parsed.userId && f.id === parsed.userId;
                      const matchEmail = parsed.email && f.email?.toLowerCase() === parsed.email.toLowerCase();
                      const matchRut = parsed.rut && f.rut?.replace(/[^0-9kK]/g, '') === parsed.rut.replace(/[^0-9kK]/g, '');
                      if (matchId || matchEmail || matchRut) {
                        return { ...f, password: parsed.newPassword.trim() };
                      }
                      return f;
                    });
                    fs.writeFileSync(familiesFilePath, JSON.stringify(families, null, 2), 'utf8');
                  } catch {}
                }

                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  success: true,
                  updatedInDb: false,
                  message: 'Contraseña actualizada exitosamente (dev)'
                }));
              } catch (e: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: e?.message }));
              }
            });
            return;
          }

          next();
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

