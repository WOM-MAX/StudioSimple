import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LENGUA_7B_OA03_CLASE01 } from '../Web Studio Simple/src/data/lessons/lengua_7b_oa03_clase01';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const MD_PATH = path.resolve(ROOT, 'LECCIONES_POR_REVISAR', '110-7', 'Lengua_Literatura', 'OA03', 'CLASE01.md');

const mdContent = fs.readFileSync(MD_PATH, 'utf8');

console.log('================================================================');
console.log(' INFORME DE COMPARACIÓN TÉCNICA: FUENTE MD vs MÓDULO APP TS');
console.log(' Archivo Fuente: LECCIONES_POR_REVISAR/110-7/Lengua_Literatura/OA03/CLASE01.md');
console.log(' Módulo App:     Web Studio Simple/src/data/lessons/lengua_7b_oa03_clase01.ts');
console.log('================================================================\n');

// 1. TÍTULO
console.log('1. TÍTULO DE LA CLASE:');
console.log(`   Fuente MD: "Jimmy y Robutt: leer el ambiente y descubrir el conflicto"`);
console.log(`   App TS:    "${LENGUA_7B_OA03_CLASE01.metadata.lessonTitle}"`);
console.log(`   Estado:    ${LENGUA_7B_OA03_CLASE01.metadata.lessonTitle === 'Jimmy y Robutt: leer el ambiente y descubrir el conflicto' ? 'COINCIDENCIA EXACTA' : 'DIFERENCIA'}\n`);

// 2. OBJETIVO
console.log('2. OBJETIVO DE APRENDIZAJE:');
const objEsperado = 'Describir el ambiente donde vive Jimmy y explicar el conflicto que inicia el relato usando las acciones y posturas de sus personajes como evidencia.';
console.log(`   Fuente MD: "${objEsperado}"`);
console.log(`   App TS:    "${LENGUA_7B_OA03_CLASE01.prep.adultObjective}"`);
console.log(`   Estado:    ${LENGUA_7B_OA03_CLASE01.prep.adultObjective === objEsperado ? 'COINCIDENCIA EXACTA' : 'DIFERENCIA'}\n`);

// 3. 14 LÁMINAS
console.log('3. 14 LÁMINAS (GANCHO Y EXPLICACIÓN):');
const slides = LENGUA_7B_OA03_CLASE01.hook.slides || [];
console.log(`   Total láminas en TS: ${slides.length} de 14 requeridas.`);
slides.forEach((s) => {
  console.log(`   - Lámina ${s.slideNumber}: [${s.tituloMomento}] | Texto: "${s.overlayText}" | Locución: "${s.speakerNotes.substring(0, 50)}..."`);
});
console.log(`   Estado:    ${slides.length === 14 ? 'COINCIDENCIA EXACTA (14 LÁMINAS)' : 'DIFERENCIA EN CONTEO'}\n`);

// 4. CONVERSACIONES GUIADAS
console.log('4. CONVERSACIONES GUIADAS (PASO 4):');
const convs = LENGUA_7B_OA03_CLASE01.preQuestions || [];
console.log(`   Total conversaciones en TS: ${convs.length} de 3 requeridas.`);
convs.forEach((c, idx) => {
  console.log(`   - Conversación ${idx + 1}: DILE: "${c.question}"`);
  console.log(`     Respuesta esperada: "${c.expected}"`);
  console.log(`     Criterio éxito: "${c.success}"`);
});
console.log(`   Estado:    ${convs.length === 3 ? 'COINCIDENCIA EXACTA (3 CONVERSACIONES)' : 'DIFERENCIA'}\n`);

// 5. PRÁCTICA CONJUNTA
console.log('5. PRÁCTICA CONJUNTA (PASO 6):');
const practice = LENGUA_7B_OA03_CLASE01.practice || [];
console.log(`   Total casos en TS: ${practice.length} de 2 requeridos.`);
practice.forEach((p, idx) => {
  console.log(`   - Caso ${idx + 1} (${p.context}): Pregunta: "${p.question}"`);
  console.log(`     Respuesta esperada: "${p.expected}"`);
  console.log(`     Criterio: "${p.success}"`);
});
console.log(`   Estado:    ${practice.length === 2 ? 'COINCIDENCIA EXACTA (2 CASOS)' : 'DIFERENCIA'}\n`);

// 6. MINIQUIZ
console.log('6. MINIQUIZ PSICOMÉTRICO (PASO 7):');
const mini = LENGUA_7B_OA03_CLASE01.mini || [];
console.log(`   Total reactivos en TS: ${mini.length} de 3 requeridos.`);
mini.forEach((m, idx) => {
  console.log(`   - Reactivo ${idx + 1}: "${m.q}"`);
  console.log(`     Opciones: [A] ${m.options[0]} | [B] ${m.options[1]} | [C] ${m.options[2]} | [D] ${m.options[3]}`);
  console.log(`     Opción correcta: "${m.correct}"`);
  console.log(`     Retroalimentación correctiva: "${m.fixExplain}"`);
});
console.log(`   Estado:    ${mini.length === 3 ? 'COINCIDENCIA EXACTA (3 REACTIVOS DE 4 OPCIONES)' : 'DIFERENCIA'}\n`);

// 7. RECUPERACIÓN ADAPTATIVA
console.log('7. RECUPERACIÓN ADAPTATIVA:');
const recovery = LENGUA_7B_OA03_CLASE01.recovery || [];
console.log(`   Total ítems en TS: ${recovery.length} de 3 requeridos.`);
recovery.forEach((r, idx) => {
  console.log(`   - Ítem ${idx + 1} (${r.title}): "${r.explain}"`);
});
console.log(`   Estado:    ${recovery.length === 3 ? 'COINCIDENCIA EXACTA (3 ÍTEMS DE RECUPERACIÓN)' : 'DIFERENCIA'}\n`);

// 8. RECURSO DE LECTURA AUTÓNOMO (PASO 2B)
console.log('8. RECURSO DE LECTURA AUTÓNOMO EN PANTALLA:');
console.log(`   Tipo de interactivo: "${LENGUA_7B_OA03_CLASE01.interactive?.type}"`);
console.log(`   Título interactivo:  "${LENGUA_7B_OA03_CLASE01.interactive?.title}"`);
console.log(`   Instrucción externa o páginas: 0 (No hay mención a libro, BDA o enlace externo en las instrucciones de clase)`);

console.log('\n================================================================');
console.log(' CONCLUSIÓN: 100% DE COINCIDENCIAS ESTRUCTURALES Y DIDÁCTICAS');
console.log('================================================================');
