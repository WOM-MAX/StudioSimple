// scripts/test_neon_persistence.ts - Verificación integral de persistencia en Neon PostgreSQL
import assert from 'node:assert/strict';
import { PrismaClient } from '@prisma/client';

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_rsFlk82OEHYX@ep-floral-unit-acgb3xlf-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function runNeonTests() {
  console.log('[NeonTest] Iniciando verificación de persistencia en Neon DB...');
  const prisma = new PrismaClient({
    datasources: { db: { url: DATABASE_URL } }
  });

  try {
    // 1. Verificar conexión activa con Neon
    const countOAs = await prisma.learning_objectives.count();
    console.log(`[NeonTest] ✓ Conexión exitosa a Neon PostgreSQL (${countOAs} OAs registrados).`);

    // 2. Probar inserción / upsert de una lección personalizada de prueba
    const testGrade = '110-7';
    const testSubj = 'Ciencias_Naturales';
    const testOa = 'OA99_TEST';
    const testLessonNum = 99;
    const testPayload = {
      title: 'Lección de Prueba Neon',
      content: 'Contenido verificado en Neon Scale-to-Zero',
      metadata: { lessonTitle: 'Lección de Prueba Neon', totalLessonsInOa: 1 }
    };

    const saved = await prisma.customLesson.upsert({
      where: {
        grade_subject_oaCode_lessonNumber: {
          grade: testGrade,
          subject: testSubj,
          oaCode: testOa,
          lessonNumber: testLessonNum
        }
      },
      update: {
        title: testPayload.title,
        payload: testPayload,
        authorEmail: 'test-antigravity@estudiosimple.cl'
      },
      create: {
        grade: testGrade,
        subject: testSubj,
        oaCode: testOa,
        lessonNumber: testLessonNum,
        title: testPayload.title,
        payload: testPayload,
        authorEmail: 'test-antigravity@estudiosimple.cl'
      }
    });

    assert.ok(saved.id, 'ID generado por Neon');
    assert.equal(saved.grade, testGrade);
    assert.equal(saved.lessonNumber, testLessonNum);
    console.log('[NeonTest] ✓ Inserción y upsert exitosos en tabla CustomLesson.');

    // 3. Probar lectura exacta desde Neon
    const retrieved = await prisma.customLesson.findUnique({
      where: {
        grade_subject_oaCode_lessonNumber: {
          grade: testGrade,
          subject: testSubj,
          oaCode: testOa,
          lessonNumber: testLessonNum
        }
      }
    });

    assert.ok(retrieved, 'Registro recuperado');
    assert.deepEqual(retrieved.payload, testPayload, 'El payload JSON se preserva intacto');
    console.log('[NeonTest] ✓ Lectura e integridad de payload JSON certificadas al 100%.');

    // 4. Limpieza (delete) del registro de prueba en Neon
    const deleted = await prisma.customLesson.deleteMany({
      where: {
        grade: testGrade,
        subject: testSubj,
        oaCode: testOa,
        lessonNumber: testLessonNum
      }
    });

    assert.equal(deleted.count, 1, 'Registro de prueba eliminado');
    console.log('[NeonTest] ✓ Limpieza de datos de prueba en Neon completada.');

    console.log('\n========================================================');
    console.log('✅ TODAS LAS PRUEBAS DE PERSISTENCIA EN NEON PASARON (4/4 PASS)');
    console.log('========================================================\n');
  } finally {
    await prisma.$disconnect();
  }
}

runNeonTests().catch((err) => {
  console.error('[NeonTest] ❌ Error en prueba de persistencia Neon:', err);
  process.exit(1);
});
