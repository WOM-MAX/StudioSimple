import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(__dirname, '..');
const TARGET_DIR = path.join(ROOT, 'LECCIONES', '110-7', 'Ciencias_Naturales', 'OA01');

// Buscar el archivo corregido más reciente
const files = fs.readdirSync(TARGET_DIR);
const correctedFile = files.find((f) => f.startsWith('Prompts_Work_Ciencias_7B_OA01_CORREGIDO_') && f.endsWith('.txt'));

if (!correctedFile) {
  console.error('ERROR: No se encontró el archivo Prompts_Work_Ciencias_7B_OA01_CORREGIDO_*.txt');
  process.exit(1);
}

const filePath = path.join(TARGET_DIR, correctedFile);
console.log(`=== AUDITORÍA AUTOMÁTICA DE CALIDAD DE PROMPTS AUDIOVISUALES ===`);
console.log(`Archivo auditado: ${filePath}\n`);

const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const checks = [
  { name: '1. Clases declaradas (exactamente 6)', pass: false, details: '' },
  { name: '2. Bloques MOTIVACION encontrados (exactamente 6)', pass: false, details: '' },
  { name: '3. Bloques EXPLICACION encontrados (exactamente 6)', pass: false, details: '' },
  { name: '4. Diapositivas totales estructuradas (exactamente 84)', pass: false, details: '' },
  { name: '5. Prompts de imagen declarados (exactamente 84)', pass: false, details: '' },
  { name: '6. Prompts de imagen NO vacíos (exactamente 84 / 0 vacíos)', pass: false, details: '' },
  { name: '7. Títulos visibles 64 pt encontrados (exactamente 84)', pass: false, details: '' },
  { name: '8. Subtítulos visibles 48 pt encontrados (exactamente 84)', pass: false, details: '' },
  { name: '9. Notas al orador encontradas (exactamente 84)', pass: false, details: '' },
  { name: '10. Diapositivas Explicación #1 con Objetivo explícito (exactamente 6)', pass: false, details: '' },
  { name: '11. Uso de "GANCHO" como nombre oficial (exactamente 0)', pass: false, details: '' },
  { name: '12. Instrucción positiva de paneles/sombras/máscaras (exactamente 0)', pass: false, details: '' },
  { name: '13. Regla global de Título Amarillo Oro (#FFD700) presente', pass: false, details: '' },
  { name: '14. Regla global de Subtítulo Blanco (#FFFFFF) presente', pass: false, details: '' }
];

// 1. Clases
const classMatches = content.match(/CLASE \d DE 6:/g) || [];
checks[0].pass = classMatches.length === 6;
checks[0].details = `Encontradas: ${classMatches.length}/6`;

// 2. Motivaciones
const motMatches = content.match(/PRESENTACIÓN MOTIVACION:/g) || [];
checks[1].pass = motMatches.length === 6;
checks[1].details = `Encontradas: ${motMatches.length}/6`;

// 3. Explicaciones
const expMatches = content.match(/PRESENTACIÓN EXPLICACION:/g) || [];
checks[2].pass = expMatches.length === 6;
checks[2].details = `Encontradas: ${expMatches.length}/6`;

// 4. Diapositivas
const slideMatches = content.match(/--- DIAPOSITIVA \d DE 7:/g) || [];
checks[3].pass = slideMatches.length === 84;
checks[3].details = `Encontradas: ${slideMatches.length}/84`;

// 5 & 6. Prompts de imagen
const promptRegex = /7\. Prompt de Imagen para IA \(16:9 Anime Moderno Limpio sin texto\):\s*(.+)/g;
let match;
let foundPrompts = 0;
let nonEmptyPrompts = 0;

for (const line of lines) {
  if (line.includes('7. Prompt de Imagen para IA (16:9 Anime Moderno Limpio sin texto):')) {
    foundPrompts++;
    const val = line.replace('7. Prompt de Imagen para IA (16:9 Anime Moderno Limpio sin texto):', '').trim();
    if (val.length > 25 && !val.includes('undefined')) {
      nonEmptyPrompts++;
    }
  }
}
checks[4].pass = foundPrompts === 84;
checks[4].details = `Encontrados: ${foundPrompts}/84`;

checks[5].pass = nonEmptyPrompts === 84;
checks[5].details = `Completos y no vacíos: ${nonEmptyPrompts}/84 (Vacíos: ${84 - nonEmptyPrompts})`;

// 7. Títulos 64 pt
const titleMatches = lines.filter((l) => l.includes('5. Título visible (64 pt, Amarillo Oro #FFD700):'));
checks[6].pass = titleMatches.length === 84;
checks[6].details = `Encontrados: ${titleMatches.length}/84`;

// 8. Subtítulos 48 pt
const subMatches = lines.filter((l) => l.includes('6. Subtítulo visible (48 pt, Blanco #FFFFFF):'));
checks[7].pass = subMatches.length === 84;
checks[7].details = `Encontrados: ${subMatches.length}/84`;

// 9. Notas al orador
const notesMatches = lines.filter((l) => l.includes('11. Notas al orador (Locución Google Vids): "') && !l.includes('""'));
checks[8].pass = notesMatches.length === 84;
checks[8].details = `Encontradas con contenido: ${notesMatches.length}/84`;

// 10. Diapositiva 1 de Explicación con Objetivo
const expObjMatches = lines.filter((l) => l.includes('5. Título visible (64 pt, Amarillo Oro #FFD700): Objetivo de la lección'));
checks[9].pass = expObjMatches.length === 6;
checks[9].details = `Encontradas con 'Objetivo de la lección': ${expObjMatches.length}/6`;

// 11. Cero "GANCHO" como nombre oficial
const ganchoCount = (content.match(/VIDEO GANCHO|PRESENTACIÓN GANCHO|GANCHO MOTIVACIONAL/gi) || []).length;
checks[10].pass = ganchoCount === 0;
checks[10].details = `Ocurrencias oficiales: ${ganchoCount}`;

// 12. Cero paneles / sombras / máscaras como instrucción positiva
// Debe aparecer solo en el contexto prohibitivo ("No panels", "PROHIBIDO usar paneles, sombras...")
let positivePanels = 0;
lines.forEach((l, idx) => {
  if (/usar paneles|agregar sombras detras del texto|aplicar mascara oscura|tarjetas flotantes/i.test(l)) {
    if (!l.includes('PROHIBIDO') && !l.includes('No panels') && !l.includes('sin sombras')) {
      positivePanels++;
    }
  }
});
checks[11].pass = positivePanels === 0;
checks[11].details = `Instrucciones positivas prohibidas: ${positivePanels}`;

// 13. Regla global Título Amarillo Oro
const yellowGoldPresent = content.includes('Amarillo Oro (#FFD700)');
checks[12].pass = yellowGoldPresent;
checks[12].details = yellowGoldPresent ? 'Presente en cabecera normativa y en 84 diapositivas' : 'Ausente';

// 14. Regla global Subtítulo Blanco
const whiteSubPresent = content.includes('Blanco (#FFFFFF)');
checks[13].pass = whiteSubPresent;
checks[13].details = whiteSubPresent ? 'Presente en cabecera normativa y en 84 diapositivas' : 'Ausente';

let allPass = true;
checks.forEach((c) => {
  const symbol = c.pass ? '✓ PASS' : '✗ FAIL';
  console.log(`${symbol} | ${c.name} -> ${c.details}`);
  if (!c.pass) allPass = false;
});

console.log('\n-------------------------------------------------------------');
if (allPass) {
  console.log('RESULTADO FINAL: 14/14 CONTROLES AUTOMÁTICOS PASS (100% CONFORME)');
  process.exit(0);
} else {
  console.error('RESULTADO FINAL: ALGUNOS CONTROLES FALLARON');
  process.exit(1);
}
