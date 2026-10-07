import { PrismaClient } from '@prisma/client';

if (typeof process.loadEnvFile === 'function') {
  process.loadEnvFile('.env');
}

async function run() {
  const prisma = new PrismaClient();
  try {
    // 1. Eliminar la cuenta temporal de test si existe
    const testUser = await prisma.user.findUnique({
      where: { email: 'mercedes.pena.test@estudiosimple.cl' }
    });
    if (testUser) {
      await prisma.subscriptionOrder.deleteMany({
        where: { userId: testUser.id }
      });
      await prisma.user.delete({
        where: { id: testUser.id }
      });
      console.log('-> Cuenta temporal previa mercedes.pena.test eliminada para ceder RUT a la cuenta real.');
    }

    // 2. Insertar / Actualizar a Mercedes Peña Córdova con sus datos oficiales
    const email = 'mercedespenacordova@gmail.com';
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name: 'MERCEDES PEÑA CÓRDOVA',
        rut: '14.567.890-2',
        studentName: 'TOMÁS PEÑA',
        studentPin: '334455',
        subscriptionActive: true,
        status: 'active',
        plan: 'trial',
        password: 'demo2026',
        enrolledGrades: ['7° Básico'],
        lastLogin: new Date()
      },
      create: {
        email,
        name: 'MERCEDES PEÑA CÓRDOVA',
        rut: '14.567.890-2',
        password: 'demo2026',
        subscriptionActive: true,
        status: 'active',
        plan: 'trial',
        enrolledGrades: ['7° Básico'],
        studentId: 'stu-mercedes-real-01',
        studentName: 'TOMÁS PEÑA',
        studentPin: '334455'
      }
    });

    console.log('-> Usuario Mercedes Peña Córdova oficial en Neon DB:');
    console.log(JSON.stringify(user, null, 2));

    const orderNumber = `ORD-MP-MERCEDES-REAL-${Date.now().toString(36).toUpperCase()}`;
    const order = await prisma.subscriptionOrder.create({
      data: {
        orderNumber,
        userId: user.id,
        plan: 'trial',
        amount: 0,
        currency: 'CLP',
        status: 'paid',
        paymentMethod: 'mercadopago'
      }
    });
    console.log('-> Orden de suscripción creada:');
    console.log(JSON.stringify(order, null, 2));
  } catch (e: any) {
    console.error('Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

run();
