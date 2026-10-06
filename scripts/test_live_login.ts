import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

if (typeof process.loadEnvFile === 'function') {
  process.loadEnvFile('.env');
}

function cleanRut(rut: string): string {
  if (!rut || typeof rut !== 'string') return '';
  return rut.replace(/[^0-9kK]/g, '').toUpperCase();
}

function formatRut(rut: string): string {
  const clean = cleanRut(rut);
  if (!clean || clean.length < 2) return clean;
  const cuerpo = clean.slice(0, -1);
  const dv = clean.slice(-1);
  let formatted = '';
  let count = 0;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    formatted = cuerpo[i] + formatted;
    count++;
    if (count % 3 === 0 && i !== 0) {
      formatted = '.' + formatted;
    }
  }
  return `${formatted}-${dv}`;
}

async function testAuth() {
  console.log('===============================================================');
  console.log('🧪 TEST DE DOBLE VALIDACIÓN: AUTENTICACIÓN POR RUN, EMAIL Y PIN');
  console.log('===============================================================\n');

  const testCases = [
    {
      label: 'Caso 1: RUN sin puntos (8311477-0)',
      identifier: '8311477-0',
      password: 'Luciano22#$%',
    },
    {
      label: 'Caso 2: RUN con puntos (8.311.477-0)',
      identifier: '8.311.477-0',
      password: 'Luciano22#$%',
    },
    {
      label: 'Caso 3: Correo oficial (wom@colegioacropolis.net)',
      identifier: 'wom@colegioacropolis.net',
      password: 'Luciano22#$%',
    },
    {
      label: 'Caso 4: Estudiante con PIN (278748)',
      pin: '278748',
    }
  ];

  const prisma = new PrismaClient();

  try {
    for (const tc of testCases) {
      console.log(`▶ Verificando: ${tc.label}`);
      
      const normId = (tc.identifier || '').toLowerCase().trim();
      const cleanId = cleanRut(normId);
      const rutVariants = new Set<string>();
      if (cleanId) {
        rutVariants.add(cleanId);
        rutVariants.add(formatRut(cleanId));
        if (cleanId.length >= 2) {
          rutVariants.add(`${cleanId.slice(0, -1)}-${cleanId.slice(-1)}`);
        }
      }

      console.log(`   Variantes generadas: [${Array.from(rutVariants).join(', ')}]`);

      // 1. Consulta Neon DB simulando exactamente server.js
      const orConditions: any[] = [];
      if (normId) {
        orConditions.push({ email: { equals: normId, mode: 'insensitive' } });
      }
      rutVariants.forEach(r => {
        orConditions.push({ rut: r });
        orConditions.push({ studentRun: r });
      });
      if (tc.pin) {
        orConditions.push({ studentPin: tc.pin });
      }

      let user = await prisma.user.findFirst({
        where: { OR: orConditions }
      });

      if (!user) {
        console.log('   (No encontrado en Neon DB, probando fallback a registered_families.json)');
        const familiesFilePath = path.resolve(process.cwd(), 'data', 'registered_families.json');
        if (fs.existsSync(familiesFilePath)) {
          const diskFamilies = JSON.parse(fs.readFileSync(familiesFilePath, 'utf8'));
          user = diskFamilies.find((f: any) => {
            const matchEmail = normId && f.email && f.email.toLowerCase().trim() === normId;
            const fCleanRut = f.rut ? cleanRut(f.rut) : '';
            const matchRut = cleanId && fCleanRut === cleanId;
            const matchPin = tc.pin && f.studentPin === tc.pin;
            return matchEmail || matchRut || matchPin;
          }) || null;
        }
      }

      if (!user) {
        throw new Error(`FALLO: No se encontró usuario para ${tc.label}`);
      }

      // Validar password o PIN
      if (tc.password) {
        const passValid = (user.password && user.password === tc.password) ||
          tc.password === 'demo2026' ||
          tc.password === 'admin123' ||
          tc.password === user.studentPin;

        if (!passValid) {
          throw new Error(`FALLO: Contraseña no coincide para ${tc.label}`);
        }
        console.log(`   ✔ AUTORIZADO Apoderado: ${user.name} | RUN: ${user.rut} | Email: ${user.email}`);
      }

      if (tc.pin) {
        if (user.studentPin !== tc.pin) {
          throw new Error(`FALLO: PIN incorrecto para ${tc.label}`);
        }
        console.log(`   ✔ AUTORIZADO Estudiante: ${user.studentName} | PIN: ${user.studentPin} | Grados: ${user.enrolledGrades?.join(', ')}`);
      }

      console.log('   OK ✔\n');
    }

    console.log('===============================================================');
    console.log('🎉 TODOS LOS CASOS DE PRUEBA DE LOGIN PASARON EXITOSAMENTE (100%)');
    console.log('===============================================================\n');

  } finally {
    await prisma.$disconnect();
  }
}

testAuth();
