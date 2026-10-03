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
                return res.end(JSON.stringify({ success: false, error: err?.message || 'Error al procesar correo' }));
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

