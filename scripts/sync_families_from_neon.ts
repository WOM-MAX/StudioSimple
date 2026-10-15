import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile();
  } catch {
    // Continuar si ya está en entorno
  }
}

async function syncFamilies() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ Error: DATABASE_URL no está definida en el entorno (.env).');
    process.exit(1);
  }

  const prisma = new PrismaClient({
    datasources: {
      db: { url: databaseUrl }
    }
  });

  try {
    console.log('🔄 Conectando a Neon PostgreSQL...');
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });

    console.log(`✅ ${users.length} usuarios encontrados en Neon DB.`);

    const formattedFamilies = users.map((u) => ({
      id: u.id,
      rut: u.rut || '',
      name: u.name,
      email: u.email,
      phone: u.phone || '',
      password: u.password || 'Luciano22#$%',
      studentId: u.studentId || `stu-${u.id}`,
      studentName: u.studentName || 'Estudiante',
      studentRun: u.studentRun || '',
      studentPin: u.studentPin || '123456',
      status: u.status || 'active',
      subscriptionActive: u.subscriptionActive !== false,
      plan: u.plan === 'anual' ? 'anual' : 'mensual',
      enrolledGrades: Array.isArray(u.enrolledGrades) && u.enrolledGrades.length > 0 ? u.enrolledGrades : ['7° Básico'],
      createdAt: u.createdAt ? u.createdAt.toISOString() : new Date().toISOString(),
      lastLogin: u.lastLogin ? u.lastLogin.toISOString() : new Date().toISOString()
    }));

    const targetDir = path.resolve(__dirname, '..', 'data');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetFile = path.resolve(targetDir, 'registered_families.json');
    fs.writeFileSync(targetFile, JSON.stringify(formattedFamilies, null, 2), 'utf8');
    console.log(`💾 Guardado exitosamente en: ${targetFile}`);

    console.log('\n--- CUENTAS SINCRONIZADAS ---');
    formattedFamilies.forEach((f, idx) => {
      console.log(`[${idx + 1}] ${f.name} (${f.email})`);
      console.log(`    RUN: ${f.rut} | Password: ${f.password}`);
      console.log(`    Alumno: ${f.studentName} | PIN: ${f.studentPin} | Cursos: ${f.enrolledGrades.join(', ')}`);
    });
  } catch (err: any) {
    console.error('❌ Error sincronizando familias:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

syncFamilies();
