import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function purge() {
  const seedEmails = [
    'carolina@estudiosimple.cl',
    'rodrigo.silva@gmail.com',
    'mgonzalez@educarchile.cl',
    'vvalenzuela@vtr.net'
  ];

  try {
    const res = await prisma.user.deleteMany({
      where: {
        email: { in: seedEmails }
      }
    });
    console.log(`[Neon DB]: ${res.count} cuentas semillas purgadas exitosamente.`);
  } catch (err: any) {
    console.warn('[Neon DB]: Advertencia de conexión DB (se continúa con disco):', err?.message);
  } finally {
    await prisma.$disconnect();
  }

  // Purgar también en data/registered_families.json
  const filePath = path.resolve(process.cwd(), 'data', 'registered_families.json');
  if (fs.existsSync(filePath)) {
    try {
      const families = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const clean = families.filter((f: any) => !seedEmails.includes(f.email?.toLowerCase()));
      fs.writeFileSync(filePath, JSON.stringify(clean, null, 2), 'utf8');
      console.log(`[Disco]: ${families.length - clean.length} cuentas semillas purgadas de registered_families.json. Restantes: ${clean.length}`);
    } catch (e: any) {
      console.warn('[Disco Error]:', e.message);
    }
  }
}

purge();
