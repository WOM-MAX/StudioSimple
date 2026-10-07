import { PrismaClient } from '@prisma/client';
if (typeof process.loadEnvFile === 'function') {
  process.loadEnvFile('.env');
}

async function run() {
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findMany();
    console.log('--- USUARIOS EN NEON POSTGRESQL ---');
    console.log(JSON.stringify(users, null, 2));

    const orders = await prisma.subscriptionOrder.findMany();
    console.log('--- ÓRDENES EN NEON POSTGRESQL ---');
    console.log(JSON.stringify(orders, null, 2));
  } catch (e: any) {
    console.error('Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

run();
