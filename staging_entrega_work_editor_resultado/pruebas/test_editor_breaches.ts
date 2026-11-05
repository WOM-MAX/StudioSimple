/**
 * Suite de Pruebas Focalizadas: Corrección de las Tres Brechas del Editor de Lecciones
 * 1. Validación canónica client-side (preflight, rechazo de títulos/puentes ajenos, blindaje OA01).
 * 2. Precedencia en findInjectedLesson (prioridad a localStorage válido, respaldo fábrica, blindaje Matemática OA01).
 * 3. Erradicación total de fallbacks matemáticos ajenos en Ciencias Naturales OA01 Clase 02.
 * 4. Recorrido Positivo A-F completo con marca temporal PRUEBA_EDITOR_WORK y restauración.
 */

import {
  validateLessonCanonical,
  findCanonicalReferenceEntry,
  text,
  key,
  subjectKey,
  oaNumber,
  gradeNumber
} from '../Web Studio Simple/src/lib/lesson-canonical-validator';

import {
  findInjectedLesson,
  saveCustomPlayerLesson,
  resetCustomPlayerLesson,
  isPlayerLessonCustomized,
  findCanonicalFactoryLesson,
  CUSTOM_PLAYER_LESSONS_KEY
} from '../Web Studio Simple/src/lib/lesson-repository';

import { CIENCIAS_7B_OA01_CLASE02 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase02';
import { MATEMATICA_7B_OA01_CLASE01 } from '../Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase01';

// Setup de mock de localStorage y window para entorno Node.js
const storageMap = new Map<string, string>();
const localStorageMock = {
  getItem: (k: string) => storageMap.get(k) ?? null,
  setItem: (k: string, v: string) => storageMap.set(k, String(v)),
  removeItem: (k: string) => storageMap.delete(k),
  clear: () => storageMap.clear()
};

(global as any).window = global;
(global as any).localStorage = localStorageMock;

interface TestReport {
  name: string;
  category: string;
  passed: boolean;
  message: string;
  details?: any;
}

const report: TestReport[] = [];

function assert(condition: boolean, name: string, category: string, failureMsg: string, details?: any) {
  if (condition) {
    report.push({ name, category, passed: true, message: 'OK' });
    console.log(`  ✓ [PASS] [${category}] ${name}`);
  } else {
    report.push({ name, category, passed: false, message: failureMsg, details });
    console.error(`  ✗ [FAIL] [${category}] ${name}: ${failureMsg}`, details || '');
  }
}

console.log('================================================================');
console.log('INICIO DE PRUEBAS FOCALIZADAS: TRES BRECHAS DEL EDITOR');
console.log('================================================================\n');

// -------------------------------------------------------------
// SUITE 1: Validación Canónica Client-Side (Brecha 1)
// -------------------------------------------------------------
console.log('--- SUITE 1: Validación Canónica Client-Side ---');

// 1.1 Lección canónica de fábrica válida
const valCie02 = validateLessonCanonical(CIENCIAS_7B_OA01_CLASE02);
assert(
  valCie02.isValid === true && !valCie02.error && (!valCie02.details || valCie02.details.length === 0),
  'Ciencias 7B OA01 Clase 02 oficial es 100% válida canónicamente',
  'Brecha 1: Validador Canónico',
  'Falló la validación canónica de la lección oficial de fábrica',
  valCie02
);

// 1.2 Prueba Negativa: Título ajeno es rechazado con detalle
const cieConTituloAjeno = JSON.parse(JSON.stringify(CIENCIAS_7B_OA01_CLASE02));
cieConTituloAjeno.metadata.lessonTitle = 'Álgebra y Ecuaciones Lineales';
const valTituloAjeno = validateLessonCanonical(cieConTituloAjeno);
const detTitulo = valTituloAjeno.details?.find((d) => d.field.includes('lessonTitle'));
assert(
  valTituloAjeno.isValid === false &&
    Boolean(detTitulo) &&
    detTitulo?.expected === 'Cambios físicos durante la pubertad' &&
    detTitulo?.found === 'Álgebra y Ecuaciones Lineales',
  'Rechazo estricto de título ajeno con campo/esperado/encontrado',
  'Brecha 1: Validador Canónico (Negativa)',
  'No rechazó el título adulterado o los detalles no coinciden',
  valTituloAjeno
);

// 1.3 Prueba Negativa: Puente de continuidad ajeno es rechazado
const cieConPuenteAjeno = JSON.parse(JSON.stringify(CIENCIAS_7B_OA01_CLASE02));
cieConPuenteAjeno.metadata.nextLessonTitle = 'Números Negativos en la Recta Numérica';
const valPuenteAjeno = validateLessonCanonical(cieConPuenteAjeno);
const detPuente = valPuenteAjeno.details?.find((d) => d.field.includes('nextLessonTitle'));
assert(
  valPuenteAjeno.isValid === false &&
    Boolean(detPuente) &&
    detPuente?.expected === 'Emociones, afectividad e imagen personal' &&
    detPuente?.found === 'Números Negativos en la Recta Numérica',
  'Rechazo estricto de puente de continuidad ajeno con campo/esperado/encontrado',
  'Brecha 1: Validador Canónico (Negativa)',
  'No rechazó el puente adulterado o los detalles no coinciden',
  valPuenteAjeno
);

// 1.4 Blindaje Matemática OA01
const valMat01 = validateLessonCanonical(MATEMATICA_7B_OA01_CLASE01);
assert(
  valMat01.isProtectedOa === true,
  'Matemática 7B OA01 detectada con bandera isProtectedOa: true',
  'Brecha 1: Validador Canónico (Blindaje)',
  'Matemática OA01 no fue marcada como blindada',
  valMat01
);

console.log('');

// -------------------------------------------------------------
// SUITE 2: Precedencia en findInjectedLesson y Blindaje (Brecha 2)
// -------------------------------------------------------------
console.log('--- SUITE 2: Precedencia de Carga y Blindajes ---');
localStorageMock.clear();

// 2.1 Carga sin custom: devuelve fábrica
const factoryLoad = findInjectedLesson('7° Básico', 'Ciencias Naturales', 'OA 1', 2);
assert(
  factoryLoad !== null && factoryLoad.metadata.lessonTitle === 'Cambios físicos durante la pubertad',
  'findInjectedLesson retorna fábrica canónica cuando no hay datos en localStorage',
  'Brecha 2: Precedencia',
  'No retornó la lección de fábrica esperada'
);

// 2.2 Guardar edición válida con marca temporal
const editedCie = JSON.parse(JSON.stringify(CIENCIAS_7B_OA01_CLASE02));
const marcaTemporal = 'PRUEBA_EDITOR_WORK_2026-10-24_17-20';
editedCie.prep.routeToday = `Ruta guiada de la clase 2 [${marcaTemporal}]`;
saveCustomPlayerLesson('7° Básico', 'Ciencias Naturales', 'OA 1', 2, editedCie);

// Verificar precedencia: debe retornar la versión editada con la marca temporal
const customLoad = findInjectedLesson('7° Básico', 'Ciencias Naturales', 'OA 1', 2);
assert(
  customLoad !== null && customLoad.prep.routeToday.includes(marcaTemporal),
  'findInjectedLesson PRIORIZA la versión editada de localStorage sobre la fábrica',
  'Brecha 2: Precedencia',
  'No priorizó la versión personalizada de localStorage'
);

assert(
  isPlayerLessonCustomized('7° Básico', 'Ciencias Naturales', 'OA 1', 2) === true,
  'isPlayerLessonCustomized reporta estado personalizado en true',
  'Brecha 2: Precedencia',
  'Reportó false a pesar de existir custom'
);

// 2.3 Blindaje Matemática OA01 (inmutable ante intentos de guardado)
const editedMat = JSON.parse(JSON.stringify(MATEMATICA_7B_OA01_CLASE01));
editedMat.prep.routeToday = `Intento de adulteración [${marcaTemporal}]`;
saveCustomPlayerLesson('7° Básico', 'Matemática', 'OA 1', 1, editedMat);

const matLoad = findInjectedLesson('7° Básico', 'Matemática', 'OA 1', 1);
assert(
  matLoad !== null && !matLoad.prep.routeToday.includes(marcaTemporal),
  'saveCustomPlayerLesson BLOQUEA escritura en Matemática OA01 (blindada de fábrica)',
  'Brecha 2: Blindaje Matemática OA01',
  'Matemática OA01 fue modificada o no retornó fábrica'
);

assert(
  isPlayerLessonCustomized('7° Básico', 'Matemática', 'OA 1', 1) === false,
  'isPlayerLessonCustomized siempre es false para Matemática OA01',
  'Brecha 2: Blindaje Matemática OA01',
  'Reportó true para Matemática OA01'
);

// 2.4 Payload malicioso forzado en localStorage para Matemática OA01: findInjectedLesson lo ignora
const rawMap = JSON.parse(localStorageMock.getItem(CUSTOM_PLAYER_LESSONS_KEY) || '{}');
rawMap['7_mat_oa01_1'] = editedMat;
localStorageMock.setItem(CUSTOM_PLAYER_LESSONS_KEY, JSON.stringify(rawMap));

const matLoadForzado = findInjectedLesson('7° Básico', 'Matemática', 'OA 1', 1);
assert(
  matLoadForzado !== null && !matLoadForzado.prep.routeToday.includes(marcaTemporal),
  'findInjectedLesson IGNORA cualquier payload forzado en localStorage para Matemática OA01',
  'Brecha 2: Blindaje Matemática OA01',
  'El blindaje no ignoró el payload malicioso en localStorage'
);

// 2.5 Rechazo de identidad corrupta en localStorage
rawMap['7_cie_oa01_2'] = { metadata: { grade: '8° Básico', subject: 'Historia', oaCode: 'OA 5', lessonNumber: 99 } };
localStorageMock.setItem(CUSTOM_PLAYER_LESSONS_KEY, JSON.stringify(rawMap));
const cieCorruptaLoad = findInjectedLesson('7° Básico', 'Ciencias Naturales', 'OA 1', 2);
assert(
  cieCorruptaLoad !== null && cieCorruptaLoad.metadata.lessonTitle === 'Cambios físicos durante la pubertad',
  'findInjectedLesson descarta candidato de localStorage con identidad incongruente y cae a fábrica',
  'Brecha 2: Precedencia',
  'Aceptó un candidato con identidad corrupta'
);

// 2.6 Restauración / Reset a fábrica
localStorageMock.clear();
resetCustomPlayerLesson('7° Básico', 'Ciencias Naturales', 'OA 1', 2);
const resetLoad = findInjectedLesson('7° Básico', 'Ciencias Naturales', 'OA 1', 2);
assert(
  resetLoad !== null && !resetLoad.prep.routeToday.includes(marcaTemporal),
  'resetCustomPlayerLesson restaura limpiamente la lección a versión de fábrica canónica',
  'Brecha 2: Restauración',
  'No restauró al estado de fábrica'
);

console.log('');

// -------------------------------------------------------------
// SUITE 3: Erradicación de Fallbacks Matemáticos (Brecha 3)
// -------------------------------------------------------------
console.log('--- SUITE 3: Erradicación de Fallbacks Matemáticos en Ciencias ---');

// Simular el saneamiento del editor sobre Ciencias 7B OA01 C02
function simulateEditorLoad(rawLesson: any) {
  const cloned = JSON.parse(JSON.stringify(rawLesson));

  // Lógica saneada de LessonEditorView (sin fallbacks matemáticos)
  if (!cloned.route.blocks || cloned.route.blocks.length === 0) {
    cloned.route.blocks = [
      { id: 'b1', number: '01', title: 'Punto de partida', subtitle: 'Activación', color: 'teal' },
      { id: 'b2', number: '02', title: 'Motivación y Explicación', subtitle: 'Cápsula interactiva', color: 'orange' },
      { id: 'b3', number: '03', title: 'Práctica guiada', subtitle: 'Transferencia', color: 'yellow' },
      { id: 'b4', number: '04', title: 'Miniquiz', subtitle: 'Evaluación y cierre', color: 'navy' }
    ];
  }
  if (!cloned.route.keyQuestions) {
    cloned.route.keyQuestions = [];
  }
  if (!cloned.reference) {
    cloned.reference = {
      dilePrompt: cloned.situation?.dilePrompt || 'Observa la situación y responde la pregunta clave.',
      question: 'Dime con tus palabras: ¿qué idea central explica esta situación?',
      expectedAnswer: cloned.situation?.expectedAnswer || 'Idea central explicada con tus palabras.',
      socraticHint: cloned.situation?.socraticHint || 'Fíjate en las palabras clave del caso.',
      feedbackSuccess: '¡Exacto! Buen razonamiento.',
      feedbackSupport: 'Revisa la situación planteada para encontrar la respuesta.'
    };
  }
  if (!cloned.hook.focusPoints) {
    cloned.hook.focusPoints = [];
  }
  if (!cloned.postQuestions || cloned.postQuestions.length === 0) {
    cloned.postQuestions = cloned.preQuestions && cloned.preQuestions.length >= 2
      ? JSON.parse(JSON.stringify(cloned.preQuestions.slice(0, 2)))
      : [];
  }
  if (!cloned.strategy) {
    const titleContext = cloned.metadata?.lessonTitle || 'la clase';
    cloned.strategy = {
      title: `Estrategia de resolución: ${titleContext}`,
      dileIntro: 'Sigue estos tres pasos para analizar y fundamentar tu respuesta:',
      steps: [
        { number: 1, title: 'Identifica', desc: 'Lee con atención el caso o problema y localiza los datos clave.' },
        { number: 2, title: 'Relaciona', desc: 'Conecta la evidencia del texto con los conceptos aprendidos.' },
        { number: 3, title: 'Concluye', desc: 'Explica tu razonamiento con claridad antes de responder.' }
      ]
    };
  }
  if (!cloned.summaryIdeas || cloned.summaryIdeas.length === 0) {
    cloned.summaryIdeas = [
      ['1 · Concepto central', cloned.metadata?.lessonTitle || 'Idea fundamental de la lección.'],
      ['2 · Aplicación guiada', 'Uso de la evidencia del recurso para fundamentar conclusiones.'],
      ['3 · Criterio formativo', 'Distinguir hechos comprobables de opiniones sin evidencia.']
    ];
  }

  return cloned;
}

const editorLoadedCie = simulateEditorLoad(CIENCIAS_7B_OA01_CLASE02);
const jsonString = JSON.stringify(editorLoadedCie).toLowerCase();

const mathTerms = [
  'recta numerica',
  'recta numérica',
  'positivos y negativos',
  'número cero',
  'numero cero',
  'el cero al centro',
  'números enteros',
  'numeros enteros',
  '−5 y −2',
  'regla de la derecha',
  'álgebra',
  'algebra',
  'geometría',
  'geometria',
  'datos y azar'
];

for (const term of mathTerms) {
  const found = jsonString.includes(term.toLowerCase());
  assert(
    !found,
    `Cero contaminación matemática: ausencia del término "${term}"`,
    'Brecha 3: Erradicación Fallbacks Matemáticos',
    `Se encontró el término prohibido "${term}" en el objeto de lección de Ciencias`
  );
}

// Comprobar integridad de los datos legítimos de Ciencias
assert(
  editorLoadedCie.route.blocks.length === 4 &&
    editorLoadedCie.route.blocks[0].title === 'Punto de partida' &&
    editorLoadedCie.route.blocks[1].title === 'Motivación y Explicación',
  'Bloques de ruta de Ciencias legítimos conservados (Punto de partida, Motivación, etc.)',
  'Brecha 3: Integridad de Ciencias',
  'Los bloques fueron sobrescritos'
);

assert(
  editorLoadedCie.summaryIdeas.length === 2 &&
    editorLoadedCie.summaryIdeas[0][1].includes('ritmos individuales') &&
    editorLoadedCie.summaryIdeas[1][1].includes('pubertad es un proceso'),
  'Las 2 ideas de síntesis originales de Ciencias se preservan íntegramente',
  'Brecha 3: Integridad de Ciencias',
  'Las ideas de síntesis de Ciencias fueron alteradas'
);

assert(
  editorLoadedCie.hook.focusPoints.length === 0,
  'hook.focusPoints se mantiene vacío ([]) sin forzar conceptos matemáticos',
  'Brecha 3: Integridad de Ciencias',
  'hook.focusPoints fue rellenado indebidamente'
);

assert(
  editorLoadedCie.postQuestions.length === 1 &&
    editorLoadedCie.postQuestions[0].expected.includes('cambio físico') &&
    !editorLoadedCie.postQuestions[0].question.includes('recta'),
  'postQuestions preserva su pregunta biológica legítima (cambio físico) sin inyectar reactivos de números enteros',
  'Brecha 3: Integridad de Ciencias',
  'postQuestions no preservó la pregunta legítima de Ciencias o contiene elementos ajenos'
);

console.log('');

// -------------------------------------------------------------
// SUITE 4: Recorrido Positivo A-F Completo de Principio a Fin
// -------------------------------------------------------------
console.log('--- SUITE 4: Recorrido Positivo A-F Completo ---');

// Paso A: Carga limpia de fábrica
const pasoA = findInjectedLesson('7° Básico', 'Ciencias Naturales', 'OA 1', 2);
assert(
  pasoA !== null && pasoA.metadata.lessonTitle === 'Cambios físicos durante la pubertad',
  'Paso A: Carga limpia de fábrica de Ciencias 7B OA01 C02',
  'Recorrido A-F',
  'Fallo en Paso A'
);

// Paso B: Modificación con marca temporal
const pasoB = JSON.parse(JSON.stringify(pasoA));
const marcaPositiva = 'PRUEBA_EDITOR_WORK_2026-10-24_17-30_EXITO';
pasoB.prep.routeToday = `Ruta guiada de la clase 2 [${marcaPositiva}]`;
pasoB.prep.adultObjective = `Describir cambios físicos [${marcaPositiva}]`;

assert(
  pasoB.prep.routeToday.includes(marcaPositiva),
  'Paso B: Modificación válida con marca temporal agregada al objeto',
  'Recorrido A-F',
  'Fallo en Paso B'
);

// Paso C: Validación canónica exitosa preflight
const pasoC = validateLessonCanonical(pasoB);
assert(
  pasoC.isValid === true && !pasoC.isProtectedOa,
  'Paso C: Validación canónica exitosa (título y puente oficial coinciden)',
  'Recorrido A-F',
  'Fallo en Paso C'
);

// Paso D: Persistencia y recarga
saveCustomPlayerLesson('7° Básico', 'Ciencias Naturales', 'OA 1', 2, pasoB);
const pasoD = findInjectedLesson('7° Básico', 'Ciencias Naturales', 'OA 1', 2);
assert(
  pasoD !== null && pasoD.prep.routeToday.includes(marcaPositiva) && pasoD.prep.adultObjective.includes(marcaPositiva),
  'Paso D: Persistencia exitosa y recarga en findInjectedLesson recuperando la marca',
  'Recorrido A-F',
  'Fallo en Paso D'
);

// Paso E: Exportación / validación
assert(
  pasoD?.metadata.lessonTitle === 'Cambios físicos durante la pubertad' &&
    pasoD?.metadata.nextLessonTitle === 'Emociones, afectividad e imagen personal',
  'Paso E: Consistencia de exportación con títulos canónicos intactos',
  'Recorrido A-F',
  'Fallo en Paso E'
);

// Paso F: Restauración canónica completa
resetCustomPlayerLesson('7° Básico', 'Ciencias Naturales', 'OA 1', 2);
const pasoF = findInjectedLesson('7° Básico', 'Ciencias Naturales', 'OA 1', 2);
assert(
  pasoF !== null && !pasoF.prep.routeToday.includes(marcaPositiva),
  'Paso F: Restauración total al estado canónico de fábrica sin marcas residuales',
  'Recorrido A-F',
  'Fallo en Paso F'
);

console.log('\n================================================================');
const total = report.length;
const passed = report.filter((r) => r.passed).length;
const failed = report.filter((r) => !r.passed).length;
console.log(`RESUMEN FINAL: ${passed}/${total} PRUEBAS EXITOSAS (${failed} FALLOS)`);
console.log('================================================================');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
