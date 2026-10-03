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
                const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN || pasarelaConfig.mercadoPagoAccessToken;

                if (pasarelaConfig.provider === 'mercadopago' && accessToken && accessToken.trim()) {
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
                      'Authorization': `Bearer ${accessToken.trim()}`,
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
                  }
                }

                // Fallback modo simulado en dev
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

