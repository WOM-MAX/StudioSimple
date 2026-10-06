import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Cargar variables de entorno nativas de .env
if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile('.env');
  } catch {}
}

let nodemailer: any = null;
try {
  nodemailer = require('nodemailer');
} catch {}

async function runResendWelcomeEmail() {
  console.log('===============================================================');
  console.log('📧 SCRIPT OFICIAL: REENVÍO DE CORREO DE BIENVENIDA Y CREDENCIALES');
  console.log('===============================================================\n');

  const targetEmail = 'wom@colegioacropolis.net';
  const prisma = new PrismaClient();

  let user: any = null;

  try {
    // 1. Consultar usuario en Neon PostgreSQL
    user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: targetEmail, mode: 'insensitive' } },
          { rut: '8.311.477-0' },
          { rut: '8311477-0' }
        ]
      }
    });

    if (user) {
      console.log('✔ [Neon DB] Usuario encontrado:');
      console.log(`   - Nombre: ${user.name}`);
      console.log(`   - RUN: ${user.rut}`);
      console.log(`   - Email: ${user.email}`);
      console.log(`   - Clave: ${user.password}`);
      console.log(`   - Alumno: ${user.studentName}`);
      console.log(`   - PIN: ${user.studentPin}`);
      console.log(`   - Grado: ${user.enrolledGrades?.join(', ')}`);
      console.log(`   - Plan: ${user.plan}\n`);
    } else {
      console.log('⚠ Usuario no encontrado en Neon DB, consultando fallback data/registered_families.json...');
      const familiesFilePath = path.resolve(process.cwd(), 'data', 'registered_families.json');
      if (fs.existsSync(familiesFilePath)) {
        const diskFamilies = JSON.parse(fs.readFileSync(familiesFilePath, 'utf8'));
        user = diskFamilies.find((f: any) => f.email?.toLowerCase() === targetEmail.toLowerCase()) || null;
      }
    }

    if (!user) {
      throw new Error(`No se pudo encontrar a la familia ${targetEmail} en Neon DB ni en archivo local.`);
    }

    const payload = {
      email: user.email,
      name: user.name || 'WALTER ORELLANA',
      rut: user.rut || '8.311.477-0',
      password: user.password || 'Luciano22#$%',
      studentName: user.studentName || 'LUCIANO TOMÁS HERNÁNDEZ ORELLANA',
      grade: (user.enrolledGrades && user.enrolledGrades[0]) || '7° Básico',
      studentPin: user.studentPin || '278748',
      plan: user.plan || 'anual',
      amount: 1000
    };

    console.log('▶ Preparando plantilla oficial de correo de bienvenida...');
    const planName = payload.plan === 'full' || payload.plan === 'anual' ? 'Plan Anual Exámenes Libres' : 'Plan Mensual Continuo';
    const formattedAmount = `$${Number(payload.amount).toLocaleString('es-CL')} CLP`;

    const emailHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Tus Credenciales Oficiales de EstudioSimple</title>
</head>
<body style="margin:0;padding:0;background-color:#0A192F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#FFFFFF;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0A192F;padding:30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#10223D;border:1px solid #1C3257;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.4);">
          <!-- Header -->
          <tr>
            <td style="background-color:#0E1B31;padding:24px 30px;border-bottom:2px solid #F8AD22;text-align:center;">
              <h1 style="margin:0;font-size:22px;font-weight:900;letter-spacing:1px;color:#FFFFFF;">
                ESTUDIO<span style="color:#F8AD22;">SIMPLE</span>
              </h1>
              <p style="margin:6px 0 0 0;font-size:11px;color:#57d6f3;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">
                Acompañamiento Curricular y Exámenes Libres MINEDUC
              </p>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding:32px 30px;">
              <h2 style="margin:0 0 12px 0;font-size:20px;font-weight:800;color:#FFFFFF;">
                ¡Bienvenida/o a la familia EstudioSimple!
              </h2>
              <p style="margin:0 0 20px 0;font-size:13px;color:#CBD5E1;line-height:1.6;">
                Hola <strong>${payload.name}</strong>, tu suscripción a <strong>${payload.grade}</strong> ha sido activada con éxito (${planName} - ${formattedAmount}). A continuación encuentras la ficha oficial con las claves de acceso de tu familia:
              </p>

              <!-- Tarjeta Apoderado -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#162A4A;border:1px solid #233D66;border-radius:12px;margin-bottom:20px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <div style="font-size:11px;font-weight:800;color:#57d6f3;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">
                      ACCESO DEL APODERADO / TUTOR LEGAL
                    </div>
                    <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size:13px;">
                      <tr>
                        <td width="35%" style="color:#94A3B8;">RUN de Acceso:</td>
                        <td style="color:#FFFFFF;font-weight:700;font-family:monospace;">${payload.rut}</td>
                      </tr>
                      <tr>
                        <td style="color:#94A3B8;">Correo Electrónico:</td>
                        <td style="color:#FFFFFF;font-weight:700;">${payload.email}</td>
                      </tr>
                      <tr>
                        <td style="color:#94A3B8;">Contraseña:</td>
                        <td style="color:#34D399;font-weight:700;font-family:monospace;">${payload.password}</td>
                      </tr>
                    </table>
                    <p style="margin:10px 0 0 0;font-size:11px;color:#94A3B8;line-height:1.4;">
                      Usa estas credenciales para acceder al Portal del Apoderado, supervisar el avance de tu hijo/a y gestionar tu suscripción.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Tarjeta Estudiante -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#1E293B;border:2px solid #F8AD22;border-radius:12px;margin-bottom:24px;">
                <tr>
                  <td style="padding:18px 20px;text-align:center;">
                    <div style="font-size:11px;font-weight:800;color:#F8AD22;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
                      ACCESO DEL ESTUDIANTE (SALÓN DE CLASES)
                    </div>
                    <div style="font-size:14px;color:#FFFFFF;font-weight:700;margin-bottom:12px;">
                      ${payload.studentName} (${payload.grade})
                    </div>
                    <div style="background-color:#0A192F;border:1px dashed #F8AD22;padding:12px 18px;border-radius:10px;display:inline-block;margin-bottom:10px;">
                      <div style="font-size:10px;color:#94A3B8;text-transform:uppercase;font-weight:700;">PIN Numérico de Ingreso</div>
                      <div style="font-size:30px;font-family:monospace;font-weight:900;letter-spacing:6px;color:#F8AD22;margin-top:2px;">
                        ${payload.studentPin}
                      </div>
                    </div>
                    <p style="margin:0;font-size:11px;color:#CBD5E1;line-height:1.4;">
                      Tu hijo/a solo necesita ingresar este PIN de 6 dígitos en la pantalla de inicio para comenzar sus clases inmediatamente, sin necesidad de recordar contraseñas largas.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Boton de Acceso -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="https://estudiosimple.cl" target="_blank" style="background-color:#EE751C;color:#FFFFFF;font-size:14px;font-weight:800;text-decoration:none;padding:14px 32px;border-radius:12px;display:inline-block;letter-spacing:0.5px;">
                      Comenzar a Estudiar Ahora
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#0A192F;padding:20px 30px;border-top:1px solid #1C3257;text-align:center;font-size:11px;color:#64748B;line-height:1.5;">
              <p style="margin:0 0 6px 0;">EstudioSimple SpA - Plataforma de Acompañamiento Curricular Homeschooling</p>
              <p style="margin:0;">¿Necesitas ayuda? Escríbenos a <a href="mailto:soporte@estudiosimple.cl" style="color:#57d6f3;text-decoration:none;">soporte@estudiosimple.cl</a> o vía WhatsApp oficial.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    let emailMode = 'simulated';
    let emailDispatched = false;
    let deliveryDetails: any = null;

    const resendKey = process.env.RESEND_API_KEY;
    const smtpHost = process.env.SMTP_HOST;

    console.log('▶ Verificando proveedores de correo configurados en el entorno:');
    console.log(`   - RESEND_API_KEY: ${resendKey ? 'DETECTADA ✔' : 'NO configurada'}`);
    console.log(`   - SMTP_HOST: ${smtpHost ? `DETECTADO ✔ (${smtpHost})` : 'NO configurado'}`);

    // Intentar Resend
    if (resendKey && resendKey.trim()) {
      try {
        console.log('   -> Enviando a través de Resend API...');
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey.trim()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || 'EstudioSimple <bienvenida@estudiosimple.cl>',
            to: [payload.email],
            subject: `Bienvenida/o a EstudioSimple - Credenciales Oficiales de ${payload.grade}`,
            html: emailHtml
          })
        });
        const rData = await resendRes.json();
        if (rData && rData.id) {
          emailMode = 'resend';
          emailDispatched = true;
          deliveryDetails = rData;
          console.log(`   ✔ ENVÍO REAL EXITOSO vía Resend (ID: ${rData.id})`);
        } else {
          console.warn('   ⚠ Resend respondió con advertencia:', rData);
        }
      } catch (rErr: any) {
        console.warn('   ⚠ Error en Resend API:', rErr.message);
      }
    }

    // Intentar SMTP
    if (!emailDispatched && smtpHost && smtpHost.trim() && nodemailer) {
      try {
        console.log(`   -> Enviando a través de servidor SMTP (${smtpHost})...`);
        const port = Number(process.env.SMTP_PORT) || 587;
        const transporter = nodemailer.createTransport({
          host: smtpHost.trim(),
          port,
          secure: port === 465 || process.env.SMTP_SECURE === 'true',
          auth: {
            user: (process.env.SMTP_USER || '').trim(),
            pass: (process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '').trim()
          }
        });
        const info = await transporter.sendMail({
          from: process.env.EMAIL_FROM || `"EstudioSimple" <${process.env.SMTP_USER || 'bienvenida@estudiosimple.cl'}>`,
          to: payload.email,
          subject: `Bienvenida/o a EstudioSimple - Credenciales Oficiales de ${payload.grade}`,
          html: emailHtml
        });
        emailMode = 'smtp';
        emailDispatched = true;
        deliveryDetails = { messageId: info.messageId };
        console.log(`   ✔ ENVÍO REAL EXITOSO vía SMTP (MessageID: ${info.messageId})`);
      } catch (sErr: any) {
        console.warn('   ⚠ Error enviando vía SMTP:', sErr.message);
      }
    }

    // Fallback Simulado
    if (!emailDispatched) {
      console.log('   ℹ Modo actual: SIMULADO (el servidor no tiene proveedor de correo en vivo inyectado).');
      console.log('   ℹ Para activar la salida a internet, agregue RESEND_API_KEY o SMTP_* en Railway.');
    }

    // Persistir en disco
    const emailsFilePath = path.resolve(process.cwd(), 'data', 'sent_emails.json');
    let sentEmails: any[] = [];
    if (fs.existsSync(emailsFilePath)) {
      try { sentEmails = JSON.parse(fs.readFileSync(emailsFilePath, 'utf8')); } catch {}
    }
    sentEmails.unshift({
      id: `email-${Date.now()}`,
      timestamp: new Date().toISOString(),
      recipient: payload.email,
      name: payload.name,
      grade: payload.grade,
      studentPin: payload.studentPin,
      mode: emailMode,
      dispatched: emailDispatched,
      details: deliveryDetails,
      plan: payload.plan
    });
    fs.writeFileSync(emailsFilePath, JSON.stringify(sentEmails.slice(0, 100), null, 2), 'utf8');

    console.log('\n===============================================================');
    console.log(`✔ REENVÍO PROCESADO CON ÉXITO: Modo "${emailMode}"`);
    console.log(`✔ Destinatario: ${payload.email}`);
    console.log(`✔ Estado de entrega a proveedor: ${emailDispatched ? 'ENTREGADO A SERVIDOR DE CORREO' : 'GUARDADO LOCALMENTE (Simulado)'}`);
    console.log('===============================================================\n');

  } catch (err: any) {
    console.error('❌ Error en script de reenvío:', err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runResendWelcomeEmail();
