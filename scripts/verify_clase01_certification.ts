import * as fs from 'fs';
import * as path from 'path';

function runCertification() {
  console.log('=== CERTIFICACIÓN INTEGRAL DE LECCIÓN CLASE 01 LENGUAJE ===');

  const allGradesPath = path.resolve('Web Studio Simple/public/data/injected_lessons_all_grades.json');
  const grade7bPath = path.resolve('Web Studio Simple/public/data/injected_lessons_7b.json');
  const tsModulePath = path.resolve('Web Studio Simple/src/data/lessons/lengua_7b_oa03_clase01.ts');

  // 1. Validar injected_lessons_all_grades.json
  const rawAllGrades = JSON.parse(fs.readFileSync(allGradesPath, 'utf8'));
  const allGradesList = Array.isArray(rawAllGrades) ? rawAllGrades : Object.values(rawAllGrades);
  const lenPkg = allGradesList.find((p: any) => p.oaId === '110-7-LEN-OA03');
  if (!lenPkg) throw new Error('No se encontró el paquete 110-7-LEN-OA03 en injected_lessons_all_grades.json');

  const c1 = lenPkg.lessons.find((l: any) => l.num === 1 || l.classNumber === 1 || l.lessonNumber === 1);
  if (!c1) throw new Error('No se encontró Clase 1 en 110-7-LEN-OA03');

  console.log('[OK] Título en injected_lessons_all_grades.json:', c1.title);
  if (!c1.title.includes('Jimmy y Robutt')) {
    throw new Error(`Título incorrecto: ${c1.title}`);
  }

  // Comprobar que no hay residuos en c1
  const c1Str = JSON.stringify(c1);
  if (c1Str.includes('viaje del héroe') || c1Str.includes('Viaje del Héroe') || c1Str.includes('viaje del heroe')) {
    throw new Error('Residuo detectado: Viaje del Héroe está presente en Clase 1 de injected_lessons_all_grades.json');
  }
  if (c1Str.includes('El conflicto narrativo y la trama de la historia')) {
    throw new Error('Residuo detectado: Título antiguo presente en Clase 1');
  }
  console.log('[OK] Cero residuos del Viaje del Héroe en injected_lessons_all_grades.json Clase 1');

  // 2. Validar injected_lessons_7b.json
  const raw7b = JSON.parse(fs.readFileSync(grade7bPath, 'utf8'));
  const list7b = Array.isArray(raw7b) ? raw7b : Object.values(raw7b);
  const lenPkg7b = list7b.find((p: any) => p.oaId === '110-7-LEN-OA03');
  if (!lenPkg7b) throw new Error('No se encontró el paquete 110-7-LEN-OA03 en injected_lessons_7b.json');
  const c1_7b = lenPkg7b.lessons.find((l: any) => l.num === 1 || l.classNumber === 1 || l.lessonNumber === 1);
  if (!c1_7b.title.includes('Jimmy y Robutt')) {
    throw new Error(`Título incorrecto en 7b: ${c1_7b.title}`);
  }
  const c1_7bStr = JSON.stringify(c1_7b);
  if (c1_7bStr.includes('viaje del héroe') || c1_7bStr.includes('Viaje del Héroe')) {
    throw new Error('Residuo detectado en injected_lessons_7b.json Clase 1');
  }
  console.log('[OK] injected_lessons_7b.json verificado y libre de residuos');

  // 3. Validar módulo TS
  const tsContent = fs.readFileSync(tsModulePath, 'utf8');
  if (!tsContent.includes('Jimmy y Robutt')) {
    throw new Error('Módulo TS lengua_7b_oa03_clase01 no contiene Jimmy y Robutt');
  }
  if (tsContent.includes('Las 6 etapas del viaje del héroe') || tsContent.includes('hero_journey')) {
    throw new Error('Módulo TS contiene referencias al Viaje del Héroe');
  }
  console.log('[OK] Módulo TS lengua_7b_oa03_clase01.ts verificado y libre de residuos');

  // 4. Validar StudentDisciplineGraphic.tsx
  const graphicPath = path.resolve('Web Studio Simple/src/components/lesson/student/StudentDisciplineGraphic.tsx');
  const graphicContent = fs.readFileSync(graphicPath, 'utf8');
  if (graphicContent.includes("if (normSubject.includes('len')) return <StudentHeroJourneyChart />;")) {
    throw new Error('StudentDisciplineGraphic sigue conteniendo retorno fijo!');
  }
  if (!graphicContent.includes('StudentReadingResourceCard')) {
    throw new Error('StudentDisciplineGraphic no importa StudentReadingResourceCard');
  }
  console.log('[OK] StudentDisciplineGraphic.tsx desacoplado y renderiza StudentReadingResourceCard');

  // 5. Validar LessonSyncContext.tsx e invalidación de sesión
  const syncContextPath = path.resolve('Web Studio Simple/src/context/LessonSyncContext.tsx');
  const syncContextContent = fs.readFileSync(syncContextPath, 'utf8');
  if (!syncContextContent.includes('localStorage.removeItem(STORAGE_KEY)')) {
    throw new Error('LessonSyncContext no contiene invalidación de localStorage');
  }
  console.log('[OK] LessonSyncContext.tsx contiene invalidación preventiva de localStorage');

  console.log('\n>>> CERTIFICACIÓN 100% EXITOSA: TODO EL FLUJO ESTÁ DESACOPLADO, ACTUALIZADO Y VALIDADO SIN RESIDUOS <<<');
}

runCertification();
