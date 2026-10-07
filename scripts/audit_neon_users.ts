import { PrismaClient } from '@prisma/client';

if (typeof process.loadEnvFile === 'function') {
  process.loadEnvFile('.env');
}

async function audit() {
  const prisma = new PrismaClient();
  try {
    const allUsers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log(`=== TOTAL USUARIOS EN NEON DB: ${allUsers.length} ===`);
    allUsers.forEach((u, i) => {
      console.log(`[${i + 1}] ID: ${u.id} | Nombre: ${u.name} | Email: ${u.email} | RUN: ${u.rut} | Plan: ${u.plan} | Estudiante: ${u.studentName} (PIN: ${u.studentPin}) | Creado: ${u.createdAt}`);
    });

    const allOrders = await prisma.subscriptionOrder.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log(`\n=== TOTAL ÓRDENES DE SUSCRIPCIÓN EN NEON DB: ${allOrders.length} ===`);
    allOrders.forEach((o, i) => {
      console.log(`[${i + 1}] Orden: ${o.orderNumber} | UserID: ${o.userId} | Monto: $${o.amount} ${o.currency} | Método: ${o.paymentMethod} | Fecha: ${o.createdAt}`);
    });
  } catch (err: any) {
    console.error('Error audit:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

audit();
