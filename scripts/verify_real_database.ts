import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile('.env');
  } catch {}
}

async function verify() {
  console.log('====================================================');
  console.log('🧪 VERIFICACIÓN DEFINITIVA: NEON POSTGRESQL EN VIVO');
  console.log('====================================================\n');

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

  try {
    // 1. Probar conectividad con Neon
    console.log('[1/5] Conectando a Neon DB...');
    await prisma.$queryRaw`SELECT 1 as ping`;
    console.log('  ✅ Conexión con Neon PostgreSQL exitosa.\n');

    // 2. Verificar modelo SystemSetting
    console.log('[2/5] Verificando tabla SystemSetting e inyectando datos iniciales...');
    
    // a) cms_pages
    const pagesFile = path.resolve(process.cwd(), 'data', 'cms_pages.json');
    let pagesData = [];
    if (fs.existsSync(pagesFile)) {
      pagesData = JSON.parse(fs.readFileSync(pagesFile, 'utf8'));
    }
    // Asegurar que page-inicio tenga activo: true y mostrarEnMenu: false
    pagesData = pagesData.map((p: any) => {
      if (p.id === 'page-inicio' || p.slug === '/') {
        return { ...p, activo: true, mostrarEnMenu: false };
      }
      return p;
    });

    await prisma.systemSetting.upsert({
      where: { key: 'cms_pages' },
      update: { value: pagesData },
      create: { key: 'cms_pages', value: pagesData }
    });
    console.log(`  ✅ SystemSetting "cms_pages" guardado en Neon DB (${pagesData.length} páginas).`);

    // b) site_config
    const configFile = path.resolve(process.cwd(), 'data', 'site_config.json');
    if (fs.existsSync(configFile)) {
      const siteConfig = JSON.parse(fs.readFileSync(configFile, 'utf8'));
      await prisma.systemSetting.upsert({
        where: { key: 'site_config' },
        update: { value: siteConfig },
        create: { key: 'site_config', value: siteConfig }
      });
      console.log('  ✅ SystemSetting "site_config" guardado en Neon DB.');
    }

    // c) admin_users
    const adminsFile = path.resolve(process.cwd(), 'data', 'admins.json');
    if (fs.existsSync(adminsFile)) {
      const admins = JSON.parse(fs.readFileSync(adminsFile, 'utf8'));
      await prisma.systemSetting.upsert({
        where: { key: 'admin_users' },
        update: { value: admins },
        create: { key: 'admin_users', value: admins }
      });
      console.log('  ✅ SystemSetting "admin_users" guardado en Neon DB.');
    }

    // d) mail_config inicial
    const initialMailConfig = {
      resendApiKey: process.env.RESEND_API_KEY || '',
      smtpHost: process.env.SMTP_HOST || '',
      smtpPort: process.env.SMTP_PORT || '587',
      smtpUser: process.env.SMTP_USER || '',
      emailFrom: process.env.EMAIL_FROM || 'EstudioSimple <bienvenida@estudiosimple.cl>'
    };
    await prisma.systemSetting.upsert({
      where: { key: 'mail_config' },
      update: { value: initialMailConfig },
      create: { key: 'mail_config', value: initialMailConfig }
    });
    console.log('  ✅ SystemSetting "mail_config" configurado en Neon DB.\n');

    // 3. Lectura de confirmación de SystemSetting
    console.log('[3/5] Comprobando recuperación desde Neon DB...');
    const savedCmsPagesRecord = await prisma.systemSetting.findUnique({
      where: { key: 'cms_pages' }
    });
    const retrievedPages: any = savedCmsPagesRecord?.value;
    const inicioPage = retrievedPages.find((p: any) => p.id === 'page-inicio' || p.slug === '/');
    console.log(`  ✅ Página de Inicio en Neon DB -> Activo: ${inicioPage?.activo} | MostrarEnMenu: ${inicioPage?.mostrarEnMenu}`);
    if (inicioPage?.activo !== true || inicioPage?.mostrarEnMenu !== false) {
      throw new Error('Discrepancia en visibilidad de página de inicio');
    }

    // 4. Prueba de inserción obligatoria y robusta de Usuario en Neon DB (Caso Mercedes Peña)
    console.log('\n[4/5] Simulando registro con persistencia real (Caso Mercedes Peña)...');
    const testUser = await prisma.user.upsert({
      where: { email: 'mercedes.pena.test@estudiosimple.cl' },
      update: {
        name: 'MERCEDES PEÑA',
        rut: '14.567.890-2',
        studentName: 'TOMÁS PEÑA',
        studentPin: '334455',
        enrolledGrades: ['7° Básico'],
        subscriptionActive: true,
        status: 'active',
        plan: 'trial'
      },
      create: {
        email: 'mercedes.pena.test@estudiosimple.cl',
        name: 'MERCEDES PEÑA',
        rut: '14.567.890-2',
        studentName: 'TOMÁS PEÑA',
        studentPin: '334455',
        studentId: `stu-mercedes-${Date.now()}`,
        enrolledGrades: ['7° Básico'],
        subscriptionActive: true,
        status: 'active',
        plan: 'trial'
      }
    });

    const testOrder = await prisma.subscriptionOrder.upsert({
      where: { orderNumber: 'ORD-TEST-MERCEDES-01' },
      update: { status: 'paid' },
      create: {
        orderNumber: 'ORD-TEST-MERCEDES-01',
        userId: testUser.id,
        plan: 'trial',
        amount: 0,
        status: 'paid',
        paymentMethod: 'simulated'
      }
    });

    console.log(`  ✅ Usuario Mercedes Peña creado en Neon DB con ID: ${testUser.id}`);
    console.log(`  ✅ Orden de Suscripción creada en Neon DB: ${testOrder.orderNumber}\n`);

    // 5. Censo total en Neon PostgreSQL
    console.log('[5/5] Censo consolidado de usuarios en Neon PostgreSQL:');
    const allUsers = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    console.log(`  Total de familias activas: ${allUsers.length}`);
    allUsers.forEach((u) => {
      console.log(`   • ${u.name} | ${u.email} | RUT: ${u.rut || 'S/R'} | PIN: ${u.studentPin} | Grado: ${u.enrolledGrades.join(', ')}`);
    });

    const allSettings = await prisma.systemSetting.findMany();
    console.log(`\n  Total de configuraciones en SystemSetting: ${allSettings.length}`);
    allSettings.forEach((s) => console.log(`   • Key: "${s.key}" (Actualizado: ${s.updatedAt.toISOString()})`));

    console.log('\n====================================================');
    console.log('🎉 PERSISTENCIA 100% REAL Y BLINDADA EN NEON POSTGRESQL');
    console.log('====================================================');
  } catch (err: any) {
    console.error('❌ Error durante la verificación:', err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
