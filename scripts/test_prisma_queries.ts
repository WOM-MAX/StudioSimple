import { PrismaClient } from '@prisma/client';

async function withPrisma<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
  const prisma = new PrismaClient();
  try {
    return await fn(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  console.log('Testing Neon Scale-to-Zero connection...');
  const countOas = await withPrisma(async (prisma) => {
    return await prisma.learning_objectives.count();
  });
  console.log(`Total OAs in Neon DB: ${countOas}`);

  const userCount = await withPrisma(async (prisma) => {
    return await prisma.user.count();
  });
  console.log(`Total Users in Neon DB: ${userCount}`);
}

main().catch(console.error);
