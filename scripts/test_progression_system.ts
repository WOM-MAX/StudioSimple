import { getSubjectOAs } from '../Web Studio Simple/src/data/curriculumData';
import { getLessonCanonicalKey, isLessonCompleted } from '../Web Studio Simple/src/lib/lesson-repository';
import { INITIAL_STUDENT } from '../Web Studio Simple/src/data/mockData';

function runProgressionTest() {
  console.log('=== TEST DEL SISTEMA DE PROGRESION DE LECCIONES ===');

  // 1. Validar claves canonicas
  const key1 = getLessonCanonicalKey('7° Básico', 'Matemática', 'OA 01', 1);
  const key2 = getLessonCanonicalKey('7° Básico', 'Matemática', 'OA 01', 2);
  const key3 = getLessonCanonicalKey('7° Básico', 'Matemática', 'OA 01', 3);

  console.log('Clave Leccion 1:', key1);
  console.log('Clave Leccion 2:', key2);
  console.log('Clave Leccion 3:', key3);

  if (key1 !== '7_mat_oa1_1' || key2 !== '7_mat_oa1_2' || key3 !== '7_mat_oa1_3') {
    throw new Error('Error en formato de clave canonica');
  }

  // 2. Validar que INITIAL_STUDENT contenga lecciones 1 y 2
  const studentLessons = INITIAL_STUDENT.completedLessons;
  console.log('Lecciones completadas en INITIAL_STUDENT:', studentLessons);

  const isL1Done = isLessonCompleted(studentLessons, '7° Básico', 'Matemática', 'OA 01', 1);
  const isL2Done = isLessonCompleted(studentLessons, '7° Básico', 'Matemática', 'OA 01', 2);
  const isL3Done = isLessonCompleted(studentLessons, '7° Básico', 'Matemática', 'OA 01', 3);

  console.log('Leccion 1 completada:', isL1Done);
  console.log('Leccion 2 completada:', isL2Done);
  console.log('Leccion 3 completada:', isL3Done);

  if (!isL1Done || !isL2Done || isL3Done) {
    throw new Error('Estado de completacion de lecciones 1, 2 y 3 incorrecto');
  }

  // 3. Validar calculo de progresion en 7mo Matematica OA 01
  const oas = getSubjectOAs('7° Básico', 'Matemática');
  const oa1 = oas[0];
  console.log('OA 1:', oa1.code, oa1.title);
  console.log('Total lecciones en OA 1:', oa1.lessons.length);

  const completedCount = oa1.lessons.filter(l =>
    isLessonCompleted(studentLessons, '7° Básico', 'Matemática', oa1.code, l.lessonNumber)
  ).length;

  const totalLessons = oa1.lessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  console.log(`Progreso calculado: ${completedCount} de ${totalLessons} (${progressPercent}%)`);

  if (totalLessons !== 6) {
    throw new Error(`Se esperaban 6 lecciones en OA 1, pero se encontraron ${totalLessons}`);
  }

  if (completedCount !== 2) {
    throw new Error(`Se esperaban 2 lecciones completadas, pero se contaron ${completedCount}`);
  }

  if (progressPercent !== 33) {
    throw new Error(`Se esperaba 33% de progreso, pero se obtuvo ${progressPercent}%`);
  }

  // 4. Simular completacion de leccion 3
  const updatedStudentLessons = [...studentLessons, key3];
  const newCompletedCount = oa1.lessons.filter(l =>
    isLessonCompleted(updatedStudentLessons, '7° Básico', 'Matemática', oa1.code, l.lessonNumber)
  ).length;
  const newProgressPercent = Math.round((newCompletedCount / totalLessons) * 100);

  console.log(`Progreso tras completar leccion 3: ${newCompletedCount} de ${totalLessons} (${newProgressPercent}%)`);

  if (newCompletedCount !== 3 || newProgressPercent !== 50) {
    throw new Error('Fallo en la simulacion de incremento de progresion');
  }

  console.log('=== TODOS LOS TESTS DEL SISTEMA DE PROGRESION PASARON EXITOSAMENTE ===');
}

runProgressionTest();
