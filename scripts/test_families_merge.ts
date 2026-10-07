import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

if (typeof process.loadEnvFile === 'function') {
  process.loadEnvFile('.env');
}

async function testGetFamilies() {
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log('--- USERS IN NEON VIA PRISMA ---');
    console.log(users.map(u => ({ id: u.id, name: u.name, email: u.email })));

    const familiesFilePath = path.resolve(process.cwd(), 'data', 'registered_families.json');
    let fileFamilies = [];
    if (fs.existsSync(familiesFilePath)) {
      fileFamilies = JSON.parse(fs.readFileSync(familiesFilePath, 'utf8'));
    }
    console.log('--- FAMILIES IN FILE ---');
    console.log(fileFamilies.map((f: any) => ({ id: f.id, name: f.name, email: f.email })));

    const mergedMap = new Map();
    fileFamilies.forEach((f: any) => {
      if (f.email) mergedMap.set(f.email.toLowerCase(), f);
    });

    users.forEach(dbF => {
      const emailKey = dbF.email.toLowerCase();
      const existingFileF = mergedMap.get(emailKey);
      if (existingFileF) {
        mergedMap.set(emailKey, {
          ...existingFileF,
          ...dbF,
        });
      } else {
        mergedMap.set(emailKey, dbF);
      }
    });

    const DEMO_SEED_EMAILS = new Set([
      'carolina@estudiosimple.cl',
      'rodrigo.silva@gmail.com',
      'mgonzalez@educarchile.cl',
      'vvalenzuela@vtr.net'
    ]);
    const DEMO_SEED_IDS = new Set([
      'usr-chile-01',
      'usr-chile-02',
      'usr-chile-03',
      'usr-chile-04'
    ]);

    const allFamilies = Array.from(mergedMap.values()).filter((f: any) => 
      !DEMO_SEED_IDS.has(f.id) &&
      (!f.email || !DEMO_SEED_EMAILS.has(f.email.toLowerCase().trim()))
    );

    console.log('--- MERGED ALL FAMILIES RESULT ---');
    console.log(allFamilies.map((f: any) => ({ id: f.id, name: f.name, email: f.email })));
  } catch (err: any) {
    console.error('Error:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

testGetFamilies();
